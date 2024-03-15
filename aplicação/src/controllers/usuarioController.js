var usuarioModel = require('../models/usuarioModel');

function autenticar(req, res){
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if(!email || !senha){
    res.status(400).send('Email ou senha não informados');
  }else{
    usuarioModel.autenticar(email, senha)
    .then(function(resultados){
      if(resultados.length == 1){
        res.json({
          id: resultados[0].id,
          nome: resultados[0].nome,
          email: resultados[0].email
        })
      } else if(resultados.length == 0){
        res.status(401).send('Usuário não encontrado');
      } else {
        res.status(500).send('Mais de um usuário com o mesmo email e senha');
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