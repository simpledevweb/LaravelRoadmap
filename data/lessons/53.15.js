/* Chuqur dars: 53.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("53.15", {
  "lesson": [
    "### CDN",
    "(Asos: 54.16.) Statik va keshlanadigan kontentni foydalanuvchiga **yaqin edge serverlardan** berish: kechikish va origin yuki kamayadi.",
    "",
    "### Foydasi",
    "- **Tezlik:** foydalanuvchiga yaqin (TTFB, asset yuklanishi).",
    "- **Origin yuki:** statik so'rovlar origin'ga yetmaydi.",
    "- **Mavjudlik:** origin yiqilsa ham (stale-if-error) berish.",
    "- **Himoya:** DDoS, WAF, TLS.",
    "- **Optimizatsiya:** brotli, HTTP/3, rasm o'zgartirish.",
    "",
    "### Nimani CDN'ga",
    "- Assetlar (Vite hash'li css/js/shrift/rasm).",
    "- Foydalanuvchi yuklagan rasmlar/fayllar (S3 + CloudFront).",
    "- Ommaviy sahifa/API (qisqa `s-maxage`).",
    "- Video/katta fayllar.",
    "",
    "### Sozlash",
    "- Origin: `Cache-Control: public, max-age=31536000, immutable` (hash'li); HTML uchun qisqa.",
    "- **Cache key:** keraksiz parametrlarsiz.",
    "- **Purge** deploydan keyin; versiyalangan URL afzal.",
    "- Maxfiy/foydalanuvchiga xos javob: keshlanmasin (`private`, `no-store`).",
    "- `ASSET_URL` yoki Vite `base` = CDN domeni; Storage `url` CDN orqali.",
    "",
    "### Rasm optimizatsiyasi",
    "CDN image resize (Cloudflare Images, imgix, CloudFront + Lambda), WebP/AVIF, `srcset`, lazy loading (`loading=\"lazy\"`).",
    "",
    "### O'lchash",
    "CDN hit ratio, origin bandwidth, TTFB (mintaqalar bo'yicha), Core Web Vitals (LCP).",
    "",
    "### Xavflar",
    "Eskirgan kontent (purge), noto'g'ri kesh kaliti (cookie bo'yicha boshqa kontent), maxfiy javobni keshlash, CORS/header'lar.",
    "",
    "### Laravel",
    "`ASSET_URL`, `Vite::useBuildDirectory`, Storage `s3` + `url`, `Cache-Control` middleware."
  ],
  "examples": [
    {
      "title": "Asset URL",
      "lang": "bash",
      "code": [
        "# .env",
        "ASSET_URL=https://cdn.example.com",
        "# vite.config.js -> base: 'https://cdn.example.com/build/'",
        "curl -I https://cdn.example.com/build/assets/app-3f9a1c.js | grep -iE \"cache-control|age|cf-cache\""
      ]
    }
  ],
  "pitfalls": [
    "Maxfiy javobni CDN keshlasa boshqa foydalanuvchi ma'lumoti sizadi.",
    "Hash'siz asset nomlari + uzoq `max-age` yangilanishni bloklaydi.",
    "Kesh kalitidagi keraksiz parametrlar hit ratio'ni tushiradi.",
    "CORS/header'larni CDN'da sozlamaslik shrift/asset xatosi beradi."
  ]
});
