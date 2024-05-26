const express = require("express");
const app = express();
const porta = 3000;
var cors = require("cors");
var path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"]
    }
});

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

io.listen(3001);

io.on('connection', (socket) => {
    //if(socket.handshake.headers.token != '123') return 
    let nomeEmpresa = socket.handshake.headers.empresa;
    let nomeDarkStore = socket.handshake.headers.darkstore;
    let macAddress = socket.handshake.headers.macaddress;
    console.log(macAddress)
    socket.on(`send_message_${nomeEmpresa}`, (data) => {
        socket.broadcast.emit(`receive_message_${nomeEmpresa}`, data)
    })
    socket.on(`send_message_${nomeEmpresa}_${nomeDarkStore}`, (data) => {
        socket.broadcast.emit(`receive_message_${nomeEmpresa}_${nomeDarkStore}`, data)
    })
    socket.on(`send_message_${macAddress}`, (data) => {
        socket.broadcast.emit(`receive_message_${macAddress}`, data)
    })
})

app.listen(porta, () => {
    console.log(`Aplicação rodando nesse caminho http://localhost:${porta}`);
});