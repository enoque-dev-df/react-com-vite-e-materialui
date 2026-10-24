const { DataTypes } = require('sequelize');
const sequelize = require('../configuracoes/bancodedados');

const Usuario = sequelize.define('Usuario', {
    idusuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nomecompleto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nomeusuario: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },

    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },

    datacadastro: {
        type: DataTypes.DATE
    }

}, {
    tableName: 'tbusuarios',
    timestamps: false
});

module.exports = Usuario;