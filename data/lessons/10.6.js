/* Chuqur dars: 10.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("10.6", {
  "lesson": [
    "### Composite (ko'p ustunli) indeks",
    "Bitta indeksda bir nechta ustun: `INDEX (user_id, status, created_at)`. Ma'lumot ustunlar **tartibida** saqlanadi.",
    "",
    "### Leftmost prefix qoidasi",
    "`(a, b, c)` indeksi quyidagilarni tezlashtiradi: `a`; `a, b`; `a, b, c`. `b` yoki `c` yolg'iz — yo'q (chap prefiksdan boshlanmaydi). 8.0.13+ \"skip scan\" cheklangan hollarda ishlaydi.",
    "",
    "### Ustun tartibi qoidasi",
    "1. **Tenglik** (`=`) ustunlari avval.",
    "2. So'ng **diapazon** (`>`, `BETWEEN`) — diapazondan keyingi ustunlar filtrlash uchun ishlatilmaydi.",
    "3. So'ng **ORDER BY** ustunlari (filesort'siz saralash uchun).",
    "4. Selektivlik: ko'proq farqlovchi ustun odatda oldin, lekin avvalo so'rov shakli.",
    "",
    "### ORDER BY",
    "`WHERE user_id = ? ORDER BY created_at DESC` uchun `(user_id, created_at)` filesort'siz. Aralash yo'nalish uchun 8.0 da **descending index** (`created_at DESC`).",
    "",
    "### Bitta indeks, ko'p so'rov",
    "Bitta yaxshi composite ko'p so'rovga xizmat qiladi; `(a)` va `(a, b)` ikkalasi kerak emas (`(a, b)` `a` ni ham qoplaydi).",
    "",
    "### Amaliyot",
    "Ko'p ishlatiladigan so'rovlarni ro'yxatlang → ularga mos 1–2 composite. `EXPLAIN` bilan `key_len` ni tekshiring (nechta ustun ishlatildi).",
    "",
    "### Cheklovlar",
    "Indeks uzunligi (3072 bayt `DYNAMIC`), yozish narxi, ustun soni 3–4 dan oshmasin."
  ],
  "examples": [
    {
      "title": "Tartib",
      "lang": "sql",
      "code": [
        "-- so'rov: WHERE user_id = ? AND status = 'paid' AND created_at >= ? ORDER BY created_at DESC",
        "CREATE INDEX idx_orders_user_status_created ON orders (user_id, status, created_at);",
        "",
        "EXPLAIN SELECT * FROM orders WHERE user_id = 5 AND status = 'paid' AND created_at >= '2025-01-01' ORDER BY created_at DESC;"
      ]
    }
  ],
  "pitfalls": [
    "Chap prefiksdan boshlanmagan ustun bo'yicha qidirish composite'dan foydalana olmaydi.",
    "Diapazon ustunidan keyingi ustunlar filtrlash uchun ishlatilmaydi.",
    "`(a)` va `(a, b)` ni birga yaratish ortiqcha: `(a, b)` yetarli.",
    "Ko'p ustunli indeks yozish narxini va hajmini oshiradi."
  ]
});
