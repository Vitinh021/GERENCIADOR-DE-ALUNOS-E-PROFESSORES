const express = require("express");
const routes = express.Router();
const professorController = require("../controllers/professorController");
const auth = require("../middlewares/autenticacao");

routes.get("/professores", auth, professorController.listarProfessores);
routes.get("/professor/cadastrar/:id?", auth, professorController.cadastrarProfessorGet);
routes.get("/professor/listar", auth, professorController.recuperarProfessores);
routes.get("/professor/relatorio", auth, professorController.relatorio);
routes.post("/professor/cadastrar", auth, professorController.cadastrarProfessorPost);
routes.get("/professor/remover/:id", auth, professorController.removerProfessor);

module.exports = routes;


