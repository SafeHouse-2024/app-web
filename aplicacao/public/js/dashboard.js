// const { connect } = require("mssql");

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

let maquinas = document.querySelectorAll('.lista-maquinas > li')

maquinas.forEach(maquina => {
  maquina.firstElementChild.addEventListener('click', function () {
    console.log(maquina);
    if (maquina.classList.contains('activeMaquina')) {
      maquina.classList.remove('activeMaquina')
    } else {
      maquina.classList.add('activeMaquina')
    }
  });
});

const darkstores = []
// const maquinas = []

function buscarDarkstore() {
  consultaBanco(`conexao/darkstore/WHERE fkEmpresa = ${sessionStorage.IDEMPRESA}`, 'GET')
    .then(function (resposta) {
      if (resposta != null) {
        darkstores.push(resposta[0]); 
      }
    }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

    console.log(darkstores);
}

function buscarMaquinas() {
  consultaBanco(`conexao/computador/WHERE fkDarkstore = ${sessionStorage.FKDARKSTORE}`, 'GET')
    .then(function (resposta) {
      if (resposta) {
        maquinas.push(resposta);
      }
    }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
  console.log(maquinas);
}

function plotarDarkStore() {
  for (let i = 0; i < darkstores.length; i++) {
    document.querySelector('#empresasContent').innerHTML += `
    <div class="dark-content">
    <span
      class="status-maquina"
      style="background-color: yellow"
    ></span>
    <p>Dark Store - <span>${darkstores[0].uf}</span></p>
    <p>Quantidade de máquinas: <span>${maquinas.length}</span></p>
  </div>`;
  }
}

// window.addEventListener("DOMContentLoaded", () => {
//   if(sessionStorage.CARGO == "Gerente TI"){
//     buscarDarkstore();
//     buscarMaquinas();
//     plotarDarkStore();
//   }
// })

window.onload = function () {
  setTimeout(() => {
    if (sessionStorage.CARGO == "Gerente TI") {
      buscarDarkstore();
      buscarMaquinas();
      plotarDarkStore();
    }
    
    console.log(sessionStorage.CARGO == "Gerente TI"? "É Gerente TI": "Não é Gerente TI");
    for(let dark of darkstores){
      console.log(dark);
    }
  },3000);
}

// Faz essa função ser executada assim que a página carregar POR FAVOR IAN