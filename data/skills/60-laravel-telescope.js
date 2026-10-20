/* 60 · Laravel Telescope
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 60,
  slug: "laravel-telescope",
  title: "Laravel Telescope",
  group: "observability",
  description: "Laravel Telescope — Laravel ilovasi uchun debug assistent: so'rovlar, exception'lar, log'lar, DB so'rovlari, job'lar, event'lar, mail, bildirishnomalar, kesh va boshqalarni yozib, qulay interfeysda ko'rsatadi. U lokal ishlab chiqishda juda kuchli vosita, lekin production'da jiddiy xavf va resurs sarfi bilan bog'liq. Senior dasturchi Telescope'ni samarali ishlatadi va to'g'ri cheklaydi.",
  subskills: [
    {
      id: "60.1",
      title: "Request Monitoring",
      description: [
        "Requests watcher har HTTP so'rovni yozadi: metod, URL, status, davomiylik, xotira, header'lar, payload, session, javob, autentifikatsiyalangan foydalanuvchi, shu so'rov ichida bajarilgan so'rovlar, event'lar, job'lar va boshqa yozuvlar (bog'langan). Bitta so'rovning to'liq rasmini ko'rish — debug uchun juda qulay.",
        "",
        "Sozlamalar: `size_limit` (javob hajmi), `ignore_http_methods`, `ignore_status_codes`; sezgir header va parametrlar `Telescope::hideRequestHeaders()`/`hideRequestParameters()` bilan yashiriladi.",
        "",
        "```php",
        "// TelescopeServiceProvider",
        "Telescope::hideRequestParameters(['_token', 'password', 'password_confirmation', 'card_number']);",
        "Telescope::hideRequestHeaders(['cookie', 'x-csrf-token', 'x-xsrf-token', 'authorization']);",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Telescope'ni o'rnatib, bitta murakkab so'rovning barcha bog'liq yozuvlarini tahlil qiling va sezgir maydonlarni yashiring.",
      acceptanceCriteria: [
        "Requests watcher imkoniyatlarini biladi",
        "Sezgir header va parametrlarni yashiradi"
      ],
      prerequisites: [
        "56.7"
      ]
    },
    {
      id: "60.2",
      title: "Exceptions",
      description: [
        "Exceptions watcher — report qilingan exception'larni stack trace, kod konteksti va qaysi so'rov/job'da yuz bergani bilan yozadi; bir xil exception'lar guruhlanadi. Lokal muhitda xatolarni tez ko'rish va so'rov kontekstiga o'tish uchun qulay.",
        "",
        "Production'da xatolarni kuzatish uchun Sentry kabi maxsus vosita yaxshiroq (alert'lar, relizlar, guruhlash, maxfiylik). Telescope — lokal/staging debug uchun.",
        "",
        "```php",
        "// config/telescope.php",
        "Watchers\\ExceptionWatcher::class => env('TELESCOPE_EXCEPTION_WATCHER', true),",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Telescope'da exception va uni keltirib chiqargan so'rovni bog'lab tahlil qiling.",
      acceptanceCriteria: [
        "Exceptions watcher'ni ishlatadi",
        "Telescope va Sentry'ning rollarini farqlaydi"
      ],
      prerequisites: [
        "60.1"
      ]
    },
    {
      id: "60.3",
      title: "Logs",
      description: [
        "Log watcher — ilovaning log yozuvlarini (daraja, xabar, kontekst) yozadi va ularni so'rov yoki job bilan bog'laydi — log faylni qidirmasdan, aynan shu so'rov ichidagi log'larni ko'rish. Minimal daraja sozlanadi (`level` — masalan, faqat `warning` va yuqori).",
        "",
        "Lokal ishlab chiqishda `Log::debug()` bilan kod oqimini kuzatish va tegishli so'rov kontekstini ko'rish uchun qulay.",
        "",
        "```php",
        "Watchers\\LogWatcher::class => [",
        "    'enabled' => env('TELESCOPE_LOG_WATCHER', true),",
        "    'level' => 'debug',",
        "],",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Debug log'lar bilan kod oqimini kuzatib, ularni Telescope'da tegishli so'rov ichida ko'ring.",
      acceptanceCriteria: [
        "Log watcher va daraja sozlamasini biladi",
        "Log'larni so'rov konteksti bilan tahlil qiladi"
      ],
      prerequisites: [
        "58.1"
      ]
    },
    {
      id: "60.4",
      title: "Database Queries",
      description: [
        "Queries watcher — har SQL so'rovini bindings, davomiylik va qaysi kod qatoridan chaqirilgani bilan yozadi; so'rov ichida guruhlab ko'rsatadi. Lokal ishlab chiqishda N+1 va keraksiz so'rovlarni topishning eng oson yo'li: bitta sahifa uchun 80 ta so'rov — darhol ko'rinadi.",
        "",
        "`slow` sozlamasi — shu ms dan uzun so'rovlarni \"slow\" deb belgilash. Takroriy (dublikat) so'rovlar naqshlarini ko'rish.",
        "",
        "```php",
        "Watchers\\QueryWatcher::class => [",
        "    'enabled' => env('TELESCOPE_QUERY_WATCHER', true),",
        "    'ignore_packages' => true,",
        "    'slow' => 100,",
        "],",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Telescope'da eng ko'p so'rov qilayotgan sahifani topib, takroriy so'rovlarni eager loading bilan kamaytiring.",
      acceptanceCriteria: [
        "Queries watcher bilan so'rovlarni tahlil qiladi",
        "N+1 ni Telescope'da taniydi"
      ],
      prerequisites: [
        "13.12"
      ]
    },
    {
      id: "60.5",
      title: "Slow Queries",
      description: [
        "Sekin so'rovlar — `slow` chegarasidan oshganlar Telescope'da alohida belgilanadi va teg bilan (`slow`) filtrlanadi. Lokal/staging'da ma'lumot hajmi kichik bo'lsa, sekin so'rovlar kam ko'rinadi — realistik ma'lumot (seed) bilan sinash muhim.",
        "",
        "Topilgan sekin so'rov uchun: kod qatori (Telescope ko'rsatadi) → SQL'ni olish → `EXPLAIN` → indeks yoki so'rovni qayta yozish. Production'da sekin so'rovlar uchun DB slow log va APM.",
        "",
        "```php",
        "Watchers\\QueryWatcher::class => ['enabled' => true, 'slow' => 50],",
        "// Telescope UI: Queries → filtr: tag \"slow\"",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Realistik seed ma'lumot bilan Telescope'da sekin so'rovlarni topib, EXPLAIN bilan optimallashtiring.",
      acceptanceCriteria: [
        "Sekin so'rovlarni Telescope'da filtrlaydi",
        "Realistik ma'lumot zarurligini tushunadi"
      ],
      prerequisites: [
        "60.4"
      ]
    },
    {
      id: "60.6",
      title: "Jobs",
      description: [
        "Jobs watcher — dispatch qilingan job'lar: navbat, connection, holat (pending, processed, failed), payload, urinishlar, exception, davomiylik va job ichida bajarilgan so'rovlar/log'lar. Job qayerdan dispatch qilinganini (qaysi so'rov) ko'rish mumkin.",
        "",
        "Lokal ishlab chiqishda `QUEUE_CONNECTION=sync` yoki haqiqiy worker bilan job oqimini tushunish va debug qilish uchun qulay. Production navbat monitoringi — Horizon.",
        "",
        "```php",
        "Watchers\\JobWatcher::class => env('TELESCOPE_JOB_WATCHER', true),",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Job zanjirini (dispatch → bajarilish → ichki so'rovlar) Telescope'da kuzatib, xatoli job'ni tahlil qiling.",
      acceptanceCriteria: [
        "Jobs watcher ma'lumotlarini biladi",
        "Telescope va Horizon rollarini farqlaydi"
      ],
      prerequisites: [
        "46.5"
      ]
    },
    {
      id: "60.7",
      title: "Queue Monitoring",
      description: [
        "Telescope navbatlarni jonli monitoring qilish uchun emas (Horizon vazifasi), lekin job'lar tarixini, ularning payload'larini va xatolarini lokal/staging'da ko'rish uchun foydali: \"bu job nega ikki marta ishladi?\", \"qaysi payload bilan yiqildi?\". Batch'lar ham yoziladi (Batch watcher).",
        "",
        "Horizon (Redis navbatlari uchun metrikalar, throughput, wait time) va Telescope (individual job tafsilotlari) birga ishlatilishi mumkin.",
        "",
        "```php",
        "Watchers\\BatchWatcher::class => env('TELESCOPE_BATCH_WATCHER', true),",
        "```"
      ],
      priority: "optional",
      level: "Junior",
      practicalTask: "Batch'ni Telescope'da kuzatib, uning job'lari va xatolarini tahlil qiling.",
      acceptanceCriteria: [
        "Telescope'ning navbat bilan bog'liq imkoniyatlarini biladi",
        "Horizon bilan birga qo'llaydi"
      ],
      prerequisites: [
        "60.6"
      ]
    },
    {
      id: "60.8",
      title: "Events",
      description: [
        "Events watcher — dispatch qilingan event'lar, ularning payload'i va qaysi listener'lar ularni tingladi (sinxron va navbatdagi). \"Bu event'ga kim reaksiya qiladi?\", \"nega email ikki marta ketdi?\" kabi savollarga javob — event oqimini ko'rish.",
        "",
        "Framework ichki event'lari default'da yashiriladi (`ignore` ro'yxati) — shovqinni kamaytirish uchun.",
        "",
        "```php",
        "Watchers\\EventWatcher::class => [",
        "    'enabled' => env('TELESCOPE_EVENT_WATCHER', true),",
        "    'ignore' => [],",
        "],",
        "```"
      ],
      priority: "optional",
      level: "Junior",
      practicalTask: "Bir biznes amalidan keyin dispatch qilingan event'lar va listener'lar zanjirini Telescope'da tahlil qiling.",
      acceptanceCriteria: [
        "Events watcher bilan event oqimini kuzatadi",
        "Listener'larni topadi"
      ],
      prerequisites: [
        "2.20"
      ]
    },
    {
      id: "60.9",
      title: "Notifications",
      description: [
        "Notifications watcher — yuborilgan bildirishnomalar: qaysi notifiable'ga (foydalanuvchi), qaysi kanallar orqali (mail, database, sms, telegram), qaysi notification class, navbatga qo'yilganmi. Lokal muhitda bildirishnomalar mantiqini (kimga va qaysi kanalda) tekshirish uchun.",
        "",
        "Haqiqiy yuborishsiz (lokal mail driver yoki log) ham Telescope bildirishnoma niyatini ko'rsatadi.",
        "",
        "```php",
        "Watchers\\NotificationWatcher::class => env('TELESCOPE_NOTIFICATION_WATCHER', true),",
        "```"
      ],
      priority: "optional",
      level: "Junior",
      practicalTask: "Foydalanuvchi sozlamalariga qarab kanal tanlovchi notification'ni Telescope orqali tekshiring.",
      acceptanceCriteria: [
        "Notifications watcher'ni ishlatadi",
        "Kanal tanlash mantiqini tekshiradi"
      ],
      prerequisites: [
        "2.21"
      ]
    },
    {
      id: "60.10",
      title: "Mail",
      description: [
        "Mail watcher — yuborilgan email'larning to'liq ko'rinishi (HTML preview), mavzu, qabul qiluvchilar, biriktirmalar; `.eml` faylni yuklab olish. Lokal ishlab chiqishda email shablonlarini ko'rish va tekshirish uchun qulay (Mailpit bilan birga yoki uning o'rniga).",
        "",
        "Production'da emas — email mazmuni shaxsiy ma'lumot o'z ichiga oladi.",
        "",
        "```php",
        "Watchers\\MailWatcher::class => env('TELESCOPE_MAIL_WATCHER', true),",
        "```"
      ],
      priority: "optional",
      level: "Junior",
      practicalTask: "Hisob-faktura email'ini Telescope'da preview qilib, shablon va biriktirmani tekshiring.",
      acceptanceCriteria: [
        "Mail watcher imkoniyatlarini biladi",
        "Email mazmunining maxfiyligini hisobga oladi"
      ],
      prerequisites: [
        "2.21"
      ]
    },
    {
      id: "60.11",
      title: "Cache Operations",
      description: [
        "Cache watcher — kesh operatsiyalari: hit, miss, set, forget, kalit va (ixtiyoriy) qiymat, TTL. Keshlash mantiqini tekshirish: \"bu kalit haqiqatan keshdan olinyaptimi?\", \"nega har so'rovda miss?\", \"invalidatsiya ishlayaptimi?\".",
        "",
        "Lokal muhitda kesh kalitlari dizaynini va hit/miss naqshini ko'rish uchun qulay; kesh qiymatlari katta bo'lsa — hajm.",
        "",
        "```php",
        "Watchers\\CacheWatcher::class => [",
        "    'enabled' => env('TELESCOPE_CACHE_WATCHER', true),",
        "    'hidden' => [],",
        "],",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Kesh qo'shilgan endpoint'da Telescope orqali birinchi miss va keyingi hit'larni, invalidatsiyadan keyingi miss'ni tasdiqlang.",
      acceptanceCriteria: [
        "Cache watcher bilan keshlash mantiqini tekshiradi",
        "Hit/miss naqshlarini talqin qiladi"
      ],
      prerequisites: [
        "54.1"
      ]
    },
    {
      id: "60.12",
      title: "Scheduled Tasks",
      description: [
        "Schedule watcher — scheduler tomonidan ishga tushirilgan vazifalar: buyruq, cron ifodasi, vaqt zonasi, natija (chiqish). `php artisan schedule:run`/`schedule:work` lokal muhitda vazifalar to'g'ri vaqtda va kutilganday ishlayotganini tekshirish uchun.",
        "",
        "Production'da rejali vazifalarni monitoring qilish — heartbeat (healthchecks.io), Sentry Cron Monitors yoki `pingOnSuccess`.",
        "",
        "```php",
        "Watchers\\ScheduleWatcher::class => env('TELESCOPE_SCHEDULE_WATCHER', true),",
        "```",
        "```bash",
        "php artisan schedule:work   # lokal",
        "```"
      ],
      priority: "optional",
      level: "Junior",
      practicalTask: "Lokal muhitda scheduler'ni ishga tushirib, Telescope'da vazifalar natijalarini tekshiring.",
      acceptanceCriteria: [
        "Schedule watcher'ni ishlatadi",
        "Production scheduler monitoringi uchun boshqa vositalarni biladi"
      ],
      prerequisites: [
        "2.19"
      ]
    },
    {
      id: "60.13",
      title: "Gate Checks",
      description: [
        "Gate watcher — avtorizatsiya tekshiruvlari: qaysi ability, qaysi foydalanuvchi, natija (allowed/denied) va argumentlar. \"Nega foydalanuvchi bu tugmani ko'rmayapti?\", \"qaysi policy metodi rad etdi?\" — avtorizatsiya debug'i uchun juda foydali.",
        "",
        "Ro'yxat sahifalarida har element uchun policy tekshiruvlari ko'p bo'lsa — Telescope ularni ko'rsatadi (performance muammosi belgisi bo'lishi mumkin).",
        "",
        "```php",
        "Watchers\\GateWatcher::class => [",
        "    'enabled' => env('TELESCOPE_GATE_WATCHER', true),",
        "    'ignore_abilities' => [],",
        "    'ignore_packages' => true,",
        "],",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Kutilmaganda rad etilgan avtorizatsiyani Gate watcher orqali tashxislab, policy'ni tuzating.",
      acceptanceCriteria: [
        "Gate watcher bilan avtorizatsiyani debug qiladi",
        "Ko'p policy tekshiruvlarini performance signali sifatida taniydi"
      ],
      prerequisites: [
        "2.15"
      ]
    },
    {
      id: "60.14",
      title: "Dump Watcher",
      description: [
        "Dump watcher — `dump()` chaqiruvlari natijasini brauzer sahifasini buzmasdan Telescope'ning Dumps sahifasida ko'rsatadi (Telescope'da Dumps sahifasi ochiq bo'lganda). API va AJAX so'rovlarida `dump()` javobni buzmaydi.",
        "",
        "Debug kodi commit qilinmasligi kerak — Pest arch testi (`->not->toBeUsed()`) bilan `dd`, `dump`, `ray` ni taqiqlash.",
        "",
        "```php",
        "dump($cart->toArray());   // Telescope → Dumps",
        "// tests/ArchTest.php",
        "arch()->expect(['dd', 'dump', 'ray'])->not->toBeUsed();",
        "```"
      ],
      priority: "optional",
      level: "Junior",
      practicalTask: "API so'rovida `dump()` natijasini Telescope'da ko'ring va arch test bilan commit qilinishini taqiqlang.",
      acceptanceCriteria: [
        "Dump watcher'ni ishlatadi",
        "Debug kodini avtomatik taqiqlaydi"
      ],
      prerequisites: [
        "26.8"
      ]
    },
    {
      id: "60.15",
      title: "Entry Filtering",
      description: [
        "Filtrlash — qaysi yozuvlar saqlanadi: `Telescope::filter(fn (IncomingEntry $entry) => ...)` — masalan, lokal muhitda hammasi, staging'da faqat xatolar, sekin so'rovlar, failed job'lar va muayyan teglar. `Telescope::filterBatch()` — butun so'rov yozuvlarini birga. Teglar (`Telescope::tag()`) — custom teglar bilan yozuvlarni guruhlash (tenant, foydalanuvchi).",
        "",
        "Filtrlash saqlash hajmini va performance ta'sirini keskin kamaytiradi.",
        "",
        "```php",
        "Telescope::filter(function (IncomingEntry $entry) {",
        "    if ($this->app->environment('local')) {",
        "        return true;",
        "    }",
        "    return $entry->isReportableException()",
        "        || $entry->isFailedRequest()",
        "        || $entry->isFailedJob()",
        "        || $entry->isSlowQuery()",
        "        || $entry->hasMonitoredTag();",
        "});",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Staging uchun faqat muhim yozuvlarni saqlovchi filtr va tenant teglarini sozlang.",
      acceptanceCriteria: [
        "Filtr va teglar mexanizmini biladi",
        "Saqlash hajmini muhitga qarab nazorat qiladi"
      ],
      prerequisites: [
        "60.1"
      ]
    },
    {
      id: "60.16",
      title: "Data Pruning",
      description: [
        "Telescope yozuvlari DB'da (`telescope_entries` va bog'liq jadvallar) juda tez o'sadi — har so'rov o'nlab yozuv. `php artisan telescope:prune --hours=48` scheduler'da kunlik — eski yozuvlarni o'chirish; `telescope:clear` — hammasini. Pruning bo'lmasa — DB hajmi o'sadi, so'rovlar sekinlashadi.",
        "",
        "Telescope uchun alohida DB connection (`TELESCOPE_DB_CONNECTION`) — asosiy DB'ni yuklamaslik uchun.",
        "",
        "```php",
        "Schedule::command('telescope:prune --hours=48')->daily();",
        "```",
        "```env",
        "TELESCOPE_DB_CONNECTION=telescope",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Telescope uchun kunlik pruning va alohida DB connection sozlang, jadval hajmini kuzating.",
      acceptanceCriteria: [
        "Pruning zaruratini biladi",
        "Telescope'ni alohida DB'ga ajratadi"
      ],
      prerequisites: [
        "60.1"
      ]
    },
    {
      id: "60.17",
      title: "Access Control",
      description: [
        "Telescope dashboard'i juda sezgir ma'lumotni ko'rsatadi (so'rovlar, payload'lar, SQL bindings, email'lar, session) — kirish qat'iy cheklanishi kerak. `viewTelescope` gate (`TelescopeServiceProvider::gate()`) — default faqat `local` muhitda ochiq; boshqa muhitlarda faqat ruxsatli foydalanuvchilar (admin/devops), qo'shimcha: IP cheklovi, VPN, yo'lni o'zgartirish.",
        "",
        "Tekshirish: autentifikatsiyasiz va oddiy foydalanuvchi bilan `/telescope` — 403.",
        "",
        "```php",
        "protected function gate(): void",
        "{",
        "    Gate::define('viewTelescope', fn (User $user) => in_array($user->email, config('telescope.allowed_emails'), true));",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Telescope gate'ini sozlab, ruxsatsiz foydalanuvchi uchun 403 qaytishini testlang.",
      acceptanceCriteria: [
        "Telescope gate mexanizmini biladi",
        "Dashboard'dagi ma'lumot sezgirligini tushunadi"
      ],
      prerequisites: [
        "2.15"
      ]
    },
    {
      id: "60.18",
      title: "Production Exposure Risks",
      description: [
        "Telescope production'da xavfli: ochiq dashboard (gate noto'g'ri sozlangan) — barcha so'rovlar, parollar (yashirilmagan bo'lsa), token'lar, shaxsiy ma'lumotlar oshkor; performance — har so'rov uchun ko'p DB yozuvi; DB hajmi tez o'sadi; xotira.",
        "",
        "Tavsiya: Telescope'ni `require-dev` da saqlash va faqat lokal muhitda ro'yxatga olish (provider'ni shartli register qilish); production'da kerak bo'lsa — qat'iy filtr (faqat xatolar), sampling, alohida DB, qat'iy gate, qisqa saqlash. Production monitoringi uchun — Sentry, APM, Pulse.",
        "",
        "```php",
        "// AppServiceProvider::register()",
        "if ($this->app->environment('local') && class_exists(\\Laravel\\Telescope\\TelescopeServiceProvider::class)) {",
        "    $this->app->register(\\Laravel\\Telescope\\TelescopeServiceProvider::class);",
        "    $this->app->register(TelescopeServiceProvider::class);",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Telescope'ni faqat lokal muhitda yuklanadigan qilib sozlang va production'da `/telescope` mavjud emasligini tekshiring.",
      acceptanceCriteria: [
        "Telescope'ning production xavflarini biladi",
        "Uni dev dependency va shartli provider sifatida sozlaydi"
      ],
      prerequisites: [
        "7.8"
      ]
    },
    {
      id: "60.19",
      title: "Sensitive Data Protection",
      description: [
        "Telescope'da sezgir ma'lumotlarni himoyalash: `hideRequestParameters()` (parol, token, karta), `hideRequestHeaders()` (cookie, authorization, CSRF), `hideResponseParameters()`, model `$hidden` (model yozuvlarida), Cache watcher'da `hidden` kalitlar, Mail watcher'ni production'da o'chirish, filtr bilan sezgir route'larni (`/payments/*`) yozmaslik.",
        "",
        "Telescope DB'si ham himoyalangan bo'lishi kerak (backup'larda ham sezgir ma'lumot), qisqa saqlash muddati.",
        "",
        "```php",
        "Telescope::hideRequestParameters(['password', 'password_confirmation', 'token', 'card_number', 'cvv']);",
        "Telescope::hideRequestHeaders(['authorization', 'cookie', 'x-xsrf-token']);",
        "Telescope::hideResponseParameters(['access_token', 'refresh_token']);",
        "Telescope::filter(fn (IncomingEntry $e) => ! str_starts_with($e->content['uri'] ?? '', '/api/payments'));",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Telescope yozuvlarini sezgir ma'lumotlar bo'yicha audit qilib, yashirish va filtr qoidalarini qo'shing.",
      acceptanceCriteria: [
        "Telescope'dagi sezgir ma'lumot manbalarini biladi",
        "Yashirish va filtrlash bilan himoyalaydi"
      ],
      prerequisites: [
        "58.7"
      ]
    }
  ]
});
