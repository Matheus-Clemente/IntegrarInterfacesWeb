const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./database/db'); // Conectar ao banco de dados

// Importar as rotas REST
const authRotas = require('./routes/authRotas');
const produtoRotas = require('./routes/produtoRotas');
const pedidoRotas = require('./routes/pedidoRotas');

// Importar GraphQL TypeDefs e Resolvers
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Configurar rotas REST
app.use('/api/autenticacao', authRotas);
app.use('/api', produtoRotas);
app.use('/api', pedidoRotas);

// Criar servidor Apollo para GraphQL
const servidorApollo = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await servidorApollo.start();
  app.use('/graphql', expressMiddleware(servidorApollo));

  const PORTA = process.env.PORT || 5000;
  app.listen(PORTA, () => console.log(`🚀 Servidor rodando na porta ${PORTA}`));
}

startServer();
