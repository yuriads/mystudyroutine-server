const connection = require('../database/connection');

module.exports = {

    async update(request, response) {

        const id_student = request.headers.authorization_student;

        console.log(id_student)

        const disable = 0;

        let [{ week }] = await connection('students')
            .where('id', id_student)
            .select('week')

        console.log(week)

        week = week + 1;

        const student = await connection('students')
            .where('id', id_student)
            .select('id')
            .first();

        if (student.id != id_student) {
            return response.status(401).json({ error: 'Operação não permitida' });
        }

        await connection('students')
            .where('id', id_student)
            .update({
                week
            });

        await connection('subjects')
            .where('id_student', id_student)
            .update({
                disable
            });


            console.log(typeof (week));

        return response.status(204).send('');

    }
}