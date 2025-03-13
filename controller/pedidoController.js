const Pedido = require('../model/Pedido');
const Produto = require('../model/Produto');

exports.criarPedido = async (req, res) => {
  try {
    const { usuarioId, produtos } = req.body;

    const total = await calcularTotalPedido(produtos);

    const pedido = new Pedido({
      usuario: usuarioId,
      produtos: produtos.map(p => ({
        produto: p.produtoId,
        quantidade: p.quantidade
      })),
      total,
      status: 'pendente'
    });

    await pedido.save();
    res.status(201).json(pedido);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

exports.listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate('usuario').populate('produtos.produto');
    res.json(pedidos);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

exports.atualizarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedidoAtualizado = await Pedido.findByIdAndUpdate(id, req.body, { new: true });
    if (!pedidoAtualizado) {
      return res.status(404).json({ erro: 'Pedido não encontrado' });
    }
    res.json(pedidoAtualizado);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

exports.deletarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedidoRemovido = await Pedido.findByIdAndDelete(id);
    if (!pedidoRemovido) {
      return res.status(404).json({ erro: 'Pedido não encontrado' });
    }
    res.json({ mensagem: 'Pedido removido com sucesso' });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

// Função para calcular o total do pedido
async function calcularTotalPedido(produtos) {
  let total = 0;
  for (const item of produtos) {
    const produto = await Produto.findById(item.produtoId);
    if (produto) {
      total += produto.preco * item.quantidade;
    }
  }
  return total;
}
