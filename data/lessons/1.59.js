/* Chuqur dars: 1.59. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.59", {
  "lesson": [
    "### JSON nima",
    "JSON (JavaScript Object Notation) — ma'lumot almashish uchun yengil matn formati. REST API, konfiguratsiya, ma'lumot saqlashda keng ishlatiladi. Turlari: obyekt `{}`, massiv `[]`, satr, son, `true/false`, `null`.",
    "",
    "### PHP funksiyalari",
    "- `json_encode($qiymat, $flags)` — PHP qiymatini JSON satriga.",
    "- `json_decode($json, $assoc, $depth, $flags)` — JSON satrini PHP'ga.",
    "- `json_last_error()` va `json_last_error_msg()` — xato haqida.",
    "",
    "### Encode",
    "Assotsiativ massiv → JSON obyekt, ketma-ket (list) massiv → JSON massiv. Foydali bayroqlar: `JSON_PRETTY_PRINT`, `JSON_UNESCAPED_UNICODE` (o'zbekcha belgilarni `\\u...` qilmaydi), `JSON_UNESCAPED_SLASHES`, `JSON_THROW_ON_ERROR`.",
    "",
    "### Decode",
    "`json_decode($s)` obyekt (`stdClass`) qaytaradi, `json_decode($s, true)` — assotsiativ massiv. Xato bo'lsa `null` qaytadi, lekin `null` ham to'g'ri JSON bo'lishi mumkin: shuning uchun `JSON_THROW_ON_ERROR` bilan `JsonException` ushlang.",
    "",
    "### API javobi",
    "`header('Content-Type: application/json; charset=utf-8')` yuboring. So'rov tanasi (JSON): `json_decode(file_get_contents('php://input'), true)`.",
    "",
    "### JsonSerializable",
    "Obyektni o'zingiz belgilagan shaklda JSON'ga aylantirish: `implements JsonSerializable` va `jsonSerialize(): array`.",
    "",
    "### Cheklovlar",
    "- Juda katta sonlar (64-bit dan katta) aniqlikni yo'qotadi; ID'ni satr qiling.",
    "- UTF-8 bo'lmagan satr `json_encode`'da xato beradi.",
    "- Funksiya va resurs JSON'da ifodalanmaydi.",
    "",
    "### JSON ↔ PHP tiplari",
    "| JSON | PHP (assoc=true) | PHP (assoc=false) |",
    "|---|---|---|",
    "| `{}` obyekt | assotsiativ massiv | `stdClass` |",
    "| `[]` massiv | massiv | massiv |",
    "| satr | string | string |",
    "| son | int/float | int/float |",
    "| `true/false` | bool | bool |",
    "| `null` | null | null |",
    "",
    "### encode xatti-harakati",
    "- Ketma-ket 0..n-1 kalitli massiv → JSON massiv; boshqasi → JSON obyekt. Bo'sh massiv `[]`; bo'sh obyekt kerak bo'lsa `new stdClass` yoki `JSON_FORCE_OBJECT`.",
    "- Obyektning faqat `public` property'lari kiradi (yoki `JsonSerializable`).",
    "- `float` aniqligi `serialize_precision` ga bog'liq.",
    "- Bayroqlar: `JSON_NUMERIC_CHECK` (sonli satrni songa; ehtiyot bo'ling), `JSON_PRESERVE_ZERO_FRACTION` (`10.0`), `JSON_PARTIAL_OUTPUT_ON_ERROR`, `JSON_INVALID_UTF8_SUBSTITUTE`.",
    "",
    "### decode xatti-harakati",
    "`depth` (chuqurlik chegarasi, default 512). `JSON_BIGINT_AS_STRING` katta sonlarni satr qiladi. `JSON_OBJECT_AS_ARRAY` = `assoc=true`. Bo'sh satr `\"\"` — xato (Syntax error).",
    "",
    "### Xato kodlari",
    "`JSON_ERROR_SYNTAX`, `JSON_ERROR_DEPTH`, `JSON_ERROR_UTF8`, `JSON_ERROR_INF_OR_NAN`. `JSON_THROW_ON_ERROR` bilan `JsonException` va `getCode()`.",
    "",
    "### API qoidalari",
    "- `Content-Type: application/json; charset=utf-8`.",
    "- Kiritma: `file_get_contents('php://input')` → decode → **validatsiya**.",
    "- Xato javoblari ham JSON bo'lsin: `{\"error\": \"...\"}` va to'g'ri HTTP status.",
    "- Vaqt: ISO 8601 satr; pul: tiyin int yoki satr.",
    "",
    "### Laravel",
    "`response()->json([...], 201)`, `JsonResource`, `$request->json()`, `$request->validate()`; massiv/Collection avtomatik JSON'ga aylanadi (`toJson()`)."
  ],
  "examples": [
    {
      "title": "Encode / decode",
      "lang": "php",
      "code": [
        "<?php",
        "$data = ['ism' => 'Oʻtkir', 'yosh' => 30, 'rollar' => ['admin', 'dev']];",
        "$json = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);",
        "echo $json;",
        "",
        "$back = json_decode($json, true);",
        "echo $back['rollar'][1];       // dev"
      ]
    },
    {
      "title": "Xatoni ushlash",
      "lang": "php",
      "code": [
        "<?php",
        "try {",
        "    $d = json_decode('{noto\\'g\\'ri', true, 512, JSON_THROW_ON_ERROR);",
        "} catch (JsonException $e) {",
        "    echo 'JSON xato: ', $e->getMessage();",
        "}"
      ]
    },
    {
      "title": "JsonSerializable",
      "lang": "php",
      "code": [
        "<?php",
        "final class User implements JsonSerializable",
        "{",
        "    public function __construct(private int $id, private string $email, private string $password) {}",
        "    public function jsonSerialize(): array { return ['id' => $this->id, 'email' => $this->email]; } // parol chiqmaydi",
        "}",
        "echo json_encode(new User(1, 'a@b.uz', 'secret'));"
      ]
    },
    {
      "title": "JSON API endpoint",
      "lang": "php",
      "code": [
        "<?php",
        "header('Content-Type: application/json; charset=utf-8');",
        "try {",
        "    $in = json_decode(file_get_contents('php://input'), true, 512, JSON_THROW_ON_ERROR);",
        "} catch (JsonException) {",
        "    http_response_code(400);",
        "    echo json_encode(['error' => 'JSON noto\\'g\\'ri']); exit;",
        "}",
        "$name = trim((string) ($in['name'] ?? ''));",
        "if ($name === '') { http_response_code(422); echo json_encode(['error' => 'name kerak']); exit; }",
        "http_response_code(201);",
        "echo json_encode(['ok' => true, 'name' => $name], JSON_UNESCAPED_UNICODE);"
      ]
    }
  ],
  "pitfalls": [
    "`json_decode` xatoda `null` qaytaradi, `null` ham to'g'ri JSON: `JSON_THROW_ON_ERROR`.",
    "`JSON_UNESCAPED_UNICODE` siz o'zbekcha belgilar `\\u02bb` ko'rinishida chiqadi.",
    "Parol kabi maxfiy maydonlar `public` property bo'lsa JSON'ga tushib ketadi: `JsonSerializable` yoki DTO.",
    "UTF-8 bo'lmagan satr `json_encode` ni buzadi (`false`): kodlashni tekshiring."
  ]
});
