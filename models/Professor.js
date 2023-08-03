const mongoose = require("mongoose");
const schema = mongoose.Schema;

const professorScheme = schema({
    nome: String,
    matricula: String,
    idade: Number,
    disciplina: String,
    email: String,
    senha: String
}); 

module.exports = mongoose.model("Professor", professorScheme);