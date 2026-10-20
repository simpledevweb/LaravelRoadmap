/* 83 · Mentoring
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 83,
  slug: "mentoring",
  title: "Mentoring",
  group: "process",
  description: "Murabbiylik (Mentoring) — Senior muhandisning o'z bilim, tajriba va muhandislik madaniyatini Junior va Middle dasturchilarga yetkazish orqali butun jamoa salohiyatini oshirish san'atidir. Senior dasturchi shunchaki yakkaxon yulduz emas, balki atrofidagilarni o'stiruvchi 'ko'paytiruvchi' (Multiplier) hisoblanadi. Juftlikda dasturlash (Pair Programming), Code Review orqali o'rgatish, mikromenejmentsiz yo'naltirish va mustaqil fikrlashni rivojlantirish orqali kuchli jamoani shakllantiradi.",
  subskills: [
    {
      id: "83.1",
      title: "Knowledge Sharing",
      description: [
        "Bilimlarni jamoa bilan muntazam bo'lishish — bilimlarni bitta odam miyasida monopoliyaga aylanib qolishining (Knowledge Silos) oldini olish.",
        "",
        "Haftalik yoki oylik 'Tech Talks' / 'Brown Bag' sessiyalari, yangi o'rganilgan texnologiyalar (masalan: PHP 8.4 yangiliklari, yangi kesh strategiyasi) bo'yicha taqdimotlar va ichki bilimlar bazasini (Wiki, Notion) yuritish orqali jamoaning umumiy texnik saviyasi ko'tariladi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Jamoa uchun yangi arxitekturaviy naqsh yoki Laravel imkoniyati bo'yicha 20 daqiqalik taqdimot va amaliy namuna tayyorlang.",
      acceptanceCriteria: [
        "Bilimlarni o'zida yopib qo'ymasdan jamoaga ochiq ulashadi",
        "Murakkab texnik mavzular bo'yicha qiziqarli taqdimotlar o'tkazadi"
      ],
      prerequisites: ["72.20"]
    },
    {
      id: "83.2",
      title: "Onboarding Developers",
      description: [
        "Yangi muhandislarni jamoaga moslashtirish (Buddy tizimi) — yangi kelgan xodimni tez va ruhiy xotirjamlikda ishga kiritish.",
        "",
        "Senior muhandis unga 'Buddy' (yo'lko'rsatuvchi do'st) sifatida biriktiriladi: loyiha arxitekturasini tushuntiradi, kod bazasini ko'rsatadi, birinchi 'good-first-issue' vazifalarini birga yechadi va jamoa madaniyati bilan tanishtiradi. Maqsad: yangi kelgan xodim o'zini yolg'iz his qilmasligi kerak."
      ],
      priority: "core",
      level: "Strong Middle",
      practicalTask: "Yangi Junior dasturchi uchun birinchi haftalik 'Buddy' rejasini va unga beriladigan 2 ta kirish vazifasini tuzing.",
      acceptanceCriteria: [
        "Yangi xodimning jamoaga tez va xavfsiz qo'shilishini ta'minlaydi",
        "Dastlabki muammolarni bartaraf etishda samimiy yordam beradi"
      ],
      prerequisites: ["80.13"]
    },
    {
      id: "83.3",
      title: "Explaining Technical Concepts",
      description: [
        "Texnik tushunchalarni sodda tushuntira olish — Feynmann texnikasi: agar siz tushunchani sodda so'zlar bilan tushuntirib berolmasangiz, demak o'zingiz ham uni yetarlicha tushunmagansiz.",
        "",
        "Kompilyatsiya, asinxronlik, Dependency Injection, indekslar yoki kesh muammolarini hayotiy misollar va analogiyalar orqali tushuntirish. Tinglovchining bilim darajasiga qarab tilni moslashtirish."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Junior dasturchiga 'Database Indexes qanday ishlaydi?' mavzusini kitobiy so'zlarsiz, kutubxona katalogi analogiyasi bilan tushuntiring.",
      acceptanceCriteria: [
        "Murakkab tushunchalarni sodda va tushunarli analogiyalar bilan yetkazadi",
        "Suhbatdoshining tushunganligini savol-javob orqali tekshiradi"
      ],
      prerequisites: ["80.17"]
    },
    {
      id: "83.4",
      title: "Pair Programming",
      description: [
        "Juftlikda dasturlash (Pair Programming) — bitta kompyuterda yoki umumiy ekran orqali birgalikda kod yozish (Driver va Navigator rollari).",
        "",
        "Junior dasturchi kod yozadi (Driver), Senior esa yo'nalish beradi, chekka holatlarni eslatadi va arxitekturani nazorat qiladi (Navigator). Bu bilimlarni o'tkazishning eng tez va interaktiv usuli bo'lib, Junior ning fikrlash tezligini keskin oshiradi."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Junior dasturchi bilan 1 soatlik Pair Programming sessiyasini o'tkazib, murakkab refactoring vazifasini birgalikda yeching.",
      acceptanceCriteria: [
        "Driver va Navigator rollarini to'g'ri taqsimlaydi",
        "Kodni o'zi yozib ketmasdan, mentiga yo'l ko'rsatish orqali yozdiradi"
      ],
      prerequisites: ["73.2"]
    },
    {
      id: "83.5",
      title: "Code Review Mentoring",
      description: [
        "Code Review ni o'qitish vositasi sifatida qo'llash — PR sharhlarida shunchaki xatoni aytib ketmasdan, 'Nega?' va 'Qanday yaxshiroq qilish mumkin?'ni o'rgatish.",
        "",
        "Izohlarda rasmiy hujjatlar yoki yaxshi maqolalarga havolalar berish, muqobil yechim kodidan namuna ko'rsatish va muallifning to'g'ri yozgan chiroyli joylarini maqtab rag'batlantirish (Positive reinforcement)."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Junior ning PR iga uning xatosini kamsitmasdan tushuntiruvchi va o'sishiga yordam beruvchi 3 ta ibratli sharh yozing.",
      acceptanceCriteria: [
        "Code Review ni jazo emas, ta'lim vositasi sifatida qo'llaydi",
        "Havolalar va yaxshi amaliyotlar bilan o'rtoqlashadi"
      ],
      prerequisites: ["72.15", "72.20"]
    },
    {
      id: "83.6",
      title: "Giving Constructive Feedback",
      description: [
        "Konstruktiv teskari aloqa berish madaniyati — qachon, qanday va qaysi ohangda xatolarni ko'rsatish.",
        "",
        "Yuzma-yuz muloqotda, shaxsiyatni emas, faqat xatti-harakat va natijani muhokama qilish ('Sen e'tiborsizsan' emas, balki 'Bu PR da testlar yozilmay qolibdi, bu regressiyaga olib kelishi mumkin'). SBI modeli (Situation - Behavior - Impact): Vaziyat, Xatti-harakat va uning Tizimga ta'siri."
      ],
      priority: "core",
      level: "Strong Middle",
      practicalTask: "Tez-tez test yozishni unutadigan dasturchiga SBI modeli asosida konstruktiv yakkama-yakka (1-on-1) fikr bildiring.",
      acceptanceCriteria: [
        "SBI (Situation, Behavior, Impact) modeliga tayanadi",
        "Insonni xafa qilmasdan, ijobiy o'zgarishga undaydi"
      ],
      prerequisites: ["72.15"]
    },
    {
      id: "83.7",
      title: "Delegating Learning Tasks",
      description: [
        "O'sishga xizmat qiluvchi vazifalarni topshirish (Delegatsiya) — o'quvchining joriy bilim darajasidan biroz yuqoriroq (Zone of Proximal Development) vazifalarni unga ishonib topshirish.",
        "",
        "Hamma qiziq va murakkab vazifalarni Senior o'zi bajarib, Juniorga faqat zerikarli mayda ishlarni tashlamasligi kerak. Kichik riskli, lekin yangi texnologiyani talab qiluvchi vazifalar mentiga topshiriladi va zarur bo'lsa maslahat bilan qo'llab-quvvatlanadi."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "O'z zimmangizdagi murakkabroq vazifani Junior dasturchiga uning bilimini oshirish maqsadida to'g'ri ko'rsatmalar bilan topshiring.",
      acceptanceCriteria: [
        "Vazifani shunchaki tashlab ketmasdan, xavfsizlik doirasini (guardrails) belgilaydi",
        "O'quvchining mustaqil o'sishi uchun qulay vazifalar tanlaydi"
      ],
      prerequisites: ["84.7"]
    },
    {
      id: "83.8",
      title: "Identifying Skill Gaps",
      description: [
        "Bilimlardagi bo'shliqlarni aniqlash — mentining qaysi sohalarda oqsashini (masalan: SQL indekslari, Docker, Git rebase, avtotestlar) aniqlash.",
        "",
        "Uning PR larini tahlil qilish, savollarini tinglash va qayerda qiynalayotganini kuzatish. Ko'pincha dasturchi o'zi bilmagan narsasini bilmasligini ham anglamasligi mumkin (Unconscious Incompetence)."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "Jamoangizdagi dasturchining so'nggi 1 oyda yozgan kodlarini ko'rib chiqib, uning asosiy 3 ta bilim bo'shlig'ini aniqlang.",
      acceptanceCriteria: [
        "Bilim bo'shliqlarini ob'ektiv mezonlar asosida topadi",
        "Kamchiliklarni to'ldirish uchun aniq mavzular ro'yxatini tuzadi"
      ],
      prerequisites: ["72.8"]
    },
    {
      id: "83.9",
      title: "Individual Development Plans",
      description: [
        "Shaxsiy rivojlanish rejasi (IDP) — har bir dasturchi uchun 3–6 oylik maqsadli o'sish xaritasini tuzish.",
        "",
        "Hozirgi daraja (Current State), erishilishi kutilayotgan daraja (Target State — masalan Junior dan Middle ga o'tish), o'qilishi kerak bo'lgan kitoblar/kurslar, amalda bajarilishi kerak bo'lgan loyiha vazifalari va muvaffaqiyat mezonlari aniq belgilanadi."
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Junior Laravel dasturchisi 6 oy ichida Strong Middle darajasiga chiqishi uchun oylik qadamlardan iborat IDP rejasini yozing.",
      acceptanceCriteria: [
        "O'lchanadigan va erishsa bo'ladigan shaxsiy rivojlanish rejasi tuzadi",
        "Nazariya va amaliyot mutanosibligini ta'minlaydi"
      ],
      prerequisites: ["83.8"]
    },
    {
      id: "83.10",
      title: "Supporting Independent Problem Solving",
      description: [
        "Mustaqil fikrlashni qo'llab-quvvatlash — dasturchi har bir mayda savol bilan yugurib kelishiga yo'l qo'ymaslik, balki uni mustaqil yechim topishga o'rgatish.",
        "",
        "Tayyor javobni aytish o'rniga, yo'naltiruvchi savollar berish: 'Xatolik matnini o'qidingmi?', 'Loglarda nima deyilyapti?', 'Hujjatning qaysi bo'limida bu haqda yozilgan?'. Maqsad — dasturchini o'ziga qaram qilish emas, balki uning mustaqil muhandislik intuitsiyasini shakllantirish."
      ],
      priority: "core",
      level: "Strong Middle",
      practicalTask: "Savol bilan kelgan dasturchiga tayyor kodni bermasdan, uning o'zi yechim topishi uchun 3 ta yo'naltiruvchi savol bilan maslahat bering.",
      acceptanceCriteria: [
        "Baliq berish o'rniga qarmoq tutishni o'rgatadi",
        "Mentining mustaqil qidirish va tahlil qilish ko'nikmasini o'stiradi"
      ],
      prerequisites: ["81.1"]
    },
    {
      id: "83.11",
      title: "Technical Documentation",
      description: [
        "Murabbiy sifatida jamoani hujjat yozishga o'rgatish — bilimlarni yozma qayd etish madaniyatini shakllantirish.",
        "",
        "Agar dasturchi bitta muammoni hal qilish uchun 2 kun vaqt sarflagan bo'lsa, Senior unga: 'Ajoyib! Endi bu muammo va uning yechimini ichki Wiki/Notion da 5 ta gap bilan yozib qo'y, toki boshqalar ham 2 kun yo'qotmasin' deb yo'naltiradi."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Murakkab masalani yechgan dasturchiga uning yechimini jamoaviy Troubleshooting qo'llanmasiga kiritish bo'yicha ko'rsatma bering.",
      acceptanceCriteria: [
        "Jamoada yozma madaniyatni (documentation culture) singdiradi",
        "Shaxsiy bilimlarni jamoaviy boylikka aylantirishni o'rgatadi"
      ],
      prerequisites: ["80.16"]
    },
    {
      id: "83.12",
      title: "Progress Feedback",
      description: [
        "O'sish natijalarini muntazam baholab borish — har 2-4 haftada yakkama-yakka (1-on-1) uchrashuv o'tkazib, erishilgan yutuqlarni muhokama qilish.",
        "",
        "Dasturchi o'zining o'sayotganini his qilishi juda muhim: 'Qara, 2 oy oldin bu kabi SQL so'rovlarda xato qilarding, hozir esa juda toza va tezkor yozyapsan'. Bu ishonch va motivatsiya beradi."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "Mentining 1 oylik natijalari bo'yicha uning ijobiy siljishlari va navbatdagi maqsadlarini muhokama qiluvchi 1-on-1 uchrashuv rejasini tuzing.",
      acceptanceCriteria: [
        "Muntazam 1-on-1 muloqotlarni tashkil qiladi",
        "Dasturchining o'sishini e'tirof etib, motivatsiyasini mustahkamlaydi"
      ],
      prerequisites: ["83.6"]
    },
    {
      id: "83.13",
      title: "Coaching Without Micromanagement",
      description: [
        "Mikromenejmentsiz murabbiylik — orqasidan poylab turmasdan, xato qilishiga imkon berish orqali o'rgatish.",
        "",
        "Eng chuqur bilimlar — inson o'z xatolaridan olgan saboqlardir. Agar xato butun tizimni yiqitmasa (xavfsiz muhitda bo'lsa), unga xato qilishiga va o'sha xatoni o'zi tuzatishiga imkon berish kerak. Har bir qadamini nazorat qilish tashabbusni o'ldiradi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Junior dasturchi unchalik ideal bo'lmagan, lekin ishlovchi yechim yozganda qachon aralashish va qachon erkinlik berish mezonini belgilang.",
      acceptanceCriteria: [
        "Ortiqcha nazoratdan qochib, mustaqillik muhitini yaratadi",
        "Xatolarni o'rganish imkoniyati sifatida qabul qiladi"
      ],
      prerequisites: ["83.10"]
    },
    {
      id: "83.14",
      title: "Building Team Capability",
      description: [
        "Jamoaning umumiy qudratini oshirish — bitta kuchli Seniorga bog'lanib qolgan 'mo'rt' jamoa o'rniga, har bir a'zosi mustaqil va yuqori malakali bo'lgan mustahkam jamoa barpo etish.",
        "",
        "Jamoaning 'Bus Factor' (agar bitta Seniorni avtobus urib ketsa loyiha nima bo'ladi?) ko'rsatkichini oshirish. Barcha tizimlar bo'yicha bilimlar teng taqsimlangan bo'lsa, loyiha har qanday kutilmagan vaziyatda barqaror yashay oladi."
      ],
      priority: "important",
      level: "Lead",
      practicalTask: "Loyiha bo'yicha 'Bus Factor' ni 1 dan kamida 3 ga oshirish uchun bilim almashish va mas'uliyatlarni taqsimlash rejasini tuzing.",
      acceptanceCriteria: [
        "Jamoaning yagona odamga bog'liqlik xatarini bartaraf etadi",
        "Kollektiv malaka va o'zaro almashtiriluvchanlikni ta'minlaydi"
      ],
      prerequisites: ["84.6"]
    }
  ]
});
