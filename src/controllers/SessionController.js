const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const { email, password } = request.body;

        const user = await connection('users')
            .where({
                'email': email,
                'password': password
            })
            .select('name')
            .first();

        if(!user) {
            return response.status(400).json({ error: 'Usuário e/ou senha incorretos!'});
        }

        return response.json(user);
    }
}