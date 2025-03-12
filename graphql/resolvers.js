// Importa os modelos do banco de dados
const Usuario = require('../model/Usuario');
const Produto = require('../model/Produto');
const Pedido = require('../model/Pedido');

const resolvers = {
  Query: {
    // Retorna todos os usuários cadastrados
    usuarios: async () => await Usuario.find(),
    
    // Retorna um usuário específico pelo ID
    usuario: async (_, { id }) => await Usuario.findById(id),
    
    // Retorna todos os produtos cadastrados
    produtos: async () => await Produto.find(),
    
    // Retorna um produto específico pelo ID
    produto: async (_, { id }) => await Produto.findById(id),
    
    // Retorna todos os pedidos, populando os dados do usuário e dos produtos dentro do pedido
    pedidos: async () => await Pedido.find().populate('usuario').populate('produtos.produto'),
  },

  Mutation: {
    // Cria um novo usuário no banco de dados e o retorna
    registrar: async (_, { nome, email, senha }) => {
      const novoUsuario = new Usuario({ nome, email, senha });
      await novoUsuario.save();
      return novoUsuario;
    },

    // Cria um novo produto no banco de dados e o retorna
    criarProduto: async (_, { nome, descricao, preco, categoria, estoque }) => {
      const novoProduto = new Produto({ nome, descricao, preco, categoria, estoque });
      await novoProduto.save();
      return novoProduto;
    },

    // Cria um novo pedido associando um usuário e uma lista de produtos
    criarPedido: async (_, { usuarioId, produtos }) => {
      const pedido = new Pedido({
        usuario: usuarioId, // Relaciona o pedido a um usuário específico
        produtos: produtos.map(p => ({
          produto: p.produtoId, // Associa cada item do pedido ao produto correspondente
          quantidade: p.quantidade // Define a quantidade de cada produto no pedido
        })),
        total: 0, // O cálculo do total do pedido ainda não está sendo feito
        status: 'pendente' // Define o status inicial do pedido
      });

      await pedido.save(); // Salva o pedido no banco de dados
      return pedido;
    },
  },
};

// Exporta os resolvers para serem usados no servidor GraphQL
module.exports = resolvers;
