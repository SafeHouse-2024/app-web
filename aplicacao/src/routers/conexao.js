var express = require('express');
var router = express.Router();

var conexaoController = require('../controllers/conexaoController');

router.get('/consulta/:tabela/:condicao', function (req, res) {
  conexaoController.consulta(req, res);
});

router.post('/inserir/:tabela/:campos/:valores', function (req, res) {
  conexaoController.inserir(req, res);
});

router.put('/alter/:tabela/:condicao/:campos', function (req, res) {
  conexaoController.alterar(req, res);
});

router.delete('/deletar/:tabela/:condicao', function (req, res) {
  conexaoController.excluir(req, res);
});

module.exports = router;