/* Chuqur dars: 28.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("28.7", {
  "lesson": [
    "### Testcontainers g'oyasi",
    "Testcontainers — test jarayoni uchun haqiqiy servislarni (MySQL, PostgreSQL, Redis, RabbitMQ, MinIO) Docker konteynerlarida avtomatik ko'tarib, test tugagach o'chirish yondashuvi. Maqsad: production'ga yaqin muhit, har ishga tushishda toza holat va ishlab chiquvchi mashinasiga servislarni qo'lda o'rnatmaslik.",
    "",
    "### Afzalliklari",
    "- **Haqiqiy servis**: mock yoki SQLite o'rniga haqiqiy engine bilan test.",
    "- **Takrorlanuvchanlik**: versiya konteyner tasvirida qotirilgan (`mysql:8.4`), \"mening mashinamda ishlaydi\" muammosi kamayadi.",
    "- **Izolyatsiya**: har test jarayoni o'z konteynerlari bilan ishlaydi, umumiy dev DB'ga tegmaydi.",
    "- **Yengil CI**: konteyner CI'da ham bir xil ko'tariladi.",
    "",
    "### PHP ekotizimida",
    "Java va Node'dagidek yetuk standart yo'q, lekin variantlar bor:",
    "- `testcontainers/testcontainers` kabi paketlar test kodidan konteynerni boshqaradi.",
    "- Oddiyroq va ko'p ishlatiladigani: `docker-compose.test.yml` fayli va `docker compose up -d --wait` bilan servislarni ko'tarish, testdan keyin `down`.",
    "- CI'da service container'lar (GitHub Actions, GitLab CI) xuddi shu rolni bajaradi.",
    "",
    "### Tezlik muammosi",
    "Konteyner ishga tushishi bir necha soniya vaqt oladi. Har test uchun konteyner ko'tarish juda sekin. Standart yondashuv: konteynerni **butun test jarayoni uchun bir marta** ko'taring, testlar orasida esa tranzaksiya rollback yoki `flushdb`/truncate bilan tozalang. DB uchun `tmpfs` (xotirada saqlash) ishlatish tezlikni sezilarli oshiradi, chunki disk yozuvi kerak emas.",
    "",
    "### Tayyorlikni kutish",
    "Konteyner \"ishga tushdi\" va \"qabul qilishga tayyor\" bir narsa emas. MySQL ichki initsializatsiyani tugatguncha ulanishni rad etadi. `healthcheck` belgilang va `--wait` bilan kuting, aks holda testlar tasodifan yiqiladi.",
    "",
    "### Qachon kerak emas",
    "Kichik loyihada bitta DB va bitta Redis bo'lsa, `docker-compose.test.yml` yetarli. To'liq Testcontainers kutubxonasi ko'p servisli, dinamik portli, parallel jarayonli murakkab setup'da foyda beradi."
  ],
  "examples": [
    {
      "title": "Test servislari uchun compose",
      "lang": "yaml",
      "code": [
        "# docker-compose.test.yml",
        "services:",
        "  mysql:",
        "    image: mysql:8.4",
        "    environment:",
        "      MYSQL_DATABASE: app_test",
        "      MYSQL_ROOT_PASSWORD: secret",
        "    tmpfs:",
        "      - /var/lib/mysql",
        "    ports: [\"3307:3306\"]",
        "    healthcheck:",
        "      test: [\"CMD\", \"mysqladmin\", \"ping\", \"-h\", \"127.0.0.1\", \"-psecret\"]",
        "      interval: 3s",
        "      retries: 20",
        "  redis:",
        "    image: redis:7-alpine",
        "    ports: [\"6380:6379\"]",
        "    healthcheck:",
        "      test: [\"CMD\", \"redis-cli\", \"ping\"]",
        "      interval: 3s",
        "      retries: 20"
      ],
      "note": "tmpfs DB'ni xotirada saqlaydi, healthcheck esa tayyorlikni bildiradi."
    },
    {
      "title": "Ishga tushirish va testlash",
      "lang": "bash",
      "code": [
        "docker compose -f docker-compose.test.yml up -d --wait",
        "DB_PORT=3307 REDIS_PORT=6380 php artisan test --testsuite=Integration",
        "docker compose -f docker-compose.test.yml down -v"
      ],
      "note": "--wait barcha servislar healthy bo'lguncha kutadi."
    }
  ],
  "pitfalls": [
    "Har test uchun yangi konteyner ko'tarish: test to'plami bir necha barobar sekinlashadi.",
    "Tayyorlikni kutmaslik: konteyner ishga tushgan, lekin DB hali ulanishni qabul qilmaydi, testlar tasodifan yiqiladi.",
    "Konteyner tasvirida `latest` ishlatish: versiya o'zgarib, kutilmagan farq paydo bo'ladi. Aniq versiya yozing.",
    "Servis portlarini qattiq belgilash: lokal dev servislari bilan to'qnashadi. Alohida port yoki dinamik portdan foydalaning."
  ]
});
