/* Chuqur dars: 7.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.14", {
  "lesson": [
    "### Reproducible Builds",
    "**Qayta takrorlanadigan build:** bir xil manba bir xil natija beradi — developer'da, CI'da va production'da **bir xil bog'liqliklar**.",
    "",
    "### Asos: composer.lock",
    "- `composer.lock` Git'da.",
    "- Deploy/CI: `composer install` (hech qachon `update` emas).",
    "- Lock aniq commit hash va versiyalarni saqlaydi.",
    "",
    "### Yaxlitlik",
    "- `composer install --no-interaction --prefer-dist --no-progress`.",
    "- `composer validate --strict` (lock `composer.json` bilan mosligini tekshiradi).",
    "- `config.platform` — lokal PHP boshqacha bo'lsa ham production versiyasiga mos tanlash.",
    "- `composer install --no-dev -o` (production).",
    "",
    "### Konteyner bilan",
    "Docker image'da: `COPY composer.json composer.lock`, `RUN composer install`, keyin kod (layer cache). Multi-stage build: dev (xdebug, dev paketlar), prod (`--no-dev`). Image tag'i — versiya.",
    "",
    "### Boshqa darajalar",
    "- PHP versiyasi (image tag aniq: `php:8.4.3-fpm`).",
    "- Kengaytmalar versiyasi.",
    "- Node `package-lock.json`/`npm ci`.",
    "- OS paketlari.",
    "",
    "### Nima buzadi",
    "Lock'siz deploy, `composer update` production'da, `dev-main` bog'liqliklar, `*` diapazonlar, tarmoqda paket yo'qolishi (cache/mirror/vendor'ni artefakt sifatida saqlash).",
    "",
    "### Cache va tezlik",
    "`~/.composer/cache` CI cache; `--prefer-dist`.",
    "",
    "### Tekshirish",
    "`composer install` ikki marta — bir xil `vendor` (hash) bo'lishi; CI'da lock o'zgarmaganini tekshirish (`git diff --exit-code composer.lock`)."
  ],
  "examples": [
    {
      "title": "Dockerfile layer",
      "lang": "dockerfile",
      "code": [
        "FROM composer:2 AS vendor",
        "WORKDIR /app",
        "COPY composer.json composer.lock ./",
        "RUN composer install --no-dev --no-interaction --prefer-dist --no-scripts --optimize-autoloader",
        "",
        "FROM php:8.4.3-fpm AS app",
        "COPY --from=vendor /app/vendor /var/www/html/vendor",
        "COPY . /var/www/html"
      ]
    }
  ],
  "pitfalls": [
    "Production'da `composer update` kutilmagan versiyalarni o'rnatadi: faqat `install`.",
    "`dev-main` va `*` bog'liqliklar build'ni takrorlanmas qiladi.",
    "Lock'ni Git'ga kiritmaslik jamoa/CI/production orasida farq beradi.",
    "Docker image'da PHP versiyasini aniq belgilamaslik (`php:latest`) build'ni o'zgartiradi."
  ]
});
