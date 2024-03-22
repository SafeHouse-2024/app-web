var database = require('../database/config');

function consulta(tabela, condicao='') {
  var query = `SELECT * FROM ${tabela} ${condicao}`;
  return database.executar(query);
}
function inserir(tabela, campos, valores) {
  var query = `INSERT INTO ${tabela} (${campos}) VALUES (${valores})`;
  return database.executar(query);
}
function alterar(tabela, condicao, campos) {
  var query = `UPDATE ${tabela} SET ${campos} WHERE ${condicao}`;
  return database.executar(query);
}
function excluir(tabela, condicao) {
  var query = `DELETE FROM ${tabela} WHERE ${condicao}`;
  return database.executar(query);
}
module.exports = {
  consulta,
  inserir,
  alterar,
  excluir
};