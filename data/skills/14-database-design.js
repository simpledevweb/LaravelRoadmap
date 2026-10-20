/* 14 · Database Design
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 14,
  slug: "database-design",
  title: "Database Design",
  group: "database",
  description: "Ma'lumotlar bazasini loyihalash — ilovaning eng uzoq yashaydigan qismi: kod qayta yoziladi, lekin sxema va ma'lumot yillar davomida qoladi. Yaxshi dizayn yaxlitlikni DB darajasida kafolatlaydi, so'rovlarni sodda qiladi va o'zgarishlarga moslashadi. Senior dasturchi normallashtirish va denormalizatsiya, multi-tenancy, vaqt zonalari va xavfsiz migratsiyalar bo'yicha asosli qaror qabul qiladi.",
  subskills: [
    {
      id: "14.1",
      title: "Entity-Relationship Modeling",
      description: [
        "ER modellashtirish — domenni entity'lar, atributlar va ular orasidagi munosabatlar (kardinallik: 1:1, 1:N, M:N; majburiylik) sifatida tasvirlash. Kontseptual model → mantiqiy model (jadvallar, kalitlar) → fizik model (tiplar, indekslar).",
        "",
        "Jarayon: biznes bilan suhbat orqali otlar (entity) va fe'llarni (munosabat) aniqlash, chegaraviy holatlarni so'rash (\"buyurtma mijozsiz bo'lishi mumkinmi?\"), ER diagrammasini chizish (dbdiagram.io, Mermaid `erDiagram`). Diagramma — jamoa uchun umumiy til.",
        "",
        "```text",
        "erDiagram",
        "  CUSTOMER ||--o{ ORDER : places",
        "  ORDER ||--|{ ORDER_ITEM : contains",
        "  PRODUCT ||--o{ ORDER_ITEM : \"ordered in\"",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Kichik onlayn do'kon uchun ER diagramma chizing va har bir munosabatning kardinalligini asoslang.",
      acceptanceCriteria: [
        "Kardinallik va majburiylikni aniqlay oladi",
        "Kontseptual, mantiqiy va fizik model farqini biladi"
      ],
      prerequisites: []
    },
    {
      id: "14.2",
      title: "Entities va Attributes",
      description: [
        "Entity — mustaqil identifikatsiyaga ega domen obyekti (Mijoz, Buyurtma); atribut — uning xususiyati. Atribut turlari: oddiy va tarkibiy (manzil → shahar, ko'cha), bir va ko'p qiymatli (telefonlar — alohida jadval), hosila (yosh tug'ilgan sanadan — odatda saqlanmaydi).",
        "",
        "Qarorlar: atribut alohida entity bo'lishi kerakmi (o'z hayot davri, munosabatlari bormi?), value object sifatida bir nechta ustunmi yoki JSON'mi. Har bir atribut uchun: tip, majburiylik, default, unikallik, o'zgaruvchanlik.",
        "",
        "```text",
        "customers: id, full_name, birth_date, created_at",
        "customer_phones: id, customer_id, phone, is_primary",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Domeningizdagi 3 ta entity uchun atributlar jadvalini (tip, null, unique, manba) tuzing.",
      acceptanceCriteria: [
        "Ko'p qiymatli atributni alohida jadvalga ajratadi",
        "Hosila atributni saqlash yoki hisoblashni asoslay oladi"
      ],
      prerequisites: [
        "14.1"
      ]
    },
    {
      id: "14.3",
      title: "Primary va Foreign Keys",
      description: [
        "PK tanlovi: **surrogat** kalit (auto-increment `BIGINT`, UUID/ULID) — biznesdan mustaqil, o'zgarmas; **tabiiy** kalit (INN, email) — biznes ma'noga ega, lekin o'zgarishi va formati xavfli. Odatiy amaliyot — surrogat PK + tabiiy kalitga unique constraint.",
        "",
        "UUID/ULID: taqsimlangan generatsiya, URL'da id'ni taxmin qilib bo'lmaydi; ULID/UUIDv7 vaqt bo'yicha tartiblangan — indeks uchun yaxshi. Ommaviy API'da ketma-ket id'ni ochish ba'zan biznes ma'lumotni oshkor qiladi. FK — har bir munosabat uchun, mos tip va indeks bilan.",
        "",
        "```php",
        "$table->ulid('id')->primary();",
        "$table->string('inn', 9)->unique();",
        "$table->foreignUlid('company_id')->constrained();",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Ommaviy API'li entity uchun PK turini (bigint, UUIDv4, ULID) tanlab, foyda va kamchiliklarini yozing.",
      acceptanceCriteria: [
        "Surrogat va tabiiy kalit farqini biladi",
        "UUID turlarining indeksga ta'sirini tushunadi"
      ],
      prerequisites: [
        "9.12"
      ]
    },
    {
      id: "14.4",
      title: "One-to-One, One-to-Many, Many-to-Many",
      description: [
        "- **1:1** — FK + `UNIQUE` (`profiles.user_id unique`). Ko'pincha ixtiyoriy yoki kam ishlatiladigan ma'lumotni ajratish uchun; aks holda bitta jadval sodda.",
        "- **1:N** — \"ko'p\" tomonida FK (`orders.customer_id`).",
        "- **M:N** — oraliq (junction) jadval ikki FK bilan va ularga composite PK yoki unique.",
        "",
        "FK qaysi jadvalda ekanligi va `NULL` bo'lishi mumkinligi biznes qoidani ifodalaydi (\"buyurtmada mijoz majburiy\"). Munosabatda o'z atributlari bo'lsa (sana, rol, miqdor), oraliq jadval to'liq entity'ga aylanadi.",
        "",
        "```php",
        "Schema::create('course_student', function (Blueprint $t) {",
        "    $t->foreignId('course_id')->constrained()->cascadeOnDelete();",
        "    $t->foreignId('student_id')->constrained()->cascadeOnDelete();",
        "    $t->timestamp('enrolled_at');",
        "    $t->primary(['course_id', 'student_id']);",
        "});",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Kurs–talaba M:N munosabatini baho va ro'yxatdan o'tish sanasi bilan modellashtiring.",
      acceptanceCriteria: [
        "Har bir munosabat turini to'g'ri jadval tuzilmasiga aylantiradi",
        "1:1 ni ajratish zaruratini asoslay oladi"
      ],
      prerequisites: [
        "14.3"
      ]
    },
    {
      id: "14.5",
      title: "Normalization: 1NF, 2NF, 3NF",
      description: [
        "Normallashtirish — takrorlanish va anomaliyalarni (insert, update, delete) yo'qotish:",
        "- **1NF** — atomik qiymatlar, takrorlanuvchi guruhlar yo'q (`tags = \"a,b,c\"` ❌).",
        "- **2NF** — 1NF + har bir kalit bo'lmagan atribut **butun** composite kalitga bog'liq (qisman bog'liqlik yo'q).",
        "- **3NF** — 2NF + tranzitiv bog'liqlik yo'q (`orders.customer_city` mijozga bog'liq — `customers` jadvaliga tegishli).",
        "",
        "BCNF — 3NF ning qat'iyroq shakli. OLTP tizimlar odatda 3NF dan boshlanadi; denormalizatsiya keyin, o'lchov asosida.",
        "",
        "```text",
        "❌ orders(id, customer_name, customer_phone, product_list)",
        "✅ customers(id, name, phone) · orders(id, customer_id) · order_items(order_id, product_id, qty)",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Denormalizatsiyalangan Excel jadvalini 3NF sxemaga aylantiring va har bir qadamni izohlang.",
      acceptanceCriteria: [
        "1NF, 2NF, 3NF buzilishlarini misolda ko'rsata oladi",
        "Anomaliya turlarini tushuntira oladi"
      ],
      prerequisites: [
        "14.2"
      ]
    },
    {
      id: "14.6",
      title: "Denormalization",
      description: [
        "Denormalizatsiya — o'qish tezligi uchun ataylab ma'lumotni takrorlash: hisoblagich ustunlar (`posts.comments_count`), hosila qiymatlar (`orders.total`), tarixiy \"snapshot\"lar (buyurtma vaqtidagi narx va manzil — bu aslida biznes talab!), hisobot jadvallari, JSON keshlar.",
        "",
        "Narxi: yangilanishda izchillikni ta'minlash (tranzaksiya, event, trigger), ma'lumot nomuvofiqligi xavfi, ko'proq joy. Faqat o'lchangan muammo uchun, va izchillik mexanizmi + qayta hisoblash buyrug'i bilan.",
        "",
        "```php",
        "// Snapshot: narx o'zgarsa ham buyurtma tarixi to'g'ri qoladi",
        "$order->items()->create(['product_id' => $p->id, 'unit_price' => $p->price, 'qty' => 2]);",
        "// Hisoblagich",
        "$post->increment('comments_count');",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Sekin `COUNT` so'rovini hisoblagich ustun bilan almashtiring va uni qayta hisoblaydigan artisan buyruq yozing.",
      acceptanceCriteria: [
        "Denormalizatsiya va tarixiy snapshot farqini biladi",
        "Izchillikni saqlash mexanizmini rejalashtiradi"
      ],
      prerequisites: [
        "14.5"
      ]
    },
    {
      id: "14.7",
      title: "Junction Tables",
      description: [
        "Junction (pivot) jadval M:N munosabatni ikki 1:N ga aylantiradi. Tuzilma: ikki FK, composite PK yoki unique (dublikat bog'lanishlarning oldini olish), ikkinchi yo'nalish uchun teskari indeks (`(b_id, a_id)`).",
        "",
        "Munosabatning o'z atributlari bo'lsa (rol, miqdor, sana) — jadval mustaqil entity bo'ladi, ba'zan o'z `id` si bilan. Laravel nomlash konvensiyasi: ikki modelning birlik nomlari alifbo tartibida (`role_user`); custom pivot model `using()`.",
        "",
        "```php",
        "$t->primary(['role_id', 'user_id']);",
        "$t->index(['user_id', 'role_id']);   // teskari yo'nalishdagi so'rovlar uchun",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Pivot jadvalda dublikat yozuvlarni topib tozalang va constraint qo'shib takrorlanishini taqiqlang.",
      acceptanceCriteria: [
        "Composite PK va teskari indeks zaruratini biladi",
        "Pivot qachon entity'ga aylanishini aniqlaydi"
      ],
      prerequisites: [
        "14.4"
      ]
    },
    {
      id: "14.8",
      title: "Unique Constraints",
      description: [
        "Unique constraint biznes qoidani (\"bir kompaniyada email takrorlanmaydi\") DB darajasida kafolatlaydi va race condition'lardan himoya qiladi. Composite unique (`(company_id, email)`), partial/filtered unique (PostgreSQL `WHERE deleted_at IS NULL`), case-insensitive unique (`lower(email)` yoki collation).",
        "",
        "Ilova darajasida `Rule::unique` faqat foydalanuvchiga chiroyli xabar uchun; haqiqiy kafolat — constraint. Buzilishni `UniqueConstraintViolationException` orqali ushlab, tushunarli javob qaytaring.",
        "",
        "```php",
        "$table->unique(['company_id', 'email']);",
        "",
        "try {",
        "    $user = User::create($data);",
        "} catch (UniqueConstraintViolationException) {",
        "    throw ValidationException::withMessages(['email' => 'Bu email band']);",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Biznes qoidalardagi barcha \"takrorlanmasin\" talablarini constraint bilan ta'minlang.",
      acceptanceCriteria: [
        "Unique constraint'ni race condition himoyasi sifatida tushunadi",
        "Composite va partial unique'ni ishlata oladi"
      ],
      prerequisites: [
        "9.13"
      ]
    },
    {
      id: "14.9",
      title: "Referential Integrity",
      description: [
        "Referensial yaxlitlik — har bir FK mavjud yozuvga ishora qiladi, \"yetim\" yozuvlar yo'q. Ta'minlash: FK constraint'lar va to'g'ri `ON DELETE` siyosati — `RESTRICT` (bog'liq yozuv bo'lsa o'chirishni taqiqlash — moliyaviy ma'lumot), `CASCADE` (composition — buyurtma qatorlari), `SET NULL` (ixtiyoriy bog'lanish).",
        "",
        "FK'siz holatlar (polymorphic relation, mikroservislar, juda katta jadvallar) — yaxlitlik ilova va fon tekshiruvlari zimmasida. Yetim yozuvlarni topuvchi muntazam so'rovlar foydali.",
        "",
        "```sql",
        "-- Yetim buyurtma qatorlarini topish",
        "SELECT oi.id FROM order_items oi",
        "LEFT JOIN orders o ON o.id = oi.order_id",
        "WHERE o.id IS NULL;",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Loyihadagi yetim yozuvlarni topuvchi buyruq yozing, tozalang va yetishmayotgan FK'larni qo'shing.",
      acceptanceCriteria: [
        "`ON DELETE` siyosatini biznes ma'noga qarab tanlaydi",
        "FK'siz yaxlitlikni ta'minlash usullarini biladi"
      ],
      prerequisites: [
        "9.12"
      ]
    },
    {
      id: "14.10",
      title: "Nullable va Default Values",
      description: [
        "`NULL` \"noma'lum/qo'llanmaydi\" degani; ustunni nullable qilish — ongli qaror. Ortiqcha nullable ustunlar: har joyda `null` tekshiruvi, uch qiymatli mantiq xatolari, sezilmagan bo'sh ma'lumot. Qoida: imkon qadar `NOT NULL` + mazmunli default.",
        "",
        "Default'lar: boolean — `false`, hisoblagich — `0`, status — boshlang'ich holat. Ehtiyot: `''` va `NULL` ni aralashtirmaslik, `NULL` ning ma'nosini hujjatlashtirish (`paid_at NULL` = to'lanmagan). Katta jadvalga `NOT NULL` ustun qo'shish — default bilan (zamonaviy DB'larda tez, metadata o'zgarishi).",
        "",
        "```php",
        "$table->boolean('is_active')->default(true);",
        "$table->unsignedInteger('views')->default(0);",
        "$table->timestamp('paid_at')->nullable(); // NULL = to'lanmagan",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Jadvallarni audit qiling: keraksiz nullable ustunlarni default bilan `NOT NULL` ga o'tkazing.",
      acceptanceCriteria: [
        "Nullable qarorini ongli qabul qiladi",
        "`NULL` ma'nosini hujjatlashtiradi"
      ],
      prerequisites: [
        "9.10"
      ]
    },
    {
      id: "14.11",
      title: "Data Types tanlash",
      description: [
        "To'g'ri tip — yaxlitlik, joy va tezlik. Qoidalar: pul — `DECIMAL`/integer tiyin; id va FK — bir xil tip (`BIGINT UNSIGNED`); boolean — `BOOLEAN`/`TINYINT(1)`; vaqt — `TIMESTAMP`/`timestamptz` (UTC); faqat sana — `DATE`; IP — PostgreSQL `inet`; telefon/INN — string (oldingi nollar!); status — kichik string yoki enum.",
        "",
        "Haddan tashqari katta tiplar (`TEXT` hamma joyda, `BIGINT` kichik ma'lumotnoma uchun) indeks va xotirani shishiradi; juda kichik tip esa kelajakda overflow beradi (`INT` auto-increment 2.1 mlrd).",
        "",
        "```php",
        "$table->decimal('price', 12, 2);",
        "$table->string('phone', 20);   // \"+998...\" — son emas",
        "$table->char('currency', 3);",
        "$table->date('birth_date');",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Mavjud sxemadagi 5 ta noto'g'ri tipni topib, xavfsiz migratsiya bilan tuzating.",
      acceptanceCriteria: [
        "Ma'lumot turiga mos tipni tanlaydi",
        "Telefon/INN nega string ekanini tushuntira oladi"
      ],
      prerequisites: [
        "10.3"
      ]
    },
    {
      id: "14.12",
      title: "Timestamps va Time Zones",
      description: [
        "Asosiy qoida: vaqtni **UTC** da saqlang, foydalanuvchiga uning vaqt zonasida ko'rsating. Laravel: `config/app.php` `timezone => 'UTC'`, DB ulanishi ham UTC; foydalanuvchi zonasi profil yoki brauzerdan.",
        "",
        "Nozikliklar: \"faqat sana\" (tug'ilgan kun) — `DATE`, zonasiz; kelajakdagi tadbirlar (masalan, \"har kuni 09:00 Toshkent vaqtida\") — mahalliy vaqt + zona nomini saqlash (zona qoidalari o'zgarishi mumkin); MySQL `TIMESTAMP` 2038 chegarasi; PostgreSQL'da doim `timestamptz`. Kun chegarasi bo'yicha hisobot — foydalanuvchi zonasida hisoblash.",
        "",
        "```php",
        "$order->created_at->setTimezone($user->timezone)->format('d.m.Y H:i');",
        "Order::whereBetween('created_at', [",
        "    now($tz)->startOfDay()->utc(), now($tz)->endOfDay()->utc(),",
        "]);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "\"Bugungi buyurtmalar\" hisobotini foydalanuvchi vaqt zonasi bo'yicha to'g'ri hisoblang va testlang.",
      acceptanceCriteria: [
        "UTC'da saqlash tamoyiliga amal qiladi",
        "Sana va vaqt-nuqta farqini biladi"
      ],
      prerequisites: [
        "14.11"
      ]
    },
    {
      id: "14.13",
      title: "Soft Delete Design",
      description: [
        "Soft delete (`deleted_at`) — tiklash, audit va bog'liq ma'lumotni saqlash uchun. Dizayn savollari: unique constraint'lar (partial indeks yoki `deleted_at` ni unique'ga qo'shish), bog'liq yozuvlar (kaskad soft delete — ilova darajasida), so'rovlarda unutib qo'yish xavfi (global scope yordam beradi, lekin raw SQL'da yo'q), jadval o'sishi (pruning).",
        "",
        "Muqobillar: arxiv jadvaliga ko'chirish (asosiy jadval toza qoladi), status ustuni (`archived`), event sourcing. Shaxsiy ma'lumot uchun huquqiy talablar haqiqiy o'chirish yoki anonimlashtirishni talab qilishi mumkin.",
        "",
        "```sql",
        "-- PostgreSQL: o'chirilmaganlar orasida unique",
        "CREATE UNIQUE INDEX users_email_live ON users (email) WHERE deleted_at IS NULL;",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Soft delete va arxiv jadvali yondashuvlarini solishtirib, katta jadval uchun tanlov qiling.",
      acceptanceCriteria: [
        "Soft delete'ning unique va hajm muammolarini hal qiladi",
        "Muqobil yondashuvlarni biladi"
      ],
      prerequisites: [
        "13.17"
      ]
    },
    {
      id: "14.14",
      title: "Audit Fields",
      description: [
        "Audit maydonlari — kim va qachon: `created_at`, `updated_at`, `created_by`, `updated_by`, `deleted_by`. To'liq tarix kerak bo'lsa — alohida audit/log jadvali (eski va yangi qiymatlar, kim, qachon, IP): `owen-it/laravel-auditing`, `spatie/laravel-activitylog` yoki DB trigger'lari.",
        "",
        "Dizayn: audit jadvali faqat qo'shiladigan (append-only), asosiy jadval bilan bir tranzaksiyada yoziladi, sezgir maydonlar (parol) yozilmaydi, hajm katta — partitioning va saqlash muddati. Moliyaviy tizimlarda audit — majburiy talab.",
        "",
        "```php",
        "$table->foreignId('created_by')->nullable()->constrained('users');",
        "$table->foreignId('updated_by')->nullable()->constrained('users');",
        "",
        "static::updating(fn (Model $m) => $m->updated_by = auth()->id());",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Moliyaviy jadval uchun o'zgarishlar tarixini (old/new qiymatlar) saqlovchi audit tizimini qo'shing.",
      acceptanceCriteria: [
        "Audit maydonlari va to'liq audit log farqini biladi",
        "Audit ma'lumotining saqlash siyosatini o'ylaydi"
      ],
      prerequisites: [
        "14.2"
      ]
    },
    {
      id: "14.15",
      title: "Multi-Tenant Database Design",
      description: [
        "Uch asosiy model:",
        "1. **Umumiy jadval + `tenant_id`** — sodda, arzon, oson masshtablash; izolyatsiya ilova darajasida (global scope, composite indekslar `(tenant_id, ...)`, PostgreSQL Row-Level Security).",
        "2. **Schema-per-tenant** — yaxshiroq izolyatsiya; migratsiya va ko'p schema boshqaruvi og'irroq.",
        "3. **Database-per-tenant** — maksimal izolyatsiya, alohida backup/restore, \"shovqinli qo'shni\" yo'q; qimmat, ulanishlar va migratsiya murakkab.",
        "",
        "Tanlov: tenantlar soni, izolyatsiya va compliance talablari, tenantlar o'lchami farqi. `stancl/tenancy`, `spatie/laravel-multitenancy` paketlari.",
        "",
        "```sql",
        "-- PostgreSQL RLS: DB darajasida himoya",
        "ALTER TABLE orders ENABLE ROW LEVEL SECURITY;",
        "CREATE POLICY tenant_isolation ON orders USING (tenant_id = current_setting('app.tenant_id')::bigint);",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "SaaS uchun multi-tenancy modelini tanlab asoslang va tenant izolyatsiyasini testlar bilan isbotlang.",
      acceptanceCriteria: [
        "Uch modelning narx va izolyatsiya murosasini biladi",
        "Tenant ma'lumoti sizib chiqishining oldini olish usullarini qo'llaydi"
      ],
      prerequisites: [
        "13.14"
      ]
    },
    {
      id: "14.16",
      title: "Schema Evolution",
      description: [
        "Sxema doim o'zgaradi: yangi ustunlar, jadval bo'linishi, tip o'zgarishi. Migratsiyalar — sxema tarixining versiyalangan kodi: har bir o'zgarish alohida, qayta bajariladigan, CI'da sinaladigan fayl. Bajarilgan migratsiyani tahrirlamang — yangisini yozing.",
        "",
        "Katta loyihalarda: `schema:dump` (eski migratsiyalarni bitta SQL'ga siqish), migratsiyalarni deploy jarayonining alohida bosqichi sifatida, ma'lumot migratsiyalarini sxema migratsiyalaridan ajratish (katta data backfill — job/buyruq orqali, bo'laklab).",
        "",
        "```bash",
        "php artisan make:migration add_phone_to_customers_table",
        "php artisan migrate --pretend   # qanday SQL bajarilishini ko'rish",
        "php artisan schema:dump --prune",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ma'lumot backfill talab qiladigan o'zgarishni sxema migratsiyasi + alohida bo'laklab ishlaydigan buyruq sifatida amalga oshiring.",
      acceptanceCriteria: [
        "Bajarilgan migratsiyani tahrirlamaslik qoidasini biladi",
        "Sxema va ma'lumot migratsiyasini ajratadi"
      ],
      prerequisites: [
        "14.17"
      ]
    },
    {
      id: "14.17",
      title: "Backward-Compatible Migrations",
      description: [
        "Zero-downtime deploy'da eski va yangi kod bir vaqtda ishlaydi — migratsiya ikkalasi bilan mos bo'lishi kerak. **Expand → migrate → contract** pattern'i:",
        "1. **Expand**: yangi ustun/jadval qo'shish (nullable yoki default bilan), eski kod buzilmaydi.",
        "2. **Migrate**: kod ikkala joyga yozadi, ma'lumot backfill qilinadi, o'qish yangi joyga o'tadi.",
        "3. **Contract**: keyingi deploy'da eski ustunni olib tashlash.",
        "",
        "Xavfli amallar: ustunni qayta nomlash yoki o'chirish (eski kod sinadi), `NOT NULL` ni default'siz qo'shish, katta jadvalda lock oluvchi `ALTER` (MySQL `ALGORITHM=INPLACE`, gh-ost/pt-osc; PostgreSQL `CONCURRENTLY`).",
        "",
        "```text",
        "Deploy 1: add column full_name (nullable) + kod ikkalasiga yozadi",
        "Job:      backfill full_name",
        "Deploy 2: kod faqat full_name'dan o'qiydi",
        "Deploy 3: drop columns first_name, last_name",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Ustunni qayta nomlashni expand/contract usulida uchta deploy'ga bo'lib bajaring.",
      acceptanceCriteria: [
        "Expand/contract bosqichlarini tushuntira oladi",
        "Lock oluvchi DDL xavfini biladi va oldini oladi"
      ],
      prerequisites: [
        "14.16",
        "43.15"
      ]
    },
    {
      id: "14.18",
      title: "Data Integrity",
      description: [
        "Ma'lumot yaxlitligi qatlamlari: **domen** (tip, `CHECK`, `NOT NULL`, enum), **entity** (PK, unique), **referensial** (FK), **biznes qoidalar** (tranzaksiya, lock, ilova validatsiyasi). Eng ishonchli himoya — DB constraint, chunki u har qanday yozish yo'lini qamraydi.",
        "",
        "Qo'shimcha: tranzaksiyalar (qisman yozilgan ma'lumot yo'q), idempotentlik (dublikat so'rovlar), muntazam izchillik tekshiruvlari (hisob-kitob moslashtirish — balanslar yig'indisi), backup'ni tekshirish.",
        "",
        "```sql",
        "ALTER TABLE accounts ADD CONSTRAINT balance_non_negative CHECK (balance >= 0);",
        "-- Kunlik moslashtirish",
        "SELECT account_id FROM ledger GROUP BY account_id",
        "HAVING SUM(amount) <> (SELECT balance FROM accounts a WHERE a.id = ledger.account_id);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Moliyaviy modul uchun yaxlitlik qoidalarini qatlamlar bo'yicha yozing va kunlik moslashtirish tekshiruvini qo'shing.",
      acceptanceCriteria: [
        "Yaxlitlikning to'rt qatlamini biladi",
        "Constraint'ni ilova validatsiyasidan ustun qo'yadi"
      ],
      prerequisites: [
        "9.11",
        "14.9"
      ]
    },
    {
      id: "14.19",
      title: "Database Naming Conventions",
      description: [
        "Izchil nomlash — o'qiluvchanlik va kamroq xato. Laravel konvensiyasi: jadvallar — ko'plik `snake_case` (`order_items`), ustunlar — `snake_case`, FK — `{birlik}_id` (`customer_id`), pivot — alifbo tartibida birliklar (`role_user`), boolean — `is_`/`has_` prefiksi, vaqt — `_at` suffiksi (`paid_at`), sana — `_on`/`_date`.",
        "",
        "Indeks va constraint nomlari tushunarli bo'lsin (Laravel avtomatik: `orders_customer_id_foreign`). Rezervlangan so'zlardan (`order`, `user`, `group`) ustun nomi sifatida qoching; qisqartmalardan qoching.",
        "",
        "```text",
        "✅ orders.customer_id, orders.paid_at, users.is_active",
        "❌ tblOrder.CustID, orders.flag1, user.date",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Jamoa uchun DB nomlash qoidalarini yozing va mavjud sxemadagi buzilishlarni ro'yxatlang.",
      acceptanceCriteria: [
        "Laravel nomlash konvensiyalarini biladi",
        "Rezervlangan so'zlar muammosini tushunadi"
      ],
      prerequisites: [
        "6.1"
      ]
    }
  ]
});
