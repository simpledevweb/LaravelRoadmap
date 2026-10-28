/* Chuqur dars: 12.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("12.2", {
  "lesson": [
    "### Streams",
    "Redis 5.0+: **faqat qo'shiladigan (append-only) log**; har yozuv noyob ID (`ms-seq`) va maydon-qiymat juftliklariga ega. Kafka'ga o'xshash, lekin yengilroq.",
    "",
    "### Asosiy buyruqlar",
    "- `XADD orders * user 5 total 100` (`*` — avtomatik ID).",
    "- `XLEN`, `XRANGE orders - +`, `XREVRANGE`.",
    "- `XREAD COUNT 10 BLOCK 5000 STREAMS orders $` — yangilarini kutish.",
    "- `XTRIM orders MAXLEN ~ 10000` — hajmni cheklash (yoki `XADD ... MAXLEN`).",
    "",
    "### Consumer groups",
    "Bir nechta iste'molchi xabarlarni **bo'lishadi** (har xabar guruhdagi bitta consumerga):",
    "- `XGROUP CREATE orders workers $ MKSTREAM`.",
    "- `XREADGROUP GROUP workers c1 COUNT 10 BLOCK 5000 STREAMS orders >`.",
    "- `XACK` — qayta ishlandi (tasdiq). Tasdiqlanmaganlar **PEL**da (`XPENDING`).",
    "- `XCLAIM`/`XAUTOCLAIM` — qotib qolgan (o'lgan consumer) xabarlarni boshqasiga o'tkazish.",
    "",
    "### Pub/Sub'dan farqi",
    "Stream xabarlarni **saqlaydi** (persistent), consumer keyin ham o'qiy oladi, tasdiq (at-least-once), qayta o'qish. Pub/Sub — saqlamaydi.",
    "",
    "### Qachon ishlatish",
    "Hodisalar oqimi, audit log, ishonchli navbat (Laravel'ning list-queue'dan ko'ra ko'proq kafolat), mikroservis hodisalari.",
    "",
    "### Cheklovlar",
    "Xotirada: hajmni `MAXLEN` bilan cheklang; kafka kabi partitsiya/uzoq saqlash yo'q; persistence sozlamasiga bog'liq.",
    "",
    "### Laravel",
    "Core'da yo'q: `Redis::xadd()`, `Redis::xreadgroup()` yoki paketlar. Idempotent consumer (qayta yetkazish)."
  ],
  "examples": [
    {
      "title": "Consumer group",
      "lang": "bash",
      "code": [
        "XGROUP CREATE orders workers $ MKSTREAM",
        "XADD orders * user 5 total 100",
        "XREADGROUP GROUP workers c1 COUNT 10 BLOCK 5000 STREAMS orders >",
        "XACK orders workers 1718000000000-0",
        "XPENDING orders workers"
      ]
    }
  ],
  "pitfalls": [
    "`XACK` qilinmasa xabarlar PEL'da qoladi va to'planadi: `XAUTOCLAIM`/monitoring.",
    "`MAXLEN`siz stream xotirani to'ldiradi.",
    "At-least-once: consumer idempotent bo'lishi kerak (qayta yetkazish).",
    "Stream persistence sozlamasiz (RDB/AOF) restartda yo'qoladi."
  ]
});
