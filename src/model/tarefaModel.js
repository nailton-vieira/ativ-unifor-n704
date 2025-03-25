

const pool = require('../Utils/db');

//Obter todas tarefas
const getAllTarefas = async () => {
    const {rows} = await pool.query('SELECT * FROM tarefas_tb ');
    return rows;

}


// Cria uma nova tarefa
const createTarefa = async (tarefa) => {
    const {nometarefa, descricao, status} = tarefa;
    const {rows} = await pool.query(
        'INSERT INTO tarefas_tb (nometarefa, descricao, status) VALUES ($1, $2, $3) RETURNING *',
        [nometarefa, descricao, status]
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
    const {nometarefa, descricao, status} = Tarefa;
    const {rows} = await pool.query(
        'UPDATE tarefas_tb SET nometarefa = $1, descricao = $2, status = $3 WHERE id = $4 RETURNING *',
        [nometarefa, descricao, status, id]
    );
    return rows[0];
};


// Deletar um tarefa pelo ID
const deleteTarefa = async (id) => {
    const result = await pool.query('DELETE FROM tarefas_tb WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};


//Cria uma query
const createTarefaQuery = (filters) => {
 return (tarefa) => {
    const filtersEntries = Object.entries(filters);
    return filtersEntries.every(([key, value]) => tarefa[key] === value);

 };
};


//Cria um filtro por nome ou status das tarefas .
// Função de alta ordem com closure
const getTarefasCampo = async (filters) => {
   // Valida os filtros
  const validFilters = {};
  for (const [key, value] of Object.entries(filters)) {
    if (['nometarefa', 'status'].includes(key)) { // Apenas permite filtrar por nome ou status
      validFilters[key] = value;
    }
  }
    const tarefas = await getAllTarefas();
    const filtertFunction = createTarefaQuery(validFilters); //Aqui o uso do Closure.
    return tarefas.filter(filtertFunction);
    
};

//Cria um filtro dinamico
// Função de alta ordem para criar um filtro (closure)
const createFilterDn = (filterFn) => {
    // Closure: a função retornada "lembra" do `filterFn`
    return async (value) => {
        const tarefas = await pool.query('SELECT * FROM tarefas_tb');
        // List comprehension simulada com filter + map
        const filtrandoTarefas = tarefas.rows
            .filter(filterFn(value)) // Filtra as tarefas
            .map(tarefa => ({ id: tarefa.id, descricao: tarefa.descricao, status: tarefa.status })); // Mapeia para o formato desejado
        return filtrandoTarefas;
    };
};

//Cria um filtro na descrição que contenha uma substring
const filterByTermo = createFilterDn((buscarTermo) => (tarefa) => 
    tarefa.descricao.toLowerCase().includes(buscarTermo.toLowerCase())
);


// Exportando as funções do Model
module.exports = {
    getAllTarefas,
    createTarefa,
    getTarefaById,
    updateTarefa,
    deleteTarefa,
    getTarefasCampo,
    createFilterDn,
    filterByTermo,
  
};
