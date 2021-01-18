const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const { id } = request.body;

        const student = await connection('students')
            .where({
                'id': id,
            })
            .select('name')
            .first();

        if(!student) {
            return response.status(400).json({ error: 'Login incorreto ou inválido!'});
        }

        return response.json(student);
    }
}