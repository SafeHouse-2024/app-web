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
    data: [{
      x: (new Date()).getTime(),
      y: 35
    }],
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
      data: [{
        x: (new Date()).getTime(),
        y: 35
      }],
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


let timeout = undefined;

const buscarGraficos = (tipoGrafico = "cpu", idComputador = computadorAtual.idComputador) => {
  
  if(timeout != undefined){
    clearTimeout(timeout)
  }

  const queryProcessador = `grafico_cpu_inicial ${idComputador}`
  const queryMemoria = `grafico_ram_inicial ${idComputador}`
  const queryDisco = `grafico_disco_inicial ${idComputador}`
  const queryRede = `grafico_rede_inicial ${idComputador}`

  if(tipoGrafico == "cpu"){
    grafico_linha_filtro.style.display=`block`;
    grafico_donut_filtro.style.display=`none`
    grafico_rede_filtro.style.display = `none`
    chart5.update(cpuChartConfig)  
    consultaBanco(`/conexao/${queryProcessador}`, 'GET').then((resposta) =>{
      initLineChart(chart5,resposta, 'Processador', idComputador)
    })
  }else if(tipoGrafico == "ram"){
    grafico_linha_filtro.style.display=`block`
    grafico_donut_filtro.style.display=`none`
    grafico_rede_filtro.style.display = `none`
    chart5.update(ramChartConfig)
    consultaBanco(`/conexao/${queryMemoria}`, 'GET').then((resposta) => {
      initLineChart(chart5, resposta, 'Memória', idComputador)
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
      initRedeChart(chart6, resposta, idComputador)
    })
  }
  
}

const top5DarkStores = (darkstores) => {

  let top5 = []
  for(var i = 0; i < darkstores.length; i++){
    if(top5.length == 5) break;
      top5.push(darkstores[i])
    }
  console.log(top5)
  return top5
}

const buscarGraficosIniciais = (darkstores) => {
  graficoInicialCPU(darkstores)
  graficoInicialRede(darkstores)
  graficoInicialRAM(darkstores)
  graficoInicialSeguranca(darkstores)
}

const graficoInicialCPU = (darkstores) => {
  let top5DarkStoreProcessador = top5DarkStores(darkstores)
  let categoriesProcessador = top5DarkStoreProcessador.map(darkstore => darkstore.nome)
  let usoProcessador = top5DarkStoreProcessador.map(darkstore => totalMaquinas('Processador', darkstore.idDarkStore))

  chart.update({
    xAxis: {
      categories: categoriesProcessador,
      title: {
        text: "Darkstore",
      },
      labels: {
        style: {
          fontSize: "12px"
        }
      }
  },
  series: [{
    data: usoProcessador,
    color: '#13004C',
    showInLegend: false
  }]
  })


}

const graficoInicialRAM = (darkstores) => {
  let top5DarkStoreRAM = top5DarkStores(darkstores)
  let categoriesRAM = top5DarkStoreRAM.map(darkstore => darkstore.nome)
  let usoRAM = top5DarkStoreRAM.map(darkstore => totalMaquinas("Memória", darkstore.idDarkStore))

  chart2.update({
    xAxis: {
      categories: categoriesRAM,
      title: {
        text: "Darkstore",
      },
      labels: {
        style: {
          fontSize: "12px"
        }
      }
  },
  series: [{
    data: usoRAM,
    color: '#13004C',
    showInLegend: false
  }]
  })

}

const graficoInicialRede = (darkstores) => {
  let top5DarkStoreRede = top5DarkStores(darkstores)
  let categoriesRede = top5DarkStoreRede.map(darkstore => darkstore.nome)
  let usoRede = top5DarkStoreRede.map(darkstore => totalMaquinas("Rede", darkstore.idDarkStore))
  
  chart3.update({
    xAxis: {
      categories: categoriesRede,
      labels: {
        style: {
          fontSize: "12px"
        }
      },
      title: {
        text: "Darkstore"
      }
  },
  series: [{
    data: usoRede,
    color: '#13004C',
    showInLegend: false
}]
  })
}

const graficoInicialSeguranca = (darkstores) => {
    const top5DarkStoreSeguranca = top5DarkStores(darkstores)
    const categoriesSeguranca = top5DarkStoreSeguranca.map(darkstore => darkstore.nome)
    const qtdMaquinas = top5DarkStoreSeguranca.map(darkstore => totalMaquinas("Segurança", darkstore.idDarkStore))
    console.log(categoriesSeguranca)
    console.log(qtdMaquinas)
    chart4.update({
      xAxis: {
        categories: categoriesSeguranca,
        labels: {
          style: {
            fontSize: "12px"
          }
        },
        title: {
          text: "Darkstore"
        }
    },
    series: [{
      data: qtdMaquinas,
      color: '#13004C',
      showInLegend: false
  }]
    })
}

const initDonutChart = (data) =>{
  // Falta colocar em percentual
  console.log((parseFloat(data[0].valor.split(" ")) - parseFloat(data[1].valor.split(" "))))
  let configuracaoInicial = [{name: "Livre", y: parseFloat(data[1].valor.split(" ")[0])},{name: "Ocupado",y: (parseFloat(data[0].valor.split(" ")[0]) - parseFloat(data[1].valor.split(" ")[0]))}]
  chart7.series[0].setData(configuracaoInicial)
}

const initLineChart = (chart, data, componente, idComputador) =>{

  let configuracaoInicial = []
  for(var i = 0; i < data.length; i++){
    configuracaoInicial.push({x: new Date(data[i].dataRegistro).getTime(), y: parseFloat(data[i].valor)}) 
  }

  chart.series[0].setData(configuracaoInicial)
  setTimeout(() => {
    updateLineChart(chart, componente, idComputador)
  }, 3000)
}

const updateLineChart = (chart, componente, idComputador) => {
  
  chartData = [...chart.series[0].userOptions.data]
  const query = `SELECT TOP 1 rc.valor as 'valor', rc.dataRegistro as 'dataRegistro' FROM Componente c JOIN RegistroComponente rc ON c.idComponente = rc.fkComponente WHERE c.fkComputador = ${idComputador} AND c.nome LIKE '${componente}' ORDER BY idRegistro DESC;`
  let resposta;
  consultaBanco(`/conexao/${query}`, 'GET').then(data => {
    resposta = data
    console.log(resposta)
  })
  timeout = setTimeout(() => {
    if(new Date(resposta[0].dataRegistro).getTime() != chart.series[0].xData[chart.series[0].xData.length -1]){
      chartData.shift()
      chartData.push({x: new Date(resposta[0].dataRegistro).getTime(), y: parseFloat(resposta[0].valor)})
      chart.update({
        series:[
          {
            colorByPoint: false,
            name: componente == 'Processador' ? "CPU" : "RAM",
            data: [...chartData],
            showInLegend: false
          }
        ]
      })
      // chart.series[0].setData(chart7.series[0].userOptions.data)
    }
    updateLineChart(chart, componente, idComputador)
  }, 2000)

}

const initRedeChart = (chart, resposta, idComputador) => {
  
  let pings = [];
  let downloads =[];
  let uploads = [];
  for(var i = 0; i < resposta.length; i++){
    if(resposta[i].nome == 'Ping'){
      pings.push({x: new Date(resposta[i].dataRegistro).getTime(), y: parseFloat(resposta[i].valor)})
    }else if(resposta[i].nome == 'Download'){
      downloads.push({x: new Date(resposta[i].dataRegistro).getTime(), y: parseFloat(resposta[i].valor)})
    }else if(resposta[i].nome == 'Upload'){
      uploads.push({x: new Date(resposta[i].dataRegistro).getTime(), y: parseFloat(resposta[i].valor)})
    }
  }

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

  setTimeout(() => {
    updateRedeChart(idComputador)
  }, 2000)
}

const updateRedeChart = (idComputador) => {
    let pingData = [...chart6.userOptions.series[2].data]
    let downloadData = [...chart6.userOptions.series[0].data]
    let uploadData = [...chart6.userOptions.series[1].data]
    let data;
    const query = `SELECT TOP 3 rc.nome as 'nome', rc.valor as 'valor', rc.dataRegistro as 'dataRegistro' FROM Componente c JOIN RegistroComponente rc ON rc.fkComponente = c.idComponente WHERE fkComputador = ${idComputador} AND rc.nome IN ('Ping', 'Download', 'Upload') ORDER BY rc.idRegistro DESC;`

    consultaBanco(`/conexao/${query}`, 'GET').then(resposta => {
      console.log(resposta)
      data = resposta
    })

    timeout = setTimeout(() => {
      if(new Date(data[0].dataRegistro).getTime() != uploadData[uploadData.length -1].x){
        console.log("Atualizando o gráfico")
        for (var i = 0; i < data.length; i++){
          if(data[i].nome == "Upload"){
            uploadData.shift()
            uploadData.push({
                x: new Date(data[i].dataRegistro).getTime(),
                y: parseFloat(data[i].valor.split(" ")[1])
              })
          }else if(data[i].nome == "Download"){
            downloadData.shift()
            downloadData.push({
              x: new Date(data[i].dataRegistro).getTime(),
              y: parseFloat(data[i].valor.split(" ")[1])
            })
          }else if(data[i].nome == "Ping"){
            pingData.shift()
            pingData.push({
              x: new Date(data[i].dataRegistro).getTime(),
              y: parseFloat(data[i].valor.split(" ")[1])
            })
          }
        }
        
        chart6.update({
            series: [{
              colorByPoint: false,
              name: 'Download',
              data: downloadData,
              showInLegend: false
          },
          {
            colorByPoint: false,
            name: "Upload",
            data: uploadData,
            showInLegend: false
          },
          {
            colorByPoint: false,
            name: "Ping",
            data: pingData,
            showInLegend: false
          }]
          })
        }
        updateRedeChart(idComputador)
          }, 2000)
}