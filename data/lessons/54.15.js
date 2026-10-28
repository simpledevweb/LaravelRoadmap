/* Chuqur dars: 54.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("54.15", {
  "lesson": [
    "### HTTP caching",
    "Brauzer va oraliq tizimlar (proksi, CDN) javobni **saqlab**, qayta so'ramaslik. Server yuki va kechikishni eng ko'p kamaytiradigan usul.",
    "",
    "### Header'lar",
    "- `Cache-Control`: `public` / `private` (faqat brauzer), `max-age=3600`, `s-maxage` (CDN uchun), `no-cache` (har safar tekshir), `no-store` (saqlama), `must-revalidate`, `immutable`, `stale-while-revalidate=60`.",
    "- `ETag` (kontent xeshi) + `If-None-Match` → `304 Not Modified` (tanasiz).",
    "- `Last-Modified` + `If-Modified-Since` → 304.",
    "- `Vary` (`Accept-Encoding`, `Accept-Language`, `Authorization`): kesh kaliti qo'shimcha sarlavhaga bog'liq.",
    "- `Expires` (eski), `Age`.",
    "",
    "### Qanday tanlash",
    "- **Statik fayllar** (css/js/rasm, hash'li nom): `public, max-age=31536000, immutable` (Vite versiyalash).",
    "- **HTML/API (umumiy):** qisqa `max-age` + `ETag`/`stale-while-revalidate`.",
    "- **Foydalanuvchiga xos:** `private` yoki `no-store` (maxfiy).",
    "- **Maxfiy ma'lumot** (profil, to'lov): `no-store`.",
    "",
    "### Laravel",
    "```php",
    "return response($json)->header('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');",
    "// ETag: ->setEtag(md5($content)), isNotModified($request)",
    "```",
    "Middleware `cache.headers:public;max_age=3600;etag`. Vite assets hash'li fayl.",
    "",
    "### Xavf",
    "Maxfiy javobni `public` qilish — boshqa foydalanuvchiga ko'rinadi (CDN); `Vary` unutilsa noto'g'ri variant beriladi; yangilanishni \"majburlash\" qiyin (versiyalangan URL).",
    "",
    "### Tekshirish",
    "DevTools Network (`from disk cache`, 304), `curl -I`, Lighthouse."
  ],
  "examples": [
    {
      "title": "Header'lar",
      "lang": "php",
      "code": [
        "public function show(Request $r, Post $post): Response",
        "{",
        "    $resp = response()->json($post)->setEtag(md5($post->updated_at))->setPublic()->setMaxAge(60);",
        "    return $resp->isNotModified($r) ? $resp : $resp;     // 304 avtomatik",
        "}",
        "// statik: Cache-Control: public, max-age=31536000, immutable"
      ]
    }
  ],
  "pitfalls": [
    "Maxfiy javobni `public` qilish CDN/proksi orqali boshqa foydalanuvchiga ko'rsatadi.",
    "`Vary` unutilsa noto'g'ri variant (til, siqish) beriladi.",
    "Uzoq `max-age` + versiyalanmagan URL yangilanishni foydalanuvchiga yetkazmaydi.",
    "`no-cache` 'saqlama' emas ('har safar tekshir'): saqlamaslik uchun `no-store`."
  ]
});
