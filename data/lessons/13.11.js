/* Chuqur dars: 13.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("13.11", {
  "lesson": [
    "### Lazy va eager loading farqi",
    "**Lazy loading:** relation birinchi marta o'qilganda (`$post->comments`) so'rov yuboriladi. Qulay, lekin sikl ichida N+1 ni keltirib chiqaradi.",
    "",
    "**Eager loading:** relation asosiy so'rov bilan birga, bitta qo'shimcha so'rovda yuklanadi (`Post::with('comments')`). 100 ta post bo'lsa ham 2 ta so'rov.",
    "",
    "### Qaysi usulni qachon ishlatish",
    "| Usul | Qachon |",
    "|---|---|",
    "| `with()` | Ro'yxat olinayotganda relation kerakligini oldindan bilsangiz |",
    "| `load()` | Model allaqachon olingan, keyin relation kerak bo'ldi |",
    "| `loadMissing()` | Relation yuklangan bo'lishi ham mumkin; ortiqcha so'rov yubormaslik uchun |",
    "| `withCount()` | Faqat son kerak bo'lsa (relation'ni yuklamasdan) |",
    "",
    "### Ichma-ich va shartli eager loading",
    "Nuqta bilan ichma-ich relation yuklanadi: `with('comments.user')`. Relation'ga shart ham berish mumkin: yuklanadigan yozuvlarni filtrlash yoki tartiblash uchun closure yoziladi.",
    "",
    "Diqqat: `limit()` yuklash paytida **har bir ota-yozuv uchun emas, butun so'rov uchun** qo'llanadi. \"Har postning oxirgi 3 ta kommentini\" olish uchun `latestOfMany()` (bitta oxirgi yozuv) yoki window function ishlatiladi.",
    "",
    "### Default eager loading",
    "Modelda `protected $with = ['author'];` yozilsa, har bir so'rovda author yuklanadi. Bu qulay, lekin har doim kerak bo'lmasa ortiqcha yuk bo'ladi; kerak bo'lmagan joyda `without('author')` bilan o'chirasiz."
  ],
  "examples": [
    {
      "title": "with, ichma-ich va ustun tanlash",
      "lang": "php",
      "code": [
        "$posts = Post::with([",
        "    'author:id,name',",
        "    'comments.user:id,name',",
        "])->latest()->paginate(15);"
      ]
    },
    {
      "title": "Relation'ga shart berish",
      "lang": "php",
      "code": [
        "$posts = Post::with(['comments' => function ($query) {",
        "    $query->where('approved', true)->orderByDesc('created_at');",
        "}])->get();"
      ]
    },
    {
      "title": "load va loadMissing",
      "lang": "php",
      "code": [
        "$post = Post::find($id);",
        "",
        "// Har doim yangidan so'raydi",
        "$post->load('comments');",
        "",
        "// Faqat yuklanmagan bo'lsa so'raydi",
        "$post->loadMissing('comments', 'author');"
      ]
    }
  ],
  "pitfalls": [
    "`$with` ni modelda doimiy yozib qo'yib, unutib yuborish: har so'rov ortiqcha relation yuklaydi.",
    "Eager loading bilan `limit()` ni birga ishlatib, 'har biri uchun N ta' olaman deb o'ylash.",
    "Faqat son kerak bo'lganda `with('comments')` qilib, keyin `->count()` chaqirish: butun relation xotiraga yuklanadi. `withCount('comments')` ishlating."
  ]
});
