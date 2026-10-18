/* ==========================================================================
   milionario.js  —  jogo "Quem quer ser milionário?"
   --------------------------------------------------------------------------
   Regras: 15 perguntas, dificuldade a subir, patamares seguros na pergunta 5
   (1.000 €) e 10 (32.000 €), três ajudas (50:50, público, amigo) e possibilidade
   de desistir. Há também vidas, moedas, relíquias, "portas" e loja (modo rl).

   Organização do ficheiro (de cima para baixo):
     1. Funções auxiliares e constantes (prémios, letras)
     2. Perguntas (todas entram) e dificuldade
     3. Relíquias, portas e loja
     4. Som
     5. Ecrã inicial        (renderStart)
     6. Jogo                (startGame, renderPlay, pick, lockIn, reveal, next, lifeline)
     7. Ecrã final          (endGame, renderEnd)
     8. Eventos             (cliques e teclado)

   Fases do jogo (G.phase):
     doors -> shop -> ask -> confirm -> lock -> reveal -> (próxima pergunta) ... -> end
   Depois de qualquer mudança chama-se renderPlay(), que redesenha o ecrã todo.

   Dados das perguntas (de quiz.js): q = texto, o = opções, a = índice da certa,
   e = explicação (HTML), u = 1 se a resposta não está confirmada, s = tema.
   ========================================================================== */

(() => {
  // QS = todas as perguntas (de quiz.js).
  const QS = window.QS || [];
  const app = document.getElementById('app'),
    $ = (s) => document.querySelector(s);

  // Funções auxiliares:
  //   esc      escapa < > & " para HTML seguro
  //   cap      põe a primeira letra em maiúscula
  //   money    formata um valor em euros (1000000 -> "1.000.000 €")
  //   rnd      número inteiro aleatório entre a e b
  //   shuffle  baralha uma lista
  //   reduced  true se o utilizador pediu menos animações
  const esc = (s) =>
    String(s).replace(
      /[&<>"]/g,
      (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c],
    );
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const money = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' €';
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // PRIZE = prémio de cada uma das 15 perguntas.
  const PRIZE = [
    100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000,
    1000000,
  ];

  // SAFE = posições dos patamares seguros (pergunta 5 e pergunta 10).
  const SAFE = [4, 9];

  // safeAmt(l) = prémio garantido se errar na pergunta l (último patamar seguro).
  const safeAmt = (l) => (l >= 10 ? 32000 : l >= 5 ? 1000 : 0);

  // LT = letras das opções.
  const LT = 'ABCD';

  /* ---------- perguntas ---------- */
  // ELIG = perguntas do jogo. Entram TODAS as de quiz.js (repetidas e de 2 opções incluídas).
  const ELIG = QS;

  // Há perguntas cujas opções ou explicação citam outras opções ("todas as anteriores",
  // "alínea b)", "a e c"). Se as opções fossem baralhadas deixavam de fazer sentido,
  // por isso estas mantêm a ordem original (keepOrder).
  const BAD_O =
    /\b(todas|nenhuma|ambas|anteriores|acima|abaixo|alínea)\b|opç|\b[abcd]\)|\b[abcd]\s*(e|ou)\s*[abcd]\b/i;
  const BAD_E = /\b(alínea|letra)\b|opç|\b[abcd]\)/i;
  const keepOrder = (q) => q.o.some((o) => BAD_O.test(o)) || BAD_E.test(q.e || '');

  // Dificuldade estimada: mais opções, enunciado mais longo e opções mais longas = mais difícil.
  const score = (q) =>
    q.o.length * 14 + q.q.length / 5 + q.o.reduce((a, o) => a + o.length, 0) / q.o.length / 4;

  // Prepara uma pergunta para jogar: marca qual é a opção certa (ok) e baralha as opções,
  // exceto nas perguntas que citam outras opções (keepOrder).
  const prep = (q) => {
    const opcoes = q.o.map((t, i) => ({ t, ok: i === q.a }));
    return {
      q: q.q,
      e: q.e || '',
      u: q.u,
      s: q.s,
      o: keepOrder(q) ? opcoes : shuffle(opcoes),
    };
  };

  // POOL = perguntas deste jogo, da mais fácil para a mais difícil.
  let POOL = [];

  // Escolhe a próxima pergunta. Quanto mais alto o nível, mais para o fim da lista POOL
  // (mais difícil) é a escolha; perguntas elite/boss são um pouco mais difíceis.
  // Dentro dessa zona escolhe à sorte, evitando as já vistas (g.seen guarda os id).
  function pickQ() {
    const g = G,
      n = POOL.length;
    let t = Math.min(1, g.lvl / 14 + (g.kind === 'elite' ? 0.18 : g.kind === 'boss' ? 0.08 : 0));
    const w = Math.max(4, Math.round(n * 0.12)),
      c = Math.round(t * (n - 1)),
      win = () => POOL.slice(Math.max(0, c - w), c + w + 1);
    let cand = win().filter((q) => !g.seen.has(q.id));
    if (!cand.length) {
      g.seen.clear();
      cand = win();
    }
    const q = cand[rnd(0, cand.length - 1)];
    g.seen.add(q.id);
    return prep(q);
  }

  // RELICS = relíquias: nome interno -> [emoji, nome, o que faz].
  const RELICS = {
    trevo: ['🍀', 'Trevo', '25% de hipótese de um erro não custar vida.'],
    escudo: ['🛡️', 'Escudo', 'O primeiro erro de cada andar não custa vida.'],
    chama: ['🔥', 'Chama', 'A cada 3 certas seguidas, recuperas 1 vida.'],
    mealheiro: ['🐷', 'Mealheiro', 'Ganhas +50% de moedas.'],
    mochila: ['🎒', 'Mochila', '+1 uso de cada ajuda.'],
    cofre: ['🏦', 'Cofre', 'Se desistires, ficas com +25% do prémio.'],
  };

  // O jogador tem a relíquia k?
  const has = (k) => G.relics.includes(k);

  // Prémio ao desistir: o da última pergunta ganha (+25% com a relíquia Cofre).
  const walkAmt = (g) => {
    const b = g.lvl ? PRIZE[g.lvl - 1] : 0;
    return g.relics.includes('cofre') ? Math.min(1e6, Math.round(b * 1.25)) : b;
  };

  // Dá uma relíquia ao jogador (a Mochila dá logo +1 uso de cada ajuda).
  const giveRelic = (k) => {
    G.relics.push(k);
    if (k === 'mochila') {
      G.ch.f++;
      G.ch.a++;
      G.ch.t++;
    }
  };

  // Sorteia uma relíquia que o jogador ainda não tem (ou null se já tem todas).
  const newRelic = () => {
    const l = Object.keys(RELICS).filter((k) => !G.relics.includes(k));
    return l.length ? l[rnd(0, l.length - 1)] : null;
  };

  // DOORS = caminhos possíveis entre perguntas: [emoji, nome, descrição].
  const DOORS = {
    q: ['❓', 'Pergunta normal', 'Ganhas moedas se acertares.'],
    elite: ['🔥', 'Pergunta de risco', 'Mais difícil, mais moedas e uma hipótese de relíquia.'],
    shop: ['🛒', 'Loja', 'Gasta moedas em relíquias e vidas. Depois segue uma pergunta normal.'],
  };

  // HTML da barra com vidas, moedas e relíquias.
  const HUD = (g) =>
    `<div class="hud"><span aria-label="${g.lives} vidas">${'❤️'.repeat(g.lives)}${'🖤'.repeat(Math.max(0, g.max - g.lives))}</span><span>🪙 ${g.coins}</span>${g.relics.map((k) => `<span class="rl" title="${RELICS[k][1]}: ${RELICS[k][2]}" tabindex="0" aria-label="${RELICS[k][1]}: ${RELICS[k][2]}">${RELICS[k][0]}</span>`).join('')}${g.flash ? `<small>${g.flash}</small>` : ''}</div>`;

  // HTML do ecrã "Escolhe o teu caminho" (as portas).
  const DH = () =>
    `<p style="margin:0 0 .8rem">Escolhe o teu caminho:</p><div class="opts n${G.doors.length}">${G.doors.map((d, i) => `<button class="opt" data-door="${i}"><span class="ltr">${DOORS[d][0]}</span><span><b>${DOORS[d][1]}</b><br><small>${DOORS[d][2]}</small></span></button>`).join('')}</div>`;

  // HTML da loja (relíquias e vida).
  const SH = () =>
    `<p style="margin:0 0 .8rem">Loja. Tens 🪙 ${G.coins}.</p><div class="opts n${G.shop.length}">${G.shop
      .map((k) => {
        const h = k === 'heart',
          c = h ? 60 : 50,
          r = RELICS[k],
          nb = G.coins < c || (h && G.lives >= G.max);
        return `<button class="opt${nb ? ' nb' : ''}" data-buy="${k}" ${nb ? 'disabled' : ''}><span class="ltr">${h ? '❤️' : r[0]}</span><span><b>${h ? 'Uma vida' : r[1]}</b> (🪙 ${c})<br><small>${h ? 'Recupera 1 vida.' : r[2]}</small></span></button>`;
      })
      .join(
        '',
      )}</div><div class="confirm"><button class="b go" data-act="leave">Seguir para a pergunta</button></div>`;

  /* ---------- som (desligado por defeito) ---------- */

  // AC = contexto de áudio (só é criado quando o som é usado).
  let AC = null;

  // Guarda e lê no localStorage sem dar erro se o browser o bloquear.
  const store = {
    get(k) {
      try {
        return localStorage.getItem(k);
      } catch (e) {
        return null;
      }
    },
    set(k, v) {
      try {
        localStorage.setItem(k, v);
      } catch (e) {}
    },
  };

  // SOUND = som ligado? Começa desligado; a escolha fica guardada.
  let SOUND = store.get('qqsm_snd') === '1';

  // Toca uma nota: frequência f, atraso t0, duração d, tipo de onda e volume v.
  function tone(f, t0, d, type, v) {
    if (!SOUND) return;
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      const o = AC.createOscillator(),
        g = AC.createGain(),
        t = AC.currentTime + t0;
      o.type = type || 'sine';
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(v || 0.12, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(g).connect(AC.destination);
      o.start(t);
      o.stop(t + d + 0.05);
    } catch (e) {}
  }

  // SFX = efeitos sonoros (sequências de notas).
  const SFX = {
    sel: () => tone(520, 0, 0.08, 'triangle'),
    lock: () => {
      tone(110, 0, 1.6, 'sawtooth', 0.05);
      tone(165, 0, 1.6, 'sawtooth', 0.04);
    },
    ok: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.3, 'triangle')),
    ko: () => {
      tone(196, 0, 0.35, 'sawtooth', 0.1);
      tone(147, 0.3, 0.7, 'sawtooth', 0.1);
    },
    ll: () => {
      tone(880, 0, 0.12, 'triangle');
      tone(1175, 0.1, 0.2, 'triangle');
    },
    win: () =>
      [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.14, 0.4, 'triangle')),
  };

  /* ---------- estado ---------- */

  // G   = estado do jogo atual (null quando está no menu):
  //         lvl       pergunta atual (0 a 14)      lives/max   vidas atuais / máximo
  //         coins     moedas                       relics      relíquias que tem
  //         ch        ajudas que restam { f: 50:50, a: público, t: amigo }
  //         kind      'normal' | 'elite' | 'boss'  phase       fase (ver topo do ficheiro)
  //         q         pergunta atual               sel         opção marcada
  //         gone      opções eliminadas pelo 50:50 info        resultado do público/amigo
  //         hist      perguntas já respondidas     rl          true = modo com vidas e relíquias
  // CFG = escolhas do ecrã inicial (temas, incluir não confirmadas, modo).
  let G = null,
    CFG = { sel: null, withU: false, mode: 'rl' };

  // Nº de perguntas elegíveis do tema s (wu = incluir as não confirmadas).
  const cnt = (s, wu) => ELIG.filter((q) => q.s === s && (wu || !q.u)).length;

  /* ---------- ecrã inicial ---------- */

  // Ecrã inicial: regras, escolha de temas e botão para começar.
  function renderStart() {
    const subs = [...new Set(ELIG.map((q) => q.s))];
    if (!CFG.sel) CFG.sel = new Set(subs);
    const best = +store.get('qqsm_best') || 0;
    app.innerHTML = `<div class="top"><a class="tb" href="index.html">Voltar ao início</a><span class="sp"></span>${soundBtn()}</div>
<div class="start"><h1>Quem quer ser milionário?</h1>
<p class="lead">15 perguntas do curso de instrutor de condução. Sobe a escada até ao milhão.</p>
<ul class="rules"><li>A dificuldade sobe ao longo da escada.</li><li>Os patamares seguros são a pergunta 5 (1.000 €) e a pergunta 10 (32.000 €): se errares depois deles, ficas com esse valor.</li><li>Tens três ajudas, cada uma só uma vez: 50:50, o público e o amigo. O público e o amigo são simulados e também se enganam, sobretudo nas perguntas difíceis.</li><li>Podes desistir a qualquer momento e ficar com o prémio já ganho.</li></ul>
<div class="box"><b>Temas</b>${subs.map((s) => `<label><input type="checkbox" class="tp" value="${esc(s)}" ${CFG.sel.has(s) ? 'checked' : ''}> <span>${esc(s)} <small class="c" data-s="${esc(s)}"></small></span></label>`).join('')}</div>
<div class="box"><label><input type="checkbox" id="wu" ${CFG.withU ? 'checked' : ''}> <span>Incluir perguntas com resposta não confirmada <small id="uc"></small></span></label></div>
<p><button class="bigbtn" id="go" data-act="start">Começar o jogo</button> <small id="avail" style="margin-left:.6rem;color:var(--mu)"></small></p>
${best ? `<p class="best">O teu melhor prémio neste dispositivo: <b>${money(best)}</b></p>` : ''}</div>`;
    startInfo();
  }

  // Atualiza as contagens do ecrã inicial. O jogo precisa de pelo menos 15 perguntas.
  function startInfo() {
    const sel = new Set([...document.querySelectorAll('.tp:checked')].map((c) => c.value)),
      wu = $('#wu').checked;
    CFG.sel = sel;
    CFG.withU = wu;
    document
      .querySelectorAll('.c')
      .forEach((e) => (e.textContent = '(' + cnt(e.dataset.s, wu) + ')'));
    $('#uc').textContent = '(' + ELIG.filter((q) => q.u).length + ' no total)';
    const n = ELIG.filter((q) => sel.has(q.s) && (wu || !q.u)).length;
    $('#avail').textContent =
      n >= 15
        ? n + ' perguntas disponíveis'
        : 'Escolhe mais temas: são precisas pelo menos 15 perguntas.';
    $('#go').disabled = n < 15;
  }

  // HTML do botão Som ligado/desligado.
  const soundBtn = () =>
    `<button class="tb" data-act="sound" aria-pressed="${SOUND}">${SOUND ? 'Som ligado' : 'Som desligado'}</button>`;

  /* ---------- jogo ---------- */

  // Começa um jogo: filtra pelos temas, ordena por dificuldade e cria o estado G.
  function startGame() {
    if (G && G.timer) clearTimeout(G.timer);
    POOL = shuffle(ELIG.filter((q) => CFG.sel.has(q.s) && (CFG.withU || !q.u))).sort(
      (a, b) => score(a) - score(b),
    );
    const rl = CFG.mode !== 'classic';
    G = {
      rl,
      lvl: 0,
      lives: rl ? 3 : 1,
      max: 5,
      coins: 0,
      relics: [],
      ch: { f: 1, a: 1, t: 1 },
      streak: 0,
      seen: new Set(),
      kind: 'normal',
      shield: 0,
      retry: 0,
      notes: [],
      flash: '',
      doors: [],
      shop: null,
      q: null,
      phase: 'ask',
      sel: null,
      gone: new Set(),
      info: null,
      hist: [],
      modal: null,
      ladder: false,
      ok: false,
      end: null,
    };
    enterRung();
    scrollTo(0, 0);
  }

  // Entra numa pergunta. A cada 5.ª pergunta (5, 10, 15) é boss; nas outras o jogador
  // escolhe um caminho (portas). Sem modo rl, vai direto para a pergunta.
  function enterRung() {
    const g = G;
    g.info = null;
    g.retry = 0;
    if (g.rl && g.lvl % 5 !== 4) {
      g.doors = shuffle(['q', 'elite', 'shop']);
      g.phase = 'doors';
      renderPlay();
    } else startQ(g.lvl % 5 === 4 ? 'boss' : 'normal');
  }

  // Prepara e mostra uma pergunta do tipo kind (normal, elite ou boss).
  function startQ(kind) {
    const g = G;
    g.kind = kind;
    g.q = pickQ();
    g.sel = null;
    g.gone = new Set();
    g.info = null;
    g.phase = 'ask';
    renderPlay();
  }

  // O jogador escolheu a porta i: pergunta normal, pergunta de risco ou loja.
  function door(i) {
    const g = G;
    if (g.phase !== 'doors') return;
    const d = g.doors[i];
    if (d === 'shop') {
      g.shop = shuffle(Object.keys(RELICS).filter((k) => !g.relics.includes(k)))
        .slice(0, 2)
        .concat('heart');
      g.phase = 'shop';
      renderPlay();
    } else startQ(d === 'q' ? 'normal' : 'elite');
  }

  // Compra na loja: uma vida (60 moedas) ou uma relíquia (50 moedas).
  function buy(k) {
    const g = G,
      c = k === 'heart' ? 60 : 50;
    if (g.phase !== 'shop' || g.coins < c) return;
    if (k === 'heart') {
      if (g.lives >= g.max) return;
      g.lives++;
    } else {
      giveRelic(k);
      g.shop = g.shop.filter((x) => x !== k);
    }
    g.coins -= c;
    SFX.ll();
    renderPlay();
  }

  // Desenha o ecrã de jogo conforme a fase: portas, loja ou pergunta (com ajudas, escada de
  // prémios, confirmação, resposta e explicação).
  function renderPlay() {
    const g = G,
      q = g.q,
      ph = g.phase,
      live = ph === 'ask' || ph === 'confirm';
    const ladder = PRIZE.map(
      (p, i) =>
        `<li class="${i === g.lvl ? 'cur' : ''}${i === g.lvl && ph === 'reveal' && g.ok ? ' win' : ''}${i < g.lvl ? ' done' : ''}${SAFE.includes(i) ? ' safe' : ''}"><span class="n">${i + 1}</span><span class="p">${money(p)}</span></li>`,
    )
      .reverse()
      .join('');
    // O 50:50 só funciona com 3 ou mais opções visíveis (com 2 mostraria logo a certa).
    const sem5050 = (k) => k === 'f' && q && q.o.length - g.gone.size <= 2;
    const ll = (k, ic, lb) =>
      `<button class="ll${!g.ch[k] ? ' used' : ''}" data-ll="${k}" ${!g.ch[k] || !live || sem5050(k) ? 'disabled' : ''}${sem5050(k) && g.ch[k] ? ' title="Só com 3 ou mais opções"' : ''} aria-label="${lb}${!g.ch[k] ? ' (já usada)' : ''}"><span class="ic" aria-hidden="true">${ic}</span><span>${lb}${g.ch[k] > 1 ? ' ×' + g.ch[k] : ''}</span></button>`;
    const L = g.sel != null ? LT[g.sel] : '';
    const right = q ? q.o.findIndex((o) => o.ok) : 0;
    let info = '';
    if (g.info && g.info.type === 'aud')
      info = `<div class="info" role="status"><b>O público votou</b>${q.o.map((o, i) => (g.gone.has(i) ? '' : `<div class="bar"><span>${LT[i]}</span><i style="width:${g.info.p[i]}%"></i><span>${g.info.p[i]}%</span></div>`)).join('')}</div>`;
    if (g.info && g.info.type === 'tel')
      info = `<div class="info" role="status"><b>O teu amigo diz</b><p>“${esc(g.info.text)}”</p></div>`;
    let below = '';
    if (ph === 'confirm')
      below = `<div class="confirm"><span>Resposta final: <b>${L}</b>?</span><button class="b go" data-act="final" data-focus>Sim, é a final</button><button class="b" data-act="cancel">Não</button></div>`;
    if (ph === 'reveal') {
      const last = g.lvl === 14;
      below =
        `<div class="reveal ${g.ok ? 'good' : 'bad'}" role="status"><b>${g.ok ? (last ? 'Resposta certa! Ganhaste o prémio máximo.' : 'Resposta certa!') : 'Resposta errada.'}</b>` +
        `<p>${g.ok ? '' : `A resposta certa era a ${LT[right]}: `}${g.ok ? `${LT[right]}: ` : ''}${esc(cap(q.o[right].t))}</p>${q.e}${g.notes.map((n) => `<small>${n}</small>`).join('')}${q.u ? '<small>Esta resposta não está confirmada oficialmente.</small>' : ''}` +
        `<button class="b go" data-act="next" data-focus>${g.ok ? (last ? 'Ver o resultado' : `Pergunta seguinte (${money(PRIZE[g.lvl + 1])})`) : g.lives > 0 ? 'Tentar outra pergunta' : 'Ver o resultado'}</button></div>`;
    }
    const modal =
      g.modal === 'walk'
        ? `<div class="ov"><div class="dlg" role="dialog" aria-modal="true"><p>Se desistires, ficas com <b>${money(walkAmt(g))}</b>. Tens a certeza?</p><div class="row"><button class="b go" data-act="walkyes" data-focus>Sim, desistir</button><button class="b" data-act="walkno">Continuar a jogar</button></div></div></div>`
        : '';
    app.innerHTML = `<div class="top"><a class="tb" href="index.html">Início</a><span class="sp"></span>${soundBtn()}<button class="tb lad" data-act="ladder">Escada</button>${live || ph === 'doors' || ph === 'shop' ? '<button class="tb" data-act="walk">Desistir</button>' : ''}</div>
<div class="game"><section class="stage"><div class="meta"><span>Pergunta ${g.lvl + 1} de 15</span><b>Vale ${money(PRIZE[g.lvl])}</b></div>${g.rl ? HUD(g) : ''}
<div class="lifes">${ll('f', '50:50', '50:50')}${ll('a', '👥', 'Público')}${ll('t', '📞', 'Amigo')}</div>${info}
<div class="qarea">${
      ph === 'doors'
        ? DH()
        : ph === 'shop'
          ? SH()
          : `<div class="qbox"><span>${esc(q.q)}</span></div>
<div class="opts n${q.o.length}${ph === 'lock' ? ' lock' : ''}">${q.o
              .map((o, i) => {
                let c = 'opt';
                if (g.gone.has(i)) c += ' gone';
                if ((ph === 'confirm' || ph === 'lock') && g.sel === i) c += ' sel';
                if (ph === 'reveal') {
                  if (o.ok) c += ' ok';
                  else if (g.sel === i) c += ' ko';
                }
                const dis = !live || g.gone.has(i);
                return `<button class="${c}" data-i="${i}" ${dis ? 'disabled' : ''} ${g.gone.has(i) ? 'aria-hidden="true" tabindex="-1"' : ''} aria-label="${LT[i]}: ${esc(cap(o.t))}"><span class="ltr" aria-hidden="true">${LT[i]}:</span><span>${esc(cap(o.t))}</span></button>`;
              })
              .join('')}</div>${below}`
    }</div></section>
<aside class="ladder${g.ladder ? ' open' : ''}" aria-label="Escada de prémios"><ol>${ladder}</ol><button class="b x" data-act="ladder">Fechar</button></aside></div>${modal}`;
    const f = document.querySelector('[data-focus]');
    if (f) f.focus({ preventScroll: true });
    if (ph === 'reveal') {
      const r = $('.reveal');
      if (r) r.scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
    }
  }

  // O jogador marcou a opção i; pede confirmação.
  function pick(i) {
    const g = G;
    if (!g || (g.phase !== 'ask' && g.phase !== 'confirm') || g.gone.has(i) || i >= g.q.o.length)
      return;
    g.sel = i;
    g.phase = 'confirm';
    SFX.sel();
    renderPlay();
  }

  // Resposta final confirmada: pequena pausa de suspense e depois revela.
  function lockIn() {
    const g = G;
    if (g.phase !== 'confirm' || g.sel == null) return;
    g.phase = 'lock';
    SFX.lock();
    renderPlay();
    g.timer = setTimeout(reveal, reduced ? 600 : 2200);
  }

  // Revela se acertou. Se acertou: ganha moedas (e a Chama pode devolver vida).
  // Se errou: perde uma vida, a não ser que o Escudo ou o Trevo o protejam.
  function reveal() {
    const g = G,
      q = g.q;
    g.ok = q.o[g.sel].ok;
    g.phase = 'reveal';
    g.notes = [];
    g.flash = '';
    g.hist.push({ q, chosen: g.sel, ok: g.ok });
    if (g.ok) {
      g.streak++;
      if (g.rl) {
        let c = { normal: 10, elite: 25, boss: 40 }[g.kind] + Math.min(g.streak, 5) * 2;
        if (has('mealheiro')) c = Math.round(c * 1.5);
        g.coins += c;
        g.notes.push('+' + c + ' 🪙');
        if (has('chama') && g.streak % 3 === 0 && g.lives < g.max) {
          g.lives++;
          g.notes.push('A Chama devolveu-te 1 ❤️.');
        }
      }
    } else {
      g.streak = 0;
      if (has('escudo') && !g.shield) {
        g.shield = 1;
        g.notes.push('O Escudo protegeu-te: não perdeste vida.');
      } else if (has('trevo') && Math.random() < 0.25)
        g.notes.push('O Trevo protegeu-te: não perdeste vida.');
      else {
        g.lives--;
        g.notes.push(
          g.lives > 0 ? 'Perdeste 1 ❤️. Vais tentar outra pergunta.' : 'Ficaste sem vidas.',
        );
      }
    }
    (g.ok ? SFX.ok : SFX.ko)();
    renderPlay();
  }

  // Botão depois da resposta: se errou, tenta outra pergunta (ou termina sem vidas);
  // se acertou, sobe um nível (com possível relíquia e vida extra no boss) ou ganha o jogo.
  function next() {
    const g = G;
    if (!g.ok) {
      if (g.lives <= 0) return endGame('lose');
      g.retry = 1;
      return startQ(g.kind);
    }
    if (g.lvl === 14) return endGame('win');
    let f = '';
    if (g.rl && ((g.kind === 'elite' && Math.random() < 0.5) || g.kind === 'boss')) {
      const k = newRelic();
      if (k) {
        giveRelic(k);
        f = 'Nova relíquia: ' + RELICS[k][0] + ' ' + RELICS[k][1] + '. ';
      }
    }
    if (g.rl && g.kind === 'boss' && g.lives < g.max) {
      g.lives++;
      f += 'Fim do andar: +1 ❤️.';
    }
    g.flash = f;
    g.lvl++;
    if (g.lvl % 5 === 0) g.shield = 0;
    g.ladder = false;
    enterRung();
    scrollTo(0, 0);
  }

  // Usa uma ajuda: 'f' = 50:50 (tira metade das erradas), 'a' = público (percentagens),
  // 't' = amigo (palpite). O público e o amigo acertam menos nas perguntas difíceis.
  // O 50:50 não é usado (nem gasto) quando só restam 2 opções.
  function lifeline(k) {
    const g = G;
    if (!g || !g.ch[k] || (g.phase !== 'ask' && g.phase !== 'confirm')) return;
    const q = g.q,
      tier = g.lvl < 5 ? 0 : g.lvl < 10 ? 1 : 2,
      R = q.o.map((_, i) => i).filter((i) => !g.gone.has(i)),
      c = R.find((i) => q.o[i].ok);
    if (k === 'f' && R.length <= 2) return;
    g.ch[k]--;
    SFX.ll();
    if (k === 'f') {
      const wrong = shuffle(R.filter((i) => i !== c));
      wrong.slice(0, Math.floor(q.o.length / 2)).forEach((i) => g.gone.add(i));
      g.info = null;
      if (g.sel != null && g.gone.has(g.sel)) {
        g.sel = null;
        g.phase = 'ask';
      }
    }
    if (k === 'a') {
      let pc = [rnd(62, 88), rnd(42, 66), rnd(28, 52)][tier];
      pc = Math.min(94, pc + (q.o.length - R.length) * 8);
      let top = c;
      if (tier === 2 && Math.random() < 0.12) {
        const w = R.filter((i) => i !== c);
        top = w[rnd(0, w.length - 1)];
      }
      const oth = R.filter((i) => i !== top),
        w = oth.map(() => Math.random() + 0.2),
        sw = w.reduce((a, b) => a + b, 0),
        p = {};
      oth.forEach((i, j) => (p[i] = Math.round(((100 - pc) * w[j]) / sw)));
      p[top] = pc;
      p[top] += 100 - R.reduce((a, i) => a + p[i], 0);
      g.info = { type: 'aud', p };
    }
    if (k === 't') {
      const acc = [0.92, 0.75, 0.55][tier],
        wr = R.filter((i) => i !== c),
        guess = Math.random() < acc ? c : wr[rnd(0, wr.length - 1)],
        r = Math.random(),
        sure = [0.7, 0.4, 0.2][tier],
        mid = [0.25, 0.35, 0.35][tier],
        l = LT[guess];
      const text =
        r < sure
          ? `Tenho a certeza, é a ${l}.`
          : r < sure + mid
            ? `Acho que é a ${l}, mas não ponho as mãos no fogo.`
            : `Hmm, não sei bem. Se tivesse de escolher, ia na ${l}.`;
      g.info = { type: 'tel', text };
    }
    renderPlay();
  }

  /* ---------- fim ---------- */

  // Termina o jogo ('win', 'lose' ou 'walk') e calcula o prémio final; guarda o melhor prémio.
  function endGame(kind) {
    const g = G;
    if (g.timer) clearTimeout(g.timer);
    g.walkQ = g.phase === 'ask' || g.phase === 'confirm' ? g.q : null;
    const amt = kind === 'win' ? PRIZE[14] : kind === 'walk' ? walkAmt(g) : safeAmt(g.lvl);
    if (amt > (+store.get('qqsm_best') || 0)) store.set('qqsm_best', String(amt));
    g.phase = 'end';
    g.end = { kind, amt };
    g.modal = null;
    (kind === 'win' ? SFX.win : kind === 'lose' ? () => {} : SFX.ok)();
    renderEnd();
    scrollTo(0, 0);
  }

  // Ecrã final: prémio, resumo e revisão de todas as perguntas respondidas.
  function renderEnd() {
    const g = G,
      { kind, amt } = g.end,
      n = g.lvl + 1;
    const title =
      kind === 'win'
        ? 'Milionário!'
        : kind === 'walk'
          ? `Desististe na pergunta ${n}`
          : g.rl
            ? `Ficaste sem vidas na pergunta ${n}`
            : `Erraste na pergunta ${n}`;
    const sub =
      kind === 'win'
        ? 'Respondeste certo às 15 perguntas.'
        : amt
          ? kind === 'walk'
            ? 'Ficas com o prémio que já tinhas ganho.'
            : 'Ficas com o último patamar seguro.'
          : 'Desta vez sais sem prémio.';
    const items = g.hist.map((h, i) => ({
      q: h.q,
      n: i + 1,
      st: h.ok ? 'ok' : 'ko',
      ch: h.chosen,
    }));
    if (kind === 'walk' && g.walkQ) items.push({ q: g.walkQ, n, st: 'na', ch: null });
    const rv = items
      .map((it) => {
        const r = it.q.o.find((o) => o.ok);
        return `<div class="rv"><span class="st ${it.st}">${it.st === 'ok' ? 'Certa' : it.st === 'ko' ? 'Errada' : 'Sem resposta'}</span> <b>${it.n}.</b> <span style="white-space:pre-line">${esc(it.q.q)}</span>
<p>Resposta certa: ${esc(cap(r.t))}</p>${it.st === 'ko' ? `<p style="color:var(--mu)">A tua resposta: ${esc(cap(it.q.o[it.ch].t))}</p>` : ''}${it.q.e}${it.q.u ? '<small style="color:var(--mu)">Esta resposta não está confirmada oficialmente.</small>' : ''}</div>`;
      })
      .join('');
    app.innerHTML = `<div class="top"><a class="tb" href="index.html">Voltar ao início</a><span class="sp"></span>${soundBtn()}</div>
<div class="end"><h1>${title}</h1><div class="amt">${money(amt)}</div><p>${sub}</p>${g.rl ? `<p>Moedas: 🪙 ${g.coins}. Relíquias: ${g.relics.length ? g.relics.map((k) => RELICS[k][0] + ' ' + RELICS[k][1]).join(', ') : 'nenhuma'}.</p>` : ''}
<div class="row"><button class="bigbtn" data-act="again" data-focus>Jogar outra vez</button><button class="bigbtn alt" data-act="menu">Mudar os temas</button></div>
<details open><summary>Rever as perguntas</summary>${rv}</details></div>`;
    const f = document.querySelector('[data-focus]');
    if (f) f.focus({ preventScroll: true });
  }

  /* ---------- eventos ---------- */

  // Liga/desliga o som e guarda a escolha.
  function toggleSound() {
    SOUND = !SOUND;
    store.set('qqsm_snd', SOUND ? '1' : '0');
    if (SOUND) SFX.sel();
    const b = document.querySelector('[data-act=sound]');
    if (b) {
      b.textContent = SOUND ? 'Som ligado' : 'Som desligado';
      b.setAttribute('aria-pressed', SOUND);
    }
  }

  // ACT = ações dos botões, ligadas pelo atributo data-act do HTML.
  // Os listeners abaixo tratam os cliques (opções, ajudas, portas, loja) e o teclado (A-D / 1-4, Esc).
  const ACT = {
    start: () => startGame(),
    final: lockIn,
    cancel: () => {
      G.sel = null;
      G.phase = 'ask';
      renderPlay();
    },
    next,
    walk: () => {
      G.modal = 'walk';
      renderPlay();
    },
    walkyes: () => endGame('walk'),
    walkno: () => {
      G.modal = null;
      renderPlay();
    },
    sound: toggleSound,
    ladder: () => {
      G.ladder = !G.ladder;
      renderPlay();
    },
    leave: () => startQ('normal'),
    again: startGame,
    menu: () => {
      G = null;
      renderStart();
    },
  };
  app.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b || b.disabled) return;
    if (b.dataset.i !== undefined) return pick(+b.dataset.i);
    if (b.dataset.ll) return lifeline(b.dataset.ll);
    if (b.dataset.door !== undefined) return door(+b.dataset.door);
    if (b.dataset.buy) return buy(b.dataset.buy);
    const f = ACT[b.dataset.act];
    if (f) f();
  });
  app.addEventListener('change', (e) => {
    if (e.target.matches('.tp,#wu')) startInfo();
  });
  document.addEventListener('keydown', (e) => {
    if (!G || e.ctrlKey || e.metaKey || e.altKey) return;
    const k = e.key.toLowerCase();
    if (k === 'escape') {
      if (G.modal) {
        G.modal = null;
        renderPlay();
      } else if (G.ladder) {
        G.ladder = false;
        renderPlay();
      } else if (G.phase === 'confirm') ACT.cancel();
      return;
    }
    if (G.modal || G.phase === 'end' || G.phase === 'lock') return;
    const i = 'abcd'.indexOf(k),
      j = ['1', '2', '3', '4'].indexOf(k),
      x = i >= 0 ? i : j;
    if (x >= 0 && (G.phase === 'ask' || G.phase === 'confirm')) pick(x);
    else if (x >= 0 && G.phase === 'doors' && x < G.doors.length) door(x);
  });

  if (!QS.length) {
    app.innerHTML =
      '<p style="padding:2rem">Não foi possível carregar as perguntas (js/quiz.js). Confirma que o ficheiro está na pasta js, ao lado dos outros.</p>';
  } else renderStart();
})();
