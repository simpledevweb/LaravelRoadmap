/* Chuqur dars: 1.18. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.18", {
  "lesson": [
    "### Reflection nima",
    "Runtime'da klass, metod, property, parametr, attribute va tiplar haqida ma'lumot olish (introspection) va ba'zan ularni o'zgartirish. Framework'larning \"sehri\" shunga tayanadi.",
    "",
    "### Asosiy klasslar",
    "`ReflectionClass`, `ReflectionObject`, `ReflectionMethod`, `ReflectionProperty`, `ReflectionFunction`, `ReflectionParameter`, `ReflectionNamedType` / `ReflectionUnionType`, `ReflectionEnum`, `ReflectionAttribute`.",
    "",
    "### Laravel Container qanday ishlaydi",
    "Konstruktor parametrlarini `ReflectionClass::getConstructor()->getParameters()` bilan o'qiydi, har parametr tipini `getType()` orqali topadi va rekursiv resolve qiladi (**autowiring**). Route model binding ham parametr tipiga qarab ishlaydi.",
    "",
    "### Foydali amallar",
    "- `newInstanceArgs()`, `newInstanceWithoutConstructor()`",
    "- `getAttributes()` (1.16)",
    "- `ReflectionProperty::setValue()` — private'ga yozish (8.1 dan `setAccessible` kerak emas)",
    "- 8.4: `newLazyGhost` / `newLazyProxy` — lazy obyektlar (DI va ORM uchun asos)",
    "- `ReflectionClass::isEnum()` (8.1), `isReadOnly()` (8.2)",
    "",
    "### Narx va xavf",
    "Reflection sekin va incapsulation'ni buzadi. Biznes kodda emas, infratuzilmada (container, serializer, test helperlari) ishlating. Natijani keshlang.",
    "",
    "### Alternativa",
    "Aniq interface, `class-string` + statik tahlil, kod generatsiyasi (build vaqtida) — runtime reflection o'rniga.",
    "",
    "### Reflection API xaritasi",
    "- `ReflectionClass`: `getName`, `getShortName`, `getNamespaceName`, `getParentClass`, `getInterfaceNames`, `getTraitNames`, `getMethods`, `getProperties`, `getConstants`, `getConstructor`, `newInstance*`, `isFinal/isAbstract/isInterface/isInstantiable/isEnum`, `implementsInterface`, `getAttributes`.",
    "- `ReflectionMethod` / `ReflectionFunction`: `getParameters`, `getReturnType`, `invoke/invokeArgs`, `getClosure`, `isStatic/isPublic`, `getDocComment`, `getNumberOfRequiredParameters`.",
    "- `ReflectionParameter`: `getName`, `getType`, `isOptional`, `isDefaultValueAvailable`, `getDefaultValue`, `isVariadic`, `isPromoted`, `allowsNull`.",
    "- `ReflectionProperty`: `getType`, `isReadOnly`, `isPromoted`, `getValue/setValue`, `isInitialized` (tipli, initsializatsiyalanmaganmi), `hasDefaultValue`.",
    "- `ReflectionNamedType` / `UnionType` / `IntersectionType`: `getName`, `allowsNull`, `isBuiltin`.",
    "- `ReflectionEnum`, `ReflectionObject`, `ReflectionGenerator`, `ReflectionReference`.",
    "",
    "### Container autowiring bosqichma-bosqich",
    "1. `new ReflectionClass($abstract)` — instantiable?",
    "2. Konstruktor yo'q → `new $class`.",
    "3. Har parametr uchun `getType()`: klass tip → container'dan resolve (rekursiya); skalyar tip → `getDefaultValue()` yoki kontekstual binding.",
    "4. `newInstanceArgs($deps)`.",
    "Laravel: `Container::build()`; circular bog'liqlik `BindingResolutionException`.",
    "",
    "### Metadata va keshlash",
    "Reflection chaqiruvi sekin va xotira talab qiladi. Framework har ishga tushganda emas, **kompilyatsiya/optimize** vaqtida natijani keshlaydi (route cache, config cache, event cache). Production: `php artisan optimize`.",
    "",
    "### Foydali texnikalar",
    "- `ReflectionMethod::getClosure($obj)` — private metodni chaqirish (testda).",
    "- `ReflectionClass::getConstants()` — enum-o'xshash qiymatlar ro'yxati.",
    "- Doc comment: `getDocComment()` — eski annotatsiyalar uchun.",
    "- `ReflectionClass::newInstanceWithoutConstructor()` — ORM/serializer obyektni konstruktorsiz yaratadi (hydration).",
    "- Lazy objects (8.4): `newLazyGhost`, `newLazyProxy`, `isUninitializedLazyObject`, `markLazyObjectAsInitialized`, `resetAsLazyGhost`.",
    "",
    "### Reflection va xavfsizlik",
    "Dinamik klass nomini foydalanuvchidan olib `new ReflectionClass($input)` qilish ixtiyoriy klassni yuklaydi/instanziya qiladi (xavfli): oq ro'yxat ishlating. `ReflectionProperty::setValue` biznes invariantlarni chetlab o'tadi.",
    "",
    "### Alternativalar",
    "Interfeys + statik factory; kod generatsiyasi (compile-time); PHPStan / Rector kabi AST asosidagi vositalar (`nikic/php-parser`) — kodni **bajarmasdan** tahlil qiladi."
  ],
  "examples": [
    {
      "title": "Mini autowiring",
      "lang": "php",
      "code": [
        "function make(string $class): object",
        "{",
        "    $ref = new ReflectionClass($class);",
        "    $ctor = $ref->getConstructor();",
        "    if (!$ctor) return new $class();",
        "",
        "    $deps = array_map(function (ReflectionParameter $p) {",
        "        $t = $p->getType();",
        "        if ($t instanceof ReflectionNamedType && !$t->isBuiltin()) return make($t->getName());",
        "        if ($p->isDefaultValueAvailable()) return $p->getDefaultValue();",
        "        throw new LogicException(\"Resolve qilib bo'lmadi: {$p->getName()}\");",
        "    }, $ctor->getParameters());",
        "",
        "    return $ref->newInstanceArgs($deps);",
        "}"
      ]
    },
    {
      "title": "Private property o'qish (test)",
      "lang": "php",
      "code": [
        "$p = new ReflectionProperty(Order::class, 'status');",
        "$p->setValue($order, 'paid');",
        "echo $p->getValue($order);"
      ]
    },
    {
      "title": "Lazy ghost (8.4)",
      "lang": "php",
      "code": [
        "$ref = new ReflectionClass(Report::class);",
        "$report = $ref->newLazyGhost(function (Report $r) {",
        "    $r->__construct(loadHeavyData());      // faqat birinchi murojaatda",
        "});"
      ]
    },
    {
      "title": "Parametrlar haqida ma'lumot",
      "lang": "php",
      "code": [
        "$m = new ReflectionMethod(Mailer::class, '__construct');",
        "foreach ($m->getParameters() as $p) {",
        "    printf(\"%s %s%s\\n\",",
        "        $p->getType() ?? 'mixed',",
        "        $p->getName(),",
        "        $p->isDefaultValueAvailable() ? ' = ' . var_export($p->getDefaultValue(), true) : '');",
        "}"
      ]
    },
    {
      "title": "Private metodni test qilish",
      "lang": "php",
      "code": [
        "$m = new ReflectionMethod(Calculator::class, 'rounding');",
        "$out = $m->getClosure(new Calculator())(2.5);"
      ]
    }
  ],
  "pitfalls": [
    "Reflection har so'rovda sekin: container yoki serializer natijasini keshlang.",
    "Private'ga kirish incapsulation'ni buzadi; biznes mantiqda emas, faqat test/infratuzilmada.",
    "`newInstanceWithoutConstructor()` invariantlarni chetlab o'tadi: obyekt yaroqsiz holatda bo'lishi mumkin.",
    "Union/intersection tiplar uchun `getType()` `ReflectionNamedType` emas: `instanceof` bilan tekshiring.",
    "Reflection natijalarini keshlamasangiz, har so'rovda sekinlik: framework keshlaydi, o'zingizniki ham keshlang.",
    "Dinamik klass nomini foydalanuvchidan olish ixtiyoriy klassni yuklash: oq ro'yxat.",
    "Union tip uchun `getType()` `ReflectionNamedType` emas: `getTypes()`.",
    "`newInstanceWithoutConstructor()` invariantlarni chetlab o'tadi."
  ]
});
