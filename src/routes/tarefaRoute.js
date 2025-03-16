const route = require('express').Router();

const tarefaController = require('../controller/tarefaController.js');

// Definindo as rotas
route.get('/tarefas', tarefaController.getAllTarefas);
route.get('/tarefas/:id', tarefaController.getTarefaById);
route.post('/tarefas', tarefaController.createTarefa);
route.put('/tarefas/:id', tarefaController.updateTarefa);
route.delete('/tarefas/:id', tarefaController.deleteTarefa);

module.exports = route;

