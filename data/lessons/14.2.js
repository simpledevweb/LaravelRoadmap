/* Chuqur dars: 14.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("14.2", {
  "lesson": [
    "### Entity",
    "Tizim ma'lumot saqlaydigan **real dunyo obyekti** (User, Product, Invoice). Jadvalga mos keladi; **entity instance** — jadval qatori.",
    "",
    "### Attribute",
    "Entity'ning **xossasi**: ustun. Turlari:",
    "- **Oddiy** (`email`), **murakkab** (`address` → ko'cha, shahar: alohida ustunlar yoki jadval).",
    "- **Majburiy / ixtiyoriy** (`NOT NULL` / `NULL`).",
    "- **Hosila (derived):** boshqasidan hisoblanadi (`age` ← `birth_date`): odatda saqlanmaydi (yoki generated column).",
    "- **Ko'p qiymatli** (`phones`): alohida jadval (1NF).",
    "- **Identifikator** (PK).",
    "",
    "### Kuchli va kuchsiz entity",
    "- **Kuchli:** mustaqil mavjud (`Order`).",
    "- **Kuchsiz (weak):** boshqasiga bog'liq (`OrderLine` — `Order`siz ma'nosiz): PK'da ota ID ham bo'ladi yoki o'z ID + FK + cascade.",
    "",
    "### Atribut tanlash",
    "Faqat kerakli ma'lumot; to'g'ri tur; bir ustunga bir qiymat (atomar); nomlar aniq. Kelajakda o'zgaruvchan atributlar (EAV/JSON) — ehtiyot.",
    "",
    "### Misol",
    "`users(id, name, email, birth_date, created_at)`; manzillar `addresses(id, user_id, city, street)`.",
    "",
    "### Xato",
    "- Ustunga ro'yxat (`\"a,b,c\"`) joylash.",
    "- `address1`, `address2`, `address3` kabi takroriy ustunlar.",
    "- Hosila qiymatni saqlab, sinxron qilmaslik.",
    "",
    "### Laravel",
    "Model = entity, `$fillable`/`$casts` = attribute'lar."
  ],
  "examples": [
    {
      "title": "Murakkab atributni ajratish",
      "lang": "sql",
      "code": [
        "CREATE TABLE users (id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, birth_date DATE NULL);",
        "CREATE TABLE addresses (",
        "  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,",
        "  user_id BIGINT UNSIGNED NOT NULL,",
        "  city VARCHAR(80) NOT NULL, street VARCHAR(160) NOT NULL,",
        "  FOREIGN KEY (user_id) REFERENCES users(id)",
        ");"
      ]
    }
  ],
  "pitfalls": [
    "Ustunga ro'yxat (`'a,b,c'`) joylash 1NF'ni buzadi: alohida jadval.",
    "`address1/address2/address3` kabi takroriy ustunlar noto'g'ri model.",
    "Hosila qiymatni (yosh) saqlash eskirib qoladi: hisoblang yoki generated column.",
    "Kuchsiz entity'ni ota'siz saqlash 'yetim' yozuv hosil qiladi (FK + cascade)."
  ]
});
