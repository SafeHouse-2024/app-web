var computadorModel = require('../models/computadorModel');

function listar(req, res){
    computadorModel.listar()
    .then(function(resultados){
      if(resultados.length > 0){
        res.status(200).json(resultados);
      } else if(resultados.length == 0){
        res.status(401).send('Computador não encontrado');
      } else {
        res.status(500).send('Mais de um computador com o mesmo id');
      }
    })
    .catch(function(erro){
      console.log("Estou no catch do controller");
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  listar
};