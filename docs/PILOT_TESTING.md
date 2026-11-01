# Pilot user API testing

Every user-facing feature should extend one executable pilot journey. The journey must verify the feature through its public API, not only by checking implementation details.

## Current journey

The Belajar pilot user:

1. registers once or logs in through the JWT API;
2. reads its authenticated profile;
3. fetches the published first-learning-track manifest;
4. checks all learner-facing starter and example resources;
5. logs out and invalidates the token.

`tests/Feature/PilotUserJourneyTest.php` runs this journey against an isolated database on every CI run. Production checks combine `scripts/pilot-api-smoke.cjs` with a Playwright Chromium journey that clicks through the homepage, course, example, and sign-in UI like a learner. They run after a successful version-tag CI run and once per day.

Production credentials live only in GitHub Actions secrets named `BELAJAR_PILOT_EMAIL` and `BELAJAR_PILOT_PASSWORD`. Results are posted by the `ProgramingLive Pilot Tester` Discord bot through `DISCORD_PILOT_WEBHOOK_URL`. These values must never be committed or printed in logs.

## Locating elements: `data-testid`, never the copy

The browser journey selects every element by `data-testid`, not by the text a
learner sees. Between 7 and 31 October 2026 every label changed with the
Indonesian rebrand ("Start the Free Track" became "Mulai Track Web Pemula",
"Sign in" became "Masuk ke Akun"), and the pilot failed every single day for a
reason that had nothing to do with production health.

| Step | `data-testid` | Where |
|---|---|---|
| Home CTA | `home-start-track` | `resources/js/pages/Home.tsx` |
| Track title | `track-title` | `courses/FirstWebPage.tsx` |
| Lesson titles | `lesson-1` … `lesson-4` | `courses/FirstWebPage.tsx` |
| Capstone title | `capstone-title` | `courses/FirstWebPage.tsx` |
| Example link | `open-example` | `courses/FirstWebPage.tsx` |
| Sign-in fields | `login-email`, `login-password`, `login-submit` | `auth/Login.tsx` |
| Dashboard heading | `dashboard-heading` | `Dashboard.tsx` |

The example page opened by `open-example` is a learner artifact and carries no
test attributes; the journey only asserts it has exactly one `<h1>`, which is the
check Lesson 4 teaches.

The journey also never asserts a URL it cannot control after an action. Signing in
redirects to `/dashboard`, and an earlier version waited for `/`, so a working
sign-in still failed the pilot. Wait for a `data-testid` on the page that should
appear instead; `tests/Feature/PilotBrowserSelectorsTest.php` rejects `waitForURL`
in the pilot for that reason.

`tests/Feature/PilotBrowserSelectorsTest.php` fails the suite when the pilot uses
an id that does not exist in `resources/js`, so a renamed attribute is caught by
`composer test` instead of on the next daily production run. It also rejects
`getByRole`/`getByLabel` in the pilot script, which is what made the journey
depend on copy in the first place.

## Extending the journey

When a feature is added:

- expose the smallest stable API needed to exercise its user outcome;
- add the happy-path action and a meaningful assertion to `PilotUserJourneyTest`;
- add the corresponding production check to `pilot-api-smoke.cjs` when it is safe and repeatable;
- avoid destructive actions, real payments, external messages, and personal learner data;
- make failures identify the broken user outcome.
