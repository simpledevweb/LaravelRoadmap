/* 82 · Technical Decision-Making
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 82,
  slug: "technical-decision-making",
  title: "Technical Decision-Making",
  group: "process",
  description: "Texnik qarorlar qabul qilish — Senior va Lead muhandislarning asosiy mas'uliyati bo'lib, loyihaning arxitekturasi, kutubxonalar tanlovi, infratuzilma va biznes strategiyasiga bevosita ta'sir ko'rsatadi. Senior dasturchi shaxsiy xush ko'rish yoki yangi trendlar ketidan quvmasdan, dalillarga asoslangan holda variantlarni taqqoslaydi, 'Build vs Buy' dilemmasini to'g'ri yechadi, narx, tezlik va qo'llab-quvvatlash murosalarini baholaydi hamda o'z qarorlarini ADR orqali jamoa va biznes bilan muvofiqlashtiradi.",
  subskills: [
    {
      id: "82.1",
      title: "Requirements Analysis",
      description: [
        "Talablarni chuqur tahlil qilish — har qanday texnik qaror qabul qilishdan oldin funksional va nofunksional talablarni to'liq o'rganish.",
        "",
        "Biznes nimani xohlaydi? Foydalanuvchilar soni qancha bo'ladi (RPS, DAU)? Kechikish (latency) bo'yicha qat'iy talab bormi? Ma'lumotlar xavfsizligi bo'yicha qonuniy cheklovlar qanday? Talablarni tushunmasdan turib texnologiya tanlash — kasallikni bilmay dori ichishga o'xshaydi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Yangi loyiha talablarini tahlil qilib, texnologik stakka bevosita ta'sir qiluvchi 3 ta nofunksional cheklovni ajrating.",
      acceptanceCriteria: [
        "Texnik qarorlarni biznes talablari bilan asoslaydi",
        "Nofunksional talablarning texnologiya tanlovidagi ahamiyatini ko'rsatadi"
      ],
      prerequisites: ["66.1", "66.2"]
    },
    {
      id: "82.2",
      title: "Option Comparison",
      description: [
        "Variantlarni tizimli taqqoslash — bitta yechimga yopishib olmasdan, kamida 2-3 ta muqobil variantni bir xil mezonlar bo'yicha solishtirish.",
        "",
        "Taqqoslov matritsasi tuziladi: o'rnatish tezligi, jamoa tajribasi, unumdorlik, hamjamiyat (community) qo'llab-quvvatlashi, xarajatlar va kelajakdagi xatarlar. Masalan: Redis vs RabbitMQ vs Amazon SQS ni xabarlar navbati sifatida taqqoslash."
      ],
      priority: "core",
      level: "Strong Middle",
      practicalTask: "Loyiha uchun 2 ta ma'lumotlar bazasini (masalan PostgreSQL vs MongoDB) 5 ta mezon bo'yicha taqqoslash jadvalini tuzing.",
      acceptanceCriteria: [
        "Bir nechta muqobil variantlarni xolisona tahlil qiladi",
        "Taqqoslov matritsasi asosida aniq xulosaga keladi"
      ],
      prerequisites: ["82.1"]
    },
    {
      id: "82.3",
      title: "Build vs Buy",
      description: [
        "O'zimiz yozamiz yoki tayyorini sotib olamiz (Build vs Buy) — asosiy raqobat ustunligini belgilovchi qaror.",
        "",
        "Kompaniyaning asosiy qiymati (Core Domain) bo'lmagan narsalarni (masalan: autentifikatsiya uchun Auth0, to'lov uchun Stripe, loglar uchun Datadog, transactional email uchun Postmark) o'zimiz noldan yozishimiz kerak emas. Biznesingiz nimada pul ishlasa, o'shani o'zingiz yozasiz; qolgan hamma narsani tayyori sotib olinadi yoki ochiq kodli kutubxona ishlatiladi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "SMS yuborish va autentifikatsiyani noldan qurish yoki Twilio/Auth0 sotib olish bo'yicha xarajat va vaqt tahlilini tayyorlang.",
      acceptanceCriteria: [
        "Dasturchilar vaqti narxini (TCO - Total Cost of Ownership) hisobga oladi",
        "Asosiy biznes domeniga diqqat qaratish foydasini asoslaydi"
      ],
      prerequisites: ["82.2"]
    },
    {
      id: "82.4",
      title: "Trade-off Analysis",
      description: [
        "Murosalar tahlili — hech bir texnologiya bepul mo'jiza keltirmasligini bilish.",
        "",
        "Har bir texnik qaror nimadir beradi va evaziga nimadir oladi. Masalan: Mikroxizmatlarga o'tish mustaqillik beradi, lekin tarmoq kechikishi va operatsion murakkablikni 10 barobarga oshiradi. Senior dasturchi 'Qaysi muammoni sotib olyapmiz?' savoliga aniq javob beradi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Monolitdan Event-Driven arxitekturaga o'tishning barcha yutuqlari va qurbonliklarini (trade-offs) yozma asoslang.",
      acceptanceCriteria: [
        "Yechimning nafaqat afzalliklarini, balki kamchiliklarini ham tushuntiradi",
        "Kompaniya bosqichiga mos murosa tanlaydi"
      ],
      prerequisites: ["81.9"]
    },
    {
      id: "82.5",
      title: "Cost vs Performance",
      description: [
        "Narx va unumdorlik muvozanati — eng tezkor yechim eng qimmat yechim bo'lishi shart emas.",
        "",
        "Soniyasiga 50 ta so'rov keladigan tizim uchun oyiga $2000 lik Redis klasteri va serverless arxitektura qurish ortiqcha isrofdir. Minimal oylik infratuzilma narxi bilan biznes talab qilayotgan javob vaqtini (SLA) qanoatlantiruvchi optimal arxitektura tanlanadi."
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Oylik $500 byudjet ichida 1000 RPS yuklamani ko'tara oladigan Laravel arxitekturasini loyihalang.",
      acceptanceCriteria: [
        "Infratuzilma narxi va server resurslari o'rtasidagi balansni topadi",
        "Resurslarni haddan tashqari ko'p (over-provisioning) sarflashdan qochadi"
      ],
      prerequisites: ["66.23", "70.24"]
    },
    {
      id: "82.6",
      title: "Maintainability vs Complexity",
      description: [
        "Qo'llab-quvvatlash qulayligi va tizim murakkabligi o'rtasidagi kurash.",
        "",
        "Eng zamonaviy 10 ta dizayn pattern va 5 ta qatlamli Clean Architecture qilingan, lekin jamoada uni tushunadigan faqat 1 kishi bo'lsa — bu yomon qaror. Yechim imkon qadar oddiy (KISS), o'qilishi oson va butun jamoa tomonidan qo'llab-quvvatlansa bo'ladigan bo'lishi kerak."
      ],
      priority: "core",
      level: "Strong Middle",
      practicalTask: "Oddiy CRUD loyihasi uchun ortiqcha murakkablashtirilgan 8 qavatli arxitekturani sodda Service/Action modeliga keltirishni asoslang.",
      acceptanceCriteria: [
        "Ortiqcha muhandislikka (overengineering) yo'l qo'ymaydi",
        "Kodni tushunish va saqlash xarajatlarini past darajada ushlab turadi"
      ],
      prerequisites: ["5.20", "6.5"]
    },
    {
      id: "82.7",
      title: "Risk Assessment",
      description: [
        "Texnik qarorning xatarlarini baholash — qaror noto'g'ri chiqsa, nima yo'qotamiz?",
        "",
        "Kutubxona ishlab chiqaruvchisi uni tashlab ketishi mumkinmi? Yangi versiyaga yangilanish imkoni bormi? Ushbu texnologiya bo'yicha bozorda kadrlar bormi? Litsenziyasi (GPL vs MIT) tijoriy dasturimizga to'g'ri keladimi? Bular qaror qabul qilinishidan oldin tekshiriladi."
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Loyiha uchun yangi ochiq kodli kutubxona tanlashda uning xatarlarini (maintenance, security, license) baholash cheklistini tuzing.",
      acceptanceCriteria: [
        "Texnik xatarlarni biznes va kadrlar xatarlariga bog'lab baholaydi",
        "Vendor lock-in va abandonment xavflarini hisobga oladi"
      ],
      prerequisites: ["78.12", "81.10"]
    },
    {
      id: "82.8",
      title: "Security Implications",
      description: [
        "Xavfsizlik oqibatlarini tahlil qilish — har qanday yangi arxitektura yoki kutubxona xavfsizlik darajasini qanday o'zgartiradi.",
        "",
        "Uchinchi tomon servisini ulash yangi hujum yuzasini (attack surface) ochadi. Yangi kutubxona o'rnatilganda supply chain zaifliklari paydo bo'lmaydimi? Ma'lumotlar saqlanishi va tranziti shifrlanganmi? Barcha qarorlar xavfsizlik prizmasidan o'tkaziladi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Ilovaga uchinchi tomon tahlil SDK sini ulash bo'yicha xavfsizlik va maxfiylik tahlili hisobotini tayyorlang.",
      acceptanceCriteria: [
        "Har qanday integratsiyaning xavfsizlik oqibatlarini tekshiradi",
        "Xavfsizlik talablarini (Zero Trust) arxitekturaviy qarorlarga kiritadi"
      ],
      prerequisites: ["51.1", "52.1"]
    },
    {
      id: "82.9",
      title: "Scalability Requirements",
      description: [
        "Masshtablash talablari — tizim kelajakdagi 10x yoki 100x yuklamaga bardosh bera oladimi?",
        "",
        "Agar biznes 1 yilda 10 barobarga o'sishni rejalashtirayotgan bo'lsa, qabul qilinayotgan qaror (masalan, sessiyalarni faylda saqlash) bunga to'siq bo'lmasligi kerak. Gorizontal masshtablanuvchi (stateless) texnologiyalar afzal ko'riladi."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "Bitta serverda ishlayotgan monolitning qaysi qismlari yuklama 10x oshganda birinchi bo'lib sinishini aniqlang va yechim tanlang.",
      acceptanceCriteria: [
        "Gorizontal masshtablashga to'sqinlik qiluvchi qarorlardan qochadi",
        "Resurslar oshishiga parallel ravishda kengayuvchi yechimlarni tanlaydi"
      ],
      prerequisites: ["67.1", "67.2"]
    },
    {
      id: "82.10",
      title: "Backward Compatibility",
      description: [
        "Orqaga moslikni saqlash talabi — yangi texnologik qaror mavjud mijozlar va tizimlarni buzmasligi lozim.",
        "",
        "Agar yangi arxitekturaga o'tish eski mobil ilovalarni ishlamay qolishiga olib kelsa — biznes millionlab dollarlik mijozlarini yo'qotadi. Qaror doim orqaga moslikni va bosqichma-bosqich migratsiya qilish yo'lini ta'minlashi shart."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Eski autentifikatsiyadan yangi JWT/OAuth2 tizimiga mavjud 100 ming faol foydalanuvchini uzilishsiz o'tkazish rejasini tuzing.",
      acceptanceCriteria: [
        "Mavjud integratsiyalar va mijozlar barqarorligini birinchi o'ringa qo'yadi",
        "Eski va yangi tizimning parallel yashash (coexistence) davrini to'g'ri rejalashtiradi"
      ],
      prerequisites: ["72.13"]
    },
    {
      id: "82.11",
      title: "Evidence-Based Decisions",
      description: [
        "Dalillarga asoslangan qarorlar — 'Menga bu texnologiya yoqadi' degan shaxsiy xohish o'rniga, benchmarking, prototip (POC) va aniq raqamlarga tayanish.",
        "",
        "Proof of Concept (POC) yaratiladi: 2 ta kutubxona haqiqiy yuklamada sinovdan o'tkaziladi, xotira sarfi va tezligi o'lchanadi. Qaror hisobotida jamoa ko'rishi uchun ushbu test natijalari ilova qilinadi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Ikkita ORM yoki JSON seriyalashtiruvchi kutubxona tezligini taqqoslovchi kichik Proof of Concept (POC) yozing va o'lchov natijalarini ko'rsating.",
      acceptanceCriteria: [
        "Kichik prototiplar orqali qarorning to'g'riligini isbotlaydi",
        "Benchmarking va profiling ma'lumotlariga tayanadi"
      ],
      prerequisites: ["81.6"]
    },
    {
      id: "82.12",
      title: "Architecture Decision Records",
      description: [
        "Qarorlarni ADR formatida muhrlash — qabul qilingan texnik qarorlarni nima sababdan tanlanganini hujjatlashtirish.",
        "",
        "Kelajakda (1-2 yildan so'ng) yangi jamoa a'zolari: 'Nega bular bunday g'alati yechim qilishgan?' deb hayron bo'lmasligi uchun ADR kontekst va o'sha paytdagi cheklovlarni tushuntirib beradi. ADR bo'lmasa, jamoa eski xatolarni qayta-qayta takrorlaydi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Jamoa uchun bir sahifalik aniq va tushunarli ADR shablonini tuzing va bitta real qaror bilan to'ldiring.",
      acceptanceCriteria: [
        "Qarorlarning kelib chiqish sabablarini hujjatlashtiradi",
        "ADR orqali jamoaviy xotirani (institutional memory) saqlaydi"
      ],
      prerequisites: ["80.4"]
    },
    {
      id: "82.13",
      title: "Reversibility of Decisions",
      description: [
        "Qarorlarning qaytariluvchanligi (Bir tomonlama va Ikki tomonlama eshiklar — Jeff Bezos qoidasi).",
        "",
        "Ikki tomonlama eshik (Two-way door): osonlikcha orqaga qaytarsa bo'ladigan qarorlar (masalan kesh muddatini o'zgartirish, yangi linter qo'shish) — tez va ortiqcha byurokratiyasiz qabul qilinadi. Bir tomonlama eshik (One-way door): orqaga qaytarish juda qiyin yoki imkonsiz qarorlar (baza turini almashtirish, dasturlash tilini o'zgartirish) — chuqur tahlil va barcha manfaatdorlar roziligi bilan qabul qilinadi."
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Jamoangiz oldida turgan 4 ta qarorni bir tomonlama va ikki tomonlama eshiklarga ajrating va ularni qabul qilish tezligini belgilang.",
      acceptanceCriteria: [
        "Qaytariladigan qarorlarni tez qabul qilib, jamoani sekinlashishdan saqlaydi",
        "Qaytarilishi qiyin arxitekturaviy qarorlarga chuqur mas'uliyat bilan yondashadi"
      ],
      prerequisites: ["82.4"]
    },
    {
      id: "82.14",
      title: "Stakeholder Alignment",
      description: [
        "Manfaatdor tomonlar roziligini olish — texnik qarorni faqat dasturchilar emas, biznes va operatsion bo'limlar bilan hamjihatlikda qabul qilish.",
        "",
        "CTO, Product Owner, xavfsizlik bo'limi va mijozlarga xizmat ko'rsatish jamoasiga qaror qanday ta'sir qilishini tushuntirish. Agar texnik qaror mijozlar xizmati uchun xatolarni topishni qiyinlashtirsa, bu jamoalararo ziddiyatga olib keladi."
      ],
      priority: "important",
      level: "Lead",
      practicalTask: "Katta refactoring zaruratini Product Owner va biznes rahbarlariga moliyaviy va vaqt tejash nuqtai nazaridan tushuntirib, rozilik oling.",
      acceptanceCriteria: [
        "Biznes va texnika manfaatlari o'rtasida konsensus topadi",
        "Barcha tomonlarning xavotirlarini tinglaydi va hisobga oladi"
      ],
      prerequisites: ["78.13", "84.13"]
    },
    {
      id: "82.15",
      title: "Technical Debt Assessment",
      description: [
        "Qaror paytidagi texnik qarzni baholash — vaqtinchalik yechim (kompromiss) qabul qilinganda uning oqibatlarini ochiq tan olish.",
        "",
        "Ba'zan biznes talabi sababli 'tez, lekin chala' yechim qilishga to'g'ri keladi (Ongli texnik qarz). Senior muhandis buni yashirmaydi, balki darhol: 'Biz muddatga ulgurish uchun hozir X qildik, bu texnik qarz, uni keyingi sprintda to'g'rilashimiz shart' deb beklogga vazifa qo'yadi."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "Vaqtinchalik tezkor yechim kiritilayotganda paydo bo'ladigan texnik qarzni va uni to'lash rejasini rasmiylashtiring.",
      acceptanceCriteria: [
        "Ongli texnik qarz bilan e'tiborsiz xatolik farqini biladi",
        "Texnik qarzni yashirmasdan beklogda qayd etib boradi"
      ],
      prerequisites: ["6.13", "73.18"]
    },
    {
      id: "82.16",
      title: "Measuring Decision Outcomes",
      description: [
        "Qaror natijalarini o'lchash — qaror qabul qilinib joriy etilgandan so'ng, u kutilgan natijani berdimi yoki yo'qligini tekshirish.",
        "",
        "Masalan: 'Biz kesh qo'shdik. Natijada p95 javob vaqti 300 ms dan 45 ms ga tushdimi? DB yuklamasi kamaydimi?'. Agar natija kutilgandek bo'lmasa, xatoni tan olish va o'zgartirish kiritish mahorati."
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Arxitekturaviy o'zgarishdan keyin 30 kun o'tgach uning unumdorlik va barqarorlik metrikalari bo'yicha tahliliy hisobotini tuzing.",
      acceptanceCriteria: [
        "Qarorlarni shunchaki qoldirib ketmasdan, metrikalar orqali samaradorligini o'lchaydi",
        "Noto'g'ri qarorlarni vaqtida to'g'rilash uchun doimiy monitoring yuritadi"
      ],
      prerequisites: ["58.11", "81.13"]
    }
  ]
});
