document.addEventListener("DOMContentLoaded", function () {
  const durationSelect = document.getElementById("duration");
  const specificDurationSelect = document.getElementById("specific-duration");
  const pesanButton = document.getElementById("pesan-button");
  const paymentMethodSelect = document.getElementById("payment-method");
  const bankDropdown = document.getElementById("bank-dropdown");
  const bankSelect = document.getElementById("bank-select");
  const totalCostElement = document.getElementById("total-cost");
  const adminFeeElement = document.getElementById("admin-fee");
  const adminFeeAmountElement = document.getElementById("admin-fee-amount");
  const uploadSection = document.getElementById("upload-section");

  // Fungsi untuk menghitung harga total berdasarkan pilihan pengguna
  function calculateCost() {
    let jenisSewa = document.getElementById("sewa").value;
    let paket = document.getElementById("paket").value;
    let device = document.getElementById("device").value;
    let durasi = document.getElementById("duration").value;
    let specificDuration = document.getElementById("specific-duration").value;
    let totalCost = 0;

    // Harga paket per hari dan per jam berdasarkan perangkat (PS5 dan PS4)
    const hargaPerJam = {
      ps5: { reguler: 10000, malam: 15000 },
      ps4: { reguler: 8000, malam: 12000 },
    };
    const hargaPerHari = {
      ps5: { reguler: 50000, malam: 75000 },
      ps4: { reguler: 40000, malam: 60000 },
    };

    // Menentukan jumlah waktu berdasarkan durasi yang dipilih
    let durasiJumlah = 1; // Default ke 1 jika tidak ada pilihan
    if (specificDuration) {
      let parts = specificDuration.split("-");
      durasiJumlah = parseInt(parts[0]);
    }

    // Cek harga berdasarkan jenis sewa dan paket
    if (jenisSewa === "ditempat") {
      if (durasi === "perjam") {
        totalCost = hargaPerJam[device][paket] * durasiJumlah;
      } else {
        totalCost = hargaPerHari[device][paket] * durasiJumlah;
      }
    } else {
      // Bawa pulang (tambahkan biaya tambahan 20%)
      if (durasi === "perjam") {
        totalCost = hargaPerJam[device][paket] * durasiJumlah * 1.2;
      } else {
        totalCost = hargaPerHari[device][paket] * durasiJumlah * 1.2;
      }
    }

    // Update total biaya ke elemen HTML
    totalCostElement.innerText = `Rp ${totalCost.toLocaleString()}`;
    return totalCost;
  }

  // Fungsi untuk menampilkan atau menyembunyikan dropdown bank berdasarkan pilihan pembayaran
  function toggleBankDropdown() {
    if (paymentMethodSelect.value === "bank-transfer") {
      bankDropdown.style.display = "block"; // Menampilkan dropdown bank
      adminFeeElement.style.display = "block"; // Menampilkan biaya admin
    } else {
      bankDropdown.style.display = "none"; // Menyembunyikan dropdown bank
      adminFeeElement.style.display = "none"; // Menyembunyikan biaya admin
    }
  }

  // Menambahkan event listener untuk memilih metode pembayaran
  paymentMethodSelect.addEventListener("change", toggleBankDropdown);

  // Inisialisasi pertama kali
  toggleBankDropdown(); // Pastikan dropdown bank muncul hanya jika Bank Transfer dipilih

  // Fungsi untuk menampilkan biaya admin berdasarkan bank yang dipilih
  function updateAdminFee() {
    const selectedBank = bankSelect.value;
    let totalCost = calculateCost();
    let adminFee = 0;

    // Tentukan biaya admin berdasarkan bank yang dipilih
    if (selectedBank === "bca" || selectedBank === "mandiri") {
      adminFee = totalCost * 0.05; // 5% admin fee for BCA and Mandiri
    } else if (selectedBank === "bri" || selectedBank === "bni") {
      adminFee = totalCost * 0.03; // 3% admin fee for BRI and BNI
    } else if (selectedBank === "other") {
      adminFee = totalCost * 0.07; // 7% admin fee for other banks
    }

    // Batasi biaya admin antara Rp 500 dan Rp 5000
    adminFee = Math.max(500, Math.min(adminFee, 5000)); // Set biaya admin min 500, max 5000

    // Tampilkan biaya admin
    adminFeeAmountElement.innerText = `Rp ${adminFee.toLocaleString()}`;
    return totalCost + adminFee; // Return total cost + admin fee
  }

  // Menambahkan event listener untuk perubahan pilihan bank
  bankSelect.addEventListener("change", function () {
    if (bankSelect.value) {
      // Update biaya admin dan total bayar saat bank dipilih
      let totalCostWithAdmin = updateAdminFee();
      totalCostElement.innerText = `Rp ${totalCostWithAdmin.toLocaleString()}`;
    } else {
      adminFeeElement.style.display = "none"; // Jika tidak ada bank yang dipilih, sembunyikan biaya admin
    }
  });

  // Fungsi untuk menampilkan alert ketika tombol "Pesan" diklik
  function showAlert() {
    let jenisSewa = document.getElementById("sewa").value;
    let paket = document.getElementById("paket").value;
    const pembayaran = document.getElementById("payment-method").value;

    // Pastikan ada metode pembayaran yang dipilih
    if (!pembayaran) {
      alert("Silakan pilih metode pembayaran.");
      return;
    }

    let totalCost = calculateCost();
    let totalCostWithAdmin = totalCost;

    // Jika Bank Transfer dan bank dipilih, tambahkan biaya administrasi
    if (pembayaran === "bank-transfer" && bankSelect.value) {
      totalCostWithAdmin = updateAdminFee();
    }

    // Alert untuk pembayaran dan informasi lainnya
    if (pembayaran === "cash") {
      alert(
        `Silahkan Bayar ke abang rental, Total Biaya: ${totalCostWithAdmin.toLocaleString()}`
      );
    } else if (pembayaran === "qris") {
      alert(
        `Pembayaran QRIS, Total Biaya: ${totalCostWithAdmin.toLocaleString()}\nQRIS Code: QRIS-123456789`
      );
    } else if (pembayaran === "bank-transfer") {
      // Menambahkan kode Virtual Account atau rekening bank
      let bankCode = "";
      let bankName = bankSelect.value.toUpperCase();

      // Menentukan kode Virtual Account atau rekening untuk bank tertentu
      if (bankSelect.value === "bca") {
        bankCode = "VA-123456789";
      } else if (bankSelect.value === "bri") {
        bankCode = "VA-987654321";
      } else if (bankSelect.value === "mandiri") {
        bankCode = "VA-1122334455";
      } else if (bankSelect.value === "bni") {
        bankCode = "VA-5566778899";
      } else if (bankSelect.value === "other") {
        bankCode = "VA-0000000000"; // Default untuk bank lainnya
      }

      // Menampilkan alert dengan detail bank transfer
      alert(
        `Pembayaran melalui Bank Transfer (${bankName}), Total Biaya: ${totalCostWithAdmin.toLocaleString()}\nVirtual Account: ${bankCode}`
      );
    }
  }

  // Menambahkan event listener untuk perubahan pemilihan durasi
  durationSelect.addEventListener("change", calculateCost);
  specificDurationSelect.addEventListener("change", calculateCost);

  // Menambahkan event listener untuk perubahan pilihan lainnya (misalnya perangkat, paket, dsb)
  document.querySelectorAll("select").forEach((selectElement) => {
    selectElement.addEventListener("change", calculateCost);
  });

  // Menambahkan event listener untuk tombol "Pesan"
  pesanButton.addEventListener("click", showAlert);

  // Fungsi untuk menampilkan upload section hanya jika "Bawa Pulang" dipilih
  function toggleUploadSection() {
    if (document.getElementById("sewa").value === "dibawa") {
      uploadSection.style.display = "block";
    } else {
      uploadSection.style.display = "none";
    }
  }

  // Tambahkan event listener untuk dropdown "Jenis Sewa"
  document
    .getElementById("sewa")
    .addEventListener("change", toggleUploadSection);

  // Inisialisasi pertama kali
  toggleUploadSection(); // Menyembunyikan atau menampilkan upload section sesuai jenis sewa
  calculateCost(); // Hitung harga awal

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
});
