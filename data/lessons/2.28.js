/* Chuqur dars: 2.28. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.28", {
  "lesson": [
    "### Versiyalash va qo'llab-quvvatlash",
    "Laravel **yiliga bir marta** yangi major versiya chiqaradi (odatda yilning boshida). Har major: taxminan **18 oy** xatolar tuzatish, **2 yil** xavfsizlik tuzatishlari. Aniq sanalar: laravel.com/docs → Release Notes → Support Policy. EOL versiyada qolish — xavfsizlik xavfi.",
    "",
    "### Yangilash jarayoni",
    "1. **Upgrade guide** (rasmiy hujjat): breaking changes ro'yxati.",
    "2. Git branch, testlar yashil bo'lsin (yangilashdan oldin).",
    "3. `composer.json`: `laravel/framework: ^N.0`, PHP minimal versiya, paketlarni mosligini tekshiring (`composer why-not laravel/framework N`).",
    "4. `composer update` (`--with-all-dependencies` kerak bo'lsa).",
    "5. Breaking change'larni qo'lda/Rector orqali tuzating.",
    "6. Testlar, statik tahlil (PHPStan/Larastan), deprecation'lar.",
    "7. Staging'da sinash, keyin canary/production.",
    "",
    "### Vositalar",
    "- **Laravel Shift** (pullik avtomatlashtirilgan yangilash PR'i).",
    "- **Rector** + `driftingly/rector-laravel`.",
    "- Laravel Boost/`laravel/upgrade` hujjatlar va maslahatlar.",
    "- PHPStan/Larastan, Pint.",
    "",
    "### Strategiya",
    "- Katta sakrashdan ko'ra **ketma-ket** (har major) yangilash osonroq.",
    "- LTS yo'q: doimiy yangilanib turing.",
    "- Kutubxonalar (Filament, Livewire, Spatie) majorlari bilan moslikni kuzating.",
    "- Deprecation ogohlantirishlarini CI'da xato qiling.",
    "",
    "### Laravel 11 ni eslab qoling",
    "Skelet soddalashdi (Kernel, Handler yo'q, `bootstrap/app.php`); yangilashda eski strukturani saqlash mumkin, lekin yangi konvensiyaga o'tish tavsiya.",
    "",
    "### Xatarlar",
    "Testlarsiz yangilash, paketlar mos kelmasligi, config/env o'zgarishlari, DB migratsiyalari."
  ],
  "examples": [
    {
      "title": "Mosligini tekshirish",
      "lang": "bash",
      "code": [
        "git checkout -b upgrade/laravel-next",
        "composer why-not laravel/framework 12.0",
        "composer require laravel/framework:^12.0 --with-all-dependencies",
        "vendor/bin/pest && vendor/bin/phpstan analyse"
      ]
    }
  ],
  "pitfalls": [
    "EOL Laravel versiyasi xavfsizlik tuzatishini olmaydi: reja bo'yicha yangilang.",
    "Testlarsiz yangilash regressiyani sezdirmaydi.",
    "Bir necha majorni birdan sakrab o'tish xatolarni topishni qiyinlashtiradi.",
    "Uchinchi tomon paketlar yangi major'ni qo'llamasa yangilash bloklanadi: oldindan tekshiring."
  ]
});
