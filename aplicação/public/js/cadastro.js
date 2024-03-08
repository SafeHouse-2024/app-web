const bgAnimado = document.getElementById('bgAnimado');

const numerosDeCaixas = 400;

for (let i = 0; i < numerosDeCaixas; i++) {
    const caixa = document.createElement('div');
    caixa.classList.add('caixaColorida');
    bgAnimado.appendChild(caixa);
}