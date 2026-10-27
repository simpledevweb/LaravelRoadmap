/* Chuqur dars: 3.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("3.6", {
  "lesson": [
    "### Interface",
    "Interface — faqat **shartnoma** (metod imzolari va konstantalar), holat yo'q. Klass bir nechta interface'ni amalga oshiradi. Foydasi: bog'liqlikni interface'ga yo'naltirib, implementatsiyani almashtirish va test uchun fake berish (**Dependency Inversion**).",
    "",
    "### Abstract class",
    "Qisman implementatsiya + abstract metodlar + holat (property). Klass faqat **bitta** abstract klassdan meros oladi. Umumiy kod va \"is-a\" munosabati bo'lganda foydali (**Template Method**).",
    "",
    "### Taqqoslash",
    "| | Interface | Abstract class |",
    "|---|---|---|",
    "| Holat (property) | yo'q | bor |",
    "| Metod tanasi | yo'q | bor (konkret metodlar) |",
    "| Ko'p implement | ha | yo'q (bitta meros) |",
    "| Konstruktor | yo'q (e'lon mumkin, tavsiya etilmaydi) | bor |",
    "| Asosiy maqsad | shartnoma | umumiy kod + shartnoma |",
    "",
    "### Tanlash qoidasi",
    "1. Faqat \"nima qila oladi\" — interface.",
    "2. Umumiy holat/kod kerak va bitta ota ierarxiya mantiqli — abstract class.",
    "3. Ikkalasi: interface bilan shartnoma, abstract klass bilan standart implementatsiya (`BaseX implements X`).",
    "",
    "### Interface segregation",
    "Katta interface o'rniga kichik, maqsadli interface'lar (`Readable`, `Writable`): klass kerak bo'lmagan metodlarni amalga oshirishga majbur bo'lmasin.",
    "",
    "### Marker interface va trait",
    "Metodsiz interface tur belgilash uchun (`ShouldQueue`). Trait — kod qayta ishlatish; interface bilan birga ishlatib, tur ham belgilanadi.",
    "",
    "### PHP xususiyatlari",
    "Interface'da `public` metodlar, konstantalar; 8.4 da property hooks e'loni; abstract klassda abstract + konkret metodlar. `instanceof` ikkala uchun ishlaydi.",
    "",
    "### Laravel",
    "`Illuminate\\Contracts\\*` interface'lari, `bind(Interface::class, Impl::class)` container bog'lamasi, abstract `Command`/`Notification` bazalari."
  ],
  "examples": [
    {
      "title": "Interface + abstract base",
      "lang": "php",
      "code": [
        "interface Exporter { public function export(array $rows): string; }",
        "",
        "abstract class BaseExporter implements Exporter",
        "{",
        "    final public function export(array $rows): string",
        "    {",
        "        return implode($this->separator(), array_map([$this, 'format'], $rows));",
        "    }",
        "    abstract protected function format(array $row): string;",
        "    protected function separator(): string { return \"\\n\"; }",
        "}",
        "",
        "final class CsvExporter extends BaseExporter { protected function format(array $r): string { return implode(',', $r); } }",
        "final class JsonLinesExporter extends BaseExporter { protected function format(array $r): string { return json_encode($r, JSON_UNESCAPED_UNICODE); } }"
      ]
    },
    {
      "title": "ISP: kichik interface",
      "lang": "php",
      "code": [
        "interface Readable { public function read(): string; }",
        "interface Writable { public function write(string $s): void; }",
        "",
        "final class LogFile implements Readable, Writable { /* ikkalasi ham kerak */ public function read(): string { return ''; } public function write(string $s): void {} }",
        "final class Config implements Readable { public function read(): string { return '{}'; } }   // yozish kerak emas"
      ]
    }
  ],
  "pitfalls": [
    "Interface'ga keraksiz metodlar qo'shish implementatorlarni bo'sh/xato metod yozishga majbur qiladi: kichik interface'lar.",
    "Abstract klassga hamma narsani joylash \"God base class\" hosil qiladi: ko'p mas'uliyat bo'lsa kompozitsiya.",
    "Interface'da konstruktor e'lon qilish shartnomani chalkashtiradi: fabrika yoki DI ishlating.",
    "Bitta implementatsiyasi bor interface ko'pincha ortiqcha: haqiqiy ehtiyoj (test/ikkinchi implementatsiya) bo'lsa yarating."
  ]
});
