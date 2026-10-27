/* Chuqur dars: 57.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("57.9", {
  "lesson": [
    "### IDE integratsiyasi",
    "Xdebug'ning o'zi faqat protokol (DBGp); qulay tuzatish IDE orqali: PhpStorm, VS Code, Eclipse PDT, NetBeans.",
    "",
    "### PhpStorm",
    "1. **Settings → PHP → Debug:** Xdebug port 9003.",
    "2. **Servers:** nom, host, **Use path mappings** (Docker/remote uchun).",
    "3. **Run → Start Listening for PHP Debug Connections** (telefon belgisi).",
    "4. Breakpoint qo'ying, brauzer/CLI'dan trigger yuboring; \"Accept incoming connection\" ni tasdiqlang.",
    "5. CLI skript: Run/Debug Configuration \"PHP Script\" yoki `PHP Remote Debug` (IDE key).",
    "Test debug: PHPUnit/Pest konfiguratsiyasidan \"Debug\".",
    "",
    "### VS Code",
    "- **PHP Debug** kengaytmasi (xdebug.php-debug).",
    "- `.vscode/launch.json`:",
    "```json",
    "{ \"version\": \"0.2.0\", \"configurations\": [",
    "  { \"name\": \"Listen for Xdebug\", \"type\": \"php\", \"request\": \"launch\", \"port\": 9003,",
    "    \"pathMappings\": { \"/var/www/html\": \"${workspaceFolder}\" } } ] }",
    "```",
    "- F5 bilan tinglashni boshlang.",
    "",
    "### Brauzer helper",
    "\"Xdebug helper\" (Chrome/Firefox) `XDEBUG_SESSION` cookie'ni yoqadi/o'chiradi: `start_with_request=trigger` bilan ishlatiladi. Yoki URL'ga `?XDEBUG_SESSION_START=PHPSTORM`.",
    "",
    "### Foydali imkoniyatlar",
    "Step Into/Over/Out, Evaluate Expression, Watches, Variables, Call Stack, conditional breakpoint, \"Run to cursor\", exception breakpoint, \"Smart step into\".",
    "",
    "### Laravel'da",
    "Laravel Sail Xdebug'ni `SAIL_XDEBUG_MODE=develop,debug` bilan yoqadi; `.env` va `docker-compose` orqali. Herd Pro ham Xdebug'ni qo'llaydi.",
    "",
    "### Muammolar",
    "IDE tinglamayapti, IDE key mos emas, path mapping, port band (boshqa IDE nusxasi), `xdebug.client_host` noto'g'ri."
  ],
  "examples": [
    {
      "title": "VS Code launch.json",
      "lang": "json",
      "code": [
        "{",
        "  \"version\": \"0.2.0\",",
        "  \"configurations\": [",
        "    {",
        "      \"name\": \"Listen for Xdebug\",",
        "      \"type\": \"php\",",
        "      \"request\": \"launch\",",
        "      \"port\": 9003,",
        "      \"pathMappings\": { \"/var/www/html\": \"${workspaceFolder}\" }",
        "    }",
        "  ]",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Port band (ikkita IDE nusxasi) bo'lsa ulanish bo'lmaydi.",
    "Path mapping'siz Docker'da IDE faylni topa olmaydi.",
    "IDE key mos kelmasa trigger ishlamaydi: PHPSTORM/VSCODE ni tekshiring.",
    "Brauzer helper o'chiq bo'lsa `trigger` rejimida sessiya boshlanmaydi."
  ]
});
