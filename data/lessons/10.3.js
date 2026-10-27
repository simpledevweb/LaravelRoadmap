/* Chuqur dars: 10.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("10.3", {
  "lesson": [
    "### Ma'lumot turlarini tanlash",
    "Eng **kichik**, lekin yetarli tur: kam xotira, kam disk, tez indeks.",
    "",
    "### Sonlar",
    "- `TINYINT` (1 bayt), `SMALLINT` (2), `MEDIUMINT` (3), `INT` (4: ±2.1 mlrd, `UNSIGNED` 4.29 mlrd), `BIGINT` (8).",
    "- `DECIMAL(p, s)` — **pul** va aniq hisob (`DECIMAL(19,4)`). `FLOAT/DOUBLE` — taxminiy (pul uchun emas).",
    "- `BOOLEAN` = `TINYINT(1)`. `INT(11)` dagi \"11\" faqat ko'rsatish kengligi (8.0 da deprecated), hajmni o'zgartirmaydi.",
    "",
    "### Matn",
    "- `CHAR(n)` (qat'iy uzunlik), `VARCHAR(n)` (o'zgaruvchan; `n` — **belgi**, utf8mb4 da 4n bayt gacha), `TEXT`/`MEDIUMTEXT`/`LONGTEXT`, `ENUM`, `SET`.",
    "- `BINARY/VARBINARY/BLOB` — xom bayt.",
    "- Uzun matnni indekslash uchun prefiks yoki full-text.",
    "",
    "### Sana va vaqt",
    "- `DATE`, `TIME`, `DATETIME` (1000–9999, zonasiz), `TIMESTAMP` (1970–**2038**, UTC saqlab sessiya zonasiga o'giradi), `YEAR`. Kasr sekund: `DATETIME(3)`.",
    "- Laravel `timestamps()` → `TIMESTAMP`; 2038 uchun `dateTime()` ni ko'ring.",
    "",
    "### JSON, UUID",
    "`JSON` (14-mavzu). UUID: `CHAR(36)` (katta) yoki `BINARY(16)` (kichik; Laravel `uuid()` = `CHAR(36)`).",
    "",
    "### Laravel migration moslashuvi",
    "`id()` → `BIGINT UNSIGNED AUTO_INCREMENT`, `string()` → `VARCHAR(255)`, `text()`, `integer()`, `decimal('price', 12, 2)`, `boolean()`, `json()`, `timestamp()`.",
    "",
    "### Qoidalar",
    "`NOT NULL` va default (NULL semantikasi murakkab); FK ustuni PK turi bilan bir xil (`BIGINT UNSIGNED`)."
  ],
  "examples": [
    {
      "title": "Jadval",
      "lang": "sql",
      "code": [
        "CREATE TABLE products (",
        "  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,",
        "  sku VARCHAR(32) NOT NULL,",
        "  name VARCHAR(255) NOT NULL,",
        "  price DECIMAL(12,2) NOT NULL DEFAULT 0.00,",
        "  active TINYINT(1) NOT NULL DEFAULT 1,",
        "  created_at DATETIME(3) NOT NULL,",
        "  UNIQUE KEY uq_sku (sku)",
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;"
      ]
    }
  ],
  "pitfalls": [
    "Pul uchun `FLOAT/DOUBLE` yig'indida tiyinlarni yo'qotadi: `DECIMAL` yoki tiyin `BIGINT`.",
    "`TIMESTAMP` 2038 yilda tugaydi: uzoq muddatli sanalar uchun `DATETIME`.",
    "`INT(11)` dagi son hajmni o'zgartirmaydi (faqat ko'rsatish).",
    "FK ustuni turi PK bilan mos bo'lmasa (signed/unsigned) FK yaratib bo'lmaydi."
  ]
});
