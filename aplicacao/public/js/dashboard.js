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
  query = `SELECT pc.*, c.nome as 'nomeComponente', ca.nome as 'nomeCaracteristica', ca.valor 'valorCaracteristica' 
  FROM Componente c JOIN Computador pc ON c.fkComputador = pc.idComputador JOIN CaracteristicaComponente ca ON ca.fkComponente = c.idComponente WHERE pc.fkDarkStore = ${sessionStorage.FKDARKSTORE};
  `

  let idComputador = 0;
  let indiceComputador = -1;

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
              componentes: [
                {
                  nome: resposta[i].nomeComponente,
                  caracteristicas: [
                    {
                      nome: resposta[i].nomeCaracteristica,
                      valor: resposta[i].valorCaracteristica
                    }
                  ]
                }
              ]
            });
            idComputador = resposta[i].idComputador;
            indiceComputador++;
          }
          computadores[indiceComputador].componentes.push({
            nome: resposta[i].nomeComponente,
            caracteristicas: [{
              nome: resposta[i].nomeCaracteristica,
              valor: resposta[i].valorCaracteristica
            }]
          });
        }
      }
    }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

  console.log(computadores);
}

function criarDashboard() {

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
  
  document.querySelector('#maquinas_darkstore').innerHTML = '';
  for(let i = 0; i < computadores.length; i++){
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
        <a style="font-weight: bold">CPU</a>
        <a
          >Nome: AMD Rayzen 3 3250U with Hadeon Graphics<br />
          Fabricante: AuthenticAMD<br />
          Frequência: 2600000000 <br />
          Total de núcleos: 5
        </a>
        <a style="font-weight: bold">RAM</a>
        <a>Total: 10,35GB</a>
        <a style="font-weight: bold">Disco</a>
        <a>Total: 928,82GB</a>
        <a style="font-weight: bold">Rede</a>
        <a
          >MacAdress: 10.18.7.82<br />
          IPV4: 10.16.7.82<br />
          IPV6: 2001:0db8:85a3:0000:0000:8a2e:0370:7334</a
        >
      </article>
    </div>
  </li>
  `;	
  }
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
}
