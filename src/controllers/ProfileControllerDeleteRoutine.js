const connection = require('../database/connection');

module.exports = {
    async delete(request, response) {
        const user_email = request.headers.authorization;
        const id_student = request.headers.authorization_student;

        const subjects = await connection('subjects')
            .join('students', 'subjects.id_student', '=', 'students.id')
            .join('users', 'students.user_email', '=', 'users.email')
            .where({
                user_email: user_email,
                id_student: id_student
            })
            .select('id_student');

        await connection('subjects').where('id_student', id_student).delete();

        // ------------ ZERANDO A PERFORMANCE, COUNT_PERFORMANCE E O WEEK ------------------

        const count_performance = 0;
        const performance = 0;
        const week = 0;

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
                count_performance,
                performance,
                week,
            });

        return response.status(204).send('');

    }
};