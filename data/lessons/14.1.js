/* Chuqur dars: 14.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("14.1", {
  "lesson": [
    "### ER modellashtirish",
    "**Entity-Relationship (ER)** modeli — ma'lumotni **entity** (obyekt: User, Order), **attribute** (xossa: email, total) va **relationship** (aloqa: User 1—N Order) sifatida tavsiflash. Jadvallar yaratishdan **oldingi** konseptual dizayn.",
    "",
    "### Jarayon",
    "1. **Talablarni** yig'ing (biznes qoidalar, hisobotlar).",
    "2. **Entity**larni toping (ot gaplar).",
    "3. Har biriga **attribute**lar va **identifikator** (PK).",
    "4. **Aloqalar** va **kardinallik** (1:1, 1:N, N:M), majburiylik (ixtiyoriy/majburiy).",
    "5. **Normalizatsiya** (14.5).",
    "6. **Jadvallarga** aylantirish, FK/constraint, indekslar.",
    "",
    "### Diagramma",
    "Chen yoki **crow's foot** notatsiyasi: qutilar — entity, chiziqlar — aloqa, \"qarg'a panjasi\" — \"ko'p\". Vositalar: dbdiagram.io, draw.io, MySQL Workbench, DBeaver, Mermaid `erDiagram`.",
    "",
    "### Mermaid misoli",
    "`erDiagram USER ||--o{ ORDER : places`.",
    "",
    "### Yaxshi dizayn belgilari",
    "- Har entity bitta tushunchani ifodalaydi.",
    "- Takrorlanuvchi ma'lumot yo'q (normalizatsiya).",
    "- Aloqalar aniq, FK'lar mavjud.",
    "- Kelajakda o'zgartirish oson.",
    "",
    "### Amaliyot",
    "Avval qog'ozda/diagrammada, so'ng migratsiya. Jamoa bilan ko'rib chiqing; domen tilini (ubiquitous language) ishlating."
  ],
  "examples": [
    {
      "title": "Mermaid ER",
      "lang": "text",
      "code": [
        "erDiagram",
        "  USER ||--o{ ORDER : places",
        "  ORDER ||--|{ ORDER_LINE : contains",
        "  PRODUCT ||--o{ ORDER_LINE : \"is in\"",
        "  USER { bigint id PK  string email UK }"
      ]
    }
  ],
  "pitfalls": [
    "Talablarni tushunmay turib jadval yaratish keyin qimmat o'zgartirishga olib keladi.",
    "Bitta entity'ga bir nechta tushunchani sig'dirish ('God table').",
    "Kardinallikni (1:N yoki N:M) noto'g'ri aniqlash noto'g'ri sxema beradi.",
    "Diagrammasiz katta sxema jamoada tushunarsiz bo'lib qoladi."
  ]
});
