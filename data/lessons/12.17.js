/* Chuqur dars: 12.17. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("12.17", {
  "lesson": [
    "### Replikatsiya",
    "**Master (primary)** dan bir yoki bir nechta **replica**ga ma'lumotni nusxalash. Replica `REPLICAOF host port` (yoki konfiguratsiyada `replicaof`). Asinxron.",
    "",
    "### Jarayon",
    "1. Replica ulanadi, **PSYNC** yuboradi.",
    "2. To'liq sinxronlash (**RDB** snapshot + buffer) yoki **qisman** (replication backlog'dan, uzilishdan keyin).",
    "3. Keyin master yozuvlarini oqim sifatida uzatadi.",
    "",
    "### Xususiyatlar",
    "- **Asinxron:** master javobni kutmaydi → replica **lag**, failover'da yo'qotish mumkin. `WAIT n timeout` — n replika tasdiqlashini kutish (kuchliroq kafolat, to'liq emas).",
    "- Replica **read-only** (`replica-read-only yes`).",
    "- Replica'dan o'qish: eskirgan (stale) ma'lumot bo'lishi mumkin.",
    "- Replica persistence yoqishi mumkin (master'da o'chiq bo'lsa ham: master RDB fork yukidan qochish).",
    "- Zanjirli replikatsiya (replica'ning replicasi).",
    "- `replication backlog size`, `repl-diskless-sync`.",
    "",
    "### Maqsadlar",
    "O'qishni masshtablash, zaxira nusxa, failover asosi (Sentinel/Cluster), backup replica'dan.",
    "",
    "### Monitoring",
    "`INFO replication`: `role`, `connected_slaves`, `master_link_status`, `master_repl_offset`, `slave_repl_offset` (lag). Replikatsiya uzilishi alert.",
    "",
    "### Laravel",
    "Redis ulanishida read/write ajratish standart emas; `predis` replication opsiyalari (`options.replication`), Sentinel orqali; yoki proksi.",
    "",
    "### Xavf",
    "Master o'chib qayta ishga tushsa **bo'sh** ma'lumot bilan replikalarni ham bo'shatishi mumkin (persistence/avtomatik restart ehtiyoti): master'da persistence yoki avtomatik restartni o'chiring."
  ],
  "examples": [
    {
      "title": "Replika sozlash",
      "lang": "bash",
      "code": [
        "# replica serverida",
        "redis-cli REPLICAOF 10.0.0.1 6379",
        "redis-cli INFO replication",
        "redis-cli -h 10.0.0.1 WAIT 1 100        # 1 replika tasdiqlashini 100 ms kutish"
      ]
    }
  ],
  "pitfalls": [
    "Asinxron replikatsiya: failover'da oxirgi yozuvlar yo'qolishi mumkin.",
    "Replika'dan o'qish eskirgan ma'lumot berishi mumkin (lag).",
    "Persistence'siz master qayta ishga tushsa bo'sh ma'lumot replikalarga ham tarqalishi mumkin.",
    "Replika read-only: unga yozish urinishi xato."
  ]
});
