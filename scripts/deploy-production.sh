#!/usr/bin/env bash
# Deploy satu tag rilis ke produksi belajar.
#
# MENGAPA SKRIP INI ADA
# ---------------------
# docs/DEPLOYMENT.md dulu menyebut /root/command/deploy_all.sh yang berjalan
# tiap lima menit di server. Diperiksa 1 November 2026 di bw-server-clean:
# skrip itu dan cron-nya tidak ada. Akibatnya rilis menumpuk tanpa deploy -
# produksi tertinggal di v0.0.13 sementara master sudah v0.0.16 - dan pilot
# produksi melaporkan kegagalan palsu karena menguji build lama.
#
# Skrip ini menggantikan poller itu dengan satu perintah yang bisa diulang:
#
#   ./scripts/deploy-production.sh          # tag terbaru
#   ./scripts/deploy-production.sh v0.0.17  # tag tertentu
#
# Jalankan DI SERVER (atau lewat ssh). Setiap langkah berhenti pada kegagalan,
# jadi deploy yang gagal tidak pernah meninggalkan aplikasi setengah jadi
# tanpa terlihat.

set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/belajar}"
OWNER="${OWNER:-www-data:www-data}"
HEALTH_URL="${HEALTH_URL:-https://belajar.programinglive.com/api/version}"

log() { printf '==> %s\n' "$*"; }

cd "$APP_DIR"

log "Mengambil tag terbaru"
git fetch --tags --quiet origin

TAG="${1:-}"
if [ -z "$TAG" ]; then
    TAG="$(git tag --sort=-v:refname | head -n 1)"
fi
if [ -z "$TAG" ]; then
    echo "Tidak ada tag rilis di repo ini." >&2
    exit 1
fi

if ! git rev-parse --verify --quiet "refs/tags/$TAG" >/dev/null; then
    echo "Tag $TAG tidak ada setelah fetch." >&2
    exit 1
fi

EXPECTED="${TAG#v}"

# Perubahan lokal pada berkas yang dilacak berarti ada pekerjaan yang belum
# disimpan; jangan ditimpa. Perubahan mode `artisan` (100644 -> 100755) lazim
# terjadi setelah deploy pertama dan tidak mengubah isi, jadi diabaikan.
LOCAL_CHANGES="$(git status --porcelain --untracked-files=no | grep -v '^ M artisan$' || true)"
if [ -n "$LOCAL_CHANGES" ]; then
    echo "Ada perubahan lokal yang belum di-commit:" >&2
    echo "$LOCAL_CHANGES" >&2
    exit 1
fi

log "Checkout $TAG"
git checkout --quiet "$TAG"

# Versi yang akan hidup di server harus sama dengan tag. Kalau berbeda, yang
# ter-deploy bukan rilis yang dimaksud dan /api/version akan menipu pilot.
ACTUAL="$(node -p "require('./package.json').version")"
if [ "$ACTUAL" != "$EXPECTED" ]; then
    echo "Tag $TAG berisi package.json versi $ACTUAL; seharusnya $EXPECTED." >&2
    exit 1
fi

log "Memasang dependensi PHP"
composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

log "Memasang dependensi JavaScript dan membangun aset"
npm ci --no-audit --no-fund
npm run build

log "Menjalankan migrasi"
php artisan migrate --force

log "Menyegarkan cache konfigurasi, rute, dan view"
php artisan optimize

log "Memperbaiki kepemilikan berkas yang ditulis aplikasi"
chown -R "$OWNER" storage bootstrap/cache public/build

log "Memeriksa versi yang dilaporkan produksi"
LIVE=""
for _ in $(seq 1 12); do
    LIVE="$(curl -fsS "$HEALTH_URL" 2>/dev/null | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{try{console.log(JSON.parse(s).version||'')}catch{console.log('')}})" || true)"
    [ "$LIVE" = "$EXPECTED" ] && break
    sleep 5
done

if [ "$LIVE" != "$EXPECTED" ]; then
    echo "Produksi melaporkan versi '$LIVE', bukan '$EXPECTED'." >&2
    exit 1
fi

log "Selesai: produksi melayani $TAG"
