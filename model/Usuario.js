const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  papel: { type: String, enum: ['usuario', 'administrador'], default: 'usuario' }
}, { timestamps: true });

usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next();
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

usuarioSchema.methods.compararSenha = function (senhaInformada) {
  return bcrypt.compare(senhaInformada, this.senha);
};

module.exports = model('Usuario', usuarioSchema);