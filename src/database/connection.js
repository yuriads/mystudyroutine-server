const knex = require('knex');
const configuration = require('../../knexfile');//impostando as configurações do knexfile

const connection = knex(configuration.development);

module.exports = connection;