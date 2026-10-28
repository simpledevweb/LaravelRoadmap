/* Chuqur dars: 53.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("53.11", {
  "lesson": [
    "### Queue offloading",
    "Og'ir yoki sekin ishni **HTTP so'rovdan chiqarib**, fon'da (queue worker) bajarish: foydalanuvchi tez javob oladi, worker'lar masshtablanadi.",
    "",
    "### Nimani queue'ga",
    "- Email/SMS/push yuborish.",
    "- Fayl/rasm/video qayta ishlash, PDF/eksport.",
    "- Tashqi API chaqiruvi (webhook, sinxronizatsiya).",
    "- Hisobotlar, import.",
    "- Indekslash/qidiruv yangilash.",
    "- Bildirishnoma, analitika/log yozish.",
    "",
    "### Laravel",
    "```php",
    "ProcessVideo::dispatch($video);                          // job",
    "SendWelcome::dispatch($user)->onQueue('emails')->delay(now()->addMinutes(1));",
    "Bus::chain([...])->dispatch(); Bus::batch([...])->dispatch();",
    "dispatch(fn () => ...)->afterResponse();                 // javobdan keyin (qisqa ish)",
    "defer(fn () => ...);                                     // L11+: javobdan keyin",
    "```",
    "Driver: Redis (+ Horizon), SQS, database. `ShouldQueue` (Mailable, Notification, Listener).",
    "",
    "### Yaxshi amaliyot",
    "- **Idempotent job** (qayta ishlashga bardosh: at-least-once).",
    "- `afterCommit`: DB commit'dan keyin yuborish.",
    "- `tries`, `backoff`, `timeout` (< `retry_after`), `failed()`; dead-letter.",
    "- Kichik payload (model ID, butun obyekt emas).",
    "- Navbatlar ustuvorligi (`high`, `default`, `low`), alohida worker'lar.",
    "- `--max-jobs`, `--memory` (sizish), supervisor/Horizon.",
    "- Monitoring: navbat uzunligi, kutish vaqti, xatolar.",
    "",
    "### Muvozanat",
    "Sinxron kerak bo'lganda (natija darrov kerak) queue emas; foydalanuvchiga holat ko'rsatish (polling/broadcast).",
    "",
    "### Rate-limit",
    "Tashqi API uchun `RateLimited` job middleware, `WithoutOverlapping`."
  ],
  "examples": [
    {
      "title": "Job",
      "lang": "php",
      "code": [
        "final class ProcessUpload implements ShouldQueue",
        "{",
        "    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;",
        "    public int $tries = 3; public int $timeout = 100; public bool $afterCommit = true;",
        "    public function __construct(public Upload $upload) {}",
        "    public function backoff(): array { return [10, 60, 300]; }",
        "    public function handle(): void { /* og'ir ish */ }",
        "}",
        "ProcessUpload::dispatch($upload)->onQueue('media');"
      ]
    }
  ],
  "pitfalls": [
    "Job idempotent bo'lmasa at-least-once dublikat yaratadi.",
    "Tranzaksiya commit bo'lmasdan yuborilgan job yozuvni topa olmaydi: `afterCommit`.",
    "`timeout` `retry_after`dan katta bo'lsa job ikki marta ishlaydi.",
    "Navbat worker'lari ishlamasa job'lar to'planadi: monitoring."
  ]
});
