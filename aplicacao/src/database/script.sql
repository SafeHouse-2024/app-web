DROP DATABASE IF EXISTS Spectra;

CREATE DATABASE Spectra;

USE Spectra;

CREATE TABLE empresa(
idEmpresa INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50),
razaoSocial VARCHAR(80),
telefone VARCHAR(12),
email VARCHAR(50),
senha VARCHAR(50),
cnpj CHAR(14)
);

CREATE TABLE Usuario(
  idUsuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(50),
  nome VARCHAR(45),
  senha VARCHAR(45),
  cargo VARCHAR(30),
  fkEmpresa INT,
  CONSTRAINT fk_Empresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

INSERT INTO empresa (nome, razaoSocial, telefone, email, cnpj)
VALUES ('Empresa A', 'SãoPauloTechSchool', '1234567890', 'empresaA@example.com', '12345678901234');

INSERT INTO empresa (nome, razaoSocial, telefone, email, cnpj)
VALUES ('Empresa B', 'DarkStore', '0987654321', 'empresaB@example.com', '98765432109876');

INSERT INTO Usuario (email, nome, senha, cargo, fkEmpresa)
VALUES ('fernanda.caramico@sptech.school', 'Usuário 1', 'senha123', 'Cargo 1', 1);

INSERT INTO Usuario (email, nome, senha, cargo, fkEmpresa)
VALUES ('marcos.floriano@sptech.school', 'Usuário 2', 'senha123', 'Cargo 2', 2);

CREATE TABLE computador(
  idMaquina INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  fkUsuario INT,
  CONSTRAINT fk_Usuario FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario),
  nomeMaquina VARCHAR(50),
  sistemaOperacional VARCHAR(50),
  processador VARCHAR(50),
  memoriaRam VARCHAR(50),
  discoRigido VARCHAR(50)
);

INSERT INTO computador (fkUsuario, nomeMaquina, sistemaOperacional, processador, memoriaRam, discoRigido) VALUES 
(2, 'Maquina 1', 'Windows 10', 'Intel Core i5', '8GB', '500GB');

INSERT INTO computador (fkUsuario, nomeMaquina, sistemaOperacional, processador, memoriaRam, discoRigido) VALUES 
(3, 'Maquina 2', 'Windows 10', 'Intel Core i7', '16GB', '1TB');

-- Quero fazer um select para buscar a maquina de um usuario especifico, buscando pelo nome do usuario
-- SELECT * FROM computador WHERE fkUsuario = (SELECT idUsuario FROM usuario WHERE email = 'marcos.floriano@sptech.school');

SELECT * FROM computador WHERE fkUsuario = (SELECT idUsuario FROM Usuario WHERE email = 'marcos.floriano@sptech.school');