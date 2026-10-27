/* Laravel Skill Map — Intervyu savol-javoblari bazasi
 * Har bir savolda daraja, soha, subskill bog'liqligi, professional javob va intervyu maslahati mavjud.
 */
window.INTERVIEW_QUESTIONS = [
  // --- PHP ---
  {
    id: "iq-1",
    title: "PHP'da == va === ning farqi nima? Type Juggling qanday xavfsizlik muammolariga olib kelishi mumkin?",
    level: "junior",
    category: "php",
    categoryLabel: "PHP tili",
    skillSlug: "php",
    subskillId: "1.4",
    answer: [
      "`==` (loose comparison) tiplarni tenglashtirish (type coercion / juggling) orqali solishtiradi, `===` (strict comparison) esa ham tipni, ham qiymatni tekshiradi.",
      "",
      "**PHP 7 va undan oldingi xavf:** PHP 7 da `'0e123' == '0e456'` (ikkalasi ham float 0 deb o'qilgan) yoki `'admin' == 0` ifodasi `true` qaytargan. Agar dasturchi parolni yoki tokenni hash bilan solishtirganda `==` ishlatsa, autentifikatsiyani aylanib o'tish (magic hash vulnerability) mumkin bo'lgan.",
      "",
      "**PHP 8 dagi o'zgarish:** PHP 8 dan boshlab son va satr solishtirilganda satr songa emas, faqat qat'iy sonli satr bo'lsa songa o'giriladi, aks holda son satrga o'giriladi. Shunda `0 == 'admin'` endi `false` qaytaradi. Ammo ob'ektlar va massivlarda `==` kutilmagan xatolarga sabab bo'lishi mumkin. Doim `===` yoki `hash_equals()` ishlatish shart.",
      "",
      "```php",
      "// PHP 7 da true, PHP 8 da false:",
      "var_dump(0 == 'salom'); // false (PHP 8)",
      "",
      "// Xavfsiz xesh tekshiruvi (Timing attack va type juggling'dan himoyalangan):",
      "hash_equals($knownHash, $userProvidedHash);",
      "```"
    ],
    tip: "Intervyuda faqat 'bittasi tipni tekshiradi, bittasi yo'q' deb to'xtab qolmang. PHP 8 dagi o'zgarishni va 'Magic Hash / Timing Attack' xavfini aytsangiz, sizni Junior emas, ancha chuqur biladigan mutaxassis sifatida baholashadi."
  },
  {
    id: "iq-2",
    title: "Late Static Binding (self:: vs static::) nima va u qachon ishlatiladi?",
    level: "junior",
    category: "php",
    categoryLabel: "PHP tili",
    skillSlug: "php",
    subskillId: "1.14",
    answer: [
      "`self::` kompilyatsiya vaqtida (compile-time) qaysi class ichida yozilgan bo'lsa, o'sha classga bog'lanadi. `static::` esa runtime'da chaqirilgan voris (child) classga bog'lanadi — bu **Late Static Binding** deyiladi.",
      "",
      "Eloquent Model'larida `static::create()` yoki `static::query()` chaqirilganda, u bazaviy `Model` emas, aynan chaqirgan `User` yoki `Order` modelining instansiyasini hosil qilishi aynan `static::` tufaylidir.",
      "",
      "```php",
      "class Model {",
      "    public static function create(): static {",
      "        return new static(); // Late Static Binding",
      "    }",
      "}",
      "class User extends Model {}",
      "",
      "// User::create() -> User obyektini qaytaradi (new self() bo'lsa Model qaytardi)",
      "```"
    ],
    tip: "Singleton yoki Factory pattern yozayotganda `new self()` vorislikda ishlamasligini va `new static()` kerakligini ta'kidlang."
  },
  {
    id: "iq-3",
    title: "Generatorlar (yield) qanday ishlaydi va ular xotirani qanday tejaydi?",
    level: "middle",
    category: "php",
    categoryLabel: "PHP tili",
    skillSlug: "php",
    subskillId: "1.17",
    answer: [
      "Generator — butun massivni xotiraga yuklamasdan, elementlarni navbati bilan generatsiya qiluvchi to'xtatiladigan funksiya. U `Iterator` interfeysini qisqa va oson yozish imkonini beradi.",
      "",
      "Agar siz 1 million qatorli CSV faylni massivga yuklasangiz (`file_get_contents` yoki `file()`), u yuzlab megabayt RAM oladi va OOM (Out Of Memory) beradi. Generator esa har bir qatorni `yield` bilan bittalab chiqaradi — xotira sarfi har doim O(1) (bir necha kilobayt) bo'lib qoladi.",
      "",
      "```php",
      "function getLargeRows($file): Generator {",
      "    $handle = fopen($file, 'r');",
      "    while (($line = fgetcsv($handle)) !== false) {",
      "        yield $line; // Har chaqiruvda bitta qator qaytaradi va to'xtaydi",
      "    }",
      "    fclose($handle);",
      "}",
      "// Eloquent'dagi Order::cursor() generator asosida ishlaydi!",
      "```"
    ],
    tip: "Laravel'dagi `lazy()` va `cursor()` metodlari orqasida aynan PHP Generator'lari turganini bog'lab tushuntiring."
  },
  {
    id: "iq-4",
    title: "PHP 8.4 dagi Property Hooks va Asymmetric Visibility nima uchun kerak?",
    level: "middle",
    category: "php",
    categoryLabel: "PHP tili",
    skillSlug: "php",
    subskillId: "1.34",
    answer: [
      "**Property Hooks**: PHP 8.4 da getter va setter metodlarining o'rnini bosuvchi qisqa sintaksis. Alohida `getName()` yoki `setName()` yozish o'rniga property ichida mantiq yoziladi.",
      "",
      "**Asymmetric Visibility**: Obyekt xossasini o'qish uchun `public`, lekin o'zgartirish uchun `private` qilish imkoniyati: `public private(set) string $status;`. Bu DTO va Entity'larni toza va xavfsiz (immutable) qilishda ortiqcha boilerplate kodlarni yo'qotadi.",
      "",
      "```php",
      "final class UserProfile {",
      "    public private(set) string $slug; // Tashqaridan faqat o'qiladi",
      "",
      "    public string $name {",
      "        set => {",
      "            $this->name = trim($value);",
      "            $this->slug = strtolower(str_replace(' ', '-', $this->name));",
      "        }",
      "    }",
      "}",
      "```"
    ],
    tip: "C# va Kotlin'dagi properties kabi zamonaviy tillarning imkoniyati endi PHP'ga kirganini aytish orqali zamonaviy tendensiyalardan xabardorligingizni ko'rsatasiz."
  },

  // --- Laravel ---
  {
    id: "iq-5",
    title: "Laravel Request Lifecycle qanday kechadi? public/index.php dan controller'gacha nimalar sodir bo'ladi?",
    level: "junior",
    category: "laravel",
    categoryLabel: "Laravel",
    skillSlug: "laravel",
    subskillId: "2.1",
    answer: [
      "1. Web server (Nginx) barcha so'rovlarni `public/index.php` ga yo'naltiradi.",
      "2. Composer autoloader yuklanadi va `bootstrap/app.php` chaqirilib, Service Container (`Application`) yaratiladi.",
      "3. HTTP Kernel (yoki yangi Application builder) bootstrapper'larni ishga tushiradi: `.env`, config fayllar, facade'lar va provider'lar yuklanadi. Avval barcha providerlarning `register()`, so'ng `boot()` metodi ishlaydi.",
      "4. Request Global Middleware trubasi (Pipeline) orqali o'tadi.",
      "5. Router so'rov URL'i bo'yicha mos route'ni topadi, Route Middleware'larni ishga tushiradi.",
      "6. Controller yoki Closure ishga tushadi, Response hosil bo'ladi.",
      "7. Response yana middleware'lar orqali mijozga qaytariladi va `terminate()` (terminable middleware) chaqiriladi.",
      "",
      "```php",
      "// Laravel 11 bootstrap oqimi",
      "return Application::configure(basePath: dirname(__DIR__))",
      "    ->withRouting(web: __DIR__.'/../routes/web.php', api: __DIR__.'/../routes/api.php')",
      "    ->withMiddleware(function (Middleware $middleware) { ... })",
      "    ->create();",
      "```"
    ],
    tip: "Intervyuda `register()` va `boot()` farqini aniq ayting: `register`da faqat containerga bog'lash kerak, boshqa servicelarni chaqirish mumkin emas; `boot`da esa barcha providerlar ro'yxatdan o'tib bo'lgan bo'ladi."
  },
  {
    id: "iq-6",
    title: "Laravel Service Container'da bind(), singleton() va scoped() o'rtasidagi farq nima?",
    level: "junior",
    category: "laravel",
    categoryLabel: "Laravel",
    skillSlug: "laravel",
    subskillId: "2.6",
    answer: [
      "- `bind()`: Har safar container'dan obyekt so'ralganda (`app(Service::class)`), yangi instansiya yaratiladi.",
      "- `singleton()`: Birinchi chaqiruvda yaratiladi va butun dastur (jarayon) hayoti davomida xotirada bitta nusxada saqlanadi.",
      "- `scoped()`: Oddiy PHP-FPM'da `singleton` bilan bir xil ishlaydi, lekin **Laravel Octane** yoki uzoq ishlaydigan daemon'larda har bir yangi HTTP so'rov uchun yangidan tozalanib, so'rov doirasida yagona bo'lib turadi.",
      "",
      "```php",
      "$this->app->bind(Translatable::class, GoogleTranslator::class); // har doim new",
      "$this->app->singleton(Settings::class, fn () => new Settings()); // 1 marta new",
      "$this->app->scoped(RequestContext::class); // Octane'da har requestda alohida",
      "```"
    ],
    tip: "Agar `scoped()` ni Octane kontekstida tushuntirib bersangiz, intervyuer sizni yuqori yuklamali ilovalar arxitekturasini tushunishingizga ishonch hosil qiladi."
  },
  {
    id: "iq-7",
    title: "Session Fixation nima va Laravel'da login paytida nima uchun session()->regenerate() chaqiriladi?",
    level: "junior",
    category: "laravel",
    categoryLabel: "Laravel",
    skillSlug: "laravel",
    subskillId: "2.32",
    answer: [
      "**Session Fixation** — tajovuzkor qurbonga ma'lum bir sessiya ID'sini (masalan, fishing havola yoki ochiq Wi-Fi orqali) oldindan berib qo'yadi. Agar foydalanuvchi tizimga kirganida sessiya ID o'zgarmasa, tajovuzkor o'sha oldindan bilgan sessiya ID bilan qurbonning akkauntiga to'liq kirib oladi.",
      "",
      "**Himoya:** Foydalanuvchi parol kiritib muvaffaqiyatli autentifikatsiyadan o'tishi bilanoq, uning sessiya ID'si yangi tasodifiy satrga almashtirilishi shart. Laravel'dagi `$request->session()->regenerate()` aynan shu vazifani bajaradi.",
      "",
      "```php",
      "if (Auth::attempt($credentials)) {",
      "    $request->session()->regenerate(); // Tajovuzkorning eski sessiya ID'sini bekor qiladi",
      "    return redirect()->intended('dashboard');",
      "}",
      "```"
    ],
    tip: "Logout qilinganda `$request->session()->invalidate()` va `$request->session()->regenerateToken()` (CSRF tokenini ham yangilash) kerakligini eslatib o'ting."
  },
  {
    id: "iq-8",
    title: "Nima uchun Event Listener'larda ShouldDispatchAfterCommit ishlatiladi?",
    level: "middle",
    category: "laravel",
    categoryLabel: "Laravel",
    skillSlug: "laravel",
    subskillId: "2.20",
    answer: [
      "Standart holatda `Event::dispatch(new OrderPaid($order))` chaqirilganda, hodisa darhol navbatga (Queue) tushadi. Agar bu hodisa `DB::transaction()` ichida bo'lsa va worker navbatdagi xabarni juda tez (tranzaksiya bazaga `COMMIT` bo'lishidan oldin) olib ishlasa, worker bazada hali u buyurtmani topa olmaydi (`ModelNotFoundException`)!",
      "",
      "`ShouldDispatchAfterCommit` interfeysi hodisani faqat va faqat tashqi ma'lumotlar bazasi tranzaksiyasi muvaffaqiyatli yakunlangachgina (commit bo'lgach) navbatga yuborishni kafolatlaydi.",
      "",
      "```php",
      "final class OrderCreated implements ShouldDispatchAfterCommit",
      "{",
      "    use Dispatchable, SerializesModels;",
      "    public function __construct(public Order $order) {}",
      "}",
      "```"
    ],
    tip: "Bu savol ko'pincha 'Nimaga mening queue jobim bazada yangi yozuvni topa olmadi?' degan real bug debugging shaklida beriladi."
  },

  // --- Database & Eloquent ---
  {
    id: "iq-9",
    title: "N+1 muammosi qanday yuzaga keladi? uni aniqlash va butun loyiha bo'ylab qat'iy taqiqlash yo'li qanday?",
    level: "junior",
    category: "database",
    categoryLabel: "Ma'lumotlar bazasi",
    skillSlug: "eloquent-orm",
    subskillId: "13.5",
    answer: [
      "N+1 muammosi — asosiy ro'yxatni olish uchun 1 ta so'rov, so'ng har bir elementning bog'langan relation'ini olish uchun qo'shimcha N ta so'rov yuborilishidir (jami N+1 ta so'rov). Masalan: 100 ta post muallifini tsiklda `$post->user->name` deb o'qisa, 101 ta DB so'rovi ketadi.",
      "",
      "**Yechim:** Eager loading — `Post::with('user')->get();` orqali atigi 2 ta so'rov bilan hal qilinadi (`SELECT * FROM posts` va `SELECT * FROM users WHERE id IN (...)`).",
      "",
      "**Qat'iy taqiqlash:** Laravelda `Model::preventLazyLoading(!app()->isProduction())` sozlamasi orqali local va test muhitida agar biron joyda N+1 sodir bo'lsa, exception otib, productionga chiqib ketishini 100% to'xtatish mumkin.",
      "",
      "```php",
      "// AppServiceProvider::boot()",
      "Model::preventLazyLoading(! $this->app->isProduction());",
      "Model::preventSilentlyDiscardingAttributes(! $this->app->isProduction());",
      "```"
    ],
    tip: "Intervyuda `Model::preventLazyLoading`ni tilga olishingiz sizning kod sifati va framework imkoniyatlaridan to'liq foydalanishingizni ko'rsatadi."
  },
  {
    id: "iq-10",
    title: "Optimistic Locking va Pessimistic Locking o'rtasidagi farq nima? Qaysi holatda qaysi biri tanlanadi?",
    level: "middle",
    category: "database",
    categoryLabel: "Ma'lumotlar bazasi",
    skillSlug: "database-transactions",
    subskillId: "17.6",
    answer: [
      "Ikkala usul ham **Race Condition** va **Lost Update** (bir vaqtda ikki kishi bir xil ma'lumotni o'zgartirishi) muammosini hal qiladi.",
      "",
      "**Pessimistic Locking (`lockForUpdate` / `SELECT ... FOR UPDATE`):**",
      "- Yondashuv: 'Mojaro bo'lishi ehtimoli juda yuqori'. Qator o'qilishi bilanoq tranzaksiya tugaguncha qulflanadi, boshqa hech kim uni o'zgartira olmaydi.",
      "- Qachon ishlatiladi: Bank tranzaksiyalari, to'lovlar, chipta xaridi (bir vaqtda bitta o'rin sotilishi kerak).",
      "- Kamchiligi: Boshqa so'rovlar kutib turadi, throughput kamayadi, deadlock xavfi bor.",
      "",
      "**Optimistic Locking (versiya / timestamp ustuni):**",
      "- Yondashuv: 'Mojaro kamdan-kam bo'ladi'. Hech qanday DB qulfi qo'yilmaydi. Har bir jadvalda `version` ustuni bo'ladi. Update qilishda `WHERE id = ? AND version = ?` tekshiriladi. Agar kimdir o'zgartirib qo'ygan bo'lsa, xato otiladi.",
      "- Qachon ishlatiladi: Ko'p o'qiladigan, lekin kam yoziladigan tizimlar (CRM kontaktlari, maqolalarni tahrirlash).",
      "",
      "```php",
      "// Pessimistic Lock misoli",
      "DB::transaction(function () use ($fromId, $toId, $amount) {",
      "    $from = Account::where('id', $fromId)->lockForUpdate()->first();",
      "    $from->decrement('balance', $amount);",
      "});",
      "```"
    ],
    tip: "Senior dasturchi sifatida DB darajasidagi `lockForUpdate` bilan Redis darajasidagi taqsimlangan qulflar (`Cache::lock`) farqini ham aytib o'ting."
  },
  {
    id: "iq-11",
    title: "Katta ma'lumotlar bazasida Composite Index yaratishda ustunlar tartibi (Leftmost Prefix Rule) qanday ishlaydi?",
    level: "senior",
    category: "database",
    categoryLabel: "Ma'lumotlar bazasi",
    skillSlug: "database-indexing",
    subskillId: "55.1",
    answer: [
      "Composite Index — bir nechta ustunlardan tashkil topgan yagona indeks (masalan, `INDEX (status, created_at, user_id)`).",
      "",
      "**Leftmost Prefix Rule (Chapdan boshlash qoidasi):** B-Tree daraxti indeks ustunlarini chapdan o'ngga qarab saralaydi. Shuning uchun indeks faqat chapdagi ustunlar WHERE shartida qatnashgandagina to'liq ishlaydi.",
      "",
      "Agar indeks `(A, B, C)` bo'lsa:",
      "- `WHERE A = 1` -> Indeks ishlaydi (A)",
      "- `WHERE A = 1 AND B = 2` -> Indeks to'liq ishlaydi (A, B)",
      "- `WHERE A = 1 AND B = 2 AND C = 3` -> Indeks to'liq ishlaydi (A, B, C)",
      "- `WHERE B = 2 AND C = 3` -> **Indeks ISHLAMAYDI!** (A qatnashmagan)",
      "- `WHERE A = 1 AND C = 3` -> Faqat A bo'yicha ishlaydi, C indeksdan foydalanmaydi.",
      "",
      "**Qoida:** Eng yuqori selektivlikka (kardinality) ega bo'lgan yoki doim tenglik (`=`) bilan qidiriladigan ustun eng chapda turishi kerak. Diapazon (`>`, `<`) qidiruvi bo'lgan ustun esa eng oxirida turishi shart."
    ],
    tip: "Intervyuda `EXPLAIN` buyrug'i natijasidagi `key_len` ustuni orqali composite indexning necha baytidan foydalanilganini tekshirishni aytsangiz, bu a'lo javob bo'ladi."
  },
  {
    id: "iq-12",
    title: "Zero-Downtime Database Migration nima va Expand & Contract pattern qanday amalga oshiriladi?",
    level: "senior",
    category: "database",
    categoryLabel: "Ma'lumotlar bazasi",
    skillSlug: "database-optimization",
    subskillId: "15.20",
    answer: [
      "Production'da millionlab qatorlik jadvalda `ALTER TABLE` qilish butun jadvalni qulflaydi va xizmat to'xtab qoladi (downtime). Zero-downtime migratsiya xizmatni 1 soniya ham to'xtatmasdan DB strukturasini o'zgartirishdir.",
      "",
      "**Expand & Contract Pattern (3 bosqichli o'zgartirish):**",
      "Faraz qiling, `users` jadvalidagi `phone` ustunini `phone_number` deb o'zgartirish kerak:",
      "1. **Expand (Kengaytirish):** Yangi `phone_number` ustuni qo'shiladi (eski ustun o'chirilmaydi). Kod ikkala ustunga ham yozadigan qilib yangilanadi.",
      "2. **Migrate (Ma'lumotni ko'chirish):** Fonda ishlovchi artisan/job buyrug'i orqali eski qatorlardagi `phone` qiymatlari `phone_number` ga ko'chiriladi.",
      "3. **Contract (Toraytirish):** Kod faqat yangi `phone_number` dan o'qiydigan qilinadi. Ishonch hosil qilingach, keyingi deployda eski `phone` ustuni xavfsiz o'chirib tashlanadi.",
      "",
      "Shuningdek, MySQL Online DDL (`ALGORITHM=INPLACE, LOCK=NONE`) yoki `gh-ost` kabi vositalar ishlatiladi."
    ],
    tip: "Katta loyihalarda hech qachon birdaniga ustun nomi o'zgartirilmasligi yoki o'chirilmasligini tushuntiring, chunki rolling deploy vaqtida eski kod ham, yangi kod ham bir vaqtda ishlab turadi."
  },

  // --- API & Architecture ---
  {
    id: "iq-13",
    title: "Idempotency nima? To'lov tizimlari va webhooklarda idempotency qanday ta'minlanadi?",
    level: "senior",
    category: "architecture",
    categoryLabel: "Arxitektura",
    skillSlug: "rest-api",
    subskillId: "18.21",
    answer: [
      "**Idempotency (Bir xillik)** — bir xil operatsiyani bir necha marta chaqirganda ham tizim holati faqat bir marta o'zgarishi va bir xil natija qaytishi kafolati. HTTP metodlaridan `GET`, `PUT`, `DELETE` tabiatan idempotent, lekin `POST` idempotent emas.",
      "",
      "**To'lovlarda Idempotency-Key mexanizmi:**",
      "Mijoz so'rov yuborayotganda `Idempotency-Key: uuid-v4` sarlavhasini beradi.",
      "1. Server Redis'da atomik lock oladi: `Cache::lock('idemp:' . $key, 10)`.",
      "2. Agar bu kalit bo'yicha allaqachon bajarilgan javob keshda bo'lsa, kod qayta ishlamaydi, keshdagi to'lov natijasi qaytariladi.",
      "3. Agar so'rov ayni daqiqada bajarilayotgan bo'lsa, ikkinchi parallel so'rovga `409 Conflict` beriladi.",
      "4. Bajarib bo'lingach, to'lov natijasi o'sha kalit bilan 24 soatga keshlanadi.",
      "",
      "Bu tarmoq uzilib, mijoz 'To'lash'ni 2 marta bosganda pulni 2 marta yechilishini 100% to'xtatadi."
    ],
    tip: "Stripe va Payme API arxitekturasi aynan shunday ishlashini misol qilib keltiring."
  },
  {
    id: "iq-14",
    title: "Laravel Octane qanday ishlaydi va State Leak (holat sizishi) qanday xavf tug'diradi?",
    level: "senior",
    category: "architecture",
    categoryLabel: "Arxitektura",
    skillSlug: "application-performance-optimization",
    subskillId: "53.21",
    answer: [
      "An'anaviy PHP-FPM har bir so'rovda butun Laravel frameworkini noldan parse qilib xotiraga yuklaydi va so'rov tugagach hamma narsa tozalanadi. **Laravel Octane** (FrankenPHP/Swoole) esa ilovani operativ xotirada (RAM) doimiy ushlab turadi — so'rovlar orasida bootstrap qayta bajarilmaydi, natijada javob vaqti bir necha millisekundgacha tushadi.",
      "",
      "**State Leak xavfi:**",
      "Ilova xotiradan o'chmagani sababli, Singleton xizmatlar yoki static o'zgaruvchilarda saqlangan ma'lumotlar keyingi foydalanuvchiga o'tib ketishi mumkin. Masalan, birinchi so'rovda `Auth::user()` static xususiyatda saqlansa, keyingi kirgan mutlaqo boshqa odam o'sha foydalanuvchi ma'lumotlarini ko'rib qolishi mumkin!",
      "",
      "**Yechim:**",
      "- Service provider'larda singleton o'rniga `scoped()` ishlatish.",
      "- Static o'zgaruvchilarda so'rovga oid ma'lumotlarni saqlamaslik.",
      "- `Octane::prepareApplicationForNextOperation()` orqali har requestdan keyin container'ni tozalash."
    ],
    tip: "Octane ishlatishdan oldin ilovaning barcha kutubxonalari stateless (holatsiz) ekanligiga ishonch hosil qilish shartligini ta'kidlang."
  },
  {
    id: "iq-15",
    title: "Multi-Tenancy arxitekturasida Single Database va Multi Database modellarining farqi nima?",
    level: "senior",
    category: "architecture",
    categoryLabel: "Arxitektura",
    skillSlug: "clean-architecture",
    subskillId: "64.18",
    answer: [
      "Multi-Tenancy — bitta dastur orqali ko'plab mustaqil korxonalarga (ijarachilarga) ularning ma'lumotlarini aralashtirmay xizmat ko'rsatishdir.",
      "",
      "**1. Single Database (Shared Schema):**",
      "- Har bir jadvalda `tenant_id` ustuni bo'ladi. Eloquent Global Scope (`TenantScope`) barcha so'rovlarga avtomatik `WHERE tenant_id = ?` qo'shadi.",
      "- Afzalligi: Xarajat juda past, bitta DB, yangi migratsiya yurgizish oson.",
      "- Kamchiligi: Agar dasturchi `withoutGlobalScopes()` ni xato ishlatsa yoki xom SQL yozsa, bir kompaniyaning ma'lumoti boshqasiga ko'rinib qolishi mumkin (Data Leakage xavfi).",
      "",
      "**2. Multi-Database (Separate Database per Tenant):**",
      "- Har bir mijoz uchun alohida DB yaratiladi. Middleware so'rovdagi subdomenga qarab DB connectionni dinamik ulaydi (`config(['database.connections.tenant.database' => $dbName])`).",
      "- Afzalligi: 100% ma'lumotlar xavfsizligi, bitta mijoz bazasini alohida zaxiralash oson.",
      "- Kamchiligi: Minglab mijoz bo'lsa server resursi (connection pool) ko'p ketadi va migratsiyalarni yurgizish uzoq vaqt oladi."
    ],
    tip: "Bank va tibbiyot kabi nozik sohalarda Multi-DB, arzon SaaS CRM'larda esa Single DB tanlanishini misol qiling."
  },

  // --- Queues & Async ---
  {
    id: "iq-16",
    title: "Queue Workerlarda At-Least-Once Delivery nima va Job Idempotency nima uchun shart?",
    level: "middle",
    category: "async",
    categoryLabel: "Navbatlar",
    skillSlug: "queues-and-background-jobs",
    subskillId: "46.14",
    answer: [
      "Ko'pchilik navbat tizimlari (Redis, SQS, RabbitMQ) **At-Least-Once Delivery** (kamida bir marta yetkazish) kafolatini beradi. Bu shuni anglatadiki, tarmoq xatosi yoki worker qulashi (crash) sababli bitta xabar 2 yoki undan ortiq marta bajarilishi mumkin.",
      "",
      "Agar sizning jobingiz pul yechish yoki email jo'natish bo'lsa va u qayta ishlansa, mijozdan 2 marta pul yechilishi mumkin. Shuning uchun har bir Job **idempotent** bo'lishi shart.",
      "",
      "**Yechim:**",
      "- Job boshida tranzaksiya holatini tekshirish: `if ($order->is_paid) return;`.",
      "- Yoki unikal lock ishlatish (`ShouldBeUnique` interfeysi).",
      "- DB tranzaksiyasi ichida `UPDATE orders SET status = 'paid' WHERE id = 1 AND status = 'pending'` kabi atomik shart qo'yish."
    ],
    tip: "Intervyuda 'Navbatlar hech qachon xabarni yo'qotmaydi, lekin takrorlanishi mumkin' degan qoidani ifodalang."
  },
  {
    id: "iq-17",
    title: "RabbitMQ va Apache Kafka o'rtasidagi asosiy farqlar nima? Qachon qaysi biri tanlanadi?",
    level: "senior",
    category: "async",
    categoryLabel: "Navbatlar",
    skillSlug: "event-driven-architecture",
    subskillId: "48.17",
    answer: [
      "**RabbitMQ (Smart Broker, Dumb Consumer):**",
      "- An'anaviy xabarlar brokiri. Xabar navbatga keladi, iste'molchi uni o'qib tasdiqlagach (`ack`), xabar navbatdan butunlay o'chiriladi.",
      "- Murakkab marshrutlash (Direct, Topic, Fanout, Headers exchange).",
      "- Qachon tanlanadi: Oddiy fon vazifalari, buyurtmani qayta ishlash, email yuborish, kechiktirilgan (delayed) vazifalar.",
      "",
      "**Apache Kafka (Dumb Broker, Smart Consumer):**",
      "- Taqsimlangan hodisalar jurnali (Distributed Commit Log). Xabarlar iste'molchi o'qisa ham o'chirilmaydi, diskda saqlanadi.",
      "- Har bir iste'molchi guruh o'zining `offset` (o'qilgan joy) ko'rsatkichini boshqaradi. Tarixiy ma'lumotlarni qayta o'qish (Event Replay) mumkin.",
      "- Juda yuqori o'tkazuvchanlik (millionlab event/sec).",
      "- Qachon tanlanadi: Event Streaming, foydalanuvchi harakatlari analitikasi, moliyaviy audit jurnallari, IoT."
    ],
    tip: "RabbitMQ xabarni yetkazishga e'tibor qaratadi, Kafka esa hodisalar tarixini oqim sifatida saqlashga e'tibor qaratadi."
  },

  // --- Testing & Security ---
  {
    id: "iq-18",
    title: "SQL Injection va Mass Assignment zaifliklarining mexanizmi nima va Laravel ulardan qanday himoyalaydi?",
    level: "junior",
    category: "security",
    categoryLabel: "Xavfsizlik",
    skillSlug: "web-application-security",
    subskillId: "51.1",
    answer: [
      "**SQL Injection (SQLi):**",
      "- Foydalanuvchi kiritgan ma'lumot to'g'ridan-to'g'ri SQL so'roviga birlashtirib (string concatenation) yuborilganda, tajovuzkor so'rov mantiqini o'zgartira oladi.",
      "- Himoya: Laravel Eloquent va Query Builder standart holatda PDO **Prepared Statements** (parametrlarni alohida uzatish) ishlatadi. Xavf faqat `DB::raw(\"WHERE email = '{$email}'\")` kabi ehtiyotsiz xom SQL yozilgandagina yuzaga keladi.",
      "",
      "**Mass Assignment (Ommaviy biriktirish):**",
      "- `User::create($request->all())` qilinganda, foydalanuvchi HTTP body orqali `is_admin=1` yoki `balance=999999` yuborsa va modelda himoya bo'lmasa, u administratorga aylanib qoladi.",
      "- Himoya: Eloquent'da `$fillable` (ruxsat berilgan ustunlar oq ro'yxati) ko'rsatish yoki doim qat'iy `$request->validated()` bilan Form Request ishlatish."
    ],
    tip: "Doim `$guarded = []` qilish yomon amaliyot ekanligini va `$fillable` yoki `validated()` ishlatish shartligini ayting."
  },
  {
    id: "iq-19",
    title: "Pest Architecture Testing nima va u jamoada qanday muammolarni hal qiladi?",
    level: "middle",
    category: "testing",
    categoryLabel: "Testlash",
    skillSlug: "pest",
    subskillId: "26.17",
    answer: [
      "Pest Architecture Testing (`arch()`) — loyihaning arxitektura va kodlash qoidalariga rioya qilinayotganini avtomatlashtirilgan testlar orqali tekshirish vositasi.",
      "",
      "Katta jamoalarda junior yoki yangi kelgan dasturchilar bilmasdan qoidalarni buzishi mumkin (masalan, Controller ichida to'g'ridan-to'g'ri xom SQL chaqirish, yoki Model ichida Session/Request ishlatish, yoki `dd()` kodda qolib ketishi). Manual Code Review bularni ba'zan o'tkazib yuboradi.",
      "",
      "**Pest Arch buni CI'da avtomatik ushlaydi:**",
      "```php",
      "test('controllers do not call DB directly') {",
      "    expect('App\\Http\\Controllers')",
      "        ->not->toUse('Illuminate\\Support\\Facades\\DB');",
      "};",
      "",
      "test('debugging statements are removed') {",
      "    expect(['dd', 'dump', 'ray'])->not->toBeUsed();",
      "};",
      "",
      "test('models extend BaseModel') {",
      "    expect('App\\Models')->toExtend('Illuminate\\Database\\Eloquent\\Model');",
      "};",
      "```"
    ],
    tip: "CI pipeline'da arch testlar bir necha millisekundda ishlab, butun kod bazaning gigiyenasini ta'minlashini misol qiling."
  },
  {
    id: "iq-20",
    title: "Tech Lead sifatida texnik qarzni (Technical Debt) qanday boshqarasiz va biznesga uni refactoring qilish zarurligini qanday tushuntirasiz?",
    level: "lead",
    category: "architecture",
    categoryLabel: "Liderlik va Arxitektura",
    skillSlug: "technical-leadership",
    subskillId: "84.1",
    answer: [
      "Texnik qarz — tezroq natija berish uchun vaqtinchalik olingan yomon yoki shoshilinch qarorlar. Moliyaviy qarz kabi, uning ham 'foizi' (interest) bor: texnik qarz ko'paygani sari har bir yangi funksiyani yozish sekinlashadi va xatolar ko'payadi.",
      "",
      "**Biznes bilan muloqot qilish strategiyasi:**",
      "1. Biznesga texnik atamalar bilan emas, **biznes metrikalari** bilan gapirish kerak: 'Kod yomon' deb emas, 'Ushbu modulni refactoring qilmasak, keyingi oy to'lov tizimiga yangi funksiya qo'shish 3 kun o'rniga 3 hafta vaqt oladi va downtime xavfi 40% oshadi'.",
      "2. **20% qoidasi:** Har bir sprintda umumiy vaqtning 15-20 foizini refactoring va texnik qarzni to'lashga ajratishni rejalashtirish.",
      "3. **Boy Scout Rule:** 'Lagerdan ketayotganingda, uni kelganingdagidan ko'ra tozaroq qoldir'. Har safar mavjud kodga tegilganda uni biroz yaxshilab ketish.",
      "4. Texnik qarzni Jira/Trello'da aniq vazifalar (Tech Debt backlog) shaklida baholab borish."
    ],
    tip: "Lead darajasida asosiy mahorat bu texnikani biznes maqsadlariga (daromad, tezlik, xavfni kamaytirish) bog'lay olishdir."
  },

  // --- Database Concurrency & Deadlocks ---
  {
    id: "iq-21",
    title: "MySQL InnoDB'da Deadlock nima sababdan yuzaga keladi, uni qanday aniqlaymiz va kod darajasida qanday oldini olamiz?",
    level: "senior",
    category: "database",
    categoryLabel: "Ma'lumotlar bazasi",
    skillSlug: "database-transactions",
    subskillId: "17.12",
    answer: [
      "**Deadlock** — ikki yoki undan ortiq tranzaksiyalar bir-biri qulflagan resurslarni kutib, cheksiz bloklanish holatiga tushishi.",
      "",
      "**Klassik stsenariy:**",
      "- 1-tranzaksiya: A qatorni qulflaydi, so'ng B qatorni qulflamoqchi bo'ladi.",
      "- 2-tranzaksiya: B qatorni qulflaydi, so'ng A qatorni qulflamoqchi bo'ladi.",
      "- Natija: Hech biri oldinga siljiy olmaydi. InnoDB deadlock'ni aniqlab, ulardan birini (arzonrog'ini) `Deadlock found when trying to get lock; try restarting transaction` xatosi bilan rollback qiladi.",
      "",
      "**Aniqlash:**",
      "MySQL konsolida `SHOW ENGINE INNODB STATUS;` buyrug'i berilsa, `LATEST DETECTED DEADLOCK` bo'limida qaysi SQL so'rovlar qaysi indeks qatorida to'qnashgani to'liq ko'rinadi.",
      "",
      "**Kod darajasidagi yechimlar:**",
      "1. **Qulflash tartibini unifikatsiya qilish:** Resurslarni doim bir xil tartibda (masalan, ID bo'yicha saralab) qulflash:",
      "```php",
      "// Noto'g'ri: $from, keyin $to (tartib tasodifiy bo'lishi mumkin)",
      "// To'g'ri: ID larni kichigidan kattasiga saralab lock qilish",
      "[$firstId, $secondId] = $fromId < $toId ? [$fromId, $toId] : [$toId, $fromId];",
      "DB::transaction(function () use ($firstId, $secondId) {",
      "    Account::where('id', $firstId)->lockForUpdate()->first();",
      "    Account::where('id', $secondId)->lockForUpdate()->first();",
      "});",
      "```",
      "2. **Laravel tranzaksiya qayta urinishi (Retry):** `DB::transaction(callback, attempts: 5)` — deadlock bo'lganda Laravel tranzaksiyani avtomatik 5 martagacha qayta bajaradi."
    ],
    tip: "Intervyuda resurslarni ID bo'yicha tartiblash (`sort by ID`) va Laravel'dagi `DB::transaction(..., 5)` ikkinchi argumentini aytib bersangiz, real production muammolarini yechganingiz darhol ko'rinadi."
  },

  // --- Redis & Caching ---
  {
    id: "iq-22",
    title: "Redis'da Cache Stampede (Dog-piling / Thundering Herd) muammosi nima va unga qarshi qanday kurashiladi?",
    level: "senior",
    category: "database",
    categoryLabel: "Kesh & Redis",
    skillSlug: "redis",
    subskillId: "12.6",
    answer: [
      "**Cache Stampede** — juda ko'p o'qiladigan kalitning (masalan, bosh sahifa, kurslar ro'yxati) keshdagi muddati (TTL) tugashi bilanoq, bir vaqtda kelgan yuzlab yoki minglab parallel so'rovlarning barchasi birdaniga asosiy ma'lumotlar bazasiga so'rov yuborishi.",
      "- Natija: Ma'lumotlar bazasida CPU 100% ga chiqadi, ulanishlar (connections pool) tugaydi va butun tizim qulaydi.",
      "",
      "**Yechimlar:**",
      "1. **Distributed Mutex Lock (`Cache::lock`):** Kesh tugaganda faqat birinchi so'rov bazadan ma'lumotni o'qib keshga yozadi, qolgan so'rovlar kutib turadi yoki eski keshni qaytaradi.",
      "```php",
      "$data = Cache::get('top_products');",
      "if (! $data) {",
      "    $lock = Cache::lock('lock:top_products', 10);",
      "    if ($lock->get()) {",
      "        $data = Product::calculateTop();",
      "        Cache::put('top_products', $data, 3600);",
      "        $lock->release();",
      "    } else {",
      "        // Lock ololmagan boshqa so'rovlar biroz kutib yana keshdan oladi",
      "        sleep(1);",
      "        $data = Cache::get('top_products');",
      "    }",
      "}",
      "```",
      "2. **Probabilistic Early Expiration (XFetch algoritmi):** TTL tugashidan biroz oldin, ehtimollik formulasiga ko'ra fon jarayonida kesh oldindan yangilab qo'yiladi.",
      "3. **Doimiy fonda yangilash (Cron / Queue):** Keshga hech qachon foydalanuvchi so'rovi paytida yozilmaydi, har 5 daqiqada Scheduler fon rejimida yangilab turadi."
    ],
    tip: "Katta yuklamali tizimlarda `Cache::remember()` o'rniga doimiy fonda ishlovchi Scheduled Task yoki `Cache::lock()` ishlatilishini tushuntiring."
  },
  {
    id: "iq-23",
    title: "Redis Eviction Policy'lar (noeviction, allkeys-lru, volatile-lru) qanday farqlanadi va maxmemory to'lganda nima yuz beradi?",
    level: "middle",
    category: "database",
    categoryLabel: "Kesh & Redis",
    skillSlug: "redis",
    subskillId: "12.3",
    answer: [
      "Redis RAM xotirada ishlaydi. `maxmemory` chegarasiga yetganda, Redis yangi ma'lumot yozish uchun eski kalitlarni qanday tozalashni **Eviction Policy** orqali hal qiladi.",
      "",
      "**Asosiy siyosatlar:**",
      "- `noeviction` (standart): Xotira to'lganda hech narsa o'chirilmaydi, yangi yozish so'rovlariga (`SET`, `HSET`) xato (`OOM command not allowed`) qaytaradi. O'qish so'rovlari ishlayveradi.",
      "- `allkeys-lru` (Least Recently Used): Barcha kalitlar ichidan eng kam va eng anchadan beri ishlatilmaganlarini o'chiradi. Sof kesh serverlari uchun eng yaxshi tanlov.",
      "- `volatile-lru`: Faqat muddati (TTL/expire) belgilangan kalitlar ichidan eng eskilarini o'chiradi. TTL belgilanmagan kalitlar saqlanadi.",
      "- `allkeys-lfu` (Least Frequently Used): Foydalanish chastotasi (necha marta chaqirilgani) eng kam bo'lgan kalitlarni o'chiradi.",
      "",
      "**Katta xato:** Agar loyihada Redis bir vaqtning o'zida ham Session, ham Cache uchun ishlatilsa va `allkeys-lru` yoqilgan bo'lsa, xotira to'lganda Redis faol foydalanuvchilarning sessiyalarini o'chirib yuboradi va odamlar tizimdan chiqib ketadi (logout bo'ladi)!",
      "",
      "**Tavsiya:** Session va Cache uchun alohida Redis instansiyalari yoki alohida portlar ishlatish shart."
    ],
    tip: "Intervyuda: 'Hech qachon Session va Cache'ni bitta Redis instansiyasida bitta allkeys-lru siyosati bilan aralashtirmang' degan jumlani aytsangiz, bu haqiqiy production tajribasini bildiradi."
  },

  // --- Docker & Infrastructure ---
  {
    id: "iq-24",
    title: "Multi-stage Dockerfile nima va Laravel loyihasida konteyner image hajmini qanday qilib 1GB dan 70MB gacha kamaytirish mumkin?",
    level: "middle",
    category: "devops",
    categoryLabel: "DevOps & Server",
    skillSlug: "docker",
    subskillId: "36.2",
    answer: [
      "**Multi-stage build** — bitta `Dockerfile` ichida bir nechta `FROM` bosqichlarini ishlatish. Dastlabki bosqichlarda og'ir kompilyatsiya vositalari (Node.js, npm, git, gcc, Composer) ishlatiladi, yakuniy production bosqichiga esa faqat tayyor natijaviy fayllar (`vendor`, `public/build`) ko'chiriladi.",
      "",
      "**Nima uchun kerak?**",
      "- Frontend assetlarni yig'ish uchun Node.js kerak, lekin PHP-FPM konteynerida Node.js mutlaqo keraksiz ballast.",
      "- Kichik image (Alpine asosida) tez yuklanadi (fast deployment), tarmoq trafigini tejaydi va xavfsizlik teshiklari (attack surface) ancha kam bo'ladi.",
      "",
      "```dockerfile",
      "# 1-bosqich: Frontend assetlarni yig'ish",
      "FROM node:20-alpine AS frontend",
      "WORKDIR /app",
      "COPY package*.json vite.config.js ./",
      "RUN npm ci",
      "COPY resources/ ./resources/",
      "RUN npm run build",
      "",
      "# 2-bosqich: Composer dependency",
      "FROM composer:2 AS vendor",
      "WORKDIR /app",
      "COPY composer*.json ./",
      "RUN composer install --no-dev --optimize-autoloader --no-scripts",
      "",
      "# Yakuniy bosqich: Minimal PHP-FPM",
      "FROM php:8.3-fpm-alpine",
      "WORKDIR /var/www/html",
      "RUN docker-php-ext-install pdo_mysql opcache",
      "COPY . .",
      "COPY --from=vendor /app/vendor ./vendor",
      "COPY --from=frontend /app/public/build ./public/build",
      "CMD [\"php-fpm\"]",
      "```"
    ],
    tip: "Multi-stage build faqat hajm tejamaydi, balki `dev-dependencies` va git tarixini prod konteynerga chiqarmaslik orqali xavfsizlikni ham oshiradi."
  },
  {
    id: "iq-25",
    title: "Docker konteynerlarida PHP-FPM yoki Queue Worker'larga signallarni to'g'ri uzatish (Graceful Shutdown) nega muhim?",
    level: "middle",
    category: "devops",
    categoryLabel: "DevOps & Server",
    skillSlug: "docker",
    subskillId: "36.2",
    answer: [
      "Deploy paytida yoki server o'chirilayotganda Docker konteynerga `SIGTERM` signali yuboradi. Agar jarayon ma'lum vaqt ichida to'xtamasa, Docker uni majburiy `SIGKILL` (-9) bilan o'ldiradi.",
      "",
      "**Muammo:**",
      "- Agar `Dockerfile`da `CMD php-fpm` (shell forma) yozilsa, PID 1 jarayon `/bin/sh` bo'lib qoladi va u `SIGTERM` signalini PHP ga uzatmaydi. Natijada so'rov ustida turgan mijoz 502 xato oladi yoki tranzaksiya yarimta bo'lib qoladi.",
      "- Worker to'lov yechayotgan vaqtda shartta o'lib qolsa, pul yechilib, buyurtma 'to'lanmagan' bo'lib qolishi mumkin.",
      "",
      "**Yechim:**",
      "1. Doim **Exec forma** ishlatish: `CMD [\"php-fpm\"]` yoki `ENTRYPOINT [\"php\", \"artisan\", \"queue:work\"]` — bunda jarayon PID 1 bo'lib ishga tushadi va signallarni to'g'ridan-to'g'ri qabul qiladi.",
      "2. Laravel Queue Worker'da `stop_when_empty` yoki signal handlerlar mavjud. Worker `SIGTERM` olganda darhol o'lmaydi, joriy vazifani oxirigacha bajarib, keyin tinchgina to'xtaydi (Graceful shutdown).",
      "3. `docker-compose.yml` da yetarli vaqt berish: `stop_grace_period: 60s` (uzoq joblar tugashi uchun)."
    ],
    tip: "Shell forma (`CMD php artisan`) va Exec forma (`CMD [\"php\", \"artisan\"]`) farqini tushuntirib bera oladigan dasturchilar kam uchraydi — bu Senior darajasidagi kuchli javob."
  },

  // --- Queues & Asynchronous Processing ---
  {
    id: "iq-26",
    title: "Laravel Navbatlarida (Queues) Idempotent Job tushunchasi nima va tarmoq xatolarida takroriy ijrodan qanday himoyalanamiz?",
    level: "middle",
    category: "async",
    categoryLabel: "Navbatlar & Async",
    skillSlug: "queues-and-background-jobs",
    subskillId: "46.1",
    answer: [
      "Barcha navbat tizimlari (Redis, RabbitMQ, SQS) **At-least-once delivery** (kamida bir marta yetkazish) kafolati bilan ishlaydi. Bu shuni anglatadiki, tarmoq xatosi yoki worker qulashi tufayli bitta job 2 yoki undan ko'p marta qayta ishlanishi (retry) mumkin.",
      "",
      "**Idempotentlik** — amal necha marta bajarilishidan qat'i nazar, yakuniy natija va tizim holati bir marta bajarilgandek bir xil bo'lib qolishi kafolati.",
      "",
      "**Noto'g'ri (Idempotent bo'lmagan) job:**",
      "```php",
      "// Har safar retry bo'lganda mijozdan yana pul yechiladi!",
      "public function handle() {",
      "    PaymentGateway::charge($this->order->amount);",
      "}",
      "```",
      "",
      "**To'g'ri (Idempotent) job:**",
      "```php",
      "public function handle() {",
      "    // 1. Holat tekshiruvi",
      "    if ($this->order->status === OrderStatus::PAID) {",
      "        return; // Allaqachon to'langan, takroriy ijro to'xtatiladi",
      "    }",
      "    // 2. Tashqi shlyuzga yagona Idempotency Key uzatish",
      "    PaymentGateway::charge([",
      "        'amount' => $this->order->amount,",
      "        'idempotency_key' => 'order_pay_' . $this->order->id,",
      "    ]);",
      "    $this->order->update(['status' => OrderStatus::PAID]);",
      "}",
      "```"
    ],
    tip: "Intervyuda: 'Barcha Queue Job'lar istalgan vaqt 2 marta ishga tushishi mumkin degan faraz bilan yozilishi shart' degan tamoyilni ta'kidlang."
  },
  {
    id: "iq-27",
    title: "Laravel Horizon'da auto-balancing strategiyasi qanday ishlaydi va Queue Worker'larda Memory Leak qanday oldini olinadi?",
    level: "senior",
    category: "async",
    categoryLabel: "Navbatlar & Async",
    skillSlug: "laravel-horizon",
    subskillId: "47.4",
    answer: [
      "**Auto-balancing (simple vs auto):**",
      "- `simple`: Barcha navbatlarga workerlar sonini teng taqsimlaydi (masalan, 10 ta worker 2 ta navbatga 5 tadan bo'linadi).",
      "- `auto`: Horizon har bir navbatdagi vazifalarning **kutish vaqti (wait time)** ni o'lchaydi. Agar `emails` navbati bo'sh turgan bo'lsa va `notifications` navbatida tiqilinch bo'lsa, Horizon workerlarni avtomatik ravishda `notifications` navbatiga o'tkazadi va yuklama pasayganda qaytaradi.",
      "",
      "**Memory Leak muammosi:**",
      "Oddiy HTTP so'rovida PHP har bir so'rov tugagach xotirani 100% tozalaydi. Lekin Queue Worker uzoq yashovchi CLI jarayon. Agar statik o'zgaruvchilar, Singleton servislar yoki xotirada qolib ketuvchi massivlar bo'lsa, worker xotirasi sekin-asta 128MB, 512MB, 2GB bo'lib kattalashib ketadi va server qulaydi.",
      "",
      "**Oldini olish choralari:**",
      "1. Workerlarni ma'lum miqdordagi jobdan keyin restart qilish: `php artisan queue:work --max-jobs=1000 --max-time=3600`.",
      "2. Xotira chegarasi bo'yicha avtomatik o'ldirish: `--memory=256`.",
      "3. Horizon konfiguratsiyasida supervisor sozlamalariga mos `maxProcesses` va `balanceMaxShift` parametrlarini o'rnatish."
    ],
    tip: "Katta loyihalarda `--max-jobs` yoki Horizon `auto` balanserisiz production navbatlarini boshqarib bo'lmasligini amaliy misol bilan keltiring."
  },

  // --- Authentication & Security ---
  {
    id: "iq-28",
    title: "Laravel Sanctum'da SPA (Cookie-based session) va Mobile (Bearer API Token) autentifikatsiyasi o'rtasidagi farq va xavfsizlik afzalligi nima?",
    level: "middle",
    category: "security",
    categoryLabel: "Xavfsizlik",
    skillSlug: "laravel-sanctum",
    subskillId: "23.1",
    answer: [
      "Laravel Sanctum bitta paketda ikki xil autentifikatsiya modelini taklif qiladi:",
      "",
      "**1. SPA Authentication (Birinchi tomon domenlar uchun):**",
      "- Qanday ishlaydi: Brauzer `/sanctum/csrf-cookie` orqali CSRF oladi, keyin `/login` ga so'rov yuboradi. Laravel odatiy shifrlangan HTTP session cookie qaytaradi (`HttpOnly`, `SameSite=Lax`, `Secure`).",
      "- Xavfsizlik: Token JavaScript xotirasida (localStorage) saqlanmaydi! Shuning uchun saytda XSS (Cross-Site Scripting) zaifligi bo'lsa ham, tajovuzkor sessiya kalitini o'g'irlay olmaydi.",
      "",
      "**2. API Token Authentication (Mobil ilovalar va 3-tomon integratsiyalar):**",
      "- Qanday ishlaydi: `$user->createToken('mobile-app')` orqali tasodifiy string (Bearer token) hosil bo'ladi. Token DB da SHA-256 xesh ko'rinishida saqlanadi. Har bir so'rovda `Authorization: Bearer <token>` sarlavhasida uzatiladi.",
      "- Xususiyati: Tokenlar `abilities` (huquqlar) ga ega bo'lishi mumkin (`['orders:create', 'profile:read']`). Har bir so'rovda DB dan token tekshiriladi.",
      "",
      "**Qoida:** Agar Vue/React/Next.js frontend va Laravel API bitta asosiy domenda bo'lsa (`app.site.uz` va `api.site.uz`), doim Cookie-based SPA rejimini tanlash eng xavfsiz yo'l hisoblanadi."
    ],
    tip: "Nima uchun tokenlarni brauzerning `localStorage`iga saqlash xavfli ekanligini (XSS orqali o'g'irlanishi) ta'kidlasangiz, xavfsizlik bo'yicha bilimingiz yuqori baholanadi."
  },
  {
    id: "iq-29",
    title: "Cross-Site Request Forgery (CSRF) hujumi qanday amalga oshiriladi va zamonaviy SameSite cookie atributi uni qanday to'xtatadi?",
    level: "junior",
    category: "security",
    categoryLabel: "Xavfsizlik",
    skillSlug: "web-application-security",
    subskillId: "51.7",
    answer: [
      "**CSRF mexanizmi:**",
      "Foydalanuvchi `bank.uz` tizimiga kirgan va sessiyasi faol. So'ng u tajovuzkorning `evil.com` saytiga kiradi. `evil.com` sahifasida yashirin forma bo'ladi:",
      "`<form action=\"https://bank.uz/transfer\" method=\"POST\"><input name=\"to\" value=\"hacker\"><input name=\"amount\" value=\"1000\"></form><script>form.submit()</script>`",
      "Brauzer `bank.uz` ga so'rov ketayotgani uchun foydalanuvchining cookie fayllarini avtomatik qo'shib yuboradi. Agar CSRF himoyasi bo'lmasa, bank buni foydalanuvchining o'zi amalga oshirdi deb hisoblaydi.",
      "",
      "**Himoya yo'llari:**",
      "1. **CSRF Token:** Har bir POST/PUT/DELETE so'rovda server tekshiradigan maxfiy tasodifiy token (`@csrf` yoki `X-XSRF-TOKEN`). Tajovuzkor boshqa domendan turib bu tokenni o'qiy olmaydi (Same-Origin Policy tufayli).",
      "2. **SameSite Cookie:**",
      "- `SameSite=Strict`: Boshqa saytdan kelgan hech qanday so'rovda cookie qo'shilmaydi.",
      "- `SameSite=Lax` (standart): Foydalanuvchi oddiy havola bosib o'tganda (GET) cookie yuboriladi, ammo uchinchi saytdan kelgan POST so'rovlarda cookie bloklanadi."
    ],
    tip: "Intervyuda: 'GET so'rovlar hech qachon ma'lumotlar bazasida o'zgarish (side-effect) qilmasligi shart' degan HTTP spetsifikatsiyasini eslatib o'ting."
  },

  // --- Domain-Driven Design & Architecture ---
  {
    id: "iq-30",
    title: "Domain-Driven Design (DDD) da Entity va Value Object o'rtasidagi farq nima? Koddagi aniq misollar bilan tushuntiring.",
    level: "middle",
    category: "architecture",
    categoryLabel: "Arxitektura",
    skillSlug: "domain-driven-design-ddd",
    subskillId: "63.4",
    answer: [
      "**1. Entity (Mavjudot):**",
      "- O'zining unikal identifikatori (`id` / `UUID`) ga ega.",
      "- Vaqt o'tishi bilan xossalari o'zgaradi, lekin uning shaxsi (identity) o'zgarmaydi. Masalan, `User` familiyasini o'zgartirsa ham, u o'sha-o'sha `User #42` bo'lib qolaveradi.",
      "- Ikkita Entity'ning barcha xossalari bir xil bo'lsa ham, ularning ID si har xil bo'lsa — ular boshqa-boshqa obyektlar.",
      "",
      "**2. Value Object (Qiymat Obyekti):**",
      "- Unikal ID ga ega emas. U faqat o'z ichidagi qiymatlar to'plami bilan ta'riflanadi.",
      "- **O'zgarmas (Immutable)**: Yaratilgandan so'ng qiymati o'zgarmaydi. Yangi qiymat kerak bo'lsa, yangi nusxa qaytariladi.",
      "- Ikkita Value Object'ning qiymatlari bir xil bo'lsa, ular mutlaqo teng hisoblanadi (masalan, ikkita 100 dollarlik kupyura bir-biriga teng).",
      "",
      "```php",
      "// Value Object misoli: Money",
      "final readonly class Money {",
      "    public function __construct(public int $amount, public string $currency) {",
      "        if ($amount < 0) throw new InvalidArgumentException('Manfiy bo\\'lishi mumkin emas');",
      "    }",
      "    public function add(Money $other): self {",
      "        if ($this->currency !== $other->currency) throw new CurrencyMismatchException();",
      "        return new self($this->amount + $other->amount, $this->currency);",
      "    }",
      "}",
      "",
      "// Entity misoli: Order (ID bor, holati o'zgaradi)",
      "class Order {",
      "    public function __construct(private OrderId $id, private Money $total) {}",
      "}",
      "```"
    ],
    tip: "Value Object'lar biznes validatsiyasini o'z ichiga oladi (Self-validating). Oddiy `int $price` yoki `string $email` o'rniga Value Object ishlatish tizimni 'Primitive Obsession' anti-patternidan qutqaradi."
  },
  {
    id: "iq-31",
    title: "DDD'da Aggregate va Aggregate Root tushunchasi nima va nima uchun to'g'ridan-to'g'ri bolalar Entity'sini o'zgartirish taqiqlanadi?",
    level: "senior",
    category: "architecture",
    categoryLabel: "Arxitektura",
    skillSlug: "domain-driven-design-ddd",
    subskillId: "63.6",
    answer: [
      "**Aggregate** — ma'lumotlar yaxlitligi va biznes qoidalarini (invariants) bitta tranzaksiya doirasida saqlash uchun birlashtirilgan Entity va Value Object'lar klasteri.",
      "",
      "**Aggregate Root** — ushbu klasterga kirishning yagona rasmiy darvozasi hisoblangan bosh Entity.",
      "",
      "**Nima uchun to'g'ridan-to'g'ri child entity'ni o'zgartirish taqiqlanadi?**",
      "Faraz qiling, bizda `Order` (Root) va uning ichida `OrderItem` lar bor. Biznes qoidasi: 'Buyurtmaning umumiy summasi 100 000 so'mdan kam bo'lishi mumkin emas va har bir element qo'shilganda umumiy narx qayta hisoblanishi kerak'.",
      "- Agar dasturchi to'g'ridan-to'g'ri `OrderItem::where('id', 5)->update(['quantity' => 0])` qilsa, buyurtmaning jami summasi eskirib qoladi va invariantlar buziladi.",
      "- **To'g'ri yo'l:** Barcha o'zgarishlar faqat Aggregate Root orqali amalga oshiriladi: `$order->removeItem($itemId)`. Aggregate Root qoidalarni tekshiradi, hisob-kitobni yangilaydi va faqat o'zi saqlanadi.",
      "",
      "```php",
      "$order = $this->orderRepository->findById($orderId);",
      "$order->addItem(new ProductId(12), quantity: 2); // Invariantlar Order ichida kafolatlanadi",
      "$this->orderRepository->save($order); // Butun aggregate birga saqlanadi",
      "```"
    ],
    tip: "Aggregate chegaralari imkon qadar kichik bo'lishi kerak. Bitta aggregate ichida faqat bitta tranzaksiyada o'zgarishi shart bo'lgan ma'lumotlargina jamlanadi."
  },
  {
    id: "iq-32",
    title: "Clean Architecture'da Dependency Rule (Karam/Piyoz qatlamlari) nima va nima uchun Domain qatlami Framework'ni bilmasligi kerak?",
    level: "senior",
    category: "architecture",
    categoryLabel: "Arxitektura",
    skillSlug: "clean-architecture",
    subskillId: "64.1",
    answer: [
      "**Dependency Rule (Bog'liqliklar qoidasi):**",
      "Arxitektura konsentrik doiralardan (qatlamlardan) iborat bo'lib, manba kodidagi barcha bog'liqliklar **faqat tashqaridan ichkariga** yo'nalishi shart:",
      "`Frameworks & Drivers (Web, DB, CLI)` → `Interface Adapters (Controllers, Repositories)` → `Use Cases (Application Services)` → `Entities (Domain)`.",
      "",
      "**Nima uchun Domain qatlami Framework'ni bilmasligi kerak?**",
      "1. **Biznes qoidalari o'zgarmasligi:** Laravel versiyasi 10 dan 11 ga o'zgarsa, yoki ORM Eloquent'dan boshqa narsaga almashtirilsa, bankdagi foiz hisoblash yoki buyurtma berish biznes mantiqiga biror qator ham tegilmasligi shart.",
      "2. **Tezkor Unit testlar:** Domain qatlamida framework, HTTP request yoki DB ulanishi bo'lmagani uchun minglab testlar 1 soniyada xotirada ishlab ketadi.",
      "3. **Inversion of Control:** Domain interfeysni (`PaymentGatewayInterface`) e'lon qiladi, tashqi Infrastructure qatlami esa uni amalga oshiradi (`StripePaymentGateway`)."
    ],
    tip: "Clean Architecture'ning maqsadi har qanday loyihada ortiqcha fayllar ko'paytirish emas, balki murakkab biznes mantiqni tashqi vositalardan himoya qilishdir."
  },

  // --- Database Indexing & Optimizations ---
  {
    id: "iq-33",
    title: "MySQL B-Tree indekslar qanday ishlaydi va nima uchun LIKE '%so'z' so'rovida indeksdan umuman foydalanilmaydi?",
    level: "junior",
    category: "database",
    categoryLabel: "Ma'lumotlar bazasi",
    skillSlug: "database-indexing",
    subskillId: "55.3",
    answer: [
      "**B-Tree (Balanced Tree) qanday ishlaydi:**",
      "B-Tree indeksi ma'lumotlarni saralangan tartibda (alfavit yoki raqam bo'yicha) saqlaydi. Qidiruv logarifmik vaqtda `O(log N)` amalga oshiriladi — xuddi qog'oz lug'atdan so'z qidirgandek.",
      "",
      "**Nega LIKE '%so'z' indeksdan foydalanmaydi?**",
      "- `LIKE 'Toshkent%'`: Qidiruv qaysi harfdan boshlanishi ma'lum ('T'). Indeks daraxti bo'ylab darhol 'T' bo'limiga boradi (Index Range Scan).",
      "- `LIKE '%kent'`: So'z nima bilan boshlanishi noma'lum! Qog'oz lug'atda oxiri 'kent' bilan tugaydigan so'zlarni topish uchun lug'atdagi barcha sahifalarni boshidan oxirigacha o'qib chiqishga to'g'ri keladi. MySQL ham aynan shunday qilib indeksni tashlab, butun jadvalni to'liq o'qiydi (**Full Table Scan**).",
      "",
      "**Yechimlar:**",
      "1. Agar matn ichidan qidiruv zarur bo'lsa: MySQL **FULLTEXT Index** (`MATCH(...) AGAINST(...)`).",
      "2. Katta hajmlarda: Elasticsearch, OpenSearch yoki Meilisearch kabi maxsus qidiruv tizimlarini ishlatish."
    ],
    tip: "Intervyuda `EXPLAIN` tahlilida `type: ALL` ko'rinsa bu Full Table Scan ekanligini va `type: range` indeks ishlayotganini ko'rsatishini aytib o'ting."
  },

  // --- High Performance PHP & Octane ---
  {
    id: "iq-34",
    title: "PHP-FPM arxitekturasida pm.max_children qanday hisoblanadi va noto'g'ri qiymat qanday oqibatlarga olib keladi?",
    level: "middle",
    category: "php",
    categoryLabel: "PHP tili",
    skillSlug: "php-fpm",
    subskillId: "42.4",
    answer: [
      "PHP-FPM da Master jarayon faqat ishchilarni (workerlarni) boshqaradi, har bir Worker esa FastCGI orqali bitta HTTP so'rovni ketma-ket bajaradi.",
      "",
      "**Hisoblash formulasi:**",
      "`pm.max_children = (Serverdagi jami RAM - OS va boshqa servislarga (MySQL, Redis, Nginx) qoldiriladigan RAM) / 1 ta PHP worker egallaydigan o'rtacha RAM`",
      "",
      "**Misol:**",
      "- Server: 8 GB RAM. OS va MySQL ga 3 GB ajratdik. PHP ga 5 GB (5120 MB) qoldi.",
      "- Laravel loyihasida 1 ta worker o'rtacha 50 MB oladi.",
      "- `pm.max_children = 5120 / 50 ≈ 100`.",
      "",
      "**Noto'g'ri qo'yilsa nima bo'ladi?**",
      "- **Juda katta qo'yilsa (masalan, 500):** Ko'p so'rov kelganda barcha workerlar ochilib ketadi, RAM to'ladi, server Swap ishlatishni boshlaydi va natijada Linux OOM Killer ishga tushib, MySQL yoki PHP-FPM ni majburan o'chirib yuboradi (Server crash).",
      "- **Juda kichik qo'yilsa (masalan, 10):** Workerlar yetishmaydi, so'rovlar navbatda kutib turadi va mijozlarga `504 Gateway Timeout` xatolari qaytadi."
    ],
    tip: "Har bir worker xotirasini aniqlash uchun `ps -ylC php-fpm --sort:rss` buyrug'idan foydalanishni aytish amaliy DevOps tajribangizni yaqqol ko'rsatadi."
  },
  {
    id: "iq-35",
    title: "Laravel Octane (FrankenPHP / Swoole) an'anaviy PHP-FPM dan qanday farq qiladi va undagi State Pollution (xotira ifloslanishi) xavfi nima?",
    level: "senior",
    category: "laravel",
    categoryLabel: "Laravel",
    skillSlug: "application-performance-optimization",
    subskillId: "53.5",
    answer: [
      "**PHP-FPM vs Octane:**",
      "- PHP-FPM (Shared-Nothing): Har bir so'rovda butun Laravel frameworki (minglab fayllar, Service Providerlar) noldan yuklanadi va so'rov tugashi bilan xotiradan butunlay o'chiriladi.",
      "- Laravel Octane: Dastur server ishga tushganda RAM ga bir marta to'liq yuklanadi va uzoq yashovchi ishchi jarayon (daemon) sifatida turadi. So'rov kelganda darhol javob beriladi (Bootstrap bosqichi 0 ms ga tushadi). Natijada tezlik 5-10 barobargacha oshadi.",
      "",
      "**State Pollution (Holat ifloslanishi) xavfi:**",
      "Ilova xotiradan o'chmagani sababli, bir foydalanuvchining so'rovi paytida statik o'zgaruvchiga yozilgan ma'lumot keyingi butunlay boshqa foydalanuvchiga ko'rinib qolishi mumkin!",
      "",
      "```php",
      "// Octane'da juda xavfli xato:",
      "class AppContext {",
      "    public static ?User $currentUser = null; // Barcha so'rovlar uchun bitta xotirada turadi!",
      "}",
      "// Natija: A foydalanuvchi kirganidan keyin B foydalanuvchi ham A ning profilini ko'radi!",
      "```",
      "",
      "**Yechim:** Singleton servislarni ehtiyotkorlik bilan ishlatish, so'rov doirasidagi servicelar uchun `app()->scoped(...)` ro'yxatdan o'tkazish yoki Octane'ning `flush()` listenerlaridan foydalanish."
    ],
    tip: "Octane haqida gapirganda albatta `scoped` konteyner bog'lanishi va statik holat xavfini eslatib o'ting."
  },

  // --- Testing & Test Doubles ---
  {
    id: "iq-36",
    title: "Avtomatlashtirilgan testlarda Dummy, Stub, Fake va Mock o'rtasidagi farq nima (Test Doubles)?",
    level: "junior",
    category: "testing",
    categoryLabel: "Testlash",
    skillSlug: "unit-testing",
    subskillId: "27.6",
    answer: [
      "Test Double — test muhitida haqiqiy ishlab chiqarish obyektining o'rnini bosuvchi soxta obyekt.",
      "",
      "- **Dummy**: Faqat metod parametrlarini to'ldirish uchun uzatiladigan, lekin test ichida hech qachon ishlatilmaydigan obyekt (masalan, bo'sh `new User()`).",
      "- **Stub**: Test vaqtida chaqirilganda oldindan belgilangan tayyor javobni qaytaruvchi obyekt (masalan, ob-havo so'ralganda har doim 25 daraja qaytaruvchi stub). U qanday chaqirilganini tekshirmaydi.",
      "- **Fake**: Haqiqiy ishlaydigan mantiqqa ega, lekin soddalashtirilgan va productionga yaroqsiz bo'lgan obyekt (masalan, MySQL o'rniga xotirada ishlovchi `InMemoryUserRepository` yoki `Http::fake()`).",
      "- **Mock**: Xulq-atvori tekshiriladigan (Behavior verification) obyekt. U ma'lum bir metod aniq parametrlar bilan necha marta chaqirilganini tekshiradi (`expect($mailer)->toReceive('send')->once()`). Agar metod chaqirilmasa, test yiqiladi."
    ],
    tip: "Stub holatni (State verification) tekshirishda, Mock esa o'zaro harakatni (Behavior verification) tekshirishda ishlatilishini qisqa qilib ayting."
  },

  // --- Webhooks & API Integration ---
  {
    id: "iq-37",
    title: "Tashqi to'lov tizimlari Webhook'larini qabul qilishda qanday xavfsizlik va barqarorlik talablari qo'yiladi?",
    level: "middle",
    category: "security",
    categoryLabel: "Xavfsizlik",
    skillSlug: "webhooks",
    subskillId: "24.4",
    answer: [
      "Webhook — uchinchi tomon tizimi (masalan, Click, Payme, Stripe) biror hodisa sodir bo'lganda bizning serverga yuboradigan HTTP POST xabari.",
      "",
      "**Asosiy talablar:**",
      "1. **Imzo tekshiruvi (HMAC Signature):** Tajovuzkor bizning endpointga qalbaki 'to'landi' degan xabar yubormasligi uchun, HTTP sarlavhasidagi imzo maxfiy kalit bilan tekshiriladi: `hash_equals($headerSign, hash_hmac('sha256', $rawBody, $secret))`. Doim xom (raw) body ishlatiladi.",
      "2. **Tezkor 200 OK qaytarish:** To'lov provayderi javobni ko'pi bilan 3-5 soniya kutadi. Agar biz controllerda og'ir hisobot yoki email yuborsak, timeout beradi va provayder webhookni qayta-qayta yuboraveradi. Shuning uchun webhook olinishi bilan darhol Queue Job'ga tashlanib, provayderga 200 OK qaytarilishi kerak.",
      "3. **Idempotentlik:** Provayder bitta to'lov xabarini bir necha marta yuborishi mumkin (retry). Tizim bitta to'lov uchun foydalanuvchi balansini faqat bir marta to'ldirishi shart.",
      "4. **Replay Attack himoyasi:** Webhook tarkibidagi `timestamp` tekshirilib, 5 daqiqadan eski bo'lgan so'rovlar rad etilishi lozim."
    ],
    tip: "Webhook qabul qiluvchi controller'dan CSRF middleware'ni chiqarib tashlash (`withoutMiddleware` yoki `bootstrap/app.php`) kerakligini ham amaliy detal sifatida eslang."
  },

  // --- Database Architecture: Sharding vs Partitioning ---
  {
    id: "iq-38",
    title: "Database Partitioning va Database Sharding o'rtasidagi tub farq nima va ular qachon tanlanadi?",
    level: "senior",
    category: "database",
    categoryLabel: "Ma'lumotlar bazasi",
    skillSlug: "database-optimization",
    subskillId: "15.17",
    answer: [
      "**1. Partitioning (Bo'laklash):**",
      "- **Bitta server (bitta DB instansiyasi)** doirasida bitta ulkan jadvalni (masalan, 100 million qatorli `logs`) jismoniy qismlarga bo'lib saqlash.",
      "- Odatda vaqt bo'yicha qilinadi: `PARTITION BY RANGE (YEAR(created_at))`.",
      "- So'rov yuborilganda MySQL faqat tegishli bo'lakni o'qiydi (**Partition Pruning**), bu diskdagi I/O yuklamani keskin kamaytiradi.",
      "- Ilova kodi uchun jadval bittadek ko'rinaveradi, ilova darajasida o'zgarish talab qilinmaydi.",
      "",
      "**2. Sharding (Gorizontal parchalash):**",
      "- Ma'lumotlarni **bir nechta mutlaqo alohida jismoniy DB serverlariga** taqsimlash.",
      "- Masalan, `user_id % 4`: 1-serverda 1-chorak foydalanuvchilar, 2-serverda 2-chorak va h.k.",
      "- Qachon tanlanadi: Bitta serverning diski, CPU yoki RAM imkoniyati jismonan tugaganda (High Scalability).",
      "- **Kamchiliklari:** Tizim murakkabligi juda oshadi. Cross-shard JOIN va tranzaksiyalarni (ACID) amalga oshirish juda qiyinlashadi."
    ],
    tip: "Intervyuda: 'Sharding bu eng oxirgi chora. Avval indekslash, kesh, replikatsiya (Read/Write split) va partitioning sinab ko'rilishi shart' deb ta'kidlash katta arxitekturaviy yetuklik belgisidir."
  },

  // --- Object-Oriented Principles: DI vs Service Locator ---
  {
    id: "iq-39",
    title: "Dependency Injection (DI) va Service Locator patternlari farqi nima va Service Locator nima uchun Anti-pattern hisoblanadi?",
    level: "junior",
    category: "php",
    categoryLabel: "PHP tili",
    skillSlug: "object-oriented-programming-oop",
    subskillId: "3.12",
    answer: [
      "Ikkala usul ham sinfni aniq klass implementatsiyalaridan ajratish (Decoupling) uchun xizmat qiladi.",
      "",
      "**1. Dependency Injection (DI) — Ochiq bog'liqliklar:**",
      "- Sinf o'ziga kerak bo'lgan barcha bog'liqliklarni konstruktorda ochiq-oydin talab qiladi.",
      "- Sinfni o'qigan dasturchi unga nimalar kerakligini darhol ko'radi.",
      "- Unit test yozish juda oson: konstruktorga oddiy Mock yoki Fake obyekt uzatiladi.",
      "```php",
      "class OrderService {",
      "    public function __construct(private PaymentGatewayInterface $gateway) {} // Aniq va ochiq",
      "}",
      "```",
      "",
      "**2. Service Locator — Yashirin bog'liqliklar (Anti-pattern):**",
      "- Sinf butun container yoki locator obyektini oladi va o'z ichida kerakli xizmatni chaqirib oladi (`app('payment')`).",
      "- **Kamchiliklari:** Bog'liqliklar yashirin. Tashqaridan sinf qaysi xizmatlarga muhtojligi ko'rinmaydi. Agar ichida chaqirilgan bitta servis topilmasa, xato faqat runtime'da yuzaga chiqadi. Unit test yozishda butun container'ni mock qilishga to'g'ri keladi.",
      "```php",
      "class OrderService {",
      "    public function pay() {",
      "        $gateway = Container::get('payment'); // Yashirin bog'liqlik!",
      "    }",
      "}",
      "```"
    ],
    tip: "Laravel'dagi Facade'lar qulay bo'lsa-da, ularni haddan tashqari ko'p ishlatish aynan Service Locator kabi yashirin bog'liqliklarga olib kelishi mumkinligini tushuntiring."
  },

  // --- Microservices & System Design ---
  {
    id: "iq-40",
    title: "Monolitdan Mikroxizmatlarga (Microservices) o'tishda eng katta xatolar nima va Strangler Fig Pattern qanday yordam beradi?",
    level: "lead",
    category: "architecture",
    categoryLabel: "Arxitektura",
    skillSlug: "microservices",
    subskillId: "65.20",
    answer: [
      "**Eng katta xatolar:**",
      "1. **Big Bang Rewrite:** Mavjud monolitni tashlab, birdaniga butun tizimni noldan mikroxizmat qilib qayta yozishga urinish. Bu loyihalarning aksariyati byudjet va vaqt yetmasligi tufayli muvaffaqiyatsiz tugaydi.",
      "2. **Distributed Monolith:** Servislar alohida bo'lingan, lekin ular bitta umumiy ma'lumotlar bazasiga ulangan yoki sinxron HTTP orqali bir-biriga qattiq bog'langan (biri qulasa, barchasi to'xtaydi).",
      "",
      "**Strangler Fig Pattern (Bog'lovchi anjir daraxti naqshi):**",
      "Monolitni xavfsiz va bosqichma-bosqich almashtirishning sanoat standarti:",
      "1. Monolit oldiga **API Gateway / Reverse Proxy** (Nginx, Kong) qo'yiladi. Barcha trafik dastlab monolitga ketadi.",
      "2. Bitta aniq chegaralangan modul (masalan, `Notification Service` yoki `Auth Service`) ajratib olinib, yangi alohida mikroxizmat sifatida ishga tushiriladi.",
      "3. API Gateway sozlanadi: `/api/v1/notifications` ga kelgan so'rovlar yangi mikroxizmatga, qolgan barcha so'rovlar esa eski monolitga yo'naltiriladi.",
      "4. Modulma-modul yangi servislar qo'shilib boradi va vaqt o'tishi bilan eski monolit kodi qisqarib, oxir-oqibat butunlay yo'q qilinadi."
    ],
    tip: "Lead sifatida arxitekturada eng muhim narsa yangi texnologiyalarga ko'r-ko'rona ergashish emas, balki biznesning to'xtovsiz ishlashini (zero downtime) kafolatlashdir."
  },
  // --- PHP Core & Memory ---
  {
    id: "iq-41",
    title: "PHP Garbage Collection qanday ishlaydi va Circular Reference (aylana bog'liqlik) tufayli xotira to'lib qolishi qanday tozalanadi?",
    level: "senior",
    category: "php",
    categoryLabel: "PHP tili",
    skillSlug: "php",
    subskillId: "1.23",
    answer: [
      "PHP xotirani boshqarishda **Reference Counting** (havolalar hisoblagichi) mexanizmidan foydalanadi. Har bir o'zgaruvchi `zval` strukturasida `refcount` saqlaydi. O'zgaruvchiga havola 0 ga tenglashishi bilanoq xotira darhol bo'shatiladi.",
      "",
      "**Circular Reference muammosi:**",
      "Agar obyekt A obyekt B ga havola qilsa, va B yana A ga havola qilsa (`$a->b = $b; $b->a = $a;`), tashqi o'zgaruvchilar `unset()` qilinsa ham, ularning ichki `refcount`i 1 bo'lib qoladi. Standart mexanizm ularni o'chira olmaydi va xotira sizib chiqadi (memory leak).",
      "",
      "**Siklli xotirani tozalash mexanizmi (Cycle Collector):**",
      "- PHP shubhali obyektlarni (refcount kamaygan, lekin 0 bo'lmagan) maxsus Root Buffer'ga (10 000 ta element sig'adigan bufer) yig'adi.",
      "- Bufer to'lganda Garbage Collector (GC) algoritmi barcha tugunlarni sinovdan o'tkazib, tashqaridan bog'lanmagan aylana zanjirlarni aniqlaydi va bir yo'la xotiradan tozalaydi.",
      "- Worker yoki Daemon jarayonlarda (Octane, Horizon) kerak bo'lsa `gc_collect_cycles()` orqali majburiy tozalash mumkin."
    ],
    tip: "Oddiy request-response rejimida PHP so'rov oxirida xotirani 100% tozalaydi, ammo uzoq yashovchi daemonlarda (Laravel Octane / Horizon) aylana bog'liqliklar va statik massivlar eng katta dushmandir."
  },
  {
    id: "iq-42",
    title: "OPcache qanday ishlaydi va PHP 7.4+ da chiqqan opcache.preload mexanizmi unumdorlikni qanday qilib 15-30% ga oshiradi?",
    level: "middle",
    category: "php",
    categoryLabel: "PHP tili",
    skillSlug: "php",
    subskillId: "1.25",
    answer: [
      "**OPcache ishlash tartibi:**",
      "PHP har safar skriptni ishlatganda 4 ta bosqichdan o'tadi: Lexing (Tokenizatsiya) → Parsing (AST yaratish) → Compilation (Opcode generatsiyasi) → Execution (Zend Engine ijrosi). OPcache kompilyatsiya qilingan bayt-kodni (Opcode) umumiy xotirada (Shared Memory) saqlaydi, natijada keyingi so'rovlarda dastlabki 3 ta bosqich o'tkazib yuboriladi.",
      "",
      "**opcache.preload nimani o'zgartiradi?**",
      "- Standart OPcache'da har bir worker so'rov kelganda fayllarning xotiradagi opcode'ini o'z jarayoniga bog'lashi (link/resolve classes) kerak bo'ladi.",
      "- `opcache.preload` orqali server ishga tushganda (PHP-FPM start) maxsus skript (masalan, Laravel'dagi vendor va core classlar) xotiraga yuklanadi va **barcha workerlar uchun doimiy bog'langan (pre-resolved)** holda saqlanadi.",
      "- Natijada har bir so'rovda hatto classlarni izlash va registratsiya qilish vaqti ham yo'qoladi. Framework 15-30% tezroq javob beradi.",
      "",
      "**Kamchiligi:** Kod o'zgarsa, PHP-FPM ni qayta ishga tushirish (restart) shart."
    ],
    tip: "Intervyuda Preload faqat ishlab chiqarish (production) muhitida ishlatilishi kerakligini, local muhitda har bir kod o'zgarishida FPM restart talab qilib dasturchiga xalal berishini ayting."
  },
  {
    id: "iq-43",
    title: "PHP 8.1 Fibers nima va u Generators (yield) dan nimasi bilan farq qiladi?",
    level: "senior",
    category: "php",
    categoryLabel: "PHP tili",
    skillSlug: "php",
    subskillId: "1.40",
    answer: [
      "**Fibers** — bu PHP da to'liq mustaqil chaqiruv steki (call stack) ga ega bo'lgan to'xtatiladigan (suspendable) kod bloklari (korutinalar / coroutines).",
      "",
      "**Generators va Fibers farqi:**",
      "- `Generator (yield)`: Faqat bitta funksiyani to'xtata oladi. Agar chuqur chaqirilgan funksiya ichida `yield` bo'lsa, butun chaqiruv zanjiridagi barcha oraliq funksiyalar ham generator bo'lishi shart (Coloring functions muammosi).",
      "- `Fiber`: Butun chaqiruv stekining istalgan chuqurligidan turib `Fiber::suspend()` qilinishi mumkin. Tashqi kod o'zini oddiy sinxron koddek tutadi, ammo fonida asinxron I/O (Revolt event loop, Amp v3) boshqaradi.",
      "",
      "```php",
      "$fiber = new Fiber(function (): void {",
      "    $value = Fiber::suspend('to\'xtatildi');",
      "    echo \"Qayta tiklandi: {$value}\\n\";",
      "});",
      "",
      "$status = $fiber->start(); // 'to'xtatildi' qaytaradi",
      "$fiber->resume('davom'); // 'Qayta tiklandi: davom' chiqaradi",
      "```"
    ],
    tip: "Fibers dasturchilar har kuni to'g'ridan-to'g'ri ishlatadigan narsa emas, balki asinxron freymvorklar (Amp, Revolt) mualliflari uchun qulay poydevor ekanligini bildiring."
  },
  {
    id: "iq-44",
    title: "PHP da Copy-on-Write (COW) mexanizmi qanday ishlaydi va massivlarni argument sifatida uzatishda xotira qachon ajratiladi?",
    level: "junior",
    category: "php",
    categoryLabel: "PHP tili",
    skillSlug: "php",
    subskillId: "1.36",
    answer: [
      "Ko'p tillarda massiv boshqa funksiyaga uzatilganda yoki o'zgaruvchiga tenglashtirilganda uning to'liq nusxasi olinadi yoki manzil uzatiladi. PHP da esa **Copy-on-Write (COW)** qo'llaniladi.",
      "",
      "**Qanday ishlaydi:**",
      "- Agar siz 100 MB lik massivni boshqa o'zgaruvchiga tenglashtirsangiz (`$b = $a;`) yoki funksiyaga argument qilib uzatsangiz (`process($a)`), PHP yangi xotira ajratmaydi. Ikkala o'zgaruvchi xotiradagi bitta `zval` va bitta xotira manziliga qaraydi (`refcount = 2`).",
      "- Faqat va faqat ulardan biri o'zgartirilgan lahzada (`$b['new'] = 1;`) PHP massivni nusxalaydi va xotiradan yangi 100 MB ajratadi (Copy on Write).",
      "",
      "**Amaliy xulosa:** PHP da massivlarni `function test(&$arr)` deb referens bilan uzatish deyarli kerak emas. Referens berilsa, PHP COW optimizatsiyasini to'xtatadi va ko'pincha teskari sekinlashuvga olib keladi."
    ],
    tip: "Referenslar (`&`) massivlarni tejash uchun kerak emasligini va COW buni avtomatik xavfsiz boshqarishini tushuntirib bera olsangiz, bu kuchli texnik javob bo'ladi."
  },
  {
    id: "iq-45",
    title: "PHP 8.2-8.4 dagi Readonly Classes, DNF Types va #[Override] atributi qanday arxitekturaviy xatolardan asraydi?",
    level: "middle",
    category: "php",
    categoryLabel: "PHP tili",
    skillSlug: "php",
    subskillId: "1.33",
    answer: [
      "**1. Readonly Classes (PHP 8.2):**",
      "Butun classni `readonly class DTO` deb e'lon qilish uning barcha property'larini avtomatik `readonly` qiladi va dinamik xossalar qo'shilishini taqiqlaydi. Bu sof Immutable DTO va Value Object yaratishni kafolatlaydi.",
      "",
      "**2. DNF Types (Disjunctive Normal Form - PHP 8.2):**",
      "Intersection va Union tiplarini birlashtirish: `(HasId&JsonSerializable)|null`. Bu murakkab interfeys kombinatsiyalarini qat'iy nazorat qilishga imkon beradi.",
      "",
      "**3. #[Override] Atributi (PHP 8.3):**",
      "Voris classda metod ota classdagi metodni qayta yozayotganini (override) tasdiqlaydi. Agar kelajakda ota classdagi metod nomi refactoring qilinib o'zgarsa, PHP darhol kompilyatsiyada xato beradi (jimjit buzilishning oldini oladi)."
    ],
    tip: "Katta refactoring'larda ota sinfdagi metod nomi o'zgarganda voris sinfdagi metod alohida yangi metod bo'lib qolib, biznes mantiq buzilishini `#[Override]` qanday to'xtatishini ayting."
  },
  {
    id: "iq-46",
    title: "PHP Magic Methods (__call, __get, __set) qanday ishlaydi va nima uchun haddan tashqari ko'p ishlatish 'Anti-pattern' hisoblanadi?",
    level: "junior",
    category: "php",
    categoryLabel: "PHP tili",
    skillSlug: "object-oriented-programming-oop",
    subskillId: "3.7",
    answer: [
      "**Sehrli metodlar:** Obyektda mavjud bo'lmagan yoki kirish cheklangan (private/protected) property yoki metod chaqirilganda avtomatik ishga tushadigan hook'lar.",
      "- `__get($name)` / `__set($name, $value)`: Yo'q property o'qilganda/yozilganda.",
      "- `__call($name, $args)` / `__callStatic()`: Yo'q metod chaqirilganda.",
      "",
      "**Eloquent'da qulayligi:** Eloquent jadvallardagi ustunlarni (`$user->email`) aynan `__get` va `__set` orqali model attributes massividan dinamik oladi.",
      "",
      "**Nima uchun oddiy biznes kodda ortiqcha ishlatish yomon:**",
      "1. **Statik tahlil va IDE:** PHPStan, Larastan va PhpStorm qaysi maydonlar borligini bilmaydi (`@property` docblock yozishga majbur bo'lasiz).",
      "2. **Tezlik:** Magic metodlar oddiy xossa va metod chaqiruvlaridan bir necha baravar sekinroq ishlaydi.",
      "3. **Yashirin xatolar:** Noto'g'ri yozilgan harf (typo) xato bermasdan `__set` ichida jimjit yangi maydon hosil qilib ketishi mumkin."
    ],
    tip: "Sehrli metodlar freymvorklar va ORM uchun yaxshi vosita, ammo oddiy domen modellari va biznes servislarida aniq (explicit) getter/setter yoki public readonly property'lar ishlatilishi shart."
  },

  // --- Laravel Core & Pipeline ---
  {
    id: "iq-47",
    title: "Laravel Pipeline Pattern qanday ishlaydi va o'zimizning murakkab biznes jarayonlarimizda undan qanday foydalanamiz?",
    level: "middle",
    category: "laravel",
    categoryLabel: "Laravel",
    skillSlug: "laravel",
    subskillId: "2.1",
    answer: [
      "Laravel Middleware tizimi to'liq **Pipeline Pattern** asosida ishlaydi. Ma'lum bir obyekt (odatda `$request`) bir nechta mustaqil 'quvurlar' (pipes) orqali o'tkaziladi. Har bir quvur ma'lumotni o'zgartirishi, tekshirishi yoki keyingisiga uzatishi (`$next($passable)`) mumkin.",
      "",
      "**Biznes mantiqda qo'llash (masalan, Buyurtmani qayta ishlash):**",
      "```php",
      "use Illuminate\\Support\\Facades\\Pipeline;",
      "",
      "$order = Pipeline::send($orderData)",
      "    ->through([",
      "        CheckInventory::class,",
      "        ApplyDiscounts::class,",
      "        CalculateTaxes::class,",
      "        ProcessPayment::class,",
      "    ])",
      "    ->then(fn ($order) => Order::create($order));",
      "```",
      "- Har bir bosqich alohida sinf bo'lib, o'zining `handle($order, Closure $next)` metodiga ega.",
      "- Foydasi: Buyurtma logikasi 500 qatorli monolithic controller emas, bir nechta 15 qatorli mustaqil, oson test qilinadigan sinflarga aylanadi."
    ],
    tip: "Intervyuda Pipeline pattern Single Responsibility Principle (SRP) va Open/Closed Principle (OCP) ga to'liq mos tushishini ko'rsatib bering."
  },
  {
    id: "iq-48",
    title: "Laravel Service Providerlarida register() va boot() metodlari qanday farqlanadi va Deferred Service Providers nima?",
    level: "junior",
    category: "laravel",
    categoryLabel: "Laravel",
    skillSlug: "laravel",
    subskillId: "2.6",
    answer: [
      "**1. register() metodi:**",
      "- Faqat va faqat xizmatlarni Service Container'ga bog'lash (`$this->app->bind()`, `singleton()`) uchun mo'ljallangan.",
      "- **Muhim qoida:** `register()` ichida hech qachon boshqa providerlar ro'yxatdan o'tkazgan servislar chaqirilmasligi kerak (chunki ular hali yuklanmagan bo'lishi mumkin). Hech qanday event listener yoki route ulanmaydi.",
      "",
      "**2. boot() metodi:**",
      "- Barcha Service Providerlarning `register()` metodi to'liq ishlab bo'lgandan keyingina chaqiriladi.",
      "- Bu yerda istalgan serviceni chaqirish, View Composer, Model Observers, Custom Validation qoidalarini ulash mumkin.",
      "",
      "**3. Deferred (Kechiktirilgan) Providers:**",
      "- `implements DeferrableProvider`: Agar provider faqat kamdan-kam ishlatiladigan og'ir serviceni ro'yxatdan o'tkazsa, u har bir so'rovda yuklanmaydi. Faqat konteynerdan o'sha servis so'ralgandagina (on-demand) yuklanadi."
    ],
    tip: "Nima uchun `register()` da boshqa servisni chaqirish xavfli ekanligini (bootstrapping lifecycle) aniq tushuntirish junior va middle'ni ajratuvchi savoldir."
  },
  {
    id: "iq-49",
    title: "Laravel Facades qanday qilib statik chaqiruvni dynamic container instansiyasiga yo'naltiradi va ularni testlarda qanday mock qilamiz?",
    level: "junior",
    category: "laravel",
    categoryLabel: "Laravel",
    skillSlug: "laravel",
    subskillId: "2.7",
    answer: [
      "Facade — bu Service Container'dagi xizmatlarga qulay 'statik' interfeys taqdim etuvchi sinf.",
      "",
      "**Ichki mexanizmi:**",
      "Barcha fassade'lar `Illuminate\\Support\\Facades\\Facade` dan meros oladi va `getFacadeAccessor()` metodini e'lon qiladi (masalan, `'cache'` yoki `CacheManager::class`).",
      "Biz `Cache::get('key')` deb statik chaqirganimizda, PHP da bunday statik metod yo'qligi sababli `__callStatic()` sehrli metodi ishga tushadi. U `app('cache')` orqali konteynerdan haqiqiy ob'ektni oladi va `$instance->get('key')` qilib dinamik bajaradi.",
      "",
      "**Testlash qulayligi:**",
      "Fassade'lar oddiy statik class emas! Ular mock qilishni qo'llab-quvvatlaydi:",
      "```php",
      "Cache::shouldReceive('get')",
      "    ->once()",
      "    ->with('user_42')",
      "    ->andReturn($fakeUser);",
      "```"
    ],
    tip: "Intervyuda: 'Facade bu oddiy statik sinf emas, u ortida to'liq Container va Dependency Injection turadi' deb javob bersangiz, fassade'larni chuqur tushunishingiz bilinadi."
  },
  {
    id: "iq-50",
    title: "Form Request Lifecycle: authorize(), rules(), va prepareForValidation() qaysi ketma-ketlikda ishlaydi?",
    level: "junior",
    category: "laravel",
    categoryLabel: "Laravel",
    skillSlug: "laravel",
    subskillId: "2.12",
    answer: [
      "Controller metodiga `StoreOrderRequest $request` type-hint qilinganda, Laravel avtomatik Form Request'ni tekshiradi.",
      "",
      "**Ijro ketma-ketligi:**",
      "1. **`prepareForValidation()`**: Validatsiya qoidalari ishlashidan oldin kiritilgan ma'lumotlarni tozalash yoki o'zgartirish (masalan, telefon raqamidan bo'sh joylarni olib tashlash, slug yaratish).",
      "2. **`authorize()`**: Foydalanuvchining bu amalni bajarishga huquqi bor-yo'qligi tekshiriladi. Agar `false` qaytsa, 403 Forbidden exception otiladi va rules tekshirilmaydi.",
      "3. **`rules()`**: Ma'lumotlar validatsiya qoidalaridan o'tkaziladi. Agar xato bo'lsa, 422 Unprocessable Entity otiladi.",
      "4. **`passedValidation()`**: Validatsiyadan muvaffaqiyatli o'tgandan so'ng qo'shimcha ma'lumot qo'shish.",
      "",
      "Controller ichiga faqat barcha bosqichlardan muvaffaqiyatli o'tgan so'rovgina yetib keladi."
    ],
    tip: "`$request->all()` o'rniga doim `$request->validated()` ishlatish xavfsizlik (Mass Assignment himoyasi) uchun qat'iy talab ekanligini ta'kidlang."
  },
  {
    id: "iq-51",
    title: "Laravel Custom Casts (CastsAttributes) nima va ma'lumotlar bazasidagi JSON ustunni Value Object'ga qanday xaritalaymiz?",
    level: "junior",
    category: "laravel",
    categoryLabel: "Laravel",
    skillSlug: "eloquent-orm",
    subskillId: "13.8",
    answer: [
      "Standart holatda Eloquent ustunlarni `integer`, `boolean`, `array`, `datetime` kabi sodda tiplarga cast qiladi. `CastsAttributes` interfeysi esa ustunni to'liq biznes Value Object'iga aylantirish imkonini beradi.",
      "",
      "**Qanday ishlaydi:**",
      "Interfeysda ikkita metod mavjud: `get()` (bazasidan o'qiganda obyekt yasash) va `set()` (bazaga yozayotganda json/string'ga o'girish).",
      "```php",
      "class AddressCast implements CastsAttributes {",
      "    public function get($model, $key, $value, $attributes) {",
      "        $data = json_decode($value, true);",
      "        return new Address($data['city'], $data['street']);",
      "    }",
      "    public function set($model, $key, $value, $attributes) {",
      "        if (! $value instanceof Address) throw new InvalidArgumentException();",
      "        return json_encode(['city' => $value->city, 'street' => $value->street]);",
      "    }",
      "}",
      "```",
      "- Modelda: `protected $casts = ['address' => AddressCast::class];`.",
      "- Natijada `$user->address->city` deb toza Value Object bilan ishlaymiz."
    ],
    tip: "Bu usul Domain-Driven Design prinsiplarini Eloquent bilan birlashtirishda eng toza va tavsiya etilgan amaliyotdir."
  },
  {
    id: "iq-52",
    title: "Laravel 11 da Context Service nima va u loglar hamda navbatdagi vazifalarda qanday ma'lumotlarni saqlaydi?",
    level: "middle",
    category: "laravel",
    categoryLabel: "Laravel",
    skillSlug: "laravel",
    subskillId: "2.33",
    answer: [
      "Laravel 11 da taqdim etilgan **Context** xizmati joriy so'rov (request) doirasidagi umumiy metama'lumotlarni (foydalanuvchi ID, sessiya, trace_id, IP) bir joyda to'plash imkonini beradi.",
      "",
      "**Asosiy imkoniyatlari:**",
      "1. **Loglarga avtomatik birikish:** `Context::add('trace_id', Str::uuid());` qilinsa, o'sha so'rov davomida yozilgan barcha `Log::info()` yozuvlariga `trace_id` avtomatik qo'shiladi.",
      "2. **Navbatlarga (Queues) meros o'tishi:** Agar so'rov ichida Queue Job dispatch qilinsa, Context ma'lumotlari job bilan birga navbatga ko'chib o'tadi! Worker log yozganda ham aynan o'sha dastlabki HTTP so'rovining `trace_id` sini ko'rish mumkin bo'ladi (Distributed Tracing).",
      "3. **Maxfiy ma'lumotlar:** `Context::addHidden()` orqali faqat ichki foydalanish uchun ma'lumot saqlab, loglarga chiqib ketishini to'xtatish mumkin."
    ],
    tip: "Katta mikroxizmatlar yoki monitoring tizimlarida (Datadog, OpenTelemetry) xatolarni oxirigacha kuzatishda (end-to-end tracing) Laravel 11 Context'ining ahamiyatini keltiring."
  },

  // --- Eloquent & Database Optimization ---
  {
    id: "iq-53",
    title: "Eloquent chunk() vs cursor() vs chunkById(): Katta hajmdagi ma'lumotlarni update qilishda chunk() nega xavfli va nima uchun chunkById() shart?",
    level: "middle",
    category: "database",
    categoryLabel: "Ma'lumotlar bazasi",
    skillSlug: "eloquent-orm",
    subskillId: "13.6",
    answer: [
      "**1. chunk($count, $callback):**",
      "- `OFFSET` va `LIMIT` ishlatadi (`LIMIT 100 OFFSET 0`, keyin `OFFSET 100`).",
      "- **XAVF:** Agar siz `chunk()` ichida WHERE shartiga ta'sir qiluvchi ustunni o'zgartirsangiz (masalan, `User::where('is_processed', false)->chunk(100, fn($users) => $users->each->update(['is_processed' => true]))`), birinchi 100 ta qator true bo'lgach, keyingi so'rov `OFFSET 100` qilganda aslida 101-200 emas, **201-300 qatorlarni oladi!** Oradagi 100 ta qator qayta ishlanmasdan tashlab ketiladi!",
      "",
      "**2. chunkById($count, $callback):**",
      "- `OFFSET` ishlatmaydi. So'nggi ko'rilgan ID ni eslab qoladi: `WHERE id > ? ORDER BY id ASC LIMIT 100`.",
      "- Qatorlar o'zgartirilsa ham, hech qachon qatorlarni tashlab ketmaydi va katta jadvallarda `OFFSET` ga nisbatan 100 baravar tez ishlaydi.",
      "",
      "**3. cursor():**",
      "- PHP Generator (`yield`) ishlatadi. Xotirada faqat bitta model turadi. Lekin bitta uzoq ochiq DB so'rovi (PDO unbuffered query) saqlanib turadi."
    ],
    tip: "Bu savol ko'pincha: 'Bizning cron job barcha foydalanuvchilarning yarmini tashlab ketmoqda, sabab nima?' degan real production bug shaklida so'raladi."
  },
  {
    id: "iq-54",
    title: "Polymorphic Relations nima va nima uchun production da doim Relation::morphMap() ishlatilishi shart?",
    level: "junior",
    category: "database",
    categoryLabel: "Ma'lumotlar bazasi",
    skillSlug: "eloquent-orm",
    subskillId: "13.3",
    answer: [
      "Polymorphic Relation — bitta model bir nechta turli xil modellarga bog'lana olishi (masalan, `Comment` ham `Post`ga, ham `Video`ga tegishli bo'lishi: `commentable_id` va `commentable_type`).",
      "",
      "**Standart holatdagi katta xavf:**",
      "Standart holatda Laravel `commentable_type` ustuniga modelning to'liq PHP namespace'ini yozadi: `App\\Models\\Post`.",
      "- Agar kelajakda class nomini yoki papkasini o'zgartirsangiz (`App\\Modules\\Blog\\Post`), bazadagi barcha eski izohlar uzilib qoladi!",
      "- Namespace uzun string bo'lgani uchun baza indekslari katta hajm egallaydi va sekinlashadi.",
      "",
      "**Yechim: Relation::morphMap():**",
      "```php",
      "// AppServiceProvider::boot()",
      "Relation::morphMap([",
      "    'post' => Post::class,",
      "    'video' => Video::class,",
      "]);",
      "```",
      "Endi bazada faqat ixcham `'post'` satri yoziladi, class refactoring qilinsa ham aloqalar buzilmaydi."
    ],
    tip: "Production loyihada `Relation::enforceMorphMap()` chaqirib qo'yilsa, ro'yxatdan o'tmagan namespace bazaga yozilishi butunlay taqiqlanadi."
  },
  {
    id: "iq-55",
    title: "SQL Window Functions (ROW_NUMBER, RANK, DENSE_RANK) nima va ularning oddiy GROUP BY dan farqi nima?",
    level: "senior",
    category: "database",
    categoryLabel: "Ma'lumotlar bazasi",
    skillSlug: "sql",
    subskillId: "9.8",
    answer: [
      "**Oddiy GROUP BY:** Qatorlarni birlashtiradi va bitta yig'ma qatorga (aggregate) aylantiradi. Natijada individual qatorlarning alohida ma'lumotlari yo'qoladi.",
      "",
      "**Window Functions (`OVER (PARTITION BY ... ORDER BY ...)`):**",
      "Har bir qatorning o'zini saqlab qolgan holda, uning tegishli bo'limi (oynasi) doirasida hisob-kitob qilish imkonini beradi.",
      "",
      "**Klassik masalasi: Har bir kategoriya bo'yicha eng oxirgi 3 ta buyurtmani topish:**",
      "```sql",
      "SELECT * FROM (",
      "    SELECT id, category_id, amount,",
      "           ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY created_at DESC) as rn",
      "    FROM orders",
      ") ranked",
      "WHERE ranked.rn <= 3;",
      "```",
      "- `ROW_NUMBER()`: Qat'iy ketma-ket raqam beradi (1, 2, 3).",
      "- `RANK()`: Bir xil qiymatlarga bir xil o'rin beradi, keyingisini tashlab ketadi (1, 2, 2, 4).",
      "- `DENSE_RANK()`: Qiymatlarni tashlab ketmasdan raqamlaydi (1, 2, 2, 3)."
    ],
    tip: "Senior dasturchi tahliliy hisobotlar, foydalanuvchilar reytingi va running total (o'sib boruvchi jami) hisoblashda subquery o'rniga Window Function ishlatadi."
  },
  {
    id: "iq-56",
    title: "Covering Index (Index-Only Scan) nima va nega SELECT * indeksdan to'liq foydalanishni to'xtatadi?",
    level: "middle",
    category: "database",
    categoryLabel: "Ma'lumotlar bazasi",
    skillSlug: "database-indexing",
    subskillId: "55.4",
    answer: [
      "**Covering Index** — so'rov talab qilgan **barcha** ustunlar (ham WHERE, ham SELECT dagi) aynan bitta indeks daraxtining o'zida mavjud bo'lgan holat.",
      "",
      "**Nima uchun bu muhim?**",
      "InnoDB'da Secondary Index (ikkilamchi indeks) qatorida faqat indekslangan ustunlar va Primary Key (`id`) saqlanadi. Jadvalning qolgan barcha ustunlari esa asosiy Clustered Index (jadval diski) da saqlanadi.",
      "- Agar so'rov `SELECT id, status FROM orders WHERE status = 'pending'` bo'lsa va indeks `(status, id)` bo'lsa, MySQL jadval diskiga (Clustered Index PK lookup) umuman bormaydi! Barcha javob to'g'ridan-to'g'ri RAM dagi indeksdan olinadi (**Index-Only Scan**).",
      "- Agar `SELECT *` qilinsa, MySQL indeksdan ID ni topgach, har bir qator uchun diskka borib butun qatorni o'qishga majbur bo'ladi (Random I/O / Bookmark Lookup) va so'rov 10 baravar sekinlashadi.",
      "",
      "**Tahlil:** `EXPLAIN` da `Extra` ustunida `Using index` ko'rinishi Covering Index ishlayotganini anglatadi."
    ],
    tip: "Highload loyihalarda API endpointlarida nega `SELECT *` emas, faqat kerakli ustunlarni so'rash shartligini Covering Index misolida tushuntiring."
  },
  {
    id: "iq-57",
    title: "Eloquent SoftDeletes katta jadvallarda so'rovlarni nega keskin sekinlashtiradi va qanday indeks bilan optimallashtiriladi?",
    level: "junior",
    category: "database",
    categoryLabel: "Ma'lumotlar bazasi",
    skillSlug: "eloquent-orm",
    subskillId: "13.4",
    answer: [
      "Laravel'dagi `SoftDeletes` xususiyati har bir so'rovga avtomatik `WHERE deleted_at IS NULL` shartini qo'shadi.",
      "",
      "**Muammo:**",
      "Agar sizda 10 millionlik `orders` jadvali bo'lsa va `INDEX (user_id)` indeksi bo'lsa, Laravel bajargan so'rov:",
      "`SELECT * FROM orders WHERE user_id = 42 AND deleted_at IS NULL;`",
      "MySQL `user_id` bo'yicha indeksni ishlatadi, ammo `deleted_at IS NULL` bo'lgan qatorlarni tekshirish uchun diskdagi barcha qatorlarni o'qib chiqishi kerak bo'ladi.",
      "",
      "**Yechim:**",
      "Muntazam so'raladigan ustunlar bilan birgalikda Composite Index qo'yish shart:",
      "`INDEX idx_orders_user_active (user_id, deleted_at)`.",
      "Yoki PostgreSQL da qisman indeks (Partial Index):",
      "`CREATE INDEX idx_orders_active ON orders(user_id) WHERE deleted_at IS NULL;` — bu indeks o'chirilmagan qatorlarni saqlaydi va hajmi juda kichik bo'ladi."
    ],
    tip: "PostgreSQL ishlatiladigan joylarda Partial Indexing imkoniyatini ta'kidlash katta ijobiy taassurot qoldiradi."
  },
  {
    id: "iq-58",
    title: "Zero-Downtime sharoitida millionlab qatorli jadvalda Foreign Key va NOT NULL ustun qo'shish qanday amalga oshiriladi?",
    level: "senior",
    category: "database",
    categoryLabel: "Ma'lumotlar bazasi",
    skillSlug: "database-optimization",
    subskillId: "15.20",
    answer: [
      "Production da 50 million qatorlik jadvalda `ALTER TABLE orders ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'new'` qilish butun jadvalni qulflaydi (Metadata Lock / Table Lock) va barcha HTTP so'rovlar navbatda tiqilib qoladi.",
      "",
      "**Xavfsiz qadamlar:**",
      "1. **Ustunni NULL qilib qo'shish:** Avval ustun `DEFAULT NULL` qilib qo'shiladi (MySQL 8 da bu oniy metadata o'zgarishi).",
      "2. **Orqa fonda ma'lumotlarni to'ldirish (Backfill):** Artisan buyrug'i orqali qismlarga (chunks) bo'lib eski qatorlar to'ldiriladi.",
      "3. **NOT NULL constraint qo'shish:** Hamma qator to'lib bo'lgach, xavfsiz `NOT NULL` qilinadi.",
      "4. **Foreign Key qo'shishda:** MySQL da `pt-online-schema-change` (Percona Toolkit) yoki `gh-ost` (GitHub Online Schema Tool) kabi vositalar jadvalning soyasini ochib, trigger yoki binlog orqali zero-downtime rejimida almashtiradi."
    ],
    tip: "Production database migratsiyalarida lock vaqtini hisobga olmaslik butun biznesni to'xtatib qo'yishi mumkinligini doim yodda tutish kerak."
  },

  // --- Redis & Caching ---
  {
    id: "iq-59",
    title: "Redis Sorted Sets (ZSET) yordamida Sliding Window Rate Limiter algoritmi qanday amalga oshiriladi?",
    level: "senior",
    category: "database",
    categoryLabel: "Kesh & Redis",
    skillSlug: "redis",
    subskillId: "12.1",
    answer: [
      "Oddiy Fixed Window Rate Limiter (masalan, daqiqasiga 60 ta) da 'chegara sakrashi' muammosi bor: foydalanuvchi 00:59 da 60 ta, 01:01 da yana 60 ta so'rov yuborsa, 2 soniya ichida 120 ta so'rov o'tib ketadi.",
      "",
      "**Sliding Window Rate Limiter (ZSET bilan):**",
      "- Redis Sorted Set da har bir elementning qiymati va **score** (ball) bo'ladi. Score sifatida joriy mikrosekund timestamp saqlanadi.",
      "",
      "**Algoritm (Atomik Pipeline yoki Lua script):**",
      "1. `ZREMRANGEBYSCORE key 0 (now - 60)`: So'nggi 60 soniyadan eski bo'lgan barcha so'rovlar o'chiriladi.",
      "2. `ZCARD key`: Oxirgi 60 soniya ichidagi so'rovlar soni olinadi.",
      "3. Agar son ruxsat berilgan limitdan (60 tadan) kam bo'lsa:",
      "   `ZADD key now now_uuid` qilib yangi so'rov qo'shiladi va `EXPIRE key 60` beriladi. So'rov qabul qilinadi.",
      "4. Aks holda so'rov rad etiladi (429 Too Many Requests)."
    ],
    tip: "Bu algoritm har qanday vaqt oralig'ida aniq siljuvchi oynani kafolatlaydi va API Gateway hamda to'lov tizimlarida standart hisoblanadi."
  },
  {
    id: "iq-60",
    title: "Laravel Cache Tagging (Cache::tags) qanday ishlaydi va nima uchun Redis kesh teglarini me'yordan ortiq ishlatish sekinlashuvga olib keladi?",
    level: "middle",
    category: "database",
    categoryLabel: "Kesh & Redis",
    skillSlug: "redis",
    subskillId: "12.5",
    answer: [
      "Cache Tags — bir nechta bog'langan kesh kalitlarini guruhlab, bir buyruq bilan barchasini tozalash imkoniyati: `Cache::tags(['people', 'authors'])->put('Anne', $data, 3600);`.",
      "",
      "**Ichki mexanizmi:**",
      "Redis'ning o'zida mahalliy teglar tizimi yo'q. Laravel har bir teg uchun alohida avtomatik versiya/ID yaratadi. Kalitga murojaat qilinganda teg versiyalari o'qiladi va kalit nomi bilan birlashtiriladi (`tag_version:key`).",
      "- Teg tozalanganda (`flush`), aslida millionlab kalitlar o'chirilmaydi, shunchaki tegning versiya raqami yangilanadi (eski kalitlar esa xotirada TTL tugaguncha qolib ketadi).",
      "",
      "**Kamchiligi:**",
      "Har bir o'qish va yozishda Laravel qo'shimcha teg kalitlarini o'qishi kerak bo'ladi (DB ga so'rovlar soni 2-3 barobarga oshadi). Keshda 'zombi' kalitlar ko'payadi va xotira tez to'ladi."
    ],
    tip: "Cache tags faqat Redis va Memcached da ishlaydi (File yoki Database cache drayverlarida ishlamaydi)."
  },
  {
    id: "iq-61",
    title: "Redis va Memcached o'rtasidagi asosiy arxitekturaviy farqlar nima va qachon sof Memcached tanlanadi?",
    level: "middle",
    category: "database",
    categoryLabel: "Kesh & Redis",
    skillSlug: "caching-strategies",
    subskillId: "54.1",
    answer: [
      "**1. Redis (Ko'p qirrali):**",
      "- Ma'lumotlar tuzilmalari serveri (Strings, Hashes, Lists, Sets, ZSets, Bitmaps, Streams).",
      "- Single-threaded event loop (asosiy xotira operatsiyalarida).",
      "- Persistence mavjud (RDB snapshot va AOF jurnali). Server o'chsa ham ma'lumot saqlanadi.",
      "- Pub/Sub, Lua script, Tranzaksiyalar, Replikatsiya.",
      "",
      "**2. Memcached (Oddiy va o'ta tez key-value):**",
      "- Faqat String key-value.",
      "- **Multi-threaded arxitektura**: Ko'p yadroli (Multi-core) serverlarda parallel ravishda CPU dan to'liq foydalana oladi.",
      "- Slab Allocator mexanizmi tufayli xotira defragmentatsiyasi deyarli nolga teng.",
      "- Persistence yo'q — faqat sof xotira keshi.",
      "",
      "**Qachon Memcached tanlanadi?**",
      "Faqat oddiy statik HTML/JSON qismlarini keshlovchi, 64-yadroli serverlar va yuzlab gigabayt xotiraga ega ulkan kesh klasterlarida."
    ],
    tip: "Oddiy ilovalar uchun 99% holatlarda Redis universal tanlov bo'ladi, lekin multi-threaded scaling kerak bo'lsa Memcached eslanadi."
  },
  {
    id: "iq-62",
    title: "Cache-Aside Pattern da Cache Invalidation va Dual-Write muammosi (DB va Kesh nomutanosibligi) qanday hal qilinadi?",
    level: "senior",
    category: "database",
    categoryLabel: "Kesh & Redis",
    skillSlug: "caching-strategies",
    subskillId: "54.4",
    answer: [
      "**Dual-Write muammosi:**",
      "Ma'lumot yangilanganda dasturchi ikkita amal qiladi: 1) Bazani yangilaydi, 2) Keshni yangilaydi (yoki o'chiradi).",
      "- Agar 1-amal bajarilib, 2-amal tarmoq xatosi tufayli yiqilsa, bazada yangi ma'lumot, keshda esa eski ma'lumot qolib ketadi (**Cache Inconsistency**).",
      "",
      "**Eng yaxshi yondashuv: Delete instead of Update (Keshni yangilash emas, o'chirish):**",
      "Bazaga yozilgandan so'ng keshga yangi qiymat yozilmaydi, balki `Cache::forget('key')` qilinadi. Keyingi o'qish so'rovi yangi ma'lumotni bazadan o'zi olib keshga qo'yadi.",
      "",
      "**DB Tranzaksiyalari bilan ishlash:**",
      "Keshni faqat tranzaksiya `COMMIT` bo'lgandan keyin o'chirish shart:",
      "```php",
      "DB::transaction(function () use ($user) {",
      "    $user->update([...]);",
      "    DB::afterCommit(fn () => Cache::forget(\"user:{$user->id}\"));",
      "});",
      "```"
    ],
    tip: "Agar kesh tranzaksiya ichida o'chirilsa va tranzaksiya rollback bo'lsa, yoki tranzaksiya hali tugamasdan boshqa so'rov keshga eski ma'lumotni qayta yozib qo'yishi mumkin."
  },

  // --- Queues & Event-Driven Architecture ---
  {
    id: "iq-63",
    title: "RabbitMQ Exchange turlari (Direct, Fanout, Topic, Headers) qanday farqlanadi va qachon qaysi biri tanlanadi?",
    level: "middle",
    category: "async",
    categoryLabel: "Navbatlar & Async",
    skillSlug: "rabbitmq",
    subskillId: "49.1",
    answer: [
      "RabbitMQ da ishlab chiqaruvchi (producer) xabarni to'g'ridan-to'g'ri navbatga (queue) yubormaydi. U doim **Exchange** ga yuboradi. Exchange esa marshrutlash kalitiga (routing key) qarab xabarni kerakli navbatlarga taqsimlaydi.",
      "",
      "**Exchange turlari:**",
      "1. **Direct Exchange**: Xabar routing key bo'yicha aynan bir xil kalit bilan bog'langan navbatga yuboriladi (masalan: `routing_key = 'pdf_generate'`).",
      "2. **Fanout Exchange (Broadcast)**: Routing key'ga e'tibor bermaydi. Kelgan xabarni o'ziga ulangan barcha navbatlarga nusxalab tarqatadi (masalan, foydalanuvchi ro'yxatdan o'tganda: email, sms, analitika navbatlarining barchasiga bir vaqtda ketadi).",
      "3. **Topic Exchange (Pattern matching)**: Shablon bo'yicha ko'p qirrali yo'naltirish (`*` bitta so'z, `#` bir nechta so'z). Masalan: `order.uz.paid` xabarini `order.*.paid` yoki `order.#` navbatlari tutib oladi.",
      "4. **Headers Exchange**: Routing key o'rniga xabar header'laridagi parametrlar bo'yicha filtrlaydi."
    ],
    tip: "Publish-Subscribe arxitekturasida nega Fanout yoki Topic exchange eng mos kelishini misol qilib keltiring."
  },
  {
    id: "iq-64",
    title: "Dead Letter Queue (DLQ) nima va qayta-qayta xato beruvchi zaharli xabarlar (Poison Messages) qanday boshqariladi?",
    level: "middle",
    category: "async",
    categoryLabel: "Navbatlar & Async",
    skillSlug: "queues-and-background-jobs",
    subskillId: "46.5",
    answer: [
      "**Poison Message (Zaharli xabar)** — tarkibidagi xato ma'lumot (masalan, noto'g'ri JSON, o'chirilgan foydalanuvchi) tufayli har safar worker uni olganda exception tashlaydigan xabar.",
      "- Agar retry cheksiz bo'lsa, workerlar faqat shu xabarni qayta-qayta bajarish bilan band bo'lib, butun navbat to'xtab qoladi.",
      "",
      "**Dead Letter Queue (DLQ) vazifasi:**",
      "- Ma'lum miqdordagi urinishdan keyin (masalan, 3 ta urinish) yiqilgan xabar asosiy navbatdan olib tashlanadi va maxsus **DLQ** (Laravel'da `failed_jobs` jadvali) ga yo'naltiriladi.",
      "- Asosiy navbat tiqilib qolmasdan o'z ishini davom ettiradi.",
      "- Dasturchilar DLQ ga tushgan xabarlarni Sentry/Telescope orqali tahlil qilib, kodni to'g'irlagach `php artisan queue:retry all` orqali qayta ishga tushirishadi."
    ],
    tip: "Monitoring tizimida (Prometheus/Grafana) DLQ dagi xabarlar soniga Alert qo'yish production xavfsizligining oltin qoidasidir."
  },
  {
    id: "iq-65",
    title: "Laravel Job Chaining va Job Batching farqi nima va batch ichida bitta job yiqilsa allowFailures qanday ishlaydi?",
    level: "junior",
    category: "async",
    categoryLabel: "Navbatlar & Async",
    skillSlug: "queues-and-background-jobs",
    subskillId: "46.8",
    answer: [
      "**1. Job Chaining (`Bus::chain([JobA, JobB, JobC])`):**",
      "- **Ketma-ket ijro:** JobB faqat JobA muvaffaqiyatli tugagandagina ishga tushadi.",
      "- Agar zanjirdagi bitta job yiqilsa, butun zanjir to'xtatiladi va qolgan joblar bajarilmaydi.",
      "",
      "**2. Job Batching (`Bus::batch([Job1, Job2, ... Job100])`):**",
      "- **Parallel ijro:** 100 ta job bir vaqtning o'zida parallel ishlaydigan workerlar tomonidan bo'lib olinadi.",
      "- Batch progressini kuzatish mumkin: `batch()->progress()` (masalan, 65% bajarildi).",
      "- `then()`, `catch()`, `finally()` callbacklari mavjud.",
      "",
      "**allowFailures() parametri:**",
      "Standart holatda batch ichidagi bitta job yiqilsa, batch 'bekor qilingan' deb belgilanadi. Agar `Bus::batch(...)->allowFailures()->dispatch()` qilinsa, bitta xato boshqa parallel joblarni to'xtatmaydi, barchasi oxirigacha bajariladi."
    ],
    tip: "Batching holati ma'lumotlar bazasida (`job_batches` jadvali) saqlanishini va server restart bo'lganda ham o'z holatini yo'qotmasligini eslatib o'ting."
  },
  {
    id: "iq-66",
    title: "Event Sourcing va CQRS nima va ular bank/moliya tizimlarida nima uchun oddiy CRUD o'rniga tanlanadi?",
    level: "lead",
    category: "architecture",
    categoryLabel: "Arxitektura",
    skillSlug: "event-driven-architecture",
    subskillId: "48.1",
    answer: [
      "**Oddiy CRUD yondashuvi:**",
      "Jadvalda faqat joriy holat saqlanadi: `UPDATE accounts SET balance = 500 WHERE id = 1`. Tarix va balans qanday qilib 500 bo'lib qolgani yo'qoladi.",
      "",
      "**Event Sourcing (Hodisalar jurnali):**",
      "- Holatni o'zgartirish o'rniga barcha bo'lib o'tgan o'zgarmas hodisalar (Events) saqlanadi: `AccountCreated`, `MoneyDeposited (+1000)`, `MoneyWithdrawn (-500)`.",
      "- Joriy balans — bu barcha hodisalarni noldan qayta o'qish (Replay) natijasidir.",
      "- Hech qanday ma'lumot o'chirilmaydi yoki update qilinmaydi (Append-Only Log). Mukammal audit va xatolarni istalgan o'tgan vaqt nuqtasiga qaytarish (Time travel debugging) mumkin.",
      "",
      "**CQRS (Command Query Responsibility Segregation):**",
      "- Hodisalarni yozish (Command) alohida modelda, tezkor o'qish (Query) esa oldindan hisoblangan tayyor jadvallarda (Projections) ajratiladi."
    ],
    tip: "Lead sifatida Event Sourcing tizim murakkabligini keskin oshirishini (Eventual Consistency, Versioning) va faqat audit o'ta muhim bo'lgan sohalardagina oqlanishini ta'kidlang."
  },

  // --- Security & Web Protection ---
  {
    id: "iq-67",
    title: "JWT (JSON Web Token) da Refresh Token Rotation va Blacklist mexanizmlari qanday ishlaydi?",
    level: "middle",
    category: "security",
    categoryLabel: "Xavfsizlik",
    skillSlug: "jwt",
    subskillId: "22.1",
    answer: [
      "JWT stateless bo'lgani sababli, token chiqarilgandan so'ng uni server tomonidan bekor qilish (revoke) qiyin.",
      "",
      "**Xavfsiz arxitektura:**",
      "1. **Access Token:** Muddati juda qisqa bo'ladi (10-15 daqiqa). API so'rovlarda ishlatiladi.",
      "2. **Refresh Token:** Muddati uzoq (14-30 kun). DB yoki Redis da saqlanadi. Faqat yangi access token olishda ishlatiladi.",
      "",
      "**Refresh Token Rotation (Rotatsiya):**",
      "- Har safar refresh token ishlatilib yangi juftlik olinganda, eski refresh token bekor qilinadi va yangi bir martalik refresh token beriladi.",
      "- **Xavfsizlik kafolati:** Agar tajovuzkor eski refresh tokenni o'g'irlab ishlatishga urinsa, server token allaqachon ishlatilganini sezadi (Reuse Detection) va o'g'irlik yuz bergan deb hisoblab, ushbu foydalanuvchining barcha sessiyalarini darhol bekor qiladi.",
      "",
      "**Blacklist (Qora ro'yxat):** Logout qilingan access tokenlar muddati tugaguncha Redis da qisqa muddat saqlanadi."
    ],
    tip: "Intervyuda access tokenni uzoq muddatli (masalan, 30 kun) qilish xavfsizlikka zid ekanligini, doim qisqa Access + aylanma Refresh token juftligi kerakligini ayting."
  },
  {
    id: "iq-68",
    title: "CORS (Cross-Origin Resource Sharing) xatosi nima sababdan yuzaga keladi va Preflight (OPTIONS) so'rovi qachon yuboriladi?",
    level: "junior",
    category: "security",
    categoryLabel: "Xavfsizlik",
    skillSlug: "http-https",
    subskillId: "50.1",
    answer: [
      "**CORS nima:** Brauzerning **Same-Origin Policy** xavfsizlik qoidasiga ko'ra, bitta domendagi frontend (`frontend.uz`) boshqa domendagi API ga (`api.uz`) ruxsatsiz so'rov yuborishi taqiqlanadi. CORS — server ruxsat bergan domenlar ro'yxatidir.",
      "",
      "**Preflight (OPTIONS) so'rovi:**",
      "Agar so'rov 'oddiy so'rov' (simple request) bo'lmasa (masalan, `Content-Type: application/json` yoki maxsus sarlavhalar `Authorization: Bearer` bo'lsa, yoki `PUT/DELETE` metodlari ishlatilsa):",
      "1. Brauzer asosiy so'rovdan oldin serverga avtomatik **`OPTIONS`** so'rovini yuboradi.",
      "2. Server javobida `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers` sarlavhalarini qaytarishi shart.",
      "3. Faqat server ruxsat bersagina, brauzer haqiqiy `POST/GET` so'rovini amalga oshiradi.",
      "",
      "Laravel'da bu `config/cors.php` va `HandleCors` middleware orqali boshqariladi."
    ],
    tip: "CORS bu serverning emas, aynan brauzerning xavfsizlik filtri ekanligini (Postman yoki curl orqali CORS xatosi chiqmasligini) eslatib o'tish chuqur tushunchani ko'rsatadi."
  },
  {
    id: "iq-69",
    title: "IDOR (Insecure Direct Object Reference) zaifligi nima va Laravel Policies & Gates undan qanday himoyalaydi?",
    level: "junior",
    category: "security",
    categoryLabel: "Xavfsizlik",
    skillSlug: "web-application-security",
    subskillId: "51.1",
    answer: [
      "**IDOR zaifligi:**",
      "Foydalanuvchi tizimga kirgan, lekin boshqa birovning resursiga uning ID sini almashtirish orqali kira oladi.",
      "Masalan: `GET /invoices/105` manzilida foydalanuvchi o'z hisob-fakturasini ko'radi. Agar u URL dagi ID ni `106` ga o'zgartirsa va controller faqat `Invoice::findOrFail($id)` qilib tekshirmasdan ko'rsatsa — bu IDOR zaifligidir.",
      "",
      "**Himoya yo'llari:**",
      "1. **Doim joriy foydalanuvchiga bog'lash:** `$request->user()->invoices()->findOrFail($id);`",
      "2. **Laravel Policy:**",
      "```php",
      "public function view(User $user, Invoice $invoice): bool {",
      "    return $user->id === $invoice->user_id;",
      "}",
      "// Controllerda:",
      "$this->authorize('view', $invoice);",
      "```"
    ],
    tip: "IDOR OWASP API Security Top 10 ro'yxatida birinchi o'rinlarda turadi. Shuning uchun ommaviy API larda raqamli ID lar o'rniga UUID yoki ULID ishlatish ham foydalidir."
  },
  {
    id: "iq-70",
    title: "SQL Injection'ning ikkinchi darajali turi (Second-Order SQLi) nima va PDO Prepared Statements unda qanday ishlaydi?",
    level: "senior",
    category: "security",
    categoryLabel: "Xavfsizlik",
    skillSlug: "web-application-security",
    subskillId: "51.5",
    answer: [
      "**Second-Order SQL Injection:**",
      "- Birinchi bosqichda zararli kod bazaga xavfsiz saqlanadi (masalan, foydalanuvchi ismiga `admin'--` deb kiritadi). Parametrlangan so'rov ishlatilgani uchun bu vaqtda xatolik yuz bermaydi va bazaga yoziladi.",
      "- **Xavf ikkinchi bosqichda boshlanadi:** Keyinchalik tizimning boshqa qismi (masalan, hisobot yaratish, admin panel yoki background job) bazadan shu ismni o'qiydi va uni boshqa SQL so'roviga xom (concatenation / `DB::raw()`) birlashtiradi. Natijada ikkinchi so'rov buziladi!",
      "",
      "**Qoida:**",
      "Hech qachon 'Ma'lumot bizning bazamizdan chiqdi, demak u 100% xavfsiz' deb o'ylamaslik kerak. Baza ichidan olingan ma'lumot ham doim boshqa so'rovlarga faqat Prepared Statements parametrlari orqali uzatilishi shart."
    ],
    tip: "Senior dasturchi sifatida tashqi so'rovlar kabi ichki ma'lumotlar bazasi yozuvlariga ham Zero-Trust (hech kimga ishonmaslik) prinsipi bilan qarashni ko'rsating."
  },
  {
    id: "iq-71",
    title: "Data Encryption: Laravel modelida Asymmetric vs Symmetric shifrlash va encrypted cast qanday ishlaydi?",
    level: "junior",
    category: "security",
    categoryLabel: "Xavfsizlik",
    skillSlug: "web-application-security",
    subskillId: "51.8",
    answer: [
      "**Symmetric Encryption (Simmetrik - AES-256-CBC):**",
      "- Shifrlash va qayta o'qish uchun bitta maxfiy kalit (`APP_KEY`) ishlatiladi.",
      "- Laravel'dagi `Crypt::encryptString()` va `casts => ['passport' => 'encrypted']` simmetrik ishlaydi. Ma'lumot bazaga shifrlangan satr ko'rinishida yoziladi va o'qilganda avtomatik ochiladi.",
      "- Kamchiligi: Agar server va `.env` fayl qo'lga tushsa, tajovuzkor butun bazani ochib oladi.",
      "",
      "**Asymmetric Encryption (Asimmetrik - RSA / Public-Private Key):**",
      "- Ochiq kalit (Public key) faqat ma'lumotni shifrlay oladi, lekin ocha olmaydi. Maxfiy kalit (Private key) esa alohida xavfsiz serverda yoki HSM (Hardware Security Module) da saqlanadi.",
      "- Masalan, foydalanuvchi kredit kartasini kiritganda web server faqat public key bilan shifrlaydi va bazaga yozadi. Web server buzilsa ham, o'g'irlangan ma'lumotlarni web server o'zi ham ocha olmaydi."
    ],
    tip: "Parollarni shifrlash (encrypt) emas, bir tomonlama xesh qilish (`Hash::make` - bcrypt/argon2id) kerakligini doim ajratib ko'rsating."
  },

  // --- Architecture & System Design ---
  {
    id: "iq-72",
    title: "CAP teoremaviy tahlili: Taqsimlangan tizimlarda nega bir vaqtning o'zida ham Consistency, ham Availability bo'lishi mumkin emas?",
    level: "senior",
    category: "architecture",
    categoryLabel: "Arxitektura",
    skillSlug: "system-design",
    subskillId: "66.1",
    answer: [
      "**CAP Teoremasi** ga ko'ra, har qanday taqsimlangan (bir nechta serverli) ma'lumotlar tizimi faqat 3 ta xususiyatdan 2 tasini to'liq kafolatlashi mumkin:",
      "- **C (Consistency)**: Har bir o'qish so'rovi eng oxirgi yozilgan yangi ma'lumotni qaytaradi.",
      "- **A (Availability)**: Har bir ishlayotgan tugun (node) xato bermasdan doim javob qaytaradi.",
      "- **P (Partition Tolerance)**: Serverlar orasidagi tarmoq uzilib qolsa ham (tarmoq bo'linishi), tizim ishlashda davom etadi.",
      "",
      "**Haqiqiy dunyodagi tanlov:**",
      "Tarmoq uzilishi (P) har qanday taqsimlangan tizimda muqarrar sodir bo'ladi. Demak, tarmoq bo'linganda biz yo CP ni, yo AP ni tanlashga majburmiz:",
      "- **CP (Consistency + Partition Tolerance)**: Agar ikkita server o'rtasida aloqa uzilsa, tizim eski ma'lumot chiqmasligi uchun yangi so'rovlarga xato qaytaradi (Availability qurbon qilinadi). Masalan: Bank hisoblari, MongoDB strict rejimida.",
      "- **AP (Availability + Partition Tolerance)**: Tizim doim javob qaytaradi, lekin ba'zi foydalanuvchilar bir necha soniya eski ma'lumotni ko'rib turishi mumkin (Eventual Consistency). Masalan: Ijtimoiy tarmoq layklari, DNS, Cassandra."
    ],
    tip: "Tizim dizayni intervyusida 'Mening tizimim 100% Consistent va 100% Available' deb xato qilmang, doim biznes talabiga qarab murosa (trade-off) qilinishini tushuntiring."
  },
  {
    id: "iq-73",
    title: "Liskov Substitution Principle (LSP) nima va voris sinfda qanday xatolar LSP ning buzilishiga olib keladi?",
    level: "junior",
    category: "architecture",
    categoryLabel: "Arxitektura",
    skillSlug: "solid-principles",
    subskillId: "4.3",
    answer: [
      "**LSP ta'rifi:** Dasturdagi ota sinf ob'ektlari o'rniga uning istalgan voris (child) sinf ob'ektlari qo'yilganda, dasturning to'g'ri ishlashi va mantiqiy xatti-harakati buzilmasligi shart.",
      "",
      "**LSP ning klassik buzilish holatlari:**",
      "1. **Vorisda yangi Exception otish:** Ota sinf oddiy `true/false` qaytaradi, ammo voris sinf kutilmaganda `PaymentFailedException` otadi.",
      "2. **Metod ichini bo'sh qoldirish:** Voris sinf ota sinfdagi metodni bo'sh `return null;` qilib qo'yadi yoki `throw new NotImplementedException();` yozadi (masalan, `Ostrich extends Bird` qilib, `fly()` metodida exception otish).",
      "3. **Oldindan shartlarni (Preconditions) kuchaytirish:** Ota sinf string qabul qiladi, voris esa faqat 10 belgidan uzun string talab qiladi.",
      "4. **Natijaviy shartlarni (Postconditions) zaiflashtirish:** Ota sinf musbat son qaytarishni va'da qiladi, voris esa manfiy son qaytarib yuboradi."
    ],
    tip: "Agar voris sinf ichida biror metodni o'chirib qo'yish yoki exception otish zarurati tug'ilsa, bu merosxo'rlik (Inheritance) noto'g'ri tanlanganini va Kompozitsiya (Composition over inheritance) kerakligini bildiradi."
  },
  {
    id: "iq-74",
    title: "Database Connection Pooling nima va nega 10 000 ta parallel PHP jarayoni MySQL ga to'g'ridan-to'g'ri ulana olmaydi (ProxySQL / PgBouncer)?",
    level: "senior",
    category: "database",
    categoryLabel: "Ma'lumotlar bazasi",
    skillSlug: "database-optimization",
    subskillId: "15.1",
    answer: [
      "**Muammo:**",
      "MySQL da har bir yangi ulanish (connection) alohida thread ochadi va kamida 2-8 MB RAM egallaydi. Agar yuqori yuklamada 5 000 ta parallel PHP-FPM jarayoni birdaniga MySQL ga ulansa, MySQL xotira yetishmovchiligidan (OOM) qulaydi yoki `Too many connections` xatosi beradi.",
      "",
      "**Connection Pooler (ProxySQL / PgBouncer) vazifasi:**",
      "- PHP jarayonlari va MySQL o'rtasida turuvchi aqlli vositachi.",
      "- Minglab PHP jarayonlari ProxySQL ga ulanadi, ProxySQL esa MySQL bilan faqat 100-200 ta doimiy faol ulanishlar pulini (pool) ushlab turadi.",
      "- PHP so'rovini bajarib bo'lishi bilanoq ulanish darhol boshqa PHP jarayoniga beriladi (Multiplexing).",
      "- Natijada MySQL xotirasi tejladi va ulanish o'rnatishdagi TCP handshake kechikishlari yo'qoladi."
    ],
    tip: "Yuqori yuklamali Laravel loyihalarida DB ulanishlarini to'g'ri boshqarish (Connection Pooling) arxitekturaning eng muhim bo'g'inidir."
  },
  {
    id: "iq-75",
    title: "Circuit Breaker Pattern nima va tashqi sekinlashgan servislarning butun ilovani qulatishini qanday to'xtatadi?",
    level: "senior",
    category: "architecture",
    categoryLabel: "Arxitektura",
    skillSlug: "software-architecture",
    subskillId: "61.5",
    answer: [
      "**Muammo:**",
      "Bizning ilova tashqi SMS yoki To'lov API siga so'rov yuboradi. Agar o'sha tashqi servis qulasa yoki har bir so'rovga 30 soniya javob bermay tiqilib qolsa, bizning barcha PHP workerlarimiz kutish bilan band bo'lib qoladi va natijada butun sayt boshqa foydalanuvchilar uchun ham to'xtaydi (Cascading Failure).",
      "",
      "**Circuit Breaker (Avtomatik saqlagich) 3 ta holati:**",
      "1. **Closed (Yopiq - Oddiy rejim):** So'rovlar tashqi servisga odatdagidek o'tadi. Xatolar hisoblab boriladi.",
      "2. **Open (Ochiq - Zanjir uzilgan):** Agar xatolar miqdori limitdan oshsa (masalan, 1 daqiqada 50% so'rov timeout bo'lsa), zanjir ochiladi. Keyingi barcha so'rovlar tashqi servisga bormasdan, darhol lokal zaxira javobni (Fallback) qaytaradi. Tashqi servis yuklamadan xalos bo'ladi.",
      "3. **Half-Open (Yarim ochiq):** Ma'lum vaqt o'tgach (masalan, 30 soniya), tizim sinov tariqasida bir nechta so'rovni o'tkazib ko'radi. Agar ular muvaffaqiyatli bo'lsa, zanjir yana Yopiq holatga qaytadi."
    ],
    tip: "Guzzle yoki Laravel HTTP Client'da doim qat'iy timeout belgilash (`Http::timeout(3)`) Circuit Breaker'ning birinchi qadamidir."
  },
  {
    id: "iq-76",
    title: "12-Factor App metodologiyasi nima va Laravel loyihalarida uning eng muhim qoidalari qanday aks etadi?",
    level: "lead",
    category: "architecture",
    categoryLabel: "Liderlik va Arxitektura",
    skillSlug: "software-architecture",
    subskillId: "61.8",
    answer: [
      "**The Twelve-Factor App** — bulutda (Cloud-native), Docker va Kubernetes muhitida ishonchli, masshtablanuvchi ilovalar yaratish metodologiyasi.",
      "",
      "**Laravel'dagi eng muhim prinsiplari:**",
      "- **Config (Konfiguratsiyani muhitda saqlash):** Kod ichida konfiguratsiya yozilmaydi, faqat `.env` orqali uzatiladi (`env('DB_HOST')`).",
      "- **Backing Services (Bog'liq xizmatlar resurs sifatida):** MySQL, Redis, SQS, S3 ilova uchun alohida tashqi resurs hisoblanadi va faqat URL/sozlamalar orqali ulanadi.",
      "- **Stateless Processes (Holatsiz jarayonlar):** Server xotirasida hech narsa saqlanmaydi (fayllar S3 ga, sessiyalar Redis ga). Istalgan serverni o'chirib, yangisini ochish mumkin.",
      "- **Disposability (Tez ishga tushish va xavfsiz to'xtash):** Jarayonlar tez start oladi va `SIGTERM` olganda ishni xavfsiz yakunlaydi (Graceful shutdown).",
      "- **Logs as Event Streams:** Ilova log faylini o'zi boshqarmaydi, shunchaki `stdout` (Docker log) ga chiqaradi."
    ],
    tip: "Lead dasturchi o'z ilovasini 12-factor tamoyillari bo'yicha baholay olishi uning zamonaviy DevOps va Cloud arxitekturasini chuqur tushunishini ko'rsatadi."
  },

  // --- Testing & Quality Assurance ---
  {
    id: "iq-77",
    title: "PHPStan / Larastan da Level 9 va Type Coverage nima va ular runtime Type Error xatolarini qanday 0 ga tushiradi?",
    level: "middle",
    category: "testing",
    categoryLabel: "Testlash",
    skillSlug: "phpstan",
    subskillId: "31.1",
    answer: [
      "PHP dinamik til bo'lgani sababli, `Call to a member function on null` xatolari ko'pincha faqat production da foydalanuvchi ma'lumot kiritgandagina aniqlanadi.",
      "",
      "**PHPStan darajalari (Levels 0-9):**",
      "- Level 0-5: Asosiy sintaksis, mavjud bo'lmagan metodlar va noto'g'ri argumentlar sonini tekshiradi.",
      "- Level 8: `nullable` tiplarni qat'iy tekshiradi. Agar metod `?User` qaytarsa, siz `$user->name` deb to'g'ridan-to'g'ri o'qiy olmaysiz — avval `if ($user !== null)` tekshirishni majbur qiladi.",
      "- Level 9: `mixed` tiplarni to'liq taqiqlaydi. Har bir massiv tarkibi (`array<string, int>`) va har bir o'zgaruvchining aniq tipi bo'lishi shart.",
      "",
      "**Natija:** CI/CD pipeline'da PHPStan Level 8+ o'rnatilgan bo'lsa, deyarli barcha 'null pointer' va tip xatoliklari kod deploy qilinmasdan oldin aniqlanadi."
    ],
    tip: "Larastan Laravel'ning dinamik 'sehrini' (Eloquent magic methods, Facades) to'liq tushunuvchi PHPStan kengaytmasi ekanligini ayting."
  },
  {
    id: "iq-78",
    title: "Mutation Testing (Infection PHP) nima va nima uchun 100% Code Coverage testlarning sifatli ekanligini kafolatlamaydi?",
    level: "senior",
    category: "testing",
    categoryLabel: "Testlash",
    skillSlug: "pest",
    subskillId: "26.1",
    answer: [
      "**Muammo:**",
      "Dasturchi funksiyani test qilib 100% Line Coverage olishi mumkin, lekin test ichida hech qanday qat'iy `assert` yozmagan bo'lishi mumkin (shunchaki funksiyani chaqirib qo'ygan). Kod ishlaydi, qamrov 100%, ammo test hech narsani himoya qilmaydi.",
      "",
      "**Mutation Testing qanday ishlaydi:**",
      "Infection vositasi sizning kodingizga ataylab mayda xatolar (Mutatsiyalar) kiritadi:",
      "- `>` ni `<` ga o'zgartiradi.",
      "- `true` ni `false` qiladi.",
      "- `+` ni `-` qiladi.",
      "- Qatordagi kodni o'chirib tashlaydi.",
      "",
      "So'ng sizning testlaringizni ishga tushiradi:",
      "- Agar testlar yiqilsa: **Mutant Killed** (A'lo! Test xatoni ushladi).",
      "- Agar testlar yashil bo'lib o'tib ketsa: **Mutant Escaped** (Xavfli! Kodingiz o'zgardi, lekin testingiz buni sezmadi).",
      "- **Mutation Score Indicator (MSI)** — testlarning haqiqiy sifat o'lchovidir."
    ],
    tip: "Intervyuda: 'Code coverage faqat qaysi kod ishga tushganini ko'rsatadi, Mutation testing esa testlar qanchalik sezgir ekanligini o'lchaydi' degan farqni ko'rsating."
  },
  {
    id: "iq-79",
    title: "Nginx FastCGI Buffer Tuning: fastcgi_buffers to'g'ri sozlanmasa, katta javoblarda 'upstream sent too big header' xatosi nima sababdan chiqadi?",
    level: "senior",
    category: "devops",
    categoryLabel: "DevOps & Server",
    skillSlug: "nginx",
    subskillId: "41.5",
    answer: [
      "PHP-FPM va Nginx o'rtasida FastCGI protokoli ishlaydi. PHP katta JSON javob yoki ko'p sarlavhalar (masalan, katta cookie fayllar) qaytarganda, Nginx bu ma'lumotni o'zining RAM dagi buferiga joylashtirishi kerak.",
      "",
      "**Standart muammo:**",
      "Nginx default buferi kichik (odatda 4k yoki 8k). Agar PHP qaytargan HTTP sarlavhalari buferdan oshib ketsa, Nginx `502 Bad Gateway` beradi va logda `upstream sent too big header while reading response header from upstream` yoziladi.",
      "- Agar javob tanasi buferdan oshsa, Nginx uni xotirada emas, diskdagi vaqtinchalik faylga (`fastcgi_temp`) yozib oladi, bu esa disk I/O ni oshirib tezlikni sekinlashtiradi.",
      "",
      "**Yechim:**",
      "```nginx",
      "fastcgi_buffer_size 32k;",
      "fastcgi_buffers 16 16k;",
      "fastcgi_busy_buffers_size 64k;",
      "```"
    ],
    tip: "Bu savol real yuqori yuklamali API serverlarni sozlagan dasturchilar uchun klassik imtihondir."
  },
  {
    id: "iq-80",
    title: "Canary Releases va Feature Flags (Laravel Pennant): Yangi funksiyani productionga nol xavf bilan qanday chiqaramiz?",
    level: "lead",
    category: "architecture",
    categoryLabel: "Liderlik va Arxitektura",
    skillSlug: "laravel",
    subskillId: "2.34",
    answer: [
      "Katta tizimlarda barcha foydalanuvchilar uchun yangi to'lov yoki buyurtma tizimini birdaniga yoqish (Big Bang Release) yuqori xavf tug'diradi.",
      "",
      "**Feature Flags (Laravel Pennant) yechimi:**",
      "- Kod oldindan productionga deploy qilinadi, lekin funksiya bayrog'i (feature flag) o'chiq bo'ladi.",
      "- **Bosqichma-bosqich yoqish (Canary / Percentage rollout):**",
      "```php",
      "Feature::define('new-checkout', fn (User $user) => ",
      "    $user->isInternalBetaTester() || ($user->id % 10 === 0) // 10% foydalanuvchilarga",
      ");",
      "",
      "if (Feature::active('new-checkout')) {",
      "    return $this->newCheckoutFlow();",
      "}",
      "return $this->legacyCheckoutFlow();",
      "```",
      "- Agar xatoliklar (Sentry) ko'payib ketsa, qaytadan deploy qilish shart emas — shunchaki Feature Flag 1 soniyada o'chiriladi (Kill Switch)."
    ],
    tip: "Lead dasturchi deploy jarayonini biznes risklaridan ajratish (Decoupling deployment from release) uchun Feature Flag'lar madaniyatini joriy qiladi."
  },

  // --- Yangi: Production Incidents, System Design, PHP 8.4, Laravel 11 ---
  {
    id: "iq-81",
    title: "Incident Triage: Productionda MySQL 'Too many connections' xatosi berib sayt quladi — birinchi 5 daqiqadagi audit va yechimlar qanday bo'lishi kerak?",
    level: "senior",
    category: "database",
    categoryLabel: "Ma'lumotlar bazasi",
    skillSlug: "mysql",
    subskillId: "10.14",
    answer: [
      "Ushbu xato MySQL serveridagi faol ulanishlar soni `max_connections` chegarasidan oshib ketganida yuz beradi.",
      "",
      "**Birinchi 5 daqiqadagi harakatlar rejasi:**",
      "1. **Tezkor kirish (Emergency Login):** MySQL admin ulanish uchun 1 ta zaxira port qoldiradi (`SUPER` yoki `CONNECTION_ADMIN` priviligiyasi bor foydalanuvchi kirishi mumkin).",
      "2. **Ulanishlar manbasini aniqlash:**",
      "```sql",
      "SHOW FULL PROCESSLIST;",
      "-- yoki qaysi hostdan qancha ulanish kelayotganini guruhlash:",
      "SELECT SUBSTRING_INDEX(host, ':', 1) AS ip, count(*) FROM information_schema.processlist GROUP BY ip;",
      "```",
      "3. **Uzoq qotib qolgan (Locked/Sleeping) tranzaksiyalarni o'ldirish:** Uzoq vaqt `Sleep` yoki `Waiting for table metadata lock` holatida turgan ulanishlarni `KILL <process_id>;` bilan to'xtatish.",
      "4. **PHP-FPM va Web server ulanishlarini cheklash:** Agar 100 ta PHP-FPM worker har biri alohida doimiy (persistent) ulanish ochgan bo'lsa, PHP-FPM `pm.max_children` sozlamasini vaqtinchalik kamaytirish.",
      "5. **Tizimli yechim:** Ulanishlar sonini sun'iy oshirish o'rniga (bu xotirani to'ldirib OOM keltirib chiqarishi mumkin), ulanishlar puli (Connection Pooling - ProxySQL yoki PgBouncer) joriy qilinadi va ilovadagi keraksiz `persistent connections` o'chiriladi."
],
    tip: "Intervyuda darhol `max_connections = 5000` qilib qo'yaman demang — bu har bir ulanishga RAM ajratilishi sababli serverni o'ldiradi. Processlist tahlili va Connection Pooler haqida gapirish Senior darajasini ko'rsatadi."
  },
  {
    id: "iq-82",
    title: "Incident Triage: Laravel Queue Worker'lari Out of Memory (OOM) bo'lib to'xtab qolyapti. Sababi nima va qanday bartaraf etiladi?",
    level: "senior",
    category: "async",
    categoryLabel: "Navbatlar & Async",
    skillSlug: "queues-and-background-jobs",
    subskillId: "46.12",
    answer: [
      "PHP uzoq ishlaydigan jarayonlar (Long-running worker) uchun mo'ljallanmagan — bitta worker minglab vazifalarni ketma-ket bajarganda xotira sizib chiqishi (Memory Leak) to'planib boradi.",
      "",
      "**Eng ko'p uchraydigan sabablar:**",
      "- **DB Query Log to'planishi:** Worker ichida `DB::enableQueryLog()` yoqilgan bo'lsa, har bir SQL so'rov massivga yozilib xotirani to'ldiradi.",
      "- **Job obyektlarida statik xotira yoki Circular Reference:** Statik xususiyatlarda to'planadigan ma'lumotlar yoki `Event::listen` larning takroriy ro'yxatdan o'tishi.",
      "- **Katta Eloquent Collection'larni to'liq xotiraga yuklash:** `User::all()` o'rniga `chunk()` yoki `lazy()` ishlatilmaganligi.",
      "",
      "**Bartaraf etish choralari:**",
      "```bash",
      "# 1. Worker har N ta vazifadan keyin o'zini toza qayta ishga tushirishi kerak:",
      "php artisan queue:work --max-jobs=1000 --max-time=3600 --memory=256",
      "```",
      "- Agar xotira sarfi bitta job ichida keskin oshsa: `gc_collect_cycles()` chaqirish yoki Eloquent o'rniga DB Query Builder va DTO ishlatish."
],
    tip: "Supervisor yoki Horizon bilan `--max-jobs` va `--max-time` bayroqlarini ishlatish workerlarning sog'lom ishlashining oltin qoidasidir."
  },
  {
    id: "iq-83",
    title: "Incident Triage: MySQL serverda CPU 100% ga chiqib ketdi. Slow Query Log va EXPLAIN orqali muammoni qanday topasiz?",
    level: "middle",
    category: "database",
    categoryLabel: "Ma'lumotlar bazasi",
    skillSlug: "database-optimization",
    subskillId: "15.8",
    answer: [
      "100% CPU odatda indekslanmagan katta jadvallarda to'liq skanerlash (Full Table Scan), keshlanmagan og'ir `ORDER BY / GROUP BY` yoki kartesian ko'paytmalar (unindexed JOINs) sababli yuzaga keladi.",
      "",
      "**Tashxis qo'yish ketma-ketligi:**",
      "1. `SHOW PROCESSLIST;` orqali ayni paytda eng ko'p `Time` sarflayotgan so'rovni ko'rish.",
      "2. **Slow Query Log tahlili:** `mysqldumpslow -s t /var/log/mysql/slow-query.log` orqali eng ko'p vaqt va satrlarni ko'rib chiqqan so'rovlarni ajratish.",
      "3. **EXPLAIN ANALYZE ishlatish:**",
      "```sql",
      "EXPLAIN ANALYZE SELECT * FROM orders WHERE status = 'paid' AND created_at >= '2026-01-01';",
      "```",
      "- Agar `type: ALL` bo'lsa — Full Table Scan.",
      "- Agar `rows: 2000000` va `filtered: 0.1%` bo'lsa — indeks yo'qligi sabab 2 mln qator tekshirilib, atigi 2000 tasi olingan.",
      "- `Using filesort` yoki `Using temporary` ko'rinsa — RAM yetishmay diskda vaqtinchalik jadval tuzilgan.",
      "4. **Yechim:** So'rovga mos kompozit indeks (`status, created_at`) yaratish yoki so'rovni denormalizatsiya qilingan jadval/Redis keshiga yo'naltirish."
],
    tip: "Senior muhandis so'rovning faqat o'tish vaqtiga emas, 'Rows Examined' (ko'rib chiqilgan qatorlar) va 'Rows Sent' nisbatiga qaraydi."
  },
  {
    id: "iq-84",
    title: "PHP 8.4: Property Hooks va Asymmetric Visibility nima va ular DTO hamda Domain Modellarni qanday o'zgartiradi?",
    level: "senior",
    category: "php",
    categoryLabel: "PHP tili",
    skillSlug: "php",
    subskillId: "1.34",
    answer: [
      "PHP 8.4 da kelgan **Property Hooks** va **Asymmetric Visibility** C# va Swift tillaridagi kabi xususiyatlarni qulay boshqarish imkonini beradi.",
      "",
      "**1. Asymmetric Visibility (Har xil o'qish/yozish ruxsati):**",
      "Xususiyatni tashqaridan o'qish mumkin (`public`), lekin uni faqat sinf ichidan o'zgartirish mumkin (`private(set)`):",
      "```php",
      "class Order {",
      "    public private(set) string $status = 'pending';",
      "    public function markAsPaid(): void { $this->status = 'paid'; }",
      "}",
      "$order = new Order();",
      "echo $order->status; // OK",
      "// $order->status = 'cancelled'; // Fatal error: Cannot modify private(set) property",
      "```",
      "",
      "**2. Property Hooks (get va set hooklar):**",
      "Ortiqcha boilerplate getter/setter metodlar yozmasdan xususiyatning o'zida validatsiya yoki hisoblash:",
      "```php",
      "class User {",
      "    public string $firstName;",
      "    public string $lastName;",
      "    public string $fullName {",
      "        get => \"{$this->firstName} {$this->lastName}\";",
      "        set (string $val) {",
      "            [$this->firstName, $this->lastName] = explode(' ', $val, 2);",
      "        }",
      "    }",
      "}",
      "```"
],
    tip: "Property Hooks DTO va Value Objectlarda o'nlab keraksiz getter va setter metodlarini yo'qotib, kodni ancha toza va o'qilishi oson qiladi."
  },
  {
    id: "iq-85",
    title: "PHP 8.4: Yangi array funksiyalari (array_find, array_all, array_any) qanday ishlaydi va ular kodni qanday soddalashtiradi?",
    level: "junior",
    category: "php",
    categoryLabel: "PHP tili",
    skillSlug: "php",
    subskillId: "1.28",
    answer: [
      "Oldin massiv ichidan birinchi mos keluvchi elementni topish yoki barcha elementlarning shartga mosligini tekshirish uchun `foreach` yoki `array_filter` ishlatilar edi.",
      "`array_filter()` butun massivni oxirigacha aylanib chiqar edi (Break qilmasdi), bu esa katta massivlarda samarasiz edi.",
      "",
      "**PHP 8.4 yechimlari:**",
      "- `array_find($arr, $callback)`: Shartni qanoatlantirgan birinchi elementni qaytaradi va aylanishni darhol to'xtatadi (Early Exit).",
      "- `array_find_key($arr, $callback)`: Birinchi mos element kalitini qaytaradi.",
      "- `array_any($arr, $callback)`: Hech bo'lmaganda 1 ta element shartga to'g'ri kelsa `true` qaytaradi.",
      "- `array_all($arr, $callback)`: Hamma elementlar shartga to'g'ri kelsagina `true` qaytaradi.",
      "",
      "```php",
      "$users = [['id' => 1, 'role' => 'user'], ['id' => 2, 'role' => 'admin']];",
      "$admin = array_find($users, fn($u) => $u['role'] === 'admin');",
      "$hasAdmin = array_any($users, fn($u) => $u['role'] === 'admin'); // true",
      "```"
],
    tip: "Bu funksiyalar C tilida yozilgani va birinchi topilgan joyida to'xtashi sababli PHP darajasidagi foreach siklidan ancha tezroq ishlaydi."
  },
  {
    id: "iq-86",
    title: "Laravel 11: Concurrency Facade nima va parallel amallarni bajarishda u qanday ishlatiladi?",
    level: "senior",
    category: "laravel",
    categoryLabel: "Laravel",
    skillSlug: "laravel",
    subskillId: "2.35",
    answer: [
      "Laravel 11 da bir vaqtning o'zida bir nechta mustaqil operatsiyalarni parallel (sinxron kutmasdan) bajarish uchun `Concurrency` fasadi taqdim etildi.",
      "",
      "**Muammo:** Masalan, bitta sahifa yuklanishida 3 ta tashqi API dan ma'lumot olish kerak: har biri 1 soniyadan vaqt olsa, ketma-ket chaqirilganda foydalanuvchi 3 soniya kutadi.",
      "",
      "**Concurrency bilan yechim:**",
      "```php",
      "use Illuminate\\Support\\Facades\\Concurrency;",
      "",
      "[$orders, $rates, $analytics] = Concurrency::run([",
      "    fn () => Http::get('https://api.crm.com/orders')->json(),",
      "    fn () => Http::get('https://api.bank.com/rates')->json(),",
      "    fn () => AnalyticsService::calculateMonthlyStats(),",
      "]);",
      "```",
      "- Laravel orqa fonda alohida PHP jarayonlari (Process driver) yoki Fork (agar CLI bo'lsa) orqali bularni parallel ishga tushiradi.",
      "- Umumiy bajarilish vaqti 3 soniya emas, balki eng uzun API javobi vaqtiga (~1 soniya) teng bo'ladi."
],
    tip: "Concurrency fasadidan faqat bir-biriga bog'liq bo'lmagan (mustaqil) I/O yoki hisoblash operatsiyalarida foydalanish tavsiya etiladi."
  },
  {
    id: "iq-87",
    title: "Laravel 11 ning Slim Application Skeleton tuzilishi: Http Kernel, Console Kernel va Middleware qayerga ko'chdi?",
    level: "junior",
    category: "laravel",
    categoryLabel: "Laravel",
    skillSlug: "laravel",
    subskillId: "2.35",
    answer: [
      "Laravel 11 dasturchilarga yanada ixcham va toza loyiha strukturasi taqdim etish maqsadida `app/Http/Kernel.php`, `app/Console/Kernel.php` va standart middleware papkalarini olib tashladi.",
      "",
      "**Yangi markazlashgan boshqaruv:** `bootstrap/app.php` fayli butun ilova middleware'lari, routing va exception handling'ini boshqaradi.",
      "",
      "```php",
      "// bootstrap/app.php",
      "return Application::configure(basePath: dirname(__DIR__))",
      "    ->withRouting(",
      "        web: __DIR__.'/../routes/web.php',",
      "        api: __DIR__.'/../routes/api.php',",
      "        commands: __DIR__.'/../routes/console.php',",
      "        health: '/up',",
      "    )",
      "    ->withMiddleware(function (Middleware $middleware) {",
      "        $middleware->alias(['auth.admin' => EnsureAdmin::class]);",
      "        $middleware->append(LogRequestTime::class);",
      "    })",
      "    ->withExceptions(function (Exceptions $exceptions) {",
      "        $exceptions->report(fn (PaymentException $e) => Log::critical($e));",
      "    })->create();",
      "```"
],
    tip: "Laravel 11 ga loyihani yangilash (upgrade) paytida eski Kernel.php strukturasini saqlab qolish ham mumkin, majburiy buzilish yo'q."
  },
  {
    id: "iq-88",
    title: "System Design: Flash-Sale paytida Ombor qoldig'ini (Stock) boshqarish: 50 000 odam 10 ta mahsulotga buyurtma berganda Overselling'dan qanday himoyalanamiz?",
    level: "senior",
    category: "architecture",
    categoryLabel: "Arxitektura & Tizim Dizayni",
    skillSlug: "system-design",
    subskillId: "66.10",
    answer: [
      "Agar har bir so'rov MySQL tranzaksiyasi ichida `SELECT ... FOR UPDATE` qilsa, 50 000 ta so'rov ma'lumotlar bazasida navbat hosil qilib, DB ni bir necha soniyada qulatadi (Row lock contention).",
      "",
      "**Senior High-Load Yechimi:**",
      "1. **Redis orqali omborni ajratish (In-Memory Reservation):**",
      "Ombor soni oldindan Redis ga joylanadi: `SET product:101:stock 10`.",
      "2. **Atomar Lua Script ishlatish:**",
      "```lua",
      "local stock = tonumber(redis.call('get', KEYS[1]))",
      "if stock and stock > 0 then",
      "    redis.call('decr', KEYS[1])",
      "    return 1 -- muvaffaqiyatli band qilindi",
      "else",
      "    return 0 -- mahsulot tugadi",
      "end",
      "```",
      "3. Lua skripti Redis ning Single-threaded tabiati tufayli mutlaqo atomar bajariladi (Race condition imkonsiz).",
      "4. Redis dan `1` olgan birinchi 10 kishining buyurtmasi Queue (RabbitMQ / SQS) ga jo'natiladi va MySQL ga asinxron yoziladi.",
      "5. Qolgan 49 990 ta so'rov ma'lumotlar bazasiga umuman tushmasdan, Redis dan 'Kechirasiz, mahsulot tugadi' xabari bilan 5 millisekundda qaytariladi."
],
    tip: "Bunday keyslarda 'Read-Heavy' va 'Write-Heavy' so'rovlarni ajratish, hamda MySQL ni so'rovlar bo'ronidan Redis bilan himoya qilish eng yaxshi arxitekturadir."
  },
  {
    id: "iq-89",
    title: "System Design: Kuniga 10 millionta Webhook qabul qiluvchi to'lov tizimi arxitekturasi qanday quriladi?",
    level: "senior",
    category: "architecture",
    categoryLabel: "Arxitektura & Tizim Dizayni",
    skillSlug: "system-design",
    subskillId: "66.12",
    answer: [
      "Kuniga 10 millionta webhook sekundiga o'rtacha 120-150 ta, pik paytida esa 1500+ ta so'rov demakdir. Har bir webhookni darhol biznes mantiq orqali qayta ishlash saytni qulatadi.",
      "",
      "**Bosqichma-bosqich arxitektura:**",
      "1. **Fast Ingestion (Tezkor qabul qilish):** Webhook qabul qiluvchi controller hech qanday og'ir ish (DB tekshirish, foydalanuvchiga xat jo'natish) qilmaydi. Faqat imzoni (HMAC) tekshiradi va xom ma'lumotni bufferga (Kafka / RabbitMQ / Redis Stream) tashlaydi.",
      "2. Darhol tashqi tizimga `200 OK` javob qaytaradi (to'lov provayderi kutib qolmasligi va qayta so'rov yubormasligi uchun).",
      "3. **Idempotency tekshiruvi:** Webhooklar tarmoq xatolari tufayli bir necha marta kelishi mumkin. Har bir webhookning `event_id` si Redis `SETNX` (yoki DB unique index) orqali tekshiriladi.",
      "4. **Workerlar oqimi:** Background workerlar navbatdagi ma'lumotlarni o'z tezligida o'qib, DB ga saqlaydi va kerakli biznes jarayonlarni ishga tushiradi.",
      "5. **Dead Letter Queue (DLQ):** Xato bergan webhooklar 5 martagacha Exponential Backoff bilan qayta uriniladi, o'xshamasa tahlil uchun DLQ ga tushadi."
],
    tip: "'Accept fast, process async, ensure idempotency' — har qanday yuqori yuklamali webhook tizimining 3 ta ustunidir."
  },
  {
    id: "iq-90",
    title: "System Design: Real-Time bildirishnomalar (Notifications) tizimida Fan-out on Write va Fan-out on Read arxitekturasi nima?",
    level: "senior",
    category: "architecture",
    categoryLabel: "Arxitektura & Tizim Dizayni",
    skillSlug: "system-design",
    subskillId: "66.14",
    answer: [
      "Ijtimoiy tarmoqlar yoki e-commerce tizimlarida bitta hodisa yuz berganda (masalan, admin barcha 100 000 obunachiga xabar chiqardi) yangiliklarni yetkazishning 2 xil modeli mavjud:",
      "",
      "**1. Fan-out on Write (Push modeli):**",
      "- Xabar yaratilgan onda background job har bir 100 000 ta foydalanuvchining shaxsiy 'inbox' jadvaliga alohida qator qilib yozib chiqadi.",
      "- *Afzalligi:* Foydalanuvchi ilovaga kirganda o'z xabarlarini o'qish juda tez (`SELECT * FROM user_notifications WHERE user_id = ? LIMIT 20`).",
      "- *Kamchiligi:* Yozish operatsiyasi juda qimmat (Celebrity muammosi: 10 mln obunachisi bor yulduz post yozsa, 10 mln ta qator yozish kerak bo'ladi).",
      "",
      "**2. Fan-out on Read (Pull modeli):**",
      "- Xabar faqat 1 marta bitta global jadvalga yoziladi.",
      "- Foydalanuvchi sahifaga kirganida u kuzatayotgan barcha kanallarning xabarlari birlashtirilib (JOIN) tortib olinadi.",
      "- *Afzalligi:* Yozish bir zumda bo'ladi.",
      "- *Kamchiligi:* Har bir foydalanuvchi sahifani ochganda og'ir SQL so'rov bajariladi.",
      "",
      "**Gibrid yechim:** Oddiy foydalanuvchilar uchun Push (Fan-out on Write), millionlab obunachisi bor yulduzlar uchun esa Pull (Fan-out on Read) arxitekturasi birlashtiriladi."
],
    tip: "Twitter, Instagram va yirik bildirishnoma servislarining intervyularida aynan Fan-out arxitekturasi bo'yicha qarorlar so'raladi."
  },
  {
    id: "iq-91",
    title: "System Design: Qisqa havolalar xizmati (URL Shortener - bit.ly) arxitekturasini qanday loyihalashtirasiz?",
    level: "middle",
    category: "architecture",
    categoryLabel: "Arxitektura & Tizim Dizayni",
    skillSlug: "system-design",
    subskillId: "66.8",
    answer: [
      "**Asosiy talablar:** Uzun URL ni 7 belgili qisqa kodga aylantirish (masalan: `bit.ly/3xZ9kL`), qayta yo'naltirish (301/302 Redirect) juda tez (<20ms) bo'lishi.",
      "",
      "**1. Qisqa kod hosil qilish (Base62 Encoding):**",
      "- `MD5` yoki `SHA256` hash qilsak to'qnashuvlar (collisions) yuzaga keladi va qisqartirish kerak bo'ladi.",
      "- **Eng to'g'ri yechim:** Har bir yangi URL ga auto-increment `ID` beriladi (yoki Snowflake ID) va u Base62 (`[0-9a-zA-Z]`, 62 ta belgi) sanoq sistemasiga o'giriladi.",
      "- 7 ta belgi: $62^7 \\approx 3.5\\text{ trillion}$ ta unikal havola yaratish imkonini beradi.",
      "",
      "**2. O'qishni optimallash (Read-Heavy tizim):**",
      "- O'qish va yozish nisbati odatda 100:1 bo'ladi.",
      "- Barcha ommabop havolalar Redis keshida saqlanadi (`GET short_code`). Keshda bo'lsa MySQL ga umuman murojaat qilinmaydi.",
      "- HTTP Redirect: `301 Moved Permanently` (brauzer o'zida keshlaydi, serverga qayta kelmaydi) yoki statistika (kliklar soni) yig'ish kerak bo'lsa `302 Found` ishlatiladi."
],
    tip: "Base62 va avto-inkrement ID yondashuvi hash to'qnashuvlarini nolga tushirishini aytish juda muhimdir."
  },
  {
    id: "iq-92",
    title: "Refactoring: 'God Controller' (Fat Controller) qanday qilib Clean Architecture va Single Responsibility bo'yicha ajratiladi?",
    level: "junior",
    category: "architecture",
    categoryLabel: "Arxitektura & Tizim Dizayni",
    skillSlug: "clean-architecture",
    subskillId: "64.6",
    answer: [
      "**Antipattern (God Controller):** Controller ichida bir vaqtning o'zida validatsiya, DB tranzaksiya, fayl yuklash, tashqi API integratsiyasi va xat jo'natish yozilgan bo'ladi (200+ qator bitta metodda).",
      "",
      "**Refactoring ketma-ketligi:**",
      "1. **Validatsiya:** Controllerdan alohida `FormRequest` ga chiqariladi (`StoreOrderRequest`).",
      "2. **Ma'lumotlarni uzatish:** Xom `$request->all()` o'rniga qat'iy tiplangan DTO (Data Transfer Object) tuziladi.",
      "3. **Biznes mantiq:** Alohida Action sinfiga (Single Action) ko'chiriladi (`CreateOrderAction`).",
      "4. **Yon ta'sirlar (Side effects):** Xat jo'natish va CRM ga yuborish Event va Listener orqali navbatga qo'yiladi.",
      "",
      "```php",
      "// Natijada Controller atigi 3 qatordan iborat bo'ladi:",
      "public function store(StoreOrderRequest $request, CreateOrderAction $action): JsonResponse",
      "{",
      "    $order = $action->execute(OrderData::fromRequest($request));",
      "    return response()->json(new OrderResource($order), 201);",
      "}",
      "```"
],
    tip: "Controllerning yagona vazifasi — HTTP so'rovni qabul qilish, uni servisga uzatish va HTTP javob qaytarish ekanligini unutmang."
  },
  {
    id: "iq-93",
    title: "Security: SSRF (Server-Side Request Forgery) hujumi nima va Laravel ilovasida webhook yoki rasm yuklashda undan qanday himoyalanamiz?",
    level: "senior",
    category: "security",
    categoryLabel: "Xavfsizlik",
    skillSlug: "web-application-security",
    subskillId: "51.10",
    answer: [
      "**SSRF** — foydalanuvchi kiritgan URL orqali serverni o'zining ichki tarmog'iga (Private Network) so'rov yuborishga majbur qilishdir.",
      "Misol: Foydalanuvchiga avatar rasm yuklash uchun URL kiritish imkoni berilgan. Hujumchi URL o'rniga `http://169.254.169.254/latest/meta-data/` (AWS Cloud metadata) yoki `http://localhost:6379` (Redis porti) kiritadi. Natijada server o'zining maxfiy kalitlarini hujumchiga berib qo'yishi mumkin.",
      "",
      "**Himoyalanish choralari:**",
      "1. Protokolni faqat `http` va `https` ga cheklash (`file://`, `gopher://`, `dict://` ni bloklash).",
      "2. **Ichki IP manzillarni (Private & Loopback IP ranges) qat'iy bloklash:**",
      "```php",
      "$ip = gethostbyname(parse_url($url, PHP_URL_HOST));",
      "if (!filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {",
      "    throw new SecurityException('Ichki tarmoqqa so\\'rov yuborish taqiqlangan!');",
      "}",
      "```",
      "3. DNS Rebinding hujumlarining oldini olish uchun so'rov ayni tekshirilgan IP ga yo'naltirilishi kerak."
],
    tip: "Har qanday tashqi URL ni serverdan yuklab oladigan funksiyalarda (Webhook tester, PDF generator, Image scraper) doim SSRF xavfi mavjud bo'ladi."
  },
  {
    id: "iq-94",
    title: "Security: ReDoS (Regular Expression Denial of Service) nima va xavfli regex qanday qilib serverni to'xtatib qo'yishi mumkin?",
    level: "senior",
    category: "security",
    categoryLabel: "Xavfsizlik",
    skillSlug: "web-application-security",
    subskillId: "51.12",
    answer: [
      "ReDoS — yomon yozilgan muntazam ifoda (Regular Expression) sababli regex dvigatelining eksponentsial qaytish (Catastrophic Backtracking) holatiga tushishi va CPU ni 100% ga chiqarib serverni qotirib qo'yishidir.",
      "",
      "**Xavfli regex namunasi:**",
      "`/^(a+)+$/` — Agar satr `'aaaaaaaaaaaaaaaaaaaaaaaaaaaa!'` kabi oxiri xato belgi bilan tugasa, dvigatel barcha mumkin bo'lgan variantlarni tekshirib chiqadi ($2^N$ qadam). 30 ta belgi millionlab tekshiruv va daqiqalab vaqt oladi.",
      "",
      "**Himoyalanish choralari:**",
      "1. Regexda bir-birini ichiga oluvchi takrorlanishlardan (Nested quantifiers: `(x+)+`, `(a|a)+`) qochish.",
      "2. **Atomic Grouping `(?>...)` yoki Possessive Quantifiers `++` ishlatish:** Ular ortga qaytishni (backtracking) o'chirib qo'yadi.",
      "3. PHP da `ini_set('pcre.backtrack_limit', 10000);` chegarasini o'rnatish.",
      "4. Kiritilayotgan satrning maksimal uzunligini regexdan oldin tekshirish (`strlen($input) < 255`)."
],
    tip: "Foydalanuvchi kiritadigan maydonlarni (Email, Phone, Slug) validatsiya qilishda murakkab regexlar o'rniga standart filter_var() yoki sodda qoidalardan foydalanish tavsiya etiladi."
  },
  {
    id: "iq-95",
    title: "Security: API integratsiyalarida HMAC (Hash-based Message Authentication Code) va Replay Attack'dan qanday himoyalanamiz?",
    level: "senior",
    category: "security",
    categoryLabel: "Xavfsizlik",
    skillSlug: "api-authentication-and-authorization",
    subskillId: "20.12",
    answer: [
      "To'lov tizimlari (Stripe, Payme, Click) va B2B API larda so'rov yolda o'zgartirilmaganini va aynan ishonchli hamkordan kelganini ta'minlash uchun **HMAC** ishlatiladi.",
      "",
      "**HMAC qanday ishlaydi:**",
      "1. Klient va server o'rtasida bitta umumiy maxfiy kalit (`Shared Secret`) bo'ladi.",
      "2. Klient yuborilayotgan JSON body, vaqt tamg'asi (`timestamp`) va unikal satrni (`nonce`) maxfiy kalit bilan xeshlaydi:",
      "```php",
      "$signature = hash_hmac('sha256', $timestamp . '.' . $nonce . '.' . $payload, $secret);",
      "```",
      "3. Server so'rovni olgach, xuddi shu formulada o'zida imzoni hisoblaydi va `hash_equals()` bilan solishtiradi.",
      "",
      "**Replay Attack (So'rovni qayta yuborish) dan himoya:**",
      "- Hujumchi tarmoqdagi haqiqiy pul o'tkazish so'rovini tutib olib, 10 marta qayta yuborishi mumkin.",
      "- **Yechim 1 (Timestamp):** So'rov vaqti joriy vaqtdan 5 daqiqadan ko'p farq qilsa, so'rov rad etiladi.",
      "- **Yechim 2 (Nonce):** Har bir so'rovning unikal `nonce` ID si Redis keshida 5 daqiqa saqlanadi. Agar bu ID bilan so'rov allaqachon kelgan bo'lsa — rad etiladi."
],
    tip: "Intervyuda xeshlarni solishtirishda doim `===` emas, timing attack'dan himoyalangan `hash_equals()` funksiyasini aytish kerak."
  },
  {
    id: "iq-96",
    title: "Database Internals: MySQL InnoDB Redo Log va Undo Log ning vazifalari nima va Crash Recovery qanday ishlaydi?",
    level: "lead",
    category: "database",
    categoryLabel: "Ma'lumotlar bazasi",
    skillSlug: "mysql",
    subskillId: "10.16",
    answer: [
      "InnoDB dvigateli ACID tamoyillarini ta'minlash uchun xotirada (Buffer Pool) va diskda 2 xil log strukturasidan foydalanadi:",
      "",
      "**1. Redo Log (Durability - Chidamlilik uchun):**",
      "- Ma'lumot o'zgarganda diskdagi asosiy `.ibd` fayllariga yozish juda sekin (Random I/O).",
      "- Shu sababli InnoDB o'zgarishlarni ketma-ket (Sequential I/O - juda tez) qilib Redo Log (`ib_logfile`) ga yozadi.",
      "- **Crash Recovery:** Agar server to'satdan o'chib qolsa, qayta yoqilganda Redo Log o'qilib, diskka yetib ulgurmagan barcha kommit bo'lgan tranzaksiyalar qayta tiklanadi (Roll-forward).",
      "",
      "**2. Undo Log (Atomicity va MVCC uchun):**",
      "- Tranzaksiya o'zgarishlar kiritganda, ma'lumotning eski holatini Undo Log ga yozadi.",
      "- Agar xatolik tufayli `ROLLBACK` bo'lsa, ma'lumotlar Undo Log yordamida orqaga qaytariladi.",
      "- Shuningdek, boshqa so'rovlar ayni paytda o'zgarayotgan qatorning eski holatini o'qishi uchun (Non-locking Read / MVCC) xizmat qiladi."
],
    tip: "Redo log — oldinga siljitish (tiklash), Undo log — orqaga qaytarish (rollback) va MVCC uchun ekanligini lo'nda tushuntiring."
  },
  {
    id: "iq-97",
    title: "Database Indexing: Index Cardinality nima va past kardinallikka ega ustunlarni (status, gender) indekslash nega ko'pincha foydasiz?",
    level: "middle",
    category: "database",
    categoryLabel: "Ma'lumotlar bazasi",
    skillSlug: "database-indexing",
    subskillId: "55.6",
    answer: [
      "**Index Cardinality** — indekslangan ustundagi unikal (takrorlanmas) qiymatlar sonidir.",
      "- Masalan, 1 million qatorli jadvalda `user_id` ning kardinalligi 1 000 000 ga yaqin (Yuqori kardinallik).",
      "- `status` ustunida esa atigi 3 ta qiymat (`pending`, `active`, `cancelled`) bo'lishi mumkin (Past kardinallik).",
      "",
      "**Nega past kardinallikda indeks ko'pincha ishlamaydi?**",
      "- MySQL Optimizer B+Tree indeksidan foydalanish yoki to'g'ridan-to'g'ri jadvalni skanerlash (Full Table Scan) tannarxini hisoblaydi.",
      "- Agar so'rov jadvaldagi qatorlarning 20-30% dan ko'pini qaytaradigan bo'lsa, indeks bo'yicha har bir qatorga murojaat qilish (Random Disk Lookups) butun jadvalni ketma-ket o'qishdan ko'ra sekinroq bo'ladi. Shu sababli MySQL indeksni tashlab ketadi.",
      "",
      "**To'g'ri yechim:** Past kardinallikka ega ustunni yakka o'zini emas, yuqori kardinallikka ega ustun bilan birgalikda Kompozit Indeks qilib yaratish kerak: `INDEX(status, created_at)`."
],
    tip: "Ko'p dasturchilar har bir WHERE ustuniga yakka indeks qo'yib chiqishadi. Kompozit indekslar va selektivlik (Selectivity ratio) tushunchasini bilish Senior belgisi."
  },
  {
    id: "iq-98",
    title: "Database Architecture: Zero-Downtime Migrations: 50 million qatorli jadvalga ustun qo'shish yoki o'zgartirishni tizimni to'xtatmasdan qanday bajaramiz?",
    level: "lead",
    category: "database",
    categoryLabel: "Ma'lumotlar bazasi",
    skillSlug: "database-optimization",
    subskillId: "15.12",
    answer: [
      "Oddiy `ALTER TABLE orders ADD COLUMN ...` katta jadvalda soatlab vaqt olishi va bu vaqtda butun jadvalni yozishga bloklab (Table Lock) qo'yishi mumkin.",
      "",
      "**Ishlab chiqarishdagi xavfsiz yondashuvlar:**",
      "1. **MySQL 8.0+ Instant DDL:** Oddiy yangi null bo'ladigan ustunni jadval oxiriga qo'shish endi bir necha millisekundda (`ALGORITHM=INSTANT`) bajariladi (ma'lumotlarni qayta yozmasdan).",
      "2. **OSC (Online Schema Change) asboblari:** Murakkab o'zgarishlar uchun GitHub ning `gh-ost` yoki Percona `pt-online-schema-change` vositalari ishlatiladi:",
      "   - Yangi bo'sh jadval (Ghost table) yaratiladi.",
      "   - Eski jadvaldan yangisiga ma'lumotlar kichik bo'laklarda (Batch qilib) ko'chiriladi.",
      "   - Binary log orqali ko'chirish paytida kelgan yangi o'zgarishlar sinxronlanadi.",
      "   - Yakunda atomar `RENAME TABLE old TO backup, ghost TO old;` orqali almashtiriladi.",
      "3. **Expand and Contract (Parallel Run) Pattern:** Ustun nomini o'zgartirishda eski ustun darhol o'chirilmaydi; yangisi ochiladi, kod ikkalasiga yozadi, ma'lumotlar ko'chirilgach eski ustun keyingi deployda olib tashlanadi."
],
    tip: "Katta korxonalarda hech qachon kunduz kuni to'g'ridan-to'g'ri og'ir ALTER TABLE buyrug'i berilmaydi — faqat gh-ost yoki Instant DDL."
  },
  {
    id: "iq-99",
    title: "Architecture: Strangler Fig Pattern nima va eskirgan katta Monolit tizim yangi arxitekturaga qanday ko'chiriladi?",
    level: "lead",
    category: "architecture",
    categoryLabel: "Arxitektura & Tizim Dizayni",
    skillSlug: "software-architecture",
    subskillId: "61.12",
    answer: [
      "**Strangler Fig Pattern** (Bo'g'uvchi anjir daraxti modeli) — katta eski tizimni noldan qayta yozish o'rniga (Big Rewrite ko'pincha muvaffaqiyatsiz tugaydi), uning funksiyalarini chetidan bittalab ajratib olib, eski monolitni asta-sekin qisqartirish usuli.",
      "",
      "**Amalga oshirish qadamlari:**",
      "1. **Reverse Proxy (API Gateway / Nginx):** Foydalanuvchilar va eski tizim o'rtasiga proksi qo'yiladi.",
      "2. Yangi funksiya (masalan, Yangi To'lov tizimi) yangi toza Laravel / microservice loyihasida quriladi.",
      "3. Proxy qoidasi yangilanadi: `/api/v2/payments` so'rovlari yangi servisga, qolgan barcha so'rovlar esa eski monolitga yo'naltiriladi.",
      "4. Keyingi bosqichda Katalog, keyin Foydalanuvchilar va h.k. bosqichma-bosqich ajratiladi.",
      "5. Oxir-oqibat eski monolitda hech narsa qolmagach, u xavfsiz o'chiriladi."
],
    tip: "Katta loyihalarda yangidan qayta yozish biznes uchun xavfli. Strangler pattern uzluksiz daromad va yangi imkoniyatlarni to'xtatmasdan modernizatsiya qilish imkonini beradi."
  },
  {
    id: "iq-100",
    title: "Architecture: Idempotent Consumer Pattern: Navbatdagi (Queue) xabarlar takroran kelganda (At-Least-Once Delivery) dublikatlardan qanday himoyalanamiz?",
    level: "senior",
    category: "architecture",
    categoryLabel: "Arxitektura & Tizim Dizayni",
    skillSlug: "event-driven-architecture",
    subskillId: "48.8",
    answer: [
      "Ko'pchilik brokerlar (RabbitMQ, Kafka, SQS) xabarlarni 'At-Least-Once' (Kamida bir marta) yetkazib berish kafolatini beradi. Tarmoq xatosi tufayli worker ack jo'nata olmasa, xabar qaytadan ishlovga keladi.",
      "Agar to'lov yechish xabari 2 marta kelsa, mijozdan 2 marta pul yechib olinishi mumkin.",
      "",
      "**Idempotent Consumer yechimlari:**",
      "1. **Unikal Idempotency Key:** Har bir hodisaga unikal ID beriladi (`event_id` yoki `payment_uuid`).",
      "2. **Ma'lumotlar bazasida atomar tekshiruv:**",
      "```php",
      "// processed_events jadvalida event_id UNIQUE bo'ladi",
      "try {",
      "    DB::table('processed_events')->insert(['id' => $event->id, 'created_at' => now()]);",
      "} catch (QueryException $e) {",
      "    // Agar bu ID allaqachon bo'lsa (Integrity violation), ishlov berish to'xtatiladi",
      "    Log::info(\"Xabar allaqachon bajarilgan: {$event->id}\");",
      "    return;",
      "}",
      "$this->processPayment($event);",
      "```",
      "3. **Biznes mantiq darajasida holat tekshiruvi:** Agar buyurtma holati allaqachon `paid` bo'lsa, qayta to'lov yechilmaydi."
],
    tip: "Asinxron tizimlarda har bir qabul qiluvchi (Consumer) o'ziga kelgan xabar takroriy bo'lishi mumkinligini hisobga olib, idempotent dizayn qilinishi shart."
  },
  {
    id: "iq-101",
    title: "Queues: Laravel Horizon'da Backpressure nima va so'rovlar oqimi workerlar tezligidan oshib ketganda tizim qanday himoyalanadi?",
    level: "senior",
    category: "async",
    categoryLabel: "Navbatlar & Async",
    skillSlug: "laravel-horizon",
    subskillId: "47.6",
    answer: [
      "**Backpressure** — navbatga tushayotgan vazifalar soni workerlar ularni bajarish tezligidan ancha oshib ketganda tizimda yuzaga keladigan ortiqcha bosimdir. Bu navbatning kechikish vaqti (Wait Time) oshib ketishiga va Redis xotirasining to'lishiga olib keladi.",
      "",
      "**Horizon va Laravelda yechimlar:**",
      "1. **Auto-Scaling (Avto-kengayish):** Horizon balanslash rejimi `auto` ga qo'yiladi. Horizon kutish vaqtiga qarab avtomatik ravishda qo'shimcha worker jarayonlarini ishga tushiradi (`minProcesses` dan `maxProcesses` gacha).",
      "2. **Vazifalarni tiqilib qolishdan ajratish (Queue Prioritization):** Kritik vazifalar (`high`) va ikkinchi darajali vazifalar (`low`, masalan eksport fayllar) alohida navbatlarga va alohida ajratilgan workerlarga ega bo'lishi shart.",
      "3. **Rate Limiting va Throttling:** `Redis::throttle('sms')->allow(10)->every(1)` orqali tashqi cheklovlarga moslashish.",
      "4. **Job Deduplication (Noyob vazifalar):** Bir xil ma'lumotga ega bo'lgan takroriy joblarni navbatga kiritmaslik (`ShouldBeUnique` interfeysi)."
],
    tip: "Horizon panelida eng asosiy e'tibor qaratilishi kerak bo'lgan metrika bu navbatdagi ishlar soni emas, 'Wait Time' (Kutish vaqti) dir."
  },
  {
    id: "iq-102",
    title: "Testing: Mutation Testing (Infection PHP) nima va nima uchun 100% Code Coverage har doim ham sifatli test degani emas?",
    level: "senior",
    category: "testing",
    categoryLabel: "Testlash",
    skillSlug: "pest",
    subskillId: "26.10",
    answer: [
      "**100% Code Coverage aldamchi bo'lishi mumkin:** Dasturchi kodni chaqirib, hech qanday `assert` yozmasa ham, coverage 100% bo'lib ko'rinaveradi. Coverage kodning necha qatori ishga tushganini o'lchaydi, lekin testlarning xatolarni qanchalik aniqlay olishini o'lchamaydi.",
      "",
      "**Mutation Testing (Infection) qanday ishlaydi:**",
      "1. Infection kodingizga ataylab mayda o'zgarishlar (Mutantlar) kiritadi: `>` ni `<` ga, `true` ni `false` ga, `+` ni `-` ga o'zgartiradi.",
      "2. So'ngra testlaringizni ishga tushiradi.",
      "3. **Mutant o'ldirildi (Killed):** Test xatoni sezib qulasa — ajoyib! Sizning testingiz haqiqatan ham ushbu mantiqni tekshiryapti.",
      "4. **Mutant omon qoldi (Escaped):** Kod o'zgarsa ham barcha testlaringiz yashil o'tsa — demak testingiz zaif va foydasiz.",
      "",
      "**Natija:** Mutation Score Indicator (MSI) — testlaringizning haqiqiy sifat darajasini ko'rsatadi."
],
    tip: "Fintech va to'lov tizimlarida faqat Line Coverage bilan cheklanmasdan, Mutation Testing bilan xavfli hududlarni tekshirish katta obro' beradi."
  },
  {
    id: "iq-103",
    title: "Testing: Minglab testlar yozilganda Feature testlar sekinlashib ketishining sabablari va ularni 5 barobar tezlashtirish usullari?",
    level: "middle",
    category: "testing",
    categoryLabel: "Testlash",
    skillSlug: "feature-testing",
    subskillId: "29.8",
    answer: [
      "Katta loyihalarda testlar 15-20 daqiqa vaqt olishi CI/CD quvurini sekinlashtiradi.",
      "",
      "**Asosiy sabablar va optimallashtirish:**",
      "1. **Parallel Testing:** `php artisan test --parallel` (yoki `pest --parallel`) orqali testlarni CPU yadrolari soniga qarab 4-8 ta alohida DB da parallel yurgizish (darhol 3-4x tezlashadi).",
      "2. **RefreshDatabase o'rniga DB schema dump:** Har gal migratsiyalarni noldan surmasdan, `php artisan schema:dump` qilib bitta SQL fayldan tiklash.",
      "3. **Hash qimmatligini pasaytirish:** Bcrypt parollarni xeshlash CPU ni juda ko'p yeydi. Test muhitida xesh davrlarini minimalga tushirish:",
      "```php",
      "// phpunit.xml",
      "<env name=\"BCRYPT_ROUNDS\" value=\"4\"/>",
      "```",
      "4. **Event va Notification'larni soxtalashtirish (Fakes):** Haqiqiy xat yoki HTTP so'rov yubormasdan `Http::fake()`, `Mail::fake()`, `Queue::fake()` ishlatish.",
      "5. **Ortiqcha Factory bog'liqliklari:** Bitta User yaratganda unga bog'liq 10 ta modelni avtomat yaratib DB ga yozish o'rniga, faqat kerakli maydonlarni mock qilish."
],
    tip: "Bcrypt round=4 va parallel testing usullarining o'zi test vaqtini 15 daqiqadan 2 daqiqaga tushirib beradi."
  },
  {
    id: "iq-104",
    title: "DevOps: Docker Multi-Stage Build orqali PHP/Laravel production image hajmini qanday qilib 10 barobarga qisqartiramiz?",
    level: "middle",
    category: "devops",
    categoryLabel: "DevOps & Server",
    skillSlug: "docker",
    subskillId: "36.10",
    answer: [
      "**Muammo:** Oddiy Dockerfile ichida Composer, Node.js, NPM, Git, kompilyatorlar va dev-dependencies qolib ketadi, natijada image hajmi 1-1.5 GB ga chiqadi va xavfsizlik zaifliklari ko'payadi.",
      "",
      "**Multi-stage yechimi:**",
      "```dockerfile",
      "# 1-bosqich: Vendorlarni yig'ish",
      "FROM composer:2 AS vendor",
      "WORKDIR /app",
      "COPY composer.json composer.lock ./",
      "RUN composer install --no-dev --optimize-autoloader --no-scripts",
      "",
      "# 2-bosqich: Frontend assetlarni yig'ish",
      "FROM node:20-alpine AS frontend",
      "WORKDIR /app",
      "COPY package.json package-lock.json ./",
      "RUN npm ci",
      "COPY . .",
      "RUN npm run build",
      "",
      "# 3-bosqich: Yakuniy Production Image (Faqat eng zarur narsalar)",
      "FROM php:8.3-fpm-alpine",
      "WORKDIR /var/www",
      "# Node va Composer bu yerga ko'chirilmaydi!",
      "COPY --from=vendor /app/vendor ./vendor",
      "COPY --from=frontend /app/public/build ./public/build",
      "COPY . .",
      "```",
      "- Natijada yakuniy image atigi 60-90 MB bo'ladi, deploy tezlashadi va ortiqcha dev vositalar bo'lmagani uchun xavfsiz bo'ladi."
],
    tip: "Production konteynerida hech qachon Composer, Node, NPM yoki test fayllari bo'lmasligi kerak."
  },
  {
    id: "iq-105",
    title: "Engineering Leadership: Code Review madaniyati: Jamoada konfliktlarsiz, o'sishga undovchi va standartlashtirilgan review jarayoni qanday quriladi?",
    level: "lead",
    category: "architecture",
    categoryLabel: "Liderlik va Arxitektura",
    skillSlug: "code-review",
    subskillId: "72.8",
    answer: [
      "Code Review dasturchini tergov qilish emas, balki kod sifatini umumiy oshirish va bilim almashish madaniyatidir.",
      "",
      "**Lead tomonidan joriy qilinadigan qoidalar:**",
      "1. **Avtomatlashtirish (Linter/Static Analysis):** Sintaksis, bo'sh joylar va PSR standartlari uchun odam vaqt sarflamasligi kerak. Bularni CI quvurida PHPStan va Pint avtomat tekshiradi.",
      "2. **Prefixlar bilan izoh qoldirish (Conventional Comments):**",
      "   - `[NITPICK]` — Muhim emas, ixtiyoriy taklif (masalan, o'zgaruvchi nomi).",
      "   - `[QUESTION]` — Tushunmadim, tushuntirib ber (mantiqni o'rganish).",
      "   - `[BLOCKER]` — Kritik xato (Xavfsizlik, N+1, Race condition) — to'g'rilanmasa merge bo'lmaydi.",
      "   - `[PRAISE]` — Zo'r yechim! Yaxshi yozilgan kodni maqtab turish juda muhim.",
      "3. **Kichik PR lar (Pull Requests):** 1000 qatorli PR ni hech kim sifatli o'qimaydi. PR lar 200-300 qatordan oshmasligi kerak.",
      "4. **Shaxsiyatga emas, kodga qaratilgan til:** 'Sen xato yozgansan' emas, balki 'Ushbu metodda null kelganda xato yuz berishi mumkin, shuni tekshirib ko'rsakchi?' tarzida savol berish."
],
    tip: "Lead dasturchining vazifasi — jamoada xatolardan qo'rqmaydigan, lekin mas'uliyatni his qiladigan sog'lom muloqot muhitini shakllantirishdir."
  },

  // --- PHP tili ---
  {
    "id": "iq-106",
    "title": "PHP: WeakMap va SplObjectStorage nima va ular Memory Leak'larning oldini olishda qanday yordam beradi?",
    "level": "senior",
    "category": "php",
    "categoryLabel": "PHP tili",
    "skillSlug": "php",
    "subskillId": "1.35",
    "answer": [
      "`SplObjectStorage` obyektlarni kalit sifatida saqlaydi, ammo obyektga kuchli havola (strong reference) saqlab qoladi. Agar asosiy obyekt dasturda o'chirilsa ham, xaritada saqlanib qolib xotiradan tozalanmaydi (Memory Leak).",
      "",
      "**WeakMap (PHP 8.0+):**",
      "- Obyektlarga kuchsiz havola (weak reference) orqali bog'lanadi.",
      "- Agar xaritadan tashqarida obyektga boshqa havola qolmasa, Garbage Collector obyektni yo'q qiladi va WeakMap ichidagi tegishli kalit-qiymat juftligi avtomatik tozalanadi.",
      "```php",
      "$map = new WeakMap();",
      "$user = new User(1);",
      "$map[$user] = ['computed_data' => 123];",
      "",
      "unset($user); // Obyekt yo'qolishi bilan $map ham avtomat bo'shaydi!",
      "count($map); // 0",
      "```"
    ],
    "tip": "ORM larda (Doctrine yoki Eloquent Identity Map) obyektlar keshini xotirani to'ldirib yubormasdan boshqarishda aynan WeakMap ishlatiladi."
  },
  {
    "id": "iq-107",
    "title": "PHP JIT (Just-In-Time) kompayleri qanday ishlaydi va nima uchun oddiy web ilovalarda (I/O Bound) sezilarli tezlik bermaydi?",
    "level": "lead",
    "category": "php",
    "categoryLabel": "PHP tili",
    "skillSlug": "php",
    "subskillId": "1.25",
    "answer": [
      "PHP 8.0 da kelgan **JIT (Tracing JIT)** OPcache ichida ishlaydi. U ko'p takrorlanadigan Opcode bloklarini to'g'ridan-to'g'ri protsessorning mashina kodiga (Machine Code - x86/ARM) o'giradi.",
      "",
      "**Nega Laravel / Web ilovalarda katta farq yo'q?**",
      "- Veb-ilovalar 90% vaqtini **I/O Bound** (MySQL dan ma'lumot kutish, Redis ga so'rov, tarmoq orqali HTTP kutish, diskdan fayl o'qish) bilan o'tkazadi. CPU hisob-kitoblariga juda oz vaqt ketadi.",
      "- **JIT qachon foyda beradi? CPU Bound vazifalarda:** Mashinaviy o'rganish (ML), 3D matematika, tasvirlarni qayta ishlash, matn tokenizatsiyasi yoki katta sonlarni hisoblashda 2x-5x tezlik berishi mumkin."
    ],
    "tip": "Intervyuda 'PHP 8 ga o'tsak saytimiz 3 barobar tezlashadi, chunki JIT bor' deb aytmang — vebda asosiy to'siq I/O ekanligini ta'kidlash Seniorlik belgisidir."
  },
  {
    "id": "iq-108",
    "title": "PHP: Generators da 'yield from' mexanizmi nima va u orqali Pipeline Pattern qanday quriladi?",
    "level": "senior",
    "category": "php",
    "categoryLabel": "PHP tili",
    "skillSlug": "php",
    "subskillId": "1.17",
    "answer": [
      "`yield from` (Generator Delegation) bitta generator ichidan boshqa generator, massiv yoki Traversable obyektni delegatsiya qilish (ichma-ich oqim hosil qilish) imkonini beradi.",
      "",
      "**Katta ma'lumotlar oqimini (ETL Pipeline) xotirasiz qayta ishlash:**",
      "```php",
      "function readCsv(string $file): Generator {",
      "    $h = fopen($file, 'r');",
      "    while ($row = fgetcsv($h)) yield $row;",
      "    fclose($h);",
      "}",
      "",
      "function processAllFiles(array $files): Generator {",
      "    foreach ($files as $file) {",
      "        yield from readCsv($file); // Xotiraga yuklamasdan bitta-bitta oqim beradi",
      "    }",
      "}",
      "",
      "foreach (processAllFiles(['jan.csv', 'feb.csv']) as $row) {",
      "    // 100 GB ma'lumotni atigi 20 MB RAM bilan qayta ishlash mumkin",
      "}",
      "```"
    ],
    "tip": "Gigabaytlab hajmdagi eksport/import jarayonlarini xotirasiz boshqarishda Generator delegation eng toza yechimdir."
  },
  {
    "id": "iq-109",
    "title": "PHP: Attributes (Metadata) qanday ishlaydi va ular eski DocBlock izohlaridan nimasi bilan ustun?",
    "level": "junior",
    "category": "php",
    "categoryLabel": "PHP tili",
    "skillSlug": "php",
    "subskillId": "1.16",
    "answer": [
      "PHP 8.0 gacha metadata (masalan `@Route('/home')` yoki `@ORM\\\\Column`) faqat matnli izoh (DocBlock) sifatida yozilar va regex bilan o'qilar edi (xatoliklar xavfi yuqori, tiplar yo'q).",
      "",
      "**PHP 8 Attributes (Native sintaksis):**",
      "- Attributlar haqiqiy PHP sinflaridir (`#[Attribute]`).",
      "- Ular kompilyatsiya vaqtida sintaksis tekshiruvidan o'tadi, qat'iy tiplar va avtoto'ldirish (IDE autocomplete) ishlaydi.",
      "- `ReflectionClass::getAttributes()` orqali bir necha mikrosekundda o'qiladi.",
      "```php",
      "#[Attribute(Attribute::TARGET_METHOD)]",
      "class RateLimit {",
      "    public function __construct(public int $limit = 60) {}",
      "}",
      "",
      "class PaymentController {",
      "    #[RateLimit(limit: 10)]",
      "    public function pay() { /* ... */ }",
      "}",
      "```"
    ],
    "tip": "Laravel 11 da ko'plab routing va event tinglovchilarida aynan Native Attributes keng qo'llanilmoqda."
  },
  {
    "id": "iq-110",
    "title": "PHP: Floating point precision xatolari va nima uchun moliya/pul tizimlarida float ishlatish qat'iyan taqiqlanadi?",
    "level": "senior",
    "category": "php",
    "categoryLabel": "PHP tili",
    "skillSlug": "php",
    "subskillId": "1.29",
    "answer": [
      "Kompyuterlar sonlarni ikkilik (binary IEEE 754) formatida saqlaydi. Ko'plab o'nlik kasrlar (masalan `0.1` yoki `0.7`) ikkilik tizimda cheksiz davriy kasrga aylanadi va yaxlitlash xatosi paydo bo'ladi.",
      "",
      "```php",
      "$a = 0.1 + 0.2;",
      "echo $a; // 0.3",
      "var_dump($a === 0.3); // FALSE! (Haqiqatda 0.300000000000000044408...)",
      "```",
      "- Agar bank yoki to'lov tizimida `float` ishlatilsa, yuz minglab tranzaksiyalarda tiyinlar yo'qolishi yoki nomuvofiqlik (Reconciliation discrepancy) kelib chiqadi.",
      "",
      "**Senior Yechimlari:**",
      "1. **Tiyinlarda butun son (Integer cents) ishlatish:** 100.50 so'm = `10050` tiyin.",
      "2. **BCMath yoki GMP kengaytmasi:** Ixtiyoriy aniqlikdagi satrli arifmetika (`bcadd('0.1', '0.2', 4)`).",
      "3. DB da `DECIMAL(12, 2)` yoki `NUMERIC` ustunlari."
    ],
    "tip": "Moliya yoki hisob-kitob bo'yicha intervyularda float solishtirish xavfini tushuntirish asosiy talablardan biridir."
  },
  {
    "id": "iq-111",
    "title": "PHP: Readonly Classes va Readonly Properties: Ularning nozik jihatlari va cheklovlari nimalardan iborat?",
    "level": "junior",
    "category": "php",
    "categoryLabel": "PHP tili",
    "skillSlug": "php",
    "subskillId": "1.33",
    "answer": [
      "PHP 8.1 da `readonly property`, PHP 8.2 da esa butun `readonly class` sintaksisi qo'shildi (Sinfdagi barcha xususiyatlar avtomat readonly bo'ladi).",
      "",
      "**Qoidalar va cheklovlar:**",
      "1. **Faqat tiplangan xususiyatlar bo'lishi shart:** `public readonly int $id;` (Untyped bo'lishi mumkin emas).",
      "2. **Faqat bir marta initsializatsiya qilinadi:** Odatda konstruktor ichida. Keyin o'zgartirish `Error: Cannot modify readonly property` beradi.",
      "3. **Statik xususiyatlarda ishlamaydi:** `static readonly` taqiqlangan.",
      "4. **Meros olish (Inheritance):** Readonly sinfdan faqat Readonly sinf meros olishi mumkin.",
      "5. **Clone cheklovi:** Obyekt klonlanganda (`__clone`) readonly xususiyatlarni o'zgartirib bo'lmaydi (PHP 8.3 dan boshlab `__clone()` ichida qayta yozishga ruxsat berildi)."
    ],
    "tip": "Readonly classlar o'zgarmas (Immutable) DTO va Domain Hodisalarni (Events) yaratish uchun ideal vositadir."
  },

  // --- DevOps & Server ---
  {
    "id": "iq-112",
    "title": "PHP FPM: pm sozlamasidagi 'static', 'dynamic' va 'ondemand' rejimlarining farqi va ularni server RAM ga qarab qanday sozlash kerak?",
    "level": "senior",
    "category": "devops",
    "categoryLabel": "DevOps & Server",
    "skillSlug": "php-fpm",
    "subskillId": "42.8",
    "answer": [
      "`php-fpm.conf` dagi `pm` (Process Manager) worker jarayonlarini boshqaradi:",
      "",
      "- **static:** Doimiy belgilangan miqdordagi workerlar ishlaydi (`pm.max_children`). Protsesslarni qayta yaratishga vaqt ketmaydi. **Yuqori yuklamali (Dedicated) serverlar uchun eng yaxshisi.**",
      "- **dynamic:** Workerlar yuklamaga qarab ko'payadi va kamayadi (`pm.min_spare_servers`, `pm.max_spare_servers`). O'rtacha yuklamada RAM tejaydi.",
      "- **ondemand:** So'rov kelgandagina worker yaratiladi, bo'sh tursa o'chiriladi. Resursni juda tejaydi, ammo so'rov boshida kechikish (cold start) beradi (Kam tashrifli mayda loyihalar uchun).",
      "",
      "**pm.max_children formulasi (Static rejim uchun):**",
      "$$\\text{max\\_children} = \\frac{\\text{Bo'sh RAM (masalan, 6000 MB)}}{\\text{1 ta PHP jarayonining o'rtacha xotirasi (masalan, 60 MB)}} \\approx 100$$"
    ],
    "tip": "Production serverlarda dynamic rejim workerlarni qayta-qayta fork qilib CPU sarflamasligi uchun ko'pincha static rejim tavsiya etiladi."
  },

  // --- PHP tili ---
  {
    "id": "iq-113",
    "title": "PHP: Error vs Exception iyerarxiyasi: Fatal xatolarni 'try-catch' bilan tutish qachondan boshlab mumkin bo'ldi?",
    "level": "junior",
    "category": "php",
    "categoryLabel": "PHP tili",
    "skillSlug": "php",
    "subskillId": "1.15",
    "answer": [
      "PHP 7 gacha Fatal Error (masalan, mavjud bo'lmagan metodni chaqirish yoki tip nomutanosibligi) skriptni darhol to'xtatar va `try-catch` bilan ushlab bo'lmas edi.",
      "",
      "**PHP 7+ Throwable iyerarxiyasi:**",
      "- `Throwable` interfeysi barcha xatoliklar ildizidir.",
      "- Undan ikkita asosiy tarmoq ajraladi: `Exception` va `Error`.",
      "- `TypeError`, `ParseError`, `DivisionByZeroError`, `ArithmeticError` kabi ichki fatal xatolar endi `Error` sinfidan meros oladi.",
      "```php",
      "try {",
      "    undefinedFunctionCall();",
      "} catch (Throwable $e) { // Ham Exception, ham Error ni ushlaydi",
      "    Log::critical('Tizim qulashining oldi olindi: ' . $e->getMessage());",
      "}",
      "```"
    ],
    "tip": "Barcha xatoliklarni xavfsiz tutish uchun catch blokida faqat `\\Exception` emas, `\\Throwable` ko'rsatish lozim."
  },

  // --- Composer ---
  {
    "id": "iq-114",
    "title": "PHP: Composer Autoload turlari: PSR-4, classmap va files. Productionda 'composer dump-autoload -o' nega muhim?",
    "level": "junior",
    "category": "php",
    "categoryLabel": "Composer",
    "skillSlug": "composer",
    "subskillId": "7.8",
    "answer": [
      "**Composer autoload usullari:**",
      "1. **PSR-4:** Nom maydoni (Namespace) ni fayl papka yo'liga moslashtiradi (`App\\\\Models\\\\User` -> `app/Models/User.php`).",
      "2. **classmap:** Aniq PSR ga tushmaydigan barcha sinflarni qidirib topib, bitta katta massivga joylaydi.",
      "3. **files:** Har bir so'rovda avtomatik `require` qilinadigan yordamchi fayllar (masalan, `helpers.php`).",
      "",
      "**Nega `composer dump-autoload -o` (Optimized) muhim?**",
      "- Oddiy holatda PHP har gal yangi sinf so'ralganda diskdan fayl mavjudligini (`file_exists`) tekshiradi (Disk I/O).",
      "- `-o` (yoki `-a` authoritative) bayrog'i barcha PSR-4 sinflarni oldindan skanerlab, to'g'ridan-to'g'ri `classmap` massiviga aylantiradi. Diskka so'rov nolga tushadi va yuklanish 20-30% tezlashadi."
    ],
    "tip": "CI/CD deployment scriptida `composer install --no-dev --optimize-autoloader` qadami bo'lishi shart."
  },

  // --- PHP tili ---
  {
    "id": "iq-115",
    "title": "PHP: SplPriorityQueue va SplFixedArray ma'lumot tuzilmalari qachon oddiy massivdan afzal?",
    "level": "senior",
    "category": "php",
    "categoryLabel": "PHP tili",
    "skillSlug": "php",
    "subskillId": "1.35",
    "answer": [
      "PHP dagi oddiy massiv (Associative Array) aslida murakkab Hash Table tuzilmasidir va har bir element uchun katta miqdorda qo'shimcha xotira sarflaydi.",
      "",
      "- **SplFixedArray:** Faqat sonli indekslarga ega, o'lchami qat'iy belgilangan massiv. Oddiy massivga qaraganda 3 barobar kam xotira sarflaydi va tezroq ishlaydi (Millionlab qatorlarni xotirada saralashda qo'l keladi).",
      "- **SplPriorityQueue (Ustuvorlik navbati):** Elementlarni berilgan ustuvorlik (Priority) bo'yicha saralab beruvchi Heap (uyum) daraxti. Eng muhim vazifani $O(\\log N)$ vaqtda olish imkonini beradi."
    ],
    "tip": "Katta masshtabli algoritmlarda xotira tejash uchun SPL tuzilmalarini bilish nomzodning chuqur kompyuter ilmlari (CS fundamentals) asosiga egaligini ko'rsatadi."
  },

  // --- Laravel ---
  {
    "id": "iq-116",
    "title": "Laravel: Macroable traiti qanday ishlaydi va freymvork ichki sinflarini kengaytirishda u qachon ishlatiladi?",
    "level": "junior",
    "category": "laravel",
    "categoryLabel": "Laravel",
    "skillSlug": "laravel",
    "subskillId": "2.28",
    "answer": [
      "`Macroable` traiti freymvorkning ichki sinflariga (`Response`, `Request`, `Collection`, `Str`, `Blueprint`) o'zgartirish kiritmasdan dinamik yangi metodlar qo'shish imkonini beradi.",
      "",
      "```php",
      "// AppServiceProvider::boot()",
      "Response::macro('apiSuccess', function ($data, $message = 'OK') {",
      "    return Response::json([",
      "        'success' => true,",
      "        'message' => $message,",
      "        'data' => $data",
      "    ], 200);",
      "});",
      "",
      "// Controller ichida:",
      "return response()->apiSuccess($user, 'Profil muvaffaqiyatli yuklandi');",
      "```",
      "- Ichki mexanizm: `Macroable` traitidagi statik `$macros` massiviga Closure saqlanadi va `__call` / `__callStatic` orqali `$this` kontekstida ishga tushiriladi."
    ],
    "tip": "API loyihalarida bir xil formatdagi JSON javoblar qaytarish uchun `Response::macro` dan foydalanish juda qulaydir."
  },
  {
    "id": "iq-117",
    "title": "Laravel: Service Provider'lardagi register() va boot() metodlarining bajarilish tartibi va asosiy farqi nima?",
    "level": "senior",
    "category": "laravel",
    "categoryLabel": "Laravel",
    "skillSlug": "laravel",
    "subskillId": "2.24",
    "answer": [
      "Laravel so'rovni qabul qilganda Service Providerlarni 2 bosqichda yuklaydi:",
      "",
      "**1. `register()` bosqichi:**",
      "- FAQAT Service Container ga bog'lash (binding) uchun mo'ljallangan (`$this->app->singleton(...)`).",
      "- **Muhim qoida:** `register()` ichida hech qachon boshqa servislar yoki event tinglovchilarni chaqirmaslik kerak, chunki boshqa providerlar hali ro'yxatdan o'tmagan bo'lishi mumkin.",
      "",
      "**2. `boot()` bosqichi:**",
      "- BARCHA providerlarning `register()` metodi bajarilib bo'lgach chaqiriladi.",
      "- Bu yerda har qanday xizmatni chaqirish, View Composer, Event Listener, Route, Macro yoki Middleware qo'shish xavfsizdir."
    ],
    "tip": "Agar bitta servis ichida boshqa servis kerak bo'lsa, uni `boot()` da ishlatish kerakligini bilish Laravel arxitekturasini tushunish belgisidir."
  },
  {
    "id": "iq-118",
    "title": "Laravel: Contextual Binding va Tagging: Service Containerda bir xil interfeysga turli klasslarni qanday bog'laymiz?",
    "level": "senior",
    "category": "laravel",
    "categoryLabel": "Laravel",
    "skillSlug": "laravel",
    "subskillId": "2.24",
    "answer": [
      "Bitta `PaymentGatewayInterface` mavjud, lekin `PhotoController` uchun Payme, `VideoController` uchun esa Stripe kerak bo'lganda **Contextual Binding** ishlatiladi:",
      "",
      "```php",
      "$this->app->when(PhotoOrderController::class)",
      "          ->needs(PaymentGatewayInterface::class)",
      "          ->give(PaymeGateway::class);",
      "",
      "$this->app->when(VideoOrderController::class)",
      "          ->needs(PaymentGatewayInterface::class)",
      "          ->give(StripeGateway::class);",
      "```",
      "- **Tagging:** Bir nechta turli servisni bitta guruhga (masalan `reports`) birlashtirib, keyin bitta massiv sifatida barchasini birdan ineksiya qilish (`$this->app->tagged('reports')`)."
    ],
    "tip": "Contextual binding bir xil interfeysli ko'plab integratsiyalarni Clean Architecture qoidalariga binoan ineksiya qilishda qo'l keladi."
  },
  {
    "id": "iq-119",
    "title": "Laravel Eloquent: Global Scope va Local Scope farqi: withoutGlobalScope qachon va nima uchun qo'llaniladi?",
    "level": "junior",
    "category": "laravel",
    "categoryLabel": "Laravel",
    "skillSlug": "eloquent-orm",
    "subskillId": "13.8",
    "answer": [
      "- **Local Scope:** Modelda `scopeActive($query)` qilib yoziladi va kerak bo'lganda chaqiriladi: `User::active()->get()`.",
      "- **Global Scope:** Modelning har qanday so'roviga avtomatik qo'shiladigan qoida (masalan, `SoftDeletes` yoki Multi-tenantda `WHERE tenant_id = 1`).",
      "",
      "```php",
      "// Global Scope misoli:",
      "protected static function booted(): void {",
      "    static::addGlobalScope('published', fn ($q) => $q->where('is_published', true));",
      "}",
      "",
      "// Admin panelda qoralamalarni ham ko'rish kerak bo'lsa:",
      "Article::withoutGlobalScope('published')->get();",
      "// yoki barcha global skoplarni olib tashlash:",
      "Article::withoutGlobalScopes()->get();",
      "```"
    ],
    "tip": "Global Scope bilan juda ehtiyot bo'lish kerak — unutilgan global scope kutilmagan ma'lumotlar yo'qolishiga sabab bo'lishi mumkin."
  },
  {
    "id": "iq-120",
    "title": "Laravel Eloquent: Enforced MorphMap nima va nega polimorfik bog'lanishlarda to'liq klass nomini saqlamaslik kerak?",
    "level": "middle",
    "category": "laravel",
    "categoryLabel": "Laravel",
    "skillSlug": "eloquent-orm",
    "subskillId": "13.12",
    "answer": [
      "Standart holatda polimorfik munosabatlarda (Polymorphic relations) `commentable_type` ustuniga to'liq sinf nomi yoziladi: `App\\\\Models\\\\Post`.",
      "",
      "**Muammo:**",
      "- Agar ertaga model nomini o'zgartirsangiz yoki boshqa papkaga ko'chirsangiz (`App\\\\Domain\\\\Blog\\\\Models\\\\Post`), bazadagi barcha eski ma'lumotlar buziladi.",
      "- Ma'lumotlar bazasi ilovaning ichki sinflar tuzilmasiga qattiq bog'lanib qoladi (tight coupling).",
      "",
      "**Yechim (Relation::enforceMorphMap):**",
      "```php",
      "// AppServiceProvider::boot()",
      "Relation::enforceMorphMap([",
      "    'post' => \\App\\Models\\Post::class,",
      "    'video' => \\App\\Models\\Video::class,",
      "]);",
      "```",
      "- Bazada faqat `'post'` va `'video'` satrlari saqlanadi. Agar yangi polimorfik model qo'shilsa-yu, xaritaga kiritilmasa — Laravel xato beradi (himoyalaydi)."
    ],
    "tip": "Senior arxitektor loyiha boshidanoq doim enforceMorphMap ni yoqib qo'yadi."
  },
  {
    "id": "iq-121",
    "title": "Laravel Eloquent: Custom Casts va Value Objects (CastsAttributes) qanday ishlaydi?",
    "level": "middle",
    "category": "laravel",
    "categoryLabel": "Laravel",
    "skillSlug": "eloquent-orm",
    "subskillId": "13.10",
    "answer": [
      "Eloquent ustunini oddiy satr/raqam emas, boy xususiyatlarga ega Value Object ga aylantirish uchun `CastsAttributes` interfeysi ishlatiladi.",
      "",
      "```php",
      "class MoneyCast implements CastsAttributes {",
      "    public function get($model, $key, $value, $attributes): Money {",
      "        return new Money($value, 'UZS');",
      "    }",
      "    public function set($model, $key, $value, $attributes): int {",
      "        return $value instanceof Money ? $value->getAmountInCents() : (int)$value;",
      "    }",
      "}",
      "",
      "// Modelda:",
      "protected function casts(): array {",
      "    return ['price' => MoneyCast::class];",
      "}",
      "```",
      "- Natijada `$order->price->format()` yoki `$order->price->add($tax)` kabi toza obyektli kod yozish mumkin."
    ],
    "tip": "DDD (Domain Driven Design) da Value Objectlar yaratish uchun Custom Casts asosiy vositadir."
  },

  // --- Ma'lumotlar bazasi ---
  {
    "id": "iq-122",
    "title": "Laravel Database Transactions: Nested Transactions va Savepoints qanday ishlaydi?",
    "level": "middle",
    "category": "database",
    "categoryLabel": "Ma'lumotlar bazasi",
    "skillSlug": "database-transactions",
    "subskillId": "17.6",
    "answer": [
      "Aksariyat RDBMS lar (MySQL, PostgreSQL) ichma-ich haqiqiy tranzaksiyalarni (True Nested Transactions) qo'llab-quvvatlamaydi. Agar ichki `START TRANSACTION` chaqirilsa, tashqi tranzaksiya darhol kommit bo'lib ketadi.",
      "",
      "**Laravel qanday hal qiladi (Savepoints)?**",
      "- Laravel tranzaksiya darajasini sanab boradi (`$transactions = 1, 2, ...`).",
      "- Birinchi `DB::transaction()` haqiqiy `BEGIN` ochadi.",
      "- Ichki `DB::transaction()` lar esa `SAVEPOINT trans2;` yaratadi.",
      "- Agar ichki tranzaksiyada xatolik yuz bersa, butun tranzaksiya emas, faqat o'sha savepoint gacha orqaga qaytariladi (`ROLLBACK TO SAVEPOINT trans2`)."
    ],
    "tip": "Murakkab biznes jarayonlarda ichki tranzaksiya xato bersa ham, tashqi tranzaksiyani saqlab qolish uchun Savepoint mexanizmini tushunish shart."
  },

  // --- Laravel ---
  {
    "id": "iq-123",
    "title": "Laravel: Cache Tags qachon ishlatiladi va nima uchun File/Database kesh drayverlarida Cache Tags ishlamaydi?",
    "level": "middle",
    "category": "laravel",
    "categoryLabel": "Laravel",
    "skillSlug": "caching-strategies",
    "subskillId": "54.6",
    "answer": [
      "**Cache Tags:** Bog'liq kesh kalitlarini guruhlash va bitta buyruq bilan tozalash imkonini beradi.",
      "```php",
      "Cache::tags(['people', 'authors'])->put('Anne', $data, 3600);",
      "Cache::tags(['people', 'authors'])->flush(); // Mualliflarga oid barcha kesh tozalanadi",
      "```",
      "",
      "**Nega File va Database drayverlarida ishlamaydi?**",
      "- Fayl tizimi va oddiy jadvallarda teglar bo'yicha bog'langan millionlab kalitlarni tezda qidirish va o'chirish juda qimmat (Full table/directory scan talab qiladi).",
      "- Redis va Memcached xotirada Set ma'lumot tuzilmasi orqali teglar va ularning kalitlarini mikrosekundlarda atomar o'chiradi."
    ],
    "tip": "Katta loyihalarda keshni selektiv tozalash uchun doim Redis va Cache Tags ishlatiladi."
  },

  // --- Xavfsizlik ---
  {
    "id": "iq-124",
    "title": "Laravel Rate Limiting: ThrottleRequests middleware'i qanday ishlaydi va Redis bilan distributed limit qanday o'rnatiladi?",
    "level": "middle",
    "category": "security",
    "categoryLabel": "Xavfsizlik",
    "skillSlug": "web-application-security",
    "subskillId": "51.8",
    "answer": [
      "Laravel `RateLimiter` fasadi yordamida daqiqasiga ruxsat berilgan so'rovlar sonini cheklaydi:",
      "```php",
      "RateLimiter::for('api', function (Request $request) {",
      "    return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());",
      "});",
      "```",
      "- **Ichki mexanizm:** Redis keshida foydalanuvchi ID yoki IP si bo'yicha kalit va qolgan urinishlar soni saqlanadi (`INCR` va `EXPIRE`).",
      "- **Distributed Limiting:** Agar ilovada 5 ta server (Load Balancer orqasida) bo'lsa, limit keshini Redis ga ulash shart, aks holda har bir server o'zicha 60 ta so'rov qabul qilib, umumiy limit 300 taga chiqib ketadi."
    ],
    "tip": "API xavfsizligida DDoS va Brute-Force hujumlaridan himoyalanishda Rate Limiter birinchi mudofaa chizig'idir."
  },

  // --- Arxitektura & Tizim Dizayni ---
  {
    "id": "iq-125",
    "title": "Laravel: Pipeline Pattern nima va o'zimizning mustaqil Pipeline'imizni qanday quramiz?",
    "level": "middle",
    "category": "architecture",
    "categoryLabel": "Arxitektura & Tizim Dizayni",
    "skillSlug": "design-patterns",
    "subskillId": "5.10",
    "answer": [
      "Laravel Middleware tizimi to'liq **Pipeline Pattern** asosida qurilgan: obyekt bir nechta filtrlar (Pipes) orqali ketma-ket o'tadi va har bir filtr unga o'zgartirish kiritadi yoki jarayonni to'xtatadi.",
      "",
      "```php",
      "use Illuminate\\Support\\Facades\\Pipeline;",
      "",
      "$order = Pipeline::send($initialOrder)",
      "    ->through([",
      "        CheckStockPipe::class,",
      "        ApplyDiscountPipe::class,",
      "        CalculateTaxPipe::class,",
      "    ])",
      "    ->then(fn ($order) => $order);",
      "```",
      "- Har bir Pipe sinfida `handle($content, Closure $next)` metodi bo'ladi.",
      "- Murakkab checkout, import yoki hisob-kitob jarayonlarini mayda mustaqil qadamlarga ajratishda juda qo'l keladi."
    ],
    "tip": "Pipeline pattern SOLID tamoyillarining Open/Closed (OCP) va Single Responsibility (SRP) qoidalariga to'liq mos keladi."
  },

  // --- Laravel ---
  {
    "id": "iq-126",
    "title": "Laravel: FormRequest after validation hooks ('after()') qachon kerak bo'ladi?",
    "level": "junior",
    "category": "laravel",
    "categoryLabel": "Laravel",
    "skillSlug": "laravel",
    "subskillId": "2.16",
    "answer": [
      "Oddiy qoidalar (`required`, `email`, `numeric`) kiritilganidan so'ng, qo'shimcha murakkab biznes mantiqni tekshirish uchun `after()` hooki ishlatiladi:",
      "```php",
      "class TransferMoneyRequest extends FormRequest {",
      "    public function rules(): array {",
      "        return ['amount' => 'required|numeric|min:1', 'receiver_id' => 'required'];",
      "    }",
      "    public function after(): array {",
      "        return [",
      "            function (Validator $validator) {",
      "                if ($this->user()->balance < $this->amount) {",
      "                    $validator->errors()->add('amount', 'Hisobingizda mablag\\' yetarli emas.');",
      "                }",
      "            }",
      "        ];",
      "    }",
      "}",
      "```"
    ],
    "tip": "Controller ichida ortiqcha if-shart tekshiruvlari yozmasdan, barcha validatsiya va biznes cheklovlarni FormRequest ichida to'plash toza kod belgisidir."
  },

  // --- Xavfsizlik ---
  {
    "id": "iq-127",
    "title": "Laravel: Signed URLs (URL::temporarySignedRoute) qanday ishlaydi va ular qanday xavfsizlik kafolatini beradi?",
    "level": "junior",
    "category": "security",
    "categoryLabel": "Xavfsizlik",
    "skillSlug": "web-application-security",
    "subskillId": "51.6",
    "answer": [
      "`URL::temporarySignedRoute` elektron pochtani tasdiqlash yoki parolni tiklash havolalarida ishlatiladi:",
      "```php",
      "URL::temporarySignedRoute(",
      "    'unsubscribe', now()->addHours(24), ['user' => $user->id]",
      ");",
      "```",
      "- **Ishlash printsipi:** Havolaga `expires` (amal qilish muddati) va `signature` (HMAC xesh) qo'shiladi.",
      "- Hujumchi URL dagi `user=5` ni `user=1` ga o'zgartira olmaydi, chunki server `APP_KEY` bilan tekshirganda imzo noto'g'ri bo'lib `403 Invalid Signature` qaytaradi.",
      "- Belgilangan vaqt (24 soat) o'tgach, havola avtomatik bekor bo'ladi."
    ],
    "tip": "Foydalanuvchi tizimga kirmasdan bajaradigan xavfli amallarda (obunani bekor qilish, email tasdiqlash) doim Signed Route ishlatish shart."
  },

  // --- Laravel ---
  {
    "id": "iq-128",
    "title": "Laravel: Invokable Validation Rules: Custom Rule sinflarini qanday yaratamiz va ularning afzalligi nima?",
    "level": "junior",
    "category": "laravel",
    "categoryLabel": "Laravel",
    "skillSlug": "laravel",
    "subskillId": "2.16",
    "answer": [
      "`php artisan make:rule Uppercase` orqali `ValidationRule` interfeysiga ega zamonaviy qoida yaratiladi:",
      "```php",
      "class Uppercase implements ValidationRule {",
      "    public function validate(string $attribute, mixed $value, Closure $fail): void {",
      "        if (strtoupper($value) !== $value) {",
      "            $fail(\":attribute katta harflarda bo'lishi shart.\");",
      "        }",
      "    }",
      "}",
      "```",
      "- Controller yoki FormRequest da oddiygina `['code' => ['required', new Uppercase]]` qilib ulanadi.",
      "- Testlash juda oson va kod takrorlanishining oldini oladi."
    ],
    "tip": "Laravel 10 dan boshlab eski passes() metodi o'rniga zamonaviy Closure $fail qabul qiluvchi validate() metodi ishlatiladi."
  },

  // --- Eloquent ORM ---
  {
    "id": "iq-129",
    "title": "Laravel Eloquent: Lazy Eager Loading: load() va loadMissing() metodlarining muhim farqi nima?",
    "level": "junior",
    "category": "eloquent",
    "categoryLabel": "Eloquent ORM",
    "skillSlug": "eloquent-orm",
    "subskillId": "13.6",
    "answer": [
      "Agar model allaqachon xotirada bo'lsa va unga keyinchalik relatsiya kerak bo'lib qolsa:",
      "- `$books->load('author')`: Mualliflar allaqachon yuklangan bo'lsa ham, bazaga QAYTA so'rov jo'natib yangitdan yuklaydi.",
      "- `$books->loadMissing('author')`: Faqat hali yuklanmagan bo'lsagina bazaga so'rov yuboradi. Agar mualliflar allaqachon xotirada bo'lsa, ortiqcha SQL so'rov bajarmaydi.",
      "",
      "API Resource yoki Service sinflarida ortiqcha SQL so'rovlarning oldini olish uchun doim `loadMissing()` ishlatish tavsiya etiladi."
    ],
    "tip": "Optimizatsiya qoidasi: Agar relatsiya mavjudligiga 100% ishonchingiz bo'lmasa, har doim load() emas, loadMissing() dan foydalaning."
  },

  // --- Laravel ---
  {
    "id": "iq-130",
    "title": "Laravel: Model Pruning (Prunable va MassPrunable) katta bazalarda eski loglar va sessiyalarni qanday tozalaydi?",
    "level": "middle",
    "category": "laravel",
    "categoryLabel": "Laravel",
    "skillSlug": "eloquent-orm",
    "subskillId": "13.14",
    "answer": [
      "Katta loyihalarda eski loglar, bekor qilingan savatlar yoki vaqti o'tgan tokenlar millionlab to'planib qoladi.",
      "",
      "**Laravel Prunable yechimi:**",
      "```php",
      "class AuditLog extends Model {",
      "    use MassPrunable;",
      "",
      "    public function prunable() {",
      "        return static::where('created_at', '<=', now()->subDays(30));",
      "    }",
      "}",
      "```",
      "- `MassPrunable` barcha eski qatorlarni model eventlarisiz to'g'ridan-to'g'ri tezkor SQL `DELETE` orqali o'chiradi.",
      "- Server scheduleriga `php artisan model:prune` qo'yiladi va u har kecha bazani avtomat tozalab boradi."
    ],
    "tip": "Baza o'lchamini nazorat qilish va disk to'lib qolishining oldini olish uchun Prunable traitsi ajoyib native vositadir."
  },

  // --- REST API ---
  {
    "id": "iq-131",
    "title": "Laravel: API Resources: AnonymousResourceCollection va maxsus ResourceCollection farqi nima?",
    "level": "junior",
    "category": "laravel",
    "categoryLabel": "REST API",
    "skillSlug": "rest-api",
    "subskillId": "18.8",
    "answer": [
      "- `UserResource::collection($users)` chaqirilganda Laravel avtomatik ravishda `AnonymousResourceCollection` yaratadi.",
      "- Agar butun kolleksiyaga qo'shimcha metadata, saralash statistikasi yoki maxsus wrapper kerak bo'lsa, alohida `UserCollection extends ResourceCollection` ochiladi:",
      "```php",
      "class UserCollection extends ResourceCollection {",
      "    public function toArray(Request $request): array {",
      "        return [",
      "            'data' => $this->collection,",
      "            'total_active_users' => $this->collection->where('is_active', true)->count(),",
      "        ];",
      "    }",
      "}",
      "```"
    ],
    "tip": "Oddiy ro'yxatlar uchun ::collection() yetarli, lekin murakkab hisob-kitobli API metadata uchun maxsus Collection sinfi kerak bo'ladi."
  },

  // --- Laravel ---
  {
    "id": "iq-132",
    "title": "Laravel 11: Context Facade nima va taqsimlangan loglarda (Distributed Tracing) u qanday yordam beradi?",
    "level": "middle",
    "category": "laravel",
    "categoryLabel": "Laravel",
    "skillSlug": "logging-and-monitoring",
    "subskillId": "58.6",
    "answer": [
      "Laravel 11 da yangi `Context` fasadi taqdim etildi. U joriy so'rovga oid ma'lumotlarni (Trace ID, Foydalanuvchi ID, IP) butun ilova bo'ylab, shu jumladan Background Queuelarga ham avtomatik uzatadi.",
      "",
      "```php",
      "// Middleware ichida:",
      "Context::add('trace_id', Str::uuid()->toString());",
      "Context::add('user_id', auth()->id());",
      "",
      "// Butun kod bo'ylab istalgan Log chaqirilganda:",
      "Log::info('Buyurtma to\\'landi');",
      "// Log faylida avtomat qo'shiladi: [trace_id: 123-abc, user_id: 5] Buyurtma to'landi",
      "```",
      "- Eng muhimi: Bu so'rovdan ishga tushirilgan barcha Queue Joblarga ham ushbu `Context` avtomatik ko'chib o'tadi!"
    ],
    "tip": "Mikroservislar va murakkab loglarni Sentry yoki Kibana da bitta trace_id bo'yicha qidirishda Context fasadi bebahodir."
  },

  // --- Eloquent ORM ---
  {
    "id": "iq-133",
    "title": "Laravel: Eloquent Observers vs Model Events (booted): Qachon qaysi birini ishlatish to'g'ri?",
    "level": "middle",
    "category": "eloquent",
    "categoryLabel": "Eloquent ORM",
    "skillSlug": "eloquent-orm",
    "subskillId": "13.8",
    "answer": [
      "- **Model `booted()` metodidagi hodisalar:** Modelning o'ziga xos bo'lgan mayda amallar (masalan, UUID yoki Slug generatsiya qilish) uchun qulay.",
      "- **Observers (Kuzatuvchilar):** Katta va murakkab logikalar (Masalan `UserObserver` ichida `created`, `updated`, `deleted` hodisalarida CRM ga xabar jo'natish, keshni tozalash, audit log yozish) uchun alohida sinfga ajratish yaxshi.",
      "",
      "**Diqqat (Tuzoq):** Mass-assignment operatsiyalari (`User::where(...)->update(...)` yoki `insert()`) Model Event va Observerlarni ISHGA TUSHIRMAYDI!"
    ],
    "tip": "Intervyuda mass-update paytida Observerlar ishlamasligini aytib o'tish nomzodning amaliy tajribasini darhol isbotlaydi."
  },

  // --- Navbatlar & Async ---
  {
    "id": "iq-134",
    "title": "Laravel Queues: ShouldBeUnique va ShouldBeUniqueUntilProcessing interfeyslarining nozik farqi nima?",
    "level": "middle",
    "category": "async",
    "categoryLabel": "Navbatlar & Async",
    "skillSlug": "queues-and-background-jobs",
    "subskillId": "46.10",
    "answer": [
      "- `ShouldBeUnique`: Vazifa navbatga qo'yilgandan to u **TO'LIQ BAJARILIB BO'LGUNCHA** yangi xuddi shunday vazifani navbatga kiritishni bloklaydi.",
      "- `ShouldBeUniqueUntilProcessing`: Vazifa worker tomonidan **ISHLOV BERILISHI BOSHLANISHI BILAN** blokirovkani yechadi. Ya'ni birinchi job ishlayotgan paytda yangi navbatdagi job qabul qilinishi mumkin.",
      "",
      "Foydalanuvchi bitta tugmani ketma-ket 10 marta bosib yuborganda bir xil joblar navbatda to'planib qolmasligi uchun `ShouldBeUnique` qo'yiladi."
    ],
    "tip": "To'lovlar yoki og'ir hisobotlar generatsiyasida takroriy joblarni bloklash uchun unique id va lock vaqtini (uniqueFor) to'g'ri sozlash kerak."
  },

  // --- Laravel ---
  {
    "id": "iq-135",
    "title": "Laravel: Scoped Route Model Binding nima va u IDOR xavfsizlik muammosini qanday bartaraf etadi?",
    "level": "middle",
    "category": "laravel",
    "categoryLabel": "Laravel",
    "skillSlug": "laravel",
    "subskillId": "2.12",
    "answer": [
      "URL: `/users/{user}/posts/{post}`",
      "Agar oddiy Route Model Binding bo'lsa, tajovuzkor `users/5/posts/99` orqali boshqa foydalanuvchiga tegishli postni ko'rib qo'yishi mumkin (IDOR - Insecure Direct Object Reference).",
      "",
      "**Scoped Binding yechimi:**",
      "```php",
      "Route::get('/users/{user}/posts/{post}', [PostController::class, 'show'])",
      "    ->scopeBindings();",
      "```",
      "- Laravel avtomatik tarzda `post` aynan shu `user` ga tegishli ekanligini SQL darajasida tekshiradi (`WHERE id = 99 AND user_id = 5`).",
      "- Agar post boshqa odamniki bo'lsa, darhol `404 Not Found` qaytaradi."
    ],
    "tip": "RESTful nested marshrutlarda xavfsizlikni kafolatlash uchun scopeBindings() dan foydalanish eng yaxshi amaliyotdir."
  },

  // --- Ma'lumotlar bazasi ---
  {
    "id": "iq-136",
    "title": "PostgreSQL vs MySQL: MVCC arxitekturasi va VACUUM mexanizmidagi tub farq nima?",
    "level": "lead",
    "category": "database",
    "categoryLabel": "Ma'lumotlar bazasi",
    "skillSlug": "postgresql",
    "subskillId": "11.10",
    "answer": [
      "Ikkala baza ham ko'p versiyali nazoratdan (MVCC) foydalanadi, lekin implementatsiyasi mutlaqo boshqacha:",
      "",
      "**1. MySQL (InnoDB):**",
      "- Qatordagi ma'lumot joyida (in-place) yangilanadi.",
      "- Eski versiyalar **Undo Log** segmentiga yoziladi.",
      "- Tranzaksiya tugagach, Undo Log fonli tozalagich (Purge thread) tomonidan avtomat o'chiriladi.",
      "",
      "**2. PostgreSQL:**",
      "- Qator yangilanganda eski qator o'chirilmaydi, yangi qator (Tuple) jadval oxiriga yoziladi (Append-only). Eski qator 'Dead Tuple' bo'lib qoladi.",
      "- **VACUUM zarurati:** Ushbu o'lik qatorlarni tozalash va disk maydonini bo'shatish uchun `VACUUM` (yoki Autovacuum) davriy ishlashi shart. Agar Autovacuum ortda qolsa, jadval shishib (Table Bloat) ketadi va qidiruv sekinlashadi."
    ],
    "tip": "PostgreSQL da Autovacuum tuning va Table Bloat muammosini tushuntirish Lead DBA / Architect darajasidagi savol hisoblanadi."
  },
  {
    "id": "iq-137",
    "title": "Database: Covering Index (Index-Only Scan) nima va u so'rovni nega 100 barobargacha tezlashtiradi?",
    "level": "middle",
    "category": "database",
    "categoryLabel": "Ma'lumotlar bazasi",
    "skillSlug": "database-indexing",
    "subskillId": "55.8",
    "answer": [
      "Oddiy ikkilamchi indeks (Secondary Index) orqali qidirilganda, MySQL avval indeks daraxtini o'qiydi, so'ngra asosiy jadvalga (Clustered Index / Data pages) murojaat qilib qolgan ustunlarni oladi (Bookmark Lookup / Random I/O).",
      "",
      "**Covering Index (Qamrab oluvchi indeks):**",
      "Agar so'rovdagi `SELECT`, `WHERE`, `ORDER BY` ustunlarining barchasi indeksning o'zida mavjud bo'lsa:",
      "```sql",
      "-- Indeks: INDEX(user_id, status, created_at)",
      "SELECT user_id, status, created_at FROM orders WHERE user_id = 5 AND status = 'paid';",
      "```",
      "- Dvigatel asosiy jadval diskiga umuman tushmaydi! Barcha ma'lumot to'g'ridan-to'g'ri indeks keshining o'zidan (RAM) olinadi.",
      "- `EXPLAIN` da `Using index` deb ko'rinadi. Bu disk I/O ni butunlay yo'qotib, so'rovni yuzlab marta tezlashtiradi."
    ],
    "tip": "High-load tizimlarda og'ir so'rovlarni optimallashtirishning eng kuchli quroli aynan Covering Index hisoblanadi."
  },
  {
    "id": "iq-138",
    "title": "Database: Prefix Index nima va uzun satrlarni (URL, Email, Hash) indekslashda u qanday xotira tejaydi?",
    "level": "junior",
    "category": "database",
    "categoryLabel": "Ma'lumotlar bazasi",
    "skillSlug": "database-indexing",
    "subskillId": "55.10",
    "answer": [
      "Uzunligi 255 yoki 500 bayt bo'lgan ustunni to'liq indekslash B+Tree daraxtini juda katta qilib yuboradi va RAM ga sig'may qoladi.",
      "",
      "**Prefix Index yechimi:** Satrning faqat birinchi $N$ ta belgisini indekslash:",
      "```sql",
      "CREATE INDEX idx_email_prefix ON users (email(12));",
      "```",
      "- Masalan, 12 ta belgi ko'pincha foydalanuvchini 99.9% aniqlik bilan ajratish uchun yetarli bo'ladi.",
      "- Indeks hajmi 3-4 barobarga qisqaradi va to'liq RAM da turadi.",
      "- *Cheklov:* Prefix indekslar `ORDER BY` yoki Covering Index maqsadlarida to'liq ishlay olmaydi."
    ],
    "tip": "Optimal prefix uzunligini tanlash uchun `SELECT COUNT(DISTINCT LEFT(col, 10)) / COUNT(*)` orqali unikalik nisbati (selektivlik) o'lchanadi."
  },
  {
    "id": "iq-139",
    "title": "Database: Clustered Index va Secondary Index o'rtasidagi ikki bosqichli qidiruv (Bookmark Lookup) qanday ishlaydi?",
    "level": "senior",
    "category": "database",
    "categoryLabel": "Ma'lumotlar bazasi",
    "skillSlug": "mysql",
    "subskillId": "10.12",
    "answer": [
      "MySQL InnoDB da jadvallar **Clustered Index** (odatda `PRIMARY KEY`) asosida jismonan diskda saralangan holda saqlanadi. B+Tree ning bargida (leaf node) qatorning barcha ma'lumotlari joylashadi.",
      "",
      "**Secondary Index (Ikkilamchi indeks):**",
      "- Masalan `email` ustunidagi indeks. Uning barglarida faqat `email` qiymati va asosiy kalit (`id`) saqlanadi.",
      "- Qidiruv jarayoni:",
      "  1. Dvigatel `email` indeksidan qidirib `id = 42` ekanligini topadi.",
      "  2. So'ngra asosiy Clustered Index daraxtiga borib `id = 42` bo'yicha qatorning qolgan barcha ustunlarini o'qiydi (**Bookmark Lookup / Secondary Lookup**).",
      "- Agar so'rov 1000 ta qator topsa, 1000 marta asosiy jadvalga sakrash (Random I/O) talab qilinadi."
    ],
    "tip": "Secondary Indexdagi ikki bosqichli qidiruvni yo'qotish uchun Covering Index ishlatiladi."
  },

  // --- Redis ---
  {
    "id": "iq-140",
    "title": "Redis: Redis Streams vs Pub/Sub: Xabarlar yo'qolib ketmasligini (Persistence) ta'minlashda qaysi biri to'g'ri?",
    "level": "senior",
    "category": "database",
    "categoryLabel": "Redis",
    "skillSlug": "redis",
    "subskillId": "12.8",
    "answer": [
      "- **Redis Pub/Sub (Fire-and-forget):** Agar xabar kelgan paytda Subscriber (tinglovchi) tarmoq uzilishi tufayli o'chiq bo'lsa, xabar butunlay yo'qoladi! Xabarlar xotirada saqlanmaydi va qayta o'qish (history) imkonsiz.",
      "",
      "- **Redis Streams (Append-only Log - Kafka kabi):**",
      "  - Har bir xabar unikal ID bilan xotirada va diskda (AOF/RDB) saqlanadi.",
      "  - **Consumer Groups:** Bir nechta worker bitta oqimdan yuklamani bo'lishib o'qiydi.",
      "  - **ACK mexanizmi (`XACK`):** Worker xabarni muvaffaqiyatli bajargandagina tasdiqlaydi. Agar worker qulasa, bajarilmagan xabar boshqa workerga qayta beriladi (Pending Entries List - PEL)."
    ],
    "tip": "Muhim moliyaviy yoki navbat xabarlarida hech qachon Pub/Sub ishlatilmaydi — faqat Redis Streams yoki RabbitMQ."
  },
  {
    "id": "iq-141",
    "title": "Redis Eviction Policies: 'maxmemory' to'lganda 'volatile-lru', 'allkeys-lru' va 'noeviction' strategiyalari qanday ishlaydi?",
    "level": "senior",
    "category": "database",
    "categoryLabel": "Redis",
    "skillSlug": "redis",
    "subskillId": "12.10",
    "answer": [
      "Redis RAM xotirasi belgilangan limitga (`maxmemory`) yetganda, yangi ma'lumot yozish uchun nima qilish kerakligini `maxmemory-policy` belgilaydi:",
      "",
      "1. **noeviction (Standart):** Hech narsa o'chirilmaydi. Yangi yozish so'rovlari `OOM command not allowed` xatosi bilan rad etiladi. (Agar ma'lumot yo'qolishi kritik bo'lsa).",
      "2. **allkeys-lru:** Eng kam ishlatilgan (Least Recently Used) ixtiyoriy kalitni avtomat o'chirib xotira bo'shatadi. **Kesh tizimlari uchun eng yaxshi rejim.**",
      "3. **volatile-lru:** Faqatgina yashash muddati (`EXPIRE / TTL`) belgilangan kalitlar ichidan eng kam ishlatilganlarini o'chiradi. TTL belgilanmagan doimiy ma'lumotlarga tegilmaydi.",
      "4. **allkeys-lfu:** Eng kam chastotada (Least Frequently Used) chaqirilgan kalitlarni o'chiradi."
    ],
    "tip": "Agar Redis bir vaqtning o'zida ham Kesh, ham Session saqlash uchun ishlatilsa, volatile-lru yoki alohida Redis instansiyalari tavsiya etiladi."
  },
  {
    "id": "iq-142",
    "title": "Redis: MULTI/EXEC tranzaksiyalari va Lua skriptlarining atomarlikdagi farqi nima?",
    "level": "senior",
    "category": "database",
    "categoryLabel": "Redis",
    "skillSlug": "redis",
    "subskillId": "12.6",
    "answer": [
      "- `MULTI / EXEC`: Barcha buyruqlarni bitta blokda navbatga yig'adi va birga bajaradi. Ammo tranzaksiya ichida avvalgi buyruq natijasini tekshirib (if-else) shartli qaror qabul qilib bo'lmaydi.",
      "",
      "- **Lua Scripts (`EVAL`):**",
      "  - To'liq dasturlash mantiqini (shartlar, sikllar, hisob-kitoblar) Redis ichida bajaradi.",
      "  - **Mutlaq Atomarlik:** Redis skript bajarilayotgan paytda boshqa hech qanday mijoz so'rovini qabul qilmaydi (Blokirovka).",
      "  - Rate Limiter, Distributed Lock va Ombor qoldig'i hisoblash aynan Lua orqali amalga oshiriladi."
    ],
    "tip": "Redis da atomar 'Tekshir va agar to'g'ri bo'lsa yangila' (Check-and-Set) amallarini faqat Lua orqali xavfsiz qilish mumkin."
  },

  // --- Ma'lumotlar bazasi ---
  {
    "id": "iq-143",
    "title": "Database Connection Poolers: ProxySQL va PgBouncer nega kerak va ular qanday resurs tejaydi?",
    "level": "lead",
    "category": "database",
    "categoryLabel": "Ma'lumotlar bazasi",
    "skillSlug": "database-optimization",
    "subskillId": "15.14",
    "answer": [
      "PHP ning har bir HTTP so'rovi (PHP-FPM worker) alohida MySQL/Postgres TCP ulanishini ochadi. Agar 500 ta worker bo'lsa, bazaga 500 ta og'ir ulanish tushadi va RAM to'lib ketadi.",
      "",
      "**Connection Pooler (ProxySQL / PgBouncer):**",
      "- Web serverlar va Baza o'rtasida turadi.",
      "- 500 ta PHP ulanishini qabul qiladi, lekin ma'lumotlar bazasi bilan atigi 20-30 ta barqaror ulanish (Multiplexing) orqali ishlaydi.",
      "- So'rov tugashi bilan ulanish darhol boshqa workerga beriladi.",
      "- Shuningdek, Read/Write so'rovlarni avtomat Master va Slave replikalarga taqsimlaydi va Slow querylarni keshlay oladi."
    ],
    "tip": "Yuqori yuklamali PHP tizimlarda bazani qulashdan saqlashning eng sinalgan yechimi Connection Pooler o'rnatishdir."
  },
  {
    "id": "iq-144",
    "title": "MySQL Replication: Asynchronous, Semi-Synchronous va Group Replication farqi nima?",
    "level": "lead",
    "category": "database",
    "categoryLabel": "Ma'lumotlar bazasi",
    "skillSlug": "mysql",
    "subskillId": "10.14",
    "answer": [
      "1. **Asynchronous (Standart):** Master tranzaksiyani kommit qiladi va darhol mijozga javob beradi. Binlog Slave ga yetib borgani yoki bormaganini kutmaydi. *Xavf:* Agar Master shu soniyada qulasa, so'nggi ma'lumotlar yo'qoladi (Data loss).",
      "",
      "2. **Semi-Synchronous:** Master tranzaksiyani kommit qilishdan oldin kamida bitta Slave ma'lumotni Relay log ga yozganini tasdiqlashini kutadi. Ma'lumot yo'qolishi keskin kamayadi, lekin kechikish (latency) biroz oshadi.",
      "",
      "3. **Group Replication (Paxos asosida):** Bir nechta tugunlar guruh bo'lib ishlaydi. Tranzaksiya ko'pchilik (Quorum) tomonidan tasdiqlangandagina qabul qilinadi. Avtomat Failover (bitta tugun o'lsa yangi master saylanishi) kafolatlanadi."
    ],
    "tip": "Bank va to'lov tizimlarida ma'lumot yo'qolmasligi uchun hech bo'lmaganda Semi-sync yoki Group replikatsiya talab etiladi."
  },

  // --- Laravel ---
  {
    "id": "iq-145",
    "title": "Laravel: Read/Write Database Splitting va 'sticky' konfiguratsiyasi nima uchun kerak?",
    "level": "middle",
    "category": "laravel",
    "categoryLabel": "Laravel",
    "skillSlug": "database-design",
    "subskillId": "14.10",
    "answer": [
      "Laravelda bitta Master (yozish) va bir nechta Read Replicas (o'qish) sozlanishi mumkin (`config/database.php`).",
      "",
      "**Replication Lag muammosi:**",
      "- Foydalanuvchi yangi post yaratadi (`INSERT` Master ga boradi).",
      "- Darhol qayta yo'naltiriladi va postlar ro'yxatini ochadi (`SELECT` Replika dan o'qiydi).",
      "- Agar replikatsiyada 100ms kechikish bo'lsa, foydalanuvchi yangi yaratgan postini ko'rmaydi va 'postim yo'qoldi' deb o'ylaydi.",
      "",
      "**'sticky' => true yechimi:**",
      "- Agar joriy so'rov (yoki foydalanuvchi sessiyasi) davomida bazaga `WRITE` (insert/update) amalga oshirilgan bo'lsa, Laravel qolgan barcha `SELECT` larni ham vaqtinchalik Masterdan o'qiydi. Natijada foydalanuvchi o'z o'zgarishini darhol ko'radi."
    ],
    "tip": "Read/Write splitting ishlatganda 'sticky' ni yoqib qo'yish Replication lag tufayli kelib chiqadigan g'alati vizual xatoliklarni bartaraf etadi."
  },

  // --- Ma'lumotlar bazasi ---
  {
    "id": "iq-146",
    "title": "Database: JSON ustunlarini indekslash: Virtual Generated Columns va Functional Indexes qanday ishlaydi?",
    "level": "middle",
    "category": "database",
    "categoryLabel": "Ma'lumotlar bazasi",
    "skillSlug": "database-indexing",
    "subskillId": "55.12",
    "answer": [
      "MySQL va PostgreSQL da butun JSON hujjatini to'g'ridan-to'g'ri B+Tree ga joylab bo'lmaydi. JSON ichidagi chuqur maydonlar bo'yicha qidiruv Full Table Scan qiladi.",
      "",
      "**Yechim (Generated Column + Index):**",
      "```sql",
      "-- 1. Virtual ustun yaratish (Diskda joy olmaydi, dinamik hisoblanadi):",
      "ALTER TABLE users ADD COLUMN phone VARCHAR(20)",
      "  GENERATED ALWAYS AS (details->>'$.phone') VIRTUAL;",
      "",
      "-- 2. Virtual ustunga oddiy B+Tree indeks o'rnatish:",
      "CREATE INDEX idx_users_phone ON users (phone);",
      "```",
      "- MySQL 8.0+ da Functional Index yordamida to'g'ridan-to'g'ri: `CREATE INDEX idx_phone ON users ((CAST(details->>'$.phone' AS CHAR(20))));` qilish ham mumkin.",
      "- Natijada JSON maydoni bo'yicha qidiruv millisekundda B+Tree indeksidan o'qiladi."
    ],
    "tip": "NoSQL xususiyatlarini relational bazada tezlikni yo'qotmasdan ishlatish uchun Functional Indexes ajoyib yechimdir."
  },
  {
    "id": "iq-147",
    "title": "Full-Text Search: MySQL MATCH AGAINST qachon yetarli va qachon Elasticsearch / Meilisearch ga o'tish shart?",
    "level": "senior",
    "category": "database",
    "categoryLabel": "Ma'lumotlar bazasi",
    "skillSlug": "database-optimization",
    "subskillId": "15.10",
    "answer": [
      "- **MySQL Full-Text Index (`MATCH ... AGAINST`):** Kichik va o'rta loyihalar uchun (50 000 tagacha maqola, sodda matnli qidiruv) yetarli. Inverted Index yaratadi, stopwords va booleans ishlaydi. Alohida server talab qilmaydi.",
      "",
      "- **Elasticsearch / Meilisearch zarur bo'ladigan holatlar:**",
      "  - Millionlab tovarlar bo'lgan e-commerce katalogi.",
      "  - **Xatolarni tuzatish (Typo tolerance / Fuzzy search):** Masalan 'Iphne' yozsa ham 'iPhone' ni topish.",
      "  - **Fasetli filtrlar (Faceted search):** Rang, razmer, narx bo'yicha bir vaqtda sonlarni hisoblab chiqarish.",
      "  - Murakkab tillar morfologiyasi (Stemming, Lemmatization) va sinonimlar.",
      "  - Bazaga yuklamani tushirish (Qidiruv asosiy MySQL ni qotirmaydi)."
    ],
    "tip": "Loyiha boshida ortiqcha infratuzilma kiritmasdan MySQL FTS bilan boshlash, talablar murakkablashgach Meilisearch ga o'tish tavsiya qilinadi."
  },
  {
    "id": "iq-148",
    "title": "Database Denormalization: Normalizatsiyaning (3NF) qaysi qoidalarini va nima uchun buzish kerak?",
    "level": "senior",
    "category": "database",
    "categoryLabel": "Ma'lumotlar bazasi",
    "skillSlug": "database-design",
    "subskillId": "14.8",
    "answer": [
      "Ma'lumotlar bazasi normalizatsiyasi (3NF) ma'lumotlar takrorlanishini (redundancy) yo'qotish uchun jadvallarni ajratadi. Ammo High-Load tizimlarda har bir so'rovda 5-6 ta jadvalni `JOIN` qilish sekinlashuvga olib keladi.",
      "",
      "**Nazorat ostidagi Denormalizatsiya usullari:**",
      "1. **Hisoblangan maydonlarni saqlash:** Har gal `SELECT COUNT(*) FROM comments WHERE post_id = ?` qilmasdan, `posts` jadvalida `comments_count` ustunini saqlash.",
      "2. **Tez-tez birga o'qiladigan ma'lumotlarni nusxalash:** `orders` jadvalida `user_name` va `product_title` ni saqlash (bu foydalanuvchi kelajakda ismini o'zgartirsa ham eski chekdagi tarixiy haqiqatni saqlab qoladi).",
      "3. **Savdo (Trade-off):** Yozish vaqtida qo'shimcha yangilash (yoki Event/Trigger) talab qilinadi, lekin millionlab foydalanuvchilar o'qiyotganda og'ir JOIN lar yo'qoladi."
    ],
    "tip": "Senior muhandis qat'iy nazariya bilan emas, o'qish/yozish profillariga (Read vs Write ratio) qarab biznes ehtiyojiga mos qaror qabul qiladi."
  },
  {
    "id": "iq-149",
    "title": "Time-Series Data: Metrikalar, sensorlar va loglarni relyatsion bazalarda (MySQL) saqlashdagi eng katta xatolar?",
    "level": "senior",
    "category": "database",
    "categoryLabel": "Ma'lumotlar bazasi",
    "skillSlug": "database-design",
    "subskillId": "14.12",
    "answer": [
      "Time-Series (Vaqtga bog'liq) ma'lumotlar juda tez (sekundiga minglab) yoziladi va faqat o'qiladi (deyarli yangilanmaydi).",
      "",
      "**MySQL dagi xatolar:**",
      "- Har bir metrikaga alohida B+Tree indeks qo'yish (har bir insertda indeks qayta balanslanadi va I/O bloklanadi).",
      "- Eskirgan ma'lumotlarni `DELETE FROM metrics WHERE created_at < ...` bilan o'chirish (Table fragmentation hosil qiladi va disk bo'shamaydi).",
      "",
      "**Yechimlar:**",
      "1. **Partitioning by Range (Date):** Har bir oyni alohida partitsiyaga ajratish. Eskirgan oyni o'chirish uchun bir zumda `ALTER TABLE metrics DROP PARTITION p_2025_01;` qilinadi (juda tez).",
      "2. **Ixtisoslashgan Time-Series bazalar:** ClickHouse, TimescaleDB, InfluxDB dan foydalanish (Ular ma'lumotlarni 10x siqadi va agregat so'rovlarni mikrosekundda bajaradi)."
    ],
    "tip": "Metrikalar va IoT ma'lumotlari uchun relyatsion bazalar to'g'ri kelmasligini, ClickHouse kabi ustunli (Columnar) bazalar afzalligini ta'kidlang."
  },
  {
    "id": "iq-150",
    "title": "Database Partitioning: Range, Hash va List partitsiyalash turlari qachon ishlatiladi?",
    "level": "senior",
    "category": "database",
    "categoryLabel": "Ma'lumotlar bazasi",
    "skillSlug": "database-optimization",
    "subskillId": "15.12",
    "answer": [
      "Partitsiyalash — bitta ulkan jadvalni mantiqiy jihatdan diskda alohida kichik fayllarga bo'lib saqlashdir:",
      "",
      "- **Range Partitioning:** Belgilangan oraliq bo'yicha (odatda sana): 2024-yil alohida, 2025-yil alohida faylda. Eski ma'lumotlarni arxivlash va o'chirish uchun ideal.",
      "- **Hash Partitioning:** `MOD(id, 4)` kabi formula orqali ma'lumotlarni 4 ta faylga teng taqsimlash (Hotspot muammosini yo'qotadi).",
      "- **List Partitioning:** Aniq qiymatlar ro'yxati bo'yicha (masalan, mamlakat kodlari: `UZ, KZ, KG` alohida, `US, UK` alohida).",
      "",
      "- **Partition Pruning:** Agar so'rovda `WHERE created_at = '2026-05-01'` bo'lsa, MySQL boshqa partitsiyalarni tekshirmaydi, faqat tegishli faylni o'qiydi."
    ],
    "tip": "Partitsiyalangan jadvalda Primary Key tarkibida albatta partitsiyalash ustuni (masalan created_at) bo'lishi shart."
  },

  // --- SQL ---
  {
    "id": "iq-151",
    "title": "SQL: Recursive CTE (WITH RECURSIVE) nima va cheksiz iyerarxik daraxtlarni (Menyular, Kategoriyalar) bitta so'rovda qanday olamiz?",
    "level": "middle",
    "category": "database",
    "categoryLabel": "SQL",
    "skillSlug": "sql",
    "subskillId": "9.10",
    "answer": [
      "Daraxtsimon ma'lumotlarda (har bir kategoriya o'zining `parent_id` siga ega bo'lganda) bolalarni olish uchun kodda sikl yozish $N+1$ so'rovlar keltirib chiqaradi.",
      "",
      "**Recursive CTE yechimi:**",
      "```sql",
      "WITH RECURSIVE CategoryTree AS (",
      "    -- 1. Anchor a'zo: Ildiz kategoriyalar",
      "    SELECT id, name, parent_id, 1 as level",
      "    FROM categories WHERE id = 1",
      "    UNION ALL",
      "    -- 2. Rekursiv a'zo: Bolalarni birlashtirish",
      "    SELECT c.id, c.name, c.parent_id, ct.level + 1",
      "    FROM categories c",
      "    INNER JOIN CategoryTree ct ON c.parent_id = ct.id",
      ")",
      "SELECT * FROM CategoryTree;",
      "```",
      "- Bitta SQL so'rov orqali cheksiz chuqurlikdagi butun iyerarxik shoxchani barcha darajalari bilan tortib olish mumkin."
    ],
    "tip": "Adjacency List modelidagi iyerarxiyalarni Nested Set yoki Closure Table ishlatmasdan bitta so'rovda olishning eng toza SQL standartidir."
  },
  {
    "id": "iq-152",
    "title": "SQL Window Functions: ROW_NUMBER(), RANK(), DENSE_RANK() farqi va ularning amaliy qo'llanilishi?",
    "level": "middle",
    "category": "database",
    "categoryLabel": "SQL",
    "skillSlug": "sql",
    "subskillId": "9.12",
    "answer": [
      "Window funksiyalari `GROUP BY` dan farqli o'laroq qatorlarni birlashtirib (collapse) yubormaydi, balki har bir qator uchun alohida oynada hisob-kitob qiladi:",
      "",
      "Farqlar (Bir xil ball to'plagan ikkita xodim misolida: 100, 100, 90 ball):",
      "- `ROW_NUMBER()`: Qat'iy unikal tartib raqam beradi: `1, 2, 3`.",
      "- `RANK()`: Teng qiymatlarga bir xil o'rin beradi, keyingisini sakrab o'tadi: `1, 1, 3`.",
      "- `DENSE_RANK()`: Teng qiymatlarga bir xil o'rin beradi, oraliq qoldirmaydi: `1, 1, 2`.",
      "",
      "**Amaliy keys:** 'Har bir bo'lim bo'yicha eng ko'p oylik oladigan TOP-3 ta xodimni topish' vazifasi `ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC)` bilan bitta so'rovda hal bo'ladi."
    ],
    "tip": "Window funksiyalari orqali murakkab hisobotlarni ilova xotirasiga yuklamasdan bevosita DB darajasida hisoblash mumkin."
  },

  // --- Ma'lumotlar bazasi ---
  {
    "id": "iq-153",
    "title": "Database Architecture: Katta taqsimlangan tizimlarda Foreign Key cheklovlari (Constraints) nega olib tashlanadi?",
    "level": "lead",
    "category": "database",
    "categoryLabel": "Ma'lumotlar bazasi",
    "skillSlug": "database-design",
    "subskillId": "14.14",
    "answer": [
      "Foreign Keylar ma'lumotlar yaxlitligini (Referential Integrity) kafolatlaydi, ammo katta masshtabli loyihalarda ulardan voz kechiladi:",
      "",
      "**Sabablar:**",
      "1. **Sharding va Mikroservislar:** Ma'lumotlar turli serverlarga (Shards) yoki alohida bazalarga bo'linganda FK lar ishlamaydi (jadvallar bitta serverda bo'lishi shart).",
      "2. **Deadlock va Unumdorlik:** Har bir `INSERT` yoki `UPDATE` paytida baza ota jadvalni ham tekshirishi va qatorni bloklashi (Lock contention) kerak bo'ladi.",
      "3. **Massivli yozish (Bulk Inserts):** Sekundiga 10 000 ta qator yozishda FK tekshiruvi I/O ni 30-40% ga tushiradi.",
      "",
      "**Yaxlitlik qanday ta'minlanadi?** Yaxlitlikni tekshirish mas'uliyati Ma'lumotlar bazasidan Ilova kodi darajasiga (Application Level - FormRequest, DB Transactions, Domain Service) ko'chiriladi."
    ],
    "tip": "Meta, Uber, YouTube kabi gigantlar o'z bazalarida hech qachon Foreign Key constraints ishlatmasligini misol qilib keltiring."
  },
  {
    "id": "iq-154",
    "title": "Database: Deadlock'larning oldini olishda 'Ordered Resource Allocation' (Resurslarni tartibli bloklash) usuli qanday ishlaydi?",
    "level": "senior",
    "category": "database",
    "categoryLabel": "Ma'lumotlar bazasi",
    "skillSlug": "database-transactions",
    "subskillId": "17.8",
    "answer": [
      "**Deadlock sababi:**",
      "- 1-Tranzaksiya: A hisobni blokladi, keyin B hisobni so'rayapti.",
      "- 2-Tranzaksiya: B hisobni blokladi, keyin A hisobni so'rayapti.",
      "- Ikkalasi bir-birini cheksiz kutadi va baza birini o'ldiradi (`Deadlock found when trying to get lock`).",
      "",
      "**Ordered Resource Allocation yechimi:**",
      "Barcha tranzaksiyalar resurslarni qat'iy bir xil tartibda (masalan, ID larning o'sish tartibida) bloklashi shart:",
      "```php",
      "// Pul o'tkazishda hisoblar ID sini tartiblaymiz:",
      "[$firstId, $secondId] = $fromId < $toId ? [$fromId, $toId] : [$toId, $fromId];",
      "",
      "DB::transaction(function () use ($firstId, $secondId, $amount) {",
      "    $acc1 = Account::where('id', $firstId)->lockForUpdate()->first();",
      "    $acc2 = Account::where('id', $secondId)->lockForUpdate()->first();",
      "    // Deadlock bo'lishi matematik jihatdan imkonsiz!",
      "});",
      "```"
    ],
    "tip": "Resurslarni doim kichik ID dan katta ID ga qarab bloklash pul o'tkazish tizimlarida 100% deadlockning oldini oladi."
  },
  {
    "id": "iq-155",
    "title": "Database: Optimistic Concurrency Control (OCC): 'version' ustuni orqali lock'larsiz poygalar qanday yechiladi?",
    "level": "senior",
    "category": "database",
    "categoryLabel": "Ma'lumotlar bazasi",
    "skillSlug": "database-transactions",
    "subskillId": "17.10",
    "answer": [
      "Pessimistik blokirovka (`SELECT ... FOR UPDATE`) bazani qotiradi. **Optimistik nazoratda** esa hech qanday qator bloklanmaydi:",
      "",
      "Jadvalga `version INT DEFAULT 1` qo'shiladi:",
      "1. Foydalanuvchi ma'lumotni o'qiydi: `balance = 500, version = 1`.",
      "2. Yangilash vaqtida versiyani tekshiradi:",
      "```sql",
      "UPDATE accounts SET balance = balance - 100, version = version + 1",
      "WHERE id = 42 AND version = 1;",
      "```",
      "3. Agar boshqa kimdir ayni shu soniyada versiyani `2` qilib ulgurgan bo'lsa, `affected_rows` 0 bo'ladi.",
      "4. Ilova buni sezadi va xato bermasdan, yangi balansni qayta o'qib urinishni takrorlaydi (Retry)."
    ],
    "tip": "Kam to'qnashuvli, ammo yuqori o'qish yuklamasiga ega tizimlarda Optimistik nazorat Pessimistikka qaraganda ancha yengil ishlaydi."
  },

  // --- Arxitektura & Tizim Dizayni ---
  {
    "id": "iq-156",
    "title": "Architecture: Event Sourcing nima va nima uchun Snapshotting (Kesimlar) bilan birga qo'llanilishi shart?",
    "level": "lead",
    "category": "architecture",
    "categoryLabel": "Arxitektura & Tizim Dizayni",
    "skillSlug": "event-driven-architecture",
    "subskillId": "48.10",
    "answer": [
      "Oddiy CRUD tizimlarida faqat ma'lumotning 'oxirgi holati' saqlanadi (`UPDATE accounts SET balance = 500`). Bu orada nima sodir bo'lgani tarixi yo'qoladi.",
      "",
      "**Event Sourcing:**",
      "- Holat emas, sodir bo'lgan barcha hodisalar (Events) ketma-ketligi o'zgarmas oqim sifatida saqlanadi (`AccountCreated`, `MoneyDeposited(1000)`, `MoneyWithdrawn(500)`).",
      "- Joriy holatni bilish uchun barcha hodisalar boshidan qayta o'ynatiladi (Replay). Bu mukammal audit va tarixda orqaga qaytish imkonini beradi.",
      "",
      "**Nega Snapshotting shart?**",
      "- Agar hisobda 500 000 ta operatsiya bo'lsa, balansni hisoblash uchun har gal 500 000 ta hodisani o'qish juda sekin bo'ladi.",
      "- **Snapshot:** Har 100 ta hodisadan keyin joriy holat 'kesimi' saqlab qo'yiladi. So'ngra faqat oxirgi snapshotdan keyingi hodisalar o'qiladi."
    ],
    "tip": "Banklar va hisob-kitob tizimlarida ma'lumotlarning 100% audit qilinishi talab etilganda Event Sourcing eng nufuzli arxitekturadir."
  },
  {
    "id": "iq-157",
    "title": "Architecture: CQRS (Command Query Responsibility Segregation) qachon kerak va qachon loyihaga asossiz murakkablik olib keladi?",
    "level": "lead",
    "category": "architecture",
    "categoryLabel": "Arxitektura & Tizim Dizayni",
    "skillSlug": "software-architecture",
    "subskillId": "61.10",
    "answer": [
      "**CQRS** — ma'lumotlarni o'zgartirish (Commands: Insert/Update/Delete) va ma'lumotlarni o'qish (Queries: Select) modellarini butunlay alohida qilishdir.",
      "",
      "**Qachon oqlanadi?**",
      "- O'qish va yozish modellari bir-biridan tubdan farq qilsa.",
      "- Masalan, yozish MySQL (Normalize) ga bo'ladi, lekin qidiruv va ko'rish Elasticsearch yoki Redis (Denormalize) dan o'qiladi.",
      "- Read va Write alohida masshtablanishi (scaling) kerak bo'lganda.",
      "",
      "**Qachon zararli (Overengineering)?**",
      "- Oddiy CRUD ilovalarda, ma'lumotlar hajmi kichik bo'lganda va Real-time sinxronizatsiyada Eventually Consistent (Kechikish bilan yangilanish) qabul qilib bo'lmaydigan holatlarda CQRS ortiqcha boshog'riq keltirib chiqaradi."
    ],
    "tip": "Har bir loyihaga ko'r-ko'rona CQRS tiqmaslik, balki uning Eventual Consistency kechikishini biznes bilan muvofiqlashtirish Lead dasturchi vazifasidir."
  },
  {
    "id": "iq-158",
    "title": "Architecture: Transactional Outbox Pattern nima va u mikroservislarda ma'lumotlar yo'qolishining qanday oldini oladi?",
    "level": "senior",
    "category": "architecture",
    "categoryLabel": "Arxitektura & Tizim Dizayni",
    "skillSlug": "microservices",
    "subskillId": "65.10",
    "answer": [
      "**Dual-Write muammosi:**",
      "Controller ichida `Order::create()` qildingiz va keyingi qatorda `RabbitMQ::publish(new OrderCreated())` chaqirdingiz. Agar DB kommit bo'lsa-yu, lekin tarmoq uzilib RabbitMQ xabari yetib bormasa — boshqa servislar buyurtmadan bexabar qoladi (Inconsistency).",
      "",
      "**Transactional Outbox Yechimi:**",
      "1. Xabarni to'g'ridan-to'g'ri navbatga jo'natmasdan, asosiy tranzaksiya ichida `outbox` jadvaliga qator qilib yoziladi:",
      "```php",
      "DB::transaction(function () use ($orderData) {",
      "    $order = Order::create($orderData);",
      "    Outbox::create(['event' => 'OrderCreated', 'payload' => json_encode($order)]);",
      "});",
      "```",
      "2. Baza ACID kafolati tufayli, faqat buyurtma saqlansagina outbox ham saqlanadi.",
      "3. Alohida fonli jarayon (Debezium Change Data Capture yoki Polling worker) `outbox` jadvalidan o'qib RabbitMQ/Kafkaga xavfsiz yetkazadi."
    ],
    "tip": "Mikroservislarda Distributed Transactions (2PC) o'rniga eng keng tarqalgan ishonchli yechim aynan Outbox Pattern hisoblanadi."
  },
  {
    "id": "iq-159",
    "title": "Architecture: Saga Pattern: Choreography va Orchestration modellarining farqi va kompensatsiya (Rollback) qanday ishlaydi?",
    "level": "lead",
    "category": "architecture",
    "categoryLabel": "Arxitektura & Tizim Dizayni",
    "skillSlug": "microservices",
    "subskillId": "65.12",
    "answer": [
      "Mikroservislar bo'ylab tarqalgan tranzaksiyalarda (Buyurtma -> To'lov -> Ombor -> Yetkazib berish):",
      "",
      "1. **Choreography (Xoreografiya - Markazsiz):**",
      "- Har bir servis o'z ishini bajarib, hodisa e'lon qiladi (`OrderCreated`). Keyingi servis buni eshitib o'z ishini qiladi (`PaymentSuccess`).",
      "- *Kamchiligi:* Katta tizimlarda kim nimani eshitayotganini kuzatish qiyinlashadi.",
      "",
      "2. **Orchestration (Orkestratsiya - Markazlashgan):**",
      "- Bitta markaziy 'Orchestrator' (masalan Temporal yoki Saga Controller) har bir servisga navbat bilan buyruq beradi va javobini kutadi.",
      "",
      "**Kompensatsiya qiluvchi tranzaksiya (Compensating Transaction):**",
      "- Agar 3-bosqichda (Omborda) tovar tugab qolsa, avvalgi bosqichlarni bekor qilish uchun 'Kompensatsiya' zanjiri ishga tushadi: Foydalanuvchiga pul qaytariladi (`RefundPayment`) va buyurtma bekor qilinadi."
    ],
    "tip": "Saga patternida klassik ACID rollback bo'lmaydi — faqat orqaga qaytaruvchi yangi kompensatsion hodisalar (Semantic Rollback) zanjiri yoziladi."
  },
  {
    "id": "iq-160",
    "title": "Architecture: Circuit Breaker Pattern nima va tashqi API qulaganda tizimimiz to'xtab qolmasligi uchun uni qanday joriy qilamiz?",
    "level": "senior",
    "category": "architecture",
    "categoryLabel": "Arxitektura & Tizim Dizayni",
    "skillSlug": "system-design",
    "subskillId": "66.16",
    "answer": [
      "Agar tashqi to'lov provayderi yoki SMS gateway qotib qolsa (Timeout), barcha PHP workerlar ularni 30 soniyadan kutib turib tiqilib qoladi va butun sayt qulaydi (Cascading Failure).",
      "",
      "**Circuit Breaker 3 ta holatda ishlaydi:**",
      "1. **Closed (Normal):** Barcha so'rovlar tashqi API ga yuboriladi. Xatolar sanab boriladi.",
      "2. **Open (Zanjir uzildi):** Agar ketma-ket 5 marta xato/timeout bo'lsa, zanjir ochiladi. Keyingi barcha so'rovlar tashqi API ga umuman yuborilmaydi, darhol 'Xizmat vaqtinchalik mavjud emas' xabari bilan qaytadi (resurslar tejaladi).",
      "3. **Half-Open (Sinov holati):** Masalan 60 soniyadan keyin bitta sinov so'rovi yuboriladi. Agar muvaffaqiyatli bo'lsa — zanjir yana Closed holatiga qaytadi."
    ],
    "tip": "Laravelda Guzzle middleware orqali yoki Opossum/Resilience paketlari bilan Circuit Breaker osongina joriy qilinadi."
  },
  {
    "id": "iq-161",
    "title": "Architecture: Bulkhead Pattern nima va u bitta servis nosozligi butun tizimni qulatishining qanday oldini oladi?",
    "level": "senior",
    "category": "architecture",
    "categoryLabel": "Arxitektura & Tizim Dizayni",
    "skillSlug": "system-design",
    "subskillId": "66.18",
    "answer": [
      "Kemalar bir joyi teshilsa cho'kib ketmasligi uchun bir-biridan ajratilgan germetik bo'linmalarga (Bulkhead) ega bo'ladi.",
      "",
      "**Dasturiy arxitekturadagi qo'llanilishi:**",
      "- Resurslarni (Thread pool, Connection pool, Memory, Workerlar) har bir muhim modul uchun alohida chegaralash.",
      "- **Misol:** Agar hisobotlar eksporti qotib qolsa, u faqat o'ziga ajratilgan 5 ta worker va alohida DB ulanishini egallaydi. Asosiy mijozlar uchun Checkout va Savat ishlayveradi.",
      "- Agar hamma narsa bitta umumiy pool ichida bo'lsa, og'ir PDF eksporti butun ilova workerlarini to'ldirib, to'lovlarni ham to'xtatib qo'yadi."
    ],
    "tip": "Laravel Horizon da turli navbatlarga alohida jarayonlar chegarasini belgilash aynan Bulkhead patternining amaliy ko'rinishidir."
  },

  // --- Kesh Strategiyalari ---
  {
    "id": "iq-162",
    "title": "Caching: Cache-Aside vs Write-Through vs Write-Behind kesh strategiyalarining farqlari va xavflari?",
    "level": "senior",
    "category": "database",
    "categoryLabel": "Kesh Strategiyalari",
    "skillSlug": "caching-strategies",
    "subskillId": "54.8",
    "answer": [
      "1. **Cache-Aside (Lazy Loading - Eng ommabop):**",
      "- Ilova avval keshni tekshiradi. Bo'lsa oladi (Hit). Bo'lmasa bazadan o'qiydi va keshga yozib qo'yadi (Miss). Kesh buzilsa baza ishlayveradi.",
      "",
      "2. **Write-Through:**",
      "- Ilova ma'lumotni keshga yozadi, keshning o'zi bir vaqtda bazaga ham yozadi. Doim ma'lumotlar yangi bo'ladi, lekin yozish kechikishi oshadi.",
      "",
      "3. **Write-Behind (Write-Back):**",
      "- Ilova faqat tezkor xotiraga (Keshga) yozadi va darhol javob beradi. Baza esa fonli navbat orqali bir necha soniyadan keyin yangilanadi.",
      "- *Foydasi:* Yozish operatsiyasi juda tez (millisekundlar). *Xavfi:* Agar Redis shu soniyada elektrdan uzilsa, bazaga yozilmagan ma'lumotlar butunlay yo'qoladi."
    ],
    "tip": "O'yinlar va layklar uchun Write-Behind zo'r, ammo moliyaviy tranzaksiyalarda faqat Cache-Aside yoki to'g'ridan-to'g'ri DB yozuvi kerak."
  },

  // --- Arxitektura & Tizim Dizayni ---
  {
    "id": "iq-163",
    "title": "CDN Caching: Stale-While-Revalidate va Cache-Control sarlavhalari orqali statik va dinamik sahifalar qanday keshlanadi?",
    "level": "senior",
    "category": "architecture",
    "categoryLabel": "Arxitektura & Tizim Dizayni",
    "skillSlug": "caching-strategies",
    "subskillId": "54.10",
    "answer": [
      "`Cache-Control` HTTP sarlavhalari brauzer va Cloudflare/CloudFront CDN lariga javobni qanday saqlashni buyuradi:",
      "",
      "```http",
      "Cache-Control: public, max-age=60, stale-while-revalidate=600",
      "```",
      "- `max-age=60`: 60 soniya davomida foydalanuvchiga javob to'g'ridan-to'g'ri CDN keshidan (0ms kechikish bilan) beriladi.",
      "- `stale-while-revalidate=600`: 60 soniyadan keyin kelgan foydalanuvchiga eski kesh bir zumda beriladi (Kutib o'tirmaydi), lekin fonda CDN serverdan yangi sahifani yuklab keshni jimgina yangilab oladi.",
      "- Natijada bitta ham foydalanuvchi orqa fondagi og'ir SQL hisob-kitoblarni kutib qolmaydi."
    ],
    "tip": "Yangiliklar saytlari va ommabop API larda Stale-While-Revalidate server yuklamasini 95% ga kamaytiradi."
  },
  {
    "id": "iq-164",
    "title": "Multi-Tenant Architecture: Database-per-tenant, Schema-per-tenant va Shared Database yondashuvlarining ijobiy va salbiy tomonlari?",
    "level": "lead",
    "category": "architecture",
    "categoryLabel": "Arxitektura & Tizim Dizayni",
    "skillSlug": "software-architecture",
    "subskillId": "61.14",
    "answer": [
      "SaaS ilovalarida turli mijozlarning (Tenants) ma'lumotlarini ajratish usullari:",
      "",
      "1. **Shared Database, Shared Schema (Bitta umumiy baza):**",
      "- Har bir jadvalda `tenant_id` ustuni bo'ladi.",
      "- *Ijobiy:* Eng arzon va oson xizmat ko'rsatish (bitta migratsiya).",
      "- *Salbiy:* Dasturchi xato qilib `WHERE tenant_id` ni unutsa, begona ma'lumotlar chiqib ketadi (Xavfsizlik xavfi).",
      "",
      "2. **Database-per-tenant (Har bir mijozga alohida DB):**",
      "- Har bir mijoz uchun alohida MySQL bazasi ochiladi.",
      "- *Ijobiy:* Mutlaq ma'lumotlar xavfsizligi, bitta mijoz bazasini boshqa serverga ko'chirish oson.",
      "- *Salbiy:* 5000 ta mijoz bo'lsa 5000 ta bazaga migratsiya surish va connection ochish juda murakkab infratuzilma talab qiladi.",
      "",
      "3. **Schema-per-tenant (PostgreSQL Schemas):** O'rtaliq variant bo'lib, bitta DB ichida alohida schemalar ochiladi."
    ],
    "tip": "Tibbiyot va bank SaaS loyihalarida qonuniy cheklovlar (GDPR/HIPAA) tufayli Database-per-tenant talab etiladi."
  },
  {
    "id": "iq-165",
    "title": "System Design: MySQL ma'lumotlarini Elasticsearch bilan real-vaqtda sinxronizatsiya qilishda qaysi usul eng ishonchli?",
    "level": "senior",
    "category": "architecture",
    "categoryLabel": "Arxitektura & Tizim Dizayni",
    "skillSlug": "system-design",
    "subskillId": "66.12",
    "answer": [
      "**Yomon usul:** Model `saved()` eventida to'g'ridan-to'g'ri Elasticsearch ga HTTP so'rov yuborish. Agar Elasticsearch vaqtincha javob bermasa yoki tranzaksiya rollback bo'lsa, sinxronizatsiya buziladi.",
      "",
      "**Ishonchli usullar:**",
      "1. **Asinxron Navbat (Queue):** Model o'zgarganda faqat `SyncWithSearchEngine(id)` jobi navbatga qo'yiladi. Xato bersa qayta uriniladi (Retry).",
      "2. **Change Data Capture (CDC - Debezium):** MySQL Binary Log (Binlog) dan to'g'ridan-to'g'ri o'qiladi. Ilova kodida hech narsa yozish shart emas; DB ga nima o'zgarish tushsa, Debezium uni Kafkaga, undan Elasticsearch ga o'tkazadi (Nol yo'qotish kafolati)."
    ],
    "tip": "Laravel Scout kichik loyihalar uchun qulay, lekin yirik korxonalarda CDC (Change Data Capture) eng barqaror yechimdir."
  },
  {
    "id": "iq-166",
    "title": "Microservices: Distributed Tracing nima va bitta so'rov 10 ta servisdan o'tganda muammoni qanday topamiz?",
    "level": "senior",
    "category": "architecture",
    "categoryLabel": "Arxitektura & Tizim Dizayni",
    "skillSlug": "microservices",
    "subskillId": "65.14",
    "answer": [
      "Monolitda bitta stack trace yetarli bo'ladi. Mikroservislarda esa so'rov `API Gateway -> Auth -> Order -> Payment -> Notification` zanjiridan o'tadi.",
      "",
      "**Distributed Tracing (OpenTelemetry / Jaeger / Zipkin):**",
      "- So'rov tizimga kirgan onda bitta global `Trace ID` va har bir qadam uchun `Span ID` beriladi.",
      "- Ushbu Trace ID HTTP sarlavhalari (`traceparent`) va Queue xabarlari orqali servisdan servisga uzatib boriladi.",
      "- Har bir servis log yozganda Trace ID ni qo'shadi.",
      "- Grafana yoki Jaeger interfeysida bitta so'rov qaysi servisda necha millisekund turgani va aynan qaysi SQL so'rov kechikish bergani vizual daraxt ko'rinishida chiqadi."
    ],
    "tip": "Mikroservislarni Tracing tizimisiz ishlab chiqarishga chiqarish ko'r holda samolyot boshqarish bilan barobardir."
  },
  {
    "id": "iq-167",
    "title": "API Gateway: Uning asosiy vazifalari nima va biznes mantiqni API Gateway ichiga yozish nega xato?",
    "level": "senior",
    "category": "architecture",
    "categoryLabel": "Arxitektura & Tizim Dizayni",
    "skillSlug": "microservices",
    "subskillId": "65.8",
    "answer": [
      "**API Gateway ning vazifalari (Cross-Cutting Concerns):**",
      "- Routing (Yo'naltirish): `/orders/*` ni Buyurtmalar servisiga, `/users/*` ni Foydalanuvchilar servisiga yo'naltirish.",
      "- Autentifikatsiya va Tokenlarni tekshirish (JWT verify).",
      "- Rate Limiting (DDoS dan himoyalash).",
      "- SSL Termination va HTTP/2 / HTTP/3 ga o'tish.",
      "- Javoblarni siqish (Gzip/Brotli) va keshlashtirish.",
      "",
      "**Nega biznes mantiq yozilmaydi?**",
      "- Agar Gateway ichiga hisob-kitoblar, chegirmalar va ma'lumotlar bazasi so'rovlari yozilsa, u yangi 'Yirtqich Monolit'ga (Distributed Monolith) aylanadi va barcha servislarning mustaqil deploy bo'lish imkoniyati yo'qoladi."
    ],
    "tip": "'Smart endpoints, dumb pipes' — Martin Fowler qoidasi: tranzit kanallar sodda, biznes mantiq esa faqat ichki servislarda bo'lishi kerak."
  },
  {
    "id": "iq-168",
    "title": "Architecture: Idempotent APIs: POST /api/payments so'rovini qanday qilib mutlaq takrorlanmas (Idempotent) qilamiz?",
    "level": "senior",
    "category": "architecture",
    "categoryLabel": "Arxitektura & Tizim Dizayni",
    "skillSlug": "api-design",
    "subskillId": "19.10",
    "answer": [
      "POST so'rovlari standart bo'yicha idempotent emas (har gal yangi resurs yaratadi). Mobil ilovada tarmoq uzilsa va mijoz 'To'lash' tugmasini qayta bossa, 2 marta pul yechilishi mumkin.",
      "",
      "**Idempotency-Key yechimi (Stripe modeli):**",
      "1. Klient sarlavhada unikal kalit yuboradi: `Idempotency-Key: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d`.",
      "2. Server Redis da atomar tekshiradi: `SET lock:idemp:{key} 1 NX EX 120`.",
      "3. Agar kalit mavjud bo'lsa va ishlov tugagan bo'lsa: Keshdagi avvalgi saqlangan javob (Response body va Status) darhol qaytariladi (DB ga ikkinchi marta tegilmaydi).",
      "4. Agar so'rov ayni paytda ishlanayotgan bo'lsa: `409 Conflict - So'rov jarayonda` qaytariladi.",
      "5. Yangi so'rov bo'lsa: To'lov bajariladi va javob keshga saqlanadi."
    ],
    "tip": "Moliya va buyurtma yaratish bo'yicha har qanday intervyuda Idempotency-Key sarlavhasi mexanizmini gapirish shart."
  },
  {
    "id": "iq-169",
    "title": "Rate Limiting: Token Bucket vs Leaky Bucket vs Sliding Window log algoritmlarining farqi?",
    "level": "senior",
    "category": "architecture",
    "categoryLabel": "Arxitektura & Tizim Dizayni",
    "skillSlug": "system-design",
    "subskillId": "66.10",
    "answer": [
      "1. **Token Bucket (Laravel va ko'pchilik API larda):**",
      "- Paqirga har soniyada yangi tokenlar qo'shilib turadi (masalan, sekundiga 5 ta). Har bir so'rov 1 ta tokenni oladi.",
      "- *Foydasi:* Qisqa muddatli so'rovlar portlashiga (Burst traffic) ruxsat beradi (agar paqirda 10 ta token bo'lsa, birdaniga 10 ta so'rov o'tishi mumkin).",
      "",
      "2. **Leaky Bucket:**",
      "- So'rovlar paqirga tushadi va pastdan qat'iy bir xil tezlikda oqib chiqadi (masalan, sekundiga roppa-rosa 1 ta).",
      "- So'rovlar oqimini tekislaydi (Smooth traffic), lekin portlashlarga yo'l qo'ymaydi.",
      "",
      "3. **Sliding Window Log:**",
      "- Har bir so'rovning vaqt tamg'asi (Timestamp) Redis Sorted Set (`ZADD`) ga yoziladi. Hozirgi vaqtdan so'nggi 60 soniyadagi so'rovlar sanaladi.",
      "- Eng aniq algoritm, lekin har bir so'rov xotirada saqlangani uchun xotira sarfi yuqori."
    ],
    "tip": "Veb-API larda qisqa muddatli tezkor yuklamalarni yumshoq qabul qilish uchun Token Bucket eng yaxshi muvozanatdir."
  },
  {
    "id": "iq-170",
    "title": "Architecture: Graceful Degradation nima va server yuklamasi kritik darajaga yetganda tizimni qanday saqlab qolamiz?",
    "level": "lead",
    "category": "architecture",
    "categoryLabel": "Arxitektura & Tizim Dizayni",
    "skillSlug": "scalability",
    "subskillId": "67.8",
    "answer": [
      "**Graceful Degradation (Yumshoq orqaga chekinish):** Tizim 100% yuklama ostida butunlay qulab `500 Server Error` berishi o'rniga, unchalik muhim bo'lmagan xususiyatlarni bosqichma-bosqich o'chirib, asosiy biznes vazifalarini ishchi holatda saqlab turishi.",
      "",
      "**Amaliy choralar:**",
      "1. Real-time qidiruv o'rniga oddiy keshdan javob berish.",
      "2. Tavsiya dvigatellari (Recommender AI) va 'Sizga yoqishi mumkin' bloklarini o'chirib qo'yish.",
      "3. Ko'rishlar soni va statistikani darhol DB ga yozmasdan, xotirada to'plab keyin yozish.",
      "4. Kesh muddati tugagan bo'lsa ham, bazani zo'riqtirmasdan eskirgan keshni (Stale Cache) qaytarish.",
      "- **Natija:** Foydalanuvchilar tovar sotib olishi va to'lov qilishi davom etaveradi."
    ],
    "tip": "Tizim qulashiga yo'l qo'ygandan ko'ra, xizmat sifatini vaqtinchalik 20% ga pasaytirib bo'lsa ham biznesni tirik saqlash Lead arxitektor vazifasidir."
  },

  // --- DevOps & Server ---
  {
    "id": "iq-171",
    "title": "DevOps: Zero-Downtime Deployment strategiyalari: Blue-Green vs Canary vs Rolling Updates?",
    "level": "senior",
    "category": "devops",
    "categoryLabel": "DevOps & Server",
    "skillSlug": "ci-cd",
    "subskillId": "43.10",
    "answer": [
      "- **Blue-Green Deployment:**",
      "  - 2 ta to'liq bir xil muhit bo'ladi: Blue (Aktiv) va Green (Yangi kod).",
      "  - Yangi versiya Green ga o'rnatilib testlanadi. So'ngra Router/Load Balancer 1 soniyada barcha trafikni Green ga buradi.",
      "  - Agar muammo chiqsa, darhol Blue ga qaytariladi (Instant Rollback). *Kamchiligi:* Server resurslari 2 barobar ko'p talab qilinadi.",
      "",
      "- **Canary Deployment:**",
      "  - Yangi versiyaga trafikning faqat 5-10% qismi yo'naltiriladi. Qolgan 90% eski versiyada turadi.",
      "  - Xatoliklar (Sentry) va server metrikalari tekshiriladi. Hammasi joyida bo'lsa, bosqichma-bosqich 25%, 50%, 100% ga chiqariladi.",
      "",
      "- **Rolling Update (Kubernetes modeli):**",
      "  - Podlar (konteynerlar) bittalab yangilanadi: 1 ta yangi yoqiladi, 1 ta eski o'chiriladi. Trafik uzilmaydi."
    ],
    "tip": "Katta xavfga ega yangilanishlarda xatolarni 100% foydalanuvchiga emas, faqat kichik qismiga ko'rsatib sinash uchun Canary eng xavfsizidir."
  },

  // --- Arxitektura & Tizim Dizayni ---
  {
    "id": "iq-172",
    "title": "Architecture: Monolith to Modular Monolith: Nima uchun ko'plab jamoalar mikroservislardan Modular Monolith'ga qaytmoqda?",
    "level": "lead",
    "category": "architecture",
    "categoryLabel": "Arxitektura & Tizim Dizayni",
    "skillSlug": "software-architecture",
    "subskillId": "61.8",
    "answer": [
      "Mikroservislar mustaqil deploy qilish imkonini beradi, lekin ular bilan birga ulkan operatsion murakkablik (Network Latency, Distributed Tracing, Saga, Docker/K8s xarajatlari, Tranzaksiyalarni boshqarish) kirib keladi.",
      "",
      "**Modular Monolith yechimi:**",
      "- Loyiha bitta umumiy repozitoriy va bitta deploy bo'ladigan ilova bo'lib qoladi.",
      "- Lekin kod ichi qat'iy ajratilgan mustaqil modullarga bo'linadi (masalan, `Modules/Billing`, `Modules/Catalog`, `Modules/Identity`).",
      "- Modullar bir-birining ma'lumotlar bazasi jadvallariga to'g'ridan-to'g'ri tegishi taqiqlanadi — faqat qat'iy belgilangan Ichki Shartnomalar (Contracts / Public API / Events) orqali muloqot qiladi.",
      "- **Natija:** Mikroservislarning barcha arxitektura tozaligiga ega bo'linadi, lekin tarmoq kechikishlari va taqsimlangan tizim muammolari bo'lmaydi."
    ],
    "tip": "Shopify, StackOverflow kabi gigantlar o'z tizimlarini aynan Modular Monolith arxitekturasida muvaffaqiyatli ushlab turishadi."
  },

  // --- Ma'lumotlar bazasi ---
  {
    "id": "iq-173",
    "title": "Database Scalability: Database Sharding vs Read Replicas: Sharding qachon va qaysi cheklovlar yetganda boshlanadi?",
    "level": "lead",
    "category": "database",
    "categoryLabel": "Ma'lumotlar bazasi",
    "skillSlug": "scalability",
    "subskillId": "67.10",
    "answer": [
      "- **Read Replicas (O'qish replikalari):** O'qish so'rovlari ko'payganda qo'shiladi (1 ta Master, 5 ta Slave). Ammo barcha replikalar baribir Yozish operatsiyasini Masterdan oladi.",
      "",
      "**Sharding qachon kerak?**",
      "1. **Yozish yuklamasi (Write Throughput) bitta server imkoniyatidan oshib ketganda:** Sekundiga 20 000 ta og'ir INSERT/UPDATE bitta Master server diskiga sig'may qoladi.",
      "2. **Jadval hajmi bitta server diski yoki RAM ga sig'maganda:** Masalan jadval 10 TB ga yetganda.",
      "",
      "**Sharding qanday ishlaydi:**",
      "- Ma'lumotlar gorizontal bo'linadi (masalan, Shard Key = `user_id`).",
      "- `user_id % 4 == 0` -> 1-Serverga, `== 1` -> 2-Serverga va h.k.",
      "- *Katta qiyinchilik:* Turli shardlar o'rtasida `JOIN` qilish, tranzaksiya ochish va global saralash (ORDER BY) juda qiyinlashadi."
    ],
    "tip": "Sharding — bu eng oxirgi chora. Undan oldin Kesh, Read Replicas, Partitioning va hardware scaling (Vertical) to'liq sinab ko'rilgan bo'lishi kerak."
  },

  // --- Arxitektura & Tizim Dizayni ---
  {
    "id": "iq-174",
    "title": "Distributed Systems: CAP Theorem: Taqsimlangan tizimlarda nega bir vaqtda ham CA, ham CP, ham AP bo'lishi imkonsiz?",
    "level": "lead",
    "category": "architecture",
    "categoryLabel": "Arxitektura & Tizim Dizayni",
    "skillSlug": "system-design",
    "subskillId": "66.6",
    "answer": [
      "**CAP teoremasi:**",
      "- **C (Consistency):** Barcha tugunlar bir vaqtda eng so'nggi va bir xil ma'lumotni ko'rsatadi.",
      "- **A (Availability):** Har qanday so'rovga har doim muvaffaqiyatli javob qaytadi (xato bo'lmaydi).",
      "- **P (Partition Tolerance):** Tugunlar o'rtasidagi tarmoq uzilsa ham tizim ishlashda davom etadi.",
      "",
      "**Haqiqat:** Haqiqiy tarmoqlarda uzilishlar muqarrar (Partition muqarrar, ya'ni **P har doim mavjud**).",
      "- Tarmoq uzilganda siz faqat tanlov qila olasiz:",
      "  - **CP (Consistency ustun):** Yangi ma'lumot hamma tugunga yetib bormaguncha xatolik (`Error 500`) qaytariladi (Masalan, Bank to'lovlari, etcd, MongoDB).",
      "  - **AP (Availability ustun):** Tizim eski bo'lsa ham javob qaytaraveradi, tarmoq tiklangach ma'lumotlar tenglashtiriladi (Masalan, Cassandra, DynamoDB, Ijtimoiy tarmoq layklari)."
    ],
    "tip": "Intervyuda 'Men CA tizim quraman' deb aytmang — taqsimlangan tarmoqda uzilish bo'lishi aniq, shuning uchun tanlov faqat CP yoki AP o'rtasida bo'ladi."
  },
  {
    "id": "iq-175",
    "title": "Architecture: Two-Phase Commit (2PC) nima va nima uchun u zamonaviy bulutli mikroservislarda deyarli ishlatilmaydi?",
    "level": "lead",
    "category": "architecture",
    "categoryLabel": "Arxitektura & Tizim Dizayni",
    "skillSlug": "microservices",
    "subskillId": "65.16",
    "answer": [
      "**2PC (Ikki fazali kommit):** Bir nechta turli ma'lumotlar bazasi o'rtasida ACID tranzaksiyani ta'minlash protokoli:",
      "1. **Phase 1 (Prepare):** Koordinator barcha tugunlardan 'Kommit qilishga tayyormisan?' deb so'raydi. Hamma resurslarni bloklaydi va 'Tayyorman' deb javob beradi.",
      "2. **Phase 2 (Commit):** Agar hamma tayyor bo'lsa, Koordinator 'Kommit qil' buyrug'ini beradi.",
      "",
      "**Nega mikroservislarda ishlatilmaydi?**",
      "- **Bloklovchi (Blocking Protocol):** Agar bitta servis javob bermasa yoki koordinator qulasa, barcha boshqa servislarning resurslari cheksiz bloklanib turadi.",
      "- Sekin tarmoqlarda kechikish (Latency) juda yuqori bo'ladi va o'tkazuvchanlik qobiliyati (Throughput) keskin tushib ketadi.",
      "- Shu sababli zamonaviy tizimlarda 2PC o'rniga **Saga Pattern** va **Eventual Consistency** ishlatiladi."
    ],
    "tip": "Taqsimlangan tizimlarda qat'iy 2PC o'rniga asinxron kompensatsiyalarga asoslangan Saga afzalligini ta'kidlash Lead mezonidir."
  },

  // --- Navbatlar & Async ---
  {
    "id": "iq-176",
    "title": "Queues: RabbitMQ Exchanges turlari: Direct, Topic, Fanout va Headers qachon qaysi biri ishlatiladi?",
    "level": "senior",
    "category": "async",
    "categoryLabel": "Navbatlar & Async",
    "skillSlug": "rabbitmq",
    "subskillId": "49.6",
    "answer": [
      "RabbitMQ da ishlab chiqaruvchi (Producer) xabarni to'g'ridan-to'g'ri navbatga emas, avval **Exchange** ga tashlaydi. Exchange xabarni qoidaga ko'ra navbatlarga yo'naltiradi:",
      "",
      "1. **Direct:** Xabar aniq bir xil `routing_key` ga ega bo'lgan navbatga boradi (masalan: `pdf_create`).",
      "2. **Fanout (Broadcast):** Routing key ga qaramasdan, unga ulangan BARCHA navbatlarga xabarni nusxalab jo'natadi (masalan, Yangilik e'lon qilindi -> Email navbatiga ham, Push navbatiga ham, SMS navbatiga ham bir vaqtda tushadi).",
      "3. **Topic (Mavzuli naqshlar):** Yulduzcha va panjara shablonlari (`*.orders.*`, `uz.payment.#`) bo'yicha mos keladigan navbatlarga taqsimlaydi.",
      "4. **Headers:** Routing key o'rniga xabar sarlavhalaridagi (Headers) maxsus kalit-qiymatlarga qarab yo'naltiradi."
    ],
    "tip": "Hodisalarga asoslangan arxitekturada turli xizmatlarga xabarni bir vaqtda yetkazish uchun Fanout va Topic eng ko'p ishlatiladigan vositadir."
  },
  {
    "id": "iq-177",
    "title": "Kafka vs RabbitMQ: Push va Pull arxitekturasi hamda Log-based va Queue-based modellarning tub farqi nima?",
    "level": "senior",
    "category": "async",
    "categoryLabel": "Navbatlar & Async",
    "skillSlug": "event-driven-architecture",
    "subskillId": "48.12",
    "answer": [
      "- **RabbitMQ (Smart Broker, Dumb Consumer - Queue-based):**",
      "  - Broker har bir xabarni navbatda saqlaydi, qaysi workerga berilganini va ACK holatini o'zi kuzatib boradi.",
      "  - Worker xabarni olib ACK bergach, xabar navbatdan darhol O'CHIRILADI.",
      "  - **Push modeli:** Broker xabarni workerga o'zi itaradi.",
      "",
      "- **Kafka (Dumb Broker, Smart Consumer - Log-based):**",
      "  - Kafka bu bo'limlarga ajratilgan ulkan diskdagi Append-only Log kitobidir.",
      "  - Xabar o'qilganda o'chirilmaydi! Belgilangan kun (masalan 7 kun) davomida diskda turaveradi.",
      "  - **Pull modeli:** Workerlar o'z tezligida xabarlarni tortib oladi (Polling) va o'zining joriy ko'rsatkichini (`Offset`) o'zi boshqaradi.",
      "  - Bitta oqimni 10 xil mustaqil servis o'z vaqtida, hatto o'tgan haftadagi xabarlardan boshlab qayta o'qishi (Replay) mumkin."
    ],
    "tip": "Vazifalarni bajarib o'chirib yuborish (Task queues) uchun RabbitMQ, katta hajmdagi voqealar tahlili va hodisalar oqimi (Event Streaming) uchun Kafka tanlanadi."
  },
  {
    "id": "iq-178",
    "title": "Queues: Delayed Jobs (Kechiktirilgan vazifalar) va Scheduled Tasks kapot ostida qanday ishlaydi?",
    "level": "middle",
    "category": "async",
    "categoryLabel": "Navbatlar & Async",
    "skillSlug": "queues-and-background-jobs",
    "subskillId": "46.8",
    "answer": [
      "`SendEmailJob::dispatch()->delay(now()->addMinutes(10));`",
      "",
      "**Redis drayveri ichki mexanizmi:**",
      "- Kechiktirilgan vazifa oddiy navbat ro'yxatiga (`queues:default`) TUShMAYDI.",
      "- U Redis **Sorted Set** (`ZADD queues:default:delayed <timestamp> <payload>`) ga yoziladi, ball sifatida rejalashtirilgan Unix Timestamp qo'yiladi.",
      "- Laravel worker yoki maxsus taymer davriy ravishda `ZRANGEBYSCORE` orqali joriy vaqtdan kichik yoki teng bo'lgan vazifalarni qidiradi.",
      "- Vaqti yetgan vazifalar Sorted Set dan o'chirilib, asosiy List navbatiga (`LPUSH queues:default`) o'tkaziladi va workerlar ularni qabul qiladi."
    ],
    "tip": "Kechiktirilgan vazifalarning qanday ishlashini bilish xotira sarfi va navbat mexanizmini to'g'ri tushunishni ko'rsatadi."
  },
  {
    "id": "iq-179",
    "title": "Queues: Poison Pill nima va Dead Letter Queue (DLQ) dagi xatolarni avtomat qayta ishlash qanday yo'lga qo'yiladi?",
    "level": "senior",
    "category": "async",
    "categoryLabel": "Navbatlar & Async",
    "skillSlug": "queues-and-background-jobs",
    "subskillId": "46.14",
    "answer": [
      "**Poison Pill (Zaharli tabletka):**",
      "- Noto'g'ri formatdagi yoki buzilgan ma'lumotga ega bo'lgan vazifa.",
      "- Worker uni har gal olganda xato beradi (Crash), qayta urinish (Retry) sababli yana navbatga qaytadi va workerlar doimiy tsiklga tushib boshqa ishlarni ham bajara olmay qoladi.",
      "",
      "**Dead Letter Queue (DLQ) yechimi:**",
      "1. `tries = 3` belgilanadi. Agar 3 marta xato bersa, vazifa asosiy navbatdan olib tashlanadi va `failed_jobs` jadvaliga (yoki DLQ ga) o'tkaziladi.",
      "2. **Alerting:** Sentry/Slack orqali ishlab chiquvchilarga xabar beriladi.",
      "3. **Tuzatish va Qayta yuborish:** Xato tuzatilgach, `php artisan queue:retry all` orqali vazifalar xavfsiz qayta ishga tushiriladi."
    ],
    "tip": "Cheksiz retry qo'yish (tries=0) workerlarni o'ldiradi. Doim tries chegarasi va DLQ bo'lishi shart."
  },

  // --- DevOps & Server ---
  {
    "id": "iq-180",
    "title": "DevOps: Queue Autoscaling: KEDA (Kubernetes) orqali navbat o'lchamiga qarab workerlar qanday avtomat ko'payadi?",
    "level": "lead",
    "category": "devops",
    "categoryLabel": "DevOps & Server",
    "skillSlug": "ci-cd",
    "subskillId": "43.12",
    "answer": [
      "Klassik Kubernetes HPA (Horizontal Pod Autoscaler) podlarni CPU yoki RAM ga qarab kengaytiradi. Ammo Queue workerlar ko'pincha I/O kutish bilan band bo'lib, CPU kam sarflaydi, holbuki navbatda 500 000 ta ish to'planib qolgan bo'lishi mumkin.",
      "",
      "**KEDA (Kubernetes Event-driven Autoscaling):**",
      "- To'g'ridan-to'g'ri Redis, RabbitMQ, SQS yoki MySQL navbatidagi kutayotgan vazifalar sonini (Queue Length) o'lchaydi.",
      "- Agar navbatda 100 ta ish bo'lsa -> 2 ta worker.",
      "- Agar bayram yoki ommaviy xabarnoma sabab navbat 50 000 taga chiqsa -> KEDA bir zumda 50 ta worker konteynerini ko'taradi.",
      "- Navbat bo'shaganda esa resurslarni tejash uchun workerlarni 1 tagacha (yoki nolga) tushiradi."
    ],
    "tip": "Katta masshtabli asinxron tizimlarda server xarajatlarini tejash va navbatlar kechikishining oldini olish uchun KEDA standart yechimdir."
  },

  // --- Xavfsizlik ---
  {
    "id": "iq-181",
    "title": "Security: Content Security Policy (CSP) nima va u XSS (Cross-Site Scripting) hujumlarini qanday qilib ildizidan yo'q qiladi?",
    "level": "senior",
    "category": "security",
    "categoryLabel": "Xavfsizlik",
    "skillSlug": "owasp-top-10",
    "subskillId": "52.8",
    "answer": [
      "Agar saytda XSS zaifligi bo'lsa, hujumchi izohlar orqali begona skript (`<script src='evil.com/steal.js'>`) kiritishi mumkin.",
      "",
      "**Content-Security-Policy (CSP) HTTP Headeri:**",
      "Brauzerga sahifadagi qaysi resurslar (Skriptlar, Rasmlar, Stillar) qayerdan yuklanishiga ruxsat borligini qat'iy belgilaydi:",
      "```http",
      "Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.com 'nonce-abc123xyz';",
      "```",
      "- Hujumchi begona skript kiritsa ham, brauzer uning manbasi oq ro'yxatda (Whitelist) yo'qligini yoki unda maxsus `nonce` tokeni yo'qligini ko'radi va skriptni **MUTLAQO ISHGA TUSHIRMAYDI**.",
      "- Shuningdek, `eval()` va inline `<script>` larni ham bloklab qo'yadi."
    ],
    "tip": "CSP zamonaviy veb-xavfsizlikda XSS ga qarshi eng mustahkam va ishonchli so'nggi mudofaa chizig'idir."
  },
  {
    "id": "iq-182",
    "title": "Security: CORS (Cross-Origin Resource Sharing) qanday ishlaydi va Preflight (OPTIONS) so'rovi nega yuboriladi?",
    "level": "middle",
    "category": "security",
    "categoryLabel": "Xavfsizlik",
    "skillSlug": "web-application-security",
    "subskillId": "51.8",
    "answer": [
      "**SOP (Same-Origin Policy):** Brauzerlar xavfsizlik maqsadida `frontend.com` dagi JavaScript ga `backend.com` API siga ruxsatsiz AJAX so'rov yuborishni taqiqlaydi.",
      "",
      "**CORS:** Backend maxsus sarlavhalar orqali boshqa domenlarga ruxsat berish mexanizmi:",
      "`Access-Control-Allow-Origin: https://frontend.com`",
      "",
      "**Preflight (OPTIONS so'rovi):**",
      "- Agar so'rov oddiy bo'lmasa (masalan, `Content-Type: application/json` yoki `Authorization: Bearer` sarlavhalari bo'lsa, yoki `PUT/DELETE` metodi ishlatilsa):",
      "- Brauzer haqiqiy so'rovdan oldin serverga avtomat ravishda kichik `OPTIONS` so'rovini jo'natadi: 'Men JSON jo'natmoqchiman, ruxsat bormi?'.",
      "- Server 'Ha, ruxsat' (`204 No Content` va `Access-Control-Allow-Headers`) deb javob bergandagina haqiqiy `POST/PUT` so'rovi yuboriladi."
    ],
    "tip": "CORS — bu serverning emas, BRAUZERNING xavfsizlik mexanizmidir. Postman yoki curl da CORS cheklovlari bo'lmaydi."
  },
  {
    "id": "iq-183",
    "title": "Security: Blind SQL Injection va Second-Order SQL Injection nima va ularning xavfi nimada?",
    "level": "senior",
    "category": "security",
    "categoryLabel": "Xavfsizlik",
    "skillSlug": "owasp-top-10",
    "subskillId": "52.6",
    "answer": [
      "- **Blind SQL Injection:**",
      "  - Server xatolikni yoki ma'lumotni ekranga chiqarmaydi (oddiy 'Xatolik' yoki bo'sh sahifa ko'rsatadi).",
      "  - Hujumchi mantiqiy savollar beradi: `id=1 AND (SELECT SUBSTRING(password,1,1) FROM users) = 'a'`.",
      "  - Agar sahifa yuklansa — harf to'g'ri, yuklanmasa — noto'g'ri (Boolean-based). Yoki `SLEEP(5)` orqali javob kechikishiga qarab parollarni bittalab o'g'irlaydi (Time-based).",
      "",
      "- **Second-Order SQL Injection:**",
      "  - Zararli kod kiritilgan paytda darhol ishga tushmaydi, balki bazaga xavfsiz yoziladi (masalan, foydalanuvchi ismi sifatida `admin'--`).",
      "  - Keyinchalik boshqa tizim yoki cron jarayoni ushbu ismni bazadan o'qib, boshqa so'rov ichida birlashtirib (Concatenation) yuborganida SQL buzilishi yuz beradi."
    ],
    "tip": "Faqat kiruvchi so'rovni emas, bazadan o'qilgan ma'lumotni qayta ishlatganda ham doim PDO Prepared Statements ishlatilishi shart."
  },
  {
    "id": "iq-184",
    "title": "Security: Session Fixation va Session Hijacking: SameSite cookies va regeneratsiya qanday himoyalaydi?",
    "level": "middle",
    "category": "security",
    "categoryLabel": "Xavfsizlik",
    "skillSlug": "web-application-security",
    "subskillId": "51.4",
    "answer": [
      "- **Session Hijacking (Sessiyani o'g'irlash):** Hujumchi foydalanuvchining sessiya ID sini (Cookie) tarmoq orqali (HTTP da) yoki XSS orqali o'g'irlab, uning nomidan kirishi.",
      "- **Session Fixation:** Hujumchi foydalanuvchiga oldindan ma'lum bo'lgan sessiya ID sini majburlab tiqadi va u login qilgach o'sha sessiyadan foydalanadi.",
      "",
      "**Himoya choralari:**",
      "1. **Login vaqtida sessiyani yangilash:** Laravelda login bo'lishi bilanoq `$request->session()->regenerate()` chaqiriladi (eski sessiya o'ladi, yangi unikal ID beriladi).",
      "2. **HttpOnly va Secure bayroqlari:** Cookie faqat HTTPS orqali o'tishi va JavaScript orqali o'qib bo'lmasligi (`document.cookie` da ko'rinmaydi).",
      "3. **SameSite=Lax/Strict:** Cookie boshqa saytlardan kelayotgan so'rovlarga qo'shib yuborilmaydi (CSRF dan himoya)."
    ],
    "tip": "Laravel standart bo'yicha sessiyalarni xavfsiz boshqaradi, ammo login/logout amallarida regenerate() ni qo'lda yozishni unutmaslik kerak."
  },
  {
    "id": "iq-185",
    "title": "Security: Parollarni xeshlash: Argon2id nima uchun Bcrypt'dan xavfsizroq va GPU/ASIC hujumlaridan qanday himoyalaydi?",
    "level": "senior",
    "category": "security",
    "categoryLabel": "Xavfsizlik",
    "skillSlug": "web-application-security",
    "subskillId": "51.14",
    "answer": [
      "- **Bcrypt (Blowfish asosida):** Asosan CPU hisob-kitoblariga bog'langan. Hujumchilar kuchli video kartalar (GPU) yoki maxsus chiplar (ASIC) orqali sekundiga milliardlab parollarni parallel tekshirib (Brute-force) buzishi mumkin.",
      "",
      "- **Argon2id (Password Hashing Competition g'olibi - Zamonaviy standart):**",
      "  - **Memory-Hard funksiya:** Xesh hisoblash uchun nafaqat CPU, balki katta hajmdagi tezkor xotira (RAM, masalan har bir xeshga 64 MB) talab qiladi.",
      "  - GPU larda xotira cheklanganligi sababli, GPU orqali parallel parollarni tanlash imkonsiz bo'lib qoladi.",
      "  - `Argon2id` gibrid usul bo'lib, bir vaqtning o'zida ham GPU hujumlaridan, ham Side-Channel (Timing) hujumlaridan eng yuqori darajada himoyalaydi."
    ],
    "tip": "PHP va Laravelda yangi loyihalarda imkon qadar standart Bcrypt o'rniga Hash::make() drayverini Argon2id ga sozlash tavsiya etiladi."
  },

  // --- OAuth 2.0 ---
  {
    "id": "iq-186",
    "title": "OAuth 2.0: PKCE (Proof Key for Code Exchange) oqimi nima va SPAlarda Client Secret saqlab bo'lmaganda u qanday ishlaydi?",
    "level": "senior",
    "category": "security",
    "categoryLabel": "OAuth 2.0",
    "skillSlug": "oauth-2-0",
    "subskillId": "21.10",
    "answer": [
      "Klassik Authorization Code oqimida serverda maxfiy kalit (`Client Secret`) saqlanadi. Ammo Single Page Application (Vue, React) yoki Mobil ilovalar 'Public Clients' hisoblanadi — ularning JavaScript kodida maxfiy kalitni saqlab bo'lmaydi (har qanday odam uni ko'rib oladi).",
      "",
      "**PKCE yechimi (Dinamik bir martalik kalitlar):**",
      "1. SPA ilova har bir login oldidan tasodifiy uzun maxfiy satr yaratadi: `code_verifier`.",
      "2. Uni SHA256 bilan xeshlaydi: `code_challenge = sha256(code_verifier)`.",
      "3. Login so'rovida serverga faqat `code_challenge` jo'natiladi.",
      "4. Avtorizatsiya kodi qaytgach, SPA token so'rashda o'zining asl `code_verifier` ini jo'natadi.",
      "5. Server uni xeshlab `code_challenge` bilan solishtiradi. Hujumchi avtorizatsiya kodini o'g'irlagan taqdirda ham, verifier yo'qligi sababli tokenga ega bo'lolmaydi."
    ],
    "tip": "Laravel Passport yoki Sanctum bilan SPA integratsiya qilganda PKCE standart talab hisoblanadi."
  },

  // --- Xavfsizlik ---
  {
    "id": "iq-187",
    "title": "Security: PII (Personally Identifiable Information) ma'lumotlarni bazada saqlashda Enkripsiya (Encryption at Rest) qanday qilinadi?",
    "level": "senior",
    "category": "security",
    "categoryLabel": "Xavfsizlik",
    "skillSlug": "web-application-security",
    "subskillId": "51.16",
    "answer": [
      "Foydalanuvchilarning pasport ma'lumotlari, telefon raqamlari yoki karta raqamlari baza xom ko'rinishda o'g'irlangan taqdirda ham ochilmasligi uchun **shifrlangan holda** saqlanishi kerak.",
      "",
      "**Laravel Encrypted Casts:**",
      "```php",
      "class User extends Model {",
      "    protected function casts(): array {",
      "        return [",
      "            'passport_number' => 'encrypted',",
      "            'secret_notes' => 'encrypted:array',",
      "        ];",
      "    }",
      "}",
      "```",
      "- Bazaga yozishda avtomatik ravishda AES-256-CBC bilan shifrlanadi, o'qishda esa ochib beriladi.",
      "- **Katta cheklov:** Shifrlangan ustunlar bo'yicha to'g'ridan-to'g'ri SQL `WHERE passport_number = ?` qilib qidirib bo'lmaydi (har gal IV boshqacha bo'lgani sababli xesh har xil chiqadi). Qidiruv uchun alohida Blind Index (HMAC) ustuni yuritiladi."
    ],
    "tip": "Shifrlangan ma'lumotlar bo'yicha qidiruv qilish uchun Blind Indexing (Ciphersweet paketlari) ishlatilishini bilish muhimdir."
  },
  {
    "id": "iq-188",
    "title": "Security: Mass Assignment zaifligi orqali hujumchi admin huquqini qanday egallashi mumkin va undan qanday himoyalanamiz?",
    "level": "junior",
    "category": "security",
    "categoryLabel": "Xavfsizlik",
    "skillSlug": "web-application-security",
    "subskillId": "51.4",
    "answer": [
      "**Xato kod:**",
      "`User::create($request->all());`",
      "Agar modelda `protected $guarded = [];` qilib qo'yilgan bo'lsa, hujumchi oddiy ro'yxatdan o'tish formasiga POST orqali yashirin `is_admin=1` yoki `balance=999999` yuboradi. Eloquent bu maydonlarni bazaga to'g'ridan-to'g'ri yozib yuboradi.",
      "",
      "**Himoyalanish qoidalari:**",
      "1. Hech qachon `$request->all()` ni to'g'ridan-to'g'ri Modelga uzatmaslik.",
      "2. Faqat tasdiqlangan maydonlarni olish: `$request->validated()`.",
      "3. Modelda qat'iy `$fillable = ['name', 'email', 'password']` ro'yxatini belgilash.",
      "4. Laravelda `Model::preventSilentlyDiscardingAttributes()` ni yoqish."
    ],
    "tip": "Mass assignment — bu Laravelda eng ko'p uchraydigan va biznes uchun eng xavfli yangi o'rganuvchilar xatosidir."
  },

  // --- Testlash ---
  {
    "id": "iq-189",
    "title": "Testing: Contract Testing (Pact) nima va mikroservislar o'rtasidagi API shartnomalarini sinashda u nega kerak?",
    "level": "lead",
    "category": "testing",
    "categoryLabel": "Testlash",
    "skillSlug": "integration-testing",
    "subskillId": "28.10",
    "answer": [
      "Mikroservislarda Frontend va Backend yoki ikkita alohida servis bir-biri bilan API orqali muloqot qiladi. Agar Backend API dagi maydon nomini `user_name` dan `fullName` ga o'zgartirsa, butun frontend buziladi.",
      "",
      "**Contract Testing (Shartnomaviy testlash):**",
      "- Iste'molchi (Consumer) va Ishlab chiqaruvchi (Provider) o'rtasida shartnoma (JSON shartnoma fayli) tuziladi: 'Men sendan `{id: int, name: string}` kutaman'.",
      "- Backend har gal kodini o'zgartirganda, ushbu shartnomaga qarshi test ishlaydi.",
      "- Agar yangi o'zgarish shartnomani buzsa (Breaking change), CI/CD tizimi deploy qilishga yo'l qo'ymaydi.",
      "- Natijada barcha servislarni bir vaqtda ishga tushirmasdan ham integratsiyaning butunligini tekshirish mumkin."
    ],
    "tip": "E2E (End-to-End) testlar sekin va qimmat bo'lgani sababli, mikroservislarda tezkor Contract Testing (Pact) birinchi o'ringa chiqadi."
  },
  {
    "id": "iq-190",
    "title": "Testing: Architecture Testing (Pest Arch Plugin): Arxitektura qoidalarini avtomat testlar bilan qanday nazorat qilamiz?",
    "level": "senior",
    "category": "testing",
    "categoryLabel": "Testlash",
    "skillSlug": "pest",
    "subskillId": "26.12",
    "answer": [
      "Jamoa katta bo'lganda dasturchilar arxitektura qoidalarini buzib, Controller ichida to'g'ridan-to'g'ri SQL so'rovlar yozib ketishi yoki Model ichida `request()` chaqirishi mumkin.",
      "",
      "**Pest Arch bilan avtomat nazorat:**",
      "```php",
      "test('Controllerlar toza bo\\'lishi kerak', function () {",
      "    expect('App\\\\Http\\\\Controllers')",
      "        ->not->toUse('Illuminate\\\\Support\\\\Facades\\\\DB')",
      "        ->toHaveSuffix('Controller');",
      "});",
      "",
      "test('Modellar controllerlarga bog\\'lanmasligi kerak', function () {",
      "    expect('App\\\\Models')",
      "        ->toOnlyBeUsedIn(['App\\\\Repositories', 'App\\\\Services']);",
      "});",
      "```",
      "- Agar kimdir controller ichida xato bog'liqlik kiritsa, test qizil yonadi va Pull Request merge bo'lmaydi."
    ],
    "tip": "Arxitektura qoidalarini faqat og'zaki yoki hujjatda emas, aynan kod testlari darajasida avtomatlashtirish Leadlik cho'qqisidir."
  },
  {
    "id": "iq-191",
    "title": "Testing: Load & Stress Testing: k6 yoki Locust orqali saytning eng zaif nuqtalarini (Bottlenecks) qanday aniqlaymiz?",
    "level": "senior",
    "category": "testing",
    "categoryLabel": "Testlash",
    "skillSlug": "automated-testing",
    "subskillId": "74.10",
    "answer": [
      "Birlik (Unit) testlar kodning to'g'ri ishlashini tekshiradi, lekin u 10 000 ta bir vaqtda kelgan so'rovda server bardosh bera olishini tekshira olmaydi.",
      "",
      "**k6 bilan yuklama testlash:**",
      "- Virtual foydalanuvchilar (VUs) oqimi simulyatsiya qilinadi: 1 daqiqa ichida 10 dan 1000 ta foydalanuvchiga ko'tariladi.",
      "- **O'lchanadigan ko'rsatkichlar:**",
      "  - `http_req_duration (p95, p99)`: 95% va 99% foydalanuvchilar sahifani qancha vaqtda yukladi?",
      "  - `http_req_failed`: Xatolar foizi (`502/504 Gateway Timeout`).",
      "  - `Throughput (RPS)`: Server sekundiga necha so'rov o'tkaza olyapti?",
      "- Test davomida MySQL Slow Query, CPU, Memory va PHP-FPM worker statusi kuzatiladi va birinchi bo'lib qayer qotayotgani (Bottleneck) topiladi."
    ],
    "tip": "Har qanday yirik reliz yoki aksiya oldidan k6 bilan stress-test o'tkazish sayt qulashining oldini oladi."
  },
  {
    "id": "iq-192",
    "title": "Testing: Flaky Tests (Beqaror testlar) nima va nega ular jamoaning CI/CD jarayonini barbod qiladi?",
    "level": "senior",
    "category": "testing",
    "categoryLabel": "Testlash",
    "skillSlug": "automated-testing",
    "subskillId": "74.8",
    "answer": [
      "**Flaky Test:** Hech qanday kod o'zgarmasa ham, goh yashil o'tib, goh kutilmaganda qizil xato beradigan beqaror test.",
      "- **Xavfi:** Jamoa testlarga ishonmay qo'yadi va 'Ha, bu yana o'sha beqaror test ekan, e'tibor berma' deb haqiqiy kritik xatolarni ham o'tkazib yuboradi.",
      "",
      "**Kelib chiqish sabablari va yechimlar:**",
      "1. **Vaqtga bog'liqlik:** `now()` yoki `Carbon::now()` ishlatish. *Yechim:* `Carbon::setTestNow()` orqali vaqtni to'xtatib qo'yish.",
      "2. **Tartibsiz saralash:** `SELECT` so'rovida `ORDER BY` bo'lmagani uchun ma'lumotlar ba'zan boshqa tartibda kelishi. *Yechim:* Testda doim aniq ID bo'yicha tartiblash.",
      "3. **Asinxron poyga (Race Conditions):** JavaScript yoki Queue ning tugashini kutmasdan assert qilish. *Yechim:* `Queue::fake()` yoki explicit wait.",
      "4. **Umumiy holat (Shared State):** Avvalgi test yaratgan ma'lumot keyingi testga xalaqit berishi. *Yechim:* DatabaseTransactions."
    ],
    "tip": "Flaky testlarni darhol tuzatish yoki vaqtincha karantinga olish kerak, aks holda ular butun test madaniyatini yo'q qiladi."
  },

  // --- DevOps & Server ---
  {
    "id": "iq-193",
    "title": "Linux & Server: Linux OOM Killer (Out of Memory Killer) qanday ishlaydi va MySQL/PHP-FPM jarayonlarini undan qanday himoyalash mumkin?",
    "level": "lead",
    "category": "devops",
    "categoryLabel": "DevOps & Server",
    "skillSlug": "linux",
    "subskillId": "38.12",
    "answer": [
      "Serverda RAM tugab qolsa (Swap ham to'lsa), butun operatsion tizim qotib qolmasligi uchun Linux yadrosidagi **OOM Killer** eng ko'p xotira yeyotgan jarayonni majburan o'ldiradi (`kill -9`).",
      "- Ko'pincha serverda eng ko'p xotira yeydigan narsa bu MySQL (`mysqld`) bo'ladi. Natijada OOM Killer birinchi bo'lib MySQL ni o'ldirib, saytni butunlay to'xtatadi.",
      "",
      "**Himoyalanish choralari:**",
      "1. **oom_score_adj sozlamasi:** MySQL xizmatiga Linux o'ldirmasligi uchun immunitet berish:",
      "```bash",
      "# /etc/systemd/system/mysql.service.d/override.conf",
      "[Service]",
      "OOMScoreAdjust=-1000 # OOM Killer bu jarayonga aslo tegmaydi",
      "```",
      "2. Serverda to'g'ri `vm.swappiness` va Swap xotira ajratish.",
      "3. MySQL `innodb_buffer_pool_size` va PHP-FPM `pm.max_children` sozlamalarini server RAM siga mutanosib hisoblash."
    ],
    "tip": "Baza to'satdan o'chib qolsa, dmesg | grep -i oom orqali uni OOM Killer o'ldirganini tekshirish DevOps muhandislarining birinchi qadamidir."
  },

  // --- Nginx ---
  {
    "id": "iq-194",
    "title": "DevOps: Nginx Buffer Overflow va client_body_buffer_size: Katta so'rovlar nega sekinlashadi?",
    "level": "senior",
    "category": "devops",
    "categoryLabel": "Nginx",
    "skillSlug": "nginx",
    "subskillId": "41.8",
    "answer": [
      "Nginx mijozdan kelayotgan POST ma'lumotlarini (masalan, JSON body yoki fayl) avval o'zining RAM buferiga (`client_body_buffer_size`, standart 8-16 KB) oladi.",
      "",
      "**Muammo:**",
      "- Agar kelayotgan JSON body 2 MB bo'lsa va buferdan katta bo'lsa, Nginx uni xotirada ushlay olmaydi va diskdagi vaqtinchalik faylga (`/var/lib/nginx/body/...`) yozadi.",
      "- Har bir so'rovda diskka yozish va qayta o'qish I/O ni oshirib, API javob berish vaqtini 5-10 barobarga sekinlashtiradi.",
      "",
      "**Yechim:**",
      "API serverlar uchun `client_body_buffer_size 128k;` yoki `256k;` qilib oshiriladi, bu esa diskka tushmasdan to'liq RAM da qayta ishlanishini ta'minlaydi."
    ],
    "tip": "Nginx xatolik logida 'a client request body is buffered to a temporary file' ogohlantirishi chiqsa, buferni oshirish kerak."
  },

  // --- HTTP & Networking ---
  {
    "id": "iq-195",
    "title": "Networking: HTTP/2 va HTTP/3 (QUIC) ning HTTP/1.1 dan tub ustunliklari: Multiplexing va Head-of-Line Blocking?",
    "level": "senior",
    "category": "devops",
    "categoryLabel": "HTTP & Networking",
    "skillSlug": "http-https",
    "subskillId": "50.8",
    "answer": [
      "- **HTTP/1.1 Muammolari:** Har bir resurs (rasm, CSS, JS) uchun alohida TCP ulanish ochilishi kerak edi. Brauzerlar bitta domenga maksimal 6 ta parallel ulanish ochardi. Bitta sekin so'rov qolganlarini to'sib turardi (**Head-of-Line Blocking**).",
      "",
      "- **HTTP/2 (Multiplexing):**",
      "  - Bitta TCP ulanish ichida yuzlab so'rovlar parallel va mustaqil ravishda oqimlar (Streams) bo'lib o'tadi.",
      "  - Sarlavhalar siqiladi (HPACK).",
      "",
      "- **HTTP/3 (QUIC protokoli - UDP asosida):**",
      "  - HTTP/2 da TCP darajasidagi paket yo'qolsa, butun ulanish to'xtab turardi.",
      "  - HTTP/3 UDP ustiga qurilgan bo'lib, bitta paket yo'qolsa ham qolgan barcha oqimlar uzluksiz o'tishda davom etadi. Mobil tarmoqlarda (Wi-Fi dan 4G ga o'tganda) ulanish uzilmasdan saqlanib qoladi."
    ],
    "tip": "Zamonaviy veb-ilovalarda Nginx yoki Cloudflare da HTTP/2 va HTTP/3 ni yoqish frontend yuklanishini sezilarli darajada oshiradi."
  },

  // --- DevOps & Server ---
  {
    "id": "iq-196",
    "title": "DevOps: Kubernetes Health Checks: Liveness Probe va Readiness Probe ning PHP-FPM podlaridagi vazifasi nima?",
    "level": "senior",
    "category": "devops",
    "categoryLabel": "DevOps & Server",
    "skillSlug": "docker",
    "subskillId": "36.14",
    "answer": [
      "- **Liveness Probe (Tiriklik tekshiruvi):**",
      "  - 'Pod tirikmi yoki qotib qoldimi (Deadlock)?'",
      "  - Agar PHP-FPM qotib qolib, Liveness probe ga javob bermasa, Kubernetes podni o'ldiradi va yangidan ishga tushiradi (Restart).",
      "",
      "- **Readiness Probe (Tayyorgarlik tekshiruvi):**",
      "  - 'Pod trafik qabul qilishga tayyormi?'",
      "  - Konteyner endi ko'tarilayotganda keshlar isinishi, migratsiyalar yoki ma'lumotlar yuklanishi kerak bo'lishi mumkin.",
      "  - Readiness probe `200 OK` bermaguncha, Kubernetes unga foydalanuvchilar trafigini yo'naltirmaydi.",
      "  - Agar baza uzilib qolsa, podni o'ldirmaydi, shunchaki vaqtinchalik xizmat ko'rsatishdan olib turadi."
    ],
    "tip": "Readiness va Liveness farqini bilish konteynerlar bekorga qayta-qayta restart bo'lishining (CrashLoopBackOff) oldini oladi."
  },
  {
    "id": "iq-197",
    "title": "Observability: Log Aggregation: Monolit log fayllari o'rniga nima uchun Loki / ELK Stack va JSON formatidagi loglar kerak?",
    "level": "senior",
    "category": "devops",
    "categoryLabel": "DevOps & Server",
    "skillSlug": "logging-and-monitoring",
    "subskillId": "58.10",
    "answer": [
      "Agar loyihada 10 ta server bo'lsa, xatoni qidirish uchun har bir serverga SSH qilib `tail -f storage/logs/laravel.log` deb o'tirish mumkin emas.",
      "",
      "**Markazlashgan log tizimi (Grafana Loki / ELK):**",
      "1. **Strukturaviy JSON Loglar:** Matnli log o'rniga har bir xabar JSON qilib yoziladi (`timestamp`, `level`, `message`, `user_id`, `trace_id`).",
      "2. Barcha serverlardagi loglar bitta markaziy bazaga oqib keladi.",
      "3. **Tezkor qidiruv:** 'So'nggi 15 daqiqada faqat 500 xato bergan va `user_id = 42` bo'lgan barcha loglarni topish' bir soniyada filtrlanadi.",
      "4. Loglar asosida Grafana da real-time grafiklar va avtomat ogohlantirishlar (Alerts) yasaladi."
    ],
    "tip": "Laravel `config/logging.php` da `json` formatlovchi formatter qo'yish zamonaviy DevOps talablariga moslashishning birinchi qadamidir."
  },

  // --- Liderlik va Arxitektura ---
  {
    "id": "iq-198",
    "title": "Engineering Leadership: Texnik qarz (Technical Debt) qanday boshqariladi va biznes egalariga refactoring zaruratini qanday tushuntiramiz?",
    "level": "lead",
    "category": "architecture",
    "categoryLabel": "Liderlik va Arxitektura",
    "skillSlug": "refactoring",
    "subskillId": "73.10",
    "answer": [
      "Biznes egalari 'Kodni chiroyli qilish' degan gapni tushunmaydi va pul ajratmaydi. Refactoringni biznes tili (Pul, Tezlik, Risklar) bilan ifodalash kerak:",
      "",
      "**Lead strategiyasi:**",
      "1. **Tezlik pasayishini ko'rsatish:** 'Eskirgan arxitektura sababli har bir yangi funksiya oldingidek 2 kunda emas, 2 haftada chiqyapti va xatolar 3 barobarga oshdi'.",
      "2. **20% Qoidasi (Boy Scout Rule):** Alohida '6 oylik to'liq to'xtash va refactoring' qilib bo'lmaydi. Har bir sprintning 20% vaqti texnik qarzni tozalashga ajratiladi.",
      "3. **Metrikalar:** Crash rate, Bug fix vaqti va Deployment tezligi kabi aniq raqamlar bilan yaxshilanishni isbotlash."
    ],
    "tip": "Texnik qarz bu moliyaviy qarzga o'xshaydi: o'z vaqtida to'lab borilmasa, uning foizlari butun loyihani bankrot qiladi."
  },
  {
    "id": "iq-199",
    "title": "Engineering Leadership: Junior dasturchini Middle va Senior darajagacha o'stirishda qanday rivojlanish rejasi (Growth Framework) qo'llaniladi?",
    "level": "lead",
    "category": "architecture",
    "categoryLabel": "Liderlik va Arxitektura",
    "skillSlug": "mentoring",
    "subskillId": "83.8",
    "answer": [
      "- **Junior bosqichi:** Vazifalarni 'Qanday qilish kerakligini' (How) o'rgatish. Kichik mustaqil topshiriqlar, doimiy juftlikda dasturlash (Pair Programming) va konstruktiv Code Review.",
      "- **Middle bosqichi:** Vazifaning 'Nima uchun' (Why) qilinayotganini tushuntirish. Tizim arxitekturasi, testlash, o'z qarorlarini himoya qilish va avtonomlik berish.",
      "- **Senior bosqichi:** 'Nima qilish kerakligini' (What) o'zi aniqlashi. Noaniq biznes talablarni texnik arxitekturaga aylantirish, risklarni boshqarish va boshqa dasturchilarga ustozlik (Mentorship) qilish.",
      "",
      "Har oyda 1-on-1 uchrashuvlar o'tkazib, shaxsiy rivojlanish xaritasi (Roadmap) bo'yicha oraliq natijalarni baholash."
    ],
    "tip": "Haqiqiy Senior va Lead dasturchining qimmati uning yozgan kodida emas, u tarbiyalagan jamoa a'zolarining saviyasida o'lchanadi."
  },
  {
    "id": "iq-200",
    "title": "Engineering Leadership: Texnik qarorlar qabul qilish: ADR (Architecture Decision Record) nima va nega har bir jamoada bo'lishi shart?",
    "level": "lead",
    "category": "architecture",
    "categoryLabel": "Liderlik va Arxitektura",
    "skillSlug": "technical-decision-making",
    "subskillId": "82.8",
    "answer": [
      "Jamoaga 1 yil keyin kelgan dasturchi: 'Nima uchun ular bu yerda MySQL o'rniga MongoDB ishlatgan? Bular ahmoqmi?' deb hayron bo'ladi, chunki o'sha paytdagi kontekst va sabablar unutilgan bo'ladi.",
      "",
      "**Architecture Decision Record (ADR):**",
      "Git repozitoriyasida saqlanadigan qisqa matnli hujjat (`docs/adr/0004-use-redis-streams.md`):",
      "1. **Context (Kontekst):** Biz qanday muammoga duch keldik? Qanday cheklovlar bor edi?",
      "2. **Decision (Qaror):** Aynan qaysi texnologiya yoki pattern tanlandi?",
      "3. **Alternatives (Ko'rib chiqilgan alternativlar):** RabbitMQ va Kafka ko'rib chiqildi, lekin resurs kamligi tufayli rad etildi.",
      "4. **Consequences (Oqibatlar):** Bu qaror natijasida qanday ijobiy va salbiy tomonlarga (Trade-offs) rozi bo'ldik?",
      "- Natijada jamoaning texnik xotirasi (Institutional Memory) saqlanib qoladi va bir xil xatolar qayta takrorlanmaydi."
    ],
    "tip": "ADR lar har qanday professional muhandislik madaniyatining asosi bo'lib, qarorlarning hissiyotlar bilan emas, dalillar bilan qabul qilinganini isbotlaydi."
  },

  // --- PHP tili (JUNIOR) ---
  {
    "id": "iq-201",
    "title": "PHP: include, require, include_once va require_once farqi nima va qachon qaysi biri ishlatiladi?",
    "level": "junior",
    "category": "php",
    "categoryLabel": "PHP tili",
    "skillSlug": "php",
    "subskillId": "1.1",
    "answer": [
      "`include` va `require` fayllarni joriy skriptga qo'shish uchun xizmat qiladi, ammo ularning xatolik yuz bergandagi harakati tubdan farq qiladi:",
      "",
      "1. **`include` vs `require`:**",
      "   - `include`: Agar ko'rsatilgan fayl topilmasa, `E_WARNING` xatosi chiqadi va skript o'z ishini davom ettiradi. Bu saytning ikkinchi darajali qismlari (masalan, footer, banner) uchun ishlatilishi mumkin.",
      "   - `require`: Agar fayl topilmasa, `E_COMPILE_ERROR` (Fatal Error) yuz beradi va skript ijrosi darhol to'xtatiladi. Bu kritik konfiguratsiyalar, sinflar yoki ma'lumotlar bazasi ulanishlari uchun shart.",
      "",
      "2. **`_once` qo'shimchasi:**",
      "   - `include_once` va `require_once`: Fayl avval qo'shilgan yoki qo'shilmaganligini tekshiradi. Agar fayl ilgari chaqirilgan bo'lsa, uni ikkinchi marta yuklamaydi.",
      "   - Bu sinflar va funksiyalarning takror e'lon qilinishi (masalan, `Fatal error: Cannot redeclare class...`) ning oldini oladi.",
      "",
      "3. **Zamonaviy PHP da o'rni:**",
      "   - Zamonaviy dasturlashda fayllarni qo'lda `require` qilish o'rniga Composer PSR-4 avtoyuklagichi (Autoloading) ishlatiladi. `require_once __DIR__ . '/../vendor/autoload.php'` faqatgina kirish nuqtasida (`index.php`) bir marta chaqiriladi."
    ],
    "tip": "Intervyuda xatolik darajasi (Warning vs Fatal Error) va nima uchun zamonaviy loyihalarda qo'lda require kam ishlatilib, Composer autoloading afzal ko'rilishini tushuntiring."
  },
  {
    "id": "iq-202",
    "title": "PHP: isset(), empty() va is_null() funksiyalari o'rtasidagi farqlar nima?",
    "level": "junior",
    "category": "php",
    "categoryLabel": "PHP tili",
    "skillSlug": "php",
    "subskillId": "1.4",
    "answer": [
      "Ushbu funksiyalar qiymat va o'zgaruvchining mavjudligini tekshirishda juda muhim nozik farqlarga ega:",
      "",
      "1. **`isset($var)`:**",
      "   - O'zgaruvchi e'lon qilingan va uning qiymati `null` EMASLIGINI tekshiradi.",
      "   - Agar o'zgaruvchi mavjud bo'lmasa, ogohlantirish (Notice/Warning) chiqarmasdan `false` qaytaradi.",
      "   - `isset('')`, `isset(0)`, `isset(false)` barchasi `true` qaytaradi, faqat `$var = null` bo'lsa `false` beradi.",
      "",
      "2. **`empty($var)`:**",
      "   - O'zgaruvchi mavjud emasligini yoki uning qiymati bo'sh / falsy ekanligini tekshiradi.",
      "   - `''` (bo'sh satr), `0`, `0.0`, `'0'`, `null`, `false`, `[]` (bo'sh massiv) uchun `empty()` `true` qaytaradi.",
      "   - O'zgaruvchi e'lon qilinmagan bo'lsa ham hech qanday xatosiz `true` qaytaradi.",
      "",
      "3. **`is_null($var)`:**",
      "   - Qiymat aynan `null` ekanligini (`$var === null`) tekshiradi.",
      "   - Agar o'zgaruvchi mavjud bo'lmasa, `Warning: Undefined variable` xatosi chiqadi (chunki u o'zgaruvchining o'zini argument sifatida kutadi).",
      "",
      "4. **Zamonaviy usul (PHP 7+):** Null Coalescing operatori (`$a ?? 'default'`) ichki tuzilishida aynan `isset()` kabi ishlaydi."
    ],
    "tip": "'0' (string nol) empty() da true qaytarishi ko'p dasturchilarni chalg'itadi. Masalan, mahsulot soni 0 bo'lsa, empty() uni bo'sh deb o'ylaydi, shuning uchun raqamlar tekshirilganda isset() yoki strict !== null ishlatish kerakligini ayting."
  },
  {
    "id": "iq-203",
    "title": "PHP: Anonymous Functions (Closures) va Arrow Functions (fn() => ...) farqi nima? use kaliti qachon kerak?",
    "level": "junior",
    "category": "php",
    "categoryLabel": "PHP tili",
    "skillSlug": "php",
    "subskillId": "1.9",
    "answer": [
      "PHP da nomsiz funksiyalar (Closures) va PHP 7.4 da kiritilgan Arrow Functions kodni qisqa va qulay yozish imkonini beradi:",
      "",
      "1. **Klassik Anonymous Function (Closure):**",
      "   - Tashqi qamrovdagi (outer scope) o'zgaruvchilarni ichkariga olib kirish uchun `use ($var)` kalit so'zi majburiy hisoblanadi.",
      "   - Agar o'zgaruvchini qiymat bo'yicha emas, havola (reference) bo'yicha o'zgartirmoqchi bo'lsak, `use (&$var)` ishlatiladi.",
      "   ```php\n   $factor = 2;\n   $double = function($x) use ($factor) {\n       return $x * $factor;\n   };\n   ```",
      "",
      "2. **Arrow Functions (`fn($x) => $x * $factor`):**",
      "   - Tashqi o'zgaruvchilarni avtomatik tarzda (by-value) ushlaydi, `use` yozish shart emas.",
      "   - Faqatgina **bitta ifoda (single expression)** dan iborat bo'lishi mumkin va uning natijasini avtomatik `return` qiladi.",
      "   - Tashqi o'zgaruvchini o'zgartira olmaydi (chunki nusxasini oladi).",
      "",
      "3. **Laravelda qo'llanilishi:**",
      "   - Collection metodlarida: `$users->map(fn($u) => $u->name);`",
      "   - Eloquent so'rovlarida: `$query->whereHas('posts', fn($q) => $q->where('active', true));`"
    ],
    "tip": "Arrow funksiyalarda 'use' yozilmasligi va u doim bitta ifodani qaytarishi, murakkab ko'p qatorli mantiqlar uchun esa klassik function() use () kerakligini ta'kidlang."
  },
  {
    "id": "iq-204",
    "title": "OOP: Interface va Abstract Class o'rtasidagi asosiy farqlar nima va qachon qaysi biri tanlanadi?",
    "level": "junior",
    "category": "php",
    "categoryLabel": "PHP tili",
    "skillSlug": "oop",
    "subskillId": "3.2",
    "answer": [
      "Ikkalasi ham polimorfizm va arxitekturaviy kontraktlar tuzish uchun xizmat qiladi, biroq ularning mohiyati turlicha:",
      "",
      "1. **Interface (Kontrakt - 'Nima qila olishi'):**",
      "   - Faqat metodlarning imzolarini (nomi, argumenti, qaytarish tipi) e'lon qiladi, hech qanday metod tanasi (body) bo'lmaydi.",
      "   - Xususiyatlar (properties) saqlay olmaydi (faqat konstantalar bo'lishi mumkin).",
      "   - Sinf bir vaqtning o'zida bir nechta interfeysni amalga oshirishi (`implements InterfaceA, InterfaceB`) mumkin.",
      "   - *Qachon:* Har xil ob'ektlarga umumiy qobiliyat berishda (masalan, `Loggable`, `Jsonable`, `ShouldQueue`).",
      "",
      "2. **Abstract Class (Umumiy asos - 'U nima o'zi'):**",
      "   - Ham abstrakt metodlarni, ham to'liq yozilgan (realizatsiyasi bor) metodlarni saqlashi mumkin.",
      "   - Holat (properties: private, protected, public) saqlay oladi.",
      "   - PHP da bitta sinf faqat bitta abstrakt sinfdan meros olishi (`extends BaseClass`) mumkin.",
      "   - *Qachon:* Bir-biriga yaqin qarindosh sinflar orasida umumiy kodni qayta ishlatishda (masalan, `BaseController`, `BaseRepository`)."
    ],
    "tip": "'Is-A' (bu - bitta tur, masalan Car is a Vehicle -> Abstract class) va 'Can-Do' (buni bajara oladi, masalan Flyable -> Interface) mantiqiy qoidasini keltiring."
  },
  {
    "id": "iq-205",
    "title": "PHP: Trait nima va undan foydalanishda Method Conflict (nomlar to'qnashuvi) qanday yechiladi?",
    "level": "junior",
    "category": "php",
    "categoryLabel": "PHP tili",
    "skillSlug": "php",
    "subskillId": "1.12",
    "answer": [
      "PHP bitta merosxo'rlik (single inheritance) tilidir. Trait - bu bir nechta mustaqil sinflar o'rtasida metodlarni qayta ishlatish (horizontal code reuse) mexanizmidir:",
      "",
      "1. **Qo'llanishi:**",
      "   - Laravelda deyarli barcha joyda uchraydi: `HasFactory`, `Notifiable`, `SoftDeletes`, `AuthorizesRequests`.",
      "",
      "2. **Precedence (Prioritet qoidasi):**",
      "   - Sinfdagi metod Trait metodini ustiga yozadi (override qiladi).",
      "   - Trait metodi esa ota sinfdan (`parent`) meros olingan metod ustiga yoziladi: `Class > Trait > Parent`.",
      "",
      "3. **Method Conflict (To'qnashuv):**",
      "   - Agar ikkita turli traitda bir xil nomli metod bo'lsa, PHP `Fatal error` beradi.",
      "   - Buni `insteadof` va `as` operatorlari bilan yechiladi:",
      "   ```php\n   class User {\n       use TraitA, TraitB {\n           TraitA::log insteadof TraitB; // TraitA niki ishlasin\n           TraitB::log as logFromB;      // TraitB niki boshqa nomda bo'lsin\n       }\n   }\n   ```"
    ],
    "tip": "Traitlar juda foydali, lekin haddan tashqari ko'p trait ishlatish klassning qayerdan nima metod olayotganini tushunishni qiyinlashtiradi ('Trait Hell')."
  },

  // --- Laravel asoslari (JUNIOR) ---
  {
    "id": "iq-206",
    "title": "Laravel: Route Parameters, Optional Parameters va Route Constraints (where) qanday ishlaydi?",
    "level": "junior",
    "category": "laravel",
    "categoryLabel": "Laravel asoslari",
    "skillSlug": "laravel",
    "subskillId": "2.2",
    "answer": [
      "Laravel marshrutlash tizimi URL dinamik parametrlarini qulay boshqarish uchun keng imkoniyatlar beradi:",
      "",
      "1. **Majburiy parametrlar:**",
      "   ```php\n   Route::get('/users/{id}', [UserController::class, 'show']);\n   ```",
      "   Controller metodida argument sifatida qabul qilinadi: `public function show($id)`.",
      "",
      "2. **Ixtiyoriy parametrlar (Optional Parameters):**",
      "   - Parametr oxiriga `?` qo'yiladi va controller metodida standart qiymat beriladi:",
      "   ```php\n   Route::get('/reports/{year?}', function ($year = null) {\n       return $year ?? date('Y');\n   });\n   ```",
      "",
      "3. **Muntazam ifodalar bilan cheklash (Route Constraints):**",
      "   - `where()` yordamida parametr faqat ma'lum formatda bo'lishi ta'minlanadi. Agar mos kelmasa, 404 xatosi qaytadi:",
      "   ```php\n   Route::get('/users/{id}', ...)->where('id', '[0-9]+');\n   Route::get('/posts/{slug}', ...)->whereAlphaNumeric('slug');\n   ```",
      "   - Global qoida o'rnatish uchun `Route::pattern('id', '[0-9]+')` ishlatiladi."
    ],
    "tip": "whereNumber('id'), whereAlpha('name') kabi qulay helperlar Laravel 8+ da mavjudligini aytib o'tish javobingizni boyitadi."
  },
  {
    "id": "iq-207",
    "title": "Laravel: Middleware nima va u so'rov oqimida qanday ishlaydi? Global, Group va Route middleware farqlari?",
    "level": "junior",
    "category": "laravel",
    "categoryLabel": "Laravel asoslari",
    "skillSlug": "laravel",
    "subskillId": "2.3",
    "answer": [
      "Middleware - bu ilovaga kelayotgan HTTP so'rovlarni Controller'ga yetib bormasdan oldin yoki javob (Response) mijozga qaytishidan oldin filtrlovchi oraliq qatlamdir:",
      "",
      "1. **Ishlash mexanizmi (Pipeline / Onion arxitekturasi):**",
      "   ```php\n   public function handle(Request $request, Closure $next)\n   {\n       // 1. So'rov controllerga borishidan OLDIN bajariladigan mantiq (masalan, auth tekshirish)\n       if (!auth()->check()) return redirect('/login');\n       \n       $response = $next($request); // Controller ishga tushadi\n       \n       // 2. Javob qaytayotgan paytda bajariladigan mantiq (masalan, header qo'shish)\n       return $response;\n   }\n   ```",
      "",
      "2. **Middleware turlari:**",
      "   - **Global Middleware:** Har bir HTTP so'rovda istisnosiz ishlaydi (masalan, `TrimStrings`, CORS, Session boshqaruvi).",
      "   - **Middleware Groups:** Marshrutlar guruhiga biriktiriladi (masalan, `web` guruhi - sessiya, CSRF token; `api` guruhi - token auth, rate limiting).",
      "   - **Route Middleware:** Faqat bitta marshrutga alohida biriktiriladi (masalan, `->middleware('auth')`)."
    ],
    "tip": "Laravel 11 da barcha middlewarelar endi Http/Kernel.php da emas, balki bootstrap/app.php faylida ->withMiddleware() orqali sozlanishini eslab o'ting."
  },
  {
    "id": "iq-208",
    "title": "Laravel Eloquent: find(), findOrFail(), first() va firstOrFail() metodlarining farqi nima?",
    "level": "junior",
    "category": "laravel",
    "categoryLabel": "Laravel asoslari",
    "skillSlug": "eloquent-orm",
    "subskillId": "13.1",
    "answer": [
      "Ushbu metodlar ma'lumotlar bazasidan bitta yozuvni olishda xato holatlarini boshqarish bilan farqlanadi:",
      "",
      "1. **`find($id)` vs `findOrFail($id)`:**",
      "   - `find($id)`: Berilgan birlamchi kalit (Primary Key) bo'yicha qidiradi. Agar yozuv topilsa - Model qaytaradi, topilmasa - `null` qaytaradi.",
      "   - `findOrFail($id)`: Agar yozuv topilmasa, `Illuminate\\Database\\Eloquent\\ModelNotFoundException` tashlaydi. Laravel buni avtomatik tarzda **404 HTTP Not Found** sahifasiga o'giradi. Bu qo'shimcha `if (!$user)` tekshiruvini yozishdan asraydi.",
      "",
      "2. **`first()` vs `firstOrFail()`:**",
      "   - `first()`: Qidiruv shartlariga (`where`) mos keluvchi birinchi qatorni qaytaradi. Topilmasa `null`.",
      "   - `firstOrFail()`: Shartga mos birinchi qatorni qidiradi, agar yozuv mavjud bo'lmasa, darhol 404 (ModelNotFoundException) beradi.",
      "",
      "3. **Amaliy maslahat:** API larda va veb-sahifalarda resurs topilmagan holatni xavfsiz va toza boshqarish uchun har doim `OrFail` qo'shimchali metodlarni ishlatish eng yaxshi amaliyotdir."
    ],
    "tip": "OrFail metodlari 404 status qaytarishi tufayli controller kodida ortiqcha if (!$item) { abort(404); } tekshiruvlarini qisqartirishini tushuntiring."
  },
  {
    "id": "iq-209",
    "title": "Laravel: Migrations nima? up() va down() vazifalari hamda rollback, refresh va fresh farqlari?",
    "level": "junior",
    "category": "laravel",
    "categoryLabel": "Laravel asoslari",
    "skillSlug": "database-design",
    "subskillId": "14.2",
    "answer": [
      "Migratsiyalar - bu ma'lumotlar bazasi strukturasi uchun Version Control (Git kabi) tizimidir. Jamoaning barcha a'zolarida DB strukturasi bir xil bo'lishini ta'minlaydi:",
      "",
      "1. **`up()` va `down()` metodlari:**",
      "   - `up()`: Yangi jadval yoki ustun yaratish kabi o'zgarishlarni kiritadi.",
      "   - `down()`: `up()` da qilingan ishni aynan teskarisiga qaytaradi (masalan, `Schema::dropIfExists('users')`).",
      "",
      "2. **Buyruqlar farqi:**",
      "   - `php artisan migrate:rollback`: Eng oxirgi bajarilgan migratsiyalar partiyasini (batch) `down()` orqali ortga qaytaradi.",
      "   - `php artisan migrate:refresh`: Avval barcha migratsiyalarni `down()` qilib orqaga qaytaradi, so'ngra qaytadan `up()` qiladi.",
      "   - `php artisan migrate:fresh`: `down()` metodlarini chaqirib o'tirmasdan, bazadagi barcha jadvallarni to'g'ridan-to'g'ri `DROP` qilib tashlaydi va noldan barcha migratsiyalarni ishga tushiradi (eng tez va xatosiz tozalash usuli)."
    ],
    "tip": "Production serverda hech qachon migrate:fresh ishlatmaslik kerakligini, chunki u barcha mavjud ma'lumotlarni o'chirib yuborishini eslatib o'ting."
  },
  {
    "id": "iq-210",
    "title": "Eloquent: hasOne, hasMany va belongsTo bog'lanishlari qanday farqlanadi va Foreign Key qayerda joylashadi?",
    "level": "junior",
    "category": "laravel",
    "categoryLabel": "Laravel asoslari",
    "skillSlug": "eloquent-orm",
    "subskillId": "13.2",
    "answer": [
      "Eloquent relatsiyalarida asosiy tushuncha - qaysi model ota (parent) va qaysi biri bola (child) ekanligini hamda Foreign Key qayerda turganini bilishdir:",
      "",
      "1. **Qoida: Tashqi kalit (Foreign Key) qayerda joylashgan?**",
      "   - Kimda Foreign Key (`user_id`, `category_id`) bo'lsa, o'sha model **`belongsTo`** yozadi!",
      "   - O'zida Foreign Key bo'lmagan, lekin boshqa jadval unga bog'langan model **`hasOne`** yoki **`hasMany`** yozadi.",
      "",
      "2. **Misollar:**",
      "   - `User` va `Profile`: `profiles` jadvalida `user_id` bor. Demak: `User -> hasOne(Profile)`, `Profile -> belongsTo(User)`.",
      "   - `Post` va `Comment`: `comments` jadvalida `post_id` bor. Demak: `Post -> hasMany(Comment)`, `Comment -> belongsTo(Post)`.",
      "",
      "3. **Laravel nomlash konvensiyasi:**",
      "   - Agar `Comment` modelida `post()` funksiyasi yozilsa, Laravel avtomatik ravishda `comments.post_id` ustunini qidiradi. Agar ustun nomi boshqacha bo'lsa, ikkinchi argumentda ko'rsatiladi: `belongsTo(Post::class, 'custom_post_id')`."
    ],
    "tip": "'Kimda foreign key bo'lsa, o'sha belongsTo ishlatadi' degan qisqa va aniq oltin qoidani aytsangiz, suhbat oluvchida ajoyib taassurot qoldirasiz."
  },
  {
    "id": "iq-211",
    "title": "Eloquent Many-to-Many (belongsToMany) qanday ishlaydi va Pivot jadval nima?",
    "level": "junior",
    "category": "laravel",
    "categoryLabel": "Laravel asoslari",
    "skillSlug": "eloquent-orm",
    "subskillId": "13.2",
    "answer": [
      "Many-to-Many (Ko'pga-ko'p) munosabatida bitta ob'ekt ikkinchi ob'ektdan bir nechtasiga ega bo'lishi va aksincha bo'lishi mumkin (masalan, `User` va `Role`):",
      "",
      "1. **Pivot jadval:**",
      "   - Ikki jadvalni bog'lash uchun uchinchi oraliq (Pivot) jadval kerak bo'ladi (masalan, `role_user`).",
      "   - Standart bo'yicha nomlash: ikkala model nomining birlik shakli, alifbo tartibida, pastki chiziq bilan (`role` va `user` -> `role_user`). Unda `user_id` va `role_id` bo'ladi.",
      "",
      "2. **Modelda e'lon qilish:**",
      "   ```php\n   // User.php\n   public function roles() {\n       return $this->belongsToMany(Role::class)->withTimestamps();\n   }\n   ```",
      "",
      "3. **Amallar:**",
      "   - `attach($roleId)`: Yangi rol biriktirish.",
      "   - `detach($roleId)`: Rolni olib tashlash.",
      "   - `sync([1, 2, 3])`: Pivot jadvalini to'liq yangilash (ko'rsatilganlarni qoldirib, qolganlarini avtomatik o'chiradi - eng qulay metod)."
    ],
    "tip": "sync() metodi Many-to-Many boshqaruvida xatolarning oldini olishi va ortiqcha detach/attach zanjiridan xalos qilishini ta'kidlang."
  },

  // --- Database va SQL (JUNIOR) ---
  {
    "id": "iq-212",
    "title": "SQL: WHERE va HAVING o'rtasidagi farq nima? HAVING da nima uchun agregat funksiyalar ishlatiladi?",
    "level": "junior",
    "category": "database",
    "categoryLabel": "Database va SQL",
    "skillSlug": "sql",
    "subskillId": "9.1",
    "answer": [
      "SQL so'rovlarida `WHERE` va `HAVING` ikkalasi ham ma'lumotlarni filtrlash uchun xizmat qiladi, ammo ularning so'rov bajarilish zanjiridagi (Query Execution Order) o'rni tubdan farq qiladi:",
      "",
      "1. **`WHERE` (Guruhlashdan OLDIN):**",
      "   - Ma'lumotlar bazasidagi alohida qatorlarni (rows) guruhlash sodir bo'lishidan oldin filtrlaydi.",
      "   - Unda agregat funksiyalar (`COUNT()`, `SUM()`, `AVG()`) ishlatib bo'lmaydi, chunki bu paytda hali qatorlar guruhlanmagan bo'ladi.",
      "",
      "2. **`HAVING` (Guruhlashdan KEYIN):**",
      "   - `GROUP BY` orqali hosil qilingan natijaviy guruhlarni filtrlaydi.",
      "   - Aynan agregat funksiyalar natijasiga shart qo'yish uchun xizmat qiladi.",
      "",
      "3. **Misol:**",
      "   ```sql\n   SELECT department_id, COUNT(*) as total_employees\n   FROM employees\n   WHERE salary > 3000          -- 1. Maoshi 3000 dan oshiq xodimlarni oladi\n   GROUP BY department_id       -- 2. Bo'limlar bo'yicha guruhlaydi\n   HAVING COUNT(*) >= 5;        -- 3. Xodimlar soni 5 tadan ko'p bo'limlarni qoldiradi\n   ```"
    ],
    "tip": "So'rov tartibini eslang: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY. WHERE xom qatorlarni, HAVING esa agregatsiyalangan natijani filtrlaydi."
  },
  {
    "id": "iq-213",
    "title": "SQL: INNER JOIN, LEFT JOIN, RIGHT JOIN va FULL OUTER JOIN o'rtasidagi farq nima?",
    "level": "junior",
    "category": "database",
    "categoryLabel": "Database va SQL",
    "skillSlug": "sql",
    "subskillId": "9.2",
    "answer": [
      "JOIN turlari ikki jadvaldagi qatorlar qanday shart bilan birlashtirilishini va mos kelmagan qatorlar natijada qolish-qolmasligini belgilaydi:",
      "",
      "1. **`INNER JOIN`:**",
      "   - Faqat ikkala jadvalda ham shartga mos keluvchi (kesishgan) qatorlarni qaytaradi. Agar foydalanuvchining buyurtmasi bo'lmasa, u natijaga kirmaydi.",
      "",
      "2. **`LEFT JOIN` (LEFT OUTER JOIN):**",
      "   - Chap jadvaldagi **barcha** qatorlarni oladi. O'ng jadvaldan faqat mos kelganlari olinadi; mos kelmasa, o'ng jadval ustunlari `NULL` bilan to'ldiriladi. (Masalan, barcha foydalanuvchilar va ularning buyurtmalari; buyurtmasi yo'qlarda `NULL`).",
      "",
      "3. **`RIGHT JOIN`:**",
      "   - O'ng jadvaldagi barcha qatorlarni va chap jadvaldan mos kelganlarini oladi. Amaliyotda kam ishlatiladi (chunki jadvallar o'rnini almashtirib `LEFT JOIN` qilish qulayroq).",
      "",
      "4. **`FULL OUTER JOIN`:**",
      "   - Ikkala jadvaldagi barcha qatorlarni birlashtiradi. Mos kelmagan joylarda har ikki tomondan `NULL` bo'ladi. (MySQL da bevosita qo'llab-quvvatlanmaydi, `UNION` orqali qilinadi)."
    ],
    "tip": "Venn diagrammasi orqali tasavvur qiling: INNER JOIN - o'rtadagi kesishma, LEFT JOIN - chap doira to'liq va o'ng doiraning kesishgan qismi."
  },
  {
    "id": "iq-214",
    "title": "Database: Primary Key va Unique Key o'rtasidagi farq nima? Bitta jadvalda nechta bo'lishi mumkin?",
    "level": "junior",
    "category": "database",
    "categoryLabel": "Database va SQL",
    "skillSlug": "database-design",
    "subskillId": "14.1",
    "answer": [
      "Ikkala kalit ham qatorlarning unikalligini (takrorlanmasligini) ta'minlaydi, biroq quyidagi jiddiy farqlarga ega:",
      "",
      "1. **Primary Key (Birlamchi kalit):**",
      "   - Jadvaldagi har bir qatorni yagona identifikatsiya qiladi.",
      "   - Hech qachon `NULL` qiymat qabul qila olmaydi (`NOT NULL` majburiy).",
      "   - Bitta jadvalda **faqat bitta** Primary Key bo'lishi mumkin (lekin u bir nechta ustundan iborat bo'lishi mumkin - Composite PK).",
      "   - MySQL InnoDB da Primary Key avtomatik ravishda **Clustered Index** hisoblanadi (ma'lumotlar diskda shu kalit tartibida saqlanadi).",
      "",
      "2. **Unique Key (Noyob kalit):**",
      "   - Ustundagi qiymatlarning takrorlanmasligini kafolatlaydi (masalan, `email`, `phone_number`).",
      "   - `NULL` qiymat qabul qilishi mumkin (va SQL standartiga ko'ra, bitta ustunda bir nechta `NULL` bo'lishi mumkin, chunki `NULL != NULL`).",
      "   - Bitta jadvalda **istalgancha ko'p** Unique Key bo'lishi mumkin."
    ],
    "tip": "Bitta jadvalda faqat bitta Primary Key bo'lishi va u Clustered Index ekanligi, Unique Key esa bir nechta bo'lishi va Secondary Index yaratishini ta'kidlang."
  },

  // --- Xavfsizlik (JUNIOR) ---
  {
    "id": "iq-215",
    "title": "Security: XSS (Cross-Site Scripting) nima va Blade'da {{ $var }} bilan {!! $var !!} farqi nima?",
    "level": "junior",
    "category": "security",
    "categoryLabel": "Xavfsizlik",
    "skillSlug": "web-application-security",
    "subskillId": "51.1",
    "answer": [
      "XSS - hujumchi tomonidan veb-sahifaga zararli JavaScript kodlarining joylashtirilishi va boshqa foydalanuvchilar brauzerida ishga tushirilishidir (masalan, cookie yoki tokenni o'g'irlash):",
      "",
      "1. **Blade himoyasi (`{{ $var }}`):**",
      "   - Laravel Blade standarti bo'yicha `{{ $var }}` yozilganda, u PHP ning `htmlspecialchars($var, ENT_QUOTES, 'UTF-8')` funksiyasidan o'tkaziladi.",
      "   - Natijada `<script>` tegi `&lt;script&gt;` ga aylanadi va brauzer uni kod sifatida emas, oddiy matn sifatida ko'rsatadi. Bu XSS ga qarshi avtomatik himoyadir.",
      "",
      "2. **Xavfli chiqarish (`{!! $var !!}`):**",
      "   - `{!! $var !!}` o'zgaruvchini hech qanday qochirishsiz (raw HTML) to'g'ridan-to'g'ri chiqaradi.",
      "   - Faqat ishonchli manbalar (masalan, xavfsiz tozalangan WYSIWYG muharriri matni) uchungina ishlatilishi kerak.",
      "   - Agar foydalanuvchi kiritgan ma'lumot (masalan, izoh yoki profil ismi) `{!! $comment !!}` shaklida chiqarilsa, ilovada ochiq XSS zaifligi paydo bo'ladi."
    ],
    "tip": "Hech qachon foydalanuvchi kiritgan ma'lumotni {!! !!} ichiga qo'ymaslik kerakligini, agar HTML chiqarish shart bo'lsa, avval HTMLPurifier kabi kutubxonalar bilan tozalash shartligini ayting."
  },
  {
    "id": "iq-216",
    "title": "Security: Nega parollarni md5() yoki sha1() bilan saqlash qat'iy taqiqlangan va Bcrypt/Argon2 qanday himoya qiladi?",
    "level": "junior",
    "category": "security",
    "categoryLabel": "Xavfsizlik",
    "skillSlug": "web-application-security",
    "subskillId": "51.2",
    "answer": [
      "MD5 va SHA-1 parollarni saqlash uchun mutlaqo yaroqsiz hisoblanadi va jiddiy xavfsizlik fojiasiga olib keladi:",
      "",
      "1. **MD5 va SHA-1 ning muammolari:**",
      "   - **Juda tez ishlaydi:** Zamonaviy GPUlar soniyasiga milliardlab MD5 kombinatsiyalarini tekshira oladi (Brute-force).",
      "   - **Tuzsiz (No Salt):** Agar ikkita foydalanuvchining paroli bir xil bo'lsa, ularning heshi ham bir xil bo'ladi. Hujumchilar oldindan tayyorlangan ulkan jadvallar (Rainbow Tables) orqali parolni bir necha soniyada topib olishadi.",
      "",
      "2. **Bcrypt (`Hash::make()`):**",
      "   - **Sekinlashtirilgan xesh (Slow Hash):** Maxsus `cost` parametri orqali hisoblash qasddan qiyinlashtirilgan (masalan, bitta parolni tekshirish 100-200ms vaqt oladi). Bu brute-force hujumini iqtisodiy jihatdan imkonsiz qiladi.",
      "   - **Avtomatik tuz (Auto Salt):** Har bir parol uchun yangi tasodifiy tuz (salt) generatsiya qilinadi. Bir xil `123456` paroli har safar mutlaqo boshqacha hesh beradi.",
      "",
      "3. **Laravelda:** Har doim `Hash::make($password)` va tekshirishda `Hash::check($input, $hashed)` ishlatiladi."
    ],
    "tip": "Bcryptning asosiy kuchi - bu sekinlik (work factor/cost) va avtomatik tuz qo'shilishi ekanligini ta'kidlang."
  },

  // --- Laravel asoslari (JUNIOR) ---
  {
    "id": "iq-217",
    "title": "Laravel Blade: @include, @yield/@extends va zamonaviy <x-component> yondashuvlarining farqi?",
    "level": "junior",
    "category": "laravel",
    "categoryLabel": "Laravel asoslari",
    "skillSlug": "laravel",
    "subskillId": "2.2",
    "answer": [
      "Laravel Blade shablonlash dvigatelida kodni qayta ishlatish evolyutsiyasi quyidagicha kechgan:",
      "",
      "1. **`@extends` va `@yield` (Klassik layout merosi):**",
      "   - Asosiy qolip (`layouts/app.blade.php`) yaratiladi va unda `@yield('content')` joyi belgilanadi. Bolalar sahifasi `@extends('layouts.app')` va `@section('content')` orqali kontent uzatadi.",
      "",
      "2. **`@include('view.name', ['data' => $val])`:**",
      "   - Kichik HTML parchalarini (masalan, tugma, navbar) boshqa fayldan yuklash. Kamchiligi: ma'lumotlar qamrovi (scope) global o'zgaruvchilar bilan chalkashib ketishi oson.",
      "",
      "3. **`<x-component>` (Blade Components - zamonaviy standart):**",
      "   - HTML teglari kabi ishlaydi: `<x-alert type=\"danger\" :message=\"$error\" />`.",
      "   - Alohida PHP sinfiga ega bo'lishi mumkin (`app/View/Components/Alert.php`), bu esa shablon ichida murakkab PHP kodlarini yozmasdan, barcha mantiqni sinfga o'tkazish imkonini beradi.",
      "   - Slotlar (`{{ $slot }}`) orqali ichki kontentni oson boshqaradi."
    ],
    "tip": "Zamonaviy Laravelda komponentli arxitektura (<x-card>, <x-button>) kodni ancha toza va mustaqil qilishini aytib bering."
  },

  // --- Testlash (JUNIOR) ---
  {
    "id": "iq-218",
    "title": "Testing: Unit Test va Feature Test o'rtasidagi farq nima va birinchi test qanday yoziladi?",
    "level": "junior",
    "category": "testing",
    "categoryLabel": "Testlash",
    "skillSlug": "unit-testing",
    "subskillId": "27.1",
    "answer": [
      "Avtomatlashtirilgan testlar kod sifatini va yangi o'zgarishlar eskisini buzmasligini (regression) kafolatlaydi:",
      "",
      "1. **Unit Test (Birlik testi):**",
      "   - Ilovaning eng kichik izolyatsiyalangan bo'lagini (bitta sinf, bitta metod yoki hisoblash funksiyasi) tekshiradi.",
      "   - Ma'lumotlar bazasi, tarmoq yoki HTTP so'rovlariga ulanmaydi. Shu sababli mikrosekundlarda juda tez ishlaydi.",
      "   - Masalan: `Calculator::add(2, 3)` natijasi `5` ekanligini tekshirish.",
      "",
      "2. **Feature Test (Funksional / Integratsion test):**",
      "   - Bir nechta qismlarning birgalikda ishlashini tekshiradi (HTTP so'rov, Middleware, Controller, Ma'lumotlar bazasi va Validatsiya).",
      "   - Masalan: `POST /api/register` so'rovi yuborilganda foydalanuvchi DB da paydo bo'lishi va 201 status qaytishini tekshirish:",
      "   ```php\n   public function test_user_can_register(): void {\n       $response = $this->postJson('/api/register', [\n           'name' => 'Ali',\n           'email' => 'ali@example.com',\n           'password' => 'secret123'\n       ]);\n       $response->assertStatus(201);\n       $this->assertDatabaseHas('users', ['email' => 'ali@example.com']);\n   }\n   ```"
    ],
    "tip": "Laravelda asosiy e'tibor Feature testlarga qaratilishi tavsiya etiladi, chunki ular real foydalanuvchi tajribasini to'liq simulyatsiya qiladi."
  },

  // --- PHP tili (JUNIOR) ---
  {
    "id": "iq-219",
    "title": "PHP: final kalit so'zi nima va u Class hamda Metodlarga qo'llanganda nimani taqiqlaydi?",
    "level": "junior",
    "category": "php",
    "categoryLabel": "PHP tili",
    "skillSlug": "php",
    "subskillId": "1.13",
    "answer": [
      "`final` kalit so'zi ob'ektga yo'naltirilgan dasturlashda vorislik (inheritance) va metodlarni qayta yozishni cheklash uchun ishlatiladi:",
      "",
      "1. **`final class`:**",
      "   - Sinf oldiga `final` qo'yilsa, undan boshqa hech qanday sinf meros ololmaydi (`extends` qilib bo'lmaydi).",
      "   ```php\n   final class PaymentService {}\n   class CustomPayment extends PaymentService {} // Fatal error: Class CustomPayment may not inherit from final class\n   ```",
      "",
      "2. **`final public function`:**",
      "   - Sinfning aniq bir metodi oldiga `final` qo'yilsa, voris sinflar bu metodni o'zgartira (override qila) olmaydi.",
      "",
      "3. **Arxitekturaviy foydasi:**",
      "   - Kutilmagan nojo'ya ta'sirlarning (side-effects) oldini oladi.",
      "   - Domain-Driven Design va Clean Architecture da Value Object'lar va muhim xizmatlarni immutability va qat'iy nazoratda saqlash uchun barcha sinflarni standart ravishda `final` qilish tavsiya etiladi."
    ],
    "tip": "Barcha yangi sinflarni standart ravishda final qilib boshlash va faqat haqiqatan kengaytirish kerak bo'lgandagina ochish yaxshi dasturlash odati ekanligini eslatib o'ting."
  },

  // --- Laravel asoslari (JUNIOR) ---
  {
    "id": "iq-220",
    "title": "Laravel: Configuration va .env: env() va config() farqi nima va nima uchun productionda env() chaqirilmasligi kerak?",
    "level": "junior",
    "category": "laravel",
    "categoryLabel": "Laravel asoslari",
    "skillSlug": "laravel",
    "subskillId": "2.1",
    "answer": [
      "Laravelda konfiguratsiyalarni boshqarish bo'yicha juda muhim qoida mavjud bo'lib, unga rioya qilmaslik productionda kutilmagan `null` xatolariga olib keladi:",
      "",
      "1. **`env()` yordamchisi:**",
      "   - `.env` faylidagi muhit o'zgaruvchilarini o'qish uchun xizmat qiladi: `env('APP_DEBUG', false)`.",
      "",
      "2. **`config()` yordamchisi:**",
      "   - `config/` papkasidagi konfiguratsiya massivlaridan ma'lumot oladi: `config('app.debug')`.",
      "",
      "3. **Kritik qoida va `php artisan config:cache`:**",
      "   - Productionda unumdorlikni oshirish uchun `php artisan config:cache` buyrug'i ishga tushiriladi.",
      "   - Ushbu buyruq bajarilgandan so'ng, Laravel `.env` faylini o'qishni butunlay to'xtatadi va barcha konfiguratsiyalarni bitta kesh fayliga jamlaydi.",
      "   - Natijada, ilovaning boshqa joylarida (Controller, Service, Model) to'g'ridan-to'g'ri chaqirilgan `env('KEY')` har doim **`null`** qaytara boshlaydi!",
      "",
      "4. **Yechim:**",
      "   - `.env` qiymatlarini faqatgina `config/*.php` fayllari ichida `env()` orqali o'qish, kod ichida esa faqat `config('services.stripe.key')` orqali murojaat qilish shart."
    ],
    "tip": "Bu intervyularda eng ko'p beriladigan 'trick question'lardan biri. 'Productionda config:cache ishlatilganda kod ichidagi env() null qaytaradi' degan javob 100 ballik javobdir."
  },

  // --- PHP tili (MIDDLE) ---
  {
    "id": "iq-221",
    "title": "PHP: Katta hajmdagi CSV fayllarni (100MB+) memory_limit dan oshmasdan Generatorlar orqali qanday o'qiymiz?",
    "level": "middle",
    "category": "php",
    "categoryLabel": "PHP tili",
    "skillSlug": "php",
    "subskillId": "1.17",
    "answer": [
      "`file()`, `file_get_contents()` yoki butun faylni bitta massivga o'qish 100MB+ fayllarda PHP ning `Allowed memory size exhausted` xatosiga olib keladi. Chunki PHP massivlari xotirada 3-5 barobar ko'proq joy egallaydi:",
      "",
      "1. **Generatorlar yechimi (`yield`):**",
      "   - Fayl qatorma-qator oqim (stream) sifatida o'qiladi va har bir qator qayta ishlangach xotiradan tozalanadi:",
      "   ```php\n   function readCsv(string $filePath): Generator {\n       $handle = fopen($filePath, 'r');\n       while (($row = fgetcsv($handle)) !== false) {\n           yield $row;\n       }\n       fclose($handle);\n   }\n   \n   // Foydalanish:\n   foreach (readCsv('large_file.csv') as $row) {\n       ProcessRowJob::dispatch($row); // Xotira doimo 5-10MB atrofida qoladi!\n   }\n   ```",
      "",
      "2. **LazyCollection (Laravel):**",
      "   - Laravel ichida aynan shu mexanizm `LazyCollection::make(function () { ... })` orqali chiroyli o'ralgan.",
      "   - Natijada bir necha gigabaytlik ma'lumotlarni minimal operativ xotira (RAM) sarflab qayta ishlash mumkin."
    ],
    "tip": "Oddiy massiv butun faylni bir vaqtning o'zida RAM ga yuklashini, Generator esa faqat joriy bitta elementni ushlab turishini solishtirib bering."
  },

  // --- Xavfsizlik (MIDDLE) ---
  {
    "id": "iq-222",
    "title": "PHP: serialize() va unserialize() nega xavfli va Insecure Deserialization qanday qilib RCE ga olib kelishi mumkin?",
    "level": "middle",
    "category": "security",
    "categoryLabel": "Xavfsizlik",
    "skillSlug": "web-application-security",
    "subskillId": "51.1",
    "answer": [
      "Foydalanuvchi nazoratidagi ma'lumotlarni hech qachon to'g'ridan-to'g'ri `unserialize()` qilmaslik kerak:",
      "",
      "1. **Hujum mexanizmi (Magic Methods & POP Chains):**",
      "   - `unserialize()` ob'ektni tiklaganda uning `__wakeup()`, `__destruct()`, `__toString()` kabi sehrli metodlari avtomatik ishga tushadi.",
      "   - Hujumchi loyihadagi mavjud sinflar (Gadget chains) zanjirini tuzib, `unserialize()` orqali serverda ixtiyoriy buyruqlarni bajarish (Remote Code Execution - RCE) ga erishishi mumkin.",
      "",
      "2. **Xavfsiz alternativa:**",
      "   - Ilovalarda ma'lumotlar almashinuvi va saqlanishi uchun har doim **JSON** (`json_encode()`, `json_decode()`) ishlatilishi shart.",
      "   - JSON faqat ma'lumotlarni saqlaydi, hech qanday sinf xususiyatlari yoki kod ijrosini ishga tushirmaydi.",
      "   - Agar `unserialize()` ishlatish shart bo'lsa, PHP 7+ dagi `allowed_classes` opsiyasidan foydalanish shart: `unserialize($data, ['allowed_classes' => false])`."
    ],
    "tip": "PHP Serialization zaifligi tarixda ko'plab yirik freymvorklarni buzishga sabab bo'lganini va JSON har doim eng xavfsiz format ekanligini ta'kidlang."
  },

  // --- Laravel asoslari (MIDDLE) ---
  {
    "id": "iq-223",
    "title": "Laravel: Custom Artisan Commands: Argumentlar, Optionlar va withProgressBar qanday ishlatiladi?",
    "level": "middle",
    "category": "laravel",
    "categoryLabel": "Laravel asoslari",
    "skillSlug": "laravel",
    "subskillId": "2.4",
    "answer": [
      "Laravel Artisan konsol buyruqlari fon vazifalarini, hisobotlarni va cronjoblarni bajarishda asosiy vositadir:",
      "",
      "1. **Signature sintaksisi (Argument vs Option):**",
      "   ```php\n   protected $signature = 'users:notify {user : Foydalanuvchi ID si} {--queue : Navbatga tashlash} {--limit=100 : Maksimal son}';\n   ```",
      "   - `{user}`: Majburiy pozitsion argument (`$this->argument('user')`).",
      "   - `{--queue}`: Ixtiyoriy boolean flag (`$this->option('queue')` -> true/false).",
      "   - `{--limit=100}`: Standart qiymatli kalit-qiymat ko'rinishidagi parametr.",
      "",
      "2. **Progress Bar (`withProgressBar`):**",
      "   - Minglab elementlar qayta ishlanganda konsolda vizual holatni ko'rsatish:",
      "   ```php\n   $this->withProgressBar(User::cursor(), function (User $user) {\n       $user->sendMonthlyReport();\n   });\n   $this->newLine();\n   $this->info('Hisobotlar muvaffaqiyatli yuborildi!');\n   ```"
    ],
    "tip": "Katta hajmdagi ma'lumotlar bilan ishlaganda User::all() emas, balki xotirani tejash uchun User::cursor() yoki chunk() bilan ProgressBar ishlatilishini alohida ta'kidlang."
  },
  {
    "id": "iq-224",
    "title": "Laravel Service Container: Contextual Binding va Tagging (tag/tagged) qachon ishlatiladi?",
    "level": "middle",
    "category": "laravel",
    "categoryLabel": "Laravel asoslari",
    "skillSlug": "laravel",
    "subskillId": "2.1",
    "answer": [
      "Murakkab loyihalarda bitta interfeysning bir nechta turli realizatsiyalari bo'lganda Service Container imkoniyatlari quyidagicha qo'llaniladi:",
      "",
      "1. **Contextual Binding (Kontekstga bog'liq inyeksiya):**",
      "   - Ikkita turli kontroller bitta `StorageInterface` ni so'rasa, lekin biriga `S3Storage`, ikkinchisiga `LocalStorage` kerak bo'lsa:",
      "   ```php\n   $this->app->when(PhotoController::class)\n             ->needs(StorageInterface::class)\n             ->give(S3Storage::class);\n             \n   $this->app->when(LogController::class)\n             ->needs(StorageInterface::class)\n             ->give(LocalStorage::class);\n   ```",
      "",
      "2. **Container Tagging (`tag` / `tagged`):**",
      "   - Bir xil toifadagi turli xizmatlarni bitta guruhga birlashtirish (masalan, barcha hisobot generatorlari):",
      "   ```php\n   $this->app->tag([PdfReport::class, CsvReport::class, ExcelReport::class], 'reports');\n   \n   // Barchasini birdaniga inyeksiya qilish:\n   $this->app->bind(ReportAggregator::class, function ($app) {\n       return new ReportAggregator($app->tagged('reports'));\n   });\n   ```"
    ],
    "tip": "Contextual binding - Open/Closed prinsipini buzmasdan har xil mijozlarga mos klasslarni dinamik berishning eng toza yo'lidir."
  },
  {
    "id": "iq-225",
    "title": "Laravel: Event / Listener arxitekturasi qanday ishlaydi va Event Discovery mexanizmi nima?",
    "level": "middle",
    "category": "laravel",
    "categoryLabel": "Laravel asoslari",
    "skillSlug": "event-driven-architecture",
    "subskillId": "48.1",
    "answer": [
      "Event-Driven (Hodisalarga asoslangan) arxitektura kodni modullarga ajratish va bir-biriga qattiq bog'lanib qolishining (Decoupling) oldini oladi:",
      "",
      "1. **Klassik struktura:**",
      "   - **Event (Hodisa):** Sof ma'lumot ob'ekti (DTO). Masalan: `OrderCreated` hodisasi faqat `$order` modelini saqlaydi.",
      "   - **Listener (Tinglovchi):** Hodisaga javob beruvchi bitta alohida mantiq. Masalan: `SendInvoiceNotification`, `ReduceStock`, `GenerateReceiptPdf`.",
      "",
      "2. **Event Discovery (Avtomatik kashf qilish):**",
      "   - Eski versiyalarda har bir event va listenerni `EventServiceProvider` dagi `$listen` massivida qo'lda ro'yxatdan o'tkazish talab qilinar edi.",
      "   - Zamonaviy Laravelda Listenerdagi `handle(OrderCreated $event)` metodining type-hintiga qarab, Laravel ularni avtomatik tarzda bog'laydi.",
      "",
      "3. **Asinxronlik (`ShouldQueue`):**",
      "   - Listenerga `implements ShouldQueue` qo'shilsa, foydalanuvchi sahifani kutib turmaydi, listener fon navbatiga (Queue) tushadi."
    ],
    "tip": "Listenerlarda ShouldQueue ishlatilganda tranzaksiya commit bo'lishidan oldin listener ishga tushib ketmasligi uchun ShouldDispatchAfterCommit ni eslab o'ting."
  },

  // --- Eloquent ORM (MIDDLE) ---
  {
    "id": "iq-226",
    "title": "Eloquent: Subqueries va addSelect() orqali hisoblangan ustunlarni N+1 siz olish qanday amalga oshiriladi?",
    "level": "middle",
    "category": "eloquent",
    "categoryLabel": "Eloquent ORM",
    "skillSlug": "eloquent-orm",
    "subskillId": "13.3",
    "answer": [
      "Foydalanuvchilar ro'yxatida ularning har birining 'oxirgi login vaqti' yoki 'oxirgi buyurtma summasi' kabi bog'langan hisoblangan qiymatlarni olishda ko'pincha N+1 xatosi yuzaga keladi:",
      "",
      "1. **Noto'g'ri usul:**",
      "   - Foreach ichida `$user->orders()->latest()->first()->amount` chaqirish 100 ta foydalanuvchi uchun 101 ta DB so'rovini hosil qiladi.",
      "",
      "2. **To'g'ri usul: `addSelect()` bilan subquery:**",
      "   ```php\n   $users = User::addSelect([\n       'last_order_amount' => Order::select('amount')\n           ->whereColumn('user_id', 'users.id')\n           ->latest()\n           ->limit(1)\n   ])->paginate(20);\n   \n   // Har bir $user modelida $user->last_order_amount oddiy ustundek mavjud bo'ladi!\n   ```",
      "",
      "3. **Afzalligi:**",
      "   - Barcha ma'lumotlar ma'lumotlar bazasi dvigatelining o'zida bitta yagona SQL so'rovida hisoblanadi va millionlab qatorlarda ham bir necha millisekundda ishlaydi."
    ],
    "tip": "addSelect() subquery nafaqat qiymatni tez olish, balki natijani shu hisoblangan ustun bo'yicha saralash (orderBy('last_order_amount')) imkonini ham berishini ayting."
  },

  // --- Laravel asoslari (MIDDLE) ---
  {
    "id": "iq-227",
    "title": "Laravel Notifications: Mail, Database, SMS va Broadcast kanallariga bitta buyruq orqali xabar yuborish qanday ishlaydi?",
    "level": "middle",
    "category": "laravel",
    "categoryLabel": "Laravel asoslari",
    "skillSlug": "laravel",
    "subskillId": "2.5",
    "answer": [
      "Laravel Notification tizimi bitta xabarni turli aloqa kanallari orqali yetkazish uchun abstraksiya qatlamini taqdim etadi:",
      "",
      "1. **`via($notifiable)` metodi:**",
      "   - Bildirishnoma qaysi kanallardan yuborilishini belgilaydi:",
      "   ```php\n   public function via($notifiable): array {\n       return $notifiable->prefers_sms ? ['sms', 'database'] : ['mail', 'database'];\n   }\n   ```",
      "",
      "2. **Kanalga xos metodlar:**",
      "   - `toMail($notifiable)`: Email shabloni (`MailMessage`).",
      "   - `toDatabase($notifiable)`: `notifications` jadvaliga JSON formatda yoziladigan massiv.",
      "   - `toBroadcast($notifiable)`: Websocket orqali real-vaqtda brauzerga uzatiladigan ma'lumot.",
      "",
      "3. **Yuborish:**",
      "   - `$user->notify(new OrderPaidNotification($order));` yoki",
      "   - `Notification::send($users, new SystemMaintenanceNotification());` (ommaviy yuborish)."
    ],
    "tip": "Notification klassiga ShouldQueue interfeysini qo'shish orqali barcha kanallar bo'ylab xabar yuborishni avtomatik asinxron fon rejimiga o'tkazish mumkinligini ayting."
  },

  // --- Database va SQL (MIDDLE) ---
  {
    "id": "iq-228",
    "title": "MySQL EXPLAIN: 'type' ustunidagi ALL, index, range, ref, eq_ref, const ko'rsatkichlarining ma'nosi va tezlik tartibi?",
    "level": "middle",
    "category": "database",
    "categoryLabel": "Database va SQL",
    "skillSlug": "database-optimization",
    "subskillId": "15.1",
    "answer": [
      "MySQL `EXPLAIN` tahlilida `type` ustuni ma'lumotlar bazasi so'rov qatorlarini qanday usulda qidirganini (Join Type) bildiradi. Tezlik tartibi (Eng yaxshidan eng yomonga qarab):",
      "",
      "1. **`system` / `const` (Eng tez):** Primary Key yoki Unique ustun bo'yicha aniq bitta qiymat qidirilganda (masalan, `WHERE id = 5`). O(1) vaqt.",
      "2. **`eq_ref`:** JOIN paytida Primary Key yoki Unique NOT NULL ustun bo'yicha bitta qator biriktirilganda (eng ideal JOIN).",
      "3. **`ref`:** Oddiy (Unique bo'lmagan) indeks bo'yicha tenglik qidirilganda (masalan, `WHERE status = 'active'`).",
      "4. **`range`:** Indekslangan ustunda diapazonli shartlar ishlatilganda (`BETWEEN`, `>`, `<`, `IN()`).",
      "5. **`index` (Xavfli):** Indeks to'liq aylanib chiqildi (Full Index Scan). `ALL` dan ko'ra yaxshiroq, chunki ma'lumotlar diskdan emas, RAM dagi indeksdan o'qiladi.",
      "6. **`ALL` (Eng yomon - Halokatli):** To'liq jadval skaneri (Full Table Scan). Indekslar umuman ishlatilmagan, barcha qatorlar diskdan ketma-ket o'qilgan."
    ],
    "tip": "EXPLAIN da har doim 'ALL' va 'index' larni yo'qotib, kamida 'range' yoki 'ref' darajasiga keltirish optimallashtirishning asosiy maqsadi ekanligini ayting."
  },
  {
    "id": "iq-229",
    "title": "SQL Tranzaksiyalari: ACID tamoyillari (Atomicity, Consistency, Isolation, Durability) amalda nimani anglatadi?",
    "level": "middle",
    "category": "database",
    "categoryLabel": "Database va SQL",
    "skillSlug": "database-transactions",
    "subskillId": "17.1",
    "answer": [
      "ACID - bu ma'lumotlar bazasi tranzaksiyalarining ishonchliligini kafolatlovchi to'rtta fundamental tamoyildir:",
      "",
      "1. **A - Atomicity (Bo'linmaslik):**",
      "   - 'Hammasi yoki hech narsa' (All-or-Nothing). Tranzaksiyadagi 10 ta buyruqdan 9 tasi bajarilib, 10-chisi xato bersa, avvalgi 9 tasi ham bekor qilinadi (`ROLLBACK`).",
      "",
      "2. **C - Consistency (Muvofiqlik):**",
      "   - Baza har doim o'rnatilgan qoidalarga (Foreign Key, Unique, Check constraints) muvofiq qoladi. Balans noldan kamayib ketmasligi shart bo'lsa, xato holatda tranzaksiya rad etiladi.",
      "",
      "3. **I - Isolation (Yakkalanish):**",
      "   - Bir vaqtning o'zida parallel bajarilayotgan tranzaksiyalar bir-birining oraliq (hali commit bo'lmagan) holatlarini ko'rmasligi kerak.",
      "",
      "4. **D - Durability (Bardavomlik):**",
      "   - Tranzaksiya muvaffaqiyatli yakunlangach (`COMMIT`), server toki to'satdan uzilib qolsa ham, ma'lumotlar yo'qolmaydi (Write-Ahead Logging / WAL orqali diskka yozilgan bo'ladi)."
    ],
    "tip": "Bank o'tkazmasi misolini keltiring: A foydalanuvchidan 100$ yechildi va B ga o'tkazilayotganda elektr o'chdi. Atomicity tufayli pul yo'qolib ketmaydi, rollback bo'ladi."
  },
  {
    "id": "iq-230",
    "title": "Database: Tranzaksiya izolyatsiya darajalari: Dirty Read, Non-Repeatable Read va Phantom Read nima?",
    "level": "middle",
    "category": "database",
    "categoryLabel": "Database va SQL",
    "skillSlug": "database-transactions",
    "subskillId": "17.2",
    "answer": [
      "Izolyatsiya darajalari parallel tranzaksiyalarning xavfsizligi va tezligi o'rtasidagi kelishuvdir (Trade-off):",
      "",
      "1. **Potensial muammolar:**",
      "   - **Dirty Read:** Boshqa tranzaksiya o'zgartirgan, lekin hali `COMMIT` qilmagan ma'lumotni o'qib olish (agar u rollback qilsa, soxta ma'lumot o'qilgan bo'ladi).",
      "   - **Non-Repeatable Read:** Bitta tranzaksiya ichida bir xil qatorni ikki marta o'qiganda boshqacha qiymat chiqishi (chunki orada boshqa tranzaksiya uni UPDATE qilib commit qildi).",
      "   - **Phantom Read:** Diapazonli so'rovda (`WHERE age > 20`) ikkinchi marta o'qilganda yangi qatorlar paydo bo'lib qolishi (boshqa tranzaksiya INSERT qildi).",
      "",
      "2. **4 ta standart daraja:**",
      "   - **Read Uncommitted:** Dirty Read ga ruxsat beradi (eng xavfli, kam ishlatiladi).",
      "   - **Read Committed (PostgreSQL standarti):** Dirty Read yo'qoladi, faqat commit qilingan ma'lumot ko'rinadi.",
      "   - **Repeatable Read (MySQL InnoDB standarti):** MVCC orqali Non-Repeatable Read va Phantom Read ning oldi olinadi.",
      "   - **Serializable:** To'liq qat'iy ketma-ketlik. Barcha so'rovlar qulflanadi (eng sekin, lekin 100% xavfsiz)."
    ],
    "tip": "MySQL standart bo'yicha Repeatable Read, PostgreSQL esa Read Committed darajasida ishlashini bilish juda yuqori baholanadi."
  },
  {
    "id": "iq-231",
    "title": "Redis: Hashes vs Strings: Foydalanuvchi profilini saqlashda nima uchun HSET oddiy JSON SET ga qaraganda ancha kam xotira egallaydi?",
    "level": "middle",
    "category": "database",
    "categoryLabel": "Database va SQL",
    "skillSlug": "redis",
    "subskillId": "12.1",
    "answer": [
      "Foydalanuvchi ma'lumotlarini (masalan, `id, name, email, visits`) Redisda saqlashda ikki xil yo'l bor:",
      "",
      "1. **String (JSON) usuli: `SET user:1 '{\"name\":\"Ali\",\"email\":\"...\"}'`:**",
      "   - Har safar bitta maydonni (masalan, `visits` sonini) oshirish uchun butun JSON ni PHP ga o'qib, parse qilib, qayta saqlash kerak bo'ladi (Race condition xavfi).",
      "   - Har bir kalit Redisda metadata va xotira boshlig'iga (overhead) ega bo'ladi.",
      "",
      "2. **Redis Hashes usuli: `HSET user:1 name Ali email ... visits 0`:**",
      "   - **Atomik yangilash:** Faqat bitta maydonni alohida o'qish (`HGET user:1 name`) yoki atomik oshirish (`HINCRBY user:1 visits 1`) mumkin.",
      "   - **Xotirani 5 barobargacha tejash (ziplist / listpack):** Redisda maydonlar soni kichik bo'lsa (standart 512 tagacha), Redis uni xotirada o'ta siqilgan `listpack` strukturasi sifatida saqlaydi. Natijada millionlab foydalanuvchilar profilini saqlashda RAM sarfi keskin kamayadi."
    ],
    "tip": "Redis Hash'lar nafaqat xotirani tejaydi, balki Race Condition siz atomik HINCRBY amallarini bajarish imkonini beradi."
  },

  // --- Asinxron arxitektura (MIDDLE) ---
  {
    "id": "iq-232",
    "title": "Laravel Queues: Job Retries, backoff, tries va maxExceptions parametrlari tarmoq xatolarini qanday yengadi?",
    "level": "middle",
    "category": "async",
    "categoryLabel": "Asinxron arxitektura",
    "skillSlug": "queues-and-background-jobs",
    "subskillId": "46.2",
    "answer": [
      "Tashqi API larga (SMS, To'lov, Pochta) so'rov yuboruvchi navbatdagi vazifalar tarmoq uzilishlari tufayli xato berishi tabiiy:",
      "",
      "1. **`$tries = 3;`:**",
      "   - Job necha marta qayta urinib ko'rishini belgilaydi. Agar 3 marta ham yiqilsa, `failed_jobs` jadvaliga tushadi.",
      "",
      "2. **`$backoff = [10, 60, 300];` (Eksponensial kechiktirish):**",
      "   - Job xato berganda uni darhol qayta ishga tushirish tashqi serverni yanada yuklab qo'yadi.",
      "   - Massiv ko'rinishida berilsa: 1-xatoda 10 soniyadan keyin, 2-xatoda 60 soniyadan keyin, 3-xatoda 5 daqiqadan keyin qayta urinadi.",
      "",
      "3. **`$maxExceptions = 2;`:**",
      "   - Belgilangan sonli xatolardan so'ng jobni qayta urinishlardan to'xtatadi.",
      "",
      "4. **`retryUntil()`:**",
      "   - Urinishlar soniga emas, aniq vaqtga bog'lash: masalan, 'navbatdagi vazifani 1 soat davomida har 2 daqiqada takrorlab ko'r'."
    ],
    "tip": "Backoff parametri tashqi servislarga ortiqcha yuklama bermaslik (Throttling) uchun eksponensial o'sib boruvchi sonlar ([5, 30, 120]) bilan berilishi eng to'g'ri amaliyotdir."
  },

  // --- DevOps va Linux (MIDDLE) ---
  {
    "id": "iq-233",
    "title": "Linux Supervisor: Production muhitida Laravel queue workerlarni doimiy va barqaror tirik saqlash qanday ta'minlanadi?",
    "level": "middle",
    "category": "devops",
    "categoryLabel": "DevOps va Linux",
    "skillSlug": "queues-and-background-jobs",
    "subskillId": "46.3",
    "answer": [
      "`php artisan queue:work` buyrug'i uzoq yashovchi (long-running) jarayon bo'lib, xotira to'lib ketishi, xatoliklar yoki server qayta yuklanganda to'xtab qolishi mumkin:",
      "",
      "1. **Supervisor ning vazifasi:**",
      "   - Linux tizimida belgilangan jarayonlarni doimiy kuzatib boradi. Agar worker biron sabab bilan o'lib qolsa, mikrosekundlarda uni avtomatik qayta ishga tushiradi (`autostart=true`, `autorestart=true`).",
      "",
      "2. **Tipik konfiguratsiya (`/etc/supervisor/conf.d/laravel-worker.conf`):**",
      "   ```ini\n   [program:laravel-worker]\n   process_name=%(program_name)s_%(process_num)02d\n   command=php /var/www/app/artisan queue:work redis --sleep=3 --tries=3 --max-time=3600\n   autostart=true\n   autorestart=true\n   user=www-data\n   numprocs=8\n   redirect_stderr=true\n   stdout_logfile=/var/www/app/storage/logs/worker.log\n   ```",
      "",
      "3. **`numprocs=8`:**",
      "   - Bir vaqtning o'zida parallel ishlovchi 8 ta worker jarayonini ishga tushiradi, bu esa navbatlarning tezkor bo'shashini ta'minlaydi.",
      "4. **Deploy paytidagi qoida:** Yangi kod yuklanganda albatta `php artisan queue:restart` chaqirilishi kerak, shunda workerlar navbatdagi vazifani tugatib, yangi kod bilan o'zini yangilaydi."
    ],
    "tip": "Deploy skriptida har doim 'queue:restart' bo'lishi shartligini, aks holda workerlar xotiradagi eski PHP kodini bajarishda davom etishini ayting."
  },

  // --- Xavfsizlik (MIDDLE) ---
  {
    "id": "iq-234",
    "title": "API Rate Limiting: RateLimiter::for() orqali dinamik cheklovlar (masalan, Premium vs Bepul foydalanuvchilar) qanday qo'yiladi?",
    "level": "middle",
    "category": "security",
    "categoryLabel": "Xavfsizlik",
    "skillSlug": "api-design",
    "subskillId": "19.3",
    "answer": [
      "Laravel 8+ da `RateLimiter` fasadi orqali nafaqat oddiy IP bo'yicha, balki har bir foydalanuvchi statusiga qarab moslashuvchan cheklovlar o'rnatish mumkin:",
      "",
      "1. **Sozlash (`AppServiceProvider`):**",
      "   ```php\n   RateLimiter::for('api', function (Request $request) {\n       return $request->user()?->is_premium\n           ? Limit::none() // Cheklovsiz\n           : Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());\n   });\n   ```",
      "",
      "2. **Javob sarlavhalari (Headers):**",
      "   - `X-RateLimit-Limit`: Daqiqasiga ruxsat etilgan so'rovlar soni.",
      "   - `X-RateLimit-Remaining`: Qolgan so'rovlar soni.",
      "   - `Retry-After`: Cheklov buzilganda (HTTP 429 Too Many Requests) necha soniya kutish kerakligi.",
      "",
      "3. **Kesh drayveri:** Productionda rate limit ma'lumotlari Redisda saqlanishi shart, aks holda ko'p serverli (multi-server) tizimlarda cheklov to'g'ri ishlamaydi."
    ],
    "tip": "Rate limiting faqat DDOS dan emas, balki bepul foydalanuvchilarning pullik resurslarni suiste'mol qilishidan biznesni himoya qilish vositasi ekanligini ayting."
  },
  {
    "id": "iq-235",
    "title": "OWASP: Broken Object Level Authorization (BOLA / IDOR) nima va Laravelda Route Model Binding orqali qanday oldi olinadi?",
    "level": "middle",
    "category": "security",
    "categoryLabel": "Xavfsizlik",
    "skillSlug": "web-application-security",
    "subskillId": "51.1",
    "answer": [
      "BOLA (API Security Top 1 ro'yxatida) - foydalanuvchi URL dagi ID ni o'zgartirib, boshqa odamning ma'lumotlariga (shartnoma, chek, hisob) ruxsatsiz kirishi yoki o'chirishi:",
      "",
      "1. **Xavfli kod:**",
      "   ```php\n   public function show($id) {\n       $invoice = Invoice::findOrFail($id); // Foydalanuvchiga tegishlimi yoki yo'q - tekshirilmagan!\n       return response()->json($invoice);\n   }\n   ```",
      "",
      "2. **Himoya usullari:**",
      "   - **Laravel Policy / Gate:** `$this->authorize('view', $invoice);`",
      "   - **Scoped Route Model Binding:**",
      "   ```php\n   Route::get('/users/{user}/invoices/{invoice}', [InvoiceController::class, 'show'])\n        ->scopeBindings();\n   ```",
      "   Laravel faqat ushbu `{user}` ga tegishli bo'lgan `{invoice}` nigina yuklaydi. Boshqa foydalanuvchining hisob-fakturasi ID si uzatilsa, avtomatik 404 beradi."
    ],
    "tip": "BOLA ning oldini olish uchun har doim Model Policy yoki scopeBindings() ishlatilishi kerakligini ta'kidlang."
  },

  // --- Testlash (MIDDLE) ---
  {
    "id": "iq-236",
    "title": "Testing: RefreshDatabase traiti qanday ishlaydi va in-memory SQLite vs real MySQL testi o'rtasidagi farq?",
    "level": "middle",
    "category": "testing",
    "categoryLabel": "Testlash",
    "skillSlug": "unit-testing",
    "subskillId": "27.2",
    "answer": [
      "Testlar bir-biriga ta'sir qilmasligi uchun har bir testdan so'ng ma'lumotlar bazasi dastlabki toza holatiga qaytarilishi kerak:",
      "",
      "1. **`RefreshDatabase` traiti:**",
      "   - Birinchi marta barcha migratsiyalarni ishga tushiradi (`migrate`).",
      "   - Har bir alohida test metodi boshlanishida tranzaksiya ochadi (`DB::beginTransaction()`) va test tugagach `ROLLBACK` qiladi.",
      "   - Natijada jadvallarni qayta yaratish shart bo'lmaydi va testlar bir necha barobar tezlashadi.",
      "",
      "2. **In-Memory SQLite vs Real MySQL:**",
      "   - **In-Memory SQLite (`:memory:`):** O'ta tez ishlaydi, lekin MySQL ga xos xususiyatlarni (masalan, JSON operatorlari, Virtual Columns, FullText Index, qat'iy Foreign Key cheklovlari) to'liq qo'llab-quvvatlamaydi. Natijada testda o'tgan kod productionda yiqilishi mumkin.",
      "   - **Real MySQL (Docker yoki alohida test DB):** Biroz sekinroq, lekin production bilan 100% bir xil muhitni kafolatlaydi."
    ],
    "tip": "Kritik loyihalarda test muhitini ham real MySQL yoki PostgreSQL da ishlatish kutilmagan farqlardan asrashini aytib bering."
  },
  {
    "id": "iq-237",
    "title": "Laravel Testing: Mail::fake(), Queue::fake(), Event::fake() va Http::fake() fakes mexanizmi qanday ishlaydi?",
    "level": "middle",
    "category": "testing",
    "categoryLabel": "Testlash",
    "skillSlug": "feature-testing",
    "subskillId": "29.1",
    "answer": [
      "Test yozayotganda real mijozlarga email ketib qolishi yoki to'lov shlyuziga haqiqiy pul so'rovi yuborilishining oldini olish uchun Laravel Fakes ishlatiladi:",
      "",
      "1. **Qanday ishlaydi?**",
      "   - `Fake` chaqirilganda, Laravel Service Container dagi haqiqiy servisni xotirada saqlovchi soxta (in-memory test-double) instansiyaga almashtiradi:",
      "   ```php\n   public function test_order_triggers_email_and_job(): void {\n       Queue::fake();\n       Mail::fake();\n       \n       $this->postJson('/api/orders', [...])->assertStatus(201);\n       \n       // Haqiqiy xat ketmaydi, lekin jo'natilgani tekshiriladi:\n       Mail::assertSent(OrderConfirmationMail::class, function ($mail) {\n           return $mail->hasTo('client@example.com');\n       });\n       \n       // Job navbatga tushganligi tekshiriladi:\n       Queue::assertPushed(GenerateReceiptJob::class);\n   }\n   ```",
      "",
      "2. **`Http::fake()`:**",
      "   - Tashqi API (masalan, Telegram bot yoki Stripe) ga so'rov yubormasdan, oldindan soxta JSON javob qaytarish: `Http::fake(['api.stripe.com/*' => Http::response(['status' => 'success'], 200)]);`"
    ],
    "tip": "Fakes yordamida nafaqat amallar muvaffaqiyati, balki xatolik yuz bergandagi holatni ham (Http::response(null, 500)) bemalol tekshirish mumkinligini ayting."
  },

  // --- Arxitektura (MIDDLE) ---
  {
    "id": "iq-238",
    "title": "Architecture: Repository Pattern vs Service Layer: Laravelda Eloquent mavjud bo'lsa ham Repository kerakmi?",
    "level": "middle",
    "category": "architecture",
    "categoryLabel": "Arxitektura",
    "skillSlug": "software-architecture",
    "subskillId": "61.2",
    "answer": [
      "Ko'p dasturchilar Repository patternini Eloquent ustiga keraksiz qobiq (wrapper) sifatida yozib, 'Anti-pattern' hosil qilishadi:",
      "",
      "1. **Eloquent ning o'zi nima?**",
      "   - Eloquent Active Record patterni bo'lib, uning Query Builder'i allaqachon mukammal Repository vazifasini bajaradi (`User::where(...)->get()`).",
      "   - Eloquent ustidan oddiy `UserRepository::find($id)` yozish hech qanday foyda bermaydi, faqat kod hajmini oshiradi.",
      "",
      "2. **Qachon Service Layer kifoya?**",
      "   - 90% Laravel loyihalarida **Service Layer + Eloquent** eng to'g'ri tanlovdir. Controller faqat HTTP ni boshqaradi, barcha biznes mantiq esa Service da joylashadi.",
      "",
      "3. **Repository qachon haqiqatan kerak?**",
      "   - Faqatgina ma'lumotlar manbai doimiy o'zgarib tursa (masalan, foydalanuvchilar ba'zan MySQL dan, ba'zan tashqi REST API dan, ba'zan esa Elasticsearch dan olinishi kerak bo'lganda).",
      "   - Murakkab Domain-Driven Design (DDD) loyihalarida domen modelini ORM ga qaram bo'lmasligi uchun."
    ],
    "tip": "Laravelda har bir model uchun ko'r-ko'rona Repository ochmaslik kerakligini, Service Layer va Query Scopes ko'p hollarda ancha samarali va toza yechim ekanligini bildiring."
  },
  {
    "id": "iq-239",
    "title": "Architecture: DTO (Data Transfer Object) nima va Controllerdan Servicega assotsiativ massiv o'rniga nima uchun DTO uzatish kerak?",
    "level": "middle",
    "category": "architecture",
    "categoryLabel": "Arxitektura",
    "skillSlug": "clean-code",
    "subskillId": "6.2",
    "answer": [
      "Controllerdan Service ga `$request->all()` yoki massiv (`array $data`) uzatish katta loyihalarda boshboshdoqlik va xatolarga sabab bo'ladi:",
      "",
      "1. **Massivlarning kamchiligi:**",
      "   - Tip nazorati (Type Safety) yo'q. `$data['emial']` deb bitta harf xato yozilsa ham, IDE yoki PHP buni sezmaydi (faqat runtime da `Undefined array key` xatosi chiqadi).",
      "   - Qaysi kalitlar majburiy, qaysilari ixtiyoriy ekanligi noaniq bo'lib qoladi.",
      "",
      "2. **DTO ning afzalligi (PHP 8.2+ readonly class):**",
      "   ```php\n   readonly class CreateUserData {\n       public function __construct(\n           public string $name,\n           public string $email,\n           public ?string $phone = null,\n           public UserRole $role = UserRole::CLIENT\n       ) {}\n       \n       public static function fromRequest(UserRegisterRequest $request): self {\n           return new self(\n               name: $request->validated('name'),\n               email: $request->validated('email'),\n               phone: $request->validated('phone')\n           );\n       }\n   }\n   ```",
      "",
      "3. **Foydasi:** IDE avtomatik to'ldirish (Auto-complete), qat'iy tiplashtirish, statik analiz (PHPStan) bilan 100% muvofiqlik va o'zgarmaslik (Immutability)."
    ],
    "tip": "PHP 8.2 dagi readonly class va named arguments DTO larni yozishni nihoyatda qulay va xavfsiz qilganini ayting."
  },

  // --- DevOps va Linux (MIDDLE) ---
  {
    "id": "iq-240",
    "title": "DevOps: Linux systemd servisi yaratish: Laravel fon workerlarini yoki Websocket serverni qanday boshqaramiz?",
    "level": "middle",
    "category": "devops",
    "categoryLabel": "DevOps va Linux",
    "skillSlug": "linux",
    "subskillId": "38.2",
    "answer": [
      "Zamonaviy Linux distributivlarida (Ubuntu/Debian) fon jarayonlarini boshqarish uchun `systemd` eng asosiy vositadir:",
      "",
      "1. **Servis fayli yaratish (`/etc/systemd/system/laravel-reverb.service`):**",
      "   ```ini\n   [Unit]\n   Description=Laravel Reverb WebSocket Server\n   After=network.target\n   \n   [Service]\n   User=www-data\n   Group=www-data\n   Restart=always\n   RestartSec=3\n   ExecStart=/usr/bin/php /var/www/app/artisan reverb:start\n   \n   [Install]\n   WantedBy=multi-user.target\n   ```",
      "",
      "2. **Boshqarish buyruqlari:**",
      "   - `systemctl daemon-reload` (yangi konfiguratsiyani yuklash)",
      "   - `systemctl enable laravel-reverb` (server yonganda avtomatik ishga tushish)",
      "   - `systemctl start laravel-reverb` (ishga tushirish)",
      "   - `systemctl status laravel-reverb` (holatini ko'rish)",
      "   - `journalctl -u laravel-reverb -f` (jonli loglarni o'qish)."
    ],
    "tip": "Restart=always va RestartSec parametrlarini tushuntirish orqali jarayon to'satdan qulaganda tizim uni qayta ko'tarishini ko'rsating."
  },

  // --- Arxitektura (SENIOR) ---
  {
    "id": "iq-241",
    "title": "Architecture: CQRS da Read Model (Projections) va Write Model: Eventual Consistency kechikishini UI va foydalanuvchi darajasida qanday yashiramiz?",
    "level": "senior",
    "category": "architecture",
    "categoryLabel": "Arxitektura",
    "skillSlug": "software-architecture",
    "subskillId": "61.3",
    "answer": [
      "CQRS da yozish (Write DB - masalan, PostgreSQL) va o'qish (Read DB - masalan, Elasticsearch yoki Redis) alohida bo'lgani sababli, ma'lumotlar o'qish bazasiga bir necha yuz millisekund kechikib (Eventual Consistency) yetib boradi:",
      "",
      "1. **Muammo:**",
      "   - Foydalanuvchi yangi sharh yoki buyurtma yaratadi, lekin sahifa qayta yuklanganda o'zining yozgan sharhini ko'rmaydi (chunki Read model hali yangilanmagan).",
      "",
      "2. **Yechim strategiyalari:**",
      "   - **Optimistic UI Updates:** Frontend mijoz tomonida server javobini kutmasdan darhol sharhni ekranga chizadi. Server xato qaytarsagina bekor qilinadi.",
      "   - **Read-Your-Own-Writes Consistency:** Foydalanuvchi so'nggi 5-10 soniya ichida o'zgartirgan ob'ektlar uchun o'qish so'rovi istisno tariqasida to'g'ridan-to'g'ri Write (Primary) bazaga yoki foydalanuvchining shaxsiy Redis keshiga yo'naltiriladi.",
      "   - **Version / Revision Tracking:** Frontend yozish so'rovi qaytargan yangi versiyani (`v=12`) oladi va Read API ga yuboradi. Read model agar hali `v=11` da bo'lsa, polling yoki websocket orqali `v=12` bo'lishini kutadi."
    ],
    "tip": "Taqsimlangan tizimlarda 'Read-Your-Own-Writes' usuli va Optimistic UI yondashuvi foydalanuvchi tajribasini (UX) buzilishidan saqlab qolishning amaliy standartidir."
  },

  // --- Database va SQL (SENIOR) ---
  {
    "id": "iq-242",
    "title": "PostgreSQL: Table Bloat va HOT (Heap-Only Tuples) optimizatsiyasi: UPDATE amallari katta jadvallarda indekslarni nima uchun shishirib yuboradi?",
    "level": "senior",
    "category": "database",
    "categoryLabel": "Database va SQL",
    "skillSlug": "postgresql",
    "subskillId": "11.1",
    "answer": [
      "PostgreSQL MVCC (Multi-Version Concurrency Control) arxitekturasida `UPDATE` amali qatordagi qiymatni joyida (in-place) o'zgartirmaydi, balki yangi qator (Tuple) yaratadi va eskisini `Dead Tuple` deb belgilaydi:",
      "",
      "1. **Indekslarning shishishi (Index Bloat):**",
      "   - Yangi qator jadvalning boshqa sahifasiga (Page) tushsa, jadvaldagi barcha indekslar yangi qatorning joylashuviga (TID) ko'rsatkich qo'shishi shart bo'ladi.",
      "   - Natijada tez-tez UPDATE bo'ladigan jadvallarda indeks hajmi keskin shishib, disk va RAM ni to'ldirib tashlaydi.",
      "",
      "2. **HOT (Heap-Only Tuples) qutqaruvchisi:**",
      "   - Agar jadval sahifasida bo'sh joy bo'lsa va UPDATE qilinayotgan ustun **hech qanday indeksga kirmagan bo'lsa**, PostgreSQL yangi qatorni o'sha sahifaning o'ziga joylashtiradi.",
      "   - Indekslar yangilanmaydi, eski qatordan yangi qatorga ichki ko'rsatkich (Pointer) ulanadi.",
      "",
      "3. **Sozlash:**",
      "   - Tez-tez yangilanadigan jadvallarda `fillfactor` parametrini pasaytirish kerak: `ALTER TABLE orders SET (fillfactor = 70);` (sahifada 30% bo'sh joy qoldirib, HOT yangilanishlarni 90%+ ga chiqaradi)."
    ],
    "tip": "fillfactor ni 70-80% qilib qo'yish HOT optimizatsiyasini ishga tushirishi va Auto-vacuum yuklamasini keskin kamaytirishini aytish orqali yuqori PostgreSQL bilimidan dalolat berasiz."
  },

  // --- Arxitektura (SENIOR) ---
  {
    "id": "iq-243",
    "title": "Architecture: Distributed Transactions: Nega 2PC (Two-Phase Commit) zamonaviy mikroxizmatlarda deyarli ishlatilmaydi va Saga tanlanadi?",
    "level": "senior",
    "category": "architecture",
    "categoryLabel": "Arxitektura",
    "skillSlug": "software-architecture",
    "subskillId": "61.3",
    "answer": [
      "Bir nechta mustaqil mikroxizmatlar bo'ylab tranzaksiyani boshqarishda 2PC va Saga ikki xil falsafadir:",
      "",
      "1. **2PC (Two-Phase Commit) ning muammolari:**",
      "   - **Bloklovchi protokol (Blocking Protocol):** 1-bosqichda (Prepare) barcha servislar resurslarni (qatorlarni) qulflaydi. Koordinatordan tasdiq (Commit) kelguncha qulflar ochilmaydi.",
      "   - **Single Point of Failure:** Agar koordinator qulasa, barcha qulflangan servislar osilib qoladi va butun tizim to'xtaydi.",
      "   - **Masshtablash imkonsiz:** Tarmoq kechikishlari har bir tranzaksiya vaqtini keskin oshiradi. Shu sababli CAP teoremasiga ko'ra mavjudlik (Availability) yo'qoladi.",
      "",
      "2. **Saga Pattern ustunligi:**",
      "   - Hech qanday global DB qulfi bo'lmaydi. Har bir servis o'zining mahalliy tranzaksiyasini darhol commit qiladi.",
      "   - Xatolik yuz bersa, orqaga qarab **Kompensatsiya tranzaksiyalari (Compensating Transactions)** chaqiriladi (masalan, pul qaytariladi, bron bekor qilinadi).",
      "   - Tizim yuqori o'tkazuvchanlik va nosozliklarga bardoshlilikka (High Availability) ega bo'ladi."
    ],
    "tip": "2PC qat'iy konsistentlik (ACID) beradi lekin tizimni sekinlashtiradi va osiltiradi, Saga esa Eventual Consistency beradi lekin cheksiz masshtablana oladi."
  },

  // --- Asinxron arxitektura (SENIOR) ---
  {
    "id": "iq-244",
    "title": "Apache Kafka: Partition Key tanlash strategiyasi va Consumer Rebalance paytida yuzaga keladigan Stop-The-World muammosi?",
    "level": "senior",
    "category": "async",
    "categoryLabel": "Asinxron arxitektura",
    "skillSlug": "event-driven-architecture",
    "subskillId": "48.2",
    "answer": [
      "Apache Kafka da parallelizm va xabarlar ketma-ketligi (Ordering Guarantee) aynan Partitionlar orqali boshqariladi:",
      "",
      "1. **Ordering Guarantee (Ketma-ketlik kafolati):**",
      "   - Kafka xabarlar tartibini butun Topic bo'yicha EMAS, faqat **bitta Partition ichida** kafolatlaydi.",
      "   - Agar bitta buyurtmaga tegishli xabarlar (Yaratildi -> To'landi -> Yuborildi) to'g'ri tartibda o'qilishi shart bo'lsa, **Partition Key** sifatida `order_id` tanlanishi shart: `hash(order_id) % num_partitions` formulasi orqali barcha bog'liq xabarlar doim bitta partitionga tushadi.",
      "",
      "2. **Consumer Rebalance muammosi:**",
      "   - Consumer Groupga yangi pod qo'shilganda yoki bitta pod o'lib qolsa, Kafka partitionlarni qayta taqsimlaydi (Rebalance).",
      "   - Eski `Eager Rebalance` barcha iste'molchilarni to'xtatib (Stop-the-world), navbatni bir necha soniyaga muzlatib qo'yar edi.",
      "   - Zamonaviy Kafka da `Cooperative Sticky Assignor` ishlatiladi: faqat o'rni o'zgargan partitionlar to'xtatiladi, qolgan iste'molchilar o'qishda davom etadi."
    ],
    "tip": "Xabarlar tartibi Kafka da faqat bitta Partition ichida kafolatlanishi va Partition Key ning to'g'ri tanlanishi Hot Partition muammosining oldini olishini tushuntiring."
  },

  // --- Xavfsizlik (SENIOR) ---
  {
    "id": "iq-245",
    "title": "Security: Zero Trust Architecture: Mikroxizmatlar aro mTLS (Mutual TLS) va qisqa umr ko'ruvchi tokenlar qanday ishlaydi?",
    "level": "senior",
    "category": "security",
    "categoryLabel": "Xavfsizlik",
    "skillSlug": "web-application-security",
    "subskillId": "51.3",
    "answer": [
      "Zero Trust konsepsiyasining asosiy shiori: 'Hech qachon ishonma, har doim tekshir' (Never Trust, Always Verify). Ichki tarmoq (VPC) allaqachon buzilgan deb hisoblanadi:",
      "",
      "1. **mTLS (Mutual TLS):**",
      "   - Standart HTTPS da faqat mijoz server sertifikatini tekshiradi.",
      "   - mTLS da esa **har ikki tomon** (masalan, `OrderService` va `PaymentService`) bir-biriga o'zining kriptografik sertifikatini taqdim etadi.",
      "   - Natijada oradagi trafik shifrlanadi (Man-in-the-Middle imkonsiz) va begona servis ichki tarmoqqa kirib olsa ham so'rov yubora olmaydi.",
      "",
      "2. **Short-Lived Service Tokens:**",
      "   - Servislar bir-biri bilan statik `API_KEY` orqali emas, 5-15 daqiqa yashovchi kriptografik imzolangan JWT tokenlar orqali gaplashadi.",
      "   - Token o'g'irlangan taqdirda ham uning muddati bir necha daqiqada tugaydi.",
      "",
      "3. **Amalda:** Kubernetes muhitida bu odatda Service Mesh (Istio yoki Linkerd) orqali dasturchi kodi o'zgartirilmasdan avtomatik yo'lga qo'yiladi."
    ],
    "tip": "Zero Trust da perimetr xavfsizligi (firewall) yetarli emasligi, har bir alohida RPC so'rovi kriptografik identifikatsiya qilinishi kerakligini ayting."
  },

  // --- Arxitektura (SENIOR) ---
  {
    "id": "iq-246",
    "title": "Event Sourcing: Event Schema Evolution: Yillar davomida to'plangan millionlab eski hodisalarni yangi kod talablariga moslash (Upcasting) qanday yechiladi?",
    "level": "senior",
    "category": "architecture",
    "categoryLabel": "Arxitektura",
    "skillSlug": "event-driven-architecture",
    "subskillId": "48.2",
    "answer": [
      "Event Sourcing tizimlarida hodisalar (Events) o'zgarmasdir (Append-Only). Bazadagi eski hodisalar hech qachon o'chirilmaydi yoki `UPDATE` qilinmaydi:",
      "",
      "1. **Muammo:**",
      "   - 2024 yildagi `UserRegistered` hodisasida faqat `name` bor edi. 2026 yilda tizimga `first_name` va `last_name` majburiy qilindi. Yangi kod eski hodisalarni o'qiyotganda sinib qoladi.",
      "",
      "2. **Yechimlar:**",
      "   - **Upcasting (Eng toza yechim):** Hodisalar bazadan o'qilganda, lekin domen modeliga uzatilishidan oldin oraliq konvertor (Upcaster) orqali o'tadi:",
      "   ```php\n   class UserRegisteredV1ToV2Upcaster {\n       public function upcast(array $payload): array {\n           $parts = explode(' ', $payload['name'], 2);\n           $payload['first_name'] = $parts[0];\n           $payload['last_name'] = $parts[1] ?? '';\n           unset($payload['name']);\n           return $payload;\n       }\n   }\n   ```",
      "   - **Versioned Events:** Yangi hodisa klassini yaratish (`UserRegisteredV2`), eski klass esa arxivda o'qish uchun qoldiriladi.",
      "   - Bazadagi ma'lumotlar o'zgarmaydi, yangi versiya esa barcha o'tmishdagi hodisalarni muammosiz qabul qiladi."
    ],
    "tip": "Event Sourcing da bazani to'g'ridan-to'g'ri UPDATE qilish qat'iyan man etilishi va faqat in-memory Upcasting orqali versiyalash to'g'ri arxitektura ekanligini ta'kidlang."
  },

  // --- Database va SQL (SENIOR) ---
  {
    "id": "iq-247",
    "title": "Database: Sharded muhitda Global Unique ID yaratish: Snowflake ID vs UUID v7 vs Auto-Increment va B-Tree indekslariga ta'siri?",
    "level": "senior",
    "category": "database",
    "categoryLabel": "Database va SQL",
    "skillSlug": "database-design",
    "subskillId": "14.3",
    "answer": [
      "Ma'lumotlar bir nechta mustaqil ma'lumotlar bazalariga (Sharding) bo'linganda an'anaviy `AUTO_INCREMENT` ishlamaydi (chunki har bir bazada ID 1 dan boshlanib to'qnashadi):",
      "",
      "1. **UUID v4 ning zarari (B-Tree Fragmentatsiyasi):**",
      "   - UUID v4 to'liq tasodifiy satr bo'lgani uchun, yangi yozuvlar InnoDB B-Tree sahifalarining ixtiyoriy joyiga tushadi. Bu sahifalarning doimiy yorilishiga (Page Splits), disk I/O ning 10 barobar oshishiga va keshning samarasiz bo'lishiga olib keladi.",
      "",
      "2. **UUID v7 (Zamonaviy standart):**",
      "   - Boshidagi 48 bit joriy Unix vaqt belgisini (Timestamp) saqlaydi, qolgan qismi tasodifiy bo'ladi.",
      "   - Natijada UUID v7 **vaqt bo'yicha saralangan (time-ordered)** bo'ladi va B-Tree indekslarining faqat eng oxiriga ketma-ket yoziladi (Page split yo'qoladi).",
      "",
      "3. **Snowflake ID (Twitter):**",
      "   - 64-bitli butun son (`BIGINT`): 41 bit vaqt, 10 bit mashina (Node ID), 12 bit ketma-ketlik hisoblagichi.",
      "   - Afzalligi: String emas, 8 baytlik son bo'lgani uchun xotirani UUID dan 2 barobar kam egallaydi va saralash o'ta tez ishlaydi."
    ],
    "tip": "UUID v4 o'rniga UUID v7 yoki Snowflake tanlanishi B-Tree indekslarida Page Splitlarning oldini olib, yozish tezligini saqlab qolishini tushuntiring."
  },

  // --- DevOps va Linux (SENIOR) ---
  {
    "id": "iq-248",
    "title": "DevOps: Kubernetes da PHP-FPM va Nginx Podlarini masshtablash: HPA (Horizontal Pod Autoscaler) ni Custom Metrics bo'yicha sozlash?",
    "level": "senior",
    "category": "devops",
    "categoryLabel": "DevOps va Linux",
    "skillSlug": "cloud-computing",
    "subskillId": "69.2",
    "answer": [
      "Standart HPA faqat CPU va Memory bo'yicha masshtablaydi. Ammo PHP-FPM da so'rovlar I/O-bound (baza yoki keshni kutish) bo'lsa, CPU 20% bo'lgan holda ham barcha `pm.max_children` band bo'lib, yangi so'rovlar navbatda qotib qolishi mumkin:",
      "",
      "1. **PHP-FPM Custom Metrikalari:**",
      "   - `php-fpm_status` dan `active processes` va `listen queue` ko'rsatkichlari Prometheus orqali yig'iladi.",
      "   - Agar `active processes >= 80%` yoki `listen queue > 0` bo'lsa, darhol yangi Podlar qo'shilishi kerak.",
      "",
      "2. **Navbatlar (Queue Workers) uchun KEDA:**",
      "   - Workerlarni CPU bo'yicha emas, Redis yoki RabbitMQ dagi kutilayotgan vazifalar soni bo'yicha masshtablash (masalan, navbatda har 500 ta job uchun bitta yangi worker pod yaratish).",
      "",
      "3. **Cool-down davri (Scale-down stabilization):**",
      "   - Podlarni tezda kamaytirib yubormaslik uchun `stabilizationWindowSeconds: 300` qo'yiladi (Flapping/Thrashing ning oldini oladi)."
    ],
    "tip": "PHP da faqat CPU bo'yicha emas, balki FPM active processes va queue lag bo'yicha autoscaling qilish eng to'g'ri production yondashuv ekanligini ayting."
  },

  // --- Database va SQL (SENIOR) ---
  {
    "id": "iq-249",
    "title": "Database: Tranzaksiyalarda Deadlocklarni kod darajasida oldini olish va DB::transaction retry mexanizmi?",
    "level": "senior",
    "category": "database",
    "categoryLabel": "Database va SQL",
    "skillSlug": "database-transactions",
    "subskillId": "17.3",
    "answer": [
      "Deadlock - bu ikki yoki undan ortiq tranzaksiyalar bir-biri band qilib turgan resurslarni qulfdan chiqishini o'zaro kutib, cheksiz to'xtab qolish holatidir (MySQL bittasini xato bilan o'ldiradi):",
      "",
      "1. **Asosiy sabab: Turli xil qulflash tartibi:**",
      "   - 1-Tranzaksiya: A foydalanuvchini qulfladi, keyin B ni so'radi.",
      "   - 2-Tranzaksiya: B foydalanuvchini qulfladi, keyin A ni so'radi. Natija: Deadlock!",
      "",
      "2. **Kod darajasida oldini olish (Deterministic Lock Ordering):**",
      "   - Qulflanadigan ID larni har doim oldindan **o'sish tartibida saralab olish** shart:",
      "   ```php\n   $userIds = [$fromId, $toId];\n   sort($userIds); // Har doim bir xil tartibda qulflanadi!\n   $users = User::whereIn('id', $userIds)->orderBy('id')->lockForUpdate()->get();\n   ```",
      "",
      "3. **Avtomatik qayta urinish (Retry):**",
      "   - Laravelda `DB::transaction()` metodi 2-argumentida Deadlock yuz berganda avtomatik necha marta qayta urinib ko'rishni qabul qiladi: `DB::transaction(function () { ... }, 5);` (5 marta urinadi)."
    ],
    "tip": "ID larni saralash (Lock Ordering) Deadlock larni 99% yo'qotishini va Laravelning DB::transaction($cb, 5) retry mexanizmini birgalikda ishlatish kerakligini ayting."
  },

  // --- Arxitektura (SENIOR) ---
  {
    "id": "iq-250",
    "title": "Architecture: High-Load tizimlarda Dual-Write muammosi: Transactional Outbox + Debezium (CDC) orqali Kesh va Elasticsearch ni 100% kogerent saqlash?",
    "level": "senior",
    "category": "architecture",
    "categoryLabel": "Arxitektura",
    "skillSlug": "software-architecture",
    "subskillId": "61.3",
    "answer": [
      "Kod ichida bir vaqtning o'zida DB ga yozish va ortidan darhol Redis yoki Elasticsearch ni yangilash (`Dual-Write`) muqarrar ma'lumotlar buzilishiga olib keladi:",
      "",
      "1. **Nega Dual-Write xato?**",
      "   - DB ga yozildi, lekin keshga yozish paytida tarmoq uzildi -> Kesh eski qoldi.",
      "   - Ikki parallel so'rov bir xil modelni yangilaganda: 1-so'rov DB ga yozdi, 2-so'rov DB ga yozdi, lekin keshga 1-so'rov keyinroq yetib bordi -> Keshda o'tmishdagi ma'lumot qotib qoldi.",
      "",
      "2. **Zamonaviy yechim: Transactional Outbox + CDC:**",
      "   - Dastur kodi faqat bitta tranzaksiya ichida ma'lumotni va `outbox_events` jadvaliga hodisani yozadi (Atomik, 100% kafolat).",
      "   - **Debezium (Change Data Capture - CDC):** Ma'lumotlar bazasining binlog (MySQL) yoki WAL (Postgres) jurnalini to'g'ridan-to'g'ri o'qiydi va har bir o'zgarishni Apache Kafka ga uzatadi.",
      "   - Alohida iste'molchilar Kafka dan o'qib, Redis keshini tozalaydi va Elasticsearch ga indekslaydi.",
      "",
      "3. **Natija:** Ilova kodi kesh va qidiruv tizimlari nosozligidan to'liq xoli bo'ladi, ma'lumotlar hech qachon yo'qolmaydi va nomutanosiblik (Inconsistency) 0 ga tushadi."
    ],
    "tip": "Bu System Design intervyularida eng yuqori darajadagi arxitektura savolidir: Dual-Write ni rad etib, Transactional Outbox + CDC (Debezium) yechimini ko'rsatish Senior/Lead bilimini namoyish qiladi."
  },
  {
    "id": "iq-251",
    "title": "Xatoni toping: quyidagi kod 100 ta post uchun nechta SQL so'rov yuboradi va uni qanday tuzatasiz?",
    "type": "bug",
    "level": "middle",
    "category": "laravel",
    "categoryLabel": "Laravel",
    "skillSlug": "eloquent-orm",
    "subskillId": "13.12",
    "code": "$posts = Post::all();\n\nforeach ($posts as $post) {\n    echo $post->author->name;\n}",
    "answer": [
      "**Muammo:** `Post::all()` 1 ta so'rov yuboradi, sikl ichida har bir post uchun `$post->author` lazy loading qilinadi, ya'ni yana 100 ta so'rov. Jami **101 ta so'rov** (N+1 muammosi).",
      "",
      "**Tuzatish:** relatsiyani oldindan (eager) yuklang:",
      "",
      "```php",
      "$posts = Post::with('author:id,name')->get(); // 2 ta so'rov",
      "```",
      "",
      "**Qo'shimcha:** `Model::preventLazyLoading(! app()->isProduction())` development da lazy loading ni exception qiladi, shuning uchun muammo production ga chiqmasdan topiladi. Faqat kerakli ustunlarni (`author:id,name`) olish xotirani ham tejaydi."
    ],
    "tip": "Javobda raqamni (101 dan 2 gacha) va `preventLazyLoading()` ni ayting: bu muammoni topibgina qolmay, qaytib kelmasligi uchun profilaktika ham qilishingizni ko'rsatadi."
  },
  {
    "id": "iq-252",
    "title": "Xatoni toping: ro'yxatdan o'tish endpointida qanday zaiflik bor va hujumchi undan qanday foydalanadi?",
    "type": "bug",
    "level": "middle",
    "category": "security",
    "categoryLabel": "Xavfsizlik",
    "skillSlug": "eloquent-orm",
    "subskillId": "13.3",
    "code": "class User extends Model\n{\n    protected $guarded = [];\n}\n\npublic function register(Request $request)\n{\n    $user = User::create($request->all());\n\n    return response()->json($user, 201);\n}",
    "answer": [
      "**Zaiflik: Mass Assignment.** `$guarded = []` barcha ustunlarni yozishga ochadi, `$request->all()` esa mijoz yuborgan hamma maydonni uzatadi. Hujumchi so'rovga `is_admin=1` yoki `role=admin` qo'shib yuborsa, admin hisob yaratiladi.",
      "",
      "**Tuzatish:**",
      "1. `$fillable` ga faqat ruxsat etilgan ustunlarni yozing (`name`, `email`, `password`).",
      "2. `$request->all()` o'rniga validatsiyadan o'tgan ma'lumotni uzating: `User::create($request->validated())` (Form Request).",
      "3. Himoyani qatlamlab qo'ying: `Model::shouldBeStrict()` begona maydon kelganda xatoni darhol ko'rsatadi.",
      "",
      "Rolni (admin) ro'yxatdan o'tish orqali emas, alohida, ruxsat tekshiriladigan joydan bering."
    ],
    "tip": "Faqat 'fillable ishlating' demang: `validated()` ni va rolni alohida boshqarish kerakligini ham ayting."
  },
  {
    "id": "iq-253",
    "title": "Xatoni toping: bu tranzaksiya production da qanday muammolarga olib keladi?",
    "type": "bug",
    "level": "senior",
    "category": "database",
    "categoryLabel": "Ma'lumotlar bazasi",
    "skillSlug": "database-transactions",
    "subskillId": "17.16",
    "code": "DB::transaction(function () use ($order) {\n    $order->update(['status' => 'paid']);\n\n    Http::post('https://sms.example.uz/send', ['text' => 'To\\'landi']);\n    Mail::to($order->user)->send(new OrderPaid($order));\n});",
    "answer": [
      "**Muammolar:**",
      "1. Tranzaksiya ichidagi sekin tashqi chaqiruv (SMS, email) qatorlar qulfini uzoq ushlab turadi: boshqa so'rovlar kutadi, `Lock wait timeout` va deadlock xavfi oshadi.",
      "2. SMS/email allaqachon ketgan bo'lib, tranzaksiya keyin rollback bo'lishi mumkin: mijozga 'to'landi' deyilgan, bazada esa 'to'lanmagan'.",
      "3. Deadlock sabab tranzaksiya qayta urinilsa, SMS ikki marta yuboriladi.",
      "",
      "**Tuzatish:** tashqi amallarni faqat commit dan keyin bajaring:",
      "",
      "```php",
      "DB::transaction(function () use ($order) {",
      "    $order->update(['status' => 'paid']);",
      "});",
      "",
      "OrderPaid::dispatch($order); // job yoki event, afterCommit bilan",
      "```",
      "",
      "Job klassiga `public $afterCommit = true;` qo'ying yoki `DB::afterCommit()` ishlating. Ishonchli yetkazish kerak bo'lsa **Transactional Outbox** naqshini qo'llang."
    ],
    "tip": "'Tranzaksiya qisqa bo'lsin' qoidasini va 'tashqi amal commit dan keyin' tamoyilini birga ayting; Outbox ni eslatish Senior darajasini ko'rsatadi."
  },
  {
    "id": "iq-254",
    "title": "Xatoni toping: yuzlab foydalanuvchi bir vaqtda like bosganda bu hisoblagich nega noto'g'ri sanaydi?",
    "type": "bug",
    "level": "middle",
    "category": "laravel",
    "categoryLabel": "Laravel",
    "skillSlug": "redis",
    "subskillId": "12.9",
    "code": "$likes = Cache::get('post:42:likes', 0);\n\nCache::put('post:42:likes', $likes + 1);",
    "answer": [
      "**Muammo: Race Condition (lost update).** O'qish va yozish ikki alohida amal. Ikki so'rov bir vaqtda `10` ni o'qisa, ikkalasi ham `11` yozadi va bitta like yo'qoladi.",
      "",
      "**Tuzatish:** amalni atomik qiling:",
      "",
      "```php",
      "Cache::increment('post:42:likes'); // Redis INCR, atomik",
      "```",
      "",
      "Murakkabroq holatlarda Redis Lua skripti yoki `Cache::lock()` (atomic lock) ishlating. Bazada esa `increment()` (`UPDATE ... SET likes = likes + 1`) yoki `lockForUpdate()` kerak.",
      "",
      "Qoida: 'o'qi, o'zgartir, yoz' ketma-ketligi bir nechta jarayon orasida hech qachon xavfsiz emas."
    ],
    "tip": "Atomik amal (INCR) bilan blokirovka (lock) o'rtasidagi farqni ayting: INCR eng oddiy va tez, lock murakkab mantiq uchun."
  },
  {
    "id": "iq-255",
    "title": "Production da sahifa kecha 300 ms da ochilardi, bugun 5 soniya. Qanday tekshirasiz?",
    "type": "scenario",
    "level": "middle",
    "category": "devops",
    "categoryLabel": "DevOps & Server",
    "skillSlug": "application-performance-optimization",
    "subskillId": "53.1",
    "answer": [
      "**Tizimli yondashuv: avval o'lchang, keyin taxmin qiling.**",
      "",
      "1. **Nima o'zgardi?** Oxirgi deploy, migratsiya, konfiguratsiya yoki trafik. Agar muammo deploy dan keyin boshlangan bo'lsa, birinchi qadam: rollback, sababni keyin qidirasiz.",
      "2. **Qayerda sekin?** APM/Telescope/Sentry da so'rov vaqtini bo'ling: PHP, baza, kesh, tashqi API.",
      "3. **Baza:** slow query log, `EXPLAIN`, yo'qolgan indeks, N+1, qulf kutish (lock wait), jadval hajmi o'sishi.",
      "4. **Kesh:** hit ratio tushganmi, Redis xotirasi to'lib kalitlar o'chib ketyaptimi, Cache Stampede bormi.",
      "5. **PHP-FPM:** `max_children` ga yetilganmi (so'rovlar navbatda kutadi), slow log.",
      "6. **Tashqi servislar:** to'lov/SMS API javob vaqti, timeout lar.",
      "7. **Resurslar:** CPU, RAM (swap), disk I/O, ulanishlar soni.",
      "",
      "Topilgach: tezkor yechim (indeks, kesh, rollback), keyin sababni yo'q qiladigan doimiy tuzatish va monitoring alert."
    ],
    "tip": "Intervyuchi tartibni baholaydi: 'o'zgarishni topish, o'lchash, bittadan gipoteza'. 'Darhol serverni kattalashtiraman' deyish zaif javob."
  },
  {
    "id": "iq-256",
    "title": "Bir kechada navbatda 200 000 ta job to'planib qoldi. Qanday harakat qilasiz?",
    "type": "scenario",
    "level": "senior",
    "category": "async",
    "categoryLabel": "Navbatlar & Async",
    "skillSlug": "queues-and-background-jobs",
    "subskillId": "46.5",
    "answer": [
      "1. **Sababni aniqlang:** workerlar to'xtaganmi (Supervisor), jobning o'zi sekinlashganmi (tashqi API, baza) yoki kiruvchi oqim keskin oshganmi?",
      "2. **Masshtablang:** worker sonini oshiring (Horizon `maxProcesses` yoki ko'proq server), muhim navbatni (`high`) alohida workerlarga ajrating, shunda muhim jobning kechikishi kamayadi.",
      "3. **Yo'lni to'smang:** tiqilib qolgan 'zaharli' jobni `failed_jobs` ga ajrating, `tries` va `backoff` ni to'g'rilang.",
      "4. **Idempotentlikni tekshiring:** ko'p workerda parallel ishlaganda job ikki marta bajarilsa ham tizim buzilmasligi kerak.",
      "5. **Keyin:** navbat uzunligi va kutish vaqti bo'yicha alert qo'ying, ortiqcha yuklanishda backpressure (rate limit, batch) o'ylang."
    ],
    "tip": "'Worker qo'shaman' dan tashqari, sababni topish, muhim navbatni ajratish va idempotentlikni eslatsangiz Senior javob bo'ladi."
  },
  {
    "id": "iq-257",
    "title": "Mijoz to'lovi ikki marta yechildi deb shikoyat qildi. Sabab nima bo'lishi mumkin va qanday oldini olasiz?",
    "type": "scenario",
    "level": "senior",
    "category": "architecture",
    "categoryLabel": "Arxitektura",
    "skillSlug": "api-design",
    "subskillId": "19.12",
    "answer": [
      "**Ehtimoliy sabablar:**",
      "- Tarmoq uzilishi sababli mijoz yoki to'lov shlyuzi so'rovni qayta yuborgan (retry), server esa ikkalasini ham bajargan.",
      "- Foydalanuvchi tugmani ikki marta bosgan (double submit).",
      "- Webhook ikki marta kelgan va ikkalasi alohida qayta ishlangan.",
      "- Queue job bajarilgach 'ACK' yo'qolib, job qayta bajarilgan (at-least-once delivery).",
      "",
      "**Oldini olish:**",
      "1. **Idempotency-Key:** mijoz har amal uchun UUID yuboradi, server natijani shu kalit bilan saqlaydi va takroriy so'rovga eski natijani qaytaradi.",
      "2. Bazada `unique` cheklov (masalan `order_id` + `type`): takroriy yozuvni baza o'zi rad etadi.",
      "3. Webhook va job larda `processed_events` jadvali orqali idempotent ishlov.",
      "4. Frontendda tugmani birinchi bosishdan keyin bloklash (qo'shimcha, asosiy himoya emas).",
      "",
      "**Hozirgi holatda:** dublikatni tasdiqlab, ortiqcha summani qaytaring (refund), loglardan (request ID, shlyuz tranzaksiya ID) tahlil qiling."
    ],
    "tip": "Asosiy himoya server tomonda (Idempotency-Key va unique constraint) ekanini ayting; frontend bloklash faqat qulaylik."
  },
  {
    "id": "iq-258",
    "title": "50 mln qatorli jadvalga yangi ustun qo'shib uni to'ldirish kerak, sayt esa to'xtamasligi shart. Qanday qilasiz?",
    "type": "scenario",
    "level": "senior",
    "category": "database",
    "categoryLabel": "Ma'lumotlar bazasi",
    "skillSlug": "database-optimization",
    "subskillId": "15.20",
    "answer": [
      "**Maqsad: uzoq qulfsiz va eski kod bilan mos kelmaydigan o'zgarishlarsiz.**",
      "",
      "1. **Expand, Migrate, Contract (kengaytirish, ko'chirish, tozalash)** naqshi:",
      "   - Avval ustunni `nullable` qo'shing; MySQL 8 va PostgreSQL da bu onlayn bajariladi. Katta jadvalda onlayn vositalar (`gh-ost`, `pt-online-schema-change`) ishlatiladi.",
      "   - Kodni ikki versiyaga mos qiling: yangi ustunga yozadi, eskisini ham o'qiy oladi.",
      "2. **Ma'lumotni bo'laklab to'ldiring (backfill):** `chunkById()` va queue job lar orqali, bo'laklar orasida kichik pauza; bitta katta `UPDATE` ishlatmang.",
      "3. Hamma qator to'lgach, `NOT NULL` yoki indeksni alohida, qisqa qulf bilan (`lock_timeout` belgilab) qo'shing.",
      "4. Eski ustunni keyingi release da o'chiring, kod unga endi tegmasligiga ishonch hosil qilgach.",
      "",
      "Har qadamni staging da real hajmga yaqin bazada sinang va replikatsiya kechikishini kuzatib boring."
    ],
    "tip": "'Bitta migratsiya, bitta deploy' emas: ketma-ket 2-3 release ekanini ayting. Backward-compatible kod asosiy kalit."
  },
  {
    "id": "iq-259",
    "title": "Jamoadagi junior dasturchi code review da bir xil xatolarni takrorlayveradi. Nima qilasiz?",
    "type": "behavioral",
    "level": "lead",
    "category": "architecture",
    "categoryLabel": "Arxitektura",
    "skillSlug": "mentoring",
    "subskillId": "83.5",
    "answer": [
      "**Avval sababni tushuning, keyin ta'sir qiling:**",
      "1. **Alohida suhbat (1:1):** ommaviy review da emas. Xatolar nimadan: bilim yetishmasligi, e'tiborsizlik yoki talablar noaniqligimi?",
      "2. **Tizimli yechim:** takrorlanadigan xatolarni linter, PHPStan va Pint qoidalariga hamda PR checklist ga aylantiring, shunda ularni odam emas, mashina topadi.",
      "3. **Fikr-mulohaza (feedback):** aniq misol bilan, 'nima, nega, qanday' tarzida; xatoni emas, kodni muhokama qiling.",
      "4. **O'rgatish:** pair programming, kichik topshiriqlar, review da savol ko'rinishidagi izohlar ('bu yerda N+1 bo'lmaydimi?').",
      "5. **Natijani kuzating:** 2-4 haftadan keyin yana ko'ring. O'zgarish bo'lmasa, kutishlarni aniq yozib, rejali o'sish rejasini tuzing.",
      "",
      "Maqsad: jamoa jarayonini yaxshilash, bitta odamni 'tuzatish' emas."
    ],
    "tip": "Behavioral savolda STAR (Vaziyat, Vazifa, Harakat, Natija) tuzilmasidan foydalaning va real misol keltiring."
  },
  {
    "id": "iq-260",
    "title": "Biznes muddatni 2 baravar qisqartirishni talab qilyapti, siz esa sifat pasayishini ko'ryapsiz. Qanday kelishasiz?",
    "type": "behavioral",
    "level": "lead",
    "category": "architecture",
    "categoryLabel": "Arxitektura",
    "skillSlug": "technical-decision-making",
    "subskillId": "82.14",
    "answer": [
      "**Pozitsiya: 'yo'q' demang, tanlovlarni ochiq ko'rsating.**",
      "1. **Maqsadni aniqlang:** muddat nimaga bog'liq (mijoz, aksiya, investor)? Haqiqiy cheklov nima?",
      "2. **Variantlarni raqam bilan ko'rsating:** (a) hajmni qisqartirish (MVP), (b) bosqichma-bosqich chiqarish, (c) to'liq hajm, lekin xavf va qarz bilan. Har birining narxi va xavfini yozing.",
      "3. **Texnik qarzni yashirmang:** qarz olinsa, uni to'lash vaqtini rejaga qo'shing (aniq task, aniq sprint).",
      "4. **Himoya chizig'i:** xavfsizlik, ma'lumot yaxlitligi va to'lov bilan bog'liq narsalarda kelishuv yo'q.",
      "5. **Hujjatlang:** qaror va uning sababini yozing (ADR).",
      "",
      "Natija: biznes qaror qabul qiladi, siz esa oqibatlarni oldindan bildirgan bo'lasiz."
    ],
    "tip": "'Tradeoff' so'zi va 'hajm, muddat, sifat' uchburchagi Lead darajasi kutadigan til."
  },
  {
    "id": "iq-261",
    "title": "O'z xatoingiz sabab production 20 daqiqa ishlamay qoldi. Nima qildingiz va undan keyin nimani o'zgartirdingiz?",
    "type": "behavioral",
    "level": "senior",
    "category": "devops",
    "categoryLabel": "DevOps & Server",
    "skillSlug": "high-availability",
    "subskillId": "68.17",
    "answer": [
      "**STAR formatida javob bering:**",
      "- **Vaziyat:** deploy yoki buyruq natijasida sayt ishlamay qoldi, mijozlarga ta'sir qildi.",
      "- **Vazifa:** xizmatni tezda tiklash va jamoani xabardor qilish.",
      "- **Harakat:** avval tiklash (rollback yoki revert), ayblamasdan jamoaga darhol xabar berish, status sahifasini yangilash. Tiklangach: vaqt jadvali (timeline) va ildiz sabab (root cause) tahlili.",
      "- **Natija:** blameless post-mortem: nima bo'ldi, nega tizim buni to'xtata olmadi, qanday qilib takrorlanmaydi.",
      "",
      "**O'zgartirilgan narsalar (misol):** deploy dan oldin avtomatik smoke test, migratsiyalar uchun staging tekshiruvi, tez rollback, muhim o'zgarishda ikkinchi ko'z (review), yaxshilangan alert lar.",
      "",
      "Muhimi: xatoni yashirmaslik, mas'uliyatni o'z zimmangizga olish va tizimli xulosa chiqarish."
    ],
    "tip": "Intervyuchi 'ayblanish' emas, 'o'rganish'ni tinglaydi. Aniq o'zgarishlarni (jarayon, avtomatlashtirish) ayting."
  }
];
