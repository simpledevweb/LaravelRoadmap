/* Chuqur dars: 1.21. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.21", {
  "lesson": [
    "### Reference nima",
    "`&` bilan o'zgaruvchiga **alias** yaratadi: ikkita nom bitta qiymatni ko'rsatadi. Bu C'dagi pointer emas, symbol-table alias.",
    "",
    "### Qayerda uchraydi",
    "- `$b = &$a;`",
    "- Funksiya parametri `function f(array &$arr)`",
    "- `foreach ($arr as &$v)`",
    "- Qaytarish `function &getRef()`, `array_walk` (callback reference oladi)",
    "- `static`/`global` o'zgaruvchilar ham reference mexanizmiga tayanadi.",
    "",
    "### Referencening ichki xususiyati",
    "Reference qiymat `zend_reference` ga o'raladi (refcount bilan). Massiv ichidagi reference element nusxalanganda ham reference bo'lib qoladi (bu ajablantiradi). Copy-on-write reference bilan chalkash ishlaydi (1.36).",
    "",
    "### Obyekt va reference",
    "Obyekt handle bo'yicha uzatiladi, shuning uchun obyektni o'zgartirish uchun `&` kerak emas. `&` faqat o'zgaruvchining **o'zini** qayta tayinlash kerak bo'lganda ma'noli.",
    "",
    "### foreach reference tuzog'i",
    "Tsikldan keyin `$v` oxirgi element bilan bog'liq qoladi: `unset($v)`.",
    "",
    "### Qachon ishlatish",
    "Kam. Natijani qaytaring. Istisno: `preg_match(..., $m)`, `sort($arr)` kabi ichki funksiyalar, `array_walk`.",
    "",
    "### Samaradorlik haqida afsona",
    "Katta massivni `&` bilan uzatish tezroq emas: CoW buni hal qilgan. Aksincha, reference optimizatsiyani buzishi mumkin.",
    "",
    "### Reference ichki ishlashi",
    "`$b = &$a` ikkala nom bitta `zend_reference` (refcount va qiymat) ga ishora qiladi. Qiymat bitta joyda, nom ikkita. `unset($b)` faqat nomni olib tashlaydi; refcount 1 ga tushsa reference oddiy qiymatga qaytadi.",
    "",
    "### Reference bilan ishlash joylari",
    "- **Parametr:** `function f(array &$a)`; chaqiruvda faqat o'zgaruvchi berish mumkin (`f([1])` xato).",
    "- **Qaytarish:** `function &get(): array` va `$x = &get();` (juda kam kerak).",
    "- **foreach:** `foreach ($a as &$v)` qiymatni joyida o'zgartiradi.",
    "- **global/static:** `global $x` aslida reference: `$x = &$GLOBALS['x']`.",
    "- **Closure:** `use (&$x)`.",
    "- **Massiv elementi:** `$r = &$a['k']` kalitni yaratadi (null bilan).",
    "- **Obyekt property:** `$r = &$obj->prop`.",
    "- **Ichki funksiyalar:** `sort`, `preg_match(..., &$m)`, `array_push`, `settype`, `array_walk`, `shuffle`, `end/reset/next`.",
    "",
    "### Reference va CoW (1.36)",
    "Massiv element reference bo'lsa, massiv nusxalanganda shu element reference sifatida qoladi (umumiy). Bu kutilmagan bog'lanish; `foreach (&)` va `array_walk` dan keyin `unset` zarur.",
    "",
    "### Reference tipi",
    "Tipli property'ga reference olinganda yozishda tip tekshiriladi; boshqa tipni yozish `TypeError`. `?int &$x` kabi parametr tiplari ruxsat.",
    "",
    "### Obyektlar va reference",
    "Obyekt handle sifatida uzatiladi. `function f(Foo &$o) { $o = new Foo; }` tashqi o'zgaruvchini yangi obyektga ko'chiradi; `function f(Foo $o) { $o = new Foo; }` esa lokal.",
    "",
    "### Samaradorlik haqida",
    "Reference tezlik uchun emas: PHP 7 dan CoW tufayli qiymat bilan uzatish ham arzon. Referensli massiv elementlari optimizatsiyani (packed array) buzishi va xotirani oshirishi mumkin.",
    "",
    "### Alternativalar",
    "Natijani qaytarish (`return`), obyekt (mutable holat), `ArrayObject`, DTO. Ikki qiymat qaytarish kerak bo'lsa massiv/obyekt qaytaring, `list()` bilan oching.",
    "",
    "### Aniqlash",
    "`xdebug_debug_zval('a')` refcount va `is_ref` ni ko'rsatadi; oddiy `var_dump` massivdagi reference elementni `*` belgisi bilan belgilaydi."
  ],
  "examples": [
    {
      "title": "Alias",
      "lang": "php",
      "code": [
        "$a = 1;",
        "$b = &$a;",
        "$b++;",
        "echo $a;          // 2",
        "unset($b);        // faqat alias o'chdi, $a qoladi"
      ]
    },
    {
      "title": "Funksiya reference",
      "lang": "php",
      "code": [
        "function addTag(array &$tags, string $t): void { $tags[] = $t; }",
        "$tags = ['php'];",
        "addTag($tags, 'laravel');   // ['php', 'laravel']"
      ]
    },
    {
      "title": "Massivdagi reference sirli",
      "lang": "php",
      "code": [
        "$a = [1, 2, 3];",
        "$r = &$a[1];",
        "$copy = $a;          // nusxa",
        "$copy[1] = 99;       // $a[1] ham 99 bo'ladi, chunki element reference!",
        "echo $a[1];          // 99"
      ]
    },
    {
      "title": "Global va static reference",
      "lang": "php",
      "code": [
        "function inc() { global $counter; $counter++; }   // $counter = &$GLOBALS['counter']",
        "$counter = 0; inc(); inc(); echo $counter;        // 2"
      ]
    },
    {
      "title": "Qaytariladigan reference",
      "lang": "php",
      "code": [
        "class Bag { private array $d = ['a' => 1]; public function &get(string $k) { return $this->d[$k]; } }",
        "$b = new Bag(); $x = &$b->get('a'); $x = 99;",
        "// $b ichidagi 'a' endi 99"
      ]
    }
  ],
  "pitfalls": [
    "`foreach (... as &$v)` dan keyin `unset($v)` qilmasangiz, keyingi tsikl oxirgi elementni buzadi.",
    "Massiv ichidagi reference element nusxalanganda ham reference bo'lib qoladi: kutilmagan umumiy holat.",
    "Reference tezlik uchun emas: CoW allaqachon arzon; oddiy qaytarish aniqroq.",
    "Reference qaytaruvchi funksiya (`function &f()`) kamdan-kam kerak va murakkab; qochib o'ting.",
    "Reference qaytaruvchi funksiya (`&get()`) invariantlarni buzadi: private holatni tashqariga ochadi.",
    "`foreach (&)` dan keyin `unset($v)` unutilsa massiv buziladi.",
    "Reference bilan massiv uzatish CoW ni o'chiradi va ba'zan sekinroq.",
    "`f([1,2])` ga reference parametrli funksiyani chaqirib bo'lmaydi (faqat o'zgaruvchi)."
  ]
});
