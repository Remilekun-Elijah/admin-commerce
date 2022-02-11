/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("account", table =>{
    table.string("id").primary(),
    table.string('full_name').notNullable(),
    table.string('email').unique(),
    table.string('password').notNullable(),
    table.enum("status").defaultsTo("pending");
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('account');
};
