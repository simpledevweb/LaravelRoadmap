/* 36 · Docker
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 36,
  slug: "docker",
  title: "Docker",
  group: "infra",
  description: "Docker — ilovani va uning muhitini (PHP versiyasi, kengaytmalar, sozlamalar) yagona, takrorlanadigan konteyner image'iga qadoqlash vositasi. U \"mening kompyuterimda ishlaydi\" muammosini hal qiladi, lokal muhit, CI va production'ni birxillashtiradi. Senior dasturchi samarali, kichik va xavfsiz image'lar yaratadi va konteynerlarni debug qila oladi.",
  subskills: [
    {
      id: "36.1",
      title: "Images va Containers",
      description: [
        "**Image** — o'zgarmas shablon: fayl tizimi qatlamlari + metadata (buyruq, port, env). **Container** — image'ning ishga tushirilgan, izolyatsiyalangan nusxasi (o'z jarayonlari, tarmoq, yoziladigan qatlam). Bitta image'dan ko'p konteyner. Konteyner VM emas — host yadrosini bo'lishadi (namespace va cgroup'lar orqali izolyatsiya).",
        "",
        "Konteyner vaqtinchalik: o'chirilsa, ichidagi yozuvlar yo'qoladi (volume'lardan tashqari) — holatni tashqarida saqlang (DB, S3, volume). Bitta konteyner — bitta asosiy jarayon (php-fpm, nginx, queue worker alohida).",
        "",
        "```bash",
        "docker pull php:8.3-fpm-alpine",
        "docker run --rm -it php:8.3-cli-alpine php -v",
        "docker ps -a && docker images",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Rasmiy PHP image'idan konteyner ishga tushirib, image va container farqini amalda ko'rsating.",
      acceptanceCriteria: [
        "Image va container farqini biladi",
        "Konteynerning vaqtinchalik tabiatini tushunadi"
      ],
      prerequisites: [
        "38.5"
      ]
    },
    {
      id: "36.2",
      title: "Dockerfile",
      description: [
        "Dockerfile — image yaratish retsepti: `FROM` (asos), `RUN` (buyruqlar — har biri qatlam), `COPY`/`ADD`, `WORKDIR`, `ENV`/`ARG`, `EXPOSE`, `USER`, `ENTRYPOINT`/`CMD`, `HEALTHCHECK`. Laravel uchun: PHP-FPM image + kerakli kengaytmalar (`pdo_mysql`, `redis`, `intl`, `opcache`, `zip`) + Composer + kod.",
        "",
        "`ENTRYPOINT` va `CMD` farqi: entrypoint — doimiy buyruq, cmd — default argumentlar. Exec forma (`[\"php-fpm\"]`) signallarni to'g'ri uzatadi (shell forma emas).",
        "",
        "```dockerfile",
        "FROM php:8.3-fpm-alpine",
        "RUN apk add --no-cache icu-dev libzip-dev \\",
        " && docker-php-ext-install pdo_mysql intl zip opcache \\",
        " && pecl install redis && docker-php-ext-enable redis",
        "COPY --from=composer:2 /usr/bin/composer /usr/bin/composer",
        "WORKDIR /var/www/html",
        "CMD [\"php-fpm\"]",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Laravel uchun PHP-FPM asosidagi Dockerfile yozing: kerakli kengaytmalar va Composer bilan.",
      acceptanceCriteria: [
        "Asosiy Dockerfile instruksiyalarini biladi",
        "Exec forma va signal uzatishni tushunadi"
      ],
      prerequisites: [
        "36.1"
      ]
    },
    {
      id: "36.3",
      title: "Build Context",
      description: [
        "Build context — `docker build` ga yuboriladigan fayllar to'plami (odatda `.` papkasi). Katta context (`vendor/`, `node_modules/`, `.git`, log'lar) build'ni sekinlashtiradi va maxfiy fayllar (`.env`) image'ga tushib qolishi mumkin.",
        "",
        "`.dockerignore` — context'dan chiqariladigan fayllar. `COPY . .` faqat kerakli narsani nusxalashi uchun ignore ro'yxati to'liq bo'lishi kerak.",
        "",
        "```text",
        "# .dockerignore",
        ".git",
        ".env",
        "vendor",
        "node_modules",
        "storage/logs/*",
        "storage/framework/cache/*",
        "tests",
        "docker-compose*.yml",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "`.dockerignore` yozing va build context hajmini oldin/keyin solishtiring; `.env` image'ga tushmasligini tekshiring.",
      acceptanceCriteria: [
        "Build context tushunchasini biladi",
        "`.dockerignore` bilan sirlar va keraksiz fayllarni chiqaradi"
      ],
      prerequisites: [
        "36.2"
      ]
    },
    {
      id: "36.4",
      title: "Layers va Caching",
      description: [
        "Har bir `RUN`, `COPY`, `ADD` — yangi qatlam; Docker qatlamlarni keshlaydi va instruksiya hamda uning kirishlari o'zgarmasa qayta ishlatadi. Bir qatlam o'zgarsa, undan keyingilari qayta quriladi.",
        "",
        "Tartib qoidasi: kam o'zgaradigan narsalar yuqorida (tizim paketlari, PHP kengaytmalari), keyin dependency manifestlari (`composer.json`, `composer.lock` → `composer install`), eng oxirida tez-tez o'zgaradigan kod. Shunda kod o'zgarganda `composer install` keshdan olinadi. BuildKit kesh mount'lari (`--mount=type=cache`) composer/npm keshini build'lar orasida saqlaydi.",
        "",
        "```dockerfile",
        "COPY composer.json composer.lock ./",
        "RUN --mount=type=cache,target=/root/.composer/cache \\",
        "    composer install --no-dev --no-scripts --no-autoloader --prefer-dist",
        "COPY . .",
        "RUN composer dump-autoload --optimize --classmap-authoritative",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Dockerfile tartibini kesh uchun optimallashtiring va kod o'zgarganda build vaqtini solishtiring.",
      acceptanceCriteria: [
        "Qatlam keshlash qoidalarini biladi",
        "Instruksiyalarni o'zgarish chastotasi bo'yicha tartiblaydi"
      ],
      prerequisites: [
        "36.2"
      ]
    },
    {
      id: "36.5",
      title: "Volumes",
      description: [
        "Volume — Docker boshqaradigan doimiy saqlash joyi: konteyner o'chirilsa ham ma'lumot qoladi. DB ma'lumotlari, yuklangan fayllar (agar S3 ishlatilmasa), keshlar uchun. Named volume (`mysql-data`), anonim volume, `tmpfs` (xotirada, vaqtinchalik).",
        "",
        "Volume'lar backup qilinishi kerak; production'da DB odatda boshqariladigan servisda yoki alohida, ilova konteynerlari esa stateless. `docker volume ls`, `inspect`, `rm`, `prune` (ehtiyotkorlik bilan!).",
        "",
        "```bash",
        "docker volume create mysql-data",
        "docker run -d --name db -v mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=secret mysql:8.4",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "MySQL konteynerini named volume bilan ishga tushirib, konteynerni o'chirib qayta yarating va ma'lumot saqlanganini tekshiring.",
      acceptanceCriteria: [
        "Volume turlarini biladi",
        "Stateless ilova va stateful ma'lumotni ajratadi"
      ],
      prerequisites: [
        "36.1"
      ]
    },
    {
      id: "36.6",
      title: "Bind Mounts",
      description: [
        "Bind mount — host'dagi aniq papkani konteynerga ulash: lokal ishlab chiqishda kod o'zgarishlari darhol konteynerda ko'rinadi. `-v $(pwd):/var/www/html`.",
        "",
        "Muammolar: fayl egaligi va ruxsatlari (konteyner foydalanuvchisi UID host'nikidan farq qilishi — `storage/` ga yozib bo'lmaydi), macOS/Windows'da sekin I/O (WSL2 fayl tizimida ishlash yoki `:cached`), host'dagi `vendor/` konteynerdagini \"yopib qo'yishi\". Production'da bind mount emas — kod image ichida.",
        "",
        "```bash",
        "docker run --rm -it -v \"$PWD\":/var/www/html -u \"$(id -u):$(id -g)\" php:8.3-cli-alpine php artisan --version",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Lokal muhitda bind mount bilan ishlab, ruxsat muammosini UID moslash orqali hal qiling.",
      acceptanceCriteria: [
        "Bind mount va volume farqini biladi",
        "UID/ruxsat muammolarini hal qiladi"
      ],
      prerequisites: [
        "36.5"
      ]
    },
    {
      id: "36.7",
      title: "Networks",
      description: [
        "Docker tarmoqlari: `bridge` (default — bitta host'dagi konteynerlar; user-defined bridge'da konteynerlar bir-birini **nomi** bilan topadi — DNS), `host` (host tarmog'ini to'g'ridan-to'g'ri ishlatish), `none`, overlay (Swarm, bir nechta host).",
        "",
        "Laravel'da `DB_HOST=mysql` (servis nomi), `localhost` emas — konteyner ichida localhost — o'zi. Faqat kerakli servislarni bir tarmoqqa qo'ying (DB'ni frontend tarmog'iga emas).",
        "",
        "```bash",
        "docker network create app-net",
        "docker run -d --name mysql --network app-net mysql:8.4",
        "docker run --rm --network app-net alpine ping -c1 mysql",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "User-defined bridge tarmoqda ilova va DB konteynerlarini nomi bo'yicha bog'lang; `localhost` nega ishlamasligini ko'rsating.",
      acceptanceCriteria: [
        "Tarmoq turlarini va konteyner DNS'ini biladi",
        "Konteynerlararo ulanishni to'g'ri sozlaydi"
      ],
      prerequisites: [
        "36.1"
      ]
    },
    {
      id: "36.8",
      title: "Ports",
      description: [
        "`EXPOSE` — faqat hujjat (qaysi portni tinglaydi); haqiqiy nashr — `-p host:container` (`-p 8080:80`). Konteynerlar o'zaro bitta tarmoqda port nashr qilmasdan ichki port orqali gaplashadi — DB portini host'ga ochish faqat lokal debug uchun.",
        "",
        "Xavfsizlik: `-p 3306:3306` barcha interfeyslarda ochadi (Docker iptables qoidalari UFW'ni chetlab o'tishi mumkin!) — `-p 127.0.0.1:3306:3306` faqat lokal. Production'da faqat reverse proxy (80/443) tashqariga ochiq.",
        "",
        "```bash",
        "docker run -d -p 127.0.0.1:8080:80 nginx:alpine",
        "docker port <container>",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Lokal muhitda DB portini faqat 127.0.0.1 ga nashr qiling va tashqi interfeysdan yopiqligini tekshiring.",
      acceptanceCriteria: [
        "`EXPOSE` va `-p` farqini biladi",
        "Docker va firewall o'zaro ta'sirini tushunadi"
      ],
      prerequisites: [
        "36.7"
      ]
    },
    {
      id: "36.9",
      title: "Environment Variables",
      description: [
        "Konteyner konfiguratsiyasi environment o'zgaruvchilari orqali (12-factor): `-e APP_ENV=production`, `--env-file .env`, Compose'da `environment`/`env_file`. Dockerfile'dagi `ENV` — default qiymatlar (image'ga yoziladi), `ARG` — faqat build vaqtida.",
        "",
        "Qoidalar: sirlarni `ENV` yoki `ARG` bilan image'ga yozmang (`docker history` da ko'rinadi), runtime'da bering (env, Docker/K8s secrets, secret manager). Laravel `config:cache` ni build'da emas, konteyner ishga tushganda (yoki to'g'ri env bilan) bajaring — aks holda build vaqtidagi qiymatlar qotib qoladi.",
        "",
        "```bash",
        "docker run -d --env-file .env.production -e APP_ENV=production registry/app:sha",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Image'dagi barcha qattiq kodlangan sirlarni olib tashlab, runtime env orqali bering.",
      acceptanceCriteria: [
        "`ENV` va `ARG` farqini biladi",
        "Sirlarni image'ga yozmaydi"
      ],
      prerequisites: [
        "2.10"
      ]
    },
    {
      id: "36.10",
      title: "Health Checks",
      description: [
        "`HEALTHCHECK` — Docker konteyner sog'lomligini tekshiruvchi buyruq: `starting` → `healthy`/`unhealthy`. Orkestratorlar (Compose `depends_on: condition: service_healthy`, Swarm, ECS) shunga qarab trafik beradi yoki qayta ishga tushiradi.",
        "",
        "Laravel uchun: HTTP `/up` endpoint'i (Laravel 11+ da o'rnatilgan), FPM uchun `php-fpm-healthcheck`, queue worker uchun jarayon tekshiruvi. Health check yengil va tez bo'lishi kerak; tashqi bog'liqliklarni (DB) tekshirish — \"readiness\" uchun, \"liveness\" uchun emas (DB tushsa barcha konteynerlar qayta ishga tushmasligi uchun).",
        "",
        "```dockerfile",
        "HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \\",
        "  CMD wget -qO- http://127.0.0.1/up || exit 1",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ilova va queue worker konteynerlariga health check qo'shing va Compose'da `service_healthy` bilan bog'lang.",
      acceptanceCriteria: [
        "Health check holatlari va parametrlarini biladi",
        "Liveness va readiness farqini tushunadi"
      ],
      prerequisites: [
        "36.2"
      ]
    },
    {
      id: "36.11",
      title: "Container Logs",
      description: [
        "Konteyner log'lari — jarayonning stdout/stderr oqimi: `docker logs -f --tail 100 <c>`. Shuning uchun konteynerda log'larni faylga emas, stdout/stderr ga yozish kerak: Laravel `LOG_CHANNEL=stderr`, Nginx/FPM log'larini `/dev/stdout`ga yo'naltirish.",
        "",
        "Log driver'lar (`json-file` default — rotatsiya sozlansin: `max-size`, `max-file`; aks holda disk to'ladi), markaziy yig'ish (Loki, ELK, CloudWatch — `awslogs`, `fluentd` driver'lar). JSON formatli strukturali log'lar qidirishni osonlashtiradi.",
        "",
        "```json",
        "// /etc/docker/daemon.json",
        "{ \"log-driver\": \"json-file\", \"log-opts\": { \"max-size\": \"20m\", \"max-file\": \"5\" } }",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Laravel log'larini stderr'ga yo'naltiring va Docker log rotatsiyasini sozlang.",
      acceptanceCriteria: [
        "Konteynerda nega stdout'ga log yozilishini biladi",
        "Log rotatsiyasini sozlaydi"
      ],
      prerequisites: [
        "58.2"
      ]
    },
    {
      id: "36.12",
      title: "Resource Limits",
      description: [
        "Cheklovsiz konteyner host resurslarini tugatishi mumkin. Limitlar: `--memory=512m` (oshsa OOM killer jarayonni o'ldiradi), `--memory-reservation`, `--cpus=1.5`, `--pids-limit`. Compose'da `deploy.resources.limits`.",
        "",
        "PHP uchun: `memory_limit` × FPM `pm.max_children` konteyner xotira limitiga sig'ishi kerak; aks holda tasodifiy OOM'lar. `docker stats` — real vaqtda iste'mol. OOM holatini `docker inspect` (`OOMKilled: true`) va `dmesg` orqali aniqlash.",
        "",
        "```bash",
        "docker run -d --memory=1g --cpus=1 --pids-limit=200 registry/app:sha",
        "docker stats --no-stream",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "FPM sozlamalarini konteyner xotira limitiga moslab hisoblang va OOM holatini sun'iy yaratib aniqlang.",
      acceptanceCriteria: [
        "Xotira va CPU limitlarini sozlaydi",
        "FPM worker'lar va xotira limiti bog'liqligini hisoblaydi"
      ],
      prerequisites: [
        "42.4"
      ]
    },
    {
      id: "36.13",
      title: "Multi-Stage Builds",
      description: [
        "Multi-stage build — bir Dockerfile'da bir nechta `FROM`: build bosqichlarida kompilyator, Composer, Node va dev vositalari ishlatiladi, yakuniy image'ga faqat natija (`vendor/`, `public/build`) `COPY --from` bilan ko'chiriladi. Natija — kichik, xavfsiz production image.",
        "",
        "Laravel uchun odatiy bosqichlar: `composer` (PHP dependency'lar), `node` (Vite build), `runtime` (PHP-FPM + kod + natijalar). `--target` bilan dev image'ni ham shu fayldan olish mumkin.",
        "",
        "```dockerfile",
        "FROM composer:2 AS vendor",
        "COPY composer.* ./",
        "RUN composer install --no-dev --no-scripts --prefer-dist",
        "",
        "FROM node:22-alpine AS assets",
        "COPY package*.json vite.config.js ./",
        "COPY resources ./resources",
        "RUN npm ci && npm run build",
        "",
        "FROM php:8.3-fpm-alpine AS runtime",
        "COPY . /var/www/html",
        "COPY --from=vendor /app/vendor /var/www/html/vendor",
        "COPY --from=assets /public/build /var/www/html/public/build",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Laravel uchun 3 bosqichli Dockerfile yozing va yakuniy image hajmini bir bosqichli bilan solishtiring.",
      acceptanceCriteria: [
        "Multi-stage build afzalliklarini biladi",
        "Build vositalarini yakuniy image'dan chiqaradi"
      ],
      prerequisites: [
        "36.4"
      ]
    },
    {
      id: "36.14",
      title: "Image Optimization",
      description: [
        "Kichik image — tez pull/deploy, kam hujum yuzasi. Usullar: kichik asos (`alpine`, `-slim`, distroless), multi-stage, keraksiz paketlarni o'rnatmaslik (`--no-install-recommends`, `apk --no-cache`), bir `RUN` ichida o'rnatish va tozalash (kesh, build dependency'larni o'chirish — `apk del .build-deps`), `.dockerignore`, dev dependency'larsiz (`--no-dev`).",
        "",
        "Tahlil: `docker history`, `dive` (qatlamlar bo'yicha hajm va isrof). Alpine (musl) ba'zi PHP kengaytmalari yoki performance bilan farq qilishi mumkin — sinab ko'ring.",
        "",
        "```dockerfile",
        "RUN apk add --no-cache --virtual .build-deps $PHPIZE_DEPS \\",
        " && pecl install redis && docker-php-ext-enable redis \\",
        " && apk del .build-deps",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "`dive` bilan image'ni tahlil qilib, hajmni kamida 30% kamaytiring.",
      acceptanceCriteria: [
        "Image hajmini kamaytirish usullarini biladi",
        "Qatlamlar bo'yicha isrofni tahlil qiladi"
      ],
      prerequisites: [
        "36.13"
      ]
    },
    {
      id: "36.15",
      title: "Non-Root Containers",
      description: [
        "Default holatda konteyner jarayoni root sifatida ishlaydi — konteynerdan qochish zaifligida host'ga root huquq. Yechim: `USER www-data` (yoki maxsus UID), kerakli papkalarga (`storage/`, `bootstrap/cache/`) ruxsat, 1024 dan past portlarni tinglamaslik (Nginx 8080 da).",
        "",
        "Qo'shimcha: read-only root fayl tizimi (`--read-only` + yoziladigan `tmpfs`/volume'lar), `--cap-drop=ALL`, `no-new-privileges`. Kubernetes'da `runAsNonRoot: true`.",
        "",
        "```dockerfile",
        "RUN chown -R www-data:www-data storage bootstrap/cache",
        "USER www-data",
        "```",
        "```bash",
        "docker run --read-only --tmpfs /tmp --cap-drop=ALL --security-opt no-new-privileges registry/app:sha",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Ilova konteynerini non-root foydalanuvchi va read-only fayl tizimi bilan ishlaydigan qiling.",
      acceptanceCriteria: [
        "Root konteyner xavfini tushunadi",
        "Non-root va qo'shimcha cheklovlarni qo'llaydi"
      ],
      prerequisites: [
        "38.3"
      ]
    },
    {
      id: "36.16",
      title: "Container Security",
      description: [
        "Konteyner xavfsizligi qatlamlari: ishonchli va qotirilgan asos image'lar (aniq tag yoki digest — `php:8.3.12-fpm-alpine@sha256:...`), image zaifliklarini skanerlash (Trivy, Grype, Docker Scout) CI'da, non-root, minimal paketlar, sirlar image'da yo'q, image imzolash (cosign), runtime cheklovlari (capabilities, seccomp, AppArmor), Docker socket'ni konteynerga ulamaslik (`/var/run/docker.sock` — host'ga to'liq kirish!), muntazam qayta build (yangi patch'lar uchun).",
        "",
        "```bash",
        "trivy image --severity HIGH,CRITICAL --exit-code 1 registry/app:sha",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "CI'ga Trivy skanerini qo'shing va topilgan HIGH/CRITICAL zaifliklarni asos image'ni yangilab bartaraf eting.",
      acceptanceCriteria: [
        "Konteyner xavfsizligi qatlamlarini biladi",
        "Docker socket ulashning xavfini tushunadi"
      ],
      prerequisites: [
        "36.15"
      ]
    },
    {
      id: "36.17",
      title: "Registry",
      description: [
        "Registry — image'larni saqlash va tarqatish: Docker Hub, GitHub Container Registry (ghcr.io), GitLab Registry, AWS ECR, self-hosted (Harbor). Image nomi: `registry/namespace/name:tag`.",
        "",
        "Tag strategiyasi: commit SHA (o'zgarmas — deploy uchun), semver (`2.4.0`), `latest` dan production'da qochish (noaniq). Digest (`@sha256:`) — eng aniq havola. Kirish nazorati, zaiflik skanerlash, saqlash muddati/tozalash siyosati, pull uchun minimal ruxsatli token.",
        "",
        "```bash",
        "docker tag app:local ghcr.io/acme/app:3f9c2ab",
        "docker push ghcr.io/acme/app:3f9c2ab",
        "docker pull ghcr.io/acme/app@sha256:4b1e...",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Image'ni SHA va semver tag'lari bilan registry'ga push qiling va serverda digest bo'yicha pull qiling.",
      acceptanceCriteria: [
        "Tag strategiyasini va `latest` xavfini biladi",
        "Digest bo'yicha havolani ishlatadi"
      ],
      prerequisites: [
        "36.1"
      ]
    },
    {
      id: "36.18",
      title: "Debugging Containers",
      description: [
        "Konteyner muammolarini tashxislash: `docker logs` (ilova xatolari), `docker exec -it <c> sh` (ichiga kirish), `docker inspect` (konfiguratsiya, env, mount, tarmoq, `OOMKilled`, exit code), `docker stats` (resurslar), `docker events`, `docker cp` (fayllarni olish). Ishga tushmaydigan konteyner: `docker run --rm -it --entrypoint sh image` bilan ichini tekshirish.",
        "",
        "Tipik muammolar: exit code 137 (OOM yoki SIGKILL), 127 (buyruq topilmadi), ruxsat xatolari, noto'g'ri `DB_HOST`, port band, health check muvaffaqiyatsiz. Distroless image'larda shell yo'q — `docker debug` yoki ephemeral debug konteyner.",
        "",
        "```bash",
        "docker inspect --format '{{.State.ExitCode}} {{.State.OOMKilled}}' app",
        "docker run --rm -it --entrypoint sh registry/app:sha",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ataylab buzilgan konteyner (noto'g'ri env, OOM, ruxsat) muammolarini diagnostika vositalari bilan toping.",
      acceptanceCriteria: [
        "Diagnostika buyruqlarini biladi",
        "Exit kodlar ma'nosini tushunadi"
      ],
      prerequisites: [
        "36.11"
      ]
    },
    {
      id: "36.19",
      title: "Docker Compose bilan ishlash",
      description: [
        "Docker Compose — ko'p konteynerli muhitni bitta YAML faylda tasvirlash va boshqarish: ilova, Nginx, MySQL, Redis, queue worker, Mailpit. Lokal ishlab chiqish uchun asosiy vosita; Laravel Sail — Compose asosidagi tayyor muhit.",
        "",
        "Asosiy buyruqlar: `docker compose up -d`, `down`, `ps`, `logs -f app`, `exec app php artisan migrate`, `build`. Batafsil — Docker Compose bo'limida.",
        "",
        "```yaml",
        "services:",
        "  app:   { build: ., volumes: ['.:/var/www/html'], depends_on: [mysql, redis] }",
        "  nginx: { image: nginx:alpine, ports: ['8080:80'], volumes: ['./docker/nginx.conf:/etc/nginx/conf.d/default.conf'] }",
        "  mysql: { image: mysql:8.4, environment: { MYSQL_DATABASE: app, MYSQL_ROOT_PASSWORD: secret } }",
        "  redis: { image: redis:7-alpine }",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Laravel loyihasi uchun app, nginx, mysql, redis va queue servisli lokal Compose muhitini yarating.",
      acceptanceCriteria: [
        "Compose'ning maqsadini va asosiy buyruqlarini biladi",
        "Laravel uchun to'liq lokal muhitni ko'taradi"
      ],
      prerequisites: [
        "docker-compose"
      ]
    }
  ]
});
