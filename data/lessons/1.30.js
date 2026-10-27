/* Chuqur dars: 1.30. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.30", {
  "lesson": [
    "### Muammo manbalari",
    "Timezone, DST (yozgi/qishki vaqt), o'zgaruvchan obyektlar va oy oxiri qoidalari. Ko'p production xatolari \"mahalliy vaqt\" va \"UTC\" aralashganidan.",
    "",
    "### Asosiy klasslar",
    "- `DateTimeImmutable` (afzal) va `DateTime` (mutable): `modify()`, `add(DateInterval)`, `setTimezone()`, `format()`.",
    "- `DateTimeZone('Asia/Tashkent')`: IANA nomlari, offset (`+05:00`) emas, chunki offsetda DST yo'q.",
    "- `DateInterval`, `DatePeriod` (oraliqni aylanish), `diff()` → `DateInterval` (`days`, `invert`).",
    "",
    "### Qoidalar",
    "1. **Saqlash — UTC**. DB: `timestamp`/`datetime` UTC, ustun nomlari `*_at`. Laravel `config('app.timezone')='UTC'`.",
    "2. **Ko'rsatish — foydalanuvchi timezone'i**.",
    "3. `DateTimeImmutable`: `$d->modify()` yangi obyekt qaytaradi, eskisini o'zgartirmaydi.",
    "4. Vaqt oralig'i uchun `[from, to)` (yarim ochiq), \"kun oxiri 23:59:59\" xatolarini oldini oladi.",
    "5. Vaqtga bog'liq kodda `Carbon::setTestNow()` / Clock interface (PSR-20) ishlating: `now()` ni testda muzlatish.",
    "",
    "### Tuzoqlar",
    "- `+1 month`: 31 yanvar + 1 oy = mart boshi. Oy oxiri uchun `last day of next month` yoki Carbon `addMonthNoOverflow()`.",
    "- DST kunida 23 yoki 25 soat bo'ladi: `+24 hours` ≠ `+1 day`.",
    "- `strtotime` noaniq kiritmada (`01/02/2025`) amerika/yevropa formatini adashtiradi; `DateTimeImmutable::createFromFormat` ishlating va `false` ni tekshiring.",
    "- `date()` server timezone'ga bog'liq.",
    "- Y2038: 32-bitda timestamp; 64-bitda muammo yo'q.",
    "",
    "### Carbon",
    "Laravel `Carbon` — `DateTime` ustiga quriladi: `now()`, `diffForHumans()`, `startOfDay()`, `copy()` (mutable `Carbon`, immutable `CarbonImmutable`). Asosiy qoidalar bir xil.",
    "",
    "### Timezone ichki ishlash",
    "PHP IANA tz database (zoneinfo) ishlatadi: `Asia/Tashkent` (UTC+5, DST yo'q), `Europe/Berlin` (DST bor). Ma'lumotlar bazasi yangilanishi uchun PHP/`timezonedb` yangilash kerak. `date_default_timezone_set()`/`date.timezone`; Laravel `config('app.timezone')` (default UTC) — Carbon va `now()` shuni ishlatadi.",
    "",
    "### Klasslar",
    "- `DateTimeImmutable` / `DateTime`: `__construct('2025-01-01 10:00', $tz)`, `format`, `modify`, `add/sub(DateInterval)`, `setDate/setTime/setTimestamp`, `getTimestamp`, `diff`, `createFromFormat`, `createFromInterface/Mutable`.",
    "- `DateTimeZone`: `getOffset($dt)`, `getTransitions($from, $to)` (DST o'tishlari), `listIdentifiers()`.",
    "- `DateInterval`: ISO 8601 davomiylik (`P1DT2H`, `P1M`), `y m d h i s f invert days`.",
    "- `DatePeriod`: `new DatePeriod($start, new DateInterval('P1D'), $end)` — `foreach` bilan kunlar.",
    "- `IntlDateFormatter` (intl): lokal formatlash (o'zbekcha oy nomlari: `uz`).",
    "",
    "### Format harflari",
    "`Y` (4 raqamli yil), `y`, `m`/`n` (oy), `d`/`j`, `H`/`G` (24 soat), `h`/`g` (12), `i`, `s`, `v` (millisek), `u` (mikrosek), `T` (qisqartma), `e` (identifikator), `P` (+05:00), `U` (timestamp), `c` (ISO 8601), `D`/`l` (hafta kuni, ingliz). Murakkab: `DATE_ATOM`, `DATE_RFC3339_EXTENDED`.",
    "",
    "### Aniq vaqt/moment",
    "- **Instant:** UTC timestamp (aniq vaqt nuqtasi): to'lov vaqti, log.",
    "- **Lokal (wall clock) vaqt:** \"ertaga soat 9:00\": foydalanuvchi zonasi + qoida; DST o'tishda mavjud bo'lmagan yoki ikki marta bo'lgan soat.",
    "- **Sana (kalendar kuni):** tug'ilgan kun; timezone'siz saqlanadi (DATE).",
    "- Tur aralashmasligi — eng ko'p xato manbai.",
    "",
    "### Strtotime / relative formatlar",
    "`modify('first day of next month')`, `'last monday'`, `'+2 weekdays'`, `'midnight'`, `'noon tomorrow'`. Ma'nosi aniq emas formatlar (`01-02-2025`) — tire bilan `d-m-Y`, slash bilan `m/d/Y` deb o'qiladi. Kiritma uchun `createFromFormat('!d.m.Y', ...)` va `!` bilan qolgan maydonlarni 0 qilish.",
    "",
    "### Test va CI",
    "`Carbon::setTestNow('2025-03-30 00:00')`, PSR-20 `ClockInterface` DI orqali; `Date::` fake (Laravel `travelTo`, `freezeTime`). Vaqtga bog'liq kodni `now()` ni to'g'ridan-to'g'ri chaqirmasdan sinab bo'ladigan qiling.",
    "",
    "### DB bilan",
    "MySQL `TIMESTAMP` (UTC saqlaydi, session zonasiga o'giradi, 2038 chegarasi), `DATETIME` (zona yo'q, qanday kiritilsa shunday). Postgres `timestamptz` (UTC saqlaydi). Laravel `datetime` ustun + UTC kelishuvi, Carbon cast; ko'rsatishda `->timezone($user->tz)`."
  ],
  "examples": [
    {
      "title": "UTC va lokal",
      "lang": "php",
      "code": [
        "$utc   = new DateTimeImmutable('2025-03-30 00:30', new DateTimeZone('UTC'));",
        "$local = $utc->setTimezone(new DateTimeZone('Asia/Tashkent'));",
        "echo $local->format('Y-m-d H:i T');   // 2025-03-30 05:30 +05"
      ]
    },
    {
      "title": "Oy oxiri va immutability",
      "lang": "php",
      "code": [
        "$a = new DateTimeImmutable('2025-01-31');",
        "echo $a->modify('+1 month')->format('Y-m-d');           // 2025-03-03",
        "echo $a->modify('last day of next month')->format('Y-m-d'); // 2025-02-28",
        "echo $a->format('Y-m-d');                               // 2025-01-31 (o'zgarmadi)"
      ]
    },
    {
      "title": "Xavfsiz parse",
      "lang": "php",
      "code": [
        "$d = DateTimeImmutable::createFromFormat('!d.m.Y', $input, new DateTimeZone('UTC'));",
        "if ($d === false || DateTimeImmutable::getLastErrors()['warning_count'] ?? 0) {",
        "    throw new InvalidArgumentException('Sana noto\\'g\\'ri');",
        "}"
      ]
    },
    {
      "title": "DST o'tish",
      "lang": "php",
      "code": [
        "$tz = new DateTimeZone('Europe/Berlin');",
        "$d = new DateTimeImmutable('2025-03-30 01:30', $tz);",
        "echo $d->modify('+1 hour')->format('c');          // 03:30+02:00 (02:30 mavjud emas)",
        "echo $d->modify('+1 day')->format('c');           // 2025-03-31T01:30+02:00"
      ]
    },
    {
      "title": "Davr bo'yicha aylanish",
      "lang": "php",
      "code": [
        "$p = new DatePeriod(new DateTimeImmutable('2025-01-01'), new DateInterval('P1D'), new DateTimeImmutable('2025-01-08'));",
        "foreach ($p as $day) echo $day->format('D d.m'), \"\\n\";   // oxirgi kun kirmaydi"
      ]
    },
    {
      "title": "Test: vaqtni muzlatish",
      "lang": "php",
      "code": [
        "use Illuminate\\Support\\Carbon;",
        "Carbon::setTestNow('2025-03-30 12:00:00');",
        "expect(now()->toDateString())->toBe('2025-03-30');",
        "$this->travel(5)->days();"
      ]
    }
  ],
  "pitfalls": [
    "`DateTime` mutable: funksiyaga uzatilgan obyekt ichkarida `modify()` qilinsa tashqarida ham o'zgaradi. `DateTimeImmutable` ishlating.",
    "DST kunida `+24 hours` va `+1 day` farq qiladi; kalendar bo'yicha hisoblanadigan holatda `+1 day`.",
    "`createFromFormat` xatoda `false` qaytaradi va `31.02.2025` kabi sanani 'to'g'rilab' qo'yadi: `getLastErrors()` ni tekshiring.",
    "Lokal vaqtni DB'ga yozish: server timezone o'zgarsa ma'lumot buziladi; UTC saqlang.",
    "`DATETIME` ustun timezone'ni saqlamaydi: sessiya zonasi o'zgarsa ma'noni yo'qotadi; UTC kelishuvi.",
    "Hafta kunlari va oy nomlari `format('D')` inglizcha; lokal uchun `IntlDateFormatter`/Carbon `isoFormat`.",
    "`DatePeriod` end sanasini kiritmaydi (default); `DatePeriod::INCLUDE_END_DATE` (8.2).",
    "`new DateTime()` hozirgi vaqt va default timezone: testlarda moslashuvchan emas."
  ]
});
