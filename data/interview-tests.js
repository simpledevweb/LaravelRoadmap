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
        "text": "true, chunki 'admin' satri son bilan solishtirilganda 0 ga aylanadi"
      },
      {
        "key": "B",
        "text": "false, chunki PHP 8 da son satrga o'giriladi ('0' == 'admin')"
      },
      {
        "key": "C",
        "text": "Fatal Error: Type mismatch"
      },
      {
        "key": "D",
        "text": "null va E_WARNING ogohlantirishi"
      }
    ],
    "correct": "B",
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
        "text": "Barcha qatorlarni diskda vaqtinchalik SQLite faylga yozib qo'yadi"
      },
      {
        "key": "B",
        "text": "Faylni siqib (gzip qilib) xotirada saqlaydi"
      },
      {
        "key": "C",
        "text": "Butun to'plamni RAM ga yuklamaydi, har bir qatorni navbati bilan xotiraga olib qayta ishlaydi"
      },
      {
        "key": "D",
        "text": "PHP-FPM xotira limitini avtomatik ravishda 2 barobar oshiradi"
      }
    ],
    "correct": "C",
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
        "text": "self:: voris sinfni oladi, static:: esa metod yozilgan dastlabki sinfni ko'rsatadi"
      },
      {
        "key": "B",
        "text": "static:: runtime da chaqirilgan yakuniy voris sinfni ko'rsatadi, self:: esa metod jismonan qaysi sinfda yozilgan bo'lsa o'shani oladi"
      },
      {
        "key": "C",
        "text": "Ikkalasi mutlaqo bir xil ishlaydi, static:: faqat PHP 8 da qo'shilgan yangi sinonim"
      },
      {
        "key": "D",
        "text": "self:: static xususiyatlar uchun, static:: esa oddiy metodlar uchun ishlatiladi"
      }
    ],
    "correct": "B",
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
        "text": "WeakMap kalit sifatida faqat sonli satrlarni qabul qiladi"
      },
      {
        "key": "B",
        "text": "WeakMap dagi ob'ektga boshqa joyda havola qolmasa, Garbage Collector uni o'chirganda xaritadan ham avtomatik o'chadi"
      },
      {
        "key": "C",
        "text": "WeakMap xotirada saqlanmaydi, diskdagi kesh fayliga yoziladi"
      },
      {
        "key": "D",
        "text": "SplObjectStorage dan farqli o'laroq unga foreach ishlatib bo'lmaydi"
      }
    ],
    "correct": "B",
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
        "text": "$b = $a; tenglashtirilgan zahoti darhol xotiradan yangi joy olinadi"
      },
      {
        "key": "B",
        "text": "Hech qachon yangi xotira ajratilmaydi, ikkalasi hamisha bir xil bo'ladi"
      },
      {
        "key": "C",
        "text": "Faqatgina nusxalangan massivlardan biriga yangi element qo'shilganda yoki qiymat o'zgartirilganda (yozish sodir bo'lganda)"
      },
      {
        "key": "D",
        "text": "Funksiya o'z ishini yakunlaganda"
      }
    ],
    "correct": "C",
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
        "text": "Faqat fayllarni diskda shifrlash uchun ishlatiladi"
      },
      {
        "key": "B",
        "text": "`json_validate()` satrni faqat sintaktik tahlil qiladi va xotirada hech qanday PHP massiv yoki obyekt daraxtini (zval) yaratmaydi, natijada katta JSON ma'lumotlarda O(1) minimal xotira sarflaydi"
      },
      {
        "key": "C",
        "text": "`json_validate()` noto'g'ri JSON kelganda darhol fatal xatolik tashlaydi"
      },
      {
        "key": "D",
        "text": "Ular o'rtasida farq yo'q, faqat funksiya nomi o'zgargan"
      }
    ],
    "correct": "B",
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
        "text": "Traitlar o'rnini"
      },
      {
        "key": "B",
        "text": "Sinflardagi construct metodlarining o'rnini"
      },
      {
        "key": "C",
        "text": "DocBlock izohlaridagi norasmiy annotatsiyalarning (masalan, /** @Route('/api') */)"
      },
      {
        "key": "D",
        "text": "Interface larning"
      }
    ],
    "correct": "C",
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
        "text": "false, chunki satr ichida belgi mavjud"
      },
      {
        "key": "B",
        "text": "true, chunki '0' satri falsy qiymat hisoblanadi"
      },
      {
        "key": "C",
        "text": "TypeError xatosi"
      },
      {
        "key": "D",
        "text": "null"
      }
    ],
    "correct": "B",
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
        "text": "Constructor argumentlariga ko'rinish modifikatori (public/protected/private) berilsa, PHP xususiyatni avtomatik e'lon qiladi va qiymatini o'zlashtiradi"
      },
      {
        "key": "B",
        "text": "U faqat private xususiyatlar uchun ishlaydi, public yoki protected xususiyatlar uchun ishlamaydi"
      },
      {
        "key": "C",
        "text": "Bu sintaksis abstract klasslarda va interfeyslarda ham ishlatilishi shart"
      },
      {
        "key": "D",
        "text": "Promotion ishlatilganda konstruktor tanasida (body) hech qanday boshqa kod yozish mumkin emas"
      }
    ],
    "correct": "A",
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
        "text": "Butun loyihaning barcha fayllariga global ta'sir qiladi"
      },
      {
        "key": "B",
        "text": "Faqat ushbu direktiva yozilgan faylning ichidagi funksiya chaqiruvlariga (caller file) qat'iy tip tekshiruvini qo'llaydi"
      },
      {
        "key": "C",
        "text": "Faqat klass metodlariga ta'sir qiladi, oddiy funksiyalarga ta'sir qilmaydi"
      },
      {
        "key": "D",
        "text": "PHP runtime da xotirani 2 baravar tejash rejimini yoqadi"
      }
    ],
    "correct": "B",
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
        "text": "match faqat sonlarni solishtiradi, switch esa satrlarni solishtiradi"
      },
      {
        "key": "B",
        "text": "match qat'iy tekshiruv (===) ishlatadi, qiymat qaytaradi va break talab qilmaydi"
      },
      {
        "key": "C",
        "text": "switch doimo tezroq ishlaydi, chunki match JIT tomonidan optimizatsiya qilinmaydi"
      },
      {
        "key": "D",
        "text": "match da default holatini ko'rsatish mumkin emas, switch da esa mumkin"
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
        "text": "Readonly property faqat bitta marta initsializatsiya qilinadi va unga doimo tip (type) ko'rsatilishi shart"
      },
      {
        "key": "B",
        "text": "Readonly property ga boshlang'ich qiymatni to'g'ridan-to'g'ri klassda belgilash mumkin: public readonly int $id = 1;"
      },
      {
        "key": "C",
        "text": "Readonly property qiymatini klass tashqarisidan istalgan paytda o'zgartirish mumkin"
      },
      {
        "key": "D",
        "text": "Readonly property larni private qilib e'lon qilib bo'lmaydi"
      }
    ],
    "correct": "A",
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
        "text": "Backed enumlar faqat `int` yoki `string` tipidagi qiymatlarga ega bo'lishi mumkin"
      },
      {
        "key": "B",
        "text": "Enum holatlariga (cases) float yoki array qiymatlarni ham biriktirish mumkin"
      },
      {
        "key": "C",
        "text": "Enum klass bo'lmagani uchun unda metodlar va interfeyslar ishlatib bo'lmaydi"
      },
      {
        "key": "D",
        "text": "Status::from('invalid') mavjud bo'lmagan qiymat uchun null qaytaradi"
      }
    ],
    "correct": "A",
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
        "text": "Ko'p oqimli (multi-threading) parallel hisoblashlarni CPU yadrolariga taqsimlash"
      },
      {
        "key": "B",
        "text": "To'xtatilishi va qayta davom ettirilishi mumkin bo'lgan to'liq stakli (stackful) korutinalar bo'lib, no-blocking asinxron arxitekturani ta'minlaydi"
      },
      {
        "key": "C",
        "text": "Fayllarni siqish (zip/gzip) jarayonini tezlashtiruvchi C darajasidagi kengaytma"
      },
      {
        "key": "D",
        "text": "SQL so'rovlarini avtomatik keshlovchi ichki PHP xotira mexanizmi"
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
        "text": "Faqat database so'rovlarida null qiymatlarni 0 ga almashtiradi"
      },
      {
        "key": "C",
        "text": "Obyektning barcha private xususiyatlarini avtomatik null ga tenglashtiradi"
      },
      {
        "key": "D",
        "text": "Tenglikni tekshirish uchun `=== null` o'rniga ishlatiladi"
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
        "text": "Anonim funksiyani ma'lum bir obyekt doirasiga ($this) va klass scope'iga bog'lab, hatto private a'zolariga kirish imkonini beradi"
      },
      {
        "key": "B",
        "text": "Faqat ma'lumotlar bazasi tranzaksiyalarini commit qilish uchun"
      },
      {
        "key": "C",
        "text": "Funksiyani JSON formatiga serializatsiya qilish uchun"
      },
      {
        "key": "D",
        "text": "Closure ni global o'zgaruvchiga aylantirish uchun"
      }
    ],
    "correct": "A",
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
        "text": "`override`"
      },
      {
        "key": "B",
        "text": "`insteadof` va `as`"
      },
      {
        "key": "C",
        "text": "`resolve`"
      },
      {
        "key": "D",
        "text": "`implements`"
      }
    ],
    "correct": "B",
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
        "text": "Parametrlar ham, qaytarish tipi ham faqat aynan bir xil bo'lishi shart"
      },
      {
        "key": "C",
        "text": "Parametrlar covariant, qaytarish tipi esa contravariant bo'lishi lozim"
      },
      {
        "key": "D",
        "text": "Bola klass xohlagan tipni qabul qilib, xohlagan tipni qaytarishi mumkin"
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
        "text": "Obyekt funksiya kabi chaqirilganda ($obj()) avtomatik ishga tushadi"
      },
      {
        "key": "B",
        "text": "Obyekt echo yoki print qilinganda string qaytaradi"
      },
      {
        "key": "C",
        "text": "Mavjud bo'lmagan statik metod chaqirilganda ishlaydi"
      },
      {
        "key": "D",
        "text": "Obyekt xotiradan o'chirilayotganda chaqiriladi"
      }
    ],
    "correct": "A",
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
        "text": "PHP da faqat Reference Counting ishlatiladi, shuning uchun aylanma bog'liqlikdagi obyektlar hech qachon tozalanmaydi"
      },
      {
        "key": "B",
        "text": "Concurrent Cycle Collection algoritmi orqali zval ranglari (binafsha, kulrang, qora, oq) bo'yicha tahlil qilinib, sikllar aniqlanadi va xotira bo'shatiladi"
      },
      {
        "key": "C",
        "text": "Har bir so'rov (request) tugashida butun server o'chirib yoqiladi"
      },
      {
        "key": "D",
        "text": "Aylanma bog'liqlik vujudga kelganda PHP darhol Fatal Memory Error beradi"
      }
    ],
    "correct": "B",
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
        "text": "Klass obyekti yaratilishini taqiqlab, faqat statik metodlarni qoldirish uchun"
      },
      {
        "key": "C",
        "text": "Klass ichidagi barcha o'zgaruvchilarni o'zgarmas (const) qilish uchun"
      },
      {
        "key": "D",
        "text": "Faylni interpretatsiyadan to'xtatish uchun"
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
        "text": "`new class { ... }` orqali bir martalik sodda obyektlar yaratish mumkin bo'lib, u interfeyslarni implement qilishi va boshqa klasslardan meros olishi mumkin"
      },
      {
        "key": "B",
        "text": "Anonim klass konstruktorga ega bo'lishi mumkin emas"
      },
      {
        "key": "C",
        "text": "Anonim klasslar faqat test yozishda ishlatiladi, asosiy kodda PHP SyntaxError beradi"
      },
      {
        "key": "D",
        "text": "Anonim klasslar xotiradan hech qachon o'chirilmaydi"
      }
    ],
    "correct": "A",
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
        "text": "Boshqa bir Generator yoki massivdan barcha qiymatlarni delegatsiya asosida ketma-ket chiqarib beradi"
      },
      {
        "key": "B",
        "text": "Faqat tashqi API dan kelgan javoblarni qabul qiladi"
      },
      {
        "key": "C",
        "text": "Generatorni to'xtatib, xotirani darhol tozalaydi"
      },
      {
        "key": "D",
        "text": "yield qiymatini ma'lumotlar bazasiga saqlaydi"
      }
    ],
    "correct": "A",
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
        "text": "Faqat database maydonlari uchun mo'ljallangan no-SQL ma'lumotlar tipi"
      },
      {
        "key": "C",
        "text": "Tiplarni dinamik ravishda runtime paytida stringdan o'giruvchi eval() funksiyasi"
      },
      {
        "key": "D",
        "text": "Barcha tiplarni avtomatik ravishda mixed tipiga tenglashtiruvchi rejim"
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
        "text": "Abstract class tana qismiga (body) ega to'liq metodlar va xususiyatlar (properties) saqlashi mumkin, interfeysda esa faqat metod signature lari va konstantalar bo'ladi"
      },
      {
        "key": "B",
        "text": "Klass bir vaqtning o'zida bir nechta abstract klassdan meros olishi mumkin, lekin faqat bitta interfeysni implement qiladi"
      },
      {
        "key": "C",
        "text": "Interfeyslarda barcha metodlar private bo'lishi shart"
      },
      {
        "key": "D",
        "text": "Abstract klasslardan to'g'ridan-to'g'ri new AbstractClass() qilib obyekt olish mumkin"
      }
    ],
    "correct": "A",
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
        "text": "Deep copy (chuqur nusxa): barcha ichki obyektlar ham rekursiv yangitdan yaratiladi"
      },
      {
        "key": "C",
        "text": "PHP darhol fatal error tashlaydi, chunki __clone() metodi bo'lishi shart"
      },
      {
        "key": "D",
        "text": "Faqatgina o'sha obyektning xotiradagi id raqami (hash) o'zgaradi, boshqa hech narsa nusxalanmaydi"
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
        "text": "Opcache PHP kodni Opcode ga aylantirib umumiy xotirada saqlaydi; JIT esa eng ko'p bajariladigan CPU-bound opcodelarni to'g'ridan-to'g'ri mashina kodiga (machine code) kompilyatsiya qiladi"
      },
      {
        "key": "B",
        "text": "JIT ma'lumotlar bazasi so'rovlarini 100 baravar tezlashtiradi va tarmoq kutish vaqtini yo'qotadi"
      },
      {
        "key": "C",
        "text": "Opcache yoqilgan bo'lsa, PHP fayllaridagi o'zgarishlar hech qachon yangilanmaydi"
      },
      {
        "key": "D",
        "text": "JIT PHP 7.0 da kiritilgan bo'lib, faqat CLI muhitida ishlaydi"
      }
    ],
    "correct": "A",
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
        "text": "`===` ham qiymatni, ham ma'lumot turini (tipini) solishtiradi; `==` esa tiplarni avtomatik o'zgartirib (type coercion) faqat qiymatni tekshiradi"
      },
      {
        "key": "B",
        "text": "`==` qat'iy tekshiruv, `===` esa faqat obyektlar uchun ishlatiladi"
      },
      {
        "key": "C",
        "text": "`===` faqat sonlarni tekshirish uchun, `==` esa matnlar uchun ishlatiladi"
      },
      {
        "key": "D",
        "text": "Ular orasida hech qanday farq yo'q, ikkalasi ham bir xil ishlaydi"
      }
    ],
    "correct": "A",
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
        "text": "Faqat fayllarni diskdan o'chirish va serverni qayta yuklash"
      },
      {
        "key": "C",
        "text": "Baza jadvallarini avtomatik migrate qilish"
      },
      {
        "key": "D",
        "text": "PHP interpretatorining C kodini o'zgartirish"
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
        "text": "Tashqi ko'lamdagi (outer scope) o'zgaruvchilarni `use` kalit so'zisiz avtomatik ravishda qiymat bo'yicha (by-value) ushlaydi"
      },
      {
        "key": "B",
        "text": "Arrow function ichida bir nechta ifodalarni (multiline statements) bemalol yozish mumkin"
      },
      {
        "key": "C",
        "text": "Tashqi o'zgaruvchilarni avtomatik havola (by-reference) orqali o'zgartira oladi"
      },
      {
        "key": "D",
        "text": "Faqat massivlarning array_map funksiyasi bilan ishlaydi"
      }
    ],
    "correct": "A",
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
        "text": "Ha, `finally` bloki har qanday holatda ham, hatto `return` chaqirilgan bo'lsa ham ijro etiladi"
      },
      {
        "key": "B",
        "text": "Yo'q, `return` chaqirilgach funksiya darhol tugaydi va `finally` e'tiborga olinmaydi"
      },
      {
        "key": "C",
        "text": "Faqat fatal error yuz bergandagina finally bajariladi"
      },
      {
        "key": "D",
        "text": "Faqat catch bloki ishlamasa finally bajariladi"
      }
    ],
    "correct": "A",
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
        "text": "`__construct()`, `__clone()` va `__wakeup()` (yoki `__unserialize()`)"
      },
      {
        "key": "B",
        "text": "Faqat `__toString()` va `__invoke()`"
      },
      {
        "key": "C",
        "text": "Faqat `__destruct()` va `__get()`"
      },
      {
        "key": "D",
        "text": "Hech qaysisini yopish shart emas, faqat statik metod yetarli"
      }
    ],
    "correct": "A",
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
        "text": "Nomlangan argumentlar faqat massivlarni uzatishda ishlaydi"
      },
      {
        "key": "C",
        "text": "Nomlangan argumentlar ishlatilganda funksiyaning parametrlari private bo'lishi shart"
      },
      {
        "key": "D",
        "text": "Agar nomlangan argument ishlatilsa, funksiya faqat string qaytarishi kerak"
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
        "text": "Observer (Kuzatuvchi) patterni"
      },
      {
        "key": "B",
        "text": "Factory Method patterni"
      },
      {
        "key": "C",
        "text": "Decorator patterni"
      },
      {
        "key": "D",
        "text": "Adapter patterni"
      }
    ],
    "correct": "A",
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
        "text": "Mavjud bo'lmagan (inaccessible) yoki ko'rinish chegarasi yopiq (private/protected) xususiyatga murojaat qilinganda yoki qiymat yozilganda"
      },
      {
        "key": "B",
        "text": "Har qanday public xususiyat o'qilganda yoki yozilganda"
      },
      {
        "key": "C",
        "text": "Faqat ma'lumotlar bazasidan model yuklanganda"
      },
      {
        "key": "D",
        "text": "Faqat klass statik chaqirilganda"
      }
    ],
    "correct": "A",
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
        "text": "To'liq kvalifikatsiyalangan klass nomi (FQCN) namespace prefiksidan so'ng kataloglar iyerarxiyasi va fayl nomi bilan birga '.php' kengaytmasiga to'liq mos kelishi kerak"
      },
      {
        "key": "B",
        "text": "Har bir klass faylida faqat pastki chiziqlar (_) bilan ajratilgan nomlar bo'lishi shart"
      },
      {
        "key": "C",
        "text": "Barcha klasslar yagona bitta katta fayl ichida saqlanishi kerak"
      },
      {
        "key": "D",
        "text": "Klass nomi va fayl nomining registri (katta-kichik harflar) farq qilishi mumkin"
      }
    ],
    "correct": "A",
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
        "text": "PHP 7 da `true` (chunki '0' == false), PHP 8 da ham `true` (agar 3-parametr $strict=true berilmasa)"
      },
      {
        "key": "B",
        "text": "PHP 8 da darhol TypeError beradi"
      },
      {
        "key": "C",
        "text": "Har doim false qaytaradi"
      },
      {
        "key": "D",
        "text": "Faqat array_search ishlatilgandagina true qaytaradi"
      }
    ],
    "correct": "A",
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
        "text": "Klassning barcha xususiyatlari avtomatik readonly va typed bo'ladi, statik xususiyatlar (static properties) va dinamik xususiyatlar (dynamic properties) qo'shish qat'iyan taqiqlanadi"
      },
      {
        "key": "B",
        "text": "Klassdan umuman obyekt yaratib bo'lmaydi"
      },
      {
        "key": "C",
        "text": "Klass metodlari hech qanday parametr qabul qila olmaydi"
      },
      {
        "key": "D",
        "text": "Readonly klass boshqa hech qanday interfeysni implement qila olmaydi"
      }
    ],
    "correct": "A",
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
        "text": "Yagona `PaymentGatewayInterface` yaratib, har bir to'lov tizimini alohida klass sifatida implement qilish va strategiya (Strategy pattern) orqali chaqirish"
      },
      {
        "key": "B",
        "text": "Bitta ulkan klass ichida `switch($type)` yoki `if-else` shartlari orqali yangi to'lov turlarini qo'shib borish"
      },
      {
        "key": "C",
        "text": "Har bir to'lov tizimi uchun alohida controller ochib, bazadagi jadval strukturasini o'zgartirish"
      },
      {
        "key": "D",
        "text": "Barcha to'lov kodlarini trait ichiga yozib, hamma joyda o'sha traitni ishlatish"
      }
    ],
    "correct": "A",
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
        "text": "`Error` — PHP engine/runtime darajasidagi jiddiy muammolar (TypeError, ParseError, DivisionByZeroError) uchun; `Exception` esa dasturiy (biznes-logika) xatoliklari uchun mo'ljallangan"
      },
      {
        "key": "B",
        "text": "`Error` ni try-catch orqali ushlab bo'lmaydi, faqat `Exception` ni ushlash mumkin"
      },
      {
        "key": "C",
        "text": "`Exception` faqat frontend uchun, `Error` esa backend uchun javob beradi"
      },
      {
        "key": "D",
        "text": "PHP 7 dan keyin `Exception` eskirgan va o'rniga faqat `Error` ishlatiladi"
      }
    ],
    "correct": "A",
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
        "text": "Faqat database seederlarida shunday xatolik yuz beradi"
      },
      {
        "key": "B",
        "text": "Chunki Laravel tranzaksiya ichida navbatlarni butunlay bloklaydi"
      },
      {
        "key": "C",
        "text": "Tranzaksiya to'liq commit bo'lishidan oldinroq tezkor Queue Worker jobni navbatdan olib bajarishga tushsa, yangi yaratilgan yozuv hali bazada ko'rinmay ModelNotFoundException bilan yiqiladi"
      },
      {
        "key": "D",
        "text": "Job tranzaksiyani avtomatik rollback qilib yuboradi"
      }
    ],
    "correct": "C",
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
        "text": "bind() bitta instansiya saqlaydi, singleton() har safar yangi ob'ekt yaratadi"
      },
      {
        "key": "B",
        "text": "bind() har safar yangi ob'ekt beradi, singleton() ilova bo'ylab bitta, scoped() esa joriy HTTP so'rov yoki job davomida bitta instansiya beradi"
      },
      {
        "key": "C",
        "text": "scoped() faqat ma'lumotlar bazasi so'rovlarida ishlaydi"
      },
      {
        "key": "D",
        "text": "Uchala metod ham mutlaqo bir xil ishlaydi"
      }
    ],
    "correct": "B",
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
        "text": "register() faqat konteynerga bog'lash (binding) uchun mo'ljallangan, bu vaqtda boshqa providerlar hali yuklanmagan bo'lishi mumkin"
      },
      {
        "key": "B",
        "text": "register() faqat konsol (CLI) rejimida ishlaydi"
      },
      {
        "key": "C",
        "text": "register() tranzaksiya ichida ishlaydi"
      },
      {
        "key": "D",
        "text": "Laravel bunga avtomatik ruxsat bermaydi va Exception tashlaydi"
      }
    ],
    "correct": "A",
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
        "text": "rules() -> authorize() -> prepareForValidation()"
      },
      {
        "key": "B",
        "text": "prepareForValidation() -> authorize() -> rules()"
      },
      {
        "key": "C",
        "text": "authorize() -> prepareForValidation() -> rules()"
      },
      {
        "key": "D",
        "text": "rules() -> prepareForValidation() -> authorize()"
      }
    ],
    "correct": "C",
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
        "text": "Post modelidagi barcha Global Scopes ni o'chiradi"
      },
      {
        "key": "B",
        "text": "Faqat ko'rsatilgan {user} ga tegishli bo'lgan {post} ni yuklaydi va begona post ID si berilsa 404 qaytaradi"
      },
      {
        "key": "C",
        "text": "Marshrutni faqat avtorizatsiyadan o'tgan adminlarga ochadi"
      },
      {
        "key": "D",
        "text": "Postlarni avtomatik tarzda keshga yozib qo'yadi"
      }
    ],
    "correct": "B",
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
        "text": "Controller ishga tushishidan oldin"
      },
      {
        "key": "C",
        "text": "Hech qachon ishga tushmaydi, chunki return bo'lib ketadi"
      },
      {
        "key": "D",
        "text": "Faqat xatolik yuz bergandagina"
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
        "text": "Ular app/Core papkasiga ko'chirildi"
      },
      {
        "key": "B",
        "text": "Ular olib tashlanib, sozlamalar bootstrap/app.php faylidagi ixcham zanjirga birlashtirildi"
      },
      {
        "key": "C",
        "text": "Faqat .env fayli orqali sozlanadigan qilindi"
      },
      {
        "key": "D",
        "text": "Ular vendor ichiga ko'chirildi va ularni o'zgartirib bo'lmaydi"
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
        "text": "URL dagi ma'lumotlarni shifrlaydi va hech kim uni o'qiy olmaydi"
      },
      {
        "key": "B",
        "text": "URL parametrlariga kriptografik HMAC hesh qo'shadi, agar foydalanuvchi bitta parametrni o'zgartirsa havola bekor bo'ladi"
      },
      {
        "key": "C",
        "text": "Havolani faqat bitta IP manzildan ochishga ruxsat beradi"
      },
      {
        "key": "D",
        "text": "Foydalanuvchi brauzeriga majburiy SSL o'rnatadi"
      }
    ],
    "correct": "B",
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
        "text": "load() har doim qaytadan DB ga so'rov yuboradi, loadMissing() esa agar relatsiya oldin yuklangan bo'lsa ortiqcha so'rov yubormaydi"
      },
      {
        "key": "B",
        "text": "loadMissing() faqat bo'sh (null) qiymatlarni yuklaydi"
      },
      {
        "key": "C",
        "text": "load() faqat bitta model uchun, loadMissing() esa faqat kolleksiyalar uchun"
      },
      {
        "key": "D",
        "text": "Ikkalasi mutlaqo bir xil"
      }
    ],
    "correct": "A",
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
        "text": "Aks holda polimorfik relatsiyalar MySQL da ishlamaydi"
      },
      {
        "key": "B",
        "text": "Baza ustunida 'App\\Models\\Post' kabi to'liq sinf nomi saqlanishining oldini olish va kod refactoringida DB ma'lumotlari buzilmasligi uchun"
      },
      {
        "key": "C",
        "text": "Ma'lumotlar bazasi hajmini 50% ga siqish uchun"
      },
      {
        "key": "D",
        "text": "Eloquent o'rniga Query Builder ishlatishga majburlash uchun"
      }
    ],
    "correct": "B",
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
        "text": "chunk() faqat PostgreSQL da ishlaydi"
      },
      {
        "key": "B",
        "text": "chunk() OFFSET ishlatadi; agar tsikl ichida qatorlar o'zgartirilsa (masalan status='processed'), qatorlar o'tib ketadi (skip rows). chunkById() esa WHERE id > $lastId ishlatgani uchun bu xatodan xoli"
      },
      {
        "key": "C",
        "text": "chunkById() faqat bitta qatordan o'qiydi"
      },
      {
        "key": "D",
        "text": "chunk() xotirani kamroq yeydi"
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
        "text": "Barcha ma'lumotlar bazasi tranzaksiyalarini o'chirib qo'yish uchun"
      },
      {
        "key": "B",
        "text": "SoftDeletes yoki ActiveScope kabi avtomatik qo'shiladigan global shartlarni chetlab o'tib, o'chirilgan yoki nofaol yozuvlarni ham olish uchun"
      },
      {
        "key": "C",
        "text": "Faqat bitta jadvalni tozalash uchun"
      },
      {
        "key": "D",
        "text": "Eloquent o'rniga xom PDO obyektini olish uchun"
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
        "text": "encode() va decode()"
      },
      {
        "key": "B",
        "text": "get() va set()"
      },
      {
        "key": "C",
        "text": "serialize() va unserialize()"
      },
      {
        "key": "D",
        "text": "read() va write()"
      }
    ],
    "correct": "B",
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
        "text": "Modelning barcha keraksiz metodlarini avtomatik o'chiradi"
      },
      {
        "key": "B",
        "text": "Muntazam ravishda eski loglar, eskirgan sessiyalar yoki vaqti o'tgan tokenlarni fonda avtomatik tozalaydi"
      },
      {
        "key": "C",
        "text": "Baza migratsiyalarini siqadi"
      },
      {
        "key": "D",
        "text": "Model indekslarini qayta quradi"
      }
    ],
    "correct": "B",
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
        "text": "Jadvaldagi barcha ustunlarga avtomatik bittadan alohida indeks ochadi"
      },
      {
        "key": "B",
        "text": "So'rovdagi barcha ustunlar (SELECT, WHERE, ORDER BY) indeksning o'zida mavjud bo'lib, diskdagi asosiy jadvalga (Clustered Index) murojaat qilish shart bo'lmaydi"
      },
      {
        "key": "C",
        "text": "Jadvalni to'liq RAM ga keshlab qo'yadi"
      },
      {
        "key": "D",
        "text": "Primary Key o'rniga ishlatiladigan maxsus indeks turi"
      }
    ],
    "correct": "B",
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
        "text": "MySQL email ustunlariga indeks qo'yishga ruxsat bermaydi"
      },
      {
        "key": "B",
        "text": "B-Tree indeksi chapdan o'ngga (Prefix) qarab saralangan bo'ladi; qidiruv satri oldida '%' bo'lsa, indeks daraxtidan foydalanib bo'lmaydi va Full Table Scan yuz beradi"
      },
      {
        "key": "C",
        "text": "LIKE operatori faqat sonli qiymatlar bilan ishlaydi"
      },
      {
        "key": "D",
        "text": "@ belgisi maxsus belgi bo'lgani sababli indeksni buzadi"
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
        "text": "Qatorni faqat o'qish uchun ochadi va boshqalarga ham o'qishga ruxsat beradi"
      },
      {
        "key": "B",
        "text": "Tanlangan qatorlarni eksklyuziv qulflaydi, tranzaksiya tugamaguncha boshqa hech qaysi tranzaksiya bu qatorlarni o'zgartira olmaydi yoki FOR UPDATE bilan o'qiy olmaydi"
      },
      {
        "key": "C",
        "text": "Qatorni bazadan o'chirib tashlaydi"
      },
      {
        "key": "D",
        "text": "Tranzaksiya vaqtini cheksiz qilib qo'yadi"
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
        "text": "Bir vaqtda ikkita foydalanuvchi bir xil qatorni o'chirib yuborishi"
      },
      {
        "key": "B",
        "text": "Boshqa tranzaksiya o'zgartirgan, lekin hali COMMIT bo'lmagan (va keyinchalik ROLLBACK bo'lishi mumkin bo'lgan) xom ma'lumotni o'qib olish"
      },
      {
        "key": "C",
        "text": "Ma'lumotlar bazasi faylining diskda buzilishi"
      },
      {
        "key": "D",
        "text": "SQL so'rovida sintaksis xato bo'lishi"
      }
    ],
    "correct": "B",
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
        "text": "Index Cardinality jadvaldagi xotira hajmi bo'lib, unga qarab indeks siqiladi"
      },
      {
        "key": "B",
        "text": "Kardinallik - ustundagi unikal qiymatlar sonidir; agar ustunda faqat 2-3 xil qiymat bo'lsa (masalan 1 mln qatordan 500 mingtasi 'active'), DB optimizatori indeksdan ko'ra jadvalni to'liq skaner qilishni tezroq deb topadi"
      },
      {
        "key": "C",
        "text": "Past kardinallik indeks yaratishda xato beradi"
      },
      {
        "key": "D",
        "text": "Faqat Foreign Key larda kardinallik hisoblanadi"
      }
    ],
    "correct": "B",
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
        "text": "Jadvaldagi barcha indekslarni qayta qurish uchun"
      },
      {
        "key": "B",
        "text": "Cheksiz ichma-ich joylashgan iyerarxik daraxtlarni (Menyular, Kategoriyalar, Xodimlar bo'ysunuvchilari) bitta so'rovda olish uchun"
      },
      {
        "key": "C",
        "text": "Tranzaksiyalarni avtomatik retry qilish uchun"
      },
      {
        "key": "D",
        "text": "Baza parolini shifrlash uchun"
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
        "text": "Partitioning bir nechta jismoniy serverlar bo'ylab bo'ladi, Sharding esa bitta server ichida"
      },
      {
        "key": "B",
        "text": "Partitioning bitta server/baza ichida bitta jadvalni qismlarga bo'ladi, Sharding esa ma'lumotlarni bir nechta alohida jismoniy serverlarga (DB instansiyalariga) tarqatadi"
      },
      {
        "key": "C",
        "text": "Ikkalasi mutlaqo bitta narsa"
      },
      {
        "key": "D",
        "text": "Sharding faqat NoSQL da bo'ladi"
      }
    ],
    "correct": "B",
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
        "text": "Bazaga ulanishni doimiy ochiq (persistent) ushlab turish"
      },
      {
        "key": "C",
        "text": "Keshni avtomatik tozalash uchun"
      },
      {
        "key": "D",
        "text": "Faqat bitta jadvalga yozishga ruxsat berish"
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
        "text": "volatile-lru butun bazani tozalaydi, allkeys-lru esa faqat bitta kalitni o'chiradi"
      },
      {
        "key": "B",
        "text": "volatile-lru faqat muddati (TTL/expire) o'rnatilgan kalitlar orasidan eng kam ishlatilganlarini o'chiradi, allkeys-lru esa istisnosiz barcha kalitlar ichidan eng kam ishlatilganlarini o'chiradi"
      },
      {
        "key": "C",
        "text": "allkeys-lru faqat sonli kalitlarni o'chiradi"
      },
      {
        "key": "D",
        "text": "volatile-lru xotira to'lganda Exception beradi"
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
        "text": "Ilova har doim keshga yozadi, kesh esa fonda bazaga yozib boradi"
      },
      {
        "key": "B",
        "text": "Ilova avval keshni tekshiradi: agar topilsa (Cache Hit) keshdan oladi; topilmasa (Cache Miss) bazadan o'qiydi, keshga yozib qo'yadi va javob qaytaradi"
      },
      {
        "key": "C",
        "text": "Baza har safar o'zgarganda avtomatik keshni yangilaydi"
      },
      {
        "key": "D",
        "text": "Kesh har 5 daqiqada o'zini to'liq o'chiradi"
      }
    ],
    "correct": "B",
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
        "text": "Pub/Sub xabarlarni diskda saqlaydi, Streams esa yo'q"
      },
      {
        "key": "B",
        "text": "Pub/Sub da xabar yuborilgan paytda qabul qiluvchi (subscriber) ulanmagan bo'lsa xabar abadiy yo'qoladi ('fire and forget'), Streams esa xabarlarni log sifatida saqlaydi va consumer kechikib ulansa ham o'qiy oladi"
      },
      {
        "key": "C",
        "text": "Streams faqat bitta obunachiga xizmat qila oladi"
      },
      {
        "key": "D",
        "text": "Pub/Sub faqat sonlarni uzatadi"
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
        "text": "Redis serveri to'satdan o'chib qolganda"
      },
      {
        "key": "B",
        "text": "Juda ommabop kesh kalitining muddati (TTL) tugashi bilan bir vaqtda kelgan minglab parallel so'rovlar birdaniga bazaga yopirilib, DB ni qulatganda"
      },
      {
        "key": "C",
        "text": "Kesh hajmi cheksiz oshib ketganda"
      },
      {
        "key": "D",
        "text": "Faqat memcached da bo'ladi"
      }
    ],
    "correct": "B",
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
        "text": "Python"
      },
      {
        "key": "B",
        "text": "JavaScript"
      },
      {
        "key": "C",
        "text": "Lua"
      },
      {
        "key": "D",
        "text": "PHP"
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
        "text": "Laravel dasturchilari buni ataylab cheklab qo'ygan"
      },
      {
        "key": "B",
        "text": "Teglash uchun ko'p o'lchovli kalitlar assotsiatsiyasi va tezkor to'plamlar (Sets) kerak, bu faqat Redis va Memcached da mavjud"
      },
      {
        "key": "C",
        "text": "Faylli tizimlar faqat rasmlarni saqlay oladi"
      },
      {
        "key": "D",
        "text": "MySQL da kesh saqlash taqiqlangan"
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
        "text": "Barcha navbatlar teng huquqli bo'lib, tasodifiy tartibda ishlanadi"
      },
      {
        "key": "B",
        "text": "Doimo 'high' navbatida biron vazifa bormi tekshiriladi; 'high' to'liq bo'shagandagina 'default', u ham bo'shagandagina 'low' navbatiga o'tiladi"
      },
      {
        "key": "C",
        "text": "Har bir navbatdan navbatma-navbat bittadan (Round-Robin) olinadi"
      },
      {
        "key": "D",
        "text": "Faqat oxirgi qo'shilgan joblar ustuvor bo'ladi (LIFO)"
      }
    ],
    "correct": "B",
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
        "text": "RabbitMQ xabarlarni hech qachon o'chirmaydi, Kafka esa o'qiydigan zahoti o'chiradi"
      },
      {
        "key": "B",
        "text": "RabbitMQ an'anaviy xabarlar navbati (Push modeli, o'qilgach o'chadi), Kafka esa doimiy taqsimlangan hodisalar jurnali (Pull modeli, o'qilgach ham saqlanadi)"
      },
      {
        "key": "C",
        "text": "Kafka faqat bitta tilda ishlaydi"
      },
      {
        "key": "D",
        "text": "RabbitMQ faqat WebSocket orqali ishlaydi"
      }
    ],
    "correct": "B",
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
        "text": "Baza parolini buzuvchi maxsus SQL buyrug'i"
      },
      {
        "key": "B",
        "text": "Formati buzilgan yoki kodni Fatal Error bilan qulatuvchi xabar bo'lib, har safar qayta urinilganda workerni o'ldiradi; uni Dead Letter Queue (DLQ) ga ajratish orqali himoyalanamiz"
      },
      {
        "key": "C",
        "text": "Navbatdagi xotirani tozalovchi maxsus buyruq"
      },
      {
        "key": "D",
        "text": "Workerning CPU quvvatini 100% ga chiqaruvchi virus"
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
        "text": "ShouldBeUnique job navbatda turganida ham, bajarilayotganida ham qulfni ushlaydi; ShouldBeUniqueUntilProcessing esa worker vazifani bajarishni BOSHLAGAN zahoti qulfni ochadi"
      },
      {
        "key": "B",
        "text": "ShouldBeUnique faqat Redisda ishlaydi"
      },
      {
        "key": "C",
        "text": "ShouldBeUniqueUntilProcessing har doim xato beradi"
      },
      {
        "key": "D",
        "text": "Ikkala interfeys ham bitta narsa"
      }
    ],
    "correct": "A",
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
        "text": "Routing key bo'yicha aniq bitta navbatga yuboradi"
      },
      {
        "key": "B",
        "text": "Routing key ga umuman qaramasdan, o'ziga ulangan BARCHA navbatlarga xabarning nusxasini tarqatadi (Broadcast)"
      },
      {
        "key": "C",
        "text": "Faqat birinchi bo'sh workerga uzatadi"
      },
      {
        "key": "D",
        "text": "Xabarni navbatlarga navbati bilan teng bo'lib beradi (Round-robin)"
      }
    ],
    "correct": "B",
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
        "text": "RabbitMQ uchun veb-monitoring paneli"
      },
      {
        "key": "B",
        "text": "Redis navbatlari uchun mo'ljallangan, avtomatik masshtablanuvchi (auto-scaling) va chiroyli veb-dashboard taqdim etuvchi paket"
      },
      {
        "key": "C",
        "text": "Faqat MySQL database queue drayveri bilan ishlaydi"
      },
      {
        "key": "D",
        "text": "AWS SQS navbatlarini boshqarish vositasi"
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
        "text": "Cookie fayllarini to'liq shifrlaydi"
      },
      {
        "key": "B",
        "text": "Uchinchi begona saytdan yuborilgan xavfli so'rovlarda (masalan, POST so'rovlarda) brauzer foydalanuvchi cookie sini qo'shib yubormaydi"
      },
      {
        "key": "C",
        "text": "JavaScript orqali cookie o'qilishini taqiqlaydi (HttpOnly kabi)"
      },
      {
        "key": "D",
        "text": "Faqat HTTPS orqali ishlashga majbur qiladi"
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
        "text": "Foydalanuvchi kiritgan harflarni o'chirib tashlaydi"
      },
      {
        "key": "B",
        "text": "SQL so'rov kodi va uzatilgan parametrlar (ma'lumotlar) alohida ajratiladi; baza ma'lumotni hech qachon bajariluvchi buyruq deb qabul qilmaydi"
      },
      {
        "key": "C",
        "text": "So'rovni bazaga yuborishdan oldin keshlab qo'yadi"
      },
      {
        "key": "D",
        "text": "Faqat sonli qiymatlar bilan ishlashga ruxsat beradi"
      }
    ],
    "correct": "B",
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
        "text": "Foydalanuvchi parolini qayta shifrlash uchun"
      },
      {
        "key": "B",
        "text": "Faqat foydalanuvchining IP manzilini tekshirish uchun"
      },
      {
        "key": "C",
        "text": "Kesh xotirasini tozalash uchun"
      },
      {
        "key": "D",
        "text": "Hujumchi oldindan bilgan yoki qurbonga o'tkazgan eski Sessiya ID raqami o'rniga butunlay yangi tasodifiy Session ID berish va eski sessiya ma'lumotlarini unga ko'chirish orqali hisob o'g'irlanishini bartaraf qilish uchun"
      }
    ],
    "correct": "D",
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
        "text": "`{!! ... !!}` xavfsizroq, chunki u avtomatik SQL Injection ni tekshiradi"
      },
      {
        "key": "B",
        "text": "`{{ ... }}` barcha maxsus belgilarni `htmlspecialchars()` orqali xavfsiz ekranlaydi (XSS dan himoya); `{!! ... !!}` esa xom HTML ni hech qanday tekshiruvsiz chiqaradi va XSS ga olib kelishi mumkin"
      },
      {
        "key": "C",
        "text": "Ular mutlaqo bir xil ishlaydi, faqat sintaktik uslub farqi bor"
      },
      {
        "key": "D",
        "text": "`{{ ... }}` faqat sonlarni, `{!! ... !!}` esa matnlarni chiqaradi"
      }
    ],
    "correct": "B",
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
        "text": "SQL Injection"
      },
      {
        "key": "B",
        "text": "XSS (Cross-Site Scripting) va ruxsatsiz begona skriptlarning yuklanishi"
      },
      {
        "key": "C",
        "text": "DDoS hujumlari"
      },
      {
        "key": "D",
        "text": "Serverning qizib ketishi"
      }
    ],
    "correct": "B",
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
        "text": "Argon2id juda tez ishlaydi va hech qanday resurs talab qilmaydi"
      },
      {
        "key": "B",
        "text": "Argon2id ham CPU, ham xotira (RAM-hardened) talab qiladi; bu esa GPU va maxsus chiplar (ASIC) yordamida parollarni ommaviy sindirishni imkonsiz qiladi"
      },
      {
        "key": "C",
        "text": "Argon2id parolni qayta tiklash (decrypt) imkonini beradi"
      },
      {
        "key": "D",
        "text": "Faqat Linux da ishlaydi"
      }
    ],
    "correct": "B",
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
        "text": "Foydalanuvchi brauzerida zararli kod ishlatiladi"
      },
      {
        "key": "B",
        "text": "Hujumchi serverga havola uzatib, serverni o'zining ichki tarmog'idagi (masalan, AWS metadata http://169.254.169.254 yoki ichki baza) maxfiy ma'lumotlarni so'rashga majbur qiladi"
      },
      {
        "key": "C",
        "text": "Serverga juda ko'p POST so'rov yuboriladi"
      },
      {
        "key": "D",
        "text": "Foydalanuvchining paroli o'g'irlanadi"
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
        "text": "Faqat parollarni majburiy 16 belgidan uzun qilish"
      },
      {
        "key": "B",
        "text": "Barcha SQL so'rovlarini avtomatik keshga olish"
      },
      {
        "key": "C",
        "text": "`preventLazyLoading()`, `preventSilentlyDiscardingAttributes()` (fillable da bo'lmagan maydonlar tashlab yuborilganda exception tashlash) va `preventAccessingMissingAttributes()`"
      },
      {
        "key": "D",
        "text": "Faqat soft deletes funksiyasini majburiy qilish"
      }
    ],
    "correct": "C",
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
        "text": "Stub faqat oldindan tayyorlangan javobni qaytaradi (State verification), Mock esa metod necha marta va qanday argumentlar bilan chaqirilganini ham qat'iy tekshiradi (Behavior verification)"
      },
      {
        "key": "B",
        "text": "Mock faqat bazaga yozadi, Stub esa o'qiydi"
      },
      {
        "key": "C",
        "text": "Stub PHPUnit da, Mock esa faqat Pest da ishlaydi"
      },
      {
        "key": "D",
        "text": "Ikkalasi mutlaqo bitta narsa"
      }
    ],
    "correct": "A",
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
        "text": "Serverning CPU va xotira quvvatini o'lchaydi"
      },
      {
        "key": "B",
        "text": "Arxitektura qoidalarini (masalan, Controllerlar faqat DTO qabul qilishi, hech kim Model ichida Request ishlatmasligi, dd() qolib ketmasligi) avtomat test sifatida tekshiradi"
      },
      {
        "key": "C",
        "text": "Ma'lumotlar bazasi jadvallarini avtomatik tuzadi"
      },
      {
        "key": "D",
        "text": "Frontend CSS stillarini testlaydi"
      }
    ],
    "correct": "B",
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
        "text": "Mutation testing faqat bazadagi xatolarni topadi"
      },
      {
        "key": "B",
        "text": "Kod satrlari shunchaki ishga tushishi (coverage) yetarli emas; Infection kod ichidagi operatorlarni ataylab teskarisiga o'zgartiradi (masalan, > ni < qiladi) va testlar buni sezib yiqilishini tekshiradi"
      },
      {
        "key": "C",
        "text": "Mutation testing testlarni 100 barobar sekinlashtirgani uchun taqiqlangan"
      },
      {
        "key": "D",
        "text": "Infection faqat PHP 7 da ishlaydi"
      }
    ],
    "correct": "B",
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
        "text": "Kod o'zgarmagan bo'lsa ham, ba'zan o'tib, ba'zan yiqiluvchi beqaror testlar (ko'pincha vaqt, tarmoq yoki ketma-ketlikka bog'liq bo'ladi)"
      },
      {
        "key": "B",
        "text": "Juda sekin ishlovchi testlar"
      },
      {
        "key": "C",
        "text": "Faqat Windows da xato beruvchi testlar"
      },
      {
        "key": "D",
        "text": "Hali yozib tugatilmagan testlar"
      }
    ],
    "correct": "A",
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
        "text": "Testlardagi barcha assertlarni o'chirib tashlash"
      },
      {
        "key": "B",
        "text": "Paralell testlash (pest --parallel) va Bcrypt xesh narxini (cost) test muhitida minimal qilib qo'yish"
      },
      {
        "key": "C",
        "text": "Faqat bitta test faylini ishga tushirish"
      },
      {
        "key": "D",
        "text": "PHP-FPM ni o'chirib qo'yish"
      }
    ],
    "correct": "B",
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
        "text": "Tarmoq ulanishini butunlay o'chirib qo'yadi"
      },
      {
        "key": "B",
        "text": "Tashqi servisga (Telegram, Stripe, SMS shlyuz) haqiqiy so'rov yubormasdan, oldindan belgilangan soxta JSON javobni qaytaradi"
      },
      {
        "key": "C",
        "text": "Baza so'rovlarini to'xtatadi"
      },
      {
        "key": "D",
        "text": "Faqat localhost ga so'rov yuborishga ruxsat beradi"
      }
    ],
    "correct": "B",
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
        "text": "Entity faqat sonlarni, Value Object esa satrlarni saqlaydi"
      },
      {
        "key": "B",
        "text": "Entity o'zining noyob identifikatoriga (ID) ega bo'ladi va vaqt o'tishi bilan o'zgarishi mumkin; Value Object esa ID ga ega bo'lmaydi, faqat o'z qiymatlari bilan aniqlanadi va o'zgarmasdir (Immutable)"
      },
      {
        "key": "C",
        "text": "Value Object faqat ma'lumotlar bazasida yashaydi"
      },
      {
        "key": "D",
        "text": "Entity va Value Object bitta narsa"
      }
    ],
    "correct": "B",
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
        "text": "Email xabarlarini tezroq yuborishni"
      },
      {
        "key": "B",
        "text": "Ma'lumotlar bazasiga yozish va navbatga (Kafka/RabbitMQ) xabar yuborish o'rtasidagi 'Dual-Write' muammosini hal qilib, xabarlar yo'qolib ketmasligini 100% kafolatlaydi"
      },
      {
        "key": "C",
        "text": "Keshni avtomatik tozalashni"
      },
      {
        "key": "D",
        "text": "Foydalanuvchi parollarini shifrlashni"
      }
    ],
    "correct": "B",
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
        "text": "Elektr quvvatini tejash uchun serverni o'chiradi"
      },
      {
        "key": "B",
        "text": "Sekinlashgan yoki qulagan tashqi xizmatga cheksiz so'rov yuborib butun tizimni osiltirib qo'ymaslik uchun, ma'lum xatolar sonidan keyin zanjirni vaqtincha uzib (Open state), zudlik bilan fallback javob qaytaradi"
      },
      {
        "key": "C",
        "text": "Baza tranzaksiyalarini commit qiladi"
      },
      {
        "key": "D",
        "text": "SQL Injection xatolarini ushlaydi"
      }
    ],
    "correct": "B",
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
        "text": "Sync va Async"
      },
      {
        "key": "B",
        "text": "Choreography (Hodisalarga asoslangan, markazsiz) va Orchestration (Markaziy orkestrator boshqaruvida)"
      },
      {
        "key": "C",
        "text": "Master va Slave"
      },
      {
        "key": "D",
        "text": "Public va Private"
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
        "text": "Tezlik yoki Xavfsizlik"
      },
      {
        "key": "B",
        "text": "Consistency (Muvofiqlik) yoki Availability (Mavjudlik)"
      },
      {
        "key": "C",
        "text": "Xotira yoki Disk"
      },
      {
        "key": "D",
        "text": "Frontend yoki Backend"
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
        "text": "Kod va ma'lumotlar bazasini turli tillarda yozish"
      },
      {
        "key": "B",
        "text": "Ma'lumotlarni o'zgartiruvchi operatsiyalarni (Command - Create/Update/Delete) va ma'lumotlarni o'quvchi operatsiyalarni (Query - Read) butunlay alohida modellar va bazalarga ajratish"
      },
      {
        "key": "C",
        "text": "Faqat navbatlar bilan ishlash"
      },
      {
        "key": "D",
        "text": "Barcha kontrollerlarni bitta joyga yig'ish"
      }
    ],
    "correct": "B",
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
        "text": "Barcha metodlar bitta argument qabul qilishi kerak"
      },
      {
        "key": "B",
        "text": "Ota sinf ob'ektini uning istalgan voris sinf ob'ekti bilan almashtirganda dasturning to'g'ri ishlashi buzilmasligi shart"
      },
      {
        "key": "C",
        "text": "Har bir sinf faqat bitta interfeysga ega bo'lishi shart"
      },
      {
        "key": "D",
        "text": "Barcha xususiyatlar private bo'lishi kerak"
      }
    ],
    "correct": "B",
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
        "text": "Faqat frontend hodisalarini (click, hover) log faylga yozish"
      },
      {
        "key": "B",
        "text": "Ma'lumotlar bazasi o'rniga faqat Redis keshini ishlatish"
      },
      {
        "key": "C",
        "text": "Barcha jadvallarni bitta umumiy jadvalga birlashtirish"
      },
      {
        "key": "D",
        "text": "Obyektning faqat joriy yakuniy holatini saqlash o'rniga, tizimda sodir bo'lgan har bir hodisani (Events) o'zgarmas (immutable) ketma-ketlik tariqasida saqlash va joriy holatni ularni qayta o'ynatish (replay) orqali tiklash"
      }
    ],
    "correct": "D",
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
        "text": "Fayllarni ZIP qilib siqadi"
      },
      {
        "key": "B",
        "text": "Birinchi bosqichda barcha og'ir vositalar (Composer, Node.js, npm, gcc) yordamida loyiha yig'iladi, yakuniy yengil bosqichga (Alpine) esa faqat tayyor kod va vendor ko'chiriladi, barcha og'ir kompilyatorlar tashlab ketiladi"
      },
      {
        "key": "C",
        "text": "Konteynerdagi loglarni o'chiradi"
      },
      {
        "key": "D",
        "text": "Faqat bitta PHP faylini saqlaydi"
      }
    ],
    "correct": "B",
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
        "text": "SIGKILL (kill -9)"
      },
      {
        "key": "B",
        "text": "SIGTERM (kill -15)"
      },
      {
        "key": "C",
        "text": "SIGSTOP"
      },
      {
        "key": "D",
        "text": "SIGHUP"
      }
    ],
    "correct": "B",
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
        "text": "static faqat Windows da ishlaydi"
      },
      {
        "key": "C",
        "text": "dynamic faqat test muhitida ishlaydi"
      },
      {
        "key": "D",
        "text": "Ikkalasi ham mutlaqo bir xil"
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
        "text": "Faqat rasmlarni tezroq yuklaydi"
      },
      {
        "key": "B",
        "text": "Bitta TCP/UDP ulanish orqali bir vaqtning o'zida yuzlab so'rovlarni parallel uzatish (Multiplexing) va Head-of-Line Blocking muammosini yo'qotish"
      },
      {
        "key": "C",
        "text": "Parollarni talab qilmaslik"
      },
      {
        "key": "D",
        "text": "Nginx konfiguratsiyasini talab qilmaslik"
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
        "text": "Liveness podni o'chiradi, Readiness yangilaydi"
      },
      {
        "key": "B",
        "text": "Liveness podning tirikligini tekshiradi (agar o'lib qolsa, qayta ishga tushiradi); Readiness esa pod yangi trafikni qabul qilishga tayyormi yoki yo'qligini tekshiradi (tayyor bo'lmasa unga trafik yo'naltirmaydi)"
      },
      {
        "key": "C",
        "text": "Ikkalasi bir xil tekshiruv bajaradi"
      },
      {
        "key": "D",
        "text": "Readiness faqat Docker Compose da ishlaydi"
      }
    ],
    "correct": "B",
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
        "text": "Server narxini 2 barobar arzonlashtiradi"
      },
      {
        "key": "B",
        "text": "Yangi versiya alohida parallel muhitda (Green) to'liq tayyorlanadi va trafik bir soniyada unga o'tkaziladi; xatolik yuz bersa bir zumda orqaga (Blue ga) qaytish (Zero-Downtime Rollback) mumkin bo'ladi"
      },
      {
        "key": "C",
        "text": "Faqat ma'lumotlar bazasini yangilaydi"
      },
      {
        "key": "D",
        "text": "Git komandalarini talab qilmaydi"
      }
    ],
    "correct": "B",
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
        "text": "Faqat POST va PATCH"
      },
      {
        "key": "B",
        "text": "GET, PUT, DELETE, HEAD va OPTIONS"
      },
      {
        "key": "C",
        "text": "Faqat GET va POST"
      },
      {
        "key": "D",
        "text": "Barcha HTTP metodlari doimo idempotent bo'ladi"
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
        "text": "401 server xatosi, 403 esa mijoz xatosi hisoblanadi"
      },
      {
        "key": "B",
        "text": "401 faqat POST so'rovlarida, 403 esa faqat GET so'rovlarida beriladi"
      },
      {
        "key": "C",
        "text": "401 — mijoz kimligi noma'lum (autentifikatsiyadan o'tmagan); 403 — mijoz autentifikatsiyadan o'tgan, ammo ushbu resursga ruxsati (huquqi) yo'q"
      },
      {
        "key": "D",
        "text": "Ular orasida farq yo'q, ikkalasi ham xuddi bir xil ma'noni bildiradi"
      }
    ],
    "correct": "C",
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
        "text": "Faqat mijoz tomondan (localStorage) tokenni o'chirib tashlash kifoya, serverda hech narsa qilish shart emas"
      },
      {
        "key": "B",
        "text": "JWT stateless bo'lgani sababli tokenni amal qilish muddati tugaguncha bekor qilish mutlaqo imkonsiz"
      },
      {
        "key": "C",
        "text": "Barcha foydalanuvchilarning parolini majburiy o'zgartirish"
      },
      {
        "key": "D",
        "text": "Tokenning 'jti' (JWT ID) identifikatorini qora ro'yxatga (Redis Blacklist) qolgan amal qilish muddatiga saqlash yoki foydalanuvchi jadvalida `token_version` ustunini oshirish"
      }
    ],
    "correct": "D",
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
        "text": "Mijoz ilovalari 'client_secret' ni xavfsiz saqlay olmaydi (Public Client), PKCE esa dinamik `code_verifier` va `code_challenge` orqali kod o'g'irlanishining oldini oladi"
      },
      {
        "key": "B",
        "text": "Faqat serverlar o'rtasida API chaqiruvlarini tezlashtirish uchun"
      },
      {
        "key": "C",
        "text": "PKCE orqali barcha ma'lumotlar bazasiz to'g'ridan-to'g'ri shifrlanadi"
      },
      {
        "key": "D",
        "text": "Implicit Grant oqimi xavfsizroq bo'lgani sababli PKCE faqat zaxira sifatida ishlatiladi"
      }
    ],
    "correct": "A",
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
        "text": "Sanctum faqat MySQL bilan ishlaydi, Passport esa faqat PostgreSQL bilan ishlaydi"
      },
      {
        "key": "B",
        "text": "Passport bepul, Sanctum esa faqat pullik Laravel Forge obunachilari uchun"
      },
      {
        "key": "C",
        "text": "Sanctum — yengil shaxsiy tokenlar (PAT) va SPA uchun cookie-based session auth beradi; Passport esa to'liq OAuth2 server (grantlar, scopes, client credentials) hisoblanadi"
      },
      {
        "key": "D",
        "text": "Sanctum eskirgan bo'lib, uning o'rniga faqat Passport tavsiya etiladi"
      }
    ],
    "correct": "C",
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
        "text": "Faqat foydalanuvchining login/parolini bazaga shifrlash uchun"
      },
      {
        "key": "B",
        "text": "Tarmoq uzilishlari tufayli takroriy (retry) yuborilgan to'lov yoki buyurtma so'rovlarida mablag' ikki marta yechilishi yoki dublikat yozuvlar yaratilishining oldini oladi"
      },
      {
        "key": "C",
        "text": "API tezligini oshirish maqsadida Gzip siqishni yoqadi"
      },
      {
        "key": "D",
        "text": "Foydalanuvchining IP manzilini bloklaydi"
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
        "text": "Faqat bir xil domen ichidagi oddiy GET so'rovlarida"
      },
      {
        "key": "B",
        "text": "Faqat veb-saytda HTTPS o'rnatilmagan bo'lsa"
      },
      {
        "key": "C",
        "text": "Faqat mijoz interneti uzilib qolganda"
      },
      {
        "key": "D",
        "text": "So'rov 'Simple Request' talablariga mos kelmasa (masalan, `Content-Type: application/json`, maxsus Authorization headeri yoki PUT/DELETE/PATCH metodlari ishlatilganda)"
      }
    ],
    "correct": "D",
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
        "text": "`Retry-After`, `X-RateLimit-Limit` va `X-RateLimit-Remaining`"
      },
      {
        "key": "B",
        "text": "`Cache-Control` va `ETag`"
      },
      {
        "key": "C",
        "text": "`Content-Security-Policy` va `X-Frame-Options`"
      },
      {
        "key": "D",
        "text": "`Location` va `Set-Cookie`"
      }
    ],
    "correct": "A",
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
        "text": "Brauzer manzil satriga yozish osonroq bo'ladi"
      },
      {
        "key": "B",
        "text": "Resurs identifikatori (URI) o'zgarmas qoladi va haqiqiy REST tamoyiliga (Content Negotiation) mos keladi"
      },
      {
        "key": "C",
        "text": "Hech qanday routing sozlamalari talab qilinmaydi"
      },
      {
        "key": "D",
        "text": "Baza so'rovlarini avtomatik 2 baravar tezlashtiradi"
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
        "text": "`PUT` faqat yangi ma'lumot kiritadi, `PATCH` faqat o'chiradi"
      },
      {
        "key": "B",
        "text": "`PUT` xavfsiz (safe) metod, `PATCH` esa xavfli metod hisoblanadi"
      },
      {
        "key": "C",
        "text": "`PUT` resursni butunlay to'liq almashtirish (full replacement) uchun; `PATCH` esa resursning faqat ma'lum maydonlarini qisman yangilash (partial update) uchun ishlatiladi"
      },
      {
        "key": "D",
        "text": "Ikkalasi mutlaqo bir xil va xohlaganini almashtirib ishlataverish mumkin"
      }
    ],
    "correct": "C",
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
        "text": "`Queueable`"
      },
      {
        "key": "B",
        "text": "`AsyncJobInterface`"
      },
      {
        "key": "C",
        "text": "`Dispatchable`"
      },
      {
        "key": "D",
        "text": "`ShouldQueue`"
      }
    ],
    "correct": "D",
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
        "text": "`queue:listen` faqat Redis bilan ishlaydi, `queue:work` esa faqat Database bilan ishlaydi"
      },
      {
        "key": "B",
        "text": "`queue:work` butun freymvorkni xotiraga 1 marta yuklaydi (daemon) va yuqori unumdorlik beradi; `queue:listen` esa har bir job uchun freymvorkni qaytadan yuklaydi (local dev uchun qulay)"
      },
      {
        "key": "C",
        "text": "`queue:work` faqat bitta job bajarib to'xtaydi, `queue:listen` esa to'xtovsiz ishlaydi"
      },
      {
        "key": "D",
        "text": "Production da doimo `queue:listen` ishlatilishi shart"
      }
    ],
    "correct": "B",
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
        "text": "Faqat database drayverida timeout ishlatilganda"
      },
      {
        "key": "B",
        "text": "Faqat job ichida sleep() funksiyasi ishlatilganda"
      },
      {
        "key": "C",
        "text": "Agar `retry_after` vaqti `timeout` dan kichik yoki unga teng bo'lsa (masalan timeout=90, retry_after=60), birinchi worker hali jobni tugatmasdan, ikkinchi worker uni qayta olib bajarishga tushadi"
      },
      {
        "key": "D",
        "text": "Agar tries soni 1 dan katta bo'lsa"
      }
    ],
    "correct": "C",
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
        "text": "Tarmoq yoki server uzilishlari sababli bir xil job bir necha marta qayta bajarilsa ham, yakuniy tizim holati faqat bir marta bajarilgandek to'g'ri qolishi"
      },
      {
        "key": "B",
        "text": "Job faqat tunda soat 00:00 da bajarilishi"
      },
      {
        "key": "C",
        "text": "Job hech qachon xatolik (Exception) tashlamasligi"
      },
      {
        "key": "D",
        "text": "Job faqat bitta CPU yadrosida ishlashi"
      }
    ],
    "correct": "A",
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
        "text": "PHP ning global massivida tekshiriladi"
      },
      {
        "key": "B",
        "text": "Faqat fayllar tizimida .lock fayl yaratiladi"
      },
      {
        "key": "C",
        "text": "Baza jadvalida auto_increment ustun orqali"
      },
      {
        "key": "D",
        "text": "Kesh drayveri (odatda Redis Lock) orqali `uniqueId()` bo'yicha lock olinadi va job muvaffaqiyatli tugaguncha (yoki timeoutgacha) dublikatlar bloklanadi"
      }
    ],
    "correct": "D",
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
        "text": "`Bus::chain([...])` (Job Chaining)"
      },
      {
        "key": "B",
        "text": "`Artisan::call('queue:work')`"
      },
      {
        "key": "C",
        "text": "`Bus::batch([...])` (Job Batching)"
      },
      {
        "key": "D",
        "text": "`Event::dispatch()`"
      }
    ],
    "correct": "C",
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
        "text": "Jobni faqat ertasi kuni ertalab soat 9:00 da bajaradi"
      },
      {
        "key": "B",
        "text": "Vazifani navbat drayveriga (Redis/DB) jo'natmasdan, HTTP javob mijozga (brauzerga) yuborilib ulanish uzilgach, shu jarayonning o'zida darhol bajaradi"
      },
      {
        "key": "C",
        "text": "Faqat xatolik yuz bergandagina javob qaytaradi"
      },
      {
        "key": "D",
        "text": "Faqat AJAX so'rovlarida ishlaydi"
      }
    ],
    "correct": "B",
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
        "text": "Faqat serverdagi php.ini faylida memory_limit=-1 qilinishi kerak"
      },
      {
        "key": "C",
        "text": "Worker ichida har bir siklda unset($GLOBALS) chaqirilishi shart"
      },
      {
        "key": "D",
        "text": "Buning chorasi yo'q, faqat har kecha serverni o'chirib yoqish kerak"
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
        "text": "Job bajarilishi uchun ajratilgan maksimal vaqt chegarasi"
      },
      {
        "key": "B",
        "text": "Navbatda 30, 60 va 120 ta worker bir vaqtda ishlashi"
      },
      {
        "key": "C",
        "text": "Ushbu job faqat 30 foiz ehtimollik bilan bajarilishi"
      },
      {
        "key": "D",
        "text": "Agar job xatolik bilan yiqilsa, 1-qayta urinish 30 soniyadan so'ng, 2-qayta urinish 60 soniyadan so'ng, 3-qayta urinish 120 soniyadan so'ng amalga oshiriladi (Exponential Backoff)"
      }
    ],
    "correct": "D",
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
        "text": "Muvaffaqiyatli bajarilgan barcha vazifalarni doimiy arxivlash uchun"
      },
      {
        "key": "B",
        "text": "Barcha qayta urinishlardan (max retries) keyin ham yiqilgan yoki 'zaharli' (poison pill) xabarlarni asosiy navbatdan ajratib olib, tizimni to'xtatib qo'ymaslik va muammoni alohida tahlil qilish uchun"
      },
      {
        "key": "C",
        "text": "Elektron pochtalarni (Email) o'chirish uchun maxsus pochta qutisi"
      },
      {
        "key": "D",
        "text": "Baza jadvallarini tozalash uchun triggerlar to'plami"
      }
    ],
    "correct": "B",
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
        "text": "Faqat ma'lumotlar bazasi ulanishini sessiyaga bog'lash uchun"
      },
      {
        "key": "B",
        "text": "Bitta interfeysga turli klasslar (controller/service) murojaat qilganda, har biriga alohida boshqa-boshqa implementatsiyalarni inyekt qilish uchun"
      },
      {
        "key": "C",
        "text": "Barcha dependency larni avtomatik global Singleton qilish uchun"
      },
      {
        "key": "D",
        "text": "Controller metodlarida avtomatik tranzaksiya ochish uchun"
      }
    ],
    "correct": "B",
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
        "text": "Fasadlar klassning oddiy statik metodlar to'plami bo'lib, Service Container bilan bog'lanmagan"
      },
      {
        "key": "B",
        "text": "Fasadlar faqat Eloquent modellari uchun mo'ljallangan maxsus xususiyatdir"
      },
      {
        "key": "C",
        "text": "Fasadlar `__callStatic()` sehrli metodi orqali `getFacadeAccessor()` qaytargan kalit bo'yicha Service Container dan obyektni resolve qiladi va unga dinamik metod chaqiruvini yo'naltiradi"
      },
      {
        "key": "D",
        "text": "Fasadlar har chaqirilganda yangi PHP jarayonini ishga tushiradi"
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
        "text": "Faqat ma'lumotlar bazasi jadvallariga indeks qo'shish uchun"
      },
      {
        "key": "B",
        "text": "HTML sahifalarni avtomatik siqish uchun"
      },
      {
        "key": "C",
        "text": "Fayllarni serverga yuklash tezligini oshiradi"
      },
      {
        "key": "D",
        "text": "Laravelning ichki klasslariga (masalan `Response`, `Collection`, `Str`, `Request`) o'z xususiy metodlarimizni runtime paytida qo'shish (kengaytirish) imkonini beradi"
      }
    ],
    "correct": "D",
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
        "text": "HTTP javob brauzerga (mijozga) to'liq yetkazib berilib, ulanish yopilgandan so'ng, fon rejimida og'ir loglash yoki statistikani saqlash uchun bajariladi"
      },
      {
        "key": "B",
        "text": "Faqat so'rov paytida fatal xatolik yuz bergandagina"
      },
      {
        "key": "C",
        "text": "Controller metodiga kirmasdan oldin"
      },
      {
        "key": "D",
        "text": "Faqat foydalanuvchi tizimdan chiqqan paytda"
      }
    ],
    "correct": "A",
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
        "text": "Faqat server xotirasi to'lib qolganda shunday bo'ladi"
      },
      {
        "key": "B",
        "text": "Chunki .env fayli faqat testing muhitida o'qiladi"
      },
      {
        "key": "C",
        "text": "`config:cache` bajarilgach, performance uchun .env fayli o'qilmaydi va barcha qiymatlar faqat `config('app.some_key')` orqali olinishi shart"
      },
      {
        "key": "D",
        "text": "Bu Laravelning xatosi (bug) hisoblanadi"
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
        "text": "Faqat fayl keshida ishlaydi, Redisda ishlamaydi"
      },
      {
        "key": "B",
        "text": "Kesh hajmini avtomatik 10 baravar qisqartiradi"
      },
      {
        "key": "C",
        "text": "Faqat bitta tag berish mumkin, massiv berib bo'lmaydi"
      },
      {
        "key": "D",
        "text": "Teglar orqali bir-biriga bog'liq kesh yozuvlarini guruhlab tozalash mumkin, ammo bu xususiyat `file` va `database` drayverlarida ishlamaydi (faqat Redis, Memcached va h.k. da ishlaydi)"
      }
    ],
    "correct": "D",
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
        "text": "Faqat database seederlarida"
      },
      {
        "key": "B",
        "text": "HTTP Middleware zanjiri va ko'p bosqichli buyurtma/to'lov qayta ishlash logikasida"
      },
      {
        "key": "C",
        "text": "Faqat Blade shablonlarini kompilyatsiya qilishda"
      },
      {
        "key": "D",
        "text": "Fayllarni zip arxiv qilishda"
      }
    ],
    "correct": "B",
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
        "text": "Gate faqat API uchun, Policy esa faqat Web formalar uchun ishlatiladi"
      },
      {
        "key": "B",
        "text": "Gate avtomatik barcha ruxsatlarni beradi, Policy esa taqiqlaydi"
      },
      {
        "key": "C",
        "text": "Policy muayyan Model atrofida (User, Post) CRUD huquqlarini guruhlaydi; Gate esa odatda modelga bog'liq bo'lmagan umumiy harakatlar (masalan admin-panelga kirish) uchun ishlatiladi"
      },
      {
        "key": "D",
        "text": "Policy eskirgan bo'lib, o'rniga faqat Gate ishlatiladi"
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
        "text": "Faqat server o'chib qolganda zaxira serverga yo'naltiradi"
      },
      {
        "key": "C",
        "text": "Barcha POST so'rovlarini avtomatik GET ga o'giradi"
      },
      {
        "key": "D",
        "text": "Baza tranzaksiyasini orqaga qaytaradi (rollback)"
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
        "text": "Faqat internet tezligi past bo'lganda yuklanadi"
      },
      {
        "key": "B",
        "text": "Provayderni ertasi kuni ertalab soat 9:00 gacha kechiktiradi"
      },
      {
        "key": "C",
        "text": "Ma'lumotlar bazasini asinxron yuklash uchun ishlatiladi"
      },
      {
        "key": "D",
        "text": "`DeferrableProvider` interfeysi va `provides()` metodi orqali: ushbu provayder har bir so'rovda yuklanmasdan, faqat uning xizmatiga haqiqiy ehtiyoj paydo bo'lgandagina (on-demand) xotiraga yuklanadi"
      }
    ],
    "correct": "D",
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
        "text": "Faqat ma'lumotlar bazasi migratsiyalarini tekshirish uchun"
      },
      {
        "key": "B",
        "text": "Validatsiya qoidalari (rules) bajarilishidan oldin mijozdan kelgan ma'lumotlarni tozalash, formatlash (masalan telefon raqamidan bo'shliqlarni olib tashlash) yoki yangi maydon qo'shish uchun"
      },
      {
        "key": "C",
        "text": "Faqat fayllarni virusga qarshi tekshirish uchun"
      },
      {
        "key": "D",
        "text": "Validatsiyadan o'tgan ma'lumotlarni darhol JSON ga o'girish uchun"
      }
    ],
    "correct": "B",
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
        "text": "Closure (anonim funksiya) asosidagi routelar (masalan `Route::get('/test', fn() => 'ok')`), chunki PHP closure larni xavfsiz serializatsiya qila olmaydi"
      },
      {
        "key": "B",
        "text": "Faqat POST metodidagi routelar"
      },
      {
        "key": "C",
        "text": "Faqat kontrollerga ulangan routelar"
      },
      {
        "key": "D",
        "text": "Hech qanday route xatolik bermaydi"
      }
    ],
    "correct": "A",
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
        "text": "Barcha eventlarni ma'lumotlar bazasiga yozib boradi"
      },
      {
        "key": "B",
        "text": "Faqat Redis pub/sub orqali ishlaydi"
      },
      {
        "key": "C",
        "text": "`EventServiceProvider` da qo'lda `$listen` massivini to'ldirmasdan, `app/Listeners` papkasidagi klasslarning `handle(SomeEvent $event)` metodining type-hintiga qarab avtomatik bog'laydi"
      },
      {
        "key": "D",
        "text": "Faqat frontend WebSocketlar uchun ishlaydi"
      }
    ],
    "correct": "C",
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
        "text": "Har bir kanal uchun alohida 3 ta klass ochish shart"
      },
      {
        "key": "B",
        "text": "Notification klassidagi `via($notifiable)` metodi ichida `return ['mail', 'database', 'vonage'];` massivini qaytarish orqali"
      },
      {
        "key": "C",
        "text": "Faqat queue worker orqali 3 ta alohida komanda yuboriladi"
      },
      {
        "key": "D",
        "text": "Laravel bir vaqtda faqat bitta kanalga yuborishni qo'llab-quvvatlaydi"
      }
    ],
    "correct": "B",
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
        "text": "Faqat IP manzil bo'yicha cheksiz qulflash"
      },
      {
        "key": "B",
        "text": "Faqat fayllar hajmini tekshirish uchun"
      },
      {
        "key": "C",
        "text": "Database jadvalidagi qatorlar sonini cheklash uchun"
      },
      {
        "key": "D",
        "text": "`RateLimiter::for('api', fn($req) => $req->user()?->isVip() ? Limit::none() : Limit::perMinute(60)->by($req->user()?->id ?: $req->ip()))`"
      }
    ],
    "correct": "D",
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
        "text": "Amazon S3 kabi bulutli xotiralarda yopiq (private) fayllarni vaqtincha xavfsiz yuklab olish uchun imzolangan maxsus URL (Pre-signed URL) generatsiya qilish uchun"
      },
      {
        "key": "B",
        "text": "Faqat lokal diskdagi fayllarni 1 daqiqaga keshga olish uchun"
      },
      {
        "key": "C",
        "text": "Faylni serverdan o'chirish uchun taymer qo'yish"
      },
      {
        "key": "D",
        "text": "Faqat rasm fayllarining hajmini kichraytirish"
      }
    ],
    "correct": "A",
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
        "text": "Ikkalasi ham bir xil qavslarsiz yoziladi"
      },
      {
        "key": "B",
        "text": "Argumentlar faqat raqam, optsiyalar faqat matn bo'lishi shart"
      },
      {
        "key": "C",
        "text": "Argumentlar: `{user}`, `{user?}`; Optsiyalar (flags): `{--queue=}`, `{--silent}`"
      },
      {
        "key": "D",
        "text": "Faqat fayl nomlari orqali belgilanadi"
      }
    ],
    "correct": "C",
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
        "text": "Faqat login sahifasiga yo'naltirish uchun"
      },
      {
        "key": "B",
        "text": "Har qanday boshqa tekshiruvdan oldin ishga tushib, masalan 'Super Admin' foydalanuvchilarga barcha huquqlarni to'g'ridan-to'g'ri tasdiqlash (grant all) uchun"
      },
      {
        "key": "C",
        "text": "Faqat parollarni tekshirish uchun"
      },
      {
        "key": "D",
        "text": "Barcha foydalanuvchilarning sessiyasini o'chirish uchun"
      }
    ],
    "correct": "B",
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
        "text": "Eski versiyalardagi `Http/Kernel.php`, `Console/Kernel.php` va bir qancha provayderlar olib tashlanib, routing, middleware va exception handling to'g'ridan-to'g'ri `bootstrap/app.php` ichida zanjirli (chained fluent methods) orqali sozlanadi"
      },
      {
        "key": "B",
        "text": "Barcha sozlamalar faqat .env faylida qilinadi"
      },
      {
        "key": "C",
        "text": "Faqat XML formatiga o'tkazildi"
      },
      {
        "key": "D",
        "text": "Hech narsa o'zgarmagan, Laravel 10 bilan bir xil"
      }
    ],
    "correct": "A",
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
        "text": "Faqat videolarni translatsiya qilish"
      },
      {
        "key": "B",
        "text": "HTML sahifalarni PDF ga aylantirish"
      },
      {
        "key": "C",
        "text": "Ma'lumotlar bazasidagi xom qiymatni o'qiyotganda (`get`) maxsus Value Object ga aylantirish va saqlayotganda (`set`) uni yana bazaga mos formatga o'girish"
      },
      {
        "key": "D",
        "text": "Baza jadvallarini o'chirish"
      }
    ],
    "correct": "C",
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
        "text": "PresenceChannel shifrlanmagan ochiq kanal hisoblanadi"
      },
      {
        "key": "B",
        "text": "PrivateChannel faqat HTTP orqali, PresenceChannel esa faqat SMS orqali ishlaydi"
      },
      {
        "key": "C",
        "text": "Ikkalasi mutlaqo bir xil"
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
        "text": "`php artisan route:list --clean`"
      },
      {
        "key": "B",
        "text": "`php artisan route:list -v` (yoki `--verbose`)"
      },
      {
        "key": "C",
        "text": "`php artisan route:list --no-middleware`"
      },
      {
        "key": "D",
        "text": "`php artisan route:list --sql`"
      }
    ],
    "correct": "B",
    "explanation": "php artisan route:list buyrug'iga -v yoki -vv qo'shilsa, har bir yo'nalishga qaysi middleware lar (auth, throttle, custom middleware) biriktirilgani aniq ro'yxatda ko'rsatiladi."
  }
];
