const { chromium } = require('playwright')

const baseUrl = (process.env.PILOT_WEB_BASE_URL || 'https://belajar.programinglive.com').replace(/\/$/, '')
const email = process.env.BELAJAR_PILOT_EMAIL
const password = process.env.BELAJAR_PILOT_PASSWORD

if (!email || !password) {
  throw new Error('BELAJAR_PILOT_EMAIL and BELAJAR_PILOT_PASSWORD are required')
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })

  try {
    await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 30_000 })
    await page.getByRole('link', { name: 'Start the Free Track' }).click()
    await page.getByRole('heading', { name: 'Build a simple personal webpage' }).waitFor()

    for (const heading of [
      'Buat struktur halaman',
      'Susun konten yang bermakna',
      'Beri gaya dan buat responsif',
      'Tinjau dan perbaiki',
      'Selesaikan profil versimu',
    ]) {
      await page.getByRole('heading', { name: heading }).waitFor()
    }

    await page.getByRole('link', { name: 'Lihat contoh selesai' }).click()
    await page.getByRole('heading', { name: 'Maya Putri' }).waitFor()

    await page.goto(`${baseUrl}/login`, { waitUntil: 'networkidle' })
    await page.getByLabel('Email').fill(email)
    await page.getByLabel('Password').fill(password)
    await Promise.all([
      page.waitForURL(`${baseUrl}/`, { timeout: 30_000 }),
      page.getByRole('button', { name: 'Sign in' }).click(),
    ])
    await page.getByRole('heading', { name: /Learn Together/i }).waitFor()

    console.log('Browser pilot completed homepage, learning track, example, and sign-in checks.')
  } finally {
    await browser.close()
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
