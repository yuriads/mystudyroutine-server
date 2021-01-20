exports.up = function(knex) {
  return knex.schema.createTable('subjects', function(table) {
    table.increments('id').primary();
    table.string('day').notNullable();
    table.string('name').notNullable();
    table.time('start').notNullable();
    table.time('finish').notNullable();
    table.integer('disable').notNullable();

    table.string('id_student').notNullable();

    table.foreign('id_student').references('id').inTable('students');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('subjects');
};