/* Chuqur dars: 57.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("57.15", {
  "lesson": [
    "### Docker'da asosiy muammo",
    "PHP konteyner ichida, IDE **host** (kompyuteringiz)da. Xdebug konteynerdan hostga ulanishi kerak, ya'ni `client_host` konteynerdan ko'rinadigan host manzili bo'lishi shart. `127.0.0.1` konteyner o'zini bildiradi (xato).",
    "",
    "### client_host qiymatlari",
    "- **Docker Desktop (Mac/Windows):** `host.docker.internal`.",
    "- **Linux:** `host.docker.internal` ni qo'lda qo'shish kerak:",
    "```yaml",
    "services:",
    "  app:",
    "    extra_hosts: [\"host.docker.internal:host-gateway\"]",
    "```",
    "yoki bridge gateway IP (`172.17.0.1`).",
    "- **WSL2:** host Windows IP yoki `host.docker.internal` (Docker Desktop WSL integratsiyasi).",
    "",
    "### Sozlama",
    "```ini",
    "xdebug.mode=debug",
    "xdebug.start_with_request=trigger",
    "xdebug.client_host=host.docker.internal",
    "xdebug.client_port=9003",
    "```",
    "Env orqali: `XDEBUG_CONFIG=\"client_host=host.docker.internal\"`, `XDEBUG_MODE=debug`.",
    "",
    "### Path mapping",
    "Konteyner yo'li (`/var/www/html`) ↔ lokal papka. PhpStorm \"Servers\" mapping; VS Code `pathMappings`. Bo'lmasa breakpoint'lar to'xtamaydi.",
    "",
    "### Fayrvol",
    "Hostda 9003 portga konteynerdan kiruvchi ulanish ruxsat etilishi kerak (Windows Defender, `ufw`).",
    "",
    "### Tekshirish",
    "Konteyner ichidan: `nc -vz host.docker.internal 9003`; `xdebug.log` da \"Could not connect\" bo'lsa host/port/fayrvol.",
    "",
    "### Laravel Sail",
    "`SAIL_XDEBUG_MODE=develop,debug` va `XDEBUG_CONFIG=client_host=host.docker.internal client_port=9003` — Sail tayyor sozlaydi."
  ],
  "examples": [
    {
      "title": "docker-compose",
      "lang": "yaml",
      "code": [
        "services:",
        "  app:",
        "    build: .",
        "    extra_hosts:",
        "      - \"host.docker.internal:host-gateway\"     # Linux uchun",
        "    environment:",
        "      XDEBUG_MODE: debug",
        "      XDEBUG_CONFIG: \"client_host=host.docker.internal client_port=9003\"",
        "    volumes:",
        "      - ./:/var/www/html"
      ]
    }
  ],
  "pitfalls": [
    "Konteynerda `client_host=127.0.0.1` konteynerning o'ziga ulanadi: host manzili kerak.",
    "Linux'da `host.docker.internal` o'z-o'zidan yo'q: `extra_hosts ... host-gateway`.",
    "Path mapping bo'lmasa breakpoint to'xtamaydi.",
    "Hostdagi fayrvol 9003 ni to'ssa ulanish bo'lmaydi."
  ]
});
