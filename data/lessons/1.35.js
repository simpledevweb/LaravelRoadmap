/* Chuqur dars: 1.35. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.35", {
  "lesson": [
    "### SPL nima",
    "Standard PHP Library: tilga o'rnatilgan (har doim mavjud) ma'lumot tuzilmalari, iteratorlar va interfeyslar.",
    "",
    "### Interfeyslar",
    "- `Countable` → `count($obj)`",
    "- `ArrayAccess` → `$obj['k']`, `isset`, `unset`",
    "- `IteratorAggregate` / `Iterator` → `foreach`",
    "- `Stringable` → `__toString` (avtomatik)",
    "- `JsonSerializable` → `json_encode`",
    "- `Serializable` o'rniga `__serialize`.",
    "Laravel `Collection` va `Request` ular asosida qurilgan: massivdek ishlaydi.",
    "",
    "### Ma'lumot tuzilmalari",
    "- `SplStack`, `SplQueue`, `SplDoublyLinkedList`: LIFO/FIFO.",
    "- `SplPriorityQueue` va `SplMinHeap/SplMaxHeap`: ustuvorlik bo'yicha chiqarish (`insert`, `extract`).",
    "- `SplFixedArray`: o'lchami qat'iy, indeks butun son; oddiy massivdan xotirada ixchamroq va tezroq (katta sonli ma'lumot).",
    "- `SplObjectStorage`: obyekt → ma'lumot (strong reference). `WeakMap` (8.0): kalit obyekt o'chganda yozuv ham o'chadi.",
    "- `ArrayObject`, `ArrayIterator`.",
    "",
    "### Iteratorlar",
    "`LimitIterator`, `CachingIterator`, `FilterIterator`, `RecursiveDirectoryIterator`/`RecursiveIteratorIterator` (papka daraxti), `AppendIterator`, `InfiniteIterator`, `iterator_to_array`, `iterator_count`, `iterator_apply`.",
    "",
    "### Fayl",
    "`SplFileObject` (qator-qator o'qish, CSV), `SplFileInfo`, `SplTempFileObject`. `DirectoryIterator`.",
    "",
    "### Qachon ishlatish",
    "Massiv ham stack/queue sifatida ishlaydi (`array_push/pop`, `array_shift` O(n) bo'lishi mumkin). Ustuvorlik navbati (Dijkstra, vazifalar rejalash) va xotira muhim holatlar uchun SPL. Oddiy ishda massiv yetarli.",
    "",
    "### Exception'lar",
    "SPL istisnolari (`InvalidArgumentException`, `RuntimeException`, `LogicException`, `OutOfBoundsException`...) ierarxiyasi 1.15 da.",
    "",
    "### Interfeyslar tafsiloti",
    "- `Iterator`: `current/key/next/rewind/valid`. `IteratorAggregate`: `getIterator(): Traversable`. `Traversable` faqat marker: to'g'ridan-to'g'ri implement qilib bo'lmaydi.",
    "- `ArrayAccess`: `offsetExists/Get/Set/Unset`; `$o[] = 1` da `offsetSet(null, 1)`.",
    "- `Countable`: `count($o)`. `Stringable`: `__toString` avtomatik. `JsonSerializable`: `jsonSerialize(): mixed`.",
    "- `Serializable` eski (o'rniga `__serialize`).",
    "- `UnitEnum`/`BackedEnum`.",
    "",
    "### Ma'lumot tuzilmalari taqqoslash",
    "| Tuzilma | Operatsiya | Eslatma |",
    "|---|---|---|",
    "| `array` | hash/packed | umumiy, tez |",
    "| `SplStack` | push/pop O(1) | LIFO |",
    "| `SplQueue` | enqueue/dequeue O(1) | FIFO (`array_shift` O(n)) |",
    "| `SplMinHeap/MaxHeap` | insert/extract O(log n) | top element |",
    "| `SplPriorityQueue` | insert/extract O(log n) | ustuvorlik bilan |",
    "| `SplFixedArray` | indeks O(1) | qat'iy o'lcham, kam xotira |",
    "| `SplObjectStorage` | obyekt→ma'lumot | strong ref |",
    "| `WeakMap` | obyekt→ma'lumot | weak key |",
    "| `ArrayObject` | massiv-obyekt | massivni o'raydi |",
    "",
    "### Iterator yordamchilari",
    "`LimitIterator`, `InfiniteIterator`, `AppendIterator`, `MultipleIterator`, `CachingIterator` (`hasNext()`), `CallbackFilterIterator`, `RegexIterator`, `RecursiveIteratorIterator` (daraxtlar), `RecursiveDirectoryIterator` (papka daraxti), `GlobIterator`, `NoRewindIterator`, `Generator`.",
    "",
    "### Fayl SPL",
    "`SplFileObject::READ_CSV | SKIP_EMPTY | DROP_NEW_LINE | READ_AHEAD`, `seek`, `fgetcsv`; `SplFileInfo::getExtension/getRealPath`; `SplTempFileObject` (xotirada); `DirectoryIterator`.",
    "",
    "### Autoload / boshqa",
    "`spl_autoload_register`, `spl_object_id/hash`, `spl_classes`, `class_implements`, `iterator_apply`, `class_uses`.",
    "",
    "### Istisnolar (SPL)",
    "Logic: `BadFunctionCallException`, `BadMethodCallException`, `DomainException`, `InvalidArgumentException`, `LengthException`, `OutOfRangeException`. Runtime: `OutOfBoundsException`, `OverflowException`, `RangeException`, `UnderflowException`, `UnexpectedValueException`.",
    "",
    "### Qachon massiv yetarli",
    "99% hollarda. SPL: ustuvorlik navbati (job scheduler, Dijkstra), million elementli son massivlari (`SplFixedArray`), obyekt→metadata (`WeakMap`), katta papka daraxti (iterator)."
  ],
  "examples": [
    {
      "title": "Countable + ArrayAccess + IteratorAggregate",
      "lang": "php",
      "code": [
        "final class Bag implements Countable, ArrayAccess, IteratorAggregate",
        "{",
        "    private array $d = [];",
        "    public function count(): int { return count($this->d); }",
        "    public function offsetExists(mixed $k): bool { return isset($this->d[$k]); }",
        "    public function offsetGet(mixed $k): mixed { return $this->d[$k] ?? null; }",
        "    public function offsetSet(mixed $k, mixed $v): void { $k === null ? $this->d[] = $v : $this->d[$k] = $v; }",
        "    public function offsetUnset(mixed $k): void { unset($this->d[$k]); }",
        "    public function getIterator(): Generator { yield from $this->d; }",
        "}",
        "$b = new Bag(); $b['a'] = 1; echo count($b);"
      ]
    },
    {
      "title": "Priority queue",
      "lang": "php",
      "code": [
        "$q = new SplPriorityQueue();",
        "$q->setExtractFlags(SplPriorityQueue::EXTR_DATA);",
        "$q->insert('email', 1);",
        "$q->insert('payment', 10);",
        "echo $q->extract();     // payment"
      ]
    },
    {
      "title": "WeakMap vs SplObjectStorage",
      "lang": "php",
      "code": [
        "$map = new WeakMap(); $store = new SplObjectStorage();",
        "$o = new stdClass();",
        "$map[$o] = 1; $store[$o] = 1;",
        "unset($o);",
        "echo count($map), count($store);   // 0 1"
      ]
    },
    {
      "title": "SplMinHeap",
      "lang": "php",
      "code": [
        "$h = new SplMinHeap();",
        "foreach ([5, 1, 9, 3] as $x) $h->insert($x);",
        "while (!$h->isEmpty()) echo $h->extract(), ' ';    // 1 3 5 9"
      ]
    },
    {
      "title": "SplFileObject CSV",
      "lang": "php",
      "code": [
        "$f = new SplFileObject('big.csv');",
        "$f->setFlags(SplFileObject::READ_CSV | SplFileObject::SKIP_EMPTY | SplFileObject::READ_AHEAD | SplFileObject::DROP_NEW_LINE);",
        "foreach ($f as $i => $row) { if ($i === 0) continue; import($row); }"
      ]
    }
  ],
  "pitfalls": [
    "`SplFixedArray` faqat butun indeks va o'lcham qat'iy; assotsiativ massiv o'rniga emas.",
    "`SplPriorityQueue` bir xil ustuvorlikli elementlar tartibini kafolatlamaydi (barqaror emas).",
    "`SplObjectStorage` obyektni xotirada ushlab turadi (leak manbai); obyekt hayotini kuzatsangiz `WeakMap`.",
    "`ArrayAccess` ichida `offsetGet` orqali ichki massivni to'g'ridan-to'g'ri o'zgartirish ($b['x'][] = 1) 'Indirect modification' Notice beradi; reference qaytaring yoki `&offsetGet`.",
    "`SplQueue` o'rniga `array_shift` bilan navbat O(n): katta navbatda sekin.",
    "`SplObjectStorage` va `WeakMap` farqini unutmang: birinchisi obyektni ushlab turadi.",
    "`Traversable`ni to'g'ridan implement qilib bo'lmaydi.",
    "`ArrayAccess` + `Countable` bor obyekt `array` tipiga mos kelmaydi (`iterable`/o'z interface'i)."
  ]
});
