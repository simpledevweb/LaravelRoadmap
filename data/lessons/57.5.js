/* Chuqur dars: 57.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("57.5", {
  "lesson": [
    "### Variable Inspection",
    "To'xtagan joyda o'zgaruvchilarning **qiymatlari va tuzilmasini** ko'rish: IDE'ning Variables panelida.",
    "",
    "### Nima ko'rinadi",
    "- **Lokal o'zgaruvchilar** va parametrlar.",
    "- `$this` va uning property'lari.",
    "- **Superglobals:** `$_GET`, `$_POST`, `$_SERVER`, `$_SESSION`, `$_COOKIE`.",
    "- **Konstantalar.**",
    "- Massiv va obyektlar daraxt shaklida kengayadi (ichma-ich).",
    "",
    "### Ma'lumot turlari",
    "Tip (`string(5)`, `array(3)`, `object(Order)`), uzunlik, qiymat. `null`, `false`, bo'sh satr farqini aniq ko'rasiz (`var_dump` kabi).",
    "",
    "### Qiymatni o'zgartirish",
    "PhpStorm \"Set Value\" bilan joriy o'zgaruvchini o'zgartirib, \"agar bu qiymat bo'lsa nima bo'lardi\" ni sinab ko'rish mumkin (faqat debug sessiya ichida).",
    "",
    "### Evaluate Expression",
    "Istalgan PHP ifodani joriy kontekstda hisoblash: `$order->total()`, `count($items)`, `array_sum(array_column($rows, 'price'))`. Yon ta'sirli ifodalarni (yozish, DB o'zgartirish) ehtiyot bilan.",
    "",
    "### Chegaralar",
    "- `xdebug.var_display_max_depth`, `var_display_max_children`, `var_display_max_data` — katta strukturalar uchun kesiladi; debug paytida oshirish mumkin (xotira/tezlik).",
    "- `xdebug.max_nesting_level` (rekursiya chuqurligi).",
    "- Lazy obyektlar (8.4) ko'rilganda initsializatsiya qilinishi mumkin.",
    "",
    "### Laravel'da",
    "`$request->all()`, Eloquent modelning `getAttributes()` va `getOriginal()` yordamida holatni ko'rish; Collection ichini ochib ko'rish.",
    "",
    "### Maxfiylik",
    "Debug paytida parol/token ko'rinadi: ekranni ulashishda ehtiyot."
  ],
  "examples": [
    {
      "title": "Evaluate Expression",
      "lang": "php",
      "code": [
        "// To'xtagan joyda Evaluate Expression oynasida:",
        "$order->lines->sum(fn ($l) => $l->qty * $l->price)",
        "array_map(fn ($l) => $l->sku, $order->lines->all())",
        "$order->getOriginal('status')"
      ]
    }
  ],
  "pitfalls": [
    "Evaluate'da yozuvchi ifoda (DB update) haqiqiy ma'lumotni o'zgartiradi.",
    "Katta massiv/obyekt `var_display_max_*` bilan kesilgan: to'liq ko'rmayapsiz.",
    "Parol/token debug panelida ko'rinadi: ekranni ulashishda ehtiyot bo'ling.",
    "Lazy obyektni ko'rish initsializatsiyani ishga tushirishi mumkin."
  ]
});
