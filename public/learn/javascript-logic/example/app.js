/**
 * Track 2: Dasar Logika JavaScript & DOM
 * Contoh Proyek Selesai: Aplikasi Kalkulator Sederhana
 */

// Seleksi Elemen DOM
const inputAngka1 = document.getElementById('angka1');
const inputAngka2 = document.getElementById('angka2');
const hasilTeks = document.getElementById('hasil-teks');

const btnTambah = document.getElementById('btn-tambah');
const btnKurang = document.getElementById('btn-kurang');
const btnKali = document.getElementById('btn-kali');
const btnBagi = document.getElementById('btn-bagi');
const btnReset = document.getElementById('btn-reset');

// Fungsi-Fungsi Logika Aritmatika Murni (Modul 3)
function tambah(a, b) {
    return a + b;
}

function kurang(a, b) {
    return a - b;
}

function kali(a, b) {
    return a * b;
}

function bagi(a, b) {
    // Penanganan kondisi khusus pembagian dengan nol (Modul 2)
    if (b === 0) {
        return null;
    }
    return a / b;
}

// Fungsi Pembantu Validasi Input (Modul 2 & 4)
function validasiDanAmbilInput() {
    const teks1 = inputAngka1.value.trim();
    const teks2 = inputAngka2.value.trim();

    if (teks1 === '' || teks2 === '') {
        return {
            sukses: false,
            pesan: 'Harap isi kedua kolom angka terlebih dahulu.'
        };
    }

    const a = parseFloat(teks1);
    const b = parseFloat(teks2);

    if (isNaN(a) || isNaN(b)) {
        return {
            sukses: false,
            pesan: 'Format input tidak valid. Masukkan angka.'
        };
    }

    return {
        sukses: true,
        a: a,
        b: b
    };
}

// Fungsi Menampilkan Hasil ke DOM
function tampilkanHasil(hasil, isError = false) {
    if (isError) {
        hasilTeks.textContent = hasil;
        hasilTeks.classList.add('error');
    } else {
        // Format angka desimal jika memiliki pecahan panjang
        const nilaiFormatted = Number.isInteger(hasil) ? hasil : Number(hasil.toFixed(4));
        hasilTeks.textContent = nilaiFormatted;
        hasilTeks.classList.remove('error');
    }
}

// Event Listeners (Modul 4 & 5)
btnTambah.addEventListener('click', function () {
    const data = validasiDanAmbilInput();
    if (!data.sukses) {
        tampilkanHasil(data.pesan, true);
        return;
    }
    const hasil = tambah(data.a, data.b);
    tampilkanHasil(hasil);
});

btnKurang.addEventListener('click', function () {
    const data = validasiDanAmbilInput();
    if (!data.sukses) {
        tampilkanHasil(data.pesan, true);
        return;
    }
    const hasil = kurang(data.a, data.b);
    tampilkanHasil(hasil);
});

btnKali.addEventListener('click', function () {
    const data = validasiDanAmbilInput();
    if (!data.sukses) {
        tampilkanHasil(data.pesan, true);
        return;
    }
    const hasil = kali(data.a, data.b);
    tampilkanHasil(hasil);
});

btnBagi.addEventListener('click', function () {
    const data = validasiDanAmbilInput();
    if (!data.sukses) {
        tampilkanHasil(data.pesan, true);
        return;
    }
    const hasil = bagi(data.a, data.b);
    if (hasil === null) {
        tampilkanHasil('Tidak dapat membagi dengan 0', true);
        return;
    }
    tampilkanHasil(hasil);
});

btnReset.addEventListener('click', function () {
    inputAngka1.value = '';
    inputAngka2.value = '';
    tampilkanHasil(0);
    inputAngka1.focus();
});
