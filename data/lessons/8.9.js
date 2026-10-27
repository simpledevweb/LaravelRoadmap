/* Chuqur dars: 8.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("8.9", {
  "lesson": [
    "### PSR-18: HTTP Client",
    "HTTP so'rov yuborish uchun **yagona interface**: `Psr\\Http\\Client\\ClientInterface::sendRequest(RequestInterface $r): ResponseInterface`. PSR-7 xabarlari bilan ishlaydi. Kutubxona (masalan SDK) ma'lum HTTP klientga bog'lanmaydi.",
    "",
    "### Istisnolar",
    "- `ClientExceptionInterface` — umumiy.",
    "- `NetworkExceptionInterface` — tarmoq muvaffaqiyatsizligi (ulanish, timeout).",
    "- `RequestExceptionInterface` — so'rovning o'zi yaroqsiz.",
    "Muhim: **4xx/5xx javoblar istisno emas**; ularni `$response->getStatusCode()` bilan o'zingiz tekshirasiz.",
    "",
    "### Qo'shimcha PSR'lar",
    "PSR-17 (HTTP Factories): `RequestFactoryInterface`, `StreamFactoryInterface` — so'rov va oqim yaratish; PSR-7 implementatsiyasiga bog'lanmaslik uchun.",
    "",
    "### Implementatsiyalar",
    "Guzzle (PSR-18 adapter bilan), Symfony HttpClient (`Psr18Client`), `php-http/curl-client`, `php-http/discovery` (avtomatik topish).",
    "",
    "### Foydasi",
    "SDK mualliflari uchun: foydalanuvchi o'z klientini beradi; test uchun mock klient (`php-http/mock-client`).",
    "",
    "### Laravel'da",
    "Laravel `Http` fasadi Guzzle ustida (o'z API'si, PSR-18 emas, lekin PSR-7 xabarlari ichida). PSR-18 kerak bo'lsa Guzzle yoki Symfony klientini PSR-18 adapteri bilan ulang. Test uchun `Http::fake()`.",
    "",
    "### Qoidalar",
    "- Timeout, retry, backoff'ni o'zingiz sozlang (PSR-18'da standart yo'q).",
    "- Status kodni tekshiring; tarmoq xatolarini ushlang.",
    "- Maxfiy header'larni loglamang."
  ],
  "examples": [
    {
      "title": "PSR-18 klient",
      "lang": "php",
      "code": [
        "use Psr\\Http\\Client\\{ClientInterface, ClientExceptionInterface};",
        "use Psr\\Http\\Message\\RequestFactoryInterface;",
        "",
        "final class RatesClient",
        "{",
        "    public function __construct(private ClientInterface $http, private RequestFactoryInterface $requests) {}",
        "",
        "    public function fetch(): array",
        "    {",
        "        $req = $this->requests->createRequest('GET', 'https://api.example.com/rates');",
        "        try {",
        "            $res = $this->http->sendRequest($req);",
        "        } catch (ClientExceptionInterface $e) {",
        "            throw new RuntimeException('Tarmoq xatosi', 0, $e);",
        "        }",
        "        if ($res->getStatusCode() >= 400) { throw new RuntimeException('API xatosi: ' . $res->getStatusCode()); }",
        "        return json_decode((string) $res->getBody(), true, 512, JSON_THROW_ON_ERROR);",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "4xx/5xx javoblar istisno emas: status kodni tekshirmasangiz xato jim o'tadi.",
    "Timeout/retry PSR-18'da standartlashtirilmagan: klient sozlamasida belgilang.",
    "PSR-7 oqimini `(string)` bilan katta javobda xotiraga yuklash.",
    "Authorization header'ni logga yozish — maxfiy ma'lumot sizishi."
  ]
});
