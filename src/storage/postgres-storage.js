const { Pool } = require('pg');

class PostgresStorage {
  constructor(config) {
    this.pool = new Pool({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database
    });
    this.initializeDatabase();
  }

  async initializeDatabase() {
    const client = await this.pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS data (
          key TEXT PRIMARY KEY,
          value JSONB
        )
      `);
    } finally {
      client.release();
    }
  }

  async get(key) {
    const client = await this.pool.connect();
    try {
      const result = await client.query('SELECT value FROM data WHERE key = $1', [key]);
      return result.rows[0] ? result.rows[0].value : null;
    } finally {
      client.release();
    }
  }

  async set(key, value) {
    const client = await this.pool.connect();
    try {
      await client.query(
        'INSERT INTO data (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2', 
        [key, value]
      );
    } finally {
      client.release();
    }
  }

  async delete(key) {
    const client = await this.pool.connect();
    try {
      await client.query('DELETE FROM data WHERE key = $1', [key]);
    } finally {
      client.release();
    }
  }
}

module.exports = PostgresStorage;