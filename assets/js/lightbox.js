/**
 * MALEE DRESS POINT - FULLSCREEN FASHION LIGHTBOX
 * High-performance full-screen preview with keyboard navigation & zoom
 */

document.addEventListener('DOMContentLoaded', () => {
  initFashionLightbox();
});

function initFashionLightbox() {
  const triggers = document.querySelectorAll('.lightbox-trigger');
  if (!triggers.length) return;

  // Create Lightbox DOM structure if not present
  let lightbox = document.getElementById('global-fashion-lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'global-fashion-lightbox';
    lightbox.className = 'lightbox-modal fixed inset-0 z-[99999] bg-black/92 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-10';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Fashion Photo Lightbox');

    lightbox.innerHTML = `
      <div class="absolute top-6 right-6 z-20 flex items-center gap-4">
        <span id="lightbox-counter" class="text-xs uppercase tracking-widest text-stone-400 font-mono">1 / 1</span>
        <button id="lightbox-close" class="p-2 text-stone-300 hover:text-white transition-colors focus:outline-none" aria-label="Close Lightbox">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <button id="lightbox-prev" class="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 text-stone-400 hover:text-white transition-all hover:scale-110 focus:outline-none z-20" aria-label="Previous image">
        <svg class="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button id="lightbox-next" class="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 text-stone-400 hover:text-white transition-all hover:scale-110 focus:outline-none z-20" aria-label="Next image">
        <svg class="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div class="lightbox-content max-w-5xl max-h-[85vh] flex flex-col items-center justify-center relative z-10 select-none">
        <img id="lightbox-img" src="" alt="" class="max-h-[72vh] w-auto max-w-full object-contain rounded-sm shadow-2xl transition-opacity duration-300" />
        <div class="mt-4 text-center">
          <h4 id="lightbox-title" class="font-serif text-lg md:text-xl text-stone-100 tracking-wide"></h4>
          <p id="lightbox-desc" class="text-xs uppercase tracking-widest text-amber-300/80 mt-1"></p>
        </div>
      </div>
    `;
    document.body.appendChild(lightbox);
  }

  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  let currentIndex = 0;
  const itemsList = Array.from(triggers).map(trig => ({
    src: trig.getAttribute('data-full-img') || trig.querySelector('img')?.getAttribute('src') || '',
    title: trig.getAttribute('data-title') || trig.querySelector('img')?.getAttribute('alt') || 'Malee Dress Point Editorial',
    desc: trig.getAttribute('data-desc') || 'Horana Boutique Collection'
  }));

  function updateLightbox(index) {
    if (index < 0) index = itemsList.length - 1;
    if (index >= itemsList.length) index = 0;
    currentIndex = index;

    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = itemsList[currentIndex].src;
      lightboxImg.alt = itemsList[currentIndex].title;
      lightboxTitle.textContent = itemsList[currentIndex].title;
      lightboxDesc.textContent = itemsList[currentIndex].desc;
      lightboxCounter.textContent = `${currentIndex + 1} / ${itemsList.length}`;
      lightboxImg.style.opacity = '1';
    }, 150);
  }

  function openLightbox(index) {
    updateLightbox(index);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(index);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => updateLightbox(currentIndex - 1));
  nextBtn.addEventListener('click', () => updateLightbox(currentIndex + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') updateLightbox(currentIndex - 1);
    if (e.key === 'ArrowRight') updateLightbox(currentIndex + 1);
  });
}
