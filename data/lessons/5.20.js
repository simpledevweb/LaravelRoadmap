/* Chuqur dars: 5.20. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("5.20", {
  "lesson": [
    "### Overengineering",
    "Overengineering — muammo talab qilmagan **ortiqcha murakkablik**: keraksiz abstraksiya, qatlam, interface, pattern, konfiguratsiya. Natija: kod ko'p, tushunish qiyin, o'zgartirish sekin, xato ko'p.",
    "",
    "### Belgilar",
    "- Bitta implementatsiyali interface (`UserRepositoryInterface` + `UserRepository`), hech qachon almashtirilmaydi.",
    "- Oddiy CRUD uchun Controller → Service → Repository → DTO → Mapper → Entity.",
    "- Hech kim ishlatmaydigan \"kengaytirish nuqtalari\".",
    "- Bir qatorli funksiya uchun alohida klass.",
    "- \"Hamma narsani sozlanadigan\" qilish.",
    "- Hali kerak bo'lmagan mikroservis/CQRS/Event Sourcing.",
    "",
    "### Sabablari",
    "\"Kelajakda kerak bo'ladi\" (YAGNI buzilishi), pattern'larga ishtiyoq, CV uchun texnologiya, kontekstni bilmaslik, \"toza arxitektura\" ni kichik loyihada qat'iy qo'llash.",
    "",
    "### Qanday qochish",
    "1. **YAGNI:** hozirgi talabni bajaring.",
    "2. **Uch marta qoidasi:** takrorlanish ko'ringach abstraksiya.",
    "3. **Soddadan boshlang**, haqiqiy og'riq paydo bo'lganda murakkablashtiring.",
    "4. **Narxni hisoblang:** har abstraksiya = o'qish va o'zgartirish xarajati.",
    "5. **\"Eng oddiy ishlaydigan narsa\"** savoli.",
    "6. **O'zgarish ehtimoliga qarang:** hech qachon o'zgarmaydigan joyni abstraksiyalamang.",
    "",
    "### Teskari xato",
    "Underengineering ham xavfli: God class, takrorlanish, testsizlik. Muvozanat: o'zgaradigan va xavfli joylarga abstraksiya, qolganiga oddiy kod.",
    "",
    "### Laravel'da",
    "Kichik/o'rta CRUD ilovada Eloquent + controller + FormRequest ko'pincha yetarli. Repository, Service va DTO'ni haqiqiy murakkablik (bir nechta manba, murakkab domen) paydo bo'lganda kiriting.",
    "",
    "### Test",
    "\"Bu abstraksiyani olib tashlasam, nima yomonlashadi?\" Javob \"hech narsa\" bo'lsa — ortiqcha."
  ],
  "examples": [
    {
      "title": "Ortiqcha va yetarli",
      "lang": "php",
      "code": [
        "// ARTIQCHA: oddiy ro'yxat uchun 5 qatlam",
        "$dto = $mapper->toDto($service->handle($repository->all()));",
        "",
        "// YETARLI (hozirgi talab uchun)",
        "public function index() { return UserResource::collection(User::latest()->paginate()); }"
      ]
    }
  ],
  "pitfalls": [
    "Bitta implementatsiyali, hech qachon almashtirilmaydigan interface'lar ko'pincha ortiqcha.",
    "'Kelajakda kerak bo'ladi' deb yozilgan kengaytirish nuqtalari ko'pincha ishlatilmaydi.",
    "Underengineering ham xavfli: God class va takrorlanish; muvozanatni saqlang.",
    "Kichik loyihada 'toza arxitektura' qatlamlarini qat'iy qo'llash tezlikni tushiradi."
  ]
});
