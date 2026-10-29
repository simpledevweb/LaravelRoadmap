/* Chuqur dars: 28.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("28.15", {
  "lesson": [
    "### Integratsion testlar CI'da",
    "CI'da integratsion testlar haqiqiy servislarga muhtoj. Eng oddiy yo'l — CI platformasining **service container**'lari: DB, Redis, RabbitMQ ishlayotgan konteyner sifatida testlar bilan birga ko'tariladi.",
    "",
    "### Tayyorlikni kutish",
    "Konteyner ishga tushishi bilan servis tayyor bo'lmaydi. MySQL ichki initsializatsiyadan keyingina ulanishni qabul qiladi. Shuning uchun **health check** belgilanadi (`--health-cmd`, `--health-interval`, `--health-retries`) va CI test bosqichi servislar `healthy` bo'lguncha kutadi. Aks holda testlar tasodifan \"connection refused\" bilan yiqiladi.",
    "",
    "### Bosqichlarni ajratish",
    "- **Birinchi bosqich**: lint, statik tahlil (PHPStan), unit testlar. Tez, servis talab qilmaydi.",
    "- **Ikkinchi bosqich**: integratsion testlar servislar bilan. Sekinroq.",
    "- **Uchinchi bosqich**: end-to-end va sandbox testlari. Eng sekin, kamroq.",
    "",
    "Unit bosqichi yiqilsa, qimmat integratsion bosqichni boshlamaslik vaqt va resurs tejaydi. Mustaqil bosqichlarni parallel ishga tushirish esa umumiy vaqtni kamaytiradi.",
    "",
    "### Tashqi API va sandbox testlari",
    "Haqiqiy sandbox'ga qarshi testlarni har commit'da yurgizmang: ular sekin, beqaror va provayder cheklovlariga duch kelishi mumkin. Ularni rejali (nightly), qo'lda yoki faqat main branch'da ishga tushiring. Kalitlar CI **secret**'larida saqlanadi, log'larga chiqmasin.",
    "",
    "### Natijalarni saqlash",
    "Muvaffaqiyatsizlikda diagnostika uchun artefakt sifatida saqlang: test hisoboti (JUnit XML), servis log'lari, ilova log fayli (`storage/logs`). Keshlash (Composer, DB sxema dump) CI vaqtini qisqartiradi.",
    "",
    "### Barqarorlik",
    "Testlar CI'da ishonchsiz bo'lsa, jamoa ularga ishonishni to'xtatadi. Parallel testlar uchun izolyatsiyani tekshiring, vaqt zonasi va locale'ni qotiring, yiqilgan flaky testlarni tezda tuzating."
  ],
  "examples": [
    {
      "title": "GitHub Actions service container'lari",
      "lang": "yaml",
      "code": [
        "jobs:",
        "  integration:",
        "    runs-on: ubuntu-latest",
        "    services:",
        "      mysql:",
        "        image: mysql:8.4",
        "        env:",
        "          MYSQL_DATABASE: app_test",
        "          MYSQL_ROOT_PASSWORD: secret",
        "        ports: [\"3306:3306\"]",
        "        options: >-",
        "          --health-cmd=\"mysqladmin ping -h 127.0.0.1 -psecret\"",
        "          --health-interval=5s --health-timeout=5s --health-retries=10",
        "      redis:",
        "        image: redis:7",
        "        ports: [\"6379:6379\"]",
        "        options: >-",
        "          --health-cmd=\"redis-cli ping\" --health-interval=5s --health-retries=10",
        "    steps:",
        "      - uses: actions/checkout@v4",
        "      - uses: shivammathur/setup-php@v2",
        "        with: { php-version: \"8.4\" }",
        "      - run: composer install --no-interaction --prefer-dist",
        "      - run: php artisan test --testsuite=Integration",
        "        env:",
        "          DB_HOST: 127.0.0.1",
        "          DB_DATABASE: app_test",
        "          REDIS_HOST: 127.0.0.1"
      ],
      "note": "Health check testlar boshlanmasidan oldin servislar tayyor bo'lishini ta'minlaydi."
    },
    {
      "title": "Yiqilganda log'larni saqlash",
      "lang": "yaml",
      "code": [
        "      - name: Upload logs",
        "        if: failure()",
        "        uses: actions/upload-artifact@v4",
        "        with:",
        "          name: integration-logs",
        "          path: |",
        "            storage/logs/",
        "            build/junit.xml"
      ],
      "note": "if: failure() faqat yiqilganda ishga tushadi."
    }
  ],
  "pitfalls": [
    "Health check'siz service container: servis hali tayyor emas, testlar tasodifan 'connection refused' bilan yiqiladi.",
    "Har commit'da haqiqiy sandbox'ga so'rov yuborish: CI sekin va beqaror, provayder cheklovlari ishga tushadi.",
    "Maxfiy kalitlarni workflow faylida ochiq yozish: ular CI secret'larida saqlanishi kerak.",
    "Unit va integratsion testlarni bitta bosqichda yurgizish: tez signal kechikadi va xato tezda topilmaydi."
  ]
});
