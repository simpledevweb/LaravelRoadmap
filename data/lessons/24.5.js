/* Chuqur dars: 24.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("24.5", {
  "lesson": [
    "### Muammo",
    "Imzo so'rov haqiqiy ekanini isbotlaydi, lekin **qachon** yuborilganini emas. Hujumchi bir marta haqiqiy webhook so'rovini qo'lga kiritsa (proxy log'i, noto'g'ri sozlangan debug vositasi, sizib chiqqan HAR fayl, MITM), uni keyin istalgancha qayta yuborishi mumkin: imzo to'g'ri, body o'zgarmagan. Bu **replay** hujumi (24.6).",
    "",
    "### Yechim: imzolangan vaqt belgisi",
    "1. Provayder so'rovga **vaqt belgisini** qo'shadi (header'da: `X-Webhook-Timestamp: 1749553200`, yoki imzo header'i ichida: `t=1749553200,v1=...`).",
    "2. Vaqt belgisi **imzolanadigan satrga kiradi**: `HMAC(secret, timestamp + \".\" + body)`. Shuning uchun hujumchi uni o'zgartirsa, imzo buziladi.",
    "3. Qabul qiluvchi: `abs(now - timestamp) <= tolerance` ni tekshiradi. Odatiy tolerance — **5 daqiqa** (300 soniya).",
    "",
    "Natija: eski so'rovni 5 daqiqadan keyin qayta yuborib bo'lmaydi.",
    "",
    "### Tolerance tanlash",
    "- Juda kichik (10–30 soniya): serverlar soati farqi va tarmoq kechikishi tufayli haqiqiy so'rovlar rad etiladi.",
    "- Juda katta (soatlar): replay oynasi keng.",
    "- **Retry bilan munosabat:** provayder qayta yuborganda yangi vaqt belgisi va yangi imzo bilan yuboradimi? Ko'pchilik (Stripe, Standard Webhooks) shunday qiladi. Agar provayder **asl** vaqt belgisi bilan qayta yuborsa, 5 daqiqalik tolerance qayta urinishlarni rad etadi. Provayder hujjatini tekshiring.",
    "",
    "### Kelajakdagi vaqt",
    "`abs()` bilan ikkala tomonni tekshiring: kelajakdan kelgan vaqt belgisi ham shubhali (yoki soat farqi). Kichik ruxsat (1–2 daqiqa).",
    "",
    "### Serverlar soati",
    "Vaqt tekshiruvi NTP sinxronizatsiyasiga tayanadi. Server soati bir necha daqiqa orqada yoki oldinda bo'lsa, barcha webhook'lar rad etiladi. Production serverlarda `chrony` yoki `systemd-timesyncd` majburiy va soat farqini monitoring qiling.",
    "",
    "### Vaqt belgisi yetarlimi",
    "Vaqt belgisi replay oynasini 5 daqiqaga **toraytiradi**, lekin yo'q qilmaydi: shu 5 daqiqa ichida takroriy so'rov o'tishi mumkin. To'liq himoya uchun **event ID** bo'yicha dublikat tekshiruvi (24.6, 24.7) qo'shiladi. Ikkalasi birga: vaqt belgisi ID'lar ro'yxatini faqat oxirgi 5 daqiqa (yoki biroz ko'proq) uchun saqlash imkonini beradi.",
    "",
    "### Provayder vaqt belgisini bermasa",
    "Ba'zi provayderlar faqat body'ni imzolaydi. U holda replay himoyasi faqat event ID va idempotentlik orqali. Qo'shimcha: payload ichidagi hodisa vaqti (`created_at`) juda eski bo'lsa, ogohlantirish."
  ],
  "examples": [
    {
      "title": "Stripe uslubidagi header'ni tekshirish",
      "lang": "php",
      "code": [
        "// Stripe-Signature: t=1749553200,v1=5257a869...,v1=a1b2c3...",
        "$parts = collect(explode(',', (string) $request->header('Stripe-Signature')))",
        "    ->map(fn ($p) => explode('=', trim($p), 2))",
        "    ->groupBy(0, preserveKeys: false)",
        "    ->map(fn ($g) => $g->pluck(1));",
        "",
        "$timestamp = (int) ($parts['t'][0] ?? 0);",
        "$signatures = $parts['v1'] ?? collect();",
        "",
        "abort_if(abs(time() - $timestamp) > 300, 401, 'Timestamp outside tolerance');",
        "",
        "$expected = hash_hmac('sha256', \"{$timestamp}.\" . $request->getContent(), config('services.stripe.webhook_secret'));",
        "abort_unless($signatures->contains(fn ($s) => hash_equals($expected, $s)), 401);"
      ],
      "note": "Amalda Stripe SDK'dagi `Webhook::constructEvent()` buni qiladi (24.3). Bu mexanizmni tushunish uchun."
    },
    {
      "title": "Soat farqini monitoring qilish",
      "lang": "bash",
      "code": [
        "# Serverda",
        "chronyc tracking | grep 'System time'",
        "# System time     : 0.000012345 seconds fast of NTP time",
        "",
        "timedatectl status | grep 'System clock synchronized'",
        "# System clock synchronized: yes"
      ]
    }
  ],
  "pitfalls": [
    "Vaqt belgisini tekshirib, uning imzoga kirganini tekshirmaslik: hujumchi uni o'zgartiradi.",
    "Juda kichik tolerance: haqiqiy webhook'lar soat farqi tufayli rad etiladi.",
    "Serverlarda NTP sozlanmagan.",
    "Vaqt belgisini yagona replay himoyasi deb hisoblash: 5 daqiqalik oyna ichida takrorlash mumkin."
  ]
});
