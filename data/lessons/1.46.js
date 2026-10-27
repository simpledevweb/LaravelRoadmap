/* Chuqur dars: 1.46. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("1.46", {
  "lesson": [
    "### Izoh nima uchun",
    "Izohlar PHP tomonidan **bajarilmaydi**. Ular kodni tushuntiradi, vaqtincha o'chirib turadi yoki keyingi dasturchiga (siz ham) eslatma qoldiradi.",
    "",
    "### Bir qatorli izohlar",
    "```php",
    "// bu izoh",
    "# bu ham izoh",
    "echo \"Salom\"; // qator oxiridagi izoh",
    "```",
    "Diqqat: PHP 8 da `#[` — izoh emas, **attribute** boshlanishi. `#` bilan boshlanadigan izohdan keyin bo'shliq qoldiring.",
    "",
    "### Ko'p qatorli izoh",
    "`/* ... */` oralig'i (batafsil keyingi mavzuda).",
    "",
    "### Yaxshi izoh qoidalari",
    "- **Nima** emas, **nima uchun** deb yozing. `$i++; // i ni oshiramiz` foydasiz.",
    "- Kod o'zi tushunarli bo'lsa, izoh kerak emas: o'zgaruvchi va funksiyaga yaxshi nom bering.",
    "- Eskirgan izoh yolg'on gapiradi: kodni o'zgartirsangiz izohni ham yangilang.",
    "- `TODO:` va `FIXME:` belgilari IDE tomonidan topiladi.",
    "- O'chirilgan kodni izohda qoldirmang: Git tarixi bor.",
    "",
    "### Izoh bilan vaqtincha o'chirish",
    "Muammoni topish uchun qatorni `//` bilan o'chirib ko'rish — qulay usul.",
    "",
    "### Bir qator ichida",
    "`/* */` qator o'rtasida ham ishlaydi: `$x = /* standart */ 10;` (kamdan-kam kerak).",
    "",
    "### Izohning vazifalari",
    "1. **Tushuntirish:** nima uchun shunday qilingan (biznes qoida, workaround).",
    "2. **O'chirib turish:** muammoni topishda qatorni vaqtincha o'chirish.",
    "3. **Belgilar:** `TODO`, `FIXME`, `HACK`, `NOTE` — IDE ro'yxat qilib ko'rsatadi.",
    "4. **Hujjat:** docblock (keyingi mavzu).",
    "",
    "### Izoh turlarini tanlash",
    "- `//` — eng keng qo'llaniladi, bir qator.",
    "- `#` — shell uslubi; PHP 8 da `#[` bilan chalkashmasligi uchun kamroq ishlatiladi.",
    "- `/* */` — blok.",
    "",
    "### Kod vs izoh",
    "Yomon:",
    "```php",
    "// foydalanuvchi yoshi 18 dan katta bo'lsa",
    "if ($u->age > 17) {}",
    "```",
    "Yaxshi: nomlangan konstanta yoki metod izohni almashtiradi:",
    "```php",
    "if ($user->isAdult()) {}",
    "```",
    "Izoh kodni takrorlamasin; kod ifodalay olmaydigan narsani (sabab, cheklov, havola) yozing.",
    "",
    "### Havolalar va ticketlar",
    "Muhim workaround'larda sabab va ticket raqami: `// Stripe API 429 qaytaradi, JIRA-123`. Bu kelajakda kodni xavfsiz o'zgartirishga yordam beradi.",
    "",
    "### Maxfiy ma'lumot",
    "Izohga parol, token, shaxsiy ma'lumot yozmang: u Git tarixida abadiy qoladi.",
    "",
    "### Ommaviy izohlash",
    "IDE: `Ctrl+/` tanlangan qatorlarni `//` bilan izohlaydi (VS Code, PhpStorm). Qaytarish uchun yana bosing."
  ],
  "examples": [
    {
      "title": "Turli izohlar",
      "lang": "php",
      "code": [
        "<?php",
        "// Foydalanuvchi ismini olamiz",
        "$name = 'Ali'; # kichik izoh",
        "",
        "/* Quyidagi qator keyinroq kerak bo'ladi",
        "echo $name;",
        "*/",
        "",
        "// TODO: ismni bazadan olish",
        "echo $name;"
      ]
    },
    {
      "title": "Yaxshi va yomon izoh",
      "lang": "php",
      "code": [
        "<?php",
        "$i++;                // yomon: i ni oshiradi",
        "",
        "// To'lov provayderi 429 qaytarsa, 3 marta kutib qayta uramiz",
        "$retries = 3;        // yaxshi: sababni tushuntiradi"
      ]
    },
    {
      "title": "TODO/FIXME belgilari",
      "lang": "php",
      "code": [
        "<?php",
        "// TODO: keshni qo'shish (issue #42)",
        "// FIXME: 31-kunli oylarda xato beradi",
        "// NOTE: API javobi 5 soniyadan kech kelishi mumkin",
        "function nextMonth(DateTimeImmutable $d): DateTimeImmutable { return $d->modify('+1 month'); }"
      ]
    }
  ],
  "pitfalls": [
    "`#[` PHP 8 da attribute boshlanishi: `#[Test]` izoh emas, kodga ta'sir qiladi.",
    "Bir qatorli `//` izohda `?>` bo'lsa PHP rejimi tugaydi.",
    "Eskirgan izoh chalg'itadi: kod o'zgarsa izohni ham o'zgartiring.",
    "Katta o'chirilgan kod bloklarini izohda qoldirish kodni o'qib bo'lmas qiladi: Git ishlating."
  ]
});
