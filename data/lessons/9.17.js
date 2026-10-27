/* Chuqur dars: 9.17. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.17", {
  "lesson": [
    "### Izolyatsiya",
    "Parallel tranzaksiyalar bir-birini qanchalik \"ko'rishini\" belgilaydi. Yuqori izolyatsiya — kam anomaliya, lekin ko'proq qulf/kutish. (Batafsil MySQL: 10.10.)",
    "",
    "### Anomaliyalar",
    "- **Dirty read:** commit qilinmagan o'zgarishni o'qish.",
    "- **Non-repeatable read:** bir tranzaksiyada qayta o'qishda qiymat o'zgargan.",
    "- **Phantom read:** qayta so'rovda yangi qatorlar paydo bo'lgan.",
    "- **Lost update / write skew:** parallel yozish natijasi yo'qolishi.",
    "",
    "### Standart darajalar",
    "| Daraja | Dirty | Non-repeatable | Phantom |",
    "|---|---|---|---|",
    "| READ UNCOMMITTED | bor | bor | bor |",
    "| READ COMMITTED | yo'q | bor | bor |",
    "| REPEATABLE READ | yo'q | yo'q | bor (standart), InnoDB'da kamaytirilgan |",
    "| SERIALIZABLE | yo'q | yo'q | yo'q |",
    "",
    "### Dvigatelga xos",
    "- **MySQL InnoDB:** default REPEATABLE READ.",
    "- **PostgreSQL:** default READ COMMITTED.",
    "- Amalga oshirish farqlari (MVCC, qulf) tufayli xatti-harakat jadvaldan farq qilishi mumkin.",
    "",
    "### Tanlash",
    "- **READ COMMITTED** — ko'p veb-ilovalar uchun yaxshi balans.",
    "- **REPEATABLE READ** — hisobotlarda bir xil snapshot.",
    "- **SERIALIZABLE** — qat'iy to'g'rilik (kam parallellik, deadlock/retry).",
    "- Ko'pincha daraja o'zgartirish o'rniga **aniq qulf** (`FOR UPDATE`) yoki **optimistik versiya** ishlatiladi.",
    "",
    "### Sozlash",
    "`SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;` Laravel: tranzaksiya oldidan `DB::statement(...)`.",
    "",
    "### Qoidalar",
    "Anomaliyani biling, kritik joyda (balans, zaxira) aniq qulf yoki constraint ishlating."
  ],
  "examples": [
    {
      "title": "Daraja va qulf",
      "lang": "sql",
      "code": [
        "SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;",
        "START TRANSACTION;",
        "SELECT stock FROM products WHERE id = 7 FOR UPDATE;   -- lost update'dan himoya",
        "UPDATE products SET stock = stock - 1 WHERE id = 7;",
        "COMMIT;"
      ]
    }
  ],
  "pitfalls": [
    "Daraja nomi bir xil bo'lsa-da dvigatellarda xatti-harakat farq qiladi: hujjatni tekshiring.",
    "READ COMMITTED'da bir tranzaksiyada ikki o'qish turlicha natija berishi mumkin.",
    "SERIALIZABLE deadlock/retry'ni ko'paytiradi: qayta urinishga tayyor bo'ling.",
    "Lost update'dan himoyasiz o'qib-yozish (`SELECT` keyin `UPDATE`) parallelda xato."
  ]
});
