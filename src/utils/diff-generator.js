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
    return changes.map(change => ({
      before: change.type === 'removed' ? change.content : null,
      after: change.type === 'added' ? change.content : null
    })).filter(change => change.before || change.after);
  }
}

module.exports = DiffGenerator;