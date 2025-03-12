// Importa o Express para configurar a aplicação e criar rotas
const express = require('express');

// Importa o ApolloServer para configurar o servidor GraphQL
const { ApolloServer } = require('@apollo/server');

// Importa a função para integrar o Apollo Server com o Express
const { expressMiddleware } = require('@apollo/server/express4');

// Importa o CORS para permitir o compartilhamento de recursos entre diferentes origens
const cors = require('cors');

// Importa o bodyParser para processar os dados JSON nas requisições
const bodyParser = require('body-parser');

// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Conecta ao banco de dados (usando um arquivo separado para configuração de DB)
require('./database/db'); // Conectar ao banco de dados

// Importa as rotas REST para autenticação, produtos e pedidos
const authRotas = require('./routes/authRotas');
const produtoRotas = require('./routes/produtoRotas');
const pedidoRotas = require('./routes/pedidoRotas');

// Importa os typeDefs (schemas) e resolvers do GraphQL
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

// Cria a instância do aplicativo Express
const app = express();

// Middlewares

// Habilita o CORS (Cross-Origin Resource Sharing) para permitir requisições de origens externas
app.use(cors());

// Middleware para processar o corpo das requisições JSON
app.use(bodyParser.json());

// Configura as rotas REST no caminho '/api', incluindo autenticação, produtos e pedidos
app.use('/api/autenticacao', authRotas);
app.use('/api', produtoRotas);
app.use('/api', pedidoRotas);

// Cria uma instância do servidor Apollo para trabalhar com GraphQL
const servidorApollo = new ApolloServer({
  typeDefs,     // Define os schemas (typeDefs) do GraphQL
  resolvers,    // Define os resolvers para resolver as consultas e mutações
});

// Função assíncrona para iniciar o servidor Apollo e Express
async function startServer() {
  // Inicia o servidor Apollo
  await servidorApollo.start();

  // Integra o Apollo Server com o Express na rota '/graphql'
  app.use('/graphql', expressMiddleware(servidorApollo));

  // Define a porta do servidor (usa a variável de ambiente PORT ou 5000 como padrão)
  const PORTA = process.env.PORT || 5000;

  // Inicia o servidor Express na porta especificada e exibe uma mensagem
  app.listen(PORTA, () => console.log(`🚀 Servidor rodando na porta ${PORTA}`));
}

// Chama a função para iniciar o servidor
startServer();
