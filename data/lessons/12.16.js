/* Chuqur dars: 12.16. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("12.16", {
  "lesson": [
    "### Xotirani boshqarish",
    "Redis ma'lumotni **to'liq xotirada** saqlaydi: hajm = narx va chegara.",
    "",
    "### Ko'rish",
    "- `INFO memory`: `used_memory` (ma'lumot), `used_memory_rss` (OS ko'radigan), `mem_fragmentation_ratio` (rss/used; ~1.0–1.5 normal, >1.5 fragmentatsiya, <1 swap xavfi), `maxmemory`.",
    "- `MEMORY USAGE key`, `MEMORY DOCTOR`, `MEMORY STATS`.",
    "- `redis-cli --bigkeys` / `--memkeys` — eng katta kalitlar.",
    "- `DBSIZE`, `SCAN`.",
    "",
    "### Tejash usullari",
    "1. **TTL** hamma kesh kalitiga.",
    "2. **Kichik hash/ziplist kodlash:** kichik hash/list/set/zset ixcham (`listpack`, `intset`) saqlanadi (`hash-max-listpack-entries`, `...-value`). Kichik obyektlarni bitta hash'da (`HSET`) saqlash alohida string'dan tejamliroq.",
    "3. **Qisqa kalit nomlari** (millionlab kalitda sezilarli).",
    "4. **Siqish** (katta qiymat: gzip/lz4 ilova tomonda).",
    "5. **Kerak bo'lmagan ma'lumotni** keshlamaslik.",
    "6. **Big key'larni bo'lish** (katta hash/list'ni bo'laklarga).",
    "",
    "### Big key muammolari",
    "Katta kalit o'chirish (`DEL`) serverni **bloklaydi**: `UNLINK` (asinxron), `*SCAN` + bo'laklab o'chirish. Katta qiymat tarmoqni va replikatsiyani og'irlashtiradi.",
    "",
    "### Zaxira",
    "`maxmemory` ni jami xotiraning ~60–75% qiling: fork (RDB/AOF rewrite), replikatsiya buferlari va fragmentatsiya uchun joy. `vm.overcommit_memory=1` (Linux), swap o'chiq/minimal, transparent huge pages o'chiq.",
    "",
    "### Defragmentatsiya",
    "`activedefrag yes` (4.0+).",
    "",
    "### Monitoring",
    "`used_memory` o'sishi, `evicted_keys`, big key'lar, fragmentatsiya."
  ],
  "examples": [
    {
      "title": "Xotirani tahlil qilish",
      "lang": "bash",
      "code": [
        "redis-cli INFO memory | grep -E \"used_memory_human|mem_fragmentation_ratio|maxmemory_human\"",
        "redis-cli --bigkeys",
        "redis-cli MEMORY USAGE user:5:profile",
        "redis-cli UNLINK huge:list      # DEL o'rniga (bloklamaydi)"
      ]
    }
  ],
  "pitfalls": [
    "Katta kalitni `DEL` bilan o'chirish serverni bloklaydi: `UNLINK`.",
    "`maxmemory`ni jami RAM'ga teng qilish fork va buferlar uchun joy qoldirmaydi: OOM.",
    "`mem_fragmentation_ratio` < 1 swap'ga tushganini bildiradi (juda sekin).",
    "TTL'siz kalitlar vaqt o'tishi bilan xotirani to'ldiradi."
  ]
});
