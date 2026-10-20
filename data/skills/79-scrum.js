/* 79 · Scrum
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 79,
  slug: "scrum",
  title: "Scrum",
  group: "process",
  description: "Scrum — murakkab dasturiy mahsulotlarni jamoaviy ishlab chiqishda eng keng tarqalgan Agile freymvorkidir. U 3 ta rol (Product Owner, Scrum Master, Developers), 3 ta artefakt (Product Backlog, Sprint Backlog, Increment) va 5 ta marosim (Sprint, Planning, Daily, Review, Retrospective) orqali shaffoflik, tekshirish va moslashuv (Transparency, Inspection, Adaptation) ustunlariga tayanadi. Senior Laravel dasturchi Scrum doirasida o'z-o'zini boshqaruvchi jamoaning texnik tayanchi bo'lib, Definition of Done va Definition of Ready talablariga qat'iy rioya qiladi.",
  subskills: [
    {
      id: "79.1",
      title: "Scrum Roles",
      description: [
        "Scrum rollari — Scrum jamoasidagi 3 ta yagona va mas'uliyat doirasi aniq belgilangan rol: Product Owner (mahsulot qiymati uchun mas'ul), Scrum Master (Scrum jarayoni va to'siqlarni olish uchun mas'ul) va Developers (mahsulot inkrementini sifatli yaratuvchilar).",
        "",
        "Scrumda an'anaviy ierarxik 'boshliq-bo'ysunuvchi' tushunchasi yo'q — butun jamoa yagona maqsad sari o'zini o'zi boshqaruvchi (self-managing) va ko'p tarmoqli (cross-functional) guruh sifatida ishlaydi."
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Scrum jamoasidagi har bir rolni va ularning vakolatlari chegarasini tushuntiruvchi infografika/jadval tuzing.",
      acceptanceCriteria: [
        "3 ta asosiy Scrum rolini va mas'uliyatlarini to'g'ri ajratadi",
        "Jamoada loyiha menejeri yoki boshliq emas, sheriklik munosabatini tushunadi"
      ],
      prerequisites: ["78.1"]
    },
    {
      id: "79.2",
      title: "Product Owner",
      description: [
        "Mahsulot egasi (Product Owner - PO) — mahsulotning biznes qiymatini maksimal darajaga yetkazish uchun yagona mas'ul shaxs.",
        "",
        "PO vazifalari: Product Backlog elementlarini aniq ifodalash, ularni biznes qiymatiga ko'ra ustuvorlashtirish, mijozlar va rahbariyat talablarini jamoaga yetkazish. Dasturchilar 'nima qilish'ni PO bilan kelishadi, 'qanday qilish'ni (texnik yechimni) esa mustaqil hal qiladi."
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Product Owner bilan yangi funksiyaning biznes qiymati va texnik chegaralarini kelishuvchi muloqot o'tkazing.",
      acceptanceCriteria: [
        "Product Owner ning vazifalarini va beklogdagi vakolatini hurmat qiladi",
        "Texnik muammolarni PO ga biznes tili bilan tushuntiradi"
      ],
      prerequisites: ["79.1", "78.4"]
    },
    {
      id: "79.3",
      title: "Scrum Master",
      description: [
        "Scrum Master — jamoaning 'xizmatkor yetakchisi' (Servant Leader) bo'lib, Scrum tamoyillarining to'g'ri ishlashi va jamoa unumdorligini oshirishga mas'ul.",
        "",
        "U vazifalarni buyruq berib taqsimlamaydi. Uning maqsadi: tashqi xalaqitlardan jamoani himoya qilish, marosimlarni samarali o'tkazish (fasilitatsiya), dasturchilar yo'lidagi to'siqlarni (impediments) bartaraf etish va o'zaro hamkorlikni rivojlantirish."
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Ish jarayoniga to'sqinlik qilayotgan tashqi byurokratik to'siqni Scrum Master bilan birgalikda hal qilish stsenariysini yozing.",
      acceptanceCriteria: [
        "Scrum Master ning boshliq emas, yordamchi yetakchi ekanligini tushunadi",
        "Jarayoniy to'siqlarni Scrum Master ga o'z vaqtida yetkazadi"
      ],
      prerequisites: ["79.1"]
    },
    {
      id: "79.4",
      title: "Developers",
      description: [
        "Ishlab chiquvchilar (Developers) — har bir sprintda ishlaydigan va foydalanishga yaroqli Inkrement yaratishga bevosita mas'ul bo'lgan mutaxassislar (dasturchilar, testerlar, dizaynerlar).",
        "",
        "Ular qanday texnologiya, arxitektura va kodlash usullari qo'llanilishini to'liq o'zlari belgilaydi. Sifat, Definition of Done va sprint rejasining texnik ijrosi to'liq Developers javobgarligida."
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Jamoa dasturchilari o'rtasida sprint vazifalarini o'zaro ixtiyoriy va muvozanatli taqsimlashda ishtirok eting.",
      acceptanceCriteria: [
        "Texnik sifat va ijro uchun kollektiv mas'uliyatni o'z zimmasiga oladi",
        "O'z-o'zini tashkil qilish (self-organization) madaniyatiga amal qiladi"
      ],
      prerequisites: ["79.1"]
    },
    {
      id: "79.5",
      title: "Product Backlog",
      description: [
        "Mahsulot beklogi (Product Backlog) — mahsulotni yaratish yoki yaxshilash uchun zarur bo'lgan barcha talablar, funksiyalar va xatoliklarning yagona, tartiblangan va o'suvchi manbai.",
        "",
        "U hech qachon 'tugamaydi' — mahsulot yashar ekan, beklog ham rivojlanadi. Yuqoridagi elementlar eng muhim, aniq va mayda bo'ladi; pastdagi elementlar esa umumiy va mavhum bo'lishi mumkin."
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Loyiha uchun texnik topshiriqlardan iborat xom ro'yxatni tartiblangan Product Backlog shakliga keltiring.",
      acceptanceCriteria: [
        "Product Backlog ning yagona haqiqat manbai (Single Source of Truth) ekanligini biladi",
        "Yuqori ustuvorlikdagi vazifalarning to'liq detallashganligini ta'minlaydi"
      ],
      prerequisites: ["78.4"]
    },
    {
      id: "79.6",
      title: "Sprint Backlog",
      description: [
        "Sprint beklogi (Sprint Backlog) — joriy sprint davomida bajarish uchun tanlab olingan vazifalar to'plami, Sprint Maqsadi (Sprint Goal) va ularni amalga oshirish bo'yicha texnik reja.",
        "",
        "Faqat Developers jamoasiga tegishli artefakt. Sprint davomida vazifalar holati (To Do, In Progress, Review, Done) bo'yicha siljiydi va kerak bo'lsa yangi texnik subtasklar qo'shiladi."
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Tanlangan User Story ni amalga oshirish uchun zarur bo'lgan texnik qadamlarni (migratsiya, model, servis, test) Sprint Backlog da aks ettiring.",
      acceptanceCriteria: [
        "Sprint Backlog ni kundalik ish rejasi sifatida yuritadi",
        "Vazifalarning holatini doskada o'z vaqtida yangilab boradi"
      ],
      prerequisites: ["78.9", "79.5"]
    },
    {
      id: "79.7",
      title: "Sprint Goal",
      description: [
        "Sprint maqsadi (Sprint Goal) — sprint davomida erishilishi kerak bo'lgan, jamoani yagona biznes yo'nalishiga birlashtiruvchi qisqa va aniq ifoda.",
        "",
        "Shunchaki '10 ta vazifani yopish' emas, balki biznes maqsadi: 'Foydalanuvchiga to'lovlarni Uzum Bank orqali amalga oshirish imkoniyatini berish'. Agar sprint o'rtasida qaysidir ikkinchi darajali vazifaga vaqt yetmay qolsa ham, Sprint Goal xavf ostida qolmasligi kerak."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Navbatdagi sprint uchun vazifalar ro'yxatini biznes natijasiga bog'lovchi yagona Sprint Goal ifodasini tuzing.",
      acceptanceCriteria: [
        "Fokusni alohida topshiriqlardan umumiy biznes maqsadiga qarata oladi",
        "Sprint davomida qarorlar qabul qilishda Sprint Goal ga tayanadi"
      ],
      prerequisites: ["78.9"]
    },
    {
      id: "79.8",
      title: "Sprint Planning",
      description: [
        "Sprint rejalashtirish marosimi — sprint boshida butun Scrum jamoasi yig'ilib, 2 ta asosiy savolga javob topishi: 1) Bu sprintda nimani amalga oshiramiz? 2) Buni texnik jihatdan qanday bajaramiz?",
        "",
        "PO maqsad va muhim vazifalarni taqdim etadi, Developers esa o'z sig'imi (capacity) va tezligidan kelib chiqib, qancha vazifa olishini o'zi hal qiladi. Natijada Sprint Goal va Sprint Backlog shakllanadi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Sprint Planning uchrashuvida texnik arxitektura va vazifalar bog'liqliklarini tushuntirib, sprint hajmini aniqlang.",
      acceptanceCriteria: [
        "Rejalashtirishda texnik xatarlar va qiyinchiliklarni oldindan ko'taradi",
        "Jamoa imkoniyatidan ortiq yuklama olmaslikni ta'minlaydi"
      ],
      prerequisites: ["78.9", "79.7"]
    },
    {
      id: "79.9",
      title: "Daily Scrum",
      description: [
        "Kunlik stendap (Daily Scrum) — Developers jamoasi uchun har kuni 15 daqiqa davom etadigan tezkor sinxronizatsiya uchrashuvi.",
        "",
        "Maqsad: hisobot berish emas, balki Sprint Maqsadiga erishish rejasini tekshirish. 3 ta savol: Kecha maqsad uchun nima qildim? Bugun nima qilmoqchiman? Qanday to'siqlar (bloklar) bor? Batafsil texnik tortishuvlar Daily dan keyin alohida guruhda muhokama qilinadi."
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Daily Scrum da 1 daqiqa ichida o'z ishingiz, bugungi rejangiz va mavjud to'siqni qisqa va lo'nda yetkazing.",
      acceptanceCriteria: [
        "15 daqiqalik vaqt chegarasiga (timebox) qat'iy amal qiladi",
        "Status hisoboti emas, jamoaviy yordam va to'siqlarni yechishga e'tibor qaratadi"
      ],
      prerequisites: ["79.4"]
    },
    {
      id: "79.10",
      title: "Sprint Review",
      description: [
        "Sprint namoyishi (Demo / Sprint Review) — sprint oxirida jamoa va manfaatdor tomonlar (mijozlar, rahbarlar) ishtirokida yangi tayyor bo'lgan ishlovchi funksiyalarni jonli ko'rsatish.",
        "",
        "Slaydlar yoki gaplar emas, balki real ishlovchi dastur namoyish etiladi. Manfaatdor tomonlardan jonli fikr-mulohaza olinadi va keyingi qadamlar muhokama qilinadi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Sprint Review da o'zingiz ishlab chiqqan yangi API va funksionallikni biznes vakillariga jonli namoyish qilib bering.",
      acceptanceCriteria: [
        "Faqat Definition of Done ga to'liq javob beradigan funksiyalarni namoyish etadi",
        "Mijozlar va rahbarlardan konstruktiv fikr-mulohazalarni qabul qiladi"
      ],
      prerequisites: ["78.10", "79.13"]
    },
    {
      id: "79.11",
      title: "Sprint Retrospective",
      description: [
        "Sprint retrospektivasi — Scrum dagi doimiy takomillashuvning yuragi. Jamoa mahsulotni emas, balki o'zining ishlash jarayonini, munosabatlarini, asboblarini va sifatini tahlil qiladi.",
        "",
        "Nimalar yaxshi ishladi? Qayerda sekinlashdik? Nimani o'zgartirishimiz kerak? Keyingi sprintda amalga oshirish uchun bitta yoki ikkita aniq yaxshilash qarori qabul qilinadi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Retrospektivada CI/CD testlarining sekinligi bo'yicha muammoni ko'tarib, uni keyingi sprintda yechish harakatini taklif qiling.",
      acceptanceCriteria: [
        "Ochiq va halol fikr bildirish madaniyatida faol ishtirok etadi",
        "Shaxsiyatga tegmasdan faqat jarayon va sifatni yaxshilashga diqqat qaratadi"
      ],
      prerequisites: ["78.11"]
    },
    {
      id: "79.12",
      title: "Definition of Ready",
      description: [
        "Bajarilishga tayyorlik mezoni (Definition of Ready - DoR) — vazifa sprintga olinishi uchun qanoatlantirishi shart bo'lgan minimal talablar.",
        "",
        "DoR talablari: User Story aniq yozilgan, biznes qiymati ma'lum, Acceptance Criteria bor, dizayn/mockup tayyor, barcha tashqi bog'liqliklar yechilgan va jamoa tomonidan baholangan. Chala va noaniq vazifalar sprintga kiritilmaydi."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Jamoangiz uchun vazifa sprintga kirishi mumkinligini belgilovchi 5 banddan iborat Definition of Ready ro'yxatini tuzing.",
      acceptanceCriteria: [
        "Noaniq vazifalarning sprintga kirib ketishini to'xtatadi",
        "Vazifalarning texnik va biznes jihatdan to'liq pishganligini nazorat qiladi"
      ],
      prerequisites: ["78.6"]
    },
    {
      id: "79.13",
      title: "Definition of Done",
      description: [
        "Bajarilganlik mezoni (Definition of Done - DoD) — vazifani 'tayyor' (Done) deb e'lon qilish va relizga chiqarish uchun qat'iy umumjamoaviy sifat shartlari.",
        "",
        "DoD namunalari: Kod yozildi va git ga push qilindi; Kod uslubi (Pint) va PHPStan tekshiruvidan o'tdi; Unit va Feature testlar yozildi va 100% o'tdi; Code Review qilindi va kamida bitta Senior tasdiqladi; Staging muhitida sinab ko'rildi; API hujjati yangilandi. DoD bajarilmagan kod hech qachon 'Done' hisoblanmaydi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Laravel loyihangiz uchun barcha sifat qadamlarini o'z ichiga olgan qat'iy Definition of Done ro'yxatini ishlab chiqing.",
      acceptanceCriteria: [
        "DoD talablariga og'ishmay amal qiladi va boshqalardan ham shuni talab qiladi",
        "Chala testlangan yoki review qilinmagan kodni 'Done' deb hisoblamaydi"
      ],
      prerequisites: ["72.17", "74.20"]
    },
    {
      id: "79.14",
      title: "Story Points",
      description: [
        "Hikoya ballari (Story Points) — vazifani bajarishga ketadigan umumiy sa'y-harakat, uning murakkabligi, hajmi va noaniqligini o'lchovchi nisbiy birlik.",
        "",
        "Fibonachchi qatori (1, 2, 3, 5, 8, 13) asosida beriladi. Bu aniq soat emas: 1 ballik vazifa juda oson va tanish bo'lsa, 8 ballik vazifa katta murakkablik va noaniqlikka ega. 13 dan oshgan vazifalar kichikroq bo'laklarga maydalanishi shart."
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "3 xil vazifani (matnni o'zgartirish, yangi CRUD API, tashqi to'lov integratsiyasi) Story Pointlar orqali baholang.",
      acceptanceCriteria: [
        "Vaqt (soat) va murakkablik (Story Point) farqini tushuntiradi",
        "Jamoaviy konsensusga erishishda o'z bahosini asoslay oladi"
      ],
      prerequisites: ["78.8"]
    },
    {
      id: "79.15",
      title: "Velocity",
      description: [
        "Jamoa tezligi (Velocity) — jamoaning bitta sprint davomida muvaffaqiyatli yakunlagan (DoD ga javob bergan) o'rtacha Story Pointlar soni.",
        "",
        "Masalan, so'nggi 3 ta sprintda 30, 34, 32 ball bajarilgan bo'lsa, o'rtacha tezlik ~32 ball. Ushbu ko'rsatkich keyingi sprintga qancha vazifa olish mumkinligini prognoz qilish va uzoq muddatli relizlarni rejalashtirish uchun xizmat qiladi."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "O'tgan 4 ta sprint ma'lumotlari asosida jamoaning o'rtacha Velocity ko'rsatkichini hisoblang va keyingi sprint hajmini belgilang.",
      acceptanceCriteria: [
        "Tezlikni jamoaviy prognozlash vositasi sifatida to'g'ri qo'llaydi",
        "Yolg'on yuqori ballar berib tezlikni sun'iy oshirish (point inflation) tuzog'idan qochadi"
      ],
      prerequisites: ["79.14"]
    },
    {
      id: "79.16",
      title: "Impediment Management",
      description: [
        "To'siqlarni boshqarish — dasturchilarning ishini to'xtatib qo'ygan yoki sekinlashtirgan har qanday omilni (server buzilishi, uchinchi tomon API javob bermasligi, noaniq talablar) zudlik bilan bartaraf etish.",
        "",
        "Dasturchi muammoga duch kelganda va 30 daqiqa mustaqil yechim topolmaganda, buni yashirmasdan darhol Daily Scrum da yoki Scrum Master ga e'lon qilishi kerak. To'siqlarni yashirish butun sprint muvaffaqiyatini xavf ostiga qo'yadi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Server muhiti buzilishi sababli to'xtab qolgan vazifani zudlik bilan eskalatsiya qilib, to'siqni yechish jarayonini boshqaring.",
      acceptanceCriteria: [
        "Muammolarni erta aniqlaydi va yashirmasdan oshkor qiladi",
        "To'siqlarni bartaraf etish uchun faol tashabbus ko'rsatadi"
      ],
      prerequisites: ["79.3", "79.9"]
    },
    {
      id: "79.17",
      title: "Backlog Refinement",
      description: [
        "Beklogni tozalash va tayyorlash (Refinement / Grooming) — keyingi sprintlarga mo'ljallangan vazifalarni oldindan tahlil qilish, noaniqliklarni yo'qotish va baholash uchrashuvi.",
        "",
        "Sprint o'rtasida haftasiga 1 soat ajratiladi. Katta User Story lar kichikroq bo'laklarga ajratiladi, texnik arxitektura oldindan muhokama qilinadi va DoR talablariga yetkaziladi. Natijada Sprint Planning uchrashuvi tez va tortishuvlarsiz o'tadi."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Murakkab bitta katta vazifani (Epic) Refinement sessiyasida 3 ta kichik va mustaqil User Story larga bo'ling.",
      acceptanceCriteria: [
        "Vazifalarni oldindan tahlil qilib, rejalashtirish uchrashuvini osonlashtiradi",
        "Katta va noaniq topshiriqlarni maydalash usullarini biladi"
      ],
      prerequisites: ["78.4", "79.12"]
    },
    {
      id: "79.18",
      title: "Scrum Metrics and Their Limitations",
      description: [
        "Scrum metrikalari va ularning cheklovlari — Burndown chart, Velocity, Cycle Time ko'rsatkichlaridan to'g'ri foydalanish va ularni noto'g'ri talqin qilmaslik.",
        "",
        "Gudxart qonuni (Goodhart's Law): 'O'lchov vositasi maqsadga aylansa, u yaxshi o'lchov bo'lmay qoladi'. Agar rahbariyat dasturchilarni faqat yopilgan Story Point soniga qarab baholasa, dasturchilar sun'iy ravishda ballarni oshirib yozishni boshlaydi va kod sifati pasayadi. Asosiy maqsad — ballar emas, ishlovchi va foydali dasturdir."
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Burndown chartdagi keskin sakrashlar sababini tahlil qiling va metrikalarning xatoliklarini jamoaga tushuntiring.",
      acceptanceCriteria: [
        "Metrikalarning cheklovlari va suiiste'mol qilinish xatarlarini tushunadi",
        "Raqamlar ketidan quvmasdan real sifat va biznes natijalarini ustun qo'yadi"
      ],
      prerequisites: ["78.14", "79.15"]
    }
  ]
});
