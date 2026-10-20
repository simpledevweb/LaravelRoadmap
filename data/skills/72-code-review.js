/* 72 · Code Review
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 72,
  slug: "code-review",
  title: "Code Review",
  group: "code-quality",
  description: "Code Review — dasturiy ta'minot sifati, xavfsizligi va jamoaviy bilim almashinuvining eng muhim muhandislik amaliyotidir. Senior dasturchi kodni faqat sintaktik xatolarga emas, balki biznes mantig'ining to'g'riligi, arxitektura yaxlitligi, regressiya va poyga holatlari (race conditions), xavfsizlik zaifliklari hamda masshtablanuvchanlik nuqtai nazaridan tekshiradi. Shu bilan birga, jamoada o'zaro hurmat va muhandislik madaniyatini shakllantiruvchi konstruktiv fikr-mulohaza (feedback) bera oladi.",
  subskills: [
    {
      id: "72.1",
      title: "Correctness",
      description: [
        "Koddagi funksional to'g'rilik (Correctness) — kod biznes talabini (acceptance criteria) to'liq va kutilganidek bajarayotganini tekshirish.",
        "",
        "Reviewer biznes stsenariysini tasavvur qiladi: musbat oqim (happy path) bilan birga bekor qilish, noto'g'ri kirish ma'lumotlari yoki parallel chaqiruvlarda kod o'zini qanday tutadi? Kod sintaktik mukammal bo'lishi mumkin, lekin biznes maqsadiga zid ishlasa — u noto'g'ri hisoblanadi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Pull Request (PR) dagi biznes mantiqini vazifa ta'rifi (User Story) bilan solishtirib, talab qilinmagan yoki noto'g'ri talqin qilingan mantiqni aniqlang.",
      acceptanceCriteria: [
        "Biznes talablarining kodda to'liq qamrab olinganini tekshiradi",
        "Mantiqiy xatoliklarni (off-by-one, noto'g'ri shart operatorlari) topadi"
      ],
      prerequisites: ["6.1"]
    },
    {
      id: "72.2",
      title: "Readability",
      description: [
        "O'qiluvchanlik (Readability) — kodning maqsadi va ishlash mexanizmi boshqa dasturchi tomonidan qo'shimcha sharhlarsiz, oson tushunilishi.",
        "",
        "Chuqur qavatli shartlar (nested if-else) o'rniga Guard Clauses ishlatilishi, erta qaytish (early return), o'z-o'zini tushuntiruvchi o'zgaruvchi va metod nomlari ko'rib chiqiladi. Reviewer o'zidan so'raydi: 'Ushbu kodni 6 oydan keyin kelgan junior tushuna oladimi?'"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "PR da 4 qavatli `if/else` blokini Guard Clause yordamida tekis va o'qilishi oson kodga keltirish bo'yicha tavsiya qoldiring.",
      acceptanceCriteria: [
        "Kognitiv yuklamani (cognitive complexity) kamaytirish bo'yicha taklif beradi",
        "Tushunarsiz va ortiqcha mantiqiy chalkashliklarni bartaraf etadi"
      ],
      prerequisites: ["6.9", "6.11"]
    },
    {
      id: "72.3",
      title: "Maintainability",
      description: [
        "Qo'llab-quvvatlanuvchanlik (Maintainability) — kelajakda ushbu kodga o'zgartirish kiritish, yangi funksiya qo'shish yoki xatolarni tuzatish qanchalik oson va xavfsiz ekanligi.",
        "",
        "Qattiq bog'liqliklar (tight coupling), ortiqcha nusxalash (DRY buzilishi), global holatga tayanish va yashirin nojo'ya ta'sirlar (side effects) tekshiriladi. Kod kelajakdagi o'zgarishlarga moslashuvchan, lekin ortiqcha spekulyativ abstraksiyalarsiz bo'lishi lozim."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "PR da takrorlangan kod bo'lagini yordamchi servis yoki trait'ga ajratish orqali texnik qarz paydo bo'lishining oldini oling.",
      acceptanceCriteria: [
        "Kelajakda modifikatsiya qilish xavflarini oldindan ko'radi",
        "Texnik qarz (technical debt) keltirib chiqaruvchi yechimlarni to'xtatadi"
      ],
      prerequisites: ["6.14"]
    },
    {
      id: "72.4",
      title: "Architecture Consistency",
      description: [
        "Arxitektura yaxlitligi — yangi qo'shilayotgan kod loyihada qabul qilingan arxitektura qoidalariga (Layered, Action-Domain, Modular yoki DDD) to'liq mos kelishi.",
        "",
        "Masalan, agar loyihada biznes mantiq Controllerda emas, Action yoki Service klasslarida bo'lishi qabul qilingan bo'lsa, PR da to'g'ridan-to'g'ri Controllerga DB so'rovi va biznes operatsiyalari yozilishiga yo'l qo'yilmaydi."
      ],
      priority: "core",
      level: "Strong Middle",
      practicalTask: "Controller ichida 80 qatorlik biznes mantiq yozilgan PR ga arxitekturaviy sharh berib, Action/DTO naqshiga o'tkazishni taklif qiling.",
      acceptanceCriteria: [
        "Loyihaning belgilangan arxitektura chegaralari buzilmasligini nazorat qiladi",
        "Qatlamlar orasidagi mas'uliyatni to'g'ri taqsimlaydi"
      ],
      prerequisites: ["61.1", "62.15"]
    },
    {
      id: "72.5",
      title: "Security Review",
      description: [
        "Xavfsizlik tekshiruvi — potentsial zaifliklarni (OWASP Top 10) aniqlash: SQL Injection, XSS, CSRF, IDOR, Mass Assignment, zaif avtorizatsiya va nozik ma'lumotlarning ochiq qolishi.",
        "",
        "Reviewer tekshiradi: Foydalanuvchi yuborgan barcha ma'lumotlar FormRequest bilan qat'iy tekshirilganmi? Boshqa foydalanuvchining ma'lumotiga kirishda Policy/Gate tekshiruvi bormi? Loglarga parol yoki karta ma'lumotlari yozilmayaptimi?"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "PR da topilgan IDOR zaifligini (masalan `Order::findOrFail($request->id)` o'rniga `$request->user()->orders()->findOrFail(...)`) aniqlang va tuzating.",
      acceptanceCriteria: [
        "IDOR va avtorizatsiya bo'shliqlarini aniqlay oladi",
        "Input validatsiyasi va mass assignment xatolarini darhol to'xtatadi"
      ],
      prerequisites: ["51.1", "52.1"]
    },
    {
      id: "72.6",
      title: "Performance Review",
      description: [
        "Unumdorlik tahlili — kod katta hajmda yoki ko'p foydalanuvchilar parallel ishlaganda qanday ishlashini baholash.",
        "",
        "Sikl ichida og'ir amallar, massivlarni xotirada samarasiz filtrlash, xotira sarfi (memory footprint) yuqori bo'lgan obyektlar to'plami, uzoq kutiladigan sinxron tashqi API chaqiruvlari (ularni navbatga o'tkazish kerak) va keshdan to'g'ri foydalanilganligi tahlil qilinadi."
      ],
      priority: "core",
      level: "Strong Middle",
      practicalTask: "PR da 10 000 ta qatorni xotiraga to'liq yuklab ishlayotgan kodni `lazy()` yoki chunking bilan almashtirishni tavsiya qiling.",
      acceptanceCriteria: [
        "Xotira va protsessor yuklamasini ko'paytiruvchi bloklarni aniqlaydi",
        "Sinxron tashqi so'rovlarni asinxron navbatlarga (Queues) o'tkazishni talab qiladi"
      ],
      prerequisites: ["53.1", "46.1"]
    },
    {
      id: "72.7",
      title: "Database Query Review",
      description: [
        "Ma'lumotlar bazasi so'rovlarini ko'rib chiqish — eng ko'p regressiya va muammolar keltirib chiqaradigan so'rovlarni aniqlash.",
        "",
        "N+1 so'rovlari bormi (eager loading `with()` ishlatilganmi)? Yangi `where` va `order by` ustunlariga indekslar bormi? Qidiruv indekslardan to'liq foydalanyaptimi (sargable queries)? Tranzaksiya ichida keraksiz tashqi HTTP so'rovlar yo'qmi?"
      ],
      priority: "core",
      level: "Strong Middle",
      practicalTask: "PR dagi Eloquent so'rovida N+1 xatosini va indekslanmagan ustun bo'yicha saralash borligini aniqlab, optimallashtirish so'rang.",
      acceptanceCriteria: [
        "N+1 so'rov muammolarini koddanoq aniqlay oladi",
        "Tranzaksiyalar chegarasi (boundaries) va indekslardan to'g'ri foydalanilishini tekshiradi"
      ],
      prerequisites: ["13.12", "16.1", "17.15"]
    },
    {
      id: "72.8",
      title: "Test Coverage",
      description: [
        "Test qamrovini tekshirish — PR bilan birga yetarli va sifatli avtomatlashtirilgan testlar yozilganligini nazorat qilish.",
        "",
        "Shunchaki 200 OK qaytaruvchi yuzaki testlar emas, balki haqiqiy biznes qoidalarini, ma'lumotlar bazasidagi o'zgarishlarni va salbiy oqimlarni (403, 422, 404) tekshiruvchi testlar talab qilinadi. Testlar deterministik va tez ishlayotgani ko'zdan kechiriladi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Yangi API endpoint qo'shilgan, lekin test yozilmagan PR ga qanday stsenariylarni qamrab oluvchi Feature Test yozilishi kerakligini ro'yxat qilib bering.",
      acceptanceCriteria: [
        "Testlarning faqat yashil bo'lishini emas, balki mazmunli assertion'larini tekshiradi",
        "Barcha yangi imkoniyatlar uchun avtomatlashtirilgan testlar talab qiladi"
      ],
      prerequisites: ["29.1", "74.1"]
    },
    {
      id: "72.9",
      title: "Edge Cases",
      description: [
        "Chekka holatlar (Edge Cases) — nostandart, kam uchraydigan yoki chegaradagi shartlar bilan ishlash.",
        "",
        "Misollar: 0 ga bo'linish, bo'sh massivlar, null qiymatlar, juda uzun satrlar, vaqt zonalari farqi (timezones), sakrash yili (leap year), valyutada tiyinlar (cent/tiyin float rounding), parallel so'rovlarda poyga holatlari (race condition). Reviewer odatiy 'happy path' dan tashqariga qaraydi."
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Balansdan pul yechish PR da ikki marta parallel so'rov kelganda balans minusga kirib ketishi mumkin bo'lgan race condition holatini ko'rsating.",
      acceptanceCriteria: [
        "Nol, null, chegaraviy raqamlar va poyga holatlarini oldindan ko'ra oladi",
        "Pessimistic locking yoki atomik operatsiyalarni taklif qiladi"
      ],
      prerequisites: ["27.8", "81.11"]
    },
    {
      id: "72.10",
      title: "Error Handling",
      description: [
        "Xatolarni qayta ishlash — kutilmagan nosozliklar yuz berganda ilova o'zini qanday tutishi va foydalanuvchiga nima ko'rsatishi.",
        "",
        "Reviewer tekshiradi: Bo'sh `catch` bloklari orqali xatolar yashirib ketilmaganmi? Nozik tizim xatolari va stack trace foydalanuvchiga oshkor bo'lmayaptimi? Xatolar tegishli kontekst bilan loglarga yozilyaptimi? Qayta urinish (retry) va graceful degradation ko'zda tutilganmi?"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Tashqi to'lov tizimiga so'rov yuboruvchi kodda ulanish uzilganda qanday istisno (exception) qayta ishlanishi va foydalanuvchiga xavfsiz javob qaytarilishi kerakligini ko'rsating.",
      acceptanceCriteria: [
        "Yutib yuborilgan (swallowed) exception'larni qat'iy to'xtatadi",
        "Kontekstli va xavfsiz xatolik xabarlarini talab qiladi"
      ],
      prerequisites: ["1.15", "51.24"]
    },
    {
      id: "72.11",
      title: "Naming and Abstraction",
      description: [
        "Nomlash va abstraksiya darajasi — o'zgaruvchilar, funksiyalar va klasslarning o'z vazifasini aniq aks ettiruvchi nomlarga ega bo'lishi.",
        "",
        "`$data`, `$item`, `$info` kabi noaniq nomlar o'rniga `$pendingOrders`, `$invoiceItem` kabi aniq nomlar talab etiladi. Shuningdek, 3 qatordan iborat bitta amal uchun 5 ta klassdan iborat ortiqcha abstraksiya (overengineering) qilinmagani tekshiriladi."
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "PR da qo'llanilgan tushunarsiz o'zgaruvchi va noo'rin mavhumlashtirilgan klass nomlarini domenga mos nomlarga o'zgartirishni taklif qiling.",
      acceptanceCriteria: [
        "Ubiquitous Language (umumiy domen tili) talablariga muvofiqligini nazorat qiladi",
        "Ortiqcha va asossiz abstraksiyalarni rad etadi"
      ],
      prerequisites: ["6.1", "5.20"]
    },
    {
      id: "72.12",
      title: "SOLID and Design Patterns",
      description: [
        "SOLID tamoyillari va loyihalash naqshlarining o'rinli qo'llanilishi.",
        "",
        "Bitta klassga bir nechta mustaqil vazifalar yuklanmaganmi (SRP)? Yangi to'lov tizimi qo'shilganda mavjud kod o'zgartirilyaptimi yoki yangi klass orqali kengaytiriladimi (OCP)? Naqshlar shunchaki 'borligi uchun' emas, real muammoni hal qilish uchun tanlanganmi?"
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "Yangi SMS provayder qo'shilayotganda 10 ta joyda `switch/case` yozilgan kodni Strategy naqshiga o'tkazish bo'yicha sharh bering.",
      acceptanceCriteria: [
        "SOLID buzilishlarini va ularning oqibatlarini tushuntiradi",
        "O'rinsiz murakkablashtirilgan (over-engineered) patternlarni soddalashtiradi"
      ],
      prerequisites: ["4.6", "5.19"]
    },
    {
      id: "72.13",
      title: "Backward Compatibility",
      description: [
        "Orqaga moslik (Backward Compatibility) — yangi o'zgarishlar mavjud mijozlar (mobil ilovalar, tashqi integratsiyalar) va API iste'molchilarini buzib qo'ymasligini ta'minlash.",
        "",
        "Mavjud API javobidan maydonni o'chirish yoki turini o'zgartirish, majburiy yangi parametr qo'shish, mavjud metod signature'sini o'zgartirish breaking change hisoblanadi. Agar breaking change zarur bo'lsa, API versioning yoki bosqichma-bosqich eskirish (deprecation) siyosati qo'llanilishi kerak."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "PR da mavjud API javobidagi kalit nomi o'zgartirilganini aniqlang va eski mobil mijozlar buzilmasligi uchun orqaga mos yechim taklif qiling.",
      acceptanceCriteria: [
        "API breaking changes xavfini oldindan ko'radi",
        "Deprecation siyosati va versiyalash qoidalariga amal qildirtiradi"
      ],
      prerequisites: ["18.18", "19.11"]
    },
    {
      id: "72.14",
      title: "Migration Safety",
      description: [
        "Ma'lumotlar bazasi migratsiyalarining xavfsizligi — production bazasida jadvallarni uzoq muddatga bloklab (table lock) qo'ymaslik va nol uzilish bilan deploy qilish imkoniyati.",
        "",
        "Millionlab qatorga ega jadvalga standart qiymatli yangi ustun qo'shish, ustun turini o'zgartirish yoki ustunni o'chirish ishlab turgan ilovani to'xtatib qo'yishi mumkin. Reviewer ikki bosqichli migratsiya (expand-contract pattern) talab qiladi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "PR da katta jadvaldan ustunni to'g'ridan-to'g'ri o'chiruvchi migratsiyani to'xtating va nol uzilish bilan bajariladigan ikki bosqichli reja taklif qiling.",
      acceptanceCriteria: [
        "Katta jadvallarda table lock keltirib chiqaruvchi DDL operatsiyalarini biladi",
        "Backward-compatible va xavfsiz rollback imkoniyatiga ega migratsiyalarni talab qiladi"
      ],
      prerequisites: ["14.17", "43.10"]
    },
    {
      id: "72.15",
      title: "Constructive Feedback",
      description: [
        "Konstruktiv fikr-mulohaza madaniyati — shaxsiyatga tegmasdan, faqat kodga va muammoning mohiyatiga e'tibor qaratish.",
        "",
        "'Bu kod yomon' yoki 'Bunday qilmang' deyish o'rniga, 'Nima sababdan' bu muammo ekanligi tushuntiriladi va muqobil yechim taklif qilinadi. Savollar berish ('Bu yerda X bo'lsa nima bo'ladi deb o'ylaysiz?') orqali muallifni mustaqil o'ylashga undash eng samarali uslubdir."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "O'ta chalkash yozilgan kodga muloyim, tushunarli, sabablarini ko'rsatgan va yaxshilash variantini havola qilgan 2 ta izoh namunasi yozing.",
      acceptanceCriteria: [
        "Fikr-mulohazalarni professional va hurmat bilan bayon qiladi",
        "Har doim muammo sababini va muqobil yechimini ko'rsatadi"
      ],
      prerequisites: ["83.6"]
    },
    {
      id: "72.16",
      title: "Review Scope",
      description: [
        "Review ko'lami — bitta Pull Request hajmiga va maqsadiga e'tibor qaratish.",
        "",
        "Katta hajmdagi PR lar (500+ qator) ko'r-ko'rona 'LGTM' (Looks Good To Me) bosilishiga sabab bo'ladi. Senior dasturchi PR larni kichik, bitta masalaga bag'ishlangan (atomic PRs) bo'lishini talab qiladi. Shuningdek, asosiy topshiriqqa aloqasi bo'lmagan keng ko'lamli formatlash yoki refactoringlarni alohida PR ga ajratishni so'raydi."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "3 ta turli funksiyani o'z ichiga olgan 1200 qatorlik PR ni 3 ta mustaqil kichik PR ga ajratish bo'yicha jamoaga tavsiya bering.",
      acceptanceCriteria: [
        "Katta PR larning xavf-xatarlarini tushunadi va oldini oladi",
        "Bitta PR bitta masalani (Single Responsibility PR) yechishini ta'minlaydi"
      ],
      prerequisites: ["33.19"]
    },
    {
      id: "72.17",
      title: "Approval Criteria",
      description: [
        "Tasdiqlash mezonlari (Definition of Done for Review) — PR qachon master/main branchga birlashtirishga (merge) ruxsat berilishi aniq qoidalari.",
        "",
        "Talablar: CI/CD testlari va tahlillari to'liq yashil bo'lishi, kamida 1 yoki 2 ta Senior roziligi, barcha munozarali izohlar hal qilingan (resolved) bo'lishi va branch main bilan ziddiyatsiz (conflict-free) turishi shart."
      ],
      priority: "core",
      level: "Strong Middle",
      practicalTask: "GitHub yoki GitLab da Branch Protection qoidalarini va PR merge qilish uchun talab etiladigan majburiy shartlarni belgilang.",
      acceptanceCriteria: [
        "Shaxsiy xush ko'rish emas, jamoaviy qat'iy standartlar asosida ruxsat beradi",
        "Muhim xavfsizlik va arxitektura savollari yopilmaguncha PR ni birlashtirishni to'xtatib turadi"
      ],
      prerequisites: ["34.2", "79.14"]
    },
    {
      id: "72.18",
      title: "Avoiding Style-Only Nitpicks",
      description: [
        "Faqat uslubiy mayda-chuydalarga (Nitpicks) chalg'imaslik — bo'shliqlar, qavslar joylashuvi, vergullar kabi narsalarni insoniy reviewda muhokama qilmaslik.",
        "",
        "Kod uslubini tekshirish to'liq avtomatlashtirilishi lozim (Laravel Pint, PHP-CS-Fixer). Inson kuchi faqat robotlar tekshira olmaydigan narsalarga — biznes mantiq, arxitektura va xavfsizlikka yo'naltirilishi kerak. Agar mayda taklif bo'lsa, 'nit:' (nitpick) belgisi bilan ixtiyoriy ekanligi ko'rsatiladi."
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Jamoada kod uslubi bo'yicha tortishuvlarni bartaraf etish uchun Laravel Pint vositasini loyihaga integratsiya qiling.",
      acceptanceCriteria: [
        "Uslubiy tekshiruvlarni avtomatlashtirilgan vositalarga topshiradi",
        "O'z vaqtini mantiqiy va arxitekturaviy tahlilga qaratadi"
      ],
      prerequisites: ["8.1", "72.19"]
    },
    {
      id: "72.19",
      title: "Automated Checks",
      description: [
        "Avtomatlashtirilgan tekshiruvlar — PR ochilganda CI quvurida avtomatik ishga tushuvchi sifat darvozalari (Quality Gates).",
        "",
        "PHPStan/Larastan (statik tahlil), Laravel Pint (kod uslubi), Pest/PHPUnit (testlar), `composer audit` (xavfsizlik zaifliklari). Agar avtomatlashtirilgan tekshiruvlardan biri yiqilsa, dasturchilar vaqtini ketkazib review qilmasligi kerak."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "GitHub Actions workflow yarating: har bir PR da Pint, PHPStan 8-daraja va testlar avtomatik ishlasin.",
      acceptanceCriteria: [
        "CI orqali PR larni avtomatik sifat darvozasidan o'tkazadi",
        "Inson omiliga bog'liq bo'lmagan xatolarni CI bosqichidayoq to'xtatadi"
      ],
      prerequisites: ["31.1", "45.1"]
    },
    {
      id: "72.20",
      title: "Knowledge Sharing",
      description: [
        "Bilim almashinuv — Code Review shunchaki xato qidirish emas, balki butun jamoaning professional o'sishi va loyiha kod bazasini umumiy tushunish vositasi.",
        "",
        "Review orqali jamoa a'zolari bir-birlarining yangi yechimlari, zamonaviy PHP 8.x / Laravel imkoniyatlari bilan tanishadi. Senior o'z tajribasini PR izohlarida o'rgatadi, kichik dasturchilar esa Senior yozgan kodni o'rganib savollar berish orqali rivojlanadi."
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "PR sharhida yangi Laravel 11 imkoniyatidan foydalanish bo'yicha hujjat havolasi bilan tushuntirish berib, jamoaga bilim ulashing.",
      acceptanceCriteria: [
        "Code review ni jamoaviy ta'lim va murabbiylik vositasiga aylantiradi",
        "Kollektiv kod egaligi (collective code ownership) madaniyatini rivojlantiradi"
      ],
      prerequisites: ["83.1"]
    }
  ]
});
