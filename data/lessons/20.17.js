/* Chuqur dars: 20.17. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("20.17", {
  "lesson": [
    "### Tamoyil",
    "**Least privilege** (eng kam huquq): har bir sub'ekt — foydalanuvchi, token, servis, jarayon, DB foydalanuvchisi — faqat o'z vazifasini bajarish uchun **zarur minimal** huquqqa, faqat **zarur vaqt** davomida ega bo'ladi.",
    "",
    "Maqsad xatoni oldini olish emas, **oqibatni cheklash**: tizimning biror qismi buzilganda (token o'g'irlandi, servis zaiflik orqali egallandi, xodim xato qildi) zarar shu qismning huquqlari bilan chegaralanadi. Buni \"blast radius\" ni kichraytirish deyishadi.",
    "",
    "### Qatlamlar bo'yicha qo'llanishi",
    "**Foydalanuvchilar va rollar**",
    "- Default rol — eng past (viewer). Yuqori huquq aniq so'rov va tasdiq bilan.",
    "- Granulyar ruxsatlar (20.10). \"Admin\" — kam odam.",
    "- Muntazam qayta ko'rib chiqish (access review): kimga nima kerak, kimdan nimani olish kerak. Ishdan ketgan xodimlar darhol o'chiriladi.",
    "",
    "**Token'lar va kalitlar**",
    "- Minimal scope (20.16), qisqa muddat (20.14).",
    "- Har integratsiyaga alohida kalit. Bitta \"master\" kalit hamma joyda emas.",
    "",
    "**Ma'lumotlar bazasi**",
    "- Ilova foydalanuvchisi: faqat `SELECT, INSERT, UPDATE, DELETE` o'z schema'sida. `DROP`, `ALTER`, `GRANT`, `SUPER` yo'q.",
    "- Migratsiya uchun alohida foydalanuvchi (DDL huquqi bilan), faqat deploy vaqtida ishlatiladi.",
    "- Hisobot va analitika uchun read-only foydalanuvchi, ehtimol replikada.",
    "- Bir nechta servis bitta DB'da bo'lsa, har biri o'z foydalanuvchisi va o'z jadvallari bilan.",
    "",
    "**Infratuzilma**",
    "- Bulut IAM: S3 bucket uchun faqat kerakli prefiks va amallar (`s3:GetObject` ma'lum yo'lda), `s3:*` emas (70.x).",
    "- PHP-FPM va queue worker'lar root bo'lmagan foydalanuvchi ostida (`www-data`), fayl tizimida faqat kerakli papkalarga yozish (`storage/`, `bootstrap/cache/`).",
    "- Docker konteynerlar root'siz (36.x).",
    "- CI/CD token'lari faqat kerakli repozitoriy va muhit uchun.",
    "",
    "**Vaqtinchalik yuqori huquq (Just-in-Time)**",
    "Production DB'ga yoki admin panelga doimiy kirish o'rniga: so'rov → tasdiq → bir necha soatlik vaqtinchalik huquq → avtomatik olib qo'yish, hammasi audit bilan. \"Break-glass\" favqulodda akkaunt — maxsus, kuzatiladigan.",
    "",
    "### Amaliy qoida",
    "Yangi huquq so'ralganda savol: \"Bu aniq qaysi vazifa uchun kerak va undan kamroq huquq bilan bajarib bo'ladimi?\". Huquq berish oson, olib qo'yish qiyin. Shuning uchun boshidan tor bering."
  ],
  "examples": [
    {
      "title": "DB foydalanuvchilarini ajratish (PostgreSQL)",
      "lang": "sql",
      "code": [
        "-- Ilova: faqat ma'lumot bilan ishlaydi",
        "CREATE ROLE app_rw LOGIN PASSWORD '...';",
        "GRANT USAGE ON SCHEMA public TO app_rw;",
        "GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_rw;",
        "GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_rw;",
        "",
        "-- Migratsiya: DDL, faqat deploy'da",
        "CREATE ROLE app_migrator LOGIN PASSWORD '...';",
        "GRANT ALL ON SCHEMA public TO app_migrator;",
        "ALTER DEFAULT PRIVILEGES FOR ROLE app_migrator IN SCHEMA public",
        "  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_rw;",
        "",
        "-- Hisobot: faqat o'qish",
        "CREATE ROLE app_ro LOGIN PASSWORD '...';",
        "GRANT USAGE ON SCHEMA public TO app_ro;",
        "GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_ro;"
      ]
    },
    {
      "title": "S3 uchun minimal IAM policy",
      "lang": "json",
      "code": [
        "{",
        "  \"Version\": \"2012-10-17\",",
        "  \"Statement\": [",
        "    {",
        "      \"Effect\": \"Allow\",",
        "      \"Action\": [\"s3:GetObject\", \"s3:PutObject\", \"s3:DeleteObject\"],",
        "      \"Resource\": \"arn:aws:s3:::myapp-uploads/tenants/*\"",
        "    },",
        "    {",
        "      \"Effect\": \"Allow\",",
        "      \"Action\": \"s3:ListBucket\",",
        "      \"Resource\": \"arn:aws:s3:::myapp-uploads\",",
        "      \"Condition\": { \"StringLike\": { \"s3:prefix\": \"tenants/*\" } }",
        "    }",
        "  ]",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Ilovani DB'ga superuser yoki `root` bilan ulash: SQL injection butun serverni egallashga aylanadi.",
    "Barcha integratsiyalar uchun bitta umumiy API kalit.",
    "Bulut IAM'da `\"Action\": \"*\"` yoki `s3:*` policy'lar.",
    "Huquqlarni hech qachon qayta ko'rib chiqmaslik: vaqt o'tishi bilan hamma \"admin\" bo'lib qoladi."
  ]
});
