var computadorModel = require('../models/computadorModel');

function listar(req, res){
  var idComputador = req.body.idComputador;

  if(!idComputador){
    res.status(400).send('Id do computador não informado');
  }else{
    computadorModel.listar(idComputador)
    .then(function(resultados){
      if(resultados.length == 1){
        res.json({
          id: resultados[0].idMaquina,
          nome: resultados[0].nomeMaquina,
          sistemaOperacional: resultados[0].sistemaOperacional,
          processador: resultados[0].processador,
          memoria: resultados[0].memoriaRam,
          armazenamento: resultados[0].discoRigido
        })
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

}