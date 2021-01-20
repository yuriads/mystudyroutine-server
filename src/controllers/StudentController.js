const crypto = require('crypto');//além de criptografia, o crypto serve para gerar textos aleatórios
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const user_email = request.headers.authorization;

        const [count] = await connection('students').count();

        const students = await connection('students')
            .where('user_email', user_email)
            .select('*')
            .orderBy('name');

        response.header('X-Total-Count', count['count(*)']);

        response.json(students);
    },

    async create(request, response) {
        const { registration, name, shift, course, date_start, date_finish, description, performance = 0 } = request.body;
        const user_email = request.headers.authorization;

        const id = crypto.randomBytes(4).toString('HEX');// gera 4 caracteres aleatorios e os transforma para hexadecimal

        try {
            await connection('students').insert({
                id,
                registration,
                name,
                shift,
                course,
                date_start,
                date_finish,
                description,
                performance,
                user_email,
            });

            return response.json({ id });
        } catch (err) {
            return response.status(400).json({ error: 'Matrícula já cadastrada!' });
        }
    },

    async delete(request, response) {
        const { id } = request.params;
        const user_email = request.headers.authorization;

        const student = await connection('students')
            .where('id', id)
            .select('user_email')
            .first();

        if (student.user_email != user_email) {
            return response.status(401).json({ error: 'Operação não permitida' });
        }

        await connection('students').where('id', id).delete();

        return response.status(204).send('');
    },

    async update(request, response) {
        const { id } = request.params;
        const { registration, name, shift, course, date_start, date_finish, description } = request.body;
        const user_email = request.headers.authorization;

        const student = await connection('students')
            .where('id', id)
            .select('user_email')
            .first();

        if (student.user_email != user_email) {
            return response.status(401).json({ error: 'Operação não permitida' });
        }

        try {
            await connection('students')
                .where('id', id)
                .update({
                    registration,
                    name,
                    shift,
                    course,
                    date_start,
                    date_finish,
                    description,
                });

            return response.status(204).send('');
        } catch (err) {
            return response.status(400).json({ error: 'Matrícula já cadastrado' });
        }
    }
}