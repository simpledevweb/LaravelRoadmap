/* Chuqur dars: 14.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("14.11", {
  "lesson": [
    "### Tanlash tamoyillari",
    "Eng **kichik, lekin yetarli**; **aniq** (pul); **mos** (sana uchun DATE/DATETIME); indeks va FK mosligi.",
    "",
    "### Sonlar",
    "`TINYINT`/`SMALLINT`/`INT`/`BIGINT` (+`UNSIGNED`): kutilgan diapazonga. ID: `BIGINT UNSIGNED`. **Pul:** `DECIMAL(p,s)` (yoki tiyin `BIGINT`), `FLOAT/DOUBLE` emas. `BOOLEAN` = `TINYINT(1)`.",
    "",
    "### Matn",
    "`VARCHAR(n)` (qisqa, indekslanadigan), `CHAR(n)` (qat'iy uzunlik: kodlar), `TEXT` (uzun, indeks cheklangan), `ENUM` (kam qiymatlar; o'zgartirish ALTER talab qiladi, string+check ko'pincha yaxshiroq). `utf8mb4`.",
    "",
    "### Sana/vaqt",
    "`DATE`, `DATETIME` (zonasiz), `TIMESTAMP` (UTC, 2038 gacha). Ko'p tizimlar UTC `DATETIME`. Kasr sekund `(3)`.",
    "",
    "### Maxsus",
    "- `JSON` (o'zgaruvchan sxema).",
    "- **UUID:** `BINARY(16)` (kichik) yoki `CHAR(36)`.",
    "- IP: `VARBINARY(16)`/`INET6_ATON`.",
    "- Telefon: `VARCHAR(20)` (son emas!).",
    "- Email: `VARCHAR(255)`.",
    "- Pochta indeksi, ID raqamlari — satr (bosh nollar).",
    "",
    "### Xatolar",
    "- Telefon/ID'ni `INT`da saqlash (bosh nol, uzunlik).",
    "- `VARCHAR(255)` hamma narsaga (indeks va xotira).",
    "- Float bilan pul.",
    "- Juda katta tur (`BIGINT` kichik hisoblagichga) — xotira/indeks.",
    "",
    "### Mos turlar",
    "FK va PK bir xil tur (signedness). Collation bir xil.",
    "",
    "### Laravel",
    "`string()`, `char()`, `text()`, `integer()`, `unsignedBigInteger()`, `decimal()`, `dateTime()`, `uuid()`, `json()`, `enum()`."
  ],
  "examples": [
    {
      "title": "Turlar",
      "lang": "sql",
      "code": [
        "CREATE TABLE customers (",
        "  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,",
        "  phone VARCHAR(20) NOT NULL,          -- son emas",
        "  email VARCHAR(255) NOT NULL,",
        "  balance DECIMAL(14,2) NOT NULL DEFAULT 0,",
        "  country CHAR(2) NOT NULL,            -- ISO kod",
        "  ip VARBINARY(16) NULL,",
        "  created_at DATETIME(3) NOT NULL",
        ");"
      ]
    }
  ],
  "pitfalls": [
    "Telefon/ID'ni `INT`da saqlash bosh nollarni yo'qotadi.",
    "Pul uchun `FLOAT` yig'indida xato to'playdi: `DECIMAL`.",
    "`VARCHAR(255)` ni hamma narsaga qo'yish indeks va xotirani ko'paytiradi.",
    "FK va PK turi mos bo'lmasa (unsigned/signed) FK yaratilmaydi."
  ]
});
