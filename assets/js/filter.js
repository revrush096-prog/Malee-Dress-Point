/**
 * MALEE DRESS POINT - NEW ARRIVALS FILTER & QUICK VIEW
 * Dynamic JavaScript category filtering with smooth animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initCatalogFilters();
  initQuickViewModal();
});

/* ==========================================================================
   1. Live Category Filtering
   ========================================================================== */
function initCatalogFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const catalogCards = document.querySelectorAll('.catalog-item');
  const countIndicator = document.getElementById('catalog-count');

  if (!filterBtns.length || !catalogCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button state
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-stone-900', 'text-white');
        b.classList.add('bg-stone-100', 'text-stone-700', 'hover:bg-stone-200');
      });
      btn.classList.add('active', 'bg-stone-900', 'text-white');
      btn.classList.remove('bg-stone-100', 'text-stone-700', 'hover:bg-stone-200');

      const filterValue = btn.getAttribute('data-filter');
      let visibleCount = 0;

      catalogCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        const tags = category.split(' ');

        if (filterValue === 'all' || tags.includes(filterValue)) {
          card.classList.remove('hidden');
          // Smooth staggered reveal
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
          }, 50);
          visibleCount++;
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95) translateY(10px)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 250);
        }
      });

      if (countIndicator) {
        countIndicator.textContent = `${visibleCount} Styles Displayed`;
      }
    });
  });
}

/* ==========================================================================
   2. Quick View Modal with Editable Placeholders
   ========================================================================== */
function initQuickViewModal() {
  const quickViewBtns = document.querySelectorAll('.quick-view-trigger');
  const modal = document.getElementById('quick-view-modal');
  if (!modal) return;

  const closeBtn = document.getElementById('close-quick-view');
  const modalImg = document.getElementById('qv-img');
  const modalTitle = document.getElementById('qv-title');
  const modalCat = document.getElementById('qv-category');
  const modalPrice = document.getElementById('qv-price');
  const modalDesc = document.getElementById('qv-desc');

  const openModal = (card) => {
    const title = card.getAttribute('data-name') || 'Curated Fashion Look';
    const cat = card.getAttribute('data-category-label') || 'New Arrival';
    const price = card.getAttribute('data-price') || 'Inquire In Store';
    const desc = card.getAttribute('data-desc') || 'A signature contemporary ensemble showcased at Malee Dress Point in Horana. Contact or visit us for current sizing, colorways, and availability.';
    const imgSrc = card.querySelector('img')?.getAttribute('src') || '';

    if (modalTitle) modalTitle.textContent = title;
    if (modalCat) modalCat.textContent = cat;
    if (modalPrice) modalPrice.textContent = price;
    if (modalDesc) modalDesc.textContent = desc;
    if (modalImg) modalImg.src = imgSrc;

    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100', 'pointer-events-auto');
    document.body.style.overflow = '';
  };

  quickViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.catalog-item');
      if (card) openModal(card);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('opacity-0')) {
      closeModal();
    }
  });
}
