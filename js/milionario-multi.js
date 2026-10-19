/* ==========================================================================
   milionario-multi.js  —  "Quem quer ser milionário?" em multijogador
   --------------------------------------------------------------------------
   Até 4 jogadores, todos contra todos, em tempo real (Firebase).
   É carregado como módulo (type="module") porque importa o Firebase e usa o que
   js/milionario.js partilha em window.MILIONARIO (perguntas, prémios, etc.).

   Regras do jogo:
     - 15 perguntas, cada vez mais difíceis; a mesma pergunta para todos ao mesmo tempo.
     - Quem acerta ganha o valor da pergunta (valorDaRonda) mais um bónus de rapidez
       de até 50%. Errar ou não responder não custa nada.
     - Ganha quem tiver mais dinheiro no fim (empate: mais certas, depois mais rápido).

   Dados no Firestore (mesma coleção "rooms" do multijogador dos testes):
     rooms/{CÓDIGO}                a sala:
         game   'milionario'          host   id do anfitrião
         state  'lobby'|'play'|'done' cur    ronda atual (0 a 14; -1 no lobby)
         rev    true = a mostrar a resposta certa
         per    segundos por pergunta
         qids   ids das 15 perguntas, por ordem
         ords   ordem das opções de cada pergunta, ex.: '2013'
                (guardada na sala para todos verem as opções na mesma ordem)
     rooms/{CÓDIGO}/players/{uid}  cada jogador:
         name, money (dinheiro), ok (certas), ms (tempo total a responder),
         joined (hora de entrada), ans ({ n: ronda, c: opção, g: ganho } ou null)
     Salas e jogadores levam também "expira" (data): são apagados por limpeza-salas.js depois dela.

   Fluxo: mqOpen() -> criar() / entrar() -> entrarNaSala() -> desenhar() escolhe o ecrã:
          ecraSala() -> ecraJogo() (pergunta e revelação) -> ecraFinal()
   O anfitrião controla o avanço (revelar() e avancar()); cada alteração no
   Firestore chama desenhar() outra vez (onSnapshot).
   ========================================================================== */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import {
  getAuth,
  signInAnonymously,
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  onSnapshot,
  collection,
  increment,
  Timestamp,
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { firebaseConfig, VALIDADE_SALA_MS } from './firebase-config.js';
import { limparSalasExpiradas } from './limpeza-salas.js';

/* ---------- Ligação ao jogo e constantes ---------- */

// Tudo o que o js/milionario.js partilha connosco.
const M = window.MILIONARIO;
const { ELIG, PRIZE, score, keepOrder, shuffle, esc, cap, money, rnd, app } = M;

const MAX_JOGADORES = 4;
const MIN_JOGADORES = 2;
const N_RONDAS = 15;
const PAUSA_REVELACAO_MS = 7000; // tempo a mostrar a resposta certa antes da pergunta seguinte
const BONUS_MAX = 0.5; // bónus máximo de rapidez (50% do valor da pergunta)
const LETRAS = 'ABCD';
const CORES = ['#f5b72e', '#4cd982', '#ff7b70', '#7aa7ff']; // uma cor por jogador

// Quanto vale a pergunta da ronda r. Muda aqui se quiseres uma escala mais plana.
const valorDaRonda = (r) => PRIZE[r];

// Ganho de quem acerta na ronda r ao fim de ms milissegundos (arredondado às dezenas).
function valorGanho(r, ms, segundos) {
  const rapidez = Math.max(0, 1 - ms / (segundos * 1000)); // 1 = instantâneo, 0 = no último segundo
  return Math.round((valorDaRonda(r) * (1 + BONUS_MAX * rapidez)) / 10) * 10;
}

/* ---------- Firebase ---------- */

const fbApp = initializeApp(firebaseConfig);
const auth = getAuth(fbApp);
const db = getFirestore(fbApp);

let uid = null; // id anónimo deste jogador
let sessao = null; // promessa do login (só se faz quando se abre o multijogador)

// Login anónimo: dá um id a cada jogador sem pedir conta.
function iniciarSessao() {
  if (!sessao) {
    sessao = signInAnonymously(auth)
      .then((c) => (uid = c.user.uid))
      .catch(() => null);
  }
  return sessao;
}

// Data a partir da qual o Firebase pode apagar a sala ou o jogador (apagada por limpeza-salas.js).
const expiraEm = () => Timestamp.fromMillis(Date.now() + VALIDADE_SALA_MS);

const refSala = () => doc(db, 'rooms', code);
const refJogador = () => doc(db, 'rooms', code, 'players', uid);
const refJogadores = () => collection(db, 'rooms', code, 'players');

/* ---------- Estado local ---------- */

let code = ''; // código da sala (4 letras)
let sala = null; // dados atuais da sala
let jogadores = []; // jogadores da sala: { id, name, money, ok, ms, joined, ans }
let souAnfitriao = false;
let ativo = false; // true enquanto estou numa sala
let nome = '';

let desfazer = []; // funções para deixar de ouvir o Firestore
let cronometro = null; // setInterval do relógio no ecrã
let tAnfitriao = null; // anfitrião: tempo máximo da pergunta
let tRevelacao = null; // anfitrião: pausa antes da pergunta seguinte

let rondaVista = -2; // última ronda que este ecrã já preparou
let t0 = 0; // hora a que vi a pergunta (para medir a rapidez)
let bloqueado = false; // já respondi ou o tempo acabou
let minha = null; // opção que escolhi nesta ronda
let revelacaoVista = -2; // última ronda cuja revelação já tratei
let revelacaoT0 = 0;
let anfitriaoRonda = -2; // anfitrião: ronda para a qual já arrancou o tempo máximo
let revelada = -2; // anfitrião: última ronda que já revelou
let finalVisto = false;

const $ = (s) => document.querySelector(s);
const porId = new Map(ELIG.map((q) => [q.id, q]));

// Jogadores por ordem de entrada (define também a cor de cada um).
const ordenados = () =>
  [...jogadores].sort((a, b) => a.joined - b.joined || (a.id < b.id ? -1 : 1));
const corDe = (p) => CORES[ordenados().findIndex((x) => x.id === p.id)] || '#fff';

// Classificação: mais dinheiro, depois mais certas, depois menos tempo a responder.
const classificacao = () =>
  [...jogadores].sort(
    (a, b) => b.money - a.money || b.ok - a.ok || a.ms - b.ms || a.joined - b.joined,
  );

const euMesmo = () => jogadores.find((p) => p.id === uid);
const respostaDe = (p, r) => (p && p.ans && p.ans.n === r ? p.ans : null);

/* ---------- Escolha das perguntas (só o anfitrião, ao criar a sala) ---------- */

// Escolhe N_RONDAS perguntas por ordem de dificuldade crescente, sem repetir nenhuma
// (nem duas com o mesmo enunciado), e define a ordem das opções de cada uma.
function escolherRondas(pool) {
  const lista = shuffle(pool.slice()).sort((a, b) => score(a) - score(b));
  const n = lista.length;
  const janela = Math.max(4, Math.round(n * 0.12));
  const usadas = new Set();
  const textos = new Set();
  const rondas = [];
  for (let r = 0; r < N_RONDAS; r++) {
    const centro = Math.round((r / (N_RONDAS - 1)) * (n - 1));
    const livre = (q) => !usadas.has(q.id) && !textos.has(q.q.trim().toLowerCase());
    let candidatas = lista.slice(Math.max(0, centro - janela), centro + janela + 1).filter(livre);
    if (!candidatas.length) candidatas = lista.filter(livre);
    const q = candidatas[rnd(0, candidatas.length - 1)];
    usadas.add(q.id);
    textos.add(q.q.trim().toLowerCase());
    const indices = q.o.map((_, i) => i);
    rondas.push({ id: q.id, ord: (keepOrder(q) ? indices : shuffle(indices)).join('') });
  }
  return rondas;
}

// Monta a pergunta da ronda r com as opções pela ordem guardada na sala.
function pergunta(r) {
  const q = porId.get(sala.qids[r]);
  const ordem = sala.ords[r].split('').map(Number);
  return {
    q: q.q,
    e: q.e || '',
    u: q.u,
    o: ordem.map((i) => ({ t: q.o[i], ok: i === q.a })),
  };
}

/* ---------- Ecrã de entrada: nome, criar sala ou entrar com código ---------- */

window.mqOpen = function () {
  registarEventos();
  if (!limpezaFeita) {
    limpezaFeita = true; // uma vez por visita à página
    iniciarSessao().then((u) => u && limparSalasExpiradas(db));
  }
  const c = M.cfg();
  const n = ELIG.filter((q) => c.sel.has(q.s) && (c.withU || !q.u)).length;
  app.innerHTML = `<div class="top"><button class="tb" data-mp="voltar">← Voltar</button><span class="sp"></span></div>
<div class="start"><h1>Multijogador</h1>
<p class="lead">Até 4 jogadores, todos contra todos. A mesma pergunta para todos, ao mesmo tempo.</p>
<ul class="rules"><li>São 15 perguntas, cada vez mais difíceis. Cada pergunta vale o prémio do seu degrau, de ${money(valorDaRonda(0))} a ${money(valorDaRonda(N_RONDAS - 1))}.</li><li>Quem acerta ganha o valor da pergunta e até 50% de bónus pela rapidez. Errar ou não responder não custa nada.</li><li>Ganha quem tiver mais dinheiro no fim. Em caso de empate, ganha quem acertou mais e respondeu mais depressa.</li></ul>
<div class="mp-box"><b>O teu nome</b><input class="mp-in" id="mq-nome" maxlength="16" autocomplete="off" value="${esc(M.store.get('mq_nome') || '')}"></div>
<div class="mp-box"><b>Criar sala</b>
<label class="mp-linha">Tempo por pergunta <select class="mp-in" id="mq-per"><option value="20">20 segundos</option><option value="30" selected>30 segundos</option><option value="45">45 segundos</option><option value="60">60 segundos</option></select></label>
<small>Usa os temas escolhidos no ecrã anterior (${n} perguntas disponíveis).</small>
<p><button class="bigbtn" data-mp="criar">Criar sala</button></p></div>
<div class="mp-box"><b>Entrar numa sala</b>
<label class="mp-linha">Código <input class="mp-in mp-cod" id="mq-codigo" maxlength="4" autocomplete="off" placeholder="ABCD"></label>
<p><button class="bigbtn alt" data-mp="entrar">Entrar</button></p></div>
<p class="mp-erro" id="mq-erro" role="alert"></p></div>`;
};

const erro = (m) => {
  const e = $('#mq-erro');
  if (e) e.textContent = m;
};

// Lê o nome do campo e guarda-o para a próxima vez.
function lerNome() {
  nome = ($('#mq-nome').value || '').trim();
  if (nome) M.store.set('mq_nome', nome);
  return nome;
}

const gerarCodigo = () =>
  Array.from({ length: 4 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ'[rnd(0, 23)]).join('');

/* ---------- Criar e entrar numa sala ---------- */

// O anfitrião cria a sala: escolhe as perguntas e grava tudo no Firestore.
async function criar() {
  if (!lerNome()) return erro('Escreve o teu nome.');
  const c = M.cfg();
  const pool = ELIG.filter((q) => c.sel.has(q.s) && (c.withU || !q.u));
  if (pool.length < N_RONDAS) {
    return erro('Escolhe mais temas no ecrã anterior: são precisas pelo menos 15 perguntas.');
  }
  if (!(await iniciarSessao())) return erro('Sem ligação ao Firebase.');
  const rondas = escolherRondas(pool);
  try {
    for (let tentativa = 0; tentativa < 5; tentativa++) {
      code = gerarCodigo();
      if (!(await getDoc(refSala())).exists()) break;
    }
    await setDoc(refSala(), {
      expira: expiraEm(),
      game: 'milionario',
      host: uid,
      state: 'lobby',
      cur: -1,
      rev: false,
      per: +$('#mq-per').value,
      qids: rondas.map((x) => x.id),
      ords: rondas.map((x) => x.ord),
    });
  } catch (e) {
    return erro('Não foi possível criar a sala (' + (e.code || e.message) + ').');
  }
  entrarNaSala(true);
}

// Entra numa sala existente pelo código (só se ainda estiver no lobby e houver lugar).
async function entrar() {
  if (!lerNome()) return erro('Escreve o teu nome.');
  code = $('#mq-codigo').value.trim().toUpperCase();
  if (code.length !== 4) return erro('O código tem 4 letras.');
  if (!(await iniciarSessao())) return erro('Sem ligação ao Firebase.');
  try {
    const s = await getDoc(refSala());
    if (!s.exists()) return erro('Sala não encontrada.');
    const d = s.data();
    if (d.game !== 'milionario') return erro('Essa sala não é do jogo Milionário.');
    if (d.state !== 'lobby') return erro('Essa sala já começou.');
    const j = await getDocs(refJogadores());
    if (j.docs.length >= MAX_JOGADORES && !j.docs.some((x) => x.id === uid)) {
      return erro('Sala cheia (máximo ' + MAX_JOGADORES + ' jogadores).');
    }
  } catch (e) {
    return erro('Erro ao entrar (' + (e.code || e.message) + ').');
  }
  entrarNaSala(false);
}

// Cria o meu jogador e passa a ouvir a sala e os jogadores em tempo real.
async function entrarNaSala(anfitriao) {
  souAnfitriao = anfitriao;
  rondaVista = revelacaoVista = anfitriaoRonda = revelada = -2;
  finalVisto = false;
  minha = null;
  bloqueado = false;
  try {
    await setDoc(refJogador(), {
      expira: expiraEm(),
      name: nome,
      money: 0,
      ok: 0,
      ms: 0,
      ans: null,
      joined: Date.now(),
    });
    if (!anfitriao) {
      // Dois jogadores podem entrar ao mesmo tempo: confirma que ainda houve lugar para mim.
      const todos = await getDocs(refJogadores());
      const ordem = todos.docs
        .map((d) => ({ id: d.id, joined: d.data().joined }))
        .sort((a, b) => a.joined - b.joined || (a.id < b.id ? -1 : 1));
      if (ordem.findIndex((x) => x.id === uid) >= MAX_JOGADORES) {
        await deleteDoc(refJogador());
        return erro('Sala cheia (máximo ' + MAX_JOGADORES + ' jogadores).');
      }
    }
  } catch (e) {
    return erro('Não foi possível entrar na sala (' + (e.code || e.message) + ').');
  }
  ativo = true;
  desfazer = [
    onSnapshot(refSala(), (d) => {
      if (!ativo) return;
      if (!d.exists()) {
        sala = null;
        return salaApagada();
      }
      sala = d.data();
      verificarAnfitriao();
      desenhar();
    }),
    onSnapshot(refJogadores(), (c) => {
      if (!ativo) return;
      jogadores = c.docs.map((x) => ({ id: x.id, ...x.data() }));
      verificarAnfitriao();
      desenhar();
    }),
  ];
  app.innerHTML = '<p style="padding:2rem">A entrar na sala…</p>';
}

/* ---------- Sair ou apagar a sala ---------- */

// Deixa de ouvir o Firestore e pára os temporizadores.
function limparTudo() {
  desfazer.forEach((f) => f());
  desfazer = [];
  clearInterval(cronometro);
  clearTimeout(tAnfitriao);
  clearTimeout(tRevelacao);
  ativo = false;
}

// Sair da sala e voltar ao ecrã inicial do jogo.
async function sair() {
  limparTudo();
  if (!souAnfitriao && code && uid) {
    try {
      await deleteDoc(refJogador());
    } catch (e) {}
  }
  sala = null;
  jogadores = [];
  M.renderStart();
}

// O anfitrião apaga a sala e todos os jogadores (pede confirmação).
async function apagar() {
  if (!confirm('Apagar a sala para todos os jogadores?')) return;
  const ids = jogadores.map((p) => p.id);
  limparTudo();
  try {
    await Promise.all(ids.map((id) => deleteDoc(doc(db, 'rooms', code, 'players', id))));
    await deleteDoc(refSala());
  } catch (e) {}
  sala = null;
  jogadores = [];
  M.renderStart();
}

function salaApagada() {
  limparTudo();
  app.innerHTML = `<div class="start"><h1>Sala terminada</h1><p class="lead">O anfitrião apagou a sala.</p><p><button class="bigbtn" data-mp="sair">Voltar ao início</button></p></div>`;
}

/* ---------- Anfitrião: controla o avanço do jogo ---------- */

// Corre a cada mudança: arranca o tempo máximo da pergunta e revela quando todos responderam.
function verificarAnfitriao() {
  if (!souAnfitriao || !sala || sala.state !== 'play') return;
  if (sala.cur !== anfitriaoRonda) {
    anfitriaoRonda = sala.cur;
    clearTimeout(tAnfitriao);
    tAnfitriao = setTimeout(revelar, sala.per * 1000 + 2000);
  }
  const todosResponderam = jogadores.length > 0 && jogadores.every((p) => respostaDe(p, sala.cur));
  if (!sala.rev && todosResponderam) revelar();
}

// Mostra a resposta certa a todos; passado um tempo avança sozinho.
function revelar() {
  if (!sala || sala.state !== 'play' || sala.rev || revelada === sala.cur) return;
  revelada = sala.cur;
  clearTimeout(tAnfitriao);
  updateDoc(refSala(), { rev: true }).catch(console.error);
  clearTimeout(tRevelacao);
  tRevelacao = setTimeout(avancar, PAUSA_REVELACAO_MS);
}

// Passa à pergunta seguinte, ou termina o jogo depois da última.
function avancar() {
  if (!sala || !sala.rev) return;
  clearTimeout(tRevelacao);
  const ultima = sala.cur + 1 >= sala.qids.length;
  updateDoc(refSala(), ultima ? { state: 'done' } : { cur: sala.cur + 1, rev: false }).catch(
    console.error,
  );
}

// O anfitrião começa o jogo (precisa de pelo menos 2 jogadores).
function comecar() {
  if (!souAnfitriao || !sala || jogadores.length < MIN_JOGADORES) return;
  updateDoc(refSala(), { state: 'play', cur: 0, rev: false }).catch(console.error);
}

/* ---------- Responder ---------- */

// Responder à pergunta atual: a primeira escolha é a final. Quanto mais depressa, mais bónus.
function responder(k) {
  if (!ativo || !sala || sala.state !== 'play' || sala.rev || bloqueado || minha !== null) return;
  const r = sala.cur;
  if (respostaDe(euMesmo(), r)) return;
  const ms = Date.now() - t0;
  if (ms > sala.per * 1000 + 500) return; // fora de tempo
  const q = pergunta(r);
  if (k >= q.o.length) return;
  minha = k;
  bloqueado = true;
  const certa = q.o[k].ok;
  const ganho = certa ? valorGanho(r, ms, sala.per) : 0;
  M.SFX.sel();
  updateDoc(refJogador(), {
    money: increment(ganho),
    ok: increment(certa ? 1 : 0),
    ms: increment(ms),
    ans: { n: r, c: k, g: ganho },
  }).catch(console.error);
  desenhar();
}

/* ---------- Ecrãs ---------- */

// Escolhe o ecrã conforme o estado da sala.
function desenhar() {
  if (!ativo || !sala) return;
  if (sala.state === 'lobby') return ecraSala();
  if (sala.state === 'done') return ecraFinal();
  ecraJogo();
}

// Botão do topo: o anfitrião apaga a sala, os outros saem.
const botaoSair = () =>
  souAnfitriao
    ? '<button class="tb" data-mp="apagar">Apagar sala</button>'
    : '<button class="tb" data-mp="sair">Sair</button>';

// Sala de espera: código, jogadores e botão Começar (só o anfitrião).
function ecraSala() {
  const lista = ordenados()
    .map(
      (p) =>
        `<li><i class="mp-dot" style="background:${corDe(p)}"></i>${esc(p.name)}${p.id === sala.host ? ' <small>(anfitrião)</small>' : ''}${p.id === uid ? ' <small>(tu)</small>' : ''}</li>`,
    )
    .join('');
  const podeComecar = jogadores.length >= MIN_JOGADORES;
  app.innerHTML = `<div class="top"><span class="sp"></span>${botaoSair()}</div>
<div class="start"><h1>Sala <span class="mp-code">${esc(code)}</span></h1>
<p class="lead">Diz aos outros jogadores para entrarem com este código.</p>
<div class="mp-box"><b>Jogadores (${jogadores.length}/${MAX_JOGADORES})</b><ul class="mp-jogadores">${lista}</ul></div>
<p class="best">${sala.qids.length} perguntas · ${sala.per} segundos por pergunta</p>
${
  souAnfitriao
    ? `<p><button class="bigbtn" data-mp="comecar" ${podeComecar ? '' : 'disabled'}>Começar o jogo</button> ${podeComecar ? '' : '<small style="margin-left:.6rem;color:var(--mu)">São precisos pelo menos 2 jogadores.</small>'}</p>`
    : '<p class="best">À espera de que o anfitrião comece o jogo…</p>'
}</div>`;
}

// Pergunta atual (ou a sua revelação) com o placar dos jogadores ao lado.
function ecraJogo() {
  const r = sala.cur;
  const rev = sala.rev;
  const q = pergunta(r);

  // Nova pergunta: arranca o relógio e esquece a resposta anterior.
  if (r !== rondaVista) {
    rondaVista = r;
    t0 = Date.now();
    bloqueado = false;
    minha = null;
    clearInterval(cronometro);
    cronometro = setInterval(tique, 250);
  }
  const eu = euMesmo();
  const resposta = minha !== null ? minha : respostaDe(eu, r) ? respostaDe(eu, r).c : null;
  if (resposta !== null) bloqueado = true;

  // Primeira vez que vejo a revelação desta pergunta.
  const certa = q.o.findIndex((o) => o.ok);
  const acertei = resposta !== null && resposta === certa;
  if (rev && revelacaoVista !== r) {
    revelacaoVista = r;
    revelacaoT0 = Date.now();
    if (resposta !== null) (acertei ? M.SFX.ok : M.SFX.ko)();
  }

  const opcoes = q.o
    .map((o, k) => {
      let cls = 'opt';
      if (rev) cls += o.ok ? ' ok' : resposta === k ? ' ko' : '';
      else if (resposta === k) cls += ' sel';
      const quem = rev
        ? ordenados()
            .filter((p) => respostaDe(p, r) && respostaDe(p, r).c === k)
            .map(
              (p) => `<i class="mp-dot" style="background:${corDe(p)}" title="${esc(p.name)}"></i>`,
            )
            .join('')
        : '';
      const desativada = rev || bloqueado;
      return `<button class="${cls}" data-o="${k}" ${desativada ? 'disabled' : ''}><span class="ltr">${LETRAS[k]}:</span><span>${esc(cap(o.t))}</span>${quem ? `<span class="mp-quem">${quem}</span>` : ''}</button>`;
    })
    .join('');

  let abaixo;
  if (rev) {
    const ganho = respostaDe(eu, r) ? respostaDe(eu, r).g : 0;
    const titulo =
      resposta === null ? 'Sem resposta.' : acertei ? 'Certa! +' + money(ganho) : 'Errada.';
    const ultima = r + 1 >= sala.qids.length;
    abaixo = `<div class="reveal ${acertei ? 'good' : 'bad'}" role="status"><b>${titulo}</b>
<p>Resposta certa: <b>${LETRAS[certa]}: ${esc(cap(q.o[certa].t))}</b></p>
${q.e ? `<div>${q.e}</div>` : ''}${q.u ? '<small>Esta resposta não está confirmada oficialmente.</small>' : ''}
${
  souAnfitriao
    ? `<button class="b go" data-mp="seguinte">${ultima ? 'Ver o resultado' : 'Pergunta seguinte'}</button>`
    : '<small>A pergunta seguinte começa daqui a pouco…</small>'
}</div>`;
  } else if (resposta !== null) {
    const feitas = jogadores.filter((p) => respostaDe(p, r)).length;
    abaixo = `<p class="mp-aviso">Resposta enviada. À espera dos outros (${feitas}/${jogadores.length})…</p>`;
  } else if (bloqueado) {
    abaixo = '<p class="mp-aviso">Tempo esgotado. À espera da revelação…</p>';
  } else {
    abaixo = '<p class="mp-aviso">Escolhe a resposta: quanto mais depressa, maior o bónus.</p>';
  }

  app.innerHTML = `<div class="top"><span class="sp"></span>${botaoSair()}</div>
<div class="game"><section class="stage">
<div class="meta"><span>Pergunta ${r + 1} de ${sala.qids.length}</span><b>Vale ${money(valorDaRonda(r))}</b></div>
<div class="mp-tempo" title="O bónus de rapidez diminui com o tempo"><i id="mq-barra"></i><span id="mq-t"></span></div>
<div class="qarea"><div class="qbox"><span>${esc(q.q)}</span></div>
<div class="opts n${q.o.length}">${opcoes}</div>
${abaixo}</div></section>
<aside class="mp-placar" aria-label="Jogadores">${placar(r, rev)}</aside></div>`;
  tique();
}

// Placar: durante a pergunta mostra quem já respondeu (sem dizer se acertou);
// na revelação mostra a classificação e o ganho de cada um.
function placar(r, rev) {
  const lista = rev ? classificacao() : ordenados();
  const linhas = lista
    .map((p) => {
      const resp = respostaDe(p, r);
      // Antes da revelação esconde o ganho desta ronda, para ninguém deduzir a resposta certa.
      const dinheiro = p.money - (resp && !rev ? resp.g : 0);
      let estado;
      if (rev) estado = !resp ? '—' : resp.g > 0 ? '+' + money(resp.g) : '✖';
      else estado = resp ? '✔' : '…';
      return `<li class="${p.id === uid ? 'eu' : ''}"><i class="mp-dot" style="background:${corDe(p)}"></i><span class="mp-nome">${esc(p.name)}</span><span class="mp-din">${money(dinheiro)}</span><span class="mp-st">${estado}</span></li>`;
    })
    .join('');
  return `<b>${rev ? 'Classificação' : 'Jogadores'}</b><ol class="mp-lista">${linhas}</ol>`;
}

// Relógio: barra e segundos restantes (e, na revelação, quanto falta para a pergunta seguinte).
function tique() {
  if (!ativo || !sala || sala.state !== 'play') return;
  const texto = $('#mq-t');
  const barra = $('#mq-barra');
  if (!texto || !barra) return;
  if (sala.rev) {
    const resta = Math.max(0, Math.ceil((PAUSA_REVELACAO_MS - (Date.now() - revelacaoT0)) / 1000));
    texto.textContent = 'Seguinte em ' + resta + ' s';
    barra.style.width = '0';
    return;
  }
  const resta = sala.per * 1000 - (Date.now() - t0);
  texto.textContent = Math.max(0, Math.ceil(resta / 1000)) + ' s';
  barra.style.width = Math.max(0, (resta / (sala.per * 1000)) * 100) + '%';
  if (resta <= 0 && !bloqueado) {
    bloqueado = true; // tempo esgotado: já não se pode responder
    desenhar();
  }
}

// Ecrã final: vencedor e classificação completa.
function ecraFinal() {
  clearInterval(cronometro);
  const lista = classificacao();
  const vencedor = lista[0];
  if (!finalVisto) {
    finalVisto = true;
    if (vencedor && vencedor.id === uid) M.SFX.win();
  }
  const medalhas = ['🥇', '🥈', '🥉', '4.º'];
  const linhas = lista
    .map(
      (p, i) =>
        `<li class="${p.id === uid ? 'eu' : ''}"><span class="mp-med">${medalhas[i]}</span><i class="mp-dot" style="background:${corDe(p)}"></i><span class="mp-nome">${esc(p.name)}</span><span class="mp-din">${money(p.money)}</span><small>${p.ok}/${sala.qids.length} certas</small></li>`,
    )
    .join('');
  app.innerHTML = `<div class="top"><span class="sp"></span>${botaoSair()}</div>
<div class="end"><h1>${vencedor && vencedor.id === uid ? 'Ganhaste! 🏆' : esc(vencedor ? vencedor.name : '') + ' ganhou!'}</h1>
<div class="amt">${money(vencedor ? vencedor.money : 0)}</div>
<ol class="mp-lista mp-final">${linhas}</ol>
<div class="row"><button class="bigbtn" data-mp="sair">Voltar ao início</button></div></div>`;
}

/* ---------- Eventos: cliques e teclado ---------- */

const ACOES = {
  voltar: () => M.renderStart(),
  criar,
  entrar,
  comecar,
  seguinte: avancar,
  apagar,
  sair,
};

let eventosRegistados = false;
let limpezaFeita = false;
function registarEventos() {
  if (eventosRegistados) return;
  eventosRegistados = true;
  app.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b || b.disabled) return;
    if (b.dataset.o !== undefined) return responder(+b.dataset.o);
    const f = ACOES[b.dataset.mp];
    if (f) f();
  });
  // Teclas A-D ou 1-4 para responder.
  document.addEventListener('keydown', (e) => {
    if (!ativo || !sala || sala.state !== 'play' || e.ctrlKey || e.metaKey || e.altKey) return;
    const k = e.key.toLowerCase();
    const x = 'abcd'.indexOf(k) >= 0 ? 'abcd'.indexOf(k) : ['1', '2', '3', '4'].indexOf(k);
    if (x >= 0) responder(x);
  });
}
