/* Chuqur dars: 9.15. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("9.15", {
  "lesson": [
    "### Stored Procedure",
    "Bazada saqlanadigan nomlangan **SQL dasturi**: `CALL calc_bonus(5);`. Parametrlar `IN`, `OUT`, `INOUT`; ichida `IF`, `LOOP`, kursorlar, tranzaksiyalar.",
    "```sql",
    "DELIMITER //",
    "CREATE PROCEDURE archive_old_orders(IN days INT)",
    "BEGIN",
    "  INSERT INTO orders_archive SELECT * FROM orders WHERE created_at < NOW() - INTERVAL days DAY;",
    "  DELETE FROM orders WHERE created_at < NOW() - INTERVAL days DAY;",
    "END //",
    "DELIMITER ;",
    "```",
    "**Function** (`CREATE FUNCTION ... RETURNS`) — qiymat qaytaradi, SQL ichida ishlatiladi.",
    "",
    "### Trigger",
    "Jadvalda `INSERT/UPDATE/DELETE` **oldin (BEFORE)** yoki **keyin (AFTER)** avtomatik ishlaydigan kod: `NEW.col`, `OLD.col`.",
    "```sql",
    "CREATE TRIGGER trg_audit AFTER UPDATE ON users FOR EACH ROW",
    "INSERT INTO audit_log (table_name, row_id, changed_at) VALUES ('users', OLD.id, NOW());",
    "```",
    "",
    "### Afzalliklari",
    "Tarmoq trafigi kam (mantiq bazada), markazlashgan, atomar, audit/yaxlitlik uchun kafolat.",
    "",
    "### Kamchiliklari",
    "- **Versiyalash/test/debug qiyin** (kod migratsiyalarda emas).",
    "- Biznes mantiq ikki joyda (ilova + baza), jamoa ko'rinmaydi (\"sehr\").",
    "- Masshtablash: mantiq DB serverida (CPU).",
    "- Portativlik (MySQL ↔ Postgres sintaksisi farq).",
    "- Trigger ichidagi yon ta'sirlar kutilmagan; replikatsiya bilan murakkablik.",
    "",
    "### Amaliyot",
    "Zamonaviy Laravel loyihalarida mantiq ilovada, procedure/trigger — kamdan-kam (audit, ma'lumot yaxlitligi, eski tizim). Ishlatsangiz migratsiyada versiyalang va hujjatlang.",
    "",
    "### Laravel",
    "`DB::unprepared('CREATE TRIGGER ...')` migratsiyada; `DB::select('CALL ...')`."
  ],
  "examples": [
    {
      "title": "Trigger va procedure chaqirish",
      "lang": "sql",
      "code": [
        "DELIMITER //",
        "CREATE TRIGGER trg_orders_before_insert BEFORE INSERT ON orders FOR EACH ROW",
        "BEGIN",
        "  IF NEW.total < 0 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Manfiy summa'; END IF;",
        "END //",
        "DELIMITER ;",
        "CALL archive_old_orders(365);"
      ]
    }
  ],
  "pitfalls": [
    "Biznes mantiq trigger/procedure'da yashirin bo'lib, kodni o'qiyotganlarga ko'rinmaydi.",
    "Procedure/trigger migratsiyada versiyalanmasa muhitlar farq qiladi.",
    "Trigger ichidagi yon ta'sirlar (ketma-ket triggerlar) kutilmagan natija beradi.",
    "DB serverida og'ir mantiq CPU'ni band qilib masshtablashni qiyinlashtiradi."
  ]
});
