/* Chuqur dars: 8.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("8.2", {
  "lesson": [
    "### PSR-3: Logger Interface",
    "Log yozish uchun **yagona interface**. Kutubxona `Psr\\Log\\LoggerInterface` ni qabul qiladi, qaysi implementatsiya (Monolog, Laravel Log) ekanini bilmaydi.",
    "",
    "### Darajalar (RFC 5424)",
    "`emergency`, `alert`, `critical`, `error`, `warning`, `notice`, `info`, `debug`. Har biri uchun metod: `$logger->error('...')`; umumiy: `log($level, $message, array $context = [])`.",
    "",
    "### Placeholder va kontekst",
    "Xabarda `{nom}` kalitlar `context` massividan almashtiriladi: `$logger->info('Foydalanuvchi {user} kirdi', ['user' => $name])`. Istisno `context['exception']` ichida beriladi (`Throwable`).",
    "",
    "### Xavfsizlik",
    "Parol, token, karta raqamini kontekstga yozmang. Foydalanuvchi kiritmasini loglash (log injection) — yangi qator va maxsus belgilarni tozalang.",
    "",
    "### Foydasi",
    "- Kutubxona frameworkdan mustaqil.",
    "- Testda `NullLogger` yoki fake logger.",
    "- Implementatsiyani almashtirish oson.",
    "",
    "### Laravel'da",
    "Laravel `Log` fasadi Monolog ustida; `Illuminate\\Log\\Logger` PSR-3 ga mos. `LoggerInterface` ni konstruktorga so'rash mumkin (container hal qiladi). Kanallar: `single`, `daily`, `stack`, `slack`.",
    "",
    "### Qoidalar",
    "- To'g'ri daraja: `error` — operatsiya muvaffaqiyatsiz; `warning` — kutilmagan, lekin davom etdi; `info` — muhim hodisa; `debug` — tafsilot.",
    "- Kontekst bilan **tuzilmaviy** log (JSON) qidirishni osonlashtiradi.",
    "- Correlation/request ID qo'shing."
  ],
  "examples": [
    {
      "title": "PSR-3 logger ishlatish",
      "lang": "php",
      "code": [
        "use Psr\\Log\\LoggerInterface;",
        "",
        "final class PaymentService",
        "{",
        "    public function __construct(private LoggerInterface $logger) {}",
        "",
        "    public function charge(int $userId, int $amount): void",
        "    {",
        "        try {",
        "            // ...",
        "            $this->logger->info('To\\'lov muvaffaqiyatli: foydalanuvchi {user}, summa {amount}', ['user' => $userId, 'amount' => $amount]);",
        "        } catch (\\Throwable $e) {",
        "            $this->logger->error('To\\'lov xatosi', ['user' => $userId, 'exception' => $e]);",
        "            throw $e;",
        "        }",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Parol/token/karta raqamini log kontekstiga yozmang.",
    "Noto'g'ri daraja (`error` har narsaga) signalni shovqinga aylantiradi.",
    "Foydalanuvchi kiritmasini tozalamay loglash — log injection xavfi.",
    "Istisnoni `context['exception']` o'rniga satr qilib yozish stack trace'ni yo'qotadi."
  ]
});
