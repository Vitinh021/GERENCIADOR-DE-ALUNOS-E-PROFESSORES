const express = require("express");
const session = require("express-session");
const app = express();
require("dotenv").config();


/*ERROS
    redirect vs render;
*/

//ROTAS
const auth = require("./middlewares/autenticacao");
const alunoRoutes = require("./routes/alunoRoutes");
const professorRoutes = require("./routes/professorRoutes");
const loginRoutes = require("./routes/loginRoutes");

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(session({
    secret: "7896093520074"
}));
app.use(express.static("public"));
app.use(alunoRoutes);
app.use(professorRoutes);
app.use(loginRoutes);


//IMPORTAÇÃO PARA PARA O BANCO DE DADOS NO-SQL (MONGODB)
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

//RAIZ DO SISTEMA BACK-END

app.get("/", auth, (request, response) => {
    response.render("index");
});

app.use((request, response) => {
    response.render("erro");
});

//ESCUTA BACK-END
app.listen(process.env.PORT, () => {
    console.log("server ok");
});