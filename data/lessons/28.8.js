/* Chuqur dars: 28.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("28.8", {
  "lesson": [
    "### Test DB'ni qanday boshqarish kerak",
    "Test ma'lumotlar bazasi — integratsion testlarning poydevori. Uni noto'g'ri boshqarish ikki xil muammo beradi: testlar bir-biriga ta'sir qiladi (flaky) yoki, eng yomoni, **dev yoki production ma'lumotini o'chirib yuboradi**.",
    "",
    "### Asosiy qoidalar",
    "1. **Alohida DB nomi**: test DB doim alohida (`app_test`). Dev DB'dan foydalanmang.",
    "2. **Sxema migratsiya orqali**: test DB sxemasi migratsiyalardan quriladi, qo'lda emas. Migratsiyalar ko'p bo'lsa, `php artisan schema:dump` sxemani bitta SQL faylga yig'adi va test DB tezroq quriladi.",
    "3. **Izolyatsiya strategiyasi**: `RefreshDatabase` (bir marta migratsiya, har test tranzaksiya ichida) odatiy tanlov. Boshqa variantlar keyingi darsda.",
    "4. **Parallel testlar**: `php artisan test --parallel` har jarayon uchun alohida DB yaratadi (nom oxiriga token qo'shiladi), shuning uchun jarayonlar to'qnashmaydi.",
    "5. **Ma'lumotnoma ma'lumotlari**: mamlakatlar, valyutalar, ruxsatlar kabi doimiy ma'lumotlar seeder bilan yuklanadi, har test o'ziga kerakli qolganini factory bilan yaratadi.",
    "",
    "### Eng xavfli tuzoq: kesh qolib ketgan konfiguratsiya",
    "Agar `config:cache` buyrug'i ishga tushirilgan bo'lsa, Laravel `.env` va `phpunit.xml` dagi o'zgarishlarni **o'qimaydi**, keshdagi sozlamani ishlatadi. Natijada testlar dev DB'ga ulanib, `RefreshDatabase` uning jadvallarini o'chirishi mumkin. Himoya: testlar boshida DB nomini tekshiring va noto'g'ri bo'lsa darhol to'xtating. Shuningdek, testlardan oldin `php artisan config:clear` ishga tushirish odat bo'lsin.",
    "",
    "### Seeder va test ma'lumoti",
    "Katta umumiy seeder bilan barcha testlarni boshlash qulay ko'rinadi, lekin testlar bir-biriga bog'lanib qoladi. Eng yaxshisi: minimal ma'lumotnoma seeder'i va har testda factory. Test nimaga tayansa, o'sha test ichida ko'rinib tursin.",
    "",
    "### Migratsiyalarni testlash",
    "Toza DB'da barcha migratsiyalar xatosiz o'tishini CI'da tekshiring (`migrate:fresh`). Murakkab ma'lumot migratsiyalarini (ustunni to'ldirish, ma'lumotni ko'chirish) alohida testlash foydali: eski sxemada ma'lumot yarating, migratsiyani ishga tushiring, natijani tekshiring."
  ],
  "examples": [
    {
      "title": "Test DB'ni majburan tekshirish",
      "lang": "php",
      "code": [
        "// tests/TestCase.php",
        "abstract class TestCase extends BaseTestCase",
        "{",
        "    protected function setUp(): void",
        "    {",
        "        parent::setUp();",
        "",
        "        $database = DB::connection()->getDatabaseName();",
        "",
        "        throw_unless(",
        "            str_contains($database, 'test'),",
        "            RuntimeException::class,",
        "            \"Test DB emas: {$database}. config:cache qolib ketmaganini tekshiring.\"",
        "        );",
        "    }",
        "}"
      ],
      "note": "Noto'g'ri DB'ga ulanish bo'lsa, birinchi testdayoq to'xtaydi."
    },
    {
      "title": "Sozlash va parallel ishga tushirish",
      "lang": "bash",
      "code": [
        "php artisan config:clear",
        "php artisan schema:dump --prune   # migratsiyalarni sxema fayliga yig'ish",
        "php artisan test --parallel --processes=4"
      ],
      "note": "Parallel rejimda har jarayon o'z DB'sidan foydalanadi (nomi <db>_test_<token> ko'rinishida)."
    }
  ],
  "pitfalls": [
    "Testlarda dev DB'ni ishlatish: `RefreshDatabase` jadvallarni o'chirib, ishlab chiquvchi ma'lumotini yo'q qiladi.",
    "`config:cache` qolib ketishi: testlar `.env` dagi o'zgarishni ko'rmaydi va noto'g'ri DB'ga ulanadi.",
    "Hamma testlar uchun bitta katta seeder: bir testning o'zgarishi boshqasini sindiradi.",
    "Test DB sxemasini qo'lda yangilash: migratsiya bilan farq paydo bo'ladi va testlar productionni aks ettirmaydi."
  ]
});
