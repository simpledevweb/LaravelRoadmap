/* Chuqur dars: 54.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("54.10", {
  "lesson": [
    "### Cache penetration",
    "Keshda **va bazada ham yo'q** ma'lumotni so'rash: har so'rov kesh'dan o'tib **bazaga** boradi (miss har safar). Hujumchi mavjud bo'lmagan ID'larni ko'p yuborsa (`/user/-1`, `/user/999999999`) DB yuklanadi.",
    "",
    "### Yechimlar",
    "1. **Negative caching:** \"yo'q\" natijani ham keshlash (qisqa TTL): `Cache::remember($k, 60, fn () => User::find($id) ?? false)` (54.14).",
    "2. **Bloom filter:** mavjud ID'lar to'plami (kichik xotira): filtrda yo'q bo'lsa — DB'ga bormasdan rad (RedisBloom `BF.EXISTS`).",
    "3. **Kiritma validatsiyasi:** ID formati/diapazoni (`id > 0`, UUID), noto'g'ri so'rovni erta rad etish.",
    "4. **Rate limiting** (IP/foydalanuvchi): tizimli hujumdan himoya (12.13).",
    "5. **WAF/CDN** himoyasi.",
    "6. 404 uchun ham javobni keshlash (HTTP/CDN).",
    "",
    "### Laravel",
    "```php",
    "$user = Cache::remember(\"user:{$id}\", 300, fn () => User::find($id) ?? false);   // false ham keshlanadi (null emas)",
    "abort_if($user === false, 404);",
    "```",
    "Eslatma: `Cache::remember` `null` ni keshlamaydi (miss deb hisoblaydi): `false`/sentinel ishlating.",
    "",
    "### Kuzatish",
    "Miss ratio'ning keskin o'sishi, DB'ga mavjud bo'lmagan kalit bilan so'rovlar, 404 spayki.",
    "",
    "### Penetration vs stampede vs avalanche",
    "- **Penetration:** mavjud bo'lmagan ma'lumot.",
    "- **Stampede:** bitta mashhur kalit tugadi.",
    "- **Avalanche:** ko'p kalit bir vaqtda tugadi (54.11)."
  ],
  "examples": [
    {
      "title": "Negative caching",
      "lang": "php",
      "code": [
        "public function find(int $id): ?User",
        "{",
        "    abort_if($id < 1, 404);                                              // validatsiya",
        "    $u = Cache::remember(\"user:{$id}\", 120, fn () => User::find($id) ?? false);   // false keshlanadi",
        "    return $u === false ? null : $u;",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`Cache::remember` `null`ni keshlamaydi: `false`/sentinel ishlating.",
    "Noto'g'ri formatli ID'larni validatsiyasiz bazaga yuborish penetration'ga yo'l ochadi.",
    "Negative cache uzun TTL bilan yangi yaratilgan yozuvni ko'rsatmay qo'yadi: qisqa TTL va yaratishda o'chirish.",
    "Bloom filter yangilanmasa (yangi ID) yolg'on rad etadi."
  ]
});
