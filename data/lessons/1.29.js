/* Chuqur dars: 1.29. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.29", {
  "lesson": [
    "### Float nega aniq emas",
    "`float` IEEE 754 double (64 bit) bo'lib, ko'p o'nlik kasrlar ikkilikda aniq ifodalanmaydi. `0.1 + 0.2 === 0.3` → `false`; natija `0.30000000000000004`. Solishtirish `abs($a - $b) < epsilon` bilan, lekin pul uchun bu ham yetarli emas.",
    "",
    "### Pul uchun nima ishlatish",
    "1. Eng kichik birlikda `int` (tiyin, sent): `1999` = 19.99. Qo'shish/ayirish aniq. Ko'paytirish va foiz hisoblashda yaxlitlash qoidasi aniq belgilanadi.",
    "2. BCMath / `BcMath\\Number` (8.4): satr ko'rinishidagi cheksiz aniqlik: `bcadd('0.10','0.20',2)`.",
    "3. **Kutubxona**: `brick/money`, `moneyphp/money`. DB'da `DECIMAL(19,4)`; `FLOAT/DOUBLE` emas.",
    "",
    "### Integer",
    "64-bitda `PHP_INT_MAX` = 9 223 372 036 854 775 807. Oshganda jimgina `float`ga o'tadi va aniqlik yo'qoladi; ID'lar uchun xavfli, JSON'da JavaScript 2^53 dan katta sonni buzadi (ID'ni satr qilib bering). `intdiv()` butun bo'lish; `%` ishorali sonlarda dividend ishorasini saqlaydi; `/` natijasi `int` yoki `float` bo'lishi mumkin, nolga bo'lish `DivisionByZeroError`.",
    "",
    "### Yaxlitlash",
    "`round($x, 2)` odatda \"yarim yuqoriga\" (half away from zero). 8.4 dan `RoundingMode` enum: `round($x, 2, RoundingMode::HalfEven)` (bank yaxlitlashi). `floor/ceil`, `number_format` faqat ko'rsatish uchun, hisob uchun emas.",
    "",
    "### Maxsus qiymatlar",
    "`NAN`, `INF`; `is_nan()`, `is_infinite()`. `NAN != NAN`. `(int) \"12abc\"` → 12; sonli satr tekshiruvi uchun `is_numeric`, `filter_var(FILTER_VALIDATE_INT)`.",
    "",
    "### Random",
    "`random_int()` kriptografik xavfsiz, `mt_rand` emas (1.39).",
    "",
    "### Float tuzilishi",
    "IEEE 754 double: 1 bit ishora, 11 bit daraja, 52 bit mantissa. ~15–17 o'nlik raqam aniqlik. Butun sonlar 2^53 gacha aniq ifodalanadi. `0.1` ikkilikda cheksiz kasr (0.000110011...).",
    "",
    "**Ko'rsatish**",
    "`echo 0.1 + 0.2` → `0.3` (`precision=14`), `var_dump` → `0.30000000000000004` (`serialize_precision=-1`: eng qisqa aniq ko'rinish). JSON ham `serialize_precision` bilan. `printf('%.20f', 0.1)` haqiqiy qiymatni ko'rsatadi.",
    "",
    "**Taqqoslash**",
    "`abs($a - $b) < $eps`; nisbiy xato uchun `abs($a-$b) <= $eps * max(abs($a), abs($b))`. `==` float uchun xavfli. `floor`/`round` natijasi ham float. `fdiv(1, 0)` → INF (exception yo'q), `1 / 0` → `DivisionByZeroError`, `0.0 / 0.0` → NAN.",
    "",
    "### Integer tafsiloti",
    "- `PHP_INT_SIZE` (8), `PHP_INT_MAX`, `PHP_INT_MIN`; overflow: `+`, `*` float ga o'tadi; `intdiv(PHP_INT_MIN, -1)` → `ArithmeticError`.",
    "- `%` operandlarni int ga keltiradi (`5.9 % 2` = 1), qoldiq dividend ishorasida; `fmod` float uchun.",
    "- Bit operatorlar: `& | ^ ~ << >>`; siljish manfiy son `ArithmeticError`.",
    "- `**` darajaga ko'tarish: int**int → int (sig'sa), manfiy daraja float.",
    "- `random_int($min, $max)` xavfsiz; `mt_rand` Mersenne Twister, `mt_srand($seed)` bilan takrorlanuvchi (test uchun), 8.2 dan `Random\\Randomizer`.",
    "",
    "### Yaxlitlash",
    "`round($x, $precision, $mode)`: `PHP_ROUND_HALF_UP` (default), `HALF_DOWN`, `HALF_EVEN`, `HALF_ODD` yoki 8.4 `RoundingMode` enum'i (`HalfAwayFromZero`, `HalfTowardsZero`, `HalfEven`, `HalfOdd`, `TowardsZero`, `AwayFromZero`, `NegativeInfinity`, `PositiveInfinity`). `floor`, `ceil`, `intval`. Manfiy precision: `round(1234, -2)` → 1200. Pre-rounding muammosi (PHP < 8.4 da `round(0.285, 2)`) 8.4 da tuzatildi.",
    "",
    "### BCMath va GMP",
    "- **BCMath:** `bcadd/bcsub/bcmul/bcdiv/bcmod/bcpow/bcsqrt/bccomp/bcscale`; qiymatlar satr; `scale` har amalda aniq bering (global `bcscale` boshqa kod bilan to'qnashadi). 8.4 `BcMath\\Number` obyekti (operatorlarni qo'llaydi: `$a + $b`, immutable).",
    "- **GMP:** juda katta butun sonlar (kriptografiya, faktorial), `gmp_add`, `GMP` obyekti operator overload bilan.",
    "- **brick/math, brick/money, moneyphp/money:** domen darajasidagi pul va valyuta (kurs, yaxlitlash, taqsimlash).",
    "",
    "### Pul bilan ishlashning qoidalari",
    "1. Minor birlikda (tiyin) int yoki DECIMAL.",
    "2. Valyutani qiymat bilan saqlang (`Money(amount, currency)`).",
    "3. Ko'paytirish/foiz: yaxlitlash qoidasi biznes bilan kelishilgan (bank yaxlitlashi, soliq).",
    "4. Taqsimlash (allocate): 100 ni 3 ga bo'lganda 33/33/34 — qoldiq yo'qolmasin.",
    "5. Narx hisoblashda float qatnashmasin; JSON'da son emas satr (\"19.99\") yuborish ham ishlatiladi.",
    "6. DB: `DECIMAL(19,4)`; Laravel `decimal:2` cast satr qaytaradi.",
    "",
    "### Sonlarni ko'rsatish",
    "`number_format`, `NumberFormatter` (intl, lokalga mos: `uz_UZ` valyuta formati), `money_format` o'chirilgan. Ichki hisobda formatlangan satrdan foydalanmang."
  ],
  "examples": [
    {
      "title": "Float tuzog'i",
      "lang": "php",
      "code": [
        "var_dump(0.1 + 0.2 === 0.3);                       // false",
        "var_dump(abs((0.1 + 0.2) - 0.3) < PHP_FLOAT_EPSILON); // true",
        "var_dump(round(2.5), round(3.5), round(-2.5));     // 3, 4, -3",
        "var_dump(PHP_INT_MAX + 1);                         // float"
      ]
    },
    {
      "title": "Tiyin va foiz",
      "lang": "php",
      "code": [
        "final readonly class Money",
        "{",
        "    public function __construct(public int $tiyin) {}",
        "",
        "    public function percent(int $p): self",
        "    {",
        "        return new self(intdiv($this->tiyin * $p + 50, 100)); // yarim yuqoriga",
        "    }",
        "    public function add(self $o): self { return new self($this->tiyin + $o->tiyin); }",
        "}",
        "$vat = (new Money(199_900))->percent(12);"
      ]
    },
    {
      "title": "BCMath",
      "lang": "php",
      "code": [
        "echo bcadd('0.10', '0.20', 2);       // 0.30",
        "echo bcmul('19.99', '3', 2);         // 59.97",
        "echo bcdiv('10', '3', 4);            // 3.3333"
      ]
    },
    {
      "title": "Taqsimlash (allocate)",
      "lang": "php",
      "code": [
        "function allocate(int $tiyin, int $parts): array",
        "{",
        "    $base = intdiv($tiyin, $parts); $rem = $tiyin % $parts;",
        "    return array_map(fn($i) => $base + ($i < $rem ? 1 : 0), range(0, $parts - 1));",
        "}",
        "print_r(allocate(10000, 3));   // [3334, 3333, 3333]: yig'indi 10000"
      ]
    },
    {
      "title": "Yaxlitlash rejimlari",
      "lang": "php",
      "code": [
        "var_dump(round(2.5), round(-2.5), round(3.5));       // 3, -3, 4",
        "var_dump(round(2.5, 0, PHP_ROUND_HALF_EVEN));        // 2",
        "var_dump(round(1234.5678, -2), round(1.955, 2));     // 1200, 1.96"
      ]
    },
    {
      "title": "Float ko'rinishi",
      "lang": "php",
      "code": [
        "var_dump(0.1 + 0.2);                 // float(0.30000000000000004)",
        "echo 0.1 + 0.2;                      // 0.3",
        "printf('%.20f', 0.1);                // 0.10000000000000000555",
        "var_dump(fdiv(1, 0), intdiv(7, 2), 7 % -3);   // INF, 3, 1"
      ]
    }
  ],
  "pitfalls": [
    "Pul uchun `float` ishlatish yig'indida tiyinlarni yo'qotadi; `int` tiyin yoki `DECIMAL` + BCMath.",
    "`round()` yarim qiymatlarda kutilganidan farq qilishi mumkin; yaxlitlash qoidasini (half up/even) biznes talabi bilan kelishing.",
    "ID uchun `int` JSON'da JS'da 2^53 dan katta bo'lsa buziladi; satr qiling.",
    "`number_format` natijani satr qiladi: hisob-kitobdan keyin faqat ko'rsatish uchun.",
    "`bcdiv`/`bcmul` scale'ni kesadi (yaxlitlamaydi): oxirgi raqam xato bo'lishi mumkin.",
    "`intdiv(PHP_INT_MIN, -1)` `ArithmeticError`.",
    "Valyutasiz summa (`1000`) ma'nosiz: tiyin/so'm/dollar aniq bo'lsin.",
    "JSON'da kasr son JS'da aniqlikni yo'qotadi: pulni satr yoki tiyin int sifatida yuboring."
  ]
});
