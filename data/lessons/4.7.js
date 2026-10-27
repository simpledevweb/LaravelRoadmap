/* Chuqur dars: 4.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("4.7", {
  "lesson": [
    "### Yondashuv",
    "SOLID'ni qo'llash — katta qayta yozish emas, **kichik xavfsiz qadamlar** bilan refaktoring. Avval xatti-harakatni testlar bilan \"qotiring\" (characterization test), keyin tuzilmani o'zgartiring.",
    "",
    "### Qadamlar",
    "1. **Test:** mavjud xatti-harakatni tasdiqlovchi testlar (hatto xunuk bo'lsa ham).",
    "2. **Mas'uliyatlarni toping** (SRP): metodlarni guruhlang.",
    "3. **Extract method → Extract class:** mantiqni alohida klassga chiqaring.",
    "4. **Konkretni interface bilan almashtiring** (DIP): `new X()` o'rniga konstruktorga.",
    "5. `switch`/`if`ni polimorfizmga (OCP): Strategy/State.",
    "6. **Interface'ni bo'ling** (ISP), voris shartnomasini tuzating (LSP).",
    "7. Har qadamdan keyin testlarni yurgizing va commit qiling.",
    "",
    "### Texnikalar",
    "Replace Conditional with Polymorphism, Extract Interface, Introduce Parameter Object, Move Method, Replace Inheritance with Delegation, Introduce Factory, Strangler Fig (eski kodni bosqichma-bosqich almashtirish).",
    "",
    "### Laravel misoli",
    "Fat controller → `FormRequest` (validatsiya) + `Action` klass (mantiq) + `Resource` (javob). Eloquent'ga bog'langan mantiq → Repository yoki Query obyekti.",
    "",
    "### Xavflar",
    "- Testsiz refaktoring.",
    "- Bir vaqtda xatti-harakat va tuzilmani o'zgartirish.",
    "- Ortiqcha abstraksiya.",
    "Refaktoring xatti-harakatni **o'zgartirmaydi**; funksiya qo'shish alohida commit."
  ],
  "examples": [
    {
      "title": "Fat controller → Action",
      "lang": "php",
      "code": [
        "// OLDIN",
        "public function store(Request $r) { $r->validate([...]); $o = Order::create([...]); Mail::to($r->user())->send(new Paid($o)); return $o; }",
        "",
        "// KEYIN",
        "public function store(StoreOrderRequest $r, PlaceOrder $place) { return new OrderResource($place($r->validated())); }"
      ]
    }
  ],
  "pitfalls": [
    "Testsiz refaktoring regressiyani yashirincha kiritadi.",
    "Refaktoring va yangi funksiyani bitta commitga aralashtirmang.",
    "Hammasini birdan qayta yozish (big bang) xavfli: Strangler Fig bilan bosqichma-bosqich.",
    "Abstraksiyani haddan oshirib qo'shish yangi muammo hosil qiladi."
  ]
});
