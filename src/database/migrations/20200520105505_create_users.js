exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.string('email').primary();
    table.string('name').notNullable();
    table.string('password').notNullable();
    table.string('password2').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};