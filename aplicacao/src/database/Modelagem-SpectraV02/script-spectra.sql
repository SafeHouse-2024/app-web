CREATE DATABASE spectra;
USE spectra;

CREATE TABLE Empresa(
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    razaoSocial VARCHAR(45) NOT NULL,
    telefone CHAR(11),
    cnpj CHAR (14) NOT NULL,
    codigoCriacao VARCHAR(36) DEFAULT(UUID())
);

CREATE TABLE TokenVerificacao(
	idTokenVerificacao INT AUTO_INCREMENT,
    valor VARCHAR(36) NOT NULL DEFAULT(UUID()),
	fkEmpresa INT,
    CONSTRAINT fkTokenEmpresa FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
    PRIMARY KEY(idTokenVerificacao, fkEmpresa)
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
    nome VARCHAR(45),
    sobrenome VARCHAR(45),
    senha VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    cargo VARCHAR(45),
    fkSupervisor INT,
    fkDarkStore INT,
	CONSTRAINT fkSupervisor FOREIGN KEY (fkSupervisor) REFERENCES Funcionario(idFuncionario),
    CONSTRAINT fkDarkStore FOREIGN KEY (fkDarkStore) REFERENCES DarkStore(idDarkStore),
	PRIMARY KEY(idFuncionario,fkDarkStore)
);

CREATE TABLE Computador(
	idComputador INT AUTO_INCREMENT,
    macAddress VARCHAR(30) NOT NULL UNIQUE,
    nome VARCHAR(45),
    ativo VARCHAR(30) NOT NULL DEFAULT 'Inativo',
    codigoAcesso VARCHAR(36) DEFAULT(UUID()),
	fkDarkStore INT,
    fkFuncionario INT,
    fkToken INT,
    CONSTRAINT fkFuncionario FOREIGN KEY (fkFuncionario) REFERENCES Funcionario(idFuncionario),
    CONSTRAINT fkDarkStoreComputador FOREIGN KEY (fkDarkStore) REFERENCES DarkStore(idDarkStore),
    CONSTRAINT fkTokenComputador FOREIGN KEY (fkToken) REFERENCES TokenVerificacao(idTokenVerificacao),
    CONSTRAINT chkAtivo CHECK (ativo IN ('Ativo', 'Inativo')),
    PRIMARY KEY(idComputador, fkDarkStore, fkFuncionario)
);

CREATE TABLE Componente(
	idComponente INT AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    fkComputador INT,
    CONSTRAINT fkComponente FOREIGN KEY (fkComputador) REFERENCES Computador(idComputador),
    PRIMARY KEY(idComponente, fkComputador)
);

CREATE TABLE CaracteristicaComponente(
	idCaracteristicaComponente INT AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    valor VARCHAR(255) NOT NULL,
    fkComponente INT,
    CONSTRAINT fkComponenteCaracteristica FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente),
	PRIMARY KEY(idCaracteristicaComponente, fkComponente)
);

CREATE TABLE RegistroComponente(
	idRegistro INT AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    valor VARCHAR(255) NOT NULL,
    dataRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkComponente INT,
    CONSTRAINT fkRegistroComponente FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente),
    PRIMARY KEY(idRegistro, fkComponente)
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

CREATE TABLE SistemaOperacional(
	idSistemaOperacional INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45)
);

CREATE TABLE UsoSistema(
	idUsoSistema INT AUTO_INCREMENT,
    dataInicializacao DATETIME,
    tempoAtividadeMinutos INT,
    fkSistemaOperacional INT,
    fkComputador INT,
    CONSTRAINT fkComputadorUso FOREIGN KEY (fkComputador) REFERENCES Computador(idComputador),
    CONSTRAINT fkSistemaUso FOREIGN KEY (fkSistemaOperacional) REFERENCES SistemaOperacional(idSistemaOperacional),
	PRIMARY KEY(idUsoSistema, fkSistemaOperacional, fkComputador)
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

INSERT INTO Empresa(nome, email, razaoSocial, cnpj) VALUES ('Rappi', 'rappi@gmail.com', 'Rappi entregas', '12345678910123'),
('Daki', 'daki@gmail.com', 'Daki entregas', '12345678910123');

INSERT INTO DarkStore (rua, numero, cep, uf, fkEmpresa) VALUES ('Avenida Ipê Roxo', 372, '08140200', 'SP', 1);

INSERT INTO Funcionario(nome, sobrenome, email, senha, cargo, fkDarkStore) VALUES ('Ian', 'Silva Santos', 'ian@gmail.com', '12345', 'Gerente', 1),
('Leonel', 'Superbi', 'victor.leonel@gmail.com', '12345', 'Picker', 1), ('Maquina', null, 'rappi@spectra.com', '12345', null, 1);

INSERT INTO SistemaOperacional (nome) VALUES ('Windows'), ('Linux');
INSERT INTO Computador (macAddress, ativo, fkDarkStore, fkFuncionario) VALUES ('00:1B:44:11:3A:B7', 'Inativo', 1, 3), 
('00:1B:44:11:3A:B8', 'Inativo', 1, 3), ('00:1B:44:11:3A:B1', 'Inativo', 1, 3), ('00:1B:44:11:3A:C7', 'Inativo', 1, 3), ('00:1B:44:11:3A:A7', 'Inativo', 1, 3);	
INSERT INTO SistemaComputador (fkComputador, fkSistemaOperacional) VALUES (1, 1), (2, 2);
INSERT INTO Componente(nome, fkComputador) VALUES ('Processador', 1), ('Memória', 1), ('Disco', 1), ('Disco', 1),
('Processador', 2), ('Memória', 2), ('Disco', 2), ('Disco', 2), ('Processador', 3), ('Memória', 3), ('Disco', 3), ('Disco', 3),
('Processador', 4), ('Memória', 4), ('Disco', 4), ('Disco', 4), ('Processador', 5), ('Memória', 5), ('Disco', 5), ('Disco', 5);

SELECT c.nome FROM Computador pc JOIN Componente c ON c.fkComputador = pc.idComputador;

# Componentes da máquina 1
INSERT INTO CaracteristicaComponente (nome, valor, fkComponente) VALUES ('Fabricante', 'Intel', 1);
INSERT INTO CaracteristicaComponente (nome, valor, fkComponente) VALUES ('memoriaTotal', '16', 2);
INSERT INTO CaracteristicaComponente (nome, valor, fkComponente) VALUES ('memoriaTotal', '1TB', 3);
INSERT INTO CaracteristicaComponente (nome, valor, fkComponente) VALUES ('memoriaTotal', '128GB', 4);

# Componentes da máquina 2
INSERT INTO CaracteristicaComponente (nome, valor, fkComponente) VALUES ('Fabricante', 'Intel', 5);
INSERT INTO CaracteristicaComponente (nome, valor, fkComponente) VALUES ('memoriaTotal', '16', 6);
INSERT INTO CaracteristicaComponente (nome, valor, fkComponente) VALUES ('memoriaTotal', '1TB', 7);
INSERT INTO CaracteristicaComponente (nome, valor, fkComponente) VALUES ('memoriaTotal', '128GB', 8);

# Componentes da máquina 3
INSERT INTO CaracteristicaComponente (nome, valor, fkComponente) VALUES ('Fabricante', 'Intel', 9);
INSERT INTO CaracteristicaComponente (nome, valor, fkComponente) VALUES ('memoriaTotal', '16', 10);
INSERT INTO CaracteristicaComponente (nome, valor, fkComponente) VALUES ('memoriaTotal', '1TB', 11);
INSERT INTO CaracteristicaComponente (nome, valor, fkComponente) VALUES ('memoriaTotal', '128GB', 12);

# Componentes da máquina 4
INSERT INTO CaracteristicaComponente (nome, valor, fkComponente) VALUES ('Fabricante', 'Intel', 13);
INSERT INTO CaracteristicaComponente (nome, valor, fkComponente) VALUES ('memoriaTotal', '16', 14);
INSERT INTO CaracteristicaComponente (nome, valor, fkComponente) VALUES ('memoriaTotal', '1TB', 15);
INSERT INTO CaracteristicaComponente (nome, valor, fkComponente) VALUES ('memoriaTotal', '128GB', 16);

# Componentes da máquina 5
INSERT INTO CaracteristicaComponente (nome, valor, fkComponente) VALUES ('Fabricante', 'Intel', 17);
INSERT INTO CaracteristicaComponente (nome, valor, fkComponente) VALUES ('memoriaTotal', '16', 18);
INSERT INTO CaracteristicaComponente (nome, valor, fkComponente) VALUES ('memoriaTotal', '1TB', 19);
INSERT INTO CaracteristicaComponente (nome, valor, fkComponente) VALUES ('memoriaTotal', '128GB', 20);

SELECT pc.macAddress, c.nome, ca.nome, ca.valor FROM CaracteristicaComponente ca JOIN Componente c ON ca.fkComponente = c.idComponente JOIN Computador pc ON pc.idComputador = c.fkComputador WHERE pc.idComputador = 1;

INSERT INTO RegistroComponente (nome, valor, fkComponente) VALUES ('taxaUso', '20', 1), ('TaxaUso', '20', 2);

SELECT c.nome, r.nome, r.valor FROM RegistroComponente r JOIN Componente c ON c.idComponente = r.idRegistro 
JOIN Computador pc ON pc.idComputador = c.fkComputador WHERE pc.idComputador = 1;