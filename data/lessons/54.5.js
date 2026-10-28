/* Chuqur dars: 54.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("54.5", {
  "lesson": [
    "### Kesh kalitlari",
    "Yaxshi kalit — keshning ishonchliligi va samaradorligi asosi.",
    "",
    "### Qoidalar",
    "1. **Aniq va noyob:** hamma ta'sir qiluvchi parametr kalitda: `posts:list:user:5:page:2:sort:new`. Aks holda boshqa so'rov javobi qaytadi (**kesh zaharlanishi/aralashishi**).",
    "2. **Izchil format:** `{obyekt}:{id}:{maydon}` yoki `{modul}.{tur}.{parametrlar}`.",
    "3. **Prefiks/namespace:** ilova/tenant/muhit: `app:prod:tenant:7:user:5`. Multi-tenant'da `tenant_id` shart (ma'lumot sizishi!).",
    "4. **Versiya:** `user:5:v2` (sxema o'zgarsa eski keshni ishlatmaslik).",
    "5. **Qisqa lekin tushunarli:** uzun kalit xotira va tarmoq sarfi; juda uzun parametrlar → xesh (`md5(json_encode($params))`).",
    "6. **Deterministik:** parametr tartibi bir xil (`ksort`) — `?a=1&b=2` va `?b=2&a=1` bir kalit.",
    "7. **Maxfiy ma'lumotsiz:** kalitda parol/token yo'q (loglarda ko'rinadi).",
    "8. Redis Cluster: bog'liq kalitlar uchun hash tag `{user:5}`.",
    "",
    "### Xatolar",
    "- Parametrni kalitga qo'shmaslik (foydalanuvchi A ning ma'lumoti B'ga).",
    "- Tasodifiy/vaqtga bog'liq kalit (hech qachon hit emas).",
    "- Foydalanuvchi kiritmasini to'g'ridan kalitga (kalit injection: ko'p ko'p kalitlar, xotira to'lishi).",
    "",
    "### Kalit generator",
    "Markazlashgan funksiya/klass: `CacheKey::post($id)`; kalit nomlari kodda tarqalmasin.",
    "",
    "### Laravel",
    "`Cache::remember(\"posts:{$id}\", ...)`, `Cache::tags()`, `config('cache.prefix')` avtomatik prefiks."
  ],
  "examples": [
    {
      "title": "Kalit generator",
      "lang": "php",
      "code": [
        "final class CacheKey",
        "{",
        "    public static function postList(int $tenantId, array $filters, int $page): string",
        "    {",
        "        ksort($filters);",
        "        return \"t:{$tenantId}:posts:list:v2:\" . md5(json_encode($filters)) . \":p{$page}\";",
        "    }",
        "    public static function user(int $tenantId, int $id): string { return \"t:{$tenantId}:user:{$id}:v1\"; }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Tenant/foydalanuvchi parametrini kalitga qo'shmaslik boshqa mijoz ma'lumotini ko'rsatadi.",
    "Parametr tartibi turlicha bo'lsa bir xil so'rov turli kalit oladi: `ksort`.",
    "Foydalanuvchi kiritmasini to'g'ridan kalitga qo'yish xotirani to'ldiruvchi kalitlar hosil qiladi.",
    "Kalit nomlari kodda tarqalsa invalidatsiya paytida topib bo'lmaydi: markazlashtiring."
  ]
});
