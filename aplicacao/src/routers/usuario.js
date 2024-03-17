var express = require('express');
var router = express.Router();

var usuarioController = require('../controllers/usuarioController');

router.post('/autenticar', function(req, res){
  usuarioController.autenticar(req, res);
});

router.post("/cadastrar", (req, res) => {
  usuarioController.cadastrar(req, res)
})

module.exports = router;