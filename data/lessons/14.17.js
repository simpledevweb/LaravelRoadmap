/* Chuqur dars: 14.17. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("14.17", {
  "lesson": [
    "### Backward-compatible migratsiya",
    "Deploy paytida **eski va yangi kod bir vaqtda** ishlaydi (rolling deploy, queue worker'lar). Migratsiya eski kodni **buzmasligi** kerak: aks holda downtime/xato.",
    "",
    "### Expand → Migrate → Contract",
    "1. **Expand:** yangi ustun/jadval **qo'shing** (NULLable/default bilan): eski kod e'tibor bermaydi.",
    "2. **Dual write / backfill:** yangi kod ikkalasiga yozadi; mavjud ma'lumotni yangisiga ko'chiring (bo'laklab).",
    "3. **Read switch:** yangi kod yangi ustundan o'qiydi.",
    "4. **Contract:** eski kod butunlay o'chgach eski ustunni **o'chiring** (alohida, keyingi release).",
    "",
    "### Ustun nomini o'zgartirish",
    "To'g'ridan `RENAME` xavfli (eski kod buziladi). Yo'l: yangi ustun qo'shish → ikkalasiga yozish → backfill → o'qishni almashtirish → eskisini o'chirish.",
    "",
    "### Tur o'zgartirish",
    "Yangi ustun yaratib ko'chirish; `MODIFY` katta jadvalda qulf/ma'lumot yo'qotish.",
    "",
    "### Xavfsiz va xavfli",
    "- ✓ Ustun/jadval/indeks qo'shish (NULLable/default).",
    "- ✗ Ustun o'chirish/nomlash, `NOT NULL` default'siz, FK qo'shish (qulf), constraint'ni qat'iylashtirish.",
    "",
    "### Boshqa qoidalar",
    "- Deploy tartibi: avval migratsiya (kod eski sxemada ishlay oladi), keyin kod. Yoki kod avval (yangi ustunni optional ishlatadi).",
    "- Queue job'lar eski payload bilan ishlay olsin.",
    "- Feature flag.",
    "- `NOT NULL` qo'shishda: nullable → backfill → `NOT NULL`.",
    "",
    "### Vositalar",
    "`strong_migrations` g'oyasi (Laravel analoglari: `squareboat`, CI qoida), gh-ost, pt-osc, `ALGORITHM=INSTANT`."
  ],
  "examples": [
    {
      "title": "Rename (expand/contract)",
      "lang": "php",
      "code": [
        "// release 1 (expand): yangi ustun, kod ikkalasiga yozadi",
        "Schema::table('users', fn (Blueprint $t) => $t->string('full_name')->nullable());",
        "// backfill: User::chunkById(1000, fn ($us) => $us->each(fn ($u) => $u->update(['full_name' => $u->name])));",
        "// release 2: o'qish full_name'dan",
        "// release 3 (contract): Schema::table('users', fn ($t) => $t->dropColumn('name'));"
      ]
    }
  ],
  "pitfalls": [
    "Ustunni bir release'da nomlash/o'chirish eski kodni buzadi (rolling deploy).",
    "`NOT NULL` ni default/backfill'siz qo'shish eski kod yozishini rad etadi.",
    "Queue'dagi eski job payload'i yangi sxema bilan mos bo'lmasligi mumkin.",
    "Contract bosqichini unutib eski ustunlarni abadiy qoldirish texnik qarz."
  ]
});
