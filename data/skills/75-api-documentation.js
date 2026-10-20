/* 75 · API Documentation
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 75,
  slug: "api-documentation",
  title: "API Documentation",
  group: "api",
  description: "API hujjatlashtirish — backend dasturchi bilan frontend, mobil jamoalar va tashqi hamkorlar o'rtasidagi yagona rasmiy shartnomadir (Single Source of Truth). Senior Laravel dasturchi to'liq, tushunarli va interaktiv API hujjatlarini (OpenAPI/Swagger, Scribe, Scramble) yuritadi, so'rov va javob sxemalarini qat'iy standartlashtiradi, xatoliklar va paginatsiya qoidalarini aniq yoritadi hamda kod o'zgarishi bilan hujjatlar ham avtomatik sinxron yangilanishini ta'minlaydi.",
  subskills: [
    {
      id: "75.1",
      title: "OpenAPI Specification",
      description: [
        "OpenAPI Specification (OAS) — RESTful API larni inson va kompyuter tushunadigan formatda (YAML yoki JSON) standartlashtirilgan holda tavsiflash bo'yicha xalqaro ochiq standart.",
        "",
        "U API ning mavjud endpointlari, qabul qilinadigan parametrlar, qaytadigan javoblar, ma'lumotlar tiplari va xavfsizlik sxemalarini dasturlash tilidan mustaqil ravishda ifodalaydi. Hozirda 3.0 va 3.1 versiyalari eng keng qo'llaniladi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Oddiy foydalanuvchi profilini olish endpointi uchun OpenAPI 3.0 formatida YAML spetsifikatsiyasini yozing.",
      acceptanceCriteria: [
        "OpenAPI asosiy strukturasini (openapi, info, paths, components) to'g'ri shakllantiradi",
        "Spetsifikatsiyaning YAML/JSON validatsiyasidan o'tishini ta'minlaydi"
      ],
      prerequisites: ["18.1"]
    },
    {
      id: "75.2",
      title: "Endpoint Descriptions",
      description: [
        "Endpoint tavsiflari — har bir URL yo'lining nima vazifa bajarishini, biznes kontekstini va foydalanish shartlarini aniq tushuntirish.",
        "",
        "Shunchaki 'Foydalanuvchini yangilash' deb ketmasdan, qanday holatda qaysi maydonlar o'zgarishi, qanday nojo'ya ta'sirlar (masalan, email o'zgarsa qayta tasdiqlash xati ketishi) yuz berishi batafsil `summary` va `description` maydonlarida bayon etiladi."
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Buyurtma yaratish endpointi uchun uning kirish talablari va biznes oqibatlarini tushuntiruvchi to'liq Markdown tavsif yozing.",
      acceptanceCriteria: [
        "Qisqa sarlavha (summary) va batafsil tavsifni (description) aniq ajratadi",
        "Biznes qoidalari va nojo'ya ta'sirlarni hujjatda aks ettiradi"
      ],
      prerequisites: ["75.1"]
    },
    {
      id: "75.3",
      title: "Request Schemas",
      description: [
        "So'rov sxemalari (Request Schemas) — API ga yuborilishi kerak bo'lgan barcha parametrlar (path, query, header, request body) va ularning qat'iy tiplarini tavsiflash.",
        "",
        "Har bir maydon uchun tipi (string, integer, boolean, array, object), formati (uuid, email, date-time), majburiyligi (`required`), minimal/maksimal uzunligi va regex qoidalari Laravel FormRequest validatsiyasi bilan 1:1 mos holda ko'rsatiladi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Ro'yxatdan o'tish formasi uchun barcha maydonlari va validatsiya qoidalari aks etgan JSON Schema tuzing.",
      acceptanceCriteria: [
        "Maydon tiplari va required atributlarini to'g'ri ko'rsatadi",
        "Laravel FormRequest qoidalari bilan sxema to'liq mos kelishini ta'minlaydi"
      ],
      prerequisites: ["2.13", "75.1"]
    },
    {
      id: "75.4",
      title: "Response Schemas",
      description: [
        "Javob sxemalari (Response Schemas) — muvaffaqiyatli (200 OK, 201 Created, 204 No Content) so'rovlardan qaytadigan JSON ma'lumotlar strukturasining aniq ta'rifi.",
        "",
        "Laravel da Eloquent API Resource (`JsonResource`) qaytaradigan struktura bilan javob sxemasi bir xil bo'lishi shart. Nested obyektlar, massivlar va nullable maydonlar aniq ko'rsatiladi, bu esa frontend dasturchilarga TypeScript interfeyslarini avtomatik generatsiya qilish imkonini beradi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Foydalanuvchi va uning buyurtmalari ro'yxatini qaytaruvchi API javobining to'liq JSON sxemasini yozing.",
      acceptanceCriteria: [
        "Eloquent API Resource qaytaradigan barcha maydonlarni qamrab oladi",
        "Nullable va ixtiyoriy maydonlarni to'g'ri belgilaydi"
      ],
      prerequisites: ["2.25", "18.5"]
    },
    {
      id: "75.5",
      title: "Authentication Requirements",
      description: [
        "Autentifikatsiya talablari — endpointdan foydalanish uchun qanday xavfsizlik kaliti yoki tokeni talab qilinishini hujjatlashtirish.",
        "",
        "OpenAPI `securitySchemes` blokida Bearer Token (Sanctum/JWT), API Key yoki OAuth2 sozlamalari ko'rsatiladi. Har bir endpoint ochiq (public) yoki qaysi huquq/role (scopes) talab qilishi aniq belgilanadi."
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "OpenAPI spetsifikatsiyasida Laravel Sanctum Bearer tokeni uchun `securitySchemes` blokini sozlang va himoyalangan endpointga biriktiring.",
      acceptanceCriteria: [
        "Bearer Auth header strukturasini to'g'ri tavsiflaydi",
        "Ommaviy va himoyalangan endpointlar farqini hujjatda aniq ko'rsatadi"
      ],
      prerequisites: ["20.5", "23.1"]
    },
    {
      id: "75.6",
      title: "Error Responses",
      description: [
        "Xatolik javoblari formati — kutilgan va kutilmagan xatoliklar yuz berganda qaytadigan standart JSON strukturasi.",
        "",
        "RFC 7807 (Problem Details for HTTP APIs) yoki Laravel standart formati (`message`, `errors` obyekti). Hujjatda 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found va 422 Unprocessable Entity javoblarining real misollari keltirilishi shart."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Validatsiya xatoligi (422) va topilmadi (404) xatoliklari uchun standart JSON xatolik sxemasi va misollarini hujjatlashtiring.",
      acceptanceCriteria: [
        "Barcha asosiy HTTP xatolik statuslarini qamrab oladi",
        "Yagona va izchil xatolik javob strukturasini taqdim etadi"
      ],
      prerequisites: ["18.13", "19.7"]
    },
    {
      id: "75.7",
      title: "Examples",
      description: [
        "Haqiqiy misollar (Examples) — sxemalardan tashqari real hayotiy so'rov va javob namunalarini taqdim etish.",
        "",
        "Sxema qanchalik to'g'ri bo'lmasin, dasturchilar birinchi navbatda 'real json namunasi'ga qarab integratsiyani boshlaydi. Hujjatda to'liq to'ldirilgan ideal misol (rich example) va minimal kerakli maydonlar bilan berilgan misollar keltirilishi tavsiya etiladi."
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Mavjud endpoint hujjatiga haqiqiy ma'lumotlar bilan to'ldirilgan so'rov va javob namunalarini qo'shing.",
      acceptanceCriteria: [
        "`foo`, `bar`, `test` kabi bema'ni so'zlar o'rniga haqiqiy domenga oid misollar keltiradi",
        "Sxemadagi barcha maydonlarning real qiymatlarini ko'rsatadi"
      ],
      prerequisites: ["75.3", "75.4"]
    },
    {
      id: "75.8",
      title: "Pagination Documentation",
      description: [
        "Paginatsiya hujjatlari — ro'yxat qaytaruvchi barcha API larda sahifalash qanday ishlashini aniq yoritish.",
        "",
        "Offset-based (`page=1&per_page=15`) yoki Cursor-based (`cursor=eyJpZCI6MTB9`) usuli tushuntiriladi. Javobdagi meta ma'lumotlar (`total`, `current_page`, `last_page`, `links`) yoki kursor kalitlari qat'iy hujjatlashtiriladi."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Laravel `LengthAwarePaginator` va `CursorPaginator` javoblari uchun OpenAPI sxemasini loyihalang.",
      acceptanceCriteria: [
        "Paginatsiya query parametrlari va javob meta strukturasini to'liq ko'rsatadi",
        "Katta ma'lumotlar uchun kursor paginatsiyasining qo'llanishini tushuntiradi"
      ],
      prerequisites: ["2.24", "18.11"]
    },
    {
      id: "75.9",
      title: "Rate Limit Documentation",
      description: [
        "So'rovlar soni cheklovlari (Rate Limiting) — mijoz soniyasiga yoki daqiqasiga necha marta murojaat qilishi mumkinligini bayon etish.",
        "",
        "Cheklov mezonlari (masalan: daqiqasiga 60 ta so'rov), limit oshib ketganda qaytadigan 429 Too Many Requests statusi, hamda HTTP javob headerlari (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `Retry-After`) qanday ishlashi hujjatlashtiriladi."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "API hujjati bo'limida tizimning umumiy va alohida kritik endpointlar uchun rate limit qoidalarini hamda 429 xatoligini tushuntiring.",
      acceptanceCriteria: [
        "Rate limit ko'rsatkichlari va qaytuvchi HTTP headerlarini bayon qiladi",
        "Limit oshganda mijoz o'zini qanday tutishi (backoff strategiyasi) bo'yicha yo'riqnoma beradi"
      ],
      prerequisites: ["18.15", "51.20"]
    },
    {
      id: "75.10",
      title: "Versioning",
      description: [
        "API ni versiyalash strategiyasi — o'zgarishlar kiritilganda hujjatda versiyalarni boshqarish.",
        "",
        "URL versiyalash (`/api/v1/users`, `/api/v2/users`), header versiyalash yoki query parametrlar. Hujjatda har bir versiyaning alohida spetsifikatsiyasi mavjud bo'lishi va ular orasidagi farqlar (changelog) aniq ko'rsatilishi kerak."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "OpenAPI hujjatida V1 va V2 versiyalarini alohida taqsimlash va ularning farqlarini ko'rsatishni sozlang.",
      acceptanceCriteria: [
        "API versiyalash strategiyasini hujjatlashtirishda qo'llaydi",
        "Mavjud mijozlar uchun versiyalar o'rtasidagi farqlar jadvalini beradi"
      ],
      prerequisites: ["18.12", "19.10"]
    },
    {
      id: "75.11",
      title: "Deprecation Notices",
      description: [
        "Eskirish haqida ogohlantirishlar (Deprecation) — ma'lum bir endpoint yoki maydon kelajakda o'chirilishi haqida mijozlarni oldindan xabardor qilish.",
        "",
        "OpenAPI da `deprecated: true` atributi qo'yiladi. Shuningdek, HTTP `Deprecation` va `Sunset` headerlari orqali endpoint aynan qaysi sanadan boshlab ishlamay qolishi va uning o'rniga qaysi yangi endpointdan foydalanish kerakligi ta'rifda yoziladi."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "Eski endpointni OpenAPI spetsifikatsiyasida deprecated deb belgilang va yangi endpointga o'tish bo'yicha migratsiya qo'llanmasini yozing.",
      acceptanceCriteria: [
        "Spetsifikatsiyada `deprecated: true` belgisini to'g'ri o'rnatadi",
        "O'rniga tavsiya etilayotgan yangi yechimni aniq havola qiladi"
      ],
      prerequisites: ["19.18", "75.10"]
    },
    {
      id: "75.12",
      title: "Schema Validation",
      description: [
        "Sxemalarni tekshirish — yozilgan OpenAPI hujjatining sintaktik va semantik to'g'riligini linterlar orqali tekshirish.",
        "",
        "Spectral yoki vacuum kabi vositalar yordamida OpenAPI hujjati qoidalar buzilishi, noto'g'ri tiplar yoki etishmayotgan tavsiflar bo'yicha CI/CD da avtomatik tekshiriladi. Noto'g'ri formatlangan spetsifikatsiya mijoz SDK generatorlarini ishdan chiqaradi."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "Spectral linter yordamida OpenAPI YAML faylini tekshirib, xatoliklar va ogohlantirishlarni bartaraf eting.",
      acceptanceCriteria: [
        "OpenAPI linterlaridan foydalanib sintaksis xatolarini topadi",
        "CI quvurida spetsifikatsiyaning avtomatik validatsiyasini ta'minlaydi"
      ],
      prerequisites: ["75.1"]
    },
    {
      id: "75.13",
      title: "Contract Consistency",
      description: [
        "Hujjat va haqiqiy kodning 100% mosligi — 'yozilgan hujjat' bilan 'ishlab turgan kod' o'rtasida ziddiyat bo'lmasligi.",
        "",
        "Eng katta xavf: kod o'zgaradi, lekin hujjat unutiladi. Bunga qarshi kurashish uchun testlar paytida haqiqiy API javoblarini OpenAPI sxemasiga solishtirib tekshiruvchi avtomatlashtirilgan kontrakt testlari (masalan `spectator` paketi) ishlatiladi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Laravel testlarida `spectator` kutubxonasi orqali har bir endpoint javobini OpenAPI fayliga mosligini avtomatik assertion qiling.",
      acceptanceCriteria: [
        "Kod o'zgarganda hujjat eskirib qolishi muammosini hal qiladi",
        "Test bosqichida kod va hujjat o'rtasidagi ziddiyatlarni ushlaydi"
      ],
      prerequisites: ["74.9", "75.12"]
    },
    {
      id: "75.14",
      title: "Generated Documentation",
      description: [
        "Hujjatlarni avtomatik generatsiya qilish — qo'lda YAML yozish o'rniga, Laravel kodi, PHPDoc va FormRequestlardan foydalanib hujjatni avtomatik yaratish.",
        "",
        "Laravel da buning uchun Scribe (`knuckleswtf/scribe`), Scramble (`dedoc/scramble`) yoki L5-Swagger paketlari keng qo'llaniladi. Ular Controller, FormRequest va Resource klasslarini tahlil qilib, to'liq interaktiv hujjat sahifasini hosil qiladi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Laravel loyihasiga Scramble yoki Scribe paketini o'rnating va barcha API endpointlar uchun avtomatik hujjat generatsiya qiling.",
      acceptanceCriteria: [
        "Avtomatik generatorlar konfiguratsiyasini to'g'ri sozlaydi",
        "FormRequest va PHPDoc orqali generatorga to'liq ma'lumot yetkazadi"
      ],
      prerequisites: ["75.1", "76.1"]
    },
    {
      id: "75.15",
      title: "Interactive API Explorer",
      description: [
        "Interaktiv API tekshirgich — foydalanuvchilar brauzerdan turib to'g'ridan-to'g'ri API ga so'rov yuborib ko'rishlari mumkin bo'lgan interfeys ('Try it out').",
        "",
        "Swagger UI, Redoc yoki Stoplight Elements kabi vositalar OpenAPI fayli asosida chiroyli veb-sahifa ochib beradi. Dasturchilar o'z tokenlarini kiritib, so'rov parametrlarini to'ldirib, natijani darhol o'sha yerda sinab ko'rishlari mumkin."
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Swagger UI yoki Redoc orqali OpenAPI hujjatingizni chiroyli va interaktiv veb-sahifa ko'rinishida taqdim eting.",
      acceptanceCriteria: [
        "Brauzerda qulay va interaktiv API tekshirish muhitini ta'minlaydi",
        "'Try it out' imkoniyati uchun CORS va autentifikatsiyani to'g'ri ulaydi"
      ],
      prerequisites: ["77.1"]
    },
    {
      id: "75.16",
      title: "Keeping Docs Updated",
      description: [
        "Hujjatlarni doimiy yangi holatda ushlab turish madaniyati — har qanday yangi xususiyat yoki o'zgarish hujjat yangilanmasdan turib qabul qilinmasligi.",
        "",
        "'Doc-driven development' yoki Code Review qoidalariga 'Hujjat yangilanganmi?' bandini kiritish. Shuningdek, CI da hujjat generatsiyasini avtomatlashtirish orqali reliz bo'lishi bilan hujjat serveriga yangi versiya avtomatik yuklanadi."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "GitHub Actions orqali asosiy tarmoqqa merge bo'lganda API hujjatini avtomatik qayta generatsiya qilib serverga joylashtiruvchi pipeline sozlang.",
      acceptanceCriteria: [
        "Hujjat yangilanishini CI/CD quvurining ajralmas qismiga aylantiradi",
        "Eskirgan va yolg'on hujjatlar paydo bo'lishining oldini oladi"
      ],
      prerequisites: ["72.17", "75.14"]
    }
  ]
});
