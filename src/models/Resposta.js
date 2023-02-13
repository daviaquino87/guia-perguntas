const Sequelize = require("sequelize");
const conection = require("../database/database");

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

resposta.sync();

module.exports = resposta;
