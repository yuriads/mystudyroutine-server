const connection = require('../database/connection');

module.exports = {



    async index(request, response) {
        // const {id_student} = request.body;

        const id_student = request.headers.authorization_student;

        const [count] = await connection('subjects')
            .join('students', 'subjects.id_student', '=', 'students.id')
            .where({
                id_student: id_student
            })
            .count();

        // buscando todos os subjects que esse usuário criou
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

        //const count_add = request.body;

        //const { id } = request.params;

        const id_student = request.headers.authorization_student;

        const [count] = await connection('subjects')
            .join('students', 'subjects.id_student', '=', 'students.id')
            .where({
                id_student: id_student
            })
            .count();

        // let [{ disable }] = await connection('subjects')
        //     .where('id', id)
        //     .select('disable')

        // console.log(disable)

        // disable = true;

        // console.log(disable)

        let [{ count_performance }] = await connection('students')
            .where({
                id: id_student
            })
            .select('count_performance');

        count_performance = count_performance + 1;

        //const count_performance = count_add;
        const performance = parseInt((count_performance / count['count(*)']) * 100);

        console.log(count_performance);


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
            });

        // await connection('subjects')
        //     .where('id', id)
        //     .update({
        //         disable
        //     })

        return response.status(204).send(''); //o status 204 é quando retornamos uma mensagem de sucesso sem corpo para o nosso frontend


    }


};