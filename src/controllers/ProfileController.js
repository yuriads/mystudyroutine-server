const connection = require('../database/connection');

module.exports = {
    async index(request, response) {

        const user_email = request.headers.authorization;
        const id_student = request.headers.authorization_student;

        const subjects = await connection('subjects')
            .join('students', 'subjects.id_student','=','students.id')
            .join('users', 'students.user_email', '=', 'users.email')
            .where({
                user_email: user_email,
                id_student: id_student
            })
            .select('subjects.id', 'subjects.day','subjects.name', 'subjects.start', 'subjects.finish', 'subjects.disable')
            .orderBy('start');

        return response.json(subjects);
    }
};