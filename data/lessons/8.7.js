/* Chuqur dars: 8.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("8.7", {
  "lesson": [
    "### PSR-15: HTTP Server Request Handlers va Middleware",
    "PSR-7 ustiga qurilgan: so'rovni qayta ishlash va **middleware zanjiri** uchun interface'lar.",
    "",
    "### Interface'lar",
    "- `RequestHandlerInterface::handle(ServerRequestInterface $r): ResponseInterface` — so'rovni qabul qilib javob qaytaradi.",
    "- `MiddlewareInterface::process(ServerRequestInterface $r, RequestHandlerInterface $next): ResponseInterface` — so'rovni qayta ishlaydi, `$next->handle($r)` bilan keyingisiga uzatadi yoki o'zi javob qaytaradi.",
    "",
    "### Piyozsimon (onion) model",
    "So'rov middleware'lardan **kirib** boradi, handler javob beradi, javob teskari tartibda **chiqadi**. Middleware oldin (so'rovni o'zgartirish, auth) va keyin (javobni o'zgartirish, headers) ishlay oladi.",
    "",
    "### Foydalanish",
    "Autentifikatsiya, CORS, rate limit, logging, kesh, xatolarni ushlash, marshrutlash. Ko'p mikro-framework (Slim, Mezzio) shu standart ustida.",
    "",
    "### Ma'lumot uzatish",
    "Middleware `request->withAttribute('user', $user)` bilan keyingilarga ma'lumot beradi (immutable).",
    "",
    "### Laravel'da",
    "Laravel middleware PSR-15 emas, o'z shakli: `handle($request, Closure $next)`, `Illuminate\\Http\\Request`. G'oya bir xil (pipeline). PSR-15 kerak bo'lsa bridge yoki Mezzio/Slim.",
    "",
    "### Qoidalar",
    "- Tartib muhim: xatolarni ushlovchi tashqarida, auth ichkarida.",
    "- Middleware kichik va bitta vazifali bo'lsin.",
    "- Javobni qaytarmasdan `next` chaqirmaslik (qisqa tutashuv) — ongli."
  ],
  "examples": [
    {
      "title": "Middleware",
      "lang": "php",
      "code": [
        "use Psr\\Http\\Server\\{MiddlewareInterface, RequestHandlerInterface};",
        "use Psr\\Http\\Message\\{ServerRequestInterface, ResponseInterface};",
        "",
        "final class RequireApiKey implements MiddlewareInterface",
        "{",
        "    public function __construct(private string $key, private ResponseFactoryInterface $responses) {}",
        "",
        "    public function process(ServerRequestInterface $req, RequestHandlerInterface $next): ResponseInterface",
        "    {",
        "        if (!hash_equals($this->key, $req->getHeaderLine('X-Api-Key'))) {",
        "            return $this->responses->createResponse(401);       // zanjirni uzadi",
        "        }",
        "        return $next->handle($req->withAttribute('authorized', true));",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Middleware tartibi muhim: xato ushlovchi eng tashqarida, autentifikatsiya ruxsatdan oldin.",
    "`withAttribute` yangi so'rov qaytaradi: natijani keyingisiga uzating.",
    "Laravel middleware PSR-15 emas: interface boshqa.",
    "API kalitini `==` bilan solishtirish timing hujumiga ochiq: `hash_equals`."
  ]
});
