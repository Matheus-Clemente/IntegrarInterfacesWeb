// Importa o Schema e model do Mongoose para definir o modelo de dados
const { Schema, model } = require('mongoose');

// Define o schema para o modelo de Pedido
const pedidoSchema = new Schema({
  // Relaciona o pedido a um usuário específico (ID do usuário)
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },

  // Define os produtos do pedido, cada item é um objeto com 'produto' e 'quantidade'
  produtos: [{
    produto: { type: Schema.Types.ObjectId, ref: 'Produto' }, // Relaciona o produto ao modelo Produto
    quantidade: { type: Number, default: 1 } // Define a quantidade de cada produto no pedido
  }],

  // Total do pedido, deve ser um número e é obrigatório
  total: { type: Number, required: true },

  // Status do pedido, pode ser 'pendente', 'enviado', ou 'entregue'. O valor padrão é 'pendente'.
  status: { type: String, enum: ['pendente', 'enviado', 'entregue'], default: 'pendente' }
}, { timestamps: true }); // Adiciona timestamps de criação e atualização automaticamente

// Cria e exporta o modelo de Pedido
module.exports = model('Pedido', pedidoSchema);
