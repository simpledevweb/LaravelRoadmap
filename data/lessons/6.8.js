/* Chuqur dars: 6.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("6.8", {
  "lesson": [
    "### Takrorlanishni aniqlash",
    "Kod duplikatsiyasi — eng keng tarqalgan kod hidi. Xato tuzatilganda nusxalarning biri unutiladi.",
    "",
    "### Turlari",
    "1. **Aniq nusxa (Type 1):** bir xil kod bloklari.",
    "2. **Nom o'zgargan nusxa (Type 2):** o'zgaruvchi nomlari boshqa, tuzilma bir xil.",
    "3. **Tuzilmaviy (Type 3):** bir nechta qator qo'shilgan/o'chirilgan.",
    "4. **Semantik (Type 4):** boshqacha yozilgan, lekin bir xil ish.",
    "",
    "### Topish",
    "- **PHPCPD** (copy/paste detector), PhpStorm \"Duplicates\", SonarQube.",
    "- Code review: \"shunga o'xshash joy bormi?\"",
    "",
    "### Yo'q qilish usullari",
    "- **Extract Method/Class:** umumiy qismni funksiyaga.",
    "- **Parametrlash:** farq qiluvchi qismni argumentga.",
    "- **Template Method / Strategy:** umumiy skelet + o'zgaruvchan qadam.",
    "- **Eloquent scope**, **Blade component**, **FormRequest**, **Resource**.",
    "- **Trait/Bazaviy klass** (ehtiyot bilan).",
    "- **Konstanta, enum, konfiguratsiya.**",
    "",
    "### Muvozanat",
    "Ikki joy tasodifan o'xshash bo'lsa va turli sababdan o'zgarsa, birlashtirmang (DRY nuansi). \"Uch marta qoidasi.\"",
    "",
    "### Tartib",
    "1. Test yozing.",
    "2. Umumiy qismni ajrating.",
    "3. Nusxalarni chaqiruv bilan almashtiring.",
    "4. Testlarni yurgizing.",
    "",
    "### Laravel misoli",
    "Bir xil `where('active', 1)->where('verified', 1)` ko'p joyda → `scopeActive()`."
  ],
  "examples": [
    {
      "title": "Scope bilan",
      "lang": "php",
      "code": [
        "// TAKROR",
        "User::where('active', 1)->where('verified', 1)->get();   // ... ko'p joyda",
        "",
        "// BIR JOYDA",
        "class User extends Model { public function scopeEligible($q) { return $q->where('active', 1)->where('verified', 1); } }",
        "User::eligible()->get();"
      ]
    }
  ],
  "pitfalls": [
    "Tasodifan o'xshash kodni majburan birlashtirish noto'g'ri abstraksiya beradi.",
    "Duplikatni testsiz tahrirlash xatti-harakatni buzishi mumkin.",
    "Trait bilan duplikatni yashirish bog'liqlikni oshiradi.",
    "Faqat matn o'xshashligiga qarash: semantik duplikat (boshqacha yozilgan) ham bor."
  ]
});
