/* Chuqur dars: 16.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("16.6", {
  "lesson": [
    "### Sargable nima",
    "**Sargable** (Search ARGument ABLE) — DB indeksdan foydalana oladigan shart. Indeks ustunning **xom qiymatlari** bo'yicha tartiblangan. Shart \"ustun operator konstanta\" ko'rinishida bo'lsa (`created_at >= '2025-01-01'`), DB indeksda kerakli joyga sakraydi. Agar ustun biror ifodaga o'ralsa, DB har qatorda ifodani hisoblab, natijani tekshirishi kerak. Bu full scan.",
    "",
    "### Sargable bo'lmagan shakllar",
    "1. **Ustunga funksiya:** `YEAR(created_at) = 2025`, `DATE(created_at) = ?`, `LOWER(email) = ?`, `COALESCE(deleted_at, 0) = 0`.",
    "2. **Ustun ustida arifmetika:** `price * 1.12 > 100`, `created_at + INTERVAL 7 DAY > NOW()`.",
    "3. **Boshida wildcard:** `LIKE '%abc'` yoki `'%abc%'`. Faqat `LIKE 'abc%'` sargable.",
    "4. **Implicit tip konversiyasi:** `varchar` ustunni son bilan taqqoslash (`phone = 998901234567`). MySQL har qatorni songa o'giradi va indeks ishlamaydi. Collation yoki charset mos kelmasligi ham JOIN'da shunday.",
    "5. **OR turli ustunlarda:** `a = 1 OR b = 2`. Ba'zan index merge yoki bitmap OR yordam beradi, aks holda `UNION`.",
    "6. **`NOT IN`, `!=`, `<>`:** odatda kam selektiv, indeks foydasiz.",
    "",
    "### Qayta yozish usullari",
    "- **Funksiyani qiymat tomoniga o'tkazish:** `YEAR(created_at) = 2025` → `created_at >= '2025-01-01' AND created_at < '2026-01-01'`.",
    "- **Arifmetikani ag'darish:** `price * 1.12 > 100` → `price > 100 / 1.12`. `created_at + INTERVAL 7 DAY > NOW()` → `created_at > NOW() - INTERVAL 7 DAY`.",
    "- **Ma'lumotni normallashtirib saqlash:** email'ni kichik harfda yozish (mutator), telefonni faqat raqamlar bilan.",
    "- **Expression indeks yoki generated column** (16.10, 11.7).",
    "- **To'g'ri tip:** binding'larni ustun tipiga mos bering (`(string) $phone`).",
    "- `%abc%` uchun full-text yoki `pg_trgm` (11.5, 11.15).",
    "",
    "Yarim ochiq diapazon (`>= start AND < next_start`) `BETWEEN '... 23:59:59'` dan yaxshiroq: mikrosoniyalar va kabisa holatlari xato bermaydi.",
    "",
    "### Laravel helper'lari",
    "`whereDate()`, `whereMonth()`, `whereYear()`, `whereDay()`, `whereTime()` qulay, lekin ustunga funksiya qo'llaydigan SQL yaratadi (`DATE(created_at) = ?`). Kichik jadvalda farqi yo'q. Millionlab qatorda `whereBetween` yoki ikki `where` bilan diapazonga almashtiring."
  ],
  "examples": [
    {
      "title": "Qayta yozish",
      "lang": "sql",
      "code": [
        "-- Sargable emas",
        "SELECT id FROM orders WHERE YEAR(created_at) = 2025;",
        "SELECT id FROM orders WHERE created_at + INTERVAL 7 DAY > NOW();",
        "SELECT id FROM users WHERE phone = 998901234567;      -- phone varchar",
        "",
        "-- Sargable",
        "SELECT id FROM orders WHERE created_at >= '2025-01-01' AND created_at < '2026-01-01';",
        "SELECT id FROM orders WHERE created_at > NOW() - INTERVAL 7 DAY;",
        "SELECT id FROM users WHERE phone = '998901234567';"
      ]
    },
    {
      "title": "Laravel'da",
      "lang": "php",
      "code": [
        "// Qulay, lekin katta jadvalda full scan",
        "Order::whereDate('created_at', $day)->count();",
        "",
        "// Indeksdan foydalanadi",
        "$start = Carbon::parse($day)->startOfDay();",
        "Order::where('created_at', '>=', $start)",
        "    ->where('created_at', '<', $start->copy()->addDay())",
        "    ->count();",
        "",
        "// Oxirgi 7 kun",
        "Order::where('created_at', '>', now()->subDays(7))->get();"
      ]
    }
  ],
  "pitfalls": [
    "`whereDate()`/`whereYear()` ni katta jadvalda ishlatib, indeks ishlaydi deb kutish.",
    "`varchar` ustunni int binding bilan taqqoslash: MySQL'da indeks jim ishlamay qoladi.",
    "`BETWEEN '2025-01-01' AND '2025-01-31'` bilan `timestamp` ustunda oxirgi kunni yo'qotish: `< '2025-02-01'` yozing.",
    "`LIKE '%x%'` ni oddiy B-tree indeks bilan tezlashtirishga urinish."
  ]
});
