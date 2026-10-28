/* Chuqur dars: 12.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("12.4", {
  "lesson": [
    "### Cache-aside (lazy loading)",
    "Ilova kesh bilan **o'zi** ishlaydi:",
    "1. Keshdan o'qiydi. **Hit** → qaytaradi.",
    "2. **Miss** → bazadan oladi.",
    "3. Natijani keshga **TTL bilan** yozadi.",
    "4. Qaytaradi.",
    "",
    "Yozishda: bazani yangilaydi, keshni **o'chiradi (invalidate)** — keyingi o'qish yangisini yuklaydi.",
    "",
    "### Foydasi",
    "- Faqat so'ralgan ma'lumot keshlanadi.",
    "- Kesh yiqilsa ilova ishlaydi (bazadan o'qiydi).",
    "- Sodda va keng tarqalgan.",
    "",
    "### Kamchiliklari",
    "- Birinchi so'rov sekin (cold miss).",
    "- **Eskirgan ma'lumot** (TTL gacha yoki invalidatsiya o'tkazilmasa).",
    "- **Cache stampede** (bir kalit tugaganda ko'p so'rov birdan bazaga).",
    "- Yozish va o'qish orasida **poyga** (12.20).",
    "",
    "### Laravel",
    "```php",
    "$post = Cache::remember(\"post:{$id}\", 600, fn () => Post::with('author')->findOrFail($id));",
    "```",
    "Yozishda: `Cache::forget(\"post:{$id}\")` (yoki model observer).",
    "`Cache::rememberForever`, `Cache::flexible()` (stale-while-revalidate, L11.x).",
    "",
    "### Yaxshi amaliyot",
    "- Kalit aniq va versiyalangan.",
    "- Faqat qimmat/ko'p o'qiladigan ma'lumot.",
    "- TTL har doim.",
    "- Stampede himoyasi (`Cache::lock`, flexible).",
    "- `null` natijani ham keshlash (negative caching, 54.14).",
    "- Update o'rniga **delete** (poyga kamayadi).",
    "",
    "### Muqobillar",
    "Read-through/write-through (54.2–54.3)."
  ],
  "examples": [
    {
      "title": "Cache-aside",
      "lang": "php",
      "code": [
        "public function find(int $id): Post",
        "{",
        "    return Cache::remember(\"post:{$id}\", 600, fn () => Post::with('author')->findOrFail($id));",
        "}",
        "public function update(Post $post, array $data): void",
        "{",
        "    DB::transaction(fn () => $post->update($data));",
        "    Cache::forget(\"post:{$post->id}\");        // yangilash emas, o'chirish",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Keshni yangilash (set) o'rniga o'chirish (delete) poygani kamaytiradi.",
    "TTL'siz kesh abadiy eskiradi.",
    "Stampede: kalit tugaganda ko'p so'rov bazaga uriladi (lock/flexible).",
    "Tranzaksiya commit bo'lmasdan keshni o'chirish eski ma'lumotni qayta keshlaydi."
  ]
});
