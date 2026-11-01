/* manual-popup.js — botão "📖 Ver no manual" e janela com o manual (usado nos Testes).
   Precisa de js/manual-refs.js (de cada pergunta para a nota do manual e a frase a destacar).
   ManualPopup.btn(q)  -> HTML do botão (vazio se a pergunta não tiver ligação)
   ManualPopup.open(to) -> abre o manual em 'nota?h=frase'
   Os botões são ouvidos por um único "click" no documento, por isso funcionam em HTML criado a qualquer momento. */
(function () {
  var box, frame;
  var css =
    '.mp{position:fixed;inset:0;z-index:100;display:grid;place-items:center;background:rgba(0,0,0,.7)}.mp[hidden]{display:none}' +
    '.mp-d{width:min(1100px,96vw);height:92vh;display:flex;flex-direction:column;background:#10151d;border:1px solid #263040;border-radius:12px;overflow:hidden}' +
    '.mp-h{display:flex;justify-content:space-between;align-items:center;padding:.5rem .8rem;color:#e4e8ef;font:600 1rem system-ui,sans-serif}' +
    '.mp-h button{font:inherit;padding:.4rem 1rem;border-radius:99px;border:1px solid #6ea3ff;background:transparent;color:#e4e8ef;cursor:pointer}' +
    '.mp-d iframe{flex:1;border:0;width:100%;background:#fff}' +
    '@media(max-width:760px){.mp-d{width:100vw;height:100dvh;border-radius:0}}';

  function build() {
    if (box) return;
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
    box = document.createElement('div');
    box.className = 'mp';
    box.hidden = true;
    box.innerHTML = '<div class="mp-d" role="dialog" aria-modal="true" aria-label="Manual"><div class="mp-h"><b>📖 Manual</b><button type="button" data-mp-close>Fechar</button></div><iframe title="Manual"></iframe></div>';
    document.body.appendChild(box);
    frame = box.querySelector('iframe');
  }
  var downOn = null;
  function close() { if (box) box.hidden = true; }
  function open(to) {
    build();
    var url = 'manual.html?embed=1#/' + to;
    if (!frame.getAttribute('src')) frame.src = url;
    else {
      try {
        if (frame.contentWindow.location.hash === '#/' + to) frame.contentWindow.location.reload();
        else frame.contentWindow.location.hash = '#/' + to;
      } catch (e) { frame.src = url; }
    }
    box.hidden = false;
  }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
  function btn(q) {
    var r = window.QREF && q && window.QREF[q.id];
    if (!r) return '';
    var to = window.QREF_N[r[0]] + '?' + r.slice(1).map(function (p) { return 'h=' + encodeURIComponent(p); }).join('&');
    return '<p><button type="button" class="btn" data-man="' + esc(to) + '">📖 Ver no manual</button></p>';
  }
  document.addEventListener('mousedown', function (e) { downOn = e.target; }, true);
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-man]');
    if (b) { e.preventDefault(); open(b.getAttribute('data-man')); return; }
    if (box && !box.hidden && ((e.target.closest && e.target.closest('[data-mp-close]')) || (e.target === box && downOn === box))) close();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  window.ManualPopup = { btn: btn, open: open, close: close };
})();
