const slides = document.querySelector('.inicio-carrusel-slides');
const totalSlides = document.querySelectorAll('.slide').length;
let index = 0;

// Movimiento automático del carrusel
setInterval(() => {
    index = (index < totalSlides - 1) ? index + 1 : 0; // Avanza al siguiente slide o vuelve al primero
    updateCarousel();
}, 3000); // Cambia cada 3 segundos (3000 ms)

document.getElementById('prev').addEventListener('click', () => {
  index = (index > 0) ? index - 1 : totalSlides - 1;
  updateCarousel();
});

document.getElementById('next').addEventListener('click', () => {
  index = (index < totalSlides - 1) ? index + 1 : 0;
  updateCarousel();
});

// Actualiza la posición del carrusel
function updateCarousel() {
    slides.style.transform = `translateX(-${index * 100}%)`;
}




