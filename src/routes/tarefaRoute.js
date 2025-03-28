const express = require('express');
const route = express.Router();

const tarefaController = require('../controller/tarefaController.js');

// Definindo as rotas
route.get('/tarefas', tarefaController.getTarefas);
route.get('/tarefas/:id', tarefaController.getTarefaById);
route.post('/tarefas', tarefaController.createTarefa);
route.put('/tarefas/:id', tarefaController.updateTarefa);
route.delete('/tarefas/:id', tarefaController.deleteTarefa);
route.get('/tarefa/filtro/campo', tarefaController.getTarefasByCampo);
route.get('/tarefa/filtro/termo', tarefaController.filterTarefaByTermo);


module.exports = route;

