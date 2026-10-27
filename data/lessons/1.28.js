/* Chuqur dars: 1.28. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.28", {
  "lesson": [
    "### PHP massivi",
    "Tartiblangan **hash map**: kalit (`int` yoki `string`) → qiymat, qo'shilish tartibi saqlanadi. List sifatida ham, dictionary sifatida ham ishlaydi. `\"5\"` kalit `5` ga, `true` esa `1` ga, `null` esa `\"\"` ga aylanadi (kalit normalizatsiyasi).",
    "",
    "### Asosiy amallar",
    "`[]` qo'shish, `unset`, `isset($a['k'])` (null bo'lsa false), `array_key_exists`, `count`, spread `[...$a, ...$b]`, destructuring `['id' => $id] = $row;` va `[$a, , $c] = $list;`.",
    "",
    "### Funksional uslub",
    "`array_map`, `array_filter` (kalitni saqlaydi, `array_values` bilan qayta indekslash), `array_reduce`, `array_column`, `array_combine`, `array_merge` (kalit qayta nomerlanadi) va `+` (chapdagi kalit ustun), `array_unique`, `array_slice/splice`, `array_chunk`, `array_flip`, `array_diff`, `array_intersect_key`.",
    "",
    "### Tartiblash",
    "`sort/rsort`, `asort/arsort` (qiymat bo'yicha, kalit saqlanadi), `ksort`, `usort` (custom). PHP 8.0 dan tartiblash **barqaror**. `<=>` (spaceship) comparator uchun.",
    "",
    "### Yangi yordamchilar",
    "`array_is_list()` (8.1), `array_find`, `array_find_key`, `array_any`, `array_all` (8.4), `array_first/array_last` (8.5).",
    "",
    "### Samaradorlik",
    "- `in_array` va `array_search` — O(n); ko'p qidiruv bo'lsa `array_flip` + `isset` (O(1)).",
    "- Katta massivda `array_merge` ni tsikl ichida ishlatmang (har safar nusxa, O(n²)); `[...$a, ...$b]` yoki `array_push`.",
    "- Packed array (0..n-1 indeks) xotirada ixchamroq.",
    "- `count()` tsiklda har safar chaqirilmasin (PHP o'zi tez, lekin odat).",
    "",
    "### Collection",
    "Laravel `Collection` massiv ustidagi oqim: `map/filter/groupBy/pluck`. Katta ma'lumot uchun `LazyCollection`.",
    "",
    "### Massiv tuzilishi tafsiloti",
    "",
    "**Kalitlar**",
    "- Faqat `int` va `string`. Normalizatsiya: `\"5\"` → `5`, `\"05\"` → string, `5.7` → `5` (8.1 dan deprecated, kasr yo'qotilishi), `true` → `1`, `null` → `\"\"`. `array`/`object` kalit bo'la olmaydi (`TypeError`).",
    "- `[]` qo'shish: eng katta int kalit + 1. Manfiy kalit bilan boshlansa 8.3 dan keyingi kalit `n+1`.",
    "- Tartib: **qo'shilish tartibi** saqlanadi; `ksort` kalitga ko'ra.",
    "",
    "**Ichki ko'rinish**",
    "- **Packed array:** kalitlar `0..n-1` ketma-ket int bo'lsa, PHP uni oddiy vektor kabi saqlaydi: kam xotira (zval 16 bayt), tez.",
    "- **Hash:** boshqa holatda har element uchun kalit + qiymat + zanjir (`Bucket`, 32 bayt) kerak. Shuning uchun `array_flip` bilan katta lug'at xotirani ko'paytiradi.",
    "- Elementlar o'chirilsa \"teshik\" qoladi; `array_values()` zichlaydi.",
    "",
    "**Massiv va qiymat semantikasi**",
    "Massiv qiymat bo'yicha uzatiladi (CoW, 1.36). `foreach` standart holatda massivning **nusxasi** ustida yuradi, ya'ni tsikl ichida massivni o'zgartirsangiz iteratsiya buzilmaydi; reference bilan (`&$v`) esa jonli massiv.",
    "",
    "### Massiv yaratish va olish",
    "- `[1, 2]`, `array(1,2)` (eski), `range('a','e')`, `array_fill(0, 3, 0)`, `array_fill_keys`, `array_pad`, `compact('a','b')` / `extract($arr)` (extract xavfli), `str_split`, `explode`.",
    "- Olish: `$a['k'] ?? 'def'` (xatosiz), `isset`, `array_key_exists` (null qiymat uchun), `array_key_first/last` (7.3), `current/key/next/reset/end` (ichki ko'rsatkich, eski).",
    "- **Destructuring:** `[$a, [$b, $c]] = [1, [2, 3]];`, kalit bilan `['x' => $x] = $p;`, `foreach ($rows as ['id' => $id, 'name' => $n])`, almashtirish `[$a, $b] = [$b, $a];`.",
    "",
    "### Kengaytirilgan funksiyalar",
    "- **Ro'yxat bilan:** `array_merge`, `array_merge_recursive`, `array_replace`, `array_replace_recursive`, `+`, `array_combine`, `array_diff/diff_key/diff_assoc`, `array_intersect*`, `array_udiff` (custom).",
    "- **Transformatsiya:** `array_map` (bir necha massiv bilan `null` callback = zip), `array_walk`, `array_walk_recursive`, `array_reduce`, `array_column` (obyektlar bilan ham), `array_chunk($a, 2, true)`, `array_slice($a, 1, 2, true)` (kalit saqlash), `array_splice`.",
    "- **Qidirish:** `in_array`, `array_search`, `array_keys($a, $value)`, `array_count_values`, `array_unique` (loose solishtiradi, SORT_REGULAR), `array_product/sum`, `max/min`.",
    "- **Tartiblash:** `sort`, `rsort`, `usort`, `uasort` (kalit saqlaydi), `uksort`, `array_multisort`, flaglar (`SORT_STRING | SORT_FLAG_CASE`, `SORT_NATURAL`), `shuffle`, `array_reverse($a, true)`.",
    "- **Spread:** `[...$a, ...$b]` (string kalit 8.1 dan), funksiyaga `f(...$args)`.",
    "",
    "### Ko'p o'lchamli va chuqur ishlash",
    "Ichma-ich massiv: `$a['x']['y'][] = 1` oraliq kalitlarni avtomatik yaratadi (autovivification), lekin o'qishda `Undefined array key`. Chuqur nusxa massivlarda avtomatik (qiymat), massivda obyekt bo'lsa handle nusxalanadi. Laravel `Arr::get($a, 'x.y.z')`, `Arr::set`, `data_get`.",
    "",
    "### Jonli o'zgarish bilan xatolar",
    "`foreach ($a as $k => $v) { unset($a[$k]); }` xavfsiz (nusxada yuradi), lekin referencda emas. `array_shift` indekslarni qayta nomerlaydi va O(n); navbat uchun `SplQueue` (1.35). `sort` o'zini o'zgartiradi (referens bilan) va `bool` qaytaradi, yangi massiv emas.",
    "",
    "### JSON va serializatsiya",
    "`json_encode($list)` → `[]` (list) yoki `{}` (assotsiativ); `array_is_list()` bilan tekshiring; `JSON_THROW_ON_ERROR`, `JSON_PRETTY_PRINT`, `JSON_UNESCAPED_UNICODE` (o'zbekcha belgi `ʻ` bo'lib ketmasligi uchun)."
  ],
  "examples": [
    {
      "title": "O(1) qidirish",
      "lang": "php",
      "code": [
        "$allowed = array_flip($allowedIds);       // [3 => 0, 7 => 1]",
        "$ok = array_filter($rows, fn($r) => isset($allowed[$r['id']]));"
      ]
    },
    {
      "title": "Funksional pipeline",
      "lang": "php",
      "code": [
        "$emails = array_column(",
        "    array_filter($users, fn($u) => $u['active']),",
        "    'email',",
        "    'id'",
        ");",
        "",
        "['id' => $id, 'name' => $name] = $users[0];",
        "$sum = array_reduce($orders, fn($c, $o) => $c + $o['total'], 0);"
      ]
    },
    {
      "title": "8.4 helperlar",
      "lang": "php",
      "code": [
        "$first = array_find($users, fn($u) => $u['age'] > 30);",
        "var_dump(array_any($users, fn($u) => $u['admin']));",
        "var_dump(array_all($users, fn($u) => $u['email'] !== ''));"
      ]
    },
    {
      "title": "Destructuring va foreach",
      "lang": "php",
      "code": [
        "$rows = [['id' => 1, 'name' => 'Ali'], ['id' => 2, 'name' => 'Vali']];",
        "foreach ($rows as ['id' => $id, 'name' => $n]) { echo \"$id:$n\\n\"; }",
        "",
        "[$a, $b] = [$b ?? 1, $a ?? 2];            // almashtirish",
        "['x' => $x, 'y' => $y] = ['x' => 1, 'y' => 2];"
      ]
    },
    {
      "title": "Tartiblash",
      "lang": "php",
      "code": [
        "$files = ['img12.png', 'img10.png', 'img2.png'];",
        "sort($files);                          // img10, img12, img2",
        "natsort($files);                       // img2, img10, img12",
        "usort($users, fn($a, $b) => [$a->age, $a->name] <=> [$b->age, $b->name]);",
        "arsort($scores);                       // qiymat bo'yicha kamayish, kalit saqlanadi"
      ]
    },
    {
      "title": "JSON va list",
      "lang": "php",
      "code": [
        "$a = [1 => 'a', 2 => 'b'];",
        "echo json_encode($a);                  // {\"1\":\"a\",\"2\":\"b\"}",
        "echo json_encode(array_values($a));    // [\"a\",\"b\"]",
        "var_dump(array_is_list([0 => 'x', 1 => 'y'])); // true",
        "echo json_encode(['n' => 'Oʻzbek'], JSON_UNESCAPED_UNICODE);"
      ]
    }
  ],
  "pitfalls": [
    "`array_filter` kalitlarni saqlaydi: JSON'ga chiqarganda list o'rniga object bo'lib qoladi; `array_values()`.",
    "`array_merge` raqamli kalitlarni qayta nomerlaydi, `+` esa chapdagisini saqlaydi: natijalar farq qiladi.",
    "Tsikl ichida `array_merge($acc, $x)` O(n²): spread yoki `foreach` bilan to'plang.",
    "`in_array` loose: `in_array('abc', [0])` kabi xatolar; 3-argument `true`.",
    "`array_unique` loose solishtiradi: `[1, '1', true]` bitta element bo'lib qoladi; murakkab holatda `SORT_REGULAR` o'rniga o'z mantig'ingiz.",
    "`array_shift` har chaqiruvda indekslarni qayta nomerlaydi (O(n)): navbat uchun `SplQueue`.",
    "`extract($_POST)` o'zgaruvchilarni ustiga yozadi: xavfsizlik teshigi.",
    "`sort()` `true` qaytaradi, saralangan massivni emas: `$sorted = sort($a)` xato."
  ]
});
