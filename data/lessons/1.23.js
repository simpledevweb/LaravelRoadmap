/* Chuqur dars: 1.23. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.23", {
  "lesson": [
    "### Reference counting yetmaydi",
    "Refcount oddiy holatda xotirani darhol bo'shatadi. Lekin **tsiklik reference** (A → B → A) da hech qaysi hisob nolga tushmaydi: obyektlar foydalanilmasa ham xotirada qoladi.",
    "",
    "### Cycle collector",
    "PHP 5.3 dan GC bor. Refcount kamaygan, lekin nolga tushmagan zval \"mumkin bo'lgan ildiz\" sifatida **root buffer**ga yoziladi. Buffer to'lganda (default 10 000 ildiz) GC sinov o'tkazadi: ichki reference'larni ayiradi va tashqi tomondan ishora qilinmagan guruhni o'chiradi.",
    "",
    "### Boshqarish",
    "- `gc_enable()` / `gc_disable()` / `gc_enabled()`",
    "- `gc_collect_cycles()` — qo'lda ishga tushirish, o'chirilgan hisobni qaytaradi",
    "- `gc_status()` — runs, collected, threshold, roots",
    "- INI: `zend.enable_gc`. Eslatma: GC o'chirilgan bo'lsa ham ildizlar buferga yozilaveradi, bufer to'lsa to'xtaydi, shuning uchun GC o'chirib qo'yish xotirani o'z-o'zidan tejamaydi.",
    "",
    "### Qachon sezilarli",
    "Uzoq yashovchi skript/worker, ko'p tsiklik struktura (daraxtlar `parent`↔`children`, event emitter'lar, ORM identity map), katta importlar. Oddiy web so'rovda so'rov oxirida xotira baribir bo'shaydi.",
    "",
    "### Tsiklni kesish",
    "Tsikl zarur emasligini aniqlang: `WeakReference`, ota bog'lanishni saqlamaslik, ish tugagach `unset($child->parent)`.",
    "",
    "### Destructor tartibi",
    "`__destruct` chaqirilish vaqti kafolatlanmaydi; GC tsiklni yig'ayotganda destructor'lar ishlaydi, lekin tartibi ma'lum emas. Resurslarni (fayl, ulanish) `finally` bilan aniq yoping.",
    "",
    "### GC va tezlik",
    "GC ishlashi qisqa to'xtashlarga sabab bo'lishi mumkin. Profil asosida sozlang, \"ko'r-ko'rona o'chirish\" emas.",
    "",
    "### Garbage Collector ichki mantiq",
    "PHP 5.3+ **concurrent cycle collection** algoritmi (Bacon–Rajan sinxron varianti):",
    "1. Refcount kamayganda, lekin 0 bo'lmaganda obyekt/massiv \"mumkin bo'lgan ildiz\" (possible root) sifatida buferga yoziladi (**purple** rang).",
    "2. Bufer chegaraga (default 10 000) yetganda GC ishlaydi.",
    "3. Ildizdan boshlab ichki referenslar \"sinov tarzida\" kamaytiriladi (mark grey).",
    "4. Hisob 0 bo'lib qolgan qism — ichkaridan o'zaro bog'langan, tashqidan ishora yo'q: axlat (**white**) deb belgilanadi va o'chiriladi.",
    "5. Tashqi ishoraga ega qism tiklanadi (**black**).",
    "",
    "### Sozlash va kuzatish",
    "- `zend.enable_gc` (INI), `gc_enable/disable`.",
    "- `gc_status()`: `runs`, `collected`, `threshold`, `roots` (8.3 da `running`, `protected`, `full`, `buffer_size`).",
    "- `gc_collect_cycles()` majburan ishga tushiradi va yig'ilgan elementlar sonini qaytaradi.",
    "- `gc_mem_caches()` ZendMM keshlarini bo'shatadi.",
    "- Threshold avtomatik moslashadi: GC yig'a olmasa chegara oshadi (10 000 → ... ) va kam foyda bo'lsa kamroq ishlaydi.",
    "",
    "### Qachon GC muhim",
    "- Uzoq yashovchi CLI/worker (yuz minglab obyekt).",
    "- ORM identity map, daraxt tuzilmalari, event emitter, DOM/SimpleXML bilan ishlash, bolalar-ota o'zaro bog'lanishli obyektlar.",
    "- Test to'plami (PHPUnit ko'p test obyektlari): `gc_collect_cycles()` testlar orasida xotirani tushiradi.",
    "",
    "### Qachon GC kerak emas",
    "Oddiy web so'rov: oxirida hamma xotira bo'shaydi; GC bir marta ham ishlamasligi mumkin. GC ishlashi CPU ni biroz sarflaydi: katta ilovada `zend.enable_gc=0` ba'zan benchmark'da ko'rinadi (lekin xotira sizishi xavfi).",
    "",
    "### Destructor va tartib",
    "Tsikl yig'ilganda `__destruct` chaqiriladi, lekin tartib ma'lum emas; GC ishlash vaqti ham oldindan aytib bo'lmaydi. Ish mantig'ini destructor'ga yozmang.",
    "",
    "### Tsiklni oldini olish",
    "1. Ota ↔ bola ikki tomonlama bog'lanishda bir tomonni `WeakReference` qiling.",
    "2. Ish tugagach `unset($node->parent)` yoki `dispose()` metodi.",
    "3. Closure `$this` ni ushlasa: `static fn`.",
    "4. Event listener'larni ro'yxatdan chiqaring.",
    "",
    "### Diagnostika",
    "`php-meminfo` bilan heap'ni dump qilib, referens zanjirini ko'rish; `memory_get_usage()` o'sishi + `gc_collect_cycles()` qancha qaytargani (agar katta bo'lsa — tsikl bor)."
  ],
  "examples": [
    {
      "title": "Tsiklik reference",
      "lang": "php",
      "code": [
        "class Node { public $other; }",
        "$a = new Node(); $b = new Node();",
        "$a->other = $b; $b->other = $a;       // tsikl",
        "unset($a, $b);                        // refcount 0 ga tushmaydi",
        "",
        "echo gc_collect_cycles();             // 2 (yig'ildi)",
        "print_r(gc_status());"
      ]
    },
    {
      "title": "WeakReference bilan tsiklni kesish",
      "lang": "php",
      "code": [
        "final class Child",
        "{",
        "    private WeakReference $parent;",
        "    public function __construct(Parent_ $p) { $this->parent = WeakReference::create($p); }",
        "    public function parent(): ?Parent_ { return $this->parent->get(); }",
        "}"
      ]
    },
    {
      "title": "Worker'da kuzatish",
      "lang": "php",
      "code": [
        "while ($job = nextJob()) {",
        "    handle($job);",
        "    if (++$i % 1000 === 0) {",
        "        gc_collect_cycles();",
        "        error_log('mem=' . round(memory_get_peak_usage() / 1048576) . 'MB');",
        "    }",
        "}"
      ]
    },
    {
      "title": "GC statistikasi",
      "lang": "php",
      "code": [
        "class N { public $self; public $payload; }",
        "for ($i = 0; $i < 20000; $i++) { $n = new N; $n->self = $n; $n->payload = str_repeat('x', 100); }",
        "print_r(gc_status());               // runs > 0, collected > 0",
        "echo gc_collect_cycles();"
      ]
    },
    {
      "title": "Closure tsikli",
      "lang": "php",
      "code": [
        "class View { public function __construct() { $this->cb = function () { return $this; }; } public $cb; }",
        "// $this closure'da, closure $this da: tsikl",
        "class View2 { public $cb; public function __construct() { $this->cb = static fn () => 1; } } // tsikl yo'q"
      ]
    }
  ],
  "pitfalls": [
    "`gc_disable()` xotirani tejamaydi: ildizlar bufer to'lguncha yozilaveradi.",
    "Tsiklik reference + `__destruct` kutilmagan tartib va kechikish beradi; resurslarni aniq yoping.",
    "`gc_collect_cycles()` ni har so'rovda chaqirish keraksiz va sekin; faqat uzoq jarayonda ongli ravishda.",
    "Muammo GC emas, strong reference (static kesh, listener)lar bo'lishi ko'p: avval profil qiling.",
    "`zend.enable_gc=0` bilan uzoq jarayon xotirani to'ldirishi mumkin.",
    "Closure `$this` ni ushlasa va obyekt closure'ni saqlasa — tsikl: `static fn`.",
    "`gc_collect_cycles()` ni tez-tez chaqirish CPU yoqadi; faqat uzoq jarayonda va oraliqda.",
    "Memory leak sababi ko'pincha GC emas, doimiy strong reference (static, kesh)."
  ]
});
