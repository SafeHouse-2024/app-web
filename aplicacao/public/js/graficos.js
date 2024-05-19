criarHover = (message) =>{
  const hover = document.createElement("div");
  hover.setAttribute("id", "div-informativa")
  const newElement = document.createTextNode(message);
  hover.appendChild(newElement)
  return hover
}

Highcharts.setOptions({
  global: {
    useUTC: false
  }
})

const chart = Highcharts.chart('cpu-darkstore', {
  chart: {
      type: 'bar'
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

const chart5 = Highcharts.chart("rede-linha", {
    chart: {
          type: 'areaspline'
      },
      title: {
          text: 'Uso de rede em tempo real',
          style: {
            fontSize: '14px'
          }
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 120,
        y: 70,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
      },
      tooltip: {
        shared: true,
        formatter: function () {
          var texto = "";
          for(var i = 0; i < this.points.length; i++){
            texto += `<b> A taxa de uso de ${this.points[i].series.name} é de: ${this.points[i].y}</b> </br>`
          }
          return texto
      }
    },
    plotOptions: {
      series: {
          pointStart: (new Date()).getTime()
      },
      areaspline: {
          fillOpacity: 0.5
      }
    },
    xAxis: {
        type: 'datetime',
        plotBands: [{ // Highlight the two last years
          from: 2019,
          to: 2020,
          color: 'rgba(68, 170, 213, .2)'
      }]
    },
    yAxis: {
        title: {
            text: 'Total de violações'
        }
    },
    series: [{
      name: 'Download',
      data: [{
        x: (new Date()).getTime(),
        y: 35
      },
      {
        x: (new Date()).getTime() + 2000,
        y: 38
      }
    ],
      showInLegend: false
    },
    {
      name: "Upload",
      data: [{
        x: (new Date()).getTime(),
        y: 32
      },
      {
        x: (new Date()).getTime() + 2000,
        y: 39
      }
    ],
      showInLegend: false
    },
    {
      name: "Ping",
      data: [{
        x: (new Date()).getTime(),
        y: 10
      },
      {
        x: (new Date()).getTime() + 2000,
        y: 15
      }
    ],
      showInLegend: false
    }
  ]
})

const chart6 = Highcharts.chart("ram-linha", {
  chart: {
        type: 'areaspline'
    },
    title: {
        text: 'Uso de RAM em tempo real',
        style: {
          fontSize: '14px'
        }
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
      x: 120,
      y: 70,
      floating: true,
      borderWidth: 1,
      backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
    },
    tooltip: {
      shared: true,
      formatter: function () {
        var texto = "";
        for(var i = 0; i < this.points.length; i++){
          texto += `<b> A taxa de uso de ${this.points[i].series.name} é de: ${this.points[i].y}</b> </br>`
        }
        return texto
    }
  },
  plotOptions: {
    series: {
        pointStart: (new Date()).getTime()
    },
    areaspline: {
        fillOpacity: 0.5
    }
  },
  xAxis: {
      type: 'datetime',
      plotBands: [{ // Highlight the two last years
        from: 2019,
        to: 2020,
        color: 'rgba(68, 170, 213, .2)'
    }]
  },
  yAxis: {
      title: {
          text: 'Total de violações'
      }
  },
  series: [{
    name: 'RAM',
    data: [],
    showInLegend: false
  }
]
})

const chart7 = Highcharts.chart("cpu-linha", {
  chart: {
        type: 'areaspline'
    },
    title: {
        text: 'Uso de CPU em tempo real',
        style: {
          fontSize: '14px'
        }
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
      x: 120,
      y: 70,
      floating: true,
      borderWidth: 1,
      backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
    },
    tooltip: {
      shared: true,
      formatter: function () {
        var texto = "";
        for(var i = 0; i < this.points.length; i++){
          texto += `<b> A taxa de uso de ${this.points[i].series.name} é de: ${this.points[i].y}</b> </br>`
        }
        return texto
    }
  },
  plotOptions: {
    series: {
        pointStart: (new Date()).getTime()
    },
    areaspline: {
        fillOpacity: 0.5
    }
  },
  xAxis: {
      type: 'datetime',
      plotBands: [{ // Highlight the two last years
        from: 2019,
        to: 2020,
        color: 'rgba(68, 170, 213, .2)'
    }]
  },
  yAxis: {
      title: {
          text: 'Total de violações'
      }
  },
  series: [{
    name: 'CPU',
    data: [
  ],
    showInLegend: false
  }
]
})

const chart8 = Highcharts.chart('disco-donut', {
  chart: {
      type: 'pie'
  },
  title: {
      text: 'Uso de disco em percentual',
      style: {
        fontSize: '14px'
      }
  },
  series: [ {
    name: 'Porcentagem',
    colorByPoint: true,
    data: [
        {
            name: 'Ocupado',
            y: 55.02
        },
        {
            name: 'Livre',
            y: 26.71
        },]}]
});

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


let timeoutCPU;
let timeoutRAM;

const buscarGraficos = () => {

  if (timeoutCPU != undefined){
    clearTimeout(timeoutCPU)
  }else if(timeoutRAM != undefined){
    clearTimeout(timeoutRAM)
  }

  const queryProcessador = `SELECT rc.valor as 'valor', rc.dataRegistro as 'dataRegistro' FROM Componente c JOIN RegistroComponente rc ON c.idComponente = rc.fkComponente WHERE c.fkComputador = 6 AND c.nome LIKE 'Processador' ORDER BY idRegistro DESC LIMIT 7;`
  const queryMemoria = `SELECT rc.valor as 'valor', rc.dataRegistro as 'dataRegistro' FROM Componente c JOIN RegistroComponente rc ON c.idComponente = rc.fkComponente WHERE c.fkComputador = 6 AND c.nome LIKE 'Memória' ORDER BY idRegistro DESC LIMIT 7;`
  const queryDisco = `SELECT ca.nome, ca.valor FROM Componente c JOIN CaracteristicaComponente ca ON c.idComponente = ca.fkComponente WHERE c.fkComputador = 6 AND c.nome LIKE 'Disco';`

  consultaBanco(`/conexao/${queryMemoria}`, 'GET').then((resposta) =>{
    initLineChart(chart6,resposta, 'Processador', timeoutCPU)
  })

  consultaBanco(`/conexao/${queryProcessador}`, 'GET').then((resposta) => {
    initLineChart(chart7, resposta, 'Memória', timeoutRAM)
  })

  consultaBanco(`/conexao/${queryDisco}`, 'GET').then((resposta) => {
    initDonutChart(resposta)
  })
  
}


const initDonutChart = (data) =>{

  console.log((parseFloat(data[0].valor.split(" ")) - parseFloat(data[1].valor.split(" "))))
  let configuracaoInicial = [{name: "Livre", y: parseFloat(data[1].valor.split(" "))},{name: "Ocupado",y: (parseFloat(data[0].valor.split(" ")) - parseFloat(data[1].valor.split(" ")))}]
  chart8.series[0].setData(configuracaoInicial)
}

// const initLineChart = (chart, data, componente, timeout) =>{

//   let configuracaoInicial = []
//   for(var i = 0; i < data.length; i++){
//     configuracaoInicial.push({x: new Date(data[i].dataRegistro).getTime(), y: parseFloat(data[i].valor)}) 
//   }

//   chart.series[0].setData(configuracaoInicial)
//   setTimeout(() => {
//     updateLineChart(chart, componente, timeout)
//   }, 3000)
// }

// const updateLineChart = (chart, componente, timeout) => {
  
//   chartData = chart.series[0].userOptions.data
//   const query = `SELECT rc.valor as 'valor', rc.dataRegistro as 'dataRegistro' FROM Componente c JOIN RegistroComponente rc ON c.idComponente = rc.fkComponente WHERE c.fkComputador = 6 AND c.nome LIKE '${componente}' ORDER BY idRegistro DESC LIMIT 1;`
//   let resposta;
//   consultaBanco(`/conexao/${query}`, 'GET').then(data => {
//     resposta = data
//   })
//   timeout = setTimeout(() => {
//     if(new Date(resposta[0].dataRegistro).getTime() != chart.series[0].xData[chart.series[0].xData.length -1]){
//       chartData.shift()
//       chartData.push({x: new Date(resposta[0].dataRegistro).getTime(), y: parseFloat(resposta[0].valor)})
//       if(componente == 'Processador'){
//         chart.series[0].setData(chart6.series[0].userOptions.data)
//       }else{
//         chart.series[0].setData(chart7.series[0].userOptions.data)
//       }
//     }
//     updateLineChart(chart, componente, timeout)
//   }, 3000)

// }