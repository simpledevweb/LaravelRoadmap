/* Chuqur dars: 15.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("15.15", {
  "lesson": [
    "### Read/Write separation",
    "**Yozish** — asosiy (primary/source) serverga, **o'qish** — replikalarga (read replicas). Maqsad: o'qishni masshtablash va asosiy serverni yuksizlantirish.",
    "",
    "### Qanday ishlaydi",
    "Replikatsiya (10.16): primary → replica(lar) (asinxron). Ilova so'rovni turi bo'yicha yo'naltiradi.",
    "",
    "### Laravel",
    "```php",
    "'mysql' => ['read' => ['host' => ['10.0.0.2', '10.0.0.3']], 'write' => ['host' => ['10.0.0.1']], 'sticky' => true, ...]",
    "```",
    "`SELECT` → read, `INSERT/UPDATE/DELETE` → write; tranzaksiya ichida hammasi write'da. `sticky`: shu so'rovda yozilgandan keyin o'qish ham write'dan (lag muammosi oldi). `DB::connection('mysql')->useWritePdo()`, `::onWriteConnection()`.",
    "",
    "### Muammo: replica lag",
    "Yozdim → darrov o'qidim → replikada hali yo'q (\"eski ma'lumot\"). Yechimlar: `sticky`, muhim o'qishni primary'dan, lag'ni kuzatish va lag katta bo'lsa primary'ga, \"o'qish-yozishdan keyin\" mantig'i (session flag), sinxron replikatsiya (sekin).",
    "",
    "### Proksi orqali",
    "**ProxySQL/MaxScale/Pgpool** so'rovni avtomatik yo'naltiradi (read/write split), failover, balans: ilova o'zgarmaydi.",
    "",
    "### Qachon foydali",
    "O'qish ≫ yozish (veb, hisobot). Yozish ko'p bo'lsa foyda yo'q (replika yozishni qayta takrorlaydi): sharding.",
    "",
    "### Ehtiyot",
    "- Replikaga yozish (`read_only`).",
    "- Eventual consistency'ni ilova mantig'iga moslash.",
    "- Replica uzilsa o'qish primary'ga qaytsin (failover).",
    "- Hisobotlar uchun alohida replika.",
    "",
    "### Zero-downtime failover",
    "Replikani primary'ga ko'tarish (promotion), GTID, Orchestrator."
  ],
  "examples": [
    {
      "title": "Laravel sozlama",
      "lang": "php",
      "code": [
        "'mysql' => [",
        "    'read'   => ['host' => ['10.0.0.2', '10.0.0.3']],",
        "    'write'  => ['host' => ['10.0.0.1']],",
        "    'sticky' => true,",
        "    'driver' => 'mysql', 'database' => env('DB_DATABASE'),",
        "],",
        "$user = User::onWriteConnection()->find($id);     // muhim o'qish primary'dan"
      ]
    }
  ],
  "pitfalls": [
    "Replica lag: yozgandan keyin darrov o'qish eski ma'lumot beradi (`sticky`/primary'dan o'qing).",
    "Yozish ko'p bo'lsa replikalar yordam bermaydi (hammasi yozuvni takrorlaydi).",
    "Replika'ga yozish: `read_only`/`super_read_only`.",
    "Replika uzilsa o'qish primary'ga qaytishini ta'minlang (failover)."
  ]
});
