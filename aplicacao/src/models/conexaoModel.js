var database = require('../database/config');

function consulta(query) {
  return database.executar(query);
}
function inserir(tabela, campos, valores) {
  var query = `INSERT INTO ${tabela} (${campos}) VALUES (${valores})`;
  return database.executar(query);
}
function alterar(query) {
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