/* 43 · CI/CD
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 43,
  slug: "ci-cd",
  title: "CI/CD",
  group: "cicd",
  description: "CI/CD — kodni tez, xavfsiz va takrorlanadigan tarzda production'ga yetkazish amaliyoti: har o'zgarish avtomatik tekshiriladi (CI) va avtomatik yoki bir tugma bilan deploy qilinadi (CD). Senior dasturchi pipeline'ni loyihalaydi: sifat darvozalari, artefaktlar, muhitlar, migratsiya strategiyasi, zero-downtime deploy va rollback.",
  subskills: [
    {
      id: "43.1",
      title: "Continuous Integration",
      description: [
        "CI — dasturchilar o'zgarishlarni tez-tez (kuniga bir necha marta) umumiy branch'ga birlashtiradi va har birlashtirish avtomatik build va testlar bilan tekshiriladi. Maqsad — integratsiya muammolarini erta, kichik holatda topish (\"integration hell\" ning oldini olish).",
        "",
        "Shartlar: barcha kod versiya nazoratida, avtomatik build, tez va ishonchli testlar, \"qizil\" pipeline darhol tuzatiladi (jamoaning birinchi prioriteti), qisqa umrli branch'lar. CI vositasi — jarayonning faqat bir qismi; asosiysi — madaniyat.",
        "",
        "```text",
        "push → install → lint → static analysis → tests → ✅/❌ (PR'da ko'rinadi)",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Loyihada har PR'da ishlaydigan CI pipeline'ini sozlang va \"qizil main\" qoidasini jamoa bilan kelishing.",
      acceptanceCriteria: [
        "CI maqsadi va shartlarini biladi",
        "CI'ni madaniyat sifatida tushunadi"
      ],
      prerequisites: [
        "33.4"
      ]
    },
    {
      id: "43.2",
      title: "Continuous Delivery vs Deployment",
      description: [
        "**Continuous Delivery** — har o'zgarish avtomatik tekshirilib, istalgan paytda production'ga chiqarishga **tayyor** artefaktga aylanadi; production deploy — qo'lda tasdiq (bir tugma). **Continuous Deployment** — barcha tekshiruvlardan o'tgan har o'zgarish **avtomatik** production'ga chiqadi, insonsiz.",
        "",
        "Continuous Deployment uchun kuchli test qamrovi, monitoring, avtomatik rollback va feature flag'lar kerak. Ko'p jamoalar Delivery bilan boshlaydi: staging'ga avtomatik, production'ga tasdiq bilan.",
        "",
        "```text",
        "Delivery:   main → test → staging (auto) → production (manual ✋)",
        "Deployment: main → test → staging (auto) → production (auto)",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Jamoangiz uchun Continuous Delivery yoki Deployment'ni tanlab, kerakli shartlar ro'yxatini tuzing.",
      acceptanceCriteria: [
        "Ikki tushunchani aniq farqlaydi",
        "Continuous Deployment shartlarini biladi"
      ],
      prerequisites: [
        "43.1"
      ]
    },
    {
      id: "43.3",
      title: "Pipeline Stages",
      description: [
        "Odatiy bosqichlar: **build** (dependency'lar, asset'lar, image) → **test** (lint, statik tahlil, unit, feature, integration — parallel) → **security** (audit, SAST, image skan) → **package** (artefakt/image registry'ga) → **deploy staging** → **smoke/E2E testlar** → **deploy production** (tasdiq bilan) → **post-deploy tekshiruv**.",
        "",
        "Tamoyillar: tez bosqichlar birinchi (fail fast), mustaqil job'lar parallel, artefakt bir marta quriladi va barcha muhitlarga o'sha chiqariladi.",
        "",
        "```yaml",
        "stages: [build, test, security, package, deploy-staging, verify, deploy-production]",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Laravel loyihasi uchun to'liq pipeline bosqichlari diagrammasini va har birining maqsadini yozing.",
      acceptanceCriteria: [
        "Pipeline bosqichlari va tartibini biladi",
        "\"Fail fast\" va parallellik tamoyillarini qo'llaydi"
      ],
      prerequisites: [
        "43.1"
      ]
    },
    {
      id: "43.4",
      title: "Build, Test va Deploy",
      description: [
        "Laravel uchun **build**: `composer install` (keshlangan), `npm ci && npm run build` (Vite), Docker image yoki tarball artefakt. **Test**: Pint, Larastan, Pest (DB va Redis servislari bilan, parallel). **Deploy**: artefaktni serverga/registry'ga, `.env` (secret'lardan), migratsiya, `php artisan optimize`, FPM reload yoki konteyner almashtirish, `queue:restart`, health check.",
        "",
        "Build va deploy alohida: production'da composer/npm ishga tushirmaslik (tezroq, takrorlanadigan, tashqi registry'ga bog'liq emas).",
        "",
        "```yaml",
        "build:",
        "  script:",
        "    - composer install --no-dev --optimize-autoloader --no-interaction",
        "    - npm ci && npm run build",
        "    - tar -czf release.tgz --exclude=node_modules --exclude=tests .",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Build bosqichida artefakt yaratib, deploy bosqichida faqat shu artefaktni serverga chiqaring.",
      acceptanceCriteria: [
        "Build va deploy'ni ajratadi",
        "Laravel deploy qadamlarini biladi"
      ],
      prerequisites: [
        "43.3"
      ]
    },
    {
      id: "43.5",
      title: "Automated Testing",
      description: [
        "CI'dagi testlar: tez va ishonchli bo'lishi kerak, aks holda jamoa ularni e'tiborsiz qoldiradi. Strategiya: unit testlar (soniyalar), feature testlar (daqiqalar, parallel), integratsion (servislar bilan), E2E/smoke — kam sonli va asosan staging'da. Flaky testlar darhol karantin va tuzatish.",
        "",
        "Natijalar: JUnit hisoboti (CI interfeysida qaysi test yiqilgani), coverage hisoboti, test vaqti trendi. Test bosqichi muvaffaqiyatsiz — merge va deploy yo'q.",
        "",
        "```yaml",
        "test:",
        "  services: [mysql:8.4, redis:7]",
        "  script:",
        "    - php artisan test --parallel --log-junit=junit.xml",
        "  artifacts:",
        "    reports: { junit: junit.xml }",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "CI'da testlarni parallel ishga tushirib, JUnit hisobotini va vaqt trendini kuzating.",
      acceptanceCriteria: [
        "CI testlari uchun tezlik va ishonchlilik talablarini biladi",
        "Test natijalarini hisobot sifatida chiqaradi"
      ],
      prerequisites: [
        "25.17"
      ]
    },
    {
      id: "43.6",
      title: "Code Quality Gates",
      description: [
        "Sifat darvozalari — pipeline merge yoki deploy'ga ruxsat berishdan oldin bajarilishi shart bo'lgan avtomatik tekshiruvlar: kod uslubi (Pint `--test`), statik tahlil (Larastan — baseline'ga yangi xato yo'q), testlar o'tdi, coverage chegarasi (yangi kod uchun), xavfsizlik auditi (`composer audit`, kritik zaiflik yo'q), arxitektura testlari, migratsiya tekshiruvi.",
        "",
        "Darvozalar majburiy (branch protection'da required check) va tez bo'lishi kerak. Juda qat'iy yoki beqaror darvoza — chetlab o'tishga undaydi.",
        "",
        "```yaml",
        "quality:",
        "  script:",
        "    - vendor/bin/pint --test",
        "    - vendor/bin/phpstan analyse --no-progress",
        "    - composer audit --locked",
        "    - vendor/bin/pest --coverage --min=75",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Pipeline'ga sifat darvozalarini qo'shing va ularni branch protection'da majburiy qiling.",
      acceptanceCriteria: [
        "Sifat darvozalari turlarini biladi",
        "Darvozalarni majburiy va tez qiladi"
      ],
      prerequisites: [
        "31.12"
      ]
    },
    {
      id: "43.7",
      title: "Artifact Management",
      description: [
        "Artefakt — build natijasi (Docker image, tarball, paket), bir marta quriladi va barcha muhitlarga **o'zgarishsiz** chiqariladi (\"build once, deploy many\") — staging'da sinalgan narsa aynan production'ga chiqadi. Versiyalash: commit SHA (o'zgarmas), semver tag.",
        "",
        "Saqlash: container registry, CI artefaktlari (qisqa muddatli), S3/paket registry. Saqlash muddati va tozalash siyosati, imzolash va kelib chiqish ma'lumoti (provenance — SLSA), zaiflik skanerlash.",
        "",
        "```bash",
        "docker build -t registry.example.uz/app:${CI_COMMIT_SHA} .",
        "docker push registry.example.uz/app:${CI_COMMIT_SHA}",
        "# staging va production — bir xil tag",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Commit SHA bilan tag qilingan image'ni bir marta qurib, staging va production'ga aynan shu image'ni deploy qiling.",
      acceptanceCriteria: [
        "\"Build once, deploy many\" tamoyilini qo'llaydi",
        "Artefaktlarni o'zgarmas versiya bilan boshqaradi"
      ],
      prerequisites: [
        "36.17"
      ]
    },
    {
      id: "43.8",
      title: "Environment Separation",
      description: [
        "Muhitlar: local → CI → staging (production'ga imkon qadar o'xshash) → production. Har biri o'z konfiguratsiyasi (env), sirlari, DB'si va infratuzilmasi bilan; muhitlar o'rtasida ma'lumot va sirlar aralashmaydi (staging production DB'siga ulanmaydi!).",
        "",
        "Konfiguratsiya koddan ajratilgan (12-factor) — bir xil artefakt turli env bilan. Staging ma'lumotlari — anonimlashtirilgan yoki sintetik. Preview/review muhitlari — har PR uchun vaqtinchalik.",
        "",
        "```text",
        "local       .env (docker)          — dasturchi",
        "staging     secrets: STAGING_*     — QA, demo",
        "production  secrets: PROD_*        — foydalanuvchilar, cheklangan kirish",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Muhitlar o'rtasidagi barcha farqlarni (konfiguratsiya, ma'lumot, kirish) jadvalda hujjatlashtiring.",
      acceptanceCriteria: [
        "Muhitlarni izolyatsiya qiladi",
        "Staging'ni production'ga o'xshash saqlash muhimligini biladi"
      ],
      prerequisites: [
        "2.10"
      ]
    },
    {
      id: "43.9",
      title: "Secrets Management",
      description: [
        "CI/CD'dagi sirlar: deploy kalitlari, registry token'lari, API kalitlari, `.env` qiymatlari. Qoidalar: hech qachon repozitoriyda emas; CI secret saqlash joyida (masked, protected, environment scope bilan); minimal huquqli va muddatli; log'larga chiqmasin (`set -x` ehtiyot); bulut uchun uzoq muddatli kalitlar o'rniga OIDC; muntazam aylantirish.",
        "",
        "Production `.env` ni deploy paytida secret manager'dan (Vault, AWS Secrets Manager, Doppler) generatsiya qilish yoki Laravel `env:encrypt` (shifrlangan `.env.production.encrypted` + kalit CI'da).",
        "",
        "```bash",
        "php artisan env:encrypt --env=production   # .env.production.encrypted commit qilinadi",
        "php artisan env:decrypt --env=production --key=\"$LARAVEL_ENV_ENCRYPTION_KEY\"   # deploy'da",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Production sirlarini CI secret'lari yoki `env:encrypt` orqali boshqaring; repozitoriyda sir yo'qligini skanerlang.",
      acceptanceCriteria: [
        "CI sirlarini xavfsiz saqlash usullarini biladi",
        "Uzoq muddatli kalitlar o'rniga OIDC'ni afzal ko'radi"
      ],
      prerequisites: [
        "51.16"
      ]
    },
    {
      id: "43.10",
      title: "Database Migration Strategy",
      description: [
        "Deploy'dagi migratsiya — eng xavfli qadam: qaytarib bo'lmaydigan o'zgarishlar, uzoq lock'lar, eski va yangi kod bir vaqtda ishlashi. Strategiya: migratsiyalar orqaga mos (expand/contract — 14.17), deploy'dan **oldin** alohida bosqichda (`migrate --force`), bir nechta serverda faqat bir marta (`--isolated` — Laravel lock bilan), katta jadvallar uchun onlayn migratsiya vositalari, `down()` ga tayanmaslik (oldinga tuzatish — roll forward).",
        "",
        "Migratsiya muvaffaqiyatsiz bo'lsa — deploy to'xtaydi, kod almashtirilmaydi.",
        "",
        "```bash",
        "php artisan migrate --force --isolated",
        "php artisan migrate --pretend   # PR'da qaysi SQL bajarilishini ko'rsatish",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Deploy pipeline'iga alohida migratsiya bosqichini `--isolated` bilan qo'shing va orqaga mos migratsiya qoidalarini yozing.",
      acceptanceCriteria: [
        "Migratsiya xavflarini va expand/contract'ni biladi",
        "Migratsiyani bir marta va xavfsiz bajaradi"
      ],
      prerequisites: [
        "14.17"
      ]
    },
    {
      id: "43.11",
      title: "Deployment Approvals",
      description: [
        "Production deploy uchun tasdiq: kim tasdiqlay oladi (lead, release manager), qanday ma'lumot bilan (changelog, staging natijasi, migratsiya ro'yxati), qachon (deploy oynalari, deploy freeze — bayram va katta tadbirlar oldidan). CI platformalarda: GitHub environment protection (required reviewers), GitLab protected environments, manual job'lar.",
        "",
        "Muvozanat: tasdiq — xavfsizlik va nazorat, lekin byurokratiya tezlikni o'ldirmasin. Kichik, tez-tez deploy'lar xavfni kamaytiradi va tasdiqni soddalashtiradi.",
        "",
        "```yaml",
        "deploy_production:",
        "  stage: deploy",
        "  when: manual",
        "  environment: production",
        "  rules: [{ if: $CI_COMMIT_BRANCH == \"main\" }]",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Production deploy uchun tasdiq jarayonini va deploy freeze qoidalarini sozlang.",
      acceptanceCriteria: [
        "Tasdiq mexanizmlarini biladi",
        "Nazorat va tezlik muvozanatini tushunadi"
      ],
      prerequisites: [
        "34.9"
      ]
    },
    {
      id: "43.12",
      title: "Rollback Strategy",
      description: [
        "Har deploy oldindan rejalashtirilgan qaytish yo'liga ega bo'lishi kerak. Usullar: oldingi artefakt/relizga qaytish (symlink almashtirish, oldingi image tag), blue-green'da trafikni qaytarish, feature flag'ni o'chirish (eng tez — kod deploy qilmasdan), roll forward (tez tuzatish deploy'i).",
        "",
        "Ma'lumot muammosi: kodni qaytarish oson, DB migratsiyasini qaytarish qiyin — shuning uchun orqaga mos migratsiyalar shart (eski kod yangi sxema bilan ishlay olishi kerak). Rollback'ni muntazam sinab ko'ring — shoshilinch vaqtda birinchi marta qilmaslik uchun.",
        "",
        "```bash",
        "# releases + symlink",
        "ln -sfn /var/www/releases/20250601120000 /var/www/current && sudo systemctl reload php8.3-fpm",
        "# Kubernetes",
        "kubectl rollout undo deployment/app",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Staging'da deploy → rollback mashqini o'tkazing va vaqtini o'lchab runbook yozing.",
      acceptanceCriteria: [
        "Rollback usullarini biladi",
        "Migratsiya va rollback bog'liqligini tushunadi"
      ],
      prerequisites: [
        "43.10"
      ]
    },
    {
      id: "43.13",
      title: "Blue-Green Deployment",
      description: [
        "Blue-green — ikki bir xil production muhiti: \"blue\" (joriy) trafikni oladi, \"green\" ga yangi versiya deploy qilinadi va tekshiriladi, keyin load balancer trafikni bir zumda green'ga o'tkazadi. Muammo bo'lsa — trafik darhol blue'ga qaytariladi.",
        "",
        "Afzalliklari: zero-downtime, bir zumda rollback, production'da sinash. Narxi: ikki baravar resurs (vaqtincha), umumiy DB — migratsiyalar ikkala versiya bilan mos bo'lishi kerak, session va keshlar umumiy saqlashda. Queue worker'lar va scheduler'ni ham muvofiqlashtirish kerak.",
        "",
        "```text",
        "LB → [Blue v1.4 ✅ trafik]     [Green v1.5 — deploy, smoke test]",
        "LB → [Blue v1.4]              [Green v1.5 ✅ trafik]   (switch)",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Ikki Docker Compose stack va Nginx upstream bilan oddiy blue-green almashtirishni amalga oshiring.",
      acceptanceCriteria: [
        "Blue-green mexanizmi va narxini biladi",
        "Umumiy DB bilan bog'liq cheklovlarni tushunadi"
      ],
      prerequisites: [
        "43.12"
      ]
    },
    {
      id: "43.14",
      title: "Canary Releases",
      description: [
        "Canary — yangi versiya avval trafikning kichik qismiga (1% → 10% → 50% → 100%) chiqariladi; har bosqichda metrikalar (xatolar, kechikish, biznes ko'rsatkichlari) kuzatiladi; muammo bo'lsa — avtomatik yoki qo'lda to'xtatish.",
        "",
        "Vositalar: load balancer og'irliklari, Kubernetes (Argo Rollouts, Flagger), service mesh, CDN. Muqobil/qo'shimcha — feature flag'lar bilan foydalanuvchi segmentiga ochish (Laravel Pennant). Canary yaxshi monitoring va avtomatik tahlilsiz ma'nosiz.",
        "",
        "```nginx",
        "split_clients \"${remote_addr}\" $backend {",
        "    5%  canary;",
        "    *   stable;",
        "}",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Nginx `split_clients` bilan 5% canary deploy qiling va xato darajasini ikki versiya bo'yicha solishtiring.",
      acceptanceCriteria: [
        "Canary bosqichlari va metrikalarga tayanishni biladi",
        "Canary va feature flag farqini tushunadi"
      ],
      prerequisites: [
        "43.13",
        "58.17"
      ]
    },
    {
      id: "43.15",
      title: "Zero-Downtime Deployment",
      description: [
        "Zero-downtime — deploy paytida foydalanuvchilar xato yoki uzilishni sezmaydi. Laravel uchun: releases papkalari + atomik symlink almashtirish (Deployer/Envoyer) yoki konteynerlarda rolling update; `$realpath_root` + FPM graceful reload (OPcache); orqaga mos migratsiyalar (expand/contract); `php artisan queue:restart` (worker'lar joriy job'ni tugatib yangi kodga o'tadi); health check'dan keyin trafik; asset'lar uchun hash'li nomlar (eski sahifalar eski asset'larni topa olishi).",
        "",
        "`php artisan down` — zero-downtime emas; faqat juda katta, mos bo'lmagan migratsiyalar uchun oxirgi chora.",
        "",
        "```text",
        "1. releases/NEW ga kod + composer + build",
        "2. shared: .env, storage symlink",
        "3. migrate --force --isolated (orqaga mos)",
        "4. optimize → ln -sfn NEW current → reload FPM → queue:restart",
        "5. health check ✅ → eski relizlarni tozalash",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Deployer yoki o'z skriptingiz bilan zero-downtime deploy'ni sozlab, load test ostida xatosiz deploy'ni isbotlang.",
      acceptanceCriteria: [
        "Zero-downtime deploy komponentlarini biladi",
        "Queue worker'lar va asset'lar bilan bog'liq nozikliklarni hisobga oladi"
      ],
      prerequisites: [
        "40.18"
      ]
    },
    {
      id: "43.16",
      title: "Pipeline Security",
      description: [
        "Pipeline — hujum nishoni (supply chain): kod, sirlar va production'ga kirish. Himoya: secret'lar minimal ko'rinish bilan (faqat deploy job'ida, protected branch'larda), fork PR'larida secret'lar yo'q, uchinchi tomon action/image'larni versiya yoki SHA bilan qotirish, runner'lar izolyatsiyasi (self-hosted runner'larda ishonchsiz kod ishlatmaslik), `GITHUB_TOKEN`/`CI_JOB_TOKEN` minimal ruxsatlar, OIDC, pipeline konfiguratsiyasi o'zgarishini CODEOWNERS bilan review, artefaktlarni imzolash.",
        "",
        "Dependency'lar orqali hujum: lock fayl, `composer audit`, yangi paketlarni review.",
        "",
        "```yaml",
        "permissions:",
        "  contents: read",
        "  id-token: write          # OIDC",
        "- uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683  # SHA pin",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Pipeline'ni xavfsizlik checklist'i bo'yicha audit qilib, eng xavfli 3 ta kamchilikni tuzating.",
      acceptanceCriteria: [
        "CI/CD supply chain xavflarini biladi",
        "Sirlar, ruxsatlar va dependency'larni himoyalaydi"
      ],
      prerequisites: [
        "34.17"
      ]
    },
    {
      id: "43.17",
      title: "Deployment Monitoring",
      description: [
        "Deploy'dan keyin kuzatish: xato darajasi (Sentry'da yangi reliz bo'yicha xatolar), kechikish (p95), 5xx soni, queue backlog, biznes metrikalari (buyurtmalar, to'lovlar), health check'lar. Deploy belgilari (annotation) Grafana grafiklarida — o'zgarish va metrika bog'liqligi ko'rinadi.",
        "",
        "Avtomatlashtirish: deploy'dan keyin smoke testlar, metrikalar yomonlashsa avtomatik rollback yoki alert, Sentry release tracking (`sentry-cli releases`). DORA metrikalari: deploy chastotasi, o'zgarish uchun vaqt, muvaffaqiyatsiz o'zgarishlar ulushi, tiklash vaqti.",
        "",
        "```bash",
        "sentry-cli releases new \"$CI_COMMIT_SHA\" && sentry-cli releases set-commits \"$CI_COMMIT_SHA\" --auto",
        "sentry-cli releases deploys \"$CI_COMMIT_SHA\" new -e production",
        "curl -X POST \"$GRAFANA_URL/api/annotations\" -H \"Authorization: Bearer $GRAFANA_TOKEN\" -d '{\"text\":\"Deploy '\"$CI_COMMIT_SHORT_SHA\"'\",\"tags\":[\"deploy\"]}'",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Deploy'dan keyin Sentry release, Grafana annotation va smoke testni avtomatik ishga tushiring.",
      acceptanceCriteria: [
        "Deploy'dan keyingi muhim metrikalarni biladi",
        "DORA metrikalarini tushunadi"
      ],
      prerequisites: [
        "59.4",
        "58.19"
      ]
    }
  ]
});
