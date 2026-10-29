/* Chuqur dars: 28.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("28.14", {
  "lesson": [
    "### Integratsion test yiqilganda nima qilish kerak",
    "Unit test yiqilsa, sabab odatda kodda. Integratsion test yiqilsa, sabab ko'p joyda bo'lishi mumkin: kod xatosi, infratuzilma (DB ishga tushmagan), konfiguratsiya, ma'lumot holati, tarmoq, vaqt yoki parallel izolyatsiya. Maqsad — sababni tezda toraytirish.",
    "",
    "### Diagnostika vositalari",
    "- **Asl exception**: Laravel feature testlarida exception'lar HTTP javobga aylantiriladi va asl xato yashiriladi. `$this->withoutExceptionHandling()` asl exception va stack trace'ni ko'rsatadi.",
    "- **SQL so'rovlari**: `DB::enableQueryLog()` va `DB::getQueryLog()` qaysi so'rovlar ketganini ko'rsatadi. Kutilmagan so'rov yoki ortiqcha so'rovlar N+1 ni ochadi.",
    "- **Aniq assertion xabarlari**: `expect($x)->toBe(...)` ning xabari yetarli bo'lmasa, test ichida kontekst yozing (qaysi yozuv, qaysi holat).",
    "- **Servis log'lari**: DB, Redis va ilova log'lari. CI'da yiqilgan ishga tushirishdan keyin konteyner log'larini artefakt sifatida saqlang.",
    "- **Lokal tekshiruv**: `dump()`, `dd()` yoki Ray bilan oraliq qiymatlarni ko'ring (commit qilishdan oldin olib tashlang).",
    "",
    "### Muvaffaqiyatsizlikni qayta yaratish",
    "Eng muhimi — xatoni lokal qayta yaratish: bir xil konteyner versiyalari, bir xil test tartibi (`--order-by=defects` yoki seed), bir xil ma'lumot. `--filter` bilan faqat yiqilgan testni, keyin uni oldingi testlar bilan birga ishlatib ko'ring: yakka o'tib, to'plamda yiqilsa, bu testlar orasidagi bog'liqlik.",
    "",
    "### \"Faqat CI'da yiqiladi\"",
    "Odatiy sabablar: muhit farqi (versiya, vaqt zonasi, locale), parallel izolyatsiya muammosi, tartibga bog'liqlik, sekinroq mashina (timeout) va servis tayyor bo'lmasdan boshlangan test. Avval farqlarni ro'yxatga oling: DB versiyasi, PHP kengaytmalari, `TZ`, parallel jarayonlar soni.",
    "",
    "### Flaky testlar",
    "Ba'zan yiqilib, ba'zan o'tadigan testni \"qayta ishga tushirib o'tkazib yuborish\" yomon odat: u haqiqiy poyga holatini yoki izolyatsiya xatosini yashiradi. Flaky testni belgilang, sababini toping va tuzating, vaqtincha karantinga oling, lekin unutmang."
  ],
  "examples": [
    {
      "title": "Asl xatoni ko'rish va so'rovlarni yig'ish",
      "lang": "php",
      "code": [
        "it('creates the invoice', function () {",
        "    $this->withoutExceptionHandling();   // asl exception ko'rinadi",
        "    DB::enableQueryLog();",
        "",
        "    $this->actingAs($user)->postJson('/api/invoices', $payload)->assertCreated();",
        "",
        "    // diagnostika uchun vaqtincha",
        "    dump(collect(DB::getQueryLog())->pluck('query')->all());",
        "});"
      ],
      "note": "Diagnostika kodini commit qilishdan oldin olib tashlang."
    },
    {
      "title": "Yiqilgan testni takrorlash",
      "lang": "bash",
      "code": [
        "# faqat yiqilgan test",
        "php artisan test --filter=\"creates the invoice\"",
        "",
        "# avval yiqilganlar birinchi",
        "php artisan test --order-by=defects --stop-on-failure",
        "",
        "# testlar orasidagi bog'liqlikni topish",
        "php artisan test --order-by=random"
      ],
      "note": "Yakka o'tib, to'plamda yiqilsa, testlar bir-biriga bog'liq."
    }
  ],
  "pitfalls": [
    "Yiqilgan testni shunchaki qayta ishga tushirib o'tkazish: haqiqiy poyga holati yoki izolyatsiya xatosi yashirinib qoladi.",
    "`withoutExceptionHandling()` ni qoldirib ketish: boshqa testlarda kutilgan HTTP xato javoblari tekshirilmay qoladi.",
    "Faqat \"nima yiqildi\"ga qarash, \"nima o'zgardi\"ni (versiya, muhit, ma'lumot) tekshirmaslik.",
    "CI log'larini saqlamaslik: yiqilish bir marta bo'lib, qayta takrorlanmasa, tahlil qiladigan hech narsa qolmaydi."
  ]
});
