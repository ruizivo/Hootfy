const { JSDOM } = require("jsdom");

class HTMLCleaner {
  static clean(html, removeElements = [], includeElements = []) {
    
    console.log('cleaning html')
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Se tiver include_elements, só mantém esses elementos
    if (includeElements && includeElements.length > 0) {
      // Cria um novo documento apenas com os elementos incluídos
      const newDocument = new JSDOM('<html><head><meta charset="utf-8"></head><body></body></html>').window.document;
      
      // Para cada seletor de inclusão
      includeElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
          // Clona o elemento e seus filhos para o novo documento
          newDocument.body.appendChild(element.cloneNode(true));
        });
      });

      return newDocument.documentElement.outerHTML;
    }

    // Se não tiver include_elements, remove os elementos especificados
    if (removeElements && removeElements.length > 0) {
      removeElements.forEach(tag => {
        document.querySelectorAll(tag).forEach(element => {
          element.remove();
        });
      });
    }

    return document.documentElement.outerHTML;
  }

  static extractText(html) {
    console.log('extract html')
    const dom = new JSDOM(html);

    const rawText = dom.window.document.body.textContent || '';

    const lines = rawText.split('\n').map(line => line.trimEnd());

    const result = [];
    let previousWasEmpty = false;

    for (const line of lines) {
      const isEmpty = line.trim() === '';

      if (isEmpty) {
        if (!previousWasEmpty) {
          result.push(''); // mantém apenas uma linha em branco
          previousWasEmpty = true;
        }
      } else {
        result.push(line);
        previousWasEmpty = false;
      }
    }

    return result.join('\n');
  }
}

module.exports = HTMLCleaner;