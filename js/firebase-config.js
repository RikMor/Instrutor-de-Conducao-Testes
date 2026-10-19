/* ==========================================================================
   firebase-config.js  —  ligação ao projeto Firebase (partilhada)
   --------------------------------------------------------------------------
   Usada pelo multijogador dos testes (multi.js) e pelo do milionário
   (milionario-multi.js). Estas chaves identificam o projeto e não são secretas;
   a proteção está nas regras do Firestore.
   ========================================================================== */

export const firebaseConfig = {
  apiKey: 'AIzaSyAQAbI8Ipib04YJIevhlrdY8H_TQee6l2Y',
  authDomain: 'instrutor-de-codigo.firebaseapp.com',
  projectId: 'instrutor-de-codigo',
  storageBucket: 'instrutor-de-codigo.firebasestorage.app',
  messagingSenderId: '659205376818',
  appId: '1:659205376818:web:a88029ea8c02df049f652b',
};

// Quanto tempo uma sala e os seus jogadores ficam na base de dados. Cada documento leva um campo
// "expira" (data) e o Firebase apaga-o sozinho depois dessa data, se tiveres ativado a política
// TTL (ver README). Sem a política, o campo existe mas nada é apagado.
export const VALIDADE_SALA_MS = 24 * 60 * 60 * 1000; // 24 horas
