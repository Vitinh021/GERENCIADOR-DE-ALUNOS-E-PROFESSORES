function verificarAutenticacao(request, response, next) {
    if(request.session.autenticacao){
        next();
    }else{
        response.redirect("/login");
    }
};

module.exports = verificarAutenticacao; 