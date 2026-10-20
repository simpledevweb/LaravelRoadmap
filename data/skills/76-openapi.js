/* 76 · OpenAPI
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 76,
  slug: "openapi",
  title: "OpenAPI",
  group: "api",
  description: "OpenAPI (sobiq Swagger Specification) — zamonaviy RESTful API arxitekturasining dasturlash tilidan mustaqil, mashina o'qiy oladigan rasmiy tavsiflash standartidir. Senior Laravel dasturchi OpenAPI 3.x spetsifikatsiyasi tuzilishini (Paths, Components, Schemas, Security) chuqur biladi, API-First yondashuvini qo'llay oladi, qayta ishlatiluvchi komponentlar yordamida DRY spetsifikatsiyalar tuzadi va spetsifikatsiyadan foydalanib avtomatlashtirilgan SDK generatsiyasi hamda kontrakt testlarini yo'lga qo'yadi.",
  subskills: [
    {
      id: "76.1",
      title: "OpenAPI Specification Structure",
      description: [
        "OpenAPI hujjati tuzilishi — ildiz (root) obyektining asosiy bloklari: `openapi` (versiya), `info` (nomi, tavsifi, aloqa ma'lumotlari), `servers` (ishlab chiqish va ishlab chiqarish URL lari), `paths` (endpointlar va HTTP metodlar) va `components` (qayta ishlatiluvchi sxemalar).",
        "",
        "Ushbu qat'iy ierarxiya butun API landshaftini bitta xaritada aniq ko'rish imkonini beradi. YAML yoki JSON formatida yoziladi, lekin inson o'qishi uchun YAML formati ko'proq tavsiya etiladi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Yangi loyiha uchun `openapi`, `info`, `servers` va bo'sh `paths` bloklarini o'z ichiga olgan valid OpenAPI 3.0 YAML skeletonini yarating.",
      acceptanceCriteria: [
        "OpenAPI ning barcha majburiy ildiz kalitlarini to'g'ri joylashtiradi",
        "Multiple servers (local, staging, production) konfiguratsiyasini ta'minlaydi"
      ],
      prerequisites: ["75.1"]
    },
    {
      id: "76.2",
      title: "Paths and Operations",
      description: [
        "Yo'llar va amallar (Paths & Operations) — `paths` bloki ostida URL manzili (masalan `/api/v1/users/{id}`) va unga tegishli HTTP metodlari (`get`, `post`, `put`, `patch`, `delete`).",
        "",
        "Har bir amal ichida `operationId` (SDK generatorlar uchun yagona metod nomi, masalan `getUserById`), `summary`, `description`, `tags`, `parameters`, `requestBody` va `responses` e'lon qilinadi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "RESTful foydalanuvchilar resursi uchun CRUD amallarini (GET, POST, PUT, DELETE) `paths` ostida to'liq tavsiflang.",
      acceptanceCriteria: [
        "HTTP metodlar semantikasiga to'g'ri amal qiladi",
        "Har bir amal uchun yagona va ma'noli `operationId` belgilaydi"
      ],
      prerequisites: ["18.3", "76.1"]
    },
    {
      id: "76.3",
      title: "Parameters",
      description: [
        "Parametrlar — URL orqali uzatiladigan ma'lumotlar. OpenAPI da 4 xil joylashuv (in) mavjud: `path` (`/users/{id}`), `query` (`?status=active&page=2`), `header` (`X-Client-Version`), va `cookie`.",
        "",
        "`path` parametrlari doim `required: true` bo'lishi shart. Har bir parametr o'zining `schema`siga (tip, format, default, enum) ega bo'ladi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Filtrlash, saralash va sahifalash uchun 4 ta `query` parametrini va bitta `path` parametrini OpenAPI da to'liq e'lon qiling.",
      acceptanceCriteria: [
        "`in: path`, `in: query` va `in: header` joylashuvlarini to'g'ri ishlatadi",
        "`required`, `schema` va `description` maydonlarini to'liq ta'minlaydi"
      ],
      prerequisites: ["18.9", "76.2"]
    },
    {
      id: "76.4",
      title: "Request Bodies",
      description: [
        "So'rov tanasi (Request Body) — POST, PUT, PATCH so'rovlari bilan yuboriladigan ma'lumotlar tavsifi.",
        "",
        "`content` obyekti ostida MIME turlari ko'rsatiladi: `application/json`, `multipart/form-data` (fayl yuklashda) yoki `application/x-www-form-urlencoded`. Har bir MIME turi o'z `schema`siga va `examples`iga bog'lanadi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Foydalanuvchi ma'lumotlari va profil rasmini yuklash uchun `multipart/form-data` qabul qiluvchi `requestBody` sxemasini yozing.",
      acceptanceCriteria: [
        "JSON va multipart/form-data kontent turlarini to'g'ri tavsiflaydi",
        "Fayllar uchun `type: string`, `format: binary` qoidasini qo'llaydi"
      ],
      prerequisites: ["76.2", "76.6"]
    },
    {
      id: "76.5",
      title: "Responses",
      description: [
        "Javoblar (Responses) — endpoint qaytarishi mumkin bo'lgan barcha HTTP status kodlari va ularning kontenti ro'yxati.",
        "",
        "Har bir status kodi (200, 201, 204, 400, 401, 403, 404, 422, 500) uchun `description` va `content` ko'rsatiladi. 204 No Content javoblarida `content` bo'lmaydi. Har bir muvaffaqiyatli endpoint kamida bitta 2xx va kutilgan 4xx javoblari bilan hujjatlashtirilishi shart."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "201 Created javobi va 422 Validation Error javoblarini o'z ichiga olgan `responses` blokini yozing.",
      acceptanceCriteria: [
        "Tegishli HTTP status kodlarini to'g'ri tanlaydi",
        "Har bir status kodi uchun aniq javob sxemasi biriktiradi"
      ],
      prerequisites: ["18.4", "76.2"]
    },
    {
      id: "76.6",
      title: "Schemas",
      description: [
        "Sxemalar — JSON ma'lumotlarining ichki tuzilishini JSON Schema qoidalari asosida belgilash.",
        "",
        "Asosiy tiplar: `string`, `number`, `integer`, `boolean`, `array`, `object`. Xususiyatlar (properties), majburiy maydonlar ro'yxati (`required`), qiymatlar ro'yxati (`enum`), formatlar (`date-time`, `email`, `uuid`), hamda kompozitsiya operatorlari (`allOf`, `oneOf`, `anyOf`) ishlatiladi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Manzil obyekti (`street`, `city`, `zipCode`, `country_code` enum) uchun qat'iy validatsiyali JSON Schema yozing.",
      acceptanceCriteria: [
        "JSON Schema tiplari va formatlarini to'g'ri qo'llaydi",
        "`required` maydonlar massivini to'g'ri belgilaydi"
      ],
      prerequisites: ["75.3", "75.4"]
    },
    {
      id: "76.7",
      title: "Components and Reuse",
      description: [
        "Komponentlar va qayta ishlatish — umumiy sxemalar, javoblar, parametrlar va xavfsizlik sozlamalarini `components` bo'limida markazlashtirish.",
        "",
        "`$ref: '#/components/schemas/User'` sintaksisi orqali spetsifikatsiyaning istalgan joyidan havola qilinadi. Bu DRY tamoyilini ta'minlaydi: User obyekti o'zgarsa, 20 ta endpointdagi havola avtomatik yangilanadi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "`components/schemas` bo'limida umumiy `PaginationMeta` va `ErrorResponse` sxemalarini e'lon qilib, ularni endpointlarda `$ref` bilan ishlating.",
      acceptanceCriteria: [
        "Takrorlanuvchi sxemalarni `components` bo'limiga ajratadi",
        "`$ref` ko'rsatkichlaridan xatosiz foydalanadi"
      ],
      prerequisites: ["76.6"]
    },
    {
      id: "76.8",
      title: "Authentication Schemes",
      description: [
        "Autentifikatsiya sxemalari — `components/securitySchemes` ostida API da qo'llaniladigan xavfsizlik turlarini e'lon qilish.",
        "",
        "Turlari (`type`): `http` (scheme: `bearer`, bearerFormat: `JWT`), `apiKey` (in: `header`, name: `X-API-KEY`), `oauth2` (flows: `authorizationCode`, `clientCredentials`), va `openIdConnect`. Laravel loyihalari uchun odatda Bearer Sanctum/JWT sxemasi sozlanadi."
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Sanctum Bearer token va API Key turlari uchun `components/securitySchemes` konfiguratsiyasini sozlang.",
      acceptanceCriteria: [
        "Bearer va ApiKey xavfsizlik turlarini to'g'ri e'lon qiladi",
        "`bearerFormat` va header nomlarini aniq ko'rsatadi"
      ],
      prerequisites: ["20.3", "75.5"]
    },
    {
      id: "76.9",
      title: "Security Requirements",
      description: [
        "Xavfsizlik talablarini qo'llash — e'lon qilingan autentifikatsiya sxemalarini global yoki aniq bir endpoint darajasida majburiy qilish.",
        "",
        "Ildiz darajasidagi `security: - bearerAuth: []` butun API ni yopiq qiladi. Agar bitta endpoint ochiq bo'lishi kerak bo'lsa (masalan `/login`), uning ichida `security: []` (bo'sh massiv) ko'rsatiladi. OAuth2 bo'lsa, talab qilinadigan scope'lar massivda ko'rsatiladi."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Butun API ni global Bearer auth bilan himoyalang, faqat `/api/login` va `/api/register` amallari uchun xavfsizlikni ochiq qoldiring.",
      acceptanceCriteria: [
        "Global va lokal `security` direktivalarini to'g'ri qo'llaydi",
        "Ommaviy endpointlarni `security: []` orqali to'g'ri istisno qiladi"
      ],
      prerequisites: ["76.8"]
    },
    {
      id: "76.10",
      title: "Error Schemas",
      description: [
        "Standart xatolik sxemalari — butun loyiha bo'ylab bir xil bo'lgan xatolik formatini `components/schemas` da e'lon qilish.",
        "",
        "Odatda ikkita asosiy sxema bo'ladi: 1) Umumiy xatolik (`message`, `code`, `timestamp`); 2) Form validatsiyasi xatoligi (`message`, `errors: { field_name: ['xato matni'] }`). Barcha 4xx va 5xx javoblar shu umumiy komponentlarga havolalanadi."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Laravel validatsiya xatoligi formatiga to'liq mos keluvchi `ValidationErrorResponse` sxemasini yozing va uni 422 javobiga bog'lang.",
      acceptanceCriteria: [
        "Laravel validatsiya javobi strukturasini xatosiz ifodalaydi",
        "Barcha endpointlarda xatolik javoblarini standartlashtiradi"
      ],
      prerequisites: ["75.6", "76.7"]
    },
    {
      id: "76.11",
      title: "Examples",
      description: [
        "OpenAPI da misollar bilan ishlash — `example` (yagona qiymat) va `examples` (nomlangan bir nechta misollar) kalitlari.",
        "",
        "Parametrlarda, sxemalarda yoki to'g'ridan-to'g'ri media-type ichida beriladi. Bir nechta misollar berish orqali bitta endpoint uchun har xil stsenariylarni (masalan: jismoniy shaxs va yuridik shaxs profili) ko'rsatish mumkin."
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Buyurtma yaratish so'rovi uchun 'Oddiy buyurtma' va 'Chegirmali buyurtma' nomli 2 ta alohida misolni `examples` blokida taqdim eting.",
      acceptanceCriteria: [
        "Yagona `example` va ko'p sonli `examples` sintaksisini to'g'ri ishlatadi",
        "Misollarning sxemaga to'liq muvofiq kelishini ta'minlaydi"
      ],
      prerequisites: ["75.7"]
    },
    {
      id: "76.12",
      title: "Tags",
      description: [
        "Teglar (Tags) — endpointlarni mantiqiy guruhlarga (masalan: 'Auth', 'Users', 'Products', 'Orders') ajratish.",
        "",
        "Ildizdagi `tags` blokida har bir tegning nomi va batafsil tavsifi keltiriladi. Swagger UI yoki Redoc da teglar alohida ochiluvchi/yopiluvchi bo'limlar ko'rinishida aks etadi, bu esa yuzlab endpointga ega yirik tizimlarda navigatsiyani osonlashtiradi."
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Loyihadagi 15 ta endpointni 3 ta teg ('Authentication', 'Catalog', 'Checkout') bo'yicha guruhlang va har bir tegga tavsif yozing.",
      acceptanceCriteria: [
        "API endpointlarini mantiqiy domenlar bo'yicha toza guruhlaydi",
        "Hujjat interfeysida qulay navigatsiyani ta'minlaydi"
      ],
      prerequisites: ["76.2"]
    },
    {
      id: "76.13",
      title: "API Versioning",
      description: [
        "OpenAPI da API versiyalarini tashkil qilish — turli yondashuvlar: bitta spetsifikatsiyada `/v1` va `/v2` yo'llarini saqlash yoki har bir versiya uchun mustaqil `openapi-v1.yaml` va `openapi-v2.yaml` fayllarini yuritish.",
        "",
        "Alohida fayllar yuritish katta loyihalarda ko'proq tavsiya etiladi, chunki bu versiyalar o'rtasidagi bog'liqlikni yo'qotadi va V1 ni o'zgartirmasdan V2 ustida mustaqil ishlash imkonini beradi."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "Loyiha uchun V1 va V2 spetsifikatsiya fayllarini ajrating va umumiy komponentlarni o'zaro almashish arxitekturasini quring.",
      acceptanceCriteria: [
        "Versiyalar o'rtasida mustaqillikni ta'minlaydi",
        "Breaking change larni yangi versiya spetsifikatsiyasiga to'g'ri ko'chiradi"
      ],
      prerequisites: ["75.10"]
    },
    {
      id: "76.14",
      title: "Schema Validation",
      description: [
        "OpenAPI spetsifikatsiyasining sintaktik va mantiqiy validatsiyasi.",
        "",
        "`swagger-cli validate` yoki Spectral CLI vositalari yordamida `$ref` larning mavjudligi, majburiy kalitlarning to'liqligi va OpenAPI spetsifikatsiyasi meta-sxemasiga mosligi tekshiriladi. Noto'g'ri yozilgan spetsifikatsiya CI da xatolik berishi shart."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "NPM orqali `@stoplight/spectral-cli` o'rnating va o'z OpenAPI spetsifikatsiyangizni terminal orqali tekshirib, xatolarni to'g'rilang.",
      acceptanceCriteria: [
        "Linterlar yordamida singan `$ref` va sintaktik xatolarni topadi",
        "Spetsifikatsiyaning 100% valid ekanligini tasdiqlaydi"
      ],
      prerequisites: ["75.12"]
    },
    {
      id: "76.15",
      title: "Code Generation",
      description: [
        "Kodni avtomatik generatsiya qilish — OpenAPI YAML faylidan foydalanib frontend (TypeScript/Axios), mobil (Dart/Swift/Kotlin) SDK larni yoki backend testlarini avtomatik yaratish.",
        "",
        "`openapi-generator-cli` yoki `orval` vositalari orqali amalga oshiriladi. Natijada frontend dasturchi bitta qator ham qo'lda API chaqiruvchi kod yozmaydi — barcha modellar va metodlar avtomatik, to'liq tiplangan (type-safe) holda paydo bo'ladi."
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "OpenAPI faylingizdan `openapi-generator-cli` yordamida TypeScript/Axios API SDK sini avtomatik generatsiya qiling.",
      acceptanceCriteria: [
        "OpenAPI dan mijoz SDK sini avtomatik yaratishni yo'lga qo'yadi",
        "`operationId` va modellarning to'g'ri generatsiya qilinishini ta'minlaydi"
      ],
      prerequisites: ["76.2", "76.7"]
    },
    {
      id: "76.16",
      title: "Contract Testing",
      description: [
        "OpenAPI asosidagi kontrakt testlari — haqiqiy backend javoblari spetsifikatsiyada va'da qilingan sxemaga mos kelishini avtomatlashtirilgan tarzda tekshirish.",
        "",
        "Laravel da `hotmeteor/spectator` kutubxonasi yordamida: `$response = $this->getJson('/api/users'); $response->assertValidRequest(); $response->assertValidResponse(200);` bitta qator bilan butun JSON javobi va uning barcha tiplari OpenAPI sxemasiga solishtirib tekshiriladi. Agar backend yangi maydon qo'shib spetsifikatsiyaga yozmagan bo'lsa, test yiqiladi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Laravel test paketiga `spectator` kutubxonasini qo'shing va asosiy Feature testlarda `assertValidResponse()` orqali kontraktni tekshiring.",
      acceptanceCriteria: [
        "Kontrakt testlari orqali backend va hujjat sinxronligini kafolatlaydi",
        "Sxemadan chetga chiqishlarni (schema drift) test bosqichidayoq to'xtatadi"
      ],
      prerequisites: ["74.9", "75.13"]
    },
    {
      id: "76.17",
      title: "OpenAPI 3.x",
      description: [
        "OpenAPI 3.0 va 3.1 versiyalari orasidagi farqlar va yangiliklar.",
        "",
        "OpenAPI 3.1 to'liq JSON Schema 2020-12 bilan 100% mos keladi (ilgari ayrim cheklovlar bor edi). Endi tiplarni massiv sifatida berish mumkin: `type: [string, 'null']` (`nullable: true` o'rniga), shuningdek `webhooks` bloki bevosita spetsifikatsiyaning ildizida qo'llab-quvvatlanadi."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "OpenAPI 3.0 dagi `nullable: true` sxemasini OpenAPI 3.1 standarti bo'yicha `type: ['string', 'null']` formatiga o'tkazing.",
      acceptanceCriteria: [
        "OpenAPI 3.0 va 3.1 versiyalari farqini aniq biladi",
        "OpenAPI 3.1 da vebxuklarni (webhooks) to'g'ri tavsiflay oladi"
      ],
      prerequisites: ["24.1", "76.1"]
    }
  ]
});
