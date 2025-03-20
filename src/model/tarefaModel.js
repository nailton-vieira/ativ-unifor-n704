

const pool = require('../Utils/db');

//Obter todas tarefas


/*const getAllTarefas = async () => {
    const result = await pool.query('SELECT * FROM tarefas_tb ORDER BY id');
    return result.rows;

}*/

const getAllTarefas = async () => {
    const {rows} = await pool.query('SELECT * FROM tarefas_tb ');
    return rows;

}


// Cria uma nova tarefa
const createTarefa = async (tarefa) => {
    const {nomeTarefa, descricao} = tarefa;
    const {rows} = await pool.query(
        'INSERT INTO tarefas_tb (nometarefa, descricao) VALUES ($1, $2) RETURNING *',
        [nomeTarefa, descricao]
    );
    return rows[0];

};

// Buscar uma tarefa pelo ID
const getTarefaById = async (id) => {
    const result = await pool.query('SELECT * FROM tarefas_tb WHERE id = $1', [id]);
    return result.rows[0];

};


// Atualizar uma tarefa pelo ID
const updateTarefa = async (id, Tarefa) => {
    const {nomeTarefa, descricao} = Tarefa;
    const {rows} = await pool.query(
        'UPDATE tarefas_tb SET nometarefa = $1, descricao = $2 WHERE id = $3 RETURNING *',
        [descricao, nomeTarefa, id]
    );
    return rows[0];
};


// Deletar um tarefa pelo ID
const deleteTarefa = async (id) => {
    const result = await pool.query('DELETE FROM tarefas_tb WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

//Cria uma tab
const createTarefaQuery = (filters) => {
 return (tarefa) => {
    const filtersEntries = Object.entries(filters);
    return filtersEntries.every(([key, value]) => tarefa[key] === value);

 };
};


// Função de alta ordem com closure
const getTarefasFilter = async (filters) => {
   // Valida os filtros
  const validFilters = {};
  for (const [key, value] of Object.entries(filters)) {
    if (['nometarefa', 'descricao'].includes(key)) { // Apenas permite filtrar por tarefa e descricao
      validFilters[key] = value;
    }
  }
    const tarefas = await getAllTarefas();
    const filtertFunction = createTarefaQuery(validFilters); //Aqui o uso do Closure.
    return tarefas.filter(filtertFunction);
    
};


// Exportando as funções do Model
module.exports = {
    getAllTarefas,
    createTarefa,
    getTarefaById,
    updateTarefa,
    deleteTarefa,
    getTarefasFilter,
  
};
