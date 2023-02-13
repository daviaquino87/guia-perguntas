const sequealize = require("sequelize");
const conection = new sequealize("guiaperguntas", "postgres", "1234", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = conection;
