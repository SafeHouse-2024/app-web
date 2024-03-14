var usuarioModel = require('../models/usuarioModel');

function autenticar(req, res){
  var email = req.body.email;
  var senha = req.body.senha;

  usuarioModel.autenticar(email, senha)
  .then(function(resultados){
    if(resultados.length > 0){
      res.status(200).json(resultados);
    } else {
      res.status(401).send('Email ou senha inválidos');
    }
  })
  .catch(function(erro){
    res.status(500).send(erro);
  });
}

module.exports = {
  autenticar
};