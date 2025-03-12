const Pedido = require('../model/Pedido'); // Importa o modelo de Pedido

// Função para criar um novo pedido
exports.criarPedido = async (req, res) => {
  try {
    const { usuarioId, produtos } = req.body; // Obtém os dados do pedido do corpo da requisição
    const total = await calcularTotalPedido(produtos); // Calcula o valor total do pedido

    // Cria um novo pedido
    const pedido = new Pedido({
      usuario: usuarioId,
      produtos: produtos.map(p => ({ // Mapeia os produtos para a estrutura correta
        produto: p.produtoId,
        quantidade: p.quantidade
      })),
      total,
      status: 'pendente' // Define o status inicial do pedido como "pendente"
    });

    await pedido.save(); // Salva o pedido no banco de dados
    res.status(201).json(pedido); // Retorna o pedido criado
  } catch (erro) {
    res.status(400).json({ erro: erro.message }); // Retorna erro em caso de falha
  }
};

// Função para listar todos os pedidos
exports.listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate('usuario') // Popula os dados do usuário associado ao pedido
      .populate('produtos.produto'); // Popula os dados dos produtos no pedido
    res.json(pedidos); // Retorna a lista de pedidos
  } catch (erro) {
    res.status(500).json({ erro: erro.message }); // Retorna erro caso ocorra um problema
  }
};

// Função para atualizar um pedido existente
exports.atualizarPedido = async (req, res) => {
  try {
    const { id } = req.params; // Obtém o ID do pedido da URL
    const pedidoAtualizado = await Pedido.findByIdAndUpdate(id, req.body, { new: true }); // Atualiza o pedido
    if (!pedidoAtualizado) {
      return res.status(404).json({ erro: 'Pedido não encontrado' });
    }
    res.json(pedidoAtualizado); // Retorna o pedido atualizado
  } catch (erro) {
    res.status(500).json({ erro: erro.message }); // Retorna erro caso ocorra falha
  }
};

// Função para excluir um pedido
exports.deletarPedido = async (req, res) => {
  try {
    const { id } = req.params; // Obtém o ID do pedido da URL
    const pedidoRemovido = await Pedido.findByIdAndDelete(id); // Remove o pedido do banco de dados
    if (!pedidoRemovido) {
      return res.status(404).json({ erro: 'Pedido não encontrado' });
    }
    res.json({ mensagem: 'Pedido removido com sucesso' }); // Retorna mensagem de sucesso
  } catch (erro) {
    res.status(500).json({ erro: erro.message }); // Retorna erro caso ocorra falha
  }
};

// Função auxiliar para calcular o total do pedido
async function calcularTotalPedido(produtos) {
  let total = 0;
  for (const item of produtos) {
    const produto = await Produto.findById(item.produtoId); // Busca o produto no banco de dados
    if (produto) {
      total += produto.preco * item.quantidade; // Multiplica o preço pela quantidade e soma ao total
    }
  }
  return total; // Retorna o valor total do pedido
}
