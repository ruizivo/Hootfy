const { JSDOM } = require("jsdom");

class HTMLCleaner {
  static clean(html, removeElements = [], includeElements = []) {
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Se tiver include_elements, só mantém esses elementos
    if (includeElements && includeElements.length > 0) {
      // Cria um novo documento apenas com os elementos incluídos
      const newDocument = new JSDOM('<html><body></body></html>').window.document;
      
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
    const text = JSDOM.fragment(html).textContent;
    return text;
  }
}

module.exports = HTMLCleaner;