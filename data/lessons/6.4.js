/* Chuqur dars: 6.4. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("6.4", {
  "lesson": [
    "### DRY",
    "**Don't Repeat Yourself:** har bir bilim tizimda **bitta, aniq joyda** bo'lsin. Maqsad: qoida o'zgarsa, bitta joyda o'zgartirish.",
    "",
    "### Muhim nuance",
    "DRY — **bilimni** takrorlamaslik, matn o'xshashligini emas. Tasodifan o'xshash, lekin turli sabab bilan o'zgaradigan kodni birlashtirish noto'g'ri (yomon abstraksiya). \"Duplikatsiya noto'g'ri abstraksiyadan arzonroq\" (Sandi Metz).",
    "",
    "### Takrorlanish turlari",
    "1. **Kod:** nusxa-ko'chirilgan bloklar.",
    "2. **Ma'lumot/konstanta:** bir xil raqam/satr ko'p joyda (`'pending'`).",
    "3. **Bilim:** bir biznes qoida turli joyda (chegirma formulasi).",
    "4. **Hujjat:** kod bilan izoh nusxasi.",
    "",
    "### Yechimlar",
    "- Funksiya/metod ajratish, klass.",
    "- Konstanta/enum.",
    "- Trait yoki bazaviy klass (ehtiyotkorlik bilan).",
    "- Laravel: scope, accessor, `FormRequest`, Blade component, Resource, Policy.",
    "- Kod generatsiyasi/konfiguratsiya.",
    "",
    "### Qachon takrorlash mumkin",
    "- Ikki joy hozir o'xshash, lekin turli sabab bilan o'zgaradi.",
    "- Uch marta qoidasi: birinchi — yozing, ikkinchi — ogohlantiring, uchinchi — abstraksiyalang.",
    "- Testlarda ba'zi takrorlanish o'qish uchun foydali.",
    "",
    "### Xavf",
    "Ortiqcha DRY qattiq bog'liqlik hosil qiladi: umumiy kodni o'zgartirish ikki joyni birdan buzadi."
  ],
  "examples": [
    {
      "title": "Konstanta/enum bilan",
      "lang": "php",
      "code": [
        "// TAKROR",
        "if ($o->status === 'paid') {} ... if ($o2->status === 'paid') {}",
        "",
        "// DRY",
        "enum OrderStatus: string { case Paid = 'paid'; case Pending = 'pending'; }",
        "if ($o->status === OrderStatus::Paid) {}"
      ]
    }
  ],
  "pitfalls": [
    "O'xshash ko'ringan, lekin turli sabab bilan o'zgaradigan kodni birlashtirish noto'g'ri abstraksiya beradi.",
    "Bazaviy klass/trait orqali DRY qilish qattiq bog'liqlik: kompozitsiya afzal.",
    "Konstantani ham bir joyda saqlash: `'pending'` satri ko'p joyda xato manbai.",
    "Testlardagi tushunarlilik takrorlanishdan muhimroq bo'lishi mumkin."
  ]
});
