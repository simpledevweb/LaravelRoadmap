/* Chuqur dars: 57.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("57.16", {
  "lesson": [
    "### Overhead",
    "Xdebug **ishlash tezligiga** ta'sir qiladi: yoqilgan rejimga qarab bir necha foizdan bir necha barobargacha sekinlashtirishi mumkin.",
    "",
    "### Rejimlar bo'yicha yuk",
    "- **off:** deyarli yo'q (faqat yuklangan kengaytma).",
    "- **develop:** kichik (kengaytirilgan `var_dump`, xato xabarlari, `dd`ga yordam).",
    "- **debug:** `start_with_request=trigger` bo'lsa trigger yo'q so'rovda kam; `yes` bo'lsa har so'rovda ulanish urinishi (sezilarli).",
    "- **coverage:** sezilarli (har qatorni kuzatadi).",
    "- **profile / trace:** katta (har chaqiruv yoziladi, katta fayl).",
    "- **gcstats:** kam.",
    "",
    "### Qanday kamaytirish",
    "1. `xdebug.mode` ni faqat kerakli rejimlar bilan (`debug`), kerak bo'lmasa `off`.",
    "2. `start_with_request=trigger` (har so'rovda emas).",
    "3. Coverage uchun **PCOV** (tezroq).",
    "4. Testlar/CI uchun Xdebug'ni faqat coverage bosqichida yoqing: `XDEBUG_MODE=coverage ...`; qolgan vaqtda `XDEBUG_MODE=off`.",
    "5. Docker'da alohida \"debug\" image/profile (asosiy image Xdebug'siz).",
    "6. Production: o'rnatmang.",
    "",
    "### O'lchash",
    "`php -d xdebug.mode=off script.php` va yoqilgan holatni solishtiring (`hrtime`/`time`). Sekin testlar sababi ko'pincha Xdebug yoqilganligi.",
    "",
    "### Eslatma",
    "OPcache va JIT Xdebug yoqilganda cheklanishi mumkin (JIT debug/profile bilan mos kelmaydi); shuning uchun Xdebug bilan o'lchangan tezlik haqiqiy tezlikni ko'rsatmaydi.",
    "",
    "### Qoida",
    "Xdebug — dev vositasi; tezlik o'lchash va productionda o'chiq."
  ],
  "examples": [
    {
      "title": "Rejimni boshqarish",
      "lang": "bash",
      "code": [
        "XDEBUG_MODE=off vendor/bin/pest                       # tez",
        "XDEBUG_MODE=coverage vendor/bin/pest --coverage       # faqat coverage",
        "XDEBUG_MODE=debug XDEBUG_SESSION=1 php artisan serve  # faqat debug"
      ]
    }
  ],
  "pitfalls": [
    "Xdebug yoqilgan holda tezlik o'lchash noto'g'ri natija beradi.",
    "Testlarni har safar Xdebug bilan yurgizish sekin: `XDEBUG_MODE=off`.",
    "`start_with_request=yes` har so'rovda IDE'ga ulanishga urinadi: `trigger`.",
    "JIT/OPcache Xdebug bilan cheklanishi mumkin: production bilan solishtirmang."
  ]
});
