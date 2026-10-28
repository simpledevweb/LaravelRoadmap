/* Chuqur dars: 27.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("27.8", {
  "lesson": [
    "### Edge case va boundary farqi",
    "Chegara qiymatlar (27.7) — diapazonning chetlari. **Edge case** — kengroq: odatdan tashqari, kam uchraydigan, lekin real hayotda albatta yuz beradigan holatlar. Ular ko'pincha talablarda yozilmagan va dasturchi \"bunday bo'lmaydi\" deb o'ylagan joylar.",
    "",
    "### Tekshiriladigan savollar ro'yxati",
    "**Ma'lumot:**",
    "- `null`, bo'sh satr, faqat bo'shliqlar, `0`, `'0'`, `false`.",
    "- Juda katta qiymatlar va uzun matnlar.",
    "- Maxsus belgilar: `'`, `\"`, `<script>`, `%`, `_` (LIKE uchun), Unicode, emoji, o'ngdan chapga yoziladigan matn.",
    "- O'zbek tili: `oʻ`, `o'`, `o‘`, `gʻ` — turli apostroflar bir xil so'z (qidiruv va solishtirishda normallashtirish).",
    "- Turli formatlar: telefon `+998 90...`, `90...`, `8 90...`; sana `10.06.2025` va `2025-06-10`.",
    "",
    "**Holat:**",
    "- Bog'liq yozuv yo'q (o'chirilgan mijozning buyurtmasi, soft-deleted mahsulot).",
    "- Takroriy amal (tugma ikki marta bosilgan, webhook ikki marta keldi, 24.8).",
    "- Noto'g'ri tartib (bekor qilish to'lovdan oldin keldi).",
    "- Parallel o'zgarish (17.9) — unit testda emas, integratsiya testida.",
    "- Bo'sh kolleksiya ustida agregat: `max([])`, `average` nolga bo'lish.",
    "",
    "**Tashqi:**",
    "- Tashqi API sekin, xato yoki kutilmagan format qaytardi (27.6).",
    "- Valyuta kursi 0 yoki manfiy.",
    "",
    "### Prioritet",
    "Barcha edge case'larni test qilib bo'lmaydi. Tanlash: **ehtimollik × oqibat**. Pul, ruxsatlar va ma'lumot yaxlitligi bilan bog'liqlar — birinchi navbatda. Production'da yuz bergan har xato — yangi edge case testi (regressiya, 30.10).",
    "",
    "### Kodda himoya",
    "Edge case topilganda kodni ham himoyalang: aniq validatsiya, `null` uchun qiymat obyektlari (`Money::zero()`), aniq exception'lar. Test faqat xatoni topadi, oldini olish kod vazifasi."
  ],
  "examples": [
    {
      "title": "Edge case'lar dataset'i",
      "lang": "php",
      "code": [
        "it('normalizes product search query', function (string $input, string $expected) {",
        "    expect(SearchQuery::normalize($input))->toBe($expected);",
        "})->with([",
        "    'trims spaces' => ['  telefon  ', 'telefon'],",
        "    'collapses inner spaces' => ['smart   soat', 'smart soat'],",
        "    'unifies okina variants' => [\"o'yinchoq\", 'oʻyinchoq'],",
        "    'unifies left quote' => ['o‘yinchoq', 'oʻyinchoq'],",
        "    'lowercases unicode' => ['ҚИЗИЛ', 'қизил'],",
        "    'escapes like wildcards' => ['100%', '100\\\\%'],",
        "    'empty stays empty' => ['   ', ''],",
        "]);",
        "",
        "it('returns zero average for empty orders', function () {",
        "    expect(OrderStats::averageTotal([]))->toBe(0);",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "\"Bunday bo'lmaydi\" deb edge case'larni e'tiborsiz qoldirish.",
    "O'zbek tilidagi turli apostroflarni normallashtirmaslik: qidiruv natijalari yo'qoladi.",
    "Production xatolarini tuzatib, regressiya testini yozmaslik.",
    "Barcha mumkin bo'lgan edge case'larni test qilishga urinib, muhimlarini yo'qotish."
  ]
});
