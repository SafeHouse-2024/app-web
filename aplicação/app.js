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
// - Aqui, estamos importando o módulo `routes/index.js` e atribuindo-o à variável `rotaIndex`.

app.use("/", rotaIndex);
app.use("/usuario", rotaUsuario);
app.use("/computador", rotaComputador);
// - Aqui, estamos dizendo que a rota `/` deve ser tratada pelo módulo `routes/index.js`.

app.listen(porta, () => {
    console.log(`Aplicação rodando nesse caminho http://localhost:${porta}`);
});
// - Aqui, estamos iniciando o servidor na porta 3000 e exibindo uma mensagem no console informando que a aplicação está rodando.