const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('subjects').count();

        console.log(count);

        const subjects = await connection('subjects').select('*');

        response.header('X-Total-Count', count['count(*)']);

        response.json(subjects);
    },

    async create (request, response) {
        const { day, name, start, finish } = request.body;
        const disable = 0;
        const id_student = request.headers.authorization;

        
        // desestruturando para jogar dentro da constante [id] os dados
        const [id] = await connection('subjects').insert({
            day,
            name,
            start,
            finish,
            disable,
            id_student,
        });

        response.json({id});
    },

    async delete (request, response) {
        // pegando o id que vem por parâmetro
        const { id } = request.params;
        const id_student = request.headers.authorization;//usamos o id_student para saber se o subject que estamos deletando realmente foi criado pelo o usuário

        const subject = await connection('subjects')
            .where('id', id)//veriicando se o id da sucject é o mesmo que estamos passando por parâmetro
            .select('id_student')//selecionando o id_student
            .first();//seleciona apenas um

            if (subject.id_student != id_student){//se o id_student desse subject que buscamos no banco de dados for diferente do id_student que está logado da aplicação vai dá um erro
                return response.status(401).json({ error: 'Operação não permitida'});// o status 401 significa não autorizado. depois passamos um objeto com uma mensagem de erro
            }

            await connection('subjects').where('id', id).delete();

            return response.status(204).send(''); //o status 204 é quando retornamos uma mensagem de sucesso sem corpo para o nosso frontend
    },

    async update (request, response) {
        // pegando o id que vem por parâmetro
        const { id } = request.params;
        const { day, name, start, finish} = request.body;
        const id_student = request.headers.authorization;//usamos o id_student para saber se o subject que estamos deletando realmente foi criado pelo o usuário

        const subject = await connection('subjects')
            .where('id', id)//veriicando se o id da sucject é o mesmo que estamos passando por parâmetro
            .select('id_student')//selecionando o id_student
            .first();//seleciona apenas um

            if (subject.id_student != id_student){//se o id_student desse subject que buscamos no banco de dados for diferente do id_student que está logado da aplicação vai dá um erro
                return response.status(401).json({ error: 'Operação não permitida'});// o status 401 significa não autorizado. depois passamos um objeto com uma mensagem de erro
            }

            await connection('subjects')
                .where('id', id)
                .update({
                    day,
                    name,
                    start,
                    finish,
                });

            return response.status(204).send(''); //o status 204 é quando retornamos uma mensagem de sucesso sem corpo para o nosso frontend
    }
};