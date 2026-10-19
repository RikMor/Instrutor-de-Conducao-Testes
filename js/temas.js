/* temas.js — menu de temas partilhado pelos minijogos (igual ao dos Testes).
   Usa window.TESTS e window.QS (de quiz.js). Mostra os temas com uma caixa que
   marca/desmarca todos os testes do tema, cada teste com o nº de perguntas e a
   etiqueta de correção oficial, e o botão "Selecionar só testes com correção oficial".

     Temas.html(sel)        HTML do menu; sel = Set com os índices dos testes marcados
                            (null = todos marcados)
     Temas.bind(raiz, cb)   liga os eventos do menu dentro de raiz; cb corre a cada alteração
     Temas.ler(raiz)        Set com os índices dos testes marcados
     Temas.tem(sel, q)      true se a pergunta q pertence a algum teste marcado           */
(function () {
  var T = window.TESTS,
    Q = window.QS;
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  // Nº de perguntas do teste i e nº das que estão "em dúvida" (sem correção oficial).
  function n(i) {
    return Q.filter(function (q) {
      return q.t.indexOf(i) >= 0;
    }).length;
  }
  function unc(i) {
    return Q.filter(function (q) {
      return q.t.indexOf(i) >= 0 && q.u;
    }).length;
  }
  function badge(i) {
    return unc(i)
      ? '<span class="tm-bd">⚠️ ' + unc(i) + ' em dúvida</span>'
      : '<span class="tm-bd ok">✅ Correção oficial</span>';
  }
  function html(sel) {
    var subs = [];
    T.forEach(function (t) {
      if (subs.indexOf(t.s) < 0) subs.push(t.s);
    });
    var h =
      '<div class="tm"><b class="tm-h">Temas</b> <button class="tm-of" type="button">Selecionar só testes com correção oficial</button>';
    subs.forEach(function (s) {
      var all = T.every(function (t, i) {
        return t.s !== s || !sel || sel.has(i);
      });
      h +=
        '<div class="tm-sub"><label class="tm-l"><input type="checkbox" class="tm-sc" data-s="' +
        esc(s) +
        '"' +
        (all ? ' checked' : '') +
        '> <b>' +
        esc(s) +
        '</b></label><div class="tm-tl">';
      T.forEach(function (t, i) {
        if (t.s !== s) return;
        h +=
          '<label class="tm-l"><input type="checkbox" class="tm-tc" data-s="' +
          esc(s) +
          '" value="' +
          i +
          '"' +
          (!sel || sel.has(i) ? ' checked' : '') +
          '> ' +
          esc(t.n) +
          ' (' +
          n(i) +
          ') ' +
          badge(i) +
          '</label>';
      });
      h += '</div></div>';
    });
    return h + '</div>';
  }
  function ler(raiz) {
    var s = new Set();
    raiz.querySelectorAll('.tm-tc:checked').forEach(function (c) {
      s.add(+c.value);
    });
    return s;
  }
  function bind(raiz, cb) {
    var subs = raiz.querySelectorAll('.tm-sc');
    function sync() {
      subs.forEach(function (c) {
        var l = [].slice.call(raiz.querySelectorAll('.tm-tc[data-s="' + c.dataset.s + '"]'));
        c.checked = l.length > 0 && l.every(function (x) { return x.checked; });
      });
    }
    subs.forEach(function (c) {
      c.onchange = function () {
        raiz.querySelectorAll('.tm-tc[data-s="' + c.dataset.s + '"]').forEach(function (x) {
          x.checked = c.checked;
        });
        cb && cb();
      };
    });
    raiz.querySelectorAll('.tm-tc').forEach(function (c) {
      c.onchange = function () {
        sync();
        cb && cb();
      };
    });
    raiz.querySelector('.tm-of').onclick = function () {
      raiz.querySelectorAll('.tm-tc').forEach(function (c) {
        c.checked = !unc(+c.value);
      });
      sync();
      cb && cb();
    };
  }
  function tem(sel, q) {
    return q.t.some(function (t) {
      return sel.has(t);
    });
  }
  window.Temas = { html: html, bind: bind, ler: ler, tem: tem };
})();
