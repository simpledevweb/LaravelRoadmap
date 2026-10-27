/* Chuqur dars: 3.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("3.5", {
  "lesson": [
    "### Tamoyil",
    "\"Favor composition over inheritance\": kodni qayta ishlatish va xulq-atvorni kengaytirish uchun **meros** emas, **obyektlarni birlashtirish** (\"has-a\") ishlating. Obyekt kerakli imkoniyatlarni boshqa obyektlardan oladi (ularni maydonda saqlab, ularga ishni topshiradi).",
    "",
    "### Nega meros muammoli",
    "- Bola ota ichki tuzilmasiga qattiq bog'lanadi.",
    "- Faqat bitta ota klass bor: ikki xil xulq-atvorni meros qila olmaysiz.",
    "- Runtime'da xulq-atvorni almashtirib bo'lmaydi (meros kompilyatsiya vaqtida qotib qoladi).",
    "- Klass portlashi: `LoggedCachedUserRepository`, `CachedUserRepository`, `LoggedUserRepository`...",
    "",
    "### Kompozitsiya qanday yordam beradi",
    "Xulq-atvor alohida kichik obyektga chiqariladi va interface orqali ulanadi. Yangi kombinatsiya — yangi klass emas, **boshqacha yig'ish** (assembly). Runtime'da obyektni almashtirish mumkin (Strategy).",
    "",
    "### Namunalar",
    "- **Strategy:** algoritmni almashtirish (narx hisoblash, to'lov).",
    "- **Decorator:** bir xil interface'ni o'rab qo'shimcha qilish (kesh, log).",
    "- **Delegation:** vazifani ichki obyektga topshirish.",
    "- **Trait'lar:** kod qayta ishlatish vositasi, lekin yashirin bog'liqlik beradi; ehtiyotkorlik bilan.",
    "",
    "### Qachon meros mantiqli",
    "Haqiqiy \"is-a\", barqaror ierarxiya, framework talabi (Eloquent `Model`) va abstract klass bilan Template Method.",
    "",
    "### Qaror qoidasi",
    "Savol bering: \"Bola ota o'rniga **har doim** qo'yila oladimi (LSP)?\" Yo'q bo'lsa — kompozitsiya. Faqat kod qayta ishlatish uchun ota klass yaratish kerak bo'lsa — kompozitsiya.",
    "",
    "### Test",
    "Kompozitsiyada bog'liqliklarni konstruktor orqali berish (DI) fake/mock bilan test qilishni osonlashtiradi."
  ],
  "examples": [
    {
      "title": "Decorator: kesh va log",
      "lang": "php",
      "code": [
        "interface UserRepo { public function find(int $id): ?User; }",
        "",
        "final class DbUserRepo implements UserRepo { public function find(int $id): ?User { return User::find($id); } }",
        "",
        "final class CachedUserRepo implements UserRepo",
        "{",
        "    public function __construct(private UserRepo $inner, private CacheInterface $cache) {}",
        "    public function find(int $id): ?User { return $this->cache->remember(\"u:$id\", 300, fn () => $this->inner->find($id)); }",
        "}",
        "",
        "final class LoggedUserRepo implements UserRepo",
        "{",
        "    public function __construct(private UserRepo $inner, private LoggerInterface $log) {}",
        "    public function find(int $id): ?User { $this->log->info(\"find $id\"); return $this->inner->find($id); }",
        "}",
        "",
        "$repo = new LoggedUserRepo(new CachedUserRepo(new DbUserRepo(), $cache), $log);   // yig'ish"
      ]
    },
    {
      "title": "Strategy",
      "lang": "php",
      "code": [
        "interface DiscountPolicy { public function apply(int $price): int; }",
        "final class NoDiscount implements DiscountPolicy { public function apply(int $p): int { return $p; } }",
        "final class Percent implements DiscountPolicy { public function __construct(private int $pct) {} public function apply(int $p): int { return intdiv($p * (100 - $this->pct), 100); } }",
        "",
        "final class Cart { public function __construct(private DiscountPolicy $policy) {} public function total(int $sum): int { return $this->policy->apply($sum); } }"
      ]
    }
  ],
  "pitfalls": [
    "Faqat kodni qayta ishlatish uchun ota klass yaratish noto'g'ri \"is-a\" munosabatini hosil qiladi.",
    "Kombinatsiyalar uchun alohida klass yaratish (`CachedLoggedRepo`) klass portlashiga olib keladi: decorator zanjiri ishlating.",
    "Trait'larni meros o'rniga haddan tashqari ishlatish yashirin bog'liqlik hosil qiladi.",
    "Kompozitsiyada delegatsiya kodi ko'payishi mumkin: kerakli interface'ni kichik saqlang."
  ]
});
