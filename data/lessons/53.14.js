/* Chuqur dars: 53.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("53.14", {
  "lesson": [
    "### HTTP compression",
    "Javobni **siqib** yuborish: matn (HTML/JSON/CSS/JS) hajmi 70–90% kamayadi: tezroq yuklanish, kam tarmoq.",
    "",
    "### Algoritmlar",
    "- **gzip** (hamma qo'llab-quvvatlaydi).",
    "- Brotli (`br`) — gzip'dan ~15–25% yaxshiroq (HTTPS'da), ko'proq CPU.",
    "- **zstd** (yangi).",
    "Mijoz `Accept-Encoding: gzip, br` yuboradi, server `Content-Encoding` bilan javob beradi.",
    "",
    "### Nginx",
    "```nginx",
    "gzip on;",
    "gzip_comp_level 5;",
    "gzip_min_length 1024;",
    "gzip_types text/plain text/css application/json application/javascript application/xml image/svg+xml;",
    "gzip_vary on;",
    "# brotli (modul): brotli on; brotli_comp_level 5; brotli_types ...;",
    "```",
    "Statik fayllarni **oldindan siqish** (`gzip_static on`, `brotli_static on`, build vaqtida `.br/.gz`).",
    "",
    "### Nimani siqish",
    "Matn turlari; **allaqachon siqilgan** (JPEG/PNG/WebP/MP4/ZIP) siqmang (CPU isrofi).",
    "",
    "### Kim siqadi",
    "Eng yaxshi: **Nginx/CDN** (PHP emas). Cloudflare/CloudFront avtomatik brotli. PHP'da `ob_gzhandler`/`zlib.output_compression` kam ishlatiladi.",
    "",
    "### Xavfsizlik",
    "BREACH hujumi (HTTPS + siqish + maxfiy ma'lumot + aks etuvchi kiritma): CSRF token randomizatsiyasi, maxfiy sahifada ehtiyot.",
    "",
    "### Tekshirish",
    "`curl -H 'Accept-Encoding: br' -I https://site.uz` → `content-encoding: br`; DevTools Network (size vs transferred).",
    "",
    "### Qo'shimcha",
    "`Vary: Accept-Encoding`, HTTP/2–3, rasm formatlari (WebP/AVIF), minification (Vite)."
  ],
  "examples": [
    {
      "title": "Nginx",
      "lang": "nginx",
      "code": [
        "gzip on; gzip_comp_level 5; gzip_min_length 1024; gzip_vary on;",
        "gzip_types text/plain text/css application/json application/javascript image/svg+xml;",
        "location ~* \\.(css|js|svg)$ { gzip_static on; expires 1y; add_header Cache-Control \"public, immutable\"; }"
      ]
    }
  ],
  "pitfalls": [
    "Allaqachon siqilgan fayllarni (JPEG/PNG/MP4) qayta siqish CPU isrofi.",
    "`Vary: Accept-Encoding` bo'lmasa kesh noto'g'ri variantni beradi.",
    "Yuqori siqish darajasi (9) CPU'ni oshiradi, foyda kam: 4–6.",
    "PHP darajasida siqish o'rniga Nginx/CDN ishlating."
  ]
});
