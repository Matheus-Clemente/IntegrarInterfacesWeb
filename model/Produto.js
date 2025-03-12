const { Schema, model } = require('mongoose');

const produtoSchema = new Schema({
  info: { type: Schema.Types.ObjectId, ref: 'Info', required: true }, 
  descricao: {type: String, required:true},
  categoria: { type: String, required: true },
  estoque: { type: Number, default: 0 },
  pedidos: [{
        pedido: { type: Schema.Types.ObjectId, ref: 'Pedido' },
        quantidade: { type: Number, default: 1 }
      }],
}, { timestamps: true });

module.exports = model('Produto', produtoSchema);
