/* 17 · Database Transactions
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 17,
  slug: "database-transactions",
  title: "Database Transactions",
  group: "database",
  description: "Tranzaksiyalar — ma'lumot izchilligining asosi. Pul o'tkazmasi, buyurtma va zaxira, to'lov va hisob-faktura — barchasi \"yo hammasi, yo hech biri\" tamoyiliga tayanadi. Senior dasturchi izolyatsiya anomaliyalarini, lock strategiyalarini, qayta urinish va idempotentlikni hamda tranzaksiya DB chegarasidan chiqqanda (tashqi API, navbat) nima qilish kerakligini biladi.",
  subskills: [
    {
      id: "17.1",
      title: "ACID Properties",
      description: [
        "- **Atomicity** — tranzaksiya bo'linmas: xato bo'lsa barcha o'zgarishlar bekor qilinadi.",
        "- **Consistency** — tranzaksiya DB'ni bir yaroqli holatdan boshqasiga o'tkazadi (constraint'lar buzilmaydi).",
        "- **Isolation** — parallel tranzaksiyalar bir-biriga ta'sir qilmagandek ishlaydi (darajaga qarab).",
        "- **Durability** — commit qilingan ma'lumot server qulasa ham saqlanadi (WAL/redo log).",
        "",
        "ACID — DB kafolati; ilova uni to'g'ri chegaralar bilan ishlatishi kerak. Taqsimlangan tizimlarda (bir nechta servis/DB) ACID yo'q — saga va eventual consistency.",
        "",
        "```php",
        "DB::transaction(function () use ($from, $to, $amount) {",
        "    $from->decrement('balance', $amount);  // ikkalasi ham bajariladi",
        "    $to->increment('balance', $amount);    // yoki hech biri",
        "});",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Har bir ACID xususiyatini pul o'tkazmasi misolida buzilish stsenariysi bilan tushuntiring.",
      acceptanceCriteria: [
        "To'rt xususiyatni misol bilan izohlay oladi",
        "ACID qaysi chegarada tugashini biladi"
      ],
      prerequisites: []
    },
    {
      id: "17.2",
      title: "`BEGIN`, `COMMIT`, `ROLLBACK`",
      description: [
        "`BEGIN`/`START TRANSACTION` tranzaksiyani ochadi, `COMMIT` o'zgarishlarni doimiy qiladi, `ROLLBACK` bekor qiladi. Autocommit rejimida (default) har bir so'rov o'z tranzaksiyasi.",
        "",
        "Nozikliklar: MySQL'da DDL (`CREATE`, `ALTER`) implicit commit qiladi — migratsiyani tranzaksiyaga o'rash ishlamaydi; PostgreSQL'da DDL tranzaksiyaviy. PostgreSQL'da tranzaksiya ichida xato bo'lsa, `ROLLBACK` gacha boshqa buyruqlar bajarilmaydi. Ochiq qolgan tranzaksiya lock'larni ushlab turadi.",
        "",
        "```sql",
        "START TRANSACTION;",
        "UPDATE accounts SET balance = balance - 100 WHERE id = 1;",
        "UPDATE accounts SET balance = balance + 100 WHERE id = 2;",
        "COMMIT;",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Ikki terminal ochib, commit qilinmagan o'zgarish boshqa sessiyada ko'rinmasligini va lock kutishni kuzating.",
      acceptanceCriteria: [
        "Autocommit rejimini tushunadi",
        "DDL'ning MySQL va PostgreSQL'dagi tranzaksiyaviy farqini biladi"
      ],
      prerequisites: [
        "17.1"
      ]
    },
    {
      id: "17.3",
      title: "Laravel `DB::transaction()`",
      description: [
        "`DB::transaction(Closure $callback, int $attempts = 1)` — closure'ni tranzaksiyada bajaradi: muvaffaqiyatli bo'lsa commit, exception bo'lsa rollback va exception qayta otiladi; `attempts > 1` bo'lsa deadlock/lost connection'da qayta urinadi. Closure qaytargan qiymat natija sifatida qaytadi.",
        "",
        "Qo'lda boshqarish: `DB::beginTransaction()`, `DB::commit()`, `DB::rollBack()` — `try/catch` bilan, kamdan-kam kerak. Ulanish aniq: `DB::connection('pgsql')->transaction(...)`. `DB::afterCommit()` — commit'dan keyin bajariladigan callback.",
        "",
        "```php",
        "$invoice = DB::transaction(function () use ($order) {",
        "    $invoice = Invoice::create(['order_id' => $order->id, 'total' => $order->total]);",
        "    $order->update(['status' => OrderStatus::Invoiced]);",
        "    return $invoice;",
        "}, attempts: 3);",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Qo'lda `beginTransaction/commit` yozilgan kodni `DB::transaction` ga o'tkazing va rollback'ni testlang.",
      acceptanceCriteria: [
        "Callback qaytargan qiymat va exception xatti-harakatini biladi",
        "`attempts` qaysi xatolarda qayta urinishini tushunadi"
      ],
      prerequisites: [
        "17.2"
      ]
    },
    {
      id: "17.4",
      title: "Nested Transactions va Savepoints",
      description: [
        "Ko'p DB'lar haqiqiy ichma-ich tranzaksiyani qo'llab-quvvatlamaydi — o'rniga **savepoint**: `SAVEPOINT sp1` → `ROLLBACK TO sp1` (faqat shu nuqtadan keyingilarni bekor qiladi). Laravel ichma-ich `DB::transaction` chaqiruvlarini avtomatik savepoint'larga aylantiradi (`transactionLevel()`).",
        "",
        "Nozik joy: ichki tranzaksiyada exception ushlanib yutilsa, tashqi tranzaksiya davom etadi — faqat ichki qism bekor qilingan. Faqat eng tashqi `commit` haqiqiy commit. `afterCommit` callback'lari eng tashqi commit'dan keyin ishlaydi.",
        "",
        "```php",
        "DB::transaction(function () use ($order) {",
        "    $order->save();",
        "    try {",
        "        DB::transaction(fn () => $this->applyBonus($order)); // savepoint",
        "    } catch (BonusUnavailable) {",
        "        // bonus bekor, buyurtma saqlanadi",
        "    }",
        "});",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ichki operatsiya muvaffaqiyatsiz bo'lsa ham tashqi tranzaksiya davom etadigan stsenariyni savepoint bilan yozing.",
      acceptanceCriteria: [
        "Savepoint mexanizmini tushuntira oladi",
        "Laravel ichma-ich tranzaksiyalarni qanday boshqarishini biladi"
      ],
      prerequisites: [
        "17.3"
      ]
    },
    {
      id: "17.5",
      title: "Isolation Levels",
      description: [
        "To'rt standart daraja va ular oldini oladigan anomaliyalar:",
        "",
        "| Daraja | Dirty read | Non-repeatable | Phantom |",
        "|---|---|---|---|",
        "| READ UNCOMMITTED | ✗ | ✗ | ✗ |",
        "| READ COMMITTED | ✓ | ✗ | ✗ |",
        "| REPEATABLE READ | ✓ | ✓ | ✗ (InnoDB/PG'da amalda ✓) |",
        "| SERIALIZABLE | ✓ | ✓ | ✓ |",
        "",
        "Lost update va write skew alohida ko'rib chiqiladi. Yuqori daraja — kamroq anomaliya, lekin ko'proq lock yoki serializatsiya xatosi. Odatiy yondashuv: default daraja + kerakli joyda aniq lock (`FOR UPDATE`) yoki atomik so'rov.",
        "",
        "```php",
        "DB::statement('SET TRANSACTION ISOLATION LEVEL SERIALIZABLE');",
        "DB::transaction(fn () => /* ... */, attempts: 5);",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Har bir anomaliyani tegishli izolyatsiya darajasida ikki parallel sessiya bilan qayta yarating.",
      acceptanceCriteria: [
        "Darajalar va anomaliyalar jadvalini biladi",
        "Darajani oshirish o'rniga aniq lock'ni tanlay oladi"
      ],
      prerequisites: [
        "9.17"
      ]
    },
    {
      id: "17.6",
      title: "Dirty Reads",
      description: [
        "Dirty read — tranzaksiya boshqa tranzaksiyaning hali commit qilinmagan o'zgarishini o'qiydi. Agar o'sha tranzaksiya keyin rollback qilsa, o'qilgan ma'lumot hech qachon mavjud bo'lmagan bo'ladi.",
        "",
        "Faqat `READ UNCOMMITTED` da yuz beradi (PostgreSQL'da bu daraja ham dirty read'ga yo'l qo'ymaydi). Amalda deyarli hech qachon kerak emas — ba'zan taxminiy monitoring so'rovlarida ishlatiladi. Bilish muhim: anomaliyalar ierarxiyasining birinchi pog'onasi.",
        "",
        "```text",
        "T1: UPDATE balance = 0 (commit qilinmagan)",
        "T2: SELECT balance → 0   ← dirty read",
        "T1: ROLLBACK              → haqiqiy balans 1000 edi",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "MySQL'da `READ UNCOMMITTED` bilan dirty read'ni qayta yarating va nega xavfli ekanini yozing.",
      acceptanceCriteria: [
        "Dirty read ta'rifini va xavfini biladi",
        "Qaysi darajada yuz berishini biladi"
      ],
      prerequisites: [
        "17.5"
      ]
    },
    {
      id: "17.7",
      title: "Non-Repeatable Reads",
      description: [
        "Non-repeatable read — bir tranzaksiya ichida bir xil qatorni ikki marta o'qiganda turli qiymat olinadi, chunki oraliqda boshqa tranzaksiya uni o'zgartirib commit qilgan. `READ COMMITTED` da yuz beradi (PostgreSQL default).",
        "",
        "Muammo bo'ladigan joy: o'qilgan qiymatga asoslanib qaror qabul qilish va keyin yana o'qish (masalan, hisobot ichida ikki marta summa). Yechim: `REPEATABLE READ`, kerakli qatorni bir marta o'qib saqlash, yoki `FOR UPDATE`/`FOR SHARE` bilan qulflash.",
        "",
        "```text",
        "T1: SELECT price FROM products WHERE id = 1  → 100",
        "T2: UPDATE price = 120; COMMIT",
        "T1: SELECT price FROM products WHERE id = 1  → 120   ← non-repeatable",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "PostgreSQL'da `READ COMMITTED` va `REPEATABLE READ` da non-repeatable read xatti-harakatini solishtiring.",
      acceptanceCriteria: [
        "Anomaliyani misol bilan tushuntira oladi",
        "Uni oldini olish usullarini biladi"
      ],
      prerequisites: [
        "17.5"
      ]
    },
    {
      id: "17.8",
      title: "Phantom Reads",
      description: [
        "Phantom read — bir xil shartli so'rov (`WHERE status = 'pending'`) ikki marta bajarilganda yangi qatorlar paydo bo'ladi yoki yo'qoladi, chunki boshqa tranzaksiya mos qator qo'shgan/o'chirgan. Bu alohida qatorni emas, **to'plamni** o'zgartiradi.",
        "",
        "InnoDB `REPEATABLE READ` da oddiy o'qishlar snapshot orqali, locking o'qishlar next-key lock bilan phantom'lardan himoyalanadi. PostgreSQL `REPEATABLE READ` snapshot tufayli phantom ko'rsatmaydi. Muhim stsenariy: \"agar mos yozuv bo'lmasa, yarat\" — parallel ikki tranzaksiya ikkalasi ham yaratadi (unique constraint yoki lock kerak).",
        "",
        "```text",
        "T1: SELECT COUNT(*) FROM bookings WHERE room = 5 AND day = '2025-06-01' → 0",
        "T2: INSERT booking (room 5, 2025-06-01); COMMIT",
        "T1: INSERT booking (room 5, 2025-06-01)  ← ikki bron!",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Ikki bron muammosini qayta yarating va unique constraint bilan tuzating.",
      acceptanceCriteria: [
        "Phantom va non-repeatable read farqini biladi",
        "\"Tekshir-keyin-yarat\" race'ni constraint bilan hal qiladi"
      ],
      prerequisites: [
        "17.7"
      ]
    },
    {
      id: "17.9",
      title: "Lost Updates",
      description: [
        "Lost update — ikki tranzaksiya bir qiymatni o'qiydi, har biri o'zgartirib yozadi, va birining o'zgarishi ikkinchisi tomonidan qayta yoziladi. Klassik misol: zaxira `qty = 10`, ikki so'rov o'qiydi, har biri `qty = 9` yozadi — natija 9, aslida 8 bo'lishi kerak edi.",
        "",
        "Yechimlar: atomik so'rov (`UPDATE ... SET qty = qty - 1 WHERE qty > 0`), pessimistic lock (`lockForUpdate()`), optimistic lock (version ustuni), `SERIALIZABLE` (PostgreSQL buni xato sifatida aniqlaydi). Eloquent'da `$model->qty--; $model->save()` lost update'ga moyil.",
        "",
        "```php",
        "// ❌ lost update",
        "$p = Product::find($id); $p->stock -= 1; $p->save();",
        "// ✅ atomik",
        "$ok = Product::whereKey($id)->where('stock', '>', 0)->decrement('stock');",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Zaxirani kamaytirishda lost update'ni parallel so'rovlar bilan ko'rsating va uch xil usulda tuzating.",
      acceptanceCriteria: [
        "Lost update'ni kodda taniydi",
        "Vaziyatga mos yechimni tanlaydi"
      ],
      prerequisites: [
        "13.20"
      ]
    },
    {
      id: "17.10",
      title: "Pessimistic Locking",
      description: [
        "Pessimistic locking — ziddiyat bo'ladi deb hisoblab, qatorni oldindan qulflash: `SELECT ... FOR UPDATE` (boshqalar yozolmaydi va FOR UPDATE bilan o'qiyolmaydi), `FOR SHARE` (boshqalar o'qiydi, yozolmaydi). Lock tranzaksiya oxirigacha saqlanadi.",
        "",
        "Laravel: `->lockForUpdate()`, `->sharedLock()`. Qoidalar: faqat tranzaksiya ichida; lock'ni imkon qadar kech olib, tez bo'shatish; deadlock'ning oldini olish uchun barqaror tartib; `NOWAIT`/`SKIP LOCKED` kutishni boshqarish uchun. Ziddiyat ko'p va konflikt narxi yuqori bo'lgan joylar uchun (moliya).",
        "",
        "```php",
        "DB::transaction(function () use ($accountId, $amount) {",
        "    $account = Account::whereKey($accountId)->lockForUpdate()->firstOrFail();",
        "    if ($account->balance < $amount) {",
        "        throw new InsufficientFunds();",
        "    }",
        "    $account->decrement('balance', $amount);",
        "});",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Balansdan yechishni `lockForUpdate` bilan yozing va parallel so'rovlarda manfiy balans yuzaga kelmasligini testlang.",
      acceptanceCriteria: [
        "`FOR UPDATE` va `FOR SHARE` farqini biladi",
        "Lock'ni tranzaksiyadan tashqarida ishlatmaydi"
      ],
      prerequisites: [
        "17.9"
      ]
    },
    {
      id: "17.11",
      title: "Optimistic Locking",
      description: [
        "Optimistic locking — ziddiyat kam deb hisoblab, qulflamasdan ishlash va yozishda tekshirish: `version` (yoki `updated_at`) ustuni; `UPDATE ... SET ..., version = version + 1 WHERE id = ? AND version = ?`; o'zgargan qatorlar soni 0 bo'lsa — konflikt.",
        "",
        "Afzalliklari: lock yo'q, uzoq \"o'qish-tahrir-saqlash\" jarayonlari (forma ochiq turadi) uchun mos, yuqori parallellik. Konfliktda: foydalanuvchiga \"ma'lumot o'zgargan, qayta yuklang\" yoki avtomatik qayta urinish. API'da ETag/`If-Match` header bilan birgalikda.",
        "",
        "```php",
        "$affected = Document::whereKey($doc->id)",
        "    ->where('version', $request->integer('version'))",
        "    ->update([...$data, 'version' => DB::raw('version + 1')]);",
        "",
        "abort_if($affected === 0, 409, 'Hujjat boshqa foydalanuvchi tomonidan o\\'zgartirilgan');",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Hujjat tahrirlashga optimistic lock qo'shing va konfliktda 409 qaytarilishini testlang.",
      acceptanceCriteria: [
        "Optimistic va pessimistic yondashuvni ziddiyat darajasiga qarab tanlaydi",
        "Konflikt bo'lganda foydalanuvchi tajribasini o'ylaydi"
      ],
      prerequisites: [
        "17.9"
      ]
    },
    {
      id: "17.12",
      title: "Deadlock Detection",
      description: [
        "DB deadlock'ni avtomatik aniqlaydi (InnoDB darhol, PostgreSQL `deadlock_timeout` dan keyin) va bir tranzaksiyani bekor qiladi (MySQL 1213, PostgreSQL 40P01). Ilova bu xatoni kutishi va qayta urinishi kerak.",
        "",
        "Tahlil: MySQL `SHOW ENGINE INNODB STATUS` (`LATEST DETECTED DEADLOCK`), `innodb_print_all_deadlocks`; PostgreSQL server log. Odatiy sabablar: turli tartibda lock olish, indekssiz yangilash (ko'p qator lock), FK tekshiruvlari, gap lock'lar. Deadlock chastotasini metrika sifatida kuzating.",
        "",
        "```php",
        "try {",
        "    DB::transaction(fn () => $this->transfer($a, $b, $sum), attempts: 3);",
        "} catch (QueryException $e) {",
        "    report($e); // 3 urinishdan keyin ham deadlock — tahlil kerak",
        "    throw $e;",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Deadlock log'idan ikki tranzaksiyaning lock tartibini o'qib, kodda bir xil tartibni joriy qiling.",
      acceptanceCriteria: [
        "Deadlock xato kodlarini biladi",
        "Deadlock'ni log'dan tahlil qila oladi"
      ],
      prerequisites: [
        "10.12"
      ]
    },
    {
      id: "17.13",
      title: "Retry Strategies",
      description: [
        "Qayta urinish kerak bo'lgan xatolar: deadlock, serialization failure, lock wait timeout, vaqtinchalik ulanish uzilishi. Kerak emas: validatsiya, biznes qoida, constraint buzilishi.",
        "",
        "Strategiya: cheklangan urinishlar soni, eksponensial backoff + jitter (barcha mijozlar bir vaqtda qayta urinmasligi uchun), butun tranzaksiyani qayta bajarish (faqat oxirgi so'rovni emas), tranzaksiya ichida yon ta'sir yo'q (aks holda takrorlanadi), urinishlar sonini log/metrikaga yozish.",
        "",
        "```php",
        "retry(times: 4, callback: function () use ($order) {",
        "    return DB::transaction(fn () => $this->reserve($order));",
        "}, sleepMilliseconds: fn (int $attempt) => (2 ** $attempt) * 50 + random_int(0, 50),",
        "   when: fn (Throwable $e) => $e instanceof QueryException && in_array($e->getCode(), ['40001', '40P01']));",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Serializatsiya va deadlock xatolari uchun backoff + jitter'li retry helper yozing va testlang.",
      acceptanceCriteria: [
        "Qaysi xatolar qayta urinishga loyiq ekanini ajrata oladi",
        "Backoff va jitter maqsadini tushuntira oladi"
      ],
      prerequisites: [
        "17.12"
      ]
    },
    {
      id: "17.14",
      title: "Transaction Boundaries",
      description: [
        "Tranzaksiya chegarasi — qaysi amallar birga atomik bo'lishi kerak. Qoida: bitta biznes amal (use case) = bitta tranzaksiya; u application service/action darajasida boshlanadi, repository yoki model ichida emas. Chegara imkon qadar tor: faqat DB yozuvlari, hisob-kitob va validatsiya undan oldin.",
        "",
        "Chegaradan tashqarida bo'lishi kerak: email, push, tashqi API, fayl yuklash, navbatga job — ular commit'dan keyin (`afterCommit`, outbox). Juda keng chegara — uzoq lock'lar; juda tor — qisman saqlangan holat.",
        "",
        "```php",
        "final class PlaceOrder",
        "{",
        "    public function handle(Cart $cart): Order",
        "    {",
        "        $this->validateStock($cart);                    // tranzaksiyadan oldin",
        "        $order = DB::transaction(fn () => $this->persist($cart));",
        "        OrderPlaced::dispatch($order);                   // keyin",
        "        return $order;",
        "    }",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Bitta use case'ning tranzaksiya chegarasini belgilang va undan tashqariga chiqishi kerak bo'lgan amallarni ko'chiring.",
      acceptanceCriteria: [
        "Tranzaksiyani use case darajasida boshlaydi",
        "Tranzaksiya ichiga nimalar kirmasligi kerakligini biladi"
      ],
      prerequisites: [
        "17.3"
      ]
    },
    {
      id: "17.15",
      title: "Long-Running Transactions",
      description: [
        "Uzoq tranzaksiyalar xavflari: lock'larni uzoq ushlab turadi (boshqa so'rovlar navbatda), MVCC tozalashni bloklaydi (MySQL undo/history list o'sadi, PostgreSQL VACUUM ishlamaydi va bloat), replikatsiyani kechiktiradi, rollback ham uzoq davom etadi, ulanish uzilsa katta ish yo'qoladi.",
        "",
        "Sabablari: tranzaksiya ichida tashqi chaqiruv, foydalanuvchini kutish, katta batch'lar, \"unutilgan\" ochiq tranzaksiya (`idle in transaction`). Yechim: bo'laklarga bo'lish (har bo'lak alohida tranzaksiya), `idle_in_transaction_session_timeout`, monitoring.",
        "",
        "```sql",
        "-- PostgreSQL: uzoq ochiq tranzaksiyalar",
        "SELECT pid, now() - xact_start AS duration, state, left(query, 60)",
        "FROM pg_stat_activity WHERE xact_start IS NOT NULL ORDER BY duration DESC LIMIT 5;",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Bitta katta tranzaksiyali importni bo'laklab commit qilinadigan qilib qayta yozing va idempotentligini ta'minlang.",
      acceptanceCriteria: [
        "Uzoq tranzaksiyaning MVCC va lock'larga ta'sirini biladi",
        "Uzoq tranzaksiyalarni monitoring qiladi"
      ],
      prerequisites: [
        "10.13",
        "11.10"
      ]
    },
    {
      id: "17.16",
      title: "External API Calls inside Transactions",
      description: [
        "Tranzaksiya ichida tashqi HTTP chaqiruv — klassik xato: (1) tarmoq sekin bo'lsa tranzaksiya va lock'lar uzoq ushlanadi; (2) API muvaffaqiyatli, keyin DB rollback — tashqi tizimda amal bajarilgan, bizda yozuv yo'q (masalan, pul yechilgan, buyurtma yo'q); (3) aksincha ham bo'lishi mumkin.",
        "",
        "To'g'ri yondashuvlar: avval lokal yozuvni \"pending\" holatda commit qilish → tashqi chaqiruv → natijani alohida tranzaksiyada saqlash; idempotency key bilan qayta urinish; outbox pattern; kompensatsiya amallari (refund). Holat mashinasi barcha oraliq holatlarni aniq qiladi.",
        "",
        "```php",
        "$payment = Payment::create(['order_id' => $order->id, 'status' => 'pending', 'idempotency_key' => Str::uuid()]);",
        "$result = $gateway->charge($order->total, idempotencyKey: $payment->idempotency_key); // tranzaksiyadan tashqarida",
        "DB::transaction(fn () => $payment->markAs($result->status));",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Tranzaksiya ichida to'lov API'si chaqirilgan kodni pending → chaqiruv → yakunlash oqimiga o'tkazing.",
      acceptanceCriteria: [
        "Tashqi chaqiruvning ikki xil xavfini tushuntira oladi",
        "Oraliq holatlar va kompensatsiya bilan dizayn qiladi"
      ],
      prerequisites: [
        "17.14",
        "17.17"
      ]
    },
    {
      id: "17.17",
      title: "Idempotency",
      description: [
        "Idempotent amal bir necha marta bajarilsa ham natija bir martadagidek bo'ladi. Taqsimlangan tizimlarda takrorlanish muqarrar: foydalanuvchi tugmani ikki marta bosadi, tarmoq timeout'dan keyin mijoz qayta yuboradi, navbat job'ni qayta yetkazadi, webhook takrorlanadi.",
        "",
        "Usullar: idempotency key (mijoz yuboradi, server natijani kalit bo'yicha saqlaydi va qayta so'rovda o'shani qaytaradi), unique constraint (`external_id`), holat tekshiruvi (`if ($order->isPaid()) return;`), upsert, \"processed events\" jadvali. Kalit va natija bitta tranzaksiyada saqlanishi kerak.",
        "",
        "```php",
        "$existing = IdempotencyRecord::where('key', $request->header('Idempotency-Key'))->first();",
        "if ($existing) {",
        "    return response()->json($existing->response, $existing->status);",
        "}",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "To'lov yaratish endpoint'iga `Idempotency-Key` header qo'llab-quvvatlashini qo'shing va takroriy so'rovlarni testlang.",
      acceptanceCriteria: [
        "Takrorlanish manbalarini biladi",
        "Idempotentlikni ta'minlashning 3+ usulini qo'llay oladi"
      ],
      prerequisites: [
        "17.14"
      ]
    },
    {
      id: "17.18",
      title: "Transactional Outbox Pattern",
      description: [
        "Muammo: DB'ga yozish va xabarni (event, job) broker'ga yuborish atomik emas — biri muvaffaqiyatli, ikkinchisi yo'q bo'lishi mumkin (\"dual write\"). Outbox: xabar asosiy ma'lumot bilan **bir tranzaksiyada** `outbox` jadvaliga yoziladi; alohida relay jarayon jadvalni o'qib, broker'ga yuboradi va yuborilgan deb belgilaydi.",
        "",
        "Kafolat: at-least-once yetkazish — iste'molchilar idempotent bo'lishi kerak. Relay: polling (sodda) yoki CDC (Debezium — binlog/WAL'dan). Laravel'da `afterCommit` ko'p holatda yetarli, lekin jarayon commit va dispatch orasida qulasa xabar yo'qoladi — outbox bu oraliqni yopadi.",
        "",
        "```php",
        "DB::transaction(function () use ($order) {",
        "    $order->save();",
        "    Outbox::create(['type' => 'order.paid', 'payload' => ['id' => $order->id]]);",
        "});",
        "// Relay (scheduler har soniya): Outbox::whereNull('sent_at')->lazyById()->each(...)",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Outbox jadvali va relay buyrug'ini yozing; relay'ni o'rtada to'xtatib, xabar yo'qolmasligini isbotlang.",
      acceptanceCriteria: [
        "Dual write muammosini tushuntira oladi",
        "Outbox at-least-once ekanini va idempotent iste'molchi zarurligini biladi"
      ],
      prerequisites: [
        "17.17",
        "48.12"
      ]
    },
    {
      id: "17.19",
      title: "Consistency in Distributed Systems",
      description: [
        "Bir nechta servis yoki DB ishtirok etganda ACID tranzaksiya yo'q. Variantlar: **2PC** (two-phase commit — kuchli izchillik, lekin sekin, mo'rt, koordinator yagona nosozlik nuqtasi — kam ishlatiladi), **Saga** (har servis lokal tranzaksiya, xatoda kompensatsiya amallari; orkestratsiya yoki xoreografiya), **eventual consistency** (vaqt o'tib izchil bo'ladi).",
        "",
        "CAP/PACELC: tarmoq bo'linishida izchillik va mavjudlik orasida tanlov. Amaliy vositalar: outbox, idempotent iste'molchilar, holat mashinalari, moslashtirish (reconciliation) job'lari, foydalanuvchiga oraliq holatlarni ko'rsatish (\"to'lov tekshirilmoqda\").",
        "",
        "```text",
        "Saga: CreateOrder → ReserveStock → ChargePayment",
        "      xato bo'lsa: RefundPayment ← ReleaseStock ← CancelOrder",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Buyurtma–zaxira–to'lov oqimi uchun saga'ni kompensatsiya amallari bilan loyihalang va diagramma chizing.",
      acceptanceCriteria: [
        "2PC va Saga farqini va narxini biladi",
        "Eventual consistency'ni foydalanuvchi tajribasi bilan bog'laydi"
      ],
      prerequisites: [
        "17.18",
        "65.12"
      ]
    }
  ]
});
