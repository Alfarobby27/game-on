document.addEventListener("DOMContentLoaded", function () {
  const banners = document.querySelectorAll(".banner-image");
  let currentIndex = 0;

  function changeBanner() {
    // Menghapus kelas 'active' dari gambar saat ini
    banners[currentIndex].classList.remove("active");

    // Menentukan banner berikutnya
    currentIndex = (currentIndex + 1) % banners.length;

    // Menambahkan kelas 'active' ke banner yang baru
    banners[currentIndex].classList.add("active");
  }

  // Mulai dengan menampilkan banner pertama
  banners[0].classList.add("active");

  // Ubah banner setiap 5 detik
  setInterval(changeBanner, 5000);
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
const aboutSection = document.querySelector(".about");
const testimonialsSection = document.querySelector(".testimonials");
const sponsorSection = document.querySelector(".sponsors");
const footerSection = document.querySelector(".footer");

// Observe the sections
observer.observe(aboutSection);
observer.observe(testimonialsSection);
observer.observe(footerSection);
observer.observe(sponsorSection);
