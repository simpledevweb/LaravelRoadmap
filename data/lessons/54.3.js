/* Chuqur dars: 54.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("54.3", {
  "lesson": [
    "### Write-Through",
    "Yozishda ma'lumot **bir vaqtda** keshga va manbaga (DB) **sinxron** yoziladi. Kesh doim yangi (eskirmaydi).",
    "",
    "### Oqim",
    "```",
    "write: cache.set(k, v) va db.write(v) — ikkalasi tugagach javob",
    "read:  cache.get(k) (odatda hit)",
    "```",
    "",
    "### Afzalliklari",
    "- Kesh va DB izchil (o'qish yangi qiymat oladi).",
    "- O'qish tez va miss kam (yozilgan ma'lumot keshda).",
    "- Invalidatsiya muammosi yo'q.",
    "",
    "### Kamchiliklari",
    "- **Yozish sekinroq** (ikki joyga sinxron).",
    "- Hech o'qilmaydigan ma'lumot ham keshlanadi (xotira isrofi): TTL/eviction.",
    "- Ikki yozuvdan biri muvaffaqiyatsiz bo'lsa nomuvofiqlik: tartib va xato boshqaruvi (avval DB, keyin kesh; yoki tranzaksiya + kesh commit'dan keyin).",
    "- Atomar emas (DB va Redis alohida tizim).",
    "",
    "### Laravel'da",
    "```php",
    "DB::transaction(function () use ($user, $data) {",
    "    $user->update($data);",
    "    DB::afterCommit(fn () => Cache::put(\"user:{$user->id}\", $user->fresh(), 600));",
    "});",
    "```",
    "",
    "### Qachon",
    "O'qish ko'p, yozilgandan so'ng darrov o'qish ehtimoli yuqori, izchillik muhim (sozlamalar, profil). Ko'pincha **cache-aside + delete** soddaroq va poygaga kamroq moyil.",
    "",
    "### Write-around",
    "Yozish faqat DB'ga (kesh o'tkazib yuboriladi); o'qishda miss bo'lganda to'ldiriladi: ko'p yoziladigan, kam o'qiladigan ma'lumot uchun."
  ],
  "examples": [
    {
      "title": "Write-through",
      "lang": "php",
      "code": [
        "public function save(User $u, array $data): void",
        "{",
        "    DB::transaction(function () use ($u, $data) {",
        "        $u->update($data);",
        "        DB::afterCommit(fn () => Cache::put(\"user:{$u->id}\", $u->fresh(), 600));",
        "    });",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Kesh va DB yozuvi atomar emas: bittasi xato bersa nomuvofiqlik.",
    "Kesh yozilishini commit'dan oldin qilish rollback bo'lsa noto'g'ri qiymat qoldiradi.",
    "Hech o'qilmaydigan ma'lumotni keshlash xotirani isrof qiladi.",
    "Yozish kechikishi ikki marta: yozish og'ir yuklamada muammo."
  ]
});
