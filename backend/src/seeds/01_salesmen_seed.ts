import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex.raw(`TRUNCATE TABLE salesmen RESTART IDENTITY CASCADE`);

  await knex("salesmen").insert([
    { id: 1, name: "John Smith", previous_year_sales: 490000 },
    { id: 2, name: "Richard Porter", previous_year_sales: 1000000 },
    { id: 3, name: "Tony Grid", previous_year_sales: 650000 },
  ]);
}
