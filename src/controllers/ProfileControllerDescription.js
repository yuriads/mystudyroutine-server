const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        // const {id_student} = request.body;

        //const user_email = request.headers.authorization;
        const id_student = request.headers.authorization_student;

        // buscando todos os subjects que esse usuário criou
        const students = await connection('students')
            .where({
                id: id_student
            })
            .select('*')

        return response.json(students);
    }
};