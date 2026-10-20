/* 46 · Queues & Background Jobs
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 46,
  slug: "queues-and-background-jobs",
  title: "Queues & Background Jobs",
  group: "async",
  description: "Navbatlar va fon vazifalari — sekin, og'ir yoki beqaror ishlarni (email, hisobot, tashqi API, rasm qayta ishlash) HTTP so'rovdan ajratib, fon rejimida ishonchli bajarish. Laravel queue tizimi kuchli: job'lar, retry, batch, chain, unique job'lar, middleware. Senior dasturchi idempotent job'lar loyihalaydi, worker'larni to'g'ri sozlaydi va navbat muammolarini tez tashxislaydi.",
  subskills: [
    {
      id: "46.1",
      title: "Synchronous vs Asynchronous Processing",
      description: [
        "**Sinxron** — ish so'rov ichida bajariladi, foydalanuvchi natijani kutadi. **Asinxron** — ish navbatga qo'yiladi, so'rov darhol javob qaytaradi, worker keyinroq bajaradi. Asinxron foydasi: tezroq javob, tashqi servis sekinligi foydalanuvchiga ta'sir qilmaydi, retry, yuklamani tekislash, masshtablash (worker'lar alohida).",
        "",
        "Narxi: murakkablik (holat, xatolarni kuzatish), eventual consistency (natija darhol ko'rinmaydi), infratuzilma (Redis, worker'lar, monitoring). Qoida: foydalanuvchi natijani darhol ko'rishi shart bo'lmagan va 200–300 ms dan uzoq ishlar — navbatga.",
        "",
        "```php",
        "// Sinxron: foydalanuvchi PDF yaratilishini kutadi (5 s)",
        "$pdf = $generator->make($invoice);",
        "// Asinxron: darhol javob, PDF tayyor bo'lganda email",
        "GenerateInvoicePdf::dispatch($invoice);",
        "return response()->json(['status' => 'processing'], 202);",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Endpoint'dagi sekin ishlarni aniqlab, navbatga ko'chiring va javob vaqtini oldin/keyin o'lchang.",
      acceptanceCriteria: [
        "Sinxron va asinxron murosalarini biladi",
        "Navbatga ko'chiriladigan ishlarni to'g'ri tanlaydi"
      ],
      prerequisites: [
        "2.1"
      ]
    },
    {
      id: "46.2",
      title: "Queue Drivers",
      description: [
        "Laravel queue driver'lari: `sync` (darhol, testlar va lokal uchun), `database` (DB jadvali — oddiy, qo'shimcha infratuzilmasiz, o'rta yuklama uchun; `SKIP LOCKED` bilan), `redis` (tez, Horizon bilan — production standarti), `sqs` (AWS boshqariladigan, cheksiz masshtab), `beanstalkd`, RabbitMQ (paket orqali). `null` — job'larni tashlab yuborish.",
        "",
        "Tanlov: yuklama hajmi, ishonchlilik (persistence), mavjud infratuzilma, monitoring ehtiyoji (Horizon faqat Redis). Bir ilovada bir nechta connection va navbat.",
        "",
        "```php",
        "// config/queue.php",
        "'default' => env('QUEUE_CONNECTION', 'redis'),",
        "'connections' => [",
        "    'redis' => ['driver' => 'redis', 'connection' => 'queue', 'queue' => 'default', 'retry_after' => 190],",
        "    'database' => ['driver' => 'database', 'table' => 'jobs', 'queue' => 'default', 'retry_after' => 190],",
        "],",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Loyiha uchun queue driver'ini tanlab asoslang va lokal (`sync`/`database`) hamda production (`redis`) sozlamalarini yozing.",
      acceptanceCriteria: [
        "Driver'lar farqi va qo'llanishini biladi",
        "Driver tanlovini mezonlar bilan asoslaydi"
      ],
      prerequisites: [
        "46.1"
      ]
    },
    {
      id: "46.3",
      title: "Job Dispatching",
      description: [
        "Job yaratish: `php artisan make:job`, `ShouldQueue` interfeysi, `handle()` (DI qo'llab-quvvatlanadi). Dispatch: `Job::dispatch($args)`, `dispatch(new Job(...))`, `->onQueue('emails')`, `->onConnection('sqs')`, `->delay(now()->addMinutes(5))`, `->afterCommit()`, `dispatchIf`/`dispatchUnless`, `dispatchSync` (darhol, navbatsiz).",
        "",
        "Muhim: tranzaksiya ichida dispatch qilingan job commit'dan oldin bajarilishi mumkin (o'zi hali yo'q yozuvni qidiradi) — `afterCommit()` yoki `after_commit => true` konfiguratsiyada.",
        "",
        "```php",
        "DB::transaction(function () use ($order) {",
        "    $order->save();",
        "    SendOrderConfirmation::dispatch($order)->onQueue('emails')->afterCommit();",
        "});",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Tranzaksiya ichida dispatch qilingan job'ning race condition'ini qayta yarating va `afterCommit` bilan tuzating.",
      acceptanceCriteria: [
        "Dispatch variantlarini biladi",
        "`afterCommit` zarurligini tushunadi"
      ],
      prerequisites: [
        "46.2"
      ]
    },
    {
      id: "46.4",
      title: "Job Payloads",
      description: [
        "Job payload — navbatga yoziladigan serializatsiya qilingan job obyekti. `SerializesModels` — Eloquent modellar to'liq emas, faqat ID sifatida saqlanadi va worker'da DB'dan qayta yuklanadi (eng so'nggi holat; model o'chirilgan bo'lsa — `ModelNotFoundException`, `$deleteWhenMissingModels = true` bilan jim o'chirish).",
        "",
        "Qoidalar: payload kichik (ID'lar, katta ma'lumot emas — Redis xotirasi va SQS 256 KB limiti), serializatsiya qilinadigan (closure, resurs, PDO yo'q), sezgir ma'lumot yo'q yoki shifrlangan (`ShouldBeEncrypted`). Payload strukturasi o'zgarsa, navbatdagi eski job'lar bilan moslik.",
        "",
        "```php",
        "final class ExportReport implements ShouldQueue, ShouldBeEncrypted",
        "{",
        "    use Queueable, SerializesModels;",
        "    public bool $deleteWhenMissingModels = true;",
        "",
        "    public function __construct(public User $user, public array $filters) {}",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Katta massiv uzatayotgan job'ni ID asosidagi payload'ga o'tkazing va `deleteWhenMissingModels` xatti-harakatini sinang.",
      acceptanceCriteria: [
        "`SerializesModels` mexanizmini biladi",
        "Payload'ni kichik va xavfsiz saqlaydi"
      ],
      prerequisites: [
        "46.3"
      ]
    },
    {
      id: "46.5",
      title: "Job Lifecycle",
      description: [
        "Job hayot davri: dispatch → navbatda (pending) → worker oladi (reserved) → `handle()` bajariladi → muvaffaqiyat (o'chiriladi) yoki exception → `tries` qolgan bo'lsa `backoff` dan keyin qayta navbatga → urinishlar tugasa `failed()` chaqiriladi va `failed_jobs` ga yoziladi. Agar worker job'ni `retry_after` ichida tugatmasa (crash), job qayta navbatga qaytadi.",
        "",
        "Event'lar: `JobProcessing`, `JobProcessed`, `JobFailed`, `JobRetryRequested` — monitoring va log uchun (`Queue::before`, `Queue::after`, `Queue::failing`).",
        "",
        "```php",
        "Queue::failing(function (JobFailed $event) {",
        "    Log::error('Job failed', ['job' => $event->job->resolveName(), 'error' => $event->exception->getMessage()]);",
        "});",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Job hayot davri event'lariga log qo'shib, muvaffaqiyatli, qayta urinilgan va muvaffaqiyatsiz job oqimlarini kuzating.",
      acceptanceCriteria: [
        "Job holatlari va o'tishlarini biladi",
        "Queue event'lari bilan kuzatuv qo'shadi"
      ],
      prerequisites: [
        "46.3"
      ]
    },
    {
      id: "46.6",
      title: "Retries va Backoff",
      description: [
        "Qayta urinishlar: `$tries` (urinishlar soni), `retryUntil()` (vaqt bo'yicha chegara — tashqi API uchun qulay), `$maxExceptions` (shuncha exception'dan keyin to'xtash, `release()` lar hisobga olinmaydi), `$backoff` — son yoki massiv (eksponensial: `[10, 60, 300]`). Qo'lda: `$this->release(30)` (qayta navbatga), `$this->fail($e)` (darhol muvaffaqiyatsiz — qayta urinish foydasiz bo'lsa, masalan, validatsiya xatosi).",
        "",
        "Qayta urinish faqat vaqtinchalik xatolar uchun ma'noli (timeout, 503, deadlock). Doimiy xatolarni (404, noto'g'ri ma'lumot) darhol `fail()` qiling.",
        "",
        "```php",
        "public $tries = 5;",
        "public $maxExceptions = 3;",
        "public function backoff(): array { return [10, 60, 300, 900]; }",
        "",
        "public function handle(Gateway $gw): void",
        "{",
        "    try { $gw->charge($this->payment); }",
        "    catch (CardDeclined $e) { $this->fail($e); }   // qayta urinish ma'nosiz",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Tashqi API job'i uchun vaqtinchalik va doimiy xatolarni ajratuvchi retry strategiyasini yozing.",
      acceptanceCriteria: [
        "Retry parametrlarini biladi",
        "Vaqtinchalik va doimiy xatolarni ajratadi"
      ],
      prerequisites: [
        "24.10"
      ]
    },
    {
      id: "46.7",
      title: "Timeout Configuration",
      description: [
        "Job timeout: `$timeout` (soniya — oshsa worker jarayoni o'ldiriladi, `pcntl` kengaytmasi kerak), `$failOnTimeout = true` (timeout'da qayta urinmasdan muvaffaqiyatsiz). Worker darajasida `--timeout`. Connection'da `retry_after` — job shu vaqt ichida tugamasa boshqa worker uni qayta oladi.",
        "",
        "**Oltin qoida**: `retry_after` > eng uzun job `timeout` (bir necha soniya zaxira bilan); aks holda job ikki marta parallel bajariladi. Horizon'da supervisor `timeout` ham shu qoidaga bo'ysunadi. Uzoq job'larni bo'laklarga bo'lish yoki batch.",
        "",
        "```php",
        "final class ImportCatalog implements ShouldQueue",
        "{",
        "    public $timeout = 600;",
        "    public $failOnTimeout = true;",
        "}",
        "// config/queue.php → 'retry_after' => 660",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Barcha job'lar timeout'larini va `retry_after` ni audit qilib, dublikat bajarilish xavfini bartaraf eting.",
      acceptanceCriteria: [
        "`timeout` va `retry_after` bog'liqligini biladi",
        "Uzun job'larni bo'laklashni ko'rib chiqadi"
      ],
      prerequisites: [
        "12.11"
      ]
    },
    {
      id: "46.8",
      title: "Failed Jobs",
      description: [
        "Muvaffaqiyatsiz job'lar `failed_jobs` jadvalida (UUID, connection, queue, payload, exception, vaqt). Boshqaruv: `queue:failed` (ro'yxat), `queue:retry {uuid|all}`, `queue:retry --queue=emails`, `queue:forget`, `queue:flush`, `queue:prune-failed --hours=168`. Job'dagi `failed(Throwable $e)` metodi — tozalash, foydalanuvchiga xabar, kompensatsiya.",
        "",
        "Muvaffaqiyatsiz job'lar — monitoring va alert manbai; ularni tahlil qilmasdan ommaviy `retry all` — xatoni takrorlashi mumkin. DynamoDB yoki boshqa saqlash ham mumkin (`failed.driver`).",
        "",
        "```php",
        "public function failed(Throwable $e): void",
        "{",
        "    $this->export->update(['status' => 'failed', 'error' => Str::limit($e->getMessage(), 500)]);",
        "    $this->export->user->notify(new ExportFailed($this->export));",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Muvaffaqiyatsiz eksport job'i uchun `failed()` da holat yangilash va foydalanuvchiga xabar berishni qo'shing; alert sozlang.",
      acceptanceCriteria: [
        "Failed jobs buyruqlarini biladi",
        "`failed()` metodida kompensatsiya va xabar beradi"
      ],
      prerequisites: [
        "46.5"
      ]
    },
    {
      id: "46.9",
      title: "Job Batching",
      description: [
        "`Bus::batch([...])` — job'lar guruhi: umumiy progress (`progress()`, `processedJobs()`), `then` (hammasi muvaffaqiyatli), `catch` (birinchi xato), `finally`, `allowFailures()`, batch'ga job qo'shish (`$this->batch()->add()`), bekor qilish (`cancel()`, job ichida `$this->batch()->cancelled()` tekshiruvi). `job_batches` jadvali kerak; job'lar `Batchable` trait.",
        "",
        "Qo'llanishi: katta import'ni bo'laklarga bo'lib parallel qayta ishlash va progress ko'rsatish, ko'p hisobot generatsiyasi.",
        "",
        "```php",
        "$batch = Bus::batch(",
        "    collect($chunks)->map(fn ($rows) => new ImportProductsChunk($rows))",
        ")->then(fn (Batch $b) => ImportFinished::dispatch($b->id))",
        " ->catch(fn (Batch $b, Throwable $e) => Log::error('Import xatosi', ['batch' => $b->id]))",
        " ->allowFailures()",
        " ->onQueue('imports')",
        " ->dispatch();",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Katta CSV importni batch'ga bo'lib, progress endpoint'i va yakuniy bildirishnoma bilan amalga oshiring.",
      acceptanceCriteria: [
        "Batch callback'lari va progress'ni biladi",
        "Bekor qilish va `allowFailures` ni ishlatadi"
      ],
      prerequisites: [
        "46.3"
      ]
    },
    {
      id: "46.10",
      title: "Job Chaining",
      description: [
        "`Bus::chain([...])` — job'lar ketma-ket: oldingisi muvaffaqiyatli bo'lsagina keyingisi ishga tushadi; biri muvaffaqiyatsiz bo'lsa qolganlari bajarilmaydi (`catch` callback). Chain ichida batch va aksincha ham mumkin.",
        "",
        "Qo'llanishi: bosqichli jarayonlar — \"faylni yuklab olish → qayta ishlash → hisobot → email\". Har bosqich alohida retry va timeout bilan. Juda uzun zanjirlar o'rniga holat mashinasi yoki workflow vositasi aniqroq bo'lishi mumkin.",
        "",
        "```php",
        "Bus::chain([",
        "    new DownloadStatement($accountId),",
        "    new ParseStatement($accountId),",
        "    new ReconcileTransactions($accountId),",
        "    fn () => Log::info('Reconciled'),",
        "])->catch(fn (Throwable $e) => report($e))->onQueue('finance')->dispatch();",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Bank ko'chirmasini qayta ishlash jarayonini chain sifatida qurib, o'rtadagi xatoda keyingilar bajarilmasligini testlang.",
      acceptanceCriteria: [
        "Chain va batch farqini biladi",
        "Ketma-ket bosqichli jarayonni chain bilan quradi"
      ],
      prerequisites: [
        "46.9"
      ]
    },
    {
      id: "46.11",
      title: "Delayed Jobs",
      description: [
        "Kechiktirilgan job — ma'lum vaqtdan keyin bajariladi: `->delay(now()->addMinutes(10))`, job ichida `$this->release(60)`, notification'larda `->delay()`. Qo'llanishi: eslatmalar (\"savatda mahsulot qoldi\" — 1 soatdan keyin), to'lov holatini keyinroq tekshirish, rate limit'dan keyin qayta urinish.",
        "",
        "Cheklovlar: SQS maksimal 15 daqiqa kechikish; uzoq muddatli rejalar uchun (kunlar) — DB'da rejalashtirilgan vazifalar + scheduler yaxshiroq (bekor qilish va o'zgartirish oson). Bajarilish vaqtida holat qayta tekshiriladi (masalan, savat allaqachon to'langan bo'lishi mumkin).",
        "",
        "```php",
        "AbandonedCartReminder::dispatch($cart)->delay(now()->addHour());",
        "",
        "public function handle(): void",
        "{",
        "    if ($this->cart->fresh()?->isCheckedOut()) {",
        "        return; // holat o'zgargan",
        "    }",
        "    $this->cart->user->notify(new CartReminder($this->cart));",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "\"Tashlab ketilgan savat\" eslatmasini kechiktirilgan job bilan, bajarilish vaqtida holat tekshiruvi bilan yozing.",
      acceptanceCriteria: [
        "Delay usullari va cheklovlarini biladi",
        "Bajarilish vaqtida holatni qayta tekshiradi"
      ],
      prerequisites: [
        "46.3"
      ]
    },
    {
      id: "46.12",
      title: "Unique Jobs",
      description: [
        "`ShouldBeUnique` — bir xil job navbatda yoki bajarilayotgan bo'lsa, yangisi dispatch qilinmaydi: `uniqueId()` (kalit — masalan, mahsulot ID), `$uniqueFor` (lock muddati), `uniqueVia()` (lock uchun cache). `ShouldBeUniqueUntilProcessing` — lock bajarilish boshlanganda bo'shaydi (bajarilayotganda yangisi navbatga qo'yilishi mumkin).",
        "",
        "Qo'llanishi: \"mahsulot indeksini yangilash\" — 10 marta tez-tez o'zgarsa ham bitta job yetarli. Lock atomik cache talab qiladi (Redis, database, memcached).",
        "",
        "```php",
        "final class ReindexProduct implements ShouldQueue, ShouldBeUnique",
        "{",
        "    public $uniqueFor = 300;",
        "    public function __construct(public int $productId) {}",
        "    public function uniqueId(): string { return (string) $this->productId; }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Tez-tez dispatch qilinadigan qayta indekslash job'ini unique qilib, dublikatlar sonini oldin/keyin solishtiring.",
      acceptanceCriteria: [
        "`ShouldBeUnique` va `UntilProcessing` farqini biladi",
        "Unique kalitini to'g'ri tanlaydi"
      ],
      prerequisites: [
        "46.3"
      ]
    },
    {
      id: "46.13",
      title: "Overlapping Job Prevention",
      description: [
        "`WithoutOverlapping` job middleware'i — bir xil kalitli job'lar **parallel** bajarilmasligini ta'minlaydi (unique'dan farqi: navbatga qo'yilishiga to'sqinlik qilmaydi, faqat bir vaqtda bajarilishini cheklaydi). `->releaseAfter(10)` (band bo'lsa qayta navbatga), `->dontRelease()` (tashlab yuborish), `->expireAfter(180)` (lock muddati — crash'da abadiy qulflanmaslik uchun), `->shared()` (turli job class'lari o'rtasida).",
        "",
        "Qo'llanishi: bitta foydalanuvchi balansini o'zgartiruvchi job'lar, bitta hisob sinxronizatsiyasi.",
        "",
        "```php",
        "public function middleware(): array",
        "{",
        "    return [(new WithoutOverlapping($this->accountId))->releaseAfter(15)->expireAfter(300)];",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Bir hisob uchun parallel sinxronizatsiya job'larini `WithoutOverlapping` bilan ketma-ketlashtiring va testlang.",
      acceptanceCriteria: [
        "Unique va WithoutOverlapping farqini biladi",
        "Lock muddati va release sozlamalarini qo'llaydi"
      ],
      prerequisites: [
        "46.12"
      ]
    },
    {
      id: "46.14",
      title: "Idempotent Job Design",
      description: [
        "Navbatlar at-least-once — job ikki marta bajarilishi mumkin (worker crash, `retry_after`, qayta urinish, qo'lda retry). Idempotent job — takror bajarilganda natija o'zgarmaydi. Usullar: holat tekshiruvi (\"allaqachon yuborilganmi?\"), unique constraint (`processed_job_keys`), upsert, idempotency key bilan tashqi API chaqiruvi, yon ta'sirlarni oxirida va bir martalik belgilab bajarish.",
        "",
        "Qisman bajarilish: job o'rtada yiqilsa, qayta urinishda boshidan ishlaydi — har qadam qayta bajarishga xavfsiz bo'lsin.",
        "",
        "```php",
        "public function handle(Mailer $mailer): void",
        "{",
        "    $sent = InvoiceDelivery::firstOrCreate(['invoice_id' => $this->invoice->id], ['status' => 'pending']);",
        "    if ($sent->status === 'sent') {",
        "        return;",
        "    }",
        "    $mailer->to($this->invoice->customer)->send(new InvoiceMail($this->invoice));",
        "    $sent->update(['status' => 'sent']);",
        "}",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Pul yoki email bilan bog'liq job'ni ikki marta ishga tushirib, natija o'zgarmasligini ta'minlang va testlang.",
      acceptanceCriteria: [
        "Job takrorlanish manbalarini biladi",
        "Idempotentlikni holat va constraint bilan ta'minlaydi"
      ],
      prerequisites: [
        "17.17"
      ]
    },
    {
      id: "46.15",
      title: "Job Priorities",
      description: [
        "Prioritet — alohida navbatlar va worker sozlamasi orqali: `queue:work --queue=high,default,low` — worker avval `high` ni bo'shatadi. Horizon'da supervisor bo'yicha navbatlar va worker sonlari. Muhim ishlar (to'lov, OTP SMS) sekin ommaviy ishlar (hisobot, marketing email) orqasida qolib ketmasligi kerak.",
        "",
        "Ehtiyot: qat'iy prioritet past navbatni \"och qoldirishi\" mumkin (starvation) — alohida worker'lar ajratish yoki Horizon balans strategiyalari.",
        "",
        "```php",
        "SendOtp::dispatch($phone)->onQueue('critical');",
        "GenerateMonthlyReport::dispatch($company)->onQueue('low');",
        "```",
        "```bash",
        "php artisan queue:work redis --queue=critical,default",
        "php artisan queue:work redis --queue=low     # alohida worker — starvation yo'q",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Navbatlarni prioritet bo'yicha ajrating va OTP job'i katta hisobot yuklamasida ham tez bajarilishini isbotlang.",
      acceptanceCriteria: [
        "Navbat prioritetlari mexanizmini biladi",
        "Starvation'ning oldini oladi"
      ],
      prerequisites: [
        "46.2"
      ]
    },
    {
      id: "46.16",
      title: "Queue Workers",
      description: [
        "`php artisan queue:work` — long-running jarayon: bir marta bootstrap, job'larni siklda oladi (tez). Opsiyalar: `--queue`, `--tries`, `--timeout`, `--sleep` (bo'sh navbatda kutish), `--max-jobs`, `--max-time` (davriy qayta ishga tushirish), `--memory`, `--stop-when-empty`, `--backoff`. `queue:listen` — har job'da qayta bootstrap (sekin, faqat dev).",
        "",
        "Worker'lar jarayon menejeri ostida (Supervisor, systemd, Horizon, konteyner) — crash'da qayta ishga tushirish. Kod o'zgargach eski kodda ishlaydi — deploy'da qayta ishga tushirish shart.",
        "",
        "```ini",
        "[program:worker]",
        "command=php /var/www/current/artisan queue:work redis --queue=default --sleep=3 --tries=3 --max-time=3600 --memory=256",
        "numprocs=4",
        "autorestart=true",
        "stopwaitsecs=360",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Supervisor bilan worker'larni sozlab, `--max-time` va `--memory` ta'sirini kuzating.",
      acceptanceCriteria: [
        "`queue:work` opsiyalarini biladi",
        "Worker'lar long-running ekanini va oqibatlarini tushunadi"
      ],
      prerequisites: [
        "38.17"
      ]
    },
    {
      id: "46.17",
      title: "Worker Memory Management",
      description: [
        "Long-running worker'larda xotira o'sishi: statik keshlar, singleton'larda yig'ilgan ma'lumot, Eloquent model'larida relation'lar, query log, event listener'lar, katta kolleksiyalar. Himoya: `--memory=256` (limitdan oshsa worker to'xtaydi va menejer qayta ishga tushiradi), `--max-jobs`/`--max-time` (davriy yangilash), job ichida katta ma'lumotni `lazy()`/`chunk` bilan, `scoped` binding'lar, `DB::disableQueryLog()`.",
        "",
        "Kuzatish: worker RSS trendi, Horizon metrikalari. Octane'dagi kabi muammolar — holat job'lar orasida \"oqib\" o'tishi.",
        "",
        "```php",
        "public function handle(): void",
        "{",
        "    Order::where('status', 'pending')->lazyById(500)->each(function (Order $o) {",
        "        $this->process($o);",
        "    });",
        "    // katta get()->each() o'rniga — xotira barqaror",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Xotirasi o'sib borayotgan worker'ni profiling qilib, sababini topib tuzating va limitlarni sozlang.",
      acceptanceCriteria: [
        "Worker xotira o'sishi manbalarini biladi",
        "Limitlar va lazy iteratsiya bilan nazorat qiladi"
      ],
      prerequisites: [
        "1.22"
      ]
    },
    {
      id: "46.18",
      title: "Graceful Worker Restart",
      description: [
        "Deploy'dan keyin worker'lar eski kodni ishlatadi (bootstrap bir marta). `php artisan queue:restart` — cache'ga signal yozadi; har worker joriy job'ini tugatgach to'xtaydi va jarayon menejeri uni yangi kod bilan qayta ishga tushiradi. Horizon: `horizon:terminate`.",
        "",
        "Shartlar: cache barcha serverlar uchun umumiy (Redis), jarayon menejerining `stopwaitsecs` eng uzun job'dan katta, SIGTERM (SIGKILL emas) — joriy job yarim qolmasligi uchun. Payload formati o'zgargan bo'lsa — eski job'lar bilan moslik.",
        "",
        "```bash",
        "# deploy skriptida",
        "php artisan queue:restart       # yoki: php artisan horizon:terminate",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Deploy skriptiga graceful worker restart qo'shing va uzun job o'rtada uzilmasligini sinang.",
      acceptanceCriteria: [
        "`queue:restart` mexanizmini biladi",
        "Graceful restart shartlarini ta'minlaydi"
      ],
      prerequisites: [
        "46.16"
      ]
    },
    {
      id: "46.19",
      title: "Dead Letter Handling",
      description: [
        "Dead letter — barcha urinishlardan keyin ham bajarilmagan xabarlar. Laravel'da `failed_jobs` jadvali dead letter vazifasini bajaradi; SQS/RabbitMQ'da alohida DLQ (`maxReceiveCount` / dead-letter exchange).",
        "",
        "Jarayon: alert (failed soni chegaradan oshsa), triage (kod xatosi? ma'lumot? tashqi servis?), tuzatish, so'ng tanlab qayta ishga tushirish (`queue:retry` UUID yoki navbat bo'yicha), retry qilib bo'lmaydiganlarni hujjatlab o'chirish, muddatli tozalash. Muhim biznes job'lari uchun — admin panelda ko'rinish va qo'lda boshqaruv.",
        "",
        "```bash",
        "php artisan queue:failed | grep ImportOrders",
        "php artisan queue:retry --queue=imports",
        "php artisan queue:prune-failed --hours=720",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Failed job'lar uchun alert, triage qo'llanmasi va tanlab qayta ishga tushirish jarayonini yozing.",
      acceptanceCriteria: [
        "Dead letter jarayonini biladi",
        "Failed job'larni tahlilsiz ommaviy retry qilmaydi"
      ],
      prerequisites: [
        "46.8"
      ]
    },
    {
      id: "46.20",
      title: "Monitoring Queue Backlogs",
      description: [
        "Backlog — navbatdagi bajarilmagan job'lar soni va eng eski job yoshi. O'sib borayotgan backlog — worker'lar yetishmaydi, job'lar sekinlashgan yoki tashqi servis muammosi. Metrikalar: navbat uzunligi, kutish vaqti (wait time), throughput, failure rate, job davomiyligi.",
        "",
        "Vositalar: Horizon (wait time, throughput, \"long wait\" bildirishnomalari), `Queue::size('emails')`, `queue:monitor redis:default,redis:emails --max=100` (chegaradan oshsa `QueueBusy` event), Prometheus exporter, SQS CloudWatch.",
        "",
        "```php",
        "Schedule::command('queue:monitor redis:default,redis:emails --max=500')->everyMinute();",
        "",
        "Event::listen(QueueBusy::class, fn (QueueBusy $e) =>",
        "    Notification::route('telegram', config('ops.chat'))->notify(new QueueBacklogAlert($e->queue, $e->size)));",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "`queue:monitor` va Horizon bildirishnomalari bilan backlog alert'larini sozlang.",
      acceptanceCriteria: [
        "Backlog metrikalarini biladi",
        "Avtomatik alert sozlaydi"
      ],
      prerequisites: [
        "47.13"
      ]
    },
    {
      id: "46.21",
      title: "At-Least-Once Delivery",
      description: [
        "Laravel navbatlari (Redis, SQS, database) **at-least-once** semantikaga ega: job kamida bir marta bajariladi, lekin quyidagi holatlarda takrorlanishi mumkin — worker job'ni bajardi, lekin o'chirishdan oldin crash bo'ldi; `retry_after` dan uzoq ishladi; SQS visibility timeout tugadi; tarmoq xatosi.",
        "",
        "Exactly-once — taqsimlangan tizimlarda amalda yo'q; uning o'rniga at-least-once + idempotent iste'molchi = \"effectively once\". Dizayn qarorlari shu faraz bilan qabul qilinadi.",
        "",
        "```text",
        "dispatch → [queue] → worker: handle() ✅ → delete ❌ (crash)",
        "                   → retry_after o'tdi → boshqa worker: handle() 🔁",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Worker'ni job bajarilgandan keyin, o'chirishdan oldin to'xtatib, takroriy bajarilishni qayta yarating.",
      acceptanceCriteria: [
        "At-least-once semantikasini va takrorlanish sabablarini biladi",
        "Exactly-once mifini rad eta oladi"
      ],
      prerequisites: [
        "46.14"
      ]
    },
    {
      id: "46.22",
      title: "Duplicate Processing Prevention",
      description: [
        "Takroriy qayta ishlashning oldini olish qatlamlari: dispatch darajasida — `ShouldBeUnique`; bajarilish darajasida — `WithoutOverlapping`; biznes darajasida — idempotentlik (holat tekshiruvi, unique constraint, `processed_messages` jadvali job/xabar ID'si bilan); tashqi API darajasida — idempotency key.",
        "",
        "Eng ishonchli — DB constraint bilan bir tranzaksiyada \"qayta ishlandi\" belgisi va biznes o'zgarishi. Lock'lar (cache) qo'shimcha, lekin yagona kafolat emas (muddat tugashi, cache yo'qolishi).",
        "",
        "```php",
        "DB::transaction(function () {",
        "    ProcessedMessage::create(['message_id' => $this->messageId]); // unique — dublikatda exception",
        "    $this->applyPayment();",
        "});",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "To'lov job'ini barcha qatlamlarda dublikatdan himoyalang va parallel takroriy dispatch bilan sinang.",
      acceptanceCriteria: [
        "Dublikatga qarshi qatlamlarni biladi",
        "DB constraint'ni asosiy kafolat sifatida ishlatadi"
      ],
      prerequisites: [
        "46.21",
        "46.13"
      ]
    }
  ]
});
