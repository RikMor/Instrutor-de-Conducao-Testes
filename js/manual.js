/* manual.js — Manual de estudo.
   Estrutura: js/manual/index.js (window.MANUAL_INDEX) traz só módulos, secções e títulos.
   O texto de cada módulo vem de js/manual/<módulo>.js (carregado quando é preciso) e chama
   MANUAL_LOAD(módulo, [{id, h}]) com o HTML de cada nota. O endereço guarda onde estás:
   #/<id-da-nota> ou #/<id-do-módulo>.
   Pesquisa (como no Obsidian): escreve uma palavra ou uma frase; procura no texto de todas as notas,
   sem distinguir maiúsculas nem acentos, mesmo que a frase passe de uma linha para a seguinte.
   Aparecem primeiro as notas com a frase exata e depois as que têm todas as palavras.
   "entre aspas" obriga a frase exata. Ao abrir um resultado, o texto procurado fica destacado. */
(function () {
  var IDX = window.MANUAL_INDEX, DATA = {}, LOADING = {}, ONDE = {}, TEXTO = null;
  var HL = null, PEND = null, ULT = '', TOK = 0, ATUAL = '', MARCAS = [], POS = 0, TIMER = 0;
  var $ = function (s) { return document.querySelector(s); };
  var main = $('#main'), arvore = $('#arvore'), busca = $('#busca');
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  IDX.forEach(function (m) { m.n.forEach(function (n, i) { ONDE[n.id] = { m: m, i: i }; }); });

  // ---------- Carregar o texto de um módulo (uma só vez) ----------
  window.MANUAL_LOAD = function (id, notas) { DATA[id] = {}; notas.forEach(function (n) { DATA[id][n.id] = n.h; }); };
  function carregar(id, ok) {
    if (DATA[id]) return ok();
    if (LOADING[id]) return LOADING[id].push(ok);
    LOADING[id] = [ok];
    var s = document.createElement('script');
    s.src = 'js/manual/' + id + '.js';
    s.onload = function () { var f = LOADING[id]; delete LOADING[id]; f.forEach(function (g) { g(); }); };
    s.onerror = function () { delete LOADING[id]; main.innerHTML = '<p>Não foi possível carregar este módulo. Verifica a ligação e tenta outra vez.</p>'; };
    document.head.appendChild(s);
  }

  // ---------- Índice lateral ----------
  function desenharArvore(atual) {
    var h = '', grp = null;
    IDX.forEach(function (m) {
      if (m.g !== grp) { grp = m.g; h += '<h3 class="grp">' + esc(grp) + '</h3>'; }
      var aberto = ONDE[atual] ? ONDE[atual].m === m : atual === m.id;
      h += '<details' + (aberto ? ' open' : '') + '><summary>' + esc(m.t) + '</summary>';
      var sec = null;
      m.n.forEach(function (n) {
        if (n.s !== sec) { sec = n.s; if (sec) h += '<h3>' + esc(sec) + '</h3>'; }
        h += '<a class="n" href="#/' + n.id + '"' + (n.id === atual ? ' aria-current="page"' : '') + '>' + esc(n.t) + '</a>';
      });
      h += '</details>';
    });
    arvore.innerHTML = h;
    var cur = arvore.querySelector('[aria-current]');
    if (cur) cur.scrollIntoView({ block: 'nearest' });
  }

  // ---------- Páginas: início, módulo, nota ----------
  function inicio() {
    document.title = 'Manual — Instrutor de Condução';
    var h = '<h2>Manual de estudo</h2><p>Escolhe um módulo para começar: manuais, resumos das aulas, legislação e relatórios. Para treinar o que leste, usa os <a href="testes.html">testes</a>. Para encontrar uma frase em todo o manual, usa a pesquisa à esquerda.</p><div class="cartoes">', g0 = null;
    IDX.forEach(function (m) {
      if (m.g !== g0) { g0 = m.g; h += '</div><h3>' + esc(g0) + '</h3><div class="cartoes">'; }
      h += '<a class="cartao" href="#/' + m.id + '"><b>' + esc(m.t) + '</b><span>' + esc(m.d) + '</span><small>' + m.n.length + ' capítulos</small></a>';
    });
    main.innerHTML = h + '</div>';
  }

  function modulo(m) {
    document.title = m.t + ' — Manual';
    var h = '<p class="crumb"><a href="#/">Manual</a></p><h2>' + esc(m.t) + '</h2><p>' + esc(m.d) + '</p>', sec = null, aberta = false;
    m.n.forEach(function (n) {
      if (n.s !== sec) { sec = n.s; if (aberta) h += '</ul>'; if (sec) h += '<h3>' + esc(sec) + '</h3>'; h += '<ul class="lista-sec">'; aberta = true; }
      h += '<li><a href="#/' + n.id + '">' + esc(n.t) + '</a></li>';
    });
    main.innerHTML = h + '</ul>';
  }

  function nota(id) {
    var o = ONDE[id], m = o.m, n = m.n[o.i];
    ATUAL = id; document.title = n.t + ' — Manual';
    main.innerHTML = '<p>A carregar…</p>';
    carregar(m.id, function () {
      if (location.hash.replace('#/', '') !== id) return;
      var ant = m.n[o.i - 1], seg = m.n[o.i + 1];
      main.innerHTML =
        '<p class="crumb"><a href="#/">Manual</a> › <a href="#/' + m.id + '">' + esc(m.t) + '</a>' + (n.s ? ' › ' + esc(n.s) : '') + '</p>' +
        '<h2>' + esc(n.t) + '</h2><div id="txt">' + (DATA[m.id][id] || '') + '</div>' +
        '<div class="pn">' + (ant ? '<a href="#/' + ant.id + '"><small>← Anterior</small>' + esc(ant.t) + '</a>' : '<span></span>') +
        (seg ? '<a href="#/' + seg.id + '"><small>Seguinte →</small>' + esc(seg.t) + '</a>' : '') + '</div>';
      var b = main.querySelector('.pn');
      if (b) Array.prototype.forEach.call(b.children, function (a) { if (!a.href) a.remove(); });
      if (HL) destacar();
    });
  }

  // ---------- Normalização: sem acentos nem maiúsculas, letra a letra (o comprimento não muda) ----------
  function nc(c) { var n = c.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); return n.charAt(0) || c; }
  function norm(s) { var o = ''; for (var i = 0; i < s.length; i++) { var c = s.charAt(i); o += /\s/.test(c) ? ' ' : nc(c); } return o.replace(/ +/g, ' ').trim(); }
  function plano(h) {
    return h.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  }

  // Carrega todos os módulos e prepara o texto simples de cada nota (só na primeira pesquisa).
  function prepararTexto(feito, silencio) {
    if (TEXTO) return feito();
    var falta = IDX.length, feitos = 0;
    IDX.forEach(function (m) {
      carregar(m.id, function () {
        feitos++; if (!silencio) main.innerHTML = '<p>A preparar a pesquisa… (' + feitos + ' de ' + IDX.length + ')</p>';
        if (--falta) return;
        TEXTO = {};
        IDX.forEach(function (mm) { mm.n.forEach(function (n) { var p = plano(DATA[mm.id][n.id] || ''), o = ''; for (var i = 0; i < p.length; i++) o += p.charAt(i) === ' ' ? ' ' : nc(p.charAt(i)); TEXTO[n.id] = { p: p, n: o, t: norm(n.t) }; }); });
        feito();
      });
    });
  }

  // ---------- Pesquisa ----------
  function contar(h, t) { var c = 0, p = 0; while ((p = h.indexOf(t, p)) >= 0) { c++; p += t.length; } return c; }
  function trechos(T, t) {
    var r = [], p = 0, ult = -1e9;
    while (r.length < 3 && (p = T.n.indexOf(t, p)) >= 0) {
      if (p - ult > 160) { var a = Math.max(0, p - 70), b = Math.min(T.p.length, p + t.length + 90); r.push((a ? '…' : '') + esc(T.p.slice(a, p)) + '<mark>' + esc(T.p.slice(p, p + t.length)) + '</mark>' + esc(T.p.slice(p + t.length, b)) + (b < T.p.length ? '…' : '')); ult = p; }
      p += t.length;
    }
    return r;
  }
  function buscar(q) {
    ULT = q; document.title = 'Pesquisa — Manual';
    var frases = [], resto = q.replace(/"([^"]+)"|“([^”]+)”/g, function (m, a, b) { frases.push(norm(a || b)); return ' '; });
    var palavras = norm(resto).split(' ').filter(Boolean), exato, solto = null;
    if (frases.length) exato = frases.concat(palavras);
    else { exato = [norm(q)]; if (palavras.length > 1) solto = palavras; }
    var E = [], L = [];
    IDX.forEach(function (m) {
      m.n.forEach(function (n) {
        var T = TEXTO[n.id], tem = function (t) { return T.n.indexOf(t) >= 0 || T.t.indexOf(t) >= 0; };
        if (exato.every(tem)) E.push({ n: n, m: m, T: T, c: contar(T.n, exato[0]) + (T.t.indexOf(exato[0]) >= 0 ? 50 : 0) });
        else if (solto && solto.every(tem)) L.push({ n: n, m: m, T: T, c: contar(T.n, solto[0]) });
      });
    });
    var porC = function (a, b) { return b.c - a.c; }; E.sort(porC); L.sort(porC);
    var lista = function (arr, g, termo) {
      var h = '<ul class="res">';
      arr.slice(0, 100).forEach(function (r) {
        var oc = contar(r.T.n, termo);
        h += '<li><a href="#/' + r.n.id + '" data-g="' + g + '">' + esc(r.n.t) + '</a> <span class="cont">· ' + esc(r.m.t) + (r.n.s ? ' › ' + esc(r.n.s) : '') + (oc ? ' · ' + oc + (oc === 1 ? ' ocorrência' : ' ocorrências') : '') + '</span>';
        trechos(r.T, termo).forEach(function (s) { h += '<span class="sn">' + s + '</span>'; });
        h += '</li>';
      });
      return h + '</ul>' + (arr.length > 100 ? '<p>E mais ' + (arr.length - 100) + ' notas. Escreve mais palavras para afinar.</p>' : '');
    };
    var h = '<h2>Pesquisa: «' + esc(q) + '»</h2>';
    if (!E.length && !L.length) h += '<p>Nenhum resultado. Experimenta menos palavras ou outra forma da palavra.</p>';
    if (E.length) h += '<p class="sec-res">' + (solto ? 'Frase exata' : 'Resultados') + ' — ' + E.length + (E.length === 1 ? ' nota' : ' notas') + '</p>' + lista(E, 'e', exato[0]);
    if (L.length) h += '<p class="sec-res">Contêm todas as palavras — ' + L.length + (L.length === 1 ? ' nota' : ' notas') + '</p>' + lista(L, 'l', solto[0]);
    main.innerHTML = h;
    window.scrollTo(0, 0);
    HL = null; main.__e = exato; main.__l = solto;
  }

  function pesquisar(q) {
    var t = ++TOK;
    prepararTexto(function () { if (t === TOK) buscar(q); });
  }
  busca.addEventListener('input', function () {
    clearTimeout(TIMER); var q = busca.value.trim();
    if (q.length < 2) { TOK++; if (!q) rota(); return; }
    TIMER = setTimeout(function () { pesquisar(q); }, 250);
  });
  busca.addEventListener('keydown', function (e) { if (e.key === 'Enter') { clearTimeout(TIMER); var q = busca.value.trim(); if (q.length > 1) pesquisar(q); } });
  busca.addEventListener('focus', function () { if (!TEXTO) prepararTexto(function () {}, true); });

  // Ao abrir um resultado, guarda os termos para destacar quando a nota aparecer.
  main.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('.res a'); if (!a) return;
    PEND = { q: ULT, termos: a.getAttribute('data-g') === 'l' ? main.__l : main.__e };
  });

  // ---------- Destaque do texto procurado dentro da nota ----------
  function destacar() {
    var raiz = $('#txt'); if (!raiz || !HL) return;
    var w = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT), nos = [], cs = '', mp = [], esp = true;
    while (w.nextNode()) {
      var nd = w.currentNode, t = nd.nodeValue, k = nos.length; nos.push(nd);
      for (var i = 0; i < t.length; i++) {
        var c = t.charAt(i);
        if (/\s/.test(c)) { if (!esp) { cs += ' '; mp.push([k, i]); esp = true; } }
        else { cs += nc(c); mp.push([k, i]); esp = false; }
      }
      if (!esp) { cs += ' '; mp.push([k, t.length]); esp = true; }
    }
    var rg = [];
    HL.termos.forEach(function (t) { if (!t) return; var p = 0; while ((p = cs.indexOf(t, p)) >= 0) { rg.push([p, p + t.length]); p += t.length; } });
    rg.sort(function (a, b) { return a[0] - b[0]; });
    var fund = []; rg.forEach(function (r) { var u = fund[fund.length - 1]; if (u && r[0] <= u[1]) u[1] = Math.max(u[1], r[1]); else fund.push([r[0], r[1]]); });
    var por = {};
    fund.forEach(function (r) {
      var s = mp[r[0]], e = mp[r[1] - 1];
      for (var k = s[0]; k <= e[0]; k++) { var a = k === s[0] ? s[1] : 0, b = k === e[0] ? e[1] + 1 : nos[k].nodeValue.length; if (b > a) (por[k] = por[k] || []).push([a, b]); }
    });
    MARCAS = [];
    Object.keys(por).forEach(function (k) {
      var nd = nos[k]; por[k].sort(function (x, y) { return y[0] - x[0]; });
      por[k].forEach(function (r) { var mid = nd.splitText(r[0]); mid.splitText(r[1] - r[0]); var mk = document.createElement('mark'); mk.className = 'hl'; mid.parentNode.replaceChild(mk, mid); mk.appendChild(mid); MARCAS.push(mk); });
    });
    MARCAS.sort(function (a, b) { return a.compareDocumentPosition(b) & 4 ? -1 : 1; });
    var barra = document.createElement('div'); barra.className = 'barra-hl';
    barra.innerHTML = '<span id="hl-info"></span><button type="button" data-a="ant" aria-label="Ocorrência anterior">▲</button><button type="button" data-a="seg" aria-label="Ocorrência seguinte">▼</button><button type="button" data-a="res">← Resultados</button><button type="button" data-a="lim">Limpar</button>';
    main.insertBefore(barra, main.firstChild);
    barra.addEventListener('click', function (e) {
      var a = e.target.getAttribute && e.target.getAttribute('data-a'); if (!a) return;
      if (a === 'ant') ir(POS - 1); else if (a === 'seg') ir(POS + 1);
      else if (a === 'res') { busca.value = HL.q; pesquisar(HL.q); }
      else { HL = null; nota(ATUAL); }
    });
    POS = 0; if (MARCAS.length) ir(0); else $('#hl-info').textContent = '«' + HL.q + '»: sem ocorrências no texto desta nota (a pesquisa também olha para o título).';
  }
  function ir(i) {
    if (!MARCAS.length) return;
    MARCAS[POS].classList.remove('atual'); POS = (i + MARCAS.length) % MARCAS.length;
    var m = MARCAS[POS]; m.classList.add('atual'); m.scrollIntoView({ block: 'center' });
    $('#hl-info').textContent = '«' + HL.q + '» — ocorrência ' + (POS + 1) + ' de ' + MARCAS.length;
  }

  // ---------- Telemóvel: arrastar do canto esquerdo abre o índice (como no Obsidian) ----------
  // O índice acompanha o dedo; ao largar, abre se passou de metade, senão volta a fechar.
  // Com o índice aberto, arrastar para a esquerda (ou tocar fora) fecha-o.
  var fundo = document.createElement('div'); fundo.id = 'fundo'; document.body.appendChild(fundo);
  var lateral = $('#lateral'), movel = window.matchMedia('(max-width: 820px)'), G = null;
  var aberto = function () { return document.body.classList.contains('menu-aberto'); };
  function abrir(sim) { document.body.classList.toggle('menu-aberto', sim); $('#menu').setAttribute('aria-expanded', sim); }
  fundo.addEventListener('click', function () { abrir(false); });
  document.addEventListener('touchstart', function (e) {
    if (!movel.matches || e.touches.length !== 1) { G = null; return; }
    var t = e.touches[0];
    if (aberto() || t.clientX <= 48) G = { x: t.clientX, y: t.clientY, ab: aberto(), arrasta: false, pos: 0, W: lateral.offsetWidth };
    else G = null;
  }, { passive: true });
  document.addEventListener('touchmove', function (e) {
    if (!G) return;
    var t = e.touches[0], dx = t.clientX - G.x, dy = t.clientY - G.y;
    if (!G.arrasta) {
      if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) { G = null; return; }   // é scroll vertical
      if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      G.arrasta = true; lateral.style.transition = 'none'; fundo.style.transition = 'none';
    }
    G.pos = Math.max(-G.W, Math.min(0, (G.ab ? 0 : -G.W) + dx));
    lateral.style.transform = 'translateX(' + G.pos + 'px)';
    fundo.style.opacity = 1 + G.pos / G.W; fundo.style.pointerEvents = 'auto';
    e.preventDefault();
  }, { passive: false });
  function largar() {
    if (!G) return;
    var g = G; G = null;
    lateral.style.transition = fundo.style.transition = lateral.style.transform = fundo.style.opacity = fundo.style.pointerEvents = '';
    if (g.arrasta) abrir(g.pos > -g.W * 0.5);
  }
  document.addEventListener('touchend', largar); document.addEventListener('touchcancel', largar);

  // ---------- Rotas ----------
  function rota() {
    var id = location.hash.replace(/^#\/?/, '');
    document.body.classList.remove('menu-aberto'); $('#menu').setAttribute('aria-expanded', 'false');
    HL = PEND; PEND = null;
    desenharArvore(id);
    if (ONDE[id]) nota(id);
    else { var m = IDX.filter(function (x) { return x.id === id; })[0]; HL = null; if (m) modulo(m); else inicio(); }
    if (!HL) window.scrollTo(0, 0);
  }
  $('#menu').addEventListener('click', function () { abrir(!aberto()); });
  window.addEventListener('hashchange', function () { TOK++; if (!PEND) busca.value = ''; rota(); });
  rota();
})();
