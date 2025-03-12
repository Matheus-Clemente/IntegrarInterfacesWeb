// Importa o Schema e model do Mongoose para definir o modelo de dados
const { Schema, model } = require('mongoose');

// Define o schema para o modelo de Produto
const produtoSchema = new Schema({
  // Nome do produto, obrigatório
  nome: { type: String, required: true },

  // Descrição do produto, obrigatória
  descricao: { type: String, required: true },

  // Preço do produto, obrigatório
  preco: { type: Number, required: true },

  // Categoria do produto (ex: alimentos, bebidas), obrigatória
  categoria: { type: String, required: true },

  // Quantidade em estoque, valor padrão 0 caso não seja especificado
  estoque: { type: Number, default: 0 }
}, { timestamps: true }); // Adiciona timestamps de criação e atualização automaticamente

// Cria e exporta o modelo de Produto
module.exports = model('Produto', produtoSchema);
