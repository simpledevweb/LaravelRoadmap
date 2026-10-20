/* 07 · Composer
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 7,
  slug: "composer",
  title: "Composer",
  group: "php-laravel",
  description: "Composer — PHP'ning dependency manager'i va autoloader generatori. Har bir Laravel loyihasi unga tayanadi. Senior darajada versiya cheklovlarini to'g'ri yozish, lock faylni boshqarish, konfliktlarni hal qilish, xavfsizlik auditi va takrorlanadigan (reproducible) build'larni ta'minlash talab qilinadi.",
  subskills: [
    {
      id: "7.1",
      title: "`composer.json`",
      description: [
        "`composer.json` — loyiha manifesti: nom, tavsif, `type`, `license`, PHP va paket talablari (`require`, `require-dev`), `autoload`/`autoload-dev`, `scripts`, `config` (masalan `sort-packages`, `optimize-autoloader`, `platform`), `repositories`, `extra` (Laravel auto-discovery), `minimum-stability`.",
        "",
        "`config.platform.php` lokal PHP versiyasidan qat'i nazar, dependency'larni production PHP versiyasiga moslab hal qiladi — \"lokalda ishladi, serverda yo'q\" muammosining oldini oladi.",
        "",
        "```json",
        "{",
        "    \"require\": { \"php\": \"^8.3\", \"laravel/framework\": \"^12.0\" },",
        "    \"config\": { \"sort-packages\": true, \"platform\": { \"php\": \"8.3.0\" } }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Foundation",
      practicalTask: "Loyiha `composer.json` ini tahlil qiling: platform PHP, sort-packages va keraksiz paketlarni tartibga keltiring.",
      acceptanceCriteria: [
        "Asosiy bo'limlarning vazifasini ayta oladi",
        "`config.platform` nima uchun kerakligini tushuntira oladi"
      ],
      prerequisites: []
    },
    {
      id: "7.2",
      title: "`composer.lock`",
      description: [
        "Lock fayl barcha (shu jumladan tranzitiv) paketlarning **aniq** versiyalari va hash'larini saqlaydi. `composer install` lock bo'yicha o'rnatadi — hamma muhitda bir xil kod; `composer update` cheklovlar doirasida yangi versiyalarni topib, lock'ni yangilaydi.",
        "",
        "Ilovalarda lock git'ga **qo'shiladi**; kutubxona (paket)larda odatda qo'shilmaydi. Lock'dagi merge konfliktlarini qo'lda tahrirlamang — bir tomonni olib, `composer update <paket>` ni qayta bajaring. `content-hash` `composer.json` va lock mosligini tekshiradi.",
        "",
        "```bash",
        "composer install            # CI/production: faqat lock bo'yicha",
        "composer update vendor/pkg  # faqat bitta paketni yangilash",
        "composer validate --strict",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Lock fayldagi merge konfliktini to'g'ri usulda hal qiling va `composer validate` bilan tekshiring.",
      acceptanceCriteria: [
        "`install` va `update` farqini aniq biladi",
        "Ilova va kutubxonada lock bilan ishlash farqini tushuntira oladi"
      ],
      prerequisites: [
        "7.1"
      ]
    },
    {
      id: "7.3",
      title: "Dependency Management",
      description: [
        "Dependency boshqaruvi — kerakli paketlarni tanlash, versiyalarini cheklash va ularni xavfsiz yangilab borish. Har bir yangi dependency — kod, xavfsizlik va yangilash yuki.",
        "",
        "Paket tanlash mezonlari: faol qo'llab-quvvatlash, yuklab olishlar soni, ochiq issue'lar, litsenziya, PHP/Laravel mosligi, transitive dependency'lar soni. `composer why vendor/pkg` — paket nega o'rnatilganini, `composer depends`/`prohibits` — bog'liqliklarni ko'rsatadi. `composer outdated -D` eskirganlarni topadi.",
        "",
        "```bash",
        "composer why guzzlehttp/guzzle",
        "composer outdated --direct --major-only",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Loyihadagi barcha to'g'ridan-to'g'ri dependency'larni audit qiling: ishlatilmaganlarini olib tashlang.",
      acceptanceCriteria: [
        "Paket tanlashda mezonlarga asoslanadi",
        "`why`, `outdated` buyruqlarini ishlata oladi"
      ],
      prerequisites: [
        "7.1"
      ]
    },
    {
      id: "7.4",
      title: "Semantic Versioning",
      description: [
        "SemVer: `MAJOR.MINOR.PATCH`. MAJOR — orqaga mos kelmaydigan o'zgarish, MINOR — mos keluvchi yangi funksiya, PATCH — mos keluvchi tuzatish. `0.x` versiyalarda istalgan o'zgarish buzuvchi bo'lishi mumkin. Pre-release: `1.0.0-beta.1`.",
        "",
        "SemVer — kelishuv, kafolat emas: ba'zi paketlar uni buzadi. Shu sabab lock fayl va testlar zarur. O'z paketingizda ommaviy API'ni aniq belgilang (`@internal`), deprecation'ni MINOR'da e'lon qilib, MAJOR'da olib tashlang.",
        "",
        "```text",
        "2.3.1 → 2.3.2  tuzatish",
        "2.3.1 → 2.4.0  yangi imkoniyat",
        "2.3.1 → 3.0.0  breaking change",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "O'z ichki paketingiz uchun versiyalash siyosati va CHANGELOG formatini yozing.",
      acceptanceCriteria: [
        "Har bir versiya qismining ma'nosini biladi",
        "`0.x` versiyalarning o'ziga xosligini tushuntira oladi"
      ],
      prerequisites: []
    },
    {
      id: "7.5",
      title: "Version Constraints",
      description: [
        "Cheklov operatorlari: `^1.2` (>=1.2.0 <2.0.0, eng keng tarqalgan), `~1.2` (>=1.2 <2.0), `~1.2.3` (>=1.2.3 <1.3.0), `1.2.*`, `>=1.2 <1.5`, `||` (yoki), aniq versiya `1.2.3`. `^0.3` → `>=0.3.0 <0.4.0`.",
        "",
        "Ilovalar uchun `^` odatda to'g'ri tanlov; aniq versiyani \"qotirish\" yangilanishlarni bloklaydi (bu lock faylning vazifasi). Kutubxonalarda imkon qadar keng diapazon (`^10.0 || ^11.0 || ^12.0`) foydalanuvchilarga moslikni beradi. `dev-main` va `*` production'da xavfli.",
        "",
        "```json",
        "\"require\": {",
        "    \"guzzlehttp/guzzle\": \"^7.8\",",
        "    \"illuminate/support\": \"^11.0 || ^12.0\"",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "5 ta cheklovning (`^`, `~`, `*`, `||`, `0.x`) qaysi versiyalarni qamrab olishini jadvalda yozing.",
      acceptanceCriteria: [
        "`^` va `~` farqini misol bilan ko'rsata oladi",
        "Kutubxona va ilova uchun cheklov strategiyasi farqini biladi"
      ],
      prerequisites: [
        "7.4"
      ]
    },
    {
      id: "7.6",
      title: "PSR-4 Autoloading",
      description: [
        "PSR-4: namespace prefiksi katalogga bog'lanadi, qolgan namespace qismlari papkalarga, class nomi fayl nomiga mos keladi: `App\\Http\\Controllers\\UserController` → `app/Http/Controllers/UserController.php`. Katta-kichik harf muhim (Linux).",
        "",
        "Boshqa autoload turlari: `classmap` (skanerlash), `files` (har doim yuklanadigan helper fayllar — ehtiyotkorlik bilan). Production uchun `composer dump-autoload -o` (classmap'ga aylantiradi) yoki `--classmap-authoritative` (fayl tizimiga murojaat qilmaydi).",
        "",
        "```json",
        "\"autoload\": {",
        "    \"psr-4\": { \"App\\\\\": \"app/\", \"Database\\\\Factories\\\\\": \"database/factories/\" },",
        "    \"files\": [\"app/helpers.php\"]",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Yangi modul namespace'ini PSR-4 ga qo'shing va authoritative classmap bilan ishlashini tekshiring.",
      acceptanceCriteria: [
        "Namespace → fayl yo'li xaritasini tushuntira oladi",
        "Optimallashtirilgan autoloader turlarini biladi"
      ],
      prerequisites: [
        "1.10"
      ]
    },
    {
      id: "7.7",
      title: "Package Installation va Removal",
      description: [
        "`composer require vendor/pkg` — cheklovni `composer.json` ga qo'shib o'rnatadi; `--dev` — dev dependency. `composer remove vendor/pkg` — olib tashlaydi va keraksiz bo'lib qolgan tranzitiv paketlarni ham. `-W` (`--with-all-dependencies`) — bog'liq paketlarni ham yangilashga ruxsat.",
        "",
        "Laravel paketlari ko'pincha auto-discovery orqali ulanadi; olib tashlashda config, migratsiya va publish qilingan fayllarni ham tozalash kerak. O'rnatishdan keyin `composer audit` va paket post-install skriptlarini tekshiring.",
        "",
        "```bash",
        "composer require spatie/laravel-permission",
        "composer require --dev laravel/telescope",
        "composer remove barryvdh/laravel-debugbar",
        "```"
      ],
      priority: "important",
      level: "Foundation",
      practicalTask: "Bitta paketni o'rnating va to'liq olib tashlang (config, migratsiya, provider qoldiqlarisiz).",
      acceptanceCriteria: [
        "`require` qanday cheklov yozishini biladi",
        "Paketni olib tashlaganda qoldiqlarni tozalaydi"
      ],
      prerequisites: [
        "7.1"
      ]
    },
    {
      id: "7.8",
      title: "`require` va `require-dev`",
      description: [
        "`require` — production'da kerak bo'lgan paketlar; `require-dev` — faqat ishlab chiqishda: testlar (PHPUnit, Pest), statik tahlil (PHPStan), debug vositalari (Telescope, Debugbar), Faker.",
        "",
        "Production'da `composer install --no-dev` dev paketlarni o'rnatmaydi — bu tezroq, kichikroq va xavfsizroq. Ehtiyot: production kod dev paketga murojaat qilsa (masalan, `Faker` seeder'da), deploy'da xato chiqadi. Dev provider'larni shartli ro'yxatga olish kerak.",
        "",
        "```php",
        "if ($this->app->environment('local') && class_exists(TelescopeServiceProvider::class)) {",
        "    $this->app->register(TelescopeServiceProvider::class);",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Production kodida dev paketga yashirin bog'liqlik bormi — `--no-dev` build bilan tekshiring.",
      acceptanceCriteria: [
        "Paketni to'g'ri bo'limga joylaydi",
        "Dev-only provider'larni shartli yuklaydi"
      ],
      prerequisites: [
        "7.1"
      ]
    },
    {
      id: "7.9",
      title: "Composer Scripts",
      description: [
        "`scripts` bo'limi buyruqlarni nomlab saqlaydi va hayot davri hodisalariga ulaydi: `post-autoload-dump` (Laravel `package:discover`), `post-install-cmd`, `post-update-cmd`, `post-create-project-cmd`. Custom skriptlar: `composer test`, `composer lint`, `composer analyse`.",
        "",
        "Skriptlar jamoa uchun yagona kirish nuqtasi bo'ladi (CI va lokal bir xil buyruq). `@php`, `@composer` va boshqa skriptga havola (`@lint`) mavjud. `--no-scripts` xavfsizlik uchun ishonchsiz paketlarda foydali.",
        "",
        "```json",
        "\"scripts\": {",
        "    \"lint\": \"pint --test\",",
        "    \"analyse\": \"phpstan analyse\",",
        "    \"test\": \"@php artisan test --parallel\",",
        "    \"check\": [\"@lint\", \"@analyse\", \"@test\"]",
        "}",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "`composer check` skriptini yarating va CI'da faqat shu buyruqni chaqiring.",
      acceptanceCriteria: [
        "Hayot davri skriptlarini biladi",
        "Skriptlar orqali lokal va CI buyruqlarini birlashtiradi"
      ],
      prerequisites: [
        "7.1"
      ]
    },
    {
      id: "7.10",
      title: "Private Packages",
      description: [
        "Ichki (yopiq) paketlar uchun usullar: `repositories` da `vcs` (git repo), `path` (monorepo/lokal ishlab chiqish, symlink), Private Packagist, Satis (o'z hosting'ingiz), GitLab/GitHub Package Registry.",
        "",
        "Autentifikatsiya `auth.json` yoki `COMPOSER_AUTH` env orqali (git'ga qo'shilmaydi); CI'da deploy token. Ko'p vcs repository'lar `composer update` ni sekinlashtiradi — registry tezroq.",
        "",
        "```json",
        "\"repositories\": [",
        "    { \"type\": \"vcs\", \"url\": \"git@gitlab.example.uz:platform/billing-sdk.git\" },",
        "    { \"type\": \"path\", \"url\": \"../packages/*\", \"options\": { \"symlink\": true } }",
        "]",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "GitLab Package Registry orqali ichki paketni ulang va CI'da token bilan o'rnating.",
      acceptanceCriteria: [
        "`vcs`, `path` va registry farqini biladi",
        "Kirish ma'lumotlarini repozitoriyga tushirmaydi"
      ],
      prerequisites: [
        "7.1",
        "35.11"
      ]
    },
    {
      id: "7.11",
      title: "Packagist",
      description: [
        "Packagist.org — Composer'ning standart ommaviy registry'si. Paket u yerga git repo orqali ro'yxatga olinadi, versiyalar tag'lardan olinadi; webhook avtomatik yangilaydi.",
        "",
        "Paketni baholash: yuklab olishlar statistikasi, \"dependents\", oxirgi reliz sanasi, \"abandoned\" belgisi (va tavsiya etilgan o'rnini bosuvchi), xavfsizlik e'lonlari. Supply chain xavfi: typosquatting, egasi o'zgargan paketlar — yangi dependency'ni qo'shishdan oldin tekshiring.",
        "",
        "```bash",
        "composer show -a vendor/package   # mavjud versiyalar",
        "composer show --outdated --direct",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "3 ta muqobil paketni Packagist ma'lumotlari asosida solishtirib, birini asosli tanlang.",
      acceptanceCriteria: [
        "Paket ishonchliligini Packagist ko'rsatkichlari bilan baholaydi",
        "Abandoned paketlarni aniqlab almashtiradi"
      ],
      prerequisites: [
        "7.3"
      ]
    },
    {
      id: "7.12",
      title: "Dependency Conflict Resolution",
      description: [
        "Konflikt — ikki paket bitta dependency'ning mos kelmaydigan versiyalarini talab qilganda. Composer xato xabarini o'qish ko'nikmasi muhim: qaysi paket qaysi cheklovni qo'yayotganini ko'rsatadi.",
        "",
        "Vositalar: `composer why-not vendor/pkg 3.0` (nima to'sqinlik qilyapti), `composer prohibits`, `-W` bilan bog'liqlarni ham yangilash, vaqtincha inline alias (`\"dev-fix as 2.1.0\"`), fork + vcs repository (oxirgi chora). Konflikt ko'pincha eskirgan paketdan kelib chiqadi — uni yangilash yoki almashtirish uzoq muddatli yechim.",
        "",
        "```bash",
        "composer why-not laravel/framework 12.0",
        "composer update laravel/framework -W",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Sun'iy konflikt yarating (eski paket + yangi Laravel) va uni `why-not` tahlili bilan hal qiling.",
      acceptanceCriteria: [
        "Composer xato xabarini o'qib, sababini topa oladi",
        "Fork'ni oxirgi chora sifatida ishlatadi"
      ],
      prerequisites: [
        "7.5"
      ]
    },
    {
      id: "7.13",
      title: "Security Audit",
      description: [
        "`composer audit` o'rnatilgan paketlarni ma'lum zaifliklar (GitHub Security Advisories, FriendsOfPHP) bazasiga qarshi tekshiradi; 2.7+ da `composer update` ham ogohlantiradi. `roave/security-advisories` paketi zaif versiyalarni o'rnatishni umuman taqiqlaydi.",
        "",
        "Amaliyot: CI'da har bir PR va kunlik rejali audit, Dependabot/Renovate avtomatik PR'lari, kritik zaifliklar uchun SLA (masalan, 48 soat), `abandoned` paketlarni kuzatish.",
        "",
        "```bash",
        "composer audit --format=json",
        "composer require --dev roave/security-advisories:dev-latest",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "CI pipeline'ga `composer audit` qo'shing va zaiflik topilganda build'ni muvaffaqiyatsiz qiling.",
      acceptanceCriteria: [
        "Audit natijasini o'qib, yangilash yoki vaqtinchalik choralarni tanlaydi",
        "Avtomatik dependency yangilash vositalarini sozlay oladi"
      ],
      prerequisites: [
        "51.20"
      ]
    },
    {
      id: "7.14",
      title: "Reproducible Builds",
      description: [
        "Takrorlanadigan build — bir xil commit har doim bir xil artefaktni beradi. Composer uchun: lock faylni commit qilish, `composer install` (update emas), `config.platform` bilan PHP versiyasini qotirish, `--no-dev --optimize-autoloader --classmap-authoritative`, Composer versiyasini qotirish.",
        "",
        "Docker build'da `composer.json`/`composer.lock` ni alohida qatlamda nusxalash cache'ni samarali qiladi. Artefakt (image) bir marta build qilinib, barcha muhitlarga o'sha artefakt deploy qilinadi.",
        "",
        "```dockerfile",
        "COPY composer.json composer.lock ./",
        "RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist",
        "COPY . .",
        "RUN composer dump-autoload --optimize --classmap-authoritative",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Dockerfile'da composer qatlamini cache'ga mos qilib qayta yozing va build vaqtini solishtiring.",
      acceptanceCriteria: [
        "Build va deploy'ni ajratadi (build once, deploy many)",
        "Lock va platform sozlamalari takrorlanuvchanlikka qanday ta'sir qilishini biladi"
      ],
      prerequisites: [
        "7.2",
        "36.13"
      ]
    },
    {
      id: "7.15",
      title: "Production Dependencies (`--no-dev`)",
      description: [
        "Production o'rnatish: `composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist`. Natija: dev paketlar yo'q (kamroq hujum yuzasi, kichik image), optimallashtirilgan classmap (tezroq autoload).",
        "",
        "Tekshirish kerak: kod dev paketga bog'liq emas, `APP_ENV=production`, `php artisan config:cache route:cache view:cache event:cache` deploy jarayonida bajariladi. `--no-scripts` ishlatilsa, `package:discover` ni qo'lda chaqirish kerak.",
        "",
        "```bash",
        "composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist",
        "php artisan optimize",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Production deploy skriptini yozing: `--no-dev` o'rnatish va Laravel optimize buyruqlari bilan.",
      acceptanceCriteria: [
        "Production o'rnatish flag'larining har birini tushuntira oladi",
        "Dev dependency'ga yashirin bog'liqlikni aniqlaydi"
      ],
      prerequisites: [
        "7.8"
      ]
    },
    {
      id: "7.16",
      title: "Dependency Update Strategy",
      description: [
        "Yangilashni kechiktirish — qarzni oshirish: keyinchalik bir necha major versiyadan sakrash ancha qimmat. Strategiya: patch/minor yangilanishlarni muntazam (haftalik) va avtomatik (Renovate/Dependabot + CI), major'larni rejalashtirilgan alohida PR'larda, CHANGELOG va upgrade guide'larni o'qib.",
        "",
        "Kuchli test qamrovi xavfsiz yangilashning asosi. Kritik xavfsizlik yangilanishlari navbatdan tashqari. Bir PR'da ko'p major yangilanish — regressiya manbasini topishni qiyinlashtiradi.",
        "",
        "```json",
        "// renovate.json",
        "{ \"extends\": [\"config:recommended\"], \"packageRules\": [",
        "  { \"matchUpdateTypes\": [\"patch\", \"minor\"], \"automerge\": true }",
        "]}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Renovate yoki Dependabot'ni sozlang: minor/patch avtomatik, major — qo'lda review bilan.",
      acceptanceCriteria: [
        "Yangilash chastotasi va xavf o'rtasidagi muvozanatni asoslaydi",
        "Major yangilanishlarni alohida rejalashtiradi"
      ],
      prerequisites: [
        "7.13",
        "7.5"
      ]
    }
  ]
});
