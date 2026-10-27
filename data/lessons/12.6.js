/* Chuqur dars: 12.6. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("12.6", {
  "lesson": [
    "### Cache Stampede nima",
    "Juda ommabop kesh kalitining muddati (TTL) tugagan lahzada minglab parallel so'rov keshni bo'sh topadi va **hammasi bir vaqtda** og'ir hisoblashni (odatda SQL) boshlaydi. Baza birdaniga yuklanib qotadi, keshni to'ldirish yana sekinlashadi va muammo qor ko'chkisidek o'sadi. Buni **dogpiling** ham deyishadi.",
    "",
    "Xavf quyidagi holda eng yuqori: kalit juda ko'p o'qiladi va uni qayta hisoblash qimmat (bosh sahifa, reyting, statistika).",
    "",
    "### Yechimlar",
    "1. **Atomik lock:** keshni faqat bitta so'rov to'ldiradi, qolganlari kutadi yoki eski qiymatni oladi. Laravel da `Cache::lock()`.",
    "2. **TTL jitter:** hamma kalit bir vaqtda tugamasligi uchun muddatga tasodifiy qo'shimcha beriladi (masalan 600 + 0..60 soniya).",
    "3. **Stale-while-revalidate:** muddati o'tgan, lekin hali yaroqli qiymatni berib turib, keshni fonda yangilash. Yangi Laravel versiyalarida `Cache::flexible()` shuni qiladi.",
    "4. **Oldindan isitish (pre-warming):** muddat tugashidan oldin kesh jadval bo'yicha (scheduler) yangilanadi.",
    "5. **Muddatsiz kesh + hodisa bilan tozalash:** TTL o'rniga ma'lumot o'zgarganda keshni yangilash.",
    "",
    "### Qaysi birini tanlash",
    "Oddiy va ishonchli boshlanish: jitter + lock. Juda og'ir va ommabop kalitlar uchun pre-warming yoki stale-while-revalidate. Har qanday holatda ham, keshni bo'sh topgan so'rovlar sonini cheklash asosiy g'oya."
  ],
  "examples": [
    {
      "title": "Lock bilan faqat bitta so'rov hisoblaydi",
      "lang": "php",
      "code": [
        "$value = Cache::get('home:stats');",
        "",
        "if ($value === null) {",
        "    $value = Cache::lock('lock:home:stats', 10)->block(5, function () {",
        "        // lock olgach qayta tekshiramiz: boshqa so'rov to'ldirgan bo'lishi mumkin",
        "        return Cache::remember('home:stats', 600, fn () => Stats::heavyQuery());",
        "    });",
        "}"
      ]
    },
    {
      "title": "TTL jitter",
      "lang": "php",
      "code": [
        "$ttl = 600 + random_int(0, 60); // 10-11 daqiqa",
        "",
        "$stats = Cache::remember('home:stats', $ttl, fn () => Stats::heavyQuery());"
      ]
    },
    {
      "title": "Stale-while-revalidate (flexible)",
      "lang": "php",
      "code": [
        "// 10 soniya yangi, undan keyin 60 soniyagacha eskirgan qiymat",
        "// beriladi va fonda yangilanadi (yangi Laravel versiyalari)",
        "$stats = Cache::flexible('home:stats', [10, 60], fn () => Stats::heavyQuery());"
      ],
      "note": "`Cache::flexible()` faqat yangi Laravel versiyalarida mavjud; loyiha versiyangizni tekshiring."
    }
  ],
  "pitfalls": [
    "Barcha kalitga bir xil TTL berish: ko'p kalit bir vaqtda tugab, bazaga bir vaqtning o'zida yuklanish keladi.",
    "Lock olgandan keyin keshni qayta tekshirmaslik: kutgan har bir so'rov o'z navbatida og'ir hisoblashni takrorlaydi.",
    "Lock muddatini hisoblashdan qisqa qilish: lock tugab, ikkinchi so'rov ham hisoblashni boshlaydi.",
    "Redis xotirasi to'lib, eviction kalitlarni o'chirib yuborishi: stampede'ning yashirin sababi, `maxmemory` va eviction siyosatini tekshiring."
  ]
});
