const cheerio = require('cheerio');
const { JSDOM } = require("jsdom");

function extractHierarchicalText3(html){
  const $ = cheerio.load(html);
  return $('body').text().trim().replaceAll("  ");
}


// function normalizeText(text) {
//   return text.replace(/\s+/g, " ").trim(); // Remove múltiplos espaços e quebras de linha
// }

// function getIndentedText2(node, depth = 0) {
//   let text = "";
//   let inlineText = "";

//   node.childNodes.forEach((child) => {
//     if (child.nodeType === 3) {
//       // Nó de texto
//       const cleanedText = normalizeText(child.textContent);
//       if (cleanedText) {
//         inlineText += (inlineText ? " " : "") + cleanedText; // Junta os textos sem quebra de linha
//       }
//     } else if (child.nodeType === 1) {
//       // Nó de elemento
//       if (inlineText) {
//         text += "  ".repeat(depth) + inlineText + "\n";
//         inlineText = "";
//       }
//       text += getIndentedText(child, depth + 1);
//     }
//   });

//   if (inlineText) {
//     text += "  ".repeat(depth) + inlineText + "\n";
//   }

//   return text;
// }


function getIndentedText(node, depth = 0) {
    let text = "";

    node.childNodes.forEach(child => {
        if (child.nodeType === 3) { // Nó de texto
            const trimmed = child.textContent.replace(/\s+/g, " ").trim();
            if (trimmed) {
                text += "  ".repeat(depth) + trimmed + "\n";
            }
        } else if (child.nodeType === 1) { // Nó de elemento
            text += getIndentedText(child, depth + 1);
        }
    });

    return text;
}



// Exemplo de uso com o mesmo HTML:
const html = `
<html
  lang="pt-br"
  class="glb-feat-feed-highlights--smaller glb-theme-shape--rounded glb-theme--force-style-posts glb-theme-feat-border--curve has-not-regua has-search"
>
  <body
    data-generated-at="25-03-2025 18:22:41"
    data-request-id="1711f41a-b1d8-4c65-8e7f-e93cd2f7ae85"
    class="bs-home"
  >
    <div class="row small-collapse large-uncollapse">
      <div
        class="small-24 column areatemplate-showtime fore-posts-setted fore-posts-1 bsl-has-items bsl-no-headline-variation bsl-has-fore-posts"
      >
        <div class="_evt">
          <div class="bstn-hls xlarge-22 xlarge-offset-1 theme model-1">
            <div class="_evg">
              <div class="bstn-hl-wrapper">
                <div
                  class="bstn-hl type-materia with-photo with-summary"
                  style="
                    --bstn-hl-cover: url('https://s2-g1.glbimg.com/6pkaBFk5dFocP0Kd3TJj5lKUzM0=/0x0:3543x1993/1080x608/smart/filters:max_age(3600)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/X/l/nengSHSLevDfq5eZ43ow/54409653774-f0168f0f4e-o.jpg');
                  "
                >
                  <a
                    class="bstn-hl-link"
                    href="https://g1.globo.com/politica/noticia/2025/03/25/denuncia-do-golpe-como-foi-o-1o-dia-do-julgamento-de-bolsonaro-e-mais-7.ghtml"
                    ><ul class="bstn-hl-list">
                      <li class="bstn-hl-itemlist bstn-hl-spaceritem"></li>
                      <li class="bstn-hl-itemlist bstn-hl-playbutton"></li>
                      <li
                        class="bstn-hl-itemlist bstn-hl-playbutton bstn-hl-video"
                      ></li>
                      <li class="bstn-hl-itemlist bstn-hl-mainitem">
                        <div>
                          <div class="_evt">
                            <span
                              class="bstn-hl-title gui-color-primary gui-color-hover gui-color-primary-bg-after"
                              >STF rejeita questionamentos de advogados e decide
                              amanhã se Bolsonaro vira réu</span
                            >
                          </div>
                          <span
                            class="bstn-hl-summary gui-color-primary gui-color-hover"
                            >Defesas tentavam anular delação de Cid, tirar
                            Moraes do caso e transferir julgamento para o
                            plenário, onde votam os 11 ministros.</span
                          >
                        </div>
                      </li>
                    </ul></a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row show-for-medium-up">
      <div
        class="column medium-24 large-24 large-offset-0 xlarge-22 xlarge-offset-1"
      >
        <div class="publicidade publicidade-banner_slb_meio">
          <div id="banner_slb_meio">
            <div
              class="glb-skeleton-box"
              style="--skeleton-width: 100%; --skeleton-height: 100%"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="row medium-uncollapse bastian-container small-collapse medium-collapse large-uncollapse"
    >
      <div
        class="column medium-20 medium-offset-2 medium-pull-2 large-8 large-offset-0 large-pull-0 xlarge-7 xlarge-offset-1 xlarge-pull-1 float-right areatemplate-direita"
      >
        <div id="bstn-rtcl-placeholder">
          <div class="_evt">
            <div id="bstn-rtcl">
              <div class="_evg">
                <div class="_evt">
                  <div
                    class="bastian-feed-item"
                    data-type="post-agrupador-horizontal-g1"
                    data-index="1"
                  >
                    <div class="_he">
                      <div class="post-item">
                        <div class="bstn-item-shape">
                          <div class="post-agrupador-horizontal-g1 theme">
                            <div
                              style="
                                border-bottom: 1px solid rgb(238, 238, 238);
                                padding: 1rem 1.5rem;
                              "
                            >
                              <h2
                                style="
                                  font-family: opensans, opensans-bastian, Arial,
                                    sans-serif;
                                  font-size: 1rem;
                                  font-weight: bold;
                                  letter-spacing: -0.4px;
                                  color: rgb(51, 51, 51);
                                  line-height: 20px;
                                "
                              >
                                Assuntos em alta
                              </h2>
                            </div>
                            <div style="padding: 0px 1.5rem">
                              <div
                                style="
                                  border-top: 0px;
                                  padding: 1.5rem 0px;
                                  position: relative;
                                  display: flex;
                                  justify-content: space-between;
                                  align-items: flex-start;
                                "
                              >
                                <div>
                                  <div
                                    style="
                                      font-size: 15px;
                                      font-weight: 600;
                                      letter-spacing: -0.75px;
                                      line-height: 20px;
                                      color: rgb(51, 51, 51);
                                      margin-bottom: 0.5rem;
                                      font-family: opensans, opensans-bastian,
                                        Arial, sans-serif;
                                    "
                                  >
                                    <undefined></undefined>
                                  </div>
                                  <a
                                    href="https://g1.globo.com/ma/maranhao/noticia/2025/03/25/video-motociclista-morre-na-br-402-ao-cruzar-com-fiacao-que-ficou-na-pista-apos-um-acidente.ghtml#G1-FEED-BOX-user,recentes,4162e585-4a2c-43b4-9529-9391e9b3a9a5"
                                    class="gui-color-primary"
                                    style="
                                      font-size: 16px;
                                      line-height: 1.25;
                                      letter-spacing: -1px;
                                      font-family: opensans, opensans-bastian,
                                        Arial, sans-serif;
                                      font-weight: 700;
                                    "
                                    >VÍDEO: Motociclista morre na BR-402 ao
                                    cruzar com fiação que ficou na pista após
                                    acidente</a
                                  >
                                </div>
                                <a
                                  href="https://g1.globo.com/ma/maranhao/noticia/2025/03/25/video-motociclista-morre-na-br-402-ao-cruzar-com-fiacao-que-ficou-na-pista-apos-um-acidente.ghtml#G1-FEED-BOX-user,recentes,4162e585-4a2c-43b4-9529-9391e9b3a9a5"
                                  class="gui-color-primary"
                                  style="
                                    font-size: 16px;
                                    line-height: 1.25;
                                    letter-spacing: -1px;
                                    font-family: opensans, opensans-bastian,
                                      Arial, sans-serif;
                                    font-weight: 700;
                                  "
                                  ><img
                                    src="https://s2-g1.glbimg.com/Yu1ErFTAAl-kNDLFfUNgVCSVlF0=/94x94/top/smart/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/7/I/ApsYMESfqdOavB9bb0JQ/8d8qxvrpf3aiipkqhunqf6nqaopxanxyktpubnap.jpg"
                                    width="94"
                                    height="94"
                                    loading="lazy"
                                    alt="Foto: VÍDEO: Motociclista morre na BR-402 ao cruzar com fiação que ficou na pista após acidente"
                                    style="
                                      float: right;
                                      margin: 0px 0px 0px 1rem;
                                      border-radius: var(
                                        --glb-fd-p-agrupador-horizontal-img-border-radius
                                      );
                                    "
                                /></a>
                              </div>
                              <div
                                style="
                                  border-top: 1px solid rgb(238, 238, 238);
                                  padding: 1.5rem 0px;
                                  position: relative;
                                  display: flex;
                                  justify-content: space-between;
                                  align-items: flex-start;
                                "
                              >
                                <div>
                                  <div
                                    style="
                                      font-size: 15px;
                                      font-weight: 600;
                                      letter-spacing: -0.75px;
                                      line-height: 20px;
                                      color: rgb(51, 51, 51);
                                      margin-bottom: 0.5rem;
                                      font-family: opensans, opensans-bastian,
                                        Arial, sans-serif;
                                    "
                                  >
                                    <undefined></undefined>
                                  </div>
                                  <a
                                    href="https://g1.globo.com/ap/amapa/noticia/2025/03/25/mais-de-93-mil-pessoas-nao-sabem-que-estao-com-o-nome-sujo-no-amapa-diz-serasa.ghtml#G1-FEED-BOX-user,recentes,4162e585-4a2c-43b4-9529-9391e9b3a9a5"
                                    class="gui-color-primary"
                                    style="
                                      font-size: 16px;
                                      line-height: 1.25;
                                      letter-spacing: -1px;
                                      font-family: opensans, opensans-bastian,
                                        Arial, sans-serif;
                                      font-weight: 700;
                                    "
                                    >Mais de 93 mil pessoas não sabem que estão
                                    com o nome sujo no Amapá, diz Serasa</a
                                  >
                                </div>
                                <a
                                  href="https://g1.globo.com/ap/amapa/noticia/2025/03/25/mais-de-93-mil-pessoas-nao-sabem-que-estao-com-o-nome-sujo-no-amapa-diz-serasa.ghtml#G1-FEED-BOX-user,recentes,4162e585-4a2c-43b4-9529-9391e9b3a9a5"
                                  class="gui-color-primary"
                                  style="
                                    font-size: 16px;
                                    line-height: 1.25;
                                    letter-spacing: -1px;
                                    font-family: opensans, opensans-bastian,
                                      Arial, sans-serif;
                                    font-weight: 700;
                                  "
                                  ><img
                                    src="https://s2-g1.glbimg.com/IMB0doNU6Spv9BmQaRy_3eaz-mo=/94x94/top/smart/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2024/F/2/AcjJZ0RWKRCpwtD6HEWg/financiamento-3.jpg"
                                    width="94"
                                    height="94"
                                    loading="lazy"
                                    alt="Foto: Mais de 93 mil pessoas não sabem que estão com o nome sujo no Amapá, diz Serasa"
                                    style="
                                      float: right;
                                      margin: 0px 0px 0px 1rem;
                                      border-radius: var(
                                        --glb-fd-p-agrupador-horizontal-img-border-radius
                                      );
                                    "
                                /></a>
                              </div>
                              <div
                                style="
                                  border-top: 1px solid rgb(238, 238, 238);
                                  padding: 1.5rem 0px;
                                  position: relative;
                                  display: flex;
                                  justify-content: space-between;
                                  align-items: flex-start;
                                "
                              >
                                <div>
                                  <div
                                    style="
                                      font-size: 15px;
                                      font-weight: 600;
                                      letter-spacing: -0.75px;
                                      line-height: 20px;
                                      color: rgb(51, 51, 51);
                                      margin-bottom: 0.5rem;
                                      font-family: opensans, opensans-bastian,
                                        Arial, sans-serif;
                                    "
                                  >
                                    <undefined></undefined>
                                  </div>
                                  <a
                                    href="https://g1.globo.com/sp/presidente-prudente-regiao/noticia/2025/03/25/conservatorio-musical-abre-inscricoes-para-aulas-de-musicalizacao-infantil-e-coral-em-presidente-venceslau.ghtml#G1-FEED-BOX-user,recentes,4162e585-4a2c-43b4-9529-9391e9b3a9a5"
                                    class="gui-color-primary"
                                    style="
                                      font-size: 16px;
                                      line-height: 1.25;
                                      letter-spacing: -1px;
                                      font-family: opensans, opensans-bastian,
                                        Arial, sans-serif;
                                      font-weight: 700;
                                    "
                                    >Conservatório musical abre inscrições para
                                    aulas de musicalização infantil e coral em
                                    Presidente Venceslau</a
                                  >
                                </div>
                                <a
                                  href="https://g1.globo.com/sp/presidente-prudente-regiao/noticia/2025/03/25/conservatorio-musical-abre-inscricoes-para-aulas-de-musicalizacao-infantil-e-coral-em-presidente-venceslau.ghtml#G1-FEED-BOX-user,recentes,4162e585-4a2c-43b4-9529-9391e9b3a9a5"
                                  class="gui-color-primary"
                                  style="
                                    font-size: 16px;
                                    line-height: 1.25;
                                    letter-spacing: -1px;
                                    font-family: opensans, opensans-bastian,
                                      Arial, sans-serif;
                                    font-weight: 700;
                                  "
                                  ><img
                                    src="https://s2-g1.glbimg.com/H9KyD-wmU-ul0z4bVOPaCF3LR8M=/94x94/top/smart/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/K/e/yt4ApRSBqOjxAfWfmJXQ/prefeitura-de-venceslau-1-.jpg"
                                    width="94"
                                    height="94"
                                    loading="lazy"
                                    alt="Foto: Conservatório musical abre inscrições para aulas de musicalização infantil e coral em Presidente Venceslau"
                                    style="
                                      float: right;
                                      margin: 0px 0px 0px 1rem;
                                      border-radius: var(
                                        --glb-fd-p-agrupador-horizontal-img-border-radius
                                      );
                                    "
                                /></a>
                              </div>
                            </div>
                            <div
                              style="
                                border-top: 1px solid rgb(238, 238, 238);
                                padding: 16px 24px;
                              "
                            >
                              <a
                                class="gui-color-primary"
                                style="
                                  font-size: 14px;
                                  line-height: 1.14;
                                  letter-spacing: -0.7px;
                                  font-family: opensans, opensans-bastian, Arial,
                                    sans-serif;
                                  font-weight: 700;
                                  display: -webkit-box;
                                  -webkit-box-orient: vertical;
                                  -webkit-line-clamp: 3;
                                  text-overflow: ellipsis;
                                  overflow: hidden;
                                  cursor: pointer;
                                "
                                >Mais conteúdos recomendados
                                <span
                                  class="post-bastian-products__arrow"
                                ></span
                              ></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="_evt">
                  <div
                    class="bastian-feed-item"
                    data-type="advertise"
                    data-index="2"
                  >
                    <div class="bstn-feed-ad">
                      <div class="_preempt-visibility">
                        <div class="">
                          <div class="bstn-ad-rail"><div></div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="_evt">
                  <div
                    class="bastian-feed-item"
                    data-type="post-previsao-do-tempo"
                    data-index="3"
                  >
                    <div class="_he">
                      <div class="post-item">
                        <div class="bstn-item-shape">
                          <div
                            class="post-bastian-products post-previsao-do-tempo"
                          >
                            <div
                              class="post-bastian-products__header post-previsao-do-tempo__header"
                            >
                              <h2 class="post-bastian-products__title">
                                Previsão do Tempo
                              </h2>
                              <a
                                class="post-previsao-do-tempo__logo"
                                title="Clima Tempo"
                                target="_blanck"
                                href="https://www.climatempo.com.br/"
                              ></a>
                            </div>
                            <div class="post-bastian-products__content">
                              <section class="post-bastian-products__section">
                                <a
                                  href="/previsao-do-tempo/pe/recife.html"
                                  gacategory="feed"
                                  gaaction="post tempo"
                                  galabel="clique | right-column | anexo | com anexo | sem resumo | posicao 2 | corpo"
                                  ><div class="post-previsao-do-tempo__header">
                                    Recife
                                  </div>
                                  <div
                                    class="post-previsao-do-tempo__propabilidade-de-chuva"
                                  >
                                    Probabilidade de chuva: 78% 11mm
                                  </div>
                                  <div class="post-previsao-do-tempo__previsao">
                                    <div
                                      class="post-previsao-do-tempo__previsao-do-dia"
                                    >
                                      <div
                                        class="post-previsao-do-tempo__icon post-previsao-do-tempo__icon--4"
                                      ></div>
                                      <div>manhã</div>
                                    </div>
                                    <div
                                      class="post-previsao-do-tempo__previsao-do-dia"
                                    >
                                      <div
                                        class="post-previsao-do-tempo__icon post-previsao-do-tempo__icon--4"
                                      ></div>
                                      <div>tarde</div>
                                    </div>
                                    <div
                                      class="post-previsao-do-tempo__previsao-do-dia"
                                    >
                                      <div
                                        class="post-previsao-do-tempo__icon post-previsao-do-tempo__icon--4n"
                                      ></div>
                                      <div>noite</div>
                                    </div>
                                    <div
                                      class="post-previsao-do-tempo__temperaturas"
                                    >
                                      <div
                                        class="post-previsao-do-tempo__temperatura"
                                      >
                                        <span
                                          class="post-previsao-do-tempo__temperatura--valor"
                                          >30º</span
                                        ><span
                                          class="post-previsao-do-tempo__temperatura--sufixo"
                                          >max</span
                                        >
                                      </div>
                                      <div
                                        class="post-previsao-do-tempo__temperatura"
                                      >
                                        <span
                                          class="post-previsao-do-tempo__temperatura--valor"
                                          >25º</span
                                        ><span
                                          class="post-previsao-do-tempo__temperatura--sufixo"
                                          >min</span
                                        >
                                      </div>
                                    </div>
                                  </div></a
                                >
                              </section>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="_evt">
                  <div
                    class="bastian-feed-item"
                    data-type="post-mais-lidas"
                    data-index="4"
                  >
                    <div class="_he">
                      <div class="post-item">
                        <div class="bstn-item-shape">
                          <div
                            class="post-bastian-products post-mais-lidas theme"
                          >
                            <div class="post-bastian-products__header">
                              <h2 class="post-bastian-products__title">
                                Mais Lidas
                              </h2>
                            </div>
                            <div
                              class="post-bastian-products__content post-mais-lidas__content"
                            >
                              <ol>
                                <section
                                  class="post-bastian-products__section post-mais-lidas__section"
                                >
                                  <a
                                    href="https://g1.globo.com/politica/blog/andreia-sadi/post/2025/03/25/e-trazer-muito-peso-para-as-minhas-costas-diz-zambelli-apos-bolsonaro-culpa-la-pela-derrota-em-2022.ghtml"
                                    gacategory="feed"
                                    gaaction="post mais lidas"
                                    galabel="clique | right-column | noticia 1 | sem foto | sem resumo | posicao 1 "
                                    ><li class="post-mais-lidas__item">
                                      <span
                                        class="gui-color-primary post-mais-lidas__title"
                                        >'É trazer muito peso para as minhas
                                        costas', diz Zambelli após Bolsonaro
                                        culpá-la pela derrota em 2022</span
                                      >
                                    </li></a
                                  >
                                </section>
                                <section
                                  class="post-bastian-products__section post-mais-lidas__section"
                                >
                                  <a
                                    href="https://g1.globo.com/politica/noticia/2025/03/25/denuncia-do-golpe-ex-desembargador-e-detido-no-stf-apos-tumulto-em-sessao.ghtml"
                                    gacategory="feed"
                                    gaaction="post mais lidas"
                                    galabel="clique | right-column | noticia 2 | sem foto | sem resumo | posicao 1 "
                                    ><li class="post-mais-lidas__item">
                                      <span
                                        class="gui-color-primary post-mais-lidas__title"
                                        >Advogado grita e é detido por desacato
                                        durante julgamento sobre Bolsonaro no
                                        STF</span
                                      >
                                    </li></a
                                  >
                                </section>
                                <section
                                  class="post-bastian-products__section post-mais-lidas__section"
                                >
                                  <a
                                    href="https://g1.globo.com/pr/norte-noroeste/noticia/2025/03/25/paciente-e-preso-por-assediar-sexualmente-uma-medica-pr.ghtml"
                                    gacategory="feed"
                                    gaaction="post mais lidas"
                                    galabel="clique | right-column | noticia 3 | sem foto | sem resumo | posicao 1 "
                                    ><li class="post-mais-lidas__item">
                                      <span
                                        class="gui-color-primary post-mais-lidas__title"
                                        >Paciente é preso por assediar
                                        sexualmente uma médica enquanto era
                                        atendido em UPA do PR</span
                                      >
                                    </li></a
                                  >
                                </section>
                                <section
                                  class="post-bastian-products__section post-mais-lidas__section"
                                >
                                  <a
                                    href="https://g1.globo.com/politica/noticia/2025/03/25/denuncia-do-golpe-parlamentares-pro-bolsonaro-reclamam-de-que-foram-barrados-na-1a-turma-do-stf.ghtml"
                                    gacategory="feed"
                                    gaaction="post mais lidas"
                                    galabel="clique | right-column | noticia 4 | sem foto | sem resumo | posicao 1 "
                                    ><li class="post-mais-lidas__item">
                                      <span
                                        class="gui-color-primary post-mais-lidas__title"
                                        >Denúncia do golpe: parlamentares
                                        pró-Bolsonaro reclamam que foram
                                        barrados na 1ª Turma do STF</span
                                      >
                                    </li></a
                                  >
                                </section>
                                <section
                                  class="post-bastian-products__section post-mais-lidas__section"
                                >
                                  <a
                                    href="https://g1.globo.com/politica/noticia/2025/03/25/moraes-nega-que-o-stf-esteja-condenando-velhinhas-com-a-biblia-na-mao-em-julgamento-da-denuncia-do-golpe.ghtml"
                                    gacategory="feed"
                                    gaaction="post mais lidas"
                                    galabel="clique | right-column | noticia 5 | sem foto | sem resumo | posicao 1 "
                                    ><li class="post-mais-lidas__item">
                                      <span
                                        class="gui-color-primary post-mais-lidas__title"
                                        >Moraes nega que o STF esteja condenando
                                        'velhinhas com a Bíblia na mão' em
                                        julgamento da denúncia do golpe</span
                                      >
                                    </li></a
                                  >
                                </section>
                              </ol>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="_evt">
                  <div
                    class="bastian-feed-item"
                    data-type="post-economia"
                    data-index="5"
                  >
                    <div class="_he">
                      <div class="post-item">
                        <div class="bstn-item-shape">
                          <div class="post-bastian-products post-economia">
                            <div
                              class="post-bastian-products__header post-economia__header"
                            >
                              <h2 class="post-bastian-products__title">
                                Economia
                              </h2>
                              <a
                                class="post-economia__logo"
                                title="Valor"
                                target="_blank"
                                href="http://www.valor.com.br/valor-data"
                              ></a>
                            </div>
                            <div
                              class="post-bastian-products__content post-economia__content"
                            >
                              <section class="post-bastian-products__section">
                                <a
                                  href="http://www.valor.com.br/valor-data/"
                                  gacategory="feed"
                                  gaaction="post economia"
                                  galabel="clique | right-column | ibovespa | com anexo | sem resumo | posicao 1"
                                  class="post-economia-link"
                                  ><p class="post-economia-bolsa__header">
                                    Ibovespa
                                  </p>
                                  <div class="post-economia-bolsa__quote">
                                    <div
                                      class="post-economia-bolsa__quote-summary"
                                    >
                                      <div
                                        class="post-economia-bolsa__quote-percentage"
                                      >
                                        <span
                                          class="post-economia-bolsa--positive"
                                          ><span
                                            class="post-economia-bolsa__quote-percentage-symbol"
                                            >+0.64%</span
                                          ></span
                                        >
                                      </div>
                                      <div
                                        class="post-economia-bolsa__quote-last-value"
                                        title="132.168 pts"
                                      >
                                        132.168 pts
                                      </div>
                                    </div>
                                    <div
                                      class="post-economia-bolsa__quote-chart"
                                    >
                                      <div
                                        id="post-economia-bolsa__chart"
                                        class="post-economia-bolsa__chart post-economia-bolsa__chart--filled"
                                        data-highcharts-chart="0"
                                      >
                                        <div
                                          class="highcharts-container"
                                          id="highcharts-0"
                                          style="
                                            position: relative;
                                            overflow: hidden;
                                            width: 191px;
                                            height: 71px;
                                            text-align: left;
                                            line-height: normal;
                                            z-index: 0;
                                            -webkit-tap-highlight-color: rgba(
                                              0,
                                              0,
                                              0,
                                              0
                                            );
                                          "
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                  <p class="post-economia-bolsa__metadata">
                                    Atualizado há 2 horas
                                  </p></a
                                >
                              </section>
                              <section class="post-bastian-products__section">
                                <a
                                  href="http://www.valor.com.br/valor-data/"
                                  gacategory="feed"
                                  gaaction="post economia"
                                  galabel="clique | right-column | moedas | com anexo | sem resumo | posicao 1"
                                  ><p class="post-economia-cotacao__header">
                                    Compra de Moedas
                                  </p>
                                  <table>
                                    <tbody>
                                      <tr class="post-economia-cotacao__quote">
                                        <td
                                          class="post-economia-cotacao__quote-name"
                                        >
                                          Dólar Comercial
                                        </td>
                                        <td
                                          class="post-economia-cotacao__quote-value"
                                        >
                                          R$ 5,708
                                        </td>
                                        <td
                                          class="post-economia-cotacao__quote-variation post-economia-cotacao__quote-variation--negative"
                                        >
                                          -0,76%
                                        </td>
                                      </tr>
                                      <tr class="post-economia-cotacao__quote">
                                        <td
                                          class="post-economia-cotacao__quote-name"
                                        >
                                          Euro
                                        </td>
                                        <td
                                          class="post-economia-cotacao__quote-value"
                                        >
                                          R$ 6,162
                                        </td>
                                        <td
                                          class="post-economia-cotacao__quote-variation post-economia-cotacao__quote-variation--negative"
                                        >
                                          -0,82%
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table></a
                                >
                              </section>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="_evt">
                  <div
                    class="bastian-feed-item"
                    data-type="post-agrupador-materia"
                    data-index="6"
                  >
                    <div class="_he">
                      <div class="post-item">
                        <div class="bstn-item-shape">
                          <div class="post-agrupador-materia theme">
                            <div
                              style="
                                border-bottom: 1px solid rgb(238, 238, 238);
                                padding: 1rem 1.5rem;
                              "
                            >
                              <h2
                                style="
                                  font-family: var(--font-family-book),
                                    var(--font-family-book-fallback);
                                  font-size: 1rem;
                                  font-weight: bold;
                                  letter-spacing: -0.4px;
                                  color: rgb(51, 51, 51);
                                  line-height: 20px;
                                "
                              >
                                🎧 Ouça no g1
                              </h2>
                            </div>
                            <ul
                              style="padding: 0px 1.5rem; transition: height 2s"
                            >
                              <li
                                style="
                                  border-top: 0px;
                                  padding: 1.5rem 0px;
                                  position: relative;
                                  display: flex;
                                  justify-content: space-between;
                                  align-items: flex-start;
                                "
                              >
                                <div>
                                  <div
                                    style="
                                      font-size: 15px;
                                      font-weight: 600;
                                      letter-spacing: -0.75px;
                                      line-height: 20px;
                                      color: rgb(51, 51, 51);
                                      margin-bottom: 0.5rem;
                                      font-family: var(--font-family-book),
                                        var(--font-family-book-fallback);
                                    "
                                  >
                                    O Assunto
                                  </div>
                                  <a
                                    href="https://g1.globo.com/podcast/o-assunto/noticia/2025/03/25/o-assunto-1433-o-caso-bolsonaro-no-supremo-tribunal-federal.ghtml"
                                    class="gui-color-primary"
                                    style="
                                      font-size: 1rem;
                                      line-height: 20px;
                                      letter-spacing: -1px;
                                      font-family: var(--font-family-book),
                                        var(--font-family-book-fallback);
                                      font-weight: 700;
                                    "
                                    >O caso Bolsonaro no Supremo Tribunal
                                    Federal</a
                                  >
                                </div>
                                <a
                                  href="https://g1.globo.com/podcast/o-assunto/noticia/2025/03/25/o-assunto-1433-o-caso-bolsonaro-no-supremo-tribunal-federal.ghtml"
                                  class="gui-color-primary"
                                  style="
                                    font-size: 1rem;
                                    line-height: 20px;
                                    letter-spacing: -1px;
                                    font-family: var(--font-family-book),
                                      var(--font-family-book-fallback);
                                    font-weight: 700;
                                  "
                                  ><img
                                    src="https://s2-g1.glbimg.com/wIhfl6l3QIWDlJ96nD1_rj7YvFE=/143x0:779x636/94x94/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/h/V/NfIrR4QoSmt1lEdMobAA/microsoftteams-image-15-.png"
                                    width="94"
                                    height="94"
                                    alt="Foto: (Natuza Nery comanda o podcast O Assunto / g1)"
                                    style="
                                      float: right;
                                      margin: 0px 0px 0px 1rem;
                                      border-radius: var(
                                        --glb-fd-p-agrupador-materia-img-border-radius
                                      );
                                    "
                                /></a>
                              </li>
                              <li
                                style="
                                  border-top: 1px solid rgb(238, 238, 238);
                                  padding: 1.5rem 0px;
                                  position: relative;
                                  display: flex;
                                  justify-content: space-between;
                                  align-items: flex-start;
                                "
                              >
                                <div>
                                  <div
                                    style="
                                      font-size: 15px;
                                      font-weight: 600;
                                      letter-spacing: -0.75px;
                                      line-height: 20px;
                                      color: rgb(51, 51, 51);
                                      margin-bottom: 0.5rem;
                                      font-family: var(--font-family-book),
                                        var(--font-family-book-fallback);
                                    "
                                  >
                                    Isso é Fantástico
                                  </div>
                                  <a
                                    href="https://g1.globo.com/fantastico/podcast/isso-e-fantastico/noticia/2025/03/16/isso-e-fantastico-quais-os-direitos-e-deveres-dos-passageiros-e-das-companhias-aereas.ghtml"
                                    class="gui-color-primary"
                                    style="
                                      font-size: 1rem;
                                      line-height: 20px;
                                      letter-spacing: -1px;
                                      font-family: var(--font-family-book),
                                        var(--font-family-book-fallback);
                                      font-weight: 700;
                                    "
                                    >Os direitos e deveres dos passageiros e das
                                    companhias aéreas</a
                                  >
                                </div>
                                <a
                                  href="https://g1.globo.com/fantastico/podcast/isso-e-fantastico/noticia/2025/03/16/isso-e-fantastico-quais-os-direitos-e-deveres-dos-passageiros-e-das-companhias-aereas.ghtml"
                                  class="gui-color-primary"
                                  style="
                                    font-size: 1rem;
                                    line-height: 20px;
                                    letter-spacing: -1px;
                                    font-family: var(--font-family-book),
                                      var(--font-family-book-fallback);
                                    font-weight: 700;
                                  "
                                  ><img
                                    src="https://s2-g1.glbimg.com/sx5zEPLeFR6pNyoJRcxyjwU78rQ=/195x0:715x520/94x94/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/h/F/npBJIeSluBCK5uB9zD9w/ief-grande.webp"
                                    width="94"
                                    height="94"
                                    alt="Foto: (Isso É Fantástico / Arte)"
                                    style="
                                      float: right;
                                      margin: 0px 0px 0px 1rem;
                                      border-radius: var(
                                        --glb-fd-p-agrupador-materia-img-border-radius
                                      );
                                    "
                                /></a>
                              </li>
                              <li
                                style="
                                  border-top: 1px solid rgb(238, 238, 238);
                                  padding: 1.5rem 0px;
                                  position: relative;
                                  display: flex;
                                  justify-content: space-between;
                                  align-items: flex-start;
                                "
                              >
                                <div>
                                  <div
                                    style="
                                      font-size: 15px;
                                      font-weight: 600;
                                      letter-spacing: -0.75px;
                                      line-height: 20px;
                                      color: rgb(51, 51, 51);
                                      margin-bottom: 0.5rem;
                                      font-family: var(--font-family-book),
                                        var(--font-family-book-fallback);
                                    "
                                  >
                                    Resumão diário
                                  </div>
                                  <a
                                    href="https://g1.globo.com/podcast/resumao-diario/"
                                    class="gui-color-primary"
                                    style="
                                      font-size: 1rem;
                                      line-height: 20px;
                                      letter-spacing: -1px;
                                      font-family: var(--font-family-book),
                                        var(--font-family-book-fallback);
                                      font-weight: 700;
                                    "
                                    >As notícias mais importantes, em 3 edições
                                    por dia</a
                                  >
                                </div>
                                <a
                                  href="https://g1.globo.com/podcast/resumao-diario/"
                                  class="gui-color-primary"
                                  style="
                                    font-size: 1rem;
                                    line-height: 20px;
                                    letter-spacing: -1px;
                                    font-family: var(--font-family-book),
                                      var(--font-family-book-fallback);
                                    font-weight: 700;
                                  "
                                  ><img
                                    src="https://s2-g1.glbimg.com/u2hSUpqaHYpgqr4HQCqbCWx6tCw=/0x0:1500x1500/94x94/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2020/K/H/YLkrYtSY2eBGeWcidqbA/capas-podcasts-resumao.jpg"
                                    width="94"
                                    height="94"
                                    alt="Foto: (selo podcast resumão - sem texto / Comunicação/Globo)"
                                    style="
                                      float: right;
                                      margin: 0px 0px 0px 1rem;
                                      border-radius: var(
                                        --glb-fd-p-agrupador-materia-img-border-radius
                                      );
                                    "
                                /></a>
                              </li>
                            </ul>
                            <div
                              style="
                                border-top: 1px solid rgb(238, 238, 238);
                                padding: 16px 24px;
                              "
                            >
                              <a
                                href="https://g1.globo.com/podcast/"
                                class="gui-color-primary"
                                style="
                                  font-size: 14px;
                                  line-height: 1.14;
                                  letter-spacing: -0.7px;
                                  font-family: var(--font-family-book),
                                    var(--font-family-book-fallback);
                                  font-weight: 700;
                                  cursor: pointer;
                                "
                                >Tudo sobre podcasts<span
                                  class="post-bastian-products__arrow"
                                ></span
                              ></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="_evt">
                  <div
                    class="bastian-feed-item"
                    data-type="advertise"
                    data-index="7"
                  >
                    <div class="bstn-feed-ad">
                      <div class="_preempt-visibility">
                        <div class="">
                          <div class="bstn-ad-rail"><div></div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="column areatemplate-esquerda large-15 large-offset-0 xlarge-14 xlarge-offset-1 float-left"
      >
        <div class="theme">
          <div
            id="bstn-launcher"
            class="fore-posts-setted fore-posts-1 bsl-has-fore-posts bsl-has-items bsl-no-headline-variation bstn-channel-desktop bstn-api-home-api bstn-tenant-g1"
            data-buildversion="12.12.2"
            data-folderversion="mr_375037"
            data-namespace="dsframework"
            data-jshash="20250118f63f448e2b676bee9aca41f2461d3d"
            data-csshash="20250107cdb873289794f38e6bfa0a6f8cde2b"
          >
            <div id="bstn-fd-launcher">
              <div class="feed-root">
                <div id="feed-placeholder" class="feed-placeholder">
                  <div class="_evt">
                    <div class="bstn-fd bstn-fd-csr">
                      <div
                        class="post-notifier-pushstream gui-color-primary-bg bstn-fd-visible-top"
                      ></div>
                      <div class="_evg">
                        <div class="_evt">
                          <div class="bastian-page" data-index="1">
                            <div class="_evg">
                              <div class="_evt">
                                <div
                                  class="bastian-feed-item"
                                  data-type="materia"
                                  data-index="1"
                                  data-trending-video-check="true"
                                >
                                  <div
                                    class="feed-post bstn-item-shape type-materia"
                                    id="4e6d30f9-6d94-4517-abab-65bd1c165195"
                                  >
                                    <div class="feed-post-body">
                                      <div
                                        class="feed-post-header with-post-chapeu"
                                      >
                                        <span class="feed-post-header-chapeu"
                                          >Acusação e relator</span
                                        >
                                      </div>
                                      <div
                                        class="feed-post-body-title gui-color-primary gui-color-hover"
                                        ref="[object Object]"
                                      >
                                        <div class="_evt">
                                          <h2>
                                            <a
                                              href="https://g1.globo.com/politica/noticia/2025/03/25/denuncia-do-golpe-ministerio-publico-apresenta-argumentos-sobre-caso.ghtml"
                                              class="feed-post-link gui-color-primary gui-color-hover"
                                              ><p elementtiming="text-csr">
                                                PGR diz que Bolsonaro era chefe
                                                do golpe; Moraes aponta ataques
                                                em série à democracia
                                              </p></a
                                            >
                                          </h2>
                                        </div>
                                      </div>
                                      <div class="feed-media-wrapper">
                                        <a
                                          href="https://g1.globo.com/politica/noticia/2025/03/25/denuncia-do-golpe-ministerio-publico-apresenta-argumentos-sobre-caso.ghtml"
                                          class="feed-post-figure-link gui-image-hover"
                                          ref="[object Object]"
                                          ><div class="bstn-fd-item-cover">
                                            <picture
                                              class="bstn-fd-cover-picture"
                                              ><img
                                                class="bstn-fd-picture-image"
                                                alt="PGR diz que Bolsonaro era chefe do golpe; Moraes aponta ataques em série à democracia - Foto: (Rosinei Coutinho/STF)"
                                                title="PGR diz que Bolsonaro era chefe do golpe; Moraes aponta ataques em série à democracia - Foto: (Rosinei Coutinho/STF)"
                                                loading="lazy"
                                                elementtiming="image-csr"
                                                srcset="
                                                  https://s2-g1.glbimg.com/fxkkRMymyhqwPwMfvS4F2VcHlpQ=/0x444:1444x1256/540x304/smart/filters:max_age(3600)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/Z/O/oxwu3rSzGQp6Jdc7AnIA/54409814558-2442e9d6cd-k.jpg   540w,
                                                  https://s2-g1.glbimg.com/dJ2TKNVW7wKEUalZToguCUG8kgQ=/0x444:1444x1256/810x456/smart/filters:max_age(3600)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/Z/O/oxwu3rSzGQp6Jdc7AnIA/54409814558-2442e9d6cd-k.jpg   810w,
                                                  https://s2-g1.glbimg.com/59Sm9LfWFKAwJYYmmrbdrZ7R7CQ=/0x444:1444x1256/1080x608/smart/filters:max_age(3600)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/Z/O/oxwu3rSzGQp6Jdc7AnIA/54409814558-2442e9d6cd-k.jpg 1080w
                                                "
                                                sizes="(min-width: 540px) 50vw, (min-width: 900px) 30vw, 100vw"
                                                src="https://s2-g1.glbimg.com/fxkkRMymyhqwPwMfvS4F2VcHlpQ=/0x444:1444x1256/540x304/smart/filters:max_age(3600)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/Z/O/oxwu3rSzGQp6Jdc7AnIA/54409814558-2442e9d6cd-k.jpg"
                                            /></picture></div
                                        ></a>
                                      </div>
                                      <div class="feed-post-metadata">
                                        <span class="feed-post-datetime"
                                          >Há 7 horas</span
                                        >
                                      </div>
                                      <div class="bstn-related">
                                        <ul
                                          class="bstn-relateditems"
                                          ref="[object Object]"
                                        >
                                          <li class="bstn-relateditem">
                                            <div class="bstn-fd-relatedtext">
                                              <a
                                                class="gui-color-primary gui-color-hover feed-post-body-title bstn-relatedtext"
                                                href="https://g1.globo.com/politica/noticia/2025/03/25/moraes-nega-que-o-stf-esteja-condenando-velhinhas-com-a-biblia-na-mao-em-julgamento-da-denuncia-do-golpe.ghtml"
                                                >Moraes nega que STF esteja
                                                condenando 'velhinhas com a
                                                Bíblia'</a
                                              >
                                              <div class="feed-post-metadata">
                                                <span class="feed-post-datetime"
                                                  >Há 7 horas</span
                                                >
                                              </div>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="_evt">
                                <div
                                  class="bastian-feed-item"
                                  data-type="materia"
                                  data-index="2"
                                  data-trending-video-check="true"
                                >
                                  <div
                                    class="feed-post bstn-item-shape type-materia"
                                    id="c7ce7939-b790-442b-b3e2-09888345bc22"
                                  >
                                    <div class="feed-post-body">
                                      <div
                                        class="feed-post-header with-post-chapeu"
                                      >
                                        <span class="feed-post-header-chapeu"
                                          >Defesa</span
                                        >
                                      </div>
                                      <div
                                        class="feed-post-body-title gui-color-primary gui-color-hover"
                                        ref="[object Object]"
                                      >
                                        <div class="_evt">
                                          <h2>
                                            <a
                                              href="https://g1.globo.com/politica/noticia/2025/03/25/denuncia-do-golpe-os-argumentos-da-defesa-de-bolsonaro-sobre-o-caso.ghtml"
                                              class="feed-post-link gui-color-primary gui-color-hover"
                                              ><p elementtiming="text-csr">
                                                'Não se achou
                                                absolutamente&nbsp;nada contra
                                                Bolsonaro', afirma advogado
                                              </p></a
                                            >
                                          </h2>
                                        </div>
                                      </div>
                                      <div class="feed-media-wrapper">
                                        <a
                                          href="https://g1.globo.com/politica/noticia/2025/03/25/denuncia-do-golpe-os-argumentos-da-defesa-de-bolsonaro-sobre-o-caso.ghtml"
                                          class="feed-post-figure-link gui-image-hover"
                                          ref="[object Object]"
                                          ><div class="bstn-fd-item-cover">
                                            <picture
                                              class="bstn-fd-cover-picture"
                                              ><img
                                                class="bstn-fd-picture-image"
                                                alt="'Não se achou absolutamente&nbsp;nada contra Bolsonaro', afirma advogado - Foto: (Antonio Augusto/STF)"
                                                title="'Não se achou absolutamente&nbsp;nada contra Bolsonaro', afirma advogado - Foto: (Antonio Augusto/STF)"
                                                loading="lazy"
                                                elementtiming="image-csr"
                                                srcset="
                                                  https://s2-g1.glbimg.com/0YnTZ8KU_hS_i3QioyKWlmlswek=/0x196:1950x1293/540x304/smart/filters:max_age(3600)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/B/z/BW4VpMSMSBuMh7DjLudg/54409653844-0aeb0f9a43-k.jpg   540w,
                                                  https://s2-g1.glbimg.com/hwNL2PC07JNLm2j9guwfJDooJG8=/0x196:1950x1293/810x456/smart/filters:max_age(3600)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/B/z/BW4VpMSMSBuMh7DjLudg/54409653844-0aeb0f9a43-k.jpg   810w,
                                                  https://s2-g1.glbimg.com/p58_aqhzRun3cBxpGtByx6N1X7I=/0x196:1950x1293/1080x608/smart/filters:max_age(3600)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/B/z/BW4VpMSMSBuMh7DjLudg/54409653844-0aeb0f9a43-k.jpg 1080w
                                                "
                                                sizes="(min-width: 540px) 50vw, (min-width: 900px) 30vw, 100vw"
                                                src="https://s2-g1.glbimg.com/0YnTZ8KU_hS_i3QioyKWlmlswek=/0x196:1950x1293/540x304/smart/filters:max_age(3600)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/B/z/BW4VpMSMSBuMh7DjLudg/54409653844-0aeb0f9a43-k.jpg"
                                            /></picture></div
                                        ></a>
                                      </div>
                                      <div class="feed-post-metadata">
                                        <span class="feed-post-datetime"
                                          >Há 6 horas</span
                                        ><span
                                          class="feed-post-metadata-section"
                                        >
                                          Política
                                        </span>
                                      </div>
                                      <div class="bstn-related">
                                        <ul
                                          class="bstn-relateditems"
                                          ref="[object Object]"
                                        >
                                          <li class="bstn-relateditem">
                                            <div class="bstn-fd-relatedtext">
                                              <a
                                                class="gui-color-primary gui-color-hover feed-post-body-title bstn-relatedtext"
                                                href="https://g1.globo.com/politica/noticia/2025/03/25/denuncia-do-golpe-advogados-dos-acusados-apresentam-seus-argumentos.ghtml"
                                                >Defesas apontam falta de provas
                                                e falhas no processo</a
                                              >
                                              <div class="feed-post-metadata">
                                                <span class="feed-post-datetime"
                                                  >Há 6 horas</span
                                                >
                                              </div>
                                            </div>
                                          </li>
                                          <li class="bstn-relateditem">
                                            <div class="bstn-fd-relatedtext">
                                              <a
                                                class="gui-color-primary gui-color-hover feed-post-body-title bstn-relatedtext"
                                                href="https://g1.globo.com/politica/noticia/2025/03/25/pedir-venia-document-dumping-fishing-expedition-o-que-significam-termos-usados-no-julgamento-da-denuncia-do-golpe.ghtml"
                                                >Fishing expedition? Entenda
                                                termos usados no STF</a
                                              >
                                              <div class="feed-post-metadata">
                                                <span class="feed-post-datetime"
                                                  >Há 6 horas</span
                                                >
                                              </div>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="_evt">
                                <div
                                  class="bastian-feed-item"
                                  data-type="materia"
                                  data-index="3"
                                  data-trending-video-check="true"
                                >
                                  <div
                                    class="feed-post bstn-item-shape type-materia"
                                    id="27cbe923-316a-4b94-8d51-dc6f267dc469"
                                  >
                                    <div class="feed-post-body">
                                      <div
                                        class="feed-post-header with-post-chapeu"
                                      >
                                        <span class="feed-post-header-chapeu"
                                          >Blog da Daniela Lima</span
                                        >
                                      </div>
                                      <div
                                        class="feed-post-body-title gui-color-primary gui-color-hover"
                                        ref="[object Object]"
                                      >
                                        <div class="_evt">
                                          <h2>
                                            <a
                                              href="https://g1.globo.com/politica/blog/daniela-lima/post/2025/03/25/moraes-denuncia-golpe.ghtml"
                                              class="feed-post-link gui-color-primary gui-color-hover"
                                              ><p elementtiming="text-csr">
                                                Musk, gráficos, 'velhinhas com
                                                bíblia': STF aposta em relato
                                                didático no 1º dia
                                              </p></a
                                            >
                                          </h2>
                                        </div>
                                      </div>
                                      <div
                                        class="feed-post-body-resumo"
                                        ref="[object Object]"
                                      >
                                        <p elementtiming="text-csr">
                                          Moraes guardou o 'juridiquês' apenas
                                          para o voto formal.
                                        </p>
                                      </div>
                                      <div class="feed-media-wrapper">
                                        <a
                                          href="https://g1.globo.com/politica/blog/daniela-lima/post/2025/03/25/moraes-denuncia-golpe.ghtml"
                                          class="feed-post-figure-link gui-image-hover"
                                          ref="[object Object]"
                                          ><div class="bstn-fd-item-cover">
                                            <picture
                                              class="bstn-fd-cover-picture"
                                              ><img
                                                class="bstn-fd-picture-image"
                                                alt="Musk, gráficos, 'velhinhas com bíblia': STF aposta em relato didático no 1º dia  - Foto: (Antonio Augusto/STF)"
                                                title="Musk, gráficos, 'velhinhas com bíblia': STF aposta em relato didático no 1º dia  - Foto: (Antonio Augusto/STF)"
                                                loading="lazy"
                                                elementtiming="image-csr"
                                                srcset="
                                                  https://s2-g1.glbimg.com/IMCM3TFC454iEygZ2O-xpKOJ5Y4=/0x354:3543x2347/540x304/smart/filters:max_age(3600)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/E/P/5bW4IXSiiB3Bn8euQ68A/54410120608-691c374dfe-o.jpg   540w,
                                                  https://s2-g1.glbimg.com/2kIY9PghspwE9Mm0-aIFrXiJaWI=/0x354:3543x2347/810x456/smart/filters:max_age(3600)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/E/P/5bW4IXSiiB3Bn8euQ68A/54410120608-691c374dfe-o.jpg   810w,
                                                  https://s2-g1.glbimg.com/V-1rahYcPMW4GGigfda9jtWIONU=/0x354:3543x2347/1080x608/smart/filters:max_age(3600)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/E/P/5bW4IXSiiB3Bn8euQ68A/54410120608-691c374dfe-o.jpg 1080w
                                                "
                                                sizes="(min-width: 540px) 50vw, (min-width: 900px) 30vw, 100vw"
                                                src="https://s2-g1.glbimg.com/IMCM3TFC454iEygZ2O-xpKOJ5Y4=/0x354:3543x2347/540x304/smart/filters:max_age(3600)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/E/P/5bW4IXSiiB3Bn8euQ68A/54410120608-691c374dfe-o.jpg"
                                            /></picture></div
                                        ></a>
                                      </div>
                                      <div class="feed-post-metadata">
                                        <span class="feed-post-datetime"
                                          >Há 30 minutos</span
                                        ><span
                                          class="feed-post-metadata-section"
                                        >
                                          Blog da Daniela Lima
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="_evt">
                                <div
                                  class="bastian-feed-item"
                                  data-type="materia"
                                  data-index="4"
                                  data-trending-video-check="true"
                                >
                                  <div
                                    class="feed-post bstn-item-shape type-materia"
                                    id="1682d1fb-d923-457f-81a3-03614556751c"
                                  >
                                    <div class="feed-post-body">
                                      <div
                                        class="feed-post-header with-post-chapeu"
                                      >
                                        <span class="feed-post-header-chapeu"
                                          >Tumulto no julgamento</span
                                        >
                                      </div>
                                      <div
                                        class="feed-post-body-title gui-color-primary gui-color-hover"
                                        ref="[object Object]"
                                      >
                                        <div class="_evt">
                                          <h2>
                                            <a
                                              href="https://g1.globo.com/politica/noticia/2025/03/25/denuncia-do-golpe-ex-desembargador-e-detido-no-stf-apos-tumulto-em-sessao.ghtml"
                                              class="feed-post-link gui-color-primary gui-color-hover"
                                              ><p elementtiming="text-csr">
                                                Advogado é detido por desacato
                                                após gritar contra o STF em
                                                julgamento
                                              </p></a
                                            >
                                          </h2>
                                        </div>
                                      </div>
                                      <div class="feed-media-wrapper">
                                        <a
                                          href="https://g1.globo.com/politica/noticia/2025/03/25/denuncia-do-golpe-ex-desembargador-e-detido-no-stf-apos-tumulto-em-sessao.ghtml"
                                          class="feed-post-figure-link gui-image-hover"
                                          ref="[object Object]"
                                          ><div
                                            class="bstn-fd-item-cover bstn-fd-video-cover gui-lightbox-open"
                                            data-video-id="13455928"
                                            data-short-url="https://g1.globo.com/politica/noticia/2025/03/25/denuncia-do-golpe-ex-desembargador-e-detido-no-stf-apos-tumulto-em-sessao.ghtml"
                                            data-link="https://g1.globo.com/politica/noticia/2025/03/25/denuncia-do-golpe-ex-desembargador-e-detido-no-stf-apos-tumulto-em-sessao.ghtml"
                                            data-program-title="Conexão Globonews"
                                            data-title="Advogado é detido por desacato após gritar contra o STF em julgamento"
                                          >
                                            <picture
                                              class="bstn-fd-cover-picture"
                                              ><img
                                                class="bstn-fd-picture-image"
                                                alt="Advogado é detido por desacato após gritar contra o STF em julgamento - Programa: Conexão Globonews "
                                                title="Advogado é detido por desacato após gritar contra o STF em julgamento - Programa: Conexão Globonews "
                                                loading="lazy"
                                                elementtiming="image-csr"
                                                srcset="
                                                  https://s2-g1.glbimg.com/h0JZdePeSlzo1cTBNEdmy9AuKn0=/0x0:1920x1080/540x304/smart/filters:max_age(3600)/http://s01.video.glbimg.com/deo/vi/28/59/13455928   540w,
                                                  https://s2-g1.glbimg.com/yOYR1Hx7KxDusugeP9e5HC1vMr0=/0x0:1920x1080/810x456/smart/filters:max_age(3600)/http://s01.video.glbimg.com/deo/vi/28/59/13455928   810w,
                                                  https://s2-g1.glbimg.com/P8RGERsZDmqB83TvOz15WUP6ek8=/0x0:1920x1080/1080x608/smart/filters:max_age(3600)/http://s01.video.glbimg.com/deo/vi/28/59/13455928 1080w
                                                "
                                                sizes="(min-width: 540px) 50vw, (min-width: 900px) 30vw, 100vw"
                                                src="https://s2-g1.glbimg.com/h0JZdePeSlzo1cTBNEdmy9AuKn0=/0x0:1920x1080/540x304/smart/filters:max_age(3600)/http://s01.video.glbimg.com/deo/vi/28/59/13455928"
                                            /></picture>
                                            <div class="feed-cover-content">
                                              <div class="bstn-fd-play-button">
                                                <div
                                                  class="bstn-fd-video-play"
                                                ></div>
                                                <p
                                                  class="feed-post-video-duration"
                                                >
                                                  16 seg
                                                </p>
                                              </div>
                                              <img
                                                class="feed-post-video-trademark"
                                                src="https://s3.glbimg.com/v1/AUTH_180b9dd048d9434295d27c4b6dadc248/media_kit/program/trademark/5e8a/5e8af12e97eadc41.svg"
                                                loading="lazy"
                                              />
                                            </div></div
                                        ></a>
                                      </div>
                                      <div class="feed-post-metadata">
                                        <span class="feed-post-datetime"
                                          >Há 2 horas</span
                                        ><span
                                          class="feed-post-metadata-section"
                                        >
                                          Política
                                        </span>
                                      </div>
                                      <div class="bstn-related">
                                        <ul
                                          class="bstn-relateditems"
                                          ref="[object Object]"
                                        >
                                          <li class="bstn-relateditem">
                                            <div class="bstn-fd-relatedtext">
                                              <a
                                                class="gui-color-primary gui-color-hover feed-post-body-title bstn-relatedtext"
                                                href="https://g1.globo.com/politica/noticia/2025/03/25/quem-e-sebastiao-coelho-detido-por-desacato-apos-gritar-no-stf-e-investigado-pelo-cnj-por-suspeita-de-incitar-atos-golpistas.ghtml"
                                                >Detido é ex-desembargador
                                                investigado por incitar atos
                                                antidemocráticos</a
                                              >
                                              <div class="feed-post-metadata">
                                                <span class="feed-post-datetime"
                                                  >Há 2 horas</span
                                                >
                                              </div>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="_evt">
                                <div
                                  class="bastian-feed-item"
                                  data-type="advertise"
                                  data-index="5"
                                >
                                  <div class="bstn-feed-ad">
                                    <div class="_preempt-visibility">
                                      <div class="bstn-ad-smart">
                                        <div
                                          class="bstn-ad-rail bstn-ad-rail--expanded"
                                          style="
                                            --smart-ad-height: 454px;
                                            min-height: 226px;
                                          "
                                        >
                                          <div>
                                            <div
                                              class="content-ads__skeleton glb-skeleton-box"
                                              style="
                                                --skeleton-width: 100%;
                                                --skeleton-height: 454px;
                                              "
                                            ></div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="_evt">
                                <div
                                  class="bastian-feed-item"
                                  data-type="materia"
                                  data-index="6"
                                  data-trending-video-check="true"
                                >
                                  <div
                                    class="feed-post bstn-item-shape type-materia"
                                    id="cfca0a3a-bf00-4e5a-982b-f219642bb8dc"
                                  >
                                    <div class="feed-post-body">
                                      <div
                                        class="feed-post-header with-post-chapeu"
                                      >
                                        <span class="feed-post-header-chapeu"
                                          >O que está em jogo</span
                                        >
                                      </div>
                                      <div
                                        class="feed-post-body-title gui-color-primary gui-color-hover"
                                        ref="[object Object]"
                                      >
                                        <div class="_evt">
                                          <h2>
                                            <a
                                              href="https://g1.globo.com/politica/noticia/2025/03/25/bolsonaro-pode-ser-preso-entenda-possiveis-consequencias-de-julgamento-da-denuncia-do-golpe.ghtml"
                                              class="feed-post-link gui-color-primary gui-color-hover"
                                              ><p elementtiming="text-csr">
                                                Bolsonaro pode ser preso? Veja
                                                possíveis consequências
                                              </p></a
                                            >
                                          </h2>
                                        </div>
                                      </div>
                                      <div class="feed-media-wrapper">
                                        <a
                                          href="https://g1.globo.com/politica/noticia/2025/03/25/bolsonaro-pode-ser-preso-entenda-possiveis-consequencias-de-julgamento-da-denuncia-do-golpe.ghtml"
                                          class="feed-post-figure-link gui-image-hover"
                                          ref="[object Object]"
                                          ><div class="bstn-fd-item-cover">
                                            <picture
                                              class="bstn-fd-cover-picture"
                                              ><img
                                                class="bstn-fd-picture-image"
                                                alt="Bolsonaro pode ser preso? Veja possíveis consequências - Foto: (Sergio Lima / AFP)"
                                                title="Bolsonaro pode ser preso? Veja possíveis consequências - Foto: (Sergio Lima / AFP)"
                                                loading="lazy"
                                                elementtiming="image-csr"
                                                srcset="
                                                  https://s2-g1.glbimg.com/BqHTub3lLQ36oc7eYEGjdb7Pjkk=/156x93:881x501/540x304/smart/filters:max_age(3600)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/5/f/1fjuIkTRGfsbDIbrMtWQ/000-37rx3cx.jpg   540w,
                                                  https://s2-g1.glbimg.com/bD1-dihxVzmfzXLok6Ix-rwD8UA=/156x93:881x501/810x456/smart/filters:max_age(3600)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/5/f/1fjuIkTRGfsbDIbrMtWQ/000-37rx3cx.jpg   810w,
                                                  https://s2-g1.glbimg.com/7qfzRzVRPbuDc7YHmUGuWxFpzmU=/156x93:881x501/1080x608/smart/filters:max_age(3600)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/5/f/1fjuIkTRGfsbDIbrMtWQ/000-37rx3cx.jpg 1080w
                                                "
                                                sizes="(min-width: 540px) 50vw, (min-width: 900px) 30vw, 100vw"
                                                src="https://s2-g1.glbimg.com/BqHTub3lLQ36oc7eYEGjdb7Pjkk=/156x93:881x501/540x304/smart/filters:max_age(3600)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/5/f/1fjuIkTRGfsbDIbrMtWQ/000-37rx3cx.jpg"
                                            /></picture></div
                                        ></a>
                                      </div>
                                      <div class="feed-post-metadata">
                                        <span class="feed-post-datetime"
                                          >Há 17 horas</span
                                        ><span
                                          class="feed-post-metadata-section"
                                        >
                                          Política
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="_evt">
                                <div
                                  class="bastian-feed-item"
                                  data-type="post-playlist"
                                  data-index="7"
                                >
                                  <div class="_he">
                                    <div class="post-item">
                                      <div class="bstn-item-shape">
                                        <div
                                          class="post-playlist"
                                          data-on-viewport="false"
                                        >
                                          <div class="slider-container">
                                            <div
                                              class="slider-container__header"
                                            >
                                              <a
                                                class="slider-container__header__title"
                                                href="https://g1.globo.com/politica/politico/edicao/2025/03/25/videos-comeca-o-julgamento-de-bolsonaro-e-aliados-por-trama-golpista.ghtml"
                                                ><p>
                                                  VÍDEOS: os principais momentos
                                                  do julgamento sobre
                                                  Bolsonaro...
                                                </p></a
                                              >
                                              <div
                                                class="slider-container__header__arrows"
                                              >
                                                <span
                                                  class="slider-container__header__arrows__icon--disabled"
                                                ></span
                                                ><span
                                                  class="slider-container__header__arrows__icon"
                                                ></span>
                                              </div>
                                            </div>
                                            <div
                                              class="slider-container__wrapper"
                                            >
                                              <a
                                                class="media-wrapper-slider"
                                                href="https://g1.globo.com/politica/politico/edicao/2025/03/25/videos-comeca-o-julgamento-de-bolsonaro-e-aliados-por-trama-golpista.ghtml#video-13457396-id"
                                              ></a>
                                              <div>
                                                <a
                                                  class="media-wrapper-slider"
                                                  href="https://g1.globo.com/politica/politico/edicao/2025/03/25/videos-comeca-o-julgamento-de-bolsonaro-e-aliados-por-trama-golpista.ghtml#video-13457396-id"
                                                  ><div
                                                    class="bstn-fd-item-cover"
                                                  >
                                                    <picture
                                                      class="bstn-fd-cover-picture"
                                                      ><div
                                                        class="post-playlist-badge post-playlist-badge--slideshow"
                                                      >
                                                        <div
                                                          class="post-playlist-badge__icon"
                                                        ></div>
                                                        <span
                                                          class="post-playlist-badge__info"
                                                        >
                                                          3 min
                                                        </span>
                                                      </div>
                                                      <div
                                                        class="media-wrapper-slider__cover"
                                                      >
                                                        <div
                                                          class="thumbnail-image"
                                                          style="
                                                            background-image: url('https://s2-g1.glbimg.com/BNcl9vLvAUxIuXrBOGaZ6Dn13GQ=/427x240/s01.video.glbimg.com/deo/vi/96/73/13457396');
                                                          "
                                                        ></div></div
                                                    ></picture></div
                                                ></a>
                                                <div
                                                  class="feed-text-wrapper-slider"
                                                >
                                                  <a
                                                    class="media-wrapper-slider"
                                                    href="https://g1.globo.com/politica/politico/edicao/2025/03/25/videos-comeca-o-julgamento-de-bolsonaro-e-aliados-por-trama-golpista.ghtml#video-13457396-id"
                                                  ></a
                                                  ><a
                                                    >Cármen Lúcia brinca sobre
                                                    idade de Dino: 'há um
                                                    pequeno lapso em seu
                                                    calendário'</a
                                                  >
                                                </div>
                                              </div>
                                              <a
                                                class="media-wrapper-slider"
                                                href="https://g1.globo.com/politica/politico/edicao/2025/03/25/videos-comeca-o-julgamento-de-bolsonaro-e-aliados-por-trama-golpista.ghtml#video-13457385-id"
                                              ></a>
                                              <div>
                                                <a
                                                  class="media-wrapper-slider"
                                                  href="https://g1.globo.com/politica/politico/edicao/2025/03/25/videos-comeca-o-julgamento-de-bolsonaro-e-aliados-por-trama-golpista.ghtml#video-13457385-id"
                                                  ><div
                                                    class="bstn-fd-item-cover"
                                                  >
                                                    <picture
                                                      class="bstn-fd-cover-picture"
                                                      ><div
                                                        class="post-playlist-badge post-playlist-badge--slideshow"
                                                      >
                                                        <div
                                                          class="post-playlist-badge__icon"
                                                        ></div>
                                                        <span
                                                          class="post-playlist-badge__info"
                                                        >
                                                          3 min
                                                        </span>
                                                      </div>
                                                      <div
                                                        class="media-wrapper-slider__cover"
                                                      >
                                                        <div
                                                          class="thumbnail-image"
                                                          style="
                                                            background-image: url('https://s2-g1.glbimg.com/1dDuFnRyFk1WXbYWgxJJMC0KafM=/427x240/s02.video.glbimg.com/deo/vi/85/73/13457385');
                                                          "
                                                        ></div></div
                                                    ></picture></div
                                                ></a>
                                                <div
                                                  class="feed-text-wrapper-slider"
                                                >
                                                  <a
                                                    class="media-wrapper-slider"
                                                    href="https://g1.globo.com/politica/politico/edicao/2025/03/25/videos-comeca-o-julgamento-de-bolsonaro-e-aliados-por-trama-golpista.ghtml#video-13457385-id"
                                                  ></a
                                                  ><a
                                                    >Fux abre divergência e diz
                                                    que caso deveria ser
                                                    analisado pelo plenário do
                                                    STF</a
                                                  >
                                                </div>
                                              </div>
                                              <a
                                                class="media-wrapper-slider"
                                                href="https://g1.globo.com/politica/politico/edicao/2025/03/25/videos-comeca-o-julgamento-de-bolsonaro-e-aliados-por-trama-golpista.ghtml#video-13457365-id"
                                              ></a>
                                              <div>
                                                <a
                                                  class="media-wrapper-slider"
                                                  href="https://g1.globo.com/politica/politico/edicao/2025/03/25/videos-comeca-o-julgamento-de-bolsonaro-e-aliados-por-trama-golpista.ghtml#video-13457365-id"
                                                  ><div
                                                    class="bstn-fd-item-cover"
                                                  >
                                                    <picture
                                                      class="bstn-fd-cover-picture"
                                                      ><div
                                                        class="post-playlist-badge post-playlist-badge--slideshow"
                                                      >
                                                        <div
                                                          class="post-playlist-badge__icon"
                                                        ></div>
                                                        <span
                                                          class="post-playlist-badge__info"
                                                        >
                                                          28 seg
                                                        </span>
                                                      </div>
                                                      <div
                                                        class="media-wrapper-slider__cover"
                                                      >
                                                        <div
                                                          class="thumbnail-image"
                                                          style="
                                                            background-image: url('https://s2-g1.glbimg.com/bKm8rbNKZza9khh3Y2UU7KC6uCY=/427x240/s02.video.glbimg.com/deo/vi/65/73/13457365');
                                                          "
                                                        ></div></div
                                                    ></picture></div
                                                ></a>
                                                <div
                                                  class="feed-text-wrapper-slider"
                                                >
                                                  <a
                                                    class="media-wrapper-slider"
                                                    href="https://g1.globo.com/politica/politico/edicao/2025/03/25/videos-comeca-o-julgamento-de-bolsonaro-e-aliados-por-trama-golpista.ghtml#video-13457365-id"
                                                  ></a
                                                  ><a
                                                    >'Pedir vênia', 'document
                                                    dumping', 'fishing
                                                    expedition': o que
                                                    significam termos usados
                                                    no...</a
                                                  >
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="_evt">
                                <div
                                  class="bastian-feed-item"
                                  data-type="post-agrupador-materia-desktop-minicapa"
                                  data-index="8"
                                >
                                  <div class="_he">
                                    <div class="post-item">
                                      <div class="bstn-item-shape">
                                        <div
                                          class="post-agrupador-materia theme"
                                        >
                                          <div
                                            style="
                                              display: flex;
                                              align-items: center;
                                              justify-content: space-between;
                                              min-height: 32px;
                                            "
                                          >
                                            <h2
                                              style="
                                                font-family: opensans,
                                                  opensans-bastian, Arial,
                                                  sans-serif;
                                                font-size: 1rem;
                                                font-weight: bold;
                                                letter-spacing: -0.4px;
                                                color: rgb(51, 51, 51);
                                                line-height: 20px;
                                              "
                                            >
                                              Análises
                                            </h2>
                                            <div
                                              style="
                                                display: flex;
                                                align-items: center;
                                                gap: 12px;
                                                padding: 0px 12px;
                                                height: 32px;
                                              "
                                            >
                                              <glb-ad
                                                data-position="banner_insert_box__a1d654f1-8e5f-4f78-ad0b-38d247164517"
                                                data-targeting="{}"
                                                width="300"
                                                height="32"
                                                style="width: 300px"
                                                ><div
                                                  id="banner_insert_box__a1d654f1-8e5f-4f78-ad0b-38d247164517"
                                                ></div
                                              ></glb-ad>
                                            </div>
                                          </div>
                                          <ul
                                            style="
                                              transition: height 2s;
                                              display: flex;
                                            "
                                          >
                                            <li
                                              style="
                                                border-top: 0px;
                                                padding: 1rem 0px 0px;
                                                position: relative;
                                                width: 50%;
                                              "
                                            >
                                              <div
                                                style="margin-bottom: 1.5rem"
                                              >
                                                <a
                                                  href="https://g1.globo.com/politica/blog/octavio-guedes/post/2025/03/25/zanin-ouviu-as-mesmas-reclamacoes-que-fazia-quando-era-advogado-de-lula.ghtml"
                                                  class="gui-color-primary"
                                                  style="
                                                    font-size: 1rem;
                                                    line-height: 20px;
                                                    letter-spacing: -1px;
                                                    font-family: opensans,
                                                      opensans-bastian, Arial,
                                                      sans-serif;
                                                    font-weight: 700;
                                                  "
                                                  ><div>
                                                    <div
                                                      class="feed-post-body-title gui-color-primary gui-color-hover"
                                                    >
                                                      <div class="_evt">
                                                        OCTAVIO: Zanin ouve as
                                                        queixas que fazia como
                                                        advogado de Lula
                                                      </div>
                                                    </div>
                                                  </div></a
                                                >
                                              </div>
                                              <a
                                                href="https://g1.globo.com/politica/blog/octavio-guedes/post/2025/03/25/zanin-ouviu-as-mesmas-reclamacoes-que-fazia-quando-era-advogado-de-lula.ghtml"
                                                class="gui-color-primary"
                                                style="
                                                  font-size: 1rem;
                                                  line-height: 20px;
                                                  letter-spacing: -1px;
                                                  font-family: opensans,
                                                    opensans-bastian, Arial,
                                                    sans-serif;
                                                  font-weight: 700;
                                                "
                                                ><img
                                                  src="https://s2-g1.glbimg.com/Xb0YbjVeskTJexEP2Pb4P75I_Cs=/0x355:1387x1139/540x304/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/Z/O/oxwu3rSzGQp6Jdc7AnIA/54409814558-2442e9d6cd-k.jpg"
                                                  width="540"
                                                  height="304"
                                                  alt="Foto: (Primeira Turma do STF discute denúncia contra Bolsonaro / Rosinei Coutinho/STF)"
                                                  style="
                                                    width: 95%;
                                                    height: 200px;
                                                  "
                                              /></a>
                                            </li>
                                            <ul
                                              style="
                                                padding: 0px 1.5rem;
                                                transition: height 2s;
                                                width: 50%;
                                                display: flex;
                                                flex-direction: column;
                                                justify-content: space-between;
                                              "
                                            >
                                              <li
                                                style="
                                                  padding: 1rem 0px;
                                                  position: relative;
                                                  display: flex;
                                                  justify-content: space-between;
                                                "
                                              >
                                                <a
                                                  href="https://g1.globo.com/politica/blog/valdo-cruz/post/2025/03/25/defesas-nao-negam-tentativa-de-golpe-mas-ressaltam-que-seus-clientes-nao-participaram.ghtml"
                                                  class="gui-color-primary"
                                                  style="
                                                    font-size: 1rem;
                                                    line-height: 20px;
                                                    letter-spacing: -1px;
                                                    font-family: opensans,
                                                      opensans-bastian, Arial,
                                                      sans-serif;
                                                    font-weight: 700;
                                                  "
                                                  ><img
                                                    src="https://s2-g1.glbimg.com/MweCupqhcCRZo1j8mXXiSDqmH5A=/0x10:3543x2012/112x63/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/7/D/znBViOSf64AYbUCJ1QTw/2025-03-25t134129z-711763467-rc2dkdaqc2dv-rtrmadp-3-brazil-bolsonaro.jpg"
                                                    width="112"
                                                    height="63"
                                                    alt="Foto: (Bolsonaro acompanhe julgamento na 1ª Turma do STF ao lado de advogados / Gustavo Moreno//STF/Reuters)"
                                                    style="
                                                      float: right;
                                                      margin: 0px 1rem;
                                                    "
                                                /></a>
                                                <div>
                                                  <a
                                                    href="https://g1.globo.com/politica/blog/valdo-cruz/post/2025/03/25/defesas-nao-negam-tentativa-de-golpe-mas-ressaltam-que-seus-clientes-nao-participaram.ghtml"
                                                    class="gui-color-primary"
                                                    style="
                                                      font-size: 1rem;
                                                      line-height: 20px;
                                                      letter-spacing: -1px;
                                                      font-family: opensans,
                                                        opensans-bastian, Arial,
                                                        sans-serif;
                                                      font-weight: 700;
                                                    "
                                                    >VALDO CRUZ: Advogados não
                                                    negam tentativa de golpe</a
                                                  >
                                                </div>
                                              </li>
                                              <li
                                                style="
                                                  padding: 1rem 0px;
                                                  position: relative;
                                                  display: flex;
                                                  justify-content: space-between;
                                                  border-top: 1px solid
                                                    rgb(238, 238, 238);
                                                "
                                              >
                                                <a
                                                  href="https://g1.globo.com/politica/blog/daniela-lima/post/2025/03/25/voto-fechado-no-fim-de-semana-concentracao-e-checagem-de-seguranca-os-bastidores-do-julgamento-de-bolsonaro-no-stf.ghtml"
                                                  class="gui-color-primary"
                                                  style="
                                                    font-size: 1rem;
                                                    line-height: 20px;
                                                    letter-spacing: -1px;
                                                    font-family: opensans,
                                                      opensans-bastian, Arial,
                                                      sans-serif;
                                                    font-weight: 700;
                                                  "
                                                  ><img
                                                    src="https://s2-g1.glbimg.com/DoX72JgyQMb_9gWIk5-mxepMkI8=/261x100:1953x1056/112x63/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/M/Z/wrOwzBSvStyKtlhvUDSQ/54409549944-baebfdce5f-k.jpg"
                                                    width="112"
                                                    height="63"
                                                    alt="Foto: (Moraes durante julgamento da denúncia do golpe / Antonio Augusto/STF)"
                                                    style="
                                                      float: right;
                                                      margin: 0px 1rem;
                                                    "
                                                /></a>
                                                <div>
                                                  <a
                                                    href="https://g1.globo.com/politica/blog/daniela-lima/post/2025/03/25/voto-fechado-no-fim-de-semana-concentracao-e-checagem-de-seguranca-os-bastidores-do-julgamento-de-bolsonaro-no-stf.ghtml"
                                                    class="gui-color-primary"
                                                    style="
                                                      font-size: 1rem;
                                                      line-height: 20px;
                                                      letter-spacing: -1px;
                                                      font-family: opensans,
                                                        opensans-bastian, Arial,
                                                        sans-serif;
                                                      font-weight: 700;
                                                    "
                                                    >DANIELA LIMA: Moraes só
                                                    conclui seu voto no fim de
                                                    semana</a
                                                  >
                                                </div>
                                              </li>
                                              <li
                                                style="
                                                  padding: 1rem 0px;
                                                  position: relative;
                                                  display: flex;
                                                  justify-content: space-between;
                                                  border-top: 1px solid
                                                    rgb(238, 238, 238);
                                                "
                                              >
                                                <a
                                                  href="https://g1.globo.com/politica/blog/natuza-nery/post/2025/03/25/julgamento-historico-que-decidira-se-bolsonaro-vira-reu-por-tentativa-de-golpe-deve-terminar-na-quarta-e-ser-unanime.ghtml"
                                                  class="gui-color-primary"
                                                  style="
                                                    font-size: 1rem;
                                                    line-height: 20px;
                                                    letter-spacing: -1px;
                                                    font-family: opensans,
                                                      opensans-bastian, Arial,
                                                      sans-serif;
                                                    font-weight: 700;
                                                  "
                                                  ><img
                                                    src="https://s2-g1.glbimg.com/R4yUv_VYBDX8bgFOX6DJ5ukfJJ0=/0x361:3543x2363/112x63/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/4/p/rcXYDISvyXf1zmKWiB6w/54409368116-4849b668cd-o.jpg"
                                                    width="112"
                                                    height="63"
                                                    alt="Foto: (Julgamento de Bolsonaro e aliados por trama golpista na 1ª Turma do STF / Antonio Augusto/STF)"
                                                    style="
                                                      float: right;
                                                      margin: 0px 1rem;
                                                    "
                                                /></a>
                                                <div>
                                                  <a
                                                    href="https://g1.globo.com/politica/blog/natuza-nery/post/2025/03/25/julgamento-historico-que-decidira-se-bolsonaro-vira-reu-por-tentativa-de-golpe-deve-terminar-na-quarta-e-ser-unanime.ghtml"
                                                    class="gui-color-primary"
                                                    style="
                                                      font-size: 1rem;
                                                      line-height: 20px;
                                                      letter-spacing: -1px;
                                                      font-family: opensans,
                                                        opensans-bastian, Arial,
                                                        sans-serif;
                                                      font-weight: 700;
                                                    "
                                                    >NATUZA: STF deve tornar
                                                    Bolsonaro réu em decisão
                                                    unânime</a
                                                  >
                                                </div>
                                              </li>
                                            </ul>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="_evt">
                                <div
                                  class="bastian-feed-item"
                                  data-type="advertise"
                                  data-index="9"
                                >
                                  <div class="bstn-feed-ad">
                                    <div class="_preempt-visibility">
                                      <div class="bstn-ad-smart">
                                        <div
                                          class="bstn-ad-rail bstn-ad-rail--expanded"
                                          style="
                                            --smart-ad-height: 454px;
                                            min-height: 226px;
                                          "
                                        >
                                          <div>
                                            <div
                                              class="content-ads__skeleton glb-skeleton-box"
                                              style="
                                                --skeleton-width: 100%;
                                                --skeleton-height: 454px;
                                              "
                                            ></div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="_evt">
                                <div
                                  class="bastian-feed-item"
                                  data-type="materia"
                                  data-index="10"
                                  data-trending-video-check="true"
                                >
                                  <div
                                    class="feed-post bstn-item-shape type-materia"
                                    id="e582086f-4d04-4e00-b64c-feb0a574ca9f"
                                  >
                                    <div class="feed-post-body">
                                      <div
                                        class="feed-post-header with-post-chapeu"
                                      >
                                        <span class="feed-post-header-chapeu"
                                          >Blog da Andréia Sadi</span
                                        >
                                      </div>
                                      <div
                                        class="feed-post-body-title gui-color-primary gui-color-hover"
                                        ref="[object Object]"
                                      >
                                        <div class="_evt">
                                          <h2>
                                            <a
                                              href="https://g1.globo.com/politica/blog/andreia-sadi/post/2025/03/25/e-trazer-muito-peso-para-as-minhas-costas-diz-zambelli-apos-bolsonaro-culpa-la-pela-derrota-em-2022.ghtml"
                                              class="feed-post-link gui-color-primary gui-color-hover"
                                              ><p elementtiming="text-csr">
                                                Zambelli reage após Bolsonaro
                                                culpá-la por derrota: 'Não é
                                                justo'
                                              </p></a
                                            >
                                          </h2>
                                        </div>
                                      </div>
                                      <div class="feed-media-wrapper">
                                        <a
                                          href="https://g1.globo.com/politica/blog/andreia-sadi/post/2025/03/25/e-trazer-muito-peso-para-as-minhas-costas-diz-zambelli-apos-bolsonaro-culpa-la-pela-derrota-em-2022.ghtml"
                                          class="feed-post-figure-link gui-image-hover"
                                          ref="[object Object]"
                                          ><div class="bstn-fd-item-cover">
                                            <picture
                                              class="bstn-fd-cover-picture"
                                              ><img
                                                class="bstn-fd-picture-image"
                                                alt="Zambelli reage após Bolsonaro culpá-la por derrota: 'Não é justo' - Foto: (MATEUS BONOMI/AGIF - AGÊNCIA DE FOTOGRAFIA/AGIF - AGÊNCIA DE)"
                                                title="Zambelli reage após Bolsonaro culpá-la por derrota: 'Não é justo' - Foto: (MATEUS BONOMI/AGIF - AGÊNCIA DE FOTOGRAFIA/AGIF - AGÊNCIA DE)"
                                                loading="lazy"
                                                elementtiming="image-csr"
                                                srcset="
                                                  https://s2-g1.glbimg.com/L86fE_NjffeC530WOVc4t_i8vuY=/0x284:3900x2478/540x304/smart/filters:max_age(3600)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/T/o/Vm1IZ3RiOVFchkhXzk5w/agf20230802012.jpg   540w,
                                                  https://s2-g1.glbimg.com/GJlYy3IEHY4U_f6Ji39h0tcp6kU=/0x284:3900x2478/810x456/smart/filters:max_age(3600)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/T/o/Vm1IZ3RiOVFchkhXzk5w/agf20230802012.jpg   810w,
                                                  https://s2-g1.glbimg.com/96CC-rP9fuHxUGW11WeEe4GAKnc=/0x284:3900x2478/1080x608/smart/filters:max_age(3600)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/T/o/Vm1IZ3RiOVFchkhXzk5w/agf20230802012.jpg 1080w
                                                "
                                                sizes="(min-width: 540px) 50vw, (min-width: 900px) 30vw, 100vw"
                                                src="https://s2-g1.glbimg.com/L86fE_NjffeC530WOVc4t_i8vuY=/0x284:3900x2478/540x304/smart/filters:max_age(3600)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/T/o/Vm1IZ3RiOVFchkhXzk5w/agf20230802012.jpg"
                                            /></picture></div
                                        ></a>
                                      </div>
                                      <div class="feed-post-metadata">
                                        <span class="feed-post-datetime"
                                          >Há 5 horas</span
                                        ><span
                                          class="feed-post-metadata-section"
                                        >
                                          Blog da Andréia Sadi
                                        </span>
                                      </div>
                                      <div class="bstn-related">
                                        <ul
                                          class="bstn-relateditems"
                                          ref="[object Object]"
                                        >
                                          <li class="bstn-relateditem">
                                            <div class="bstn-fd-relatedtext">
                                              <a
                                                class="gui-color-primary gui-color-hover feed-post-body-title bstn-relatedtext"
                                                href="https://g1.globo.com/politica/noticia/2025/03/25/apos-pedido-de-vista-stf-tem-maioria-de-votos-pra-condenar-zambelli.ghtml"
                                                >STF tem maioria de votos para
                                                condenar e cassar Zambelli
                                              </a>
                                              <div class="feed-post-metadata">
                                                <span class="feed-post-datetime"
                                                  >Há 5 horas</span
                                                >
                                              </div>
                                            </div>
                                          </li>
                                          <li class="bstn-relateditem">
                                            <div class="bstn-fd-relatedtext">
                                              <a
                                                class="gui-color-primary gui-color-hover feed-post-body-title bstn-relatedtext"
                                                href="https://g1.globo.com/sp/sao-paulo/noticia/2025/03/25/tre-sp-nega-recurso-e-mantem-cassacao-do-mandato-da-deputada-carla-zambelli.ghtml"
                                                >TRE-SP nega recurso e mantém
                                                cassação da deputada</a
                                              >
                                              <div class="feed-post-metadata">
                                                <span class="feed-post-datetime"
                                                  >Há 5 horas</span
                                                >
                                              </div>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="load-more gui-color-primary-bg">
                        <a href="https://g1.globo.com/index/feed/pagina-4.ghtml"
                          >Veja mais</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <link
                id="bstn-external-style"
                type="text/css"
                rel="stylesheet"
                data-href="https://s3.glbimg.com/v1/AUTH_f7772c2cb2fd4af2bb8929c0ae6fdba7/dsframework/build/mr_375037/client/bastian-20250107cdb873289794f38e6bfa0a6f8cde2b.rest.css"
                href="https://s3.glbimg.com/v1/AUTH_f7772c2cb2fd4af2bb8929c0ae6fdba7/dsframework/build/mr_375037/client/bastian-20250107cdb873289794f38e6bfa0a6f8cde2b.rest.css"
              /><link
                id="bstn-components-style"
                type="text/css"
                rel="stylesheet"
                href="https://s3.glbimg.com/v1/AUTH_c631e406debd4c4fac98a09d48dc17d1/bastian-post/prod/g1/4560394a-9470-49fa-a74c-fe0c4470fc13/bd19ded8-0a20-4123-9aa0-5cbf120a7bec.css"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
`;

// const textoSimples = extractHierarchicalText3(html);
// console.log(textoSimples);



const dom = new JSDOM(html);
const body = dom.window.document.body;

const indentedText = getIndentedText(body);
console.log(indentedText);