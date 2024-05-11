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


const darkstores = []
const selectDasCidades = document.querySelector('#cidades');

function buscarDarkstore() {
  buscarMaquinas();
  consultaBanco(`conexao/SELECT * FROM darkstore WHERE fkEmpresa = ${sessionStorage.IDEMPRESA}`, 'GET')
    .then(function (resposta) {
      if (resposta != null) {
        darkstores.push(resposta[0]);
      }
    }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

  selectDasCidades.innerHTML = '';
  consultaBanco(`conexao/SELECT * FROM darkstore WHERE fkEmpresa = ${sessionStorage.IDEMPRESA}`, 'GET').then(function (resposta) {
    if (resposta != null) {
      resposta.forEach(darkstore => {
        selectDasCidades.innerHTML += `<option value="${darkstore.idDarkstore}">${darkstore.uf}</option>`;
      });
    }
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  });

  setTimeout(() => {
    for (let i = 0; i < darkstores.length; i++) {
      document.querySelector('#empresasContent').innerHTML += `
    <div class="dark-content">
    <span
      class="status-maquina"
      style="background-color: yellow"
    ></span>
    <p>Dark Store - <span>${darkstores[0].uf}</span></p>
    <p>Quantidade de máquinas: <span>${computadores.length}</span></p>
    </div>`;
    }
  }, 1000);

}

selectDasCidades.addEventListener('change', function () {
  let idDarkstore = selectDasCidades.value;
  consultaBanco(`conexao/SELECT * FROM computador WHERE fkDarkstore = ${idDarkstore}`, 'GET').then(function (resposta) {
    console.log(resposta);
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  });

  document.querySelector('.estado').innerHTML = '';
  consultaBanco(`conexao/SELECT * FROM darkstore WHERE idDarkstore = ${idDarkstore}`, 'GET').then(function (resposta) {
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
  }, 2000);
}

window.onload = buscarDarkstore();

function buscarUsuarios() {
  let funcionarios = [];
  consultaBanco(`conexao/SELECT * FROM usuario WHERE fkDarkstore = ${sessionStorage.FKDARKSTORE} AND tipo = 'Funcionário'`, 'GET').then(function (resposta) {
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
  consultaBanco(`conexao/SELECT Log.*, usuario.nome as usuarioNome, computador.nome as computadorNome FROM Log
  JOIN Computador ON Log.fkComputador = Computador.idComputador
  JOIN DarkStore ON Computador.fkDarkStore = DarkStore.idDarkStore
  LEFT JOIN Usuario ON Log.fkUsuario = Usuario.idUsuario
  WHERE DarkStore.idDarkStore = ${sessionStorage.FKDARKSTORE}`, 'GET').then(function (resposta) {
    console.log(resposta);
    logs = resposta;
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  });

  let conteudoLogs = document.querySelector('.body-log');
  conteudoLogs.innerHTML = '';
  setTimeout(() => {
    for (let i = 0; i < logs.length; i++) {

      if (logs[i].fkComputador != null) {
        conteudoLogs.innerHTML += `
      <div class="card">
              <div class="picture">
                <img src="assets/user-icon.png" alt="" />
                <p>${logs[i].computadorNome}</p>
              </div>

              <div class="descricao log">
                <div style="margin-bottom: 10px">
                  <p>Descrição: ${logs[i].descricao}</p>
                  <p></p>
                </div>

                <div>
                  <p>Data: ${logs[i].dataLog}</p>
                </div>
              </div>
            </div>
    `;
      } else {
        conteudoLogs.innerHTML += `
        <div class="card">
                <div class="picture">
                  <img src="assets/user-icon.png" alt="" />
                  <p>${logs[i].usuarioNome}</p>
                </div>
  
                <div class="descricao log">
                  <div style="margin-bottom: 10px">
                    <p>Descrição: ${logs[i].descricao}</p>
                    <p></p>
                  </div>
  
                  <div>
                    <p>Data: ${logs[i].dataLog}</p>
                  </div>
                </div>
              </div>
      `;
      }
    }
  }, 1000);

}