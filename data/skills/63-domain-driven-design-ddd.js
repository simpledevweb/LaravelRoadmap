/* 63 · Domain-Driven Design (DDD)
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 63,
  slug: "domain-driven-design-ddd",
  title: "Domain-Driven Design (DDD)",
  group: "architecture",
  description: "Domain-Driven Design (DDD) — murakkab biznes domenlari uchun dasturiy ta'minot yaratish yondashuvi: kod domen ekspertlari tili va modeliga mos keladi, tizim bounded context'larga bo'linadi, biznes qoidalari aniq domen obyektlarida himoyalanadi. Senior dasturchi DDD'ning strategik va taktik vositalarini biladi va ularni faqat murakkablik oqlaganda qo'llaydi.",
  subskills: [
    {
      id: "63.1",
      title: "Ubiquitous Language",
      description: [
        "Ubiquitous language — dasturchilar va domen ekspertlari uchun umumiy, aniq til: bir xil atamalar suhbatlarda, hujjatlarda, tiketlarda va **kodda** (class, metod, o'zgaruvchi nomlari). \"Buyurtma bekor qilindi\" → `$order->cancel()`, `OrderCancelled`; \"Mijoz\" va \"Foydalanuvchi\" — agar biznes ularni farqlasa, kodda ham farqlanadi.",
        "",
        "Til bounded context ichida amal qiladi (bir so'z boshqa kontekstda boshqa ma'noda bo'lishi mumkin). Lug'at (glossary) — yangi jamoa a'zolari va noaniqliklarni hal qilish uchun.",
        "",
        "```text",
        "Lug'at (Billing konteksti):",
        "- Invoice (Hisob-faktura) — mijozga yuborilgan to'lov talabi; raqami unikal, o'zgarmas",
        "- Settle (To'lash) — hisob-faktura to'liq to'langan holatga o'tishi",
        "- Credit note — qisman yoki to'liq qaytarish hujjati",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Bir modul uchun domen lug'atini tuzib, koddagi nomlar bilan mos kelmaydigan atamalarni qayta nomlang.",
      acceptanceCriteria: [
        "Ubiquitous language tushunchasini biladi",
        "Koddagi nomlarni biznes tiliga moslaydi"
      ],
      prerequisites: [
        "6.1"
      ]
    },
    {
      id: "63.2",
      title: "Domain Model",
      description: [
        "Domen modeli — biznes tushunchalari, ularning munosabatlari, qoidalari va xatti-harakatini ifodalovchi obyektlar tizimi. U ma'lumotlar bazasi sxemasi emas — biznes qanday ishlashi haqidagi model. Boy (rich) model: ma'lumot va xatti-harakat birga, invariantlar ichkarida himoyalangan; anemik model: faqat getter/setter'li ma'lumot, mantiq servislarda tarqalgan.",
        "",
        "Laravel'da: Eloquent model'larni boy domen modeli sifatida ishlatish (pragmatik) yoki alohida toza domen obyektlari + repository'lar (qat'iy, murakkab domenlar uchun). Tanlov — domen murakkabligiga qarab.",
        "",
        "```php",
        "final class Subscription",
        "{",
        "    public function renew(CarbonImmutable $at): void",
        "    {",
        "        if ($this->isCancelled()) {",
        "            throw SubscriptionException::cannotRenewCancelled($this->id);",
        "        }",
        "        $this->endsAt = $this->endsAt->max($at)->add($this->plan->period());",
        "        $this->record(new SubscriptionRenewed($this->id, $this->endsAt));",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Anemik model va servisdan iborat bir qismni boy domen modeliga refactor qiling.",
      acceptanceCriteria: [
        "Boy va anemik model farqini biladi",
        "Domen modelini ma'lumot sxemasidan ajratadi"
      ],
      prerequisites: [
        "61.8"
      ]
    },
    {
      id: "63.3",
      title: "Entities",
      description: [
        "Entity — vaqt davomida o'zgaradigan, lekin **identifikatori** bilan ajraladigan obyekt: buyurtma, mijoz, hisob. Ikki entity atributlari bir xil bo'lsa ham, ID'lari farqli bo'lsa — turli obyektlar. Entity'ning hayot davri va holat o'tishlari bor.",
        "",
        "Dizayn: identifikator yaratilganda beriladi (ULID — DB'dan oldin ham ma'lum), holat faqat ma'noli metodlar orqali o'zgaradi (setter'lar emas), invariantlar har o'zgarishda tekshiriladi, tenglik ID bo'yicha.",
        "",
        "```php",
        "final class Customer",
        "{",
        "    private function __construct(private CustomerId $id, private Email $email, private CustomerStatus $status) {}",
        "",
        "    public static function register(CustomerId $id, Email $email): self",
        "    {",
        "        return new self($id, $email, CustomerStatus::Active);",
        "    }",
        "    public function changeEmail(Email $new): void { $this->email = $new; }",
        "    public function equals(self $other): bool { return $this->id->equals($other->id); }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Domeningizdagi entity'larni aniqlab, birini named constructor va xatti-harakat metodlari bilan yozing.",
      acceptanceCriteria: [
        "Entity va identifikator tushunchasini biladi",
        "Holatni ma'noli metodlar orqali o'zgartiradi"
      ],
      prerequisites: [
        "63.2"
      ]
    },
    {
      id: "63.4",
      title: "Value Objects",
      description: [
        "Value object — identifikatorsiz, faqat qiymati bilan aniqlanadigan, **o'zgarmas** obyekt: `Money`, `Email`, `PhoneNumber`, `Address`, `DateRange`, `Percentage`. Ikki value object qiymatlari teng bo'lsa — teng. Yaratilishda validatsiya qilinadi — noto'g'ri qiymatli obyekt mavjud bo'lolmaydi.",
        "",
        "Foydasi: primitive obsession'ni yo'qotadi (string o'rniga `Email`), qoidalar bir joyda, tiplar aniqroq (`Money` va `int` chalkashmaydi), xatolar erta. Laravel'da custom cast'lar orqali Eloquent bilan integratsiya.",
        "",
        "```php",
        "final readonly class Money",
        "{",
        "    public function __construct(public int $amount, public Currency $currency)",
        "    {",
        "        if ($amount < 0) throw new InvalidArgumentException('Manfiy summa');",
        "    }",
        "    public function add(self $o): self",
        "    {",
        "        $this->assertSameCurrency($o);",
        "        return new self($this->amount + $o->amount, $this->currency);",
        "    }",
        "    public function equals(self $o): bool { return $this->amount === $o->amount && $this->currency === $o->currency; }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Kod bazasidagi primitive obsession'ni (telefon, pul, email) value object'lar va custom cast'lar bilan almashtiring.",
      acceptanceCriteria: [
        "Value object xususiyatlarini biladi",
        "Ularni Eloquent cast'lar bilan integratsiya qiladi"
      ],
      prerequisites: [
        "3.9"
      ]
    },
    {
      id: "63.5",
      title: "Aggregates",
      description: [
        "Aggregate — birga izchil saqlanishi kerak bo'lgan obyektlar klasteri (masalan, `Order` + `OrderLine`lar): invariantlar butun aggregate uchun amal qiladi (\"buyurtma summasi qatorlar yig'indisiga teng\", \"maksimal 50 qator\"). Aggregate — tranzaksiya va izchillik chegarasi: bitta tranzaksiyada bitta aggregate o'zgaradi (ideal holda).",
        "",
        "Dizayn qoidalari: kichik aggregate'lar (katta — lock raqobati va performance muammosi), boshqa aggregate'larga ID orqali murojaat (obyekt havolasi emas), aggregate'lar orasidagi izchillik — eventual (domen event'lar orqali).",
        "",
        "```php",
        "final class Order   // aggregate root",
        "{",
        "    /** @var list<OrderLine> */",
        "    private array $lines = [];",
        "",
        "    public function addLine(ProductId $product, int $qty, Money $price): void",
        "    {",
        "        if (count($this->lines) >= 50) throw OrderException::tooManyLines();",
        "        $this->lines[] = new OrderLine($product, $qty, $price);   // CustomerId — faqat ID",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Domeningizda aggregate chegaralarini belgilang va bitta tranzaksiyada bir nechta aggregate o'zgarayotgan joylarni toping.",
      acceptanceCriteria: [
        "Aggregate'ni izchillik chegarasi sifatida tushunadi",
        "Kichik aggregate va ID orqali murojaat qoidalarini qo'llaydi"
      ],
      prerequisites: [
        "3.8"
      ]
    },
    {
      id: "63.6",
      title: "Aggregate Roots",
      description: [
        "Aggregate root — aggregate'ga yagona kirish nuqtasi: tashqi kod faqat root bilan ishlaydi (`$order->addLine()`), ichki obyektlarni (`OrderLine`) to'g'ridan-to'g'ri o'zgartirmaydi. Root barcha invariantlarni himoyalaydi va domen event'larini yozadi. Repository faqat root'lar uchun (`OrderRepository`, `OrderLineRepository` emas).",
        "",
        "Eloquent'da qiyinlik: `$order->lines()->create(...)` root'ni chetlab o'tadi — qat'iy DDD'da bu taqiqlanadi (relation'lar orqali o'zgarish faqat root metodlari ichida).",
        "",
        "```php",
        "// ❌ root chetlab o'tildi — invariant tekshirilmadi",
        "OrderLine::create(['order_id' => $id, 'qty' => 1000]);",
        "// ✅ root orqali",
        "$order = $orders->get($id);",
        "$order->addLine($productId, 1000, $price);   // limit va qoidalar tekshiriladi",
        "$orders->save($order);",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Aggregate ichki obyektlarini to'g'ridan-to'g'ri o'zgartirayotgan kodni root metodlari orqali ishlashga o'tkazing.",
      acceptanceCriteria: [
        "Aggregate root rolini biladi",
        "Root'ni chetlab o'tishning oldini oladi"
      ],
      prerequisites: [
        "63.5"
      ]
    },
    {
      id: "63.7",
      title: "Repositories",
      description: [
        "DDD'da repository — aggregate root'lar uchun kolleksiyaga o'xshash interfeys: `get(OrderId)`, `save(Order)`, domen tilida nomlangan qidiruvlar (`findOverdue()`). Interfeys domen qatlamida, implementatsiya (Eloquent, Doctrine) infratuzilmada. Domen kodi saqlash texnologiyasini bilmaydi.",
        "",
        "Eloquent bilan: agar Eloquent model'lar domen obyektlari bo'lsa — repository ko'pincha ortiqcha (scope va query object yetarli); toza domen obyektlari bilan — repository Eloquent model ↔ domen obyekti xaritalashini bajaradi (data mapper).",
        "",
        "```php",
        "interface OrderRepository",
        "{",
        "    public function get(OrderId $id): Order;            // topilmasa exception",
        "    public function save(Order $order): void;",
        "    /** @return list<Order> */",
        "    public function awaitingPaymentSince(CarbonImmutable $since): array;",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Bitta aggregate uchun domen interfeysi va Eloquent implementatsiyali repository yozing, testda in-memory variant bilan almashtiring.",
      acceptanceCriteria: [
        "DDD repository va \"yupqa\" repository farqini biladi",
        "Repository'ni faqat aggregate root'lar uchun yaratadi"
      ],
      prerequisites: [
        "5.11"
      ]
    },
    {
      id: "63.8",
      title: "Domain Services",
      description: [
        "DDD domen servisi — bir nechta aggregate yoki tashqi domen tushunchasini o'z ichiga olgan, hech qaysi entity'ga tabiiy tegishli bo'lmagan domen operatsiyasi: narx siyosati, pul o'tkazmasi, yetkazib berish narxini hisoblash. Holatsiz, domen tilida nomlangan, interfeys parametrlari domen obyektlari.",
        "",
        "Ehtiyot: hamma mantiqni domen servislariga ko'chirish — anemik model; avval mantiqni entity/value object'ga joylashtirishga urinish.",
        "",
        "```php",
        "final class ShippingCostCalculator   // domen servisi",
        "{",
        "    public function costFor(Order $order, Address $destination, ShippingZoneMap $zones): Money",
        "    {",
        "        $zone = $zones->zoneOf($destination);",
        "        return $order->subtotal()->gte($zone->freeFrom()) ? Money::zero() : $zone->baseRate();",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Entity'larga sig'maydigan bitta domen qoidasini domen servisi sifatida ajratib, unit testlang.",
      acceptanceCriteria: [
        "DDD domen servisi mezonlarini biladi",
        "Anemik model xavfini hisobga oladi"
      ],
      prerequisites: [
        "61.10"
      ]
    },
    {
      id: "63.9",
      title: "Application Services",
      description: [
        "DDD application servisi — use case'ni orkestratsiya qiladi: kirish DTO'sini qabul qiladi, repository'dan aggregate'ni oladi, domen metodini chaqiradi, saqlaydi, tranzaksiyani boshqaradi, domen event'larini yuboradi (yoki outbox'ga yozadi), natija DTO qaytaradi. Biznes qoidalar yo'q — ular domenda.",
        "",
        "Application servis — framework va domen o'rtasidagi chegara: controller'lar, CLI va consumer'lar uni chaqiradi; u domen va infratuzilma interfeyslarini ishlatadi.",
        "",
        "```php",
        "final class CancelOrderHandler",
        "{",
        "    public function __construct(private OrderRepository $orders, private EventBus $events) {}",
        "",
        "    public function __invoke(CancelOrder $command): void",
        "    {",
        "        DB::transaction(function () use ($command) {",
        "            $order = $this->orders->get($command->orderId);",
        "            $order->cancel($command->reason, now()->toImmutable());",
        "            $this->orders->save($order);",
        "            $this->events->publish(...$order->releaseEvents());",
        "        });",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Bitta use case'ni command + handler (application servis) sifatida yozib, domen mantiqi u yerga sizmaganini tekshiring.",
      acceptanceCriteria: [
        "Application servis mas'uliyatini DDD kontekstida biladi",
        "Domen event'larini to'g'ri yuboradi"
      ],
      prerequisites: [
        "61.9"
      ]
    },
    {
      id: "63.10",
      title: "Domain Events",
      description: [
        "Domen event — domenda sodir bo'lgan, biznes uchun ahamiyatli fakt (`OrderPlaced`, `PaymentReceived`), o'tgan zamonda nomlanadi, aggregate tomonidan yoziladi. Foydalari: aggregate'lar orasida eventual consistency (bir aggregate o'zgarishi boshqasiga event orqali ta'sir qiladi), yon ta'sirlarni ajratish (email, statistika), audit, integratsiya event'lari uchun manba.",
        "",
        "Mexanizm: aggregate event'larni ichki ro'yxatga yozadi (`record()`), application servis saqlagandan keyin ularni yuboradi (commit'dan keyin yoki outbox orqali). Domen event'lari va integratsiya event'lari (servislararo — barqaror shartnoma) farqlanadi.",
        "",
        "```php",
        "trait RecordsEvents",
        "{",
        "    private array $events = [];",
        "    protected function record(object $event): void { $this->events[] = $event; }",
        "    public function releaseEvents(): array { [$e, $this->events] = [$this->events, []]; return $e; }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Aggregate'ga event yozish mexanizmini qo'shib, event'larni commit'dan keyin yuboruvchi application servis yozing.",
      acceptanceCriteria: [
        "Domen event'larining rolini biladi",
        "Domen va integratsiya event'larini farqlaydi"
      ],
      prerequisites: [
        "48.1"
      ]
    },
    {
      id: "63.11",
      title: "Bounded Contexts",
      description: [
        "Bounded context — strategik DDD'ning markaziy tushunchasi: muayyan model va ubiquitous language amal qiladigan aniq chegara. Har kontekst o'z modeliga ega; \"Mijoz\" Sotuv kontekstida (lid, muloqot tarixi) va Buxgalteriyada (to'lovchi, hisob) — turli modellar.",
        "",
        "Chegaralarni topish: tilning o'zgarishi (bir so'z turli ma'nolarda), turli biznes bo'limlari va jarayonlari, turli o'zgarish tezligi. Kontekst — modul yoki servis chegarasi uchun asos; jamoa bir yoki bir nechta kontekstga egalik qiladi.",
        "",
        "```text",
        "[Catalog]  Product: nomi, tavsif, rasmlar, kategoriya",
        "[Pricing]  PricedItem: sku, narx, chegirma qoidalari",
        "[Ordering] OrderLine: sku, miqdor, buyurtma vaqtidagi narx (snapshot)",
        "[Shipping] Parcel: og'irlik, o'lchamlar, manzil",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Tizimingizni bounded context'larga ajratib, har birining modeli va tilini qisqacha tasvirlang.",
      acceptanceCriteria: [
        "Bounded context'larni aniqlash mezonlarini biladi",
        "Kontekstlarni modul/servis chegaralariga bog'laydi"
      ],
      prerequisites: [
        "61.7"
      ]
    },
    {
      id: "63.12",
      title: "Context Mapping",
      description: [
        "Context map — bounded context'lar o'rtasidagi munosabatlar xaritasi. Naqshlar: **Partnership** (birga rivojlanadi), **Shared Kernel** (umumiy kichik model — ehtiyotkorlik bilan), **Customer–Supplier** (upstream downstream ehtiyojlarini hisobga oladi), **Conformist** (downstream upstream modelini qabul qiladi), **Anticorruption Layer** (tarjima qatlami), **Open Host Service** + **Published Language** (barqaror ommaviy API/sxema), **Separate Ways**.",
        "",
        "Xarita texnik integratsiya va jamoalar munosabatlarini ko'rsatadi — rejalashtirish va muzokaralar uchun foydali.",
        "",
        "```text",
        "[Ordering] ──(Customer/Supplier)──▶ [Inventory]",
        "[Ordering] ──(ACL)──▶ [Legacy ERP]",
        "[Billing]  ──(Conformist)──▶ [Payme API]",
        "[Catalog]  ──(Open Host + Published Language: JSON events)──▶ [Search, Recommendations]",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Tizimingiz kontekstlari uchun context map chizib, har munosabat turini va integratsiya usulini belgilang.",
      acceptanceCriteria: [
        "Context mapping naqshlarini biladi",
        "Munosabatlarni texnik va tashkiliy jihatdan tahlil qiladi"
      ],
      prerequisites: [
        "63.11"
      ]
    },
    {
      id: "63.13",
      title: "Anti-Corruption Layer",
      description: [
        "Anti-corruption layer (ACL) — tashqi yoki legacy tizim modelining sizning domeningizga \"sizib kirishi\"ning oldini oluvchi tarjima qatlami: tashqi tushunchalar, formatlar va xatolar sizning domen tilingizga aylantiriladi. Adapter + translator + (kerak bo'lsa) facade.",
        "",
        "Qo'llanishi: legacy ERP, to'lov provayderlari, davlat API'lari, boshqa jamoalar servislari — ularning noqulay yoki o'zgaruvchan modeli sizning kodingizda tarqalmasligi uchun. Tashqi tizim o'zgarsa — faqat ACL o'zgaradi.",
        "",
        "```php",
        "final class ErpCustomerTranslator   // ACL",
        "{",
        "    public function toDomain(array $erp): Customer",
        "    {",
        "        return Customer::fromExternal(",
        "            id: CustomerId::fromString($erp['KUNNR']),",
        "            name: trim($erp['NAME1'].' '.$erp['NAME2']),",
        "            taxId: TaxId::fromString($erp['STCD1'] ?? throw new InvalidErpData('INN yo\\'q')),",
        "        );",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Tashqi tizim integratsiyasi uchun ACL yozing: uning maydon nomlari va xatolari domen kodiga tushmasin.",
      acceptanceCriteria: [
        "ACL maqsadi va tarkibini biladi",
        "Tashqi modelning domenga sizishini oldini oladi"
      ],
      prerequisites: [
        "5.5"
      ]
    },
    {
      id: "63.14",
      title: "Factories",
      description: [
        "DDD factory — murakkab aggregate yoki entity yaratish mantiqini ajratadi: ko'p qadamli yaratish, invariantlarni boshidanoq ta'minlash, turli manbalardan qayta tiklash (rekonstitutsiya — DB'dan yuklash). Shakllar: entity'dagi statik named constructor (`Order::place(...)`), alohida factory class (murakkab bog'liqliklar bilan).",
        "",
        "Laravel model factory'lari (test ma'lumotlari uchun) — boshqa narsa; DDD factory — production domen kodi.",
        "",
        "```php",
        "final class Order",
        "{",
        "    public static function place(OrderId $id, CustomerId $customer, array $lines, CarbonImmutable $at): self",
        "    {",
        "        if ($lines === []) throw OrderException::empty();",
        "        $order = new self($id, $customer, OrderStatus::Placed, $at);",
        "        foreach ($lines as $l) { $order->addLine($l->product, $l->qty, $l->price); }",
        "        $order->record(new OrderPlaced($id, $customer, $order->total(), $at));",
        "        return $order;",
        "    }",
        "}",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Murakkab aggregate yaratishni invariantlarni ta'minlovchi named constructor/factory'ga ko'chiring.",
      acceptanceCriteria: [
        "DDD factory va Laravel model factory farqini biladi",
        "Yaratishda invariantlarni ta'minlaydi"
      ],
      prerequisites: [
        "5.1"
      ]
    },
    {
      id: "63.15",
      title: "Invariants",
      description: [
        "Invariant — har doim to'g'ri bo'lishi kerak bo'lgan biznes qoida: \"balans manfiy emas\", \"buyurtma summasi qatorlar yig'indisiga teng\", \"obuna tugash sanasi boshlanishidan keyin\", \"bir mijozda bitta faol savat\". Invariantlar aggregate tomonidan himoyalanadi — noto'g'ri holatga o'tish imkonsiz.",
        "",
        "Joylashuv: aggregate ichidagi invariantlar — domen kodida (har o'zgarishda tekshiriladi); aggregate'lararo — eventual consistency yoki DB constraint'lari (unique, check); qat'iy kerak bo'lganda — DB darajasida ham himoya (ikki qatlam).",
        "",
        "```php",
        "public function withdraw(Money $amount): void",
        "{",
        "    if ($this->balance->lessThan($amount)) {",
        "        throw InsufficientFunds::for($this->id, $amount);   // invariant: balans ≥ 0",
        "    }",
        "    $this->balance = $this->balance->subtract($amount);",
        "}",
        "// + DB: CHECK (balance >= 0)",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Domeningizdagi asosiy invariantlarni ro'yxatlab, har birining kodda va DB'da qanday himoyalanganini tekshiring.",
      acceptanceCriteria: [
        "Invariant tushunchasini biladi",
        "Invariantlarni domen va DB darajasida himoyalaydi"
      ],
      prerequisites: [
        "14.18"
      ]
    },
    {
      id: "63.16",
      title: "Business Rules",
      description: [
        "Biznes qoidalari turlari: invariantlar (doim to'g'ri), validatsiya qoidalari (kirish shartlari), hisob-kitob qoidalari (narx, soliq, komissiya), siyosatlar (qachon chegirma, qachon tasdiq kerak), jarayon qoidalari (holat o'tishlari, muddatlar). Ular domen tilida, bir joyda va testlangan bo'lishi kerak.",
        "",
        "Tez o'zgaradigan qoidalar (chegirma foizlari, chegaralar) — konfiguratsiya yoki DB'da (admin tahrirlaydi), lekin mantiq kodda. Murakkab, kombinatsiyalanadigan qoidalar — specification yoki strategy naqshlari.",
        "",
        "```php",
        "final class RefundPolicy",
        "{",
        "    public function canRefund(Order $order, CarbonImmutable $now): bool",
        "    {",
        "        return $order->isPaid()",
        "            && ! $order->isShipped()",
        "            && $order->paidAt()->diffInDays($now) <= config('billing.refund_window_days');",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Kod bo'ylab tarqalgan bitta biznes qoidani policy class'ga jamlab, barcha chegaraviy holatlar bilan testlang.",
      acceptanceCriteria: [
        "Biznes qoidalari turlarini biladi",
        "Qoidalarni markazlashtirib testlaydi"
      ],
      prerequisites: [
        "5.13"
      ]
    },
    {
      id: "63.17",
      title: "Strategic vs Tactical DDD",
      description: [
        "**Strategik DDD** — katta rasm: domenni subdomenlarga ajratish (**core** — raqobat ustunligi, eng ko'p sarmoya; **supporting** — kerakli, lekin noyob emas; **generic** — tayyor yechim sotib olish mumkin: auth, email), bounded context'lar, context map, ubiquitous language. **Taktik DDD** — kod darajasidagi naqshlar: entity, value object, aggregate, repository, domen event, domen servis.",
        "",
        "Eng katta qiymat ko'pincha strategik qismda: to'g'ri chegaralar va core domenga e'tibor. Taktik naqshlarni hamma joyda qo'llash — overengineering; ular core domen uchun.",
        "",
        "```text",
        "Core:       Narxlash va marshrutlash algoritmi (raqobat ustunligi) → to'liq taktik DDD",
        "Supporting: Buyurtmalar boshqaruvi → yengil DDD / yaxshi Laravel kodi",
        "Generic:    Autentifikatsiya, bildirishnomalar → Sanctum, tayyor servislar",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Biznesingiz subdomenlarini core/supporting/generic'ga ajratib, har biri uchun yondashuvni belgilang.",
      acceptanceCriteria: [
        "Strategik va taktik DDD farqini biladi",
        "Subdomen turiga qarab sarmoyani taqsimlaydi"
      ],
      prerequisites: [
        "63.11"
      ]
    },
    {
      id: "63.18",
      title: "DDD in Laravel",
      description: [
        "Laravel'da DDD: pragmatik variant — Eloquent model'larni boy domen modeli sifatida (xatti-harakat metodlari, value object cast'lar, enum'lar, domen event'lar), modullar bo'yicha papkalar (`app/Domain/Billing`), Action'lar application servis sifatida. Qat'iy variant — framework'siz domen qatlami (toza PHP obyektlar), Eloquent faqat infratuzilmada (repository xaritalashi bilan) — ko'proq kod, lekin to'liq izolyatsiya.",
        "",
        "Muammolar: Eloquent'ning Active Record tabiati (saqlash va domen aralash), relation'lar orqali aggregate chegaralarini buzish, facade'lar domen ichida. Arch testlari bilan qoidalarni majburlash.",
        "",
        "```text",
        "app/Domain/Billing/",
        "  Models/Invoice.php            (Eloquent, boy model)",
        "  ValueObjects/Money.php",
        "  Events/InvoiceSettled.php",
        "  Actions/SettleInvoice.php     (application servis)",
        "  Policies/RefundPolicy.php",
        "app/Infrastructure/Payme/PaymeGateway.php",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Bitta modulni pragmatik DDD uslubida qayta tuzib, chegaralarni arch testlari bilan qotiring.",
      acceptanceCriteria: [
        "Laravel'da DDD'ning pragmatik va qat'iy variantlarini biladi",
        "Eloquent bilan bog'liq muammolarni boshqaradi"
      ],
      prerequisites: [
        "63.17"
      ]
    },
    {
      id: "63.19",
      title: "When DDD Is Worth the Complexity",
      description: [
        "DDD qimmat: ko'proq kod va abstraksiya, domen ekspertlari bilan doimiy ishlash, jamoaning tayyorgarligi. Arziydi: murakkab va o'zgaruvchan biznes qoidalari, core domen (raqobat ustunligi), uzoq yashaydigan tizim, ko'p jamoalar va kontekstlar. Arzimaydi: oddiy CRUD, ma'lumotni ko'rsatish va tahrirlash, qisqa muddatli loyihalar, prototiplar, generic subdomenlar.",
        "",
        "Qisman qo'llash ham to'g'ri: strategik qism (kontekstlar, til) deyarli har doim foydali; taktik naqshlar — faqat murakkab qismlarda. \"DDD lite\" (faqat taktik naqshlar, strategiyasiz) — ko'pincha foydasiz murakkablik.",
        "",
        "```text",
        "Savollar: Biznes qoidalari murakkabmi? Ular tez-tez o'zgaradimi?",
        "Domen ekspertlari mavjudmi? Tizim 3+ yil yashaydimi?",
        "Ko'pi \"ha\" → DDD; ko'pi \"yo'q\" → yaxshi tuzilgan Laravel MVC + Action'lar",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Loyihangizning har moduli uchun DDD kerak-kerakmasligini savollar asosida baholab, qaror yozing.",
      acceptanceCriteria: [
        "DDD'ning narxi va foydasini biladi",
        "DDD'ni tanlab, qisman qo'llaydi"
      ],
      prerequisites: [
        "5.20"
      ]
    }
  ]
});
