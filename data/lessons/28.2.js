/* Chuqur dars: 28.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("28.2", {
  "lesson": [
    "### Nima uchun DB integratsion testi kerak",
    "Eloquent va query builder qulay, lekin ular yaratadigan SQL'ni faqat haqiqiy DB tekshira oladi. DB integratsion testlari quyidagilarni qamrab oladi: murakkab so'rovlar va scope'lar, relation'lar, migratsiyalar, constraint'lar (unique, foreign key, check), tranzaksiya va lock xatti-harakati, DB'ga xos imkoniyatlar (JSON ustunlar, window funksiyalar, full-text qidiruv).",
    "",
    "### Production bilan bir xil engine",
    "Eng keng tarqalgan tuzoq: testlarda SQLite in-memory, productionda MySQL yoki PostgreSQL. SQLite tez, lekin farqlari haqiqiy xatolarni yashiradi:",
    "- katta-kichik harf sezgirligi (collation) boshqacha;",
    "- JSON operatorlari va funksiyalari boshqacha yoki yo'q;",
    "- `ON CONFLICT`, `INSERT ... ON DUPLICATE KEY` sintaksisi farq qiladi;",
    "- foreign key va constraint'lar ba'zi sozlamalarda tekshirilmaydi;",
    "- sana va tip konversiyasi yumshoqroq.",
    "",
    "Shuning uchun integratsion testlarni **production bilan bir xil engine va versiyada** ishga tushiring. Lokal muhitda Docker, CI'da service container yetarli.",
    "",
    "### Nimani testlash kerak",
    "- **Constraint'lar**: unique va foreign key DB darajasida ishlashi. Ilova validatsiyasi poyga holatida (race condition) yetmaydi, DB constraint oxirgi himoya.",
    "- **Murakkab so'rovlar**: guruhlash, subquery, join natijasi to'g'ri qatorlarni qaytarishi. Kutilgan natijani qo'lda tuzilgan ma'lumotdan hisoblang.",
    "- **Scope va relation**: global scope, soft delete, `withCount`, eager loading sharti.",
    "- **Migratsiya**: toza DB'da to'liq migratsiya o'tishi, kerak bo'lsa `down()` ham.",
    "",
    "### Yaxshi odatlar",
    "Har test o'ziga kerakli ma'lumotni factory bilan yaratsin. Natijani tekshirganda faqat muhim ustunlarni solishtiring. Tartib kerak bo'lsa, `orderBy` ni aniq belgilang, aks holda test tasodifan o'tib ketadi. Constraint testida exception turini tekshiring: `UniqueConstraintViolationException`, umumiy `QueryException` emas."
  ],
  "examples": [
    {
      "title": "Unique constraint",
      "lang": "php",
      "code": [
        "it('enforces unique email per tenant at DB level', function () {",
        "    User::factory()->create(['tenant_id' => 1, 'email' => 'a@ex.uz']);",
        "",
        "    expect(fn () => User::factory()->create(['tenant_id' => 1, 'email' => 'a@ex.uz']))",
        "        ->toThrow(UniqueConstraintViolationException::class);",
        "",
        "    // boshqa tenant uchun bir xil email ruxsat",
        "    User::factory()->create(['tenant_id' => 2, 'email' => 'a@ex.uz']);",
        "    expect(User::count())->toBe(2);",
        "});"
      ],
      "note": "Ikki ustunli unique indeks ishlashi faqat DB bilan tekshiriladi."
    },
    {
      "title": "Scope natijasi",
      "lang": "php",
      "code": [
        "it('returns only overdue unpaid invoices ordered by due date', function () {",
        "    $late  = Invoice::factory()->unpaid()->create(['due_at' => now()->subDays(10)]);",
        "    $later = Invoice::factory()->unpaid()->create(['due_at' => now()->subDay()]);",
        "    Invoice::factory()->paid()->create(['due_at' => now()->subDays(30)]);",
        "    Invoice::factory()->unpaid()->create(['due_at' => now()->addDay()]);",
        "",
        "    $ids = Invoice::overdue()->orderBy('due_at')->pluck('id')->all();",
        "",
        "    expect($ids)->toBe([$late->id, $later->id]);",
        "});"
      ],
      "note": "Chegaraviy ma'lumotlar (to'langan, muddati kelmagan) scope noto'g'ri bo'lsa testni yiqitadi."
    }
  ],
  "pitfalls": [
    "Testlarda SQLite, productionda MySQL/PostgreSQL ishlatish: JSON, collation va constraint farqlari xatoni yashiradi.",
    "Tartibga tayanish: `orderBy` bermasdan natija tartibini tekshirish tasodifan o'tadi, keyin flaky bo'ladi.",
    "Faqat ilova validatsiyasiga ishonish: poyga holatida ikki so'rov ham validatsiyadan o'tadi, constraint testi yo'q bo'lsa bu aniqlanmaydi.",
    "Umumiy `QueryException` ni kutish: sababi boshqa (masalan, noto'g'ri ustun nomi) bo'lsa ham test yashil bo'ladi."
  ]
});
