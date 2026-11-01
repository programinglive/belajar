const { chromium } = require('playwright')

// Pilot ini menempuh perjalanan yang sama dengan pembelajar sungguhan di
// produksi: beranda -> track -> contoh -> masuk -> dashboard.
//
// MENGAPA data-testid, BUKAN TEKS TOMBOL
// --------------------------------------
// Versi sebelumnya mencari teks Inggris ("Start the Free Track", "Sign in",
// "Learn Together"). Saat antarmuka di-rebrand ke bahasa Indonesia, semua teks
// itu hilang dan pilot gagal setiap hari selama berminggu-minggu - bukan karena
// produksi rusak, melainkan karena salinan teksnya berubah. Karena itu setiap
// langkah di sini memakai data-testid yang dipasang di komponennya; mengubah
// kalimat di layar tidak lagi mematikan pilot.
//
// Satu pengecualian: halaman contoh adalah artefak latihan yang diunduh
// pembelajar, jadi tidak diberi atribut uji. Yang diperiksa di sana adalah
// jumlah <h1> - pemeriksaan yang sama dengan yang diajarkan di Lesson 4.

const baseUrl = (process.env.PILOT_WEB_BASE_URL || 'https://belajar.programinglive.com').replace(/\/$/, '')
const email = process.env.BELAJAR_PILOT_EMAIL
const password = process.env.BELAJAR_PILOT_PASSWORD

if (!email || !password) {
  throw new Error('BELAJAR_PILOT_EMAIL and BELAJAR_PILOT_PASSWORD are required')
}

async function openExamplePage(page) {
  const [examplePage] = await Promise.all([
    page.waitForEvent('popup', { timeout: 15_000 }),
    page.getByTestId('open-example').click(),
  ])

  await examplePage.waitForLoadState('domcontentloaded')

  const headings = examplePage.locator('h1')
  await headings.first().waitFor()

  const count = await headings.count()
  if (count !== 1) {
    throw new Error(`Halaman contoh harus punya tepat satu <h1>, ditemukan ${count}.`)
  }

  await examplePage.close()
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })

  try {
    await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 30_000 })
    await page.getByTestId('home-start-track').click()

    const trackTitle = page.getByTestId('track-title')
    await trackTitle.waitFor()
    if (!(await trackTitle.innerText()).trim()) {
      throw new Error('Judul track kosong di halaman track.')
    }

    for (const number of [1, 2, 3, 4]) {
      await page.getByTestId(`lesson-${number}`).waitFor()
    }
    await page.getByTestId('capstone-title').waitFor()

    await openExamplePage(page)

    await page.goto(`${baseUrl}/login`, { waitUntil: 'networkidle' })
    await page.getByTestId('login-email').fill(email)
    await page.getByTestId('login-password').fill(password)
    // Jangan menebak URL tujuan setelah masuk: produksi mengarah ke /dashboard,
    // dan menunggu '/' membuat pilot gagal walau login berhasil. Yang penting
    // adalah dashboard pembelajar benar-benar tampil.
    await page.getByTestId('login-submit').click()
    await page.getByTestId('dashboard-heading').waitFor({ timeout: 30_000 })

    console.log('Browser pilot completed homepage, learning track, example, and sign-in checks.')
  } finally {
    await browser.close()
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
