/* Chuqur dars: 8.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("8.5", {
  "lesson": [
    "### PSR-11: Container Interface",
    "DI container'lar uchun **minimal** umumiy interface: `Psr\\Container\\ContainerInterface`:",
    "- `get(string $id): mixed` — xizmatni oladi.",
    "- `has(string $id): bool` — mavjudligini tekshiradi.",
    "Xatolar: `NotFoundExceptionInterface` (topilmadi), `ContainerExceptionInterface` (umumiy xato).",
    "",
    "### Maqsad",
    "Framework va kutubxonalar container turini bilmasdan xizmat olishi: ko'prik (middleware, router, handler'lar) turli container bilan ishlaydi.",
    "",
    "### Muhim ogohlik",
    "PSR-11 faqat **o'qish** interface'i; xizmatlarni ro'yxatdan o'tkazish (bind) standartlashtirilmagan. Va **Service Locator anti-pattern**: klass ichida `$container->get()` — yashirin bog'liqlik. PSR-11 container'ni faqat **composition root** (router, factory) da ishlating; servislar konstruktor orqali DI qiladi.",
    "",
    "### Implementatsiyalar",
    "Laravel Container, Symfony DI, PHP-DI, League Container, Pimple.",
    "",
    "### Laravel'da",
    "`Illuminate\\Container\\Container` va `Illuminate\\Contracts\\Container\\Container` `ContainerInterface` ni amalga oshiradi: `app()->get(Foo::class)`, `app()->has(...)`. Laravel o'z metodlari (`make`, `bind`, `singleton`) bilan kengroq.",
    "",
    "### Autowiring",
    "PSR-11 talab qilmaydi, lekin ko'p implementatsiyalar bor: konstruktor tiplari bo'yicha avtomatik.",
    "",
    "### Qoida",
    "Servis ichida container'ni ENJEKSIYA qilmang; kerakli bog'liqlikni to'g'ridan so'rang."
  ],
  "examples": [
    {
      "title": "Factory ichida (composition root)",
      "lang": "php",
      "code": [
        "use Psr\\Container\\ContainerInterface;",
        "",
        "final class ControllerFactory",
        "{",
        "    public function __construct(private ContainerInterface $c) {}      // faqat factory'da ruxsat",
        "    public function make(string $class): object { return $this->c->get($class); }",
        "}",
        "// servis ichida YOMON: private ContainerInterface $c; ... $this->c->get(Mailer::class)"
      ]
    }
  ],
  "pitfalls": [
    "Servis ichida `ContainerInterface` olish Service Locator anti-pattern.",
    "PSR-11 faqat `get/has`: bind/register uchun implementatsiya API'siga murojaat.",
    "`has()` true bo'lsa ham `get()` yaratishda xato berishi mumkin.",
    "Container'ni global holda uzatish bog'liqlikni yashiradi."
  ]
});
