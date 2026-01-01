import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("sales_transactions", (table) => {
    table.increments("id").primary();

    table
      .integer("salesman_id")
      .unsigned()
      .references("id")
      .inTable("salesmen")
      .onDelete("CASCADE")
      .notNullable();

    table
      .integer("car_model_id")
      .unsigned()
      .references("id")
      .inTable("car_models")
      .onDelete("CASCADE")
      .notNullable();

    table.integer("quantity").notNullable();
    table.timestamp("sold_at").defaultTo(knex.fn.now());

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("sales_transactions");
}
