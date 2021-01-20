const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('subjects').count();

        console.log(count);

        const subjects = await connection('subjects').select('*');

        response.header('X-Total-Count', count['count(*)']);

        response.json(subjects);
    },

    async create (request, response) {
        const { day, name, start, finish } = request.body;
        const disable = 0;
        const id_student = request.headers.authorization;

        const [id] = await connection('subjects').insert({
            day,
            name,
            start,
            finish,
            disable,
            id_student,
        });

        response.json({id});
    },

    async delete (request, response) {
        const { id } = request.params;
        const id_student = request.headers.authorization;

        const subject = await connection('subjects')
            .where('id', id)
            .select('id_student')
            .first();

            if (subject.id_student != id_student){
                return response.status(401).json({ error: 'Operação não permitida'});
            }

            await connection('subjects').where('id', id).delete();

            return response.status(204).send('');
    },

    async update (request, response) {
        const { id } = request.params;
        const { day, name, start, finish} = request.body;
        const id_student = request.headers.authorization;

        const subject = await connection('subjects')
            .where('id', id)
            .select('id_student')
            .first();

            if (subject.id_student != id_student){
                return response.status(401).json({ error: 'Operação não permitida'});
            }

            await connection('subjects')
                .where('id', id)
                .update({
                    day,
                    name,
                    start,
                    finish,
                });

            return response.status(204).send('');
    }
};