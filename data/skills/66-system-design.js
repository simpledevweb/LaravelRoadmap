/* 66 · System Design
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 66,
  slug: "system-design",
  title: "System Design",
  group: "architecture",
  description: "System design — katta va ishonchli tizimlarni loyihalash ko'nikmasi: talablarni aniqlash, yuklamani baholash, komponentlarni tanlash (DB, kesh, navbat, load balancer), masshtablash, ishonchlilik va murosalarni asoslash. Bu Senior suhbatlarining va real arxitektura ishining markaziy qismi. Senior dasturchi tizimni raqamlar va murosalar bilan loyihalaydi va nosozlik stsenariylarini oldindan o'ylaydi.",
  subskills: [
    {
      id: "66.1",
      title: "Functional Requirements",
      description: [
        "Funksional talablar — tizim **nima** qiladi: asosiy foydalanuvchi stsenariylari (use case'lar), aktorlar, kirish va chiqishlar, biznes qoidalari. System design'da birinchi qadam — talablarni aniqlashtirish va doirani cheklash: \"URL qisqartiruvchi\" — yaratish, yo'naltirish, maxsus taxallus, muddat, statistika? Qaysilari MVP'da?",
        "",
        "Natija: aniq va kichik asosiy funksiyalar ro'yxati (3–5 ta), qolganlari — keyinroq. Noaniq talablar bilan loyihalash — noto'g'ri tizim.",
        "",
        "```text",
        "URL shortener — funksional:",
        "1. Foydalanuvchi uzun URL'dan qisqa havola yaratadi",
        "2. Qisqa havola bo'yicha o'tish → 301/302 yo'naltirish",
        "3. (ixtiyoriy) Maxsus taxallus, muddat",
        "4. (keyin) Bosishlar statistikasi",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Tanlangan tizim (masalan, taksi buyurtma) uchun funksional talablarni MVP va keyingi bosqichlarga ajrating.",
      acceptanceCriteria: [
        "Funksional talablarni aniqlashtiradi",
        "Doirani MVP'ga cheklaydi"
      ],
      prerequisites: [
        "81.2"
      ]
    },
    {
      id: "66.2",
      title: "Non-Functional Requirements",
      description: [
        "Nofunksional talablar — tizim **qanday** ishlaydi: masshtab (foydalanuvchilar, so'rovlar), kechikish (p95), mavjudlik (99.9%), izchillik (kuchli yoki eventual), chidamlilik (ma'lumot yo'qolmasligi), xavfsizlik, narx, compliance. Ular arxitekturani funksiyalardan ko'ra ko'proq belgilaydi.",
        "",
        "Raqamlar bilan: \"yuqori yuklama\" emas — \"10M DAU, 1000 RPS o'rtacha, 5000 RPS cho'qqi, yozish:o'qish = 1:100, yo'naltirish p99 < 50 ms, 99.99% mavjudlik\". Talablar o'rtasidagi ziddiyatlar (izchillik vs mavjudlik) — ustuvorlik.",
        "",
        "```text",
        "URL shortener — nofunksional:",
        "- 100M yangi URL/oy, o'qish:yozish = 100:1",
        "- Yo'naltirish p99 < 50 ms",
        "- Mavjudlik 99.99% (yo'naltirish), 99.9% (yaratish)",
        "- Qisqa kodlar taxmin qilinmasligi kerak",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Tizim uchun nofunksional talablarni raqamlar bilan yozing va ular orasidagi ziddiyatlarni aniqlang.",
      acceptanceCriteria: [
        "Nofunksional talablarni o'lchanadigan qilib yozadi",
        "Talablar ziddiyatini aniqlaydi"
      ],
      prerequisites: [
        "61.18"
      ]
    },
    {
      id: "66.3",
      title: "Capacity Estimation",
      description: [
        "Sig'imni baholash (back-of-the-envelope) — talab qilinadigan resurslarni taxminan hisoblash: so'rovlar soni (RPS), saqlash hajmi, tarmoq o'tkazuvchanligi, xotira (kesh), serverlar soni. Aniqlik emas, tartib (10x farqni ko'rish) muhim — dizayn qarorlarini asoslash uchun.",
        "",
        "Foydali raqamlar: 1 kunda ~86 400 s (~10⁵); 1M so'rov/kun ≈ 12 RPS; RAM'dan o'qish ~100 ns, SSD ~100 µs, tarmoq ichida ~0.5 ms, kontinentlararo ~150 ms; bitta Laravel FPM server ~ yuzlab RPS (ish turiga qarab).",
        "",
        "```text",
        "100M URL/oy → ~40 yozish/s; o'qish 100x → ~4000 RPS (cho'qqi ~10k)",
        "Saqlash: 100M × 500 B ≈ 50 GB/oy → 5 yilda ~3 TB",
        "Kesh: eng issiq 20% URL ≈ 20M × 500 B ≈ 10 GB RAM",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Tanlangan tizim uchun RPS, saqlash, kesh va serverlar sonini back-of-the-envelope hisoblang.",
      acceptanceCriteria: [
        "Asosiy kechikish va o'lcham raqamlarini biladi",
        "Taxminiy hisob bilan dizaynni asoslaydi"
      ],
      prerequisites: [
        "66.2"
      ]
    },
    {
      id: "66.4",
      title: "Traffic Estimation",
      description: [
        "Trafikni baholash: DAU/MAU, foydalanuvchi boshiga amallar soni, o'rtacha va cho'qqi RPS (cho'qqi ko'pincha o'rtachadan 2–10x — kun vaqti, aksiyalar, mavsumiylik), o'qish va yozish nisbati, so'rov va javob hajmi (tarmoq o'tkazuvchanligi), geografik taqsimot.",
        "",
        "Bu raqamlar: qancha app server, kesh kerakmi, DB replika'lar, CDN, navbat (yozish portlashlarini tekislash) qarorlarini belgilaydi. Kelajakdagi o'sish (12–24 oy) ham hisobga olinadi.",
        "",
        "```text",
        "DAU 2M, har biri kuniga 20 so'rov → 40M so'rov/kun ≈ 460 RPS o'rtacha",
        "Cho'qqi (kechqurun 3x, aksiya 5x) → ~7000 RPS",
        "Javob 5 KB → cho'qqida ~35 MB/s chiquvchi trafik",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Real yoki gipotetik mahsulot uchun o'rtacha va cho'qqi trafikni hisoblab, server soni qarorini asoslang.",
      acceptanceCriteria: [
        "O'rtacha va cho'qqi trafikni hisoblaydi",
        "Trafikni infratuzilma qarorlariga bog'laydi"
      ],
      prerequisites: [
        "66.3"
      ]
    },
    {
      id: "66.5",
      title: "Data Volume Estimation",
      description: [
        "Ma'lumot hajmini baholash: obyekt o'lchami (qator + indekslar — indekslar ma'lumotning 30–100% i bo'lishi mumkin), yaratilish tezligi, saqlash muddati, replikatsiya va backup ko'paytmalari, o'sish sur'ati. Natija: bitta DB yetadimi, partitioning yoki sharding qachon kerak, arxivlash siyosati, saqlash narxi.",
        "",
        "Turli ma'lumotlar uchun turli saqlash: issiq (tez-tez o'qiladigan — DB, kesh), iliq, sovuq (arxiv — S3 Glacier), log va event'lar (vaqt bo'yicha partitsiyalangan, muddatli).",
        "",
        "```text",
        "Buyurtmalar: 50k/kun × 2 KB (qator + indeks) ≈ 100 MB/kun ≈ 36 GB/yil → bitta PostgreSQL yetarli",
        "Event log: 5M/kun × 1 KB ≈ 5 GB/kun → oylik partition + 90 kundan keyin S3 arxiv",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Asosiy jadvallar uchun 3 yillik ma'lumot hajmini baholab, partitioning va arxivlash qarorlarini yozing.",
      acceptanceCriteria: [
        "Indeks va replikatsiyani hisobga olib hajmni baholaydi",
        "Hajmga qarab saqlash strategiyasini tanlaydi"
      ],
      prerequisites: [
        "66.3"
      ]
    },
    {
      id: "66.6",
      title: "API Design",
      description: [
        "System design'dagi API dizayni: asosiy endpoint'lar va ularning shartnomalari (so'rov, javob, xatolar), autentifikatsiya, pagination (katta ro'yxatlar uchun cursor), idempotentlik (yaratish/to'lov), rate limiting, versiyalash. API — tizim chegarasi va boshqa komponentlarni loyihalash uchun boshlang'ich nuqta.",
        "",
        "Sinxron va asinxron: uzoq amallar uchun `202 Accepted` + holat endpoint'i yoki webhook. Yuqori yuklamali o'qish endpoint'lari keshlanadigan (HTTP kesh, CDN).",
        "",
        "```text",
        "POST /v1/urls            {long_url, alias?, expires_at?}  → 201 {short_url}   (Idempotency-Key)",
        "GET  /{code}             → 301/302 Location: long_url      (CDN/kesh)",
        "GET  /v1/urls/{code}/stats?cursor=…                        (auth)",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Tanlangan tizim uchun asosiy API endpoint'larini idempotentlik, pagination va keshlash bilan loyihalang.",
      acceptanceCriteria: [
        "System design kontekstida API'ni loyihalaydi",
        "Uzoq amallar uchun asinxron shartnomani qo'llaydi"
      ],
      prerequisites: [
        "19.1"
      ]
    },
    {
      id: "66.7",
      title: "Database Schema Design",
      description: [
        "Tizim uchun sxema: asosiy entity'lar va munosabatlar, kirish naqshlariga mos indekslar (asosiy so'rovlardan kelib chiqib), relyatsion yoki NoSQL tanlovi (tranzaksiyalar va munosabatlar — relyatsion; juda katta hajm va oddiy kalit-qiymat kirish — key-value/wide-column), denormalizatsiya (o'qish tezligi uchun), partition/shard kaliti (kelajakdagi masshtab uchun).",
        "",
        "Asosiy so'rovlarni avval yozing — sxema ularga xizmat qilishi kerak.",
        "",
        "```text",
        "urls(code PK, long_url, user_id, created_at, expires_at)   -- asosiy so'rov: WHERE code = ?",
        "INDEX (user_id, created_at)                                 -- foydalanuvchi ro'yxati",
        "clicks — yuqori yozish → alohida event log/OLAP (ClickHouse), urls'da emas",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Tizim uchun sxemani asosiy so'rovlardan kelib chiqib loyihalang va indekslarni asoslang.",
      acceptanceCriteria: [
        "Sxemani kirish naqshlaridan kelib chiqib loyihalaydi",
        "Relyatsion va NoSQL tanlovini asoslaydi"
      ],
      prerequisites: [
        "14.1"
      ]
    },
    {
      id: "66.8",
      title: "Caching",
      description: [
        "System design'da kesh: qayerda (mijoz, CDN, reverse proxy, ilova — Redis, DB buffer), nima (issiq, kam o'zgaradigan, qimmat hisoblanadigan ma'lumot), qanday (cache-aside, write-through), invalidatsiya (TTL, event asosida), hajm (issiq to'plamni hisoblash), eviction (LRU/LFU), stampede va avalanche himoyasi.",
        "",
        "O'qish og'ir tizimlarda kesh — eng katta yutuq (DB yuklamasini 90%+ kamaytirish). Kesh nosozligi stsenariysi: kesh yo'q bo'lsa DB bardosh bera oladimi?",
        "",
        "```text",
        "Yo'naltirish: CDN (mashhur kodlar) → Redis (code → url, TTL 24 soat) → DB (miss)",
        "Hit ratio maqsadi 95%+ → DB faqat ~200 RPS (10k RPS'dan)",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Tizim uchun ko'p qatlamli kesh strategiyasini loyihalab, hit ratio va DB yuklamasini hisoblang.",
      acceptanceCriteria: [
        "Kesh qatlamlari va strategiyalarini biladi",
        "Kesh nosozligi stsenariysini hisobga oladi"
      ],
      prerequisites: [
        "54.1"
      ]
    },
    {
      id: "66.9",
      title: "Load Balancing",
      description: [
        "Load balancer — trafikni bir nechta serverga taqsimlaydi va nosoz serverlarni chiqaradi: L4 (TCP — tez) va L7 (HTTP — marshrutlash, TLS, header'lar), algoritmlar (round-robin, least connections, hash/sticky), health check'lar, TLS terminatsiya, bir nechta darajada (DNS/global → regional → servis ichida).",
        "",
        "Shart: app serverlar stateless (session va fayllar umumiy joyda). Load balancer o'zi yagona nosozlik nuqtasi bo'lmasligi kerak (boshqariladigan LB yoki HA juftlik).",
        "",
        "```text",
        "Mijoz → DNS (GeoDNS) → CDN → L7 LB (TLS, /api → API pool, /ws → WS pool)",
        "     → App serverlar (stateless, autoscaling) → Redis, DB",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Tizim uchun load balancing qatlamlarini, algoritmlarini va health check'larini loyihalang.",
      acceptanceCriteria: [
        "L4 va L7 farqini biladi",
        "Stateless talabi va LB yuqori mavjudligini hisobga oladi"
      ],
      prerequisites: [
        "41.14"
      ]
    },
    {
      id: "66.10",
      title: "Horizontal vs Vertical Scaling",
      description: [
        "**Vertikal** — bitta serverni kuchaytirish (CPU, RAM): sodda, kod o'zgarmaydi, lekin chegarasi bor, qimmatlashadi va SPOF qoladi. **Gorizontal** — serverlar sonini oshirish: deyarli cheksiz, chidamli, lekin stateless dizayn, load balancing, taqsimlangan ma'lumot muammolarini talab qiladi.",
        "",
        "Odatiy strategiya: app qatlami — gorizontal (stateless Laravel serverlar); DB — avval vertikal + read replika'lar, juda katta masshtabda partitioning/sharding; kesh — klaster. Vertikal masshtablash boshlanishda ko'pincha eng arzon va tez yechim.",
        "",
        "```text",
        "App:   2 → 20 server (gorizontal, autoscaling)",
        "DB:    8 vCPU → 32 vCPU (vertikal) + 3 read replika",
        "Redis: bitta → klaster (kesh hajmi 100 GB+)",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Tizimning har qatlami uchun masshtablash strategiyasini (vertikal/gorizontal) asoslab yozing.",
      acceptanceCriteria: [
        "Ikki masshtablash turining murosalarini biladi",
        "Qatlam bo'yicha mos strategiya tanlaydi"
      ],
      prerequisites: [
        "67.1"
      ]
    },
    {
      id: "66.11",
      title: "Queues",
      description: [
        "Navbatlar system design'da: sinxron yo'ldan sekin ishlarni olib tashlash (javob tezligi), yuklama cho'qqilarini tekislash (buffer — iste'molchilar o'z tezligida), komponentlarni ajratish, ishonchli qayta urinish, fan-out (bir event — ko'p iste'molchi). Tanlov: Redis (oddiy, tez), RabbitMQ (marshrutlash, ishonchlilik), Kafka (katta oqim, replay, tartib partitsiya ichida), SQS (boshqariladigan).",
        "",
        "Dizayn savollari: yetkazish kafolati, tartib, idempotentlik, backlog monitoringi va iste'molchilarni masshtablash, DLQ.",
        "",
        "```text",
        "Bosish statistikasi: yo'naltirish → event (Kafka, 10k/s) → iste'molchilar (agregatsiya, 1 daq oyna)",
        "→ ClickHouse. Yo'naltirish yo'li statistika yozuvini kutmaydi.",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Tizimdagi navbatga ko'chiriladigan oqimlarni aniqlab, broker tanlovini va iste'molchi masshtablashini loyihalang.",
      acceptanceCriteria: [
        "Navbatlarning system design'dagi rolini biladi",
        "Broker'ni talablarga qarab tanlaydi"
      ],
      prerequisites: [
        "46.1"
      ]
    },
    {
      id: "66.12",
      title: "Asynchronous Processing",
      description: [
        "Asinxron qayta ishlash naqshlari: fon job'lari (email, hisobot), event-driven reaksiyalar, batch processing (tungi agregatsiyalar), stream processing (real vaqt metrikalari), uzoq ishlar uchun `202` + holat polling/webhook/WebSocket, CQRS proyeksiyalari (o'qish modellarini asinxron yangilash).",
        "",
        "Murosalar: tez javob va chidamlilik evaziga — eventual consistency, murakkab xato boshqaruvi va kuzatuvchanlik. Foydalanuvchiga holatni ko'rsatish (progress, bildirishnoma).",
        "",
        "```text",
        "Hisobot so'rovi: POST /reports → 202 {job_id} → worker (5 daq) → S3 → bildirishnoma + GET /reports/{id}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Tizimdagi bitta uzoq jarayonni asinxron naqsh bilan loyihalab, foydalanuvchi tajribasini tasvirlang.",
      acceptanceCriteria: [
        "Asinxron qayta ishlash naqshlarini biladi",
        "Asinxronlikning UX va izchillik narxini hisobga oladi"
      ],
      prerequisites: [
        "19.17"
      ]
    },
    {
      id: "66.13",
      title: "Data Partitioning",
      description: [
        "Partitioning (sharding) — ma'lumotni bir nechta qism/serverga bo'lish: **range** (sana, ID diapazoni — oddiy, lekin \"issiq\" oxirgi qism), **hash** (kalit hash'i — teng taqsimot, lekin diapazon so'rovlari qiyin), **directory/lookup** (moslashuvchan), **geografik/tenant** bo'yicha. Partition kaliti — eng muhim qaror: asosiy so'rovlar bitta partitsiyaga tushishi va yuklama teng taqsimlanishi kerak.",
        "",
        "Muammolar: partitsiyalararo so'rovlar va JOIN'lar, qayta taqsimlash (resharding — consistent hashing yordam beradi), issiq kalitlar. Avval: indekslar, replika'lar, vertikal masshtab, DB ichidagi partitioning — sharding oxirgi chora.",
        "",
        "```text",
        "urls: hash(code) mod 16 → 16 shard (yo'naltirish so'rovi doim bitta shard'ga)",
        "orders (multi-tenant SaaS): tenant_id bo'yicha → katta tenantlar alohida shard'da",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Tizimdagi eng katta jadval uchun partition kalitini tanlab, so'rov naqshlari va issiq kalit xavfini tahlil qiling.",
      acceptanceCriteria: [
        "Partitioning strategiyalarini biladi",
        "Partition kalitini so'rovlardan kelib chiqib tanlaydi"
      ],
      prerequisites: [
        "15.17"
      ]
    },
    {
      id: "66.14",
      title: "Replication",
      description: [
        "Replikatsiya — ma'lumot nusxalari bir nechta tugunda: o'qishni masshtablash (read replika'lar), mavjudlik (failover), geografik yaqinlik, backup. Modellar: **leader–follower** (bitta yozuvchi — eng keng tarqalgan), **multi-leader** (bir nechta yozuvchi — konfliktlarni hal qilish kerak), **leaderless** (kvorum — Cassandra, Dynamo).",
        "",
        "Sinxron (izchil, sekinroq, follower nosozligi yozishni to'xtatadi) va asinxron (tez, lekin lag va failover'da ma'lumot yo'qolishi mumkin). Lag oqibatlari: read-your-writes, monotonic reads muammolari.",
        "",
        "```text",
        "Primary (yozish) ──async──▶ Replica A (o'qish, region 1)",
        "                 ──async──▶ Replica B (o'qish, region 2)",
        "                 ──semi-sync──▶ Standby (failover, RPO≈0)",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Tizim uchun replikatsiya topologiyasini loyihalab, lag va failover stsenariylarini tavsiflang.",
      acceptanceCriteria: [
        "Replikatsiya modellari va sinxronlik murosasini biladi",
        "Replication lag oqibatlarini hisobga oladi"
      ],
      prerequisites: [
        "10.16"
      ]
    },
    {
      id: "66.15",
      title: "Consistency Models",
      description: [
        "Izchillik modellari: **kuchli (linearizability)** — har o'qish so'nggi yozuvni ko'radi (qimmat, bitta lider yoki konsensus); **sequential/causal** — sabab-oqibat tartibi saqlanadi; **read-your-writes** — foydalanuvchi o'z yozganini ko'radi; **monotonic reads** — eski holatga \"orqaga qaytish\" yo'q; **eventual** — vaqt o'tib izchil.",
        "",
        "Turli ma'lumotlar uchun turli model: balans va zaxira — kuchli; ijtimoiy lenta, like soni, statistika — eventual; profil — read-your-writes yetarli. Kuchli izchillik kerak bo'lgan joylarni minimallashtirish — masshtab va mavjudlik kaliti.",
        "",
        "```text",
        "Bank balansi:     kuchli (bitta lider, tranzaksiya)",
        "Buyurtma holati:  read-your-writes (yozgandan keyin primary'dan o'qish)",
        "Mahsulot ko'rishlari soni: eventual (write-behind hisoblagich)",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Tizimdagi har ma'lumot turi uchun kerakli izchillik modelini belgilang va asoslang.",
      acceptanceCriteria: [
        "Asosiy izchillik modellarini biladi",
        "Ma'lumot turiga mos modelni tanlaydi"
      ],
      prerequisites: [
        "66.14"
      ]
    },
    {
      id: "66.16",
      title: "Availability",
      description: [
        "Mavjudlik — tizim ishlayotgan vaqt ulushi: 99.9% ≈ 8.7 soat/yil to'xtash, 99.99% ≈ 52 daqiqa/yil. Ketma-ket bog'liq komponentlar mavjudligi ko'paytiriladi (3 ta 99.9% → ~99.7%) — har yangi sinxron bog'liqlik mavjudlikni pasaytiradi; parallel (redundant) komponentlar uni oshiradi.",
        "",
        "Oshirish: SPOF'larni yo'qotish (redundancy har qatlamda), avtomatik failover, health check'lar, bir nechta AZ/region, graceful degradation, tez tiklash (MTTR — avtomatik rollback, runbook'lar), mustaqil nosozlik domenlari.",
        "",
        "```text",
        "LB 99.99% × App (3 instance, 1 tasi yetarli) ~99.999% × DB (failover) 99.95% × Redis 99.9%",
        "→ kritik yo'l ≈ 99.84%; Redis'ni yo'ldan olib tashlash (fallback) → ≈ 99.94%",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Tizimning kritik yo'li mavjudligini komponentlar bo'yicha hisoblab, eng zaif bo'g'inni yaxshilash rejasini tuzing.",
      acceptanceCriteria: [
        "Mavjudlik foizlari va ularning hisobini biladi",
        "Ketma-ket va parallel komponentlar ta'sirini tushunadi"
      ],
      prerequisites: [
        "68.1"
      ]
    },
    {
      id: "66.17",
      title: "Fault Tolerance",
      description: [
        "Nosozlikka chidamlilik — komponentlar ishdan chiqqanda ham tizim to'g'ri ishlashda davom etadi. Nosozlik turlari: server/konteyner qulashi, disk, tarmoq bo'linishi va kechikish, DB yoki kesh mavjud emasligi, tashqi API, butun AZ/region, dasturiy xato (yomon deploy), ortiqcha yuklama.",
        "",
        "Vositalar: redundancy va replikatsiya, timeout/retry/circuit breaker, bulkhead, navbatlar (buffer), idempotentlik, checkpoint va qayta boshlash, graceful degradation, avtomatik rollback, chaos testing. Har komponent uchun savol: \"bu ishdan chiqsa nima bo'ladi?\"",
        "",
        "```text",
        "Redis ishdan chiqdi → kesh miss → DB'ga (rate limit bilan himoyalangan), session — DB driver'ga fallback",
        "Billing servisi 503 → buyurtma \"to'lov kutilmoqda\" holatida, retry navbatda",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Tizimning har asosiy komponenti uchun \"ishdan chiqsa nima bo'ladi\" jadvalini va himoya choralarini yozing.",
      acceptanceCriteria: [
        "Nosozlik turlarini biladi",
        "Har komponent uchun himoya strategiyasini loyihalaydi"
      ],
      prerequisites: [
        "65.18"
      ]
    },
    {
      id: "66.18",
      title: "Rate Limiting",
      description: [
        "System design'da rate limiting: tizimni suiiste'mol va ortiqcha yuklamadan himoyalash, adolatli taqsimot, narxni nazorat qilish. Qayerda: edge/CDN va WAF (DDoS, bot'lar), API gateway (mijoz/kalit bo'yicha), servis ichida (resurs-og'ir amallar), tashqi API'larga chiquvchi so'rovlar (provayder limitlari).",
        "",
        "Algoritmlar: token bucket (portlashlarga ruxsat), leaky bucket (tekis oqim), fixed/sliding window. Taqsimlangan limitlar — umumiy holat (Redis) yoki taxminiy lokal limitlar. Javob: `429` + `Retry-After`; load shedding — ortiqcha yuklamada past ustuvorlikli so'rovlarni rad etish.",
        "",
        "```text",
        "Edge: 1000 req/min/IP (bot himoyasi)",
        "API: 100 req/min/API key (tarif bo'yicha)",
        "POST /urls: 10/min/foydalanuvchi (spam)",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Tizim uchun ko'p qatlamli rate limiting dizaynini algoritm va kalitlar bilan yozing.",
      acceptanceCriteria: [
        "Rate limiting qatlamlari va algoritmlarini biladi",
        "Taqsimlangan limitlash muammosini tushunadi"
      ],
      prerequisites: [
        "18.15"
      ]
    },
    {
      id: "66.19",
      title: "Bottleneck Analysis",
      description: [
        "Tor joy tahlili — dizayn bosqichida: har komponentning sig'imi va kutilgan yuklama (qaysi biri birinchi to'yinadi?): DB yozish tezligi, bitta lider, issiq kalit/qator, sinxron tashqi chaqiruvlar, tarmoq o'tkazuvchanligi, bitta navbat iste'molchisi. Ishlab turgan tizimda — metrikalar va load test (USE metodi).",
        "",
        "Tor joy topilgach: keshlash, asinxronlashtirish, partitioning, replika'lar, algoritmni o'zgartirish, batch'lash. Bir tor joyni yo'qotish keyingisini ochadi — iterativ jarayon.",
        "",
        "```text",
        "Hisob: 10k RPS yo'naltirish, har biri DB'ga → bitta PostgreSQL ~5k oddiy so'rov/s → TOR JOY",
        "Yechim: Redis kesh (95% hit) → DB ~500 RPS ✅; keyingi tor joy: Redis tarmog'i (1 Gbps) — tekshirish",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Tizim dizaynida yuklama oshganda birinchi to'yinadigan 3 ta komponentni aniqlab, har biri uchun yechim yozing.",
      acceptanceCriteria: [
        "Dizayn bosqichida tor joylarni hisoblaydi",
        "Tor joylarni iterativ bartaraf etadi"
      ],
      prerequisites: [
        "53.18"
      ]
    },
    {
      id: "66.20",
      title: "Trade-off Evaluation",
      description: [
        "System design — murosalar haqida: izchillik vs mavjudlik (CAP/PACELC), kechikish vs throughput, normallashtirish vs o'qish tezligi, sinxron vs asinxron, monolit vs servislar, qurish vs sotib olish, narx vs performance, soddalik vs moslashuvchanlik. \"To'g'ri javob\" yo'q — talablarga mos javob bor.",
        "",
        "Yaxshi baholash: har variant uchun foyda, narx va xavflar; talablar bilan bog'lash (\"p99 < 50 ms talabi tufayli kesh majburiy\"); qaytariluvchanlik; nima qurbon qilinayotganini ochiq aytish.",
        "",
        "```text",
        "Qisqa kod generatsiyasi:",
        "A) Auto-increment + base62 — sodda, unikal | taxmin qilinadi, markaziy hisoblagich",
        "B) Tasodifiy 7 belgi + to'qnashuv tekshiruvi — taxmin qilinmaydi | to'qnashuvda qayta urinish",
        "C) Oldindan generatsiya qilingan kodlar puli — tez | qo'shimcha servis",
        "Qaror: B (xavfsizlik talabi), to'qnashuv ehtimoli 62⁷≈3.5·10¹² da juda past",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Tizimdagi 3 ta asosiy dizayn qarori uchun variantlar va murosalarni jadvalda yozib, tanlovni asoslang.",
      acceptanceCriteria: [
        "Asosiy system design murosalarini biladi",
        "Qarorni talablarga bog'lab asoslaydi"
      ],
      prerequisites: [
        "61.17"
      ]
    },
    {
      id: "66.21",
      title: "Architecture Diagrams",
      description: [
        "Arxitektura diagrammalari — dizaynni muloqot qilish vositasi: komponentlar (mijozlar, LB, servislar, DB, kesh, navbat, tashqi tizimlar), ma'lumot oqimi (o'qish va yozish yo'llari alohida), sinxron va asinxron aloqalar, chegaralar (ishonch, tarmoq, region). C4 modeli: Context → Container → Component darajalari — auditoriyaga mos tafsilot.",
        "",
        "Vositalar: Mermaid va PlantUML (kod sifatida — git'da versiyalanadi), Excalidraw, draw.io. Yaxshi diagramma: afsona (legend), aniq nomlar, o'qlar yo'nalishi va protokoli, haddan tashqari tafsilotsiz.",
        "",
        "```text",
        "flowchart LR",
        "  U[Mijoz] --> CDN --> LB[Load Balancer]",
        "  LB --> API[Laravel API x N]",
        "  API --> R[(Redis)]",
        "  API --> DB[(PostgreSQL primary)]",
        "  DB -.replika.-> RR[(Read replica)]",
        "  API -- event --> Q[[Queue]] --> W[Worker'lar]",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Tizimingiz uchun C4 Context va Container diagrammalarini Mermaid'da chizib, repozitoriyga qo'shing.",
      acceptanceCriteria: [
        "C4 darajalarini biladi",
        "Diagrammalarni kod sifatida saqlaydi"
      ],
      prerequisites: [
        "80.11"
      ]
    },
    {
      id: "66.22",
      title: "Failure Scenarios",
      description: [
        "Nosozlik stsenariylari — dizaynni \"nima noto'g'ri ketishi mumkin?\" nuqtai nazaridan tekshirish: har komponent ishdan chiqishi, sekinlashishi, tarmoq bo'linishi, ma'lumot buzilishi, ortiqcha yuklama (aksiya kuni), yomon deploy, tashqi provayder nosozligi, region yo'qolishi. Har biri uchun: ta'sir (nima ishlamay qoladi), aniqlash (qaysi alert), yumshatish (avtomatik chora), tiklash (runbook).",
        "",
        "Bu tahlil redundancy, timeout'lar, fallback'lar va monitoringni dizaynga kiritadi; game day va chaos testlar bilan tekshiriladi.",
        "",
        "```text",
        "Stsenariy: PostgreSQL primary yiqildi",
        "Ta'sir: yozishlar to'xtaydi (o'qishlar replikadan ishlaydi)",
        "Aniqlash: health check + \"DB write errors\" alert (30 s)",
        "Yumshatish: Patroni avtomatik failover (≤ 30 s), ilova qayta ulanadi",
        "Tiklash: eski primary'ni replika sifatida qaytarish (runbook #12)",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Tizimning 5 ta asosiy nosozlik stsenariysi uchun ta'sir, aniqlash, yumshatish va tiklash jadvalini yozing.",
      acceptanceCriteria: [
        "Nosozlik stsenariylarini tizimli tahlil qiladi",
        "Har stsenariyni monitoring va runbook bilan bog'laydi"
      ],
      prerequisites: [
        "66.17"
      ]
    },
    {
      id: "66.23",
      title: "Cost Estimation",
      description: [
        "Narxni baholash — dizayn qarorlarining moliyaviy tomoni: compute (serverlar, autoscaling cho'qqilari), saqlash (DB, S3, backup, log'lar — ko'pincha kutilmaganda katta), tarmoq (egress — bulutda qimmat, CDN), boshqariladigan servislar (RDS, ElastiCache), uchinchi tomon (SMS, email, to'lov komissiyalari, monitoring SaaS), litsenziyalar, va inson vaqti (ekspluatatsiya).",
        "",
        "Optimallashtirish: to'g'ri o'lcham (rightsizing), reserved/spot instance'lar, saqlash qatlamlari va muddatlari, kesh va CDN (egress'ni kamaytiradi), arxitekturaning soddaligi. \"Bu yechim oyiga qancha turadi va har foydalanuvchiga qancha?\" — Senior savoli.",
        "",
        "```text",
        "Oylik taxmin (10k RPS cho'qqi):",
        "App: 6 × c6g.large ≈ $300 | DB: db.r6g.xlarge + replika ≈ $700 | Redis ≈ $200",
        "S3 + CDN egress 5 TB ≈ $450 | Monitoring/log'lar ≈ $300 | Jami ≈ $2 000 → $0.001/MAU",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Tizimingiz uchun oylik infratuzilma narxini komponentlar bo'yicha baholab, 3 ta optimallashtirish taklif qiling.",
      acceptanceCriteria: [
        "Narx komponentlarini (shu jumladan yashirinlarini) biladi",
        "Narxni dizayn qarorlariga bog'laydi"
      ],
      prerequisites: [
        "69.16"
      ]
    }
  ]
});
