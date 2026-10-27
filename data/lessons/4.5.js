/* Chuqur dars: 4.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("4.5", {
  "lesson": [
    "### Tamoyil",
    "**Dependency Inversion Principle (DIP):**",
    "1. Yuqori darajali modullar pastki darajalilarga bog'lanmasin; ikkalasi **abstraksiyaga** bog'lansin.",
    "2. Abstraksiya tafsilotga emas, tafsilot abstraksiyaga bog'liq bo'lsin.",
    "",
    "\"Inversiya\": odatda biznes mantiq (yuqori) infratuzilmaga (DB, HTTP) bog'lanadi; DIP'da infratuzilma biznes belgilagan interface'ni amalga oshiradi, ya'ni bog'lanish yo'nalishi teskari bo'ladi.",
    "",
    "### DI, IoC va DIP farqi",
    "- **DIP** — tamoyil (nimaga bog'lanish).",
    "- **DI** — texnika (bog'liqlikni tashqaridan berish).",
    "- **IoC container** — DI'ni avtomatlashtiruvchi vosita.",
    "",
    "### Qanday qo'llash",
    "1. Yuqori daraja talab qiladigan **interface** o'zi bilan yashaydi (domen qatlamida): `OrderRepository`.",
    "2. Konkret implementatsiya (`EloquentOrderRepository`) infratuzilma qatlamida.",
    "3. Bog'lash composition root'da (service provider).",
    "",
    "### Foydasi",
    "Test (fake), almashtirish (MySQL → Redis), qatlamlar tozaligi (Clean/Hexagonal Architecture asosi).",
    "",
    "### Laravel",
    "`$this->app->bind(OrderRepository::class, EloquentOrderRepository::class)`; controller konstruktorida interface so'raladi."
  ],
  "examples": [
    {
      "title": "DIP bilan",
      "lang": "php",
      "code": [
        "// domen qatlami",
        "interface OrderRepository { public function save(Order $o): void; public function find(int $id): ?Order; }",
        "",
        "final class PlaceOrder { public function __construct(private OrderRepository $orders) {} /* mantiq faqat interface bilan */ }",
        "",
        "// infratuzilma",
        "final class EloquentOrderRepository implements OrderRepository { /* Eloquent */ }",
        "",
        "// AppServiceProvider",
        "$this->app->bind(OrderRepository::class, EloquentOrderRepository::class);"
      ]
    }
  ],
  "pitfalls": [
    "Biznes klass ichida `new EloquentOrderRepository()` — DIP buzilishi.",
    "Interface'ni infratuzilma qatlamiga qo'yish yo'nalishni teskari qilmaydi: u domen tomonida bo'lsin.",
    "Har klassga interface yaratish ortiqcha; ehtiyoj (test, almashtirish) bo'lsa.",
    "Service locator (`app()`) DI emas: bog'liqlik yashirin qoladi."
  ]
});
