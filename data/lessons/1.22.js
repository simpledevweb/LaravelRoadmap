/* Chuqur dars: 1.22. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.22", {
  "lesson": [
    "### Xotira modeli",
    "PHP xotirani Zend Memory Manager orqali boshqaradi. Har bir so'rov uchun alohida xotira, tugagach hammasi bo'shaydi (shared-nothing). `memory_limit` bitta jarayon chegarasi (`-1` — cheksiz). Qiymatlar refcount (1.36) bilan, tsiklik bog'lanishlar esa GC bilan tozalanadi (1.23).",
    "",
    "### O'lchash",
    "- `memory_get_usage()` — hozirgi sarf, `memory_get_peak_usage()` — eng yuqori nuqta, `true` argumenti OSdan so'ralgan xotirani beradi.",
    "- Profil: Xdebug, Blackfire, Tideways, `php-meminfo`.",
    "",
    "### Streams",
    "Katta fayl bilan `file_get_contents`/`file()` butun faylni xotiraga yuklaydi. Stream (`fopen`, `fgets`, `fgetcsv`, `stream_copy_to_stream`, `php://temp`) esa bo'lak-bo'lak o'qiydi. `php://temp` ma'lum chegaragacha (default 2 MB) RAM'da, undan oshsa diskdagi vaqtinchalik faylda saqlaydi.",
    "",
    "### Weak references",
    "`WeakReference::create($obj)` obyektni ushlab turmaydi: obyekt o'chsa `get()` `null` qaytaradi. `WeakMap` (8.0) kalit sifatida obyektni oladi va kalit o'chsa yozuv ham o'chadi: obyekt-bog'liq kesh/metadata uchun, xotira sizishisiz.",
    "",
    "### Uzoq yashovchi jarayonlar",
    "Queue worker, Octane, daemon: xotira so'rovlar orasida to'planadi. Sabablar: static kesh, event listener'lar yig'ilishi, Eloquent query log (`DB::disableQueryLog()`), katta `Collection`'lar, tsiklik obyektlar. Chora: `--max-jobs`, `--max-time`, `--memory`, `chunkById()`/`lazy()`/`cursor()`, tsikldan keyin `unset` va `gc_collect_cycles()`.",
    "",
    "### memory_limit tanlash",
    "Web: 128–256M; CLI/import: odatda Generator va stream bilan oshirmasdan o'tish. Cheksiz qilish muammoni yashiradi.",
    "",
    "### PHP xotira tuzilishi",
    "- **Zend Memory Manager (ZendMM):** `malloc` o'rniga chunk (2 MB) / page (4 KB) / bin (kichik bloklar) tizimi; so'rov oxirida butun xotira bir zumda bo'shatiladi.",
    "- `memory_limit` shu jarayon uchun ZendMM chegarasi; `Allowed memory size of ... bytes exhausted` fatal xatosi.",
    "- **Real xotira:** `memory_get_usage(true)` OS dan olingan chunk'lar, `false` — haqiqatan ishlatilgan.",
    "- **Persistent xotira:** OPcache (shared memory), APCu, persistent connection'lar, `$GLOBALS` emas (so'rov bilan o'ladi).",
    "",
    "### Xotira sarfi o'lchovlari (taxminan, 64-bit PHP 8)",
    "- `int`/`float`/`bool`/`null` zval — 16 bayt.",
    "- Qisqa string — 24 + uzunlik bayt (header), interned stringlar umumiy.",
    "- Packed array elementi — 16 bayt; hash — 32 bayt + 4-bayt ichki.",
    "- Obyekt — header 40 bayt + property'lar (16 bayt/prop).",
    "- Bu raqamlar PHP versiyasiga qarab o'zgaradi: o'lchang.",
    "",
    "### Xotira ko'p ketishining sabablari",
    "1. Butun natijani massivga yuklash (`->get()`, `file()`, `fetchAll`).",
    "2. Eloquent modellari (har biri ~ yuzlab bayt + original/attributes/relations).",
    "3. Katta `Collection` zanjirlari (har bosqich yangi massiv).",
    "4. `array_merge` tsiklda.",
    "5. Static kesh, singleton, listener to'planishi.",
    "6. Tsiklik referens (GC tozalashiga qadar).",
    "7. Query log (`DB::enableQueryLog()`), Telescope/Debugbar, Log buferlari.",
    "",
    "### Diagnostika",
    "`memory_get_peak_usage()`, Xdebug profiler, Blackfire, `php-meminfo` (heap dump), `spx`, `memory_reset_peak_usage()` (8.2). Worker'da har N job'dan keyin log: `memory_get_usage()` o'sib ketsa leak.",
    "",
    "### Laravel worker xotirasi",
    "`queue:work --memory=128 --max-jobs=1000 --max-time=3600 --sleep=3`; Horizon `memory` va `maxProcesses`; Octane `--max-requests`. Worker memory limitga yetsa chiroyli to'xtab Supervisor/Horizon qayta ishga tushiradi.",
    "",
    "### WeakReference va WeakMap",
    "`WeakReference::create($o)->get()` obyekt tirik bo'lsa uni, o'lgan bo'lsa `null` qaytaradi. `WeakMap` kalit obyektga **kuchsiz** reference oladi, qiymat esa kuchli. Qo'llanishi: obyektga bog'liq kesh (memoization), identity map, metadata, ORM unit-of-work.",
    "",
    "### Stream va generator",
    "Katta fayl/eksport: `fopen` + `fgets`; `php://output` ga to'g'ridan yozish (`response()->streamDownload`); DB: `cursor()`/`lazy()`; HTTP: `Http::sink($path)` yoki Guzzle stream."
  ],
  "examples": [
    {
      "title": "Stream bilan nusxalash",
      "lang": "php",
      "code": [
        "$src  = fopen('php://stdin', 'rb');",
        "$dest = fopen('php://temp/maxmemory:2097152', 'w+b');  // 2 MB gacha RAM",
        "stream_copy_to_stream($src, $dest);",
        "rewind($dest);",
        "echo fgets($dest);"
      ]
    },
    {
      "title": "WeakMap kesh",
      "lang": "php",
      "code": [
        "final class Meta",
        "{",
        "    private WeakMap $cache;",
        "    public function __construct() { $this->cache = new WeakMap(); }",
        "",
        "    public function of(object $o): array",
        "    {",
        "        return $this->cache[$o] ??= ['hash' => spl_object_id($o)];",
        "    }",
        "}",
        "$m = new Meta(); $u = new stdClass();",
        "$m->of($u);",
        "unset($u);                 // WeakMap dagi yozuv ham yo'qoladi"
      ]
    },
    {
      "title": "Eloquent: xotira tejash",
      "lang": "php",
      "code": [
        "// yomon: hammasi xotiraga",
        "foreach (User::all() as $u) { /* ... */ }",
        "",
        "// yaxshi",
        "User::query()->chunkById(1000, function ($users) { /* ... */ });",
        "foreach (User::lazy() as $u) { /* ... */ }"
      ]
    },
    {
      "title": "Chunk bilan ishlash",
      "lang": "php",
      "code": [
        "User::query()->where('active', true)->chunkById(1000, function ($users) {",
        "    foreach ($users as $u) { sync($u); }",
        "    gc_collect_cycles();                       // ixtiyoriy: uzoq jarayonda",
        "});",
        "echo round(memory_get_peak_usage(true) / 1048576), ' MB';"
      ]
    },
    {
      "title": "Memoization (WeakMap)",
      "lang": "php",
      "code": [
        "final class Memo",
        "{",
        "    private static ?WeakMap $m = null;",
        "    public static function of(object $o, callable $f): mixed",
        "    {",
        "        self::$m ??= new WeakMap();",
        "        return self::$m[$o] ??= $f($o);",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`memory_limit=-1` muammoni yashiradi va serverni qulatishi mumkin; sabab (butun faylni yuklash) tuzatilsin.",
    "Eloquent query log worker'da to'planib xotira o'sadi: `DB::disableQueryLog()`.",
    "`WeakMap` kaliti faqat obyekt bo'lishi mumkin; qiymatlar ichida kalit obyektga strong reference bo'lsa yozuv o'chmaydi.",
    "`memory_get_usage()` jarayon RSS emas; real sarf uchun `true` argumenti va tizim monitoringi.",
    "`memory_get_usage()` bir martalik o'lchov noto'g'ri: loop oldidan va keyin solishtiring.",
    "`DB::enableQueryLog()` worker'da cheksiz o'sadi.",
    "`->get()` bilan millionlab model yuklash OOM beradi: `chunkById`/`lazy`.",
    "WeakMap qiymati kalit obyektga strong reference bo'lsa yozuv o'chmaydi."
  ]
});
