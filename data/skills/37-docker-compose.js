/* 37 · Docker Compose
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 37,
  slug: "docker-compose",
  title: "Docker Compose",
  group: "infra",
  description: "Docker Compose — ko'p konteynerli ilovani (Laravel, Nginx, DB, Redis, queue, scheduler) bitta deklarativ faylda tasvirlash va boshqarish vositasi. U lokal ishlab chiqish va CI muhitining standarti, kichik loyihalarda esa oddiy production deploy uchun ham ishlatiladi. Senior dasturchi Compose'ni toza, takrorlanadigan va xavfsiz sozlaydi hamda uning production'dagi cheklovlarini biladi.",
  subskills: [
    {
      id: "37.1",
      title: "Compose YAML",
      description: [
        "`compose.yaml` (yoki `docker-compose.yml`) — top-level kalitlar: `services`, `networks`, `volumes`, `secrets`, `configs`, `name`. Compose Specification (v2 CLI — `docker compose`, eski `docker-compose` v1 emas); `version:` kaliti endi kerak emas.",
        "",
        "YAML anchor va `x-` extension'lar bilan takrorlanishni kamaytirish (masalan, app, queue va scheduler bir xil image va env'dan foydalanadi). `${VAR:-default}` — `.env` dan o'zgaruvchi interpolatsiyasi.",
        "",
        "```yaml",
        "x-app: &app",
        "  build: .",
        "  env_file: .env",
        "  volumes: ['.:/var/www/html']",
        "",
        "services:",
        "  app:    { <<: *app }",
        "  queue:  { <<: *app, command: php artisan queue:work --tries=3 }",
        "  cron:   { <<: *app, command: php artisan schedule:work }",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "app, queue va scheduler servislarini YAML anchor bilan takrorlanmasdan tasvirlang.",
      acceptanceCriteria: [
        "Compose fayl tuzilmasini biladi",
        "Anchor va interpolatsiya bilan takrorlanishni kamaytiradi"
      ],
      prerequisites: [
        "36.19"
      ]
    },
    {
      id: "37.2",
      title: "Services",
      description: [
        "Servis — bir xil konfiguratsiyadagi konteyner(lar): `image` yoki `build`, `command`, `entrypoint`, `environment`, `ports`, `volumes`, `depends_on`, `restart`, `healthcheck`, `deploy.replicas`/`resources`, `user`, `working_dir`.",
        "",
        "Laravel uchun odatiy servislar: `app` (php-fpm), `nginx`, `mysql`/`pgsql`, `redis`, `queue` (worker), `scheduler`, `mailpit`, ixtiyoriy `meilisearch`, `minio`. Bitta servis — bitta vazifa; bir konteynerda supervisor bilan bir nechta jarayon — oxirgi chora.",
        "",
        "```yaml",
        "services:",
        "  nginx:",
        "    image: nginx:1.27-alpine",
        "    ports: ['8080:80']",
        "    volumes: ['./docker/nginx.conf:/etc/nginx/conf.d/default.conf:ro', '.:/var/www/html:ro']",
        "    depends_on: [app]",
        "    restart: unless-stopped",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Laravel uchun nginx, app, queue, scheduler, mysql, redis va mailpit servislarini yozing.",
      acceptanceCriteria: [
        "Asosiy servis kalitlarini biladi",
        "Bitta servis — bitta vazifa tamoyiliga amal qiladi"
      ],
      prerequisites: [
        "37.1"
      ]
    },
    {
      id: "37.3",
      title: "Networks",
      description: [
        "Compose avtomatik ravishda loyiha uchun default tarmoq yaratadi — servislar bir-birini nomi bilan topadi (`DB_HOST=mysql`). Qo'shimcha tarmoqlar segmentatsiya uchun: masalan, `frontend` (nginx ↔ app) va `backend` (app ↔ mysql, redis) — nginx DB'ga kira olmaydi. `internal: true` — tashqi internetsiz tarmoq.",
        "",
        "Servis `aliases`, boshqa Compose loyihalari bilan umumiy tashqi tarmoq (`external: true`).",
        "",
        "```yaml",
        "services:",
        "  nginx: { networks: [frontend] }",
        "  app:   { networks: [frontend, backend] }",
        "  mysql: { networks: [backend] }",
        "networks:",
        "  frontend: {}",
        "  backend: { internal: true }",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Servislarni frontend va backend tarmoqlariga ajratib, nginx DB'ga ulana olmasligini tekshiring.",
      acceptanceCriteria: [
        "Default tarmoq va servis DNS'ini biladi",
        "Tarmoq segmentatsiyasini qo'llaydi"
      ],
      prerequisites: [
        "36.7"
      ]
    },
    {
      id: "37.4",
      title: "Volumes",
      description: [
        "Compose'da volume'lar: named (`mysql-data:/var/lib/mysql` — top-level `volumes:` da e'lon), bind mount (`./:/var/www/html` — lokal kod), `tmpfs`, read-only (`:ro`). Named volume'lar `docker compose down` da saqlanadi, `down -v` da o'chadi (ehtiyot bo'ling — DB ma'lumoti!).",
        "",
        "Lokal ishlab chiqishda `vendor/` va `node_modules/` uchun alohida named volume yoki host'dagi papkani ishlatish — platformaga xos binar va tezlik masalalari.",
        "",
        "```yaml",
        "services:",
        "  mysql:",
        "    volumes: ['mysql-data:/var/lib/mysql']",
        "volumes:",
        "  mysql-data: {}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "DB uchun named volume sozlang, `down` va `down -v` farqini amalda ko'rsating.",
      acceptanceCriteria: [
        "Named volume va bind mount'ni Compose'da ishlatadi",
        "`down -v` xavfini biladi"
      ],
      prerequisites: [
        "36.5"
      ]
    },
    {
      id: "37.5",
      title: "Environment Files",
      description: [
        "`.env` (Compose fayl yonida) — Compose fayldagi `${VAR}` interpolatsiyasi uchun; `env_file:` — konteynerga o'zgaruvchilar yuklash; `environment:` — aniq qiymatlar (ustunlik qiladi). Laravel `.env` ni ham `env_file` sifatida ulash mumkin.",
        "",
        "Muhit bo'yicha: `--env-file .env.staging`, alohida `env_file` ro'yxatlari. Sirlar git'ga tushmasin (`.env` ignore, `.env.example` commit). Ustunlik tartibini bilish — \"nega o'zgaruvchi qo'llanmadi\" muammolarining kaliti (`docker compose config` natijaviy konfiguratsiyani ko'rsatadi).",
        "",
        "```yaml",
        "services:",
        "  app:",
        "    env_file: [.env]",
        "    environment:",
        "      DB_HOST: mysql",
        "      REDIS_HOST: redis",
        "```",
        "```bash",
        "docker compose config | less   # yakuniy hisoblangan konfiguratsiya",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Interpolatsiya va konteyner env'ini ajrating; `docker compose config` bilan yakuniy qiymatlarni tekshiring.",
      acceptanceCriteria: [
        "`.env`, `env_file` va `environment` farqini biladi",
        "Natijaviy konfiguratsiyani tekshira oladi"
      ],
      prerequisites: [
        "36.9"
      ]
    },
    {
      id: "37.6",
      title: "Service Dependencies",
      description: [
        "`depends_on` — ishga tushirish tartibi: `app` `mysql` dan keyin. Oddiy shaklda faqat konteyner **ishga tushganini** kutadi, servis **tayyor** ekanini emas (MySQL ishga tushishi soniyalar oladi). To'g'ri shakl — `condition: service_healthy` (health check bilan) yoki `service_completed_successfully` (migratsiya kabi bir martalik job uchun).",
        "",
        "Ilova baribir ulanish xatolariga chidamli bo'lishi kerak (qayta urinish) — tarmoq va servislar keyinroq ham uzilishi mumkin.",
        "",
        "```yaml",
        "services:",
        "  migrate:",
        "    <<: *app",
        "    command: php artisan migrate --force",
        "    depends_on: { mysql: { condition: service_healthy } }",
        "  app:",
        "    depends_on:",
        "      mysql:   { condition: service_healthy }",
        "      migrate: { condition: service_completed_successfully }",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Migratsiya servisini qo'shib, app faqat DB sog'lom va migratsiya tugagandan keyin ishga tushishini ta'minlang.",
      acceptanceCriteria: [
        "`depends_on` shakllari farqini biladi",
        "Ilovani ulanish xatolariga chidamli qiladi"
      ],
      prerequisites: [
        "37.7"
      ]
    },
    {
      id: "37.7",
      title: "Health Checks",
      description: [
        "Compose'da `healthcheck`: `test`, `interval`, `timeout`, `retries`, `start_period`. MySQL — `mysqladmin ping`, PostgreSQL — `pg_isready`, Redis — `redis-cli ping`, ilova — HTTP `/up`. `docker compose ps` holatni ko'rsatadi.",
        "",
        "Health check'lar `depends_on: condition: service_healthy` uchun zarur va muammolarni tez aniqlashga yordam beradi. `start_period` sekin ishga tushadigan servislar uchun noto'g'ri \"unhealthy\" holatining oldini oladi.",
        "",
        "```yaml",
        "mysql:",
        "  image: mysql:8.4",
        "  healthcheck:",
        "    test: [\"CMD\", \"mysqladmin\", \"ping\", \"-h\", \"localhost\"]",
        "    interval: 5s",
        "    timeout: 3s",
        "    retries: 20",
        "    start_period: 20s",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Barcha infratuzilma servislariga health check qo'shing va `docker compose ps` da holatini kuzating.",
      acceptanceCriteria: [
        "Health check parametrlarini sozlaydi",
        "Servisga mos tekshiruv buyrug'ini tanlaydi"
      ],
      prerequisites: [
        "36.10"
      ]
    },
    {
      id: "37.8",
      title: "`depends_on` Readiness",
      description: [
        "\"Started\" va \"ready\" farqi: konteyner jarayoni ishga tushgan bo'lishi mumkin, lekin DB hali ulanish qabul qilmayotgan, migratsiya bajarilmagan, kesh isimagan bo'ladi. Compose yechimlari: `condition: service_healthy`, `service_completed_successfully`, `restart: true` (dependency qayta ishga tushganda bog'liq servisni ham).",
        "",
        "Ilova tomonida: entrypoint skriptida DB tayyorligini kutish (`php artisan db:monitor` yoki sikl bilan ulanishni tekshirish), ulanish xatolarida qayta urinish. Production orkestratorlarda readiness probe'lar bilan bir xil g'oya.",
        "",
        "```bash",
        "# docker/entrypoint.sh",
        "until php artisan db:show >/dev/null 2>&1; do echo \"DB kutilmoqda...\"; sleep 2; done",
        "exec \"$@\"",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Entrypoint skriptiga DB tayyorligini kutish mantiqini qo'shing va sovuq start'da sinang.",
      acceptanceCriteria: [
        "Started va ready farqini tushunadi",
        "Readiness'ni ham Compose, ham ilova darajasida ta'minlaydi"
      ],
      prerequisites: [
        "37.6"
      ]
    },
    {
      id: "37.9",
      title: "Profiles",
      description: [
        "Profile'lar — ixtiyoriy servislarni guruhlash: `profiles: [debug]` bo'lgan servis faqat `docker compose --profile debug up` bilan ishga tushadi. Misollar: `tools` (phpMyAdmin, Redis Insight), `search` (Meilisearch), `queue` (worker'lar — frontend dasturchiga kerak emas), `observability` (Grafana).",
        "",
        "Bu bitta Compose faylda turli ehtiyojlarni qondiradi va default muhitni yengil saqlaydi.",
        "",
        "```yaml",
        "services:",
        "  phpmyadmin:",
        "    image: phpmyadmin",
        "    profiles: [tools]",
        "    ports: ['8081:80']",
        "```",
        "```bash",
        "docker compose --profile tools up -d",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Debug vositalari va qidiruv servisini profile'larga ajrating; default `up` yengil bo'lsin.",
      acceptanceCriteria: [
        "Profile'lar bilan ixtiyoriy servislarni boshqaradi",
        "Turli ishlab chiquvchi ehtiyojlarini hisobga oladi"
      ],
      prerequisites: [
        "37.2"
      ]
    },
    {
      id: "37.10",
      title: "Overrides",
      description: [
        "Override fayllar — asosiy konfiguratsiyani muhitga qarab o'zgartirish: `compose.yaml` (umumiy) + `compose.override.yaml` (lokal, avtomatik yuklanadi — bind mount, debug portlari, Xdebug) + `compose.prod.yaml` (`-f` bilan aniq: `docker compose -f compose.yaml -f compose.prod.yaml up`). Ro'yxat kalitlari (ports, volumes) birlashtiriladi, skalyarlar almashtiriladi.",
        "",
        "`include:` (Compose 2.20+) — boshqa Compose fayllarni modul sifatida ulash. `extends:` — servis konfiguratsiyasini meros qilish.",
        "",
        "```yaml",
        "# compose.override.yaml (faqat lokal)",
        "services:",
        "  app:",
        "    volumes: ['.:/var/www/html']",
        "    environment: { XDEBUG_MODE: debug }",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Asosiy, lokal override va production fayllariga ajratilgan Compose tuzilmasini yarating.",
      acceptanceCriteria: [
        "Override birlashtirish qoidalarini biladi",
        "Muhitlar bo'yicha konfiguratsiyani ajratadi"
      ],
      prerequisites: [
        "37.1"
      ]
    },
    {
      id: "37.11",
      title: "Build Configuration",
      description: [
        "`build:` sozlamalari: `context`, `dockerfile`, `target` (multi-stage'dan bosqich — lokal uchun `dev`, production uchun `runtime`), `args` (build argumentlari — PHP versiyasi, UID), `cache_from`, `platforms`. `image:` bilan birga — build natijasiga nom berish.",
        "",
        "Lokal uchun `target: dev` (Xdebug, dev vositalar), CI/production uchun alohida build va registry'dan image. `docker compose build --pull` — asos image'larni yangilash.",
        "",
        "```yaml",
        "services:",
        "  app:",
        "    build:",
        "      context: .",
        "      target: dev",
        "      args: { PHP_VERSION: '8.3', UID: '${UID:-1000}' }",
        "    image: acme/app:dev",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Multi-stage Dockerfile'ning `dev` bosqichini Compose orqali UID argumenti bilan build qiling.",
      acceptanceCriteria: [
        "Build sozlamalarini biladi",
        "Target orqali dev va prod image'larni ajratadi"
      ],
      prerequisites: [
        "36.13"
      ]
    },
    {
      id: "37.12",
      title: "Secrets",
      description: [
        "Compose `secrets:` — maxfiy qiymatlarni fayl sifatida konteynerga `/run/secrets/<nom>` ga ulash (env o'zgaruvchidan xavfsizroq: `docker inspect` va jarayon muhitida ko'rinmaydi). Manba — fayl yoki env. Rasmiy image'lar `_FILE` suffiksli o'zgaruvchilarni qo'llab-quvvatlaydi (`MYSQL_ROOT_PASSWORD_FILE`).",
        "",
        "Laravel'da secret fayldan o'qish uchun entrypoint'da env'ga yuklash yoki config'da `file_get_contents`. Swarm/K8s'da secret'lar shifrlangan holda saqlanadi; oddiy Compose'da — faqat fayl ulash.",
        "",
        "```yaml",
        "services:",
        "  mysql:",
        "    environment: { MYSQL_ROOT_PASSWORD_FILE: /run/secrets/db_root }",
        "    secrets: [db_root]",
        "secrets:",
        "  db_root: { file: ./secrets/db_root.txt }",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "DB parolini env o'rniga Compose secret orqali uzating va `docker inspect` da ko'rinmasligini tekshiring.",
      acceptanceCriteria: [
        "Secret'larning env'dan afzalligini biladi",
        "`_FILE` konvensiyasidan foydalanadi"
      ],
      prerequisites: [
        "36.9"
      ]
    },
    {
      id: "37.13",
      title: "Persistent Database Storage",
      description: [
        "DB ma'lumotlari named volume'da bo'lishi shart — aks holda konteyner qayta yaratilganda yo'qoladi. Qo'shimcha: DB image versiyasini qotirish (`mysql:8.4`, `latest` emas — major versiya o'zgarsa ma'lumot formati mos kelmasligi mumkin), backup (`docker compose exec mysql mysqldump ...` yoki alohida backup servisi), testlar uchun `tmpfs` (tez, vaqtinchalik).",
        "",
        "Boshlang'ich ma'lumot: `/docker-entrypoint-initdb.d/` ga SQL yoki skript — faqat bo'sh volume'da bir marta ishlaydi.",
        "",
        "```yaml",
        "mysql:",
        "  image: mysql:8.4",
        "  volumes:",
        "    - mysql-data:/var/lib/mysql",
        "    - ./docker/mysql/init.sql:/docker-entrypoint-initdb.d/init.sql:ro",
        "```",
        "```bash",
        "docker compose exec mysql mysqldump -uroot -p\"$DB_ROOT\" app > backup.sql",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "DB servisi uchun named volume, qotirilgan versiya va backup buyrug'ini sozlang; restore'ni sinang.",
      acceptanceCriteria: [
        "DB ma'lumotini volume'da saqlaydi",
        "Image versiyasini qotirish zarurligini biladi"
      ],
      prerequisites: [
        "37.4"
      ]
    },
    {
      id: "37.14",
      title: "Service Discovery",
      description: [
        "Compose tarmog'ida servislar o'rnatilgan DNS orqali nomi bilan topiladi: `mysql`, `redis`, `app:9000` (Nginx `fastcgi_pass app:9000`). Bir servisning bir nechta replikasi bo'lsa, DNS ularning IP'larini qaytaradi (oddiy round-robin).",
        "",
        "Laravel konfiguratsiyasida host'lar servis nomlari: `DB_HOST=mysql`, `REDIS_HOST=redis`, `MAIL_HOST=mailpit`. Host'dan konteynerga — nashr qilingan port orqali (`localhost:8080`); konteynerdan host'ga — `host.docker.internal` (Xdebug uchun).",
        "",
        "```nginx",
        "location ~ \\.php$ {",
        "    fastcgi_pass app:9000;",
        "    include fastcgi_params;",
        "    fastcgi_param SCRIPT_FILENAME /var/www/html/public$fastcgi_script_name;",
        "}",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Nginx → PHP-FPM, Laravel → MySQL/Redis/Mailpit ulanishlarini servis nomlari bilan sozlang.",
      acceptanceCriteria: [
        "Compose DNS mexanizmini biladi",
        "Host va konteyner o'rtasidagi ulanish yo'llarini tushunadi"
      ],
      prerequisites: [
        "37.3"
      ]
    },
    {
      id: "37.15",
      title: "Local Development Environment",
      description: [
        "Laravel uchun yaxshi lokal Compose muhiti: bitta buyruq bilan ishga tushadi (`docker compose up -d`), kod bind mount orqali, Xdebug ixtiyoriy (env bilan yoqiladi), Mailpit (email'larni ko'rish), seed'lar, Makefile/skriptlar (`make up`, `make test`, `make shell`), host UID bilan fayl ruxsatlari, tez fayl tizimi (WSL2'da loyiha Linux fayl tizimida).",
        "",
        "Laravel Sail — tayyor muqobil (`sail up`, `sail artisan`). README'da \"5 daqiqada ishga tushirish\" yo'riqnomasi.",
        "",
        "```makefile",
        "up:    ; docker compose up -d",
        "shell: ; docker compose exec app sh",
        "test:  ; docker compose exec app php artisan test",
        "fresh: ; docker compose exec app php artisan migrate:fresh --seed",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Yangi jamoa a'zosi 5 daqiqada ishga tushira oladigan Compose muhiti va Makefile tayyorlang.",
      acceptanceCriteria: [
        "To'liq lokal muhitni Compose bilan quradi",
        "Onboarding'ni soddalashtiradi"
      ],
      prerequisites: [
        "37.2"
      ]
    },
    {
      id: "37.16",
      title: "Logs va Troubleshooting",
      description: [
        "Diagnostika buyruqlari: `docker compose ps` (holat, health), `logs -f --tail=100 app` (bir yoki bir nechta servis), `exec app sh`, `config` (yakuniy konfiguratsiya), `top`, `events`, `restart app`, `up --force-recreate`, `build --no-cache`.",
        "",
        "Tipik muammolar: port band (`address already in use`), ruxsatlar (`storage/` ga yozib bo'lmaydi), `DB_HOST=localhost` xatosi, eskirgan image (qayta build), volume'dagi eski DB holati, `.env` o'zgarishi qo'llanmagan (konteynerni qayta yaratish kerak, restart emas).",
        "",
        "```bash",
        "docker compose ps",
        "docker compose logs -f --tail=200 app queue",
        "docker compose up -d --force-recreate app",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "5 ta tipik Compose muammosini sun'iy yaratib, diagnostika va yechimlar qo'llanmasini yozing.",
      acceptanceCriteria: [
        "Compose diagnostika buyruqlarini biladi",
        "Restart va recreate farqini tushunadi"
      ],
      prerequisites: [
        "36.18"
      ]
    },
    {
      id: "37.17",
      title: "Production Limitations",
      description: [
        "Compose production uchun cheklangan: bitta host (yuqori mavjudlik yo'q), avtomatik failover va masshtablash yo'q, rolling update yo'q (deploy paytida qisqa uzilish), secret boshqaruvi sodda, resurs rejalashtirish yo'q, monitoring o'zingizda.",
        "",
        "Kichik loyihalar uchun qabul qilinadi (bitta server, `restart: unless-stopped`, reverse proxy, backup, monitoring). O'sish bilan: Docker Swarm (Compose sintaksisiga yaqin), Kubernetes, yoki boshqariladigan konteyner platformalari (ECS, Cloud Run, Fly.io), Laravel Cloud/Forge kabi PaaS.",
        "",
        "```text",
        "Compose:  1 server, oddiy, arzon, SPOF",
        "Swarm:    ko'p server, rolling update, oddiy",
        "K8s/ECS:  to'liq orkestratsiya, murakkab",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Loyihangiz uchun Compose'ning production'dagi xavflarini baholab, o'sish bosqichida o'tish rejasini yozing.",
      acceptanceCriteria: [
        "Compose'ning production cheklovlarini biladi",
        "Muqobil orkestratsiya variantlarini taqqoslaydi"
      ],
      prerequisites: [
        "68.2"
      ]
    }
  ]
});
