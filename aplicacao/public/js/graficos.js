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

const chart6 = Highcharts.chart("cpu-linha", {
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
  }
]
})

const chart7 = Highcharts.chart("ram-linha", {
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
    name: 'RAM',
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
            sliced: true,
            selected: true,
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

console.log(chart6.series[0].userOptions.data)

const initLineChartCPU = (data) =>{
  chart6.series[0].userOptions.data = data
}