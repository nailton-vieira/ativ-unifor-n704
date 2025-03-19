
let data = [

   // { id: 1, nomeTarefa: 'Estudar' },
    //{ id: 2, nomeTarefa: 'codar' },
    
];

const pool = require('../Utils/db');

const getAllTarefas = async () => {

    const result = await pool.query('SELECT * FROM tarefas_tb ORDER BY id');
    return result.rows;

}
// Função de alta ordem: retorna uma função para gerar IDs
const createIdGenerator = () => {
    let lastId = data.length > 0 ? Math.max(...data.map(tarefa => tarefa.id)) : 0;
    return () => ++lastId; // Closure: a função interna "lembra" o valor de `lastId`
};

const generateId = createIdGenerator(); // Usando a função de alta ordem

// Função de alta ordem: retorna uma função para buscar itens por uma propriedade
const createFinder = (key) => (value) => data.find(tarefa => tarefa[key] === value);

const findTarefaById = createFinder('id'); // Usando a função de alta ordem

// Função de alta ordem: retorna uma função para remover itens por uma propriedade
const createRemover = (key) => (value) => {
    data = data.filter(tarefa => tarefa[key] !== value);
    return data;
};

const removeTarefaById = createRemover('id'); // Usando a função de alta ordem

// Função de alta ordem: retorna uma função para mapear e atualizar itens
const createUpdater = (key) => (value, updatedFields) => {
    data = data.map(tarefa => tarefa[key] === value ? { ...tarefa, ...updatedFields } : tarefa);
    return findTarefaById(value);
};

const updateTarefaById = createUpdater('id'); // Usando a função de alta ordem

// Exportando as funções do Model
module.exports = {
    getAllTarefas,
   /* getAllTarefas: () => data,
    getTarefaById: findTarefaById,
    createTarefa: (nomeTarefa) => {
        const novaTarefa = { id: generateId(), nomeTarefa };
        data = [...data, novaTarefa];
        return novaTarefa;
    },*/
    updateTarefa: updateTarefaById,
    deleteTarefa: removeTarefaById,
};
