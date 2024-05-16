var conexaoModel = require('../models/conexaoModel');

function conexao(req, res){
  var query = req.params.query;
  conexaoModel.conexao(query)
  .then(function(resultados){
    res.json(resultados);
  })
  .catch(function(erro){
    res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
  conexao
};