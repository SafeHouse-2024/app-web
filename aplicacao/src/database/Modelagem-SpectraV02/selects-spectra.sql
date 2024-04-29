USE spectra;

# Fetch de todos os componentes do computador.
SELECT * FROM Componente c JOIN Computador pc ON c.fkComputador = pc.idComputador WHERE pc.idComputador = 3;

# Fetch do id do componente, o nome do componente, o nome da característica e seu respectivo valor
SELECT c.idComponente as 'Id do Componente', c.nome as 'Nome do Componente', ca.nome as 'Nome da Característica', ca.valor 'Valor da Característica' 
FROM Componente c JOIN Computador pc ON c.fkComputador = pc.idComputador JOIN CaracteristicaComponente ca ON ca.fkComponente = c.idComponente;

# Fetch dos registros de um componente.
SELECT * FROM Componente c JOIN RegistroComponente rc ON c.idComponente = rc.fkComponente WHERE c.fkComputador = 3 AND c.nome LIKE 'Processador';

#Fetch do valor das medições do processador
SELECT rc.valor FROM Componente c JOIN RegistroComponente rc ON c.idComponente = rc.fkComponente WHERE c.fkComputador = 3 AND c.nome LIKE 'Processador';

#Fetch do valor das medições da memória Ram
SELECT rc.valor FROM Componente c JOIN RegistroComponente rc ON c.idComponente = rc.fkComponente WHERE c.fkComputador = 3 AND c.nome LIKE 'Memória';

#Fetch da quantidade de disco livre e ocupado
SELECT ca.nome, ca.valor FROM CaracteristicaComponente ca JOIN Componente c ON c.idComponente = ca.fkComponente WHERE c.fkComputador = 3 AND c.nome LIKE 'Disco' AND ca.nome LIKE 'Memória Total' OR ca.nome LIKE 'Memória Disponível';

#Fetch das informações de rede da máquina
SELECT ca.nome, ca.valor FROM CaracteristicaComponente ca JOIN Componente c ON c.idComponente = ca.fkComponente WHERE c.fkComputador = 3 AND c.nome LIKE 'Rede';

#Fetch dos logs de uma máquina
SELECT l.descricao FROM Log l JOIN Computador c ON c.idComputador = l.fkComputador WHERE c.idComputador = 3;

#Fetch dos logs de uma máquina e seus respectivos horários
SELECT l.descricao, l.dataLog FROM Log l JOIN Computador c ON c.idComputador = l.fkComputador WHERE c.idComputador = 3;

#Fetch de todos os logs;
SELECT * FROM Log;

#Fetch de todos os funcionários de uma Dark Store
SELECT * FROM Funcionario f JOIN DarkStore dk ON f.fkDarkStore = dk.idDarkStore;