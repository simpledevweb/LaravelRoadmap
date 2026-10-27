/* Chuqur dars: 55.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("55.15", {
  "lesson": [
    "### Muvozanat",
    "Indeks **o'qishni tezlashtiradi**, lekin **yozishni sekinlashtiradi** va joy egallaydi. Har indeks — qo'shimcha xarajat.",
    "",
    "### Yozish narxi",
    "- **INSERT:** har indeksga yozuv qo'shiladi.",
    "- **UPDATE:** indekslangan ustun o'zgarsa indeks yangilanadi (o'chirish + qo'shish).",
    "- **DELETE:** indekslardan olib tashlanadi.",
    "- Sahifa bo'linishi, redo log, buffer pool bosimi, replika yuki.",
    "- Yozuv ko'p jadvalda (log, event) indeks soni minimal bo'lsin.",
    "",
    "### Hajm",
    "Har indeks diskda va **buffer pool**da joy oladi: ortiqcha indeks keshni siqadi (ishchi ma'lumot kamayadi).",
    "",
    "### Qaror qabul qilish",
    "1. So'rov chastotasi va ahamiyati (qancha marta, qancha vaqt).",
    "2. O'qish/yozish nisbati (`SELECT` ≫ `INSERT` — indeks foydali).",
    "3. Foyda (soniyadan millisekundga) vs narx (har yozuvga +%).",
    "4. Yozish yuklamasini **o'lchang** (indeks qo'shishdan oldin/keyin).",
    "",
    "### Optimallash",
    "- Ortiqcha/ishlatilmagan indekslarni o'chiring (55.17).",
    "- Composite bilan bir nechtasini birlashtiring.",
    "- Kam ustunli, qisqa turdagi indeks.",
    "- Ommaviy import: indekslarni keyin yarating.",
    "",
    "### Alternativlar",
    "Kesh (Redis), replika (o'qish), hisoblagich, qidiruv dvigateli — indeksni ko'paytirish o'rniga.",
    "",
    "### Qoida",
    "\"Indeks bepul emas\": har biri uchun savol — qaysi so'rov uni ishlatadi?"
  ],
  "examples": [
    {
      "title": "Narxni o'lchash",
      "lang": "bash",
      "code": [
        "# indekssiz va indeksli insert tezligi (sysbench yoki oddiy skript)",
        "mysql -e \"SELECT COUNT(*) FROM information_schema.STATISTICS WHERE table_schema='shop' AND table_name='events';\"",
        "mysqlslap --concurrency=20 --iterations=3 --query=\"INSERT INTO events (user_id, type) VALUES (1,'x')\" --create-schema=shop"
      ]
    }
  ],
  "pitfalls": [
    "Yozish ko'p jadvalda ortiqcha indekslar (log/event) tezlikni sezilarli tushiradi.",
    "Ortiqcha indeks buffer pool'ni siqib ishchi ma'lumotni siqib chiqaradi.",
    "Indeks qo'shishdan oldin va keyin yozish tezligini o'lchamaslik narxni yashiradi.",
    "Har so'rovga alohida indeks yaratish o'rniga composite va kesh ni ko'ring."
  ]
});
