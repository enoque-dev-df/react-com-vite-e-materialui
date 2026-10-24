const Usuario = require('../modelos/usuarioModelo');
const bcrypt = require('bcrypt');

exports.criar = async (req, res) => {
    try {
        const senhaHash = await bcrypt.hash(req.body.senha, 10);
        const usuario = await Usuario.create({
            nomecompleto: req.body.nomecompleto,
            nomeusuario: req.body.nomeusuario,
            email: req.body.email,
            senha: senhaHash,
            ativo: req.body.ativo !== undefined ? req.body.ativo : true,
            datacadastro: new Date()
        });
        res.status(201).json(usuario);
    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
};

exports.listar = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
};

exports.buscarPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({
                mensagem: 'Usuário não encontrado'
            });
        }
        res.json(usuario);
    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
};

exports.atualizar = async (req, res) => {
    try {
        const dadosAtualizacao = {};

        if (req.body.nomecompleto !== undefined) {
            dadosAtualizacao.nomecompleto = req.body.nomecompleto;
        }

        if (req.body.nomeusuario !== undefined) {
            dadosAtualizacao.nomeusuario = req.body.nomeusuario;
        }

        if (req.body.email !== undefined) {
            dadosAtualizacao.email = req.body.email;
        }

        if (req.body.ativo !== undefined) {
            dadosAtualizacao.ativo = req.body.ativo;
        }

        if (req.body.senha !== undefined) {
            dadosAtualizacao.senha = await bcrypt.hash(req.body.senha, 10);
        }

        const [quantidade] = await Usuario.update(
            dadosAtualizacao,
            {
                where: {
                    idusuario: req.params.id
                }
            }
        );

        if (quantidade === 0) {
            return res.status(404).json({
                mensagem: 'Usuário não encontrado'
            });
        }

        res.json({
            mensagem: 'Atualizado com sucesso'
        });
    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
};

exports.deletar = async (req, res) => {
    try {
        const quantidade = await Usuario.destroy({
            where: {
                idusuario: req.params.id
            }
        });

        if (quantidade === 0) {
            return res.status(404).json({
                mensagem: 'Usuário não encontrado'
            });
        }

        res.json({
            mensagem: 'Excluído com sucesso'
        });
    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
};