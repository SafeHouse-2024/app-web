function listarComputadores() {
  return fetch("/computador/listar", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (resposta) {
      if (resposta.ok){
        console.log(`#SUCESSO: ${resposta}`);
        return resposta.json();
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}

function exibirComputadores(){
  consultaBanco("/conexao/usuario/idUsuario=1", "GET");
}

function consultaBanco(caminho, metodo) {
  fetch(`${caminho}`, {
    method: `${metodo}`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (resposta) {
      if (resposta.ok){
        console.log(`#SUCESSO: ${resposta}`);
        return resposta.json();
      }
    })
    .then(function (usuarios) {
      console.log(usuarios);
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}