const connection = require('../database/connection');

module.exports = {

    async index(request, response) {

        const id_student = request.headers.authorization_student;

        const [count] = await connection('subjects')
            .join('students', 'subjects.id_student', '=', 'students.id')
            .where({
                id_student: id_student
            })
            .count();

        const subjects = await connection('subjects')
            .join('students', 'subjects.id_student', '=', 'students.id')
            .where({
                id_student: id_student
            })
            .select('subjects.id', 'subjects.day', 'subjects.name', 'subjects.start', 'subjects.finish', 'subjects.disable')
            .orderBy('start');

        response.header('X-Total-Count-Subject', count['count(*)']);


        return response.json(subjects);
    },

    async update(request, response) {

        const id_student = request.headers.authorization_student;

        const [count] = await connection('subjects')
            .join('students', 'subjects.id_student', '=', 'students.id')
            .where({
                id_student: id_student
            })
            .count();

        let [{ count_performance }] = await connection('students')
            .where({
                id: id_student
            })
            .select('count_performance');

        count_performance = count_performance + 1;

        const performance = parseInt((count_performance / (4 * count['count(*)'])) * 100);

        console.log(count_performance);


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
            });

        return response.status(204).send('');

    }


};