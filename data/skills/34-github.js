/* 34 · GitHub
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 34,
  slug: "github",
  title: "GitHub",
  group: "vcs",
  description: "GitHub — Git repozitoriylar uchun eng mashhur platforma: kod hosting, pull request va code review, issue'lar, loyiha boshqaruvi, GitHub Actions CI/CD, xavfsizlik vositalari va relizlar. Senior dasturchi GitHub'ni jamoaviy jarayonning markazi sifatida sozlaydi: himoya qoidalari, avtomatlashtirish, xavfsizlik va ruxsatlar.",
  subskills: [
    {
      id: "34.1",
      title: "Repositories",
      description: [
        "GitHub repozitoriy — Git repo + platforma imkoniyatlari: README, LICENSE, `.github/` papkasi (workflow'lar, shablonlar, CODEOWNERS, dependabot.yml), sozlamalar (ko'rinish — public/private/internal, default branch, merge usullari, avtomatik branch o'chirish).",
        "",
        "Tashkilot (organization) darajasida: jamoalar, umumiy secret'lar va runner'lar, standart repo shablonlari (template repository). `gh` CLI — repo yaratish, PR, issue, workflow'larni terminaldan boshqarish.",
        "",
        "```bash",
        "gh repo create acme/billing --private --template acme/laravel-template --clone",
        "gh repo edit --delete-branch-on-merge --enable-squash-merge --enable-merge-commit=false",
        "```"
      ],
      priority: "core",
      level: "Foundation",
      practicalTask: "Jamoa uchun Laravel template repozitoriysini (`.github/` papkasi bilan) yarating va undan yangi repo hosil qiling.",
      acceptanceCriteria: [
        "Repozitoriy sozlamalarini va `.github/` tuzilmasini biladi",
        "`gh` CLI bilan ishlay oladi"
      ],
      prerequisites: [
        "33.1"
      ]
    },
    {
      id: "34.2",
      title: "Branch Protection",
      description: [
        "GitHub'da branch protection rules yoki yangi **rulesets**: PR majburiy, tasdiqlar soni, CODEOWNERS tasdig'i, eskirgan tasdiqlarni yangi push'da bekor qilish, status check'lar majburiy (CI), branch yangilangan bo'lishi, suhbatlar hal qilingan bo'lishi, imzolangan commit'lar, chiziqli tarix, force push va o'chirish taqiqi, merge queue.",
        "",
        "Rulesets afzalligi — bir nechta branch/repo uchun markazlashgan va tashkilot darajasida qo'llash mumkin. Admin bypass'ni minimal qiling.",
        "",
        "```text",
        "Ruleset \"main protection\" → target: default branch",
        "  ✓ Require PR (1 approval, CODEOWNERS, dismiss stale)",
        "  ✓ Require status checks: tests, larastan",
        "  ✓ Block force pushes",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Main branch uchun ruleset yarating: PR, 1 tasdiq, CI check'lar va force push taqiqi bilan.",
      acceptanceCriteria: [
        "Branch protection va rulesets imkoniyatlarini biladi",
        "Majburiy status check'larni sozlaydi"
      ],
      prerequisites: [
        "33.20"
      ]
    },
    {
      id: "34.3",
      title: "Pull Requests",
      description: [
        "GitHub PR imkoniyatlari: draft PR (erta fikr), reviewer'lar va avtomatik tayinlash (CODEOWNERS), label'lar, issue'larni avtomatik yopish (`Closes #142`), suggested changes (review'da to'g'ridan-to'g'ri tuzatish taklifi), auto-merge (check'lar o'tgach), merge queue (ko'p PR'li repolarda main'ni barqaror saqlash), PR shablonlari.",
        "",
        "Merge usullari repo darajasida tanlanadi: merge commit, squash, rebase. `gh pr create --fill`, `gh pr checkout 123`, `gh pr review`.",
        "",
        "```bash",
        "gh pr create --draft --title \"feat: refund endpoint\" --body-file .github/pr.md",
        "gh pr merge 142 --squash --auto --delete-branch",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "PR'ni draft sifatida ochib, auto-merge'ni yoqing va `Closes #` bilan issue'ga bog'lang.",
      acceptanceCriteria: [
        "GitHub PR imkoniyatlarini biladi",
        "Auto-merge va merge queue vazifasini tushunadi"
      ],
      prerequisites: [
        "33.19"
      ]
    },
    {
      id: "34.4",
      title: "Code Review",
      description: [
        "GitHub'da review: qatorga izoh, bir nechta qator tanlash, \"suggestion\" bloklari, review holatlari (Comment, Approve, Request changes), fayllarni \"viewed\" deb belgilash, suhbatlarni hal qilish. CODEOWNERS orqali mas'ul shaxslar avtomatik so'raladi.",
        "",
        "Samarali review: kontekst (PR tavsifi, tiket), avtomatlashtirilgan tekshiruvlar (CI, statik tahlil) uslub masalalarini olib tashlaydi, izohlar aniq va sabab bilan, \"nit:\" prefiksi kichik takliflar uchun, tez javob vaqti (masalan, 1 ish kunida).",
        "",
        "```text",
        "[suggestion bloki]",
        "$order = $request->user()->orders()->findOrFail($id);",
        "```",
        "IDOR: boshqa foydalanuvchi buyurtmasiga kirishni oldini olish uchun doira bilan qidiring."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Bitta PR'ni review qiling: kamida bitta suggestion, bitta xavfsizlik va bitta \"nit\" izoh bilan.",
      acceptanceCriteria: [
        "GitHub review vositalarini samarali ishlatadi",
        "Izohlarni sabab bilan va konstruktiv yozadi"
      ],
      prerequisites: [
        "code-review"
      ]
    },
    {
      id: "34.5",
      title: "Issues",
      description: [
        "Issue'lar — vazifa, bug va g'oyalarni kuzatish: shablonlar (bug report, feature request — `.github/ISSUE_TEMPLATE/`, YAML formalari majburiy maydonlar bilan), label'lar (tur, prioritet, modul), assignee, milestone, sub-issue'lar va issue turlari, PR bilan bog'lash.",
        "",
        "Yaxshi bug report: qadamlar, kutilgan va haqiqiy natija, muhit, log/skrinshot. Triage jarayoni: yangi issue'lar muntazam ko'rib chiqiladi, label va prioritet beriladi.",
        "",
        "```yaml",
        "# .github/ISSUE_TEMPLATE/bug.yml",
        "name: Bug report",
        "body:",
        "  - type: textarea",
        "    id: steps",
        "    attributes: { label: Qayta yaratish qadamlari }",
        "    validations: { required: true }",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Bug va feature uchun YAML issue formalarini va label tizimini yarating.",
      acceptanceCriteria: [
        "Issue shablonlari va label'lardan foydalanadi",
        "Sifatli bug report talablarini biladi"
      ],
      prerequisites: [
        "34.1"
      ]
    },
    {
      id: "34.6",
      title: "Projects",
      description: [
        "GitHub Projects — issue va PR'lar ustidan jadval, kanban va timeline ko'rinishlari: custom maydonlar (status, prioritet, sprint/iteration, baho), filtr va guruhlash, avtomatlashtirish (PR merge bo'lganda \"Done\"), bir nechta repozitoriy bo'ylab.",
        "",
        "Kichik va o'rta jamoalar uchun Jira'ga yengil muqobil; iteration maydoni bilan Scrum sprint'larini yuritish mumkin. Insights — burndown va boshqa grafiklar.",
        "",
        "```text",
        "Project \"Billing Q3\" — Board: Backlog → Ready → In progress → Review → Done",
        "Maydonlar: Priority (P0–P3), Iteration (2 hafta), Estimate",
        "```"
      ],
      priority: "optional",
      level: "Junior",
      practicalTask: "Jamoa uchun GitHub Project yarating: iteration, prioritet maydonlari va avtomatik status o'tishlari bilan.",
      acceptanceCriteria: [
        "Projects ko'rinishlari va maydonlarini sozlaydi",
        "Ish oqimini avtomatlashtiradi"
      ],
      prerequisites: [
        "34.5"
      ]
    },
    {
      id: "34.7",
      title: "GitHub Actions",
      description: [
        "GitHub Actions — repozitoriyga o'rnatilgan CI/CD: `.github/workflows/*.yml` da workflow'lar, event'lar (push, pull_request, schedule, workflow_dispatch), job'lar va step'lar, GitHub-hosted yoki self-hosted runner'lar, marketplace action'lari.",
        "",
        "Laravel uchun tipik pipeline: PHP o'rnatish (`shivammathur/setup-php`), composer kesh, MySQL/Redis service'lar, Pint, Larastan, Pest, keyin deploy. Batafsil — GitHub Actions bo'limida.",
        "",
        "```yaml",
        "on: [pull_request]",
        "jobs:",
        "  test:",
        "    runs-on: ubuntu-latest",
        "    steps:",
        "      - uses: actions/checkout@v4",
        "      - uses: shivammathur/setup-php@v2",
        "        with: { php-version: '8.3', coverage: none }",
        "      - run: composer install --no-interaction --prefer-dist",
        "      - run: php artisan test --parallel",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Laravel loyihasi uchun PR'larda ishlaydigan test workflow'ini yozing.",
      acceptanceCriteria: [
        "Workflow, job, step tushunchalarini biladi",
        "Laravel uchun asosiy CI workflow'ini yoza oladi"
      ],
      prerequisites: [
        "github-actions"
      ]
    },
    {
      id: "34.8",
      title: "Secrets",
      description: [
        "Secret'lar — shifrlangan maxfiy qiymatlar (API kalitlari, deploy kalitlari): repo, environment va organization darajasida. Workflow'da `${{ secrets.NAME }}`, log'larda avtomatik niqoblanadi. Fork'dan kelgan PR'larda secret'lar berilmaydi (xavfsizlik).",
        "",
        "Qoidalar: minimal ko'rinish (environment secret'lari faqat tegishli deploy job'ida), muntazam aylantirish, uzoq muddatli bulut kalitlari o'rniga OIDC, secret'ni `echo` qilmaslik yoki fayl sifatida artefaktga qo'ymaslik. Push protection + secret scanning repozitoriyga tushgan kalitlarni topadi.",
        "",
        "```yaml",
        "- run: ./deploy.sh",
        "  env:",
        "    DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Deploy kalitlarini environment secret'lariga ko'chiring va secret scanning + push protection'ni yoqing.",
      acceptanceCriteria: [
        "Secret darajalari va ko'rinishini biladi",
        "Fork PR'larida secret xavfsizligini tushunadi"
      ],
      prerequisites: [
        "45.7"
      ]
    },
    {
      id: "34.9",
      title: "Environments",
      description: [
        "Environment'lar (`staging`, `production`) — deploy maqsadlari: o'z secret va o'zgaruvchilari, himoya qoidalari (required reviewers — qo'lda tasdiq, kutish vaqti, faqat ma'lum branch/tag'lardan deploy), deploy tarixi va URL.",
        "",
        "Production deploy job'i `environment: production` bilan — tasdiqsiz ishga tushmaydi va production secret'lari faqat shu job'ga beriladi. Deploy tarixi qaysi commit qachon chiqqanini ko'rsatadi.",
        "",
        "```yaml",
        "deploy:",
        "  needs: test",
        "  environment:",
        "    name: production",
        "    url: https://app.example.uz",
        "  runs-on: ubuntu-latest",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Staging va production environment'larini yarating; production uchun tasdiqlovchi va faqat tag'dan deploy qoidasini qo'ying.",
      acceptanceCriteria: [
        "Environment himoya qoidalarini sozlaydi",
        "Secret'larni environment bo'yicha ajratadi"
      ],
      prerequisites: [
        "34.8"
      ]
    },
    {
      id: "34.10",
      title: "Releases",
      description: [
        "GitHub Release — tag + reliz yozuvi + biriktirilgan fayllar (binar, arxiv). Avtomatik generatsiya qilingan reliz qaydlari (PR'lar ro'yxati, `.github/release.yml` bilan toifalash), pre-release belgisi, \"latest\" reliz.",
        "",
        "Relizlar changelog va foydalanuvchilarga xabar berish manbai; Composer paketlari uchun versiyalar tag'lardan. `gh release create v2.4.0 --generate-notes`.",
        "",
        "```yaml",
        "# .github/release.yml",
        "changelog:",
        "  categories:",
        "    - title: ✨ Yangi imkoniyatlar",
        "      labels: [feature]",
        "    - title: 🐛 Tuzatishlar",
        "      labels: [bug]",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Label asosida toifalangan avtomatik reliz qaydlari bilan reliz yarating.",
      acceptanceCriteria: [
        "Release va tag farqini biladi",
        "Avtomatik reliz qaydlarini sozlaydi"
      ],
      prerequisites: [
        "33.14"
      ]
    },
    {
      id: "34.11",
      title: "Tags",
      description: [
        "GitHub'da tag'lar Git tag'lari bilan bir xil, qo'shimcha: tag himoyasi (rulesets — kim tag yarata/o'chira oladi; `v*` tag'larini faqat maintainer'lar), tag push'ida workflow ishga tushishi (`on: push: tags: ['v*']`), relizlar bilan bog'lanish.",
        "",
        "Tag'larni o'zgartirmaslik (immutable) — ularga tayangan deploy va paket iste'molchilari uchun muhim.",
        "",
        "```yaml",
        "on:",
        "  push:",
        "    tags: ['v*.*.*']",
        "```"
      ],
      priority: "optional",
      level: "Junior",
      practicalTask: "`v*` tag'larini himoya qiluvchi ruleset va tag push'ida reliz workflow'ini sozlang.",
      acceptanceCriteria: [
        "Tag himoyasini sozlaydi",
        "Tag asosidagi trigger'larni ishlatadi"
      ],
      prerequisites: [
        "33.14"
      ]
    },
    {
      id: "34.12",
      title: "Dependabot",
      description: [
        "Dependabot — dependency'larni avtomatik yangilash va xavfsizlik ogohlantirishlari: `dependabot.yml` da ekotizimlar (composer, npm, github-actions, docker), jadval, guruhlash (bir PR'da bir nechta yangilanish), ignore qoidalari. Security updates — zaif versiyalar uchun avtomatik PR.",
        "",
        "Qo'llash: kuchli CI bilan minor/patch PR'larni auto-merge, major'larni qo'lda review. GitHub Actions versiyalarini ham yangilab turish muhim.",
        "",
        "```yaml",
        "version: 2",
        "updates:",
        "  - package-ecosystem: composer",
        "    directory: /",
        "    schedule: { interval: weekly }",
        "    groups:",
        "      laravel: { patterns: [\"laravel/*\", \"illuminate/*\"] }",
        "  - package-ecosystem: github-actions",
        "    directory: /",
        "    schedule: { interval: monthly }",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Composer, npm va GitHub Actions uchun guruhlangan Dependabot konfiguratsiyasini yozing.",
      acceptanceCriteria: [
        "Dependabot yangilash va xavfsizlik rejimlarini biladi",
        "Guruhlash va jadval bilan shovqinni kamaytiradi"
      ],
      prerequisites: [
        "7.16"
      ]
    },
    {
      id: "34.13",
      title: "Security Advisories",
      description: [
        "GitHub xavfsizlik vositalari: Dependabot alerts (zaif dependency'lar), code scanning (CodeQL va boshqa SARIF vositalari), secret scanning va push protection, repository security advisories (o'z loyihangizdagi zaiflikni yashirin muhokama qilish, private fork'da tuzatish, CVE so'rash, e'lon qilish), `SECURITY.md` (zaiflik haqida qanday xabar berish).",
        "",
        "Jarayon: alert'larni triage qilish (haqiqatan ta'sir qiladimi?), SLA bo'yicha tuzatish, yopilganini tasdiqlash.",
        "",
        "```markdown",
        "# SECURITY.md",
        "Zaiflik topsangiz: security@example.uz (PGP: ...). 72 soat ichida javob beramiz.",
        "Iltimos, ommaviy issue ochmang.",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "`SECURITY.md` yozing, Dependabot alerts va secret scanning'ni yoqing va ochiq alert'larni triage qiling.",
      acceptanceCriteria: [
        "GitHub xavfsizlik vositalarini biladi",
        "Zaifliklarni mas'uliyatli oshkor qilish jarayonini tushunadi"
      ],
      prerequisites: [
        "51.20"
      ]
    },
    {
      id: "34.14",
      title: "CODEOWNERS",
      description: [
        "`CODEOWNERS` fayli (`.github/CODEOWNERS`) — yo'l naqshlari bo'yicha mas'ul shaxs yoki jamoalar: PR o'sha fayllarga tegsa, ular avtomatik reviewer bo'ladi; branch protection \"Require review from Code Owners\" bilan tasdig'i majburiy.",
        "",
        "Qo'llash: muhim hududlar (to'lov, xavfsizlik, migratsiyalar, CI konfiguratsiyasi) uchun ekspertlar; oxirgi mos qator ustunlik qiladi. Juda keng egalik — review'lar sekinlashadi.",
        "",
        "```text",
        "*                         @acme/backend",
        "/app/Domain/Billing/      @acme/billing-team",
        "/database/migrations/     @acme/dba @acme/backend-leads",
        "/.github/workflows/       @acme/devops",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Loyiha uchun CODEOWNERS faylini yozing va muhim hududlar uchun tasdiqni majburiy qiling.",
      acceptanceCriteria: [
        "CODEOWNERS sintaksisi va ustuvorligini biladi",
        "Muhim kod hududlari uchun egalikni belgilaydi"
      ],
      prerequisites: [
        "34.2"
      ]
    },
    {
      id: "34.15",
      title: "Templates",
      description: [
        "Shablonlar jarayonni standartlashtiradi: PR shabloni (`.github/pull_request_template.md` — nima, nega, test, checklist), issue formalari, discussion shablonlari, repository template'lar (yangi loyiha uchun tayyor tuzilma), workflow shablonlari (tashkilot uchun).",
        "",
        "Checklist'lar muhim qadamlarni unutmaslikka yordam beradi: migratsiya orqaga mosmi, `.env.example` yangilandimi, hujjat yangilandimi.",
        "",
        "```markdown",
        "## Checklist",
        "- [ ] Testlar qo'shildi/yangilandi",
        "- [ ] Migratsiya orqaga mos (expand/contract)",
        "- [ ] `.env.example` va hujjat yangilandi",
        "```"
      ],
      priority: "optional",
      level: "Junior",
      practicalTask: "PR shabloni va checklist'ini jamoa bilan kelishib yarating.",
      acceptanceCriteria: [
        "Shablon turlarini biladi",
        "Checklist orqali sifat qadamlarini standartlashtiradi"
      ],
      prerequisites: [
        "34.3"
      ]
    },
    {
      id: "34.16",
      title: "Permissions",
      description: [
        "GitHub ruxsat darajalari: Read, Triage, Write, Maintain, Admin; tashkilotda jamoalar orqali berish (shaxslarga emas), outside collaborator'lar, base permissions. Workflow `GITHUB_TOKEN` ruxsatlari — `permissions:` bilan minimal (default faqat o'qish).",
        "",
        "Eng kam huquq: ko'pchilik dasturchilar — Write (himoyalangan branch bilan), admin — kam sonli. Muntazam audit: ketgan xodimlar, ishlatilmagan deploy key'lar, GitHub App va OAuth ilovalar ruxsatlari.",
        "",
        "```yaml",
        "permissions:",
        "  contents: read",
        "  pull-requests: write   # faqat kerakli job'da",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Repozitoriy va workflow ruxsatlarini audit qiling: jamoalar orqali berish va `GITHUB_TOKEN` ni minimallashtiring.",
      acceptanceCriteria: [
        "Ruxsat darajalarini biladi",
        "`GITHUB_TOKEN` ruxsatlarini minimal qiladi"
      ],
      prerequisites: [
        "20.17"
      ]
    },
    {
      id: "34.17",
      title: "Repository Security",
      description: [
        "Repozitoriy xavfsizligi: branch/tag himoyasi, majburiy 2FA (tashkilot), imzolangan commit'lar, secret scanning + push protection, Dependabot, code scanning, Actions xavfsizligi (uchinchi tomon action'larni SHA bilan qotirish, `pull_request_target` dan ehtiyot bo'lish, minimal `permissions`), deploy key'lar faqat o'qish, webhook secret'lari.",
        "",
        "Supply chain: Actions va dependency'lar orqali hujumlar — OpenSSF Scorecard bilan repozitoriy xavfsizligini baholash mumkin.",
        "",
        "```yaml",
        "- uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2 — SHA bilan qotirilgan",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "OpenSSF Scorecard'ni ishga tushirib, eng past ballarni yaxshilang (action pinning, token ruxsatlari, himoya).",
      acceptanceCriteria: [
        "Repozitoriy xavfsizlik choralarini biladi",
        "Actions supply chain xavflarini tushunadi"
      ],
      prerequisites: [
        "34.16"
      ]
    },
    {
      id: "34.18",
      title: "Release Automation",
      description: [
        "Reliz avtomatlashtirish: Conventional Commits asosida versiyani aniqlash va CHANGELOG yaratish (release-please, semantic-release), reliz PR'i merge bo'lganda tag va GitHub Release, keyin deploy yoki paket nashri. Inson xatosini kamaytiradi va relizlarni bir xil qiladi.",
        "",
        "release-please oqimi: main'ga commit'lar → bot \"Release PR\" ochadi (versiya va changelog bilan) → merge → tag + reliz → deploy workflow.",
        "",
        "```yaml",
        "- uses: googleapis/release-please-action@v4",
        "  with: { release-type: php }",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "release-please bilan avtomatik versiyalash va CHANGELOG'ni sozlab, birinchi relizni chiqaring.",
      acceptanceCriteria: [
        "Avtomatik reliz vositalarining ishlash prinsipini biladi",
        "Conventional Commits bilan bog'laydi"
      ],
      prerequisites: [
        "34.10",
        "33.3"
      ]
    }
  ]
});
