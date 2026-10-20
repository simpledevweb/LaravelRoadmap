/* 49 · RabbitMQ
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 49,
  slug: "rabbitmq",
  title: "RabbitMQ",
  group: "async",
  description: "RabbitMQ — AMQP protokoliga asoslangan, moslashuvchan marshrutlash imkoniyatlariga ega message broker. U servislararo asinxron muloqot, ishlarni taqsimlash va event'larni tarqatish uchun ishlatiladi. Senior dasturchi exchange va binding'lar orqali marshrutlashni loyihalaydi, ishonchli yetkazishni (ACK, confirms, durable) ta'minlaydi va Laravel bilan integratsiya qiladi.",
  subskills: [
    {
      id: "49.1",
      title: "Exchanges",
      description: [
        "RabbitMQ'da producer xabarni to'g'ridan-to'g'ri navbatga emas, **exchange**'ga yuboradi; exchange esa qoidalar (binding) bo'yicha uni bir yoki bir nechta navbatga yo'naltiradi. Bu producer'ni iste'molchilar tuzilmasidan ajratadi.",
        "",
        "Exchange xususiyatlari: tur (direct, topic, fanout, headers), durable (restart'dan keyin saqlanadi), auto-delete, `alternate-exchange` (hech qaysi navbatga mos kelmagan xabarlar uchun — yo'qolmasligi uchun). Default exchange (`\"\"`) — routing key = navbat nomi.",
        "",
        "```php",
        "$channel->exchange_declare('orders', 'topic', passive: false, durable: true, auto_delete: false);",
        "$channel->basic_publish(new AMQPMessage($json, ['delivery_mode' => 2]), 'orders', 'order.placed');",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "`orders` topic exchange'ini e'lon qilib, unga xabar yuboring va management UI'da marshrutni kuzating.",
      acceptanceCriteria: [
        "Exchange'ning producer va navbat o'rtasidagi rolini biladi",
        "Exchange xususiyatlarini sozlaydi"
      ],
      prerequisites: [
        "48.2"
      ]
    },
    {
      id: "49.2",
      title: "Queues",
      description: [
        "Navbat — xabarlar saqlanadigan va iste'molchilar o'qiydigan bufer (FIFO). Xususiyatlar: durable, exclusive, auto-delete, argumentlar: `x-message-ttl`, `x-max-length` (+ `x-overflow`), `x-dead-letter-exchange`, `x-queue-type: quorum` (replikatsiyalangan, tavsiya etiladi — klassik mirrored o'rniga), lazy rejim.",
        "",
        "Bir navbatga bir nechta iste'molchi — xabarlar ular o'rtasida taqsimlanadi (competing consumers — ish taqsimlash). Har iste'molchi turiga alohida navbat (pub/sub — har biri o'z nusxasini oladi).",
        "",
        "```php",
        "$channel->queue_declare('billing.order-events', durable: true, arguments: new AMQPTable([",
        "    'x-queue-type' => 'quorum',",
        "    'x-dead-letter-exchange' => 'dlx',",
        "]));",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Quorum navbat yarating, DLX argumenti bilan; ikkita iste'molchi bilan xabarlar taqsimlanishini kuzating.",
      acceptanceCriteria: [
        "Navbat xususiyatlari va argumentlarini biladi",
        "Competing consumers va pub/sub farqini tushunadi"
      ],
      prerequisites: [
        "49.1"
      ]
    },
    {
      id: "49.3",
      title: "Bindings",
      description: [
        "Binding — exchange va navbat (yoki exchange va exchange) o'rtasidagi qoida: \"shu routing key/pattern'li xabarlarni shu navbatga\". Bitta navbat bir nechta binding'ga ega bo'lishi mumkin; bitta xabar bir nechta navbatga ketishi mumkin.",
        "",
        "Binding'lar marshrutlash topologiyasini belgilaydi — uni kod (yoki definitions JSON / IaC) bilan versiyalang, qo'lda UI'da yaratmang. Iste'molchi o'z navbati va binding'larini e'lon qiladi (idempotent `declare`).",
        "",
        "```php",
        "$channel->queue_bind('billing.order-events', 'orders', 'order.placed');",
        "$channel->queue_bind('billing.order-events', 'orders', 'order.cancelled');",
        "$channel->queue_bind('analytics.all-orders', 'orders', 'order.#');",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Billing va analytics iste'molchilari uchun turli binding'lar bilan topologiyani kodda e'lon qiling.",
      acceptanceCriteria: [
        "Binding mexanizmini biladi",
        "Topologiyani kod bilan versiyalaydi"
      ],
      prerequisites: [
        "49.2"
      ]
    },
    {
      id: "49.4",
      title: "Routing Keys",
      description: [
        "Routing key — xabar bilan yuboriladigan string, exchange uni binding key bilan solishtiradi. Topic exchange'da nuqtali ierarxiya: `order.placed`, `order.payment.failed`; pattern'lar: `*` — bitta so'z, `#` — nol yoki ko'p so'z (`order.#`, `*.failed`).",
        "",
        "Nomlash konvensiyasi muhim (`<domen>.<obyekt>.<hodisa>`, kichik harf) — yangi iste'molchilar wildcard bilan kerakli event'larga oson obuna bo'lishi uchun. Routing key'ga ID kabi yuqori kardinallikdagi qiymatlarni qo'ymang.",
        "",
        "```text",
        "order.placed           → billing (order.placed), analytics (order.#)",
        "order.payment.failed   → notifications (*.payment.failed), analytics (order.#)",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Domeningiz event'lari uchun routing key konvensiyasini loyihalab, wildcard binding'lar bilan sinang.",
      acceptanceCriteria: [
        "`*` va `#` pattern'larini biladi",
        "Routing key konvensiyasini loyihalaydi"
      ],
      prerequisites: [
        "49.3"
      ]
    },
    {
      id: "49.5",
      title: "Direct, Topic, Fanout va Headers Exchanges",
      description: [
        "- **Direct** — routing key binding key bilan aniq teng bo'lsa (vazifalar turini yo'naltirish: `pdf`, `email`).",
        "- **Topic** — pattern bo'yicha (`order.*`) — event'lar uchun eng moslashuvchan.",
        "- **Fanout** — routing key'ni e'tiborsiz qoldirib, barcha bog'langan navbatlarga (broadcast — kesh invalidatsiyasi, bildirishnomalar).",
        "- **Headers** — routing key o'rniga xabar header'lari bo'yicha (`x-match: all/any`) — kam ishlatiladi.",
        "",
        "Tanlov: buyruqlar/vazifalar — direct; domen event'lari — topic; hammaga xabar — fanout.",
        "",
        "```php",
        "$channel->exchange_declare('tasks', 'direct', durable: true);",
        "$channel->exchange_declare('cache-invalidation', 'fanout', durable: true);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Uch xil exchange turi bilan uch stsenariyni (vazifalar, event'lar, broadcast) amalga oshiring.",
      acceptanceCriteria: [
        "To'rt exchange turini va qo'llanishini biladi",
        "Stsenariyga mos turni tanlaydi"
      ],
      prerequisites: [
        "49.4"
      ]
    },
    {
      id: "49.6",
      title: "Producers va Consumers",
      description: [
        "Producer: ulanish va kanal (ulanish qimmat — qayta ishlating; kanal — yengil, thread-safe emas), exchange'ga persistent xabar, publisher confirms. Consumer: `basic_consume` (push — tavsiya etiladi) yoki `basic_get` (pull — samarasiz), prefetch, manual ACK, xatoda NACK/reject, graceful to'xtatish.",
        "",
        "PHP'da long-running consumer jarayoni (Supervisor ostida) yoki Laravel queue worker (driver orqali). Ulanish uzilishiga chidamlilik — qayta ulanish mantiqi, heartbeat.",
        "",
        "```php",
        "$channel->basic_qos(prefetch_size: 0, prefetch_count: 10, a_global: false);",
        "$channel->basic_consume('billing.order-events', '', no_ack: false, callback: function (AMQPMessage $msg) {",
        "    try {",
        "        app(OrderEventHandler::class)->handle(json_decode($msg->getBody(), true, flags: JSON_THROW_ON_ERROR));",
        "        $msg->ack();",
        "    } catch (Throwable $e) {",
        "        $msg->nack(requeue: false);   // DLX'ga",
        "    }",
        "});",
        "while ($channel->is_consuming()) { $channel->wait(); }",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Manual ACK va prefetch bilan ishlaydigan consumer yozib, Supervisor ostida ishga tushiring.",
      acceptanceCriteria: [
        "Producer va consumer mas'uliyatlarini biladi",
        "Ulanish va kanal boshqaruvini tushunadi"
      ],
      prerequisites: [
        "49.2"
      ]
    },
    {
      id: "49.7",
      title: "Acknowledgements",
      description: [
        "Consumer ACK — \"xabar muvaffaqiyatli qayta ishlandi, o'chirish mumkin\". **Manual ACK** (`no_ack: false`) — qayta ishlagandan **keyin** ACK: crash'da xabar boshqa iste'molchiga qayta beriladi (at-least-once). **Auto ACK** — yetkazilishi bilan o'chiriladi (tez, lekin crash'da yo'qoladi — at-most-once).",
        "",
        "`nack`/`reject`: `requeue: true` (navbatga qaytarish — zaharli xabar cheksiz siklga tushishi mumkin!), `requeue: false` (DLX'ga yoki o'chirish). ACK unutilsa — xabarlar \"unacked\" holatda qoladi va prefetch to'lib, consumer to'xtaydi.",
        "",
        "```php",
        "try {",
        "    $this->process($msg);",
        "    $msg->ack();",
        "} catch (TransientError $e) {",
        "    $msg->nack(requeue: true);    // ehtiyotkorlik: retry hisoblagichi kerak",
        "} catch (Throwable $e) {",
        "    $msg->reject(requeue: false); // DLX",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Manual va auto ACK bilan consumer'ni ishlash paytida o'ldirib, xabar yo'qolishi farqini ko'rsating.",
      acceptanceCriteria: [
        "Manual va auto ACK farqini biladi",
        "Requeue siklining xavfini tushunadi"
      ],
      prerequisites: [
        "49.6"
      ]
    },
    {
      id: "49.8",
      title: "Publisher Confirms",
      description: [
        "Publisher confirms — broker producer'ga xabar qabul qilinganini (va durable navbatlar uchun diskka yozilganini/replikatsiyalanganini) tasdiqlaydi. Usiz producer xabar yetib bordimi-yo'qmi bilmaydi (tarmoq uzilishi, broker restart). `mandatory` flag — hech qaysi navbatga yo'nalmagan xabar producer'ga qaytariladi (`basic.return`).",
        "",
        "Har xabar uchun sinxron kutish sekin — batch confirms yoki asinxron callback'lar. Tasdiqlanmagan xabarlar outbox'da qoladi va qayta yuboriladi.",
        "",
        "```php",
        "$channel->confirm_select();",
        "$channel->set_ack_handler(fn (AMQPMessage $m) => Outbox::markPublished($m->get('message_id')));",
        "$channel->set_nack_handler(fn (AMQPMessage $m) => Log::warning('Broker rad etdi', ['id' => $m->get('message_id')]));",
        "$channel->basic_publish($msg, 'orders', 'order.placed', mandatory: true);",
        "$channel->wait_for_pending_acks(5.0);",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Outbox relay'iga publisher confirms qo'shib, broker restart paytida xabar yo'qolmasligini isbotlang.",
      acceptanceCriteria: [
        "Publisher confirms va `mandatory` vazifasini biladi",
        "Confirms'ni outbox bilan bog'laydi"
      ],
      prerequisites: [
        "48.12"
      ]
    },
    {
      id: "49.9",
      title: "Durable Queues",
      description: [
        "Durable navbat va exchange — broker restart'dan keyin saqlanadi (metadata). Lekin xabarlarning o'zi saqlanishi uchun ular ham **persistent** bo'lishi kerak (49.10). Non-durable navbatlar — vaqtinchalik, masalan RPC javoblari yoki exclusive iste'molchi navbatlari.",
        "",
        "Yuqori mavjudlik uchun **quorum queues** (Raft asosida, bir nechta tugunda replikatsiya) — klassik mirrored queues eskirgan. Quorum navbatlarda `x-delivery-limit` (zaharli xabarlarni avtomatik DLX'ga) mavjud.",
        "",
        "```php",
        "$channel->queue_declare('payments', durable: true, arguments: new AMQPTable([",
        "    'x-queue-type' => 'quorum',",
        "    'x-delivery-limit' => 5,",
        "]));",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Durable va non-durable navbatlarga xabar yuborib, broker restart'dan keyingi holatni solishtiring.",
      acceptanceCriteria: [
        "Durable navbat va persistent xabar farqini biladi",
        "Quorum navbatlarning afzalligini tushunadi"
      ],
      prerequisites: [
        "49.2"
      ]
    },
    {
      id: "49.10",
      title: "Persistent Messages",
      description: [
        "Persistent xabar (`delivery_mode = 2`) — broker uni diskka yozadi; durable navbatda bo'lsa restart'dan keyin saqlanadi. Ikkalasi ham kerak: durable navbat + persistent xabar. Disk yozuvi throughput'ni pasaytiradi — muhim bo'lmagan xabarlar (metrikalar) uchun transient bo'lishi mumkin.",
        "",
        "To'liq kafolat zanjiri: persistent xabar + durable/quorum navbat + publisher confirms + manual consumer ACK. Bittasi yo'q bo'lsa — xabar yo'qolish ehtimoli.",
        "",
        "```php",
        "$msg = new AMQPMessage(json_encode($payload), [",
        "    'delivery_mode' => AMQPMessage::DELIVERY_MODE_PERSISTENT,",
        "    'content_type'  => 'application/json',",
        "    'message_id'    => $eventId,",
        "    'timestamp'     => time(),",
        "]);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "To'liq ishonchli yetkazish zanjirini (persistent + quorum + confirms + manual ACK) sozlab, broker restart bilan sinang.",
      acceptanceCriteria: [
        "Persistent xabar va durable navbat bog'liqligini biladi",
        "Ishonchlilik zanjirini to'liq quradi"
      ],
      prerequisites: [
        "49.9"
      ]
    },
    {
      id: "49.11",
      title: "Prefetch",
      description: [
        "Prefetch (`basic_qos prefetch_count`) — bir iste'molchiga ACK'siz bir vaqtda beriladigan maksimal xabarlar soni. Kichik (1) — adolatli taqsimlash (sekin iste'molchi ko'p xabar to'plab olmaydi), lekin throughput past (har xabar uchun tarmoq aylanishi). Katta — yuqori throughput, lekin notekis taqsimot va crash'da ko'p xabar qayta yetkaziladi.",
        "",
        "Odatiy qiymat: tez, bir xil xabarlar uchun 10–100; og'ir, uzoq vazifalar uchun 1–5. Prefetch yo'q (0 — cheksiz) — iste'molchi xotirasini to'ldirishi mumkin.",
        "",
        "```php",
        "$channel->basic_qos(prefetch_size: 0, prefetch_count: 20, a_global: false);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Turli prefetch qiymatlarida throughput va iste'molchilar o'rtasidagi taqsimotni o'lchab, optimal qiymatni tanlang.",
      acceptanceCriteria: [
        "Prefetch'ning throughput va adolatga ta'sirini biladi",
        "Vazifa turiga mos prefetch tanlaydi"
      ],
      prerequisites: [
        "49.6"
      ]
    },
    {
      id: "49.12",
      title: "Consumer Concurrency",
      description: [
        "Parallellik: bir navbatga bir nechta iste'molchi jarayoni (competing consumers) — Supervisor `numprocs` yoki konteyner replikalari; har biri o'z kanali va prefetch'i bilan. PHP'da bitta jarayon bir vaqtda bitta xabarni qayta ishlaydi — parallellik jarayonlar soni bilan.",
        "",
        "Cheklovlar: parallel iste'molchilar tartibni buzadi (tartib kerak bo'lsa — single active consumer `x-single-active-consumer` yoki kalit bo'yicha partitsiyalash — consistent hash exchange); DB ulanishlari va tashqi API limitlari; iste'molchilar sonini backlog'ga qarab avtomatik masshtablash (KEDA).",
        "",
        "```ini",
        "[program:billing-consumer]",
        "command=php /var/www/current/artisan rabbitmq:consume billing.order-events",
        "numprocs=4",
        "autorestart=true",
        "stopwaitsecs=60",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Iste'molchilar sonini 1 dan 8 gacha oshirib throughput'ni o'lchang va tartib talabi bo'lgan navbat uchun single active consumer'ni sozlang.",
      acceptanceCriteria: [
        "Competing consumers va tartib murosasini biladi",
        "Parallellikni resurs cheklovlariga moslaydi"
      ],
      prerequisites: [
        "49.11"
      ]
    },
    {
      id: "49.13",
      title: "Dead Letter Exchanges",
      description: [
        "DLX — navbat argumenti (`x-dead-letter-exchange`, ixtiyoriy `x-dead-letter-routing-key`): xabar `reject/nack(requeue=false)`, TTL tugashi, navbat uzunligi limiti yoki quorum `delivery-limit` oshishi sababli \"o'lganda\" shu exchange'ga yuboriladi. `x-death` header'i — sabab, navbat va son.",
        "",
        "DLX'ga bog'langan DLQ — monitoring, tahlil va redrive (shovel yoki skript bilan asosiy exchange'ga qaytarish) uchun. Har asosiy navbat uchun DLQ — standart amaliyot.",
        "",
        "```php",
        "$channel->exchange_declare('dlx', 'topic', durable: true);",
        "$channel->queue_declare('billing.order-events.dlq', durable: true);",
        "$channel->queue_bind('billing.order-events.dlq', 'dlx', '#');",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Asosiy navbat uchun DLX va DLQ sozlab, rad etilgan xabarning `x-death` header'ini tahlil qiling.",
      acceptanceCriteria: [
        "DLX'ga tushish sabablarini biladi",
        "DLQ va redrive jarayonini sozlaydi"
      ],
      prerequisites: [
        "48.13"
      ]
    },
    {
      id: "49.14",
      title: "Retry Queues",
      description: [
        "RabbitMQ'da kechiktirilgan qayta urinish naqshi: xato bo'lgan xabar TTL'li \"retry\" navbatiga yuboriladi (iste'molchisiz), TTL tugagach DLX orqali asosiy exchange'ga qaytadi. Bir nechta retry navbati turli kechikishlar bilan (10s, 1m, 10m) — eksponensial backoff. Urinishlar soni header'da (`x-retry-count`) yoki `x-death` dan; limitdan keyin — yakuniy DLQ.",
        "",
        "Muqobil: delayed message exchange plagini (`x-delayed-message`). `requeue: true` bilan darhol qaytarish — backoff'siz va zaharli xabar siklini keltirib chiqaradi.",
        "",
        "```text",
        "main ──(xato, retry=1)──▶ retry.10s (TTL 10s, DLX=orders) ──▶ main",
        "     ──(xato, retry=2)──▶ retry.1m  (TTL 60s, DLX=orders) ──▶ main",
        "     ──(retry>3)────────▶ dlq",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "TTL asosidagi uch bosqichli retry navbatlarini va yakuniy DLQ'ni sozlab, xato xabarning yo'lini kuzating.",
      acceptanceCriteria: [
        "TTL + DLX retry naqshini biladi",
        "Darhol requeue'ning xavfini tushunadi"
      ],
      prerequisites: [
        "49.13"
      ]
    },
    {
      id: "49.15",
      title: "Message TTL",
      description: [
        "TTL — xabarning yashash muddati: navbat darajasida (`x-message-ttl` — barcha xabarlar uchun) yoki xabar darajasida (`expiration` property). Muddati o'tgan xabar o'chiriladi yoki DLX'ga yuboriladi. Navbat TTL'i (`x-expires`) — ishlatilmagan navbatni o'chirish.",
        "",
        "Qo'llanishi: eskirgan xabar foydasiz bo'lganda (OTP — 2 daqiqadan keyin ma'nosiz, narx yangilanishi), retry kechikishi naqshi, navbat cheksiz o'sishining oldini olish. Ehtiyot: xabar darajasidagi TTL faqat navbat boshida tekshiriladi.",
        "",
        "```php",
        "$channel->queue_declare('sms.otp', durable: true, arguments: new AMQPTable(['x-message-ttl' => 120000]));",
        "$msg = new AMQPMessage($body, ['expiration' => '60000']);   // xabar darajasida, ms",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "OTP navbatiga TTL qo'yib, muddati o'tgan xabarlar yuborilmasligini tekshiring.",
      acceptanceCriteria: [
        "Navbat va xabar TTL'i farqini biladi",
        "TTL'ni eskirish va retry naqshlari uchun ishlatadi"
      ],
      prerequisites: [
        "49.2"
      ]
    },
    {
      id: "49.16",
      title: "Idempotent Consumers",
      description: [
        "RabbitMQ at-least-once yetkazadi: consumer ACK'dan oldin crash, tarmoq uzilishi, `nack(requeue)`, producer qayta yuborishi — dublikatlar. Har iste'molchi `message_id` (yoki payload'dagi `event_id`) bo'yicha deduplikatsiya qiladi: biznes o'zgarishi bilan bir tranzaksiyada \"processed\" yozuvi (unique), keyin ACK.",
        "",
        "ACK'ni DB commit'dan **keyin** yuboring: commit muvaffaqiyatli, ACK yo'qoldi → xabar qayta keladi → deduplikatsiya uni o'tkazib yuboradi. Teskari tartib xabar yo'qolishiga olib keladi.",
        "",
        "```php",
        "DB::transaction(function () use ($msg, $payload) {",
        "    ProcessedMessage::create(['message_id' => $msg->get('message_id'), 'consumer' => 'billing']);",
        "    $this->apply($payload);",
        "});",
        "$msg->ack();",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Consumer'ni deduplikatsiya va \"commit'dan keyin ACK\" tartibi bilan yozib, crash stsenariylarida sinang.",
      acceptanceCriteria: [
        "Dublikat manbalarini RabbitMQ kontekstida biladi",
        "ACK va commit tartibini to'g'ri qo'yadi"
      ],
      prerequisites: [
        "48.7"
      ]
    },
    {
      id: "49.17",
      title: "Queue Monitoring",
      description: [
        "RabbitMQ monitoringi: Management UI va HTTP API (navbat uzunligi — ready va unacked, publish/deliver/ack tezliklari, iste'molchilar soni, ulanishlar va kanallar), Prometheus plagini (`rabbitmq_prometheus`) + Grafana dashboard'lari, `rabbitmqctl list_queues name messages consumers`.",
        "",
        "Alert'lar: navbat uzunligi o'sib bormoqda (iste'molchilar yetmaydi yoki to'xtagan), iste'molchilar soni 0, unacked xabarlar ko'p (consumer qotib qolgan), DLQ'da xabarlar, xotira/disk alarm'lari (broker publish'ni bloklaydi!), ulanishlar soni keskin o'sishi (leak).",
        "",
        "```bash",
        "rabbitmqctl list_queues name messages_ready messages_unacknowledged consumers",
        "curl -s -u admin:*** http://rabbit:15672/api/queues/%2F/billing.order-events | jq '{ready: .messages_ready, unacked: .messages_unacknowledged, consumers}'",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Prometheus plagini va Grafana bilan navbat uzunligi, iste'molchilar va DLQ uchun alert'lar sozlang.",
      acceptanceCriteria: [
        "Asosiy RabbitMQ metrikalarini biladi",
        "Memory/disk alarm oqibatlarini tushunadi"
      ],
      prerequisites: [
        "58.14"
      ]
    },
    {
      id: "49.18",
      title: "High Availability",
      description: [
        "RabbitMQ HA: 3 (yoki toq sonli) tugunli klaster, quorum navbatlar (Raft — ko'pchilik tugun tirik bo'lsa ishlaydi), stream'lar (Kafka'ga o'xshash log), klaster oldida load balancer yoki mijozda bir nechta host ro'yxati, tarmoq bo'linishini boshqarish (`cluster_partition_handling`), federation/shovel — data markazlar o'rtasida.",
        "",
        "Mijoz tomonida: avtomatik qayta ulanish, publisher confirms (failover paytida yo'qolgan xabarlarni qayta yuborish), idempotent iste'molchilar. Boshqariladigan variantlar: Amazon MQ, CloudAMQP.",
        "",
        "```php",
        "$connection = AMQPStreamConnection::create_connection([",
        "    ['host' => 'rabbit-1', 'port' => 5672, 'user' => 'app', 'password' => $pass, 'vhost' => '/'],",
        "    ['host' => 'rabbit-2', 'port' => 5672, 'user' => 'app', 'password' => $pass, 'vhost' => '/'],",
        "    ['host' => 'rabbit-3', 'port' => 5672, 'user' => 'app', 'password' => $pass, 'vhost' => '/'],",
        "], ['heartbeat' => 30]);",
        "```"
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Docker'da 3 tugunli klaster va quorum navbat sozlab, bitta tugunni o'chirganda ishlash davom etishini sinang.",
      acceptanceCriteria: [
        "Klaster va quorum navbatlar asoslarini biladi",
        "Mijoz tomonidagi HA talablarini tushunadi"
      ],
      prerequisites: [
        "49.9"
      ]
    },
    {
      id: "49.19",
      title: "Laravel Integration",
      description: [
        "Laravel bilan ikki yo'l: (1) **queue driver** sifatida — `vladimir-yuldashev/laravel-queue-rabbitmq` paketi: oddiy Laravel job'lari RabbitMQ orqali (`QUEUE_CONNECTION=rabbitmq`), exchange/navbat sozlamalari config'da; (2) **servislararo xabarlar** uchun — `php-amqplib` bilan o'z producer/consumer'lar: domen event'larini JSON shartnoma bilan e'lon qilish, artisan buyrug'i sifatida consumer (Supervisor ostida).",
        "",
        "Ikkinchi holatda Laravel job serializatsiyasi (PHP obyektlari) emas, til-mustaqil JSON payload — boshqa tildagi servislar ham iste'mol qila olishi uchun.",
        "",
        "```php",
        "// config/queue.php (laravel-queue-rabbitmq)",
        "'rabbitmq' => [",
        "    'driver' => 'rabbitmq',",
        "    'hosts' => [['host' => env('RABBITMQ_HOST'), 'port' => 5672, 'user' => env('RABBITMQ_USER'), 'password' => env('RABBITMQ_PASSWORD'), 'vhost' => '/']],",
        "    'options' => ['queue' => ['exchange' => 'application-x', 'exchange_type' => 'topic']],",
        "],",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Laravel'dan JSON domen event'ini e'lon qiluvchi producer va boshqa servisdagi consumer'ni artisan buyrug'i sifatida yozing.",
      acceptanceCriteria: [
        "Queue driver va servislararo xabar yondashuvlarini farqlaydi",
        "Til-mustaqil payload'dan foydalanadi"
      ],
      prerequisites: [
        "49.6"
      ]
    },
    {
      id: "49.20",
      title: "RabbitMQ vs Redis Queue",
      description: [
        "**Redis queue** (Laravel + Horizon): sodda, tez, Laravel bilan to'liq integratsiya, ajoyib dashboard; marshrutlash yo'q, servislararo uchun PHP serializatsiyasi noqulay, persistence Redis sozlamasiga bog'liq. Ko'p Laravel ilovalari uchun ichki fon vazifalari — eng yaxshi tanlov.",
        "",
        "**RabbitMQ**: boy marshrutlash (topic, fanout), ishonchli yetkazish (confirms, ACK, quorum), DLX, til-mustaqil, ko'p servisli tizimlar uchun; murakkabroq ekspluatatsiya. **Kafka** — yuqori hajmli event stream'lar va replay kerak bo'lsa.",
        "",
        "```text",
        "Ichki fon vazifalari (email, PDF, import)          → Redis + Horizon",
        "Servislararo event'lar, murakkab marshrutlash       → RabbitMQ",
        "Juda katta oqim, replay, event sourcing             → Kafka",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Loyihangiz uchun Redis va RabbitMQ'ni mezonlar jadvali bilan solishtirib, ADR yozing.",
      acceptanceCriteria: [
        "Ikki yechimning kuchli va zaif tomonlarini biladi",
        "Tanlovni ehtiyojga qarab asoslaydi"
      ],
      prerequisites: [
        "47.1",
        "49.19"
      ]
    }
  ]
});
