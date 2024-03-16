var database = require('../database/config');

function listar(){
  var query = `SELECT * FROM computador`;

  return database.executar(query);
}

module.exports = {
  listar
};