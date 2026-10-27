/* Chuqur dars: 8.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("8.6", {
  "lesson": [
    "### PSR-12: Extended Coding Style",
    "PSR-1 ni **kengaytiruvchi** va **PSR-2 ni almashtiruvchi** kod uslubi standarti. Format qoidalari: qo'shimcha bahsni yo'qotadi.",
    "",
    "### Asosiy qoidalar",
    "- **Indentatsiya:** 4 ta bo'shliq (tab emas).",
    "- **Qator uzunligi:** yumshoq chegara 120 belgi.",
    "- **Fayl:** `<?php` dan keyin bo'sh qator, `declare(strict_types=1);` shu yerda, so'ng `namespace`, bo'sh qator, `use`'lar (bloklarga ajratilgan: klass, funksiya, konstanta). Fayl oxirida bitta bo'sh qator, yopuvchi `?>` yo'q.",
    "- Klass/metod ochuvchi `{`: **yangi qatorda**. Boshqaruv tuzilmalari (`if`, `foreach`) uchun `{` **shu qatorda**.",
    "- `else`/`elseif` — `}` bilan bir qatorda.",
    "- `abstract`/`final` — `class` dan oldin; `static` — ko'rinishdan keyin (`public static`).",
    "- Metod argumentlari uzun bo'lsa har biri alohida qatorda.",
    "- Kalit so'zlar kichik harf (`true`, `false`, `null`).",
    "- Konstruktor promotion alohida qatorlarda.",
    "- `use` trait'lar klass boshida.",
    "",
    "### Avtomatlashtirish",
    "**Laravel Pint** (PHP-CS-Fixer ustida), PHP CS Fixer, PHP_CodeSniffer (`phpcs --standard=PSR12`). CI'da `pint --test`.",
    "",
    "### Laravel",
    "Laravel kodi PSR-12 ga mos; Pint standart preseti `laravel` PSR-12 ga yaqin va o'z qo'shimchalari bilan.",
    "",
    "### Foyda",
    "Bir xil format: diff'lar toza, review'da format bahsi yo'q."
  ],
  "examples": [
    {
      "title": "PSR-12 ga mos klass",
      "lang": "php",
      "code": [
        "<?php",
        "",
        "declare(strict_types=1);",
        "",
        "namespace App\\Billing;",
        "",
        "use App\\Models\\Invoice;",
        "use Psr\\Log\\LoggerInterface;",
        "",
        "final class InvoicePrinter",
        "{",
        "    public function __construct(",
        "        private LoggerInterface $logger,",
        "        private int $copies = 1,",
        "    ) {",
        "    }",
        "",
        "    public function print(Invoice $invoice): void",
        "    {",
        "        if ($this->copies < 1) {",
        "            return;",
        "        }",
        "",
        "        $this->logger->info('Chop etildi');",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Qo'lda formatlash vaqt oladi: Pint/PHP CS Fixer'ni CI'ga qo'ying.",
    "`{` joylashuvi klass/metodda yangi qatorda, `if/foreach` da shu qatorda: aralashtirib yuborish mumkin.",
    "Tab o'rniga 4 bo'shliq: muharrir sozlamasi (.editorconfig).",
    "PSR-2 eskirgan: yangi loyihada PSR-12."
  ]
});
