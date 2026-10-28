/* Chuqur dars: 11.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("11.4", {
  "lesson": [
    "### json va jsonb farqi",
    "- `json`: kiritilgan matnni aynan saqlaydi (bo'shliqlar, kalit tartibi, dublikat kalitlar). Har o'qishda qayta parse qilinadi.",
    "- `jsonb`: binar ko'rinishda saqlanadi. Dublikat kalitlar olib tashlanadi (oxirgisi qoladi), kalit tartibi saqlanmaydi. Yozishda biroz sekinroq, lekin o'qish, operatorlar va **indekslash** faqat shunda to'liq ishlaydi.",
    "",
    "Amalda deyarli doim `jsonb`. `json` faqat kelgan payload'ni o'zgartirmasdan arxivlash kerak bo'lsa (masalan, webhook logi).",
    "",
    "### Asosiy operatorlar",
    "- `->` JSON qaytaradi, `->>` matn qaytaradi: `attrs->'size'`, `attrs->>'color'`.",
    "- `#>` va `#>>` yo'l bo'yicha: `data #>> '{address,city}'`.",
    "- `@>` o'z ichiga oladi: `attrs @> '{\"color\":\"red\"}'`.",
    "- `?` kalit bormi, `?|` biri bormi, `?&` hammasi bormi.",
    "- `||` birlashtirish, `-` kalitni o'chirish, `jsonb_set()` qiymatni almashtirish.",
    "- SQL/JSON path (12+): `jsonb_path_query(data, '$.items[*] ? (@.qty > 5)')`.",
    "",
    "### Indekslash",
    "- **GIN `jsonb_ops`** (default): `@>`, `?`, `?|`, `?&` ni qo'llaydi.",
    "- **GIN `jsonb_path_ops`**: faqat `@>` (va jsonpath), lekin indeks ixchamroq va tezroq.",
    "- **Expression B-tree:** bitta maydon bo'yicha tez-tez filtr yoki sort bo'lsa: `CREATE INDEX ON products ((attrs->>'sku'))`.",
    "",
    "Muhim: `attrs->>'color' = 'red'` sharti GIN indeksni **ishlatmaydi**. GIN uchun `attrs @> '{\"color\":\"red\"}'` yozing yoki shu ifodaga expression indeks yarating.",
    "",
    "### Qachon jsonb, qachon ustun",
    "jsonb mos keladi: tuzilishi har xil atributlar (mahsulot xususiyatlari), tashqi API payload'lari, sozlamalar, audit ma'lumotlari. Mos kelmaydi: tez-tez JOIN, FK, agregatsiya qilinadigan va har qatorda bo'ladigan maydonlar. Ular oddiy ustun bo'lishi kerak. jsonb ichidagi qiymatlar uchun planner statistikasi yo'q, shuning uchun taxminlar noto'g'ri chiqadi.",
    "",
    "### Laravel'da",
    "`$table->jsonb('attributes')`, model'da `'attributes' => 'array'` yoki `AsArrayObject`/`AsCollection` cast. So'rovlar: `where('attributes->color', 'red')` (`->>` ga aylanadi), `whereJsonContains('attributes->tags', 'sale')` (`@>` ga aylanadi), `whereJsonLength`. Yangilash: `$product->update(['attributes->color' => 'blue'])` — `jsonb_set` ishlatiladi."
  ],
  "examples": [
    {
      "title": "GIN indeks va to'g'ri operator",
      "lang": "sql",
      "code": [
        "CREATE INDEX products_attrs_gin ON products USING gin (attributes jsonb_path_ops);",
        "",
        "-- Indeks ishlatiladi",
        "SELECT id FROM products WHERE attributes @> '{\"color\": \"red\"}';",
        "",
        "-- Bu GIN'ni ishlatmaydi: expression indeks kerak",
        "SELECT id FROM products WHERE attributes->>'color' = 'red';",
        "CREATE INDEX products_color ON products ((attributes->>'color'));"
      ]
    },
    {
      "title": "Eloquent bilan jsonb",
      "lang": "php",
      "code": [
        "class Product extends Model",
        "{",
        "    protected $casts = ['attributes' => 'array'];",
        "}",
        "",
        "$red = Product::whereJsonContains('attributes', ['color' => 'red'])->get();",
        "$sale = Product::whereJsonContains('attributes->tags', 'sale')->count();",
        "",
        "Product::whereKey($id)->update(['attributes->stock' => 0]);"
      ],
      "note": "Model'da `attributes` nomi Eloquent ichki xususiyati bilan to'qnashadi. Real loyihada `attrs` yoki `properties` deb nomlang."
    }
  ],
  "pitfalls": [
    "`->>` bilan filtr yozib, GIN indeks ishlaydi deb kutish: GIN faqat `@>`, `?` kabi operatorlarni qo'llaydi.",
    "Asosiy biznes maydonlarini (status, user_id, total) jsonb ichiga yashirish: FK, statistika va oddiy indekslar yo'qoladi.",
    "Katta jsonb hujjatni har safar to'liq qayta yozish: har `UPDATE` butun qiymatni yangi tuple sifatida yozadi, bloat va WAL ko'payadi.",
    "`->>` matn qaytarishini unutish: `(attrs->>'qty')::int > 5` deb aniq cast qilmasa, matn sifatida taqqoslanadi."
  ]
});
