/* Chuqur dars: 2.18. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.18", {
  "lesson": [
    "### Artisan",
    "Laravel'ning buyruq satri vositasi: `php artisan list`, `make:*`, `migrate`, `queue:work`, `tinker`, `optimize`.",
    "",
    "### O'z buyrug'ingiz",
    "`php artisan make:command ImportUsers`. L11+ da `app/Console/Commands` avtomatik ro'yxatga olinadi.",
    "```php",
    "protected $signature = 'users:import {file} {--dry-run} {--limit=100}';",
    "protected $description = 'CSV dan foydalanuvchilarni import qiladi';",
    "public function handle(): int { ...; return self::SUCCESS; }",
    "```",
    "",
    "### Kiritma",
    "`$this->argument('file')`, `$this->option('limit')`. Massiv argument `{users*}`, ixtiyoriy `{name?}`, default `{name=Ali}`.",
    "",
    "### Interaktiv",
    "`ask()`, `secret()`, `confirm()`, `choice()`, `anticipate()`; laravel/prompts (`text()`, `select()`, `multiselect()`).",
    "",
    "### Chiqish",
    "`info()`, `warn()`, `error()`, `line()`, `table()`, `progressBar` (`withProgressBar($items, fn ...)`).",
    "",
    "### Dasturdan chaqirish",
    "`Artisan::call('users:import', ['file' => 'a.csv'])`, `$this->call()`, `Artisan::queue()`.",
    "",
    "### Kod bilan buyruq (routes/console.php)",
    "`Artisan::command('inspire', fn () => $this->comment(Inspiring::quote()))->purpose('...')`.",
    "",
    "### Qoidalar",
    "- Qaytish kodi: `0` muvaffaqiyat, `1+` xato (cron/CI uchun).",
    "- Katta ma'lumot: `chunkById`, `lazy()`.",
    "- Uzoq buyruqlarda `--memory`, xatolarni log qiling.",
    "- `--no-interaction` rejimida so'rovlar bo'lmasin."
  ],
  "examples": [
    {
      "title": "Buyruq",
      "lang": "php",
      "code": [
        "final class ImportUsers extends Command",
        "{",
        "    protected $signature = 'users:import {file} {--dry-run}';",
        "    protected $description = 'CSV import';",
        "",
        "    public function handle(): int",
        "    {",
        "        $rows = $this->laravelCsv($this->argument('file'));",
        "        $this->withProgressBar($rows, fn ($r) => $this->option('dry-run') ?: User::create($r));",
        "        $this->newLine();",
        "        $this->info('Tugadi');",
        "        return self::SUCCESS;",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Qaytish kodini bermaslik cron/CI'da xatoni sezdirmaydi: `self::FAILURE`.",
    "Katta jadvalni `all()` bilan o'qish OOM beradi: `chunkById`/`lazy`.",
    "Interaktiv so'rov `--no-interaction` (cron) da to'xtab qoladi.",
    "`handle()` ichida katta mantiq: Action/Service klassga chiqaring."
  ]
});
