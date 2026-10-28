/* Chuqur dars: 13.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("13.8", {
  "lesson": [
    "### Observer nima",
    "Observer — bitta modelning event'larini (13.7) bitta klassda yig'adigan tinglovchi. Metod nomlari event nomlari bilan bir xil: `creating`, `created`, `updated`, `deleted`, `restored`, `forceDeleted` va hokazo. Har metod model instance'ni oladi.",
    "",
    "`php artisan make:observer OrderObserver --model=Order`",
    "",
    "### Ro'yxatdan o'tkazish",
    "- Laravel 10+: model ustida atribut `#[ObservedBy([OrderObserver::class])]`. Eng aniq usul: modelni ochgan odam observer borligini ko'radi.",
    "- Yoki `AppServiceProvider::boot()` ichida `Order::observe(OrderObserver::class)`.",
    "",
    "Observer container orqali yaratiladi, shuning uchun konstruktorda dependency injection ishlaydi.",
    "",
    "### Tranzaksiyadan keyin",
    "`implements ShouldHandleEventsAfterCommit` (Laravel 10+) qo'shilsa, observer metodlari ochiq tranzaksiya commit bo'lgandan keyin chaqiriladi. Rollback bo'lsa, umuman chaqirilmaydi. Tashqi tizimlarga ta'sir qiluvchi observer'lar (search index, cache, webhook) uchun bu muhim.",
    "",
    "### Odatiy qo'llanishlar",
    "- **Audit log:** `updated` da `getChanges()` va `getOriginal()` ni yozish.",
    "- **Cache invalidatsiya:** `saved`, `deleted` da kalitlarni tozalash.",
    "- **Qidiruv indeksi:** Laravel Scout ham ichida observer ishlatadi.",
    "- **Hisoblangan maydonlar:** `creating` da `number` yoki `uuid` generatsiya.",
    "- **Bog'liq ma'lumotni tozalash:** `deleting` da fayllarni o'chirish.",
    "",
    "### Observer'ni testda",
    "Observer'ni alohida unit test qilish oson. Feature testda kerak bo'lmasa, `Order::withoutEvents(fn () => ...)` yoki `Event::fake()` bilan o'chirish mumkin. Lekin `Event::fake()` model event'larini ham soxtalashtiradi va factory'ning `creating` mantiqi ishlamay qolishi mumkin. Shuning uchun `Event::fake([OrderPlaced::class])` kabi aniq ro'yxat bering.",
    "",
    "### Cheklovlar va xavflar",
    "- Mass amallarda (`where()->update()`) observer ishlamaydi (13.2).",
    "- Observer ichida boshqa modelni saqlash zanjir reaksiyani keltirib chiqarishi mumkin. Observer A → model B → observer B → model A.",
    "- Ko'p observer'li tizimda `save()` ning to'liq ta'sirini tushunish qiyin. Ularni texnik vazifalar bilan cheklang.",
    "- Og'ir ishlarni (HTTP, email) observer ichida sinxron qilmang. Job dispatch qiling."
  ],
  "examples": [
    {
      "title": "Audit observer",
      "lang": "php",
      "code": [
        "use Illuminate\\Contracts\\Events\\ShouldHandleEventsAfterCommit;",
        "",
        "class OrderObserver implements ShouldHandleEventsAfterCommit",
        "{",
        "    public function __construct(private AuditLogger $audit) {}",
        "",
        "    public function updated(Order $order): void",
        "    {",
        "        $changes = Arr::except($order->getChanges(), ['updated_at']);",
        "        if ($changes === []) {",
        "            return;",
        "        }",
        "",
        "        $this->audit->log($order, before: Arr::only($order->getOriginal(), array_keys($changes)), after: $changes);",
        "    }",
        "",
        "    public function deleted(Order $order): void",
        "    {",
        "        Cache::tags(['orders'])->flush();",
        "    }",
        "}",
        "",
        "#[ObservedBy([OrderObserver::class])]",
        "class Order extends Model {}"
      ],
      "note": "`Cache::tags()` faqat Redis va Memcached driver'larida ishlaydi."
    },
    {
      "title": "Observer testi",
      "lang": "php",
      "code": [
        "it('writes audit entry when status changes', function () {",
        "    $order = Order::factory()->create(['status' => 'pending']);",
        "",
        "    $order->update(['status' => 'paid']);",
        "",
        "    $this->assertDatabaseHas('audit_logs', [",
        "        'auditable_id' => $order->id,",
        "        'after->status' => 'paid',",
        "    ]);",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "Observer'ni ro'yxatdan o'tkazmasdan ishlaydi deb kutish: `#[ObservedBy]` yoki `observe()` kerak.",
    "Observer ichida `$model->save()` chaqirib, cheksiz siklga tushish.",
    "Mass update orqali o'zgarishlarni audit observer ushlaydi deb o'ylash.",
    "Observer'da sinxron tashqi API chaqiruvi: har `save()` sekinlashadi va tashqi servis yiqilsa, saqlash ham yiqiladi."
  ]
});
