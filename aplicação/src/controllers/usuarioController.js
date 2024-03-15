var usuarioModel = require('../models/usuarioModel');

function autenticar(req, res){
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if(!email || !senha){
    res.status(400).send('Email ou senha não informados');
  }else{
    usuarioModel.autenticar(email, senha)
    .then(function(resultados){
      console.log("Estou no then do controller");
      if(resultados.length > 0){
        res.status(200).json(resultados);
      } else {
        res.status(401).send('Email ou senha inválidos');
      }
    })
    .catch(function(erro){
      console.log("Estou no catch do controller");
      res.status(500).json(erro.sqlMessage);
    });
  }

}

module.exports = {
  autenticar
};