/* 39 · Ubuntu Server
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 39,
  slug: "ubuntu-server",
  title: "Ubuntu Server",
  group: "infra",
  description: "Ubuntu Server — Laravel ilovalari uchun eng keng tarqalgan server operatsion tizimi. Senior dasturchi toza serverni production'ga tayyorlay oladi: foydalanuvchilar, SSH, firewall, yangilanishlar, servislar, monitoring, backup va qattiqlashtirish — hatto DevOps jamoasi bo'lmagan kichik loyihalarda ham.",
  subskills: [
    {
      id: "39.1",
      title: "Installation va Initial Setup",
      description: [
        "Ubuntu LTS versiyasini tanlang (5 yillik qo'llab-quvvatlash). Boshlang'ich sozlash: tizimni yangilash, hostname va vaqt zonasi, sudo huquqli oddiy foydalanuvchi yaratish, SSH kalit bilan kirish, root SSH kirishini o'chirish, firewall, swap (kichik RAM'li serverlarda), avtomatik xavfsizlik yangilanishlari.",
        "",
        "Takrorlanuvchanlik uchun bu qadamlarni skript, cloud-init yoki Ansible bilan avtomatlashtiring — qo'lda sozlangan \"snowflake\" serverlar qayta tiklash qiyin.",
        "",
        "```bash",
        "apt update && apt -y upgrade",
        "hostnamectl set-hostname app-01",
        "timedatectl set-timezone UTC",
        "adduser deploy && usermod -aG sudo deploy",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Yangi Ubuntu serverni boshlang'ich sozlash uchun cloud-init yoki bash skript yozing.",
      acceptanceCriteria: [
        "LTS tanlash va boshlang'ich qadamlarni biladi",
        "Sozlashni avtomatlashtiradi"
      ],
      prerequisites: [
        "38.4"
      ]
    },
    {
      id: "39.2",
      title: "APT Package Management",
      description: [
        "APT: `apt update` (paketlar ro'yxatini yangilash), `apt install`, `apt upgrade` (yangilash), `apt full-upgrade` (bog'liqlik o'zgarishi bilan), `apt autoremove`, `apt search`, `apt show`, `apt list --upgradable`, `apt-mark hold <pkg>` (versiyani qotirish). Repozitoriylar `/etc/apt/sources.list.d/`, PPA'lar (`ondrej/php`, `ondrej/nginx`).",
        "",
        "Uchinchi tomon repozitoriylarini faqat ishonchli manbalardan, GPG kalit bilan. Production'da yangilanishlarni avval staging'da sinash.",
        "",
        "```bash",
        "apt list --upgradable",
        "apt-mark hold mysql-server",
        "apt -y install nginx php8.3-fpm php8.3-cli supervisor",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Server paketlari ro'yxatini chiqarib, yangilanishi kerak bo'lganlarini va qotirilishi kerak bo'lganlarini aniqlang.",
      acceptanceCriteria: [
        "APT buyruqlarini erkin ishlatadi",
        "Paket versiyalarini nazorat qiladi"
      ],
      prerequisites: [
        "38.8"
      ]
    },
    {
      id: "39.3",
      title: "User va Group Management",
      description: [
        "Ubuntu'da foydalanuvchi boshqaruvi: `adduser` (interaktiv, Ubuntu'ga xos qulay), `deluser --remove-home`, `usermod -aG group user`, `passwd -l` (bloklash), `chage` (parol muddati), `/etc/sudoers.d/` (alohida sudo qoidalari).",
        "",
        "Rollar bo'yicha: shaxsiy admin foydalanuvchilar (umumiy hisob emas — audit uchun), `deploy` (CI/CD uchun, cheklangan sudo), servis foydalanuvchilari (`www-data`, login'siz). Ketgan xodim — darhol hisobini bloklash va SSH kalitlarini olib tashlash.",
        "",
        "```bash",
        "adduser alice && usermod -aG sudo alice",
        "passwd -l bob && rm /home/bob/.ssh/authorized_keys",
        "getent group sudo",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Jamoa a'zolari uchun shaxsiy hisoblar va deploy hisobini yarating; ketgan xodimni o'chirish jarayonini yozing.",
      acceptanceCriteria: [
        "Shaxsiy va servis hisoblarini ajratadi",
        "Hisoblarni o'chirish jarayonini biladi"
      ],
      prerequisites: [
        "38.4"
      ]
    },
    {
      id: "39.4",
      title: "SSH Configuration",
      description: [
        "`/etc/ssh/sshd_config` (yoki `sshd_config.d/*.conf`) qattiqlashtirish: `PasswordAuthentication no`, `PermitRootLogin no`, `PubkeyAuthentication yes`, `AllowUsers deploy alice`, `MaxAuthTries 3`, ixtiyoriy port o'zgartirish (shovqinni kamaytiradi, xavfsizlik emas). O'zgarishdan keyin `sshd -t` (sintaksis tekshiruvi) va **yangi sessiyada** ulanishni sinab ko'rmasdan joriy sessiyani yopmang.",
        "",
        "`fail2ban` — brute-force urinishlarini bloklaydi. Kirishlar `auth.log` da.",
        "",
        "```text",
        "# /etc/ssh/sshd_config.d/hardening.conf",
        "PasswordAuthentication no",
        "PermitRootLogin no",
        "AllowUsers deploy alice",
        "MaxAuthTries 3",
        "```",
        "```bash",
        "sshd -t && systemctl reload ssh",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "SSH'ni qattiqlashtiring va fail2ban'ni sozlang; o'zgarishdan keyin yangi sessiyada sinang.",
      acceptanceCriteria: [
        "SSH qattiqlashtirish sozlamalarini biladi",
        "O'zini serverdan qulflab qo'ymaslik ehtiyotini qiladi"
      ],
      prerequisites: [
        "38.15"
      ]
    },
    {
      id: "39.5",
      title: "Firewall Configuration",
      description: [
        "UFW (Uncomplicated Firewall): `ufw default deny incoming`, `ufw default allow outgoing`, `ufw allow OpenSSH`, `ufw allow 'Nginx Full'`, `ufw allow from 10.0.0.0/24 to any port 3306` (DB faqat ichki tarmoqdan), `ufw enable`, `ufw status numbered`.",
        "",
        "Muhim: SSH'ga ruxsat bermasdan `enable` qilmang. Docker iptables'ni to'g'ridan-to'g'ri o'zgartiradi va nashr qilingan portlar UFW'ni chetlab o'tishi mumkin — portlarni `127.0.0.1` ga bog'lang yoki `DOCKER-USER` zanjiridan foydalaning. Bulut provayderlarda qo'shimcha security group'lar.",
        "",
        "```bash",
        "ufw default deny incoming && ufw default allow outgoing",
        "ufw allow OpenSSH && ufw allow 'Nginx Full'",
        "ufw allow from 10.0.1.0/24 to any port 6379 proto tcp",
        "ufw enable && ufw status verbose",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Web server uchun UFW qoidalarini sozlang: faqat SSH va HTTP(S) ochiq, Redis faqat ichki tarmoqdan.",
      acceptanceCriteria: [
        "UFW asosiy qoidalarini biladi",
        "Docker va UFW o'zaro ta'sirini tushunadi"
      ],
      prerequisites: [
        "39.4"
      ]
    },
    {
      id: "39.6",
      title: "System Updates",
      description: [
        "Yangilanishlar strategiyasi: xavfsizlik yangilanishlari tez (avtomatik — 39.11), boshqa yangilanishlar rejali (oyiga bir, staging'da sinab), yadro yangilanishidan keyin qayta yuklash (`/var/run/reboot-required`), LTS'dan LTS'ga upgrade (`do-release-upgrade`) — alohida loyiha sifatida, backup bilan.",
        "",
        "Ko'p serverli muhitda — rolling update (bittadan, load balancer'dan chiqarib). Livepatch (Ubuntu Pro) qayta yuklashsiz yadro patch'lari.",
        "",
        "```bash",
        "apt update && apt list --upgradable",
        "apt -y upgrade",
        "[ -f /var/run/reboot-required ] && cat /var/run/reboot-required.pkgs",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Serverlar uchun yangilanish siyosatini (chastota, sinov, qayta yuklash oynasi) yozing.",
      acceptanceCriteria: [
        "Xavfsizlik va oddiy yangilanishlarni ajratadi",
        "Qayta yuklash zaruratini kuzatadi"
      ],
      prerequisites: [
        "39.2"
      ]
    },
    {
      id: "39.7",
      title: "Service Management",
      description: [
        "systemd orqali servislar: `systemctl status|start|stop|restart|reload|enable|disable`, `systemctl is-active`, `systemctl list-units --type=service --state=running`, `systemctl daemon-reload` (unit fayllar o'zgarganda), override'lar (`systemctl edit nginx` — paket faylini o'zgartirmasdan).",
        "",
        "Laravel serveridagi servislar: nginx, php8.3-fpm, mysql/postgresql, redis-server, supervisor (queue worker'lar), cron. Deploy'da: `reload php8.3-fpm` (OPcache tozalash), `supervisorctl restart` yoki `php artisan queue:restart`.",
        "",
        "```bash",
        "systemctl edit php8.3-fpm     # override: LimitNOFILE=65535",
        "systemctl daemon-reload && systemctl restart php8.3-fpm",
        "systemctl --failed",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Server servislari ro'yxatini tuzing, FPM uchun systemd override qo'shing va enable holatlarini tekshiring.",
      acceptanceCriteria: [
        "Servislarni systemd bilan boshqaradi",
        "Override orqali sozlashni biladi"
      ],
      prerequisites: [
        "38.7"
      ]
    },
    {
      id: "39.8",
      title: "System Logs",
      description: [
        "Ubuntu log'lari: `journalctl` (`-u`, `-f`, `--since`, `-p`, `-b` — joriy yuklash), `/var/log/syslog`, `/var/log/auth.log`, `/var/log/kern.log`, `/var/log/apt/history.log` (nima o'rnatildi), `/var/log/unattended-upgrades/`, servis log'lari (`/var/log/nginx`, `/var/log/mysql`).",
        "",
        "journald sozlamalari — hajm cheklovi (`SystemMaxUse=1G` — `/etc/systemd/journald.conf`). logrotate — servis log'lari uchun. Markaziy log yig'ish (Promtail → Loki, Filebeat → Elasticsearch).",
        "",
        "```bash",
        "journalctl -b -p err",
        "journalctl -u nginx --since today",
        "grep -i \"upgrade\" /var/log/apt/history.log | tail",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "journald hajm cheklovini sozlang va asosiy log'larni markaziy tizimga yuboring.",
      acceptanceCriteria: [
        "Ubuntu log manbalarini biladi",
        "Log hajmini nazorat qiladi"
      ],
      prerequisites: [
        "38.11"
      ]
    },
    {
      id: "39.9",
      title: "Disk va Memory Monitoring",
      description: [
        "Resurs monitoringi: disk (`df -h`, `df -i`, `ncdu`), xotira (`free -h`, swap), alert'lar (disk > 80%, xotira, swap ishlatilishi). Vositalar: Netdata (oson o'rnatiladigan real-vaqt dashboard), Prometheus `node_exporter` + Grafana, bulut monitoringi.",
        "",
        "Swap: kichik serverlarda xavfsizlik yostig'i sifatida (OOM o'rniga sekinlashish), lekin doimiy swap — RAM yetishmasligi. `vm.swappiness` sozlamasi. Disk o'sish trendi — qachon to'lishini oldindan bilish.",
        "",
        "```bash",
        "fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile",
        "echo '/swapfile none swap sw 0 0' >> /etc/fstab",
        "sysctl vm.swappiness=10",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Serverga node_exporter yoki Netdata o'rnatib, disk va xotira alert'larini sozlang.",
      acceptanceCriteria: [
        "Disk va xotira monitoringini sozlaydi",
        "Swap'ning rolini va xavfini biladi"
      ],
      prerequisites: [
        "38.12"
      ]
    },
    {
      id: "39.10",
      title: "Server Hardening",
      description: [
        "Qattiqlashtirish checklist'i: SSH (kalit, root yo'q, fail2ban), firewall (minimal portlar), avtomatik xavfsizlik yangilanishlari, keraksiz servislar o'chirilgan (`systemctl list-unit-files --state=enabled`), servislar alohida foydalanuvchilarda, fayl ruxsatlari (`.env` 640), Nginx/PHP versiyani yashirish (`server_tokens off`, `expose_php off`), kernel parametrlari (`sysctl` — SYN cookies, ICMP redirect'lar), audit (`auditd`), CIS Benchmark yoki Lynis bilan tekshirish.",
        "",
        "```bash",
        "apt install lynis && lynis audit system",
        "systemctl list-unit-files --state=enabled",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Lynis bilan server auditi o'tkazib, eng muhim 10 ta tavsiyani bajaring.",
      acceptanceCriteria: [
        "Qattiqlashtirish yo'nalishlarini biladi",
        "Avtomatik audit vositasidan foydalanadi"
      ],
      prerequisites: [
        "39.4",
        "39.5"
      ]
    },
    {
      id: "39.11",
      title: "Automatic Security Updates",
      description: [
        "`unattended-upgrades` — xavfsizlik yangilanishlarini avtomatik o'rnatadi: `/etc/apt/apt.conf.d/50unattended-upgrades` (qaysi manbalar — odatda faqat `-security`), `20auto-upgrades` (chastota), avtomatik qayta yuklash (`Automatic-Reboot \"true\"` + vaqt — ehtiyotkorlik bilan), email bildirishnoma.",
        "",
        "Muvozanat: xavfsizlik patch'lari kechiktirilmasligi kerak, lekin MySQL kabi kritik servislarni avtomatik yangilashni istisno qilish mumkin (`Package-Blacklist`). Natijalarni `/var/log/unattended-upgrades/` da kuzating.",
        "",
        "```bash",
        "apt install unattended-upgrades",
        "dpkg-reconfigure -plow unattended-upgrades",
        "unattended-upgrade --dry-run --debug",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "unattended-upgrades'ni faqat xavfsizlik yangilanishlari uchun sozlang va dry-run bilan tekshiring.",
      acceptanceCriteria: [
        "Avtomatik yangilanish sozlamalarini biladi",
        "Kritik servislar uchun istisnolarni boshqaradi"
      ],
      prerequisites: [
        "39.6"
      ]
    },
    {
      id: "39.12",
      title: "Time Zone va NTP",
      description: [
        "Server vaqti aniq bo'lishi shart: TLS sertifikatlar, JWT `exp`, webhook timestamp'lari, log korrelyatsiyasi, cron, tranzaksiya vaqtlari. `timedatectl` — holat va zona; NTP sinxronizatsiyasi `systemd-timesyncd` yoki `chrony` orqali.",
        "",
        "Tavsiya: server va DB vaqt zonasi **UTC**, Laravel `APP_TIMEZONE=UTC`, foydalanuvchiga mahalliy vaqtda ko'rsatish ilova darajasida. Soat siljishi (drift) — monitoringda alert.",
        "",
        "```bash",
        "timedatectl set-timezone UTC",
        "timedatectl set-ntp true",
        "timedatectl status       # System clock synchronized: yes",
        "chronyc tracking         # chrony ishlatilsa",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Barcha serverlarda UTC va NTP sinxronizatsiyasini sozlab, holatini tekshiring.",
      acceptanceCriteria: [
        "Aniq vaqtning xavfsizlik va ishonchlilikdagi rolini biladi",
        "Serverlarni UTC va NTP bilan sozlaydi"
      ],
      prerequisites: [
        "14.12"
      ]
    },
    {
      id: "39.13",
      title: "Backup",
      description: [
        "Server backup'i: nima (DB — eng muhim, foydalanuvchi fayllari agar S3'da bo'lmasa, `.env`/sirlar — xavfsiz joyda, konfiguratsiya — yaxshisi IaC'da), qanchalik tez-tez (RPO), qayerga (boshqa server/region, S3 — 3-2-1 qoidasi: 3 nusxa, 2 xil vosita, 1 tashqi joyda), shifrlash, saqlash muddati, va eng muhimi — **restore testi**.",
        "",
        "Vositalar: `mysqldump`/`pg_dump` + cron, `spatie/laravel-backup` (DB + fayllar → S3, bildirishnoma, tozalash), restic/borg, provayder snapshot'lari.",
        "",
        "```php",
        "// spatie/laravel-backup",
        "Schedule::command('backup:clean')->daily()->at('01:00');",
        "Schedule::command('backup:run --only-db')->hourly();",
        "Schedule::command('backup:monitor')->daily()->at('08:00');",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "`spatie/laravel-backup` bilan soatlik DB backup'ni S3'ga sozlang va boshqa serverda restore'ni sinang.",
      acceptanceCriteria: [
        "3-2-1 qoidasi va RPO tushunchasini biladi",
        "Restore testini jarayonga kiritadi"
      ],
      prerequisites: [
        "10.19"
      ]
    },
    {
      id: "39.14",
      title: "Network Configuration",
      description: [
        "Ubuntu'da tarmoq Netplan orqali (`/etc/netplan/*.yaml` → `netplan try`/`apply`): statik IP, DNS, marshrutlar, bir nechta interfeys (public va private tarmoq). DNS: `systemd-resolved` (`resolvectl status`), `/etc/hosts` (lokal nomlar).",
        "",
        "Bulutda odatda DHCP va provayder sozlaydi; private network (VPC) orqali serverlararo trafik (DB, Redis) — public internet orqali emas. `netplan try` — xato bo'lsa avtomatik qaytaradi (masofaviy serverda muhim).",
        "",
        "```yaml",
        "# /etc/netplan/60-private.yaml",
        "network:",
        "  version: 2",
        "  ethernets:",
        "    ens4:",
        "      addresses: [10.0.1.15/24]",
        "```",
        "```bash",
        "netplan try",
        "resolvectl status",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Serverga private tarmoq interfeysini Netplan bilan qo'shing va DB trafikini shu tarmoq orqali yo'naltiring.",
      acceptanceCriteria: [
        "Netplan va systemd-resolved bilan ishlaydi",
        "Ichki trafikni private tarmoqqa yo'naltiradi"
      ],
      prerequisites: [
        "38.14"
      ]
    },
    {
      id: "39.15",
      title: "Production Server Maintenance",
      description: [
        "Muntazam texnik xizmat: yangilanishlar (rejali oyna), disk va log tozalash (eski reliz'lar, log rotatsiyasi, Docker prune), sertifikatlar muddati (certbot avtomatik yangilanishi ishlayaptimi), backup va restore testlari, monitoring alert'lari ko'rib chiqish, xavfsizlik auditi, foydalanuvchilar va kalitlar auditi, resurs trendlari (kengaytirish kerakmi).",
        "",
        "Hujjatlashtirish: runbook'lar (qanday qayta ishga tushirish, qanday rollback), o'zgarishlar jurnali, kim nimaga mas'ul. Ideal holda serverlar IaC (Terraform/Ansible) bilan qayta yaratiladigan — \"pet emas, cattle\".",
        "",
        "```bash",
        "certbot renew --dry-run",
        "ls -1dt /var/www/releases/* | tail -n +6 | xargs rm -rf   # oxirgi 5 ta relizni qoldirish",
        "docker system prune -af --filter \"until=168h\"",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Production server uchun oylik texnik xizmat checklist'i va runbook yozing.",
      acceptanceCriteria: [
        "Muntazam texnik xizmat vazifalarini biladi",
        "Runbook va IaC'ning ahamiyatini tushunadi"
      ],
      prerequisites: [
        "39.13",
        "80.9"
      ]
    }
  ]
});
