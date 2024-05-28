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

cpuChartConfig = {  
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
        texto += `<b> A taxa de uso de ${this.points[0].series.name} é de: ${this.points[0].y}</b> </br>`
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
    }],
    title: {
      text: 'Horário da medição'
    }
  },
  yAxis: {
      title: {
          text: 'Valor em percentual'
      }
  },
  series: [{
    colorByPoint: false,
    name: 'CPU',
    data: [
  ],
    showInLegend: false
  }
]
}

ramChartConfig = {
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
        texto += `<b>A taxa de uso de ${this.points[0].series.name} é de: ${this.points[0].y}</b> </br>`

        return texto
    }
  },
  plotOptions: {
    stacking: 'normal',
    connectNulls: true,
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
    }],
    title: {
      text: 'Horário da medição'
    }
  },
  yAxis: {
      title: {
          text: 'Valor em percentual'
      }
    },
    series: [{
      colorByPoint: false,
      name: 'RAM',
      data: [],
      showInLegend: false
    }
  ]
}

const chart5 = Highcharts.chart("linha", cpuChartConfig)

const chart6 = Highcharts.chart("linha_rede", {
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
    stacking: 'normal',
    connectNulls: true,
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
    }],
    title: {
      text: 'Horário da medição'
    }
  },
  yAxis: {
    title: {
      text: 'Medições de rede'
    }
  },
  series: [{
    colorByPoint: false,
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

const chart7 = Highcharts.chart("disco_donut", {
  chart: {
      type: 'pie'
  },
  title: {
      text: 'Uso de disco em percentual',
      style: {
        fontSize: '14px'
      }
  },
xAxis: {
  title: {
    text: ""
  }
},
yAxis: {
  title: {
    text: ""
  }
},
series: [ {
    name: 'Porcentagem',
    colorByPoint: true,
    data: []
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


let timeout = undefined;

const buscarGraficos = (tipoGrafico = "cpu") => {
  
  if(timeout != undefined){
    clearTimeout(timeout)
  }

  const queryProcessador = `SELECT rc.valor as 'valor', rc.dataRegistro as 'dataRegistro' FROM Componente c JOIN RegistroComponente rc ON c.idComponente = rc.fkComponente WHERE c.fkComputador = 7 AND c.nome LIKE 'Processador' ORDER BY idRegistro DESC LIMIT 7;`
  const queryMemoria = `SELECT rc.valor as 'valor', rc.dataRegistro as 'dataRegistro' FROM Componente c JOIN RegistroComponente rc ON c.idComponente = rc.fkComponente WHERE c.fkComputador = 7 AND c.nome LIKE 'Memória' ORDER BY idRegistro DESC LIMIT 7;`
  const queryDisco = `SELECT ca.nome, ca.valor FROM Componente c JOIN CaracteristicaComponente ca ON c.idComponente = ca.fkComponente WHERE c.fkComputador = 7 AND c.nome LIKE 'Disco';`
  const queryRede = `SELECT rc.nome as 'nome', rc.valor as 'valor', rc.dataRegistro as 'dataRegistro' FROM Componente c JOIN RegistroComponente rc ON rc.fkComponente = c.idComponente WHERE fkComputador = 7 AND rc.nome IN ('Ping', 'Download', 'Upload') ORDER BY rc.idRegistro DESC LIMIT 21;`

  if(tipoGrafico == "cpu"){
    grafico_linha_filtro.style.display=`block`;
    grafico_donut_filtro.style.display=`none`
    grafico_rede_filtro.style.display = `none`
    chart5.update(cpuChartConfig)  
    consultaBanco(`/conexao/${queryProcessador}`, 'GET').then((resposta) =>{
      initLineChart(chart5,resposta, 'Processador', timeout)
    })
  }else if(tipoGrafico == "ram"){
    grafico_linha_filtro.style.display=`block`
    grafico_donut_filtro.style.display=`none`
    grafico_rede_filtro.style.display = `none`
    chart5.update(ramChartConfig)
    consultaBanco(`/conexao/${queryMemoria}`, 'GET').then((resposta) => {
      initLineChart(chart5, resposta, 'Memória', timeout)
    })
  }else if(tipoGrafico == "disco"){
    grafico_linha_filtro.style.display=`none`
    grafico_donut_filtro.style.display=`block`
    grafico_rede_filtro.style.display = `none`
    consultaBanco(`/conexao/${queryDisco}`, 'GET').then((resposta) => {
      initDonutChart(resposta)
    })
  }else if(tipoGrafico == "rede"){
    grafico_linha_filtro.style.display=`none`
    grafico_donut_filtro.style.display=`none`
    grafico_rede_filtro.style.display = `block`
    consultaBanco(`/conexao/${queryRede}`, 'GET').then((resposta) => {
      initRedeChart(chart6, resposta, 'Rede')
    })
  }
  
}


const initDonutChart = (data) =>{
  // Falta colocar em percentual
  console.log((parseFloat(data[0].valor.split(" ")) - parseFloat(data[1].valor.split(" "))))
  let configuracaoInicial = [{name: "Livre", y: parseFloat(data[1].valor.split(" ")[0])},{name: "Ocupado",y: (parseFloat(data[0].valor.split(" ")[0]) - parseFloat(data[1].valor.split(" ")[0]))}]
  chart7.series[0].setData(configuracaoInicial)
}

const initLineChart = (chart, data, componente) =>{

  let configuracaoInicial = []
  for(var i = 0; i < data.length; i++){
    configuracaoInicial.push({x: new Date(data[i].dataRegistro).getTime(), y: parseFloat(data[i].valor)}) 
  }

  chart.series[0].setData(configuracaoInicial)
  setTimeout(() => {
    updateLineChart(chart, componente)
  }, 3000)
}

const updateLineChart = (chart, componente) => {
  
  chartData = chart.series[0].userOptions.data
  const query = `SELECT rc.valor as 'valor', rc.dataRegistro as 'dataRegistro' FROM Componente c JOIN RegistroComponente rc ON c.idComponente = rc.fkComponente WHERE c.fkComputador = 7 AND c.nome LIKE '${componente}' ORDER BY idRegistro DESC LIMIT 1;`
  let resposta;
  consultaBanco(`/conexao/${query}`, 'GET').then(data => {
    resposta = data
  })
  timeout = setTimeout(() => {
    if(new Date(resposta[0].dataRegistro).getTime() != chart.series[0].xData[chart.series[0].xData.length -1]){
      chartData.shift()
      chartData.push({x: new Date(resposta[0].dataRegistro).getTime(), y: parseFloat(resposta[0].valor)})
      chart.series[0].setData(chart.series[0].userOptions.data)
      // chart.series[0].setData(chart7.series[0].userOptions.data)
    }
    updateLineChart(chart, componente, timeout)
  }, 3000)

}

const initRedeChart = (chart, resposta, componente) => {
  
  let pings = [];
  let downloads =[];
  let uploads = [];
  for(var i = 0; i < resposta.length; i++){
    if(resposta[i].nome == 'Ping'){
      pings.push({x: new Date(resposta[i].dataRegistro).getTime(), y: parseFloat(resposta[i].valor.split(" ")[1])})
    }else if(resposta[i].nome == 'Download'){
      downloads.push({x: new Date(resposta[i].dataRegistro).getTime(), y: parseFloat(resposta[i].valor.split(" ")[1])})
    }else if(resposta[i].nome == 'Upload'){
      uploads.push({x: new Date(resposta[i].dataRegistro).getTime(), y: parseFloat(resposta[i].valor.split(" ")[1])})
    }
  }

  console.log(chart)
  let configuracaoInicial = [
   
  ]

  chart.update({
    series: [{ 

      name: 'Ping',
      data: pings
    },
    {

      name: 'Download',
      data: downloads
    },
    {

      name: 'Upload',
      data: uploads
    }]
  })
}

const updateRedeChart = () => {
    let pingData = chart6.userOptions.series[0].data
    let downloadData = chart6.userOptions.series[1].data
    let uploadData = chart6.userOptions.series[2].data
    let data;
    const query = `SELECT rc.nome as 'nome', rc.valor as 'valor', rc.dataRegistro as 'dataRegistro' FROM Componente c JOIN RegistroComponente rc ON rc.fkComponente = c.idComponente WHERE fkComputador = 7 AND rc.nome IN ('Ping', 'Download', 'Upload') ORDER BY rc.idRegistro DESC LIMIT 3;`

    consultaBanco(`/conexao/${query}`, 'GET').then(resposta => {
      data = resposta
    })
}