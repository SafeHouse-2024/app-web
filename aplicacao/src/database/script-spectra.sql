DROP DATABASE IF EXISTS spectra;

CREATE DATABASE spectra;
USE spectra;

CREATE TABLE Empresa(
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    razaoSocial VARCHAR(45) NOT NULL,
    telefone CHAR(11),
    cnpj CHAR (14) NOT NULL
);

CREATE TABLE DarkStore(
	idDarkStore INT AUTO_INCREMENT,
    rua VARCHAR(45) NOT NULL,
    numero INT NOT NULL,
    complemento VARCHAR(45),
    cep CHAR(8) NOT NULL,
    uf CHAR(2) NOT NULL,
    fkEmpresa INT,
    CONSTRAINT fkEmpresa FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
	PRIMARY KEY(idDarkStore, fkEmpresa)
);

CREATE TABLE Funcionario(
	idFuncionario INT AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    sobrenome VARCHAR(45) NOT NULL,
    senha VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    cargo VARCHAR(45) NOT NULL,
    fkSupervisor INT,
    fkDarkStore INT,
	CONSTRAINT fkSupervisor FOREIGN KEY (fkSupervisor) REFERENCES Funcionario(idFuncionario),
    CONSTRAINT fkDarkStore FOREIGN KEY (fkDarkStore) REFERENCES DarkStore(idDarkStore),
	PRIMARY KEY(idFuncionario, fkDarkStore)
);

CREATE TABLE Computador(
	idComputador INT PRIMARY KEY AUTO_INCREMENT,
    macAddress VARCHAR(30) NOT NULL,
    ativo VARCHAR(30) NOT NULL,
	fkDarkStore INT,
    fkFuncionario INT,
    CONSTRAINT fkFuncionario FOREIGN KEY (fkFuncionario) REFERENCES Funcionario(idFuncionario),
    CONSTRAINT fkDarkStoreComputador FOREIGN KEY (fkDarkStore) REFERENCES DarkStore(idDarkStore),
    CONSTRAINT chkAtivo CHECK (ativo IN ('Ativo', 'Inativo'))
);

CREATE TABLE Log(
	idLog INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(300) NOT NUll,
    dataLog DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkFuncionario INT,
    fkComputador INT,
    CONSTRAINT fkFuncionarioLog FOREIGN KEY (fkFuncionario) REFERENCES Funcionario(idFuncionario),
    CONSTRAINT fkComputadorLog FOREIGN KEY (fkComputador) REFERENCES Computador(idComputador)
);

CREATE TABLE CentralDeProcessamento(
	idCpu INT AUTO_INCREMENT,
    fabricante VARCHAR(45) NOT NULL,
    numeroNucleosFisicos INT NOT NULL,
    numeroNucleosLogicos INT NOT NULL,
    fkComputador INT,
    CONSTRAINT fkComputadorCpu FOREIGN KEY (fkComputador) REFERENCES Computador(idComputador),
	PRIMARY KEY(idCpu, fkComputador)
);

CREATE TABLE DiscoInterno(
	idDisco INT AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    tipo VARCHAR(45) NOT NULL,
    memoriaTotal INT NOT NULL,
    memoriaDisponivel INT NOT NULL,
    fkComputador INT,
    CONSTRAINT fkComputadorDisco FOREIGN KEY (fkComputador) REFERENCES Computador(idComputador),
    PRIMARY KEY(idDisco, fkComputador)
);

CREATE TABLE RegistroRede(
	idRegistro INT AUTO_INCREMENT,
    ping DOUBLE NOT NULL,
    velocidadeDownload DOUBLE NOT NULL,
    velocidadeUpload DOUBLE NOT NULL,
    dataRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkComputador INT,
    CONSTRAINT fkComputadorRede FOREIGN KEY (fkComputador) REFERENCES Computador(idComputador),
	PRIMARY KEY(idRegistro, fkComputador)
);

CREATE TABLE Memoria(
	idMemoria INT AUTO_INCREMENT,
    memoriaTotal INT NOT NULL,
    fkComputador INT,
    CONSTRAINT fkComputadorMemoria FOREIGN KEY (fkComputador) REFERENCES Computador(idComputador),
    PRIMARY KEY (idMemoria, fkComputador)
);

CREATE TABLE RegistroComponente(
	idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    taxaUso INT NOT NULL,
    dataRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkCpu INT,
    fkMemoria INT,
    CONSTRAINT fkCpuComponente FOREIGN KEY (fkCpu) REFERENCES CentralDeProcessamento(idCpu),
    CONSTRAINT fkMemoriaComponente FOREIGN KEY (fkMemoria) REFERENCES Memoria (idMemoria)
);


CREATE TABLE SistemaOperacional(
	idSistemaOperacional INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45)
);

CREATE TABLE UsoSistema(
	idUsoSistema INT AUTO_INCREMENT,
    dataInicialização DATETIME DEFAULT CURRENT_TIMESTAMP,
    tempoAtividadeMinutos INT,
    fkSistemaOperacional INT,
    CONSTRAINT fkSistemaUso FOREIGN KEY (fkSistemaOperacional) REFERENCES SistemaOperacional(idSistemaOperacional),
	PRIMARY KEY(idUsoSistema, fkSistemaOperacional)
);

CREATE TABLE Processo(
	idProcesso INT PRIMARY KEY AUTO_INCREMENT,
    nomeWindows VARCHAR(45),
    nomeLinux VARCHAR(45),
    permitido VARCHAR(30)
    CONSTRAINT chkPermitido CHECK (permitido IN ('Permitido', 'Não Permitido'))
);

CREATE TABLE ProcessoSistema(
	fkProcesso INT,
    fkSistemaOperacional INT,
    CONSTRAINT fkProcessoSistema FOREIGN KEY (fkProcesso) REFERENCES Processo(idProcesso),
    CONSTRAINT fkSistemaProcesso FOREIGN KEY (fkSistemaOperacional) REFERENCES SistemaOperacional(idSistemaOperacional),
    PRIMARY KEY(fkProcesso, fkSistemaOperacional)
);

CREATE TABLE SistemaComputador(
	fkSistemaOperacional INT,
    fkComputador INT,
    CONSTRAINT fkComputadorSistema FOREIGN KEY (fkComputador) REFERENCES Computador(idComputador),
    CONSTRAINT fkSistemaComputador FOREIGN KEY (fkSistemaOperacional) REFERENCES SistemaOperacional(idSistemaOperacional),
    PRIMARY KEY(fkSistemaOperacional, fkComputador)
);

INSERT INTO empresa (nome, razaoSocial, telefone, email, cnpj)
VALUES ('Empresa A', 'SãoPauloTechSchool', '1234567890', 'empresaA@example.com', '12345678901234');

INSERT INTO empresa (nome, razaoSocial, telefone, email, cnpj)
VALUES ('Empresa B', 'DarkStore', '0987654321', 'empresaB@example.com', '98765432109876');

INSERT INTO darkstore (rua, numero, complemento, cep, uf, fkEmpresa)
VALUES ('Rua A', 123, 'Apto 1', '12345678', 'SP', 1);

INSERT INTO darkstore (rua, numero, complemento, cep, uf, fkEmpresa)
VALUES ('Rua B', 456, 'Apto 2', '87654321', 'RJ', 2);

INSERT INTO funcionario (nome, sobrenome, senha, email, cargo, fkSupervisor, fkDarkStore)
VALUES ('Fernanda', 'Caramico', 'senha123','fernanda.caramico@sptech.school','Supervisor', null, 1);

INSERT INTO funcionario(nome, sobrenome, senha, email, cargo, fkSupervisor, fkDarkStore)
VALUES ('Marcos', 'Floriano','senha123', 'marcos.floriano@sptech.school', 'Desenvolvedor', 2, 1);