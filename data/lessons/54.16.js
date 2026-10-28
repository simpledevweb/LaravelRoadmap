/* Chuqur dars: 54.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("54.16", {
  "lesson": [
    "### CDN caching",
    "**CDN** (Cloudflare, CloudFront, Fastly, Bunny) — dunyo bo'ylab **edge serverlar**; kontent foydalanuvchiga **yaqin** joydan beriladi: kechikish va origin yuki kamayadi.",
    "",
    "### Nimalarni keshlaydi",
    "- **Statik:** rasm, css/js, shrift, video.",
    "- **Ommaviy HTML/API** (qisqa TTL, `s-maxage`).",
    "- Katta fayllar (yuklab olish).",
    "",
    "### Boshqarish",
    "- `Cache-Control: s-maxage` — CDN uchun alohida TTL (`max-age` brauzer uchun).",
    "- **Cache key:** URL + (qo'shimcha: query, header, cookie) — sozlanadi. Ortiqcha parametr (`utm_*`) kalitdan chiqariladi.",
    "- **Purge (invalidatsiya):** URL, prefiks, **teg (surrogate key)** bo'yicha; deploydan keyin.",
    "- **Versiyalangan URL:** `app.3f9a.css` (purge'siz yangilash).",
    "- **Origin shield**, **stale-if-error** (origin yiqilsa eskisini berish).",
    "- **Edge funksiyalar** (Workers/Lambda@Edge).",
    "",
    "### Maxfiy ma'lumot",
    "Foydalanuvchiga xos javobni (cookie/Authorization) CDN **keshlamasligi** shart: `private`/`no-store`, cookie bilan bypass. Aks holda boshqa foydalanuvchi ma'lumoti sizadi.",
    "",
    "### Boshqa foydasi",
    "DDoS himoyasi, TLS, HTTP/2–3, siqish (brotli), rasm optimizatsiyasi.",
    "",
    "### Laravel",
    "`Cache-Control` header'lari (54.15), Vite hash'li assets, `ASSET_URL` = CDN, Storage `url()` CDN domeni; purge uchun API (Cloudflare) deployda; `Surrogate-Key` header.",
    "",
    "### Tekshirish",
    "`curl -I` → `CF-Cache-Status: HIT`, `X-Cache`, `Age`. Hit ratio monitoring.",
    "",
    "### Xavflar",
    "Eskirgan kontent (purge unutildi), noto'g'ri kesh kaliti (cookie bo'yicha boshqa kontent), maxfiy javobni keshlash."
  ],
  "examples": [
    {
      "title": "Header va purge",
      "lang": "bash",
      "code": [
        "# origin javobi: CDN 5 daqiqa, brauzer 1 daqiqa",
        "# Cache-Control: public, max-age=60, s-maxage=300, stale-if-error=86400",
        "curl -I https://cdn.example.com/app.css | grep -iE \"cache|age|cf-cache\"",
        "# deploydan keyin purge (Cloudflare)",
        "curl -X POST \"https://api.cloudflare.com/client/v4/zones/$ZONE/purge_cache\" -H \"Authorization: Bearer $TOKEN\" --data '{\"purge_everything\":true}'"
      ]
    }
  ],
  "pitfalls": [
    "Foydalanuvchiga xos javobni CDN keshlasa boshqa foydalanuvchi ma'lumoti sizadi.",
    "Purge unutilsa eskirgan kontent: versiyalangan URL ishlating.",
    "Kesh kalitida keraksiz parametrlar (`utm_*`) hit ratio'ni tushiradi.",
    "`public, max-age` uzoq bo'lib versiyalanmagan fayl yangilanmaydi."
  ]
});
