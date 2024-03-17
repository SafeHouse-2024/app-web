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

function cadastrar(req, res){

  const emailEmpresa = req.body.emailEmpresa;
  const cnpj = req.body.cnpj;
  const senhaEmpresa = req.body.senhaEmpresa;
  const nomeEmpresa = req.body.nomeEmpresa

  usuarioModel.cadastrar(emailEmpresa, cnpj, senhaEmpresa, nomeEmpresa).then(resposta => {
    console.log(resposta.affectedRows)
    if(resposta.affectedRows == 1){
      res.status(201).send("Usuário criado com sucesso");
    }
  }).catch(error => res.send(error));

}

module.exports = {
  autenticar,
  cadastrar
};