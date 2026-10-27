/* Chuqur dars: 5.19. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("5.19", {
  "lesson": [
    "### Pattern'ni qanday tanlash",
    "Pattern — muammo uchun **ishlatilgan yechim**, qolip emas. Avval **muammoni** aniqlang, keyin mos pattern'ni qidiring; teskarisi emas.",
    "",
    "### Tanlash savollari",
    "1. **Muammo nima?** (yaratish murakkab? xulq almashadi? obyektlar bog'lanmoqda?)",
    "2. **O'zgarish nuqtasi qayerda?** (nimani almashtirish kerak bo'ladi)",
    "3. **Oddiyroq yechim bormi?** (funksiya, `match`, closure)",
    "4. **Narxi:** qancha klass, interface, murakkablik qo'shiladi?",
    "5. **Jamoa tanishmi?**",
    "",
    "### Muammo → pattern xaritasi",
    "| Muammo | Pattern |",
    "|---|---|",
    "| Yaratish mantiqi murakkab / tur tanlanadi | Factory, Builder |",
    "| Bir nechta algoritm, almashtiriladi | Strategy |",
    "| Holatga qarab xulq | State |",
    "| Mavjud obyektga xulq qo'shish | Decorator |",
    "| Begona interface'ni moslash | Adapter |",
    "| Murakkab quyi tizim ustiga oddiy interface | Facade |",
    "| Hodisaga ko'p reaksiya | Observer |",
    "| Ketma-ket tekshiruv/ishlov | Chain of Responsibility |",
    "| Amalni obyekt qilish (navbat, undo) | Command |",
    "| Skelet + o'zgaruvchan qadam | Template Method |",
    "| Saqlash tafsilotini yashirish | Repository |",
    "| Murakkab qoidani kompozitsiya | Specification |",
    "",
    "### Alomatlar",
    "- `switch` takrorlanadi → Strategy/State.",
    "- `new` hamma joyda → Factory/DI.",
    "- Klass portlashi (kombinatsiyalar) → Decorator.",
    "- Qo'shimcha funksiya uchun meros → kompozitsiya.",
    "",
    "### PHP/Laravel'da ko'p pattern allaqachon bor",
    "Container (DI/Factory), Eloquent (Active Record), Middleware (Chain), Events (Observer), Manager (Factory/Strategy), Facade, Pipeline.",
    "",
    "### Qoida",
    "\"Pattern'ni qo'llash maqsad emas; kodni o'zgartirishga oson qilish maqsad.\" Ikkinchi marta takrorlanganda abstraksiya qiling."
  ],
  "examples": [
    {
      "title": "Qaror: pattern kerakmi?",
      "lang": "php",
      "code": [
        "// 2 ta o'zgarmas variant: oddiy match yetarli",
        "$fee = match ($method) { 'card' => 0.02, 'cash' => 0.0 };",
        "",
        "// Variantlar ko'payadi, mustaqil test kerak, runtime almashadi: Strategy",
        "interface FeePolicy { public function fee(int $a): int; }"
      ]
    }
  ],
  "pitfalls": [
    "Pattern'dan boshlash (muammodan emas) ortiqcha murakkablik beradi.",
    "Bir pattern'ni hamma joyga qo'llash ('hammer syndrome').",
    "Jamoa tanimagan pattern o'qish va qo'llab-quvvatlashni qiyinlashtiradi.",
    "Framework allaqachon bergan pattern'ni (Container, Events) qayta yozish keraksiz."
  ]
});
