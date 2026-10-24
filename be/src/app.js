const express = require('express');
const cors = require('cors');

const usuarioRotas = require('./rotas/usuarioRotas');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/usuarios', usuarioRotas);

module.exports = app;
