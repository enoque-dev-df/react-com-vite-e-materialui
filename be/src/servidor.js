const path = require('path');

require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});

const app = require('./app');
const sequelize = require('./configuracoes/bancodedados');

sequelize.authenticate()
    .then(() => {

        console.log(`
✅ Conexão realizada com sucesso!
📌 SGBD: ${sequelize.getDialect()}
📌 Banco: ${process.env.DB_NAME}
📌 Tabela: ${process.env.DB_TABLE}
📌 Usuário: ${process.env.DB_USER}
📌 Host: ${process.env.DB_HOST}
📌 Porta: ${process.env.DB_PORT}
        `);

        app.listen(process.env.PORT, () => {
            console.log(`✅ Servidor rodando na porta ${process.env.PORT}`);
            console.log(`🚀 Copie o link abaixo e cole na barra de endereços do navegador:`);
            console.log(`🚀 http://localhost:3001/api/usuarios`);
        });

    })
    .catch((erro) => {
        console.error('❌ Erro ao conectar ao banco:');
        console.error(erro);
    });
    