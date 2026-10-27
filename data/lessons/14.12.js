/* Chuqur dars: 14.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("14.12", {
  "lesson": [
    "### Asosiy qoida",
    "Ichkarida va bazada **UTC** saqlang, ko'rsatishda foydalanuvchi **zonasiga** o'giring.",
    "",
    "### Turlar",
    "- `TIMESTAMP`: UTC saqlaydi, sessiya zonasiga o'girib beradi, diapazon 1970–**2038**.",
    "- `DATETIME`: zonasiz, qanday kiritilsa shunday; 1000–9999. Ko'p loyihalarda UTC `DATETIME` (zonaga bog'liq emas).",
    "- `DATE`: faqat sana (tug'ilgan kun) — zonasiz.",
    "",
    "### Laravel",
    "`config('app.timezone') = 'UTC'`, Carbon `->timezone($user->tz)`; `timestamps()`; `$casts = ['starts_at' => 'datetime']`. Foydalanuvchi zonasini (`Asia/Tashkent`) saqlang (IANA nomi, offset emas — DST).",
    "",
    "### Nuanslar",
    "- DB sessiya zonasi (`time_zone`) `TIMESTAMP`ga ta'sir qiladi: serverlar o'rtasida mos qiling (`+00:00`).",
    "- Kelajakdagi lokal vaqt (uchrashuv \"ertaga 9:00 Toshkent\"): UTC emas, **lokal vaqt + zona** saqlang (DST/qoida o'zgarishi).",
    "- Sana oralig'i `[from, to)` yarim ochiq; `created_at <= '2025-06-01 23:59:59'` xatolari.",
    "- `NOW()` va `CURRENT_TIMESTAMP` server vaqti.",
    "- Kasr sekund: `DATETIME(3)`.",
    "",
    "### Xatolar",
    "Lokal vaqtni DB'ga yozish (zona o'zgarsa buziladi), `TIMESTAMP` 2038, zonalarni aralashtirish, offset'ni zona o'rnida saqlash.",
    "",
    "### Test",
    "Carbon `setTestNow`, turli zonadagi foydalanuvchi bilan sinash."
  ],
  "examples": [
    {
      "title": "UTC saqlash va ko'rsatish",
      "lang": "php",
      "code": [
        "// saqlash: UTC (config app.timezone = UTC)",
        "$event = Event::create(['starts_at' => Carbon::parse('2025-06-01 09:00', 'Asia/Tashkent')]);   // UTC ga o'giriladi",
        "",
        "// ko'rsatish",
        "echo $event->starts_at->timezone($user->timezone ?? 'Asia/Tashkent')->format('d.m.Y H:i');"
      ]
    }
  ],
  "pitfalls": [
    "Lokal vaqtni DB'ga yozish zona o'zgarganda ma'lumotni buzadi: UTC.",
    "Kelajakdagi lokal uchrashuvni UTC'ga o'girib saqlash DST/qoida o'zgarishida xato beradi.",
    "`TIMESTAMP` 2038 yilda tugaydi.",
    "Offset (`+05:00`) saqlash zonani (DST) ifodalamaydi: IANA nomi."
  ]
});
