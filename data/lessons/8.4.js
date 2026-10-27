/* Chuqur dars: 8.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("8.4", {
  "lesson": [
    "### PSR-7: HTTP Message Interfaces",
    "HTTP so'rov va javoblarni obyekt sifatida ifodalovchi interface'lar: `RequestInterface`, `ServerRequestInterface`, `ResponseInterface`, `StreamInterface`, `UriInterface`, `UploadedFileInterface`. Framework va kutubxonalar bir-biri bilan HTTP xabarlarni almashadi.",
    "",
    "### Asosiy xususiyat: immutability",
    "PSR-7 obyektlari **o'zgarmas**: `with*` metodlari yangi nusxa qaytaradi:",
    "`$response = $response->withStatus(201)->withHeader('X-Id', '5');` Natijani qaytadan o'zgaruvchiga yozishni unutmang.",
    "",
    "### Qismlar",
    "- **Message:** headers (`getHeaderLine`, `withHeader`, `withAddedHeader`), body (`StreamInterface`), protocol version.",
    "- **Request:** method, URI (`UriInterface`), request target.",
    "- **ServerRequest:** `getQueryParams()`, `getParsedBody()`, `getCookieParams()`, `getUploadedFiles()`, `getAttributes()` (middleware ma'lumot uzatadi).",
    "- **Response:** status code, reason phrase.",
    "",
    "### Stream",
    "Body — `StreamInterface` (`getContents()`, `write()`, `__toString()`); katta ma'lumotlarni stream bilan uzatish xotirani tejaydi. Qaytadan o'qishdan oldin `rewind()`.",
    "",
    "### Implementatsiyalar",
    "`nyholm/psr7`, `guzzlehttp/psr7`, `laminas/laminas-diactoros`, Slim, Symfony PSR-7 bridge.",
    "",
    "### Laravel'da",
    "Laravel o'z `Illuminate\\Http\\Request/Response` (Symfony HttpFoundation) ishlatadi, PSR-7 emas. PSR-7 kerak bo'lsa `symfony/psr-http-message-bridge` + `nyholm/psr7` bilan konvertatsiya (`PsrHttpFactory`). Laravel `Http` klienti Guzzle (PSR-7 xabarlari) ustida.",
    "",
    "### Xato",
    "Immutability'ni unutib `$response->withHeader(...)` natijasini saqlamaslik: o'zgarish yo'qoladi."
  ],
  "examples": [
    {
      "title": "Immutable with*",
      "lang": "php",
      "code": [
        "use Psr\\Http\\Message\\{ServerRequestInterface, ResponseInterface};",
        "",
        "function handle(ServerRequestInterface $req, ResponseInterface $res): ResponseInterface",
        "{",
        "    $name = $req->getQueryParams()['name'] ?? 'mehmon';",
        "    $res = $res->withStatus(200)->withHeader('Content-Type', 'text/plain; charset=utf-8');   // natijani qayta yozing",
        "    $res->getBody()->write(\"Salom, $name\");",
        "    return $res;",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`$response->withHeader(...)` natijasini saqlamasangiz o'zgarish yo'qoladi (immutable).",
    "Stream bir marta o'qilsa oxiriga o'tadi: qayta o'qishdan oldin `rewind()`.",
    "Laravel Request PSR-7 emas: konvertatsiya bridge orqali.",
    "Katta body'ni `(string)` bilan xotiraga yuklash o'rniga stream bilan ishlang."
  ]
});
