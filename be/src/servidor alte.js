const path = require('path');

require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});

const app = require('./app');
const sequelize = require('./configuracoes/bancodedados');

async function iniciarServidor() {
    try {
        await sequelize.authenticate();

        console.log('✅ Conexão realizada com sucesso!');
        console.log(`📌 SGBD: ${sequelize.getDialect()}`);
        console.log(`📌 Banco: ${process.env.DB_NAME}`);
        console.log(`📌 Tabela: ${process.env.DB_TABLE}`);
        console.log(`📌 Usuário: ${process.env.DB_USER}`);
        console.log(`📌 Host: ${process.env.DB_HOST}`);
        console.log(`📌 Porta: ${process.env.DB_PORT}`);

        const PORTA = process.env.PORT || 3001;

        app.listen(PORTA, () => {
            console.log('');
            console.log(`✅ Servidor rodando na porta ${PORTA}`);
            console.log(
                `🚀 http://localhost:${PORTA}/api/usuarios`
            );
        });

    } catch (erro) {
        console.error('❌ Erro ao iniciar o servidor:');
        console.error(erro);

        process.exit(1);
    }
}

iniciarServidor();