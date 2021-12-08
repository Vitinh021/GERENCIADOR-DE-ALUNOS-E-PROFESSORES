const Professor = require("../models/Professor");
const bcrypt = require("bcryptjs");
module.exports = class ProfessorController {

    static async listarProfessores(request, response) {
        const professores = await Professor.find();
        response.render("professor/professor_listar", {professores: professores, msg: "", title: "professores" });
    };

    static async recuperarProfessores(request, response) {
        const professores = await Professor.find();
        const status = request.query.s;
        let mensagem = "";
        if (status == "1") {
            mensagem = "active";
        } else {
            mensagem = "";
        }
        response.render("professor/professor_listar", {professores: professores, msg: mensagem, title: "listar" });
    };

    static async cadastrarProfessorGet(request, response) {
        const id = request.params.id;

        if (id) {//editar
            const professor = await Professor.findById(id);
            response.render("professor/professor_cadastrar", { title: "Atualização", msg: "", professor: professor, botao: "Atualizar" });

        } else {//inserir
            const status = request.query.s;
            let mensagem = "";
            if (status == "1") {
                mensagem = "active";
            } else if(status == "2"){
                mensagem = "active_erro";
            } else {
                mensagem = "";
            }
            response.render("professor/professor_cadastrar", { title: "Cadastro", msg: mensagem, professor: {}, botao: "Salvar" });
        }
    };

    static async cadastrarProfessorPost(request, response) {
        const professor = request.body;

        if (professor.id) {//editar
            //pode usar o findByIdAndUpdate

            if(professor.senha == ""){
                await Professor.findOneAndUpdate({_id: professor.id}, {
                    nome: professor.nome,
                    matricula: professor.matricula,
                    idade: professor.idade,
                    disciplina: professor.disciplina,
                    email: professor.email
                });
            } else{
                await Professor.findOneAndUpdate({_id: professor.id}, {
                    nome: professor.nome,
                    matricula: professor.matricula,
                    idade: professor.idade,
                    disciplina: professor.disciplina,
                    email: professor.email,
                    senha: bcrypt.hashSync(professor.senha)
                });
            }
            response.redirect("/professor/listar?s=1");

        } else {//inserir

            const professorBD = await Professor.findOne({email: professor.email});

            if(professorBD){
                response.redirect("/professor/cadastrar?s=2");
            }else{
                const novoProf = new Professor({
                    nome: professor.nome,
                    matricula: professor.matricula,
                    idade: professor.idade,
                    disciplina: professor.disciplina,
                    email: professor.email,
                    senha: bcrypt.hashSync(professor.senha)
                });
                await novoProf.save();
                response.redirect("/professor/cadastrar?s=1");
            }
        }
    };

    static async removerProfessor(request, response) {
        const id = request.params.id;
        await Professor.findByIdAndDelete({_id: id});
        //await Aluno.deleteOne(id);
        response.redirect("/professor/listar");
    };

    static async relatorio(request, response){
        const professores = await Professor.find();
        response.render("professor/professor_relatorio", {professores: professores, title: "Relatorio"});
    }
}