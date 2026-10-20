/* 77 · Swagger
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 77,
  slug: "swagger",
  title: "Swagger",
  group: "api",
  description: "Swagger — OpenAPI spetsifikatsiyalari bilan ishlash, ularni vizuallashtirish, tahrirlash va interaktiv sinovdan o'tkazish uchun mo'ljallangan mashhur ochiq kodli vositalar ekotizimidir (SmartBear). Senior Laravel dasturchi Swagger UI ni Laravel loyihasiga (DarkaOnLine/L5-Swagger kabi paketlar orqali) xavfsiz integratsiya qiladi, brauzerdan to'g'ridan-to'g'ri API ni sinab ko'rish ('Try it out') imkoniyatini sozlaydi va production muhitida hujjatlarni begonalardan himoyalaydi.",
  subskills: [
    {
      id: "77.1",
      title: "Swagger UI",
      description: [
        "Swagger UI — OpenAPI (YAML/JSON) spetsifikatsiyasini dinamik, chiroyli va qulay HTML/CSS/JS veb-sahifaga aylantirib beruvchi vizual frontend kutubxona.",
        "",
        "U dasturchilar va integratsiyachilarga API bilan qulay tanishish, endpointlarni ochib-yopish, parametrlar, tiplar va javob namunalarini o'rganish imkoniyatini yaratadi. Laravel da `l5-swagger` orqali `/api/documentation` manzilida ochiladi."
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Laravel ilovasida `DarkaOnLine/L5-Swagger` paketini o'rnating va Swagger UI sahifasi brauzerda ochilishini ta'minlang.",
      acceptanceCriteria: [
        "Swagger UI paketini Laravelga xatosiz integratsiya qiladi",
        "Veb-interfeysda spetsifikatsiyaning vizual aks etishini sozlaydi"
      ],
      prerequisites: ["75.15", "76.1"]
    },
    {
      id: "77.2",
      title: "Swagger Editor",
      description: [
        "Swagger Editor — OpenAPI spetsifikatsiyalarini real vaqt rejimida yozish, sintaktik tekshirish va bir vaqtning o'zida vizual natijasini ko'rish uchun mo'ljallangan brauzer muharriri.",
        "",
        "Chap tomonda YAML yoziladi, o'ng tomonda esa Swagger UI darhol yangilanib boradi. Matn terish jarayonida xatolar va singan havolalar (broken $ref) darhol qizil bilan ko'rsatiladi."
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Swagger Editor (onlayn yoki Docker konteyneri) orqali yangi API uchun YAML yozing va sintaktik xatolarni bartaraf eting.",
      acceptanceCriteria: [
        "Swagger Editor vositasidan samarali foydalana oladi",
        "Haqiqiy vaqt rejimida spetsifikatsiyaning xatolarini tuzatadi"
      ],
      prerequisites: ["76.1"]
    },
    {
      id: "77.3",
      title: "OpenAPI Integration",
      description: [
        "Swagger UI ni mavjud OpenAPI JSON/YAML fayli bilan bog'lash.",
        "",
        "Swagger UI o'zida ma'lumot saqlamaydi — u shunchaki JSON spetsifikatsiyani ko'rsatuvchi oynadir. Laravel da generatsiya qilingan `storage/api-docs/api-docs.json` fayli Swagger UI ning `url` parametriga beriladi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Swagger UI ga statik `openapi.yaml` faylini yuklang va u orqali to'liq spetsifikatsiya ko'rinishini ta'minlang.",
      acceptanceCriteria: [
        "Swagger UI konfiguratsiyasida JSON/YAML manzilini to'g'ri ko'rsatadi",
        "CORS yoki fayl yo'li xatolarini hal qiladi"
      ],
      prerequisites: ["77.1", "76.1"]
    },
    {
      id: "77.4",
      title: "Interactive API Documentation",
      description: [
        "Interaktiv API hujjatlari — o'lik PDF yoki Word fayllar o'rniga, har bir endpoint bo'yicha real sinov o'tkazish imkonini beruvchi jonli hujjat.",
        "",
        "Parametrlarni kiritish, filtrlar berish va JSON so'rov yuborish mumkin. Dasturchi Postman yoki cURL ochib o'tirmasdan, bevosita brauzerdagi hujjatdan turib API ni to'liq sinab ko'radi."
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Swagger UI interfeysi orqali mahsulotlar ro'yxatini olish so'rovini yuborib, natijani brauzerda ko'ring.",
      acceptanceCriteria: [
        "Brauzerdan turib haqiqiy API chaqiruvlarini amalga oshiradi",
        "Interaktiv hujjatning qulayliklarini integratsiya jamoasiga tushuntiradi"
      ],
      prerequisites: ["77.1"]
    },
    {
      id: "77.5",
      title: "Authentication Configuration",
      description: [
        "Swagger UI da 'Authorize' tugmasini sozlash — himoyalangan endpointlarga so'rov yuborish uchun token yoki kalit kiritish oynasi.",
        "",
        "Spetsifikatsiyadagi `securitySchemes` to'g'ri sozlangan bo'lsa, Swagger UI yuqori qismida yashil 'Authorize' qulf tugmasi paydo bo'ladi. Dasturchi o'z Bearer tokenini kiritgach, keyingi barcha 'Try it out' so'rovlariga avtomatik ravishda `Authorization: Bearer <token>` headeri qo'shiladi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "L5-Swagger konfiguratsiyasida Sanctum Bearer tokenini sozlang va Swagger UI da 'Authorize' tugmasi orqali autentifikatsiyani sinang.",
      acceptanceCriteria: [
        "Swagger UI da 'Authorize' modalkasini to'g'ri chiqaradi",
        "So'rov headeriga Bearer tokenni avtomatik biriktiradi"
      ],
      prerequisites: ["76.8", "77.1"]
    },
    {
      id: "77.6",
      title: "Request/Response Examples",
      description: [
        "Swagger interfeysida so'rov va javob namunalarini ko'rsatish.",
        "",
        "Swagger UI spetsifikatsiyadagi misollarni 'Example Value' blokida qulay formatlangan JSON ko'rinishida ko'rsatadi. 'Try it out' bosilganda ushbu misol avtomatik ravishda tahrirlanuvchi so'rov oynasiga tushadi, bu esa dasturchilar vaqtini sezilarli darajada tejaydi."
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Swagger UI da yangi buyurtma yaratish so'rovi uchun avtomatik to'ldiriladigan 'Example Value' misollarini chiqaring.",
      acceptanceCriteria: [
        "Misollar so'rov matniga to'g'ri yuklanishini ta'minlaydi",
        "Turli stsenariylarni tanlash uchun dropdown misollarini sozlaydi"
      ],
      prerequisites: ["76.11"]
    },
    {
      id: "77.7",
      title: "Schema Visualization",
      description: [
        "Sxemalarni vizual ifodalash — murakkab obyektlar va ma'lumotlar strukturasini ierarxik, ochiluvchi-yopiluvchi modellar ko'rinishida ko'rsatish.",
        "",
        "Swagger UI pastki qismida 'Schemas' bo'limida barcha komponentlar ro'yxati chiqadi. Har bir maydonning tipi, majburiyligi (qizil yulduzcha `*` bilan), minimal/maksimal cheklovlari va tavsifi vizual tarzda ko'rsatiladi."
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Swagger UI ning 'Schemas' bo'limida User va Order modellarining ichki bog'liqliklari to'g'ri ko'rinishini ta'minlang.",
      acceptanceCriteria: [
        "Sxemalarning vizual daraxtsimon tuzilishini tushunadi",
        "`required` maydonlar va tiplarning aniq ko'rsatilishini ta'minlaydi"
      ],
      prerequisites: ["76.6"]
    },
    {
      id: "77.8",
      title: "Try-It-Out Configuration",
      description: [
        "'Try it out' imkoniyatini sozlash — brauzerdan to'g'ridan-to'g'ri so'rov yuborishda uchraydigan CORS va tarmoq to'siqlarini bartaraf etish.",
        "",
        "Agar Swagger UI alohida domenda yoki portda joylashgan bo'lsa, backend da CORS (Laravel `cors.php`) to'g'ri sozlangan bo'lishi shart. Aks holda brauzer so'rovni 'Network Error' yoki 'CORS policy' xatosi bilan bloklab qo'yadi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Swagger UI boshqa portdan murojaat qilganda ham 'Try it out' ishlashi uchun Laravel CORS sozlamalarini to'g'rilang.",
      acceptanceCriteria: [
        "Swagger 'Network Error' muammosini CORS orqali hal qiladi",
        "Kerak bo'lganda 'Try it out' tugmasini ishlab chiqarishda o'chirib qo'yishni (disable) biladi"
      ],
      prerequisites: ["50.10", "77.4"]
    },
    {
      id: "77.9",
      title: "Protected Documentation",
      description: [
        "Hujjatlarni ruxsatsiz kirishdan himoyalash — production serverlarida Swagger UI sahifasini ommaga ochiq qoldirmaslik.",
        "",
        "Katta xavfsizlik xatosi: barcha ichki API lar, parametrlar va tuzilmani butun internetga ochiq qoldirish. Himoya choralari: Basic Auth middleware qo'yish, faqat ma'lum IP manzillardan kirishga ruxsat berish yoki faqat tizim adminlari uchun sessiya tekshiruvini yoqish."
      ],
      priority: "core",
      level: "Strong Middle",
      practicalTask: "Laravel da `/api/documentation` marshrutini faqat `admin` roliga ega foydalanuvchilar yoki Basic Auth orqali ochiladigan middleware bilan o'rang.",
      acceptanceCriteria: [
        "API hujjatlarini ommaviy sizib chiqishdan himoyalaydi",
        "Production muhitida hujjatlarni xavfsiz taqdim etish usullarini biladi"
      ],
      prerequisites: ["51.9", "77.1"]
    },
    {
      id: "77.10",
      title: "Generated Docs",
      description: [
        "Koddagi izohlar (Annotations / Attributes) orqali Swagger spetsifikatsiyasini avtomatik yig'ish.",
        "",
        "PHP 8 Attributes (OpenApi / zircote/swagger-php) yordamida bevosita Controller metodlari ustida: `#[OA\\Get(path: '/users', summary: '...')]` deb yoziladi. `php artisan l5-swagger:generate` buyrug'i orqali barcha atributlar o'qilib, bitta `api-docs.json` fayliga yig'iladi."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Controller metodiga PHP 8 `#[OA\\Get]` va `#[OA\\Response]` atributlarini yozib, artisan orqali Swagger faylini generatsiya qiling.",
      acceptanceCriteria: [
        "PHP 8 Attributes orqali OpenAPI tavsiflarini yozadi",
        "Artisan buyrug'i orqali hujjatni avtomatik yangilaydi"
      ],
      prerequisites: ["1.18", "77.1"]
    },
    {
      id: "77.11",
      title: "Version Compatibility",
      description: [
        "Swagger vositalari va OpenAPI versiyalari o'rtasidagi moslik masalalari.",
        "",
        "Swagger 2.0 (eski spetsifikatsiya formati) va OpenAPI 3.0 / 3.1 o'rtasidagi farqlar. Eski kutubxonalar ko'pincha OpenAPI 3.1 dagi yangi JSON Schema funksiyalarini to'liq qo'llab-quvvatlamasligi mumkin. Senior dasturchi paketlar va spetsifikatsiya versiyasi mosligini doim nazorat qiladi."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "Swagger 2.0 dagi eski spetsifikatsiyani OpenAPI 3.0 formatiga o'tkazish rejasini va farqlarini aniqlang.",
      acceptanceCriteria: [
        "Swagger 2.0 va OpenAPI 3.x farqlarini tushuntiradi",
        "Swagger UI kutubxonasining OpenAPI 3.1 bilan moslik darajasini hisobga oladi"
      ],
      prerequisites: ["76.17"]
    },
    {
      id: "77.12",
      title: "Documentation Validation",
      description: [
        "Swagger UI yuklanishidagi xatoliklarni aniqlash va tuzatish.",
        "",
        "Agar spetsifikatsiyada xatolik bo'lsa, Swagger UI pastida qizil 'ERROR' belgisi chiqadi yoki butunlay bo'sh oq sahifa ochiladi. Brauzer Developer Tools (Console va Network) orqali qaysi `$ref` topilmagani yoki qaysi JSON formati buzilgani tezkor aniqlanadi."
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Swagger UI da 'Failed to load API definition' xatosi yuz berganda brauzer konsoli orqali sababini topib tuzating.",
      acceptanceCriteria: [
        "Swagger UI xatoliklarini tezkor tashxis qiladi",
        "Singan havolalar va JSON parse xatolarini bartaraf etadi"
      ],
      prerequisites: ["76.14", "77.1"]
    },
    {
      id: "77.13",
      title: "Swagger va OpenAPI farqi",
      description: [
        "Swagger va OpenAPI atamalari o'rtasidagi aniq chegarani bilish — ko'plab dasturchilar bularni adashtiradilar.",
        "",
        "OpenAPI — bu rasmiy spetsifikatsiya (standart, qonun-qoida, format). Swagger esa — ushbu spetsifikatsiya bilan ishlash uchun SmartBear kompaniyasi yaratgan vositalar to'plamidir (Swagger UI, Swagger Editor, Swagger Codegen). Ya'ni: 'Spetsifikatsiya — OpenAPI, interfeys — Swagger UI'."
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Jamoa uchun Swagger va OpenAPI tushunchalari orasidagi farqni va tarixini tushuntiruvchi qisqa yo'riqnoma yozing.",
      acceptanceCriteria: [
        "Standart (OpenAPI) va vositalar (Swagger) farqini aniq tushuntiradi",
        "Professional texnik muloqotda atamalarni to'g'ri qo'llaydi"
      ],
      prerequisites: ["75.1", "76.1"]
    }
  ]
});
