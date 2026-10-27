/* Chuqur dars: 14.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("14.10", {
  "lesson": [
    "### NULL",
    "\"Noma'lum/mavjud emas\" ma'nosi. Uch qiymatli mantiq, solishtirish murakkab (`IS NULL`). Har `NULL`able ustun kodni murakkablashtiradi (har joyda tekshiruv).",
    "",
    "### Qoida",
    "Ustun `NOT NULL` bo'lsin, agar \"qiymat yo'q\" holati **ma'noli** bo'lmasa. NULL ma'noli bo'lgan hollar: `deleted_at` (o'chirilmagan), `verified_at`, `parent_id` (ildiz), ixtiyoriy aloqa.",
    "",
    "### DEFAULT",
    "Qiymat berilmasa avtomatik: `DEFAULT 0`, `DEFAULT 'pending'`, `DEFAULT CURRENT_TIMESTAMP`, `DEFAULT (UUID())` (8.0.13+ ifoda). Foydasi: kod soddalashadi, `NOT NULL` ni qulay qiladi.",
    "",
    "### Tanlov",
    "- Son hisoblagich: `NOT NULL DEFAULT 0` (NULL emas).",
    "- Holat: `NOT NULL DEFAULT 'new'` (yoki enum).",
    "- Matn: bo'sh satr `''` va NULL farqi — bitta kelishuv tanlang.",
    "- Sana: ixtiyoriy bo'lsa NULL (`'0000-00-00'` ishlatmang).",
    "- Bool: `NOT NULL DEFAULT 0`.",
    "",
    "### Xavflar",
    "- NULL bilan aggregatlar (`AVG`) va `NOT IN`.",
    "- Indekslar va unikal'lik NULL bilan boshqacha.",
    "- Ilova turi (nullable) PHP'da `?string`.",
    "",
    "### Laravel",
    "`->nullable()`, `->default(...)`, `->useCurrent()`, `->useCurrentOnUpdate()`, model `$attributes`.",
    "",
    "### Migratsiya",
    "Mavjud jadvalga `NOT NULL` ustun qo'shish: default bilan yoki avval `NULL`able → backfill → `NOT NULL`."
  ],
  "examples": [
    {
      "title": "Default va nullable",
      "lang": "sql",
      "code": [
        "CREATE TABLE orders (",
        "  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,",
        "  status VARCHAR(20) NOT NULL DEFAULT 'new',",
        "  items_count INT UNSIGNED NOT NULL DEFAULT 0,",
        "  paid_at DATETIME NULL,                              -- NULL = hali to'lanmagan (ma'noli)",
        "  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP",
        ");"
      ]
    }
  ],
  "pitfalls": [
    "Keraksiz `NULL`able ustun har joyda tekshiruv va NULL tuzoqlarini keltiradi.",
    "Bo'sh satr va NULL farqini aralashtirish (`''` vs NULL).",
    "Mavjud katta jadvalga default'siz `NOT NULL` ustun qo'shish xato/uzoq qulf beradi.",
    "`'0000-00-00'` sanasi strict rejimda xato: ixtiyoriy sana uchun NULL."
  ]
});
