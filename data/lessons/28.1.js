/* Chuqur dars: 28.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("28.1", {
  "lesson": [
    "### Integratsiya chegarasi nima",
    "Integratsiya chegarasi — sizning kodingiz o'zingiz yozmagan tizim bilan uchrashadigan joy: repository va DB, cache servisi va Redis, job va navbat, to'lov adapteri va tashqi API, fayl servisi va S3. Integratsion test aynan shu uchrashuvni tekshiradi: sizning kodingiz tashqi tizim bilan **haqiqatan** til topishadimi.",
    "",
    "### Nega unit test yetmaydi",
    "Unit testda dependency mock qilinadi, shuning uchun test faqat \"men mock'dan shu javobni kutaman\" degan taxminni tasdiqlaydi. Taxmin noto'g'ri bo'lsa, test yashil, production esa qizil bo'ladi. Integratsion test mock'lar yashiradigan xatolarni ushlaydi:",
    "- SQL sintaksisi va DB'ga xos xatti-harakat (collation, JSON operatorlari, constraint'lar);",
    "- migratsiya va model orasidagi nomuvofiqlik (ustun nomi, tip, nullable);",
    "- serializatsiya: job payload, cache qiymati, JSON javob;",
    "- konfiguratsiya: noto'g'ri driver, prefiks, timeout.",
    "",
    "### Chegarani qanday belgilash",
    "Qoida oddiy: **sof mantiq** unit testlanadi, **adapter** integratsion testlanadi. Hexagonal (ports and adapters) arxitekturada bu ajratish tabiiy. Domen xizmati interfeys (port) orqali ishlaydi, adapter esa shu interfeysni haqiqiy tizim ustida amalga oshiradi.",
    "- Domen (`OrderService`): qoidalar, hisob-kitoblar. Unit test, tez, mock/fake bilan.",
    "- Adapter (`EloquentOrderRepository`, `PaymeGateway`, `S3ReceiptStorage`): tashqi tizim bilan gaplashadi. Integratsion test, haqiqiy yoki juda yaqin muhit bilan.",
    "",
    "Adapter qancha **yupqa** bo'lsa, integratsion testlar shuncha kam va sodda bo'ladi. Adapter ichida biznes qoidasi bo'lsa, uni domenga ko'chiring: shunda qoida tez unit testlanadi, adapter esa faqat \"tarjima\" qiladi.",
    "",
    "### Test piramidasidagi o'rni",
    "Integratsion testlar unit testlardan sekin va murakkabroq, lekin end-to-end testlardan tez va barqarorroq. Yaxshi nisbat: ko'p unit, o'rtacha integratsion (har chegara uchun asosiy yo'llar va xato holatlari), kam end-to-end. Har chegara uchun \"baxtli yo'l\" va 2–3 ta xato holati (timeout, constraint buzilishi, bo'sh javob) odatda yetarli.",
    "",
    "### Laravel'da amaliyot",
    "Laravel'da Feature test ko'pincha butun stekni (route, middleware, controller, DB) ishlatadi. Bu ham integratsion test, faqat keng ko'lamli. Siz tor integratsion testlarni (faqat repository + DB) alohida yozsangiz, yiqilganda sababni topish osonlashadi."
  ],
  "examples": [
    {
      "title": "Port va adapter",
      "lang": "php",
      "code": [
        "interface OrderRepository",
        "{",
        "    public function save(Order $order): void;",
        "    public function findOrFail(OrderId $id): Order;",
        "}",
        "",
        "// Domen unit testda fake bilan ishlaydi",
        "final class InMemoryOrderRepository implements OrderRepository { /* ... */ }",
        "",
        "// Adapter esa integratsion testda haqiqiy DB bilan sinaladi",
        "final class EloquentOrderRepository implements OrderRepository { /* ... */ }"
      ],
      "note": "Domen interfeysga bog'liq. Adapter'ning to'g'riligini faqat haqiqiy DB bilan tekshirish mumkin."
    },
    {
      "title": "Adapter integratsion testi",
      "lang": "php",
      "code": [
        "it('saves and reloads an order with its lines', function () {",
        "    $repo = app(EloquentOrderRepository::class);",
        "    $order = Order::new(OrderId::generate(), lines: [Line::of('sku-1', 2, 15_000)]);",
        "",
        "    $repo->save($order);",
        "",
        "    $loaded = $repo->findOrFail($order->id());",
        "    expect($loaded->total())->toEqual($order->total())",
        "        ->and($loaded->lines())->toHaveCount(1);",
        "});"
      ],
      "note": "Test domen mantig'ini emas, saqlash va qayta o'qish zanjirini (mapping, ustun tiplari) tekshiradi."
    }
  ],
  "pitfalls": [
    "Hamma narsani mock qilib, \"integratsion test\" deb atash: haqiqiy tizim ishtirok etmasa, bu unit test.",
    "Adapter ichiga biznes qoidasini yozib qo'yish: qoida faqat sekin integratsion testda tekshiriladigan bo'lib qoladi.",
    "Chegara yoniga yetarli xato holati yozmaslik: baxtli yo'l yashil bo'ladi, timeout va constraint xatolari esa productionda aniqlanadi.",
    "Har integratsion testni butun ilova ustidan (HTTP orqali) yozish: yiqilganda sabab qayerda ekanini topish qiyin."
  ]
});
