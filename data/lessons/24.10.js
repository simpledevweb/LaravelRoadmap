/* Chuqur dars: 24.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("24.10", {
  "lesson": [
    "### Nega doimiy oraliq yomon",
    "Mijoz serveri 10 daqiqa ishlamay qoldi. Har 5 soniyada qayta urinish: 120 ta foydasiz so'rov, sizning worker'laringiz band, va server qayta ishga tushganda unga bir vaqtda minglab to'plangan so'rov uriladi va u yana yiqiladi.",
    "",
    "### Eksponensial backoff",
    "Har muvaffaqiyatsiz urinishdan keyin kutish vaqti **ko'paytiriladi**: `delay = base × 2^attempt`.",
    "- base = 10 s: 10, 20, 40, 80, 160, 320 soniya...",
    "- Qisqa uzilishlar tez yopiladi (birinchi urinishlar yaqin), uzoq uzilishlarda esa yuk keskin kamayadi.",
    "",
    "**Maksimal oraliq (cap):** `delay = min(cap, base × 2^attempt)`. Masalan, cap = 1 soat. Aks holda 15-urinish 3 kundan keyin bo'ladi.",
    "",
    "### Jitter",
    "Yuzlab mijozga webhook bir vaqtda yuborilgan va ularning hammasi bitta umumiy muammo (masalan, sizning tarmoq uzilishingiz) tufayli yiqilgan bo'lsa, ular **bir xil** jadval bo'yicha qayta urinadi: 10 s dan keyin hammasi birga, 20 s dan keyin hammasi birga. Bu \"thundering herd\". **Jitter** — kechikishga tasodifiylik qo'shish:",
    "- **Full jitter:** `delay = random(0, min(cap, base × 2^attempt))`. AWS tavsiyasi, yukni eng yaxshi tarqatadi.",
    "- **Equal jitter:** `d = min(cap, base × 2^attempt); delay = d/2 + random(0, d/2)`. Minimal kutishni saqlaydi.",
    "- **Decorrelated jitter:** `delay = min(cap, random(base, prev × 3))`.",
    "",
    "### Retry-After",
    "Server `429` yoki `503` bilan `Retry-After: 120` qaytarsa, backoff formulasidan emas, shu qiymatdan foydalaning (va kichik jitter qo'shing).",
    "",
    "### Umumiy muddat",
    "Urinishlar soni bilan birga **umumiy vaqt chegarasi** (24.9): masalan, 72 soat. Backoff jadvalini shunday tanlangki, shu muddat ichida yetarli urinishlar bo'lsin.",
    "",
    "### Laravel'da",
    "- `$backoff` massivi — har urinish uchun aniq soniyalar (deterministik, jitter'siz).",
    "- `backoff()` metodi — jitter bilan hisoblash.",
    "- `$this->release($seconds)` — handle ichidan aniq kechikish bilan qayta navbatga qo'yish (masalan, `Retry-After` bo'yicha).",
    "- HTTP klient darajasida: `Http::retry(3, fn (int $attempt) => ...)` — qisqa, sinxron retry'lar (bir so'rov ichida). Webhook yetkazish uchun queue darajasidagi retry yaxshiroq: worker'ni band qilmaydi.",
    "",
    "### Boshqa joylarda ham",
    "Xuddi shu printsip DB deadlock retry'lari (17.13), tashqi API chaqiruvlari, mijozdagi qayta ulanish (WebSocket) uchun amal qiladi."
  ],
  "examples": [
    {
      "title": "Full jitter bilan backoff",
      "lang": "php",
      "code": [
        "public function backoff(): array",
        "{",
        "    $base = 10;       // soniya",
        "    $cap = 3600;      // 1 soat",
        "",
        "    return collect(range(0, $this->tries - 2))",
        "        ->map(fn (int $n) => random_int(0, min($cap, $base * (2 ** $n))))",
        "        ->map(fn (int $d) => max($d, 5))   // juda tez emas",
        "        ->all();",
        "}"
      ],
      "note": "Laravel `backoff()` massivini job dispatch qilinganda bir marta hisoblaydi. Har urinishda yangi tasodifiy qiymat kerak bo'lsa, `handle()` ichida `release()` bilan boshqaring."
    },
    {
      "title": "Retry-After'ga rioya qilish",
      "lang": "php",
      "code": [
        "if ($response->status() === 429 || $response->status() === 503) {",
        "    $retryAfter = (int) ($response->header('Retry-After') ?: 60);",
        "    $this->release(min($retryAfter, 3600) + random_int(0, 10));",
        "    return;",
        "}"
      ]
    },
    {
      "title": "Jadvallar taqqoslanishi (base=10s, cap=3600s)",
      "lang": "text",
      "code": [
        "urinish  doimiy  eksponensial  full jitter (namuna)",
        "1        10      10            7",
        "2        10      20            13",
        "3        10      40            31",
        "4        10      80            12",
        "5        10      160           141",
        "6        10      320           275",
        "7        10      640           88",
        "8        10      1280          903",
        "9        10      2560          1977",
        "10       10      3600 (cap)    2410"
      ]
    }
  ],
  "pitfalls": [
    "Doimiy qisqa oraliq bilan qayta urinish: mijoz serveri qayta tiklanishiga xalaqit beradi.",
    "Jitter'siz eksponensial backoff: barcha urinishlar sinxronlashadi.",
    "Maksimal oraliq (cap) yo'qligi: keyingi urinishlar kunlar keyin.",
    "`Retry-After` header'ini e'tiborsiz qoldirish."
  ]
});
