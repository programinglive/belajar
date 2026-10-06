const baseUrl = (process.env.PILOT_API_BASE_URL || 'https://belajar.programinglive.com').replace(/\/$/, '')
const email = process.env.BELAJAR_PILOT_EMAIL
const password = process.env.BELAJAR_PILOT_PASSWORD

if (!email || !password) {
  throw new Error('BELAJAR_PILOT_EMAIL and BELAJAR_PILOT_PASSWORD are required')
}

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      ...options.headers,
    },
    signal: AbortSignal.timeout(20_000),
  })

  const body = await response.text()
  let json = null
  try {
    json = body ? JSON.parse(body) : null
  } catch {
    json = null
  }

  return { response, body, json }
}

async function waitForTrack() {
  for (let attempt = 1; attempt <= 20; attempt += 1) {
    const result = await request('/api/learning-tracks/first-web-page')
    if (result.response.ok && result.json?.status === 'published') {
      return result.json
    }

    if (attempt === 20) {
      throw new Error(`Learning-track API did not become ready (HTTP ${result.response.status})`)
    }

    console.log(`Waiting for production deployment (${attempt}/20)...`)
    await new Promise((resolve) => setTimeout(resolve, 30_000))
  }
}

async function getToken() {
  const login = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

  if (login.response.ok && login.json?.access_token) {
    return login.json.access_token
  }

  if (login.response.status !== 401) {
    throw new Error(`Pilot login failed with HTTP ${login.response.status}`)
  }

  const registration = await request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      name: 'ProgramingLive Pilot',
      email,
      password,
      password_confirmation: password,
    }),
  })

  if (!registration.response.ok || !registration.json?.access_token) {
    throw new Error(`Pilot registration failed with HTTP ${registration.response.status}: ${registration.body}`)
  }

  return registration.json.access_token
}

async function main() {
  const track = await waitForTrack()

  if (track.lesson_count !== 4 || track.lessons?.length !== 4 || !track.has_capstone) {
    throw new Error('Learning-track API returned an incomplete curriculum')
  }

  const token = await getToken()
  const authorization = { authorization: `Bearer ${token}` }

  const me = await request('/api/auth/me', { headers: authorization })
  if (!me.response.ok || me.json?.email !== email) {
    throw new Error(`Pilot identity check failed with HTTP ${me.response.status}`)
  }

  for (const resource of ['track', 'starter_html', 'starter_css', 'completed_example']) {
    const url = track.resources?.[resource]
    if (!url) throw new Error(`Missing learning resource: ${resource}`)

    const response = await fetch(url, { signal: AbortSignal.timeout(20_000) })
    if (!response.ok) throw new Error(`${resource} failed with HTTP ${response.status}`)
  }

  const logout = await request('/api/auth/logout', {
    method: 'POST',
    headers: authorization,
  })
  if (!logout.response.ok) {
    throw new Error(`Pilot logout failed with HTTP ${logout.response.status}`)
  }

  console.log('Pilot user completed registration/login, identity, curriculum, resources, and logout checks.')
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
