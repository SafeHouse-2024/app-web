// const { connect } = require("mssql");

// const { text } = require("express");

document.getElementById('open_btn').addEventListener('click', function () {
  document.getElementById('sidebar').classList.toggle('open-sidebar');
});
document.querySelector('#fechar-popup-user').addEventListener('click', () => {
  document.querySelector('#popup_usuario').style.display = 'none';
});
document.querySelector('#button_user').addEventListener('click', () => {
  document.querySelector('#popup_usuario').style.display = 'flex';
});
document.getElementById('fechar-popup-maquina').addEventListener('click', () => {
  document.getElementById('popup_maquina').style.display = 'none';
});
document.querySelector('#button_maquina').addEventListener('click', () => {
  document.getElementById('popup_maquina').style.display = 'flex';
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



function trocarTela(tela) {
  var monitores = document.querySelectorAll('main > .telas');
  var itensMenu = document.querySelectorAll(".menu-lista > li");
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

let usoSistema;
const darkstores = []
const selectDasCidades = document.querySelector('#cidades');

function buscarDarkstore() {
  consulta = `SELECT * FROM DarkStore WHERE fkEmpresa = ${sessionStorage.IDEMPRESA}`
  buscarMaquinas();
  buscarUsoMaquina();
  buscarGraficos();
  consultaBanco(`conexao/${consulta}`, 'GET')
    .then(function (resposta) {
      if (resposta != null) {
        darkstores.push(resposta[0]);
      }
    }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

  selectDasCidades.innerHTML = '';
  consultaBanco(`conexao/${consulta}`, 'GET').then(function (resposta) {
    if (resposta != null && resposta.length > 0) {
      resposta.forEach(darkstore => {
        selectDasCidades.innerHTML += `<option value="${darkstore.idDarkStore}">${darkstore.uf}</option>`;
      });
    }
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  });

  setTimeout(() => {
    for (let i = 0; i < darkstores.length; i++) {
      document.querySelector('#empresasContent').innerHTML += `
          <tr>
            <td>${darkstores[i].uf}</td>
            <td>${computadores.length}</td>
            <td>Normal</td>
          </tr>`;
    }
  }, 1000);

}

const buscarUsoMaquina = (idComputador = 6) => {
  query = `SELECT * FROM UsoSistema WHERE fkComputador = ${idComputador} ORDER BY idUsoSistema DESC LIMIT 1`
  consultaBanco(`conexao/${query}`, 'GET').then((resposta) => {
    usoSistema = resposta
  }).catch(err => console.log(err))

  setTimeout(() => {
    tempoDeUso = String(usoSistema[0].tempoAtividadeMinutos / 60 / 60).split(".")
    let hours = tempoDeUso[0]
    let minutos = String(parseFloat(tempoDeUso[1]) * 60).split("")
    document.getElementById("infosDash").innerHTML = `
    <h2>Tempo de uso da máquina: <span>${hours} Horas e ${minutos[0]}${minutos[1]} minutos</span></h2>
    <h2>
      Data e hora da última inicialização: <span>${usoSistema[0].dataInicializacao.split("T").join(" ").split(".000Z")[0]}</span>
    </h2>
    `
  }, 1000)
}
let computadores = [];

selectDasCidades.addEventListener('change', function () {
  let idDarkstore = selectDasCidades.value;
  const consultaComputador = `SELECT * FROM Computador WHERE fkDarkstore = ${idDarkstore}`
  let tabelaMaquinas = document.querySelector('#maquinasContent');

  consultaBanco(`conexao/${consultaComputador}`, 'GET').then(function (resposta) {
    console.log(resposta);
    if (resposta != null) {
      computadores = resposta;
    }
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  });

  setTimeout(() => {
    tabelaMaquinas.innerHTML = '';
    for (let i = 0; i < computadores.length; i++) {
      tabelaMaquinas.innerHTML += `
      <tr>
        <td>${computadores[i].nome}</td>
        <td>${computadores[i].macAddress}</td>
        <td>${computadores[i].fkUsuario}</td>
        <td>${computadores[i].ativo == 1 ? 'Ativo' : 'Inativo'}</td>
      </tr>`;

    }
  }, 1000);

  const consultaDarkStore = `SELECT * FROM DarkStore WHERE idDarkstore = ${idDarkstore}`
  // document.querySelector('.estado').innerHTML = '';
  consultaBanco(`conexao/${consultaDarkStore}`, 'GET').then(function (resposta) {
    // document.querySelector('.estado').innerHTML = resposta[0].uf;
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  });
});


function buscarMaquinas() {
  query = `SELECT pc.*, c.nome as 'nomeComponente', c.idComponente as 'idComponente', ca.nome as 'nomeCaracteristica', ca.valor 'valorCaracteristica' 
  FROM Componente c JOIN Computador pc ON c.fkComputador = pc.idComputador JOIN CaracteristicaComponente ca ON ca.fkComponente = c.idComponente WHERE pc.fkDarkStore = ${sessionStorage.FKDARKSTORE};
  `

  let idComputador = 0;
  let indiceComputador = -1;
  let idComponente = 0;

  consultaBanco(`conexao/${query}`, 'GET')
    .then(function (resposta) {
      if (resposta) {
        for (let i = 0; i < resposta.length; i++) {
          if (resposta[i].idComputador != idComputador) {
            computadores.push({
              hostname: resposta[i].nome,
              ativo: resposta[i].ativo,
              darkstore: resposta[i].fkDarkStore,
              usuario: resposta[i].fkUsuario,
              macAddress: resposta[i].macAddress,
              componentes: []
            });
            idComputador = resposta[i].idComputador;
            indiceComputador++;
          }
          if (resposta[i].idComponente != idComponente) {
            computadores[indiceComputador].componentes.push({
              nome: resposta[i].nomeComponente,
              caracteristicas: []
            });
            idComponente = resposta[i].idComponente;
          }
          computadores[indiceComputador].componentes[computadores[indiceComputador].componentes.length - 1].caracteristicas.push({
            nome: resposta[i].nomeCaracteristica,
            valor: resposta[i].valorCaracteristica
          });
        }
      }
    }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

  setTimeout(() => {
    buscarUsuarios();
    colocarDadosUsuario();
    buscarLog();
  }, 2000);
}

window.onload = buscarDarkstore();

function buscarUsuarios() {
  let funcionarios = [];
  const consulta = `SELECT * FROM Usuario WHERE fkDarkstore = ${sessionStorage.FKDARKSTORE} AND tipo = 'Funcionário'`
  consultaBanco(`conexao/${consulta}`, 'GET').then(function (resposta) {
    if (resposta != null) {
      funcionarios = resposta;
      console.log("Funcionários ", resposta);
    }
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  });

  let funcionariosContent = document.getElementById("funcionariosContent");
  funcionariosContent.innerHTML = '';
  setTimeout(() => {
    for (let i = 0; i < funcionarios.length; i++) {
      funcionariosContent.innerHTML += `
          <tr>
            <td>${funcionarios[i].nome}</td>
            <td>${funcionarios[i].cargo}</td>
            <td><span style="color: red; cursor: pointer; margin-top: 7%;" onclick="deletarFuncionario(this)" value="${funcionarios[i].idUsuario}" class="material-symbols-outlined">
              delete
            </span></td>
            <td><span style="color: green; cursor: pointer; margin-top: 7%" onclick="editarFuncionario(this)" value="${funcionarios[i].idUsuario}" class="material-symbols-outlined">
            edit
            </span></td>
          </tr>
    `;
    }
  }, 1000);
}

function buscarLog() {
  let logs = [];
  query = `SELECT Log.*, Usuario.nome as usuarioNome, Computador.nome as computadorNome FROM Log
  JOIN Computador ON Log.fkComputador = Computador.idComputador
  JOIN DarkStore ON Computador.fkDarkStore = DarkStore.idDarkStore
  LEFT JOIN Usuario ON Log.fkUsuario = Usuario.idUsuario
  WHERE DarkStore.idDarkStore = ${sessionStorage.FKDARKSTORE};`
  consultaBanco(`conexao/${query}`, 'GET').then(function (resposta) {
    console.log(resposta);
    logs = resposta;
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  });

  let conteudoLogs = document.querySelector('.body-log');
  conteudoLogs.innerHTML = '';
  setTimeout(() => {
    for (let i = 0; i < logs.length; i++) {
      data = logs[i].dataLog.split('T');
      data = data[0].split('-');
      data = `${data[2]}/${data[1]}/${data[0]}`;

      hora = logs[i].dataLog.split('T');
      hora = hora[1].split(':');
      hora = `${hora[0]}:${hora[1]}`;

      conteudoLogs.innerHTML += `
      <div class="card">
              <div class="picture">
                <img src="assets/user-icon.png" alt="" />
                <p>${logs[i].usuarioNome != null ? logs[i].computadorNome : logs[i].usuarioNome}</p>
              </div>

              <div class="descricao log">
                <div style="margin-bottom: 10px">
                  <p>Descrição: ${logs[i].descricao}</p>
                  <p></p>
                </div>

                <div>
                  <p>Data: ${data} Hora: ${hora}</p>
                </div>
              </div>
            </div>
    `;
    }
  }, 1000);

}

function enviarMensagemSlack(mensagem) {
  fetch(`/slack/mensagem`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: mensagem
    })
  }).then(function (resposta) {
    if (resposta.ok) {
      return resposta;
    }
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  });
}

function editarUsuario() {

  //venficando se no botão de editar está escrito "Editar"
  let podeEditar = false
  let inputs = document.querySelectorAll('.config-item input');

      let botao = document.querySelector('.edit-user');
      

      if (botao.innerText == 'Editar') {
        botao.innerText = 'Salvar';
        inputs.forEach(input => {
          input.removeAttribute('readonly');
        });
      } else {
        botao.innerText = 'Editar';
        inputs.forEach(input => {
          input.setAttribute('readonly', 'true');
        });
        podeEditar = true;
        console.log(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value);
      }
    
    if (podeEditar) {
    let nome = inputs[0].value;
    let sobrenome = inputs[1].value;
    let email = inputs[2].value;
    let cargo = inputs[3].value;
    const consulta = `UPDATE Usuario set nome = '${nome}', sobrenome = '${sobrenome}', email = '${email}', cargo = '${cargo}' WHERE idUsuario = ${sessionStorage.IDUSUARIO};`
    Swal.fire({
      title: "Tem certeza que deseja editar seu usuário?",
      width: 500,
      padding: "3em",
      color: "#00259C",
      showDenyButton: true,
      confirmButtonText: "Editar",
      confirmButtonColor: "#00259C",
      denyButtonText: `Cancelar`,
      focusConfirm: false
    }).then((result) => {
      if (result.isConfirmed) {  
    consultaBanco(`conexao/${consulta}`, 'PUT')
      .then(function (resposta) {
        console.log(resposta);
      }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
  }
  });}

  
}

function colocarDadosUsuario() {
  let inputs = document.querySelectorAll('.config-item input');
  let query = `SELECT nome, sobrenome, email, cargo FROM Usuario WHERE idUsuario=${sessionStorage.IDUSUARIO}`;
  
  consultaBanco(`/conexao/${query}`, "GET").then((resposta) => {
    inputs[0].value = resposta[0].nome;
    inputs[1].value = resposta[0].sobrenome;
    inputs[2].value = resposta[0].email;
    inputs[3].value = resposta[0].cargo;
    sessionStorage.NOME = reposta[0].nome;
    sessionStorage.SOBRENOME = reposta[0].sobrenome
    sessionStorage.EMAIL = resposta[0].email
    sessionStorage.CARGO = reposta[0].cargo
  })
}

const logout = () => {
  sessionStorage.clear();
  window.location.href = '/';
}

if (sessionStorage.IDUSUARIO == undefined) window.location.href = '/';

function adicionarMaquina() {
  let inputs = document.querySelectorAll('#popup_maquina input');
  let nome = inputs[0].value;
  let macAddress = inputs[1].value;
  let darkstore = selectDasCidades.value;
  let usuario = sessionStorage.IDUSUARIO;
  let codigoAcesso = '';
  const consultaCodigo = `SELECT codigoAcesso FROM Computador WHERE nome = '${nome}'`
  const consultaCriacao = `INSERT INTO Computador (nome, macAddress, fkDarkStore, fkUsuario) VALUES ('${nome}', '${macAddress}', ${darkstore}, ${usuario})`

  consultaBanco(`conexao/${consultaCriacao}`, 'POST')
    .then(() => {
      consultaBanco(`conexao/${consultaCodigo}`, 'GET').then(function (resposta) {
        Swal.fire({
          title: "Máquina adicionada com sucesso",
          text: `O código de acesso é: ${resposta[0].codigoAcesso} \n Foi enviado uma copia para o seu Slack`,
          icon: "success",
          confirmButtonColor: "#00259C"
        }).then(() => {
          enviarMensagemSlack(`Foi adicionado um novo computador com o nome de ${nome} e o código de acesso é ${codigoAcesso}`)
        });
    }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
    }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

  setTimeout(() => {
    codigoAcesso = buscarCodigoAcesso(nome);
  }, 1000);

  

  document.getElementById('popup_maquina').style.display = 'none';
}


const deletarFuncionario = (valor) => {
  const idUsuario = valor.getAttribute("value")
  query = `DELETE FROM Usuario WHERE idUsuario = ${idUsuario}`
  Swal.fire({
    title: `Tem certeza que deseja deletar seu funcionário?`,
    width: 500,
    padding: "3em",
    color: "#00259C",
    showDenyButton: true,
    confirmButtonText: "Deletar",
    confirmButtonColor: "#00259C",
    denyButtonText: `Cancelar`,
    focusConfirm: false
  }).then((result) => {
    if (result.isConfirmed) {
      consultaBanco(`/conexao/${query}`, 'DELETE').then(resposta => {
        console.log(resposta)
      })
      Swal.fire(
        {
          title: "Usuário deletado com sucesso",
          icon: "success",
          confirmButtonColor: "#00259C"
        }).then(() => {

        }
        )
    }
  }
  );


}

const salvarFuncionario = () => {
  let nomeUsuario = nome_usuario.value;
  let sobrenomeUsuario = sobrenome_usuario.value;
  let emailUsuario = email_usuario.value;
  let senhaUsuario = senha_usuario.value;
  let cargoUsuario = cargo_usuario.value;

  query = `INSERT INTO Usuario(nome,sobrenome,email,senha,cargo,fkDarkStore, tipo) VALUES ('${nomeUsuario}', '${sobrenomeUsuario}', '${emailUsuario}', '${senhaUsuario}', '${cargoUsuario}', ${sessionStorage.FKDARKSTORE}, 'Funcionário')`

  consultaBanco(`/conexao/${query}`, 'POST').then(() => {
    console.log("Usuário criado com sucesso")
  })

}