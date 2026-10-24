Projeto web com React + Vite no frontend e Node.js no backend.

📁 Estrutura do projeto
text
rvmui/
├── .gitignore
├── fe/                  # Frontend (React + Vite)
│   ├── package.json
│   ├── package-lock.json
│   └── src/
└── be/                  # Backend (Node.js)
    ├── package.json
    ├── package-lock.json
    ├── .env
    └── src/

🛠️ Pré-requisitos

Antes de executar o projeto, instale:

Node.js e npm

Para verificar se estão instalados, execute no terminal:

bash
node -v
npm -v

📦 Instalação das dependências

O frontend e o backend possuem seus próprios arquivos package.json. Por isso, as dependências devem ser instaladas separadamente.

Na raiz do projeto (rvmui), execute:

bash
npm install --prefix fe
npm install --prefix be


Esses comandos instalam as dependências definidas nos arquivos package.json de cada pasta.

Instalação entrando em cada pasta

Se preferir, entre em cada diretório e execute npm install.

Frontend:

bash
cd fe
npm install


Backend:

bash
cd be
npm install

Não é necessário executar as duas formas de instalação. Escolha apenas uma delas.
🔐 Variáveis de ambiente

O backend utiliza um arquivo .env para armazenar configurações e informações sensíveis, como credenciais e chaves de API.

Crie o arquivo be/.env e configure as variáveis necessárias para executar o projeto.

Importante: não envie o arquivo .env para o Git. Ele deve permanecer ignorado pelo .gitignore.

Se o projeto exigir variáveis específicas, consulte a configuração do backend para saber quais devem ser definidas.

🚀 Executando o projeto

Após instalar as dependências, execute os comandos definidos nos scripts de cada package.json.

Para consultar os scripts disponíveis, abra os arquivos:

fe/package.json
be/package.json

Por exemplo, se o frontend possuir o script dev, execute:

bash
cd fe
npm run dev


Se o backend possuir o script dev, execute:

bash
cd be
npm run dev


Os scripts disponíveis dependem da configuração de cada parte do projeto.

🧹 Arquivos ignorados pelo Git

O arquivo .gitignore, localizado na raiz, deve conter:

gitignore
# Dependências Node.js
node_modules/

# Variáveis de ambiente
be/.env


As pastas node_modules não são versionadas, pois suas dependências podem ser instaladas novamente com npm install.

Os arquivos package.json e package-lock.json devem ser mantidos no Git para facilitar a instalação das dependências e manter suas versões consistentes.

👨‍💻 Tecnologias utilizadas
React
Vite
Node.js
npm