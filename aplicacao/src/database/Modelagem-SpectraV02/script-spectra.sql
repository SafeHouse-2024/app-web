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
    CONSTRAINT fkTokenEmpresa FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa) ON DELETE CASCADE,
    PRIMARY KEY(idTokenVerificacao, fkEmpresa)
);

CREATE TABLE DarkStore(
	idDarkStore INT AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    rua VARCHAR(45) NOT NULL,
    numero INT NOT NULL,
    complemento VARCHAR(45),
    cep CHAR(8) NOT NULL,
    uf CHAR(2) NOT NULL,
    fkEmpresa INT,
    CONSTRAINT fkEmpresa FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa) ON DELETE CASCADE,
	PRIMARY KEY(idDarkStore, fkEmpresa)
);

CREATE TABLE Usuario(
	idUsuario INT AUTO_INCREMENT,
    nome VARCHAR(45),
    tipo VARCHAR(45) NOT NULL,
    sobrenome VARCHAR(45),
    senha VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    cargo VARCHAR(45),
    fkSupervisor INT,
    fkDarkStore INT,
    CONSTRAINT chTipo CHECK (tipo IN ('Funcionario', 'Maquina')),
	CONSTRAINT fkSupervisor FOREIGN KEY (fkSupervisor) REFERENCES Usuario(idUsuario),
    CONSTRAINT fkDarkStore FOREIGN KEY (fkDarkStore) REFERENCES DarkStore(idDarkStore) ON DELETE CASCADE,
	PRIMARY KEY(idUsuario,fkDarkStore)
);

CREATE TABLE Computador(
	idComputador INT AUTO_INCREMENT,
    macAddress VARCHAR(30) NOT NULL UNIQUE,
    nome VARCHAR(45),
    ativo VARCHAR(30) NOT NULL DEFAULT 'Inativo',
    codigoAcesso VARCHAR(36) DEFAULT(UUID()),
	fkDarkStore INT,
    fkUsuario INT,
    fkToken INT,
    CONSTRAINT fkUsuario FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario),
    CONSTRAINT fkDarkStoreComputador FOREIGN KEY (fkDarkStore) REFERENCES DarkStore(idDarkStore) ON DELETE CASCADE,
    CONSTRAINT fkTokenComputador FOREIGN KEY (fkToken) REFERENCES TokenVerificacao(idTokenVerificacao),
    CONSTRAINT chkAtivo CHECK (ativo IN ('Ativo', 'Inativo')),
    PRIMARY KEY(idComputador, fkDarkStore, fkUsuario)
);

CREATE TABLE Componente(
	idComponente INT AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    fkComputador INT,
    CONSTRAINT fkComponente FOREIGN KEY (fkComputador) REFERENCES Computador(idComputador) ON DELETE CASCADE,
    PRIMARY KEY(idComponente, fkComputador)
);

CREATE TABLE CaracteristicaComponente(
	idCaracteristicaComponente INT AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    valor VARCHAR(225) NOT NULL,
    fkComponente INT,
    CONSTRAINT fkComponenteCaracteristica FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente) ON DELETE CASCADE,
	PRIMARY KEY(idCaracteristicaComponente, fkComponente)
);

CREATE TABLE RegistroComponente(
	idRegistro INT AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    valor VARCHAR(70) NOT NULL,
    dataRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkComponente INT,
    CONSTRAINT fkRegistroComponente FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente) ON DELETE CASCADE,
    PRIMARY KEY(idRegistro, fkComponente)
);

CREATE TABLE Log(
	idLog INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(300) NOT NUll,
    dataLog DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkUsuario INT,
    fkComputador INT,
    CONSTRAINT fkUsuarioLog FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario),
    CONSTRAINT fkComputadorLog FOREIGN KEY (fkComputador) REFERENCES Computador(idComputador) ON DELETE CASCADE
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
    CONSTRAINT fkComputadorUso FOREIGN KEY (fkComputador) REFERENCES Computador(idComputador) ON DELETE CASCADE,
    CONSTRAINT fkSistemaUso FOREIGN KEY (fkSistemaOperacional) REFERENCES SistemaOperacional(idSistemaOperacional),
	PRIMARY KEY(idUsoSistema, fkSistemaOperacional, fkComputador)
);

CREATE TABLE Processo(
    idProcesso INT PRIMARY KEY AUTO_INCREMENT,
    permitido VARCHAR(30),
    CONSTRAINT chkPermitido CHECK (permitido IN ('Permitido', 'Nao Permitido'))
);

CREATE TABLE NomeProcesso(
    idNome INT AUTO_INCREMENT,
    nome VARCHAR(45),
    fkProcesso INT,
    CONSTRAINT fkNomeProcesso FOREIGN KEY (fkProcesso) REFERENCES Processo(idProcesso) ON DELETE CASCADE,
    PRIMARY KEY (idNome, fkProcesso)
);

CREATE TABLE ProcessoSistema(
	fkNomeProcesso INT,
    fkSistemaOperacional INT,
    CONSTRAINT fkNomeProcessoSistema FOREIGN KEY (fkNomeProcesso) REFERENCES NomeProcesso(idNome) ON DELETE CASCADE,
    CONSTRAINT fkSistemaProcesso FOREIGN KEY (fkSistemaOperacional) REFERENCES SistemaOperacional(idSistemaOperacional),
    PRIMARY KEY(fkNomeProcesso, fkSistemaOperacional)
);

CREATE TABLE SistemaComputador(
	fkSistemaOperacional INT,
    fkComputador INT,
    CONSTRAINT fkSistemaOperacionalComputador FOREIGN KEY (fkSistemaOperacional) REFERENCES SistemaOperacional(idSistemaOperacional),
    CONSTRAINT fkComputadorSistema FOREIGN KEY (fkComputador) REFERENCES Computador(idComputador) ON DELETE CASCADE,
    PRIMARY KEY (fkSistemaOperacional, fkComputador)
);

INSERT INTO Empresa(nome, email, razaoSocial, cnpj) VALUES ('Rappi', 'rappi@gmail.com', 'Rappi entregas', '12345678910123'),
('Daki', 'daki@gmail.com', 'Daki entregas', '12345678910123');

INSERT INTO DarkStore (nome, rua, numero, cep, uf, fkEmpresa) VALUES ('Campo Grande','Avenida Ipê Roxo', 372, '08140200', 'SP', 1);

INSERT INTO Usuario(nome, sobrenome, tipo, email, senha, cargo, fkDarkStore) VALUES ('Ian', 'Silva Santos', 'Funcionario','ian@gmail.com', '12345', 'Gerente', 1),
('Leonel', 'Superbi', 'Funcionario','victor.leonel@gmail.com', '12345', 'Picker', 1), ('Maquina', null, 'Maquina','rappi@spectra.com', '12345', null, 1), ('Marcos', 'Floriano', 'Funcionario','marcos@gmail.com', '12345', 'Picker', 1),
('Nathan', 'Silva', 'Funcionario','nathan.silva@gmail.com', '1234', 'Supervisor', 1);

INSERT INTO SistemaOperacional (nome) VALUES ('Windows'), ('Linux');
INSERT INTO Computador (macAddress, ativo, fkDarkStore, fkUsuario) VALUES ('00:1B:44:11:3A:B7', 'Inativo', 1, 3), 
('00:1B:44:11:3A:B8', 'Inativo', 1, 3), ('00:1B:44:11:3A:B1', 'Inativo', 1, 3), ('00:1B:44:11:3A:C7', 'Inativo', 1, 3), ('00:1B:44:11:3A:A7', 'Inativo', 1, 3), ('00:15:5d:b6:c0:22', 'Inativo', 1, 3);
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

INSERT INTO Processo (permitido) VALUES ('Nao Permitido');
INSERT INTO Processo (permitido) VALUES ('Nao Permitido');
INSERT INTO NomeProcesso (nome, fkProcesso) VALUES ('Discord',1);
INSERT INTO NomeProcesso (nome, fkProcesso) VALUES ('discord.exe',1);
INSERT INTO NomeProcesso (nome, fkProcesso) VALUES ('firefox',2);
INSERT INTO NomeProcesso (nome, fkProcesso) VALUES ('firefox.exe',2);

INSERT INTO ProcessoSistema (fkNomeProcesso, fkSistemaOperacional) VALUES (1, 2), (3, 2), (2,1), (4, 1);

delimiter //
CREATE PROCEDURE total_seguranca (idComputador INT)
BEGIN
SELECT DISTINCT(pc.idComputador), count(l.idLog) as 'totalRegistros' FROM Computador pc JOIN Log l ON l.fkComputador = pc.idComputador WHERE pc.idComputador = idComputador AND l.descricao LIKE '%pendrive%' OR l.descricao LIKE '%processo%' GROUP BY pc.idComputador;
END
//