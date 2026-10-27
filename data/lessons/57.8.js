/* Chuqur dars: 57.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("57.8", {
  "lesson": [
    "### Remote Debugging",
    "**Masofaviy tuzatish** — kod boshqa joyda (server, VM, Docker, WSL) ishlayotganda uni lokal IDE'dan tuzatish. Xdebug **teskari ulanadi**: server (PHP) → IDE (sizning kompyuteringiz).",
    "",
    "### Muhim tushuncha",
    "Xdebug'da **PHP — mijoz**, **IDE — server** (port 9003'da tinglaydi). Shuning uchun PHP IDE manziliga yetib borishi kerak.",
    "",
    "### Sozlash",
    "```ini",
    "xdebug.mode=debug",
    "xdebug.start_with_request=trigger",
    "xdebug.client_host=<IDE kompyuteri IP>",
    "xdebug.client_port=9003",
    "```",
    "- `xdebug.discover_client_host=1` so'rov kelgan IP'ni avtomatik oladi (xavfsizlik: faqat ishonchli tarmoqda).",
    "- Port 9003 fayrvol/NAT orqali ochiq bo'lishi kerak.",
    "",
    "### SSH tunnel (tavsiya)",
    "Server IP'siz ulanish uchun teskari tunnel:",
    "`ssh -R 9003:localhost:9003 user@server` — serverdagi `127.0.0.1:9003` sizning IDE'ga yo'naltiriladi; `client_host=127.0.0.1`.",
    "",
    "### Path mapping",
    "IDE serverdagi `/var/www/app` yo'lini lokal `~/project` ga moslashi shart: PhpStorm \"Servers\" → mapping; VS Code `pathMappings`.",
    "",
    "### Xavfsizlik",
    "Productionda Xdebug ochmang. Stagingda faqat vaqtincha, cheklangan IP, `trigger` rejimi.",
    "",
    "### Muammo tekshirish",
    "`xdebug.log` faylda \"Could not connect to debugging client\" — host/port/fayrvolni tekshiring. `telnet`/`nc -vz host 9003` bilan ulanishni sinang."
  ],
  "examples": [
    {
      "title": "SSH tunnel + sozlama",
      "lang": "bash",
      "code": [
        "# lokal mashinadan",
        "ssh -R 9003:localhost:9003 deploy@staging.example.com",
        "",
        "# serverda (xdebug ini)",
        "# xdebug.mode=debug",
        "# xdebug.start_with_request=trigger",
        "# xdebug.client_host=127.0.0.1",
        "# xdebug.client_port=9003"
      ]
    }
  ],
  "pitfalls": [
    "Productionda Xdebug ochish xavfli va sekin: faqat dev/staging.",
    "`discover_client_host` ochiq tarmoqda begonaga ulanishga olib kelishi mumkin.",
    "Fayrvol 9003'ni to'sib qo'ysa 'Could not connect to debugging client'.",
    "Path mapping noto'g'ri bo'lsa breakpoint'lar ishlamaydi."
  ]
});
