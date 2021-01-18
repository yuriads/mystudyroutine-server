exports.up = function(knex) {
    // o metodo up sempre vai ser para criar uma nova tabela
  // Para criar uma nova tabela
  return knex.schema.createTable('subjects', function(table) {
    table.increments('id').primary();//transforma essa coluna em uma primary Key com auto incremento
    table.string('day').notNullable();
    table.string('name').notNullable();//o notNullablee faz com que esse campo não seja nulo
    table.time('start').notNullable();
    table.time('finish').notNullable();
    table.integer('disable').notNullable();//modificar depois para inicializar com 0

    table.string('id_student').notNullable();

    table.foreign('id_student').references('id').inTable('students');//criando uma chave estrangeira
  });
};

exports.down = function(knex) {
  //o método down é para se acontecer algum problema temos o que saber o que desfazer
  return knex.schema.dropTable('subjects');//deletando a tabela caso algo der errado
};