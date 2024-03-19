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
var rotaUsuario = require("./src/routers/usuario");
var rotaComputador = require("./src/routers/computador");
var rotaConexao = require("./src/routers/conexao");

app.use("/", rotaIndex);
app.use("/usuario", rotaUsuario);
app.use("/computador", rotaComputador);
app.use("/conexao", rotaConexao);

app.listen(porta, () => {
    console.log(`Aplicação rodando nesse caminho http://localhost:${porta}`);
});