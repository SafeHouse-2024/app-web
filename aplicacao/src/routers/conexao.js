var express = require('express');
var router = express.Router();

var conexaoController = require('../controllers/conexaoController');

router.get('/:query', function (req, res) {
  conexaoController.conexao(req, res);
});

router.post('/:query', function (req, res) {
  conexaoController.conexao(req, res);
});

router.put('/:query', function (req, res) {
  conexaoController.conexao(req, res);
});

router.delete('/:query', function (req, res) {
  conexaoController.conexao(req, res);
});

module.exports = router;