const btnMobile = document.getElementById('btn-mobile');

function toggleMenu(event) {
  if (event.type === 'touchstart') event.preventDefault();
  const nav = document.getElementById('nav');
  nav.classList.toggle('active');

  const active = nav.classList.contains('active');
  event.currentTarget.setAttribute('aria-expanded', active);

  if (active) {
    event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
  } else {
    event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
  }
}

btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);

const container = document.querySelectorAll('.esconder');

const meuObservador = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('ativo');
    } else {
      entry.target.classList.remove('ativo');
    }
  });
});

container.forEach((container) => {
  meuObservador.observe(container);
});
