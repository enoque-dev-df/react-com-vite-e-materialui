const express = require('express');
const router = express.Router();

const usuarioControlador = require('../controladores/usuarioControlador');

router.get('/', usuarioControlador.listar);

router.get('/:id', usuarioControlador.buscarPorId);

router.post('/', usuarioControlador.criar);

router.put('/:id', usuarioControlador.atualizar);

router.patch('/:id', usuarioControlador.atualizar);

router.delete('/:id', usuarioControlador.deletar);

module.exports = router;
