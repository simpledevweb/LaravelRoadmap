/* Chuqur dars: 3.8. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("3.8", {
  "lesson": [
    "### Uch munosabat",
    "Obyektlar orasidagi aloqaning kuchi bo'yicha uch daraja bor:",
    "",
    "**Association (assotsiatsiya)** — umumiy \"biladi/foydalanadi\" aloqasi. Obyektlar bir-biridan mustaqil yashaydi. Misol: `Teacher` ↔ `Student`; `Customer` buyurtma beradi.",
    "",
    "**Aggregation (agregatsiya)** — \"butun va qism\", lekin qism butundan **mustaqil** yashaydi (\"has-a\", zaif). Misol: `Department` va `Employee`: bo'lim yopilsa ham xodim mavjud.",
    "",
    "**Composition (kompozitsiya)** — \"butun va qism\", qism butunsiz **mavjud bo'lmaydi** (kuchli, hayot davri bog'liq). Misol: `Order` va `OrderLine`: buyurtma o'chsa, qatorlari ham o'chadi.",
    "",
    "### Qarorni qanday qabul qilish",
    "Savol: \"Butun yo'q qilinsa, qism ham ma'noni yo'qotadimi?\"",
    "- Ha → composition (qism butunning ichida yaratiladi va boshqariladi).",
    "- Yo'q, lekin \"tarkibida\" → aggregation (qism tashqaridan beriladi).",
    "- Shunchaki ma'lumot/foydalanish → association.",
    "",
    "### PHP'da ifodalash",
    "- **Composition:** butun qismni o'zi yaratadi yoki faqat o'zi orqali kiradi; tashqariga obyektni to'g'ridan-to'g'ri bermaydi.",
    "- **Aggregation:** qism konstruktorga/setter'ga tashqaridan keladi.",
    "- **Association:** metod argumenti yoki bog'lamali ID.",
    "",
    "### Ma'lumotlar bazasi bilan",
    "Composition ko'pincha `ON DELETE CASCADE` bilan ifodalanadi (buyurtma qatorlari). Aggregation/association — oddiy FK (`SET NULL` yoki cheklov). Laravel: `hasMany` + `cascadeOnDelete()`, `belongsTo`.",
    "",
    "### DDD'da",
    "**Aggregate:** ichidagi qismlar (entity/VO) faqat **aggregate root** orqali o'zgartiriladi: `Order` ildiz, `OrderLine` unga tegishli. Tashqi kod qatorni to'g'ridan-to'g'ri o'zgartirmaydi.",
    "",
    "### Xatolar",
    "Hamma munosabatni association deb olish hayot davri qoidalarini yashiradi: kim kimni yaratadi, kim yo'q qiladi — aniq belgilang."
  ],
  "examples": [
    {
      "title": "Composition: qator buyurtma ichida",
      "lang": "php",
      "code": [
        "final class Order",
        "{",
        "    /** @var list<OrderLine> */",
        "    private array $lines = [];",
        "",
        "    public function addLine(string $sku, int $qty, int $price): void",
        "    {",
        "        $this->lines[] = new OrderLine($sku, $qty, $price);    // qismni butunning o'zi yaratadi",
        "    }",
        "    public function total(): int { return array_sum(array_map(fn ($l) => $l->subtotal(), $this->lines)); }",
        "}"
      ]
    },
    {
      "title": "Aggregation: xodim tashqaridan",
      "lang": "php",
      "code": [
        "final class Department",
        "{",
        "    /** @var list<Employee> */",
        "    private array $employees = [];",
        "    public function add(Employee $e): void { $this->employees[] = $e; }   // xodim mustaqil mavjud",
        "}"
      ]
    },
    {
      "title": "DB cascade (Laravel)",
      "lang": "php",
      "code": [
        "Schema::create('order_lines', function (Blueprint $t) {",
        "    $t->id();",
        "    $t->foreignId('order_id')->constrained()->cascadeOnDelete();   // composition",
        "    $t->foreignId('product_id')->nullable()->constrained()->nullOnDelete(); // association",
        "});"
      ]
    }
  ],
  "pitfalls": [
    "Hamma aloqani bir xil (association) deb olish hayot davri qoidasini yashiradi: kim yaratadi va kim o'chiradi aniq bo'lsin.",
    "Composition qismini tashqariga o'zgaruvchan holatda berish butun invariantini buzadi: nusxa yoki immutable qaytaring.",
    "Aggregate ichidagi obyektni ildizsiz bevosita o'zgartirish biznes qoidalarni chetlab o'tadi.",
    "Cascade o'chirishni tasodifan association aloqaga qo'llash kerakli ma'lumotni yo'qotadi."
  ]
});
