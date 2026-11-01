/* ==========================================================================
   dados.js  —  acesso e carregamento do conteúdo protegido (Firebase)
   --------------------------------------------------------------------------
   As perguntas e o texto do manual já não estão no repositório: estão no Firestore, em
   documentos comprimidos (gzip) na coleção "conteudo":
       conteudo/quiz           { TESTS, QS }        perguntas e lista de testes
       conteudo/manual-index   MANUAL_INDEX         módulos, secções e títulos do manual
       conteudo/m-<módulo>     [{ id, h }, ...]     texto das notas de cada módulo

   Quem pode ler: só quem tem um documento em "acessos/<o seu uid>" cujo código ainda existe em
   "convites/<código>". Cada pessoa tem o seu código (criado à mão no Firestore, com o nome dela),
   por isso apagar convites/<código> corta o acesso a quem o usou. Ninguém consegue ler a
   coleção "convites". Quem já entrou neste browser não precisa de escrever o código outra vez.
   As regras estão em SO-NO-TEU-PC/regras-firestore.txt.

   Cada página chama iniciar({ quiz, manualIndex, scripts }): pede o acesso, carrega os
   dados que a página precisa (window.TESTS, window.QS, window.MANUAL_INDEX) e só depois
   carrega os scripts da página, pela ordem indicada.
   ========================================================================== */

import { initializeApp, getApps, getApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { firebaseConfig } from './firebase-config.js';

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ---------- Ecrã por cima da página (a carregar / pedir código / erro) ----------
let veu = null;
function ecra(html) {
  if (!veu) {
    veu = document.createElement('div');
    veu.style.cssText =
      'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;' +
      'padding:1rem;background:#12151c;color:#eef1f6;font:16px/1.5 Barlow,system-ui,sans-serif;';
    document.body.appendChild(veu);
  }
  veu.innerHTML = '<div style="max-width:24rem;width:100%;text-align:center">' + html + '</div>';
}
function tirarEcra() {
  if (veu) veu.remove();
  veu = null;
}
const ESTILO_INPUT =
  'width:100%;box-sizing:border-box;padding:.7rem .8rem;margin:.8rem 0 .5rem;border-radius:.5rem;' +
  'border:1px solid #556;background:#1c212c;color:inherit;font:inherit;text-align:center;letter-spacing:.05em';
const ESTILO_BOTAO =
  'padding:.7rem 1.4rem;border:0;border-radius:.5rem;background:#f5b700;color:#111;font:inherit;font-weight:600;cursor:pointer';

// ---------- Autenticação anónima (a mesma conta que o multijogador usa) ----------
async function entrar() {
  await auth.authStateReady();
  if (!auth.currentUser) await signInAnonymously(auth);
  return auth.currentUser.uid;
}

async function jaTemAcesso(uid) {
  try {
    return (await getDoc(doc(db, 'acessos', uid))).exists();
  } catch (e) {
    return false;
  }
}

// Mostra o ecrã do código e espera até estar certo.
function pedirCodigo(uid, aviso) {
  return new Promise((resolve) => {
    ecra(
      '<h2 style="margin:0 0 .3rem">Instrutor de Condução</h2>' +
        '<p style="margin:0;opacity:.8">Este site é de acesso reservado. Escreve o teu código de acesso.</p>' +
        '<input id="dd-codigo" type="password" autocomplete="new-password" autocapitalize="off" spellcheck="false" style="' + ESTILO_INPUT + '" />' +
        '<button id="dd-ver" type="button" style="background:none;border:0;color:#9fb0c8;font:inherit;font-size:.9rem;cursor:pointer;text-decoration:underline">Mostrar código</button>' +
        '<p id="dd-aviso" style="min-height:1.5em;margin:0 0 .5rem;color:#ff8a80">' + (aviso || '') + '</p>' +
        '<button id="dd-ok" style="' + ESTILO_BOTAO + '">Entrar</button>',
    );
    const campo = veu.querySelector('#dd-codigo'),
      msg = veu.querySelector('#dd-aviso'),
      botao = veu.querySelector('#dd-ok');
    campo.focus();
    // O código aparece escondido (pontos); o botão mostra-o se precisares de confirmar o que escreveste.
    const ver = veu.querySelector('#dd-ver');
    ver.onclick = () => {
      const esconder = campo.type === 'text';
      campo.type = esconder ? 'password' : 'text';
      ver.textContent = esconder ? 'Mostrar código' : 'Esconder código';
    };
    const enviar = async () => {
      const codigo = campo.value.trim();
      if (!codigo) return;
      botao.disabled = true;
      msg.textContent = '';
      try {
        // As regras só deixam gravar se existir convites/<código>.
        await setDoc(doc(db, 'acessos', uid), { codigo, criado: serverTimestamp() });
        resolve();
      } catch (e) {
        botao.disabled = false;
        msg.textContent =
          e && e.code === 'permission-denied' ? 'Código inválido ou retirado.' : 'Não foi possível verificar o código. Verifica a ligação.';
        campo.select();
      }
    };
    botao.onclick = enviar;
    campo.onkeydown = (ev) => {
      if (ev.key === 'Enter') enviar();
    };
  });
}

async function garantirAcesso() {
  const uid = await entrar();
  if (!(await jaTemAcesso(uid))) await pedirCodigo(uid);
  return uid;
}

// ---------- Ler e descomprimir um documento de "conteudo" ----------
const CACHE = new Map();
async function gunzipJSON(bytes) {
  const fluxo = new Blob([bytes.toUint8Array()]).stream().pipeThrough(new DecompressionStream('gzip'));
  return JSON.parse(await new Response(fluxo).text());
}
function lerConteudo(nome) {
  if (!CACHE.has(nome)) {
    const p = getDoc(doc(db, 'conteudo', nome)).then((s) => {
      if (!s.exists()) throw new Error('Falta o conteúdo "' + nome + '" no Firestore.');
      return gunzipJSON(s.data().gz);
    });
    p.catch(() => CACHE.delete(nome));
    CACHE.set(nome, p);
  }
  return CACHE.get(nome);
}

// ---------- Carregar scripts da página, pela ordem ----------
function carregarScript(item) {
  const src = typeof item === 'string' ? item : item.src;
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    if (typeof item !== 'string' && item.module) s.type = 'module';
    else s.async = false;
    s.src = src;
    s.onload = resolve;
    // { src, opcional: true }: se o ficheiro não existir, a página continua sem ele.
    s.onerror = () =>
      typeof item !== 'string' && item.opcional ? resolve() : reject(new Error('Não foi possível carregar ' + src));
    document.body.appendChild(s);
  });
}

// ---------- Ponto de entrada de cada página ----------
async function carregarDados(opc) {
  if (opc.quiz) {
    const d = await lerConteudo('quiz');
    window.TESTS = d.TESTS;
    window.QS = d.QS;
  }
  if (opc.manualIndex) window.MANUAL_INDEX = await lerConteudo('manual-index');
  // Usado por manual.js para pedir o texto de cada módulo quando é preciso.
  window.DADOS = { modulo: (id) => lerConteudo('m-' + id) };
}

export async function iniciar(opc) {
  ecra('<p>A carregar…</p>');
  try {
    const uid = await garantirAcesso();
    ecra('<p>A carregar…</p>');
    try {
      await carregarDados(opc);
    } catch (e) {
      if (!(e && e.code === 'permission-denied')) throw e;
      // O convite desta pessoa foi apagado: pede outro código (substitui o acesso antigo).
      CACHE.clear();
      await pedirCodigo(uid, 'O teu acesso foi retirado. Escreve um código válido.');
      ecra('<p>A carregar…</p>');
      await carregarDados(opc);
    }
    for (const sc of opc.scripts || []) await carregarScript(sc);
    tirarEcra();
  } catch (e) {
    console.error(e);
    ecra(
      '<p>Não foi possível carregar o conteúdo. Verifica a ligação e tenta outra vez.</p>' +
        '<button id="dd-r" style="' + ESTILO_BOTAO + '">Tentar outra vez</button>',
    );
    veu.querySelector('#dd-r').onclick = () => location.reload();
  }
}
