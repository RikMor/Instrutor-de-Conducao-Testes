# Instrutor de Condução — Testes e jogos

Site de estudo para o curso de instrutor de condução. Publica a pasta toda (GitHub Pages) e escolhe uma das quatro opções.

**As perguntas e o texto do manual não estão neste repositório**: estão no Firestore (coleção `conteudo`) e só se leem com um código de acesso (ver «Conteúdo protegido»). Sem o Firebase configurado, as páginas mostram o ecrã do código e não carregam nada.

## Estrutura

```
index.html              página inicial (escolher o que fazer)
manual.html             manual de estudo (texto da matéria, por módulo)
testes.html             testes por tema, sozinho ou em multijogador
milionario.html         jogo "Quem quer ser milionário?"
Torre_das_Cartas.html   jogo "Torre das Cartas"

css/                    aspeto de cada página (um ficheiro por página)
  index.css  manual.css  testes.css  milionario.css  torre.css

js/                     comportamento de cada página
  dados.js              código de acesso e carregamento das perguntas e do manual (Firebase)
  manual.js             manual: índice, leitura e pesquisa
  testes.js             testes: configuração, perguntas, resultado
  multi.js              multijogador dos testes (salas em tempo real, Firebase)
  milionario.js         jogo do milionário
  milionario-multi.js   multijogador do milionário (até 4 jogadores, todos contra todos)
  firebase-config.js    ligação ao Firebase, partilhada pelos dois multijogadores
  limpeza-salas.js      apaga salas expiradas (usado pelos dois multijogadores)
  torre.js              jogo da torre
```

Cada ficheiro `.html` só tem a estrutura da página; o CSS e o JavaScript estão nos ficheiros das pastas `css/` e `js/`. No topo de cada ficheiro JS há um resumo de como funciona e, antes de cada função, um comentário a explicar o que faz.

## Manual (`manual.html`)

O manual tem 12 módulos em 4 grupos: **Manuais** (Psicologia na Condução, Métodos de Ensino e Pedagogia, Trânsito e Segurança Rodoviária com as imagens dos sinais, Técnica Automóvel, Primeiros Socorros), **Resumos das aulas**, **Legislação** (Lei 14/2014, Portaria 185/2015, Código da Estrada/DL 102-B/2020, Portaria 1/2024, RST) e **Relatórios** (ANSR 2025).

- O índice (módulos, secções, títulos) e o texto de cada módulo estão no Firestore (`conteudo/manual-index` e `conteudo/m-<módulo>`); o texto de cada módulo só é pedido quando se abre esse módulo (ou na primeira pesquisa, que precisa de todos). Os ficheiros originais ficam só no teu computador e enviam-se com `enviar-dados.mjs`.
- As imagens estão em `img/` (são os sinais oficiais, ficam no repositório).
- No telemóvel, o índice abre com os 3 riscos ou a arrastar do canto esquerdo para a direita (como no Obsidian); fecha a arrastar para a esquerda ou a tocar fora.
- A pesquisa à esquerda funciona como a do Obsidian: escreve uma palavra ou uma frase e procura no texto de todas as notas (sem distinguir maiúsculas nem acentos, mesmo que a frase passe de uma linha para a seguinte). Mostra primeiro as notas com a frase exata e depois as que têm todas as palavras; entre aspas obriga à frase exata. Ao abrir um resultado, o texto fica destacado, com setas para saltar entre ocorrências.
- O texto é igual ao das notas do vault (inclui índices e introduções, sem as notas sobre os PDFs nem as referências a páginas; nos Resumos das aulas não há imagens (fotos e desenhos); as ligações para canvas não são clicáveis no site). Estes ficheiros são gerados a partir do vault; não se editam à mão.

## Formato das perguntas (`js/quiz.js`)

Cada pergunta é um objeto:

| Campo | Significado |
|-------|-------------|
| `q`   | texto da pergunta |
| `o`   | lista de opções |
| `a`   | índice da opção certa (0 = primeira) |
| `e`   | explicação (HTML) |
| `u`   | `1` se a resposta não está confirmada oficialmente |
| `t`   | índices dos testes onde a pergunta aparece |
| `s`   | tema |
| `id`  | número único |

O ficheiro `js/quiz.js` (dados, gerado, não pensado para ser lido) já não está no repositório: fica só no teu computador e é enviado para o Firestore com `enviar-dados.mjs` (`conteudo/quiz`).

## Multijogador do milionário

No ecrã inicial do milionário, o botão **Multijogador (até 4)** usa os temas escolhidos nesse ecrã.

- Um jogador cria a sala e passa o código de 4 letras aos outros. São precisos entre 2 e 4 jogadores.
- São 15 perguntas, cada vez mais difíceis, iguais para todos e ao mesmo tempo (o tempo por pergunta escolhe-se ao criar a sala).
- Quem acerta ganha o valor da pergunta (de 100 € a 1.000.000 €) mais até 50% de bónus pela rapidez. Errar ou não responder não custa nada.
- Ganha quem tiver mais dinheiro no fim; em caso de empate, quem acertou mais e respondeu mais depressa.
- O anfitrião controla o avanço (e tem o botão "Pergunta seguinte"). Se o anfitrião sair, a sala é apagada.

Usa a mesma coleção `rooms` do Firestore que o multijogador dos testes (com `game: 'milionario'` na sala), por isso as regras publicadas devem servir para os dois. Para testar no mesmo computador usa dois browsers diferentes (ou uma janela anónima): o Firebase dá o mesmo jogador a dois separadores do mesmo browser.

## Limpeza das salas antigas

Cada sala e cada jogador gravam um campo `expira` (24 horas depois de criados). Quando alguém abre o multijogador (dos testes ou do milionário), `js/limpeza-salas.js` apaga até 10 salas já expiradas, juntamente com os jogadores delas.

- Não precisa de configurar nada no Firebase. A política TTL do Firebase não serve neste projeto porque exige o plano pago (faturação ativada).
- Só apaga quando alguém abre o multijogador; se ninguém o abrir durante dias, as salas ficam até lá.
- Salas criadas antes desta versão não têm `expira` e nunca são apagadas por aqui; apaga-as à mão em Firestore Database > `rooms` (primeiro a coleção `players`, depois a sala).
- Se as regras do Firestore não permitirem apagar, a limpeza falha em silêncio e o jogo não é afetado.
- A validade (24 horas) muda-se em `VALIDADE_SALA_MS`, em `js/firebase-config.js`.

## Conteúdo protegido

- As regras do Firestore só deixam ler `conteudo/*` a quem tem um documento em `acessos/<uid>`. Esse documento só se cria com o código certo (guardado em `config/convite`, que ninguém lê pelo site). Cada pessoa escreve o código uma vez por browser.
- **Mudar uma pergunta ou uma nota**: edita os ficheiros originais no teu computador e corre outra vez `node enviar-dados.mjs ...` (substitui os documentos). Não é preciso mexer no GitHub.
- **Retirar o acesso a alguém**: apaga o documento dessa pessoa em Firestore > `acessos` (não se sabe quem é quem, por isso, se houver fuga, apaga todos e muda o código em `config/convite`).
- **Mudar o código**: edita o campo `codigo` em `config/convite`. Quem já entrou continua com acesso até apagares o respetivo documento em `acessos`.
- Quem tem acesso vê o conteúdo no browser, por isso pode copiá-lo à mão ou com um script. O código só impede o acesso do público em geral; dá-o a quem confias.

## Onde mudar o quê

- **Prémios do milionário** — `PRIZE` e `SAFE` no início de `js/milionario.js`.
- **Valor das perguntas e bónus no multijogador** — `valorDaRonda`, `BONUS_MAX`, `MAX_JOGADORES` e `PAUSA_REVELACAO_MS` no início de `js/milionario-multi.js`.
- **Cartas, inimigos e andares da torre** — `CARDS`, `FOES` e `FL` em `js/torre.js`.
- **Cores de cada página** — variáveis no `:root` do respetivo ficheiro em `css/`.
- **Ligação ao Firebase** — `js/firebase-config.js`.

## Nota

O site precisa de internet (as perguntas e o manual vêm do Firebase) e de as regras do Firestore estarem publicadas. Depois de carregados, os testes e os jogos a solo funcionam até fechares a página.
