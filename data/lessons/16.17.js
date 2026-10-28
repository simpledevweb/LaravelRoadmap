/* Chuqur dars: 16.17. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("16.17", {
  "lesson": [
    "### DB ichki keshi va ilova keshi",
    "MySQL 5.x da **query cache** bor edi: bir xil SQL matni uchun natijani saqlardi. Lekin jadvalga har qanday yozuv shu jadvaldagi barcha keshlangan natijalarni o'chirardi va global mutex tufayli ko'p yadroli serverda tor joyga aylanardi. **MySQL 8.0 da u butunlay olib tashlangan.** PostgreSQL'da natija keshi umuman yo'q. Sahifalar `shared_buffers` da keshlanadi, natijalar esa yo'q.",
    "",
    "Shuning uchun natijalarni keshlash **ilova darajasida**: Laravel `Cache` (Redis, Memcached).",
    "",
    "### Qachon keshlash kerak",
    "Uchala shart birga bo'lsa:",
    "1. So'rov **og'ir** (yuzlab ms yoki DB'ni sezilarli yuklaydi).",
    "2. Natija **tez-tez o'qiladi**.",
    "3. Natija **kam o'zgaradi** yoki biroz eskirgan bo'lishi qabul qilinadi.",
    "",
    "Misollar: ma'lumotnomalar (kategoriyalar, shaharlar), dashboard statistikasi, \"eng mashhur mahsulotlar\", sozlamalar, ommaviy sahifalar. Mos emas: balans, ombor qoldig'i, foydalanuvchining shaxsiy va tez o'zgaradigan ma'lumoti.",
    "",
    "### Kesh kaliti",
    "Kalit natijaga ta'sir qiluvchi **barcha** parametrlarni o'z ichiga olishi kerak: tenant, foydalanuvchi yoki rol (agar natija huquqqa bog'liq bo'lsa), til, filtrlar, sahifa, saralash. Birortasi tushib qolsa, bir foydalanuvchi boshqasining ma'lumotini ko'radi. Bu xavfsizlik muammosi. Kalitga versiya prefiksi qo'shing (`v2:`): tuzilma o'zgarganda eski keshlar avtomatik eskiradi.",
    "",
    "### Invalidatsiya",
    "\"Kompyuter fanidagi ikki qiyin narsadan biri.\" Strategiyalar:",
    "- **TTL:** eng sodda. N daqiqadan keyin eskiradi. Eskirish qabul qilinsa, yetarli.",
    "- **Hodisa bo'yicha:** model observer'ida `Cache::forget()` (13.8). Aniq, lekin barcha yozish yo'llarini (mass update ham) qamrash kerak.",
    "- **Tag'lar:** `Cache::tags(['products'])->flush()` (faqat Redis va Memcached).",
    "- **Versiya kaliti:** `products:version` ni oshirish, kalitlar shu versiyani o'z ichiga oladi.",
    "",
    "### Cache stampede",
    "Mashhur kesh eskirgan zahoti yuzlab so'rov bir vaqtda og'ir so'rovni qayta bajaradi va DB yiqiladi. Yechimlar: `Cache::lock()` bilan faqat bitta jarayon qayta hisoblasin. `Cache::flexible()` (Laravel 11.23+, stale-while-revalidate) eskirgan qiymatni qaytarib, fonda yangilaydi. TTL'ga tasodifiy jitter qo'shing.",
    "",
    "### Avval optimallashtirish",
    "Kesh sekin so'rovni yashiradi, tuzatmaydi. Kesh bo'sh bo'lganda (deploy, Redis restart) sekinlik qaytadi. Avval indeks va so'rovni tuzating (16.1–16.14), keyin keshlang. Keshni ham monitoring qiling: hit ratio va xotira."
  ],
  "examples": [
    {
      "title": "To'g'ri kalit va TTL",
      "lang": "php",
      "code": [
        "public function salesReport(int $tenantId, CarbonInterface $from, CarbonInterface $to): array",
        "{",
        "    $key = sprintf('v1:reports:sales:%d:%s:%s', $tenantId, $from->toDateString(), $to->toDateString());",
        "",
        "    return Cache::remember($key, now()->addMinutes(15), fn () => $this->buildSalesReport($tenantId, $from, $to));",
        "}",
        "",
        "// Stale-while-revalidate (Laravel 11.23+): 5 daqiqa yangi, 15 daqiqagacha eskirgan qaytariladi",
        "$top = Cache::flexible('v1:products:top', [300, 900], fn () => Product::topSelling(10));"
      ]
    },
    {
      "title": "Hodisa bo'yicha invalidatsiya va lock",
      "lang": "php",
      "code": [
        "class CategoryObserver",
        "{",
        "    public function saved(Category $c): void { Cache::forget('v1:categories:tree'); }",
        "    public function deleted(Category $c): void { Cache::forget('v1:categories:tree'); }",
        "}",
        "",
        "// Stampede'dan himoya",
        "$value = Cache::get('v1:dashboard:stats');",
        "if ($value === null) {",
        "    $value = Cache::lock('lock:dashboard:stats', 30)->block(10, function () {",
        "        return Cache::remember('v1:dashboard:stats', 600, fn () => $this->computeStats());",
        "    });",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Kesh kalitiga tenant yoki foydalanuvchini qo'shmaslik: boshqa mijozning ma'lumoti ko'rinadi.",
    "Mass update'dan keyin observer'ga tayangan invalidatsiya ishlamasligi: eskirgan ma'lumot uzoq qoladi.",
    "Sekin so'rovni tuzatish o'rniga keshlash: kesh bo'shaganda sayt yiqiladi.",
    "Mashhur kalit uchun stampede himoyasini qo'ymaslik: TTL tugaganda DB'ga bir vaqtda yuzlab og'ir so'rov."
  ]
});
