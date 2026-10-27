/* Chuqur dars: 1.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.5", {
  "lesson": [
    "### strict_types nima",
    "Odatiy (coercive) rejimda PHP funksiya argumentini e'lon qilingan tipga **jimgina o'giradi**: `function f(int $x)` ga `\"5\"` yoki `5.0` uzatsangiz ishlaydi. `declare(strict_types=1);` esa shu fayl uchun skalyar tiplarni qat'iylashtiradi: `\"5\"` uzatsangiz `TypeError`.",
    "",
    "### Qaysi joyda ta'sir qiladi",
    "- Argumentlar uchun qoida **chaqiruvchi fayl**niki, `return` qiymati uchun esa funksiya **e'lon qilingan fayl**niki.",
    "- Faqat skalyar tiplarga (`int`, `float`, `string`, `bool`) ta'sir qiladi: argument, `return` va tipli property qiymatlariga.",
    "- Yagona ruxsat etilgan o'girish: `int` → `float` (`function f(float $x)` ga `5` berish mumkin).",
    "- Fayl **birinchi** statement bo'lishi shart (`<?php` dan keyin, oldin faqat izoh); fayl o'rtasida ishlamaydi.",
    "- Ichki funksiyalar ham tekshiriladi: `strlen(123)` strict rejimda `TypeError` beradi.",
    "",
    "### Nega yoqish kerak",
    "1. Xatolar manbada darhol ushlanadi, bazaga yoki API ga noto'g'ri tip bilan yetib bormaydi.",
    "2. Statik analizatorlar (PHPStan, Psalm) va IDE bilan bir xil mantiqda ishlaydi.",
    "3. `\"abc\"` ni `0` ga o'girish kabi jim xatolar yo'qoladi.",
    "",
    "Laravel skeleti va ko'p zamonaviy paketlar hamma faylda `strict_types=1` yozadi. Yangi kodda bu standart bo'lishi kerak.",
    "",
    "### Eski loyihada yoqish",
    "Bir vaqtda hammasini yoqmang. Avval testlar va PHPStan darajasini oshiring, keyin yangi fayllarda, so'ng modul bo'yicha yoqing. Rector bilan `declare(strict_types=1)` ni avtomatik qo'shish mumkin. Ko'p xato aniqlanadigan joylar: request/DB'dan keladigan satr qiymatlari (`\"42\"`), `float` natija kutilgan joyga `int` qaytishi.",
    "",
    "### strict_types ichki mexanikasi",
    "Direktiva fayl bo'yicha **kompilyatsiya vaqti** bayrog'i. U ikki joyda ishlaydi:",
    "1. **Argumentlar:** chaqiruvchi fayl strict bo'lsa, tipni o'girish yo'q.",
    "2. **Return:** funksiya e'lon qilingan fayl strict bo'lsa, qaytarilgan qiymat qat'iy tekshiriladi.",
    "Property tipi uchun ham yozilayotgan (assign qilayotgan) fayl rejimi qo'llanadi.",
    "",
    "**Qaysi o'girishlar ruxsat**",
    "Strict rejimda faqat `int` → `float` ruxsat. Qolgan hammasi (`\"5\"` → int, `5.0` → int, `1` → string, `1` → bool) `TypeError`. `null` skalyarga o'tmaydi.",
    "",
    "**Ichki funksiyalar**",
    "`strlen(123)`, `str_repeat('a', '3')`, `round('1.5')`, `in_array(1, '1')` strict rejimda TypeError. Ya'ni `strlen($intId)` kodi koddan o'tib ketmaydi. Ko'p xatolar shu yerda topiladi.",
    "",
    "**Ma'lumot manbalari**",
    "- `$_GET/$_POST/$request->input()` — satr; sonli kerak bo'lsa `(int)` yoki validator + `->integer()`.",
    "- DB'dan PDO: driver va sozlamaga qarab (`PDO::ATTR_STRINGIFY_FETCHES`, eski PHP versiyalarida emulate prepares) son satr bo'lib kelishi mumkin; DECIMAL har doim satr. Eloquent `$casts` tiplarni aniqlaydi.",
    "- JSON: `json_decode` tiplarni saqlaydi (int/float/bool/string).",
    "",
    "**Qachon yoqmaslik**",
    "Eski kodda to'satdan hammasini yoqmang. Tavsiya: yangi fayllarga shablon (stub) bilan, eski kodni Rector (`DeclareStrictTypesRector`) + test bilan bosqichma-bosqich.",
    "",
    "**Strict va statik tahlil**",
    "PHPStan baribir tiplarni tekshiradi, strict_types esa runtime'dagi xavfsizlik to'rini beradi. Ikkalasi birga ishlatiladi.",
    "",
    "**Laravel**",
    "`artisan make:*` stub'lari `declare(strict_types=1)` qo'shmaydi (default), Laravel skeletidagi fayllar ham unda yo'q; o'z `stub:publish` shabloningizga qo'shish mumkin. Framework ichki chaqiruvlari o'z fayllari rejimiga amal qiladi, sizning strict'ingiz Laravel metodlarini chaqirishda faqat sizning argumentlaringizga ta'sir qiladi."
  ],
  "examples": [
    {
      "title": "Coercive va strict farqi",
      "lang": "php",
      "code": [
        "<?php",
        "declare(strict_types=1);",
        "",
        "function addDays(int $days): int { return $days + 1; }",
        "",
        "echo addDays(5);        // 6",
        "echo addDays(\"5\");      // TypeError: must be of type int, string given",
        "echo addDays(5.0);      // TypeError (float -> int ruxsat yo'q)",
        "",
        "function ratio(float $x): float { return $x / 2; }",
        "echo ratio(5);          // 2.5: int -> float ruxsat etilgan"
      ],
      "note": "strict_types qo'shilmasa `addDays(\"5\")` ham `6` qaytaradi."
    },
    {
      "title": "Request'dan kelgan qiymat",
      "lang": "php",
      "code": [
        "<?php",
        "declare(strict_types=1);",
        "",
        "final class Paginator",
        "{",
        "    public function __construct(private int $perPage) {}",
        "}",
        "",
        "$perPage = $_GET['per_page'] ?? '15';   // doim string!",
        "",
        "// new Paginator($perPage);             // TypeError",
        "new Paginator((int) $perPage);          // aniq o'girish",
        "new Paginator(filter_var($perPage, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'max_range' => 100]]) ?: 15);"
      ],
      "note": "Kiritma har doim `string`: strict rejimda uni validatsiya qilib, aniq o'girishingiz kerak."
    },
    {
      "title": "Return va argument",
      "lang": "php",
      "code": [
        "// a.php",
        "<?php",
        "declare(strict_types=1);",
        "function toInt(string $s): int { return $s; }    // return tekshiriladi: TypeError (string, int emas)",
        "",
        "// b.php (strict emas)",
        "require 'a.php';",
        "toInt(5);       // argument yumshoq: int -> string. Lekin return a.php qoidasi bo'yicha"
      ]
    },
    {
      "title": "Rector bilan ommaviy qo'shish",
      "lang": "bash",
      "code": [
        "# rector.php: ->withRules([DeclareStrictTypesRector::class])",
        "vendor/bin/rector process app --dry-run",
        "vendor/bin/phpunit"
      ]
    }
  ],
  "pitfalls": [
    "Direktiva faqat **shu faylga** tegadi: strict fayldan chaqirilgan har qanday funksiya argumentlari qat'iy tekshiriladi, strict bo'lmagan fayldan chaqirilsa esa yumshoq. Shuning uchun har faylga alohida yozish kerak.",
    "`declare(strict_types=1)` fayldagi birinchi ifoda bo'lmasa, fatal xato: `strict_types declaration must be the very first statement`.",
    "Strict rejim `==` solishtirishni o'zgartirmaydi; u faqat tip tekshiruvi (argument, return, property) uchun.",
    "PHP ichki funksiyasi (`array_map`, `usort`) sizning callback'ingizni chaqirganda argumentlar har doim yumshoq rejimda o'giriladi, chunki chaqiruvchi ichki kod. Callback ichida o'z tipingizni alohida tekshiring.",
    "Strict rejim return uchun funksiya e'lon qilingan faylga bog'liq: argument va return qoidalari turli fayllardan bo'lishi mumkin.",
    "Eloquent atributlari va PDO natijalari qiymatni satr qilib berishi mumkin: strict kodda `TypeError`. `$casts` ishlating.",
    "`declare(strict_types=1)` dan oldin hatto bo'sh qator ham bo'lishi mumkin emas (HTML tashqarisida)."
  ]
});
