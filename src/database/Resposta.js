const Sequelize = require("sequelize");
const conection = require("./database");

const resposta = conection.define("respostas", {
  corpo: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  perguntaID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

resposta.sync().then(() => {
  console.log("tabela de respostas criada");
});

module.exports = resposta;