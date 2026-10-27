/* Chuqur dars: 46.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("46.6", {
  "lesson": [
    "### Nega retry kerak",
    "Navbatdagi job tashqi omillarga bog'liq: API vaqtincha ishlamaydi, baza qulfi, tarmoq uzilishi. Ko'p xatolar vaqtinchalik, shuning uchun job'ni bir-ikki marta qayta urinish tizimni ancha barqaror qiladi. Doimiy xato (noto'g'ri ma'lumot) esa qayta urinish bilan tuzalmaydi, uni `failed_jobs` ga tushirish kerak.",
    "",
    "### Asosiy sozlamalar",
    "- `$tries`: maksimal urinishlar soni (birinchi urinish ham sanaladi).",
    "- `$backoff`: urinishlar orasidagi kutish (soniyada). Massiv bersangiz, har urinish uchun alohida: `[10, 60, 300]`.",
    "- `retryUntil()`: urinishlar sonini emas, **vaqt chegarasini** beradi (masalan 1 soat ichida urinish).",
    "- `$maxExceptions`: shuncha exception dan keyin job muvaffaqiyatsiz hisoblanadi (`release()` bilan qaytarilgan urinishlar hisobga olinmaydi).",
    "- `failed(Throwable $e)`: barcha urinish tugagach chaqiriladi; foydalanuvchiga xabar berish yoki holatni tiklash uchun.",
    "",
    "### Exponential backoff",
    "Barcha urinishlar bir xil oraliqda bo'lsa, ishlamay turgan servisga to'xtovsiz so'rov yuborasiz. `[10, 60, 300]` kabi o'sib boruvchi oraliq servisga tiklanish vaqtini beradi.",
    "",
    "### Eng muhim qoida: idempotentlik",
    "Job qayta ishga tushishi mumkin, demak bir xil job **ikki marta** bajarilsa ham tizim buzilmasligi kerak (ikki marta pul yechmaslik, ikki marta email yubormaslik). Buning uchun bajarilganlikni tekshirish, `unique` cheklov yoki Idempotency-Key ishlatiladi.",
    "",
    "### Qaysi qiymat ustun",
    "Buyruq qatoridagi `--tries` job klassidagi `$tries` ga nisbatan quyi ustuvorlikka ega: job'ning o'z sozlamasi ustun keladi. Shuning uchun muhim job'larda sozlamani job ichida yozing."
  ],
  "examples": [
    {
      "title": "Job sozlamalari",
      "lang": "php",
      "code": [
        "class SendInvoice implements ShouldQueue",
        "{",
        "    use Queueable;",
        "",
        "    public int $tries = 4;",
        "    public array $backoff = [10, 60, 300];",
        "    public int $maxExceptions = 2;",
        "    public int $timeout = 30;",
        "",
        "    public function handle(InvoiceService $service): void",
        "    {",
        "        $service->send($this->invoice);",
        "    }",
        "",
        "    public function failed(Throwable $e): void",
        "    {",
        "        Log::error('Invoice yuborilmadi', ['id' => $this->invoice->id]);",
        "    }",
        "}"
      ]
    },
    {
      "title": "Vaqt chegarasi bilan retryUntil",
      "lang": "php",
      "code": [
        "public function retryUntil(): DateTimeInterface",
        "{",
        "    // 1 soat ichida istalgancha urinish",
        "    return now()->addHour();",
        "}"
      ]
    },
    {
      "title": "Exception'larni cheklash middleware'i",
      "lang": "php",
      "code": [
        "use Illuminate\\Queue\\Middleware\\ThrottlesExceptions;",
        "",
        "public function middleware(): array",
        "{",
        "    // 5 ta exception dan keyin 10 daqiqa kutadi",
        "    return [new ThrottlesExceptions(5, 10)];",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Idempotent bo'lmagan job'ni retry bilan ishga tushirish: to'lov ikki marta yechiladi, email ikki marta ketadi.",
    "`$backoff` bermaslik: urinishlar darhol ketma-ket bo'lib, ishlamay turgan servisni yanada yuklaydi.",
    "Doimiy xatoga ham ko'p urinish berish: ma'lumot noto'g'ri bo'lsa 10 marta urinish foydasiz, navbatni band qiladi.",
    "`retry_after` (queue ulanishi) job `timeout` idan kichik bo'lib qolishi: job tugamasdan ikkinchi worker uni olib, ikki marta bajaradi."
  ]
});
