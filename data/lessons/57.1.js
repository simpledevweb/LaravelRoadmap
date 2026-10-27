/* Chuqur dars: 57.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("57.1", {
  "lesson": [
    "### Xdebug nima",
    "**Xdebug** — PHP kengaytmasi: qadam-baqadam tuzatish (step debugging), profil, kod qamrovi (coverage), trace va kengaytirilgan `var_dump`/xato xabarlari. Xdebug 3 dan hamma imkoniyat **mode**lar bilan boshqariladi.",
    "",
    "### O'rnatish",
    "- **Linux:** `sudo apt install php-xdebug` yoki `pecl install xdebug`.",
    "- **Docker:** `pecl install xdebug && docker-php-ext-enable xdebug`.",
    "- **macOS:** `pecl install xdebug` / Homebrew.",
    "- **Windows:** mos DLL (xdebug.org wizard: `phpinfo()` chiqishini yuboring).",
    "Tekshirish: `php -v` (\"with Xdebug v3...\") yoki `php -m | grep xdebug`.",
    "",
    "### Asosiy sozlamalar (Xdebug 3)",
    "```ini",
    "zend_extension=xdebug",
    "xdebug.mode=debug,develop        ; off,develop,coverage,debug,gcstats,profile,trace",
    "xdebug.start_with_request=trigger ; yes | no | trigger | default",
    "xdebug.client_host=127.0.0.1",
    "xdebug.client_port=9003          ; Xdebug 3 default (Xdebug 2: 9000)",
    "xdebug.idekey=PHPSTORM",
    "```",
    "`xdebug.mode` bo'sh yoki `off` bo'lsa Xdebug deyarli yuk bermaydi.",
    "",
    "### Fayl joyi",
    "`php --ini` qaysi `conf.d` ishlatilganini ko'rsatadi: odatda `20-xdebug.ini`. CLI va FPM uchun alohida bo'lishi mumkin; o'zgarishdan keyin FPM'ni qayta ishga tushiring.",
    "",
    "### Ishlatish usuli",
    "- `start_with_request=yes` — har so'rovda debug sessiya (sekin).",
    "- `trigger` — faqat maxsus trigger bilan (`XDEBUG_SESSION` cookie/GET/env). **Tavsiya.**",
    "",
    "### Dev vs prod",
    "Xdebug faqat **development**da. Productionda o'rnatmang (xavfsizlik va tezlik).",
    "",
    "### Muammolarni topish",
    "`xdebug_info()` yoki `php -r 'xdebug_info();'` (3.2+) holatni diagnostika qiladi; `xdebug.log` faylga yozadi."
  ],
  "examples": [
    {
      "title": "php.ini sozlash",
      "lang": "ini",
      "code": [
        "; /etc/php/8.4/mods-available/xdebug.ini",
        "zend_extension=xdebug",
        "xdebug.mode=debug,develop",
        "xdebug.start_with_request=trigger",
        "xdebug.client_host=127.0.0.1",
        "xdebug.client_port=9003",
        "xdebug.log=/tmp/xdebug.log"
      ]
    }
  ],
  "pitfalls": [
    "Productionda Xdebug yoqilgan bo'lsa sezilarli sekinlashadi va xavfsizlik xavfi: faqat dev.",
    "Xdebug 3 portini 9000 deb qoldirish ulanishni buzadi: default 9003.",
    "CLI va FPM uchun turli ini: sozlamani to'g'ri faylga yozing va FPM'ni reload qiling.",
    "`xdebug.mode` bo'sh qoldirilmasa/noto'g'ri bo'lsa kerakli imkoniyat ishlamaydi."
  ]
});
