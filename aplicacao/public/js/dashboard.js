// import { olaMundo } from "./main";

document.getElementById('open_btn').addEventListener('click', function () {
  document.getElementById('sidebar').classList.toggle('open-sidebar');
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

function exibirComputadores() {
  fkUsuaio = sessionStorage.IDUSUARIO;
  url = `/conexao/computador/WHERE idMaquina>0 AND fkUsuario=${fkUsuaio}`
  metodo = "GET"

  consultaBanco(url, metodo).then(function (computadores) {
    sessionStorage.IDMAQUINA = computadores[0].idMaquina;
    var lista = document.getElementById("listaComputadores");
    lista.innerHTML = "";
    computadores.forEach(function (computador) {
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(computador.idMaquina + " - " + computador.nomeMaquina + " - " + computador.processador + " - " + computador.memoriaRam + " - " + computador.discoRigido));
      lista.appendChild(li);
    });
  });
}

var monitores = document.querySelectorAll('main > .telas');

var itensMenu = document.querySelectorAll(".menu-lista > li");

function trocarTela(tela) {
  itemClicado = itensMenu[tela];
  itemClicado.classList.add("active");
  monitores[tela].style.display = "flex";
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
    if(maquina.classList.contains('activeMaquina')){
      maquina.classList.remove('activeMaquina')
    }else{
      maquina.classList.add('activeMaquina')
    }
  });
});


const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });