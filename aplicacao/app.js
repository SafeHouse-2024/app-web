const express = require("express");
const app = express();
const porta = 3000;
var cors = require("cors");
var path = require("path");


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

var rotaIndex = require("./src/routers/index");
var rotaConexao = require("./src/routers/conexao");
var rotaSlack = require("./src/routers/slack");

app.use("/", rotaIndex);
app.use("/conexao", rotaConexao);
app.use("/slack", rotaSlack);

app.listen(porta, () => {
    console.log(`Aplicação rodando nesse caminho http://localhost:${porta}`);
});