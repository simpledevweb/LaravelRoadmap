/* 41 · Nginx
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 41,
  slug: "nginx",
  title: "Nginx",
  group: "infra",
  description: "Nginx — yuqori samarali web server va reverse proxy; Laravel ilovalarining aksariyati Nginx + PHP-FPM juftligida ishlaydi. Senior dasturchi Nginx konfiguratsiyasini tushunadi: virtual host'lar, location'lar, FastCGI, TLS, keshlash, rate limiting, xavfsizlik header'lari va 502/504 xatolarini tashxislash.",
  subskills: [
    {
      id: "41.1",
      title: "HTTP Server Fundamentals",
      description: [
        "Nginx arxitekturasi: bitta master jarayon (konfiguratsiya, worker'larni boshqarish) va bir nechta worker (`worker_processes auto` — CPU yadrolari soni), har worker event-driven, non-blocking modelda minglab ulanishlarni boshqaradi (`worker_connections`). Shu sabab statik fayllar va proxy uchun juda samarali.",
        "",
        "Konfiguratsiya tuzilmasi: `/etc/nginx/nginx.conf` → `http {}` → `server {}` → `location {}`; direktivalar meros qilinadi. `sites-available`/`sites-enabled` (Ubuntu) yoki `conf.d/*.conf`.",
        "",
        "```nginx",
        "worker_processes auto;",
        "events { worker_connections 4096; }",
        "http {",
        "    include       mime.types;",
        "    sendfile      on;",
        "    keepalive_timeout 65;",
        "    include /etc/nginx/conf.d/*.conf;",
        "}",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Nginx konfiguratsiya daraxtini o'rganib, `nginx -T` bilan to'liq yig'ilgan konfiguratsiyani tahlil qiling.",
      acceptanceCriteria: [
        "Master/worker arxitekturasini biladi",
        "Konfiguratsiya kontekstlari va merosini tushunadi"
      ],
      prerequisites: [
        "50.1"
      ]
    },
    {
      id: "41.2",
      title: "Reverse Proxy",
      description: [
        "Reverse proxy — mijoz so'rovini qabul qilib, orqadagi server(lar)ga uzatadi va javobni qaytaradi: TLS'ni tugatish, yuklamani taqsimlash, keshlash, siqish, xavfsizlik qatlami. Laravel Octane, Reverb (WebSocket), Node servislar yoki boshqa ilovalar oldida.",
        "",
        "Muhim header'lar: `X-Forwarded-For`, `X-Forwarded-Proto`, `Host` — Laravel `TrustProxies` middleware'i ularga ishonishi uchun sozlanadi (aks holda `request()->ip()` va `isSecure()` noto'g'ri). WebSocket uchun `Upgrade`/`Connection` header'lari.",
        "",
        "```nginx",
        "location / {",
        "    proxy_pass http://127.0.0.1:8000;      # Octane",
        "    proxy_set_header Host $host;",
        "    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;",
        "    proxy_set_header X-Forwarded-Proto $scheme;",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Laravel Octane oldiga reverse proxy sozlang va `TrustProxies` bilan haqiqiy IP va HTTPS aniqlanishini tekshiring.",
      acceptanceCriteria: [
        "Reverse proxy vazifalarini biladi",
        "Forwarded header'lar va TrustProxies bog'liqligini tushunadi"
      ],
      prerequisites: [
        "41.1"
      ]
    },
    {
      id: "41.3",
      title: "Virtual Hosts",
      description: [
        "Virtual host (`server {}` bloki) — bitta Nginx'da bir nechta sayt: `server_name` (domen) va `listen` (port/IP) bo'yicha tanlanadi. `default_server` — mos kelmagan so'rovlar uchun (noma'lum Host bilan kelgan so'rovlarni rad etish — `return 444`).",
        "",
        "Laravel uchun: `root` — loyihaning `public/` papkasi (hech qachon loyiha ildizi emas — `.env` ochilib qoladi!), `index index.php`, HTTP → HTTPS yo'naltirish alohida server blokida.",
        "",
        "```nginx",
        "server {",
        "    listen 80 default_server;",
        "    return 444;                       # noma'lum host'lar",
        "}",
        "server {",
        "    listen 443 ssl;",
        "    http2 on;",
        "    server_name app.example.uz;",
        "    root /var/www/current/public;",
        "    index index.php;",
        "}",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Laravel ilovasi uchun virtual host yarating, noma'lum host'larni rad eting va `root` `public/` ekanini tekshiring.",
      acceptanceCriteria: [
        "`server_name` va `default_server` tanlovini biladi",
        "Root'ni faqat `public/` ga yo'naltiradi"
      ],
      prerequisites: [
        "41.1"
      ]
    },
    {
      id: "41.4",
      title: "`server` va `location` Blocks",
      description: [
        "`location` — URI bo'yicha qayta ishlash qoidalari. Moslik tartibi: `=` (aniq), `^~` (prefiks, regex'larni to'xtatadi), `~`/`~*` (regex — birinchi mos kelgani), oddiy prefiks (eng uzuni). `try_files` — fayllarni ketma-ket tekshirish.",
        "",
        "Laravel uchun klassik konfiguratsiya: hamma narsa `index.php` orqali, PHP faqat `index.php` uchun bajariladi (yuklangan `.php` fayllar bajarilmasligi uchun), yashirin fayllarni taqiqlash.",
        "",
        "```nginx",
        "location / {",
        "    try_files $uri $uri/ /index.php?$query_string;",
        "}",
        "location = /index.php {",
        "    fastcgi_pass unix:/run/php/php8.3-fpm.sock;",
        "    fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;",
        "    include fastcgi_params;",
        "}",
        "location ~ /\\.(?!well-known) { deny all; }",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Laravel uchun location bloklarini yozing va `.env`, `.git`, ixtiyoriy `.php` faylga so'rovlar rad etilishini tekshiring.",
      acceptanceCriteria: [
        "Location moslik tartibini biladi",
        "PHP bajarilishini faqat `index.php` bilan cheklaydi"
      ],
      prerequisites: [
        "41.3"
      ]
    },
    {
      id: "41.5",
      title: "`proxy_pass`",
      description: [
        "`proxy_pass` nozikliklari: URI bilan (`proxy_pass http://backend/api/;`) va URI'siz (`proxy_pass http://backend;`) farqi — location prefiksi almashtiriladi yoki saqlanadi; trailing slash muhim. `upstream` bloki — bir nechta backend va keepalive ulanishlar.",
        "",
        "Muhim sozlamalar: `proxy_http_version 1.1` + `proxy_set_header Connection \"\"` (upstream keepalive uchun), timeout'lar, `proxy_buffering`, `proxy_next_upstream` (xatoda boshqa backend'ga), `proxy_redirect`.",
        "",
        "```nginx",
        "upstream octane { server 127.0.0.1:8000; keepalive 32; }",
        "location /api/ {",
        "    proxy_pass http://octane;          # /api/ prefiksi saqlanadi",
        "    proxy_http_version 1.1;",
        "    proxy_set_header Connection \"\";",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "`proxy_pass` ning trailing slash bilan va siz xatti-harakatini sinab, natijalarni hujjatlashtiring.",
      acceptanceCriteria: [
        "`proxy_pass` URI qoidalarini biladi",
        "Upstream keepalive'ni sozlaydi"
      ],
      prerequisites: [
        "41.2"
      ]
    },
    {
      id: "41.6",
      title: "FastCGI",
      description: [
        "FastCGI — Nginx va PHP-FPM o'rtasidagi protokol. Nginx PHP'ni o'zi bajarmaydi — so'rovni `fastcgi_pass` orqali FPM'ga yuboradi. Asosiy parametrlar `fastcgi_params` faylida; eng muhimi `SCRIPT_FILENAME` (qaysi faylni bajarish) — `$realpath_root` symlink'li deploy'da to'g'ri reliz yo'lini beradi (OPcache bilan birga).",
        "",
        "Bufferlar va timeout'lar: `fastcgi_read_timeout` (uzoq so'rovlar uchun), `fastcgi_buffers`/`fastcgi_buffer_size` (katta header'lar — \"upstream sent too big header\" xatosi). `fastcgi_cache` — PHP javoblarini keshlash.",
        "",
        "```nginx",
        "location = /index.php {",
        "    fastcgi_pass unix:/run/php/php8.3-fpm.sock;",
        "    fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;",
        "    fastcgi_param DOCUMENT_ROOT $realpath_root;",
        "    include fastcgi_params;",
        "    fastcgi_read_timeout 60s;",
        "    fastcgi_buffer_size 32k;",
        "    fastcgi_buffers 8 32k;",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "FastCGI konfiguratsiyasini `$realpath_root` bilan symlink deploy'ga moslang va katta header xatosini bufferlar bilan hal qiling.",
      acceptanceCriteria: [
        "FastCGI va SCRIPT_FILENAME rolini biladi",
        "`$realpath_root` ning deploy'dagi ahamiyatini tushunadi"
      ],
      prerequisites: [
        "42.1"
      ]
    },
    {
      id: "41.7",
      title: "PHP-FPM Integration",
      description: [
        "Nginx ↔ PHP-FPM ulanishi: Unix socket (`unix:/run/php/php8.3-fpm.sock` — bitta serverda tezroq, ruxsatlar kerak) yoki TCP (`127.0.0.1:9000` yoki `app:9000` — konteynerlar orasida). Socket ruxsatlari: FPM pool `listen.owner`/`listen.group` Nginx foydalanuvchisiga mos bo'lishi kerak — aks holda 502.",
        "",
        "Bir nechta pool (masalan, admin va API uchun alohida resurslar) — turli socket'lar. FPM status sahifasini faqat ichki manzillarga ochish.",
        "",
        "```nginx",
        "location ~ ^/(fpm-status|fpm-ping)$ {",
        "    allow 127.0.0.1; deny all;",
        "    fastcgi_pass unix:/run/php/php8.3-fpm.sock;",
        "    include fastcgi_params;",
        "    fastcgi_param SCRIPT_FILENAME $fastcgi_script_name;",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Nginx va FPM'ni socket orqali ulang, ruxsat xatosini ataylab yaratib (502) tuzating, status sahifasini himoyalang.",
      acceptanceCriteria: [
        "Socket va TCP ulanish farqini biladi",
        "Socket ruxsatlari sababli 502 ni hal qiladi"
      ],
      prerequisites: [
        "42.11"
      ]
    },
    {
      id: "41.8",
      title: "Static File Serving",
      description: [
        "Nginx statik fayllarni (CSS, JS, rasmlar, shriftlar) PHP'siz, juda tez beradi (`sendfile`, `tcp_nopush`). Vite build fayllari hash'li nomga ega (`app-3f9c2ab.js`) — uzoq muddatli kesh xavfsiz: `Cache-Control: public, max-age=31536000, immutable`. Laravel `storage:link` orqali yuklangan fayllar.",
        "",
        "`access_log off` statik fayllar uchun (log shovqinini kamaytiradi), `try_files $uri =404` (PHP'ga tushmasin), `open_file_cache` (fayl deskriptorlari keshi).",
        "",
        "```nginx",
        "location /build/ {",
        "    expires 1y;",
        "    add_header Cache-Control \"public, immutable\";",
        "    access_log off;",
        "    try_files $uri =404;",
        "}",
        "location ~* \\.(png|jpg|jpeg|webp|svg|woff2)$ {",
        "    expires 30d;",
        "    access_log off;",
        "}",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Vite build va rasmlar uchun uzoq muddatli kesh sozlang va header'larni `curl -I` bilan tekshiring.",
      acceptanceCriteria: [
        "Statik fayllarni samarali berishni sozlaydi",
        "Hash'li fayllar uchun immutable keshni qo'llaydi"
      ],
      prerequisites: [
        "50.17"
      ]
    },
    {
      id: "41.9",
      title: "TLS/HTTPS",
      description: [
        "TLS sozlash: sertifikat (Let's Encrypt — `certbot --nginx`, avtomatik yangilanish), `listen 443 ssl` + `http2 on`, zamonaviy protokollar (`ssl_protocols TLSv1.2 TLSv1.3`), xavfsiz shifrlar (Mozilla SSL Configuration Generator), OCSP stapling, session kesh, HTTP → HTTPS 301 yo'naltirish, HSTS header.",
        "",
        "Tekshirish: SSL Labs testi (A+ maqsad), `openssl s_client`, sertifikat muddati monitoringi.",
        "",
        "```nginx",
        "server {",
        "    listen 80;",
        "    server_name app.example.uz;",
        "    return 301 https://$host$request_uri;",
        "}",
        "server {",
        "    listen 443 ssl;",
        "    http2 on;",
        "    ssl_certificate     /etc/letsencrypt/live/app.example.uz/fullchain.pem;",
        "    ssl_certificate_key /etc/letsencrypt/live/app.example.uz/privkey.pem;",
        "    ssl_protocols TLSv1.2 TLSv1.3;",
        "    add_header Strict-Transport-Security \"max-age=31536000; includeSubDomains\" always;",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Let's Encrypt sertifikatini sozlang, HTTP→HTTPS va HSTS'ni yoqing va SSL Labs'da A baho oling.",
      acceptanceCriteria: [
        "TLS konfiguratsiyasi elementlarini biladi",
        "Sertifikat avtomatik yangilanishini ta'minlaydi"
      ],
      prerequisites: [
        "50.8"
      ]
    },
    {
      id: "41.10",
      title: "HTTP Headers",
      description: [
        "Nginx header boshqaruvi: `add_header` (javobga qo'shish — `always` bilan xato javoblarida ham), `proxy_set_header`/`fastcgi_param` (backend'ga uzatish), `proxy_hide_header`/`fastcgi_hide_header` (backend header'larini yashirish — `X-Powered-By`), `server_tokens off` (Nginx versiyasini yashirish).",
        "",
        "Nozik joy: ichki blokda (`location`) `add_header` ishlatilsa, tashqi blokdagi `add_header` lar meros qilinmaydi — xavfsizlik header'lari yo'qolishi mumkin. Umumiy header'larni snippet fayliga (`include`) chiqaring.",
        "",
        "```nginx",
        "server_tokens off;",
        "fastcgi_hide_header X-Powered-By;",
        "include snippets/security-headers.conf;   # har location'da qayta include qilish",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Header merosi tuzog'ini ko'rsating (location'da add_header) va snippet bilan tuzating.",
      acceptanceCriteria: [
        "`add_header` meros qoidasini biladi",
        "Versiya ma'lumotlarini yashiradi"
      ],
      prerequisites: [
        "50.4"
      ]
    },
    {
      id: "41.11",
      title: "Request Size Limits",
      description: [
        "`client_max_body_size` — so'rov tanasining maksimal hajmi (default 1 MB!) — fayl yuklashda \"413 Request Entity Too Large\". PHP limitlari bilan muvofiqlashtirish kerak: `upload_max_filesize`, `post_max_size` (PHP) ≤ `client_max_body_size` (Nginx); Laravel validatsiyasi (`max:`) eng kichigi.",
        "",
        "Yuklash endpoint'lari uchun alohida location'da kattaroq limit, qolganlari uchun kichik — DoS himoyasi. `client_body_timeout`, `large_client_header_buffers`.",
        "",
        "```nginx",
        "server {",
        "    client_max_body_size 2m;",
        "    location = /api/uploads {",
        "        client_max_body_size 50m;",
        "        try_files $uri /index.php?$query_string;",
        "    }",
        "}",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Fayl yuklash uchun Nginx, PHP va Laravel validatsiya limitlarini izchil sozlang va 413/422 javoblarini sinang.",
      acceptanceCriteria: [
        "Nginx va PHP hajm limitlari bog'liqligini biladi",
        "Limitlarni endpoint bo'yicha farqlaydi"
      ],
      prerequisites: [
        "1.24"
      ]
    },
    {
      id: "41.12",
      title: "Timeouts",
      description: [
        "Timeout'lar: mijoz tomoni (`client_header_timeout`, `client_body_timeout`, `send_timeout`, `keepalive_timeout`), backend tomoni (`fastcgi_connect_timeout`, `fastcgi_read_timeout`, `proxy_connect_timeout`, `proxy_read_timeout`). Backend javob bermasa — 504 Gateway Timeout.",
        "",
        "Muvofiqlik: Nginx `fastcgi_read_timeout` ≥ PHP `max_execution_time` ≈ FPM `request_terminate_timeout` — aks holda chalkash xatolar. Uzoq ishlarni so'rovda emas, navbatda bajaring — timeout'larni oshirish o'rniga.",
        "",
        "```nginx",
        "fastcgi_connect_timeout 5s;",
        "fastcgi_read_timeout 60s;",
        "keepalive_timeout 30s;",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Nginx, PHP va FPM timeout'larini muvofiqlashtirib, uzoq so'rovni navbatga ko'chiring.",
      acceptanceCriteria: [
        "Timeout turlarini va 504 sababini biladi",
        "Timeout'larni qatlamlar bo'yicha muvofiqlashtiradi"
      ],
      prerequisites: [
        "42.8"
      ]
    },
    {
      id: "41.13",
      title: "Rate Limiting",
      description: [
        "Nginx darajasida rate limiting — PHP'ga yetmasdan yuklamani cheklash: `limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;` va `limit_req zone=api burst=20 nodelay;`. Ulanishlar soni: `limit_conn_zone`/`limit_conn`. Javob kodi — `limit_req_status 429`.",
        "",
        "Laravel rate limiting bilan qatlamli: Nginx — qo'pol himoya (DDoS, bot'lar, login brute-force), Laravel — mantiqiy limitlar (foydalanuvchi, tarif). Proxy/CDN ortida `$binary_remote_addr` emas, haqiqiy IP (`real_ip` moduli) ishlatilishi kerak.",
        "",
        "```nginx",
        "limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;",
        "location = /login {",
        "    limit_req zone=login burst=5 nodelay;",
        "    limit_req_status 429;",
        "    try_files $uri /index.php?$query_string;",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Login va API uchun Nginx rate limit'larini sozlab, yuklama testi bilan 429 qaytishini tekshiring.",
      acceptanceCriteria: [
        "`limit_req` va burst'ni biladi",
        "Nginx va ilova limitlarini qatlamlaydi"
      ],
      prerequisites: [
        "12.13"
      ]
    },
    {
      id: "41.14",
      title: "Load Balancing",
      description: [
        "`upstream` bilan yuklamani taqsimlash: algoritmlar — round-robin (default), `least_conn`, `ip_hash`/`hash` (sticky — session fayllarda bo'lsa; Redis session bilan kerak emas), `weight`. Holat: `max_fails`, `fail_timeout` (passiv health check), `backup` server, `down`.",
        "",
        "Laravel ilovasini bir nechta serverga masshtablash shartlari: stateless (session va kesh Redis'da, fayllar S3'da), bitta cron/scheduler (`onOneServer`), umumiy queue.",
        "",
        "```nginx",
        "upstream app_servers {",
        "    least_conn;",
        "    server 10.0.1.11:80 max_fails=3 fail_timeout=10s;",
        "    server 10.0.1.12:80 max_fails=3 fail_timeout=10s;",
        "    server 10.0.1.13:80 backup;",
        "}",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ikki app server oldiga Nginx load balancer qo'yib, bittasini o'chirganda trafik qayta taqsimlanishini sinang.",
      acceptanceCriteria: [
        "Balanslash algoritmlarini biladi",
        "Ilovani ko'p serverga tayyorlash shartlarini tushunadi"
      ],
      prerequisites: [
        "67.4"
      ]
    },
    {
      id: "41.15",
      title: "Gzip/Brotli",
      description: [
        "Javoblarni siqish — matnli resurslar (HTML, JSON, CSS, JS, SVG) hajmini 60–80% kamaytiradi. `gzip on`, `gzip_types` (default faqat HTML!), `gzip_min_length` (kichik javoblarni siqmaslik), `gzip_comp_level` (4–6 muvozanat), `gzip_vary on`. Brotli (`ngx_brotli` moduli) — gzip'dan 15–20% yaxshiroq; `brotli_static`/`gzip_static` — oldindan siqilgan fayllar (Vite build'da).",
        "",
        "Rasmlar (JPEG, PNG, WebP) va allaqachon siqilgan fayllarni siqmang — CPU isrofi.",
        "",
        "```nginx",
        "gzip on;",
        "gzip_vary on;",
        "gzip_comp_level 5;",
        "gzip_min_length 1024;",
        "gzip_types application/json application/javascript text/css image/svg+xml text/plain;",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Gzip'ni JSON va statik fayllar uchun sozlang va javob hajmini oldin/keyin `curl` bilan solishtiring.",
      acceptanceCriteria: [
        "Siqishni to'g'ri MIME turlari uchun yoqadi",
        "Brotli va oldindan siqish afzalliklarini biladi"
      ],
      prerequisites: [
        "50.16"
      ]
    },
    {
      id: "41.16",
      title: "Access va Error Logs",
      description: [
        "`access_log` — har so'rov (IP, vaqt, so'rov, status, hajm, referer, UA); custom format bilan `$request_time` (umumiy vaqt) va `$upstream_response_time` (backend vaqti) qo'shish — sekin so'rovlarni topish uchun juda foydali; JSON format markaziy log tizimlari uchun. `error_log` — darajalar (`warn`, `error`, `crit`); 502/504 sabablari shu yerda.",
        "",
        "Konteynerda log'lar stdout/stderr'ga; serverda logrotate. Health check va statik fayllar uchun `access_log off`.",
        "",
        "```nginx",
        "log_format timed '$remote_addr [$time_local] \"$request\" $status $body_bytes_sent '",
        "                 'rt=$request_time urt=$upstream_response_time';",
        "access_log /var/log/nginx/app.access.log timed;",
        "error_log  /var/log/nginx/app.error.log warn;",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Access log formatiga javob vaqtlarini qo'shing va eng sekin 10 ta endpoint'ni awk bilan toping.",
      acceptanceCriteria: [
        "Log formatini sozlay oladi",
        "`request_time` va `upstream_response_time` farqini biladi"
      ],
      prerequisites: [
        "40.11"
      ]
    },
    {
      id: "41.17",
      title: "Cache Configuration",
      description: [
        "Nginx keshlash: `proxy_cache`/`fastcgi_cache` — backend javoblarini diskda keshlash (`*_cache_path`, `*_cache_key`, `*_cache_valid`), `*_cache_bypass` (cookie/sessiya bo'lsa keshlamaslik — autentifikatsiyalangan sahifalar!), `*_cache_use_stale` (backend yiqilsa eski javob), `*_cache_lock` (stampede'ga qarshi). `X-Cache-Status` header — HIT/MISS diagnostikasi.",
        "",
        "Ommaviy, tez-tez o'qiladigan va kam o'zgaradigan sahifalar (blog, katalog) uchun katta tezlik. Shaxsiy ma'lumotni keshlab, boshqa foydalanuvchiga ko'rsatish — eng xavfli xato.",
        "",
        "```nginx",
        "fastcgi_cache_path /var/cache/nginx levels=1:2 keys_zone=app:50m max_size=1g inactive=10m;",
        "location = /index.php {",
        "    fastcgi_cache app;",
        "    fastcgi_cache_key \"$scheme$request_method$host$request_uri\";",
        "    fastcgi_cache_valid 200 60s;",
        "    fastcgi_cache_bypass $cookie_laravel_session;",
        "    fastcgi_no_cache $cookie_laravel_session;",
        "    add_header X-Cache-Status $upstream_cache_status;",
        "}",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Ommaviy katalog sahifalari uchun FastCGI kesh sozlang; autentifikatsiyalangan foydalanuvchilar uchun bypass'ni tekshiring.",
      acceptanceCriteria: [
        "Nginx keshlash direktivalarini biladi",
        "Shaxsiy kontentni keshlashdan himoyalanadi"
      ],
      prerequisites: [
        "54.15"
      ]
    },
    {
      id: "41.18",
      title: "Security Headers",
      description: [
        "Xavfsizlik header'lari: `Strict-Transport-Security` (HTTPS majburiy), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` yoki CSP `frame-ancestors` (clickjacking), `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (kamera, geolokatsiya), `Content-Security-Policy` (XSS'ga qarshi kuchli qatlam — ehtiyotkorlik bilan, avval `Report-Only`).",
        "",
        "Nginx'da `add_header ... always` bilan; meros tuzog'iga e'tibor (41.10). securityheaders.com bilan tekshirish.",
        "",
        "```nginx",
        "# snippets/security-headers.conf",
        "add_header Strict-Transport-Security \"max-age=31536000; includeSubDomains\" always;",
        "add_header X-Content-Type-Options \"nosniff\" always;",
        "add_header X-Frame-Options \"DENY\" always;",
        "add_header Referrer-Policy \"strict-origin-when-cross-origin\" always;",
        "add_header Content-Security-Policy-Report-Only \"default-src 'self'\" always;",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Xavfsizlik header'lari snippet'ini yozib, securityheaders.com'da A baho oling.",
      acceptanceCriteria: [
        "Asosiy xavfsizlik header'larining vazifasini biladi",
        "CSP'ni Report-Only bilan bosqichma-bosqich joriy qiladi"
      ],
      prerequisites: [
        "51.18"
      ]
    },
    {
      id: "41.19",
      title: "Configuration Testing",
      description: [
        "Har o'zgarishdan keyin: `nginx -t` (sintaksis va fayllar mavjudligini tekshirish) — muvaffaqiyatli bo'lsagina reload. `nginx -T` — barcha include'lar bilan to'liq konfiguratsiyani chiqaradi (debug va audit uchun).",
        "",
        "Konfiguratsiyani git'da saqlash (yoki Ansible/Docker image'da), o'zgarishlarni review qilish, staging'da sinash. Avtomatik: CI'da konteynerda `nginx -t`, gixy kabi statik analizator (xavfli konfiguratsiyalarni topadi — masalan, alias traversal).",
        "",
        "```bash",
        "nginx -t && systemctl reload nginx",
        "nginx -T | grep -n \"client_max_body_size\"",
        "docker run --rm -v \"$PWD/nginx:/etc/nginx/conf.d:ro\" nginx:1.27 nginx -t",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Nginx konfiguratsiyasini git'ga oling va CI'da `nginx -t` hamda gixy tekshiruvini qo'shing.",
      acceptanceCriteria: [
        "`nginx -t` va `-T` dan foydalanadi",
        "Konfiguratsiyani versiyalab, avtomatik tekshiradi"
      ],
      prerequisites: [
        "41.1"
      ]
    },
    {
      id: "41.20",
      title: "Zero-Downtime Reload",
      description: [
        "`nginx -s reload` / `systemctl reload nginx` — master yangi konfiguratsiyani o'qiydi, yangi worker'larni ishga tushiradi, eski worker'lar joriy so'rovlarni tugatib to'xtaydi — ulanishlar uzilmaydi. `restart` esa barcha ulanishlarni uzadi.",
        "",
        "Konfiguratsiya xato bo'lsa, reload rad etiladi va eski konfiguratsiya ishlashda davom etadi (shuning uchun avval `nginx -t`). Nginx binarini yangilash ham uzilishsiz bajarilishi mumkin (`USR2` signal). Deploy'da Nginx odatda reload talab qilmaydi — faqat FPM reload (OPcache).",
        "",
        "```bash",
        "nginx -t && nginx -s reload",
        "ps -o pid,cmd -C nginx   # eski va yangi worker'lar vaqtincha birga",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Yuklama ostida (k6) Nginx reload va restart qilib, uzilgan so'rovlar sonini solishtiring.",
      acceptanceCriteria: [
        "Reload va restart farqini biladi",
        "Reload'dan oldin konfiguratsiyani tekshiradi"
      ],
      prerequisites: [
        "41.19"
      ]
    },
    {
      id: "41.21",
      title: "Troubleshooting 502/504 Errors",
      description: [
        "**502 Bad Gateway** — Nginx backend'dan yaroqli javob ololmadi: FPM ishlamayapti, socket yo'li/ruxsati noto'g'ri, FPM worker crash bo'ldi (segfault, `memory_limit`), \"upstream sent too big header\". **504 Gateway Timeout** — backend javobi `*_read_timeout` ichida kelmadi: sekin so'rov, DB lock, tashqi API kutish, FPM worker'lari tugagan (barcha band — navbat).",
        "",
        "Diagnostika: Nginx `error.log` (aniq sabab yoziladi), FPM log va slow log, `pm.max_children reached` ogohlantirishi, FPM status sahifasi (`active processes`, `listen queue`), `systemctl status php8.3-fpm`.",
        "",
        "```bash",
        "tail -50 /var/log/nginx/error.log | grep -E \"upstream|connect\\(\\)\"",
        "grep -i \"max_children\" /var/log/php8.3-fpm.log",
        "curl -s http://127.0.0.1/fpm-status?full | head -20",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "502 (FPM to'xtatilgan, socket ruxsati) va 504 (sekin so'rov, worker'lar tugagan) holatlarini sun'iy yaratib, diagnostika qo'llanmasini yozing.",
      acceptanceCriteria: [
        "502 va 504 sabablarini farqlaydi",
        "Log va FPM status orqali sababni topadi"
      ],
      prerequisites: [
        "42.17"
      ]
    }
  ]
});
