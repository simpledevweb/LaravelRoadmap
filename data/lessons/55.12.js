/* Chuqur dars: 55.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("55.12", {
  "lesson": [
    "### Ustun tartibi",
    "Composite indeksda ustunlar **tartibi** qaysi so'rovlar tezlashishini belgilaydi. (Qoidalar: 10.6, 55.3.)",
    "",
    "### Qoidalar",
    "1. Tenglik (`=`, `IN`) ustunlari avval, **diapazon** (`>`, `<`, `BETWEEN`, `LIKE 'a%'`) keyin: diapazondan keyingi ustunlar filtrlash uchun ishlatilmaydi.",
    "2. **ORDER BY** ustunlari oxirida, filesort'siz tartib uchun (tenglik ustunlaridan keyin).",
    "3. **Selektivlik:** teng huquqli tenglik ustunlari orasida ko'proq farqlovchi oldin (ko'pincha), lekin so'rov shakli ustun.",
    "4. **Chap prefiks:** eng ko'p yolg'iz ishlatiladigan ustun oldinda.",
    "5. **Yo'nalish:** `ORDER BY a ASC, b DESC` — aralash uchun 8.0 descending index.",
    "",
    "### Misol",
    "`WHERE user_id = ? AND status = ? AND created_at >= ? ORDER BY created_at`:",
    "→ `(user_id, status, created_at)` ✓",
    "→ `(created_at, user_id, status)` ✗ (diapazon avval: qolgani filtr emas).",
    "",
    "### Bir nechta so'rov",
    "Ularni ro'yxatlang, umumiy chap prefiksni toping; ba'zan ikki indeks kerak.",
    "",
    "### Tekshirish",
    "`EXPLAIN` → `key_len`, `Extra` (`Using filesort`?), `rows`.",
    "",
    "### Eslatma",
    "Optimizer ba'zan ustun tartibini ko'rib chiqmaydi (MySQL skip scan 8.0.13+ cheklangan: chap ustun kam qiymatli bo'lsa).",
    "",
    "### Laravel",
    "`$table->index(['user_id', 'status', 'created_at'])` — tartib muhim."
  ],
  "examples": [
    {
      "title": "Tartib",
      "lang": "sql",
      "code": [
        "-- so'rov: tenglik user_id, status; diapazon va saralash created_at",
        "CREATE INDEX idx_a ON orders (user_id, status, created_at);   -- yaxshi",
        "CREATE INDEX idx_b ON orders (created_at, user_id, status);   -- yomon: diapazon avval",
        "EXPLAIN SELECT id FROM orders WHERE user_id=5 AND status='paid' AND created_at>='2025-01-01' ORDER BY created_at;"
      ]
    }
  ],
  "pitfalls": [
    "Diapazon ustunini oldinga qo'yish keyingi ustunlarni filtrlash uchun ishlatib bo'lmas qiladi.",
    "Tartibni faqat selektivlikka qarab tanlash so'rov shaklini e'tiborsiz qoldiradi.",
    "Skip scan kafolat emas: tartibga tayaning.",
    "Aralash yo'nalishli `ORDER BY` uchun 8.0 descending index kerak."
  ]
});
