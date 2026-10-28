/* Chuqur dars: 12.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("12.3", {
  "lesson": [
    "### TTL",
    "Kalitga **yashash muddati** belgilash: muddat tugagach avtomatik o'chadi. Kesh, sessiya, vaqtinchalik token uchun asosiy vosita.",
    "",
    "### Buyruqlar",
    "- `EXPIRE key 60` (soniya), `PEXPIRE key 1500` (ms), `EXPIREAT key unix_ts`.",
    "- `SET key value EX 60` / `PX 1500` / `EXAT` (yagona buyruqda), `SETEX key 60 value`.",
    "- `TTL key` (qolgan soniya; `-1` — muddatsiz, `-2` — yo'q), `PTTL`.",
    "- `PERSIST key` — TTL'ni olib tashlash.",
    "- `GETEX key EX 60` (6.2).",
    "- `EXPIRE key 60 NX|XX|GT|LT` (7.0).",
    "",
    "### Muhim qoidalar",
    "- Kalitni **qayta yozish** (`SET`) TTL'ni **o'chiradi** (agar `KEEPTTL` bo'lmasa).",
    "- `INCR`, `HSET` kabi o'zgartirishlar TTL'ni o'zgartirmaydi.",
    "- `RENAME` TTL'ni ko'chiradi.",
    "",
    "### Qanday o'chadi",
    "- **Lazy:** kalitga murojaat qilinganda tekshiriladi.",
    "- **Active:** fon'da tasodifiy kalitlarni tekshirib o'chiradi (sekundiga ~10 marta).",
    "Shuning uchun muddati o'tgan kalit biroz vaqt xotirada turishi mumkin.",
    "",
    "### Amaliy maslahatlar",
    "- **Jitter:** bir vaqtda ko'p kalit tugamasligi uchun TTL'ga tasodifiy qo'shimcha (avalanche oldi).",
    "- Sessiya/token: TTL = amal qilish muddati.",
    "- Kesh: TTL — \"xavfsizlik to'ri\" (invalidatsiya o'tkazib yuborilsa ham eskirmaydi).",
    "- TTL'siz kalitlar xotirani to'ldiradi: hamma kesh kalitiga TTL.",
    "",
    "### Laravel",
    "`Cache::put('k', $v, 600)`, `Cache::remember('k', now()->addMinutes(10), fn)`, `Redis::expire()`."
  ],
  "examples": [
    {
      "title": "TTL",
      "lang": "bash",
      "code": [
        "SET session:abc user:5 EX 1800",
        "TTL session:abc",
        "EXPIRE cache:post:10 600 NX",
        "SET cache:post:10 \"yangi\"          # TTL o'chadi!",
        "SET cache:post:10 \"yangi\" EX 600"
      ]
    }
  ],
  "pitfalls": [
    "`SET` kalitni qayta yozganda TTL'ni o'chiradi: `EX` qayta bering yoki `KEEPTTL`.",
    "TTL'siz kesh kalitlari xotirani to'ldiradi.",
    "Bir vaqtda ko'p kalit muddati tugashi (avalanche): jitter.",
    "Muddati o'tgan kalit lazy/active o'chirishgacha biroz turadi."
  ]
});
