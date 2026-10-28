/* Chuqur dars: 13.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("13.5", {
  "lesson": [
    "### Cast nima",
    "DB'dan kelgan qiymatlar PDO orqali asosan string yoki int bo'ladi. **Cast** atributni o'qishda PHP tipiga, yozishda esa DB formatiga avtomatik o'giradi. `$casts` xususiyati yoki Laravel 11+ da `casts()` metodi bilan e'lon qilinadi.",
    "",
    "### Ichki cast turlari",
    "- Skalyar: `integer`, `float`, `boolean`, `string`, `decimal:2` (string qaytaradi, aniqlik saqlanadi).",
    "- Vaqt: `datetime`, `immutable_datetime`, `date`, `datetime:Y-m-d` (serializatsiya formati bilan), `timestamp`.",
    "- JSON: `array`, `object`, `collection`, `AsArrayObject::class`, `AsCollection::class`. Oxirgi ikkisi ichki elementni o'zgartirishni kuzatadi (`$model->options['a'] = 1` ishlaydi).",
    "- `encrypted`, `encrypted:array`: `APP_KEY` bilan shifrlangan saqlash (token, shaxsiy ma'lumot).",
    "- `hashed` (Laravel 10+): yozishda avtomatik hash. `'password' => 'hashed'`.",
    "- **Enum** (PHP 8.1+): `'status' => OrderStatus::class` — backed enum'ga o'giradi.",
    "- `AsStringable::class`, `AsEnumCollection::of(Role::class)`.",
    "",
    "### Enum cast",
    "Eng foydali cast'lardan biri. `$order->status` string emas, `OrderStatus::Paid` enum. Tip xavfsizligi, IDE avtoto'ldirish va enum ichidagi metodlar (`label()`, `color()`) bilan ishlash mumkin. Noto'g'ri qiymat DB'da bo'lsa, `ValueError` chiqadi.",
    "",
    "### Custom cast",
    "`php artisan make:cast Money`. `CastsAttributes` interfeysini amalga oshiradi: `get()` (DB → PHP) va `set()` (PHP → DB). Value object'lar uchun ideal: `Money`, `Address`, `Coordinates`. Bitta value object bir nechta ustunga yozilishi mumkin: `set()` massiv qaytaradi.",
    "",
    "`Castable` interfeysi value object klassining o'zini cast sifatida ishlatishga imkon beradi: `'price' => Money::class`.",
    "",
    "### Muhim nuance'lar",
    "- `datetime` cast `Carbon` qaytaradi. `immutable_datetime` `CarbonImmutable` qaytaradi va tasodifiy o'zgarishdan himoya qiladi (`$order->due_at->addDay()` asl qiymatni buzmaydi).",
    "- `array` cast'da ichki elementni to'g'ridan-to'g'ri o'zgartirib bo'lmaydi: `$model->meta['x'] = 1` → `Indirect modification` xatosi. Butun massivni qayta belgilang yoki `AsArrayObject` ishlating.",
    "- Cast'lar `toArray()`/`toJson()` serializatsiyasiga ham ta'sir qiladi.",
    "- Query builder (`DB::table()`) cast'larni qo'llamaydi, faqat Eloquent."
  ],
  "examples": [
    {
      "title": "Enum, JSON, shifrlash",
      "lang": "php",
      "code": [
        "enum OrderStatus: string",
        "{",
        "    case Pending = 'pending';",
        "    case Paid = 'paid';",
        "",
        "    public function label(): string",
        "    {",
        "        return match ($this) { self::Pending => 'Kutilmoqda', self::Paid => 'To\\'langan' };",
        "    }",
        "}",
        "",
        "class Order extends Model",
        "{",
        "    protected function casts(): array",
        "    {",
        "        return [",
        "            'status' => OrderStatus::class,",
        "            'meta' => AsArrayObject::class,",
        "            'paid_at' => 'immutable_datetime',",
        "            'card_token' => 'encrypted',",
        "            'total' => 'decimal:2',",
        "        ];",
        "    }",
        "}",
        "",
        "$order->status === OrderStatus::Paid;",
        "$order->meta['source'] = 'mobile';  // AsArrayObject bilan ishlaydi",
        "$order->save();"
      ]
    },
    {
      "title": "Value object uchun custom cast",
      "lang": "php",
      "code": [
        "final class MoneyCast implements CastsAttributes",
        "{",
        "    public function get(Model $model, string $key, mixed $value, array $attributes): Money",
        "    {",
        "        return new Money((int) $attributes['amount'], $attributes['currency']);",
        "    }",
        "",
        "    public function set(Model $model, string $key, mixed $value, array $attributes): array",
        "    {",
        "        return ['amount' => $value->amount, 'currency' => $value->currency];",
        "    }",
        "}",
        "",
        "// Model: 'price' => MoneyCast::class",
        "$product->price = new Money(150000, 'UZS');"
      ],
      "note": "Bu cast ikki ustunga (`amount`, `currency`) yozadi. Modelda `price` ustuni bo'lishi shart emas."
    }
  ],
  "pitfalls": [
    "`array` cast'da ichki elementni to'g'ridan-to'g'ri o'zgartirish: `Indirect modification of overloaded property` xatosi.",
    "`decimal:2` natijasini float'ga o'girib hisoblash: aniqlik yo'qoladi.",
    "Mutable `datetime` ni o'zgartirib, asl qiymat ham o'zgarganini sezmaslik (`$model->starts_at->addDays(3)`). `immutable_datetime` ishlating.",
    "`encrypted` ustun bo'yicha `where()` qilishga urinish: har shifrlash natijasi har xil, qidiruv ishlamaydi."
  ]
});
