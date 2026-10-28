/* Chuqur dars: 18.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("18.6", {
  "lesson": [
    "### JSON asoslari",
    "JSON (JavaScript Object Notation, RFC 8259) — matnli ma'lumot formati. Faqat olti tur bor:",
    "- obyekt `{\"key\": value}` (kalitlar faqat qo'sh tirnoqli string),",
    "- massiv `[1, 2, 3]`,",
    "- string `\"matn\"` (faqat qo'sh tirnoq, UTF-8),",
    "- son `42`, `3.14`, `-1e10` (butun va kasr farqlanmaydi),",
    "- `true` / `false`,",
    "- `null`.",
    "",
    "Izohlar, oxirgi vergul (trailing comma), sana tipi, `undefined`, `NaN` va `Infinity` **yo'q**.",
    "",
    "### PHP'da",
    "`json_encode($value, $flags)` va `json_decode($json, $assoc, $depth, $flags)`. Muhim flaglar:",
    "- `JSON_THROW_ON_ERROR` (PHP 7.3+): xatoda `JsonException` tashlaydi. Usiz `json_decode` noto'g'ri JSON'da jim `null` qaytaradi va bu haqiqiy `null` dan farq qilmaydi.",
    "- `JSON_UNESCAPED_UNICODE`: kirill va o'zbek harflarini `\\u0447` ko'rinishiga aylantirmaydi. Javob kichikroq va o'qiladi.",
    "- `JSON_UNESCAPED_SLASHES`: `/` ni `\\/` qilmaydi.",
    "- `JSON_PRESERVE_ZERO_FRACTION`: `10.0` ni `10` qilmaydi.",
    "- `JSON_PRETTY_PRINT`: debug va log uchun.",
    "- `json_decode(..., true)` assotsiativ massiv, `false` (default) esa `stdClass`.",
    "",
    "PHP 8.3+ da `json_validate()`: decode qilmasdan to'g'riligini tekshiradi.",
    "",
    "### Tuzoqlar",
    "**Katta butun sonlar.** JavaScript'da barcha sonlar IEEE 754 double: 2^53 (9 007 199 254 740 992) dan katta butun sonlar aniqligini yo'qotadi. Twitter/X ID'lari, Snowflake ID'lar, ba'zi bank raqamlari — string sifatida yuboring.",
    "",
    "**Kasr sonlar va pul.** `0.1 + 0.2 = 0.30000000000000004`. Pulni butun son yoki string sifatida (18.5).",
    "",
    "**Bo'sh obyekt va bo'sh massiv.** PHP'da `[]` bo'sh massiv `json_encode` da `[]` bo'ladi. Obyekt kerak bo'lsa (`{}`), `(object) []`, `new stdClass` yoki `JSON_FORCE_OBJECT`. Assotsiativ massivdan `unset` qilib, kalitlari `0, 2, 3` bo'lib qolgan massiv obyekt (`{\"0\":..., \"2\":...}`) bo'lib chiqadi. `array_values()` qiling (Laravel kolleksiyada `->values()`).",
    "",
    "**Sanalar.** Tip yo'q, kelishuv kerak: ISO 8601 string.",
    "",
    "**Chuqurlik va hajm.** Default `depth = 512`. Katta payload'lar uchun `post_max_size` va web server limitlari.",
    "",
    "### Laravel'da",
    "- `response()->json($data, $status, $headers, $options)`.",
    "- `$request->json()` / `$request->input()`: JSON body avtomatik parse qilinadi (`Content-Type: application/json` bo'lsa).",
    "- Model va kolleksiya `toJson()`, `JsonSerializable` va API Resource'lar.",
    "- Validatsiya: `'payload' => 'json'` qoidasi (string JSON'ni tekshiradi)."
  ],
  "examples": [
    {
      "title": "Xavfsiz encode va decode",
      "lang": "php",
      "code": [
        "try {",
        "    $data = json_decode($payload, associative: true, flags: JSON_THROW_ON_ERROR);",
        "} catch (JsonException $e) {",
        "    abort(400, 'Noto\\'g\\'ri JSON: ' . $e->getMessage());",
        "}",
        "",
        "$json = json_encode(",
        "    ['name' => 'Ўзбекистон', 'url' => 'https://x.uz/a', 'price' => 10.0],",
        "    JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRESERVE_ZERO_FRACTION",
        ");",
        "// {\"name\":\"Ўзбекистон\",\"url\":\"https://x.uz/a\",\"price\":10.0}"
      ]
    },
    {
      "title": "Bo'sh obyekt va massiv tuzoqlari",
      "lang": "php",
      "code": [
        "json_encode(['settings' => []]);              // {\"settings\":[]}",
        "json_encode(['settings' => (object) []]);     // {\"settings\":{}}",
        "",
        "$items = [10, 20, 30];",
        "unset($items[1]);",
        "json_encode($items);                          // {\"0\":10,\"2\":30}  obyekt!",
        "json_encode(array_values($items));            // [10,30]",
        "",
        "collect([1, 2, 3, 4])->filter(fn ($x) => $x > 2)->toJson();          // {\"2\":3,\"3\":4}",
        "collect([1, 2, 3, 4])->filter(fn ($x) => $x > 2)->values()->toJson(); // [3,4]"
      ]
    }
  ],
  "pitfalls": [
    "`json_decode` ni `JSON_THROW_ON_ERROR` siz ishlatish: noto'g'ri JSON jim `null` bo'ladi.",
    "Katta ID'larni son sifatida yuborish: JavaScript'da oxirgi raqamlar o'zgaradi.",
    "Kolleksiyani `filter()` dan keyin `values()` siz qaytarish: massiv o'rniga obyekt.",
    "Bo'sh sozlamalar obyektini `[]` sifatida qaytarish: kuchli tipli mijozlar (Swift, Kotlin) parse qila olmaydi."
  ]
});
