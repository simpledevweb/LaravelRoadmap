/* Chuqur dars: 16.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("16.13", {
  "lesson": [
    "### Agregatsiya nega qimmat",
    "`COUNT`, `SUM`, `AVG`, `GROUP BY` natija qatorlari kam bo'lsa ham, **kirish** qatorlarining hammasini o'qishi kerak. Oylik hisobot 10 mln buyurtmani o'qib, 30 qator qaytaradi. Optimizatsiyaning maqsadi — o'qiladigan qatorlar sonini va har qatorga ketadigan ishni kamaytirish.",
    "",
    "### 1. Avval filtrlash",
    "`WHERE` ni iloji boricha toraytiring va indekslang. `HAVING` faqat agregat natijasini filtrlash uchun. Oddiy shartni `HAVING` ga yozish guruhlashdan keyin filtrlaydi va ortiqcha ish qiladi.",
    "",
    "### 2. GROUP BY va indeks",
    "Agar `GROUP BY` ustunlari indeks tartibiga mos kelsa, DB guruhlarni indeksdan tartib bilan o'qiydi. Saralash yoki hash jadval kerak bo'lmaydi (MySQL: `Using index for group-by`, PostgreSQL: `GroupAggregate` indeks ustida). `WHERE status = ? GROUP BY customer_id` uchun `(status, customer_id)`.",
    "",
    "### 3. Covering indeks",
    "`SELECT customer_id, SUM(total) ... GROUP BY customer_id` uchun `(customer_id, total)` indeksi butun so'rovni jadvalga murojaatsiz bajaradi. Indeks jadvaldan ancha kichik, I/O kamayadi.",
    "",
    "### 4. Agregatni kichik qismda",
    "Avval bola jadvalda agregatsiya qilib, keyin JOIN (16.7). JOIN'dan keyin agregatsiya qator portlashini va ortiqcha ishni keltirib chiqaradi.",
    "",
    "### 5. Oldindan hisoblash",
    "Real-vaqtda millionlab qatorni agregatsiya qilish har so'rovda qimmat. Variantlar:",
    "- **Summary jadval:** `daily_sales (day, revenue, orders)`. Har kecha yoki har soatda job bilan to'ldiriladi. Faqat o'zgargan kunlarni qayta hisoblash (inkremental).",
    "- **Materialized view** (PostgreSQL, 11.17).",
    "- **Hisoblagich ustunlar:** `posts.comments_count` har izoh qo'shilganda `increment`. O'qish bepul, lekin yozish va izchillikni nazorat qilish kerak. Vaqti-vaqti bilan qayta hisoblang.",
    "- **OLAP tizimlar:** ClickHouse, BigQuery. Murakkab analitika uchun OLTP bazadan alohida.",
    "",
    "### COUNT(*) katta jadvalda",
    "InnoDB va PostgreSQL MVCC tufayli umumiy sonni saqlamaydi. `COUNT(*)` har safar indeks yoki jadvalni skan qiladi. Taxminiy son yetarli bo'lsa:",
    "- PostgreSQL: `SELECT reltuples FROM pg_class WHERE relname = 'orders'`.",
    "- MySQL: `information_schema.TABLES.TABLE_ROWS` (juda taxminiy).",
    "- Yoki keshlangan son: `Cache::remember('orders:count', 300, ...)`.",
    "",
    "Laravel'da `paginate()` ning `COUNT` i ham shu muammo: katta jadvalda `simplePaginate` yoki `cursorPaginate` (16.11)."
  ],
  "examples": [
    {
      "title": "Indeks bilan guruhlash",
      "lang": "sql",
      "code": [
        "-- Covering indeks: jadvalga murojaatsiz",
        "CREATE INDEX orders_status_customer_total ON orders (status, customer_id, total);",
        "",
        "SELECT customer_id, SUM(total) AS revenue, COUNT(*) AS cnt",
        "FROM orders",
        "WHERE status = 'paid'",
        "GROUP BY customer_id",
        "ORDER BY revenue DESC",
        "LIMIT 10;",
        "",
        "-- PostgreSQL: tez taxminiy son",
        "SELECT reltuples::bigint AS approx FROM pg_class WHERE relname = 'orders';"
      ]
    },
    {
      "title": "Inkremental summary jadval",
      "lang": "php",
      "code": [
        "final class RefreshDailySales",
        "{",
        "    public function handle(CarbonInterface $from, CarbonInterface $to): void",
        "    {",
        "        $rows = Order::query()",
        "            ->toBase()",
        "            ->selectRaw('DATE(created_at) AS day, SUM(total) AS revenue, COUNT(*) AS orders')",
        "            ->where('status', 'paid')",
        "            ->where('created_at', '>=', $from->startOfDay())",
        "            ->where('created_at', '<', $to->copy()->addDay()->startOfDay())",
        "            ->groupByRaw('DATE(created_at)')",
        "            ->get()",
        "            ->map(fn ($r) => (array) $r)",
        "            ->all();",
        "",
        "        DailySales::upsert($rows, uniqueBy: ['day'], update: ['revenue', 'orders']);",
        "    }",
        "}",
        "",
        "// Har soatda faqat bugun va kechani qayta hisoblash",
        "Schedule::call(fn () => app(RefreshDailySales::class)->handle(now()->subDay(), now()))->hourly();"
      ]
    }
  ],
  "pitfalls": [
    "Oddiy shartni `WHERE` o'rniga `HAVING` ga yozish.",
    "Dashboard'da har sahifa ochilganda millionlab qatorni real-vaqtda agregatsiya qilish.",
    "Hisoblagich ustunni (`comments_count`) mass delete yoki import'dan keyin yangilamaslik: noto'g'ri son.",
    "Summary jadvalni har safar to'liq qayta hisoblash: ma'lumot o'sgan sari job uzayadi. Faqat o'zgargan davrni yangilang."
  ]
});
