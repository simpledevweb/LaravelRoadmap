/* 71 · Amazon S3
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 71,
  slug: "amazon-s3",
  title: "Amazon S3",
  group: "cloud",
  description: "Amazon Simple Storage Service (S3) — ob'ektli ma'lumotlarni saqlash bo'yicha global standart bo'lib, cheksiz sig'im, 99.999999999% chidamlilik va yuqori xavfsizlik darajasini kafolatlaydi. Laravel ilovalarida foydalanuvchi fayllari, mediakontent, backup'lar va hisobotlarni saqlashda asosiy poydevor hisoblanadi. Senior dasturchi S3 xavfsizlik siyosatlari (Bucket Policies, Block Public Access), keshlash (CloudFront), xarajatlarni qisqartirish (Lifecycle Rules) va to'g'ridan-to'g'ri xavfsiz yuklash (Presigned URLs) usullarini mukammal egallashi shart.",
  subskills: [
    {
      id: "71.1",
      title: "Buckets va Objects",
      description: [
        "S3 arxitekturasi Bucket (konteyner/savat) va Object (har qanday fayl va uning metadata'si) tamoyiliga qurilgan. Bucket nomi butun dunyo bo'ylab yagona (globally unique) bo'lishi shart.",
        "",
        "S3 an'anaviy papka tuzilmasiga ega emas; barcha ob'ektlar tekis (flat) saqlanadi. 'Papka' tushunchasi faqat ob'ekt nomidagi `/` belgisi (prefix) orqali vizual ifodalanadi."
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "AWS CLI yoki konsol orqali yangi bucket yarating va unga test fayl yuklab, uning URI manzilini aniqlang.",
      acceptanceCriteria: [
        "Bucket va Object tushunchasini hamda nomlash qoidalarini biladi",
        "S3 ning ierarxik fayl tizimi emas, balki ob'ektli saqlash ekanligini tushunadi"
      ],
      prerequisites: ["70.7"]
    },
    {
      id: "71.2",
      title: "Object Keys",
      description: [
        "Object Key — bu ob'ektning bucket ichidagi yagona to'liq identifikatori (yo'li), masalan `avatars/users/42/profile.jpg`.",
        "",
        "Key nomlarini loyihalashda ehtiyot bo'lish zarur: maxsus belgilar va bo'shliqlardan qochish, shuningdek bir xil prefiks ostida soniyada minglab so'rovlar bo'lganda S3 o'tkazuvchanligini pasaytirmaslik uchun xesh/UUID prefikslaridan to'g'ri foydalanish lozim."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Laravel da fayl yuklanayotganda to'qnashuvlar (collision) oldini oluvchi UUID va sana asosidagi kalit generasiya qiluvchi yordamchi metod yozing.",
      acceptanceCriteria: [
        "Object key strukturasini xavfsiz va to'qnashuvsiz loyihalaydi",
        "Prefikslarning S3 ishlash unumiga ta'sirini biladi"
      ],
      prerequisites: ["71.1"]
    },
    {
      id: "71.3",
      title: "Regions",
      description: [
        "AWS Region — S3 bucket jismonan joylashtiriladigan geografik hudud (masalan `eu-central-1` yoki `ap-southeast-1`).",
        "",
        "Regionni tanlashda uchta asosiy mezon bor: foydalanuvchilarga yaqinlik (kechikishni kamaytirish), qonuniy talablar (ma'lumotlarni mamlakat ichida saqlash - compliance) va narx (turli mintaqalarda GB narxi har xil). Laravel `.env` da `AWS_DEFAULT_REGION` bilan to'g'ri moslanishi shart."
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Ilova auditoriyasiga mos keluvchi mintaqani tanlab, `config/filesystems.php` dagi AWS mintaqasini sozlang.",
      acceptanceCriteria: [
        "Kechikish va qonunchilik talablari asosida to'g'ri mintaqa tanlaydi",
        "Mintaqalararo trafik xarajatlarini (data transfer out) hisobga oladi"
      ],
      prerequisites: ["70.7"]
    },
    {
      id: "71.4",
      title: "IAM Policies",
      description: [
        "IAM Policies — foydalanuvchilar va rollarga biriktiriladigan, S3 bilan qanday amallarni bajarish mumkinligini ko'rsatuvchi ruxsatnomalar.",
        "",
        "Laravel ilovasi uchun faqat `s3:GetObject`, `s3:PutObject`, `s3:DeleteObject` kabi zarur harakatlarni faqat kerakli bucketning kerakli prefiksiga ruxsat berish xavfsizlikning oltin qoidasidir."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Laravel API foydalanuvchisi uchun faqat `invoices/*` papkasiga yozish huquqini beruvchi IAM Policy JSON tayyorlang.",
      acceptanceCriteria: [
        "IAM Action, Resource va Effect bloklarini xatosiz tuzadi",
        "Zarur bo'lmagan keng ruxsatlarni (masalan `s3:*`) cheklaydi"
      ],
      prerequisites: ["70.1", "70.22"]
    },
    {
      id: "71.5",
      title: "Bucket Policies",
      description: [
        "Bucket Policy — bevosita S3 bucket'ning o'ziga biriktiriladigan resurs darajasidagi JSON siyosat. U butun bucket va uning barcha ob'ektlariga nisbatan kirishni boshqaradi.",
        "",
        "Bucket Policy yordamida faqat ma'lum bir VPC ichidan yoki faqat CloudFront OAC orqali kirishga ruxsat berish, shuningdek shifrlanmagan (HTTPS bo'lmagan) so'rovlarni majburiy rad etish (`aws:SecureTransport`) mumkin."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "Faqat HTTPS orqali so'rovlarni qabul qiluvchi va HTTP so'rovlarni rad etuvchi Bucket Policy JSON yozing va o'rnating.",
      acceptanceCriteria: [
        "Bucket Policy va IAM Policy o'rtasidagi farqni tushuntiradi",
        "`aws:SecureTransport: false` orqali xavfsiz HTTPS ulanishini majburlay oladi"
      ],
      prerequisites: ["71.4"]
    },
    {
      id: "71.6",
      title: "Block Public Access",
      description: [
        "S3 Block Public Access — tasodifiy ma'lumotlar sizib chiqishining oldini olish uchun bucket yoki akkaunt darajasida barcha ommaviy ruxsatlarni qat'iy bloklash funksiyasi.",
        "",
        "Senior darajadagi xavfsizlik qoidasi: deyarli barcha production bucketlarda Block Public Access 4 ta varianti ham to'liq yoqilgan bo'lishi kerak. Ommaviy fayllarni ham to'g'ridan-to'g'ri S3 dan emas, CloudFront CDN orqali xavfsiz tarqatish tavsiya etiladi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "AWS konsoli yoki CLI orqali bucketda 4 ta Block Public Access sozlamasini yoqing va to'g'ridan-to'g'ri ommaviy kirish bloklanganini tekshiring.",
      acceptanceCriteria: [
        "Ommaviy ruxsatlarni to'liq bloklash orqali data leak xavfini bartaraf etadi",
        "Public fayllarni S3 o'rniga CloudFront bilan xavfsiz yetkazishni tushuntiradi"
      ],
      prerequisites: ["71.5"]
    },
    {
      id: "71.7",
      title: "Presigned URLs",
      description: [
        "Presigned URL — xususiy (private) S3 ob'ektiga vaqtinchalik va xavfsiz kirish (yuklab olish yoki yuklash) imkonini beruvchi kriptografik imzolangan havola.",
        "",
        "Foydalanuvchi ilovangiz orqali fayl yuklamoqchi bo'lsa, faylni Laravel serveriga yuborib server xotirasini band qilmasdan, backenddan Presigned PUT URL olinadi va brauzer/mobil ilova faylni to'g'ridan-to'g'ri S3 ga yuklaydi."
      ],
      priority: "core",
      level: "Strong Middle",
      practicalTask: "Laravel da AWS SDK orqali foydalanuvchi faqat 10 daqiqa ichida o'z hisobotini yuklab olishi mumkin bo'lgan Presigned GET URL yaratuvchi endpoint yozing.",
      acceptanceCriteria: [
        "Vaqtinchalik cheklangan Presigned URL yaratadi",
        "Muddati o'tgandan so'ng kirish cheklanishini tekshiradi"
      ],
      prerequisites: ["70.7", "71.16"]
    },
    {
      id: "71.8",
      title: "Multipart Upload",
      description: [
        "Multipart Upload — katta hajmdagi fayllarni (100 MB dan yuqori) bir nechta mustaqil qismlarga (parts) bo'lib parallel yuklash mexanizmi.",
        "",
        "Tarmoq uzilib qolsa, butun faylni qaytadan yuklash shart bo'lmaydi, faqat muvaffaqiyatsiz bo'lgan qism qayta yuklanadi. Tugallanmagan yuklamalar (incomplete multipart uploads) pul yemasligi uchun S3 Lifecycle da tozalash qoidasini o'rnatish shart."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "1 GB li videoni brauzerdan qismlarga bo'lib S3 ga to'g'ridan-to'g'ri yuklash arxitekturasini loyihalang.",
      acceptanceCriteria: [
        "Initiate, UploadPart va CompleteMultipartUpload bosqichlarini biladi",
        "AbortIncompleteMultipartUpload qoidasi orqali kutilmagan xarajatlarni bartaraf etadi"
      ],
      prerequisites: ["71.7"]
    },
    {
      id: "71.9",
      title: "Versioning",
      description: [
        "S3 Versioning — bucketdagi ob'ektlarning har bir o'zgarishi va o'chirilishini alohida versiya sifatida saqlab borish imkoniyati.",
        "",
        "Fayl ustiga yangisi yozilsa yoki o'chirilsa ham, uning eski versiyalari saqlanib qoladi (o'chirishda faqat Delete Marker qo'yiladi). Bu tasodifiy o'chirish yoki zararli dasturlardan (ransomware) himoya qiladi. MFA Delete bilan birga eng yuqori xavfsizlikni ta'minlaydi."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Bucketda Versioning yoqing, bitta faylni ketma-ket 3 marta turli kontent bilan yuklang va uning oldingi versiyasini qayta tiklang.",
      acceptanceCriteria: [
        "Versioning ishlash tamoyili va Delete Marker tushunchasini biladi",
        "Ko'p versiyalar saqlanishi oylik saqlash to'lovini oshirishini hisobga oladi"
      ],
      prerequisites: ["71.1"]
    },
    {
      id: "71.10",
      title: "Lifecycle Rules",
      description: [
        "S3 Lifecycle Management — ob'ektlarni avtomatik ravishda arzonroq saqlash sinflariga o'tkazish yoki belgilangan muddatdan keyin butunlay o'chirish qoidalari to'plami.",
        "",
        "Masalan: 30 kundan keyin loglarni S3 Standard'dan S3 Standard-IA (Infrequent Access) ga, 90 kundan keyin S3 Glacier ga o'tkazish va 365 kundan keyin avtomatik o'chirish. Bu saqlash xarajatlarini 70-80% gacha kamaytiradi."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Bucket uchun Lifecycle qoidasini tuzing: vaqtinchalik eksportlar 7 kundan keyin o'chsin, hisob-fakturalar esa 60 kundan keyin Glacier'ga o'tsin.",
      acceptanceCriteria: [
        "Transition va Expiration qoidalarini to'g'ri loyihalaydi",
        "Saqlash xarajatlarini qisqartirish uchun Lifecycle qoidalarini avtomatlashtiradi"
      ],
      prerequisites: ["71.12"]
    },
    {
      id: "71.11",
      title: "Encryption",
      description: [
        "S3 da ma'lumotlarni shifrlash: Server-Side Encryption (SSE-S3, SSE-KMS, SSE-C) va Client-Side Encryption.",
        "",
        "Hozirda barcha yangi ob'ektlar standart tarzda SSE-S3 (AES-256) bilan shifrlanadi. Bank va nozik ma'lumotlar uchun esa AWS KMS (Key Management Service) kalitlari bilan shifrlash qo'llaniladi, bu audit va kalitni bekor qilish imkoniyatini beradi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Bucketda standart shifrlash sifatida AWS KMS kalitini biriktiring va yuklangan ob'ekt shifrlanganligini tekshiring.",
      acceptanceCriteria: [
        "SSE-S3 va SSE-KMS orasidagi farqni tushuntiradi",
        "Tranzitdagi (in-transit) va saqlashdagi (at-rest) shifrlash talablarini ta'minlaydi"
      ],
      prerequisites: ["71.5"]
    },
    {
      id: "71.12",
      title: "Storage Classes",
      description: [
        "S3 saqlash sinflari: S3 Standard (tezkor va tez-tez o'qiladigan fayllar), S3 Intelligent-Tiering (avtomatik tejamkorlik), S3 Standard-IA (kam o'qiladigan, lekin tezkor kerak bo'ladigan), S3 Glacier Instant Retrieval va Deep Archive (uzoq muddatli arxivlar).",
        "",
        "Har bir sinf GB saqlash narxi va ma'lumotni qayta chaqirib olish (retrieval fee) to'lovi bo'yicha farq qiladi. Doimiy o'qilmaydigan backup'lar uchun Standard ishlatish pulni havoga sovurish demakdir."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "Fayllarning kirish chastotasiga qarab saqlash sinflarini taqsimlang va xarajatlar tahlilini qiling.",
      acceptanceCriteria: [
        "Barcha S3 saqlash sinflarining xususiyatlari va narx farqlarini biladi",
        "Intelligent-Tiering qachon eng to'g'ri tanlov ekanligini asoslaydi"
      ],
      prerequisites: ["70.24"]
    },
    {
      id: "71.13",
      title: "CORS",
      description: [
        "Cross-Origin Resource Sharing (CORS) — boshqa domenda joylashgan veb-ilovalar (SPA, Vue/React) S3 dagi resurslarga kirishi uchun brauzer darajasidagi ruxsat mexanizmi.",
        "",
        "Agar siz faylni brauzerdan to'g'ridan-to'g'ri Presigned URL orqali S3 ga yuklamoqchi bo'lsangiz yoki shaxsiy shriftlarni S3 dan yuklamoqchi bo'lsangiz, S3 bucket'da AllowedOrigins, AllowedMethods (PUT, POST) va AllowedHeaders to'g'ri sozlanishi shart."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Frontend domeningizdan S3 ga PUT so'rovlarini yuborishga ruxsat beruvchi CORS XML/JSON konfiguratsiyasini sozlang.",
      acceptanceCriteria: [
        "CORS xatolari sababini tushunadi va to'g'ri ruxsatlarni beradi",
        "Xavfsizlik maqsadida `AllowedOrigins: *` o'rniga aniq frontend domenini ko'rsatadi"
      ],
      prerequisites: ["50.10"]
    },
    {
      id: "71.14",
      title: "Access Control",
      description: [
        "S3 Access Control — IAM Policies, Bucket Policies va Access Points orqali ob'ektlarga ruxsatlarni boshqarish.",
        "",
        "Eski ACL (Access Control Lists) usulidan zamonaviy loyihalarda voz kechilib, Bucket Owner Enforced holatiga o'tkazish tavsiya qilinadi. Katta korporativ ilovalarda esa turli bo'limlar uchun alohida S3 Access Points yaratish qo'llaniladi."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Bucketda ACL larni butunlay o'chirib (Bucket Owner Enforced), ruxsatlarni faqat IAM va Bucket Policy orqali markazlashtiring.",
      acceptanceCriteria: [
        "Nega ACL lardan voz kechish kerakligini tushuntiradi",
        "Access Points yordamida katta ma'lumotlar omboriga kirishni qismlarga ajratishni biladi"
      ],
      prerequisites: ["71.4", "71.5"]
    },
    {
      id: "71.15",
      title: "Laravel Filesystem Integration",
      description: [
        "Laravel ning `Illuminate\\Support\\Facades\\Storage` fasadi Flysystem kutubxonasi orqali mahalliy disk va S3 o'rtasida bir xil API bilan ishlash imkonini beradi.",
        "",
        "```php",
        "Storage::disk('s3')->put('reports/2026.pdf', $content, 'private');",
        "if (Storage::disk('s3')->exists('reports/2026.pdf')) {",
        "    return Storage::disk('s3')->download('reports/2026.pdf');",
        "}",
        "```",
        "",
        "`league/flysystem-aws-s3-v3` paketi o'rnatiladi va konfiguratsiya `config/filesystems.php` da belgilanadi."
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Laravel ilovasida S3 diskini sozlang va controller ichida yuklangan rasmni S3 ga saqlash kodini yozing.",
      acceptanceCriteria: [
        "Laravel Storage fasadi yordamida S3 bilan CRUD amallarini bajaradi",
        "`visibility` (public vs private) parametrini to'g'ri boshqaradi"
      ],
      prerequisites: ["2.22", "70.7"]
    },
    {
      id: "71.16",
      title: "Temporary URLs",
      description: [
        "Laravel Storage fasadining `temporaryUrl()` metodi yordamida yopiq S3 fayllari uchun osonlikcha vaqtinchalik xavfsiz URL yaratish mumkin.",
        "",
        "```php",
        "$url = Storage::disk('s3')->temporaryUrl(",
        "    'contracts/user-42.pdf',",
        "    now()->addMinutes(30)",
        ");",
        "```",
        "",
        "Bu metod ichki tomondan AWS S3 Presigned URL yaratadi va belgilangan vaqtdan keyin havola o'z kuchini yo'qotadi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Laravel da xususiy shartnoma fayli uchun 20 daqiqalik vaqtinchalik havola qaytaruvchi API endpoint yozing.",
      acceptanceCriteria: [
        "`Storage::disk('s3')->temporaryUrl()` metodidan to'g'ri foydalanadi",
        "Havola muddatini biznes talablariga mos belgilaydi"
      ],
      prerequisites: ["71.7", "71.15"]
    },
    {
      id: "71.17",
      title: "CDN Integration",
      description: [
        "S3 va CloudFront integratsiyasi — S3 dagi statik va media fayllarni CloudFront orqali foydalanuvchiga yaqin joylashgan serverlardan tezkor keshlab yetkazib berish.",
        "",
        "Laravel konfiguratsiyasida S3 diski uchun `'url' => env('AWS_URL')` parametriga CloudFront domenini (`https://d123.cloudfront.net`) ko'rsatish kifoya. Natijada `Storage::disk('s3')->url('images/logo.png')` to'g'ridan-to'g'ri CDN manzilini beradi."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "Laravel da S3 diskining ommaviy URL manzilini CloudFront CDN domeni bilan ishlaydigan qilib sozlang.",
      acceptanceCriteria: [
        "Fayllar to'g'ridan-to'g'ri S3 dan emas, CloudFront orqali yuklanishini ta'minlaydi",
        "Fayl yangilanganda CDN keshini tozalash (invalidation) strategiyasini biladi"
      ],
      prerequisites: ["70.12", "71.15"]
    },
    {
      id: "71.18",
      title: "Object Metadata",
      description: [
        "Ob'ekt metadata'si — har bir fayl bilan birga saqlanadigan kalit-qiymat ma'lumotlari. Tizimli metadata (System Metadata: `Content-Type`, `Content-Disposition`, `Cache-Control`) va foydalanuvchi metadata'si (`x-amz-meta-*`).",
        "",
        "`Content-Type` to'g'ri berilmasa (masalan `image/webp` o'rniga `binary/octet-stream`), brauzer rasmni ko'rsatmasdan majburiy yuklab olishga beradi. `Cache-Control` esa CDN va brauzerda keshlash muddatini belgilaydi."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Laravel da S3 ga fayl yozayotganda maxsus `ContentType` va `Cache-Control: max-age=31536000` headerlarini biriktiring.",
      acceptanceCriteria: [
        "MIME turini to'g'ri aniqlab S3 ga yozadi",
        "Foydalanuvchi metadata parametrlaridan maqsadli foydalanadi"
      ],
      prerequisites: ["71.15"]
    },
    {
      id: "71.19",
      title: "Backup and Retention",
      description: [
        "Laravel ma'lumotlar bazasi va muhim tizim zaxiralarini S3 da saqlash va saqlash muddatini (retention) boshqarish.",
        "",
        "`spatie/laravel-backup` paketi orqali avtomatlashtiriladi. Saqlash xarajatlarini va xavfsizlikni boshqarish uchun Lifecycle Rules orqali eski zaxiralar avtomatik o'chiriladi yoki Glacier arxiviga jo'natiladi. Shuningdek S3 Object Lock orqali zaxiralarni hech kim o'chira olmaydigan (WORM) qilish mumkin."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "`spatie/laravel-backup` paketini sozlab, kunlik DB zaxirasini S3 ga yuklash va 14 kundan eski zaxiralarni avtomatik tozalashni tashkil qiling.",
      acceptanceCriteria: [
        "Zaxiralash jarayonini xavfsiz va xatosiz S3 ga ulaydi",
        "Object Lock va Retention muddatlarini to'g'ri belgilaydi"
      ],
      prerequisites: ["51.18", "71.10"]
    },
    {
      id: "71.20",
      title: "Secure File Uploads",
      description: [
        "S3 ga fayllarni xavfsiz yuklash: zararli fayllar (masalan PHP veb-shell) ijro etilishining oldini olish.",
        "",
        "Muhim qoidalar: fayl kengaytmasini emas, uning haqiqiy MIME turini (magic bytes) tekshirish, fayl nomini qayta nomlash (UUID ishlatish), yuklangan fayllarni hech qachon web-root papkasiga qo'ymaslik, hamda o'ta xavfsiz tizimlarda yuklangan fayllarni AWS Lambda yordamida antivirus (ClamAV) bilan avtomatik skanerlash."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Laravel da fayl yuklash validatsiyasini (MIME, hajm, xavfsiz nomlash) yozing va to'g'ridan-to'g'ri S3 ga uzatish xavfsizligini ta'minlang.",
      acceptanceCriteria: [
        "Fayl kengaytmasini almashtirish orqali bo'ladigan hujumlarni bartaraf etadi",
        "S3 bucketda fayllarni ijro etilmaydigan (executable bo'lmagan) holda xavfsiz saqlaydi"
      ],
      prerequisites: ["51.12", "71.7"]
    }
  ]
});
