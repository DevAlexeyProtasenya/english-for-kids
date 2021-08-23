import { Pool } from 'pg';

export default new Pool ({
  max: 100,
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  idleTimeoutMillis: 30000
})
