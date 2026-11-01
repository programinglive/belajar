# Belajar Production Deployment

## Target

- Domain: `belajar.programinglive.com`
- GCP VM: `bw-server-clean` (project `winged-ratio-344917`, zone `asia-southeast2-a`)
- Application root: `/var/www/belajar`
- Webroot: `/var/www/belajar/public` (Nginx + PHP 8.3 FPM)
- TLS terminates at the GCP HTTPS load balancer, which forwards HTTP to Nginx on port 80.

Reach the server over Tailscale:

```bash
ssh root@100.107.65.21
```

`gcloud compute ssh --tunnel-through-iap` fails on Windows (`plink.exe`), so do not
conclude from that error that the host is unreachable.

## Release and deployment flow

1. Run the checks and build locally or in GitHub Actions.
2. Wait for CI on the release commit to pass, then publish a patch release with
   `npm run release:patch` (or `release:minor` / `release:major`). That commits the
   version bump, updates `CHANGELOG.md`, and creates the `v*` tag.
3. Deploy that tag on the server:

   ```bash
   ssh root@100.107.65.21 '/var/www/belajar/scripts/deploy-production.sh v0.0.17'
   ```

   Without an argument the script deploys the newest tag. It fetches tags, checks
   the tag out, installs PHP and JavaScript dependencies, builds assets, runs
   `php artisan migrate --force`, refreshes caches, fixes ownership, and finally
   refuses to report success unless `/api/version` on the live site returns the
   tag's version.
4. The production pilot picks the release up automatically. When the workflow is
   triggered by a tag it polls `/api/version` for up to ten minutes and only then
   runs the API and browser journeys, so a pilot run started before the deploy
   finishes waits instead of reporting a false failure.

GitHub Actions CI: <https://github.com/programinglive/belajar/actions>

## There is no deploy poller

Earlier versions of this document described `/root/command/deploy_all.sh` running
from cron every five minutes. That poller belonged to the **old** `bw-server`: it
fetched tags and deployed the newest one for each configured project, and because
it ran every five minutes it could overwrite manual work under `/var/www`. During
the cutover to `bw-server-clean` on 28 October 2026 the runbook
(`docs/arsip/RUNBOOK-ERADICATION.md`, section 3.1) therefore required the cron entry
to be disabled first. Nothing replaced it.

The result went unnoticed for days: releases were tagged but never deployed,
production stayed on `v0.0.13` while `master` reached `v0.0.16`, and the production
pilot failed against a build three weeks old.

Deployment is therefore **manual and explicit**, through
`scripts/deploy-production.sh`. If automatic deployment is wanted again, add a cron
entry that runs that script and update this document in the same change — do not
reintroduce a poller only in prose.

## Verify deployment

```bash
curl -fsS https://belajar.programinglive.com/api/version
ssh root@100.107.65.21 'cd /var/www/belajar && git describe --tags --exact-match'
```

Both must report the same version. The deployed commit and tag:

```bash
ssh root@100.107.65.21 'git -C /var/www/belajar log -1 --oneline --decorate'
```

## Operational notes

- Deployment is tag-driven, not branch-driven. Pushing to `master` alone does not deploy.
- `scripts/deploy-production.sh` refuses to run when tracked files have uncommitted
  changes, and refuses to continue when the tag's `package.json` version differs from
  the tag name.
- `.env` and `storage` are never touched by a checkout. Migrations do run with
  `--force` on every deployment.
- Production changes should be followed by a pilot run; the daily schedule at
  01:17 UTC and `workflow_dispatch` both cover that.
