/* Chuqur dars: 19.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("19.12", {
  "lesson": [
    "### Dizayn hujjati sifatida",
    "Idempotency-Key mexanizmi 18.14 va 18.21 da ko'rildi. API dizaynida u **ommaviy shartnoma** sifatida aniq yozilishi kerak, chunki mijozlar uni to'g'ri ishlatishi kerak.",
    "",
    "### Hujjatlashtiriladigan qarorlar",
    "1. **Header nomi:** `Idempotency-Key` (IETF draft va sanoat standarti).",
    "2. **Format:** UUID v4 (yoki 255 belgigacha ixtiyoriy string). Noto'g'ri format — `400`.",
    "3. **Qaysi endpoint'lar:** barcha \"pul\" endpoint'lari va resurs yaratuvchi POST'lar. Majburiymi yoki ixtiyoriymi? Pul uchun majburiy qilish ishonchliroq.",
    "4. **Doira:** kalit API klient yoki foydalanuvchi doirasida noyob.",
    "5. **Saqlash muddati:** masalan, 24 soat. Undan keyin xuddi shu kalit yangi so'rov hisoblanadi.",
    "6. **Qayta ishlash qoidalari:**",
    "   - Bir xil kalit + bir xil body → saqlangan javob, xuddi shu status va body. Header'da `Idempotent-Replayed: true`.",
    "   - Bir xil kalit + boshqa body → `422` (`idempotency_key_reused`).",
    "   - Bir xil kalit, birinchi so'rov hali bajarilmoqda → `409` (`idempotency_request_in_progress`).",
    "   - Birinchi so'rov 5xx bilan tugagan → kalit saqlanmaydi va qayta urinish yangi bajarilish.",
    "",
    "### Mijozga qo'llanma",
    "- **Har mantiqiy amal uchun yangi kalit.** \"To'lash\" tugmasi bosilganda kalit yaratiladi.",
    "- **Retry'larda xuddi shu kalit.** Tarmoq xatosi, timeout, 5xx yoki 409 dan keyin.",
    "- Kalitni amal bilan birga lokal saqlang (masalan, mobil ilova yopilib qayta ochilsa ham), toki amal yakuniy natija olmaguncha.",
    "- Foydalanuvchi ataylab qayta to'lamoqchi bo'lsa (ikkinchi buyurtma) — yangi kalit.",
    "",
    "### Server tomoni kafolatlari",
    "- Kalit va natija amal bilan **atomik** saqlanadi.",
    "- Kalit tekshiruvi autentifikatsiya va avtorizatsiyadan keyin: begona foydalanuvchi boshqaning kaliti orqali javobni ololmasin.",
    "- Natija saqlangan javob, qayta hisoblangan emas: resurs keyin o'zgargan bo'lsa ham, javob birinchi bajarilishdagidek.",
    "",
    "### Webhook'lar uchun teskari tomon",
    "Siz webhook yuborsangiz, har hodisaga noyob `event_id` bering va hujjatda iste'molchilarga dublikatlarni shu ID bo'yicha aniqlashni tavsiya qiling (24.x). Bu ham idempotentlik shartnomasi, faqat teskari yo'nalishda."
  ],
  "examples": [
    {
      "title": "Hujjat parchasi",
      "lang": "text",
      "code": [
        "Idempotentlik",
        "",
        "POST /v1/payments, POST /v1/refunds, POST /v1/transfers uchun",
        "Idempotency-Key header'i majburiy (UUID v4).",
        "",
        "- Kalit 24 soat saqlanadi.",
        "- Takroriy so'rov (bir xil kalit va body) birinchi javobni qaytaradi,",
        "  header: Idempotent-Replayed: true.",
        "- Bir xil kalit, boshqa body: 422 idempotency_key_reused.",
        "- Birinchi so'rov hali bajarilmoqda: 409 idempotency_request_in_progress,",
        "  Retry-After bilan.",
        "- 5xx javoblar saqlanmaydi: xuddi shu kalit bilan qayta urining."
      ]
    },
    {
      "title": "Mijoz (Kotlin/Swift o'rniga JS misoli)",
      "lang": "javascript",
      "code": [
        "async function pay(orderId, amount) {",
        "  const key = localStorage.getItem(`pay:${orderId}`) ?? crypto.randomUUID();",
        "  localStorage.setItem(`pay:${orderId}`, key);",
        "",
        "  for (let attempt = 0; attempt < 4; attempt++) {",
        "    const res = await fetch('/api/v1/payments', {",
        "      method: 'POST',",
        "      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key },",
        "      body: JSON.stringify({ order_id: orderId, amount }),",
        "    }).catch(() => null);",
        "",
        "    if (res && res.status < 500 && res.status !== 409) {",
        "      localStorage.removeItem(`pay:${orderId}`);",
        "      return res.json();",
        "    }",
        "    await new Promise(r => setTimeout(r, 2 ** attempt * 500));",
        "  }",
        "  throw new Error('To\\'lov holati noma\\'lum, keyinroq tekshiring');",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Idempotentlik qoidalarini hujjatlashtirmasdan, mijozlar har retry'da yangi kalit yaratishi.",
    "Kalit tekshiruvini autentifikatsiyadan oldin bajarish.",
    "Saqlangan javob o'rniga resursning joriy holatini qaytarish: takroriy so'rov boshqa natija beradi.",
    "Pul endpoint'larida kalitni ixtiyoriy qilish."
  ]
});
