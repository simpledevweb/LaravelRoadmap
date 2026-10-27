/* Chuqur dars: 57.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("57.2", {
  "lesson": [
    "### Step debugging nima",
    "**Qadam-baqadam tuzatish** — kodni bitta qatordan bajarib, har qadamda o'zgaruvchilar qiymatini ko'rish. `var_dump`/`dd()` ga qaraganda ko'proq ma'lumot va kodni o'zgartirmaslik.",
    "",
    "### Qanday ishlaydi",
    "1. IDE port 9003 da **tinglaydi** (Listen for PHP Debug Connections).",
    "2. PHP so'rov boshlanganda Xdebug **IDE'ga ulanadi** (client_host:client_port).",
    "3. IDE breakpoint'da to'xtatadi va boshqaruvni beradi.",
    "",
    "### Boshqaruv tugmalari",
    "- **Step Over (F8/F10):** joriy qatorni bajaradi, funksiya ichiga kirmaydi.",
    "- **Step Into (F7/F11):** chaqirilgan funksiya ichiga kiradi.",
    "- **Step Out (Shift+F8/F11):** joriy funksiyadan chiqadi.",
    "- **Resume/Continue (F9):** keyingi breakpoint'gacha.",
    "- **Run to Cursor:** kursorgacha bajaradi.",
    "- **Stop:** sessiyani tugatadi.",
    "",
    "### Ish tartibi",
    "1. Shubhali joyga breakpoint qo'ying.",
    "2. Debug sessiyani yoqing, so'rovni yuboring (brauzer/CLI/Postman).",
    "3. O'zgaruvchilarni, call stack'ni tekshiring.",
    "4. Gipotezani qadam bilan tekshiring.",
    "",
    "### Laravel'da",
    "Xdebug controller, middleware, Eloquent, queue job ichiga kiradi (queue worker uchun CLI'da trigger). `vendor/` ichiga ham kirish mumkin (framework tushunish uchun).",
    "",
    "### Maslahat",
    "- Katta tsiklda **conditional breakpoint** (keyingi mavzu).",
    "- Har safar ishlamasa: `xdebug.log`, port va `client_host` ni tekshiring."
  ],
  "examples": [
    {
      "title": "Debug sessiyani boshlash",
      "lang": "bash",
      "code": [
        "# 1) IDE: \"Start Listening for PHP Debug Connections\"",
        "# 2) CLI skript",
        "XDEBUG_SESSION=1 php artisan app:import",
        "# 3) Brauzer: ?XDEBUG_SESSION_START=PHPSTORM yoki 'Xdebug helper' kengaytmasi"
      ]
    }
  ],
  "pitfalls": [
    "Step Over va Step Into'ni adashtirish vaqtni yo'qotadi: kerakli funksiyaga kirish uchun Into.",
    "IDE tinglamayotgan bo'lsa so'rov odatdagidek bajariladi va sessiya yo'q: avval tinglashni yoqing.",
    "Katta tsiklda har iteratsiyada to'xtash: conditional breakpoint.",
    "Fayl yo'llari mos emas (Docker): path mapping kerak."
  ]
});
