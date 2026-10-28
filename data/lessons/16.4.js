/* Chuqur dars: 16.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("16.4", {
  "lesson": [
    "### Optimizer indeksni qanday tanlaydi",
    "Indeks borligi uning ishlatilishini kafolatlamaydi. Optimizer har bir mumkin bo'lgan yo'lning **xarajatini** hisoblaydi va eng arzonini tanlaydi. Asosiy omillar:",
    "- **Selektivlik:** shartga qatorlarning qancha qismi mos keladi. `status = 'cancelled'` (1%) — yaxshi selektiv. `is_active = 1` (95%) — yomon.",
    "- **Indeks orqali olish narxi:** har topilgan qator uchun jadvaldan tasodifiy o'qish (InnoDB secondary indeksda PK orqali yana bir qidiruv). Ko'p qator uchun ketma-ket full scan arzonroq bo'ladi. Taxminiy chegara: jadvalning 10–30% idan ko'pi kerak bo'lsa, full scan.",
    "- **Covering:** kerakli barcha ustunlar indeksda bo'lsa, jadvalga murojaat yo'q va indeks ko'p qatorda ham foydali.",
    "- **Tartib:** `ORDER BY ... LIMIT` uchun tartibli indeks saralashni tejaydi va kam selektiv indeks ham tanlanishi mumkin.",
    "",
    "### Noto'g'ri tanlov sabablari",
    "1. **Eskirgan statistika:** katta import yoki o'chirishdan keyin. `ANALYZE TABLE t` (MySQL), `ANALYZE t` (PostgreSQL).",
    "2. **Korrelyatsiya:** `city` va `region` bog'liq, optimizer bilmaydi (16.2, 11.9).",
    "3. **Parametrga bog'liq taqsimot:** bir xil so'rov bir mijoz uchun 5 qator, boshqasi uchun 5 mln qator. Bitta reja ikkalasiga mos emas.",
    "4. **Raqobatchi indekslar:** `(customer_id)` va `(created_at)` alohida, optimizer `ORDER BY created_at LIMIT 20` uchun noto'g'ri bittasini tanlaydi va millionlab qatorni filtrlaydi.",
    "5. **Sargable bo'lmagan shart yoki tip mos kelmasligi** (16.6, 16.10): indeks umuman ko'rib chiqilmaydi.",
    "",
    "### Tuzatish tartibi",
    "1. Statistikani yangilash.",
    "2. So'rovga aniq mos **composite indeks** (16.5). Ko'pincha muammoni to'liq hal qiladi va optimizer \"o'ylashi\" kerak bo'lmaydi.",
    "3. So'rovni qayta yozish: shartni sargable qilish, subquery'ni ajratish.",
    "4. Keraksiz, chalg'ituvchi indekslarni o'chirish.",
    "5. **Oxirgi chora — hint:** MySQL `FORCE INDEX`, `USE INDEX`, `IGNORE INDEX`, 8.0 da optimizer hint'lar (`/*+ INDEX(o idx) */`). PostgreSQL'da hint yo'q (`pg_hint_plan` kengaytmasi).",
    "",
    "Hint'ning xavfi: ma'lumot taqsimoti o'zgarganda u yangi optimal rejani to'sib qo'yadi. Indeks nomi o'zgarsa, so'rov xato beradi. Hint qo'ysangiz, sababini izohda yozing va vaqti-vaqti bilan qayta tekshiring.",
    "",
    "### Laravel'da",
    "Laravel 10+ da `->useIndex('idx')`, `->forceIndex('idx')`, `->ignoreIndex('idx')` metodlari bor (MySQL'da ishlaydi). Lekin avval indeks dizaynini tuzating."
  ],
  "examples": [
    {
      "title": "Raqobatchi indekslar muammosi",
      "lang": "sql",
      "code": [
        "-- Indekslar: (customer_id), (created_at)",
        "EXPLAIN SELECT * FROM orders WHERE customer_id = 42 ORDER BY created_at DESC LIMIT 20;",
        "-- key=orders_created_at  rows=20  (aslida 2 mln qator skan qilinadi va filtrlanadi)",
        "",
        "-- To'g'ri yechim: composite indeks",
        "CREATE INDEX orders_customer_created ON orders (customer_id, created_at);",
        "DROP INDEX orders_customer_id ON orders;   -- endi ortiqcha (leftmost prefix)",
        "ANALYZE TABLE orders;"
      ]
    },
    {
      "title": "Hint — oxirgi chora",
      "lang": "php",
      "code": [
        "// Sabab: notekis taqsimotda optimizer created_at indeksini tanlaydi (2025-06, #412)",
        "$orders = Order::query()",
        "    ->forceIndex('orders_customer_created')",
        "    ->where('customer_id', $customerId)",
        "    ->latest()",
        "    ->limit(20)",
        "    ->get();"
      ],
      "note": "`forceIndex()` Laravel 10.x da qo'shilgan va asosan MySQL/MariaDB uchun."
    }
  ],
  "pitfalls": [
    "Indeks ishlatilmasa darhol `FORCE INDEX` qo'yish: ma'lumot o'zgarganda reja eskiradi.",
    "Past selektiv ustunga (`is_active`, `gender`) alohida indeks yaratib, foyda kutish.",
    "Composite indeks qo'shgandan keyin ortiqcha bir ustunli indeksni qoldirish: optimizer chalg'iydi va yozish sekinlashadi.",
    "Katta o'zgarishlardan keyin statistikani yangilamaslik."
  ]
});
