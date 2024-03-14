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

INSERT INTO empresa (nome, razaoSocial, telefone, email, cnpj)
VALUES ('Empresa A', 'Razão Social A', '1234567890', 'empresaA@example.com', '12345678901234');

INSERT INTO empresa (nome, razaoSocial, telefone, email, cnpj)
VALUES ('Empresa B', 'Razão Social B', '0987654321', 'empresaB@example.com', '98765432109876');

INSERT INTO Usuario (email, nome, senha, cargo, fkEmpresa)
VALUES ('usuario1@example.com', 'Usuário 1', 'senha123', 'Cargo 1', 1);

INSERT INTO Usuario (email, nome, senha, cargo, fkEmpresa)
VALUES ('usuario2@example.com', 'Usuário 2', 'senha456', 'Cargo 2', 2);
