/* 78 · Agile
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 78,
  slug: "agile",
  title: "Agile",
  group: "process",
  description: "Agile metodologiyasi — o'zgaruvchan talablar va noaniqlik sharoitida qimmatli dasturiy mahsulotni bosqichma-bosqich, tezkor va moslashuvchan yetkazib berish falsafasidir. Senior Laravel dasturchi shunchaki texnik vazifalarni bajaruvchi emas, balki biznes maqsadlarini tushunuvchi, iterativ rivojlanishni yoqlovchi, topshiriqlarni baholash va ustuvorlashtirishda ishtirok etuvchi hamda doimiy takomillashuv (Kaizen) madaniyatini harakatlantiruvchi yetakchi muhandisdir.",
  subskills: [
    {
      id: "78.1",
      title: "Agile Principles",
      description: [
        "Agile manifestining 4 ta asosiy qadriyati va 12 ta tamoyili: jarayonlar va asboblardan ko'ra insonlar va o'zaro muloqot; keng qamrovli hujjatlardan ko'ra ishlovchi dasturiy ta'minot; shartnoma bo'yicha muzokaralardan ko'ra mijoz bilan hamkorlik; rejaga qat'iy ergashishdan ko'ra o'zgarishlarga tezkor javob berish.",
        "",
        "Senior muhandis loyihani oylab yashirincha qilib so'ngida foydasiz narsa chiqishining oldini oladi va har doim biznes uchun eng tez ishlovchi natijani taqdim etishga intiladi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Jamoangizning amaldagi rivojlanish jarayonini Agile manifestining 4 ta qadriyatiga solishtiring va yaxshilash kerak bo'lgan 2 ta jihatni aniqlang.",
      acceptanceCriteria: [
        "Agile manifestining asosiy qadriyatlarini to'g'ri tushuntiradi",
        "Qotib qolgan byurokratiya o'rniga moslashuvchanlikni afzal biladi"
      ],
      prerequisites: ["6.1"]
    },
    {
      id: "78.2",
      title: "Iterative Delivery",
      description: [
        "Iterativ yetkazib berish — mahsulotni qisqa muddatli sikllar (1–2 haftalik iteratsiyalar) orqali qayta-qayta takomillashtirib borish.",
        "",
        "Har bir iteratsiya oxirida ishlovchi, testdan o'tgan va mijozga ko'rsatsa bo'ladigan mahsulot qismi (Inkrement) tayyor bo'ladi. Bu xatarlarni kamaytiradi: noto'g'ri yo'ldan ketilgani 6 oydan keyin emas, 1 haftadan keyin ma'lum bo'ladi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Katta 3 oylik loyihani har 2 haftada foydalanuvchiga qiymat beruvchi 6 ta iteratsiyaga ajrating.",
      acceptanceCriteria: [
        "Katta vazifalarni iteratsiyalarga to'g'ri bo'ladi",
        "Har bir iteratsiya oxirida ishlovchi dasturiy qism topshirilishini ta'minlaydi"
      ],
      prerequisites: ["78.1"]
    },
    {
      id: "78.3",
      title: "Incremental Development",
      description: [
        "Inkremental rivojlanish — tizimga yangi funksiyalarni qismlarga bo'lib (bo'lakma-bo'lak) qo'shib borish.",
        "",
        "Masalan, to'liq to'lov tizimini birdaniga qilish o'rniga: 1-inkrement — faqat Payme orqali to'lov; 2-inkrement — Click integratsiyasi; 3-inkrement — avtomatik chek chiqarish. Tizim har bir qadamda ishchi holatda qoladi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Elektron tijorat savati funksiyasini 3 ta mustaqil va foydalanuvchiga ishlaydigan inkrementlarga bo'ling.",
      acceptanceCriteria: [
        "Iterativ va Inkremental farqini (qayta ishlash vs qo'shib borish) biladi",
        "Chala yozilgan kodlar o'rniga to'liq ishlovchi bo'laklar chiqaradi"
      ],
      prerequisites: ["78.2"]
    },
    {
      id: "78.4",
      title: "Backlog Management",
      description: [
        "Beklogni boshqarish (Backlog Management) — kelajakda bajarilishi kerak bo'lgan barcha vazifalar, takomillashtirishlar va xatolar ro'yxatini tartibli saqlash.",
        "",
        "Product Owner bilan birgalikda beklogni muntazam tozalash (Grooming/Refinement): eskirgan vazifalarni o'chirish, noaniq topshiriqlarni maydalash va yuqoridagi vazifalarni batafsil tayyor holatga keltirish (Definition of Ready)."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Texnik qarzlar va yangi xususiyatlar aralashib ketgan beklogni tozalash va tartibga solish sessiyasini rejalashtiring.",
      acceptanceCriteria: [
        "Beklogni toza va tartibli ushlab turadi",
        "Vazifalarning bajarilishga tayyorlik (DoR) mezonini ta'minlaydi"
      ],
      prerequisites: ["78.7"]
    },
    {
      id: "78.5",
      title: "User Stories",
      description: [
        "Foydalanuvchi hikoyalari (User Stories) — biznes talablarini texnik tilda emas, yakuniy foydalanuvchi nigohi bilan ifodalash.",
        "",
        "Klassik shablon: 'Sifatida <rol>, xohlayman <harakat>, toki <qiymat/maqsad>'. Masalan: 'Xaridor sifatida savatdagi mahsulot sonini o'zgartirmoqchiman, toki xarid summasini qaytadan ko'ra olay'. INVEST tamoyiliga (Independent, Negotiable, Valuable, Estimable, Small, Testable) mos bo'lishi shart."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Texnik 'Redis kesh qo'shish' vazifasini foydalanuvchi va biznes qiymatini aks ettiruvchi to'g'ri User Story shakliga o'giring.",
      acceptanceCriteria: [
        "User Story formatini va INVEST mezonlarini to'g'ri qo'llaydi",
        "Vazifaning 'nega kerakligi'ni (biznes qiymatini) aniq ochib beradi"
      ],
      prerequisites: ["78.1"]
    },
    {
      id: "78.6",
      title: "Acceptance Criteria",
      description: [
        "Qabul qilish mezonlari (Acceptance Criteria - AC) — vazifa qachon muvaffaqiyatli bajarilgan deb hisoblanishini ko'rsatuvchi aniq, tekshiriladigan shartlar.",
        "",
        "Ko'pincha Gherkin (Given-When-Then) formatida yoziladi: 'Berilgan (Given) balansda $100 bor, Qachon (When) $40 yechilsa, Unda (Then) qoldiq $60 bo'ladi va SMS ketadi'. Dasturchi kod yozishdan oldin AC larni o'qib, o'z testlarini aynan shu mezonlar asosida tuzadi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Foydalanuvchi parolini tiklash funksiyasi uchun 4 ta tekshiriladigan Acceptance Criteria (Given-When-Then) yozing.",
      acceptanceCriteria: [
        "Barcha AC lar aniq va test orqali tekshirsa bo'ladigan bo'lishini ta'minlaydi",
        "Chegaraviy va xatolik holatlarini qamrab oladi"
      ],
      prerequisites: ["78.5"]
    },
    {
      id: "78.7",
      title: "Prioritization",
      description: [
        "Vazifalarni ustuvorlashtirish — cheklangan resurs va vaqt sharoitida qaysi vazifani birinchi bo'lib qilish kerakligini aniqlash.",
        "",
        "Mashhur modellar: MoSCoW (Must have, Should have, Could have, Won't have), RICE (Reach, Impact, Confidence, Effort) yoki Value vs Effort matritsasi. Senior dasturchi minimal mehnat bilan maksimal biznes foyda keltiruvchi (Quick Wins) vazifalarni aniqlay oladi."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "10 ta vazifadan iborat ro'yxatni MoSCoW usulida ustuvorlashtirib, MVP uchun minimal to'plamni ajrating.",
      acceptanceCriteria: [
        "Ustuvorlashtirish modellaridan amalda foydalanadi",
        "Texnik qiyinchilik va biznes qiymati balansini to'g'ri baholaydi"
      ],
      prerequisites: ["78.4"]
    },
    {
      id: "78.8",
      title: "Estimation",
      description: [
        "Vazifalar hajmini baholash — noaniqlik va murakkablikni Story Points yoki T-shirt sizes (S, M, L, XL) orqali nisbiy baholash.",
        "",
        "Dasturchilar soatlar orqali emas, boshqa tanish vazifaga solishtirish (Planning Poker, Fibonachchi qatori: 1, 2, 3, 5, 8, 13) orqali baholaydi. Maqsad aniq soatni topish emas, balki vazifa ichidagi yashirin qiyinchiliklar va noaniqliklarni jamoaviy muhokama qilishdir."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Planning Poker sessiyasida 3 ta har xil murakkablikdagi vazifani nisbiy Story Pointlar bilan baholashni asoslab bering.",
      acceptanceCriteria: [
        "Nisbiy baholash (Relative Estimation) tamoyillarini tushunadi",
        "Vazifadagi xatarlar va noaniqliklarni hisobga olgan holda baho beradi"
      ],
      prerequisites: ["78.5"]
    },
    {
      id: "78.9",
      title: "Sprint Planning",
      description: [
        "Sprintni rejalashtirish — jamoaning keyingi 1-2 hafta ichida nimani va qanday yetkazib berishini aniqlash marosimi.",
        "",
        "Sprint Maqsadi (Sprint Goal) belgilanadi. Jamoaning o'rtacha tezligi (Velocity) hisobga olingan holda beklogdan vazifalar olinadi va Sprint Backlog ga joylashtiriladi. Dasturchilar vazifalarni texnik kichik topshiriqlarga (subtasks) bo'lib oladi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Jamoangizning tezligidan kelib chiqib, aniq bitta Sprint Goal atrofida 2 haftalik sprint rejasini tuzing.",
      acceptanceCriteria: [
        "Aniq va erishsa bo'ladigan Sprint Goal shakllantiradi",
        "Jamoaning haddan tashqari ko'p majburiyat olib (overcommitment) charchashining oldini oladi"
      ],
      prerequisites: ["78.8", "79.8"]
    },
    {
      id: "78.10",
      title: "Continuous Feedback",
      description: [
        "Doimiy fikr-mulohaza (Continuous Feedback) — mahsulot haqida mijozlar, testerlar va tizim monitoringidan imkon qadar erta ma'lumot olish.",
        "",
        "Kodni tez-tez deploy qilish, foydalanuvchilar harakatini tahlil qilish (analytics), xatoliklar sonini kuzatish va har bir sprint oxirida Demo (Sprint Review) orqali manfaatdor tomonlarning (stakeholders) fikrini olish xatarlarni kamaytiradi."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Yangi ishlab chiqilgan modul uchun foydalanuvchilardan fikr-mulohaza yig'uvchi va xatolarni tezkor ushlovchi mexanizm rejasini tuzing.",
      acceptanceCriteria: [
        "Tezkor fikr-mulohaza zanjirini (Feedback Loop) qisqartirish yo'llarini biladi",
        "Foydalanuvchi fikrlari asosida mahsulotni moslashtirishga tayyor bo'ladi"
      ],
      prerequisites: ["78.2"]
    },
    {
      id: "78.11",
      title: "Retrospectives",
      description: [
        "Retrospektiva — har bir sprint yakunida jamoaning o'z ish jarayonini tahlil qilish marosimi ('Nima yaxshi bo'ldi?', 'Nima yomon bo'ldi?', 'Nimani yaxshilaymiz?').",
        "",
        "Madaniyat: aybdorni qidirmaslik (blameless culture). Retrospektiva oxirida keyingi sprintda amalga oshirilishi shart bo'lgan 1–2 ta aniq harakatlar rejasi (Action Items) qabul qilinadi va keyingi safar tekshiriladi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Muammoli o'tgan sprint uchun Blameless Retrospektiva sessiyasini o'tkazish rejasini va 2 ta amaliy Action Item yozing.",
      acceptanceCriteria: [
        "Aybdorliksiz tahlil (Blameless culture) madaniyatini saqlaydi",
        "Shunchaki shikoyat emas, aniq bajariladigan harakat rejalari (Action Items) ishlab chiqadi"
      ],
      prerequisites: ["78.16", "79.11"]
    },
    {
      id: "78.12",
      title: "Risk Management",
      description: [
        "Agile da xatarlarni boshqarish — loyihaning to'xtab qolishiga yoki kechikishiga sabab bo'luvchi texnik va tashkiliy xatarlarni oldindan aniqlash.",
        "",
        "Eng xatarli va noaniq texnik masalalarni (masalan: notanish bank API integratsiyasi) loyihaning eng boshida kichik tadqiqot (Spike) orqali sinab ko'rish. 'Fail Fast' tamoyili: xatar bo'lsa, uni darhol yuzaga chiqarib yechish kerak."
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Yangi murakkab integratsiya oldidan 2 kunlik texnik tadqiqot (Spike Story) ta'rifini va xatarlarni pasaytirish rejasini tuzing.",
      acceptanceCriteria: [
        "Noaniqliklarni Spike lar orqali bartaraf etishni biladi",
        "Kritik xatarlarni loyiha oxiriga surmasdan, birinchi navbatda hal qiladi"
      ],
      prerequisites: ["81.10"]
    },
    {
      id: "78.13",
      title: "Stakeholder Collaboration",
      description: [
        "Manfaatdor tomonlar (Stakeholders) bilan samarali hamkorlik — biznes egalari, marketing, qo'llab-quvvatlash bo'limi va mijozlar bilan to'g'ridan-to'g'ri muloqot.",
        "",
        "Texnik jargonlar bilan gaplashmasdan, biznes tushunadigan tilda (foyda, konversiya, xatarlar, tezlik) so'zlash. Talablarning o'zgarishini dushmanlik bilan emas, balki mahsulotni yanada yaxshilash imkoniyati sifatida qabul qilish."
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Texnik arxitektura o'zgarishini biznes rahbarlariga ularning tushunchasi (xarajatni kamaytirish va tezlik) bilan asoslab bering.",
      acceptanceCriteria: [
        "Texnik muammolarni biznes qiymatiga bog'lab tushuntiradi",
        "Biznes vakillari bilan ochiq va ishonchli hamkorlikni o'rnatadi"
      ],
      prerequisites: ["82.14", "84.13"]
    },
    {
      id: "78.14",
      title: "Delivery Metrics",
      description: [
        "Yetkazib berish ko'rsatkichlari — jamoaning samaradorligi va tezligini ob'ektiv o'lchash vositalari.",
        "",
        "Asosiy metrikalar: Velocity (sprintda yopilgan story pointlar), Lead Time (g'oya paydo bo'lgandan productiongacha ketgan vaqt), Cycle Time (ish boshlangandan tayyor bo'lguncha vaqt) va DORA metrikalari (Deployment Frequency, Change Failure Rate). Ushbu metrikalar jazolash uchun emas, jarayonni yaxshilash uchun qo'llaniladi."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "Jamoaning so'nggi 3 ta sprinti bo'yicha Cycle Time va Velocity ko'rsatkichlarini tahlil qilib, to'siqlarni (bottlenecks) aniqlang.",
      acceptanceCriteria: [
        "Lead Time va Cycle Time farqini tushunadi",
        "Metrikalarni maqsad emas, takomillashuv indikatori sifatida ko'radi"
      ],
      prerequisites: ["79.19"]
    },
    {
      id: "78.15",
      title: "Managing Scope Changes",
      description: [
        "Loyiha ko'lami o'zgarishini boshqarish — sprint davomida yangi talablar paydo bo'lganda to'g'ri qaror qabul qilish.",
        "",
        "Sprint davomida yangi vazifa kiritish qat'iyan chegaralanadi. Agar o'ta shoshilinch yangi vazifa kiritilishi shart bo'lsa, qoida bo'yicha Sprint Backlog dan unga teng hajmdagi boshqa bir vazifa chiqarib tashlanadi (Trade-off: 'Yangi narsa kelsa, eskisidan voz kechiladi')."
      ],
      priority: "core",
      level: "Strong Middle",
      practicalTask: "Sprint o'rtasida Product Owner yangi favqulodda vazifa olib kelganda, sprint muvozanatini saqlash bo'yicha muzokara o'tkazing.",
      acceptanceCriteria: [
        "Sprint chegaralarini himoya qila oladi",
        "O'zgarish kiritilganda bir xil hajmdagi vazifani almashtirish (scope swap) tamoyilini qo'llaydi"
      ],
      prerequisites: ["78.9"]
    },
    {
      id: "78.16",
      title: "Continuous Improvement",
      description: [
        "Uzluksiz takomillashuv (Kaizen) — har kuni va har bir sprintda jamoa jarayonlari, kod sifati va muhandislik amaliyotlarini oz-ozdan yaxshilab borish.",
        "",
        "Mukammal tizim birdaniga paydo bo'lmaydi. Kichik o'zgarishlar (masalan: yangi linter qo'shish, sekin testlarni 1 daqiqaga tezlashtirish, har kungi standupni 5 daqiqaga qisqartirish) bir yil davomida jamoa mahsuldorligini bir necha baravarga oshiradi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "O'z jamoangizda 1 oy davomida har hafta bittadan kichik jarayoniy yaxshilanishni (Kaizen) joriy qilish rejasini tuzing.",
      acceptanceCriteria: [
        "Uzluksiz takomillashuv falsafasini amaliyotga tatbiq etadi",
        "Jamoada o'rganish va professional o'sish muhitini yaratadi"
      ],
      prerequisites: ["78.11"]
    }
  ]
});
