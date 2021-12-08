const Aluno = require("../models/Aluno");
const Professor = require("../models/Professor");
const bcrypt =  require("bcryptjs");
module.exports = class LoginController {
    
    static async verificarUsuario(request, response) {
        const usuario = request.body;
        const aluno = await Aluno.findOne({email: usuario.email});
        const professor = await Professor.findOne({email: usuario.email});

        if(aluno){
            if (bcrypt.compareSync(usuario.senha, aluno.senha)) {
                request.session.autenticacao = usuario.email;
                response.redirect("/");
            } else{
                response.render("login", {msg: "active_erro"});
            }
        } else if(professor){
            if (bcrypt.compareSync(usuario.senha, professor.senha)) {
                request.session.autenticacao = usuario.email;
                response.redirect("/");
            } else{
                response.render("login", {msg: "active_erro"});
            }            
        } else{
            response.render("login", {msg: "active_erro"});
        }

        /*
        uma forma melhor seria um botão na tela de login perguntando se o usuario é aluno
        ou professor, ai evitaria ter que fazer duas consultas no banco    
        */
    };

    static login(request, response){
        if(request.session.autenticacao){
            response.redirect("/");
        }else{
            //
            response.render("login", { msg: ""});
        }
    };
}