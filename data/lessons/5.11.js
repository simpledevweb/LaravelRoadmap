/* Chuqur dars: 5.11. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("5.11", {
  "lesson": [
    "### Repository",
    "**Repository** — domen obyektlariga **kolleksiyadek** kirishni beradi va saqlash tafsilotini (SQL, Eloquent, API) yashiradi: `find()`, `save()`, `remove()`, `findByEmail()`. Domen mantiq ma'lumotlar bazasini bilmaydi (DIP).",
    "",
    "### Foydasi",
    "- Test: `InMemoryRepository` (tez, DB'siz).",
    "- Saqlash joyini almashtirish (MySQL → API → kesh).",
    "- So'rov mantiqini bir joyda to'plash (nomli so'rovlar).",
    "",
    "### Interface domen tomonida",
    "`OrderRepository` interface domen/ilova qatlamida, `EloquentOrderRepository` infratuzilmada. Bog'lash provider'da.",
    "",
    "### Laravel'da munozara",
    "Eloquent o'zi Active Record va allaqachon repository-ga o'xshash (`Order::find`). Har modelga Repository qatlami qo'shish ko'pincha **ortiqcha** (YAGNI) va Eloquent imkoniyatlarini yashiradi. Foydali bo'lgan holatlar:",
    "- Domen mantiq Eloquent'dan mustaqil bo'lishi kerak (DDD).",
    "- Murakkab so'rovlarni nomlab izolyatsiya qilish.",
    "- Bir nechta saqlash manbai.",
    "Muqobil: **Query obyektlari**, **scope**lar.",
    "",
    "### Qoidalar",
    "- Repository **agregat ildiz**ga bog'liq (har jadvalga emas).",
    "- Biznes mantiq repository'da emas, domenda.",
    "- `save($aggregate)`; qisman update uchun aniq metod.",
    "- Domen obyektini qaytaring (Eloquent model sizdirilmasin, agar DDD bo'lsa).",
    "",
    "### Unit of Work",
    "Bir nechta repository o'zgarishini bitta tranzaksiyaga yig'adi (keyingi mavzu)."
  ],
  "examples": [
    {
      "title": "Interface va implementatsiya",
      "lang": "php",
      "code": [
        "interface OrderRepository",
        "{",
        "    public function find(int $id): ?Order;",
        "    public function save(Order $o): void;",
        "    /** @return list<Order> */ public function pendingFor(int $userId): array;",
        "}",
        "",
        "final class EloquentOrderRepository implements OrderRepository",
        "{",
        "    public function find(int $id): ?Order { $m = OrderModel::find($id); return $m ? Order::fromModel($m) : null; }",
        "    public function save(Order $o): void { OrderModel::updateOrCreate(['id' => $o->id], $o->toArray()); }",
        "    public function pendingFor(int $u): array { return OrderModel::where('user_id', $u)->where('status', 'pending')->get()->map(fn ($m) => Order::fromModel($m))->all(); }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Har Eloquent modelga Repository qo'shish ko'pincha ortiqcha: Eloquent o'zi kifoya bo'lishi mumkin.",
    "Repository ichiga biznes mantiq yozish domenni anemik qiladi.",
    "Eloquent query builder'ni repository'dan tashqariga qaytarish abstraksiyani sizdiradi.",
    "`all()` bilan katta kolleksiyalarni qaytarish xotirani to'ldiradi: paginatsiya/lazy."
  ]
});
