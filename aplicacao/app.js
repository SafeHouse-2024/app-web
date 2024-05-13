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

app.use("/", rotaIndex);
app.use("/conexao", rotaConexao);

io.listen(3001);

io.on('connection', (socket) => {
    //if(socket.handshake.headers.token != '123') return 
    let nomeEmpresa = socket.handshake.headers.empresa;
    let macAddress = "a4:63:a1:6d:0f:f7"
    console.log(socket.handshake.headers);
    socket.on(`send_message_${nomeEmpresa}`, (data) => {
        socket.broadcast.emit(`receive_message_${nomeEmpresa}`, data)
    })
    socket.on(`send_message_${macAddress}`, (data) => {
        socket.broadcast.emit(`receive_message_${macAddress}`, data)
    })
})

app.listen(porta, () => {
    console.log(`Aplicação rodando nesse caminho http://localhost:${porta}`);
});