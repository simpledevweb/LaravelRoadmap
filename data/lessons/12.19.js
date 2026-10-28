/* Chuqur dars: 12.19. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("12.19", {
  "lesson": [
    "### Monitoring",
    "**INFO** (sektsiyalar: `server`, `clients`, `memory`, `persistence`, `stats`, `replication`, `cpu`, `commandstats`, `keyspace`).",
    "",
    "### Muhim ko'rsatkichlar",
    "- **Xotira:** `used_memory`, `maxmemory`, `mem_fragmentation_ratio`, `evicted_keys`.",
    "- **Kesh sifati:** `keyspace_hits` / `keyspace_misses` → **hit ratio** = hits/(hits+misses).",
    "- **Yuklama:** `instantaneous_ops_per_sec`, `total_commands_processed`.",
    "- **Ulanishlar:** `connected_clients`, `blocked_clients`, `rejected_connections` (`maxclients`).",
    "- **Persistence:** `rdb_last_bgsave_status`, `aof_last_write_status`, `rdb_last_save_time`.",
    "- **Replikatsiya:** `master_link_status`, offset farqi.",
    "- `expired_keys`, `latest_fork_usec` (fork latency).",
    "",
    "### Sekin buyruqlar",
    "- `SLOWLOG GET 10` (`slowlog-log-slower-than` mikrosek, default 10000).",
    "- `LATENCY DOCTOR`, `LATENCY LATEST`, `redis-cli --latency`.",
    "- `MONITOR` — barcha buyruqlarni real vaqtda (juda og'ir, production'da qisqa vaqt).",
    "- `CLIENT LIST`, `CLIENT KILL`.",
    "- `COMMANDSTATS`.",
    "",
    "### Odatiy muammolar",
    "- **Sekinlik:** `KEYS *`, katta `SMEMBERS/HGETALL`, big key, uzun Lua, fork (RDB/AOF rewrite), swap, CPU.",
    "- **OOM:** `maxmemory`/eviction/TTL'siz.",
    "- **Ulanishlar tugashi:** `maxclients`, ulanish sizishi.",
    "- **Replika uzilgan.**",
    "",
    "### Vositalar",
    "**RedisInsight**, **Prometheus + redis_exporter + Grafana**, Datadog, Laravel **Horizon/Pulse/Telescope**, `redis-cli`.",
    "",
    "### Alertlar",
    "Hit ratio past, xotira >80%, evicted_keys o'sishi, replika uzilishi, `blocked_clients`, fork latency, ulanishlar."
  ],
  "examples": [
    {
      "title": "Tezkor diagnostika",
      "lang": "bash",
      "code": [
        "redis-cli INFO stats | grep -E \"keyspace_hits|keyspace_misses|evicted_keys|instantaneous_ops\"",
        "redis-cli SLOWLOG GET 10",
        "redis-cli --latency",
        "redis-cli CLIENT LIST | head"
      ]
    }
  ],
  "pitfalls": [
    "`MONITOR` production'da juda og'ir: qisqa vaqt.",
    "`KEYS *`, katta `SMEMBERS/HGETALL` sekinlik manbai: `SCAN`.",
    "Hit ratio'ni kuzatmasdan kesh foydasi noma'lum.",
    "Fork latency (RDB/AOF rewrite) latency sakrashi beradi: kuzating."
  ]
});
