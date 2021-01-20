const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const users = await connection('users').select('*');

        return response.json(users);
    },

    async create(request, response) {
        const { email, name, password, password2 } = request.body;

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