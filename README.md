# Instrutor de Condução — Testes e jogos

Site de estudo para o curso de instrutor de condução. Abre `index.html` num browser (ou publica a pasta toda) e escolhe uma das três opções.

## Estrutura

```
index.html              página inicial (escolher o que fazer)
testes.html             testes por tema, sozinho ou em multijogador
milionario.html         jogo "Quem quer ser milionário?"
Torre_das_Cartas.html   jogo "Torre das Cartas"
quiz.js                 DADOS: todas as perguntas e a lista de testes

css/                    aspeto de cada página (um ficheiro por página)
  index.css  testes.css  milionario.css  torre.css

js/                     comportamento de cada página
  testes.js             testes: configuração, perguntas, resultado
  multi.js              multijogador (salas em tempo real, Firebase)
  milionario.js         jogo do milionário
  torre.js              jogo da torre
```

Cada ficheiro `.html` só tem a estrutura da página; o CSS e o JavaScript estão nos ficheiros das pastas `css/` e `js/`. No topo de cada ficheiro JS há um resumo de como funciona e, antes de cada função, um comentário a explicar o que faz.

## Formato das perguntas (`quiz.js`)

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

`quiz.js` não foi alterado: é um ficheiro de dados com cerca de 450 KB, pensado para ser gerado e não para ser lido.

## Onde mudar o quê

- **Prémios do milionário** — `PRIZE` e `SAFE` no início de `js/milionario.js`.
- **Cartas, inimigos e andares da torre** — `CARDS`, `FOES` e `FL` em `js/torre.js`.
- **Cores de cada página** — variáveis no `:root` do respetivo ficheiro em `css/`.
- **Ligação ao Firebase** — início de `js/multi.js`.


