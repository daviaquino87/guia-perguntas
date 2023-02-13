const Sequelize = require("sequelize");
const conection = require("./database");

const pergunta = conection.define("perguntas", {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});
pergunta.sync().then(() => {
  console.log("tabela de perguntas criada");
});

module.exports = pergunta;
