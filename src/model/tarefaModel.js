

const pool = require('../Utils/db');

//Obter todas tarefas
const getAllTarefas = async () => {
    const result = await pool.query('SELECT * FROM tarefas_tb ORDER BY id');
    return result.rows;

}


// Cria uma nova tarefa
const createTarefa = async (nomeTarefa) => {
    const result = await pool.query(
        'INSERT INTO tarefas_tb (nometarefa) VALUES ($1) RETURNING *',
        [nomeTarefa]
    );
    return result.rows[0];

};

// Buscar uma tarefa pelo ID
const getTarefaById = async (id) => {
    const result = await pool.query('SELECT * FROM tarefas_tb WHERE id = $1', [id]);
    return result.rows[0];

};


// Atualizar um tarefa pelo ID
const updateTarefa = async (id, nomeTarefa) => {
    const result = await pool.query(
        'UPDATE tabela-tb SET nometarefa = $1 WHERE id = $2 RETURNING *',
        [nomeTarefa, id]
    );
    return result.rows[0];
};


// Deletar um tarefa pelo ID
const deleteTarefa = async (id) => {
    const result = await pool.query('DELETE FROM tarefas_tb WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};


// Exportando as funções do Model
module.exports = {
    getAllTarefas,
    createTarefa,
    getTarefaById,
    updateTarefa,
    deleteTarefa,
};
