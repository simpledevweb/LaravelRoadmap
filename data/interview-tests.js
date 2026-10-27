/* Laravel Skill Map — Intervyu Testlari (A, B, C, D variantli savollar)
 * Har bir mavzu va daraja bo'yicha interaktiv testlar, to'g'ri javob va Senior tushuntirishlari.
 */
window.INTERVIEW_TESTS = [
  {
    "id": "t-php-1",
    "category": "php",
    "categoryLabel": "PHP tili",
    "question": "PHP 8 da `var_dump(0 == 'admin');` kodi qanday natija qaytaradi va nega?",
    "options": [
      {
        "key": "A",
        "text": "false, chunki PHP 8 da son satrga o'giriladi ('0' == 'admin')"
      },
      {
        "key": "B",
        "text": "TypeError tashlaydi, chunki PHP 8 da son va satrni == bilan solishtirish taqiqlangan"
      },
      {
        "key": "C",
        "text": "true, chunki PHP 8 da ham 'admin' satri songa o'girilganda 0 ga teng bo'ladi"
      },
      {
        "key": "D",
        "text": "null qaytaradi, chunki raqamli bo'lmagan satr bilan solishtirishda natija aniqlanmagan"
      }
    ],
    "correct": "A",
    "explanation": "PHP 8 da Type Juggling mantiqi o'zgardi: son bilan raqamli bo'lmagan satr solishtirilganda endi son satrga o'giriladi ('0' == 'admin' -> false). PHP 7 da esa satr 0 ga aylanib true berar edi.",
    "level": "junior"
  },
  {
    "id": "t-php-2",
    "category": "php",
    "categoryLabel": "PHP tili",
    "question": "Katta hajmdagi ma'lumotlarni o'qiyotganda PHP da 'yield' (Generator) qanday xotira tejamkorligini beradi?",
    "options": [
      {
        "key": "A",
        "text": "Ma'lumotlarni sikl boshlanishida bir marta siqib xotirada saqlaydi va har safar to'liq ochadi"
      },
      {
        "key": "B",
        "text": "Barcha qatorlarni oldindan bitta massivga yig'ib, keyin ularni parallel oqimlarda qayta ishlaydi"
      },
      {
        "key": "C",
        "text": "Natijalarni diskdagi vaqtinchalik faylga yozib, qayta ishlashni to'liq operativ xotirasiz bajaradi"
      },
      {
        "key": "D",
        "text": "Butun to'plamni RAM ga yuklamaydi, har bir qatorni navbati bilan xotiraga olib qayta ishlaydi"
      }
    ],
    "correct": "D",
    "explanation": "Generatorlar massiv kabi butun ma'lumotlar to'plamini RAM ga yuklamaydi, balki faqat joriy bitta elementni ushlab, qolganlarini navbati bilan generatsiya qiladi. Bu 100MB+ fayllarni 5MB RAM bilan o'qish imkonini beradi.",
    "level": "middle"
  },
  {
    "id": "t-php-3",
    "category": "php",
    "categoryLabel": "PHP tili",
    "question": "Late Static Binding mexanizmida 'self::' va 'static::' kalit so'zlari o'rtasidagi farq nima?",
    "options": [
      {
        "key": "A",
        "text": "static:: runtime da chaqirilgan yakuniy voris sinfni ko'rsatadi, self:: esa metod jismonan qaysi sinfda yozilgan bo'lsa o'shani oladi"
      },
      {
        "key": "B",
        "text": "static:: faqat final sinflarda ishlaydi, self:: esa abstract va interfeys metodlarida qo'llaniladi"
      },
      {
        "key": "C",
        "text": "Ikkalasi bir xil ishlaydi, faqat static:: statik xususiyatlar bilan, self:: esa oddiy metodlar bilan ishlatiladi (merosda farq bermaydi)"
      },
      {
        "key": "D",
        "text": "self:: runtime da chaqirilgan voris sinfni ko'rsatadi, static:: esa metod yozilgan sinfga qat'iy bog'lanadi"
      }
    ],
    "correct": "A",
    "explanation": "self:: compile-time da metod qaysi sinf ichida e'lon qilingan bo'lsa o'sha sinfga qat'iy bog'lanadi. static:: esa runtime da metodni qaysi voris sinf chaqirayotgan bo'lsa, o'shani dinamik aniqlaydi (Late Static Binding).",
    "level": "middle"
  },
  {
    "id": "t-php-4",
    "category": "php",
    "categoryLabel": "PHP tili",
    "question": "PHP da 'WeakMap' strukturasi 'SplObjectStorage' dan qaysi muhim xususiyati bilan farq qiladi?",
    "options": [
      {
        "key": "A",
        "text": "WeakMap kalit ob'ektni clone qilib saqlaydi, shuning uchun asl ob'ekt o'zgarsa xaritadagi nusxa o'zgarmaydi"
      },
      {
        "key": "B",
        "text": "SplObjectStorage dagi ob'ektlarni GC o'chiradi, WeakMap esa ularni dastur oxirigacha ushlab turadi"
      },
      {
        "key": "C",
        "text": "WeakMap faqat string kalitlarni qabul qiladi, SplObjectStorage esa har qanday tipdagi kalitni saqlay oladi"
      },
      {
        "key": "D",
        "text": "WeakMap dagi ob'ektga boshqa joyda havola qolmasa, Garbage Collector uni o'chirganda xaritadan ham avtomatik o'chadi"
      }
    ],
    "correct": "D",
    "explanation": "WeakMap ob'ektlarga 'kuchsiz havola' (weak reference) bilan bog'lanadi. Agar ob'ekt tashqi kodda yo'q qilinsa, Garbage Collector uni tozalaydi va WeakMap dan ham avtomatik o'chadi. Bu Memory Leak'larning oldini oladi.",
    "level": "senior"
  },
  {
    "id": "t-php-5",
    "category": "php",
    "categoryLabel": "PHP tili",
    "question": "PHP da Copy-on-Write (COW) mexanizmi massiv nusxalanganda qachon yangi xotira (RAM) ajratadi?",
    "options": [
      {
        "key": "A",
        "text": "Massiv o'zgaruvchiga o'zlashtirilgan zahoti ($b = $a), nusxa yaratilishi bilan to'liq nusxa ajratiladi"
      },
      {
        "key": "B",
        "text": "Massiv elementlari o'qilganda (foreach yoki indeks orqali), chunki PHP har safar o'qish uchun nusxa tayyorlaydi"
      },
      {
        "key": "C",
        "text": "Massiv funksiyaga argument sifatida uzatilganda har doim yangi xotira ajratiladi, o'zgartirilgan bo'lmasa ham"
      },
      {
        "key": "D",
        "text": "Faqatgina nusxalangan massivlardan biriga yangi element qo'shilganda yoki qiymat o'zgartirilganda (yozish sodir bo'lganda)"
      }
    ],
    "correct": "D",
    "explanation": "COW (Copy-on-Write) printsipiga ko'ra, $b = $a qilinganda ikkala o'zgaruvchi bitta xotira manziliga ko'rsatib turadi. Faqat ulardan biriga yozish (modifikatsiya) amalga oshirilgandagina PHP xotirada alohida nusxa yaratadi.",
    "level": "middle"
  },
  {
    "id": "t-php-6",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "senior",
    "question": "PHP 8.3 da kiritilgan `json_validate()` funksiyasining `json_decode()` dan foydalanib tekshirishga nisbatan asosiy xotira (memory) afzalligi nima?",
    "options": [
      {
        "key": "A",
        "text": "`json_validate()` obyektlarni massivga emas, stdClass'ga aylantirib saqlaydi, bu esa assotsiativ massivga qaraganda kamroq xotira oladi, shu sabab katta JSON larda ham tez ishlaydi"
      },
      {
        "key": "B",
        "text": "`json_validate()` natijani keshlab qo'yadi, shu sabab keyingi `json_decode()` chaqiruvi xotira sarflamay, birdan ishlaydi"
      },
      {
        "key": "C",
        "text": "`json_validate()` JSON'ni faqat 1 MB bo'laklarga bo'lib o'qiydi, shu tufayli har qanday hajm bir xil tezlikda tekshiriladi"
      },
      {
        "key": "D",
        "text": "`json_validate()` satrni faqat sintaktik tahlil qiladi va xotirada hech qanday PHP massiv yoki obyekt daraxtini (zval) yaratmaydi, natijada katta JSON ma'lumotlarda O(1) minimal xotira sarflaydi"
      }
    ],
    "correct": "D",
    "explanation": "Ilgari JSON validligini tekshirish uchun json_decode($string) qilinardi, bu esa gigabaytlab xotira yeb qo'yishi mumkin edi. PHP 8.3 da kiritilgan json_validate() hech qanday xotira ajratmasdan faqat C darajasida JSON sintaksisini juda tez tekshiradi."
  },
  {
    "id": "t-php-7",
    "category": "php",
    "categoryLabel": "PHP tili",
    "question": "PHP 8 da kiritilgan Attributes (#[CustomAttribute]) qaysi eski usulning o'rnini rasman egalladi?",
    "options": [
      {
        "key": "A",
        "text": "Interfeys konstantalari orqali berilgan sinf metama'lumotlarining (masalan, const ROUTE = '/api')"
      },
      {
        "key": "B",
        "text": "Trait'lar yordamida sinfga qo'shiladigan yordamchi metodlar mexanizmining"
      },
      {
        "key": "C",
        "text": "`@deprecated` va `@todo` kabi kod tahlilchilari uchun mo'ljallangan izohlar tizimining"
      },
      {
        "key": "D",
        "text": "DocBlock izohlaridagi norasmiy annotatsiyalarning (masalan, /** @Route('/api') */)"
      }
    ],
    "correct": "D",
    "explanation": "PHP 8 Attributes matnli DocBlock izohlari o'rniga kelgan birinchi toifali (first-class) tildagi metama'lumotlar tizimidir. Ular Reflection API orqali tez, xatosiz va tiplashtirilgan holda o'qiladi.",
    "level": "senior"
  },
  {
    "id": "t-php-8",
    "category": "php",
    "categoryLabel": "PHP tili",
    "question": "PHP da 'empty('0')' funksiyasi qanday natija qaytaradi?",
    "options": [
      {
        "key": "A",
        "text": "false, chunki empty() faqat null qiymatni bo'sh deydi"
      },
      {
        "key": "B",
        "text": "TypeError, chunki empty() satrlar bilan ishlamaydi"
      },
      {
        "key": "C",
        "text": "false, chunki '0' bo'sh bo'lmagan satr hisoblanadi"
      },
      {
        "key": "D",
        "text": "true, chunki '0' satri falsy qiymat hisoblanadi"
      }
    ],
    "correct": "D",
    "explanation": "PHP da empty() funksiyasi '' (bo'sh satr), 0, null, false, [] bilan bir qatorda '0' (string nol) uchun ham true qaytaradi. Bu ko'pincha mahsulot soni 0 bo'lganda xatolarga sabab bo'ladi.",
    "level": "junior"
  },
  {
    "id": "t-php-9",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "junior",
    "question": "PHP 8 da kiritilgan Constructor Property Promotion sintaksisi haqida qaysi fikr to'g'ri?",
    "options": [
      {
        "key": "A",
        "text": "Sintaksis faqat `readonly` xususiyatlar bilan ishlaydi, oddiy public yoki private xususiyatlar uchun qo'llab-quvvatlanmaydi"
      },
      {
        "key": "B",
        "text": "Promotion faqat abstract klasslarda ishlaydi va xususiyatlarni avtomatik static deb e'lon qiladi"
      },
      {
        "key": "C",
        "text": "Constructor argumentlariga ko'rinish modifikatori (public/protected/private) berilsa, PHP xususiyatni avtomatik e'lon qiladi va qiymatini o'zlashtiradi"
      },
      {
        "key": "D",
        "text": "Constructor argumentiga `public` yozilsa, xususiyat e'lon qilinadi, lekin qiymatni konstruktor ichida `$this->x = $x` bilan qo'lda berish majburiy"
      }
    ],
    "correct": "C",
    "explanation": "PHP 8.0 Constructor Property Promotion orqali argument oldiga public, protected yoki private qo'yilganda, xususiyat klass sathida avtomatik ravishda e'lon qilinadi va kelgan argument qiymati unga beriladi. Bu ortiqcha boilerplate kodni (property e'lon qilish va $this->x = $x yozishni) yo'qotadi."
  },
  {
    "id": "t-php-10",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "junior",
    "question": "PHP da `declare(strict_types=1);` direktivasi qanday ishlaydi va qayerga ta'sir qiladi?",
    "options": [
      {
        "key": "A",
        "text": "Butun loyiha bo'ylab, ya'ni barcha include qilingan fayllardagi funksiya chaqiruvlariga qat'iy tip tekshiruvini qo'llaydi"
      },
      {
        "key": "B",
        "text": "Faqat funksiya e'lon qilingan (callee) fayldagi parametr tiplarini qat'iy tekshiradi, chaqiruvchi faylga ta'sir qilmaydi"
      },
      {
        "key": "C",
        "text": "Faqat ushbu direktiva yozilgan faylning ichidagi funksiya chaqiruvlariga (caller file) qat'iy tip tekshiruvini qo'llaydi"
      },
      {
        "key": "D",
        "text": "Faqat qaytariladigan qiymat tiplariga ta'sir qiladi, argument tiplari esa avvalgidek avtomatik o'giriladi"
      }
    ],
    "correct": "C",
    "explanation": "declare(strict_types=1); fayl darajasida (file-level) ishlaydi va faqat shu fayldan turib amalga oshirilgan funksiya yoki metod chaqiruvlariga ta'sir qiladi. Ya'ni tekshiruv funksiya e'lon qilingan faylda emas, aynan chaqiruvchi faylda yoqilgan bo'lishi kerak."
  },
  {
    "id": "t-php-11",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "middle",
    "question": "PHP 8.0 da kiritilgan `match` ifodasi `switch` operatoridan qaysi asosiy jihati bilan farq qiladi?",
    "options": [
      {
        "key": "A",
        "text": "match bir nechta shartni vergul bilan yozishga ruxsat bermaydi, switch esa bunga imkon beradi"
      },
      {
        "key": "B",
        "text": "match qat'iy tekshiruv (===) ishlatadi, qiymat qaytaradi va break talab qilmaydi"
      },
      {
        "key": "C",
        "text": "match faqat butun sonlar bilan ishlaydi, switch esa har qanday tipdagi qiymatlarni solishtira oladi"
      },
      {
        "key": "D",
        "text": "match loose (==) tekshiruv ishlatadi, qiymat qaytarmaydi va har bir tarmoq oxirida break talab qiladi"
      }
    ],
    "correct": "B",
    "explanation": "match ifodasi (expression) qiymat qaytaradi, 'fallthrough' xususiyatiga ega emas (ya'ni har bir tarmoqdan keyin avtomatik chiqadi, break shart emas) va eng muhimi qat'iy tenglik (strict equality ===) orqali tekshiradi. Mos keluvchi tarmoq topilmasa UnhandledMatchError xatosini beradi."
  },
  {
    "id": "t-php-12",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "middle",
    "question": "PHP 8.1 da kiritilgan `readonly` xususiyatlari (properties) bo'yicha qaysi qoida to'g'ri?",
    "options": [
      {
        "key": "A",
        "text": "Readonly property faqat statik xususiyatlar uchun ishlaydi va uning boshlang'ich qiymati e'lon paytida berilishi shart"
      },
      {
        "key": "B",
        "text": "Readonly property faqat bitta marta initsializatsiya qilinadi va unga doimo tip (type) ko'rsatilishi shart"
      },
      {
        "key": "C",
        "text": "Readonly property tipsiz e'lon qilinishi mumkin va qiymatini sinf ichidagi istalgan metodda qayta o'zgartirsa bo'ladi"
      },
      {
        "key": "D",
        "text": "Readonly property'ga sinfdan tashqarida, faqat public bo'lsa qiymat berish mumkin, ichkarida esa taqiqlangan"
      }
    ],
    "correct": "B",
    "explanation": "Readonly xususiyatlar tipi ko'rsatilgan (typed) bo'lishi shart va ular faqat bir marta o'z klassi doirasida initsializatsiya qilinadi. Boshlang'ich qiymat bilan e'lon qilish mumkin emas, chunki bu holda uning qiymatini konstruktorda ham o'zgartirib bo'lmay qolardi."
  },
  {
    "id": "t-php-13",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "middle",
    "question": "PHP 8.1 Enums (Backed Enums) haqida qaysi fikr to'g'ri?",
    "options": [
      {
        "key": "A",
        "text": "Backed enum interfeysni implement qila olmaydi va unda konstantalar e'lon qilib bo'lmaydi"
      },
      {
        "key": "B",
        "text": "Backed enumlar `float` va `bool` qiymatlarni ham qabul qiladi, lekin metodlarga ega bo'la olmaydi"
      },
      {
        "key": "C",
        "text": "Backed enumlar faqat `int` yoki `string` tipidagi qiymatlarga ega bo'lishi mumkin"
      },
      {
        "key": "D",
        "text": "Backed enum qiymatlari har bir case uchun bir xil bo'lishi mumkin va `new` operatori bilan yaratiladi"
      }
    ],
    "correct": "C",
    "explanation": "PHP da Backed Enum lar faqat int yoki string tipidagi qiymat (scalar value) qabul qila oladi. Undan tashqari enumlar metodlarga ega bo'lishi va interfeyslarni implement qilishi mumkin. from() metodi topilmasa ValueError tashlaydi, tryFrom() esa null qaytaradi."
  },
  {
    "id": "t-php-14",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "senior",
    "question": "PHP 8.1 Fibers (Tolalar) mexanizmining asosiy vazifasi va xususiyati nimada?",
    "options": [
      {
        "key": "A",
        "text": "Alohida PHP jarayonlarini (fork) yaratib, ular o'rtasida xotirani avtomatik ulashadigan multiprocessing tizimi"
      },
      {
        "key": "B",
        "text": "To'xtatilishi va qayta davom ettirilishi mumkin bo'lgan to'liq stakli (stackful) korutinalar bo'lib, no-blocking asinxron arxitekturani ta'minlaydi"
      },
      {
        "key": "C",
        "text": "Faqat generator funksiyalar ichida ishlaydi va yield orqali qiymat qaytaradigan stacksiz (stackless) korutinalarni ta'minlaydi (faqat CLI rejimida)"
      },
      {
        "key": "D",
        "text": "Operatsion tizim darajasidagi parallel oqimlar (threads) bo'lib, bir vaqtda bir nechta CPU yadrosida kodni bajaradi"
      }
    ],
    "correct": "B",
    "explanation": "PHP 8.1 Fibers — bu stackful coroutine mexanizmi. U dastur bajarilishini Fiber::suspend() orqali to'xtatib, keyinchalik ->resume() orqali to'xtagan joyidan davom ettirish imkonini beradi. Bu RevoltPHP, Amp yoki Swoole kabi event-loop kutubxonalari uchun sinxron ko'rinishdagi toza asinxron kod yozish asosi hisoblanadi."
  },
  {
    "id": "t-php-15",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "junior",
    "question": "PHP da Nullsafe operatori (`?->`) qanday vazifani bajaradi?",
    "options": [
      {
        "key": "A",
        "text": "Agar zanjirdagi obyekt null bo'lsa, xatolik (Error) tashlamasdan butun zanjir natijasi sifatida null qaytaradi"
      },
      {
        "key": "B",
        "text": "Agar zanjirdagi obyekt null bo'lsa, undagi metodni chaqirmasdan bo'sh satr ('') qaytaradi va xatolik ham chiqarmaydi"
      },
      {
        "key": "C",
        "text": "Obyektning xususiyatiga faqat o'qish uchun kirishga ruxsat beradi, yozishga urinilsa Error tashlaydi"
      },
      {
        "key": "D",
        "text": "Qiymat null bo'lsa, uni berilgan standart qiymat bilan almashtiradi (`??` kabi), obyekt bo'lsa metodni chaqiradi"
      }
    ],
    "correct": "A",
    "explanation": "Nullsafe operatori $user?->getAddress()?->getCity() zanjirida agar biror bo'g'in null bo'lsa, keyingi metodlar chaqirilmaydi (short-circuiting) va butun ifoda xavfsiz tarzda null qaytaradi."
  },
  {
    "id": "t-php-16",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "senior",
    "question": "PHP da `Closure::bind` yoki `Closure::bindTo` metodlari qanday maqsadlarda ishlatiladi?",
    "options": [
      {
        "key": "A",
        "text": "Anonim funksiyaning natijasini keshlab, keyingi chaqiruvlarda qayta hisoblamasdan qaytarishni ta'minlaydi"
      },
      {
        "key": "B",
        "text": "Anonim funksiyani boshqa PHP jarayoniga (process) bog'lab, uni parallel ravishda ishga tushirish imkonini beradi (alohida jarayonda)"
      },
      {
        "key": "C",
        "text": "Funksiya argumentlarini oldindan belgilab, qisman qo'llangan (partial application) yangi callable qaytaradi"
      },
      {
        "key": "D",
        "text": "Anonim funksiyani ma'lum bir obyekt doirasiga ($this) va klass scope'iga bog'lab, hatto private a'zolariga kirish imkonini beradi"
      }
    ],
    "correct": "D",
    "explanation": "Closure::bind() yoki $closure->bindTo($newthis, $newscope) anonim funksiyaning ijro doirasi ($this) va ko'rinish chegarasini (scope) o'zgartiradi. Agar scope sifatida klass nomi yoki uning obyekti berilsa, ushbu closure obyektning private va protected xususiyatlarini to'g'ridan-to'g'ri o'qiy oladi yoki o'zgartira oladi."
  },
  {
    "id": "t-php-17",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "middle",
    "question": "PHP da `trait` larda metodlar nomlari to'qnashganda (conflict), qaysi kalit so'z orqali ziddiyat hal qilinadi?",
    "options": [
      {
        "key": "A",
        "text": "`use` va `extends`"
      },
      {
        "key": "B",
        "text": "`parent` va `self`"
      },
      {
        "key": "C",
        "text": "`insteadof` va `as`"
      },
      {
        "key": "D",
        "text": "`final` va `static`"
      }
    ],
    "correct": "C",
    "explanation": "Agar ikkita Trait da bir xil nomli metod bo'lsa, PHP fatal error beradi. Buni bartaraf qilish uchun use TraitA, TraitB { TraitA::method insteadof TraitB; TraitB::method as aliasMethod; } sintaksisi qo'llaniladi."
  },
  {
    "id": "t-php-18",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "senior",
    "question": "Liskov Substitution Principle (LSP) ga ko'ra, bola klass ota klass metodini override qilganda parametrlari va qaytarish tipi qanday bo'lishi kerak?",
    "options": [
      {
        "key": "A",
        "text": "Parametrlar contravariant (kengroq yoki teng), qaytarish tipi covariant (torroq yoki teng) bo'lishi kerak"
      },
      {
        "key": "B",
        "text": "Parametrlar covariant (torroq yoki teng), qaytarish tipi contravariant (kengroq yoki teng) bo'lishi kerak"
      },
      {
        "key": "C",
        "text": "Parametrlar ham, qaytarish tipi ham ota klassdagi bilan aynan bir xil bo'lishi shart, o'zgartirib bo'lmaydi"
      },
      {
        "key": "D",
        "text": "Parametrlar ham, qaytarish tipi ham covariant (torroq) bo'lishi kerak, chunki bola klass ixtisoslashgan"
      }
    ],
    "correct": "A",
    "explanation": "LSP va PHP 7.4+ tip tizimiga binoan: Parametr tiplari kontravariant bo'lishi mumkin (ota klass talab qilganidan ko'ra kengroq qabul qila oladi), qaytarish tipi esa kovariant bo'lishi kerak (ota klass va'da qilganidan ko'ra aniqroq/torroq tip qaytarishi mumkin). Bu ota klass o'rniga bola klass qo'yilganda kod buzilmasligini kafolatlaydi."
  },
  {
    "id": "t-php-19",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "middle",
    "question": "PHP da `__invoke()` sehrli metodi (magic method) nima vazifa bajaradi?",
    "options": [
      {
        "key": "A",
        "text": "Mavjud bo'lmagan metod chaqirilganda xatoning o'rniga ishga tushadi"
      },
      {
        "key": "B",
        "text": "Obyekt yaratilgandan so'ng, konstruktordan keyin darhol ishga tushadi"
      },
      {
        "key": "C",
        "text": "Obyekt funksiya kabi chaqirilganda ($obj()) avtomatik ishga tushadi"
      },
      {
        "key": "D",
        "text": "Obyekt string sifatida chiqarilganda (echo $obj) avtomatik chaqiriladi"
      }
    ],
    "correct": "C",
    "explanation": "Agar klass ichida __invoke() metodi yozilsa, ushbu klass instansiyasi 'callable' ga aylanadi va uni xuddi oddiy funksiya kabi $instance($args) ko'rinishida chaqirish mumkin (Single Action Controller yoki Invokable Command larda keng qo'llaniladi)."
  },
  {
    "id": "t-php-20",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "senior",
    "question": "PHP Garbage Collector da 'Cyclic Reference' (aylanma bog'liqlik) muammosi qanday hal qilinadi?",
    "options": [
      {
        "key": "A",
        "text": "Reference counting yetarli: refcount nolga tushmasa ham skript tugaganda OS xotirani o'zi tozalaydi, shuning uchun sikllar alohida hal qilinmaydi"
      },
      {
        "key": "B",
        "text": "Mark-and-Sweep algoritmi bilan butun heap har so'rov oxirida to'liq skanerlanib, erishib bo'lmaydigan ob'ektlar o'chiriladi"
      },
      {
        "key": "C",
        "text": "Concurrent Cycle Collection algoritmi orqali zval ranglari (binafsha, kulrang, qora, oq) bo'yicha tahlil qilinib, sikllar aniqlanadi va xotira bo'shatiladi"
      },
      {
        "key": "D",
        "text": "Har bir ob'ekt yaratilganda PHP uni alohida oqimdagi (thread) kuzatuvchiga ulaydi va u sikllarni real vaqtda uzib turadi"
      }
    ],
    "correct": "C",
    "explanation": "PHP 5.3 dan boshlab Goldman va Bacon tomonidan ishlab chiqilgan Cyclic Garbage Collector qo'llaniladi. U refcount kamayganda ehtimoliy sikllarni 'binafsha' buferga joylaydi va bufer to'lganda (10,000 ta ob'ekt) simulyatsiya orqali sikllarni aniqlab (oq tugunlarni) xotiradan tozalaydi."
  },
  {
    "id": "t-php-21",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "junior",
    "question": "PHP da `final class` yoki `final` metod e'lon qilish nima uchun kerak?",
    "options": [
      {
        "key": "A",
        "text": "Klassdan boshqa klasslar meros olishini (inheritance) yoki metodni override qilishni taqiqlash uchun"
      },
      {
        "key": "B",
        "text": "Klass yoki metodning xotirada faqat bitta nusxada yaratilishini (Singleton) ta'minlash uchun"
      },
      {
        "key": "C",
        "text": "Metodni faqat o'z klassi ichidan chaqirishga ruxsat berib, tashqi kod uchun ko'rinmas qilish uchun"
      },
      {
        "key": "D",
        "text": "Klass nusxasini yaratishni taqiqlab, faqat statik metodlar orqali foydalanishga ruxsat berish uchun"
      }
    ],
    "correct": "A",
    "explanation": "final kalit so'zi klass oldiga qo'yilsa, undan bola klass yaratish taqiqlanadi (class Child extends FinalClass xato beradi). Metod oldiga qo'yilsa, bola klassda ushbu metodni qayta yozish (override qilish) taqiqlanadi."
  },
  {
    "id": "t-php-22",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "middle",
    "question": "PHP da Anonymous Class (Anonim klass) haqida qaysi fikr to'g'ri?",
    "options": [
      {
        "key": "A",
        "text": "Anonim klass nomga ega emas, shuning uchun `extends` ishlatib bo'lmaydi va u faqat ichma-ich massivlarda qo'llanadi"
      },
      {
        "key": "B",
        "text": "`new class { ... }` orqali bir martalik sodda obyektlar yaratish mumkin bo'lib, u interfeyslarni implement qilishi va boshqa klasslardan meros olishi mumkin"
      },
      {
        "key": "C",
        "text": "`new class { ... }` orqali yaratilgan obyekt faqat bitta metodga ega bo'lishi mumkin va interfeyslarni implement qila olmaydi, uni qayta ishlatib ham bo'lmaydi"
      },
      {
        "key": "D",
        "text": "Anonim klass avtomatik Singleton bo'lib, har bir `new class` chaqiruvi bir xil obyektni qaytaradi"
      }
    ],
    "correct": "B",
    "explanation": "PHP 7 da kiritilgan new class($args) implements SomeInterface { ... } sintaksisi bir martalik ishlatiladigan sodda obyektlar, mocklar yoki strategiyalar yaratishda alohida .php fayl ochib o'tirmasdan foydalanish uchun juda qulaydir."
  },
  {
    "id": "t-php-23",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "middle",
    "question": "PHP da Generator funksiyada `yield from` qanday vazifani bajaradi?",
    "options": [
      {
        "key": "A",
        "text": "Generator ichida ishga tushgan xatoni ushlab, uni tashqi chaqiruvchiga o'tkazmasdan jim bostiradi"
      },
      {
        "key": "B",
        "text": "Boshqa bir Generator yoki massivdan barcha qiymatlarni delegatsiya asosida ketma-ket chiqarib beradi"
      },
      {
        "key": "C",
        "text": "Generatorni darhol to'xtatadi va barcha qolgan qiymatlarni o'tkazib yuborib, bitta massiv sifatida qaytaradi"
      },
      {
        "key": "D",
        "text": "Boshqa generatorning natijalarini kutib, ular tugagach massivga yig'ib bitta qiymat sifatida chiqaradi"
      }
    ],
    "correct": "B",
    "explanation": "yield from $iterable sintaksisi ichki generator yoki massiv (array/Traversable) ichidagi qiymatlarni tashqi chaqiruvchiga to'g'ridan-to'g'ri delegatsiya qiladi. Bu murakkab generator zanjirlarini qisqa va tushunarli yozishga yordam beradi."
  },
  {
    "id": "t-php-24",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "senior",
    "question": "PHP 8.2 da kiritilgan DNF (Disjunctive Normal Form) tiplari nimani bildiradi?",
    "options": [
      {
        "key": "A",
        "text": "Intersection (va - &) tiplarini Union (yoki - |) tiplari ichida qavslar orqali guruhlash imkoniyati, masalan: `(HasTitle&HasAuthor)|null`"
      },
      {
        "key": "B",
        "text": "Bir nechta Union tiplarini (A|B)|(C|D) ko'rinishida ichma-ich yozish uchun mo'ljallangan, Intersection tiplari bilan ishlamaydi"
      },
      {
        "key": "C",
        "text": "Intersection (&) tiplarini faqat funksiya qaytarish tipida, Union (|) bilan birga ishlatishni taqiqlovchi qoida"
      },
      {
        "key": "D",
        "text": "Tipni `null` bo'lishi mumkin deb belgilashning qisqartmasi: `?Type` o'rniga `Type|null` yozishni majburiy qiladi"
      }
    ],
    "correct": "A",
    "explanation": "DNF (Disjunctive Normal Form) tiplari PHP 8.2 da kiritilgan bo'lib, u Union va Intersection tiplarini birlashtirish imkonini beradi. Masalan, (A & B) | (C & D) yoki (Countable & ArrayAccess) | null ko'rinishidagi qat'iy va moslashuvchan tiplash imkonini beradi."
  },
  {
    "id": "t-php-25",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "junior",
    "question": "PHP da Abstract class va Interface o'rtasidagi asosiy farq nima?",
    "options": [
      {
        "key": "A",
        "text": "Klass bir nechta abstract klassdan meros olishi mumkin, lekin faqat bitta interfeysni implement qila oladi"
      },
      {
        "key": "B",
        "text": "Abstract class tana qismiga (body) ega to'liq metodlar va xususiyatlar (properties) saqlashi mumkin, interfeysda esa faqat metod signature lari va konstantalar bo'ladi"
      },
      {
        "key": "C",
        "text": "Abstract class faqat abstract metodlarga ega bo'lishi mumkin, interfeysda esa tanasi bo'lgan metodlar va xususiyatlar yoziladi, ammo bir nechtasini birga ishlatib bo'lmaydi"
      },
      {
        "key": "D",
        "text": "Interfeysdan obyekt yaratib bo'ladi, abstract class'dan esa faqat voris klass orqali nusxa olinadi"
      }
    ],
    "correct": "B",
    "explanation": "PHP da klass faqat bitta abstract klassdan meros (extends) olishi mumkin, lekin istalgancha interfeysni implement qilishi mumkin. Abstract klassda holat (properties) va tayyor logika (metodlar tanasi) bo'lishi mumkin, interfeys esa faqat shartnoma (kontrakt) vazifasini o'taydi."
  },
  {
    "id": "t-php-26",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "middle",
    "question": "PHP da `clone` kalit so'zi ishlatilganda va klassda `__clone()` metodi yozilmaganda qanday klonlash sodir bo'ladi?",
    "options": [
      {
        "key": "A",
        "text": "Shallow copy (yuzaki nusxa): skalyar qiymatlar nusxalanadi, ammo obyekt xususiyatlari asl obyekt bilan bir xil manzilga ishora qilib qoladi"
      },
      {
        "key": "B",
        "text": "Faqat public xususiyatlar nusxalanadi, private va protected xususiyatlar yangi obyektda bo'sh (null) qoladi"
      },
      {
        "key": "C",
        "text": "Deep copy (chuqur nusxa): ichma-ich barcha obyektlar ham avtomatik rekursiv ravishda nusxalanib, mustaqil bo'lib qoladi (`__clone()` shart emas)"
      },
      {
        "key": "D",
        "text": "Xatolik: `__clone()` metodi yozilmagan bo'lsa, PHP obyektni klonlashni rad etib Error tashlaydi"
      }
    ],
    "correct": "A",
    "explanation": "Standart clone amalida PHP yuzaki nusxa (shallow copy) oladi. Agar ob'ekt ichida boshqa ob'ektlar bo'lsa, ularning faqat havolasi (reference) ko'chiriladi. Chuqur nusxa (deep copy) hosil qilish uchun __clone() sehrli metodida ichki obyektlarni ham qo'lda $this->subObj = clone $this->subObj; qilish talab etiladi."
  },
  {
    "id": "t-php-27",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "senior",
    "question": "PHP da Opcache va JIT (Just-In-Time) kompilyatori ishlash prinsipi bo'yicha qaysi ta'rif to'g'ri?",
    "options": [
      {
        "key": "A",
        "text": "Opcache faqat CLI rejimida ishlaydi, JIT esa faqat web-serverda; ular bir-biriga bog'liq emas va birga yoqib bo'lmaydi"
      },
      {
        "key": "B",
        "text": "Opcache PHP kodni Opcode ga aylantirib umumiy xotirada saqlaydi; JIT esa eng ko'p bajariladigan CPU-bound opcodelarni to'g'ridan-to'g'ri mashina kodiga (machine code) kompilyatsiya qiladi"
      },
      {
        "key": "C",
        "text": "JIT PHP kodni opcode ga aylantirib umumiy xotirada saqlaydi; Opcache esa tez-tez ishlaydigan opcodelarni mashina kodiga o'giradi, ikkalasi ham faqat CLI rejimida foyda beradi"
      },
      {
        "key": "D",
        "text": "Opcache har bir so'rovda kodni qayta kompilyatsiya qiladi, JIT esa natijalarni diskka yozib, keyingi so'rovlarda ishlatadi"
      }
    ],
    "correct": "B",
    "explanation": "Opcache har bir so'rovda faylni qayta parsing va kompilyatsiya qilishdan qutqaradi (Opcode keshlanadi). PHP 8 da kiritilgan JIT esa DynASM orqali tez-tez chaqiriladigan 'qaynoq' opcodelarni to'g'ridan-to'g'ri x86/ARM mashina kodiga aylantiradi. Bu CPU-bound vazifalarda (matematika, tasvirlar, ML) katta yutuq beradi."
  },
  {
    "id": "t-php-28",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "junior",
    "question": "PHP da `===` (identiklik) va `==` (tenglik) operatorlarining asosiy farqi nimada?",
    "options": [
      {
        "key": "A",
        "text": "`===` faqat obyektlarni, `==` esa faqat satr va sonlarni solishtirish uchun mo'ljallangan, ular almashtirib bo'lmaydi"
      },
      {
        "key": "B",
        "text": "`==` ham qiymatni, ham ma'lumot turini solishtiradi; `===` esa tiplarni avtomatik o'zgartirib faqat qiymatni tekshiradi, shu sabab tezroq ishlaydi"
      },
      {
        "key": "C",
        "text": "Ikkalasi bir xil natija beradi, farqi faqat `===` tezroq ishlashida: u massivlar uchun, `==` esa skalyarlar uchun"
      },
      {
        "key": "D",
        "text": "`===` ham qiymatni, ham ma'lumot turini (tipini) solishtiradi; `==` esa tiplarni avtomatik o'zgartirib (type coercion) faqat qiymatni tekshiradi"
      }
    ],
    "correct": "D",
    "explanation": "PHP da == operatori tiplarni avtomatik tarzda moslashtiradi (masalan, 0 == '0' -> true). === operatori esa tiplarni o'zgartirmasdan, ularning tipi va qiymati to'liq bir xilligini tekshiradi (0 === '0' -> false). Kutilmagan xatolarni oldini olish uchun doimo === tavsiya etiladi."
  },
  {
    "id": "t-php-29",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "senior",
    "question": "PHP da Reflection API yordamida qaysi amalni bajarish mumkin?",
    "options": [
      {
        "key": "A",
        "text": "Klasslar, metodlar va xususiyatlarning tuzilishini runtime paytida tahlil qilish, hatto private property larning qiymatini o'qish va o'zgartirish"
      },
      {
        "key": "B",
        "text": "Klass fayllarini avtomatik yuklash (autoload) va ularni PSR-4 bo'yicha namespace'larga bog'lash"
      },
      {
        "key": "C",
        "text": "Faqat public metodlar ro'yxatini olish mumkin, private va protected a'zolarga hech qanday usulda kirib bo'lmaydi"
      },
      {
        "key": "D",
        "text": "Dastur kodini mashina kodiga kompilyatsiya qilib, ishlash tezligini oshirish va xotira sarfini avtomatik kamaytirish, shuning uchun kod ham tezlashadi"
      }
    ],
    "correct": "A",
    "explanation": "Reflection API (ReflectionClass, ReflectionProperty va h.k.) dasturning o'zini o'zi ichkaridan tekshirish imkonini beradi. Laravel IoC konteyneri aynan Reflection orqali klass konstruktorining qaramliklarini (dependencies) avtomatik aniqlab, ularni inyekt qiladi."
  },
  {
    "id": "t-php-30",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "middle",
    "question": "PHP da Arrow Functions (`fn($x) => $x * 2`) anonim funksiyalardan (`function($x) use (...)`) qaysi qulayligi bilan ajralib turadi?",
    "options": [
      {
        "key": "A",
        "text": "Tashqi o'zgaruvchilarni havola (by-reference) orqali ushlaydi, shuning uchun funksiya ichida ularni o'zgartirish tashqariga ta'sir qiladi"
      },
      {
        "key": "B",
        "text": "Tashqi ko'lamdagi (outer scope) o'zgaruvchilarni `use` kalit so'zisiz avtomatik ravishda qiymat bo'yicha (by-value) ushlaydi"
      },
      {
        "key": "C",
        "text": "Argumentlarga tip va standart qiymat bera olmaydi, shuning uchun faqat tipsiz parametrlar bilan ishlaydi"
      },
      {
        "key": "D",
        "text": "Bir nechta ifodadan iborat blok tanasini yozishga imkon beradi, `return` kalit so'zini ishlatish ham mumkin"
      }
    ],
    "correct": "B",
    "explanation": "PHP 7.4 da kiritilgan Arrow Functions yagona ifodadan iborat bo'lib, tashqi o'zgaruvchilarni avtomatik tarzda o'z ichiga oladi (implicit by-value binding). Ammo ular bir nechta qatorli kod yoki void amallar uchun emas, aniq bitta ifoda qiymatini qaytarish uchun mo'ljallangan."
  },
  {
    "id": "t-php-31",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "middle",
    "question": "PHP da `try - catch - finally` blokida, agar `try` yoki `catch` ichida `return` bo'lsa, `finally` bloki bajariladimi?",
    "options": [
      {
        "key": "A",
        "text": "Yo'q, `return` bajarilishi bilan funksiya darhol tugaydi, shuning uchun `finally` bloki o'tkazib yuboriladi"
      },
      {
        "key": "B",
        "text": "Ha, `finally` bloki har qanday holatda ham, hatto `return` chaqirilgan bo'lsa ham ijro etiladi"
      },
      {
        "key": "C",
        "text": "Faqat xatolik (exception) ro'y bergan holatdagina bajariladi, oddiy `return` da esa ishga tushmaydi"
      },
      {
        "key": "D",
        "text": "Faqat `try` blokida `return` bo'lsa bajariladi, `catch` ichidagi `return` esa `finally` ni bekor qiladi"
      }
    ],
    "correct": "B",
    "explanation": "PHP da finally bloki kafolatlangan bajarilish (guaranteed cleanup) uchun mo'ljallangan. Agar try yoki catch blokida return bo'lsa, qiymat hisoblanadi, lekin return qilishdan oldin finally bloki to'liq bajariladi va shundan so'nggina natija qaytariladi."
  },
  {
    "id": "t-php-32",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "senior",
    "question": "PHP da Singleton dizayn patternini to'liq xavfsiz (bulletproof) qilish uchun qaysi sehrli metodlarni yopish (private qilish yoki xato tashlash) lozim?",
    "options": [
      {
        "key": "A",
        "text": "`__construct()`, `__sleep()` va `__debugInfo()` metodlarini"
      },
      {
        "key": "B",
        "text": "`__destruct()`, `__toString()` va `__invoke()` metodlarini"
      },
      {
        "key": "C",
        "text": "`__construct()`, `__clone()` va `__wakeup()` (yoki `__unserialize()`)"
      },
      {
        "key": "D",
        "text": "`__get()`, `__set()` va `__call()` metodlarini"
      }
    ],
    "correct": "C",
    "explanation": "Haqiqiy Singleton faqat bitta instansiyaga ega bo'lishi kerak. new orqali yangi obyekt yaratmaslik uchun __construct private qilinadi; clone orqali nusxalamaslik uchun __clone private qilinadi; va unserialize() orqali yangi instansiya tiklanmasligi uchun __wakeup yoki __unserialize bloklanadi."
  },
  {
    "id": "t-php-33",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "middle",
    "question": "PHP 8.0 da Named Arguments (Nomlangan argumentlar) xususiyati bo'yicha qaysi qoida to'g'ri?",
    "options": [
      {
        "key": "A",
        "text": "Parametrlarni o'z nomlari bilan ixtiyoriy tartibda uzatish va oraliqdagi ixtiyoriy (default) parametrlarni tashlab ketish mumkin"
      },
      {
        "key": "B",
        "text": "Nomlangan argumentlar faqat o'rnatilgan (built-in) funksiyalarda ishlaydi, foydalanuvchi funksiyalari ularni qo'llab-quvvatlamaydi"
      },
      {
        "key": "C",
        "text": "Nomlangan argumentlar faqat konstruktorlarda ishlaydi va ularni oddiy pozitsion argumentlar bilan aralashtirib bo'lmaydi"
      },
      {
        "key": "D",
        "text": "Parametrlar faqat e'lon qilingan tartibda, lekin nomi bilan yozilishi shart, default qiymatli parametrni tashlab ketib bo'lmaydi"
      }
    ],
    "correct": "A",
    "explanation": "PHP 8.0 Named Arguments funksiya parametrlarining o'rnini eslab o'tirmasdan $fn(paramName: $val) ko'rinishida berish imkonini yaratadi. Shuningdek, 10 ta default parametrning faqat 8-chisiga qiymat berish kerak bo'lsa, oldingi 7 tasini yozib o'tirish shart emas."
  },
  {
    "id": "t-php-34",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "senior",
    "question": "PHP da `SplSubject` va `SplObserver` interfeyslari orqali qaysi GoF dizayn patterni realizatsiya qilinadi?",
    "options": [
      {
        "key": "A",
        "text": "Strategy (Strategiya) patterni"
      },
      {
        "key": "B",
        "text": "Decorator (Bezak) patterni"
      },
      {
        "key": "C",
        "text": "Factory Method (Zavod metodi) patterni"
      },
      {
        "key": "D",
        "text": "Observer (Kuzatuvchi) patterni"
      }
    ],
    "correct": "D",
    "explanation": "PHP Standart Kutubxonasida (SPL) Observer patterni uchun tayyor SplSubject (attach, detach, notify) va SplObserver (update) interfeyslari mavjud. Ular obyekt holati o'zgarganda boshqa qaram obyektlarni xabardor qilish mexanizmini standartlashtiradi."
  },
  {
    "id": "t-php-35",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "middle",
    "question": "PHP da `__get()` va `__set()` sehrli metodlari qachon ishga tushadi?",
    "options": [
      {
        "key": "A",
        "text": "Faqat metod nomi mavjud bo'lmasa ishga tushadi, xususiyatlarga murojaat qilishda esa umuman chaqirilmaydi"
      },
      {
        "key": "B",
        "text": "Har safar har qanday xususiyat o'qilganda yoki yozilganda, u public bo'lsa ham, avtomatik ravishda ishga tushadi"
      },
      {
        "key": "C",
        "text": "Mavjud bo'lmagan (inaccessible) yoki ko'rinish chegarasi yopiq (private/protected) xususiyatga murojaat qilinganda yoki qiymat yozilganda"
      },
      {
        "key": "D",
        "text": "Faqat obyekt serializatsiya qilinayotganda (serialize/unserialize) xususiyatlarni o'qish va tiklash uchun ishga tushadi (faqat shu holatda)"
      }
    ],
    "correct": "C",
    "explanation": "__get($property) va __set($property, $value) faqat ob'ektda mavjud bo'lmagan yoki o'sha ko'lamda (scope) ko'rinmaydigan xususiyatlarga murojaat etilganda chaqiriladi. Agar xususiyat public bo'lsa, PHP to'g'ridan-to'g'ri o'qiydi/yozadi va bu sehrli metodlar chaqirilmaydi."
  },
  {
    "id": "t-php-36",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "senior",
    "question": "Composer PSR-4 avtoyuklash (autoloading) spetsifikatsiyasi bo'yicha qaysi qoida to'g'ri?",
    "options": [
      {
        "key": "A",
        "text": "Klass nomi namespace prefiksidan keyin faqat bitta papka darajasiga ega bo'lishi kerak, ichma-ich namespace'lar esa qo'llab-quvvatlanmaydi, autoloader faqat bir darajani taniydi"
      },
      {
        "key": "B",
        "text": "Autoload `include_path` sozlamasi orqali ishlaydi va klass nomi fayl nomiga mos kelishi shart emas, `classmap` esa PSR-4 uchun majburiy"
      },
      {
        "key": "C",
        "text": "To'liq kvalifikatsiyalangan klass nomi (FQCN) namespace prefiksidan so'ng kataloglar iyerarxiyasi va fayl nomi bilan birga '.php' kengaytmasiga to'liq mos kelishi kerak"
      },
      {
        "key": "D",
        "text": "Har bir klass fayli `class-` prefiksi bilan boshlanib, nomi kichik harflar va defis bilan yozilishi shart (masalan, class-user-model.php)"
      }
    ],
    "correct": "C",
    "explanation": "PSR-4 bo'yicha namespace prefiksi (masalan, App\\) ma'lum bir papkaga (masalan, app/) bog'lanadi. Qolgan har bir sub-namespace papka nomiga, eng oxirgi klass nomi esa aynan shu nomdagi .php faylga (katta-kichik harflar sezgirligi bilan) to'liq mos kelishi shart."
  },
  {
    "id": "t-php-37",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "junior",
    "question": "PHP da `in_array('0', [false, true])` ifodasi PHP 7 da va PHP 8 da qanday natija qaytaradi va nega?",
    "options": [
      {
        "key": "A",
        "text": "PHP 7 da `true`, PHP 8 da esa `false`, chunki PHP 8 da satr va bool solishtirishi qat'iyroq bo'ldi"
      },
      {
        "key": "B",
        "text": "Ikkala versiyada ham `false`, chunki '0' satri bo'sh bo'lmagan satr sifatida `true` ga teng emas"
      },
      {
        "key": "C",
        "text": "PHP 7 da `true` (chunki '0' == false), PHP 8 da ham `true` (agar 3-parametr $strict=true berilmasa)"
      },
      {
        "key": "D",
        "text": "PHP 7 da `false`, PHP 8 da `true`, chunki PHP 8 da '0' satri avtomatik int ga o'giriladi"
      }
    ],
    "correct": "C",
    "explanation": "in_array() uchinchi parametri $strict standart holda false bo'lgani sababli noqat'iy tenglik (==) bilan tekshiradi. PHP da (bool)'0' false bo'lsa-da, '0' == false true beradi. Xavfsiz tekshiruv uchun doimo in_array('0', [false, true], true) ishlatilishi shart."
  },
  {
    "id": "t-php-38",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "senior",
    "question": "PHP 8.2 da kiritilgan `readonly class` butun klassga qo'llanilganda qanday cheklovlar vujudga keladi?",
    "options": [
      {
        "key": "A",
        "text": "Klassning faqat public xususiyatlari readonly bo'ladi, private va protected xususiyatlar esa o'zgartirilishi mumkin bo'lib qoladi"
      },
      {
        "key": "B",
        "text": "Klass faqat `final` bo'lishi mumkin va konstruktorda xususiyatlarga qiymat berishdan keyin ularni o'zgartirib bo'lmaydi, statik xususiyatlar esa ruxsat etiladi (meros olishda ham)"
      },
      {
        "key": "C",
        "text": "Readonly class meros olinmaydi, faqat interfeyslarni implement qiladi va metodlari ham readonly (o'zgarmas) deb hisoblanadi"
      },
      {
        "key": "D",
        "text": "Klassning barcha xususiyatlari avtomatik readonly va typed bo'ladi, statik xususiyatlar (static properties) va dinamik xususiyatlar (dynamic properties) qo'shish qat'iyan taqiqlanadi"
      }
    ],
    "correct": "D",
    "explanation": "Readonly class e'lon qilinganda: uning har bir instansiya xususiyati avtomatik readonly hisoblanadi va tipga ega bo'lishi shart. Dinamik xususiyatlar taqiqlanadi va static xususiyatlar e'lon qilish mumkin emas. Shuningdek, undan meros oluvchi har qanday bola klass ham readonly bo'lishi shart."
  },
  {
    "id": "t-php-39",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "middle",
    "question": "PHP da Open/Closed Principle (OCP) ni buzmasdan yangi to'lov tizimlarini (Click, Payme, Uzum) qo'shishning eng to'g'ri OOP yondashuvi qaysi?",
    "options": [
      {
        "key": "A",
        "text": "Barcha to'lov tizimlarini bitta statik `Payment::process($type, $data)` metodiga yig'ib, yangi tizim uchun shu metodga yangi tarmoq qo'shish"
      },
      {
        "key": "B",
        "text": "Yagona `PaymentGatewayInterface` yaratib, har bir to'lov tizimini alohida klass sifatida implement qilish va strategiya (Strategy pattern) orqali chaqirish"
      },
      {
        "key": "C",
        "text": "Har bir to'lov tizimi uchun `PaymentService` klassidan meros olib, asosiy klassdagi metodlarni o'zgartirish va `switch` ni yangilash"
      },
      {
        "key": "D",
        "text": "Bitta `PaymentService` klassida `if ($type === 'click') ... elseif ($type === 'payme')` shartlar zanjirini yozib, yangi tizim qo'shilganda uni kengaytirish"
      }
    ],
    "correct": "B",
    "explanation": "OCP (Kengayish uchun ochiq, o'zgarish uchun yopiq) tamoyiliga binoan yangi funksionallik mavjud kodni o'zgartirmasdan, yangi kod qo'shish orqali kiritilishi kerak. Interfeys va Strategy pattern orqali yangi to'lov turi mavjud kodga tegilmasdan oson ulanadi."
  },
  {
    "id": "t-php-40",
    "category": "php",
    "categoryLabel": "PHP tili",
    "level": "senior",
    "question": "PHP da `Throwable` interfeysi iyerarxiyasida `Error` va `Exception` o'rtasidagi asosiy konseptual farq nimada?",
    "options": [
      {
        "key": "A",
        "text": "`Error` ni faqat `catch (Exception $e)` bilan ushlash mumkin, `Exception` esa faqat `Throwable` orqali ushlanadi, ikkalasi bir xil iyerarxiyada turadi"
      },
      {
        "key": "B",
        "text": "Ikkalasi ham `Exception` klassidan meros oladi; `Error` faqat ogohlantirish (warning) darajasidagi, `Exception` esa jiddiy xatolar uchun ishlatiladi"
      },
      {
        "key": "C",
        "text": "`Error` — foydalanuvchi kiritgan noto'g'ri ma'lumotlar uchun; `Exception` esa PHP dvigateli ichki xatolari uchun mo'ljallangan va uni ushlab bo'lmaydi, PHP 7 va 8 da bir xil"
      },
      {
        "key": "D",
        "text": "`Error` — PHP engine/runtime darajasidagi jiddiy muammolar (TypeError, ParseError, DivisionByZeroError) uchun; `Exception` esa dasturiy (biznes-logika) xatoliklari uchun mo'ljallangan"
      }
    ],
    "correct": "D",
    "explanation": "PHP 7 dan boshlab deyarli barcha xatoliklar Throwable interfeysiga birlashtirildi. Error klassi (TypeError, ArithmeticError, ParseError va h.k.) PHP dvigatelining ichki jiddiy xatolari bo'lib, ular ilgari fatal error bo'lgan. Exception esa odatda dasturchi tomonidan nazorat qilinadigan va throw qilinadigan xatoliklar uchun ishlatiladi. Ikkalasini ham catch (Throwable $e) bilan ushlash mumkin."
  },
  {
    "id": "t-lar-1",
    "category": "laravel",
    "categoryLabel": "Laravel Core",
    "level": "senior",
    "question": "Laravel da tranzaksiya ichida Job yuborilganda (`DB::transaction(...)`), nega `DB::afterCommit()` ishlatilmasa yoki Job klassiga `public $afterCommit = true;` berilmasa poyga holati (Race Condition) yuzaga kelishi mumkin?",
    "options": [
      {
        "key": "A",
        "text": "Tranzaksiya to'liq commit bo'lishidan oldinroq tezkor Queue Worker jobni navbatdan olib bajarishga tushsa, yangi yaratilgan yozuv hali bazada ko'rinmay ModelNotFoundException bilan yiqiladi"
      },
      {
        "key": "B",
        "text": "Job yuborilishi tranzaksiyani avtomatik bekor qiladi (rollback), shu sabab yozuv bazaga umuman tushmay qoladi va keyingi so'rovlarda ko'rinmaydi"
      },
      {
        "key": "C",
        "text": "Queue Worker tranzaksiya ichidagi jobni faqat tranzaksiya tugaguncha kutadi, shuning uchun race condition emas, faqat jobning kechikishi yuz beradi"
      },
      {
        "key": "D",
        "text": "Tranzaksiya paytida baza jadvali butunlay bloklanadi, shuning uchun worker ulanolmay, `QueryException` bilan har doim qayta urinish (retry) navbatiga tushadi, bu esa jobni sekinlashtiradi"
      }
    ],
    "correct": "A",
    "explanation": "Bu juda mashhur production xatosi! DB tranzaksiyasi hali yakunlanmasdan dispatch($job) qilinganda, tezkor worker jobni oladi, lekin baza darajasida tranzaksiya hali commit bo'lmagani uchun boshqa ulanish (worker) yozuvni ko'ra olmaydi. afterCommit xususiyati jobni faqat tranzaksiya muvaffaqiyatli yakunlangachgina jo'natishni kafolatlaydi."
  },
  {
    "id": "t-lar-2",
    "category": "laravel",
    "categoryLabel": "Laravel asoslari",
    "skillSlug": "laravel",
    "question": "Laravel Service Container da 'bind()', 'singleton()' va 'scoped()' o'rtasidagi farq nima?",
    "options": [
      {
        "key": "A",
        "text": "bind() faqat interfeyslarni sinflarga bog'laydi, singleton() va scoped() esa konkret sinflar uchun, ular o'rtasida hayot davri farqi yo'q"
      },
      {
        "key": "B",
        "text": "bind() ilova bo'ylab bitta ob'ekt beradi, singleton() har safar yangisini yaratadi, scoped() esa faqat testlarda ishlaydi"
      },
      {
        "key": "C",
        "text": "bind() har safar yangi ob'ekt beradi, singleton() ilova bo'ylab bitta, scoped() esa joriy HTTP so'rov yoki job davomida bitta instansiya beradi"
      },
      {
        "key": "D",
        "text": "singleton() har HTTP so'rovda yangidan yaratiladi, scoped() esa butun ilova davomida bitta, bind() esa faqat bir marta chaqiriladi"
      }
    ],
    "correct": "C",
    "explanation": "bind() har chaqirilganda yangi ob'ekt yasaydi. singleton() ilova yashash davrida yagona nusxani saqlaydi. scoped() (Laravel Octane/Queues uchun muhim) esa bitta HTTP so'rov davomida bitta instansiya bo'lib, so'rov tugagach tozalanadi.",
    "level": "senior"
  },
  {
    "id": "t-lar-3",
    "category": "laravel",
    "categoryLabel": "Laravel asoslari",
    "skillSlug": "laravel",
    "question": "Service Provider da 'register()' metodi ichida boshqa xizmatlarning Event yoki DB chaqiruvlarini ishlatish nega xato hisoblanadi?",
    "options": [
      {
        "key": "A",
        "text": "register() faqat bir marta, ilovaning birinchi o'rnatilishida chaqiriladi, shuning uchun unda ma'lumotlar bazasiga murojaat qilish xavfsiz emas"
      },
      {
        "key": "B",
        "text": "register() ichida Event va DB chaqiruvlari taqiqlangan, chunki ular faqat `boot()` dan keyin ishlaydigan queue worker orqali bajariladi"
      },
      {
        "key": "C",
        "text": "register() har so'rovda ikki marta chaqiriladi, shu sabab ichidagi DB va Event chaqiruvlari ikki marta bajarilib, ma'lumot takrorlanadi"
      },
      {
        "key": "D",
        "text": "register() faqat konteynerga bog'lash (binding) uchun mo'ljallangan, bu vaqtda boshqa providerlar hali yuklanmagan bo'lishi mumkin"
      }
    ],
    "correct": "D",
    "explanation": "register() faqat konteynerga bog'lash uchundir. Unda boshqa xizmatlarni chaqirib bo'lmaydi, chunki ular hali ro'yxatdan o'tmagan bo'lishi mumkin. Barcha xizmatlar bog'langandan keyin ishlaydigan mantiq 'boot()' metodiga yoziladi.",
    "level": "middle"
  },
  {
    "id": "t-lar-4",
    "category": "laravel",
    "categoryLabel": "Laravel asoslari",
    "skillSlug": "laravel",
    "question": "Laravel Form Request Lifecycle da ushbu metodlar qaysi to'g'ri ketma-ketlikda ishlaydi?",
    "options": [
      {
        "key": "A",
        "text": "prepareForValidation() -> rules() -> authorize()"
      },
      {
        "key": "B",
        "text": "authorize() -> rules() -> prepareForValidation()"
      },
      {
        "key": "C",
        "text": "rules() -> authorize() -> prepareForValidation()"
      },
      {
        "key": "D",
        "text": "authorize() -> prepareForValidation() -> rules()"
      }
    ],
    "correct": "D",
    "explanation": "Laravel FormRequest avval authorize() ni tekshiradi (ruxsati bo'lmasa 403 beradi), so'ngra prepareForValidation() orqali kiruvchi ma'lumotlarni tozalaydi/formatlaydi va nihoyat rules() qoidalarini ishga tushiradi.",
    "level": "junior"
  },
  {
    "id": "t-lar-5",
    "category": "laravel",
    "categoryLabel": "Laravel asoslari",
    "skillSlug": "laravel",
    "question": "Scoped Route Model Binding nima vazifani bajaradi? ('Route::get('/users/{user}/posts/{post}')->scopeBindings()')",
    "options": [
      {
        "key": "A",
        "text": "Faqat {user} ni yuklaydi, {post} ni esa controllerga xom ID ko'rinishida uzatadi, bog'lanishni tekshirmaydi"
      },
      {
        "key": "B",
        "text": "Barcha {post} larni bitta so'rovda yuklaydi va ularni {user} ning ID si bo'yicha avtomatik guruhlab, to'liq ro'yxat sifatida qaytaradi"
      },
      {
        "key": "C",
        "text": "Begona post ID berilganda 403 (Forbidden) qaytaradi va foydalanuvchining sessiyasini darhol tugatadi"
      },
      {
        "key": "D",
        "text": "Faqat ko'rsatilgan {user} ga tegishli bo'lgan {post} ni yuklaydi va begona post ID si berilsa 404 qaytaradi"
      }
    ],
    "correct": "D",
    "explanation": "Scoped Route Model Binding ota-bola bog'lanishini tekshiradi: agar so'ralgan {post} aynan shu {user} ga tegishli bo'lmasa, avtomatik 404 (Not Found) beradi. Bu IDOR / BOLA xavfsizlik zaifligini 1 qatorda yopadi.",
    "level": "middle"
  },
  {
    "id": "t-lar-6",
    "category": "laravel",
    "categoryLabel": "Laravel asoslari",
    "skillSlug": "laravel",
    "question": "Laravel Middleware da '$response = $next($request);' dan KEYIN yozilgan kod qachon ishga tushadi?",
    "options": [
      {
        "key": "A",
        "text": "Controller va barcha ichki qatlamlar javobni shakllantirib bo'lgach, javob mijozga qaytish arafasida"
      },
      {
        "key": "B",
        "text": "Javob mijozga yuborilib, brauzer ulanishi yopilganidan so'ng, alohida jarayonda (terminate) bajariladi"
      },
      {
        "key": "C",
        "text": "Faqat xatolik (exception) yuz berganda, javobni qayta ishlash o'rniga ishga tushadi"
      },
      {
        "key": "D",
        "text": "Controller chaqirilishidan oldin, so'rov middleware zanjiriga kirgan zahoti, ya'ni Controller ishga tushmasidan avval bajariladi"
      }
    ],
    "correct": "A",
    "explanation": "Middleware onion (piyoz) arxitekturasida ishlaydi. $next($request) dan oldingi kod so'rov Controllerga yetib bormasdan oldin, undan keyingi kod esa Controller javob berganidan so'ng (Response headers qo'shish yoki loglash uchun) ishlaydi.",
    "level": "junior"
  },
  {
    "id": "t-lar-7",
    "category": "laravel",
    "categoryLabel": "Laravel asoslari",
    "skillSlug": "laravel",
    "question": "Laravel 11 da Http Kernel, Console Kernel va RouteServiceProvider qayerga ko'chdi?",
    "options": [
      {
        "key": "A",
        "text": "Ular boshqa nomlar bilan `app/Core` papkasiga ko'chirildi va endi `config/kernel.php` fayli orqali boshqariladi"
      },
      {
        "key": "B",
        "text": "Ular olib tashlanib, sozlamalar bootstrap/app.php faylidagi ixcham zanjirga birlashtirildi"
      },
      {
        "key": "C",
        "text": "Ular composer paketiga (`laravel/framework`) ko'chirilib, loyiha ichida sozlash uchun ochiq qoldirilmadi"
      },
      {
        "key": "D",
        "text": "Faqat Console Kernel olib tashlandi, Http Kernel va RouteServiceProvider avvalgidek `app/Http` va `app/Providers` da qoldi"
      }
    ],
    "correct": "B",
    "explanation": "Laravel 11 'Slim Skeleton' arxitekturasiga o'tdi. Ortiqcha Kernel va Provider fayllari tozalanib, routing, middleware va exception boshqaruvi to'g'ridan-to'g'ri bootstrap/app.php ichida konfiguratsiya qilinadi.",
    "level": "senior"
  },
  {
    "id": "t-lar-8",
    "category": "laravel",
    "categoryLabel": "Laravel asoslari",
    "skillSlug": "laravel",
    "question": "Laravelda 'Signed URLs' (URL::temporarySignedRoute) qanday xavfsizlik kafolatini beradi?",
    "options": [
      {
        "key": "A",
        "text": "URL ni shifrlaydi (AES), shuning uchun foydalanuvchi parametr qiymatini ko'ra olmaydi va o'zgartira ham olmaydi"
      },
      {
        "key": "B",
        "text": "Havolani faqat tizimga kirgan foydalanuvchiga ruxsat beradi, `auth` middleware o'rniga sessiya cookie'sini tekshiradi"
      },
      {
        "key": "C",
        "text": "Havolani faqat bir marta ishlatish mumkin bo'lgan tokenga aylantirib, ikkinchi ochilishda uni bazadan o'chiradi"
      },
      {
        "key": "D",
        "text": "URL parametrlariga kriptografik HMAC hesh qo'shadi, agar foydalanuvchi bitta parametrni o'zgartirsa havola bekor bo'ladi"
      }
    ],
    "correct": "D",
    "explanation": "Signed URL lar APP_KEY yordamida parametrlar ustidan kriptografik imzo (signature) yasaydi. Agar kimdir URL dagi user_id=5 ni user_id=6 ga o'zgartirsa, imzo mos kelmaydi va 403 Invalid Signature xatosi qaytadi.",
    "level": "middle"
  },
  {
    "id": "t-elo-1",
    "category": "eloquent",
    "categoryLabel": "Eloquent ORM",
    "skillSlug": "eloquent-orm",
    "question": "Lazy Eager Loading da 'load()' va 'loadMissing()' metodlari o'rtasidagi muhim farq nima?",
    "options": [
      {
        "key": "A",
        "text": "load() JOIN orqali bitta so'rovda, loadMissing() esa har bir model uchun alohida so'rov bilan relatsiyani yuklaydi"
      },
      {
        "key": "B",
        "text": "load() bitta modelga, loadMissing() esa faqat Collection ga qo'llanadi va ikkalasi ham bir xil so'rov yuboradi"
      },
      {
        "key": "C",
        "text": "load() faqat bo'sh relatsiyani yuklaydi, loadMissing() esa har doim qaytadan DB ga so'rov yuborib, mavjudini yangilaydi"
      },
      {
        "key": "D",
        "text": "load() har doim qaytadan DB ga so'rov yuboradi, loadMissing() esa agar relatsiya oldin yuklangan bo'lsa ortiqcha so'rov yubormaydi"
      }
    ],
    "correct": "D",
    "explanation": "load('posts') relatsiya xotirada mavjud bo'lsa ham DB dan qayta so'rab oladi. loadMissing('posts') esa relatsiya avval eager-load qilingan-qilinmaganini tekshiradi va faqat yuklanmagan bo'lsagina DB ga bitta so'rov yuboradi.",
    "level": "junior"
  },
  {
    "id": "t-elo-2",
    "category": "eloquent",
    "categoryLabel": "Eloquent ORM",
    "skillSlug": "eloquent-orm",
    "question": "Nima uchun production da polimorfik munosabatlar uchun har doim 'Relation::enforceMorphMap()' ishlatilishi shart?",
    "options": [
      {
        "key": "A",
        "text": "Morph map jadval ustunlari uchun avtomatik indeks yaratadi, shu sabab polimorfik so'rovlar sezilarli tezlashadi"
      },
      {
        "key": "B",
        "text": "Morph map bo'lmasa, polimorfik relatsiyalarda Eager Loading ishlamaydi va har doim N+1 muammosi yuzaga keladi"
      },
      {
        "key": "C",
        "text": "Polimorfik relatsiyalar faqat morph map bilan ishlaydi; u bo'lmasa so'rovlar xatolik beradi va `commentable_id` ustuni umuman to'ldirilmaydi"
      },
      {
        "key": "D",
        "text": "Baza ustunida 'App\\Models\\Post' kabi to'liq sinf nomi saqlanishining oldini olish va kod refactoringida DB ma'lumotlari buzilmasligi uchun"
      }
    ],
    "correct": "D",
    "explanation": "Standart bo'yicha Laravel commentable_type ustuniga 'App\\Models\\Post' deb yozadi. Agar keyinchalik sinf boshqa papkaga ko'chirilsa, bazadagi barcha relatsiyalar buziladi. MorphMap yordamida 'post' aliasi ishlatilsa, kod o'zgarsa ham baza xavfsiz qoladi.",
    "level": "senior"
  },
  {
    "id": "t-elo-3",
    "category": "eloquent",
    "categoryLabel": "Eloquent ORM",
    "skillSlug": "eloquent-orm",
    "question": "Katta hajmdagi ma'lumotlarni o'qiyotganda 'chunk()' va 'chunkById()' metodlari orasidagi eng katta xavfsizlik farqi nima?",
    "options": [
      {
        "key": "A",
        "text": "chunk() har bir bo'lakni alohida tranzaksiyada qulflaydi, chunkById() esa qulf qo'ymaydi, shu sababli chunk() ichida yozish xavfsiz emas"
      },
      {
        "key": "B",
        "text": "chunk() OFFSET ishlatadi; agar tsikl ichida qatorlar o'zgartirilsa (masalan status='processed'), qatorlar o'tib ketadi (skip rows). chunkById() esa WHERE id > $lastId ishlatgani uchun bu xatodan xoli"
      },
      {
        "key": "C",
        "text": "chunk() butun natijani oldin xotiraga yuklab, keyin bo'laklarga bo'ladi; chunkById() esa bo'laklarni to'g'ridan-to'g'ri bazadan oqim sifatida o'qiydi, chunk() esa faqat kichik jadvallar uchun"
      },
      {
        "key": "D",
        "text": "chunk() faqat Collection da ishlaydi va tartiblangan ma'lumot talab qilmaydi, chunkById() esa faqat id ustuni UUID bo'lsagina ishlaydi"
      }
    ],
    "correct": "B",
    "explanation": "chunk() LIMIT 100 OFFSET 100 qiladi. Agar tsikl ichida qator yangilansa va shartga mos kelmay qolsa, qatorlar siljiydi va navbatdagi 100 ta qator tashlab ketiladi. chunkById() WHERE id > 100 ORDER BY id ishlatadi va hech qachon qatorni yo'qotmaydi.",
    "level": "middle"
  },
  {
    "id": "t-elo-4",
    "category": "eloquent",
    "categoryLabel": "Eloquent ORM",
    "skillSlug": "eloquent-orm",
    "question": "Eloquent 'withoutGlobalScope()' metodi qachon va nima maqsadda qo'llaniladi?",
    "options": [
      {
        "key": "A",
        "text": "Global scope'ni modeldan butunlay o'chirib tashlaydi, shuning uchun u keyingi barcha so'rovlarda ham ishlamay qoladi"
      },
      {
        "key": "B",
        "text": "SoftDeletes yoki ActiveScope kabi avtomatik qo'shiladigan global shartlarni chetlab o'tib, o'chirilgan yoki nofaol yozuvlarni ham olish uchun"
      },
      {
        "key": "C",
        "text": "Modelning barcha relatsiyalarini yuklashni o'chirib, faqat asosiy jadvalning ustunlarini tezroq olish uchun ishlatiladi (qayta yoqib bo'lmaydi)"
      },
      {
        "key": "D",
        "text": "Faqat testlarda qo'llaniladi, production kodida ishlatilsa global scope xavfsizlik cheklovlarini doimiy buzadi"
      }
    ],
    "correct": "B",
    "explanation": "Global Scope har bir Eloquent so'roviga avtomatik shart qo'shadi (masalan, deleted_at IS NULL). withoutGlobalScope() yordamida admin panelda o'chirilgan yoki barcha ijarachilar (tenants) ma'lumotlarini filtrsiz ko'rish mumkin.",
    "level": "junior"
  },
  {
    "id": "t-elo-5",
    "category": "eloquent",
    "categoryLabel": "Eloquent ORM",
    "skillSlug": "eloquent-orm",
    "question": "Eloquent Custom Casts (CastsAttributes) interfeysi qanday ikkita metodni amalga oshirishni talab qiladi?",
    "options": [
      {
        "key": "A",
        "text": "get() va set()"
      },
      {
        "key": "B",
        "text": "load() va save()"
      },
      {
        "key": "C",
        "text": "handle() va cast()"
      },
      {
        "key": "D",
        "text": "serialize() va hydrate()"
      }
    ],
    "correct": "A",
    "explanation": "CastsAttributes interfeysi get($model, $key, $value, $attributes) va set($model, $key, $value, $attributes) metodlaridan iborat. get() bazadagi xom qiymatni Value Object ga, set() esa Value Object ni bazaga yoziladigan xom formatga aylantiradi.",
    "level": "middle"
  },
  {
    "id": "t-elo-6",
    "category": "eloquent",
    "categoryLabel": "Eloquent ORM",
    "skillSlug": "eloquent-orm",
    "question": "Model Pruning ('implements Prunable') mexanizmi qanday vazifani bajaradi?",
    "options": [
      {
        "key": "A",
        "text": "Modelni bazadan o'chirmasdan, faqat `deleted_at` ustunini to'ldirib, yozuvni foydalanuvchidan yashiradi"
      },
      {
        "key": "B",
        "text": "Model jadvalini muntazam optimallashtirib, indekslarni qayta qurib va fragmentatsiyani kamaytirib turadi"
      },
      {
        "key": "C",
        "text": "Modellar ro'yxatini keshdan tozalab, eskirgan Eloquent natijalarini qayta hisoblashga majbur qiladi"
      },
      {
        "key": "D",
        "text": "Muntazam ravishda eski loglar, eskirgan sessiyalar yoki vaqti o'tgan tokenlarni fonda avtomatik tozalaydi"
      }
    ],
    "correct": "D",
    "explanation": "Prunable traiti va prunable() metodi yordamida vaqti o'tgan yozuvlar (masalan, 30 kundan oshgan loglar) belgilanadi. 'model:prune' cron buyrug'i fonda xotirani to'ldirmasdan ularni avtomatik tozalab turadi.",
    "level": "senior"
  },
  {
    "id": "t-db-1",
    "category": "eloquent",
    "categoryLabel": "Eloquent & DB",
    "skillSlug": "database-indexing",
    "question": "MySQL da 'Covering Index' (Index-Only Scan) nima va nega u so'rovlarni 10-50 barobargacha tezlashtiradi?",
    "options": [
      {
        "key": "A",
        "text": "So'rov natijasini indeksning o'zida keshlab qo'yadi, shuning uchun bir xil so'rov takrorlanganda baza uni qayta bajarmaydi"
      },
      {
        "key": "B",
        "text": "Bir nechta alohida indeksni optimizator bitta so'rovda birlashtirib ishlatishi, shu sababli har bir ustunga alohida indeks qo'yish kifoya, bu so'rovni tezlashtiradi"
      },
      {
        "key": "C",
        "text": "Indeks to'liq operativ xotiraga yuklanib, diskka umuman yozilmaydi va qayta ishga tushirishda ma'lumot yo'qolmaydi"
      },
      {
        "key": "D",
        "text": "So'rovdagi barcha ustunlar (SELECT, WHERE, ORDER BY) indeksning o'zida mavjud bo'lib, diskdagi asosiy jadvalga (Clustered Index) murojaat qilish shart bo'lmaydi"
      }
    ],
    "correct": "D",
    "explanation": "Agar SELECT qilinayotgan va WHERE da tekshirilayotgan barcha ustunlar bitta kompozit indeksda bo'lsa, MySQL jadval qatorlarini diskdan o'qib o'tirmaydi va javobni to'g'ridan-to'g'ri RAM dagi B-Tree indeksning o'zidan qaytaradi (EXPLAIN da 'Using index').",
    "level": "senior"
  },
  {
    "id": "t-db-2",
    "category": "eloquent",
    "categoryLabel": "Eloquent & DB",
    "skillSlug": "database-indexing",
    "question": "Nima uchun 'SELECT * FROM users WHERE email LIKE '%@gmail.com';' so'rovida 'email' ustunidagi B-Tree indeksi ishlamaydi?",
    "options": [
      {
        "key": "A",
        "text": "Chunki email ustuni UNIQUE bo'lmasa indeks ishlamaydi; takrorlanuvchi qiymatlarda MySQL doim jadvalni to'liq o'qiydi"
      },
      {
        "key": "B",
        "text": "B-Tree indeksi chapdan o'ngga (Prefix) qarab saralangan bo'ladi; qidiruv satri oldida '%' bo'lsa, indeks daraxtidan foydalanib bo'lmaydi va Full Table Scan yuz beradi"
      },
      {
        "key": "C",
        "text": "Chunki `LIKE` operatori B-Tree indeksini umuman qo'llab-quvvatlamaydi; indeks faqat `=` va `IN` shartlarida ishlaydi, boshqa hollarda emas, `LIKE 'a%'` ham shunday"
      },
      {
        "key": "D",
        "text": "Chunki '%' belgisi oldidan emas, oxiridan qo'yilganda indeks ishlamaydi; '@gmail.com%' ko'rinishidagina Full Table Scan yuz beradi"
      }
    ],
    "correct": "B",
    "explanation": "B-Tree lug'atga o'xshaydi: siz so'zlarni bosh harfiga qarab oson topasiz, lekin 'qaysi so'zlar ...bek bilan tugaydi' desa butun lug'atni boshidan oxirigacha varaqlashga majbur bo'lasiz. '%so'z' indeks ishlatmaydi, 'so'z%' esa indeksdan foydalanadi.",
    "level": "junior"
  },
  {
    "id": "t-db-3",
    "category": "eloquent",
    "categoryLabel": "Eloquent & DB",
    "skillSlug": "database-transactions",
    "question": "Pessimistic Locking da 'SELECT ... FOR UPDATE' qanday ishlaydi?",
    "options": [
      {
        "key": "A",
        "text": "Qulfni faqat tanlov bajarilayotgan lahzagacha ushlaydi va SELECT tugashi bilan avtomatik bo'shatadi, tranzaksiyani kutmaydi"
      },
      {
        "key": "B",
        "text": "Tanlangan qatorlarni eksklyuziv qulflaydi, tranzaksiya tugamaguncha boshqa hech qaysi tranzaksiya bu qatorlarni o'zgartira olmaydi yoki FOR UPDATE bilan o'qiy olmaydi"
      },
      {
        "key": "C",
        "text": "Butun jadvalni qulflaydi, tranzaksiya tugamaguncha boshqa tranzaksiyalar jadvaldan hech narsa o'qiy olmaydi va qator qo'sha olmaydi, bu ishlashni sekinlashtiradi"
      },
      {
        "key": "D",
        "text": "Qatorlarni qulflamaydi, faqat o'zgarish bo'lsa xatolik tashlaydi (versiya ustuni orqali), qulf esa umuman ishlatilmaydi"
      }
    ],
    "correct": "B",
    "explanation": "FOR UPDATE eksklyuziv qulf (X-lock) qo'yadi. Bank hisobidan pul yechish yoki chipta sotib olish kabi nozik amallarda bir vaqtning o'zida ikki kishi bir xil balansni o'zgartirib qo'ymasligi (Race Condition) uchun shart.",
    "level": "middle"
  },
  {
    "id": "t-db-4",
    "category": "eloquent",
    "categoryLabel": "Eloquent & DB",
    "skillSlug": "database-transactions",
    "question": "SQL tranzaksiyalarida 'Dirty Read' anomaliyasi nimani anglatadi?",
    "options": [
      {
        "key": "A",
        "text": "Boshqa tranzaksiya o'zgartirgan, lekin hali COMMIT bo'lmagan (va keyinchalik ROLLBACK bo'lishi mumkin bo'lgan) xom ma'lumotni o'qib olish"
      },
      {
        "key": "B",
        "text": "Bir tranzaksiya ichida bir xil so'rovni ikki marta bajarganda, ikkinchi marta boshqa tranzaksiya qo'shgan yangi qatorlar paydo bo'lishi"
      },
      {
        "key": "C",
        "text": "Ikki tranzaksiya bir-birining qulfini kutib qolishi va baza ularning birini avtomatik bekor qilishi (deadlock)"
      },
      {
        "key": "D",
        "text": "Bir tranzaksiya o'qigan qatorni boshqa tranzaksiya o'zgartirib commit qilgani sababli, ikkinchi o'qishda boshqa qiymat ko'rinishi"
      }
    ],
    "correct": "A",
    "explanation": "Dirty Read - hali tasdiqlanmagan (uncommitted) ma'lumotni o'qishdir. Agar 1-tranzaksiya pulni o'tkazib, keyin xatolik tufayli rollback qilsa, 2-tranzaksiya aslida mavjud bo'lmagan soxta balansni ko'rgan bo'ladi.",
    "level": "junior"
  },
  {
    "id": "t-db-5",
    "category": "eloquent",
    "categoryLabel": "Eloquent & DB",
    "skillSlug": "database-optimization",
    "question": "Index Cardinality nima va past kardinallikka ega ustunlarga (masalan, gender, status) indeks qo'yish nega ko'pincha samarasiz?",
    "options": [
      {
        "key": "A",
        "text": "Kardinallik - ustundagi unikal qiymatlar sonidir; agar ustunda faqat 2-3 xil qiymat bo'lsa (masalan 1 mln qatordan 500 mingtasi 'active'), DB optimizatori indeksdan ko'ra jadvalni to'liq skaner qilishni tezroq deb topadi"
      },
      {
        "key": "B",
        "text": "Kardinallik — jadvaldagi qatorlar umumiy soni; qatorlar soni kam bo'lgan jadvallarda indeks qo'yish har doim ortiqcha va baza uni e'tiborsiz qoldiradi, chunki kichik jadvalda daraxt yaratish ortiqcha"
      },
      {
        "key": "C",
        "text": "Kardinallik — ustundagi NULL qiymatlar soni; NULL ko'p bo'lsa MySQL indeksni umuman ishlatmaydi, shuning uchun status kabi ustunlarda indeks bo'lmaydi"
      },
      {
        "key": "D",
        "text": "Kardinallik — indeks daraxtining chuqurligi; past kardinallikli ustunlarda daraxt juda chuqur bo'lib ketadi, shu sabab qidiruv sekinlashadi"
      }
    ],
    "correct": "A",
    "explanation": "Kardinallik qanchalik yuqori bo'lsa (masalan, user_id, email), indeks shunchalik samarali ishlaydi. Agar ustun faqat 'M' va 'F' dan iborat bo'lsa, qidiruv natijasi jadvalning 50% ini tashkil qiladi va diskdan indeks orqali sakrab o'qish Full Table Scan dan sekinroq bo'lib qoladi.",
    "level": "senior"
  },
  {
    "id": "t-db-6",
    "category": "eloquent",
    "categoryLabel": "Eloquent & DB",
    "skillSlug": "sql",
    "question": "SQL da 'WITH RECURSIVE' (Recursive CTE) qanday vazifa uchun eng qulay yechim hisoblanadi?",
    "options": [
      {
        "key": "A",
        "text": "Katta jadvallarni parallel ravishda bir nechta oqimda o'qib, natijalarni tezroq birlashtirish va umumiy so'rov vaqtini qisqartirish uchun"
      },
      {
        "key": "B",
        "text": "Cheksiz ichma-ich joylashgan iyerarxik daraxtlarni (Menyular, Kategoriyalar, Xodimlar bo'ysunuvchilari) bitta so'rovda olish uchun"
      },
      {
        "key": "C",
        "text": "Jadvalning har bir qatori uchun trigger ishga tushirib, bog'liq jadvallarni ketma-ket yangilash uchun"
      },
      {
        "key": "D",
        "text": "Takrorlanuvchi qatorlarni (duplicate) topib o'chirish va jadvalni avtomatik unikal holatga keltirish uchun"
      }
    ],
    "correct": "B",
    "explanation": "Recursive CTE o'z-o'zini chaqiruvchi SQL konstruksiyasi bo'lib, daraxtsimon iyerarxiyalarni (category -> subcategory -> subsubcategory) ko'p qavatli JOIN larsiz yoki tsiklsiz bitta toza SQL so'rovida olish imkonini beradi.",
    "level": "middle"
  },
  {
    "id": "t-db-7",
    "category": "eloquent",
    "categoryLabel": "Eloquent & DB",
    "skillSlug": "database-design",
    "question": "Database Sharding va Database Partitioning o'rtasidagi asosiy farq nima?",
    "options": [
      {
        "key": "A",
        "text": "Partitioning faqat o'qish uchun nusxalar (replika) yaratadi, Sharding esa yozish yuklamasini bitta Master'ga jamlaydi"
      },
      {
        "key": "B",
        "text": "Partitioning ma'lumotlarni bir nechta alohida serverlarga tarqatadi, Sharding esa bitta serverda jadvalni mantiqiy bo'laklarga bo'ladi"
      },
      {
        "key": "C",
        "text": "Partitioning bitta server/baza ichida bitta jadvalni qismlarga bo'ladi, Sharding esa ma'lumotlarni bir nechta alohida jismoniy serverlarga (DB instansiyalariga) tarqatadi"
      },
      {
        "key": "D",
        "text": "Ikkalasi ham bir xil narsa: jadvalni bo'laklarga ajratish; farqi faqat nomida, MySQL da Partitioning, PostgreSQL da Sharding deb ataladi, ajratib o'tirish shart emas"
      }
    ],
    "correct": "C",
    "explanation": "Partitioning bitta baza ichida jadvalni oylarga yoki ID diapazoniga bo'lib saqlaydi (bitta server). Sharding esa gorizontal masshtablash bo'lib, foydalanuvchilarning 1-yarmini 1-serverga, 2-yarmini 2-serverga joylashtirishni anglatadi.",
    "level": "senior"
  },
  {
    "id": "t-db-8",
    "category": "eloquent",
    "categoryLabel": "Eloquent & DB",
    "skillSlug": "database-optimization",
    "question": "MySQL Read/Write Splitting arxitekturasida 'sticky' ulanish sozlamasi nega kerak?",
    "options": [
      {
        "key": "A",
        "text": "Foydalanuvchi ma'lumot yozgan (INSERT/UPDATE) zahoti, keyingi o'qish so'rovini replika kechikishi tufayli eski ma'lumot ko'rinib qolmasligi uchun darhol Master (Primary) bazaga yo'naltirish"
      },
      {
        "key": "B",
        "text": "Replikalar o'rtasida yuklamani teng taqsimlash uchun har bir so'rovni navbat bilan boshqa replikaga yo'naltiradi (round-robin)"
      },
      {
        "key": "C",
        "text": "Ulanishni uzmasdan saqlab turadi (persistent connection), shu sabab har bir so'rovda yangi TCP ulanish ochish xarajati yo'qoladi"
      },
      {
        "key": "D",
        "text": "Foydalanuvchining barcha so'rovlarini (o'qish ham, yozish ham) bitta replikaga biriktirib qo'yadi, shuning uchun Master bazaga yuklama tushmaydi, bu yuklamani yaxshi taqsimlaydi"
      }
    ],
    "correct": "A",
    "explanation": "Replikatsiya asinxron bo'lgani uchun Masterga yozilgan ma'lumot Slave (Replica) ga 100-500ms da yetib borishi mumkin. 'sticky' sozlamasi foydalanuvchi biror narsa yozganidan so'ng joriy sessiyadagi keyingi o'qishlarni Masterdan o'qitib, o'zgarish darhol ko'rinishini ta'minlaydi.",
    "level": "middle"
  },
  {
    "id": "t-red-1",
    "category": "redis",
    "categoryLabel": "Redis va Kesh",
    "skillSlug": "redis",
    "question": "Redis 'volatile-lru' va 'allkeys-lru' eviction policy (xotirani bo'shatish siyosati) lari qanday farqlanadi?",
    "options": [
      {
        "key": "A",
        "text": "volatile-lru eng ko'p ishlatilgan muddatli kalitlarni o'chiradi, allkeys-lru esa barcha kalitlar ichidan eng ko'p ishlatilganlarini o'chiradi"
      },
      {
        "key": "B",
        "text": "volatile-lru faqat muddati (TTL/expire) o'rnatilgan kalitlar orasidan eng kam ishlatilganlarini o'chiradi, allkeys-lru esa istisnosiz barcha kalitlar ichidan eng kam ishlatilganlarini o'chiradi"
      },
      {
        "key": "C",
        "text": "volatile-lru faqat muddati o'rnatilmagan kalitlar orasidan eng kam ishlatilganlarini o'chiradi, allkeys-lru esa faqat muddati bor kalitlarni tozalaydi, bunda TTL muddati hisobga olinmaydi"
      },
      {
        "key": "D",
        "text": "Ikkalasi ham bir xil ishlaydi, farqi shundaki, volatile-lru faqat string tipidagi, allkeys-lru esa barcha tipdagi kalitlarni tozalaydi"
      }
    ],
    "correct": "B",
    "explanation": "volatile-lru faqat expire vaqti bor keshlar ichidan eskirganlarini o'chiradi (doimiy saqlanadigan kalitlarga tegmaydi). allkeys-lru esa Redis sof kesh sifatida ishlatilganda xotira to'lsa har qanday eng kam ishlatilgan kalitni o'chirib joy ochadi.",
    "level": "senior"
  },
  {
    "id": "t-red-2",
    "category": "redis",
    "categoryLabel": "Redis va Kesh",
    "skillSlug": "caching-strategies",
    "question": "Cache-Aside (Lazy Loading) kesh strategiyasining ishlash tartibi qanday?",
    "options": [
      {
        "key": "A",
        "text": "Kesh o'zi bazadan ma'lumot yuklaydi: topilmasa kesh tizimi bazaga murojaat qiladi, ilova esa bazadan to'g'ridan-to'g'ri o'qimaydi"
      },
      {
        "key": "B",
        "text": "Ilova yozish paytida ma'lumotni avval keshga yozadi, keshdagi o'zgarishlar esa bazaga fonda, ma'lum vaqt oralig'ida ko'chiriladi"
      },
      {
        "key": "C",
        "text": "Ilova ma'lumotni avval bazaga yozadi, so'ng keshga sinxron yozadi; o'qishda har doim faqat keshdan oladi va kesh bo'sh bo'lsa xato qaytaradi"
      },
      {
        "key": "D",
        "text": "Ilova avval keshni tekshiradi: agar topilsa (Cache Hit) keshdan oladi; topilmasa (Cache Miss) bazadan o'qiydi, keshga yozib qo'yadi va javob qaytaradi"
      }
    ],
    "correct": "D",
    "explanation": "Cache-Aside - eng keng tarqalgan kesh strategiyasidir: ilova keshga qaraydi, bo'lmasa DB dan olib, keyingi safar tez bo'lishi uchun keshga qo'yadi. Yozish paytida esa keshdagi eski kalit o'chirib tashlanadi (Invalidation).",
    "level": "junior"
  },
  {
    "id": "t-red-3",
    "category": "redis",
    "categoryLabel": "Redis va Kesh",
    "skillSlug": "redis",
    "question": "Redis Streams va Redis Pub/Sub o'rtasidagi eng fundamental farq nima?",
    "options": [
      {
        "key": "A",
        "text": "Pub/Sub faqat bitta Redis serverida ishlaydi, Streams esa klasterda; ular xabar saqlash va yetkazish xususiyatlari bo'yicha farq qilmaydi"
      },
      {
        "key": "B",
        "text": "Pub/Sub da xabar yuborilgan paytda qabul qiluvchi (subscriber) ulanmagan bo'lsa xabar abadiy yo'qoladi ('fire and forget'), Streams esa xabarlarni log sifatida saqlaydi va consumer kechikib ulansa ham o'qiy oladi"
      },
      {
        "key": "C",
        "text": "Streams faqat bitta consumer bilan ishlaydi va xabarlar tartibi kafolatlanmaydi, Pub/Sub esa bir nechta subscriber uchun tartibli yetkazishni ta'minlaydi, shuning uchun u faqat kichik loyihalarga mos"
      },
      {
        "key": "D",
        "text": "Pub/Sub xabarlarni diskka saqlaydi va har bir subscriber uni faqat bir marta oladi, Streams esa xabarlarni xotirada saqlab, o'qilgach o'chirib tashlaydi"
      }
    ],
    "correct": "B",
    "explanation": "Pub/Sub 'fire-and-forget' mexanizmidir: agar tinglovchi oflayn bo'lsa, xabar yo'qoladi. Redis Streams esa Kafka kabi doimiy saqlanuvchi xabarlar jurnali bo'lib, Consumer Groups, Acknowledgment (ACK) va qayta o'qish imkonini beradi.",
    "level": "senior"
  },
  {
    "id": "t-red-4",
    "category": "redis",
    "categoryLabel": "Redis va Kesh",
    "skillSlug": "caching-strategies",
    "question": "Kesh tizimlarida 'Cache Stampede' (yoki Dogpiling) muammosi qachon sodir bo'ladi?",
    "options": [
      {
        "key": "A",
        "text": "Redis xotirasi to'lib, eviction siyosati kalitlarni o'chira boshlaganda va ilova bu kalitlarni qayta tiklay olmay qolganda"
      },
      {
        "key": "B",
        "text": "Kesh kalitlari juda uzun yoki bir xil prefiksga ega bo'lib, ular xesh to'qnashuviga (collision) olib kelib noto'g'ri qiymat qaytarganda"
      },
      {
        "key": "C",
        "text": "Bir nechta Redis tuguni (node) o'rtasida replikatsiya uzilib, kesh ma'lumotlari tugunlar o'rtasida mos kelmay qolganda"
      },
      {
        "key": "D",
        "text": "Juda ommabop kesh kalitining muddati (TTL) tugashi bilan bir vaqtda kelgan minglab parallel so'rovlar birdaniga bazaga yopirilib, DB ni qulatganda"
      }
    ],
    "correct": "D",
    "explanation": "Masalan, bosh sahifa keshining TTL i tugasa, o'sha soniyada kirgan 5000 ta foydalanuvchi keshni topolmay, barchasi bir vaqtda og'ir SQL so'rovini bazaga yuboradi. Buni oldini olish uchun Lock (Mutex) yoki ehtimollik asosidagi erta qayta hisoblash (Probabilistic Early Expiration) ishlatiladi.",
    "level": "middle"
  },
  {
    "id": "t-red-5",
    "category": "redis",
    "categoryLabel": "Redis va Kesh",
    "skillSlug": "redis",
    "question": "Redis da murakkab amallarni atomik (Race condition siz) bajarish uchun qaysi dasturlash tili skriptlari ishlatiladi?",
    "options": [
      {
        "key": "A",
        "text": "Perl"
      },
      {
        "key": "B",
        "text": "Python"
      },
      {
        "key": "C",
        "text": "Lua"
      },
      {
        "key": "D",
        "text": "Go"
      }
    ],
    "correct": "C",
    "explanation": "Redis ichiga Lua interpretatori o'rnatilgan. EVAL buyrug'i orqali uzatilgan Lua skripti Redis ning yagona oqimli (single-threaded) arxitekturasida bloklovchi tarzda 100% atomik bajariladi, oraga hech qanday boshqa so'rov kira olmaydi.",
    "level": "senior"
  },
  {
    "id": "t-red-6",
    "category": "redis",
    "categoryLabel": "Redis va Kesh",
    "skillSlug": "caching-strategies",
    "question": "Nima uchun Laravel File yoki Database kesh drayverlarida 'Cache::tags(['users'])->flush()' ishlamaydi?",
    "options": [
      {
        "key": "A",
        "text": "Teglarni tozalash `flush()` bilan emas, faqat `forget()` bilan amalga oshadi, shuning uchun ularning o'zida teg tushunchasi mavjud emas"
      },
      {
        "key": "B",
        "text": "Teglash uchun ko'p o'lchovli kalitlar assotsiatsiyasi va tezkor to'plamlar (Sets) kerak, bu faqat Redis va Memcached da mavjud"
      },
      {
        "key": "C",
        "text": "Laravel teglar uchun alohida `tags` jadvalini talab qiladi va u migratsiya orqali yaratilmasa, fayl va database drayverlari ishlamaydi"
      },
      {
        "key": "D",
        "text": "Teglash faqat `database` drayverida ishlamaydi, fayl drayveri esa tegni qo'llab-quvvatlaydi, lekin `flush()` metodi bu drayverda taqiqlangan"
      }
    ],
    "correct": "B",
    "explanation": "Cache Tags teglangan barcha kalitlar ro'yxatini tezkor xotira to'plamlarida saqlashni talab qiladi. Fayl tizimida har safar teg bo'yicha tozalash uchun minglab fayllarni o'qib chiqish tizimni haddan tashqari sekinlashtirgani uchun bu drayverlar tegni qo'llab-quvvatlamaydi.",
    "level": "middle"
  },
  {
    "id": "t-async-1",
    "category": "queue",
    "categoryLabel": "Navbatlar (Queue)",
    "level": "middle",
    "question": "Laravel da `php artisan queue:work --queue=high,default,low` buyrug'i berilganda navbatlar qaysi tartibda va ustuvorlikda ishlanadi?",
    "options": [
      {
        "key": "A",
        "text": "Navbatlar alifbo tartibida ishlanadi: avval 'default', so'ng 'high', oxirida 'low', ro'yxatdagi tartib e'tiborga olinmaydi (doimiy tartibda)"
      },
      {
        "key": "B",
        "text": "Worker har bir navbatdan teng miqdorda, ya'ni 10 tadan vazifa olib, ularni parallel ravishda uch oqimda bajaradi"
      },
      {
        "key": "C",
        "text": "Doimo 'high' navbatida biron vazifa bormi tekshiriladi; 'high' to'liq bo'shagandagina 'default', u ham bo'shagandagina 'low' navbatiga o'tiladi"
      },
      {
        "key": "D",
        "text": "Barcha uchala navbatdagi vazifalar teng ulushda (round-robin) olinadi, shuning uchun 'high' navbati tezroq bo'shamaydi"
      }
    ],
    "correct": "C",
    "explanation": "Laravel Queue workerlari ro'yxatdagi birinchi navbatga qat'iy ustuvorlik beradi. Modomiki 'high' navbatida vazifa bor ekan, 'default' va 'low' navbatlari kutib turadi. Agar barcha navbatlarni teng taqsimlash kerak bo'lsa, alohida worker jarayonlarini ishga tushirish lozim."
  },
  {
    "id": "t-async-2",
    "category": "queue",
    "categoryLabel": "Navbatlar (Queue)",
    "skillSlug": "queues-and-background-jobs",
    "question": "RabbitMQ va Apache Kafka o'rtasidagi fundamental me'moriy farq nima?",
    "options": [
      {
        "key": "A",
        "text": "Ikkalasi ham bir xil me'morchilikka ega; farqi faqat dasturlash tilida: RabbitMQ Erlang, Kafka esa Java, shuning uchun ularning xabar saqlashi ham bir xil"
      },
      {
        "key": "B",
        "text": "RabbitMQ faqat bitta serverda ishlaydi va klasterlashni qo'llab-quvvatlamaydi, Kafka esa faqat klasterda ishlaydi va xabarlarni saqlamaydi"
      },
      {
        "key": "C",
        "text": "RabbitMQ doimiy jurnal (Pull modeli, o'qilgach ham saqlanadi), Kafka esa an'anaviy navbat (Push modeli, o'qilgach o'chadi)"
      },
      {
        "key": "D",
        "text": "RabbitMQ an'anaviy xabarlar navbati (Push modeli, o'qilgach o'chadi), Kafka esa doimiy taqsimlangan hodisalar jurnali (Pull modeli, o'qilgach ham saqlanadi)"
      }
    ],
    "correct": "D",
    "explanation": "RabbitMQ Smart Broker / Dumb Consumer printsipida ishlaydi (xabar yetkazilgach o'chadi). Kafka esa Dumb Broker / Smart Consumer printsipida o'zgarmas Append-only log sifatida xabarlarni kunlab saqlaydi va bir nechta tizimlar o'z tezligida o'qib boradi.",
    "level": "senior"
  },
  {
    "id": "t-async-3",
    "category": "queue",
    "categoryLabel": "Navbatlar (Queue)",
    "skillSlug": "queues-and-background-jobs",
    "question": "Navbat tizimlarida 'Poison Pill' (Zaharli xabar) nima va undan qanday himoyalanamiz?",
    "options": [
      {
        "key": "A",
        "text": "Xabar ichida zararli kod bo'lib, workerni buzishi; himoya uchun barcha xabarlar `serialize()` bilan shifrlanib, so'ng workerda dekodlanadi"
      },
      {
        "key": "B",
        "text": "Formati buzilgan yoki kodni Fatal Error bilan qulatuvchi xabar bo'lib, har safar qayta urinilganda workerni o'ldiradi; uni Dead Letter Queue (DLQ) ga ajratish orqali himoyalanamiz"
      },
      {
        "key": "C",
        "text": "Bir xil xabar navbatga ikki marta tushishi (duplicate) va u ikki marta bajarilishi; undan himoyalanish uchun har bir xabarga TTL berib, qayta ishlamaymiz"
      },
      {
        "key": "D",
        "text": "Navbatga juda ko'p xabar tushib, workerlar ulgura olmay qolishi; undan himoyalanish uchun navbat uzunligini cheklab, ortiqcha xabarlarni jim tashlab yuboramiz (qayta ishlanmaydi)"
      }
    ],
    "correct": "B",
    "explanation": "Poison Pill qayta-qayta xato berib, butun navbatni to'xtatib qo'yuvchi buzuq xabardir. MaxRetries (masalan, 3 marta) tugagach, u avtomatik ravishda DLQ (Dead Letter Queue) ga o'tkaziladi, shunda boshqa sog'lom vazifalar navbatda to'xtab qolmaydi.",
    "level": "middle"
  },
  {
    "id": "t-async-4",
    "category": "queue",
    "categoryLabel": "Navbatlar (Queue)",
    "skillSlug": "queues-and-background-jobs",
    "question": "Laravelda 'ShouldBeUnique' va 'ShouldBeUniqueUntilProcessing' interfeyslarining nozik farqi nima?",
    "options": [
      {
        "key": "A",
        "text": "ShouldBeUnique bir xil jobni umuman bir martagina yuborishga ruxsat beradi (butun umr davomida), ShouldBeUniqueUntilProcessing esa muddatli (TTL) qulf qo'yadi"
      },
      {
        "key": "B",
        "text": "ShouldBeUnique faqat Redis drayverida ishlaydi, ShouldBeUniqueUntilProcessing esa faqat database drayverida; ular qulf vaqtida farq qilmaydi"
      },
      {
        "key": "C",
        "text": "ShouldBeUnique job navbatda turganida ham, bajarilayotganida ham qulfni ushlaydi; ShouldBeUniqueUntilProcessing esa worker vazifani bajarishni BOSHLAGAN zahoti qulfni ochadi"
      },
      {
        "key": "D",
        "text": "ShouldBeUnique job faqat navbatga qo'yilgunga qadar qulf ushlaydi; ShouldBeUniqueUntilProcessing esa job to'liq tugaguncha qulfni ushlab turadi"
      }
    ],
    "correct": "C",
    "explanation": "ShouldBeUnique job to'liq tugaguniga qadar bir xil ID li yangi job qo'shilishini bloklaydi. ShouldBeUniqueUntilProcessing esa job ijrosi boshlanishi bilan qulfni bo'shatadi, natijada navbatda turgan paytda dublikat bo'lmaydi, lekin bajarilish paytida yangi navbat olish mumkin bo'ladi.",
    "level": "senior"
  },
  {
    "id": "t-async-5",
    "category": "queue",
    "categoryLabel": "Navbatlar (Queue)",
    "skillSlug": "queues-and-background-jobs",
    "question": "RabbitMQ da 'Fanout Exchange' xabarni qanday qilib bir nechta navbatlarga yetkazadi?",
    "options": [
      {
        "key": "A",
        "text": "Routing key ga to'liq mos kelgan navbatga xabarni yetkazadi, mos kelmasa xabar o'chiriladi (Direct)"
      },
      {
        "key": "B",
        "text": "Xabarni faqat bitta navbatga, navbatlar orasida navbatma-navbat (round-robin) taqsimlab yetkazadi"
      },
      {
        "key": "C",
        "text": "Routing key ga umuman qaramasdan, o'ziga ulangan BARCHA navbatlarga xabarning nusxasini tarqatadi (Broadcast)"
      },
      {
        "key": "D",
        "text": "Routing key dagi andoza (pattern) bo'yicha, masalan `order.*`, mos navbatlarga tanlab yetkazadi (Topic)"
      }
    ],
    "correct": "C",
    "explanation": "Fanout exchange xabarni o'ziga bog'langan barcha navbatlarga nusxalab tashlaydi (Broadcast). Masalan: 'Buyurtma berildi' xabari bir vaqtning o'zida ham SMS navbatiga, ham Ombor navbatiga, ham Buxgalteriya navbatiga yetkaziladi.",
    "level": "middle"
  },
  {
    "id": "t-async-6",
    "category": "queue",
    "categoryLabel": "Navbatlar (Queue)",
    "skillSlug": "queues-and-background-jobs",
    "question": "Laravel Horizon nima va u faqat qaysi navbat drayveri bilan ishlaydi?",
    "options": [
      {
        "key": "A",
        "text": "Faqat Amazon SQS navbatlari uchun mo'ljallangan, vazifalarni bulutda parallel bajaradigan serverless paket"
      },
      {
        "key": "B",
        "text": "Redis navbatlari uchun mo'ljallangan, avtomatik masshtablanuvchi (auto-scaling) va chiroyli veb-dashboard taqdim etuvchi paket"
      },
      {
        "key": "C",
        "text": "Faqat database drayveri uchun ishlab chiqilgan, `jobs` jadvalidagi vazifalarni veb-interfeys orqali qo'lda boshqarish paketi"
      },
      {
        "key": "D",
        "text": "Istalgan navbat drayveri (database, SQS, Redis) bilan ishlaydigan, lekin avtomatik masshtablash imkoniyati yo'q monitoring paketi"
      }
    ],
    "correct": "B",
    "explanation": "Laravel Horizon faqat Redis drayveri uchun yaratilgan. U real vaqtda navbatlar yuklamasini, bajarilish tezligini, xatolarni ko'rsatadi va yuklama oshganda workerlar sonini avtomatik ko'paytirib, yuklama tushganda kamaytiradi.",
    "level": "middle"
  },
  {
    "id": "t-sec-1",
    "category": "security",
    "categoryLabel": "Xavfsizlik",
    "skillSlug": "web-application-security",
    "question": "CSRF (Cross-Site Request Forgery) hujumida 'SameSite=Lax' cookie atributi foydalanuvchini qanday himoya qiladi?",
    "options": [
      {
        "key": "A",
        "text": "Cookie'ni faqat bir marta, sessiya boshida yuboradi va keyingi barcha so'rovlarda qayta yubormaydi, shuning uchun CSRF imkonsiz bo'ladi"
      },
      {
        "key": "B",
        "text": "Uchinchi begona saytdan yuborilgan xavfli so'rovlarda (masalan, POST so'rovlarda) brauzer foydalanuvchi cookie sini qo'shib yubormaydi"
      },
      {
        "key": "C",
        "text": "Foydalanuvchi cookie'sini shifrlab yuboradi, shu sabab uchinchi sayt uni o'qiy olmaydi, lekin so'rovga qo'shib yuborishi mumkin"
      },
      {
        "key": "D",
        "text": "Cookie faqat HTTPS orqali uzatiladi va JavaScript uni o'qiy olmaydi, shuning uchun CSRF so'rovlari ishlamaydi"
      }
    ],
    "correct": "B",
    "explanation": "SameSite=Lax bo'lganda, foydalanuvchi boshqa zararli saytda turib qurbon saytiga POST/PUT so'rovi yuborsa, brauzer sessiya cookie sini yubormaydi. Natijada foydalanuvchi nomidan uning xabarisiz amal bajarish (CSRF) to'xtatiladi.",
    "level": "junior"
  },
  {
    "id": "t-sec-2",
    "category": "security",
    "categoryLabel": "Xavfsizlik",
    "skillSlug": "web-application-security",
    "question": "SQL Injection ga qarshi 'Prepared Statements' (PDO parametrli so'rovlar) nega 100% himoya beradi?",
    "options": [
      {
        "key": "A",
        "text": "So'rov faqat ma'lum bir IP manzildan kelgan bo'lsa bajariladi, Prepared Statement esa shu manzillarni oldindan tekshirib chiqadi"
      },
      {
        "key": "B",
        "text": "Parametrlar maxsus belgilar (', \") dan tozalanib, bazaga yuboriladi; shuning uchun hujumchi so'rov mantiqini o'zgartira olmaydi"
      },
      {
        "key": "C",
        "text": "Baza foydalanuvchi kiritmasini avtomatik shifrlab saqlaydi, shuning uchun uni so'rov sifatida o'qib ham, bajarib ham bo'lmaydi"
      },
      {
        "key": "D",
        "text": "SQL so'rov kodi va uzatilgan parametrlar (ma'lumotlar) alohida ajratiladi; baza ma'lumotni hech qachon bajariluvchi buyruq deb qabul qilmaydi"
      }
    ],
    "correct": "D",
    "explanation": "Prepared Statements da SQL sintaksisi oldindan kompilyatsiya qilinadi. Keyin uzatilgan foydalanuvchi kiritmasi (hatto unda ' OR 1=1 -- bo'lsa ham) oddiy o'lik satr (string literal) sifatida qaraladi va SQL mantig'ini buzolmaydi.",
    "level": "junior"
  },
  {
    "id": "t-sec-3",
    "category": "security",
    "categoryLabel": "Xavfsizlik",
    "level": "middle",
    "question": "Veb-xavfsizlikda 'Session Fixation' hujumining oldini olish uchun foydalanuvchi tizimga muvaffaqiyatli kirganida (Login) nima uchun `request()->session()->regenerate()` chaqirilishi shart?",
    "options": [
      {
        "key": "A",
        "text": "Hujumchi oldindan bilgan yoki qurbonga o'tkazgan eski Sessiya ID raqami o'rniga butunlay yangi tasodifiy Session ID berish va eski sessiya ma'lumotlarini unga ko'chirish orqali hisob o'g'irlanishini bartaraf qilish uchun"
      },
      {
        "key": "B",
        "text": "Sessiya ma'lumotlarini serverda shifrlab, ularni yangi cookie'ga ko'chirmasdan, foydalanuvchining eski cookie'sini brauzerdan o'chirish orqali XSS hujumlaridan himoyalanish uchun"
      },
      {
        "key": "C",
        "text": "Sessiya muddatini uzaytirib, foydalanuvchi qayta kirishga majbur bo'lmasligi va cookie'ning muddati tugab qolmasligi uchun; bu faqat qulaylik uchun va xavfsizlikka ta'sir qilmaydi"
      },
      {
        "key": "D",
        "text": "Foydalanuvchining parolini sessiyada qayta tekshirib, har bir kirishda yangi CSRF tokenini yaratish va sessiyani bazaga ko'chirish orqali hisobni brute-force dan himoya qilish uchun, bu sessiya ID sidan ishonchliroq"
      }
    ],
    "correct": "A",
    "explanation": "Session Fixation hujumida buzg'unchi qurbon brauzeriga o'zining sessiya ID sini kiritib qo'yadi. Agar foydalanuvchi tizimga kirganda sessiya ID yangilanmasa (regenerate), buzg'unchi ham o'sha sessiya ID bilan uning hisobiga kirib oladi. Laravel Auth tizimi bu xavfni regenerate() orqali avtomatik bartaraf etadi."
  },
  {
    "id": "t-sec-4",
    "category": "security",
    "categoryLabel": "Xavfsizlik",
    "level": "junior",
    "question": "Laravel Blade shablonlarida `{!! $userInput !!}` va `{{ $userInput }}` sintaksislari o'rtasidagi asosiy xavfsizlik farqi nima?",
    "options": [
      {
        "key": "A",
        "text": "`{{ ... }}` xom HTML ni chiqaradi va XSS xavfi bor; `{!! ... !!}` esa barcha maxsus belgilarni `htmlspecialchars()` orqali xavfsiz ekranlaydi, shuning uchun `{!! ... !!}` tavsiya etiladi"
      },
      {
        "key": "B",
        "text": "`{{ ... }}` faqat string qiymatlarni, `{!! ... !!}` esa faqat sonlarni chiqaradi va ikkalasi ham XSS dan bir xil himoyalaydi"
      },
      {
        "key": "C",
        "text": "Ikkalasi bir xil ekranlaydi; farqi faqat `{!! ... !!}` ma'lumotni JSON sifatida chiqarishida va faqat massivlar bilan ishlashida"
      },
      {
        "key": "D",
        "text": "`{{ ... }}` barcha maxsus belgilarni `htmlspecialchars()` orqali xavfsiz ekranlaydi (XSS dan himoya); `{!! ... !!}` esa xom HTML ni hech qanday tekshiruvsiz chiqaradi va XSS ga olib kelishi mumkin"
      }
    ],
    "correct": "D",
    "explanation": "{{ ... }} avtomatik tarzda htmlspecialchars() funksiyasini chaqiradi va <script>alert(1)</script> kabi xavfli teglarni zararsizlantiradi. {!! ... !!} esa xom kontentni to'g'ridan-to'g'ri render qiladi; unga faqat to'liq ishonchli (masalan HTMLPurifier dan o'tgan) matnlar berilishi kerak."
  },
  {
    "id": "t-sec-5",
    "category": "security",
    "categoryLabel": "Xavfsizlik",
    "skillSlug": "web-application-security",
    "question": "Content Security Policy (CSP) sarlavhasi (Header) saytni qaysi jiddiy xavfdan himoyalaydi?",
    "options": [
      {
        "key": "A",
        "text": "SQL Injection va ma'lumotlar bazasiga ruxsatsiz kirish urinishlaridan"
      },
      {
        "key": "B",
        "text": "Brute-force hujumlari va parollarni ommaviy taxmin qilishdan"
      },
      {
        "key": "C",
        "text": "XSS (Cross-Site Scripting) va ruxsatsiz begona skriptlarning yuklanishi"
      },
      {
        "key": "D",
        "text": "DDoS hujumlari va server resurslarining haddan tashqari yuklanishidan"
      }
    ],
    "correct": "C",
    "explanation": "CSP brauzerga qaysi domenlardan skriptlar, stillar va rasmlar yuklanishiga ruxsat berilganini bildiradi. Natijada hujumchi saytga inline JavaScript kod tiqsa ham, brauzer uni 'ruxsatsiz manba' deb bloklaydi.",
    "level": "senior"
  },
  {
    "id": "t-sec-6",
    "category": "security",
    "categoryLabel": "Xavfsizlik",
    "skillSlug": "web-application-security",
    "question": "Parollarni saqlashda nega 'Argon2id' zamonaviy sanoat standarti hisoblanadi va u Bcrypt dan nimasi bilan ustun?",
    "options": [
      {
        "key": "A",
        "text": "Argon2id ham CPU, ham xotira (RAM-hardened) talab qiladi; bu esa GPU va maxsus chiplar (ASIC) yordamida parollarni ommaviy sindirishni imkonsiz qiladi"
      },
      {
        "key": "B",
        "text": "Argon2id parolni salt (tuz) ishlatmasdan xeshlaydi, bu esa bir xil parollar uchun bir xil xesh berib, tekshirishni tezlashtiradi (ammo kamroq xavfsiz)"
      },
      {
        "key": "C",
        "text": "Argon2id faqat CPU ni yuklaydi, lekin Bcrypt dan tezroq ishlaydi, shuning uchun serverga tushadigan yuklama kamayadi"
      },
      {
        "key": "D",
        "text": "Argon2id xeshni qaytarib parolga aylantirish (dekodlash) imkonini beradi, shu sabab parolni tiklash funksiyasini qo'llash oson"
      }
    ],
    "correct": "A",
    "explanation": "Bcrypt faqat CPU ni yuklaydi va kuchli GPU larda parallel sindirish osonroq. Argon2id esa Memory-hardened xesh bo'lib, har bir tekshiruv uchun bir necha megabayt RAM talab qiladi va ASIC/GPU hujumchilarini iqtisodiy jihatdan to'xtatadi.",
    "level": "senior"
  },
  {
    "id": "t-sec-7",
    "category": "security",
    "categoryLabel": "Xavfsizlik",
    "skillSlug": "web-application-security",
    "question": "Server-Side Request Forgery (SSRF) hujumi qanday amalga oshiriladi?",
    "options": [
      {
        "key": "A",
        "text": "Hujumchi foydalanuvchining brauzeriga zararli JavaScript kod yuborib, uning cookie va sessiya ma'lumotlarini o'g'irlashga majbur qiladi, bunda zaif nuqta mijoz brauzeri"
      },
      {
        "key": "B",
        "text": "Hujumchi serverga havola uzatib, serverni o'zining ichki tarmog'idagi (masalan, AWS metadata http://169.254.169.254 yoki ichki baza) maxfiy ma'lumotlarni so'rashga majbur qiladi"
      },
      {
        "key": "C",
        "text": "Hujumchi foydalanuvchini aldab, u tizimga kirgan holda begona saytdan serverga kutilmagan so'rov yuborishga majbur qiladi"
      },
      {
        "key": "D",
        "text": "Hujumchi bazaga yuboriladigan so'rovga SQL buyruqlarini qo'shib, serverni ma'lumotlar bazasidagi jadvallarni o'chirishga majbur qiladi"
      }
    ],
    "correct": "B",
    "explanation": "Agar saytda 'rasm havolasini kiriting' degan funksiya bo'lsa va server bu URL ni filtrsiz yuklasa, hujumchi http://127.0.0.1:6379 (Redis) yoki Cloud metadata API sini berib, ichki maxfiy ma'lumotlarni server orqali qo'lga kiritadi.",
    "level": "senior"
  },
  {
    "id": "t-sec-8",
    "category": "security",
    "categoryLabel": "Xavfsizlik",
    "level": "senior",
    "question": "Laravel da Mass Assignment zaifligini bartaraf etish va noxush xatolarni developmentdayoq aniqlash uchun `Model::shouldBeStrict()` metodi qaysi qat'iy tekshiruvlarni yoqadi?",
    "options": [
      {
        "key": "A",
        "text": "`preventLazyLoading()`, `preventSilentlyDiscardingAttributes()` va `preventAutoCommit()` (tranzaksiyalarni avtomatik commit qilishni taqiqlash), bu testlarni tezlashtiradi"
      },
      {
        "key": "B",
        "text": "`preventLazyLoading()`, `preventSilentlyDiscardingAttributes()` (fillable da bo'lmagan maydonlar tashlab yuborilganda exception tashlash) va `preventAccessingMissingAttributes()`"
      },
      {
        "key": "C",
        "text": "Faqat `preventLazyLoading()` ni yoqadi; fillable va mavjud bo'lmagan atributlar bilan bog'liq tekshiruvlar alohida sozlanadi"
      },
      {
        "key": "D",
        "text": "Barcha modellarda `$guarded = []` ni majburiy qilib, har qanday maydonni yozishga ruxsat beradi va faqat xatolarni log faylga yozadi"
      }
    ],
    "correct": "B",
    "explanation": "Model::shouldBeStrict(!app()->isProduction()) eng zamonaviy Laravel tavsiyasidir. U fillable ga qo'shilmagan maydon yozilganda jim tashlab yuborish o'rniga darhol MassAssignmentException tashlaydi, N+1 muammosini darhol ko'rsatadi va xatolarni ishlab chiqish bosqichida ushlashga yordam beradi."
  },
  {
    "id": "t-test-1",
    "category": "testing",
    "categoryLabel": "Testlash",
    "skillSlug": "unit-testing",
    "question": "Test Doubles tushunchasida 'Mock' va 'Stub' o'rtasidagi asosiy farq nima?",
    "options": [
      {
        "key": "A",
        "text": "Ikkalasi bir xil: farqi faqat nomida; PHPUnit da `createStub()` va `createMock()` bir xil obyekt qaytaradi va bir xil tekshiruvlar qiladi"
      },
      {
        "key": "B",
        "text": "Mock faqat oldindan tayyorlangan javobni qaytaradi (State verification), Stub esa metod necha marta chaqirilganini ham tekshiradi (Behavior verification), Mock bundan tezroq ishlaydi"
      },
      {
        "key": "C",
        "text": "Stub faqat oldindan tayyorlangan javobni qaytaradi (State verification), Mock esa metod necha marta va qanday argumentlar bilan chaqirilganini ham qat'iy tekshiradi (Behavior verification)"
      },
      {
        "key": "D",
        "text": "Stub haqiqiy obyektning to'liq nusxasi bo'lib, bazaga haqiqiy so'rov yuboradi; Mock esa faqat xotirada ishlaydigan soxta obyekt, ularning farqi tezlikda"
      }
    ],
    "correct": "C",
    "explanation": "Stub shunchaki soxta ma'lumot qaytaradi: $stub->method('get')->willReturn(5). Mock esa 'sendEmail metodi roppa-rosa 1 marta 'ali@mail' argumenti bilan chaqirildimi?' deb chaqiruv xatti-harakatini (behavior) qat'iy tekshiradi.",
    "level": "junior"
  },
  {
    "id": "t-test-2",
    "category": "testing",
    "categoryLabel": "Testlash",
    "skillSlug": "feature-testing",
    "question": "Pest PHP da 'Architecture Testing' (arch()->expect(...)) qanday vazifani bajaradi?",
    "options": [
      {
        "key": "A",
        "text": "Arxitektura qoidalarini (masalan, Controllerlar faqat DTO qabul qilishi, hech kim Model ichida Request ishlatmasligi, dd() qolib ketmasligi) avtomat test sifatida tekshiradi"
      },
      {
        "key": "B",
        "text": "Controllerlarning HTTP so'rovlarga javob berish tezligini o'lchab, sekin ishlaydigan arxitektura qatlamlarini aniqlaydi"
      },
      {
        "key": "C",
        "text": "Brauzerda foydalanuvchi interfeysini avtomatik ochib, sahifalar arxitekturasi va navigatsiyasi to'g'ri ishlashini tekshiradi (end-to-end), ya'ni ssenariyni takrorlaydi"
      },
      {
        "key": "D",
        "text": "Dastur arxitekturasini avtomatik ravishda diagrammaga (UML) aylantirib beradi va loyiha tuzilmasining hujjatini yaratadi"
      }
    ],
    "correct": "A",
    "explanation": "Pest Arch plagin koddagi arxitekturaviy intizomni nazorat qiladi: arch('app')->expect(['dd', 'dump'])->not->toBeUsed() yoki Controllerlar ichida to'g'ridan-to'g'ri DB so'rovlari yozilmaganini kafolatlaydi.",
    "level": "senior"
  },
  {
    "id": "t-test-3",
    "category": "testing",
    "categoryLabel": "Testlash",
    "skillSlug": "unit-testing",
    "question": "Mutation Testing (Infection PHP) nima va nega 100% Code Coverage har doim ham testlar sifatli ekanligini anglatmaydi?",
    "options": [
      {
        "key": "A",
        "text": "Kod satrlari shunchaki ishga tushishi (coverage) yetarli emas; Infection kod ichidagi operatorlarni ataylab teskarisiga o'zgartiradi (masalan, > ni < qiladi) va testlar buni sezib yiqilishini tekshiradi"
      },
      {
        "key": "B",
        "text": "Kodni avtomatik ravishda bir necha marta takroran ishga tushirib, testlar barqaror (flaky emas) ekanini va xotira sizib chiqmasligini tekshiradi"
      },
      {
        "key": "C",
        "text": "Testlarning ishlash tezligini o'lchab, eng sekin testlarni aniqlaydi; 100% coverage esa testlar tez ishlashini kafolatlaydi, faqat hajmi muhim"
      },
      {
        "key": "D",
        "text": "Kodni avtomatik tuzatadi: topilgan xatolarni Infection o'zi tuzatib, yangi testlarni generatsiya qiladi, shu sabab coverage har doim 100% bo'ladi, shu sabab testlarni yozish shart bo'lib qolmaydi"
      }
    ],
    "correct": "A",
    "explanation": "Agar testda assert yozilmagan bo'lsa ham Code Coverage 100% ko'rsatishi mumkin. Mutation Testing esa kodga ataylab xatolar kiritib ('mutantlar'), sizning testlaringiz bu xatolarni ushlay olishini sinovdan o'tkazadi.",
    "level": "senior"
  },
  {
    "id": "t-test-4",
    "category": "testing",
    "categoryLabel": "Testlash",
    "skillSlug": "feature-testing",
    "question": "CI/CD jarayonida 'Flaky Tests' (Beqaror testlar) nima degani?",
    "options": [
      {
        "key": "A",
        "text": "Kodning yangi versiyasida buzilgan va doimiy ravishda yiqiladigan testlar, ular xatoni aniq ko'rsatadi va ishonchli hisoblanadi"
      },
      {
        "key": "B",
        "text": "Kod qamrovi (coverage) past bo'lgan va faqat sodda holatlarni tekshiradigan testlar, ular har doim muvaffaqiyatli o'tadi"
      },
      {
        "key": "C",
        "text": "Faqat sekin ishlaydigan, ya'ni belgilangan vaqt chegarasidan (timeout) oshib ketadigan testlar, ular doimo bir xil natija beradi"
      },
      {
        "key": "D",
        "text": "Kod o'zgarmagan bo'lsa ham, ba'zan o'tib, ba'zan yiqiluvchi beqaror testlar (ko'pincha vaqt, tarmoq yoki ketma-ketlikka bog'liq bo'ladi)"
      }
    ],
    "correct": "D",
    "explanation": "Flaky testlar jamoaning CI/CD ga ishonchini so'ndiradi. Ularning sababi odatda: now() vaqti, random generatorlar, parallel testlarda ma'lumotlar to'qnashuvi yoki tashqi API larga bog'lanib qolishdir.",
    "level": "middle"
  },
  {
    "id": "t-test-5",
    "category": "testing",
    "categoryLabel": "Testlash",
    "skillSlug": "unit-testing",
    "question": "PHPUnit / Pest da minglab testlar yozilganda ularni tezlashtirishning eng samarali yo'li nima?",
    "options": [
      {
        "key": "A",
        "text": "Paralell testlash (pest --parallel) va Bcrypt xesh narxini (cost) test muhitida minimal qilib qo'yish"
      },
      {
        "key": "B",
        "text": "Barcha testlarni bitta tranzaksiyaga o'rab, `RefreshDatabase` ni o'chirish va testlarda bazadan umuman foydalanmaslik"
      },
      {
        "key": "C",
        "text": "Testlarni alohida fayllarga bo'lmasdan bitta katta test klassiga yig'ib, ularni ketma-ket bajarish"
      },
      {
        "key": "D",
        "text": "Har bir test oldidan migratsiyalarni qaytadan ishga tushirish (`migrate:fresh`) va keshni har safar tozalash"
      }
    ],
    "correct": "A",
    "explanation": "Paralell testlash barcha CPU yadrolarini ishlatadi. Shuningdek, test muhitida HASH_ROUNDS=4 (yoki Bcrypt hasher round) qilib qo'yilsa, har bir testdagi parol xeshlash 200ms o'rniga 1ms oladi va minglab testlar soniyalarda o'tadi.",
    "level": "middle"
  },
  {
    "id": "t-test-6",
    "category": "testing",
    "categoryLabel": "Testlash",
    "skillSlug": "feature-testing",
    "question": "Laravelda 'Http::fake()' qanday ishlaydi?",
    "options": [
      {
        "key": "A",
        "text": "Tashqi servis ishlamay qolganda so'rovni avtomatik qayta yuboradi (retry) va xatolik bo'lsa test o'tgan hisoblanadi"
      },
      {
        "key": "B",
        "text": "Tashqi servisga haqiqiy so'rov yuboradi, lekin javobni keshlab qo'yadi va keyingi testlarda shu keshlangan javobni qaytaradi"
      },
      {
        "key": "C",
        "text": "Tashqi servisga (Telegram, Stripe, SMS shlyuz) haqiqiy so'rov yubormasdan, oldindan belgilangan soxta JSON javobni qaytaradi"
      },
      {
        "key": "D",
        "text": "Faqat ichki (localhost) manzillarga so'rovlarni bloklaydi, tashqi servislarga esa so'rovlar odatdagidek yuboriladi"
      }
    ],
    "correct": "C",
    "explanation": "Http::fake() tashqi API larni test qilishda bebaho vositadir. U real tarmoq so'rovini to'xtatib, belgilangan status va body ni qaytaradi, shuningdek Http::assertSent() orqali so'rov to'g'ri jo'natilganini tekshiradi.",
    "level": "junior"
  },
  {
    "id": "t-arch-1",
    "category": "architecture",
    "categoryLabel": "Arxitektura",
    "skillSlug": "software-architecture",
    "question": "Domain-Driven Design (DDD) da 'Entity' va 'Value Object' o'rtasidagi asosiy farq nima?",
    "options": [
      {
        "key": "A",
        "text": "Entity o'zining noyob identifikatoriga (ID) ega bo'ladi va vaqt o'tishi bilan o'zgarishi mumkin; Value Object esa ID ga ega bo'lmaydi, faqat o'z qiymatlari bilan aniqlanadi va o'zgarmasdir (Immutable)"
      },
      {
        "key": "B",
        "text": "Entity faqat bazadagi jadval qatoriga mos keladi, Value Object esa faqat DTO sifatida API javoblarida ishlatiladi; ularning domen mantiqida farqi yo'q"
      },
      {
        "key": "C",
        "text": "Entity ID ga ega emas va faqat qiymatlari bilan aniqlanadi; Value Object esa noyob ID ga ega va vaqt o'tishi bilan o'zgarishi mumkin bo'lgan obyektdir, ya'ni amalda ularni ajratish shart emas"
      },
      {
        "key": "D",
        "text": "Ikkalasi ham noyob ID ga ega; farqi shundaki, Entity o'zgarmas (immutable), Value Object esa o'zgaruvchan va har bir o'zgarishda yangi ID oladi"
      }
    ],
    "correct": "A",
    "explanation": "User bu Entity (chunki uning ID si bor, ismi o'zgarsa ham u o'sha user). Money yoki Address esa Value Object (50 000 so'm har doim 50 000 so'm, uning alohida shaxsiyati yo'q, agar 10 000 qo'shilsa yangi ob'ekt hosil bo'ladi).",
    "level": "middle"
  },
  {
    "id": "t-arch-2",
    "category": "architecture",
    "categoryLabel": "Arxitektura",
    "skillSlug": "software-architecture",
    "question": "Mikroservislar arxitekturasida 'Transactional Outbox Pattern' nima muammoni hal qiladi?",
    "options": [
      {
        "key": "A",
        "text": "Xabarlarning navbatda tartibsiz kelishi muammosini hal qilib, har bir xabarning aynan bir martagina yetkazilishini (exactly-once) har doim kafolatlaydi"
      },
      {
        "key": "B",
        "text": "Bir nechta mikroservis bazasi o'rtasida ma'lumotlarni sinxron JOIN qilish va bitta so'rovda barcha servislardan ma'lumot olish muammosini hal qiladi"
      },
      {
        "key": "C",
        "text": "Servislar o'rtasidagi HTTP so'rovlar sekinlashganda ularni keshlab, ma'lumotlar bazasiga yuklamani kamaytirish muammosini hal qiladi"
      },
      {
        "key": "D",
        "text": "Ma'lumotlar bazasiga yozish va navbatga (Kafka/RabbitMQ) xabar yuborish o'rtasidagi 'Dual-Write' muammosini hal qilib, xabarlar yo'qolib ketmasligini 100% kafolatlaydi"
      }
    ],
    "correct": "D",
    "explanation": "Agar baza saqlanib, Kafka ga xabar ketmay qolsa ma'lumot uzilib qoladi. Outbox pattern da hodisa bitta DB tranzaksiyasida 'outbox' jadvaliga yoziladi, alohida servis esa uni o'qib Kafkaga ishonchli uzatadi.",
    "level": "senior"
  },
  {
    "id": "t-arch-3",
    "category": "architecture",
    "categoryLabel": "Arxitektura",
    "skillSlug": "software-architecture",
    "question": "Taqsimlangan tizimlarda 'Circuit Breaker' patterni qanday vazifani bajaradi?",
    "options": [
      {
        "key": "A",
        "text": "Tashqi xizmatga yuboriladigan so'rovlarni oldindan shifrlab, ular o'rtasida xavfsiz ulanish (TLS zanjiri) o'rnatadi va uzilishlarning oldini oladi"
      },
      {
        "key": "B",
        "text": "Kiruvchi so'rovlar sonini cheklab (rate limit), belgilangan chegaradan oshganda ortiqcha so'rovlarni navbatga qo'yadi va keyinroq ketma-ket bajaradi, shuning uchun u xizmat holatini tekshirmaydi"
      },
      {
        "key": "C",
        "text": "Sekinlashgan yoki qulagan tashqi xizmatga cheksiz so'rov yuborib butun tizimni osiltirib qo'ymaslik uchun, ma'lum xatolar sonidan keyin zanjirni vaqtincha uzib (Open state), zudlik bilan fallback javob qaytaradi"
      },
      {
        "key": "D",
        "text": "Muvaffaqiyatsiz so'rovni cheksiz qayta-qayta yuborib (retry), xizmat tiklanguncha kutadi va barcha foydalanuvchilarga bir xil javob qaytaradi"
      }
    ],
    "correct": "C",
    "explanation": "Circuit Breaker elektr avtomatiga o'xshaydi: agar to'lov servisi qotib qolsa, barcha so'rovlar unga ulanishni kutib osilib qolmasligi uchun zanjirni uzadi va darhol 'Xizmat vaqtincha band' deb tizimning qolgan qismini saqlab qoladi.",
    "level": "senior"
  },
  {
    "id": "t-arch-4",
    "category": "architecture",
    "categoryLabel": "Arxitektura",
    "skillSlug": "software-architecture",
    "question": "Taqsimlangan tranzaksiyalarda 'Saga Pattern' ning qaysi ikki asosiy turi mavjud?",
    "options": [
      {
        "key": "A",
        "text": "Synchronous va Asynchronous (sinxron va asinxron HTTP chaqiruvlari)"
      },
      {
        "key": "B",
        "text": "Choreography (Hodisalarga asoslangan, markazsiz) va Orchestration (Markaziy orkestrator boshqaruvida)"
      },
      {
        "key": "C",
        "text": "Optimistic va Pessimistic (versiyaga va qulfga asoslangan tranzaksiyalar)"
      },
      {
        "key": "D",
        "text": "Two-Phase va Three-Phase Commit (ikki va uch bosqichli tasdiqlash protokollari) (atomik tasdiqlash usullari)"
      }
    ],
    "correct": "B",
    "explanation": "Choreography da servislar hodisalarni (Events) tinglab zanjir bo'yicha bir-birini chaqiradi (oddiy tizimlar uchun). Orchestration da esa bitta markaziy boshqaruvchi (Orchestrator) har bir servisga buyruq beradi va xatolikda kompensatsiyani boshqaradi.",
    "level": "senior"
  },
  {
    "id": "t-arch-5",
    "category": "architecture",
    "categoryLabel": "Arxitektura",
    "skillSlug": "system-design",
    "question": "Taqsimlangan tizimlarda CAP teoremasiga ko'ra tarmoq uzilishi (Network Partition - P) yuz berganda qaysi ikki xususiyatdan birini tanlashga majburmiz?",
    "options": [
      {
        "key": "A",
        "text": "Consistency (Muvofiqlik) yoki Partition (Bo'linish)"
      },
      {
        "key": "B",
        "text": "Consistency (Muvofiqlik) yoki Availability (Mavjudlik)"
      },
      {
        "key": "C",
        "text": "Availability (Mavjudlik) yoki Performance (Tezlik)"
      },
      {
        "key": "D",
        "text": "Durability (Chidamlilik) yoki Isolation (Izolyatsiya)"
      }
    ],
    "correct": "B",
    "explanation": "Tarmoq uzilishi muqarrar bo'lgani sababli, tizim yoki CP (so'rovni rad etib bo'lsa ham qat'iy to'g'ri ma'lumot beradi) yoki AP (eski ma'lumot bo'lsa ham javob qaytarishda davom etadi) bo'lishi mumkin. Bir vaqtning o'zida ikkalasini 100% ta'minlab bo'lmaydi.",
    "level": "senior"
  },
  {
    "id": "t-arch-6",
    "category": "architecture",
    "categoryLabel": "Arxitektura",
    "skillSlug": "software-architecture",
    "question": "CQRS (Command Query Responsibility Segregation) arxitekturasining tub mohiyati nima?",
    "options": [
      {
        "key": "A",
        "text": "Barcha servislar uchun yagona ma'lumotlar bazasini ishlatib, har bir servisga faqat o'z jadvallariga yozish huquqini berish orqali ma'lumot yaxlitligini saqlash, hammasi bitta joyda"
      },
      {
        "key": "B",
        "text": "Ilovani frontend va backend qismlariga ajratib, ularni alohida repozitoriy va serverlarga joylash orqali jamoalar ishini mustaqil qilish"
      },
      {
        "key": "C",
        "text": "Bitta modelda ham yozish, ham o'qish amallarini birlashtirib, relyatsion baza va keshni umumiy bitta jadvalga yig'ish orqali kodni soddalashtirish"
      },
      {
        "key": "D",
        "text": "Ma'lumotlarni o'zgartiruvchi operatsiyalarni (Command - Create/Update/Delete) va ma'lumotlarni o'quvchi operatsiyalarni (Query - Read) butunlay alohida modellar va bazalarga ajratish"
      }
    ],
    "correct": "D",
    "explanation": "CQRS da yozish mantiqi murakkab biznes qoidalariga ega bo'lib relyatsion bazada (Postgres) bajariladi, o'qish esa hech qanday JOIN larsiz tayyor denormalizatsiyalangan ko'rinishda (Elasticsearch/Redis) tezkor qaytariladi.",
    "level": "senior"
  },
  {
    "id": "t-arch-7",
    "category": "architecture",
    "categoryLabel": "Arxitektura",
    "skillSlug": "software-architecture",
    "question": "SOLID tamoyillarida 'Liskov Substitution Principle' (LSP) nimani talab qiladi?",
    "options": [
      {
        "key": "A",
        "text": "Yuqori darajali modullar quyi darajali modullarga bog'liq bo'lmasligi kerak, ikkalasi ham abstraksiyaga bog'liq bo'lishi lozim"
      },
      {
        "key": "B",
        "text": "Sinf faqat bitta vazifani bajarishi va o'zgarish uchun bitta sababga ega bo'lishi kerak, aks holda uni bo'lish zarur"
      },
      {
        "key": "C",
        "text": "Ota sinf ob'ektini uning istalgan voris sinf ob'ekti bilan almashtirganda dasturning to'g'ri ishlashi buzilmasligi shart"
      },
      {
        "key": "D",
        "text": "Voris sinf ota sinfdan kamida bitta yangi public metod qo'shishi shart, aks holda meros olishning ma'nosi qolmaydi"
      }
    ],
    "correct": "C",
    "explanation": "LSP voris sinf ota sinfning kontraktini buzmasligini talab qiladi: ota sinf kutmagan yangi xatolar (exceptions) tashlamaslik, qaytarish tipini toraytirmaslik va mavjud metodlarni bo'sh qilib tashlamaslik shart.",
    "level": "junior"
  },
  {
    "id": "t-arch-8",
    "category": "architecture",
    "categoryLabel": "Arxitektura",
    "level": "senior",
    "question": "Dasturiy arxitekturada 'Event Sourcing' yondashuvining an'anaviy CRUD (State-based) saqlashdan asosiy farqi nima?",
    "options": [
      {
        "key": "A",
        "text": "Obyektning faqat joriy yakuniy holatini saqlash o'rniga, tizimda sodir bo'lgan har bir hodisani (Events) o'zgarmas (immutable) ketma-ketlik tariqasida saqlash va joriy holatni ularni qayta o'ynatish (replay) orqali tiklash"
      },
      {
        "key": "B",
        "text": "O'qish va yozish amallarini alohida modellar va bazalarga ajratib, o'qish uchun denormalizatsiyalangan nusxalarni yuritish, hodisalar esa umuman saqlanmaydi"
      },
      {
        "key": "C",
        "text": "Ma'lumotlar bazasidan voz kechib, barcha holatni faqat xotirada (in-memory) saqlash va ilova qayta ishga tushganda uni tashqi keshdan qayta yuklab olish"
      },
      {
        "key": "D",
        "text": "Obyektning joriy holatini har bir o'zgarishda bazadagi bitta qatorga qayta yozib, eski qiymatlarni zaxira jadvaliga ko'chirish va kerak bo'lsa ulardan foydalanish, hodisalar faqat auditga yoziladi, tiklash uchun emas"
      }
    ],
    "correct": "A",
    "explanation": "Event Sourcing da (masalan moliyaviy bank tizimlarida) faqat hisobdagi qoldiq saqlanmaydi, balki har bir depozit, pul o'tkazmasi alohida hodisa sifatida append-only jadvalga yoziladi. Bu orqali 100% audit tarixi va tizimni vaqt bo'yicha orqaga qaytarish (Time-travel debugging) imkoni vujudga keladi."
  },
  {
    "id": "t-dev-1",
    "category": "devops",
    "categoryLabel": "DevOps va Linux",
    "skillSlug": "docker",
    "question": "Docker da 'Multi-Stage Build' usuli production image hajmini qanday qilib 1GB dan 70MB gacha qisqartiradi?",
    "options": [
      {
        "key": "A",
        "text": "Image qatlamlarini avtomatik siqish (gzip) orqali kod va kutubxonalarni arxivga o'rab, konteyner ishga tushganda ularni xotirada ochish hisobiga hajmni kamaytiradi"
      },
      {
        "key": "B",
        "text": "Bir vaqtning o'zida bir nechta konteynerni parallel ishga tushirib, umumiy qatlamlarni ular o'rtasida ulashish orqali har bir image hajmini kichraytiradi"
      },
      {
        "key": "C",
        "text": "Faqat `.dockerignore` faylidagi fayllarni image dan chiqarib tashlaydi, bunda yig'ish va ishlash muhiti bir xil qoladi, shu sababli kompilyatorlar image ichida saqlanadi, natijada hajm deyarli o'zgarmaydi"
      },
      {
        "key": "D",
        "text": "Birinchi bosqichda barcha og'ir vositalar (Composer, Node.js, npm, gcc) yordamida loyiha yig'iladi, yakuniy yengil bosqichga (Alpine) esa faqat tayyor kod va vendor ko'chiriladi, barcha og'ir kompilyatorlar tashlab ketiladi"
      }
    ],
    "correct": "D",
    "explanation": "Multi-stage build yordamida yig'ish (build) muhiti va ishlab turish (runtime) muhiti ajratiladi. Node/Composer faqat 1-bosqichda ishlatilib, yakuniy production konteyneriga kirmaydi, natijada hajm minimal va xavfsiz bo'ladi.",
    "level": "senior"
  },
  {
    "id": "t-dev-2",
    "category": "devops",
    "categoryLabel": "DevOps va Linux",
    "skillSlug": "linux",
    "question": "Linux tizimida 'Graceful Shutdown' jarayonida PHP-FPM yoki Workerlarga dastlab qaysi signal yuboriladi?",
    "options": [
      {
        "key": "A",
        "text": "SIGSTOP (kill -19)"
      },
      {
        "key": "B",
        "text": "SIGHUP (kill -1)"
      },
      {
        "key": "C",
        "text": "SIGTERM (kill -15)"
      },
      {
        "key": "D",
        "text": "SIGKILL (kill -9)"
      }
    ],
    "correct": "C",
    "explanation": "Dastlab SIGTERM yuboriladi: jarayonga o'z ishini (joriy HTTP so'rov yoki navbatdagi vazifani) xavfsiz yakunlash uchun vaqt (masalan 30 soniya) beriladi. Agar belgilangan vaqtda to'xtamasa, majburiy SIGKILL yuboriladi.",
    "level": "junior"
  },
  {
    "id": "t-dev-3",
    "category": "devops",
    "categoryLabel": "DevOps va Linux",
    "skillSlug": "php-fpm",
    "question": "PHP-FPM da 'pm = static' va 'pm = dynamic' sozlamalari qachon qaysi biri tanlanadi?",
    "options": [
      {
        "key": "A",
        "text": "Katta yuklamali maxsus ajratilgan serverlarda (Dedicated Production) jarayonlarni qayta-qayta yaratish overhead ini yo'qotish uchun 'static', resurslari cheklangan serverlarda esa 'dynamic' tanlanadi"
      },
      {
        "key": "B",
        "text": "Tanlovda farq yo'q: 'static' va 'dynamic' bir xil ishlaydi, faqat `pm.max_children` qiymati static rejimda e'tiborga olinmaydi va avtomatik hisoblanadi"
      },
      {
        "key": "C",
        "text": "Katta yuklamali serverlarda jarayonlar soni yuklamaga qarab moslashishi uchun 'dynamic', resurslari cheklanganlarida esa xotira sarfini aniq belgilash uchun 'static' tanlanadi (qat'iy qoida)"
      },
      {
        "key": "D",
        "text": "'static' faqat CLI va cron vazifalari uchun, 'dynamic' esa faqat web so'rovlar uchun mo'ljallangan; ikkalasini bitta serverda birga ishlatib bo'lmaydi"
      }
    ],
    "correct": "A",
    "explanation": "pm = static server yonganda barcha child workerlarni darhol ochib qo'yadi. Bu yuklama sakraganda yangi fork() qilish kechikishini (CPU spike) yo'qotadi va eng barqaror unumdorlikni beradi.",
    "level": "senior"
  },
  {
    "id": "t-dev-4",
    "category": "devops",
    "categoryLabel": "DevOps va Linux",
    "skillSlug": "nginx",
    "question": "HTTP/2 va HTTP/3 protokollarining HTTP/1.1 dan eng katta ustunligi nimada?",
    "options": [
      {
        "key": "A",
        "text": "Server tomonda HTML sahifani to'liq render qilib, brauzerga tayyor holda yuborish (SSR), shu sababli JavaScript fayllarga ehtiyoj yo'qoladi"
      },
      {
        "key": "B",
        "text": "Bitta TCP/UDP ulanish orqali bir vaqtning o'zida yuzlab so'rovlarni parallel uzatish (Multiplexing) va Head-of-Line Blocking muammosini yo'qotish"
      },
      {
        "key": "C",
        "text": "Ma'lumotlarni avtomatik ravishda shifrlash, shu sababli HTTP/1.1 dagi barcha xavfsizlik zaifliklari bartaraf bo'ladi va HTTPS ga ehtiyoj qolmaydi"
      },
      {
        "key": "D",
        "text": "Har bir fayl uchun alohida TCP ulanish ochish orqali so'rovlarni to'liq mustaqil qilish, bu esa umumiy yuklanish tezligini oshiradi"
      }
    ],
    "correct": "B",
    "explanation": "HTTP/1.1 da har bir rasm yoki JS fayl uchun alohida TCP ulanish kerak edi. HTTP/2 bitta ulanish ichida barcha fayllarni bir vaqtda (Multiplexing) oqim sifatida o'tkazadi, HTTP/3 (QUIC) esa buni UDP ustida yanada tezlashtiradi.",
    "level": "senior"
  },
  {
    "id": "t-dev-5",
    "category": "devops",
    "categoryLabel": "DevOps va Linux",
    "skillSlug": "cloud-computing",
    "question": "Kubernetes da 'Liveness Probe' va 'Readiness Probe' vazifalari qanday farqlanadi?",
    "options": [
      {
        "key": "A",
        "text": "Liveness podning trafikni qabul qilishga tayyorligini tekshiradi (tayyor bo'lmasa trafik yo'naltirmaydi); Readiness esa pod tiriklini tekshiradi va qotib qolsa uni qayta ishga tushiradi (HTTP orqali tekshiriladi)"
      },
      {
        "key": "B",
        "text": "Ikkalasi ham bir xil vazifani bajaradi: pod ishlamay qolsa uni qayta ishga tushiradi; farqi faqat tekshiruv chastotasida (Liveness har 10s, Readiness har 30s)"
      },
      {
        "key": "C",
        "text": "Liveness konteyner xotirasi limitdan oshganini tekshiradi va uni o'chiradi; Readiness esa konteyner CPU yuklamasini o'lchab, podlar sonini avtomatik oshiradi"
      },
      {
        "key": "D",
        "text": "Liveness podning tirikligini tekshiradi (agar o'lib qolsa, qayta ishga tushiradi); Readiness esa pod yangi trafikni qabul qilishga tayyormi yoki yo'qligini tekshiradi (tayyor bo'lmasa unga trafik yo'naltirmaydi)"
      }
    ],
    "correct": "D",
    "explanation": "Readiness ilova migratsiyani tugatib keshni yuklaguncha unga foydalanuvchi so'rovlarini bermay kutib turadi. Liveness esa agar PHP worker qotib qolgan (Deadlock) bo'lsa, uni o'ldirib yangidan tiriltiradi.",
    "level": "senior"
  },
  {
    "id": "t-dev-6",
    "category": "devops",
    "categoryLabel": "DevOps va Linux",
    "skillSlug": "ci-cd",
    "question": "Deploy jarayonida 'Blue-Green Deployment' ning asosiy afzalligi nima?",
    "options": [
      {
        "key": "A",
        "text": "Yangi versiya foydalanuvchilarning kichik qismiga (masalan, 5%) bosqichma-bosqich chiqariladi va xatolik bo'lmasa, trafik ulushi asta-sekin oshirib boriladi (Canary) (bir qism eski versiyada qoladi)"
      },
      {
        "key": "B",
        "text": "Serverlar birin-ketin yangilanadi: har safar bitta server o'chirib yangi kod bilan qayta ishga tushiriladi, shu sababli har doim kam quvvat bilan ishlanadi (Rolling)"
      },
      {
        "key": "C",
        "text": "Yangi versiya alohida parallel muhitda (Green) to'liq tayyorlanadi va trafik bir soniyada unga o'tkaziladi; xatolik yuz bersa bir zumda orqaga (Blue ga) qaytish (Zero-Downtime Rollback) mumkin bo'ladi"
      },
      {
        "key": "D",
        "text": "Yangi versiya to'g'ridan-to'g'ri jonli serverga yuklanadi va eski kod o'chiriladi; xatolik bo'lsa, git orqali oldingi commit ga qaytariladi va qayta deploy qilinadi"
      }
    ],
    "correct": "C",
    "explanation": "Blue-Green da ikkita bir xil production muhiti bo'ladi: biri jonli trafikni qabul qiladi, ikkinchisiga yangi kod deploy qilinadi va test qilinadi. Router/Load Balancer orqali trafik darhol o'tkaziladi (Zero-downtime) va nosozlikda zumda qaytariladi.",
    "level": "senior"
  },
  {
    "id": "t-api-1",
    "category": "api",
    "categoryLabel": "REST API & Auth",
    "level": "junior",
    "question": "REST API arxitekturasida qaysi HTTP metodlari 'Idempotent' hisoblanadi (ya'ni bir necha bor bir xil chaqirilganda ham server holati birinchi chaqiruvdagi kabi qoladi)?",
    "options": [
      {
        "key": "A",
        "text": "POST, PATCH va DELETE"
      },
      {
        "key": "B",
        "text": "GET, PUT, DELETE, HEAD va OPTIONS"
      },
      {
        "key": "C",
        "text": "GET, POST, HEAD va PATCH"
      },
      {
        "key": "D",
        "text": "GET, POST va OPTIONS"
      }
    ],
    "correct": "B",
    "explanation": "RFC 7231 standartiga binoan GET, PUT, DELETE, HEAD va OPTIONS idempotent hisoblanadi: masalan, PUT /users/1 bilan resursni 10 marta yangilasangiz ham yakuniy holat bir xil bo'ladi. POST esa idempotent emas, chunki har chaqirilganda yangi resurs yaratadi."
  },
  {
    "id": "t-api-2",
    "category": "api",
    "categoryLabel": "REST API & Auth",
    "level": "junior",
    "question": "REST API da `401 Unauthorized` va `403 Forbidden` HTTP status kodlari o'rtasidagi asosiy farq nima?",
    "options": [
      {
        "key": "A",
        "text": "401 — mijoz kimligi noma'lum (autentifikatsiyadan o'tmagan); 403 — mijoz autentifikatsiyadan o'tgan, ammo ushbu resursga ruxsati (huquqi) yo'q"
      },
      {
        "key": "B",
        "text": "401 — server vaqtincha mavjud emas; 403 — so'rov formati noto'g'ri bo'lgani uchun server uni qayta ishlay olmaydi"
      },
      {
        "key": "C",
        "text": "Ikkalasi bir xil ma'noga ega; farqi faqat 401 brauzer uchun, 403 esa mobil ilovalar uchun qaytariladi"
      },
      {
        "key": "D",
        "text": "401 — mijoz autentifikatsiyadan o'tgan, ammo resursga ruxsati yo'q; 403 — mijoz kimligi noma'lum (autentifikatsiyadan o'tmagan)"
      }
    ],
    "correct": "A",
    "explanation": "401 Unauthorized aslida 'Unauthenticated' (kimligi tasdiqlanmagan yoki token yo'q/yaroqsiz) deganidir. 403 Forbidden esa server foydalanuvchini tanidi, lekin uning rollari yoki huquqlari (Policy/Gate) bu resursga kirishga ruxsat bermaydi."
  },
  {
    "id": "t-api-3",
    "category": "api",
    "categoryLabel": "REST API & Auth",
    "level": "middle",
    "question": "Stateless JWT (JSON Web Token) autentifikatsiyasida foydalanuvchi tizimdan chiqqanda (Logout) yoki parolini o'zgartirganda eski tokenni zudlik bilan bekor qilishning (Invalidate) eng to'g'ri amaliyoti qaysi?",
    "options": [
      {
        "key": "A",
        "text": "JWT ning `exp` (amal qilish muddati) qiymatini serverda o'zgartirib, eski tokenning ichidagi muddatni qisqartirish orqali uni bekor qilish"
      },
      {
        "key": "B",
        "text": "Tokenni mijoz tomonda localStorage dan o'chirish yetarli, chunki server uni boshqa tan olmaydi va token avtomatik yaroqsiz bo'lib qoladi"
      },
      {
        "key": "C",
        "text": "Tokenning 'jti' (JWT ID) identifikatorini qora ro'yxatga (Redis Blacklist) qolgan amal qilish muddatiga saqlash yoki foydalanuvchi jadvalida `token_version` ustunini oshirish"
      },
      {
        "key": "D",
        "text": "Parol o'zgartirilganda JWT dagi `sub` (subject) maydonini yangi qiymatga almashtirish; eski tokenlar boshqa foydalanuvchiga tegishli deb rad etiladi (token qayta imzolanmaydi)"
      }
    ],
    "correct": "C",
    "explanation": "JWT o'zida ma'lumot saqlagani uchun server uning holatini bilmaydi. Haqiqiy xavfsiz logout uchun Redisda qisqa muddatli qora ro'yxat (jti blacklist with TTL) yuritiladi yoki foydalanuvchining token_version raqami oshiriladi; token ichidagi versiya mos kelmasa rad etiladi."
  },
  {
    "id": "t-api-4",
    "category": "api",
    "categoryLabel": "REST API & Auth",
    "level": "senior",
    "question": "OAuth 2.0 da SPA (Single Page Application, masalan Vue/React) yoki Mobil ilovalar uchun nima sababdan 'Authorization Code with PKCE' (Proof Key for Code Exchange) oqimi talab etiladi?",
    "options": [
      {
        "key": "A",
        "text": "PKCE foydalanuvchi parolini ilova orqali to'g'ridan-to'g'ri serverga yuborishga imkon beradi (Password Grant), bu esa avtorizatsiya sahifasiga yo'naltirishdan qulayroq"
      },
      {
        "key": "B",
        "text": "Mijoz ilovalari 'client_secret' ni xavfsiz saqlay olmaydi (Public Client), PKCE esa dinamik `code_verifier` va `code_challenge` orqali kod o'g'irlanishining oldini oladi"
      },
      {
        "key": "C",
        "text": "Implicit grant ni almashtirish uchun: PKCE tokenni URL fragment orqali to'g'ridan-to'g'ri brauzerga qaytaradi, shu sabab kod almashinuvi bosqichi umuman talab qilinmaydi"
      },
      {
        "key": "D",
        "text": "SPA va mobil ilovalarda client_secret ni xavfsiz saqlash mumkin, PKCE esa faqat tokenning amal qilish muddatini uzaytirish uchun ishlatiladi"
      }
    ],
    "correct": "B",
    "explanation": "SPA va Mobile ilovalar ochiq kodli hisoblanadi va ularda client_secret saqlab bo'lmaydi. Ilgari ishlatilgan Implicit grant xavfli hisoblanib bekor qilingan (RFC 8252). PKCE mexanizmida har bir so'rovda bir martalik tasodifiy kalit yaratilib, authorization_code o'g'irlansa ham token olishga yo'l qo'ymaydi."
  },
  {
    "id": "t-api-5",
    "category": "api",
    "categoryLabel": "REST API & Auth",
    "level": "middle",
    "question": "Laravel da `Sanctum` va `Passport` paketlari o'rtasidagi asosiy me'moriy farq nima?",
    "options": [
      {
        "key": "A",
        "text": "Sanctum — yengil shaxsiy tokenlar (PAT) va SPA uchun cookie-based session auth beradi; Passport esa to'liq OAuth2 server (grantlar, scopes, client credentials) hisoblanadi"
      },
      {
        "key": "B",
        "text": "Sanctum faqat JWT tokenlar bilan, Passport esa faqat session cookie bilan ishlaydi; ikkalasi ham OAuth2 serveri vazifasini bajarmaydi"
      },
      {
        "key": "C",
        "text": "Sanctum — to'liq OAuth2 server (grantlar, scopes, client credentials); Passport esa faqat SPA uchun yengil cookie-based session auth beradi"
      },
      {
        "key": "D",
        "text": "Sanctum faqat Laravel ning eski (5.x) versiyalarida ishlaydi, Passport esa Laravel 8+ uchun yagona rasmiy autentifikatsiya paketi hisoblanadi, farq faqat nomida"
      }
    ],
    "correct": "A",
    "explanation": "Laravel Sanctum ko'p hollarda (mobil ilovalar va birinchi tomon SPA lari uchun) yetarli bo'lgan yengil yechimdir (Personal Access Token va CSRF himoyalangan Cookie auth). Passport esa uchinchi tomon dasturchilariga to'liq OAuth2 API taqdim etish zarur bo'lganda qo'llaniladi."
  },
  {
    "id": "t-api-6",
    "category": "api",
    "categoryLabel": "REST API & Auth",
    "level": "middle",
    "question": "REST API da `Idempotency-Key` (Idempotentlik kaliti) sarlavhasi (header) qanday muammoni hal qiladi?",
    "options": [
      {
        "key": "A",
        "text": "Server javoblarini mijoz brauzerida keshlab, bir xil GET so'rovlar takrorlanganda server yuklamasini kamaytiradi"
      },
      {
        "key": "B",
        "text": "Tarmoq uzilishlari tufayli takroriy (retry) yuborilgan to'lov yoki buyurtma so'rovlarida mablag' ikki marta yechilishi yoki dublikat yozuvlar yaratilishining oldini oladi"
      },
      {
        "key": "C",
        "text": "So'rov va javob ma'lumotlarini shifrlab, uzatish paytida uchinchi tomon ularni ushlab olib o'qishining oldini oladi"
      },
      {
        "key": "D",
        "text": "Mijoz so'rovlarini bitta IP manzildan sekundiga chegaralangan sonda yuborishga majbur qiladi, shu sabab DDoS hujumlarining oldi olinadi, va so'rovlarni logga ham yozadi"
      }
    ],
    "correct": "B",
    "explanation": "Stripe va boshqa to'lov tizimlarida keng qo'llaniladigan Idempotency-Key mijoz tomonidan UUID tarzida yuboriladi. Server ushbu kalit bo'yicha birinchi natijani keshga saqlaydi va agar tarmoq uzilib so'rov qayta yuborilsa, operatsiyani qayta bajarmasdan keshdagi natijani qaytaradi."
  },
  {
    "id": "t-api-7",
    "category": "api",
    "categoryLabel": "REST API & Auth",
    "level": "senior",
    "question": "Brauzerda CORS (Cross-Origin Resource Sharing) bo'yicha 'Preflight' (OPTIONS) so'rovi qachon avtomatik yuboriladi?",
    "options": [
      {
        "key": "A",
        "text": "Faqat server javobida `Access-Control-Allow-Origin: *` bo'lmasa va cookie yuborilmayotgan bo'lsa, so'rov bloklanishidan oldin yuboriladi, bu esa faqat bir marta yuboriladi"
      },
      {
        "key": "B",
        "text": "So'rov 'Simple Request' talablariga mos kelmasa (masalan, `Content-Type: application/json`, maxsus Authorization headeri yoki PUT/DELETE/PATCH metodlari ishlatilganda)"
      },
      {
        "key": "C",
        "text": "Faqat so'rov HTTP (shifrlanmagan) protokolida yuborilganda, HTTPS ga o'tish xavfsiz ekanini tekshirish uchun yuboriladi"
      },
      {
        "key": "D",
        "text": "Har bir cross-origin so'rovdan oldin, hatto oddiy GET so'rov bo'lsa ham, brauzer OPTIONS so'rovini majburiy yuboradi"
      }
    ],
    "correct": "B",
    "explanation": "Brauzer xavfsizlik maqsadida notanish cross-origin manzilga nooddiy so'rov (JSON body, Authorization header yoki PUT/DELETE) yuborishdan oldin OPTIONS metodi bilan preflight so'rovi yuboradi va serverning Access-Control-Allow-* sarlavhalarini tekshiradi."
  },
  {
    "id": "t-api-8",
    "category": "api",
    "categoryLabel": "REST API & Auth",
    "level": "middle",
    "question": "API Rate Limiting da `429 Too Many Requests` javobida qaysi HTTP sarlavhalari (headers) mijozga qachon qayta urinish mumkinligini ma'lum qiladi?",
    "options": [
      {
        "key": "A",
        "text": "`Content-Length`, `Cache-Control` va `ETag` (keshlash sarlavhalari)"
      },
      {
        "key": "B",
        "text": "`Wait-Until`, `X-Timeout` va `Expires`"
      },
      {
        "key": "C",
        "text": "`Allow`, `Accept` va `X-Request-Id`"
      },
      {
        "key": "D",
        "text": "`Retry-After`, `X-RateLimit-Limit` va `X-RateLimit-Remaining`"
      }
    ],
    "correct": "D",
    "explanation": "Rate limiting qoidasi buzilganda server 429 status kodi bilan birga Retry-After (soniyalarda qancha kutish kerakligi), X-RateLimit-Limit (jami ruxsat etilgan limit) va X-RateLimit-Remaining (qolgan urinishlar soni) sarlavhalarini qaytarishi standart hisoblanadi."
  },
  {
    "id": "t-api-9",
    "category": "api",
    "categoryLabel": "REST API & Auth",
    "level": "senior",
    "question": "REST API versiyalashda (API Versioning) 'Header-based (Accept header) versioning' ning 'URI versioning (/api/v1)' ga nisbatan asosiy me'moriy afzalligi nima?",
    "options": [
      {
        "key": "A",
        "text": "Mijozlar har bir versiya uchun alohida domen ishlatishi shart emas, shuning uchun SSL sertifikat xarajati kamayadi"
      },
      {
        "key": "B",
        "text": "Resurs identifikatori (URI) o'zgarmas qoladi va haqiqiy REST tamoyiliga (Content Negotiation) mos keladi"
      },
      {
        "key": "C",
        "text": "So'rovlar tezroq ishlaydi, chunki marshrutizator versiyani URL dan o'qimaydi va header tahlili ancha yengil operatsiya"
      },
      {
        "key": "D",
        "text": "Versiya URI da ko'rinadi, shu sabab brauzerda tekshirish va keshlash osonlashadi hamda hujjatlashtirish soddalashadi"
      }
    ],
    "correct": "B",
    "explanation": "Sof REST nazariyasiga ko'ra URI resursning yagona manzilidir (/users/1). Versiya esa resursning taqdimot shaklidir (representation). Header versiyalashda (Accept: application/vnd.company.v2+json) URI ifloslanmaydi, ammo amaliyotda URI versioning (/api/v1/) keshlar va tushunarlilik uchun ko'proq ommalashgan."
  },
  {
    "id": "t-api-10",
    "category": "api",
    "categoryLabel": "REST API & Auth",
    "level": "junior",
    "question": "REST API da `PUT` va `PATCH` metodlari o'rtasidagi asosiy farq nima?",
    "options": [
      {
        "key": "A",
        "text": "`PUT` yangi resurs yaratish uchun, `PATCH` esa mavjud resursni o'chirib, o'rniga yangisini yaratish uchun ishlatiladi"
      },
      {
        "key": "B",
        "text": "`PUT` resursning faqat ma'lum maydonlarini qisman yangilaydi; `PATCH` esa resursni butunlay to'liq almashtirish uchun ishlatiladi va butun obyektni talab qiladi"
      },
      {
        "key": "C",
        "text": "Ikkalasi bir xil ishlaydi; farqi faqat `PATCH` idempotent emasligida, `PUT` esa har doim xavfsiz (safe) metod hisoblanadi"
      },
      {
        "key": "D",
        "text": "`PUT` resursni butunlay to'liq almashtirish (full replacement) uchun; `PATCH` esa resursning faqat ma'lum maydonlarini qisman yangilash (partial update) uchun ishlatiladi"
      }
    ],
    "correct": "D",
    "explanation": "RFC 5789 ga binoan: PUT chaqirilganda resursning barcha maydonlari yuborilishi kerak (yuborilmagan maydonlar odatda null bo'ladi). PATCH esa faqat o'zgargan maydonlarni (masalan faqat { 'status': 'active' }) yuborish orqali qisman yangilash uchun mo'ljallangan."
  },
  {
    "id": "t-queue-1",
    "category": "queue",
    "categoryLabel": "Navbatlar (Queue)",
    "level": "junior",
    "question": "Laravel da Job klassi asinxron tarzda navbatga (Queue) tushishi uchun qaysi interfeysni implement qilishi shart?",
    "options": [
      {
        "key": "A",
        "text": "`ShouldBroadcast`"
      },
      {
        "key": "B",
        "text": "`ShouldQueue`"
      },
      {
        "key": "C",
        "text": "`ShouldDispatch`"
      },
      {
        "key": "D",
        "text": "`Queueable`"
      }
    ],
    "correct": "B",
    "explanation": "Laravel da agar Job klassi ShouldQueue interfeysini implement qilsa, dispatch() chaqirilganda u darhol sinxron bajarilmasdan, sozlangan navbat drayveriga (Redis, Database va h.k.) asinxron bajarilish uchun yuboriladi."
  },
  {
    "id": "t-queue-2",
    "category": "queue",
    "categoryLabel": "Navbatlar (Queue)",
    "level": "middle",
    "question": "Laravel da `php artisan queue:work` va `php artisan queue:listen` buyruqlari o'rtasidagi asosiy farq nimada?",
    "options": [
      {
        "key": "A",
        "text": "`queue:work` butun freymvorkni xotiraga 1 marta yuklaydi (daemon) va yuqori unumdorlik beradi; `queue:listen` esa har bir job uchun freymvorkni qaytadan yuklaydi (local dev uchun qulay)"
      },
      {
        "key": "B",
        "text": "`queue:work` faqat Redis drayverida ishlaydi, `queue:listen` esa database va SQS drayverlari uchun; ular freymvorkni yuklash usulida farq qilmaydi"
      },
      {
        "key": "C",
        "text": "`queue:listen` butun freymvorkni xotiraga 1 marta yuklaydi (daemon) va yuqori unumdorlik beradi; `queue:work` esa har bir job uchun freymvorkni qaytadan yuklaydi, deploy uchun qulay"
      },
      {
        "key": "D",
        "text": "`queue:work` faqat bitta jobni bajarib to'xtaydi, `queue:listen` esa navbatni doimiy tinglaydi, lekin ikkalasi ham kod o'zgarishini avtomatik ko'radi"
      }
    ],
    "correct": "A",
    "explanation": "Production muhitda faqat queue:work (Supervisor nazorati ostida) ishlatiladi, chunki u freymvorkni doimiy xotirada saqlab juda tez ishlaydi (deploy paytida queue:restart kerak). queue:listen esa har bir jobda freymvorkni qaytadan yuklagani uchun sekinroq, lekin kod o'zgarishlarini darhol ko'radi."
  },
  {
    "id": "t-queue-3",
    "category": "queue",
    "categoryLabel": "Navbatlar (Queue)",
    "level": "senior",
    "question": "Laravel Queue da `timeout` (vazifaning maksimal bajarilish vaqti) va `retry_after` (qayta urinish oralig'i) konfiguratsiyasida qaysi nozik xato jobning ikki marta bajarilishiga (duplicate execution) olib keladi?",
    "options": [
      {
        "key": "A",
        "text": "Agar `retry_after` vaqti `timeout` dan kichik yoki unga teng bo'lsa (masalan timeout=90, retry_after=60), birinchi worker hali jobni tugatmasdan, ikkinchi worker uni qayta olib bajarishga tushadi"
      },
      {
        "key": "B",
        "text": "Agar `timeout` ni `0` qilib qo'ysak, worker jobni to'xtatmaydi va retry_after hech qachon ishlamaydi, shu sababli job ikki marta bajariladi"
      },
      {
        "key": "C",
        "text": "Agar `retry_after` vaqti `timeout` dan ancha katta bo'lsa (masalan timeout=60, retry_after=300), job qayta urinishgacha uzoq kutadi va ikkinchi marta bajarilib ketadi, shu sabab job takrorlanadi"
      },
      {
        "key": "D",
        "text": "Agar `timeout` va `retry_after` ham queue drayveriga, ham har bir job klassiga alohida berilsa, ular bir-birini bekor qiladi va job ikki marta bajariladi"
      }
    ],
    "correct": "A",
    "explanation": "Bu juda xavfli production xatosi! retry_after queue drayveri (masalan Redis) jobni boshqa workerga bermay turish vaqtidir. Agar job 80 soniya davom etsa, ammo retry_after=60 bo'lsa, navbat tizimi jobni 'tashlab ketilgan' deb hisoblab ikkinchi workerga beradi va natijada pul ikki marta yechilishi yoki xat ikki marta ketishi mumkin. retry_after doimo timeoutdan sezilarli katta bo'lishi shart!"
  },
  {
    "id": "t-queue-4",
    "category": "queue",
    "categoryLabel": "Navbatlar (Queue)",
    "level": "middle",
    "question": "Navbatdagi vazifalarda (Queues) 'Idempotent Job' tushunchasi nimani anglatadi va nega u muhim?",
    "options": [
      {
        "key": "A",
        "text": "Job faqat bir marta, ya'ni birinchi urinishdayoq muvaffaqiyatli bajarilishi kafolatlanishi va qayta urinishlar umuman bo'lmasligi va xatolik kuzatilmaydi"
      },
      {
        "key": "B",
        "text": "Job juda tez, 1 soniyadan kam vaqtda bajarilishi va shu sabab navbatda hech qachon kutib qolmasligi"
      },
      {
        "key": "C",
        "text": "Tarmoq yoki server uzilishlari sababli bir xil job bir necha marta qayta bajarilsa ham, yakuniy tizim holati faqat bir marta bajarilgandek to'g'ri qolishi"
      },
      {
        "key": "D",
        "text": "Job bir vaqtning o'zida bir nechta workerda parallel bajarilib, natijalar avtomatik ravishda birlashtirilishi"
      }
    ],
    "correct": "C",
    "explanation": "Taqsimlangan tizimlarda 'At-least-once delivery' (kamida bir marta yetkazish) kafolati bo'ladi. Agar worker vazifani bajarib, natijani bazaga yozgach Redisga 'ACK' yuborishdan oldin o'chib qolsa, job qayta ishga tushadi. Idempotentlik (masalan order_id bo'yicha tekshirib keyin to'lov qilish) orqali ikki marta yozilishning oldi olinadi."
  },
  {
    "id": "t-queue-5",
    "category": "queue",
    "categoryLabel": "Navbatlar (Queue)",
    "level": "senior",
    "question": "Laravel da `ShouldBeUnique` interfeysi ishlatilganda bir vaqtning o'zida bir xil jobning bir nechta nusxasi navbatga tushishining oldi qanday olinadi?",
    "options": [
      {
        "key": "A",
        "text": "Job klassi `final` deb belgilanadi va Laravel har bir nusxa uchun alohida navbat yaratib, nusxalarni bir-biridan izolyatsiya qiladi"
      },
      {
        "key": "B",
        "text": "Navbatga tushgan jobning nusxalari worker tomonidan olinganda xotirada solishtiriladi va faqat birinchisi bajariladi, qolganlari jimgina tashlanadi"
      },
      {
        "key": "C",
        "text": "Kesh drayveri (odatda Redis Lock) orqali `uniqueId()` bo'yicha lock olinadi va job muvaffaqiyatli tugaguncha (yoki timeoutgacha) dublikatlar bloklanadi"
      },
      {
        "key": "D",
        "text": "Job navbatga tushishidan oldin `jobs` jadvalida bir xil ID li yozuv bor-yo'qligi `SELECT` bilan tekshiriladi va topilsa job o'chiriladi"
      }
    ],
    "correct": "C",
    "explanation": "ShouldBeUnique interfeysi klassning uniqueId() metodi qaytargan kalit bo'yicha keshdan atomik qulf (atomic lock) oladi. Job navbatda turganida yoki bajarilayotgan paytda xuddi shu parametrlar bilan boshqa dispatch() chaqirilsa, u shunchaki e'tiborga olinmaydi."
  },
  {
    "id": "t-queue-6",
    "category": "queue",
    "categoryLabel": "Navbatlar (Queue)",
    "level": "middle",
    "question": "Laravel da bir nechta mustaqil Job larni parallel yuborib, ularning barchasi tugagach umumiy natijani kutish uchun qaysi mexanizm ishlatiladi?",
    "options": [
      {
        "key": "A",
        "text": "`Queue::bulk([...])` (Bulk Dispatch)"
      },
      {
        "key": "B",
        "text": "`Bus::chain([...])` (Job Chaining)"
      },
      {
        "key": "C",
        "text": "`dispatchSync()` (Sinxron bajarish)"
      },
      {
        "key": "D",
        "text": "`Bus::batch([...])` (Job Batching)"
      }
    ],
    "correct": "D",
    "explanation": "Bus::batch() yordamida yuzlab joblar parallel ishga tushiriladi va ->then(callback), ->catch(callback), ->finally(callback) orqali barchasi tugagandagi hodisalar nazorat qilinadi. Bus::chain() esa teskarisi — joblarni qat'iy ketma-ket (biri tugasa keyingisi) bajarish uchundir."
  },
  {
    "id": "t-queue-7",
    "category": "queue",
    "categoryLabel": "Navbatlar (Queue)",
    "level": "junior",
    "question": "Laravel da `dispatchAfterResponse($job)` metodi oddiy `dispatch($job)` dan nimasi bilan farq qiladi?",
    "options": [
      {
        "key": "A",
        "text": "Vazifani navbat drayveriga (Redis/DB) jo'natmasdan, HTTP javob mijozga (brauzerga) yuborilib ulanish uzilgach, shu jarayonning o'zida darhol bajaradi"
      },
      {
        "key": "B",
        "text": "Vazifani faqat tranzaksiya commit bo'lgandan keyin navbatga yuboradi; oddiy `dispatch()` esa tranzaksiyadan oldin yuboradi"
      },
      {
        "key": "C",
        "text": "Vazifani navbatga qo'yadi, lekin faqat HTTP javob mijozga yuborilgach worker uni oladi; oddiy `dispatch()` esa vazifani darhol workerga uzatadi"
      },
      {
        "key": "D",
        "text": "Vazifani navbat drayveriga yuboradi, lekin HTTP javob yuborilishini job tugagunga qadar kechiktiradi, shuning uchun foydalanuvchi javobni kutadi"
      }
    ],
    "correct": "A",
    "explanation": "dispatchAfterResponse() fastcgi_finish_request() imkoniyatidan foydalanadi: foydalanuvchi HTTP javobni darhol oladi va sahifa yuklanishi kutmaydi, ammo job alohida queue worker talab qilmasdan joriy PHP-FPM jarayoni yopilishidan oldin darhol bajariladi."
  },
  {
    "id": "t-queue-8",
    "category": "queue",
    "categoryLabel": "Navbatlar (Queue)",
    "level": "senior",
    "question": "Queue workerlar xotira sizishi (Memory Leak) sababli vaqt o'tishi bilan server RAM xotirasini to'ldirib qo'ymasligi uchun qaysi parametrlar ishlatiladi?",
    "options": [
      {
        "key": "A",
        "text": "`--max-jobs=1000` yoki `--max-time=3600` yoki `--memory=128` (worker ma'lum hajmga yoki vaqtga yetgach o'zini o'zi to'xtatadi va Supervisor uni toza xotira bilan qayta ko'taradi)"
      },
      {
        "key": "B",
        "text": "`--sleep=0` va `--rest=0` (worker navbat bo'sh bo'lganda ham kutmasdan to'xtovsiz ishlab, xotirani doimiy yangilab turadi)"
      },
      {
        "key": "C",
        "text": "`--timeout=0` va `--tries=0` (worker vaqt va urinishlar bo'yicha cheklovsiz ishlaydi va hech qachon qayta ishga tushmaydi), xotira sizishi to'xtaydi va restart shart bo'lmaydi"
      },
      {
        "key": "D",
        "text": "`--force` va `--daemon` (worker maintenance rejimida ham ishlab, xotirani avtomatik tozalaydigan daemon holatiga o'tadi)"
      }
    ],
    "correct": "A",
    "explanation": "PHP uzoq vaqt yashovchi daemon jarayonlar uchun yaratilmagan, static xususiyatlar yoki xotira to'planishi tabiiy. Shuning uchun php artisan queue:work --max-jobs=1000 --memory=128 beriladi. Worker belgilangan chegaraga yetgach xavfsiz tugaydi va Supervisor darhol yangi, toza xotirali worker ishga tushiradi."
  },
  {
    "id": "t-queue-9",
    "category": "queue",
    "categoryLabel": "Navbatlar (Queue)",
    "level": "middle",
    "question": "Laravel da Job klassi ichida `public $backoff = [30, 60, 120];` ko'rsatilishi nimani anglatadi?",
    "options": [
      {
        "key": "A",
        "text": "Agar job xatolik bilan yiqilsa, 1-qayta urinish 30 soniyadan so'ng, 2-qayta urinish 60 soniyadan so'ng, 3-qayta urinish 120 soniyadan so'ng amalga oshiriladi (Exponential Backoff)"
      },
      {
        "key": "B",
        "text": "Job navbatga tushgandan so'ng 30 soniya kutib birinchi marta, 60 soniyada ikkinchi marta, 120 soniyada uchinchi marta bajariladi (Delayed Dispatch), xato bo'lmasa ham kechikadi"
      },
      {
        "key": "C",
        "text": "Job faqat 3 marta urinadi: urinishlar orasidagi vaqt har safar tasodifiy (30 dan 120 soniyagacha) tanlanadi (Jitter)"
      },
      {
        "key": "D",
        "text": "Job muvaffaqiyatli bajarilgach, 30, 60 va 120 soniyadan so'ng uning natijasi qayta tekshirilib, bajarilishi tasdiqlanadi (Verification Retry)"
      }
    ],
    "correct": "A",
    "explanation": "Exponential Backoff strategiyasi tashqi servislar (masalan to'lov gateway yoki SMS provayder) vaqtincha ishlamay qolganda serverni ketma-ket so'rovlar bilan qiynamaslik uchun tobora uzoqroq oraliq bilan qayta urinish imkonini beradi."
  },
  {
    "id": "t-queue-10",
    "category": "queue",
    "categoryLabel": "Navbatlar (Queue)",
    "level": "senior",
    "question": "Taqsimlangan navbat tizimlarida 'Dead Letter Queue' (DLQ) nima uchun zarur?",
    "options": [
      {
        "key": "A",
        "text": "Navbat uzunligi belgilangan chegaradan oshganda yangi xabarlarni vaqtincha ushlab turib, keyinroq asosiy navbatga qaytarish va yuklamani tekislash uchun"
      },
      {
        "key": "B",
        "text": "Navbatdagi barcha xabarlarning zaxira nusxasini boshqa serverda saqlab, asosiy navbat o'chib qolsa ularni tiklash va yo'qotishlarning oldini olish uchun, shu bilan navbat hech qachon to'lmaydi"
      },
      {
        "key": "C",
        "text": "Barcha qayta urinishlardan (max retries) keyin ham yiqilgan yoki 'zaharli' (poison pill) xabarlarni asosiy navbatdan ajratib olib, tizimni to'xtatib qo'ymaslik va muammoni alohida tahlil qilish uchun"
      },
      {
        "key": "D",
        "text": "Xabarlarni muvaffaqiyatli bajarilgach arxivlab, audit uchun saqlash va hisobotlar tayyorlashga imkon berish uchun, qayta urinishlar bilan bog'liq emas"
      }
    ],
    "correct": "C",
    "explanation": "Agar biror xabarda sintaktik xato yoki noadekvat parametr bo'lsa (Poison Pill), u workerlarni ketma-ket yiqitaveradi va asosiy navbat tiqilib qoladi (head-of-line blocking). DLQ bunday xabarlarni alohida 'qabriston' navbatiga ko'chirib, dasturchiga alert beradi va asosiy tizim faoliyatini davom ettiradi."
  },
  {
    "id": "t-lar-9",
    "category": "laravel",
    "categoryLabel": "Laravel Core",
    "level": "senior",
    "question": "Laravel Service Container da 'Contextual Binding' nima uchun ishlatiladi?",
    "options": [
      {
        "key": "A",
        "text": "Service Provider ning `boot()` metodida bog'lanmagan klasslarni avtomatik topib, ularni konteynerga o'zi qo'shish uchun"
      },
      {
        "key": "B",
        "text": "Bir xil klassning bir nechta nusxasini (Singleton emas) avtomatik yaratib, har bir so'rov uchun alohida nusxa berish uchun"
      },
      {
        "key": "C",
        "text": "Bitta interfeysga turli klasslar (controller/service) murojaat qilganda, har biriga alohida boshqa-boshqa implementatsiyalarni inyekt qilish uchun"
      },
      {
        "key": "D",
        "text": "Interfeysni konteynerga bir marta, global tarzda bog'lab, undan keyin barcha klasslarga bir xil implementatsiyani berish uchun (barcha joyda bir xil)"
      }
    ],
    "correct": "C",
    "explanation": "Contextual Binding `$this->app->when(PhotoController::class)->needs(Filesystem::class)->give(fn() => Storage::disk('local'));` ko'rinishida yoziladi. Bu orqali bitta Filesystem interfeysini PhotoController ga 'local' disk, VideoController ga esa 's3' disk shaklida moslashuvchan berish mumkin."
  },
  {
    "id": "t-lar-10",
    "category": "laravel",
    "categoryLabel": "Laravel Core",
    "level": "senior",
    "question": "Laravel da `Facade` larning ichki ishlash mexanizmi bo'yicha qaysi ta'rif to'liq to'g'ri?",
    "options": [
      {
        "key": "A",
        "text": "Fasadlar `__construct()` da barcha statik metodlarni haqiqiy statik funksiyalar sifatida e'lon qiladi, shuning uchun ular konteynerdan obyekt olmaydi, ya'ni konteynerdan foydalanilmaydi"
      },
      {
        "key": "B",
        "text": "Fasad klassi `getFacadeAccessor()` orqali har safar yangi obyekt yaratadi (`new`) va uning statik metodlarini faqat compile vaqtida bog'laydi"
      },
      {
        "key": "C",
        "text": "Fasadlar `__callStatic()` sehrli metodi orqali `getFacadeAccessor()` qaytargan kalit bo'yicha Service Container dan obyektni resolve qiladi va unga dinamik metod chaqiruvini yo'naltiradi"
      },
      {
        "key": "D",
        "text": "Fasadlar PHP ning `__get()` sehrli metodi orqali xususiyatlarni konteynerdan oladi va metodlarni `Reflection` yordamida kompilyatsiya qiladi"
      }
    ],
    "correct": "C",
    "explanation": "Laravel Facade lari statik interfeys orqali Service Container dagi dinamik xizmatlarga ulanish beradi (Static Proxy). Asosiy klass getFacadeAccessor() yordamida container kalitini (masalan 'cache') qaytaradi va Facade::__callStatic() uni container orqali chaqiradi. Shu sababli Cache::shouldReceive() orqali fasadlarni oson mock qilish mumkin."
  },
  {
    "id": "t-lar-11",
    "category": "laravel",
    "categoryLabel": "Laravel Core",
    "level": "middle",
    "question": "Laravel da `Macroable` trait qanday imkoniyat beradi?",
    "options": [
      {
        "key": "A",
        "text": "Laravelning ichki klasslariga (masalan `Response`, `Collection`, `Str`, `Request`) o'z xususiy metodlarimizni runtime paytida qo'shish (kengaytirish) imkonini beradi"
      },
      {
        "key": "B",
        "text": "Klassning private va protected metodlariga tashqaridan kirishga ruxsat berib, ularni testlarda to'g'ridan-to'g'ri chaqirish imkonini beradi, testlarni osonlashtiradi"
      },
      {
        "key": "C",
        "text": "Metodlarni avtomatik ravishda keshlab, bir xil argumentlar bilan chaqirilganda natijani qayta hisoblamasdan qaytaradi (memoization)"
      },
      {
        "key": "D",
        "text": "Eloquent modellarga relatsiyalarni avtomatik ravishda aniqlab, ularni migratsiya va jadval strukturasidan o'zi yaratadi"
      }
    ],
    "correct": "A",
    "explanation": "Macroable trait orqali Response::macro('caps', fn($str) => Response::make(strtoupper($str))) kabi o'z metodlaringizni freymvork yadrosini o'zgartirmasdan turib ServiceProvider ichida kiritishingiz mumkin."
  },
  {
    "id": "t-lar-12",
    "category": "laravel",
    "categoryLabel": "Laravel Core",
    "level": "senior",
    "question": "Laravel da `Terminable Middleware` ning `terminate($request, $response)` metodi qachon va qanday sharoitda bajariladi?",
    "options": [
      {
        "key": "A",
        "text": "So'rov kelgan zahoti, boshqa middleware lardan oldin, so'rovni tekshirish uchun bajariladi va Controller ishga tushishini kutmaydi"
      },
      {
        "key": "B",
        "text": "Faqat middleware ichida xatolik (exception) tashlansa ishga tushadi va xatolik haqida log yozish uchun mo'ljallangan"
      },
      {
        "key": "C",
        "text": "Middleware ning `handle()` metodi tugagach, lekin javob brauzerga yuborilishidan oldin, har doim sinxron bajariladi va javobni kechiktiradi"
      },
      {
        "key": "D",
        "text": "HTTP javob brauzerga (mijozga) to'liq yetkazib berilib, ulanish yopilgandan so'ng, fon rejimida og'ir loglash yoki statistikani saqlash uchun bajariladi"
      }
    ],
    "correct": "D",
    "explanation": "Agar Middleware ichida public function terminate($request, $response) e'lon qilinsa, FastCGI finish_request() orqali brauzerga javob yetkazilgach, foydalanuvchini kuttirmasdan og'ir amallar (audit log, analytics) xavfsiz bajariladi."
  },
  {
    "id": "t-lar-13",
    "category": "laravel",
    "categoryLabel": "Laravel Core",
    "level": "junior",
    "question": "Production serverda `php artisan config:cache` bajarilgach, kod ichida `env('SOME_KEY')` funksiyasini to'g'ridan-to'g'ri chaqirish nima uchun `null` qaytaradi?",
    "options": [
      {
        "key": "A",
        "text": "`config:cache` bajarilgach, `env()` faqat `.env.example` faylidan o'qiydi, shuning uchun haqiqiy `.env` qiymatlari doim `null` qaytaradi"
      },
      {
        "key": "B",
        "text": "`env()` funksiyasi `config:cache` dan keyin o'chirib tashlanadi (deprecated) va uning o'rniga faqat `getenv()` ishlatilishi kerak"
      },
      {
        "key": "C",
        "text": "`config:cache` bajarilgach, performance uchun .env fayli o'qilmaydi va barcha qiymatlar faqat `config('app.some_key')` orqali olinishi shart"
      },
      {
        "key": "D",
        "text": "`config:cache` bajarilganda `.env` fayli shifrlanadi va `env()` uni faqat `APP_KEY` berilgan holdagina deshifrlab o'qiy oladi"
      }
    ],
    "correct": "C",
    "explanation": "Bu eng keng tarqalgan junior/middle xatolaridan biridir! config:cache buyrug'i barcha konfiguratsiyalarni bitta yagona PHP faylga to'playdi va .env faylini yuklashni to'xtatadi. Natijada config/ papkasidan tashqarida chaqirilgan barcha env() funksiyalari null qaytaradi."
  },
  {
    "id": "t-lar-14",
    "category": "laravel",
    "categoryLabel": "Laravel Core",
    "level": "middle",
    "question": "Laravel da `Cache::tags(['users', 'reports'])->flush()` metodining asosiy afzalligi va cheklovi nima?",
    "options": [
      {
        "key": "A",
        "text": "Teglar kesh yozuvlarining amal qilish muddatini avtomatik uzaytiradi, lekin cheklovi shuki, bitta kalitga faqat bitta teg biriktirish mumkin"
      },
      {
        "key": "B",
        "text": "Teglar orqali bir-biriga bog'liq kesh yozuvlarini guruhlab tozalash mumkin, ammo bu xususiyat `file` va `database` drayverlarida ishlamaydi (faqat Redis, Memcached va h.k. da ishlaydi)"
      },
      {
        "key": "C",
        "text": "Teglar orqali kesh yozuvlarini guruhlab tozalash mumkin, ammo bu xususiyat `redis` va `memcached` drayverlarida ishlamaydi (faqat `file` va `database` da ishlaydi) (qolgan drayverlarda emas)"
      },
      {
        "key": "D",
        "text": "Teglar kalitlarni shifrlab saqlaydi, shu sabab xavfsizlik oshadi; cheklovi esa bir nechta kalitni birdaniga o'chirib bo'lmasligi"
      }
    ],
    "correct": "B",
    "explanation": "Cache Tags yordamida ma'lum mavzuga oid yozuvlarni birgalikda boshqarish mumkin. Ammo kalitlar iyerarxiyasini qo'llab-quvvatlamaydigan oddiy faylli yoki relyatsion bazali kesh drayverlarida (file, database) Cache::tags() xato (BadMethodCallException) beradi."
  },
  {
    "id": "t-lar-15",
    "category": "laravel",
    "categoryLabel": "Laravel Core",
    "level": "senior",
    "question": "Laravel da `Pipeline` dizayn patterni qaysi asosiy tizimlarning asosi hisoblanadi?",
    "options": [
      {
        "key": "A",
        "text": "Blade shablonlarini kompilyatsiya qilish va view keshlash mexanizmida"
      },
      {
        "key": "B",
        "text": "Service Container ning bog'lanishlarni hal qilish (resolve) jarayonida"
      },
      {
        "key": "C",
        "text": "HTTP Middleware zanjiri va ko'p bosqichli buyurtma/to'lov qayta ishlash logikasida"
      },
      {
        "key": "D",
        "text": "Eloquent ning relatsiyalarni yuklash (Eager Loading) va query builder tizimida"
      }
    ],
    "correct": "C",
    "explanation": "Laravel HTTP so'rovlarini Middleware orqali o'tkazishda aynan illuminate/pipeline komponentidan foydalanadi: app(Pipeline::class)->send($request)->through($middleware)->then($destination). Ushbu pattern murakkab biznes-jarayonlarni bosqichma-bosqich ajratish uchun eng yaxshi amaliyotdir."
  },
  {
    "id": "t-lar-16",
    "category": "laravel",
    "categoryLabel": "Laravel Core",
    "level": "middle",
    "question": "Laravel Authorization tizimida `Policy` va `Gate` o'rtasidagi asosiy me'moriy farq nima?",
    "options": [
      {
        "key": "A",
        "text": "Policy HTTP so'rov darajasida (middleware sifatida), Gate esa faqat Blade shablonlarida (`@can`) tekshiruv uchun ishlatiladi; ular boshqa joyda ishlamaydi, birga ishlatib bo'lmaydi"
      },
      {
        "key": "B",
        "text": "Policy faqat umumiy harakatlar (admin-panelga kirish) uchun, Gate esa muayyan Model atrofida CRUD huquqlarini guruhlaydi"
      },
      {
        "key": "C",
        "text": "Policy muayyan Model atrofida (User, Post) CRUD huquqlarini guruhlaydi; Gate esa odatda modelga bog'liq bo'lmagan umumiy harakatlar (masalan admin-panelga kirish) uchun ishlatiladi"
      },
      {
        "key": "D",
        "text": "Policy faqat `User` modeliga tegishli, Gate esa istalgan model uchun; ular bir-biriga bog'liq emas va birgalikda ishlatib bo'lmaydi"
      }
    ],
    "correct": "C",
    "explanation": "Gate odatda Closure asosidagi ruxsatlar bo'lib (Gate::define('view-pulse', fn($user) => $user->is_admin)), modelga bog'lanmagan. Policy esa aniq Eloquent modeli atrofida (PostPolicy -> view, create, update, delete) tuzilgan klassdir."
  },
  {
    "id": "t-lar-17",
    "category": "laravel",
    "categoryLabel": "Laravel Core",
    "level": "junior",
    "question": "Laravel da `Route::fallback(...)` yo'nalishi nima vazifa bajaradi?",
    "options": [
      {
        "key": "A",
        "text": "So'ralgan URL boshqa hech qanday mavjud route ga mos kelmaganda (404 o'rniga yoki SPA bosh sahifasini ko'rsatishda) ishga tushadi"
      },
      {
        "key": "B",
        "text": "Barcha so'rovlardan oldin, route lar tekshirilishidan avval ishlaydi va so'rov URL manzilini kichik harflarga o'zgartiradi"
      },
      {
        "key": "C",
        "text": "Foydalanuvchi autentifikatsiyadan o'tmagan bo'lsa, uni avtomatik ravishda kirish (login) sahifasiga yo'naltiradi"
      },
      {
        "key": "D",
        "text": "Mavjud route da xatolik (exception) yuz berganda ishga tushadi va xatolikni log faylga yozib, standart sahifani ko'rsatadi"
      }
    ],
    "correct": "A",
    "explanation": "Route::fallback(fn() => view('errors.404')) yoki SPA (Vue/React) ilovalarida barcha noma'lum URL larni bitta index.blade.php ga yo'naltirish uchun eng oxirgi route sifatida ishlatiladi."
  },
  {
    "id": "t-lar-18",
    "category": "laravel",
    "categoryLabel": "Laravel Core",
    "level": "senior",
    "question": "Laravel Service Provider larda 'Deferred Provider' (Kechiktirilgan provayder) qanday ishlaydi va qanday afzallik beradi?",
    "options": [
      {
        "key": "A",
        "text": "Provayderning `register()` va `boot()` metodlari birinchi so'rovdan so'ng keshga yoziladi va keyingi so'rovlarda hech qachon qayta chaqirilmaydi"
      },
      {
        "key": "B",
        "text": "`DeferrableProvider` provayderni ilova to'liq yuklanib bo'lgandan keyin, so'rov oxirida (terminate bosqichida) ro'yxatdan o'tkazadi, shuning uchun u ilova ishga tushishini sekinlashtirmaydi"
      },
      {
        "key": "C",
        "text": "`DeferrableProvider` interfeysi va `provides()` metodi orqali: ushbu provayder har bir so'rovda yuklanmasdan, faqat uning xizmatiga haqiqiy ehtiyoj paydo bo'lgandagina (on-demand) xotiraga yuklanadi"
      },
      {
        "key": "D",
        "text": "Provayder faqat navbat (queue) workerlarida yuklanadi va HTTP so'rovlarda hech qachon ishlatilmaydi, `provides()` metodi esa shu workerlarni belgilaydi"
      }
    ],
    "correct": "C",
    "explanation": "Agar provayder faqat kamdan-kam ishlatiladigan og'ir servisni (masalan Riak, AWS SES client) ro'yxatdan o'tkazsa, uni DeferrableProvider qilish orqali har bir oddiy HTTP so'rovda keraksiz yuklanishining oldi olinadi va ilova tezligi oshadi."
  },
  {
    "id": "t-lar-19",
    "category": "laravel",
    "categoryLabel": "Laravel Core",
    "level": "middle",
    "question": "Laravel Form Request ichida `prepareForValidation()` metodi nima uchun ishlatiladi?",
    "options": [
      {
        "key": "A",
        "text": "Validatsiya muvaffaqiyatli o'tgandan keyin, ma'lumotlarni bazaga saqlashdan oldin ularni qayta formatlash va sanitizatsiya qilish uchun ishlatiladi, shu sabab `rules()` dan keyin bajariladi"
      },
      {
        "key": "B",
        "text": "Foydalanuvchi huquqini tekshirish uchun: `false` qaytarsa, so'rov `403` bilan to'xtatiladi va validatsiya qoidalari umuman ishga tushmaydi"
      },
      {
        "key": "C",
        "text": "Validatsiya qoidalari (rules) bajarilishidan oldin mijozdan kelgan ma'lumotlarni tozalash, formatlash (masalan telefon raqamidan bo'shliqlarni olib tashlash) yoki yangi maydon qo'shish uchun"
      },
      {
        "key": "D",
        "text": "Validatsiya xatolari bo'lganda chiqariladigan xabarlarni (`messages()`) o'zbek tiliga avtomatik tarjima qilish va formatlash uchun"
      }
    ],
    "correct": "C",
    "explanation": "prepareForValidation() validatsiyadan oldin $this->merge(['phone' => preg_replace('/\\D/', '', $this->phone)]) kabi ma'lumotlarni normalizatsiya qilish uchun eng qulay joydir. Bu controller ichida ortiqcha tozalash kodlari yozilishining oldini oladi."
  },
  {
    "id": "t-lar-20",
    "category": "laravel",
    "categoryLabel": "Laravel Core",
    "level": "junior",
    "question": "Laravel da `php artisan route:cache` bajarilganda qaysi turdagi yo'nalishlar xatolik keltirib chiqarishi mumkin?",
    "options": [
      {
        "key": "A",
        "text": "Faqat Controller metodiga yo'naltirilgan routelar (`Route::get('/x', [XController::class, 'index'])`), chunki ular klass nomini keshda saqlay olmaydi"
      },
      {
        "key": "B",
        "text": "Middleware biriktirilgan routelar, chunki middleware zanjirini keshlash uchun har bir so'rovda qayta tuzish talab etiladi"
      },
      {
        "key": "C",
        "text": "Closure (anonim funksiya) asosidagi routelar (masalan `Route::get('/test', fn() => 'ok')`), chunki PHP closure larni xavfsiz serializatsiya qila olmaydi"
      },
      {
        "key": "D",
        "text": "Parametrli routelar (`/users/{id}`), chunki ularning dinamik qismini oldindan kompilyatsiya qilib, keshga yozib bo'lmaydi"
      }
    ],
    "correct": "C",
    "explanation": "Laravel 8 gacha bo'lgan versiyalarda Closure routelar route:cache ni to'liq qulatgan. Zamonaviy versiyalarda maxsus wrapperlar bo'lsa-da, barcha routelarni aniq Controller klasslariga bog'lash productionda tavsiya etilgan eng toza amaliyotdir."
  },
  {
    "id": "t-lar-21",
    "category": "laravel",
    "categoryLabel": "Laravel Core",
    "level": "senior",
    "question": "Laravel da `Event Discovery` (Hodisalarni avtomatik aniqlash) qanday ishlaydi?",
    "options": [
      {
        "key": "A",
        "text": "Listener klassining nomi event nomi bilan bir xil bo'lishi (masalan `OrderShipped` va `OrderShippedListener`) asosida avtomatik bog'laydi, type-hint e'tiborga olinmaydi"
      },
      {
        "key": "B",
        "text": "`EventServiceProvider` da qo'lda `$listen` massivini to'ldirmasdan, `app/Listeners` papkasidagi klasslarning `handle(SomeEvent $event)` metodining type-hintiga qarab avtomatik bog'laydi"
      },
      {
        "key": "C",
        "text": "Har bir so'rovda `app/Events` papkasini skanerlab, topilgan klasslarni avtomatik ravishda barcha mavjud listenerlarga bog'laydi (cache ishlatilmaydi)"
      },
      {
        "key": "D",
        "text": "`composer.json` dagi `extra.laravel.events` bo'limida listenerlarni qo'lda ro'yxatga olish orqali, `app/Listeners` papkasi esa e'tiborga olinmaydi"
      }
    ],
    "correct": "B",
    "explanation": "Event Discovery (shouldDiscoverEvents() -> true) dasturchini har bir event va listernerni EventServiceProvider ichida qo'lda ro'yxatdan o'tkazish majburiyatidan qutqaradi. Reflection orqali listener qaysi eventni qabul qilishi avtomatik aniqlanadi."
  },
  {
    "id": "t-lar-22",
    "category": "laravel",
    "categoryLabel": "Laravel Core",
    "level": "middle",
    "question": "Laravel Notifications tizimida bildirishnomani bir vaqtning o'zida ham Email, ham SMS, ham Database ga yuborish qanday sozlanadi?",
    "options": [
      {
        "key": "A",
        "text": "Notification klassidagi `via($notifiable)` metodi ichida `return ['mail', 'database', 'vonage'];` massivini qaytarish orqali"
      },
      {
        "key": "B",
        "text": "Har bir kanal uchun alohida Notification klassi yaratib, ularni ketma-ket `Notification::send()` bilan alohida-alohida chaqirish orqali"
      },
      {
        "key": "C",
        "text": "`config/notifications.php` faylida 'default_channels' massivini belgilab, barcha bildirishnomalar avtomatik shu kanallarga yuborilishi orqali"
      },
      {
        "key": "D",
        "text": "Notification klassidagi `toChannels()` metodi ichida har bir kanal uchun qiymat qaytarish va `route()` metodini yozish orqali"
      }
    ],
    "correct": "A",
    "explanation": "Laravel Notification tizimining eng kuchli jihati uning ko'p kanalliligidir (multi-channel). via() metodi ichida kerakli kanallar ko'rsatiladi va tegishli toMail(), toDatabase(), toBroadcast() metodlari o'z kanali bo'yicha formatlab yetkazadi."
  },
  {
    "id": "t-lar-23",
    "category": "laravel",
    "categoryLabel": "Laravel Core",
    "level": "senior",
    "question": "Laravel da `RateLimiter` fasadi orqali dinamik cheklov qo'yishda 'Token Bucket' algoritmi qanday qo'llaniladi?",
    "options": [
      {
        "key": "A",
        "text": "`RateLimiter::for('api', fn($req) => $req->user()?->isVip() ? Limit::none() : Limit::perMinute(60)->by($req->user()?->id ?: $req->ip()))`"
      },
      {
        "key": "B",
        "text": "`RateLimiter::for('api', fn($req) => Limit::perMinute(60))->unlimitedFor($req->user()?->isVip())`"
      },
      {
        "key": "C",
        "text": "`RateLimiter::define('api', fn($req) => $req->user()?->isVip() ? Limit::perMinute(1000) : Limit::perHour(60))` // VIP uchun 1000/min"
      },
      {
        "key": "D",
        "text": "`Route::throttle('api', fn($req) => Limit::perMinute(60)->bucket($req->ip()))->exceptVip()`"
      }
    ],
    "correct": "A",
    "explanation": "Laravel RateLimiter juda moslashuvchan: Limit::perMinute(), Limit::perHour() orqali foydalanuvchi maqomiga qarab (VIP foydalanuvchilar uchun bepul, oddiy foydalanuvchilar uchun daqiqasiga 60 ta) dinamik limitlar belgilash imkonini beradi."
  },
  {
    "id": "t-lar-24",
    "category": "laravel",
    "categoryLabel": "Laravel Core",
    "level": "middle",
    "question": "Laravel da `Storage::temporaryUrl($path, $expiration)` metodi nima uchun ishlatiladi?",
    "options": [
      {
        "key": "A",
        "text": "Ochiq (public) fayllarning URL manzilini qisqartirib, muddati tugagach, havolani bazadan avtomatik o'chirib yuborish uchun"
      },
      {
        "key": "B",
        "text": "Amazon S3 kabi bulutli xotiralarda yopiq (private) fayllarni vaqtincha xavfsiz yuklab olish uchun imzolangan maxsus URL (Pre-signed URL) generatsiya qilish uchun"
      },
      {
        "key": "C",
        "text": "Faylni serverga yuklash vaqtida uni vaqtincha papkaga saqlab, belgilangan muddatdan so'ng avtomatik o'chirib tashlash uchun, shu bilan joy bo'shatiladi"
      },
      {
        "key": "D",
        "text": "Faylni mijoz brauzerida keshlab, `Cache-Control` sarlavhasi orqali muddatidan keyin qayta yuklab olishni majburlash uchun"
      }
    ],
    "correct": "B",
    "explanation": "Hujjatlar yoki xususiy fayllar S3 da ochiq (public) turmasligi kerak. temporaryUrl() Amazon S3 imzoli URL yaratadi va u masalan 15 daqiqadan so'ng avtomatik yaroqsiz holga keladi."
  },
  {
    "id": "t-lar-25",
    "category": "laravel",
    "categoryLabel": "Laravel Core",
    "level": "junior",
    "question": "Laravel Artisan buyruqlarida argument va optsiyalarni (options) ajratish sintaksisi qaysi to'g'ri ko'rsatilgan?",
    "options": [
      {
        "key": "A",
        "text": "Argumentlar: `{--user}`, `{--user=}`; Optsiyalar: `{queue}`, `{silent?}`"
      },
      {
        "key": "B",
        "text": "Argumentlar: `{user}`, `{--user?}`; Optsiyalar: `{queue=}`, `{-silent}`"
      },
      {
        "key": "C",
        "text": "Argumentlar: `[user]`, `[user?]`; Optsiyalar: `[--queue]`, `[--silent]`"
      },
      {
        "key": "D",
        "text": "Argumentlar: `{user}`, `{user?}`; Optsiyalar (flags): `{--queue=}`, `{--silent}`"
      }
    ],
    "correct": "D",
    "explanation": "Artisan $signature xususiyatida argumentlar to'g'ridan-to'g'ri {param} ko'rinishida (majburiy yoki {param?} ixtiyoriy), kalitli optsiyalar esa ikkita tire bilan {--option=} ko'rinishida e'lon qilinadi."
  },
  {
    "id": "t-lar-26",
    "category": "laravel",
    "categoryLabel": "Laravel Core",
    "level": "middle",
    "question": "Laravel da `Gate::before(fn($user, $ability) => ...)` filtri nima maqsadda qo'llaniladi?",
    "options": [
      {
        "key": "A",
        "text": "Har qanday boshqa tekshiruvdan oldin ishga tushib, masalan 'Super Admin' foydalanuvchilarga barcha huquqlarni to'g'ridan-to'g'ri tasdiqlash (grant all) uchun"
      },
      {
        "key": "B",
        "text": "Har qanday boshqa tekshiruvdan keyin ishga tushib, hech bir Policy ruxsat bermagan holatlarda qo'shimcha xabar log faylga yozish uchun (faqat audit uchun)"
      },
      {
        "key": "C",
        "text": "Faqat guest (kirmagan) foydalanuvchilar uchun ishga tushib, ularni avtomatik ravishda login sahifasiga yo'naltirish uchun"
      },
      {
        "key": "D",
        "text": "Barcha huquqlarni bir martalik keshlab qo'yib, har bir so'rovda Policy larni qayta tekshirmasdan natijani qaytarish (cache) uchun"
      }
    ],
    "correct": "A",
    "explanation": "Gate::before har qanday Policy yoki Gate metodidan oldin ishga tushadi. Agar u true qaytarsa, qolgan tekshiruvlar ko'rilmasdan darhol ruxsat beriladi. Bu Super Admin rolini realizatsiya qilishning eng toza usulidir."
  },
  {
    "id": "t-lar-27",
    "category": "laravel",
    "categoryLabel": "Laravel Core",
    "level": "senior",
    "question": "Laravel 11 da ilovani sozlash (`bootstrap/app.php`) qanday o'zgardi?",
    "options": [
      {
        "key": "A",
        "text": "Barcha sozlamalar `config/app.php` ga ko'chirildi va `bootstrap/app.php` fayli butunlay olib tashlandi; ilova to'g'ridan-to'g'ri `public/index.php` orqali yuklanadi"
      },
      {
        "key": "B",
        "text": "Eski `app/Http/Kernel.php` saqlanib qoldi, lekin `bootstrap/app.php` faqat ilovaning nomini va `basePath` ni belgilaydi; routing va middleware avvalgidek `app/Providers` da sozlanadi, Kernel va Provider fayllari avvalgidek mavjud"
      },
      {
        "key": "C",
        "text": "Eski versiyalardagi `Http/Kernel.php`, `Console/Kernel.php` va bir qancha provayderlar olib tashlanib, routing, middleware va exception handling to'g'ridan-to'g'ri `bootstrap/app.php` ichida zanjirli (chained fluent methods) orqali sozlanadi"
      },
      {
        "key": "D",
        "text": "`bootstrap/app.php` endi faqat Composer autoload ni ulaydi, routing va middleware esa `routes/web.php` fayli ichida `Route::middleware()` orqali sozlanadi"
      }
    ],
    "correct": "C",
    "explanation": "Laravel 11 ilova arxitekturasini minimal va ixcham ko'rinishga keltirdi. Ko'p faylli Kernel klasslari o'rniga Application::configure(basePath: dirname(__DIR__))->withRouting()->withMiddleware()->withExceptions()->create() fluet sintaksisi kiritildi."
  },
  {
    "id": "t-lar-28",
    "category": "laravel",
    "categoryLabel": "Laravel Core",
    "level": "middle",
    "question": "Laravel da `Custom Cast` (CastsAttributes interfeysi) klassi orqali qanday vazifa bajariladi?",
    "options": [
      {
        "key": "A",
        "text": "Ma'lumotlar bazasidagi xom qiymatni o'qiyotganda (`get`) maxsus Value Object ga aylantirish va saqlayotganda (`set`) uni yana bazaga mos formatga o'girish"
      },
      {
        "key": "B",
        "text": "Model ma'lumotlarini JSON yoki massivga o'girishda qaysi maydonlar chiqarilishini belgilaydi (`$hidden` va `$visible`)"
      },
      {
        "key": "C",
        "text": "Eloquent so'rovlariga avtomatik global shart qo'shib, masalan faqat faol yozuvlarni qaytarishni ta'minlaydi (Global Scope), modelni qayta sozlash shart emas"
      },
      {
        "key": "D",
        "text": "Modeldagi hodisalarni (`creating`, `updated`) tinglovchi observer yaratib, ularni avtomatik ravishda ro'yxatdan o'tkazadi"
      }
    ],
    "correct": "A",
    "explanation": "CastsAttributes interfeysi orqali masalan JSON saqlangan koordinatalarni Coordinates($lat, $lng) obyektiga yoki pul maydonini Money($amount, $currency) Value Object ga xavfsiz va qulay konvertatsiya qilish mumkin."
  },
  {
    "id": "t-lar-29",
    "category": "laravel",
    "categoryLabel": "Laravel Core",
    "level": "senior",
    "question": "Laravel da Real-time Broadcasting (Reverb/Pusher) da `PresenceChannel` va `PrivateChannel` o'rtasidagi asosiy farq nima?",
    "options": [
      {
        "key": "A",
        "text": "PresenceChannel faqat bitta foydalanuvchi bilan bog'lanadi (1-ga-1 chat), PrivateChannel esa bir nechta foydalanuvchi uchun guruh chati sifatida ishlatiladi, shuning uchun u faqat 1-ga-1 chatga mos"
      },
      {
        "key": "B",
        "text": "PresenceChannel faqat ruxsati bor foydalanuvchilar uchun; PrivateChannel esa nafaqat ruxsat beradi, balki kanalda kimlar onlayn turganini ham ko'rsatadi"
      },
      {
        "key": "C",
        "text": "PrivateChannel xabarlarni shifrlaydi, PresenceChannel esa xabarlarni shifrlamaydi, ammo ikkalasi ham kanalda kim onlayn ekanini aniqlab bera olmaydi"
      },
      {
        "key": "D",
        "text": "PrivateChannel faqat ruxsati bor foydalanuvchilar uchun; PresenceChannel esa nafaqat ruxsat beradi, balki kanalda ayni damda kimlar onlayn turganini (who is present) va kim kirib-chiqqanini bilish imkonini beradi"
      }
    ],
    "correct": "D",
    "explanation": "PresenceChannel xuddi chat xonalarida kimlar onlayn turganini ko'rsatish (here, joining, leaving) uchun mo'ljallangan. U PrivateChannel ning barcha xavfsizlik imkoniyatlarini o'z ichiga oladi va qo'shimcha tarzda a'zolar ro'yxatini real vaqtda sinxronlaydi."
  },
  {
    "id": "t-lar-30",
    "category": "laravel",
    "categoryLabel": "Laravel Core",
    "level": "junior",
    "question": "Laravel da `route:list` buyrug'i berilganda middleware larni ham ko'rish uchun qaysi parametr qo'shiladi?",
    "options": [
      {
        "key": "A",
        "text": "`php artisan route:list --with-middleware`"
      },
      {
        "key": "B",
        "text": "`php artisan route:list --middleware=all`"
      },
      {
        "key": "C",
        "text": "`php artisan route:list --show-middleware`"
      },
      {
        "key": "D",
        "text": "`php artisan route:list -v` (yoki `--verbose`)"
      }
    ],
    "correct": "D",
    "explanation": "php artisan route:list buyrug'iga -v yoki -vv qo'shilsa, har bir yo'nalishga qaysi middleware lar (auth, throttle, custom middleware) biriktirilgani aniq ro'yxatda ko'rsatiladi."
  }
];
