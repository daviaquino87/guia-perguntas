const sequealize = require("sequelize");
const conection = new sequealize('guiaperguntas','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = conection;