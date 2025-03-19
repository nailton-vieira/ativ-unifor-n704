const route = require('express').Router();

const tarefaController = require('../controller/tarefaController.js');

// Definindo as rotas
route.get('/tarefas', tarefaController.getTarefas);
route.get('/tarefas/:id', tarefaController.getTarefaById);
route.post('/tarefas', tarefaController.createTarefa);
route.put('/tarefas/:id', tarefaController.updateTarefa);
route.delete('/tarefas/:id', tarefaController.deleteTarefa);
route.get('/tarefas/nomes', tarefaController.getTarefaNomes);
route.get('/tarefas/filter', tarefaController.getTarefasByFilter);


module.exports = route;

