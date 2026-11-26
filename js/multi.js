/* ==========================================================================
   multi.js  —  modo Multijogador (salas em tempo real com Firebase)
   --------------------------------------------------------------------------
   É carregado como módulo (type="module") porque importa o Firebase.
   Usa os dados e funções da página testes.html (window.QS, window.quizPick...).

   Fluxo do jogador:
     1. Multijogador  ->  escreve o nome
     2. Criar sala  ou  Juntar-me a uma sala (lista de salas abertas em direto)
     3. Sala de espera  ->  o anfitrião começa  ->  cada um faz o teste ao seu ritmo
     4. Durante o teste ninguém vê tabelas: só o anfitrião vê quem acertou, o progresso e o tempo
     5. Quando todos acabam (ou o anfitrião termina o teste) aparecem os resultados a todos;
        em cada teste a resposta certa fica a verde e a resposta errada do jogador a vermelho
     6. Quem sair sem querer volta a entrar na sala e continua onde parou
        (o código da sala fica guardado neste browser e o jogador continua no Firestore)

   Estrutura dos dados no Firestore:
     rooms/{CÓDIGO}            a sala:
         host   id do anfitrião        hostName  nome do anfitrião
         hp     true se o anfitrião também joga
         state  'lobby' | 'play' | 'done'
         qids   ids das perguntas      ord  'sh' (baralhadas) | 'orig' (ordem original)
         lim    limite de tempo (ms, 0 = sem limite)
         criada hora de criação (ms)   mode 'race', per, cur, rev  (campos antigos, já não usados)
     rooms/{CÓDIGO}/players/{uid}   cada jogador:
         name, score (certas), n (respondidas), ms (tempo), st (hora a que começou),
         done, a (respostas: { nº da pergunta: opção })   (ok e ans: campos antigos)

   Funções principais:
     mpHub() -> nome -> hubMenu() -> (mpCreateBox()+create())  ou  hubSalas()+join()
     enter() -> render() decide o ecrã: lobby() -> race()/espera()/board() -> results()
   Cada alteração no Firestore chama render() outra vez (onSnapshot).
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
  query,
  where,
  Timestamp,
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { firebaseConfig, VALIDADE_SALA_MS } from './firebase-config.js';
import { limparSalasExpiradas } from './limpeza-salas.js';

// Ligação ao projeto Firebase (a configuração está em firebase-config.js).
const app = initializeApp(firebaseConfig);

// Data a partir da qual o Firebase pode apagar a sala ou o jogador (apagada por limpeza-salas.js).
const expiraEm = () => Timestamp.fromMillis(Date.now() + VALIDADE_SALA_MS);

// Uma sala à espera de jogadores só aparece na lista durante este tempo (evita salas abandonadas).
const SALA_ABERTA_MS = 2 * 60 * 60 * 1000;

// auth = autenticação, db = base de dados, QS = perguntas (de quiz.js).
const auth = getAuth(app),
  db = getFirestore(app),
  QS = window.QS;

// $ = atalho para querySelector, main = área principal, E = escapa HTML.
const $ = (s) => document.querySelector(s),
  main = $('#main'),
  E = (s) =>
    String(s).replace(
      /[&<>"]/g,
      (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c],
    );

// L(k) = letra da opção (0 -> a). fmt(ms) = tempo em mm:ss.
const L = (k) => String.fromCharCode(97 + k),
  fmt = (ms) => {
    const s = Math.max(0, Math.round(ms / 1000));
    return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  };

// Estado local:
//   uid      id anónimo deste jogador        code   código da sala (4 letras)
//   room     dados atuais da sala            pl     lista de jogadores
//   host     true se esta sala é minha       un     funções para deixar de ouvir o Firestore
//   i / okc  pergunta atual / certas         t0     hora a que comecei o teste (guardada no jogador: st)
//   fin      true se já acabei               name   o meu nome
//   hubName  nome confirmado nesta visita    hubUn  para de ouvir a lista de salas
//   view     ecrã de resultados aberto (null, 'ov' = visão geral, ou { p: id do jogador })
//   onlyWrong  na revisão de um jogador, mostrar só as erradas
let uid,
  code,
  room,
  pl = [],
  un = [],
  host = false,
  i = 0,
  okc = 0,
  t0 = 0,
  tm = null,
  fin = false,
  ending = false,
  name = '',
  hubName = '',
  hubUn = null,
  view = null,
  onlyWrong = false;

// Login anónimo: dá um id a cada jogador sem pedir conta (o mesmo id volta neste browser).
const ready = signInAnonymously(auth)
  .then((c) => (uid = c.user.uid))
  .catch((e) => console.error(e));

// Depois do login, apaga as salas expiradas (ver limpeza-salas.js).
ready.then(() => uid && limparSalasExpiradas(db));

// rd() = referência à sala; pd() = referência ao meu jogador.
const rd = () => doc(db, 'rooms', code),
  pd = () => doc(db, 'rooms', code, 'players', uid);

// Mostra uma mensagem de erro no ecrã (campo #me); se o ecrã não tiver esse campo, usa um aviso.
const err = (m) => {
  const e = $('#me');
  if (e) e.textContent = m;
  else alert(m);
};

// Nome e código da sala guardados neste browser (para voltar à sala e para não escrever o nome outra vez).
const store = {
  get: (k) => {
    try {
      return localStorage[k] || '';
    } catch (e) {
      return '';
    }
  },
  set: (k, v) => {
    try {
      localStorage[k] = v;
    } catch (e) {}
  },
  del: (k) => {
    try {
      localStorage.removeItem(k);
    } catch (e) {}
  },
};

// spec() = true se sou o anfitrião e só estou a acompanhar (não jogo).
const spec = () => host && room && room.hp === false;

// allDone() = todos os jogadores já acabaram. over() = o teste acabou (todos acabaram ou o anfitrião terminou).
const allDone = () => !!pl.length && pl.every((p) => p.done);
const over = () => !!room && (room.state === 'done' || (room.state === 'play' && allDone()));

// Texto curto com as definições da sala.
const regras = (r) =>
  `${r.qids.length} perguntas · ${r.ord === 'orig' ? 'pela ordem original' : 'baralhadas'} · ${r.lim ? Math.round(r.lim / 60000) + ' min' : 'sem limite de tempo'}`;

// ---------- 1) Nome, criar sala ou juntar-me a uma sala ----------

const stopHub = () => {
  if (hubUn) {
    hubUn();
    hubUn = null;
  }
};

const backLink =
  '<p><a class="btn" href="testes.html" onclick="home(event)">← Escolher o modo</a></p>';

// Entrada do Multijogador (chamada por testes.js): pede o nome e depois mostra o menu.
window.mpHub = () => {
  stopHub();
  main.dataset.k = '';
  hubName ? hubMenu() : hubNome();
};

// Passo 1: criar o nome.
function hubNome() {
  main.innerHTML = `${backLink}<h1 class="t">Multijogador</h1><div class="box"><b>Como te chamas?</b><label>O teu nome: <input id="mn" maxlength="16" autocomplete="off" value="${E(store.get('mpname'))}"></label><p><button class="btn p" id="mnok">Continuar</button> <small id="me" style="color:var(--ko)"></small></p></div><div id="rj"></div>`;
  const ok = () => {
    const n = $('#mn').value.trim();
    if (!n) return err('Escreve o teu nome.');
    name = hubName = n;
    store.set('mpname', n);
    hubMenu();
  };
  $('#mnok').onclick = ok;
  $('#mn').onkeydown = (e) => e.key === 'Enter' && ok();
  $('#mn').focus();
  rejoinCard();
}

// Passo 2: criar uma sala ou juntar-me a uma.
function hubMenu() {
  stopHub();
  name = hubName;
  main.dataset.k = '';
  main.innerHTML = `${backLink}<h1 class="t">Multijogador</h1><p>Olá, <b>${E(hubName)}</b> · <button class="btn" id="mnc" type="button">Mudar nome</button></p><div id="rj"></div><div class="cards"><a class="card" href="#" id="mc1"><b>➕ Criar sala</b><small>Escolhe os temas, a ordem das perguntas e o tempo.</small></a><a class="card" href="#" id="mc2"><b>🚪 Juntar-me a uma sala</b><small>Vê as salas abertas e entra numa delas.</small></a></div>`;
  $('#mnc').onclick = () => {
    hubName = '';
    hubNome();
  };
  $('#mc1').onclick = (e) => {
    e.preventDefault();
    window.quizCfgForm(true, hubMenu); // formulário de temas, tempo e ordem (testes.js)
  };
  $('#mc2').onclick = (e) => {
    e.preventDefault();
    hubSalas();
  };
  rejoinCard();
}

// Passo 3 (juntar-me): lista das salas abertas, em tempo real.
async function hubSalas() {
  stopHub();
  main.innerHTML = `<p><button class="btn" id="bk" type="button">← Voltar</button></p><h1 class="t">Salas abertas</h1><div id="sl"><p>A procurar salas…</p></div><div class="box"><b>Tens um código?</b><label>Código da sala: <input id="mc" maxlength="4" autocomplete="off" style="width:90px;text-transform:uppercase"></label><p><button class="btn" id="mj">Entrar na sala</button> <small id="me" style="color:var(--ko)"></small></p></div>`;
  $('#bk').onclick = hubMenu;
  $('#mj').onclick = () => join($('#mc').value);
  $('#mc').onkeydown = (e) => e.key === 'Enter' && join($('#mc').value);
  await ready;
  if (!$('#sl')) return; // entretanto saí deste ecrã
  if (!uid) return ($('#sl').innerHTML = '<p>Sem ligação ao Firebase. Verifica o login anónimo.</p>');
  hubUn = onSnapshot(
    query(collection(db, 'rooms'), where('state', '==', 'lobby')),
    (s) => {
      const box = $('#sl');
      if (!box) return;
      const rows = s.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter(
          (r) =>
            r.game !== 'milionario' &&
            Array.isArray(r.qids) &&
            Date.now() - (r.criada || 0) < SALA_ABERTA_MS,
        )
        .sort((a, b) => (b.criada || 0) - (a.criada || 0));
      box.innerHTML = rows.length
        ? rows
            .map(
              (r) =>
                `<div class="box sala"><div><b class="cd">${E(r.id)}</b> <span>Sala de <b>${E(r.hostName || 'anfitrião')}</b></span><br><small>${regras(r)}</small></div><button class="btn p" data-c="${E(r.id)}">${r.host === uid ? 'Voltar à minha sala' : 'Entrar'}</button></div>`,
            )
            .join('')
        : '<p>Não há salas abertas neste momento. Cria uma, ou espera que alguém crie.</p>';
      box.querySelectorAll('[data-c]').forEach((b) => (b.onclick = () => join(b.dataset.c)));
    },
    (e) => {
      const box = $('#sl');
      if (box)
        box.innerHTML =
          e.code === 'permission-denied'
            ? '<p>Sem permissão para listar as salas. É preciso atualizar as regras do Firestore.</p>'
            : '<p>Não foi possível carregar as salas (' + E(e.code || 'erro') + ').</p>';
    },
  );
}

// Cartão "Voltar à sala": aparece se este browser tem uma sala guardada onde ainda estou.
async function rejoinCard() {
  const c = store.get('mpsala'),
    el = $('#rj');
  if (!c || !el) return;
  await ready;
  if (!uid) return;
  try {
    const s = await getDoc(doc(db, 'rooms', c));
    if (!s.exists()) return store.del('mpsala');
    const r = s.data();
    let mine = r.host === uid;
    if (!mine) mine = (await getDoc(doc(db, 'rooms', c, 'players', uid))).exists();
    if (!mine) return store.del('mpsala');
    if (!document.body.contains(el)) return;
    const quando =
      r.state === 'lobby'
        ? 'ainda está na sala de espera'
        : r.state === 'play'
          ? 'tem um teste em curso'
          : 'já tem resultados';
    el.innerHTML = `<div class="box sala"><div><b>↩ A tua sala <span class="cd">${E(c)}</span></b><br><small>${quando} — continuas onde ficaste.</small></div><button class="btn p" id="rj1">Voltar à sala</button></div>`;
    $('#rj1').onclick = () => join(c);
  } catch (e) {
    // sem permissão ou sem ligação: simplesmente não mostra o cartão
  }
}

// ---------- 2) Criar sala ----------

// Caixa extra do formulário de criação (chamada por testes.js depois de desenhar o formulário).
window.mpCreateBox = () => {
  if ($('#mk')) return;
  const b = document.createElement('div');
  b.className = 'box';
  b.innerHTML = `<b>👥 Sala</b>
<label><input type="checkbox" id="mh" checked> Participar também no teste (desmarca para só acompanhar a sala)</label>
<p><small>Durante o teste só tu (anfitrião) vês quem acertou, o progresso e o tempo. Os outros jogadores só veem os resultados quando todos acabarem ou quando terminares o teste.</small></p>
<p><button class="btn p" id="mk">Criar sala</button> <small id="me" style="color:var(--ko)"></small></p>`;
  main.append(b);
  $('#mk').onclick = create;
};

// Código de 4 letras (sem I nem O, para não se confundirem com 1 e 0).
const gerarCodigo = () =>
  Array.from({ length: 4 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ'[(Math.random() * 24) | 0]).join('');

// Cria a sala: usa as perguntas escolhidas (baralhadas ou pela ordem original) e grava no Firestore.
async function create() {
  if (!name) return err('Escreve o teu nome.');
  const p = window.quizPick();
  if (!p.length) return err('Escolhe pelo menos um tema.');
  const n = Math.min(+$('#qn').value || 100, p.length),
    lim =
      document.querySelector('[name=tm]:checked').value === '1'
        ? Math.max(1, +$('#qm').value || 120) * 60000
        : 0,
    ord = document.querySelector('[name=qo]:checked').value,
    hp = $('#mh').checked,
    btn = $('#mk');
  btn.disabled = true;
  err('');
  await ready;
  if (!uid) {
    btn.disabled = false;
    return err('Sem ligação ao Firebase. Verifica o login anónimo.');
  }
  // Procura um código que ainda não esteja a ser usado.
  code = '';
  for (let t = 0; t < 8 && !code; t++) {
    const c = gerarCodigo();
    try {
      if (!(await getDoc(doc(db, 'rooms', c))).exists()) code = c;
    } catch (e) {
      code = c;
    }
  }
  if (!code) {
    btn.disabled = false;
    return err('Não foi possível arranjar um código livre. Tenta outra vez.');
  }
  try {
    await setDoc(rd(), {
      expira: expiraEm(),
      host: uid,
      hostName: name,
      hp,
      mode: 'race',
      state: 'lobby',
      qids: p.slice(0, n).map((q) => q.id),
      ord,
      lim,
      per: 20,
      cur: -1,
      rev: false,
      criada: Date.now(),
    });
  } catch (e) {
    btn.disabled = false;
    return err('Não foi possível criar a sala (' + e.code + ').');
  }
  enter(true, hp);
}

// ---------- 3) Entrar numa sala (ou voltar a ela) ----------

// Entra numa sala pelo código. Quem já faz parte da sala (ou é o anfitrião) volta a entrar
// em qualquer estado e continua onde parou; um jogador novo só entra se a sala ainda estiver no lobby.
async function join(c) {
  c = String(c || '')
    .trim()
    .toUpperCase();
  if (c.length !== 4) return err('O código tem 4 letras.');
  await ready;
  if (!uid) return err('Sem ligação ao Firebase.');
  code = c;
  let r, mine, p;
  try {
    const s = await getDoc(rd());
    if (!s.exists()) return err('Sala não encontrada.');
    r = s.data();
    if (r.game === 'milionario') return err('Essa sala é do jogo Milionário.');
    mine = r.host === uid;
    if (!mine) {
      try {
        const m = await getDoc(pd());
        mine = m.exists();
        p = m.exists() ? m.data() : null;
      } catch (e) {}
    }
  } catch (e) {
    return err('Erro ao entrar (' + e.code + ').');
  }
  if (!mine && r.state !== 'lobby') return err('Essa sala já começou.');
  if (!mine && !name) return err('Escreve o teu nome.');
  if (p && p.name && !hubName) name = hubName = p.name;
  enter(r.host === uid, !mine);
}

// Entra na sala: cria o meu jogador (só na primeira vez) e passa a ouvir a sala e os jogadores em tempo real.
async function enter(h, plays) {
  stopHub();
  host = h;
  i = 0;
  okc = 0;
  t0 = 0;
  fin = false;
  ending = false;
  room = null;
  pl = [];
  view = null;
  onlyWrong = false;
  if (plays) {
    try {
      await setDoc(pd(), {
        expira: expiraEm(),
        name,
        score: 0,
        ok: 0,
        n: 0,
        ms: 0,
        st: 0,
        done: false,
        ans: null,
        a: {},
      });
    } catch (e) {
      return err('Não foi possível entrar na sala (' + e.code + ').');
    }
  }
  window.mpActive = true;
  main.dataset.k = '';
  store.set('mpsala', code); // para poder voltar à sala se sair sem querer
  un = [
    onSnapshot(
      rd(),
      (d) => {
        if (!d.exists()) {
          room = null;
          return gone();
        }
        room = d.data();
        hostCheck();
        render();
      },
      (e) => console.error(e),
    ),
    onSnapshot(
      collection(db, 'rooms', code, 'players'),
      (c) => {
        pl = c.docs.map((x) => ({ id: x.id, ...x.data() }));
        hostCheck();
        render();
      },
      (e) => console.error(e),
    ),
  ];
  main.innerHTML = '<p>A entrar na sala…</p>';
}

// Para de ouvir o Firestore e volta ao menu do Multijogador. O jogador continua na sala (pode voltar).
function leave() {
  un.forEach((f) => f());
  un = [];
  clearInterval(tm);
  window.mpActive = false;
  main.dataset.k = '';
  window.quizCfg();
}

// Botão "Sair". Durante o teste pede confirmação e guarda a sala para poderes voltar; no fim esquece-a.
function sair() {
  if (room && room.state === 'lobby') {
    if (!host) {
      deleteDoc(pd()).catch(() => {}); // sai da lista de jogadores
      store.del('mpsala');
    }
  } else if (room && !over()) {
    if (
      !confirm(
        'Sair do teste? Podes voltar a entrar (Multijogador → Voltar à sala) e continuar onde ficaste.',
      )
    )
      return;
  } else store.del('mpsala');
  leave();
}

// Mostra o aviso quando o anfitrião apaga a sala.
function gone() {
  clearInterval(tm);
  store.del('mpsala');
  main.dataset.k = '';
  main.innerHTML =
    '<h1 class="t">Sala apagada</h1><p>O anfitrião apagou esta sala.</p><button class="btn p" id="lv">Sair</button>';
  $('#lv').onclick = leave;
}

// Anfitrião apaga a sala e todos os jogadores (pede confirmação).
async function delRoom() {
  if (!confirm('Apagar esta sala para todos? Não dá para desfazer.')) return;
  un.forEach((f) => f());
  un = [];
  clearInterval(tm);
  try {
    const s = await getDocs(collection(db, 'rooms', code, 'players'));
    await Promise.all(s.docs.map((d) => deleteDoc(d.ref)));
    await deleteDoc(rd());
  } catch (e) {
    alert('Não foi possível apagar a sala (' + e.code + '). Confirma que publicaste as regras novas.');
  }
  store.del('mpsala');
  window.mpActive = false;
  main.dataset.k = '';
  window.quizCfg();
}

// Botão "Apagar sala" (só aparece ao anfitrião).
const hostBtn = () => (host ? '<button class="btn" id="dl">🗑️ Apagar sala</button>' : '');

// Liga o clique do botão "Apagar sala".
const bindHost = () => {
  if ($('#dl')) $('#dl').onclick = delRoom;
};

// Atualiza os dados do meu jogador no Firestore (pontos, respostas, ...).
const upd = (o) => updateDoc(pd(), o).catch(console.error);

// ---------- 4) Ecrãs da sala ----------

// Escolhe o ecrã conforme o estado da sala: espera, teste ou resultados.
function render() {
  if (!room || !window.mpActive) return;
  if (room.state === 'lobby') return lobby();
  if (over()) return results();
  race();
}

// Só o anfitrião: quando todos acabaram, fecha o teste (todos passam a ver os resultados).
function hostCheck() {
  if (!host || !room || room.state !== 'play' || ending) return;
  if (allDone()) {
    ending = true;
    updateDoc(rd(), { state: 'done' }).catch((e) => {
      ending = false;
      console.error(e);
    });
  }
}

// Só o anfitrião: termina o teste para todos e passa logo aos resultados.
function terminar() {
  if (
    !confirm(
      'Terminar o teste para todos e ver já os resultados? Quem ainda não acabou fica com as perguntas em falta por responder.',
    )
  )
    return;
  updateDoc(rd(), { state: 'done' }).catch((e) =>
    alert('Não foi possível terminar o teste (' + e.code + ').'),
  );
}

// Sala de espera: código, regras, lista de jogadores e botão Começar (só o anfitrião).
function lobby() {
  main.dataset.k = '';
  main.innerHTML =
    `<h1 class="t">Sala <span style="letter-spacing:.2em">${E(code)}</span></h1><p>${regras(room)}</p>
<p>Os amigos entram escolhendo esta sala na lista (ou com o código).</p><div class="box"><b>Jogadores (${pl.length})</b><br>${pl.map((p) => E(p.name) + (p.id === room.host ? ' 👑' : '')).join(' · ') || '—'}</div>` +
    (host
      ? `<p>${spec() ? 'Estás só a acompanhar (não participas no teste).' : 'Vais participar no teste.'}</p><button class="btn p" id="st">Começar</button> ${hostBtn()} `
      : '<p>À espera do anfitrião…</p>') +
    '<button class="btn" id="lv">Sair</button>';
  $('#lv').onclick = sair;
  bindHost();
  if (host)
    $('#st').onclick = () => {
      if (!pl.length) return alert('Ainda não há jogadores na sala.');
      updateDoc(rd(), { state: 'play' }).catch((e) =>
        alert('Não foi possível começar (' + e.code + ').'),
      );
    };
}

// Tabela com o ranking (por certas e tempo). links = mostrar botão "Ver teste".
function rank(links) {
  const tot = room.qids.length,
    s = [...pl].sort((a, b) => b.score - a.score || (a.n ? a.ms : 1e12) - (b.n ? b.ms : 1e12));
  return (
    '<table><tr><th>#</th><th>Jogador</th><th>Certas</th><th>Progresso</th><th>Tempo</th>' +
    (links ? '<th></th>' : '') +
    '</tr>' +
    s
      .map(
        (p, k) =>
          `<tr${p.id === uid ? ' style="font-weight:700"' : ''}><td>${k + 1}</td><td>${E(p.name)}${p.id === room.host ? ' 👑' : ''}</td><td>${p.score}</td><td>${p.n}/${tot}${p.done ? ' ✔' : ''}</td><td>${fmt(p.ms)}</td>${links ? `<td><button class="btn" data-p="${p.id}">Ver teste</button></td>` : ''}</tr>`,
      )
      .join('') +
    '</table>'
  );
}

// Painel do anfitrião: quem já acabou, a tabela em direto e o botão para terminar o teste.
const boardHtml = () =>
  `<div class="box hb"><b>📊 Painel do anfitrião</b> <small>(só tu vês isto durante o teste)</small><p>${pl.filter((p) => p.done).length}/${pl.length} terminaram</p>${rank(0)}<p><button class="btn p" id="ft">⏹ Terminar teste e ver os resultados</button> ${hostBtn()}</p></div>`;
const bindBoard = () => {
  if ($('#ft')) $('#ft').onclick = terminar;
  bindHost();
};
const refreshBoard = () => {
  const b = $('#hb');
  if (b) {
    b.innerHTML = boardHtml();
    bindBoard();
  }
};

// HTML dos botões das opções de uma pergunta (sem mostrar qual é a certa).
const opts = (q) =>
  q.o
    .map((o, k) => `<button class="opt" data-o="${k}"><b>${L(k)})</b> ${E(o)}</button>`)
    .join('');

// O teste: cada jogador avança ao seu ritmo. Quem voltou à sala continua na pergunta onde parou.
function race() {
  const n = room.qids.length;
  if (spec()) return board();
  const me = pl.find((p) => p.id === uid);
  if (!me) {
    main.dataset.k = '';
    main.innerHTML = '<p>A carregar…</p>';
    return;
  }
  if (!t0) {
    // Primeira vez neste ecrã: retoma o ponto onde estava (hora de início, pergunta, certas).
    t0 = me.st || Date.now();
    if (!me.st) upd({ st: t0 });
    i = me.n || 0;
    okc = me.score || 0;
    fin = !!me.done;
    clearInterval(tm);
    tm = setInterval(tick, 1000);
  }
  if (fin || i >= n) return espera();
  const k = 'q' + i,
    q = QS[room.qids[i]];
  // As respostas dos outros não mexem na pergunta que estou a ler: só o painel do anfitrião se atualiza.
  if (main.dataset.k === k) return refreshBoard();
  main.dataset.k = k;
  main.innerHTML = `<div class="qbar"><b>Pergunta ${i + 1}/${n}</b><span class="tm" id="mt"></span><button class="btn" id="lv">Sair</button></div><div class="qt">${E(q.q)}</div>${opts(q)}${host ? '<div id="hb"></div>' : ''}`;
  $('#lv').onclick = sair;
  main.querySelectorAll('.opt').forEach(
    (b) =>
      (b.onclick = () => {
        if (fin) return;
        const o = +b.dataset.o,
          idx = i;
        if (o === q.a) okc++;
        i++;
        if (i >= n) fin = true;
        upd({ score: okc, n: i, ms: Date.now() - t0, done: fin, ['a.' + idx]: o });
        render();
      }),
  );
  refreshBoard();
  tick();
}

// Relógio do teste: mostra o tempo restante (ou decorrido) e termina o meu teste quando o limite acaba.
function tick() {
  if (!room || room.state !== 'play' || !t0) return;
  const e = $('#mt'),
    d = Date.now() - t0;
  if (room.lim && d >= room.lim && !fin) {
    fin = true;
    upd({ score: okc, n: i, ms: room.lim, done: true });
    render();
    return;
  }
  if (e) e.textContent = '⏱ ' + fmt(room.lim ? room.lim - d : d);
}

// Já acabei: espero pelos outros. Não mostra resultados nem tabelas (só o anfitrião vê o painel).
function espera() {
  main.dataset.k = 'w';
  main.innerHTML = `<h1 class="t">Terminaste! ✅</h1><p>À espera dos outros… (${pl.filter((p) => p.done).length}/${pl.length} terminaram). Os resultados aparecem a todos quando o último acabar${host ? '' : ' ou quando o anfitrião terminar o teste'}.</p>${host ? boardHtml() : ''}<p><button class="btn" id="lv">Sair</button></p>`;
  $('#lv').onclick = sair;
  if (host) bindBoard();
}

// Anfitrião que só acompanha: vê o painel enquanto os jogadores fazem o teste.
function board() {
  clearInterval(tm);
  main.dataset.k = '';
  main.innerHTML = `<h1 class="t">A acompanhar a sala ${E(code)}</h1><p>O teste está a decorrer. Quando todos acabarem (ou terminares o teste) aparecem os resultados finais a toda a gente.</p>${boardHtml()}<p><button class="btn" id="lv">Sair</button></p>`;
  $('#lv').onclick = sair;
  bindBoard();
}

// ---------- 5) Resultados ----------

// Perguntas válidas (as anuladas, q.a < 0, não têm resposta certa e não contam).
const cnt = () => room.qids.filter((id) => QS[id].a >= 0).length;

// Botão "📖 Manual" (js/ver-manual.js).
const man = (q) => (window.VerManual ? window.VerManual.btn(q) : '');

// HTML da explicação (ou aviso de resposta não confirmada / pergunta anulada).
const info = (q) =>
  q.a < 0
    ? '<div class="ex"><b>Pergunta anulada</b> <span class="bd">sem resposta certa</span> Não conta para a pontuação.</div>'
    : (q.u
        ? '<span class="bd">resposta não confirmada</span>'
        : q.e
          ? `<div class="ex">${q.e}</div>`
          : '') + man(q);

// Posições (qi) das perguntas da sala pela ordem original dos testes (teste e, dentro dele, nº da pergunta),
// mesmo que a sala tenha sido criada com as perguntas baralhadas. É a ordem usada nos resultados.
const ordemOrig = () => {
  const k = (q) => Math.min(...q.t.map((t, j) => t * 1000 + q.p[j]));
  return room.qids.map((_, qi) => qi).sort((a, b) => k(QS[room.qids[a]]) - k(QS[room.qids[b]]));
};

// Conta quantos jogadores escolheram cada opção na pergunta qi.
function stats(qi) {
  const q = QS[room.qids[qi]],
    c = q.o.map(() => 0);
  let t = 0;
  pl.forEach((p) => {
    const v = p.a && p.a[qi];
    if (v != null && c[v] != null) {
      c[v]++;
      t++;
    }
  });
  return { c, t };
}

// "Visão geral do teste": percentagem de jogadores que escolheu cada opção, por pergunta.
function overview() {
  const open = new Set(
    [...document.querySelectorAll('#ovl details[open]')].map((d) => d.dataset.i),
  );
  return (
    '<h2>Visão geral do teste</h2><p>Clica numa pergunta para ver a percentagem de jogadores que escolheu cada resposta.</p><div id="ovl">' +
    ordemOrig()
      .map((qi, pos) => {
        const q = QS[room.qids[qi]],
          { c, t } = stats(qi),
          pc = (k) => (t ? Math.round((100 * c[k]) / t) : 0);
        return (
          `<details class="co" data-i="${qi}"${open.has(String(qi)) ? ' open' : ''}><summary><b>${pos + 1}.</b> ${E(q.q.slice(0, 90))}${q.q.length > 90 ? '…' : ''} — <b>${q.a < 0 ? 'anulada' : t ? pc(q.a) + '% acertaram' : 'sem respostas'}</b> (${q.a < 0 ? t + ' respostas' : c[q.a] + '/' + t})</summary><div class="qt">${E(q.q)}</div>` +
          q.o
            .map(
              (o, k) =>
                `<div class="opt ${k === q.a ? 'ok' : ''}" style="background:linear-gradient(90deg,color-mix(in srgb,var(${k === q.a ? '--ok' : '--ac'}) 30%,transparent) ${pc(k)}%,transparent ${pc(k)}%)"><b>${L(k)})</b> ${E(o)}<span style="float:right"><b>${pc(k)}%</b> (${c[k]})</span></div>`,
            )
            .join('') +
          info(q) +
          '</details>'
        );
      })
      .join('') +
    '</div>'
  );
}

// O teste de um jogador: todas as perguntas, com a resposta certa a verde e, se errou, a dele a vermelho.
function playerView(id) {
  const p = pl.find((x) => x.id === id);
  if (!p) return '<p>Jogador não encontrado.</p>';
  const rows = ordemOrig().map((qi, pos) => {
      const q = QS[room.qids[qi]],
        c = p.a && p.a[qi];
      return { q, qi: pos, c, st: q.a < 0 ? 'nul' : c == null ? 'sem' : c === q.a ? 'ok' : 'ko' };
    }),
    n = (s) => rows.filter((x) => x.st === s).length,
    list = onlyWrong ? rows.filter((x) => x.st === 'ko' || x.st === 'sem') : rows;
  return (
    `<h2>${E(p.name)}</h2><p>✅ ${n('ok')} certas · ❌ ${n('ko')} erradas${n('sem') ? ' · ➖ ' + n('sem') + ' sem resposta' : ''} · de ${cnt()} perguntas</p><p><button class="btn" id="fw">${onlyWrong ? 'Mostrar todas as perguntas' : 'Mostrar só as erradas'}</button></p>` +
    (list.length
      ? list
          .map(
            ({ q, qi, c, st }) =>
              `<div class="ri"><b>${qi + 1}. ${st === 'ok' ? '✅' : st === 'ko' ? '❌' : st === 'sem' ? '➖' : ''}</b> <span class="qt">${E(q.q)}</span>` +
              q.o
                .map(
                  (o, k) =>
                    `<div class="opt ${k === q.a ? 'ok' : k === c ? 'ko' : ''}"><b>${L(k)})</b> ${E(o)}${k === c ? ' ← resposta de ' + E(p.name) : ''}</div>`,
                )
                .join('') +
              (st === 'sem' ? '<small>Sem resposta.</small>' : '') +
              info(q) +
              '</div>',
          )
          .join('')
      : '<p>Sem erros. 🎉</p>')
  );
}

// Ecrã final (para todos): ranking e acesso ao teste de cada jogador.
function results() {
  clearInterval(tm);
  main.dataset.k = '';
  const me = pl.find((p) => p.id === uid),
    back = '<p><button class="btn" id="bk">← Voltar ao ranking</button></p>';
  let h;
  if (view && view.p) h = back + playerView(view.p);
  else if (view === 'ov') h = back + overview();
  else
    h =
      `<h1 class="t">Resultado final</h1>` +
      (room.state === 'done' && !allDone()
        ? '<p><small>O anfitrião terminou o teste antes de todos acabarem.</small></p>'
        : '') +
      (me ? `<p>Certas: <b>${me.score}/${cnt()}</b> · Tempo: ${fmt(me.ms)}</p>` : '') +
      '<h3>Ranking</h3>' +
      rank(1) +
      `<p>${me ? '<button class="btn p" id="mine">👀 Ver o meu teste</button> ' : ''}<button class="btn" id="ob">📋 Visão geral do teste</button> ${hostBtn()} <button class="btn" id="lv">Sair da sala</button></p>`;
  main.innerHTML = h;
  bindHost();
  const go = (v) => {
    view = v;
    render();
    scrollTo(0, 0);
  };
  if ($('#bk')) $('#bk').onclick = () => go(null);
  if ($('#ob')) $('#ob').onclick = () => go('ov');
  if ($('#mine')) $('#mine').onclick = () => go({ p: uid });
  if ($('#lv')) $('#lv').onclick = sair;
  if ($('#fw'))
    $('#fw').onclick = () => {
      onlyWrong = !onlyWrong;
      render();
    };
  main.querySelectorAll('[data-p]').forEach((b) => (b.onclick = () => go({ p: b.dataset.p })));
}

// Se a página abriu já em #/multi, o testes.js correu antes deste módulo: mostra agora o Multijogador.
if (window.mpMode && !window.mpActive) window.mpHub();
