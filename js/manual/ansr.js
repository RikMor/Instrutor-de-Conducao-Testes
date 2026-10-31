/* ============================================================
   MÓDULO: Relatório Anual 2025 — Sinistralidade (ANSR)   (grupo: Relatórios)
   Ficheiro gerado a partir do vault — não editar à mão.

   Cada nota é um bloco { id, h }:
     id = identificador da nota (o mesmo que aparece no endereço #/id)
     h  = texto da nota em HTML

   Notas deste módulo (11):
       1. Índice
       2. Sinistralidade em Portugal - Visão Geral e Evolução
       3. Sinistralidade por Mês e Dia da Semana
       4. Sinistralidade por Período Horário e Fatores Atmosféricos
       5. Sinistralidade por Natureza e Localização
       6. Sinistralidade por Tipo de Via e Distrito
       7. Sinistralidade por Categoria de Utente e Veículo
       8. Vítimas Mortais por Entidade Gestora de Via
       9. Fiscalização
      10. Processo Contraordenacional
      11. Anexo - Caracterização dos Acidentes com Vítimas Mortais
   ============================================================ */

MANUAL_LOAD("ansr", [

  // ===== 1. Índice =====
  {
    id: "ansr-00-indice",
    h: `<h1>Relatório Anual 2025 — ANSR</h1>
<p>Sinistralidade 24 horas, fiscalização rodoviária e processo contraordenacional.</p>
<h2>Ficha técnica</h2>
<ul>
<li><strong>Título:</strong> Relatório Anual de 2025</li>
<li><strong>Autor:</strong> Autoridade Nacional de Segurança Rodoviária (ANSR) — Avenida de Casal de Cabanas, 1, 2734-507 Barcarena — mail@ansr.pt</li>
<li><strong>Conceção técnica:</strong> Unidade de Prevenção e Segurança Rodoviária, Divisão de Observatório de Segurança Rodoviária — Ana Coroado, Hélder Batista, Jorge Rebelo, Maria Barros</li>
<li><strong>Data de edição:</strong> 30/06/2026</li>
<li><strong>Data dos dados:</strong> 09/06/2026</li>
</ul>
<h2>Sumário executivo</h2>
<p>Em 2025, no Continente e nas Regiões Autónomas, registaram-se 39.007 acidentes com vítimas, 450 vítimas mortais, 2.863 feridos graves e 45.724 feridos leves.</p>
<p>Face a 2024, o balanço nacional registou uma evolução favorável na severidade dos acidentes, traduzida num recuo de 5,7% nas vítimas mortais (-27 óbitos). Contudo, o volume global de sinistralidade manteve a tendência de crescimento, com aumentos homólogos de 2,6% nos acidentes (+970), de 3,9% nos feridos graves (+107) e de 2,5% nos feridos leves (+1.106).</p>
<p>Em relação a 2019 — ano de referência para monitorização das metas de redução do número de mortos e de feridos graves até 2030 fixadas pela Comissão Europeia e por Portugal — verificou-se uma evolução marcadamente positiva no indicador mais crítico, traduzida num decréscimo de 13,5% nas vítimas mortais (-70 óbitos). Em sentido oposto, os restantes indicadores registaram agravamentos: os acidentes aumentaram 4,7% (+1.756 acidentes), os feridos graves subiram 13,1% (+331) e os feridos leves incrementaram 1,7% (+771).</p>
<p>No Continente, o balanço de 2025 fixou-se em 37.259 acidentes com vítimas, dos quais resultaram 442 vítimas mortais, 2.651 feridos graves e 43.703 feridos leves.</p>
<ul>
<li>Comparando com 2016, a tendência crescente foi visível nos acidentes (+4.960; +15,4%), nos feridos graves (+549; +26,1%) e nos feridos leves (+4.582; +11,7%). Em contrapartida, registou-se uma ligeira diminuição nas vítimas mortais (-3; -0,7%) e no índice de gravidade (número de mortos por 100 acidentes com vítimas) de 13,9%, de 1,38 para 1,19.</li>
<li>Comparativamente a 2019, registaram-se diminuições de 32 vítimas mortais (-6,8%) e no índice de gravidade de 10,6%, de 1,33 para 1,19. Por outro lado, observou-se um aumento nos feridos graves (+350; +15,2%), nos feridos leves (+501; +1,2%) e nos acidentes (+1.555; +4,4%).</li>
<li>Comparativamente com 2024, registou-se uma diminuição de 21 vítimas mortais (-4,5%) e de 6,9% no índice de gravidade, que reduziu de 1,27 para 1,19. Contudo, registaram-se mais 921 acidentes (+2,5%), mais 75 feridos graves (+2,9%) e mais 1.020 feridos leves (+2,4%). Nos termos das informações disponibilizadas pelo IMT, registou-se um aumento de 5,8% no Tráfego Médio Diário Mensal na rede nacional de autoestradas em 2025, em linha com a revisão em alta no consumo de combustível rodoviário (DGEG).</li>
</ul>
<p>Principais destaques da sinistralidade nacional em 2025 (ver ficheiros de detalhe para cada dimensão):</p>
<ul>
<li><strong>Sazonalidade:</strong> julho registou o máximo anual absoluto de acidentes (10,0%; 3.889) e de feridos leves (10,0%; 4.551); agosto foi o mês mais crítico em gravidade, com os máximos absolutos anuais em vítimas mortais (13,6%; 61) e feridos graves (10,8%; 310). Junho e agosto tiveram os maiores agravamentos homólogos na mortalidade (+23,1% e +22,0%); outubro liderou no aumento de acidentes (+10,7%). Dezembro teve quedas homólogas em acidentes, feridos graves e feridos leves, mas agravamento de 15,0% na mortalidade.</li>
<li><strong>Dia da semana:</strong> sexta-feira é o dia com mais acidentes (6.098; 15,6%) e mais feridos leves (7.117); sábado é o dia mais letal e grave (20,2% das vítimas mortais; 17,7% dos feridos graves), com os piores agravamentos homólogos semanais (+12,3% mortalidade; +12,4% feridos graves). Domingo tem o mínimo de acidentes mas o 2.º maior número de mortos (77) e feridos graves (479). Segunda-feira teve o maior aumento percentual semanal na mortalidade (+23,3%).</li>
<li><strong>Período horário:</strong> 15h-18h concentra os máximos anuais absolutos (21,5% dos acidentes, 22,7% das vítimas mortais, 21,5% dos feridos graves), com agravamento homólogo de 15,9% na mortalidade. O bloco 18h-21h teve evolução muito positiva (-33,0% na mortalidade). A madrugada ([03h-06h[) teve os maiores agravamentos percentuais (+40,7% VM; +40,2% FG), apesar do baixo volume absoluto.</li>
<li><strong>Fatores atmosféricos:</strong> 82,2% dos acidentes ocorreram em &quot;bom tempo&quot; (87,3% da mortalidade); a chuva foi o segundo fator mais relevante (17,1% dos acidentes), com subidas homólogas de ~10% em acidentes e feridos leves.</li>
<li><strong>Natureza do acidente:</strong> a colisão é a mais frequente (53,4%; 20.846), os despistes são os mais letais (45,1% da mortalidade), os atropelamentos totalizaram 5.070 acidentes (13,0%).</li>
<li><strong>Localização:</strong> dentro das localidades concentra 77,2% dos acidentes, 53,1% das vítimas mortais e 63,7% dos feridos graves, mas com desagravamentos homólogos na sinistralidade grave; fora das localidades agravou-se (acidentes +11,6%; feridos graves +17,1%), com IGR de 2,37 (três vezes o valor dentro das localidades, 0,79).</li>
<li><strong>Tipo de via:</strong> arruamentos concentram 61,7% dos acidentes; EN têm 19,5% dos acidentes e 32,4% das vítimas mortais; AE tiveram agravamento homólogo de 33,3% nos feridos graves; IP têm o IGR mais elevado (5,37).</li>
<li><strong>Distrito/Região Autónoma:</strong> Lisboa liderou o aumento absoluto de acidentes (+315); Bragança, Aveiro e Portalegre lideraram os agravamentos absolutos em vítimas mortais; Portalegre e Bragança lideram os agravamentos percentuais em sinistralidade grave agregada (+47,9% e +39,7%).</li>
<li><strong>Categoria de utente:</strong> condutores mantêm o maior peso na mortalidade (74,0%; 333), seguidos de passageiros (15,8%; 71) e peões (10,2%; 46); mortalidade de condutores e peões desceu (-4,0% e -36,1%), mas subiu nos passageiros (+22,4%).</li>
<li><strong>Categoria de veículo:</strong> automóveis ligeiros são 70,9% dos veículos intervenientes; velocípedes (+76,7% face a 2019; +16,1% face a 2024) e motociclos (+35,8%; +1,2%) em forte crescimento; ciclomotores em queda (-40,0%; -10,4%).</li>
<li><strong>Entidade gestora de via:</strong> 50,4% das vítimas mortais em 2025 ocorreram na rede rodoviária nacional (Infraestruturas de Portugal 42,4%, Brisa 4,4%, Município de Lisboa 3,6%).</li>
</ul>
<p>Quanto à fiscalização e processo contraordenacional:</p>
<ul>
<li>Em 2025 foram fiscalizados 318,6 milhões de veículos e condutores (3,1 milhões presencialmente e 315,6 milhões automaticamente por radar), um aumento de 21,3% face a 2024.</li>
<li>As infrações ascenderam a 1,4 milhão (-5,7% face a 2024); a taxa de infração global foi de 0,41% (-20,5%).</li>
<li>54,9% das infrações foram por excesso de velocidade (-13,3%); decréscimos generalizados nas restantes tipologias, com destaque para ausência de seguro (-49,4%) e inspeção periódica obrigatória (-18,0%).</li>
<li>Em 2025, 2,1 milhões de condutores foram submetidos ao teste de álcool; a taxa de infração por álcool desceu de 1,71% para 1,64%.</li>
<li>As detenções por criminalidade rodoviária aumentaram 20,9%, atingindo 35,8 mil condutores (55,4% por álcool; 32,0% por falta de habilitação legal).</li>
<li>Até dezembro de 2025, 840,3 mil condutores estavam sancionados com subtração de pontos na carta por pontos; desde junho de 2016, 3.991 condutores ficaram com o título de condução cassado.</li>
</ul>
<h2>Definições gerais</h2>
<p><strong>Fontes de dados</strong></p>
<ul>
<li>Sinistralidade rodoviária: Boletim Estatístico de Acidente de Viação (BEAV), com dados da PSP e GNR.</li>
<li>Fiscalização: dados da PSP, GNR e PML, bem como do sistema de radares SINCRO na ANSR.</li>
<li>Processo contraordenacional: dados ANSR.</li>
</ul>
<p><strong>Âmbito geográfico:</strong> dados gerais para Portugal; dados detalhados para o Continente.</p>
<p><strong>Critério de apuramento (sinistralidade):</strong> vítimas a 24 horas.</p>
<p><strong>Tipo de dados:</strong> janeiro a dezembro de 2025 são dados provisórios; 2024 e anteriores são dados definitivos (a 24 horas), salvo situações excecionais de revisão.</p>
<p><strong>Taxas de variação:</strong> salvo indicação em contrário, são taxas de variação homóloga, por comparação com o mesmo período do ano anterior.</p>
<h2>Glossário</h2>
<ul>
<li><strong>Acidente com vítimas (AcV):</strong> ocorrência na via pública ou que nela tenha origem, envolvendo pelo menos um veículo em movimento, do conhecimento das entidades fiscalizadoras (GNR e PSP) e da qual resulte pelo menos uma vítima.</li>
<li><strong>Acidente com vítimas mortais (AcVM):</strong> acidente do qual resulte pelo menos um morto.</li>
<li><strong>Acidente com feridos graves (AcFG):</strong> acidente do qual resulte pelo menos um ferido grave, não tendo ocorrido qualquer morte.</li>
<li><strong>Acidente com feridos leves (AcFL):</strong> acidente do qual resulte pelo menos um ferido leve e em que não se tenham registado mortos nem feridos graves.</li>
<li><strong>Vítima:</strong> ser humano que, em consequência de acidente, sofra danos corporais.</li>
<li><strong>Morto ou vítima mortal a 24h (VM):</strong> vítima cujo óbito ocorra no local do acidente ou durante o percurso até à unidade de saúde.</li>
<li><strong>Ferido grave a 24h (FG):</strong> vítima de acidente cujos danos corporais obriguem a um período de hospitalização igual ou superior a 24 horas.</li>
<li><strong>Ferido leve a 24h (FL):</strong> vítima de acidente que não necessite de ser hospitalizada, ou cujos danos corporais obriguem a um período de hospitalização inferior a 24 horas.</li>
<li><strong>Condutor:</strong> pessoa que detém o comando de um veículo ou animal na via pública.</li>
<li><strong>Passageiro:</strong> pessoa afeta a um veículo na via pública e que não seja condutora.</li>
<li><strong>Peão:</strong> pessoas que transitam na via pública a pé; crianças até aos 10 anos que conduzam velocípedes; pessoas que conduzam à mão velocípedes de duas rodas sem carro atrelado, motocultivadores sem reboque, carros de mão e carros de crianças ou de pessoas com deficiência; pessoas que se deslocam em cadeiras de rodas com motor elétrico, trotinetas, patins ou outros meios de circulação análogos sem motor.</li>
<li><strong>Dentro das localidades (DL):</strong> área delimitada pelos sinais do Regulamento de Sinalização de Trânsito que identificam e fixam o início e fim das localidades. Abrange não só arruamentos, mas também Estradas Nacionais (EN) e Estradas Municipais (EM) que atravessam localidades, nem todas correspondendo ao ambiente efetivo de rodovia urbana.</li>
<li><strong>Índice de gravidade (IGR):</strong> número de mortos por 100 acidentes com vítimas.</li>
</ul>
<h2>Outras siglas e abreviaturas</h2>
<p>AE — Autoestrada · ANSR — Autoridade Nacional de Segurança Rodoviária · BEAV — Boletim Estatístico de Acidente de Viação · EF — Estrada Florestal · EM — Estrada Municipal · EN — Estrada Nacional · ER — Estrada Regional · FLoc — Fora das localidades · GNR — Guarda Nacional Republicana · IC — Itinerário Complementar · IP — Itinerário Principal · p.p. — pontos percentuais · PML — Polícia Municipal de Lisboa · PSP — Polícia de Segurança Pública · SINCRO — Sistema Nacional de Controlo de Velocidade · VAR — Variante</p>
<h2>Índice de secções</h2>
<h3>I — Sinistralidade a 24 horas</h3>
<ul>
<li><a href="#/ansr-01-sinistralidade-em-portugal-visao-geral-e-evolucao">01 Sinistralidade em Portugal - Visão Geral e Evolução</a></li>
<li><a href="#/ansr-02-sinistralidade-por-mes-e-dia-da-semana">02 Sinistralidade por Mês e Dia da Semana</a></li>
<li><a href="#/ansr-03-sinistralidade-por-periodo-horario-e-fatores-atmosfericos">03 Sinistralidade por Período Horário e Fatores Atmosféricos</a></li>
<li><a href="#/ansr-04-sinistralidade-por-natureza-e-localizacao">04 Sinistralidade por Natureza e Localização</a></li>
<li><a href="#/ansr-05-sinistralidade-por-tipo-de-via-e-distrito">05 Sinistralidade por Tipo de Via e Distrito</a></li>
<li><a href="#/ansr-06-sinistralidade-por-categoria-de-utente-e-veiculo">06 Sinistralidade por Categoria de Utente e Veículo</a></li>
<li><a href="#/ansr-07-vitimas-mortais-por-entidade-gestora-de-via">07 Vítimas Mortais por Entidade Gestora de Via</a></li>
</ul>
<h3>II — Fiscalização</h3>
<ul>
<li><a href="#/ansr-08-fiscalizacao">08 Fiscalização</a></li>
</ul>
<h3>III — Processo contraordenacional</h3>
<ul>
<li><a href="#/ansr-09-processo-contraordenacional">09 Processo Contraordenacional</a></li>
</ul>
<h3>Anexo</h3>
<ul>
<li><a href="#/ansr-10-anexo-caracterizacao-dos-acidentes-com-vitimas-mortais">10 Anexo - Caracterização dos Acidentes com Vítimas Mortais</a></li>
</ul>
<h2>Ver também</h2>
<ul>
<li><a href="#/transito-00-indice">Manual Código da Estrada (módulo 11)</a> — causas e prevenção de acidentes no manual</li>
</ul>
`
  },

  // ===== 2. Sinistralidade em Portugal - Visão Geral e Evolução =====
  {
    id: "ansr-01-sinistralidade-em-portugal-visao-geral-e-evolucao",
    h: `<p>Os resultados sobre sinistralidade rodoviária apresentados têm por base dados disponibilizados pelas entidades fiscalizadoras (GNR e PSP), e assentam no critério de vítimas a 24 horas — os óbitos ocorridos no local do acidente ou durante o transporte da vítima até à unidade de saúde. Salvo indicação em contrário, as taxas de variação são homólogas, por comparação com o ano anterior.</p>
<h2>1.1 Sinistralidade em Portugal</h2>
<p>Na análise de longo prazo face ao ano de referência de 2019, o balanço da sinistralidade rodoviária em Portugal em 2025 apresenta uma tendência divergente entre os seus indicadores. O número de acidentes com vítimas (AcV) registou uma subida de 4,7% (+1.756) face ao período pré-pandémico, acompanhado por um aumento de 13,1% (+331) nos feridos graves (FG) e de 1,7% (+771) nos feridos leves (FL). Em sentido oposto, o número de vítimas mortais (VM) registou um decréscimo de 13,5% (-70) à escala nacional (de 520 para 450 óbitos).</p>
<p>Os anos de 2020 e 2021 registaram quebras significativas da circulação rodoviária face a 2019 (devido às restrições da pandemia de COVID-19) e, consequentemente, na sinistralidade; por isso a Comissão Europeia adotou 2019 como ano base de referência para a avaliação da evolução da sinistralidade rodoviária durante a década, critério também adotado em Portugal na Estratégia Visão Zero 2030.</p>
<h3>Quadro 1. Sinistralidade em Portugal, 2025 vs 2019 (janeiro-dezembro)</h3>
<div class="tw"><table>
<thead>
<tr>
<th>Região</th>
<th>AcV 2019</th>
<th>AcV 2025</th>
<th>Δ% 25/19</th>
<th>VM 2019</th>
<th>VM 2025</th>
<th>Δ% 25/19</th>
<th>FG 2019</th>
<th>FG 2025</th>
<th>Δ% 25/19</th>
<th>FL 2019</th>
<th>FL 2025</th>
<th>Δ% 25/19</th>
</tr>
</thead>
<tbody>
<tr>
<td>Continente</td>
<td>35 704</td>
<td>37 259</td>
<td>4,4%</td>
<td>474</td>
<td>442</td>
<td>-6,8%</td>
<td>2 301</td>
<td>2 651</td>
<td>15,2%</td>
<td>43 202</td>
<td>43 703</td>
<td>1,2%</td>
</tr>
<tr>
<td>RA Açores</td>
<td>611</td>
<td>681</td>
<td>11,5%</td>
<td>7</td>
<td>5</td>
<td>-28,6%</td>
<td>120</td>
<td>129</td>
<td>7,5%</td>
<td>686</td>
<td>797</td>
<td>16,2%</td>
</tr>
<tr>
<td>RA Madeira</td>
<td>936</td>
<td>1 067</td>
<td>14,0%</td>
<td>39</td>
<td>3</td>
<td>-92,3%</td>
<td>111</td>
<td>83</td>
<td>-25,2%</td>
<td>1 065</td>
<td>1 224</td>
<td>14,9%</td>
</tr>
<tr>
<td><strong>Total</strong></td>
<td><strong>37 251</strong></td>
<td><strong>39 007</strong></td>
<td><strong>4,7%</strong></td>
<td><strong>520</strong></td>
<td><strong>450</strong></td>
<td><strong>-13,5%</strong></td>
<td><strong>2 532</strong></td>
<td><strong>2 863</strong></td>
<td><strong>13,1%</strong></td>
<td><strong>44 953</strong></td>
<td><strong>45 724</strong></td>
<td><strong>1,7%</strong></td>
</tr>
</tbody>
</table></div>
<p>Importa salvaguardar que o volume de sinistralidade mortal na RA Madeira em 2019 foi fortemente atípico, dado que a franca maioria dos óbitos decorreu de um único acidente com um veículo pesado de passageiros (que vitimou 28 pessoas à data). Esta especificidade justifica a acentuada variação de -92,3% observada em 2025, ano em que a região registou apenas 3 vítimas mortais.</p>
<h3>Quadro 2. Sinistralidade em Portugal, 2025 vs 2024 (janeiro-dezembro)</h3>
<div class="tw"><table>
<thead>
<tr>
<th>Região</th>
<th>AcV 2024</th>
<th>AcV 2025</th>
<th>Δ% 25/24</th>
<th>VM 2024</th>
<th>VM 2025</th>
<th>Δ% 25/24</th>
<th>FG 2024</th>
<th>FG 2025</th>
<th>Δ% 25/24</th>
<th>FL 2024</th>
<th>FL 2025</th>
<th>Δ% 25/24</th>
</tr>
</thead>
<tbody>
<tr>
<td>Continente</td>
<td>36 338</td>
<td>37 259</td>
<td>2,5%</td>
<td>463</td>
<td>442</td>
<td>-4,5%</td>
<td>2 576</td>
<td>2 651</td>
<td>2,9%</td>
<td>42 683</td>
<td>43 703</td>
<td>2,4%</td>
</tr>
<tr>
<td>RA Açores</td>
<td>681</td>
<td>681</td>
<td>0,0%</td>
<td>5</td>
<td>5</td>
<td>0,0%</td>
<td>105</td>
<td>129</td>
<td>22,9%</td>
<td>776</td>
<td>797</td>
<td>2,7%</td>
</tr>
<tr>
<td>RA Madeira</td>
<td>1 018</td>
<td>1 067</td>
<td>4,8%</td>
<td>9</td>
<td>3</td>
<td>-66,7%</td>
<td>75</td>
<td>83</td>
<td>10,7%</td>
<td>1 159</td>
<td>1 224</td>
<td>5,6%</td>
</tr>
<tr>
<td><strong>Total</strong></td>
<td><strong>38 037</strong></td>
<td><strong>39 007</strong></td>
<td><strong>2,6%</strong></td>
<td><strong>477</strong></td>
<td><strong>450</strong></td>
<td><strong>-5,7%</strong></td>
<td><strong>2 756</strong></td>
<td><strong>2 863</strong></td>
<td><strong>3,9%</strong></td>
<td><strong>44 618</strong></td>
<td><strong>45 724</strong></td>
<td><strong>2,5%</strong></td>
</tr>
</tbody>
</table></div>
<p>Ao nível da evolução homóloga direta face a 2024, o retrato da sinistralidade rodoviária em 2025 registou um comportamento assimétrico: os acidentes aumentaram 2,6% (+970), os feridos graves 3,9% e os feridos leves 2,5%. Em contrapartida, a mortalidade manteve a tendência decrescente, com uma contração homóloga global de 5,7% (menos 27 óbitos), impulsionada maioritariamente pelo Continente (-21 vítimas mortais; -4,5%) e pela RA Madeira (de 9 para 3 óbitos; -66,7%). A RA Açores manteve o número de vítimas mortais estável (5 óbitos), mas agravou-se 22,9% em feridos graves.</p>
<p>Em termos de exposição ao risco, o IMT registou em 2025 um aumento de 5,8% no Tráfego Médio Diário Mensal (TMDM) na Rede Nacional de Autoestradas (RNA) face ao ano anterior. Os dados da Direção-Geral de Energia e Geologia apontam para uma revisão em alta de 0,7% no consumo de combustíveis rodoviários. Note-se, contudo, que o mercado de veículos 100% elétricos (BEV) registou uma expansão de 37,7% nas matrículas face ao ano anterior, o que introduz uma componente crescente de tráfego sem correspondência proporcional no consumo de derivados de petróleo.</p>
<h2>1.1.1 Evolução da sinistralidade em Portugal nos últimos anos</h2>
<p>Em Portugal, em 2025, registaram-se 39.007 acidentes com vítimas, dos quais resultaram 450 vítimas mortais, 2.863 feridos graves e 45.724 feridos leves.</p>
<h3>Quadro 3. Evolução da sinistralidade em Portugal, 2018 a 2025</h3>
<div class="tw"><table>
<thead>
<tr>
<th>Ano</th>
<th>AcV</th>
<th>AcVM+AcFG</th>
<th>AcVM</th>
<th>Vítimas totais</th>
<th>VM</th>
<th>FG</th>
<th>FL</th>
<th>IGR</th>
</tr>
</thead>
<tbody>
<tr>
<td>2018</td>
<td>35 816</td>
<td>2 540</td>
<td>478</td>
<td>46 021</td>
<td>518</td>
<td>2 355</td>
<td>43 148</td>
<td>1,45</td>
</tr>
<tr>
<td>2019</td>
<td>37 251</td>
<td>2 608</td>
<td>444</td>
<td>48 005</td>
<td>520</td>
<td>2 532</td>
<td>44 953</td>
<td>1,40</td>
</tr>
<tr>
<td>2020</td>
<td>27 725</td>
<td>2 139</td>
<td>385</td>
<td>34 471</td>
<td>404</td>
<td>1 996</td>
<td>32 071</td>
<td>1,46</td>
</tr>
<tr>
<td>2021</td>
<td>30 691</td>
<td>2 405</td>
<td>378</td>
<td>38 575</td>
<td>401</td>
<td>2 297</td>
<td>35 877</td>
<td>1,31</td>
</tr>
<tr>
<td>2022</td>
<td>34 276</td>
<td>2 535</td>
<td>439</td>
<td>43 034</td>
<td>473</td>
<td>2 437</td>
<td>40 124</td>
<td>1,38</td>
</tr>
<tr>
<td>2023</td>
<td>36 595</td>
<td>2 768</td>
<td>442</td>
<td>46 015</td>
<td>479</td>
<td>2 646</td>
<td>42 890</td>
<td>1,31</td>
</tr>
<tr>
<td>2024</td>
<td>38 037</td>
<td>2 850</td>
<td>448</td>
<td>47 851</td>
<td>477</td>
<td>2 756</td>
<td>44 618</td>
<td>1,25</td>
</tr>
<tr>
<td>2025</td>
<td>39 007</td>
<td>2 929</td>
<td>415</td>
<td>49 037</td>
<td>450</td>
<td>2 863</td>
<td>45 724</td>
<td>1,15</td>
</tr>
<tr>
<td>Δ% 25/18</td>
<td>8,9%</td>
<td>15,3%</td>
<td>-13,2%</td>
<td>6,6%</td>
<td>-13,1%</td>
<td>21,6%</td>
<td>6,0%</td>
<td>-20,2%</td>
</tr>
<tr>
<td>Δ% 25/19</td>
<td>4,7%</td>
<td>12,3%</td>
<td>-6,5%</td>
<td>2,1%</td>
<td>-13,5%</td>
<td>13,1%</td>
<td>1,7%</td>
<td>-17,4%</td>
</tr>
<tr>
<td>Δ% 25/24</td>
<td>2,6%</td>
<td>2,8%</td>
<td>-7,4%</td>
<td>2,5%</td>
<td>-5,7%</td>
<td>3,9%</td>
<td>2,5%</td>
<td>-8,0%</td>
</tr>
</tbody>
</table></div>
<p>Comparando com 2018, verificou-se uma tendência crescente nos acidentes (+3.191; +8,9%), nos feridos graves (+508; +21,6%) e nos feridos leves (+2.576; +6,0%). Contudo, registou-se uma diminuição nas vítimas mortais (-68; -13,1%) e, por conseguinte, no índice de gravidade (-20,2%).</p>
<h2>1.1.2 Evolução da sinistralidade no Continente nos últimos anos</h2>
<p>No Continente, em 2025, registaram-se 37.259 acidentes com vítimas, dos quais resultaram 442 vítimas mortais, 2.651 feridos graves e 43.703 feridos leves.</p>
<h3>Quadro 4. Evolução da sinistralidade no Continente, 2016 a 2025</h3>
<div class="tw"><table>
<thead>
<tr>
<th>Ano</th>
<th>AcV</th>
<th>AcVM+AcFG</th>
<th>AcVM</th>
<th>Vítimas totais</th>
<th>VM</th>
<th>FG</th>
<th>FL</th>
<th>IGR</th>
</tr>
</thead>
<tbody>
<tr>
<td>2016</td>
<td>32 299</td>
<td>2 201</td>
<td>416</td>
<td>41 668</td>
<td>445</td>
<td>2 102</td>
<td>39 121</td>
<td>1,38</td>
</tr>
<tr>
<td>2017</td>
<td>34 416</td>
<td>2 397</td>
<td>488</td>
<td>44 495</td>
<td>510</td>
<td>2 198</td>
<td>41 787</td>
<td>1,48</td>
</tr>
<tr>
<td>2018</td>
<td>34 235</td>
<td>2 337</td>
<td>468</td>
<td>44 005</td>
<td>508</td>
<td>2 141</td>
<td>41 356</td>
<td>1,48</td>
</tr>
<tr>
<td>2019</td>
<td>35 704</td>
<td>2 403</td>
<td>429</td>
<td>45 977</td>
<td>474</td>
<td>2 301</td>
<td>43 202</td>
<td>1,33</td>
</tr>
<tr>
<td>2020</td>
<td>26 501</td>
<td>1 975</td>
<td>372</td>
<td>32 925</td>
<td>390</td>
<td>1 829</td>
<td>30 706</td>
<td>1,47</td>
</tr>
<tr>
<td>2021</td>
<td>29 217</td>
<td>2 221</td>
<td>367</td>
<td>36 713</td>
<td>390</td>
<td>2 106</td>
<td>34 217</td>
<td>1,33</td>
</tr>
<tr>
<td>2022</td>
<td>32 788</td>
<td>2 352</td>
<td>428</td>
<td>41 161</td>
<td>462</td>
<td>2 243</td>
<td>38 456</td>
<td>1,41</td>
</tr>
<tr>
<td>2023</td>
<td>34 974</td>
<td>2 569</td>
<td>431</td>
<td>43 962</td>
<td>467</td>
<td>2 437</td>
<td>41 058</td>
<td>1,34</td>
</tr>
<tr>
<td>2024</td>
<td>36 338</td>
<td>2 674</td>
<td>437</td>
<td>45 722</td>
<td>463</td>
<td>2 576</td>
<td>42 683</td>
<td>1,27</td>
</tr>
<tr>
<td>2025</td>
<td>37 259</td>
<td>2 733</td>
<td>408</td>
<td>46 796</td>
<td>442</td>
<td>2 651</td>
<td>43 703</td>
<td>1,19</td>
</tr>
<tr>
<td>Δ% 25/16</td>
<td>15,4%</td>
<td>24,2%</td>
<td>-1,9%</td>
<td>12,3%</td>
<td>-0,7%</td>
<td>26,1%</td>
<td>11,7%</td>
<td>-13,9%</td>
</tr>
<tr>
<td>Δ% 25/19</td>
<td>4,4%</td>
<td>13,7%</td>
<td>-4,9%</td>
<td>1,8%</td>
<td>-6,8%</td>
<td>15,2%</td>
<td>1,2%</td>
<td>-10,6%</td>
</tr>
<tr>
<td>Δ% 25/24</td>
<td>2,5%</td>
<td>2,2%</td>
<td>-6,6%</td>
<td>2,3%</td>
<td>-4,5%</td>
<td>2,9%</td>
<td>2,4%</td>
<td>-6,9%</td>
</tr>
</tbody>
</table></div>
<p>Comparando com 2016, verificou-se uma tendência crescente nos acidentes (+4.960; +15,4%), nos feridos graves (+549; +26,1%) e nos feridos leves (+4.582; +11,7%). Contudo, registou-se uma diminuição nas vítimas mortais (-3; -0,7%) e, por conseguinte, no índice de gravidade (-13,9%).</p>
<p>Comparativamente a 2019, registou-se no Continente um agravamento na sinistralidade — aumentos nos acidentes (+1.555; +4,4%), nos feridos graves (+350; +15,2%) e nos feridos leves (+501; +1,2%) — mas uma redução da letalidade das ocorrências, com diminuição das vítimas mortais (-32; -6,8%).</p>
<p>Face a 2024, registou-se uma diminuição de 21 vítimas mortais (-4,5%) e de 6,9% no índice de gravidade (de 1,27 para 1,19). Contudo, registaram-se mais 921 acidentes (+2,5%), mais 75 feridos graves (+2,9%) e mais 1.020 feridos leves (+2,4%).</p>
`
  },

  // ===== 3. Sinistralidade por Mês e Dia da Semana =====
  {
    id: "ansr-02-sinistralidade-por-mes-e-dia-da-semana",
    h: `<h2>1.1.3 Sinistralidade em Portugal por mês</h2>
<p>A análise da distribuição mensal revela uma forte componente sazonal, com os picos de sinistralidade e de gravidade concentrados no período estival. Julho registou o máximo anual de acidentes com vítimas (3.889). Contudo, agosto configurou o período mais crítico do ano no que respeita à gravidade das ocorrências, fixando os máximos absolutos anuais tanto em feridos graves (310) como em vítimas mortais (61 óbitos). Nas dinâmicas de crescimento homólogo (2025/2024), junho e agosto destacaram-se pelo agravamento na mortalidade (+23,1% e +22,0%), enquanto o maior aumento homólogo no volume de acidentes ocorreu em outubro (+10,7%).</p>
<h3>Quadro 5. Sinistralidade em Portugal por mês, 2019, 2024 e 2025</h3>
<div class="tw"><table>
<thead>
<tr>
<th>Mês</th>
<th>AcV 2019</th>
<th>AcV 2024</th>
<th>AcV 2025</th>
<th>VM 2019</th>
<th>VM 2024</th>
<th>VM 2025</th>
<th>FG 2019</th>
<th>FG 2024</th>
<th>FG 2025</th>
<th>FL 2019</th>
<th>FL 2024</th>
<th>FL 2025</th>
</tr>
</thead>
<tbody>
<tr>
<td>Janeiro</td>
<td>2 953</td>
<td>2 798</td>
<td>2 844</td>
<td>48</td>
<td>35</td>
<td>36</td>
<td>171</td>
<td>196</td>
<td>164</td>
<td>3 519</td>
<td>3 246</td>
<td>3 336</td>
</tr>
<tr>
<td>Fevereiro</td>
<td>2 470</td>
<td>2 720</td>
<td>2 524</td>
<td>38</td>
<td>36</td>
<td>30</td>
<td>149</td>
<td>181</td>
<td>183</td>
<td>2 938</td>
<td>3 199</td>
<td>2 931</td>
</tr>
<tr>
<td>Março</td>
<td>2 998</td>
<td>2 768</td>
<td>2 907</td>
<td>34</td>
<td>34</td>
<td>25</td>
<td>213</td>
<td>179</td>
<td>186</td>
<td>3 604</td>
<td>3 219</td>
<td>3 377</td>
</tr>
<tr>
<td>Abril</td>
<td>2 791</td>
<td>3 057</td>
<td>3 014</td>
<td>60</td>
<td>32</td>
<td>27</td>
<td>186</td>
<td>230</td>
<td>216</td>
<td>3 429</td>
<td>3 505</td>
<td>3 658</td>
</tr>
<tr>
<td>Maio</td>
<td>3 219</td>
<td>3 337</td>
<td>3 384</td>
<td>47</td>
<td>45</td>
<td>36</td>
<td>218</td>
<td>238</td>
<td>248</td>
<td>3 851</td>
<td>3 864</td>
<td>3 910</td>
</tr>
<tr>
<td>Junho</td>
<td>2 978</td>
<td>3 235</td>
<td>3 389</td>
<td>33</td>
<td>39</td>
<td>48</td>
<td>224</td>
<td>237</td>
<td>285</td>
<td>3 615</td>
<td>3 784</td>
<td>3 949</td>
</tr>
<tr>
<td>Julho</td>
<td>3 397</td>
<td>3 587</td>
<td>3 889</td>
<td>36</td>
<td>52</td>
<td>52</td>
<td>233</td>
<td>286</td>
<td>308</td>
<td>4 148</td>
<td>4 180</td>
<td>4 551</td>
</tr>
<tr>
<td>Agosto</td>
<td>3 448</td>
<td>3 388</td>
<td>3 550</td>
<td>55</td>
<td>50</td>
<td>61</td>
<td>311</td>
<td>285</td>
<td>310</td>
<td>4 309</td>
<td>4 073</td>
<td>4 239</td>
</tr>
<tr>
<td>Setembro</td>
<td>3 216</td>
<td>3 366</td>
<td>3 517</td>
<td>48</td>
<td>49</td>
<td>23</td>
<td>241</td>
<td>257</td>
<td>274</td>
<td>3 889</td>
<td>3 976</td>
<td>4 067</td>
</tr>
<tr>
<td>Outubro</td>
<td>3 445</td>
<td>3 363</td>
<td>3 724</td>
<td>41</td>
<td>33</td>
<td>33</td>
<td>204</td>
<td>215</td>
<td>240</td>
<td>4 095</td>
<td>4 015</td>
<td>4 390</td>
</tr>
<tr>
<td>Novembro</td>
<td>3 203</td>
<td>3 111</td>
<td>3 206</td>
<td>40</td>
<td>32</td>
<td>33</td>
<td>193</td>
<td>221</td>
<td>220</td>
<td>3 815</td>
<td>3 687</td>
<td>3 733</td>
</tr>
<tr>
<td>Dezembro</td>
<td>3 133</td>
<td>3 307</td>
<td>3 059</td>
<td>40</td>
<td>40</td>
<td>46</td>
<td>189</td>
<td>231</td>
<td>229</td>
<td>3 741</td>
<td>3 870</td>
<td>3 583</td>
</tr>
<tr>
<td><strong>Total</strong></td>
<td><strong>37 251</strong></td>
<td><strong>38 037</strong></td>
<td><strong>39 007</strong></td>
<td><strong>520</strong></td>
<td><strong>477</strong></td>
<td><strong>450</strong></td>
<td><strong>2 532</strong></td>
<td><strong>2 756</strong></td>
<td><strong>2 863</strong></td>
<td><strong>44 953</strong></td>
<td><strong>44 618</strong></td>
<td><strong>45 724</strong></td>
</tr>
</tbody>
</table></div>
<p>Os meses de inverno concentraram os registos mais baixos de sinistralidade: fevereiro é o mínimo absoluto em acidentes (2.524) e feridos leves (2.931); janeiro fixou o mínimo anual de feridos graves (164); fevereiro a abril registaram os valores mais baixos do ano em vítimas mortais (30, 25 e 27, respetivamente, para além de setembro com 23). Dezembro registou quebra homóloga em acidentes (-7,5%), feridos leves (-7,4%) e feridos graves (-0,9%), mas um agravamento homólogo de 15,0% na mortalidade (de 40 para 46 óbitos).</p>
<h3>Quadro 6. Sinistralidade em Portugal por mês, taxas de variação 2025/2019 e 2025/2024</h3>
<div class="tw"><table>
<thead>
<tr>
<th>Mês</th>
<th>AcV Δ25/19</th>
<th>AcV Δ25/24</th>
<th>VM Δ25/19</th>
<th>VM Δ25/24</th>
<th>FG Δ25/19</th>
<th>FG Δ25/24</th>
<th>FL Δ25/19</th>
<th>FL Δ25/24</th>
</tr>
</thead>
<tbody>
<tr>
<td>Janeiro</td>
<td>-3,7%</td>
<td>1,6%</td>
<td>-25,0%</td>
<td>2,9%</td>
<td>-4,1%</td>
<td>-16,3%</td>
<td>-5,2%</td>
<td>2,8%</td>
</tr>
<tr>
<td>Fevereiro</td>
<td>2,2%</td>
<td>-7,2%</td>
<td>-21,1%</td>
<td>-16,7%</td>
<td>22,8%</td>
<td>1,1%</td>
<td>-0,2%</td>
<td>-8,4%</td>
</tr>
<tr>
<td>Março</td>
<td>-3,0%</td>
<td>5,0%</td>
<td>-26,5%</td>
<td>-26,5%</td>
<td>-12,7%</td>
<td>3,9%</td>
<td>-6,3%</td>
<td>4,9%</td>
</tr>
<tr>
<td>Abril</td>
<td>8,0%</td>
<td>-1,4%</td>
<td>-55,0%</td>
<td>-15,6%</td>
<td>16,1%</td>
<td>-6,1%</td>
<td>6,7%</td>
<td>4,4%</td>
</tr>
<tr>
<td>Maio</td>
<td>5,1%</td>
<td>1,4%</td>
<td>-23,4%</td>
<td>-20,0%</td>
<td>13,8%</td>
<td>4,2%</td>
<td>1,5%</td>
<td>1,2%</td>
</tr>
<tr>
<td>Junho</td>
<td>13,8%</td>
<td>4,8%</td>
<td>45,5%</td>
<td>23,1%</td>
<td>27,2%</td>
<td>20,3%</td>
<td>9,2%</td>
<td>4,4%</td>
</tr>
<tr>
<td>Julho</td>
<td>14,5%</td>
<td>8,4%</td>
<td>44,4%</td>
<td>0,0%</td>
<td>32,2%</td>
<td>7,7%</td>
<td>9,7%</td>
<td>8,9%</td>
</tr>
<tr>
<td>Agosto</td>
<td>3,0%</td>
<td>4,8%</td>
<td>10,9%</td>
<td>22,0%</td>
<td>-0,3%</td>
<td>8,8%</td>
<td>-1,6%</td>
<td>4,1%</td>
</tr>
<tr>
<td>Setembro</td>
<td>9,4%</td>
<td>4,5%</td>
<td>-52,1%</td>
<td>-53,1%</td>
<td>13,7%</td>
<td>6,6%</td>
<td>4,6%</td>
<td>2,3%</td>
</tr>
<tr>
<td>Outubro</td>
<td>8,1%</td>
<td>10,7%</td>
<td>-19,5%</td>
<td>0,0%</td>
<td>17,6%</td>
<td>11,6%</td>
<td>7,2%</td>
<td>9,3%</td>
</tr>
<tr>
<td>Novembro</td>
<td>0,1%</td>
<td>3,1%</td>
<td>-17,5%</td>
<td>3,1%</td>
<td>14,0%</td>
<td>-0,5%</td>
<td>-2,1%</td>
<td>1,2%</td>
</tr>
<tr>
<td>Dezembro</td>
<td>-2,4%</td>
<td>-7,5%</td>
<td>15,0%</td>
<td>15,0%</td>
<td>21,2%</td>
<td>-0,9%</td>
<td>-4,2%</td>
<td>-7,4%</td>
</tr>
<tr>
<td><strong>Total</strong></td>
<td><strong>4,7%</strong></td>
<td><strong>2,6%</strong></td>
<td><strong>-13,5%</strong></td>
<td><strong>-5,7%</strong></td>
<td><strong>13,1%</strong></td>
<td><strong>3,9%</strong></td>
<td><strong>1,7%</strong></td>
<td><strong>2,5%</strong></td>
</tr>
</tbody>
</table></div>
<h2>1.1.4 Sinistralidade em Portugal por dia da semana</h2>
<p>A análise da distribuição dos dados em 2025 confirma uma assimetria estrutural na sinistralidade rodoviária: os dias úteis concentram o maior volume de ocorrências, enquanto os dias de fim de semana registam gravidade substancialmente superior nas consequências.</p>
<h3>Quadro 7. Sinistralidade em Portugal por dia da semana, 2025 vs 2024</h3>
<div class="tw"><table>
<thead>
<tr>
<th>Dia</th>
<th>AcV 2024</th>
<th>AcV 2025</th>
<th>Δ% 25/24</th>
<th>VM 2024</th>
<th>VM 2025</th>
<th>Δ% 25/24</th>
<th>FG 2024</th>
<th>FG 2025</th>
<th>Δ% 25/24</th>
<th>FL 2024</th>
<th>FL 2025</th>
<th>Δ% 25/24</th>
</tr>
</thead>
<tbody>
<tr>
<td>2.ª feira</td>
<td>5 499</td>
<td>5 733</td>
<td>4,3%</td>
<td>43</td>
<td>53</td>
<td>23,3%</td>
<td>371</td>
<td>383</td>
<td>3,2%</td>
<td>6 366</td>
<td>6 667</td>
<td>4,7%</td>
</tr>
<tr>
<td>3.ª feira</td>
<td>5 592</td>
<td>5 603</td>
<td>0,2%</td>
<td>58</td>
<td>55</td>
<td>-5,2%</td>
<td>366</td>
<td>364</td>
<td>-0,5%</td>
<td>6 511</td>
<td>6 492</td>
<td>-0,3%</td>
</tr>
<tr>
<td>4.ª feira</td>
<td>5 611</td>
<td>5 830</td>
<td>3,9%</td>
<td>58</td>
<td>59</td>
<td>1,7%</td>
<td>373</td>
<td>370</td>
<td>-0,8%</td>
<td>6 420</td>
<td>6 701</td>
<td>4,4%</td>
</tr>
<tr>
<td>5.ª feira</td>
<td>5 436</td>
<td>5 519</td>
<td>1,5%</td>
<td>63</td>
<td>55</td>
<td>-12,7%</td>
<td>310</td>
<td>329</td>
<td>6,1%</td>
<td>6 359</td>
<td>6 444</td>
<td>1,3%</td>
</tr>
<tr>
<td>6.ª feira</td>
<td>5 981</td>
<td>6 098</td>
<td>2,0%</td>
<td>78</td>
<td>60</td>
<td>-23,1%</td>
<td>415</td>
<td>431</td>
<td>3,9%</td>
<td>6 956</td>
<td>7 117</td>
<td>2,3%</td>
</tr>
<tr>
<td>Sábado</td>
<td>5 181</td>
<td>5 403</td>
<td>4,3%</td>
<td>81</td>
<td>91</td>
<td>12,3%</td>
<td>451</td>
<td>507</td>
<td>12,4%</td>
<td>6 201</td>
<td>6 374</td>
<td>2,8%</td>
</tr>
<tr>
<td>Domingo</td>
<td>4 737</td>
<td>4 821</td>
<td>1,8%</td>
<td>96</td>
<td>77</td>
<td>-19,8%</td>
<td>470</td>
<td>479</td>
<td>1,9%</td>
<td>5 805</td>
<td>5 929</td>
<td>2,1%</td>
</tr>
<tr>
<td><strong>Total</strong></td>
<td><strong>38 037</strong></td>
<td><strong>39 007</strong></td>
<td><strong>2,6%</strong></td>
<td><strong>477</strong></td>
<td><strong>450</strong></td>
<td><strong>-5,7%</strong></td>
<td><strong>2 756</strong></td>
<td><strong>2 863</strong></td>
<td><strong>3,9%</strong></td>
<td><strong>44 618</strong></td>
<td><strong>45 724</strong></td>
<td><strong>2,5%</strong></td>
</tr>
</tbody>
</table></div>
<p>Em 2025, a sexta-feira consolidou-se como o dia com maior número de acidentes (6.098; 15,6% do total anual) e a maior proporção de feridos leves (7.117). Os restantes dias úteis apresentaram distribuição homogénea, variando entre 14,1% à quinta-feira (5.519) e 14,9% à quarta-feira (5.830). A segunda-feira e a quarta-feira tiveram os maiores aumentos homólogos no volume de sinistros (+4,3% e +3,9%).</p>
<p>O fim de semana concentrou os indicadores de maior gravidade, apesar dos menores volumes absolutos: o sábado foi o dia mais crítico, com a maior proporção de vítimas mortais (20,2%; 91 óbitos) e de feridos graves (17,7%; 507), e o maior agravamento homólogo semanal (+12,3% mortalidade; +12,4% feridos graves). O domingo, com o mínimo absoluto de acidentes (4.821) e de feridos leves (5.929), foi o segundo dia com mais vítimas mortais (77) e feridos graves (479), mas com redução homóloga de 19,8% na mortalidade (de 96 para 77). A segunda-feira registou o maior aumento percentual semanal nas vítimas mortais (+23,3%; de 43 para 53 óbitos).</p>
`
  },

  // ===== 4. Sinistralidade por Período Horário e Fatores Atmosféricos =====
  {
    id: "ansr-03-sinistralidade-por-periodo-horario-e-fatores-atmosfericos",
    h: `<h2>1.1.5 Sinistralidade em Portugal por período horário</h2>
<p>A distribuição por intervalos horários evidencia forte correlação entre os períodos de maior mobilidade diurna e o volume de ocorrências, com o final da tarde a consolidar-se como o período mais crítico em todos os indicadores.</p>
<h3>Quadro 8. Sinistralidade em Portugal por período horário, 2025 vs 2024</h3>
<div class="tw"><table>
<thead>
<tr>
<th>Período</th>
<th>AcV 2024</th>
<th>AcV 2025</th>
<th>Δ% 25/24</th>
<th>VM 2024</th>
<th>VM 2025</th>
<th>Δ% 25/24</th>
<th>FG 2024</th>
<th>FG 2025</th>
<th>Δ% 25/24</th>
<th>FL 2024</th>
<th>FL 2025</th>
<th>Δ% 25/24</th>
</tr>
</thead>
<tbody>
<tr>
<td>[00:00-03:00[</td>
<td>1 309</td>
<td>1 319</td>
<td>0,8%</td>
<td>39</td>
<td>38</td>
<td>-2,6%</td>
<td>140</td>
<td>134</td>
<td>-4,3%</td>
<td>1 558</td>
<td>1 568</td>
<td>0,6%</td>
</tr>
<tr>
<td>[03:00-06:00[</td>
<td>779</td>
<td>890</td>
<td>14,2%</td>
<td>27</td>
<td>38</td>
<td>40,7%</td>
<td>87</td>
<td>122</td>
<td>40,2%</td>
<td>890</td>
<td>1 022</td>
<td>14,8%</td>
</tr>
<tr>
<td>[06:00-09:00[</td>
<td>4 367</td>
<td>4 513</td>
<td>3,3%</td>
<td>63</td>
<td>58</td>
<td>-7,9%</td>
<td>303</td>
<td>304</td>
<td>0,3%</td>
<td>5 096</td>
<td>5 235</td>
<td>2,7%</td>
</tr>
<tr>
<td>[09:00-12:00[</td>
<td>6 404</td>
<td>6 478</td>
<td>1,2%</td>
<td>48</td>
<td>56</td>
<td>16,7%</td>
<td>333</td>
<td>419</td>
<td>25,8%</td>
<td>7 395</td>
<td>7 427</td>
<td>0,4%</td>
</tr>
<tr>
<td>[12:00-15:00[</td>
<td>6 837</td>
<td>6 972</td>
<td>2,0%</td>
<td>58</td>
<td>50</td>
<td>-13,8%</td>
<td>462</td>
<td>428</td>
<td>-7,4%</td>
<td>8 077</td>
<td>8 252</td>
<td>2,2%</td>
</tr>
<tr>
<td>[15:00-18:00[</td>
<td>8 095</td>
<td>8 384</td>
<td>3,6%</td>
<td>88</td>
<td>102</td>
<td>15,9%</td>
<td>565</td>
<td>616</td>
<td>9,0%</td>
<td>9 573</td>
<td>10 083</td>
<td>5,3%</td>
</tr>
<tr>
<td>[18:00-21:00[</td>
<td>7 282</td>
<td>7 387</td>
<td>1,4%</td>
<td>103</td>
<td>69</td>
<td>-33,0%</td>
<td>605</td>
<td>558</td>
<td>-7,8%</td>
<td>8 530</td>
<td>8 561</td>
<td>0,4%</td>
</tr>
<tr>
<td>[21:00-00:00[</td>
<td>2 964</td>
<td>3 064</td>
<td>3,4%</td>
<td>51</td>
<td>39</td>
<td>-23,5%</td>
<td>261</td>
<td>282</td>
<td>8,0%</td>
<td>3 499</td>
<td>3 576</td>
<td>2,2%</td>
</tr>
<tr>
<td><strong>Total</strong></td>
<td><strong>38 037</strong></td>
<td><strong>39 007</strong></td>
<td><strong>2,6%</strong></td>
<td><strong>477</strong></td>
<td><strong>450</strong></td>
<td><strong>-5,7%</strong></td>
<td><strong>2 756</strong></td>
<td><strong>2 863</strong></td>
<td><strong>3,9%</strong></td>
<td><strong>44 618</strong></td>
<td><strong>45 724</strong></td>
<td><strong>2,5%</strong></td>
</tr>
</tbody>
</table></div>
<p>O intervalo entre as 15h e as 18h foi o período mais crítico do ano: 21,5% dos acidentes (8.384), a maior proporção de feridos leves (10.083), 102 vítimas mortais (22,7%) e 616 feridos graves (21,5%) — agravamento homólogo de 15,9% na mortalidade e 9,0% nos feridos graves.</p>
<p>O bloco das 18h às 21h foi o segundo maior em volume (18,9% dos acidentes; 19,5% dos feridos graves), mas com evolução muito positiva: contração de 33,0% nas vítimas mortais (de 103 para 69) e recuo de 7,8% nos feridos graves. Os blocos das 09h-12h e 12h-15h mantiveram volumes elevados e estáveis (16,6% e 17,9% do total anual).</p>
<p>Quanto ao crescimento homólogo, destacam-se a madrugada ([03:00-06:00[), com o maior agravamento percentual do ano apesar do baixo volume absoluto (890 acidentes): +40,7% em vítimas mortais (de 27 para 38) e +40,2% em feridos graves (de 87 para 122); e a manhã ([09:00-12:00[), com +16,7% na mortalidade e +25,8% nos feridos graves (de 333 para 419).</p>
<p>Em sentido inverso, as maiores reduções homólogas na mortalidade concentraram-se no período noturno das 21h às 00h (-23,5%, de 51 para 39) e no início da tarde, entre as 12h e as 15h (-13,8% VM; -7,4% FG).</p>
<h2>1.1.6 Sinistralidade em Portugal por fatores atmosféricos</h2>
<p>A esmagadora maioria dos acidentes com vítimas (82,2%), dos óbitos (87,3%), dos feridos graves (86,2%) e dos feridos leves (81,5%) ocorreu sob condições de bom tempo, somando 32.057 acidentes e 393 vítimas mortais — um recuo homólogo de 6,9% neste indicador. A chuva foi o segundo fator mais relevante, associada a 6.680 acidentes (17,1%) e 8.143 feridos leves, incremento de cerca de 10% face a 2024 em ambos os parâmetros. A sinistralidade mais grave sob precipitação manteve-se estável (49 vítimas mortais e 350 feridos graves).</p>
<h3>Quadro 9. Sinistralidade em Portugal por fatores atmosféricos, 2025 vs 2024</h3>
<div class="tw"><table>
<thead>
<tr>
<th>Fator</th>
<th>AcV 2024</th>
<th>AcV 2025</th>
<th>Δ% 25/24</th>
<th>VM 2024</th>
<th>VM 2025</th>
<th>Δ% 25/24</th>
<th>FG 2024</th>
<th>FG 2025</th>
<th>Δ% 25/24</th>
<th>FL 2024</th>
<th>FL 2025</th>
<th>Δ% 25/24</th>
</tr>
</thead>
<tbody>
<tr>
<td>Bom tempo</td>
<td>31 629</td>
<td>32 057</td>
<td>1,4%</td>
<td>422</td>
<td>393</td>
<td>-6,9%</td>
<td>2 383</td>
<td>2 467</td>
<td>3,5%</td>
<td>36 844</td>
<td>37 247</td>
<td>1,1%</td>
</tr>
<tr>
<td>Chuva</td>
<td>6 074</td>
<td>6 680</td>
<td>10,0%</td>
<td>50</td>
<td>49</td>
<td>-2,0%</td>
<td>345</td>
<td>350</td>
<td>1,4%</td>
<td>7 380</td>
<td>8 143</td>
<td>10,3%</td>
</tr>
<tr>
<td>Nevoeiro</td>
<td>210</td>
<td>179</td>
<td>-14,8%</td>
<td>3</td>
<td>7</td>
<td>133,3%</td>
<td>22</td>
<td>27</td>
<td>22,7%</td>
<td>251</td>
<td>214</td>
<td>-14,7%</td>
</tr>
<tr>
<td>Vento</td>
<td>55</td>
<td>52</td>
<td>-5,5%</td>
<td>2</td>
<td>1</td>
<td>-50,0%</td>
<td>3</td>
<td>13</td>
<td>333,3%</td>
<td>57</td>
<td>54</td>
<td>-5,3%</td>
</tr>
<tr>
<td>Neve</td>
<td>7</td>
<td>4</td>
<td>-42,9%</td>
<td>0</td>
<td>0</td>
<td>-</td>
<td>0</td>
<td>2</td>
<td>-</td>
<td>13</td>
<td>5</td>
<td>-61,5%</td>
</tr>
<tr>
<td>Fumo</td>
<td>2</td>
<td>0</td>
<td>-100,0%</td>
<td>0</td>
<td>0</td>
<td>-</td>
<td>0</td>
<td>0</td>
<td>-</td>
<td>2</td>
<td>0</td>
<td>-100,0%</td>
</tr>
<tr>
<td>Granizo</td>
<td>19</td>
<td>20</td>
<td>5,3%</td>
<td>0</td>
<td>0</td>
<td>-</td>
<td>1</td>
<td>4</td>
<td>300,0%</td>
<td>30</td>
<td>42</td>
<td>40,0%</td>
</tr>
<tr>
<td>n.d.</td>
<td>41</td>
<td>15</td>
<td>-63,4%</td>
<td>0</td>
<td>0</td>
<td>-</td>
<td>2</td>
<td>0</td>
<td>-100,0%</td>
<td>41</td>
<td>19</td>
<td>-53,7%</td>
</tr>
<tr>
<td><strong>Total</strong></td>
<td><strong>38 037</strong></td>
<td><strong>39 007</strong></td>
<td><strong>2,6%</strong></td>
<td><strong>477</strong></td>
<td><strong>450</strong></td>
<td><strong>-5,7%</strong></td>
<td><strong>2 756</strong></td>
<td><strong>2 863</strong></td>
<td><strong>3,9%</strong></td>
<td><strong>44 618</strong></td>
<td><strong>45 724</strong></td>
<td><strong>2,5%</strong></td>
</tr>
</tbody>
</table></div>
<p>n.d. – não definido. Quanto aos restantes fatores (nevoeiro, vento, neve e granizo), o impacto absoluto no cômputo geral foi residual, destacando-se o nevoeiro com 179 acidentes e 7 vítimas mortais (mais 4 do que no ano anterior).</p>
`
  },

  // ===== 5. Sinistralidade por Natureza e Localização =====
  {
    id: "ansr-04-sinistralidade-por-natureza-e-localizacao",
    h: `<h2>1.1.7 Sinistralidade em Portugal por natureza do acidente</h2>
<p>A colisão é a tipologia mais frequente em 2025 (53,4%; 20.846 acidentes), com o maior volume absoluto de feridos graves (1.366) e leves (26.426); a mortalidade neste tipo permaneceu estável face a 2024 (+0,5%), mas com agravamento estrutural de longo prazo face a 2019 (+27,0% feridos graves; +3,1% vítimas mortais, 201 óbitos).</p>
<h3>Quadro 10. Sinistralidade em Portugal por natureza, 2019, 2024 e 2025</h3>
<div class="tw"><table>
<thead>
<tr>
<th>Natureza</th>
<th>AcV 2019</th>
<th>AcV 2024</th>
<th>AcV 2025</th>
<th>VM 2019</th>
<th>VM 2024</th>
<th>VM 2025</th>
<th>FG 2019</th>
<th>FG 2024</th>
<th>FG 2025</th>
<th>FL 2019</th>
<th>FL 2024</th>
<th>FL 2025</th>
<th>IGR 2019</th>
<th>IGR 2024</th>
<th>IGR 2025</th>
</tr>
</thead>
<tbody>
<tr>
<td>Atropelamento</td>
<td>5 565</td>
<td>5 073</td>
<td>5 070</td>
<td>74</td>
<td>69</td>
<td>46</td>
<td>481</td>
<td>439</td>
<td>406</td>
<td>5 519</td>
<td>5 033</td>
<td>5 043</td>
<td>1,33</td>
<td>1,36</td>
<td>0,91</td>
</tr>
<tr>
<td>Colisão</td>
<td>19 518</td>
<td>20 356</td>
<td>20 846</td>
<td>195</td>
<td>200</td>
<td>201</td>
<td>1 076</td>
<td>1 282</td>
<td>1 366</td>
<td>25 886</td>
<td>26 023</td>
<td>26 426</td>
<td>1,00</td>
<td>0,98</td>
<td>0,96</td>
</tr>
<tr>
<td>Despiste</td>
<td>12 168</td>
<td>12 608</td>
<td>13 091</td>
<td>251</td>
<td>208</td>
<td>203</td>
<td>975</td>
<td>1 035</td>
<td>1 091</td>
<td>13 548</td>
<td>13 562</td>
<td>14 255</td>
<td>2,06</td>
<td>1,65</td>
<td>1,55</td>
</tr>
<tr>
<td><strong>Total</strong></td>
<td><strong>37 251</strong></td>
<td><strong>38 037</strong></td>
<td><strong>39 007</strong></td>
<td><strong>520</strong></td>
<td><strong>477</strong></td>
<td><strong>450</strong></td>
<td><strong>2 532</strong></td>
<td><strong>2 756</strong></td>
<td><strong>2 863</strong></td>
<td><strong>44 953</strong></td>
<td><strong>44 618</strong></td>
<td><strong>45 724</strong></td>
<td><strong>1,40</strong></td>
<td><strong>1,25</strong></td>
<td><strong>1,15</strong></td>
</tr>
</tbody>
</table></div>
<p>Os despistes mantiveram-se como a natureza mais letal, concentrando 45,1% da mortalidade total (203 óbitos), apesar de representarem cerca de um terço dos acidentes (13.091). Verificou-se uma contração homóloga de 2,4% nas vítimas mortais e um recuo de 19,1% face a 2019, com o IGR a recuar de 2,06 (2019) para 1,55 (2025).</p>
<p>Nos atropelamentos, o volume de acidentes estabilizou (5.070; -0,1%), mas observou-se uma redução de 33,3% nas vítimas mortais (de 69 para 46) e de 7,5% nos feridos graves; face a 2019, os atropelamentos acumulam descidas de 37,8% na mortalidade e 15,6% nos feridos graves.</p>
<h3>Quadro 11. Sinistralidade em Portugal por natureza, taxas de variação 2025/2019 e 2025/2024</h3>
<div class="tw"><table>
<thead>
<tr>
<th>Natureza</th>
<th>AcV Δ25/19</th>
<th>AcV Δ25/24</th>
<th>VM Δ25/19</th>
<th>VM Δ25/24</th>
<th>FG Δ25/19</th>
<th>FG Δ25/24</th>
<th>FL Δ25/19</th>
<th>FL Δ25/24</th>
<th>IGR Δ25/19</th>
<th>IGR Δ25/24</th>
</tr>
</thead>
<tbody>
<tr>
<td>Atropelamento</td>
<td>-8,9%</td>
<td>-0,1%</td>
<td>-37,8%</td>
<td>-33,3%</td>
<td>-15,6%</td>
<td>-7,5%</td>
<td>-8,6%</td>
<td>0,2%</td>
<td>-31,8%</td>
<td>-33,3%</td>
</tr>
<tr>
<td>Colisão</td>
<td>6,8%</td>
<td>2,4%</td>
<td>3,1%</td>
<td>0,5%</td>
<td>27,0%</td>
<td>6,6%</td>
<td>2,1%</td>
<td>1,5%</td>
<td>-3,5%</td>
<td>-1,9%</td>
</tr>
<tr>
<td>Despiste</td>
<td>7,6%</td>
<td>3,8%</td>
<td>-19,1%</td>
<td>-2,4%</td>
<td>11,9%</td>
<td>5,4%</td>
<td>5,2%</td>
<td>5,1%</td>
<td>-24,8%</td>
<td>-6,0%</td>
</tr>
<tr>
<td><strong>Total</strong></td>
<td><strong>4,7%</strong></td>
<td><strong>2,6%</strong></td>
<td><strong>-13,5%</strong></td>
<td><strong>-5,7%</strong></td>
<td><strong>13,1%</strong></td>
<td><strong>3,9%</strong></td>
<td><strong>1,7%</strong></td>
<td><strong>2,5%</strong></td>
<td><strong>-17,4%</strong></td>
<td><strong>-8,0%</strong></td>
</tr>
</tbody>
</table></div>
<h2>1.1.8 Sinistralidade em Portugal por localização</h2>
<p>O maior volume de ocorrências continua concentrado dentro das localidades: 77,2% dos acidentes (30.119), 53,1% das vítimas mortais (239) e 63,7% dos feridos graves (1.824).</p>
<h3>Quadro 12. Sinistralidade em Portugal por localização, 2019, 2024 e 2025</h3>
<div class="tw"><table>
<thead>
<tr>
<th>Localização</th>
<th>AcV 2019</th>
<th>AcV 2024</th>
<th>AcV 2025</th>
<th>VM 2019</th>
<th>VM 2024</th>
<th>VM 2025</th>
<th>FG 2019</th>
<th>FG 2024</th>
<th>FG 2025</th>
<th>FL 2019</th>
<th>FL 2024</th>
<th>FL 2025</th>
<th>IGR 2019</th>
<th>IGR 2024</th>
<th>IGR 2025</th>
</tr>
</thead>
<tbody>
<tr>
<td>Dentro das localidades</td>
<td>29 438</td>
<td>30 075</td>
<td>30 119</td>
<td>271</td>
<td>260</td>
<td>239</td>
<td>1 667</td>
<td>1 869</td>
<td>1 824</td>
<td>34 684</td>
<td>34 489</td>
<td>34 304</td>
<td>0,92</td>
<td>0,86</td>
<td>0,79</td>
</tr>
<tr>
<td>Fora das localidades</td>
<td>7 813</td>
<td>7 962</td>
<td>8 888</td>
<td>249</td>
<td>217</td>
<td>211</td>
<td>865</td>
<td>887</td>
<td>1 039</td>
<td>10 269</td>
<td>10 129</td>
<td>11 420</td>
<td>3,19</td>
<td>2,73</td>
<td>2,37</td>
</tr>
<tr>
<td><strong>Total</strong></td>
<td><strong>37 251</strong></td>
<td><strong>38 037</strong></td>
<td><strong>39 007</strong></td>
<td><strong>520</strong></td>
<td><strong>477</strong></td>
<td><strong>450</strong></td>
<td><strong>2 532</strong></td>
<td><strong>2 756</strong></td>
<td><strong>2 863</strong></td>
<td><strong>44 953</strong></td>
<td><strong>44 618</strong></td>
<td><strong>45 724</strong></td>
<td><strong>1,40</strong></td>
<td><strong>1,25</strong></td>
<td><strong>1,15</strong></td>
</tr>
</tbody>
</table></div>
<p>Apesar do peso absoluto, &quot;dentro das localidades&quot; registou evolução francamente positiva face a 2024 (recuo de 8,1% na mortalidade; -2,4% nos feridos graves); face a 2019, consolida-se a descida de 11,8% nas vítimas mortais, embora os feridos graves acumulem aumento de 9,4%.</p>
<p>Em sentido inverso, &quot;fora das localidades&quot; agravou-se acentuadamente em 2025: acidentes +11,6% (8.888), feridos graves +17,1% (1.039), feridos leves +12,7%. As vítimas mortais recuaram ligeiramente (-2,8%; 211 óbitos), mas a letalidade mantém-se criticamente elevada: IGR de 2,37, três vezes o valor dentro das localidades (0,79).</p>
<h3>Quadro 13. Sinistralidade em Portugal por localização, taxas de variação 2025/2019 e 2025/2024</h3>
<div class="tw"><table>
<thead>
<tr>
<th>Localização</th>
<th>AcV Δ25/19</th>
<th>AcV Δ25/24</th>
<th>VM Δ25/19</th>
<th>VM Δ25/24</th>
<th>FG Δ25/19</th>
<th>FG Δ25/24</th>
<th>FL Δ25/19</th>
<th>FL Δ25/24</th>
<th>IGR Δ25/19</th>
<th>IGR Δ25/24</th>
</tr>
</thead>
<tbody>
<tr>
<td>Dentro das localidades</td>
<td>2,3%</td>
<td>0,1%</td>
<td>-11,8%</td>
<td>-8,1%</td>
<td>9,4%</td>
<td>-2,4%</td>
<td>-1,1%</td>
<td>-0,5%</td>
<td>-13,8%</td>
<td>-8,2%</td>
</tr>
<tr>
<td>Fora das localidades</td>
<td>13,8%</td>
<td>11,6%</td>
<td>-15,3%</td>
<td>-2,8%</td>
<td>20,1%</td>
<td>17,1%</td>
<td>11,2%</td>
<td>12,7%</td>
<td>-25,5%</td>
<td>-12,9%</td>
</tr>
<tr>
<td><strong>Total</strong></td>
<td><strong>4,7%</strong></td>
<td><strong>2,6%</strong></td>
<td><strong>-13,5%</strong></td>
<td><strong>-5,7%</strong></td>
<td><strong>13,1%</strong></td>
<td><strong>3,9%</strong></td>
<td><strong>1,7%</strong></td>
<td><strong>2,5%</strong></td>
<td><strong>-17,4%</strong></td>
<td><strong>-8,0%</strong></td>
</tr>
</tbody>
</table></div>
`
  },

  // ===== 6. Sinistralidade por Tipo de Via e Distrito =====
  {
    id: "ansr-05-sinistralidade-por-tipo-de-via-e-distrito",
    h: `<h2>1.1.9 Sinistralidade em Portugal por tipo de via</h2>
<p>Os arruamentos mantiveram-se como o local com maior sinistralidade absoluta e maior mortalidade em 2025: 61,7% dos acidentes (24.080), 34,4% das vítimas mortais (155), 45,7% dos feridos graves (1.307) e 59,2% dos feridos leves (27.059). O volume de óbitos permaneceu praticamente estável face a 2024 (154 mortes), com recuo de 23,3% na mortalidade face a 2019.</p>
<h3>Quadro 14. Sinistralidade em Portugal por tipo de via, 2019, 2024 e 2025</h3>
<div class="tw"><table>
<thead>
<tr>
<th>Via</th>
<th>AcV 2019</th>
<th>AcV 2024</th>
<th>AcV 2025</th>
<th>VM 2019</th>
<th>VM 2024</th>
<th>VM 2025</th>
<th>FG 2019</th>
<th>FG 2024</th>
<th>FG 2025</th>
<th>FL 2019</th>
<th>FL 2024</th>
<th>FL 2025</th>
<th>IGR 2019</th>
<th>IGR 2024</th>
<th>IGR 2025</th>
</tr>
</thead>
<tbody>
<tr>
<td>AE</td>
<td>2 146</td>
<td>2 172</td>
<td>2 453</td>
<td>58</td>
<td>43</td>
<td>44</td>
<td>176</td>
<td>153</td>
<td>204</td>
<td>3 085</td>
<td>3 024</td>
<td>3 399</td>
<td>2,70</td>
<td>1,98</td>
<td>1,79</td>
</tr>
<tr>
<td>Arruamento</td>
<td>24 298</td>
<td>23 819</td>
<td>24 080</td>
<td>202</td>
<td>154</td>
<td>155</td>
<td>1 287</td>
<td>1 291</td>
<td>1 307</td>
<td>28 167</td>
<td>26 931</td>
<td>27 059</td>
<td>0,83</td>
<td>0,65</td>
<td>0,64</td>
</tr>
<tr>
<td>EM</td>
<td>1 335</td>
<td>1 234</td>
<td>1 281</td>
<td>30</td>
<td>25</td>
<td>31</td>
<td>166</td>
<td>151</td>
<td>168</td>
<td>1 610</td>
<td>1 376</td>
<td>1 471</td>
<td>2,25</td>
<td>2,03</td>
<td>2,42</td>
</tr>
<tr>
<td>EN</td>
<td>6 372</td>
<td>7 229</td>
<td>7 608</td>
<td>142</td>
<td>169</td>
<td>146</td>
<td>584</td>
<td>779</td>
<td>798</td>
<td>8 244</td>
<td>8 988</td>
<td>9 447</td>
<td>2,23</td>
<td>2,34</td>
<td>1,92</td>
</tr>
<tr>
<td>ER</td>
<td>361</td>
<td>515</td>
<td>518</td>
<td>9</td>
<td>7</td>
<td>13</td>
<td>33</td>
<td>75</td>
<td>97</td>
<td>468</td>
<td>639</td>
<td>623</td>
<td>2,49</td>
<td>1,36</td>
<td>2,51</td>
</tr>
<tr>
<td>IC</td>
<td>966</td>
<td>948</td>
<td>936</td>
<td>26</td>
<td>24</td>
<td>23</td>
<td>86</td>
<td>85</td>
<td>68</td>
<td>1 266</td>
<td>1 207</td>
<td>1 222</td>
<td>2,69</td>
<td>2,53</td>
<td>2,46</td>
</tr>
<tr>
<td>IP</td>
<td>263</td>
<td>242</td>
<td>242</td>
<td>16</td>
<td>9</td>
<td>13</td>
<td>29</td>
<td>26</td>
<td>28</td>
<td>349</td>
<td>326</td>
<td>326</td>
<td>6,08</td>
<td>3,72</td>
<td>5,37</td>
</tr>
<tr>
<td>Outras*</td>
<td>1 510</td>
<td>1 878</td>
<td>1 889</td>
<td>37</td>
<td>46</td>
<td>25</td>
<td>171</td>
<td>196</td>
<td>193</td>
<td>1 764</td>
<td>2 127</td>
<td>2 177</td>
<td>2,45</td>
<td>2,45</td>
<td>1,32</td>
</tr>
<tr>
<td><strong>Total</strong></td>
<td><strong>37 251</strong></td>
<td><strong>38 037</strong></td>
<td><strong>39 007</strong></td>
<td><strong>520</strong></td>
<td><strong>477</strong></td>
<td><strong>450</strong></td>
<td><strong>2 532</strong></td>
<td><strong>2 756</strong></td>
<td><strong>2 863</strong></td>
<td><strong>44 953</strong></td>
<td><strong>44 618</strong></td>
<td><strong>45 724</strong></td>
<td><strong>1,40</strong></td>
<td><strong>1,25</strong></td>
<td><strong>1,15</strong></td>
</tr>
</tbody>
</table></div>
<p>* Inclui acessos, estradas florestais, pontes, variantes e não definidas.</p>
<p>Nas estradas nacionais (EN), 19,5% dos acidentes do país e 146 vítimas mortais (32,4%) em 2025 — redução homóloga de 13,6%, mas com aumento no volume de acidentes (+19,4%) e de feridos graves (+36,6%) face a 2019 (798 feridos graves em 2025).</p>
<p>Nas autoestradas (AE), aumento homólogo de 33,3% nos feridos graves (de 153 para 204), acompanhado por subida de 12,9% nos acidentes (2.453). A mortalidade fixou-se em 44 óbitos (recuo de 24,1% face a 2019, mas ligeiro aumento de 2,3% face a 2024).</p>
<h3>Quadro 15. Sinistralidade em Portugal por tipo de via, taxas de variação 2025/2019 e 2025/2024</h3>
<div class="tw"><table>
<thead>
<tr>
<th>Via</th>
<th>AcV Δ25/19</th>
<th>AcV Δ25/24</th>
<th>VM Δ25/19</th>
<th>VM Δ25/24</th>
<th>FG Δ25/19</th>
<th>FG Δ25/24</th>
<th>FL Δ25/19</th>
<th>FL Δ25/24</th>
<th>IGR Δ25/19</th>
<th>IGR Δ25/24</th>
</tr>
</thead>
<tbody>
<tr>
<td>AE</td>
<td>14,3%</td>
<td>12,9%</td>
<td>-24,1%</td>
<td>2,3%</td>
<td>15,9%</td>
<td>33,3%</td>
<td>10,2%</td>
<td>12,4%</td>
<td>-33,6%</td>
<td>-9,4%</td>
</tr>
<tr>
<td>Arruamento</td>
<td>-0,9%</td>
<td>1,1%</td>
<td>-23,3%</td>
<td>0,6%</td>
<td>1,6%</td>
<td>1,2%</td>
<td>-3,9%</td>
<td>0,5%</td>
<td>-22,6%</td>
<td>-0,4%</td>
</tr>
<tr>
<td>EM</td>
<td>-4,0%</td>
<td>3,8%</td>
<td>3,3%</td>
<td>24,0%</td>
<td>1,2%</td>
<td>11,3%</td>
<td>-8,6%</td>
<td>6,9%</td>
<td>7,7%</td>
<td>19,5%</td>
</tr>
<tr>
<td>EN</td>
<td>19,4%</td>
<td>5,2%</td>
<td>2,8%</td>
<td>-13,6%</td>
<td>36,6%</td>
<td>2,4%</td>
<td>14,6%</td>
<td>5,1%</td>
<td>-13,9%</td>
<td>-17,9%</td>
</tr>
<tr>
<td>ER</td>
<td>43,5%</td>
<td>0,6%</td>
<td>44,4%</td>
<td>85,7%</td>
<td>193,9%</td>
<td>29,3%</td>
<td>33,1%</td>
<td>-2,5%</td>
<td>0,7%</td>
<td>84,6%</td>
</tr>
<tr>
<td>IC</td>
<td>-3,1%</td>
<td>-1,3%</td>
<td>-11,5%</td>
<td>-4,2%</td>
<td>-20,9%</td>
<td>-20,0%</td>
<td>-3,5%</td>
<td>1,2%</td>
<td>-8,7%</td>
<td>-2,9%</td>
</tr>
<tr>
<td>IP</td>
<td>-8,0%</td>
<td>0,0%</td>
<td>-18,8%</td>
<td>44,4%</td>
<td>-3,4%</td>
<td>7,7%</td>
<td>-6,6%</td>
<td>0,0%</td>
<td>-11,7%</td>
<td>44,4%</td>
</tr>
<tr>
<td>Outras*</td>
<td>25,1%</td>
<td>0,6%</td>
<td>-32,4%</td>
<td>-45,7%</td>
<td>12,9%</td>
<td>-1,5%</td>
<td>23,4%</td>
<td>2,4%</td>
<td>-46,0%</td>
<td>-46,0%</td>
</tr>
<tr>
<td><strong>Total</strong></td>
<td><strong>4,7%</strong></td>
<td><strong>2,6%</strong></td>
<td><strong>-13,5%</strong></td>
<td><strong>-5,7%</strong></td>
<td><strong>13,1%</strong></td>
<td><strong>3,9%</strong></td>
<td><strong>1,7%</strong></td>
<td><strong>2,5%</strong></td>
<td><strong>-17,4%</strong></td>
<td><strong>-8,0%</strong></td>
</tr>
</tbody>
</table></div>
<p>* Inclui acessos, estradas florestais, pontes, variantes e não definidas.</p>
<p>Nas restantes vias, as estradas municipais (EM) tiveram aumento homólogo nas vítimas mortais (+24,0%, para 31 óbitos) e nos feridos graves (+11,3%, para 168); os itinerários principais (IP) e as estradas regionais (ER) tiveram variações homólogas na mortalidade de +44,4% e +85,7%, respetivamente, fixando-se ambas em 13 óbitos — os IP com o IGR mais elevado do país (5,37). Os itinerários complementares (IC) registaram reduções homólogas de 4,2% nas vítimas mortais (23) e de 20,0% nos feridos graves (68).</p>
<p>No agregado de sinistralidade mais grave (VM+FG), 2025 foi pautado por um aumento de 26,5% nas autoestradas e de 34,1% nas estradas regionais; os itinerários complementares tiveram o maior desagravamento (-16,5%); as estradas nacionais mantiveram-se praticamente estáveis (-0,4%).</p>
<h2>1.1.10 Sinistralidade em Portugal por distrito e Região Autónoma</h2>
<p>O aumento no volume de acidentes verificou-se em 13 dos 18 distritos do Continente e na RA Madeira, face a 2024 (a RA Açores permaneceu estável). Os incrementos absolutos mais expressivos em ocorrências: Lisboa (+315), Setúbal (+162), Braga (+124) e Aveiro (+101). Faro registou o recuo mais significativo (-94), seguido do Porto (-39), Viana do Castelo (-20), Guarda (-18) e Évora (-17).</p>
<h3>Quadro 16. Sinistralidade em Portugal por distrito e R. A., 2025 vs 2024</h3>
<div class="tw"><table>
<thead>
<tr>
<th>Distrito/RA</th>
<th>AcV 2024</th>
<th>AcV 2025</th>
<th>Δ% 25/24</th>
<th>VM 2024</th>
<th>VM 2025</th>
<th>Δ% 25/24</th>
<th>FG 2024</th>
<th>FG 2025</th>
<th>Δ% 25/24</th>
<th>FL 2024</th>
<th>FL 2025</th>
<th>Δ% 25/24</th>
</tr>
</thead>
<tbody>
<tr>
<td>Aveiro</td>
<td>2 898</td>
<td>2 999</td>
<td>3,5%</td>
<td>29</td>
<td>36</td>
<td>24,1%</td>
<td>199</td>
<td>176</td>
<td>-11,6%</td>
<td>3 386</td>
<td>3 416</td>
<td>0,9%</td>
</tr>
<tr>
<td>Beja</td>
<td>520</td>
<td>540</td>
<td>3,8%</td>
<td>23</td>
<td>19</td>
<td>-17,4%</td>
<td>111</td>
<td>110</td>
<td>-0,9%</td>
<td>578</td>
<td>650</td>
<td>12,5%</td>
</tr>
<tr>
<td>Braga</td>
<td>3 311</td>
<td>3 435</td>
<td>3,7%</td>
<td>39</td>
<td>28</td>
<td>-28,2%</td>
<td>223</td>
<td>206</td>
<td>-7,6%</td>
<td>4 029</td>
<td>4 105</td>
<td>1,9%</td>
</tr>
<tr>
<td>Bragança</td>
<td>393</td>
<td>409</td>
<td>4,1%</td>
<td>9</td>
<td>16</td>
<td>77,8%</td>
<td>49</td>
<td>65</td>
<td>32,7%</td>
<td>469</td>
<td>449</td>
<td>-4,3%</td>
</tr>
<tr>
<td>C. Branco</td>
<td>547</td>
<td>575</td>
<td>5,1%</td>
<td>12</td>
<td>12</td>
<td>0,0%</td>
<td>66</td>
<td>82</td>
<td>24,2%</td>
<td>616</td>
<td>695</td>
<td>12,8%</td>
</tr>
<tr>
<td>Coimbra</td>
<td>1 635</td>
<td>1 696</td>
<td>3,7%</td>
<td>25</td>
<td>23</td>
<td>-8,0%</td>
<td>110</td>
<td>100</td>
<td>-9,1%</td>
<td>1 897</td>
<td>1 999</td>
<td>5,4%</td>
</tr>
<tr>
<td>Évora</td>
<td>515</td>
<td>498</td>
<td>-3,3%</td>
<td>10</td>
<td>10</td>
<td>0,0%</td>
<td>74</td>
<td>75</td>
<td>1,4%</td>
<td>591</td>
<td>555</td>
<td>-6,1%</td>
</tr>
<tr>
<td>Faro</td>
<td>2 363</td>
<td>2 269</td>
<td>-4,0%</td>
<td>35</td>
<td>30</td>
<td>-14,3%</td>
<td>207</td>
<td>205</td>
<td>-1,0%</td>
<td>2 606</td>
<td>2 528</td>
<td>-3,0%</td>
</tr>
<tr>
<td>Guarda</td>
<td>480</td>
<td>462</td>
<td>-3,8%</td>
<td>16</td>
<td>6</td>
<td>-62,5%</td>
<td>50</td>
<td>38</td>
<td>-24,0%</td>
<td>559</td>
<td>541</td>
<td>-3,2%</td>
</tr>
<tr>
<td>Leiria</td>
<td>1 857</td>
<td>1 962</td>
<td>5,7%</td>
<td>36</td>
<td>24</td>
<td>-33,3%</td>
<td>185</td>
<td>173</td>
<td>-6,5%</td>
<td>2 121</td>
<td>2 267</td>
<td>6,9%</td>
</tr>
<tr>
<td>Lisboa</td>
<td>7 694</td>
<td>8 009</td>
<td>4,1%</td>
<td>58</td>
<td>62</td>
<td>6,9%</td>
<td>330</td>
<td>374</td>
<td>13,3%</td>
<td>9 036</td>
<td>9 400</td>
<td>4,0%</td>
</tr>
<tr>
<td>Portalegre</td>
<td>326</td>
<td>338</td>
<td>3,7%</td>
<td>9</td>
<td>15</td>
<td>66,7%</td>
<td>64</td>
<td>93</td>
<td>45,3%</td>
<td>364</td>
<td>372</td>
<td>2,2%</td>
</tr>
<tr>
<td>Porto</td>
<td>6 384</td>
<td>6 345</td>
<td>-0,6%</td>
<td>55</td>
<td>50</td>
<td>-9,1%</td>
<td>237</td>
<td>233</td>
<td>-1,7%</td>
<td>7 611</td>
<td>7 493</td>
<td>-1,6%</td>
</tr>
<tr>
<td>Santarém</td>
<td>1 656</td>
<td>1 701</td>
<td>2,7%</td>
<td>30</td>
<td>32</td>
<td>6,7%</td>
<td>214</td>
<td>245</td>
<td>14,5%</td>
<td>1 926</td>
<td>2 032</td>
<td>5,5%</td>
</tr>
<tr>
<td>Setúbal</td>
<td>2 724</td>
<td>2 886</td>
<td>5,9%</td>
<td>31</td>
<td>36</td>
<td>16,1%</td>
<td>206</td>
<td>229</td>
<td>11,2%</td>
<td>3 272</td>
<td>3 425</td>
<td>4,7%</td>
</tr>
<tr>
<td>V. Castelo</td>
<td>945</td>
<td>925</td>
<td>-2,1%</td>
<td>13</td>
<td>15</td>
<td>15,4%</td>
<td>73</td>
<td>56</td>
<td>-23,3%</td>
<td>1 143</td>
<td>1 119</td>
<td>-2,1%</td>
</tr>
<tr>
<td>Vila Real</td>
<td>669</td>
<td>695</td>
<td>3,9%</td>
<td>12</td>
<td>14</td>
<td>16,7%</td>
<td>59</td>
<td>70</td>
<td>18,6%</td>
<td>795</td>
<td>848</td>
<td>6,7%</td>
</tr>
<tr>
<td>Viseu</td>
<td>1 421</td>
<td>1 515</td>
<td>6,6%</td>
<td>21</td>
<td>14</td>
<td>-33,3%</td>
<td>119</td>
<td>121</td>
<td>1,7%</td>
<td>1 684</td>
<td>1 809</td>
<td>7,4%</td>
</tr>
<tr>
<td>RA Açores</td>
<td>681</td>
<td>681</td>
<td>0,0%</td>
<td>5</td>
<td>5</td>
<td>0,0%</td>
<td>105</td>
<td>129</td>
<td>22,9%</td>
<td>776</td>
<td>797</td>
<td>2,7%</td>
</tr>
<tr>
<td>RA Madeira</td>
<td>1 018</td>
<td>1 067</td>
<td>4,8%</td>
<td>9</td>
<td>3</td>
<td>-66,7%</td>
<td>75</td>
<td>83</td>
<td>10,7%</td>
<td>1 159</td>
<td>1 224</td>
<td>5,6%</td>
</tr>
<tr>
<td><strong>Total</strong></td>
<td><strong>38 037</strong></td>
<td><strong>39 007</strong></td>
<td><strong>2,6%</strong></td>
<td><strong>477</strong></td>
<td><strong>450</strong></td>
<td><strong>-5,7%</strong></td>
<td><strong>2 756</strong></td>
<td><strong>2 863</strong></td>
<td><strong>3,9%</strong></td>
<td><strong>44 618</strong></td>
<td><strong>45 724</strong></td>
<td><strong>2,5%</strong></td>
</tr>
</tbody>
</table></div>
<p>Nas vítimas mortais, aumentos absolutos em 8 distritos: Aveiro (+7, para 36), Bragança (+7, para 16) e Portalegre (+6, para 15). Maiores reduções: Leiria (-12, para 24), Braga (-11, para 28), Guarda (-10, para 6) e Viseu (-7, para 14). Na RA Madeira, de 9 para 3 mortes.</p>
<p>Nos feridos graves, subida em 9 distritos continentais e em ambas as Regiões Autónomas. Maiores agravamentos absolutos: Lisboa (+44, para 374), Santarém (+31, para 245) e Portalegre (+29, para 93). Maiores diminuições: Aveiro (-23), Braga (-17) e Viana do Castelo (-17).</p>
<p>No agregado de sinistralidade grave (VM+FG), as maiores subidas percentuais: Portalegre (+47,9%), Bragança (+39,7%), RA Açores (+21,8%) e Castelo Branco (+20,5%). Maiores recuos: Guarda (-33,3%), Viana do Castelo (-17,4%), Leiria (-10,9%) e Braga (-10,7%).</p>
`
  },

  // ===== 7. Sinistralidade por Categoria de Utente e Veículo =====
  {
    id: "ansr-06-sinistralidade-por-categoria-de-utente-e-veiculo",
    h: `<h2>1.1.11 Sinistralidade em Portugal por categoria de utente</h2>
<p>No caso dos condutores, recuo homólogo de 4,0% nas vítimas mortais (de 347 para 333), embora +2,5% face a 2019. Os passageiros tiveram agravamento homólogo de 22,4% na mortalidade (71 óbitos vs 58 em 2024), mas redução estrutural de -39,3% face a 2019. A mortalidade dos peões desceu 36,1% em termos homólogos (46 óbitos; menos 26 mortes que em 2024; -41,0% face a 2019).</p>
<h3>Quadro 17. Sinistralidade em Portugal por categoria de utente, 2019, 2024 e 2025</h3>
<div class="tw"><table>
<thead>
<tr>
<th>Categoria</th>
<th>VM 2019</th>
<th>VM 2024</th>
<th>VM 2025</th>
<th>FG 2019</th>
<th>FG 2024</th>
<th>FG 2025</th>
<th>FL 2019</th>
<th>FL 2024</th>
<th>FL 2025</th>
</tr>
</thead>
<tbody>
<tr>
<td>Condutores</td>
<td>325</td>
<td>347</td>
<td>333</td>
<td>1 585</td>
<td>1 854</td>
<td>1 983</td>
<td>28 884</td>
<td>30 268</td>
<td>31 334</td>
</tr>
<tr>
<td>Passageiros</td>
<td>117</td>
<td>58</td>
<td>71</td>
<td>441</td>
<td>440</td>
<td>471</td>
<td>10 672</td>
<td>9 500</td>
<td>9 506</td>
</tr>
<tr>
<td>Peões</td>
<td>78</td>
<td>72</td>
<td>46</td>
<td>506</td>
<td>462</td>
<td>409</td>
<td>5 397</td>
<td>4 850</td>
<td>4 884</td>
</tr>
<tr>
<td><strong>Total</strong></td>
<td><strong>520</strong></td>
<td><strong>477</strong></td>
<td><strong>450</strong></td>
<td><strong>2 532</strong></td>
<td><strong>2 756</strong></td>
<td><strong>2 863</strong></td>
<td><strong>44 953</strong></td>
<td><strong>44 618</strong></td>
<td><strong>45 724</strong></td>
</tr>
</tbody>
</table></div>
<p>Nos feridos graves, tendência de subida geral (+3,9% total), exceto peões (-11,5%, para 409; -19,2% face a 2019). Condutores e passageiros subiram igualmente 7,0% em termos homólogos (1.983 e 471 casos); face a 2019, o crescimento dos condutores graves atinge +25,1%.</p>
<h3>Quadro 18. Sinistralidade em Portugal por categoria de utente, taxas de variação 2025/2019 e 2025/2024</h3>
<div class="tw"><table>
<thead>
<tr>
<th>Categoria</th>
<th>VM Δ25/19</th>
<th>VM Δ25/24</th>
<th>FG Δ25/19</th>
<th>FG Δ25/24</th>
<th>FL Δ25/19</th>
<th>FL Δ25/24</th>
</tr>
</thead>
<tbody>
<tr>
<td>Condutores</td>
<td>2,5%</td>
<td>-4,0%</td>
<td>25,1%</td>
<td>7,0%</td>
<td>8,5%</td>
<td>3,5%</td>
</tr>
<tr>
<td>Passageiros</td>
<td>-39,3%</td>
<td>22,4%</td>
<td>6,8%</td>
<td>7,0%</td>
<td>-10,9%</td>
<td>0,1%</td>
</tr>
<tr>
<td>Peões</td>
<td>-41,0%</td>
<td>-36,1%</td>
<td>-19,2%</td>
<td>-11,5%</td>
<td>-9,5%</td>
<td>0,7%</td>
</tr>
<tr>
<td><strong>Total</strong></td>
<td><strong>-13,5%</strong></td>
<td><strong>-5,7%</strong></td>
<td><strong>13,1%</strong></td>
<td><strong>3,9%</strong></td>
<td><strong>1,7%</strong></td>
<td><strong>2,5%</strong></td>
</tr>
</tbody>
</table></div>
<p>Em 2025, os condutores representaram 74,0% da mortalidade, os passageiros 15,8% e os peões 10,2%. Nos feridos graves: condutores 69,3%, passageiros 16,5%, peões 14,3%.</p>
<h2>1.1.12 Sinistralidade em Portugal por categoria de veículo interveniente</h2>
<p>Os veículos ligeiros corresponderam a 70,9% do total de veículos intervenientes (+0,2 p.p. face a 2024; -4,2 p.p. face a 2019). Os motociclos são a 2.ª categoria (16,1%; -0,2 p.p. face a 2024; +3,7 p.p. face a 2019).</p>
<h3>Quadro 19. Categoria de veículos intervenientes em acidentes em Portugal, 2019, 2024 e 2025</h3>
<div class="tw"><table>
<thead>
<tr>
<th>Categoria</th>
<th>2019</th>
<th>2024</th>
<th>2025</th>
<th>Δ% 25/19</th>
<th>Δ% 25/24</th>
</tr>
</thead>
<tbody>
<tr>
<td>Veículos ligeiros</td>
<td>45 665</td>
<td>43 995</td>
<td>45 160</td>
<td>-1,1%</td>
<td>2,6%</td>
</tr>
<tr>
<td>Veículos pesados</td>
<td>1 679</td>
<td>1 749</td>
<td>1 799</td>
<td>7,1%</td>
<td>2,9%</td>
</tr>
<tr>
<td>Ciclomotores</td>
<td>2 506</td>
<td>1 679</td>
<td>1 504</td>
<td>-40,0%</td>
<td>-10,4%</td>
</tr>
<tr>
<td>Motociclos</td>
<td>7 538</td>
<td>10 116</td>
<td>10 236</td>
<td>35,8%</td>
<td>1,2%</td>
</tr>
<tr>
<td>Velocípedes</td>
<td>2 431</td>
<td>3 701</td>
<td>4 296</td>
<td>76,7%</td>
<td>16,1%</td>
</tr>
<tr>
<td>Veículos agrícolas</td>
<td>216</td>
<td>239</td>
<td>223</td>
<td>3,2%</td>
<td>-6,7%</td>
</tr>
<tr>
<td>Outros*</td>
<td>737</td>
<td>779</td>
<td>473</td>
<td>-35,8%</td>
<td>-39,3%</td>
</tr>
<tr>
<td><strong>Total</strong></td>
<td><strong>60 772</strong></td>
<td><strong>62 258</strong></td>
<td><strong>63 691</strong></td>
<td><strong>4,8%</strong></td>
<td><strong>2,3%</strong></td>
</tr>
</tbody>
</table></div>
<p>* Inclui máquinas industriais, triciclos, quadriciclos, veículos de tração animal, veículos sobre carris, desconhecidos e não definidos.</p>
<p>Destaques de crescimento face a 2019: velocípedes (+76,7%) e motociclos (+35,8%). Em termos homólogos, velocípedes continuam em forte aceleração (+16,1%; 4.296 veículos). Ciclomotores mantêm decréscimo estrutural (-40,0% face a 2019; -10,4% face a 2024). Veículos agrícolas inverteram a subida do ano anterior, com recuo homólogo de 6,7% (de 239 para 223), mas +3,2% acima de 2019.</p>
<h2>1.1.13 Vítimas em Portugal por categoria de veículo e peões</h2>
<p>Nos peões, recuo homólogo de 0,8% e contração de 10,7% face a 2019. Os utilizadores de velocípedes registaram os maiores crescimentos globais (+82,7% face a 2019; +16,7% homólogo). Motociclos: +36,3% face a 2019; +1,2% homólogo.</p>
<h3>Quadro 20. Vítimas em Portugal por categoria de veículo e peões, 2019, 2024 e 2025</h3>
<div class="tw"><table>
<thead>
<tr>
<th>Categoria</th>
<th>VM 2019</th>
<th>VM 2024</th>
<th>VM 2025</th>
<th>FG 2019</th>
<th>FG 2024</th>
<th>FG 2025</th>
<th>FL 2019</th>
<th>FL 2024</th>
<th>FL 2025</th>
<th>Total vítimas 2019</th>
<th>Total vítimas 2024</th>
<th>Total vítimas 2025</th>
</tr>
</thead>
<tbody>
<tr>
<td>Peões</td>
<td>78</td>
<td>72</td>
<td>46</td>
<td>506</td>
<td>462</td>
<td>409</td>
<td>5 397</td>
<td>4 850</td>
<td>4 884</td>
<td>5 981</td>
<td>5 384</td>
<td>5 339</td>
</tr>
<tr>
<td>Veículos ligeiros</td>
<td>237</td>
<td>216</td>
<td>214</td>
<td>1 028</td>
<td>1 028</td>
<td>1 116</td>
<td>26 743</td>
<td>24 246</td>
<td>24 618</td>
<td>28 008</td>
<td>25 490</td>
<td>25 948</td>
</tr>
<tr>
<td>Veículos pesados</td>
<td>36</td>
<td>3</td>
<td>8</td>
<td>46</td>
<td>27</td>
<td>49</td>
<td>600</td>
<td>567</td>
<td>717</td>
<td>682</td>
<td>597</td>
<td>774</td>
</tr>
<tr>
<td>Ciclomotores</td>
<td>26</td>
<td>18</td>
<td>10</td>
<td>166</td>
<td>131</td>
<td>107</td>
<td>2 393</td>
<td>1 597</td>
<td>1 430</td>
<td>2 585</td>
<td>1 746</td>
<td>1 547</td>
</tr>
<tr>
<td>Motociclos</td>
<td>99</td>
<td>125</td>
<td>130</td>
<td>584</td>
<td>866</td>
<td>843</td>
<td>7 121</td>
<td>9 527</td>
<td>9 666</td>
<td>7 804</td>
<td>10 518</td>
<td>10 639</td>
</tr>
<tr>
<td>Velocípedes</td>
<td>20</td>
<td>23</td>
<td>28</td>
<td>128</td>
<td>177</td>
<td>254</td>
<td>2 172</td>
<td>3 432</td>
<td>3 956</td>
<td>2 320</td>
<td>3 632</td>
<td>4 238</td>
</tr>
<tr>
<td>Veículos agrícolas</td>
<td>15</td>
<td>13</td>
<td>7</td>
<td>25</td>
<td>31</td>
<td>31</td>
<td>105</td>
<td>124</td>
<td>123</td>
<td>145</td>
<td>168</td>
<td>161</td>
</tr>
<tr>
<td>Outros*</td>
<td>9</td>
<td>7</td>
<td>7</td>
<td>49</td>
<td>34</td>
<td>54</td>
<td>422</td>
<td>275</td>
<td>330</td>
<td>480</td>
<td>316</td>
<td>391</td>
</tr>
<tr>
<td><strong>Total</strong></td>
<td><strong>520</strong></td>
<td><strong>477</strong></td>
<td><strong>450</strong></td>
<td><strong>2 532</strong></td>
<td><strong>2 756</strong></td>
<td><strong>2 863</strong></td>
<td><strong>44 953</strong></td>
<td><strong>44 618</strong></td>
<td><strong>45 724</strong></td>
<td><strong>48 005</strong></td>
<td><strong>47 851</strong></td>
<td><strong>49 037</strong></td>
</tr>
</tbody>
</table></div>
<p>* Inclui máquinas industriais, triciclos, quadriciclos, veículos de tração animal, veículos sobre carris, desconhecidos e não definidos.</p>
<h3>Quadro 21. Vítimas em Portugal por categoria de veículo e peões, taxas de variação 2025/2019 e 2025/2024</h3>
<div class="tw"><table>
<thead>
<tr>
<th>Categoria</th>
<th>VM Δ25/19</th>
<th>VM Δ25/24</th>
<th>FG Δ25/19</th>
<th>FG Δ25/24</th>
<th>FL Δ25/19</th>
<th>FL Δ25/24</th>
<th>Total Δ25/19</th>
<th>Total Δ25/24</th>
</tr>
</thead>
<tbody>
<tr>
<td>Peões</td>
<td>-41,0%</td>
<td>-36,1%</td>
<td>-19,2%</td>
<td>-11,5%</td>
<td>-9,5%</td>
<td>0,7%</td>
<td>-10,7%</td>
<td>-0,8%</td>
</tr>
<tr>
<td>Veículos ligeiros</td>
<td>-9,7%</td>
<td>-0,9%</td>
<td>8,6%</td>
<td>8,6%</td>
<td>-7,9%</td>
<td>1,5%</td>
<td>-7,4%</td>
<td>1,8%</td>
</tr>
<tr>
<td>Veículos pesados</td>
<td>-77,8%</td>
<td>166,7%</td>
<td>6,5%</td>
<td>81,5%</td>
<td>19,5%</td>
<td>26,5%</td>
<td>13,5%</td>
<td>29,6%</td>
</tr>
<tr>
<td>Ciclomotores</td>
<td>-61,5%</td>
<td>-44,4%</td>
<td>-35,5%</td>
<td>-18,3%</td>
<td>-40,2%</td>
<td>-10,5%</td>
<td>-40,2%</td>
<td>-11,4%</td>
</tr>
<tr>
<td>Motociclos</td>
<td>31,3%</td>
<td>4,0%</td>
<td>44,3%</td>
<td>-2,7%</td>
<td>35,7%</td>
<td>1,5%</td>
<td>36,3%</td>
<td>1,2%</td>
</tr>
<tr>
<td>Velocípedes</td>
<td>40,0%</td>
<td>21,7%</td>
<td>98,4%</td>
<td>43,5%</td>
<td>82,1%</td>
<td>15,3%</td>
<td>82,7%</td>
<td>16,7%</td>
</tr>
<tr>
<td>Veículos agrícolas</td>
<td>-53,3%</td>
<td>-46,2%</td>
<td>24,0%</td>
<td>0,0%</td>
<td>17,1%</td>
<td>-0,8%</td>
<td>11,0%</td>
<td>-4,2%</td>
</tr>
<tr>
<td>Outros</td>
<td>-22,2%</td>
<td>0,0%</td>
<td>10,2%</td>
<td>58,8%</td>
<td>-21,8%</td>
<td>20,0%</td>
<td>-18,5%</td>
<td>23,7%</td>
</tr>
<tr>
<td><strong>Total</strong></td>
<td><strong>-13,5%</strong></td>
<td><strong>-5,7%</strong></td>
<td><strong>13,1%</strong></td>
<td><strong>3,9%</strong></td>
<td><strong>1,7%</strong></td>
<td><strong>2,5%</strong></td>
<td><strong>2,1%</strong></td>
<td><strong>2,5%</strong></td>
</tr>
</tbody>
</table></div>
<p>Na análise de longo prazo, destaca-se o agravamento absoluto nos motociclos (+31 óbitos face a 2019) e a redução nos veículos ligeiros (-23 óbitos) e ciclomotores (-16 óbitos). Em termos homólogos, destaca-se a redução na mortalidade de peões (-26 óbitos) e um aumento de 5 óbitos em cada uma das categorias veículos pesados, motociclos e velocípedes. Nos feridos graves, forte incremento de 98,4% nos utilizadores de velocípedes (de 128 em 2019 para 254 em 2025).</p>
<p>Em termos de representatividade no total de vítimas em 2025: veículos ligeiros 52,9% (-5,4 p.p. face a 2019; -0,4 p.p. face a 2024); motociclos 21,7% (+5,4 p.p.; -0,3 p.p.); peões 10,9% (-1,6 p.p.; -0,4 p.p.); velocípedes 8,6% (+3,8 p.p.; +1,1 p.p.).</p>
`
  },

  // ===== 8. Vítimas Mortais por Entidade Gestora de Via =====
  {
    id: "ansr-07-vitimas-mortais-por-entidade-gestora-de-via",
    h: `<h2>1.1.14 Vítimas mortais em Portugal por entidade gestora de via</h2>
<p>No ano de 2025, 50,4% do número de vítimas mortais registou-se na rede rodoviária sob a responsabilidade das seguintes entidades gestoras de via: Infraestruturas de Portugal (42,4%), Brisa (4,4%) e Município de Lisboa (3,6%).</p>
<p>Verificou-se que 50,4% das vítimas mortais resultaram de acidentes nas vias da rede rodoviária nacional (8,0% na rede concessionada além da IP), cabendo às vias sob gestão municipal a proporção de 47,6%.</p>
<h3>Quadro 22. Vítimas mortais em Portugal por entidade gestora de via (EGV), 2019 e 2025</h3>
<div class="tw"><table>
<thead>
<tr>
<th>Tipo de gestão</th>
<th>Entidade gestora</th>
<th>N.º VM/EGV 2025</th>
<th>Total VM 2025 %</th>
<th>Total VM 2019</th>
<th>Variação 2025-2019</th>
</tr>
</thead>
<tbody>
<tr>
<td>Concessionária da Rede Rodoviária Nacional</td>
<td>Infraestruturas Portugal</td>
<td>191</td>
<td>42,4%</td>
<td>209</td>
<td>-8,6%</td>
</tr>
<tr>
<td>Concessionárias do Estado</td>
<td>Brisa</td>
<td>20</td>
<td>4,4%</td>
<td>32</td>
<td>-37,5%</td>
</tr>
<tr>
<td>Concessionárias do Estado</td>
<td>Ascendi</td>
<td>5</td>
<td>1,1%</td>
<td>10</td>
<td>-50,0%</td>
</tr>
<tr>
<td>Concessionárias do Estado</td>
<td>Concessão Oeste</td>
<td>5</td>
<td>1,1%</td>
<td>0</td>
<td>-</td>
</tr>
<tr>
<td>Concessionárias do Estado</td>
<td>Interior Norte (NorScut)</td>
<td>3</td>
<td>0,7%</td>
<td>0</td>
<td>-</td>
</tr>
<tr>
<td>Concessionárias do Estado</td>
<td>Concessão Norte Litoral</td>
<td>2</td>
<td>0,4%</td>
<td>1</td>
<td>100,0%</td>
</tr>
<tr>
<td>Concessionárias do Estado</td>
<td>Concessão Douro Litoral</td>
<td>1</td>
<td>0,2%</td>
<td>1</td>
<td>0,0%</td>
</tr>
<tr>
<td>Concessionárias do Estado</td>
<td>Concessão Algarve</td>
<td>0</td>
<td>0,0%</td>
<td>3</td>
<td>-100,0%</td>
</tr>
<tr>
<td>Concessionárias do Estado</td>
<td>Concessão Litoral Centro</td>
<td>0</td>
<td>0,0%</td>
<td>1</td>
<td>-100,0%</td>
</tr>
<tr>
<td>Concessionárias do Estado</td>
<td>Globalvia (Beira Interior)</td>
<td>0</td>
<td>0,0%</td>
<td>1</td>
<td>-100,0%</td>
</tr>
<tr>
<td>Concessionárias do Estado</td>
<td>Lusoponte</td>
<td>0</td>
<td>0,0%</td>
<td>1</td>
<td>-100,0%</td>
</tr>
<tr>
<td>Concessionárias do Estado</td>
<td><strong>Total</strong></td>
<td><strong>36</strong></td>
<td><strong>8,0%</strong></td>
<td><strong>50</strong></td>
<td><strong>-28,0%</strong></td>
</tr>
<tr>
<td>Gestão Regiões Autónomas</td>
<td>RA Açores</td>
<td>5</td>
<td>1,1%</td>
<td>7</td>
<td>-28,6%</td>
</tr>
<tr>
<td>Gestão Regiões Autónomas</td>
<td>RA Madeira</td>
<td>3</td>
<td>0,7%</td>
<td>39</td>
<td>-92,3%</td>
</tr>
<tr>
<td>Gestão Regiões Autónomas</td>
<td><strong>Total</strong></td>
<td><strong>8</strong></td>
<td><strong>1,8%</strong></td>
<td><strong>46</strong></td>
<td><strong>-82,6%</strong></td>
</tr>
<tr>
<td>Gestão Municipal</td>
<td>Lisboa</td>
<td>16</td>
<td>3,6%</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>Gestão Municipal</td>
<td>Palmela</td>
<td>6</td>
<td>1,3%</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>Gestão Municipal</td>
<td>Loures, Ovar, Santa Maria da Feira, Vila Nova de Gaia (5 cada)</td>
<td>20</td>
<td>4,4%</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>Gestão Municipal</td>
<td>Miranda do Corvo, Setúbal, Sintra, Tavira (4 cada)</td>
<td>16</td>
<td>3,6%</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>Gestão Municipal</td>
<td>Albufeira, Alcobaça, Barcelos, Celorico de Basto, Faro, Guimarães, Leiria, Mogadouro, Montemor-o-Velho, Silves, Torres Vedras, Vila Nova de Famalicão (3 cada)</td>
<td>36</td>
<td>8,0%</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>Gestão Municipal</td>
<td>Abrantes, Almada, Amarante, Aveiro, Benavente, Caminha, Cantanhede, Coimbra, Covilhã, Fafe, Ferreira do Alentejo, Gondomar, Guarda, Ílhavo, Loulé, Macedo de Cavaleiros, Mafra, Maia, Oliveira de Azeméis, Paços de Ferreira, Ponte de Lima, Porto, Porto de Mós, Rio Maior, Santa Marta de Penaguião, Sátão, Seixal, Tomar, Torre de Moncorvo, Vagos, Viana do Castelo, Vila Franca de Xira (2 cada)</td>
<td>64</td>
<td>14,2%</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>Gestão Municipal</td>
<td>Águeda, Almeirim, Amadora, Ansião, Arouca, Baião, Batalha, Bragança, Cadaval, Campo Maior, Castanheira de Pêra, Castelo Branco, Castelo de Paiva, Castro Daire, Castro Marim, Coruche, Estarreja, Figueira da Foz, Figueira de Castelo Rodrigo, Grândola, Lagoa, Lousada, Mangualde, Marco de Canaveses, Marinha Grande, Matosinhos, Moita, Monchique, Mondim de Basto, Monforte, Montalegre, Montemor-o-Novo, Nisa, Odemira, Odivelas, Oliveira do Bairro, Oliveira do Hospital, Ourém, Paredes, Pedrógão Grande, Portalegre, Redondo, Resende, Santarém, Seia, Sertã, Sever do Vouga, Sines, Sousel, Trofa, Valongo, Valpaços, Vieira do Minho, Vila Nova de Cerveira, Vila Pouca de Aguiar, Viseu (1 cada)</td>
<td>56</td>
<td>12,4%</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>Gestão Municipal</td>
<td><strong>Total</strong></td>
<td><strong>214</strong></td>
<td><strong>47,6%</strong></td>
<td><strong>215</strong></td>
<td><strong>-0,5%</strong></td>
</tr>
<tr>
<td>Outra</td>
<td>Outra</td>
<td>1</td>
<td>0,2%</td>
<td>0</td>
<td>-</td>
</tr>
<tr>
<td><strong>TOTAL</strong></td>
<td></td>
<td><strong>450</strong></td>
<td><strong>100%</strong></td>
<td><strong>520</strong></td>
<td><strong>-13,5%</strong></td>
</tr>
</tbody>
</table></div>
<p>A informação discriminada por cada acidente com vítimas mortais encontra-se em <a href="#/ansr-10-anexo-caracterizacao-dos-acidentes-com-vitimas-mortais">10 Anexo - Caracterização dos Acidentes com Vítimas Mortais</a>.</p>
`
  },

  // ===== 9. Fiscalização =====
  {
    id: "ansr-08-fiscalizacao",
    h: `<p>A fiscalização rodoviária desempenha um papel crucial na segurança das estradas, sendo uma das medidas fundamentais de um dos cinco pilares do Sistema Seguro. É no pilar dos utilizadores seguros que a fiscalização rodoviária ganha especial relevância: uma fiscalização ativa, consistente e visível, combinada com campanhas de sensibilização, promove o cumprimento das regras de trânsito e ajuda a prevenir comportamentos de risco como o excesso de velocidade, a condução sob efeito de álcool ou drogas, o não uso de cinto de segurança ou a distração ao volante.</p>
<p>Distingue-se a fiscalização presencial, efetuada pelas Forças de Segurança (GNR e PSP) e outras entidades fiscalizadoras através de agentes de autoridade, da fiscalização automática por meios telemáticos (radar), efetuada pelas Forças de Segurança e outras entidades fiscalizadoras, ou pela ANSR. Uma fiscalização eficaz não é apenas um meio de punição, mas um instrumento essencial de prevenção e educação.</p>
<h2>2.1 Fiscalização ANSR, GNR, PSP e PML</h2>
<h3>2.1.1 Condutores e veículos fiscalizados</h3>
<p>Em 2025, foram fiscalizados presencialmente pelas Forças de Segurança 3,1 milhões de veículos e condutores, e de forma automática através de radar (Forças de Segurança, PML e ANSR) 315,6 milhões de veículos, num total de 318,6 milhões de veículos — aumento de 21,3% face a 2024. O SINCRO (ANSR), a GNR, a PSP e a PML registaram aumentos de 19,6%, 49,4%, 4,6% e 39,7%, respetivamente, no global entre fiscalização presencial e automática.</p>
<h4>Quadro 23. Condutores e veículos fiscalizados, 2025 vs 2024 e 2019</h4>
<div class="tw"><table>
<thead>
<tr>
<th>Entidade</th>
<th>Fisc. presencial 2019</th>
<th>Fisc. presencial 2024</th>
<th>Fisc. presencial 2025</th>
<th>Δ% 25/24</th>
<th>Fisc. radar 2019</th>
<th>Fisc. radar 2024</th>
<th>Fisc. radar 2025</th>
<th>Δ% 25/24</th>
<th>Total 2019</th>
<th>Total 2024</th>
<th>Total 2025</th>
<th>Δ% 25/24</th>
</tr>
</thead>
<tbody>
<tr>
<td>ANSR</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>83 714 258</td>
<td>243 902 902</td>
<td>291 827 873</td>
<td>19,6%</td>
<td>83 714 258</td>
<td>243 902 902</td>
<td>291 827 873</td>
<td>19,6%</td>
</tr>
<tr>
<td>GNR</td>
<td>1 523 322</td>
<td>2 261 683</td>
<td>2 331 776</td>
<td>3,1%</td>
<td>7 357 678</td>
<td>13 114 619</td>
<td>20 637 313</td>
<td>57,4%</td>
<td>8 881 000</td>
<td>15 376 302</td>
<td>22 969 089</td>
<td>49,4%</td>
</tr>
<tr>
<td>PSP</td>
<td>911 636</td>
<td>679 512</td>
<td>707 931</td>
<td>4,2%</td>
<td>2 467 813</td>
<td>2 174 703</td>
<td>2 277 435</td>
<td>4,7%</td>
<td>3 379 449</td>
<td>2 854 215</td>
<td>2 985 366</td>
<td>4,6%</td>
</tr>
<tr>
<td>PML</td>
<td>11 807</td>
<td>13 379</td>
<td>21 761</td>
<td>62,7%</td>
<td>499 118</td>
<td>606 156</td>
<td>843 489</td>
<td>39,2%</td>
<td>510 925</td>
<td>619 535</td>
<td>865 250</td>
<td>39,7%</td>
</tr>
<tr>
<td><strong>Total</strong></td>
<td><strong>2 446 765</strong></td>
<td><strong>2 954 574</strong></td>
<td><strong>3 061 468</strong></td>
<td><strong>3,6%</strong></td>
<td><strong>94 038 867</strong></td>
<td><strong>259 798 380</strong></td>
<td><strong>315 586 110</strong></td>
<td><strong>21,5%</strong></td>
<td><strong>96 485 632</strong></td>
<td><strong>262 752 954</strong></td>
<td><strong>318 647 578</strong></td>
<td><strong>21,3%</strong></td>
</tr>
</tbody>
</table></div>
<p>O sistema de radares da responsabilidade da ANSR assegurou 91,6% da fiscalização total em 2025 (92,8% no ano anterior).</p>
<h3>2.1.2 Infrações</h3>
<p>Do total de 318,6 milhões de veículos fiscalizados em 2025, detetou-se 1,4 milhão de infrações — redução de 5,7% face ao ano anterior.</p>
<h4>Quadro 24. Infrações, 2025 vs 2024 e 2019</h4>
<div class="tw"><table>
<thead>
<tr>
<th>Entidade</th>
<th>Fiscalizados 2019</th>
<th>Fiscalizados 2024</th>
<th>Fiscalizados 2025</th>
<th>Δ% 25/24</th>
<th>Infrações 2019</th>
<th>Infrações 2024</th>
<th>Infrações 2025</th>
<th>Δ% 25/24</th>
<th>Tx infração 2019</th>
<th>Tx infração 2024</th>
<th>Tx infração 2025</th>
<th>Δ% 25/24</th>
</tr>
</thead>
<tbody>
<tr>
<td>ANSR</td>
<td>83 714 258</td>
<td>243 902 902</td>
<td>291 827 873</td>
<td>19,6%</td>
<td>403 505</td>
<td>614 171</td>
<td>514 652</td>
<td>-16,2%</td>
<td>0,48%</td>
<td>0,25%</td>
<td>0,18%</td>
<td>-30,0%</td>
</tr>
<tr>
<td>GNR</td>
<td>8 881 000</td>
<td>15 376 302</td>
<td>22 969 089</td>
<td>49,4%</td>
<td>537 095</td>
<td>439 870</td>
<td>439 217</td>
<td>-0,1%</td>
<td>6,05%</td>
<td>2,86%</td>
<td>1,91%</td>
<td>-33,2%</td>
</tr>
<tr>
<td>PSP</td>
<td>3 379 449</td>
<td>2 854 215</td>
<td>2 985 366</td>
<td>4,6%</td>
<td>285 570</td>
<td>201 650</td>
<td>236 235</td>
<td>17,2%</td>
<td>8,45%</td>
<td>7,06%</td>
<td>7,91%</td>
<td>12,0%</td>
</tr>
<tr>
<td>PML (a)</td>
<td>510 925</td>
<td>619 535</td>
<td>865 250</td>
<td>39,7%</td>
<td>125 293</td>
<td>239 125</td>
<td>219 012</td>
<td>-8,4%</td>
<td>18,34%</td>
<td>18,40%</td>
<td>13,73%</td>
<td>-25,4%</td>
</tr>
<tr>
<td><strong>Total (b)</strong></td>
<td><strong>96 485 632</strong></td>
<td><strong>262 752 954</strong></td>
<td><strong>318 647 578</strong></td>
<td><strong>21,3%</strong></td>
<td><strong>1 351 463</strong></td>
<td><strong>1 494 816</strong></td>
<td><strong>1 409 116</strong></td>
<td><strong>-5,7%</strong></td>
<td><strong>1,35%</strong></td>
<td><strong>0,51%</strong></td>
<td><strong>0,41%</strong></td>
<td><strong>-20,5%</strong></td>
</tr>
</tbody>
</table></div>
<p>(a) Na PML, a taxa de infração apenas inclui radares móveis. (b) Taxa de infração global: apenas inclui radares móveis PML (fiscalização e infrações).</p>
<p>Em 2025, a taxa de infração global foi de 0,41%, uma redução de 20,5% face a 2024.</p>
<h3>2.1.3 Tipologia de infrações</h3>
<p>54,9% do número total de infrações em 2025 correspondeu a excesso de velocidade; 6,0% a ausência de inspeção periódica obrigatória; 2,4% a condução sob influência de álcool; 1,9% a ausência de seguro; 1,6% a uso de telemóvel; 1,1% a não utilização de cinto de segurança.</p>
<h4>Quadro 25. Tipologia de infrações, 2025 vs 2024 e 2019</h4>
<div class="tw"><table>
<thead>
<tr>
<th>Tipo de infração</th>
<th>N.º 2019</th>
<th>% 2019</th>
<th>N.º 2024</th>
<th>% 2024</th>
<th>N.º 2025</th>
<th>% 2025</th>
<th>Δ% 25/24</th>
<th>Δ p.p. 25-24</th>
</tr>
</thead>
<tbody>
<tr>
<td>Velocidade</td>
<td>683 162</td>
<td>50,5%</td>
<td>892 379</td>
<td>59,7%</td>
<td>773 374</td>
<td>54,9%</td>
<td>-13,3%</td>
<td>-4,81</td>
</tr>
<tr>
<td>Álcool</td>
<td>33 774</td>
<td>2,5%</td>
<td>35 811</td>
<td>2,4%</td>
<td>34 366</td>
<td>2,4%</td>
<td>-4,0%</td>
<td>0,04</td>
</tr>
<tr>
<td>Seguro</td>
<td>19 177</td>
<td>1,4%</td>
<td>53 968</td>
<td>3,6%</td>
<td>27 323</td>
<td>1,9%</td>
<td>-49,4%</td>
<td>-1,67</td>
</tr>
<tr>
<td>Inspeção periódica obrigatória</td>
<td>45 351</td>
<td>3,4%</td>
<td>102 965</td>
<td>6,9%</td>
<td>84 452</td>
<td>6,0%</td>
<td>-18,0%</td>
<td>-0,89</td>
</tr>
<tr>
<td>Telemóvel</td>
<td>31 306</td>
<td>2,3%</td>
<td>22 772</td>
<td>1,5%</td>
<td>21 853</td>
<td>1,6%</td>
<td>-4,0%</td>
<td>0,03</td>
</tr>
<tr>
<td>Cintos de segurança</td>
<td>23 631</td>
<td>1,7%</td>
<td>17 547</td>
<td>1,2%</td>
<td>16 111</td>
<td>1,1%</td>
<td>-8,2%</td>
<td>-0,03</td>
</tr>
<tr>
<td>Sistemas de retenção para crianças</td>
<td>3 871</td>
<td>0,3%</td>
<td>2 047</td>
<td>0,1%</td>
<td>2 335</td>
<td>0,2%</td>
<td>14,1%</td>
<td>0,03</td>
</tr>
<tr>
<td>Outras</td>
<td>511 191</td>
<td>37,8%</td>
<td>367 327</td>
<td>24,6%</td>
<td>449 302</td>
<td>31,9%</td>
<td>22,3%</td>
<td>7,31</td>
</tr>
<tr>
<td><strong>Total</strong></td>
<td><strong>1 351 463</strong></td>
<td><strong>100,0%</strong></td>
<td><strong>1 494 816</strong></td>
<td><strong>100,0%</strong></td>
<td><strong>1 409 116</strong></td>
<td><strong>100,0%</strong></td>
<td><strong>-5,7%</strong></td>
<td><strong>0,00</strong></td>
</tr>
</tbody>
</table></div>
<p>Face a 2024, verificaram-se diminuições em quase todas as tipologias, exceto sistemas de retenção para crianças (+14,1%). Destacam-se os decréscimos em ausência de seguro (-49,4%), inspeção periódica obrigatória (-18,0%), excesso de velocidade (-13,3%), ausência de cinto de segurança (-8,2%), e excesso de álcool e telemóvel (ambas -4,0%).</p>
<h3>2.1.4 Infrações por excesso de velocidade</h3>
<p>Decréscimos de 16,2% no SINCRO da ANSR e de 21,0% na PML; aumentos de 35,6% (PSP) e 3,3% (GNR).</p>
<h4>Quadro 26. Infrações por excesso de velocidade, 2025 vs 2024 e 2019</h4>
<div class="tw"><table>
<thead>
<tr>
<th>Entidade</th>
<th>Veíc. fiscalizados 2019</th>
<th>Veíc. fiscalizados 2024</th>
<th>Veíc. fiscalizados 2025</th>
<th>Δ% 25/24</th>
<th>Infrações 2019 (tx)</th>
<th>Infrações 2024 (tx)</th>
<th>Infrações 2025 (tx)</th>
<th>Δ% 25/24 N.º</th>
<th>Δ% 25/24 Tx</th>
</tr>
</thead>
<tbody>
<tr>
<td>ANSR</td>
<td>83 714 258</td>
<td>243 902 902</td>
<td>291 827 873</td>
<td>19,6%</td>
<td>403 505 (0,48%)</td>
<td>614 171 (0,25%)</td>
<td>514 652 (0,18%)</td>
<td>-16,2%</td>
<td>-30,0%</td>
</tr>
<tr>
<td>GNR</td>
<td>7 357 678</td>
<td>13 114 619</td>
<td>20 637 313</td>
<td>57,4%</td>
<td>153 282 (2,08%)</td>
<td>91 644 (0,70%)</td>
<td>94 648 (0,46%)</td>
<td>3,3%</td>
<td>-34,4%</td>
</tr>
<tr>
<td>PSP</td>
<td>2 467 813</td>
<td>2 174 703</td>
<td>2 277 435</td>
<td>4,7%</td>
<td>55 767 (2,26%)</td>
<td>29 601 (1,36%)</td>
<td>40 151 (1,76%)</td>
<td>35,6%</td>
<td>29,5%</td>
</tr>
<tr>
<td>PML (a)</td>
<td>499 118</td>
<td>606 156</td>
<td>843 489</td>
<td>39,2%</td>
<td>70 608 (5,71%)</td>
<td>156 963 (0,80%)</td>
<td>123 923 (1,07%)</td>
<td>-21,0%</td>
<td>34,2%</td>
</tr>
<tr>
<td><strong>Total (b)</strong></td>
<td><strong>94 038 867</strong></td>
<td><strong>259 798 380</strong></td>
<td><strong>315 586 110</strong></td>
<td><strong>21,5%</strong></td>
<td><strong>683 162 (0,68%)</strong></td>
<td><strong>892 379 (0,28%)</strong></td>
<td><strong>773 374 (0,21%)</strong></td>
<td><strong>-13,3%</strong></td>
<td><strong>-26,8%</strong></td>
</tr>
</tbody>
</table></div>
<p>(a) Na PML, a taxa de infração apenas inclui radares móveis. (b) Taxa de infração global: na PML apenas inclui radares móveis.</p>
<p>A taxa de infração (n.º de infrações de velocidade / n.º de veículos fiscalizados automaticamente por radar) diminuiu 26,8%, de 0,28% (2024) para 0,21% (2025).</p>
<h3>2.1.5 Infrações por condução sob influência de álcool</h3>
<p>Em 2025, foram submetidos ao teste de pesquisa de álcool 2,1 milhões de condutores (+0,2% face a 2024).</p>
<h4>Quadro 27. Infrações por influência de álcool, 2025 vs 2024 e 2019</h4>
<div class="tw"><table>
<thead>
<tr>
<th></th>
<th>Testes 2019</th>
<th>Testes 2024</th>
<th>Testes 2025</th>
<th>Δ% 25/24</th>
<th>Infrações 2019 (tx)</th>
<th>Infrações 2024 (tx)</th>
<th>Infrações 2025 (tx)</th>
<th>Δ% 25/24 N.º</th>
<th>Δ% 25/24 Tx</th>
</tr>
</thead>
<tbody>
<tr>
<td>Total</td>
<td>1 682 501</td>
<td>2 093 851</td>
<td>2 097 224</td>
<td>0,2%</td>
<td>33 774 (2,01%)</td>
<td>35 811 (1,71%)</td>
<td>34 366 (1,64%)</td>
<td>-4,0%</td>
<td>-4,2%</td>
</tr>
</tbody>
</table></div>
<p>A taxa de infração (n.º de infrações por álcool/n.º de testes efetuados) reduziu de 1,71% (2024) para 1,64% (2025), uma diminuição de 4,2%.</p>
<h3>2.1.6 Detenções</h3>
<p>O número total de detenções em 2025 aumentou 20,9% face a 2024, atingindo 35,8 mil condutores. 55,4% das detenções resultaram da condução sob efeito de álcool, seguindo-se 32,0% por condução sem habilitação legal.</p>
<h4>Quadro 28. Detenções, 2025 vs 2024 e 2019</h4>
<div class="tw"><table>
<thead>
<tr>
<th>Tipo de infração</th>
<th>2019</th>
<th>2024</th>
<th>2025</th>
<th>Δ% 25/24</th>
</tr>
</thead>
<tbody>
<tr>
<td>Condução sob influência de álcool</td>
<td>14 076</td>
<td>16 684</td>
<td>19 831</td>
<td>18,9%</td>
</tr>
<tr>
<td>Falta de habilitação legal para condução</td>
<td>7 059</td>
<td>8 862</td>
<td>11 458</td>
<td>29,3%</td>
</tr>
<tr>
<td>Outras</td>
<td>3 756</td>
<td>4 070</td>
<td>4 526</td>
<td>11,2%</td>
</tr>
<tr>
<td><strong>Total</strong></td>
<td><strong>24 891</strong></td>
<td><strong>29 616</strong></td>
<td><strong>35 815</strong></td>
<td><strong>20,9%</strong></td>
</tr>
</tbody>
</table></div>
<p>A taxa de condutores detidos por condução sob efeito do álcool (n.º de detenções por álcool/n.º de testes) aumentou de 0,80% (2024) para 0,95% (2025).</p>
`
  },

  // ===== 10. Processo Contraordenacional =====
  {
    id: "ansr-09-processo-contraordenacional",
    h: `<h2>3.1 Evolução da carta por pontos</h2>
<p>No dia 1 de junho de 2016 entrou em vigor o sistema da carta por pontos, um sistema mais simples e transparente que visa promover a adoção de comportamentos mais seguros e responsáveis na condução.</p>
<h3>3.1.1 Condutores e pontos na carta de condução</h3>
<p>O quadro seguinte mostra os pontos disponíveis entre os 840,3 mil condutores que, em dezembro de 2025, se encontravam sancionados com subtração de pontos, já considerando os condutores que neste período ganharam pontos por não terem registo de contraordenação grave, muito grave ou crime rodoviário.</p>
<h4>Quadro 29. Número de pontos disponíveis dos condutores sancionados com subtração de pontos em dezembro de 2025</h4>
<div class="tw"><table>
<thead>
<tr>
<th>N.º de pontos disponíveis</th>
<th>N.º de condutores</th>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td>4 111</td>
</tr>
<tr>
<td>1</td>
<td>6</td>
</tr>
<tr>
<td>2</td>
<td>36</td>
</tr>
<tr>
<td>3</td>
<td>8 252</td>
</tr>
<tr>
<td>4</td>
<td>1 206</td>
</tr>
<tr>
<td>5</td>
<td>3 410</td>
</tr>
<tr>
<td>6</td>
<td>1 475</td>
</tr>
<tr>
<td>7</td>
<td>11 955</td>
</tr>
<tr>
<td>8</td>
<td>2 997</td>
</tr>
<tr>
<td>9</td>
<td>64 849</td>
</tr>
<tr>
<td>10</td>
<td>17 245</td>
</tr>
<tr>
<td>11</td>
<td>127 234</td>
</tr>
<tr>
<td>12</td>
<td>34 693</td>
</tr>
<tr>
<td>13</td>
<td>562 823</td>
</tr>
<tr>
<td><strong>Total</strong></td>
<td><strong>840 292</strong></td>
</tr>
</tbody>
</table></div>
<h3>3.1.2 Cartas cassadas</h3>
<p>Desde a entrada em vigor do sistema de carta por pontos (1 de junho de 2016) até dezembro de 2025, 3.991 condutores ficaram com o título de condução cassado.</p>
<p>Dos restantes 120 condutores com zero pontos no título de condução, o processo já se encontra instruído: 49 estão na fase de audição da intenção de cassação e 71 na fase de notificação da decisão final de cassação.</p>
<h4>Quadro 30. Número de cartas cassadas, 2016 – dezembro de 2025</h4>
<div class="tw"><table>
<thead>
<tr>
<th>Ano</th>
<th>2016</th>
<th>2017</th>
<th>2018</th>
<th>2019</th>
<th>2020</th>
<th>2021</th>
<th>2022</th>
<th>2023</th>
<th>2024</th>
<th>2025</th>
<th>Total</th>
</tr>
</thead>
<tbody>
<tr>
<td>N.º de cartas cassadas</td>
<td>16</td>
<td>64</td>
<td>182</td>
<td>668</td>
<td>443</td>
<td>439</td>
<td>598</td>
<td>577</td>
<td>438</td>
<td>566</td>
<td>3 991</td>
</tr>
</tbody>
</table></div>
`
  },

  // ===== 11. Anexo - Caracterização dos Acidentes com Vítimas Mortais =====
  {
    id: "ansr-10-anexo-caracterizacao-dos-acidentes-com-vitimas-mortais",
    h: `<p>Lista discriminada, por ocorrência, dos acidentes com vítimas mortais registados em Portugal em 2025: número de vítimas mortais (VM), feridos graves (FG) e feridos leves (FL), natureza do acidente, tipo de via, distrito, concelho, localização (DL = dentro de localidade; FLoc = fora de localidade), designação da via, quilómetro e entidade gestora da via.</p>
<div class="tw"><table>
<thead>
<tr>
<th>VM</th>
<th>FG</th>
<th>FL</th>
<th>Natureza</th>
<th>Tipo de via</th>
<th>Distrito</th>
<th>Concelho</th>
<th>Local</th>
<th>Designação da via</th>
<th>Km</th>
<th>Entidade gestora</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>AE</td>
<td>Lisboa</td>
<td>Cascais</td>
<td>FLoc</td>
<td>A5</td>
<td>13,300</td>
<td>Brisa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Setúbal</td>
<td>Setúbal</td>
<td>DL</td>
<td>Avenida Baía de Setúbal</td>
<td>-</td>
<td>Município Setúbal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Sintra</td>
<td>DL</td>
<td>Avenida 29 de Agosto</td>
<td>-</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Braga</td>
<td>Barcelos</td>
<td>DL</td>
<td>Rua Igreja</td>
<td>-</td>
<td>Município Barcelos</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Santarém</td>
<td>Tomar</td>
<td>DL</td>
<td>Rua Escola</td>
<td>-</td>
<td>Município Tomar</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>IP</td>
<td>Lisboa</td>
<td>Lisboa</td>
<td>FLoc</td>
<td>IP7</td>
<td>1,600</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>IC</td>
<td>Aveiro</td>
<td>Oliveira de Azeméis</td>
<td>FLoc</td>
<td>IC2</td>
<td>262,100</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Leiria</td>
<td>Alcobaça</td>
<td>DL</td>
<td>Rua Leiria</td>
<td>-</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Évora</td>
<td>Montemor-o-Novo</td>
<td>DL</td>
<td>Rua Outeiro de Cima</td>
<td>-</td>
<td>Município Montemor-o-Novo</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Viana do Castelo</td>
<td>Ponte de Lima</td>
<td>DL</td>
<td>Rua Midões</td>
<td>-</td>
<td>Município Ponte de Lima</td>
</tr>
<tr>
<td>1</td>
<td>2</td>
<td>1</td>
<td>Despiste</td>
<td>EN</td>
<td>Lisboa</td>
<td>Arruda dos Vinhos</td>
<td>FLoc</td>
<td>EN248</td>
<td>21,750</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ER</td>
<td>Ilha da Madeira</td>
<td>Calheta (Madeira)</td>
<td>DL</td>
<td>ER105</td>
<td>18,700</td>
<td>R. A. Madeira</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>EN</td>
<td>Setúbal</td>
<td>Palmela</td>
<td>DL</td>
<td>EN379</td>
<td>34,550</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Braga</td>
<td>Vila Nova de Famalicão</td>
<td>DL</td>
<td>Avenida Nacional</td>
<td>-</td>
<td>Município Vila Nova de Famalicão</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Aveiro</td>
<td>Ílhavo</td>
<td>DL</td>
<td>Rua Soledade</td>
<td>-</td>
<td>Município Ílhavo</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>Outra Via</td>
<td>Beja</td>
<td>Odemira</td>
<td>FLoc</td>
<td>Caminho Convencional</td>
<td>-</td>
<td>Município Odemira</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Coimbra</td>
<td>Cantanhede</td>
<td>DL</td>
<td>Rua Doutor Sá Carneiro</td>
<td>-</td>
<td>Município Cantanhede</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>ER</td>
<td>Braga</td>
<td>Guimarães</td>
<td>DL</td>
<td>ER310</td>
<td>3,900</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>AE</td>
<td>Bragança</td>
<td>Mirandela</td>
<td>FLoc</td>
<td>A4</td>
<td>138,476</td>
<td>IP (AE Transmontana)</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>ARRM</td>
<td>Évora</td>
<td>Évora</td>
<td>DL</td>
<td>Praça Morgado Torres</td>
<td>-</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Porto</td>
<td>Vila Nova de Gaia</td>
<td>DL</td>
<td>Rua Sérgio Vieira de Melo</td>
<td>-</td>
<td>Município Vila Nova de Gaia</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Braga</td>
<td>Guimarães</td>
<td>DL</td>
<td>Rua Corgo</td>
<td>-</td>
<td>Município Guimarães</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Coimbra</td>
<td>Coimbra</td>
<td>DL</td>
<td>Rua Pinto dos Santos</td>
<td>-</td>
<td>Município Coimbra</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>AE</td>
<td>Leiria</td>
<td>Caldas da Rainha</td>
<td>FLoc</td>
<td>A8</td>
<td>80,870</td>
<td>Concessão Oeste</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Porto</td>
<td>Gondomar</td>
<td>DL</td>
<td>Rua Padre Joaquim das Neves</td>
<td>-</td>
<td>Município Gondomar</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>ARRM</td>
<td>Aveiro</td>
<td>Ovar</td>
<td>DL</td>
<td>Rua Monte</td>
<td>-</td>
<td>Município Ovar</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>AE</td>
<td>Lisboa</td>
<td>Cascais</td>
<td>FLoc</td>
<td>A5</td>
<td>21,100</td>
<td>Brisa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Viana do Castelo</td>
<td>Viana do Castelo</td>
<td>DL</td>
<td>Avenida 9 de Julho de 1985</td>
<td>-</td>
<td>Município Viana do Castelo</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Aveiro</td>
<td>Santa Maria da Feira</td>
<td>DL</td>
<td>Travessa Outeiro</td>
<td>-</td>
<td>Município Santa Maria da Feira</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Setúbal</td>
<td>Palmela</td>
<td>DL</td>
<td>Rua Salgueiro Maia</td>
<td>-</td>
<td>Município Palmela</td>
</tr>
<tr>
<td>2</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>IC</td>
<td>Castelo Branco</td>
<td>Sertã</td>
<td>FLoc</td>
<td>IC8</td>
<td>108,000</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>1</td>
<td>Colisão</td>
<td>EN</td>
<td>Santarém</td>
<td>Benavente</td>
<td>FLoc</td>
<td>EN119</td>
<td>28,875</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>ARRM</td>
<td>Faro</td>
<td>Albufeira</td>
<td>DL</td>
<td>Rua Dunfermline</td>
<td>-</td>
<td>Município Albufeira</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>2</td>
<td>Colisão</td>
<td>AE</td>
<td>Porto</td>
<td>Paredes</td>
<td>FLoc</td>
<td>A4</td>
<td>29,500</td>
<td>Brisa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>EN</td>
<td>Aveiro</td>
<td>Ovar</td>
<td>DL</td>
<td>EN109</td>
<td>38,000</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Porto</td>
<td>Porto</td>
<td>FLoc</td>
<td>EN14</td>
<td>0,400</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>EN</td>
<td>Lisboa</td>
<td>Vila Franca de Xira</td>
<td>DL</td>
<td>EN10-6</td>
<td>5,100</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>EN</td>
<td>Setúbal</td>
<td>Grândola</td>
<td>DL</td>
<td>EN261</td>
<td>26,550</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>4</td>
<td>Despiste</td>
<td>Outra Via</td>
<td>Braga</td>
<td>Celorico de Basto</td>
<td>DL</td>
<td>Caminho Florestal</td>
<td>-</td>
<td>Município Celorico de Basto</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Coimbra</td>
<td>Miranda do Corvo</td>
<td>DL</td>
<td>Rua Casa do Gaiato</td>
<td>-</td>
<td>Município Miranda do Corvo</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>Outra Via</td>
<td>Santarém</td>
<td>Santarém</td>
<td>FLoc</td>
<td>Ramal Saída da Circular Urbana Dom Luís I</td>
<td>-</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>0</td>
<td>Despiste</td>
<td>EM</td>
<td>Faro</td>
<td>Silves</td>
<td>FLoc</td>
<td>EM502</td>
<td>-</td>
<td>Município Silves</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Setúbal</td>
<td>Palmela</td>
<td>DL</td>
<td>Rua Fandanguinho</td>
<td>-</td>
<td>Município Palmela</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Leiria</td>
<td>Marinha Grande</td>
<td>DL</td>
<td>Rua das Cavadas</td>
<td>-</td>
<td>Município Marinha Grande</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Atropelamento</td>
<td>EN</td>
<td>Porto</td>
<td>Póvoa de Varzim</td>
<td>DL</td>
<td>EN206</td>
<td>1,200</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>3</td>
<td>Despiste</td>
<td>EN</td>
<td>Santarém</td>
<td>Coruche</td>
<td>FLoc</td>
<td>EN251</td>
<td>45,300</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Coimbra</td>
<td>Montemor-o-Velho</td>
<td>DL</td>
<td>Rua Moinho Quebrado</td>
<td>-</td>
<td>Município Montemor-o-Velho</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Beja</td>
<td>Beja</td>
<td>FLoc</td>
<td>EN260</td>
<td>10,400</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>3</td>
<td>Colisão</td>
<td>EN</td>
<td>Santarém</td>
<td>Abrantes</td>
<td>FLoc</td>
<td>EN2</td>
<td>410,200</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Porto</td>
<td>Vila Nova de Gaia</td>
<td>DL</td>
<td>Rua Raimundo de Carvalho</td>
<td>-</td>
<td>Município Vila Nova de Gaia</td>
</tr>
<tr>
<td>1</td>
<td>3</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Vila Real</td>
<td>Valpaços</td>
<td>DL</td>
<td>EN213</td>
<td>18,720</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>Outra Via</td>
<td>Faro</td>
<td>Castro Marim</td>
<td>FLoc</td>
<td>Caminho Municipal</td>
<td>-</td>
<td>Município Castro Marim</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Porto</td>
<td>Paços de Ferreira</td>
<td>DL</td>
<td>Rua Via Panorâmica</td>
<td>-</td>
<td>Município Paços de Ferreira</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Porto</td>
<td>Maia</td>
<td>DL</td>
<td>Avenida Doutor José Vieira de Carvalho</td>
<td>-</td>
<td>Município Maia</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Aveiro</td>
<td>Anadia</td>
<td>FLoc</td>
<td>EN1</td>
<td>213,675</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>EN</td>
<td>Setúbal</td>
<td>Sesimbra</td>
<td>FLoc</td>
<td>EN379</td>
<td>15,300</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>IC</td>
<td>Lisboa</td>
<td>Sintra</td>
<td>FLoc</td>
<td>IC19</td>
<td>8,900</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EF</td>
<td>Aveiro</td>
<td>Vagos</td>
<td>FLoc</td>
<td>EF1</td>
<td>-</td>
<td>Município Vagos</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>EN</td>
<td>Lisboa</td>
<td>Mafra</td>
<td>FLoc</td>
<td>EN8</td>
<td>34,200</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>3</td>
<td>0</td>
<td>Despiste</td>
<td>AE</td>
<td>Santarém</td>
<td>Alcanena</td>
<td>FLoc</td>
<td>A1</td>
<td>94,060</td>
<td>Brisa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Sintra</td>
<td>DL</td>
<td>Avenida Comissão de Melhoramento</td>
<td>-</td>
<td>Município Sintra</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Despiste</td>
<td>EM</td>
<td>Guarda</td>
<td>Figueira de Castelo Rodrigo</td>
<td>FLoc</td>
<td>EM607</td>
<td>-</td>
<td>Município Figueira de Castelo Rodrigo</td>
</tr>
<tr>
<td>2</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>Outra Via</td>
<td>Ilha de São Miguel</td>
<td>Lagoa (São Miguel)</td>
<td>FLoc</td>
<td>EIXO SUL</td>
<td>14,600</td>
<td>R. A. Açores</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Porto</td>
<td>Penafiel</td>
<td>DL</td>
<td>EN106</td>
<td>35,600</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Setúbal</td>
<td>Seixal</td>
<td>DL</td>
<td>Rua Foros de Amora</td>
<td>-</td>
<td>Município Seixal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>EN</td>
<td>Viana do Castelo</td>
<td>Valença</td>
<td>FLoc</td>
<td>EN201</td>
<td>2,900</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Braga</td>
<td>Guimarães</td>
<td>DL</td>
<td>Rua Leira</td>
<td>-</td>
<td>Município Guimarães</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>EN</td>
<td>Porto</td>
<td>Santo Tirso</td>
<td>DL</td>
<td>EN204</td>
<td>45,600</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ER</td>
<td>Ilha da Madeira</td>
<td>Machico</td>
<td>FLoc</td>
<td>ER101</td>
<td>40,000</td>
<td>R. A. Madeira</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Porto</td>
<td>Paços de Ferreira</td>
<td>DL</td>
<td>Avenida Doutor Paraíso Torres</td>
<td>-</td>
<td>Município Paços de Ferreira</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Loures</td>
<td>DL</td>
<td>Estrada de Pintéus</td>
<td>-</td>
<td>Município Loures</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>2</td>
<td>Colisão</td>
<td>AE</td>
<td>Porto</td>
<td>Vila Nova de Gaia</td>
<td>FLoc</td>
<td>A1</td>
<td>294,400</td>
<td>Brisa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Aveiro</td>
<td>Santa Maria da Feira</td>
<td>DL</td>
<td>Rua Quinta de São Bento</td>
<td>-</td>
<td>Município Santa Maria da Feira</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>1</td>
<td>Colisão</td>
<td>EN</td>
<td>Braga</td>
<td>Vila Nova de Famalicão</td>
<td>DL</td>
<td>EN206</td>
<td>26,457</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>0</td>
<td>Colisão</td>
<td>IP</td>
<td>Viseu</td>
<td>Santa Comba Dão</td>
<td>FLoc</td>
<td>IP3</td>
<td>79,250</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Aveiro</td>
<td>Aveiro</td>
<td>DL</td>
<td>Avenida Universidade</td>
<td>-</td>
<td>Município Aveiro</td>
</tr>
<tr>
<td>1</td>
<td>2</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Portalegre</td>
<td>Campo Maior</td>
<td>FLoc</td>
<td>EN371</td>
<td>47,425</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>AE</td>
<td>Lisboa</td>
<td>Lisboa</td>
<td>FLoc</td>
<td>A5</td>
<td>3,400</td>
<td>Brisa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Porto</td>
<td>Marco de Canaveses</td>
<td>DL</td>
<td>Rua Telheira</td>
<td>-</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>2</td>
<td>Despiste</td>
<td>EM</td>
<td>Vila Real</td>
<td>Montalegre</td>
<td>FLoc</td>
<td>EM508</td>
<td>-</td>
<td>Município Montalegre</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Vila Real</td>
<td>Chaves</td>
<td>FLoc</td>
<td>EN103-5</td>
<td>1,300</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Braga</td>
<td>Guimarães</td>
<td>DL</td>
<td>EN101</td>
<td>118,800</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>AE</td>
<td>Porto</td>
<td>Gondomar</td>
<td>FLoc</td>
<td>A41</td>
<td>40,300</td>
<td>Concessão Douro Litoral</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Santarém</td>
<td>Coruche</td>
<td>FLoc</td>
<td>EN251</td>
<td>15,083</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Porto</td>
<td>Vila Nova de Gaia</td>
<td>DL</td>
<td>Avenida Vasco da Gama com Ruas Alheiras</td>
<td>-</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>ARRM</td>
<td>Porto</td>
<td>Felgueiras</td>
<td>DL</td>
<td>Avenida Felgueiras</td>
<td>-</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>2</td>
<td>Colisão</td>
<td>EN</td>
<td>Santarém</td>
<td>Santarém</td>
<td>FLoc</td>
<td>EN365</td>
<td>31,950</td>
<td>Município Santarém</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Santarém</td>
<td>Benavente</td>
<td>FLoc</td>
<td>EN118</td>
<td>24,944</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>2</td>
<td>1</td>
<td>Colisão</td>
<td>IC</td>
<td>Leiria</td>
<td>Pedrógão Grande</td>
<td>FLoc</td>
<td>IC8</td>
<td>92,630</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Sintra</td>
<td>DL</td>
<td>Estrada Chão de Meninos</td>
<td>-</td>
<td>Município Sintra</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>IC</td>
<td>Castelo Branco</td>
<td>Proença-a-Nova</td>
<td>FLoc</td>
<td>IC8</td>
<td>134,500</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Bragança</td>
<td>Mogadouro</td>
<td>FLoc</td>
<td>EN221-7</td>
<td>1,960</td>
<td>Município Mogadouro</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Coimbra</td>
<td>Montemor-o-Velho</td>
<td>DL</td>
<td>Rua Doçaria Conventual</td>
<td>-</td>
<td>Município Montemor-o-Velho</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>1</td>
<td>Colisão</td>
<td>EN</td>
<td>Lisboa</td>
<td>Sintra</td>
<td>DL</td>
<td>EN117</td>
<td>18,400</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>AE</td>
<td>Leiria</td>
<td>Leiria</td>
<td>FLoc</td>
<td>A8</td>
<td>121,307</td>
<td>Concessão Oeste</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Despiste</td>
<td>VAR</td>
<td>Lisboa</td>
<td>Loures</td>
<td>DL</td>
<td>VAR-TOJAL</td>
<td>1,000</td>
<td>Município Loures</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Setúbal</td>
<td>Sesimbra</td>
<td>DL</td>
<td>EN377</td>
<td>35,725</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Lisboa</td>
<td>Oeiras</td>
<td>DL</td>
<td>EN6</td>
<td>4,100</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Braga</td>
<td>Braga</td>
<td>FLoc</td>
<td>EN101</td>
<td>96,955</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>EN</td>
<td>Porto</td>
<td>Penafiel</td>
<td>DL</td>
<td>EN106</td>
<td>32,750</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Viseu</td>
<td>Viseu</td>
<td>DL</td>
<td>EN231</td>
<td>2,850</td>
<td>Município Viseu</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EF</td>
<td>Castelo Branco</td>
<td>Covilhã</td>
<td>FLoc</td>
<td>-</td>
<td>-</td>
<td>Município Covilhã</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Braga</td>
<td>Vila Nova de Famalicão</td>
<td>DL</td>
<td>Rua São Bento</td>
<td>-</td>
<td>Município Vila Nova de Famalicão</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Portalegre</td>
<td>Arronches</td>
<td>FLoc</td>
<td>EN246</td>
<td>43,600</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>3</td>
<td>1</td>
<td>Colisão</td>
<td>EN</td>
<td>Viana do Castelo</td>
<td>Ponte da Barca</td>
<td>DL</td>
<td>EN101</td>
<td>60,083</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EM</td>
<td>Guarda</td>
<td>Guarda</td>
<td>FLoc</td>
<td>EM530</td>
<td>8,900</td>
<td>Município Guarda</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Lisboa</td>
<td>DL</td>
<td>Avenida General Norton de Matos</td>
<td>-</td>
<td>Município Lisboa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Setúbal</td>
<td>Moita</td>
<td>DL</td>
<td>Rua António Sérgio</td>
<td>-</td>
<td>Município Moita</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Guarda</td>
<td>Guarda</td>
<td>DL</td>
<td>Avenida Monsenhor Mendes do Carmo</td>
<td>-</td>
<td>Município Guarda</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Évora</td>
<td>Montemor-o-Novo</td>
<td>FLoc</td>
<td>EN253</td>
<td>62,602</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Viana do Castelo</td>
<td>Viana do Castelo</td>
<td>DL</td>
<td>Rua Mirante</td>
<td>-</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>4</td>
<td>Colisão</td>
<td>ER</td>
<td>Bragança</td>
<td>Mirandela</td>
<td>FLoc</td>
<td>ER315</td>
<td>29,060</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Braga</td>
<td>Guimarães</td>
<td>DL</td>
<td>EN206</td>
<td>37,500</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>2</td>
<td>Colisão</td>
<td>AE</td>
<td>Santarém</td>
<td>Cartaxo</td>
<td>FLoc</td>
<td>A1</td>
<td>55,569</td>
<td>Brisa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Portalegre</td>
<td>Nisa</td>
<td>FLoc</td>
<td>EN18</td>
<td>134,400</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Viana do Castelo</td>
<td>Vila Nova de Cerveira</td>
<td>DL</td>
<td>Rua Estrada Real</td>
<td>-</td>
<td>Município Vila Nova de Cerveira</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Évora</td>
<td>Évora</td>
<td>FLoc</td>
<td>EN254</td>
<td>47,300</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>2</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Braga</td>
<td>Braga</td>
<td>DL</td>
<td>Avenida Cávado</td>
<td>-</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>EN</td>
<td>Aveiro</td>
<td>Oliveira do Bairro</td>
<td>FLoc</td>
<td>EN235</td>
<td>11,200</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>IC</td>
<td>Faro</td>
<td>Silves</td>
<td>FLoc</td>
<td>IC1</td>
<td>711,750</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>IC</td>
<td>Setúbal</td>
<td>Alcácer do Sal</td>
<td>FLoc</td>
<td>IC1</td>
<td>548,280</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Santarém</td>
<td>Rio Maior</td>
<td>DL</td>
<td>Rua Principal do Larojo</td>
<td>-</td>
<td>Município Rio Maior</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EM</td>
<td>Coimbra</td>
<td>Miranda do Corvo</td>
<td>FLoc</td>
<td>EM633</td>
<td>-</td>
<td>Município Miranda do Corvo</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EM</td>
<td>Santarém</td>
<td>Abrantes</td>
<td>FLoc</td>
<td>EM575</td>
<td>-</td>
<td>Município Abrantes</td>
</tr>
<tr>
<td>4</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Faro</td>
<td>Tavira</td>
<td>DL</td>
<td>EN397</td>
<td>-</td>
<td>Município Tavira</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>IC</td>
<td>Leiria</td>
<td>Alcobaça</td>
<td>FLoc</td>
<td>IC2</td>
<td>88,658</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>2</td>
<td>Despiste</td>
<td>EN</td>
<td>Faro</td>
<td>Alcoutim</td>
<td>FLoc</td>
<td>EN122</td>
<td>90,000</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>VAR</td>
<td>Portalegre</td>
<td>Campo Maior</td>
<td>DL</td>
<td>-</td>
<td>-</td>
<td>Município Campo Maior</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>AE</td>
<td>Santarém</td>
<td>Torres Novas</td>
<td>FLoc</td>
<td>A1</td>
<td>89,300</td>
<td>Brisa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Santarém</td>
<td>Benavente</td>
<td>FLoc</td>
<td>EN10</td>
<td>102,057</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Aveiro</td>
<td>Águeda</td>
<td>DL</td>
<td>Rua Recardães</td>
<td>-</td>
<td>Município Águeda</td>
</tr>
<tr>
<td>2</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>Outra Via</td>
<td>Setúbal</td>
<td>Palmela</td>
<td>DL</td>
<td>Caminho Municipal 1027</td>
<td>-</td>
<td>Município Palmela</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EM</td>
<td>Santarém</td>
<td>Coruche</td>
<td>FLoc</td>
<td>EM591</td>
<td>-</td>
<td>Município Coruche</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>Outra Via</td>
<td>Faro</td>
<td>Faro</td>
<td>FLoc</td>
<td>Caminho Terra Batida Junto Ao Caminho Barranco</td>
<td>-</td>
<td>Município Faro</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Santarém</td>
<td>Santarém</td>
<td>DL</td>
<td>EN365</td>
<td>52,300</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>1</td>
<td>Colisão</td>
<td>EM</td>
<td>Portalegre</td>
<td>Nisa</td>
<td>FLoc</td>
<td>EM529</td>
<td>7,024</td>
<td>Município Nisa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Lisboa</td>
<td>DL</td>
<td>Rua C do Aeroporto de Lisboa</td>
<td>-</td>
<td>Município Lisboa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Lisboa</td>
<td>DL</td>
<td>Avenida Lusíada</td>
<td>-</td>
<td>Município Lisboa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>AE</td>
<td>Vila Real</td>
<td>Alijó</td>
<td>FLoc</td>
<td>A4</td>
<td>113,500</td>
<td>IP (AE Transmontana)</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ER</td>
<td>Santarém</td>
<td>Ourém</td>
<td>DL</td>
<td>ER356</td>
<td>47,650</td>
<td>Município Ourém</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Santarém</td>
<td>Tomar</td>
<td>DL</td>
<td>Rua Caldeirão</td>
<td>-</td>
<td>Município Tomar</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EM</td>
<td>Braga</td>
<td>Fafe</td>
<td>DL</td>
<td>EM614</td>
<td>-</td>
<td>Município Fafe</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Aveiro</td>
<td>Aveiro</td>
<td>DL</td>
<td>Avenida Doutor Francisco Vale Guimarães</td>
<td>-</td>
<td>Município Aveiro</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Braga</td>
<td>Celorico de Basto</td>
<td>DL</td>
<td>Rua Viso</td>
<td>-</td>
<td>Município Celorico de Basto</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Setúbal</td>
<td>Santiago do Cacém</td>
<td>FLoc</td>
<td>EN261-3</td>
<td>4,900</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Porto</td>
<td>Trofa</td>
<td>DL</td>
<td>Rua Horizonte</td>
<td>-</td>
<td>Município Trofa</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>0</td>
<td>Colisão</td>
<td>EM</td>
<td>Aveiro</td>
<td>Arouca</td>
<td>FLoc</td>
<td>EM510</td>
<td>-</td>
<td>Município Arouca</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Porto</td>
<td>Gondomar</td>
<td>FLoc</td>
<td>EN108</td>
<td>26,984</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Leiria</td>
<td>Alcobaça</td>
<td>FLoc</td>
<td>EN242-4</td>
<td>1,880</td>
<td>Município Alcobaça</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>AE</td>
<td>Lisboa</td>
<td>Loures</td>
<td>FLoc</td>
<td>A8</td>
<td>3,000</td>
<td>Concessão Oeste</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>IC</td>
<td>Leiria</td>
<td>Alcobaça</td>
<td>FLoc</td>
<td>IC2</td>
<td>85,886</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>EF</td>
<td>Aveiro</td>
<td>Vagos</td>
<td>DL</td>
<td>-</td>
<td>-</td>
<td>Município Vagos</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Santarém</td>
<td>Coruche</td>
<td>FLoc</td>
<td>EN114</td>
<td>103,440</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Braga</td>
<td>Vila Nova de Famalicão</td>
<td>DL</td>
<td>Rua Duque Loulé</td>
<td>-</td>
<td>Município Vila Nova de Famalicão</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>0</td>
<td>Despiste</td>
<td>AE</td>
<td>Beja</td>
<td>Ourique</td>
<td>FLoc</td>
<td>A2</td>
<td>166,000</td>
<td>Brisa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EM</td>
<td>Setúbal</td>
<td>Palmela</td>
<td>FLoc</td>
<td>EM533</td>
<td>-</td>
<td>Município Palmela</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Sintra</td>
<td>DL</td>
<td>Rua Doutor António Brandão de Vasconcelos</td>
<td>-</td>
<td>Município Sintra</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Lisboa</td>
<td>Mafra</td>
<td>FLoc</td>
<td>EN9</td>
<td>38,700</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EM</td>
<td>Faro</td>
<td>Albufeira</td>
<td>DL</td>
<td>EM526-1</td>
<td>-</td>
<td>Município Albufeira</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>Outra Via</td>
<td>Leiria</td>
<td>Alcobaça</td>
<td>DL</td>
<td>Estrada Azambujeira</td>
<td>-</td>
<td>Município Alcobaça</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>2</td>
<td>Colisão</td>
<td>AE</td>
<td>Coimbra</td>
<td>Coimbra</td>
<td>FLoc</td>
<td>A1</td>
<td>192,300</td>
<td>Brisa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Leiria</td>
<td>Porto de Mós</td>
<td>DL</td>
<td>Rua Principal</td>
<td>-</td>
<td>Município Porto de Mós</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Bragança</td>
<td>Mirandela</td>
<td>FLoc</td>
<td>EN213</td>
<td>40,000</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Braga</td>
<td>Barcelos</td>
<td>DL</td>
<td>Avenida Estação</td>
<td>-</td>
<td>Município Barcelos</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Braga</td>
<td>Guimarães</td>
<td>DL</td>
<td>Rua Cruz da Argola</td>
<td>-</td>
<td>Município Guimarães</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>Outra Via</td>
<td>Castelo Branco</td>
<td>Proença-a-Nova</td>
<td>FLoc</td>
<td>Nó Acesso nº 38 ao IC8, Km 123</td>
<td>-</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>2</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>IP</td>
<td>Portalegre</td>
<td>Nisa</td>
<td>FLoc</td>
<td>IP2</td>
<td>161,400</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>2</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Beja</td>
<td>Beja</td>
<td>FLoc</td>
<td>EN260</td>
<td>6,714</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Bragança</td>
<td>Mirandela</td>
<td>DL</td>
<td>EN206</td>
<td>187,000</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>ARRM</td>
<td>Faro</td>
<td>Loulé</td>
<td>DL</td>
<td>Rua Sol</td>
<td>-</td>
<td>Município Loulé</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Aveiro</td>
<td>Oliveira de Azeméis</td>
<td>DL</td>
<td>Rua São Marcos</td>
<td>-</td>
<td>Município Oliveira de Azeméis</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>2</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Setúbal</td>
<td>Setúbal</td>
<td>DL</td>
<td>Rua Mata</td>
<td>-</td>
<td>Município Setúbal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Lisboa</td>
<td>DL</td>
<td>Rua Campolide</td>
<td>-</td>
<td>Município Lisboa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Porto</td>
<td>Maia</td>
<td>DL</td>
<td>Rua Mosteiro</td>
<td>-</td>
<td>Município Maia</td>
</tr>
<tr>
<td>2</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EM</td>
<td>Bragança</td>
<td>Torre de Moncorvo</td>
<td>FLoc</td>
<td>EM623-1</td>
<td>-</td>
<td>Município Torre de Moncorvo</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>2</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Leiria</td>
<td>Leiria</td>
<td>DL</td>
<td>Rua Cidade de Colipo (EN356-2)</td>
<td>-</td>
<td>Município Leiria</td>
</tr>
<tr>
<td>2</td>
<td>0</td>
<td>1</td>
<td>Despiste</td>
<td>EN</td>
<td>Viana do Castelo</td>
<td>Caminha</td>
<td>FLoc</td>
<td>EN13</td>
<td>86,200</td>
<td>Município Caminha</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Torres Vedras</td>
<td>DL</td>
<td>Rua Principal</td>
<td>-</td>
<td>Município Torres Vedras</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Porto</td>
<td>Gondomar</td>
<td>DL</td>
<td>Rua Alto de Barreiros</td>
<td>-</td>
<td>Município Gondomar</td>
</tr>
<tr>
<td>2</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Portalegre</td>
<td>Avis</td>
<td>FLoc</td>
<td>EN244</td>
<td>104,200</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>IC</td>
<td>Leiria</td>
<td>Pombal</td>
<td>DL</td>
<td>IC8</td>
<td>45,300</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>3</td>
<td>Despiste</td>
<td>AE</td>
<td>Santarém</td>
<td>Santarém</td>
<td>FLoc</td>
<td>A1</td>
<td>79,320</td>
<td>Brisa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Vila Franca de Xira</td>
<td>DL</td>
<td>Estrada Adarse</td>
<td>-</td>
<td>Município Vila Franca de Xira</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Aveiro</td>
<td>Santa Maria da Feira</td>
<td>DL</td>
<td>Rua Principal</td>
<td>-</td>
<td>Município Santa Maria da Feira</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>2</td>
<td>Colisão</td>
<td>EN</td>
<td>Viana do Castelo</td>
<td>Monção</td>
<td>FLoc</td>
<td>EN202</td>
<td>3,650</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>EN</td>
<td>Porto</td>
<td>Santo Tirso</td>
<td>DL</td>
<td>EN319</td>
<td>9,900</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>1</td>
<td>Colisão</td>
<td>AE</td>
<td>Lisboa</td>
<td>Mafra</td>
<td>FLoc</td>
<td>A8</td>
<td>21,700</td>
<td>Concessão Oeste</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>EN</td>
<td>Porto</td>
<td>Penafiel</td>
<td>DL</td>
<td>EN106</td>
<td>28,600</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Viseu</td>
<td>Oliveira de Frades</td>
<td>FLoc</td>
<td>EN16</td>
<td>51,850</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Castelo Branco</td>
<td>Sertã</td>
<td>DL</td>
<td>Rua Padre Alfredo Correia Lima</td>
<td>-</td>
<td>Município Sertã</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>EN</td>
<td>Aveiro</td>
<td>Anadia</td>
<td>FLoc</td>
<td>EN235</td>
<td>25,575</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Aveiro</td>
<td>Ovar</td>
<td>DL</td>
<td>Avenida Doutor Francisco Sá Carneiro</td>
<td>-</td>
<td>Município Ovar</td>
</tr>
<tr>
<td>2</td>
<td>1</td>
<td>0</td>
<td>Despiste</td>
<td>ER</td>
<td>Castelo Branco</td>
<td>Covilhã</td>
<td>FLoc</td>
<td>ER338</td>
<td>31,700</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Setúbal</td>
<td>Seixal</td>
<td>DL</td>
<td>Avenida Ponte</td>
<td>-</td>
<td>Município Seixal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Braga</td>
<td>Vila Nova de Famalicão</td>
<td>DL</td>
<td>EN206</td>
<td>15,400</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Faro</td>
<td>Loulé</td>
<td>DL</td>
<td>Rua Humberto Pacheco</td>
<td>-</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>2</td>
<td>1</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Porto</td>
<td>Amarante</td>
<td>DL</td>
<td>Rua Ferreiro</td>
<td>-</td>
<td>Município Amarante</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Aveiro</td>
<td>Santa Maria da Feira</td>
<td>DL</td>
<td>Rua Nossa Senhora de Fátima</td>
<td>-</td>
<td>Município Santa Maria da Feira</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Despiste</td>
<td>AE</td>
<td>Guarda</td>
<td>Almeida</td>
<td>FLoc</td>
<td>A25</td>
<td>180,800</td>
<td>Ascendi (Beira Litoral e Alta)</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Vila Real</td>
<td>Santa Marta de Penaguião</td>
<td>DL</td>
<td>Rua Torno</td>
<td>-</td>
<td>Município Santa Marta de Penaguião</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Viana do Castelo</td>
<td>Viana do Castelo</td>
<td>DL</td>
<td>Rua Alvarães</td>
<td>-</td>
<td>Município Viana do Castelo</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>AE</td>
<td>Coimbra</td>
<td>Montemor-o-Velho</td>
<td>FLoc</td>
<td>A14</td>
<td>21,850</td>
<td>Brisa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>IC</td>
<td>Beja</td>
<td>Ourique</td>
<td>FLoc</td>
<td>IC1</td>
<td>692,100</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>3</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Vila Real</td>
<td>Santa Marta de Penaguião</td>
<td>DL</td>
<td>Rua Encambalados/Avenida Novo Horizonte</td>
<td>-</td>
<td>Município Santa Marta de Penaguião</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>2</td>
<td>Colisão</td>
<td>AE</td>
<td>Coimbra</td>
<td>Coimbra</td>
<td>FLoc</td>
<td>A1</td>
<td>198,929</td>
<td>Brisa</td>
</tr>
<tr>
<td>1</td>
<td>2</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Setúbal</td>
<td>Grândola</td>
<td>FLoc</td>
<td>EN261-1</td>
<td>8,500</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Vila Real</td>
<td>Montalegre</td>
<td>FLoc</td>
<td>EN103</td>
<td>99,600</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>AE</td>
<td>Coimbra</td>
<td>Coimbra</td>
<td>FLoc</td>
<td>A1</td>
<td>192,700</td>
<td>Brisa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Atropelamento</td>
<td>IC</td>
<td>Leiria</td>
<td>Pombal</td>
<td>DL</td>
<td>IC8</td>
<td>48,720</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Coimbra</td>
<td>Cantanhede</td>
<td>FLoc</td>
<td>EN234</td>
<td>14,350</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Porto</td>
<td>Póvoa de Varzim</td>
<td>DL</td>
<td>EN13</td>
<td>4,900</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Odivelas</td>
<td>DL</td>
<td>Avenida Dom Dinis</td>
<td>-</td>
<td>Município Odivelas</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Viana do Castelo</td>
<td>Ponte de Lima</td>
<td>DL</td>
<td>EN201</td>
<td>47,250</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>EN</td>
<td>Lisboa</td>
<td>Mafra</td>
<td>FLoc</td>
<td>EN247</td>
<td>40,700</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>4</td>
<td>Colisão</td>
<td>EN</td>
<td>Setúbal</td>
<td>Palmela</td>
<td>FLoc</td>
<td>EN4</td>
<td>29,900</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>ARRM</td>
<td>Setúbal</td>
<td>Grândola</td>
<td>DL</td>
<td>Rua Aroeira</td>
<td>-</td>
<td>Município Grândola</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Porto</td>
<td>Gondomar</td>
<td>FLoc</td>
<td>EN108</td>
<td>14,250</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>ARRM</td>
<td>Aveiro</td>
<td>Ílhavo</td>
<td>DL</td>
<td>Rua Forte da Barra</td>
<td>-</td>
<td>Município Ílhavo</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Aveiro</td>
<td>Anadia</td>
<td>FLoc</td>
<td>EN1</td>
<td>218,400</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>2</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Santarém</td>
<td>Benavente</td>
<td>FLoc</td>
<td>EN118</td>
<td>11,230</td>
<td>Município Benavente</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Lisboa</td>
<td>DL</td>
<td>Rua Alto do Chapeleiro</td>
<td>-</td>
<td>Município Lisboa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Faro</td>
<td>Portimão</td>
<td>FLoc</td>
<td>EN125</td>
<td>39,010</td>
<td>IP (Algarve Litoral)</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>AE</td>
<td>Viseu</td>
<td>Oliveira de Frades</td>
<td>FLoc</td>
<td>A25</td>
<td>50,600</td>
<td>Ascendi (Beira Litoral e Alta)</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Santarém</td>
<td>Rio Maior</td>
<td>DL</td>
<td>Rua Marcelino Gadeiro</td>
<td>-</td>
<td>Município Rio Maior</td>
</tr>
<tr>
<td>1</td>
<td>2</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Castelo Branco</td>
<td>Castelo Branco</td>
<td>FLoc</td>
<td>EN233</td>
<td>87,900</td>
<td>Município Castelo Branco</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Loures</td>
<td>DL</td>
<td>Rua Luís de Camões</td>
<td>-</td>
<td>Município Loures</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Lisboa</td>
<td>DL</td>
<td>Alameda Linhas de Torres</td>
<td>-</td>
<td>Município Lisboa</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Faro</td>
<td>Tavira</td>
<td>FLoc</td>
<td>EN125</td>
<td>130,100</td>
<td>IP (Algarve Litoral)</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EM</td>
<td>Viseu</td>
<td>Castro Daire</td>
<td>DL</td>
<td>EM1155</td>
<td>1,000</td>
<td>Município Castro Daire</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Leiria</td>
<td>Ansião</td>
<td>DL</td>
<td>Rua Senhora da Saúde</td>
<td>-</td>
<td>Município Ansião</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Lisboa</td>
<td>Mafra</td>
<td>DL</td>
<td>EN116</td>
<td>5,507</td>
<td>Município Mafra</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Aveiro</td>
<td>Santa Maria da Feira</td>
<td>DL</td>
<td>Avenida Liberdade</td>
<td>-</td>
<td>Município Santa Maria da Feira</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Braga</td>
<td>Braga</td>
<td>DL</td>
<td>EN14</td>
<td>39,149</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Porto</td>
<td>Matosinhos</td>
<td>DL</td>
<td>Avenida Dom Afonso Henriques</td>
<td>-</td>
<td>Município Matosinhos</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>VAR</td>
<td>Viana do Castelo</td>
<td>Caminha</td>
<td>FLoc</td>
<td>VAR-Acesso A28</td>
<td>1,875</td>
<td>Concessão Norte Litoral</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>AE</td>
<td>Beja</td>
<td>Ourique</td>
<td>FLoc</td>
<td>A2</td>
<td>185,650</td>
<td>Brisa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Guarda</td>
<td>Seia</td>
<td>DL</td>
<td>Rua Artur Costa</td>
<td>-</td>
<td>Município Seia</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>EN</td>
<td>Setúbal</td>
<td>Palmela</td>
<td>FLoc</td>
<td>EN10</td>
<td>59,400</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Évora</td>
<td>Montemor-o-Novo</td>
<td>FLoc</td>
<td>EN253</td>
<td>58,876</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>0</td>
<td>Colisão</td>
<td>AE</td>
<td>Coimbra</td>
<td>Penela</td>
<td>FLoc</td>
<td>A13</td>
<td>180,470</td>
<td>IP (Pinhal Interior)</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Porto</td>
<td>Marco de Canaveses</td>
<td>DL</td>
<td>Rua Tapados</td>
<td>-</td>
<td>Município Marco de Canaveses</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Leiria</td>
<td>Leiria</td>
<td>DL</td>
<td>Rua Tenente Coronel Joaquim Duarte Alves</td>
<td>-</td>
<td>Município Leiria</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Aveiro</td>
<td>Oliveira de Azeméis</td>
<td>DL</td>
<td>Rua Vale da Igreja</td>
<td>-</td>
<td>Município Oliveira de Azeméis</td>
</tr>
<tr>
<td>2</td>
<td>1</td>
<td>3</td>
<td>Colisão</td>
<td>IP</td>
<td>Viseu</td>
<td>Santa Comba Dão</td>
<td>FLoc</td>
<td>IP3</td>
<td>86,654</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>AE</td>
<td>Lisboa</td>
<td>Torres Vedras</td>
<td>FLoc</td>
<td>A8</td>
<td>36,500</td>
<td>Concessão Oeste</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>Outra Via</td>
<td>Lisboa</td>
<td>Cadaval</td>
<td>FLoc</td>
<td>Estrada Montejunto</td>
<td>-</td>
<td>Município Cadaval</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>IC</td>
<td>Aveiro</td>
<td>Oliveira de Azeméis</td>
<td>FLoc</td>
<td>IC2</td>
<td>256,800</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>EN</td>
<td>Porto</td>
<td>Paredes</td>
<td>FLoc</td>
<td>EN209</td>
<td>23,600</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>2</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>AE</td>
<td>Bragança</td>
<td>Mirandela</td>
<td>FLoc</td>
<td>A4</td>
<td>157,045</td>
<td>IP (AE Transmontana)</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Porto</td>
<td>Valongo</td>
<td>DL</td>
<td>Avenida Doutor Francisco Sá Carneiro</td>
<td>-</td>
<td>Município Valongo</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Viseu</td>
<td>Vila Nova de Paiva</td>
<td>FLoc</td>
<td>EN329</td>
<td>5,000</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>EN</td>
<td>Lisboa</td>
<td>Alenquer</td>
<td>FLoc</td>
<td>EN1</td>
<td>45,500</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>6</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>IP</td>
<td>Beja</td>
<td>Castro Verde</td>
<td>FLoc</td>
<td>IP2</td>
<td>387,500</td>
<td>IP (Baixo Alentejo)</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EM</td>
<td>Coimbra</td>
<td>Figueira da Foz</td>
<td>DL</td>
<td>EM1056</td>
<td>18,000</td>
<td>Município Figueira da Foz</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>EM</td>
<td>Bragança</td>
<td>Bragança</td>
<td>FLoc</td>
<td>EM518</td>
<td>-</td>
<td>Município Bragança</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>VAR</td>
<td>Setúbal</td>
<td>Almada</td>
<td>FLoc</td>
<td>VAR-Trafaria</td>
<td>0,870</td>
<td>Município Almada</td>
</tr>
<tr>
<td>1</td>
<td>2</td>
<td>6</td>
<td>Colisão</td>
<td>EN</td>
<td>Setúbal</td>
<td>Palmela</td>
<td>FLoc</td>
<td>EN4</td>
<td>28,000</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Évora</td>
<td>Arraiolos</td>
<td>FLoc</td>
<td>EN4</td>
<td>109,348</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Leiria</td>
<td>Marinha Grande</td>
<td>DL</td>
<td>EN242</td>
<td>15,100</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>EN</td>
<td>Setúbal</td>
<td>Seixal</td>
<td>FLoc</td>
<td>EN378</td>
<td>5,630</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Aveiro</td>
<td>Vale de Cambra</td>
<td>DL</td>
<td>Rua Relva</td>
<td>-</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Leiria</td>
<td>Leiria</td>
<td>DL</td>
<td>Estrada da Pedreira</td>
<td>-</td>
<td>Município Leiria</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EM</td>
<td>Bragança</td>
<td>Macedo de Cavaleiros</td>
<td>FLoc</td>
<td>EM553</td>
<td>2,300</td>
<td>Município Macedo de Cavaleiros</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Coimbra</td>
<td>Lousã</td>
<td>FLoc</td>
<td>EN342</td>
<td>58,190</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Portalegre</td>
<td>Ponte de Sor</td>
<td>FLoc</td>
<td>EN2</td>
<td>442,500</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>2</td>
<td>3</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Porto</td>
<td>Maia</td>
<td>FLoc</td>
<td>EN14</td>
<td>7,400</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>Outra Via</td>
<td>Portalegre</td>
<td>Sousel</td>
<td>FLoc</td>
<td>Caminho Municipal 507</td>
<td>-</td>
<td>Município Sousel</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ER</td>
<td>Beja</td>
<td>Mértola</td>
<td>FLoc</td>
<td>ER265</td>
<td>57,700</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Leiria</td>
<td>Alcobaça</td>
<td>DL</td>
<td>Rua Moinho</td>
<td>-</td>
<td>Município Alcobaça</td>
</tr>
<tr>
<td>1</td>
<td>2</td>
<td>2</td>
<td>Despiste</td>
<td>EM</td>
<td>Setúbal</td>
<td>Palmela</td>
<td>DL</td>
<td>EM1029</td>
<td>-</td>
<td>Município Palmela</td>
</tr>
<tr>
<td>1</td>
<td>2</td>
<td>0</td>
<td>Colisão</td>
<td>Outra Via</td>
<td>Ilha de São Miguel</td>
<td>Lagoa (São Miguel)</td>
<td>FLoc</td>
<td>Eixo Sul</td>
<td>21,416</td>
<td>R. A. Açores</td>
</tr>
<tr>
<td>1</td>
<td>2</td>
<td>2</td>
<td>Despiste</td>
<td>EM</td>
<td>Castelo Branco</td>
<td>Covilhã</td>
<td>FLoc</td>
<td>EM512</td>
<td>-</td>
<td>Município Covilhã</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>Outra Via</td>
<td>Faro</td>
<td>Faro</td>
<td>FLoc</td>
<td>Estrada Azinheiro</td>
<td>-</td>
<td>Município Faro</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Loures</td>
<td>DL</td>
<td>Rua Bombeiros Voluntários de Camarate</td>
<td>-</td>
<td>Município Loures</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>IC</td>
<td>Faro</td>
<td>Silves</td>
<td>FLoc</td>
<td>IC1</td>
<td>727,500</td>
<td>IP (Algarve Litoral)</td>
</tr>
<tr>
<td>1</td>
<td>2</td>
<td>1</td>
<td>Colisão</td>
<td>EN</td>
<td>Santarém</td>
<td>Benavente</td>
<td>FLoc</td>
<td>EN118</td>
<td>37,700</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Porto</td>
<td>Baião</td>
<td>DL</td>
<td>Rua FC. Pais do Amaral</td>
<td>-</td>
<td>Município Baião</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Aveiro</td>
<td>Estarreja</td>
<td>DL</td>
<td>EN109</td>
<td>43,830</td>
<td>Município Estarreja</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>11</td>
<td>Colisão</td>
<td>IP</td>
<td>Viseu</td>
<td>Tondela</td>
<td>FLoc</td>
<td>IP3</td>
<td>106,797</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Castelo Branco</td>
<td>Vila de Rei</td>
<td>FLoc</td>
<td>EN2</td>
<td>361,700</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Leiria</td>
<td>Castanheira de Pêra</td>
<td>DL</td>
<td>Rua Além da Ribeira</td>
<td>-</td>
<td>Município Castanheira de Pêra</td>
</tr>
<tr>
<td>5</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Faro</td>
<td>Monchique</td>
<td>DL</td>
<td>EN266</td>
<td>51,500</td>
<td>IP (Algarve Litoral)</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>1</td>
<td>Colisão</td>
<td>AE</td>
<td>Porto</td>
<td>Amarante</td>
<td>FLoc</td>
<td>A4</td>
<td>70,340</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Setúbal</td>
<td>Almada</td>
<td>DL</td>
<td>Rua 3 Vales</td>
<td>-</td>
<td>Município Almada</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>AE</td>
<td>Setúbal</td>
<td>Seixal</td>
<td>FLoc</td>
<td>A33</td>
<td>14,300</td>
<td>IP (Baixo Tejo)</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Braga</td>
<td>Vieira do Minho</td>
<td>DL</td>
<td>Rua Nossa Senhora da Saúde</td>
<td>-</td>
<td>Município Vieira do Minho</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Lisboa</td>
<td>Sobral de Monte Agraço</td>
<td>FLoc</td>
<td>EN248</td>
<td>15,430</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>EN</td>
<td>Lisboa</td>
<td>Azambuja</td>
<td>FLoc</td>
<td>EN3</td>
<td>13,300</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>ARRM</td>
<td>Porto</td>
<td>Paredes</td>
<td>DL</td>
<td>Rua Doutor José Correia</td>
<td>-</td>
<td>Município Paredes</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>1</td>
<td>Colisão</td>
<td>AE</td>
<td>Bragança</td>
<td>Bragança</td>
<td>FLoc</td>
<td>A4</td>
<td>214,882</td>
<td>IP (AE Transmontana)</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EM</td>
<td>Faro</td>
<td>Faro</td>
<td>FLoc</td>
<td>EM520-2</td>
<td>-</td>
<td>Município Faro</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Coimbra</td>
<td>Cantanhede</td>
<td>FLoc</td>
<td>EN335</td>
<td>26,125</td>
<td>Município Cantanhede</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>Outra Via</td>
<td>Ilha da Madeira</td>
<td>Câmara de Lobos</td>
<td>FLoc</td>
<td>VR1 - Sentido Ribeira Brava - Funchal 9,1</td>
<td>9,100</td>
<td>R. A. Madeira</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Faro</td>
<td>Silves</td>
<td>DL</td>
<td>EN269</td>
<td>15,950</td>
<td>Município Silves</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Ilha Terceira</td>
<td>Angra do Heroísmo</td>
<td>DL</td>
<td>Guerrilhas</td>
<td>-</td>
<td>R. A. Açores</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Coimbra</td>
<td>Oliveira do Hospital</td>
<td>DL</td>
<td>EN230</td>
<td>122,100</td>
<td>Município Oliveira do Hospital</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>EN</td>
<td>Setúbal</td>
<td>Setúbal</td>
<td>DL</td>
<td>EN10</td>
<td>27,230</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Lisboa</td>
<td>Sobral de Monte Agraço</td>
<td>FLoc</td>
<td>EN374</td>
<td>20,100</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EM</td>
<td>Coimbra</td>
<td>Miranda do Corvo</td>
<td>DL</td>
<td>EM556</td>
<td>-</td>
<td>Município Miranda do Corvo</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>2</td>
<td>Colisão</td>
<td>EN</td>
<td>Évora</td>
<td>Mora</td>
<td>FLoc</td>
<td>EN2</td>
<td>474,900</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>1</td>
<td>Colisão</td>
<td>EN</td>
<td>Porto</td>
<td>Póvoa de Varzim</td>
<td>FLoc</td>
<td>EN13</td>
<td>35,200</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Setúbal</td>
<td>Setúbal</td>
<td>DL</td>
<td>Avenida Bela Vista</td>
<td>-</td>
<td>Município Setúbal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>ARRM</td>
<td>Portalegre</td>
<td>Portalegre</td>
<td>DL</td>
<td>Rua Ribeiro do Baco de Baixo</td>
<td>-</td>
<td>Município Portalegre</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>2</td>
<td>Colisão</td>
<td>AE</td>
<td>Lisboa</td>
<td>Sintra</td>
<td>FLoc</td>
<td>A16</td>
<td>20,100</td>
<td>Ascendi (Grande Lisboa)</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>0</td>
<td>Despiste</td>
<td>AE</td>
<td>Aveiro</td>
<td>Albergaria-a-Velha</td>
<td>FLoc</td>
<td>A1</td>
<td>248,300</td>
<td>Brisa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Torres Vedras</td>
<td>DL</td>
<td>Rua Carpinteiros</td>
<td>-</td>
<td>Município Torres Vedras</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Despiste</td>
<td>EM</td>
<td>Bragança</td>
<td>Mogadouro</td>
<td>FLoc</td>
<td>EM596</td>
<td>-</td>
<td>Município Mogadouro</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Aveiro</td>
<td>Ovar</td>
<td>DL</td>
<td>Estrada São João</td>
<td>-</td>
<td>Município Ovar</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Lisboa</td>
<td>DL</td>
<td>Rua Snu Abecassis</td>
<td>-</td>
<td>Município Lisboa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Bragança</td>
<td>Macedo de Cavaleiros</td>
<td>DL</td>
<td>Rua Cemitério</td>
<td>-</td>
<td>Município Macedo de Cavaleiros</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>AE</td>
<td>Viseu</td>
<td>Lamego</td>
<td>FLoc</td>
<td>A24</td>
<td>111,900</td>
<td>Interior Norte (NorScut)</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>ARRM</td>
<td>Setúbal</td>
<td>Setúbal</td>
<td>DL</td>
<td>Avenida Júlio Santos</td>
<td>-</td>
<td>Município Setúbal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Vila Franca de Xira</td>
<td>DL</td>
<td>Estrada Camarão</td>
<td>-</td>
<td>Município Vila Franca de Xira</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Braga</td>
<td>Celorico de Basto</td>
<td>DL</td>
<td>EN210</td>
<td>12,910</td>
<td>Município Celorico de Basto</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Coimbra</td>
<td>Miranda do Corvo</td>
<td>DL</td>
<td>Rua Fontainhas</td>
<td>-</td>
<td>Município Miranda do Corvo</td>
</tr>
<tr>
<td>2</td>
<td>2</td>
<td>0</td>
<td>Colisão</td>
<td>IC</td>
<td>Coimbra</td>
<td>Soure</td>
<td>DL</td>
<td>IC2</td>
<td>164,300</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ER</td>
<td>Portalegre</td>
<td>Monforte</td>
<td>FLoc</td>
<td>ER243</td>
<td>169,000</td>
<td>Município Monforte</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>EN</td>
<td>Guarda</td>
<td>Vila Nova de Foz Côa</td>
<td>DL</td>
<td>EN222</td>
<td>190,577</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EM</td>
<td>Vila Real</td>
<td>Mondim de Basto</td>
<td>FLoc</td>
<td>EM561</td>
<td>-</td>
<td>Município Mondim de Basto</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>AE</td>
<td>Setúbal</td>
<td>Palmela</td>
<td>FLoc</td>
<td>A2</td>
<td>53,400</td>
<td>Brisa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Setúbal</td>
<td>Santiago do Cacém</td>
<td>DL</td>
<td>EN120</td>
<td>77,400</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Aveiro</td>
<td>Vagos</td>
<td>DL</td>
<td>EN109</td>
<td>67,100</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Faro</td>
<td>Albufeira</td>
<td>DL</td>
<td>Avenida Descobrimentos</td>
<td>-</td>
<td>Município Albufeira</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Santarém</td>
<td>Abrantes</td>
<td>DL</td>
<td>Rua Muros Brancos</td>
<td>-</td>
<td>Município Abrantes</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Setúbal</td>
<td>Seixal</td>
<td>DL</td>
<td>Avenida 10 de Junho</td>
<td>-</td>
<td>Outra</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>ER</td>
<td>Portalegre</td>
<td>Campo Maior</td>
<td>FLoc</td>
<td>ER371</td>
<td>0,400</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Torres Vedras</td>
<td>DL</td>
<td>Rua Moinho de Vento</td>
<td>-</td>
<td>Município Torres Vedras</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>1</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Lisboa</td>
<td>DL</td>
<td>Avenida Berlim</td>
<td>-</td>
<td>Município Lisboa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Faro</td>
<td>Lagoa</td>
<td>FLoc</td>
<td>EN124-1</td>
<td>9,605</td>
<td>Município Lagoa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Oeiras</td>
<td>DL</td>
<td>Avenida Ivens</td>
<td>-</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Leiria</td>
<td>Batalha</td>
<td>DL</td>
<td>Rua Nossa Senhora da Boa Viagem</td>
<td>-</td>
<td>Município Batalha</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>ARRM</td>
<td>Porto</td>
<td>Porto</td>
<td>DL</td>
<td>Rua Júlio Dinis</td>
<td>-</td>
<td>Município Porto</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>3</td>
<td>Colisão</td>
<td>EN</td>
<td>Braga</td>
<td>Vila Nova de Famalicão</td>
<td>DL</td>
<td>EN206</td>
<td>29,000</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Coimbra</td>
<td>Arganil</td>
<td>FLoc</td>
<td>EN342-4</td>
<td>5,190</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>EN</td>
<td>Braga</td>
<td>Vila Nova de Famalicão</td>
<td>DL</td>
<td>EN206</td>
<td>29,379</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>EN</td>
<td>Porto</td>
<td>Penafiel</td>
<td>DL</td>
<td>EN106</td>
<td>34,200</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Braga</td>
<td>Barcelos</td>
<td>DL</td>
<td>Travessa Santo António</td>
<td>-</td>
<td>Município Barcelos</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>AE</td>
<td>Bragança</td>
<td>Mirandela</td>
<td>FLoc</td>
<td>A4</td>
<td>133,725</td>
<td>IP (AE Transmontana)</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Vila Real</td>
<td>Vila Pouca de Aguiar</td>
<td>DL</td>
<td>Rua Comendador Francisco Pereira</td>
<td>-</td>
<td>Município Vila Pouca de Aguiar</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Aveiro</td>
<td>Sever do Vouga</td>
<td>FLoc</td>
<td>EN333</td>
<td>35,250</td>
<td>Município Sever do Vouga</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Lisboa</td>
<td>Cascais</td>
<td>DL</td>
<td>EN6</td>
<td>14,800</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>IC</td>
<td>Faro</td>
<td>Castro Marim</td>
<td>FLoc</td>
<td>IC27</td>
<td>4,700</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Despiste</td>
<td>EM</td>
<td>Beja</td>
<td>Ferreira do Alentejo</td>
<td>FLoc</td>
<td>-</td>
<td>-</td>
<td>Município Ferreira do Alentejo</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>3</td>
<td>Colisão</td>
<td>EN</td>
<td>Vila Real</td>
<td>Chaves</td>
<td>DL</td>
<td>EN213</td>
<td>6,344</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Porto</td>
<td>Vila Nova de Gaia</td>
<td>DL</td>
<td>Rua Coteiro</td>
<td>-</td>
<td>Município Vila Nova de Gaia</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EF</td>
<td>Évora</td>
<td>Redondo</td>
<td>FLoc</td>
<td>-</td>
<td>-</td>
<td>Município Redondo</td>
</tr>
<tr>
<td>2</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ER</td>
<td>Santarém</td>
<td>Rio Maior</td>
<td>DL</td>
<td>ER361</td>
<td>46,769</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>AE</td>
<td>Porto</td>
<td>Penafiel</td>
<td>FLoc</td>
<td>A4</td>
<td>42,940</td>
<td>Brisa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EM</td>
<td>Faro</td>
<td>Silves</td>
<td>DL</td>
<td>EM1153</td>
<td>-</td>
<td>Município Silves</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Lisboa</td>
<td>DL</td>
<td>Rua Mariano Pina</td>
<td>-</td>
<td>Município Lisboa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>EN</td>
<td>Viseu</td>
<td>Sátão</td>
<td>FLoc</td>
<td>EN329</td>
<td>39,400</td>
<td>Município Sátão</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Atropelamento</td>
<td>ARRM</td>
<td>Viseu</td>
<td>Mangualde</td>
<td>DL</td>
<td>Rua Doutor Almeida</td>
<td>-</td>
<td>Município Mangualde</td>
</tr>
<tr>
<td>1</td>
<td>3</td>
<td>0</td>
<td>Despiste</td>
<td>Outra Via</td>
<td>Beja</td>
<td>Ferreira do Alentejo</td>
<td>FLoc</td>
<td>Caminho Agricola 3, Km 2.7 (Caminho do Vale da Rosa)</td>
<td>-</td>
<td>Município Ferreira do Alentejo</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>0</td>
<td>Despiste</td>
<td>EM</td>
<td>Vila Real</td>
<td>Valpaços</td>
<td>FLoc</td>
<td>EM541</td>
<td>-</td>
<td>Município Valpaços</td>
</tr>
<tr>
<td>1</td>
<td>4</td>
<td>2</td>
<td>Colisão</td>
<td>EN</td>
<td>Évora</td>
<td>Évora</td>
<td>FLoc</td>
<td>EN256</td>
<td>3,536</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>EN</td>
<td>Setúbal</td>
<td>Montijo</td>
<td>FLoc</td>
<td>EN4</td>
<td>37,800</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Braga</td>
<td>Vila Nova de Famalicão</td>
<td>DL</td>
<td>EN206</td>
<td>29,625</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Viseu</td>
<td>Resende</td>
<td>DL</td>
<td>Rua Nossa Senhora da Guia</td>
<td>-</td>
<td>Município Resende</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Coimbra</td>
<td>Coimbra</td>
<td>DL</td>
<td>Rua Adriano Lucas</td>
<td>-</td>
<td>Município Coimbra</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ER</td>
<td>Ilha Terceira</td>
<td>Angra do Heroísmo</td>
<td>DL</td>
<td>ER1ª 1ª</td>
<td>11,000</td>
<td>R. A. Açores</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>ARRM</td>
<td>Viseu</td>
<td>Sátão</td>
<td>DL</td>
<td>Avenida Principal</td>
<td>-</td>
<td>Município Sátão</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Despiste</td>
<td>EM</td>
<td>Faro</td>
<td>Monchique</td>
<td>FLoc</td>
<td>EM501</td>
<td>-</td>
<td>Município Monchique</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Leiria</td>
<td>Porto de Mós</td>
<td>DL</td>
<td>Rua Principal</td>
<td>-</td>
<td>Município Porto de Mós</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Beja</td>
<td>Ferreira do Alentejo</td>
<td>FLoc</td>
<td>EN257</td>
<td>44,000</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>2</td>
<td>2</td>
<td>2</td>
<td>Colisão</td>
<td>AE</td>
<td>Vila Real</td>
<td>Chaves</td>
<td>FLoc</td>
<td>A24</td>
<td>24,100</td>
<td>Interior Norte (NorScut)</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>IC</td>
<td>Lisboa</td>
<td>Odivelas</td>
<td>FLoc</td>
<td>IC17</td>
<td>15,300</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>6</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Lisboa</td>
<td>DL</td>
<td>Avenida Forças Armadas</td>
<td>-</td>
<td>Município Lisboa</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>1</td>
<td>Colisão</td>
<td>AE</td>
<td>Braga</td>
<td>Barcelos</td>
<td>FLoc</td>
<td>A11</td>
<td>13,600</td>
<td>Ascendi (Norte)</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Bragança</td>
<td>Mogadouro</td>
<td>DL</td>
<td>Rua Malhada</td>
<td>-</td>
<td>Município Mogadouro</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>IC</td>
<td>Setúbal</td>
<td>Alcácer do Sal</td>
<td>FLoc</td>
<td>IC1</td>
<td>567,838</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Évora</td>
<td>Estremoz</td>
<td>FLoc</td>
<td>EN4</td>
<td>144,553</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>ARRM</td>
<td>Aveiro</td>
<td>Ovar</td>
<td>DL</td>
<td>Rua Alexandre Sá Pinto</td>
<td>-</td>
<td>Município Ovar</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Porto</td>
<td>Paredes</td>
<td>DL</td>
<td>Avenida São Sebastião</td>
<td>-</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Castelo Branco</td>
<td>Idanha-a-Nova</td>
<td>FLoc</td>
<td>EN233</td>
<td>84,600</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EM</td>
<td>Faro</td>
<td>Loulé</td>
<td>DL</td>
<td>EM1181</td>
<td>-</td>
<td>Município Loulé</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>EN</td>
<td>Viana do Castelo</td>
<td>Viana do Castelo</td>
<td>DL</td>
<td>EN308</td>
<td>4,850</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>ARRM</td>
<td>Porto</td>
<td>Porto</td>
<td>DL</td>
<td>Rua Campo Alegre</td>
<td>-</td>
<td>Município Porto</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Atropelamento</td>
<td>ARRM</td>
<td>Porto</td>
<td>Vila Nova de Gaia</td>
<td>DL</td>
<td>Avenida Beira Mar</td>
<td>-</td>
<td>Município Vila Nova de Gaia</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Porto</td>
<td>Lousada</td>
<td>DL</td>
<td>Rua Pinheirinhos</td>
<td>-</td>
<td>Município Lousada</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>ARRM</td>
<td>Viana do Castelo</td>
<td>Ponte de Lima</td>
<td>DL</td>
<td>Rua Lamezinhos</td>
<td>-</td>
<td>Município Ponte de Lima</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>4</td>
<td>Colisão</td>
<td>EM</td>
<td>Setúbal</td>
<td>Sines</td>
<td>FLoc</td>
<td>EM554</td>
<td>3,100</td>
<td>Município Sines</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>IC</td>
<td>Setúbal</td>
<td>Grândola</td>
<td>FLoc</td>
<td>IC1</td>
<td>608,545</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>EN</td>
<td>Lisboa</td>
<td>Alenquer</td>
<td>DL</td>
<td>EN1</td>
<td>46,150</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>EN</td>
<td>Viana do Castelo</td>
<td>Valença</td>
<td>DL</td>
<td>EN101</td>
<td>2,950</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>AE</td>
<td>Porto</td>
<td>Póvoa de Varzim</td>
<td>FLoc</td>
<td>A28</td>
<td>34,380</td>
<td>Concessão Norte Litoral</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Loures</td>
<td>DL</td>
<td>Avenida Nicolau Breyner</td>
<td>-</td>
<td>Município Loures</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>AE</td>
<td>Santarém</td>
<td>Santarém</td>
<td>FLoc</td>
<td>A1</td>
<td>63,100</td>
<td>Brisa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>AE</td>
<td>Aveiro</td>
<td>Sever do Vouga</td>
<td>FLoc</td>
<td>A25</td>
<td>43,850</td>
<td>Ascendi (Beira Litoral e Alta)</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Leiria</td>
<td>Pedrógão Grande</td>
<td>DL</td>
<td>Rua Cemitério</td>
<td>-</td>
<td>Município Pedrógão Grande</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Portalegre</td>
<td>Avis</td>
<td>FLoc</td>
<td>EN244</td>
<td>104,900</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Vila Real</td>
<td>Montalegre</td>
<td>FLoc</td>
<td>EN103</td>
<td>133,100</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>2</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Santarém</td>
<td>Almeirim</td>
<td>FLoc</td>
<td>EN114</td>
<td>87,585</td>
<td>Município Almeirim</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>3</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Aveiro</td>
<td>Ovar</td>
<td>DL</td>
<td>Rua do Sobral</td>
<td>-</td>
<td>Município Ovar</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>EN</td>
<td>Lisboa</td>
<td>Torres Vedras</td>
<td>FLoc</td>
<td>EN9</td>
<td>72,900</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Santarém</td>
<td>Sardoal</td>
<td>FLoc</td>
<td>EN2</td>
<td>387,200</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Santarém</td>
<td>Coruche</td>
<td>FLoc</td>
<td>EN251</td>
<td>56,874</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Beja</td>
<td>Ourique</td>
<td>FLoc</td>
<td>EN123</td>
<td>51,000</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>IC</td>
<td>Leiria</td>
<td>Porto de Mós</td>
<td>FLoc</td>
<td>IC2</td>
<td>101,100</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Aveiro</td>
<td>Oliveira do Bairro</td>
<td>DL</td>
<td>Rua Conde Ferreira</td>
<td>-</td>
<td>Município Oliveira do Bairro</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>EN</td>
<td>Porto</td>
<td>Lousada</td>
<td>DL</td>
<td>EN106</td>
<td>20,700</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>IC</td>
<td>Leiria</td>
<td>Alcobaça</td>
<td>DL</td>
<td>IC2</td>
<td>95,350</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Amadora</td>
<td>DL</td>
<td>Avenida Columbano Bordalo Pinheiro</td>
<td>-</td>
<td>Município Amadora</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Porto</td>
<td>Marco de Canaveses</td>
<td>DL</td>
<td>Rua São João</td>
<td>-</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Braga</td>
<td>Fafe</td>
<td>DL</td>
<td>Rua Calvelos</td>
<td>-</td>
<td>Município Fafe</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>AE</td>
<td>Santarém</td>
<td>Alcanena</td>
<td>FLoc</td>
<td>A1</td>
<td>104,300</td>
<td>Brisa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Lisboa</td>
<td>Torres Vedras</td>
<td>FLoc</td>
<td>EN9</td>
<td>63,400</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Colisão</td>
<td>EN</td>
<td>Porto</td>
<td>Felgueiras</td>
<td>DL</td>
<td>EN15</td>
<td>49,632</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>0</td>
<td>Colisão</td>
<td>ARRM</td>
<td>Porto</td>
<td>Vila Nova de Gaia</td>
<td>DL</td>
<td>Avenida Almirante Gago Coutinho com Travessa Moutadas</td>
<td>-</td>
<td>Município Vila Nova de Gaia</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>1</td>
<td>Despiste</td>
<td>EN</td>
<td>Coimbra</td>
<td>Montemor-o-Velho</td>
<td>DL</td>
<td>EN111</td>
<td>25,050</td>
<td>Município Montemor-o-Velho</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Lisboa</td>
<td>DL</td>
<td>Rua República da Bolívia</td>
<td>-</td>
<td>Município Lisboa</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Aveiro</td>
<td>Águeda</td>
<td>DL</td>
<td>EN230</td>
<td>25,700</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>4</td>
<td>0</td>
<td>Despiste</td>
<td>EN</td>
<td>Beja</td>
<td>Moura</td>
<td>FLoc</td>
<td>EN255-1</td>
<td>19,500</td>
<td>Infraestruturas de Portugal</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Despiste</td>
<td>ARRM</td>
<td>Aveiro</td>
<td>Castelo de Paiva</td>
<td>DL</td>
<td>Rua Doutor Ribeiro Chaves</td>
<td>-</td>
<td>Município Castelo de Paiva</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>EM</td>
<td>Lisboa</td>
<td>Mafra</td>
<td>DL</td>
<td>EM1205</td>
<td>7,000</td>
<td>Município Mafra</td>
</tr>
<tr>
<td>1</td>
<td>0</td>
<td>0</td>
<td>Atropelamento</td>
<td>ARRM</td>
<td>Lisboa</td>
<td>Sintra</td>
<td>DL</td>
<td>Avenida 25 de Abril</td>
<td>-</td>
<td>Município Sintra</td>
</tr>
</tbody>
</table></div>
`
  },

]);
