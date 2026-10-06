# Pilot user API testing

Every user-facing feature should extend one executable pilot journey. The journey must verify the feature through its public API, not only by checking implementation details.

## Current journey

The Belajar pilot user:

1. registers once or logs in through the JWT API;
2. reads its authenticated profile;
3. fetches the published first-learning-track manifest;
4. checks all learner-facing starter and example resources;
5. logs out and invalidates the token.

`tests/Feature/PilotUserJourneyTest.php` runs this journey against an isolated database on every CI run. `scripts/pilot-api-smoke.cjs` runs the same behavior against production after a successful version-tag CI run and once per day.

Production credentials live only in GitHub Actions secrets named `BELAJAR_PILOT_EMAIL` and `BELAJAR_PILOT_PASSWORD`. They must never be committed or printed in logs.

## Extending the journey

When a feature is added:

- expose the smallest stable API needed to exercise its user outcome;
- add the happy-path action and a meaningful assertion to `PilotUserJourneyTest`;
- add the corresponding production check to `pilot-api-smoke.cjs` when it is safe and repeatable;
- avoid destructive actions, real payments, external messages, and personal learner data;
- make failures identify the broken user outcome.
