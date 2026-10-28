/* Chuqur dars: 17.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("17.13", {
  "lesson": [
    "### Qaysi xatolarni qayta urinish kerak",
    "Qayta urinish faqat **vaqtinchalik** (transient) xatolar uchun ma'noli: keyingi urinishda muvaffaqiyatli bo'lishi mumkin bo'lganlar.",
    "",
    "**Qayta urinish kerak:**",
    "- Deadlock: MySQL `1213`, PostgreSQL `40P01`.",
    "- Serialization failure: `40001` (REPEATABLE READ, SERIALIZABLE).",
    "- Lock wait timeout: MySQL `1205`, PostgreSQL `55P03` (`lock_timeout`).",
    "- Ulanish uzilishi: `server has gone away`, `Lost connection`, failover paytida.",
    "",
    "**Qayta urinish kerak emas:**",
    "- Validatsiya va biznes qoida xatolari.",
    "- Constraint buzilishi (`23000`, `23505` unique, FK). Qayta urinish natijani o'zgartirmaydi.",
    "- Sintaksis xatolari, ruxsat yo'qligi.",
    "",
    "### Strategiya qoidalari",
    "1. **Cheklangan urinishlar soni:** 3–5. Cheksiz retry muammoni yashiradi va yukni oshiradi.",
    "2. **Eksponensial backoff:** 50 ms, 100 ms, 200 ms, 400 ms. Konflikt yechilishi uchun vaqt beradi.",
    "3. **Jitter (tasodifiylik):** `delay + random(0, delay)`. Bir vaqtda yiqilgan mijozlar bir vaqtda qayta urinib, yana to'qnashmasligi uchun.",
    "4. **Butun tranzaksiyani qayta bajarish:** faqat oxirgi so'rovni emas. Rollback'dan keyin barcha o'qishlar eskirgan. Yopilma boshidan bajarilishi kerak.",
    "5. **Tranzaksiya ichida yon ta'sir yo'q:** email, HTTP chaqiruv, job dispatch qayta urinishda takrorlanadi. Ularni `afterCommit` ga chiqaring.",
    "6. **Kuzatuv:** har urinishni log yoki metrikaga yozing. Retry'lar soni oshishi muammo belgisi.",
    "",
    "### Laravel vositalari",
    "- `DB::transaction($callback, attempts: 3)`: deadlock va serialization xatosida (Laravel buni `DetectsConcurrencyErrors` orqali aniqlaydi) yopilmani darhol qayta bajaradi. Backoff yo'q.",
    "- `retry($times, $callback, $sleep, $when)` helper: backoff funksiyasi va qaysi xatolarni qayta urinish sharti bilan.",
    "- Queue job'lar: `$tries`, `$backoff = [10, 30, 60]`, `retryUntil()`. Job darajasidagi retry uzoqroq vaqtinchalik muammolar uchun (tashqi API).",
    "",
    "### Idempotentlik bilan birga",
    "Retry xavfsiz bo'lishi uchun amal **idempotent** bo'lishi kerak (17.17). Ayniqsa ulanish uzilishida: so'rov serverga yetib, commit bo'lgan, lekin javob kelmagan bo'lishi mumkin. Qayta urinish ikkinchi marta bajaradi. Idempotency key yoki unique constraint buni oldini oladi.",
    "",
    "### Circuit breaker",
    "Tashqi servis yoki DB umuman ishlamayotgan bo'lsa, har so'rovda retry faqat yukni oshiradi. Circuit breaker ketma-ket xatolardan keyin \"ochiladi\" va bir muddat so'rovlarni darhol rad etadi."
  ],
  "examples": [
    {
      "title": "Backoff va jitter bilan retry",
      "lang": "php",
      "code": [
        "$result = retry(",
        "    times: 4,",
        "    callback: fn () => DB::transaction(fn () => $this->reserve($order)),",
        "    sleepMilliseconds: fn (int $attempt) => (2 ** $attempt) * 50 + random_int(0, 50),",
        "    when: function (Throwable $e) {",
        "        $retryable = $e instanceof QueryException",
        "            && in_array($e->getCode(), ['40001', '40P01', 'HY000'], true);",
        "",
        "        if ($retryable) {",
        "            Log::warning('DB retry', ['code' => $e->getCode()]);",
        "        }",
        "",
        "        return $retryable;",
        "    },",
        ");"
      ],
      "note": "MySQL'da `1205` va `1213` xatolarining SQLSTATE'i mos ravishda `HY000` va `40001`. Aniqroq tekshirish uchun `$e->errorInfo[1]` (driver kodi) ishlating."
    },
    {
      "title": "Queue job retry",
      "lang": "php",
      "code": [
        "class SyncInventory implements ShouldQueue",
        "{",
        "    use Queueable;",
        "",
        "    public int $tries = 5;",
        "    public array $backoff = [10, 30, 60, 120];",
        "",
        "    public function handle(InventoryApi $api): void",
        "    {",
        "        $api->push($this->productId);",
        "    }",
        "",
        "    public function failed(Throwable $e): void",
        "    {",
        "        report($e);",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Unique yoki validatsiya xatolarini ham qayta urinish: natija o'zgarmaydi, faqat yuk oshadi.",
    "Faqat oxirgi `UPDATE` ni qayta yuborish: rollback'dan keyin barcha o'qilgan qiymatlar eskirgan.",
    "Jitter'siz bir xil kechikish: yiqilgan so'rovlar yana bir vaqtda to'qnashadi.",
    "Retry ichida email yoki to'lov chaqiruvi: mijoz ikki marta xabar oladi yoki ikki marta to'laydi."
  ]
});
