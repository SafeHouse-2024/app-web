

criarHover = (message) =>{
  const hover = document.createElement("div");
  hover.setAttribute("id", "div-informativa")
  const newElement = document.createTextNode(message);
  hover.appendChild(newElement)
  return hover
}

const chart = Highcharts.chart('cpu-darkstore', {
  chart: {
      type: 'column'
  },
  title: {
      text: 'Quantidade de máquinas em cada darkstore com uso excessivo de CPU',
      style: {
        fontSize: '14px'
      }
  },
  xAxis: {
      categories: ['Campo Grande', 'São Paulo', 'Rio de Janeiro', 'Mirabela', 'Santo André'],
      title: {
        text: "Darkstore",
      },
      labels: {
        style: {
          fontSize: "12px"
        }
      }
  },
  yAxis: {
      title: {
          text: 'Quantidade de máquinas'
      }
  },
  series: [{
      data: [5, 4, 2, 3, 4],
      color: '#13004C',
      showInLegend: false
  }]
});

const chart2 = Highcharts.chart("ram-darkstore", {
chart: {
      type: 'column'
  },
  title: {
      text: 'Quantidade de máquinas em cada darkstore com uso excessivo de RAM',
      style: {
        fontSize: '14px'
      }
  },
  xAxis: {
      categories: ['Campo Grande', 'São Paulo', 'Rio de Janeiro', 'Mirabela', 'Santo André'],
      title: {
        text: "Darkstore",
      },
      labels: {
        style: {
          fontSize: "12px"
        }
      }
  },
  yAxis: {
      title: {
          text: 'Quantidade de máquinas'
      }
  },
  series: [{
      name: "Quantidade de Máquinas",
      data: [5, 4, 2, 3, 4],
      color: '#13004C',
      showInLegend: false
  }]
})

const chart3 = Highcharts.chart("rede-darkstore", {
chart: {
      type: 'column'
  },
  title: {
      text: 'Quantidade de máquinas em cada darkstore com uso excessivo de Rede',
      style: {
        fontSize: '14px'
      }
  },
  xAxis: {
      categories: ['Campo Grande', 'São Paulo', 'Rio de Janeiro', 'Mirabela', 'Santo André'],
      labels: {
        style: {
          fontSize: "12px"
        }
      },
      title: {
        text: "Darkstore"
      }
  },
  yAxis: {
      title: {
          text: 'Quantidade de máquinas'
      }
  },
  series: [{
      data: [5, 4, 2, 3, 4],
      color: '#13004C',
      showInLegend: false
  }]
})

const chart4 = Highcharts.chart("seguranca-darkstore", {
  chart: {
        type: 'column'
    },
    title: {
        text: 'Quantidade de violações de segurança em cada Darkstore',
        style: {
          fontSize: '14px'
        }
    },
    xAxis: {
        categories: ['Campo Grande', 'São Paulo', 'Rio de Janeiro', 'Mirabela', 'Santo André'],
    },
    yAxis: {
        title: {
            text: 'Total de violações'
        }
    },
    series: [{
        data: [5, 4, 2, 3, 4],
        color: '#13004C',
        showInLegend: false
    }]
  })


var estadoNormalGeral = document.getElementById("estadoNormalGeral")
estadoNormalGeral.addEventListener('mouseenter', () => {
  document.getElementById("alertasGeral").insertBefore(criarHover("Estado Normal indica que essa darkstore não tem nenhuma máquina com uso excessivo de hardware"), estadoNormalGeral)
})

estadoNormalGeral.addEventListener('mouseout', () => {
  document.getElementById("alertasGeral").removeChild(document.getElementById("div-informativa"));
})

var estadoAlertaGeral = document.getElementById("estadoAlertaGeral")
estadoAlertaGeral.addEventListener('mouseenter', () => {
  document.getElementById("alertasGeral").insertBefore(criarHover("Estado de alerta indica que essa darkstore tem até 30% dos computadores com uso excessivo de hardware"), estadoAlertaGeral)
})

estadoAlertaGeral.addEventListener('mouseout', () => {
  document.getElementById("alertasGeral").removeChild(document.getElementById("div-informativa"))
})

var estadoCriticoGeral = document.getElementById("estadoCriticoGeral")
estadoCriticoGeral.addEventListener('mouseenter', () => {
  document.getElementById("alertasGeral").insertBefore(criarHover("Estado de alerta indica que essa darkstore tem mais de 50% dos computadores com uso excessivo de hardware"), estadoCriticoGeral)
})

estadoCriticoGeral.addEventListener('mouseout', () => {
  document.getElementById("alertasGeral").removeChild(document.getElementById("div-informativa"))
})