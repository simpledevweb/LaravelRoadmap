/* Chuqur dars: 17.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("17.9", {
  "lesson": [
    "### Lost update nima",
    "Ikki tranzaksiya bir qiymatni o'qiydi, har biri uni **ilova kodida** o'zgartiradi va natijani yozadi. Ikkinchi yozuv birinchisini bosib ketadi va birinchi o'zgarish izsiz yo'qoladi.",
    "",
    "Klassik misol: ombor qoldig'i 10.",
    "1. So'rov A o'qiydi: 10.",
    "2. So'rov B o'qiydi: 10.",
    "3. A yozadi: 9.",
    "4. B yozadi: 9.",
    "",
    "Ikki mahsulot sotildi, qoldiq esa 9, aslida 8 bo'lishi kerak edi. Bu READ COMMITTED'da (va MySQL REPEATABLE READ'da ham) DB xatosiz o'tkazib yuboradi, chunki har bir `UPDATE` o'z-o'zidan to'g'ri.",
    "",
    "### Eloquent'da tipik ko'rinishi",
    "`$product = Product::find($id); $product->stock -= 1; $product->save();` — PHP'da hisoblangan qiymat (`stock = 9`) yoziladi. Eloquent faqat o'zgargan ustunni yozadi, lekin **qiymatni** yozadi, ifodani emas.",
    "",
    "Xuddi shunday: hisoblagichlar (`views++`), balans, reyting, JSON ustundagi massivga element qo'shish (butun massiv qayta yoziladi va parallel qo'shilgan element yo'qoladi).",
    "",
    "### Yechimlar",
    "**1. Atomar UPDATE** — eng sodda va tez. Hisoblashni DB'ga topshiring:",
    "`UPDATE products SET stock = stock - 1 WHERE id = ? AND stock > 0`. Laravel: `decrement()`, `increment()`, `update(['x' => DB::raw('x + 1')])`. Ta'sirlangan qatorlar soni 0 bo'lsa, shart bajarilmadi (qoldiq yo'q).",
    "",
    "**2. Pessimistic lock** (17.10): `lockForUpdate()` bilan o'qish. Ikkinchi tranzaksiya birinchisi commit bo'lguncha kutadi va yangi qiymatni o'qiydi. Mantiq bitta SQL'ga sig'maganda (murakkab tekshiruvlar, bir nechta jadval).",
    "",
    "**3. Optimistic lock** (17.11): `version` ustuni va `WHERE version = ?`. Uzoq \"o'qib, tahrirlab, saqlash\" sikllari uchun (formalar).",
    "",
    "**4. Izolyatsiya darajasi:** PostgreSQL REPEATABLE READ va SERIALIZABLE lost update'ni aniqlaydi: ikkinchi tranzaksiya `could not serialize access due to concurrent update` (`40001`) oladi va qayta urinadi. MySQL REPEATABLE READ **aniqlamaydi**: `UPDATE` so'nggi versiyani ko'radi va yozib yuboradi.",
    "",
    "### Qaysi birini tanlash",
    "Atomar UPDATE bilan ifodalansa — doim shuni. Bu lock kutishsiz va ziddiyatsiz eng yaxshi yo'l. Murakkab mantiq — pessimistic. HTTP so'rovlar orasidagi tahrir — optimistic."
  ],
  "examples": [
    {
      "title": "Muammo va atomar yechim",
      "lang": "php",
      "code": [
        "// XATO: lost update",
        "$p = Product::find($id);",
        "$p->stock -= $qty;",
        "$p->save();",
        "",
        "// TO'G'RI: atomar va shartli",
        "$ok = Product::whereKey($id)",
        "    ->where('stock', '>=', $qty)",
        "    ->decrement('stock', $qty);",
        "",
        "if ($ok === 0) {",
        "    throw new OutOfStockException($id);",
        "}",
        "",
        "// Hisoblagich",
        "Post::whereKey($postId)->increment('views');"
      ]
    },
    {
      "title": "JSON massivga parallel qo'shish",
      "lang": "php",
      "code": [
        "// XATO: ikkala so'rov eski massivni o'qib, bittasining tegi yo'qoladi",
        "$post->tags = [...$post->tags, 'laravel'];",
        "$post->save();",
        "",
        "// TO'G'RI (PostgreSQL jsonb): DB ichida qo'shish",
        "Post::whereKey($post->id)->update([",
        "    'tags' => DB::raw(\"tags || '[\\\"laravel\\\"]'::jsonb\"),",
        "]);",
        "",
        "// Yoki normallashtirish: alohida post_tag pivot jadvali"
      ]
    }
  ],
  "pitfalls": [
    "Eloquent'da `$model->x -= 1; $model->save()` ni parallel yuk ostida ishlatish.",
    "`decrement()` dan keyin ta'sirlangan qatorlar sonini tekshirmaslik: qoldiq yetmagani sezilmaydi.",
    "MySQL REPEATABLE READ lost update'ni oldini oladi deb o'ylash.",
    "JSON ustundagi massivni PHP'da o'zgartirib, butunlay qayta yozish."
  ]
});
