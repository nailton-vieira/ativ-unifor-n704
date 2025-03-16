const express = require('express');

const app = express();
const tarefaRoutes = require('./routes/tarefaRoute');
// Middleware para permitir o uso de JSON no corpo das requisições

app.use(express.json());
app.use('tarefaRoutes');

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)

});

