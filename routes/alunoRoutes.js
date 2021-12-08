const express = require("express");
const routes = express.Router();
const alunoController = require("../controllers/alunoController");
const auth = require("../middlewares/autenticacao");


routes.get("/alunos", auth, alunoController.listarAlunos);
routes.get("/aluno/cadastrar/:id?", auth, alunoController.cadastrarAlunoGet);
routes.get("/aluno/listar", auth, alunoController.recuperarAlunos);//remover e editar chama essa rota
routes.get("/aluno/relatorio", auth, alunoController.relatorio);
routes.post("/aluno/cadastrar", auth, alunoController.cadastrarAlunoPost);
routes.get("/aluno/remover/:id", auth, alunoController.removerAluno);

module.exports = routes;


