/* Chuqur dars: 15.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("15.4", {
  "lesson": [
    "### Indeks strategiyasi",
    "Indekslarni **tasodifiy emas, so'rovlar bo'yicha** rejalashtirish.",
    "",
    "### Jarayon",
    "1. **Eng muhim so'rovlarni** ro'yxatlang (chastota × narx): WHERE, JOIN, ORDER BY, GROUP BY.",
    "2. Har biri uchun **ideal indeks** (tenglik → diapazon → tartib).",
    "3. **Birlashtiring:** bir composite ko'p so'rovga xizmat qilsin (chap prefiks).",
    "4. **Covering** — qaynoq so'rovlar uchun.",
    "5. **O'lchang:** `EXPLAIN`, haqiqiy yuklama.",
    "6. **Audit:** ishlatilmaydigan/dublikat (55.17).",
    "",
    "### Qoidalar",
    "- **FK ustunlari** indekslangan.",
    "- **WHERE + ORDER BY + LIMIT** uchun composite (filesort'siz).",
    "- Past selektivli ustunni yolg'iz emas, composite'da.",
    "- **Yozish narxi:** yozish ko'p jadvalda indeks kam.",
    "- **Hajm:** buffer pool'ga sig'sin.",
    "- Uzun matn: prefiks/hash/full-text.",
    "",
    "### Anti-pattern'lar",
    "- \"Hamma ustunga indeks.\"",
    "- Har so'rovga alohida indeks (composite o'rniga).",
    "- Indeks qo'shib, so'rovni sargable qilmaslik.",
    "- Indeksni o'lchamasdan qo'shish.",
    "",
    "### Ma'lumot o'zgarganda",
    "Yuklama o'zgarsa (yangi funksiya) indeks strategiyasini qayta ko'ring.",
    "",
    "### Hujjatlash",
    "Qaysi indeks qaysi so'rov uchunligini migratsiya/izohda yozing: keyinchalik o'chirish xavfsiz bo'ladi.",
    "",
    "### Laravel",
    "Migratsiyada `index([...], 'idx_nom_maqsad')`; Telescope'dagi sekin so'rovlar bo'yicha indeks qo'shish."
  ],
  "examples": [
    {
      "title": "Strategiya",
      "lang": "sql",
      "code": [
        "-- Asosiy so'rovlar:",
        "-- 1) WHERE user_id=? ORDER BY created_at DESC LIMIT 20",
        "-- 2) WHERE user_id=? AND status=? AND created_at>=?",
        "CREATE INDEX idx_orders_user_created ON orders (user_id, created_at);",
        "CREATE INDEX idx_orders_user_status_created ON orders (user_id, status, created_at);   -- (2) uchun; (1) ham qisman qoplanadi"
      ]
    }
  ],
  "pitfalls": [
    "'Hamma ustunga indeks' yozishni sekinlashtiradi va xotirani yeydi.",
    "Har so'rovga alohida indeks o'rniga umumiy chap prefiksli composite.",
    "Indeks maqsadini hujjatlamasangiz keyinchalik o'chirish xavfli.",
    "Yuklama o'zgarganda eski indeks strategiyasi eskirib qoladi."
  ]
});
