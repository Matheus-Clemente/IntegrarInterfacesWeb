const { Schema, model } = require('mongoose');

const produtoSchema = new Schema({
    nome: { type: String, required: true },
    descricao: {type:String, required: true},
    preco: { type: Number, required: true },
    categoria: { type: String, required: true },
    estoque: { type: Number, default: 0 }
  }, { timestamps: true });
  
  module.exports = model('Produto', produtoSchema);
