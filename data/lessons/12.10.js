/* Chuqur dars: 12.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("12.10", {
  "lesson": [
    "### Pub/Sub",
    "**Xabar almashinuv** modeli: nashr etuvchi (`PUBLISH channel msg`) va obuna bo'luvchilar (`SUBSCRIBE channel`, `PSUBSCRIBE news:*`). Xabar **hozir obuna bo'lgan** hammaga yetkaziladi.",
    "",
    "### Xususiyatlar",
    "- **At-most-once:** yetkazish kafolati yo'q.",
    "- **Saqlanmaydi:** obunachi o'chiq bo'lsa xabar yo'qoladi.",
    "- Xabarni qayta o'qib bo'lmaydi, tarix yo'q.",
    "- Past kechikish, sodda.",
    "- Obunachi ulanishi `SUBSCRIBE` rejimida boshqa buyruq bermaydi (alohida ulanish).",
    "- **Sharded Pub/Sub** (7.0, `SPUBLISH`): cluster uchun.",
    "",
    "### Foydalanish",
    "Real-time bildirishnoma, chat, kesh invalidatsiya signali (barcha serverlarga), **Laravel Broadcasting** (Redis driver → Echo/Reverb).",
    "",
    "### Streams bilan farq",
    "Pub/Sub — \"efir\" (o'tkazib yuborsangiz yo'qotdingiz); Stream — saqlanadigan, qayta o'qish, tasdiq (12.2). Muhim hodisalar uchun Stream/queue.",
    "",
    "### Laravel",
    "```php",
    "Redis::publish('chat', json_encode($msg));",
    "Redis::subscribe(['chat'], function ($message) { ... });     // artisan buyruq, uzoq jarayon",
    "```",
    "Odatda Broadcasting (`ShouldBroadcast`) orqali bilvosita.",
    "",
    "### Ehtiyot",
    "- Muhim xabar uchun ishlatmang.",
    "- Obunachi sekin bo'lsa Redis bufer to'ladi (`client-output-buffer-limit pubsub`): uzadi.",
    "- Obunachilar soni va kanal soni monitoring.",
    "- Qayta ulanish mantig'i (uzilganda xabar yo'qoladi)."
  ],
  "examples": [
    {
      "title": "Pub/Sub",
      "lang": "bash",
      "code": [
        "# terminal 1",
        "SUBSCRIBE news",
        "# terminal 2",
        "PUBLISH news \"Yangi maqola\""
      ]
    }
  ],
  "pitfalls": [
    "Obunachi o'chiq bo'lsa xabar yo'qoladi: muhim hodisa uchun Stream/queue.",
    "Sekin obunachi Redis chiqish buferini to'ldiradi (`client-output-buffer-limit pubsub`).",
    "`SUBSCRIBE` ulanishi boshqa buyruq bera olmaydi: alohida ulanish.",
    "Qayta ulanishda uzilish davridagi xabarlar tiklanmaydi."
  ]
});
