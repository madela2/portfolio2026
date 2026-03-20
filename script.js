// Scroll to top button
let topbutton = document.getElementById("topBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { 
    scrollFunction() 
};

function scrollFunction() {
    if (!topbutton) return;

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topbutton.style.display = "block";
    } else {
        topbutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function scrollToProjects() {
    const targetSection = document.getElementById("projects");
    if (targetSection) {
        targetSection.scrollIntoView({behavior: "smooth"});
    }
}

function scrollToAboutMe() {
    const targetSection = document.getElementById("about-me");
    if (targetSection) {
        targetSection.scrollIntoView({behavior: "smooth"});
    }
}

// Menu
const menuToggle = document.querySelector(".menu-toggle");
const sideMenu = document.querySelector(".side-menu");
const overlay = document.querySelector(".overlay");
const menuLinks = document.querySelectorAll(".side-menu a")

if (menuToggle && sideMenu && overlay) {
    menuToggle.addEventListener("click", () => {
        sideMenu.classList.toggle("open");
        overlay.classList.toggle("show");

        const isOpen = sideMenu.classList.contains("open");
        menuToggle.setAttribute("aria-expanded", isOpen);
    });

    overlay.addEventListener("click", () => {
        sideMenu.classList.remove("open");
        overlay.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", false);
    });

    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            sideMenu.classList.remove("open");
            overlay.classList.remove("show");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
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

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxContent = document.querySelector(".lightbox-content");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");

let currentImageIndex = 0;
let lastFocusedElement = null;

const galleryData = Array.from(galleryItems).map((item) => ({
    src: item.dataset.image,
    alt: item.dataset.alt,
    caption: item.dataset.caption
}));

function updateLightbox(index) {
    const item = galleryData[index];
    if (!item) return;

    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt;
    lightboxCaption.textContent = item.caption;
    currentImageIndex = index;
}

function openLightbox(index) {
    if (!lightbox || !lightboxContent) return;

    lastFocusedElement = document.activeElement;
    updateLightbox(index);

    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    lightboxContent.focus();
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

galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
});

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