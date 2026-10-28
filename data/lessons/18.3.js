/* Chuqur dars: 18.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("18.3", {
  "lesson": [
    "### Ikki muhim xususiyat",
    "- **Xavfsiz (safe):** metod server holatini o'zgartirmaydi. Faqat o'qish. GET, HEAD, OPTIONS.",
    "- **Idempotent:** bir xil so'rovni bir necha marta yuborish natijasi bir marta yuborgandek. GET, HEAD, OPTIONS, PUT, DELETE.",
    "",
    "Bu xususiyatlar mijozlar, brauzerlar, proxy'lar va retry mexanizmlari uchun shartnoma: ular xavfsiz va idempotent so'rovlarni bemalol qayta yuboradi yoki keshlaydi.",
    "",
    "### Metodlar",
    "- **GET** — resurs yoki kolleksiyani o'qish. Xavfsiz, idempotent, keshlanadi. Body yubormaydi.",
    "- **POST** — yangi resurs yaratish yoki CRUD'ga sig'maydigan amal. Xavfsiz ham, idempotent ham emas: ikki marta yuborilsa, ikki buyurtma. Idempotentlik kerak bo'lsa, `Idempotency-Key` (18.14).",
    "- **PUT** — resursni **to'liq** almashtirish. Yuborilmagan maydonlar default yoki `null` bo'ladi. Idempotent: bir xil body'ni qayta yuborish natijani o'zgartirmaydi. Ma'lum URL'ga yaratish uchun ham ishlatiladi (`PUT /settings/theme`).",
    "- **PATCH** — **qisman** yangilash. Faqat yuborilgan maydonlar o'zgaradi. Ko'p API'larda eng ko'p ishlatiladigan yangilash metodi. Idempotent bo'lishi shart emas: `{\"op\": \"increment\"}` kabi amallar idempotent emas.",
    "- **DELETE** — o'chirish. Idempotent: ikkinchi chaqiruv ham \"yo'q\" holatiga olib keladi. Javob: birinchisiga 204, ikkinchisiga 204 yoki 404. Ikkalasi ham to'g'ri, izchil bo'ling.",
    "- **HEAD** — GET kabi, lekin faqat header'lar. Fayl hajmini yoki mavjudligini tekshirish.",
    "- **OPTIONS** — qaysi metodlar ruxsat etilganini bildiradi. Brauzer CORS preflight uchun avtomatik yuboradi.",
    "",
    "### GET bilan holat o'zgartirmang",
    "`GET /orders/42/delete` yoki `GET /unsubscribe?email=...` xavfli:",
    "- Qidiruv botlari va havola oldindan ko'ruvchilar (Telegram, Slack preview) havolalarni ochadi.",
    "- Brauzer prefetch qiladi.",
    "- Proxy va CDN keshlaydi.",
    "- CSRF himoyasi odatda GET'ga qo'llanmaydi.",
    "",
    "Natijada amal foydalanuvchi bilmasdan bajariladi.",
    "",
    "### Laravel'da",
    "- `Route::get/post/put/patch/delete`, `Route::match(['put', 'patch'], ...)`. `apiResource` `update` uchun ikkalasini ham ro'yxatga oladi.",
    "- HTML formalar faqat GET va POST yubora oladi. `@method('PATCH')` yashirin `_method` maydonini qo'shadi va Laravel uni haqiqiy metod deb qabul qiladi.",
    "- PATCH uchun validatsiyada `sometimes` qoidasi: maydon yuborilgan bo'lsa tekshiriladi, yuborilmasa o'tkazib yuboriladi.",
    "- PUT uchun barcha maydonlar `required`."
  ],
  "examples": [
    {
      "title": "PUT va PATCH farqi",
      "lang": "http",
      "code": [
        "PUT /api/users/7",
        "Content-Type: application/json",
        "",
        "{\"name\": \"Ali\", \"email\": \"ali@x.uz\", \"phone\": null}",
        "",
        "### barcha maydonlar almashtiriladi",
        "",
        "PATCH /api/users/7",
        "Content-Type: application/json",
        "",
        "{\"phone\": \"+998901234567\"}",
        "",
        "### faqat phone o'zgaradi"
      ]
    },
    {
      "title": "PATCH validatsiyasi",
      "lang": "php",
      "code": [
        "class UpdateUserRequest extends FormRequest",
        "{",
        "    public function rules(): array",
        "    {",
        "        $required = $this->isMethod('put') ? 'required' : 'sometimes';",
        "",
        "        return [",
        "            'name' => [$required, 'string', 'max:100'],",
        "            'email' => [$required, 'email', Rule::unique('users')->ignore($this->route('user'))],",
        "            'phone' => [$required, 'nullable', 'string', 'max:20'],",
        "        ];",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "GET so'rov bilan ma'lumot o'zgartirish: botlar, prefetch va keshlar amalni tasodifan bajaradi.",
    "PUT'ni qisman yangilash uchun ishlatish: yuborilmagan maydonlar tasodifan `null` bo'lib qoladi yoki semantika noaniq.",
    "POST'ni idempotent deb hisoblab, mijozda avtomatik retry yoqish: dublikat buyurtmalar.",
    "PATCH validatsiyasida `required` qoldirish: qisman yangilash imkonsiz bo'ladi."
  ]
});
