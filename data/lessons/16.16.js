/* Chuqur dars: 16.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("16.16", {
  "lesson": [
    "### Prepared statement nima",
    "So'rov ikki bosqichda yuboriladi:",
    "1. **Prepare:** `SELECT * FROM users WHERE email = ?` shabloni serverga yuboriladi. Server uni parse qiladi (va ba'zan rejalashtiradi).",
    "2. **Execute:** qiymatlar alohida yuboriladi va shablonga qo'yiladi.",
    "",
    "Qiymat hech qachon SQL matnining bir qismiga aylanmaydi. Shuning uchun `' OR 1=1 --` kabi kiritish oddiy satr qiymati bo'lib qoladi va SQL tuzilmasini o'zgartira olmaydi.",
    "",
    "### Ikki foyda",
    "- **Xavfsizlik:** SQL injection'ga qarshi asosiy himoya. Laravel query builder va Eloquent barcha qiymatlarni avtomatik binding qiladi.",
    "- **Tezlik (potensial):** bir xil shablon ko'p marta bajarilsa, parse va rejalashtirish qayta ishlatiladi. Lekin PHP-FPM'da har so'rov odatda yangi ulanish va yangi prepare bo'lgani uchun bu foyda kichik.",
    "",
    "### Emulated va native prepare",
    "PDO'da `PDO::ATTR_EMULATE_PREPARES`:",
    "- **true (emulated):** PDO qiymatlarni o'zi escape qilib, tayyor SQL matnini serverga yuboradi. Bitta tarmoq aylanishi. pdo_mysql default'da shunday.",
    "- **false (native):** haqiqiy server-side prepare. pdo_pgsql default'da native.",
    "",
    "Emulated rejim ham to'g'ri charset (`utf8mb4` ulanish sozlamasida) bilan xavfsiz. Farq asosan tip uzatishda: emulated rejimda MySQL'dan sonlar string bo'lib qaytishi mumkin (PHP 8.1+ va mysqlnd'da `ATTR_STRINGIFY_FETCHES` false bo'lsa, native tiplar).",
    "",
    "### Nozikliklar",
    "- **Binding faqat qiymatlar uchun.** Jadval, ustun nomi, `ASC/DESC`, `LIMIT` (ba'zi driver'larda) bog'lanmaydi. Ular uchun oq ro'yxat (13.21).",
    "- **IN ro'yxati:** har element uchun alohida `?`. Laravel `whereIn` buni o'zi qiladi. Raw SQL'da `implode(',', array_fill(0, count($ids), '?'))`.",
    "- **PostgreSQL generic plan:** bir xil prepared statement 5 marta bajarilgandan keyin PostgreSQL parametrlardan mustaqil \"generic\" rejaga o'tishi mumkin. Notekis taqsimlangan ustunda (bir mijozda 5 qator, boshqasida 5 mln) bu yomon reja beradi. `plan_cache_mode = force_custom_plan` yordam beradi (11.9).",
    "- **PgBouncer transaction rejimi:** native prepared statement'lar ulanishga bog'liq. PgBouncer 1.21+ ularni qo'llaydi, eskisida emulated prepare kerak (11.23).",
    "- **`LIKE`:** foydalanuvchi qiymatidagi `%` va `_` belgilari wildcard bo'lib ishlaydi. Binding injection'dan himoya qiladi, lekin wildcard'larni emas. Kerak bo'lsa, ularni escape qiling.",
    "",
    "### Laravel'da",
    "`DB::select('... WHERE email = ?', [$email])`, nomlangan: `['email' => $email]` va `:email`. `whereRaw('lower(email) = ?', [$e])`. Hech qachon `\"... = '{$email}'\"` interpolatsiyasi."
  ],
  "examples": [
    {
      "title": "Binding va LIKE escape",
      "lang": "php",
      "code": [
        "// Pozitsion va nomlangan binding",
        "DB::select('SELECT id FROM users WHERE email = ? AND tenant_id = ?', [$email, $tenantId]);",
        "DB::select('SELECT id FROM users WHERE email = :email', ['email' => $email]);",
        "",
        "// LIKE: foydalanuvchi kiritgan % va _ ni oddiy belgi qilish",
        "$term = str_replace(['\\\\', '%', '_'], ['\\\\\\\\', '\\\\%', '\\\\_'], $request->string('q'));",
        "Product::where('name', 'like', \"%{$term}%\")->limit(20)->get();"
      ]
    },
    {
      "title": "Ulanish sozlamalari",
      "lang": "php",
      "code": [
        "// config/database.php",
        "'mysql' => [",
        "    'driver' => 'mysql',",
        "    'charset' => 'utf8mb4',",
        "    'collation' => 'utf8mb4_unicode_ci',",
        "    'options' => [",
        "        PDO::ATTR_EMULATE_PREPARES => false,     // native prepare",
        "        PDO::ATTR_STRINGIFY_FETCHES => false,",
        "    ],",
        "],",
        "",
        "'pgsql' => [",
        "    'driver' => 'pgsql',",
        "    // eski PgBouncer transaction rejimi bilan:",
        "    // 'options' => [PDO::ATTR_EMULATE_PREPARES => true],",
        "],"
      ]
    }
  ],
  "pitfalls": [
    "Ustun yoki jadval nomini binding orqali berishga urinish: SQL xatosi yoki noto'g'ri natija. Oq ro'yxat kerak.",
    "Binding `LIKE` wildcard'laridan ham himoya qiladi deb o'ylash: `%` kiritilsa, barcha qatorlar qaytadi.",
    "PostgreSQL'da notekis taqsimotli ustunda generic plan muammosini sezmaslik: so'rov tasodifan sekinlashadi.",
    "Eski PgBouncer transaction rejimida native prepare: `prepared statement does not exist` xatolari."
  ]
});
