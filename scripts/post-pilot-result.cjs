const webhookUrl = process.env.DISCORD_PILOT_WEBHOOK_URL

if (!webhookUrl) {
  console.log('Discord pilot report skipped: webhook is not configured.')
  process.exit(0)
}

const apiResult = process.env.PILOT_API_RESULT || 'unknown'
const browserResult = process.env.PILOT_BROWSER_RESULT || 'unknown'
const success = apiResult === 'success' && browserResult === 'success'
const repository = process.env.GITHUB_REPOSITORY || 'programinglive/belajar'
const runId = process.env.GITHUB_RUN_ID
const runUrl = runId ? `https://github.com/${repository}/actions/runs/${runId}` : undefined
const ref = process.env.GITHUB_REF_NAME || 'production'

async function main() {
  const response = await fetch(`${webhookUrl}?wait=true`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      username: 'ProgramingLive Pilot Tester',
      allowed_mentions: { parse: [] },
      embeds: [
        {
          title: `${success ? '✅' : '❌'} Belajar production pilot ${success ? 'passed' : 'failed'}`,
          url: runUrl,
          description: success
            ? 'Synthetic learner completed the production journey like a real user.'
            : 'At least one production journey failed. Open the workflow for details.',
          color: success ? 0x22c55e : 0xef4444,
          fields: [
            { name: 'API journey', value: apiResult, inline: true },
            { name: 'Browser journey', value: browserResult, inline: true },
            { name: 'Release', value: ref, inline: true },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error(`Discord pilot report failed with HTTP ${response.status}`)
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
