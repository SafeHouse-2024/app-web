var express = require("express");
var rota = express.Router();
var axios = require("axios");

rota.use(express.json());

rota.post("/mensagem", async (req, res) => {
    const mensagem = req.body.message;
    console.log(mensagem);
    const url = 'https://hooks.slack.com/services/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';
    const data = {
        text: mensagem
    };

    try {
        await axios.post(url, data);
        res.status(200).send('Mensagem enviada com sucesso!');
    } catch (error) {
        res.status(400).send('Erro ao enviar mensagem!');
    }
});

module.exports = rota;