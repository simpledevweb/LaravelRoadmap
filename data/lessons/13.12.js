/* Chuqur dars: 13.12. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("13.12", {
  "lesson": [
    "### N+1 qanday paydo bo'ladi",
    "Eloquent relation'larni **lazy** yuklaydi: `$post->author` birinchi marta o'qilganda alohida SQL so'rov yuboriladi. Agar bu sikl ichida takrorlansa, jami so'rovlar soni `1 + N` bo'ladi: 1 ta ro'yxat so'rovi va N ta relation so'rovi.",
    "",
    "100 ta post uchun bu **101 ta so'rov**. Har bir so'rov o'zida tez bo'lishi mumkin (1-2 ms), lekin tarmoq kechikishi, ulanishlar soni va baza yuklamasi yig'ilib sahifani sekinlashtiradi. Muammo ma'lumot ko'paygan sari seziladi: development da 10 ta yozuv bilan ko'rinmaydi, production da 10 000 ta bilan sahifa qotib qoladi.",
    "",
    "### Qayerda yashiringan bo'ladi",
    "- Blade sikli ichida `$order->customer->name`",
    "- API Resource ichida har bir element uchun `$this->author->name`",
    "- Accessor (`getFullNameAttribute()`) ichida relation'ga murojaat",
    "- Sikl ichida `$user->posts->count()` yoki `$user->posts()->count()`",
    "",
    "### Qanday topiladi",
    "1. **Laravel Debugbar yoki Telescope:** bitta so'rovdagi query lar soni va takrorlanuvchi so'rovlar ko'rinadi.",
    "2. `Model::preventLazyLoading()`: development da lazy loading exception beradi, muammo kodga tushmasdan topiladi.",
    "3. **Testda so'rovlar sonini tekshirish:** ro'yxat uzunligi o'zgarganda so'rovlar soni o'zgarmasligi kerak.",
    "",
    "### Qanday tuzatiladi",
    "- `with()` bilan relation'ni oldindan yuklash: 101 ta so'rov 2 taga tushadi.",
    "- `withCount()` sonni bitta so'rovda hisoblaydi (`posts_count` ustuni).",
    "- `whenLoaded()` API Resource da relation yuklanmagan bo'lsa, uni lazy yuklab yubormaydi.",
    "",
    "Eager loading ham bepul emas: ortiqcha relation yuklash xotirani to'ldiradi. Faqat kerakli relation va ustunlarni oling (`with('author:id,name')`; tashqi kalit ustuni (`id`) ham ro'yxatda bo'lishi shart)."
  ],
  "examples": [
    {
      "title": "Muammo va tuzatish",
      "lang": "php",
      "code": [
        "// Yomon: 1 + 100 ta so'rov",
        "$posts = Post::all();",
        "foreach ($posts as $post) {",
        "    echo $post->author->name;",
        "}",
        "",
        "// Yaxshi: 2 ta so'rov, faqat kerakli ustunlar",
        "$posts = Post::with('author:id,name')->get();",
        "foreach ($posts as $post) {",
        "    echo $post->author->name;",
        "}"
      ],
      "note": "Ikkinchi so'rov `select * from users where id in (...)` ko'rinishida bo'ladi."
    },
    {
      "title": "withCount va API Resource da whenLoaded",
      "lang": "php",
      "code": [
        "// Controller: sonni bitta so'rovda hisoblash",
        "$users = User::withCount('posts')->paginate(20);",
        "",
        "// Resource: relation yuklanmagan bo'lsa, lazy load qilmaydi",
        "class UserResource extends JsonResource",
        "{",
        "    public function toArray($request): array",
        "    {",
        "        return [",
        "            'id'          => $this->id,",
        "            'posts_count' => $this->posts_count,",
        "            'latest_post' => new PostResource($this->whenLoaded('latestPost')),",
        "        ];",
        "    }",
        "}"
      ],
      "note": "`whenLoaded()` bo'lmasa, Resource har bir element uchun relation'ni jimgina yuklab, N+1 ni qaytaradi."
    },
    {
      "title": "Lazy loading'ni taqiqlash va testda sanash",
      "lang": "php",
      "code": [
        "// AppServiceProvider::boot()",
        "Model::preventLazyLoading(! app()->isProduction());",
        "",
        "// Test",
        "DB::enableQueryLog();",
        "$this->get('/posts')->assertOk();",
        "",
        "expect(count(DB::getQueryLog()))->toBeLessThan(6);"
      ]
    }
  ],
  "pitfalls": [
    "`with()` ni sikl ichida chaqirish: har iteratsiyada yangi so'rov yuboriladi va N+1 yo'qolmaydi.",
    "Ichma-ich relation'ni unutish: `with('comments')` yetmaydi, `comments.user` kerak bo'lsa `with('comments.user')` yozing.",
    "`with('author:id,name')` da tashqi kalit ustunini (masalan `author_id` yoki `id`) tushirib qoldirish: relation bo'sh qaytadi.",
    "Production da `preventLazyLoading()` ni yoqib qo'yish: kutilmagan exception foydalanuvchiga ko'rinadi. Uni faqat development/test da yoqing."
  ]
});
