/* 33 · Git
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 33,
  slug: "git",
  title: "Git",
  group: "vcs",
  description: "Git — taqsimlangan versiya boshqaruv tizimi va jamoaviy ishlab chiqishning asosi. Senior dasturchi Git'ning ichki modelini (commit grafi, ref'lar), tarixni toza saqlashni, konfliktlarni hal qilishni, yo'qolgan ishni tiklashni va regressiyalarni `bisect` bilan topishni biladi hamda jamoa uchun branching strategiyasini belgilaydi.",
  subskills: [
    {
      id: "33.1",
      title: "Repository Fundamentals",
      description: [
        "Git repozitoriy — `.git` papkasidagi obyektlar bazasi: **blob** (fayl mazmuni), **tree** (papka), **commit** (snapshot + ota commit'lar + muallif + xabar), **tag**. Commit'lar SHA bilan identifikatsiya qilinadi va yo'naltirilgan asiklik graf (DAG) hosil qiladi. Branch — commit'ga ko'rsatkich (ref), `HEAD` — joriy holat.",
        "",
        "Git snapshot'larni saqlaydi (diff emas). Lokal repozitoriy to'liq tarixga ega; remote (`origin`) — boshqa nusxa. `git clone`, `git init`, `git remote -v`, `git log --oneline --graph`.",
        "",
        "```bash",
        "git log --oneline --graph --decorate --all",
        "git cat-file -p HEAD          # commit obyekti ichi",
        "```"
      ],
      priority: "core",
      level: "Foundation",
      practicalTask: "`git cat-file` bilan commit, tree va blob obyektlarini o'rganib, Git modelini diagramma qiling.",
      acceptanceCriteria: [
        "Git obyekt modelini tushuntira oladi",
        "Branch — ko'rsatkich ekanini biladi"
      ],
      prerequisites: []
    },
    {
      id: "33.2",
      title: "Working Tree va Staging",
      description: [
        "Uch hudud: **working tree** (fayllaringiz), **staging area/index** (keyingi commit'ga tayyorlangan o'zgarishlar), **repository** (commit'lar). `git add` — staging'ga, `git commit` — repozitoriyga, `git restore` — working tree'dagi o'zgarishni bekor qilish, `git restore --staged` — staging'dan chiqarish.",
        "",
        "`git add -p` — faylning faqat ayrim qismlarini staging'ga qo'shish: bitta faylda ikki xil o'zgarishni alohida commit qilish uchun. `git diff` (working vs index), `git diff --staged` (index vs HEAD).",
        "",
        "```bash",
        "git status -sb",
        "git add -p app/Services/Billing.php",
        "git diff --staged",
        "```"
      ],
      priority: "core",
      level: "Foundation",
      practicalTask: "Bitta faylda qilingan ikki xil o'zgarishni `git add -p` bilan ikki alohida commit'ga ajrating.",
      acceptanceCriteria: [
        "Uch hudud orasidagi oqimni biladi",
        "Qisman staging'dan foydalanadi"
      ],
      prerequisites: [
        "33.1"
      ]
    },
    {
      id: "33.3",
      title: "Commits",
      description: [
        "Commit — mantiqiy, yaxlit o'zgarish birligi. Yaxshi commit: bitta maqsad, build va testlar o'tadi, tushunarli xabar. Xabar formati: qisqa sarlavha (≤ 50–72 belgi, buyruq maylida) + bo'sh qator + \"nega\" ni tushuntiruvchi tana. Conventional Commits (`feat:`, `fix:`, `refactor:`) — avtomatik changelog va versiyalash uchun.",
        "",
        "`git commit --amend` — oxirgi commit'ni tuzatish (faqat push qilinmagan bo'lsa yoki shaxsiy branch'da). Commit muallifi va imzo (`git commit -S` — GPG/SSH imzo).",
        "",
        "```text",
        "fix(billing): prevent double invoice on webhook retry",
        "",
        "Payme webhook'i timeout'dan keyin qayta yuborilganda bitta buyurtma uchun",
        "ikkita hisob-faktura yaratilardi. Endi event_id unique constraint bilan",
        "deduplikatsiya qilinadi.",
        "```"
      ],
      priority: "core",
      level: "Foundation",
      practicalTask: "Oxirgi 10 ta commit xabaringizni ko'rib chiqing va jamoa uchun commit xabari qoidalarini yozing.",
      acceptanceCriteria: [
        "Atomik commit tamoyilini qo'llaydi",
        "\"Nega\"ni tushuntiruvchi xabar yozadi"
      ],
      prerequisites: [
        "33.2"
      ]
    },
    {
      id: "33.4",
      title: "Branching",
      description: [
        "Branch — mustaqil ish chizig'i: `git switch -c feature/x`, `git branch -d`. Strategiyalar: **GitHub Flow** (main + qisqa feature branch'lar + PR — ko'p jamoalar uchun yetarli), **GitFlow** (develop, release, hotfix — rejali relizlar uchun, murakkab), **trunk-based** (juda qisqa branch'lar yoki to'g'ridan-to'g'ri main, feature flag'lar bilan — CI/CD uchun ideal).",
        "",
        "Qoidalar: branch'lar qisqa umrli (kunlar), main doim deploy qilinadigan holatda, nomlash konvensiyasi (`feature/`, `fix/`, `chore/` + tiket raqami).",
        "",
        "```bash",
        "git switch -c feature/PAY-142-refund-endpoint",
        "git push -u origin feature/PAY-142-refund-endpoint",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Jamoa uchun branching strategiyasini tanlang va nomlash konvensiyasi bilan hujjatlashtiring.",
      acceptanceCriteria: [
        "Asosiy branching strategiyalarini solishtira oladi",
        "Qisqa umrli branch'lar foydasini tushunadi"
      ],
      prerequisites: [
        "33.1"
      ]
    },
    {
      id: "33.5",
      title: "Merging",
      description: [
        "Merge — ikki tarixni birlashtirish. **Fast-forward** — agar maqsad branch o'zgarmagan bo'lsa, ko'rsatkich oldinga suriladi (merge commit yo'q). **Three-way merge** — umumiy ajdod asosida yangi merge commit. **Squash merge** — branch'dagi barcha commit'lar bitta commit'ga (toza main tarixi, lekin branch tafsilotlari yo'qoladi).",
        "",
        "PR merge usulini jamoa tanlaydi: merge commit (to'liq tarix), squash (bir PR — bir commit), rebase merge (chiziqli). `--no-ff` — har doim merge commit (feature chegarasi ko'rinadi).",
        "",
        "```bash",
        "git merge --no-ff feature/refunds",
        "git merge --squash feature/refunds && git commit",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Uch xil merge usuli bilan bir xil branch'ni birlashtirib, natijaviy tarixni solishtiring.",
      acceptanceCriteria: [
        "Fast-forward, three-way va squash farqini biladi",
        "PR merge usulini asoslab tanlaydi"
      ],
      prerequisites: [
        "33.4"
      ]
    },
    {
      id: "33.6",
      title: "Rebasing",
      description: [
        "Rebase — branch commit'larini boshqa asosga \"ko'chirib\" qayta yozish: `git rebase main` — feature commit'lari main'ning oxiriga qo'yiladi, tarix chiziqli bo'ladi. Commit SHA'lari o'zgaradi.",
        "",
        "**Oltin qoida**: boshqalar ishlatayotgan umumiy branch'ni (main, push qilingan umumiy branch) rebase qilmang. Shaxsiy feature branch'ni main'ga moslash uchun — yaxshi. Push qilingan shaxsiy branch'ni rebase'dan keyin `git push --force-with-lease` (oddiy `--force` boshqaning ishini o'chirishi mumkin).",
        "",
        "```bash",
        "git fetch origin",
        "git rebase origin/main",
        "git push --force-with-lease",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Feature branch'ni yangilangan main'ga rebase qilib, konfliktlarni hal qiling va `--force-with-lease` bilan push qiling.",
      acceptanceCriteria: [
        "Rebase va merge farqini va murosasini biladi",
        "Umumiy branch'ni rebase qilmaslik qoidasiga amal qiladi"
      ],
      prerequisites: [
        "33.5"
      ]
    },
    {
      id: "33.7",
      title: "Cherry-Pick",
      description: [
        "`git cherry-pick <sha>` — boshqa branch'dagi bitta (yoki bir nechta) commit'ni joriy branch'ga nusxalash. Qo'llanishi: hotfix'ni main'dan release branch'ga ko'chirish, xato branch'ga qilingan commit'ni to'g'ri joyga o'tkazish.",
        "",
        "Ehtiyot: cherry-pick yangi SHA'li dublikat commit yaratadi — keyinchalik merge'da konflikt yoki ikki marta o'zgarish bo'lishi mumkin; ko'p cherry-pick — branching strategiyasi muammosi belgisi. `-x` — xabarga manba SHA'sini qo'shadi (kuzatish uchun).",
        "",
        "```bash",
        "git switch release/2.4",
        "git cherry-pick -x 3f9c2ab",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Hotfix commit'ini main'dan release branch'ga `-x` bilan cherry-pick qiling.",
      acceptanceCriteria: [
        "Cherry-pick qachon o'rinli ekanini biladi",
        "Dublikat commit oqibatlarini tushunadi"
      ],
      prerequisites: [
        "33.5"
      ]
    },
    {
      id: "33.8",
      title: "Reset va Revert",
      description: [
        "`git revert <sha>` — commit o'zgarishlarini bekor qiluvchi **yangi** commit yaratadi; tarix saqlanadi — umumiy branch'larda (main) xatoni bekor qilishning xavfsiz yo'li. `git reset` — branch ko'rsatkichini orqaga suradi: `--soft` (o'zgarishlar staging'da qoladi), `--mixed` (default, working tree'da qoladi), `--hard` (o'zgarishlar yo'qoladi!).",
        "",
        "Qoida: push qilingan umumiy tarixda — revert; lokal, push qilinmagan — reset. `reset --hard` dan oldin `git stash` yoki reflog'ni yodda tuting.",
        "",
        "```bash",
        "git revert 3f9c2ab                  # main'da xato commit'ni bekor qilish",
        "git reset --soft HEAD~2             # oxirgi 2 commit'ni bittaga birlashtirish uchun",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Main'ga tushgan xato commit'ni revert bilan, lokal xato commit'larni reset bilan tuzating.",
      acceptanceCriteria: [
        "Revert va reset farqini va qachon ishlatilishini biladi",
        "`reset` rejimlarini tushunadi"
      ],
      prerequisites: [
        "33.3"
      ]
    },
    {
      id: "33.9",
      title: "Stash",
      description: [
        "`git stash` — tugallanmagan o'zgarishlarni vaqtincha saqlab, working tree'ni tozalash (masalan, shoshilinch hotfix uchun branch almashtirish). `git stash push -m \"izoh\"`, `-u` (untracked fayllar bilan), `git stash list`, `pop` (qo'llab o'chirish), `apply` (o'chirmasdan), `drop`, `git stash show -p`.",
        "",
        "Stash uzoq muddatli saqlash joyi emas — unutilgan stash'lar yo'qoladi. Uzoq ish uchun WIP commit yoki alohida branch yaxshiroq. `git worktree` — muqobil: bir vaqtda bir nechta branch'da ishlash.",
        "",
        "```bash",
        "git stash push -u -m \"WIP: refund validation\"",
        "git switch main && git switch -c hotfix/payme-timeout",
        "# ...",
        "git switch - && git stash pop",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Tugallanmagan ish ustida hotfix qilish stsenariysini stash va worktree bilan bajarib, solishtiring.",
      acceptanceCriteria: [
        "Stash buyruqlarini biladi",
        "Stash va worktree o'rtasida tanlaydi"
      ],
      prerequisites: [
        "33.2"
      ]
    },
    {
      id: "33.10",
      title: "Conflict Resolution",
      description: [
        "Konflikt — ikki branch bir xil joyni turlicha o'zgartirganda. Git markerlar bilan belgilaydi (`<<<<<<<`, `=======`, `>>>>>>>`). Hal qilish: ikkala o'zgarishning **maqsadini** tushunish (faqat qatorlarni tanlash emas), to'g'ri birlashtirish, testlarni ishga tushirish, `git add` + `git merge --continue`/`git rebase --continue`.",
        "",
        "Vositalar: IDE merge tool, `git mergetool`, `git checkout --ours/--theirs` (butun fayl uchun), `rerere` (takroriy konflikt yechimlarini eslab qoladi). Konfliktlarni kamaytirish: qisqa branch'lar, tez-tez main bilan sinxronlash, katta formatlash o'zgarishlarini alohida.",
        "",
        "```bash",
        "git config --global rerere.enabled true",
        "git diff --name-only --diff-filter=U    # konfliktli fayllar",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Murakkab konfliktni (ikki tomonda mantiqiy o'zgarish) hal qilib, natijani testlar bilan tasdiqlang.",
      acceptanceCriteria: [
        "Konfliktni mazmunini tushunib hal qiladi",
        "Konfliktlarni kamaytirish usullarini biladi"
      ],
      prerequisites: [
        "33.5"
      ]
    },
    {
      id: "33.11",
      title: "Interactive Rebase",
      description: [
        "`git rebase -i HEAD~5` — commit'larni push'dan oldin tartibga keltirish: `pick`, `reword` (xabarni o'zgartirish), `edit` (commit'ni o'zgartirish), `squash`/`fixup` (oldingisiga qo'shish), `drop`, tartibni o'zgartirish. `git commit --fixup <sha>` + `git rebase -i --autosquash` — tuzatishlarni avtomatik birlashtirish.",
        "",
        "Maqsad — review qilish oson, mantiqiy commit'lar ketma-ketligi (\"wip\", \"fix typo\" kabi shovqinsiz). Faqat shaxsiy, hali umumiy bo'lmagan commit'lar uchun.",
        "",
        "```bash",
        "git commit --fixup a1b2c3d",
        "git rebase -i --autosquash origin/main",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Feature branch'dagi tartibsiz commit'larni interactive rebase bilan mantiqiy 3–4 ta commit'ga keltiring.",
      acceptanceCriteria: [
        "Interactive rebase buyruqlarini biladi",
        "Fixup/autosquash oqimini ishlatadi"
      ],
      prerequisites: [
        "33.6"
      ]
    },
    {
      id: "33.12",
      title: "Commit Hygiene",
      description: [
        "Toza commit tarixi — debug, review va revert'ni osonlashtiradi. Qoidalar: bitta commit — bitta mantiqiy o'zgarish; formatlash/refactoring va funksional o'zgarish alohida; har commit'da build va testlar o'tadi (`bisect` uchun muhim); maxfiy ma'lumot (`.env`, kalitlar) hech qachon commit qilinmaydi; katta binar fayllar — Git LFS.",
        "",
        "Vositalar: pre-commit hook'lar (Pint, PHPStan), commitlint (xabar formati), `git log --stat` bilan tekshirish, push'dan oldin interactive rebase.",
        "",
        "```bash",
        "git log --oneline -10       # tarixni tekshirish",
        "git show --stat HEAD        # commit hajmi",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Jamoa uchun commit gigiyenasi qoidalari va ularni ta'minlovchi hook'larni sozlang.",
      acceptanceCriteria: [
        "Toza tarix qoidalarini biladi",
        "Maxfiy ma'lumotni commit qilmaslikni ta'minlaydi"
      ],
      prerequisites: [
        "33.3"
      ]
    },
    {
      id: "33.13",
      title: "`.gitignore`",
      description: [
        "`.gitignore` — Git kuzatmasligi kerak bo'lgan fayllar: `vendor/`, `node_modules/`, `.env`, `storage/*.key`, kesh va log'lar, IDE fayllari (yoki ularni global `~/.gitignore_global` ga), build natijalari (`public/build`). Laravel standart `.gitignore` bilan keladi.",
        "",
        "Muhim: allaqachon kuzatilayotgan fayl `.gitignore` ga qo'shilsa ham kuzatilishda davom etadi — `git rm --cached file`. Maxfiy fayl tasodifan commit qilingan bo'lsa — uni o'chirish yetarli emas (tarixda qoladi): kalitni almashtiring, kerak bo'lsa tarixni tozalang (`git filter-repo`).",
        "",
        "```bash",
        "git rm --cached .env",
        "echo \".env\" >> .gitignore",
        "git check-ignore -v storage/logs/laravel.log",
        "```"
      ],
      priority: "core",
      level: "Foundation",
      practicalTask: "Repozitoriyda kuzatilmasligi kerak bo'lgan fayllarni toping va `.gitignore` ni tartibga keltiring.",
      acceptanceCriteria: [
        "`.gitignore` va allaqachon kuzatilgan fayl farqini biladi",
        "Sizib chiqqan sirga to'g'ri munosabat bildiradi"
      ],
      prerequisites: [
        "33.2"
      ]
    },
    {
      id: "33.14",
      title: "Tags",
      description: [
        "Tag — muayyan commit'ga doimiy nom, odatda reliz versiyasi: `v2.4.0`. **Annotated** tag (`git tag -a v2.4.0 -m \"...\"`) — muallif, sana, xabar, imzo bilan (relizlar uchun); **lightweight** — oddiy ko'rsatkich. Tag'lar alohida push qilinadi: `git push origin v2.4.0` yoki `--tags`.",
        "",
        "SemVer bilan nomlash, CI/CD tag push'ida reliz va deploy'ni ishga tushirishi, Composer paketlarida versiyalar tag'lardan olinadi. Push qilingan tag'ni o'zgartirmang — yangi versiya chiqaring.",
        "",
        "```bash",
        "git tag -a v2.4.0 -m \"Refund endpoint, Payme timeout fix\"",
        "git push origin v2.4.0",
        "git describe --tags",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Reliz uchun annotated tag yarating va CI'da tag push'ida reliz jarayonini ishga tushiring.",
      acceptanceCriteria: [
        "Annotated va lightweight tag farqini biladi",
        "Tag'larni versiyalash bilan bog'laydi"
      ],
      prerequisites: [
        "7.4"
      ]
    },
    {
      id: "33.15",
      title: "Release Branches",
      description: [
        "Release branch (`release/2.4`) — reliz tayyorlash va qo'llab-quvvatlash uchun: feature freeze, faqat bug fix'lar, reliz'dan keyin eski versiyalar uchun patch'lar. GitFlow va bir nechta versiyani parallel qo'llab-quvvatlovchi mahsulotlarda (on-premise, mobil SDK, kutubxonalar) kerak.",
        "",
        "Continuous deployment'li web ilovalarda ko'pincha keraksiz — main doim reliz holatida, tag bilan reliz. Fix'lar avval main'ga, keyin release branch'ga cherry-pick (yoki aksincha — jamoa qoidasi).",
        "",
        "```bash",
        "git switch -c release/2.4 v2.4.0",
        "git cherry-pick -x <fix-sha>",
        "git tag -a v2.4.1 -m \"Hotfix\"",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Bir nechta versiyani qo'llab-quvvatlash stsenariysi uchun release branch va hotfix oqimini sinang.",
      acceptanceCriteria: [
        "Release branch qachon kerakligini biladi",
        "Fix'larni versiyalar o'rtasida to'g'ri tarqatadi"
      ],
      prerequisites: [
        "33.4"
      ]
    },
    {
      id: "33.16",
      title: "Bisect",
      description: [
        "`git bisect` — regressiyani keltirib chiqargan commit'ni binary search bilan topish: \"yaxshi\" va \"yomon\" commit'ni belgilaysiz, Git o'rtadagisini tekshirishni taklif qiladi; log₂(N) qadamda topiladi (1000 commit — ~10 qadam). `git bisect run <buyruq>` — test skripti bilan to'liq avtomatik.",
        "",
        "Shart: har commit'da loyiha build bo'lishi va testlar ishlashi kerak (commit gigiyenasi!). Regressiya testi yozib, `bisect run` bilan ishlatish — eng samarali.",
        "",
        "```bash",
        "git bisect start",
        "git bisect bad HEAD",
        "git bisect good v2.3.0",
        "git bisect run php artisan test --filter=RefundTest",
        "git bisect reset",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Sun'iy regressiya kiritib, uni `git bisect run` va test bilan avtomatik toping.",
      acceptanceCriteria: [
        "Bisect algoritmini va shartlarini biladi",
        "`bisect run` bilan avtomatlashtiradi"
      ],
      prerequisites: [
        "33.12"
      ]
    },
    {
      id: "33.17",
      title: "Reflog",
      description: [
        "Reflog — lokal `HEAD` va branch'larning barcha harakatlari tarixi (commit, reset, rebase, checkout). \"Yo'qolgan\" commit'lar (reset --hard, noto'g'ri rebase, o'chirilgan branch) odatda reflog orqali tiklanadi — ular darhol o'chmaydi (default ~90 kun).",
        "",
        "`git reflog`, `git reset --hard HEAD@{3}` yoki `git branch rescue <sha>`. Reflog faqat lokal — push qilinmagan va boshqa mashinadagi ishni tiklamaydi.",
        "",
        "```bash",
        "git reflog --date=relative | head -20",
        "git branch rescue-refunds 7c1e9a2     # yo'qolgan commit'ni tiklash",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ataylab `reset --hard` bilan commit'larni \"yo'qotib\", reflog orqali tiklang.",
      acceptanceCriteria: [
        "Reflog orqali yo'qolgan ishni tiklay oladi",
        "Reflog cheklovlarini (lokal, muddat) biladi"
      ],
      prerequisites: [
        "33.8"
      ]
    },
    {
      id: "33.18",
      title: "Hooks",
      description: [
        "Git hook'lar — hodisalarda ishlaydigan skriptlar: `pre-commit` (Pint, PHPStan, testlar tez qismi), `commit-msg` (xabar formati), `pre-push` (testlar), server tomonida `pre-receive` (qoidalar). `.git/hooks` versiyalanmaydi — jamoa uchun Husky, CaptainHook, GrumPHP yoki `core.hooksPath` bilan versiyalangan papka.",
        "",
        "Hook'lar tez bo'lishi kerak (aks holda `--no-verify` bilan chetlab o'tiladi); ular CI o'rnini bosmaydi — faqat erta fikr-mulohaza.",
        "",
        "```bash",
        "git config core.hooksPath .githooks",
        "# .githooks/pre-commit",
        "vendor/bin/pint --dirty --test && vendor/bin/phpstan analyse --no-progress",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Versiyalangan pre-commit hook'ini (Pint + PHPStan faqat o'zgargan fayllar) sozlang.",
      acceptanceCriteria: [
        "Hook turlari va jamoada tarqatish usullarini biladi",
        "Hook'larni tez va CI'ga qo'shimcha sifatida saqlaydi"
      ],
      prerequisites: [
        "33.12"
      ]
    },
    {
      id: "33.19",
      title: "Pull Request Workflow",
      description: [
        "PR oqimi: branch → kichik, mantiqiy commit'lar → push → PR (tavsif: nima, nega, qanday testlandi, skrinshot/migratsiya eslatmasi) → CI tekshiruvlari → review → tuzatishlar → tasdiq → merge → branch o'chiriladi → deploy.",
        "",
        "Yaxshi PR: kichik (200–400 qator — review sifati yuqori), bitta maqsad, o'z-o'zini review qilingan, tiketga bog'langan, draft PR erta fikr-mulohaza uchun. Katta o'zgarishlar — stacked PR'lar yoki feature flag ortida bosqichma-bosqich.",
        "",
        "```markdown",
        "## Nima",
        "Refund endpoint'i qo'shildi.",
        "## Nega",
        "PAY-142: operatorlar qisman qaytarishni qo'lda bajarishyapti.",
        "## Qanday testlandi",
        "Feature testlar + Payme sandbox'da qo'lda.",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Jamoa uchun PR shablonini yarating va oxirgi PR'ingizni shu shablonga moslab qayta yozing.",
      acceptanceCriteria: [
        "Yaxshi PR mezonlarini biladi",
        "PR'larni kichik va bir maqsadli saqlaydi"
      ],
      prerequisites: [
        "33.4"
      ]
    },
    {
      id: "33.20",
      title: "Branch Protection",
      description: [
        "Himoyalangan branch (main, release) qoidalari: to'g'ridan-to'g'ri push taqiqlangan, merge faqat PR orqali, kamida N ta tasdiq, CODEOWNERS tasdig'i, CI tekshiruvlari muvaffaqiyatli bo'lishi shart, branch main bilan yangilangan bo'lishi, force push va o'chirish taqiqlangan, imzolangan commit'lar, chiziqli tarix (ixtiyoriy).",
        "",
        "Bu \"inson xatosi\" va beparvo o'zgarishlardan himoya qiladi va sifat darvozalarini majburiy qiladi. Admin'lar uchun ham istisno qilmaslik tavsiya etiladi.",
        "",
        "```text",
        "main:",
        "  ✓ Require PR + 1 approval (+ CODEOWNERS)",
        "  ✓ Require status checks: tests, phpstan, pint",
        "  ✓ Require branch up to date",
        "  ✗ Allow force pushes / deletions",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Repozitoriyda main uchun branch protection qoidalarini sozlang va to'g'ridan-to'g'ri push rad etilishini sinang.",
      acceptanceCriteria: [
        "Asosiy himoya qoidalarini biladi",
        "Sifat darvozalarini majburiy qiladi"
      ],
      prerequisites: [
        "34.2"
      ]
    },
    {
      id: "33.21",
      title: "Git Troubleshooting",
      description: [
        "Tipik muammolar va yechimlar: noto'g'ri branch'ga commit (`git switch -c correct` + eski branch'da `reset`), oxirgi commit xabari/fayli xato (`--amend`), push rad etildi (`git pull --rebase`), \"detached HEAD\" (`git switch -c new`), katta fayl tasodifan commit qilingan (`git filter-repo`), maxfiy kalit push qilingan (kalitni **darhol almashtirish**, keyin tarixni tozalash), line ending muammolari (`.gitattributes`, `core.autocrlf`), sekin repo (`git gc`, shallow clone).",
        "",
        "Har qanday \"xavfli\" buyruqdan oldin: `git status`, `git log`, va kerak bo'lsa zaxira branch.",
        "",
        "```bash",
        "git branch backup-before-fix      # xavfsizlik to'ri",
        "git pull --rebase origin main",
        "git filter-repo --path secrets.json --invert-paths",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "5 ta tipik Git muammosini sun'iy yaratib, har birini to'g'ri buyruq bilan hal qiling va qo'llanma yozing.",
      acceptanceCriteria: [
        "Tipik Git muammolarini tez hal qiladi",
        "Xavfli amallardan oldin zaxira oladi"
      ],
      prerequisites: [
        "33.17"
      ]
    }
  ]
});
