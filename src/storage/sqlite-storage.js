// const sqlite3 = require('sqlite3').verbose();

// class SqliteStorage {
//   constructor(dbPath) {
//     this.db = new sqlite3.Database(dbPath);
//     this.initializeDatabase();
//   }

//   initializeDatabase() {
//     this.db.run(`
//       CREATE TABLE IF NOT EXISTS data (
//         key TEXT PRIMARY KEY,
//         value TEXT
//       )
//     `);
//   }

//   get(key) {
//     return new Promise((resolve, reject) => {
//       this.db.get('SELECT value FROM data WHERE key = ?', [key], (err, row) => {
//         if (err) reject(err);
//         resolve(row ? JSON.parse(row.value) : null);
//       });
//     });
//   }

//   set(key, value) {
//     return new Promise((resolve, reject) => {
//       this.db.run(
//         'INSERT OR REPLACE INTO data (key, value) VALUES (?, ?)', 
//         [key, JSON.stringify(value)],
//         (err) => {
//           if (err) reject(err);
//           resolve();
//         }
//       );
//     });
//   }

//   delete(key) {
//     return new Promise((resolve, reject) => {
//       this.db.run('DELETE FROM data WHERE key = ?', [key], (err) => {
//         if (err) reject(err);
//         resolve();
//       });
//     });
//   }
// }

// module.exports = SqliteStorage;