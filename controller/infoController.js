const Info = require('../model/Info');
const Produto = require('../model/Produto');


exports.criarInfo = async (req, res) => {
  try {
    const { produtoId, nome, preco } = req.body;

    
    const produto = await Produto.findById(produtoId);
    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    const infoExistente = await Info.findOne({ produto: produtoId });
    if (infoExistente) {
      return res.status(400).json({ erro: 'Info já cadastrada para este produto' });
    }

    const novaInfo = new Info({ produto: produtoId, nome, preco });
    await novaInfo.save();

    produto.info = novaInfo._id;
    await produto.save();

    res.status(201).json(novaInfo);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

exports.obterInfo = async (req, res) => {
  try {
    const { produtoId } = req.params;

    const info = await Info.findOne({ produto: produtoId }).populate('produto', 'categoria estoque');
    if (!info) {
      return res.status(404).json({ erro: 'Info não encontrada para este produto' });
    }

    res.json(info);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

exports.atualizarInfo = async (req, res) => {
  try {
    const { produtoId } = req.params;
    const { nome, preco } = req.body;

    const infoAtualizada = await Info.findOneAndUpdate(
      { produto: produtoId },
      { nome, preco },
      { new: true }
    );

    if (!infoAtualizada) {
      return res.status(404).json({ erro: 'Info não encontrada para este produto' });
    }

    res.json(infoAtualizada);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};


exports.deletarInfo = async (req, res) => {
  try {
    const { produtoId } = req.params;

    const infoRemovida = await Info.findOneAndDelete({ produto: produtoId });

    if (!infoRemovida) {
      return res.status(404).json({ erro: 'Info não encontrada para este produto' });
    }

    // Remove a referência à Info no Produto
    await Produto.findByIdAndUpdate(produtoId, { info: null });

    res.json({ mensagem: 'Info removida com sucesso' });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};
