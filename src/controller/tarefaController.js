
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


// Buscar um tarefa pelo ID
const getTarefaById = async (req, res) => {
    try {
      const tarefa = await tarefaModel.getTarefaById(req.params.id);
      if (!tarefa) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(tarefa);
    } catch (error) {
      res.status(500).json({ error: error.message });
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




const updateTarefa = (req, res) => {
    const tarefaId = parseInt(req.params.id);
    const updatedTarefa = tarefaModel.updateTarefa(tarefaId, req.body);
    if (updatedTarefa) {
        res.json(updatedTarefa);
    } else {
        res.status(404).json({ message: 'Tarefa não encontrada' });
    }
};


// Deletar um item pelo ID
const deleteTarefa = async (req, res) => {
    try {
        const removeTarefa = await tarefaModel.deleteTarefa(parseInt(req.params.id));
        if (removeTarefa) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Tarefa não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar tarefa', error });
    }
};


// Exportando as funções do Controller
module.exports = {
    getAllTarefas,
    getTarefaById,
    createTarefa,
    updateTarefa,
    deleteTarefa,
};
