/* 40 · Bash
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 40,
  slug: "bash",
  title: "Bash",
  group: "infra",
  description: "Bash — Linux serverlarida avtomatlashtirishning asosiy tili: deploy skriptlari, cron vazifalari, backup, log tahlili, CI qadamlari va Docker entrypoint'lari. Senior dasturchi xavfsiz, o'qiladigan va xatolarga chidamli skriptlar yozadi, shell'ning tuzoqlarini (qo'shtirnoqlar, bo'sh o'zgaruvchilar, exit kodlar) biladi.",
  subskills: [
    {
      id: "40.1",
      title: "Variables",
      description: [
        "O'zgaruvchi: `NAME=value` (`=` atrofida bo'shliq yo'q!), murojaat `\"$NAME\"` yoki `\"${NAME}\"`. Lokal (`local` funksiya ichida), muhit (`export`), maxsus: `$0` (skript nomi), `$1..$9`, `$#`, `$@`, `$?` (oxirgi exit kodi), `$$` (PID).",
        "",
        "Parametr kengaytmalari: `${VAR:-default}` (bo'sh bo'lsa default), `${VAR:?xato xabari}` (bo'sh bo'lsa to'xtash — `rm -rf \"${DIR:?}/\"` himoyasi), `${VAR#prefix}`, `${VAR%suffix}`, `${#VAR}` (uzunlik), `$(command)` (buyruq natijasi).",
        "",
        "```bash",
        "RELEASE_DIR=\"${BASE_DIR:?BASE_DIR o'rnatilmagan}/releases/$(date +%Y%m%d%H%M%S)\"",
        "APP_ENV=\"${APP_ENV:-production}\"",
        "FILE=\"backup.sql.gz\"; echo \"${FILE%.gz}\"   # backup.sql",
        "```"
      ],
      priority: "core",
      level: "Foundation",
      practicalTask: "Bo'sh o'zgaruvchi tufayli xavfli bo'lishi mumkin bo'lgan skriptni `${VAR:?}` bilan himoyalang.",
      acceptanceCriteria: [
        "O'zgaruvchi e'lon qilish va kengaytmalarini biladi",
        "`${VAR:?}` bilan xavfli bo'sh qiymatlardan himoyalanadi"
      ],
      prerequisites: []
    },
    {
      id: "40.2",
      title: "Arguments",
      description: [
        "Skript argumentlari: `$1`, `$2`, ..., `$#` (soni), `\"$@\"` (barchasi, har biri alohida — doim qo'shtirnoqda), `shift`. Opsiyalar uchun `getopts` (qisqa: `-e production -v`) yoki `while [[ $# -gt 0 ]]; case` (uzun `--env=production`).",
        "",
        "Har skriptda: argumentlarni validatsiya qilish, `usage()` funksiyasi (`-h`), majburiy argument yo'q bo'lsa tushunarli xato va non-zero exit.",
        "",
        "```bash",
        "usage() { echo \"Foydalanish: $0 -e <env> [-b branch]\"; exit 1; }",
        "BRANCH=main",
        "while getopts \":e:b:h\" opt; do",
        "  case $opt in",
        "    e) ENV=$OPTARG ;; b) BRANCH=$OPTARG ;; h|*) usage ;;",
        "  esac",
        "done",
        "[[ -z \"${ENV:-}\" ]] && usage",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Deploy skriptiga `getopts` bilan muhit va branch opsiyalarini va `usage` yordamini qo'shing.",
      acceptanceCriteria: [
        "`\"$@\"` va argumentlarni to'g'ri ishlatadi",
        "Opsiyalarni getopts bilan tahlil qiladi"
      ],
      prerequisites: [
        "40.1"
      ]
    },
    {
      id: "40.3",
      title: "Exit Codes",
      description: [
        "Har buyruq exit kod qaytaradi: `0` — muvaffaqiyat, `1–255` — xato. `$?` oxirgi buyruq kodi; `exit N` — skript kodi. Mantiqiy operatorlar: `cmd1 && cmd2` (birinchisi muvaffaqiyatli bo'lsa), `cmd1 || cmd2` (muvaffaqiyatsiz bo'lsa). Pipe'da default faqat oxirgi buyruq kodi hisobga olinadi (`pipefail` buni tuzatadi).",
        "",
        "Skriptlar to'g'ri kod qaytarishi kerak — CI, cron monitoring va boshqa skriptlar shunga tayanadi. Konvensiyalar: 126 (bajarib bo'lmaydi), 127 (topilmadi), 128+N (signal N bilan o'ldirilgan — 137 = SIGKILL/OOM).",
        "",
        "```bash",
        "php artisan migrate --force || { echo \"Migratsiya muvaffaqiyatsiz\" >&2; exit 1; }",
        "if ! php artisan config:cache; then exit 2; fi",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Deploy skriptidagi har bir muhim qadamni exit kod tekshiruvi va mazmunli xato bilan himoyalang.",
      acceptanceCriteria: [
        "Exit kodlar va `&&`/`||` mantiqini biladi",
        "Skriptdan to'g'ri kod qaytaradi"
      ],
      prerequisites: [
        "40.1"
      ]
    },
    {
      id: "40.4",
      title: "Conditions",
      description: [
        "Shartlar: `if [[ ... ]]; then ... elif ...; else ...; fi`. `[[ ]]` (bash — xavfsizroq, regex `=~`, `&&`/`||` ichida) va `[ ]` (POSIX). Fayl testlari: `-f` (fayl), `-d` (papka), `-e` (mavjud), `-s` (bo'sh emas), `-x` (bajariladigan), `-r/-w`. String: `-z` (bo'sh), `-n`, `==`, `!=`. Son: `-eq`, `-lt`, `-gt` yoki `(( a > b ))`.",
        "",
        "`case` — ko'p tarmoqli tanlov (muhit nomlari, buyruqlar). Buyruq natijasini to'g'ridan-to'g'ri shart sifatida: `if grep -q ...`.",
        "",
        "```bash",
        "if [[ ! -f .env ]]; then echo \".env topilmadi\" >&2; exit 1; fi",
        "case \"$ENV\" in",
        "  production) BRANCH=main ;;",
        "  staging)    BRANCH=develop ;;",
        "  *) echo \"Noma'lum muhit: $ENV\" >&2; exit 1 ;;",
        "esac",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Deploy skriptiga muhit validatsiyasi va oldindan tekshiruvlar (fayllar, disk joyi) shartlarini qo'shing.",
      acceptanceCriteria: [
        "`[[ ]]` va fayl/string/son testlarini biladi",
        "`case` bilan ko'p tarmoqli tanlovni yozadi"
      ],
      prerequisites: [
        "40.3"
      ]
    },
    {
      id: "40.5",
      title: "Loops",
      description: [
        "Sikllar: `for item in list; do ...; done`, `for f in storage/logs/*.log`, `for ((i=0; i<5; i++))`, `while condition`, `until condition` (kutish sikllari), `while read -r line; do ...; done < file` (faylni qatorma-qator — `-r` backslash'larni saqlaydi). `break`, `continue`.",
        "",
        "Tuzoqlar: `for f in $(ls)` — bo'shliqli fayl nomlarida buziladi (glob ishlating); pipe ichidagi `while` subshell'da ishlaydi — o'zgaruvchilar tashqarida yo'qoladi (`< <(cmd)` process substitution).",
        "",
        "```bash",
        "for i in {1..30}; do",
        "  curl -fsS http://127.0.0.1/up >/dev/null && break",
        "  echo \"Kutilmoqda ($i)...\"; sleep 2",
        "done",
        "while IFS= read -r host; do ssh \"$host\" uptime; done < hosts.txt",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Health check'ni kutuvchi (timeout bilan) va serverlar ro'yxati bo'yicha buyruq bajaruvchi sikllar yozing.",
      acceptanceCriteria: [
        "Sikl turlarini va `read -r` ni to'g'ri ishlatadi",
        "Glob va subshell tuzoqlarini biladi"
      ],
      prerequisites: [
        "40.4"
      ]
    },
    {
      id: "40.6",
      title: "Functions",
      description: [
        "Funksiyalar: `name() { ...; }`, argumentlar `$1`, `$@` (funksiya ichida), `local` o'zgaruvchilar (global ifloslanishning oldini olish), qaytish — `return N` (faqat exit kod 0–255), qiymat — `echo` va `$(func)` orqali.",
        "",
        "Yaxshi tuzilma: `main()` funksiyasi, kichik bir vazifali funksiyalar (`log`, `die`, `require_cmd`), skript oxirida `main \"$@\"`. Umumiy funksiyalarni alohida faylga (`source lib.sh`).",
        "",
        "```bash",
        "log() { printf '[%s] %s\\n' \"$(date +%T)\" \"$*\"; }",
        "die() { log \"XATO: $*\" >&2; exit 1; }",
        "require_cmd() { command -v \"$1\" >/dev/null || die \"$1 topilmadi\"; }",
        "",
        "main() {",
        "  require_cmd php; require_cmd composer",
        "  log \"Deploy boshlandi\"",
        "}",
        "main \"$@\"",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Skriptni `log`, `die`, `require_cmd` va `main` funksiyalari bilan qayta tuzing.",
      acceptanceCriteria: [
        "Funksiya, `local` va qaytish usullarini biladi",
        "Skriptni `main` tuzilmasi bilan tashkil qiladi"
      ],
      prerequisites: [
        "40.1"
      ]
    },
    {
      id: "40.7",
      title: "Arrays",
      description: [
        "Indeksli massivlar: `arr=(a b c)`, `\"${arr[@]}\"` (barcha elementlar — qo'shtirnoqda), `${#arr[@]}` (soni), `arr+=(d)`, `\"${arr[0]}\"`. Assotsiativ (bash 4+): `declare -A map=([prod]=main [staging]=develop)`, `\"${map[$ENV]}\"`, `\"${!map[@]}\"` (kalitlar).",
        "",
        "Massivlar buyruq argumentlarini xavfsiz tuzish uchun ideal (string birlashtirish o'rniga) — bo'shliqli qiymatlar buzilmaydi.",
        "",
        "```bash",
        "declare -A BRANCH=([production]=main [staging]=develop)",
        "args=(--no-dev --optimize-autoloader --no-interaction)",
        "[[ \"$ENV\" == \"production\" ]] && args+=(--classmap-authoritative)",
        "composer install \"${args[@]}\"",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Muhitga qarab argumentlar to'plamini massiv bilan tuzib, buyruqqa xavfsiz uzating.",
      acceptanceCriteria: [
        "Indeksli va assotsiativ massivlarni ishlatadi",
        "Argumentlarni massiv orqali xavfsiz tuzadi"
      ],
      prerequisites: [
        "40.6"
      ]
    },
    {
      id: "40.8",
      title: "Pipes",
      description: [
        "Pipe — kichik buyruqlarni zanjir qilib kuchli tahlil: `grep`, `awk`, `sed`, `sort`, `uniq -c`, `wc -l`, `cut`, `tr`, `head`/`tail`, `xargs`. Unix falsafasi: har biri bitta ishni yaxshi qiladi.",
        "",
        "`set -o pipefail` bo'lmasa, zanjirdagi birinchi buyruq xatosi yashiriladi. Process substitution `<(cmd)` — buyruq natijasini fayl sifatida (`diff <(cmd1) <(cmd2)`).",
        "",
        "```bash",
        "# Eng ko'p so'rov yuborgan 10 ta IP",
        "awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -10",
        "# Ikki serverdagi composer.lock farqi",
        "diff <(ssh app1 cat /var/www/current/composer.lock) <(ssh app2 cat /var/www/current/composer.lock)",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Laravel log'idan soat bo'yicha ERROR'lar sonini chiqaruvchi pipe zanjirini yozing.",
      acceptanceCriteria: [
        "Pipe zanjirlari bilan ma'lumot tahlil qiladi",
        "Process substitution'ni biladi"
      ],
      prerequisites: [
        "38.10"
      ]
    },
    {
      id: "40.9",
      title: "Redirection",
      description: [
        "`>` (yozish), `>>` (qo'shish), `2>` (stderr), `2>&1` (stderr → stdout, tartib muhim: `cmd >file 2>&1`), `&>file`, `<` (kirish), `<<EOF` (heredoc — ko'p qatorli matn, konfiguratsiya yaratish), `<<'EOF'` (o'zgaruvchilarsiz), `<<<` (here-string), `/dev/null`.",
        "",
        "Xato xabarlarini stderr'ga yozing (`>&2`) — stdout natija uchun toza qoladi. `exec > >(tee -a deploy.log) 2>&1` — butun skript chiqishini ham ekranga, ham log'ga.",
        "",
        "```bash",
        "exec > >(tee -a \"/var/log/deploy-$(date +%F).log\") 2>&1",
        "cat > /etc/supervisor/conf.d/worker.conf <<EOF",
        "[program:worker]",
        "command=php ${APP_DIR}/artisan queue:work",
        "EOF",
        "echo \"Xato: konfiguratsiya topilmadi\" >&2",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Deploy skriptining butun chiqishini log faylga yozing va konfiguratsiyani heredoc bilan generatsiya qiling.",
      acceptanceCriteria: [
        "Redirection operatorlari va tartibini biladi",
        "Heredoc va stderr'dan to'g'ri foydalanadi"
      ],
      prerequisites: [
        "40.8"
      ]
    },
    {
      id: "40.10",
      title: "Quoting",
      description: [
        "Qo'shtirnoqlar — shell xatolarining asosiy manbai. `\"double\"` — o'zgaruvchilar va `$(...)` kengayadi, lekin so'zlarga bo'linish va glob yo'q; `'single'` — hech narsa kengaymaydi; qo'shtirnoqsiz — so'zlarga bo'linish va glob (bo'shliqli fayl nomlari buziladi, `*` kengayadi).",
        "",
        "Qoida: o'zgaruvchilarni **doim** qo'shtirnoqda ishlating: `\"$FILE\"`, `\"$@\"`. ShellCheck bunday xatolarni avtomatik topadi.",
        "",
        "```bash",
        "FILE=\"my report.csv\"",
        "rm $FILE        # ❌ \"my\" va \"report.csv\" ni o'chirishga urinadi",
        "rm \"$FILE\"      # ✅",
        "echo '$HOME'    # literal: $HOME",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Mavjud skriptni ShellCheck bilan tekshirib, barcha qo'shtirnoq xatolarini tuzating.",
      acceptanceCriteria: [
        "Uch xil qo'shtirnoq xatti-harakatini biladi",
        "O'zgaruvchilarni doim qo'shtirnoqda ishlatadi"
      ],
      prerequisites: [
        "40.1"
      ]
    },
    {
      id: "40.11",
      title: "`grep`, `sed`, `awk`",
      description: [
        "**grep** — qidiruv: `-i` (katta-kichiksiz), `-r` (rekursiv), `-n` (qator raqami), `-v` (inkor), `-E` (kengaytirilgan regex), `-c` (soni), `-o` (faqat mos qism), `-A/-B/-C` (kontekst). **sed** — oqim tahriri: `s/old/new/g`, `-i` (faylda o'zgartirish — `-i.bak` zaxira bilan), qator o'chirish. **awk** — ustunli matn: `{print $1, $7}`, `-F` (ajratuvchi), shartlar, yig'indilar.",
        "",
        "Laravel uchun: log'lardan xatolarni topish, `.env` qiymatini skriptda o'zgartirish, Nginx log statistikasi.",
        "",
        "```bash",
        "grep -E \"production\\.(ERROR|CRITICAL)\" storage/logs/laravel.log | tail -20",
        "sed -i.bak \"s/^APP_DEBUG=.*/APP_DEBUG=false/\" .env",
        "awk '$9 >= 500 {c[$7]++} END {for (u in c) print c[u], u}' access.log | sort -rn | head",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Nginx log'idan endpoint bo'yicha o'rtacha javob vaqtini awk bilan hisoblang.",
      acceptanceCriteria: [
        "grep, sed, awk asosiy imkoniyatlarini biladi",
        "Log tahlili va fayl tahririni avtomatlashtiradi"
      ],
      prerequisites: [
        "40.8"
      ]
    },
    {
      id: "40.12",
      title: "`find`, `xargs`",
      description: [
        "`find` — fayllarni mezon bo'yicha qidirish: `-name`, `-type f/d`, `-mtime +7` (7 kundan eski), `-size +100M`, `-user`, `-perm`, `-exec cmd {} \\;` yoki `{} +` (bir necha fayl bitta chaqiruvda), `-delete`. `xargs` — kirish qatorlarini argumentlarga aylantiradi: `-0` (`find -print0` bilan — bo'shliqli nomlar xavfsiz), `-P 4` (parallel), `-n`.",
        "",
        "Avval `-print` bilan natijani ko'ring, keyin `-delete` — xavfsizlik odati.",
        "",
        "```bash",
        "find storage/logs -name \"*.log\" -mtime +14 -print          # avval ko'rish",
        "find storage/logs -name \"*.log\" -mtime +14 -delete",
        "find . -name \"*.php\" -print0 | xargs -0 -P 4 -n 50 php -l | grep -v \"No syntax errors\"",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Eski log va vaqtinchalik fayllarni xavfsiz tozalovchi buyruqni avval `-print` bilan sinab yozing.",
      acceptanceCriteria: [
        "`find` mezonlari va `-exec`/`-delete` ni biladi",
        "`-print0 | xargs -0` bilan xavfsiz ishlaydi"
      ],
      prerequisites: [
        "40.10"
      ]
    },
    {
      id: "40.13",
      title: "`curl`, `jq`",
      description: [
        "**curl** — HTTP so'rovlar: `-X POST`, `-H`, `-d`/`--data-raw`, `--json` (yangi versiyalar), `-f` (HTTP xatoda non-zero exit — skriptlar uchun muhim!), `-s`, `-S`, `-L` (redirect), `-o`, `-w` (vaqt va status), `--retry`, `--max-time`. **jq** — JSON tahlil: `.data.id`, `.[] | select(.status == \"failed\")`, `-r` (xom string), `length`.",
        "",
        "Skriptlarda: health check, API orqali deploy bildirishnomasi (Slack/Telegram), webhook sinovi, JSON konfiguratsiyani o'qish.",
        "",
        "```bash",
        "STATUS=$(curl -fsS --max-time 5 https://app.example.uz/up -o /dev/null -w '%{http_code}')",
        "curl -fsS -X POST \"https://api.telegram.org/bot${TG_TOKEN}/sendMessage\" \\",
        "  -d chat_id=\"$CHAT_ID\" -d text=\"Deploy: $ENV ✅\"",
        "curl -fsS https://api.github.com/repos/laravel/framework/releases/latest | jq -r '.tag_name'",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Deploy'dan keyin health check va Telegram bildirishnomasini curl bilan yuboring.",
      acceptanceCriteria: [
        "curl'ning skript uchun muhim flag'larini (`-f`, `--max-time`) biladi",
        "jq bilan JSON'dan ma'lumot oladi"
      ],
      prerequisites: [
        "40.3"
      ]
    },
    {
      id: "40.14",
      title: "Environment Variables",
      description: [
        "Skriptlarda muhit o'zgaruvchilari: `export VAR=value` (bola jarayonlarga), `VAR=val cmd` (faqat bitta buyruq uchun), `env` (ro'yxat), `source .env` / `set -a; source .env; set +a` (fayldan yuklash — Laravel `.env` formatiga ehtiyot bo'ling: qo'shtirnoqlar, bo'shliqlar).",
        "",
        "Konfiguratsiyani argument emas, env orqali berish — 12-factor; sirlarni skript ichiga yozmaslik (CI secret'lari yoki secret manager'dan). `${VAR:?}` bilan majburiy o'zgaruvchilarni tekshirish.",
        "",
        "```bash",
        "set -a; source /var/www/shared/.env.deploy; set +a",
        ": \"${DEPLOY_HOST:?DEPLOY_HOST kerak}\" \"${DEPLOY_USER:?DEPLOY_USER kerak}\"",
        "APP_ENV=production php artisan about",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Deploy skriptini barcha konfiguratsiyani env'dan oladigan va majburiylarini tekshiradigan qiling.",
      acceptanceCriteria: [
        "`export` va bir martalik env farqini biladi",
        "Sirlarni skriptga yozmaydi"
      ],
      prerequisites: [
        "38.9"
      ]
    },
    {
      id: "40.15",
      title: "Error Handling",
      description: [
        "Bash default holatda xatoni e'tiborsiz qoldirib davom etadi — deploy skriptida bu falokat (migratsiya yiqildi, lekin symlink almashtirildi). Usullar: `set -euo pipefail` (40.16), har kritik buyruqdan keyin tekshiruv, `trap 'cleanup' EXIT` (har qanday chiqishda tozalash — lock, vaqtinchalik fayllar), `trap 'on_error $LINENO' ERR` (xato qatorini log qilish).",
        "",
        "Idempotentlik va rollback: skript o'rtada to'xtasa, qayta ishga tushirish xavfsiz bo'lishi; muvaffaqiyatsizlikda oldingi relizga qaytish.",
        "",
        "```bash",
        "TMP=$(mktemp -d)",
        "cleanup() { rm -rf \"$TMP\"; }",
        "on_error() { echo \"Xato qator $1 da. Rollback...\" >&2; ln -sfn \"$PREV_RELEASE\" /var/www/current; }",
        "trap cleanup EXIT",
        "trap 'on_error $LINENO' ERR",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Deploy skriptiga `trap` bilan tozalash va xato bo'lganda avtomatik rollback qo'shing.",
      acceptanceCriteria: [
        "`trap EXIT` va `trap ERR` dan foydalanadi",
        "Skriptni idempotent va rollback'ga tayyor qiladi"
      ],
      prerequisites: [
        "40.16"
      ]
    },
    {
      id: "40.16",
      title: "`set -euo pipefail`",
      description: [
        "\"Strict mode\": `-e` — har qanday buyruq xato bilan tugasa skript to'xtaydi; `-u` — e'lon qilinmagan o'zgaruvchiga murojaat xato (`$TYPO` jim bo'sh string bo'lmaydi); `-o pipefail` — pipe'dagi har qanday buyruq xatosi butun pipe xatosi. Qo'shimcha: `IFS=$'\\n\\t'`, debug uchun `-x`.",
        "",
        "Nozikliklar: `-e` `if`, `&&`/`||` va `!` ichidagi buyruqlarga ta'sir qilmaydi; kutilgan xatolar uchun `cmd || true`; `-u` bilan ixtiyoriy argumentlar `${1:-}`. Har yangi skript shu qator bilan boshlansin.",
        "",
        "```bash",
        "#!/usr/bin/env bash",
        "set -euo pipefail",
        "IFS=$'\\n\\t'",
        "",
        "count=$(grep -c ERROR app.log || true)   # 0 natija xato emas",
        "NAME=\"${1:-default}\"",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Mavjud skriptlarga strict mode qo'shing va chiqqan yashirin xatolarni tuzating.",
      acceptanceCriteria: [
        "Har bir flag'ning ta'sirini biladi",
        "Strict mode nozikliklarini (`|| true`, `${1:-}`) hisobga oladi"
      ],
      prerequisites: [
        "40.3"
      ]
    },
    {
      id: "40.17",
      title: "Cron Scripts",
      description: [
        "Cron — rejali vazifalar: `crontab -e` (foydalanuvchi), `/etc/cron.d/` (tizim), sintaksis `m h dom mon dow command`. Laravel uchun yagona yozuv: `* * * * * cd /var/www/current && php artisan schedule:run >> /dev/null 2>&1` — qolgan rejalar kodda.",
        "",
        "Cron muhiti minimal: `PATH` cheklangan (to'liq yo'llar yoki `PATH=` cron faylida), `.bashrc` yuklanmaydi, chiqish emailga ketadi yoki yo'qoladi — log'ga yo'naltiring. Parallel ishga tushishning oldini olish: `flock -n /tmp/job.lock cmd`. Monitoring — heartbeat (healthchecks.io).",
        "",
        "```cron",
        "# /etc/cron.d/laravel",
        "PATH=/usr/local/bin:/usr/bin:/bin",
        "* * * * * www-data cd /var/www/current && php artisan schedule:run >> /dev/null 2>&1",
        "0 3 * * * deploy flock -n /tmp/backup.lock /opt/scripts/backup.sh >> /var/log/backup.log 2>&1 && curl -fsS https://hc-ping.com/UUID",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Backup skripti uchun cron yozuvini flock, log va heartbeat monitoringi bilan sozlang.",
      acceptanceCriteria: [
        "Cron sintaksisi va muhit cheklovlarini biladi",
        "Parallel ishga tushish va jim xatolardan himoyalanadi"
      ],
      prerequisites: [
        "2.19"
      ]
    },
    {
      id: "40.18",
      title: "Deployment Scripts",
      description: [
        "Bash bilan zero-downtime deploy (Deployer/Envoy g'oyasi): yangi reliz papkasi → kod (git yoki artefakt) → umumiy fayllar symlink (`.env`, `storage`) → `composer install --no-dev` → build → `migrate --force` → `optimize` → `current` symlink'ni atomik almashtirish (`ln -sfn`) → FPM reload → `queue:restart` → health check → eski relizlarni tozalash; xatoda rollback.",
        "",
        "Tayyor vositalar (Deployer, Envoy, Laravel Forge/Envoyer) bu jarayonni sinalgan holda beradi — o'z skriptingiz kerak bo'lsa, ularning bosqichlariga tayaning.",
        "",
        "```bash",
        "REL=\"/var/www/releases/$(date +%Y%m%d%H%M%S)\"",
        "git clone --depth 1 --branch \"$BRANCH\" \"$REPO\" \"$REL\"",
        "ln -s /var/www/shared/.env \"$REL/.env\"; rm -rf \"$REL/storage\"; ln -s /var/www/shared/storage \"$REL/storage\"",
        "cd \"$REL\" && composer install --no-dev -o -q && php artisan migrate --force && php artisan optimize",
        "ln -sfn \"$REL\" /var/www/current && sudo systemctl reload php8.3-fpm && php artisan queue:restart",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Releases + symlink asosidagi zero-downtime deploy skriptini rollback va health check bilan yozing.",
      acceptanceCriteria: [
        "Zero-downtime deploy bosqichlarini biladi",
        "Atomik symlink almashtirishni qo'llaydi"
      ],
      prerequisites: [
        "40.15",
        "43.15"
      ]
    },
    {
      id: "40.19",
      title: "Shell Script Security",
      description: [
        "Shell xavfsizligi: foydalanuvchi kirishini `eval` yoki qo'shtirnoqsiz buyruqqa qo'ymaslik (command injection), o'zgaruvchilarni doim qo'shtirnoqda, `--` bilan opsiyalar oxirini belgilash (`rm -- \"$file\"` — `-rf` nomli fayl), vaqtinchalik fayllar `mktemp` bilan (taxmin qilinadigan `/tmp/x` emas), sirlar argumentda emas (`ps` da ko'rinadi — env yoki fayl), `set -x` sirlarni log'ga chiqarishi mumkin, minimal huquqlar (root emas), skript fayllari faqat egasi yoza oladi.",
        "",
        "ShellCheck — statik tahlil; CI'da majburiy qilish mumkin.",
        "",
        "```bash",
        "tmp=$(mktemp)                       # ✅ xavfsiz vaqtinchalik fayl",
        "rm -- \"$user_supplied_name\"         # ✅ \"--\" bilan",
        "mysql --defaults-extra-file=/root/.my.cnf   # ✅ parol argumentda emas",
        "shellcheck scripts/*.sh",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Barcha skriptlarni ShellCheck va xavfsizlik checklist'i bo'yicha audit qilib, topilganlarni tuzating.",
      acceptanceCriteria: [
        "Shell injection va sir sizib chiqishi xavflarini biladi",
        "ShellCheck'ni jarayonga kiritadi"
      ],
      prerequisites: [
        "40.10",
        "51.5"
      ]
    }
  ]
});
