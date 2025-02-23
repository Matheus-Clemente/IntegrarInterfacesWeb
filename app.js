const express = require('express');
const authRotas = require('./routes/authRotas');
require('dotenv').config();
require('./database/db');

const app = express();
app.use(express.json());

app.use('/api/autenticacao', authRotas);

const PORTA = process.env.PORT || 5000;
app.listen(PORTA, () => console.log(`Servidor rodando na porta ${PORTA}`));
