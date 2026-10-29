/* Chuqur dars: 30.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("30.3", {
  "lesson": [
    "### Eng sodda yechim",
    "Green bosqichida maqsad — testni o'tkazadigan **eng kichik** kod. Kelajakdagi talablar uchun umumlashtirmang, boshqa holatlarni oldindan o'ylab yozmang. Bu **YAGNI** (You Aren't Gonna Need It) tamoyilining amaliy ko'rinishi.",
    "",
    "### Fake it till you make it",
    "Birinchi test uchun qattiq kodlangan qiymat qaytarish mumkin. Bu \"aldov\" emas: kod to'g'ri ishlaydi va test o'tadi. U keyingi test bilan umumlashtirilishga majbur bo'ladi.",
    "",
    "### Triangulation",
    "Bitta misol umumiy qoidani aniqlay olmaydi. Ikkinchi, boshqacha misol qo'shilganda qattiq kodlangan javob endi to'g'ri kelmaydi va siz haqiqiy mantiqni yozasiz. Shunday qilib kod faqat testlar talab qilgan miqdorda umumlashadi.",
    "",
    "### Nima uchun minimal",
    "- Ortiqcha kod yozilmaydi: har qator biror test tomonidan talab qilingan.",
    "- Kichik qadamlar xatoni darhol topishga imkon beradi.",
    "- Test qoplami tabiiy ravishda yuqori bo'ladi, chunki yozilgan har bir mantiq uchun test bor.",
    "- Dizayn evolyutsiya qiladi: siz oldindan taxmin qilmasdan, haqiqiy talab asosida abstraksiya yaratasiz.",
    "",
    "### Minimal yomon degani emas",
    "Green holatidagi kod chirkin bo'lishi mumkin va bu normal. Tozalash Refactor bosqichiga tegishli. Muhimi, tartib: avval ishlasin, keyin chiroyli bo'lsin.",
    "",
    "### Qachon kattaroq qadam",
    "Yechim aniq va oddiy bo'lsa (masalan, ikkala holat ham bir xil formulada), triangulation uchun ortiqcha qadam kerak emas. \"Obvious implementation\" — to'g'ridan-to'g'ri yozish ham TDD'ga mos, agar sizga ishonch bo'lsa. Yiqilsangiz, kichikroq qadamga qayting."
  ],
  "examples": [
    {
      "title": "Fake it, keyin umumlashtirish",
      "lang": "php",
      "code": [
        "// 1-test: 50 000 -> 15 000  (GREEN: qattiq kodlangan)",
        "public function costFor(Money $subtotal): Money",
        "{",
        "    return Money::uzs(15_000);",
        "}",
        "",
        "// 2-test: 120 000 -> 0  (triangulation: endi shart kerak)",
        "public function costFor(Money $subtotal): Money",
        "{",
        "    return $subtotal->gte(Money::uzs(100_000))",
        "        ? Money::uzs(0)",
        "        : Money::uzs(15_000);",
        "}"
      ],
      "note": "Ikkinchi test umumlashtirishni majbur qildi."
    },
    {
      "title": "Kelajakni oldindan yozmaslik",
      "lang": "php",
      "code": [
        "// ❌ Hozirgi test talab qilmagan: sozlama, strategiya, kesh",
        "final class ShippingCalculator",
        "{",
        "    public function __construct(private ShippingStrategy $strategy, private CacheInterface $cache) {}",
        "}",
        "",
        "// ✅ Faqat hozirgi talab",
        "final class ShippingCalculator",
        "{",
        "    private const FREE_FROM = 100_000;",
        "    private const FEE = 15_000;",
        "}"
      ],
      "note": "Strategiya va kesh keyin, haqiqiy talab paydo bo'lganda qo'shiladi."
    }
  ],
  "pitfalls": [
    "Test talab qilmagan umumlashtirish yoki sozlamalarni oldindan yozish: ortiqcha kod va testsiz mantiq paydo bo'ladi.",
    "Qattiq kodlangan javobni triangulation'siz qoldirish: kod faqat bitta misol uchun ishlaydi.",
    "Green kodini chirkin deb refactor'ni o'tkazib yuborish: sifat yig'ilmaydi, tuzatilmaydi.",
    "Har gal juda kichik qadam bilan ketish: yechim aniq bo'lganda keraksiz sekinlashadi. Ishonch darajasiga qarab qadam hajmini o'zgartiring."
  ]
});
