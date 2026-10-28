/* Chuqur dars: 11.14. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("11.14", {
  "lesson": [
    "### Window funksiyalar",
    "`GROUP BY` qatorlarni bitta qatorga yig'adi. Window funksiya esa har bir qatorni saqlaydi va unga \"qo'shni\" qatorlar bo'yicha hisoblangan qiymatni qo'shadi: o'rni, oldingi qiymat, yig'ma summa, guruh ichidagi ulush.",
    "",
    "Sintaksis: `func() OVER (PARTITION BY ... ORDER BY ... frame)`.",
    "- `PARTITION BY`: qatorlarni guruhlarga bo'ladi (window har guruhda alohida).",
    "- `ORDER BY`: guruh ichidagi tartib.",
    "- **Frame**: joriy qator atrofidagi qaysi qatorlar hisobga olinadi.",
    "",
    "### Funksiyalar",
    "- Raqamlash: `row_number()`, `rank()` (tenglarda bo'shliq), `dense_rank()`, `ntile(n)`, `percent_rank()`, `cume_dist()`.",
    "- Qo'shni qiymatlar: `lag(col, n, default)`, `lead()`, `first_value()`, `last_value()`, `nth_value()`.",
    "- Har qanday agregat: `sum() OVER`, `avg() OVER`, `count() OVER`.",
    "",
    "### Frame turlari",
    "- `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW`: jismoniy qatorlar soni (7 kunlik sirg'aluvchi o'rtacha).",
    "- `RANGE BETWEEN interval '7 days' PRECEDING AND CURRENT ROW`: qiymat oralig'i (PG 11+). Kunlar o'tkazib yuborilgan bo'lsa ham to'g'ri.",
    "- `GROUPS`: tenglar guruhi soni bo'yicha.",
    "- `EXCLUDE CURRENT ROW / TIES`: joriy qatorni chiqarib tashlash.",
    "",
    "**Muhim default:** `ORDER BY` bor bo'lsa, frame `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`. Shuning uchun `last_value()` kutilgandek oxirgi qiymatni emas, joriy qatorni qaytaradi. Frame'ni aniq yozing: `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`.",
    "",
    "### FILTER va nomlangan oyna",
    "`count(*) FILTER (WHERE status = 'paid')` — `CASE` siz shartli agregat. Bir xil oyna bir necha marta ishlatilsa: `WINDOW w AS (PARTITION BY customer_id ORDER BY created_at)` va `OVER w`.",
    "",
    "### Top-N per group",
    "\"Har mijozning oxirgi buyurtmasi\" kabi vazifa uchun ikki yo'l bor:",
    "1. `DISTINCT ON (customer_id) ... ORDER BY customer_id, created_at DESC`. PostgreSQL'ga xos, qisqa va tez (top-1).",
    "2. `row_number() OVER (...)` subquery'da va `WHERE rn <= 3` (top-N).",
    "",
    "Window natijasini to'g'ridan-to'g'ri `WHERE` da ishlatib bo'lmaydi, chunki window `WHERE` dan keyin hisoblanadi. Subquery yoki CTE kerak.",
    "",
    "### Laravel'da",
    "`selectRaw('..., row_number() over (partition by customer_id order by created_at desc) as rn')` va `fromSub()` bilan tashqi filtr. Eloquent'da \"har userning oxirgi posti\" uchun `latestOfMany()` relation (Laravel 8.42+) ichida shunga o'xshash so'rov quriladi."
  ],
  "examples": [
    {
      "title": "Sirg'aluvchi o'rtacha va o'sish",
      "lang": "sql",
      "code": [
        "SELECT day, revenue,",
        "       avg(revenue) OVER w7 AS avg_7d,",
        "       revenue - lag(revenue) OVER (ORDER BY day) AS diff,",
        "       sum(revenue) OVER (ORDER BY day ROWS UNBOUNDED PRECEDING) AS running_total",
        "FROM daily_revenue",
        "WINDOW w7 AS (ORDER BY day ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)",
        "ORDER BY day;"
      ]
    },
    {
      "title": "Har mijozning oxirgi 3 buyurtmasi (Laravel)",
      "lang": "php",
      "code": [
        "$ranked = DB::table('orders')->selectRaw(",
        "    'id, customer_id, total, created_at,",
        "     row_number() over (partition by customer_id order by created_at desc) as rn'",
        ");",
        "",
        "$top3 = DB::query()->fromSub($ranked, 'o')",
        "    ->where('rn', '<=', 3)",
        "    ->orderBy('customer_id')->orderBy('rn')",
        "    ->get();",
        "",
        "// Top-1: DISTINCT ON",
        "$last = DB::select('SELECT DISTINCT ON (customer_id) customer_id, id, created_at",
        "                    FROM orders ORDER BY customer_id, created_at DESC');"
      ]
    }
  ],
  "pitfalls": [
    "`last_value()` ni frame'siz ishlatish: default frame tufayli joriy qatorning qiymati qaytadi.",
    "Window natijasini (`rn`) shu so'rovning `WHERE` qismida filtrlashga urinish: `column \"rn\" does not exist`.",
    "`rank()` va `row_number()` farqini unutish: tenglar bo'lsa, `rank` bir xil raqam beradi va top-N natijasida N dan ko'p qator chiqadi.",
    "`ROWS` o'rniga sana bo'shliqlari bor ma'lumotda 7 kunlik oyna kutish: `ROWS 6 PRECEDING` 7 ta qator, 7 kun emas. `RANGE interval` ishlating."
  ]
});
