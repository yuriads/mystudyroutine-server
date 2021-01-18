exports.up = function(knex) {
    // o metodo up sempre vai ser para criar uma nova tabela
  // Para criar uma nova tabela
  return knex.schema.createTable('students', function(table) {
    table.string('id').primary();
    table.string('registration').unique().notNullable();
    table.string('name').notNullable();//o notNullablee faz com que esse campo não seja nulo
    table.string('shift').notNullable();
    table.string('course').notNullable();
    table.date('date_start').notNullable();
    table.date('date_finish').notNullable();
    table.string('description');
    table.integer('count_performance').defaultTo(0);//modificar depois para inicializar com ZERO
    table.integer('performance').defaultTo(0);

    table.string('user_email').notNullable();

    table.foreign('user_email').references('email').inTable('users');//criando uma chave estrangeira

  });
};

exports.down = function(knex) {
  //o método down é para se acontecer algum problema temos o que saber o que desfazer
  return knex.schema.dropTable('students');//deletando a tabela caso algo der errado
};