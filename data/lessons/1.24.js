/* Chuqur dars: 1.24. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.24", {
  "lesson": [
    "### php.ini nima",
    "PHP konfiguratsiyasi. Har SAPI o'z ini'sini yuklaydi: CLI va FPM ko'pincha **boshqa** fayllar (`php --ini` va `phpinfo()` qaysi fayl o'qilganini ko'rsatadi). Qo'shimcha `conf.d/*.ini` kengaytmalar uchun.",
    "",
    "### INI rejimlari",
    "`PHP_INI_SYSTEM` (faqat php.ini/server), `PHP_INI_PERDIR` (`.user.ini`, `.htaccess`), `PHP_INI_USER` (`ini_set()` bilan). Hamma direktiva `ini_set` bilan o'zgarmaydi: ba'zilari (masalan `opcache.*`, `upload_max_filesize`) faqat ini'da.",
    "",
    "### Muhim direktivalar",
    "- `memory_limit`, `max_execution_time` (CLI'da 0), `max_input_time`",
    "- `upload_max_filesize`, `post_max_size` (post kattaroq bo'lishi kerak), `max_file_uploads`",
    "- `error_reporting`, `display_errors`, `log_errors`, `error_log`",
    "- `date.timezone`, `default_charset`",
    "- `session.*`: cookie_secure, cookie_httponly, cookie_samesite",
    "- `expose_php=Off`, `disable_functions`, `open_basedir`",
    "- `opcache.*` (1.25)",
    "",
    "### Dev va prod",
    "Production: `display_errors=Off`, `log_errors=On`, `error_reporting=E_ALL`, `expose_php=Off`, OPcache yoqilgan, `validate_timestamps=0` (deploydan keyin reset). Development: xatolar ekranda, Xdebug.",
    "",
    "### Docker/FPM",
    "`php.ini-production` shablonidan boshlang. FPM'da pool konfiguratsiyasi alohida (`www.conf`), `php_admin_value[...]` ni shu yerda qo'yish mumkin. O'zgarishdan keyin FPM'ni reload qiling.",
    "",
    "### Tekshirish",
    "`php -i | grep memory_limit`, `php --ini`, `ini_get('memory_limit')`, `php -d memory_limit=512M script.php`.",
    "",
    "### php.ini topilishi va qatlamlari",
    "1. `PHPRC` muhit o'zgaruvchisi / `-c` parametr.",
    "2. SAPI ga xos papka (`/etc/php/8.4/fpm/php.ini`, `.../cli/php.ini`).",
    "3. `php.ini` yoki `conf.d/*.ini` (alifbo tartibida, kengaytmalar `20-pdo.ini`).",
    "4. `.user.ini` (CGI/FPM, har papkada, `user_ini.filename`), `.htaccess` (Apache), `php_value` / `php_admin_value` (FPM pool).",
    "5. `ini_set()` (runtime).",
    "Natijaviy qiymat: `php -i | grep 'Loaded Configuration File'`, `phpinfo()` \"Local Value\" va \"Master Value\".",
    "",
    "### INI sintaksisi",
    "`key = value`, qiymatlar: `On/Off/1/0/true/false`, o'lcham (`128M`, `1G`), konstantalar (`E_ALL & ~E_DEPRECATED`), `;` izoh. `php_admin_flag` oddiy kodda o'zgartirib bo'lmaydigan qiluvchi (FPM).",
    "",
    "### Muhim direktivalar (batafsil)",
    "**Xotira va vaqt:** `memory_limit`, `max_execution_time`, `max_input_time`, `max_input_vars` (default 1000: katta forma massivi kesiladi!).",
    "**Yuklash:** `file_uploads`, `upload_max_filesize`, `post_max_size`, `max_file_uploads`, `upload_tmp_dir`.",
    "**Xato:** `error_reporting`, `display_errors`, `display_startup_errors`, `log_errors`, `error_log`, `html_errors`, `zend.exception_ignore_args`, `zend.assertions` (-1 prod, 1 dev).",
    "**Xavfsizlik:** `expose_php`, `open_basedir`, `disable_functions`, `allow_url_fopen`, `allow_url_include`, `session.*`, `enable_dl`, `cgi.fix_pathinfo=0` (Nginx).",
    "**Lokal:** `date.timezone`, `default_charset`, `intl.default_locale`.",
    "**Performance:** `opcache.*`, `realpath_cache_size` (4096K) va `realpath_cache_ttl`, `zend.enable_gc`, `output_buffering`.",
    "**Boshqa:** `short_open_tag`, `auto_prepend_file`, `sys_temp_dir`, `precision`/`serialize_precision` (-1: eng qisqa aniq float), `arg_separator.output`.",
    "",
    "### Dev va production presetlari",
    "`php.ini-development` va `php.ini-production` oldindan tayyorlangan shablonlar. Docker: `mv \"$PHP_INI_DIR/php.ini-production\" \"$PHP_INI_DIR/php.ini\"` va `conf.d/zz-custom.ini`.",
    "",
    "### Muhitga qarab",
    "CLI: `max_execution_time=0`, `memory_limit` ko'pincha yuqori yoki -1; web: kichik. Queue worker uchun alohida CLI ini (`php -c`).",
    "",
    "### Tekshirish",
    "`php --ini`, `php -i`, `php --ri opcache`, `php -d display_errors=1`, `ini_get_all('opcache')`, `get_cfg_var('cfg_file_path')`."
  ],
  "examples": [
    {
      "title": "CLI tekshiruvi",
      "lang": "bash",
      "code": [
        "php --ini",
        "php -i | grep -E 'memory_limit|opcache.enable|upload_max'",
        "php -d memory_limit=512M artisan queue:work"
      ]
    },
    {
      "title": "Production ini",
      "lang": "ini",
      "code": [
        "; php.ini",
        "display_errors = Off",
        "log_errors = On",
        "error_reporting = E_ALL",
        "expose_php = Off",
        "memory_limit = 256M",
        "upload_max_filesize = 20M",
        "post_max_size = 25M",
        "date.timezone = UTC",
        "session.cookie_httponly = 1",
        "session.cookie_secure = 1"
      ]
    },
    {
      "title": "Runtime sozlash",
      "lang": "php",
      "code": [
        "ini_set('memory_limit', '512M');       // PHP_INI_ALL",
        "set_time_limit(60);",
        "var_dump(ini_get('opcache.enable'));   // faqat o'qish; ini_set ta'sir qilmaydi"
      ]
    },
    {
      "title": "Docker uchun ini",
      "lang": "dockerfile",
      "code": [
        "FROM php:8.4-fpm",
        "RUN mv \"$PHP_INI_DIR/php.ini-production\" \"$PHP_INI_DIR/php.ini\"",
        "COPY docker/php/zz-app.ini $PHP_INI_DIR/conf.d/zz-app.ini"
      ]
    },
    {
      "title": "zz-app.ini",
      "lang": "ini",
      "code": [
        "memory_limit = 256M",
        "max_input_vars = 5000",
        "upload_max_filesize = 20M",
        "post_max_size = 25M",
        "opcache.validate_timestamps = 0",
        "realpath_cache_size = 4096K",
        "serialize_precision = -1"
      ]
    }
  ],
  "pitfalls": [
    "CLI va FPM turli php.ini ishlatadi: `artisan` da ishlagan sozlama web'da ishlamasligi mumkin.",
    "`post_max_size` `upload_max_filesize` dan kichik bo'lsa, katta fayl yuklanganda butun `$_POST` bo'shab qoladi.",
    "Productionda `display_errors=On` ichki yo'llarni ochib beradi.",
    "INI o'zgargach FPM'ni reload qilmasangiz eski qiymat ishlaydi.",
    "`max_input_vars=1000` default: kattaroq forma (ko'p input) jimgina kesiladi, qiymatlar yo'qoladi.",
    "`.user.ini` kechikib (TTL) qo'llanadi: darrov ishlamasligi mumkin.",
    "`display_errors` productionda `Off` bo'lmasa ichki ma'lumot chiqadi.",
    "`cgi.fix_pathinfo=1` + Nginx noto'g'ri sozlansa xavfsizlik teshigi (yuklangan faylni PHP sifatida bajarish)."
  ]
});
