/* Chuqur dars: 5.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("5.5", {
  "lesson": [
    "### Adapter",
    "**Adapter** — mos kelmaydigan interface'larni bir-biriga ulaydi: mavjud (begona) klassni mijoz kutayotgan interface'ga \"o'raydi\". Elektr vilkasi adapteriga o'xshash.",
    "",
    "### Qachon kerak",
    "- Uchinchi tomon kutubxonasi sizning interface'ingizga mos emas.",
    "- Eski (legacy) kodni yangi interface bilan ishlatish.",
    "- Tashqi API'ni almashtirish mumkin bo'lishi uchun izolyatsiya.",
    "",
    "### Tuzilma",
    "`Target` (siz kutadigan interface), `Adaptee` (begona klass), `Adapter implements Target` ichida `Adaptee` ni saqlaydi va chaqiruvlarni tarjima qiladi.",
    "",
    "### Foydasi",
    "- Begona kod o'zgarishi faqat adapterga ta'sir qiladi (OCP, DIP).",
    "- Test uchun fake adapter.",
    "- Provayderni almashtirish oson.",
    "",
    "### Laravel'da",
    "Cache/Storage/Mail drayverlari — adapterlar (Flysystem adapteri, Monolog handler'lari). `Illuminate\\Support\\Manager`. PSR-7 ko'prigi (`psr-http-message-bridge`) ham adapter.",
    "",
    "### Decorator va Facade bilan farqi",
    "- **Adapter:** interface'ni **o'zgartiradi**.",
    "- **Decorator:** interface'ni **saqlab** xulq qo'shadi.",
    "- **Facade:** murakkab tizimga **soddalashtirilgan** interface beradi.",
    "",
    "### Ehtiyot",
    "Domenga begona kutubxona tiplarini (Guzzle `Response`) sizdirmang: adapter domen tiplarini qaytarsin."
  ],
  "examples": [
    {
      "title": "Tashqi SDK adapteri",
      "lang": "php",
      "code": [
        "interface SmsSender { public function send(string $phone, string $text): void; }   // bizning interface",
        "",
        "final class EskizAdapter implements SmsSender",
        "{",
        "    public function __construct(private \\Vendor\\EskizClient $client) {}            // begona SDK",
        "    public function send(string $phone, string $text): void",
        "    {",
        "        $this->client->sendMessage(['mobile_phone' => ltrim($phone, '+'), 'message' => $text, 'from' => '4546']);",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Begona SDK tiplarini domen kodiga sizdirish adapterning foydasini yo'q qiladi.",
    "Adapter ichida biznes mantiq yozish SRP'ni buzadi: u faqat tarjima qiladi.",
    "Adapter va Decorator'ni adashtirmang: birinchisi interface'ni o'zgartiradi.",
    "Har kutubxona uchun adapter ortiqcha bo'lishi mumkin: almashtirish ehtimoli bo'lsa."
  ]
});
