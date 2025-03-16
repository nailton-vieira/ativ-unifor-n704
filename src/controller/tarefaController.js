
const tarefaModel = require('../model/tarefaModel');

// Funções do Controller

const getAllTarefas = (req, res) => {
    const tarefas = tarefaModel.getAllTarefas();
    // Simulação de list comprehension (usando map)
    const tarefaNomes = tarefas.map(tarefa => tarefa.nomeTarefa); 
    res.json({ tarefas, nomes: tarefaNomes });
};

const getTarefaById = (req, res) => {
    const tarefa = tarefaModel.getTarefaById(parseInt(req.params.id));
    if (tarefa) {
        res.json(tarefa);
    } else {
        res.status(404).json({ message: 'Tarefa não encontrada' });
    }
};

const createTarefa = (req, res) => {
    const novaTarefa = tarefaModel.createTarefa(req.body.nomeTarefa);
    res.status(201).json(novaTarefa);
};

const updateTarefa = (req, res) => {
    const tarefaId = parseInt(req.params.id);
    const updatedTarefa = tarefaModel.updateTarefa(tarefaId, req.body);
    if (updatedTarefa) {
        res.json(updatedTarefa);
    } else {
        res.status(404).json({ message: 'Tarefa não encontrada' });
    }
};

const deleteTarefa = (req, res) => {
    const tarefaId = parseInt(req.params.id);
    tarefaModel.deleteTarefa(tarefaId);
    res.status(204).send();
};

// Exportando as funções do Controller
module.exports = {
    getAllTarefas,
    getTarefaById,
    createTarefa,
    updateTarefa,
    deleteTarefa,
};
