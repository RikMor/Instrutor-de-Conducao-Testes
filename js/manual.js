/* manual.js — Manual de estudo.
   Como funciona: js/manual/index.js (window.MANUAL_INDEX) traz só a estrutura (módulos, secções, títulos).
   O texto de cada módulo vem de js/manual/<módulo>.js e só é carregado quando é preciso;
   cada um chama MANUAL_LOAD(módulo, [{id, h}]) com o HTML das notas.
   O endereço guarda onde estás: #/<id-da-nota> ou #/<id-do-módulo>. */
(function () {
  var IDX = window.MANUAL_INDEX, DATA = {}, LOADING = {}, ONDE = {};
  var $ = function (s) { return document.querySelector(s); };
  var main = $('#main'), arvore = $('#arvore'), busca = $('#busca');
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  IDX.forEach(function (m) { m.n.forEach(function (n, i) { ONDE[n.id] = { m: m, i: i }; }); });

  // Carrega o ficheiro de um módulo (uma só vez) e chama ok() quando o texto está disponível.
  window.MANUAL_LOAD = function (id, notas) { DATA[id] = {}; notas.forEach(function (n) { DATA[id][n.id] = n.h; }); };
  function carregar(id, ok) {
    if (DATA[id]) return ok();
    if (LOADING[id]) return LOADING[id].push(ok);
    LOADING[id] = [ok];
    var s = document.createElement('script');
    s.src = 'js/manual/' + id + '.js';
    s.onload = function () { LOADING[id].forEach(function (f) { f(); }); delete LOADING[id]; };
    s.onerror = function () { delete LOADING[id]; main.innerHTML = '<p>Não foi possível carregar este módulo. Verifica a ligação e tenta outra vez.</p>'; };
    document.head.appendChild(s);
  }

  // Índice lateral: um bloco por módulo, com as notas agrupadas por secção.
  function desenharArvore(atual) {
    var h = '';
    IDX.forEach(function (m) {
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

  function inicio() {
    document.title = 'Manual — Instrutor de Condução';
    var h = '<h2>Manual de estudo</h2><p>Escolhe um módulo para começar. Para treinar o que leste, usa os <a href="testes.html">testes</a>.</p><div class="cartoes">';
    IDX.forEach(function (m) { h += '<a class="cartao" href="#/' + m.id + '"><b>' + esc(m.t) + '</b><span>' + esc(m.d) + '</span><small>' + m.n.length + ' capítulos</small></a>'; });
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
    document.title = n.t + ' — Manual';
    main.innerHTML = '<p>A carregar…</p>';
    carregar(m.id, function () {
      if (location.hash.replace('#/', '') !== id) return;
      var ant = m.n[o.i - 1], seg = m.n[o.i + 1];
      main.innerHTML =
        '<p class="crumb"><a href="#/">Manual</a> › <a href="#/' + m.id + '">' + esc(m.t) + '</a>' + (n.s ? ' › ' + esc(n.s) : '') + '</p>' +
        '<h2>' + esc(n.t) + '</h2>' + (DATA[m.id][id] || '') +
        '<div class="pn">' + (ant ? '<a href="#/' + ant.id + '"><small>← Anterior</small>' + esc(ant.t) + '</a>' : '<span></span>') +
        (seg ? '<a href="#/' + seg.id + '"><small>Seguinte →</small>' + esc(seg.t) + '</a>' : '') + '</div>';
      var b = main.querySelector('.pn');
      if (b) Array.prototype.forEach.call(b.children, function (a) { if (!a.href) a.remove(); });
    });
  }

  // Pesquisa: títulos logo ao escrever; texto completo (carrega os módulos) ao carregar em Enter.
  function pesquisarTitulos(q) {
    var t = q.toLowerCase(), r = [];
    IDX.forEach(function (m) { m.n.forEach(function (n) { if ((n.t + ' ' + n.s).toLowerCase().indexOf(t) >= 0) r.push({ n: n, m: m }); }); });
    return r;
  }
  function mostrar(q, lista) {
    document.title = 'Pesquisa — Manual';
    var h = '<h2>Pesquisa: «' + esc(q) + '»</h2><p>' + lista.length + ' resultado(s).</p><ul class="res">';
    lista.slice(0, 80).forEach(function (r) { h += '<li><a href="#/' + r.n.id + '">' + esc(r.n.t) + '</a><small>' + esc(r.m.t) + '</small></li>'; });
    main.innerHTML = h + '</ul>';
  }
  function pesquisarTexto(q) {
    main.innerHTML = '<p>A pesquisar em todo o manual…</p>';
    var falta = IDX.length, t = q.toLowerCase();
    IDX.forEach(function (m) {
      carregar(m.id, function () {
        if (--falta) return;
        var r = [];
        IDX.forEach(function (mm) {
          mm.n.forEach(function (n) {
            var txt = (DATA[mm.id][n.id] || '').replace(/<[^>]+>/g, ' '), i = txt.toLowerCase().indexOf(t);
            if (i >= 0 || n.t.toLowerCase().indexOf(t) >= 0) {
              var a = Math.max(0, i - 60), s = i >= 0 ? esc(txt.slice(a, i)) + '<mark>' + esc(txt.slice(i, i + q.length)) + '</mark>' + esc(txt.slice(i + q.length, i + q.length + 90)) : '';
              r.push({ n: n, m: mm, s: s });
            }
          });
        });
        mostrar(q, r);
        main.querySelectorAll('.res li').forEach(function (li, k) { if (r[k] && r[k].s) li.insertAdjacentHTML('beforeend', '<small>…' + r[k].s + '…</small>'); });
      });
    });
  }
  busca.addEventListener('input', function () { var q = busca.value.trim(); if (q.length > 1) mostrar(q, pesquisarTitulos(q)); else rota(); });
  busca.addEventListener('keydown', function (e) { var q = busca.value.trim(); if (e.key === 'Enter' && q.length > 1) pesquisarTexto(q); });

  function rota() {
    var id = location.hash.replace(/^#\/?/, '');
    document.body.classList.remove('menu-aberto'); $('#menu').setAttribute('aria-expanded', 'false');
    desenharArvore(id);
    if (ONDE[id]) nota(id);
    else { var m = IDX.filter(function (x) { return x.id === id; })[0]; if (m) modulo(m); else inicio(); }
    window.scrollTo(0, 0);
  }
  $('#menu').addEventListener('click', function () { var a = document.body.classList.toggle('menu-aberto'); this.setAttribute('aria-expanded', a); });
  window.addEventListener('hashchange', function () { busca.value = ''; rota(); });
  rota();
})();
