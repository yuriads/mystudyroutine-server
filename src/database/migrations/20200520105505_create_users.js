exports.up = function(knex) {
    // o metodo up sempre vai ser para criar uma nova tabela
  // Para criar uma nova tabela
  return knex.schema.createTable('users', function(table) {
    //table.string('id').primary();//transforma essa coluna em uma primary Key com auto incremento
    table.string('email').primary();
    table.string('name').notNullable();//o notNullablee faz com que esse campo não seja nulo
    table.string('password').notNullable();
    table.string('password2').notNullable();
  });
};

exports.down = function(knex) {
  //o método down é para se acontecer algum problema temos o que saber o que desfazer
  return knex.schema.dropTable('users');//deletando a tabela caso algo der errado
};