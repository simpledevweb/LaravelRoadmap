/* Chuqur dars: 2.29. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("2.29", {
  "lesson": [
    "### Broadcasting",
    "Server hodisalarini **real vaqtda** brauzerga yuborish (WebSocket): chat, bildirishnoma, jonli dashboard.",
    "",
    "### Qismlar",
    "- **Server hodisasi:** `implements ShouldBroadcast` (yoki `ShouldBroadcastNow`).",
    "- **Kanal:** public (`Channel`), private (`PrivateChannel`, autentifikatsiya), presence (`PresenceChannel`, kim online).",
    "- **Driver:** **Laravel Reverb** (birinchi tomon WebSocket server, L11+), Pusher, Ably, Soketi.",
    "- **Mijoz:** **Laravel Echo** (JS) + Pusher protokoli.",
    "",
    "### Laravel Reverb",
    "`php artisan install:broadcasting` (Reverb va kerakli fayllarni o'rnatadi), `php artisan reverb:start`. Pusher protokoli bilan mos, masshtablash Redis pub/sub orqali. Production: `supervisor`, Nginx proksi (wss), `--debug` faqat dev.",
    "",
    "### Hodisa",
    "```php",
    "class MessageSent implements ShouldBroadcast {",
    "  public function __construct(public Message $m) {}",
    "  public function broadcastOn(): array { return [new PrivateChannel(\"chat.{$this->m->room_id}\")]; }",
    "}",
    "```",
    "`broadcastWith()` (payload), `broadcastAs()` (nom).",
    "",
    "### Kanal avtorizatsiyasi",
    "`routes/channels.php`: `Broadcast::channel('chat.{roomId}', fn (User $u, int $roomId) => $u->rooms->contains($roomId))`.",
    "",
    "### Echo (JS)",
    "`Echo.private('chat.1').listen('MessageSent', (e) => ...)`, `Echo.join('room')` (presence).",
    "",
    "### Queue",
    "`ShouldBroadcast` hodisalari queue orqali yuboriladi: **queue worker** ishlab turishi kerak (yoki `ShouldBroadcastNow`).",
    "",
    "### Xavfsizlik va masshtab",
    "Private kanallarni doim avtorizatsiya qiling; payload'da maxfiy ma'lumot yubormang (kanalga obuna bo'lgan hamma ko'radi); ulanishlar sonini cheklash va monitoring."
  ],
  "examples": [
    {
      "title": "Hodisa va kanal",
      "lang": "php",
      "code": [
        "final class OrderStatusChanged implements ShouldBroadcast",
        "{",
        "    public function __construct(public Order $order) {}",
        "    public function broadcastOn(): array { return [new PrivateChannel(\"orders.{$this->order->user_id}\")]; }",
        "    public function broadcastWith(): array { return ['id' => $this->order->id, 'status' => $this->order->status->value]; }",
        "}",
        "// routes/channels.php",
        "Broadcast::channel('orders.{userId}', fn (User $u, int $userId) => $u->id === $userId);"
      ]
    }
  ],
  "pitfalls": [
    "Queue worker ishlamasa `ShouldBroadcast` hodisalari yuborilmaydi.",
    "Private kanalni avtorizatsiyasiz qoldirish boshqalarning ma'lumotini o'qishga yo'l ochadi.",
    "Payload'ga maxfiy ma'lumot qo'yish: kanalga obuna bo'lganlarning hammasi ko'radi.",
    "Reverb ortida wss/proksi sozlanmasa production'da ulanish uziladi."
  ]
});
