/* Chuqur dars: 1.17. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.17", {
  "lesson": [
    "### Iterator va Iterable",
    "`foreach` ishlashi uchun obyekt `Traversable` (`Iterator` yoki `IteratorAggregate`) bo'lishi kerak. `iterable` tipi massiv va Traversable'ni qamraydi.",
    "",
    "### Generator",
    "`yield` ishlatadigan funksiya generator qaytaradi: qiymatlarni **kerak bo'lganda** hosil qiladi va holatini saqlab to'xtaydi. Natijada massiv xotirada yig'ilmaydi: 1M qator ham O(1) xotirada o'tadi.",
    "",
    "### Imkoniyatlar",
    "- `yield $k => $v` kalit bilan.",
    "- `$x = yield $v;` — `send()` orqali ichkariga qiymat jo'natish (ikki tomonlama).",
    "- `yield from` boshqa generator/massivga delegatsiya. Kalitlar to'qnashishiga e'tibor bering (`iterator_to_array(..., false)`).",
    "- `return` qiymati `getReturn()` bilan olinadi.",
    "- Generator **bir marta** yuradi: qayta aylanib bo'lmaydi (`Cannot traverse an already closed generator`).",
    "",
    "### Qachon ishlatiladi",
    "Katta fayl/CSV o'qish, DB cursor (`cursor()`, `lazy()`), pipeline (filter → map → batch), cheksiz ketma-ketlik. Laravel `LazyCollection` generatorga qurilgan.",
    "",
    "### Generator va Fibers",
    "Generator — stackless, faqat o'z funksiyasida to'xtaydi. Fiber (1.40) chuqur chaqiruvlar ichida ham to'xtaydi.",
    "",
    "### Custom Iterator",
    "`Iterator` (5 metod) yoki `IteratorAggregate::getIterator(): Generator` — eng qisqa yo'l.",
    "",
    "### Xotira va tezlik",
    "Generator xotirani tejaydi, lekin har `yield` kichik narx. Kichik massivda oddiy `array` tezroq.",
    "",
    "### Iterator protokoli",
    "`foreach` obyektni uchta usulda aylanadi:",
    "1. `Iterator`: `current()`, `key()`, `next()`, `rewind()`, `valid()` — to'liq nazorat.",
    "2. `IteratorAggregate::getIterator()` — Iterator yoki Generator qaytaradi (eng oson).",
    "3. Oddiy obyekt: ko'rinadigan (public) property'lar bo'yicha.",
    "Chaqirish tartibi: `rewind` → `valid` → `current` → `key` → (tana) → `next` → `valid`...",
    "",
    "### Generator xatti-harakati",
    "- `yield` ifoda: `$x = yield $v;`. Qiymat berilmasa `null`.",
    "- Generator obyekti `Iterator`ni implement qiladi: `current()`, `next()`, `send()`, `throw()`, `getReturn()`, `valid()`, `key()`.",
    "- Birinchi `current()` yoki `foreach` kodni birinchi `yield` gacha ishga tushiradi (lazy: obyekt yaratilganda kod bajarilmaydi).",
    "- `yield` kalit: auto-key 0,1,2...; `yield $k => $v`; `yield from` ichki generatorning kalitlarini saqlaydi.",
    "- `throw()` generator ichiga exception tashlaydi; `finally` generator buzilsa ham bajariladi.",
    "- Generator `return` bilan tugaydi; `yield` bo'lmagan funksiya generator emas, hatto `if (false) yield;` bo'lsa ham generator!",
    "",
    "### Samaradorlik",
    "- Xotira O(1) (bitta element), vaqt `yield` chaqiruvi bilan biroz ko'proq.",
    "- `iterator_to_array($gen)` hammasini xotiraga yuklaydi, maqsadga zid bo'lishi mumkin.",
    "- Katta massivni generator o'rniga massiv sifatida o'tkazish kichik ma'lumotda tezroq.",
    "- DB: Eloquent `cursor()` (bir qator xotirada, lekin barcha natijani drayver buferlashi mumkin, MySQL `buffered`), `lazy()` / `lazyById()` (chunk-lar bilan `LazyCollection`), `chunkById()`.",
    "",
    "### Iterator'lar bilan ishlash (SPL)",
    "`ArrayIterator`, `LimitIterator`, `CallbackFilterIterator`, `IteratorIterator`, `iterator_count`, `iterator_apply`, `MultipleIterator`, `RecursiveArrayIterator`. Generator bilan `limit/map/filter` yordamchilarini o'zingiz yozish oson (1.17 misollari).",
    "",
    "### Cheklovlar",
    "- Generator qayta aylanmaydi (`rewind()` birinchi `yield`dan keyin xato).",
    "- Serialize qilinmaydi, clone qilinmaydi.",
    "- Generator ichida `return` bilan qiymat qaytarish faqat `getReturn()`.",
    "- Iterator'lar `count()` ni qo'llamaydi (`Countable` implement qilish kerak).",
    "- `yield` ifodani qavs ichiga olish kerak: `$x = (yield $a) + 1;`",
    "",
    "### Laravel LazyCollection",
    "`LazyCollection::make(function () { yield ...; })`, `->filter()->map()->chunk(100)->each(...)` — barchasi lazy, bitta element xotirada. Katta CSV import, log tahlil uchun."
  ],
  "examples": [
    {
      "title": "Katta CSV",
      "lang": "php",
      "code": [
        "function rows(string $path): Generator",
        "{",
        "    $h = fopen($path, 'rb');",
        "    try {",
        "        while (($r = fgetcsv($h)) !== false) {",
        "            yield $r;",
        "        }",
        "    } finally {",
        "        fclose($h);",
        "    }",
        "}",
        "",
        "foreach (rows('big.csv') as $i => $row) { import($row); }"
      ]
    },
    {
      "title": "Pipeline: yield from",
      "lang": "php",
      "code": [
        "function map(iterable $it, callable $f): Generator { foreach ($it as $k => $v) yield $k => $f($v); }",
        "function chunk(iterable $it, int $n): Generator",
        "{",
        "    $buf = [];",
        "    foreach ($it as $v) {",
        "        $buf[] = $v;",
        "        if (count($buf) === $n) { yield $buf; $buf = []; }",
        "    }",
        "    if ($buf) yield $buf;",
        "}",
        "foreach (chunk(map(rows('big.csv'), 'trim_row'), 500) as $batch) { Model::insert($batch); }"
      ]
    },
    {
      "title": "send va return",
      "lang": "php",
      "code": [
        "function acc(): Generator",
        "{",
        "    $sum = 0;",
        "    while (($x = yield $sum) !== null) { $sum += $x; }",
        "    return $sum;",
        "}",
        "$g = acc(); $g->current();",
        "$g->send(5); $g->send(7); $g->send(null);",
        "echo $g->getReturn();   // 12"
      ]
    },
    {
      "title": "IteratorAggregate + generator",
      "lang": "php",
      "code": [
        "final class UserList implements IteratorAggregate, Countable",
        "{",
        "    public function __construct(private PDO $db) {}",
        "    public function getIterator(): Generator",
        "    {",
        "        $st = $this->db->query('SELECT id,name FROM users');",
        "        while ($r = $st->fetch(PDO::FETCH_ASSOC)) yield $r['id'] => $r;",
        "    }",
        "    public function count(): int { return (int) $this->db->query('SELECT COUNT(*) FROM users')->fetchColumn(); }",
        "}"
      ]
    },
    {
      "title": "Lazy pipeline",
      "lang": "php",
      "code": [
        "function take(iterable $it, int $n): Generator",
        "{",
        "    foreach ($it as $k => $v) { if ($n-- <= 0) return; yield $k => $v; }",
        "}",
        "function naturals(): Generator { for ($i = 1; ; $i++) yield $i; }   // cheksiz",
        "print_r(iterator_to_array(take(naturals(), 5), false));   // [1,2,3,4,5]"
      ]
    }
  ],
  "pitfalls": [
    "Generator bir martalik: ikkinchi `foreach` xato beradi. Qayta ishlatish uchun funksiyani qayta chaqiring.",
    "`yield from` va `iterator_to_array` bilan kalitlar ustma-ust tushib, elementlar yo'qoladi; `preserve_keys=false`.",
    "Generator ichidagi `finally` generator oxirigacha yurilmasa ham, u o'chirilganda (destruct) bajariladi: resurslarni shu yerda yoping.",
    "Generator ichidagi exception `foreach` joyida ko'tariladi, shuning uchun `try/catch` ni iste'mol qiluvchi tomonga ham qo'ying.",
    "Generator yaratilganda kod bajarilmaydi, birinchi so'rovda boshlanadi: side-effect kutilmagan vaqtda.",
    "`iterator_to_array(naturals())` cheksiz generatorda xotirani to'ldiradi.",
    "`yield from` kalitlari to'qnashadi: `iterator_to_array($g, false)` yoki kalit qayta yoziladi.",
    "`cursor()` ba'zi drayverlarda baribir hamma natijani xotiraga oladi: `lazy()`/`chunkById()` xavfsizroq."
  ]
});
