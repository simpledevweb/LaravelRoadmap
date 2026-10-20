/* 84 · Technical Leadership
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 84,
  slug: "technical-leadership",
  title: "Technical Leadership",
  group: "process",
  description: "Texnik yetakchilik (Technical Leadership) — muhandislik jamoasining texnik yo'nalishini (vision) belgilash, arxitektura standartlarini o'rnatish va jamoani biznes maqsadlariga yetaklash qobiliyatidir. Tech Lead va Senior muhandislar faqat shaxsiy kod yozish bilan cheklanmay, jamoaviy samaradorlikni oshiradi, texnik yo'l xaritalarini (Roadmap) tuzadi, avariya va favqulodda hodisalarda boshqaruvni (Incident Leadership) qo'lga oladi hamda biznes va dasturlash o'rtasidagi ko'prik vazifasini o'taydi.",
  subskills: [
    {
      id: "84.1",
      title: "Technical Direction",
      description: [
        "Texnik qarash va yo'nalish (Technical Vision) — loyihaning texnologik kelajagini 1-2 yil oldinga ko'ra bilish.",
        "",
        "Biz qaysi tomonga ketyapmiz? Qaysi eskirgan texnologiyalardan bosqichma-bosqich voz kechamiz? Yangi PHP/Laravel versiyalari, asinxron arxitektura va bulut servislariga qachon o'tamiz? Tech Lead jamoaga shunchaki 'bugungi topshiriq'ni emas, uzoq muddatli texnik strategiyani ko'rsatib beradi."
      ],
      priority: "core",
      level: "Lead",
      practicalTask: "Loyiha uchun keyingi 12 oyga mo'ljallangan Texnik Vizyon (Technical Vision) hujjatini ishlab chiqing.",
      acceptanceCriteria: [
        "Uzoq muddatli texnologik maqsadlarni aniq ifodalaydi",
        "Texnik maqsadlarni kompaniyaning biznes rejalariga muvofiqlashtiradi"
      ],
      prerequisites: ["61.19"]
    },
    {
      id: "84.2",
      title: "Architecture Ownership",
      description: [
        "Arxitektura egaligi — butun tizim arxitekturasining yaxlitligi, mustahkamligi va tozaligi uchun bosh mas'ul bo'lish.",
        "",
        "Bu degani hamma arxitekturani bitta odam o'zi chizadi degani emas. Tech Lead butun jamoaning arxitekturaviy takliflarini muhokama qiladi, ularni tekshiradi, lekin yakuniy texnik yaxlitlik uchun shaxsiy javobgarlikni o'z zimmasiga oladi."
      ],
      priority: "core",
      level: "Lead",
      practicalTask: "Loyiha bo'ylab arxitekturaviy qoidalar buzilishini tekshiruvchi mezonlar va avtomatlashtirilgan qoidalarni o'rnating.",
      acceptanceCriteria: [
        "Tizim yaxlitligi uchun mas'uliyatni qabul qiladi",
        "Arxitektura qarorlarining barqaror va izchil bo'lishini ta'minlaydi"
      ],
      prerequisites: ["61.1", "85.1"]
    },
    {
      id: "84.3",
      title: "Technical Standards",
      description: [
        "Texnik standartlarni o'rnatish — kod bazasining bir xil, sifatli va bashorat qilinadigan bo'lishini ta'minlovchi qonun-qoidalar.",
        "",
        "PSR-12 uslubi, Laravel Pint, PHPStan 8-daraja, Git branch nomlash standartlari, commit qoidalari (Conventional Commits), API javoblarining yagona formati. Standartlar shaxsiy fikr bilan emas, avtomatlashtirilgan CI linterlar orqali tekshirilishi kerak."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Jamoa uchun majburiy texnik standartlar, linter qoidalari va Git commit formatini belgilovchi hujjat tuzing.",
      acceptanceCriteria: [
        "Texnik standartlarni shakllantiradi va jamoa bilan kelishadi",
        "Standartlarni CI quvurida avtomatik tekshirishni yo'lga qo'yadi"
      ],
      prerequisites: ["8.1", "33.12"]
    },
    {
      id: "84.4",
      title: "Engineering Best Practices",
      description: [
        "Muhandislikning ilg'or amaliyotlarini joriy qilish — TDD, CI/CD, avtomatlashtirilgan testlash, xavfsiz migratsiyalar va monitoring madaniyatini yoyish.",
        "",
        "Yetakchi dasturchi nafaqat o'zi eng yaxshi amaliyotlarga rioya qiladi, balki jamoada ham 'test yozmasdan turib kod deploy qilinmasligi' yoki 'loglarsiz funksiya qabul qilinmasligi' kabi sog'lom muhandislik immunitetini hosil qiladi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Jamoada test yozish va xavfsiz migratsiyalar bo'yicha ilg'or amaliyotlarni joriy qilish rejasini tuzing.",
      acceptanceCriteria: [
        "Sanoat standartlaridagi ilg'or amaliyotlarni amalda qo'llaydi",
        "Jamoaning texnik yetuklik darajasini muntazam oshirib boradi"
      ],
      prerequisites: ["74.1", "72.19"]
    },
    {
      id: "84.5",
      title: "Technical Roadmaps",
      description: [
        "Texnik yo'l xaritalari (Technical Roadmaps) — texnik yangilanishlar, refactoring va infratuzilma modernizatsiyasining choraklik (Q1, Q2, Q3, Q4) rejasi.",
        "",
        "Masalan: Q1 — PHP 8.1 dan 8.3 ga o'tish va PHPStan level 5; Q2 — Monolitdan to'lov modulini mustaqil paketga ajratish; Q3 — Docker/Kubernetes ga o'tish; Q4 — CI quvurini 3 daqiqaga tushirish. Yo'l xaritasi Product Roadmap bilan hamohang rejalashtiriladi."
      ],
      priority: "important",
      level: "Lead",
      practicalTask: "Yillik 4 ta chorakka bo'lingan loyihaning Texnik Yo'l Xaritasini (Technical Roadmap) tuzing.",
      acceptanceCriteria: [
        "Texnik maqsadlarni vaqt bo'yicha ketma-ketlikka ajratadi",
        "Mahsulot funksiyalari bilan texnik modernizatsiyani muvozanatlashtiradi"
      ],
      prerequisites: ["84.1", "78.4"]
    },
    {
      id: "84.6",
      title: "Prioritization",
      description: [
        "Texnik vazifalarni ustuvorlashtirish — biznes vazifalari va texnik qarzlar o'rtasida muvozanatli balansni ta'minlash.",
        "",
        "Sprint vaqtining 70-80% i biznes xususiyatlariga (features), 20% i esa doimiy texnik qarzni to'lash, xatolarni tuzatish va kutubxonalarni yangilashga ajratilishini (20% Tech Time qoidasi) ta'minlash va buni biznesga himoya qilib berish."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Har bir sprintning 20% qismini texnik qarz va barqarorlikka ajratish bo'yicha Product Owner bilan kelishuv o'rnating.",
      acceptanceCriteria: [
        "Texnik qarzning to'planib portlashini oldini oladi",
        "Biznes manfaatlarini inkor qilmasdan texnik barqarorlikni saqlaydi"
      ],
      prerequisites: ["73.18", "78.7"]
    },
    {
      id: "84.7",
      title: "Cross-Team Coordination",
      description: [
        "Jamoalararo muvofiqlashtirish — backend jamoasining frontend, mobil (iOS/Android), DevOps, QA va mahsulot jamoalari bilan uzluksiz hamkorligini ta'minlash.",
        "",
        "Katta loyihalarda API shartnomalarini oldindan kelishish (API-First), blokirovkalar yuzaga kelmasligi uchun mock-serverlar berish va bitta relizda bir nechta jamoa o'zgarishlarini xavfsiz birlashtirish."
      ],
      priority: "important",
      level: "Lead",
      practicalTask: "Mobil va frontend jamoalari bilan yangi yirik funksiya bo'yicha API shartnomalari va reliz sanalarini muvofiqlashtiring.",
      acceptanceCriteria: [
        "Jamoalararo bog'liqliklar va to'siqlarni oldindan hal qiladi",
        "API-First yondashuvi orqali parallel ishlash imkonini yaratadi"
      ],
      prerequisites: ["75.1", "76.1"]
    },
    {
      id: "84.8",
      title: "Mentoring",
      description: [
        "Yetakchining murabbiylik roli — jamoa a'zolarini professional rivojlantirish va ularni yangi darajaga olib chiqish.",
        "",
        "Tech Lead o'zidan keyin yangi liderlarni tarbiyalaydi. U bilimlarni yashirmaydi, aksincha o'z o'rnini bosa oladigan kuchli muhandislarni yetishtirib, jamoaning texnik mustaqilligini oshiradi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Jamoangizdagi Middle dasturchining mustaqil arxitektura qarorlari qabul qila olishi uchun 3 oylik murabbiylik rejasini yuriting.",
      acceptanceCriteria: [
        "O'ziga qaram qilmasdan yangi mustaqil muhandislarni o'stiradi",
        "Jamoada o'rganish va o'zaro tajriba almashish muhitini qo'llab-quvvatlaydi"
      ],
      prerequisites: ["83.1", "83.14"]
    },
    {
      id: "84.9",
      title: "Delegation",
      description: [
        "Vazifalarni to'g'ri topshirish (Delegatsiya) — 'Buni o'zim qilsam tezroq va yaxshiroq bo'ladi' degan Senior tuzog'idan qutulish.",
        "",
        "Yetakchi hamma narsani o'zi qila olmaydi. Mas'uliyat va vakolat jamoa a'zolariga topshiriladi, chegaralar (boundaries) belgilanadi va natija qabul qilinadi. Delegatsiya — yetakchining vaqtini bo'shatadi va xodimlarni o'stiradi."
      ],
      priority: "important",
      level: "Lead",
      practicalTask: "Kritik bo'lgan yangi modulning arxitekturasini loyihalashni Middle dasturchiga topshiring va unga mentorlik qilib nazorat qiling.",
      acceptanceCriteria: [
        "Boshqaruv vakolatini xavfsiz topshira oladi",
        "Oqibatlar uchun mas'uliyatni o'zida saqlagan holda ijroni erkin qoldiradi"
      ],
      prerequisites: ["83.7", "83.13"]
    },
    {
      id: "84.10",
      title: "Risk Management",
      description: [
        "Loyihaviy va texnik xatarlarni tizimli boshqarish — nimalar noto'g'ri ketishi mumkinligini oldindan ko'rish va ehtiyot choralarini ko'rish.",
        "",
        "Xatarlar ro'yxati (Risk Register) yuritiladi: uchinchi tomon API lari ishlamay qolishi, server quvvati yetmay qolishi, asosiy kadrning ketib qolishi. Har bir xavf uchun uning ehtimoli, zarari va oldini olish choralari rejalashtiriladi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Loyiha uchun asosiy 5 ta texnik xavfni va ularning yechim rejalarini o'z ichiga olgan Xatarlar Matritsasini (Risk Matrix) tuzing.",
      acceptanceCriteria: [
        "Texnik va arxitekturaviy xatarlarni oldindan ko'ra oladi",
        "Xatarlarni yumshatish (mitigation) rejalarini ishlab chiqadi"
      ],
      prerequisites: ["78.12", "81.10"]
    },
    {
      id: "84.11",
      title: "Incident Leadership",
      description: [
        "Favqulodda hodisalarni boshqarish (Incident Commander) — ishlab chiqarish tizimi yiqilganda (Production Outage) boshqaruvni qo'lga olish.",
        "",
        "Vahimani to'xtatish, yagona aloqa kanalini (Incident Room) ochish, vazifalarni aniq taqsimlash (kim logni qaraydi, kim bazani tekshiradi, kim rahbariyatga xabar beradi), tezkor tiklash (Rollback / Failover) va hodisadan keyin Blameless Post-Mortem o'tkazish."
      ],
      priority: "core",
      level: "Lead",
      practicalTask: "Tizim to'liq ishdan chiqqan favqulodda vaziyatda (P0 Incident) jamoa harakatlarini muvofiqlashtiruvchi boshqaruv protokolini yozing.",
      acceptanceCriteria: [
        "Kritik vaziyatlarda xotirjamlik va aniq boshqaruvni ta'minlaydi",
        "Tezkor tiklash va hodisadan keyingi tahlil (Post-Mortem) jarayonini boshqaradi"
      ],
      prerequisites: ["81.15", "80.9"]
    },
    {
      id: "84.12",
      title: "Technical Debt Management",
      description: [
        "Texnik qarzni strategik boshqarish — texnik qarzning kritik massaga aylanib, loyiha rivojini to'xtatib qo'yishining oldini olish.",
        "",
        "Koddagi texnik qarzlar inventarizatsiyasi yuritiladi, ularning biznesga zarari baholanadi va har bir sprintda muntazam ravishda eng og'ir qismlar refactoring qilinadi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Loyihadagi to'plangan texnik qarzlar katalogini tuzing va ularni 2 chorak davomida bosqichma-bosqich yo'qotish strategiyasini yozing.",
      acceptanceCriteria: [
        "Texnik qarzni ko'rinadigan va o'lchanadigan shaklga keltiradi",
        "Biznes bilan texnik qarzni to'lash rejasini kelisha oladi"
      ],
      prerequisites: ["73.18", "82.15"]
    },
    {
      id: "84.13",
      title: "Stakeholder Communication",
      description: [
        "Rahbariyat va biznes egalari bilan muloqot — texnik muammolarni biznes tushunadigan tilda (foyda, yo'qotish, tezlik, risk) taqdim etish.",
        "",
        "Rahbariyatga 'Biz N+1 so'rovlarni hal qilishimiz kerak' deyish samarasiz; 'Biz bazani optimallashtirsak, server narxi oyiga $400 ga kamayadi va sahifa ochilishi 2 barobarga tezlashadi' deyish kerak. Bu ishonchni oshiradi va byudjet ajratilishini osonlashtiradi."
      ],
      priority: "core",
      level: "Lead",
      practicalTask: "Texnik arxitektura yangilanishi uchun zarur bo'lgan 2 haftalik to'xtashni biznes rahbarlariga asoslab bering.",
      acceptanceCriteria: [
        "Texnik jargonlarsiz biznes qiymatini aniq ifodalaydi",
        "Rahbariyat bilan ishonchli va shaffof aloqani ta'minlaydi"
      ],
      prerequisites: ["78.13", "81.16"]
    },
    {
      id: "84.14",
      title: "Delivery Quality",
      description: [
        "Yetkazib berish sifati va barqarorligi — tezlik deb sifatni qurbon qilmaslik tamoyili.",
        "",
        "Ko'pincha biznes tezroq chiqarishni talab qiladi. Yetakchi muhandis sifat darvozasini (Quality Gates) himoya qiladi: 'Ha, biz tez bajaramiz, lekin testlar va xavfsizlik tekshiruvlarisiz productionga chiqmaymiz'. Shoshma-shosharlik bilan chiqarilgan chala kod keyinroq 5 barobar ko'p vaqtni yutib ketadi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Tezlik uchun sifatni pasaytirishni talab qilayotgan bosim ostida sifat mezonlarini himoya qilish argumentlarini tayyorlang.",
      acceptanceCriteria: [
        "Tezlik va sifat o'rtasidagi oltin muvozanatni himoya qiladi",
        "Kompaniya obro'si va foydalanuvchilar ishonchini saqlaydi"
      ],
      prerequisites: ["74.20", "79.13"]
    },
    {
      id: "84.15",
      title: "Team Decision-Making",
      description: [
        "Jamoaviy qaror qabul qilish — diktatorlik qilmasdan, butun jamoaning aqlini va tajribasini birlashtirish.",
        "",
        "Konsensus va konsensus bo'lmaganda 'Disagree and Commit' (kelishmaymiz, lekin bajarishga kirishamiz) tamoyilini qo'llash. Agar jamoa qaror qabul qilish jarayonida ishtirok etsa, ular ushbu yechimning muvaffaqiyati uchun chin dildan kurashadi."
      ],
      priority: "important",
      level: "Lead",
      practicalTask: "Jamoada yangi texnologiya tanlovi bo'yicha bahsli uchrashuv o'tkazib, umumiy konsensusga yoki 'Disagree and Commit' kelishuviga erishing.",
      acceptanceCriteria: [
        "Diktatorlik qilmasdan jamoani umumiy qarorga olib keladi",
        "'Disagree and Commit' madaniyatini to'g'ri qo'llay oladi"
      ],
      prerequisites: ["82.14"]
    },
    {
      id: "84.16",
      title: "Conflict Resolution",
      description: [
        "Texnik va shaxslararo ziddiyatlarni hal qilish — dasturchilar o'rtasida qarashlar to'qnashuvi yuz berganda xolis hakamlik qilish.",
        "",
        "Bahslarni 'Kim haq?' emas, 'Loyiha va foydalanuvchi uchun qaysi biri yaxshiroq?' nuqtai nazariga burish. Shaxsiy ambitsiyalarni chetga surib, raqamlar, testlar va prototiplar orqali nizolarni professional yechish."
      ],
      priority: "important",
      level: "Lead",
      practicalTask: "Ikki dasturchi o'rtasida arxitektura tanlovi bo'yicha chiqqan qizg'in bahsni POC va metrikalar asosida xolis hal qiling.",
      acceptanceCriteria: [
        "Ziddiyatlarni shaxsiylashtirmasdan ob'ektiv dalillar bilan yechadi",
        "Jamoada sog'lom va do'stona muhitni saqlab qoladi"
      ],
      prerequisites: ["82.11"]
    },
    {
      id: "84.17",
      title: "Engineering Effectiveness",
      description: [
        "Muhandislik samaradorligini oshirish — dasturchilarning vaqtini oluvchi barcha zerikarli va takrorlanuvchi ishlarni yo'q qilish.",
        "",
        "CI/CD quvurlarini tezlashtirish, lokal muhitni (Docker Sail) bitta buyruq bilan ko'tariladigan qilish, sekin testlarni optimallashtirish va avtomatik kod generatorlaridan foydalanish. Dasturchi byurokratiyada emas, asosiy diqqatini kod yozishda o'tkazishi kerak."
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Dasturchilarning kundalik ish samaradorligini 20% ga oshiruvchi yangi avtomatlashtirilgan vositalar to'plamini loyihaga tatbiq eting.",
      acceptanceCriteria: [
        "Jamoaning kundalik to'siqlari va sekinlashtiruvchi omillarini yo'qotadi",
        "Dasturchilar qoniqishini (Developer Experience - DX) yaxshilaydi"
      ],
      prerequisites: ["74.18", "45.1"]
    },
    {
      id: "84.18",
      title: "Business and Technical Alignment",
      description: [
        "Biznes va texnika manfaatlari mushtarakligi — dasturiy ta'minot mustaqil san'at asari emas, biznesga xizmat qiluvchi asbob ekanligini anglash.",
        "",
        "Senior muhandis biznes modelni, kompaniya qanday pul ishlayotganini, raqobatchilarni va mijozlar talablarini tushunadi. Texnik qarorlar har doim kompaniyaning strategik maqsadlariga mos kelishi shart."
      ],
      priority: "core",
      level: "Lead",
      practicalTask: "Kompaniya biznes strategiyasi va daromad modelini o'rganib, unga xizmat qiluvchi texnologik ustuvorliklar xaritasini tuzing.",
      acceptanceCriteria: [
        "Kompaniya biznes maqsadlarini chuqur tushunadi",
        "Barcha texnik qarorlarni biznes rivojlanishi bilan uyg'unlashtiradi"
      ],
      prerequisites: ["84.1", "82.14"]
    }
  ]
});
