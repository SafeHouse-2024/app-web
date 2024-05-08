document.getElementById('open_btn').addEventListener('click', function () {
  document.getElementById('sidebar').classList.toggle('open-sidebar');
});
document.querySelector('.fechar-popup-user').addEventListener('click', () => {
  document.querySelector('.popup-usuario').style.display = 'none';
});
document.querySelector('.button_user').addEventListener('click', () => {
  document.querySelector('.popup-usuario').style.display = 'flex';
});

function consultaBanco(caminho, metodo) {
  return fetch(`${caminho}`, {
    method: `${metodo}`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (resposta) {
      if (resposta.ok) {
        return resposta.json();
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}

var monitores = document.querySelectorAll('main > .telas');
var itensMenu = document.querySelectorAll(".menu-lista > li");


function trocarTela(tela) {
  itemClicado = itensMenu[tela];
  itemClicado.classList.add("active");
  monitores[tela].style.display = "flex";
  document.title = itemClicado.innerText;
  for (var i = 0; i < itensMenu.length; i++) {
    if (i != tela) {
      itensMenu[i].classList.remove("active");
      monitores[i].style.display = "none";
    }
  }
}


// let maquinas = document.querySelectorAll('.lista-maquinas > li')

// maquinas.forEach(maquina => {
//   maquina.firstElementChild.addEventListener('click', function () {
//     console.log(maquina);
//     if (maquina.classList.contains('activeMaquina')) {
//       maquina.classList.remove('activeMaquina')
//     } else {
//       maquina.classList.add('activeMaquina')
//     }
//   });
// });

usuario = {
  idUsuario: sessionStorage.IDUSUARIO,
  nome: sessionStorage.NOME,
  sobrenome: sessionStorage.SOBRENOME,
  tipo: sessionStorage.TIPO,
  email: sessionStorage.EMAIL,
  senha: sessionStorage.SENHA,
  cargo: sessionStorage.CARGO,
  fkDarkStore: sessionStorage.FKDARKSTORE,
}

function buscarDarkStore() {
  url = `/conexao/darkstore/WHERE idDarkStore=${usuario.fkDarkStore}`;
  metodo = "GET";

  return consultaBanco(url, metodo).then(function (darkStore) {
    return darkStore;
  });
}

darkStoreLoja = {
  idDarkStore: darkStore[0].idDarkStore,
  nome: darkStore[0].nome,
  endereco: darkStore[0].endereco,
  uf: darkStore[0].uf,
  fkEmpresa: darkStore[0].fkEmpresa,
  computadores: [],
  funcionarios: darkStore[0].funcionarios
}


function buscarEmpresa() {
  url = `/conexao/empresa/WHERE idEmpresa=${darkStoreLoja.fkEmpresa}`;
  metodo = "GET";

  return consultaBanco(url, metodo).then(function (empresa) {
    return empresa;
  });
}

function buscarComputadoresDarkStore() {
  url = `/conexao/computador/WHERE fkDarkStore=${darkStoreLoja.idDarkStore}`;
  metodo = "GET";

  return consultaBanco(url, metodo).then(function (computadores) {
    return computadores;
  });
}

computador = {
  idComputador: '',
  nome: '',
  fkDarkStore: '',
  fkUsuario: '',
  ativo: false,
  macAddress: '',
  componentes: [],
}

buscarComputadoresDarkStore().forEach(computador => {
  computador.idComputador = computador.idComputador;
  computador.nome = computador.nome;
  computador.fkDarkStore = computador.fkDarkStore;
  computador.fkUsuario = computador.fkUsuario;
  computador.ativo = computador.ativo;
  computador.macAddress = computador.macAddress;
  computador.componentes = computador.componentes;

  darkStoreLoja.computadores.push(computador);
});
