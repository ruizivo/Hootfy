// const { JSDOM } = require("jsdom");


// function getIndentedText(node, depth = 0) {
//     let text = "";

//     node.childNodes.forEach(child => {
//         if (child.nodeType === 3) { // Nó de texto
//             const trimmed = child.textContent.replace(/\s+/g, " ").trim();
//             if (trimmed) {
//                 text += "  ".repeat(depth) + trimmed;
//             }
//         } else if (child.nodeType === 1) { // Nó de elemento
//             text += getIndentedText(child, depth + 1);
//         }
//     });

//     return text;
// }

// function getIndentedText(node, depth = 0) {
//   let text = "";
//   let currentLine = "";
//   const indent = "  ".repeat(depth);

//   node.childNodes.forEach((child, index) => {
//       if (child.nodeType === 3) { // Nó de texto
//           const trimmed = child.textContent.replace(/\s+/g, " ").trim();
//           if (trimmed) {
//               // Se o texto começa com um número seguido de ponto (ranking)
//               if (/^\d+\.$/.test(trimmed)) {
//                   if (currentLine) {
//                       text += currentLine + "\n";
//                       currentLine = "";
//                   }
//                   text += indent + trimmed + "\n";
//               } else {
//                   currentLine += (currentLine ? " " : "") + trimmed;
//               }
//           }
//       } else if (child.nodeType === 1) { // Nó de elemento
//           // Processa o conteúdo do elemento
//           const childText = getIndentedText(child, depth + 1);
          
//           if (childText.trim()) {
//               // Se já temos texto na linha atual, adiciona uma quebra
//               if (currentLine) {
//                   text += currentLine + "\n";
//                   currentLine = "";
//               }
//               text += childText;
//           }
//       }
//   });

//   // Adiciona a última linha se houver conteúdo
//   if (currentLine) {
//       text += currentLine + "\n";
//   }

//   return text;
// }



// const dom = new JSDOM(html);
// const body = dom.window.document.body;

// const indentedText = getIndentedText(body);
// console.log(indentedText);


//const { convert } = require('html-to-text');

// const html = `
//     <h1>Bem-vindo</h1>
//     <p>Este é um <strong>exemplo</strong> de conversão de HTML para texto.</p>
//     <ul>
//         <li>Item 1</li>
//         <li>Item 2</li>
//     </ul>
// `;

// const text = convert(html, {
//     wordwrap: 160, // Define a quebra de linha
//     selectors: [{ selector: 'img', format: 'skip' },{ selector: 'a', options: { ignoreHref: true } }], // Remove imagens
// });

// console.log(text);



// const { convert } = require('html-to-text');
// const axios = require('axios');

// async function fetchAndConvert() {
//     const { data: html } = await axios.get('https://g1.globo.com/');

//     const text = convert(html, {
//         wordwrap: false, // Evita quebras de linha automáticas estranhas
//         selectors: [
//             { selector: 'a', options: { ignoreHref: true } }, // Remove URLs de links
//             { selector: 'img', format: 'skip' } // Ignora imagens
//         ],
//         formatters: {
//             // Customiza listas para ficarem numeradas corretamente
//             orderedList: (elem, walk, builder) => {
//                 elem.children.forEach((li, i) => {
//                     builder.openBlock({ leadingLineBreaks: 1 });
//                     builder.addInline(`${i + 1}. `);
//                     walk(li);
//                     builder.closeBlock({ trailingLineBreaks: 1 });
//                 });
//             }
//         }
//     });

//     console.log(text);
// }

// fetchAndConvert();

const puppeteer = require('puppeteer');
const { convert } = require('html-to-text');
browser = null;

async function init() {
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

async function getPage(url){
  if (!this.browser) {
    await init();
  }
  
  const page = await this.browser.newPage();
  
  // Configurar viewport para um tamanho padrão
  await page.setViewport({ width: 1920, height: 1080 });
  
  // Navegar para a URL
  await page.goto(url, {
    waitUntil: 'networkidle0',
    timeout: 30000
  });
  
  
  // Obter o HTML da página
  const html = await page.content();

  return html;
}

async function fetchAndConvert() {
    const html  = await getPage('https://dfe-portal.svrs.rs.gov.br/Mdfe/Avisos');

    const text = convert(html, {
        wordwrap: false, // Evita quebras de linha automáticas estranhas
        selectors: [
            { selector: 'a', options: { ignoreHref: true } }, // Remove URLs de links
            { selector: 'img', format: 'skip' } // Ignora imagens
        ]
    });

    console.log(text);
}

fetchAndConvert();