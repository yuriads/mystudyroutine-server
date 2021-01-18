const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        // const {id_student} = request.body;

        const id_student = request.headers.authorization_student;

        // buscando todos os subjects que esse usuário criou
        const [{performance}] = await connection('students')
            .where('id', id_student)
            .select('performance')

            console.log(performance)

        return response.json(performance);
    }
}