/* 81 · Problem Solving
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 81,
  slug: "problem-solving",
  title: "Problem Solving",
  group: "process",
  description: "Muammolarni hal qilish (Problem Solving) — Senior dasturchini Junior va Middle dan ajratib turuvchi eng fundamental ko'nikmadir. Murakkab, noaniq yoki kutilmagan vaziyatlarda Senior muhandis taxminlarga tayanmasdan, faktlar va dalillarga asoslanadi (Evidence-Based). Muammoning asl ildizini (Root Cause) topadi, murakkab tizimlarni 'bo'lib tashla va hukmronlik qil' usulida qismlarga ajratadi, murosalar (trade-offs) va chekka holatlarni hisobga oladi hamda kelajakda xatoning takrorlanmasligini tizimli kafolatlaydi.",
  subskills: [
    {
      id: "81.1",
      title: "Problem Definition",
      description: [
        "Muammoni aniq ifodalash — yechim qidirishga shoshilmasdan oldin, asl muammo nimada ekanligini xolisona tushunib olish.",
        "",
        "Ko'pincha odamlar 'alomat'ni (symptom) 'muammo' (problem) deb o'ylashadi (masalan: 'Server sekin ishlayapti' — bu muammo emas, alomat). Senior dasturchi 'Kutilgan xatti-harakat nima edi?', 'Amalda nima yuz berdi?', 'Qachon boshlandi?', 'Qaysi foydalanuvchilarga ta'sir qildi?' savollariga aniq javob topadi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Foydalanuvchilar 'Sayt qotib qolyapti' degan noaniq shikoyat bilan kelganda muammoni aniq texnik parametrlar bilan ifodalab bering.",
      acceptanceCriteria: [
        "Alomat bilan haqiqiy muammoni farqlay oladi",
        "Muammoning ko'lami va ta'sir darajasini (impact) aniq belgilaydi"
      ],
      prerequisites: ["56.1"]
    },
    {
      id: "81.2",
      title: "Requirement Clarification",
      description: [
        "Talablarni oydinlashtirish — noaniq, chala yoki ziddiyatli biznes vazifalarni kod yozishdan oldin savollar berish orqali to'liq tiniqlashtirish.",
        "",
        "Biznes buyurtmachilari ko'pincha texnik cheklovlarni bilmaydi. Dasturchi: 'Agar internet uzilsa nima bo'ladi?', 'Foydalanuvchi bitta tugmani 2 marta bossachi?', 'Bunday ma'lumot bazada bo'lmasa nima ko'rsatamiz?' kabi aniqlashtiruvchi savollar orqali bo'shliqlarni to'ldiradi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Mijozdan kelgan 'Foydalanuvchilarga bildirishnoma yuborish kerak' degan bir qatorlik talabni 5 ta aniqlashtiruvchi savol bilan to'ldiring.",
      acceptanceCriteria: [
        "Yashirin taxminlarni (hidden assumptions) aniqlaydi",
        "Biznes maqsadini texnik topshiriqqa aylantiradi"
      ],
      prerequisites: ["66.1", "78.5"]
    },
    {
      id: "81.3",
      title: "Reproduction",
      description: [
        "Xatolikni barqaror takrorlash (Reproduction) — muammoni lokal muhitda yoki test serverida aynan takrorlay olish.",
        "",
        "Muhandislik qoidasi: Agar siz xatolikni takrorlay olmasangiz, uni to'g'irlay olmaysiz. Minimal takrorlanuvchi namunani (Minimal Reproducible Example - MRE) yaratish: qaysi parametrlar, qaysi ma'lumotlar holati va qanday qadamlar ketma-ketligi xatoni keltirib chiqarishini aniqlash."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Production da yuz bergan 'vaqti-vaqti bilan yuzaga chiqadigan' xatolikni lokal muhitda deterministik test orqali 100% takrorlang.",
      acceptanceCriteria: [
        "Xatolikni minimal qadamlar bilan takrorlay oladi",
        "Takrorlash stsenariysini avtomatlashtirilgan testga aylantiradi"
      ],
      prerequisites: ["56.2"]
    },
    {
      id: "81.4",
      title: "Root Cause Analysis",
      description: [
        "Tub sababni tahlil qilish (Root Cause Analysis - RCA) — muammoning yuzaki oqibatini emas, unga sabab bo'lgan asosiy omilni aniqlash.",
        "",
        "'5 Nega' (5 Whys) usuli qo'llaniladi: 'Server to'xtadi. Nega? Xotira to'ldi. Nega? Workerlar qayta ishga tushmadi. Nega? Log fayl kattalashib ketdi...'. Natijada shunchaki serverni qayta yuklash (yuzaki yechim) emas, balki log aylantirish va xotira limiti (tub sabab) to'g'rilanadi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Bazada Deadlock xatosi yuz berganda '5 Whys' usulini qo'llab, SQL so'rovlar tartibiga borib taqaluvchi tub sababni toping.",
      acceptanceCriteria: [
        "Vaqtinchalik 'yamoq' (workaround) bilan tub sababni tuzatish farqini biladi",
        "Muammoning kelib chiqish zanjirini to'liq ko'rsatib beradi"
      ],
      prerequisites: ["56.12", "17.12"]
    },
    {
      id: "81.5",
      title: "Hypothesis Formation",
      description: [
        "Gipotezalar shakllantirish — ilmiy metod asosida muammo sababi bo'yicha asosli taxminlar ilgari surish.",
        "",
        "Kodni ko'r-ko'rona o'zgartirib 'qani ishlab qolarmikin' deb sinash (Shotgun debugging) tajribasiz dasturchilar usulidir. Senior dasturchi: 'Mening gipotezam: Xatoga sabab — Redis kalitining muddati ertaroq tugayotganida. Buni tekshirish uchun loglarga TTL ni chiqaraman' deb tizimli ishlaydi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Sekin ishlayotgan so'rov bo'yicha 3 ta mustaqil gipoteza tuzing va har birini qanday tekshirish rejasini yozing.",
      acceptanceCriteria: [
        "Taxminlarni dalillar bilan tasdiqlash yoki inkor qilish rejasini tuzadi",
        "Ko'r-ko'rona kod tuzatish odatidan voz kechadi"
      ],
      prerequisites: ["56.1"]
    },
    {
      id: "81.6",
      title: "Evidence-Based Debugging",
      description: [
        "Dalillarga asoslangan tuzatish — qarorlarni faqat loglar, metrikalar, stack trace va profayler ma'lumotlariga qarab qabul qilish.",
        "",
        "'Menimcha baza sekin ishlayapti' degan taxmin qabul qilinmaydi. 'Mana APM grafigi: DB so'rovi 12 ms, lekin tashqi HTTP API 2.4 soniya vaqt olyapti' degan fakt bilan gapiriladi. Xdebug, Laravel Telescope va Blackfire/Tideways dalil to'plashda yordam beradi."
      ],
      priority: "core",
      level: "Strong Middle",
      practicalTask: "APM yoki loglar orqali xatolik aynan qaysi qatorda va qanday parametrlar bilan yuz berganini dalillar bilan isbotlang.",
      acceptanceCriteria: [
        "Hissiyot va taxminlar emas, aniq metrika va jurnallarga tayanadi",
        "Profil vositalaridan (Telescope, APM) to'liq foydalanadi"
      ],
      prerequisites: ["56.4", "58.2"]
    },
    {
      id: "81.7",
      title: "Divide and Conquer",
      description: [
        "Bo'lib tashla va hukmronlik qil (Divide and Conquer) — ulkan va chalkash muammoni ikkiga, to'rtga bo'lib, xato doirasini keskin toraytirish.",
        "",
        "Ikkilik qidiruv (Binary Search) usuli: Murakkab so'rov zanjirida muammo frontenddami yoki backenddami? Backendda bo'lsa, middleware'dami yoki controllerdami? Git bisection (`git bisect`) yordamida yuzlab commitlar orasidan aynan qaysi commit xatoni keltirib chiqarganini bir necha qadamda topish."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "100 ta commit orasidan xatolik kiritilgan commitni `git bisect` buyrug'i yordamida tezkor aniqlang.",
      acceptanceCriteria: [
        "Muammo maydonini ikki baravardan qisqartirib borish usulini qo'llaydi",
        "`git bisect` dan amalda samarali foydalana oladi"
      ],
      prerequisites: ["33.16"]
    },
    {
      id: "81.8",
      title: "Complexity Analysis",
      description: [
        "Algoritmik va tizimli murakkablikni baholash — taklif qilinayotgan yechim ma'lumotlar hajmi oshganda qanday ishlashini Big-O yordamida tahlil qilish.",
        "",
        "Vaqt murakkabligi: O(1), O(log N), O(N), O(N²); Xotira sarfi: O(1) vs O(N). 100 ta elementda zo'r ishlagan `in_array()` yoki nested foreach, 100 000 ta foydalanuvchida serverni qotirib qo'yishi mumkin. Senior dasturchi kod masshtabini oldindan ko'radi."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "O(N²) murakkablikda yozilgan massivlarni solishtirish algoritmini hash map (associative array) orqali O(N) ga tushiring.",
      acceptanceCriteria: [
        "Koddagi vaqt va xotira murakkabligini to'g'ri baholaydi",
        "Eksponentsial va kvadratik algoritmlarni chiziqli yoki logarifmik yechimlarga almashtiradi"
      ],
      prerequisites: ["1.1", "53.3"]
    },
    {
      id: "81.9",
      title: "Trade-off Evaluation",
      description: [
        "Murosalar tahlili (Trade-offs) — dasturiy muhandislikda mukammal yechim yo'qligini, har bir tanlovning o'z narxi va yutuqlari borligini anglash.",
        "",
        "Tezlik vs Xotira sarfi; Qulaylik vs Xavfsizlik; Kuchli izchillik (Strong Consistency) vs Yuqori mavjudlik (High Availability); Tayyor kutubxona ishlatish vs O'zimiz yozishimiz. Senior dasturchi biznes vaziyatiga qarab eng to'g'ri murosani asoslab beradi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Ma'lumotlar bazasida denormalizatsiya qilishning yutuqlari (o'qish tezligi) va xatarlarini (ma'lumotlar ziddiyati) taqqoslang.",
      acceptanceCriteria: [
        "Har bir texnik yechimning salbiy oqibatlarini oldindan ko'radi",
        "Biznes sharoitidan kelib chiqib eng optimal murosani tanlaydi"
      ],
      prerequisites: ["66.20", "82.4"]
    },
    {
      id: "81.10",
      title: "Risk Identification",
      description: [
        "Xatarlarni oldindan aniqlash — taklif qilinayotgan yechim tizimning boshqa qismlariga qanday kutilmagan zarar yetkazishi mumkinligini baholash.",
        "",
        "'Bu yangi indeks yozish tezligini sekinlashtirmaydimi?', 'Bu kesh tozalanishi kesh stampede (kesh lavinasi) keltirib chiqarmaydimi?', 'Tashqi API to'xtab qolsa bizning navbatlar tiqilib qolmaydimi?'. Xatarlarni oldindan ko'rib, himoya choralarini (Circuit Breaker, Rate Limit, Fallback) kiritish."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Yangi qo'shilayotgan xizmat uchun 3 ta potentsial xavfni va ularni yumshatish (mitigation) rejalarini tuzing.",
      acceptanceCriteria: [
        "Kaskadli nosozliklar (cascading failures) xavfini oldindan ko'radi",
        "Himoya mexanizmlarini (timeouts, circuit breaker) loyihaga kiritadi"
      ],
      prerequisites: ["68.10", "78.12"]
    },
    {
      id: "81.11",
      title: "Edge Case Analysis",
      description: [
        "Chekka va chegaraviy holatlarni tahlil qilish — odatiy 'happy path' dan tashqaridagi barcha g'ayritabiiy sharoitlarni modellashtirish.",
        "",
        "Nol balans, bo'sh satr, bir vaqtning o'zida yuborilgan parallel ikkita so'rov, vaqt zonalari farqi, kutilmagan null qiymatlar, katta hajmdagi kutilmagan fayllar. Ushbu holatlar uchun unit testlar va himoya shartlari yoziladi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Foydalanuvchi hisobidan pul yechish funksiyasi uchun 6 ta turli chekka holatlarni aniqlab, testlarini yozing.",
      acceptanceCriteria: [
        "Chegaraviy qiymatlarni (boundary values) to'liq qamrab oladi",
        "Parallel operatsiyalardagi poyga holatlarini bartaraf etadi"
      ],
      prerequisites: ["27.8", "72.9"]
    },
    {
      id: "81.12",
      title: "Prioritization",
      description: [
        "Muammolar ko'p bo'lganda to'g'ri ustuvorlikni belgilash — qaysi muammoni zudlik bilan, qaysinisini esa keyinroq hal qilish kerakligini ajratish.",
        "",
        "Xatolik darajalari: P0 / Blocker (to'lovlar ishlamayapti, butun tizim yotgan — hamma ish to'xtatilib bunga tashlanadi); P1 / Critical (asosiy funksiyalardan biri ishlamayapti); P2 / Major (muqobil yo'li bor muammo); P3 / Minor (vizual mayda xato). Barcha muammolarni bir vaqtda vahima bilan hal qilib bo'lmaydi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "5 ta turli xatoliklar kelib tushganda ularni og'irlik darajasiga (P0 dan P3 gacha) qarab to'g'ri saralang.",
      acceptanceCriteria: [
        "Biznesga ta'sir darajasi bo'yicha to'g'ri ustuvorlik o'rnatadi",
        "Kritik nosozliklar paytida sovuqqonlik bilan diqqatni asosiy muammoga qaratadi"
      ],
      prerequisites: ["78.7"]
    },
    {
      id: "81.13",
      title: "Solution Validation",
      description: [
        "Yechimni amalda tekshirish — kiritilgan tuzatish haqiqatan ham muammoni hal qilganligini va yangi xatolar keltirib chiqarmaganligini isbotlash.",
        "",
        "Faqat kodga qarab 'menimcha to'g'ri bo'ldi' deyish yetarli emas. Avval xato yuz bergan stsenariy qayta ishga tushirilib, natija tekshiriladi; Staging muhitida sinovdan o'tkaziladi; Metrikalar va loglar kuzatiladi. Tuzatish boshqa funksiyalarga ta'sir qilmagani tasdiqlanadi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Tuzatilgan xatolikni ishlab chiqarishga chiqarishdan oldin Staging va avtotestlar orqali to'liq tekshirish dalilini taqdim eting.",
      acceptanceCriteria: [
        "Xatoning to'liq yo'qolganligini dalillar bilan tasdiqlaydi",
        "Tuzatish yangi regressiya chaqirmaganligini tekshiradi"
      ],
      prerequisites: ["81.3", "81.6"]
    },
    {
      id: "81.14",
      title: "Regression Prevention",
      description: [
        "Regressiyaning oldini olish — tuzatilgan xatoning kelajakda boshqa dasturchi tomonidan tasodifan yana paydo qilinishini tizimli bloklash.",
        "",
        "Eng ishonchli usul — topilgan nosozlik uchun regressiya testini yozish va uni doimiy CI ga qo'shish. Kod o'zgarsa ham, bu test yiqilib, xatolik qaytishini taqiqlaydi. Shuningdek, xato ehtimoli bo'lgan joylarga static analysis (PHPStan) yoki qat'iy tiplar qo'yiladi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Ishlab chiqarishda aniqlangan har bir xato uchun majburiy regressiya testi yozish qoidasini joriy qiling.",
      acceptanceCriteria: [
        "Xatoliklarni tuzatish bilan birga test yozishni odatga aylantiradi",
        "CI quvuri orqali xatoning qayta paydo bo'lishini to'xtatadi"
      ],
      prerequisites: ["73.14", "74.7"]
    },
    {
      id: "81.15",
      title: "Incident Learning",
      description: [
        "Hodisalardan saboq chiqarish (Post-Mortem / Incident Review) — yirik avariyalar yuz berganda aybdorni jazolash emas, tizimni mustahkamlash uchun xulosa chiqarish.",
        "",
        "Blameless Post-Mortem hujjati: Nima bo'ldi? Qachon aniqlandi? Qancha vaqtda tuzatildi? Asl sababi nima edi? Kelajakda bunday bo'lmasligi uchun qanday harakatlar qilinadi (Action Items)? Masalan: yangi alert qo'yish, test yozish, runbook tuzish."
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Saytning 1 soatlik uzilishi (outage) bo'yicha to'liq Blameless Post-Mortem tahlil hujjatini tuzing.",
      acceptanceCriteria: [
        "Shaxsni ayblashdan qochib, tizimli xatoliklarni tahlil qiladi",
        "Kelajakda takrorlanmasligi uchun aniq profilaktik vazifalar (Action Items) belgilaydi"
      ],
      prerequisites: ["78.11", "81.4"]
    },
    {
      id: "81.16",
      title: "Communicating Findings",
      description: [
        "Xulosalarni to'g'ri yetkazish — topilgan muammo va yechimni turli auditoriyaga (rahbariyat, mijozlar, jamoa) mos tilda tushuntira olish.",
        "",
        "Boshqaruvga: biznesga ta'siri, moliyaviy yo'qotish va ko'rilgan choralar qisqa aytiladi; Jamoaga: texnik sabablar, koddagi xato, arxitekturaviy saboqlar batafsil yoritiladi. Shaffof va xotirjam muloqot ishonchni mustahkamlaydi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Kritik nosozlik bo'yicha ham texnik jamoaga, ham biznes rahbariga mo'ljallangan 2 ta alohida hisobot yozing.",
      acceptanceCriteria: [
        "Auditoriyaga qarab texnik detallar darajasini to'g'ri moslashtiradi",
        "Vahimasiz, aniq va ishonchli professional kommunikatsiyani ta'minlaydi"
      ],
      prerequisites: ["80.17", "84.13"]
    }
  ]
});
