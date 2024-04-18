const graficoLinhaUmPrimeiraMaquina = document.getElementById('graficoMaquina1Linha1');
const graficoLinhaDoisPrimeiraMaquina = document.getElementById('graficoMaquina1Linha2');
const graficoDonutPrimeiraMaquina = document.getElementById('graficoMaquina1Donut1');

const graficoLinhaUmSegundaMaquina = document.getElementById('graficoMaquina2Linha1');
const graficoLinhaDoisSegundaMaquina = document.getElementById('graficoMaquina2Linha2');
const graficoDonutSegundaMaquina = document.getElementById('graficoMaquina2Donut1');

const graficoLinhaUmTerceiraMaquina = document.getElementById('graficoMaquina3Linha1');
const graficoLinhaDoisTerceiraMaquina = document.getElementById('graficoMaquina3Linha2');
const graficoDonutTerceiraMaquina = document.getElementById('graficoMaquina3Donut1');

const graficoLinhaUmQuartaMaquina = document.getElementById('graficoMaquina4Linha1');
const graficoLinhaDoisQuartaMaquina = document.getElementById('graficoMaquina4Linha2');
const graficoDonutQuartaMaquina = document.getElementById('graficoMaquina4Donut1');

new Chart(graficoLinhaUmPrimeiraMaquina, {
  type: 'line',
  data: {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [{
      label: 'CPU',
      data: [0, 10, 5, 2, 20, 30],
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    },
    {
      label: 'Memória RAM',
      data: [10, 20, 15, 12, 30, 40],
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    },
    {
      label: 'Disco Rígido',
      data: [20, 30, 25, 22, 40, 50],
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

new Chart(graficoLinhaDoisPrimeiraMaquina, {
  type: 'line',
  data: {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [{
      label: 'CPU',
      data: [0, 10, 5, 2, 20, 30],
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    },
    {
      label: 'Memória RAM',
      data: [10, 20, 15, 12, 30, 40],
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    },
    {
      label: 'Disco Rígido',
      data: [20, 30, 25, 22, 40, 50],
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

new Chart(graficoDonutPrimeiraMaquina, {
  type: 'doughnut',
  data: {
    labels: ['CPU', 'Memória RAM', 'Disco Rígido'],
    datasets: [{
      label: 'Dados',
      data: [30, 40, 50],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      hoverOffset: 4
    }]
  }
});

new Chart(graficoLinhaUmSegundaMaquina, {
  type: 'line',
  data: {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [{
      label: 'CPU',
      data: [0, 10, 5, 2, 20, 30],
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    },
    {
      label: 'Memória RAM',
      data: [10, 20, 15, 12, 30, 40],
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    },
    {
      label: 'Disco Rígido',
      data: [20, 30, 25, 22, 40, 50],
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

new Chart(graficoLinhaDoisSegundaMaquina, {
  type: 'line',
  data: {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [{
      label: 'CPU',
      data: [0, 10, 5, 2, 20, 30],
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    },
    {
      label: 'Memória RAM',
      data: [10, 20, 15, 12, 30, 40],
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    },
    {
      label: 'Disco Rígido',
      data: [20, 30, 25, 22, 40, 50],
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

new Chart(graficoDonutSegundaMaquina, {
  type: 'doughnut',
  data: {
    labels: ['CPU', 'Memória RAM', 'Disco Rígido'],
    datasets: [{
      label: 'Dados',
      data: [30, 40, 50],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      hoverOffset: 4
    }]
  }
});

new Chart(graficoLinhaUmTerceiraMaquina, {
  type: 'line',
  data: {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [{
      label: 'CPU',
      data: [0, 10, 5, 2, 20, 30],
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    },
    {
      label: 'Memória RAM',
      data: [10, 20, 15, 12, 30, 40],
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    },
    {
      label: 'Disco Rígido',
      data: [20, 30, 25, 22, 40, 50],
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

new Chart(graficoLinhaDoisTerceiraMaquina, {
  type: 'line',
  data: {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [{
      label: 'CPU',
      data: [0, 10, 5, 2, 20, 30],
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    },
    {
      label: 'Memória RAM',
      data: [10, 20, 15, 12, 30, 40],
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    },
    {
      label: 'Disco Rígido',
      data: [20, 30, 25, 22, 40, 50],
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

new Chart(graficoDonutTerceiraMaquina, {
  type: 'doughnut',
  data: {
    labels: ['CPU', 'Memória RAM', 'Disco Rígido'],
    datasets: [{
      label: 'Dados',
      data: [30, 40, 50],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      hoverOffset: 4
    }]
  }
});

new Chart(graficoLinhaUmQuartaMaquina, {
  type: 'line',
  data: {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [{
      label: 'CPU',
      data: [0, 10, 5, 2, 20, 30],
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    },
    {
      label: 'Memória RAM',
      data: [10, 20, 15, 12, 30, 40],
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    },
    {
      label: 'Disco Rígido',
      data: [20, 30, 25, 22, 40, 50],
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

new Chart(graficoLinhaDoisQuartaMaquina, {
  type: 'line',
  data: {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [{
      label: 'CPU',
      data: [0, 10, 5, 2, 20, 30],
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    },
    {
      label: 'Memória RAM',
      data: [10, 20, 15, 12, 30, 40],
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    },
    {
      label: 'Disco Rígido',
      data: [20, 30, 25, 22, 40, 50],
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

new Chart(graficoDonutQuartaMaquina, {
  type: 'doughnut',
  data: {
    labels: ['CPU', 'Memória RAM', 'Disco Rígido'],
    datasets: [{
      label: 'Dados',
      data: [30, 40, 50],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      hoverOffset: 4
    }]
  }
});

