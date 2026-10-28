/* Chuqur dars: 53.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("53.6", {
  "lesson": [
    "### OPcache",
    "(Asos: 1.25.) PHP kodini **kompilyatsiya qilingan** (opcode) holda shared memory'da saqlaydi: har so'rovda parse/kompilyatsiya yo'q. Production uchun **majburiy**.",
    "",
    "### Asosiy sozlamalar",
    "```ini",
    "opcache.enable=1",
    "opcache.memory_consumption=256        ; MB (to'lib qolmasin)",
    "opcache.interned_strings_buffer=16",
    "opcache.max_accelerated_files=20000   ; fayl sonidan katta (vendor ham)",
    "opcache.validate_timestamps=0         ; production: fayl o'zgarishini tekshirmaslik",
    "opcache.revalidate_freq=0",
    "opcache.save_comments=1               ; Doctrine/PHPUnit annotatsiyalar",
    "```",
    "`validate_timestamps=0` bilan deploydan keyin **reset**: FPM reload (`systemctl reload php-fpm`) yoki `opcache_reset()`.",
    "",
    "### Tekshirish",
    "`opcache_get_status()`: `opcache_hit_rate` (~100%), `memory_usage` (free), `cache_full`, `oom_restarts`, `num_cached_scripts`. `php -v` \"with Zend OPcache\".",
    "",
    "### Preloading",
    "`opcache.preload` — start'da klasslarni oldindan yuklash (kichik foyda, restart talab); Laravel'da kam ishlatiladi.",
    "",
    "### JIT",
    "`opcache.jit` (8.x): CPU-bound'da foyda; veb-ilovada (I/O-bound) kam — ehtiyotkorlik bilan.",
    "",
    "### CLI",
    "`opcache.enable_cli=0` (default): queue worker/`artisan` OPcache'siz; uzoq jarayonlar uchun yoqish mumkin (`enable_cli=1`) — lekin deploy'da restart.",
    "",
    "### Xatolar",
    "Memory to'lib (`cache_full`) bo'lsa keshlanmaydi: hajmni oshiring; deploydan keyin eski kod ishlaydi (reset unutildi); symlink deploy (`realpath_cache`, `$realpath_root`).",
    "",
    "### Laravel",
    "`composer install --optimize-autoloader --classmap-authoritative`, `php artisan optimize`; OPcache bilan birga eng katta bootstrapping foyda."
  ],
  "examples": [
    {
      "title": "Status",
      "lang": "php",
      "code": [
        "$s = opcache_get_status(false);",
        "printf(\"hit=%.2f%% free=%dMB cached=%d full=%s\\n\",",
        "  $s['opcache_statistics']['opcache_hit_rate'],",
        "  $s['memory_usage']['free_memory'] / 1048576,",
        "  $s['opcache_statistics']['num_cached_scripts'],",
        "  var_export($s['cache_full'], true));"
      ]
    }
  ],
  "pitfalls": [
    "`validate_timestamps=0` bilan deploydan keyin reset qilmasangiz eski kod ishlaydi.",
    "`max_accelerated_files` fayl sonidan kichik bo'lsa ba'zi fayllar keshlanmaydi.",
    "Kesh to'lib qolsa (`cache_full`) tezlik tushadi: `memory_consumption`.",
    "Veb-ilova uchun JIT kam foyda beradi: o'lchamasdan yoqmang."
  ]
});
