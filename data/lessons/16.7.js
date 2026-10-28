/* Chuqur dars: 16.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("16.7", {
  "lesson": [
    "### JOIN tezligini nima belgilaydi",
    "JOIN — ikki to'plamni shart bo'yicha bog'lash. Tezlik uchta narsaga bog'liq: har tomonda nechta qator ishtirok etadi, bog'lash sharti indeks bilan qo'llab-quvvatlanadimi va qaysi algoritm tanlanadi (16.3).",
    "",
    "### 1. JOIN ustunlarida indeks",
    "Nested Loop'da ichki jadval har tashqi qator uchun qidiriladi. Ichki tomonda indeks bo'lmasa, har safar full scan bo'ladi. Odatda PK tomonida indeks bor, **FK tomonida esa qo'lda qo'shish kerak**. MySQL InnoDB FK constraint uchun avtomatik indeks yaratadi. PostgreSQL **yaratmaydi**. Laravel'ning `foreignId()->constrained()` ham PostgreSQL'da alohida indeks yaratmaydi (MySQL'da InnoDB o'zi qiladi).",
    "",
    "### 2. Mos tiplar va collation",
    "`orders.customer_id bigint` va `customers.id int` yoki `varchar` ustunlar har xil collation'da (`utf8mb4_unicode_ci` va `utf8mb4_general_ci`) bo'lsa, DB qiymatlarni konvertatsiya qiladi va indeks ishlamay qolishi mumkin. Migratsiyalarda FK va PK tiplarini bir xil qiling.",
    "",
    "### 3. Avval filtrlash",
    "Qancha kam qator JOIN'ga kirsa, shuncha tez. Shartlarni iloji boricha aniq yozing va filtrlanayotgan ustunlarni indekslang. Optimizer odatda filtrni JOIN'dan oldin qo'llaydi, lekin funksiyali yoki murakkab shartlar bunga to'sqinlik qiladi.",
    "",
    "### 4. Keraksiz JOIN'lardan qochish",
    "Faqat filtr yoki chiqish uchun kerakli jadvallarni ulang. \"Har ehtimolga qarshi\" qo'shilgan `LEFT JOIN` ham qatorlarni o'qitadi. Mavjudlikni tekshirish uchun JOIN o'rniga `EXISTS` (16.8).",
    "",
    "### 5. Qator portlashi (fan-out)",
    "Bir nechta 1:N munosabatni birga ulash dekart ko'paytma beradi: 1 buyurtma × 5 item × 3 to'lov = 15 qator. Natija: `SUM(items.price)` 3 marta, `SUM(payments.amount)` 5 marta ko'payadi. Bu ham noto'g'ri natija, ham ortiqcha ish. `DISTINCT` qo'shish xatoni yashiradi, lekin tuzatmaydi.",
    "",
    "Yechim: har 1:N tomonni **oldindan agregatsiya** qilib (subquery yoki CTE), keyin 1:1 sifatida ulash. Eloquent'ning `withSum()` va `withCount()` metodlari har biri uchun alohida korrelyatsiyali subquery yasaydi va bu muammodan qochadi. `with()` esa alohida so'rovlar yuboradi.",
    "",
    "### 6. Katta JOIN + GROUP BY",
    "Millionlab qatorni JOIN qilib, keyin guruhlash o'rniga kichik tomonda agregatsiya qiling yoki summary jadval ishlating (16.13).",
    "",
    "### Laravel'da JOIN",
    "`join()`, `leftJoin()`, `joinSub()`. JOIN'li Eloquent so'rovida `select('orders.*')` yozing. Aks holda ikki jadvalning `id` ustunlari to'qnashadi va modelga noto'g'ri `id` tushadi."
  ],
  "examples": [
    {
      "title": "Fan-out muammosi va yechimi",
      "lang": "sql",
      "code": [
        "-- XATO: summalar ko'payib ketadi",
        "SELECT o.id, SUM(i.qty * i.price) AS items_total, SUM(p.amount) AS paid",
        "FROM orders o",
        "JOIN order_items i ON i.order_id = o.id",
        "JOIN payments p ON p.order_id = o.id",
        "GROUP BY o.id;",
        "",
        "-- TO'G'RI: oldindan agregatsiya",
        "SELECT o.id, i.items_total, p.paid",
        "FROM orders o",
        "LEFT JOIN (SELECT order_id, SUM(qty * price) AS items_total FROM order_items GROUP BY order_id) i ON i.order_id = o.id",
        "LEFT JOIN (SELECT order_id, SUM(amount) AS paid FROM payments GROUP BY order_id) p ON p.order_id = o.id",
        "WHERE o.created_at >= '2025-06-01';"
      ]
    },
    {
      "title": "Laravel: FK indeks va JOIN",
      "lang": "php",
      "code": [
        "// PostgreSQL uchun FK indeksini aniq qo'shish",
        "Schema::table('order_items', function (Blueprint $table) {",
        "    $table->foreignId('order_id')->constrained()->cascadeOnDelete();",
        "    $table->index('order_id');",
        "});",
        "",
        "// Fan-out'siz agregatlar",
        "$orders = Order::query()",
        "    ->withSum('payments as paid', 'amount')",
        "    ->withCount('items')",
        "    ->where('created_at', '>=', now()->subMonth())",
        "    ->get();",
        "",
        "// JOIN bilan: ustunlarni aniq tanlang",
        "Order::select('orders.*', 'customers.name as customer_name')",
        "    ->join('customers', 'customers.id', '=', 'orders.customer_id')",
        "    ->where('customers.city', 'Toshkent')",
        "    ->get();"
      ]
    }
  ],
  "pitfalls": [
    "PostgreSQL'da FK ustuniga indeks qo'ymaslik: JOIN va `ON DELETE CASCADE` sekinlashadi.",
    "Bir nechta 1:N jadvalni birga JOIN qilib, `SUM` natijasiga ishonish.",
    "Fan-out'ni `DISTINCT` bilan yashirish: natija \"to'g'ri ko'rinadi\", lekin summalar baribir noto'g'ri.",
    "JOIN'li Eloquent so'rovida `select('*')`: `id` ustuni boshqa jadvalniki bilan almashib qoladi."
  ]
});
