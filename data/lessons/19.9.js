/* Chuqur dars: 19.9. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("19.9", {
  "lesson": [
    "### Yagona filtr tili",
    "18.10 da filtrlash va saralash mexanizmlari ko'rildi. Dizayn bosqichida butun API uchun **bitta sintaksis** tanlanadi va har endpoint uchun nima ruxsat etilgani hujjatlanadi.",
    "",
    "### Sintaksis",
    "Keng tarqalgan va o'qiladigan variant:",
    "- **Tenglik:** `filter[status]=paid`.",
    "- **IN (bir nechta qiymat):** `filter[status]=paid,shipped`.",
    "- **Operatorlar:** `filter[total][gte]=100000`, `filter[created_at][lt]=2025-07-01`. Operatorlar to'plami: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `contains`, `starts_with`.",
    "- **Null:** `filter[deleted_at][null]=true`.",
    "- **Qidiruv:** `filter[q]=ali`.",
    "- **Saralash:** `sort=-created_at,id`.",
    "",
    "Muqobillar (RSQL, OData `$filter`, GraphQL) kuchliroq, lekin murakkab. Ko'p biznes API'lar uchun yuqoridagi sintaksis yetarli.",
    "",
    "### Har endpoint uchun hujjat",
    "| Filtr | Operatorlar | Indeks |",
    "|---|---|---|",
    "| `status` | eq, in | `(status, created_at)` |",
    "| `customer_id` | eq | `(customer_id, created_at)` |",
    "| `created_at` | gte, lt | `(created_at)` |",
    "| `total` | gte, lte | — (faqat boshqa filtr bilan) |",
    "",
    "Saralash: `created_at`, `total`. Default: `-created_at`.",
    "",
    "### Performance bilan bog'liqlik",
    "**Har bir ruxsat etilgan filtr va saralash indeks bilan qo'llab-quvvatlanishi kerak.** Aks holda bitta mijozning `?sort=note` so'rovi millionlab qatorni saralaydi va DB'ni yiqitadi. Yangi filtr qo'shish = yangi indeks yoki aniq tushuntirilgan cheklov (masalan, \"`total` faqat `created_at` diapazoni bilan birga\").",
    "",
    "Matn bo'yicha erkin qidiruv (`contains`, `%x%`) B-tree indeks bilan ishlamaydi (16.6). Uni full-text, `pg_trgm` yoki tashqi qidiruv tizimi (Meilisearch, Elasticsearch) bilan alohida endpoint qiling.",
    "",
    "### Validatsiya va oq ro'yxat",
    "Ruxsat etilmagan filtr, operator yoki saralash maydoni — `400` yoki `422` va qaysi biri ruxsat etilgani haqida xabar. Jim e'tiborsiz qoldirish mijoz xatolarini yashiradi va u noto'g'ri natijani to'g'ri deb hisoblaydi.",
    "",
    "### Qiymat formatlari",
    "- Sana: ISO 8601. `lt` bilan yarim ochiq diapazon tavsiya etiladi (`created_at[gte]=2025-06-01&created_at[lt]=2025-07-01`).",
    "- Enum: API'dagi string qiymatlar.",
    "- Boolean: `true`/`false` (yoki `1`/`0`, lekin bittasi).",
    "- Ro'yxat: vergul bilan."
  ],
  "examples": [
    {
      "title": "So'rovlar",
      "lang": "text",
      "code": [
        "GET /v1/orders?filter[status]=paid,shipped",
        "              &filter[total][gte]=100000",
        "              &filter[created_at][gte]=2025-06-01&filter[created_at][lt]=2025-07-01",
        "              &sort=-created_at",
        "",
        "GET /v1/orders?filter[note][contains]=urgent",
        "-> 400 {\"code\": \"filter_not_allowed\", \"message\": \"note filtri qo'llanmaydi\", \"allowed\": [\"status\", \"customer_id\", \"created_at\", \"total\"]}"
      ]
    },
    {
      "title": "Operatorli filtrni Eloquent'ga xavfsiz o'girish",
      "lang": "php",
      "code": [
        "final class FilterApplier",
        "{",
        "    private const OPERATORS = ['eq' => '=', 'ne' => '!=', 'gt' => '>', 'gte' => '>=', 'lt' => '<', 'lte' => '<='];",
        "",
        "    /** @param array<string, list<string>> $allowed  field => operators */",
        "    public function apply(Builder $query, array $filters, array $allowed): Builder",
        "    {",
        "        foreach ($filters as $field => $value) {",
        "            abort_unless(isset($allowed[$field]), 400, \"Filtr ruxsat etilmagan: {$field}\");",
        "",
        "            $conditions = is_array($value) ? $value : ['in' => $value];",
        "",
        "            foreach ($conditions as $op => $v) {",
        "                abort_unless(in_array($op, $allowed[$field], true), 400, \"Operator ruxsat etilmagan: {$field}[{$op}]\");",
        "",
        "                $op === 'in'",
        "                    ? $query->whereIn($field, explode(',', $v))",
        "                    : $query->where($field, self::OPERATORS[$op], $v);",
        "            }",
        "        }",
        "",
        "        return $query;",
        "    }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "Indekssiz maydonlar bo'yicha filtr yoki saralashga ruxsat berish.",
    "Ruxsat etilmagan parametrlarni jim e'tiborsiz qoldirish.",
    "Har endpoint'da boshqacha filtr sintaksisi.",
    "Erkin matn qidiruvini oddiy `LIKE '%x%'` filtri sifatida taklif qilish."
  ]
});
