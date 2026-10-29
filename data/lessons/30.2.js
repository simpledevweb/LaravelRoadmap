/* Chuqur dars: 30.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("30.2", {
  "lesson": [
    "### Nega avval yiqiladigan test",
    "Kod yo'qligida test yozish sizni \"aynan nima kutayapman?\" degan savolga javob berishga majbur qiladi. Shuningdek, API'ni **iste'molchi** nuqtai nazaridan loyihalaysiz: avval qanday chaqirishni xohlayotganingizni yozasiz, keyin shuni qo'llab-quvvatlaydigan kodni.",
    "",
    "### Yiqilishni ko'rish nima uchun muhim",
    "Test hech qachon yiqilmagan bo'lsa, u haqiqatan ham xatoni ushlay olishiga ishonch yo'q. Tasodifan har doim yashil bo'ladigan testlar bor: noto'g'ri assertion, kutilmagan ma'lumot, ishga tushmagan test. Yiqilishni ko'rgach, test \"yoqilishi\"ni bilasiz.",
    "",
    "### To'g'ri sabab bilan yiqilish",
    "Yiqilish **kutilgan sabab** bilan bo'lishi kerak: kutilgan xatti-harakat yo'q. Sintaksis xatosi, noto'g'ri setup yoki ulanmagan sinf bilan yiqilish foydasiz. Odatiy ketma-ketlik:",
    "1. Birinchi ishga tushirish: \"Class not found\" (hali sinf yo'q). Bu texnik qizil, sinf va metod bo'sh yaratiladi.",
    "2. Ikkinchi ishga tushirish: \"expected false, got true\". Bu **to'g'ri qizil**: xatti-harakat hali yo'q.",
    "",
    "### Bitta testda bitta yangi xatti-harakat",
    "Test bir vaqtda bitta yangi narsani talab qilsin. Agar bir nechta narsa yiqilsa, qaysini qilish kerakligi noaniq bo'ladi. Katta xatti-harakatni kichiklarga bo'ling va ro'yxat tuzing: keyingi testlar uchun \"to-do\" ro'yxati ishlatadi.",
    "",
    "### Test nomi spetsifikatsiya sifatida",
    "Nom xatti-harakatni ifodalasin: \"rejects coupon after expiration date\". Yaxshi nomlar to'plami butun modulning talablari ro'yxatiga aylanadi.",
    "",
    "### Qachon qiyin bo'ladi",
    "Talab hali noaniq yoki tajribaviy bo'lsa, avval \"spike\" (tashlab yuboriladigan tajriba) qiling, tushungach, tashlab yuborib, TDD bilan qayta yozing."
  ],
  "examples": [
    {
      "title": "To'g'ri qizil",
      "lang": "php",
      "code": [
        "it('rejects coupon after expiration date', function () {",
        "    $coupon = new Coupon('SALE10', expiresAt: new DateTimeImmutable('2025-05-31'));",
        "",
        "    expect($coupon->isValidAt(new DateTimeImmutable('2025-06-01')))->toBeFalse();",
        "});",
        "",
        "// 1-ishga tushirish: \"Class Coupon not found\"        (texnik qizil)",
        "// Sinfni yaratamiz, isValidAt() hozircha true qaytaradi",
        "// 2-ishga tushirish: \"Failed asserting that true is false\" (to'g'ri qizil)"
      ],
      "note": "Ikkinchi yiqilish aynan xatti-harakat yo'qligini ko'rsatadi."
    },
    {
      "title": "Keyingi kichik talab",
      "lang": "php",
      "code": [
        "it('accepts coupon on the expiration day', function () {",
        "    $coupon = new Coupon('SALE10', expiresAt: new DateTimeImmutable('2025-05-31'));",
        "",
        "    expect($coupon->isValidAt(new DateTimeImmutable('2025-05-31')))->toBeTrue();",
        "});"
      ],
      "note": "Chegaraviy holat alohida test bilan qo'shiladi."
    }
  ],
  "pitfalls": [
    "Testni kod bilan birga yozib, yiqilishni umuman ko'rmaslik: test hech narsani tekshirmayotgan bo'lishi mumkin.",
    "Noto'g'ri sabab bilan yiqilgan testga ishonish: sintaksis xatosi yoki setup muammosi xatti-harakat yo'qligini ko'rsatmaydi.",
    "Bir testda bir nechta yangi talabni yozish: yiqilganda nimani qilish kerakligi noaniq.",
    "Noaniq talabda TDD'ni majburlash: avval tajriba (spike) qilib, talabni tushunib oling."
  ]
});
