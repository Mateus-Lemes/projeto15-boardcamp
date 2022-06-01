import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const db = new Pool({
  user: 'postgres',
  password: 'mateus334455',
  host: 'localhost',
  port: 5432,
  database: 'boardcamp'
  });

  export default db;