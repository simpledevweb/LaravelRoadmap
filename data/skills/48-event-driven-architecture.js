/* 48 · Event-Driven Architecture
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 48,
  slug: "event-driven-architecture",
  title: "Event-Driven Architecture",
  group: "async",
  description: "Event-Driven Architecture (EDA) — komponentlar bir-birini to'g'ridan-to'g'ri chaqirish o'rniga hodisalar (event) orqali muloqot qiladigan arxitektura. U bog'liqlikni kamaytiradi, masshtablashni va yangi funksiyalarni qo'shishni osonlashtiradi, lekin eventual consistency, tartib, dublikatlar va kuzatuvchanlik kabi murakkabliklar keltiradi. Senior dasturchi EDA'ni qachon va qanday qo'llashni biladi.",
  subskills: [
    {
      id: "48.1",
      title: "Events va Consumers",
      description: [
        "Event — tizimda sodir bo'lgan **fakt** (o'tgan zamonda nomlanadi: `OrderPlaced`, `PaymentCaptured`), o'zgarmas. Consumer (iste'molchi) — event'ga reaksiya qiladigan komponent: email yuborish, statistika, boshqa servisni yangilash. Ishlab chiqaruvchi iste'molchilarni bilmaydi.",
        "",
        "Command bilan farqi: command — \"buni qil\" (bitta qabul qiluvchi, rad etilishi mumkin), event — \"bu sodir bo'ldi\" (nol yoki ko'p iste'molchi). Laravel'da: event class'lar + listener'lar (ichki), message broker (servislararo).",
        "",
        "```php",
        "final class OrderPlaced",
        "{",
        "    use Dispatchable;",
        "    public function __construct(public readonly int $orderId, public readonly int $customerId, public readonly CarbonImmutable $occurredAt) {}",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Domeningizdagi 5 ta muhim biznes hodisasini aniqlab, event sifatida nomlang va ularning iste'molchilarini xaritalang.",
      acceptanceCriteria: [
        "Event va command farqini biladi",
        "Event'larni fakt sifatida nomlaydi"
      ],
      prerequisites: [
        "2.20"
      ]
    },
    {
      id: "48.2",
      title: "Producers va Subscribers",
      description: [
        "Producer (ishlab chiqaruvchi) — event'ni e'lon qiladi; subscriber — muayyan event turlariga obuna bo'ladi. Pub/sub modeli: bitta event — ko'p subscriber, har biri mustaqil. Laravel'da event subscriber class'lari bir nechta event'ni bitta class'da tinglaydi; servislararo — broker topic/exchange'lariga obuna.",
        "",
        "Ishlab chiqaruvchi mas'uliyati: event to'liq va barqaror sxemada, ishonchli yetkazilishi (outbox). Subscriber mas'uliyati: idempotent, mustaqil xatolar (bir subscriber xatosi boshqalarga ta'sir qilmasligi), o'z tezligida.",
        "",
        "```php",
        "final class OrderEventSubscriber",
        "{",
        "    public function subscribe(Dispatcher $events): array",
        "    {",
        "        return [",
        "            OrderPlaced::class    => 'onPlaced',",
        "            OrderCancelled::class => 'onCancelled',",
        "        ];",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Bir event'ga 3 ta mustaqil subscriber yozib, birining xatosi boshqalariga ta'sir qilmasligini ta'minlang.",
      acceptanceCriteria: [
        "Pub/sub modelini va mas'uliyatlarni biladi",
        "Subscriber'larni mustaqil qiladi"
      ],
      prerequisites: [
        "48.1"
      ]
    },
    {
      id: "48.3",
      title: "Event Payload Design",
      description: [
        "Payload dizayni: **thin event** (faqat ID — iste'molchi ma'lumotni o'zi so'raydi: bog'liqlik va qo'shimcha so'rov, lekin doim yangi ma'lumot) vs **fat event / event-carried state transfer** (kerakli ma'lumot event ichida: iste'molchi mustaqil, lekin katta payload va eskirgan ma'lumot xavfi). Har doim: event ID (`event_id` — dedup), turi, versiyasi, vaqti (`occurred_at`), manba, korrelyatsiya ID.",
        "",
        "Sezgir ma'lumotni minimal; payload — ommaviy shartnoma, ichki model emas (model o'zgarsa event o'zgarmasin).",
        "",
        "```json",
        "{",
        "  \"event_id\": \"01J2Z...\", \"type\": \"order.placed\", \"version\": 2,",
        "  \"occurred_at\": \"2025-06-01T09:30:00Z\", \"correlation_id\": \"c1f2...\",",
        "  \"data\": { \"order_id\": 42, \"customer_id\": 7, \"total\": { \"amount\": \"150000.00\", \"currency\": \"UZS\" } }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Servislararo event uchun envelope (metadata) va data sxemasini loyihalab, thin/fat tanlovini asoslang.",
      acceptanceCriteria: [
        "Thin va fat event murosasini biladi",
        "Event envelope'ga zarur metadata qo'shadi"
      ],
      prerequisites: [
        "48.1"
      ]
    },
    {
      id: "48.4",
      title: "Synchronous vs Asynchronous Events",
      description: [
        "Laravel'da event'lar default **sinxron**: listener'lar `event()` chaqiruvi ichida, bir xil so'rov va tranzaksiyada bajariladi (sekin listener — sekin so'rov, listener xatosi — so'rov xatosi). **Asinxron** — `ShouldQueue` listener'lar navbat orqali: so'rov tez, xatolar izolyatsiyalangan, retry; lekin natija keyinroq va tartib kafolatlanmaydi.",
        "",
        "Qoida: tranzaksiya yaxlitligi uchun zarur bo'lgan reaksiya — sinxron (ehtiyotkorlik bilan); yon ta'sirlar (email, statistika, integratsiya) — asinxron va commit'dan keyin.",
        "",
        "```php",
        "final class UpdateSalesStats implements ShouldQueue, ShouldHandleEventsAfterCommit",
        "{",
        "    public $queue = 'stats';",
        "    public function handle(OrderPlaced $event): void { /* ... */ }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Listener'larni sinxron va asinxronga ajrating, asinxronlarini commit'dan keyin ishlaydigan qiling.",
      acceptanceCriteria: [
        "Sinxron va asinxron event qayta ishlash farqini biladi",
        "Listener turini maqsadga qarab tanlaydi"
      ],
      prerequisites: [
        "48.1"
      ]
    },
    {
      id: "48.5",
      title: "Event Ordering",
      description: [
        "Asinxron tizimlarda tartib kafolatlanmaydi: parallel iste'molchilar, retry'lar, turli partitsiyalar — `OrderShipped` `OrderPaid` dan oldin kelishi mumkin. Tartib kerak bo'lsa: bir agregat (masalan, buyurtma) event'larini bitta partitsiya/navbatga (kalit bo'yicha — Kafka partition key, RabbitMQ consistent hash, SQS FIFO `MessageGroupId`) va bitta iste'molchiga; yoki iste'molchi tartibsizlikka chidamli (versiya/sequence raqami, eski event'ni e'tiborsiz qoldirish, holat mashinasi).",
        "",
        "Global tartib kamdan-kam kerak va qimmat — odatda faqat bir obyekt doirasidagi tartib muhim.",
        "",
        "```php",
        "if ($event->sequence <= $order->last_event_sequence) {",
        "    return; // eskirgan yoki dublikat",
        "}",
        "$order->apply($event)->forceFill(['last_event_sequence' => $event->sequence])->save();",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Buyurtma event'lariga sequence raqami qo'shib, iste'molchini tartibsiz kelishga chidamli qiling.",
      acceptanceCriteria: [
        "Tartib kafolati yo'qligi sabablarini biladi",
        "Obyekt darajasidagi tartibni ta'minlash usullarini qo'llaydi"
      ],
      prerequisites: [
        "24.11"
      ]
    },
    {
      id: "48.6",
      title: "Duplicate Event Handling",
      description: [
        "At-least-once yetkazish → dublikatlar muqarrar (broker retry, producer qayta yuborishi, iste'molchi ACK'dan oldin crash). Iste'molchi har event'ni `event_id` bo'yicha deduplikatsiya qiladi: \"processed events\" jadvali (unique constraint) yoki Redis set (TTL bilan), biznes o'zgarishi bilan bir tranzaksiyada.",
        "",
        "Deduplikatsiya oynasi — broker retry muddatidan uzun. Producer tomonida ham idempotentlik (outbox bitta xabarni ikki marta yubormasligi uchun relay holati).",
        "",
        "```php",
        "DB::transaction(function () use ($event) {",
        "    if (! ProcessedEvent::insertOrIgnore(['event_id' => $event->id, 'consumer' => 'billing'])) {",
        "        return; // allaqachon qayta ishlangan",
        "    }",
        "    $this->handleBusinessLogic($event);",
        "});",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Iste'molchiga event_id asosidagi deduplikatsiyani qo'shib, bir event'ni 3 marta yuborib natijani tekshiring.",
      acceptanceCriteria: [
        "Dublikat manbalarini biladi",
        "Deduplikatsiyani biznes o'zgarishi bilan atomik qiladi"
      ],
      prerequisites: [
        "46.22"
      ]
    },
    {
      id: "48.7",
      title: "Idempotent Consumers",
      description: [
        "Idempotent iste'molchi — bir event'ni necha marta qayta ishlasa ham natija bir xil. Usullar: deduplikatsiya (48.6), tabiiy idempotent amallar (`SET status = paid` — `increment` emas), upsert, holat tekshiruvi, versiya tekshiruvi. Tashqi yon ta'sirlar (email, to'lov) — idempotency key bilan yoki \"yuborildi\" belgisi bilan.",
        "",
        "EDA'da idempotentlik — ixtiyoriy emas, balki asosiy talab; uni test bilan (bir event'ni ikki marta yuborish) majburiy qiling.",
        "",
        "```php",
        "it('applies payment only once', function () {",
        "    $event = new PaymentCaptured(eventId: 'evt_1', orderId: $order->id, amount: 150_000);",
        "    app(ApplyPayment::class)->handle($event);",
        "    app(ApplyPayment::class)->handle($event);",
        "    expect($order->fresh()->paid_amount)->toBe(150_000);",
        "});",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Barcha muhim iste'molchilar uchun \"ikki marta yuborish\" testini yozing va idempotent bo'lmaganlarini tuzating.",
      acceptanceCriteria: [
        "Idempotentlikni ta'minlash usullarini biladi",
        "Idempotentlikni test bilan majburiy qiladi"
      ],
      prerequisites: [
        "48.6"
      ]
    },
    {
      id: "48.8",
      title: "Event Versioning",
      description: [
        "Event sxemasi vaqt o'tib o'zgaradi, lekin eski event'lar navbatda, log'da yoki event store'da qoladi va eski iste'molchilar hali ishlayotgan bo'ladi. Qoidalar: faqat qo'shimcha (additive) o'zgarishlar — yangi ixtiyoriy maydon; buzuvchi o'zgarish — yangi versiya (`order.placed.v2` yoki `version: 2` maydoni); iste'molchilar noma'lum maydonlarni e'tiborsiz qoldiradi (tolerant reader); upcasting — eski versiyani yangi formatga o'girish.",
        "",
        "Bir muddat ikkala versiyani parallel e'lon qilish, keyin eskisini to'xtatish. Sxema registry (JSON Schema, Avro) katta tizimlarda.",
        "",
        "```php",
        "final class OrderPlacedUpcaster",
        "{",
        "    public function upcast(array $payload): array",
        "    {",
        "        if (($payload['version'] ?? 1) === 1) {",
        "            $payload['data']['total'] = ['amount' => $payload['data']['total'], 'currency' => 'UZS'];",
        "            $payload['version'] = 2;",
        "        }",
        "        return $payload;",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Event'ga buzuvchi o'zgarish kiritishni versiyalash va upcaster bilan, eski iste'molchilarni sindirmasdan amalga oshiring.",
      acceptanceCriteria: [
        "Additive va buzuvchi o'zgarishlarni farqlaydi",
        "Versiyalash va upcasting'ni qo'llaydi"
      ],
      prerequisites: [
        "48.3"
      ]
    },
    {
      id: "48.9",
      title: "Retry va Backoff",
      description: [
        "Iste'molchi xatolari: vaqtinchalik (DB band, tashqi API 503) — backoff bilan qayta urinish; doimiy (noto'g'ri ma'lumot, kod xatosi) — qayta urinish foydasiz, dead letter'ga. Eksponensial backoff + jitter, maksimal urinishlar, retry navbatlari (RabbitMQ'da TTL'li kechikish navbatlari).",
        "",
        "\"Zaharli xabar\" (poison message) — har safar iste'molchini yiqitadigan event; cheksiz retry butun navbatni bloklaydi (ayniqsa tartibli navbatlarda). Uni aniqlab DLQ'ga chiqarish kerak.",
        "",
        "```php",
        "final class SyncToCrm implements ShouldQueue",
        "{",
        "    public $tries = 6;",
        "    public function backoff(): array { return [5, 30, 120, 600, 1800]; }",
        "    public function handle(CustomerUpdated $event, CrmClient $crm): void",
        "    {",
        "        try { $crm->upsert($event->customerId); }",
        "        catch (InvalidPayload $e) { $this->fail($e); }   // doimiy — DLQ",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Iste'molchida vaqtinchalik va doimiy xatolarni ajratib, zaharli xabarni DLQ'ga chiqaruvchi mantiqni yozing.",
      acceptanceCriteria: [
        "Vaqtinchalik va doimiy xatolarni farqlaydi",
        "Zaharli xabar muammosini biladi"
      ],
      prerequisites: [
        "46.6"
      ]
    },
    {
      id: "48.10",
      title: "Eventual Consistency",
      description: [
        "EDA'da ma'lumot turli komponentlarda darhol emas, **vaqt o'tib** izchil bo'ladi: buyurtma yaratildi, lekin hisobot servisida bir necha soniyadan keyin ko'rinadi. Bu tarmoqli tizimlarning tabiiy holati (CAP), xato emas — lekin biznes va UX bilan kelishilishi kerak.",
        "",
        "Boshqarish: foydalanuvchiga oraliq holatni ko'rsatish (\"to'lov tekshirilmoqda\"), o'z yozganini darhol ko'rish (read-your-writes — natijani lokal qaytarish), moslashtirish (reconciliation) job'lari nomuvofiqliklarni topish uchun, kechikish metrikasi (event yaratilgan va qayta ishlangan vaqt farqi).",
        "",
        "```text",
        "T0  Order servisi: order #42 = placed      ✅",
        "T0  Foydalanuvchiga: \"Buyurtma qabul qilindi, tasdiqlanmoqda\"",
        "T+2s Inventory: zaxira band qilindi → OrderConfirmed",
        "T+3s UI: \"Tasdiqlandi\"",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Eventual consistency bilan bog'liq UX holatlarini aniqlab, oraliq holatlar va moslashtirish job'ini qo'shing.",
      acceptanceCriteria: [
        "Eventual consistency'ning tabiatini tushuntira oladi",
        "Uni UX va reconciliation bilan boshqaradi"
      ],
      prerequisites: [
        "17.19"
      ]
    },
    {
      id: "48.11",
      title: "Message Delivery Guarantees",
      description: [
        "Yetkazish kafolatlari: **at-most-once** (ACK olishdan oldin — yo'qolishi mumkin; metrikalar uchun maqbul), **at-least-once** (qayta ishlagandan keyin ACK — dublikatlar; eng keng tarqalgan), **exactly-once** (amalda: at-least-once + idempotent iste'molchi; ba'zi broker'larda tranzaksiyaviy rejimlar cheklangan doirada).",
        "",
        "Kafolat zanjiri: producer → broker (publisher confirms, persistent xabarlar, replikatsiya) → consumer (manual ACK, idempotentlik). Eng zaif bo'g'in umumiy kafolatni belgilaydi; DB yozuvi va xabar yuborish o'rtasidagi bo'shliq — outbox bilan yopiladi.",
        "",
        "```text",
        "Producer ──(outbox + confirms)──▶ Broker ──(durable, replicated)──▶ Consumer ──(ack after commit, idempotent)",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Tizimingizdagi xabar yo'lining har bo'g'ini uchun kafolatni tahlil qilib, eng zaif joyni kuchaytiring.",
      acceptanceCriteria: [
        "Uch kafolat darajasini biladi",
        "Kafolatni butun zanjir bo'ylab baholaydi"
      ],
      prerequisites: [
        "24.11"
      ]
    },
    {
      id: "48.12",
      title: "Transactional Outbox Pattern",
      description: [
        "EDA'da outbox — DB o'zgarishi va event e'lon qilishni atomik qilishning standart yo'li: event `outbox` jadvaliga biznes ma'lumot bilan bir tranzaksiyada yoziladi; relay (polling job yoki CDC — Debezium) uni broker'ga yuboradi va belgilaydi. Kafolat — at-least-once (relay crash'da qayta yuborishi mumkin) → iste'molchilar idempotent.",
        "",
        "Laravel'da sodda variant: `outbox` model, scheduler'da har soniya yoki doimiy worker relay'i `lockForUpdate()->skipLocked()` bilan, tartib uchun `id` bo'yicha, yuborilganlarni tozalash.",
        "",
        "```php",
        "Outbox::query()->whereNull('published_at')->orderBy('id')->limit(100)",
        "    ->lockForUpdate()->skipLocked()->get()",
        "    ->each(function (Outbox $m) use ($broker) {",
        "        $broker->publish($m->topic, $m->payload, headers: ['event_id' => $m->event_id]);",
        "        $m->update(['published_at' => now()]);",
        "    });",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Outbox relay'ini `skipLocked` bilan ikki parallel nusxada ishlaydigan qilib yozing va dublikat yuborilmasligini tekshiring.",
      acceptanceCriteria: [
        "Outbox'ning EDA'dagi rolini biladi",
        "Relay'ni parallel va ishonchli quradi"
      ],
      prerequisites: [
        "17.18"
      ]
    },
    {
      id: "48.13",
      title: "Dead Letter Queues",
      description: [
        "DLQ — qayta ishlab bo'lmagan xabarlar uchun alohida navbat: maksimal urinishlardan keyin yoki zaharli xabar aniqlanganda. Asosiy navbatni bloklanishdan saqlaydi va xabarlarni yo'qotmaydi.",
        "",
        "Jarayon: DLQ uzunligi monitoringi va alert, xabar + xato sababi + urinishlar soni saqlanadi, tahlil va tuzatishdan keyin \"redrive\" (asosiy navbatga qaytarish), tuzatib bo'lmaydiganlarni hujjatlab o'chirish. RabbitMQ — dead-letter exchange, SQS — redrive policy, Laravel — `failed_jobs`.",
        "",
        "```text",
        "main queue ──(N marta xato)──▶ DLQ ──▶ alert → tahlil → tuzatish → redrive",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Broker yoki Laravel failed_jobs uchun DLQ monitoringi va redrive jarayonini sozlang.",
      acceptanceCriteria: [
        "DLQ maqsadi va jarayonini biladi",
        "Redrive'ni tahlildan keyin bajaradi"
      ],
      prerequisites: [
        "46.19"
      ]
    },
    {
      id: "48.14",
      title: "Event Monitoring",
      description: [
        "EDA kuzatuvchanligi qiyin — oqim ko'p komponent bo'ylab tarqalgan. Kerakli narsalar: correlation ID (bitta biznes oqimining barcha event va log'larini bog'lash), har event'da `event_id`, `causation_id` (qaysi event bu event'ni keltirib chiqardi), distributed tracing (OpenTelemetry — producer va consumer span'lari), metrikalar (e'lon qilingan/qayta ishlangan/muvaffaqiyatsiz event'lar, iste'molchi kechikishi — consumer lag, DLQ hajmi).",
        "",
        "Event katalogi — qaysi event'lar bor, kim e'lon qiladi, kim iste'mol qiladi (AsyncAPI hujjati).",
        "",
        "```php",
        "Log::withContext(['correlation_id' => $event->correlationId, 'event_id' => $event->id]);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Event'larga correlation va causation ID qo'shib, bitta buyurtma oqimini log'larda boshdan oxirigacha kuzating.",
      acceptanceCriteria: [
        "Correlation va causation ID'larning rolini biladi",
        "EDA uchun asosiy metrikalarni kuzatadi"
      ],
      prerequisites: [
        "58.4"
      ]
    },
    {
      id: "48.15",
      title: "Failure Recovery",
      description: [
        "EDA'da tiklanish stsenariylari: iste'molchi uzoq vaqt ishlamadi (backlog — qayta ishga tushganda yetib olish, masshtablash), noto'g'ri kod bilan event'lar qayta ishlangan (tuzatib, event'larni qayta ijro etish — replay, idempotentlik shart), broker ma'lumot yo'qotdi (outbox'dan qayta yuborish), nomuvofiq holat (reconciliation job — manba haqiqat bilan solishtirish).",
        "",
        "Event log (Kafka, event store) replay imkonini beradi; oddiy navbatlarda (RabbitMQ, Redis) qayta ishlangan xabarlar o'chadi — shuning uchun outbox jadvali yoki arxiv replay manbai bo'lishi mumkin.",
        "",
        "```bash",
        "php artisan events:replay --consumer=stats --from=\"2025-06-01 00:00\" --type=order.placed",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Iste'molchi xatosidan keyin event'larni outbox arxividan qayta ijro etuvchi buyruq yozing.",
      acceptanceCriteria: [
        "Tiklanish stsenariylarini biladi",
        "Replay va reconciliation'ni rejalashtiradi"
      ],
      prerequisites: [
        "48.7",
        "48.12"
      ]
    },
    {
      id: "48.16",
      title: "Event-Driven Design Trade-offs",
      description: [
        "EDA afzalliklari: bog'liqlik kamayadi, yangi iste'molchi qo'shish oson (Open/Closed), masshtablash va yuklamani tekislash, chidamlilik (bir servis ishlamasa boshqalari davom etadi), audit va tarix. Kamchiliklari: oqimni kuzatish va debug qiyin (\"kim nimani chaqirdi?\"), eventual consistency, dublikat va tartib muammolari, infratuzilma (broker, monitoring), sxema evolyutsiyasi, test qilish murakkabligi.",
        "",
        "Qachon kerak emas: oddiy CRUD, kichik monolit, darhol izchillik kerak bo'lgan oqimlar. Ko'pincha monolit ichidagi Laravel event'lari + navbat yetarli; broker va servislararo EDA — haqiqiy ehtiyoj paydo bo'lganda.",
        "",
        "```text",
        "Kerak:     ko'p mustaqil iste'molchi, integratsiyalar, yuklama portlashlari, servislar mustaqilligi",
        "Kerak emas: oddiy CRUD, kichik jamoa, kuchli izchillik talabi",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Loyihadagi bitta oqim uchun to'g'ridan-to'g'ri chaqiruv va EDA variantlarini solishtirib, ADR yozing.",
      acceptanceCriteria: [
        "EDA afzallik va kamchiliklarini biladi",
        "EDA'ni ehtiyojga qarab tanlaydi"
      ],
      prerequisites: [
        "61.17"
      ]
    },
    {
      id: "48.17",
      title: "Apache Kafka va Event Streaming",
      description: [
        "**RabbitMQ vs Apache Kafka**: RabbitMQ — an'anaviy xabarlar brokiri (xabar o'qib bo'lingach navbatdan o'chiriladi). Apache Kafka esa **taqsimlangan, o'chmaydigan hodisalar jurnali (Distributed Commit Log)** hisoblanadi. Unda hodisalar kunlab yoki oylab saqlanadi va millionlab request/sec oqimini ko'tara oladi.",
        "",
        "**Kafka Arxitekturasi**:",
        "- **Topic va Partitions**: Har bir Topic bir nechta Partition'ga bo'linadi. Bitta Partition ichida xabarlarning qat'iy tartibi kafolatlanadi (Partition Key orqali ma'lum bir `user_id` doim bitta partition'ga tushadi).",
        "- **Consumer Groups & Offset**: Har bir iste'molchi guruh o'zining `offset` (o'qilgan joyi) ko'rsatkichini saqlaydi. Bu yangi servis qo'shilganda butun tarixiy hodisalarni noldan qayta o'qish (Event Replay) imkonini beradi.",
        "- **Masshtablanish**: Partition'lar turli serverlarga taqsimlanadi, har bir consumer o'z partition'ini parallel o'qiydi.",
        "",
        "**Laravel bilan integratsiya (`mateusjunges/laravel-kafka`)**:",
        "",
        "```php",
        "use Junges\\Kafka\\Facades\\Kafka;",
        "",
        "// Producer: Event yuborish",
        "Kafka::publishOn('orders-events')",
        "    ->withHeaders(['source' => 'web-checkout'])",
        "    ->withKey($order->user_id) // partition key",
        "    ->withBodyKey('order_id', $order->id)",
        "    ->send();",
        "",
        "// Consumer: Fonda oqimni tinglash",
        "$consumer = Kafka::createConsumer(['orders-events'])",
        "    ->withConsumerGroupId('analytics-service')",
        "    ->withHandler(function ($message) {",
        "        // analitika qayta ishlanadi",
        "    })->build();",
        "$consumer->consume();",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Laravel ilovasida Kafka Producer yozing; xabarlarni user_id bo'yicha partition'larga to'g'ri taqsimlang va alohida consumer orqali oqimni tinglang.",
      acceptanceCriteria: [
        "RabbitMQ (Queue) va Kafka (Log-based streaming) arxitekturasining tub farqini tushuntira oladi",
        "Topic, Partition, Offset va Consumer Group tushunchalarini biladi",
        "Event Replay imkoniyatining biznesdagi qiymatini tushunadi"
      ],
      prerequisites: [
        "48.1",
        "49.1"
      ]
    }
  ]
});
