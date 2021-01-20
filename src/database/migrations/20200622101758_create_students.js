exports.up = function(knex) {
  return knex.schema.createTable('students', function(table) {
    table.string('id').primary();
    table.string('registration').unique().notNullable();
    table.string('name').notNullable();
    table.string('shift').notNullable();
    table.string('course').notNullable();
    table.date('date_start').notNullable();
    table.date('date_finish').notNullable();
    table.string('description');
    table.integer('count_performance').defaultTo(0);
    table.integer('performance').defaultTo(0);
    table.integer('week').defaultTo(0);

    table.string('user_email').notNullable();

    table.foreign('user_email').references('email').inTable('users');

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('students');
};