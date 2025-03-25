const { JSDOM } = require("jsdom");

class HTMLCleaner {
  static clean(html, elementsToRemove = []) {
    const dom = new JSDOM(html);
    const document = dom.window.document;

    elementsToRemove.forEach(tag => {
      document.querySelectorAll(tag).forEach(element => {
        element.remove();
      });
    });

    return document.documentElement.outerHTML;
  }


  static getIndentedText(node, depth = 0) {
    let text = "";

    node.childNodes.forEach(child => {
        if (child.nodeType === 3) { // Nó de texto
            const trimmed = child.textContent.replace(/\s+/g, " ").trim();
            if (trimmed) {
                text += "  ".repeat(depth) + trimmed + "\n";
            }
        } else if (child.nodeType === 1) { // Nó de elemento
            text += this.getIndentedText(child, depth + 1);
        }
    });

    return text;
  }

  static extractText(html) {
    const dom = new JSDOM(html);
    const body = dom.window.document.body;
    
    const indentedText = HTMLCleaner.getIndentedText(body);

    return indentedText
  }
}

module.exports = HTMLCleaner;