# Backend do Projeto RVMUI 
# React com Vite e MaterialUI

## Para o desenvolvimento do back-end da API REST, serão utilizadas as seguintes tecnologias:
1 SGBD PostgreSQL
1.1 banco de dados: psbdrvmui
1.2 tabela: tbusuarios
1.3 campos: idusuario, nomecompleto, nomeusuario, email, senha, ativo e datacadastro
2 Node.js

## Dependências:
1 Framework Express
2 Biblioteca ORM Sequelize 
3 Biblioteca Cors
4 Biblioteca Dotenv
5 Biblioteca Bcrypt
6 Biblioteca Jsonwebtoken
7 Driver do PostgreSQL pg
8 Ferramenta Nodemon

## Para executar, copie os comandos e cole no Terminal e pressione a tecla Enter:
## 1. acesse a pasta be
cd be

## 2 instale as dependências do projeto, copie o comando e cole no Terminal e pressione a tecla Enter:
npm install express sequelize cors dotenv bcrypt jsonwebtoken pg

## 2. rode
npm run dev

## Endpoints / rotas/ CRUD
Método	Endpoint	        Descrição
GET	    /api/usuarios	    Listar
GET	    /api/usuarios/:id	Buscar
POST	/api/usuarios	    Cadastrar
PUT	    /api/usuarios/:id	Atualizar tudo
PATCH	/api/usuarios/:id	Atualizar parcialmente
DELETE	/api/usuarios/:id	Excluir
