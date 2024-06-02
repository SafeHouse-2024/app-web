let dataInicioHistorico;
let dataFinalHistorico = new Date();
$('#datepicker-init').datepicker({ uiLibrary: 'bootstrap5' });
$('#datepicker-end').datepicker({uiLibrary: 'bootstrap5'})
$('#datepicker-init').change(e => {
  dataInicioHistorico = e.currentTarget.value
  filtrarLog(informacao.value, dataInicioHistorico, dataFinalHistorico)
})
$('#datepicker-end').change(e => {
  dataFinalHistorico = e.currentTarget.value
  filtrarLog(informacao.value, dataInicioHistorico, dataFinalHistorico)
})

$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
});


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
let darkstores = []
const selectDasCidades = document.querySelector('#cidades');
let computadores = [];

function buscarDarkstore() {
  consulta = `SELECT * FROM DarkStore WHERE fkEmpresa = ${sessionStorage.IDEMPRESA}`
  buscarMaquinas();
  buscarUsoMaquina();
  buscarGraficos();
  buscarLog();

  selectDasCidades.innerHTML = '';
  consultaBanco(`conexao/${consulta}`, 'GET').then(function (resposta) {
    if (resposta != null && resposta.length > 0) {
      darkstores = resposta
      resposta.forEach(darkstore => {
        selectDasCidades.innerHTML += `<option value="${darkstore.idDarkStore}">${darkstore.nome}</option>`;
      });
    }
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  });

  setTimeout(() => {
    for (let i = 0; i < darkstores.length; i++) {
      document.querySelector('#empresasContent').innerHTML += `
          <tr>
            <td>${darkstores[i].nome}</td>
            <td>${computadores.length}</td>
            <td>Normal</td>
            <td><span style="color: red; cursor: pointer; margin-top: 7%;" onclick="deletarDarkStore(this)" value="${darkstores[i].idDarkStore}#${darkstores[i].nome}" class="material-symbols-outlined">
            delete
          </span></td>
            <td><span style="color: green; cursor: pointer; margin-top: 7%;" onclick="editarDarkStore(this)" value="${darkstores[i].idDarkStore}" class="material-symbols-outlined" data-bs-toggle="modal" data-bs-target="#editarDarkStore">
            edit
          </span></td>
          </tr>`;
    }
    buscarDarkstorePorNome();
  }, 1000);


}

const buscarUsoMaquina = (idComputador = 7) => {
  query = `SELECT * FROM UsoSistema WHERE fkComputador = ${idComputador} ORDER BY idUsoSistema DESC LIMIT 1`
  consultaBanco(`conexao/${query}`, 'GET').then((resposta) => {
    usoSistema = resposta
  }).catch(err => console.log(err))

  setTimeout(() => {
    tempoDeUso = String(usoSistema[0].tempoAtividadeMinutos / 60 / 60).split(".")
    let hours = tempoDeUso[0]
    let minutos = String(parseFloat(tempoDeUso[1]) * 60).split("")
    document.getElementById("infosDash").innerHTML = `
    <h4><b>Tempo de uso da máquina:</b> <br><span>${hours} Horas e ${minutos[0]}${minutos[1]} minutos</span></h4>
    <h4>
      <b>Data e hora da última inicialização:</b> <br><span>${usoSistema[0].dataInicializacao.split("T").join(" ").split(".000Z")[0]}</span>
    </h4>
    `

    let infoHardware = document.querySelector(`#infoHardware`);
    infoHardware.innerHTML = '';
    for (let i = 0; i < computadores.length; i++) {
      for (let j = 0; j < computadores[i].componentes.length; j++) {
        if (computadores[i].idComputador == idComputador) {
          infoHardware.innerHTML += `
          <div class="hardware-description">
          <h3>${computadores[i].componentes[j].nome}</h3>
          <ul>
          ${computadores[i].componentes[j].caracteristicas.map(caracteristica => {
            return `
            <li>
            <span><b>${caracteristica.nome}:</b></span>
            <span>${caracteristica.valor}</span>
            </li>
            `;
          }).join('')}
          </ul>
          </div>
          `;
        }
      }
    }
  }, 1000)
}

function buscarDarkstorePorNome() {
  let idDarkstore = selectDasCidades.value;
  let nomeDarkstore = document.querySelector('#nome_darkstore');
  nomeDarkstore.value = selectDasCidades.options[selectDasCidades.selectedIndex].text;
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

  buscarViolacoes(idDarkstore);
  buscarTaxaDeUso(idDarkstore);
}

selectDasCidades.addEventListener('change', function () {
  buscarDarkstorePorNome();

  // const consultaDarkStore = `SELECT * FROM DarkStore WHERE idDarkstore = ${idDarkstore}`
  // // document.querySelector('.estado').innerHTML = '';
  // consultaBanco(`conexao/${consultaDarkStore}`, 'GET').then(function (resposta) {
  //   // document.querySelector('.estado').innerHTML = resposta[0].uf;
  // }).catch(function (resposta) {
  //   console.log(`#ERRO: ${resposta}`);
  // });
});

function liberarInputNomeDarkstore() {
  let nomeDarkstore = document.querySelector('#nome_darkstore');

  if (nomeDarkstore.hasAttribute('readonly')) {
    nomeDarkstore.removeAttribute('readonly');
  } else {
    nomeDarkstore.setAttribute('readonly', 'true');
  }
  let botao = document.querySelector('#lapis_nome_darkstore');

  if (botao.classList.contains('fa-pencil')) {
    botao.classList.remove('fa-pencil');
    botao.classList.add('fa-check');
  } else {
    botao.classList.remove('fa-check');
    botao.classList.add('fa-pencil');
    editarNomeDarkstore();
  }
}

function editarNomeDarkstore() {
  let nomeDarkstore = document.querySelector('#nome_darkstore');
  let idDarkstore = selectDasCidades.value;
  const consulta = `UPDATE DarkStore SET nome = '${nomeDarkstore.value}' WHERE idDarkstore = ${idDarkstore}`
  consultaBanco(`conexao/${consulta}`, 'PUT').then(function (resposta) {
    console.log(resposta);
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  });
}

function buscarMaquinas() {
  query = `SELECT pc.*, c.nome as 'nomeComponente', c.idComponente as 'idComponente', ca.nome as 'nomeCaracteristica', ca.valor 'valorCaracteristica' 
  FROM Componente c JOIN Computador pc ON c.fkComputador = pc.idComputador JOIN CaracteristicaComponente ca ON ca.fkComponente = c.idComponente WHERE pc.fkDarkStore = ${sessionStorage.FKDARKSTORE};
  `
  buscarUsuarios();
  colocarDadosUsuario();
  let idComputador = 0;
  let indiceComputador = -1;
  let idComponente = 0;

  consultaBanco(`conexao/${query}`, 'GET')
    .then(function (resposta) {
      if (resposta) {
        for (let i = 0; i < resposta.length; i++) {
          if (resposta[i].idComputador != idComputador) {
            computadores.push({
              idComputador: resposta[i].idComputador,
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
  document.getElementById("maquinas").innerHTML = ""
  setTimeout(() => {
    for (let i = 0; i < computadores.length; i++) {
      document.getElementById("maquinas").innerHTML += `
        <div class="maquina-info">
          <div>${computadores[i].nome}</div>
          <div>${computadores[i].macAddress}<div>
        </div>
        `
    }

    computadores.forEach(computador => buscarAlertas(computador.idComputador))
  }, 3000)
}

let funcionarios = [];
function buscarUsuarios() {
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
            <td><span style="color: red; cursor: pointer; margin-top: 7%;" onclick="deletarFuncionario(this)" value="${funcionarios[i].idUsuario}#${funcionarios[i].nome}" class="material-symbols-outlined">
              delete
            </span></td>
            <td><span style="color: green; cursor: pointer; margin-top: 7%" value="${funcionarios[i].idUsuario}" onclick="editarFuncionario(this)" class="material-symbols-outlined" data-bs-toggle="modal" data-bs-target="#editarFuncionario">
            edit
            </span></td>
          </tr>
    `;
    }
  }, 1000);
}

let logs = [];
function buscarLog() {
  query = `SELECT l.*, c.nome as 'nome' FROM Log l JOIN Computador c ON l.fkComputador = c.idComputador JOIN DarkStore d ON d.idDarkStore = c.fkDarkStore WHERE d.idDarkStore = ${sessionStorage.FKDARKSTORE}
  UNION SELECT l.*, u.nome as 'nome' FROM Log l JOIN Usuario u ON l.fkUsuario = u.idUsuario JOIN DarkStore
  d ON u.fkDarkStore = d.idDarkStore WHERE d.idDarkStore = ${sessionStorage.FKDARKSTORE} ORDER BY idLog DESC;`
  consultaBanco(`conexao/${query}`, 'GET').then(function (resposta) {
    resposta.forEach(res => {
      console.log(res)
      let tipo;
      if(res.descricao.includes("pendrive") || res.descricao.includes("processo")){
        tipo = "segurança"
      }else if(res.fkUsuario != null){
        tipo = "usuario"
      }
      logs.push({
        log: res,
        tipo: tipo
      })
    })
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  });
  console.log(logs)
  let conteudoLogs = document.querySelector('#body-log');
  conteudoLogs.innerHTML = '';
  setTimeout(() => {
    for (let i = 0; i < logs.length; i++) {
      data = logs[i].log.dataLog.split('T');
      data = data[0].split('-');
      data = `${data[2]}/${data[1]}/${data[0]}`;

      hora = logs[i].log.dataLog.split('T');
      hora = hora[1].split(':');
      hora = `${hora[0]}:${hora[1]}`;

      conteudoLogs.innerHTML += `
      <tr>
        <td>${logs[i].log.fkUsuario == null ? "Máquina" : "Usuário"}</td>
        <td>${logs[i].log.nome}</td>
        <td>${logs[i].log.descricao}</td>
        <td>Data: ${data} Hora: ${hora}</td>
      </tr>
    `;
    }
  }, 2000);

}

const filtrarLog = (tipo, dataInicio = dataInicioHistorico, dataFinal = dataFinalHistorico) =>{
  console.log(tipo)
  let conteudoLogs = document.querySelector('#body-log');
  conteudoLogs.innerHTML = '';
  dataInicio != undefined ? dataInicio = dataInicio : dataInicio = new Date(logs[logs.length - 1].log.dataLog);
  console.log(dataInicio)
    if(tipo == ""){
      filtrarLogData(logs, dataInicio, dataFinal).forEach((infos) => {
      data = infos.log.dataLog.split('T');
      data = data[0].split('-');
      data = `${data[2]}/${data[1]}/${data[0]}`;
  
      hora = infos.log.dataLog.split('T');
      hora = hora[1].split(':');
      hora = `${hora[0]}:${hora[1]}`;
  
      conteudoLogs.innerHTML += `
        <tr>
          <td>${infos.log.fkUsuario == null ? "Máquina" : "Usuário"}</td>
          <td>${infos.log.nome}</td>
          <td>${infos.log.descricao}</td>
          <td>Data: ${data} Hora: ${hora}</td>
        </tr>
      `;
    })
  }

  filtrarLogData(logs, dataInicio, dataFinal).filter(log => log.tipo == tipo).forEach((infos) => {
    console.log(infos)
    data = infos.log.dataLog.split('T');
    data = data[0].split('-');
    data = `${data[2]}/${data[1]}/${data[0]}`;

    hora = infos.log.dataLog.split('T');
    hora = hora[1].split(':');
    hora = `${hora[0]}:${hora[1]}`;

    conteudoLogs.innerHTML += `
      <tr>
        <td>${infos.log.fkUsuario == null ? "Máquina" : "Usuário"}</td>
        <td>${infos.log.nome}</td>
        <td>${infos.log.descricao}</td>
        <td>Data: ${data} Hora: ${hora}</td>
      </tr>
    `;
  }) 
}

filtrarLogData = (logs, inicio, fim) => {
  console.log(logs)
  return logs.filter(log => new Date(log.log.dataLog) >= new Date(inicio) && new Date(log.log.dataLog) <= new Date(fim))
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
    })
  }
}



function colocarDadosUsuario() {
  let inputs = document.querySelectorAll('.config-item input');
  let query = `SELECT nome, sobrenome, email, cargo FROM Usuario WHERE idUsuario=${sessionStorage.IDUSUARIO}`;

  consultaBanco(`/conexao/${query}`, "GET").then((resposta) => {
    inputs[0].value = resposta[0].nome;
    inputs[1].value = resposta[0].sobrenome;
    inputs[2].value = resposta[0].email;
    inputs[3].value = resposta[0].cargo;
    sessionStorage.NOME = resposta[0].nome;
    sessionStorage.SOBRENOME = resposta[0].sobrenome
    sessionStorage.EMAIL = resposta[0].email
    sessionStorage.CARGO = resposta[0].cargo
  })

  document.querySelector('#userName').innerHTML = `${sessionStorage.NOME} ${sessionStorage.SOBRENOME}`;
  document.querySelector('#userEmail').innerHTML = `${sessionStorage.EMAIL}`;
}

colocarDadosUsuario();

const logout = () => {
  sessionStorage.clear();
  window.location.href = '/';
}

if (sessionStorage.IDUSUARIO == undefined) window.location.href = '/';

function adicionarMaquina() {
  
  let nome = computador_nome.value;
  let macAddress = computador_macAddress.value;
  let darkstore = selectDasCidades.value;
  let usuario = sessionStorage.IDUSUARIO;
  let codigoAcesso = '';
  const consultaCodigo = `SELECT codigoAcesso FROM Computador WHERE nome = '${nome}'`
  const consultaCriacao = `INSERT INTO Computador (nome, macAddress, fkDarkStore, fkUsuario) VALUES ('${nome}', '${macAddress}', ${darkstore}, ${usuario})`
  const queryLog = `INSERT INTO Log(descricao, fkUsuario) VALUES ('Máquina ${nome} foi criada por ${sessionStorage.NOME} de cargo ${sessionStorage.CARGO}', ${sessionStorage.IDUSUARIO})`
  
  consultaBanco(`conexao/${consultaCriacao}`, 'POST')
    .then(() => {
      consultaBanco(`conexao/${consultaCodigo}`, 'GET').then(function (resposta) {
        Swal.fire({
          title: "Máquina adicionada com sucesso",
          text: `O código de acesso é: ${resposta[0].codigoAcesso} \n Foi enviado uma copia para o seu Slack`,
          icon: "success",
          confirmButtonColor: "#00259C"
        }).then(() => {
          consultaBanco(`/conexao/${queryLog}`, 'POST').then(() => {
            console.log("Adicionando Log");
          })
          enviarMensagemSlack(`Foi adicionado um novo computador com o nome de ${nome} e o código de acesso é ${codigoAcesso}`)
          let machine = document.getElementById("adicionarMaquina")
          let button = document.createElement("button")
          button.setAttribute("data-bs-dismiss", "modal")
          machine.appendChild(button)
          button.click()
          machine.removeChild(button)
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
}


const deletarFuncionario = (valor) => {
  const parametros = valor.getAttribute("value").split("#")
  const idUsuario = parametros[0];
  const nomeUsuario = parametros[1]
  const query = `DELETE FROM Usuario WHERE idUsuario = ${idUsuario}`
  const  queryLog = `INSERT INTO Log(descricao, fkUsuario) VALUES ('Funcionário ${nomeUsuario} foi deletado por ${sessionStorage.NOME} de cargo ${sessionStorage.CARGO}', ${sessionStorage.IDUSUARIO})`
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
        if(resposta.affectedRows == 1){
          consultaBanco(`/conexao/${queryLog}`, 'POST').then(() => {
            console.log("Log adicionado com sucesso!")
          })
        }
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
  queryLog = `INSERT INTO Log(descricao, fkUsuario) VALUES ('Funcionário ${nomeUsuario} foi criado por ${sessionStorage.NOME} de cargo ${sessionStorage.CARGO}', ${sessionStorage.IDUSUARIO})`
  consultaBanco(`/conexao/${query}`, 'POST').then((resposta) => {
    if(resposta.affectedRows == 1){
      Swal.fire({
        title: "Funcionário criado com sucesso",
        icon: "success",
        confirmButtonColor: "#00259C"
      }).then(() => {
        let dk = document.getElementById("salvarFuncionario")
        let button = document.createElement('button')
        button.setAttribute('data-bs-dismiss', 'modal')
        dk.appendChild(button)
        button.click()
        dk.removeChild(button)
      })
      consultaBanco(`/conexao/${queryLog}`, 'POST').then(() => {
        console.log("Log adicionado com sucesso!")
      })
    }
  })

}

function buscarViolacoes(idDarkStore) {
  let violacoes = [];
  queryViolacoes = `SELECT Log.*, Computador.nome as computadorNome FROM Log
  JOIN Computador ON Log.fkComputador = Computador.idComputador
  JOIN DarkStore ON Computador.fkDarkStore = DarkStore.idDarkStore`
  consultaBanco(`conexao/${queryViolacoes}`, 'GET').then(function (resposta) {
    console.log(resposta);
    violacoes = resposta;
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  });

  var computadoresDessaDarkstore = [];
  setTimeout(() => {
    for (let i = 0; i < computadores.length; i++) {
      if (computadores[i].fkDarkStore == idDarkStore) {
        computadoresDessaDarkstore.push(computadores[i]);
      }
    }
  }, 1000);

  let conteudoViolacoes = document.querySelector('#violacoesContent');
  conteudoViolacoes.innerHTML = '';
  setTimeout(() => {
    console.log(violacoes)
    for (let i = 0; i < violacoes.length; i++) {
      if (computadoresDessaDarkstore.find(computador => computador.nome == violacoes[i].computadorNome)) {
        conteudoViolacoes.innerHTML += `
      <tr>
        <td>${violacoes[i].computadorNome}</td>
        <td>${violacoes[i].descricao}</td>
      </tr>
    `;
      }
    }
  }, 1000);
}

const salvarDarkStore = () => {
  let nomeDarkStore = nome_salvar_darkstore.value
  let ruaDarkStore = rua_salvar_darkstore.value
  let complemento = complemento_salvar_darkstore.value
  let numero = numero_salvar_darkstore.value
  let cep = cep_salvar_darkstore.value
  let uf = uf_salvar_darkstore.value
  const query = `INSERT INTO DarkStore (nome, rua, numero, complemento, cep, uf, fkEmpresa) VALUES ('${nomeDarkStore}', '${ruaDarkStore}', ${numero}, '${complemento}', '${cep}', '${uf}', ${sessionStorage.IDEMPRESA});`
  queryLog = `INSERT INTO Log(descricao, fkUsuario) VALUES ('DarkStore ${nomeDarkStore} foi criada por ${sessionStorage.NOME} de cargo ${sessionStorage.CARGO}', ${sessionStorage.IDUSUARIO})`

  consultaBanco(`/conexao/${query}`, 'POST').then(resposta => {
    if(resposta.affectedRows == 1){
      Swal.fire({
        title: "Dark Store criada com sucesso",
        icon: "success",
        confirmButtonColor: "#00259C"
      }).then(() => {
        let dk = document.getElementById("salvarDarkStore")
        let button = document.createElement('button')
        button.setAttribute('data-bs-dismiss', 'modal')
        dk.appendChild(button)
        button.click()
        dk.removeChild(button)
      })
      consultaBanco(`/conexao/${queryLog}`, 'POST').then(() => {
        console.log("Log adicionado com sucesso!")
      })
    }
  })
}

const editarDarkStore = (valor) => {
  let darkstoreById = darkstores.filter(darkstore => darkstore.idDarkStore == valor.getAttribute("value"))
  nome_edit_darkstore.value = darkstoreById[0].nome
  rua_darkstore.value = darkstoreById[0].rua
  uf_darkstore.value = darkstoreById[0].uf
  numero_darkstore.value = darkstoreById[0].numero
  complemento_darkstore.value = darkstoreById[0].complemento
  cep_darkstore.value = darkstoreById[0].cep
  document.querySelector(".editar_darkstore_button").setAttribute("value", `${valor.getAttribute("value")}`)
}

const salvarAlteracoesDarkStore = () => {

  let nomeDarkStore = nome_edit_darkstore.value
  let ruaDarkStore = rua_darkstore.value
  let ufDarkStore = uf_darkstore.value
  let numeroDarkStore = numero_darkstore.value
  let complementoDarkStore = complemento_darkstore.value
  let cepDarkStore = cep_darkstore.value
  let idDarkStore = document.querySelector(".editar_darkstore_button").getAttribute("value")

const query = `UPDATE DarkStore set nome='${nomeDarkStore}', rua='${ruaDarkStore}', uf='${ufDarkStore}', numero='${numeroDarkStore}', complemento='${complementoDarkStore}',cep='${cepDarkStore}' WHERE idDarkStore = ${idDarkStore}`;
const queryLog = `INSERT INTO Log(descricao, fkUsuario) VALUES ('DarkStore ${nomeDarkStore} foi alterada por ${sessionStorage.NOME} de cargo ${sessionStorage.CARGO}', ${sessionStorage.IDUSUARIO})`
consultaBanco(`/conexao/${query}`, 'PUT').then(resposta => {
  if(resposta.affectedRows == 1){
    Swal.fire({
      title: "Dark Store editada com sucesso",
      icon: "success",
      confirmButtonColor: "#00259C"
    }).then(() => {
      let dk = document.getElementById("editarDarkStore")
      let button = document.createElement('button')
      button.setAttribute('data-bs-dismiss', 'modal')
      dk.appendChild(button)
      button.click()
      dk.removeChild(button)
    })
    consultaBanco(`/conexao/${queryLog}`, 'POST').then(() => {
      console.log("Log adicionado com sucesso");
    })
  }
})

}

  const editarFuncionario = (valor) => {
    let funcionarioById = funcionarios.filter(funcionario => funcionario.idUsuario == valor.getAttribute("value"))
    nome_funcionario.value = funcionarioById[0].nome
    sobrenome_funcionario.value = funcionarioById[0].sobrenome
    email_funcionario.value = funcionarioById[0].email
    senha_funcionario.value = funcionarioById[0].senha
    cargo_funcionario.value = funcionarioById[0].cargo
    document.querySelector(".editar_funcionario_button").setAttribute("value", `${valor.getAttribute("value")}`)
  }

  const salvarAlteracoesUsuario = () => {

  let nomeFuncionario = nome_funcionario.value
  let sobrenomeFuncionario = sobrenome_funcionario.value
  let emailFuncionario = email_funcionario.value
  let senhaFuncionario = senha_funcionario.value
  let cargoFuncionario = cargo_funcionario.value
  let idFuncionario = document.querySelector(".editar_funcionario_button").getAttribute("value")

  const query = `UPDATE Usuario set nome='${nomeFuncionario}', sobrenome='${sobrenomeFuncionario}', email='${emailFuncionario}', senha='${senhaFuncionario}', cargo='${cargoFuncionario}' WHERE idUsuario = ${idFuncionario}`;
  const queryLog = `INSERT INTO Log(descricao, fkUsuario) VALUES ('Funcionário ${nomeFuncionario} foi alterado por ${sessionStorage.NOME} de cargo ${sessionStorage.CARGO}', ${sessionStorage.IDUSUARIO})`
  consultaBanco(`/conexao/${query}`, 'PUT').then(resposta => {
    if(resposta.affectedRows == 1){
      Swal.fire({
        title: "Funcionário editado com sucesso",
        icon: "success",
        confirmButtonColor: "#00259C"
      }).then(() => {
        let dk = document.getElementById("editarFuncionario")
        let button = document.createElement('button')
        button.setAttribute('data-bs-dismiss', 'modal')
        dk.appendChild(button)
        button.click()
        dk.removeChild(button)
      })    
      consultaBanco(`/conexao/${queryLog}`, 'POST').then(() => {
        console.log("Log adicionado com sucesso");
      })
    }
  })

}

window.onload = buscarDarkstore();

function buscarTaxaDeUso(idDarkstore) {
  query = `SELECT Computador.nome as computadorNome, Componente.nome as componenteNome, RegistroComponente.valor as uso FROM Computador
  JOIN Componente ON Computador.idComputador = Componente.fkComputador
  LEFT JOIN RegistroComponente ON Componente.idComponente = RegistroComponente.fkComponente
  WHERE Computador.fkDarkStore = ${idDarkstore}`;

  resposta = [];

  consultaBanco(`conexao/${query}`, 'GET').then(function (res) {
    console.log(resposta);
    resposta = res;
  }
  ).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  });

  let conteudoUsoCpu = document.querySelector('#maquinas_limite_cpu');
  let conteudoUsoRam = document.querySelector('#maquinas_limite_ram');
  let conteudoUsoDisco = document.querySelector('#maquinas_limite_disco');

  let maquinasProximoLimiteCpu = 0;
  let maquinasProximoLimiteRam = 0;
  let maquinasProximoLimiteDisco = 0;

  conteudoUsoCpu.innerHTML = '';
  conteudoUsoRam.innerHTML = '';
  conteudoUsoDisco.innerHTML = '';

  for (let i = 0; i < resposta.length; i++) {
    if (resposta[i].componenteNome == 'Processador') {
      if (resposta[i].uso >= 1) maquinasProximoLimiteCpu++;
    }
    if (resposta[i].componenteNome == 'Memória') {
      if (resposta[i].uso >= 1) maquinasProximoLimiteRam++;
    }
    if (resposta[i].componenteNome == 'Disco') {
      if (resposta[i].uso >= 90) maquinasProximoLimiteDisco++;
    }
  }

  conteudoUsoCpu.innerHTML = `${maquinasProximoLimiteCpu}`;
  conteudoUsoRam.innerHTML = `${maquinasProximoLimiteRam}`;
  conteudoUsoDisco.innerHTML = `${maquinasProximoLimiteDisco}`;

  console.log("Maquinas no limite: ", maquinasProximoLimiteCpu, maquinasProximoLimiteRam, maquinasProximoLimiteDisco);

}

const deletarDarkStore = (valor) => {
  const parametros = valor.getAttribute("value").split("#")
  const idDarkStore = parametros[0]
  const nomeDarkStore = parametros[1]

  const query = `DELETE FROM DarkStore WHERE idDarkStore = ${idDarkStore}`
  const  queryLog = `INSERT INTO Log(descricao, fkUsuario) VALUES ('DarkStore ${nomeDarkStore} foi deletada por ${sessionStorage.NOME} de cargo ${sessionStorage.CARGO}', ${sessionStorage.IDUSUARIO})`
  Swal.fire({
    title: `Tem certeza que deseja deletar a darkstore ${nomeDarkStore}?`,
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
        if(resposta.affectedRows == 1){
          consultaBanco(`/conexao/${queryLog}`, 'POST').then(() => {
            console.log("Log adicionado com sucesso!")
          })
        }
      })
      Swal.fire(
        {
          title: "Darkstore deletada com sucesso",
          icon: "success",
          confirmButtonColor: "#00259C"
        }).then(() => {

        }
        )
    }
  }
  );
}

// alertas
const buscarAlertas = (idComputador) => {

  const queryAlertasCPU = `SELECT DISTINCT(pc.idComputador), count(rc.valor) as 'totalRegistros' FROM RegistroComponente rc JOIN Componente c ON c.idComponente = rc.fkComponente JOIN Computador pc ON c.fkComputador = pc.IdComputador JOIN DarkStore d ON d.idDarkStore = pc.fkDarkStore WHERE dataRegistro >= NOW() - INTERVAL 5000000 MINUTE AND c.nome LIKE 'Processador' AND rc.valor > 80 AND pc.idComputador = ${idComputador} GROUP BY pc.idComputador;`
  const queryAlertasRAM = `SELECT DISTINCT(pc.idComputador), count(rc.valor) as 'totalRegistros' FROM RegistroComponente rc JOIN Componente c ON c.idComponente = rc.fkComponente JOIN Computador pc ON c.fkComputador = pc.IdComputador JOIN DarkStore d ON d.idDarkStore = pc.fkDarkStore WHERE dataRegistro >= NOW() - INTERVAL 5 MINUTE AND c.nome LIKE 'Memória' AND rc.valor > SUBSTRING_INDEX((SELECT ca.valor FROM CaracteristicaComponente ca JOIN Componente c ON c.idComponente = ca.fkComponente JOIN Computador pc ON pc.idComputador = c.fkComputador WHERE pc.idComputador = ${idComputador} AND c.nome LIKE 'Memória' AND ca.nome LIKE 'Memória Total'), " ", 1) * 0.8 GROUP BY pc.idComputador;`;
  const queryAlertasDisco = `SELECT DISTINCT(pc.idComputador) as 'totalRegistros' FROM Componente c JOIN Computador pc ON c.fkComputador = pc.IdComputador JOIN CaracteristicaComponente ca ON ca.fkComponente = c.idComponente WHERE c.nome LIKE 'Disco' AND (SUBSTRING_INDEX((SELECT ca.valor FROM CaracteristicaComponente ca JOIN Componente c ON c.idComponente = ca.fkComponente JOIN Computador pc ON pc.idComputador = c.fkComputador WHERE pc.idComputador = ${idComputador} AND c.nome LIKE 'Disco' AND ca.nome LIKE 'Memória Disponível'), " ", 1)) < (SUBSTRING_INDEX((SELECT ca.valor FROM CaracteristicaComponente ca JOIN Componente c ON c.idComponente = ca.fkComponente JOIN Computador pc ON pc.idComputador = c.fkComputador WHERE pc.idComputador = ${idComputador} AND c.nome LIKE 'Disco' AND ca.nome LIKE 'Memória Total'), " ", 1) * 0.2)`


  darkstores.forEach(darkstore => {

    consultaBanco(`/conexao/${queryAlertasCPU}`, 'GET').then(resposta => {
        resposta.forEach(res => {
          if(res.totalRegistros > 25){
            darkstore.statusCPU = `Crítico`
            computadores.filter(computador => computador.fkDarkStore == darkstore.idDarkStore).forEach(pc => pc.statusCPU = `Crítico`)
          }else if(res.totalRegistros > 15){
            darkstore.statusCPU = `Alerta`
            computadores.filter(computador => computador.fkDarkStore == darkstore.idDarkStore).forEach(pc => pc.statusCPU = `Alerta`)
          }else{
            darkstore.statusCPU = `Normal`
            computadores.filter(computador => computador.fkDarkStore == darkstore.idDarkStore).forEach(pc => pc.statusCPU = `Normal`)
          }
        })
    })

    consultaBanco(`/conexao/${queryAlertasRAM}`, 'GET').then(resposta => {
      resposta.forEach(res => {
        if(res.totalRegistros > 25){
          darkstore.statusRAM = `Crítico`
          computadores.filter(computador => computador.fkDarkStore == darkstore.idDarkStore).forEach(pc => pc.statusRAM = `Crítico`)
        }else if(res.totalRegistros > 15){
          darkstore.statusRAM = `Alerta`
          computadores.filter(computador => computador.fkDarkStore == darkstore.idDarkStore).forEach(pc => pc.statusRAM = `Alerta`)
        }else{
          darkstore.statusRAM = `Normal`
          computadores.filter(computador => computador.fkDarkStore == darkstore.idDarkStore).forEach(pc => pc.statusRAM = `Normal`)
        }
      })
    })

    consultaBanco(`/conexao/${queryAlertasDisco}`, 'GET').then(resposta => {
      resposta.forEach(res => {
        if(res.totalRegistros > 25){
          darkstore.statusDisco = `Crítico`
          computadores.filter(computador => computador.fkDarkStore == darkstore.idDarkStore).forEach(pc => pc.statusDisco = `Crítico`)
        }else if(res.totalRegistros > 15){
          darkstore.statusDisco = `Alerta`
          computadores.filter(computador => computador.fkDarkStore == darkstore.idDarkStore).forEach(pc => pc.statusDisco = `Alerta`)
        }else{
          darkstore.statusDisco = `Normal`
          computadores.filter(computador => computador.fkDarkStore == darkstore.idDarkStore).forEach(pc => pc.statusDisco = `Normal`)
        }
      })
    })

  })

  setTimeout(() => {
    buscarAlertas(idComputador)
  }, 60000)

}