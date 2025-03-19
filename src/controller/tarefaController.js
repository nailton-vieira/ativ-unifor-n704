
const tarefaModel = require('../model/tarefaModel');

// Funções do Controller

//Obter todas tarefas
const getAllTarefas = async (req, res) => {
        try {
          const tarefas = await tarefaModel.getAllTarefas();
          res.status(200).json(tarefas);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      };



const getTarefaById = (req, res) => {
    const tarefa = tarefaModel.getTarefaById(parseInt(req.params.id));
    if (tarefa) {
        res.json(tarefa);
    } else {
        res.status(404).json({ message: 'Tarefa não encontrada' });
    }
};

// Criar um novo item
const createTarefa = async (req, res) => {
    try {
        const novaTarefa = await tarefaModel.createTarefa(req.body.novaTarefa);
        res.status(201).json(novaTarefa);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar nova tarefa', error });
    }
};

/*const createTarefa = (req, res) => {
    const novaTarefa = tarefaModel.createTarefa(req.body.nomeTarefa);
    res.status(201).json(novaTarefa);
};*/

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
