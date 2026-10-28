/* Chuqur dars: 11.23. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("11.23", {
  "lesson": [
    "### Muammo",
    "PostgreSQL har ulanish uchun alohida jarayon ochadi (11.1). PHP-FPM modelida har bir worker o'z ulanishini ochadi. 10 ta server × 50 ta FPM worker + queue worker'lar + cron = 600+ ulanish. Ularning ko'pchiligi vaqtining 90% ida bo'sh turadi, lekin xotira egallaydi va kontekst almashinuvi xarajatini oshiradi. `max_connections` ga yetganda yangi so'rovlar `FATAL: sorry, too many clients already` oladi.",
    "",
    "Haqiqatda server samarali bajara oladigan parallel so'rovlar soni CPU yadrolari soniga yaqin (taxminan yadrolar × 2–4). Shuning uchun ko'p mijozni oz sonli server ulanishiga \"siqish\" kerak.",
    "",
    "### PgBouncer",
    "Yengil proxy: mijozlar unga ulanadi, u esa cheklangan server ulanishlari pool'ini boshqaradi. Uch rejim:",
    "- **session:** mijoz ulanib turguncha bitta server ulanishini ushlaydi. Faqat ulanish ochish xarajatini tejaydi.",
    "- **transaction:** server ulanishi faqat tranzaksiya (yoki autocommit'dagi bitta buyruq) davomida beriladi. **Eng samarali va Laravel uchun odatiy.** 2000 mijoz 40 ta server ulanishida ishlay oladi.",
    "- **statement:** har buyruqdan keyin qaytariladi. Ko'p qatorli tranzaksiyalar ishlamaydi.",
    "",
    "### Transaction rejimi cheklovlari",
    "Keyingi tranzaksiya boshqa server ulanishiga tushishi mumkin, shuning uchun **sessiya holati** saqlanmaydi:",
    "- `SET search_path`, `SET timezone` va boshqa sessiya `SET` lari. Ularni rol yoki DB darajasida (`ALTER ROLE ... SET`) yoki tranzaksiya ichida `SET LOCAL` bilan bering.",
    "- Sessiya darajasidagi advisory lock'lar (`pg_advisory_lock`). Ularning o'rniga `pg_advisory_xact_lock` ishlating.",
    "- `LISTEN/NOTIFY`, `WITH HOLD` kursorlar, vaqtinchalik jadvallar.",
    "- **Prepared statement'lar:** PgBouncer 1.21+ `max_prepared_statements` bilan protokol darajasida qo'llaydi. Eskiroq versiyada `prepared statement \"pdo_stmt_00000001\" does not exist` xatosi chiqadi. Yechim: PgBouncer'ni yangilash yoki PDO'da `PDO::ATTR_EMULATE_PREPARES => true`.",
    "",
    "### Pool hajmini hisoblash",
    "`default_pool_size` — har (user, database) juftligi uchun server ulanishlari. Boshlang'ich nuqta: CPU yadrolari × 2–3. Barcha PgBouncer instance'lari va to'g'ridan-to'g'ri ulanishlar yig'indisi `max_connections` dan kam bo'lishi kerak. Admin va migratsiya uchun zaxira qoldiring. `SHOW POOLS` dagi `cl_waiting` doim musbat bo'lsa, pool kichik yoki so'rovlar sekin.",
    "",
    "### Arxitektura",
    "- PgBouncer har ilova serverida (lokal) yoki DB oldida markaziy (HA uchun bir nechta instance).",
    "- Migratsiyalar va uzun admin ishlarini (`CREATE INDEX CONCURRENTLY`, sessiya `SET` lari) to'g'ridan-to'g'ri PostgreSQL'ga yo'naltiring.",
    "- Boshqariladigan alternativalar: RDS Proxy, Supabase Supavisor, PgCat yoki Odyssey (ko'p thread'li).",
    "",
    "### Laravel Octane va queue",
    "Octane va doimiy queue worker'larda ulanish so'rovlar orasida ochiq qoladi. Bu ulanish ochish xarajatini yo'qotadi, lekin ulanishlar soni muammosini hal qilmaydi. PgBouncer baribir foydali."
  ],
  "examples": [
    {
      "title": "pgbouncer.ini",
      "lang": "ini",
      "code": [
        "[databases]",
        "app = host=10.0.0.5 port=5432 dbname=app",
        "",
        "[pgbouncer]",
        "listen_addr = 0.0.0.0",
        "listen_port = 6432",
        "auth_type = scram-sha-256",
        "auth_file = /etc/pgbouncer/userlist.txt",
        "pool_mode = transaction",
        "max_client_conn = 2000",
        "default_pool_size = 40",
        "reserve_pool_size = 10",
        "max_prepared_statements = 200",
        "server_idle_timeout = 60"
      ],
      "note": "`max_prepared_statements` PgBouncer 1.21+ da mavjud."
    },
    {
      "title": "Laravel ulanishlari",
      "lang": "php",
      "code": [
        "// config/database.php",
        "'pgsql' => [",
        "    'driver' => 'pgsql',",
        "    'host' => env('DB_HOST', '127.0.0.1'),",
        "    'port' => env('DB_PORT', '6432'),        // PgBouncer",
        "    // eski PgBouncer bo'lsa:",
        "    // 'options' => [PDO::ATTR_EMULATE_PREPARES => true],",
        "],",
        "",
        "// Migratsiya uchun to'g'ridan-to'g'ri ulanish",
        "'pgsql_direct' => array_merge(config('database.connections.pgsql'), [",
        "    'port' => env('DB_DIRECT_PORT', '5432'),",
        "]),",
        "",
        "// php artisan migrate --database=pgsql_direct"
      ]
    }
  ],
  "pitfalls": [
    "`max_connections` ni oshirib pooling o'rnini bosish: ko'p jarayon CPU va xotirani band qilib, umumiy tezlikni pasaytiradi.",
    "Transaction rejimida sessiya `SET` yoki `pg_advisory_lock` ga tayanish: keyingi so'rov boshqa ulanishga tushadi va holat yo'qoladi.",
    "Eski PgBouncer bilan native prepared statement'lar: tasodifiy `prepared statement does not exist` xatolari.",
    "Barcha PgBouncer pool'lari yig'indisini `max_connections` dan katta qilish: PostgreSQL ulanishlarni rad etadi."
  ]
});
