/* Chuqur dars: 27.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("27.3", {
  "lesson": [
    "### Biznes mantiq — unit testlarning asosiy nishoni",
    "Eng qimmat xatolar biznes qoidalarida: noto'g'ri narx, chegirma ikki marta qo'llangan, ruxsatsiz qaytarish, soliq xato hisoblangan. Bu mantiq ko'pincha kichik, toza va DB'siz ifodalanadi, shuning uchun unit test uchun ideal.",
    "",
    "### Mantiqni ajratib olish",
    "Biznes qoidalari controller, Eloquent model event yoki Blade ichida tarqalgan bo'lsa, ularni test qilish qiyin. Ajratish:",
    "- **Domen servisi yoki action** (`CalculateShippingCost`), **policy** (`RefundPolicy`), **qiymat obyekti** (`Money`, `DateRange`), **enum metodlari** (`OrderStatus::canTransitionTo()`), **spetsifikatsiya** (`EligibleForLoyaltyBonus`).",
    "- Kirish — oddiy qiymatlar yoki domen obyektlari, chiqish — natija. DB, HTTP va facade'lar tashqarida.",
    "",
    "### Qoidalarni test bilan hujjatlashtirish",
    "Yaxshi nomlangan testlar biznes qoidalarining **tirik hujjati**: `it('gives free shipping for orders above 500 000 in Tashkent')`, `it('charges 30 000 for express delivery to regions')`. Biznes analitik bilan qoida muhokama qilinganda, testlar ro'yxati aynan shu qoidalar.",
    "",
    "### Holatlarni tanlash",
    "- Har qoida uchun muvaffaqiyatli holat.",
    "- Chegara qiymatlar (27.7): aynan 500 000, 499 999.",
    "- Qoidalar kombinatsiyasi: VIP + promo-kod + chegirma (qaror jadvali, 25.9).",
    "- Rad etish holatlari (27.9).",
    "",
    "### Qabul mezonlaridan test",
    "User story'dagi qabul mezonlari (78.5) to'g'ridan-to'g'ri testlarga aylanadi. TDD (30.x) da testlar kod yozilishidan oldin."
  ],
  "examples": [
    {
      "title": "Yetkazib berish narxi qoidalari",
      "lang": "php",
      "code": [
        "final class ShippingCost",
        "{",
        "    public function for(string $region, int $orderTotal, bool $express): int",
        "    {",
        "        if ($region === 'tashkent' && $orderTotal >= 500_000 && ! $express) {",
        "            return 0;",
        "        }",
        "",
        "        $base = $region === 'tashkent' ? 15_000 : 30_000;",
        "        return $express ? $base * 2 : $base;",
        "    }",
        "}",
        "",
        "it('is free in Tashkent from 500 000', fn () =>",
        "    expect((new ShippingCost())->for('tashkent', 500_000, false))->toBe(0));",
        "",
        "it('is not free just below the threshold', fn () =>",
        "    expect((new ShippingCost())->for('tashkent', 499_999, false))->toBe(15_000));",
        "",
        "it('doubles for express even above threshold', fn () =>",
        "    expect((new ShippingCost())->for('tashkent', 800_000, true))->toBe(30_000));",
        "",
        "it('charges 30 000 for regions', fn () =>",
        "    expect((new ShippingCost())->for('samarkand', 800_000, false))->toBe(30_000));"
      ]
    }
  ],
  "pitfalls": [
    "Biznes qoidalarini controller yoki model event'lariga yozib, faqat sekin feature testlar bilan qamrash.",
    "Faqat \"yaxshi\" holatni test qilib, chegaralarni o'tkazib yuborish.",
    "Test nomlarida texnik detallar: biznes qoidasi ko'rinmaydi.",
    "Qoidalar kombinatsiyalarini e'tiborsiz qoldirish."
  ]
});
