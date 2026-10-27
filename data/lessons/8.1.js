/* Chuqur dars: 8.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("8.1", {
  "lesson": [
    "### PSR nima",
    "**PSR (PHP Standards Recommendation)** — PHP-FIG (Framework Interoperability Group) chiqargan tavsiyalar: turli framework va kutubxonalar birgalikda ishlashi uchun umumiy qoidalar va interface'lar.",
    "",
    "### PSR-1: Basic Coding Standard",
    "Eng asosiy kodlash qoidalari:",
    "- Faqat `<?php` va `<?=` teglari.",
    "- Fayl **UTF-8 (BOM'siz)**.",
    "- Fayl yo'q **yon ta'sir** (side effect, masalan `echo`, `ini_set`) yoki **e'lonlar** (klass, funksiya, konstanta) dan birini qilsin, ikkalasini emas.",
    "- Namespace va klasslar PSR-4 (autoload) ga mos.",
    "- **Klass nomi:** `StudlyCaps` (PascalCase).",
    "- **Klass konstantalari:** `UPPER_CASE` (`_` bilan).",
    "- **Metod nomlari:** `camelCase`.",
    "",
    "### Property nomlari",
    "PSR-1 property uchun uslubni qat'iy belgilamaydi (`$StudlyCaps`, `$camelCase`, `$under_score`), lekin bir loyihada bitta uslub bo'lsin. Zamonaviy kodda `camelCase`.",
    "",
    "### Nima uchun",
    "Bir xil uslub o'qishni osonlashtiradi va jamoa/kutubxonalar orasida izchillik beradi.",
    "",
    "### Amalda",
    "PSR-1 ni PSR-12 (kengaytirilgan uslub) o'z ichiga oladi; vositalar (Laravel Pint, PHP CS Fixer, PHP_CodeSniffer) avtomatik tekshiradi va tuzatadi.",
    "",
    "### Misol",
    "`final class InvoiceCalculator { public const TAX_RATE = 12; public function calculateTotal(): int {} }`"
  ],
  "examples": [
    {
      "title": "PSR-1 ga mos fayl",
      "lang": "php",
      "code": [
        "<?php",
        "declare(strict_types=1);",
        "",
        "namespace App\\Billing;",
        "",
        "final class InvoiceCalculator          // StudlyCaps",
        "{",
        "    public const TAX_RATE = 12;        // UPPER_CASE",
        "",
        "    public function calculateTotal(int $net): int   // camelCase",
        "    {",
        "        return intdiv($net * (100 + self::TAX_RATE), 100);",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Faylda ham e'lon (klass) ham yon ta'sir (`echo`) aralashtirish PSR-1'ni buzadi.",
    "UTF-8 BOM birinchi chiqishni buzadi (`headers already sent`).",
    "Bir loyihada turli nomlash uslublari izchillikni buzadi.",
    "Qo'lda formatlash o'rniga Pint/PHP CS Fixer ishlating."
  ]
});
