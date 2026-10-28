/* Chuqur dars: 25.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("25.9", {
  "lesson": [
    "### Data-driven testing g'oyasi",
    "Data-driven test — test mantiqi bir marta yoziladi, holatlar esa **ma'lumot sifatida** (jadval, fayl) beriladi. PHPUnit'da asosiy vosita — data provider'lar (25.4). Bu dars ularni qachon va qanday samarali ishlatish haqida.",
    "",
    "### Holatlarni tanlash texnikalari",
    "Barcha mumkin bo'lgan kirishlarni test qilib bo'lmaydi. Kam holat bilan ko'p xatoni topish usullari:",
    "",
    "**1. Ekvivalent sinflar (equivalence partitioning).** Kirishlarni bir xil xulq-atvorga ega guruhlarga bo'ling va har guruhdan bitta vakil oling. Masalan, yosh bo'yicha chegirma: `< 0` (noto'g'ri), `0–17` (bolalar), `18–64` (kattalar), `65+` (pensionerlar), juda katta (noto'g'ri). 5 ta guruh — 5 ta holat.",
    "",
    "**2. Chegara qiymatlar (boundary value analysis).** Xatolar ko'pincha chegaralarda: `<` va `<=` adashtirish. Har chegaraning ikki tomoni: `17, 18`, `64, 65`, `0, -1`. Off-by-one xatolarini ushlaydi.",
    "",
    "**3. Qaror jadvallari (decision tables).** Bir nechta shart kombinatsiyasi natijani belgilasa: \"VIP mijoz × summa > 1 mln × promo-kod\" → chegirma foizi. Har kombinatsiya — jadval qatori.",
    "",
    "**4. Haqiqiy namunalar.** Production'dan olingan (anonimlashtirilgan) qiyin holatlar: noodatiy telefon formatlari, uzun nomlar, emoji, kirill va lotin aralash matn, `ʻ` va `'` belgilari (o'zbek tilida `oʻ` va `o'`).",
    "",
    "**5. Xato ma'lumotlari.** `null`, bo'sh satr, faqat bo'shliq, juda uzun satr, noto'g'ri tur, SQL va HTML maxsus belgilari.",
    "",
    "### Tashqi ma'lumot manbalari",
    "Ko'p holatlar yoki biznes egalari bergan jadvallar uchun (soliq stavkalari, tariflar):",
    "- `tests/Fixtures/tariffs.csv` dan o'qiydigan provider. Biznes analitik jadvalni yangilaydi, test avtomatik qamraydi.",
    "- JSON yoki YAML fayllar.",
    "",
    "Ehtiyot: provider'da framework yo'q (25.4), shuning uchun faylni oddiy PHP funksiyalari bilan o'qing.",
    "",
    "### Property-based testing",
    "Keyingi qadam: aniq holatlar o'rniga **xususiyatlar** (property) va avtomatik generatsiya qilingan yuzlab tasodifiy kirishlar. Masalan, \"`decode(encode($x)) === $x` har qanday `$x` uchun\" yoki \"saralangan massiv uzunligi asl massivnikiga teng\". PHP'da `giorgiosironi/eris`. Murakkab algoritmlar va parserlar uchun kuchli vosita."
  ],
  "examples": [
    {
      "title": "Chegara qiymatlari va ekvivalent sinflar",
      "lang": "php",
      "code": [
        "public static function ages(): iterable",
        "{",
        "    yield 'negative' => [-1, null];",
        "    yield 'newborn' => [0, 50];",
        "    yield 'child upper bound' => [17, 50];",
        "    yield 'adult lower bound' => [18, 0];",
        "    yield 'adult upper bound' => [64, 0];",
        "    yield 'senior lower bound' => [65, 30];",
        "    yield 'very old' => [120, 30];",
        "    yield 'unrealistic' => [200, null];",
        "}",
        "",
        "#[Test]",
        "#[DataProvider('ages')]",
        "public function ticket_discount_by_age(int $age, ?int $expectedPercent): void",
        "{",
        "    $this->assertSame($expectedPercent, TicketPricing::discountFor($age));",
        "}"
      ]
    },
    {
      "title": "CSV'dan provider",
      "lang": "php",
      "code": [
        "// tests/Fixtures/delivery_tariffs.csv",
        "// region,weight_kg,express,expected_price",
        "// tashkent,1,0,15000",
        "// tashkent,1,1,25000",
        "// samarkand,5,0,40000",
        "",
        "public static function tariffs(): iterable",
        "{",
        "    $file = fopen(__DIR__ . '/../Fixtures/delivery_tariffs.csv', 'r');",
        "    $header = fgetcsv($file);",
        "",
        "    while (($row = fgetcsv($file)) !== false) {",
        "        $r = array_combine($header, $row);",
        "        yield \"{$r['region']} {$r['weight_kg']}kg express={$r['express']}\" => [",
        "            $r['region'], (float) $r['weight_kg'], (bool) $r['express'], (int) $r['expected_price'],",
        "        ];",
        "    }",
        "",
        "    fclose($file);",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Tasodifiy holatlar tanlash, chegara qiymatlarini o'tkazib yuborish.",
    "Faqat \"yaxshi\" ma'lumotlar bilan test: `null`, bo'sh va maxsus belgilar yo'q.",
    "Yuzlab deyarli bir xil holatlar: test sekin, foydasi kam.",
    "Tashqi fayldan provider'da Laravel helper'larini (`base_path()`) ishlatish: framework hali yuklanmagan."
  ]
});
