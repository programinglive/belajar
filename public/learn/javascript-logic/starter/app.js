/**
 * Track 2: Dasar Logika JavaScript & DOM
 * Proyek: Aplikasi Kalkulator Sederhana
 * 
 * Ikuti petunjuk TODO di bawah ini secara bertahap sesuai modul yang sedang Anda pelajari.
 */

// =============================================================================
// MODUL 1 & 4: SELEKSI ELEMEN DOM
// =============================================================================
// TODO 1: Ambil elemen input dan tombol dari dokumen HTML menggunakan document.getElementById
const inputAngka1 = document.getElementById('angka1');
const inputAngka2 = document.getElementById('angka2');
const hasilTeks = document.getElementById('hasil-teks');

const btnTambah = document.getElementById('btn-tambah');
const btnKurang = document.getElementById('btn-kurang');
const btnKali = document.getElementById('btn-kali');
const btnBagi = document.getElementById('btn-bagi');
const btnReset = document.getElementById('btn-reset');


// =============================================================================
// MODUL 3: FUNGSI OPERASI ARITMATIKA
// =============================================================================
// TODO 2: Lengkapi fungsi-fungsi di bawah ini agar mengembalikan hasil perhitungan matematika
function tambah(a, b) {
    // Kembalikan hasil a + b
    return a + b;
}

function kurang(a, b) {
    // Kembalikan hasil a - b
    return a - b;
}

function kali(a, b) {
    // Kembalikan hasil a * b
    return a * b;
}

function bagi(a, b) {
    // TODO Modul 2: Periksa jika b adalah 0, kembalikan teks peringatan atau null
    if (b === 0) {
        return 'Tidak dapat membagi dengan 0';
    }
    return a / b;
}


// =============================================================================
// MODUL 2 & 4: LOGIKA & EVENT HANDLER
// =============================================================================
// TODO 3: Buat fungsi pembantu untuk membaca angka dari input dan memvalidasi nilainya
function ambilInput() {
    const val1 = inputAngka1.value.trim();
    const val2 = inputAngka2.value.trim();

    // Validasi apakah input kosong
    if (val1 === '' || val2 === '') {
        return { valid: false, pesan: 'Harap masukkan kedua angka' };
    }

    const a = parseFloat(val1);
    const b = parseFloat(val2);

    if (isNaN(a) || isNaN(b)) {
        return { valid: false, pesan: 'Input harus berupa angka valid' };
    }

    return { valid: true, a, b };
}

// TODO 4: Pasang Event Listener pada masing-masing tombol operasi
btnTambah.addEventListener('click', function () {
    const input = ambilInput();
    if (!input.valid) {
        hasilTeks.textContent = input.pesan;
        return;
    }
    const hasil = tambah(input.a, input.b);
    hasilTeks.textContent = hasil;
});

btnKurang.addEventListener('click', function () {
    const input = ambilInput();
    if (!input.valid) {
        hasilTeks.textContent = input.pesan;
        return;
    }
    const hasil = kurang(input.a, input.b);
    hasilTeks.textContent = hasil;
});

btnKali.addEventListener('click', function () {
    const input = ambilInput();
    if (!input.valid) {
        hasilTeks.textContent = input.pesan;
        return;
    }
    const hasil = kali(input.a, input.b);
    hasilTeks.textContent = hasil;
});

btnBagi.addEventListener('click', function () {
    const input = ambilInput();
    if (!input.valid) {
        hasilTeks.textContent = input.pesan;
        return;
    }
    const hasil = bagi(input.a, input.b);
    hasilTeks.textContent = hasil;
});

btnReset.addEventListener('click', function () {
    inputAngka1.value = '';
    inputAngka2.value = '';
    hasilTeks.textContent = '0';
    inputAngka1.focus();
});
