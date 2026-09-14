/**
 * MALEE DRESS POINT - GLOBAL SCRIPTS
 * Location: Horana, Sri Lanka
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initCustomCursor();
  initSearchDrawer();
  initCuratedBagDrawer();
  initScrollReveals();
});

/* ==========================================================================
   1. Dynamic Transparent / Blurred Navbar
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('main-nav');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('glass-nav', 'py-3', 'shadow-sm');
      navbar.classList.remove('glass-nav-transparent', 'py-6');
    } else {
      navbar.classList.remove('glass-nav', 'py-3', 'shadow-sm');
      navbar.classList.add('glass-nav-transparent', 'py-6');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/* ==========================================================================
   2. Fullscreen Animated Mobile Menu
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('close-mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu-overlay');
  const menuLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  const openMenu = () => {
    mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
    mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileMenu.classList.add('opacity-0', 'pointer-events-none');
    mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('opacity-0')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   3. Desktop Fashion Custom Cursor
   ========================================================================== */
function initCustomCursor() {
  const isFinePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isFinePointer || prefersReducedMotion) return;

  document.body.classList.add('has-custom-cursor');

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';

  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;

    if (!isVisible) {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      isVisible = true;
    }
  });

  window.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget && !e.toElement) {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      isVisible = false;
    }
  });

  // Smooth lerp for ring follower
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Dynamic Cursor States on interactive elements
  function attachCursorListeners() {
    const clickables = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
    });

    const viewables = document.querySelectorAll('[data-cursor="view"], .lightbox-trigger, .collection-card');
    viewables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.classList.add('cursor-view');
        dot.style.opacity = '0';
      });
      el.addEventListener('mouseleave', () => {
        ring.classList.remove('cursor-view');
        dot.style.opacity = '1';
      });
    });

    const draggableTracks = document.querySelectorAll('[data-cursor="drag"], .horizontal-scroll-container');
    draggableTracks.forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.classList.add('cursor-drag');
        dot.style.opacity = '0';
      });
      el.addEventListener('mouseleave', () => {
        ring.classList.remove('cursor-drag');
        dot.style.opacity = '1';
      });
    });
  }

  attachCursorListeners();
  window.addEventListener('cursor-refresh', attachCursorListeners);
}

/* ==========================================================================
   4. Search Modal Drawer
   ========================================================================== */
function initSearchDrawer() {
  const searchBtn = document.getElementById('search-btn');
  const searchDrawer = document.getElementById('search-drawer');
  const closeSearchBtn = document.getElementById('close-search-btn');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  if (!searchBtn || !searchDrawer) return;

  const sampleSearchData = [
    { title: "New Arrivals", category: "Latest In Store", url: "new-arrivals.html" },
    { title: "Women's Fashion", category: "Collections", url: "collections.html" },
    { title: "Casual Styles", category: "Collections", url: "collections.html" },
    { title: "Elegant Looks", category: "Collections", url: "collections.html" },
    { title: "Everyday Essentials", category: "Collections", url: "collections.html" },
    { title: "The Lookbook", category: "Editorial Inspiration", url: "lookbook.html" },
    { title: "Gallery Exhibition", category: "Showroom & Lifestyle", url: "gallery.html" },
    { title: "Store Location & Directions", category: "Horana Store", url: "contact.html" }
  ];

  const openDrawer = () => {
    searchDrawer.classList.remove('opacity-0', 'pointer-events-none');
    searchDrawer.classList.add('opacity-100', 'pointer-events-auto');
    if (searchInput) {
      setTimeout(() => searchInput.focus(), 100);
    }
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    searchDrawer.classList.add('opacity-0', 'pointer-events-none');
    searchDrawer.classList.remove('opacity-100', 'pointer-events-auto');
    document.body.style.overflow = '';
  };

  searchBtn.addEventListener('click', openDrawer);
  if (closeSearchBtn) closeSearchBtn.addEventListener('click', closeDrawer);

  if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (!query) {
        searchResults.innerHTML = `<p class="text-xs tracking-widest uppercase text-stone-400">Type above to explore collections, lookbook, and store sections.</p>`;
        return;
      }
      const matches = sampleSearchData.filter(item => 
        item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
      );

      if (matches.length === 0) {
        searchResults.innerHTML = `<p class="text-sm text-stone-500 italic py-4">No direct sections found matching "${query}". Browse our <a href="collections.html" class="underline text-stone-800">Collections</a>.</p>`;
      } else {
        searchResults.innerHTML = matches.map(item => `
          <a href="${item.url}" class="group flex items-center justify-between p-3.5 border-b border-stone-200 hover:bg-stone-50 transition-colors">
            <div>
              <p class="font-serif text-base text-stone-900 group-hover:text-amber-700 transition-colors">${item.title}</p>
              <span class="text-xs uppercase tracking-wider text-stone-400">${item.category}</span>
            </div>
            <span class="text-xs tracking-widest text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all">EXPLORE &rarr;</span>
          </a>
        `).join('');
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !searchDrawer.classList.contains('opacity-0')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   5. Curated Bag / Look Drawer
   ========================================================================== */
function initCuratedBagDrawer() {
  const bagBtn = document.getElementById('bag-btn');
  const bagDrawer = document.getElementById('bag-drawer');
  const closeBagBtn = document.getElementById('close-bag-btn');

  if (!bagBtn || !bagDrawer) return;

  const openBag = () => {
    bagDrawer.classList.remove('opacity-0', 'pointer-events-none');
    bagDrawer.classList.add('opacity-100', 'pointer-events-auto');
    document.body.style.overflow = 'hidden';
  };

  const closeBag = () => {
    bagDrawer.classList.add('opacity-0', 'pointer-events-none');
    bagDrawer.classList.remove('opacity-100', 'pointer-events-auto');
    document.body.style.overflow = '';
  };

  bagBtn.addEventListener('click', openBag);
  if (closeBagBtn) closeBagBtn.addEventListener('click', closeBag);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !bagDrawer.classList.contains('opacity-0')) {
      closeBag();
    }
  });
}

/* ==========================================================================
   6. Scroll Reveal Observer
   ========================================================================== */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-12');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => {
    el.classList.add('transition-all', 'duration-1000', 'ease-out', 'opacity-0', 'translate-y-12');
    observer.observe(el);
  });
}
