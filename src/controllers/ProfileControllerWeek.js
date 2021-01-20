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
            .where('id', id_student)//veriicando se o id da sucject é o mesmo que estamos passando por parâmetro
            .select('id')//selecionando o user_email
            .first();//seleciona apenas um

        if (student.id != id_student) {//se o user_email desse student que buscamos no banco de dados for diferente do user_email que está logado da aplicação vai dá um erro
            return response.status(401).json({ error: 'Operação não permitida' });// o status 401 significa não autorizado. depois passamos um objeto com uma mensagem de erro
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

        return response.status(204).send(''); //o status 204 é quando retornamos uma mensagem de sucesso sem corpo para o nosso frontend

    }
}