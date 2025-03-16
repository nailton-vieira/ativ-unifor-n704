const route = require('express'.Router());

const tarefaController = require('../controller/tarefaController.js');

// Definindo as rotas
router.get('/terefas', itemController.getAllItems);
router.get('/tarefas/:id', itemController.getItemById);
router.post('/terefas', itemController.createItem);
router.put('/tarefas/:id', itemController.updateItem);
router.delete('/tarefas/:id', itemController.deleteItem);

module.exports = route;

