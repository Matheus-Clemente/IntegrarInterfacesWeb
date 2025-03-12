// Importa o Schema, model e bcryptjs para criptografar senhas
const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

// Define o schema para o modelo de Usuário
const usuarioSchema = new Schema({
  // Nome do usuário, obrigatório
  nome: { type: String, required: true },

  // E-mail do usuário, obrigatório e único (não pode haver dois usuários com o mesmo e-mail)
  email: { type: String, required: true, unique: true },

  // Senha do usuário, obrigatória
  senha: { type: String, required: true },

  // Papel do usuário, pode ser 'usuario' ou 'administrador', valor padrão é 'usuario'
  papel: { type: String, enum: ['usuario', 'administrador'], default: 'usuario' }
}, { timestamps: true }); // Adiciona timestamps de criação e atualização automaticamente

// Middleware pré-salvamento para criptografar a senha antes de salvar no banco
usuarioSchema.pre('save', async function (next) {
  // Verifica se a senha foi modificada antes de criptografar
  if (!this.isModified('senha')) return next();
  // Criptografa a senha com bcrypt usando um salt de 10 rounds
  this.senha = await bcrypt.hash(this.senha, 10);
  next(); // Prossegue com o salvamento
});

// Método para comparar a senha fornecida com a senha criptografada no banco
usuarioSchema.methods.compararSenha = function (senhaInformada) {
  return bcrypt.compare(senhaInformada, this.senha); // Compara as senhas
};

// Cria e exporta o modelo de Usuario
module.exports = model('Usuario', usuarioSchema);
