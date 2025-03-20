const express = require('express');
const bodyParser = require('body-parser');
const tarefaRoutes = require('./routes/tarefaRoute');


const app = express();

app.use(bodyParser.json());
app.use('/api', tarefaRoutes);

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)

});

