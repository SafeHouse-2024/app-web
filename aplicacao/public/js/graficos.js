const graficosLinha = document.querySelectorAll('.chart-linha > canvas');
const graficosBarra = document.querySelectorAll('.chart-barra > canvas');
const graficosDonut = document.querySelectorAll('.chart-donut > canvas');
const graficoCPUDarkStore = document.getElementById('ctx_barra_geral1');
const graficoRAMDarkStore = document.getElementById('ctx_barra_geral2')

const barraProgresso = document.querySelectorAll('.header-maquina > progress');

function sortearLabel() {
  let valor = Math.floor(Math.random() * 100);
  let data = [];
  for (let i = 0; i < 5; i++) {
    data.push(valor);
    valor = Math.floor(Math.random() * 100);
  }

  return data;
}

const decidirNome = (decidi) => {
 return decidi%2 ? 'CPU' : 'RAM';
}

let contador = 1;

graficosLinha.forEach((grafico) => {
  const ctx = grafico.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['12:00', '12:30', '13:00', '13:30', '14:00'],
            datasets: [{
                label: decidirNome(contador++), 
                data: sortearLabel(),
                borderColor: '#fff',
                backgroundColor: '#fff',
                borderWidth: 2,
            }]
        }
    });
});

graficosDonut.forEach((grafico) => {
  const ctx = grafico.getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['CPU', 'RAM', 'Disco'],
      datasets: [{
        data: [30, 40, 30],
        backgroundColor: ['#ff0000', '#00ff00', '#0000ff']
      }]
    }
  });
});


function sortearValor() {
  return Math.floor(Math.random() * 100);
}


new Chart(graficoCPUDarkStore, {
  type: 'bar',
  data: {
    labels: ['Campo Grande', 'São Paulo', 'Minas', 'Pernambuco', 'Maracás'],
    datasets: [{
      label: "Uso de CPU",
      data: [5, 4, 3, 9, 2]
    }]
  }
})

new Chart(graficoRAMDarkStore, {
  type: 'bar',
  data: {
    labels: ['Campo Grande', 'São Paulo', 'Minas', 'Pernambuco', 'Maracás'],
    datasets: [{
      label: "Uso de RAM",
      data: [5, 4, 3, 9, 2]
    }]
  }
})

setInterval(() => {
  barraProgresso.forEach((barra) => {
    barra.value = sortearValor();
  });
}, 2000);