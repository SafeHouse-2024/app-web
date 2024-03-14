CREATE DATABASE Spectra;

USE Spectra;

CREATE TABLE empresa(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50),
razaoSocial VARCHAR(80),
telefone VARCHAR(12),
email VARCHAR(50),
cnpj CHAR(14)
);

CREATE TABLE Usuario(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(50),
  nome VARCHAR(45),
  senha VARCHAR(45),
  cargo VARCHAR(30),
  fkEmpresa INT,
  CONSTRAINT fk_Empresa FOREIGN KEY (fkEmpresa) REFERENCES Empresa(id)
);