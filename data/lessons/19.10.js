/* Chuqur dars: 19.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("19.10", {
  "lesson": [
    "### Strategiya — usuldan ko'proq",
    "18.12 da versiyalash usullari (URI, header, query) ko'rildi. Strategiya esa quyidagi savollarga javob beradi va ularni oldindan e'lon qiladi:",
    "1. **Qaysi usul?** Ko'p hollarda URI (`/v1`).",
    "2. **Buzuvchi o'zgarish nima?** Aniq ro'yxat (18.18). \"Yangi maydon — buzuvchi emas, maydonni o'chirish — buzuvchi\".",
    "3. **Nechta versiya bir vaqtda?** Odatda joriy va bitta oldingi.",
    "4. **Deprecation muddati?** Ommaviy API uchun 6–12+ oy, ichki uchun kamroq.",
    "5. **Qanday xabar beriladi?** Changelog, email, `Deprecation`/`Sunset` header'lari, dashboard (19.18).",
    "",
    "### Versiyasiz evolyutsiya",
    "Ko'p jamoalar uchun eng yaxshi strategiya — **imkon qadar yangi major versiya chiqarmaslik**:",
    "- Faqat qo'shimcha (additive) o'zgarishlar.",
    "- Eski maydonlar yangisi bilan birga saqlanadi (expand-contract, 18.18).",
    "- Mijozlar tolerant reader.",
    "",
    "Natijada `v1` yillab yashaydi va hech kim migratsiya qilishga majbur bo'lmaydi. Yangi major versiya faqat fundamental qayta dizayn uchun.",
    "",
    "### Sana asosidagi versiyalar",
    "Stripe modeli: har API akkaunti birinchi ishlatgan kunning versiyasiga \"qadaladi\" (`2024-06-20`). Yangi buzuvchi o'zgarish yangi sana-versiya sifatida chiqadi. Server ichida so'rov va javoblar ketma-ket **transformatsiya qatlamlari** orqali o'tadi: eng yangi format → har eski versiya uchun teskari o'giruvchi. Mijoz o'zi xohlagan paytda `Stripe-Version` header'i bilan yangilanadi.",
    "",
    "Afzalliklari: kichik buzuvchi o'zgarishlarni ham xavfsiz kiritish, har mijoz o'z tezligida. Kamchiligi: transformatsiyalar zanjirini saqlash murakkab. Katta ommaviy API platformalari uchun.",
    "",
    "### Ichki API'lar",
    "Iste'molchilar faqat sizning jamoangiz yoki kompaniyangiz bo'lsa (frontend, boshqa mikroservislar), versiyalash ko'pincha ortiqcha. Muvofiqlashtirish va kontrakt testlari (19.19, consumer-driven) arzonroq. Mobil ilova bundan istisno: eski versiyalar foydalanuvchida qoladi va siz ularni majburan yangilay olmaysiz (minimal versiya tekshiruvi — \"ilovani yangilang\" ekrani — ham yordam beradi).",
    "",
    "### Hujjatda",
    "Har versiyaning holati (joriy, deprecated, sunset sanasi), versiyalar orasidagi farqlar va migratsiya qo'llanmasi. Changelog har o'zgarishni (buzuvchi bo'lmaganlarini ham) sanasi bilan qayd etadi."
  ],
  "examples": [
    {
      "title": "Versiyalash siyosati namunasi",
      "lang": "text",
      "code": [
        "API versiyalash siyosati",
        "",
        "- Usul: URI prefiksi (/api/v1, /api/v2)",
        "- Mavjud versiyada faqat orqaga mos o'zgarishlar",
        "- Buzuvchi o'zgarish = yangi major versiya",
        "- Bir vaqtda maksimal 2 versiya qo'llab-quvvatlanadi",
        "- Eski versiya: yangi versiya chiqqandan keyin kamida 12 oy",
        "- Xabarnoma: changelog, email, Deprecation/Sunset header'lari",
        "",
        "Holat:",
        "  v1 - deprecated, sunset 2026-06-30",
        "  v2 - joriy (2025-06 dan)"
      ]
    },
    {
      "title": "Mobil ilova minimal versiyasi",
      "lang": "php",
      "code": [
        "final class EnsureSupportedAppVersion",
        "{",
        "    public function handle(Request $request, Closure $next): Response",
        "    {",
        "        $version = $request->header('X-App-Version');",
        "        $min = config('app.min_mobile_version');   // '3.2.0'",
        "",
        "        if ($version && version_compare($version, $min, '<')) {",
        "            return response()->json([",
        "                'code' => 'app_update_required',",
        "                'message' => 'Iltimos, ilovani yangilang',",
        "                'min_version' => $min,",
        "            ], 426);",
        "        }",
        "",
        "        return $next($request);",
        "    }",
        "}"
      ],
      "note": "`426 Upgrade Required` rasmiy ravishda protokol yangilash uchun mo'ljallangan, lekin ilova versiyasi uchun ham keng ishlatiladi. Muhimi — `code` maydoni."
    }
  ],
  "pitfalls": [
    "Versiyalash siyosatini yozmasdan, har safar alohida qaror qabul qilish.",
    "Kichik o'zgarishlar uchun ham yangi major versiya chiqarish.",
    "Ichki iste'molchilar uchun ortiqcha versiyalash murakkabligi.",
    "Mobil ilova uchun minimal versiya mexanizmini oldindan qo'ymaslik."
  ]
});
