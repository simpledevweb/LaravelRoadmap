/* 68 · High Availability
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 68,
  slug: "high-availability",
  title: "High Availability",
  group: "architecture",
  description: "Yuqori mavjudlik (High Availability) — tizim nosozliklarga qaramay foydalanuvchilarga xizmat ko'rsatishda davom etishi: redundancy, avtomatik failover, sog'liq tekshiruvlari, graceful degradation va tez tiklash. Senior dasturchi yagona nosozlik nuqtalarini topadi, RTO/RPO talablariga mos arxitekturani tanlaydi va tiklash jarayonlarini muntazam sinaydi.",
  subskills: [
    {
      id: "68.1",
      title: "Redundancy",
      description: [
        "Redundancy — har muhim komponentning zaxirasi: bir nechta app server, DB replika/standby, Redis replika yoki klaster, bir nechta load balancer, bir nechta AZ, zaxira provayderlar (SMS, to'lov). Aktiv-aktiv (barchasi trafik oladi) yoki aktiv-passiv (zaxira kutadi).",
        "",
        "N+1 tamoyili: kerakli sig'im + kamida bitta zaxira (bitta instance yo'qolsa ham to'liq sig'im). Redundancy faqat avtomatik failover va health check'lar bilan foydali; zaxira ham muntazam sinab turilishi kerak.",
        "",
        "```text",
        "App: 3 instance (2 tasi yetarli) — N+1",
        "DB: primary + sinxron standby (boshqa AZ) + async read replika",
        "Redis: primary + replika + Sentinel (3)",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Tizim komponentlari uchun redundancy darajasini jadvalda baholab, zaxirasizlarini aniqlang.",
      acceptanceCriteria: [
        "Redundancy turlari va N+1 tamoyilini biladi",
        "Redundancy'ni failover bilan bog'laydi"
      ],
      prerequisites: [
        "66.16"
      ]
    },
    {
      id: "68.2",
      title: "Single Points of Failure",
      description: [
        "SPOF — ishdan chiqsa butun tizimni to'xtatadigan komponent: bitta server, bitta DB, bitta load balancer, bitta Redis (session va navbat bilan!), bitta AZ, bitta DNS provayder, cron ishlaydigan yagona server, bitta odam (faqat u biladigan tizim), muddati tugaydigan sertifikat, to'lov provayderi.",
        "",
        "SPOF tahlili: arxitektura diagrammasi bo'yicha har komponent uchun \"bu yo'qolsa nima bo'ladi?\"; xavf va narx bo'yicha ustuvorlik (har SPOF'ni yo'qotish shart emas — biznes ta'siriga qarab).",
        "",
        "```text",
        "SPOF ro'yxati:",
        "1. Redis (session + queue + cache) — yuqori xavf → Sentinel/managed",
        "2. Scheduler bitta serverda — o'rta → onOneServer + barcha serverlarda cron",
        "3. Sertifikat qo'lda yangilanadi — yuqori → certbot avtomatik + monitoring",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Tizimingiz uchun SPOF tahlilini o'tkazib, ustuvorlik bo'yicha yo'qotish rejasini tuzing.",
      acceptanceCriteria: [
        "SPOF'larni (shu jumladan noaniqlarini) topadi",
        "Ularni xavf bo'yicha ustuvorlaydi"
      ],
      prerequisites: [
        "68.1"
      ]
    },
    {
      id: "68.3",
      title: "Load Balancers",
      description: [
        "HA kontekstida LB: nosoz backend'larni avtomatik chiqaradi (health check'lar), trafikni sog'lom instance'larga yo'naltiradi, AZ'lar bo'ylab taqsimlaydi. LB'ning o'zi SPOF bo'lmasligi kerak: boshqariladigan LB (AWS ALB — avtomatik HA), yoki ikki Nginx + keepalived (virtual IP), DNS darajasida bir nechta LB.",
        "",
        "Connection draining — instance chiqarilganda joriy so'rovlarni tugatish; slow start — yangi instance'ga trafikni asta oshirish.",
        "",
        "```text",
        "Route 53 (health check) → ALB (multi-AZ) → Target group: app-a (AZ1), app-b (AZ2), app-c (AZ3)",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Load balancer qatlamini SPOF'siz qilib loyihalang va bitta backend o'chirilganda xatolar sonini o'lchang.",
      acceptanceCriteria: [
        "LB'ning HA'dagi rolini biladi",
        "LB'ning o'zini SPOF qilmaydi"
      ],
      prerequisites: [
        "67.4"
      ]
    },
    {
      id: "68.4",
      title: "Health Checks",
      description: [
        "HA'da health check'lar — avtomatik qarorlar asosi: LB qaysi instance'ga trafik yuborishini, orkestrator qaysi konteynerni qayta ishga tushirishini, failover qachon bo'lishini belgilaydi. Turlari: liveness (jarayon tirikmi — qayta ishga tushirish), readiness (trafik qabul qila oladimi — LB'dan chiqarish/qo'shish), startup (sekin ishga tushish uchun), sintetik/tashqi (foydalanuvchi nuqtai nazaridan).",
        "",
        "Xatolar: juda qattiq health check (DB qisqa sekinlashsa barcha instance'lar chiqariladi — kaskad), juda yumshoq (nosoz instance trafik oladi), health check og'ir operatsiya.",
        "",
        "```php",
        "Route::get('/health/ready', function () {",
        "    try {",
        "        DB::select('select 1');",
        "        Redis::ping();",
        "    } catch (Throwable) {",
        "        return response()->json(['ready' => false], 503);",
        "    }",
        "    return response()->json(['ready' => true]);",
        "});",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Liveness va readiness tekshiruvlarini kaskad nosozlikka olib kelmaydigan qilib sozlang va sinang.",
      acceptanceCriteria: [
        "Health check turlarining HA'dagi rolini biladi",
        "Kaskad chiqarish xavfini oldini oladi"
      ],
      prerequisites: [
        "58.12"
      ]
    },
    {
      id: "68.5",
      title: "Failover",
      description: [
        "Failover — nosoz komponent o'rniga zaxirani avtomatik (yoki qo'lda) ishga tushirish: DB standby'ni primary qilish (Patroni, RDS Multi-AZ, Orchestrator), Redis Sentinel, DNS failover (Route 53 health check), LB orqali instance almashtirish. Muhim: nosozlikni aniqlash vaqti + failover vaqti = uzilish (RTO).",
        "",
        "Xavflar: split-brain (ikki tugun o'zini primary deb biladi — kvorum, fencing), asinxron replikatsiyada ma'lumot yo'qolishi (RPO), ilova qayta ulanishi (DNS kesh, ulanish pool'lari). Failover muntazam sinab turilishi kerak (rejali failover mashqlari).",
        "",
        "```text",
        "RDS Multi-AZ: primary nosozligi → standby promote (60–120 s) → DNS endpoint yangilanadi",
        "Ilova: qayta ulanish + retry → foydalanuvchi ~1–2 daqiqa xato/sekinlik ko'radi",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Staging'da DB failover mashqini o'tkazib, haqiqiy uzilish vaqti va ilova xatti-harakatini o'lchang.",
      acceptanceCriteria: [
        "Failover mexanizmlari va xavflarini biladi",
        "Failover'ni muntazam sinaydi"
      ],
      prerequisites: [
        "68.4"
      ]
    },
    {
      id: "68.6",
      title: "Database Replication",
      description: [
        "HA uchun DB replikatsiyasi: sinxron yoki semi-sync standby (boshqa AZ'da — RPO≈0), avtomatik failover vositasi, replika'lar o'qish uchun, kechiktirilgan replika (masalan, 1 soat orqada — xato `DELETE` dan tez tiklash uchun). Boshqariladigan servislar (RDS, Cloud SQL) buni avtomatlashtiradi.",
        "",
        "Ilova tomoni: yozish endpoint'i failover'dan keyin o'zgaradi (DNS yoki proxy orqali), ulanish qayta tiklanishi, tranzaksiyalar retry, `sticky` o'qishlar. Replikatsiya lag va holat monitoringi.",
        "",
        "```text",
        "Primary (AZ-a) ──sync──▶ Standby (AZ-b, failover uchun)",
        "              ──async─▶ Read replika (AZ-c)",
        "              ──async, delay 1h─▶ Delayed replika (inson xatolaridan himoya)",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "DB uchun HA replikatsiya topologiyasini loyihalab, har replika maqsadini va RPO'ni hujjatlashtiring.",
      acceptanceCriteria: [
        "HA uchun replikatsiya variantlarini biladi",
        "Kechiktirilgan replika foydasini tushunadi"
      ],
      prerequisites: [
        "66.14"
      ]
    },
    {
      id: "68.7",
      title: "Multi-Availability-Zone Deployment",
      description: [
        "Availability Zone — bir region ichidagi mustaqil data markaz (alohida quvvat, sovutish, tarmoq). Multi-AZ deploy: app instance'lar, DB standby, kesh replika'lari bir nechta AZ'da — bitta AZ to'liq ishdan chiqsa ham xizmat davom etadi. Bulutda HA'ning standart minimal darajasi.",
        "",
        "Masalalar: AZ'lararo trafik narxi va kechikishi (kichik, lekin bor), har AZ'da yetarli sig'im (bitta AZ yo'qolsa qolganlari yuklamani ko'tarishi — N+1 AZ darajasida), stateful komponentlar (DB, Redis) uchun replikatsiya. Multi-region — keyingi daraja (qimmatroq va murakkabroq).",
        "",
        "```text",
        "3 AZ, har birida 2 app instance (jami 6, 4 tasi yetarli)",
        "AZ-b yo'qoldi → 4 instance qoladi → to'liq sig'im ✅",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Ilova infratuzilmasini 2–3 AZ bo'ylab taqsimlash rejasini sig'im hisobi bilan tuzing.",
      acceptanceCriteria: [
        "AZ tushunchasi va multi-AZ foydasini biladi",
        "AZ darajasida N+1 sig'imni hisoblaydi"
      ],
      prerequisites: [
        "70.3"
      ]
    },
    {
      id: "68.8",
      title: "Service Recovery",
      description: [
        "Servisni tiklash — nosozlikdan keyin normal holatga qaytish tezligi (MTTR): avtomatik qayta ishga tushirish (systemd, Supervisor, K8s), self-healing (nosoz instance'ni almashtirish — ASG), avtomatik rollback (deploy'dan keyin xatolar oshsa), runbook'lar (qo'lda tiklash qadamlari), tayyor buyruqlar va skriptlar.",
        "",
        "Tiklashdan keyin: navbatdagi ishlarni qayta ishlash (backlog), ma'lumot izchilligini tekshirish (reconciliation), kesh isitish, ta'sirlangan foydalanuvchilarni aniqlash. MTTR'ni kamaytirish ko'pincha MTBF'ni oshirishdan arzonroq.",
        "",
        "```ini",
        "[program:laravel-worker]",
        "autorestart=true",
        "startretries=10",
        "```",
        "```bash",
        "# Runbook: Redis qayta ishga tushgandan keyin",
        "php artisan horizon:terminate && php artisan cache:warm && php artisan queue:retry --queue=critical",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Asosiy servislar uchun avtomatik tiklash mexanizmlarini va qo'lda tiklash runbook'larini tayyorlang.",
      acceptanceCriteria: [
        "MTTR'ni kamaytirish usullarini biladi",
        "Tiklashdan keyingi qadamlarni rejalashtiradi"
      ],
      prerequisites: [
        "80.9"
      ]
    },
    {
      id: "68.9",
      title: "Graceful Degradation",
      description: [
        "Graceful degradation — qism ishdan chiqqanda tizim to'liq to'xtamasdan, kamaytirilgan funksionallik bilan ishlashi: tavsiyalar servisi yo'q — sahifa tavsiyalarsiz; qidiruv yo'q — oddiy filtr; to'lov provayderi yo'q — muqobil provayder yoki \"keyinroq to'lash\"; kesh yo'q — sekinroq, lekin ishlaydi; analitika yo'q — jim o'tkazib yuborish.",
        "",
        "Amalga oshirish: bog'liqliklarni kritik va ixtiyoriyga ajratish, timeout + fallback, circuit breaker, feature flag'lar (og'ir funksiyalarni yuklamada o'chirish — \"kill switch\"), foydalanuvchiga tushunarli xabar.",
        "",
        "```php",
        "$recommendations = rescue(",
        "    fn () => $this->recommender->for($user, timeout: 0.3),",
        "    rescue: [],            // xatoda bo'sh ro'yxat — sahifa ochiladi",
        "    report: true,",
        ");",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Sahifaning ixtiyoriy bog'liqliklari uchun fallback va kill switch'larni qo'shib, ularning ishdan chiqishini simulyatsiya qiling.",
      acceptanceCriteria: [
        "Graceful degradation tamoyilini biladi",
        "Kritik va ixtiyoriy bog'liqliklarni ajratadi"
      ],
      prerequisites: [
        "65.18"
      ]
    },
    {
      id: "68.10",
      title: "Retry Policies",
      description: [
        "HA kontekstida retry'lar qisqa nosozliklarni (failover, tarmoq uzilishi, deadlock) foydalanuvchiga sezdirmasdan yengish imkonini beradi. Qoidalar: faqat vaqtinchalik xatolar va idempotent operatsiyalar, eksponensial backoff + jitter, cheklangan urinishlar va umumiy vaqt, retry budget (ortiqcha yuklamada retry'lar vaziyatni yomonlashtirmasligi uchun).",
        "",
        "Qatlamlar: HTTP client'lar, DB ulanishlari va tranzaksiyalar (`DB::transaction(..., attempts: 3)`), job'lar (`tries`, `backoff`), mijoz tomonida. Bir nechta qatlamda retry — ko'paytma (3 × 3 × 3 = 27 urinish) — ehtiyot.",
        "",
        "```php",
        "retry(3, fn () => $this->gateway->status($paymentId), fn (int $attempt) => 100 * (2 ** $attempt) + random_int(0, 100),",
        "    fn (Throwable $e) => $e instanceof ConnectionException);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Tizimdagi retry siyosatlarini qatlamlar bo'yicha audit qilib, ko'paytma retry'larni bartaraf eting.",
      acceptanceCriteria: [
        "HA uchun retry qoidalarini biladi",
        "Ko'p qatlamli retry ko'paytmasidan qochadi"
      ],
      prerequisites: [
        "65.14"
      ]
    },
    {
      id: "68.11",
      title: "Circuit Breakers",
      description: [
        "HA'da circuit breaker — nosoz bog'liqlikka murojaatni to'xtatib, (1) chaqiruvchi resurslarini (worker'lar, ulanishlar) himoya qiladi, (2) nosoz servisga tiklanish uchun vaqt beradi, (3) tez fallback'ni ta'minlaydi. Usiz — sekin yoki ishlamayotgan bog'liqlik barcha FPM worker'larini band qilib, butun ilovani to'xtatadi (kaskad nosozlik).",
        "",
        "Holat umumiy (Redis) bo'lishi kerak — barcha instance'lar bir xil qaror qabul qilishi uchun. Metrikalar: breaker holati o'zgarishlari — alert manbai.",
        "",
        "```text",
        "Billing servisi sekinlashdi (p99 10 s) → 5 s timeout + breaker open (30 s)",
        "→ Checkout: \"to'lov keyinroq\" oqimi, FPM worker'lar band bo'lmaydi → qolgan sayt ishlaydi",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Kritik tashqi bog'liqlik uchun circuit breaker'ni metrikalar bilan joriy qilib, kaskad nosozlik stsenariysida sinang.",
      acceptanceCriteria: [
        "Circuit breaker'ning kaskad nosozlikka qarshi rolini biladi",
        "Holatni instance'lar orasida umumiy saqlaydi"
      ],
      prerequisites: [
        "65.13"
      ]
    },
    {
      id: "68.12",
      title: "Disaster Recovery",
      description: [
        "Disaster recovery (DR) — katta falokatdan (region yo'qolishi, ma'lumot buzilishi, ransomware, inson xatosi — production DB'ni o'chirish) tiklanish rejasi. Strategiyalar (narx va RTO bo'yicha): **backup & restore** (arzon, soatlar), **pilot light** (minimal infratuzilma boshqa regionda, kerak bo'lganda kengaytiriladi), **warm standby** (kichik o'lchamdagi to'liq nusxa), **multi-site aktiv-aktiv** (qimmat, deyarli nol RTO).",
        "",
        "DR rejasi: RTO/RPO maqsadlari, mas'ullar, qadamlar (runbook), aloqa rejasi, muntazam DR mashqlari (rejasiz sinalmagan DR — ishlamaydi).",
        "",
        "```text",
        "Strategiya: backup & restore + IaC",
        "RPO: 15 daq (PITR, WAL arxivi boshqa regionga)",
        "RTO: 4 soat (Terraform bilan infratuzilma + DB restore + DNS almashtirish)",
        "Mashq: har chorakda",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Tizim uchun DR strategiyasi, RTO/RPO va runbook yozib, staging'da DR mashqini o'tkazing.",
      acceptanceCriteria: [
        "DR strategiyalari va narxini biladi",
        "DR'ni muntazam mashq bilan tasdiqlaydi"
      ],
      prerequisites: [
        "68.14",
        "68.15"
      ]
    },
    {
      id: "68.13",
      title: "Backup Validation",
      description: [
        "Backup — faqat tiklash muvaffaqiyatli bo'lsa qimmatli. Validatsiya: avtomatik restore testlari (backup'ni alohida muhitga tiklash, sxema va ma'lumot sonini tekshirish, ilova testlari), backup'lar to'liqligi va yaxlitligi (checksum), shifrlash kalitlari mavjudligi (kalit yo'qolsa — backup foydasiz), restore vaqtini o'lchash (RTO'ga mosmi?), backup monitoringi (muvaffaqiyatsiz yoki o'tkazib yuborilgan backup — alert).",
        "",
        "\"Schrödinger backup'i\": tekshirilmagan backup ham ishlaydi, ham ishlamaydi — tiklashga urinmaguncha bilib bo'lmaydi.",
        "",
        "```bash",
        "# Haftalik avtomatik restore testi",
        "pg_restore -d restore_test latest.dump && psql restore_test -c \"SELECT count(*) FROM orders WHERE created_at > now() - interval '2 days';\"",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Haftalik avtomatik restore testini sozlab, tiklash vaqtini va natija to'g'riligini monitoringga qo'shing.",
      acceptanceCriteria: [
        "Backup validatsiyasining ahamiyatini biladi",
        "Restore testini avtomatlashtiradi"
      ],
      prerequisites: [
        "39.13"
      ]
    },
    {
      id: "68.14",
      title: "Recovery Time Objective (RTO)",
      description: [
        "RTO — nosozlikdan keyin xizmatni tiklash uchun maksimal ruxsat etilgan vaqt (\"2 soat ichida ishlashi kerak\"). U biznes ta'siridan kelib chiqadi (uzilish soatiga yo'qotish, shartnoma majburiyatlari) va arxitektura va DR strategiyasini belgilaydi: RTO qanchalik qisqa — shunchalik qimmat yechim (avtomatik failover, warm standby, multi-region).",
        "",
        "Haqiqiy RTO = aniqlash + qaror + tiklash + tekshirish vaqti — mashqlarda o'lchanadi. Turli funksiyalar uchun turli RTO (to'lov — daqiqalar, hisobotlar — soatlar).",
        "",
        "```text",
        "To'lovlar API:   RTO 15 daq  → multi-AZ, avtomatik failover",
        "Admin panel:     RTO 4 soat  → backup & restore yetarli",
        "Hisobot tizimi:  RTO 24 soat",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Tizim funksiyalari uchun biznes bilan RTO'larni kelishib, joriy arxitektura ularga mosligini baholang.",
      acceptanceCriteria: [
        "RTO tushunchasini va arxitekturaga ta'sirini biladi",
        "Haqiqiy RTO'ni mashqlarda o'lchaydi"
      ],
      prerequisites: [
        "68.12"
      ]
    },
    {
      id: "68.15",
      title: "Recovery Point Objective (RPO)",
      description: [
        "RPO — nosozlikda yo'qotilishi mumkin bo'lgan maksimal ma'lumot (vaqt bo'yicha): \"oxirgi 5 daqiqadagi ma'lumot yo'qolishi qabul qilinadi\". U backup chastotasi va replikatsiya turini belgilaydi: kunlik backup — RPO 24 soat; WAL/binlog arxivi + PITR — daqiqalar; sinxron replikatsiya — ~0.",
        "",
        "Ma'lumot turlari uchun turli RPO: moliyaviy tranzaksiyalar — 0 ga yaqin; log'lar va analitika — soatlar. Tashqi tizimlarda qayta tiklanadigan ma'lumot (to'lov provayderidan qayta olish) RPO talabini yumshatishi mumkin.",
        "",
        "```text",
        "Kunlik pg_dump                 → RPO ≤ 24 soat",
        "+ WAL arxivi (har 1 daq)      → RPO ≤ 1 daq (PITR)",
        "+ Sinxron standby             → RPO ≈ 0 (bitta AZ nosozligida)",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Ma'lumot turlari uchun RPO'larni belgilab, backup va replikatsiya sozlamalari ularni qondirishini tekshiring.",
      acceptanceCriteria: [
        "RPO tushunchasini va texnik vositalarga bog'liqligini biladi",
        "Ma'lumot turi bo'yicha RPO'ni farqlaydi"
      ],
      prerequisites: [
        "68.14"
      ]
    },
    {
      id: "68.16",
      title: "Uptime Measurement",
      description: [
        "Uptime o'lchash: tashqi sintetik monitoring (bir necha joydan har daqiqada asosiy endpoint'larni tekshirish — UptimeRobot, Pingdom, Better Stack, Grafana synthetic), ichki SLI (muvaffaqiyatli so'rovlar ulushi — foydalanuvchi tajribasiga yaqinroq), status sahifa (foydalanuvchilarga ochiq ma'lumot).",
        "",
        "\"Mavjudlik\" ta'rifi muhim: faqat bosh sahifa ochilishimi yoki asosiy oqimlar (login, checkout) ishlashimi? Rejali texnik ishlar hisobga olinadimi? SLO va SLA hisoboti shu ta'rifga tayanadi.",
        "",
        "```text",
        "SLI: muvaffaqiyatli (non-5xx, < 2 s) /api so'rovlar ulushi, 30 kun",
        "Sintetik: /up, /login, /api/products — 3 joydan har 60 s",
        "Natija (iyun): 99.94% (SLO 99.9% ✅), insidentlar: 2 (jami 26 daq)",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Tashqi sintetik monitoring va SLI asosidagi oylik mavjudlik hisobotini sozlang.",
      acceptanceCriteria: [
        "Sintetik va SLI asosidagi o'lchash farqini biladi",
        "Mavjudlik ta'rifini aniq belgilaydi"
      ],
      prerequisites: [
        "58.21"
      ]
    },
    {
      id: "68.17",
      title: "Incident Response",
      description: [
        "Insidentga javob jarayoni: aniqlash (alert, foydalanuvchi xabari) → triage (jiddiylik darajasi — SEV1/2/3) → rollar (incident commander, aloqa uchun mas'ul, texnik ijrochilar) → yumshatish (birinchi navbatda ta'sirni to'xtatish — rollback, feature flag, failover; sababni keyin) → aloqa (status sahifa, ichki kanal, mijozlar) → tiklash → post-mortem (aybsiz, harakatlar bilan).",
        "",
        "Tayyorgarlik: navbatchilik jadvali (on-call), eskalatsiya yo'llari, runbook'lar, insident shablonlari, mashqlar.",
        "",
        "```text",
        "SEV1: checkout ishlamaydi — 5 daqiqada javob, IC tayinlanadi, har 15 daqiqada status yangilanishi",
        "14:05 alert → 14:07 IC → 14:10 deploy rollback → 14:14 tiklandi → 2 kun ichida post-mortem",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Jamoa uchun insident jarayoni hujjatini (jiddiylik darajalari, rollar, aloqa) va post-mortem shablonini yozing.",
      acceptanceCriteria: [
        "Insidentga javob bosqichlari va rollarini biladi",
        "Avval yumshatish, keyin sabab tamoyiliga amal qiladi"
      ],
      prerequisites: [
        "84.11"
      ]
    },
    {
      id: "68.18",
      title: "Availability vs Consistency Trade-offs",
      description: [
        "CAP teoremasi: tarmoq bo'linishi (P) bo'lganda tizim izchillik (C — barcha tugunlar bir xil ma'lumot) yoki mavjudlik (A — har so'rovga javob) dan birini tanlashi kerak. PACELC: bo'linish bo'lmaganda ham kechikish (L) va izchillik (C) o'rtasida tanlov.",
        "",
        "Amalda: moliyaviy operatsiyalar — izchillik (bo'linishda rad etish yaxshiroq); katalog, lenta, statistika — mavjudlik (eski ma'lumot bilan javob berish). Bitta tizim ichida turli komponentlar turli tanlov qiladi. Asinxron replikatsiyali failover — mavjudlik foydasiga (ozgina ma'lumot yo'qolishi mumkin); sinxron — izchillik foydasiga.",
        "",
        "```text",
        "Hisob balansi:   CP — bo'linishda yozishni rad etish, ikki marta sarflanmasin",
        "Mahsulot katalogi: AP — keshdan eski narx bilan ko'rsatish, checkout'da tekshirish",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Tizim komponentlari uchun CAP/PACELC tanlovini jadvalda asoslab, failover sozlamalariga bog'lang.",
      acceptanceCriteria: [
        "CAP va PACELC'ni amaliy tushuntira oladi",
        "Komponentlar bo'yicha turli tanlov qiladi"
      ],
      prerequisites: [
        "66.15"
      ]
    }
  ]
});
