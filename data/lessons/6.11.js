/* Chuqur dars: 6.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("6.11", {
  "lesson": [
    "### Guard clause",
    "**Guard clause (qo'riqchi shart)** — funksiya boshida noto'g'ri holatlarni tekshirib, **erta** `return`/`throw` qilish. Asosiy (\"baxtli yo'l\") mantiq ichma-ichlikdan chiqib, tekis yoziladi.",
    "",
    "### Oldin va keyin",
    "Ichma-ich `if` piramidasi o'rniga, har shart uchun alohida erta chiqish. \"Baxtli yo'l\" chap tomonda qoladi.",
    "",
    "### Qachon ishlatish",
    "- Kiritma validatsiyasi (precondition).",
    "- `null`/bo'sh tekshiruvi.",
    "- Ruxsat tekshiruvi.",
    "- Maxsus holat (bo'sh ro'yxat).",
    "",
    "### Foydalari",
    "- Ichma-ichlik kamayadi (sikllomatik murakkablik).",
    "- O'qish tezlashadi: shartlar tepada, asosiy ish pastda.",
    "- Aniq xato xabarlari.",
    "",
    "### Variantlar",
    "`return null/[]` (oddiy), `throw` (kutilmagan holat), `abort_if()`/`abort_unless()` (Laravel), `match` bilan, `??`/`?->` bilan qisqartirish, `continue` (tsikl ichida).",
    "",
    "### Ehtiyot",
    "- Juda ko'p guard (10+) — funksiya ko'p ish qilmoqda.",
    "- Bir funksiyada `return` turlari aralashmasin (`null`/`false`/`array`).",
    "- Ba'zilar bitta chiqish nuqtasini (single exit) afzal ko'radi; PHP'da erta chiqish odatiy va o'qiladi.",
    "",
    "### Laravel",
    "`abort_if(! $user->can('edit', $post), 403)`, `throw_unless()`, `FormRequest::authorize()`."
  ],
  "examples": [
    {
      "title": "Guard clauses",
      "lang": "php",
      "code": [
        "public function ship(Order $o): void",
        "{",
        "    if (!$o->isPaid()) { throw new DomainException('To\\'lanmagan buyurtma'); }",
        "    if ($o->lines === []) { throw new DomainException('Qatorlar yo\\'q'); }",
        "    if ($o->isShipped()) { return; }",
        "",
        "    // baxtli yo'l: tekis va aniq",
        "    $this->warehouse->pick($o);",
        "    $o->markShipped();",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "10+ guard — funksiya ko'p ish qilmoqda: bo'ling.",
    "Guard'larda turli turdagi qaytarish (`null`/`false`/`[]`) chaqiruvchini chalkashtiradi: bitta uslub.",
    "Guard xabarlari noaniq bo'lsa (`throw new Exception()`) xatoni topish qiyin.",
    "Tsikl ichida `return` o'rniga `continue` kerak bo'lgan joyni adashtirish."
  ]
});
