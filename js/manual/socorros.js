/* ============================================================
   MÓDULO: Primeiros Socorros   (grupo: Manuais)
   Ficheiro gerado a partir do vault — não editar à mão.

   Cada nota é um bloco { id, h }:
     id = identificador da nota (o mesmo que aparece no endereço #/id)
     h  = texto da nota em HTML

   Notas deste módulo (33):
       1. Índice
       2. Primeiros Socorros - Fundamentos e Segurança do Socorrista
       3. Atuar numa Emergência
       4. Cadeia de Sobrevivência
       5. Sinais e Sintomas
       6. Ligar o 112 para Pedir Ajuda
       7. Mala de Primeiros Socorros e Medicamentos
       8. Pensos e Ligaduras
       9. Suporte Básico de Vida (SBV) - Adulto
      10. Manobras de SBV - Recém-Nascidos
      11. Posição Lateral de Segurança (PLS)
      12. Hipoxia e Obstrução das Vias Aéreas
      13. Engasgamento e Desobstrução das Vias Aéreas em Crianças
      14. Asma
      15. Choque e Hemorragia Interna
      16. Choque Anafilático
      17. Desmaio
      18. Tipos de Hemorragias e Feridas
      19. Epistaxis (Sangramento pelo Nariz)
      20. Feridas
      21. Fraturas
      22. Luxação de uma Articulação
      23. Entorses e Distensões
      24. Alterações de Consciência
      25. Traumatismos Craneoencefálicos (TCE)
      26. Convulsões nas Crianças
      27. Queimaduras - Avaliação e Queimaduras Ligeiras
      28. Queimaduras Graves e por Choque Elétrico
      29. Queimaduras por Agentes Químicos
      30. Farpa e Corpos Estranhos (Olhos e Ouvidos)
      31. Envenenamento - Ingestão, Químicos na Pele e nos Olhos
      32. Intoxicação Alimentar
      33. Picada de Insecto e Mordedura de Animal
   ============================================================ */

MANUAL_LOAD("socorros", [

  // ===== 1. Índice =====
  {
    id: "socorros-00-indice",
    h: `<h1>Manual de Primeiros Socorros</h1>
<p>Formador: Paulo Cavaleiro, 2024.</p>
<h2>Conteúdo programático</h2>
<ul>
<li>Tipos de acidente</li>
<li>Comportamentos perante o sinistrado</li>
<li>Prevenção do agravamento do acidente</li>
<li>Alerta dos serviços de socorro público</li>
<li>Exame do sinistrado</li>
<li>Socorros de urgência</li>
<li>Primeiros socorros e conselhos de prevenção nos diferentes casos de dificuldade respiratória</li>
<li>Dificuldades respiratórias – descrição</li>
<li>Socorros de urgência</li>
<li>Reanimação cardiorrespiratória</li>
<li>Feridas, fraturas, acidentes respiratórios, acidentes digestivos, acidentes pelos agentes físicos, envelhecimento</li>
<li>Acidentes inerentes à profissão</li>
<li>Queimadura</li>
<li>Por corrente elétrica</li>
<li>Hemorragia externa por ferimento (corte)</li>
<li>Comportamentos a seguir</li>
<li>Esterilização dos instrumentos</li>
<li>Prevenção dos acidentes de trabalho, supressão de risco, proteção coletiva, proteção individual, sinalização</li>
<li>Serviço Nacional de Proteção Civil</li>
<li>O socorrismo e realidade</li>
<li>A Profissão confrontada com a doença</li>
<li>Prevenção de acidentes e doenças profissionais</li>
<li>Higiene do profissional</li>
<li>Higiene do meio ambiente</li>
<li>Revisão de atuação em diferentes casos</li>
<li>Revisão dos efeitos tardios em certos acidentes</li>
<li>Primeiros Socorros/Socorrista</li>
<li>Higiene e Segurança</li>
<li>Técnicas e Equipamento; Cadeia de Sobrevivência</li>
<li>Noções de Suporte Básico de Vida (SBV) e Posição Lateral de Segurança (PLS)</li>
<li>Prevenção e Tratamento de Situações de emergência</li>
</ul>
<h2>Objetivos específicos</h2>
<ul>
<li>Identificar princípios gerais do socorrismo;</li>
<li>Uniformizar procedimentos relativos à prestação de primeiros socorros;</li>
<li>Intervir em situações de emergência;</li>
<li>Relacionar situações de suporte básico de vida;</li>
<li>Prever e atuar em situações de emergência.</li>
</ul>
<h2>Índice de secções</h2>
<h3>Primeiros socorros — fundamentos</h3>
<ul>
<li><a href="#/socorros-01-primeiros-socorros-fundamentos-e-seguranca-do-socorrista">01 Primeiros Socorros - Fundamentos e Segurança do Socorrista</a></li>
<li><a href="#/socorros-02-atuar-numa-emergencia">02 Atuar numa Emergência</a></li>
<li><a href="#/socorros-03-cadeia-de-sobrevivencia">03 Cadeia de Sobrevivência</a></li>
<li><a href="#/socorros-04-sinais-e-sintomas">04 Sinais e Sintomas</a></li>
<li><a href="#/socorros-05-ligar-o-112-para-pedir-ajuda">05 Ligar o 112 para Pedir Ajuda</a></li>
</ul>
<h3>Mala de primeiros socorros e medicamentos</h3>
<ul>
<li><a href="#/socorros-06-mala-de-primeiros-socorros-e-medicamentos">06 Mala de Primeiros Socorros e Medicamentos</a></li>
<li><a href="#/socorros-07-pensos-e-ligaduras">07 Pensos e Ligaduras</a></li>
</ul>
<h3>Suporte Básico de Vida</h3>
<ul>
<li><a href="#/socorros-08-suporte-basico-de-vida-sbv-adulto">08 Suporte Básico de Vida (SBV) - Adulto</a></li>
<li><a href="#/socorros-09-manobras-de-sbv-recem-nascidos">09 Manobras de SBV - Recém-Nascidos</a></li>
<li><a href="#/socorros-10-posicao-lateral-de-seguranca-pls">10 Posição Lateral de Segurança (PLS)</a></li>
</ul>
<h3>Acidentes do aparelho respiratório</h3>
<ul>
<li><a href="#/socorros-11-hipoxia-e-obstrucao-das-vias-aereas">11 Hipoxia e Obstrução das Vias Aéreas</a></li>
<li><a href="#/socorros-12-engasgamento-e-desobstrucao-das-vias-aereas-em-criancas">12 Engasgamento e Desobstrução das Vias Aéreas em Crianças</a></li>
<li><a href="#/socorros-13-asma">13 Asma</a></li>
</ul>
<h3>Acidentes do aparelho circulatório</h3>
<ul>
<li><a href="#/socorros-14-choque-e-hemorragia-interna">14 Choque e Hemorragia Interna</a></li>
<li><a href="#/socorros-15-choque-anafilatico">15 Choque Anafilático</a></li>
<li><a href="#/socorros-16-desmaio">16 Desmaio</a></li>
<li><a href="#/socorros-17-tipos-de-hemorragias-e-feridas">17 Tipos de Hemorragias e Feridas</a></li>
<li><a href="#/socorros-18-epistaxis-sangramento-pelo-nariz">18 Epistaxis (Sangramento pelo Nariz)</a></li>
<li><a href="#/socorros-19-feridas">19 Feridas</a></li>
</ul>
<h3>Acidentes do esqueleto</h3>
<ul>
<li><a href="#/socorros-20-fraturas">20 Fraturas</a></li>
<li><a href="#/socorros-21-luxacao-de-uma-articulacao">21 Luxação de uma Articulação</a></li>
<li><a href="#/socorros-22-entorses-e-distensoes">22 Entorses e Distensões</a></li>
</ul>
<h3>Problemas no sistema nervoso</h3>
<ul>
<li><a href="#/socorros-23-alteracoes-de-consciencia">23 Alterações de Consciência</a></li>
<li><a href="#/socorros-24-traumatismos-craneoencefalicos-tce">24 Traumatismos Craneoencefálicos (TCE)</a></li>
<li><a href="#/socorros-25-convulsoes-nas-criancas">25 Convulsões nas Crianças</a></li>
</ul>
<h3>Acidentes de pele</h3>
<ul>
<li><a href="#/socorros-26-queimaduras-avaliacao-e-queimaduras-ligeiras">26 Queimaduras - Avaliação e Queimaduras Ligeiras</a></li>
<li><a href="#/socorros-27-queimaduras-graves-e-por-choque-eletrico">27 Queimaduras Graves e por Choque Elétrico</a></li>
<li><a href="#/socorros-28-queimaduras-por-agentes-quimicos">28 Queimaduras por Agentes Químicos</a></li>
<li><a href="#/socorros-29-farpa-e-corpos-estranhos-olhos-e-ouvidos">29 Farpa e Corpos Estranhos (Olhos e Ouvidos)</a></li>
</ul>
<h3>Acidentes do aparelho digestivo</h3>
<ul>
<li><a href="#/socorros-30-envenenamento-ingestao-quimicos-na-pele-e-nos-olhos">30 Envenenamento - Ingestão, Químicos na Pele e nos Olhos</a></li>
<li><a href="#/socorros-31-intoxicacao-alimentar">31 Intoxicação Alimentar</a></li>
<li><a href="#/socorros-32-picada-de-insecto-e-mordedura-de-animal">32 Picada de Insecto e Mordedura de Animal</a></li>
</ul>
<h2>Ver também</h2>
<ul>
<li><a href="#/transito-00-indice">Manual Código da Estrada (módulo 11)</a> — &quot;Comportamento em caso de acidente&quot;</li>
</ul>
`
  },

  // ===== 2. Primeiros Socorros - Fundamentos e Segurança do Socorrista =====
  {
    id: "socorros-01-primeiros-socorros-fundamentos-e-seguranca-do-socorrista",
    h: `<h2>O que são primeiros socorros?</h2>
<p>Primeiros Socorros são um conjunto de medidas e atitudes que consistem num tratamento inicial e temporário, ministrado a acidentados e/ou vítimas de doença súbita, que visam diminuir a incapacidade, minorar o sofrimento e preservar a vida.</p>
<h2>O socorrista</h2>
<p>Ser socorrista consiste, antes de tudo, em saber prestar auxílio eficazmente e evitar o agravamento do acidentado ou doente, no local dos acontecimentos e, se necessário, durante o transporte a uma unidade de cuidados diferenciada. Embora se trate de um papel limitado e temporal, é-o também primordial.</p>
<p>O socorrista deverá ser uma pessoa auto-confiante e responsável; compreensivo, sensato e paciente; possuir capacidade de organização e de controlo da situação, mas, acima de tudo, ter consciência das suas limitações.</p>
<h2>Legislação na omissão de auxílio</h2>
<p>Segundo o artigo 200.º do Código Penal, quem, em caso de grave necessidade que ponha em perigo a vida, integridade física ou a liberdade da outra pessoa, deixar de lhe prestar auxílio para afastar o perigo, é punido com prisão até 1 ano ou multa até 120 dias, exceto se a situação representar perigo para a vida ou integridade física do omitente.</p>
<h2>Segurança pessoal</h2>
<p>Ao prestar primeiros socorros é importante proteger-se de ferimentos e infeções. Uma das regras mais importantes na prestação de primeiros socorros é certificar-se de que a situação é segura antes de tratar uma vítima. Não tente fazer salvamentos heróicos ou arriscados. Se puser em risco a sua segurança, não poderá ajudar as vítimas. Avalie a situação antes de atuar e assegure-se de que esta não representa qualquer risco para si.</p>
<h3>Procedimento</h3>
<ul>
<li>Avaliar uma situação rapidamente e pedir ajuda adequada;</li>
<li>Proteger de eventuais perigos a vítima e outras pessoas presentes no local;</li>
<li>Identificar, na medida do possível, a lesão ou doença que afeta a vítima;</li>
<li>Prestar a cada vítima socorro apropriado imediato, estabilizando primeiro os casos mais graves;</li>
<li>Ficar junto da vítima até chegar alguém que preste cuidados adequados;</li>
<li>Dar todas as informações a quem se encarregar dos cuidados das vítimas e prestar assistência se necessário;</li>
<li>Promover a deslocação da vítima para o Serviço de Urgência, entregando-a ao cuidado de um profissional de saúde qualificado;</li>
<li>Prevenir, tanto quanto possível, qualquer infeção entre a vítima e o socorrista.</li>
</ul>
<h2>Risco de doenças infetocontagiosas</h2>
<p>Há o risco da transmissão de vírus como a Hepatite B ou C e o HIV (que pode levar à SIDA – Síndrome da Imunodeficiência Adquirida) através do contacto direto entre os sangues do socorrista e da vítima. Estes vírus só se transmitem se o sangue de uma pessoa infetada tiver contacto com uma ferida que contenha sangue ou elementos sanguíneos de outra pessoa. Não há provas de transmissão de Hepatite B ou HIV através da respiração boca-a-boca.</p>
<h2>Imunização</h2>
<p>O socorrista deve estar vacinado contra a Hepatite B. Não existe vacina contra a Hepatite C ou o HIV. Se julga ter sido exposto a qualquer infeção, consulte os serviços de saúde.</p>
<h2>Proteção das infeções</h2>
<p>Uma parte importante dos primeiros socorros é evitar a infeção (transmitindo germes a uma vítima ou contraindo você mesmo infeção). Muitas vezes bastam medidas simples como lavar as mãos e usar luvas descartáveis.</p>
<h3>Procedimento</h3>
<ul>
<li>Se possível, lave bem as mãos com água e sabão antes de tratar uma vítima;</li>
<li>Tenha sempre consigo luvas descartáveis e use-as para socorrer a vítima. Se não tiver, proteja as suas mãos com sacos de plástico limpos;</li>
<li>Proteja quaisquer cortes das suas mãos com pensos impermeáveis;</li>
<li>Não tossir nem espirrar sobre uma ferida;</li>
<li>Cuidado para não se picar ou cortar;</li>
<li>Se possível, use máscara para reanimação;</li>
<li>Livre-se do lixo em segurança.</li>
</ul>
<h2>Tratar do lixo</h2>
<p>Reúna todos os pensos e materiais usados, incluindo luvas, num saco para resíduos perigosos e destrua-o por incineração. Se não puder fazê-lo, pergunte junto dos serviços de limpeza e guarde objetos cortantes ou perfurantes em contentores especiais.</p>
`
  },

  // ===== 3. Atuar numa Emergência =====
  {
    id: "socorros-02-atuar-numa-emergencia",
    h: `<p>Antes de agir, tente controlar os seus sentimentos e pare um instante para pensar. É importante que não se coloque em perigo, por isso não se precipite para uma situação potencialmente arriscada. Esteja atento a perigos como gasolina ou gás. Numa situação de emergência deve seguir um plano de ação claro. Isto permite-lhe definir prioridades, ajudando-o a decidir o que fazer.</p>
<h2>Passos principais</h2>
<ol>
<li>
<p><strong>Obter ajuda.</strong> Assegure-se de imediato que a assistência de saúde foi chamada.</p>
</li>
<li>
<p><strong>Avaliar a situação.</strong> Rapidamente e com calma observe o que aconteceu e identifique possíveis perigos para si e para a vítima. Nunca ponha em risco a sua própria segurança. Caso não exista alguém mais experiente no local para lidar com a situação, a abordagem deve ser ativa, mas calma e controlada. As prioridades são identificar quaisquer riscos, para a sua segurança, a da vítima e a das pessoas que estiverem no local. Coloque a si mesmo as seguintes questões:</p>
<ul>
<li>Há algum perigo constante?</li>
<li>Está alguma vida em perigo imediato?</li>
<li>Há alguém no local que possa ajudar?</li>
<li>Preciso da ajuda de um especialista?</li>
</ul>
</li>
<li>
<p><strong>Tornar a área segura.</strong> Proteja a vítima do perigo, dentro do possível, mas tenha em conta as suas próprias limitações. Muitas vezes, medidas simples como desligar um interruptor ou desligar a ignição do carro, mesmo que o motor não esteja a trabalhar, são o suficiente para tornar a área segura.</p>
</li>
<li>
<p><strong>Prestar cuidados de emergência.</strong> Observe todas as vítimas e defina prioridades, ajudando primeiro as que estão em risco de vida. Verifique se cada uma das vítimas:</p>
<ul>
<li>Está consciente?</li>
<li>Tem as vias aéreas abertas?</li>
<li>Respira?</li>
<li>Tem sinais de circulação?</li>
</ul>
</li>
</ol>
`
  },

  // ===== 4. Cadeia de Sobrevivência =====
  {
    id: "socorros-03-cadeia-de-sobrevivencia",
    h: `<p>A cadeia de sobrevivência é uma sequência de passos que se traduzem por elos, que quando ligados entre si permitem salvar vítimas de paragem cardiorrespiratória, sendo cada um desses elos vital para que o resultado possa ser uma vida salva. A quebra de um só elo é o suficiente para que toda essa cadeia não tenha nenhum resultado final.</p>
<h2>Os quatro elos</h2>
<ol>
<li>Acesso precoce ao Sistema de Emergência Médica</li>
<li>Início precoce do Suporte Básico de Vida</li>
<li>Desfibrilhação precoce</li>
<li>Suporte Avançado de Vida precoce / equipa de reanimação</li>
</ol>
`
  },

  // ===== 5. Sinais e Sintomas =====
  {
    id: "socorros-04-sinais-e-sintomas",
    h: `<h2>Avaliar sintomas</h2>
<p>Os sintomas são aquilo que a vítima sente e que é capaz de descrever. Pergunte se tem alguma sensação anormal, por forma a que a vítima verbalize outros sintomas se os tiver.</p>
<h2>Observar os sinais</h2>
<p>Os sinais são pormenores do estado da vítima que se podem ver, sentir, ouvir ou cheirar. Uns são evidentes, outros requerem mais atenção, por exemplo, enquanto observa a vítima.</p>
`
  },

  // ===== 6. Ligar o 112 para Pedir Ajuda =====
  {
    id: "socorros-05-ligar-o-112-para-pedir-ajuda",
    h: `<p>Ao ligar o 112 a sua chamada é enviada para uma esquadra da polícia onde lhe é pedido que identifique a situação. A chamada é então reencaminhada para o CODU (Centros de Orientação de Doentes Urgentes). Os Centros de Orientação de Doentes Urgentes são Centrais de Emergência Médica responsáveis pela medicalização do Número Europeu de Emergência - 112. Na prática, são transferidos para os CODU os pedidos de socorro efetuados por aquela via, referentes a situações de urgência ou emergência na área da saúde. O seu funcionamento é assegurado ao longo das 24 horas do dia por uma equipa de profissionais qualificados (médicos e operadores) com formação específica para efetuar o atendimento, triagem, aconselhamento, seleção e envio de meios de socorro.</p>
<p>Desde 2007, todas as chamadas efetuadas para o 112 passam a ser identificáveis. Ou seja, a confidencialidade deixou de existir. Além disso, passam a ser localizáveis por meio de satélite, permitindo a localização do telefone/telemóvel que efetua a chamada.</p>
<h2>Informações essenciais durante a chamada</h2>
<p>Durante a chamada, dê informações precisas, não entre em pânico. Os pormenores que se seguem numa chamada são essenciais:</p>
<ul>
<li>Localização exata do acidente, se possível o nome da rua e quaisquer indicações de cruzamentos ou pontos de referência.</li>
<li>O tipo e gravidade do acidente, por exemplo: &quot;acidente de trânsito, dois carros, estrada cortada, há três pessoas encarceradas&quot;.</li>
<li>O número, o sexo e idade aproximada das vítimas e qualquer informação sobre o seu estado, por exemplo: &quot;homem, na casa dos cinquenta anos, possível ataque de coração, paragem cardíaca&quot;.</li>
<li>Informação sobre quaisquer riscos como gás, substâncias perigosas, avaria elétrica ou condições climatéricas relevantes, como geada ou nevoeiro.</li>
</ul>
`
  },

  // ===== 7. Mala de Primeiros Socorros e Medicamentos =====
  {
    id: "socorros-06-mala-de-primeiros-socorros-e-medicamentos",
    h: `<h2>Material de primeiros socorros</h2>
<p>Deve haver uma mala de primeiros socorros em todas as casas, locais de trabalho, automóveis e centros de lazer. A mala deve estar claramente identificada e ser de fácil acesso. Deve ser mantida em ambiente seco e o material reposto regularmente para que se tenha sempre pronto a usar, assim como a verificação periódica da validade dos mesmos.</p>
<h3>Material básico</h3>
<ul>
<li>Mala impermeável.</li>
<li>Pensos adesivos de tamanhos diferentes.</li>
<li>Pensos esterilizados de tamanhos diferentes.</li>
<li>Compressas esterilizadas.</li>
<li>Fita adesiva.</li>
<li>Luvas descartáveis.</li>
<li>Ligaduras.</li>
<li>Tesoura e pinça.</li>
<li>Soro fisiológico.</li>
<li>Iodopovidona (&quot;Betadine&quot;).</li>
<li>Máscara facial.</li>
<li>Saco do lixo.</li>
</ul>
<h2>Cuidados a ter com os medicamentos</h2>
<ul>
<li>Verifique sempre o prazo de validade dos medicamentos antes de os utilizar;</li>
<li>Não use medicamentos com embalagens estragadas, sem rótulo e sem bula;</li>
<li>Não utilize a mesma receita médica mais de uma vez, pois o medicamento usado antigamente pode não fazer bem hoje;</li>
<li>Não compre medicamentos que forem indicados por vizinhos ou amigos, sem antes consultar o seu médico;</li>
<li>Não misture medicamentos sem a devida indicação médica;</li>
<li>Ao comprar um medicamento, solicite informações sobre possíveis reações adversas;</li>
<li>Se sentir algum sintoma diferente ao tomar o medicamento, procure o médico ou farmacêutico;</li>
<li>Os bebés e as mulheres grávidas ou em período de amamentação nunca devem tomar medicamentos sem receita médica.</li>
</ul>
`
  },

  // ===== 8. Pensos e Ligaduras =====
  {
    id: "socorros-07-pensos-e-ligaduras",
    h: `<h2>Pensos</h2>
<p>Uma ferida deve ser sempre coberta com um penso para ajudar a prevenir infeções. Nas hemorragias graves, os pensos compressivos ajudam a promover a hemostase nas feridas.</p>
<p>Use um penso esterilizado sempre que possível. Sempre que não houver pensos esterilizados, use material limpo e sem pelo para improvisar um penso. Arranhões e pequenos cortes devem ser protegidos com penso rápido.</p>
<h2>Colocar ligaduras</h2>
<p>As ligaduras podem ser usadas para vários fins em primeiros socorros: servem para segurar pensos sobre feridas, para controlar hemorragias, apoiar e imobilizar membros lesionados e reduzir edemas.</p>
<h2>Verificar a circulação depois de ligar</h2>
<p>Depois de ligar um membro deve verificar a circulação no pé ou na mão e voltar a fazê-lo de dez em dez minutos. Estas verificações são essenciais, pois o membro pode inchar após uma lesão, e a ligadura pode rapidamente ficar apertada e impedir a circulação. Os sintomas da circulação interrompida vão mudando; primeiro as veias e depois as artérias que irrigam o membro ficam obstruídas.</p>
<h3>Sinais e sintomas</h3>
<p>Se a circulação for interrompida pode haver, inicialmente:</p>
<ul>
<li>Membro inchado e congestionado.</li>
<li>Pele azul com veias salientes.</li>
<li>Sensação de distensão dolorosa.</li>
</ul>
<p>E depois:</p>
<ul>
<li>Pele pálida.</li>
<li>Dormência e frio.</li>
<li>Formigueiro seguido de dor aguda.</li>
<li>Incapacidade de mover os dedos da mão ou do pé.</li>
</ul>
<h3>Procedimento</h3>
<p>Aperte uma das unhas, ou a pele, até ficar branca. Se, ao deixar de apertar, a cor não recuperar, ou isso demorar a acontecer, a ligadura deve estar muito apertada.</p>
<p>Alargue a ligadura desenrolando apenas o necessário para a extremidade do membro recuperar a cor e a temperatura. A vítima pode sentir um formigueiro. Reponha a ligadura.</p>
<h2>Aplicar ligaduras</h2>
<ul>
<li>Ligadura de enrolar. Ligadura nos cotovelos, joelhos e pés.</li>
<li>Ligaduras nas mãos.</li>
<li>Suspensão para o braço / Suspensão para o braço com elevação.</li>
</ul>
`
  },

  // ===== 9. Suporte Básico de Vida (SBV) - Adulto =====
  {
    id: "socorros-08-suporte-basico-de-vida-sbv-adulto",
    h: `<h2>Suporte Básico de Vida — SBV</h2>
<p>Durante uma paragem cardíaca é fundamental manter a circulação sanguínea e o fornecimento de oxigénio a todo o corpo, particularmente aos órgãos nobres. Se o cérebro está mais do que 5 minutos sem circulação e sem oxigénio, algumas das suas células são destruídas, o que poderá originar lesões cerebrais irreversíveis que não permitirão que a vítima recupere a mesma qualidade de vida que tinha anteriormente, mesmo que se tenha conseguido que o coração recomece a funcionar eficazmente.</p>
<p>Face a uma paragem cardiorrespiratória são necessárias três atitudes para levar sangue e oxigénio ao cérebro e outros órgãos nobres:</p>
<ul>
<li><strong>A (&quot;AIRWAY&quot;)</strong> — Abrir a via aérea para que o ar chegue aos pulmões;</li>
<li><strong>B (&quot;BREATHING&quot;)</strong> — Substituir a respiração ausente com a manobra de respiração boca a boca ou utilizando meios auxiliares apropriados;</li>
<li><strong>C (&quot;CIRCULATION&quot;)</strong> — Manter a circulação sanguínea efetuando compressões da parede torácica, para bombear o sangue para todo o corpo.</li>
</ul>
<p>A realização destas atitudes em sequência designa-se por reanimação cardiorrespiratória ou ABC do Suporte Básico de Vida.</p>
<h2>Manobras de SBV</h2>
<h3>1 — Aproximação da vítima e avaliação do quadro clínico</h3>
<p>Face a uma vítima caída, a primeira atitude antes de lhe tocar é avaliar as condições de segurança. Há muitas condições que podem pôr em risco a vida de um indivíduo (um choque elétrico, um tóxico, um organofosforado), fazendo também perigar a vida do socorrista.</p>
<p>Na reanimação existe uma regra básica que não deve ser esquecida: o socorrista nunca se deve expor a riscos maiores do que aqueles que ameaçam a vítima, pois podem morrer os dois.</p>
<p>Se existirem condições de segurança, o reanimador deve aproximar-se da vítima para verificar o estado de consciência da mesma, abanando suavemente os ombros e perguntando em voz alta como se sente ou chamando pelo nome se o souber.</p>
<p>Se a vítima responder, deve ser tranquilizada e feitas as perguntas que permitam esclarecer o que se passou. Deve ser pedida ajuda se necessário. Se a vítima não responder, gritar por ajuda sem abandonar a vítima.</p>
<h3>2 — A (&quot;AIRWAY&quot;) — Abrir a via aérea</h3>
<p>Na pessoa que não respondeu, ou seja, que está inconsciente, a língua pode cair para trás e impedir a entrada de ar nos pulmões. Para permeabilizar as vias aéreas deve inspecionar-se a cavidade oral procurando corpos estranhos que impeçam a entrada de ar na via aérea, e fazer-se a extensão da cabeça e a elevação do queixo.</p>
<p>Se possível, estes movimentos devem ser feitos com a vítima na posição em que foi encontrada, mas se necessário esta deve ser deitada de costas.</p>
<p>Nos casos em que pode ter ocorrido um traumatismo do pescoço e da coluna cervical — por queda de altura elevada, por mergulho em águas pouco profundas, associada a traumatismo craniano ou em acidente de viação — NÃO se deve fazer a extensão da cabeça, porque pode agravar a lesão da coluna cervical. Nestes casos deve ser feita a subluxação da mandíbula, com a elevação do queixo. A prioridade é deixar entrar ar para os pulmões por uma ou outra manobra.</p>
<h3>3 — B (&quot;BREATHING&quot;) — Respiração</h3>
<p>Depois de desobstruir a via aérea é necessário verificar se a vítima está a respirar. Durante 10 segundos observa-se o tórax da vítima para ver se mexe, e mantém-se o ouvido do reanimador sobre a boca da mesma para ouvir e/ou sentir o fluxo de ar da respiração a sair pela boca da vítima. Esta avaliação da respiração é designada por VOS (ver, ouvir, sentir).</p>
<p>Se não houver movimentos respiratórios e não houver ninguém disponível para ir pedir ajuda, deve deixar-se a vítima na posição em que se encontrou e ir buscar ajuda, telefonando para o 112. É importante especificar bem o local onde se encontra e informar que a vítima não responde e não respira.</p>
<p>O pedido de ajuda é fundamental porque, nos adultos, a principal causa de morte súbita é a paragem cardíaca, que pode tratar-se com um choque dado por um desfibrilhador. Por isso, o pedido de ajuda é prioritário para que o desfibrilhador chegue o mais rapidamente possível.</p>
<h3>4 — C de circulação</h3>
<p>Perante uma vítima inconsciente e após a pesquisa de movimentos respiratórios, deve avaliar-se a presença de sinais de circulação, tais como movimentos da vítima (por exemplo, de deglutição), tosse e o pulso carotídeo, que se procura na região lateral do pescoço.</p>
<p>Se a vítima estiver em paragem cardíaca e não atuarmos de imediato, a probabilidade de a recuperar diminui muito rapidamente (cerca de 10% por cada minuto que passa). Iniciar de imediato o SBV é uma prioridade.</p>
<p>O SBV mantém a oxigenação e a circulação da vítima até que chegue o desfibrilhador, que pode tratar muitos dos casos de PCR do adulto. Esta sequência de atitudes permite ganhar tempo para tentar salvar uma vida.</p>
<h3>5 — Sequência ilustrada do SBV</h3>
<p><strong>Respiração boca a boca (AB) — procedimentos:</strong></p>
<ol>
<li>Ajoelhar ao lado da vítima;</li>
<li>Deitar a vítima de costas numa superfície lisa;</li>
<li>Fazer a extensão da cabeça e a elevação do queixo;</li>
<li>Tapar o nariz da vítima com o polegar e o indicador e, com a outra mão, elevar o queixo e manter os lábios entreabertos;</li>
<li>Encher o peito de ar;</li>
<li>Colar os lábios aos da vítima sem permitir fugas de ar e insuflar durante 1,5 a 2 segundos o volume de ar expirado;</li>
<li>Observar o peito da vítima para verificar se se move com a entrada de ar;</li>
<li>Retirar a cara para deixar sair o ar do peito da vítima, mantendo a via aérea aberta.</li>
</ol>
<p>Se o tórax não se mexer, deve verificar-se se existem obstáculos na via aérea e se a adaptação dos lábios à boca da vítima foi bem feita.</p>
<p>Após duas ventilações eficazes, para as quais se podem fazer até cinco tentativas, se tal não acontecer deve passar-se à pesquisa de sinais de restabelecimento da circulação. Ao fim de 10 segundos sem sinais de circulação, devem iniciar-se as compressões torácicas externas.</p>
<p><strong>Compressões torácicas externas — procedimentos:</strong></p>
<ol>
<li>A vítima deve estar deitada de costas numa superfície dura;</li>
<li>Sobrepor as mãos e entrelaçar os dedos sobre o esterno (osso que fica no meio do peito e une as grades costais direita e esquerda), de forma que a pressão se exerça só sobre o esterno e não sobre as costelas;</li>
<li>Colocar o corpo do socorrista na vertical, com os braços bem esticados;</li>
<li>Fazer as compressões rítmicas (frequência: 100 por minuto), deprimindo o esterno cerca de 4 a 5 cm;</li>
<li>Ao fim de trinta compressões, fazer duas ventilações e voltar a fazer mais trinta compressões, e assim sucessivamente.</li>
</ol>
<p>Não há tempo definido para a duração de uma reanimação, nem regras absolutas em relação ao momento de parar o Suporte Básico de Vida. As vítimas de afogamento e hipotermia recuperam frequentemente ao fim de longas reanimações, assim como as crianças. A reanimação deve manter-se até a vítima de PCR recuperar ou até chegar a equipa de emergência que foi chamada. A tentativa de reanimação também é limitada pela exaustão do reanimador.</p>
<p>É urgente incentivar o maior número de pessoas a ativar corretamente e o mais cedo possível a cadeia de sobrevivência, atitude essencial para se salvarem mais vidas.</p>
<h3>Pontos a reter</h3>
<ul>
<li>Os leigos não devem perder tempo a pesquisar o pulso na vítima que não respira. Após duas insuflações e sem sinais de circulação ao fim de 10 segundos, devem iniciar-se as compressões torácicas.</li>
<li>É preferível executar as compressões torácicas, quando indicado, do que não fazer nada.</li>
<li>O pedido de ajuda é vital. Nos sistemas de resposta à emergência organizados, a ajuda telefónica pode ser muito importante para orientar os procedimentos, enquanto a equipa de profissionais não chega ao local.</li>
<li>No adulto, a relação das compressões/ventilações deve ser de 30/2, sendo a frequência das compressões de 100 por minuto e o ritmo das ventilações de 10 por minuto.</li>
</ul>
`
  },

  // ===== 10. Manobras de SBV - Recém-Nascidos =====
  {
    id: "socorros-09-manobras-de-sbv-recem-nascidos",
    h: `<h2>Aproximação da vítima e avaliação do quadro clínico</h2>
<p>Chame e abane delicadamente o ombro da criança. Se não houver resposta, posicione a criança em decúbito dorsal sobre uma superfície dura.</p>
<h2>A — Permeabilidade da via aérea</h2>
<p>Abra a via aérea, visualize a boca da criança procurando por objetos estranhos. Permeabilize a via aérea, inclinando principalmente o queixo, não inclinando a cabeça demasiado para trás.</p>
<p>Nos recém-nascidos, devido à sua estrutura, não é realizada a extensão da cabeça. A cabeça deve ficar numa posição neutra.</p>
<p>O recém-nascido inconsciente que ventila é colocado em decúbito lateral.</p>
<h2>B — Paragem ventilatória</h2>
<p>Pesquisa de ventilação semelhante ao procedimento utilizado no adulto.</p>
<h2>C — Sinais de circulação</h2>
<p>Palpar artéria umeral ou femoral durante 10 segundos.</p>
<h2>Sequência de Suporte Básico de Vida</h2>
<blockquote>
<p><strong>Atenção!</strong><br />
Deve ser feito 1 minuto de SBV antes de pedir ajuda.<br />
Devem ser realizadas 5 insuflações antes de iniciar as compressões torácicas.</p>
</blockquote>
<h3>Ventilações</h3>
<ul>
<li>Técnica utilizada: boca-nariz ou boca-boca;</li>
<li>Cada insuflação deve durar cerca de 1 segundo;</li>
<li>Apenas deve ser insuflado o ar presente nas bochechas.</li>
</ul>
<h3>Compressões torácicas</h3>
<ul>
<li>O local da compressão torácica no recém-nascido é pesquisado colocando dois dedos no centro do peito da criança, ligeiramente abaixo do ponto de cruzamento entre o esterno e a linha intermamilar;</li>
<li>A compressão é realizada com apenas dois dedos, provocando uma depressão de cerca de 2 a 3 centímetros;</li>
<li>As compressões devem ser realizadas a uma frequência de 100 por minuto.</li>
</ul>
`
  },

  // ===== 11. Posição Lateral de Segurança (PLS) =====
  {
    id: "socorros-10-posicao-lateral-de-seguranca-pls",
    h: `<p>Quando uma pessoa tem pulso e respira, mas está inconsciente, pode colocar-se em PLS, permitindo assim assegurar que a via aérea fique permeável e não obstrua por vómito ou saliva. Permite ainda que o socorrista peça ajuda.</p>
<h2>O que deve fazer</h2>
<p>Exceto em caso de suspeita de ferimentos na coluna vertebral ou pescoço, a forma aconselhada de a vítima repousar, enquanto não chega a assistência médica, é colocá-la na posição lateral de segurança.</p>
<p>Se a vítima respira mas está inconsciente e por isso não consegue proteger a via aérea, deve ser colocada numa posição em que a queda da língua seja impedida, a drenagem das secreções da boca seja facilitada e, em caso de vómito, este não seja aspirado. A posição que satisfaz estas condições designa-se posição lateral de segurança (PLS).</p>
<h2>Procedimento</h2>
<ol>
<li>Ajoelhado ao lado da vítima, esticar-lhe as pernas e os braços ao longo do corpo;</li>
<li>Retirar do vestuário todos os objetos que a possam magoar (chaves, óculos);</li>
<li>Colocar o braço que fica do lado do reanimador em ângulo reto com o corpo, ao nível do ombro e com a palma da mão virada para cima;</li>
<li>A mão oposta da vítima deve ser colocada na sua bochecha, do lado do reanimador, ajudando a controlar o movimento da cabeça;</li>
<li>Fletir a perna da vítima do lado oposto ao do reanimador, segurando-a por baixo do joelho e, com a outra mão apoiando a cabeça, puxar, rodando o corpo para o lado do reanimador;</li>
<li>Estabiliza-se a vítima fletindo a perna de cima em ângulo reto com o corpo;</li>
<li>Confirmar atentamente que a vítima está a respirar bem, sem fazer ruído por obstrução da via aérea, e fazê-lo constantemente enquanto a vítima se mantiver em PLS;</li>
<li>Se for necessário desfazer a PLS, o reanimador deve colocar-se nas costas da vítima, ajoelhado, voltar a pôr a perna desta ao longo do corpo e, com uma mão na anca e outra a controlar a posição da cabeça, fazer rolar a vítima sobre as suas coxas, até esta ficar de novo de costas.</li>
</ol>
`
  },

  // ===== 12. Hipoxia e Obstrução das Vias Aéreas =====
  {
    id: "socorros-11-hipoxia-e-obstrucao-das-vias-aereas",
    h: `<h2>O aparelho respiratório</h2>
<p>O aparelho respiratório inclui a boca, o nariz, a traqueia, os pulmões e os vasos sanguíneos pulmonares. A respiração implica a troca de gases (oxigénio e dióxido de carbono) nos pulmões e nas células por todo o corpo. Nós inspiramos ar para fornecer oxigénio aos pulmões, e expiramos para expulsar o dióxido de carbono, que é um produto residual da respiração.</p>
<h3>Como funciona a ventilação</h3>
<p>O processo de ventilação consiste nas ações de inspiração e expiração, seguidas de uma pausa. As diferenças de pressão entre os pulmões e o ar exterior determinam se o ar é aspirado ou expelido. Quando inspiramos, o ar entra pelo nariz e pela boca para as vias aéreas e pulmões. Nos pulmões, enquanto o oxigénio é absorvido, o dióxido de carbono é expelido quando expiramos.</p>
<h2>Hipoxia</h2>
<p>Esta condição surge quando não chega oxigénio suficiente aos tecidos do corpo. A hipoxia é acompanhada de uma variedade de sintomas, que dependem da gravidade da condição. Se não for logo socorrida, a hipoxia pode ser fatal. Uma hipoxia moderada reduz a capacidade da vítima pensar com clareza, mas o corpo reage aumentando o ritmo da respiração. Após 3 minutos sem oxigénio, as células cerebrais começam a morrer (de forma irreversível), e aos 5 minutos esgotam as suas reservas de oxigénio e energia.</p>
<h3>Sinais e sintomas</h3>
<ul>
<li>Ventilação acelerada.</li>
<li>Ventilação intercortada e ofegante.</li>
<li>Dificuldade em falar.</li>
<li>Ansiedade.</li>
<li>Inquietação.</li>
<li>Cefaleia (dor de cabeça).</li>
<li>Náusea e possível vómito.</li>
<li>Cianose (pele cinzento-azulada). No início começa por afetar os lábios, unhas e lóbulos das orelhas, mas com o agravar da hipoxia a cianose afeta todo o corpo.</li>
<li>Paragem respiratória, se a hipoxia não for rapidamente revertida.</li>
</ul>
<h2>Obstrução das vias aéreas</h2>
<p>As vias aéreas podem ser obstruídas internamente, por exemplo, por um objeto que fique preso na parte de trás da garganta (exemplo: prótese dentária).</p>
<h3>Principais causas</h3>
<ul>
<li>Inalação de um objeto estranho, como alimentos ou dentes — engasgamento.</li>
<li>Bloqueio pela língua, numa vítima inconsciente.</li>
<li>Bloqueio por sangue ou vómito.</li>
<li>Edema na garganta, provocado por queimadura, picada ou anafilaxia.</li>
<li>Traumatismo na face ou na mandíbula, ou pressão externa, como no enforcamento ou estrangulamento.</li>
<li>Asma.</li>
</ul>
<h3>Sinais e sintomas</h3>
<p>Iguais aos sinais de hipoxia. Fácies agónico.</p>
<ul>
<li>Dificuldade em falar e respirar. Tosse seca persistente.</li>
<li>Respiração ruidosa. Adejo nasal.</li>
<li>Rosto vermelho e inchado.</li>
</ul>
<h3>Procedimento</h3>
<ol>
<li>Remova a obstrução se for externa ou visível na boca.</li>
<li>Se a vítima estiver inconsciente, abra as vias aéreas e verifique se ventila, e ligue o 112 para pedir ajuda.</li>
<li>Esteja preparado para fazer ventilação artificial e compressões no tórax, se necessário.</li>
<li>Mesmo que a vítima pareça estar totalmente recuperada, leve-a aos serviços de saúde.</li>
</ol>
`
  },

  // ===== 13. Engasgamento e Desobstrução das Vias Aéreas em Crianças =====
  {
    id: "socorros-12-engasgamento-e-desobstrucao-das-vias-aereas-em-criancas",
    h: `<p>Um objeto estranho na parte de trás da garganta pode bloqueá-la ou causar espasmos musculares. Se o bloqueio das vias aéreas for parcial, a vítima deve ser capaz de o libertar. Se for total, será incapaz de respirar, falar ou tossir, e perderá a consciência. Prepare-se para fazer ventilação artificial e compressões.</p>
<h2>Objetivos</h2>
<ul>
<li>Remover a obstrução.</li>
<li>Assegurar o transporte urgente para o hospital, se necessário.</li>
</ul>
<h2>Sinais e sintomas</h2>
<p>Com obstrução parcial:</p>
<ul>
<li>Tosse e aflição.</li>
<li>Dificuldade em falar.</li>
</ul>
<p>Com obstrução total:</p>
<ul>
<li>Incapacidade de respirar, falar ou tossir, e eventual perda de consciência.</li>
</ul>
<h2>Procedimento (adulto)</h2>
<ol>
<li>Se a vítima tossir, diga-lhe para continuar a tossir. Retire-lhe da boca quaisquer obstruções evidentes.</li>
<li>Se a vítima está a perder as forças, ou a parar de respirar ou de tossir, dê-lhe palmadas nas costas. Coloque-se ao lado dela, ligeiramente atrás, segure-lhe no peito com uma das mãos e ajude-a a inclinar-se para a frente. Dê até 5 palmadas entre as omoplatas para libertar a obstrução.</li>
<li>Se as palmadas não libertarem a obstrução, tente as compressões abdominais. Coloque-se por trás da vítima e coloque os braços à volta da parte superior do abdómen. A vítima deve estar inclinada. Feche o punho e coloque-o, com o polegar para dentro, entre o umbigo e a ponta do esterno. Agarre o punho com a outra mão, e puxe para dentro e para cima, até 5 vezes.</li>
<li>Examine a boca da vítima. Se a obstrução ainda não tiver saído, repita os passos 2 e 3 até três vezes, examinando a boca após cada um deles.</li>
<li>Se a obstrução não sair, ligue 112 e continue até chegar ajuda.</li>
</ol>
<h2>Manobra de desobstrução das vias aéreas em crianças (&lt; 1 ano)</h2>
<p><strong>1.º passo</strong> — Observe se a criança consegue chorar, tossir ou respirar. Se a resposta é negativa, prossiga para o passo seguinte.</p>
<p><strong>2.º passo</strong> — Coloque a criança de barriga para baixo (decúbito ventral) sobre o seu antebraço, com a cabeça inclinada para baixo, e efetue 5 pancadas nas costas, na linha média entre as omoplatas (utilize a base da mão, com força adequada ao tamanho da criança).</p>
<p><strong>3.º passo</strong> — Alternadamente, coloque-a de costas (decúbito dorsal), se necessário sobre uma superfície dura, e execute 5 compressões sobre o esterno, com dois dedos, ou com os polegares ficando os restantes dedos a envolver o tórax da criança. As compressões devem ser executadas abaixo da linha média intermamilar; devem ser pausadas e seguras (do mesmo modo que a RCP).</p>
<p><strong>4.º passo</strong> — Repita os passos 2 e 3 até que seja eficaz. Verifique, entre cada passo, se o objeto que provoca a obstrução se encontra na boca ou garganta e remova-o. Se a criança ficar inconsciente, inicie RCP.</p>
`
  },

  // ===== 14. Asma =====
  {
    id: "socorros-13-asma",
    h: `<p>Um ataque de asma provoca espasmo dos bronquíolos e edema do revestimento das vias aéreas, o que resulta no seu estreitamento, dificultando a respiração.</p>
<p>Por vezes podem ser identificados os fatores que provocam um ataque de asma, como uma alergia, uma constipação, um medicamento específico ou o fumo de cigarro. Mas isto nem sempre acontece e alguns asmáticos sofrem ataques súbitos durante a noite. Muitos asmáticos têm inaladores apropriados (existem os inaladores preventivos, para prevenir os ataques, e os curativos, para &quot;curar&quot; o ataque).</p>
<h2>Objetivos</h2>
<ul>
<li>Facilitar a ventilação.</li>
<li>Obter assistência de saúde, se necessário.</li>
</ul>
<h2>Sinais e sintomas</h2>
<ul>
<li>Dificuldade em respirar, com uma expiração muito prolongada.</li>
<li>Expiração ruidosa.</li>
<li>Dificuldade em falar e sussurrar.</li>
<li>Sinais de hipoxia, como cianose nos lábios, lóbulos das orelhas e unhas.</li>
<li>Aflição e ansiedade.</li>
<li>Tosse seca e repetida.</li>
<li>Pulso rápido.</li>
<li>Prostração.</li>
<li>Num ataque grave, a vítima pode ficar exausta (em casos raros, pode ficar inconsciente e parar de respirar).</li>
</ul>
<h2>Procedimento</h2>
<ol>
<li>Acalme e conforte a vítima. Diga-lhe para inalar uma vez o inalador &quot;curativo&quot; e aguardar alguns minutos para que faça efeito. Diga à vítima para respirar fundo e devagar.</li>
<li>Coloque-a num local arejado. Deixe a vítima adotar uma posição confortável, que normalmente é sentada. Não a faça deitar-se. Um ataque de asma moderado deve passar em 3 minutos. Se isso não acontecer, diga à vítima que tome outra dose do mesmo inalador.</li>
</ol>
<h3>Cuidado!</h3>
<ul>
<li>Ligue 112 se for o primeiro ataque, ou for um ataque grave em que o inalador não surta efeito nos primeiros 5 minutos; se a vítima estiver a piorar ou a ficar exausta.</li>
<li>Ligue o 112 se a vítima perder a consciência (esteja pronto para fazer ventilação artificial e compressões no tórax); se respirar, coloque-a em posição lateral de segurança.</li>
</ul>
`
  },

  // ===== 15. Choque e Hemorragia Interna =====
  {
    id: "socorros-14-choque-e-hemorragia-interna",
    h: `<h2>O coração e os vasos sanguíneos</h2>
<p>O sistema circulatório é composto pelo coração e pelos vasos sanguíneos. Fornece o oxigénio e os nutrientes a todos os tecidos e transporta os produtos residuais para serem libertados. O sangue é bombeado para o corpo por contrações rítmicas (batimentos) do músculo cardíaco. O sangue corre através de uma rede de vasos que se dividem em três tipos: artérias, veias e capilares. A força exercida pelo fluxo sanguíneo através das artérias principais é a pressão sanguínea. Varia com a força e o ritmo do batimento cardíaco, com a elasticidade das paredes das artérias, e com o volume e espessura do sangue.</p>
<h2>Choque</h2>
<p>Esta situação potencialmente fatal ocorre quando o sistema circulatório falha, e os órgãos vitais como o coração e o cérebro ficam privados de oxigénio. É necessário socorro imediato para evitar danos permanentes nos órgãos ou morte.</p>
<p>O choque pode ser agravado pelo medo e pela dor. Sempre que há risco de choque, tranquilizar a vítima e dar-lhe conforto pode impedir o agravamento.</p>
<h3>Sinais e sintomas</h3>
<p>Inicialmente:</p>
<ul>
<li>Pulsação acelerada.</li>
<li>Pele pálida, fria e pegajosa, suor.</li>
</ul>
<p>Com o desenvolvimento do choque:</p>
<ul>
<li>Fraqueza e vertigens. Náusea e possível vómito.</li>
<li>Sede. Pulsação muito fraca.</li>
<li>Respiração acelerada e superficial.</li>
</ul>
<p>Com a redução do oxigénio no cérebro:</p>
<ul>
<li>Agitação e agressividade.</li>
<li>Bocejos e falta de ar.</li>
<li>Perda de consciência.</li>
</ul>
<p>Por fim, o coração para.</p>
<h3>Procedimento</h3>
<ol>
<li>Ligue 112 para chamar uma ambulância e pedir ajuda.</li>
<li>Deite a vítima no chão sobre um cobertor e tranquilize-a sempre.</li>
<li>Coloque as pernas da vítima a um nível mais alto do que a cabeça, para melhorar o abastecimento de sangue aos órgãos vitais.</li>
<li>Desaperte roupa que esteja apertada no pescoço ou na cintura, para reduzir a constrição nestas áreas.</li>
<li>Mantenha a vítima quente.</li>
<li>Verifique respiração e nível de consciência, e esteja pronto para fazer ventilação artificial e compressões torácicas.</li>
</ol>
<h2>Hemorragia interna</h2>
<p>Uma hemorragia interna pode seguir-se a um traumatismo, como uma fratura ou ferida penetrante, mas também pode ocorrer de forma espontânea — por exemplo, devido a uma úlcera no estômago. O principal risco que advém de uma hemorragia interna é entrar em choque. O sangue pode acumular-se em torno de órgãos como os pulmões e o cérebro e exercer pressão sobre eles. Deve suspeitar de hemorragia interna se uma vítima apresentar sinais de choque, sem que haja perda de sangue visível. Verifique se há perda de sangue pelos orifícios naturais.</p>
<h3>Sinais e sintomas</h3>
<ul>
<li>Ao princípio, pele pálida, fria e húmida. Se a hemorragia se prolongar, a pele pode ficar cianótica (cinzento-azulada).</li>
<li>Pulso rápido e fraco.</li>
<li>Sede. Dor.</li>
<li>Respiração acelerada e superficial.</li>
<li>Confusão, agitação e irritabilidade.</li>
<li>Possível desmaio e perda de consciência.</li>
<li>Hemorragia pelos orifícios naturais.</li>
<li>Em caso de traumatismo violento, equimose com ponto de aplicação — uma área de pele descolorada com a textura marcada da roupa, de um objeto esmagador ou de um objeto constritor.</li>
</ul>
`
  },

  // ===== 16. Choque Anafilático =====
  {
    id: "socorros-15-choque-anafilatico",
    h: `<p>É uma reação alérgica grave que afeta todo o corpo. Pode desenvolver-se em apenas alguns segundos após o contacto com um fator desencadeador, e pode ser fatal. Numa reação anafilática são libertadas no sangue substâncias químicas que dilatam os vasos sanguíneos e apertam as vias aéreas. A pressão sanguínea desce rapidamente e a ventilação é interrompida. A língua e a garganta podem inchar, aumentando o risco de hipoxia. A quantidade de oxigénio que chega aos órgãos vitais é significativamente reduzida. As prioridades dos primeiros socorros são ajudar a ventilação e minimizar o choque até chegar assistência de saúde.</p>
<h2>Principais causas</h2>
<ul>
<li>Contacto com materiais específicos.</li>
<li>Injeção de um medicamento específico.</li>
<li>Picada de um determinado inseto.</li>
<li>Ingestão de certos alimentos.</li>
</ul>
<h2>Procedimento</h2>
<ol>
<li>Ligue 112 e peça ajuda, dando toda a informação sobre o estado da vítima.</li>
<li>Se a vítima estiver consciente, ajude-a a sentar-se numa posição que facilite a respiração.</li>
<li>Se a vítima ficar inconsciente, abra as vias aéreas e verifique a ventilação; esteja pronto para fazer ventilação artificial e compressões no tórax. Se a vítima ventila, ponha-a em posição lateral de segurança.</li>
</ol>
`
  },

  // ===== 17. Desmaio =====
  {
    id: "socorros-16-desmaio",
    h: `<p>Um desmaio é uma breve perda de consciência causada por uma redução temporária do fluxo de sangue no cérebro. Um desmaio pode ser uma reação à dor, exaustão, falta de comida, ou resultado de tensão emocional. É comum depois de longos períodos de inatividade, como ficar parado de pé, sobretudo num ambiente quente. A inatividade faz com que o sangue se acumule na parte inferior do corpo, reduzindo o volume de oxigénio disponível para o cérebro. Quando uma pessoa desmaia, o pulso fica muito lento, mas depressa volta ao normal. A recuperação dos sentidos é rápida.</p>
<h2>Sinais e sintomas</h2>
<ul>
<li>Uma breve perda de consciência.</li>
<li>Pulso lento.</li>
<li>Pele pálida, fria e suada.</li>
</ul>
<h2>Procedimento</h2>
<ol>
<li>Quando a vítima disser que sente que vai desmaiar, deite-a no chão. Ajoelhe-se, levante-lhe as pernas e apoie os tornozelos nos seus ombros. Isto ajuda a melhorar o afluxo de sangue ao cérebro.</li>
<li>Assegure-se de que a vítima tem bastante ar fresco. Abra uma janela e peça às pessoas presentes para se afastarem.</li>
<li>À medida que a vítima recupera, tranquilize-a e ajude-a a sentar-se. Se ela correr o risco de desmaiar outra vez, diga-lhe que se deite e mantenha as pernas erguidas até recuperar por completo.</li>
</ol>
`
  },

  // ===== 18. Tipos de Hemorragias e Feridas =====
  {
    id: "socorros-17-tipos-de-hemorragias-e-feridas",
    h: `<h2>Anatomia / fisiologia</h2>
<p>O sangue circula em artérias, veias e capilares. Quando um vaso sanguíneo é danificado, são ativados vários mecanismos para controlar a perda de sangue: o vaso contrai-se e ocorre uma série de reações químicas que formam um coágulo de sangue — um &quot;tampão&quot; sobre a área danificada. Se os vasos sanguíneos se romperem, pode ocorrer uma perda de sangue descontrolada antes de se formar um coágulo, o que pode resultar em choque.</p>
<h2>Tipos de hemorragias</h2>
<p>Uma hemorragia é classificada pelo tipo de vaso sanguíneo que é danificado.</p>
<ul>
<li><strong>Artérias</strong> — transportam sangue vermelho vivo, rico em oxigénio, sob a pressão exercida pelo coração. Se uma se rompe, a hemorragia pode ser abundante. O sangue sai ao ritmo dos batimentos cardíacos.</li>
<li><strong>Veias</strong> — o sangue, tendo deixado já o oxigénio nos tecidos, é vermelho escuro. Está sob menos pressão do que o arterial, mas as paredes das veias podem alargar bastante e o sangue pode acumular-se lá.</li>
<li><strong>Capilares</strong> — uma hemorragia dos capilares ocorre em qualquer ferida. Normalmente a perda de sangue é reduzida. Uma pancada brusca pode romper capilares sob a pele, causando uma hemorragia nos tecidos (equimose).</li>
</ul>
<h2>Hemorragia externa — sinais</h2>
<ul>
<li>Visível: hematoma; equimose.</li>
</ul>
<h3>Procedimento</h3>
<ol>
<li>Calçar luvas descartáveis;</li>
<li>Deitar horizontalmente o indivíduo;</li>
<li>Aplicar sobre a ferida uma compressa esterilizada, exercendo uma pressão firme;</li>
<li>Se a compressa ficar saturada de sangue, colocar outra por cima;</li>
<li>Fazer durar a compressão até a hemorragia parar (pelo menos 10 minutos);</li>
<li>Se parar, fazer um penso compressivo (desinfetar + compressa + ligadura + elevação do membro).</li>
</ol>
<p>Transporte para o SAP ou Hospital se necessário (ferida suja — suturar — medicar — etc.).</p>
<h2>Hemorragia interna — sinais (invisível)</h2>
<ul>
<li>Pele fria, suada e pálida;</li>
<li>Pulso rápido;</li>
<li>Sonolência;</li>
<li>Sede;</li>
<li>Vómitos de sangue.</li>
</ul>
<h3>Procedimento</h3>
<ol>
<li>Acalmar o indivíduo e mantê-lo acordado;</li>
<li>Desapertar-lhe a roupa;</li>
<li>Mantê-lo confortavelmente aquecido;</li>
<li>Colocá-lo em PLS (posição lateral de segurança).</li>
</ol>
<p><strong>NÃO deve dar nada a beber ou comer.</strong> É uma situação grave que necessita de transporte para o SAP ou Hospital.</p>
`
  },

  // ===== 19. Epistaxis (Sangramento pelo Nariz) =====
  {
    id: "socorros-18-epistaxis-sangramento-pelo-nariz",
    h: `<h2>Procedimento</h2>
<ol>
<li>Comprimir com o dedo a narina que sangra;</li>
<li>Inclinar a cabeça para a frente e respirar pela boca;</li>
<li>Manter a pressão por 10 minutos;</li>
<li>Colocar uma compressa em ambas as narinas (tamponamento);</li>
<li>Não assoar o nariz;</li>
<li>Se a hemorragia persistir por mais de 10 minutos, transportar a vítima para o hospital.</li>
</ol>
`
  },

  // ===== 20. Feridas =====
  {
    id: "socorros-19-feridas",
    h: `<h2>Procedimento</h2>
<ol>
<li>Lavar as mãos e calçar luvas descartáveis;</li>
<li>Lavar a ferida com água e sabão ou soro fisiológico;</li>
<li>Secar com uma compressa esterilizada;</li>
<li>Proteger com compressas.</li>
</ol>
<h2>O que não deve fazer</h2>
<ol>
<li>Tocar nas feridas sangrantes sem luvas;</li>
<li>Utilizar o material (luvas, compressas, etc.) em mais do que uma pessoa;</li>
<li>Soprar, tossir ou espirrar na ferida;</li>
<li>Utilizar mercúrio-cromo, tintura de mertiolato, algodão;</li>
<li>Fazer compressão direta em locais onde haja suspeita de fratura ou de corpos estranhos encravados, ou junto de articulações;</li>
<li>Tentar tratar uma ferida mais grave, extensa ou profunda, com tecidos esmagados ou infetados, ou que tenha corpos estranhos.</li>
</ol>
`
  },

  // ===== 21. Fraturas =====
  {
    id: "socorros-20-fraturas",
    h: `<h2>Anatomia / fisiologia</h2>
<h3>O esqueleto</h3>
<p>O nosso corpo assenta numa estrutura óssea chamada esqueleto. Esta estrutura suporta os músculos, os vasos sanguíneos e os nervos do corpo. Muitos ossos do esqueleto também protegem órgãos importantes, como o cérebro e o coração. Em muitos pontos do esqueleto, os ossos unem-se através de articulações. Estas são seguras por ligamentos e movem-se pela ação dos músculos que estão presos aos ossos por tendões.</p>
<h3>A espinha dorsal</h3>
<p>A espinha dorsal, ou coluna vertebral, tem várias funções: suporta a cabeça, torna o tronco flexível, ajuda a suportar o peso do corpo e protege a espinal medula.</p>
<p>A coluna é composta de 33 ossos sobrepostos chamados vértebras, ligados entre si por articulações. Entre as vértebras há discos de um tecido fibroso, chamados discos intervertebrais, que tornam a espinha flexível e amortecem os solavancos. Os músculos e ligamentos ligados às vértebras estabilizam a coluna e controlam os movimentos das costas.</p>
<h3>O crânio</h3>
<p>Esta estrutura óssea protege o cérebro no topo da espinal medula. Também contém os olhos e outras estruturas da face. O crânio é composto por vários ossos, a maioria dos quais fundidos entre si em articulações chamadas suturas. Dentro do osso há espaços de ar (seios) que tornam o crânio mais leve. Os ossos que cobrem o cérebro formam a caixa craniana. Vários outros ossos formam as órbitas, o nariz, a face e os maxilares.</p>
<h3>Ossos, músculos e articulações</h3>
<p><strong>Os ossos</strong> — o osso é um tecido vivo que contém grandes quantidades de cálcio e fósforo. Estes minerais tornam-no duro, rígido e forte. Os ossos crescem desde o nascimento ao início da idade adulta, acumulando camadas exteriores de cálcio. Os ossos também geram tecido novo após uma lesão, como uma fratura.</p>
<p>A idade e certas doenças podem enfraquecer os ossos, tornando-os frágeis e quebradiços, seja sob tensão ou espontaneamente. Problemas genéticos ou disfunções ósseas como raquitismo, cancro e infeções podem enfraquecer e entortar os ossos. Danos causados aos ossos durante a adolescência podem encurtar o osso ou provocar imobilidade. Nos idosos, uma doença chamada osteoporose faz com que os ossos percam densidade, tornando-os frágeis e suscetíveis de fraturar.</p>
<p><strong>Os músculos</strong> — fazem mover várias partes do corpo. Os músculos esqueléticos (voluntários) controlam o movimento e a postura. Estão ligados aos ossos por cordões de tecido fibroso e resistente (tendões), e funcionam em grupos: quando um grupo de músculos se contrai, o seu grupo oposto relaxa.</p>
<p>Os músculos involuntários fazem funcionar os órgãos internos, como o coração, e trabalham constantemente, mesmo enquanto dormimos. São controlados pelo sistema nervoso autónomo.</p>
<p><strong>As articulações</strong> — uma articulação é o local onde as extremidades de dois ossos se encontram. Em algumas articulações (imóveis) as extremidades dos ossos encaixam firmemente uma na outra, ou estão fundidas, como nos ossos do crânio e da bacia. A maioria das articulações é móvel e há diversos tipos.</p>
<p>Nestas articulações, as extremidades dos ossos são unidas por ligações de um tecido fibroso chamadas ligamentos, que formam uma cápsula em torno da articulação. O revestimento da cápsula (membrana sinovial) produz um fluido que lubrifica a articulação. As extremidades dos ossos também são protegidas por uma cartilagem macia. Os músculos que fazem mover as articulações estão ligados aos ossos por tendões.</p>
<h2>Fraturas</h2>
<p>Uma fratura é uma racha num osso. Geralmente é necessária uma força considerável para partir um osso, exceto se o osso estiver doente ou velho. No entanto, os ossos em crescimento são moles e podem rachar, dobrar ou partir. Uma força direta ou indireta pode partir o osso no ponto em que recebe uma pancada forte, por exemplo, quando atingido por um automóvel (força direta). Uma fratura também pode resultar de uma torção ou de uma distensão (força indireta).</p>
<h3>Fraturas expostas e fechadas</h3>
<p>Numa fratura exposta, um dos topos do osso partido pode perfurar a superfície da pele, ou pode haver uma ferida no local da fratura. Uma fratura exposta acarreta um grande risco de infeção. Numa fratura fechada, a pele sobre o local da fratura fica intacta. No entanto, os topos do osso podem estar deslocados e causar danos em tecidos internos na área; se os topos do osso perfurarem órgãos ou grandes vasos sanguíneos, a vítima pode ter uma hemorragia interna e desenvolver choque.</p>
<h3>Procedimento</h3>
<ol>
<li>Diga à vítima para não se mexer. Segure e apoie a parte lesionada, ou peça a um ajudante para o fazer, até estar imobilizada.</li>
<li>Para um suporte mais firme, segure a parte lesionada a uma parte sã do corpo. Ponha as ligaduras do lado são. Para fraturas dos membros superiores, imobilize o braço lesionado contra o tronco. Para fraturas dos membros inferiores, se o transporte para o hospital for demorado, segure a perna lesionada à outra perna com uma ligadura.</li>
<li>Leve a vítima ao hospital. Socorra a vítima para o choque, se necessário elevando-lhe as pernas. No entanto, não eleve o membro lesionado se isso provocar dor.</li>
<li>Verifique a circulação abaixo das ligaduras de dez em dez minutos. Se a circulação estiver impedida, alargue as ligaduras.</li>
</ol>
<h3>Cuidado!</h3>
<ul>
<li>Não mova a vítima até a parte lesionada estar imobilizada, a não ser que ela esteja em perigo.</li>
<li>Não deixe a vítima comer, beber ou fumar, pois pode ser necessária uma anestesia geral.</li>
</ul>
`
  },

  // ===== 22. Luxação de uma Articulação =====
  {
    id: "socorros-21-luxacao-de-uma-articulacao",
    h: `<p>Trata-se de uma lesão na articulação, em que os ossos estão parcial ou totalmente fora da sua posição normal. A luxação pode ser causada por uma força intensa que puxe o osso para uma posição anormal. Esta lesão é muito dolorosa e afeta com maior frequência o ombro, o maxilar ou as articulações dos dedos. As luxações podem estar associadas a roturas de ligamentos ou a danos na membrana sinovial, que forra a cápsula articular. Em alguns casos, a luxação de uma articulação pode ter consequências graves. Se houver luxação de vértebras na coluna vertebral, a espinal medula pode ser danificada. Em muitos casos, pode ser difícil distinguir uma luxação de uma fratura fechada. Se tiver dúvida, socorra a lesão como sendo uma fratura.</p>
<h2>Procedimento</h2>
<ol>
<li>Diga à vítima para não se mexer. Apoie a parte lesionada na posição mais confortável para a vítima, antes de a imobilizar.</li>
<li>Imobilize a parte lesionada com compressas, ligaduras e suspensão. Para uma imobilização firme, ligue a parte lesionada a uma parte ilesa do corpo.</li>
<li>Assegure o transporte da vítima ao hospital. Socorra o choque, se necessário. Verifique e registe os sinais vitais — nível de consciência, pulsação e respiração.</li>
<li>Verifique a circulação abaixo das ligaduras de dez em dez minutos. Se estiver impedida, alargue as ligaduras.</li>
</ol>
<h2>Cuidado!</h2>
<ul>
<li>Não tente repor um osso deslocado no lugar, pois pode causar lesões maiores.</li>
<li>Não mova a vítima até o membro lesionado estar apoiado, exceto se ela estiver em perigo.</li>
<li>Não deixe que a vítima coma, beba ou fume, pois pode ser necessária anestesia geral.</li>
</ul>
`
  },

  // ===== 23. Entorses e Distensões =====
  {
    id: "socorros-22-entorses-e-distensoes",
    h: `<p>Entorse pode ser definido como uma separação momentânea das superfícies ósseas, ao nível da articulação. Os tecidos moles em volta dos ossos e das articulações podem sofrer vários tipos de lesões. Estas lesões são vulgarmente chamadas entorses e distensões. Ocorrem quando os tecidos são demasiado esticados e parcial ou totalmente rasgados devido a um movimento violento ou repentino.</p>
<h2>Lesão no músculo e tendões</h2>
<p>Os músculos e tendões podem sofrer distensões, roturas e contusões.</p>
<p>Na distensão, o músculo é esticado para além dos limites normais, podendo romper parcialmente. Acontece muitas vezes na junção do músculo com o tendão que o une ao osso.</p>
<p>Numa rotura, dá-se o rompimento total do músculo ou tendão. Esta pode ocorrer na parte mais profunda do músculo ou no tendão. Pode haver uma equimose profunda ou extensa em zonas do corpo onde há um grande volume de músculo. Estas lesões são normalmente acompanhadas de hemorragia na área lesionada, o que pode causar dor e hematoma.</p>
<h2>Procedimento</h2>
<ol>
<li>Repousar a parte lesionada.</li>
<li>Pôr gelo ou uma compressa fria.</li>
<li>Exercer alguma pressão sobre a lesão.</li>
<li>Elevar a parte lesionada.</li>
</ol>
`
  },

  // ===== 24. Alterações de Consciência =====
  {
    id: "socorros-23-alteracoes-de-consciencia",
    h: `<h2>O sistema nervoso</h2>
<p>Este é o sistema de controlo e de armazenamento de informação do corpo. É formado por uma unidade central de processamento — o cérebro — e uma complexa rede de células e fibras nervosas. O sistema nervoso divide-se em sistema nervoso central, composto pelo encéfalo e a espinal medula, e sistema nervoso periférico, composto por todos os nervos que ligam o encéfalo e a espinal medula ao resto do corpo. O sistema nervoso autónomo (involuntário) controla as funções do corpo como a digestão, o ritmo cardíaco e a respiração. O sistema nervoso central recebe e analisa a informação de todas as partes do corpo. Os nervos transportam mensagens, sob a forma de impulsos elétricos, entre o cérebro e o resto do sistema nervoso.</p>
<h2>Alterações de consciência</h2>
<p>Não há uma separação definida entre o estado consciente e o estado inconsciente. Uma pessoa pode estar alerta e acordada (consciente), pode não reagir a qualquer estímulo (inconsciente), ou pode estar entre estes dois extremos. Por exemplo, uma vítima pode estar confusa e reagir apenas a sons altos ou à dor. Diz-se que uma vítima tem a consciência alterada quando não está totalmente alerta e consciente.</p>
<h3>Teste ao nível de consciência</h3>
<p>Pode avaliar o grau de consciência da vítima com esta sequência de ações:</p>
<ol>
<li>A vítima está alerta? Abre os olhos e responde a perguntas?</li>
<li>A vítima reage à voz? Responde a perguntas simples e obedece a ordens?</li>
<li>A vítima reage à dor? Abre os olhos ou mexe-se quando beliscada?</li>
<li>A vítima não reage a qualquer estímulo?</li>
</ol>
<p>(Transmita o resultado ao profissional de saúde.)</p>
<h3>Cuidado!</h3>
<ul>
<li>Mova a cabeça com muito cuidado, pois a vítima pode ter lesão no pescoço (coluna). Para abrir as vias aéreas, use o método de elevação da mandíbula: ajoelhe-se por trás da cabeça da vítima e coloque as mãos de cada lado da face, com as pontas dos dedos nos ângulos da mandíbula. Levante cuidadosamente o maxilar.</li>
<li>Não mova a vítima desnecessariamente.</li>
</ul>
`
  },

  // ===== 25. Traumatismos Craneoencefálicos (TCE) =====
  {
    id: "socorros-24-traumatismos-craneoencefalicos-tce",
    h: `<p>Todos os traumatismos cranianos são perigosos e requerem um exame cuidado, pois podem levar à perda de consciência.</p>
<p>Os traumatismos podem estar associados a danos no cérebro, nos vasos sanguíneos no interior do crânio, ou a fratura do crânio. Uma lesão na cabeça pode provocar uma concussão, que é um breve período de inconsciência seguido de recuperação total. Algumas lesões na cabeça podem comprimir o cérebro (compressão cerebral), o que representa um risco para a vida. Assim, é importante saber reconhecer possíveis sinais de compressão cerebral, sobretudo a diminuição do nível de consciência.</p>
<p>Uma ferida na cabeça deve alertá-lo para o risco de danos subjacentes, como uma fratura do crânio, que pode ser grave. Também pode ocorrer uma hemorragia no interior do crânio, e causar compressão. A perda de líquido claro ou de sangue aquoso pelos ouvidos ou pelo nariz é sinal de uma lesão grave. Qualquer vítima com uma lesão na cabeça deve ser abordada como tendo também sofrido um traumatismo na coluna.</p>
<h2>Fratura do crânio</h2>
<p>Se a vítima tem uma ferida na cabeça, pode ter fratura do crânio. A vítima pode ou não estar inconsciente.</p>
<p>Uma fratura de crânio é perigosa, pois o cérebro pode ser afetado, seja diretamente pelo osso fraturado ou por uma hemorragia dentro do crânio. Um líquido claro (líquido cefalorraquidiano) ou sangue aguado saindo dos ouvidos ou nariz são sinais de uma lesão grave.</p>
<p>Suspeite de uma fratura craniana numa vítima que tenha sofrido um traumatismo CE que resultou numa perturbação da consciência. Lembre-se de que uma vítima com o crânio fraturado também poderá ter lesionado a coluna e deve ser tratada como tal.</p>
<h3>Sinais e sintomas</h3>
<ul>
<li>Ferida ou equimose na cabeça.</li>
<li>Área sensível ou depressão no couro cabeludo.</li>
<li>Equimose/edema atrás de uma orelha.</li>
<li>Equimose num ou em ambos os olhos.</li>
<li>Perda de líquido claro ou sangue aquoso por um ouvido ou nariz.</li>
<li>Sangue na córnea (olho).</li>
<li>Distorção ou assimetria da cabeça ou face.</li>
<li>Diminuição do nível de consciência — pode evoluir para inconsciência.</li>
</ul>
<h3>Procedimento</h3>
<ol>
<li>Ligue para o 112 e peça ajuda.</li>
<li>Se a vítima estiver consciente, ajude-a a deitar-se. Não lhe deve virar a cabeça, para o caso de haver traumatismo.</li>
<li>Se a vítima estiver inconsciente, abra as vias aéreas elevando a mandíbula e verifique a respiração. Esteja preparado para fazer ventilação artificial e compressões no tórax, se necessário.</li>
<li>Se a posição da vítima impedir a manutenção das vias aéreas, ou se não se conseguir fazer a elevação da mandíbula, coloque-a em posição lateral de segurança.</li>
<li>Se houver corrimento pelo ouvido, cubra-o com um penso esterilizado ou uma compressa limpa com uma ligadura. Não tamponar o ouvido.</li>
<li>Verifique e registe sinais vitais e estado de consciência até chegar ajuda.</li>
</ol>
`
  },

  // ===== 26. Convulsões nas Crianças =====
  {
    id: "socorros-25-convulsoes-nas-criancas",
    h: `<p>Nas crianças pequenas, as convulsões são muitas vezes consequência de febre alta associada a uma infeção da garganta ou dos ouvidos ou a outra doença infeciosa. Este tipo de ataque é conhecido como convulsão febril e é uma reação do cérebro à elevada temperatura do corpo.</p>
<p>A epilepsia é outra causa possível de convulsões nas crianças pequenas. Embora as convulsões possam ser assustadoras, raramente são perigosas se tratadas corretamente. Por razões de segurança, a criança deve ser vista num hospital para verificar a existência de qualquer situação grave subjacente.</p>
<h2>Sinais e sintomas</h2>
<ul>
<li>Convulsão violenta dos músculos, com os punhos cerrados e as costas arqueadas.</li>
</ul>
<p>Também pode haver:</p>
<ul>
<li>Sinais de febre: pele quente e corada e suor.</li>
<li>Olhos fixos ou revirados.</li>
<li>Suspensão da respiração, com a face e o pescoço vermelhos e inchados ou espuma na boca.</li>
<li>Perda ou limitação da consciência.</li>
</ul>
<h2>Procedimento</h2>
<ul>
<li>Coloque almofadas ou cobertores à volta da criança.</li>
<li>Certifique-se de que ela recebe ar fresco (mas cuidado para não a arrefecer demasiado); refresque-a com uma esponja embebida em água tépida.</li>
<li>Depois de terminarem as convulsões, mantenha as vias aéreas abertas, pondo-a em posição lateral de segurança.</li>
<li>Tranquilize a criança e os pais.</li>
</ul>
`
  },

  // ===== 27. Queimaduras - Avaliação e Queimaduras Ligeiras =====
  {
    id: "socorros-26-queimaduras-avaliacao-e-queimaduras-ligeiras",
    h: `<h2>A pele</h2>
<p>A pele é um dos maiores órgãos do corpo e desempenha funções vitais na proteção de lesões e infeções e na manutenção de uma temperatura corporal constante. A pele é composta de duas camadas de tecido — a epiderme (exterior) e a derme (interior) — que assentam numa camada de tecido gordo (gordura subcutânea). A parte de cima da epiderme é composta de células mortas e achatadas que são continuamente substituídas por células novas formadas na parte inferior desta camada. A epiderme é protegida por uma substância gordurosa chamada sebo, segregada por glândulas sebáceas que tornam a pele macia e impermeável. A derme contém vasos sanguíneos, nervos, músculos, glândulas sebáceas, glândulas sudoríparas (suor) e raízes de pelos (folículos). As extremidades dos nervos sensoriais na derme registam as sensações da superfície do corpo, como o calor, o frio, a dor e mesmo o mais pequeno toque. Os vasos sanguíneos fornecem nutrientes à pele e ajudam a regular a temperatura do corpo, conservando ou libertando calor.</p>
<h2>Queimaduras</h2>
<p>Quando a pele é lesada por uma queimadura, deixa de poder funcionar eficazmente como uma barreira contra as infeções. Além disso, pode haver uma perda de fluido corporal, pois os pequenos vasos sanguíneos na pele libertam plasma. Estes acumulam-se nos tecidos formando flictenas (bolhas), ou escoam através da superfície da pele. Ao avaliar uma queimadura antes de iniciar o socorro, deve verificar se há outras lesões associadas.</p>
<h2>Avaliar uma queimadura</h2>
<p>Ao avaliar uma queimadura é importante considerar as circunstâncias em que ocorreu, se as vias aéreas foram afetadas, e a sua extensão, localização e profundidade. Uma queimadura tem muitas causas possíveis. Ao estabelecer a causa da queimadura, podem ser identificados outros potenciais problemas resultantes do acidente. Por exemplo, um incêndio num espaço fechado terá certamente libertado monóxido de carbono. Outros fumos tóxicos podem ser libertados, no caso de haver materiais combustíveis. Se as vias aéreas da vítima forem afetadas, ela poderá ter dificuldade em respirar e precisar de assistência médica e hospitalar urgente.</p>
<h3>Profundidade da queimadura</h3>
<p>As queimaduras são classificadas segundo a profundidade dos danos sofridos pela pele e pelas estruturas atingidas: podem ser de 1.º, 2.º ou 3.º graus, sendo o primeiro o mais superficial. Uma vítima pode sofrer queimaduras de vários tipos.</p>
<ul>
<li><strong>Queimadura de 1.º grau</strong> — afeta apenas a epiderme. Caracteriza-se por rubor, edema (inchaço) e dor. Este tipo de lesão cura-se bem se socorrida rapidamente, e se não se formarem flictenas. A queimadura solar é um dos tipos mais comuns de queimaduras de 1.º grau. Outras causas são pequenos acidentes domésticos.</li>
<li><strong>Queimadura de 2.º grau</strong> — afeta a epiderme. A pele fica vermelha e em &quot;carne viva&quot;. Formam-se flictenas devido ao plasma libertado pelos tecidos danificados. Geralmente estas queimaduras cicatrizam com facilidade, mas podem ser graves e fatais se a área afetada for extensa e cobrir mais de 20% do corpo.</li>
<li><strong>Queimadura de 3.º grau</strong> — todas as camadas da pele são afetadas; os nervos, tecidos gordos, músculos e vasos sanguíneos podem ser atingidos. Geralmente perde-se a sensação de dor, o que pode induzir em erro a vítima e o socorrista em relação à gravidade das lesões. A pele pode parecer pálida ou carbonizada. Estas queimaduras requerem assistência de profissionais de saúde urgente.</li>
</ul>
<h2>Queimaduras ligeiras</h2>
<p>As queimaduras pequenas e superficiais são geralmente causadas por pequenos acidentes, como tocar num ferro de engomar quente, num tacho que esteja ao lume ou derramar líquido quente sobre a pele (água, chá, óleo, etc.). Algum tempo após a queimadura, podem formar-se flictenas, causadas pelo plasma libertado para a área queimada, mesmo sob a superfície da pele. Nunca deve rebentar uma &quot;bolha&quot;, pois pode infetar a ferida.</p>
<h3>Procedimento</h3>
<ol>
<li>Encharque a zona afetada com água fria durante pelo menos 10 minutos para atenuar o ardor e aliviar a dor.</li>
<li>Se possível, use luvas descartáveis. Retire com cuidado quaisquer joias, relógio, cinto e roupas apertadas da área lesionada antes que esta inche.</li>
<li>Cubra a área com um penso esterilizado e fixe com uma ligadura pouco apertada.</li>
</ol>
<h3>Cuidado!</h3>
<ul>
<li>Não rebente as flictenas nem interfira com a área afetada. No entanto, se rebentar ou correr esse risco, proteja a área com um penso seco, não adesivo, maior do que a área afetada, e deixe ficar até desaparecer ou secar.</li>
<li>Não ponha pensos ou fitas adesivas sobre a pele; a queimadura pode ser mais extensa do que parece.</li>
<li>Não use cremes, manteigas ou outras &quot;mezinhas&quot; nas queimaduras, pois podem lesar ainda mais os tecidos e aumentar o risco de infeção.</li>
</ul>
`
  },

  // ===== 28. Queimaduras Graves e por Choque Elétrico =====
  {
    id: "socorros-27-queimaduras-graves-e-por-choque-eletrico",
    h: `<p>É necessário especial cuidado ao tratar de queimaduras profundas ou muito extensas. Quanto mais tempo se prolongar a queimadura, mais grave será a lesão. Se a vítima tiver ficado queimada num incêndio, deve partir-se do princípio de que o fumo e o ar quente também afetaram o sistema respiratório. As prioridades do socorrista são arrefecer rapidamente a queimadura e verificar a respiração da vítima. Uma vítima com uma queimadura grave irá certamente desenvolver choque, o que requer cuidados hospitalares.</p>
<h2>Procedimento</h2>
<ol>
<li>Ajude a vítima a deitar-se; se possível, proteja a área queimada do contacto com o chão.</li>
<li>Deite muita água fria sobre a queimadura durante pelo menos 10 minutos, mas não atrase o transporte da vítima para o hospital.</li>
<li>Ligue 112 para chamar uma ambulância.</li>
<li>Se possível, use luvas descartáveis. Retire com cuidado anéis, relógio, cinto, sapatos ou roupa em brasa antes que a área comece a inchar. Retire também com cuidado a roupa queimada, desde que não esteja agarrada à ferida.</li>
<li>Cubra a ferida com um penso esterilizado para proteger do risco de infeção. Se não tiver um penso esterilizado, use um lenço de tecido ou lençol. Nunca use algodão, pois é difícil a sua remoção da ferida, correndo o risco de ficarem alguns pelos retidos e dificultarem a cicatrização. <strong>Exceção:</strong> se a vítima tiver queimaduras na face, não cubra a ferida, pois pode afligi-la e obstruir-lhe as vias aéreas — arrefeça a área com água para aliviar a dor até chegar ajuda.</li>
<li>Enquanto espera pela ajuda, tranquilize a vítima e verifique o nível de consciência, se está orientada no tempo/espaço.</li>
</ol>
<h1>Queimaduras por choque elétrico</h1>
<p>As queimaduras podem ser causadas pela passagem de corrente elétrica. Os danos mais visíveis ocorrem nos pontos de entrada e saída da corrente, mas esta também pode ter causado um rasto de danos internos. A posição e direção das feridas de entrada e de saída podem alertar para a possível extensão das lesões internas, e para o grau de choque que pode suceder.</p>
<p>As queimaduras podem ser causadas por um relâmpago ou por corrente de baixa ou alta voltagem. Um choque elétrico pode causar paragem cardíaca. Se a vítima estiver inconsciente, a prioridade imediata, após ter-se certificado de que a área é segura, é abrir as vias aéreas e verificar a respiração e a circulação.</p>
<h2>Procedimento</h2>
<ol>
<li>Antes de tocar na vítima, certifique-se de que o contacto com a fonte de eletricidade foi cortado.</li>
<li>Encharque os locais da lesão, nos pontos de entrada e de saída de corrente, com bastante água fria para arrefecer as queimaduras.</li>
<li>Se possível, use luvas descartáveis. Ponha um penso esterilizado, um lenço de tecido ou outro material limpo, sem pelos, sobre as queimaduras, para evitar infeções.</li>
<li>Ligue 112 para chamar uma ambulância. Tranquilize a vítima.</li>
</ol>
<h2>Cuidado!</h2>
<ul>
<li>Não se aproxime de uma vítima de um choque de alta voltagem até ser oficialmente informado de que a corrente foi desligada.</li>
<li>Se a vítima estiver inconsciente, abra as vias aéreas e verifique a respiração. Esteja pronto para fazer compressões e ventilação no tórax, se necessário (30:2).</li>
</ul>
`
  },

  // ===== 29. Queimaduras por Agentes Químicos =====
  {
    id: "socorros-28-queimaduras-por-agentes-quimicos",
    h: `<p>Alguns químicos podem irritar, lesionar ou ser absorvidos pela pele, causando danos generalizados e por vezes fatais. Ao contrário das queimaduras térmicas, os sinais não são imediatamente evidentes, mas o socorro é o mesmo.</p>
<p>A maioria dos corrosivos fortes encontra-se na indústria, apesar de as queimaduras por agentes químicos também ocorrerem em casa, sobretudo com detergentes da louça (a causa mais frequente nas crianças), limpa-fornos e decapante. As queimaduras por agentes químicos são graves e podem requerer tratamento hospitalar urgente. Se possível, anote o nome ou a marca do produto.</p>
<p>Antes de socorrer a vítima, certifique-se de que a área está em segurança, pois alguns químicos libertam gases fatais.</p>
<h2>Procedimento</h2>
<ol>
<li>Certifique-se de que a área é segura. Ventile a área para dispersar gases e, se possível, sele o contentor do produto químico. Retire a vítima da área, se necessário.</li>
<li>Encharque a área afetada com água durante pelo menos 20 minutos para dispersar o agente químico e atenuar o ardor.</li>
<li>Retire com cuidado qualquer peça de roupa contaminada enquanto molha a lesão.</li>
<li>Assegure o transporte da vítima ao hospital. Certifique-se de que as vias aéreas estão abertas.</li>
<li>Avise os serviços de segurança ou de urgência do local. Transmita ao profissional de saúde qualquer detalhe sobre o químico.</li>
</ol>
<h1>Queimaduras por agente químico nos olhos</h1>
<p>Salpicos de químicos para os olhos podem causar lesões graves se não forem socorridos de imediato. Os químicos podem danificar a superfície do olho, causando uma cicatriz ou mesmo cegueira. O socorrista deve lavar o olho com água, para diluir o químico e dispersá-lo. Ao molhar o olho, tenha especial cuidado para que a água contaminada não o atinja a si nem à vítima. Antes de começar a socorrer a vítima, use luvas de proteção, se possível.</p>
<h2>Procedimento</h2>
<ol>
<li>Se possível, use luvas descartáveis. Faça correr um fio de água fria sobre o olho afetado durante pelo menos 10 minutos. Certifique-se de que a água chega aos dois lados da pálpebra.</li>
<li>Se o olho estiver fechado num espasmo de dor, puxe as pálpebras com cuidado. Peça à vítima para segurar uma compressa esterilizada, ou um material limpo e sem pelo, sobre o olho afetado. Se a vítima não receber assistência de saúde logo, fixe a compressa com uma ligadura, sem apertar.</li>
<li>Se possível, identifique o produto químico. Leve a vítima ao hospital.</li>
</ol>
<h2>Cuidado!</h2>
<ul>
<li>Não deixe que a vítima toque no olho ou tente tirar a lente de contacto.</li>
</ul>
`
  },

  // ===== 30. Farpa e Corpos Estranhos (Olhos e Ouvidos) =====
  {
    id: "socorros-29-farpa-e-corpos-estranhos-olhos-e-ouvidos",
    h: `<h2>Anatomia / fisiologia</h2>
<p><strong>A pele</strong> — é um dos maiores órgãos do corpo e é composta por duas camadas: a epiderme (exterior) e a derme (interior). A pele forma uma barreira contra substâncias nocivas e germes. Também é um importante órgão sensorial, que contém nervos que asseguram que o corpo é sensível ao calor, ao frio, à dor e ao toque.</p>
<p><strong>Os olhos</strong> — cada olho tem uma parte colorida (íris) com uma pequena abertura (pupila) que deixa entrar a luz. O tamanho da pupila muda conforme a quantidade de luz que entra no olho. Uma lente transparente no centro (cristalino) faz convergir os raios de luz num &quot;ecrã&quot; (retina) no fundo do olho. Células nervosas na retina traduzem esta informação em impulsos elétricos que percorrem o nervo ótico até ao cérebro, onde são analisados. Os olhos estão protegidos nas órbitas, no crânio. As pestanas e uma membrana delicada chamada conjuntiva protegem a parte da frente dos olhos.</p>
<p><strong>Os ouvidos</strong> — além de serem os órgãos auditivos, os ouvidos também desempenham um importante papel no equilíbrio. A parte visível de cada ouvido é o pavilhão auricular, que conduz os sons para o canal auditivo para fazer vibrar o tímpano. Pequenos pelos no interior do ouvido filtram a sujidade e glândulas segregam cera para reter quaisquer outras pequenas partículas. As vibrações do tímpano atravessam o ouvido médio até ao aparelho vestibular (cóclea) no ouvido interno. Esta estrutura converte as vibrações em impulsos nervosos e transmite-os ao cérebro através do aparelho auditivo. O aparelho vestibular, no ouvido interno, controla o equilíbrio.</p>
<h2>Farpa</h2>
<p>Pequenas farpas de madeira, metal ou vidro podem atravessar a camada superior da pele. Acarretam um risco de infeção, pois raramente são limpas. As áreas mais vulgarmente afetadas são as mãos, os joelhos e os pés. Geralmente, a farpa é retirada com uma pinça. Contudo, se a farpa estiver muito funda, ficar sobre uma articulação ou não sair com facilidade, não tente retirá-la e diga à vítima para se dirigir aos serviços de saúde.</p>
<h3>Procedimento</h3>
<ol>
<li>Esterilize uma pinça passando-a por uma chama e deixe-a arrefecer. Se possível, use luvas descartáveis. Limpe à volta da farpa com água tépida e sabão.</li>
<li>Agarre a farpa o mais próximo possível da pele e puxe-a no mesmo ângulo em que entrou.</li>
<li>Esprema um pouco a ferida para expulsar os resíduos.</li>
<li>Limpe a área, seque-a e cubra-a com um penso rápido para minimizar o risco de infeção.</li>
</ol>
<h3>Cuidado!</h3>
<ul>
<li>Se a farpa estiver encravada ou não sair facilmente, não fure a pele com um objeto afiado, como uma agulha, pois pode provocar uma infeção. Proteja o local com compressas esterilizadas, sem exercer pressão, e dirija-se ao serviço de saúde.</li>
<li>Pergunte à vítima se tem a vacina do tétano atualizada, e aconselhe-a a dirigir-se ao seu Centro de Saúde para verificar se necessita de a efetuar.</li>
</ul>
<h2>Corpos estranhos nos olhos</h2>
<p>Um grão de poeira, uma pestana, ou mesmo uma lente de contacto podem alojar-se na esclerótica. Geralmente, são fáceis de remover.</p>
<h3>Sinais e sintomas</h3>
<ul>
<li>Visão desfocada.</li>
<li>Dor e desconforto.</li>
<li>Vermelhidão e lacrimejar.</li>
<li>Pálpebras contraídas num espasmo.</li>
</ul>
<h3>Procedimento</h3>
<ol>
<li>Sente a vítima virada para a luz e diga-lhe para não esfregar o olho.</li>
<li>Coloque-se por trás da vítima. Afaste as pálpebras com cuidado e examine o olho. Peça à vítima para olhar em todas as direções.</li>
<li>Se conseguir visualizar o corpo estranho na parte branca do olho, faça-o sair deitando soro fisiológico ou água limpa no canto interior do olho.</li>
<li>Se isso não resultar, levante o corpo estranho com uma compressa húmida ou com o canto molhado de um lenço limpo. Se não conseguir remover o objeto, procure os serviços de saúde.</li>
</ol>
<h2>Corpos estranhos nos ouvidos</h2>
<p>Se um corpo estranho se alojar no ouvido, pode causar surdez temporária, ao bloquear o canal auditivo. Em alguns casos pode causar lesões no tímpano. As crianças pequenas, muitas vezes, enfiam objetos nos ouvidos, e muitas pessoas deixam algodão nos ouvidos depois de os limparem.</p>
<h3>Procedimento</h3>
<ol>
<li>Leve a vítima para o hospital o mais rápido possível. Não tente retirar o corpo estranho alojado. Pode causar lesões graves e empurrar o objeto mais para dentro.</li>
<li>Se for um inseto, incline a cabeça ficando o ouvido afetado para cima, e faça correr água morna para o inseto sair. Se não resultar, leve a vítima para o hospital.</li>
<li>Tranquilize a vítima até obter cuidados de saúde.</li>
</ol>
`
  },

  // ===== 31. Envenenamento - Ingestão, Químicos na Pele e nos Olhos =====
  {
    id: "socorros-30-envenenamento-ingestao-quimicos-na-pele-e-nos-olhos",
    h: `<h2>Atuação dos venenos no organismo</h2>
<p>Um veneno, também designado por toxina, é uma substância que, se entrar no organismo em quantidade suficiente, pode causar danos temporários ou permanentes. Os venenos podem ser ingeridos, inalados, absorvidos através da pele, salpicados para os olhos, ou injetados. Uma vez dentro do organismo, podem entrar na corrente sanguínea e ser rapidamente transportados para todos os órgãos e tecidos. Os sinais e sintomas do envenenamento variam conforme o veneno — podem desenvolver-se de imediato ou ao longo de vários dias. Os vómitos são comuns, especialmente no caso de ingestão do veneno. Os venenos inalados provocam dificuldades respiratórias.</p>
<h2>Tipos de venenos</h2>
<p>Alguns venenos são criados pelo homem — por exemplo, químicos e medicamentos — e estão presentes tanto nas nossas casas como na indústria. Em quase todas as casas é possível encontrar substâncias potencialmente venenosas, além de medicamentos que podem ser perigosos se tomados em excesso. Outros venenos têm origem na natureza. Por exemplo, há plantas que produzem toxinas que podem causar irritação na pele, ou sintomas mais graves se ingeridas, e vários insetos e outros animais expelem veneno quando picam ou mordem. A contaminação de alimentos por bactérias pode provocar intoxicação alimentar — uma das formas mais comuns de envenenamento.</p>
<h2>Ingestão de venenos</h2>
<p>Os químicos ingeridos podem afetar o tubo digestivo, ou causar danos mais generalizados se entrarem na corrente sanguínea e forem transportados para todo o corpo. Os químicos perigosos incluem produtos domésticos comuns. Por exemplo, lixívia, detergente da louça e diluente são tóxicos ou corrosivos, se ingeridos. Os medicamentos, quer sejam receitados ou não, também são potencialmente perigosos se tomados em excesso. Os efeitos do envenenamento dependem da substância ingerida.</p>
<h3>Objetivos</h3>
<ul>
<li>Manter as vias aéreas abertas, a respiração e a circulação.</li>
<li>Retirar quaisquer roupas contaminadas.</li>
<li>Identificar o veneno.</li>
<li>Assegurar o transporte urgente para o hospital.</li>
</ul>
<h3>Sinais e sintomas</h3>
<p>Dependendo do veneno, pode haver:</p>
<ul>
<li>Vómitos, por vezes com sangue.</li>
<li>Consciência alterada.</li>
<li>Sensação de dor ou ardor.</li>
<li>Embalagens vazias nas proximidades.</li>
</ul>
<h3>Procedimento</h3>
<ol>
<li>Se a vítima estiver consciente, peça-lhe para identificar o veneno, e tranquilize-a.</li>
<li>Ligue 112 e peça ajuda. Dê o máximo de informação possível sobre o veneno ingerido, e transporte a embalagem para o hospital, se possível.</li>
</ol>
<h3>Cuidado!</h3>
<ul>
<li>Nunca tente provocar o vómito.</li>
<li>Se a vítima ficar inconsciente, verifique a respiração. Esteja pronto para fazer ventilação artificial e compressões torácicas. Use máscara para fazer ventilação artificial, se houver químicos na boca da vítima. Se a vítima respira, ponha-a em posição lateral de segurança.</li>
</ul>
<h2>Químicos na pele</h2>
<p>O derrame de químicos perigosos sobre a pele pode provocar irritação ou queimaduras. Além disso, certas substâncias são absorvidas pela pele e podem causar danos no organismo. Os químicos mais perigosos encontram-se na indústria, mas produtos de uso doméstico como detergentes, limpa-fornos e diluente também são potencialmente perigosos. As queimaduras provocadas por químicos podem necessitar de tratamento hospitalar urgente.</p>
<h3>Sinais e sintomas</h3>
<p>Pode haver:</p>
<ul>
<li>Dor intensa e aguda.</li>
<li>Sinais de substâncias químicas ou embalagens na proximidade.</li>
<li>Descoloração, formação de flictenas, esfoliação e edema da área afetada, o que pode ocorrer de imediato ou algum tempo depois.</li>
</ul>
<p>Socorrer como em <a href="#/socorros-28-queimaduras-por-agentes-quimicos">Queimaduras por Agentes Químicos</a>.</p>
<h2>Venenos nos olhos</h2>
<p>Muitos produtos químicos — líquidos e gasosos — de uso doméstico podem irritar os olhos. As membranas que protegem o olho absorvem rapidamente o químico, o que pode provocar uma lesão em muito pouco tempo.</p>
<p>Alguns químicos podem danificar a superfície do olho, e causar uma cicatriz permanente ou mesmo cegueira. Por esta razão é necessária a prestação imediata de primeiros socorros para lavar quaisquer químicos salpicados para os olhos. Deve recorrer sempre aos serviços de saúde.</p>
<h3>Sinais e sintomas</h3>
<p>Pode haver:</p>
<ul>
<li>Dor forte no olho.</li>
<li>Incapacidade de abrir o olho afetado.</li>
<li>Vermelhidão e edema à volta do olho.</li>
<li>Lacrimejar abundante.</li>
</ul>
<p>Socorrer como em <a href="#/socorros-28-queimaduras-por-agentes-quimicos">Queimadura por Agente Químico no Olho</a>.</p>
`
  },

  // ===== 32. Intoxicação Alimentar =====
  {
    id: "socorros-31-intoxicacao-alimentar",
    h: `<p>Geralmente, este tipo de intoxicação é causado pela ingestão de alimentos contaminados por bactérias ou vírus. Por vezes, deve-se a toxinas produzidas por bactérias que já se encontravam nos alimentos. O grupo de bactérias do género <em>Salmonella</em>, que se encontra sobretudo na carne, é uma causa comum de intoxicação alimentar. Os sintomas podem aparecer de imediato ou apenas um ou dois dias após a ingestão dos alimentos contaminados.</p>
<p>O envenenamento por alimentos tóxicos é geralmente causado por toxinas produzidas pelas bactérias estafilococos. Os sintomas costumam surgir rapidamente — possivelmente duas a seis horas após a ingestão de alimentos infetados.</p>
<p>Um dos perigos da intoxicação alimentar é a perda de fluidos corporais. A desidratação que daí resulta pode ser grave se os líquidos não forem rapidamente substituídos. A desidratação é particularmente grave nas vítimas extremamente novas ou idosas. Em alguns casos pode ser necessário tratamento hospitalar.</p>
<h2>Sinais e sintomas</h2>
<ul>
<li>Náusea e vómitos.</li>
<li>Dores e cãibras abdominais.</li>
<li>Diarreia.</li>
<li>Consciência alterada.</li>
</ul>
<h2>Procedimento</h2>
<ol>
<li>Aconselhe a vítima a deitar-se e a descansar.</li>
<li>Faça a vítima beber muitos líquidos.</li>
<li>Se o estado da vítima não melhorar, ligue 112.</li>
</ol>
`
  },

  // ===== 33. Picada de Insecto e Mordedura de Animal =====
  {
    id: "socorros-32-picada-de-insecto-e-mordedura-de-animal",
    h: `<p>As picadas de vespas, abelhas e moscardos são mais dolorosas do que perigosas. A uma dor aguda inicial, segue-se um ligeiro edema, vermelhidão e irritabilidade. Múltiplas picadas de insetos podem provocar uma reação grave. Uma picada na boca ou na garganta é grave, pois pode obstruir as vias aéreas. Em qualquer caso de mordedura ou picada é importante estar atento aos sinais de uma reação alérgica, que pode levar a um choque anafilático.</p>
<h2>Procedimento</h2>
<ol>
<li>Tranquilize a vítima. Se o ferrão estiver visível, retire-o.</li>
<li>Se possível, eleve o local afetado e aplique um saco com gelo ou uma compressa fria. Se a dor e o edema persistirem, aconselhe a vítima a obter assistência de saúde.</li>
</ol>
<h2>Cuidado!</h2>
<ul>
<li>Se uma vítima tiver sido picada na boca ou garganta, leve-a aos serviços de saúde. Existe o risco de edema dos tecidos da boca e/ou garganta, o que pode bloquear as vias aéreas. Para evitar que isso aconteça, dê à vítima um cubo de gelo para chupar ou um copo de água fria para beber em goles pequenos.</li>
<li>Se a vítima mostrar sinais de choque anafilático, como dificuldade na respiração ou edema da face e do pescoço, ligue 112 e peça ajuda.</li>
</ul>
<h1>Mordedura de animal</h1>
<p>Os dentes afiados dos animais causam feridas punctiformes profundas, permitindo que as bactérias e os germes alcancem os tecidos mais fundos. As mordeduras por humanos também podem esmagar os tecidos. Qualquer mordedura que perfure a pele requer primeiros socorros imediatos e assistência médica devido ao risco de infeção. O risco mais grave de infeção é o da raiva, uma infeção potencialmente fatal do sistema nervoso. O vírus é transmitido pela saliva de animais infetados. Uma mordedura de animal acarreta o risco de tétano. O risco de transmissão do vírus da hepatite B ou C através de uma mordedura humana é reduzido — e é ainda menor o do vírus da SIDA.</p>
<h2>Procedimento</h2>
<ol>
<li>Calce luvas descartáveis. Lave bem a ferida com água morna e sabão para minimizar o risco de infeção.</li>
<li>Seque a ferida com uma compressa sem esfregar, e proteja com uma compressa esterilizada.</li>
<li>Acompanhe a vítima aos serviços de saúde, pois normalmente feridas deste tipo infetam e é necessária medicação profilática.</li>
</ol>
<h2>Cuidado!</h2>
<ul>
<li>Pergunte se a vítima está vacinada contra o tétano, aconselhando-a a dirigir-se aos serviços de saúde para verificar.</li>
</ul>
`
  },

]);
