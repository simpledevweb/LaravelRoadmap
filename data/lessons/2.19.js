/* Chuqur dars: 2.19. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.19", {
  "lesson": [
    "### Task Scheduling",
    "Bitta cron yozuvi bilan hamma rejalashtirilgan vazifalarni boshqarish: serverda **faqat**",
    "`* * * * * cd /path && php artisan schedule:run >> /dev/null 2>&1`.",
    "",
    "### Vazifalarni belgilash",
    "L11+: `routes/console.php`:",
    "```php",
    "Schedule::command('reports:daily')->dailyAt('02:00');",
    "Schedule::job(new PruneOld)->hourly();",
    "Schedule::call(fn () => ...)->everyFiveMinutes();",
    "```",
    "(Eskida `Console/Kernel::schedule`.)",
    "",
    "### Chastotalar",
    "`everyMinute()`, `everyFiveMinutes()`, `hourly()`, `daily()`, `dailyAt('13:00')`, `weekly()`, `monthly()`, `cron('...')`, `weekdays()`, `timezone('Asia/Tashkent')`.",
    "",
    "### Shartlar va cheklovlar",
    "`->when(fn () => ...)`, `->skip()`, `->environments(['production'])`, `->between('8:00','17:00')`.",
    "",
    "### Muhim bayroqlar",
    "- `withoutOverlapping()` — oldingi ishga tushish tugamasa qayta boshlanmaydi (cache lock kerak).",
    "- `onOneServer()` — ko'p server'da faqat bitta serverda (umumiy cache: Redis/DB).",
    "- `runInBackground()`, `evenInMaintenanceMode()`.",
    "- Chiqish: `appendOutputTo()`, `emailOutputOnFailure()`.",
    "- Hooklar: `before()`, `after()`, `onSuccess()`, `onFailure()`.",
    "",
    "### Yordamchi buyruqlar",
    "`schedule:list`, `schedule:work` (dev, har daqiqa), `schedule:test`.",
    "",
    "### Qoidalar",
    "Vazifa **idempotent** bo'lsin; og'ir ish queue'ga (`Schedule::job`); xatolarni monitoring qiling (Sentry cron, healthchecks)."
  ],
  "examples": [
    {
      "title": "Jadval",
      "lang": "php",
      "code": [
        "use Illuminate\\Support\\Facades\\Schedule;",
        "",
        "Schedule::command('reports:daily')->dailyAt('02:00')->timezone('Asia/Tashkent')->onOneServer()->withoutOverlapping();",
        "Schedule::job(new PruneExpiredTokens)->hourly();",
        "Schedule::call(fn () => Cache::forget('rates'))->everyTenMinutes();"
      ]
    }
  ],
  "pitfalls": [
    "`onOneServer`/`withoutOverlapping` umumiy cache (Redis/DB) siz ishlamaydi.",
    "Cron yozuvi qo'shilmasa hech narsa ishlamaydi: `schedule:run` har daqiqa chaqirilishi shart.",
    "Vazifa vaqti `app.timezone` bo'yicha: timezone'ni aniq belgilang.",
    "Uzoq vazifani to'g'ridan-to'g'ri schedule'da bajarish keyingilarni to'sadi: queue'ga bering."
  ]
});
