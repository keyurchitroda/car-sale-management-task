import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("salesmen", (table) => {
    table.increments("id").primary();
    table.string("name", 100).notNullable();
    table.decimal("previous_year_sales", 12, 2).notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("salesmen");
}
