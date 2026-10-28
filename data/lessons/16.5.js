/* Chuqur dars: 16.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("16.5", {
  "lesson": [
    "### So'rovdan boshlang",
    "Composite indeks \"jadval uchun\" emas, **aniq so'rovlar uchun** loyihalanadi. Avval eng muhim (tez-tez va sekin) so'rovlarni yig'ing: `WHERE` shartlari, `ORDER BY`, `GROUP BY`, `SELECT` ustunlari va `LIMIT`.",
    "",
    "### Ustunlar tartibi qoidasi",
    "1. **Tenglik** (`=`, kichik `IN`) ustunlari birinchi.",
    "2. Keyin **diapazon** (`>`, `BETWEEN`, `LIKE 'x%'`) **yoki** `ORDER BY` ustuni. Bittasi: diapazondan keyingi ustunlar qidiruvni toraytirmaydi.",
    "3. Oxirida (ixtiyoriy) `SELECT` dagi ustunlar: **covering** indeks. PostgreSQL'da `INCLUDE (...)`.",
    "",
    "Tenglik ustunlari orasidagi tartib kamroq muhim, lekin boshqa so'rovlar ham indeksdan foydalanishi uchun umumiyroq ustunni oldinga qo'ying. Masalan, multi-tenant tizimda `tenant_id` deyarli doim birinchi.",
    "",
    "### Leftmost prefix",
    "`(a, b, c)` indeksi `a`, `a, b`, `a, b, c` shartlariga xizmat qiladi. `b` yoki `c` yolg'iz bo'lsa, xizmat qilmaydi. Shu tufayli `(a)` alohida indeks ortiqcha. MySQL 8.0.13+ da skip scan ba'zi holatlarda `b` bo'yicha ham ishlaydi, lekin unga tayanmang.",
    "",
    "### IN va tartib",
    "`WHERE user_id = ? AND status IN ('new', 'paid') ORDER BY created_at DESC LIMIT 20` uchun `(user_id, status, created_at)` indeksida `IN` bir nechta qiymat bo'lgani uchun natija `created_at` bo'yicha global tartiblangan emas. Optimizer saralashi kerak bo'ladi. Variantlar:",
    "- `(user_id, created_at)` va `status` ni filtr sifatida tekshirish. `LIMIT` tez bajariladi, agar mos statuslar ko'p bo'lsa.",
    "- `status` kam variantli bo'lsa, har qiymat uchun alohida so'rov va `UNION ALL`.",
    "",
    "Qaysi biri yaxshi ekanini faqat `EXPLAIN ANALYZE` ko'rsatadi.",
    "",
    "### Bitta indeks — ko'p so'rov",
    "Har so'rovga alohida indeks yaratmang. Har indeks yozishni sekinlashtiradi va xotira egallaydi. Umumiy prefiksni toping: `(tenant_id, customer_id, created_at)` uchta so'rovga xizmat qilishi mumkin: tenant bo'yicha, mijoz bo'yicha va mijozning oxirgi buyurtmalari.",
    "",
    "### Indekslarni tozalash",
    "Ishlatilmayotgan indekslarni toping: PostgreSQL'da `pg_stat_user_indexes.idx_scan = 0`, MySQL'da `sys.schema_unused_indexes`. Prefiks bo'yicha takrorlanganlarni ham: `sys.schema_redundant_indexes`. Ularni o'chirish yozishni tezlashtiradi.",
    "",
    "### Laravel migratsiyada",
    "`$table->index(['tenant_id', 'customer_id', 'created_at'])`. Nom avtomatik yaratiladi, lekin aniq nom bergan ma'qul: keyin hint va monitoring'da tushunarli bo'ladi."
  ],
  "examples": [
    {
      "title": "So'rovlar va ularga xizmat qiluvchi indeks",
      "lang": "sql",
      "code": [
        "-- Q1: WHERE tenant_id = ? AND customer_id = ? ORDER BY created_at DESC LIMIT 20",
        "-- Q2: WHERE tenant_id = ? AND customer_id = ?  (count)",
        "-- Q3: WHERE tenant_id = ?  (tenant hisoboti)",
        "CREATE INDEX orders_t_c_created ON orders (tenant_id, customer_id, created_at DESC);",
        "",
        "-- Covering (PostgreSQL): ro'yxat uchun heap o'qilmaydi",
        "CREATE INDEX orders_t_c_created_cov ON orders (tenant_id, customer_id, created_at DESC)",
        "  INCLUDE (status, total);"
      ]
    },
    {
      "title": "Laravel migratsiya",
      "lang": "php",
      "code": [
        "Schema::table('orders', function (Blueprint $table) {",
        "    $table->index(['tenant_id', 'customer_id', 'created_at'], 'orders_t_c_created');",
        "    $table->dropIndex('orders_tenant_id_index');   // endi ortiqcha prefiks",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "Diapazon ustunini tenglik ustunlaridan oldin qo'yish: keyingi ustunlar ishlatilmaydi.",
    "Har bir so'rov uchun alohida composite indeks: yozish sekinlashadi, ko'p indekslar hech qachon ishlatilmaydi.",
    "`IN` ko'p qiymatli bo'lsa ham indeks `ORDER BY` ni qamraydi deb kutish.",
    "Composite indeks qo'shgandan keyin uning prefiksi bo'lgan eski indeksni o'chirmaslik."
  ]
});
