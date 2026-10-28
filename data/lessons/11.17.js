/* Chuqur dars: 11.17. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("11.17", {
  "lesson": [
    "### View va Materialized View",
    "Oddiy **view** — saqlangan so'rov. Har murojaatda qaytadan bajariladi, ma'lumot doim yangi, lekin tezlik asl so'rovnikidek. **Materialized view (MV)** esa so'rov natijasini diskda jadval kabi saqlaydi. O'qish juda tez va indeks qo'yish mumkin, lekin ma'lumot oxirgi yangilanish paytidagi holatda qoladi.",
    "",
    "### Qachon kerak",
    "- Og'ir agregatlar: kunlik savdo, oylik KPI, dashboard'lar.",
    "- Ko'p jadvalli JOIN natijasini tez-tez o'qish.",
    "- Bir necha daqiqa yoki soat eskirgan ma'lumot qabul qilinadigan hisobotlar.",
    "",
    "Mos emas: real-vaqt balans, ombor qoldig'i, foydalanuvchi o'z amali natijasini darhol ko'rishi kerak bo'lgan joylar.",
    "",
    "### Yangilash",
    "- `REFRESH MATERIALIZED VIEW mv`: so'rovni to'liq qayta bajaradi va natijani almashtiradi. Bu vaqtda MV'ni o'qish **bloklanadi** (`ACCESS EXCLUSIVE`).",
    "- `REFRESH MATERIALIZED VIEW CONCURRENTLY mv`: yangi natijani alohida hisoblaydi, eski bilan solishtiradi va faqat farqni qo'llaydi. O'qish bloklanmaydi. Talab: MV'da **unique indeks** bo'lishi kerak (barcha qatorlarni qamraydigan, `WHERE` siz). Odatda sekinroq, chunki diff hisoblanadi.",
    "",
    "Ikkala usul ham **inkremental emas**: butun so'rov qayta bajariladi. Agar so'rov 10 daqiqa ishlasa, refresh ham 10 daqiqa. Bir vaqtda ikkita refresh ishlamaydi, ikkinchisi kutadi.",
    "",
    "### Strategiyalar",
    "1. **Jadval bo'yicha:** Laravel scheduler bilan har N daqiqada. `withoutOverlapping()` qo'shing.",
    "2. **Voqea bo'yicha:** katta import tugaganda job dispatch qilish.",
    "3. **Inkremental alternativa:** summary jadval (`daily_sales`) va upsert. Har buyurtmada yoki har daqiqada faqat o'zgargan kun qayta hisoblanadi: `INSERT ... ON CONFLICT (day) DO UPDATE`. MV'dan murakkabroq, lekin katta hajmda ancha arzon.",
    "",
    "### Boshqa jihatlar",
    "- MV'ga oddiy jadval kabi indekslar qo'yiladi.",
    "- Asosiy jadval sxemasi o'zgarsa, MV'ni `DROP` va qayta `CREATE` qilish kerak bo'lishi mumkin.",
    "- `CREATE MATERIALIZED VIEW ... WITH NO DATA` darhol to'ldirmaydi. Birinchi `REFRESH` gacha o'qish xato beradi.",
    "",
    "### Laravel'da",
    "MV'ni migratsiyada `DB::statement` bilan yarating. Uni faqat o'qiladigan Eloquent model qilib ishlating: `protected $table = 'sales_daily'`, `save()` ni taqiqlang. Refresh'ni artisan buyrug'i yoki job orqali bajaring."
  ],
  "examples": [
    {
      "title": "MV yaratish va concurrent refresh",
      "lang": "sql",
      "code": [
        "CREATE MATERIALIZED VIEW sales_daily AS",
        "SELECT date_trunc('day', created_at)::date AS day,",
        "       count(*) AS orders,",
        "       sum(total) AS revenue",
        "FROM orders",
        "WHERE status = 'paid'",
        "GROUP BY 1;",
        "",
        "CREATE UNIQUE INDEX sales_daily_day ON sales_daily (day);",
        "",
        "REFRESH MATERIALIZED VIEW CONCURRENTLY sales_daily;"
      ]
    },
    {
      "title": "Laravel: read-only model va scheduler",
      "lang": "php",
      "code": [
        "class SalesDaily extends Model",
        "{",
        "    protected $table = 'sales_daily';",
        "    public $timestamps = false;",
        "    protected $primaryKey = 'day';",
        "",
        "    protected static function booted(): void",
        "    {",
        "        static::saving(fn () => throw new LogicException('Read-only view'));",
        "    }",
        "}",
        "",
        "// routes/console.php",
        "Schedule::call(fn () => DB::statement('REFRESH MATERIALIZED VIEW CONCURRENTLY sales_daily'))",
        "    ->everyFifteenMinutes()",
        "    ->name('refresh-sales-daily')",
        "    ->withoutOverlapping();"
      ]
    }
  ],
  "pitfalls": [
    "`CONCURRENTLY` siz refresh qilish: dashboard refresh davomida qotib qoladi.",
    "Unique indeks qo'ymasdan `CONCURRENTLY` ishlatish: `cannot refresh materialized view concurrently` xatosi.",
    "MV'ni real-vaqt ma'lumot deb ko'rsatish: foydalanuvchi to'lov qilib, hisobotda ko'rmaydi.",
    "Juda og'ir MV'ni tez-tez refresh qilish: refreshlar bir-biriga ulanib, DB doimiy yuklanadi. Summary jadval va inkremental yangilashni ko'rib chiqing."
  ]
});
