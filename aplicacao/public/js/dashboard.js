// const { connect } = require("mssql");

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


const darkstores = []
const selectDasCidades = document.querySelector('#cidades');

function buscarDarkstore() {
  consulta = `SELECT * FROM DarkStore WHERE fkEmpresa = ${sessionStorage.IDEMPRESA}`
  buscarMaquinas();
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

selectDasCidades.addEventListener('change', function () {
  let idDarkstore = selectDasCidades.value;
  consultaBanco(`conexao/SELECT * FROM Computador WHERE fkDarkstore = ${idDarkstore}`, 'GET').then(function (resposta) {
    console.log(resposta);
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  });

  document.querySelector('.estado').innerHTML = '';
  consultaBanco(`conexao/SELECT * FROM DarkStore WHERE idDarkstore = ${idDarkstore}`, 'GET').then(function (resposta) {
    document.querySelector('.estado').innerHTML = resposta[0].uf;
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  });
});

const computadores = [];

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

  document.querySelector('#maquinas_darkstore').innerHTML = '';
  setTimeout(() => {
    for (let i = 0; i < computadores.length; i++) {
      document.querySelector('#maquinas_darkstore').innerHTML += `
    <li class="item-maquina">
    <div class="header-maquina">
    <div>${computadores[i].hostname}</div>
    
      <div class="kpi-progress">
      <p>
          CPU:<progress
            value="50"
            max="100"
            min="0"
            class="barra-progresso"
          ></progress>
        </p>
        <p>
          RAM:<progress
            value="50"
            max="100"
            min="0"
            class="barra-progresso"
          ></progress>
        </p>
        <p>
          Disco:<progress
            value="50"
            max="100"
            min="0"
            class="barra-progresso"
          ></progress>
        </p>
      </div>

      <button>Desativar Modo de Segurança</button>
    </div>

    <div class="grafico-maquina">
      <article>
        <div class="chart-linha">
          <a>Porcentagem de uso de CPU em tempo real</a>
          <canvas id="graficoMaquina1Linha1"></canvas>
        </div>

        <div class="chart-linha">
          <a>Porcentagem de uso de Memória RAM em tempo real</a>
          <canvas id="graficoMaquina1Linha2"></canvas>
        </div>
      </article>
      <article>
        <div class="infosDash">
          <h2>Tempo de uso da máquina: <span>15h</span></h2>
          <h2>
            Data da última inicialização: <span>22/12/2023</span>
          </h2>
        </div>
        
        <div class="chart-donut">
          <canvas id="graficoMaquina1Donut1"></canvas>
          </div>
      </article>
      <article class="infosHardware">
        <h1>Informações do Hardware</h1>
        <div id="info_hardware_${i}">
        </div>
      </article>
    </div>
  </li>
  `;
    }

    for (let i = 0; i < computadores.length; i++) {

      let infoHardware = document.querySelector(`#info_hardware_${i}`);
      infoHardware.innerHTML = '';
      for (let j = 0; j < computadores[i].componentes.length; j++) {
        infoHardware.innerHTML += `
      <div class="infoHardware">
      <h2>${computadores[i].componentes[j].nome}</h2>
      <ul>
      ${computadores[i].componentes[j].caracteristicas.map(caracteristica => {
          return `
        <li>
        <span>${caracteristica.nome}</span>
        <span>${caracteristica.valor}</span>
        </li>
        `;
        }).join('')}
      </ul>
      </div>
      `;
      }
    }
    console.log('Dashboard criado');

    let maquinas = document.querySelectorAll('#maquinas_darkstore > li')

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
  }, 1000);

  setTimeout(() => {
    buscarUsuarios();
    colocarDadosUsuario();
    buscarLog();
  }, 2000);
}

window.onload = buscarDarkstore();

function buscarUsuarios() {
  let funcionarios = [];
  consultaBanco(`conexao/SELECT * FROM Usuario WHERE fkDarkstore = ${sessionStorage.FKDARKSTORE} AND tipo = 'Funcionário'`, 'GET').then(function (resposta) {
    if (resposta != null) {
      funcionarios = resposta;
      console.log(funcionarios);
    }
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  });

  let conteudoUsers = document.querySelector('.content-users');
  conteudoUsers.innerHTML = '';
  setTimeout(() => {
    for (let i = 0; i < funcionarios.length; i++) {
      conteudoUsers.innerHTML += `
      <div class="card">
      <div class="picture_user">
        <img src="assets/user-icon.png" style="width: 60px" alt="" />
      </div>

      <div class="descricao">
        <div>Nome do Usuário: ${funcionarios[i].nome}</div>
        <div>Cargo: ${funcionarios[i].cargo}</div>
      </div>

      <div class="buttons">
        <span>Editar</span>
        <span>Excluir</span>
      </div>
    </div>
    `;
    }
  }, 1000);
}

function buscarLog() {
  let logs = [];
  query = `SELECT Log.*, usuario.nome as usuarioNome, computador.nome as computadorNome FROM Log
  JOIN Computador ON Log.fkComputador = Computador.idComputador
  JOIN DarkStore ON Computador.fkDarkStore = DarkStore.idDarkStore
  LEFT JOIN Usuario ON Log.fkUsuario = Usuario.idUsuario
  WHERE DarkStore.idDarkStore = ${sessionStorage.FKDARKSTORE}`
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

function enviarMensagemSlack(mensagem){
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

function editarUsuario(){

  //venficando se no botão de editar está escrito "Editar"
  let botao = document.querySelector('.edit-user');
  let inputs = document.querySelectorAll('.config-item input');
  let podeEditar = false;

  if(botao.innerText == 'Editar'){
    botao.innerText = 'Salvar';
    inputs.forEach(input => {
      input.removeAttribute('readonly');
    });
  }else{
    botao.innerText = 'Editar';
    inputs.forEach(input => {
      input.setAttribute('readonly', 'true');
    });
    podeEditar = true;
    console.log(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value);
  }

  if(podeEditar){
    let nome = inputs[0].value;
    let sobrenome = inputs[1].value;
    let email = inputs[2].value;
    let cargo = inputs[3].value;

   consultaBanco(`conexao/UPDATE Usuario SET nome = '${nome}', sobrenome = '${sobrenome}', email = '${email}', cargo = '${cargo}' WHERE idUsuario = ${sessionStorage.IDUSUARIO}`, 'PUT')
   .then(function (resposta) {
      console.log(resposta);
    }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
  }
}

function colocarDadosUsuario(){
  let inputs = document.querySelectorAll('.config-item input');
  inputs[0].value = sessionStorage.NOME;
  inputs[1].value = sessionStorage.SOBRENOME;
  inputs[2].value = sessionStorage.EMAIL;
  inputs[3].value = sessionStorage.CARGO;
}

const logout = () => {
  sessionStorage.clear();
  window.location.href = '/';
}

if(sessionStorage.IDUSUARIO == undefined) window.location.href = '/';