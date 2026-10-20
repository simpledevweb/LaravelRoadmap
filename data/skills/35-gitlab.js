/* 35 · GitLab
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 35,
  slug: "gitlab",
  title: "GitLab",
  group: "vcs",
  description: "GitLab — Git hosting, CI/CD, konteyner va paket registry'lari, xavfsizlik skanerlash va loyiha boshqaruvini bitta platformada birlashtirgan DevOps platformasi; O'zbekistondagi ko'plab kompaniyalar uni self-hosted holda ishlatadi. Senior dasturchi GitLab'da merge request jarayoni, himoyalangan branch'lar, CI/CD, registry'lar va ruxsatlarni sozlay oladi.",
  subskills: [
    {
      id: "35.1",
      title: "Projects va Groups",
      description: [
        "GitLab'da **project** — repozitoriy + issue, MR, CI/CD, registry, wiki. **Group** va subgroup'lar — loyihalarni tashkil qilish (jamoa, mahsulot bo'yicha), umumiy a'zolik va ruxsatlar meros qilinadi, umumiy CI/CD o'zgaruvchilari va runner'lar, group darajasidagi board va milestone'lar.",
        "",
        "Tuzilma misoli: `acme/backend/billing`, `acme/backend/auth`, `acme/shared/ci-templates`. Group darajasida sozlash (MR qoidalari, push qoidalari) barcha loyihalarga izchillik beradi.",
        "",
        "```bash",
        "glab repo create acme/backend/billing --private",
        "glab repo clone acme/backend/billing",
        "```"
      ],
      priority: "core",
      level: "Foundation",
      practicalTask: "Jamoa uchun group/subgroup tuzilmasini loyihalab, umumiy CI o'zgaruvchilari va a'zolikni sozlang.",
      acceptanceCriteria: [
        "Project va group farqini biladi",
        "Group darajasida sozlamalar merosini tushunadi"
      ],
      prerequisites: [
        "33.1"
      ]
    },
    {
      id: "35.2",
      title: "Branches va Merge Requests",
      description: [
        "Merge Request (MR) — GitHub PR analogi: draft MR, reviewer va assignee, label, milestone, issue'larni yopish (`Closes #12`), \"merge when pipeline succeeds\" (auto-merge), squash, fast-forward/rebase merge rejimlari, merge train'lar (Premium — main barqarorligi uchun MR'larni navbat bilan sinash).",
        "",
        "MR pipeline natijalari, test hisobotlari, coverage va Code Quality widget'lari MR sahifasida ko'rinadi.",
        "",
        "```bash",
        "glab mr create --draft --title \"feat: refund endpoint\" --fill",
        "glab mr merge 42 --auto-merge --squash",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "MR'ni draft sifatida ochib, pipeline muvaffaqiyatli bo'lganda avtomatik merge'ni yoqing.",
      acceptanceCriteria: [
        "MR imkoniyatlarini biladi",
        "Merge rejimlarini tanlaydi"
      ],
      prerequisites: [
        "33.19"
      ]
    },
    {
      id: "35.3",
      title: "Code Review",
      description: [
        "GitLab review: qatorga izoh, ko'p qatorli tanlash, suggestion'lar (bir yoki bir nechta qatorga taklif — muallif bir tugma bilan qo'llaydi), \"Start a review\" (izohlarni yig'ib, birdan yuborish), thread'larni resolve qilish (merge uchun majburiy qilish mumkin), approve.",
        "",
        "Code Owners (`CODEOWNERS`) va approval qoidalari (35.16) review'ni majburiy qiladi. CI natijalari (testlar, Code Quality, SAST) MR'da ko'rinib, review'ni avtomatlashtirilgan tekshiruvlar bilan boyitadi.",
        "",
        "```text",
        "[suggestion bloki]",
        "$order = $request->user()->orders()->findOrFail($id);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "MR'ni \"Start a review\" rejimida ko'rib chiqing: suggestion va thread'larni ishlating.",
      acceptanceCriteria: [
        "GitLab review vositalarini ishlatadi",
        "Thread'larni resolve qilishni majburiy qilish mumkinligini biladi"
      ],
      prerequisites: [
        "code-review"
      ]
    },
    {
      id: "35.4",
      title: "Protected Branches",
      description: [
        "Protected branch — kim push va merge qila olishini belgilaydi (No one / Developers / Maintainers), force push taqiqi, Code Owner tasdig'i talabi. Wildcard (`release/*`). Protected tag'lar — reliz tag'larini kim yarata olishi.",
        "",
        "Odatiy sozlama: `main` — push: No one, merge: Maintainers (yoki Developers + approval qoidalari), force push yo'q. Protected branch'larda ishlaydigan pipeline'lar protected o'zgaruvchilarni oladi — production secret'lari himoyalanadi.",
        "",
        "```text",
        "main       → Allowed to merge: Maintainers · Allowed to push: No one · Code owner approval: ✓",
        "release/*  → Allowed to merge: Maintainers · Allowed to push: No one",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Main va release branch'larini himoyalang va to'g'ridan-to'g'ri push rad etilishini tekshiring.",
      acceptanceCriteria: [
        "Protected branch sozlamalarini biladi",
        "Protected o'zgaruvchilar bilan bog'liqligini tushunadi"
      ],
      prerequisites: [
        "33.20"
      ]
    },
    {
      id: "35.5",
      title: "Issues va Boards",
      description: [
        "GitLab issue'lari: shablonlar (`.gitlab/issue_templates/`), label'lar (scoped label'lar — `priority::high`, bir vaqtda faqat bittasi), weight (baho), due date, milestone, epic'lar (group darajasida), bog'liq issue'lar. Issue board — label yoki milestone asosidagi kanban ustunlari; issue'ni ustunlar orasida sudrash label'ni o'zgartiradi.",
        "",
        "Iteration'lar — sprint'lar (cadence bilan avtomatik), burndown grafiklari. Kichik va o'rta jamoalar uchun Jira'siz to'liq Scrum/Kanban.",
        "",
        "```text",
        "Board ustunlari: workflow::todo → workflow::doing → workflow::review → Closed",
        "Scoped labels: type::bug, priority::p1",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Scoped label'lar asosida workflow board'ini va bug shablonini yarating.",
      acceptanceCriteria: [
        "Scoped label va board mexanizmini biladi",
        "Iteration va milestone'lardan foydalanadi"
      ],
      prerequisites: [
        "35.1"
      ]
    },
    {
      id: "35.6",
      title: "GitLab CI/CD",
      description: [
        "GitLab CI/CD — `.gitlab-ci.yml` orqali sozlanadigan o'rnatilgan pipeline tizimi: stage'lar, job'lar, runner'lar, artefakt va kesh, environment'lar, MR pipeline'lari, rejali pipeline'lar, `include` bilan qayta ishlatiladigan shablonlar, CI/CD component'lar.",
        "",
        "Laravel uchun tipik pipeline: `build` (composer), `test` (Pint, Larastan, Pest — MySQL/Redis services bilan), `deploy` (staging avtomatik, production qo'lda). Batafsil — GitLab CI/CD bo'limida.",
        "",
        "```yaml",
        "stages: [build, test, deploy]",
        "test:",
        "  stage: test",
        "  image: php:8.3",
        "  services: [mysql:8.4, redis:7]",
        "  script:",
        "    - composer install --no-interaction --prefer-dist",
        "    - php artisan test --parallel",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Laravel loyihasi uchun build va test stage'li asosiy `.gitlab-ci.yml` yozing.",
      acceptanceCriteria: [
        "Pipeline asosiy tushunchalarini biladi",
        "Laravel uchun CI pipeline'ini yoza oladi"
      ],
      prerequisites: [
        "gitlab-ci-cd"
      ]
    },
    {
      id: "35.7",
      title: "Runners",
      description: [
        "Runner — job'larni bajaruvchi agent. Turlari: instance (shared), group, project runner'lar; executor'lar: `docker` (eng keng tarqalgan — har job toza konteynerda), `shell`, `kubernetes`, `docker-autoscaler`. Tag'lar orqali job'ni muayyan runner'ga yo'naltirish (`tags: [docker, php]`).",
        "",
        "Self-hosted runner xavfsizligi: privileged rejim (DinD uchun) xavfli, protected runner'lar faqat protected branch'lar uchun (production deploy), maxfiy ma'lumot runner xostida qolmasligi. Kesh va konkurensiya (`concurrent`) sozlamalari tezlikka ta'sir qiladi.",
        "",
        "```toml",
        "# /etc/gitlab-runner/config.toml",
        "concurrent = 4",
        "[[runners]]",
        "  executor = \"docker\"",
        "  [runners.docker]",
        "    image = \"php:8.3\"",
        "    privileged = false",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Docker executor'li project runner o'rnating, tag bilan bog'lang va deploy uchun protected runner sozlang.",
      acceptanceCriteria: [
        "Runner turlari va executor'larni biladi",
        "Runner xavfsizligi masalalarini tushunadi"
      ],
      prerequisites: [
        "36.1"
      ]
    },
    {
      id: "35.8",
      title: "CI Variables",
      description: [
        "CI/CD o'zgaruvchilari: project/group/instance darajasida, **protected** (faqat protected branch/tag pipeline'larida), **masked** (log'da yashiriladi), **hidden**, environment scope (`production` uchun alohida qiymat), \"File\" turi (sertifikat, kubeconfig — vaqtinchalik faylga yoziladi). Oldindan belgilangan o'zgaruvchilar: `CI_COMMIT_SHA`, `CI_COMMIT_REF_NAME`, `CI_REGISTRY_IMAGE`, `CI_PIPELINE_SOURCE`.",
        "",
        "Production secret'lari — protected + masked + environment scope. `.gitlab-ci.yml` da hech qachon sir yozmang.",
        "",
        "```yaml",
        "deploy_production:",
        "  environment: production",
        "  script:",
        "    - echo \"$SSH_PRIVATE_KEY\" > /tmp/key && chmod 600 /tmp/key   # File turi afzal",
        "    - ./deploy.sh \"$CI_COMMIT_SHA\"",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Deploy secret'larini protected, masked va environment scope'li o'zgaruvchilarga o'tkazing.",
      acceptanceCriteria: [
        "Protected va masked o'zgaruvchilar farqini biladi",
        "Environment scope'dan foydalanadi"
      ],
      prerequisites: [
        "35.6"
      ]
    },
    {
      id: "35.9",
      title: "Container Registry",
      description: [
        "GitLab Container Registry — har bir project uchun o'rnatilgan Docker registry: `$CI_REGISTRY_IMAGE`, CI'da `$CI_REGISTRY_USER`/`$CI_JOB_TOKEN` bilan login. Image tag'lari: commit SHA (o'zgarmas, deploy uchun), branch nomi, semver tag.",
        "",
        "Tozalash siyosati (cleanup policy) — eski tag'larni avtomatik o'chirish (disk to'lishining oldini olish). Deploy serveri image'ni deploy token yoki project access token bilan tortadi.",
        "",
        "```yaml",
        "build_image:",
        "  stage: build",
        "  image: docker:27",
        "  services: [docker:27-dind]",
        "  script:",
        "    - docker login -u \"$CI_REGISTRY_USER\" -p \"$CI_REGISTRY_PASSWORD\" \"$CI_REGISTRY\"",
        "    - docker build -t \"$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA\" .",
        "    - docker push \"$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA\"",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Laravel image'ini CI'da build qilib registry'ga SHA tag bilan push qiling va cleanup siyosatini sozlang.",
      acceptanceCriteria: [
        "Registry autentifikatsiyasi va tag strategiyasini biladi",
        "Cleanup siyosatini sozlaydi"
      ],
      prerequisites: [
        "36.17"
      ]
    },
    {
      id: "35.10",
      title: "Environments",
      description: [
        "GitLab environment'lari (`staging`, `production`, review app'lar uchun dinamik `review/$CI_COMMIT_REF_SLUG`) — deploy tarixi, joriy versiya, URL, qo'lda rollback (oldingi deploy'ni qayta ishga tushirish), `on_stop` bilan review muhitini o'chirish, protected environment'lar (kim deploy qila oladi, tasdiq talabi — Premium).",
        "",
        "Environment scope'li o'zgaruvchilar har muhitga o'z qiymatini beradi.",
        "",
        "```yaml",
        "deploy_staging:",
        "  stage: deploy",
        "  environment: { name: staging, url: https://staging.example.uz }",
        "  script: ./deploy.sh staging",
        "  rules:",
        "    - if: $CI_COMMIT_BRANCH == \"main\"",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Staging (avtomatik) va production (qo'lda, protected) environment'larini deploy tarixi bilan sozlang.",
      acceptanceCriteria: [
        "Environment va deploy tarixini boshqaradi",
        "Dinamik review muhitlarini biladi"
      ],
      prerequisites: [
        "35.6"
      ]
    },
    {
      id: "35.11",
      title: "Deployments",
      description: [
        "GitLab'da deploy — environment'ga bog'langan job: har muvaffaqiyatli deploy tarixda saqlanadi, \"Re-deploy\" tugmasi bilan rollback, deploy freeze (ma'lum vaqtda deploy taqiqi — masalan, bayram kunlari), resource group (`resource_group: production` — bir vaqtda faqat bitta deploy), deploy approvals.",
        "",
        "Deploy usullari: SSH + Deployer/Envoy, konteyner (registry → server/k8s), Kubernetes agent. Resource group parallel deploy'lar to'qnashuvining oldini oladi.",
        "",
        "```yaml",
        "deploy_production:",
        "  stage: deploy",
        "  environment: production",
        "  resource_group: production",
        "  when: manual",
        "  script: ./deploy.sh production \"$CI_COMMIT_SHA\"",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Production deploy job'iga resource group va qo'lda ishga tushirishni qo'shing, rollback'ni sinang.",
      acceptanceCriteria: [
        "Resource group va deploy freeze vazifasini biladi",
        "Re-deploy orqali rollback qila oladi"
      ],
      prerequisites: [
        "35.10"
      ]
    },
    {
      id: "35.12",
      title: "Releases",
      description: [
        "GitLab Release — tag'ga bog'langan reliz: tavsif (changelog), asset havolalari, milestone'lar, evidence (reliz holatining snapshot'i). CI'dan `release:` kalit so'zi yoki `release-cli` bilan avtomatik yaratish. GitLab Changelog API commit trailer'lari (`Changelog: added`) asosida changelog generatsiya qiladi.",
        "",
        "```yaml",
        "release_job:",
        "  stage: deploy",
        "  image: registry.gitlab.com/gitlab-org/release-cli:latest",
        "  rules: [{ if: $CI_COMMIT_TAG }]",
        "  script: echo \"Releasing $CI_COMMIT_TAG\"",
        "  release:",
        "    tag_name: $CI_COMMIT_TAG",
        "    description: CHANGELOG.md",
        "```"
      ],
      priority: "optional",
      level: "Junior",
      practicalTask: "Tag push'ida avtomatik GitLab Release yaratuvchi job yozing.",
      acceptanceCriteria: [
        "Release va tag bog'liqligini biladi",
        "Relizni CI orqali avtomatlashtiradi"
      ],
      prerequisites: [
        "33.14"
      ]
    },
    {
      id: "35.13",
      title: "Package Registry",
      description: [
        "GitLab Package Registry — ichki paketlar uchun: Composer, npm, Maven, PyPI, generic va boshqalar. Composer paketi tag yoki branch'dan API orqali nashr qilinadi; iste'molchi loyiha `repositories` da group registry URL'ini ko'rsatadi va deploy/CI token bilan autentifikatsiya qiladi.",
        "",
        "Ichki umumiy kod (SDK, domen paketlari) uchun Satis yoki Private Packagist'ga muqobil.",
        "",
        "```bash",
        "curl --fail --data tag=v1.2.0 \\",
        "  \"https://gitlab.example.uz/api/v4/projects/$CI_PROJECT_ID/packages/composer?job_token=$CI_JOB_TOKEN\"",
        "```",
        "```json",
        "\"repositories\": [{ \"type\": \"composer\", \"url\": \"https://gitlab.example.uz/api/v4/group/12/-/packages/composer/\" }]",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Ichki Composer paketini GitLab Package Registry'ga nashr qilib, boshqa loyihada o'rnating.",
      acceptanceCriteria: [
        "Composer paketini GitLab registry'ga nashr qila oladi",
        "Iste'molchi loyihada autentifikatsiyani sozlaydi"
      ],
      prerequisites: [
        "7.10"
      ]
    },
    {
      id: "35.14",
      title: "Security Scanning",
      description: [
        "GitLab xavfsizlik skanerlari (ba'zilari Ultimate): SAST (statik kod tahlili), Dependency Scanning (zaif paketlar), Secret Detection (commit'lardagi sirlar), Container Scanning (image zaifliklari), DAST (ishlayotgan ilovaga hujum simulyatsiyasi), License Compliance. Shablonlar orqali yoqiladi, natijalar MR widget'ida va Security dashboard'da.",
        "",
        "Bepul versiyada ham Secret Detection va SAST'ning bir qismi mavjud; qolganlari uchun ochiq vositalar (`composer audit`, Trivy, Gitleaks) CI'ga qo'shiladi.",
        "",
        "```yaml",
        "include:",
        "  - template: Jobs/SAST.gitlab-ci.yml",
        "  - template: Jobs/Secret-Detection.gitlab-ci.yml",
        "container_scan:",
        "  image: aquasec/trivy:latest",
        "  script: trivy image --exit-code 1 --severity HIGH,CRITICAL \"$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA\"",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Pipeline'ga Secret Detection, `composer audit` va Trivy image skanerini qo'shing.",
      acceptanceCriteria: [
        "GitLab xavfsizlik skanerlarini biladi",
        "Ochiq vositalar bilan bo'shliqlarni to'ldiradi"
      ],
      prerequisites: [
        "51.20"
      ]
    },
    {
      id: "35.15",
      title: "Permissions",
      description: [
        "GitLab rollari: Guest, Reporter, Developer, Maintainer, Owner (+ Planner, custom rollar). Developer — branch'larga push, MR yaratish; Maintainer — protected branch'larga merge, sozlamalar; Owner — group/project boshqaruvi. Ruxsatlar group'dan meros, SAML/LDAP group sync, a'zolik muddati (expiration date — vaqtinchalik kirish).",
        "",
        "Token'lar: personal, project, group access token'lar va deploy token'lar — minimal scope va muddat bilan. Muntazam audit: ketgan xodimlar, muddatsiz token'lar.",
        "",
        "```text",
        "Developer   → kod, MR, pipeline",
        "Maintainer  → protected branch merge, CI o'zgaruvchilari",
        "Deploy token (read_registry) → serverda image tortish uchun",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Loyiha a'zolari va token'larini audit qilib, eng kam huquq tamoyiliga keltiring.",
      acceptanceCriteria: [
        "GitLab rollarini va meros mexanizmini biladi",
        "Token'larni minimal scope va muddat bilan beradi"
      ],
      prerequisites: [
        "20.17"
      ]
    },
    {
      id: "35.16",
      title: "Merge Request Approval Rules",
      description: [
        "Approval qoidalari: tasdiqlar soni, qoida bo'yicha tasdiqlovchilar (masalan, \"Security\" guruhi — `app/Auth/**` o'zgarsa), Code Owner tasdig'i, muallif o'z MR'ini tasdiqlay olmasligi, yangi commit'da tasdiqlarni bekor qilish, commit qilganlarning tasdiqlashini taqiqlash, ruxsatsiz qoidalarni MR'da o'zgartirmaslik.",
        "",
        "Bu sifat va xavfsizlik nazoratini jarayonga majburiy kiritadi (ba'zi imkoniyatlar Premium). \"Pipeline muvaffaqiyatli bo'lishi\" va \"barcha thread'lar hal qilingan\" sozlamalari bilan birga.",
        "",
        "```text",
        "Rule \"Backend\": 1 approval from @backend",
        "Rule \"Billing owners\": 1 approval when /app/Domain/Billing/ changes",
        "✓ Prevent approval by author · ✓ Remove approvals on new commits",
        "✓ Pipelines must succeed · ✓ All threads must be resolved",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "MR approval qoidalarini (umumiy + kritik modul uchun maxsus) va merge shartlarini sozlang.",
      acceptanceCriteria: [
        "Approval qoidalari turlarini biladi",
        "Merge shartlarini sifat darvozasi sifatida sozlaydi"
      ],
      prerequisites: [
        "35.4"
      ]
    }
  ]
});
