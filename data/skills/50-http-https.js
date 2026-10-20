/* 50 · HTTP/HTTPS
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 50,
  slug: "http-https",
  title: "HTTP/HTTPS",
  group: "security",
  description: "HTTP — web va API'larning asosiy protokoli, HTTPS esa uning TLS bilan himoyalangan shakli. Senior backend dasturchi so'rov/javob modeli, metodlar va status kodlar semantikasi, header'lar, cookie va sessiyalar, keshlash, CORS, TLS va protokol versiyalarini chuqur tushunadi — bu bilim API dizayni, performance va xavfsizlik muammolarini hal qilishda zarur.",
  subskills: [
    {
      id: "50.1",
      title: "HTTP Request/Response Model",
      description: [
        "HTTP — mijoz-server, so'rov-javob protokoli, **stateless** (har so'rov mustaqil; holat cookie/token orqali). So'rov: start line (`GET /api/orders?page=2 HTTP/1.1`), header'lar, bo'sh qator, ixtiyoriy body. Javob: status line (`HTTP/1.1 200 OK`), header'lar, body.",
        "",
        "Transport: HTTP/1.1 va HTTP/2 — TCP ustida, HTTP/3 — QUIC (UDP). `curl -v` so'rov va javobni to'liq ko'rsatadi — HTTP'ni o'rganish va debug uchun asosiy vosita.",
        "",
        "```http",
        "POST /api/orders HTTP/1.1",
        "Host: api.example.uz",
        "Content-Type: application/json",
        "Authorization: Bearer 12|abc...",
        "",
        "{\"items\":[{\"sku\":\"A1\",\"qty\":2}]}",
        "```"
      ],
      priority: "core",
      level: "Foundation",
      practicalTask: "`curl -v` bilan API so'rovi yuborib, so'rov va javobning har qismini izohlang.",
      acceptanceCriteria: [
        "So'rov va javob tuzilmasini biladi",
        "Stateless tabiatini tushunadi"
      ],
      prerequisites: []
    },
    {
      id: "50.2",
      title: "HTTP Methods",
      description: [
        "Metodlar semantikasi: GET (o'qish), HEAD (faqat header'lar), POST (yaratish/amal), PUT (to'liq almashtirish), PATCH (qisman), DELETE (o'chirish), OPTIONS (imkoniyatlar, CORS preflight). Xususiyatlar: **safe** (holat o'zgarmaydi — GET, HEAD, OPTIONS), **idempotent** (bir necha marta = bir marta — GET, PUT, DELETE, HEAD, OPTIONS), **cacheable** (GET, HEAD).",
        "",
        "Bu xususiyatlar infratuzilma (proxy, kesh, brauzer prefetch, retry kutubxonalari) uchun va'da — ularni buzish (GET bilan o'chirish) kutilmagan xatolarga olib keladi.",
        "",
        "```text",
        "Metod   Safe  Idempotent  Body",
        "GET     ✓     ✓           yo'q",
        "POST    ✗     ✗           bor",
        "PUT     ✗     ✓           bor",
        "PATCH   ✗     ✗*          bor",
        "DELETE  ✗     ✓           ixtiyoriy",
        "```"
      ],
      priority: "core",
      level: "Foundation",
      practicalTask: "API endpoint'laridagi metodlar safe/idempotent semantikasiga mosligini tekshiring.",
      acceptanceCriteria: [
        "Safe va idempotent tushunchalarini biladi",
        "Metod semantikasining infratuzilma uchun ahamiyatini tushunadi"
      ],
      prerequisites: [
        "50.1"
      ]
    },
    {
      id: "50.3",
      title: "Status Codes",
      description: [
        "Status kod sinflari: **1xx** ma'lumot (`101 Switching Protocols` — WebSocket), **2xx** muvaffaqiyat (`200`, `201`, `202`, `204`, `206 Partial Content`), **3xx** yo'naltirish (`301` doimiy, `302`/`303` vaqtinchalik/See Other, `304 Not Modified`, `307`/`308` — metodni saqlovchi), **4xx** mijoz xatosi (`400`, `401`, `403`, `404`, `405`, `409`, `410`, `413`, `415`, `422`, `429`), **5xx** server xatosi (`500`, `502`, `503`, `504`).",
        "",
        "Muhim: 401 — autentifikatsiya kerak, 403 — ruxsat yo'q; 502/504 — proxy ortidagi backend muammosi; 503 + `Retry-After` — vaqtincha mavjud emas (texnik xizmat, ortiqcha yuklama).",
        "",
        "```bash",
        "curl -s -o /dev/null -w \"%{http_code}\\n\" https://app.example.uz/api/orders/999",
        "```"
      ],
      priority: "core",
      level: "Foundation",
      practicalTask: "Ilovangizda har bir status kod sinfi qaysi holatlarda qaytishini jadvalga yozing.",
      acceptanceCriteria: [
        "Asosiy status kodlarning ma'nosini biladi",
        "301/302/307/308 farqini tushunadi"
      ],
      prerequisites: [
        "50.1"
      ]
    },
    {
      id: "50.4",
      title: "Headers",
      description: [
        "Header turlari: so'rov (`Host`, `Accept`, `Authorization`, `User-Agent`, `Cookie`, `If-None-Match`), javob (`Content-Type`, `Set-Cookie`, `Location`, `Cache-Control`, `ETag`, `Retry-After`), umumiy (`Connection`, `Date`), entity (`Content-Length`, `Content-Encoding`). Header nomlari katta-kichik harfga sezgir emas (HTTP/2'da kichik harf).",
        "",
        "Proxy header'lari: `X-Forwarded-For`, `X-Forwarded-Proto`, standart `Forwarded`. Ularga faqat ishonchli proxy'lardan ishonish kerak (Laravel `TrustProxies`) — aks holda IP soxtalashtiriladi.",
        "",
        "```bash",
        "curl -sI https://app.example.uz | sed -n '1,15p'",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Ilova javobidagi barcha header'larni tahlil qilib, keraksiz (versiya oshkor qiluvchi) va yetishmayotgan (xavfsizlik) header'larni aniqlang.",
      acceptanceCriteria: [
        "Header turlarini va asosiylarini biladi",
        "Proxy header'lariga ishonish shartlarini tushunadi"
      ],
      prerequisites: [
        "50.1"
      ]
    },
    {
      id: "50.5",
      title: "Cookies",
      description: [
        "Cookie — server `Set-Cookie` bilan o'rnatadi, brauzer keyingi so'rovlarda `Cookie` header'ida yuboradi. Atributlar: `Expires`/`Max-Age`, `Domain` (subdomenlarga ulashish), `Path`, `Secure` (faqat HTTPS), `HttpOnly` (JS o'qiy olmaydi — XSS'dan himoya), `SameSite` (`Strict`, `Lax` — default, `None` + `Secure` — CSRF himoyasiga ta'sir qiladi), `Partitioned` (CHIPS).",
        "",
        "Laravel cookie'larni shifrlaydi (`EncryptCookies` middleware) va session cookie'sini boshqaradi. Cookie hajmi ~4 KB bilan cheklangan; har so'rovda yuboriladi — kichik saqlang.",
        "",
        "```http",
        "Set-Cookie: laravel_session=eyJpdi...; Path=/; Domain=.example.uz; Max-Age=7200; Secure; HttpOnly; SameSite=Lax",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Ilova cookie'larini atributlari bo'yicha audit qilib, xavfsiz bo'lmaganlarini tuzating.",
      acceptanceCriteria: [
        "Cookie atributlarining vazifasini biladi",
        "SameSite va CSRF bog'liqligini tushunadi"
      ],
      prerequisites: [
        "50.4"
      ]
    },
    {
      id: "50.6",
      title: "Sessions",
      description: [
        "HTTP stateless — session holatni saqlash mexanizmi: server session ID yaratadi (cookie'da), ma'lumot serverda (fayl, Redis, DB) yoki shifrlangan cookie'da. Laravel driver'lari: `file`, `database`, `redis`, `cookie`, `array`.",
        "",
        "Xavfsizlik: session fixation'ga qarshi login'dan keyin `regenerate()`, logout'da `invalidate()`, cookie `Secure`/`HttpOnly`/`SameSite`, muddat (`lifetime`, `expire_on_close`), ko'p serverda umumiy saqlash (Redis). Session'ga katta yoki sezgir ma'lumot qo'ymang.",
        "",
        "```php",
        "$request->session()->regenerate();           // login'dan keyin",
        "$request->session()->put('cart_id', $cart->id);",
        "$request->session()->flash('status', 'Saqlandi');",
        "Auth::logout(); $request->session()->invalidate(); $request->session()->regenerateToken();",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Session driver'ini Redis'ga o'tkazing va login/logout'da regenerate/invalidate to'g'ri ishlashini testlang.",
      acceptanceCriteria: [
        "Session mexanizmi va driver'larini biladi",
        "Session fixation himoyasini qo'llaydi"
      ],
      prerequisites: [
        "50.5"
      ]
    },
    {
      id: "50.7",
      title: "HTTP/1.1, HTTP/2 va HTTP/3",
      description: [
        "**HTTP/1.1** — matnli, har ulanishda bir vaqtda bitta so'rov (head-of-line blocking), keep-alive bilan ulanish qayta ishlatiladi, brauzerlar domen uchun ~6 ulanish ochadi. **HTTP/2** — binar, bitta TCP ulanishda multiplexing (parallel stream'lar), header siqish (HPACK), server push (eskirgan); TCP darajasida HOL blocking qoladi. **HTTP/3** — QUIC (UDP ustida): stream'lar mustaqil, tezroq ulanish (0-RTT/1-RTT), tarmoq almashganda ulanish saqlanadi.",
        "",
        "Amaliy: Nginx'da HTTP/2 yoqish (`http2 on`), HTTP/1.1 davridagi \"optimallashtirishlar\" (domen sharding, sprite'lar) HTTP/2'da keraksiz yoki zararli.",
        "",
        "```bash",
        "curl -sI --http2 https://app.example.uz | head -1     # HTTP/2 200",
        "curl -sI --http3 https://app.example.uz | head -1     # agar qo'llab-quvvatlansa",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Saytingiz qaysi HTTP versiyalarini qo'llab-quvvatlashini tekshiring va HTTP/2'ni yoqib, yuklanish vaqtini solishtiring.",
      acceptanceCriteria: [
        "Uch versiyaning asosiy farqlarini biladi",
        "HOL blocking tushunchasini tushuntira oladi"
      ],
      prerequisites: [
        "50.11"
      ]
    },
    {
      id: "50.8",
      title: "TLS Handshake",
      description: [
        "TLS handshake — xavfsiz kanal o'rnatish: mijoz qo'llab-quvvatlaydigan versiya va shifrlarni yuboradi (ClientHello, SNI — qaysi domen), server sertifikat va kalit almashish parametrlarini yuboradi, mijoz sertifikatni tekshiradi, ikkalasi umumiy sessiya kalitini hosil qiladi (ECDHE — forward secrecy). TLS 1.3 — 1 RTT (TLS 1.2'da 2 RTT), eskirgan shifrlar olib tashlangan, 0-RTT resumption.",
        "",
        "Kechikishga ta'siri: har yangi ulanishda handshake — keep-alive, session resumption, HTTP/2 (bitta ulanish) uni kamaytiradi.",
        "",
        "```bash",
        "openssl s_client -connect app.example.uz:443 -servername app.example.uz -tls1_3 </dev/null 2>/dev/null | grep -E \"Protocol|Cipher\"",
        "curl -w \"tls: %{time_appconnect}s\\n\" -o /dev/null -s https://app.example.uz",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "`openssl s_client` va `curl -w` bilan TLS versiyasi, shifr va handshake vaqtini o'lchang.",
      acceptanceCriteria: [
        "TLS handshake bosqichlarini biladi",
        "TLS 1.3 afzalliklarini tushunadi"
      ],
      prerequisites: [
        "50.9"
      ]
    },
    {
      id: "50.9",
      title: "Certificates",
      description: [
        "TLS sertifikat — domen (yoki tashkilot) va public kalitni bog'lovchi, CA tomonidan imzolangan hujjat. Zanjir: server sertifikati → oraliq (intermediate) CA → ishonchli root CA (brauzer/OS'da). Server to'liq zanjirni (`fullchain.pem`) berishi kerak — aks holda ba'zi mijozlarda xato.",
        "",
        "Turlari: DV (domen tasdig'i — Let's Encrypt, bepul, avtomatik), OV/EV; wildcard (`*.example.uz`), SAN (bir nechta domen). Muddat (Let's Encrypt — 90 kun, avtomatik yangilash shart), muddat monitoringi, private kalitni himoyalash.",
        "",
        "```bash",
        "echo | openssl s_client -connect app.example.uz:443 -servername app.example.uz 2>/dev/null | openssl x509 -noout -subject -issuer -dates",
        "certbot renew --dry-run",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Sertifikat zanjiri va muddatini tekshiring, avtomatik yangilanish va muddat monitoringini sozlang.",
      acceptanceCriteria: [
        "Sertifikat zanjirini tushunadi",
        "Sertifikat yangilanishi va monitoringini ta'minlaydi"
      ],
      prerequisites: [
        "41.9"
      ]
    },
    {
      id: "50.10",
      title: "DNS Resolution",
      description: [
        "DNS — domen nomini IP'ga aylantirish: rekursiv resolver → root → TLD (`.uz`) → avtoritativ server. Yozuvlar: `A`/`AAAA` (IP), `CNAME` (alias), `MX` (pochta), `TXT` (SPF, DKIM, DMARC, domen tasdig'i), `NS`, `CAA` (qaysi CA sertifikat bera oladi). TTL — keshlash muddati (migratsiyadan oldin TTL'ni kamaytiring).",
        "",
        "Muammolar: DNS o'zgarishi tarqalishi (TTL), noto'g'ri yozuvlar, DNS sekinligi (har so'rovda emas — keshlanadi; lekin PHP'da tashqi API chaqiruvlarida resolver kechikishi), email deliverability (SPF/DKIM/DMARC).",
        "",
        "```bash",
        "dig +short app.example.uz A",
        "dig example.uz TXT +short          # SPF, DMARC",
        "dig +trace app.example.uz",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Domeningizning DNS yozuvlarini audit qiling: email uchun SPF/DKIM/DMARC va CAA yozuvlarini tekshiring.",
      acceptanceCriteria: [
        "DNS hal qilish jarayoni va yozuv turlarini biladi",
        "TTL'ning migratsiyadagi rolini tushunadi"
      ],
      prerequisites: [
        "50.1"
      ]
    },
    {
      id: "50.11",
      title: "TCP Connections",
      description: [
        "HTTP/1.1 va HTTP/2 TCP ustida ishlaydi: ulanish o'rnatish — 3-way handshake (SYN, SYN-ACK, ACK — 1 RTT), keyin TLS handshake, keyin so'rov. Yopish — FIN/ACK, `TIME_WAIT` holati. Slow start — yangi ulanishda tezlik asta oshadi.",
        "",
        "Shuning uchun yangi ulanishlar qimmat: keep-alive, connection pooling (DB, Redis, HTTP client'larda), HTTP/2 multiplexing. Ko'p qisqa ulanishlar — `TIME_WAIT` lar to'planishi va portlar tugashi (yuqori yuklamali proxy'larda).",
        "",
        "```bash",
        "ss -tan state time-wait | wc -l",
        "ss -s",
        "curl -w \"connect: %{time_connect}s  tls: %{time_appconnect}s  ttfb: %{time_starttransfer}s\\n\" -o /dev/null -s https://api.example.uz/up",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Tashqi API'ga so'rovlarda ulanish, TLS va TTFB vaqtlarini o'lchab, keep-alive'ning ta'sirini ko'rsating.",
      acceptanceCriteria: [
        "TCP handshake va ulanish narxini biladi",
        "Keep-alive va pooling'ning ahamiyatini tushunadi"
      ],
      prerequisites: [
        "50.1"
      ]
    },
    {
      id: "50.12",
      title: "Keep-Alive",
      description: [
        "Keep-alive (persistent connections) — bitta TCP (+TLS) ulanishda bir nechta HTTP so'rov: handshake'lar takrorlanmaydi, kechikish kamayadi. HTTP/1.1'da default yoqiq; server tomonida `keepalive_timeout` va `keepalive_requests` (Nginx).",
        "",
        "PHP'da tashqi API'larga ko'p so'rov yuborganda — bir xil Guzzle client obyektini qayta ishlatish (ulanish pool'i saqlanadi); har so'rovda yangi client — har safar yangi ulanish. Nginx → upstream (Octane, boshqa servis) uchun `keepalive` direktivasi + `proxy_http_version 1.1`.",
        "",
        "```php",
        "// ✅ ulanishlar qayta ishlatiladi",
        "$client = Http::baseUrl('https://api.provider.uz')->timeout(5);",
        "foreach ($ids as $id) { $client->get(\"/items/{$id}\"); }",
        "// Parallel va bitta ulanish to'plami",
        "$responses = Http::pool(fn (Pool $p) => collect($ids)->map(fn ($id) => $p->get(\"https://api.provider.uz/items/{$id}\")));",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Tashqi API'ga 100 ta so'rovni yangi va qayta ishlatiladigan ulanish bilan yuborib, vaqtni solishtiring.",
      acceptanceCriteria: [
        "Keep-alive foydasini biladi",
        "PHP'da ulanishlarni qayta ishlatadi"
      ],
      prerequisites: [
        "50.11"
      ]
    },
    {
      id: "50.13",
      title: "Connection Timeouts",
      description: [
        "Timeout turlari: **connect timeout** (ulanish o'rnatish — tarmoq/DNS muammosi, qisqa: 2–5 s), **read/response timeout** (javobni kutish — server sekinligi), umumiy timeout. Timeout'siz tashqi chaqiruv — eng xavfli xatolardan biri: tashqi servis qotib qolsa, PHP-FPM worker'lari band bo'ladi va butun ilova to'xtaydi.",
        "",
        "Laravel HTTP client: `->connectTimeout(3)->timeout(10)`, `->retry(3, 200, throw: false)` (faqat idempotent so'rovlar uchun yoki idempotency key bilan). Timeout'lar zanjiri: mijoz < Nginx < PHP — ichkaridagisi kichikroq.",
        "",
        "```php",
        "$response = Http::connectTimeout(3)",
        "    ->timeout(10)",
        "    ->retry(2, 300, fn ($e) => $e instanceof ConnectionException)",
        "    ->get('https://api.provider.uz/rates');",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Loyihadagi barcha tashqi HTTP chaqiruvlariga connect va read timeout qo'shing va timeout'siz chaqiruvni taqiqlovchi qoida yozing.",
      acceptanceCriteria: [
        "Connect va read timeout farqini biladi",
        "Timeout'siz chaqiruv xavfini tushunadi"
      ],
      prerequisites: [
        "42.17"
      ]
    },
    {
      id: "50.14",
      title: "CORS",
      description: [
        "CORS (Cross-Origin Resource Sharing) — brauzer xavfsizlik mexanizmi: boshqa origin'dagi (sxema + domen + port) API'ga JS so'rovi faqat server ruxsat bersa javobni o'qishga imkon beradi. Oddiy so'rovlar va **preflight** (`OPTIONS` — murakkab so'rovlar: `PUT`, `DELETE`, JSON content-type, custom header'lar) — `Access-Control-Allow-Origin`, `-Methods`, `-Headers`, `-Credentials`, `-Max-Age`.",
        "",
        "CORS **server himoyasi emas** — u faqat brauzerga ta'sir qiladi (curl yoki server-server so'rovlarni to'xtatmaydi); avtorizatsiya baribir kerak. Credentials (cookie) bilan `*` ishlatib bo'lmaydi. Laravel: `config/cors.php`.",
        "",
        "```http",
        "OPTIONS /api/orders HTTP/1.1",
        "Origin: https://app.example.uz",
        "Access-Control-Request-Method: PATCH",
        "",
        "HTTP/1.1 204 No Content",
        "Access-Control-Allow-Origin: https://app.example.uz",
        "Access-Control-Allow-Methods: GET, POST, PATCH, DELETE",
        "Access-Control-Allow-Credentials: true",
        "Access-Control-Max-Age: 600",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "SPA uchun CORS'ni minimal ruxsatlar bilan sozlang va preflight javobini `curl` bilan tekshiring.",
      acceptanceCriteria: [
        "Preflight mexanizmini biladi",
        "CORS himoya vositasi emasligini tushunadi"
      ],
      prerequisites: [
        "23.10"
      ]
    },
    {
      id: "50.15",
      title: "Content Types",
      description: [
        "`Content-Type` — body formati: `application/json`, `application/x-www-form-urlencoded` (HTML forma), `multipart/form-data` (fayl yuklash), `text/html; charset=utf-8`, `application/pdf`, `application/problem+json` (xatolar), `text/csv`, `application/octet-stream`. `Accept` — mijoz qaysi formatni xohlaydi.",
        "",
        "Noto'g'ri `Content-Type` — server body'ni noto'g'ri talqin qiladi (Laravel JSON'ni faqat `application/json` bilan parse qiladi). Brauzer MIME sniffing'iga qarshi `X-Content-Type-Options: nosniff`. Fayl yuklashda MIME'ni mijoz header'iga emas, fayl mazmuniga qarab tekshiring.",
        "",
        "```bash",
        "curl -X POST https://api.example.uz/orders -H 'Content-Type: application/json' -d '{\"sku\":\"A1\"}'",
        "curl -F 'avatar=@me.jpg' https://api.example.uz/avatar     # multipart/form-data",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "API endpoint'larida qabul qilinadigan va qaytariladigan content type'larni hujjatlashtiring va noto'g'ri turga 415 qaytaring.",
      acceptanceCriteria: [
        "Asosiy content type'larni biladi",
        "MIME'ni xavfsiz tekshiradi"
      ],
      prerequisites: [
        "50.4"
      ]
    },
    {
      id: "50.16",
      title: "Compression",
      description: [
        "HTTP siqish: mijoz `Accept-Encoding: gzip, br, zstd` yuboradi, server siqib `Content-Encoding: br` bilan qaytaradi. JSON va HTML 70–90% kichrayadi — sekin mobil tarmoqlarda sezilarli tezlik. Odatda Nginx yoki CDN darajasida (41.15), PHP'da emas.",
        "",
        "Rasmlar, video va allaqachon siqilgan fayllarni qayta siqmaslik. `Vary: Accept-Encoding` — keshlar siqilgan va siqilmagan versiyalarni aralashtirmasligi uchun. BREACH hujumi: maxfiy token va foydalanuvchi kiritgan ma'lumot bir javobda siqilganda — nazariy xavf.",
        "",
        "```bash",
        "curl -s -H 'Accept-Encoding: br, gzip' -o /dev/null -w \"%{size_download} bytes\\n\" https://api.example.uz/products",
        "curl -s -o /dev/null -w \"%{size_download} bytes\\n\" https://api.example.uz/products",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "API javoblari uchun siqishni yoqib, javob hajmi va yuklanish vaqtini oldin/keyin solishtiring.",
      acceptanceCriteria: [
        "Siqish oqimini va header'larni biladi",
        "Qaysi kontentni siqish kerakligini tushunadi"
      ],
      prerequisites: [
        "41.15"
      ]
    },
    {
      id: "50.17",
      title: "Caching Headers",
      description: [
        "`Cache-Control` direktivalari: `max-age` (brauzer keshi soniyalarda), `s-maxage` (umumiy keshlar — CDN), `public`/`private` (faqat foydalanuvchi brauzerida — shaxsiy ma'lumot!), `no-cache` (keshlash mumkin, lekin har safar qayta tekshirish), `no-store` (umuman saqlamaslik — sezgir ma'lumot), `immutable`, `stale-while-revalidate`, `must-revalidate`. `Expires` — eski muqobil. `Vary` — kesh kaliti qaysi header'larga bog'liq.",
        "",
        "Strategiya: hash'li statik fayllar — `public, max-age=31536000, immutable`; HTML — `no-cache` + ETag; shaxsiy API javoblari — `private, no-store` yoki qisqa `private, max-age`.",
        "",
        "```php",
        "return response()->json($data)->header('Cache-Control', 'private, max-age=60');",
        "// yoki middleware",
        "Route::middleware('cache.headers:public;max_age=300;etag')->get('/api/categories', ...);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Statik fayllar, ommaviy va shaxsiy API javoblari uchun keshlash header'larini sozlab, CDN va brauzer xatti-harakatini tekshiring.",
      acceptanceCriteria: [
        "Asosiy Cache-Control direktivalarini biladi",
        "Shaxsiy ma'lumotni ommaviy keshdan himoyalaydi"
      ],
      prerequisites: [
        "54.15"
      ]
    },
    {
      id: "50.18",
      title: "ETags",
      description: [
        "ETag — resurs versiyasining identifikatori (mazmun hash'i yoki versiya). Server javobda `ETag: \"a1b2c3\"` beradi; mijoz keyingi so'rovda `If-None-Match: \"a1b2c3\"` yuboradi; o'zgarmagan bo'lsa server `304 Not Modified` (body'siz) qaytaradi — trafik tejaladi. Kuchli (`\"abc\"`) va kuchsiz (`W/\"abc\"`) ETag'lar.",
        "",
        "Optimistik konkurentlik uchun ham: `If-Match: \"a1b2c3\"` bilan `PUT`/`PATCH` — resurs o'zgargan bo'lsa `412 Precondition Failed` (lost update'ning oldini olish). Laravel `SetCacheHeaders` middleware `etag` opsiyasi bilan.",
        "",
        "```php",
        "$etag = md5($product->updated_at->timestamp.$product->id);",
        "if ($request->header('If-Match') && $request->header('If-Match') !== \"\\\"{$etag}\\\"\") {",
        "    abort(412, 'Resurs o\\'zgargan');",
        "}",
        "return (new ProductResource($product))->response()->setEtag($etag);",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Mahsulot endpoint'iga ETag qo'shing: GET uchun 304, PATCH uchun If-Match bilan 412 qaytarilishini testlang.",
      acceptanceCriteria: [
        "ETag'ning keshlash va konkurentlikdagi rolini biladi",
        "`If-None-Match` va `If-Match` farqini tushunadi"
      ],
      prerequisites: [
        "17.11"
      ]
    },
    {
      id: "50.19",
      title: "Conditional Requests",
      description: [
        "Shartli so'rovlar — resurs holatiga qarab bajariladi: `If-None-Match`/`If-Modified-Since` (o'zgarmagan bo'lsa 304 — keshni qayta tekshirish), `If-Match`/`If-Unmodified-Since` (faqat o'zgarmagan bo'lsa yangilash — 412 aks holda), `If-Range` (qisman yuklashni davom ettirish).",
        "",
        "`Last-Modified` + `If-Modified-Since` — soniya aniqligida, ETag aniqroq. Shartli so'rovlar trafikni tejaydi va \"oxirgi yozgan yutadi\" muammosini oldini oladi. Mobil ilovalar va sinxronizatsiya API'lari uchun ayniqsa foydali.",
        "",
        "```http",
        "GET /api/catalog HTTP/1.1",
        "If-Modified-Since: Sat, 01 Jun 2025 09:00:00 GMT",
        "",
        "HTTP/1.1 304 Not Modified",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Katalog endpoint'iga Last-Modified va If-Modified-Since qo'llab-quvvatlashini qo'shing.",
      acceptanceCriteria: [
        "Shartli so'rov header'larini biladi",
        "Ularni trafik tejash va konkurentlik uchun ishlatadi"
      ],
      prerequisites: [
        "50.18"
      ]
    },
    {
      id: "50.20",
      title: "Idempotency",
      description: [
        "HTTP darajasida idempotentlik: GET, HEAD, PUT, DELETE, OPTIONS — spetsifikatsiya bo'yicha idempotent; ularni xavfsiz qayta yuborish mumkin (brauzerlar, proxy'lar va kutubxonalar shunday qiladi). POST va PATCH — idempotent emas; tarmoq xatosidan keyin qayta yuborish dublikat yaratishi mumkin.",
        "",
        "Yechim: `Idempotency-Key` header (IETF draft standarti), server natijani kalit bo'yicha saqlaydi. Server implementatsiyasi semantikaga mos bo'lishi kerak: `DELETE` ikkinchi marta — `404` yoki `204` (holat bir xil), lekin yon ta'sir takrorlanmasligi.",
        "",
        "```http",
        "POST /api/payments HTTP/1.1",
        "Idempotency-Key: 4f9a8c2e-1b3d-4e5f-9a7b-8c6d5e4f3a2b",
        "Content-Type: application/json",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "POST endpoint'iga Idempotency-Key qo'llab-quvvatlashini qo'shing va tarmoq xatosi simulyatsiyasi bilan sinang.",
      acceptanceCriteria: [
        "HTTP metodlarining idempotentlik semantikasini biladi",
        "POST uchun idempotency key'ni qo'llaydi"
      ],
      prerequisites: [
        "18.14"
      ]
    },
    {
      id: "50.21",
      title: "Proxies",
      description: [
        "Proxy turlari: **forward proxy** (mijoz tomonida — korporativ tarmoq), **reverse proxy** (server tomonida — Nginx, load balancer, CDN, API gateway). Reverse proxy ortida ilova mijozning haqiqiy IP va sxemasini bevosita ko'rmaydi — `X-Forwarded-For`, `X-Forwarded-Proto`, `X-Forwarded-Host` yoki `Forwarded` header'lari orqali oladi.",
        "",
        "Laravel'da `TrustProxies` — faqat ishonchli proxy IP'lariga (yoki barcha — faqat load balancer orqali kirish mumkin bo'lsa) ishonish; aks holda hujumchi `X-Forwarded-For` ni soxtalashtirib rate limit va IP cheklovlarini chetlab o'tadi. Ko'p qatlamli proxy'larda (CDN → LB → Nginx) zanjirni to'g'ri sozlash.",
        "",
        "```php",
        "// bootstrap/app.php",
        "->withMiddleware(function (Middleware $middleware) {",
        "    $middleware->trustProxies(at: ['10.0.0.0/8'], headers: Request::HEADER_X_FORWARDED_FOR | Request::HEADER_X_FORWARDED_PROTO);",
        "})",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Load balancer ortidagi ilovada TrustProxies'ni sozlang va soxta X-Forwarded-For bilan IP soxtalashtirib bo'lmasligini tekshiring.",
      acceptanceCriteria: [
        "Forward va reverse proxy farqini biladi",
        "TrustProxies'ni xavfsiz sozlaydi"
      ],
      prerequisites: [
        "41.2"
      ]
    },
    {
      id: "50.22",
      title: "HTTPS Security",
      description: [
        "HTTPS xavfsizligi: barcha trafik HTTPS (HTTP → 301 yo'naltirish), HSTS (`Strict-Transport-Security` — brauzer keyinchalik faqat HTTPS ishlatadi; `preload` ro'yxati), zamonaviy TLS (1.2+, xavfsiz shifrlar, forward secrecy), to'liq sertifikat zanjiri, aralash kontent yo'q (HTTPS sahifada HTTP resurslar), cookie'lar `Secure`.",
        "",
        "Laravel: `URL::forceScheme('https')` (proxy ortida noto'g'ri sozlangan bo'lsa), `TrustProxies` (sxemani to'g'ri aniqlash), `secure` session cookie. Tekshirish: SSL Labs, `curl -I` bilan HSTS header'i.",
        "",
        "```php",
        "// AppServiceProvider::boot()",
        "if ($this->app->isProduction()) {",
        "    URL::forceScheme('https');",
        "}",
        "```",
        "```http",
        "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Saytni HTTPS checklist bo'yicha tekshiring: yo'naltirish, HSTS, aralash kontent, cookie'lar va SSL Labs bahosi.",
      acceptanceCriteria: [
        "HTTPS xavfsizlik komponentlarini biladi",
        "HSTS va aralash kontent muammosini tushunadi"
      ],
      prerequisites: [
        "50.8",
        "41.9"
      ]
    }
  ]
});
