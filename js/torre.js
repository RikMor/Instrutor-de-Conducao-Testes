/* ==========================================================================
   torre.js  —  jogo "Torre das Cartas" (estilo roguelike de cartas)
   --------------------------------------------------------------------------
   Como se joga: sobe 3 andares; cada andar tem 2 inimigos comuns + 1 boss.
   Para jogar uma carta, o jogador tem de acertar numa pergunta do teste:
   se acertar a carta funciona, se errar falha.

   Ecrãs (variável scr):
     menu -> blinds (escolher combate; ou ignorar um combate -> etiqueta, como no Balatro)
          -> battle -> shop (relíquias, cartas e packs; já não há recompensa de cartas à parte)
          -> [pack: escolher 1 ou 2 itens de um pack] -> blinds ... -> [rest após boss] -> win | over
     O ecrã final (over / win) mostra a causa e todas as perguntas respondidas (certas e erradas).

   Dados principais:
     BASE   cartas  { n: nome, c: custo, t: tipo (a/d/s), r: raridade, a: efeito, u: melhoria }
              o efeito (a) é uma lista de parâmetros (dmg, blk, str, poison, draw, ...) que run() aplica;
              a descrição de cada carta é gerada a partir deles (desc). Cada carta tem uma versão
              melhorada "id+" criada automaticamente a partir de u.
     FOES   inimigos { n: nome, e: emoji, hp: vida, p: padrão de jogadas [tipo, valor] }
              tipos de jogada do inimigo: a = ataca, d = defende, b = reforça-se
     FL     os 3 andares: { c: inimigos comuns possíveis, b: boss }
     RL     relíquias (máximo 5; compram-se na loja ou em packs, escolhem-se depois de um boss e vendem-se)
     TR     tarots (consumíveis que mexem nas cartas do baralho, como no Balatro)
     TAGS   etiquetas (ganham-se ao ignorar um combate, como no Balatro)
     PKS    packs da loja: Arcano (tarots), Padrão (cartas) e do Bobo (relíquias); normal, jumbo e mega

   Estado do jogo (G = jogador, E = inimigo atual) está descrito mais abaixo.
   Depois de qualquer mudança chama-se render(), que redesenha o ecrã todo.
   ========================================================================== */

// QS = lista de perguntas (de quiz.js). N = nº total de combates (3 andares x 3).
var QS = window.QS;
var N = 9;

// A jogadora/o tem a relíquia k?
var hasRel = function (k) {
  return G.rels.indexOf(k) >= 0;
};

// Dano ao inimigo: valor da carta + força + bónus da sequência de acertos (+ bónus do Punhal no
// primeiro golpe). Se o inimigo estiver vulnerável, +50%. O escudo do inimigo absorve primeiro.
var hit = function (v) {
  var b = G.pb || 0;
  G.pb = 0;
  var d = v + G.str + Math.floor(G.sk / 2) + b;
  if (E.vuln > 0) d = Math.floor(d * 1.5);
  var a = Math.min(E.block, d);
  E.block -= a;
  E.hp -= d - a;
  FX.push(['e', d - a > 0 ? '-' + (d - a) : '🛡️']);
  msg = 'Causaste ' + d + ' de dano.';
};

// ---- Efeitos das cartas ----
// Parâmetros de um efeito (a):
//   dmg dano · hits nº de golpes · bd dano igual ao escudo · exec dobro se o inimigo < 50% vida
//   blk escudo · str força · heal cura · vuln/weak turnos de vulnerável/fraco no inimigo
//   poison veneno · cat duplica o veneno do inimigo · draw compra cartas · en energia
//   sd vida que perdes · exh a carta é exaurida (não vai para o descarte, volta no próximo combate)
function run(a) {
  var i,
    n = a.hits || 1;
  if (a.sd) {
    G.hp = Math.max(1, G.hp - a.sd);
    FX.push(['p', '-' + a.sd]);
  }
  if (a.bd) {
    if (G.block || a.dmg) hit(G.block + (a.dmg || 0));
    else msg = 'Sem escudo: sem dano.';
  } else if (a.dmg) {
    var dbl = a.exec && E.hp <= E.max / 2;
    for (i = 0; i < n; i++) hit(dbl ? a.dmg * 2 : a.dmg);
  }
  if (a.blk) G.block += a.blk;
  if (a.str) G.str += a.str;
  if (a.heal) G.hp = Math.min(G.max, G.hp + a.heal);
  if (a.vuln) E.vuln = Math.max(E.vuln, a.vuln + 1);
  if (a.weak) E.weak = Math.max(E.weak, a.weak);
  if (a.poison) E.poison += a.poison + (hasRel('presa') ? 3 : 0);
  if (a.cat) E.poison *= 2;
  if (a.draw) draw(a.draw);
  if (a.en) G.en += a.en;
}

// Texto da carta, gerado a partir dos parâmetros do efeito.
function desc(a) {
  var p = [],
    s = function (n) {
      return n > 1 ? 's' : '';
    };
  if (a.sd) p.push('Perdes ' + a.sd + ' de vida.');
  if (a.bd) p.push('Causa dano igual ao teu escudo' + (a.dmg ? ' +' + a.dmg : '') + '.');
  else if (a.dmg)
    p.push(
      'Causa ' + a.dmg + ' de dano' + (a.hits > 1 ? ' ' + a.hits + ' vezes' : '') + '.' +
        (a.exec ? ' O dobro se o inimigo tiver menos de metade da vida.' : ''),
    );
  if (a.blk) p.push('Ganha ' + a.blk + ' de escudo.');
  if (a.str) p.push('Ganha ' + a.str + ' de força.');
  if (a.heal) p.push('Recupera ' + a.heal + ' de vida.');
  if (a.vuln) p.push('Inimigo vulnerável ' + a.vuln + ' turno' + s(a.vuln) + ' (+50% dano).');
  if (a.weak) p.push('Inimigo fraco ' + a.weak + ' turno' + s(a.weak) + ' (-25% dano).');
  if (a.poison) p.push('Aplica ' + a.poison + ' de veneno.');
  if (a.cat) p.push('Duplica o veneno do inimigo.');
  if (a.draw) p.push('Compra ' + a.draw + ' carta' + s(a.draw) + '.');
  if (a.en) p.push('Ganha ' + a.en + ' de energia.');
  if (a.exh) p.push('Exaurir.');
  return p.join(' ');
}

// ---- Cartas do jogo ----
// r = raridade (0 inicial, 1 comum, 2 incomum, 3 rara). u = o que muda na versão melhorada (+).
var BASE = {
  golpe: { n: 'Golpe', c: 1, t: 'a', r: 0, a: { dmg: 6 }, u: { dmg: 9 } },
  defender: { n: 'Defender', c: 1, t: 'd', r: 0, a: { blk: 5 }, u: { blk: 8 } },
  duplo: { n: 'Golpe Duplo', c: 1, t: 'a', r: 1, a: { dmg: 4, hits: 2 }, u: { dmg: 6 } },
  investida: { n: 'Investida', c: 2, t: 'a', r: 1, a: { dmg: 14 }, u: { dmg: 19 } },
  ferreo: { n: 'Escudo de Ferro', c: 2, t: 'd', r: 1, a: { blk: 12 }, u: { blk: 16 } },
  furia: { n: 'Fúria', c: 0, t: 's', r: 2, a: { str: 2, exh: 1 }, u: { str: 3 } },
  cura: { n: 'Cura', c: 2, t: 's', r: 1, a: { heal: 8, exh: 1 }, u: { heal: 12 } },
  vuln: { n: 'Expor', c: 1, t: 's', r: 1, a: { vuln: 2 }, u: { vuln: 3 } },
  inspirar: { n: 'Inspirar', c: 1, t: 's', r: 1, a: { draw: 2 }, u: { draw: 3 } },
  veneno: { n: 'Veneno', c: 1, t: 's', r: 1, a: { poison: 5 }, u: { poison: 8 } },
  contra: { n: 'Contra-ataque', c: 1, t: 'a', r: 1, a: { dmg: 5, blk: 5 }, u: { dmg: 7, blk: 7 } },
  explosao: { n: 'Explosão', c: 3, t: 'a', r: 2, a: { dmg: 26 }, u: { dmg: 34 } },
  corte: { n: 'Corte Rápido', c: 0, t: 'a', r: 1, a: { dmg: 3, draw: 1 }, u: { dmg: 5 } },
  esquiva: { n: 'Esquiva', c: 0, t: 'd', r: 1, a: { blk: 3, draw: 1 }, u: { blk: 5 } },
  enfraquecer: { n: 'Enfraquecer', c: 1, t: 's', r: 1, a: { weak: 2 }, u: { weak: 3 } },
  pancada: { n: 'Pancada de Escudo', c: 1, t: 'a', r: 2, a: { bd: 1 }, u: { dmg: 5 } },
  pesado: { n: 'Golpe Pesado', c: 2, t: 'a', r: 2, a: { dmg: 10, vuln: 2 }, u: { dmg: 14 } },
  sangria: { n: 'Sangria', c: 1, t: 'a', r: 2, a: { dmg: 3, poison: 4 }, u: { dmg: 5, poison: 6 } },
  cega: { n: 'Fúria Cega', c: 0, t: 'a', r: 2, a: { dmg: 9, sd: 3 }, u: { dmg: 13 } },
  tempestade: { n: 'Tempestade', c: 2, t: 'a', r: 2, a: { dmg: 5, hits: 3 }, u: { dmg: 7 } },
  fortaleza: { n: 'Fortaleza', c: 3, t: 'd', r: 2, a: { blk: 24 }, u: { blk: 32 } },
  guarda: { n: 'Guarda Astuta', c: 1, t: 'd', r: 2, a: { blk: 6, weak: 1 }, u: { blk: 9, weak: 2 } },
  postura: { n: 'Postura de Guerra', c: 1, t: 's', r: 2, a: { str: 1, blk: 4 }, u: { str: 2, blk: 6 } },
  exec: { n: 'Execução', c: 1, t: 'a', r: 3, a: { dmg: 8, exec: 1 }, u: { dmg: 11 } },
  adrenalina: { n: 'Adrenalina', c: 0, t: 's', r: 3, a: { en: 1, draw: 2, exh: 1 }, u: { en: 2 } },
  oferenda: { n: 'Oferenda', c: 0, t: 's', r: 3, a: { sd: 5, en: 2, draw: 3, exh: 1 }, u: { draw: 5 } },
  catalisador: { n: 'Catalisador', c: 2, t: 's', r: 3, a: { cat: 1, exh: 1 }, u: { c: 1 } },
};

// CARDS = BASE + versões melhoradas ("id+"): { n, c, t, r, up, a, d (texto), f (efeito) }.
var CARDS = {};
Object.keys(BASE).forEach(function (id) {
  var b = BASE[id];
  var mk = function (name, c, a, up) {
    return {
      n: name,
      c: c,
      t: b.t,
      r: b.r,
      up: up,
      a: a,
      d: desc(a),
      f: function () {
        run(a);
      },
    };
  };
  var ua = Object.assign({}, b.a, b.u);
  delete ua.c;
  CARDS[id] = mk(b.n, b.c, b.a, false);
  CARDS[id + '+'] = mk(b.n + '+', b.u.c != null ? b.u.c : b.c, ua, true);
});

// Golpe Pesado: texto mais curto ("(+50%)" em vez de "(+50% dano)").
['pesado', 'pesado+'].forEach(function (id) {
  CARDS[id].d = CARDS[id].d.replace('(+50% dano)', '(+50%)');
});

// Nome de cada tipo de carta (a = ataque, d = defesa, s = habilidade).
var TN = { a: 'Ataque', d: 'Defesa', s: 'Habilidade' };

// Cartas que podem aparecer como recompensa ou na loja (as iniciais não).
var POOL = Object.keys(BASE).filter(function (id) {
  return BASE[id].r > 0;
});

// Sorteia n cartas diferentes do POOL (as comuns saem mais vezes do que as raras).
function rolls(n) {
  var bag = [],
    out = [];
  POOL.forEach(function (id) {
    for (var i = 0; i < 4 - BASE[id].r; i++) bag.push(id);
  });
  sh(bag).forEach(function (id) {
    if (out.length < n && out.indexOf(id) < 0) out.push(id);
  });
  return out;
}

// ---- Inimigos ----
var FOES = {
  slime: {
    n: 'Slime',
    e: '🟢',
    hp: 24,
    p: [
      ['a', 6],
      ['a', 8],
      ['d', 6],
    ],
  },
  goblin: {
    n: 'Goblin',
    e: '👺',
    hp: 32,
    p: [
      ['a', 7],
      ['a', 9],
      ['b', 2],
    ],
  },
  esq: {
    n: 'Esqueleto',
    e: '💀',
    hp: 38,
    p: [
      ['a', 8],
      ['d', 8],
      ['a', 11],
    ],
  },
  mago: {
    n: 'Mago Sombrio',
    e: '🧙',
    hp: 44,
    p: [
      ['b', 2],
      ['a', 10],
      ['a', 12],
      ['d', 8],
    ],
  },
  rei: {
    n: 'Rei Goblin',
    boss: 1,
    e: '👑',
    hp: 65,
    p: [
      ['a', 9],
      ['b', 2],
      ['a', 13],
      ['d', 10],
    ],
  },
  ogre: {
    n: 'Ogre',
    boss: 1,
    e: '👹',
    hp: 60,
    p: [
      ['a', 12],
      ['d', 10],
      ['a', 16],
    ],
  },
  lobo: {
    n: 'Lobo',
    e: '🐺',
    hp: 30,
    p: [
      ['a', 5],
      ['a', 5],
      ['a', 13],
    ],
  },
  boss: {
    n: 'Dragão Ancião',
    boss: 1,
    e: '🐉',
    hp: 110,
    p: [
      ['a', 12],
      ['b', 3],
      ['a', 18],
      ['d', 14],
      ['a', 22],
    ],
  },
  morcego: {
    n: 'Morcego',
    e: '🦇',
    hp: 28,
    p: [
      ['a', 4],
      ['a', 4],
      ['a', 10],
    ],
  },
  aranha: {
    n: 'Aranha Gigante',
    e: '🕷️',
    hp: 34,
    p: [
      ['a', 6],
      ['b', 1],
      ['a', 9],
      ['d', 6],
    ],
  },
  cogumelo: {
    n: 'Cogumelo Brutamontes',
    e: '🍄',
    hp: 36,
    p: [
      ['d', 8],
      ['a', 9],
      ['d', 6],
      ['a', 12],
    ],
  },
  cobra: {
    n: 'Serpente',
    e: '🐍',
    hp: 31,
    p: [
      ['a', 5],
      ['a', 7],
      ['b', 2],
      ['a', 12],
    ],
  },
  golem: {
    n: 'Golem de Pedra',
    e: '🗿',
    hp: 52,
    p: [
      ['d', 10],
      ['a', 14],
      ['d', 6],
      ['a', 10],
    ],
  },
  armadura: {
    n: 'Armadura Viva',
    e: '🛡️',
    hp: 48,
    p: [
      ['d', 12],
      ['a', 9],
      ['d', 12],
      ['a', 15],
    ],
  },
  fantasma: {
    n: 'Fantasma',
    e: '👻',
    hp: 40,
    p: [
      ['d', 6],
      ['a', 11],
      ['a', 8],
    ],
  },
  vampiro: {
    n: 'Vampiro',
    e: '🧛',
    hp: 46,
    p: [
      ['a', 8],
      ['b', 2],
      ['a', 12],
      ['d', 8],
    ],
  },
  troll: {
    n: 'Troll das Cavernas',
    e: '🦍',
    boss: 1,
    hp: 70,
    p: [
      ['a', 10],
      ['d', 8],
      ['a', 14],
    ],
  },
  necro: {
    n: 'Necromante',
    e: '🧟',
    boss: 1,
    hp: 72,
    p: [
      ['b', 2],
      ['a', 11],
      ['a', 14],
      ['d', 10],
    ],
  },
  hidra: {
    n: 'Hidra',
    e: '🐲',
    boss: 1,
    hp: 115,
    p: [
      ['a', 13],
      ['b', 3],
      ['a', 16],
      ['d', 14],
      ['a', 24],
    ],
  },
};

// ---- Andares: que inimigos comuns podem sair e que bosses (sai um à sorte) ----
var FL = [
  { c: ['slime', 'lobo', 'goblin', 'morcego', 'aranha'], b: ['rei', 'troll'] },
  { c: ['goblin', 'esq', 'mago', 'cogumelo', 'cobra', 'golem'], b: ['ogre', 'necro'] },
  { c: ['esq', 'mago', 'lobo', 'armadura', 'fantasma', 'vampiro'], b: ['boss', 'hidra'] },
];

// Estado global:
//   G     jogador: hp/max vida, gold moedas, deck/hand/dr(compra)/di(descarte) cartas,
//         en/me energia atual/máxima, hs cartas por turno, str/bs força (atual/base),
//         block escudo, ok/ko respostas certas/erradas, sk sequência de acertos,
//         node combate atual (0..8), pl3 os 3 inimigos do andar, shop/pot loja
//   E     inimigo atual: hp/max, block, str, vuln (turnos vulnerável), poison,
//         p padrão de jogadas, i posição no padrão
//         tar tarots que tens · ts espaços de tarot · tags etiquetas guardadas · tg etiquetas dos
//         2 combates comuns do andar · shop a loja atual · busy a meio do fim de turno
//   scr   ecrã atual     msg   texto do registo de combate     opts  opções de recompensa
//   P     pergunta em curso: { i: carta na mão, q: pergunta, o: ordem das opções,
//                              sel: opção marcada, done: já confirmou, ok: acertou }
//   QQ    fila de perguntas por usar     SEL   testes escolhidos (Set de índices de TESTS)
//   FX    números de dano a mostrar      AC    contexto de áudio
//   PK    tarot à espera de cartas do baralho: { i, k, got, need }     GU  a confirmar "Desistir"
//   TK    contador que cancela o fim de turno em curso (se saíres do jogo)
var G,
  E,
  scr = 'home',
  msg = '',
  opts = [],
  P = null,
  QQ = [],
  SEL = new Set(
    window.TESTS.map(function (t, i) {
      return i;
    }),
  ),
  FX = [],
  AC = null,
  PK = null,
  GU = false,
  TK = 0;

// SOUND = som ligado? Começa desligado; a escolha fica guardada.
var SOUND = (function () {
  try {
    return localStorage.getItem('torre_snd') === '1';
  } catch (e) {
    return false;
  }
})();

// Som curto na frequência f (agudo = certo, grave = errado). Só toca se o som estiver ligado.
function beep(f) {
  if (!SOUND) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    var o = AC.createOscillator(),
      g = AC.createGain();
    o.frequency.value = f;
    g.gain.value = 0.05;
    o.connect(g);
    g.connect(AC.destination);
    o.start();
    o.stop(AC.currentTime + 0.14);
  } catch (e) {}
}

// Liga/desliga o som (a escolha fica guardada) e atualiza o botão sem redesenhar o jogo.
function toggleSound() {
  SOUND = !SOUND;
  try {
    localStorage.setItem('torre_snd', SOUND ? '1' : '0');
  } catch (e) {}
  if (SOUND) beep(520);
  Array.prototype.forEach.call(document.querySelectorAll('[data-snd]'), function (b) {
    b.textContent = SOUND ? 'Som ligado' : 'Som desligado';
    b.setAttribute('aria-pressed', SOUND);
  });
}

// Abre o manual numa janela por cima do jogo (não perdes o sítio onde estás).
function openManual() {
  if (window.VerManual) window.VerManual.abrir('');
}

// Mostra os números flutuantes de dano (lista FX) e faz o alvo tremer.
function doFx() {
  FX.forEach(function (f) {
    var t = document.getElementById(f[0] == 'e' ? 'en' : 'pl');
    if (!t) return;
    var s = document.createElement('span');
    s.className = 'fl ' + f[0];
    s.textContent = f[1];
    t.appendChild(s);
    t.classList.remove('shk');
    void t.offsetWidth;
    t.classList.add('shk');
  });
  FX = [];
}

// ---- Relíquias (p = preço na loja; vendem-se por metade). Só podes ter MAXR ao mesmo tempo. ----
var MAXR = 5;
var RL = {
  vida: { n: '💖 Coração de Pedra', d: '+15 vida máxima e cura 15.', p: 35 },
  en: { n: '💎 Cristal de Energia', d: '+1 energia máxima.', p: 45 },
  mao: { n: '🎒 Bolsa Extra', d: 'Compras +1 carta por turno.', p: 40 },
  forca: { n: '🥊 Luva de Ferro', d: '+2 de força permanente.', p: 35 },
  escudo: { n: '🪵 Escudo de Madeira', d: 'Começas cada turno com 3 de escudo.', p: 28 },
  armadura: { n: '🛡️ Armadura Antiga', d: 'Começas cada combate com 8 de escudo.', p: 25 },
  sangue: { n: '🩸 Frasco de Sangue', d: 'Recuperas 4 de vida no início de cada combate.', p: 25 },
  penas: { n: '🪶 Pena Dourada', d: '+2 🪙 por cada resposta certa.', p: 30 },
  sorte: { n: '🍀 Trevo', d: '+8 🪙 depois de cada combate.', p: 28 },
  livro: { n: '📕 Livro Antigo', d: 'O primeiro erro de cada combate é perdoado: a carta funciona.', p: 40 },
  lupa: { n: '🔍 Lupa', d: 'Elimina uma opção errada em cada pergunta (com 3 ou mais opções).', p: 42 },
  punhal: { n: '🗡️ Punhal', d: 'O primeiro ataque de cada turno causa +4 de dano.', p: 30 },
  presa: { n: '🕷️ Presa Venenosa', d: 'O veneno que aplicas é +3.', p: 28 },
  ampulheta: { n: '⏳ Ampulheta', d: 'A sequência dá +1 energia a cada 2 respostas certas (em vez de 3).', p: 38 },
  bola: { n: '🔮 Bola de Cristal', d: '+1 espaço para tarots.', p: 26 },
  cartao: { n: '🏷️ Cartão de Cliente', d: 'Tudo 20% mais barato nas lojas.', p: 30 },
  juros: { n: '🏦 Cofre', d: 'No fim de cada combate ganhas +1 🪙 por cada 5 🪙 que tens (máx. +5).', p: 34 },
  espinhos: { n: '🌵 Cacto', d: 'Quando um inimigo te ataca, leva 3 de dano.', p: 30 },
  cafe: { n: '☕ Café', d: 'Compras +2 cartas no primeiro turno de cada combate.', p: 28 },
  tinta: { n: '🖋️ Tinteiro', d: 'Cada resposta certa dá 2 de escudo.', p: 32 },
  vampiro: { n: '🧛 Dente de Vampiro', d: 'Cada ataque que jogas cura 2 de vida.', p: 34 },
  tomo: { n: '📚 Tomo do Saber', d: 'Cada resposta certa causa 1 de dano ao inimigo.', p: 36 },
  amuleto: { n: '🧿 Amuleto', d: 'Recebes 25% menos dano dos ataques.', p: 40 },
  cartola: { n: '🎩 Cartola', d: 'Cada carta de custo 0 que jogas dá 3 de escudo.', p: 26 },
  bandeira: { n: '🚩 Estandarte', d: 'Começas cada combate com +2 de força.', p: 36 },
  bussola: { n: '🧭 Bússola', d: '+1 opção em todos os packs.', p: 30 },
  banquete: { n: '🍖 Banquete', d: 'Recuperas +6 de vida depois de cada combate.', p: 32 },
  dado: { n: '🎲 Dados Viciados', d: 'Atualizar a loja custa menos 2 🪙.', p: 24 },
};

// Valor de venda de uma relíquia: metade do preço.
function sellP(k) {
  return Math.max(1, Math.floor(RL[k].p / 2));
}

// ---- Etiquetas (como no Balatro): ganhas uma ao ignorar um combate ----
// As que dizem "agora" têm efeito logo; as outras ficam guardadas até serem precisas.
var TAGS = {
  invest: { i: '📈', n: 'Investimento', d: 'Ganhas 🪙 30 quando derrotares o boss.' },
  desc: { i: '🏷️', n: 'Cupão', d: 'Tudo 50% mais barato na próxima loja.' },
  gratis: { i: '🎁', n: 'Oferta', d: 'Na próxima loja, o primeiro item que comprares é grátis.' },
  reroll: { i: '🎲', n: 'Dados', d: '2 atualizações grátis na próxima loja.' },
  tarot: { i: '🔮', n: 'Tarot', d: 'Recebes 1 tarot agora.' },
  vida: { i: '🧪', n: 'Poção', d: 'Recuperas 15 de vida agora.' },
  bolsa: { i: '💰', n: 'Bolsa', d: 'Ganhas 🪙 18 agora.' },
  economia: { i: '💵', n: 'Economia', d: 'Dobras as tuas moedas agora (máx. +🪙 30).' },
  melhoria: { i: '⬆️', n: 'Melhoria', d: 'Melhora 1 carta aleatória do baralho agora.' },
  carta: { i: '🃏', n: 'Carta Extra', d: 'Recebes 1 carta incomum ou rara aleatória agora.' },
  treino: { i: '🏋️', n: 'Treino', d: '+1 de força permanente.' },
  arcano: { i: '✨', n: 'Etiqueta Arcana', d: 'Abres já 1 Pack Arcano Mega grátis.' },
  padrao: { i: '🎴', n: 'Etiqueta Padrão', d: 'Abres já 1 Pack Padrão Mega grátis.' },
  bobo: { i: '🎪', n: 'Etiqueta do Bobo', d: 'Abres já 1 Pack do Bobo Jumbo grátis (relíquias).' },
};

// ---- Tarots (como no Balatro): mexem nas cartas do baralho. Usam-se fora dos combates. ----
//   need = nº de cartas que escolhes · ok(id) = cartas que podes escolher · can() = pode usar agora?
//   lim() = máximo de cartas que podes escolher agora · f(escolhidas) = o efeito
var canUp = function (id) {
  return !CARDS[id].up && !!CARDS[id + '+'];
};
var minDeck = function () {
  return Math.max(0, G.deck.length - 6);
};
var TR = {
  mago: {
    n: '🃏 O Mágico',
    d: 'Duplica 1 carta do baralho à tua escolha.',
    p: 14,
    need: 1,
    f: function (a) {
      G.deck.push(a[0]);
      msg = 'Duplicaste ' + CARDS[a[0]].n + '.';
    },
  },
  morte: {
    n: '💀 A Morte',
    d: 'Elimina 1 carta do baralho à tua escolha (o baralho fica com pelo menos 6).',
    p: 12,
    need: 1,
    lim: minDeck,
    f: function (a) {
      a.forEach(rm);
      msg = 'Eliminaste ' + CARDS[a[0]].n + '.';
    },
  },
  enforcado: {
    n: '🪢 O Enforcado',
    d: 'Elimina até 2 cartas do baralho (o baralho fica com pelo menos 6).',
    p: 18,
    need: 2,
    lim: minDeck,
    f: function (a) {
      a.forEach(rm);
      msg =
        'Eliminaste ' +
        a
          .map(function (id) {
            return CARDS[id].n;
          })
          .join(' e ') +
        '.';
    },
  },
  estrela: {
    n: '⭐ A Estrela',
    d: 'Melhora 1 carta do baralho (passa à versão +).',
    p: 16,
    need: 1,
    ok: canUp,
    f: function (a) {
      a.forEach(upg);
      msg = CARDS[a[0]].n + ' foi melhorada.';
    },
  },
  sol: {
    n: '🌞 O Sol',
    d: 'Melhora até 2 cartas do baralho.',
    p: 22,
    need: 2,
    ok: canUp,
    f: function (a) {
      a.forEach(upg);
      msg = 'Melhoraste ' + a.length + ' carta' + (a.length > 1 ? 's' : '') + '.';
    },
  },
  lua: {
    n: '🌙 A Lua',
    d: 'Transforma 1 carta do baralho noutra carta aleatória do mesmo tipo.',
    p: 14,
    need: 1,
    f: function (a) {
      var id = a[0],
        t = CARDS[id].t,
        b = id.replace(/\+$/, ''),
        c = POOL.filter(function (x) {
          return BASE[x].t == t && x != b;
        }),
        n = c.length ? c[Math.floor(Math.random() * c.length)] : id;
      G.deck[G.deck.indexOf(id)] = n;
      msg = CARDS[id].n + ' transformou-se em ' + CARDS[n].n + '.';
    },
  },
  roda: {
    n: '🎡 Roda da Fortuna',
    d: '1 em 4: melhora 3 cartas aleatórias do baralho. Senão, nada acontece.',
    p: 12,
    need: 0,
    can: function () {
      return G.deck.some(canUp);
    },
    f: function () {
      if (Math.random() >= 0.25) {
        msg = '🎡 Nada!';
        return;
      }
      var n = 0;
      for (var k = 0; k < 3; k++) {
        var c = G.deck.filter(canUp);
        if (!c.length) break;
        upg(c[Math.floor(Math.random() * c.length)]);
        n++;
      }
      msg = '🎡 A sorte sorriu: melhoraste ' + n + ' carta' + (n > 1 ? 's' : '') + '!';
    },
  },
  imp: {
    n: '👑 O Imperador',
    d: 'Cria até 2 tarots aleatórios (precisa de espaço).',
    p: 18,
    need: 0,
    f: function () {
      var n = 0;
      while (n < 2 && G.tar.length < G.ts) {
        G.tar.push(randTarot());
        n++;
      }
      msg = n ? 'Recebeste ' + n + ' tarot' + (n > 1 ? 's' : '') + '.' : 'Sem espaço para mais tarots.';
    },
  },
  eremita: {
    n: '🧙 O Eremita',
    d: 'Dobra as tuas moedas (máximo +🪙 40).',
    p: 12,
    need: 0,
    f: function () {
      var g = Math.min(G.gold, 40);
      G.gold += g;
      msg = 'Ganhaste 🪙 ' + g + '.';
    },
  },
  justica: {
    n: '⚖️ A Justiça',
    d: 'Cria uma cópia melhorada (+) de 1 carta do baralho.',
    p: 20,
    need: 1,
    ok: canUp,
    f: function (a) {
      G.deck.push(a[0] + '+');
      msg = 'Ganhaste ' + CARDS[a[0] + '+'].n + '.';
    },
  },
  temperanca: {
    n: '🍷 A Temperança',
    d: 'Ganhas 🪙 igual ao valor de venda das tuas relíquias (máx. 50).',
    p: 12,
    need: 0,
    f: function () {
      var g = 0;
      G.rels.forEach(function (k) {
        g += sellP(k);
      });
      g = Math.min(50, g);
      G.gold += g;
      msg = 'Ganhaste 🪙 ' + g + '.';
    },
  },
  torre: {
    n: '🗼 A Torre',
    d: 'Transforma 1 carta do baralho numa carta rara aleatória.',
    p: 18,
    need: 1,
    f: function (a) {
      var c = POOL.filter(function (x) {
          return BASE[x].r == 3;
        }),
        n = c[Math.floor(Math.random() * c.length)];
      G.deck[G.deck.indexOf(a[0])] = n;
      msg = CARDS[a[0]].n + ' transformou-se em ' + CARDS[n].n + '.';
    },
  },
  diabo: {
    n: '😈 O Diabo',
    d: 'Melhora 2 cartas aleatórias, mas perdes 8 de vida (ficas com pelo menos 1).',
    p: 16,
    need: 0,
    can: function () {
      return G.deck.some(canUp);
    },
    f: function () {
      G.hp = Math.max(1, G.hp - 8);
      var n = 0;
      for (var k = 0; k < 2; k++) {
        var c = G.deck.filter(canUp);
        if (!c.length) break;
        upg(c[Math.floor(Math.random() * c.length)]);
        n++;
      }
      msg = '😈 Melhoraste ' + n + ' carta' + (n > 1 ? 's' : '') + ' e perdeste 8 de vida.';
    },
  },
  hierofante: {
    n: '🕍 O Hierofante',
    d: 'Duplica até 2 cartas do baralho à tua escolha.',
    p: 22,
    need: 2,
    f: function (a) {
      a.forEach(function (id) {
        G.deck.push(id);
      });
      msg = 'Duplicaste ' + a.length + ' carta' + (a.length > 1 ? 's' : '') + '.';
    },
  },
  amantes: {
    n: '💞 Os Enamorados',
    d: 'Recuperas 20 de vida.',
    p: 10,
    need: 0,
    f: function () {
      G.hp = Math.min(G.max, G.hp + 20);
      msg = 'Recuperaste vida.';
    },
  },
  julgamento: {
    n: '🔔 O Julgamento',
    d: 'Cria 1 relíquia aleatória (precisa de espaço).',
    p: 24,
    need: 0,
    can: function () {
      return G.rels.length < MAXR;
    },
    f: function () {
      var c = Object.keys(RL).filter(function (k) {
          return !hasRel(k);
        }),
        k = c[Math.floor(Math.random() * c.length)];
      giveRelic(k);
      msg = 'Recebeste ' + RL[k].n + '.';
    },
  },
  mundo: {
    n: '🌍 O Mundo',
    d: '+10 de vida máxima e cura 10.',
    p: 18,
    need: 0,
    f: function () {
      G.max += 10;
      G.hp = Math.min(G.max, G.hp + 10);
      msg = '+10 de vida máxima.';
    },
  },
};

// Tarot aleatório.
function randTarot() {
  var k = Object.keys(TR);
  return k[Math.floor(Math.random() * k.length)];
}

// Tira uma cópia da carta id do baralho.
function rm(id) {
  var i = G.deck.indexOf(id);
  if (i >= 0) G.deck.splice(i, 1);
}

// Melhora uma cópia da carta id (passa a "id+").
function upg(id) {
  var i = G.deck.indexOf(id);
  if (i >= 0 && canUp(id)) G.deck[i] = id + '+';
}

// Preço de uma carta (base): as mais caras de energia e as mais raras custam mais (+12 se já vem melhorada).
function pr(id) {
  return 8 + CARDS[id].c * 8 + (CARDS[id].r - 1) * 8 + (CARDS[id].up ? 12 : 0);
}

// Preço final na loja: etiqueta "Cupão" (-50%), "Cartão de Cliente" (-20%) ou "Oferta" (grátis).
function price(b) {
  if (G.shop.free) return 0;
  return Math.round(b * (G.shop.disc ? 0.5 : 1) * (hasRel('cartao') ? 0.8 : 1));
}

// Paga um item da loja (devolve false se não chegar o dinheiro).
function pay(b) {
  var p = price(b);
  if (G.gold < p) return false;
  G.gold -= p;
  G.shop.free = false;
  return true;
}

// Comprar uma carta ou uma relíquia na loja (os tarots vêm nos packs).
function buyCard(id) {
  if (!pay(pr(id))) return;
  G.deck.push(id);
  G.shop.cards.splice(G.shop.cards.indexOf(id), 1);
  msg = 'Compraste ' + CARDS[id].n + '.';
  render();
}
function buyRel(k) {
  if (G.rels.length >= MAXR) {
    msg = 'Já tens ' + MAXR + ' relíquias: vende uma para teres espaço.';
    return render();
  }
  if (!pay(RL[k].p)) return;
  giveRelic(k);
  removeTop('rel', k);
  msg = 'Compraste ' + RL[k].n + '.';
  render();
}

// Comprar a poção de vida na loja (25 moedas, só uma por visita).
function buyPot() {
  if (!G.shop.pot || !pay(25)) return;
  G.shop.pot = false;
  G.hp = Math.min(G.max, G.hp + 20);
  msg = 'Bebeste a poção: +20 de vida.';
  render();
}

// Atualizar a loja: troca as cartas e as relíquias à venda (começa em 5 moedas e sobe 1 de cada vez).
function rrCost() {
  return G.shop.fr > 0 ? 0 : (hasRel('dado') ? 3 : 5) + G.shop.rr;
}
function reroll() {
  var c = rrCost();
  if (G.gold < c) return;
  G.gold -= c;
  if (G.shop.fr > 0) G.shop.fr--;
  else G.shop.rr++;
  stock();
  msg = 'A loja foi atualizada.';
  render();
}

// Sorteia n cartas da loja (cada uma tem 12% de vir já melhorada).
function rollCards(n) {
  return rolls(n).map(function (id) {
    return canUp(id) && Math.random() < 0.12 ? id + '+' : id;
  });
}

// Põe à venda 2 cartas (zona do cupão) e 2 itens em cima (como as casas dos jokers do Balatro):
// cada um é à sorte uma relíquia (que ainda não tenhas), um tarot ou uma carta.
function stock() {
  var r = sh(
      Object.keys(RL).filter(function (k) {
        return !hasRel(k);
      }),
    ),
    top = [];
  G.shop.cards = rollCards(2);
  for (var n = 0; n < 2; n++) {
    var x = Math.random();
    if (x < 0.6 && r.length) top.push({ t: 'rel', id: r.pop() });
    else if (x < 0.8) top.push({ t: 'tar', id: randTarot() });
    else top.push({ t: 'card', id: rollCards(1)[0] });
  }
  G.shop.top = top;
}

// Tira um item da fila de cima da loja.
function removeTop(t, id) {
  G.shop.top = G.shop.top.filter(function (x) {
    return !(x.t == t && x.id == id);
  });
}

// Comprar o item i da fila de cima: relíquia, tarot (vai para a tua lista) ou carta (vai para o baralho).
function buyTop(i) {
  var x = G.shop.top[i];
  if (!x) return;
  if (x.t == 'rel') return buyRel(x.id);
  if (x.t == 'tar') {
    if (G.tar.length >= G.ts) {
      msg = 'Não tens espaço para mais tarots: usa um primeiro.';
      return render();
    }
    if (!pay(TR[x.id].p)) return;
    G.tar.push(x.id);
    removeTop('tar', x.id);
    msg = 'Compraste ' + TR[x.id].n + '.';
    return render();
  }
  if (!pay(pr(x.id))) return;
  G.deck.push(x.id);
  removeTop('card', x.id);
  msg = 'Compraste ' + CARDS[x.id].n + '.';
  render();
}

// ---- Packs (como no Balatro): compras o pack, abre-se e escolhes 1 (ou 2, nos mega) dos itens. ----
//   t: arcano (tarots, usados logo) · padrao (cartas para o baralho) · bobo (relíquias)
//   ch = nº de opções [normal, jumbo, mega] · p = preço [normal, jumbo, mega]
var PKS = {
  arcano: { n: 'Pack Arcano', i: '🔮', d: 'Tarots: o que escolheres é usado logo.', ch: [3, 5, 5], p: [10, 16, 20] },
  padrao: { n: 'Pack Padrão', i: '🎴', d: 'Cartas novas para o teu baralho.', ch: [3, 5, 5], p: [8, 14, 18] },
  bobo: { n: 'Pack do Bobo', i: '🎪', d: 'Relíquias (só cabem se tiveres espaço).', ch: [2, 4, 4], p: [14, 22, 28] },
};
var PSN = ['Normal', 'Jumbo', 'Mega'];
var PPK = [1, 1, 2];

// Sorteia os 2 packs da loja: um é sempre Arcano (os tarots vêm de packs); o outro é à sorte.
function stockPacks() {
  var sz = function () {
      var x = Math.random();
      return x < 0.6 ? 0 : x < 0.85 ? 1 : 2;
    },
    o = Math.random();
  G.shop.packs = [
    { t: 'arcano', s: sz() },
    { t: o < 0.4 ? 'padrao' : o < 0.7 ? 'bobo' : 'arcano', s: sz() },
  ];
}

// Comprar um pack da loja: abre logo.
function buyPack(i) {
  var pk = G.shop.packs[i];
  if (!pk || !pay(PKS[pk.t].p[pk.s])) return;
  G.shop.packs.splice(i, 1);
  openPack(pk.t, pk.s, 'shop', 'Compraste um ' + PKS[pk.t].n + ' ' + PSN[pk.s] + '.');
}

// Abre um pack: sorteia as opções. ret = para onde voltar quando acabar ('shop' ou 'blinds').
function openPack(t, s, ret, note) {
  var n = PKS[t].ch[s] + (hasRel('bussola') ? 1 : 0),
    ch;
  if (t == 'arcano') ch = sh(Object.keys(TR)).slice(0, n);
  else if (t == 'padrao') ch = rollCards(n);
  else
    ch = sh(
      Object.keys(RL).filter(function (k) {
        return !hasRel(k);
      }),
    ).slice(0, n);
  PG = { t: t, s: s, ch: ch, left: PPK[s], ret: ret };
  scr = 'pack';
  msg = note || '';
  render();
}

// Escolheu a opção i do pack.
function pickPack(i) {
  if (!PG || PK) return;
  var id = PG.ch[i];
  if (PG.t == 'padrao') {
    G.deck.push(id);
    msg = 'Adicionaste ' + CARDS[id].n + ' ao baralho.';
    return gotPick(i);
  }
  if (PG.t == 'bobo') {
    if (G.rels.length >= MAXR) {
      msg = 'Já tens ' + MAXR + ' relíquias: vende uma para teres espaço.';
      return render();
    }
    giveRelic(id);
    msg = 'Ficaste com ' + RL[id].n + '.';
    return gotPick(i);
  }
  // Pack Arcano: o tarot é usado logo (se precisar de cartas, aparecem cartas do baralho para escolheres).
  tarUse(
    id,
    function () {
      PG.ch.splice(i, 1);
      PG.left--;
    },
    function () {
      if (PG.left <= 0 || !PG.ch.length) closePack();
      else render();
    },
  );
}
function gotPick(i) {
  PG.ch.splice(i, 1);
  PG.left--;
  if (PG.left <= 0 || !PG.ch.length) return closePack();
  render();
}

// Fecha o pack (o que sobrar perde-se) e volta à loja ou ao mapa.
function closePack() {
  var r = PG.ret;
  PG = null;
  scr = r;
  render();
}
function skipPack() {
  if (!PG || PK) return;
  msg = 'Saltaste o resto do pack.';
  closePack();
}

// Sorteia os 3 inimigos do andar atual: 2 comuns à sorte + um boss à sorte. Cada combate comum tem
// também a etiqueta que ganhas se o ignorares (visível antes de escolheres).
function plan() {
  var L = FL[Math.floor(G.node / 3)],
    c = sh(L.c.slice());
  G.pl3 = [c[0], c[1], L.b[Math.floor(Math.random() * L.b.length)]];
  G.tg = sh(Object.keys(TAGS)).slice(0, 2);
}

// Vai para o ecrã de escolha do próximo combate.
function blinds() {
  scr = 'blinds';
  msg = '';
  render();
}

// Sair da loja: avança para o próximo combate (e prepara novo andar se for o caso).
function leave() {
  G.node++;
  if (G.node % 3 == 0) plan();
  blinds();
}

// Ignorar um combate (o boss não pode ser ignorado): sem combate, sem recompensa e sem loja,
// mas ganhas a etiqueta desse combate.
function skip() {
  if (scr != 'blinds' || G.node % 3 == 2) return;
  var k = G.tg[G.node % 3],
    t = TAGS[k],
    extra = '',
    note;
  G.skp[G.node] = true;
  if (k == 'tarot') {
    if (G.tar.length < G.ts) G.tar.push(randTarot());
    else {
      G.gold += 10;
      extra = ' (sem espaço para o tarot: ganhas 🪙 10)';
    }
  } else if (k == 'vida') G.hp = Math.min(G.max, G.hp + 15);
  else if (k == 'bolsa') G.gold += 18;
  else if (k == 'economia') {
    var gg = Math.min(G.gold, 30);
    G.gold += gg;
    extra = ' (+🪙 ' + gg + ')';
  } else if (k == 'melhoria') {
    var up = G.deck.filter(canUp);
    if (up.length) {
      var uid = up[Math.floor(Math.random() * up.length)];
      upg(uid);
      extra = ' (' + CARDS[uid].n + ' melhorada)';
    } else {
      G.gold += 10;
      extra = ' (nada para melhorar: ganhas 🪙 10)';
    }
  } else if (k == 'carta') {
    var pl = POOL.filter(function (x) {
        return BASE[x].r >= 2;
      }),
      cid = pl[Math.floor(Math.random() * pl.length)];
    G.deck.push(cid);
    extra = ' (ganhaste ' + CARDS[cid].n + ')';
  } else if (k == 'treino') G.bs++;
  else if (!PKS[k]) G.tags.push(k);
  G.node++;
  note = 'Ignoraste o combate e ganhaste a etiqueta ' + t.i + ' ' + t.n + '.' + extra;
  // As etiquetas dos packs abrem logo um pack grátis (depois voltas à escolha do combate).
  if (PKS[k]) return openPack(k, k == 'bobo' ? 1 : 2, 'blinds', note);
  scr = 'blinds';
  msg = note;
  render();
}

// Aplica a relíquia escolhida depois de um boss e segue para a loja.
function relic(k) {
  if (G.rels.length >= MAXR) {
    msg = 'Já tens ' + MAXR + ' relíquias: vende uma para escolheres esta.';
    return render();
  }
  giveRelic(k);
  shop();
}

// Dá a relíquia ao jogador (os efeitos permanentes aplicam-se logo; os outros são lidos com hasRel).
function giveRelic(k) {
  G.rels.push(k);
  if (k == 'vida') {
    G.max += 15;
    G.hp = Math.min(G.max, G.hp + 15);
  }
  if (k == 'en') G.me++;
  if (k == 'mao') G.hs++;
  if (k == 'forca') G.bs += 2;
  if (k == 'bola') G.ts++;
}

// Tira os efeitos permanentes de uma relíquia vendida.
function loseRelic(k) {
  if (k == 'vida') {
    G.max -= 15;
    G.hp = Math.max(1, Math.min(G.hp, G.max));
  }
  if (k == 'en') G.me = Math.max(1, G.me - 1);
  if (k == 'mao') G.hs = Math.max(1, G.hs - 1);
  if (k == 'forca') G.bs -= 2;
  if (k == 'bola') G.ts--;
}

// Vender a relíquia i (fora dos combates): ganhas metade do preço e libertas espaço.
function sellRel(i) {
  if (P || PK || G.busy) return;
  var k = G.rels[i];
  if (!k) return;
  if (k == 'bola' && G.tar.length >= G.ts) {
    msg = 'Usa um tarot antes de vender a Bola de Cristal (ficarias sem espaço para ele).';
    return render();
  }
  G.rels.splice(i, 1);
  loseRelic(k);
  if (scr == 'battle') {
    // Dentro do combate, ajusta já o que a relíquia dava neste combate.
    if (k == 'forca' || k == 'bandeira') G.str -= 2;
    if (k == 'en') G.en = Math.min(G.en, G.me);
  }
  G.gold += sellP(k);
  msg = 'Vendeste ' + RL[k].n + ' por 🪙 ' + sellP(k) + '.';
  render();
}

// Valor de venda de um tarot: metade do preço.
function sellPT(k) {
  return Math.max(1, Math.floor(TR[k].p / 2));
}

// Vender o tarot i (também durante o combate): ganhas metade do preço e libertas a ranhura.
function sellTar(i) {
  if (P || PK || G.busy || V) return;
  var k = G.tar[i];
  if (!k) return;
  G.tar.splice(i, 1);
  G.gold += sellPT(k);
  msg = 'Vendeste ' + TR[k].n + ' por 🪙 ' + sellPT(k) + '.';
  render();
}

// Só a pergunta em si (como no Milionário): tira o "Ficha 2 (Parte II) — " do início e o embrulho "Verdadeiro ou falso? «…»".
function qtxt(t) {
  return String(t)
    .replace(/^Ficha \d+(?: \([^)]*\))? — /, '')
    .replace(/^Verdadeiro ou falso\?\s*«([\s\S]*?)»\.?\s*$/, '$1');
}

// Escapa < > & para o texto das perguntas não ser tratado como HTML.
function esc(t) {
  return String(t).replace(/[&<>]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c];
  });
}

// Próxima pergunta dos testes escolhidos (baralha de novo quando a fila acaba).
function nextQ() {
  if (!QQ.length)
    QQ = sh(
      QS.filter(function (q) {
        return Temas.tem(SEL, q);
      }),
    );
  return QQ.pop();
}

// Baralha uma lista (algoritmo Fisher-Yates) e devolve-a.
function sh(a) {
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)),
      t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
  return a;
}

// Compra n cartas; se a pilha de compra acabar, baralha o descarte e continua.
function draw(n) {
  for (var i = 0; i < n; i++) {
    if (!G.dr.length) {
      G.dr = sh(G.di);
      G.di = [];
    }
    if (!G.dr.length) return;
    G.hand.push(G.dr.pop());
  }
}

// Começa um jogo novo com os testes escolhidos no menu. Cria o jogador com o baralho inicial.
function start() {
  V = null;
  PK = null;
  PG = null;
  GU = false;
  TK++;
  SEL = Temas.ler(document.getElementById('app'));
  QQ = [];
  P = null;
  G = {
    rels: [],
    skp: {},
    tar: [],
    ts: 2,
    tags: [],
    tg: [],
    gold: 0,
    ok: 0,
    ko: 0,
    sk: 0,
    me: 3,
    hs: 5,
    bs: 0,
    hp: 70,
    max: 70,
    str: 0,
    block: 0,
    en: 3,
    node: 0,
    pb: 0,
    fa: false,
    lv: false,
    busy: false,
    cok: 0,
    cko: 0,
    hist: [],
    end: null,
    win: '',
    deck: [
      'golpe',
      'golpe',
      'golpe',
      'golpe',
      'defender',
      'defender',
      'defender',
      'defender',
      'vuln',
      'inspirar',
    ],
    dr: [],
    di: [],
    hand: [],
  };
  plan();
  blinds();
}

// Entra num combate: cria o inimigo (a vida dos comuns cresce 30% por andar; a dos bosses não),
// baralha o baralho e compra a mão. Aplica as relíquias de início de combate.
function enter() {
  var F = Math.floor(G.node / 3),
    k = G.pl3[G.node % 3],
    f = FOES[k],
    hp = Math.round(f.hp * (f.boss ? 1 : 1 + 0.3 * F));
  E = { n: f.n, e: f.e, hp: hp, max: hp, p: f.p, i: 0, block: 0, str: F, vuln: 0, weak: 0, poison: 0 };
  G.dr = sh(G.deck.slice());
  G.di = [];
  G.hand = [];
  G.str = G.bs + (hasRel('bandeira') ? 2 : 0);
  G.lv = false;
  G.cok = 0;
  G.cko = 0;
  scr = 'battle';
  turn();
  if (hasRel('cafe')) draw(2);
  if (hasRel('armadura')) G.block += 8;
  if (hasRel('sangue')) G.hp = Math.min(G.max, G.hp + 4);
  msg = '';
  render();
}

// Abre a loja (como a do Balatro): 2 relíquias, 2 cartas (e a poção) e 2 packs. As etiquetas guardadas
// (Cupão, Oferta, Dados) aplicam-se agora e gastam-se.
function shop() {
  var s = (G.shop = {
      cards: [],
      top: [],
      packs: [],
      pot: true,
      rr: 0,
      fr: 0,
      disc: false,
      free: false,
    }),
    keep = [],
    used = [];
  stock();
  stockPacks();
  G.tags.forEach(function (k) {
    if (k == 'desc') s.disc = true;
    else if (k == 'gratis') s.free = true;
    else if (k == 'reroll') s.fr = 2;
    else return keep.push(k);
    used.push(TAGS[k].i + ' ' + TAGS[k].n);
  });
  G.tags = keep;
  scr = 'shop';
  msg = (G.win || '') + (used.length ? (G.win ? ' · ' : '') + 'Etiquetas usadas: ' + used.join(', ') + '.' : '');
  G.win = '';
  render();
}

// Início de turno do jogador: perde o escudo (ou fica com o da relíquia), repõe a energia e compra cartas até
// teres a mão cheia. As cartas que não jogaste no turno anterior ficam na mão.
function turn() {
  G.block = hasRel('escudo') ? 3 : 0;
  G.en = G.me;
  G.fa = false;
  G.pb = 0;
  G.busy = false;
  draw(Math.max(0, G.hs - G.hand.length));
}

// Clicou na carta i: em vez de a jogar logo, mostra uma pergunta (P).
function play(i) {
  var id = G.hand[i],
    c = CARDS[id];
  if (G.en < c.c || scr != 'battle' || P || G.busy) return;
  var q = nextQ(),
    o = q.o.map(function (t, k) {
      return k;
    });
  sh(o);
  // Lupa: tira uma opção errada (só se houver 3 ou mais opções).
  if (hasRel('lupa') && o.length >= 3 && q.a >= 0) {
    var w = o.filter(function (k) {
      return k != q.a;
    });
    o.splice(o.indexOf(w[Math.floor(Math.random() * w.length)]), 1);
  }
  P = { i: i, q: q, o: o, done: false, ok: false, pick: -1 };
  render();
}

// Marca a opção k (ainda não confirmada).
function answer(k) {
  if (P.done) return;
  P.sel = k;
  render();
}

// Confirma a resposta: regista certo/errado (também no histórico do fim) e mostra a explicação.
function confirmA() {
  if (P.done || P.sel == null) return;
  var k = P.sel;
  P.done = true;
  P.pick = k;
  if (P.q.a < 0) {
    // Pergunta anulada: a carta funciona e nada conta (nem certas, nem erradas, nem a série).
    P.ok = true;
    P.nul = true;
    G.hist.push({ q: P.q, ch: P.o[k], ok: false, nul: true, n: G.node });
    beep(440);
    render();
    return;
  }
  P.ok = P.o[k] == P.q.a;
  G.hist.push({ q: P.q, ch: P.o[k], ok: P.ok, nul: false, n: G.node });
  if (P.ok) {
    G.ok++;
    G.cok++;
    G.sk++;
    if (hasRel('penas')) G.gold += 2;
    if (hasRel('tinta')) G.block += 2;
    if (hasRel('tomo')) {
      E.hp -= 1;
      FX.push(['e', '-1']);
    }
  } else {
    G.ko++;
    G.cko++;
    G.sk = 0;
    // Livro Antigo: o primeiro erro de cada combate é perdoado.
    if (hasRel('livro') && !G.lv) {
      G.lv = true;
      P.forgive = true;
    }
  }
  beep(P.ok ? 660 : 170);
  render();
}

// Depois da explicação: se acertou (ou foi perdoado), a carta faz o efeito; gasta a energia.
// A carta vai para o descarte (as exauridas ficam de fora até ao próximo combate).
function resolve() {
  var i = P.i,
    id = G.hand[i],
    c = CARDS[id],
    ok = P.ok || P.forgive,
    nul = P.nul,
    fg = P.forgive;
  P = null;
  G.en -= c.c;
  G.hand.splice(i, 1);
  if (!(ok && c.a.exh)) G.di.push(id);
  if (ok) {
    msg = nul ? 'Pergunta anulada: a carta funcionou.' : fg ? 'Livro Antigo: erro perdoado, a carta funcionou.' : 'Resposta certa!';
    // Punhal: o primeiro ataque de cada turno causa +4 de dano (só no primeiro golpe).
    G.pb = c.t == 'a' && hasRel('punhal') && !G.fa ? 4 : 0;
    if (c.t == 'a') G.fa = true;
    c.f();
    G.pb = 0;
    if (c.t == 'a' && hasRel('vampiro')) G.hp = Math.min(G.max, G.hp + 2);
    if (c.c == 0 && hasRel('cartola')) G.block += 3;
    if (!nul && !fg && G.sk > 0 && G.sk % (hasRel('ampulheta') ? 2 : 3) == 0) {
      G.en++;
      msg += ' 🔥 Sequência! +1 energia';
    }
  } else msg = 'Resposta errada: a carta falhou.';
  if (E.hp <= 0) return win();
  render();
}

// Fim do turno: as cartas que jogaste já foram para o descarte; as que não jogaste ficam na mão
// para o turno seguinte. O inimigo joga e compras só as cartas que faltam para a mão cheia.
function endTurn() {
  if (scr != 'battle' || P || G.busy) return;
  enemyTurn();
}

// Dano de uma jogada do inimigo (um inimigo fraco bate -25%; o Amuleto tira mais 25%).
function edmg(m) {
  return Math.floor((m[1] + E.str) * (E.weak > 0 ? 0.75 : 1) * (hasRel('amuleto') ? 0.75 : 1));
}

// Turno do inimigo: o veneno atua e ele faz a jogada seguinte do seu padrão. Depois compras a mão nova.
function enemyTurn() {
  E.block = 0;
  var out = '';
  if (E.poison > 0) {
    E.hp -= E.poison;
    out += 'Veneno causa ' + E.poison + '. ';
    E.poison--;
    if (E.hp <= 0) return win();
  }
  var m = E.p[E.i % E.p.length];
  E.i++;
  if (m[0] == 'a') {
    var d = edmg(m),
      a = Math.min(G.block, d);
    G.block -= a;
    G.hp -= d - a;
    FX.push(['p', d - a > 0 ? '-' + (d - a) : '🛡️']);
    out += E.n + ' ataca por ' + d + '.';
    if (hasRel('espinhos')) {
      E.hp -= 3;
      FX.push(['e', '-3']);
      out += ' 🌵 O Cacto devolve 3.';
    }
  } else if (m[0] == 'd') {
    E.block += m[1];
    out += E.n + ' defende.';
  } else {
    E.str += m[1];
    out += E.n + ' fica mais forte.';
  }
  if (E.vuln > 0) E.vuln--;
  if (E.weak > 0) E.weak--;
  if (G.hp <= 0) {
    G.hp = 0;
    msg = out;
    return endGame('dead');
  }
  if (E.hp <= 0) return win();
  turn();
  msg = out;
  render();
}

// Inimigo derrotado: dá moedas e cura um pouco. Depois de um boss escolhes descansar ou uma relíquia;
// nos outros combates vais logo à loja (já não há escolha de 1 entre 3 cartas: as cartas estão na loja).
function win() {
  G.busy = false;
  if (G.node == N - 1) return endGame('win');
  var jur = hasRel('juros') ? Math.min(5, Math.floor(G.gold / 5)) : 0;
  G.gain = 10 + Math.floor(Math.random() * 11) + G.node + (hasRel('sorte') ? 8 : 0);
  G.inv = 0;
  if (G.node % 3 == 2) {
    // Boss: as etiquetas "Investimento" pagam agora.
    var iv = G.tags.filter(function (k) {
      return k == 'invest';
    }).length;
    G.inv = 30 * iv;
    G.tags = G.tags.filter(function (k) {
      return k != 'invest';
    });
  }
  G.gold += G.gain + G.inv + jur;
  G.hp = Math.min(G.max, G.hp + 4 + (hasRel('banquete') ? 6 : 0));
  G.win = 'Vitória! +🪙 ' + G.gain + (G.inv ? ' (+' + G.inv + ' 📈)' : '') + (jur ? ' (+' + jur + ' 🏦)' : '') + '.';
  if (G.node % 3 == 2) {
    opts = sh(
      Object.keys(RL).filter(function (k) {
        return !hasRel(k);
      }),
    ).slice(0, 3);
    scr = 'rest';
    msg = G.win;
    G.win = '';
    render();
  } else shop();
}

// Descansar após o boss: recupera 35% da vida.
function rest() {
  G.hp = Math.min(G.max, G.hp + Math.ceil(G.max * 0.35));
  shop();
}

// ---- Tarots: usar um tarot ----
// Quando o tarot precisa de cartas, aparecem HN cartas do baralho tiradas à sorte (como a mão do Balatro)
// e escolhes entre elas. take() tira o tarot de onde estava (a tua lista ou o pack) e done() redesenha.
var HN = 5;
function tarUse(k, take, done) {
  var t = TR[k];
  if (t.can && !t.can()) {
    msg = 'Não podes usar esse tarot agora.';
    return render();
  }
  if (t.need > 0) {
    // Em combate escolhes entre as cartas da tua mão; fora dele (loja, packs) aparecem HN cartas do baralho à sorte.
    var live = scr == 'battle',
      pool = (live ? G.hand : G.deck).filter(function (id) {
        return !t.ok || t.ok(id);
      }),
      n = t.lim ? Math.min(t.need, t.lim()) : t.need;
    if (n < 1 || !pool.length) {
      msg = live ? 'Não tens cartas na mão para esse tarot.' : 'Não há cartas para esse tarot.';
      return render();
    }
    PK = {
      k: k,
      hand: live ? pool.slice() : sh(pool.slice()).slice(0, HN),
      live: live,
      sel: [],
      need: n,
      take: take,
      done: done,
    };
    V = 'pick';
    return render();
  }
  take();
  applyTar(k);
  done();
}

// Usar o tarot i da tua lista (fora dos combates).
// Aplica o efeito do tarot. Em combate o efeito é imediato: o que mudou no baralho passa também
// para a mão e as pilhas (cartas melhoradas/transformadas no sítio, eliminadas saem, duplicadas vão para a mão).
function applyTar(k, ids) {
  var live = scr == 'battle',
    before = live ? G.deck.slice() : null;
  TR[k].f(ids);
  if (!live) return;
  var cnt = {},
    rem = [],
    add = [];
  before.forEach(function (id) {
    cnt[id] = (cnt[id] || 0) + 1;
  });
  G.deck.forEach(function (id) {
    cnt[id] = (cnt[id] || 0) - 1;
  });
  Object.keys(cnt).forEach(function (id) {
    for (var n = cnt[id]; n > 0; n--) rem.push(id);
    for (var m = cnt[id]; m < 0; m++) add.push(id);
  });
  rem.forEach(function (r) {
    var x = add.indexOf(r + '+');
    if (x < 0 && add.length) x = 0;
    var piles = [G.hand, G.dr, G.di],
      at = -1,
      pile = null;
    for (var a = 0; a < piles.length && at < 0; a++) {
      at = piles[a].indexOf(r);
      pile = piles[a];
    }
    if (x >= 0) {
      var nid = add.splice(x, 1)[0];
      if (at >= 0) pile[at] = nid;
    } else if (at >= 0) pile.splice(at, 1);
  });
  add.forEach(function (id) {
    G.hand.push(id);
  });
}

function useTar(i) {
  if (scr == 'pack' || V || P || G.busy || !G.tar[i]) return;
  tarUse(
    G.tar[i],
    function () {
      G.tar.splice(i, 1);
    },
    render,
  );
}

// Marcar / desmarcar a carta i das que apareceram para o tarot em curso.
function pickDeck(i) {
  if (!PK) return;
  var p = PK.sel.indexOf(i);
  if (p >= 0) PK.sel.splice(p, 1);
  else if (PK.need == 1) PK.sel = [i];
  else if (PK.sel.length < PK.need) PK.sel.push(i);
  render();
}

// Aplica o tarot às cartas marcadas (e gasta-o).
function finishPick() {
  if (!PK || !PK.sel.length) return;
  var p = PK,
    ids = p.sel.map(function (i) {
      return p.hand[i];
    });
  PK = null;
  V = null;
  p.take();
  applyTar(p.k, ids);
  p.done();
}

// HTML de uma carta. cb = código a executar ao clicar; dis = carta desativada.
function cardEl(id, i, cb, dis) {
  var c = CARDS[id];
  return (
    '<button class="card ' + c.t + (c.up ? ' up' : '') + '" ' + (dis ? 'disabled ' : '') +
    'onclick="' + cb + '"><span class="c">' + c.c + '</span><span class="n">' + c.n +
    '</span><span class="t">' + TN[c.t] + '</span><span>' + c.d + '</span></button>'
  );
}

// V = janela aberta ('deck', 'dr', 'di', 'pick') ou null.  PG = pack aberto: { t tipo, s tamanho, ch opções, left escolhas que faltam, ret ecrã a que voltar }.
var V = null;
var PG = null;

// Abre a janela com a lista de cartas (baralho, compra ou descarte).
function view(k) {
  V = k;
  render();
}

// Fecha a janela de cartas (e cancela a escolha de um tarot, que não se gasta).
function closeV() {
  V = null;
  PK = null;
  render();
}

// HTML de uma carta só para ver (sem clique), com o número de cópias no canto.
function cardFace(id, n) {
  var c = CARDS[id];
  return (
    '<div class="card ' + c.t + (c.up ? ' up' : '') + ' face">' +
    (n > 1 ? '<span class="qty">×' + n + '</span>' : '') +
    '<span class="c">' + c.c + '</span><span class="n">' + c.n +
    '</span><span class="t">' + TN[c.t] + '</span><span>' + c.d + '</span></div>'
  );
}

// Ordena ids de cartas por tipo, custo e nome.
function byCard(x, y) {
  var a = CARDS[x],
    b = CARDS[y];
  return a.t < b.t ? -1 : a.t > b.t ? 1 : a.c - b.c || (a.n < b.n ? -1 : 1);
}

// HTML da janela que mostra as cartas (baralho, compra ou descarte) como cartas, agrupadas
// por tipo e custo. Assim a pilha de compra não revela a ordem em que saem.
function modal() {
  if (V == 'pick') return pickModal();
  if (V == 'run') return runModal();
  if (V == 'col') return colModal();
  var L = V == 'deck' ? G.deck : V == 'dr' ? G.dr : G.di,
    T =
      V == 'deck'
        ? 'Baralho completo'
        : V == 'dr'
          ? 'Pilha de compra (ordem escondida)'
          : 'Pilha de descarte',
    c0 = {};
  L.forEach(function (id) {
    c0[id] = (c0[id] || 0) + 1;
  });
  var h =
    '<div class="modal" onclick="closeV()"><div class="mw" onclick="event.stopPropagation()"><h3>' +
    T + ' · ' + L.length + '</h3>';
  if (L.length) {
    h += '<div class="pg">';
    Object.keys(c0)
      .sort(byCard)
      .forEach(function (id) {
        h += cardFace(id, c0[id]);
      });
    h += '</div>';
  } else h += '<p>Vazia.</p>';
  return h + '<div class="row"><button class="btn" onclick="closeV()">Fechar</button></div></div></div>';
}

// Janela "Coleção" durante o jogo: tudo o que existe (cartas, inimigos, relíquias, tarots, packs e etiquetas).
function colModal() {
  return (
    '<div class="modal" onclick="closeV()"><div class="mw" onclick="event.stopPropagation()"><h3>📖 Coleção</h3><div class="colw">' +
    colHtml() +
    '</div><div class="row"><button class="btn" onclick="closeV()">Fechar</button></div></div></div>'
  );
}

// Janela "Info da run" (como no Balatro): progresso pelos 9 combates, estatísticas, baralho, relíquias, tarots e etiquetas.
function runModal() {
  var h = '<div class="modal" onclick="closeV()"><div class="mw" onclick="event.stopPropagation()"><h3>ℹ️ Info da run</h3>',
    i,
    f,
    n,
    cnt = { a: 0, d: 0, s: 0 };
  h += '<div class="rmap">';
  for (f = 0; f < 3; f++) {
    h += '<div class="rrow"><b>Andar ' + (f + 1) + '</b>';
    for (n = 0; n < 3; n++) {
      i = f * 3 + n;
      h +=
        '<span class="rn' + (i < G.node ? ' done' : i == G.node ? ' cur' : '') + (n == 2 ? ' boss' : '') + '">' +
        (n == 2 ? '👑' : '⚔️') + '<small>' + (i < G.node ? '✔' : n == 2 ? 'Boss' : 'C' + (n + 1)) + '</small></span>';
    }
    h += '</div>';
  }
  h += '</div>';
  G.deck.forEach(function (id) {
    cnt[CARDS[id].t]++;
  });
  var tot = G.ok + G.ko;
  h +=
    '<div class="rst"><span>❤️ ' + G.hp + '/' + G.max + '</span><span>🪙 ' + G.gold + '</span><span>✅ ' + G.ok +
    '</span><span>❌ ' + G.ko + '</span><span>🎯 ' + (tot ? Math.round((G.ok / tot) * 100) + '%' : '—') +
    '</span><span>📚 ' + G.deck.length + ' cartas (⚔️ ' + cnt.a + ' · 🛡️ ' + cnt.d + ' · ✨ ' + cnt.s + ')</span>' +
    (G.str ? '<span>💪 ' + G.str + '</span>' : '') + (G.sk ? '<span>🔥 ' + G.sk + '</span>' : '') + '</div>';
  h += '<h4>🎁 Relíquias (' + G.rels.length + '/' + MAXR + ')</h4>';
  h += G.rels.length
    ? G.rels.map(function (k) { return '<p class="rli"><b>' + RL[k].n + '</b>: ' + RL[k].d + '</p>'; }).join('')
    : '<p class="mut">Nenhuma.</p>';
  h += '<h4>🔮 Tarots (' + G.tar.length + '/' + G.ts + ')</h4>';
  h += G.tar.length
    ? G.tar.map(function (k) { return '<p class="rli"><b>' + TR[k].n + '</b>: ' + TR[k].d + '</p>'; }).join('')
    : '<p class="mut">Nenhum.</p>';
  if ((G.tags || []).length) {
    h += '<h4>🏷️ Etiquetas</h4>';
    h += G.tags.map(function (k) { return '<p class="rli"><b>' + TAGS[k].i + ' ' + TAGS[k].n + '</b>: ' + TAGS[k].d + '</p>'; }).join('');
  }
  return h + '<div class="row"><button class="btn" onclick="closeV()">Fechar</button></div></div></div>';
}

// Janela do tarot: aparecem umas cartas do baralho (à sorte) e marcas a(s) que queres.
function pickModal() {
  var t = TR[PK.k],
    h =
      '<div class="modal" onclick="closeV()"><div class="mw" onclick="event.stopPropagation()"><h3>' +
      t.n +
      '</h3><p>' +
      t.d +
      '</p><p class="mut">' + (PK.live ? 'Estas são as cartas da tua mão.' : 'Estas são ' + PK.hand.length + ' cartas do teu baralho, tiradas à sorte.') + ' Escolhe ' +
      (PK.need > 1 ? 'até ' + PK.need : '1') + '.</p><div class="pg">';
  PK.hand.forEach(function (id, i) {
    var c = CARDS[id],
      on = PK.sel.indexOf(i) >= 0;
    h +=
      '<button class="card ' + c.t + (c.up ? ' up' : '') + ' face pk' + (on ? ' on' : '') + '" onclick="pickDeck(' + i + ')">' +
      '<span class="c">' + c.c + '</span><span class="n">' + c.n + '</span><span class="t">' + TN[c.t] +
      '</span><span>' + c.d + '</span></button>';
  });
  h +=
    '</div><div class="row"><button class="btn" ' + (PK.sel.length ? '' : 'disabled ') + 'onclick="finishPick()">Confirmar' +
    (PK.sel.length ? ' (' + PK.sel.length + ')' : '') +
    '</button><button class="btn alt" onclick="closeV()">Cancelar</button></div></div></div>';
  return h;
}

// Menu inicial (como no Milionário): Solo, Coleções e Regras.
function home() {
  V = null;
  P = null;
  PK = null;
  PG = null;
  GU = false;
  TK++;
  scr = 'home';
  render();
}
function showCol() {
  scr = 'col';
  render();
}
function showRules() {
  scr = 'rules';
  render();
}

// Coleções: todas as cartas, inimigos, relíquias, tarots, packs e etiquetas do jogo.
function colHtml() {
  var h = '<h3>🃏 Cartas</h3><p class="mut">Cada carta pode ser melhorada (+) com tarots como A Estrela, O Sol, A Justiça ou a Roda da Fortuna.</p><div class="pg">';
  Object.keys(BASE).forEach(function (id) {
    h += cardFace(id, 1);
  });
  h += '</div><h3>👾 Inimigos (' + Object.keys(FOES).length + ')</h3><div class="cl">';
  var mv = { a: '⚔️', d: '🛡️', b: '💪' };
  Object.keys(FOES).forEach(function (k) {
    var f = FOES[k],
      onde = '';
    FL.forEach(function (L, i) {
      if (L.b.indexOf(k) >= 0) onde += (onde ? ', ' : '') + '👑 Boss do andar ' + (i + 1);
      else if (L.c.indexOf(k) >= 0) onde += (onde ? ', ' : 'Andar ') + (i + 1);
    });
    h +=
      '<div class="ec"><span class="eem">' + f.e + '</span><b>' + f.n + '</b><small>❤️ ' + f.hp +
      ' · ' + onde + '</small><small>' +
      f.p
        .map(function (m) {
          return mv[m[0]] + ' ' + m[1];
        })
        .join(' · ') +
      '</small></div>';
  });
  h += '</div><h3>🎁 Relíquias (' + Object.keys(RL).length + ')</h3><p class="mut">Só podes ter ' + MAXR + ' ao mesmo tempo. Vendem-se por metade do preço.</p><div class="cl">';
  Object.keys(RL).forEach(function (k) {
    h += '<div class="ec"><b>' + RL[k].n + '</b><small>' + RL[k].d + '</small><small>🪙 ' + RL[k].p + ' · venda 🪙 ' + sellP(k) + '</small></div>';
  });
  h += '</div><h3>🔮 Tarots (' + Object.keys(TR).length + ')</h3><div class="cl">';
  Object.keys(TR).forEach(function (k) {
    h += '<div class="ec"><b>' + TR[k].n + '</b><small>' + TR[k].d + '</small></div>';
  });
  h += '</div><h3>📦 Packs</h3><div class="cl">';
  Object.keys(PKS).forEach(function (k) {
    var d = PKS[k];
    h +=
      '<div class="ec"><b>' + d.i + ' ' + d.n + '</b><small>' + d.d + '</small><small>Normal: escolhe 1 de ' + d.ch[0] + ' (🪙 ' + d.p[0] +
      ') · Jumbo: 1 de ' + d.ch[1] + ' (🪙 ' + d.p[1] + ') · Mega: 2 de ' + d.ch[2] + ' (🪙 ' + d.p[2] + ')</small></div>';
  });
  h += '</div><h3>🏷️ Etiquetas (ao ignorar um combate) (' + Object.keys(TAGS).length + ')</h3><div class="cl">';
  Object.keys(TAGS).forEach(function (k) {
    h += '<div class="ec"><b>' + TAGS[k].i + ' ' + TAGS[k].n + '</b><small>' + TAGS[k].d + '</small></div>';
  });
  return h + '</div>';
}

function menu() {
  V = null;
  P = null;
  PK = null;
  PG = null;
  GU = false;
  TK++;
  scr = 'menu';
  render();
}

// Desistir (como no Milionário): pergunta primeiro e, se confirmares, acaba a partida.
function giveUpAsk() {
  GU = true;
  render();
}
function giveUpNo() {
  GU = false;
  render();
}
function giveUp() {
  // Se estavas a meio de uma pergunta, ela aparece no fim como "sem resposta".
  var wq = P && !P.done ? P.q : null,
    inb = scr == 'battle';
  GU = false;
  TK++;
  endGame('walk', { wq: wq, inb: inb });
}

// Acaba a partida: kind = 'dead' (morreste), 'walk' (desististe) ou 'win' (venceste a torre).
function endGame(kind, o) {
  o = o || {};
  G.busy = false;
  G.end = { kind: kind, wq: o.wq || null, inb: kind != 'walk' || !!o.inb };
  P = null;
  PK = null;
  PG = null;
  V = null;
  scr = kind == 'win' ? 'win' : 'over';
  render();
  window.scrollTo(0, 0);
}

// Filtro das perguntas no ecrã final (todas / só certas / só erradas).
function flt(k, b) {
  var box = document.querySelector('.rvs');
  if (box) box.setAttribute('data-show', k);
  Array.prototype.forEach.call(document.querySelectorAll('[data-flt]'), function (x) {
    x.setAttribute('aria-pressed', String(x === b));
  });
}

// Ecrã final (como o do Milionário): título, causa, resumo e todas as perguntas respondidas, certas e erradas.
function endHtml() {
  var g = G,
    e = g.end,
    kind = e.kind,
    F = Math.floor(g.node / 3) + 1,
    where = 'andar ' + F + ' de 3, ' + (g.node % 3 == 2 ? 'boss' : 'combate ' + ((g.node % 3) + 1)),
    foe = e.inb && E ? E.e + ' ' + E.n : '',
    title =
      kind == 'win' ? '🏆 Venceste a torre!' : kind == 'walk' ? '🏳️ Desististe no andar ' + F : '💀 Caíste no andar ' + F,
    why = '';
  if (kind == 'dead') {
    var lw = null;
    g.hist.forEach(function (h) {
      if (!h.ok && !h.nul && h.n == g.node) lw = h;
    });
    why =
      '<b>Como perdeste:</b> ' + foe + ' deixou-te sem vida no ' + where + '. Nesse combate acertaste ' + g.cok +
      ' e erraste ' + g.cko + (g.cko == 1 ? ' pergunta.' : ' perguntas.');
    if (lw)
      why +=
        '<br><small>Última pergunta que erraste nesse combate: «' + esc(qtxt(lw.q.q)) + '»<br>Resposta certa: ' +
        esc(lw.q.o[lw.q.a]) + '</small>';
  } else if (kind == 'walk') {
    why =
      '<b>Desististe</b> no ' + where + (foe ? ', a meio do combate contra ' + foe : '') + ', com ❤️ ' + g.hp + '/' + g.max +
      ' e 🪙 ' + g.gold + '.';
    if (e.wq) why += '<br><small>Estavas a responder a uma pergunta (aparece em baixo, sem resposta).</small>';
  } else {
    why = '<b>Conseguiste!</b> Derrotaste ' + foe + ' e chegaste ao topo da torre com ❤️ ' + g.hp + '/' + g.max + '.';
  }
  // As perguntas, pela ordem em que apareceram.
  var items = g.hist.map(function (h, i) {
    return { q: h.q, n: i + 1, st: h.nul ? 'nul' : h.ok ? 'ok' : 'ko', ch: h.ch };
  });
  if (e.wq) items.push({ q: e.wq, n: items.length + 1, st: 'na', ch: null });
  var nOk = items.filter(function (i) {
      return i.st == 'ok';
    }).length,
    nKo = items.filter(function (i) {
      return i.st == 'ko';
    }).length,
    lbl = { ok: 'Certa', ko: 'Errada', na: 'Sem resposta', nul: 'Anulada' },
    fl =
      '<div class="flt" role="group" aria-label="Filtrar perguntas"><button class="btn alt" data-flt="all" aria-pressed="true" onclick="flt(\'all\',this)">Todas (' +
      items.length + ')</button><button class="btn alt" data-flt="ok" aria-pressed="false" ' + (nOk ? '' : 'disabled ') +
      'onclick="flt(\'ok\',this)">Só as certas (' + nOk + ')</button><button class="btn alt" data-flt="ko" aria-pressed="false" ' +
      (nKo ? '' : 'disabled ') + 'onclick="flt(\'ko\',this)">Só as erradas (' + nKo + ')</button></div>',
    rv = items
      .map(function (it) {
        var q = it.q;
        return (
          '<div class="rv s-' + it.st + '"><span class="st ' + it.st + '">' + lbl[it.st] + '</span> <b>' + it.n + '.</b> <span style="white-space:pre-line">' +
          esc(qtxt(q.q)) + '</span>' +
          (q.a >= 0 ? '<p>Resposta certa: ' + esc(q.o[q.a]) + '</p>' : '<p>Esta pergunta está anulada (sem resposta certa).</p>') +
          (it.st == 'ko' ? '<p class="mut">A tua resposta: ' + esc(q.o[it.ch]) + '</p>' : '') +
          q.e + (window.VerManual ? window.VerManual.btn(q) : '') +
          (q.u ? '<small class="mut">Esta resposta não está confirmada oficialmente.</small>' : '') +
          '</div>'
        );
      })
      .join('');
  return (
    '<div class="end"><div class="ctr"><h1>' + title + '</h1></div><div class="why ' + kind + '">' + why + '</div>' +
    '<p class="ctr">Respostas certas: ' + g.ok + ' · erradas: ' + g.ko + ' · 🪙 ' + g.gold + ' · ' + g.deck.length + ' cartas no baralho<br>Relíquias: ' +
    (g.rels.length
      ? g.rels
          .map(function (k) {
            return RL[k].n;
          })
          .join(', ')
      : 'nenhuma') +
    '</p><div class="row"><button class="btn" onclick="menu()">' + (kind == 'win' ? 'Jogar outra vez' : 'Tentar de novo') +
    '</button><button class="btn alt" onclick="home()">Menu</button></div>' +
    '<details open><summary>Rever as perguntas (' + items.length + ')</summary>' +
    (items.length ? fl + '<div class="rvs" data-show="all">' + rv + '</div>' : '<p class="mut">Ainda não respondeste a nenhuma pergunta.</p>') +
    '</details></div>'
  );
}

// Estás a meio de uma partida? (Para avisar antes de sair.)
function inRun() {
  return ['home', 'menu', 'col', 'rules', 'over', 'win'].indexOf(scr) < 0;
}

// Barra de opções em cima (igual à do Milionário): Início, Som, Manual e Desistir.
function optHome() {
  return '<a class="tb" href="index.html" onclick="return !inRun()||confirm(\'Sair da Torre? O progresso desta partida perde-se.\')">Início</a>';
}
function optEnd() {
  return (
    '<button class="tb" data-snd aria-pressed="' + SOUND + '" onclick="toggleSound()">' +
    (SOUND ? 'Som ligado' : 'Som desligado') + '</button>' +
    '<button class="tb" onclick="openManual()">📖 Manual</button>' +
    (inRun() ? '<button class="tb" onclick="giveUpAsk()">Desistir</button>' : '')
  );
}
// Barra de opções separada (menu, ecrã final): Início à esquerda e som, manual e desistir à direita.
function optbar() {
  return '<div class="ob">' + optHome() + '<span class="sp"></span>' + optEnd() + '</div>';
}

// HTML das relíquias que o jogador já tem (a descrição aparece ao passar o rato ou tocar).
function relicsHtml() {
  return (G.rels || [])
    .map(function (k) {
      var r = RL[k],
        t = r.n + ': ' + r.d;
      return (
        '<span class="rl" data-tip="' + t + '" tabindex="0" aria-label="' + t + '">' + r.n.split(' ')[0] + '</span>'
      );
    })
    .join('');
}

// HTML das etiquetas guardadas.
function tagsHtml() {
  return (G.tags || [])
    .map(function (k) {
      var t = TAGS[k],
        x = t.n + ': ' + t.d;
      return '<span class="rl tg" data-tip="' + x + '" tabindex="0" aria-label="' + x + '">' + t.i + '</span>';
    })
    .join('');
}

// Faixa por baixo da barra: relíquias (só nos combates; fora deles aparecem em baixo da barra, nas ranhuras) e etiquetas.
function inv() {
  var h = tagsHtml();
  return h ? '<div class="inv">' + h + '</div>' : '';
}

// Barra de progresso dos 9 combates e, por baixo, andar, vida, moedas e baralho.
function topbar() {
  var s = '<div class="prog">';
  for (var i = 0; i < N; i++) s += '<i class="' + (i <= G.node ? 'on' : '') + '"></i>';
  s +=
    '</div><div class="top"><div class="tgl">' + optHome() + '<span>Andar ' + (Math.floor(G.node / 3) + 1) + '/3 · ' +
    (G.node % 3 == 2 ? '👑 Boss' : 'Combate ' + ((G.node % 3) + 1)) +
    '</span></div><div class="tgl"><span>❤️ ' + G.hp + '/' + G.max + '</span>' +
    (scr == 'blinds' ? '<span class="tl">Escolhe o teu próximo desafio</span>' : '') +
    '<span>🪙 ' + G.gold + '</span></div><div class="tgl">' +
    '<button class="btn alt" style="padding:3px 10px;font-size:.85rem" onclick="view(\'deck\')">📚 Baralho (' + G.deck.length + ')</button>' +
    '<button class="btn alt" style="padding:3px 10px;font-size:.85rem" onclick="view(\'run\')">ℹ️ Info da run</button>' +
    '<button class="btn alt" style="padding:3px 10px;font-size:.85rem" onclick="view(\'col\')">📖 Coleção</button>' +
    optEnd() + '</div></div>';
  return s + inv();
}

// Etiqueta de preço por cima de um item da loja (como no Balatro).
function ptag(p) {
  return '<div class="ptag">' + (p ? '🪙 ' + p : 'GRÁTIS') + '</div>';
}

// Um item da loja: preço por cima e a carta / relíquia / tarot / pack por baixo.
function relBtn(k, cb, dis) {
  return (
    '<button class="card rel" ' + (dis ? 'disabled ' : '') + 'onclick="' + cb + '"><span class="n">' +
    RL[k].n + '</span><span class="t">Relíquia</span><span>' + RL[k].d + '</span></button>'
  );
}
function tarBtn(k, cb, dis, extra) {
  return (
    '<button class="card tar" ' + (dis ? 'disabled ' : '') + 'onclick="' + cb + '"><span class="n">' +
    TR[k].n + '</span><span class="t">Tarot</span><span>' + TR[k].d + '</span>' + (extra || '') + '</button>'
  );
}
function packBtn(pk, cb, dis) {
  var d = PKS[pk.t],
    n = d.ch[pk.s] + (hasRel('bussola') ? 1 : 0);
  return (
    '<button class="card pack ' + pk.t + '" ' + (dis ? 'disabled ' : '') + 'onclick="' + cb + '"><span class="pi">' + d.i +
    '</span><span class="n">' + d.n + '</span><span class="t">' + PSN[pk.s] + '</span><span>Escolhe ' + PPK[pk.s] + ' de ' + n + '</span></button>'
  );
}

// Uma relíquia que já tens (só para ver; vende-se com o botão por baixo).
function relFace(k) {
  return (
    '<div class="card rel sm" tabindex="0"><span class="n">' + RL[k].n + '</span><span class="t">Relíquia</span><span>' + RL[k].d + '</span></div>'
  );
}

// As tuas relíquias (máx. MAXR, com botão Vender) e os teus tarots (máx. G.ts, com Usar), como em cima na loja do Balatro.
// useT = deixa usar os tarots neste ecrã.
function ownBar(useT, mini, canSell) {
  var rs = '',
    ts = '',
    i;
  for (i = 0; i < MAXR; i++)
    rs += G.rels[i]
      ? '<div class="it">' + relFace(G.rels[i]) + (mini && !canSell ? '' : '<button class="sell" onclick="sellRel(' + i + ')">Vender 🪙 ' + sellP(G.rels[i]) + '</button>') + '</div>'
      : '<div class="it"><div class="empty"></div></div>';
  for (i = 0; i < G.ts; i++)
    ts += G.tar[i]
      ? '<div class="it">' + tarBtn(G.tar[i], 'useTar(' + i + ')', !useT, '<span class="usar">Usar</span>') +
        (mini && !canSell ? '' : '<button class="sell" onclick="sellTar(' + i + ')">Vender 🪙 ' + sellPT(G.tar[i]) + '</button>') + '</div>'
      : '<div class="it"><div class="empty"></div></div>';
  return (
    '<div class="own' + (mini ? ' mini' : '') + '"><div class="oz"><div class="olb"><b>🎁 Relíquias</b><span>' + G.rels.length + '/' + MAXR +
    '</span></div><div class="ozi">' + rs + '</div></div><div class="oz t"><div class="olb"><b>🔮 Tarots</b><span>' + G.tar.length + '/' + G.ts +
    '</span></div><div class="ozi">' + ts + '</div></div></div>'
  );
}

// Redesenha o ecrã conforme scr: home, col, rules, menu, battle, blinds, shop, reward, rest, over ou win.
function render() {
  var h = '',
    a = document.getElementById('app');
  if (scr == 'home') {
    h =
      '<div class="ctr"><h1>🗼 Torre das Cartas</h1><p>Sobe a torre: cada carta só funciona se acertares na pergunta.</p></div>' +
      '<div class="mnu"><button class="mb blue" onclick="menu()">Solo<small>Sobe a torre</small></button>' +
      '<button class="mb purple" onclick="showCol()">Coleções<small>Cartas, relíquias, tarots...</small></button>' +
      '<button class="mb green" onclick="showRules()">Regras<small>Como se joga</small></button></div>';
  } else if (scr == 'col') {
    h =
      '<div class="ctr"><h2>Coleções</h2></div><div class="colw">' +
      colHtml() +
      '</div><div class="row"><button class="btn alt" onclick="home()">Voltar</button></div>';
  } else if (scr == 'rules') {
    h =
      '<div class="ctr"><h2>Regras</h2></div><ul class="rules">' +
      '<li><b>Objetivo:</b> sobe 3 andares e derrota o boss do último andar.</li>' +
      '<li><b>Cada andar</b> tem 3 desafios: 2 combates contra inimigos comuns e 1 boss. Carrega em <b>Selecionar</b> para combater.</li>' +
      '<li><b>Ignorar:</b> nos 2 combates comuns podes carregar em <b>Ignorar</b>. Não combates nem ganhas moedas nem loja, mas ganhas a <b>etiqueta</b> que está por baixo do botão (um tarot grátis, um pack grátis, um desconto na próxima loja, moedas...). O boss não se pode ignorar.</li>' +
      '<li><b>Turnos:</b> começas cada turno com a mão cheia e a energia ⚡ cheia. Cada carta custa energia. O inimigo mostra o que vai fazer (por exemplo, "Ataca 6"). As cartas que jogas vão para o descarte; as que não jogas ficam na mão para o turno seguinte, e no início de cada turno compras só até a mão ficar cheia.</li>' +
      '<li><b>Perguntas:</b> para jogar uma carta tens de acertar numa pergunta. Se acertares, a carta funciona; se errares, falha e gasta a energia na mesma.</li>' +
      '<li><b>Sequência 🔥:</b> respostas certas seguidas dão mais dano, e a cada 3 certas seguidas ganhas +1 energia.</li>' +
      '<li><b>Efeitos:</b> <b>Vulnerável</b> (o inimigo leva +50% de dano), <b>Fraco</b> (o inimigo bate -25%), <b>Veneno</b> (dano no fim de cada turno, e vai baixando), <b>Força</b> (+dano em todos os ataques) e <b>Exaurir</b> (a carta só volta no próximo combate).</li>' +
      '<li><b>Loja:</b> depois de cada combate ganhas moedas 🪙 e recuperas um pouco de vida. Na loja (como no Balatro) há 2 itens em cima (<b>relíquias</b>, <b>tarots</b> ou <b>cartas</b>), <b>cartas</b> em baixo à esquerda e <b>packs</b> em baixo à direita. Podes <b>atualizar</b> a loja por 🪙 5 (sobe 1 de cada vez).</li>' +
      '<li><b>Relíquias:</b> só podes ter ' + MAXR + ' ao mesmo tempo. Para ficares com outra, <b>vende</b> uma (recebes metade do preço).</li>' +
      '<li><b>Packs:</b> ao comprar um pack, ele abre e escolhes 1 dos itens (2 nos <b>Mega</b>). O <b>Pack Arcano</b> tem tarots (o que escolheres é usado logo), o <b>Pack Padrão</b> tem cartas e o <b>Pack do Bobo</b> tem relíquias. Os packs <b>Jumbo</b> e <b>Mega</b> têm mais opções.</li>' +
      '<li><b>Tarots:</b> mexem nas cartas do teu baralho (duplicar, eliminar, melhorar, transformar). Quando precisam de cartas, <b>em combate</b> escolhes entre as cartas da tua <b>mão</b> (e o efeito é imediato); <b>na loja ou nos packs</b> aparecem umas 5 cartas do teu baralho, tiradas à sorte. Só tens espaço para 2 tarots e não os podes usar enquanto respondes a uma pergunta.</li>' +
      '<li><b>Depois do boss:</b> descansas (recuperas 35% da vida) ou escolhes uma relíquia permanente, e depois vais à loja.</li>' +
      '<li><b>Perdes</b> quando a tua vida chega a 0. Ao perder ou desistir vês a causa e todas as perguntas que respondeste, certas e erradas. Podes consultar o 📖 <b>Manual</b> a qualquer momento.</li></ul>' +
      '<div class="row"><button class="btn alt" onclick="home()">Voltar</button></div>';
  } else if (scr == 'menu') {
    h =
      '<div class="ctr"><h1>🗼 Torre das Cartas</h1><p>Sobe 3 andares: em cada um enfrentas 2 inimigos comuns e 1 boss, e depois de cada combate vais à loja (relíquias, cartas e packs). Derrota o boss do último andar. Para jogar uma carta tens de responder a uma pergunta do teste: se acertares, a carta funciona; se errares, falha. Se morreres, recomeças.</p><p><b>Escolhe os temas:</b></p><div class="box">' +
      Temas.html(SEL) +
      '</div><div class="row" style="flex-direction:column;align-items:center"><button class="btn" id="go" onclick="start()">Começar</button><button class="btn alt" onclick="home()">Voltar</button><small id="avail"></small></div></div>';
  } else if (scr == 'battle') {
    var m = E.p[E.i % E.p.length],
      it =
        m[0] == 'a'
          ? '⚔️ Ataca ' + edmg(m)
          : m[0] == 'd'
            ? '🛡️ Defende ' + m[1]
            : '✨ Reforça-se';
    var st =
        (E.block ? '🛡️ ' + E.block + ' ' : '') +
        (E.vuln ? '🎯 Vulnerável ' + E.vuln + ' ' : '') +
        (E.weak ? '😵 Fraco ' + E.weak + ' ' : '') +
        (E.poison ? '☠️ Veneno ' + E.poison + ' ' : '') +
        (E.str ? '💪 ' + E.str : ''),
      ps =
        (G.block ? '🛡️ ' + G.block + ' ' : '') + (G.str ? '💪 ' + G.str + ' ' : '') + (G.sk ? '🔥 ' + G.sk : '');
    h =
      topbar() +
      ownBar(!P && !G.busy, true, !P && !G.busy) +
      '<div class="arena"><div class="fighter" id="pl"><div class="em">🧙</div><b>Tu</b><div class="bar g"><b style="width:' +
      Math.max(0, (G.hp / G.max) * 100) +
      '%"></b></div><div>❤️ ' + G.hp + ' / ' + G.max + '</div><div class="st">' + (ps || '&nbsp;') +
      '</div></div><div class="fighter" id="en"><div class="intent">' + it + '</div><div class="em">' + E.e +
      '</div><b>' + E.n + '</b><div class="bar"><b style="width:' +
      Math.max(0, (E.hp / E.max) * 100) +
      '%"></b></div><div>' + E.hp + ' / ' + E.max + '</div><div class="st">' + (st || '&nbsp;') +
      '</div></div></div><div class="log">' + msg + '</div>';
    if (P) {
      h += '<div class="qbox ' + (CARDS[G.hand[P.i]] ? CARDS[G.hand[P.i]].t : '') + '"><div class="qt">' + esc(qtxt(P.q.q)) + '</div>';
      P.o.forEach(function (oi, k) {
        var cl = '';
        if (P.done) {
          if (oi == P.q.a) cl = ' ok';
          else if (k == P.pick) cl = ' ko';
        } else if (k === P.sel) cl = ' sel';
        h +=
          '<button class="opt' + cl + '" ' + (P.done ? 'disabled ' : '') + 'onclick="answer(' + k + ')">' +
          esc(P.q.o[oi]) + '</button>';
      });
      if (!P.done)
        h +=
          '<div class="row"><button class="btn" ' + (P.sel == null ? 'disabled ' : '') +
          'onclick="confirmA()">Confirmar resposta</button></div>';
      if (P.done) {
        h +=
          '<div class="ex"><b>' +
          (P.nul
            ? '⚪ Pergunta anulada: sem resposta certa, não conta. A carta funciona.'
            : P.ok
              ? '✅ Certo!'
              : P.forgive
                ? '❌ Errado, mas o 📕 Livro Antigo perdoa o erro: a carta funciona.'
                : '❌ Errado.') +
          '</b>' + P.q.e + (window.VerManual ? window.VerManual.btn(P.q) : '') +
          '</div><div class="row"><button class="btn" onclick="resolve()">Continuar</button></div>';
      }
      h += '</div>';
    } else {
      var n = G.hand.length;
      h += '<div class="fan">';
      G.hand.forEach(function (id, i) {
        var o = i - (n - 1) / 2;
        h +=
          '<div class="slot" style="--r:' + o * 5 + 'deg;--y:' + Math.abs(o) * Math.abs(o) * 3 + 'px">' +
          cardEl(id, i, 'play(' + i + ')', CARDS[id].c > G.en) + '</div>';
      });
      h += '</div>';
    }
    h +=
      '<div class="tbl"><div class="grp"><div class="orb"><i>⚡</i>' + G.en + '/' + G.me +
      '</div><div class="pile" onclick="view(\'dr\')">📚 Compra<b>' + G.dr.length +
      '</b></div></div><div class="grp"><div class="pile" onclick="view(\'di\')">🗑️ Descarte<b>' + G.di.length +
      '</b></div><button class="btn" ' + (P || G.busy ? 'disabled ' : '') +
      'onclick="endTurn()">Terminar turno</button></div></div>';
  } else if (scr == 'blinds') {
    var F = Math.floor(G.node / 3),
      sl = G.node % 3;
    h =
      topbar() +
      ownBar(true) +
      (msg ? '<div class="log">' + msg + '</div>' : '') + '<div class="bz">';
    G.pl3.forEach(function (k, i) {
      var f = FOES[k],
        b = i == 2,
        nn = F * 3 + i,
        hp = Math.round(f.hp * (f.boss ? 1 : 1 + 0.3 * F)),
        st = i < sl ? 'done' : i == sl ? 'cur' : 'fut',
        tg = b ? null : TAGS[G.tg[i]];
      h +=
        '<div class="bc c' + i + ' ' + st + '"><button class="bsel" ' +
        (st == 'cur' ? 'onclick="enter()"' : 'disabled') + '>' +
        (st == 'cur' ? 'Selecionar' : st == 'fut' ? 'Próximo' : G.skp[nn] ? 'Ignorado' : 'Derrotado') +
        '</button><div class="bnm">' + (b ? '👑 Boss' : 'Combate ' + (i + 1)) +
        '</div><div class="bmed">' + f.e + '</div><div class="bnn">' + f.n +
        '</div><div class="bbox">Vida · Força<b>❤️ ' + hp + ' · 💪 +' + F +
        '</b>Recompensa: <em>🪙 ' + (10 + nn) + '–' + (20 + nn) + '</em></div>' +
        (b
          ? '<div class="bskipw"><small>O boss não pode ser ignorado</small></div>'
          : '<div class="bor">OU</div><div class="bskipw"><button class="bskip" ' +
            (st == 'cur' ? 'onclick="skip()"' : 'disabled') +
            '>Ignorar</button><div class="btag"><span class="bti">' + tg.i + '</span><b>' + tg.n +
            '</b><small>' + tg.d + '</small></div></div>') +
        '</div>';
    });
    h += '</div>';
  } else if (scr == 'shop') {
    var sp = G.shop;
    h =
      topbar() + ownBar(true) + '<div class="ctr"><h2>🛒 Loja</h2></div>' + (msg ? '<div class="log">' + msg + '</div>' : '');
    h +=
      '<div class="shp"><div class="shl"><button class="shn" onclick="leave()">Próxima<br>Rodada</button>' +
      '<button class="shr" ' + (G.gold < rrCost() ? 'disabled ' : '') + 'onclick="reroll()">Atualizar<b>' +
      (rrCost() ? '🪙 ' + rrCost() : 'GRÁTIS') + '</b></button></div><div class="shm"><div class="shi" data-lbl="Relíquias, tarots e cartas">';
    sp.top.forEach(function (x, k) {
      var cb = 'buyTop(' + k + ')',
        p = price(x.t == 'rel' ? RL[x.id].p : x.t == 'tar' ? TR[x.id].p : pr(x.id));
      h +=
        '<div class="it">' + ptag(p) +
        (x.t == 'rel' ? relBtn(x.id, cb, G.gold < p) : x.t == 'tar' ? tarBtn(x.id, cb, G.gold < p) : cardEl(x.id, k, cb, G.gold < p)) +
        '</div>';
    });
    if (!sp.top.length) h += '<small class="mut">Esgotado. Atualiza a loja.</small>';
    h += '</div><div class="sbt"><div class="shc" data-lbl="Cartas">';
    sp.cards.forEach(function (id) {
      var p = price(pr(id));
      h += '<div class="it">' + ptag(p) + cardEl(id, 0, "buyCard('" + id + "')", G.gold < p) + '</div>';
    });
    if (sp.pot) {
      var pp = price(25);
      h +=
        '<div class="it">' + ptag(pp) + '<button class="card pot" ' + (G.gold < pp ? 'disabled ' : '') +
        'onclick="buyPot()"><span class="n">🧪 Poção</span><span class="t">Consumível</span><span>Recupera 20 de vida.</span></button></div>';
    }
    if (!sp.cards.length && !sp.pot) h += '<small class="mut">Esgotado. Atualiza a loja.</small>';
    h += '</div><div class="spk" data-lbl="Packs">';
    sp.packs.forEach(function (pk, i) {
      var p = price(PKS[pk.t].p[pk.s]);
      h += '<div class="it">' + ptag(p) + packBtn(pk, 'buyPack(' + i + ')', G.gold < p) + '</div>';
    });
    if (!sp.packs.length) h += '<small class="mut">Sem packs.</small>';
    h += '</div></div></div></div>';
  } else if (scr == 'pack') {
    var pd = PKS[PG.t];
    h =
      topbar() + ownBar(false) +
      '<div class="ctr"><h2>' + pd.i + ' ' + pd.n + ' ' + PSN[PG.s] + '</h2><p>' + pd.d + ' Escolhe ' + PG.left +
      (PG.left > 1 ? ' itens.' : ' item.') + '</p></div>' + (msg ? '<div class="log">' + msg + '</div>' : '') + '<div class="hand">';
    PG.ch.forEach(function (id, i) {
      var cb = 'pickPack(' + i + ')';
      h +=
        '<div class="it">' +
        (PG.t == 'padrao' ? cardEl(id, i, cb) : PG.t == 'bobo' ? relBtn(id, cb, false) : tarBtn(id, cb, false)) +
        '</div>';
    });
    h += '</div><div class="row"><button class="btn alt" onclick="skipPack()">Saltar o pack</button></div>';
  } else if (scr == 'rest') {
    h =
      topbar() + ownBar(true) +
      '<div class="ctr"><h2>👑 Boss derrotado!</h2>' + (msg ? '<div class="log">' + msg + '</div>' : '') +
      '<p>Descansa (recupera 35% da vida) ou escolhe uma relíquia permanente (máx. ' + MAXR +
      '; vende uma se estiveres cheio).</p><div class="row"><button class="btn" onclick="rest()">Descansar</button></div><div class="hand">';
    opts.forEach(function (k) {
      h += relBtn(k, "relic('" + k + "')", false);
    });
    h += '</div></div>';
  } else {
    h = endHtml();
  }
  if (h.indexOf('class="prog"') < 0) h = optbar() + h;
  if (V) h += modal();
  if (GU)
    h +=
      '<div class="modal" onclick="giveUpNo()"><div onclick="event.stopPropagation()"><h3>Desistir?</h3><p>Perdes o progresso desta partida.</p><div class="row"><button class="btn" onclick="giveUp()">Sim, desistir</button><button class="btn alt" onclick="giveUpNo()">Continuar</button></div></div></div>';
  a.className = ['shop', 'pack', 'rest', 'blinds', 'battle'].indexOf(scr) >= 0 ? 'wide' : '';
  a.innerHTML = h;
  if (scr == 'menu') Temas.bind(a.querySelector('.tm'), tmInfo), tmInfo();
  doFx();
}

// Menu: mostra quantas perguntas há nos testes marcados e só deixa começar com pelo menos uma.
function tmInfo() {
  var a = document.getElementById('app'),
    s = Temas.ler(a),
    n = QS.filter(function (q) {
      return Temas.tem(s, q);
    }).length;
  document.getElementById('avail').textContent = n
    ? n + ' perguntas disponíveis'
    : 'Escolhe pelo menos um teste.';
  document.getElementById('go').disabled = !n;
}
render();
