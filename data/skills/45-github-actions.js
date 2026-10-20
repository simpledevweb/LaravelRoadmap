/* 45 · GitHub Actions
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 45,
  slug: "github-actions",
  title: "GitHub Actions",
  group: "cicd",
  description: "GitHub Actions — GitHub repozitoriylariga o'rnatilgan CI/CD va avtomatlashtirish platformasi. Workflow'lar YAML'da yoziladi, marketplace'dagi minglab action'lar bilan kengaytiriladi. Senior dasturchi Laravel uchun tez va xavfsiz workflow'lar quradi: matrix build'lar, kesh, reusable workflow'lar, environment'lar, OIDC va supply chain xavfsizligi.",
  subskills: [
    {
      id: "45.1",
      title: "Workflows",
      description: [
        "Workflow — `.github/workflows/*.yml` dagi avtomatlashtirilgan jarayon: `name`, `on` (trigger'lar), `jobs`, ixtiyoriy `env`, `permissions`, `concurrency`, `defaults`. Bir repozitoriyda bir nechta workflow (ci.yml, deploy.yml, release.yml).",
        "",
        "`concurrency` — bir branch uchun faqat oxirgi workflow ishlaydi (`cancel-in-progress: true` — eski PR yuklamalarini bekor qiladi), deploy uchun esa navbat (bekor qilmasdan).",
        "",
        "```yaml",
        "name: CI",
        "on:",
        "  pull_request:",
        "  push: { branches: [main] }",
        "concurrency:",
        "  group: ci-${{ github.ref }}",
        "  cancel-in-progress: true",
        "permissions: { contents: read }",
        "jobs: { ... }",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "CI workflow'ini concurrency va minimal permissions bilan yarating.",
      acceptanceCriteria: [
        "Workflow tuzilmasini biladi",
        "Concurrency'ni maqsadga qarab sozlaydi"
      ],
      prerequisites: [
        "34.7"
      ]
    },
    {
      id: "45.2",
      title: "Events va Triggers",
      description: [
        "Trigger'lar (`on:`): `push`, `pull_request` (fork'dan xavfsiz — secret'larsiz), `pull_request_target` (maqsad repo kontekstida, secret'lar bilan — ishonchsiz kodni checkout qilish juda xavfli!), `workflow_dispatch` (qo'lda, input'lar bilan), `schedule` (cron, UTC), `release`, `workflow_call` (reusable), `workflow_run`, `repository_dispatch`, tag push.",
        "",
        "Filtrlar: `branches`, `tags`, `paths` (faqat ma'lum fayllar o'zgarganda), `types` (`opened`, `synchronize`, `labeled`).",
        "",
        "```yaml",
        "on:",
        "  push:",
        "    branches: [main]",
        "    tags: ['v*']",
        "  pull_request:",
        "    paths: ['app/**', 'tests/**', 'composer.lock']",
        "  workflow_dispatch:",
        "    inputs:",
        "      environment: { type: choice, options: [staging, production] }",
        "  schedule:",
        "    - cron: '0 3 * * 1'     # har dushanba 03:00 UTC",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Push, PR (path filtr bilan), qo'lda va haftalik rejali trigger'larni sozlang.",
      acceptanceCriteria: [
        "Asosiy event'lar va filtrlarni biladi",
        "`pull_request_target` xavfini tushunadi"
      ],
      prerequisites: [
        "45.1"
      ]
    },
    {
      id: "45.3",
      title: "Jobs va Steps",
      description: [
        "Job — bitta runner'da bajariladigan step'lar ketma-ketligi; job'lar default holatda parallel, `needs:` bilan bog'liqlik. Step — `uses:` (action) yoki `run:` (shell buyruq). Job xususiyatlari: `runs-on`, `services`, `strategy`, `timeout-minutes`, `if`, `outputs` (keyingi job'larga ma'lumot), `environment`, `container`.",
        "",
        "Step'lar o'rtasida ma'lumot: `$GITHUB_ENV` (env), `$GITHUB_OUTPUT` (output), fayl tizimi (bir job ichida). Job'lar orasida — artefaktlar yoki `outputs`.",
        "",
        "```yaml",
        "jobs:",
        "  test:",
        "    runs-on: ubuntu-latest",
        "    timeout-minutes: 15",
        "    steps:",
        "      - uses: actions/checkout@v4",
        "      - id: version",
        "        run: echo \"sha=${GITHUB_SHA::7}\" >> \"$GITHUB_OUTPUT\"",
        "  deploy:",
        "    needs: test",
        "    if: github.ref == 'refs/heads/main'",
        "    runs-on: ubuntu-latest",
        "    steps: [ ... ]",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Test va deploy job'larini `needs`, `if` va job outputs bilan bog'lang.",
      acceptanceCriteria: [
        "Job va step farqini biladi",
        "Job'lar o'rtasida ma'lumot uzatishni biladi"
      ],
      prerequisites: [
        "45.1"
      ]
    },
    {
      id: "45.4",
      title: "Actions",
      description: [
        "Action — qayta ishlatiladigan step: JavaScript, Docker yoki composite (bir nechta step'lardan). Marketplace'dagi asosiylar: `actions/checkout`, `shivammathur/setup-php` (PHP + kengaytmalar + Composer), `actions/cache`, `actions/upload-artifact`/`download-artifact`, `docker/build-push-action`, `actions/setup-node`.",
        "",
        "O'z composite action'ingiz — takroriy qadamlar uchun (masalan, \"Laravel tayyorlash\": PHP, composer kesh, `.env`, key:generate). Uchinchi tomon action'larini ishonchlilik va xavfsizlik bo'yicha tekshiring va versiyani qotiring.",
        "",
        "```yaml",
        "# .github/actions/setup-laravel/action.yml",
        "runs:",
        "  using: composite",
        "  steps:",
        "    - uses: shivammathur/setup-php@v2",
        "      with: { php-version: '8.3', extensions: 'intl, redis, pdo_mysql', coverage: pcov }",
        "    - run: composer install --no-interaction --prefer-dist --no-progress",
        "      shell: bash",
        "    - run: cp .env.example .env && php artisan key:generate",
        "      shell: bash",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Takroriy Laravel tayyorlash qadamlarini composite action'ga chiqaring va bir nechta workflow'da ishlating.",
      acceptanceCriteria: [
        "Action turlarini va asosiy action'larni biladi",
        "Composite action yarata oladi"
      ],
      prerequisites: [
        "45.3"
      ]
    },
    {
      id: "45.5",
      title: "Runners",
      description: [
        "GitHub-hosted runner'lar (`ubuntu-latest`, `ubuntu-24.04`, katta runner'lar) — har job toza VM, oldindan ko'p vosita o'rnatilgan, daqiqalar bo'yicha hisob (private repo'larda). Self-hosted — o'z serveringiz: maxsus apparat, ichki tarmoqqa kirish, arzonroq ko'p yuklamada.",
        "",
        "Self-hosted xavfsizligi: ommaviy repozitoriylarda ishlatmaslik (fork PR'lardan ixtiyoriy kod!), ephemeral (har job'dan keyin yangi — actions-runner-controller), alohida tarmoq va minimal huquqlar, label'lar bilan job'larni yo'naltirish.",
        "",
        "```yaml",
        "deploy:",
        "  runs-on: [self-hosted, linux, deploy]   # ichki tarmoqdagi runner",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ichki serverga deploy qiladigan ephemeral self-hosted runner sozlang va faqat deploy job'iga bog'lang.",
      acceptanceCriteria: [
        "Hosted va self-hosted runner farqlarini biladi",
        "Self-hosted runner xavfsizligini ta'minlaydi"
      ],
      prerequisites: [
        "34.17"
      ]
    },
    {
      id: "45.6",
      title: "Matrix Builds",
      description: [
        "Matrix — bir job'ni parametrlar kombinatsiyalari bo'yicha parallel ishga tushirish: PHP versiyalari (8.2, 8.3, 8.4), Laravel versiyalari (paketlar uchun), DB'lar (mysql, pgsql), OS. `include`/`exclude` — kombinatsiyalarni moslash; `fail-fast: false` — biri yiqilsa boshqalari davom etadi; `max-parallel`.",
        "",
        "Paket mualliflari uchun mosliklarni kafolatlash; ilovalar uchun — production versiyasi + keyingi versiyaga tayyorgarlik (upgrade'dan oldin).",
        "",
        "```yaml",
        "strategy:",
        "  fail-fast: false",
        "  matrix:",
        "    php: ['8.2', '8.3', '8.4']",
        "    laravel: ['11.*', '12.*']",
        "    exclude:",
        "      - { php: '8.2', laravel: '12.*' }",
        "steps:",
        "  - uses: shivammathur/setup-php@v2",
        "    with: { php-version: '${{ matrix.php }}' }",
        "  - run: composer require \"laravel/framework:${{ matrix.laravel }}\" --no-update && composer update --prefer-dist",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Paket yoki ilova uchun PHP × Laravel matrix'ini exclude bilan sozlang.",
      acceptanceCriteria: [
        "Matrix, include/exclude va fail-fast'ni biladi",
        "Matrix'ni moslik kafolati uchun ishlatadi"
      ],
      prerequisites: [
        "45.3"
      ]
    },
    {
      id: "45.7",
      title: "Secrets va Variables",
      description: [
        "Secret'lar (repo, environment, organization darajasida) — `${{ secrets.NAME }}`, log'da niqoblanadi; variables (`${{ vars.NAME }}`) — maxfiy bo'lmagan konfiguratsiya. Environment secret'lari faqat shu environment'dagi job'larga. Fork PR'larida secret'lar yo'q (`GITHUB_TOKEN` faqat o'qish).",
        "",
        "Ehtiyot: secret'ni `echo` qilmaslik, artefaktga yozmaslik, strukturali sirlar (JSON) har qismini alohida niqoblamasligi mumkin (`::add-mask::`), secret'larni shell buyrug'iga to'g'ridan-to'g'ri interpolatsiya qilish o'rniga `env:` orqali uzatish (injection'ga qarshi).",
        "",
        "```yaml",
        "- name: Deploy",
        "  env:",
        "    SSH_KEY: ${{ secrets.DEPLOY_SSH_KEY }}",
        "    HOST: ${{ vars.PROD_HOST }}",
        "  run: ./deploy.sh      # skript $SSH_KEY va $HOST ni env'dan o'qiydi",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Workflow'dagi secret ishlatilishini audit qiling: `env:` orqali uzating va environment darajasiga ko'chiring.",
      acceptanceCriteria: [
        "Secret va variable farqini biladi",
        "Secret'larni injection'siz uzatadi"
      ],
      prerequisites: [
        "34.8"
      ]
    },
    {
      id: "45.8",
      title: "Artifacts",
      description: [
        "Artefaktlar — job natijalarini saqlash va job'lar o'rtasida uzatish: `actions/upload-artifact@v4` / `download-artifact@v4`, `retention-days`. Qo'llanish: build natijasi (tarball) deploy job'iga, test hisobotlari, coverage, muvaffaqiyatsiz testlardagi skrinshot/log'lar (`if: failure()`).",
        "",
        "Artefaktlar va kesh farqi: kesh — tezlik uchun dependency'lar (bo'lmasligi mumkin), artefakt — aniq natija (kafolatlangan). Katta artefaktlar saqlash limitini egallaydi — muddatni qisqa qiling.",
        "",
        "```yaml",
        "- uses: actions/upload-artifact@v4",
        "  with:",
        "    name: release-${{ github.sha }}",
        "    path: release.tgz",
        "    retention-days: 7",
        "- uses: actions/upload-artifact@v4",
        "  if: failure()",
        "  with: { name: laravel-logs, path: storage/logs/ }",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Build artefaktini deploy job'iga uzating va testlar yiqilganda log'larni artefakt sifatida saqlang.",
      acceptanceCriteria: [
        "Artefakt va kesh farqini biladi",
        "Xato diagnostikasi uchun artefaktlardan foydalanadi"
      ],
      prerequisites: [
        "45.3"
      ]
    },
    {
      id: "45.9",
      title: "Caching",
      description: [
        "`actions/cache@v4` — dependency'larni workflow'lar orasida keshlash: `key` (lock fayl hash'i bilan — `${{ hashFiles('composer.lock') }}`), `restore-keys` (qisman moslik — eskiroq kesh), `path`. Ko'p setup action'lari o'rnatilgan kesh beradi (`setup-node` `cache: npm`).",
        "",
        "Composer: `composer config cache-files-dir` yo'lini keshlash (`vendor/` emas — platformaga bog'liq bo'lishi mumkin, lekin ba'zilar `vendor` ni ham keshlaydi). Docker: `docker/build-push-action` bilan `cache-from/to: type=gha`.",
        "",
        "```yaml",
        "- id: composer-cache",
        "  run: echo \"dir=$(composer config cache-files-dir)\" >> \"$GITHUB_OUTPUT\"",
        "- uses: actions/cache@v4",
        "  with:",
        "    path: ${{ steps.composer-cache.outputs.dir }}",
        "    key: composer-${{ runner.os }}-${{ hashFiles('composer.lock') }}",
        "    restore-keys: composer-${{ runner.os }}-",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Composer, npm va Docker qatlam keshlarini sozlab, workflow vaqtini oldin/keyin solishtiring.",
      acceptanceCriteria: [
        "Kesh kaliti va restore-keys mexanizmini biladi",
        "Turli ekotizimlar uchun keshlashni sozlaydi"
      ],
      prerequisites: [
        "45.3"
      ]
    },
    {
      id: "45.10",
      title: "Reusable Workflows",
      description: [
        "Reusable workflow (`on: workflow_call`) — butun workflow'ni boshqa workflow'dan chaqirish: `inputs`, `secrets` (yoki `secrets: inherit`), `outputs`. Ko'p repozitoriyli tashkilotda yagona CI/CD standartini markaziy repozitoriyda saqlash (`acme/ci-templates/.github/workflows/laravel-ci.yml@v1`).",
        "",
        "Composite action va reusable workflow farqi: composite — step'lar to'plami (bir job ichida); reusable — job'lar to'plami (runner, environment, matrix bilan).",
        "",
        "```yaml",
        "# Chaqiruvchi",
        "jobs:",
        "  ci:",
        "    uses: acme/ci-templates/.github/workflows/laravel-ci.yml@v1",
        "    with: { php-version: '8.3' }",
        "    secrets: inherit",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Laravel CI'ni markaziy reusable workflow'ga chiqaring va ikki repozitoriyda ishlating.",
      acceptanceCriteria: [
        "Reusable workflow input/secret/output'larini biladi",
        "Composite action va reusable workflow'ni farqlaydi"
      ],
      prerequisites: [
        "45.4"
      ]
    },
    {
      id: "45.11",
      title: "Environments",
      description: [
        "Environment'lar (`environment: production`) — deploy maqsadlari: himoya qoidalari (required reviewers, wait timer, faqat ma'lum branch/tag'lar — deployment branch policies), environment secret va variable'lari, deploy tarixi va URL. Job tasdiq olmaguncha kutadi.",
        "",
        "`concurrency: production` — bir vaqtda faqat bitta production deploy (bekor qilmasdan — `cancel-in-progress: false`).",
        "",
        "```yaml",
        "deploy_production:",
        "  needs: [test, build]",
        "  runs-on: ubuntu-latest",
        "  environment:",
        "    name: production",
        "    url: https://app.example.uz",
        "  concurrency: { group: production, cancel-in-progress: false }",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Production environment'ini tasdiq, branch siyosati va concurrency bilan sozlang.",
      acceptanceCriteria: [
        "Environment himoya qoidalarini biladi",
        "Deploy concurrency'ni to'g'ri sozlaydi"
      ],
      prerequisites: [
        "34.9"
      ]
    },
    {
      id: "45.12",
      title: "Deployment Approvals",
      description: [
        "Tasdiq oqimi: environment'da \"Required reviewers\" (1–6 shaxs yoki jamoa) — job kutish holatiga o'tadi, reviewer'lar GitHub interfeysida tasdiqlaydi yoki rad etadi; \"Prevent self-review\" — deploy'ni ishga tushirgan o'zi tasdiqlay olmaydi; wait timer (masalan, staging'dan keyin 15 daqiqa kutish).",
        "",
        "Tasdiq ma'lumoti: PR havolalari, changelog, staging natijalari job summary'da (`$GITHUB_STEP_SUMMARY`) — reviewer qaror qabul qilishi uchun.",
        "",
        "```yaml",
        "- name: Deploy summary",
        "  run: |",
        "    echo \"### Production deploy: ${GITHUB_SHA::7}\" >> \"$GITHUB_STEP_SUMMARY\"",
        "    git log --oneline ${{ github.event.before }}..${{ github.sha }} >> \"$GITHUB_STEP_SUMMARY\"",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Production deploy uchun tasdiq va o'z-o'zini tasdiqlash taqiqini sozlang; job summary'da changelog ko'rsating.",
      acceptanceCriteria: [
        "Tasdiq sozlamalarini biladi",
        "Reviewer uchun kontekst taqdim etadi"
      ],
      prerequisites: [
        "45.11"
      ]
    },
    {
      id: "45.13",
      title: "Permissions",
      description: [
        "`GITHUB_TOKEN` — har workflow uchun avtomatik token; uning ruxsatlari `permissions:` bilan workflow yoki job darajasida belgilanadi. Eng kam huquq: default `contents: read`, kerakli joyda qo'shimcha (`pull-requests: write` — PR izohi uchun, `packages: write` — ghcr push, `id-token: write` — OIDC, `deployments: write`).",
        "",
        "Repozitoriy/tashkilot sozlamasida default ruxsatni \"read-only\" ga qo'yish tavsiya etiladi. Boshqa repozitoriylarga kirish uchun — GitHub App token (`actions/create-github-app-token`), shaxsiy PAT emas.",
        "",
        "```yaml",
        "permissions:",
        "  contents: read",
        "jobs:",
        "  publish:",
        "    permissions:",
        "      contents: read",
        "      packages: write",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Barcha workflow'larda `permissions` ni minimal darajaga keltiring va default'ni read-only qiling.",
      acceptanceCriteria: [
        "`GITHUB_TOKEN` ruxsatlar modelini biladi",
        "PAT o'rniga GitHub App token'ni afzal ko'radi"
      ],
      prerequisites: [
        "34.16"
      ]
    },
    {
      id: "45.14",
      title: "OIDC for Cloud Authentication",
      description: [
        "OIDC — workflow bulut provayderiga (AWS, GCP, Azure) uzoq muddatli kalitsiz autentifikatsiya qiladi: GitHub qisqa muddatli imzolangan token chiqaradi, bulut IAM uni tekshirib (repo, branch, environment shartlari bilan), vaqtinchalik kirish beradi. Secret'larda AWS kalitlari saqlash shart emas — sizib chiqish xavfi yo'q.",
        "",
        "Trust policy'da qat'iy shartlar: `sub` claim'i aniq repo va environment (`repo:acme/app:environment:production`) — boshqa repo yoki branch rolni ola olmaydi.",
        "",
        "```yaml",
        "permissions: { id-token: write, contents: read }",
        "steps:",
        "  - uses: aws-actions/configure-aws-credentials@v4",
        "    with:",
        "      role-to-assume: arn:aws:iam::123456789012:role/github-deploy-prod",
        "      aws-region: eu-central-1",
        "  - run: aws s3 sync public/build s3://app-assets/build",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "AWS (yoki boshqa bulut) uchun OIDC rolini repo+environment shartlari bilan sozlab, statik kalitlarni olib tashlang.",
      acceptanceCriteria: [
        "OIDC mexanizmi va foydasini biladi",
        "Trust policy'ni qat'iy shartlar bilan yozadi"
      ],
      prerequisites: [
        "70.1"
      ]
    },
    {
      id: "45.15",
      title: "Dependency Pinning",
      description: [
        "Supply chain himoyasi: uchinchi tomon action'larini teg emas, **to'liq commit SHA** bilan qotirish (teg o'zgartirilishi mumkin — `tj-actions/changed-files` hodisasi kabi), Dependabot (`github-actions` ekotizimi) SHA'larni yangilaydi va izohda versiyani saqlaydi. Docker image'lar — digest bilan. Composer/npm — lock fayllar va `composer install` (update emas).",
        "",
        "Ishonchli manbalar: GitHub tomonidan tasdiqlangan yaratuvchilar, faol qo'llab-quvvatlanadigan action'lar; kerak bo'lsa action'ni fork qilib, o'z tashkilotingizda saqlash. OpenSSF Scorecard \"Pinned-Dependencies\" tekshiruvi.",
        "",
        "```yaml",
        "- uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2",
        "- uses: shivammathur/setup-php@<40-belgili-commit-SHA> # v2.x (aniq SHA reliz sahifasidan)",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Barcha uchinchi tomon action'larini SHA bilan qotiring va Dependabot ularni yangilashini sozlang.",
      acceptanceCriteria: [
        "Teg va SHA pinning farqini va xavfini biladi",
        "Pinning'ni avtomatik yangilash bilan birga qo'llaydi"
      ],
      prerequisites: [
        "34.12"
      ]
    },
    {
      id: "45.16",
      title: "CI/CD Security",
      description: [
        "GitHub Actions xavfsizlik checklist'i: minimal `permissions`; SHA pinning; `pull_request_target` va `workflow_run` da ishonchsiz kodni checkout qilmaslik; **script injection** — `${{ github.event.pull_request.title }}` kabi foydalanuvchi ma'lumotini `run:` ga to'g'ridan-to'g'ri qo'ymaslik (env orqali); secret'lar environment'larda; OIDC; self-hosted runner'larni ommaviy repo'larda ishlatmaslik; workflow fayllari o'zgarishiga CODEOWNERS; `zizmor`/`actionlint` bilan statik tahlil.",
        "",
        "```yaml",
        "# ❌ injection: PR sarlavhasi shell buyrug'iga aylanadi",
        "- run: echo \"${{ github.event.pull_request.title }}\"",
        "# ✅",
        "- env: { TITLE: '${{ github.event.pull_request.title }}' }",
        "  run: echo \"$TITLE\"",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Workflow'larni `zizmor` va `actionlint` bilan tekshirib, topilgan xavfsizlik muammolarini tuzating.",
      acceptanceCriteria: [
        "Actions'ga xos hujum vektorlarini biladi",
        "Script injection'dan himoyalanadi"
      ],
      prerequisites: [
        "43.16"
      ]
    },
    {
      id: "45.17",
      title: "Release Automation",
      description: [
        "Reliz avtomatlashtirish: tag push'ida (`on: push: tags: ['v*']`) — build, test, GitHub Release (`gh release create --generate-notes` yoki `softprops/action-gh-release`), image'ni semver tag bilan push, deploy. Yoki release-please: Conventional Commits asosida reliz PR, versiya va CHANGELOG avtomatik.",
        "",
        "Composer paketlari uchun Packagist webhook tag'dan avtomatik yangilanadi. Reliz qaydlari toifalari `.github/release.yml` da.",
        "",
        "```yaml",
        "on: { push: { tags: ['v*.*.*'] } }",
        "jobs:",
        "  release:",
        "    runs-on: ubuntu-latest",
        "    permissions: { contents: write }",
        "    steps:",
        "      - uses: actions/checkout@v4",
        "      - run: gh release create \"$GITHUB_REF_NAME\" --generate-notes",
        "        env: { GH_TOKEN: '${{ github.token }}' }",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Tag push'ida avtomatik GitHub Release va image publish qiluvchi workflow yozing.",
      acceptanceCriteria: [
        "Reliz avtomatlashtirish usullarini biladi",
        "Tag asosidagi reliz oqimini quradi"
      ],
      prerequisites: [
        "34.18"
      ]
    }
  ]
});
