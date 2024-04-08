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

var monitores = [
  document.getElementById("telaDash"),
  document.getElementById("telaUsuarios"),
  document.getElementById("telaNotificacoes"),
  document.getElementById("telaComputadores"),
  document.getElementById("telaLog"),
  document.getElementById("telaConfig"),
];

var itensMenu = [
  document.getElementById("menuDash"),
  document.getElementById("menuUsuarios"),
  document.getElementById("menuNotificacoes"),
  document.getElementById("menuComputadores"),
  document.getElementById("menuLog"),
  document.getElementById("menuConfig"),
];

function trocarTela(tela) {

  itemClicado = itensMenu[tela];
  itemClicado.classList.add("active");
  for (var i = 0; i < itensMenu.length; i++) {
    if (i != tela) {
      itensMenu[i].classList.remove("active");
    }
  }

  for (var i = 0; i < monitores.length; i++) {
    if (tela == 0) {
      monitores[0].style.display = "flex";
      monitores[1].style.display = "none";
      monitores[2].style.display = "none";
      monitores[3].style.display = "none";
      monitores[4].style.display = "none";
      monitores[5].style.display = "none";
    } else if (tela == 1) {
      monitores[0].style.display = "none";
      monitores[1].style.display = "flex";
      monitores[2].style.display = "none";
      monitores[3].style.display = "none";
      monitores[4].style.display = "none";
      monitores[5].style.display = "none";
    } else if (tela == 2) {
      monitores[0].style.display = "none";
      monitores[1].style.display = "none";
      monitores[2].style.display = "flex";
      monitores[3].style.display = "none";
      monitores[4].style.display = "none";
      monitores[5].style.display = "none";
    } else if(tela == 3){
      monitores[0].style.display = "none";
      monitores[1].style.display = "none";
      monitores[2].style.display = "none";
      monitores[3].style.display = "flex";
      monitores[4].style.display = "none";
      monitores[5].style.display = "none";
    }else if(tela==4){
      monitores[0].style.display = "none";
      monitores[1].style.display = "none";
      monitores[2].style.display = "none";
      monitores[3].style.display = "none";
      monitores[4].style.display = "flex";
      monitores[5].style.display = "none";
    }else if(tela == 5){
      monitores[0].style.display = "none";
      monitores[1].style.display = "none";
      monitores[2].style.display = "none";
      monitores[3].style.display = "none";
      monitores[4].style.display = "none";
      monitores[5].style.display = "flex";
    }
  }
}