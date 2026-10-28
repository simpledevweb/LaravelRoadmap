/* Chuqur dars: 16.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("16.11", {
  "lesson": [
    "### Offset paginatsiya",
    "`LIMIT 20 OFFSET 40000` — DB 40 020 ta qatorni tartib bo'yicha o'qiydi va dastlabki 40 000 tasini tashlab yuboradi. Indeks bo'lsa ham, uni 40 000 qadam yurish kerak. Sahifa raqami oshgan sari so'rov chiziqli sekinlashadi: 1-sahifa 2 ms, 2000-sahifa 800 ms.",
    "",
    "Qo'shimcha muammolar:",
    "- **Barqarorlik:** foydalanuvchi 2-sahifani o'qiyotganda yangi yozuv qo'shilsa, 3-sahifada 2-sahifaning oxirgi elementi takrorlanadi. Yozuv o'chirilsa, bittasi tushib qoladi.",
    "- **COUNT(*):** Laravel'ning `paginate()` umumiy sahifalar soni uchun qo'shimcha `COUNT(*)` so'rovini bajaradi. Katta jadvalda (ayniqsa PostgreSQL va InnoDB'da) bu o'zi sekin.",
    "",
    "Afzalligi: istalgan sahifaga to'g'ridan-to'g'ri o'tish (\"57-sahifa\") va umumiy sonni ko'rsatish. Admin jadvallari va kichik to'plamlar uchun qulay.",
    "",
    "### Cursor (keyset) paginatsiya",
    "Oxirgi ko'rilgan elementning tartib kaliti eslab qolinadi va keyingi sahifa undan boshlanadi:",
    "`WHERE (created_at, id) < ('2025-06-10 12:00:00', 98231) ORDER BY created_at DESC, id DESC LIMIT 20`.",
    "",
    "DB indeks bo'yicha to'g'ridan-to'g'ri kerakli joyga sakraydi. **Har sahifa bir xil tez**, qancha chuqur bo'lsa ham. Yangi yozuvlar qo'shilsa ham dublikat va tushib qolish yo'q.",
    "",
    "Talablar va cheklovlar:",
    "- Tartib kaliti **unikal** bo'lishi kerak. `created_at` takrorlanishi mumkin, shuning uchun ikkinchi kalit `id` qo'shiladi.",
    "- Shu tartibga mos composite indeks: `(created_at DESC, id DESC)` yoki filtr bilan `(user_id, created_at, id)`.",
    "- Ixtiyoriy sahifaga sakrab bo'lmaydi, faqat \"keyingi/oldingi\".",
    "- Umumiy son yo'q (kerak bo'lsa, alohida taxminiy son).",
    "- Nullable ustun bo'yicha tartib murakkab.",
    "",
    "### Laravel'dagi uch variant",
    "- `paginate(20)`: offset + `COUNT(*)`. Sahifa raqamlari bilan.",
    "- `simplePaginate(20)`: offset, `COUNT` siz. `LIMIT 21` bilan \"keyingisi bormi\" ni aniqlaydi.",
    "- `cursorPaginate(20)` (Laravel 8.41+): keyset. Javobda `next_cursor` va `prev_cursor` (base64 kodlangan kalit qiymatlari). `orderBy` dagi barcha ustunlar natijada bo'lishi kerak.",
    "",
    "### Qachon qaysi biri",
    "| Holat | Tanlov |",
    "|---|---|",
    "| Admin jadvali, kichik to'plam, sahifa raqamlari kerak | `paginate` |",
    "| Katta jadval, \"keyingi\" tugmasi yetarli | `simplePaginate` |",
    "| Cheksiz lenta, mobil API, katta va o'zgaruvchan to'plam | `cursorPaginate` |",
    "| Fon jarayonida butun jadvalni aylanish | `chunkById` / `lazyById` |"
  ],
  "examples": [
    {
      "title": "Offset va keyset SQL",
      "lang": "sql",
      "code": [
        "-- Offset: chuqur sahifada sekin",
        "SELECT id, title FROM posts ORDER BY created_at DESC, id DESC LIMIT 20 OFFSET 40000;",
        "",
        "-- Keyset: har sahifa bir xil tez",
        "CREATE INDEX posts_created_id ON posts (created_at DESC, id DESC);",
        "SELECT id, title, created_at FROM posts",
        "WHERE (created_at, id) < ('2025-06-10 12:00:00', 98231)",
        "ORDER BY created_at DESC, id DESC",
        "LIMIT 20;"
      ],
      "note": "Qator taqqoslash `(a, b) < (x, y)` PostgreSQL va MySQL 8 da ishlaydi. MySQL eski versiyalarida indeksdan yomon foydalanishi mumkin, shunda `a < x OR (a = x AND b < y)` ko'rinishida yoziladi."
    },
    {
      "title": "Laravel API",
      "lang": "php",
      "code": [
        "public function index(Request $request)",
        "{",
        "    $posts = Post::query()",
        "        ->select(['id', 'title', 'created_at'])",
        "        ->orderByDesc('created_at')",
        "        ->orderByDesc('id')",
        "        ->cursorPaginate(20);",
        "",
        "    return PostResource::collection($posts);",
        "}",
        "",
        "// GET /api/posts?cursor=eyJjcmVhdGVkX2F0Ijoi...",
        "// Javob: { data: [...], meta: { next_cursor, prev_cursor, per_page } }"
      ]
    }
  ],
  "pitfalls": [
    "Cursor paginatsiyada faqat takrorlanuvchi ustun (`created_at`) bo'yicha tartiblash: bir xil vaqtli yozuvlar tushib qoladi yoki takrorlanadi.",
    "Keyset uchun mos composite indeks yaratmaslik: cursor ham sekin bo'ladi.",
    "Millionlab qatorli jadvalda `paginate()` ishlatish: har sahifada og'ir `COUNT(*)`.",
    "Fon jarayonida `chunk()` (offset) bilan aylanib, iteratsiyada yozuvlarni o'zgartirish: qatorlar o'tkazib yuboriladi."
  ]
});
