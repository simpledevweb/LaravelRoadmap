/* Chuqur dars: 19.5. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("19.5", {
  "lesson": [
    "### Server — yagona haqiqat manbai",
    "Frontend va mobil ilovadagi validatsiya — foydalanuvchi qulayligi uchun. Xavfsizlik va yaxlitlik uchun emas: har qanday so'rovni `curl` bilan yuborish mumkin. **Har bir kiruvchi qiymat server tomonida tekshiriladi.**",
    "",
    "### Validatsiya darajalari",
    "1. **Sintaksis:** JSON to'g'rimi, `Content-Type` to'g'rimi (`400`, `415`).",
    "2. **Tip va format:** son, string, sana, email, UUID, enum qiymati.",
    "3. **Chegaralar:** uzunlik, diapazon, massiv hajmi.",
    "4. **Majburiylik:** qaysi maydon kerak, qaysi biri ixtiyoriy, qaysilari birga kelishi kerak (`required_with`, `prohibited_if`).",
    "5. **Havolalar:** `product_id` mavjudmi va **shu foydalanuvchi yoki tenant uchun ruxsat etilganmi**.",
    "6. **Biznes qoidalari:** omborda bormi, balans yetarlimi, holat ruxsat beradimi. Ular ko'pincha action yoki service darajasida (19.4 dagi 409/422).",
    "",
    "### DoS'ga qarshi chegaralar",
    "Validatsiya ham xavfsizlik vositasi:",
    "- Massivlar: `items` `max:100`. Aks holda 100 000 elementli massiv serverni band qiladi.",
    "- String uzunligi: `max:255`, matn uchun `max:10000`.",
    "- Ichma-ich chuqurlik va umumiy so'rov hajmi: Nginx `client_max_body_size`, PHP `post_max_size`.",
    "- Fayllar: tur (`mimes`, `mimetypes`), hajm (`max` KB da), rasm o'lchami (`dimensions`).",
    "",
    "### Havola validatsiyasida tenant",
    "`Rule::exists('products', 'id')` faqat mahsulot **mavjudligini** tekshiradi. Multi-tenant tizimda boshqa tenant'ning mahsulot ID'sini yuborish orqali uning ma'lumotiga ta'sir qilish mumkin. Doim doirani qo'shing: `->where('tenant_id', $tenantId)`.",
    "",
    "### Noma'lum maydonlar siyosati",
    "- **E'tiborsiz qoldirish** (Laravel default, `$request->validated()` faqat qoidalardagi maydonlarni qaytaradi). Tolerant, lekin mijoz xatosi (`emial` yozilgan) sezilmaydi.",
    "- **Rad etish:** noma'lum maydon bo'lsa `422`. Qat'iy va xatolarni tez topadi, lekin evolyutsiyani qiyinlashtiradi.",
    "",
    "Bittasini tanlang va hujjatlang. Har holda **hech qachon** `$request->all()` ni modelga bermang (13.4).",
    "",
    "### Xato javobi",
    "`422`, maydon bo'yicha xatolar, ichma-ich yo'llar (`items.0.qty`), barqaror xato kodlari (19.7). Laravel `$request->validated()` va FormRequest buni avtomatik beradi.",
    "",
    "### Query parametrlari ham",
    "GET so'rovlardagi `per_page`, `sort`, `filter` ham validatsiya qilinadi (18.9)."
  ],
  "examples": [
    {
      "title": "To'liq FormRequest",
      "lang": "php",
      "code": [
        "class StoreOrderRequest extends FormRequest",
        "{",
        "    public function authorize(): bool",
        "    {",
        "        return $this->user()->tokenCan('orders:write');",
        "    }",
        "",
        "    public function rules(): array",
        "    {",
        "        $tenantId = $this->user()->tenant_id;",
        "",
        "        return [",
        "            'delivery_address_id' => ['required', 'ulid',",
        "                Rule::exists('addresses', 'public_id')->where('customer_id', $this->user()->customer_id)],",
        "            'items' => ['required', 'array', 'min:1', 'max:100'],",
        "            'items.*.product_id' => ['required', 'ulid', 'distinct',",
        "                Rule::exists('products', 'public_id')->where('tenant_id', $tenantId)->whereNull('deleted_at')],",
        "            'items.*.qty' => ['required', 'integer', 'between:1,999'],",
        "            'note' => ['nullable', 'string', 'max:500'],",
        "            'promo_code' => ['nullable', 'string', 'alpha_dash', 'max:32'],",
        "        ];",
        "    }",
        "}"
      ]
    },
    {
      "title": "Noma'lum maydonlarni rad etish",
      "lang": "php",
      "code": [
        "protected function prepareForValidation(): void",
        "{",
        "    $allowed = ['delivery_address_id', 'items', 'note', 'promo_code'];",
        "    $unknown = array_diff(array_keys($this->all()), $allowed);",
        "",
        "    if ($unknown !== []) {",
        "        throw ValidationException::withMessages(",
        "            collect($unknown)->mapWithKeys(fn ($k) => [$k => ['Noma\\'lum maydon']])->all()",
        "        );",
        "    }",
        "}"
      ],
      "note": "Bu ixtiyoriy qat'iy siyosat. Laravel default'da noma'lum maydonlarni jim e'tiborsiz qoldiradi."
    }
  ],
  "pitfalls": [
    "Faqat frontend validatsiyasiga ishonish.",
    "`Rule::exists` ni tenant yoki egalik shartsiz ishlatish: boshqa mijozning resursiga havola qabul qilinadi.",
    "Massiv va string'larga maksimal chegara qo'ymaslik.",
    "Biznes qoidalarini faqat validatsiyada tekshirib, parallel so'rovlarda race condition'ni hisobga olmaslik (17.8)."
  ]
});
