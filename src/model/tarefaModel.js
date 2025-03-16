
let data = [

    { id: 1, nomeTarefa: 'Estudar' },
    { id: 2, nomeTarefa: 'codar' },
    
];

// Função de alta ordem: retorna uma função para gerar IDs
const createIdGenerator = () => {
    let lastId = data.length > 0 ? Math.max(...data.map(item => item.id)) : 0;
    return () => ++lastId; // Closure: a função interna "lembra" o valor de `lastId`
};

const generateId = createIdGenerator(); // Usando a função de alta ordem

// Função de alta ordem: retorna uma função para buscar itens por uma propriedade
const createFinder = (key) => (value) => data.find(item => item[key] === value);

const findItemById = createFinder('id'); // Usando a função de alta ordem

// Função de alta ordem: retorna uma função para remover itens por uma propriedade
const createRemover = (key) => (value) => {
    data = data.filter(item => item[key] !== value);
    return data;
};

const removeItemById = createRemover('id'); // Usando a função de alta ordem

// Função de alta ordem: retorna uma função para mapear e atualizar itens
const createUpdater = (key) => (value, updatedFields) => {
    data = data.map(item => item[key] === value ? { ...item, ...updatedFields } : item);
    return findItemById(value);
};

const updateItemById = createUpdater('id'); // Usando a função de alta ordem

// Exportando as funções do Model
module.exports = {
    getAllItems: () => data,
    getItemById: findItemById,
    createItem: (nomeTarefa) => {
        const novoItem = { id: generateId(), nomeTarefa };
        data = [...data, novoItem];
        return novoItem;
    },
    updateItem: updateItemById,
    deleteItem: removeItemById,
};
