/* Chuqur dars: 11.22. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("11.22", {
  "lesson": [
    "### Ikki turdagi backup",
    "**Logical** (`pg_dump`): ma'lumotni SQL yoki maxsus formatda eksport qiladi. Afzalliklari: bitta DB, schema yoki jadval; turli major versiyalar o'rtasida ko'chirish; o'qilishi mumkin. Kamchiliklari: katta DB'da sekin (yuzlab GB — soatlar), restore indekslarni qayta quradi, faqat dump paytidagi holat.",
    "",
    "**Physical** (`pg_basebackup`, pgBackRest, Barman, WAL-G): ma'lumot fayllarining bloklar darajasidagi nusxasi. Katta bazalar uchun tez, inkremental va differensial backup, parallel siqish. Faqat butun cluster va bir xil major versiya.",
    "",
    "### pg_dump formatlari",
    "- `-Fp` (plain SQL): `psql` bilan tiklanadi. Kichik DB va ko'rib chiqish uchun.",
    "- `-Fc` (custom): siqilgan, `pg_restore` bilan tanlab tiklash mumkin. **Standart tanlov.**",
    "- `-Fd` (directory): `-j N` bilan parallel dump va restore.",
    "",
    "`pg_dump` izchil snapshot oladi va ishlab turgan bazani bloklamaydi. Rollar va tablespace'lar dump'ga kirmaydi. Ular uchun `pg_dumpall --globals-only` ishlatiladi.",
    "",
    "### Point-in-Time Recovery (PITR)",
    "PITR = **bazaviy fizik backup** + **uzluksiz WAL arxivi**. WAL har bir o'zgarishni saqlagani uchun bazaviy nusxani olib, WAL'ni istalgan nuqtagacha o'ynash mumkin.",
    "",
    "Klassik holat: 14:32 da xato migratsiya `orders` jadvalini o'chirdi. PITR bilan 14:31:59 holatini alohida serverda tiklaysiz va yo'qolgan ma'lumotni ko'chirasiz yoki to'liq qaytasiz.",
    "",
    "Sozlash:",
    "1. `wal_level = replica`, `archive_mode = on`, `archive_command` (yoki pgBackRest/WAL-G agent) WAL segmentlarini S3 kabi xavfsiz joyga yuboradi.",
    "2. Muntazam bazaviy backup (masalan, kuniga bir marta).",
    "3. Tiklash: backup'ni qo'yish, `restore_command` va `recovery_target_time = '2025-06-10 14:31:59+05'`, `recovery.signal` fayli (PG 12+).",
    "",
    "### RPO va RTO",
    "- **RPO** (qancha ma'lumot yo'qotish mumkin): PITR bilan soniyalar, kunlik `pg_dump` bilan 24 soatgacha.",
    "- **RTO** (qancha vaqtda tiklash): backup hajmi, WAL miqdori va disk tezligiga bog'liq. Faqat haqiqiy tiklash mashqi bilan o'lchanadi.",
    "",
    "### Qoidalar",
    "- **3-2-1:** 3 nusxa, 2 xil tashuvchi, 1 tasi boshqa joyda (boshqa region yoki akkaunt).",
    "- Backup'lar shifrlangan va o'zgartirib bo'lmaydigan (S3 Object Lock) bo'lsin. Ransomware birinchi navbatda backup'ni o'chiradi.",
    "- **Tiklashni muntazam sinang.** Tekshirilmagan backup — backup emas.",
    "- Backup muvaffaqiyati va yoshini monitoring qiling va alert qo'ying.",
    "",
    "### Laravel'da",
    "`spatie/laravel-backup` `pg_dump` ni ishga tushiradi, S3'ga yuklaydi, eskilarini tozalaydi va xabar beradi. Kichik va o'rta loyihalar uchun yetarli. Katta production uchun DB darajasida pgBackRest yoki WAL-G, yoki boshqariladigan servisning PITR imkoniyati kerak."
  ],
  "examples": [
    {
      "title": "Logical dump va parallel restore",
      "lang": "bash",
      "code": [
        "pg_dump -h db.internal -U backup -d app -Fc -Z 6 -f app_$(date +%F).dump",
        "pg_dumpall -h db.internal -U postgres --globals-only > globals.sql",
        "",
        "createdb app_restore",
        "pg_restore -j 4 --no-owner -d app_restore app_2025-06-10.dump",
        "",
        "# Faqat bitta jadvalni tiklash",
        "pg_restore -d app_restore -t orders app_2025-06-10.dump"
      ]
    },
    {
      "title": "pgBackRest bilan PITR",
      "lang": "bash",
      "code": [
        "# postgresql.conf",
        "# archive_mode = on",
        "# archive_command = 'pgbackrest --stanza=app archive-push %p'",
        "",
        "pgbackrest --stanza=app --type=full backup",
        "pgbackrest --stanza=app info",
        "",
        "# Xatodan bir soniya oldingi holatga tiklash",
        "pgbackrest --stanza=app --delta \\",
        "  --type=time --target='2025-06-10 14:31:59+05' \\",
        "  --target-action=promote restore"
      ]
    }
  ],
  "pitfalls": [
    "Backup'ni hech qachon tiklab ko'rmaslik: kerak bo'lganda fayl buzilgan yoki to'liq emasligi ma'lum bo'ladi.",
    "Backup'ni DB bilan bir serverda yoki bir akkauntda saqlash: server yoki akkaunt yo'qolsa, backup ham yo'qoladi.",
    "Faqat kunlik `pg_dump` bilan RPO bir necha daqiqa deb va'da berish.",
    "`pg_dump` ga rollar va huquqlar kiradi deb o'ylash: `--globals-only` siz restore'dan keyin login ishlamaydi."
  ]
});
