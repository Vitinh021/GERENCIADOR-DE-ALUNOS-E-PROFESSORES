function verificarAutenticacao(request, response, next) {
    if(request.session.autenticacao){
        next();
    }else{
        //response.render("login", { msg: ""});
        response.redirect("/login");
    }
};

module.exports = verificarAutenticacao; 