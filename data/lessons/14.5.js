/* Chuqur dars: 14.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("14.5", {
  "lesson": [
    "### Normalizatsiya",
    "Ma'lumotni **takrorlanishsiz** va **anomaliyasiz** tashkil qilish. Anomaliyalar: yangilash (bir ma'lumot ko'p joyda), qo'shish, o'chirish.",
    "",
    "### 1NF (First Normal Form)",
    "Har ustun **atomar** (bo'linmas qiymat), **takroriy guruh yo'q**, har qator noyob (PK).",
    "✗ `phones = '123,456'`; ✗ `phone1, phone2, phone3` → ✓ alohida `phones` jadvali.",
    "",
    "### 2NF",
    "1NF + **qisman bog'liqlik yo'q**: har kalit bo'lmagan ustun **butun** (composite) kalitga bog'liq (faqat uning qismiga emas).",
    "✗ `order_lines(order_id, product_id, qty, product_name)`: `product_name` faqat `product_id`ga bog'liq → `products`ga ko'chiring.",
    "",
    "### 3NF",
    "2NF + **tranzitiv bog'liqlik yo'q**: kalit bo'lmagan ustun boshqa kalit bo'lmagan ustunga bog'liq emas.",
    "✗ `users(id, city, zip, country)` agar `country` `zip`dan kelib chiqsa → `zip_codes`ga.",
    "",
    "### BCNF",
    "3NF'ning qat'iyroq varianti (har determinant — kalit). Amalda 3NF yetarli.",
    "",
    "### Foydasi",
    "Takrorlanish kam, yaxlitlik yuqori, yangilash oson, hajm kichik.",
    "",
    "### Narxi",
    "Ko'p JOIN (o'qish sekinlashishi mumkin) → ongli denormalizatsiya (14.6).",
    "",
    "### Qoida",
    "**3NF'gacha normalizatsiya qiling**, so'ng o'lchov asosida kerakli joyni denormalizatsiya qiling.",
    "",
    "### Misol",
    "`orders(id, customer_name, customer_email, ...)` → `customers` jadvali + `orders.customer_id`."
  ],
  "examples": [
    {
      "title": "2NF/3NF",
      "lang": "sql",
      "code": [
        "-- NORMALLASHMAGAN: product_name takrorlanadi",
        "-- order_lines(order_id, product_id, qty, product_name, product_price)",
        "",
        "-- NORMALLASHGAN",
        "CREATE TABLE products (id BIGINT UNSIGNED PRIMARY KEY, name VARCHAR(200), price DECIMAL(12,2));",
        "CREATE TABLE order_lines (order_id BIGINT UNSIGNED, product_id BIGINT UNSIGNED, qty INT, unit_price DECIMAL(12,2),",
        "  PRIMARY KEY (order_id, product_id));   -- unit_price: sotuv paytidagi narx (tarixiy), takror emas"
      ]
    }
  ],
  "pitfalls": [
    "Takroriy ustunlar (`phone1/phone2`) va ro'yxat ustunlari 1NF'ni buzadi.",
    "Normalizatsiya narxi — ko'p JOIN: o'lchamasdan ortiqcha normalizatsiya qilmang.",
    "Tarixiy ma'lumotni (sotuv narxi) 'takror' deb noto'g'ri normalizatsiya qilish tarixni yo'qotadi.",
    "Normalizatsiyani formal qoida deb emas, anomaliyalarni yo'qotish maqsadi deb qo'llang."
  ]
});
