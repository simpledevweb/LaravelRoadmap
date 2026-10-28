/* Chuqur dars: 12.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("12.11", {
  "lesson": [
    "### Redis navbat (Laravel)",
    "`QUEUE_CONNECTION=redis`: job'lar Redis'da saqlanadi, `queue:work` ularni oladi. Tez, ko'p ishlatiladi (Horizon bilan).",
    "",
    "### Ichki tuzilma",
    "- `queues:default` — **list**: kutayotgan job'lar (`RPUSH` / `LPOP`).",
    "- `queues:default:reserved` — **sorted set**: ishlanayotgan job'lar (`retry_after` muddat bilan).",
    "- `queues:default:delayed` — **sorted set**: kechiktirilgan (`delay()`).",
    "- `queues:default:notify`.",
    "",
    "### Ishonchlilik",
    "- Worker job'ni olganda `reserved`ga o'tkazadi. Worker o'lsa, `retry_after` o'tgach job qayta navbatga tushadi.",
    "- `retry_after` > eng uzoq job vaqti bo'lishi shart, aks holda job ikki marta ishlaydi.",
    "- **At-least-once:** job idempotent bo'lsin.",
    "- Persistence (AOF) bo'lmasa Redis restartda navbat yo'qoladi.",
    "",
    "### Sozlamalar",
    "`config/queue.php` → `redis`: `retry_after`, `block_for` (bloklovchi kutish: CPU tejaydi), `after_commit`. `--tries`, `--backoff`, `--timeout` (timeout < retry_after), `--max-jobs`, `--memory`.",
    "",
    "### Horizon",
    "Redis queue uchun dashboard, avtomatik balans, metrikalar, `supervisor`.",
    "",
    "### Muqobillar",
    "SQS (boshqariladigan, ishonchli), RabbitMQ (routing), database queue (kichik loyiha), Redis Streams.",
    "",
    "### Ehtiyot",
    "- Xotira: navbat o'ssa Redis to'ladi (eviction `noeviction`!).",
    "- Queue va cache uchun alohida Redis (cache eviction navbatni o'chirmasin).",
    "- Failed jobs jadvali.",
    "- Monitoring: navbat uzunligi, kutish vaqti."
  ],
  "examples": [
    {
      "title": "config va worker",
      "lang": "bash",
      "code": [
        "# config/queue.php: 'redis' => ['connection' => 'queue', 'queue' => 'default', 'retry_after' => 120, 'block_for' => 5]",
        "php artisan queue:work redis --queue=high,default --tries=3 --backoff=10 --timeout=100 --max-time=3600",
        "php artisan horizon"
      ]
    }
  ],
  "pitfalls": [
    "`retry_after` job vaqtidan kichik bo'lsa job ikki marta ishlaydi.",
    "Navbat va kesh bitta Redis'da `allkeys-lru` bilan: eviction navbatni o'chiradi.",
    "Persistence'siz Redis restartda navbatni yo'qotadi.",
    "Job idempotent bo'lmasa at-least-once dublikat yaratadi."
  ]
});
