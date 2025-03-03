const { Schema, model } = require('mongoose');

const pedidoSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    produtos: [{
      produto: { type: Schema.Types.ObjectId, ref: 'Produto' },
      quantidade: { type: Number, default: 1 }
    }],
    total: { type: Number, required: true },
    status: { type: String, enum: ['pendente', 'enviado', 'entregue'], default: 'pendente' }
  }, { timestamps: true });
  
  module.exports = model('Pedido', pedidoSchema);
