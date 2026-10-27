/* Chuqur dars: 5.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("5.16", {
  "lesson": [
    "### Proxy",
    "**Proxy** — boshqa obyekt uchun **o'rinbosar**: haqiqiy obyektga kirishni nazorat qiladi, lekin **bir xil interface**ga ega. Mijoz proxy bilan haqiqiy obyektni farqlamaydi.",
    "",
    "### Turlari",
    "- **Virtual proxy (lazy):** og'ir obyektni birinchi murojaatgacha yaratmaydi. PHP 8.4 `newLazyProxy`/`newLazyGhost`.",
    "- **Protection proxy:** ruxsatni tekshiradi.",
    "- **Remote proxy:** masofaviy xizmatni lokaldek ko'rsatadi (RPC/API klient).",
    "- **Caching proxy:** natijani keshlaydi.",
    "- **Logging/Smart proxy:** chaqiruvlarni yozadi, hisoblaydi.",
    "",
    "### Decorator bilan farq",
    "Struktura o'xshash (ikkalasi o'raydi). Decorator — **funksiya qo'shadi**; Proxy — **kirishni boshqaradi** (yaratish vaqti, ruxsat, joylashuv).",
    "",
    "### Laravel/ORM'da",
    "- Eloquent **lazy loading** munosabatlari (`$post->author` birinchi murojaatda yuklanadi) — virtual proxy g'oyasi.",
    "- Doctrine proxy klasslari.",
    "- Laravel Facade'lari (container'ga proxy) va `Cache::lock`, `Http::fake`.",
    "- Mockery/PHPUnit mock'lari — proxy.",
    "",
    "### Qachon",
    "Qimmat resurs, ruxsat/kesh/log qatlami, masofaviy xizmat.",
    "",
    "### Ehtiyot",
    "Proxy xatti-harakatni o'zgartirmasligi kerak (LSP). Nosoz lazy yuklash N+1 muammosini yashiradi."
  ],
  "examples": [
    {
      "title": "Lazy (virtual) proxy",
      "lang": "php",
      "code": [
        "interface Report { public function data(): array; }",
        "final class HeavyReport implements Report { public function __construct(private string $id) { /* sekin yuklash */ } public function data(): array { return []; } }",
        "",
        "final class LazyReport implements Report",
        "{",
        "    private ?Report $real = null;",
        "    public function __construct(private string $id) {}",
        "    public function data(): array { return ($this->real ??= new HeavyReport($this->id))->data(); }",
        "}",
        "// PHP 8.4: (new ReflectionClass(HeavyReport::class))->newLazyProxy(fn () => new HeavyReport('r1'));"
      ]
    }
  ],
  "pitfalls": [
    "Proxy asl obyekt xatti-harakatini o'zgartirsa (LSP) kutilmagan yon ta'sir beradi.",
    "Lazy yuklash N+1 so'rovlarni yashiradi: eager loading ishlating.",
    "Proxy va Decorator'ni adashtirmang: birinchisi kirishni, ikkinchisi funksiyani boshqaradi.",
    "Masofaviy proxy tarmoq xatolarini oddiy metoddek yashirsa chaqiruvchi xatoga tayyor bo'lmaydi."
  ]
});
