//importanto sequealize;
const  Sequelize  = require("sequelize");
//importando conexão com banco de dados;
const conection = require("./database");

//definido dados da tabela;
const pergunta = conection.define('perguntas',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});
//criando a tabela;
pergunta.sync({force: false}).then(() => {
//caso a tabela seja criada exibe+ uma menssagem de confirmação;
    console.log("tabela de perguntas criada");
});
//exportanto o modulo;
module.exports = pergunta;