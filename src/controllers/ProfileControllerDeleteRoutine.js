const connection = require('../database/connection');

//teste commit
module.exports = {
    async delete(request, response) {
        const user_email = request.headers.authorization;
        const id_student = request.headers.authorization_student;

        // buscando todos os subjects que esse usuário criou
        const subjects = await connection('subjects')
            .join('students', 'subjects.id_student', '=', 'students.id')
            .join('users', 'students.user_email', '=', 'users.email')
            .where({
                user_email: user_email,
                id_student: id_student
            })
            .select('id_student');

        // if (subjects.id_student != id_student) {//se o id_student desse subject que buscamos no banco de dados for diferente do id_student que está logado da aplicação vai dá um erro
        //     return response.status(401).json({ error: 'Operação não permitida' });// o status 401 significa não autorizado. depois passamos um objeto com uma mensagem de erro
        // }

        await connection('subjects').where('id_student', id_student).delete();

        // ------------ ZERANDO A PERFORMANCE E O COUNT_PERFORMANCE ------------------



        const count_performance = 0;
        const performance = 0;
        const week = 0;

        const student = await connection('students')
            .where('id', id_student)//veriicando se o id da sucject é o mesmo que estamos passando por parâmetro
            .select('id')//selecionando o user_email
            .first();//seleciona apenas um

        if (student.id != id_student) {//se o user_email desse student que buscamos no banco de dados for diferente do user_email que está logado da aplicação vai dá um erro
            return response.status(401).json({ error: 'Operação não permitida' });// o status 401 significa não autorizado. depois passamos um objeto com uma mensagem de erro
        }

        await connection('students')
            .where('id', id_student)
            .update({
                count_performance,
                performance,
                week,
            });

        return response.status(204).send(''); //o status 204 é quando retornamos uma mensagem de sucesso sem corpo para o nosso frontend

    }
};