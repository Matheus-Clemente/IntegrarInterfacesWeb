const mongoose = require('mongoose');

const servidor = 'localhost:27017'; // COLOQUE O NOME DO SEU SERVIDOR DO BANCO DE DADOS
const bancoDados = 'ecommerce';    // COLOQUE O NOME DO SEU BANCO DE DADOS

class BancoDeDados {
  constructor() {
    this._conectar();
  }

  _conectar() {
    mongoose.connect(`mongodb://${servidor}/${bancoDados}`)
      .then(() => {
        console.log('Conexão com o banco de dados realizada com sucesso.');
      })
      .catch((erro) => {
        console.error('Erro na conexão com o banco de dados:', erro);
      });
  }
}

module.exports = new BancoDeDados();