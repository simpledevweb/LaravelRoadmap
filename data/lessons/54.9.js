/* Chuqur dars: 54.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("54.9", {
  "lesson": [
    "### Cache stampede (thundering herd)",
    "Mashhur kesh kaliti **tugagach**, bir vaqtda **ko'p so'rov** miss oladi va hammasi **bir xil og'ir so'rovni** bazaga yuboradi: DB yuki keskin oshadi, sekinlashadi yoki yiqiladi.",
    "",
    "### Yechimlar",
    "1. **Lock (mutex):** faqat bitta so'rov qayta hisoblaydi, qolganlar kutadi yoki eskisini oladi: `Cache::lock('rebuild:key', 10)`.",
    "2. **Stale-while-revalidate:** TTL tugagach eskisini bir oz beraveradi, fonda yangilaydi: Laravel `Cache::flexible([60, 300], fn)`.",
    "3. **Erta yangilash (probabilistic early expiration / XFetch):** TTL tugashiga yaqin tasodifan oldindan qayta hisoblash.",
    "4. **Fon'da isitish:** schedule jobi keshni muddat tugamasdan yangilaydi (kritik kalitlar).",
    "5. **TTL jitter:** bir vaqtda ko'p kalit tugamasligi (avalanche bilan).",
    "6. **Qayta hisoblashni cheklash:** queue'ga bitta job.",
    "",
    "### Laravel",
    "```php",
    "$value = Cache::flexible('report', [60, 600], fn () => Report::heavy());",
    "// yoki lock bilan",
    "$value = Cache::remember('k', 600, fn () => Cache::lock('k:lock', 10)->block(5, fn () => Report::heavy()));",
    "```",
    "",
    "### Qaysi kalitlar xavfli",
    "Juda ko'p o'qiladigan + qimmat hisoblanadigan (bosh sahifa, reyting, katta agregat).",
    "",
    "### Monitoring",
    "Kalit tugash vaqtlarida DB so'rovlari sakrashi, `lock wait` vaqtlari.",
    "",
    "### Kompromiss",
    "Lock — kutish (latency), stale — vaqtincha eski ma'lumot: ehtiyojga qarab tanlang."
  ],
  "examples": [
    {
      "title": "flexible va lock",
      "lang": "php",
      "code": [
        "// stale-while-revalidate",
        "$top = Cache::flexible('top:products', [60, 600], fn () => Product::topSelling());",
        "",
        "// lock bilan qayta hisoblash",
        "$data = Cache::get('report') ?? Cache::lock('report:lock', 15)->block(10, function () {",
        "    return Cache::remember('report', 600, fn () => Report::heavy());",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "Mashhur kalit tugaganda ko'p so'rov bazaga uriladi: lock/flexible.",
    "Lock vaqti hisoblash vaqtidan qisqa bo'lsa bir nechta jarayon baribir hisoblaydi.",
    "`block()` timeout oshsa kutish foydalanuvchiga sekinlik: stale ma'lumot qaytarish.",
    "TTL jitter'siz ko'p kalit bir vaqtda tugaydi (avalanche)."
  ]
});
