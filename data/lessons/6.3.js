/* Chuqur dars: 6.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("6.3", {
  "lesson": [
    "### Bog'liq mavzu",
    "Clean Code kontekstida SRP kodning har darajasida qo'llaniladi: funksiya, klass, modul, paket. (Tamoyilning to'liq tahlili SOLID'ning SRP mavzusida.)",
    "",
    "### Darajalar",
    "- **Funksiya:** bitta ish. ",
    "- **Klass:** o'zgarish uchun bitta sabab, yuqori cohesion.",
    "- **Modul/paket:** bitta biznes imkoniyat (Billing, Catalog).",
    "- **Servis:** bitta chegaralangan kontekst.",
    "",
    "### Tez tekshiruv",
    "1. Klass vazifasini bitta jumlada \"va\" siz aytib bera olamanmi?",
    "2. Yangi talab kelganda shu klass nechta turli sabab bilan o'zgaradi?",
    "3. Test uchun nechta mock kerak?",
    "",
    "### Laravel misollari",
    "Model — ma'lumot va munosabatlar; `Action` — bitta amal; `FormRequest` — validatsiya; `Resource` — javob shakli; `Job` — fon vazifasi; `Policy` — ruxsat. Har biri bitta mas'uliyat.",
    "",
    "### Past cohesion belgilari",
    "`UserHelper`, `Utils`, `CommonService`, `Manager` kabi umumiy nomli klasslar; metodlar bir-biri bilan bog'liq emas.",
    "",
    "### Kompozitsiya orkestrator",
    "Katta klassni bo'lgach, asl klass bo'laklarni chaqiruvchi yupqa orkestrator bo'lib qoladi.",
    "",
    "### Ehtiyot",
    "SRP'ni klass sonini ko'paytirish maqsadi deb olmang. Maqsad — o'zgarishni lokal va xavfsiz qilish."
  ],
  "examples": [
    {
      "title": "Mas'uliyatlarni ajratish",
      "lang": "php",
      "code": [
        "final class RegisterUserAction { public function __invoke(array $d): User { /* faqat ro'yxatdan o'tkazish */ } }",
        "final class StoreUserRequest extends FormRequest { public function rules(): array { return ['email' => 'required|email|unique:users', 'password' => 'required|min:8']; } }",
        "final class UserResource extends JsonResource { public function toArray($r): array { return ['id' => $this->id, 'email' => $this->email]; } }"
      ]
    }
  ],
  "pitfalls": [
    "`Helper`/`Utils` klasslari mas'uliyatsiz yig'indi bo'lib, o'sib ketadi.",
    "Klass sonini ko'paytirish maqsad emas: o'zgarish sabablarini ajrating.",
    "Bir klass ham mantiq, ham saqlash, ham taqdimotga mas'ul bo'lsa — SRP buzilgan.",
    "Kichik klasslar orasida mantiqiy bog'liqlik yo'qolsa, papka/namespace tuzilmasi bilan guruhlang."
  ]
});
