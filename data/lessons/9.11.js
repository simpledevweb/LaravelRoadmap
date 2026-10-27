/* Chuqur dars: 9.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.11", {
  "lesson": [
    "### Constraint (cheklov)",
    "Ma'lumot yaxlitligini **bazaning o'zida** majburlovchi qoidalar. Ilova validatsiyasi yetarli emas (poyga, boshqa klient, xato).",
    "",
    "### Turlari",
    "- `NOT NULL` — qiymat majburiy.",
    "- `DEFAULT` — qiymat berilmasa.",
    "- `PRIMARY KEY` — unikal + NOT NULL.",
    "- `UNIQUE` — takrorlanmaydi.",
    "- `FOREIGN KEY` — boshqa jadvalga havola.",
    "- `CHECK` — shart (`CHECK (price >= 0)`).",
    "- (`AUTO_INCREMENT` — ustun xususiyati.)",
    "",
    "### Nomlash",
    "`CONSTRAINT chk_price CHECK (price >= 0)` — nom bilan: xato xabarida va `DROP`da qulay.",
    "",
    "### Qo'shish/o'chirish",
    "`ALTER TABLE t ADD CONSTRAINT ...`, `DROP CONSTRAINT/CHECK/FOREIGN KEY/INDEX ...`. Katta jadvalda constraint qo'shish tekshiruv va qulf: online DDL.",
    "",
    "### Foydasi",
    "- Noto'g'ri ma'lumot kirmaydi (manfiy narx, mavjud bo'lmagan user).",
    "- Ilova xatosi yoki parallel yozish ham ushlanadi.",
    "- Optimizer ba'zan constraint'dan foydalanadi.",
    "- Hujjat: sxema qoidalarni o'zi aytadi.",
    "",
    "### Qoida",
    "Bazada majburlash mumkin bo'lgan qoidani bazada majburlang (defense in depth), ilova validatsiyasi UX uchun.",
    "",
    "### Laravel",
    "Migratsiyada: `->nullable()`, `->default()`, `->unique()`, `foreignId()->constrained()`, xom `DB::statement('ALTER TABLE ... ADD CONSTRAINT ... CHECK ...')`."
  ],
  "examples": [
    {
      "title": "Constraint'lar",
      "lang": "sql",
      "code": [
        "CREATE TABLE products (",
        "  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,",
        "  sku VARCHAR(32) NOT NULL,",
        "  price DECIMAL(12,2) NOT NULL DEFAULT 0,",
        "  stock INT NOT NULL DEFAULT 0,",
        "  UNIQUE KEY uq_sku (sku),",
        "  CONSTRAINT chk_price CHECK (price >= 0),",
        "  CONSTRAINT chk_stock CHECK (stock >= 0)",
        ");"
      ]
    }
  ],
  "pitfalls": [
    "Faqat ilova validatsiyasiga tayanish poyga va boshqa klientlar uchun yetarli emas.",
    "Katta jadvalga constraint qo'shish qulf va uzoq tekshiruv bergan: rejalashtiring.",
    "Nomsiz constraint xatoda tushunarsiz nom (`products_chk_1`).",
    "Mavjud noto'g'ri ma'lumot bilan constraint qo'shish xato beradi: avval tozalang."
  ]
});
