const Produto = require('../model/Produto');

exports.criarProduto = async (req, res) => {
  try {
    const { nome, descricao, preco, categoria, estoque } = req.body;
    const novoProduto = new Produto({ nome, descricao, preco, categoria, estoque });
    await novoProduto.save();
    res.status(201).json(novoProduto);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

exports.atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const produtoAtualizado = await Produto.findByIdAndUpdate(id, req.body, { new: true });
    if (!produtoAtualizado) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.json(produtoAtualizado);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

exports.deletarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const produtoRemovido = await Produto.findByIdAndDelete(id);
    if (!produtoRemovido) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.json({ mensagem: 'Produto removido com sucesso' });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};
