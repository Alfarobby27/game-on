// Menampilkan PS5 secara default saat halaman pertama kali dimuat
document.addEventListener("DOMContentLoaded", function () {
  showView("ps5");
});

function showView(viewId) {
  // Sembunyikan semua tampilan terlebih dahulu
  const views = document.querySelectorAll(".view");
  views.forEach((view) => {
    view.style.display = "none";
  });

  // Hapus kelas tema yang ada dan tambahkan tema baru
  const content = document.getElementById("content");
  content.classList.remove("ps5-theme", "ps4-theme", "ps3-theme");
  content.classList.add(`${viewId}-theme`);

  // Hapus kelas segitiga yang ada dan tambahkan kelas segitiga baru
  const triangles = document.querySelectorAll(".triangle");
  triangles.forEach((triangle) => {
    triangle.style.display = "none"; // Menyembunyikan segitiga yang ada
  });

  const selectedTriangle = document.getElementById(`triangle-${viewId}`);
  if (selectedTriangle) {
    selectedTriangle.style.display = "block"; // Menampilkan segitiga yang sesuai
  }

  // Tampilkan tampilan yang dipilih
  const selectedView = document.getElementById(viewId);
  selectedView.style.display = "block";
}

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

// Hamburger Menu
const menuButton = document.querySelector(".menu");
const navMenu = document.querySelector(".navmenu");

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  menuButton.classList.toggle("openmenu");
});
