/* Chuqur dars: 12.1. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("12.1", {
  "lesson": [
    "### Redis nima",
    "Xotirada ishlaydigan **key-value ma'lumotlar tuzilmalari serveri**: kesh, sessiya, navbat, hisoblagich, reyting. Bitta thread'li buyruq ijrosi (tez, atomar).",
    "",
    "### Asosiy turlar",
    "- **String:** matn/son/binar (512 MB gacha). `SET/GET`, `INCR/DECR`, `MSET/MGET`, `SETEX`, `APPEND`.",
    "- **Hash:** maydon-qiymat to'plami (kichik obyekt): `HSET user:5 name Ali age 30`, `HGET`, `HGETALL`, `HINCRBY`.",
    "- **List:** tartiblangan ro'yxat (ikki uchli): `LPUSH/RPUSH`, `LPOP/RPOP`, `BRPOP` (bloklovchi), `LRANGE`, `LTRIM` (queue, so'nggi N element).",
    "- **Set:** noyob elementlar: `SADD`, `SISMEMBER`, `SMEMBERS`, `SINTER/SUNION/SDIFF` (teglar, noyob tashrif).",
    "- **Sorted Set (ZSET):** ball (score) bo'yicha tartiblangan noyob elementlar: `ZADD`, `ZRANGE`, `ZRANGEBYSCORE`, `ZINCRBY`, `ZREVRANK` (reyting, delayed queue).",
    "- **Qo'shimcha:** Bitmap (`SETBIT`), HyperLogLog (`PFADD/PFCOUNT`: taxminiy noyob son), Geo (`GEOADD/GEOSEARCH`), Streams (12.2), JSON/Search (modullar).",
    "",
    "### Kalit nomlash",
    "`obyekt:id:maydon` — `user:5:profile`, `cache:post:10`. Prefiks bilan guruhlash, qisqa va izchil.",
    "",
    "### Murakkablik (Big-O)",
    "Ko'p buyruq O(1)/O(log n); **O(n) buyruqlar** (`KEYS *`, `SMEMBERS`, `HGETALL`, `LRANGE 0 -1` katta kolleksiyada) serverni **bloklaydi**: `SCAN`/`SSCAN`/`HSCAN` ishlating.",
    "",
    "### Tur tanlash",
    "Obyekt → hash; navbat → list; unikal → set; reyting → zset; hisoblagich → string `INCR`.",
    "",
    "### Laravel",
    "`Redis::set()`, `Redis::hgetall()`, `Cache::`, `Redis::zadd()`; `predis` yoki `phpredis` klienti."
  ],
  "examples": [
    {
      "title": "Turlar",
      "lang": "bash",
      "code": [
        "SET page:views 0",
        "INCR page:views",
        "HSET user:5 name Ali age 30",
        "HINCRBY user:5 age 1",
        "LPUSH queue:emails job1",
        "ZADD leaderboard 150 ali 90 vali",
        "ZREVRANGE leaderboard 0 9 WITHSCORES",
        "SADD post:10:likers 5 7 9"
      ]
    }
  ],
  "pitfalls": [
    "`KEYS *` va katta `SMEMBERS/HGETALL` serverni bloklaydi: `SCAN` va bo'laklab.",
    "Katta (big) kalitlar (millionlab element) sekinlik va xotira muammosi beradi.",
    "Noto'g'ri tur tanlash (obyektni JSON string qilib butunlay o'qish-yozish) ortiqcha trafik.",
    "Prefiksiz kalit nomlari to'qnashuv va boshqarishni qiyinlashtiradi."
  ]
});
