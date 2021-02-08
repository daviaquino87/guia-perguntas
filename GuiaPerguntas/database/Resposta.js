//importanto sequealize;
const  Sequelize  = require("sequelize");
//importando conexão com banco de dados;
const conection = require("./database");

const resposta = conection.define('respostas',{
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaID:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

resposta.sync({force:false}).then(() => {
    //caso a tabela seja criada exibe+ uma menssagem de confirmação;
        console.log("tabela de respostas criada");
});

module.exports = resposta;