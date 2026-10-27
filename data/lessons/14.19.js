/* Chuqur dars: 14.19. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("14.19", {
  "lesson": [
    "### Nomlash qoidalari",
    "Izchil nomlash sxemani o'qish va qo'llab-quvvatlashni osonlashtiradi. Laravel konvensiyalari (Eloquent bilan moslik):",
    "",
    "### Jadvallar",
    "- `snake_case`, ko'plik: `users`, `order_lines`, `blog_posts`.",
    "- **Pivot:** ikkala singular, alifbo tartibida: `post_tag`, `role_user`.",
    "- Prefikslarsiz (yoki modul prefiksi: `billing_invoices`).",
    "",
    "### Ustunlar",
    "- `snake_case`, birlik: `first_name`, `created_at`.",
    "- **PK:** `id`.",
    "- **FK:** `{singular_jadval}_id` (`user_id`, `category_id`); o'z-o'ziga: `parent_id`.",
    "- **Vaqt:** `*_at` (`created_at`, `paid_at`, `deleted_at`), sana: `*_on` yoki `*_date`.",
    "- **Bool:** `is_*`, `has_*` (`is_active`).",
    "- **Polimorf:** `commentable_type`, `commentable_id`.",
    "- Birlik, qisqartmasiz, ma'noli.",
    "",
    "### Indekslar va constraint'lar",
    "Aniq nom: `idx_orders_user_id_created_at`, `uq_users_email`, `fk_orders_user_id`, `chk_products_price`. (Laravel avtomatik `jadval_ustun_index` nomlaydi; qisqa/uzun nomga e'tibor — MySQL 64 belgi.)",
    "",
    "### Ta'qiqlar",
    "- Zaxira so'zlar (`order`, `group`, `key`, `desc`) — `orders`, `groups` (ko'plik yordam beradi), aks holda backtick.",
    "- Bo'shliq, katta-kichik aralash (Linux'da registr sezgir).",
    "- Venger notatsiyasi (`tblUsers`, `strName`).",
    "- `data`, `info`, `value` kabi ma'nosiz.",
    "",
    "### Izchillik",
    "Bir loyihada bitta uslub; mavjud DB'ga qo'shilganda uning uslubiga amal qiling.",
    "",
    "### Hujjat",
    "ER diagramma, `COMMENT` ustun/jadvalga, ma'lumot lug'ati.",
    "",
    "### Laravel",
    "Model nomi birlik PascalCase (`OrderLine`) → jadval `order_lines`; boshqa nom uchun `$table`, `$primaryKey`."
  ],
  "examples": [
    {
      "title": "Izchil nomlash",
      "lang": "sql",
      "code": [
        "CREATE TABLE order_lines (",
        "  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,",
        "  order_id BIGINT UNSIGNED NOT NULL,",
        "  product_id BIGINT UNSIGNED NOT NULL,",
        "  is_gift TINYINT(1) NOT NULL DEFAULT 0,",
        "  created_at TIMESTAMP NULL,",
        "  CONSTRAINT fk_order_lines_order_id FOREIGN KEY (order_id) REFERENCES orders(id),",
        "  KEY idx_order_lines_product_id (product_id)",
        ");"
      ]
    }
  ],
  "pitfalls": [
    "Zaxira so'zlar (`order`, `group`) jadval nomi sifatida backtick talab qiladi: ko'plik (`orders`).",
    "Linux'da jadval nomi registrga sezgir: faqat `snake_case` kichik harf.",
    "Ma'nosiz nomlar (`data`, `value`) sxemani tushunarsiz qiladi.",
    "Bir loyihada ikki xil uslub (camelCase va snake_case) chalkashlik beradi."
  ]
});
