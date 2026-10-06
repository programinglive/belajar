# Belajar Production Deployment

## Target

- Domain: `belajar.programinglive.com`
- GCP VM: `bw-server` (`winged-ratio-344917`, `asia-southeast2-a`)
- Application root: `/usr/share/nginx/belajar`
- Web server: Nginx + PHP-FPM; Nginx serves `/usr/share/nginx/belajar/public`

## Release and deployment flow

1. Run the project checks and build locally or in GitHub Actions.
2. Publish a version tag (`v*`) to `programinglive/belajar` after CI passes.
3. A root cron job on `bw-server` runs `/root/command/deploy_all.sh` every five minutes. The script fetches tags and deploys the newest tag for each configured project; Belajar is configured as `/usr/share/nginx/belajar` with the project key `belajar`.
4. Deployment builds in `/tmp/deploy_build_belajar`, syncs the release back while preserving `.env` and `storage`, runs Laravel migrations, and refreshes Laravel caches.

GitHub Actions CI: <https://github.com/programinglive/belajar/actions>

## Verify deployment

```powershell
gcloud compute ssh gpcbeautyworld@bw-server --project=winged-ratio-344917 --zone=asia-southeast2-a --tunnel-through-iap --command "git -C /usr/share/nginx/belajar log -1 --oneline --decorate; git -C /usr/share/nginx/belajar describe --tags --exact-match"
```

Review the server deployment log if a release does not appear:

```powershell
gcloud compute ssh gpcbeautyworld@bw-server --project=winged-ratio-344917 --zone=asia-southeast2-a --tunnel-through-iap --command "sudo tail -100 /var/log/deploy_all.log"
```

## Operational notes

- Deployment is tag-driven, not branch-driven. A push to `master` alone does not deploy.
- The server polls tags every five minutes; CI and the server poller are not currently coupled, so only publish a release tag after its GitHub Actions run succeeds.
- `.env` and `storage` are excluded from the code sync. Database migrations do run with `--force` on deployment.
- Production changes should be followed by an HTTP smoke test and a check that the deployed tag matches the release.
