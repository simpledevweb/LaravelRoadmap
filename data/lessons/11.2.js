/* Chuqur dars: 11.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("11.2", {
  "lesson": [
    "### Schema nima",
    "PostgreSQL'da ierarxiya: **cluster** (bitta server) → **database** → **schema** → obyektlar (jadval, view, funksiya, sequence, tip). Schema — database ichidagi namespace. Bir xil nomli jadval turli schema'larda bo'lishi mumkin: `billing.invoices` va `archive.invoices`.",
    "",
    "MySQL'da \"schema\" va \"database\" sinonim. PostgreSQL'da ular alohida tushunchalar. Bitta ulanish faqat bitta database'ga ulanadi, lekin uning ichidagi barcha schema'larga murojaat qila oladi.",
    "",
    "### search_path",
    "Jadval nomi schema'siz yozilsa (`SELECT * FROM users`), PostgreSQL uni `search_path` dagi schema'larda tartib bilan qidiradi. Default qiymat `\"$user\", public`. Yangi obyekt birinchi mavjud schema'da yaratiladi.",
    "",
    "`search_path` ni sessiya, rol yoki database darajasida sozlash mumkin. Laravel'da `config/database.php` dagi `pgsql` ulanishida `search_path` kaliti bor (eski versiyalarda `schema`).",
    "",
    "### Huquqlar",
    "Schema ichidagi obyektdan foydalanish uchun rolga schema'ning o'zida `USAGE` huquqi kerak. Yangi obyekt yaratish uchun `CREATE` huquqi kerak. PostgreSQL 15 dan boshlab `public` schema'da oddiy foydalanuvchilarning `CREATE` huquqi default olib tashlangan (xavfsizlik uchun).",
    "",
    "### Qachon ishlatiladi",
    "- **Modullarni ajratish:** `billing`, `auth`, `reporting`. Modular monolith'da chegarani DB darajasida ko'rsatadi.",
    "- **Kengaytmalar:** `CREATE EXTENSION pg_trgm SCHEMA extensions` — `public` toza qoladi.",
    "- **Multi-tenancy (schema-per-tenant):** har bir tenant alohida schema'da. Izolyatsiya yaxshi, backup va o'chirish oson.",
    "",
    "### Schema-per-tenant cheklovlari",
    "Minglab schema bo'lsa, har bir migratsiya hamma schema'da ishlashi kerak. Bu sekin va xatoga moyil. Tizim katalogi (`pg_class`) shishadi va planner sekinlashadi. Ulanish pool'i `search_path` ni har so'rovda almashtirishi kerak. PgBouncer transaction rejimida sessiya `SET` lari yo'qoladi. Yuzlab tenant'gacha qulay. Undan ko'p bo'lsa, odatda `tenant_id` ustunli umumiy jadvallar yaxshiroq.",
    "",
    "### Laravel'da",
    "Model'da `protected $table = 'billing.invoices';` yozish mumkin. Migratsiyada `Schema::create('billing.invoices', ...)` ishlaydi, lekin schema'ning o'zini oldin raw SQL bilan yaratish kerak."
  ],
  "examples": [
    {
      "title": "Modul schema'si va huquqlar",
      "lang": "sql",
      "code": [
        "CREATE SCHEMA IF NOT EXISTS billing;",
        "CREATE TABLE billing.invoices (",
        "  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,",
        "  total numeric(15,2) NOT NULL",
        ");",
        "GRANT USAGE ON SCHEMA billing TO app_reader;",
        "GRANT SELECT ON ALL TABLES IN SCHEMA billing TO app_reader;",
        "ALTER DEFAULT PRIVILEGES IN SCHEMA billing GRANT SELECT ON TABLES TO app_reader;"
      ],
      "note": "`ALTER DEFAULT PRIVILEGES` kelajakda yaratiladigan jadvallarga ham huquq beradi."
    },
    {
      "title": "Laravel migratsiya va model",
      "lang": "php",
      "code": [
        "public function up(): void",
        "{",
        "    DB::statement('CREATE SCHEMA IF NOT EXISTS billing');",
        "    Schema::create('billing.invoices', function (Blueprint $table) {",
        "        $table->id();",
        "        $table->decimal('total', 15, 2);",
        "        $table->timestamps();",
        "    });",
        "}",
        "",
        "class Invoice extends Model",
        "{",
        "    protected $table = 'billing.invoices';",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Schema'ni MySQL'dagi database bilan adashtirish: PostgreSQL'da turli database'lar orasida JOIN qilib bo'lmaydi, turli schema'lar orasida esa bo'ladi.",
    "`search_path` ga tayanib, bir xil nomli jadvallar turli schema'larda bo'lganda noto'g'ri jadvalga yozib yuborish.",
    "Schema-per-tenant ni minglab tenant uchun tanlash: migratsiya, katalog hajmi va pooling muammoga aylanadi.",
    "Yangi schema'ga `USAGE` bermasdan faqat jadvalga `SELECT` berish: foydalanuvchi baribir `permission denied for schema` oladi."
  ]
});
