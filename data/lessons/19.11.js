/* Chuqur dars: 19.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("19.11", {
  "lesson": [
    "### Moslikni boshidan loyihalash",
    "18.18 da mavjud API'ni buzmasdan o'zgartirish ko'rildi. Bu darsning mavzusi — **birinchi kundanoq** keyingi o'zgarishlarni oson qiladigan dizayn qarorlari. Ularni keyin kiritish ko'pincha buzuvchi o'zgarish.",
    "",
    "### 1. Kengaytiriladigan tuzilmalar",
    "- **Pul — obyekt:** `\"total\": 150000` o'rniga `\"total\": {\"amount\": 150000, \"currency\": \"UZS\"}`. Keyinchalik `formatted`, `precision` qo'shish buzmaydi. Skalyardan obyektga o'tish esa buzadi.",
    "- **Javob doim obyekt:** yuqori darajada massiv emas. `{\"data\": [...]}` — keyin `meta` qo'shish mumkin.",
    "- **Ro'yxat maydonlari obyektlar massivi:** `\"tags\": [\"vip\"]` o'rniga `\"tags\": [{\"slug\": \"vip\"}]`, agar keyin teg nomi yoki rangi kerak bo'lishi mumkin bo'lsa.",
    "- **Boolean o'rniga enum:** `\"is_active\": true` keyinroq uchinchi holat (`suspended`) kerak bo'lganda yetmaydi. `\"status\": \"active\"` kengayadi.",
    "",
    "### 2. Enum'lar uchun noma'lum qiymat",
    "Yangi enum qiymati qo'shish qat'iy enum'li mijozlarni yiqitishi mumkin. Hujjatda talab qiling: \"mijozlar noma'lum qiymatni `unknown` sifatida qayta ishlashi kerak\". Mobil SDK'larda `UNKNOWN` holati bo'lsin.",
    "",
    "### 3. Yangi parametrlar default bilan",
    "Yangi so'rov parametri yoki maydoni ixtiyoriy va default xatti-harakat eskisi bilan bir xil bo'lsin. Masalan, yangi `include_archived` parametri default'da `false`.",
    "",
    "### 4. Javob tartibiga tayanmaslik",
    "JSON obyektidagi maydonlar tartibi kafolatlanmaydi. Hujjatda ayting va mijozlarga tartibga tayanmaslikni tavsiya qiling.",
    "",
    "### 5. ID'lar string",
    "Bugun `bigint`, ertaga ULID yoki boshqa tizimdan kelgan ID. Boshidan string bo'lsa, o'zgartirish buzmaydi.",
    "",
    "### 6. Ichki tuzilmani oshkor qilmaslik",
    "API maydonlari DB ustunlariga bevosita bog'lanmasin (18.17). Jadvalni qayta tuzish API'ga ta'sir qilmaydi.",
    "",
    "### 7. Tolerant Reader talabi",
    "Mijoz hujjatida: \"Noma'lum maydonlarni e'tiborsiz qoldiring. Yangi maydonlar ogohlantirishsiz qo'shilishi mumkin.\" Bu sizga erkin qo'shish huquqini beradi.",
    "",
    "### Tekshirish",
    "- OpenAPI diff (`oasdiff breaking`) CI'da: har PR spetsifikatsiyani oldingi versiya bilan solishtiradi.",
    "- Kontrakt testlari (19.19).",
    "- Iste'molchilar ro'yxati: kim qaysi endpoint va maydonni ishlatadi (log'lar, API klient analitikasi)."
  ],
  "examples": [
    {
      "title": "Kengaytiriladigan va kengaymaydigan",
      "lang": "json",
      "code": [
        "// Kengaymaydi",
        "{ \"total\": 150000, \"is_active\": true, \"tags\": [\"vip\"], \"id\": 42 }",
        "",
        "// Kengayadi",
        "{",
        "  \"id\": \"42\",",
        "  \"total\": { \"amount\": 150000, \"currency\": \"UZS\" },",
        "  \"status\": \"active\",",
        "  \"tags\": [{ \"slug\": \"vip\" }]",
        "}"
      ]
    },
    {
      "title": "CI'da buzuvchi o'zgarishni aniqlash",
      "lang": "bash",
      "code": [
        "# main'dagi spetsifikatsiya bilan solishtirish",
        "git show origin/main:docs/openapi.yaml > /tmp/base.yaml",
        "",
        "oasdiff breaking /tmp/base.yaml docs/openapi.yaml --fail-on ERR",
        "",
        "# error [response-property-removed] at docs/openapi.yaml",
        "#   in API GET /v1/orders/{order}",
        "#     removed the required property 'data/total' from the response with the '200' status"
      ]
    }
  ],
  "pitfalls": [
    "Pulni skalyar son sifatida loyihalash: keyin valyuta qo'shish buzuvchi o'zgarish.",
    "Ikki holatdan ko'pga o'sishi mumkin bo'lgan narsani boolean qilish.",
    "Mijozlarga noma'lum enum qiymatlarini qayta ishlashni talab qilmaslik.",
    "Spetsifikatsiya o'zgarishlarini CI'da avtomatik tekshirmaslik."
  ]
});
