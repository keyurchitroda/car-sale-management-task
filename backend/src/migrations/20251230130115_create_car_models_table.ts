import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("car_models", (table) => {
    table.increments("id").primary();

    table.string("brand", 50).notNullable();
    table.string("class", 10).notNullable();

    table.string("model_name", 255).notNullable();
    table.string("model_code", 10).notNullable().unique();

    table.text("description").notNullable();
    table.text("features").notNullable();

    table.decimal("price", 10, 2).notNullable();
    table.timestamp("date_of_manufacturing").notNullable();

    table.boolean("active").defaultTo(true);
    table.integer("sort_order").defaultTo(0);
    table.string("default_image");
    table.specificType("images", "text[]");

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("car_models");
}
