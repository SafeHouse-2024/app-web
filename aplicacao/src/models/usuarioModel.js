var database = require('../database/config');

function autenticar(email, senha){
  const query = `SELECT * FROM Usuario WHERE email = '${email}' AND senha = '${senha}'`;

  return database.executar(query);
}

function cadastrar(email, cnpj, senha, nome){
  const query = `INSERT INTO empresa(nome, cnpj, senha, email) VALUES ('${nome}', '${cnpj}', '${senha}', '${email}');`;

  return database.executar(query);

}

module.exports = {
  autenticar,
  cadastrar
};