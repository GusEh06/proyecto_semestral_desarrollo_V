const carousel = document.getElementById('carousel');
const items = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

document.getElementById('next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % items.length;
  updateCarousel();
});

document.getElementById('prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  updateCarousel();
});

function updateCarousel() {
  const offset = -currentIndex * 260;
  carousel.style.transform = `translateX(${offset}%)`;
}

