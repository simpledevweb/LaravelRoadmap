/* Chuqur dars: 6.7. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("6.7", {
  "lesson": [
    "### Tushuncha",
    "**Separation of Concerns (SoC):** dasturni har biri alohida \"tashvish\"(concern)ga javob beradigan qismlarga ajratish: taqdimot, biznes mantiq, ma'lumot, infratuzilma. Har qism o'z ishini qiladi va boshqalarning ichki tafsilotini bilmaydi.",
    "",
    "### Odatiy qatlamlar",
    "1. **Taqdimot/HTTP:** request, javob, shablon.",
    "2. **Ilova/Use case:** amal tartibi (Action/Service).",
    "3. **Domen:** biznes qoidalar, entity, value object.",
    "4. **Infratuzilma:** DB, API, fayl, queue.",
    "Bog'lanish yo'nalishi: tashqi qatlam ichkisiga (DIP).",
    "",
    "### Laravel'da",
    "- Route + Controller: HTTP.",
    "- FormRequest: kiritma validatsiyasi.",
    "- Action/Service: use case.",
    "- Model/Eloquent: ma'lumot (va domen).",
    "- Resource/View: taqdimot.",
    "- Job/Event/Listener: asinxron.",
    "",
    "### Belgilar buzilganda",
    "Controller ichida SQL va hisoblash; Blade ichida DB so'rovi; model ichida HTTP chaqiruvlari va email.",
    "",
    "### Foydasi",
    "Test (har qatlam alohida), almashtirish, jamoada parallel ishlash, o'zgarish lokal.",
    "",
    "### Ehtiyot",
    "Kichik ilovada ortiqcha qatlam (har narsa uchun Repository + Service + DTO) YAGNI'ni buzadi: qatlamni haqiqiy murakkablik bo'lganda qo'shing.",
    "",
    "### Vertikal bo'lish",
    "Texnik qatlam o'rniga **feature/modul** bo'yicha (`Billing/`, `Catalog/`) papkalash ham SoC: har modul o'z qatlamlariga ega."
  ],
  "examples": [
    {
      "title": "Qatlamlar",
      "lang": "php",
      "code": [
        "final class OrderController                      // HTTP",
        "{",
        "    public function store(StoreOrderRequest $r, PlaceOrder $place): OrderResource      // validatsiya Request'da",
        "    { return new OrderResource($place($r->validated())); }                              // taqdimot Resource'da",
        "}",
        "final class PlaceOrder { public function __invoke(array $d): Order { /* use case: domen + repository */ } }"
      ]
    }
  ],
  "pitfalls": [
    "Controller ichida SQL va biznes hisob-kitob — qatlamlar aralashgan.",
    "Blade shablonida DB so'rovi taqdimot bilan ma'lumotni aralashtiradi.",
    "Kichik ilovada ortiqcha qatlam (hamma narsa uchun Repository) murakkablik qo'shadi.",
    "Qatlamlar orasidagi bog'lanish yo'nalishini nazorat qilmaslik (ichki qatlam tashqiga bog'liq) arxitekturani buzadi."
  ]
});
