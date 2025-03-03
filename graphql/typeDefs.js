const { gql } = require('graphql-tag');

const typeDefs = gql`
  type Usuario {
    _id: ID!
    nome: String!
    email: String!
    papel: String!
  }

  type Produto {
    _id: ID!
    nome: String!
    descricao: String
    preco: Float!
    categoria: String!
    estoque: Int
  }

  type Pedido {
    _id: ID!
    usuario: Usuario!
    produtos: [ProdutoPedido!]!
    total: Float!
    status: String!
  }

  type ProdutoPedido {
    produto: Produto!
    quantidade: Int!
  }

  type Query {
    usuarios: [Usuario]
    usuario(id: ID!): Usuario
    produtos: [Produto]
    produto(id: ID!): Produto
    pedidos: [Pedido]
  }

  type Mutation {
    registrar(nome: String!, email: String!, senha: String!): Usuario
    criarProduto(nome: String!, descricao: String, preco: Float!, categoria: String!, estoque: Int): Produto
    criarPedido(usuarioId: ID!, produtos: [ProdutoPedidoInput!]!): Pedido
  }

  input ProdutoPedidoInput {
    produtoId: ID!
    quantidade: Int!
  }
`;

module.exports = typeDefs;
