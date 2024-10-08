USE spectra;

# Fetch de todos os componentes do computador.
SELECT *
FROM Componente c
    JOIN Computador pc ON c.fkComputador = pc.idComputador
WHERE
    pc.idComputador = 3;

# Fetch do id do componente, o nome do componente, o nome da característica e seu respectivo valor
SELECT c.idComponente as 'Id do Componente', c.nome as 'Nome do Componente', ca.nome as 'Nome da Característica', ca.valor 'Valor da Característica'
FROM
    Componente c
    JOIN Computador pc ON c.fkComputador = pc.idComputador
    JOIN CaracteristicaComponente ca ON ca.fkComponente = c.idComponente;

# Fetch dos registros de um componente.
SELECT *
FROM
    Componente c
    JOIN RegistroComponente rc ON c.idComponente = rc.fkComponente
WHERE
    c.fkComputador = 6
    AND c.nome LIKE 'Processador';

#Fetch do valor das medições do processador
SELECT rc.valor as 'valor', rc.dataRegistro as 'dataRegistro'
FROM
    Componente c
    JOIN RegistroComponente rc ON c.idComponente = rc.fkComponente
WHERE
    c.fkComputador = 6
    AND c.nome LIKE 'Processador' ORDER BY idRegistro LIMIT 5;

#Fetch do valor das medições da memória Ram
SELECT rc.valor
FROM
    Componente c
    JOIN RegistroComponente rc ON c.idComponente = rc.fkComponente
WHERE
    c.fkComputador = 3
    AND c.nome LIKE 'Memória';

#Fetch da quantidade de disco livre e ocupado
SELECT ca.nome, ca.valor
FROM
    CaracteristicaComponente ca
    JOIN Componente c ON c.idComponente = ca.fkComponente
WHERE
    c.fkComputador = 3
    AND c.nome LIKE 'Disco'
    AND ca.nome LIKE 'Memória Total'
    OR ca.nome LIKE 'Memória Disponível';

#Fetch das informações de rede da máquina
SELECT ca.nome, ca.valor
FROM
    CaracteristicaComponente ca
    JOIN Componente c ON c.idComponente = ca.fkComponente
WHERE
    c.fkComputador = 3
    AND c.nome LIKE 'Rede';

#Fetch dos logs de uma máquina
SELECT l.descricao
FROM Log l
    JOIN Computador c ON c.idComputador = l.fkComputador
WHERE
    c.idComputador = 3;

#Fetch dos logs de uma máquina e seus respectivos horários
SELECT l.descricao, l.dataLog
FROM Log l
    JOIN Computador c ON c.idComputador = l.fkComputador
WHERE
    c.idComputador = 3;

#Fetch de todos os logs;
SELECT * FROM Log;

#Fetch de todos os funcionários de uma Dark Store
SELECT *
FROM Usuario u
    JOIN DarkStore dk ON u.fkDarkStore = dk.idDarkStore;

#FETCH de todos os nomes dos processos de um sistema operacional
SELECT np.nome
FROM
    ProcessoSistema ps
    JOIN NomeProcesso np ON np.idNome = ps.fkNomeProcesso
WHERE
    ps.fkSistemaOperacional = 1;

#Fetch do e-mail de todos os funcionários que recebem notificação de uma máquina específica
SELECT u.email
FROM
    Notificacao n
    JOIN Computador p ON p.idComputador = n.fkComputador
    JOIN Usuario u ON n.fkUsuario = u.idUsuario
WHERE
    p.idComputador = 5;

SELECT pc.*, c.nome as 'Nome do Componente', ca.nome as 'Nome da Característica', ca.valor 'Valor da Característica'
FROM
    Componente c
    JOIN Computador pc ON c.fkComputador = pc.idComputador
    JOIN CaracteristicaComponente ca ON ca.fkComponente = c.idComponente
WHERE
    pc.`fkDarkStore` = 1;

SELECT pc.*, c.nome as 'nomeComponente', ca.nome as 'nomeCaracteristica', ca.valor 'valorCaracteristica'
FROM
    Componente c
    JOIN Computador pc ON c.fkComputador = pc.idComputador
    JOIN CaracteristicaComponente ca ON ca.fkComponente = c.idComponente
WHERE
    pc.fkDarkStore = 1;

  SELECT Log.* FROM Log
    JOIN Computador ON Log.fkComputador = Computador.idComputador
    JOIN DarkStore ON Computador.fkDarkStore = DarkStore.idDarkStore
    WHERE DarkStore.idDarkStore = 1;
    
SELECT Log.*, computador.nome as computadorNome FROM Log
  JOIN Computador ON Log.fkComputador = Computador.`idComputador`
  JOIN DarkStore ON Computador.fkDarkStore = DarkStore.idDarkStore;

SELECT Log.*, computador.nome as computadorNome FROM Log
  JOIN Computador ON Log.fkComputador = Computador.`idComputador`
  JOIN DarkStore ON Computador.fkDarkStore = DarkStore.idDarkStore
  WHERE DarkStore.idDarkStore = 1;

SELECT log.*, usuario.nome as usuarioNome FROM Log
  LEFT JOIN Usuario ON Log.fkUsuario = Usuario.idUsuario;

SELECT DISTINCT(pc.idComputador), count(rc.valor) FROM RegistroComponente rc JOIN Componente c ON c.idComponente = rc.fkComponente JOIN Computador pc ON c.fkComputador = pc.IdComputador JOIN DarkStore d ON d.idDarkStore = pc.fkDarkStore WHERE dataRegistro >= NOW() - INTERVAL 30000 MINUTE AND c.nome LIKE 'Processador' AND rc.valor > 80 AND pc.idComputador = 7 GROUP BY pc.idComputador;
SELECT DISTINCT(pc.idComputador), count(rc.valor) FROM RegistroComponente rc 
JOIN Componente c ON c.idComponente = rc.fkComponente 
JOIN Computador pc ON c.fkComputador = pc.IdComputador JOIN DarkStore d ON d.idDarkStore = pc.fkDarkStore 
WHERE dataRegistro >= NOW() - INTERVAL 30000 MINUTE AND c.nome LIKE 'Memória' AND rc.valor > SUBSTRING_INDEX((SELECT ca.valor FROM CaracteristicaComponente ca JOIN Componente c ON c.idComponente = ca.fkComponente JOIN Computador pc ON pc.idComputador = c.fkComputador WHERE pc.idComputador = 7 AND c.nome LIKE 'Memória' AND ca.nome LIKE 'Memória Total'), " ", 1) * 0.8 AND pc.idComputador = 7 GROUP BY pc.idComputador;
SELECT DISTINCT(pc.idComputador) FROM Componente c JOIN Computador pc ON c.fkComputador = pc.IdComputador JOIN CaracteristicaComponente ca ON ca.fkComponente = c.idComponente WHERE c.nome LIKE 'Disco' AND (SUBSTRING_INDEX((SELECT ca.valor FROM CaracteristicaComponente ca JOIN Componente c ON c.idComponente = ca.fkComponente JOIN Computador pc ON pc.idComputador = c.fkComputador WHERE pc.idComputador = 7 AND c.nome LIKE 'Disco' AND ca.nome LIKE 'Memória Disponível'), " ", 1)) < (SUBSTRING_INDEX((SELECT ca.valor FROM CaracteristicaComponente ca JOIN Componente c ON c.idComponente = ca.fkComponente JOIN Computador pc ON pc.idComputador = c.fkComputador WHERE pc.idComputador = 7 AND c.nome LIKE 'Disco' AND ca.nome LIKE 'Memória Total'), " ", 1) * 0.2) AND pc.idComputador = 7;
SELECT DISTINCT(pc.idComputador), count(rc.valor) FROM Componente c JOIN Computador pc ON c.fkComputador = pc.IdComputador JOIN CaracteristicaComponente ca ON ca.fkComponente = c.idComponente JOIN RegistroComponente rc ON rc.fkComponente = c.idComponente WHERE NOW() - INTERVAL 5 MINUTE AND (c.nome LIKE 'Rede' AND (rc.nome LIKE 'Ping' AND rc.valor > 100) OR (rc.nome LIKE 'Download' AND rc.valor < 5) OR (rc.nome LIKE 'Upload' AND rc.valor < 5)) AND pc.idComputador = 7 GROUP BY pc.idComputador;
SELECT DISTINCT(pc.idComputador), count(l.idLog) FROM Computador pc JOIN Log l ON l.fkComputador = pc.idComputador WHERE pc.idComputador = 7 AND l.descricao LIKE '%pendrive%' OR l.descricao LIKE '%processo%' GROUP BY pc.idComputador;

INSERT INTO RegistroComponente(nome ,valor, fkComponente) VALUES ('Taxa de Uso','15', 2);
SELECT DISTINCT(pc.idComputador), d.nome,  count(rc.valor) FROM RegistroComponente rc JOIN Componente c ON c.idComponente = rc.fkComponente JOIN Computador pc ON c.fkComputador = pc.IdComputador JOIN DarkStore d ON d.idDarkStore = pc.fkDarkStore WHERE dataRegistro >= NOW ;
SELECT DISTINCT(pc.idComputador), count(rc.valor) as 'count'
                        FROM RegistroComponente rc 
                        JOIN Componente c ON c.idComponente = rc.fkComponente 
                        JOIN Computador pc ON c.fkComputador = pc.IdComputador 
                        JOIN DarkStore d ON d.idDarkStore = pc.fkDarkStore 
                        WHERE dataRegistro >= NOW() - INTERVAL 30000 MINUTE 
                        AND c.nome LIKE 'Processador'
                        AND rc.valor > 80
                        AND pc.idComputador = 7
                        GROUP BY pc.idComputador;
SELECT * FROM Componente;
SELECT * FROM CaracteristicaComponente;
SELECT * FROM Computador;
INSERT INTO Componente(nome, fkComputador) VALUES ('Processador', 28);
INSERT INTO RegistroComponente(nome, valor, fkComponente) VALUES ('Taxa de Uso', '90', 25);