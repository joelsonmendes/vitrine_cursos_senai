const slides = [...document.querySelectorAll('.slide')];
const dotsContainer = document.getElementById('dots');
const progressBar = document.getElementById('progressBar');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let index = 0;
let timer;
let progressTimer;
const interval = 4500;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'dot';
  dot.setAttribute('aria-label', `Ir para imagem ${i + 1}`);
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

const dots = [...document.querySelectorAll('.dot')];

function updateCarousel() {
  slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  startProgress();
}

function nextSlide() {
  index = (index + 1) % slides.length;
  updateCarousel();
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  updateCarousel();
}

function goToSlide(i) {
  index = i;
  updateCarousel();
  restartAutoPlay();
}

function startProgress() {
  clearInterval(progressTimer);
  let start = Date.now();
  progressBar.style.width = '0%';

  progressTimer = setInterval(() => {
    const elapsed = Date.now() - start;
    const percent = Math.min((elapsed / interval) * 100, 100);
    progressBar.style.width = `${percent}%`;
  }, 40);
}

function restartAutoPlay() {
  clearInterval(timer);
  timer = setInterval(nextSlide, interval);
  startProgress();
}

prevBtn.addEventListener('click', () => { prevSlide(); restartAutoPlay(); });
nextBtn.addEventListener('click', () => { nextSlide(); restartAutoPlay(); });

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') { nextSlide(); restartAutoPlay(); }
  if (e.key === 'ArrowLeft') { prevSlide(); restartAutoPlay(); }
});

updateCarousel();
restartAutoPlay();
