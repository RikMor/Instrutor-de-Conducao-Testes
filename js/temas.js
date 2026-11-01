/* temas.js — menu de temas partilhado pelos minijogos (igual ao dos Testes).
   Usa window.TESTS e window.QS (de quiz.js). Mostra os temas com uma caixa que
   marca/desmarca todos os testes do tema, cada teste com o nº de perguntas e a
   etiqueta de correção oficial, e o botão "Selecionar só testes com correção oficial".

     Temas.html(sel)        HTML do menu; sel = Set com os índices dos testes marcados
                            (null = todos marcados)
     Temas.bind(raiz, cb)   liga os eventos do menu dentro de raiz; cb corre a cada alteração
     Temas.ler(raiz)        Set com os índices dos testes marcados
     Temas.tem(sel, q)      true se a pergunta q pertence a algum teste marcado e não foi
                            tirada à mão (Temas.EX = ids das perguntas tiradas)
   O menu inclui "Escolher as perguntas à mão": lista só os testes marcados, com uma caixa
   por pergunta (abre-se por teste). Tirar uma pergunta põe o id em Temas.EX.         */
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
  var EX = new Set();
  function html(sel) {
    var subs = [];
    T.forEach(function (t) {
      if (subs.indexOf(t.s) < 0) subs.push(t.s);
    });
    var h =
      '<div class="tm"><div class="tm-top"><b class="tm-h">Temas</b> <button class="tm-of" type="button">Selecionar só testes com correção oficial</button></div>';
    subs.forEach(function (s) {
      var all = T.every(function (t, i) {
        return t.s !== s || !sel || sel.has(i);
      });
      h +=
        '<div class="tm-sub"><label class="tm-l tm-sh"><input type="checkbox" class="tm-sc" data-s="' +
        esc(s) +
        '"' +
        (all ? ' checked' : '') +
        '> <b>' +
        esc(s) +
        '</b></label><div class="tm-tl">';
      T.forEach(function (t, i) {
        if (t.s !== s) return;
        h +=
          '<label class="tm-l tm-t"><input type="checkbox" class="tm-tc" data-s="' +
          esc(s) +
          '" value="' +
          i +
          '"' +
          (!sel || sel.has(i) ? ' checked' : '') +
          '> <span class="tm-tn">' +
          esc(t.n) +
          '</span> <span class="tm-tq">' +
          n(i) +
          (n(i) === 1 ? ' pergunta' : ' perguntas') +
          '</span> ' +
          badge(i) +
          '</label>';
      });
      h += '</div></div>';
    });
    h +=
      '<details class="tm-pk"><summary><b>Escolher as perguntas à mão</b> <small class="tm-pc"></small></summary>' +
      '<p><small>Por defeito entram todas as perguntas dos testes marcados. Abre um teste e tira as que não queres.</small></p>' +
      '<p class="tm-pn" hidden><small>Marca primeiro um teste.</small></p><div class="tm-pl"></div></details>';
    return h + '</div>';
  }
  // Lista de perguntas por teste (só dos testes marcados); as perguntas só se desenham ao abrir o teste.
  function pick(raiz, cb) {
    var box = raiz.querySelector('.tm-pl');
    box.innerHTML = T.map(function (t, i) {
      return (
        '<details data-t="' + i + '"><summary>' + esc(t.s) + ' — ' + esc(t.n) + ' (' + n(i) + ')</summary><div class="tm-ql"></div></details>'
      );
    }).join('');
    function sync() {
      var sel = ler(raiz),
        k = Q.filter(function (q) {
          return EX.has(q.id) && tem0(sel, q);
        }).length;
      raiz.querySelector('.tm-pc').textContent = k ? '(' + k + ' tiradas)' : '';
      box.querySelectorAll('details').forEach(function (d) {
        d.hidden = !sel.has(+d.dataset.t);
      });
      raiz.querySelector('.tm-pn').hidden = sel.size > 0;
    }
    box.querySelectorAll('details').forEach(function (d) {
      d.ontoggle = function () {
        var ql = d.querySelector('.tm-ql');
        if (!d.open || ql.dataset.ok) return;
        ql.dataset.ok = 1;
        var i = +d.dataset.t,
          l = [];
        Q.forEach(function (q) {
          var j = q.t.indexOf(i);
          if (j >= 0) l.push([q.p[j], q]);
        });
        l.sort(function (a, b) {
          return a[0] - b[0];
        });
        ql.innerHTML =
          '<p><button type="button" class="tm-btn tm-qa" data-v="1">Marcar todas</button> <button type="button" class="tm-btn tm-qa" data-v="0">Desmarcar todas</button></p>' +
          l
            .map(function (x) {
              return (
                '<label class="tm-qr"><input type="checkbox" class="tm-qx" value="' + x[1].id + '"' + (EX.has(x[1].id) ? '' : ' checked') + '> <span>' + x[0] + '. ' + esc(x[1].q) + '</span></label>'
              );
            })
            .join('');
      };
    });
    box.onchange = function (e) {
      if (!e.target.classList.contains('tm-qx')) return;
      var id = +e.target.value;
      e.target.checked ? EX.delete(id) : EX.add(id);
      box.querySelectorAll('.tm-qx[value="' + id + '"]').forEach(function (x) {
        x.checked = e.target.checked;
      });
      sync();
      cb && cb();
    };
    box.onclick = function (e) {
      var b = e.target.closest('.tm-qa');
      if (!b) return;
      b.closest('details').querySelectorAll('.tm-qx').forEach(function (x) {
        x.checked = b.dataset.v === '1';
        x.checked ? EX.delete(+x.value) : EX.add(+x.value);
      });
      sync();
      cb && cb();
    };
    sync();
    return sync;
  }
  function ler(raiz) {
    var s = new Set();
    raiz.querySelectorAll('.tm-tc:checked').forEach(function (c) {
      s.add(+c.value);
    });
    return s;
  }
  function bind(raiz, cb0) {
    var sync = pick(raiz, cb0),
      cb = function () {
        sync();
        cb0 && cb0();
      };
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
  function tem0(sel, q) {
    return q.t.some(function (t) {
      return sel.has(t);
    });
  }
  function tem(sel, q) {
    return tem0(sel, q) && !EX.has(q.id);
  }
  window.Temas = { html: html, bind: bind, ler: ler, tem: tem, EX: EX };
})();
