/* Chuqur dars: 18.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("18.5", {
  "lesson": [
    "### Nega izchil tuzilma muhim",
    "API iste'molchisi (mobil ilova, frontend, boshqa servis) har endpoint uchun alohida parser yozmasligi kerak. Barcha javoblar bir xil \"shakl\"da bo'lsa, mijozda bitta umumiy qatlam (HTTP klient, xatolarni qayta ishlash, paginatsiya) yetarli. Izchillik — yaxshi API'ning eng qimmatli xususiyati.",
    "",
    "### So'rov",
    "- **Format:** `Content-Type: application/json`. Fayl yuklash uchun `multipart/form-data`.",
    "- **Nomlash:** `snake_case` yoki `camelCase` — bittasini tanlang va hamma joyda ishlating. Laravel ekotizimida `snake_case` tabiiy (DB ustunlari bilan mos).",
    "- **Sanalar:** ISO 8601, UTC yoki aniq offset bilan: `2025-06-01T09:30:00Z`. Faqat sana: `2025-06-01`.",
    "- **Pul:** butun son (tiyin) yoki aniq o'nlik string (`\"150000.00\"`), valyuta bilan. Float emas.",
    "- **Enum:** ma'noli string (`\"paid\"`), raqam (`2`) emas.",
    "- **ID'lar:** katta sonlar yoki UUID uchun string.",
    "",
    "### Javob",
    "- Bitta resurs: `{\"data\": {...}}`.",
    "- Kolleksiya: `{\"data\": [...], \"meta\": {...}, \"links\": {...}}`. `meta` paginatsiya va qo'shimcha ma'lumot, `links` keyingi/oldingi sahifa.",
    "- Xato: alohida, barcha endpoint'larda bir xil format (18.13).",
    "",
    "`data` o'rami nima uchun: yuqori darajaga `meta` va `links` ni qo'shish mumkin bo'ladi va bu buzuvchi o'zgarish emas. JSON'ning yuqori darajasida massiv qaytarish ham (eski brauzerlarda JSON hijacking xavfi) oldini oladi.",
    "",
    "### Null va bo'sh qiymatlar",
    "Ikki yondashuv: qiymati yo'q maydonni `null` bilan qaytarish yoki umuman qaytarmaslik. Birinchisi oldindan aytib bo'ladigan sxema beradi va ko'proq tavsiya etiladi. Ikkinchisi javobni ixchamroq qiladi. Bittasini tanlang. Bo'sh kolleksiya — `[]`, `null` emas.",
    "",
    "### Tuzilma barqarorligi",
    "Maydon turi hech qachon o'zgarmasligi kerak: `price` ba'zan son, ba'zan string bo'lsa, mijozlar yiqiladi. Laravel'da `decimal` cast string qaytaradi, `integer` cast son. API Resource'da turini aniq belgilang.",
    "",
    "### Laravel'da",
    "API Resource'lar (13.16) `data` o'rami, `meta`, `links` va paginatsiyani avtomatik beradi. `JsonResource::withoutWrapping()` o'ramni o'chiradi. Butun loyihada bitta tanlov qiling. Tashqi mijozlar uchun javob shaklini OpenAPI bilan hujjatlashtiring (75–77)."
  ],
  "examples": [
    {
      "title": "Javob tuzilmasi",
      "lang": "json",
      "code": [
        "{",
        "  \"data\": [",
        "    {",
        "      \"id\": \"01J0ZK3...\",",
        "      \"status\": \"paid\",",
        "      \"total\": { \"amount\": 15000000, \"currency\": \"UZS\" },",
        "      \"customer\": { \"id\": \"01J0ZJ...\", \"name\": \"Ali Valiyev\" },",
        "      \"note\": null,",
        "      \"tags\": [],",
        "      \"created_at\": \"2025-06-01T09:30:00Z\"",
        "    }",
        "  ],",
        "  \"links\": { \"next\": \"https://api.example.uz/v1/orders?cursor=eyJ...\", \"prev\": null },",
        "  \"meta\": { \"per_page\": 20, \"next_cursor\": \"eyJ...\" }",
        "}"
      ],
      "note": "`total.amount` tiyinda emas, so'mda. O'zbek so'mida tiyin amalda ishlatilmaydi, lekin kontraktda birlikni aniq hujjatlashtiring."
    },
    {
      "title": "Resource'da turlarni aniq belgilash",
      "lang": "php",
      "code": [
        "public function toArray(Request $request): array",
        "{",
        "    return [",
        "        'id' => (string) $this->public_id,",
        "        'status' => $this->status->value,",
        "        'total' => ['amount' => (int) $this->total, 'currency' => $this->currency],",
        "        'note' => $this->note,",
        "        'tags' => $this->tags ?? [],",
        "        'created_at' => $this->created_at->utc()->toIso8601ZuluString(),",
        "    ];",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Bir endpoint'da `camelCase`, boshqasida `snake_case`.",
    "Pulni float sifatida qaytarish: `0.1 + 0.2` muammosi mijozda.",
    "Sanalarni lokal zonada va zonasiz formatda (`2025-06-01 14:30`) qaytarish.",
    "Bir xil maydon turini holatga qarab o'zgartirish (son yoki string, obyekt yoki massiv)."
  ]
});
