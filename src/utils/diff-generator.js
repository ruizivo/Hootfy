const { createPatch } = require('diff');

class DiffGenerator {
  static generateDiff(oldContent, newContent) {
    const patch = createPatch('', oldContent, newContent);
    return this.parsePatch(patch);
  }

  static parsePatch(patch) {
    const changes = [];
    const lines = patch.split('\n').slice(4); // Pula cabeçalho do patch

    lines.forEach(line => {
      if (line.startsWith('-')) {
        changes.push({
          type: 'removed',
          content: line.slice(1)
        });
      } else if (line.startsWith('+')) {
        changes.push({
          type: 'added',
          content: line.slice(1)
        });
      }
    });

    return changes;
  }

  static formatChangesForWebhook(changes) {
    // Agrupar mudanças relacionadas (removidas e adicionadas próximas)
    const groupedChanges = [];
    let currentGroup = null;
    
    for (let i = 0; i < changes.length; i++) {
      const change = changes[i];
      
      if (change.type === 'removed') {
        // Iniciar um novo grupo com uma linha removida
        currentGroup = { 
          before: change.content, 
          after: null,
          isMultiLine: false
        };
        
        // Verificar se há mais linhas removidas em sequência
        let j = i + 1;
        let removedLines = [change.content];
        
        while (j < changes.length && changes[j].type === 'removed') {
          removedLines.push(changes[j].content);
          j++;
        }
        
        // Se houver múltiplas linhas removidas, juntá-las
        if (removedLines.length > 1) {
          currentGroup.before = removedLines.join('\n');
          currentGroup.isMultiLine = true;
          i = j - 1; // Atualizar o índice para pular as linhas processadas
        }
        
        // Verificar se há linhas adicionadas após as removidas
        if (i + 1 < changes.length && changes[i + 1].type === 'added') {
          let addedLines = [];
          j = i + 1;
          
          while (j < changes.length && changes[j].type === 'added') {
            addedLines.push(changes[j].content);
            j++;
          }
          
          if (addedLines.length > 0) {
            currentGroup.after = addedLines.join('\n');
            if (addedLines.length > 1) {
              currentGroup.isMultiLine = true;
            }
            i = j - 1; // Atualizar o índice para pular as linhas processadas
          }
        }
        
        groupedChanges.push(currentGroup);
      } else if (change.type === 'added' && !currentGroup) {
        // Se for uma adição sem remoção anterior, verificar se há mais adições
        let addedLines = [change.content];
        let j = i + 1;
        
        while (j < changes.length && changes[j].type === 'added') {
          addedLines.push(changes[j].content);
          j++;
        }
        
        groupedChanges.push({ 
          before: null, 
          after: addedLines.join('\n'),
          isMultiLine: addedLines.length > 1
        });
        
        i = j - 1; // Atualizar o índice para pular as linhas processadas
      }
    }
    
    return groupedChanges;
  }
}

module.exports = DiffGenerator;