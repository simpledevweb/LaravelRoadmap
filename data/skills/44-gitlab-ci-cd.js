/* 44 · GitLab CI/CD
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 44,
  slug: "gitlab-ci-cd",
  title: "GitLab CI/CD",
  group: "cicd",
  description: "GitLab CI/CD — GitLab'ga o'rnatilgan, `.gitlab-ci.yml` orqali sozlanadigan kuchli pipeline tizimi. Senior dasturchi undan Laravel loyihalari uchun tez, xavfsiz va qayta ishlatiladigan pipeline'lar quradi: qoidalar, kesh va artefaktlar, servislar, muhitlar, MR pipeline'lari va optimallashtirish.",
  subskills: [
    {
      id: "44.1",
      title: "`.gitlab-ci.yml`",
      description: [
        "Pipeline konfiguratsiyasi repozitoriy ildizidagi `.gitlab-ci.yml` da: `stages`, job'lar (har biri `script` bilan), global `default` (umumiy `image`, `before_script`, `cache`), `variables`, `workflow`, `include` (boshqa fayllar va shablonlar). Har push'da GitLab uni o'qib pipeline yaratadi.",
        "",
        "Tekshirish: GitLab'ning CI Lint (Pipeline editor) — sintaksis va birlashtirilgan konfiguratsiyani ko'rish. YAML anchor va `extends` bilan takrorlanishni kamaytirish.",
        "",
        "```yaml",
        "default:",
        "  image: php:8.3-cli",
        "  before_script:",
        "    - composer install --no-interaction --prefer-dist --no-progress",
        "stages: [test, deploy]",
        "pint:",
        "  stage: test",
        "  script: vendor/bin/pint --test",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Laravel uchun `.gitlab-ci.yml` yarating va Pipeline editor'da birlashtirilgan konfiguratsiyani tekshiring.",
      acceptanceCriteria: [
        "Fayl tuzilmasini va asosiy kalitlarni biladi",
        "CI Lint bilan tekshiradi"
      ],
      prerequisites: [
        "35.6"
      ]
    },
    {
      id: "44.2",
      title: "Stages va Jobs",
      description: [
        "Stage — job'lar guruhi; bir stage'dagi job'lar parallel, stage'lar ketma-ket (oldingi stage'ning barcha job'lari muvaffaqiyatli bo'lsa). `needs:` — stage tartibini chetlab o'tib, faqat kerakli job'larni kutish (DAG pipeline) — umumiy vaqtni qisqartiradi.",
        "",
        "Job xususiyatlari: `script`, `before_script`/`after_script`, `image`, `services`, `rules`, `needs`, `artifacts`, `cache`, `timeout`, `retry` (faqat infratuzilma xatolari uchun: `runner_system_failure`), `allow_failure`, `parallel` (matrix).",
        "",
        "```yaml",
        "stages: [build, test, deploy]",
        "phpstan:",
        "  stage: test",
        "  needs: [composer]",
        "  script: vendor/bin/phpstan analyse --no-progress",
        "pest:",
        "  stage: test",
        "  needs: [composer]",
        "  parallel: 3",
        "  script: vendor/bin/pest --shard=$CI_NODE_INDEX/$CI_NODE_TOTAL",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Pipeline'ni `needs` bilan DAG'ga aylantiring va testlarni `parallel` bilan shard'lang; vaqtni solishtiring.",
      acceptanceCriteria: [
        "Stage va `needs` farqini biladi",
        "Parallel va shard job'larni sozlaydi"
      ],
      prerequisites: [
        "44.1"
      ]
    },
    {
      id: "44.3",
      title: "Runners",
      description: [
        "Pipeline job'lari runner'larda bajariladi: GitLab.com shared runner'lari yoki self-hosted. Job'ni runner'ga `tags:` bilan bog'lash (`[docker, php]`, `[deploy-prod]`). Docker executor — har job toza konteynerda `image:` bilan.",
        "",
        "Tezlik: runner'ning lokal keshi, distributed kesh (S3), `concurrent` job'lar soni, kuchli runner'lar og'ir job'lar uchun. Xavfsizlik: production deploy faqat protected runner'da (faqat protected branch'lar), DinD privileged rejimdan ehtiyot.",
        "",
        "```yaml",
        "deploy_production:",
        "  tags: [deploy-prod]          # faqat himoyalangan runner",
        "  rules: [{ if: $CI_COMMIT_BRANCH == \"main\" }]",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Deploy uchun alohida protected runner'ni tag bilan bog'lang va boshqa branch'lardan ishlamasligini tekshiring.",
      acceptanceCriteria: [
        "Runner tanlash mexanizmini biladi",
        "Deploy runner'larini himoyalaydi"
      ],
      prerequisites: [
        "35.7"
      ]
    },
    {
      id: "44.4",
      title: "`rules` va `workflow`",
      description: [
        "`rules:` — job qachon pipeline'ga qo'shilishini belgilaydi (eskirgan `only/except` o'rniga): `if` (o'zgaruvchilar — `$CI_PIPELINE_SOURCE == \"merge_request_event\"`, `$CI_COMMIT_BRANCH`, `$CI_COMMIT_TAG`), `changes` (faqat ma'lum fayllar o'zgarganda), `exists`, `when` (`on_success`, `manual`, `never`, `delayed`), `allow_failure`. Birinchi mos qoida qo'llanadi.",
        "",
        "`workflow: rules` — butun pipeline yaratilishini boshqaradi: dublikat pipeline'larning oldini olish (branch va MR uchun ikki marta ishlamasligi).",
        "",
        "```yaml",
        "workflow:",
        "  rules:",
        "    - if: $CI_PIPELINE_SOURCE == \"merge_request_event\"",
        "    - if: $CI_COMMIT_BRANCH && $CI_OPEN_MERGE_REQUESTS",
        "      when: never",
        "    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH",
        "    - if: $CI_COMMIT_TAG",
        "frontend:",
        "  rules:",
        "    - changes: [resources/js/**/*, package*.json]",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "`workflow: rules` bilan dublikat pipeline'larni yo'qoting va frontend job'ini faqat tegishli fayllar o'zgarganda ishlating.",
      acceptanceCriteria: [
        "`rules` sintaksisi va baholash tartibini biladi",
        "Dublikat pipeline muammosini hal qiladi"
      ],
      prerequisites: [
        "44.2"
      ]
    },
    {
      id: "44.5",
      title: "Variables",
      description: [
        "O'zgaruvchilar manbalari va ustuvorligi: oldindan belgilangan (`CI_*`), `.gitlab-ci.yml` (`variables:` global va job darajasida), project/group/instance CI/CD sozlamalari (protected, masked, environment scope), pipeline ishga tushirishda qo'lda kiritilgan, trigger o'zgaruvchilari. Sirlar faqat sozlamalarda, YAML'da emas.",
        "",
        "Foydali oldindan belgilanganlar: `CI_COMMIT_SHA`, `CI_COMMIT_SHORT_SHA`, `CI_COMMIT_REF_SLUG`, `CI_PIPELINE_SOURCE`, `CI_REGISTRY_IMAGE`, `CI_PROJECT_DIR`, `CI_DEFAULT_BRANCH`, `CI_ENVIRONMENT_NAME`.",
        "",
        "```yaml",
        "variables:",
        "  COMPOSER_CACHE_DIR: \"$CI_PROJECT_DIR/.composer-cache\"",
        "  MYSQL_DATABASE: app_test",
        "  MYSQL_ROOT_PASSWORD: secret     # faqat test servisi uchun, sir emas",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Pipeline'dagi barcha o'zgaruvchilarni manbasi bo'yicha xaritalang va sirlarni masked/protected sozlamalarga ko'chiring.",
      acceptanceCriteria: [
        "O'zgaruvchi manbalari ustuvorligini biladi",
        "Oldindan belgilangan o'zgaruvchilardan foydalanadi"
      ],
      prerequisites: [
        "35.8"
      ]
    },
    {
      id: "44.6",
      title: "Cache va Artifacts",
      description: [
        "**Cache** — job'lar va pipeline'lar orasida qayta ishlatiladigan dependency'lar (composer/npm keshi): tezlik uchun, mavjudligi kafolatlanmaydi; `key` (`files: [composer.lock]` — lock o'zgarsa yangi kesh), `paths`, `policy: pull` (faqat o'qish — ko'p job'lar uchun). **Artifacts** — job natijalari keyingi job'larga uzatiladi (kafolatlangan): `vendor/`, `public/build`, hisobotlar (`reports: junit, coverage_report, codequality`), `expire_in`.",
        "",
        "Qoida: dependency'larni keshlash, build natijalarini artefakt qilish.",
        "",
        "```yaml",
        "composer:",
        "  stage: build",
        "  cache:",
        "    key: { files: [composer.lock] }",
        "    paths: [.composer-cache/]",
        "  script: composer install --prefer-dist --no-progress",
        "  artifacts:",
        "    paths: [vendor/]",
        "    expire_in: 1 hour",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Composer keshini lock fayl kaliti bilan sozlang va `vendor/` ni artefakt sifatida test job'lariga uzating.",
      acceptanceCriteria: [
        "Cache va artifacts farqini biladi",
        "Kesh kalitini lock faylga bog'laydi"
      ],
      prerequisites: [
        "44.2"
      ]
    },
    {
      id: "44.7",
      title: "Dependencies",
      description: [
        "Job'lar o'rtasida artefaktlarni boshqarish: default holatda job oldingi stage'lardagi **barcha** artefaktlarni yuklab oladi (sekin). `dependencies: [composer]` — faqat ko'rsatilgan job artefaktlari; `dependencies: []` — hech biri. `needs: [{job: composer, artifacts: true}]` — DAG bilan birga.",
        "",
        "Bu ortiqcha yuklab olishni kamaytiradi va pipeline'ni tezlashtiradi; artefakti kerak bo'lmagan job'lar (masalan, faqat lint) uchun `[]`.",
        "",
        "```yaml",
        "pint:",
        "  needs: [{ job: composer, artifacts: true }]",
        "deploy:",
        "  needs: [{ job: build_assets, artifacts: true }, { job: pest, artifacts: false }]",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Har job uchun faqat kerakli artefaktlarni yuklab olishni sozlab, pipeline vaqtining kamayishini o'lchang.",
      acceptanceCriteria: [
        "Default artefakt yuklash xatti-harakatini biladi",
        "`dependencies`/`needs` bilan uni cheklaydi"
      ],
      prerequisites: [
        "44.6"
      ]
    },
    {
      id: "44.8",
      title: "Services",
      description: [
        "`services:` — job davomida yonida ishlaydigan qo'shimcha konteynerlar: MySQL, PostgreSQL, Redis, Meilisearch. Ular alias (hostname) orqali topiladi (`mysql`, `redis`); konfiguratsiya `variables` orqali. Testlar uchun haqiqiy DB — production engine'iga mos.",
        "",
        "Nozikliklar: servis tayyor bo'lishini kutish (health check yo'q — skriptda kutish), versiyalarni production bilan moslash, xotira (`tmpfs` bilan tez DB — custom command), servis log'lari (`CI_DEBUG_SERVICES`).",
        "",
        "```yaml",
        "pest:",
        "  services:",
        "    - name: mysql:8.4",
        "      alias: mysql",
        "      command: [\"--innodb-flush-log-at-trx-commit=2\"]",
        "    - redis:7",
        "  variables:",
        "    DB_HOST: mysql",
        "    REDIS_HOST: redis",
        "  script:",
        "    - until mysqladmin ping -h mysql --silent; do sleep 1; done",
        "    - php artisan test --parallel",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Test job'iga MySQL va Redis servislarini qo'shib, tayyorlikni kutish va production versiyalariga moslashni sozlang.",
      acceptanceCriteria: [
        "Services va alias mexanizmini biladi",
        "Servis tayyorligini kutadi"
      ],
      prerequisites: [
        "28.15"
      ]
    },
    {
      id: "44.9",
      title: "Docker-in-Docker Considerations",
      description: [
        "CI'da Docker image build qilish usullari: **DinD** (`docker:dind` servisi — privileged rejim talab qiladi — xavfsizlik riski, runner izolyatsiyasi kerak), **Docker socket binding** (host socket'ini ulash — job host Docker'ga to'liq kirish, yanada xavfli), **Kaniko** yoki **Buildah** (privileged'siz, daemon'siz build — xavfsizroq), BuildKit.",
        "",
        "Kesh: DinD'da qatlam keshi har job'da yo'qoladi — `--cache-from` registry'dan yoki BuildKit `--cache-to/--cache-from type=registry`. Umumiy runner'larda privileged'dan qochish tavsiya etiladi.",
        "",
        "```yaml",
        "build_image:",
        "  image: { name: gcr.io/kaniko-project/executor:debug, entrypoint: [\"\"] }",
        "  script:",
        "    - /kaniko/executor --context \"$CI_PROJECT_DIR\" --destination \"$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA\" --cache=true",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Image build'ni DinD'dan Kaniko'ga o'tkazing va kesh bilan build vaqtini solishtiring.",
      acceptanceCriteria: [
        "DinD, socket binding va Kaniko xavf/foydalarini biladi",
        "Privileged rejimdan qochadi"
      ],
      prerequisites: [
        "35.9"
      ]
    },
    {
      id: "44.10",
      title: "Test Pipelines",
      description: [
        "Laravel test pipeline'i: `composer` (kesh + artefakt) → parallel: `pint`, `phpstan`, `pest` (servislar bilan, shard'lar), `composer audit`, ixtiyoriy `npm run lint`/`vitest`. Hisobotlar: JUnit (MR'da yiqilgan testlar), coverage (`coverage: '/^\\s*Lines:\\s*\\d+.\\d+\\%/'` regex — MR'da foiz), Code Quality (PHPStan JSON → codequality format).",
        "",
        "MR pipeline'lari tez bo'lishi kerak (10 daqiqadan kam ideal) — kesh, parallellik va `changes` qoidalari bilan.",
        "",
        "```yaml",
        "pest:",
        "  stage: test",
        "  script: php artisan test --parallel --coverage-text --log-junit=junit.xml",
        "  coverage: '/^\\s*Lines:\\s*(\\d+\\.\\d+)%/'",
        "  artifacts:",
        "    when: always",
        "    reports: { junit: junit.xml }",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "MR'da test natijalari, coverage foizi va PHPStan code quality hisobotlari ko'rinadigan test pipeline'ini quring.",
      acceptanceCriteria: [
        "Test pipeline tarkibini biladi",
        "Hisobotlarni MR'ga integratsiya qiladi"
      ],
      prerequisites: [
        "44.6"
      ]
    },
    {
      id: "44.11",
      title: "Build Pipelines",
      description: [
        "Build bosqichi: production dependency'lar (`composer install --no-dev -o`), asset'lar (`npm ci && npm run build`), Docker image (multi-stage, SHA tag, registry'ga push) yoki tarball artefakt. Faqat main/tag'lar uchun (har MR'da image build — isrof, agar review app'lar bo'lmasa).",
        "",
        "Image metadata: OCI label'lar (`org.opencontainers.image.revision=$CI_COMMIT_SHA`), build vaqti. Image zaiflik skanerlash build'dan keyin.",
        "",
        "```yaml",
        "build_image:",
        "  stage: build",
        "  image: docker:27",
        "  services: [docker:27-dind]",
        "  rules: [{ if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH }, { if: $CI_COMMIT_TAG }]",
        "  script:",
        "    - docker login -u \"$CI_REGISTRY_USER\" -p \"$CI_REGISTRY_PASSWORD\" \"$CI_REGISTRY\"",
        "    - docker build --label \"org.opencontainers.image.revision=$CI_COMMIT_SHA\" -t \"$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA\" .",
        "    - docker push \"$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA\"",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Faqat main va tag'lar uchun ishlaydigan, OCI label'li image build job'ini yozing.",
      acceptanceCriteria: [
        "Build bosqichini qachon ishlatishni belgilaydi",
        "Image'ni metadata bilan versiyalaydi"
      ],
      prerequisites: [
        "44.9"
      ]
    },
    {
      id: "44.12",
      title: "Deployment Environments",
      description: [
        "`environment:` kalit so'zi job'ni muhitga bog'laydi: `name`, `url`, `deployment_tier`, `on_stop` (review app'ni o'chiruvchi job), `auto_stop_in` (vaqtinchalik muhitlar). GitLab deploy tarixini, joriy versiyani va rollback (re-deploy) imkoniyatini beradi.",
        "",
        "Dinamik muhitlar: `review/$CI_COMMIT_REF_SLUG` — har MR uchun alohida preview (Docker yoki K8s namespace). Environment scope'li o'zgaruvchilar muhitga mos qiymat beradi.",
        "",
        "```yaml",
        "deploy_review:",
        "  stage: deploy",
        "  script: ./deploy-review.sh \"$CI_COMMIT_REF_SLUG\"",
        "  environment:",
        "    name: review/$CI_COMMIT_REF_SLUG",
        "    url: https://$CI_COMMIT_REF_SLUG.review.example.uz",
        "    on_stop: stop_review",
        "    auto_stop_in: 3 days",
        "  rules: [{ if: $CI_PIPELINE_SOURCE == \"merge_request_event\" }]",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Staging, production va MR'lar uchun dinamik review muhitlarini sozlang.",
      acceptanceCriteria: [
        "Environment kalitlarini biladi",
        "Dinamik review muhitlarini boshqaradi"
      ],
      prerequisites: [
        "35.10"
      ]
    },
    {
      id: "44.13",
      title: "Protected Variables",
      description: [
        "Protected o'zgaruvchilar faqat protected branch va tag'larda ishlaydigan pipeline'larga beriladi — feature branch'dagi (ehtimoliy zararli) kod production sirlarini o'qiy olmaydi. Masked — log'da `[MASKED]`. Environment scope — `production` deploy job'iga faqat production qiymatlari.",
        "",
        "Kombinatsiya: production sirlari = protected + masked + environment scope `production`. \"File\" turi — kalitlar va sertifikatlar uchun. Muntazam aylantirish va kirish huquqlari (faqat Maintainer'lar ko'radi).",
        "",
        "```yaml",
        "deploy_production:",
        "  environment: production",
        "  script:",
        "    - ssh -i \"$DEPLOY_SSH_KEY\" deploy@$PROD_HOST \"./deploy.sh $CI_COMMIT_SHA\"   # DEPLOY_SSH_KEY — File, protected",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Production sirlarini protected, masked va environment scope'li qiling; feature branch'da ular yo'qligini tekshiring.",
      acceptanceCriteria: [
        "Protected o'zgaruvchilar xavfsizlik modelini biladi",
        "Uchala himoyani birga qo'llaydi"
      ],
      prerequisites: [
        "35.8"
      ]
    },
    {
      id: "44.14",
      title: "Manual Jobs",
      description: [
        "`when: manual` — job pipeline'da paydo bo'ladi, lekin faqat qo'lda bosilganda ishlaydi: production deploy, ma'lumot migratsiyasi, kesh tozalash. `allow_failure: false` — manual job bajarilmaguncha pipeline \"blocked\" holatda (keyingi stage'lar kutadi). Protected environment bilan — faqat ruxsatli shaxslar ishga tushira oladi.",
        "",
        "Qo'lda kiritiladigan o'zgaruvchilar (`spec:inputs` yoki pipeline variables) — masalan, qaysi versiyaga rollback.",
        "",
        "```yaml",
        "deploy_production:",
        "  stage: deploy",
        "  when: manual",
        "  allow_failure: false",
        "  environment: production",
        "  rules: [{ if: $CI_COMMIT_TAG }]",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Tag pipeline'ida production deploy'ni bloklovchi manual job sifatida sozlang.",
      acceptanceCriteria: [
        "`when: manual` va `allow_failure` ta'sirini biladi",
        "Manual job'larni ruxsatlar bilan himoyalaydi"
      ],
      prerequisites: [
        "44.4"
      ]
    },
    {
      id: "44.15",
      title: "Environments va Rollbacks",
      description: [
        "GitLab'da rollback: environment sahifasida oldingi muvaffaqiyatli deploy'ni \"Re-deploy\" qilish — o'sha commit/artefakt bilan deploy job'i qayta ishga tushadi. Shart: deploy job'i idempotent va aniq versiyani deploy qiladi (`$CI_COMMIT_SHA` image tag'i), artefaktlar hali mavjud (`expire_in` yetarli) yoki registry'da image saqlangan.",
        "",
        "`resource_group: production` — bir vaqtda faqat bitta deploy (rollback va yangi deploy to'qnashmasligi). Ma'lumot o'zgarishlari (migratsiya) rollback qilinmaydi — orqaga mos migratsiyalar shart.",
        "",
        "```yaml",
        "deploy_production:",
        "  resource_group: production",
        "  environment: production",
        "  script: ./deploy.sh \"$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA\"",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Production'ga ikki versiyani deploy qilib, GitLab interfeysi orqali oldingisiga rollback qiling.",
      acceptanceCriteria: [
        "Re-deploy orqali rollback shartlarini biladi",
        "`resource_group` bilan parallel deploy'larning oldini oladi"
      ],
      prerequisites: [
        "43.12"
      ]
    },
    {
      id: "44.16",
      title: "Merge Request Pipelines",
      description: [
        "MR pipeline'lari (`$CI_PIPELINE_SOURCE == \"merge_request_event\"`) — MR kontekstida ishlaydi: MR widget'ida natijalar, \"merge when pipeline succeeds\". **Merged results pipeline** — MR branch'i maqsad branch bilan birlashtirilgan holatni sinaydi (birlashtirgandan keyingi buzilishlarni oldindan topadi). **Merge train** — bir nechta MR navbat bilan ketma-ket birlashtirilgan holatda sinaladi (main hech qachon qizil bo'lmaydi).",
        "",
        "`workflow:rules` bilan MR va branch pipeline'larini to'g'ri ajratish (dublikatlarsiz).",
        "",
        "```yaml",
        "workflow:",
        "  rules:",
        "    - if: $CI_PIPELINE_SOURCE == \"merge_request_event\"",
        "    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "MR pipeline'larini sozlab, \"pipeline muvaffaqiyatli bo'lishi shart\" merge qoidasini yoqing.",
      acceptanceCriteria: [
        "MR, merged results va merge train farqini biladi",
        "MR pipeline'larini dublikatlarsiz sozlaydi"
      ],
      prerequisites: [
        "44.4"
      ]
    },
    {
      id: "44.17",
      title: "Pipeline Optimization",
      description: [
        "Tezlashtirish: DAG (`needs`), parallel job'lar va shard'lar, kesh (lock fayl kaliti, `policy: pull`), faqat kerakli artefaktlar (`dependencies`), `rules: changes` (o'zgarmagan qismlarni o'tkazib yuborish), kichik image'lar (oldindan kerakli kengaytmalar o'rnatilgan maxsus CI image — har job'da `apt install` emas), `interruptible: true` (yangi push eski pipeline'ni bekor qiladi), tezkor runner'lar, `include` bilan qayta ishlatiladigan shablonlar.",
        "",
        "Pipeline analytics — eng sekin job'larni toping va avval ularni optimallashtiring.",
        "",
        "```yaml",
        "default:",
        "  image: registry.example.uz/ci/php:8.3     # kengaytmalar oldindan o'rnatilgan",
        "  interruptible: true",
        "pest:",
        "  cache: { key: { files: [composer.lock] }, paths: [.composer-cache/], policy: pull }",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Pipeline vaqtini o'lchab, kamida 3 ta optimallashtirish bilan 40%+ qisqartiring.",
      acceptanceCriteria: [
        "Pipeline tezlashtirish usullarini biladi",
        "Optimallashtirishni o'lchov bilan boshqaradi"
      ],
      prerequisites: [
        "44.6",
        "44.2"
      ]
    }
  ]
});
