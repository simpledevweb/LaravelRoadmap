/* Chuqur dars: 30.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("30.10", {
  "lesson": [
    "### Regressiya nima",
    "Regressiya — avval ishlagan narsaning yangi o'zgarishdan keyin buzilishi. Ilova kattalashgan sari qo'lda hamma narsani tekshirish mumkin bo'lmaydi, shuning uchun avtomatik testlar to'plami regressiyaga qarshi xavfsizlik to'ri vazifasini bajaradi.",
    "",
    "### Bug uchun avval test",
    "Eng foydali odat: har bir topilgan bug uchun **avval** uni qayta yaratadigan yiqiladigan test yozing, keyin tuzating. Shunda:",
    "- bugni haqiqatan tushunganingizni isbotlaysiz (test uni takrorlaydi);",
    "- tuzatish ishlaganini ko'rasiz (test yashil bo'ladi);",
    "- bug **qaytmaydi**: kimdir keyinroq xuddi shu joyni buzsa, test ushlaydi.",
    "",
    "### Regressiya testida nima yoziladi",
    "Test nomida yoki izohida bug raqami va qisqa tavsif qoldiring (masalan, `Bug #1287`). Keyinchalik nima uchun bu test borligi tushunarli bo'ladi. Minimal ma'lumot bilan aynan buzuq holatni qayta yarating.",
    "",
    "### CI'da majburiylik",
    "Testlar CI'da avtomatik ishlashi va merge'dan oldin yashil bo'lishi shart. Qizil testli kod asosiy tarmoqqa kirmasin. Aks holda to'plamga ishonch yo'qoladi.",
    "",
    "### Smoke testlar",
    "Deploy'dan keyin muhim oqimlar (kirish, asosiy xarid yo'li, to'lov) uchun tez smoke testlar productionga yaqin muhitda ishlaydi. Ular \"tizim umuman tirikmi\" savoliga tez javob beradi.",
    "",
    "### Flaky testlar regressiyani yashiradi",
    "Tasodifan yiqiladigan testlar jamoani qizil natijaga ko'niktiradi va haqiqiy regressiya e'tiborsiz qoladi. Flaky testni tezda tuzating yoki karantinga oling.",
    "",
    "### Qoplamaning ma'nosi",
    "Yuqori qamrov foizi regressiyadan himoya kafolati emas. Muhim biznes yo'llari va oldin buzilgan joylar uchun testlar sifatliroq."
  ],
  "examples": [
    {
      "title": "Bug uchun regressiya testi",
      "lang": "php",
      "code": [
        "// Bug #1287: kabisa yilida yillik obuna muddati noto'g'ri hisoblangan",
        "it('extends a yearly subscription correctly from Feb 29', function () {",
        "    $subscription = Subscription::startingAt('2024-02-29', period: 'yearly');",
        "",
        "    expect($subscription->endsAt()->toDateString())->toBe('2025-02-28');",
        "});"
      ],
      "note": "Test bug'ni takrorlaydi, tuzatishdan keyin yashil bo'ladi va qaytmasligini kafolatlaydi."
    },
    {
      "title": "Ish tartibi",
      "lang": "text",
      "code": [
        "1. Bug haqida xabar        -> qayta yaratish",
        "2. Yiqiladigan test yozish  -> RED (bug takrorlandi)",
        "3. Minimal tuzatish         -> GREEN",
        "4. Refactor, barcha testlar -> yashil",
        "5. Commit: test + tuzatish birga"
      ],
      "note": "Test va tuzatish bitta commit'da."
    }
  ],
  "pitfalls": [
    "Bugni test yozmasdan tuzatish: u keyinroq qaytib keladi va yana vaqt oladi.",
    "Qizil testli kodni merge qilish: to'plamga ishonch yo'qoladi.",
    "Flaky testlarga ko'nikish: haqiqiy regressiya \"yana tasodifiy yiqildi\" deb e'tiborsiz qoladi.",
    "Faqat qamrov foiziga qarab xotirjam bo'lish: muhim oqimlar va avval buzilgan joylar yetarli sinalmagan bo'lishi mumkin."
  ]
});
