const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const slide = document.querySelector('.ninja')
const image = ['favpng_caf6b57837e2efc9d4537ea018138ffe.png','favpng_aae3ab47e60ca8efa14e3733ef60d1ee.png']
let index = 0;

setInterval(() => {
    index = (index + 1) % image.length;

   slide.src = image[index];

}, 4000);
// Mobile Navigation
menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    menuBtn.textContent = navLinks.classList.contains("active")
        ? "✕"
        : "☰";
});

// Close menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.textContent = "☰";
    });
});

// Scroll Reveal Animation
const elements = document.querySelectorAll(
    ".section-heading, .about-box, .skill-card, .project-card, .contact-text"
);

elements.forEach(element => {
    element.classList.add("hidden");
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

elements.forEach(element => {
    observer.observe(element);
});
