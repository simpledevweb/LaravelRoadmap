/* 38 · Linux
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 38,
  slug: "linux",
  title: "Linux",
  group: "infra",
  description: "Linux — PHP ilovalarining asosiy ishlash muhiti: serverlar, konteynerlar va CI runner'lari. Senior Laravel dasturchi Linux'da erkin ishlay oladi: fayl tizimi va ruxsatlar, jarayonlar va signallar, servislar, log'lar, tarmoq va resurslarni tahlil qilish — production muammolarini tez topish va xavfsiz sozlash uchun zarur ko'nikmalar.",
  subskills: [
    {
      id: "38.1",
      title: "Filesystem Hierarchy",
      description: [
        "FHS (Filesystem Hierarchy Standard): `/etc` (konfiguratsiya — nginx, php), `/var` (o'zgaruvchan ma'lumot — `/var/log`, `/var/www`, `/var/lib/mysql`), `/usr` (dasturlar), `/opt` (qo'shimcha dasturlar), `/home`, `/root`, `/tmp` (vaqtinchalik — qayta yuklashda tozalanishi mumkin), `/proc` va `/sys` (yadro va jarayonlar haqida virtual fayllar), `/dev`, `/run` (runtime fayllar, socket'lar — `/run/php/php8.3-fpm.sock`).",
        "",
        "Bu tuzilmani bilish konfiguratsiya, log va socket'larni tez topish imkonini beradi.",
        "",
        "```bash",
        "ls /etc/php/8.3/fpm/pool.d/",
        "tail -f /var/log/nginx/error.log",
        "cat /proc/meminfo | head",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Serverda PHP-FPM, Nginx va MySQL konfiguratsiya, log va socket fayllarining joylashuvini xaritalang.",
      acceptanceCriteria: [
        "Asosiy kataloglar vazifasini biladi",
        "Konfiguratsiya va log'larni tez topadi"
      ],
      prerequisites: []
    },
    {
      id: "38.2",
      title: "Files and Directories",
      description: [
        "Asosiy buyruqlar: `ls -la`, `cd`, `pwd`, `cp -r`, `mv`, `rm -r` (ehtiyot!), `mkdir -p`, `touch`, `cat`, `less`, `head`/`tail -f`, `find`, `ln -s` (symlink — Laravel `storage:link`, zero-downtime deploy'da `current` → `releases/xxx`), `du -sh`, `stat`, `file`.",
        "",
        "Xavfsizlik odatlari: `rm -rf` dan oldin yo'lni tekshirish, o'zgaruvchi bo'sh bo'lsa `rm -rf \"$DIR/\"` falokati (`${DIR:?}`), muhim fayllarni o'zgartirishdan oldin zaxira nusxa.",
        "",
        "```bash",
        "ln -sfn /var/www/releases/20250601 /var/www/current",
        "find storage/logs -name \"*.log\" -mtime +14 -delete",
        "du -sh /var/www/* | sort -h",
        "```"
      ],
      priority: "core",
      level: "Foundation",
      practicalTask: "Deploy uchun releases papkalari va `current` symlink tuzilmasini qo'lda yaratib, almashtirishni sinang.",
      acceptanceCriteria: [
        "Asosiy fayl buyruqlarini erkin ishlatadi",
        "Symlink'larning deploy'dagi rolini tushunadi"
      ],
      prerequisites: []
    },
    {
      id: "38.3",
      title: "File Permissions",
      description: [
        "Ruxsatlar: egasi (u), guruh (g), boshqalar (o) uchun o'qish (r=4), yozish (w=2), bajarish (x=1): `chmod 644 file` (rw-r--r--), `755` papkalar uchun. `chown user:group`. Papkada `x` — ichiga kirish huquqi. Maxsus bitlar: setgid papkada (yangi fayllar guruhni meros qiladi), sticky bit (`/tmp`).",
        "",
        "Laravel: veb-server/FPM foydalanuvchisi (`www-data`) `storage/` va `bootstrap/cache/` ga yoza olishi kerak; qolgan kod faqat o'qish uchun. `chmod -R 777` — hech qachon (xavfsizlik teshigi). `umask` yangi fayl ruxsatlarini belgilaydi.",
        "",
        "```bash",
        "chown -R deploy:www-data /var/www/app",
        "find /var/www/app -type f -exec chmod 644 {} \\; && find /var/www/app -type d -exec chmod 755 {} \\;",
        "chmod -R ug+rwX storage bootstrap/cache",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Laravel ilovasi uchun xavfsiz ruxsatlar sxemasini (deploy foydalanuvchisi + www-data) sozlang.",
      acceptanceCriteria: [
        "Raqamli va belgili ruxsatlarni biladi",
        "Laravel uchun minimal yozish ruxsatlarini beradi"
      ],
      prerequisites: [
        "38.2"
      ]
    },
    {
      id: "38.4",
      title: "Users va Groups",
      description: [
        "Foydalanuvchilar `/etc/passwd`, guruhlar `/etc/group`, parol hash'lari `/etc/shadow`. Buyruqlar: `useradd`/`adduser`, `usermod -aG www-data deploy` (guruhga qo'shish), `id`, `groups`, `su - user`, `sudo` (`/etc/sudoers` — `visudo` bilan tahrirlash).",
        "",
        "Amaliyot: har bir servis o'z foydalanuvchisi ostida (nginx, www-data, mysql), deploy uchun alohida `deploy` foydalanuvchisi (root emas), sudo huquqlari minimal (faqat `systemctl reload php8.3-fpm` kabi aniq buyruqlar).",
        "",
        "```bash",
        "adduser --disabled-password deploy",
        "usermod -aG www-data deploy",
        "echo 'deploy ALL=(root) NOPASSWD: /bin/systemctl reload php8.3-fpm' > /etc/sudoers.d/deploy",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Deploy foydalanuvchisini minimal sudo huquqi (faqat FPM reload) bilan yarating.",
      acceptanceCriteria: [
        "Foydalanuvchi va guruhlarni boshqaradi",
        "Sudo'ni eng kam huquq tamoyili bilan sozlaydi"
      ],
      prerequisites: [
        "38.3"
      ]
    },
    {
      id: "38.5",
      title: "Processes",
      description: [
        "Jarayon — bajarilayotgan dastur: PID, ota jarayon (PPID), egasi, holat (R, S, D, Z — zombie), resurslar. Ko'rish: `ps aux`, `ps -ef --forest`, `pgrep -a php`, `top`/`htop`, `/proc/<pid>/`. Fon va oldingi jarayonlar: `&`, `jobs`, `fg`, `nohup`.",
        "",
        "PHP kontekstida: FPM master va worker jarayonlari, queue worker'lar (Supervisor ostida), cron jarayonlari. `D` (uninterruptible sleep) holatidagi ko'p jarayonlar — I/O muammosi belgisi.",
        "",
        "```bash",
        "ps -ef --forest | grep -A5 php-fpm",
        "pgrep -af \"queue:work\"",
        "cat /proc/$(pgrep -o php-fpm)/status | grep -E 'State|VmRSS'",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Serverdagi PHP-FPM va queue worker jarayonlari daraxtini, xotira sarfini va holatlarini tahlil qiling.",
      acceptanceCriteria: [
        "Jarayon atributlari va holatlarini biladi",
        "PHP jarayonlarini kuzatadi"
      ],
      prerequisites: [
        "38.2"
      ]
    },
    {
      id: "38.6",
      title: "Signals",
      description: [
        "Signallar — jarayonlarga xabar: `SIGTERM` (15 — muloyim to'xtash, default `kill`), `SIGKILL` (9 — darhol o'ldirish, ushlab bo'lmaydi, tozalashsiz), `SIGINT` (2 — Ctrl+C), `SIGHUP` (1 — ko'p demonlar uchun konfiguratsiyani qayta o'qish), `SIGUSR2` (PHP-FPM uchun graceful reload), `SIGQUIT`.",
        "",
        "Laravel queue worker'i `SIGTERM` ni ushlaydi va joriy job'ni tugatib to'xtaydi (graceful) — shuning uchun deploy'da avval `SIGTERM`, `SIGKILL` faqat oxirgi chora. Konteynerda PID 1 signallarni to'g'ri uzatishi kerak (`exec` forma, `tini`).",
        "",
        "```bash",
        "kill -TERM $(pgrep -f \"queue:work\")      # graceful",
        "kill -USR2 $(cat /run/php/php8.3-fpm.pid) # FPM graceful reload",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Queue worker'ga SIGTERM va SIGKILL yuborib, joriy job'ga ta'sirini solishtiring.",
      acceptanceCriteria: [
        "Asosiy signallar va ularning ma'nosini biladi",
        "Graceful to'xtatishning ahamiyatini tushunadi"
      ],
      prerequisites: [
        "38.5"
      ]
    },
    {
      id: "38.7",
      title: "Services",
      description: [
        "systemd — zamonaviy Linux'da servislar menejeri: `systemctl start|stop|restart|reload|status|enable|disable nginx`, `systemctl list-units --failed`, `journalctl -u nginx`. Unit fayllar `/etc/systemd/system/*.service` — o'z servisingizni (masalan, queue worker yoki Octane) yaratish mumkin: `ExecStart`, `User`, `Restart=always`, `RestartSec`.",
        "",
        "`reload` (konfiguratsiyani uzilishsiz qayta o'qish) va `restart` (to'liq qayta ishga tushirish) farqi production'da muhim.",
        "",
        "```ini",
        "# /etc/systemd/system/laravel-queue.service",
        "[Service]",
        "User=www-data",
        "WorkingDirectory=/var/www/current",
        "ExecStart=/usr/bin/php artisan queue:work --sleep=3 --tries=3 --max-time=3600",
        "Restart=always",
        "[Install]",
        "WantedBy=multi-user.target",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Laravel queue worker uchun systemd unit yarating, enable qiling va qayta ishga tushish xatti-harakatini sinang.",
      acceptanceCriteria: [
        "`systemctl` buyruqlari va reload/restart farqini biladi",
        "O'z servis unit'ini yoza oladi"
      ],
      prerequisites: [
        "38.5"
      ]
    },
    {
      id: "38.8",
      title: "Package Management",
      description: [
        "Paket menejerlari: Debian/Ubuntu — `apt` (`apt update`, `install`, `remove`, `purge`, `upgrade`, `apt-cache policy`), RHEL — `dnf`, Alpine — `apk`. PHP'ning yangi versiyalari uchun Ubuntu'da `ondrej/php` PPA. Paket versiyasini qotirish: `apt-mark hold`.",
        "",
        "Amaliyot: faqat kerakli paketlar (hujum yuzasi kichik), xavfsizlik yangilanishlari muntazam, production'da `upgrade` dan oldin staging'da sinash, kerakli PHP kengaytmalari ro'yxatini hujjatlashtirish (yoki konteynerda).",
        "",
        "```bash",
        "add-apt-repository ppa:ondrej/php && apt update",
        "apt install -y php8.3-fpm php8.3-mysql php8.3-redis php8.3-intl php8.3-mbstring php8.3-xml php8.3-zip",
        "php -m | sort",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Toza Ubuntu serveriga Laravel uchun kerakli PHP versiyasi va kengaytmalarini o'rnating va ro'yxatini hujjatlashtiring.",
      acceptanceCriteria: [
        "Paket menejeri asosiy buyruqlarini biladi",
        "Kerakli PHP kengaytmalarini o'rnatadi"
      ],
      prerequisites: [
        "38.4"
      ]
    },
    {
      id: "38.9",
      title: "Environment Variables",
      description: [
        "Muhit o'zgaruvchilari — jarayonga uzatiladigan kalit-qiymatlar: `env`, `printenv`, `export VAR=val`, `VAR=val command` (faqat shu buyruq uchun), `~/.bashrc`, `/etc/environment`, systemd `Environment=`/`EnvironmentFile=`. Bola jarayonlar ota jarayon muhitini meros qiladi.",
        "",
        "PHP-FPM default holatda muhitni tozalaydi (`clear_env = yes`) — o'zgaruvchilarni pool konfiguratsiyasida (`env[APP_ENV] = production`) berish yoki Laravel `.env` dan foydalanish. `/proc/<pid>/environ` — jarayon muhitini ko'rish (sirlar ko'rinishi mumkin!).",
        "",
        "```bash",
        "export APP_ENV=staging",
        "APP_DEBUG=false php artisan about",
        "tr '\\0' '\\n' < /proc/$(pgrep -o php-fpm)/environ | grep APP_",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "FPM pool'iga muhit o'zgaruvchilarini to'g'ri uzatib, `clear_env` ta'sirini tekshiring.",
      acceptanceCriteria: [
        "Muhit o'zgaruvchilarining meros qilinishini biladi",
        "FPM `clear_env` xatti-harakatini tushunadi"
      ],
      prerequisites: [
        "38.5"
      ]
    },
    {
      id: "38.10",
      title: "Pipes va Redirection",
      description: [
        "Pipe (`|`) — bir buyruq chiqishini ikkinchisiga kirish sifatida uzatish; redirection: `>` (faylga yozish, ustidan), `>>` (qo'shish), `<` (fayldan o'qish), `2>` (stderr), `2>&1` (stderr'ni stdout'ga), `&>` (ikkalasi), `/dev/null` (tashlab yuborish), `tee` (ham ekranga, ham faylga).",
        "",
        "Log tahlilida juda kuchli: `grep | awk | sort | uniq -c | sort -rn | head`. Cron'da chiqishni log'ga yo'naltirish — aks holda xatolar yo'qoladi.",
        "",
        "```bash",
        "grep \" 500 \" /var/log/nginx/access.log | awk '{print $7}' | sort | uniq -c | sort -rn | head",
        "php artisan app:report >> storage/logs/report.log 2>&1",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Nginx access log'idan eng ko'p 5xx bergan 10 ta URL'ni pipe zanjiri bilan toping.",
      acceptanceCriteria: [
        "Pipe va redirection operatorlarini biladi",
        "Log tahlili uchun zanjirlar tuzadi"
      ],
      prerequisites: [
        "38.2"
      ]
    },
    {
      id: "38.11",
      title: "Logs",
      description: [
        "Linux log manbalari: `journalctl` (systemd jurnali — `-u nginx`, `-f`, `--since \"1 hour ago\"`, `-p err`), `/var/log/syslog`, `/var/log/auth.log` (SSH kirishlar, sudo), `/var/log/nginx/`, PHP-FPM log va slow log, MySQL error/slow log, Laravel `storage/logs`. `dmesg` — yadro xabarlari (OOM killer!).",
        "",
        "Log rotatsiyasi — `logrotate` (`/etc/logrotate.d/`), aks holda disk to'ladi. Markaziy yig'ish (Loki, ELK) bir nechta serverda qidirish uchun.",
        "",
        "```bash",
        "journalctl -u php8.3-fpm --since \"30 min ago\" -p warning",
        "dmesg -T | grep -i \"killed process\"",
        "grep \"Failed password\" /var/log/auth.log | tail",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Serverdagi barcha muhim log manbalarini va ularning rotatsiyasini tekshirib, ro'yxatini tuzing.",
      acceptanceCriteria: [
        "Asosiy log manbalarini va `journalctl` ni biladi",
        "OOM va xavfsizlik hodisalarini log'dan topadi"
      ],
      prerequisites: [
        "38.7"
      ]
    },
    {
      id: "38.12",
      title: "Disk Usage",
      description: [
        "Disk monitoringi: `df -h` (fayl tizimlari bo'yicha bo'sh joy), `df -i` (inode'lar — ko'p mayda fayl, masalan session/kesh fayllari, inode'larni tugatishi mumkin), `du -sh * | sort -h` (qaysi papka katta), `ncdu` (interaktiv), `lsof +L1` (o'chirilgan, lekin hali ochiq fayllar — joy bo'shamaydi).",
        "",
        "Tipik \"disk to'ldi\" sabablari: rotatsiyasiz log'lar, Docker image/volume/log'lar (`docker system df`), eski deploy reliz'lari, MySQL binlog'lar, `/tmp`. Disk 100% — DB va ilova yiqiladi; 80% da alert.",
        "",
        "```bash",
        "df -h && df -i",
        "du -xh / --max-depth=2 2>/dev/null | sort -h | tail -20",
        "docker system df",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "\"Disk to'ldi\" holatini sun'iy yaratib, sababini 5 daqiqada topish qo'llanmasini yozing.",
      acceptanceCriteria: [
        "Disk va inode monitoringini biladi",
        "To'lgan diskning tipik sabablarini topadi"
      ],
      prerequisites: [
        "38.2"
      ]
    },
    {
      id: "38.13",
      title: "Memory va CPU Monitoring",
      description: [
        "Xotira: `free -h` (`available` ustuni muhim — \"used\" kesh tufayli katta ko'rinadi), `vmstat 1`, swap ishlatilishi (doimiy swap — RAM yetishmaydi), OOM killer (`dmesg`). CPU: `top`/`htop`, load average (CPU yadrolari soniga nisbatan), `mpstat`, `pidstat` (jarayon bo'yicha), I/O kutish (`%wa` — disk tor joy).",
        "",
        "PHP kontekstida: FPM worker'lar soni × har birining xotirasi, memory leak'li queue worker, CPU'ni band qilgan cron.",
        "",
        "```bash",
        "free -h",
        "vmstat 1 5",
        "pidstat -r -p $(pgrep -d, php-fpm) 1 3",
        "uptime   # load average",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Serverning xotira va CPU holatini tahlil qilib, FPM worker'lar sonini xotiraga moslab hisoblang.",
      acceptanceCriteria: [
        "Xotira va CPU metrikalarini to'g'ri o'qiydi",
        "Load average va I/O wait'ni talqin qiladi"
      ],
      prerequisites: [
        "38.5"
      ]
    },
    {
      id: "38.14",
      title: "Networking Commands",
      description: [
        "Tarmoq diagnostikasi: `ip a`/`ip r` (interfeys va marshrutlar), `ss -tlnp` (qaysi jarayon qaysi portni tinglayapti), `ss -s`, `curl -v`/`curl -I` (HTTP), `dig`/`nslookup` (DNS), `ping`, `traceroute`/`mtr` (yo'l), `nc -zv host 3306` (port ochiqmi), `tcpdump` (paketlar), `openssl s_client -connect host:443` (TLS).",
        "",
        "Tipik savollar: \"ilova DB'ga ulana olmayapti\" — `nc -zv`, DNS, firewall; \"502\" — FPM socket/port; \"sekin\" — `curl -w` bilan vaqt bosqichlari.",
        "",
        "```bash",
        "ss -tlnp | grep -E ':80|:443|:9000|:3306'",
        "curl -o /dev/null -s -w \"dns:%{time_namelookup} connect:%{time_connect} ttfb:%{time_starttransfer} total:%{time_total}\\n\" https://app.example.uz",
        "nc -zv db.internal 3306",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ilova → DB ulanish muammosini qatlamlar bo'yicha (DNS, port, firewall, auth) diagnostika qiling.",
      acceptanceCriteria: [
        "Asosiy tarmoq buyruqlarini biladi",
        "Ulanish muammosini qatlamlab tahlil qiladi"
      ],
      prerequisites: [
        "50.11"
      ]
    },
    {
      id: "38.15",
      title: "SSH",
      description: [
        "SSH — serverga xavfsiz masofaviy kirish: kalit juftligi (`ssh-keygen -t ed25519`), public kalit serverda `~/.ssh/authorized_keys`, `~/.ssh/config` (host alias'lari, foydalanuvchi, port, `ProxyJump` bastion orqali), `ssh-agent` va agent forwarding (ehtiyotkorlik bilan), `scp`/`rsync`, port forwarding (`-L` — masofaviy DB'ga lokal ulanish).",
        "",
        "Xavfsizlik: parol bilan kirishni o'chirish, root kirishni o'chirish, kalitlarni parol bilan himoyalash, ketgan xodimlar kalitlarini olib tashlash.",
        "",
        "```text",
        "# ~/.ssh/config",
        "Host prod-app",
        "  HostName 10.0.1.15",
        "  User deploy",
        "  ProxyJump bastion.example.uz",
        "  IdentityFile ~/.ssh/id_ed25519",
        "```",
        "```bash",
        "ssh -L 3307:127.0.0.1:3306 prod-app   # prod DB'ga xavfsiz tunnel",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "SSH config bilan bastion orqali serverga ulanishni va DB uchun port forwarding'ni sozlang.",
      acceptanceCriteria: [
        "Kalit asosidagi autentifikatsiya va config'dan foydalanadi",
        "Port forwarding va ProxyJump'ni biladi"
      ],
      prerequisites: [
        "38.4"
      ]
    },
    {
      id: "38.16",
      title: "File Descriptors",
      description: [
        "File descriptor (FD) — jarayon ochgan resurs (fayl, socket, pipe) uchun raqam; har jarayon va tizim uchun limit bor (`ulimit -n`, `/proc/sys/fs/file-max`). Yuqori yuklamada (ko'p ulanish — Nginx, Redis, Octane, WebSocket server) \"Too many open files\" xatosi.",
        "",
        "Tekshirish: `ls /proc/<pid>/fd | wc -l`, `lsof -p <pid>`, `cat /proc/<pid>/limits`. Oshirish: systemd unit'da `LimitNOFILE=65535`, `/etc/security/limits.conf`, Nginx `worker_rlimit_nofile`. FD sizib chiqishi (yopilmagan fayllar) — long-running PHP jarayonlarida ehtimoliy muammo.",
        "",
        "```bash",
        "cat /proc/$(pgrep -o nginx)/limits | grep \"open files\"",
        "ls /proc/$(pgrep -o php-fpm)/fd | wc -l",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Nginx va PHP-FPM uchun FD limitlarini tekshirib, yuqori yuklama uchun oshiring.",
      acceptanceCriteria: [
        "FD tushunchasi va limitlarini biladi",
        "\"Too many open files\" xatosini tashxislaydi"
      ],
      prerequisites: [
        "38.5"
      ]
    },
    {
      id: "38.17",
      title: "Process Monitoring",
      description: [
        "Jarayonlarni doimiy kuzatish va tiklash: Supervisor (Laravel queue worker'lari uchun klassik tanlov — `autorestart`, `numprocs`, `stopwaitsecs`), systemd (`Restart=always`), Docker/K8s restart siyosatlari. Monitoring: jarayon tirikmi, qancha xotira yeydi, qayta ishga tushishlar soni (tez-tez qayta tushish — xato belgisi).",
        "",
        "Supervisor'da `stopwaitsecs` eng uzun job davomiyligidan katta bo'lishi kerak — aks holda deploy paytida job o'rtada o'ldiriladi.",
        "",
        "```ini",
        "[program:laravel-worker]",
        "command=php /var/www/current/artisan queue:work redis --sleep=3 --tries=3 --max-time=3600",
        "numprocs=4",
        "process_name=%(program_name)s_%(process_num)02d",
        "autostart=true",
        "autorestart=true",
        "stopwaitsecs=360",
        "user=www-data",
        "redirect_stderr=true",
        "stdout_logfile=/var/www/shared/storage/logs/worker.log",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Supervisor bilan 4 ta queue worker sozlang va deploy'da graceful qayta ishga tushirishni sinang.",
      acceptanceCriteria: [
        "Supervisor va systemd'ni jarayon boshqaruvi uchun ishlatadi",
        "`stopwaitsecs` va job davomiyligi bog'liqligini biladi"
      ],
      prerequisites: [
        "38.7"
      ]
    },
    {
      id: "38.18",
      title: "System Troubleshooting",
      description: [
        "Tizimli diagnostika metodologiyasi (USE — Utilization, Saturation, Errors har resurs uchun): CPU (`top`, load), xotira (`free`, OOM), disk (`df`, `iostat`), tarmoq (`ss`, `sar -n DEV`), keyin servislar (`systemctl --failed`, `journalctl -p err`), keyin ilova log'lari.",
        "",
        "Birinchi 60 soniya: `uptime`, `dmesg -T | tail`, `vmstat 1`, `mpstat -P ALL 1`, `pidstat 1`, `iostat -xz 1`, `free -m`, `sar -n DEV 1`, `top`. O'zgarishlarni bitta-bitta va qayd qilib bajaring; \"nima o'zgardi?\" (deploy, trafik, cron) — asosiy savol.",
        "",
        "```bash",
        "uptime; dmesg -T | tail -20; vmstat 1 5; iostat -xz 1 3; free -m; systemctl --failed",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "\"Server sekinlashdi\" holati uchun 60 soniyalik diagnostika checklist'ini yozing va amalda sinang.",
      acceptanceCriteria: [
        "USE metodologiyasini qo'llaydi",
        "Muammoni tizimli toraytiradi"
      ],
      prerequisites: [
        "38.13"
      ]
    },
    {
      id: "38.19",
      title: "Security Basics",
      description: [
        "Linux server xavfsizligi asoslari: tizimni yangilab turish, SSH qattiqlashtirish (kalit, root yo'q, `fail2ban`), firewall (faqat 22, 80, 443 ochiq; DB va Redis faqat ichki), minimal paketlar va servislar, har servis o'z foydalanuvchisi ostida, to'g'ri fayl ruxsatlari (`.env` 640), sirlar fayllarda emas secret manager'da, log'lar va audit (`auth.log`), avtomatik xavfsizlik yangilanishlari, muntazam backup.",
        "",
        "Ochiq portlarni tekshirish: `ss -tlnp` va tashqaridan `nmap`.",
        "",
        "```bash",
        "ss -tlnp",
        "ufw status verbose",
        "chmod 640 /var/www/shared/.env && chown deploy:www-data /var/www/shared/.env",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Server uchun xavfsizlik checklist'i bo'yicha audit o'tkazib, topilgan kamchiliklarni tuzating.",
      acceptanceCriteria: [
        "Asosiy server xavfsizlik choralarini biladi",
        "Ochiq portlar va ruxsatlarni audit qiladi"
      ],
      prerequisites: [
        "39.10"
      ]
    }
  ]
});
