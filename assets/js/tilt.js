/**
 * MALEE DRESS POINT - 3D INTERACTIVE CARD TILT ENGINE
 * Mouse-follow perspective tilt with dynamic specular sheen for fashion cards
 */

document.addEventListener('DOMContentLoaded', () => {
  const isFinePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isFinePointer || prefersReducedMotion) return;

  initCardTilt();
});

function initCardTilt() {
  const cards = document.querySelectorAll('.tilt-card');
  if (!cards.length) return;

  cards.forEach(card => {
    // Inject glare element if missing
    if (!card.querySelector('.card-glare')) {
      const glare = document.createElement('div');
      glare.className = 'card-glare';
      card.appendChild(glare);
    }

    const maxRotation = parseFloat(card.getAttribute('data-tilt-max')) || 12; // Degrees
    const perspective = 1000;

    let bounds;

    function updateBounds() {
      bounds = card.getBoundingClientRect();
    }

    card.addEventListener('mouseenter', () => {
      updateBounds();
      card.style.transition = 'none';
    });

    card.addEventListener('mousemove', (e) => {
      if (!bounds) updateBounds();

      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const xPercent = (mouseX / bounds.width) * 100;
      const yPercent = (mouseY / bounds.height) * 100;

      // Calculate rotations
      const xRot = ((mouseY / bounds.height) - 0.5) * -maxRotation;
      const yRot = ((mouseX / bounds.width) - 0.5) * maxRotation;

      card.style.transform = `perspective(${perspective}px) rotateX(${xRot.toFixed(2)}deg) rotateY(${yRot.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

      // Update glare position
      card.style.setProperty('--mouse-x', `${xPercent}%`);
      card.style.setProperty('--mouse-y', `${yPercent}%`);

      // Elevate child layers
      const midLayer = card.querySelector('.tilt-card-layer-mid');
      const frontLayer = card.querySelector('.tilt-card-layer-front');
      if (midLayer) midLayer.style.transform = 'translateZ(24px)';
      if (frontLayer) frontLayer.style.transform = 'translateZ(42px)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease';
      card.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

      const midLayer = card.querySelector('.tilt-card-layer-mid');
      const frontLayer = card.querySelector('.tilt-card-layer-front');
      if (midLayer) midLayer.style.transform = 'translateZ(0px)';
      if (frontLayer) frontLayer.style.transform = 'translateZ(0px)';
    });
  });
}
