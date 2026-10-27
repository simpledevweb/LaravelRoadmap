/* Chuqur dars: 1.36. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.36", {
  "lesson": [
    "### zval va refcount",
    "Har bir PHP qiymati `zval` (16 bayt: tip belgisi + qiymat yoki ko'rsatkich) ko'rinishida saqlanadi. Satr, massiv va obyektlar esa alohida xotira bloki bo'lib, **refcount** (unga nechta o'zgaruvchi ishora qilayotgani) bilan boshqariladi. Refcount 0 ga tushganda xotira darhol bo'shatiladi.",
    "",
    "### Copy-on-Write",
    "`$b = $a;` massivni nusxalamaydi: ikkala o'zgaruvchi bitta massivga ishora qiladi, refcount 2 bo'ladi. Nusxa **faqat biri o'zgartirilganda** olinadi (separation). Shu sabab:",
    "- Katta massivni funksiyaga qiymat bo'yicha uzatish arzon, agar funksiya uni o'zgartirmasa.",
    "- O'zgartirsa, to'liq nusxa olinadi, O(n) vaqt va xotira.",
    "",
    "`memory_get_usage()` bilan buni o'lchash mumkin. Tekshirishda diqqat qiling: `range()` natijasi ham, o'zgaruvchilar ham xotirani band qiladi, shuning uchun o'lchovlarni avval/keyin bilan solishtiring.",
    "",
    "### Obyektlar: handle semantikasi",
    "O'zgaruvchi obyektning o'zini emas, **handle** (identifikator) ni saqlaydi. `$b = $a` ikkala o'zgaruvchi bitta obyektni ko'rsatadi. Funksiyaga uzatilgan obyektni ichkarida o'zgartirsangiz, tashqarida ham o'zgaradi. Bu `&` reference emas: funksiya ichida `$o = new Other()` qilsangiz, tashqaridagi o'zgaruvchi o'zgarmaydi. Nusxa kerak bo'lsa `clone`.",
    "",
    "### Reference va CoW",
    "`&` reference refcount va CoW bilan chalkash o'zaro ta'sir qiladi. Eng mashhur tuzoq: `foreach ($arr as &$v)` dan keyin `$v` massivning oxirgi elementiga reference bo'lib qoladi. Keyingi `foreach ($arr as $v)` oxirgi elementni buzadi. Har doim `unset($v)` qiling yoki reference ishlatmang.",
    "",
    "### Amaliy xulosa",
    "- Katta massivlarni `&` bilan uzatish deyarli hech qachon tezlashtirmaydi.",
    "- Generator va stream katta ma'lumot uchun xotira tejaydi.",
    "- Uzoq yashovchi worker'da `memory_get_peak_usage()` va `gc_collect_cycles()` ni kuzating.",
    "",
    "### zval va xotira modeli chuqurroq",
    "- `zval` (16 bayt): `value` (8 bayt) + `u1.type_info` (4 bayt) + `u2` (4 bayt, yordamchi). Tiplar: `IS_UNDEF`, `IS_NULL`, `IS_FALSE`, `IS_TRUE`, `IS_LONG`, `IS_DOUBLE`, `IS_STRING`, `IS_ARRAY`, `IS_OBJECT`, `IS_RESOURCE`, `IS_REFERENCE`.",
    "- Skalyar qiymat zval ichida saqlanadi (refcount yo'q). String, array, object, reference — `zend_refcounted` header (refcount + type info) bilan alohida heap bloki.",
    "- **Interned string:** literal va identifikatorlar umumiy (refcount yo'q), OPcache'da shared memory.",
    "- **Immutable array:** compile-time literal massivlar OPcache'da immutable va nusxasiz.",
    "",
    "### Copy-on-Write ichkarisi",
    "- Yozishdan oldin `SEPARATE_ARRAY`: refcount > 1 bo'lsa nusxa olinadi (`zend_array_dup`), refcount 1 bo'lsa joyida o'zgaradi.",
    "- Bu massiv elementlari (ichki massiv) uchun ham: `$a['x']['y'] = 1` zanjir bo'ylab ajratadi.",
    "- String ham CoW: `$b = $a; $b .= 'x'` nusxa oladi.",
    "- Obyektda CoW yo'q: handle nusxalanadi.",
    "",
    "### Reference va refcount",
    "`$a = &$b` ikkalasini `zend_reference` ga o'raydi; reference refcount 1 ga tushsa oddiy qiymatga \"qaytadi\" (massiv elementida qolib ketishi mumkin — \"reference leftover\" muammosi).",
    "",
    "### Foydali kuzatuv",
    "- `debug_zval_dump($a)` refcount ni ko'rsatadi, `xdebug_debug_zval('a')` — refcount va is_ref.",
    "- `memory_get_usage()` farqlari — CoW, interned, packed.",
    "- `php -d opcache.enable_cli=1` immutable array ta'sirini ko'rish.",
    "",
    "### Samaradorlik oqibatlari",
    "1. Katta massivni funksiyaga bering: tezkor (refcount++).",
    "2. Funksiya ichida o'zgartirsa — to'liq nusxa (O(n)): kerak bo'lsa yangi massiv qaytarish.",
    "3. `foreach` qiymat bo'yicha massivni nusxalamaydi (refcount+1), tsikl ichida massivni o'zgartirsangiz nusxa olinadi.",
    "4. String konkatenatsiya tsikli: `.=` odatda joyida o'sadi (realloc), `$s = $s . 'x'` ham optimallashtirilgan, lekin ko'p kichik qismni massivga yig'ib `implode` — aniqroq.",
    "5. Obyektlar xotirada alohida va qimmat: million kichik obyekt o'rniga massiv/SplFixedArray.",
    "",
    "### GC bilan aloqasi",
    "Refcount kamaydi lekin 0 emas → GC ildiz buferi (1.23). Tsikl bo'lmasa refcount 0 da darhol o'chadi (deterministik): shuning uchun PHP'da RAII-o'xshash `__destruct` ishonchli (tsikl yo'q bo'lsa)."
  ],
  "examples": [
    {
      "title": "Copy-on-Write o'lchovi",
      "lang": "php",
      "code": [
        "$a = range(1, 1_000_000);",
        "$base = memory_get_usage();",
        "",
        "$b = $a;                                   // nusxa yo'q",
        "echo memory_get_usage() - $base, \"\\n\";     // ~0",
        "",
        "$b[] = 1;                                  // shu yerda separation",
        "echo round((memory_get_usage() - $base) / 1048576), \" MB\\n\"; // ~16-32 MB"
      ],
      "note": "Bayt qiymatlari PHP versiyasiga qarab farq qiladi, lekin tartib o'zgarmaydi."
    },
    {
      "title": "Obyekt handle va reference",
      "lang": "php",
      "code": [
        "function relabel(stdClass $o): void",
        "{",
        "    $o->name = 'yangi';        // tashqarida ham ko'rinadi",
        "    $o = new stdClass();       // faqat lokal handle almashdi",
        "    $o->name = 'boshqa';",
        "}",
        "",
        "$u = new stdClass(); $u->name = 'eski';",
        "relabel($u);",
        "echo $u->name;                 // yangi"
      ]
    },
    {
      "title": "foreach reference tuzog'i",
      "lang": "php",
      "code": [
        "$a = [1, 2, 3];",
        "foreach ($a as &$v) {}         // $v hamon $a[2] ga reference",
        "foreach ($a as $v) {}          // $a[2] ni qayta yozadi",
        "",
        "print_r($a);                   // [1, 2, 2]  <- xato!",
        "",
        "// To'g'ri:",
        "foreach ($a as &$v) { /* ... */ }",
        "unset($v);"
      ]
    },
    {
      "title": "Interned va ajratish",
      "lang": "php",
      "code": [
        "$a = str_repeat('x', 1_000_000);",
        "$m0 = memory_get_usage();",
        "$b = $a;                 // refcount 2, xotira o'zgarmaydi",
        "$m1 = memory_get_usage();",
        "$b .= 'y';               // nusxa: ~1 MB",
        "$m2 = memory_get_usage();",
        "printf(\"%d %d\\n\", $m1 - $m0, $m2 - $m1);   // ~0, ~1000000"
      ]
    },
    {
      "title": "Ichma-ich massiv ajratish",
      "lang": "php",
      "code": [
        "$a = ['x' => range(1, 100000)];",
        "$b = $a;                 // umumiy",
        "$b['y'] = 1;             // tashqi massiv nusxalanadi, ichki 'x' massivi umumiy qoladi",
        "$b['x'][] = 2;           // endi ichki ham nusxalanadi"
      ]
    }
  ],
  "pitfalls": [
    "Massivni funksiyaga `&` bilan uzatish tezlik uchun kerak emas: CoW buni allaqachon optimallashtirgan. Reference kod o'qilishini va optimizatsiyani yomonlashtiradi.",
    "`foreach` dan keyin reference qolsa (`$v`), keyingi tsikllar massivni jimgina buzadi; har doim `unset($v)`.",
    "Obyektni uzatish nusxa emas: ichkarida o'zgartirish tashqariga ta'sir qiladi. Nusxa kerak bo'lsa `clone`, chuqur nusxa uchun `__clone` yozing.",
    "`memory_get_usage()` natijasi allocator bloklari tufayli aniq emas; xotirani o'lchaganda qiymatlarni bir necha marta olib solishtiring.",
    "Funksiya ichida massivni o'zgartirish katta massivda to'liq nusxa yaratadi.",
    "Reference qolgan massiv elementi nusxalashda umumiy bo'lib qoladi.",
    "Million kichik obyekt xotirani to'ldiradi: massiv yoki `SplFixedArray`.",
    "`memory_get_usage()` CoW'ni ko'rsatadi, lekin allocator bloklari tufayli aniq emas."
  ]
});
