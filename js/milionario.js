/* ==========================================================================
   milionario.js  —  jogo "Quem quer ser milionário?"
   --------------------------------------------------------------------------
   Corrida por pontos: cada fase tem um limite de perguntas e uma meta de pontos
   (pontos base x combo). Depois de cada fase escolhe-se o caminho num mapa (fases,
   loja, descanso, tesouro, desconhecido). O Manual abre por cima do jogo.
   As regras (nº de perguntas, metas, pontos) estão juntas em "regras (podes mexer aqui)".

   Organização do ficheiro (de cima para baixo):
     1. Funções auxiliares e constantes (prémios, letras)
     2. Perguntas (todas entram) e dificuldade
     3. Relíquias e loja
     4. Som
     5. Ecrã inicial        (renderStart)
     6. Jogo                (startGame, renderPlay, pick, lockIn, reveal, next, lifeline)
     7. Ecrã final          (endGame, renderEnd)
     8. Eventos             (cliques e teclado)

   Fases do jogo (G.phase):
     (shop, só depois das perguntas 5, 10 e 14) -> ask -> confirm -> lock -> reveal -> ... -> end
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
  const ELIG = QS.filter((q) => q.a >= 0); // as anuladas (sem resposta certa) ficam de fora

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
      id: q.id,
      q: q.q.replace(/^Ficha \d+(?: \([^)]*\))? — /, '').replace(/^Verdadeiro ou falso\?\s*«([\s\S]*?)»\.?\s*$/, '$1'),
      e: q.e || '',
      u: q.u,
      s: q.s,
      o: keepOrder(q) ? opcoes : shuffle(opcoes),
    };
  };

  // POOL = perguntas deste jogo, da mais fácil para a mais difícil.
  let POOL = [],
    PIDX = new Map();

  // Escolhe a próxima pergunta. Quanto mais alto o nível, mais para o fim da lista POOL
  // (mais difícil) é a escolha; as perguntas boss são um pouco mais difíceis.
  // Dentro dessa zona escolhe à sorte, evitando as já vistas (g.seen guarda os id).
  function pickQ() {
    const g = G,
      n = POOL.length;
    let t = Math.min(1, g.lvl / 14 + (g.kind === 'boss' ? 0.08 : 0));
    const w = Math.max(4, Math.round(n * 0.12)),
      c = Math.round(t * (n - 1)),
      win = () => POOL.slice(Math.max(0, c - w), c + w + 1);
    const th = g.fTheme, okT = (q) => !th || q.s === th; // tema escolhido num evento ❓ (vale só para essa fase)
    let cand = win().filter((q) => !g.seen.has(q.id) && okT(q));
    if (!cand.length) {
      // zona esgotada: usa as não vistas mais perto da dificuldade pedida (só repete quando já saíram todas)
      const un = POOL.filter((q) => !g.seen.has(q.id) && okT(q));
      if (!un.length) {
        if (th) cand = POOL.filter(okT);
        else { g.seen.clear(); cand = win(); }
      } else cand = un.sort((a, b) => Math.abs(PIDX.get(a) - c) - Math.abs(PIDX.get(b) - c)).slice(0, 6);
    }
    const q = cand[rnd(0, cand.length - 1)];
    g.seen.add(q.id);
    return prep(q);
  }

  // RELICS = relíquias: nome interno -> [emoji, nome, o que faz].
  const RELICS = {
    trevo: ['🍀', 'Trevo', '25% de hipótese de um erro não contar (sem perder vida nem pergunta).'],
    escudo: ['🛡️', 'Escudo', 'O primeiro erro de cada fase não custa vida nem parte o combo.'],
    chama: ['🔥', 'Chama', 'A cada 3 certas seguidas, ganhas +1 pergunta nesta fase.'],
    mealheiro: ['🐷', 'Mealheiro', 'Ganhas +50% de moedas.'],
    mochila: ['🎒', 'Mochila', '+1 uso por fase de cada ajuda que tiveres (50:50, Público, Amigo e Troca).'],
    meio: ['✂️', '50:50', 'Dá-te a ajuda 50:50: uma vez por fase, tira metade das respostas erradas.'],
    publico: ['👥', 'Público', 'Dá-te a ajuda Público: uma vez por fase, o público vota na resposta.'],
    amigo: ['📞', 'Amigo', 'Dá-te a ajuda Amigo: uma vez por fase, um amigo dá a sua opinião.'],
    troca: ['🔄', 'Troca', 'Dá-te a ajuda Troca: uma vez por fase, mudas a pergunta sem gastar uma das da fase.'],
    cafe: ['☕', 'Café', '+1 pergunta em cada fase.'],
    estrela: ['⭐', 'Estrela', 'Cada fase começa com o combo em ×1,5.'],
    balanca: ['⚖️', 'Balança', 'O combo máximo passa de ×4 para ×5.'],
    martelo: ['🔨', 'Martelo', '+50 pontos em cada resposta certa.'],
    cofre: ['💰', 'Cofre', '+30 🪙 sempre que concluis uma fase.'],
    banco: ['🏦', 'Banco', 'No fim de cada fase ganhas juros: 10% das tuas moedas.'],
    coracao: ['💖', 'Coração', '+1 vida máxima e +1 vida logo.'],
    desconto: ['🏷️', 'Cupão', 'Tudo na loja custa 30% menos.'],
    coroa: ['👑', 'Coroa', 'Fase sem nenhum erro: +200 pontos.'],
    mira: ['🎯', 'Mira', 'As metas de pontos das fases são 10% mais baixas.'],
    dado: ['🎲', 'Dado', '10% de hipótese de uma resposta certa valer o dobro.'],
    cadeado: ['🔒', 'Cadeado', 'Ao errares, o combo só desce para metade em vez de voltar a ×1.'],
    vela: ['🕯️', 'Vela', 'Os descansos dão o dobro: +2 vidas e +2 perguntas na fase seguinte.'],
    bussola: ['🧭', 'Bússola', 'Os nós ❓ nunca são fases: só loja, descanso ou tesouro.'],
    sino: ['🔔', 'Sino', 'A cada 5 certas seguidas ganhas +1 vida.'],
    raio: ['⚡', 'Raio', 'A primeira resposta certa de cada fase vale o triplo.'],
    ima: ['🧲', 'Íman', 'Cada resposta certa dá +1 ponto por cada 10 🪙 que tiveres.'],
    diamante: ['💎', 'Diamante', 'Respostas certas com o combo em ×3 ou mais valem +50%.'],
    foguete: ['🚀', 'Foguete', 'A partir da 3.ª certa seguida, cada certa dá +75 pontos.'],
    caneta: ['🖋️', 'Caneta', 'A última pergunta de cada fase vale o dobro.'],
    pergaminho: ['📜', 'Pergaminho', 'Ao concluir uma fase ganhas +20 pontos por cada resposta certa nela.'],
    ampulheta: ['⏳', 'Ampulheta', '+1 pergunta nas fases difíceis e no guardião do andar.'],
    atalho: ['🛤️', 'Atalho', 'As metas das fases difíceis e do guardião são 20% mais baixas.'],
    balao: ['🎈', 'Balão', 'Começas cada fase com +1 troca de pergunta.'],
    pocao: ['🧪', 'Poção', 'Ao concluir uma fase sem a vida cheia, ganhas +1 vida.'],
    capacete: ['🪖', 'Capacete', 'O primeiro erro de cada andar não custa vida (o combo parte).'],
    penso: ['🩹', 'Penso', 'Ao subires de andar ganhas +1 vida extra.'],
    fenix: ['🪶', 'Fénix', 'Se ficares sem vidas, voltas com 2. A relíquia gasta-se.'],
    carteira: ['👛', 'Carteira', '+2 🪙 em cada resposta certa.'],
    ouro: ['🥇', 'Medalha de ouro', 'Fases difíceis e guardiões dão +50 🪙.'],
    trofeu: ['🏆', 'Troféu', 'Fases difíceis e guardiões dão +300 pontos.'],
    trombeta: ['🎺', 'Trombeta', 'Ao subires de andar ganhas +500 pontos.'],
    cartola: ['🎩', 'Cartola', 'Cada nó ❓ que abres dá-te +30 🪙.'],
    chave: ['🗝️', 'Chave', 'Os tesouros dão duas relíquias em vez de uma.'],
    megafone: ['📣', 'Megafone', 'O Público vota sempre na resposta certa (com pelo menos 80%).'],
    caderno: ['📓', 'Caderno', 'O Amigo nunca falha e tem sempre certeza.'],
    lupa: ['🔎', 'Lupa', '+25% de pontos em cada resposta certa.'],
  };
  // Melhorias: o que a relíquia passa a fazer depois de melhorada (nó ❓). V(k, normal, melhorada) escolhe o valor.
  const UP = {
    trevo: '40% de hipótese de um erro não contar.', escudo: 'Protege os dois primeiros erros de cada fase.', chama: 'A cada 2 certas seguidas ganhas +1 pergunta.',
    mealheiro: '+100% de moedas.', mochila: '+2 usos por fase de cada ajuda.', lupa: '+50% de pontos em cada certa.', cafe: '+2 perguntas em cada fase.',
    estrela: 'Cada fase começa com o combo em ×2.', balanca: 'O combo máximo passa a ×6.', martelo: '+100 pontos por certa.', cofre: '+60 🪙 por fase concluída.',
    banco: 'Juros de 20%.', desconto: 'Tudo na loja custa 50% menos.', coroa: 'Fase sem erros: +400 pontos.', mira: 'Metas 20% mais baixas.',
    dado: '20% de hipótese de valer o dobro.', cadeado: 'Ao errares o combo só desce 25%.', vela: 'Os descansos dão o triplo.', foguete: '+150 pontos por certa a partir da 3.ª seguida.',
    diamante: 'Certas com combo ×3 ou mais valem o dobro.', ima: '+1 ponto por cada 5 🪙.', caneta: 'A última pergunta de cada fase vale o triplo.', raio: 'A primeira certa de cada fase vale ×5.',
    carteira: '+4 🪙 por certa.', sino: 'A cada 3 certas seguidas ganhas +1 vida.', ampulheta: '+2 perguntas nas fases difíceis e guardiões.', atalho: 'Metas 35% mais baixas nessas fases.',
    balao: '+2 trocas no início de cada fase.', penso: '+2 vidas ao subir de andar.', trombeta: '+1000 pontos ao subir de andar.', trofeu: '+600 pontos nessas fases.',
    ouro: '+100 🪙 nessas fases.', cartola: '+60 🪙 por cada nó ❓.', pergaminho: '+40 pontos por certa ao concluir a fase.', meio: '+1 uso por fase do 50:50.',
    publico: '+1 uso por fase do Público.', amigo: '+1 uso por fase do Amigo.', troca: '+1 troca por fase.', coracao: '+1 vida máxima extra.',
  };
  const V = (k, a, b) => (G && G.up.has(k) ? b : a);
  const upgradable = () => Object.keys(UP).filter((k) => G.relics.includes(k) && !G.up.has(k));
  const doUp = (k) => {
    G.up.add(k);
    if (k === 'coracao') { G.max++; G.lives++; }
  };
  const rdesc = (k) => (G.up.has(k) ? 'Melhorada: ' + UP[k] : RELICS[k][2]);

  const has = (k) => G.relics.includes(k);
  const giveRelic = (k) => {
    G.relics.push(k);
    if (k === 'coracao') { G.max++; G.lives++; }
    try {
      const f = new Set((store.get('qqsm_rel') || '').split(',').filter(Boolean));
      f.add(k);
      store.set('qqsm_rel', [...f].join(','));
    } catch (e) {}
  };
  const newRelic = () => {
    const l = Object.keys(RELICS).filter((k) => !G.relics.includes(k));
    return l.length ? l[rnd(0, l.length - 1)] : null;
  };

  /* ---------- regras (podes mexer aqui) ---------- */
  const ROWS = 7; // fases por piso (a última leva ao próximo piso; no último piso é o Exame final)
  const QPISO = 26; // perguntas por piso, mais ou menos (define quantos pisos tem o jogo)
  const QS_PHASE = 6; // perguntas por fase
  const SWAPS = 1; // trocas de pergunta por fase
  const BASE = (t) => 100 + Math.round(t * 100); // pontos base de uma certa (t = 0..1 dificuldade)
  const MULT = (s) => Math.min(1 + 0.25 * s, G && has('balanca') ? V('balanca', 5, 6) : 4); // multiplicador do combo (s = certas seguidas)
  const TARGET = (t, k) => Math.round((450 * (1 + 1.2 * t) * (k === 'E' ? 1.3 : k === 'b' ? 1.5 : 1)) / 50) * 50; // t = 0..1 progresso na corrida
  const LEFT_BONUS = 50; // pontos por pergunta que sobra ao fechar a fase
  const COST_RELIC = 45, COST_HELP = 40, COST_HEART = 50;
  const NAMES = { e: ['A Rotunda', 'O Semáforo', 'A Autoestrada', 'O Cruzamento', 'A Ladeira', 'O Túnel'], E: ['O Radar', 'A Brigada', 'O Nevoeiro'], b: ['O Exame Final'], p: ['O Guardião', 'A Portagem', 'O Posto de Controlo'] };
  const ICON = { e: '📝', E: '💀', '?': '❓', $: '🛒', r: '🏕️', t: '🧰', b: '🏁' };
  const LEG = { e: 'Fase', E: 'Fase difícil', '?': 'Desconhecido', $: 'Loja', r: 'Descanso', t: 'Tesouro', b: 'Próximo andar' };
  const last = () => G.piso === G.pisos - 1;
  const ico = (k) => (k === 'b' && last() ? '🏁' : k === 'b' ? '🚪' : ICON[k]);
  const lab = (k) => (k === 'b' && last() ? 'Exame final' : LEG[k]);
  const fmt = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  /* ---------- som ---------- */

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
  // G = jogo atual (null no menu). Fase: f {k,name,target}, round (pontos da fase), left (perguntas),
  // sw (trocas), streak (combo), base/mult. Mapa: map[andar][faixa] = tipo de nó, row/lane = onde estás.
  let G = null,
    CFG = { sel: null, withU: false };
  const best = () => +store.get('qqsm_pts') || 0;
  const soundBtn = () => `<button class="tb" data-act="sound" aria-pressed="${SOUND}">${SOUND ? 'Som ligado' : 'Som desligado'}</button>`;

  // Manual: janela por cima do jogo (o manual.html dentro de uma moldura; não perde o sítio onde ficaste).
  const MAN = document.createElement('div');
  MAN.className = 'man';
  MAN.hidden = true;
  MAN.innerHTML = '<div class="mdlg"><div class="mh"><b>📖 Manual</b><button class="b" data-act="mclose">Fechar</button></div><iframe title="Manual" data-src="manual.html?embed=1"></iframe></div>';
  document.body.appendChild(MAN);
  // manual(true, 'nota?h=frase') abre o manual nessa nota, com a frase destacada.
  const manual = (open, to) => {
    const fr = MAN.querySelector('iframe');
    if (open && to) {
      const url = 'manual.html?embed=1#/' + to;
      if (!fr.getAttribute('src')) fr.src = url;
      else {
        try {
          if (fr.contentWindow.location.hash === '#/' + to) fr.contentWindow.location.reload();
          else fr.contentWindow.location.hash = '#/' + to;
        } catch (e) { fr.src = url; }
      }
    } else if (open && !fr.getAttribute('src')) fr.src = fr.dataset.src;
    MAN.hidden = !open;
  };
  // Botão que abre o manual no sítio da resposta (só para perguntas com ligação em js/manual-refs.js).
  const manBtn = (q) => {
    const r = window.QREF && window.QREF[q.id];
    if (!r) return '';
    const to = window.QREF_N[r[0]] + '?' + r.slice(1).map((p) => 'h=' + encodeURIComponent(p)).join('&');
    return `<button class="b" data-man="${esc(to)}">📖 Ver no manual</button>`;
  };

  /* ---------- menu e ecrãs iniciais ---------- */
  const ensureSel = () => { if (!CFG.sel) CFG.sel = new Set(window.TESTS.map((t, i) => i)); };
  const topBar = (back) => `<div class="top">${back ? '<button class="tb" data-act="menu0">← Menu</button>' : '<a class="tb" href="index.html">Voltar ao início</a>'}<span class="sp"></span>${soundBtn()}</div>`;
  const themesBox = () => `<div class="box">${Temas.html(CFG.sel)}</div><div class="box"><label><input type="checkbox" id="wu" ${CFG.withU ? 'checked' : ''}> <span>Incluir perguntas com resposta não confirmada <small id="uc"></small></span></label></div>`;

  // Menu principal: Solo, Multijogador, Coleções.
  function renderMenu() {
    G = null;
    const b = best();
    app.innerHTML = `${topBar(false)}<div class="start"><h1>Quem quer ser milionário?</h1>
<p class="lead">Joga pelos pontos, escolhe o caminho no mapa e consulta o manual quando precisares.</p>
<div class="mnu"><button class="mb blue" data-act="solo">Solo<small>Corrida por pontos</small></button><button class="mb green" data-act="multimenu">Multijogador<small>Até 4 jogadores</small></button><button class="mb orange" data-act="colecoes">Coleções<small>Relíquias, mapa e pontos</small></button><button class="mb purple" data-act="regras">Regras<small>Como o jogo funciona</small></button></div>
${b ? `<p class="best">O teu melhor resultado neste dispositivo: <b>${fmt(b)} pontos</b></p>` : ''}</div>`;
  }

  // Solo: regras, temas e começar.
  function renderSolo() {
    G = null;
    ensureSel();
    app.innerHTML = `${topBar(true)}<div class="start"><h1>Solo</h1>
<p class="lead">Aqui não se joga pelo dinheiro, joga-se pelos <b>pontos</b>. Cada fase tem um número limite de perguntas e uma meta de pontos.</p>
<ul class="rules"><li>Cada resposta certa vale <b>pontos base × combo</b>: quantas mais seguidas, maior o multiplicador (até ×4). Errar parte o combo e custa 1 ❤️ (tens 3 vidas).</li><li>Cada fase tem ${QS_PHASE} perguntas e uma meta. Se não chegares à meta, a corrida acaba. Assim que chegares à meta a fase termina logo e ganhas pontos pelas perguntas que sobram.</li><li>Depois de cada fase escolhes o caminho no mapa: fases, fases difíceis, loja, descanso, tesouro ou o desconhecido. O último nó de cada andar leva ao andar seguinte; o número de andares depende das perguntas que escolheres (cerca de ${QPISO} por andar) e só no último aparece o Exame final.</li><li>Podes abrir o <b>Manual</b> a qualquer momento para consultar. As ajudas (50:50, Público, Amigo e Troca de pergunta) não as tens ao início: são relíquias que tens de encontrar no mapa, e cada uma pode ser usada uma vez por fase.</li></ul>
${themesBox()}
<p><button class="bigbtn" id="go" data-act="start">Começar a corrida</button> <small id="avail" style="margin-left:.6rem;color:var(--mu)"></small></p></div>`;
    Temas.bind(app.querySelector('.tm'), startInfo);
    startInfo();
  }

  // Multijogador: escolhe os temas e segue para as opções da sala (js/milionario-multi.js).
  function renderMulti() {
    G = null;
    ensureSel();
    app.innerHTML = `${topBar(true)}<div class="start"><h1>Multijogador</h1>
<p class="lead">Escolhe os temas da sala. Depois podes criar uma sala ou entrar com um código.</p>
${themesBox()}
<p><button class="bigbtn" id="go" data-act="multigo">Continuar</button> <small id="avail" style="margin-left:.6rem;color:var(--mu)"></small></p></div>`;
    Temas.bind(app.querySelector('.tm'), startInfo);
    startInfo();
  }

  // Coleções: tudo o que existe no jogo (relíquias, nós do mapa, ajudas, pontos).
  const colHtml = () => {
    const found = new Set((store.get('qqsm_rel') || '').split(',').filter(Boolean));
    const NODES = { e: `${QS_PHASE} perguntas e uma meta de pontos. Falhar a meta acaba a corrida.`, E: 'Meta mais alta. Ao vencer ganhas uma relíquia.', '?': 'Surpresa: pode ser uma fase, uma relíquia, escolheres o tema da próxima fase (se tiveres mais de um tema), melhorares uma relíquia, curar-te por completo, uma loja ou um descanso.', $: 'Gasta moedas em relíquias e vidas.', r: 'Recuperas 1 ❤️ e na fase seguinte tens +1 pergunta e +1 troca.', t: 'Ganhas uma relíquia.', b: 'Última fase do andar. Ao vencer subes de andar e ganhas +1 ❤️. No último andar é o Exame final 🏁.' };
    const card = (e, n, d, x) => `<div class="cd"><span class="e" aria-hidden="true">${e}</span><div><b>${n}</b><small>${d}</small>${x ? `<em>${x}</em>` : ''}</div></div>`;
    return `<h2>Relíquias</h2><div class="cds">${Object.entries(RELICS).map(([k, r]) => card(r[0], r[1], r[2] + (UP[k] ? `<br><b>Melhorada:</b> ${UP[k]}` : ''), G && G.relics.includes(k) ? '✓ Tens nesta corrida' : found.has(k) ? '✓ Já a encontraste' : '')).join('')}</div>
<h2>Nós do mapa</h2><div class="cds">${Object.keys(NODES).map((k) => card(ICON[k], LEG[k], NODES[k])).join('')}</div>
<h2>Pontos e vidas</h2><div class="cds">${card('🎯', 'Pontos e combo', 'Cada certa vale o valor base (100 a 200) × combo (×1 a ×4). Errar parte o combo.')}${card('❤️', 'Vidas', 'Começas com 3 e é esse o máximo (a relíquia Coração aumenta-o). Cada erro custa uma; sem vidas a corrida acaba.')}${card('🪙', 'Moedas', 'Ganhas moedas ao acertar e gastas na loja.')}</div>`;
  };
  // Regras: explicação de como o jogo funciona.
  function renderRegras() {
    G = null;
    const sec = (t, ...ps) => `<h2>${t}</h2>${ps.map((x) => `<p>${x}</p>`).join('')}`;
    app.innerHTML = `${topBar(true)}<div class="start rg"><h1>Regras do jogo</h1>
<p class="lead">Aqui não se joga pelo dinheiro: o objetivo é fazer o máximo de <b>pontos</b> possível, respondendo a perguntas do curso ao longo de uma corrida.</p>
${sec('1. Fases e metas', `Uma corrida é feita de <b>fases</b>. Cada fase tem <b>${QS_PHASE} perguntas</b> e uma meta: o "Pontua pelo menos" do painel.`, `Assim que os pontos da fase chegam à meta, a fase termina logo e ganhas <b>+${LEFT_BONUS} pontos</b> por cada pergunta que sobrar. Se as perguntas acabarem sem chegares à meta, a corrida termina.`)}
${sec('2. Pontos e combo', 'Cada resposta certa vale os <b>pontos base</b> (100 a 200, a subir com a dificuldade) multiplicados pelo <b>combo</b>: começa em ×1 e sobe 0,25 por cada certa seguida, até ×4. Errar parte o combo.', 'As perguntas ficam mais difíceis ao longo da corrida e as metas sobem com elas.')}
${sec('3. Vidas', 'Tens <b>3 vidas</b> ❤️❤️❤️. Cada resposta errada custa uma vida e, sem vidas, a corrida acaba. Podes recuperar vidas nos descansos, ao subir de andar, na loja e em alguns eventos ❓. A relíquia 💖 Coração dá-te uma vida máxima a mais.')}
${sec('4. Mapa e andares', 'Depois de cada fase escolhes o caminho no mapa. Só podes ir para o nó à frente ou para o vizinho:', '📝 <b>Fase</b> normal, 💀 <b>fase difícil</b> (meta mais alta, dá uma relíquia), ❓ <b>desconhecido</b> (uma fase, uma relíquia, escolher o tema da próxima fase, melhorar uma relíquia, cura total, loja ou descanso), 🛒 <b>loja</b>, 🏕️ <b>descanso</b> (+1 ❤️, +1 pergunta e +1 troca na fase seguinte) e 🧰 <b>tesouro</b> (uma relíquia).', `O último nó de cada andar (🚪) leva ao andar seguinte. O número de andares depende das perguntas que escolheres (cerca de ${QPISO} por andar) e só no último aparece o 🏁 <b>Exame final</b>. Podes ver o mapa a qualquer momento no "Ver minimapa".`)}
${sec('5. Relíquias e ajudas', 'As relíquias dão vantagens durante toda a corrida. As ajudas (<b>50:50, Público, Amigo e Troca</b> de pergunta) também são relíquias: não as tens ao início, tens de as encontrar, e cada uma pode ser usada <b>uma vez por fase</b>.', 'Vê todas no botão "Coleções".')}
${sec('6. Moedas e loja', 'Ganhas moedas ao acertar e ao concluir fases. Na loja gastas moedas em relíquias e vidas.')}
${sec('7. Manual', 'Podes abrir o <b>Manual</b> a qualquer momento, no topo do ecrã, para consultar a matéria sem sair do jogo.')}
${sec('8. Fim da corrida', 'A corrida acaba quando passas o Exame final, ficas sem vidas, falhas a meta de uma fase ou desistes. No fim vês os pontos totais, o teu melhor resultado e as perguntas para reveres.')}
${sec('Multijogador', 'No multijogador (até 4 jogadores, todos contra todos) a pergunta é a mesma para todos ao mesmo tempo. Joga-se pelo prémio das perguntas, com bónus pela rapidez: ganha quem tiver mais dinheiro no fim.')}
<p><button class="bigbtn" data-act="solo">Jogar Solo</button></p></div>`;
  }

  function renderCol() {
    G = null;
    app.innerHTML = `${topBar(true)}<div class="start"><h1>Coleções</h1>${colHtml()}</div>`;
  }

  function startInfo() {
    const sel = Temas.ler(app), wu = $('#wu').checked;
    CFG.sel = sel;
    CFG.withU = wu;
    $('#uc').textContent = '(' + ELIG.filter((q) => q.u).length + ' no total)';
    const n = ELIG.filter((q) => Temas.tem(sel, q) && (wu || !q.u)).length;
    $('#avail').textContent = n >= 30 ? n + ' perguntas disponíveis' + ($('#go').dataset.act === 'start' ? ' · ' + Math.max(1, Math.round(n / QPISO)) + (Math.round(n / QPISO) <= 1 ? ' andar' : ' andares') : '') : 'Escolhe mais temas: são precisas pelo menos 30 perguntas.';
    $('#go').disabled = n < 30;
  }

  /* ---------- mapa ---------- */
  // 3 faixas por andar; de cada nó só se vai para a mesma faixa ou a vizinha do andar seguinte.
  function buildMap() {
    const W = [['e', 42], ['?', 18], ['$', 12], ['r', 12], ['t', 8], ['E', 8]];
    const roll = (r) => {
      const ok = W.filter(([k]) => !(k === 'E' && r < 2) && !(k === 'r' && r < 2) && !(k === '$' && r < 1));
      let x = rnd(1, ok.reduce((a, [, w]) => a + w, 0));
      for (const [k, w] of ok) if ((x -= w) <= 0) return k;
      return 'e';
    };
    // Caminhos aleatórios (como no Slay the Spire): 2 ou 3 caminhos a subir, que andam à sorte para a esquerda, em frente
    // ou para a direita, sem se cruzarem. Só existem os nós por onde passa algum caminho; o último andar é um só nó.
    let nodes, edges;
    for (let t = 0; t < 80; t++) {
      nodes = Array.from({ length: ROWS }, () => [0, 0, 0]);
      edges = new Set();
      const E = Array.from({ length: ROWS }, () => []);
      shuffle([0, 1, 2]).slice(0, rnd(2, 3)).forEach((start) => {
        let l = start;
        nodes[0][l] = 1;
        for (let r = 0; r < ROWS - 2; r++) {
          const opt = [[l, 3], [l - 1, 2], [l + 1, 2]].filter(([n]) => n >= 0 && n <= 2 && !E[r].some(([a, b]) => (l < a && n > b) || (l > a && n < b)));
          let x = rnd(1, opt.reduce((a, [, w]) => a + w, 0)), n = l;
          for (const [m, w] of opt) if ((x -= w) <= 0) { n = m; break; }
          edges.add(`${r},${l}>${n}`); E[r].push([l, n]); nodes[r + 1][n] = 1; l = n;
        }
      });
      for (let l = 0; l < 3; l++) if (ROWS > 1 && nodes[ROWS - 2][l]) { edges.add(`${ROWS - 2},${l}>1`); nodes[ROWS - 1][1] = 1; }
      if (nodes.slice(0, ROWS - 1).every((row) => row.reduce((a, b) => a + b, 0) >= 2)) break;
    }
    const map = nodes.map((row, r) => row.map((on) => (!on ? null : r === ROWS - 1 ? 'b' : r === 0 ? 'e' : r === ROWS - 2 ? (rnd(0, 1) ? 'r' : '$') : roll(r))));
    map.edges = edges;
    return map;
  }
  const reach = (g, r, l) => g.phase === 'map' && !g.modal && r === g.row + 1 && !!g.map[r][l] && (g.row < 0 || g.map.edges.has(`${g.row},${g.lane}>${l}`));
  function mapHtml(ro) {
    const g = G, X = (l) => 16 + l * 34, Y = (r) => (ROWS - 1 - r) * 72 + 36;
    let ln = '', nd = '';
    for (let r = 0; r < ROWS; r++)
      for (let l = 0; l < 3; l++) {
        if (!g.map[r][l]) continue;
        if (r < ROWS - 1)
          for (let m = 0; m < 3; m++)
            if (g.map.edges.has(`${r},${l}>${m}`)) ln += `<line x1="${X(l)}" y1="${Y(r)}" x2="${X(m)}" y2="${Y(r + 1)}" class="${g.path.has(r + ',' + l) && g.path.has(r + 1 + ',' + m) ? 'on' : ''}"/>`;
        const k = g.map[r][l], can = !ro && reach(g, r, l), cur = g.row === r && g.lane === l, here = g.path.has(r + ',' + l);
        nd += `<button class="nd${can ? ' can' : ''}${here ? ' vis' : ''}${cur ? ' cur' : ''}${k === 'b' ? ' bs' : ''}" style="left:${X(l)}%;top:${Y(r)}px" ${can ? `data-go="${r},${l}"` : 'disabled'} aria-label="${lab(k)}, fase ${r + 1}">${ico(k)}</button>`;
      }
    return `<div class="mapbox"><h2>${ro ? 'Minimapa' : 'Escolhe o caminho'} <small style="color:var(--mu);font-size:.6em">· andar ${g.piso + 1} de ${g.pisos}</small></h2><div class="mapcols"><div class="map" style="height:${ROWS * 72}px"><svg viewBox="0 0 100 ${ROWS * 72}" preserveAspectRatio="none">${ln}</svg>${nd}</div><div class="leg"><b>Legenda</b>${Object.keys(LEG).map((k) => `<span>${ico(k)} ${lab(k)}</span>`).join('')}</div></div></div>`;
  }

  const openShop = (msg) => {
    G.shopMsg = msg || '';
    G.shop = shuffle(Object.keys(RELICS).filter((x) => !G.relics.includes(x))).slice(0, 3).concat('heart');
    G.phase = 'shop';
  };
  // Nó ❓: pode ser uma fase, uma relíquia, escolher o tema da próxima fase, melhorar uma relíquia, curar tudo, loja ou descanso.
  function unknown() {
    const g = G, themes = [...new Set(POOL.map((q) => q.s))].filter((s) => POOL.filter((q) => q.s === s).length >= 8);
    const W = [['e', has('bussola') ? 0 : 30], ['t', 15], ['tema', themes.length > 1 ? 15 : 0], ['up', upgradable().length ? 15 : 0], ['heal', g.lives < g.max ? 10 : 0], ['$', 8], ['r', 7]];
    let x = rnd(1, W.reduce((a, [, w]) => a + w, 0)), k = 't';
    for (const [kk, w] of W) if (w && (x -= w) <= 0) { k = kk; break; }
    if (k === 'tema') {
      g.ev = { title: '❓ Desconhecido: escolhe um tema', msg: 'A próxima fase terá perguntas só sobre o tema que escolheres.', opts: shuffle(themes).slice(0, 4).map((s) => ({ t: esc(s), d: '', m: `A próxima fase terá perguntas sobre <b>${esc(s)}</b>.`, f: () => { g.themeNext = s; } })) };
      g.phase = 'ev';
    } else if (k === 'up') {
      g.ev = { title: '❓ Desconhecido: melhora uma relíquia', msg: 'Escolhe a relíquia que queres melhorar.', opts: shuffle(upgradable()).slice(0, 3).map((r) => ({ t: `${RELICS[r][0]} ${RELICS[r][1]} ➜ ${RELICS[r][1]}+`, d: UP[r], m: `${RELICS[r][0]} <b>${RELICS[r][1]}</b> melhorada: ${UP[r]}`, f: () => doUp(r) })) };
      g.phase = 'ev';
    }
    return k;
  }
  function evPick(i) {
    const g = G, o = g.ev && g.ev.opts[i];
    if (!o) return;
    o.f();
    SFX.ll();
    g.title = '❓ Desconhecido'; g.msg = o.m; g.ev = null; g.phase = 'note';
    view();
  }

  // Entra num nó do mapa.
  function enter(r, l) {
    const g = G;
    g.row = r; g.lane = l; g.path.add(r + ',' + l); g.flash = '';
    let k = g.map[r][l];
    if (k === '?') {
      if (has('cartola')) g.coins += V('cartola', 30, 60);
      k = unknown();
      if (k === 'tema' || k === 'up') return view();
    }
    if (k === 'e' || k === 'E' || k === 'b') return startFase(k);
    if (k === '$') {
      openShop('');
    } else if (k === 'r') {
      const v = has('vela') ? V('vela', 2, 3) : 1;
      g.bonusQ += v; g.bonusSw++; g.lives = Math.min(g.max, g.lives + v);
      g.title = '🏕️ Descanso'; g.msg = `Recuperas ${v} ❤️ e, na próxima fase, tens +${v} ${v > 1 ? 'perguntas' : 'pergunta'} e +1 troca.`; g.phase = 'note';
    } else if (k === 'heal') {
      g.lives = g.max;
      g.title = '❓ Desconhecido'; g.msg = `Uma fonte milagrosa curou-te por completo: ${'❤️'.repeat(g.max)}.`; g.phase = 'note';
    } else {
      const rl = newRelic();
      if (rl) giveRelic(rl);
      else g.coins += 100;
      const r2 = rl && has('chave') ? newRelic() : null;
      if (r2) giveRelic(r2);
      g.title = '🧰 Tesouro'; g.msg = rl ? `Encontraste a relíquia ${RELICS[rl][0]} <b>${RELICS[rl][1]}</b>: ${RELICS[rl][2]}${r2 ? ` 🗝️ A Chave abriu mais uma: ${RELICS[r2][0]} <b>${RELICS[r2][1]}</b>: ${RELICS[r2][2]}` : ''}` : 'Já tens todas as relíquias: ganhas 100 🪙.'; g.phase = 'note';
    }
    view();
  }

  /* ---------- jogo ---------- */
  function startGame() {
    if (G && G.timer) clearTimeout(G.timer);
    POOL = shuffle(ELIG.filter((q) => Temas.tem(CFG.sel, q) && (CFG.withU || !q.u))).sort((a, b) => score(a) - score(b));
    PIDX = new Map(POOL.map((q, i) => [q, i]));
    G = { piso: 0, pisos: Math.max(1, Math.round(POOL.length / QPISO)), map: buildMap(), path: new Set(), row: -1, lane: 0, lvl: 0, lives: 3, max: 3, up: new Set(), themeNext: null, fTheme: null, ev: null, shopMsg: '', coins: 0, total: 0, relics: [], ch: { f: 0, a: 0, t: 0 }, seen: new Set(), streak: 0, shield: 0, bonusQ: 0, bonusSw: 0, f: null, round: 0, left: 0, sw: 0, base: 100, pts: 0, kind: 'normal', q: null, sel: null, gone: new Set(), info: null, hist: [], notes: [], flash: '', phase: 'map', modal: null, end: null };
    view();
    scrollTo(0, 0);
  }
  function startFase(k) {
    const g = G, nm = NAMES[k === 'b' && !last() ? 'p' : k], name = nm[rnd(0, nm.length - 1)];
    g.f = { k, name, target: Math.round((TARGET(prog(), k) * (has('mira') ? V('mira', 0.9, 0.8) : 1) * (has('atalho') && k !== 'e' ? V('atalho', 0.8, 0.65) : 1)) / 50) * 50 };
    g.round = 0; g.streak = has('estrela') ? V('estrela', 2, 4) : 0; g.fTheme = g.themeNext; g.themeNext = null; g.shield = 0; g.errs = 0; g.first = 0; g.hits = 0;
    g.left = QS_PHASE + g.bonusQ + (has('cafe') ? V('cafe', 1, 2) : 0) + (has('ampulheta') && k !== 'e' ? V('ampulheta', 1, 2) : 0); const use = (k) => (has(k) ? 1 + (has('mochila') ? V('mochila', 1, 2) : 0) + V(k, 0, 1) : 0);
    g.ch = { f: use('meio'), a: use('publico'), t: use('amigo') };
    g.sw = use('troca') * SWAPS + g.bonusSw + (has('balao') ? V('balao', 1, 2) : 0); g.bonusQ = g.bonusSw = 0;
    g.kind = k === 'e' ? 'normal' : 'boss';
    nextQ();
  }
  const prog = () => Math.min(1, (G.piso * ROWS + G.row) / Math.max(1, G.pisos * ROWS - 1));
  const diff = () => Math.max(0, Math.min(1, (G.piso * ROWS + G.row + (QS_PHASE - G.left) / QS_PHASE) / Math.max(1, G.pisos * ROWS - 1)));
  function nextQ() {
    const g = G;
    g.lvl = Math.round(diff() * 14);
    g.base = BASE(diff());
    g.q = pickQ();
    g.sel = null; g.gone = new Set(); g.info = null; g.notes = []; g.phase = 'ask';
    view();
  }
  function swap() {
    const g = G;
    if (g.phase !== 'ask' || g.sw < 1) return;
    g.sw--;
    nextQ(); // a troca não gasta pergunta
  }
  function pick(i) {
    const g = G;
    if (!g || (g.phase !== 'ask' && g.phase !== 'confirm') || g.gone.has(i) || i >= g.q.o.length) return;
    g.sel = i; g.phase = 'confirm'; SFX.sel(); view();
  }
  function lockIn() {
    const g = G;
    if (g.phase !== 'confirm' || g.sel == null) return;
    g.phase = 'lock'; SFX.lock(); view();
    g.timer = setTimeout(reveal, reduced ? 600 : 1800);
  }
  function reveal() {
    const g = G, q = g.q;
    g.ok = q.o[g.sel].ok; g.phase = 'reveal'; g.notes = []; g.pts = 0;
    g.hist.push({ q, chosen: g.sel, ok: g.ok, row: g.row });
    let free = false;
    if (!g.ok) g.errs++;
    if (g.ok) {
      g.mul = MULT(g.streak);
      g.pts = Math.round(g.base * g.mul * (has('lupa') ? V('lupa', 1.25, 1.5) : 1));
      if (has('raio') && !g.first) { g.pts *= V('raio', 3, 5); g.notes.push(`⚡ Raio: a primeira certa vale ×${V('raio', 3, 5)}.`); }
      if (has('dado') && Math.random() < V('dado', 0.1, 0.2)) { g.pts *= 2; g.notes.push('🎲 Dado: pontos a dobrar!'); }
      if (has('martelo')) g.pts += V('martelo', 50, 100);
      if (has('ima')) g.pts += Math.floor(g.coins / V('ima', 10, 5));
      if (has('diamante') && g.mul >= 3) g.pts = Math.round(g.pts * V('diamante', 1.5, 2));
      if (has('foguete') && g.streak >= 2) g.pts += V('foguete', 75, 150);
      if (has('caneta') && g.left === 1) { g.pts *= V('caneta', 2, 3); g.notes.push(`🖋️ Caneta: a última pergunta vale ×${V('caneta', 2, 3)}.`); }
      g.first = 1; g.hits++;
      g.round += g.pts; g.total += g.pts; g.streak++;
      if (has('sino') && g.streak % V('sino', 5, 3) === 0 && g.lives < g.max) { g.lives++; g.notes.push('🔔 Sino: +1 ❤️.'); }
      let c = { e: 12, E: 25, b: 40 }[g.f.k] + Math.min(g.streak, 5);
      if (has('carteira')) c += V('carteira', 2, 4);
      if (has('mealheiro')) c = Math.round(c * V('mealheiro', 1.5, 2));
      g.coins += c; g.notes.push('+' + c + ' 🪙');
      if (has('chama') && g.streak % V('chama', 3, 2) === 0) { g.left++; g.notes.push('A Chama deu-te +1 pergunta.'); }
    } else if (has('escudo') && g.shield < V('escudo', 1, 2)) {
      g.shield++; g.notes.push('O Escudo protegeu-te: sem perda de vida nem combo.');
    } else if (has('trevo') && Math.random() < V('trevo', 0.25, 0.4)) {
      free = true; g.notes.push('O Trevo protegeu-te: o erro não conta.');
    } else if (has('capacete') && g.helm !== g.piso) {
      g.helm = g.piso; g.streak = 0; g.notes.push('🪖 Capacete: sem perda de vida neste andar.');
    } else {
      g.streak = has('cadeado') ? Math.floor(g.streak * V('cadeado', 0.5, 0.75)) : 0; g.lives--;
      g.notes.push(g.lives > 0 ? 'Perdeste 1 ❤️.' : 'Ficaste sem vidas.');
      if (g.lives <= 0 && has('fenix')) { g.lives = 2; g.relics = g.relics.filter((x) => x !== 'fenix'); g.notes.push('🪶 A Fénix renasceu: voltas com 2 ❤️ (a relíquia gastou-se).'); }
    }
    if (!free) g.left--;
    if (g.lives > 0 && g.round >= g.f.target) g.notes.push('Meta atingida! A fase fica concluída' + (g.left ? ` e ganhas +${fmt(g.left * LEFT_BONUS)} pontos pelas perguntas que sobram.` : '.'));
    (g.ok ? SFX.ok : SFX.ko)();
    view();
  }
  function next() {
    if (G.lives <= 0) return endGame('dead');
    if (G.round >= G.f.target) return endFase(true);
    if (G.left > 0) nextQ();
    else endFase(false);
  }
  // Fecha a fase (no fim das perguntas, ou antes se já chegaste à meta). Falhar a meta acaba a corrida.
  function endFase(early) {
    const g = G, f = g.f, bonus = early ? g.left * LEFT_BONUS : 0;
    g.total += bonus;
    if (g.round < f.target) return endGame('lose');
    const gain = 20 + (has('cofre') ? V('cofre', 30, 60) : 0);
    g.coins += gain;
    let m = `Fase concluída: <b>${fmt(g.round)}</b> de ${fmt(f.target)} pontos.${bonus ? ` Perguntas por usar: +${fmt(bonus)} pontos.` : ''} +${gain} 🪙.`;
    if (has('banco')) { const j = Math.floor(g.coins * V('banco', 0.1, 0.2)); g.coins += j; m += ` Juros: +${j} 🪙.`; }
    if (has('coroa') && g.errs === 0) { g.total += V('coroa', 200, 400); m += ` 👑 Fase perfeita: +${V('coroa', 200, 400)} pontos.`; }
    if (has('pergaminho') && g.hits) { const pg = g.hits * V('pergaminho', 20, 40); g.total += pg; m += ` 📜 Pergaminho: +${pg} pontos.`; }
    if (has('pocao') && g.lives < g.max) { g.lives++; m += ' 🧪 Poção: +1 ❤️.'; }
    if (f.k !== 'e' && has('ouro')) { g.coins += V('ouro', 50, 100); m += ` 🥇 Medalha de ouro: +${V('ouro', 50, 100)} 🪙.`; }
    if (f.k !== 'e' && has('trofeu')) { g.total += V('trofeu', 300, 600); m += ` 🏆 Troféu: +${V('trofeu', 300, 600)} pontos.`; }
    if (f.k === 'b') {
      if (last()) { g.total += 500; return endGame('win'); }
      g.piso++; g.map = buildMap(); g.path = new Set(); g.row = -1; g.lane = 0; g.lives = Math.min(g.max, g.lives + 1);
      if (has('penso')) g.lives = Math.min(g.max, g.lives + V('penso', 1, 2));
      if (has('trombeta')) { g.total += V('trombeta', 500, 1000); m += ` 🎺 Trombeta: +${V('trombeta', 500, 1000)} pontos.`; }
      m += ` Subiste para o andar ${g.piso + 1} de ${g.pisos}. +1 ❤️.`;
      g.f = null; g.q = null;
      openShop(`🚪 <b>Andar ${g.piso} concluído!</b> ${m}`);
      view(); scrollTo(0, 0); return;
    }
    if (f.k === 'E') {
      const rl = newRelic();
      if (rl) { giveRelic(rl); m += ` Relíquia: ${RELICS[rl][0]} <b>${RELICS[rl][1]}</b>.`; }
    }
    g.title = '✅ ' + f.name; g.msg = m; g.f = null; g.phase = 'note'; g.q = null;
    view(); scrollTo(0, 0);
  }
  const price = (k) => Math.round((k === 'heart' ? COST_HEART : COST_RELIC) * (has('desconto') ? V('desconto', 0.7, 0.5) : 1));
  function buy(k) {
    const g = G, c = price(k);
    if (g.phase !== 'shop' || g.coins < c || (k === 'heart' && g.lives >= g.max)) return;
    if (k === 'heart') g.lives++;
    else if (k === 'help') g.ch['fat'[rnd(0, 2)]]++;
    else { giveRelic(k); g.shop = g.shop.filter((x) => x !== k); }
    g.coins -= c; SFX.ll(); view();
  }
  const SH = () => `<div class="note"><h2>🛒 Loja</h2>${G.shopMsg ? `<p>${G.shopMsg}</p>` : ''}<p>Tens 🪙 ${G.coins}.</p><div class="opts n4">${G.shop.map((k) => {
    const h = k === 'help', hr = k === 'heart', c = price(k), r = RELICS[k] || [], nb = G.coins < c || (hr && G.lives >= G.max);
    return `<button class="opt${nb ? ' nb' : ''}" data-buy="${k}" ${nb ? 'disabled' : ''}><span class="ltr">${h ? '🎁' : hr ? '❤️' : r[0]}</span><span><b>${h ? 'Uma ajuda extra' : hr ? 'Uma vida' : r[1]}</b> (🪙 ${c})<br><small>${h ? '+1 uso de uma ajuda à sorte (50:50, público ou amigo).' : hr ? 'Recupera 1 vida.' : r[2]}</small></span></button>`;
  }).join('')}</div><div class="confirm"><button class="b go" data-act="tomap">Escolher caminho</button></div></div>`;

  function lifeline(k) {
    const g = G;
    if (!g || !g.ch[k] || (g.phase !== 'ask' && g.phase !== 'confirm')) return;
    const q = g.q, tier = diff() < 0.34 ? 0 : diff() < 0.67 ? 1 : 2, R = q.o.map((_, i) => i).filter((i) => !g.gone.has(i)), c = R.find((i) => q.o[i].ok);
    if (k === 'f' && R.length <= 2) return;
    g.ch[k]--; SFX.ll();
    if (k === 'f') {
      shuffle(R.filter((i) => i !== c)).slice(0, Math.floor(q.o.length / 2)).forEach((i) => g.gone.add(i));
      g.info = null;
      if (g.sel != null && g.gone.has(g.sel)) { g.sel = null; g.phase = 'ask'; }
    }
    if (k === 'a') {
      let pc = Math.min(94, [rnd(62, 88), rnd(42, 66), rnd(28, 52)][tier] + (q.o.length - R.length) * 8), top = c;
      if (tier === 2 && Math.random() < 0.12) { const w = R.filter((i) => i !== c); top = w[rnd(0, w.length - 1)]; }
      if (has('megafone')) { top = c; pc = Math.max(pc, 80); }
      const oth = R.filter((i) => i !== top), w = oth.map(() => Math.random() + 0.2), sw = w.reduce((a, b) => a + b, 0), p = {};
      oth.forEach((i, j) => (p[i] = Math.round(((100 - pc) * w[j]) / sw)));
      p[top] = pc;
      p[top] += 100 - R.reduce((a, i) => a + p[i], 0);
      g.info = { type: 'aud', p };
    }
    if (k === 't') {
      const wr = R.filter((i) => i !== c), guess = has('caderno') || Math.random() < [0.92, 0.75, 0.55][tier] ? c : wr[rnd(0, wr.length - 1)], r = has('caderno') ? 0 : Math.random(), sure = [0.7, 0.4, 0.2][tier], mid = [0.25, 0.35, 0.35][tier], l = LT[guess];
      g.info = { type: 'tel', text: r < sure ? `Tenho a certeza, é a ${l}.` : r < sure + mid ? `Acho que é a ${l}, mas não ponho as mãos no fogo.` : `Hmm, não sei bem. Se tivesse de escolher, ia na ${l}.` };
    }
    view();
  }

  /* ---------- ecrã de jogo ---------- */
  // Boneco do meio (instrutor com boné e volante); a cara muda: neutra, feliz (certa) ou triste (errada).
  const mouth = { n: 'M50 66 h20', h: 'M48 63 q12 14 24 0', s: 'M48 70 q12 -12 24 0' };
  const MID = (g, ph) => {
    const m = ph === 'reveal' ? (g.ok ? 'h' : 's') : 'n', pc = Math.min(100, (g.round / g.f.target) * 100);
    return `<div class="mid ${m}"><svg viewBox="0 0 120 120" role="img" aria-label="Instrutor"><rect x="30" y="80" width="60" height="40" rx="14" fill="#2f6fed"/><path d="M52 80 l8 14 l8 -14z" fill="#fff"/><circle cx="60" cy="50" r="26" fill="#f2c9a0"/><path d="M33 44 q27 -34 54 0 z" fill="#d9531e"/><rect x="30" y="42" width="60" height="6" rx="3" fill="#a83a10"/><circle cx="51" cy="52" r="3" fill="#222"/><circle cx="69" cy="52" r="3" fill="#222"/><path d="${mouth[m]}" fill="none" stroke="#222" stroke-width="3" stroke-linecap="round"/><circle cx="60" cy="108" r="13" fill="none" stroke="#1b1b1b" stroke-width="5"/></svg><div class="pod"><small>Pontos da fase</small><b><i class="chip"></i>${fmt(g.round)}</b><div class="pb"><i style="width:${pc}%"></i></div>${ph === 'reveal' && g.ok ? `<span class="pop">+${fmt(g.pts)}</span>` : ''}</div></div>`;
  };

  const mx = (n) => String(+n.toFixed(2));
  function view() {
    const g = G, ph = g.phase, f = g.f, q = g.q, live = ph === 'ask' || ph === 'confirm', inQ = !!q && ['ask', 'confirm', 'lock', 'reveal'].includes(ph);
    const hearts = '❤️'.repeat(Math.max(0, g.lives)) + '🖤'.repeat(Math.max(0, g.max - g.lives));
    const panel = `<aside class="bl"><div class="blh">${f ? esc(f.name) : 'A corrida'}</div>${f ? `<div class="blt">Pontua pelo menos<br><b><i class="chip"></i>${fmt(f.target)}</b></div>` : ''}<div class="blv" aria-label="${g.lives} vidas">${hearts}</div><div class="blm">🪙 ${g.coins}</div><div class="bls"><div><small>Fase</small><b>${Math.max(1, g.row + 1)}/${ROWS}</b></div><div><small>Andar</small><b>${g.piso + 1}/${g.pisos}</b></div></div><div class="rls">${g.relics.map((k) => `<span class="rl" data-tip="${RELICS[k][1]}: ${rdesc(k)}" tabindex="0" aria-label="${RELICS[k][1]}: ${rdesc(k)}">${RELICS[k][0]}${g.up.has(k) ? '<sup>+</sup>' : ''}</span>`).join('') || '<small>Sem relíquias</small>'}</div>${ph === 'map' ? '' : '<button class="b go" data-act="minimap">🗺️ Ver minimapa</button>'}<button class="b go" data-act="colmodal">📚 Coleções</button></aside>`;
    let main = '';
    if (ph === 'map') main = mapHtml();
    else if (ph === 'shop') main = SH();
    else if (ph === 'ev') main = `<div class="note"><h2>${g.ev.title}</h2><p>${g.ev.msg}</p><div class="opts n${g.ev.opts.length}">${g.ev.opts.map((o, i) => `<button class="opt" data-ev="${i}"><span class="ltr">${i + 1}</span><span><b>${o.t}</b>${o.d ? `<br><small>${o.d}</small>` : ''}</span></button>`).join('')}</div></div>`;
    else if (ph === 'note') main = `<div class="note"><h2>${g.title}</h2><p>${g.msg}</p><div class="confirm"><button class="b go" data-act="tomap" data-focus>Escolher caminho</button></div></div>`;
    else if (inQ) {
      const ll = (k, ic, lb) => `<button class="ll${!g.ch[k] ? ' used' : ''}" data-ll="${k}" ${!g.ch[k] || !live || (k === 'f' && q.o.length - g.gone.size <= 2) ? 'disabled' : ''}><span class="ic" aria-hidden="true">${ic}</span><span>${lb}${g.ch[k] > 1 ? ' ×' + g.ch[k] : ''}</span></button>`;
      const right = q.o.findIndex((o) => o.ok), L = g.sel != null ? LT[g.sel] : '';
      let info = '';
      if (g.info && g.info.type === 'aud') info = `<div class="info" role="status"><b>O público votou</b>${q.o.map((o, i) => (g.gone.has(i) ? '' : `<div class="bar"><span>${LT[i]}</span><i style="width:${g.info.p[i]}%"></i><span>${g.info.p[i]}%</span></div>`)).join('')}</div>`;
      if (g.info && g.info.type === 'tel') info = `<div class="info" role="status"><b>O teu amigo diz</b><p>“${esc(g.info.text)}”</p></div>`;
      let below = '';
      if (ph === 'confirm') below = `<div class="confirm"><span>Resposta final: <b>${L}</b>?</span><button class="b go" data-act="final" data-focus>Sim, é a final</button><button class="b" data-act="cancel">Não</button></div>`;
      if (ph === 'reveal') {
        below = `<div class="reveal ${g.ok ? 'good' : 'bad'}" role="status"><b>${g.ok ? `Certa! +${fmt(g.pts)} pontos (${g.base} × ${mx(g.mul)})` : 'Resposta errada. Sem pontos.'}</b><p>${g.ok ? '' : `A resposta certa era a ${LT[right]}: `}${g.ok ? `${LT[right]}: ` : ''}${esc(cap(q.o[right].t))}</p>${q.e}${manBtn(q)}${g.notes.map((n) => `<small>${n}</small>`).join('')}${q.u ? '<small>Esta resposta não está confirmada oficialmente.</small>' : ''}<button class="b go" data-act="next" data-focus>${g.lives <= 0 ? 'Ver o resultado' : g.round >= g.f.target ? 'Concluir a fase' : g.left > 0 ? 'Pergunta seguinte' : 'Fechar a fase'}</button></div>`;
      }
      const lifeBar = [has('meio') && ll('f', '50:50', '50:50'), has('publico') && ll('a', '👥', 'Público'), has('amigo') && ll('t', '📞', 'Amigo'), (has('troca') || g.sw > 0) && `<button class="ll" data-act="swap" ${ph === 'ask' && g.sw > 0 ? '' : 'disabled'}><span class="ic" aria-hidden="true">🔄</span><span>Trocar${g.sw > 1 ? ' ×' + g.sw : ''}</span></button>`].filter(Boolean);
      main = `<div class="meta"><span>${f.name}${g.fTheme ? ' (' + esc(g.fTheme) + ')' : ''}: ${g.left} ${g.left === 1 ? 'pergunta' : 'perguntas'} por responder · Total ${fmt(g.total)} pontos</span><b>Vale ${g.base} × ${mx(MULT(g.streak))}</b></div>
${lifeBar.length ? `<div class="lifes">${lifeBar.join('')}</div>` : ''}${info}${MID(g, ph)}
<div class="qarea"><div class="qbox"><span>${esc(q.q)}</span></div><div class="opts n${q.o.length}${ph === 'lock' ? ' lock' : ''}">${q.o.map((o, i) => {
        let c = 'opt';
        if (g.gone.has(i)) c += ' gone';
        if ((ph === 'confirm' || ph === 'lock') && g.sel === i) c += ' sel';
        if (ph === 'reveal') { if (o.ok) c += ' ok'; else if (g.sel === i) c += ' ko'; }
        return `<button class="${c}" data-i="${i}" ${!live || g.gone.has(i) ? 'disabled' : ''} ${g.gone.has(i) ? 'aria-hidden="true" tabindex="-1"' : ''} aria-label="${LT[i]}: ${esc(cap(o.t))}"><span class="ltr" aria-hidden="true">${LT[i]}:</span><span>${esc(cap(o.t))}</span></button>`;
      }).join('')}</div>${below}</div>`;
    }
    const modal = g.modal === 'col' ? `<div class="ov"><div class="dlg wide colw" role="dialog" aria-modal="true"><h2>Coleções</h2>${colHtml()}<div class="row"><button class="b go" data-act="mapclose" data-focus>Fechar</button></div></div></div>` : g.modal === 'map' ? `<div class="ov"><div class="dlg wide" role="dialog" aria-modal="true">${mapHtml(true)}<div class="row"><button class="b go" data-act="mapclose" data-focus>Fechar</button></div></div></div>` : g.modal === 'walk' ? `<div class="ov"><div class="dlg" role="dialog" aria-modal="true"><p>Se desistires, ficas com <b>${fmt(g.total)} pontos</b>. Tens a certeza?</p><div class="row"><button class="b go" data-act="walkyes" data-focus>Sim, desistir</button><button class="b" data-act="walkno">Continuar a jogar</button></div></div></div>` : '';
    app.innerHTML = `<div class="top"><a class="tb" href="index.html">Início</a><span class="sp"></span>${soundBtn()}<button class="tb" data-act="manual">📖 Manual</button><button class="tb" data-act="walk">Desistir</button></div><div class="play">${panel}<section class="stage">${main}</section></div>${modal}`;
    const fo = document.querySelector('[data-focus]');
    if (fo) fo.focus({ preventScroll: true });
    if (ph === 'reveal') { const r = $('.reveal'); if (r) r.scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' }); }
  }

  /* ---------- fim ---------- */
  function endGame(kind) {
    const g = G;
    if (g.timer) clearTimeout(g.timer);
    g.walkQ = g.phase === 'ask' || g.phase === 'confirm' ? g.q : null;
    const newBest = g.total > best();
    if (newBest) store.set('qqsm_pts', String(g.total));
    g.phase = 'end'; g.end = { kind, newBest }; g.modal = null;
    (kind === 'win' ? SFX.win : kind === 'lose' || kind === 'dead' ? () => {} : SFX.ok)();
    renderEnd(); scrollTo(0, 0);
  }
  function renderEnd() {
    const g = G, { kind, newBest } = g.end;
    const title = kind === 'win' ? 'Exame final superado!' : kind === 'walk' ? 'Desististe' : kind === 'dead' ? `Ficaste sem vidas em ${esc(g.f.name)}` : `Não chegaste à meta em ${esc(g.f.name)}`;
    const sub = kind === 'win' ? 'Passaste os ' + g.pisos + (g.pisos === 1 ? ' andar.' : ' andares.') : kind === 'walk' ? 'Ficas com os pontos que já tinhas.' : kind === 'dead' ? `Fizeste ${fmt(g.round)} pontos nessa fase.` : `Fizeste ${fmt(g.round)} de ${fmt(g.f.target)} pontos nessa fase.`;
    const items = g.hist.map((h, i) => ({ q: h.q, n: i + 1, st: h.ok ? 'ok' : 'ko', ch: h.chosen }));
    if (kind === 'walk' && g.walkQ) items.push({ q: g.walkQ, n: items.length + 1, st: 'na', ch: null });
    const nOk = items.filter((i) => i.st === 'ok').length, nKo = items.filter((i) => i.st === 'ko').length;
    const fl = `<div class="flt" role="group" aria-label="Filtrar perguntas"><button class="b" data-flt="all" aria-pressed="true">Todas (${items.length})</button><button class="b" data-flt="ok" aria-pressed="false" ${nOk ? '' : 'disabled'}>Só as certas (${nOk})</button><button class="b" data-flt="ko" aria-pressed="false" ${nKo ? '' : 'disabled'}>Só as erradas (${nKo})</button></div>`;
    const rv = items.map((it) => {
      const r = it.q.o.find((o) => o.ok);
      return `<div class="rv s-${it.st}"><span class="st ${it.st}">${it.st === 'ok' ? 'Certa' : it.st === 'ko' ? 'Errada' : 'Sem resposta'}</span> <b>${it.n}.</b> <span style="white-space:pre-line">${esc(it.q.q)}</span>
<p>Resposta certa: ${esc(cap(r.t))}</p>${it.st === 'ko' ? `<p style="color:var(--mu)">A tua resposta: ${esc(cap(it.q.o[it.ch].t))}</p>` : ''}${it.q.e}${manBtn(it.q)}${it.q.u ? '<small style="color:var(--mu)">Esta resposta não está confirmada oficialmente.</small>' : ''}</div>`;
    }).join('');
    const lq = g.hist[g.hist.length - 1], where = `andar ${g.piso + 1} de ${g.pisos}, fase ${Math.max(1, g.row + 1)} de ${ROWS}`;
    let why = '';
    if (kind === 'dead' && lq) why = `<b>Como perdeste:</b> ficaste sem vidas ❤️ ao errares a última pergunta em <b>${esc(g.f.name)}</b> (${where}).<br><small>«${esc(lq.q.q)}»<br>Resposta certa: ${esc(cap(lq.q.o.find((o) => o.ok).t))}</small>`;
    else if (kind === 'lose') why = `<b>Como perdeste:</b> acabaram-se as perguntas de <b>${esc(g.f.name)}</b> (${where}) sem chegares à meta. Fizeste <b>${fmt(g.round)}</b> de <b>${fmt(g.f.target)}</b> pontos (faltaram ${fmt(g.f.target - g.round)}), com ${g.hits} certas e ${g.errs} erradas, e ainda tinhas ${g.lives} ${g.lives === 1 ? 'vida' : 'vidas'}.`;
    else if (kind === 'walk') why = `<b>Desististe</b> no ${where}.`;
    else if (kind === 'win') why = `<b>Conseguiste!</b> Venceste o Exame final no ${where}.`;
    app.innerHTML = `<div class="top"><a class="tb" href="index.html">Voltar ao início</a><span class="sp"></span>${soundBtn()}</div>
<div class="end"><h1>${title}</h1><div class="amt">${fmt(g.total)} pontos</div><div class="why ${kind}">${why}</div><p>${sub}${newBest ? ' <b>Novo melhor resultado!</b>' : ''}</p><p>Andar ${g.piso + 1} de ${g.pisos}, fase ${Math.max(1, g.row + 1)} de ${ROWS}. Moedas: 🪙 ${g.coins}. Relíquias: ${g.relics.length ? g.relics.map((k) => RELICS[k][0] + ' ' + RELICS[k][1]).join(', ') : 'nenhuma'}.</p>
<div class="row"><button class="bigbtn" data-act="again" data-focus>Jogar outra vez</button><button class="bigbtn alt" data-act="menu">Mudar os temas</button></div>
<details open><summary>Rever as perguntas</summary>${fl}<div class="rvs" data-show="all">${rv}</div></details></div>`;
    const fo = document.querySelector('[data-focus]');
    if (fo) fo.focus({ preventScroll: true });
  }

  /* ---------- eventos ---------- */
  function toggleSound() {
    SOUND = !SOUND;
    store.set('qqsm_snd', SOUND ? '1' : '0');
    if (SOUND) SFX.sel();
    const b = document.querySelector('[data-act=sound]');
    if (b) { b.textContent = SOUND ? 'Som ligado' : 'Som desligado'; b.setAttribute('aria-pressed', SOUND); }
  }
  const ACT = {
    start: startGame, final: lockIn, next, swap, again: startGame, sound: toggleSound,
    cancel: () => { G.sel = null; G.phase = 'ask'; view(); },
    close: () => endFase(true),
    tomap: () => { G.phase = 'map'; view(); scrollTo(0, 0); },
    walk: () => { if (G && G.phase !== 'end') { G.modal = 'walk'; view(); } },
    walkyes: () => endGame('walk'),
    walkno: () => { G.modal = null; view(); },
    minimap: () => { G.modal = 'map'; view(); },
    colmodal: () => { G.modal = 'col'; view(); },
    mapclose: () => { G.modal = null; view(); },
    manual: () => manual(true),
    mclose: () => manual(false),
    multigo: () => (window.mqOpen ? window.mqOpen() : alert('O multijogador não está disponível (precisa de ligação à internet).')),
    menu: renderSolo, menu0: renderMenu, solo: renderSolo, regras: renderRegras, multimenu: renderMulti, colecoes: renderCol,
  };
  // Clicar fora da janela (no fundo escuro) fecha o minimapa, as coleções e o manual.
  let downOn = null;
  document.addEventListener('mousedown', (e) => (downOn = e.target), true);
  const outside = (e) => downOn === e.target && e.target.classList.contains('ov') && G && (G.modal === 'map' || G.modal === 'col');
  const click = (e) => {
    if (outside(e)) { G.modal = null; return view(); }
    const b = e.target.closest('button');
    if (!b || b.disabled) return;
    if (b.dataset.flt) {
      const box = document.querySelector('.rvs');
      if (box) box.dataset.show = b.dataset.flt;
      document.querySelectorAll('[data-flt]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      return;
    }
    if (b.dataset.man) return manual(true, b.dataset.man);
    if (b.dataset.i !== undefined) return pick(+b.dataset.i);
    if (b.dataset.ll) return lifeline(b.dataset.ll);
    if (b.dataset.buy) return buy(b.dataset.buy);
    if (b.dataset.ev !== undefined) return evPick(+b.dataset.ev);
    if (b.dataset.go) return enter(...b.dataset.go.split(',').map(Number));
    const f = ACT[b.dataset.act];
    if (f) f();
  };
  app.addEventListener('click', click);
  MAN.addEventListener('click', (e) => { if (downOn === MAN && e.target === MAN) manual(false); else click(e); });
  app.addEventListener('change', (e) => { if (e.target.matches('#wu')) startInfo(); });
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const k = e.key.toLowerCase();
    if (!MAN.hidden) { if (k === 'escape') manual(false); return; }
    if (!G) return;
    if (k === 'escape') {
      if (G.modal) { G.modal = null; view(); } else if (G.phase === 'confirm') ACT.cancel();
      return;
    }
    if (G.modal || G.phase === 'end' || G.phase === 'lock') return;
    const i = 'abcd'.indexOf(k), j = ['1', '2', '3', '4'].indexOf(k), x = i >= 0 ? i : j;
    if (x >= 0 && (G.phase === 'ask' || G.phase === 'confirm')) pick(x);
  });

  // Partilha com js/milionario-multi.js (o multijogador continua com prémios em euros).
  window.MILIONARIO = { ELIG, PRIZE, score, keepOrder, shuffle, esc, cap, money, rnd, app, SFX, store, cfg: () => CFG, renderStart: renderMenu };

  if (!QS.length) app.innerHTML = '<p style="padding:2rem">Não foi possível carregar as perguntas. Verifica a ligação e o código de acesso e tenta outra vez.</p>';
  else renderMenu();
})();
