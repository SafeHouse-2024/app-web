var mysql = require("mysql2");
var sql = require('mssql');

// CONEXÃO DO MYSQL WORKBENCH
var mySqlConfig = {
    host: "44.208.29.157",
    database: "spectra",
    user: "admin",
    password: "Sptech#2024",
};

// Função para executar instruções SQL
function executar(instrucao) {
        return new Promise(function (resolve, reject) {
            var conexao = mysql.createConnection(mySqlConfig);
            conexao.connect();
            conexao.query(instrucao, function (erro, resultados) {
                conexao.end();
                if (erro) {
                    reject(erro);
                }
                console.log(resultados);
                resolve(resultados);
            });
            conexao.on('error', function (erro) {
                console.log("ERRO NO MySQL WORKBENCH: ", erro.sqlMessage);
                return ("ERRO NO MySQL WORKBENCH: ", erro.sqlMessage);
            });
        });
}

// Exportando a função que executa instruções SQL
module.exports = {
    executar
}
