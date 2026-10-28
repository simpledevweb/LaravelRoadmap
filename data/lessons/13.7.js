/* Chuqur dars: 13.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("13.7", {
  "lesson": [
    "### Model event'lari",
    "Eloquent model hayot siklining muhim nuqtalarida event chiqaradi:",
    "- `retrieved`: DB'dan yuklanganda.",
    "- `creating` → `created`: yangi yozuv INSERT oldidan va keyin.",
    "- `updating` → `updated`: mavjud yozuv UPDATE oldidan va keyin (faqat dirty bo'lsa).",
    "- `saving` → `saved`: create va update ikkalasida ham (`creating`/`updating` dan oldin va keyin).",
    "- `deleting` → `deleted`, soft delete uchun `trashed` (Laravel 10+), `restoring` → `restored`, `forceDeleting` → `forceDeleted`.",
    "- `replicating`.",
    "",
    "**\"-ing\" event'lar** amaldan oldin chiqadi. Listener `false` qaytarsa, amal bekor qilinadi (`save()` `false` qaytaradi). **\"-ed\" event'lar** amaldan keyin chiqadi.",
    "",
    "### Tinglash usullari",
    "1. Modelning `booted()` metodida yopilma: `static::creating(fn (Order $o) => ...)`. Kichik va modelga xos mantiq uchun.",
    "2. `$dispatchesEvents`: model event'ini o'zingizning event klassingizga bog'laydi: `['created' => OrderPlaced::class]`. Keyin oddiy listener va queue bilan ishlaydi.",
    "3. **Observer** (13.8): barcha event'lar bitta klassda.",
    "",
    "### Qachon chiqmaydi",
    "Event'lar faqat **model instance** orqali amal bajarilganda chiqadi:",
    "- `Model::where(...)->update()` va `->delete()` (mass amallar): event yo'q.",
    "- `DB::table()`, `insert()`, `upsert()`: event yo'q.",
    "- `saveQuietly()`, `deleteQuietly()`, `Model::withoutEvents(fn)`: atayin o'chirilgan.",
    "",
    "### Tranzaksiya bilan munosabat",
    "`created` event INSERT bajarilgandan keyin chiqadi, lekin tranzaksiya hali commit bo'lmagan bo'lishi mumkin. Agar listener email yuborsa yoki job dispatch qilsa va tranzaksiya rollback bo'lsa, mavjud bo'lmagan buyurtma haqida email ketadi. Yechimlar:",
    "- Observer'da `implements ShouldHandleEventsAfterCommit` (Laravel 10+).",
    "- Job'da `->afterCommit()` yoki `config/queue.php` da `'after_commit' => true`.",
    "- `DB::afterCommit(fn () => ...)`.",
    "",
    "### Yaxshi amaliyot",
    "Model event'lari texnik vazifalar uchun yaxshi: UUID yoki slug generatsiyasi, cache tozalash, audit, `created_by` to'ldirish. Muhim biznes jarayonlarini (to'lov, bildirishnoma zanjiri) yashirin event'larga yashirmang. Kodni o'qigan odam `$order->save()` dan keyin nima bo'lishini ko'rmaydi. Bunday jarayonlar uchun aniq domen event'lari (`OrderPlaced`) va action klasslar yaxshiroq."
  ],
  "examples": [
    {
      "title": "booted() ichida event'lar",
      "lang": "php",
      "code": [
        "class Post extends Model",
        "{",
        "    protected static function booted(): void",
        "    {",
        "        static::creating(function (Post $post) {",
        "            $post->slug ??= Str::slug($post->title);",
        "            $post->author_id ??= auth()->id();",
        "        });",
        "",
        "        static::updating(function (Post $post) {",
        "            if ($post->isDirty('published_at') && $post->getOriginal('published_at')) {",
        "                return false; // nashr sanasini qayta o'zgartirish taqiqlangan",
        "            }",
        "        });",
        "",
        "        static::saved(fn (Post $post) => Cache::forget(\"post:{$post->id}\"));",
        "    }",
        "}"
      ]
    },
    {
      "title": "Domen event'iga bog'lash va jim saqlash",
      "lang": "php",
      "code": [
        "class Order extends Model",
        "{",
        "    protected $dispatchesEvents = [",
        "        'created' => OrderPlaced::class,",
        "    ];",
        "}",
        "",
        "class SendOrderConfirmation implements ShouldQueue",
        "{",
        "    public bool $afterCommit = true;",
        "",
        "    public function handle(OrderPlaced $event): void",
        "    {",
        "        Mail::to($event->order->customer)->send(new OrderConfirmed($event->order));",
        "    }",
        "}",
        "",
        "// Import paytida event'larsiz",
        "$order->saveQuietly();"
      ]
    }
  ],
  "pitfalls": [
    "Mass update yoki `insert()` dan keyin event yoki observer ishlaydi deb kutish.",
    "`created` listener'ida tranzaksiya commit bo'lishidan oldin email yuborish yoki job dispatch qilish.",
    "`updated` ichida `$model->save()` chaqirish: cheksiz rekursiya. `saveQuietly()` yoki `updating` dan foydalaning.",
    "Muhim biznes mantiqni yashirin model event'lariga yozish: testda va debug'da kutilmagan yon ta'sirlar."
  ]
});
