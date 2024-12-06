import type { Knex } from 'knex';

const tableName = 'tokens';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.integer('token_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('token').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(tableName);
}
