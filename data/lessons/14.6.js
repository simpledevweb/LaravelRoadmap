/* Chuqur dars: 14.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("14.6", {
  "lesson": [
    "### Denormalizatsiya",
    "**Ongli ravishda takrorlanish** qo'shish: o'qish tezligi uchun (JOIN va hisoblarni kamaytirish). Normalizatsiyadan **keyin**, **o'lchov** asosida.",
    "",
    "### Usullar",
    "- **Hisoblagich ustunlari:** `posts.comments_count`, `users.orders_total` (Laravel `withCount` o'rniga).",
    "- **Takroriy ustun:** `orders.customer_name` (tarixiy nusxa), `order_lines.unit_price` (sotuv paytidagi narx).",
    "- **Xulosa (summary) jadvallari:** kunlik statistika.",
    "- **Birlashtirilgan jadval:** tez-tez birga o'qiladigan 1:1.",
    "- **JSON snapshot:** buyurtma paytidagi manzil.",
    "- **Keshlangan natija** (Redis) — jadvalsiz muqobil.",
    "",
    "### Foydasi",
    "JOIN va aggregatsiyasiz tez o'qish; hisobotlar; masshtablash.",
    "",
    "### Narxi",
    "- **Sinxronizatsiya:** manba o'zgarsa nusxani yangilash kerak (trigger, event, job, `increment/decrement`).",
    "- **Anomaliyalar** xavfi, ko'proq saqlash.",
    "- Murakkab yozish mantig'i.",
    "",
    "### Qachon",
    "- O'qish yozishdan ko'p marta ko'p.",
    "- JOIN/aggregat o'lchangan darajada sekin.",
    "- Tarixiy qiymatni saqlash kerak (narx, manzil).",
    "",
    "### Qachon yo'q",
    "Erta (o'lchovsiz), tez-tez o'zgaradigan ma'lumot, kichik jadval.",
    "",
    "### Laravel",
    "`$post->increment('comments_count')`, `belongsTo(..., touch)`, `counterCache`-ga o'xshash observer, `withCount` (denormalizatsiyasiz alternativ).",
    "",
    "### Nazorat",
    "Davriy tekshiruv jobi (hisoblagichni qayta hisoblash), testlar."
  ],
  "examples": [
    {
      "title": "Hisoblagich",
      "lang": "php",
      "code": [
        "// Comment observer",
        "public function created(Comment $c): void { Post::whereKey($c->post_id)->increment('comments_count'); }",
        "public function deleted(Comment $c): void { Post::whereKey($c->post_id)->decrement('comments_count'); }",
        "// to'g'rilash (jadval bo'yicha)",
        "DB::statement('UPDATE posts p SET comments_count = (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id)');"
      ]
    }
  ],
  "pitfalls": [
    "Erta (o'lchovsiz) denormalizatsiya murakkablik va nomuvofiqlik beradi.",
    "Hisoblagich sinxronlanmasa (xato/poyga) noto'g'ri qiymat: davriy qayta hisoblash.",
    "Parallel yangilashda `$x = $x + 1` ilovada emas, atomar `increment()` ishlating.",
    "Tarixiy qiymat (narx) o'rniga joriy narxga JOIN qilish eski buyurtmalarni buzadi."
  ]
});
