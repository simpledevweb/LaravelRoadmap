/* Chuqur dars: 14.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("14.16", {
  "lesson": [
    "### Schema evolution",
    "Ma'lumotlar sxemasi **vaqt bo'yicha o'zgaradi**: yangi ustun/jadval, tur o'zgarishi, indeks. Maqsad — buni **xavfsiz**, **versiyalangan** va (iloji bo'lsa) ishlab turgan tizimda qilish.",
    "",
    "### Migratsiyalar",
    "Sxema o'zgarishlari **kodda** (Laravel migration): versiyalanadi, ketma-ket, jamoada bir xil, CI'da bajariladi (`php artisan migrate`). `up()`/`down()`. Qo'lda bazani o'zgartirmang.",
    "",
    "### Qoidalar",
    "1. **Bir migratsiya — bir mantiqiy o'zgarish.**",
    "2. **Hech qachon bajarilgan migratsiyani tahrirlamang** (yangisini yarating).",
    "3. Ma'lumot o'zgarishi (backfill) sxemadan alohida (job/command), katta jadvalda bo'laklab.",
    "4. `down()` mantiqiy, lekin production'da forward-fix afzal.",
    "5. Production nusxasida sinash (hajm!).",
    "",
    "### Xavfli amallar",
    "Katta jadvalda `ALTER` (qulf/uzoq), ustun o'chirish/nomini o'zgartirish (eski kod ishlamay qoladi), tur o'zgartirish (ma'lumot yo'qotish), `NOT NULL` qo'shish.",
    "",
    "### MySQL online DDL",
    "`ALGORITHM=INSTANT` (8.0.12+: ustun qo'shish), `INPLACE`, `LOCK=NONE`; boshqa: **gh-ost**, **pt-online-schema-change** (katta jadval). Laravel: `Schema` + xom `ALTER ... ALGORITHM=INSTANT`.",
    "",
    "### Moslik",
    "Eski va yangi kod bir vaqtda (deploy paytida) ishlashi kerak: **expand/contract** (14.17).",
    "",
    "### Ilova tomoni",
    "`Schema::hasColumn`, model `$fillable`, feature flag.",
    "",
    "### Hujjat",
    "ER diagramma/changelog yangilanib tursin."
  ],
  "examples": [
    {
      "title": "Xavfsiz migratsiya",
      "lang": "php",
      "code": [
        "public function up(): void",
        "{",
        "    Schema::table('orders', function (Blueprint $t) {",
        "        $t->string('currency', 3)->nullable()->after('total');      // 1) NULLable qo'shish (tez)",
        "    });",
        "    // 2) backfill: alohida command/job (bo'laklab)",
        "    // 3) keyingi migratsiya: NOT NULL + default",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Bajarilgan migratsiyani tahrirlash muhitlar orasida farq beradi: yangi migratsiya.",
    "Katta jadvalda `ALTER` uzoq qulf beradi: online DDL/gh-ost.",
    "Sxema va katta ma'lumot o'zgarishini bitta migratsiyada qilish timeout/qulf beradi.",
    "Hajmsiz (kichik) bazada sinab, production'da kutilmagan sekinlik."
  ]
});
