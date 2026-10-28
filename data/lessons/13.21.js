/* Chuqur dars: 13.21. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("13.21", {
  "lesson": [
    "### Qachon raw SQL kerak",
    "Eloquent va query builder ko'p narsani qamraydi, lekin ba'zan to'g'ridan-to'g'ri SQL zarur:",
    "- DB'ga xos imkoniyatlar: window funksiyalar, CTE, `DISTINCT ON`, `jsonb` operatorlari, `ON CONFLICT` ning murakkab shakllari, full-text.",
    "- Murakkab hisobot so'rovlari, builder bilan o'qib bo'lmaydigan darajada chalkash bo'lganda.",
    "- Performance: aniq SQL kerak bo'lganda.",
    "",
    "### Raw usullari",
    "**Builder ichida qisman:**",
    "- `selectRaw('count(*) as total, date(created_at) as day')`",
    "- `whereRaw('lower(email) = ?', [$email])`, `orWhereRaw`",
    "- `havingRaw`, `orderByRaw`, `groupByRaw`",
    "- `DB::raw('qty * price')`: ifoda sifatida (select yoki update qiymatida).",
    "",
    "**To'liq raw:**",
    "- `DB::select($sql, $bindings)`: `stdClass` massivi qaytaradi.",
    "- `DB::selectOne()`, `DB::scalar()` (Laravel 9+): bitta qiymat.",
    "- `DB::insert`, `DB::update`, `DB::delete`: ta'sirlangan qatorlar soni.",
    "- `DB::statement($sql)`: DDL va natija qaytarmaydigan buyruqlar.",
    "- `DB::unprepared($sql)`: binding'siz, bir nechta buyruq. Faqat ishonchli SQL uchun (migratsiya).",
    "",
    "**Eloquent modellariga:** `Order::fromQuery('SELECT ...', $bindings)` yoki `Order::hydrate(DB::select(...))`. Natija model sifatida keladi, cast va munosabatlar ishlaydi.",
    "",
    "### SQL injection — asosiy xavf",
    "Raw usullar foydalanuvchi kiritishini **avtomatik escape qilmaydi**. Qoida: qiymatlar faqat **binding** orqali: `?` yoki nomlangan `:email`. PDO ularni SQL'dan alohida yuboradi.",
    "",
    "Binding faqat **qiymatlar** uchun ishlaydi. Ustun nomi, jadval nomi, `ORDER BY` yo'nalishi bog'lab bo'lmaydi. Ular uchun **oq ro'yxat**: `in_array($sort, ['created_at', 'total'], true)`. `$request->input('sort')` ni SQL'ga to'g'ridan-to'g'ri qo'ymang.",
    "",
    "Hatto `orderBy($request->sort)` builder'da ham xavfli bo'lishi mumkin: ustun nomlari escape qilinadi, lekin foydalanuvchi ko'rmasligi kerak bo'lgan ustun bo'yicha saralash ma'lumot oshkor qilishi mumkin. Oq ro'yxat har doim to'g'ri.",
    "",
    "### Tartibli raw kod",
    "Raw SQL'ni controller'lar bo'ylab tarqatmang. Query obyekti, repository yoki modelning statik metodida saqlang va test bilan qoplang. Uzun SQL uchun PHP heredoc (`<<<'SQL'`) o'qilishni yaxshilaydi. DB'ga xos SQL boshqa DB'ga ko'chishni qiyinlashtiradi: testlar SQLite'da, production PostgreSQL'da bo'lsa, ziddiyat chiqadi. Testlarni production DB turida ishga tushiring."
  ],
  "examples": [
    {
      "title": "Xavfli va xavfsiz",
      "lang": "php",
      "code": [
        "// SQL INJECTION",
        "$users = DB::select(\"SELECT * FROM users WHERE email = '{$request->email}'\");",
        "",
        "// XAVFSIZ: binding",
        "$users = DB::select('SELECT * FROM users WHERE email = ?', [$request->email]);",
        "",
        "// Ustun nomi: oq ro'yxat",
        "$sort = in_array($request->sort, ['created_at', 'total'], true) ? $request->sort : 'created_at';",
        "$dir = $request->dir === 'asc' ? 'asc' : 'desc';",
        "$orders = Order::orderBy($sort, $dir)->paginate();"
      ]
    },
    {
      "title": "Murakkab hisobot va modelga gidratatsiya",
      "lang": "php",
      "code": [
        "final class TopCustomersQuery",
        "{",
        "    public function get(CarbonInterface $from, int $limit = 10): Collection",
        "    {",
        "        return Customer::fromQuery(<<<'SQL'",
        "            WITH totals AS (",
        "                SELECT customer_id, sum(total) AS revenue, count(*) AS orders_count",
        "                FROM orders",
        "                WHERE status = 'paid' AND created_at >= :from",
        "                GROUP BY customer_id",
        "            )",
        "            SELECT c.*, t.revenue, t.orders_count",
        "            FROM customers c JOIN totals t ON t.customer_id = c.id",
        "            ORDER BY t.revenue DESC",
        "            LIMIT :limit",
        "        SQL, ['from' => $from, 'limit' => $limit]);",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Foydalanuvchi qiymatini SQL satriga interpolatsiya qilish: SQL injection.",
    "Ustun yoki jadval nomini binding bilan berishga urinish: binding faqat qiymatlar uchun. Oq ro'yxat kerak.",
    "`DB::unprepared()` ni foydalanuvchi ma'lumoti bilan ishlatish.",
    "Raw SQL'ni testlarda SQLite'da, production'da PostgreSQL'da ishlatish: sintaksis farqi tufayli testlar yolg'on yashil."
  ]
});
