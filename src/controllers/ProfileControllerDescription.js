const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
       
        const id_student = request.headers.authorization_student;

        const students = await connection('students')
            .where({
                id: id_student
            })
            .first()
            .select('*')

        return response.json(students);
    }
};