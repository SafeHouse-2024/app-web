var mysql = require("mysql2");
var sql = require('mssql');

// CONEXÃO DO MYSQL WORKBENCH
var sqlServerConfig = {
    server: "ec2-52-70-29-252.compute-1.amazonaws.com",
    database: "spectra",
    user: "sa",
    password: "sptech1234@",
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

// Função para executar instruções SQL
function executar(instrucao) {
    return new Promise(function (resolve, reject) {
        sql.connect(sqlServerConfig).then(function () {
            return sql.query(instrucao);
        }).then(function (resultados) {
            console.log(resultados);
            resolve(resultados.recordset);
        }).catch(function (erro) {
            reject(erro);
            console.log('ERRO: ', erro);
        });
        sql.on('error', function (erro) {
            return ("ERRO NO SQL SERVER (Azure): ", erro);
        });
    });

}

// Exportando a função que executa instruções SQL
module.exports = {
    executar
}
