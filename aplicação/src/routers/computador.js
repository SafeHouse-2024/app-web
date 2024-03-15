var express = require('express');
var router = express.Router();

var computadorController = require('../controllers/computadorController');

router.post('/listar', function(req, res){
  computadorController.listar(req, res);
});