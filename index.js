const express = require("express");
const cookieSession = require("cookie-session");
const app = express();
require("dotenv").config();

//ROTAS
const auth = require("./middlewares/autenticacao");
const alunoRoutes = require("./routes/alunoRoutes");
const professorRoutes = require("./routes/professorRoutes");
const loginRoutes = require("./routes/loginRoutes");

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cookieSession({
    name: 'session',
    keys: ['7896093520074']
  }));
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