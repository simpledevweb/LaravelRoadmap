/* Chuqur dars: 5.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("5.13", {
  "lesson": [
    "### Specification",
    "**Specification** — biznes qoidani (shartni) **alohida obyekt** sifatida ifodalaydi: `isSatisfiedBy($candidate): bool`. Qoidalarni `and`, `or`, `not` bilan birlashtirish mumkin.",
    "",
    "### Muammo",
    "Murakkab shartlar (`$user->active && $user->age >= 18 && !$user->banned`) ko'p joyda takrorlanadi va o'zgartirish qiyin.",
    "",
    "### Tuzilma",
    "- `Specification` interface: `isSatisfiedBy()`.",
    "- `AndSpecification`, `OrSpecification`, `NotSpecification`.",
    "- Konkret: `IsAdult`, `HasVerifiedEmail`, `NotBanned`.",
    "",
    "### Foydasi",
    "- Qoida nomlanadi va bir joyda (DRY).",
    "- Qayta kompozitsiya (yangi talab = yangi birikma).",
    "- Alohida test.",
    "- Domen tilida ifodalanadi.",
    "",
    "### Ikki ishlatilishi",
    "1. **Validatsiya/tanlash:** obyekt shartga mos keladimi (`isSatisfiedBy`).",
    "2. **So'rov:** shartni DB so'roviga aylantirish (`toQuery()`) — Eloquent scope/Criteria bilan.",
    "",
    "### Laravel'da",
    "Maxsus validatsiya `Rule` obyektlari, Policy, Eloquent `scope`lar, `Pipeline` filtrlari shunga yaqin.",
    "",
    "### Ehtiyot",
    "Oddiy 1–2 shart uchun Specification ortiqcha. Xotirada filtrlash va DB so'rovini ikki xil yozmaslik uchun qaysi biri asosiy ekanini hal qiling."
  ],
  "examples": [
    {
      "title": "Kompozitsiya qilinadigan qoidalar",
      "lang": "php",
      "code": [
        "interface Spec { public function ok(User $u): bool; }",
        "final class IsAdult implements Spec { public function ok(User $u): bool { return $u->age >= 18; } }",
        "final class NotBanned implements Spec { public function ok(User $u): bool { return !$u->banned; } }",
        "final class AllOf implements Spec { public function __construct(private Spec ...$s) {} public function ok(User $u): bool { foreach ($this->s as $x) { if (!$x->ok($u)) return false; } return true; } }",
        "",
        "$canPurchase = new AllOf(new IsAdult(), new NotBanned());",
        "$canPurchase->ok($user);"
      ]
    }
  ],
  "pitfalls": [
    "1–2 oddiy shart uchun Specification ortiqcha murakkablik.",
    "Xotira filtri va DB so'rovi ikki xil yozilsa qoida ikki joyda ajraladi.",
    "Spec ichida DB chaqiruvlari (N+1) tsiklda sekinlashtiradi.",
    "Spec nomlari domen tilida bo'lmasa foyda yo'qoladi (`CheckA`, `Rule1`)."
  ]
});
