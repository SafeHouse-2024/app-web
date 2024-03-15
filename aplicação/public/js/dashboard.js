window.onload = function() {
  fetch("/computador/listar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idComputador: 3
    }),
  })
    .then(function (resposta) {
      if (resposta.ok){
        console.log(`#SUCESSO: ${resposta}`);
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
};