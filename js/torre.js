/* ==========================================================================
   torre.js  —  jogo "Torre das Cartas" (estilo roguelike de cartas)
   --------------------------------------------------------------------------
   Como se joga: sobe 3 andares; cada andar tem 2 inimigos comuns + 1 boss.
   Para jogar uma carta, o jogador tem de acertar numa pergunta do teste:
   se acertar a carta funciona, se errar falha.

   Ecrãs (variável scr):
     menu -> blinds (escolher combate) -> battle -> reward (carta nova)
          -> [rest após boss] -> shop -> blinds ... -> win | over

   Dados principais:
     CARDS  cartas   { n: nome, c: custo de energia, t: tipo (a/d/s), d: descrição, f: efeito }
     FOES   inimigos { n: nome, e: emoji, hp: vida, p: padrão de jogadas [tipo, valor] }
              tipos de jogada do inimigo: a = ataca, d = defende, b = reforça-se
     FL     os 3 andares: { c: inimigos comuns possíveis, b: boss }
     RL     relíquias permanentes (escolhidas depois de cada boss)

   Estado do jogo (G = jogador, E = inimigo atual) está descrito mais abaixo.
   Depois de qualquer mudança chama-se render(), que redesenha o ecrã todo.
   ========================================================================== */

// QS = lista de perguntas (de quiz.js). N = nº total de combates (3 andares x 3).
var QS = window.QS;
var N = 9;

// Dano ao inimigo: valor da carta + força + bónus da sequência de acertos.
// Se o inimigo estiver vulnerável, +50%. O escudo do inimigo absorve primeiro.
var hit = function (v) {
  var d = v + G.str + Math.floor(G.sk / 2);
  if (E.vuln > 0) d = Math.floor(d * 1.5);
  var a = Math.min(E.block, d);
  E.block -= a;
  E.hp -= d - a;
  FX.push(['e', d - a > 0 ? '-' + (d - a) : '🛡️']);
  msg = 'Causaste ' + d + ' de dano.';
};

// ---- Cartas do jogo ----
var CARDS = {
  golpe: {
    n: 'Golpe',
    c: 1,
    t: 'a',
    d: 'Causa 6 de dano.',
    f: function () {
      hit(6);
    },
  },
  defender: {
    n: 'Defender',
    c: 1,
    t: 'd',
    d: 'Ganha 5 de escudo.',
    f: function () {
      G.block += 5;
    },
  },
  duplo: {
    n: 'Golpe Duplo',
    c: 1,
    t: 'a',
    d: 'Causa 4 de dano duas vezes.',
    f: function () {
      hit(4);
      hit(4);
    },
  },
  investida: {
    n: 'Investida',
    c: 2,
    t: 'a',
    d: 'Causa 14 de dano.',
    f: function () {
      hit(14);
    },
  },
  ferreo: {
    n: 'Escudo de Ferro',
    c: 2,
    t: 'd',
    d: 'Ganha 12 de escudo.',
    f: function () {
      G.block += 12;
    },
  },
  furia: {
    n: 'Fúria',
    c: 0,
    t: 's',
    d: 'Ganha 2 de força.',
    f: function () {
      G.str += 2;
    },
  },
  cura: {
    n: 'Cura',
    c: 2,
    t: 's',
    d: 'Recupera 8 de vida.',
    f: function () {
      G.hp = Math.min(G.max, G.hp + 8);
    },
  },
  vuln: {
    n: 'Expor',
    c: 1,
    t: 's',
    d: 'Inimigo vulnerável 2 turnos (+50% dano).',
    f: function () {
      E.vuln = 3;
    },
  },
  inspirar: {
    n: 'Inspirar',
    c: 1,
    t: 's',
    d: 'Compra 2 cartas.',
    f: function () {
      draw(2);
    },
  },
  veneno: {
    n: 'Veneno',
    c: 1,
    t: 's',
    d: 'Aplica 5 de veneno.',
    f: function () {
      E.poison += 5;
    },
  },
  contra: {
    n: 'Contra-ataque',
    c: 1,
    t: 'a',
    d: 'Causa 5 de dano e ganha 5 de escudo.',
    f: function () {
      hit(5);
      G.block += 5;
    },
  },
  explosao: {
    n: 'Explosão',
    c: 3,
    t: 'a',
    d: 'Causa 26 de dano.',
    f: function () {
      hit(26);
    },
  },
};

// Nome de cada tipo de carta (a = ataque, d = defesa, s = habilidade).
var TN = { a: 'Ataque', d: 'Defesa', s: 'Habilidade' };

// Cartas que podem aparecer como recompensa ou na loja.
var POOL = [
  'duplo',
  'investida',
  'ferreo',
  'furia',
  'cura',
  'vuln',
  'inspirar',
  'veneno',
  'contra',
  'explosao',
];

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
};

// ---- Andares: que inimigos comuns podem sair e qual é o boss ----
var FL = [
  { c: ['slime', 'lobo', 'goblin'], b: 'rei' },
  { c: ['goblin', 'esq', 'mago'], b: 'ogre' },
  { c: ['esq', 'mago', 'lobo'], b: 'boss' },
];

// Estado global:
//   G     jogador: hp/max vida, gold moedas, deck/hand/dr(compra)/di(descarte) cartas,
//         en/me energia atual/máxima, hs cartas por turno, str/bs força (atual/base),
//         block escudo, ok/ko respostas certas/erradas, sk sequência de acertos,
//         node combate atual (0..8), pl3 os 3 inimigos do andar, shop/pot loja
//   E     inimigo atual: hp/max, block, str, vuln (turnos vulnerável), poison,
//         p padrão de jogadas, i posição no padrão
//   scr   ecrã atual     msg   texto do registo de combate     opts  opções de recompensa
//   P     pergunta em curso: { i: carta na mão, q: pergunta, o: ordem das opções,
//                              sel: opção marcada, done: já confirmou, ok: acertou }
//   QQ    fila de perguntas por usar     SEL   testes escolhidos (Set de índices de TESTS)
//   FX    números de dano a mostrar      AC    contexto de áudio
var G,
  E,
  scr = 'menu',
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
  AC = null;

// Som curto na frequência f (agudo = certo, grave = errado).
function beep(f) {
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

// ---- Relíquias permanentes ----
var RL = {
  vida: { n: '💖 Coração de Pedra', d: '+15 vida máxima e cura 15.' },
  en: { n: '💎 Cristal de Energia', d: '+1 energia máxima.' },
  mao: { n: '🎒 Bolsa Extra', d: 'Compras +1 carta por turno.' },
  forca: { n: '🥊 Luva de Ferro', d: '+2 de força permanente.' },
};

// Preço de uma carta na loja (cartas mais caras de energia custam mais moedas).
function pr(id) {
  return 15 + CARDS[id].c * 12;
}

// Comprar uma carta na loja.
function buy(id) {
  var pc = pr(id);
  if (G.gold < pc) return;
  G.gold -= pc;
  G.deck.push(id);
  G.shop.splice(G.shop.indexOf(id), 1);
  render();
}

// Comprar a poção de vida na loja (25 moedas, só uma por visita).
function buyPot() {
  if (G.gold < 25 || !G.pot) return;
  G.gold -= 25;
  G.pot = false;
  G.hp = Math.min(G.max, G.hp + 20);
  render();
}

// Sorteia os 3 inimigos do andar atual: 2 comuns à sorte + o boss.
function plan() {
  var L = FL[Math.floor(G.node / 3)],
    c = sh(L.c.slice());
  G.pl3 = [c[0], c[1], L.b];
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

// Aplica a relíquia escolhida e segue para a loja.
function relic(k) {
  G.rels.push(k);
  if (k == 'vida') {
    G.max += 15;
    G.hp = Math.min(G.max, G.hp + 15);
  }
  if (k == 'en') G.me++;
  if (k == 'mao') G.hs++;
  if (k == 'forca') G.bs += 2;
  shop();
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
  SEL = Temas.ler(document.getElementById('app'));
  QQ = [];
  P = null;
  G = {
    rels: [],
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

// Entra num combate: cria o inimigo (a vida dos comuns cresce 30% por andar; a do boss não),
// baralha o baralho e compra a mão.
function enter() {
  var F = Math.floor(G.node / 3),
    bs = G.node % 3 == 2,
    L = FL[F],
    k = G.pl3[G.node % 3],
    f = FOES[k],
    hp = Math.round(f.hp * (k == 'boss' ? 1 : 1 + 0.3 * F));
  E = { n: f.n, e: f.e, hp: hp, max: hp, p: f.p, i: 0, block: 0, str: F, vuln: 0, poison: 0 };
  G.dr = sh(G.deck.slice());
  G.di = [];
  G.hand = [];
  G.str = G.bs;
  scr = 'battle';
  turn();
  msg = '';
  render();
}

// Abre a loja com 3 cartas à sorte.
function shop() {
  G.shop = sh(POOL.slice()).slice(0, 3);
  G.pot = true;
  scr = 'shop';
  msg = '';
  render();
}

// Início de turno do jogador: perde o escudo, repõe a energia e compra a mão.
function turn() {
  G.block = 0;
  G.en = G.me;
  G.di = G.di.concat(G.hand);
  G.hand = [];
  draw(G.hs);
}

// Clicou na carta i: em vez de a jogar logo, mostra uma pergunta (P).
function play(i) {
  NG = false;
  var id = G.hand[i],
    c = CARDS[id];
  if (G.en < c.c || scr != 'battle' || P) return;
  var q = nextQ(),
    o = q.o.map(function (t, k) {
      return k;
    });
  sh(o);
  P = { i: i, q: q, o: o, done: false, ok: false, pick: -1 };
  render();
}

// Marca a opção k (ainda não confirmada).
function answer(k) {
  if (P.done) return;
  P.sel = k;
  render();
}

// Confirma a resposta: regista certo/errado e mostra a explicação.
function confirmA() {
  if (P.done || P.sel == null) return;
  var k = P.sel;
  P.done = true;
  P.pick = k;
  P.ok = P.o[k] == P.q.a;
  if (P.ok) {
    G.ok++;
    G.sk++;
  } else {
    G.ko++;
    G.sk = 0;
  }
  beep(P.ok ? 660 : 170);
  render();
}

// Depois da explicação: se acertou, a carta faz o efeito; gasta a energia e descarta a carta.
function resolve() {
  var i = P.i,
    id = G.hand[i],
    c = CARDS[id],
    ok = P.ok;
  P = null;
  G.en -= c.c;
  G.hand.splice(i, 1);
  G.di.push(id);
  if (ok) {
    msg = 'Resposta certa!';
    c.f();
    if (G.sk % 3 == 0) {
      G.en++;
      msg += ' 🔥 Sequência! +1 energia';
    }
  } else msg = 'Resposta errada: a carta falhou.';
  if (E.hp <= 0) return win();
  render();
}

// Fim do turno: o veneno atua e o inimigo faz a jogada seguinte do seu padrão.
function endTurn() {
  NG = false;
  if (scr != 'battle' || P) return;
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
    var d = m[1] + E.str,
      a = Math.min(G.block, d);
    G.block -= a;
    G.hp -= d - a;
    FX.push(['p', d - a > 0 ? '-' + (d - a) : '🛡️']);
    out += E.n + ' ataca por ' + d + '.';
  } else if (m[0] == 'd') {
    E.block += m[1];
    out += E.n + ' defende.';
  } else {
    E.str += m[1];
    out += E.n + ' fica mais forte.';
  }
  if (E.vuln > 0) E.vuln--;
  if (G.hp <= 0) {
    G.hp = 0;
    scr = 'over';
    msg = out;
    return render();
  }
  turn();
  msg = out;
  render();
}

// Inimigo derrotado: dá moedas, cura um pouco e mostra a recompensa (ou o ecrã final).
function win() {
  if (G.node == N - 1) {
    scr = 'win';
    return render();
  }
  var p = sh(POOL.slice()).slice(0, 3);
  opts = p;
  scr = 'reward';
  G.gain = 10 + Math.floor(Math.random() * 11) + G.node;
  G.gold += G.gain;
  G.hp = Math.min(G.max, G.hp + 4);
  msg = '';
  render();
}

// Escolher a carta de recompensa (ou saltar). Depois de um boss vai para o descanso, senão para a loja.
function pick(id) {
  if (id) G.deck.push(id);
  if (G.node % 3 == 2) {
    opts = sh(Object.keys(RL)).slice(0, 3);
    scr = 'rest';
    render();
  } else shop();
}

// Descansar após o boss: recupera 35% da vida.
function rest() {
  G.hp = Math.min(G.max, G.hp + Math.ceil(G.max * 0.35));
  shop();
}

// HTML de uma carta. cb = código a executar ao clicar; dis = carta desativada.
function cardEl(id, i, cb, dis) {
  var c = CARDS[id];
  return (
    '<button class="card ' +
    c.t +
    '" ' +
    (dis ? 'disabled ' : '') +
    'onclick="' +
    cb +
    '"><span class="c">' +
    c.c +
    '</span><span class="n">' +
    c.n +
    '</span><span class="t">' +
    TN[c.t] +
    '</span><span>' +
    c.d +
    '</span></button>'
  );
}

// NG = a confirmar "Novo jogo". V = janela aberta ('deck', 'dr', 'di') ou null.
var NG = false;
var V = null;

// Abre a janela com a lista de cartas (baralho, compra ou descarte).
function view(k) {
  V = k;
  render();
}

// Fecha a janela de cartas.
function closeV() {
  V = null;
  render();
}

// HTML de uma carta só para ver (sem clique), com o número de cópias no canto.
function cardFace(id, n) {
  var c = CARDS[id];
  return (
    '<div class="card ' + c.t + ' face">' +
    (n > 1 ? '<span class="qty">×' + n + '</span>' : '') +
    '<span class="c">' + c.c + '</span><span class="n">' + c.n +
    '</span><span class="t">' + TN[c.t] + '</span><span>' + c.d + '</span></div>'
  );
}

// HTML da janela que mostra as cartas (baralho, compra ou descarte) como cartas, agrupadas
// por tipo e custo. Assim a pilha de compra não revela a ordem em que saem.
function modal() {
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
      .sort(function (x, y) {
        var a = CARDS[x],
          b = CARDS[y];
        return a.t < b.t ? -1 : a.t > b.t ? 1 : a.c - b.c || (a.n < b.n ? -1 : 1);
      })
      .forEach(function (id) {
        h += cardFace(id, c0[id]);
      });
    h += '</div>';
  } else h += '<p>Vazia.</p>';
  return h + '<div class="row"><button class="btn" onclick="closeV()">Fechar</button></div></div></div>';
}

// Volta ao menu inicial.
function menu() {
  V = null;
  NG = false;
  P = null;
  scr = 'menu';
  render();
}

// Botão "Novo jogo": pede confirmação no primeiro clique, volta ao menu no segundo.
function newGame() {
  if (NG) return menu();
  NG = true;
  render();
}

// Barra de progresso dos 9 combates + andar, vida, força, moedas, baralho e contadores.
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

function topbar() {
  var s = '<div class="prog">';
  for (var i = 0; i < N; i++) s += '<i class="' + (i <= G.node ? 'on' : '') + '"></i>';
  s +=
    '</div><div class="top"><span>Andar ' +
    (Math.floor(G.node / 3) + 1) +
    '/3 · ' +
    (G.node % 3 == 2 ? '👑 Boss' : 'Combate ' + ((G.node % 3) + 1)) +
    '</span><span>❤️ ' +
    G.hp +
    '/' +
    G.max +
    '</span><span>💪 ' +
    G.str +
    '</span><span>🪙 ' +
    G.gold +
    '</span>' +
    relicsHtml() +
    '<button class="btn alt" style="padding:3px 10px;font-size:.85rem" onclick="view(\'deck\')">📚 Baralho (' +
    G.deck.length +
    ')</button><span>✅ ' +
    G.ok +
    ' ❌ ' +
    G.ko +
    ' 🔥 ' +
    G.sk +
    '</span><button class="btn alt" style="padding:3px 10px;font-size:.85rem" onclick="newGame()">' +
    (NG ? 'Confirmar?' : 'Novo jogo') +
    '</button></div>';
  return s;
}

// Redesenha o ecrã conforme scr: menu, battle, blinds, shop, reward, rest, over ou win.
function render() {
  var h = '',
    a = document.getElementById('app');
  if (scr == 'menu') {
    h =
      '<div class="ctr"><h1>🗼 Torre das Cartas</h1><p>Sobe 3 andares: em cada um enfrentas 2 inimigos comuns e 1 boss, e depois de cada combate tens uma loja. Derrota o Dragão Ancião no fim. Para jogar uma carta tens de responder a uma pergunta do teste: se acertares, a carta funciona; se errares, falha. Se morreres, recomeças.</p><p><b>Escolhe os temas:</b></p><div class="box">' +
      Temas.html(SEL) +
      '</div><div class="row" style="flex-direction:column;align-items:center"><button class="btn" id="go" onclick="start()">Começar</button><small id="avail"></small></div></div>';
  } else if (scr == 'battle') {
    var m = E.p[E.i % E.p.length],
      it =
        m[0] == 'a'
          ? '⚔️ Ataca ' + (m[1] + E.str)
          : m[0] == 'd'
            ? '🛡️ Defende ' + m[1]
            : '✨ Reforça-se';
    var st =
        (E.block ? '🛡️ ' + E.block + ' ' : '') +
        (E.vuln ? '🎯 Vulnerável ' + E.vuln + ' ' : '') +
        (E.poison ? '☠️ Veneno ' + E.poison + ' ' : '') +
        (E.str ? '💪 ' + E.str : ''),
      ps = (G.block ? '🛡️ ' + G.block + ' ' : '') + (G.str ? '💪 ' + G.str : '');
    h =
      topbar() +
      '<div class="arena"><div class="fighter" id="pl"><div class="em">🧙</div><b>Tu</b><div class="bar g"><b style="width:' +
      Math.max(0, (G.hp / G.max) * 100) +
      '%"></b></div><div>❤️ ' +
      G.hp +
      ' / ' +
      G.max +
      '</div><div class="st">' +
      (ps || '&nbsp;') +
      '</div></div><div class="fighter" id="en"><div class="intent">' +
      it +
      '</div><div class="em">' +
      E.e +
      '</div><b>' +
      E.n +
      '</b><div class="bar"><b style="width:' +
      Math.max(0, (E.hp / E.max) * 100) +
      '%"></b></div><div>' +
      E.hp +
      ' / ' +
      E.max +
      '</div><div class="st">' +
      (st || '&nbsp;') +
      '</div></div></div><div class="log">' +
      msg +
      '</div>';
    if (P) {
      var cd = CARDS[G.hand[P.i]];
      h +=
        '<div class="qbox"><div class="t" style="color:var(--mut);font-size:.85rem">Carta: ' +
        cd.n +
        ' · ' +
        esc(P.q.s) +
        '</div><div class="qt">' +
        esc(P.q.q) +
        '</div>';
      P.o.forEach(function (oi, k) {
        var cl = '';
        if (P.done) {
          if (oi == P.q.a) cl = ' ok';
          else if (k == P.pick) cl = ' ko';
        } else if (k === P.sel) cl = ' sel';
        h +=
          '<button class="opt' +
          cl +
          '" ' +
          (P.done ? 'disabled ' : '') +
          'onclick="answer(' +
          k +
          ')">' +
          esc(P.q.o[oi]) +
          '</button>';
      });
      if (!P.done)
        h +=
          '<div class="row"><button class="btn" ' +
          (P.sel == null ? 'disabled ' : '') +
          'onclick="confirmA()">Confirmar resposta</button></div>';
      if (P.done) {
        h +=
          '<div class="ex"><b>' +
          (P.ok ? '✅ Certo!' : '❌ Errado.') +
          '</b>' +
          P.q.e +
          '</div><div class="row"><button class="btn" onclick="resolve()">Continuar</button></div>';
      }
      h += '</div>';
    } else {
      var n = G.hand.length;
      h += '<div class="fan">';
      G.hand.forEach(function (id, i) {
        var o = i - (n - 1) / 2;
        h +=
          '<div class="slot" style="--r:' +
          o * 5 +
          'deg;--y:' +
          Math.abs(o) * Math.abs(o) * 3 +
          'px">' +
          cardEl(id, i, 'play(' + i + ')', CARDS[id].c > G.en) +
          '</div>';
      });
      h += '</div>';
    }
    h +=
      '<div class="tbl"><div class="grp"><div class="orb">⚡ ' +
      G.en +
      '/' +
      G.me +
      '</div><div class="pile" onclick="view(\'dr\')">📚 Compra<b>' +
      G.dr.length +
      '</b></div></div><div class="grp"><div class="pile" onclick="view(\'di\')">🗑️ Descarte<b>' +
      G.di.length +
      '</b></div><button class="btn" ' +
      (P ? 'disabled ' : '') +
      'onclick="endTurn()">Terminar turno</button></div></div>';
  } else if (scr == 'blinds') {
    var F = Math.floor(G.node / 3),
      sl = G.node % 3;
    h =
      topbar() +
      '<div class="ctr"><h2>Andar ' +
      (F + 1) +
      '/3</h2><p>Escolhe o teu próximo desafio</p></div><div class="blinds">';
    G.pl3.forEach(function (k, i) {
      var f = FOES[k],
        b = i == 2,
        nn = F * 3 + i,
        hp = Math.round(f.hp * (k == 'boss' ? 1 : 1 + 0.3 * F)),
        st = i < sl ? 'done' : i == sl ? 'cur' : 'fut';
      h +=
        '<div class="poster ' +
        st +
        (b ? ' bossp' : '') +
        '"><div class="pt">' +
        (b ? '👑 BOSS' : 'Combate ' + (i + 1)) +
        '</div><div class="em">' +
        f.e +
        '</div><b>' +
        f.n +
        '</b><div class="pd">❤️ ' +
        hp +
        ' · 💪 +' +
        F +
        '</div><div class="pd">Recompensa: 🪙 ' +
        (10 + nn) +
        '–' +
        (20 + nn) +
        '</div>' +
        (i == sl
          ? '<div class="row"><button class="btn" onclick="enter()">Enfrentar</button></div>'
          : i < sl
            ? '<div class="pd">✔ Derrotado</div>'
            : '<div class="pd">🔒 Bloqueado</div>') +
        '</div>';
    });
    h += '</div>';
  } else if (scr == 'shop') {
    h =
      topbar() +
      '<div class="ctr"><h2>🛒 Loja</h2><p>Tens 🪙 ' +
      G.gold +
      '</p></div><div class="hand">';
    G.shop.forEach(function (id) {
      var pc = pr(id);
      h +=
        '<div class="ctr">' +
        cardEl(id, 0, "buy('" + id + "')", G.gold < pc) +
        '<div>🪙 ' +
        pc +
        '</div></div>';
    });
    h +=
      '</div><div class="row">' +
      (G.pot
        ? '<button class="btn alt" ' +
          (G.gold < 25 ? 'disabled ' : '') +
          'onclick="buyPot()">🧪 Poção (+20 vida) · 🪙 25</button>'
        : '') +
      '<button class="btn" onclick="leave()">Sair da loja</button></div>';
  } else if (scr == 'reward') {
    h =
      topbar() +
      '<div class="ctr"><h2>Vitória! +' +
      G.gain +
      ' 🪙 Escolhe uma carta</h2></div><div class="hand">';
    opts.forEach(function (id, i) {
      h += cardEl(id, i, "pick('" + id + "')");
    });
    h += '</div><div class="row"><button class="btn alt" onclick="pick()">Saltar</button></div>';
  } else if (scr == 'rest') {
    h =
      topbar() +
      '<div class="ctr"><h2>👑 Boss derrotado!</h2><p>Descansa (recupera 35% da vida) ou escolhe uma relíquia permanente.</p><div class="row"><button class="btn" onclick="rest()">Descansar</button></div><div class="hand">';
    opts.forEach(function (k) {
      h +=
        '<button class="card s" onclick="relic(\'' +
        k +
        '\')"><span class="n">' +
        RL[k].n +
        '</span><span>' +
        RL[k].d +
        '</span></button>';
    });
    h += '</div></div>';
  } else if (scr == 'over') {
    h =
      '<div class="ctr"><h1>💀 Caíste no andar ' +
      (G.node + 1) +
      '</h1><p>' +
      msg +
      '</p><p>Respostas certas: ' +
      G.ok +
      ' · erradas: ' +
      G.ko +
      '</p><div class="row"><button class="btn" onclick="menu()">Tentar de novo</button></div></div>';
  } else {
    h =
      '<div class="ctr"><h1>🏆 Venceste o Dragão!</h1><p>Chegaste ao topo com ' +
      G.hp +
      ' de vida e ' +
      G.deck.length +
      ' cartas.</p><p>Respostas certas: ' +
      G.ok +
      ' · erradas: ' +
      G.ko +
      '</p><div class="row"><button class="btn" onclick="menu()">Jogar outra vez</button></div></div>';
  }
  if (V) h += modal();
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
