import knex from "knex";
import { env } from "./env";

export const db = knex({
  client: "pg",
  connection: {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  },
});
