const connection = require('../database/connection');

module.exports = {

    async update(request, response) {

        const id_student = request.headers.authorization_student;

        const { id } = request.params;

        let [{ disable }] = await connection('subjects')
            .where('id', id)
            .select('disable')

        console.log(disable)

        disable = 1;

        console.log(disable);

        const student = await connection('students')
            .where('id', id_student)
            .select('id')
            .first();

        if (student.id != id_student) {
            return response.status(401).json({ error: 'Operação não permitida' });
        }

        await connection('subjects')
            .where('id', id)
            .update({
                disable
            });
            console.log(typeof(disable));

        return response.status(204).send('');

    },
};