/* Chuqur dars: 19.2. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("19.2", {
  "lesson": [
    "### Yaxshi URI xususiyatlari",
    "- **Ierarxik:** egalikni ko'rsatadi (`/customers/7/addresses`).",
    "- **Qisqa va bashorat qilinadigan:** dasturchi bitta endpoint'ni ko'rib, boshqasini taxmin qila oladi.",
    "- **Barqaror:** resursning \"manzili\" o'zgarmaydi. Saqlangan havolalar, keshlar va integratsiyalar unga tayanadi.",
    "",
    "### Path va query",
    "Identifikator — path'da (`/orders/42`). Ko'rinishni o'zgartiruvchi narsa — query'da: filtr, saralash, sahifa, maydonlar (18.9). Bir resursga murojaat qilishning **bitta asosiy** yo'li bo'lsin.",
    "",
    "### Ichma-ichlik chuqurligi",
    "- Kolleksiya konteksti uchun bitta daraja: `/orders/{order}/items`.",
    "- Ikkidan chuqur emas. `/customers/7/orders/42/items/3/discounts` o'rniga `/order-items/3/discounts`.",
    "- Bola o'z global ID'siga ega bo'lsa, unga to'g'ridan-to'g'ri murojaat (shallow): `/order-items/3`.",
    "- Bir resursga bir nechta kontekstdan kirish mumkin: `/customers/7/orders` va `/orders?customer_id=7`. Ikkalasi ham bitta resurs to'plamini qaytarsin. Lekin ulardan birini asosiy deb tanlang va hujjatda ko'rsating.",
    "",
    "### Identifikatorlar",
    "Ommaviy API'larda ketma-ket butun ID'lar (`/orders/42`):",
    "- biznes hajmini oshkor qiladi (\"bugun 42-buyurtma\"),",
    "- sanab chiqishni osonlashtiradi (avtorizatsiya xatosi bo'lsa, IDOR oqibati kattaroq),",
    "- turli tizimlarni birlashtirishda to'qnashadi.",
    "",
    "Muqobillar:",
    "- **ULID:** 26 belgili, vaqt bo'yicha tartiblanadi va indeksga qulay. Laravel `HasUlids`.",
    "- **UUID v4** (tasodifiy) yoki **v7** (vaqt asosida, tartiblanadi).",
    "- **Slug:** inson o'qiy oladigan (`/posts/laravel-queues`). Nom o'zgarganda eski slug'dan yo'naltirish kerak.",
    "- Prefiksli ID (Stripe uslubi): `ord_01J0ZK...`. Log'da qaysi resurs ekani darhol ko'rinadi.",
    "",
    "Ichki DB'da `bigint` PK saqlab, API'da alohida `public_id` (ULID) ochish keng tarqalgan yondashuv: JOIN'lar tez, tashqi ID esa xavfsiz.",
    "",
    "### Prefiks va versiya",
    "`/api/v1/...` — barcha endpoint'lar uchun umumiy prefiks. Alohida subdomen (`api.example.uz`) yanada aniq ajratadi: alohida CORS, rate limit va kesh siyosati.",
    "",
    "### Laravel'da",
    "Route model binding'da `getRouteKeyName()` yoki `{order:public_id}`. `->whereUlid('order')` noto'g'ri formatni route darajasida rad etadi."
  ],
  "examples": [
    {
      "title": "URI tuzilmasi",
      "lang": "text",
      "code": [
        "/api/v1/orders                         kolleksiya",
        "/api/v1/orders/{order}                 element",
        "/api/v1/orders/{order}/items           bola kolleksiya (kontekst bilan)",
        "/api/v1/order-items/{item}             bola element (shallow)",
        "/api/v1/orders?customer_id=01J...      filtr sifatida",
        "",
        "Yomon: /api/v1/customers/7/orders/42/items/3/discounts/1"
      ]
    },
    {
      "title": "Tashqi ULID va ichki bigint",
      "lang": "php",
      "code": [
        "// Migratsiya",
        "$table->id();",
        "$table->ulid('public_id')->unique();",
        "",
        "// Model",
        "class Order extends Model",
        "{",
        "    use HasUlids;",
        "",
        "    public function uniqueIds(): array",
        "    {",
        "        return ['public_id'];   // id emas, faqat public_id ULID",
        "    }",
        "",
        "    public function getRouteKeyName(): string",
        "    {",
        "        return 'public_id';",
        "    }",
        "}",
        "",
        "Route::get('orders/{order}', [OrderController::class, 'show'])->whereUlid('order');"
      ]
    }
  ],
  "pitfalls": [
    "Uch-to'rt darajali ichma-ich URI'lar.",
    "Ommaviy API'da ketma-ket int ID'larni ochish: biznes hajmi oshkor va sanash oson.",
    "Slug'ni o'zgartirib, eski havolalarni yo'naltirmaslik.",
    "Bir resursga turli yo'llar orqali turli natija qaytarish."
  ]
});
