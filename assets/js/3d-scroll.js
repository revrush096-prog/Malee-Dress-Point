/**
 * MALEE DRESS POINT - 3D SCROLL & PARALLAX ENGINE
 * Lightweight GPU-accelerated CSS 3D Transforms, translateZ spatial layers & depth
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  initHero3DScroll();
  initIntro3DParallax();
  initStepIntoStyle3DShowcase();
  initHorizontalScrollTrack();
  initFloatingElementsParallax();
});

/* ==========================================================================
   1. Hero 3D Depth Scroll (translateZ, scale, fade)
   ========================================================================== */
function initHero3DScroll() {
  const heroSection = document.getElementById('hero-3d-stage');
  if (!heroSection) return;

  const bgLayer = heroSection.querySelector('.hero-layer-bg');
  const midLayer = heroSection.querySelector('.hero-layer-mid');
  const textLayer = heroSection.querySelector('.hero-layer-text');
  const scrollIndicator = heroSection.querySelector('.hero-scroll-indicator');

  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const heroHeight = heroSection.offsetHeight;

        if (scrolled <= heroHeight) {
          const progress = scrolled / heroHeight;

          // Background moves backward & scales slightly
          if (bgLayer) {
            bgLayer.style.transform = `translate3d(0, ${scrolled * 0.35}px, -${progress * 120}px) scale(${1 + progress * 0.12})`;
          }

          // Model / Mid Layer shifts at medium speed
          if (midLayer) {
            midLayer.style.transform = `translate3d(0, ${scrolled * 0.15}px, ${progress * 60}px) scale(${1 - progress * 0.05})`;
          }

          // Foreground Typography drifts faster and fades smoothly
          if (textLayer) {
            textLayer.style.transform = `translate3d(0, -${scrolled * 0.45}px, ${progress * 100}px)`;
            textLayer.style.opacity = `${Math.max(0, 1 - progress * 1.6)}`;
          }

          // Scroll indicator fades quickly
          if (scrollIndicator) {
            scrollIndicator.style.opacity = `${Math.max(0, 1 - progress * 3.5)}`;
          }
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ==========================================================================
   2. Split-Screen 3D Parallax Intro
   ========================================================================== */
function initIntro3DParallax() {
  const introSection = document.getElementById('intro-3d-section');
  if (!introSection) return;

  const leftImg = introSection.querySelector('.intro-img-wrapper');
  const rightContent = introSection.querySelector('.intro-text-content');

  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const rect = introSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
          const offset = (windowHeight / 2) - (rect.top + rect.height / 2);
          const normalized = offset / windowHeight;

          if (leftImg) {
            // Subtle 3D rotation and vertical translation
            leftImg.style.transform = `translate3d(0, ${normalized * -30}px, 0) rotateY(${normalized * 6}deg) rotateX(${-normalized * 3}deg)`;
          }
          if (rightContent) {
            rightContent.style.transform = `translate3d(0, ${normalized * 25}px, 0)`;
          }
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ==========================================================================
   3. "Step Into Style" 3D Exhibition Showcase
   ========================================================================== */
function initStepIntoStyle3DShowcase() {
  const showcaseSection = document.getElementById('step-into-style-stage');
  if (!showcaseSection) return;

  const layers = showcaseSection.querySelectorAll('[data-depth]');
  const marqueeText = showcaseSection.querySelector('.step-marquee-heading');

  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const rect = showcaseSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
          const centeredProgress = progress - 0.5;

          layers.forEach(layer => {
            const depth = parseFloat(layer.getAttribute('data-depth')) || 0.2;
            const rotSpeed = parseFloat(layer.getAttribute('data-rotate')) || 0;
            
            // Move toward viewer (translateZ) and vertical parallax
            const zMove = centeredProgress * depth * 220;
            const yMove = -centeredProgress * depth * 80;
            const rotY = centeredProgress * rotSpeed;
            const rotX = -centeredProgress * (rotSpeed * 0.5);

            layer.style.transform = `translate3d(0, ${yMove}px, ${zMove}px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
          });

          // Horizontal typography movement
          if (marqueeText) {
            const xShift = (centeredProgress * -180);
            marqueeText.style.transform = `translateX(${xShift}px)`;
          }
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ==========================================================================
   4. Horizontal Scroll Track for Collections
   ========================================================================== */
function initHorizontalScrollTrack() {
  const container = document.querySelector('.horizontal-scroll-container');
  const prevBtn = document.getElementById('scroll-track-prev');
  const nextBtn = document.getElementById('scroll-track-next');

  if (!container) return;

  // Arrow button navigation
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      container.scrollBy({ left: -380, behavior: 'smooth' });
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      container.scrollBy({ left: 380, behavior: 'smooth' });
    });
  }

  // Mouse Drag to Scroll
  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener('mousedown', (e) => {
    isDown = true;
    container.classList.add('cursor-grabbing');
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener('mouseleave', () => {
    isDown = false;
    container.classList.remove('cursor-grabbing');
  });

  container.addEventListener('mouseup', () => {
    isDown = false;
    container.classList.remove('cursor-grabbing');
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.8;
    container.scrollLeft = scrollLeft - walk;
  });
}

/* ==========================================================================
   5. Floating Elements Subtle Parallax
   ========================================================================== */
function initFloatingElementsParallax() {
  const floaters = document.querySelectorAll('.parallax-float');
  if (!floaters.length) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    floaters.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-float-speed')) || 0.1;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }, { passive: true });
}
