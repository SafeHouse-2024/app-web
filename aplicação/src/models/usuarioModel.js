var database = require('../database/config');

function autenticar(email, senha){
  console.log("Estou no model");
  var query = `SELECT * FROM usuario WHERE email = ${email} AND senha = ${senha}`;

  return database.executar(query);
}

module.exports = {
  autenticar
};