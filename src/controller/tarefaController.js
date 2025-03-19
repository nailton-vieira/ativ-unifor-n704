
const tarefaModel = require('../model/tarefaModel');

// Funções do Controller

//Obter todas tarefas
/*Aqui, 'getTarefas' é uma função lambda (arrow function) atribuida a uma constante
e simplifica a sintaxe*/
const getTarefas = async (req, res) => {
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
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }
      res.status(200).json(tarefa);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Criar um novo item
const createTarefa = async (req, res) => {
    try {
        const novaTarefa = await tarefaModel.createTarefa(req.body);
        res.status(201).json(novaTarefa);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar nova tarefa', error });
    }
};


//Atualizar tarefas
const updateTarefa = async (req, res) => {
  try {
      const atualizaTarefa = await tarefaModel.updateTarefa(parseInt(req.params.id), req.body);
      if (atualizaTarefa) {
          res.json(atualizaTarefa);
      } else {
          res.status(404).json({ message: 'Tarefa não encontrado' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar tarefa', error });
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
    getTarefas,
    getTarefaById,
    createTarefa,
    updateTarefa,
    deleteTarefa,
};
