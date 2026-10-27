/* Chuqur dars: 1.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.10", {
  "lesson": [
    "### Namespace nima uchun",
    "Namespace nomlar to'qnashuvini oldini oladi va klasslarni mantiqiy guruhlaydi: `App\\Services\\Payment\\StripeGateway`. Fayl boshida `namespace App\\Models;` e'lon qilinadi, boshqa joydan `use App\\Models\\User;` bilan chaqiriladi.",
    "",
    "### Nomlarni hal qilish",
    "Qualified, unqualified va fully qualified (`\\Foo\\Bar`) nomlar. Namespace ichida global klasslar (`Exception`) uchun `\\Exception` yoki `use Exception;` kerak; global funksiyalar (`strlen`) esa avtomatik topiladi (fallback).",
    "",
    "### use operatori",
    "`use Foo\\Bar as Baz;`, guruhlab: `use App\\Models\\{User, Post};`, funksiya/konstanta: `use function App\\helper;`. `use` faqat nom aliasi: klassni ulamaydi.",
    "",
    "### Autoloading",
    "`spl_autoload_register` klass topilmaganda chaqiriladigan funksiyani qo'shadi. Composer buni standartlashtirgan:",
    "- **PSR-4**: namespace prefiks → papka (`\"App\\\\\": \"app/\"`), `App\\Models\\User` → `app/Models/User.php`. Eng keng qo'llaniladi.",
    "- **classmap**: papka skanerlanadi, namespace shart emas.",
    "- **files**: har so'rovda yuklanadigan fayllar (helperlar).",
    "",
    "### Production",
    "`composer install --no-dev --optimize-autoloader` (yoki `-o`/`--classmap-authoritative`) classmap'ni oldindan yaratadi: fayl tizimini qidirish yo'qoladi. `dump-autoload` yangi klass qo'shilganda (classmap rejimida) kerak.",
    "",
    "### Xatolar",
    "`Class \"X\" not found` — odatda `use` yetishmaydi, nom/fayl nomi mos emas (registr: Linux fayl tizimi harfga sezgir!), yoki `composer dump-autoload` kerak.",
    "",
    "### Namespace tafsiloti",
    "- Namespace e'loni faylning birinchi statement'i (`declare` dan keyin); bitta faylda bir nechta namespace mumkin, lekin tavsiya qilinmaydi.",
    "- Nomlar uch xil: **unqualified** (`Foo`), **qualified** (`Sub\\Foo`), **fully qualified** (`\\App\\Sub\\Foo`).",
    "- `namespace\\Foo` — joriy namespace'ga nisbatan.",
    "- `use` faqat fayl boshida (yoki namespace ichida); trait'ni klass ichida `use` bilan ulash boshqa narsa (1.12).",
    "- Funksiya va konstantalar uchun alohida `use function`, `use const`. Global funksiyaga fallback bor (`strlen`), klasslarga yo'q.",
    "- `::class` konstantasi fully-qualified nomni qaytaradi: `User::class` → `'App\\Models\\User'`; kompilyatsiya vaqtida hal qilinadi, klass mavjudligi shart emas.",
    "- Dinamik nomlar: `$class = 'App\\\\Models\\\\User'; new $class;` (satrda `\\` ikkilanadi).",
    "",
    "### PSR-4 qoidalari",
    "`\"Vendor\\\\Package\\\\\": \"src/\"` → `Vendor\\Package\\Sub\\Cls` → `src/Sub/Cls.php`. Qoidalar: fayl nomi klass nomi (registr!), bitta fayl — bitta klass, namespace bo'limlari papkalarga mos. Bir nechta prefiks va papka: `\"App\\\\\": [\"app/\", \"lib/\"]`.",
    "",
    "### Composer autoload ichkarida",
    "`vendor/autoload.php` → `ComposerAutoloaderInit...` → `spl_autoload_register` qiladi. Klass kerak bo'lganda: avval classmap (hash lookup), keyin PSR-4 prefiks bo'yicha fayl tizimida qidiradi (`file_exists`). `--optimize-autoloader` PSR-4 klasslarni classmap ga o'tkazadi; `--classmap-authoritative` fayl tizimiga umuman qaramaydi; `--apcu-autoloader` topilganlarni APCu da keshlaydi.",
    "",
    "### Autoload turlari",
    "- **psr-4**, **psr-0** (eski), **classmap**, **files** (har so'rovda).",
    "- `autoload-dev` — faqat dev/test.",
    "- `exclude-from-classmap`, `composer dump-autoload --no-dev`.",
    "- Laravel `bootstrap/cache/packages.php` va `services.php` — provider va package discovery kesh fayllari (`php artisan optimize`).",
    "",
    "### Xatolarni topish",
    "- `Class \"X\" not found`: namespace/`use`, fayl nomi registri, `composer dump-autoload`, `composer.json` dagi prefiks, `vendor` yangilanmaganligi.",
    "- `Cannot declare class X, because the name is already in use`: bitta nom ikki joyda.",
    "- Aylanma (circular) bog'liqlik: autoload buni hal qiladi (klass kerak bo'lganda yuklanadi), lekin merosda (`extends` ikkalasi) muammo bo'ladi.",
    "- `composer dump-autoload -vvv` va `composer show -s` diagnostika uchun.",
    "",
    "### Strukturani loyihalash",
    "Bounded context bo'yicha: `App\\Billing\\Invoice`, `App\\Billing\\Actions\\CreateInvoice`; yoki texnik qatlam bo'yicha `App\\Models`, `App\\Http`. Namespace chuqurligi 4–5 darajadan oshmasin; nomlar to'qnashmasligi uchun `as` alias (`use Illuminate\\Http\\Request as HttpRequest`)."
  ],
  "examples": [
    {
      "title": "Namespace va use",
      "lang": "php",
      "code": [
        "<?php",
        "declare(strict_types=1);",
        "",
        "namespace App\\Services;",
        "",
        "use App\\Models\\{User, Post};",
        "use InvalidArgumentException;",
        "use function App\\Support\\slugify;",
        "",
        "final class Publisher",
        "{",
        "    public function publish(Post $p): void",
        "    {",
        "        if ($p->title === '') throw new InvalidArgumentException();",
        "        $p->slug = slugify($p->title);",
        "    }",
        "}"
      ]
    },
    {
      "title": "composer.json autoload",
      "lang": "json",
      "code": [
        "{",
        "  \"autoload\": {",
        "    \"psr-4\": { \"App\\\\\": \"app/\" },",
        "    \"files\":  [ \"app/helpers.php\" ]",
        "  },",
        "  \"autoload-dev\": { \"psr-4\": { \"Tests\\\\\": \"tests/\" } }",
        "}"
      ],
      "note": "`\\\\` JSON ichida bitta `\\` ni bildiradi."
    },
    {
      "title": "Production buyruqlari",
      "lang": "bash",
      "code": [
        "composer install --no-dev --optimize-autoloader",
        "composer dump-autoload -o",
        "composer dump-autoload --classmap-authoritative   # fayl tizimiga umuman qaramaydi"
      ]
    },
    {
      "title": "::class va dinamik",
      "lang": "php",
      "code": [
        "use App\\Models\\User;",
        "echo User::class;                        // App\\Models\\User  (klass yuklanmaydi)",
        "$cls = 'App\\\\Models\\\\' . ucfirst($name);",
        "if (class_exists($cls)) { $o = new $cls; } // class_exists autoload'ni ishga tushiradi"
      ]
    },
    {
      "title": "composer.json autoload-dev va optimize",
      "lang": "json",
      "code": [
        "{",
        "  \"autoload\":     { \"psr-4\": { \"App\\\\\": \"app/\", \"Database\\\\Seeders\\\\\": \"database/seeders/\" } },",
        "  \"autoload-dev\": { \"psr-4\": { \"Tests\\\\\": \"tests/\" } },",
        "  \"config\": { \"optimize-autoloader\": true, \"classmap-authoritative\": false }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Windows'da ishlab chiqib Linux'ga qo'yilganda `User.php` va `user.php` farqi sabab `Class not found` chiqadi: fayl nomi klass nomi bilan aynan mos bo'lsin.",
    "`use` ichida klassni ulamaydi, faqat nom beradi. Fayl PSR-4 bo'yicha joylashmagan bo'lsa topilmaydi.",
    "`--classmap-authoritative` bilan runtime'da yaratilgan yangi fayl topilmaydi; deployda `dump-autoload` ni unutmang.",
    "`files` autoload har so'rovda yuklanadi: ko'p fayl qo'shmang.",
    "Fayl nomi klass nomiga registr bilan mos bo'lmasa Windows'da ishlab, Linux'da `Class not found` beradi.",
    "`class_exists($x)` autoload'ni chaqiradi; `class_exists($x, false)` chaqirmaydi.",
    "`classmap-authoritative` bilan runtime'da yaratilgan klasslar (generatsiya, cache) topilmaydi.",
    "Bitta faylda ikkita klass PSR-4 ni buzadi: ikkinchisi autoload qilinmaydi."
  ]
});
