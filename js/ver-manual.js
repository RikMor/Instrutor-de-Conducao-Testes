/* ==========================================================================
   ver-manual.js  —  botão "📖 Manual" em cada resposta
   --------------------------------------------------------------------------
   Põe, a seguir à explicação de uma resposta, um botão que abre o manual numa janela por cima
   da página, já na nota onde está a resposta e com a frase destacada.

   Como encontra a nota:
     1. Se a pergunta tiver ligação em js/manual-refs.js (window.QREF / window.QREF_N), usa-a:
          QREF[id da pergunta] = [chave da nota, frase a destacar, outra frase, ...]
          QREF_N[chave da nota] = id da nota no manual
     2. Senão, o próprio manual procura (manual.js, rota "achar"): compara a pergunta, a resposta
        certa e a explicação com as frases de todas as notas e abre a melhor.

   Uso nas páginas:
     VerManual.btn(q)           HTML do botão (vazio se a pergunta foi anulada)
     VerManual.destino(q)       parte do endereço do manual:  <nota>?h=<frase>  ou  achar?p=...
   O clique é tratado aqui (um só ouvinte para a página toda).
   ========================================================================== */
(function () {
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const semHtml = (h) => String(h || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

  // Texto da resposta certa. Aceita opções em texto (q.o[q.a]) ou objetos { t, ok } (milionário).
  function certaDe(q) {
    if (!Array.isArray(q.o)) return '';
    const ok = q.o.find((o) => o && typeof o === 'object' && o.ok);
    const o = ok || q.o[q.a];
    return o == null ? '' : typeof o === 'object' ? o.t : o;
  }

  function destino(q) {
    const ref = window.QREF && window.QREF[q.id];
    if (ref && window.QREF_N && window.QREF_N[ref[0]])
      return window.QREF_N[ref[0]] + '?' + ref.slice(1).map((f) => 'h=' + encodeURIComponent(f)).join('&');
    const u = (k, v) => k + '=' + encodeURIComponent(v);
    return 'achar?' + [u('p', semHtml(q.q)), u('r', semHtml(certaDe(q))), u('e', semHtml(q.e).slice(0, 400))].join('&');
  }

  function btn(q) {
    if (!q || q.a < 0) return ''; // pergunta anulada: não há resposta para procurar
    return `<button type="button" class="vm-btn" data-vm="${esc(destino(q))}">📖 Manual</button>`;
  }

  // O estilo do botão e da janela carrega logo com o script (as páginas não precisam de o pedir).
  if (!document.querySelector('link[href$="css/ver-manual.css"]')) {
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'css/ver-manual.css';
    document.head.appendChild(l);
  }

  // ---------- Janela do manual ----------
  let caixa = null;
  function criar() {
    caixa = document.createElement('div');
    caixa.className = 'vm';
    caixa.hidden = true;
    caixa.innerHTML =
      '<div class="vm-dlg" role="dialog" aria-modal="true" aria-label="Manual"><div class="vm-h"><b>📖 Manual</b><button type="button" class="vm-x">Fechar</button></div><iframe title="Manual"></iframe></div>';
    document.body.appendChild(caixa);
    caixa.addEventListener('click', (e) => {
      if (e.target === caixa || e.target.closest('.vm-x')) fechar();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !caixa.hidden) fechar();
    });
  }
  function abrir(to) {
    if (!caixa) criar();
    const fr = caixa.querySelector('iframe'),
      url = 'manual.html?embed=1#/' + to;
    if (!fr.getAttribute('src')) fr.src = url;
    else {
      try {
        if (fr.contentWindow.location.hash === '#/' + to) fr.contentWindow.location.reload();
        else fr.contentWindow.location.hash = '#/' + to;
      } catch (e) {
        fr.src = url;
      }
    }
    caixa.hidden = false;
    document.body.classList.add('vm-aberto');
    caixa.querySelector('.vm-x').focus();
  }
  function fechar() {
    caixa.hidden = true;
    document.body.classList.remove('vm-aberto');
  }

  document.addEventListener('click', (e) => {
    const b = e.target.closest && e.target.closest('[data-vm]');
    if (b) {
      e.preventDefault();
      abrir(b.dataset.vm);
    }
  });

  window.VerManual = { btn, destino, abrir };
})();
