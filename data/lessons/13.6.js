/* Chuqur dars: 13.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("13.6", {
  "lesson": [
    "### Accessor va mutator",
    "- **Accessor:** atribut o'qilganda qiymatni o'zgartiradi yoki hisoblaydi (`$user->full_name`).",
    "- **Mutator:** atribut belgilanganda qiymatni DB'ga yozishdan oldin o'zgartiradi (`$user->email = ' ALI@X.UZ '` → `ali@x.uz`).",
    "",
    "### Zamonaviy sintaksis (Laravel 9+)",
    "Bitta protected metod, camelCase nom, `Attribute` qaytaradi:",
    "`protected function fullName(): Attribute { return Attribute::make(get: fn () => ..., set: fn ($v) => ...); }`",
    "",
    "Eski sintaksis (`getFullNameAttribute`, `setEmailAttribute`) hali ishlaydi, lekin yangi kodda `Attribute::make` tavsiya etiladi.",
    "",
    "### Imkoniyatlar",
    "- `get: fn (mixed $value, array $attributes) => ...`: `$value` — xom qiymat, `$attributes` — barcha xom atributlar (hisoblangan accessor uchun).",
    "- `set: fn ($value) => ...` bitta ustun qiymatini qaytaradi yoki massiv qaytarib, bir nechta ustunni belgilaydi.",
    "- `->shouldCache()`: og'ir hisoblangan qiymatni obyekt ichida keshlaydi. Value object qaytaradigan accessor'lar default'da keshlanadi. `->withoutObjectCaching()` buni o'chiradi.",
    "",
    "### Serializatsiya",
    "Hisoblangan accessor (DB'da ustuni yo'q) `toArray()` yoki JSON'ga avtomatik qo'shilmaydi. `protected $appends = ['full_name'];` yoki `$user->append('full_name')`. Ehtiyot bo'ling: `$appends` dagi accessor munosabatni ishlatsa, har serializatsiyada lazy load va N+1 bo'ladi.",
    "",
    "### Cast, accessor yoki boshqa joy",
    "- Tip konvertatsiyasi (string → enum, JSON → array): **cast** (13.5).",
    "- Ko'p ustunli value object: custom cast.",
    "- Formatlash yoki hisoblash (`full_name`, `is_overdue`): **accessor**.",
    "- Normallashtirish (trim, lowercase, telefon formati): **mutator**.",
    "- Faqat UI uchun ko'rinish (`'15 000 so\\'m'`, lokalizatsiya): API Resource (13.16) yoki view. Modelni prezentatsiya mantig'i bilan to'ldirmang.",
    "",
    "### Ehtiyot choralari",
    "Accessor'lar mass update'da va `DB::table()` da ishlamaydi. Mutator ham `Model::where()->update()` da chaqirilmaydi. Shuning uchun normallashtirish faqat mutator'ga tayansa, ba'zi yo'llar uni chetlab o'tadi. Muhim invariantlar uchun DB constraint ham qo'ying."
  ],
  "examples": [
    {
      "title": "Accessor, mutator va hisoblangan atribut",
      "lang": "php",
      "code": [
        "use Illuminate\\Database\\Eloquent\\Casts\\Attribute;",
        "",
        "class User extends Model",
        "{",
        "    protected $appends = ['full_name'];",
        "",
        "    protected function fullName(): Attribute",
        "    {",
        "        return Attribute::make(",
        "            get: fn (mixed $value, array $attributes) => trim($attributes['first_name'] . ' ' . $attributes['last_name']),",
        "        );",
        "    }",
        "",
        "    protected function email(): Attribute",
        "    {",
        "        return Attribute::make(",
        "            set: fn (string $value) => mb_strtolower(trim($value)),",
        "        );",
        "    }",
        "",
        "    protected function phone(): Attribute",
        "    {",
        "        return Attribute::make(",
        "            set: fn (string $value) => preg_replace('/\\D+/', '', $value),",
        "        );",
        "    }",
        "}"
      ]
    },
    {
      "title": "Bir nechta ustunga yozuvchi mutator",
      "lang": "php",
      "code": [
        "protected function address(): Attribute",
        "{",
        "    return Attribute::make(",
        "        get: fn ($v, array $a) => new Address($a['address_line'], $a['city']),",
        "        set: fn (Address $value) => [",
        "            'address_line' => $value->line,",
        "            'city' => $value->city,",
        "        ],",
        "    );",
        "}",
        "",
        "$user->address = new Address('Amir Temur 1', 'Toshkent');",
        "$user->save();"
      ]
    }
  ],
  "pitfalls": [
    "`$appends` ga munosabatga tayanadigan accessor qo'shish: har ro'yxat serializatsiyasida N+1.",
    "Mutator mass update (`Model::where()->update()`) da ham ishlaydi deb kutish.",
    "Accessor ichida og'ir so'rov yoki tashqi API chaqiruvi: har murojaatda takrorlanadi.",
    "Accessor bilan DB qiymatini \"yashirib\" qo'yish: `where('email', ...)` xom qiymat bilan ishlaydi va natija kutilmagan bo'ladi."
  ]
});
