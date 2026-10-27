/* Chuqur dars: 5.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("5.10", {
  "lesson": [
    "### Template Method",
    "**Template Method** — ota klassda algoritm **skeleti** (qadamlar tartibi) belgilanadi, ayrim qadamlar abstract/`protected` qilib vorislarga qoldiriladi. Voris skeletni o'zgartirmasdan qadamlarni to'ldiradi.",
    "",
    "### Tuzilma",
    "- `final public function run()` — skelet (override qilinmaydi).",
    "- `abstract protected function step()` — majburiy qadam.",
    "- `protected function hook()` — ixtiyoriy \"hook\" (default bo'sh).",
    "",
    "### Qachon",
    "Bir xil tartibli, lekin qadamlari turlicha jarayonlar: import (o'qish → tekshirish → saqlash), eksport formatlari, hisobotlar, test setUp/tearDown.",
    "",
    "### Hollywood qoidasi",
    "\"Bizga qo'ng'iroq qilmang, biz sizga qo'ng'iroq qilamiz\": ota klass voris metodlarini chaqiradi (inversion of control).",
    "",
    "### Laravel'da",
    "`Command::handle()`, `FormRequest` (`rules`, `authorize`), Eloquent hook'lari (`boot`), `ServiceProvider` (`register`/`boot`), PHPUnit `setUp()`.",
    "",
    "### Strategy bilan farq",
    "Template Method — **meros** bilan (kompilyatsiya vaqtida), Strategy — **kompozitsiya** bilan (runtime). Zamonaviy kodda ko'pincha Strategy afzal, chunki meros qattiqroq bog'laydi.",
    "",
    "### Ehtiyot",
    "- Skeletni `final` qiling.",
    "- Voris sonini va hook'lar sonini ko'paytirmang (fragile base class).",
    "- Voris qadamlarni chaqirish tartibiga tayanmasin."
  ],
  "examples": [
    {
      "title": "Import skeleti",
      "lang": "php",
      "code": [
        "abstract class Importer",
        "{",
        "    final public function import(string $path): int",
        "    {",
        "        $n = 0;",
        "        foreach ($this->read($path) as $row) {",
        "            $this->validate($row);",
        "            $this->save($this->map($row));",
        "            $n++;",
        "        }",
        "        $this->afterImport($n);",
        "        return $n;",
        "    }",
        "    abstract protected function read(string $path): iterable;",
        "    abstract protected function map(array $row): array;",
        "    protected function validate(array $row): void {}              // hook",
        "    protected function save(array $d): void { DB::table('items')->insert($d); }",
        "    protected function afterImport(int $count): void {}           // hook",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Skeletni `final` qilmasangiz voris tartibni buzishi mumkin.",
    "Ko'p hook va abstract qadamlar ierarxiyani mo'rtlashtiradi: Strategy ko'ring.",
    "Voris metodlarni chaqirish tartibiga tayanish ota o'zgarganda sinadi.",
    "Ota klassga ortiqcha mantiq to'planib God class hosil bo'ladi."
  ]
});
