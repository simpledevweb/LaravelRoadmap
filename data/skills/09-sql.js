/* 09 · SQL
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 9,
  slug: "sql",
  title: "SQL",
  group: "database",
  description: "SQL — relyatsion ma'lumotlar bazalari tili. ORM qanchalik qulay bo'lmasin, Senior dasturchi Eloquent qanday SQL yaratayotganini ko'ra olishi, murakkab hisobotlarni to'g'ridan-to'g'ri SQL'da yozishi, tranzaksiya va lock'larni tushunishi hamda sekin so'rovlarni tahlil qila olishi shart.",
  subskills: [
    {
      id: "9.1",
      title: "SELECT, INSERT, UPDATE, DELETE",
      description: [
        "CRUD'ning to'rt asosiy buyrug'i. `SELECT` — ma'lumot o'qish (kerakli ustunlarni aniq sanab, `SELECT *` siz); `INSERT` — qo'shish (bir nechta qator bitta so'rovda); `UPDATE` va `DELETE` — doim `WHERE` bilan (shartsiz `UPDATE` butun jadvalni o'zgartiradi).",
        "",
        "Xavfsizlik odati: muhim `UPDATE`/`DELETE` dan oldin xuddi shu `WHERE` bilan `SELECT COUNT(*)` qilish, tranzaksiya ichida bajarib natijani tekshirish. MySQL'da `INSERT ... ON DUPLICATE KEY UPDATE`, PostgreSQL'da `INSERT ... ON CONFLICT` (upsert).",
        "",
        "```sql",
        "INSERT INTO users (name, email) VALUES ('Ali', 'ali@ex.uz'), ('Vali', 'vali@ex.uz');",
        "UPDATE orders SET status = 'cancelled' WHERE status = 'pending' AND created_at < NOW() - INTERVAL 3 DAY;",
        "```"
      ],
      priority: "core",
      level: "Foundation",
      practicalTask: "Upsert yordamida mahsulot narxlarini import qiladigan SQL yozing (MySQL va PostgreSQL varianti).",
      acceptanceCriteria: [
        "`UPDATE/DELETE` ni xavfsiz bajarish odatiga ega",
        "Upsert sintaksisini ikkala DB'da biladi"
      ],
      prerequisites: []
    },
    {
      id: "9.2",
      title: "WHERE, ORDER BY, GROUP BY, HAVING",
      description: [
        "Bajarilish tartibi (mantiqiy): `FROM/JOIN` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `ORDER BY` → `LIMIT`. Shu sabab `WHERE` da agregat ishlatib bo'lmaydi — u guruhlashdan oldin ishlaydi; agregat shartlari `HAVING` ga yoziladi.",
        "",
        "`GROUP BY` da SELECT'dagi agregat bo'lmagan ustunlar guruhda bo'lishi kerak (MySQL `ONLY_FULL_GROUP_BY` rejimi). `ORDER BY` ga indeks yordam berishi mumkin; unikal bo'lmagan ustun bo'yicha tartiblash pagination'da beqaror natija beradi — ikkinchi kalit (`id`) qo'shing.",
        "",
        "```sql",
        "SELECT customer_id, COUNT(*) AS orders, SUM(total) AS revenue",
        "FROM orders",
        "WHERE created_at >= '2025-01-01'",
        "GROUP BY customer_id",
        "HAVING SUM(total) > 1000000",
        "ORDER BY revenue DESC, customer_id;",
        "```"
      ],
      priority: "core",
      level: "Foundation",
      practicalTask: "Har oy bo'yicha eng ko'p sotgan 5 ta mijozni chiqaradigan so'rov yozing.",
      acceptanceCriteria: [
        "Mantiqiy bajarilish tartibini ayta oladi",
        "`WHERE` va `HAVING` farqini tushuntira oladi"
      ],
      prerequisites: [
        "9.1"
      ]
    },
    {
      id: "9.3",
      title: "JOIN turlari",
      description: [
        "- `INNER JOIN` — ikkala jadvalda mos qatorlar.",
        "- `LEFT JOIN` — chap jadvalning hammasi + mos o'ng (yo'q bo'lsa `NULL`).",
        "- `RIGHT JOIN` — aksi (odatda LEFT bilan almashtiriladi).",
        "- `FULL OUTER JOIN` — ikkalasining hammasi (MySQL'da yo'q, UNION bilan).",
        "- `CROSS JOIN` — dekart ko'paytma.",
        "- Self join — jadvalni o'zi bilan.",
        "",
        "Tuzoq: `LEFT JOIN` dan keyin o'ng jadval ustuniga `WHERE` sharti qo'yilsa, u amalda `INNER JOIN` ga aylanadi — shartni `ON` ga ko'chiring. \"Mos yozuvi yo'qlar\"ni topish: `LEFT JOIN ... WHERE b.id IS NULL` yoki `NOT EXISTS`.",
        "",
        "```sql",
        "SELECT u.id, u.name",
        "FROM users u",
        "LEFT JOIN orders o ON o.user_id = u.id AND o.created_at >= '2025-01-01'",
        "WHERE o.id IS NULL;  -- bu yil buyurtma bermaganlar",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Hech qachon buyurtma bermagan mijozlarni 3 xil usulda (LEFT JOIN, NOT EXISTS, NOT IN) toping va farqini tahlil qiling.",
      acceptanceCriteria: [
        "LEFT JOIN + WHERE tuzog'ini tushuntira oladi",
        "`NOT IN` ning NULL bilan muammosini biladi"
      ],
      prerequisites: [
        "9.2"
      ]
    },
    {
      id: "9.4",
      title: "Subqueries",
      description: [
        "Subquery — so'rov ichidagi so'rov: skalyar (bitta qiymat), qator to'plami (`IN`, `EXISTS`), jadval (`FROM (...) AS t` — derived table). **Correlated** subquery tashqi so'rov ustuniga tayanadi va har bir qator uchun qayta baholanishi mumkin.",
        "",
        "`EXISTS` birinchi mos qatorni topgach to'xtaydi — mavjudlikni tekshirishda `IN`/`COUNT` dan samaraliroq bo'lishi mumkin. Zamonaviy optimizatorlar ko'p subquery'larni JOIN'ga aylantiradi, lekin `EXPLAIN` bilan tekshirish kerak. Laravel: `whereExists`, `whereIn(fn ($q) => ...)`, `addSelect` bilan subquery.",
        "",
        "```sql",
        "SELECT p.*,",
        "       (SELECT MAX(o.created_at) FROM orders o WHERE o.product_id = p.id) AS last_sold_at",
        "FROM products p",
        "WHERE EXISTS (SELECT 1 FROM reviews r WHERE r.product_id = p.id AND r.rating >= 4);",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Har bir foydalanuvchining oxirgi buyurtma sanasini Eloquent `addSelect` subquery bilan oling (N+1 siz).",
      acceptanceCriteria: [
        "Correlated va oddiy subquery farqini biladi",
        "`EXISTS` va `IN` ni qachon tanlashni asoslay oladi"
      ],
      prerequisites: [
        "9.3"
      ]
    },
    {
      id: "9.5",
      title: "CTE (`WITH`)",
      description: [
        "Common Table Expression — so'rov boshida nomlangan vaqtinchalik natija to'plami. Murakkab so'rovni o'qiladigan bosqichlarga ajratadi va bir natijani bir necha marta ishlatish imkonini beradi. MySQL 8+ va PostgreSQL qo'llab-quvvatlaydi.",
        "",
        "**Recursive CTE** daraxtsimon ma'lumotlar uchun: kategoriya ierarxiyasi, tashkiliy tuzilma, izohlar zanjiri. PostgreSQL 12+ da CTE inline qilinadi (`MATERIALIZED` bilan majburlash mumkin).",
        "",
        "```sql",
        "WITH RECURSIVE tree AS (",
        "    SELECT id, parent_id, name, 1 AS depth FROM categories WHERE parent_id IS NULL",
        "    UNION ALL",
        "    SELECT c.id, c.parent_id, c.name, t.depth + 1",
        "    FROM categories c JOIN tree t ON c.parent_id = t.id",
        ")",
        "SELECT * FROM tree ORDER BY depth;",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Kategoriya daraxtini recursive CTE bilan oling va Laravel'da `DB::select` orqali ishlating.",
      acceptanceCriteria: [
        "CTE va subquery o'rtasida o'qiluvchanlik bo'yicha tanlay oladi",
        "Recursive CTE'ning anchor va recursive qismlarini tushuntira oladi"
      ],
      prerequisites: [
        "9.4"
      ]
    },
    {
      id: "9.6",
      title: "Window Functions",
      description: [
        "Window funksiyalari qatorlarni guruhlamasdan, \"oyna\" ichida hisob qiladi: `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `LAG()`/`LEAD()`, `SUM() OVER`, `FIRST_VALUE()`. `PARTITION BY` — oynani bo'lish, `ORDER BY` — tartib, `ROWS BETWEEN` — ramka.",
        "",
        "Klassik masalalar: har guruhdagi top-N, yig'ma summa (running total), oldingi davr bilan solishtirish, dublikatlarni topish. GROUP BY + self join'dan ancha sodda va tez.",
        "",
        "```sql",
        "SELECT *",
        "FROM (",
        "    SELECT o.*, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY created_at DESC) AS rn",
        "    FROM orders o",
        ") t",
        "WHERE rn = 1;  -- har mijozning oxirgi buyurtmasi",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Oylik daromad, oldingi oy bilan farq (`LAG`) va yig'ma summani bitta so'rovda hisoblang.",
      acceptanceCriteria: [
        "`ROW_NUMBER`, `RANK` va `DENSE_RANK` farqini biladi",
        "Top-N-per-group masalasini window bilan yecha oladi"
      ],
      prerequisites: [
        "9.2"
      ]
    },
    {
      id: "9.7",
      title: "Aggregate Functions",
      description: [
        "Agregat funksiyalar qatorlar to'plamidan bitta qiymat qaytaradi: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, hamda `GROUP_CONCAT` (MySQL) / `STRING_AGG`, `ARRAY_AGG` (PostgreSQL).",
        "",
        "Nozikliklar: `COUNT(*)` barcha qatorlarni, `COUNT(col)` faqat `NULL` bo'lmaganlarni sanaydi; `AVG` `NULL` larni hisobga olmaydi; `SUM` bo'sh to'plamda `NULL` qaytaradi (`COALESCE(SUM(x), 0)`). Shartli agregatsiya: `SUM(CASE WHEN ... THEN 1 ELSE 0 END)` yoki PostgreSQL `FILTER (WHERE ...)`.",
        "",
        "```sql",
        "SELECT",
        "  COUNT(*) AS total,",
        "  COUNT(*) FILTER (WHERE status = 'paid') AS paid,      -- PostgreSQL",
        "  SUM(CASE WHEN status = 'refunded' THEN 1 ELSE 0 END) AS refunded,",
        "  COALESCE(SUM(total), 0) AS revenue",
        "FROM orders;",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Bitta so'rovda status bo'yicha buyurtmalar soni va summasini shartli agregatsiya bilan hisoblang.",
      acceptanceCriteria: [
        "`COUNT(*)` va `COUNT(col)` farqini biladi",
        "Agregatlarda `NULL` xatti-harakatini tushuntira oladi"
      ],
      prerequisites: [
        "9.2"
      ]
    },
    {
      id: "9.8",
      title: "CASE Expressions",
      description: [
        "`CASE` — SQL'dagi shartli ifoda: \"searched\" (`CASE WHEN cond THEN ...`) va \"simple\" (`CASE col WHEN val THEN ...`). SELECT, ORDER BY, GROUP BY, UPDATE va agregatlar ichida ishlatiladi.",
        "",
        "Qo'llanishi: qiymatlarni toifalash, maxsus tartiblash, shartli agregatsiya (pivot hisobotlar), bitta `UPDATE` da turli qiymatlar berish. `ELSE` yozilmasa — `NULL`.",
        "",
        "```sql",
        "SELECT id,",
        "  CASE",
        "    WHEN total >= 5000000 THEN 'vip'",
        "    WHEN total >= 1000000 THEN 'regular'",
        "    ELSE 'new'",
        "  END AS segment",
        "FROM customers",
        "ORDER BY CASE status WHEN 'urgent' THEN 0 WHEN 'normal' THEN 1 ELSE 2 END;",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Mijozlarni xarid summasi bo'yicha segmentlarga ajratib, har segment sonini chiqaring.",
      acceptanceCriteria: [
        "Searched va simple CASE farqini biladi",
        "CASE bilan pivot hisobot tuza oladi"
      ],
      prerequisites: [
        "9.7"
      ]
    },
    {
      id: "9.9",
      title: "UNION va UNION ALL",
      description: [
        "`UNION` ikki so'rov natijasini birlashtiradi va dublikatlarni olib tashlaydi (qo'shimcha saralash/hash — qimmat); `UNION ALL` dublikatlarni saqlaydi va tezroq. Ustunlar soni va tiplari mos bo'lishi kerak; `ORDER BY` butun natijaga oxirida qo'llanadi.",
        "",
        "Qoida: dublikat bo'lmasligi aniq bo'lsa yoki kerak bo'lsa — `UNION ALL`. Shuningdek `INTERSECT`/`EXCEPT` (PostgreSQL, MySQL 8.0.31+). Ba'zan `OR` li sekin so'rovni ikkita indeksli so'rovning `UNION ALL` iga bo'lish tezlik beradi.",
        "",
        "```sql",
        "SELECT id, 'order' AS type, created_at FROM orders WHERE user_id = 7",
        "UNION ALL",
        "SELECT id, 'refund', created_at FROM refunds WHERE user_id = 7",
        "ORDER BY created_at DESC;",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Foydalanuvchi faoliyati lentasini bir nechta jadvaldan `UNION ALL` bilan yig'ing va paginatsiya qiling.",
      acceptanceCriteria: [
        "`UNION` va `UNION ALL` narxi farqini tushuntira oladi",
        "`OR` ni `UNION ALL` ga bo'lish optimizatsiyasini biladi"
      ],
      prerequisites: [
        "9.2"
      ]
    },
    {
      id: "9.10",
      title: "NULL bilan ishlash",
      description: [
        "`NULL` — \"noma'lum\", qiymat emas. Har qanday taqqoslash (`= NULL`, `<> NULL`) `UNKNOWN` beradi — `IS NULL`/`IS NOT NULL` ishlating. Uch qiymatli mantiq: `NULL AND FALSE = FALSE`, `NULL OR TRUE = TRUE`, qolganlari `NULL`.",
        "",
        "Tuzoqlar: `NOT IN (subquery)` subquery'da bitta `NULL` bo'lsa, hech narsa qaytarmaydi; `col <> 'x'` `NULL` qatorlarni chiqarib tashlaydi; `UNIQUE` indeks ko'p `NULL` ga ruxsat beradi. Funksiyalar: `COALESCE`, `NULLIF`, PostgreSQL `IS DISTINCT FROM`, MySQL `<=>`.",
        "",
        "```sql",
        "SELECT * FROM users WHERE deleted_at IS NULL;",
        "SELECT COALESCE(nickname, name) AS display_name FROM users;",
        "SELECT total / NULLIF(qty, 0) FROM items;  -- nolga bo'lishdan himoya",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "`NOT IN` + NULL bug'ini qayta yarating va `NOT EXISTS` bilan tuzating.",
      acceptanceCriteria: [
        "Uch qiymatli mantiqni tushuntira oladi",
        "`NULL` bilan bog'liq 3 ta tuzoqni biladi"
      ],
      prerequisites: [
        "9.3"
      ]
    },
    {
      id: "9.11",
      title: "Constraints",
      description: [
        "Constraint'lar — ma'lumot yaxlitligini DB darajasida kafolatlaydi: `NOT NULL`, `PRIMARY KEY`, `FOREIGN KEY`, `UNIQUE`, `CHECK`, `DEFAULT`, PostgreSQL'da `EXCLUDE`.",
        "",
        "Muhim tamoyil: ilova validatsiyasi yetarli emas — parallel so'rovlar, boshqa servislar, qo'lda tahrirlar uni chetlab o'tadi. Constraint — oxirgi himoya chizig'i. Laravel migratsiyalarida: `->nullable()`, `->unique()`, `->foreignId()->constrained()`, `->check()` (yoki raw).",
        "",
        "```sql",
        "ALTER TABLE products",
        "  ADD CONSTRAINT price_positive CHECK (price >= 0),",
        "  ADD CONSTRAINT sku_unique UNIQUE (sku);",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Asosiy jadvallaringizga yetishmayotgan constraint'larni qo'shing va mavjud noto'g'ri ma'lumotni tozalang.",
      acceptanceCriteria: [
        "Har bir constraint turining vazifasini biladi",
        "Nega faqat ilova validatsiyasi yetarli emasligini tushuntira oladi"
      ],
      prerequisites: [
        "9.1"
      ]
    },
    {
      id: "9.12",
      title: "Primary va Foreign Keys",
      description: [
        "**Primary key** — qatorning unikal, `NOT NULL` identifikatori (odatda `BIGINT` auto-increment yoki UUID/ULID). InnoDB'da PK clustered indeks — ma'lumot fizik ravishda PK tartibida saqlanadi.",
        "",
        "**Foreign key** — boshqa jadval PK'siga havola, referensial yaxlitlikni ta'minlaydi. `ON DELETE`/`ON UPDATE` amallari: `RESTRICT`, `CASCADE`, `SET NULL`, `NO ACTION`. FK ustunlarga indeks kerak (MySQL avtomatik yaratadi, PostgreSQL yo'q!).",
        "",
        "```php",
        "Schema::create('order_items', function (Blueprint $t) {",
        "    $t->id();",
        "    $t->foreignId('order_id')->constrained()->cascadeOnDelete();",
        "    $t->foreignId('product_id')->constrained()->restrictOnDelete();",
        "});",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Jadvallar orasidagi FK'larni tekshiring: indekssiz FK'lar va noto'g'ri `ON DELETE` amallarini tuzating.",
      acceptanceCriteria: [
        "`CASCADE`, `RESTRICT`, `SET NULL` ni to'g'ri tanlaydi",
        "PostgreSQL'da FK indeksi avtomatik emasligini biladi"
      ],
      prerequisites: [
        "9.11"
      ]
    },
    {
      id: "9.13",
      title: "Unique va Check Constraints",
      description: [
        "`UNIQUE` — ustun yoki ustunlar kombinatsiyasi takrorlanmasligi (`UNIQUE (company_id, email)`). Race condition'ga qarshi yagona ishonchli himoya: ilova \"avval tekshirib, keyin yozish\" ikki parallel so'rovda buziladi. Unique buzilishini ushlab (`UniqueConstraintViolationException`) foydalanuvchiga tushunarli xabar bering.",
        "",
        "`CHECK` — qator darajasidagi shart (`qty > 0`, `ends_at > starts_at`). MySQL 8.0.16+ dan haqiqatan bajariladi (oldin e'tiborsiz qoldirilardi). PostgreSQL partial unique: `UNIQUE ... WHERE deleted_at IS NULL` — soft delete bilan mos.",
        "",
        "```sql",
        "CREATE UNIQUE INDEX users_email_active ON users (email) WHERE deleted_at IS NULL; -- PostgreSQL",
        "ALTER TABLE bookings ADD CONSTRAINT valid_range CHECK (ends_at > starts_at);",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Parallel ro'yxatdan o'tishda dublikat email race condition'ini testda ko'rsating va unique constraint bilan tuzating.",
      acceptanceCriteria: [
        "Unique constraint'ni race condition himoyasi sifatida tushunadi",
        "Soft delete bilan unique muammosini hal qila oladi"
      ],
      prerequisites: [
        "9.11"
      ]
    },
    {
      id: "9.14",
      title: "Views",
      description: [
        "View — saqlangan `SELECT` so'rovi, virtual jadval sifatida ishlatiladi. Foydalari: murakkab so'rovni yashirish, xavfsizlik (faqat kerakli ustunlarni ko'rsatish), hisobotlar uchun barqaror interfeys. Oddiy view ma'lumot saqlamaydi — har murojaatda so'rov bajariladi.",
        "",
        "**Materialized view** (PostgreSQL) natijani saqlaydi va `REFRESH MATERIALIZED VIEW [CONCURRENTLY]` bilan yangilanadi — og'ir hisobotlar uchun. Laravel'da view'ni read-only Eloquent model orqali o'qish mumkin; migratsiyada `DB::statement('CREATE VIEW ...')`.",
        "",
        "```sql",
        "CREATE VIEW active_customers AS",
        "SELECT c.id, c.name, COUNT(o.id) AS orders_count",
        "FROM customers c JOIN orders o ON o.customer_id = c.id",
        "WHERE o.created_at > NOW() - INTERVAL '90 days'",
        "GROUP BY c.id, c.name;",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Hisobot uchun view yarating va unga read-only Eloquent model bog'lang.",
      acceptanceCriteria: [
        "View va materialized view farqini biladi",
        "View'ni migratsiya orqali versiyalaydi"
      ],
      prerequisites: [
        "9.2"
      ]
    },
    {
      id: "9.15",
      title: "Stored Procedures va Triggers",
      description: [
        "**Stored procedure** — DB ichida saqlangan va bajariladigan kod. **Trigger** — `INSERT/UPDATE/DELETE` hodisasida avtomatik ishlaydigan kod (audit log, denormalizatsiyalangan hisoblagichlarni yangilash).",
        "",
        "Laravel ilovalarida odatda kam ishlatiladi: biznes mantiq DB'da yashirinadi, versiyalash, testlash va debug qilish qiyin, DB'ga bog'liqlik ortadi. O'rinli holatlar: ma'lumot yaxlitligi uchun audit trigger, bir nechta ilova bir DB'ni ishlatganda yagona qoida, katta hajmli ma'lumotni DB ichida qayta ishlash.",
        "",
        "```sql",
        "CREATE TRIGGER orders_audit AFTER UPDATE ON orders",
        "FOR EACH ROW",
        "INSERT INTO order_audit (order_id, old_status, new_status, changed_at)",
        "VALUES (OLD.id, OLD.status, NEW.status, NOW());",
        "```"
      ],
      priority: "optional",
      level: "Middle",
      practicalTask: "Status o'zgarishlari uchun audit trigger yozing va uni Laravel migratsiyasi orqali joriy qiling.",
      acceptanceCriteria: [
        "Trigger'larning yashirin mantiq xavfini tushuntira oladi",
        "Ular o'rinli bo'lgan holatlarni ayta oladi"
      ],
      prerequisites: [
        "9.1"
      ]
    },
    {
      id: "9.16",
      title: "Transactions",
      description: [
        "Tranzaksiya — bir nechta amalni bitta bo'linmas birlik sifatida bajarish: yo hammasi (`COMMIT`), yo hech biri (`ROLLBACK`). ACID kafolatlari: Atomicity, Consistency, Isolation, Durability.",
        "",
        "Laravel'da `DB::transaction(fn () => ..., attempts: 3)` — exception'da avtomatik rollback va deadlock'da qayta urinish. Qoidalar: tranzaksiyani qisqa saqlang, ichida tashqi API chaqirmang, event/job'larni `afterCommit` bilan yuboring. MySQL'da DDL (`ALTER TABLE`) implicit commit qiladi.",
        "",
        "```php",
        "DB::transaction(function () use ($from, $to, $amount) {",
        "    $from->lockForUpdate()->decrement('balance', $amount);",
        "    $to->increment('balance', $amount);",
        "}, attempts: 3);",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Pul o'tkazmasini tranzaksiya va lock bilan yozing; o'rtada exception bo'lsa balans o'zgarmasligini testlang.",
      acceptanceCriteria: [
        "ACID xususiyatlarini misol bilan tushuntira oladi",
        "Tranzaksiya ichida tashqi chaqiruv xavfini biladi"
      ],
      prerequisites: [
        "database-transactions"
      ]
    },
    {
      id: "9.17",
      title: "Isolation Levels",
      description: [
        "Izolyatsiya darajalari parallel tranzaksiyalar bir-birining o'zgarishlarini qanchalik ko'rishini belgilaydi: `READ UNCOMMITTED` (dirty read), `READ COMMITTED` (PostgreSQL default), `REPEATABLE READ` (MySQL InnoDB default), `SERIALIZABLE`.",
        "",
        "Har bir daraja turli anomaliyalarning oldini oladi: dirty read, non-repeatable read, phantom read, lost update, write skew. Yuqori daraja — ko'proq izolyatsiya, lekin ko'proq lock/serialization xatolari va qayta urinishlar. Implementatsiyalar farq qiladi (InnoDB gap lock'lari, PostgreSQL SSI).",
        "",
        "```sql",
        "SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;",
        "BEGIN;",
        "-- ...",
        "COMMIT;  -- PostgreSQL'da serialization_failure bo'lsa qayta urinish kerak",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Ikki terminalda non-repeatable read va phantom read'ni turli izolyatsiya darajalarida qayta yarating.",
      acceptanceCriteria: [
        "Har bir daraja qaysi anomaliyani oldini olishini biladi",
        "MySQL va PostgreSQL default darajalarini biladi"
      ],
      prerequisites: [
        "9.16",
        "17.5"
      ]
    },
    {
      id: "9.18",
      title: "Locks va Deadlocks",
      description: [
        "Lock'lar parallel o'zgarishlarni tartibga soladi: row-level (`SELECT ... FOR UPDATE` — eksklyuziv, `FOR SHARE` — umumiy), table-level, InnoDB'da gap/next-key lock'lar. `SKIP LOCKED` (navbat jadvallari uchun), `NOWAIT`.",
        "",
        "**Deadlock** — ikki tranzaksiya bir-birining lock'ini kutadi; DB birini qurbon qilib rollback qiladi. Oldini olish: resurslarni har doim bir xil tartibda lock qilish, tranzaksiyani qisqa saqlash, kerakli indekslar (indekssiz `UPDATE` ko'p qatorni lock qiladi), qayta urinish logikasi.",
        "",
        "```php",
        "// Doim kichik id birinchi — deadlock'ning oldini oladi",
        "[$a, $b] = $from->id < $to->id ? [$from, $to] : [$to, $from];",
        "Account::whereKey([$a->id, $b->id])->orderBy('id')->lockForUpdate()->get();",
        "```"
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Deadlock'ni ikki parallel jarayon bilan qayta yarating, `SHOW ENGINE INNODB STATUS` ni tahlil qiling va tuzating.",
      acceptanceCriteria: [
        "`FOR UPDATE` va `FOR SHARE` farqini biladi",
        "Deadlock'ning oldini olishning 3 usulini ayta oladi"
      ],
      prerequisites: [
        "9.16"
      ]
    },
    {
      id: "9.19",
      title: "Query Execution Plans",
      description: [
        "Execution plan — DB so'rovni qanday bajarishini ko'rsatadi: qaysi indeks, qanday join algoritmi (nested loop, hash, merge), qancha qator taxmin qilingan, saralash yoki vaqtinchalik jadval kerakmi. `EXPLAIN` — reja, `EXPLAIN ANALYZE` — haqiqiy bajarish va vaqt.",
        "",
        "O'qish kerak bo'lgan belgilar: full table scan (`type: ALL` / `Seq Scan`), `Using filesort`, `Using temporary`, taxminiy va haqiqiy qatorlar orasidagi katta farq (eskirgan statistika).",
        "",
        "```sql",
        "EXPLAIN ANALYZE",
        "SELECT * FROM orders WHERE customer_id = 42 ORDER BY created_at DESC LIMIT 20;",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Loyihadagi eng sekin 3 ta so'rovning execution plan'ini tahlil qiling va har biri uchun xulosa yozing.",
      acceptanceCriteria: [
        "Plan'dagi asosiy operatsiyalarni o'qiy oladi",
        "Taxmin va haqiqat farqidan statistika muammosini aniqlaydi"
      ],
      prerequisites: [
        "query-optimization"
      ]
    },
    {
      id: "9.20",
      title: "Indexlardan foydalanish",
      description: [
        "Indeks (odatda B-tree) — qidiruvni tezlashtiruvchi alohida tartiblangan struktura. Indeks ishlatilishi uchun so'rov **sargable** bo'lishi kerak: ustunga funksiya qo'llanmasin (`WHERE YEAR(created_at) = 2025` ❌ → diapazon ✅), boshida `%` li `LIKE '%x'` indeksdan foydalanmaydi.",
        "",
        "Composite indeksda \"leftmost prefix\" qoidasi: `(a, b, c)` indeksi `a`, `a,b`, `a,b,c` bo'yicha qidiruvga yordam beradi, faqat `b` ga emas. Har bir indeks yozishni sekinlashtiradi va joy egallaydi — faqat haqiqiy so'rovlar uchun yarating.",
        "",
        "```sql",
        "CREATE INDEX orders_customer_created ON orders (customer_id, created_at);",
        "-- Yordam beradi:",
        "SELECT * FROM orders WHERE customer_id = 42 ORDER BY created_at DESC;",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Sekin so'rov uchun to'g'ri composite indeksni loyihalang va EXPLAIN bilan oldin/keyin solishtiring.",
      acceptanceCriteria: [
        "Leftmost prefix qoidasini tushuntira oladi",
        "Sargable bo'lmagan so'rovni aniqlab tuzatadi"
      ],
      prerequisites: [
        "database-indexing"
      ]
    },
    {
      id: "9.21",
      title: "Query Optimization",
      description: [
        "Optimallashtirish jarayoni: o'lchash (slow query log, Telescope, APM) → `EXPLAIN` → gipoteza → o'zgarish → qayta o'lchash. Asosiy usullar: to'g'ri indeks, faqat kerakli ustunlar, N+1 ni yo'qotish, sargable shartlar, `OFFSET` o'rniga keyset pagination, katta `IN` ro'yxatlarni bo'lish, og'ir hisobotlarni keshlash yoki oldindan hisoblash.",
        "",
        "Har doim reallikka yaqin hajmdagi ma'lumot bilan test qiling — 100 qatorli dev DB'da hamma so'rov tez.",
        "",
        "```text",
        "Slow log → EXPLAIN ANALYZE → indeks / qayta yozish → benchmark → monitoring",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Slow query log'ni yoqing, eng ko'p vaqt olgan so'rovni topib optimallashtiring va natijani raqam bilan ko'rsating.",
      acceptanceCriteria: [
        "Optimallashtirishni o'lchovdan boshlaydi",
        "Kamida 5 ta optimallashtirish usulini biladi"
      ],
      prerequisites: [
        "9.19",
        "9.20"
      ]
    },
    {
      id: "9.22",
      title: "SQL Injection Prevention",
      description: [
        "SQL injection — foydalanuvchi kiritgan ma'lumot SQL kodi sifatida bajarilishi. Asosiy himoya — **prepared statements** (parametr bog'lash): qiymat so'rovdan alohida yuboriladi va hech qachon kod sifatida talqin qilinmaydi.",
        "",
        "Eloquent va query builder avtomatik bog'laydi, lekin xavfli joylar qoladi: `DB::raw()`, `whereRaw()`, `orderByRaw()` ga string birlashtirish, foydalanuvchi tanlagan ustun/yo'nalish nomlari (ular bog'lanmaydi — whitelist bilan tekshiring). Qo'shimcha: DB foydalanuvchisiga minimal huquqlar.",
        "",
        "```php",
        "// Xavfli",
        "User::whereRaw(\"email = '$email'\")->first();",
        "// Xavfsiz",
        "User::whereRaw('email = ?', [$email])->first();",
        "// Ustun nomi — whitelist",
        "$sort = in_array($request->sort, ['name', 'created_at'], true) ? $request->sort : 'id';",
        "```"
      ],
      priority: "core",
      level: "Junior",
      practicalTask: "Loyihadagi barcha `*Raw` chaqiruvlarini audit qiling va string birlashtirishlarni bog'langan parametrlarga o'tkazing.",
      acceptanceCriteria: [
        "Prepared statement nega himoya qilishini tushuntira oladi",
        "Ustun/tartib nomlari bog'lanmasligini va whitelist kerakligini biladi"
      ],
      prerequisites: [
        "51.5"
      ]
    },
    {
      id: "9.23",
      title: "Pagination strategiyalari",
      description: [
        "**Offset pagination** (`LIMIT 20 OFFSET 10000`) — sodda, istalgan sahifaga o'tish mumkin, lekin katta offset'da sekin (DB o'tkazib yuborilgan qatorlarni ham o'qiydi) va yangi yozuvlar qo'shilganda dublikat/yo'qolgan qatorlar paydo bo'ladi.",
        "",
        "**Keyset (cursor) pagination** (`WHERE (created_at, id) < (?, ?) ORDER BY created_at DESC, id DESC LIMIT 20`) — doim tez va barqaror, lekin faqat oldinga/orqaga, unikal tartib kalitini talab qiladi. Umumiy son (`COUNT(*)`) katta jadvallarda qimmat — taxminiy son yoki \"keyingisi bormi\" yondashuvi.",
        "",
        "```sql",
        "SELECT id, created_at, total FROM orders",
        "WHERE (created_at, id) < ('2025-03-01 10:00:00', 98213)",
        "ORDER BY created_at DESC, id DESC",
        "LIMIT 20;",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Bir xil API uchun offset va keyset pagination'ni yozib, 1 mln qatorda 5000-sahifa tezligini solishtiring.",
      acceptanceCriteria: [
        "Offset pagination'ning ikki kamchiligini biladi",
        "Keyset uchun to'g'ri indeksni loyihalaydi"
      ],
      prerequisites: [
        "9.20",
        "2.24"
      ]
    },
    {
      id: "9.24",
      title: "Bulk Operations",
      description: [
        "Ko'p qatorli amallarni bittalab emas, guruhlab bajarish: multi-row `INSERT`, `INSERT ... ON DUPLICATE KEY`/`ON CONFLICT` upsert, `UPDATE ... JOIN`/`CASE` bilan ommaviy yangilash, `LOAD DATA INFILE`/`COPY` (juda katta import).",
        "",
        "Laravel'da: `insert()`, `upsert()`, `chunkById()` + `update()`, `lazyById()`. Ehtiyot: bulk amallar model event'larini ishga tushirmaydi, `timestamps` qo'lda; juda katta batch — uzoq lock va katta tranzaksiya, shuning uchun 500–5000 lik bo'laklarga bo'ling; `max_allowed_packet` chegarasi.",
        "",
        "```php",
        "collect($rows)->chunk(1000)->each(fn ($chunk) =>",
        "    Product::upsert($chunk->all(), uniqueBy: ['sku'], update: ['price', 'stock'])",
        ");",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "100 000 qatorli importni bittalab va `upsert` bo'laklari bilan bajarib, vaqtni solishtiring.",
      acceptanceCriteria: [
        "Bulk amallarda model event'lari ishlamasligini biladi",
        "Batch hajmini lock va xotira nuqtai nazaridan tanlaydi"
      ],
      prerequisites: [
        "9.1",
        "13.22"
      ]
    }
  ]
});
