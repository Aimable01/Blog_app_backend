import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "2006",
  database: "blog_app",
  port: 5432,
});
