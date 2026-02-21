import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;
const isLocalConnection =
  connectionString?.includes('localhost') || connectionString?.includes('127.0.0.1');

export const pool = new Pool({
  connectionString,
  ssl: isLocalConnection ? false : { rejectUnauthorized: false },
});

export async function query(text, params = []) {
  return pool.query(text, params);
}
