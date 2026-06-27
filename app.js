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
    name: "Family",
    cover: "https://picsum.photos/seed/family/600/400",
    photos: [
      { src: "https://picsum.photos/seed/fam1/800/600", caption: "Christmas 2024" },
      { src: "https://picsum.photos/seed/fam2/800/600", caption: "Summer BBQ" },
      { src: "https://picsum.photos/seed/fam3/800/600", caption: "" },
      { src: "https://picsum.photos/seed/fam4/800/600", caption: "Birthday party" },
      { src: "https://picsum.photos/seed/fam5/800/600", caption: "" },
      { src: "https://picsum.photos/seed/fam6/800/600", caption: "New Year's Eve" },
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
 * Render all album cards on the home view.
 */
function renderAlbumList() {
  albumCardsContainer.innerHTML = "";

  albums.forEach((album) => {
    const count = album.photos.length;
    const countLabel = count === 1 ? "1 Photo" : `${count} Photos`;

    const card = document.createElement("button");
    card.className = "album-card";
    card.type = "button";
    card.setAttribute("aria-label", `Open ${album.name} album, ${countLabel}`);

    card.innerHTML = `
      <img
        class="album-card-cover"
        src="${album.cover}"
        alt="${album.name} album cover"
        width="600"
        height="400"
        loading="lazy"
        decoding="async"
      />
      <div class="album-card-info">
        <h2 class="album-card-name">${album.name}</h2>
        <p class="album-card-count">${countLabel}</p>
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

  album.photos.forEach((photo, index) => {
    const tile = document.createElement("button");
    tile.className = "photo-tile";
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
