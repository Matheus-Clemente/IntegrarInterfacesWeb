const { Schema, model } = require('mongoose');

const infoSchema = new Schema({
  produto: { type: Schema.Types.ObjectId, ref: 'Produto', required: true, unique: true }, // Relacionamento 1:1 com Produto
  nome: { type: String, required: true }, 
  preco: { type: Number, required: true } 
}, { timestamps: true });

module.exports = model('Info', infoSchema);
