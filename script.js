function scrollToProjects() {
    const targetSection = document.getElementById("projects");
    if (targetSection) {
        targetSection.scrollIntoView({behavior: "smooth"});
    }
}

// Load and render projects
const projectsContainer = document.getElementById("projects-container");

if (projectsContainer) {
    fetch("projects.json")
        .then(response => response.json())
        .then(projects => {
            const container = document.getElementById('projects-container');

            projects.forEach(project => {
                const link = document.createElement('a');
                link.className = 'project-card';
                link.href = project.detailPage;
                link.setAttribute('aria-label', `View details about ${project.title}`);

                link.innerHTML = `
                <img src="${project.imageSrc}" alt="${project.imageAlt}">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                `;

                container.appendChild(link);
            });
        })
        .catch(error => console.error('Error loading projects:', error));    
}

const featuredImage = document.getElementById("featured-image");
const thumbnailItems = document.querySelectorAll(".thumbnail-item");

function buildGalleryData() {
    const gallery = [];

    if (featuredImage) {
        gallery.push({
            src: featuredImage.getAttribute('data-image'),
            alt: featuredImage.getAttribute('data-alt'),
            caption: featuredImage.getAttribute('data-caption')
        });
    }

    thumbnailItems.forEach(thumbnail => {
        gallery.push({
            src: thumbnail.getAttribute('data-image'),
            alt: thumbnail.getAttribute('data-alt'),
            caption: thumbnail.getAttribute('data-caption')
        });
    });

    return gallery;
}

if (featuredImage) {
    featuredImage.addEventListener("click", () => {
        const currentSrc = featuredImage.dataset.image;
        let galleryData = buildGalleryData();
        const currentIndex = galleryData.findIndex(img => img.src === currentSrc);
        openLightboxFeatured(currentIndex);
    });
}

thumbnailItems.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
        const thumbSrc = thumbnail.dataset.image;
        const thumbAlt = thumbnail.dataset.alt;
        const thumbCaption = thumbnail.dataset.caption;

        const currentFeaturedSrc = featuredImage.dataset.image;
        const currentFeaturedAlt = featuredImage.dataset.alt;
        const currentFeaturedCaption = featuredImage.dataset.caption;

        featuredImage.dataset.image = thumbSrc;
        featuredImage.dataset.alt = thumbAlt;
        featuredImage.dataset.caption = thumbCaption;
        featuredImage.querySelector("img").src = thumbSrc;
        featuredImage.querySelector("img").alt = thumbAlt;

        thumbnail.dataset.image = currentFeaturedSrc;
        thumbnail.dataset.alt = currentFeaturedAlt;
        thumbnail.dataset.caption = currentFeaturedCaption;
        thumbnail.querySelector("img").src = currentFeaturedSrc;
        thumbnail.querySelector("img").alt = currentFeaturedAlt;

        galleryData = buildGalleryData();
    });
})

function openLightboxFeatured(index) {
    if (!lightbox || !lightboxContent) return;

    lastFocusedElement = document.activeElement;
    updateLightbox(index);

    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    lightboxContent.focus();
}

const lightbox = document.getElementById("lightbox");
const lightboxContent = document.querySelector(".lightbox-content");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");

let currentImageIndex = 0;
let lastFocusedElement = null;

let galleryData = buildGalleryData();

function updateLightbox(index) {
    const item = galleryData[index];
    if (!item) return;

    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt;
    lightboxCaption.textContent = item.caption;
    currentImageIndex = index;
}

function closeLightbox() {
    if (!lightbox) return;

    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";

    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}

function showNextImage() {
    const nextIndex = (currentImageIndex + 1) % galleryData.length;
    updateLightbox(nextIndex);
}

function showPreviousImage() {
    const prevIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
    updateLightbox(prevIndex);
}

if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
}

if (lightboxNext) {
    lightboxNext.addEventListener("click", showNextImage);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener("click", showPreviousImage);
}

if (lightbox) {
    lightbox.addEventListener("click", (event) => {
        if (event.target.matches("[data-close-lightbox='true']")) {
            closeLightbox();
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (!lightbox || lightbox.hidden) return;

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        showNextImage();
    }

    if (event.key === "ArrowLeft") {
        showPreviousImage();
    }
})