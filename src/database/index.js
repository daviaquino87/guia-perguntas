const conection = require("./database");

conection
  .authenticate()
  .then(() => {
    console.log("conexão feita");
  })
  .catch((msgerro) => {
    console.log("erro");
  });

module.exports = conection;
