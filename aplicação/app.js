const express = require("express");
const app = express();
const porta = 3000;
var cors = require("cors");
var path = require("path");

app.use(cors());

app.use(express.json());
// - Aqui, estamos usando o middleware `express.json()`. Esse middleware é responsável por analisar o corpo das requisições HTTP com o formato JSON e transformá-lo em um objeto JavaScript. Isso permite que você possa acessar os dados enviados no corpo da requisição de forma mais fácil.
app.use(express.urlencoded({ extended: false }));
// - Essa linha utiliza o middleware `express.urlencoded()`. Esse middleware é responsável por analisar o corpo das requisições HTTP com o formato de dados codificados em URL (como os dados enviados por formulários HTML) e transformá-los em um objeto JavaScript. O parâmetro `{ extended: false }` indica que não queremos permitir dados aninhados complexos.
app.use(express.static(path.join(__dirname, "public")));
// - Aqui, estamos usando o middleware `express.static()`. Esse middleware é responsável por servir arquivos estáticos, como imagens, CSS e JavaScript, para o cliente. O caminho para a pasta de arquivos estáticos é definido como `path.join(__dirname, "public")`, onde `__dirname` é uma variável global que representa o diretório atual do arquivo `app.js` e `"public"` é o nome da pasta onde estão os arquivos estáticos.

var rotaIndex = require("./src/routers/index");
var rotaUsuario = require("./src/routers/usuario");
// - Aqui, estamos importando o módulo `routes/index.js` e atribuindo-o à variável `rotaIndex`.

app.use("/", rotaIndex);
app.use("/usuario", rotaUsuario);
// - Aqui, estamos dizendo que a rota `/` deve ser tratada pelo módulo `routes/index.js`.

app.listen(porta, () => {
    console.log(`Aplicação rodando nesse caminho http://localhost:${porta}`);
});
// - Aqui, estamos iniciando o servidor na porta 3000 e exibindo uma mensagem no console informando que a aplicação está rodando.