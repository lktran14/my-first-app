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
    cover: "./photos/family/P1000202.png",
    photos: [
      { src: "./photos/family/P1000202.png", caption: "Balcony, June 2002" },
      { src: "./photos/family/P1000200.png", caption: "Swimming, September 1992" },
      { src: "./photos/family/P1000201.png", caption: "Three generations, June 2002" },
      { src: "./photos/family/P1000199.png", caption: "" },
      { src: "./photos/family/P1000205.png", caption: "Blackpool beach" },
    ],
    sections: [
      {
        heading: "Tunisia 2006",
        photos: [
          { src: "./photos/family/P1000206.png", caption: "Snorkelling" },
          { src: "./photos/family/P1000207.png", caption: "Me & Mum at beach" },
          { src: "./photos/family/P1000208.png", caption: "Ba Ngoai & Ong Ngoai at front of hotel" },
          { src: "./photos/family/P1000209.png", caption: "Us at front of hotel" },
          { src: "./photos/family/P1000210.png", caption: "Me, Mum & Dad at harbour" },
          { src: "./photos/family/P1000211.png", caption: "Everyone in Mediterranean restaurant" },
          { src: "./photos/family/P1000212.png", caption: "Jet ski" },
          { src: "./photos/family/P1000213.png", caption: "Parasailing" },
        ],
      },
    ],
  },
  {
    id: "garden",
    name: "Engagement and Wedding",
    cover: "./photos/wedding/P1090338.png",
    listPreviewMain: "./photos/wedding/P1090338.png",
    photos: [
      { src: "./photos/wedding/P1090335.png", caption: "", objectPosition: "38% center" },
      { src: "./photos/wedding/P1090361.png", caption: "" },
      { src: "./photos/wedding/P1090318.png", caption: "" },
      { src: "./photos/wedding/P1090338.png", caption: "" },
      { src: "./photos/wedding/P1090340.png", caption: "" },
      { src: "./photos/wedding/P1090342.png", caption: "" },
      { src: "./photos/wedding/P1090345.png", caption: "" },
      { src: "./photos/wedding/P1090350.png", caption: "", objectPosition: "center top" },
      { src: "./photos/wedding/P1080796.png", caption: "" },
      { src: "./photos/wedding/P1080797.png", caption: "" },
      { src: "./photos/wedding/P1080801.png", caption: "" },
      { src: "./photos/wedding/P1080803.png", caption: "" },
      { src: "./photos/wedding/P1080805.png", caption: "" },
      { src: "./photos/wedding/P1080806.png", caption: "" },
      { src: "./photos/wedding/P1080819.png", caption: "" },
      { src: "./photos/wedding/P1080823.png", caption: "" },
      { src: "./photos/wedding/P1080826.png", caption: "" },
      { src: "./photos/wedding/P1080829.png", caption: "", objectPosition: "center top" },
      { src: "./photos/wedding/P1080835.png", caption: "" },
      { src: "./photos/wedding/P1080814.png", caption: "" },
      { src: "./photos/wedding/P1080841.png", caption: "" },
      { src: "./photos/wedding/P1080842.png", caption: "" },
      { src: "./photos/wedding/P1080831.png", caption: "" },
      { src: "./photos/wedding/P1080843.png", caption: "" },
      { src: "./photos/wedding/P1080852.png", caption: "" },
      { src: "./photos/wedding/P1080860.png", caption: "" },
    ],
  },
  {
    id: "lien-baby",
    name: "Lien baby photos",
    cover: "./photos/lien-baby/P1090321.png",
    photos: [
      { src: "./photos/lien-baby/P1090321.png", caption: "" },
      { src: "./photos/lien-baby/P1090322.png", caption: "" },
      { src: "./photos/lien-baby/P1090323.png", caption: "" },
      { src: "./photos/lien-baby/P1090324.png", caption: "" },
      { src: "./photos/lien-baby/P1090327.png", caption: "" },
      { src: "./photos/lien-baby/P1090332.png", caption: "" },
      { src: "./photos/lien-baby/P1090352.png", caption: "" },
      { src: "./photos/lien-baby/P1090356.png", caption: "" },
      { src: "./photos/lien-baby/P1090358.png", caption: "" },
      { src: "./photos/lien-baby/P1090360.png", caption: "" },
      { src: "./photos/lien-baby/P1090363.png", caption: "" },
      { src: "./photos/lien-baby/P1090373.png", caption: "" },
      { src: "./photos/lien-baby/P1090376.png", caption: "" },
      { src: "./photos/lien-baby/P1090377.png", caption: "" },
      { src: "./photos/lien-baby/P1090378.png", caption: "" },
      { src: "./photos/lien-baby/P1090379.png", caption: "" },
      { src: "./photos/lien-baby/P1090380.png", caption: "" },
      { src: "./photos/lien-baby/P1090383.png", caption: "" },
      { src: "./photos/lien-baby/P1090387.png", caption: "" },
      { src: "./photos/lien-baby/P1090393.png", caption: "" },
      { src: "./photos/lien-baby/P1090394.png", caption: "" },
      { src: "./photos/lien-baby/P1090397.png", caption: "" },
      { src: "./photos/lien-baby/P1090398.png", caption: "" },
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

/** Bumps on each grid render so stale async renders can bail out. */
let photoGridRenderId = 0;

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

/**
 * Find photo metadata by source path across all albums.
 */
function getPhotoBySrc(src) {
  for (const album of albums) {
    const photo = getAllPhotos(album).find((entry) => entry.src === src);
    if (photo) {
      return photo;
    }
  }
  return null;
}

/**
 * Apply optional crop focus for grid/collage thumbnails.
 */
function applyPhotoObjectPosition(img, photoOrSrc) {
  const photo =
    typeof photoOrSrc === "string" ? getPhotoBySrc(photoOrSrc) : photoOrSrc;

  if (photo?.objectPosition) {
    img.style.objectPosition = photo.objectPosition;
  }
}

/**
 * Return all photos in an album, including those in optional sections.
 */
function getAllPhotos(album) {
  const photos = [...album.photos];
  if (album.sections) {
    album.sections.forEach((section) => {
      photos.push(...section.photos);
    });
  }
  return photos;
}

/* -------------------------------------------------------------------------- */
/* Rendering                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Return up to three photo sources for the album card collage.
 */
function getCollageSources(album) {
  const photos = album.photos.map((photo) => photo.src);
  const main = album.listPreviewMain || photos[0] || album.cover;
  const stack = photos.filter((src) => src !== main).slice(0, 2);

  while (stack.length < 2) {
    stack.push(album.cover);
  }

  return [main, stack[0], stack[1]];
}

/**
 * Render all album cards on the home view.
 */
function renderAlbumList() {
  albumCardsContainer.innerHTML = "";

  albums.forEach((album) => {
    const count = getAllPhotos(album).length;
    const countLabel = count === 1 ? "1 Photo" : `${count} Photos`;
    const [mainSrc, topSrc, bottomSrc] = getCollageSources(album);

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
      </div>
    `;

    card.querySelectorAll(".album-card-collage img").forEach((img, i) => {
      applyPhotoObjectPosition(img, [mainSrc, topSrc, bottomSrc][i]);
    });

    card.addEventListener("click", () => {
      navigateToAlbum(album.id);
    });

    albumCardsContainer.appendChild(card);
  });
}

/**
 * Repeating row layouts — large/small combinations for visual variety.
 * Each entry: { layout, count } photos consumed per row.
 */
const GRID_ROW_PATTERNS = [
  { layout: "large-stack-left", count: 3 },
  { layout: "tall-large", count: 2 },
  { layout: "wide-tall", count: 2 },
  { layout: "stack-large-right", count: 3 },
];

const GRID_TILE_SLOTS = {
  "large-stack-left": ["photo-tile--large", "photo-tile--small", "photo-tile--small"],
  "tall-large": ["photo-tile--tall", "photo-tile--wide"],
  "wide-tall": ["photo-tile--wide", "photo-tile--tall"],
  "stack-large-right": ["photo-tile--small", "photo-tile--small", "photo-tile--large"],
  pair: ["photo-tile--half", "photo-tile--half"],
  single: ["photo-tile--full"],
};

const PORTRAIT_SLOT_CLASSES = new Set(["photo-tile--tall", "photo-tile--large"]);

/** @type {Map<string, "portrait" | "landscape">} */
const orientationCache = new Map();

function isPortraitSlot(slotClass) {
  return PORTRAIT_SLOT_CLASSES.has(slotClass);
}

function isPhotoPortrait(photo) {
  return orientationCache.get(photo.src) === "portrait";
}

function loadPhotoOrientation(src) {
  if (orientationCache.has(src)) {
    return Promise.resolve(orientationCache.get(src));
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      const orientation =
        img.naturalHeight > img.naturalWidth ? "portrait" : "landscape";
      orientationCache.set(src, orientation);
      resolve(orientation);
    };
    img.onerror = () => {
      orientationCache.set(src, "landscape");
      resolve("landscape");
    };
    img.src = src;
  });
}

function preloadOrientations(photos) {
  return Promise.all(photos.map((photo) => loadPhotoOrientation(photo.src)));
}

/**
 * Match photos to grid slots so portrait images land in tall/large slots.
 * Returns slotIndex → photoIndex within the row.
 */
function assignPhotosToSlots(photos, slotClasses) {
  const photoEntries = photos.map((photo, photoIndex) => ({
    photoIndex,
    portrait: isPhotoPortrait(photo),
  }));

  const slotEntries = slotClasses.map((slotClass, slotIndex) => ({
    slotIndex,
    portrait: isPortraitSlot(slotClass),
  }));

  const assignment = new Array(photos.length).fill(null);
  const usedPhotoIndices = new Set();

  const portraitPhotos = photoEntries.filter((entry) => entry.portrait);
  const portraitSlots = slotEntries.filter((slot) => slot.portrait);

  for (let i = 0; i < Math.min(portraitPhotos.length, portraitSlots.length); i++) {
    assignment[portraitSlots[i].slotIndex] = portraitPhotos[i].photoIndex;
    usedPhotoIndices.add(portraitPhotos[i].photoIndex);
  }

  const remainingPhotos = photoEntries.filter(
    (entry) => !usedPhotoIndices.has(entry.photoIndex)
  );
  const remainingSlots = slotEntries.filter((slot) => assignment[slot.slotIndex] === null);

  remainingSlots.forEach((slot, i) => {
    assignment[slot.slotIndex] = remainingPhotos[i].photoIndex;
  });

  return assignment;
}

/**
 * Append photos to the grid using alternating row layouts.
 * Returns the next photo index after rendering.
 */
function renderPhotoBatch(container, photos, startIndex, album, totalCount) {
  let index = startIndex;
  let photoIdx = 0;
  let patternIndex = 0;

  while (photoIdx < photos.length) {
    const pattern = GRID_ROW_PATTERNS[patternIndex % GRID_ROW_PATTERNS.length];
    const remaining = photos.length - photoIdx;

    if (remaining >= pattern.count) {
      const rowPhotos = photos.slice(photoIdx, photoIdx + pattern.count);
      container.appendChild(
        createPhotoGridRow(pattern.layout, rowPhotos, index, album, totalCount)
      );
      index += pattern.count;
      photoIdx += pattern.count;
      patternIndex += 1;
    } else {
      const rowPhotos = photos.slice(photoIdx);
      const layout = rowPhotos.length === 1 ? "single" : "pair";
      container.appendChild(
        createPhotoGridRow(layout, rowPhotos, index, album, totalCount)
      );
      index += rowPhotos.length;
      photoIdx += rowPhotos.length;
    }
  }

  return index;
}

/**
 * Build one grid row with layout-specific tile placement.
 */
function createPhotoGridRow(layout, photos, startIndex, album, totalCount) {
  const row = document.createElement("div");
  row.className = `photo-grid-row photo-grid-row--${layout}`;

  const slotClasses = GRID_TILE_SLOTS[layout] || GRID_TILE_SLOTS.single;
  const assignment = assignPhotosToSlots(photos, slotClasses);

  slotClasses.forEach((slotClass, slotIndex) => {
    const photoIndexInRow = assignment[slotIndex];
    const photo = photos[photoIndexInRow];
    const tile = createPhotoTile(photo, startIndex + photoIndexInRow, album, totalCount);
    tile.classList.add(slotClass || "photo-tile--full");
    row.appendChild(tile);
  });

  return row;
}

/**
 * Create a photo tile button for the grid.
 */
function createPhotoTile(photo, index, album, totalCount) {
  const tile = document.createElement("button");
  tile.className = "photo-tile";
  tile.type = "button";
  tile.setAttribute(
    "aria-label",
    `View photo ${index + 1} of ${totalCount}${photo.caption ? `: ${photo.caption}` : ""}`
  );

  const alt = getPhotoAlt(photo, album.name);
  const img = document.createElement("img");

  img.src = photo.src;
  img.alt = alt;
  img.loading = "lazy";
  img.decoding = "async";
  applyPhotoObjectPosition(img, photo);
  tile.appendChild(img);

  tile.addEventListener("click", () => {
    openLightbox(index);
  });

  return tile;
}

/**
 * Render the photo grid for the current album.
 */
async function renderPhotoGrid() {
  const album = getCurrentAlbum();
  if (!album) {
    return;
  }

  const renderId = ++photoGridRenderId;
  const albumId = album.id;

  photoGridTitle.textContent = album.name;
  const allPhotos = getAllPhotos(album);
  const count = allPhotos.length;
  photoGridSubtitle.textContent = count === 1 ? "1 Photo" : `${count} Photos`;
  photoGridContainer.innerHTML = "";

  await preloadOrientations(allPhotos);

  if (renderId !== photoGridRenderId || getCurrentAlbum()?.id !== albumId) {
    return;
  }

  let photoIndex = renderPhotoBatch(
    photoGridContainer,
    album.photos,
    0,
    album,
    count
  );

  if (album.sections) {
    album.sections.forEach((section) => {
      if (section.heading) {
        const heading = document.createElement("h3");
        heading.className = "photo-grid-section-heading";
        heading.textContent = section.heading;
        photoGridContainer.appendChild(heading);
      }

      photoIndex = renderPhotoBatch(
        photoGridContainer,
        section.photos,
        photoIndex,
        album,
        count
      );
    });
  }
}

/**
 * Update lightbox image for the current photo index.
 */
function updateLightboxContent() {
  const album = getCurrentAlbum();
  if (!album) {
    return;
  }

  const allPhotos = getAllPhotos(album);
  const photo = allPhotos[state.lightboxPhotoIndex];
  if (!photo) {
    return;
  }

  lightboxImage.src = photo.src;
  lightboxImage.alt = getPhotoAlt(photo, album.name);
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

  window.location.hash = `#/album/${albumId}`;
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

  const allPhotos = getAllPhotos(album);
  state.lightboxPhotoIndex =
    (state.lightboxPhotoIndex - 1 + allPhotos.length) % allPhotos.length;
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

  const allPhotos = getAllPhotos(album);
  state.lightboxPhotoIndex =
    (state.lightboxPhotoIndex + 1) % allPhotos.length;
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
