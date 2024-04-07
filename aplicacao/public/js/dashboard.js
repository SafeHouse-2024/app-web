// import { olaMundo } from "./main";

document.getElementById('open_btn').addEventListener('click', function () {
  document.getElementById('sidebar').classList.toggle('open-sidebar');
});

const btnAtualizar = document.getElementById("btnAtualizar");
btnAtualizar.addEventListener("click", function(){
  exibirComputadores();
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