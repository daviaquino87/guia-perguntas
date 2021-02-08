//Requerimentos e importações
//
//
//criando constante de requerimento do express;
const express = require("express");
//passando o valor do express para a constante app;
const app = express();
//importando o bory parser;
const bodyparser = require("body-parser");
//exportanto conexão com banco de dados
const conection = require("./database/database");
//importando model de criação de tabela perguntas
const pergunta = require("./database/Pergunta");
//importando model de criação de tabela respostas
const resposta = require("./database/Resposta");
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//database
conection.authenticate().then(() => {console.log("conexão feita")}).catch((msgerro) => {console.log("erro")});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//Configurações de importações
//
//
//esse comando permite enviar os dados do formulario e o bodyparser vai traduzir em uma estrutura js;
app.use(bodyparser.urlencoded({extended: false}));
//permite ler dados de formulario enviados via json;
app.use(bodyparser.json());
//falando para o express usar o ejs como view engine;
app.set('view engine' , 'ejs');
//configurando para aceitar arquivos estaticos (css , js de front e img);
app.use(express.static('public'));
////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//Rotas
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//criando rota inicial da aplicação;
app.get("/",(req,res) => {
//procura as perguntas da tabela e retorna todos os dados da tabela;
//raw = trazer os dados "crus" , ou seja so os dados da tabela;
    pergunta.findAll({raw:true,order:[['id','DESC']]//ASC: ordem crecente - DESC: ordem decressente;
    }).then(perguntas => {
        res.render("index",{
            perguntas:perguntas}
        );
    });
});
//criando rota para perguntar;
app.get("/perguntar",(req,res) => {
    res.render("perguntar");
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//rota criada para receber os valores enviados pelo formulario ;
app.post("/savequestion",(req,res) => {
    var titulo = req.body.Titulo;
    var descricao = req.body.Descricao;
    //criando os campos na tabela;
    pergunta.create({
    //direciono o campo ao seu respectivo valor;
        titulo: titulo,
        descricao: descricao
    //caso os dados sejam salvos redireciono o usuario para a page home;
    }).then(() => {
        res.redirect("/")
    })
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//Rota que apresenta a pergunta e sua respectiva resposta:
app.get("/pergunta/:id" , (req , res) =>{
    var id = req.params.id;
    pergunta.findOne({
        where: {id:id},
    }).then(pergunta => {
        if(pergunta != undefined){//pergunta encontrada
            resposta.findAll({
                where:{perguntaID:pergunta.id},
                order:[['id','DESC']]
            }).then(respostas => {
                res.render("pergunta",{
                    perguntar:pergunta,
                    respostas:respostas
                });
            });        
        }else{//pergunta não encontrada
            res.redirect("/");
        }
    });
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//criando rota para responder;
//
app.post("/responder",(req,res) => {
    var corpo = req.body.corpo;
    var perguntaID = req.body.perguntaid;
    resposta.create({
        corpo,
        perguntaID
    }).then(() => {
        res.redirect("/pergunta/"+perguntaID);
    });
});
//
// abrindo conexão http;
app.listen(3000,()=> {
    console.log("Servido ligado!");
});
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////

