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
    "question": "PHP da 'final class' yoki 'final public function' yozish nimani kafolatlaydi?",
    "options": [
      {
        "key": "A",
        "text": "Sinfning xususiyatlari faqat bir marta yoziladi va o'zgarmas bo'ladi"
      },
      {
        "key": "B",
        "text": "Sinfdan boshqa sinf meros ololmaydi (extends) yoki metodni voris sinfda qayta yozib bo'lmaydi (override)"
      },
      {
        "key": "C",
        "text": "Sinf faqat bitta instansiyaga ega bo'ladi (Singleton)"
      },
      {
        "key": "D",
        "text": "Metod faqat statik usulda chaqirilishi shart bo'ladi"
      }
    ],
    "correct": "B",
    "explanation": "final kalit so'zi sinf oldiga qo'yilsa - unga merosxo'rlik qilish (extends) taqiqlanadi. Metod oldiga qo'yilsa - voris sinf uni qayta yozishi (override qilishi) man etiladi.",
    "level": "junior"
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
    "categoryLabel": "Laravel asoslari",
    "skillSlug": "laravel",
    "question": "Production serverda 'php artisan config:cache' buyrug'i bajarilgandan so'ng, kod ichidagi 'env('APP_DEBUG')' chaqiruvi nima qaytaradi?",
    "options": [
      {
        "key": "A",
        "text": ".env faylidagi haqiqiy qiymatni qaytaradi"
      },
      {
        "key": "B",
        "text": "Har doim null qaytaradi, chunki .env fayli endi o'qilmaydi"
      },
      {
        "key": "C",
        "text": "Fatal Error beradi"
      },
      {
        "key": "D",
        "text": "Standart qiymat sifatida har doim true qaytaradi"
      }
    ],
    "correct": "B",
    "explanation": "config:cache bajarilgach, Laravel .env faylini o'qishni to'xtatadi va faqat keshdagi konfiguratsiyalarni yuklaydi. Shu sababli kod ichida env() null qaytaradi, har doim config('app.debug') ishlatish shart.",
    "level": "junior"
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
    "category": "database",
    "categoryLabel": "Database va SQL",
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
    "category": "database",
    "categoryLabel": "Database va SQL",
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
    "category": "database",
    "categoryLabel": "Database va SQL",
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
    "category": "database",
    "categoryLabel": "Database va SQL",
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
    "category": "database",
    "categoryLabel": "Database va SQL",
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
    "category": "database",
    "categoryLabel": "Database va SQL",
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
    "category": "database",
    "categoryLabel": "Database va SQL",
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
    "category": "database",
    "categoryLabel": "Database va SQL",
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
    "category": "async",
    "categoryLabel": "Asinxron arxitektura",
    "skillSlug": "queues-and-background-jobs",
    "question": "Navbatdagi vazifalarda (Queues) 'Idempotent Job' nima degani?",
    "options": [
      {
        "key": "A",
        "text": "Faqat bir marta bajarilib, qayta hech qachon ishlatib bo'lmaydigan job"
      },
      {
        "key": "B",
        "text": "Tarmoq xatosi yoki qayta urinish sababli bitta job necha marta (1 marta yoki 10 marta) bajarilishidan qat'i nazar, yakuniy natija bir xil bo'lishi va dublikat yaratmasligi"
      },
      {
        "key": "C",
        "text": "Faqat bitta worker tomonidan bajariladigan job"
      },
      {
        "key": "D",
        "text": "Hech qanday argument qabul qilmaydigan job"
      }
    ],
    "correct": "B",
    "explanation": "Navbat tizimlarida 'At-Least-Once Delivery' kafolati bor, ya'ni job ikki marta kelib qolishi mumkin. Idempotent job - masalan, pul yechishda buyurtma holatini 'processed' ekanini tekshirib, ikkinchi marta pul yechishning oldini oluvchi xavfsiz koddir.",
    "level": "junior"
  },
  {
    "id": "t-async-2",
    "category": "async",
    "categoryLabel": "Asinxron arxitektura",
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
    "category": "async",
    "categoryLabel": "Asinxron arxitektura",
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
    "category": "async",
    "categoryLabel": "Asinxron arxitektura",
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
    "category": "async",
    "categoryLabel": "Asinxron arxitektura",
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
    "category": "async",
    "categoryLabel": "Asinxron arxitektura",
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
    "skillSlug": "web-application-security",
    "question": "CORS (Cross-Origin Resource Sharing) da Preflight so'rovi qaysi HTTP metodi orqali yuboriladi?",
    "options": [
      {
        "key": "A",
        "text": "GET"
      },
      {
        "key": "B",
        "text": "HEAD"
      },
      {
        "key": "C",
        "text": "OPTIONS"
      },
      {
        "key": "D",
        "text": "POST"
      }
    ],
    "correct": "C",
    "explanation": "Brauzer begona domenga noan'anaviy (masalan, JSON body yoki Authorization sarlavhali) so'rov yuborishdan oldin avtomatik tarzda HTTP OPTIONS metodi bilan Preflight so'rovini yuboradi va serverning ruxsatini tekshiradi.",
    "level": "middle"
  },
  {
    "id": "t-sec-4",
    "category": "security",
    "categoryLabel": "Xavfsizlik",
    "skillSlug": "web-application-security",
    "question": "JWT (JSON Web Token) autentifikatsiyasida foydalanuvchi parolini o'zgartirganda eski tokenni qanday bekor qilish (Invalidate) mumkin?",
    "options": [
      {
        "key": "A",
        "text": "JWT o'z-o'zidan darhol o'chib ketadi"
      },
      {
        "key": "B",
        "text": "JWT stateless bo'lgani uchun uni serverdan bekor qilib bo'lmaydi; buning uchun Redisda qora ro'yxat (Blacklist) yuritish yoki foydalanuvchi modelidagi 'token_version' ni oshirish kerak"
      },
      {
        "key": "C",
        "text": "Brauzer keshini tozalash kifoya"
      },
      {
        "key": "D",
        "text": "Laravel config faylini o'zgartirish kerak"
      }
    ],
    "correct": "B",
    "explanation": "JWT ning asosiy kamchiligi - uning muddati tugamaguncha server uni to'xtata olmasligidir. Shuning uchun paroli o'zgargan foydalanuvchilarning tokenlarini Redis Blacklist ga kiritish yoki qisqa umrli Access Token (15 min) + Refresh Token ishlatiladi.",
    "level": "senior"
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
    "skillSlug": "web-application-security",
    "question": "OAuth 2.0 da Single Page Application (SPA) lar uchun nega PKCE (Proof Key for Code Exchange) majburiy qilingan?",
    "options": [
      {
        "key": "A",
        "text": "Brauzerda Client Secret ni xavfsiz yashirib bo'lmaydi (har qanday foydalanuvchi kodni ko'ra oladi)"
      },
      {
        "key": "B",
        "text": "PKCE parollarni bazaga yozmaydi"
      },
      {
        "key": "C",
        "text": "Faqat mobil ilovalarda ishlashi uchun"
      },
      {
        "key": "D",
        "text": "OAuth 2.0 eskirgani uchun"
      }
    ],
    "correct": "A",
    "explanation": "Brauzer (Vue/React) ochiq mijozdir, unda Client Secret saqlansa hamma uni ko'ra oladi. PKCE dinamik ravishda bitta so'rov uchun maxfiy verifier va uning heshini (Code Challenge) yasab, tokenni o'g'irlanishdan himoya qiladi.",
    "level": "senior"
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
    "skillSlug": "system-design",
    "question": "To'lov tizimlari API integratsiyasida 'Idempotency-Key' sarlavhasi (Header) qanday xatoni oldini oladi?",
    "options": [
      {
        "key": "A",
        "text": "Tarmoq uzilishi yoki foydalanuvchining tugmani bir necha marta bosishi tufayli bitta buyurtma uchun hisobdan takroran (ikki marta) pul yechilishini"
      },
      {
        "key": "B",
        "text": "Foydalanuvchi parolini tekshiradi"
      },
      {
        "key": "C",
        "text": "Pul valyutasini almashtiradi"
      },
      {
        "key": "D",
        "text": "Bank foizini hisoblaydi"
      }
    ],
    "correct": "A",
    "explanation": "Mijoz so'rov bilan birga UUID yuboradi. Agar server so'rovni bajarib, javob mijozga yetib bormasdan tarmoq uzilsa va mijoz qayta so'rov yuborsa, server Idempotency-Key bo'yicha pulni qayta yechmasdan, avvalgi muvaffaqiyatli natijani qaytaradi.",
    "level": "senior"
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
  }
];
