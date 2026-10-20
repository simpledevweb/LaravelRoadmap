/* 73 · Refactoring
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 73,
  slug: "refactoring",
  title: "Refactoring",
  group: "code-quality",
  description: "Refactoring — mavjud kodning tashqi xatti-harakatini (tashqi natijasini) o'zgartirmasdan, uning ichki tuzilishi, o'qiluvchanligi va qo'llab-quvvatlanuvchanligini yaxshilash san'atidir. Senior Laravel dasturchi kod hidlarini (Code Smells) darhol ilg'aydi, avtomatlashtirilgan testlar himoyasi ostida kichik qadamlar bilan xavfsiz o'zgartirishlar kiritadi va texnik qarzni nazorat ostida ushlab turadi. Shuningdek, noldan qayta yozish (rewrite) bilan tizimli yaxshilash o'rtasidagi to'g'ri muhandislik qarorini qabul qiladi.",
  subskills: [
    {
      id: "73.1",
      title: "Code Smell Identification",
      description: [
        "Kod hidlari (Code Smells) — koddagi jiddiy muammo yoki arxitekturaviy xatolikdan darak beruvchi alomatlar.",
        "",
        "Klassik hidlar: Long Method (haddan tashqari uzun funksiya), Large Class / God Object (hamma narsani qiluvchi ulkan klass), Long Parameter List (5+ parametrli metod), Primitive Obsession (qiymat obyektlari o'rniga oddiy string/int ishlatish), Feature Envy (boshqa klass ma'lumotlariga ortiqcha suqlanish) va Shotgun Surgery (bitta kichik o'zgarish uchun 10 ta faylga teginish zarurati)."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Mavjud Laravel loyihasida 3 xil Code Smell (masalan God Controller, Feature Envy, Long Method) ni topib, ularni hujjatlashtiring.",
      acceptanceCriteria: [
        "Asosiy kod hidlarini koddanoq aniqlay oladi",
        "Har bir hid qanday texnik muammoga olib kelishini tushuntiradi"
      ],
      prerequisites: ["6.12"]
    },
    {
      id: "73.2",
      title: "Extract Method",
      description: [
        "Metodga ajratish (Extract Method) — eng ko'p qo'llaniladigan asosiy refactoring usuli bo'lib, uzun kod bo'lagini alohida, nomidan maqsadi ma'lum bo'lgan kichik metodga ko'chirishdir.",
        "",
        "Agar kod bo'lagi nima qilayotganini tushunish uchun sharh (comment) o'qish talab qilinsa — bu o'sha bo'lakni yaxshi nomlangan alohida metodga ajratish uchun eng yaxshi ishoradir. Funksiyalar ixcham va faqat bitta ishni bajaruvchi bo'lib qoladi."
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "100 qatorlik murakkab controller metodini bir nechta mantiqiy kichik private metodlarga ajrating.",
      acceptanceCriteria: [
        "Metod hajmini qisqartiradi va o'qilishini yaxshilaydi",
        "Ajratilgan metodlarga aniq va mazmunli nomlar tanlaydi"
      ],
      prerequisites: ["6.2"]
    },
    {
      id: "73.3",
      title: "Extract Class",
      description: [
        "Klassga ajratish (Extract Class) — bitta klassga juda ko'p mas'uliyat yuklanganda (SRP buzilishi), bir-biriga bog'liq xususiyatlar va metodlarni alohida yangi klassga chiqarish.",
        "",
        "Laravel da eng mashhur namunasi: Fat Model yoki Fat Controllerdan buyurtma to'lovi mantiqini `PaymentGatewayService` yoki buyurtmani hisoblashni `OrderCalculationAction` alohida klassiga ko'chirishdir."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Foydalanuvchi modeli ichidagi parolni tiklash, SMS yuborish va hisob yopish metodlarini alohida xizmat (Service/Action) klasslariga ajrating.",
      acceptanceCriteria: [
        "God Class larni to'g'ri aniqlaydi va bo'laklarga bo'ladi",
        "Yangi klasslar o'rtasida mas'uliyat chegaralarini aniq o'rnatadi"
      ],
      prerequisites: ["4.1", "73.2"]
    },
    {
      id: "73.4",
      title: "Rename",
      description: [
        "Nomlarni o'zgartirish (Rename) — noaniq, chalg'ituvchi yoki eskirgan o'zgaruvchilar, funksiyalar, parametrlar va klasslarni o'zining asl maqsadiga mos qilib qayta nomlash.",
        "",
        "Nomlash — dasturlashdagi eng qiyin ikkita narsadan biridir. Yaxshi nom berilgan kod qo'shimcha hujjat yoki sharhlarga ehtiyoj qoldirmaydi. Zamonaviy IDE refactoring imkoniyatlari (Shift+F6) orqali barcha havolalarni xavfsiz yangilash lozim."
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Loyihadagi `$res`, `$flag`, `$data`, `process()` kabi noaniq nomlarni domenga mos keluvchi aniq nomlarga o'zgartiring.",
      acceptanceCriteria: [
        "O'z-o'zini tushuntiruvchi (self-documenting) nomlar qo'llaydi",
        "IDE vositalari orqali xatoliksiz global rename amalga oshiradi"
      ],
      prerequisites: ["6.1"]
    },
    {
      id: "73.5",
      title: "Replace Conditional with Polymorphism",
      description: [
        "Shart operatorlarini polimorfizm bilan almashtirish — ob'ekt turi yoki statusiga qarab tekshiruvchi ulkan `switch` yoki `if/elseif` zanjirlarini polimorfik klasslar bilan almashtirish.",
        "",
        "Har safar yangi tur (masalan, yangi yetkazib berish xizmati) qo'shilganda hamma joydagi `switch` ni o'zgartirish o'rniga, umumiy interfeysni (`DeliveryProviderInterface`) amalga oshiruvchi yangi klass yaratiladi (Open/Closed Principle)."
      ],
      priority: "core",
      level: "Strong Middle",
      practicalTask: "To'lov turi bo'yicha (`click`, `payme`, `uzum`) yozilgan katta `switch` blokini polimorfik klasslar va Service Container factory'si bilan almashtiring.",
      acceptanceCriteria: [
        "OCP tamoyilini amalda qo'llay oladi",
        "Yangi turlar qo'shish uchun mavjud kodni o'zgartirish zaruratini yo'qotadi"
      ],
      prerequisites: ["3.4", "4.2"]
    },
    {
      id: "73.6",
      title: "Introduce Parameter Object",
      description: [
        "Parametr ob'ektini joriy qilish — birgalikda yuradigan bir guruh parametrlarni (masalan: boshlanish sanasi, tugash sanasi, status, limit) alohida ob'ektga (DTO yoki Value Object) birlashtirish.",
        "",
        "Bu metod signature'sini ixchamlashtiradi (`filter(FilterDto $dto)`), qat'iy tip xavfsizligini ta'minlaydi va kelajakda yangi parametr qo'shilganda metod signature'sini buzmaslikka imkon beradi."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "6 ta parametr qabul qiluvchi hisobot yaratish metodini bitta `ReportFilterData` DTO ob'ektiga o'tkazing.",
      acceptanceCriteria: [
        "Uzoq parametrlar ro'yxatini ixchamlashtiradi",
        "DTO orqali tiplar aniqligini va validatsiyani mustahkamlaydi"
      ],
      prerequisites: ["1.7", "64.12"]
    },
    {
      id: "73.7",
      title: "Dependency Injection",
      description: [
        "Bog'liqliklarni in'yeksiya qilish — klass ichida boshqa xizmatlarni `new Service()` orqali yaratish o'rniga, ularni konstruktor yoki metod orqali tashqaridan uzatish.",
        "",
        "Bu klasslarni bir-biriga qattiq bog'lanib qolishidan qutqaradi va birlik testlarida (Unit Testing) tashqi xizmatlarni osonlikcha soxtalashtirish (Mocking) imkonini beradi. Laravel Service Container buni avtomatik tarzda amalga oshiradi."
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Metod ichida `new CurlClient()` ishlatgan klassni konstruktor orqali `HttpClientInterface` qabul qiladigan qilib o'zgartiring.",
      acceptanceCriteria: [
        "Qattiq bog'liqliklarni ajratadi va testlanuvchanlikni oshiradi",
        "Laravel Service Container orqali avtomatik bog'liqlik yuklashni biladi"
      ],
      prerequisites: ["2.8", "4.5"]
    },
    {
      id: "73.8",
      title: "Reduce Coupling",
      description: [
        "Bog'liqlik darajasini kamaytirish (Low Coupling) — bitta modul yoki klassning boshqa komponentlar ichki tuzilishiga qaramligini minimal darajaga tushirish.",
        "",
        "Demeter qonuni (Law of Demeter — faqat bevosita do'stlaring bilan gaplash) qo'llaniladi. Masalan `$order->getUser()->getCompany()->getAddress()->getCity()` zanjiri o'rniga `$order->getDeliveryCity()` shakliga keltiriladi. Interfeyslar va Event'lar orqali bog'liqliklar yechiladi."
      ],
      priority: "core",
      level: "Strong Middle",
      practicalTask: "Boshqa tizimning ichki modellariga chuqur bog'langan zanjirli chaqiruvlarni aniqlab, ularni Law of Demeter asosida qisqartiring.",
      acceptanceCriteria: [
        "Modullar orasidagi o'zaro qaramlikni pasaytiradi",
        "Demeter qonuni va interfeyslar orqali bog'lanishlarni yengillashtiradi"
      ],
      prerequisites: ["3.11", "61.16"]
    },
    {
      id: "73.9",
      title: "Improve Cohesion",
      description: [
        "Klass ichki yaxlitligini oshirish (High Cohesion) — bitta klass ichidagi barcha metodlar va xususiyatlar yagona va umumiy bitta maqsadga xizmat qilishi.",
        "",
        "Agar klass ichidagi ayrim metodlar klass xususiyatlarining yarmidan, boshqalari esa qolgan yarmidan foydalansa — bu klass ikkita mustaqil vazifani bajarayotganini bildiradi. Bunday holatda klass ikkiga ajratilishi lozim."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "Ikkita turli biznes domeniga aralashib ketgan Helper klassini ikkita yuqori yaxlitlikka ega bo'lgan klasslarga ajrating.",
      acceptanceCriteria: [
        "Klass ichidagi metodlarning yagona maqsadga birlashganligini tahlil qiladi",
        "Kam yaxlitlikka (low cohesion) ega tuzilmalarni bartaraf etadi"
      ],
      prerequisites: ["3.11", "73.3"]
    },
    {
      id: "73.10",
      title: "Remove Duplication",
      description: [
        "Takrorlanishlarni bartaraf etish (DRY) — turli joylarda bir xil yoki deyarli o'xshash kodlar nusxalanib ishlatilishining oldini olish.",
        "",
        "Kodni shunchaki nusxalab qo'yish (copy-paste) oqibatida bitta xatoni tuzatish uchun 5 ta joyda o'zgartirish kiritishga to'g'ri keladi. Ammo ehtiyot bo'lish lozim: turli domenlardagi tasodifiy o'xshashlikni (accidental duplication) sun'iy umumlashtirish ortiqcha chalkashlikka olib kelishi mumkin."
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "3 ta turli Controllerda takrorlangan fayl yuklash va rasm hajmini o'zgartirish kodini yagona xizmatga birlashtiring.",
      acceptanceCriteria: [
        "DRY tamoyilini to'g'ri qo'llaydi",
        "Haqiqiy takrorlanish bilan tasodifiy o'xshashlik orasidagi farqni ajratadi"
      ],
      prerequisites: ["6.4", "6.8"]
    },
    {
      id: "73.11",
      title: "Simplify Conditionals",
      description: [
        "Shartli konstruksiyalarni soddalashtirish — o'qish qiyin bo'lgan if/else, ternary operatorlar va murakkab boolean ifodalarni tozalash.",
        "",
        "Asosiy usullar: Guard Clauses orqali tezkor qaytish, murakkab boolean shartlarni tushunarli boolean metodga chiqarish (`$user->isEligibleForDiscount()`), `null-coalescing` (`??`) va `null-safe` (`?->`) operatorlaridan to'g'ri foydalanish."
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Tarkibida 5 ta mantiqiy `&&` va `||` bo'lgan shartni nomlangan metodlarga ajratib, o'qilishini soddalashtiring.",
      acceptanceCriteria: [
        "Chuqur qavatli shartlarni Guard Clause bilan yo'qotadi",
        "Murakkab mantiqiy ifodalarni nomlangan metodlarga o'tkazadi"
      ],
      prerequisites: ["6.11"]
    },
    {
      id: "73.12",
      title: "Safe Database Refactoring",
      description: [
        "Ma'lumotlar bazasini xavfsiz refactoring qilish — jadval tuzilishi va ustun nomlarini ishlab turgan production tizimida nol uzilish bilan o'zgartirish.",
        "",
        "Expand and Contract (Parallel Run) namunasi qo'llaniladi: 1) Yangi ustun qo'shiladi; 2) Yangi va eski ustunga parallel yoziladi; 3) Eski ma'lumotlar fonga o'tkaziladi; 4) O'qish yangi ustunga o'tkaziladi; 5) Keyingi relizda eski ustun o'chiriladi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Millionlab qatorli jadvaldagi ustun nomini foydalanuvchilar uchun hech qanday uzilishsiz o'zgartirish bosqichlarini loyihalang.",
      acceptanceCriteria: [
        "Expand-Contract naqshini amalda qo'llay oladi",
        "Production ma'lumotlar yo'qolishi va downtime xavfini bartaraf etadi"
      ],
      prerequisites: ["14.17", "72.14"]
    },
    {
      id: "73.13",
      title: "Behavior-Preserving Changes",
      description: [
        "Xatti-harakatni saqlab qolish kafolati — refactoringning fundamental qoidasi: kod qanchalik o'zgarmasin, tizimning tashqi xatti-harakati va natijasi mutlaqo o'zgarmasligi shart.",
        "",
        "Agar yangi funksionallik qo'shilsa yoki mavjud xatti-harakat o'zgarsa — bu refactoring emas, yangi xususiyat (feature) yoki xato tuzatishdir. Xatti-harakat saqlanganligini faqat o'zgarmas qolgan va yashil yonayotgan testlar orqali kafolatlash mumkin."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Kodni refactoring qilishdan oldin uning joriy xatti-harakatini to'liq qamrab oluvchi test yozing va refactoringdan so'ng test o'tishini isbotlang.",
      acceptanceCriteria: [
        "Refactoring va xususiyat qo'shish jarayonlarini qat'iy ajratadi",
        "Tashqi API yoki natija buzilmasligini kafolatlaydi"
      ],
      prerequisites: ["30.4"]
    },
    {
      id: "73.14",
      title: "Regression Tests",
      description: [
        "Regressiya testlari — refactoring jarayonida yoki yangi o'zgarishlar kiritilganda ilgari ishlagan funksiyalar buzilmaganligini tekshiruvchi testlar zanjiri.",
        "",
        "Refactoring qilishdan oldin mavjud kod atrofida 'xavfsizlik to'ri' (Safety Net) yaratilishi kerak. Agar testlar bo'lmasa, har qanday jasoratli refactoring fojiaga aylanishi mumkin. Har bir topilgan xatolik uchun avval regressiya testi yozilib, keyin kod to'g'rilanadi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Oldin testlanmagan murakkab hisob-kitob moduli uchun refactoring oldidan regressiya testlari to'plamini yozing.",
      acceptanceCriteria: [
        "Refactoringni mustahkam test to'ri ostida amalga oshiradi",
        "Regressiya xatolarining productionga chiqib ketishini to'xtatadi"
      ],
      prerequisites: ["27.1", "74.7"]
    },
    {
      id: "73.15",
      title: "Incremental Refactoring",
      description: [
        "Bosqichma-bosqich refactoring — katta va murakkab tizimlarni birdaniga emas, balki bir necha kichik, xavfsiz va alohida deploy qilinadigan qadamlar orqali yaxshilash.",
        "",
        "Haftalab davom etadigan va merge qilinmaydigan 'katta refactoring branch' lari o'rniga, har kuni masterga birlashtiriladigan mikroskopik o'zgarishlar kiritiladi. Bu merge ziddiyatlarini yo'qotadi va jamoa ishini to'xtatib qo'ymaydi."
      ],
      priority: "core",
      level: "Strong Middle",
      practicalTask: "Katta arxitekturaviy o'zgarishni 4 ta mustaqil va har biri alohida deploy qilinadigan kichik bosqichlarga bo'ling.",
      acceptanceCriteria: [
        "Katta o'zgarishlarni mikroskopik xavfsiz qadamlarga ajrata oladi",
        "Jamoaning kundalik rivojlanish tezligini pasaytirmaydi"
      ],
      prerequisites: ["33.4", "72.16"]
    },
    {
      id: "73.16",
      title: "Legacy Code Refactoring",
      description: [
        "Eski (Legacy) kod bilan ishlash — testlari bo'lmagan, hujjatlashtirilmagan va tushunish qiyin bo'lgan kod bazasini xavfsiz modernizatsiya qilish.",
        "",
        "Maykl Feathersning usullari qo'llaniladi: o'zgartirish kerak bo'lgan joy atrofida 'Characterization Tests' yozish, 'Boy Scout Rule' (lagerdan ketayotganda uni kelgandan ko'ra tozaroq qoldirish) va yangi kodni 'Sprout Method/Class' qilib ajratib yozish."
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "5 yil oldin yozilgan, testlari bo'lmagan 500 qatorlik spaghetti kod bo'lagiga Characterization Test yozib, uni xavfsiz modullarga ajrating.",
      acceptanceCriteria: [
        "Testlanmagan kodni xavfsiz qamrab olish usullarini biladi",
        "Eski kod bazasini bosqichma-bosqich modernizatsiya qiladi"
      ],
      prerequisites: ["73.14", "73.15"]
    },
    {
      id: "73.17",
      title: "Refactoring vs Rewriting",
      description: [
        "Refactoring yoki noldan qayta yozish qarori — dasturiy muhandislikdagi eng muhim strategik tanlovlardan biri.",
        "",
        "Noldan qayta yozish (The Big Rewrite) deyarli doim o'ylangandan 3x ko'p vaqt oladi, eski tizim yillar davomida hal qilgan yashirin chekka holatlarni yo'qotadi va biznesni to'xtatib qo'yadi. Senior dasturchi ko'pincha Strangulation Fig naqshi orqali tizimni bosqichma-bosqich yangilashni tanlaydi."
      ],
      priority: "important",
      level: "Lead",
      practicalTask: "Eski monolit loyihani to'liq noldan qayta yozish yoki Strangulation naqshi bilan refactoring qilish bo'yicha xarajat va xatarlar tahlilini (trade-off) tayyorlang.",
      acceptanceCriteria: [
        "Big Rewrite tuzog'ining xatarlarini tushuntiradi",
        "Biznes davomiyligini saqlagan holda evolyutsion modernizatsiyani asoslaydi"
      ],
      prerequisites: ["61.17", "82.3"]
    },
    {
      id: "73.18",
      title: "Technical Debt Prioritization",
      description: [
        "Texnik qarzni ustuvorlashtirish — barcha kamchiliklarni bir vaqtda tuzatib bo'lmasligini tushunib, biznesga eng ko'p zarar yetkazayotgan muammolarni birinchi o'ringa qo'yish.",
        "",
        "Texnik qarz matritsasi: qaysi kod qismi eng ko'p o'zgartiriladi (churn rate) va eng ko'p nosozlik (bug rate) keltirib chiqaradi? Kam tegiladigan eski kod qarz bo'lsa ham unga teginilmaydi; eng ko'p ishlanadigan modulning qarzi esa darhol to'lanishi shart."
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Jamoa texnik qarzlari ro'yxatini biznes ta'siri va xavf darajasiga qarab sprintlarga rejalashtirish uchun matritsa tuzing.",
      acceptanceCriteria: [
        "Texnik qarzni biznes qiymati va xatarlarga bog'lab baholaydi",
        "Product Owner bilan refactoring vazifalarini sprintga kiritishni kelisha oladi"
      ],
      prerequisites: ["6.13", "78.7"]
    }
  ]
});
