const connection = require('../database/connection');
//const crypto = require('crypto');

module.exports = {
    // listando todos os usuarios
    async index(request, response) {
        const users = await connection('users').select('*');

        return response.json(users);
    },

    // inserindo dados dentro da tabela users
    async create(request, response) {
        // fazendo desestruturação para pegar cada um desses dados
        const { email, name, password, password2 } = request.body;

        //const id = crypto.randomBytes(4).toString('HEX');// gera 4 caracteres aleatorios e os transforma para hexadecimal

        try {
            await connection('users').insert({
                email,
                name,
                password,
                password2,
            });

            return response.json();
        } catch (err) {
            return response.status(400).json({ error: 'E-mail já cadastrado' });
        }

    }
};