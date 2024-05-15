var conexaoModel = require('../models/conexaoModel');

function consulta(req, res){
  var query = req.params.query;
  conexaoModel.consulta(query)
  .then(function(resultados){
    res.json(resultados);
  })
  .catch(function(erro){
    res.status(500).json(erro.sqlMessage);
  });
}

function inserir(req, res){
  var tabela = req.params.tabela;
  var campos = req.params.campos;
  var valores = req.params.valores;
  conexaoModel.inserir(tabela, campos, valores)
  .then(function(resultados){
    res.json(resultados);
  })
  .catch(function(erro){
    res.status(500).json(erro.sqlMessage);
  });
}

function alterar(req, res){
  var query = req.params.query;
  conexaoModel.consulta(query)
  .then(function(resultados){
    res.json(resultados);
  })
  .catch(function(erro){
    res.status(500).json(erro.sqlMessage);
  });
}

function excluir(req, res){
  var tabela = req.params.tabela;
  var condicao = req.params.condicao;
  conexaoModel.excluir(tabela, condicao)
  .then(function(resultados){
    res.json(resultados);
  })
  .catch(function(erro){
    res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
  consulta,
  inserir,
  alterar,
  excluir
};