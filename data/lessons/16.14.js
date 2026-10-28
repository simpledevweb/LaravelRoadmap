/* Chuqur dars: 16.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("16.14", {
  "lesson": [
    "### Saralash qanday bajariladi",
    "`ORDER BY` uchun DB ikki yo'ldan birini tanlaydi:",
    "1. **Indeks tartibida o'qish:** indeks allaqachon tartiblangan, DB undan ketma-ket o'qiydi va `LIMIT` ga yetganda to'xtaydi. 20 qator uchun 20 qator o'qiladi.",
    "2. **Alohida saralash:** barcha mos qatorlar o'qiladi, xotirada (yoki sig'masa, diskda) saralanadi va keyin `LIMIT` qo'llanadi. MySQL'da `Using filesort`, PostgreSQL'da `Sort` tuguni. 1 mln mos qator bo'lsa, `LIMIT 20` uchun ham 1 mln qator saralanadi (top-N heapsort biroz yengillashtiradi).",
    "",
    "### Indeks saralashga xizmat qilishi uchun shartlar",
    "- `ORDER BY` ustunlari composite indeksda **tenglik ustunlaridan keyin** keladi: `WHERE user_id = ? ORDER BY created_at` → `(user_id, created_at)`.",
    "- `WHERE` da diapazon bo'lsa, faqat shu diapazon ustuni bo'yicha tartib indeksdan olinadi: `WHERE created_at > ? ORDER BY created_at`. `WHERE price > ? ORDER BY created_at` uchun bitta indeks ikkalasiga xizmat qilmaydi.",
    "- **Yo'nalishlar mos:** hammasi `ASC` yoki hammasi `DESC` bo'lsa, indeks oldinga yoki orqaga o'qiladi. Aralash (`ORDER BY a ASC, b DESC`) uchun indeks ham aralash bo'lishi kerak: MySQL 8+ descending indexes, PostgreSQL har doim qo'llaydi.",
    "- `ORDER BY` da funksiya yoki ifoda bo'lmasligi kerak (yoki expression indeks).",
    "",
    "### Barqaror tartib",
    "`ORDER BY created_at DESC` bir xil vaqtli qatorlar uchun tartibni kafolatlamaydi. Sahifalar orasida qatorlar \"sakraydi\" yoki takrorlanadi. Doim unikal ikkinchi kalit qo'shing: `ORDER BY created_at DESC, id DESC` va indeksni ham `(created_at, id)` qiling. Cursor paginatsiya uchun bu majburiy (16.11).",
    "",
    "### ORDER BY RAND()",
    "Har qatorga tasodifiy son berib, butun jadvalni saralaydi. 1 mln qatorda juda sekin. Muqobillar:",
    "- Tasodifiy ID diapazonidan: `WHERE id >= (random between min and max) ORDER BY id LIMIT 1`. ID'larda bo'shliq bo'lsa, taqsimot biroz notekis.",
    "- Oldindan tanlangan ID'lar ro'yxatini keshlab, PHP'da tasodifiy tanlash.",
    "- PostgreSQL: `TABLESAMPLE SYSTEM (1)` taxminiy namuna uchun.",
    "",
    "### Saralash xotirasi",
    "Indeks bilan hal qilib bo'lmasa (masalan, foydalanuvchi istalgan ustun bo'yicha saralaydi), xotira sozlamasi yordam beradi: MySQL `sort_buffer_size`, PostgreSQL `work_mem`. Lekin ularni global oshirish xavfli (11.24). Yaxshiroq yo'l: saralanadigan ustunlar ro'yxatini cheklash va eng ko'p ishlatiladiganlariga indeks qo'yish.",
    "",
    "### Laravel'da",
    "`latest()` faqat `created_at` bo'yicha. Barqaror tartib uchun `->latest()->latest('id')` yoki `->orderByDesc('created_at')->orderByDesc('id')`. Foydalanuvchi tanlaydigan saralash ustunlarini oq ro'yxat bilan tekshiring (13.21)."
  ],
  "examples": [
    {
      "title": "Saralashni indeks bilan yo'qotish",
      "lang": "sql",
      "code": [
        "EXPLAIN SELECT id, title FROM posts",
        "WHERE status = 'published' ORDER BY published_at DESC, id DESC LIMIT 20;",
        "-- Extra: Using where; Using filesort",
        "",
        "CREATE INDEX posts_status_published ON posts (status, published_at DESC, id DESC);",
        "",
        "-- Extra: Using index condition  (filesort yo'q)",
        "",
        "-- ORDER BY RAND() o'rniga",
        "SELECT id, title FROM posts",
        "WHERE id >= (SELECT FLOOR(RAND() * (SELECT MAX(id) FROM posts)))",
        "ORDER BY id LIMIT 1;"
      ]
    },
    {
      "title": "Laravel: barqaror va xavfsiz saralash",
      "lang": "php",
      "code": [
        "$allowed = ['published_at', 'title', 'views'];",
        "$sort = in_array($request->sort, $allowed, true) ? $request->sort : 'published_at';",
        "$dir = $request->dir === 'asc' ? 'asc' : 'desc';",
        "",
        "$posts = Post::where('status', 'published')",
        "    ->orderBy($sort, $dir)",
        "    ->orderBy('id', $dir)",
        "    ->paginate(20);"
      ]
    }
  ],
  "pitfalls": [
    "Unikal bo'lmagan ustun bo'yicha saralab, sahifalar orasida takroriy yoki yo'qolgan qatorlarni olish.",
    "`ORDER BY RAND()` ni katta jadvalda ishlatish.",
    "Aralash yo'nalishli `ORDER BY` uchun oddiy indeks yaratib, filesort yo'qoladi deb kutish.",
    "Foydalanuvchiga istalgan ustun bo'yicha saralashga ruxsat berish: indekssiz ustunlarda har so'rov to'liq saralaydi."
  ]
});
