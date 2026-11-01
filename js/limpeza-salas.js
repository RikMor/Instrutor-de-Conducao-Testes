/* ==========================================================================
   limpeza-salas.js  —  apaga salas expiradas da base de dados
   --------------------------------------------------------------------------
   Cada sala e cada jogador têm um campo "expira" (ver firebase-config.js).
   Como o projeto está no plano gratuito do Firebase, não dá para usar a política
   TTL (precisa de faturação ativada). Em vez disso, quem abre o multijogador apaga
   as salas cuja data já passou, juntamente com os jogadores delas.

   Limites:
     - Só apaga quando alguém abre o multijogador de qualquer um dos jogos.
     - Só encontra salas com o campo "expira" (as antigas apagam-se à mão).
     - Apaga no máximo 10 salas de cada vez, para ser rápido e barato.
     - Se as regras do Firestore não permitirem apagar, falha em silêncio:
       o jogo não é afetado.
   ========================================================================== */

import {
  collection,
  deleteDoc,
  getDocs,
  limit,
  query,
  Timestamp,
  where,
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

const MAX_SALAS_POR_VEZ = 10;

export async function limparSalasExpiradas(db) {
  try {
    // Salas com "expira" anterior a agora.
    const expiradas = await getDocs(
      query(
        collection(db, 'rooms'),
        where('expira', '<', Timestamp.now()),
        limit(MAX_SALAS_POR_VEZ),
      ),
    );
    for (const sala of expiradas.docs) {
      // Primeiro os jogadores (a subcoleção não se apaga sozinha com a sala), depois a sala.
      const jogadores = await getDocs(collection(db, 'rooms', sala.id, 'players'));
      await Promise.all(jogadores.docs.map((j) => deleteDoc(j.ref)));
      await deleteDoc(sala.ref);
    }
  } catch (e) {
    // Sem permissão ou sem ligação: ignora, a limpeza é só um extra.
  }
}
