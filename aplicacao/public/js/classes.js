class Empresa {
    nome = '';
    cnpj = '';
    cnpj = '';
    email = '';
    darkStores = [];

    constructor(nome, cnpj, email) {
        this.nome = nome;
        this.cnpj = cnpj;
        this.email = email;
    }

    addDarkStore(darkStore) {
        this.darkStores.push(darkStore);
    }

    getDarkStores() {
        return this.darkStores;
    }

    getDarkStoreByNome(nome) {
        return this.darkStores.find(ds => ds.nome === nome);
    }

    getDarkStoreByIndex(index) {
        return this.darkStores[index];
    }

    removeDarkStoreByIndex(index) {
        this.darkStores.splice(index, 1);
    }

    removeDarkStoreByNome(nome) {
        const index = this.darkStores.findIndex(ds => ds.nome === nome);
        this.darkStores.splice(index, 1);
    }

    

}

class DarkStore {
  idDarkStore = '';
  nome = '';
  endereco = '';
  uf = '';
  fkEmpresa = '';
  computadores = [];
  funcionarios = [];

  constructor(idDarkStore, nome, endereco, uf) {
      this.idDarkStore = idDarkStore;
      this.nome = nome;
      this.endereco = endereco;
      this.uf = uf;
  }

  getNome() {
    return this.nome;
  }

  getEndereco() {
    return this.endereco;
  }

  getUf() {
    return this.uf;
  }

  getIdDarkStore() {
    return this.idDarkStore;
  }

  getFkEmpresa() {
    return this.fkEmpresa;
  }

  setFkEmpresa(fkEmpresa) {
    this.fkEmpresa = fkEmpresa;
  }

  setNome(nome) {
    this.nome = nome;
  }

  setEndereco(endereco) {
    this.endereco = endereco;
  }

  setUf(uf) {
    this.uf = uf;
  }

  setIdDarkStore(idDarkStore) {
    this.idDarkStore = idDarkStore;
  }

  addComputador(computador) {
    this.computadores.push(computador);
  }

  getComputadores() {
    return this.computadores;
  }

  getComputadorByNome(nome) {
    return this.computadores.find(comp => comp.nome === nome);
  }

  getComputadorByIndex(index) {
    return this.computadores[index];
  }

  removeComputadorByIndex(index) {
    this.computadores.splice(index, 1);
  }

  removeComputadorByNome(nome) {
    const index = this.computadores.findIndex(comp => comp.nome === nome);
    this.computadores.splice(index, 1);
  }

  addFuncionario(funcionario) {
    this.funcionarios.push(funcionario);
  }

  getFuncionarios() {
    return this.funcionarios;
  }

  getFuncionarioByNome(nome) {
    return this.funcionarios.find(func => func.nome === nome);
  }

  getFuncionarioByIndex(index) {
    return this.funcionarios[index];
  }

  removeFuncionarioByIndex(index) {
    this.funcionarios.splice(index, 1);
  }

  removeFuncionarioByNome(nome) {
    const index = this.funcionarios.findIndex(func => func.nome === nome);
    this.funcionarios.splice(index, 1);
  }
}

class Computador {
  idComputador = '';
  nome = '';
  fkDarkStore = '';
  fkUsuario = '';
  ativo = false;
  macAddress = '';
  componentes = [];
  

  constructor(idComputador, nome, fkDarkStore, fkUsuario, ativo, macAddress) {
      this.idComputador = idComputador;
      this.nome = nome;
      this.fkDarkStore = fkDarkStore;
      this.fkUsuario = fkUsuario;
      this.ativo = ativo;
      this.macAddress = macAddress;
  }

  setAtivo(ativo) {
    this.ativo = ativo;
  }

  setMacAddress(macAddress) {
    this.macAddress = macAddress;
  }

  getMacAddress() {
    return this.macAddress;
  }

  getAtivo() {
    return this.ativo;
  }

  getNome() {
    return this.nome;
  }

  getIdComputador() {
    return this.idComputador;
  }

  getFkDarkStore() {
    return this.fkDarkStore;
  }

  getFkUsuario() {
    return this.fkUsuario;
  }

  setFkUsuario(fkUsuario) {
    this.fkUsuario = fkUsuario;
  }

  setFkDarkStore(fkDarkStore) {
    this.fkDarkStore = fkDarkStore;
  }

  setNome(nome) {
    this.nome = nome;
  }

  setIdComputador(idComputador) {
    this.idComputador = idComputador;
  }
}

class Componente{
  idComponente = '';
  nome = '';
  fkComputador = '';
  caracteristicas = [];

  constructor(idComponente, nome, fkComputador) {
    this.idComponente = idComponente;
    this.nome = nome;
    this.fkComputador = fkComputador;
  }

  getNome() {
    return this.nome;
  }

  getIdComponente() {
    return this.idComponente;
  }

  getFkComputador() {
    return this.fkComputador;
  }

  setFkComputador(fkComputador) {
    this.fkComputador = fkComputador;
  }

  setNome(nome) {
    this.nome = nome;
  }

  setIdComponente(idComponente) {
    this.idComponente = idComponente;
  }
}

class Caracteristicas{
  idCaracteristicas = '';
  nome = '';
  valor = '';
  fkComponente = '';

  constructor(idCaracteristicas, nome, valor, fkComponente) {
    this.idCaracteristicas = idCaracteristicas;
    this.nome = nome;
    this.valor = valor;
    this.fkComponente = fkComponente;
  }

  getNome() {
    return this.nome;
  }

  getValor() {
    return this.valor;
  }

  getIdCaracteristicas() {
    return this.idCaracteristicas;
  }

  getFkComponente() {
    return this.fkComponente;
  }

  setFkComponente(fkComponente) {
    this.fkComponente = fkComponente;
  }

  setNome(nome) {
    this.nome = nome;
  }

  setValor(valor) {
    this.valor = valor;
  }

  setIdCaracteristicas(idCaracteristicas) {
    this.idCaracteristicas = idCaracteristicas;
  }
}

class Usuario{
  idUsuario = '';
  nome = '';
  sobrenome = '';
  email = '';
  senha = '';
  tipo = '';
  cargo = '';
  fkSupervisor = '';
  fkDarkStore = '';
}