/* 85 · Architecture Review
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 85,
  slug: "architecture-review",
  title: "Architecture Review",
  group: "architecture",
  description: "Arxitektura tekshiruvi (Architecture Review) — yangi tizim yoki yirik yangilanish ishlab chiqilishidan oldin uning arxitekturasini xolis, har tomonlama va tanqidiy tahlil qilish jarayonidir. Senior va Lead muhandislar tizimning biznes talablari va cheklovlariga muvofiqligi, komponentlar chegarasi, ma'lumotlar egaligi (Data Ownership), xavfsizlik, nosozlik stsenariylari (Failure Modes), operatsion murakkablik va xarajatlarini ko'rib chiqadi. Bu ishlab chiqish boshlanmasidan oldin qimmatbaho arxitekturaviy xatolarning oldini oladi.",
  subskills: [
    {
      id: "85.1",
      title: "Requirements and Constraints",
      description: [
        "Talablar va cheklovlarning to'liqligini tekshirish — arxitektura tahlilining birinchi qadami.",
        "",
        "Taklif qilinayotgan arxitektura haqiqiy biznes talablariga mos keladimi? Texnik cheklovlar (mavjud serverlar, byudjet, litsenziyalar, qonunchilik talablari — masalan, shaxsiy ma'lumotlarni mamlakat ichida saqlash) hisobga olinganmi? Hali to'liq shakllanmagan yoki noaniq talablar ustiga qurilgan arxitektura darhol rad etiladi."
      ],
      priority: "core",
      level: "Lead",
      practicalTask: "Yangi loyiha arxitektura loyihasini (Design Doc) biznes talablari va texnik cheklovlarga mosligini tekshiring.",
      acceptanceCriteria: [
        "Arxitekturaviy talablar va cheklovlarni aniq tekshiradi",
        "Noaniq yoki ziddiyatli talablarni muallifga qaytaradi"
      ],
      prerequisites: ["66.1", "66.2"]
    },
    {
      id: "85.2",
      title: "Component Boundaries",
      description: [
        "Komponentlar chegaralarini tekshirish — modullar va servislar o'rtasida mas'uliyat doirasi (Single Responsibility va Bounded Contexts) aniq ajratilganligini baholash.",
        "",
        "Spagetti bog'lanishlar yo'qmi? 'Order' moduli 'User' modulining ichki modellariga to'g'ridan-to'g'ri aralashib ketmaganmi? Har bir komponent aniq interfeys orqali muloqot qilayotgani va modul ichki sirlari tashqariga yopiq (Encapsulation) ekanligi tekshiriladi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Modulli monolit arxitekturasi loyihasida 2 ta modul o'rtasidagi chegaralarni va qaramliklarni audit qiling.",
      acceptanceCriteria: [
        "Bounded Context chegaralari to'g'ri belgilanganligini baholaydi",
        "Modullar orasidagi ortiqcha o'zaro chatishuvlarni to'xtatadi"
      ],
      prerequisites: ["61.6", "63.11"]
    },
    {
      id: "85.3",
      title: "Dependency Direction",
      description: [
        "Bog'liqliklar yo'nalishini tekshirish — qaramlik qoidasi (Dependency Rule) to'g'ri yo'naltirilganligini nazorat qilish.",
        "",
        "Clean Architecture talabi: yuqori darajadagi biznes mantiq (Domain, Use Cases) past darajadagi implementatsiya detallariga (MySQL, Redis, AWS SDK) bog'lanib qolmasligi shart. Bog'liqliklar faqat markazga — domen mantiqiga qarab yo'nalgan bo'lishi kerak. Dependency Inversion Principle (DIP) to'g'ri qo'llanilgani ko'rib chiqiladi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Domain qatlamidan bevosita Eloquent modelga yoki tashqi API ga bog'lanib qolgan noto'g'ri qaramlik yo'nalishini aniqlang va tuzating.",
      acceptanceCriteria: [
        "Bog'liqlik yo'nalishi qoidalarini (Dependency Rule) qat'iy nazorat qiladi",
        "Interfeyslar orqali qatlamlarni ajratishni (DIP) talab qiladi"
      ],
      prerequisites: ["4.5", "64.1"]
    },
    {
      id: "85.4",
      title: "Data Ownership",
      description: [
        "Ma'lumotlar egaligi (Data Ownership) — har bir jadval, ob'ekt yoki ma'lumotlar to'plamiga faqat bitta servis yoki modul ega (Owner) ekanligini ta'minlash.",
        "",
        "Katta arxitekturaviy xato: bitta jadvalga 5 ta turli modul yoki servis to'g'ridan-to'g'ri yozishi va o'qishi. Bu kelajakda bazani bo'lishga (sharding yoki mikroservisga) mutlaqo to'sqinlik qiladi. Ma'lumot egasi bo'lgan modul o'z ma'lumotlarini faqat o'z API si orqali boshqalarga taqdim etishi shart."
      ],
      priority: "core",
      level: "Lead",
      practicalTask: "Bir nechta servislar bitta umumiy ma'lumotlar bazasi jadvaliga to'g'ridan-to'g'ri yozayotgan arxitekturani bitta aniq Owner orqali ajrating.",
      acceptanceCriteria: [
        "Har bir ma'lumot uchun yagona mas'ul servis (Single Writer) tamoyilini o'rnatadi",
        "Umumiy ma'lumotlar bazasi antinaqshini (Shared Database anti-pattern) bartaraf etadi"
      ],
      prerequisites: ["65.8", "65.9"]
    },
    {
      id: "85.5",
      title: "API Contracts",
      description: [
        "API shartnomalarining sifatini tekshirish — modullar yoki servislar o'rtasidagi ma'lumot almashish interfeysi qanchalik puxta o'ylanganligi.",
        "",
        "OpenAPI/gRPC spetsifikatsiyalari yozilganmi? So'rov va javob tiplari aniqmi? Idempotentlik (Idempotency Keys) ko'zda tutilganmi? Katta hajmdagi ma'lumotlar uchun sahifalash bormi? Xatoliklar formati standartlashtirilganmi? Chala yozilgan kontrakt butun loyiha integratsiyasini to'xtatadi."
      ],
      priority: "core",
      level: "Strong Middle",
      practicalTask: "Yangi mikroservis uchun taklif qilingan REST API shartnomasini idempotency, xatoliklar va paginatsiya bo'yicha tahlil qiling.",
      acceptanceCriteria: [
        "API shartnomasining qat'iyligi va to'liqligini tekshiradi",
        "Idempotency va xatoliklarni qayta ishlash qoidalarini talab qiladi"
      ],
      prerequisites: ["19.1", "76.1"]
    },
    {
      id: "85.6",
      title: "Security Assessment",
      description: [
        "Arxitekturaviy xavfsizlik auditi — tizim loyihasini xavfsizlik prizmasi (Threat Modeling / STRIDE) orqali ko'rib chiqish.",
        "",
        "Xavfsizlik chegaralari (Trust Boundaries) qayerda? Autentifikatsiya qanday uzatiladi? Nozik ma'lumotlar (parollar, kartalar) qayerda va qanday shifrlanadi? Ichki tarmoqda 'Zero Trust' tamoyili bormi yoki faqat tashqi perimetr himoyalanganmi? Arxitektura darajasidagi xavfsizlik bo'shlig'ini keyinchalik kod bilan yopib bo'lmaydi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Tizim arxitekturasi uchun STRIDE modeli asosida tahdidlar modellashtirishini (Threat Modeling) o'tkazing.",
      acceptanceCriteria: [
        "Xavfsizlikni eng boshidan arxitekturaga singdiradi (Security by Design)",
        "Tarmoqlararo ishonch chegaralari va shifrlash talablarini baholaydi"
      ],
      prerequisites: ["51.22", "52.1"]
    },
    {
      id: "85.7",
      title: "Performance Assessment",
      description: [
        "Unumdorlikni oldindan baholash — taklif qilinayotgan arxitektura kerakli javob vaqtini (masalan p95 < 100 ms) bera oladimi?",
        "",
        "So'rov yo'lida qancha tarmoq sakrashlari (network hops) bor? Bitta foydalanuvchi so'rovi ketidan 10 ta ichki servisga sinxron so'rov ketmayaptimi (Distributed N+1)? Kesh qayerda turibdi va kesh bo'lmaganda (cache miss) baza yuklamani ko'tara oladimi? Hisob-kitoblar bilan unumdorlik isbotlanishi kerak."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Bitta foydalanuvchi so'rovi o'tadigan barcha qatlamlardagi kechikishlarni (Latency Budget) hisoblab, qiyin nuqtalarni aniqlang.",
      acceptanceCriteria: [
        "Tarmoq sakrashlari va kechikish budjetini (Latency Budget) to'g'ri hisoblaydi",
        "Sinxron zanjirli chaqiruvlarni asinxron oqimlarga almashtirishni talab qiladi"
      ],
      prerequisites: ["53.2", "66.3"]
    },
    {
      id: "85.8",
      title: "Scalability Assessment",
      description: [
        "Masshtablanuvchanlik auditi — tizim 10 barobar yuklama kelganda shunchaki yangi server qo'shish bilan (gorizontal) kengaya oladimi?",
        "",
        "Arxitekturada 'yagona bo'yinbog'lar' (Bottlenecks) bormi? Masalan: barcha yozishlar bitta MySQL masterga borishi yoki xotirada holat saqlovchi (stateful) komponentlar mavjudligi. Stateless veb-qatlam, ma'lumotlar bazasi replikalari va asinxron navbatlar orqali gorizontal kengayish imkoniyati tekshiriladi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Tizim arxitekturasida gorizontal masshtablashga to'sqinlik qiluvchi barcha yagona nuqtalarni (Single Points of Failure/Bottlenecks) aniqlang.",
      acceptanceCriteria: [
        "Tizimning gorizontal kengayish imkoniyatini baholaydi",
        "Yozish va o'qish yuklamalarini taqsimlash yechimlarini tekshiradi"
      ],
      prerequisites: ["67.1", "67.7"]
    },
    {
      id: "85.9",
      title: "Availability and Resilience",
      description: [
        "Mavjudlik va chidamlilik — tizimning 99.9% yoki 99.99% ishlash kafolati (SLA).",
        "",
        "Single Point of Failure (SPOF) bormi? Bitta server, bitta ma'lumotlar bazasi yoki bitta Availability Zone o'chib qolsa nima bo'ladi? Multi-AZ, avtomatik failover, yuklama taqsimlagichlar (ALB) va sog'lomlik tekshiruvlari (Health Checks) mavjudligi tekshiriladi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Arxitekturadagi barcha yagona nosozlik nuqtalarini (SPOF) toping va ularni ortiqchalik (redundancy) orqali yo'qoting.",
      acceptanceCriteria: [
        "SPOF larni aniqlaydi va dublyaj (redundancy) choralarini ko'radi",
        "Avtomatik failover va yuqori mavjudlik parametrlarini tasdiqlaydi"
      ],
      prerequisites: ["68.1", "68.2"]
    },
    {
      id: "85.10",
      title: "Failure Modes",
      description: [
        "Nosozlik rejimlari va kaskadli to'xtashlar tahlili — 'Agar komponent X ishlamay qolsa, nima bo'ladi?'.",
        "",
        "Agar Redis o'chsa, butun sayt yiqiladimi yoki shunchaki sekinlashib ishlayveradimi (Graceful Degradation)? Agar to'lov tizimi javob bermasa, buyurtmalar navbatda kutadimi yoki xatolik bilan bekor bo'ladimi? Circuit Breaker, Timeout, Retry va Dead Letter Queue mexanizmlari tekshiriladi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Tashqi SMS shlyuzi to'xtab qolganda ilovaning o'zini qanday tutishi bo'yicha Failure Mode tahlilini qiling va fallback yozing.",
      acceptanceCriteria: [
        "Barcha kritik komponentlar bo'yicha nosozlik stsenariylarini tahlil qiladi",
        "Graceful degradation va Circuit Breaker himoyasini talab qiladi"
      ],
      prerequisites: ["65.13", "68.9"]
    },
    {
      id: "85.11",
      title: "Observability",
      description: [
        "Kuzatuvchanlik auditi — tizim ishlab chiqarishga chiqqach, uning ichida nima bo'layotganini qanday bilamiz?",
        "",
        "Kuzatuvchanlikning 3 ta ustuni: Metrikalar (Prometheus/CloudWatch — CPU, RAM, RPS, 5xx xatolar), Jurnallar (strukturalashgan JSON loglar, Logstash) va Tarqoq treyslar (Distributed Tracing — OpenTelemetry/Jaeger). Bitta so'rov bir nechta mikroservisdan o'tganda umumiy `Correlation ID` bo'yicha izlash imkoniyati bormi?"
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "Arxitektura loyihasiga Correlation ID va taqsimlangan treyslar (OpenTelemetry) integratsiyasini qo'shish talabini kiriting.",
      acceptanceCriteria: [
        "Metrikalar, loglar va treyslar (Metrics, Logs, Traces) qamrovini tekshiradi",
        "Nosozliklarni tezkor topish uchun Correlation ID mexanizmini kiritadi"
      ],
      prerequisites: ["58.4", "65.16"]
    },
    {
      id: "85.12",
      title: "Deployment Complexity",
      description: [
        "Deploy qilish murakkabligini baholash — taklif qilingan tizimni ishlab chiqarishga chiqarish va yangilash qanchalik qulay.",
        "",
        "Agar yangi reliz chiqarish uchun 10 ta servisni aynan bitta soniyada bir vaqtda deploy qilish kerak bo'lsa (Distributed Monolith) — bu dahshatli arxitekturadir. Har bir modul yoki servis mustaqil, nol uzilish (Zero-Downtime) bilan deploy qilina olishi shart."
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Servislarni mustaqil deploy qilishga to'sqinlik qiluvchi zanjirlarni aniqlang va mustaqil reliz modeliga o'tkazing.",
      acceptanceCriteria: [
        "Bir vaqtda deploy qilish qaramliklarini (coupled deployments) bartaraf etadi",
        "Zero-downtime va mustaqil reliz strategiyasini tasdiqlaydi"
      ],
      prerequisites: ["43.14", "65.3"]
    },
    {
      id: "85.13",
      title: "Migration Strategy",
      description: [
        "Eski tizimdan yangisiga o'tish strategiyasi — yangi arxitekturaga qanday qilib ishlab turgan foydalanuvchilarni to'xtatmasdan o'tiladi.",
        "",
        "Strangler Fig naqshi: yangi tizim eski tizim atrofida quriladi va trafik asta-sekin (1%, 5%, 50%, 100%) yangi tizimga yo'naltiriladi (Canary Release). Ma'lumotlar bazasini parallel yozish (Dual-writing) va uzilishsiz orqaga qaytish (Rollback) rejasi tekshiriladi."
      ],
      priority: "core",
      level: "Lead",
      practicalTask: "Eski to'lov tizimidan yangi arxitekturaga nol uzilish bilan o'tish bo'yicha Strangler Fig va Dual-Writing rejasini tuzing.",
      acceptanceCriteria: [
        "Big-Bang migratsiyasining xatarlarini bartaraf etadi",
        "Bosqichma-bosqich Canary trafik o'tkazish rejasini ishlab chiqadi"
      ],
      prerequisites: ["43.13", "73.17"]
    },
    {
      id: "85.14",
      title: "Backward Compatibility",
      description: [
        "Yangi arxitekturaning mavjud tizimlar bilan mosligi.",
        "",
        "Eski mobil ilovalar, uchinchi tomon integratsiyalari va mavjud bazalar yangi arxitektura sababli buzilmasligini tekshirish. Agar arxitektura mavjud ma'lumotlar strukturasini o'zgartirsa, eski mijozlarni qo'llab-quvvatlash uchun adapter qatlami (Anti-Corruption Layer) mavjudligi nazorat qilinadi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Eski va yangi tizim o'rtasida ma'lumotlar o'zgarishini yutib oluvchi Anti-Corruption Layer (ACL) adapterini loyihalang.",
      acceptanceCriteria: [
        "Eski tizimlar bilan orqaga moslikni saqlaydi",
        "Anti-Corruption Layer orqali eski tizimning yangi arxitekturani bulg'ashini oldini oladi"
      ],
      prerequisites: ["63.13", "82.10"]
    },
    {
      id: "85.15",
      title: "Cost Analysis",
      description: [
        "Arxitekturaviy xarajatlar tahlili (Financial Feasibility) — bu tizim kompaniyaga oyiga qanchaga tushadi?",
        "",
        "AWS/Cloud xarajatlari: EC2, RDS, ElastiCache, S3, Tarmoq trafigi (NAT Gateway, Data Transfer out). Agar arxitektura biznes keltiradigan oylik daromaddan ko'proq xarajat talab qilsa — bu muvaffaqiyatsiz texnik loyihadir. Xarajatlarni tejash uchun arxitekturani optimallashtirish."
      ],
      priority: "important",
      level: "Lead",
      practicalTask: "Taklif qilingan AWS bulut arxitekturasining oylik sarfini AWS Pricing Calculator orqali hisoblab, 30% tejash variantini toping.",
      acceptanceCriteria: [
        "Bulut infratuzilmasi xarajatlarini to'g'ri hisoblaydi",
        "Kompaniya moliyaviy imkoniyatlariga mos keluvchi arxitekturani tasdiqlaydi"
      ],
      prerequisites: ["66.23", "70.24"]
    },
    {
      id: "85.16",
      title: "Operational Complexity",
      description: [
        "Operatsion murakkablik — ishlab chiqarishdagi tizimni saqlash, boshqarish va xatolarni tuzatish jamoaga qanchalik og'ir bo'ladi.",
        "",
        "Agar 3 kishilik kichik jamoa 15 ta mikroservis, Kafka, Kubernetes va 4 xil ma'lumotlar bazasidan iborat arxitekturani tanlagan bo'lsa — ular kod yozish o'rniga faqat infratuzilmani tuzatish bilan ovora bo'ladi. Arxitektura jamoaning o'lchami va tajribasiga mutanosib bo'lishi shart."
      ],
      priority: "core",
      level: "Lead",
      practicalTask: "Kichik jamoa uchun ortiqcha operatsion yuk keltiruvchi arxitekturani Modul Monolit shaklida soddalashtiring.",
      acceptanceCriteria: [
        "Operatsion xarajatlar va jamoa resurslarini hisobga oladi",
        "Foydasiz murakkablikka yo'l qo'ymaydi"
      ],
      prerequisites: ["61.3", "65.19"]
    },
    {
      id: "85.17",
      title: "ADR Review",
      description: [
        "Arxitektura qarorlari jurnallarini (ADR) ko'rib chiqish va tasdiqlash.",
        "",
        "Yangi arxitekturaviy taklif bilan birga uning sabablari va muqobillari keltirilgan ADR taqdim etilganmi? Barcha jamoa yetakchilari va arxitektorlar ushbu ADR ni o'qib, o'z e'tirozlarini bildiradilar va yakunda 'Accepted' yoki 'Rejected' statusi qo'yiladi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Hamkasbingiz yozgan yangi kesh arxitekturasi bo'yicha ADR hujjatini tahlil qiling va unga 3 ta tanqidiy savol bering.",
      acceptanceCriteria: [
        "ADR hujjatining mantiqiy asoslanganligini tekshiradi",
        "Qarorning jamoaviy muhokamasini va tasdiqlanishini boshqaradi"
      ],
      prerequisites: ["80.4", "82.12"]
    },
    {
      id: "85.18",
      title: "Trade-off Documentation",
      description: [
        "Murosalarni rasmiy hujjatlashtirish — har qanday arxitektura kompromiss ekanligini ochiq e'tirof etish.",
        "",
        "Loyihada nima sababdan ushbu variant tanlangani, nimalardan voz kechilgani (masalan: tezlik uchun xotiradan voz kechildi, soddalik uchun taqsimlangan tranzaksiyalardan voz kechildi) hujjatda aniq yoziladi. Bu kelajakda boshqalar qarorni noto'g'ri tanqid qilmasligini ta'minlaydi."
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Ma'lumotlar bazasida kuchli izchillik o'rniga eventual consistency tanlanganini va buning oqibatlarini hujjatlashtiring.",
      acceptanceCriteria: [
        "Har bir arxitekturaviy tanlovning yutuq va yo'qotishlarini yozib qoldiradi",
        "Yechimning cheklovlarini yashirmaydi"
      ],
      prerequisites: ["82.4", "81.9"]
    },
    {
      id: "85.19",
      title: "Risks and Mitigations",
      description: [
        "Xatarlar va ularni yumshatish choralari xaritasi — arxitektura tahlilining yakuniy xavfsizlik to'ri.",
        "",
        "Aniqlangan har bir arxitekturaviy xavf (masalan: tashqi servisning sekin javob berishi) yoniga uni bartaraf etuvchi aniq muhandislik yechimi (masalan: 2 soniyalik timeout, Redis kesh fallback va asinxron navbat) yoziladi. Xatarlari yechilmagan loyiha kodlashga o'tishiga ruxsat berilmaydi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Yangi integratsiya arxitekturasi bo'yicha 4 ta jiddiy xavf va ularning har biri uchun yumshatuvchi muhandislik chorasini belgilang.",
      acceptanceCriteria: [
        "Har bir xavf uchun aniq texnik yumshatish rejasini (Mitigation) beradi",
        "Kritik xatarlar bartaraf etilmaguncha arxitekturani tasdiqlamaydi"
      ],
      prerequisites: ["81.10", "84.10"]
    },
    {
      id: "85.20",
      title: "Architecture Evolution",
      description: [
        "Evolyutsion arxitektura — arxitekturani toshga o'yib yozilgan qotib qolgan narsa emas, balki biznes va yuklama o'sishi bilan doimiy o'zgarib boruvchi tirik organizm sifatida loyihalash.",
        "",
        "Loyiha bugungi talabga mos kelishi kerak, lekin 2 yildan keyin uni o'zgartirishni butunlay imkonsiz qilib qo'ymasligi lozim. Modullararo chegaralar va toza interfeyslar kelajakda butun boshli komponentlarni boshqa texnologiyalarga oson almashtirish imkonini beradi."
      ],
      priority: "core",
      level: "Lead",
      practicalTask: "Monolit ilovani kelajakda kerak bo'lganda alohida mikroxizmatlarga oson ajratish imkonini beruvchi Modul Monolit arxitekturasini loyihalang.",
      acceptanceCriteria: [
        "Arxitekturani kelajakdagi o'zgarishlarga moslashuvchan (Evolutionary) qilib quradi",
        "Premature Optimization (erta optimallashtirish) va qotib qolgan arxitektura xatolaridan qochadi"
      ],
      prerequisites: ["61.20"]
    }
  ]
});
