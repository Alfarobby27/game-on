// Hamburger Menu
const menuButton = document.querySelector(".menu");
const navMenu = document.querySelector(".navmenu");

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  menuButton.classList.toggle("openmenu");
});

// function untuk visibility transisi
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.2,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
}, observerOptions);

// menseleksi target visibility
const footer = document.querySelector(".footer");

// Observe the sections
observer.observe(footer);
