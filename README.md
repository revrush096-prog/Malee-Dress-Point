# Malee Dress Point - Asset Replacement & Customization Guide
**Location**: P377+797, Horana 12400, Sri Lanka  
**Contact**: +94 77 750 3635  
**Google Maps**: [https://maps.app.goo.gl/DsWrZPzaoTWmGYdL8](https://maps.app.goo.gl/DsWrZPzaoTWmGYdL8)

---

## Directory Structure

```
Malee Dress Point/
├── index.html               # 3D Homepage with video hero & spatial exhibition
├── collections.html         # 6 Collections with 3D perspective cards
├── new-arrivals.html        # Filterable catalog (All, Women, Casual, Elegant, Trending) & Quick View
├── lookbook.html            # Asymmetric editorial masonry lookbook + fullscreen lightbox
├── about.html               # Brand philosophy & 3 alternating parallax pillars
├── gallery.html             # Showroom exhibition gallery with lightbox
├── contact.html             # Location, clickable tel: +94777503635, directions & inquiry form
└── assets/
    ├── css/
    │   └── style.css        # 3D perspective, custom cursor, tilt, and fashion styling
    ├── js/
    │   ├── main.js          # Navbar, mobile menu, search drawer, bag drawer, cursor
    │   ├── 3d-scroll.js     # Scroll-driven 3D depth, parallax, and horizontal scroll
    │   ├── tilt.js          # Interactive mouse-follow 3D card tilt & glare
    │   ├── lightbox.js      # Fullscreen fashion lightbox modal
    │   └── filter.js        # Catalog filtering & quick view modal
    ├── images/              # Store your custom boutique photos here
    └── videos/              # Store your custom fashion mp4 videos here
```

---

## How to Replace Photos with Your Own Store Images

The website is pre-configured with high-resolution fashion campaign photography. To replace any image with your own store photos:

1. Place your image file in `assets/images/`.
2. Open the corresponding HTML file and find the slot comment:
   - **Hero Background**: `<!-- Asset Slot: /assets/images/hero-fashion.jpg -->` in `index.html`
   - **Store Interior / Front**: `<!-- Asset Slot: /assets/images/store.jpg -->` in `index.html` and `contact.html`
   - **Collection Cards 1 to 6**: `<!-- Asset Slot: /assets/images/collection-01.jpg -->` in `index.html` and `collections.html`
   - **Lookbook 1 to 9**: `<!-- Asset Slot: /assets/images/lookbook-01.jpg -->` in `lookbook.html`
   - **Catalog Items 1 to 8**: `<!-- Asset Slot: /assets/images/catalog-01.jpg -->` in `new-arrivals.html`
   - **Gallery Images 1 to 9**: `<!-- Asset Slot: /assets/images/gallery-01.jpg -->` in `gallery.html`
3. Update the `src="..."` attribute from the CDN link to `assets/images/your-photo.jpg`.

---

## How to Replace Video Loops

1. Save your MP4 video clips into `assets/videos/`.
2. Open `index.html` and look for:
   - **Video Section 1**: `<!-- Asset Slot: /assets/videos/fashion-hero.mp4 -->`
   - **Video Section 2**: `<!-- Asset Slot: /assets/videos/fashion-story.mp4 -->`
3. Update the `<source src="..." type="video/mp4" />` with `assets/videos/your-video.mp4`.
