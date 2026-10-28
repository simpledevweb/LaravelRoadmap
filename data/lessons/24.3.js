/* Chuqur dars: 24.3. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("24.3", {
  "lesson": [
    "### Nega imzo",
    "Webhook endpoint'i ochiq: internetdagi har kim unga `{\"type\": \"payment.succeeded\", \"order_id\": 42}` yuborib, buyurtmani to'langan deb belgilashi mumkin. Imzo so'rov **haqiqatan provayderdan** kelgani va yo'lda **o'zgartirilmagani**ni isbotlaydi.",
    "",
    "### Odatiy sxemalar",
    "1. **HMAC** (24.4) — eng keng tarqalgan. Provayder va siz umumiy secret'ni bilasiz. Provayder `HMAC-SHA256(secret, signed_payload)` ni header'da yuboradi, siz qayta hisoblab solishtirasiz. Stripe, GitHub, Shopify, Slack, Click (MD5 asosida), ko'plab boshqalar.",
    "2. **Asimmetrik imzo:** provayder shaxsiy kalit bilan imzolaydi, siz ochiq kalit bilan tekshirasiz. Secret'ni saqlash shart emas. PayPal, AWS SNS (sertifikat bilan), Twilio (ba'zi rejimlar), Standard Webhooks spetsifikatsiyasining asimmetrik varianti.",
    "3. **Basic Auth yoki statik token header'da:** zaifroq (replay'dan himoya yo'q, body imzolanmaydi), lekin ba'zi provayderlar (Payme Merchant API, Telegram `secret_token`) shunday ishlaydi.",
    "4. **mTLS:** bank integratsiyalarida.",
    "",
    "### To'g'ri tekshiruv tartibi",
    "1. **Xom body'ni oling:** `$request->getContent()`. Parse qilingan va qayta encode qilingan JSON'dan emas: bo'shliqlar, kalitlar tartibi, Unicode escape'lar farq qiladi va imzo mos kelmaydi.",
    "2. **Imzolanadigan satrni provayder hujjatidagidek yasang:** ko'pincha `timestamp + \".\" + body` yoki `id + \".\" + timestamp + \".\" + body`.",
    "3. **Kutilgan imzoni hisoblang** to'g'ri secret va algoritm bilan.",
    "4. **Konstant vaqtli taqqoslash:** `hash_equals($expected, $received)`. `==` yoki `===` emas, vaqt farqi orqali imzoni bayt-bayt topish mumkin.",
    "5. **Vaqtni tekshiring** (24.5) va kerak bo'lsa, ID bo'yicha replay (24.6).",
    "6. Muvaffaqiyatsiz bo'lsa: `401` yoki `403`, body'ni qayta ishlamang, log'ga yozing (body'ning o'zini emas, faqat metadata'ni).",
    "",
    "### Bir nechta imzo va secret rotatsiyasi",
    "Ko'p provayderlar secret almashtirish davrida header'da bir nechta imzoni (`v1=...,v1=...`) yuboradi. Kamida **bittasi** mos kelsa, qabul qiling. O'zingizda ham bir vaqtda eski va yangi secret'ni saqlay oling.",
    "",
    "### Laravel'da",
    "- **`spatie/laravel-webhook-client`** — tayyor: imzo validatori, hodisani DB'ga saqlash, job'ga uzatish.",
    "- Provayder SDK'lari ko'pincha tayyor tekshiruvchi beradi (`\\Stripe\\Webhook::constructEvent()`).",
    "- O'zingiz yozsangiz — middleware sifatida, har provayder uchun konfiguratsiya bilan."
  ],
  "examples": [
    {
      "title": "Umumiy HMAC imzo middleware'i",
      "lang": "php",
      "code": [
        "final class VerifyWebhookSignature",
        "{",
        "    public function handle(Request $request, Closure $next, string $provider): Response",
        "    {",
        "        $config = config(\"webhooks.{$provider}\");",
        "        $body = $request->getContent();",
        "        $timestamp = (string) $request->header('X-Webhook-Timestamp');",
        "        $header = (string) $request->header('X-Webhook-Signature');   // \"v1=abc,v1=def\"",
        "",
        "        $received = collect(explode(',', $header))",
        "            ->map(fn ($p) => trim(Str::after($p, 'v1=')))",
        "            ->filter();",
        "",
        "        $valid = collect($config['secrets'])->contains(function (string $secret) use ($timestamp, $body, $received) {",
        "            $expected = hash_hmac('sha256', \"{$timestamp}.{$body}\", $secret);",
        "            return $received->contains(fn ($sig) => hash_equals($expected, $sig));",
        "        });",
        "",
        "        if (! $valid) {",
        "            Log::warning('Webhook signature invalid', ['provider' => $provider, 'ip' => $request->ip()]);",
        "            abort(401);",
        "        }",
        "",
        "        return $next($request);",
        "    }",
        "}"
      ],
      "note": "`secrets` massivi rotatsiya davrida eski va yangi secret'ni birga saqlash uchun. Vaqt tekshiruvi 24.5 da."
    },
    {
      "title": "Stripe SDK bilan",
      "lang": "php",
      "code": [
        "try {",
        "    $event = \\Stripe\\Webhook::constructEvent(",
        "        $request->getContent(),",
        "        $request->header('Stripe-Signature'),",
        "        config('services.stripe.webhook_secret'),",
        "        300,   // tolerance soniyalarda",
        "    );",
        "} catch (\\Stripe\\Exception\\SignatureVerificationException) {",
        "    abort(400);",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Imzoni parse qilingan va qayta encode qilingan JSON ustida hisoblash: hech qachon mos kelmaydi.",
    "`==` bilan imzo solishtirish.",
    "Imzo muvaffaqiyatsiz bo'lsa ham, \"log uchun\" payload'ni qayta ishlash.",
    "Secret rotatsiyasi uchun bir nechta secret qo'llamaslik: almashtirish paytida webhook'lar yo'qoladi."
  ]
});
