const express = require("express");

const app = express();
const path = require("path");
const bodyparser = require("body-parser");
const conection = require("./database/database");
const pergunta = require("./database/Pergunta");
const resposta = require("./database/Resposta");

conection
  .authenticate()
  .then(() => {
    console.log("conexão feita");
  })
  .catch((msgerro) => {
    console.log("erro");
  });

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  pergunta.findAll({ raw: true, order: [["id", "DESC"]] }).then((perguntas) => {
    res.render("index", {
      perguntas: perguntas,
    });
  });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/savequestion", (req, res) => {
  var titulo = req.body.Titulo;
  var descricao = req.body.Descricao;
  pergunta
    .create({
      titulo: titulo,
      descricao: descricao,
    })
    .then(() => {
      res.redirect("/");
    });
});

app.get("/pergunta/:id", (req, res) => {
  var id = req.params.id;
  pergunta
    .findOne({
      where: { id: id },
    })
    .then((pergunta) => {
      if (pergunta != undefined) {
        resposta
          .findAll({
            where: { perguntaID: pergunta.id },
            order: [["id", "DESC"]],
          })
          .then((respostas) => {
            res.render("pergunta", {
              perguntar: pergunta,
              respostas: respostas,
            });
          });
      } else {
        res.redirect("/");
      }
    });
});

app.post("/responder", (req, res) => {
  var corpo = req.body.corpo;
  var perguntaID = req.body.perguntaid;
  resposta
    .create({
      corpo,
      perguntaID,
    })
    .then(() => {
      res.redirect("/pergunta/" + perguntaID);
    });
});

app.listen(3000, () => {
  console.log("Servido ligado!");
});
