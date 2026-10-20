/* 74 · Automated Testing
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 74,
  slug: "automated-testing",
  title: "Automated Testing",
  group: "testing",
  description: "Avtomatlashtirilgan testlash — barqaror, regressiyasiz va xavfsiz rivojlanishning asosiy kafolatidir. Senior Laravel dasturchi test piramidasi tamoyillarini chuqur tushunadi, Pest va PHPUnit yordamida tezkor Unit, barqaror Feature va integratsion testlarni yozadi. Shuningdek, soxtalashtirish (Mocking/Fakes) strategiyalarini to'g'ri tanlaydi, beqaror (flaky) testlarni bartaraf etadi va CI/CD quvurlarida sifat darvozalarini (Quality Gates) boshqaradi.",
  subskills: [
    {
      id: "74.1",
      title: "Test Pyramid",
      description: [
        "Test Piramidasi (Test Pyramid) — testlar turlari o'rtasidagi optimal miqdor va tezlik mutanosibligini ko'rsatuvchi model.",
        "",
        "Asosida: ko'p sonli, o'ta tezkor va arzon Unit testlar; o'rtasida: ma'lumotlar bazasi va servislarni tekshiruvchi Integration/Feature testlar; cho'qqisida: oz sonli, sekin va qimmat End-to-End (E2E) testlar. Ushbu balans buzilsa (masalan hamma narsani faqat brauzer orqali E2E testlash — Ice Cream Cone anti-pattern), CI juda sekinlashadi va testlar beqaror bo'lib qoladi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Mavjud ilovaning test paketini tahlil qiling va Test Piramidasi balansini tiklash bo'yicha tavsiyalar rejasini tuzing.",
      acceptanceCriteria: [
        "Unit, Feature va E2E testlar nisbatini to'g'ri taqsimlaydi",
        "Ice-cream cone anti-pattern xatarlarini tushuntiradi"
      ],
      prerequisites: ["27.15", "28.1"]
    },
    {
      id: "74.2",
      title: "Unit Tests",
      description: [
        "Birlik testlari (Unit Tests) — alohida funksiya, metod yoki klassni tashqi olamdan (baza, tarmoq, fayl tizimi) to'liq izolyatsiya qilgan holda tekshirish.",
        "",
        "Unit testlar millisekundlarda bajarilishi shart. Ular sof biznes mantiqini, hisob-kitob algoritmlarini va Value Objectlarni tekshirish uchun idealdir. Tashqi barcha bog'liqliklar Mock yoki Stub yordamida almashtiriladi."
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Chegirma hisoblovchi Value Object yoki Action klassi uchun bazaga ulanmasdan ishlovchi 5 ta tezkor Unit test yozing.",
      acceptanceCriteria: [
        "Unit testlarda tashqi I/O (DB, tarmoq) bog'liqliklarini ishlatmaydi",
        "Arrange-Act-Assert (AAA) tuzilmasiga qat'iy amal qiladi"
      ],
      prerequisites: ["27.1"]
    },
    {
      id: "74.3",
      title: "Integration Tests",
      description: [
        "Integratsion testlar (Integration Tests) — ilovaning bir nechta alohida qismlari bir-biri bilan yoki tashqi xizmatlar (DB, Redis, Elasticsearch) bilan to'g'ri birgalikda ishlayotganini tekshirish.",
        "",
        "Bu testlar haqiqiy test ma'lumotlar bazasi yoki Docker konteynerlaridagi (Testcontainers) xizmatlarga ulanadi. Birlik testlarida e'tibordan chetda qoladigan SQL so'rovlar xatosi, ulanish muammolari va tranzaksiyalar integratsion testda aniqlanadi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Redis keshiga yozish va undan o'qish jarayonini haqiqiy Redis instansiyasi bilan integratsion test orqali tekshiring.",
      acceptanceCriteria: [
        "Mock o'rniga haqiqiy xizmat integratsiyasini to'g'ri sozlaydi",
        "Testdan so'ng xizmat holatini tozalashni (cleanup) ta'minlaydi"
      ],
      prerequisites: ["28.1"]
    },
    {
      id: "74.4",
      title: "Feature Tests",
      description: [
        "Funksional testlar (Feature Tests) — Laravel dunyosidagi eng asosiy va qulay test turi bo'lib, butun HTTP so'rovdan tortib to javob va DB o'zgarishigacha bo'lgan biznes stsenariysini tekshiradi.",
        "",
        "`$this->postJson('/api/orders', $data)` orqali autentifikatsiya, middleware, validatsiya, controller, event va bazadagi yozuvlar yagona zanjirda tekshiriladi (`assertDatabaseHas`). Bu minimal xarajat bilan eng yuqori ishonchni beradi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Foydalanuvchi ro'yxatdan o'tishi, bazaga yozilishi va xush kelibsiz xati navbatga tushishini tekshiruvchi to'liq Feature Test yozing.",
      acceptanceCriteria: [
        "Laravel HTTP Test helperlaridan samarali foydalanadi",
        "Database va Event holatlarini to'g'ri assertion qiladi"
      ],
      prerequisites: ["29.1"]
    },
    {
      id: "74.5",
      title: "API Tests",
      description: [
        "REST API testlari — API endpointlarining HTTP status kodlari, JSON javob strukturasi va ma'lumotlar tiplari to'g'riligini tekshirish.",
        "",
        "`assertJsonStructure`, `assertJsonPath` va `assertJsonFragment` metodlari orqali API kontraktining barqarorligi sinovdan o'tkaziladi. Shuningdek, 401 Unauthorized, 403 Forbidden va 422 Unprocessable Entity kabi salbiy holatlar tekshiriladi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Paginatsiya qilingan mahsulotlar API si uchun JSON strukturasi va headerlarini tekshiruvchi test yozing.",
      acceptanceCriteria: [
        "JSON javob sxemasi va statuslarini aniq tasdiqlaydi",
        "Ruxsatsiz yoki noto'g'ri ma'lumot yuborilgandagi xatolik formatini tekshiradi"
      ],
      prerequisites: ["18.20", "29.7"]
    },
    {
      id: "74.6",
      title: "End-to-End Tests",
      description: [
        "E2E testlar — real brauzer muhitida haqiqiy foydalanuvchi harakatlarini (tugmalarni bosish, formani to'ldirish, JavaScript dinamikasi) simulyatsiya qilish.",
        "",
        "Laravel da Laravel Dusk, Playwright yoki Cypress vositalari orqali amalga oshiriladi. Eng kritik biznes oqimlari (masalan, savatga tovar qo'shib, to'lov sahifasigacha borish) uchun juda kam miqdorda yoziladi."
      ],
      priority: "optional",
      level: "Strong Middle",
      practicalTask: "Laravel Dusk orqali foydalanuvchi tizimga kirib, profil rasmini yuklashini brauzerda avtomatlashtirilgan test bilan tekshiring.",
      acceptanceCriteria: [
        "Brauzer drayverlarini va headless rejimni boshqaradi",
        "Faqat eng muhim kritik oqimlar uchun E2E testlar belgilaydi"
      ],
      prerequisites: ["74.1"]
    },
    {
      id: "74.7",
      title: "Regression Tests",
      description: [
        "Regressiya testlari — ishlab chiqarishda (production) yuz bergan nosozliklar (bug) qayta takrorlanmasligini kafolatlash uchun yoziladigan testlar.",
        "",
        "Oltin qoida: Har qanday xatolik tuzatilishidan oldin, avval o'sha xatoni aynan takrorlovchi va yiqiluvchi (qizil) test yoziladi. Kod tuzatilgach test yashil bo'ladi va butun loyiha umri davomida qayta buzilishdan himoya qiladi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Mijoz xabar qilgan hisob-kitobdagi xatolik uchun avval yiqiluvchi test yozing, so'ngra kodni tuzatib testni yashil qiling.",
      acceptanceCriteria: [
        "Xatolikni aniq aks ettiruvchi minimal test holatini yaratadi",
        "Xato qayta paydo bo'lmasligini test to'plamiga qo'shish orqali kafolatlaydi"
      ],
      prerequisites: ["73.14"]
    },
    {
      id: "74.8",
      title: "Smoke Tests",
      description: [
        "Smoke testlar (tutun testlari) — yangi deploydan so'ng ilovaning eng asosiy hayotiy tizimlari ishlayotganini bir necha soniyada tekshirib oluvchi yengil testlar to'plami.",
        "",
        "Asosiy sahifa ochilishi (200 OK), login sahifasi mavjudligi, `/health` endpointi va ma'lumotlar bazasiga ulanish tekshiriladi. Agar smoke test yiqilsa — yangi reliz darhol orqaga qaytariladi (rollback)."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Deploydan so'ng 5 soniya ichida asosiy 5 ta endpointni tekshiruvchi tezkor smoke test to'plamini yarating.",
      acceptanceCriteria: [
        "Deploydan keyingi asosiy xatoliklarni darhol aniqlaydi",
        "CI/CD quvurida avtomatik rollback uchun signal beradi"
      ],
      prerequisites: ["43.3"]
    },
    {
      id: "74.9",
      title: "Contract Tests",
      description: [
        "Kontrakt testlari — mikroservislar yoki tashqi API lar o'rtasidagi kelishilgan ma'lumotlar almashinuvi formati (kontrakt) buzilmaganligini mustaqil tekshirish.",
        "",
        "Consumer-Driven Contract testing (masalan Pact) orqali barcha bog'liq servislarni bir vaqtda ko'tarmasdan ham, servis A kutayotgan javobni servis B o'zgartirib yubormaganligini kafolatlash mumkin."
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Tashqi servis API si bilan ma'lumotlar almashish shartnomasini (Contract) testlang va kutilmagan maydon o'zgarishini aniqlang.",
      acceptanceCriteria: [
        "API kontraktlarining o'zaro muvofiqligini tekshiradi",
        "Mikroservislar integratsiyasida breaking change larning oldini oladi"
      ],
      prerequisites: ["19.19", "65.4"]
    },
    {
      id: "74.10",
      title: "Database Test Isolation",
      description: [
        "Baza testlarining o'zaro izolyatsiyasi — har bir test boshqa testlarning qoldirgan ma'lumotlaridan mutlaqo toza va mustaqil muhitda ishlashi.",
        "",
        "Laravel da `use RefreshDatabase;` traiti orqali har bir test tranzaksiya ichida yurgiziladi va test tugashi bilan `ROLLBACK` qilinadi. Bu testlarni o'nlab barobar tezlashtiradi va testlar tartibiga bog'liqlikni yo'qotadi."
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Testlar bazasini `RefreshDatabase` yordamida sozlang va testlar bir-birining ma'lumotlariga xalaqit bermasligini ta'minlang.",
      acceptanceCriteria: [
        "`RefreshDatabase` va tranzaksiyali rollback ishlashini tushunadi",
        "Testlar qanday tartibda ishga tushirilishidan qat'i nazar bir xil natija berishini (determinizm) ta'minlaydi"
      ],
      prerequisites: ["25.13", "29.6"]
    },
    {
      id: "74.11",
      title: "Test Data Management",
      description: [
        "Test ma'lumotlarini boshqarish — testlar uchun kerakli ma'lumotlarni yaratishda Model Factories va Seeder lardan to'g'ri foydalanish.",
        "",
        "Laravel Factory lari orqali aniq va o'qilishi oson holatlar (State) yaratiladi: `User::factory()->unverified()->admin()->create()`. Hardcoded ID lar yoki real bazadan nusxalangan iflos ma'lumotlardan foydalanish qat'iyan man etiladi."
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Murakkab bog'liqliklarga (Buyurtma, Tovarlar, To'lov) ega bo'lgan Model Factory va Factory State larni loyihalang.",
      acceptanceCriteria: [
        "Eloquent Model Factory va Factory State larni mahorat bilan qo'llaydi",
        "Test ma'lumotlarini minimal va faqat test uchun zarur hajmda yaratadi"
      ],
      prerequisites: ["13.18"]
    },
    {
      id: "74.12",
      title: "Mocking Strategy",
      description: [
        "Soxtalashtirish strategiyasi — qachon va nimani Mock qilish kerakligini aniq belgilash.",
        "",
        "Laravel o'rnatilgan ajoyib Fake larni taqdim etadi: `Queue::fake()`, `Event::fake()`, `Mail::fake()`, `Notification::fake()`, `Http::fake()`. Qoida: Faqat o'zingiz boshqarmaydigan tashqi chegaralarni (External APIs, SMS provayderlar) soxtalashtiring; o'z ichki biznes modelingizni haddan tashqari ko'p mock qilmang (over-mocking), aks holda test foydasiz bo'lib qoladi."
      ],
      priority: "core",
      level: "Strong Middle",
      practicalTask: "Tashqi to'lov tizimiga yuboriladigan HTTP so'rovni `Http::fake()` orqali soxtalashtirib, muvaffaqiyatli va muvaffaqiyatsiz stsenariylarni testlang.",
      acceptanceCriteria: [
        "Laravelning o'rnatilgan Fake laridan to'liq foydalanadi",
        "Over-mocking tuzog'iga tushmasdan real xatti-harakatni tekshiradi"
      ],
      prerequisites: ["27.6", "29.11"]
    },
    {
      id: "74.13",
      title: "Flaky Test Prevention",
      description: [
        "Beqaror testlarning oldini olish — kod o'zgarmasa ham goh o'tib, goh yiqiladigan (Flaky) testlarni aniqlash va bartaraf etish.",
        "",
        "Sabablari: vaqtga bog'liqlik (`now()` bilan solishtirish — `travelTo()` ishlatish lozim), tartiblanmagan DB so'rovlari (`orderBy` siz birinchi elementni olish), asinxron kutilmalar yoki parallel testlardagi umumiy resurslar to'qnashuvi. Flaky testlar jamoaning testlarga bo'lgan ishonchini butunlay yo'q qiladi."
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Vaqtga bog'liq bo'lganligi sababli vaqti-vaqti bilan yiqilib turadigan testni aniqlang va `$this->travelTo()` yordamida deterministik holatga keltiring.",
      acceptanceCriteria: [
        "Flaky testlarning asosiy sabablarini biladi va tuzatadi",
        "Vaqtni muzlatish (Time manipulation) helperlaridan foydalanadi"
      ],
      prerequisites: ["25.18", "27.10"]
    },
    {
      id: "74.14",
      title: "Parallel Testing",
      description: [
        "Testlarni parallel bajarish — test to'plamini protsessorning bir nechta yadrolariga taqsimlab, umumiy bajarilish vaqtini 3-5 barobargacha qisqartirish.",
        "",
        "Pest va PHPUnit da `php artisan test --parallel` buyrug'i orqali ishga tushiriladi. Har bir parallel jarayon uchun alohida test ma'lumotlar bazasi (`test_db_1`, `test_db_2`) avtomatik yaratiladi."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Laravel loyihasida parallel testlashni yoqing va bir necha yadroda testlarni muvaffaqiyatli ishga tushiring.",
      acceptanceCriteria: [
        "Parallel testlashda alohida test bazalari yaratilishini tushunadi",
        "CI quvurida test bajarilish vaqtini sezilarli darajada qisqartiradi"
      ],
      prerequisites: ["26.13"]
    },
    {
      id: "74.15",
      title: "Code Coverage",
      description: [
        "Kod qamrovi (Code Coverage) — yozilgan testlar dastur kodi qatorlarining necha foizini aylanib o'tganligini ko'rsatuvchi metrika.",
        "",
        "Xdebug yoki PCOV kengaytmalari yordamida hisoblanadi. Muhim eslatma: 100% coverage bu xatoliklar yo'qligini bildirmaydi, chunki kod shunchaki chaqirilgan bo'lishi mumkin, lekin to'g'ri assertion qilinmagan bo'lishi mumkin. Senior dasturchi quruq foiz ketidan quvmasdan, asosiy biznes mantiq qamrab olinganiga qaraydi."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "PCOV yoki Xdebug yordamida test qamrovi bo'yicha HTML hisobot generatsiya qiling va tekshirilmay qolgan muhim qismlarni aniqlang.",
      acceptanceCriteria: [
        "Qamrov hisobotini to'g'ri tahlil qila oladi",
        "Yuqori foiz sifat kafolati emasligini, mazmunli assertion zarurligini biladi"
      ],
      prerequisites: ["25.10", "27.14"]
    },
    {
      id: "74.16",
      title: "Mutation Testing",
      description: [
        "Mutatsion testlash (Mutation Testing) — testlarning o'zining sifatini tekshirish usuli.",
        "",
        "Infection PHP vositasi yordamida kodingizga atayin mayda xatolar (mutatsiyalar) kiritiladi (masalan `>` belgisi `>=` ga, `true` esa `false` ga almashtiriladi). Agar kodingiz buzilganda birorta testingiz yiqilsa — mutatsiya o'ldirildi (yaxshi). Agar barcha testlar yashil qolaversa — testingiz yomon va zaif hisoblanadi."
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Loyiha uchun Infection PHP o'rnating va muhim biznes moduli testlarining mutatsion ballini (Mutation Score Indicator - MSI) baholang.",
      acceptanceCriteria: [
        "Mutation testing ishlash konsepsiyasini to'liq tushunadi",
        "Yuzaki (false-positive) testlarni aniqlab, mustahkam assertionlar yozadi"
      ],
      prerequisites: ["74.15"]
    },
    {
      id: "74.17",
      title: "CI Integration",
      description: [
        "Testlarni CI (Continuous Integration) ga integratsiya qilish — har bir commit va Pull Request da testlarning to'liq avtomatik tarzda ishlab ketishi.",
        "",
        "GitHub Actions yoki GitLab CI da MySQL/PostgreSQL va Redis servis konteynerlari ko'tariladi, migratsiyalar yurgiziladi va testlar ishga tushiriladi. Birorta test yiqilsa, PR ni merge qilish taqiqlanadi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "GitHub Actions workflow faylida MySQL va Redis bilan parallel testlarni yurgizuvchi to'liq pipeline sozlang.",
      acceptanceCriteria: [
        "CI muhitida servislar va muhit o'zgaruvchilarini xatosiz sozlaydi",
        "Testlar natijasiga qarab branch himoyasini ta'minlaydi"
      ],
      prerequisites: ["43.5", "45.1"]
    },
    {
      id: "74.18",
      title: "Test Execution Time",
      description: [
        "Testlarning bajarilish vaqti — tezkor fikr-mulohaza (Fast Feedback Loop) olish uchun test to'plamini optimallashtirish.",
        "",
        "Agar testlar 20 daqiqa yursa, dasturchilar test yurgizishdan qochadi. Optimallashtirish yo'llari: Unit testlarda I/O qilmaslik, Bcrypt rounds sonini testda 4 ga tushirish (`'rounds' => 4`), in-memory SQLite yoki parallel testing ishlatish va sekin testlarni profil qilish."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "Sekin ishlayotgan test to'plamini profil qilib, Bcrypt xeshini pasaytirish va parallelizatsiya orqali umumiy vaqtni 50% ga kamaytiring.",
      acceptanceCriteria: [
        "Testlarning eng sekin qismlarini aniqlay oladi",
        "Bcrypt xarajatlarini pasaytirish kabi tezlashtirish usullarini qo'llaydi"
      ],
      prerequisites: ["27.13", "74.14"]
    },
    {
      id: "74.19",
      title: "Test Maintenance",
      description: [
        "Testlarni qo'llab-quvvatlash — kod o'zgarganda testlarni yangilab borish va test kodini ham asosiy kod kabi toza saqlash.",
        "",
        "Testlarda ham DRY, tushunarli nomlash va Helper metodlardan foydalaniladi. Agar har bir kichik biznes o'zgarishida 50 ta test sinib ketadigan bo'lsa (brittle tests), demak testlar implementatsiya detallariga haddan tashqari qattiq bog'langan."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "Implementatsiya detallariga bog'lanib qolgan zaif testlarni faqat tashqi xatti-harakatni tekshiradigan qilib qayta yozing.",
      acceptanceCriteria: [
        "Mo'rt (brittle) testlar paydo bo'lishining oldini oladi",
        "Test kodiga ham ishlab chiqarish kodi kabi yuqori talablar qo'yadi"
      ],
      prerequisites: ["73.1"]
    },
    {
      id: "74.20",
      title: "Quality Gates",
      description: [
        "Sifat darvozalari (Quality Gates) — kodning ishlab chiqarishga (Production) o'tishi uchun qanoatlantirishi shart bo'lgan qat'iy mezonlar to'plami.",
        "",
        "Mezonlar: 100% testlar yashil bo'lishi, minimal test qamrovi (masalan kamida 80%), PHPStan da xatoliklar nol bo'lishi va hech qanday yuqori darajadagi xavfsizlik zaifliklari bo'lmasligi. Quality Gate buzilsa reliz to'xtatiladi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "CI quvurida yangi qo'shilgan kod qamrovi 80% dan past bo'lsa yoki xatolik bo'lsa PR ni avtomatik rad etuvchi Quality Gate belgilang.",
      acceptanceCriteria: [
        "Avtomatlashtirilgan sifat mezonlarini CI tizimiga o'rnatadi",
        "Sifatsiz kodning asosiy tarmoqqa tushishini qat'iy bloklaydi"
      ],
      prerequisites: ["43.6", "72.19"]
    }
  ]
});
