/* Chuqur dars: 6.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("6.6", {
  "lesson": [
    "### YAGNI",
    "**You Aren't Gonna Need It:** hozir kerak bo'lmagan funksiyani \"kelajakda kerak bo'lar\" deb yozmang. Bashorat ko'pincha noto'g'ri chiqadi, kod esa baribir saqlanishi va tushunilishi kerak.",
    "",
    "### Belgilar",
    "- Ishlatilmaydigan parametr, flag, konfiguratsiya, interface.",
    "- Faqat bitta implementatsiyali, hech qachon almashtirilmaydigan abstraksiya.",
    "- \"Keyinchalik kerak bo'ladi\" izohi bilan yozilgan o'lik kod.",
    "- Hamma narsani sozlanadigan qilish (feature flag, strategiya) talabsiz.",
    "",
    "### Narxi",
    "Yozish, test qilish, hujjatlash, o'qish, o'zgartirish vaqti; xato yuzasi kengayadi; kelajakdagi haqiqiy talab ko'pincha boshqacha bo'ladi.",
    "",
    "### Qanday qo'llash",
    "1. Faqat joriy talabni bajaring.",
    "2. Dizaynni **o'zgartirishga oson** saqlang (testlar, kichik klasslar, past coupling): shunda kerak bo'lganda qo'shish arzon.",
    "3. \"Uch marta qoidasi\": takrorlanish ko'ringach abstraksiyalang.",
    "4. O'lik kodni o'chiring (Git tarixi bor).",
    "",
    "### Istisno",
    "Qaytarib bo'lmaydigan qarorlar (ma'lumotlar bazasi sxemasi, ommaviy API, xavfsizlik) uchun oldindan o'ylash oqilona.",
    "",
    "### Laravel'da",
    "Keraksiz Repository qatlami, hamma modelga interface, ishlatilmaydigan event/listener — YAGNI buzilishi. Eloquent bilan boshlab, haqiqiy ehtiyoj tug'ilganda ajratish mumkin."
  ],
  "examples": [
    {
      "title": "Keraksiz umumlashtirish",
      "lang": "php",
      "code": [
        "// YAGNI buzilgan: hech kim ishlatmaydigan strategiya va flag",
        "final class Report { public function __construct(private ExportStrategy $s, private bool $legacy = false, private ?Cache $c = null) {} }",
        "",
        "// Hozirgi talab: faqat CSV",
        "final class CsvReport { public function build(array $rows): string { return implode(\"\\n\", array_map(fn ($r) => implode(',', $r), $rows)); } }"
      ]
    }
  ],
  "pitfalls": [
    "'Keyinchalik kerak bo'ladi' deb yozilgan kod ko'pincha hech qachon ishlatilmaydi va yuk bo'ladi.",
    "Keraksiz interface/Repository qatlamlari kodni murakkablashtiradi.",
    "YAGNI dizaynni e'tiborsiz qoldirish emas: o'zgartirishga oson kod yozing.",
    "Ommaviy API va DB sxemasi uchun oldindan o'ylash zarur: ularni keyin o'zgartirish qimmat."
  ]
});
