/* Chuqur dars: 1.20. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.20", {
  "lesson": [
    "### Magic metodlar",
    "Ikkita pastki chiziq bilan boshlanadigan maxsus hook'lar:",
    "- `__construct` / `__destruct`",
    "- `__get($n)`, `__set($n,$v)`, `__isset`, `__unset` — mavjud bo'lmagan property'ga murojaat.",
    "- `__call($n,$args)`, `__callStatic` — mavjud bo'lmagan metod.",
    "- `__toString()` — satrga o'girish (avtomatik `Stringable`).",
    "- `__invoke()` — obyektni funksiya sifatida chaqirish.",
    "- `__clone()` — `clone` dan keyin chaqiriladi.",
    "- `__serialize/__unserialize`, `__sleep/__wakeup` (8.5 da deprecated), `__set_state`, `__debugInfo`.",
    "",
    "### Laravel va magic",
    "Eloquent `__get` bilan atributlarni, `__call` bilan builder metodlarini, Facade `__callStatic` bilan servisni topadi. Bu qulay, lekin statik tahlil ko'rmaydi (PHPDoc `@property`/`@method` yoki Larastan kerak) va sekinroq.",
    "",
    "### Cloning",
    "`clone` **sayoz** nusxa oladi: ichki obyektlar umumiy qoladi. Chuqur nusxa uchun `__clone()` ichida ichki obyektlarni qayta clone qiling. `readonly` property'ni 8.3 dan boshlab `__clone` ichida qayta yozish mumkin; 8.5 da esa `clone($o, [...])` bor.",
    "",
    "### Serialization",
    "`serialize()` obyektni satrga aylantiradi; `unserialize()` esa **xavfli**: ishonchsiz ma'lumotda ixtiyoriy klass obyektlarini hosil qiladi (object injection). `allowed_classes` bering yoki JSON ishlating. Zamonaviy usul: `__serialize()` / `__unserialize()` (qaytarilgan massiv), `JsonSerializable` JSON uchun.",
    "",
    "### Qoida",
    "Magic metodlar kam va ongli. Aniq metod va property har doim yaxshiroq: IDE, statik tahlil, tezlik.",
    "",
    "### To'liq magic metodlar ro'yxati",
    "| Metod | Qachon chaqiriladi |",
    "|---|---|",
    "| `__construct`, `__destruct` | yaratish / yo'q qilish |",
    "| `__get($n)`, `__set($n,$v)`, `__isset($n)`, `__unset($n)` | mavjud bo'lmagan/ko'rinmas property |",
    "| `__call($n,$a)`, `__callStatic($n,$a)` | mavjud bo'lmagan/ko'rinmas metod |",
    "| `__toString()` | satrga o'girish |",
    "| `__invoke(...)` | obyekt funksiya sifatida |",
    "| `__clone()` | `clone` dan keyin (nusxada) |",
    "| `__serialize()`, `__unserialize()` | `serialize`/`unserialize` (afzal) |",
    "| `__sleep()`, `__wakeup()` | eski serialize (8.5 da deprecated) |",
    "| `__set_state()` | `var_export` natijasini `eval` qilganda |",
    "| `__debugInfo()` | `var_dump` ko'rsatadigan ma'lumot |",
    "",
    "### __get / __set tafsiloti",
    "- Faqat **mavjud bo'lmagan yoki kirishga ruxsat yo'q** property uchun chaqiriladi. Mavjud public property bo'lsa chaqirilmaydi.",
    "- Rekursiya himoyasi: `__get` ichida shu property'ga murojaat qilsa PHP uni oddiy property deb biladi.",
    "- `isset($o->x)` va `empty()` uchun `__isset` kerak, aks holda `false`.",
    "- `$o->arr[] = 1` — `__get` qiymat qaytaradi (nusxa), \"Indirect modification of overloaded property\" Notice; `&__get` yoki obyekt qaytarish.",
    "- Eloquent: `getAttribute()`, mutator/accessor (`Attribute::make`), `$casts`, `__get` → `getAttribute`.",
    "",
    "### __call va __callStatic",
    "Proxy, fluent builder, Facade, mock'lar uchun. Eloquent `where*` metodlari, `Model::__callStatic` → `newQuery()` → builder. Sekin, IDE ko'rmaydi: `@method`/`@property` PHPDoc yoki Larastan, `laravel-ide-helper`.",
    "",
    "### __toString va Stringable",
    "`class X implements Stringable` yozilmasa ham `__toString` bor klass avtomatik `Stringable`. `(string)$obj`, `echo`, `.` ishlaydi; xato bo'lsa exception tashlash mumkin (7.4+).",
    "",
    "### __invoke",
    "Obyektni `callable` qiladi: `array_map(new Handler, $xs)`; Laravel single-action controller (`__invoke`), job handler, middleware.",
    "",
    "### __clone va chuqur nusxa",
    "`clone` sayoz: skalyar nusxa, obyektlar (handle) umumiy. `__clone` yangi obyekt allaqachon yaratilganda chaqiriladi, shu yerda ichki obyektlarni `clone` qiling. Readonly property'ni 8.3 dan `__clone` ichida qayta yozish mumkin. Massivdagi obyektlar ham alohida klonlanadi.",
    "",
    "### __serialize / __unserialize",
    "`__serialize(): array` kalitlari saqlanadi; `__unserialize(array $data)` qayta quradi. `Serializable` interface eski. Xavfsizlik: `unserialize(..., ['allowed_classes' => ...])` (1.39). `__wakeup` ichida invariantlarni tekshiring.",
    "",
    "### var_export / __set_state / __debugInfo",
    "`var_export($obj)` natijasi `\\Foo::__set_state([...])` ko'rinishida bo'ladi (qayta tiklash uchun klassda `__set_state` kerak); `__debugInfo` `var_dump` ko'rsatadigan ma'lumotni cheklaydi (parolni yashirish).",
    "",
    "### Qoida",
    "Magic metod — API emas, mexanizm. Public API aniq metodlar bilan; magic ichki infratuzilmada."
  ],
  "examples": [
    {
      "title": "__get / __call",
      "lang": "php",
      "code": [
        "final class Config",
        "{",
        "    public function __construct(private array $data) {}",
        "",
        "    public function __get(string $k): mixed",
        "    {",
        "        return $this->data[$k] ?? throw new OutOfBoundsException($k);",
        "    }",
        "",
        "    public function __call(string $m, array $a): mixed",
        "    {",
        "        return str_starts_with($m, 'get') ? $this->data[lcfirst(substr($m, 3))] ?? null : null;",
        "    }",
        "}",
        "$c = new Config(['host' => 'db']);",
        "echo $c->host, $c->getHost();"
      ]
    },
    {
      "title": "Chuqur clone",
      "lang": "php",
      "code": [
        "final class Order",
        "{",
        "    public function __construct(public Address $addr, public array $lines = []) {}",
        "",
        "    public function __clone()",
        "    {",
        "        $this->addr = clone $this->addr;   // aks holda umumiy qoladi",
        "    }",
        "}"
      ]
    },
    {
      "title": "Xavfsiz serialize",
      "lang": "php",
      "code": [
        "final class Token",
        "{",
        "    public function __construct(private string $value) {}",
        "    public function __serialize(): array { return ['v' => $this->value]; }",
        "    public function __unserialize(array $d): void { $this->value = $d['v']; }",
        "}",
        "$obj = unserialize($raw, ['allowed_classes' => [Token::class]]);"
      ]
    },
    {
      "title": "__invoke handler",
      "lang": "php",
      "code": [
        "final class SendWelcome",
        "{",
        "    public function __construct(private Mailer $m) {}",
        "    public function __invoke(User $u): void { $this->m->send($u->email, 'Salom'); }",
        "}",
        "array_map(new SendWelcome($mailer), $users);   // callable sifatida"
      ]
    },
    {
      "title": "__debugInfo",
      "lang": "php",
      "code": [
        "final class Creds",
        "{",
        "    public function __construct(private string $user, private string $password) {}",
        "    public function __debugInfo(): array { return ['user' => $this->user, 'password' => '***']; }",
        "}",
        "var_dump(new Creds('ali', 's3cr3t'));"
      ]
    }
  ],
  "pitfalls": [
    "`clone` sayoz: ichki obyekt va massivdagi obyektlar umumiy qoladi, bir nusxada o'zgartirish ikkinchisiga ta'sir qiladi.",
    "`unserialize()` ishonchsiz kiritmada RCE gadjetlariga yo'l ochadi (PHP object injection); JSON ishlating.",
    "`__get` ichida property mavjud emasligini jim `null` bilan yashirmang: xatolar topilmay qoladi.",
    "`__destruct` da exception tashlash yoki asosiy mantiq yozish ishonchsiz (chaqirilish vaqti aniq emas).",
    "`__get` qaytargan massivni o'zgartirish ishlamaydi (nusxa): `$o->arr[] = 1` Notice.",
    "`__isset` yozilmasa `isset($o->x)` magic property uchun `false`.",
    "`clone` chuqur emas: ichki obyektlar umumiy qoladi.",
    "`__destruct` ichida exception yoki og'ir mantiq: chaqirilish vaqti kafolatlanmaydi."
  ]
});
