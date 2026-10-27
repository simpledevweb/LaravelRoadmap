/* Chuqur dars: 5.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("5.12", {
  "lesson": [
    "### Unit of Work",
    "**Unit of Work (UoW)** — biznes tranzaksiya davomida o'zgargan obyektlarni **kuzatadi** va oxirida hammasini **bitta tranzaksiyada** bazaga yozadi (`commit`). Yozish tartibini va to'qnashuvlarni boshqaradi.",
    "",
    "### Muammo",
    "Bir amal bir nechta obyektni o'zgartiradi (buyurtma + ombor + hisob). Har birini alohida `save()` qilsangiz qisman yozilish xavfi bor: bir qismi saqlandi, keyingisi xato berdi.",
    "",
    "### Tuzilma",
    "- `registerNew()`, `registerDirty()`, `registerDeleted()` — kuzatish.",
    "- `commit()` — hammasini bir tranzaksiyada yozadi, xatoda `rollback`.",
    "- **Identity Map:** bir ID — bir obyekt nusxasi.",
    "",
    "### Laravel'da",
    "- Eloquent'da UoW yo'q (har `save()` darrov yoziladi). Qo'lda: `DB::transaction(function () { ... })`.",
    "- Doctrine ORM'da `EntityManager::flush()` — to'liq UoW.",
    "- Laravel'da ko'pincha `DB::transaction()` bilan Action ichida yetarli.",
    "",
    "### Qachon kerak",
    "- Murakkab domen (DDD) va ko'p agregat.",
    "- Ma'lumotlarni to'plab, bir martada yozish (batch).",
    "- Doctrine kabi ORM ishlatilganda.",
    "",
    "### Ehtiyot",
    "- Eloquent bilan to'liq UoW yozish ortiqcha murakkablik.",
    "- Transaksiya chegarasi (use case) bo'ylab bo'lsin, qisqa.",
    "- Tranzaksiya ichida tashqi API/email yuborish xavfli (`afterCommit`)."
  ],
  "examples": [
    {
      "title": "DB::transaction bilan UoW g'oyasi",
      "lang": "php",
      "code": [
        "final class PlaceOrder",
        "{",
        "    public function __invoke(Cart $cart): Order",
        "    {",
        "        return DB::transaction(function () use ($cart) {         // bitta birlik",
        "            $order = Order::create([...]);",
        "            foreach ($cart->items as $i) { $order->lines()->create([...]); Stock::where('sku', $i->sku)->decrement('qty', $i->qty); }",
        "            return $order;                                        // xato bo'lsa hammasi rollback",
        "        });",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Eloquent bilan to'liq UoW yozish ortiqcha: `DB::transaction` ko'pincha yetarli.",
    "Tranzaksiya ichida email/HTTP yuborish: rollback bo'lsa ham yuborilib bo'lgan (`afterCommit`).",
    "Uzoq tranzaksiya qulflarni ushlab turib boshqa so'rovlarni to'sadi.",
    "Doctrine'da `flush()` ni tsikl ichida chaqirish samaradorlikni tushiradi."
  ]
});
