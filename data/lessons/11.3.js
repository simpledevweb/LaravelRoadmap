/* Chuqur dars: 11.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("11.3", {
  "lesson": [
    "### Nega tip tanlash muhim",
    "To'g'ri tip — bu bepul validatsiya, ixcham saqlash va tez indeks. PostgreSQL tiplar tizimi MySQL'dan ancha boy. Ko'p narsani ilova kodi o'rniga DB darajasida kafolatlash mumkin.",
    "",
    "### Sonlar",
    "- `smallint` (2 bayt), `integer` (4), `bigint` (8). PK uchun `bigint`: `integer` 2.1 mlrd'da tugaydi.",
    "- `numeric(p,s)`: aniq o'nlik. Pul uchun faqat shu. `real`/`double precision` taxminiy, `0.1 + 0.2` muammosi bor.",
    "- `money` tipidan qoching: lokalga bog'liq va valyuta saqlamaydi.",
    "",
    "### Matn",
    "`text`, `varchar(n)` va `varchar` bir xil ichki tuzilmaga ega va bir xil tezlikda ishlaydi. `char(n)` bo'shliq bilan to'ldiradi, ishlatmang. Uzunlik cheklovi biznes qoidasi bo'lsa `varchar(n)` yoki `CHECK (length(x) <= n)`. Case-insensitive taqqoslash uchun `citext` kengaytmasi.",
    "",
    "### Vaqt",
    "- `timestamptz`: vaqtni UTC'da saqlaydi, chiqarishda sessiya `TimeZone` ga o'giradi. **Deyarli doim shuni ishlating.**",
    "- `timestamp` (zonasiz): \"devordagi soat\". Server yoki mijoz zonasi o'zgarsa, ma'no buziladi.",
    "- `date`, `time`, `interval` (`now() - interval '30 days'`).",
    "",
    "Laravel'da `$table->timestampTz()` va `$table->timestampsTz()` mavjud.",
    "",
    "### Identifikatorlar",
    "`serial`/`bigserial` eski usul: sequence va default yaratadi, lekin egalik va huquq bilan muammolar bor. Zamonaviy SQL standarti: `bigint GENERATED ALWAYS AS IDENTITY`. Laravel'ning `$table->id()` PostgreSQL'da `bigserial` yaratadi. `uuid` — native 16 baytli tip, `gen_random_uuid()` PostgreSQL 13+ da ichki funksiya.",
    "",
    "### PostgreSQL'ga xos tiplar",
    "- `jsonb` (11.4), massivlar (`text[]`, `int[]`).",
    "- `inet`/`cidr`: IP manzillar, `<<` (subnet ichida) operatori bilan.",
    "- **Range tiplari:** `int4range`, `tstzrange`, `daterange`. `&&` (kesishadi), `@>` (o'z ichiga oladi). `EXCLUDE` constraint bilan ustma-ust bronni DB darajasida taqiqlaydi.",
    "- `enum`: qiymat qo'shish oson (`ALTER TYPE ... ADD VALUE`), o'chirish qiyin. Ko'pincha `text` + `CHECK` yoki lookup jadval moslashuvchanroq.",
    "- **Domain:** `CREATE DOMAIN email AS citext CHECK (...)` — qayta ishlatiladigan constraint'li tip.",
    "",
    "### Laravel bilan",
    "Eloquent `$casts` DB tipini tushunadi: `'meta' => 'array'`, `'amount' => 'decimal:2'`. Lekin `numeric` PHP'ga string bo'lib keladi. Hisoblashda float'ga o'tkazib aniqlikni yo'qotmang: `brick/money` yoki butun tiyinlarda saqlang."
  ],
  "examples": [
    {
      "title": "Ustma-ust bronni DB taqiqlaydi",
      "lang": "sql",
      "code": [
        "CREATE EXTENSION IF NOT EXISTS btree_gist;",
        "CREATE TABLE bookings (",
        "  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,",
        "  room_id bigint NOT NULL,",
        "  period tstzrange NOT NULL,",
        "  EXCLUDE USING gist (room_id WITH =, period WITH &&)",
        ");",
        "INSERT INTO bookings (room_id, period)",
        "VALUES (1, '[2025-06-01 14:00+05, 2025-06-03 12:00+05)');"
      ],
      "note": "`btree_gist` oddiy `=` ni GiST indeksida ishlatish uchun kerak. Kesishgan ikkinchi bron `conflicting key value violates exclusion constraint` beradi."
    },
    {
      "title": "Laravel migratsiyada to'g'ri tiplar",
      "lang": "php",
      "code": [
        "Schema::create('payments', function (Blueprint $table) {",
        "    $table->id();",
        "    $table->uuid('public_id')->unique();",
        "    $table->decimal('amount', 15, 2);",
        "    $table->char('currency', 3);",
        "    $table->jsonb('meta')->nullable();",
        "    $table->ipAddress('client_ip')->nullable();",
        "    $table->timestampsTz();",
        "});"
      ],
      "note": "`ipAddress()` PostgreSQL'da `inet` tipini yaratadi."
    }
  ],
  "pitfalls": [
    "Pulni `float`/`double` da saqlash: yaxlitlash xatolari yig'iladi. `numeric` yoki butun tiyin ishlating.",
    "Zonasiz `timestamp` ishlatish: server va ilova zonasi farq qilsa, vaqtlar soatlab siljiydi.",
    "`varchar(255)` ni MySQL odati bilan hamma joyga yozish: PostgreSQL'da tezlikka ta'siri yo'q, faqat sun'iy cheklov.",
    "`enum` tipini tez-tez o'zgaradigan ro'yxat uchun tanlash: qiymatni o'chirish yoki nomini almashtirish murakkab migratsiya talab qiladi."
  ]
});
