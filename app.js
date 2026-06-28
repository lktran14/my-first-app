/**
 * Tran Family Album — Main Application Logic
 * Hash-based routing: #/ (album list), #/album/:id (photo grid)
 * In-memory state only — no localStorage
 */

/* -------------------------------------------------------------------------- */
/* Sample album data (replace picsum URLs with local paths later)             */
/* -------------------------------------------------------------------------- */

const albums = [
  {
    id: "family",
    name: "Beach Holidays",
    cover: "./photos/family/P1000200.png",
    photos: [
      { src: "./photos/family/P1000200.png", caption: "Swimming, September 1992" },
      { src: "./photos/family/P1000202.png", caption: "Balcony, June 2002" },
      { src: "./photos/family/P1000201.png", caption: "Three generations, June 2002" },
      { src: "./photos/family/P1000199.png", caption: "" },
      { src: "./photos/family/P1000205.png", caption: "Blackpool beach" },
    ],
  },
  {
    id: "garden",
    name: "Garden",
    cover: "https://picsum.photos/seed/garden/600/400",
    photos: [
      { src: "https://picsum.photos/seed/gard1/800/600", caption: "Spring blooms" },
      { src: "https://picsum.photos/seed/gard2/800/600", caption: "" },
      { src: "https://picsum.photos/seed/gard3/800/600", caption: "Roses" },
      { src: "https://picsum.photos/seed/gard4/800/600", caption: "" },
    ],
  },
  {
    id: "holidays",
    name: "Holidays",
    cover: "https://picsum.photos/seed/holiday/600/400",
    photos: [
      { src: "https://picsum.photos/seed/hol1/800/600", caption: "Seaside 2023" },
      { src: "https://picsum.photos/seed/hol2/800/600", caption: "" },
      { src: "https://picsum.photos/seed/hol3/800/600", caption: "Lake District" },
      { src: "https://picsum.photos/seed/hol4/800/600", caption: "Edinburgh trip" },
      { src: "https://picsum.photos/seed/hol5/800/600", caption: "" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* In-memory application state                                                */
/* -------------------------------------------------------------------------- */

const state = {
  currentAlbumId: null,
  lightboxOpen: false,
  lightboxPhotoIndex: 0,
};

/* -------------------------------------------------------------------------- */
/* DOM references                                                             */
/* -------------------------------------------------------------------------- */

const viewAlbumList = document.getElementById("view-album-list");
const viewPhotoGrid = document.getElementById("view-photo-grid");
const albumCardsContainer = document.getElementById("album-cards");
const photoGridContainer = document.getElementById("photo-grid");
const photoGridTitle = document.getElementById("photo-grid-title");
const photoGridSubtitle = document.getElementById("photo-grid-subtitle");
const backButton = document.getElementById("back-button");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Build descriptive alt text for a photo.
 * Uses caption when available, otherwise falls back to album name.
 */
function getPhotoAlt(photo, albumName) {
  if (photo.caption) {
    return photo.caption;
  }
  return `${albumName} photo`;
}

/**
 * Find an album by its id.
 */
function getAlbumById(id) {
  return albums.find((album) => album.id === id) || null;
}

/**
 * Return the currently active album object, or null.
 */
function getCurrentAlbum() {
  if (!state.currentAlbumId) {
    return null;
  }
  return getAlbumById(state.currentAlbumId);
}

/* -------------------------------------------------------------------------- */
/* Rendering                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Return up to three photo sources for the album card collage.
 */
function getCollageSources(album) {
  const sources = album.photos.slice(0, 3).map((photo) => photo.src);
  while (sources.length < 3) {
    sources.push(album.cover);
  }
  return sources;
}

/**
 * Render all album cards on the home view.
 */
function renderAlbumList() {
  albumCardsContainer.innerHTML = "";

  albums.forEach((album) => {
    const count = album.photos.length;
    const countLabel = count === 1 ? "1 Photo" : `${count} Photos`;
    const [mainSrc, topSrc, bottomSrc] = getCollageSources(album);
    const avatarSources = getCollageSources(album).slice(0, 3);

    const card = document.createElement("button");
    card.className = "album-card";
    card.type = "button";
    card.setAttribute("aria-label", `Open ${album.name} album, ${countLabel}`);

    card.innerHTML = `
      <div class="album-card-collage">
        <div class="album-card-collage-main">
          <img
            src="${mainSrc}"
            alt=""
            width="600"
            height="400"
            loading="lazy"
            decoding="async"
          />
          <span class="album-card-expand" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M8 3H3v5M16 3h5v5M16 21h5v-5M8 21H3v-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
        <div class="album-card-collage-stack">
          <img
            src="${topSrc}"
            alt=""
            width="300"
            height="200"
            loading="lazy"
            decoding="async"
          />
          <img
            src="${bottomSrc}"
            alt=""
            width="300"
            height="200"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <div class="album-card-info">
        <h2 class="album-card-name">${album.name}</h2>
        <span class="album-card-chevron" aria-hidden="true">›</span>
        <p class="album-card-count">${countLabel}</p>
        <div class="album-card-avatars" aria-hidden="true">
          ${avatarSources
            .map(
              (src) =>
                `<img class="album-card-avatar" src="${src}" alt="" width="32" height="32" loading="lazy" decoding="async" />`
            )
            .join("")}
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      navigateToAlbum(album.id);
    });

    albumCardsContainer.appendChild(card);
  });
}

/**
 * Render the photo grid for the current album.
 */
function renderPhotoGrid() {
  const album = getCurrentAlbum();
  if (!album) {
    return;
  }

  photoGridTitle.textContent = album.name;
  const count = album.photos.length;
  photoGridSubtitle.textContent = count === 1 ? "1 Photo" : `${count} Photos`;
  photoGridContainer.innerHTML = "";

  const aspectPatterns = ["tall", "wide", "square", "wide", "tall", "square"];

  album.photos.forEach((photo, index) => {
    const aspect = aspectPatterns[index % aspectPatterns.length];
    const tile = document.createElement("button");
    tile.className = `photo-tile photo-tile--${aspect}`;
    tile.type = "button";
    tile.setAttribute(
      "aria-label",
      `View photo ${index + 1} of ${album.photos.length}${photo.caption ? `: ${photo.caption}` : ""}`
    );

    const alt = getPhotoAlt(photo, album.name);

    tile.innerHTML = `
      <img
        src="${photo.src}"
        alt="${alt}"
        width="800"
        height="600"
        loading="lazy"
        decoding="async"
      />
    `;

    tile.addEventListener("click", () => {
      openLightbox(index);
    });

    photoGridContainer.appendChild(tile);
  });
}

/**
 * Update lightbox image and caption for the current photo index.
 */
function updateLightboxContent() {
  const album = getCurrentAlbum();
  if (!album) {
    return;
  }

  const photo = album.photos[state.lightboxPhotoIndex];
  if (!photo) {
    return;
  }

  lightboxImage.src = photo.src;
  lightboxImage.alt = getPhotoAlt(photo, album.name);
  lightboxCaption.textContent = photo.caption || "";
}

/* -------------------------------------------------------------------------- */
/* Navigation & routing                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Show a specific view and hide the other.
 */
function showView(viewName) {
  if (viewName === "album-list") {
    viewAlbumList.classList.add("view--active");
    viewPhotoGrid.classList.remove("view--active");
  } else if (viewName === "photo-grid") {
    viewAlbumList.classList.remove("view--active");
    viewPhotoGrid.classList.add("view--active");
  }
}

/**
 * Navigate to an album's photo grid.
 */
function navigateToAlbum(albumId) {
  const album = getAlbumById(albumId);
  if (!album) {
    return;
  }

  state.currentAlbumId = albumId;
  window.location.hash = `#/album/${albumId}`;
  renderPhotoGrid();
  showView("photo-grid");
}

/**
 * Navigate back to the album list.
 */
function navigateToHome() {
  closeLightbox();
  state.currentAlbumId = null;
  window.location.hash = "#/";
  showView("album-list");
}

/**
 * Parse the URL hash and render the matching view.
 */
function handleHashChange() {
  const hash = window.location.hash || "#/";
  const albumMatch = hash.match(/^#\/album\/([^/]+)$/);

  if (albumMatch) {
    const albumId = albumMatch[1];
    const album = getAlbumById(albumId);

    if (album) {
      state.currentAlbumId = albumId;
      renderPhotoGrid();
      showView("photo-grid");
      return;
    }
  }

  state.currentAlbumId = null;
  showView("album-list");
}

/* -------------------------------------------------------------------------- */
/* Lightbox                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Open the lightbox at a given photo index.
 */
function openLightbox(photoIndex) {
  const album = getCurrentAlbum();
  if (!album) {
    return;
  }

  state.lightboxOpen = true;
  state.lightboxPhotoIndex = photoIndex;
  updateLightboxContent();

  lightbox.classList.add("lightbox--open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

/**
 * Close the lightbox.
 */
function closeLightbox() {
  state.lightboxOpen = false;
  lightbox.classList.remove("lightbox--open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/**
 * Go to the previous photo in the lightbox (wraps around).
 */
function lightboxPrevPhoto() {
  const album = getCurrentAlbum();
  if (!album) {
    return;
  }

  state.lightboxPhotoIndex =
    (state.lightboxPhotoIndex - 1 + album.photos.length) % album.photos.length;
  updateLightboxContent();
}

/**
 * Go to the next photo in the lightbox (wraps around).
 */
function lightboxNextPhoto() {
  const album = getCurrentAlbum();
  if (!album) {
    return;
  }

  state.lightboxPhotoIndex =
    (state.lightboxPhotoIndex + 1) % album.photos.length;
  updateLightboxContent();
}

/* -------------------------------------------------------------------------- */
/* Touch swipe handling for lightbox                                          */
/* -------------------------------------------------------------------------- */

let touchStartX = 0;
let touchStartY = 0;

function handleTouchStart(event) {
  if (!state.lightboxOpen || event.touches.length !== 1) {
    return;
  }
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
}

function handleTouchEnd(event) {
  if (!state.lightboxOpen || event.changedTouches.length !== 1) {
    return;
  }

  const deltaX = event.changedTouches[0].clientX - touchStartX;
  const deltaY = event.changedTouches[0].clientY - touchStartY;

  // Ignore mostly vertical swipes
  if (Math.abs(deltaX) <= 50 || Math.abs(deltaX) < Math.abs(deltaY)) {
    return;
  }

  if (deltaX > 0) {
    lightboxPrevPhoto();
  } else {
    lightboxNextPhoto();
  }
}

/* -------------------------------------------------------------------------- */
/* Event listeners                                                            */
/* -------------------------------------------------------------------------- */

function bindEvents() {
  backButton.addEventListener("click", navigateToHome);
  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", lightboxPrevPhoto);
  lightboxNext.addEventListener("click", lightboxNextPhoto);

  lightbox.addEventListener("touchstart", handleTouchStart, { passive: true });
  lightbox.addEventListener("touchend", handleTouchEnd, { passive: true });

  // Close lightbox when tapping the dark backdrop (not the image or buttons)
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  window.addEventListener("hashchange", handleHashChange);
}

/* -------------------------------------------------------------------------- */
/* Initialise                                                                 */
/* -------------------------------------------------------------------------- */

function init() {
  renderAlbumList();
  bindEvents();
  handleHashChange();
}

init();
