/* Chuqur dars: 6.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("6.1", {
  "lesson": [
    "### Nom — eng muhim hujjat",
    "Yaxshi nom kodni izohsiz tushunarli qiladi. Nom **nima ekanini** va **nima uchun** borligini aytsin.",
    "",
    "### Qoidalar",
    "1. **Niyatni oshkor qiling:** `$d` emas `$elapsedDays`; `getData()` emas `fetchActiveUsers()`.",
    "2. **Chalkashtirmang:** `$accountList` aslida massiv bo'lsa `$accounts`; `$userInfo` va `$userData` farqi noaniq.",
    "3. **Talaffuz qilinadigan va qidiriladigan:** `$genymdhms` emas `$generatedAt`; bir harfli nom faqat qisqa tsiklda (`$i`).",
    "4. **Klass — ot (noun):** `Invoice`, `PriceCalculator`. **Metod — fe'l (verb):** `calculateTotal()`, `isPaid()`, `hasAccess()`.",
    "5. **Bool:** `is/has/can/should` prefiksi (`$isActive`).",
    "6. **Bir tushuncha — bir so'z:** `fetch`/`get`/`retrieve` ni aralashtirmang.",
    "7. **Domen tili:** biznes atamalarini ishlating (`Invoice`, `Refund`), texnik detalni emas (`DataRow`).",
    "8. **Kontekst:** `$firstName` + `$lastName` → `Address` obyekti.",
    "",
    "### PHP uslubi",
    "PSR-1/12: klass `PascalCase`, metod/o'zgaruvchi `camelCase`, konstanta `UPPER_SNAKE`. Loyiha ichida bitta uslub.",
    "",
    "### Nomsiz sonlar",
    "`if ($status === 3)` o'rniga enum yoki konstanta: `Status::Paid`. \"Magic number\" — yomon nom.",
    "",
    "### Qisqartmalar",
    "Faqat keng tanilganlar (`id`, `url`, `html`). `cust`, `prc`, `tmp` o'qishni qiyinlashtiradi.",
    "",
    "### Nom o'zgartirish",
    "IDE bilan xavfsiz rename: yomon nomni tuzatishdan qo'rqmang."
  ],
  "examples": [
    {
      "title": "Yomon va yaxshi nom",
      "lang": "php",
      "code": [
        "// YOMON",
        "function proc($d, $t) { return $d * $t / 100; }",
        "if ($u->s == 3) {}",
        "",
        "// YAXSHI",
        "function discountAmount(int $price, int $percent): int { return intdiv($price * $percent, 100); }",
        "if ($user->status === UserStatus::Banned) {}"
      ]
    }
  ],
  "pitfalls": [
    "Qisqartirilgan nomlar (`cust`, `tmp`) o'qishni qiyinlashtiradi.",
    "Bir tushuncha uchun turli so'zlar (`fetch/get/retrieve`) chalkashtiradi.",
    "`$data`, `$info`, `$manager` kabi ma'nosiz umumiy nomlar.",
    "Tipni nomga kiritish (`$strName`, `$arrUsers`) — zamonaviy PHP'da tip e'lon qilinadi."
  ]
});
