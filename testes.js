/* ==========================================================================
   testes.js  —  página "Testes" (modo Sozinho e entrada no modo Multijogador)
   --------------------------------------------------------------------------
   Fluxo:
     route()    decide o que mostrar a partir do endereço (#/solo, #/multi, ...)
     quizCfg()  ecrã de configuração: temas, número de perguntas e tempo
     runView()  mostra a pergunta atual enquanto o teste decorre
     finish()   calcula e mostra o resultado
   O modo multijogador (salas, ranking) está em js/multi.js.

   Dados (vêm de quiz.js):
     TESTS  lista de testes  { s: tema, n: nome do teste }
     QS     lista de perguntas, cada uma com:
              q   texto da pergunta        o   lista de opções
              a   índice da opção certa    e   explicação (HTML)
              u   1 = resposta não confirmada oficialmente
              t   índices dos testes onde a pergunta aparece
              s   tema                     id  número único
   ========================================================================== */

// Atalhos para os dados e para o elemento principal da página.
const T = window.TESTS,
  Q = window.QS,
  $ = (s) => document.querySelector(s),
  main = $('#main');

// Escapa < > & " para o texto das perguntas nunca ser tratado como HTML.
const esc = (s) =>
  s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// Estado do teste:
//   tm    temporizador (setInterval) do relógio
//   S     teste em curso: { live: 1 enquanto decorre, qs: perguntas, ans: respostas dadas,
//                           i: pergunta atual, t0: hora de início, lim: limite em ms (0 = sem),
//                           imm: mostrar a resposta certa logo a seguir a responder }
//   MODE  'solo' | 'multi' | null (ecrã de escolha)
let tm = null,
  S = null,
  MODE = null;
try {
  localStorage.removeItem('qp');
} catch (e) {}

// unc(i)  nº de perguntas "em dúvida" (sem correção oficial) no teste i
// ofi(i)  etiqueta HTML que mostra se o teste tem correção oficial
const unc = (i) => Q.filter((q) => q.t.includes(i) && q.u).length,
  ofi = (i) =>
    unc(i)
      ? `<span class="bd">⚠️ ${unc(i)} em dúvida</span>`
      : '<span class="bd ok">✅ Correção oficial</span>';

// HTML da caixa de seleção (checkbox) de um teste, com nº de perguntas e etiqueta.
const tl = (t, i) =>
  `<label><input type="checkbox" class="tc" data-s="${esc(t.s)}" value="${i}" checked> ${esc(t.n)} (${Q.filter((q) => q.t.includes(i)).length}) ${ofi(i)}</label>`;

// Decide o que mostrar consoante o #hash do endereço. Corre ao abrir a página e quando o hash muda.
function route() {
  if (window.mpActive) return;
  clearInterval(tm);
  if (S && S.live && location.hash === '#/quiz/run') return runView();
  const h = location.hash;
  MODE = h === '#/solo' ? 'solo' : h === '#/multi' ? 'multi' : null;
  if (h && !MODE) history.replaceState(null, '', location.pathname + location.search);
  quizCfg();
  scrollTo(0, 0);
}

// Ecrã inicial: escolher entre fazer o teste Sozinho ou em Multijogador.
function landing() {
  window.mpMode = false;
  main.innerHTML = `<h1 class="t">Testes — Instrutor de Condução</h1><p class="bc">Como queres fazer o teste?</p>${S && S.live ? '<p><a class="btn" href="#/quiz/run">▶ Continuar o teste em curso</a></p>' : ''}
<div class="cards"><a class="card" href="#/solo"><b>🧍 Sozinho</b><small>Escolhe os temas, o número de perguntas e o tempo e faz o teste ao teu ritmo.</small></a><a class="card" href="#/multi"><b>👥 Multijogador</b><small>Cria uma sala ou entra com um código e compete com outras pessoas em direto.</small></a></div>`;
}

// Botão "Escolher o modo": volta ao ecrã inicial sem recarregar a página.
function home(e) {
  e.preventDefault();
  if (location.hash) history.pushState(null, '', location.pathname + location.search);
  route();
}
addEventListener('hashchange', route);
// ---------- Testes

// Ecrã de configuração. Mostra número de perguntas, temas, tempo e (no modo Sozinho)
// o botão "Começar teste", que baralha as perguntas dos temas escolhidos e inicia S.
function quizCfg() {
  if (!MODE) return landing();
  const mp = MODE === 'multi',
    subs = [...new Set(T.map((t) => t.s))];
  main.innerHTML =
    `<p><a class="btn" href="testes.html" onclick="home(event)">← Escolher o modo</a></p><h1 class="t">${mp ? 'Multijogador' : 'Teste sozinho'}</h1>${!mp && S && S.live ? '<p><a class="btn" href="#/quiz/run">▶ Continuar o teste em curso</a></p>' : ''}
<div class="box"><b>Número de perguntas</b> <label>Perguntas: <input type="number" id="qn" value="100" min="1"> <small id="qmax"></small></label></div>
<div class="box"><b>Temas</b>  <button class="btn" id="of" type="button">Selecionar só testes com correção oficial</button>` +
    subs
      .map(
        (s) =>
          `<div class="sub"><label><input type="checkbox" class="sc" data-s="${esc(s)}" checked> <b>${esc(s)}</b></label><div class="tl">` +
          T.map((t, i) => (t.s === s ? tl(t, i) : '')).join('') +
          `</div></div>`,
      )
      .join('') +
    `</div>
<div class="box"><b>Tempo</b><label><input type="radio" name="tm" value="1" checked> Com limite: <input type="number" id="qm" value="120" min="1"> minutos</label><label><input type="radio" name="tm" value="0"> Sem limite de tempo</label></div>
${mp ? '' : '<div class="box"><label><input type="checkbox" id="qi"> Mostrar a resposta certa logo depois de responder</label></div>'}
${mp ? '' : '<button class="btn p" id="go">Começar teste</button>'} <small id="qerr" style="color:var(--ko)"></small>`;
  const pool = () => {
    const sel = new Set([...document.querySelectorAll('.tc:checked')].map((c) => +c.value));
    return Q.filter((q) => q.t.some((t) => sel.has(t)));
  };
  const upd = () => {
    $('#qmax').textContent = '(disponíveis: ' + pool().length + ')';
  };
  upd();
  document.querySelectorAll('.sc').forEach(
    (c) =>
      (c.onchange = () => {
        document
          .querySelectorAll(`.tc[data-s="${c.dataset.s}"]`)
          .forEach((x) => (x.checked = c.checked));
        upd();
      }),
  );
  document.querySelectorAll('.tc').forEach((c) => (c.onchange = upd));
  $('#of').onclick = () => {
    document.querySelectorAll('.tc').forEach((c) => (c.checked = !unc(+c.value)));
    document.querySelectorAll('.sc').forEach((c) => {
      const l = [...document.querySelectorAll(`.tc[data-s="${c.dataset.s}"]`)];
      c.checked = l.length > 0 && l.every((x) => x.checked);
    });
    upd();
  };
  window.mpMode = mp;
  mp && window.mpCfg && window.mpCfg();
  if ($('#go'))
    $('#go').onclick = () => {
      const p = pool(),
        n = Math.min(+$('#qn').value || 100, p.length);
      if (!p.length) return ($('#qerr').textContent = 'Escolhe pelo menos um tema.');
      for (let i = p.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        [p[i], p[j]] = [p[j], p[i]];
      }
      const lim =
        document.querySelector('[name=tm]:checked').value === '1'
          ? Math.max(1, +$('#qm').value || 120) * 60000
          : 0;
      S = { live: 1, qs: p.slice(0, n), ans: [], i: 0, t0: Date.now(), lim, imm: $('#qi').checked };
      history.pushState(null, '', '#/quiz/run');
      runView();
      scrollTo(0, 0);
    };
}

// Converte milissegundos para texto mm:ss (ou h:mm:ss).
const fmt = (ms) => {
  const s = Math.max(0, Math.round(ms / 1000));
  return (
    (s >= 3600 ? Math.floor(s / 3600) + ':' : '') +
    String(Math.floor((s % 3600) / 60)).padStart(2, '0') +
    ':' +
    String(s % 60).padStart(2, '0')
  );
};

// Corre a cada segundo: atualiza o relógio e termina o teste quando o tempo acaba.
function tick() {
  const e = Date.now() - S.t0,
    el = $('#tm');
  if (!el) return;
  if (S.lim) {
    el.textContent = '⏱ ' + fmt(S.lim - e);
    if (e >= S.lim) finish(true);
  } else el.textContent = '⏱ ' + fmt(e);
}

// Desenha a pergunta atual, a grelha de navegação (1, 2, 3...) e os botões Anterior / Seguinte.
function runView() {
  const q = S.qs[S.i],
    a = S.ans[S.i],
    lock = S.imm && a != null;
  main.innerHTML =
    `<div class="qbar"><b>Pergunta ${S.i + 1}/${S.qs.length}</b><span class="tm" id="tm"></span><button class="btn" id="fin">Terminar</button></div>
<div class="nav">${S.qs.map((_, i) => `<button data-i="${i}" class="${S.ans[i] != null ? 'd' : ''} ${i === S.i ? 'c' : ''}">${i + 1}</button>`).join('')}</div>
<div class="qt">${esc(q.q)}</div>` +
    q.o
      .map(
        (o, i) =>
          `<button class="opt ${a === i ? 's' : ''} ${lock ? (i === q.a ? 'ok' : a === i ? 'ko' : '') : ''}" data-o="${i}"><b>${String.fromCharCode(97 + i)})</b> ${esc(o)}</button>`,
      )
      .join('') +
    (lock ? exHtml(q) : '') +
    `<p><button class="btn" id="pv" ${S.i ? '' : 'disabled'}>← Anterior</button> <button class="btn p" id="nx">${S.i < S.qs.length - 1 ? 'Seguinte →' : 'Terminar'}</button></p>`;
  main.querySelectorAll('.nav button').forEach(
    (b) =>
      (b.onclick = () => {
        S.i = +b.dataset.i;
        runView();
      }),
  );
  main.querySelectorAll('.opt').forEach(
    (b) =>
      (b.onclick = () => {
        if (lock) return;
        S.ans[S.i] = +b.dataset.o;
        runView();
      }),
  );
  $('#pv').onclick = () => {
    S.i--;
    runView();
  };
  $('#nx').onclick = () => (S.i < S.qs.length - 1 ? (S.i++, runView()) : finish());
  $('#fin').onclick = () => finish();
  clearInterval(tm);
  tick();
  tm = setInterval(tick, 1000);
}

// HTML com a resposta certa e a explicação.
const exHtml = (q) =>
  `<div class="ex"><b>Resposta certa: ${String.fromCharCode(97 + q.a)})</b>${q.u ? ' <span class="bd">resposta não confirmada</span>' : ''}${q.e}</div>`;

// Fecha o teste e mostra: pontuação, tempo, lista de erros e botão "Refazer as erradas".
// auto = true quando o tempo acabou (não pede confirmação).
function finish(auto) {
  const un = S.qs.length - S.ans.filter((x) => x != null).length;
  if (!auto && un && !confirm(`Tens ${un} pergunta(s) por responder. Terminar mesmo assim?`))
    return;
  clearInterval(tm);
  S.live = 0;
  const wr = S.qs.filter((q, i) => S.ans[i] !== q.a),
    used = Date.now() - S.t0,
    ok = S.qs.filter((q, i) => S.ans[i] === q.a).length,
    n = S.qs.length;
  main.innerHTML = `<h1 class="t">Resultado</h1>${auto ? '<p><b>O tempo terminou.</b></p>' : ''}<div class="res">${ok}/${n} <small>(${Math.round((ok / n) * 100)}%)</small></div><p>Certas: ${ok} · Erradas: ${n - ok - un} · Por responder: ${un} · Tempo: ${fmt(Math.min(used, S.lim || used))}</p>
<p>${wr.length ? `<button class="btn p" id="rt">🔁 Refazer as erradas (${wr.length})</button>` : '<a class="btn p" href="#/solo">Novo teste</a>'}</p><div id="rv"></div>`;
  const show = (all) =>
    ($('#rv').innerHTML =
      S.qs
        .map((q, i) => ({ q, i, a: S.ans[i] }))
        .filter((x) => all || x.a !== x.q.a)
        .map(
          ({ q, i, a }) =>
            `<div class="ri"><b>${i + 1}.</b> <span class="qt">${esc(q.q)}</span>` +
            q.o
              .map(
                (o, k) =>
                  `<div class="opt ${k === q.a ? 'ok' : k === a ? 'ko' : ''}"><b>${String.fromCharCode(97 + k)})</b> ${esc(o)}${k === a ? ' ← a tua resposta' : ''}</div>`,
              )
              .join('') +
            (a == null ? '<small>Sem resposta.</small>' : '') +
            exHtml(q) +
            '</div>',
        )
        .join('') || '<p>Sem erros. 🎉</p>');
  show(false);
  if ($('#rt'))
    $('#rt').onclick = () => {
      const p = wr.slice();
      for (let i = p.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        [p[i], p[j]] = [p[j], p[i]];
      }
      S = { live: 1, qs: p, ans: [], i: 0, t0: Date.now(), lim: S.lim, imm: S.imm };
      history.pushState(null, '', '#/quiz/run');
      runView();
      scrollTo(0, 0);
    };
  scrollTo(0, 0);
}
route();
