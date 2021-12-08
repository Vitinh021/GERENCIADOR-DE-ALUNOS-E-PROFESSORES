//IMPORTAÇÃO
const Aluno = require("../models/Aluno");
const bcrypt = require("bcryptjs")
module.exports = class AlunoController {

    static async listarAlunos(request, response) {
        const alunos = await Aluno.find();
        response.render("aluno/aluno_listar", {alunos: alunos, msg: "", title: "alunos" });
    };

    static async recuperarAlunos(request, response) {
        const alunos = await Aluno.find();
        const status = request.query.s;
        let mensagem = "";
        if (status == "1") {
            mensagem = "active";
        } else {
            mensagem = "";
        }
        response.render("aluno/aluno_listar", {alunos: alunos, msg: mensagem, title: "listar" });
    };

    static async cadastrarAlunoGet(request, response) {
        const id = request.params.id;

        if (id) {//editar
            const aluno = await Aluno.findById(id);
            response.render("aluno/aluno_cadastrar", { title: "Atualização", msg: "", aluno: aluno, botao: "Atualizar" });

        } else {//inserir
            const status = request.query.s;
            let mensagem = "";
            if (status == "1") {
                mensagem = "active";
            }else if(status == "2"){
                mensagem = "active_erro";
            }else {
                mensagem = "";
            }
            response.render("aluno/aluno_cadastrar", { title: "Cadastro", msg: mensagem, aluno: {}, botao: "Salvar" });
        }
    };

    static async cadastrarAlunoPost(request, response) {
        const aluno = request.body;

        if (aluno.id) {//editar
            //pode usar o findByIdAndUpdate

            if(aluno.senha == ""){
                await Aluno.findOneAndUpdate({_id: aluno.id}, {
                    nome: aluno.nome,
                    matricula: aluno.matricula,
                    idade: aluno.idade,
                    curso: aluno.curso,
                    email: aluno.email
                });
            } else{
                await Aluno.findOneAndUpdate({_id: aluno.id}, {
                    nome: aluno.nome,
                    matricula: aluno.matricula,
                    idade: aluno.idade,
                    curso: aluno.curso,
                    email: aluno.email,
                    senha: bcrypt.hashSync(aluno.senha)
                });
            }
            response.redirect("/aluno/listar?s=1");

        } else {//inserir
            const alunoBD = await Aluno.findOne({email: aluno.email});

            if(alunoBD){
                response.redirect("/aluno/cadastrar?s=2");
            }else{
                const novoAluno = new Aluno({
                    nome: aluno.nome,
                    matricula: aluno.matricula,
                    idade: aluno.idade,
                    curso: aluno.curso,
                    email: aluno.email,
                    senha: bcrypt.hashSync(aluno.senha)
                });
                await novoAluno.save();
                response.redirect("/aluno/cadastrar?s=1");                
            }
        }
    };

    static async removerAluno(request, response) {
        const id = request.params.id;
        await Aluno.findByIdAndDelete({_id: id});
        //await Aluno.deleteOne(id);
        response.redirect("/aluno/listar");
    };

    static async relatorio(request, response){
        const alunos = await Aluno.find();
        response.render("aluno/aluno_relatorio", {alunos: alunos, title: "Relatorio"});
    }
}