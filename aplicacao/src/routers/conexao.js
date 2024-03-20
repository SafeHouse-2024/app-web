var express = require('express');
var router = express.Router();

var conexaoController = require('../controllers/conexaoController');

router.get('/:tabela/:condicao', function (req, res) {
  conexaoController.consulta(req, res);
});

router.post('/:tabela/:campos/:valores', function (req, res) {
  conexaoController.inserir(req, res);
});

router.put('/:tabela/:condicao/:campos', function (req, res) {
  conexaoController.alterar(req, res);
});

router.delete('/:tabela/:condicao', function (req, res) {
  conexaoController.excluir(req, res);
});

module.exports = router;