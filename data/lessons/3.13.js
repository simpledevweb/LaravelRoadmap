/* Chuqur dars: 3.13. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("3.13", {
  "lesson": [
    "### Obyekt shartnomasi",
    "Obyekt shartnomasi (contract) — obyektning chaqiruvchiga bergan **va'dalari**:",
    "- **Precondition (old shart):** chaqiruvchi nimani ta'minlashi shart (argument formati, obyekt holati).",
    "- **Postcondition (keyingi shart):** metod muvaffaqiyatli tugagach nima kafolatlanadi (qaytgan qiymat, holat).",
    "- **Invariant:** obyektning butun hayoti davomida har doim to'g'ri bo'ladigan qoida.",
    "Bu **Design by Contract** (B. Meyer) g'oyasi.",
    "",
    "### PHP'da ifodalash",
    "- **Tip e'lonlari** (`int`, `?User`, union, `never`) — eng arzon shartnoma.",
    "- **Validatsiya + exception:** precondition buzilsa `InvalidArgumentException` (chaqiruvchi xatosi), postcondition buzilsa `LogicException`.",
    "- `readonly` va private holat: invariantlarni himoya qiladi.",
    "- **Interface:** shartnomaning ommaviy qismi.",
    "- **PHPDoc:** `@throws`, `@return non-empty-string`, `@param positive-int`, `@phpstan-assert`.",
    "- `assert()` — dev'da qo'shimcha tekshiruv (productionda `zend.assertions=-1`).",
    "",
    "### Liskov va shartnoma",
    "Voris ota shartnomasini buzmasligi kerak:",
    "- Precondition'ni **kuchaytirmaydi** (ota kabul qilganini rad etmaydi).",
    "- Postcondition'ni **susaytirmaydi** (ota kafolatidan kamini bermaydi).",
    "- Invariantni saqlaydi.",
    "- Ota tashlamagan yangi exception turini tashlamaydi.",
    "",
    "### Hujjatlash",
    "Interface ustida kutilgan xatti-harakat va xatolarni yozing: `@throws NotFound`, \"bo'sh massiv qaytaradi, `null` emas\" kabi aniq va'dalar chaqiruvchiga vaqt tejaydi.",
    "",
    "### Contract testlari",
    "Bitta interface'ning barcha implementatsiyalari uchun bir xil test to'plami: `abstract class UserRepoContractTest` + har implementatsiya uchun vorislik.",
    "",
    "### Qaytish qiymatlari",
    "`null` qaytarishmi yoki exception — shartnomada aniq belgilang: \"topilmasa `null`\" yoki \"topilmasa `NotFound`\" (`find` vs `findOrFail`)."
  ],
  "examples": [
    {
      "title": "Pre/postcondition",
      "lang": "php",
      "code": [
        "final class Discount",
        "{",
        "    /** @param int<0,100> $percent */",
        "    public function apply(int $price, int $percent): int",
        "    {",
        "        $price >= 0 or throw new InvalidArgumentException('Narx manfiy bo\\'lmasin');            // precondition",
        "        $percent >= 0 && $percent <= 100 or throw new InvalidArgumentException('Foiz 0..100');",
        "        $result = intdiv($price * (100 - $percent), 100);",
        "        assert($result >= 0 && $result <= $price);                                               // postcondition",
        "        return $result;",
        "    }",
        "}"
      ]
    },
    {
      "title": "Contract test",
      "lang": "php",
      "code": [
        "abstract class UserRepoContract extends TestCase",
        "{",
        "    abstract protected function repo(): UserRepo;",
        "",
        "    public function test_find_returns_null_for_missing(): void { $this->assertNull($this->repo()->find(999999)); }",
        "    public function test_save_then_find(): void { $u = $this->repo()->save(new User('a@b.uz')); $this->assertEquals($u, $this->repo()->find($u->id)); }",
        "}",
        "final class DbUserRepoTest extends UserRepoContract { protected function repo(): UserRepo { return new DbUserRepo(); } }",
        "final class InMemoryUserRepoTest extends UserRepoContract { protected function repo(): UserRepo { return new InMemoryUserRepo(); } }"
      ]
    }
  ],
  "pitfalls": [
    "Voris ota qabul qilgan kiritmani rad etsa (precondition kuchaytirilsa), LSP buziladi.",
    "`assert()` productionda o'chiq bo'ladi: majburiy tekshiruvni exception bilan yozing.",
    "Shartnomada `null` yoki exception qaytarishi aniq belgilanmasa, chaqiruvchilar farqli kutadi.",
    "Hujjatlanmagan xatti-harakatga tayanish (implicit contract) keyingi o'zgarishda kodni sindiradi."
  ]
});
