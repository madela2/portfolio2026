// Scroll to top button
let topbutton = document.getElementById("topBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
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
        targetSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}

function scrollToAboutMe() {
    const targetSection = document.getElementById("about-me");
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}

// Menu
const menuToggle = document.querySelector(".menu-toggle");
const sideMenu = document.querySelector(".side-menu");
const overlay = document.querySelector(".overlay");
const menuLinks = document.querySelectorAll(".side-menu a")

menuToggle.addEventListener("click", () => {
    sideMenu.classList.toggle("open");
    overlay.classList.toggle("show");

    const isOpen = sideMenu.classList.contains("open");
    menuToggle.setAttribute("aria-expanded", isOpen)
});

overlay.addEventListener("click", () => {
    sideMenu.classList.remove("open");
    overlay.classList.remove("show");
    menuToggle.setAttribute("aria-expanded", "false");
});

menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        sideMenu.classList.remove("open");
        overlay.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", false);
    });
});