const mongoose = require("mongoose");
const schema = mongoose.Schema;

const alunoScheme = schema({
    nome: String,
    matricula: String,
    idade: Number,
    curso: String,
    email: String,
    senha: String
});

module.exports = mongoose.model("Aluno", alunoScheme);