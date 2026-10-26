/* Laravel Skill Map — vanilla JS, works from file:// (no build, no server). */
(() => {
  "use strict";

  /* ------------------------------------------------------------------ *
   * Constants
   * ------------------------------------------------------------------ */
  const STATUSES = [
    { label: "Not Started", hint: "Hali boshlanmagan" },
    { label: "Learning",    hint: "O'rganilmoqda" },
    { label: "Practicing",  hint: "Amaliyotda qo'llanmoqda" },
    { label: "Proficient",  hint: "Yaxshi biladi" },
    { label: "Expert",      hint: "Ekspert darajasi" },
  ];
  const WEIGHT = [0, 0.25, 0.5, 0.75, 1];
  const PRIORITY = { core: "Core", important: "Important", optional: "Optional" };
  const KEYS = { progress: "lsm:progress", theme: "lsm:theme", collapsed: "lsm:collapsed", last: "lsm:last", questions: "lsm:questions", bookmarks: "lsm:bookmarks" };

  const CAREER_LEVELS = [
    { id: "junior", label: "Junior", name: "Junior Developer", subLevels: ["foundation", "junior"], badge: "Junior", color: "var(--accent-text)", bg: "var(--accent-soft)", icon: "code", desc: "PHP sintaksisi, OOP asoslari, MVC, sodda CRUD va bazaviy vositalar" },
    { id: "middle", label: "Middle", name: "Middle Developer", subLevels: ["middle", "strong middle"], badge: "Middle", color: "var(--st-1)", bg: "var(--st-1-soft)", icon: "layers", desc: "Ishlab chiqarish amaliyoti, Eloquent, REST API, testlash, Docker va DB optimizatsiyasi" },
    { id: "senior", label: "Senior", name: "Senior Developer", subLevels: ["senior"], badge: "Senior", color: "var(--st-4)", bg: "var(--st-4-soft)", icon: "shield", desc: "Tizim arxitekturasi, yuqori yuklama, xavfsizlik, AWS bulut va murakkab refactoring" },
    { id: "lead",   label: "Lead",   name: "Tech / Team Lead",  subLevels: ["lead"], badge: "Lead", color: "var(--st-2)", bg: "var(--st-2-soft)", icon: "users", desc: "Texnik yo'nalish, jamoa murabbiyligi, arxitektura review va qarorlar qabul qilish" }
  ];

  function levelOf(sub) {
    const l = String(sub.level || "").toLowerCase().trim();
    if (l === "foundation" || l === "junior") return "junior";
    if (l === "middle" || l === "strong middle") return "middle";
    if (l === "senior") return "senior";
    if (l === "lead") return "lead";
    return "middle";
  }


  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const icon = (name, cls = "ic") => `<svg class="${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const pad = (n) => String(n).padStart(2, "0");
  const pct = (x) => Math.round(x * 100);

  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v == null ? fallback : JSON.parse(v); } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* private mode: keep in memory only */ }
    },
  };

  /* ------------------------------------------------------------------ *
   * Data loading — each data/skills/*.js calls registerSkill({...})
   * ------------------------------------------------------------------ */
  const registered = [];
  const fileErrors = {};

  window.registerSkill = (skill) => {
    const src = document.currentScript && document.currentScript.src;
    registered.push({ ...skill, _file: src ? decodeURIComponent(src.split("/").pop()) : "" });
  };

  window.addEventListener("error", (e) => {
    if (e.filename && e.filename.includes("/data/skills/")) {
      fileErrors[decodeURIComponent(e.filename.split("/").pop())] = `${e.message} (qator ${e.lineno})`;
    }
  });

  function loadData() {
    const files = window.SKILL_FILES || [];
    return new Promise((resolve) => {
      if (!files.length) return resolve();
      let left = files.length;
      const done = () => { if (--left === 0) resolve(); };
      files.forEach((f) => {
        const s = document.createElement("script");
        s.src = `data/skills/${f}`;
        s.async = false;
        s.onload = done;
        s.onerror = () => { fileErrors[f] = fileErrors[f] || "Fayl topilmadi"; done(); };
        document.body.appendChild(s);
      });
    });
  }

  const text = (v) => (Array.isArray(v) ? v.join("\n") : typeof v === "string" ? v : "").trim();
  const list = (v) => (Array.isArray(v) ? v.map((x) => String(x).trim()).filter(Boolean) : text(v) ? [text(v)] : []);

  let SKILLS = [], BY_SLUG = {}, BY_ID = {}, SUB_BY_ID = {}, GROUPS = [], GROUP_BY_ID = {}, LOAD_ISSUES = [];

  function buildModel() {
    SKILLS = registered
      .map((s) => ({
        id: Number(s.id),
        slug: String(s.slug),
        title: String(s.title),
        group: String(s.group || ""),
        description: text(s.description),
        file: s._file,
        subskills: (s.subskills || []).map((x, i) => ({
          id: String(x.id || `${s.id}.${i + 1}`),
          title: String(x.title || ""),
          description: text(x.description),
          priority: String(x.priority || "").toLowerCase().trim(),
          level: String(x.level || "").trim(),
          practicalTask: text(x.practicalTask),
          acceptanceCriteria: list(x.acceptanceCriteria),
          prerequisites: list(x.prerequisites),
        })),
      }))
      .sort((a, b) => a.id - b.id);

    SKILLS.forEach((s, i) => {
      s.index = i;
      BY_SLUG[s.slug] = s;
      BY_ID[s.id] = s;
      s.subskills.forEach((x) => { x.skill = s; SUB_BY_ID[x.id] = x; });
    });

    GROUPS = (window.SKILL_GROUPS || []).map((g) => ({
      ...g, items: g.skills.map((id) => BY_ID[id]).filter(Boolean),
    }));
    const grouped = new Set(GROUPS.flatMap((g) => g.items.map((s) => s.id)));
    const orphans = SKILLS.filter((s) => !grouped.has(s.id));
    if (orphans.length) GROUPS.push({ id: "other", title: "Boshqa", icon: "layers", items: orphans });
    GROUPS.forEach((g) => { GROUP_BY_ID[g.id] = g; g.items.forEach((s) => { s.groupRef = g; }); });

    // Ko'rsatiladigan raqamlash sidebar (bo'limlar) tartibiga mos: 1..N ketma-ket.
    // Ma'lumotdagi id'lar (progress kalitlari, prerequisites) o'zgarmaydi.
    SKILLS = GROUPS.flatMap((g) => g.items);
    SKILLS.forEach((s, i) => {
      s.index = i;
      s.num = i + 1;
      s.subskills.forEach((x, j) => { x.num = `${s.num}.${j + 1}`; });
    });

    const loaded = new Set(registered.map((r) => r._file));
    LOAD_ISSUES = (window.SKILL_FILES || [])
      .filter((f) => !loaded.has(f) || fileErrors[f])
      .map((f) => ({ file: f, msg: fileErrors[f] || "registerSkill() chaqirilmadi — sintaksis xatosi bo'lishi mumkin" }));
  }

  /* ------------------------------------------------------------------ *
   * Progress state & Local File System Sync
   * ------------------------------------------------------------------ */
  let progress = store.get(KEYS.progress, {});
  if (typeof progress !== "object" || progress === null) progress = {};
  let masteredIq = new Set(store.get(KEYS.questions, []));
  let bookmarkedIq = new Set(store.get(KEYS.bookmarks, []));

  const idb = {
    open() {
      return new Promise((res, rej) => {
        const req = indexedDB.open("lsm_storage", 1);
        req.onupgradeneeded = () => req.result.createObjectStore("handles");
        req.onsuccess = () => res(req.result);
        req.onerror = () => rej(req.error);
      });
    },
    async get(key) {
      try {
        const db = await this.open();
        return new Promise((res) => {
          const tx = db.transaction("handles", "readonly");
          const req = tx.objectStore("handles").get(key);
          req.onsuccess = () => res(req.result);
          req.onerror = () => res(null);
        });
      } catch { return null; }
    },
    async set(key, val) {
      try {
        const db = await this.open();
        return new Promise((res) => {
          const tx = db.transaction("handles", "readwrite");
          tx.objectStore("handles").put(val, key);
          tx.oncomplete = () => res(true);
          tx.onerror = () => res(false);
        });
      } catch { return false; }
    },
    async del(key) {
      try {
        const db = await this.open();
        return new Promise((res) => {
          const tx = db.transaction("handles", "readwrite");
          tx.objectStore("handles").delete(key);
          tx.oncomplete = () => res(true);
          tx.onerror = () => res(false);
        });
      } catch { return false; }
    }
  };

  let activeFileHandle = null;

  function updateSyncUI(active = false, filename = "progress.json") {
    const unlinkBtn = $("#menu-unlink");
    const linkText = $(".menu-link-text");
    if (active) {
      if (linkText) linkText.textContent = `${filename} (Ulangan)`;
      if (unlinkBtn) unlinkBtn.style.display = "flex";
    } else {
      if (linkText) linkText.textContent = "progress.json fayliga ulash";
      if (unlinkBtn) unlinkBtn.style.display = "none";
    }
  }

  async function saveToLinkedFile() {
    if (!activeFileHandle) return;
    try {
      const writable = await activeFileHandle.createWritable();
      const payload = {
        app: "laravel-skill-map",
        version: 1,
        exportedAt: new Date().toISOString(),
        progress: progress,
        questions: Array.from(masteredIq),
        bookmarks: Array.from(bookmarkedIq)
      };
      await writable.write(JSON.stringify(payload, null, 2));
      await writable.close();
    } catch (err) {
      console.warn("Faylga saqlashda xatolik:", err);
      if (err && err.name === "NotAllowedError") {
        activeFileHandle = null;
        updateSyncUI(false);
      }
    }
  }

  async function linkProgressFile() {
    if (!window.showOpenFilePicker) {
      alert("Sizning brauzeringiz File System Access API'ni qo'llab-quvvatlamaydi. Chrome, Edge yoki Opera brauzerlaridan foydalaning.");
      return;
    }
    try {
      const [handle] = await window.showOpenFilePicker({
        types: [{
          description: "JSON Fayl (progress.json)",
          accept: { "application/json": [".json"] }
        }],
        multiple: false
      });
      if (!handle) return;
      activeFileHandle = handle;
      await idb.set("progressHandle", handle);

      const file = await handle.getFile();
      const fileText = await file.text();
      let importedSomething = false;
      if (fileText.trim()) {
        try {
          const data = JSON.parse(fileText);
          const p = data && typeof data.progress === "object" ? data.progress : data;
          if (p && Object.keys(p).length > 0) {
            const hasLocal = Object.keys(progress).length > 0;
            const shouldLoad = !hasLocal || confirm(`"${file.name}" faylida saqlangan progress mavjud (${Object.keys(p).length} ta mavzu). Saytga yuklaylikmi?`);
            if (shouldLoad) {
              const clean = {};
              Object.entries(p).forEach(([k, v]) => {
                if (SUB_BY_ID[k] && Number.isInteger(v) && v > 0 && v <= 4) clean[k] = v;
              });
              progress = clean;
              store.set(KEYS.progress, progress);
              if (Array.isArray(data.questions)) {
                masteredIq = new Set(data.questions);
                store.set(KEYS.questions, data.questions);
              }
              route();
              updateSidebarProgress();
              importedSomething = true;
            }
          }
        } catch (e) {
          console.warn("Fayl JSON emas yoki bo'sh:", e);
        }
      }

      updateSyncUI(true, file.name);
      await saveToLinkedFile();
      toast(importedSomething ? `Fayl ulandi va ma'lumotlar yuklandi!` : `Fayl ulandi! Barcha o'zgarishlar "${file.name}"ga avtomatik yoziladi.`);
    } catch (err) {
      if (err && err.name !== "AbortError") {
        console.error(err);
        toast("Faylni ulashda xatolik yuz berdi");
      }
    }
  }

  async function unlinkProgressFile() {
    activeFileHandle = null;
    await idb.del("progressHandle");
    updateSyncUI(false);
    toast("Fayl bilan aloqa uzildi");
  }

  async function checkExistingHandle() {
    if (!window.showOpenFilePicker) return;
    try {
      const handle = await idb.get("progressHandle");
      if (!handle) return;
      const perm = await handle.queryPermission({ mode: "readwrite" });
      if (perm === "granted") {
        activeFileHandle = handle;
        const file = await handle.getFile();
        updateSyncUI(true, file.name);
      } else {
        const linkText = $(".menu-link-text");
        if (linkText) linkText.textContent = "progress.json ni qayta ulash";
      }
    } catch (e) {
      console.warn("Handle tekshirishda xato:", e);
    }
  }

  const statusOf = (subId) => {
    const v = progress[subId];
    return Number.isInteger(v) && v >= 0 && v <= 4 ? v : 0;
  };
  function setStatus(subId, st) {
    if (st === 0) delete progress[subId]; else progress[subId] = st;
    store.set(KEYS.progress, progress);
    saveToLinkedFile();
  }
  function statsFor(subs) {
    const counts = [0, 0, 0, 0, 0];
    let w = 0, described = 0;
    subs.forEach((x) => {
      const st = statusOf(x.id);
      counts[st]++; w += WEIGHT[st];
      if (x.description) described++;
    });
    const n = subs.length || 1;
    return { counts, total: subs.length, progress: w / n, done: counts[3] + counts[4], described };
  }
  const allSubs = () => SKILLS.flatMap((s) => s.subskills);

  /* ------------------------------------------------------------------ *
   * Markdown (small, safe subset) + tiny PHP/SQL highlighter
   * ------------------------------------------------------------------ */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function inline(src) {
    const parts = String(src).split(/(`[^`]+`)/g);
    return parts.map((p) => {
      if (/^`[^`]+`$/.test(p)) return `<code>${esc(p.slice(1, -1))}</code>`;
      let h = esc(p);
      h = h.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
      h = h.replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>");
      h = h.replace(/\[([^\]]+)\]\(((?:https?:\/\/|#)[^)\s]+)\)/g, (m, t, u) =>
        `<a href="${u}"${u.startsWith("#") ? "" : ' target="_blank" rel="noopener noreferrer"'}>${t}</a>`);
      return h;
    }).join("");
  }

  const KW = new Set(("abstract and array as break callable case catch class clone const continue declare default do echo else elseif " +
    "empty enddeclare endfor endforeach endif endswitch endwhile enum extends final finally fn for foreach function global goto if " +
    "implements include instanceof insteadof interface isset list match namespace new or print private protected public readonly " +
    "require return static switch throw trait try unset use var while yield null true false self parent mixed void never int string " +
    "float bool iterable object " +
    "select from where join left right inner outer on group by order having limit offset insert into values update set delete create " +
    "table index primary key foreign references unique not null default begin commit rollback transaction with as union all distinct " +
    "case when then end explain analyze count sum avg min max over partition alter add drop exists in is like between asc desc lock for share").split(" "));

  function highlight(code) {
    const re = /(\/\*[\s\S]*?\*\/|\/\/[^\n]*|#[^\n]*|--[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\$[A-Za-z_]\w*)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)/g;
    let out = "", last = 0, m;
    while ((m = re.exec(code))) {
      out += esc(code.slice(last, m.index));
      const [tok, c, s, v, n, w] = m;
      if (c) out += `<span class="tok-c">${esc(tok)}</span>`;
      else if (s) out += `<span class="tok-s">${esc(tok)}</span>`;
      else if (v) out += `<span class="tok-v">${esc(tok)}</span>`;
      else if (n) out += `<span class="tok-n">${esc(tok)}</span>`;
      else if (w && KW.has(w.toLowerCase())) out += `<span class="tok-k">${esc(tok)}</span>`;
      else out += esc(tok);
      last = m.index + tok.length;
    }
    return out + esc(code.slice(last));
  }

  function markdown(src) {
    const lines = String(src).replace(/\r\n?/g, "\n").split("\n");
    const out = [];
    let i = 0;
    const isBlockStart = (l) => /^(```|#{1,6}\s|>\s?|\s*[-*]\s+|\s*\d+[.)]\s+|\|)/.test(l);

    while (i < lines.length) {
      const line = lines[i];
      if (!line.trim()) { i++; continue; }

      const fence = line.match(/^```\s*([\w+-]*)/);
      if (fence) {
        const buf = []; i++;
        while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]);
        i++;
        const lang = fence[1] || "";
        out.push(`<pre${lang ? ` data-lang="${esc(lang)}"` : ""}><code>${highlight(buf.join("\n"))}</code></pre>`);
        continue;
      }
      const h = line.match(/^(#{1,6})\s+(.*)$/);
      if (h) { const lvl = Math.min(4, Math.max(3, h[1].length + 1)); out.push(`<h${lvl}>${inline(h[2])}</h${lvl}>`); i++; continue; }

      if (/^>\s?/.test(line)) {
        const buf = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ""));
        out.push(`<blockquote>${inline(buf.join(" "))}</blockquote>`);
        continue;
      }
      if (/^\s*([-*]|\d+[.)])\s+/.test(line)) {
        const ordered = /^\s*\d+[.)]\s+/.test(line);
        const items = [];
        while (i < lines.length && /^\s*([-*]|\d+[.)])\s+/.test(lines[i])) {
          let item = lines[i++].replace(/^\s*([-*]|\d+[.)])\s+/, "");
          while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !/^\s*([-*]|\d+[.)])\s+/.test(lines[i])) item += " " + lines[i++].trim();
          items.push(`<li>${inline(item)}</li>`);
        }
        out.push(ordered ? `<ol>${items.join("")}</ol>` : `<ul>${items.join("")}</ul>`);
        continue;
      }
      if (/^\|/.test(line) && i + 1 < lines.length && /^\|?\s*:?-{3,}/.test(lines[i + 1])) {
        const cells = (l) => l.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
        const head = cells(line); i += 2;
        const rows = [];
        while (i < lines.length && /^\|/.test(lines[i])) rows.push(cells(lines[i++]));
        out.push(`<table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead><tbody>${
          rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`);
        continue;
      }
      const buf = [line]; i++;
      while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i])) buf.push(lines[i++]);
      out.push(`<p>${inline(buf.join(" "))}</p>`);
    }
    return `<div class="md">${out.join("")}</div>`;
  }

  /* ------------------------------------------------------------------ *
   * Sidebar
   * ------------------------------------------------------------------ */
  let collapsed = store.get(KEYS.collapsed, {});

  function renderSidebar() {
    const nav = $("#sidebar");
    nav.innerHTML = `
      <a class="side-home" href="#/">${icon("home")}Umumiy ko'rinish</a>
      <a class="side-levels" href="#/levels">${icon("target")}Darajalar xaritasi</a>
      <a class="side-interview" href="#/interview">${icon("help")}Intervyu savollari</a>
      <a class="side-quiz" href="#/quiz">${icon("sparkles")}Texnik Testlar (Quiz)</a>
      ${GROUPS.map((g) => `
        <div class="side-group" data-group="${g.id}" data-collapsed="${!!collapsed[g.id]}">
          <button class="side-group-btn" aria-expanded="${!collapsed[g.id]}" aria-controls="sg-${g.id}">
            ${icon(g.icon)}<span>${esc(g.title)}</span><span class="count">${g.items.length}</span>${icon("chev-down", "ic ic-sm chev")}
          </button>
          <ul class="side-list" id="sg-${g.id}">
            ${g.items.map((s) => `
              <li><a class="side-link" href="#/s/${s.slug}" data-slug="${s.slug}">
                <span class="num">${pad(s.num)}</span><span class="t">${esc(s.title)}</span><span class="pct" data-pct="${s.slug}"></span>
              </a></li>`).join("")}
          </ul>
        </div>`).join("")}`;
    nav.addEventListener("click", (e) => {
      const btn = e.target.closest(".side-group-btn");
      if (!btn) return;
      const grp = btn.parentElement;
      const now = grp.dataset.collapsed !== "true";
      grp.dataset.collapsed = String(now);
      btn.setAttribute("aria-expanded", String(!now));
      collapsed[grp.dataset.group] = now;
      store.set(KEYS.collapsed, collapsed);
    });
    updateSidebarProgress();
  }

  function updateSidebarProgress(onlySlug) {
    (onlySlug ? [BY_SLUG[onlySlug]] : SKILLS).forEach((s) => {
      const el = $(`[data-pct="${s.slug}"]`);
      if (!el) return;
      const p = pct(statsFor(s.subskills).progress);
      el.textContent = p ? `${p}%` : "";
      el.classList.toggle("done", p === 100);
    });
  }

  function markActive(slug, isLevels = false, isInterview = false, isQuiz = false) {
    $$(".side-link").forEach((a) => {
      if (a.dataset.slug === slug) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    const home = $(".side-home");
    const levels = $(".side-levels");
    const interview = $(".side-interview");
    const quiz = $(".side-quiz");
    if (home) {
      if (!slug && !isLevels && !isInterview && !isQuiz) home.setAttribute("aria-current", "page"); else home.removeAttribute("aria-current");
    }
    if (levels) {
      if (isLevels) levels.setAttribute("aria-current", "page"); else levels.removeAttribute("aria-current");
    }
    if (interview) {
      if (isInterview) interview.setAttribute("aria-current", "page"); else interview.removeAttribute("aria-current");
    }
    if (quiz) {
      if (isQuiz) quiz.setAttribute("aria-current", "page"); else quiz.removeAttribute("aria-current");
    }
    if (slug) {
      const link = $(`.side-link[data-slug="${slug}"]`);
      const grp = link && link.closest(".side-group");
      if (grp && grp.dataset.collapsed === "true") grp.querySelector(".side-group-btn").click();
      if (link) {
        const nav = $("#sidebar"), r = link.getBoundingClientRect(), nr = nav.getBoundingClientRect();
        if (r.top < nr.top + 40 || r.bottom > nr.bottom - 40) link.scrollIntoView({ block: "center" });
      }
    }
  }

  /* ------------------------------------------------------------------ *
   * Views
   * ------------------------------------------------------------------ */
  const view = () => $("#view");

  function loadErrorBlock() {
    if (!LOAD_ISSUES.length) return "";
    return `<div class="load-error" role="alert">
      <h3>${icon("alert")}${LOAD_ISSUES.length} ta ma'lumot fayli yuklanmadi</h3>
      Odatda bu fayldagi sintaksis xatosi (yopilmagan qo'shtirnoq, ortiqcha vergul va h.k.) sababli bo'ladi.
      <ul>${LOAD_ISSUES.map((x) => `<li>data/skills/${esc(x.file)} — ${esc(x.msg)}</li>`).join("")}</ul>
    </div>`;
  }

  function statusLegend(counts) {
    return `<div class="status-legend">${STATUSES.map((s, i) =>
      `<span data-st="${i}"><i class="st-dot"></i>${s.label} <b>${counts[i]}</b></span>`).join("")}</div>`;
  }

  const TECH_STACK = [
    {
      title: "PHP",
      ver: "7.4+ → 8.4",
      desc: "Tipizatsiya, Attributes, Enums, Fibers, JIT, OPcache va Property Hooks.",
      tags: ["PHP 8.3/8.4", "OOP", "OPcache", "JIT"],
      slug: "php",
      icon: "code"
    },
    {
      title: "Laravel Framework",
      ver: "10+ / 11+",
      desc: "Service Container, Eloquent ORM, Pipeline, Octane, Reverb va Artisan ekotizimi.",
      tags: ["Laravel 11", "Eloquent", "Octane", "Artisan"],
      slug: "laravel",
      icon: "rocket"
    },
    {
      title: "MySQL & PostgreSQL",
      ver: "MySQL 8.0+ / PG 15+",
      desc: "InnoDB, ACID, B-Tree indekslar, EXPLAIN, Partitioning va Tranzaksiyalar.",
      tags: ["MySQL 8", "PostgreSQL", "ACID", "Indexes"],
      slug: "mysql",
      icon: "database"
    },
    {
      title: "Redis In-Memory",
      ver: "Redis 7.0+",
      desc: "Cache-Aside, Distributed Lock (Redlock), Streams, Pub/Sub va Eviction siyosatlari.",
      tags: ["Redis 7", "Cache-Aside", "Redlock", "Streams"],
      slug: "redis",
      icon: "gauge"
    },
    {
      title: "Docker & Compose",
      ver: "Docker 24+ / Compose v2",
      desc: "Multi-stage Dockerfile, Alpine, konteynerlar izolyatsiyasi, volume va tarmoqlar.",
      tags: ["Multi-stage", "Alpine", "Compose", "Linux"],
      slug: "docker",
      icon: "boxes"
    },
    {
      title: "Nginx & PHP-FPM / Octane",
      ver: "Nginx 1.24+ / FastCGI",
      desc: "pm.max_children tuning, Reverse Proxy, FrankenPHP, Swoole va HTTP/2 / HTTPS.",
      tags: ["PHP-FPM", "Nginx", "FrankenPHP", "FastCGI"],
      slug: "php-fpm",
      icon: "server"
    },
    {
      title: "Laravel Horizon & Queues",
      ver: "Horizon 5+ / Queues",
      desc: "Asinxron ishlov, Idempotent job'lar, auto-balancing, batching, chaining va Supervisor.",
      tags: ["Horizon", "Queues", "Supervisor", "Workers"],
      slug: "queues-and-background-jobs",
      icon: "queue"
    },
    {
      title: "RabbitMQ & Apache Kafka",
      ver: "RabbitMQ 3.12+ / Kafka 3+",
      desc: "Event-Driven arxitektura, xabarlar brokiri, stream processing va consumer groups.",
      tags: ["RabbitMQ", "Kafka", "EDA", "Events"],
      slug: "rabbitmq",
      icon: "branch"
    },
    {
      title: "Sanctum & API Security",
      ver: "Sanctum / OAuth 2.0",
      desc: "SPA Cookie-based sessiyalar, Bearer API Tokenlar, HMAC webhooks, CSRF va OWASP himoyasi.",
      tags: ["Sanctum", "OAuth 2.0", "HMAC", "OWASP Top 10"],
      slug: "laravel-sanctum",
      icon: "shield"
    },
    {
      title: "Pest & PHPUnit",
      ver: "Pest v2/v3 · PHPUnit 10+",
      desc: "Unit, Feature va Architecture testing (`arch()`), Mocking, Fake va TDD metodologiyasi.",
      tags: ["Pest PHP", "PHPUnit 10", "Arch Testing", "TDD"],
      slug: "pest",
      icon: "flask"
    },
    {
      title: "PHPStan & Larastan",
      ver: "Level 8 / Max",
      desc: "Statik kod tahlili, qat'iy tiplar nazorati, yashirin buglarni CI bosqichidayoq aniqlash.",
      tags: ["Larastan", "Level 8+", "Strict Types", "CI/CD"],
      slug: "phpstan",
      icon: "check"
    },
    {
      title: "DDD & Clean Architecture",
      ver: "Hexagonal / DDD",
      desc: "Entities, Value Objects, Aggregate Roots, Dependency Inversion va Bounded Contexts.",
      tags: ["DDD", "Clean Arch", "SOLID", "Patterns"],
      slug: "domain-driven-design-ddd",
      icon: "layers"
    }
  ];

  function renderHome() {
    const subs = allSubs();
    const st = statsFor(subs);
    const last = BY_SLUG[store.get(KEYS.last, "")];
    const first = SKILLS[0];
    const focus = subs.filter((x) => { const v = statusOf(x.id); return v === 1 || v === 2; }).slice(0, 6);

    view().innerHTML = `
      ${loadErrorBlock()}
      <section class="hero-grid reveal">
        <div class="hero">
          <span class="eyebrow"><span class="dot"></span>Senior PHP / Laravel Developer</span>
          <h1>${SKILLS.length} ta skill.<br><span class="grad">${subs.length.toLocaleString("en-US")} ta mavzu.</span><br>Bitta yo'l xaritasi.</h1>
          <p class="lead">PHP asoslaridan tortib arxitektura review'gacha — Category → Skill → Subskill tuzilmasida. Har bir mavzuni belgilab boring, progressingiz brauzerda saqlanadi.</p>
          <button class="hero-search" data-open-palette>${icon("search")}<span>Qidirish: N+1, Sanctum, EXPLAIN…</span><kbd>/</kbd></button>
          <div class="hero-actions">
            ${last ? `<a class="btn btn-primary" href="#/s/${last.slug}">Davom ettirish: ${esc(last.title)} ${icon("arrow-right")}</a>`
                   : first ? `<a class="btn btn-primary" href="#/s/${first.slug}">Boshlash: ${esc(first.title)} ${icon("arrow-right")}</a>` : ""}
            <button class="btn" data-scroll-groups>Bo'limlarni ko'rish</button>
          </div>
          <div class="hero-stack-chips">
            <span class="hero-stack-label">Stack:</span>
            <a href="#/s/php" class="stack-chip"><span class="dot"></span>PHP 7.4+ → 8.4</a>
            <a href="#/s/laravel" class="stack-chip"><span class="dot"></span>Laravel 10+ / 11+</a>
            <a href="#/s/mysql" class="stack-chip"><span class="dot"></span>MySQL 8.0+</a>
            <a href="#/s/redis" class="stack-chip"><span class="dot"></span>Redis 7+</a>
            <a href="#/s/docker" class="stack-chip"><span class="dot"></span>Docker</a>
            <a href="#/s/php-fpm" class="stack-chip"><span class="dot"></span>PHP-FPM / Octane</a>
            <a href="#/s/queues-and-background-jobs" class="stack-chip"><span class="dot"></span>Queues & Horizon</a>
            <a href="#/s/pest" class="stack-chip"><span class="dot"></span>Pest / PHPUnit</a>
          </div>
        </div>
        <aside class="panel hero-panel" aria-label="Umumiy progress">
          <div class="panel-head"><span class="kicker">PROGRESS</span><span class="mono-dim">${st.done}/${st.total}</span></div>
          <div class="hero-ring${pct(st.progress) === 0 ? " is-zero" : ""}">
            <svg viewBox="0 0 120 120" aria-hidden="true"><circle class="track" cx="60" cy="60" r="52"/>
              <circle class="val" cx="60" cy="60" r="52" stroke-dasharray="${2 * Math.PI * 52}" stroke-dashoffset="${2 * Math.PI * 52 * (1 - st.progress)}"/></svg>
            <div class="hero-ring-label"><b>${pct(st.progress)}<small>%</small></b><span>o'zlashtirildi</span></div>
          </div>
          <ul class="status-bars">${STATUSES.map((x, i) => `
            <li data-st="${i}"><span class="name"><i class="st-dot"></i>${x.label}</span><b>${st.counts[i]}</b>
              <span class="mini-bar"><i style="width:${(st.counts[i] / (st.total || 1)) * 100}%"></i></span></li>`).join("")}
          </ul>
        </aside>
      </section>

      <section class="stats reveal" aria-label="Statistika">
        <div class="stat"><div class="label">${icon("boxes", "ic ic-sm")}Skill'lar</div><div class="value">${SKILLS.length}</div></div>
        <div class="stat"><div class="label">${icon("list-checks", "ic ic-sm")}Subskill'lar</div><div class="value">${subs.length}</div></div>
        <div class="stat"><div class="label">${icon("layers", "ic ic-sm")}Bo'limlar</div><div class="value">${GROUPS.length}</div></div>
        <div class="stat"><div class="label">${icon("file", "ic ic-sm")}Tavsiflar yozilgan</div>
          <div class="value">${st.described}<small> / ${st.total}</small></div>
          <div class="bar"><i style="width:${(st.described / (st.total || 1)) * 100}%"></i></div></div>
      </section>

      <div class="section-head" id="stack">
        <div>
          <span class="kicker">// ASOSIY STEK</span>
          <h2>Texnologiyalar steki</h2>
          <p>Yo'l xaritasida qamrab olingan asosiy texnologiyalar, vositalar va ularning zamonaviy versiyalari</p>
        </div>
      </div>
      <div class="stack-grid">
        ${TECH_STACK.map((t) => `
          <a class="stack-card" href="#/s/${t.slug}">
            <div>
              <div class="stack-card-head">
                <span class="stack-card-icon">${icon(t.icon)}</span>
                <span class="stack-card-ver">${esc(t.ver)}</span>
              </div>
              <h3>${esc(t.title)}</h3>
              <p>${esc(t.desc)}</p>
              <div class="stack-card-tags">
                ${t.tags.map((tag) => `<span class="stack-tag">${esc(tag)}</span>`).join("")}
              </div>
            </div>
            <div class="stack-card-foot">
              <span>Xaritada o'rganish</span>
              <span class="stack-card-link">Ko'rish ${icon("arrow-right", "ic ic-sm")}</span>
            </div>
          </a>
        `).join("")}
      </div>

      ${focus.length ? `
        <div class="section-head"><div><span class="kicker">// 01</span><h2>Hozir ustida ishlayapsiz</h2><p>Learning va Practicing holatidagi mavzular</p></div></div>
        <div class="focus-list">${focus.map((x) => `
          <a class="focus-item" href="#/s/${x.skill.slug}/${x.id}" data-st="${statusOf(x.id)}">
            <i class="st-dot"></i><div><div class="t">${inline(x.title)}</div><div class="s">${pad(x.skill.num)} · ${esc(x.skill.title)} · ${STATUSES[statusOf(x.id)].label}</div></div>
          </a>`).join("")}</div>` : ""}

      <div class="section-head" id="levels"><div><span class="kicker">// ${focus.length ? "02" : "01"}</span><h2>Karyera darajalari</h2><p>Junior, Middle, Senior va Lead bosqichlari bo'yicha ko'nikmalar taqsimoti</p></div></div>
      <div class="levels-grid">${CAREER_LEVELS.map((lvl) => {
        const lvlSubs = subs.filter((x) => levelOf(x) === lvl.id);
        const ls = statsFor(lvlSubs);
        return `<a class="level-card panel" href="#/levels?lvl=${lvl.id}" style="--lvl-color:${lvl.color};--lvl-bg:${lvl.bg}">
          <div class="level-card-top">
            <span class="level-card-icon">${icon(lvl.icon)}</span>
            <span class="level-card-badge">${lvl.badge}</span>
          </div>
          <h3>${esc(lvl.name)}</h3>
          <p>${esc(lvl.desc)}</p>
          <div class="level-card-foot">
            <div class="level-card-meta">
              <span class="count">${lvlSubs.length} ta mavzu · ${ls.done} o'zlashtirildi</span>
              <span class="pct">${pct(ls.progress)}%</span>
            </div>
            <div class="bar"><i style="width:${pct(ls.progress)}%"></i></div>
          </div>
        </a>`;
      }).join("")}</div>

      <div class="section-head" id="groups"><div><span class="kicker">// ${focus.length ? "03" : "02"}</span><h2>Bo'limlar</h2><p>${GROUPS.length} ta yo'nalish bo'yicha guruhlangan</p></div></div>
      <div class="groups">${GROUPS.map((g, gi) => {
        const gs = statsFor(g.items.flatMap((s) => s.subskills));
        return `<article class="group-card panel" style="--p:${pct(gs.progress)}%">
          <span class="card-index">${pad(gi + 1)}</span>
          <div class="group-top">
            <span class="group-icon">${icon(g.icon)}</span>
            <div><h3>${esc(g.title)}</h3><div class="meta">${g.items.length} skill · ${gs.total} mavzu</div></div>
            <span class="pct">${pct(gs.progress)}%</span>
          </div>
          <div class="bar"><i style="width:${pct(gs.progress)}%"></i></div>
          <ul class="group-skills">${g.items.map((s) => `
            <li><a href="#/s/${s.slug}"><span class="num">${pad(s.num)}</span><span class="t">${esc(s.title)}</span><span class="n">${s.subskills.length}</span></a></li>`).join("")}
          </ul>
        </article>`;
      }).join("")}</div>

      <aside class="note">
        <span class="group-icon">${icon("info")}</span>
        <div><h3>Muhim jihat</h3>
        <p>Barcha subskill'larni Senior darajasida chuqur bilish shart emas. AWS, RabbitMQ va Microservices ko'p loyihalarda foydali, lekin ularning zarurligi vakansiya va kompaniya arxitekturasiga bog'liq. PHP, Laravel, SQL, ma'lumotlar bazasi optimizatsiyasi, API, testing, debugging, security va system design esa Senior Laravel yo'nalishining markaziy ko'nikmalaridir.</p></div>
      </aside>`;
  }

  function placeholder(title, path) {
    return `<div class="placeholder">${icon("file")}<div><b>${title}</b>Bu joy tavsif uchun ajratilgan. To'ldirish: <code>${esc(path)}</code></div></div>`;
  }

  function subItem(x) {
    const st = statusOf(x.id);
    const domId = `sub-${x.id.replace(/\./g, "-")}`;
    const chips = [
      x.priority && PRIORITY[x.priority] ? `<span class="chip ${x.priority}">${PRIORITY[x.priority]}</span>` : "",
      x.level ? `<span class="chip level">${esc(x.level)}</span>` : "",
      !x.description ? `<span class="chip missing" title="Tavsif hali yozilmagan">tavsif yo'q</span>` : "",
    ].join("");
    const prereq = x.prerequisites.map((p) => {
      const target = SUB_BY_ID[p] || BY_SLUG[p];
      if (!target) return `<span class="chip">${inline(p)}</span>`;
      const href = target.skill ? `#/s/${target.skill.slug}/${target.id}` : `#/s/${target.slug}`;
      return `<a class="chip" href="${href}">${target.skill ? `<span class="mono">${target.num}</span> ` : ""}${inline(target.title)}</a>`;
    }).join("");

    return `<li class="sub" id="${domId}" data-sub="${x.id}" data-st="${st}" data-level="${levelOf(x)}">
      <div class="sub-row">
        <button class="st-toggle" data-cycle aria-label="Status: ${STATUSES[st].label}. Keyingisiga o'tkazish">
          <span class="ring"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span>
        </button>
        <button class="sub-main" data-toggle aria-expanded="false" aria-controls="${domId}-panel">
          <span class="sid">${x.num}</span><span class="t">${inline(x.title)}</span>
        </button>
        <div class="sub-side">
          <span class="chips">${chips}</span>
          <span class="st-name">${st ? STATUSES[st].label : ""}</span>
          <button class="icon-btn" data-toggle aria-label="Batafsil" tabindex="-1">${icon("chev-down", "ic chev")}</button>
        </div>
      </div>
      <div class="sub-panel" id="${domId}-panel" role="region" aria-label="${esc(x.title.replace(/`/g, ""))}">
        <div><div class="sub-body">
          <div>${x.description ? markdown(x.description)
            : placeholder("Tavsif hali yozilmagan", `data/skills/${x.skill.file} → id: "${x.id}" → description`)}</div>
          ${x.practicalTask ? `<div><div class="field-label">${icon("target", "ic ic-sm")}Amaliy topshiriq</div><div class="task">${markdown(x.practicalTask)}</div></div>` : ""}
          ${x.acceptanceCriteria.length ? `<div><div class="field-label">${icon("list-checks", "ic ic-sm")}Qabul mezonlari</div>
            <ul class="checklist">${x.acceptanceCriteria.map((c) => `<li>${icon("check")}<span>${inline(c)}</span></li>`).join("")}</ul></div>` : ""}
          ${prereq ? `<div><div class="field-label">Oldindan bilish kerak</div><div class="prereq">${prereq}</div></div>` : ""}
          <div class="status-picker-wrap"><div class="field-label" id="${domId}-st">Status</div>
            <div class="status-picker" role="radiogroup" aria-labelledby="${domId}-st">
              ${STATUSES.map((s, i) => `<button role="radio" data-set="${i}" data-st="${i}" aria-checked="${i === st}" title="${s.hint}"><i class="st-dot"></i>${s.label}</button>`).join("")}
            </div></div>
          <div class="sub-foot"><button class="btn btn-sm" data-copy>${icon("link", "ic ic-sm")}Havolani nusxalash</button></div>
        </div></div>
      </div>
    </li>`;
  }

  let filter = "all";
  let levelFilter = "all";
  const FILTERS = [
    ["all", "Hammasi"], ["todo", "Boshlanmagan"], ["wip", "Jarayonda"], ["done", "O'zlashtirilgan"],
  ];
  const passes = (st, lvl) => {
    const stOk = filter === "all" || (filter === "todo" && st === 0) || (filter === "wip" && (st === 1 || st === 2)) || (filter === "done" && st >= 3);
    const lvlOk = levelFilter === "all" || levelFilter === lvl;
    return stOk && lvlOk;
  };

  function railHtml(s) {
    const st = statsFor(s.subskills);
    const C = 2 * Math.PI * 36;
    return `
      <section class="card" aria-label="Progress">
        <h3>Progress</h3>
        <div class="ring-chart">
          <svg viewBox="0 0 84 84" aria-hidden="true"><circle class="track" cx="42" cy="42" r="36"/>
            <circle class="val" cx="42" cy="42" r="36" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - st.progress)}"/></svg>
          <div><div class="big">${pct(st.progress)}%</div><div class="small">${st.done} / ${st.total} o'zlashtirilgan</div></div>
        </div>
        <ul class="breakdown">${STATUSES.map((x, i) => `<li data-st="${i}"><i class="st-dot"></i>${x.label}<b>${st.counts[i]}</b></li>`).join("")}</ul>
      </section>
      <section class="card" aria-label="Tavsiflar">
        <h3>Tavsiflar</h3>
        <div class="ring-chart" style="margin-top:12px"><div><div class="big">${st.described}<span style="font-size:15px;color:var(--text-3)"> / ${st.total}</span></div>
          <div class="small">subskill tavsifi yozilgan</div></div></div>
        <div class="bar"><i style="width:${(st.described / (st.total || 1)) * 100}%"></i></div>
        <p style="margin-top:14px;font-size:13px;color:var(--text-3)">Manba fayl:<br><code class="inline-code" style="word-break:break-all">data/skills/${esc(s.file)}</code></p>
      </section>`;
  }

  function renderSkill(s, subId) {
    store.set(KEYS.last, s.slug);
    const prev = SKILLS[s.index - 1], next = SKILLS[s.index + 1];
    const g = s.groupRef;
    const st = statsFor(s.subskills);

    view().innerHTML = `
      ${loadErrorBlock()}
      <div class="skill-layout">
        <article>
          <nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Bosh sahifa</a><span class="sep">/</span><span>${esc(g ? g.title : "")}</span><span class="sep">/</span><span aria-current="page">${esc(s.title)}</span></nav>
          <header class="skill-head reveal">
            <div class="idx">SKILL ${pad(s.num)} / ${SKILLS.length}</div>
            <h1>${esc(s.title)}</h1>
            <div class="chips">
              ${g ? `<span class="chip">${icon(g.icon, "ic ic-sm")}${esc(g.title)}</span>` : ""}
              <span class="chip mono">${s.subskills.length} subskill</span>
              <span class="chip mono" data-desc-chip>tavsif ${st.described}/${st.total}</span>
            </div>
          </header>
          <div class="desc-block">${s.description ? markdown(s.description)
            : placeholder("Skill tavsifi hali yozilmagan", `data/skills/${s.file} → description`)}</div>

          <div class="toolbar">
            <h2>Subskill'lar <span class="chip">${s.subskills.length}</span></h2>
            <div class="seg" role="group" aria-label="Status bo'yicha filtr">
              ${FILTERS.map(([k, l]) => `<button data-filter="${k}" aria-pressed="${filter === k}">${l}</button>`).join("")}
            </div>
            <div class="level-seg" role="group" aria-label="Daraja bo'yicha filtr">
              <button data-level-filter="all" aria-pressed="${levelFilter === "all"}">Barchasi</button>
              ${CAREER_LEVELS.map((lvl) => `<button data-level-filter="${lvl.id}" aria-pressed="${levelFilter === lvl.id}">${lvl.label}</button>`).join("")}
            </div>
            <button class="icon-btn" data-expand-all aria-label="Hammasini ochish / yopish" title="Hammasini ochish / yopish">${icon("expand")}</button>
          </div>
          <ul class="subs" id="subs">${s.subskills.map(subItem).join("")}</ul>
          <div class="empty" id="subs-empty" hidden>${icon("search")}<div>Bu filtr bo'yicha mavzu yo'q.</div></div>

          <nav class="pager" aria-label="Skill'lar orasida">
            ${prev ? `<a href="#/s/${prev.slug}"><span class="dir">${icon("arrow-left", "ic ic-sm")}Oldingi</span><span class="t">${pad(prev.num)} · ${esc(prev.title)}</span></a>` : ""}
            ${next ? `<a class="next" href="#/s/${next.slug}"><span class="dir">Keyingi${icon("arrow-right", "ic ic-sm")}</span><span class="t">${pad(next.num)} · ${esc(next.title)}</span></a>` : ""}
          </nav>
        </article>
        <aside class="rail" id="rail">${railHtml(s)}</aside>
      </div>`;

    applyFilter();
    if (subId && SUB_BY_ID[subId] && SUB_BY_ID[subId].skill === s) {
      const li = $(`[data-sub="${CSS.escape(subId)}"]`);
      if (li) {
        if (li.hidden) {
          filter = "all";
          levelFilter = "all";
          $$("[data-filter]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === "all")));
          $$("[data-level-filter]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.levelFilter === "all")));
          applyFilter();
        }
        toggleSub(li, true);
        requestAnimationFrame(() => li.scrollIntoView({ block: "start" }));
      }
    }
  }

  function applyFilter() {
    let visible = 0;
    $$("#subs .sub").forEach((li) => {
      const ok = passes(Number(li.dataset.st), li.dataset.level);
      li.hidden = !ok; if (ok) visible++;
    });
    const empty = $("#subs-empty");
    if (empty) empty.hidden = visible > 0;
  }

  function toggleSub(li, force) {
    const open = force ?? !li.classList.contains("open");
    li.classList.toggle("open", open);
    li.querySelector(".sub-main").setAttribute("aria-expanded", String(open));
  }

  function refreshSkillStats(s) {
    const rail = $("#rail");
    if (rail) rail.innerHTML = railHtml(s);
    updateSidebarProgress(s.slug);
  }

  function changeStatus(li, st) {
    const id = li.dataset.sub;
    setStatus(id, st);
    li.dataset.st = String(st);
    li.querySelector(".st-name").textContent = st ? STATUSES[st].label : "";
    li.querySelector("[data-cycle]").setAttribute("aria-label", `Status: ${STATUSES[st].label}. Keyingisiga o'tkazish`);
    $$(".status-picker [data-set]", li).forEach((b) => b.setAttribute("aria-checked", String(Number(b.dataset.set) === st)));
    refreshSkillStats(SUB_BY_ID[id].skill);
    updateRoadmapTabs();
  }

  /* view-level event delegation (skill page) */
  document.addEventListener("click", (e) => {
    const t = e.target;
    if (t.closest("[data-open-palette]")) { openPalette(); return; }
    if (t.closest("[data-scroll-groups]")) { $("#groups").scrollIntoView({ behavior: "smooth" }); return; }

    const li = t.closest(".sub");
    if (li) {
      if (t.closest("[data-cycle]")) { changeStatus(li, (Number(li.dataset.st) + 1) % STATUSES.length); return; }
      const set = t.closest("[data-set]");
      if (set) { changeStatus(li, Number(set.dataset.set)); return; }
      if (t.closest("[data-toggle]")) { toggleSub(li); return; }
      if (t.closest("[data-copy]")) {
        const s = SUB_BY_ID[li.dataset.sub].skill;
        copyText(`${location.href.split("#")[0]}#/s/${s.slug}/${li.dataset.sub}`);
        return;
      }
    }
    const lf = t.closest("[data-level-filter]");
    if (lf) {
      levelFilter = lf.dataset.levelFilter;
      $$("[data-level-filter]").forEach((b) => b.setAttribute("aria-pressed", String(b === lf)));
      applyFilter();
      return;
    }
    const f = t.closest("[data-filter]");
    if (f) {
      filter = f.dataset.filter;
      $$("[data-filter]").forEach((b) => b.setAttribute("aria-pressed", String(b === f)));
      applyFilter();
      return;
    }
    if (t.closest("[data-expand-all]")) {
      const items = $$(".subs .sub:not([hidden])");
      const anyClosed = items.some((x) => !x.classList.contains("open"));
      items.forEach((x) => toggleSub(x, anyClosed));
      return;
    }
    const iqToggle = t.closest("[data-iq-toggle]");
    if (iqToggle) {
      const card = iqToggle.closest(".iq-card");
      if (card) {
        const nowOpen = card.classList.toggle("open");
        iqToggle.setAttribute("aria-expanded", String(nowOpen));
      }
      return;
    }
    const iqCheck = t.closest("[data-iq-check]");
    if (iqCheck) {
      toggleMasteredIq(iqCheck.dataset.iqCheck);
      return;
    }
    const iqBookmark = t.closest("[data-iq-bookmark]");
    if (iqBookmark) {
      toggleBookmarkIq(iqBookmark.dataset.iqBookmark);
      return;
    }
    const iqScrollQuiz = t.closest("[data-iq-scroll-quiz]");
    if (iqScrollQuiz) {
      const qSection = document.getElementById("iq-quiz-section");
      if (qSection) qSection.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const quizCatBtn = t.closest("[data-quiz-cat]");
    if (quizCatBtn) {
      handleQuizChangeCat(quizCatBtn.dataset.quizCat);
      return;
    }
    const quizLevelBtn = t.closest("[data-quiz-level]");
    if (quizLevelBtn) {
      handleQuizChangeLevel(quizLevelBtn.dataset.quizLevel);
      return;
    }
    const quizCountBtn = t.closest("[data-quiz-count]");
    if (quizCountBtn) {
      handleQuizSetCount(quizCountBtn.dataset.quizCount);
      return;
    }
    const quizStartBtn = t.closest("[data-quiz-start]");
    if (quizStartBtn) {
      handleQuizStart();
      return;
    }
    const quizOptBtn = t.closest("[data-quiz-opt]");
    if (quizOptBtn && !quizOptBtn.disabled) {
      handleQuizSelect(quizOptBtn.dataset.quizOpt);
      return;
    }
    const quizNextBtn = t.closest("[data-quiz-next]");
    if (quizNextBtn) {
      handleQuizNext();
      return;
    }
    const quizRestartBtn = t.closest("[data-quiz-restart]");
    if (quizRestartBtn) {
      handleQuizRestart();
      return;
    }
    const quizToLobbyBtn = t.closest("[data-quiz-to-lobby]");
    if (quizToLobbyBtn) {
      handleQuizBackToLobby();
      return;
    }
    const quizReviewWrongsBtn = t.closest("[data-quiz-review-wrongs]");
    if (quizReviewWrongsBtn) {
      handleQuizReviewWrongs();
      return;
    }
    const quizChooseCatBtn = t.closest("[data-quiz-choose-cat]");
    if (quizChooseCatBtn) {
      const catsEl = document.querySelector(".iq-quiz-cats");
      if (catsEl) catsEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      handleQuizChangeCat("all");
      return;
    }
    const quizScrollTopBtn = t.closest("[data-quiz-scroll-top]");
    if (quizScrollTopBtn) {
      const topEl = document.querySelector(".iq-hero");
      if (topEl) topEl.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const iqStartMock = t.closest("[data-iq-start-mock]");
    if (iqStartMock) {
      openMockModal("setup");
      return;
    }
    const mockCountBtn = t.closest("[data-mock-count]");
    if (mockCountBtn) {
      mockSelectedCount = Number(mockCountBtn.dataset.mockCount);
      $$("[data-mock-count]").forEach(b => b.setAttribute("aria-pressed", String(b === mockCountBtn)));
      return;
    }
    if (t.closest("[data-mock-start]")) {
      startMockTest(mockSelectedCount);
      return;
    }
    if (t.closest("[data-mock-close]")) {
      closeMockModal();
      return;
    }
    if (t.closest("[data-mock-reveal]")) {
      revealMockAnswer();
      return;
    }
    const mockEvalBtn = t.closest("[data-mock-eval]");
    if (mockEvalBtn) {
      recordMockEval(mockEvalBtn.dataset.mockEval);
      return;
    }
    if (t.closest("[data-mock-restart]")) {
      openMockModal("setup");
      return;
    }
    const iqCopy = t.closest("[data-iq-copy]");
    if (iqCopy) {
      const qId = iqCopy.dataset.iqCopy;
      const q = (window.INTERVIEW_QUESTIONS || []).find((x) => x.id === qId);
      if (q) {
        const ans = Array.isArray(q.answer) ? q.answer.join("\n") : q.answer;
        const full = `Savol: ${q.title}\n\nJavob:\n${ans}\n\n${q.tip ? "Senior Maslahati: " + q.tip : ""}`;
        copyText(full);
        toast("Savol va javob nusxalandi");
      }
      return;
    }
    const iqReveal = t.closest("[data-iq-reveal]");
    if (iqReveal) {
      const qId = iqReveal.dataset.iqReveal;
      const promptEl = $(`#prompt-${CSS.escape(qId)}`);
      const ansEl = $(`#ans-${CSS.escape(qId)}`);
      if (promptEl) promptEl.style.display = "none";
      if (ansEl) ansEl.style.display = "block";
      return;
    }
    const lvlBtn = t.closest("[data-iq-lvl]");
    if (lvlBtn) {
      iqFilterLevel = lvlBtn.dataset.iqLvl;
      $$("[data-iq-lvl]").forEach((b) => b.setAttribute("aria-pressed", String(b === lvlBtn)));
      filterInterviewList();
      return;
    }
    const catBtn = t.closest("[data-iq-cat]");
    if (catBtn) {
      iqFilterCat = catBtn.dataset.iqCat;
      $$("[data-iq-cat]").forEach((b) => b.setAttribute("aria-pressed", String(b === catBtn)));
      filterInterviewList();
      return;
    }
    const statusBtn = t.closest("[data-iq-status]");
    if (statusBtn) {
      iqFilterStatus = statusBtn.dataset.iqStatus;
      $$("[data-iq-status]").forEach((b) => b.setAttribute("aria-pressed", String(b === statusBtn)));
      filterInterviewList();
      return;
    }
    const practiceBtn = t.closest("[data-iq-practice]");
    if (practiceBtn) {
      iqPracticeMode = !iqPracticeMode;
      practiceBtn.classList.toggle("active", iqPracticeMode);
      practiceBtn.setAttribute("aria-pressed", String(iqPracticeMode));
      filterInterviewList();
      toast(iqPracticeMode ? "Sinov rejimi yoqildi! Model javoblar yashirildi." : "Sinov rejimi o'chirildi.");
      return;
    }
    const clearBtn = t.closest("[data-iq-clear-search]");
    if (clearBtn) {
      const inp = $("#iq-search-input");
      if (inp) { inp.value = ""; iqSearchQuery = ""; filterInterviewList(); }
      return;
    }
    const resetBtn = t.closest("[data-iq-reset-filters]");
    if (resetBtn) {
      iqFilterLevel = "all";
      iqFilterCat = "all";
      iqFilterStatus = "all";
      iqSearchQuery = "";
      const inp = $("#iq-search-input");
      if (inp) inp.value = "";
      $$("[data-iq-lvl]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.iqLvl === "all")));
      $$("[data-iq-cat]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.iqCat === "all")));
      $$("[data-iq-status]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.iqStatus === "all")));
      filterInterviewList();
      return;
    }
  });

  /* keyboard support for status picker (arrow keys inside radiogroup) */
  document.addEventListener("keydown", (e) => {
    const radio = e.target.closest && e.target.closest(".status-picker [role=radio]");
    if (!radio || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
    e.preventDefault();
    const li = radio.closest(".sub");
    const dir = e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 1;
    const st = (Number(li.dataset.st) + dir + STATUSES.length) % STATUSES.length;
    changeStatus(li, st);
    $(`.status-picker [data-set="${st}"]`, li).focus();
  });

  function updateRoadmapTabs() {
    const all = allSubs();
    CAREER_LEVELS.forEach((lvl) => {
      const s = statsFor(all.filter((x) => levelOf(x) === lvl.id));
      const pctEl = $(`[data-roadmap-pct="${lvl.id}"]`);
      const barEl = $(`[data-roadmap-bar="${lvl.id}"]`);
      const countEl = $(`[data-roadmap-count="${lvl.id}"]`);
      if (pctEl) pctEl.textContent = `${pct(s.progress)}%`;
      if (barEl) barEl.style.width = `${pct(s.progress)}%`;
      if (countEl) countEl.textContent = `${s.total} ta mavzu · ${s.done} o'zlashtirildi`;
    });
  }

  /* ------------------------------------------------------------------ *
   * Career Levels Roadmap View
   * ------------------------------------------------------------------ */
  let currentRoadmapLvl = "junior";

  function renderLevels(targetLvl) {
    if (targetLvl && CAREER_LEVELS.some((c) => c.id === targetLvl)) {
      currentRoadmapLvl = targetLvl;
    }
    const all = allSubs();
    const curLevelObj = CAREER_LEVELS.find((c) => c.id === currentRoadmapLvl) || CAREER_LEVELS[0];
    const lvlSubs = all.filter((x) => levelOf(x) === currentRoadmapLvl);
    const lvlStats = statsFor(lvlSubs);

    const skillGroups = [];
    const seenSkills = new Map();
    lvlSubs.forEach((sub) => {
      if (!seenSkills.has(sub.skill)) {
        const item = { skill: sub.skill, subs: [] };
        seenSkills.set(sub.skill, item);
        skillGroups.push(item);
      }
      seenSkills.get(sub.skill).subs.push(sub);
    });

    view().innerHTML = `
      ${loadErrorBlock()}
      <nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Bosh sahifa</a><span class="sep">/</span><span aria-current="page">Darajalar xaritasi</span></nav>
      <header class="skill-head reveal" style="margin-bottom:var(--sp-5)">
        <div class="idx">CAREER ROADMAP</div>
        <h1>Darajalar xaritasi</h1>
        <p class="lead" style="margin-top:8px">Junior, Middle, Senior va Lead bosqichlarida talab qilinadigan barcha ko'nikmalarning saralangan to'liq xaritasi.</p>
      </header>

      <div class="roadmap-tabs" role="tablist" aria-label="Darajalar">
        ${CAREER_LEVELS.map((lvl) => {
          const s = statsFor(all.filter((x) => levelOf(x) === lvl.id));
          const isActive = lvl.id === currentRoadmapLvl;
          return `
            <a class="roadmap-tab-btn" href="#/levels?lvl=${lvl.id}" role="tab" aria-selected="${isActive}" style="--lvl-color:${lvl.color}">
              <div class="roadmap-tab-head">
                <span class="roadmap-tab-title">${icon(lvl.icon, "ic ic-sm")} ${lvl.label}</span>
                <span class="roadmap-tab-pct" data-roadmap-pct="${lvl.id}">${pct(s.progress)}%</span>
              </div>
              <div class="bar"><i data-roadmap-bar="${lvl.id}" style="width:${pct(s.progress)}%;background:${lvl.color}"></i></div>
              <div style="font-size:12px;color:var(--text-3);margin-top:2px" data-roadmap-count="${lvl.id}">${s.total} ta mavzu · ${s.done} o'zlashtirildi</div>
            </a>
          `;
        }).join("")}
      </div>

      <div class="section-head" style="margin-top:var(--sp-6)">
        <div>
          <span class="kicker">${curLevelObj.badge} DARAJASIDAGI MAVZULAR</span>
          <h2>${esc(curLevelObj.name)} — ${lvlSubs.length} ta mavzu</h2>
          <p>${esc(curLevelObj.desc)}</p>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="icon-btn" data-expand-all aria-label="Hammasini ochish / yopish" title="Hammasini ochish / yopish">${icon("expand")}</button>
        </div>
      </div>

      <div class="roadmap-content">
        ${skillGroups.map(({ skill, subs }) => `
          <div class="roadmap-skill-group">
            <div class="roadmap-group-header">
              <a href="#/s/${skill.slug}">
                <span class="mono-dim" style="font-family:var(--mono);font-size:13px">${pad(skill.num)}.</span>
                <span>${esc(skill.title)}</span>
                <span class="chip" style="font-size:11px">${subs.length} ta subskill</span>
              </a>
              <a class="btn btn-sm" href="#/s/${skill.slug}" style="text-decoration:none">${icon("arrow-right", "ic ic-sm")} Skill sahifasi</a>
            </div>
            <ul class="subs roadmap-group-subs">${subs.map(subItem).join("")}</ul>
          </div>
        `).join("")}
      </div>`;
  }

  /* ------------------------------------------------------------------ *
   * Interview Questions & Answers View
   * ------------------------------------------------------------------ */
  let iqFilterLevel = "all";
  let iqFilterCat = "all";
  let iqFilterStatus = "all";
  let iqPracticeMode = false;
  let iqSearchQuery = "";

  const IQ_CATEGORIES = [
    { id: "all", label: "Barchasi" },
    { id: "php", label: "PHP tili" },
    { id: "laravel", label: "Laravel" },
    { id: "database", label: "Ma'lumotlar bazasi" },
    { id: "architecture", label: "Arxitektura" },
    { id: "async", label: "Navbatlar & Async" },
    { id: "security", label: "Xavfsizlik" },
    { id: "testing", label: "Testlash" },
    { id: "devops", label: "DevOps & Server" }
  ];

  function toggleMasteredIq(id) {
    if (masteredIq.has(id)) {
      masteredIq.delete(id);
    } else {
      masteredIq.add(id);
    }
    store.set(KEYS.questions, Array.from(masteredIq));
    saveToLinkedFile();
    const btn = $(`[data-iq-check="${id}"]`);
    if (btn) {
      const isDone = masteredIq.has(id);
      btn.classList.toggle("done", isDone);
      btn.innerHTML = `${icon(isDone ? "check" : "target", "ic ic-sm")} ${isDone ? "O'zlashtirildi" : "O'zlashtirish"}`;
    }
    const card = $(`#${CSS.escape(id)}`);
    if (card) {
      const isDone = masteredIq.has(id);
      let doneTag = card.querySelector(".tag-done");
      if (isDone && !doneTag) {
        const meta = card.querySelector(".iq-meta");
        if (meta) {
          const span = document.createElement("span");
          span.className = "tag-done";
          span.style.cssText = "color:var(--accent-text);font-weight:600;display:inline-flex;align-items:center;gap:3px";
          span.innerHTML = `${icon("check", "ic ic-sm")} O'zlashtirildi`;
          meta.appendChild(span);
        }
      } else if (!isDone && doneTag) {
        doneTag.remove();
      }
    }
    updateIqStats();
  }


  function toggleBookmarkIq(id) {
    if (bookmarkedIq.has(id)) {
      bookmarkedIq.delete(id);
      toast("Sevimlilardan olib tashlandi");
    } else {
      bookmarkedIq.add(id);
      toast("Sevimlilarga saqlashga qo'shildi ⭐");
    }
    store.set(KEYS.bookmarks, Array.from(bookmarkedIq));
    saveToLinkedFile();
    const btn = $(`[data-iq-bookmark="${id}"]`);
    if (btn) {
      const isSaved = bookmarkedIq.has(id);
      btn.classList.toggle("active", isSaved);
      btn.title = isSaved ? "Sevimlilardan o'chirish" : "Sevimlilarga saqlash";
    }
    updateIqStats();
    if (iqFilterStatus === "bookmarked") {
      filterInterviewList();
    }
  }

  function getIqFilteredList() {
    const questions = window.INTERVIEW_QUESTIONS || [];
    return questions.filter((q) => {
      const matchLvl = iqFilterLevel === "all" || q.level === iqFilterLevel;
      const matchCat = iqFilterCat === "all" || q.category === iqFilterCat;
      const isMastered = masteredIq.has(q.id);
      const isBookmarked = bookmarkedIq.has(q.id);
      const matchStatus = iqFilterStatus === "all" ||
        (iqFilterStatus === "mastered" && isMastered) ||
        (iqFilterStatus === "unmastered" && !isMastered) ||
        (iqFilterStatus === "bookmarked" && isBookmarked);
      const matchSearch = !iqSearchQuery ||
        q.title.toLowerCase().includes(iqSearchQuery) ||
        (Array.isArray(q.answer) ? q.answer.join(" ") : q.answer).toLowerCase().includes(iqSearchQuery) ||
        (q.tip || "").toLowerCase().includes(iqSearchQuery) ||
        (q.categoryLabel || "").toLowerCase().includes(iqSearchQuery) ||
        (q.subskillId || "").toLowerCase().includes(iqSearchQuery);
      return matchLvl && matchCat && matchStatus && matchSearch;
    });
  }

  function updateIqStats() {
    const questions = window.INTERVIEW_QUESTIONS || [];
    const total = questions.length || 1;
    const doneCount = Array.from(masteredIq).filter((id) => questions.some((q) => q.id === id)).length;
    const remainingCount = Math.max(0, questions.length - doneCount);
    const progressPct = pct(doneCount / total);

    const statDoneEl = $("#iq-stat-done");
    const statRemEl = $("#iq-stat-remaining");
    const statPctEl = $("#iq-stat-pct");
    const statBarEl = $("#iq-stat-bar");
    const ringPctEl = $("#iq-ring-pct");
    const ringCircleEl = $("#iq-ring-circle");
    const countEl = $("#iq-result-count");

    if (statDoneEl) statDoneEl.innerHTML = `${doneCount} <small>/ ${questions.length}</small>`;
    if (statRemEl) statRemEl.textContent = `${remainingCount} ta`;
    if (statPctEl) statPctEl.textContent = `${progressPct}%`;
    if (statBarEl) statBarEl.style.width = `${progressPct}%`;
    if (ringPctEl) ringPctEl.textContent = `${progressPct}%`;

    if (ringCircleEl) {
      const circumference = 251.3;
      const offset = circumference - (circumference * (doneCount / total));
      ringCircleEl.style.strokeDashoffset = String(offset);
    }

    if (countEl) {
      const filtered = getIqFilteredList();
      countEl.textContent = `${filtered.length} ta savol`;
    }

    // Holat pilla tugmalari ichidagi sonlarni yangilash
    const allBtn = $('[data-iq-status="all"] .count-chip');
    const bBtn = $('[data-iq-status="bookmarked"] .count-chip');
    const mBtn = $('[data-iq-status="mastered"] .count-chip');
    const uBtn = $('[data-iq-status="unmastered"] .count-chip');
    if (allBtn) allBtn.textContent = String(questions.length);
    if (bBtn) bBtn.textContent = String(bookmarkedIq.size);
    if (mBtn) mBtn.textContent = String(doneCount);
    if (uBtn) uBtn.textContent = String(remainingCount);
  }

  function renderInterviewItems() {
    const filtered = getIqFilteredList();

    if (!filtered.length) {
      return `
        <div class="empty" style="padding:var(--sp-8) var(--sp-4);background:var(--surface);border:1px dashed var(--border);border-radius:var(--r-lg);margin-top:var(--sp-4)">
          <div style="font-size:32px;color:var(--text-3);margin-bottom:8px">${icon("search")}</div>
          <h3 style="margin-bottom:6px;font-size:16px;color:var(--text)">Ushbu filtr bo'yicha savollar topilmadi</h3>
          <p style="font-size:13px;color:var(--text-3);margin-bottom:14px">Qidiruv so'zini o'zgartiring yoki filtrlarni dastlabki holatiga qaytaring.</p>
          <button class="btn btn-sm" data-iq-reset-filters>${icon("reset", "ic ic-sm")} Filtrlarni tozalash</button>
        </div>
      `;
    }

    return filtered.map((q) => {
      const isMastered = masteredIq.has(q.id);
      const isBookmarked = bookmarkedIq.has(q.id);
      const isOpen = false;
      const cleanNum = q.id.replace("iq-", "");

      return `
        <article class="iq-card ${isOpen ? "open" : ""}" id="${q.id}" data-id="${q.id}" data-level="${q.level}">
          <button class="iq-card-header" data-iq-toggle="${q.id}" aria-expanded="${isOpen}">
            <span class="iq-badge ${q.level}">${q.level}</span>
            <div class="iq-title-wrap">
              <div class="iq-title">${esc(q.title)}</div>
              <div class="iq-meta">
                <span class="tag-cat">${esc(q.categoryLabel)}</span>
                <span>·</span>
                <span>ID: <code class="inline-code">#${cleanNum}</code></span>
                ${q.subskillId ? `<span>· Mavzu: <code class="inline-code">${esc(q.subskillId)}</code></span>` : ""}
                ${isBookmarked ? `<span style="color:#F59E0B;font-weight:600;display:inline-flex;align-items:center;gap:3px">★ Saqlangan</span>` : ""}
                ${isMastered ? `<span class="tag-done" style="color:var(--accent-text);font-weight:600;display:inline-flex;align-items:center;gap:3px">${icon("check", "ic ic-sm")} O'zlashtirildi</span>` : ""}
              </div>
            </div>
            <span class="iq-chev">${icon("chev-down", "ic")}</span>
          </button>
          <div class="iq-card-body">
            ${iqPracticeMode ? `
              <div class="iq-practice-prompt" id="prompt-${q.id}">
                <p><strong>${icon("target", "ic ic-sm")} Sinov rejimi:</strong> Savolga avval o'zingiz mustaqil javob berishga urinib ko'ring, so'ngra model javob bilan tekshiring.</p>
                <button class="iq-reveal-btn" data-iq-reveal="${q.id}">Javobni ko'rish →</button>
              </div>
              <div class="iq-ans-wrapper" id="ans-${q.id}" style="display:none">
                <div class="iq-answer-label">${icon("target", "ic ic-sm")} Model javob (Kutiladigan chuqur tushuntirish):</div>
                <div class="iq-answer-prose">${markdown(q.answer)}</div>
                ${q.tip ? `
                  <div class="iq-tip-box">
                    <h4>${icon("sparkles", "ic ic-sm")} Senior maslahati & Intervyu sirlari</h4>
                    <p>${esc(q.tip)}</p>
                  </div>
                ` : ""}
              </div>
            ` : `
              <div class="iq-ans-wrapper" id="ans-${q.id}">
                <div class="iq-answer-label">${icon("target", "ic ic-sm")} Model javob (Kutiladigan chuqur tushuntirish):</div>
                <div class="iq-answer-prose">${markdown(q.answer)}</div>
                ${q.tip ? `
                  <div class="iq-tip-box">
                    <h4>${icon("sparkles", "ic ic-sm")} Senior maslahati & Intervyu sirlari</h4>
                    <p>${esc(q.tip)}</p>
                  </div>
                ` : ""}
              </div>
            `}
            <div class="iq-card-foot">
              <div class="iq-card-actions-left">
                <button class="iq-check-btn ${isMastered ? "done" : ""}" data-iq-check="${q.id}">
                  ${icon(isMastered ? "check" : "target", "ic ic-sm")} ${isMastered ? "O'zlashtirildi" : "O'zlashtirish"}
                </button>
                <button class="iq-bookmark-btn ${isBookmarked ? "active" : ""}" data-iq-bookmark="${q.id}" title="${isBookmarked ? "Sevimlilardan o'chirish" : "Sevimlilarga saqlash"}">
                  ${icon("sparkles", "ic ic-sm")}
                </button>
                <button class="iq-copy-btn" data-iq-copy="${q.id}" title="Savol va javobni nusxalash">
                  ${icon("copy", "ic ic-sm")} Nusxalash
                </button>
              </div>
              ${q.skillSlug ? `
                <a href="#/s/${q.skillSlug}/${q.subskillId || ""}">
                  ${icon("arrow-right", "ic ic-sm")} Ushbu mavzuni xaritada o'rganish
                </a>
              ` : ""}
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  function filterInterviewList() {
    const listEl = $("#iq-items");
    if (listEl) {
      listEl.innerHTML = renderInterviewItems();
    }
    const countEl = $("#iq-result-count");
    if (countEl) {
      const filtered = getIqFilteredList();
      countEl.textContent = `${filtered.length} ta savol`;
    }
    const resetWrap = $("#iq-reset-wrap");
    if (resetWrap) {
      const isFiltered = iqFilterLevel !== "all" || iqFilterCat !== "all" || iqFilterStatus !== "all" || !!iqSearchQuery;
      resetWrap.innerHTML = isFiltered
        ? `<button class="iq-reset-link" data-iq-reset-filters>${icon("reset", "ic ic-sm")} Filtrlarni tozalash</button>`
        : "";
    }
  }

  function renderInterview() {
    const questions = window.INTERVIEW_QUESTIONS || [];
    const total = questions.length || 1;
    const doneCount = Array.from(masteredIq).filter((id) => questions.some((q) => q.id === id)).length;
    const remainingCount = Math.max(0, questions.length - doneCount);
    const progressPct = pct(doneCount / total);
    const seniorLeadCount = questions.filter((q) => q.level === "senior" || q.level === "lead").length;

    // Har bir darajadagi savollar sonini oldindan hisoblash
    const lvlCounts = {
      all: questions.length,
      junior: questions.filter((q) => q.level === "junior").length,
      middle: questions.filter((q) => q.level === "middle").length,
      senior: questions.filter((q) => q.level === "senior").length,
      lead: questions.filter((q) => q.level === "lead").length
    };

    // Har bir sohadagi savollar sonini hisoblash
    const catCounts = {};
    IQ_CATEGORIES.forEach((c) => {
      catCounts[c.id] = c.id === "all" ? questions.length : questions.filter((q) => q.category === c.id).length;
    });

    const circumference = 251.3;
    const ringOffset = circumference - (circumference * (doneCount / total));

    view().innerHTML = `
      ${loadErrorBlock()}
      <nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Bosh sahifa</a><span class="sep">/</span><span aria-current="page">Intervyu savol-javoblari</span></nav>
      
      <header class="iq-hero reveal">
        <div class="iq-hero-main">
          <div class="idx">TECHNICAL INTERVIEW PREPARATION & BENCHMARK</div>
          <h1>Intervyu Savol-Javoblari</h1>
          <p class="lead">
            PHP, Laravel, MySQL, Redis, Navbatlar, Arxitektura, Xavfsizlik va DevOps bo'yicha real texnik intervyularda eng ko'p tushadigan chuqur <strong>${questions.length} ta</strong> savol, model javoblar va Senior maslahatlari.
          </p>
        </div>
        <div class="iq-hero-ring-wrap">
          <div class="iq-ring" aria-label="Tayyorgarlik darajasi: ${progressPct}%">
            <svg viewBox="0 0 100 100" width="96" height="96">
              <circle class="track" cx="50" cy="50" r="40"></circle>
              <circle class="val" id="iq-ring-circle" cx="50" cy="50" r="40"
                style="stroke-dasharray: 251.3; stroke-dashoffset: ${ringOffset}"></circle>
            </svg>
            <div class="iq-ring-text">
              <b id="iq-ring-pct">${progressPct}%</b>
              <span>TAYYORLIK</span>
            </div>
          </div>
          <div style="font:700 11px var(--mono);text-transform:uppercase;letter-spacing:.06em;color:var(--text-3)">Tayyorgarlik darajasi</div>
        </div>
      </header>

      <section class="iq-stats-grid reveal" aria-label="Intervyu statistikasi">
        <div class="iq-stat-box">
          <div class="iq-stat-label">${icon("help", "ic ic-sm")} Jami savollar</div>
          <div class="iq-stat-num">${questions.length} <small>ta</small></div>
          <div class="iq-stat-sub">8 ta yo'nalish bo'yicha</div>
        </div>
        <div class="iq-stat-box">
          <div class="iq-stat-label">${icon("check", "ic ic-sm")} O'zlashtirildi</div>
          <div class="iq-stat-num" id="iq-stat-done" style="color:var(--accent-text)">${doneCount} <small>/ ${questions.length}</small></div>
          <div class="iq-stat-sub">Shaxsiy trackerda qayd etilgan</div>
        </div>
        <div class="iq-stat-box">
          <div class="iq-stat-label">${icon("target", "ic ic-sm")} O'rganish kerak</div>
          <div class="iq-stat-num" id="iq-stat-remaining">${remainingCount} <small>ta</small></div>
          <div class="iq-stat-sub">Hali belgilanmagan savollar</div>
        </div>
        <div class="iq-stat-box">
          <div class="iq-stat-label">${icon("sparkles", "ic ic-sm")} Senior & Lead</div>
          <div class="iq-stat-num" style="color:var(--st-4)">${seniorLeadCount} <small>ta</small></div>
          <div class="iq-stat-sub">Eng chuqur arxitektura savollari</div>
        </div>
      </section>

      <section class="iq-controls reveal" aria-label="Boshqaruv va qidiruv">
        <div class="iq-search-row">
          <div class="iq-search-box">
            ${icon("search", "ic")}
            <input type="search" id="iq-search-input" placeholder="Savol, texnologiya yoki kalit so'zni qidiring (masalan: N+1, idempotency, redis, lock)..." value="${esc(iqSearchQuery)}" />
            ${iqSearchQuery ? `<button class="iq-search-clear" data-iq-clear-search aria-label="Qidiruvni tozalash">${icon("close", "ic ic-sm")}</button>` : ""}
          </div>
          <div class="iq-tools">
            <button class="iq-tool-btn primary" data-iq-start-mock title="Jonli intervyu simulyatori (Mock test)">
              ${icon("rocket", "ic ic-sm")}
              <span>Mock Imtihon</span>
            </button>
            <button class="iq-tool-btn ${iqPracticeMode ? "active" : ""}" data-iq-practice aria-pressed="${iqPracticeMode}" title="Model javoblarni yashirib, o'zingizni sinash">
              ${icon("help", "ic ic-sm")}
              <span>Sinov rejimi</span>
            </button>
          </div>
        </div>

        <div class="iq-pills-wrap">
          <div class="iq-pills-row">
            <span class="iq-pills-label">Holat:</span>
            <div class="iq-pills" id="iq-status-pills">
              <button type="button" class="iq-pill" data-iq-status="all" aria-pressed="${iqFilterStatus === "all"}">
                Barchasi <span class="count-chip">${questions.length}</span>
              </button>
              <button type="button" class="iq-pill" data-iq-status="bookmarked" aria-pressed="${iqFilterStatus === "bookmarked"}">
                ⭐ Saqlanganlar <span class="count-chip">${bookmarkedIq.size}</span>
              </button>
              <button type="button" class="iq-pill" data-iq-status="mastered" aria-pressed="${iqFilterStatus === "mastered"}">
                O'zlashtirilgan <span class="count-chip">${doneCount}</span>
              </button>
              <button type="button" class="iq-pill" data-iq-status="unmastered" aria-pressed="${iqFilterStatus === "unmastered"}">
                O'rganish kerak <span class="count-chip">${remainingCount}</span>
              </button>
            </div>
          </div>

          <div class="iq-pills-row">
            <span class="iq-pills-label">Daraja:</span>
            <div class="iq-pills" id="iq-level-pills">
              <button type="button" class="iq-pill" data-iq-lvl="all" aria-pressed="${iqFilterLevel === "all"}">Barchasi <span class="count-chip">${lvlCounts.all}</span></button>
              <button type="button" class="iq-pill" data-iq-lvl="junior" aria-pressed="${iqFilterLevel === "junior"}">Junior <span class="count-chip">${lvlCounts.junior}</span></button>
              <button type="button" class="iq-pill" data-iq-lvl="middle" aria-pressed="${iqFilterLevel === "middle"}">Middle <span class="count-chip">${lvlCounts.middle}</span></button>
              <button type="button" class="iq-pill" data-iq-lvl="senior" aria-pressed="${iqFilterLevel === "senior"}">Senior <span class="count-chip">${lvlCounts.senior}</span></button>
              <button type="button" class="iq-pill" data-iq-lvl="lead" aria-pressed="${iqFilterLevel === "lead"}">Lead <span class="count-chip">${lvlCounts.lead}</span></button>
            </div>
          </div>

          <div class="iq-pills-row">
            <span class="iq-pills-label">Yo'nalish:</span>
            <div class="iq-pills" id="iq-cat-pills">
              ${IQ_CATEGORIES.map((c) => `
                <button type="button" class="iq-pill" data-iq-cat="${c.id}" aria-pressed="${iqFilterCat === c.id}">
                  ${esc(c.label)} <span class="count-chip">${catCounts[c.id]}</span>
                </button>
              `).join("")}
            </div>
          </div>
        </div>

        <div class="iq-results-bar">
          <div>Filtr bo'yicha: <strong id="iq-result-count" style="color:var(--text)">${getIqFilteredList().length} ta savol</strong> ko'rsatilmoqda</div>
          <div id="iq-reset-wrap">
            ${(iqFilterLevel !== "all" || iqFilterCat !== "all" || iqFilterStatus !== "all" || iqSearchQuery) ? `
              <button class="iq-reset-link" data-iq-reset-filters>${icon("reset", "ic ic-sm")} Filtrlarni tozalash</button>
            ` : ""}
          </div>
        </div>
      </section>

      <div class="iq-list reveal" id="iq-items">
        ${renderInterviewItems()}
      </div>
    `;
const searchInp = $("#iq-search-input");
    if (searchInp) {
      searchInp.addEventListener("input", (e) => {
        iqSearchQuery = e.target.value.toLowerCase().trim();
        filterInterviewList();
        const clearBtn = $("[data-iq-clear-search]");
        if (iqSearchQuery && !clearBtn) {
          const btn = document.createElement("button");
          btn.className = "iq-search-clear";
          btn.setAttribute("data-iq-clear-search", "");
          btn.setAttribute("aria-label", "Qidiruvni tozalash");
          btn.innerHTML = icon("close", "ic ic-sm");
          searchInp.parentElement.appendChild(btn);
        } else if (!iqSearchQuery && clearBtn) {
          clearBtn.remove();
        }
      });
    }
  }

  /* ------------------------------------------------------------------ *
   * Interactive Quiz & Assessment Engine (A, B, C, D Tests)
   * ------------------------------------------------------------------ */
  const QUIZ_CATEGORIES = [
    { id: "all", label: "Barchasi", icon: "🌟" },
    { id: "php", label: "PHP & OOP", icon: "🐘" },
    { id: "laravel", label: "Laravel Core", icon: "⚡" },
    { id: "eloquent", label: "Eloquent & DB", icon: "🗄️" },
    { id: "api", label: "REST API & Auth", icon: "🌐" },
    { id: "redis", label: "Redis & Kesh", icon: "⚡" },
    { id: "queue", label: "Navbatlar (Queue)", icon: "📬" },
    { id: "security", label: "Xavfsizlik", icon: "🛡️" },
    { id: "architecture", label: "Arxitektura", icon: "🏛️" },
    { id: "devops", label: "DevOps & Linux", icon: "🐳" }
  ];

  const QUIZ_LEVELS = [
    { id: "all", label: "Barcha darajalar", icon: "⚡" },
    { id: "junior", label: "Junior", icon: "🌱" },
    { id: "middle", label: "Middle", icon: "🔷" },
    { id: "senior", label: "Senior", icon: "🔥" }
  ];

  let quizActiveCat = "all";
  let quizActiveLevel = "all";
  let quizSelectedCount = 10;
  let quizState = "lobby"; // "lobby" | "running" | "finished"
  let quizIdx = 0;
  let quizQuestions = [];
  let quizAnswers = {};
  let quizScores = {};
  let quizCurrentStreak = 0;
  let quizMaxStreak = 0;

  try {
    const raw = localStorage.getItem("lsm:quiz_scores");
    if (raw) quizScores = JSON.parse(raw);
  } catch (e) {}

  function getQuizPool(catId = quizActiveCat, levelId = quizActiveLevel) {
    const all = window.INTERVIEW_TESTS || [];
    return all.filter(t => {
      const matchCat = (catId === "all" || t.category === catId);
      const matchLevel = (levelId === "all" || (t.level || "middle") === levelId);
      return matchCat && matchLevel;
    });
  }

  function handleQuizChangeCat(catId) {
    quizActiveCat = catId;
    quizState = "lobby";
    updateQuizView();
  }

  function handleQuizChangeLevel(levelId) {
    quizActiveLevel = levelId;
    quizState = "lobby";
    updateQuizView();
  }

  function handleQuizSetCount(count) {
    quizSelectedCount = Number(count);
    updateQuizView();
  }

  function playSfx(type) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;
      if (type === "check") {
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === "streak") {
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(1046.50, now + 0.16);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.28);
      } else if (type === "celebrate") {
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.1);
        osc.frequency.setValueAtTime(783.99, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else {
        osc.frequency.setValueAtTime(320, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch (e) {}
  }

  function handleQuizStart() {
    const pool = getQuizPool();
    if (!pool.length) return;

    const shuffled = pool.slice().sort(() => 0.5 - Math.random());
    const count = (quizSelectedCount > 0 && quizSelectedCount < shuffled.length) ? quizSelectedCount : shuffled.length;
    quizQuestions = shuffled.slice(0, count);
    quizIdx = 0;
    quizAnswers = {};
    quizCurrentStreak = 0;
    quizMaxStreak = 0;
    quizState = "running";
    playSfx("toggle");
    updateQuizView();
  }

  function handleQuizSelect(optKey) {
    if (quizState !== "running" || !quizQuestions.length) return;
    const q = quizQuestions[quizIdx];
    if (quizAnswers[q.id]) return;

    const isRight = (optKey === q.correct);
    quizAnswers[q.id] = { selected: optKey, correct: q.correct, isRight };

    if (isRight) {
      quizCurrentStreak++;
      if (quizCurrentStreak > quizMaxStreak) quizMaxStreak = quizCurrentStreak;
      if (quizCurrentStreak >= 3) {
        playSfx("streak");
      } else {
        playSfx("check");
      }
    } else {
      quizCurrentStreak = 0;
      playSfx("toggle");
    }

    updateQuizView();
  }

  function handleQuizNext() {
    if (quizState !== "running") return;
    if (quizIdx + 1 < quizQuestions.length) {
      quizIdx++;
      updateQuizView();
    } else {
      quizState = "finished";
      playSfx("celebrate");
      updateQuizView();
    }
  }

  function handleQuizRestart() {
    handleQuizStart();
  }

  function handleQuizBackToLobby() {
    quizState = "lobby";
    updateQuizView();
  }

  function handleQuizReviewWrongs() {
    const wrongQs = quizQuestions.filter(q => quizAnswers[q.id] && !quizAnswers[q.id].isRight);
    if (!wrongQs.length) return;

    quizQuestions = wrongQs.slice().sort(() => 0.5 - Math.random());
    quizIdx = 0;
    quizAnswers = {};
    quizCurrentStreak = 0;
    quizState = "running";
    playSfx("toggle");
    updateQuizView();
  }

  function updateQuizView() {
    const box = document.getElementById("iq-quiz-box");
    if (box) {
      box.innerHTML = renderQuizInnerHtml();
    }

    document.querySelectorAll("[data-quiz-cat]").forEach(b => {
      const isActive = b.dataset.quizCat === quizActiveCat;
      b.classList.toggle("active", isActive);
      b.setAttribute("aria-pressed", String(isActive));
    });

    document.querySelectorAll("[data-quiz-level]").forEach(b => {
      const isActive = b.dataset.quizLevel === quizActiveLevel;
      b.classList.toggle("active", isActive);
      b.setAttribute("aria-pressed", String(isActive));
    });

    document.querySelectorAll("[data-quiz-count]").forEach(b => {
      const countVal = Number(b.dataset.quizCount);
      const isActive = (countVal === quizSelectedCount);
      b.classList.toggle("active", isActive);
    });
  }

  function renderQuizPage() {
    const allTests = window.INTERVIEW_TESTS || [];

    const catCounts = {};
    QUIZ_CATEGORIES.forEach(c => {
      catCounts[c.id] = c.id === "all" ? allTests.length : allTests.filter(t => t.category === c.id).length;
    });

    const levelCounts = {};
    QUIZ_LEVELS.forEach(lvl => {
      levelCounts[lvl.id] = lvl.id === "all" ? allTests.length : allTests.filter(t => (t.level || "middle") === lvl.id).length;
    });

    view().innerHTML = `
      ${loadErrorBlock()}
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="#/">Bosh sahifa</a>
        <span class="sep">/</span>
        <span aria-current="page">Texnik Testlar (Quiz Arena)</span>
      </nav>

      <header class="iq-hero reveal">
        <div class="iq-hero-main">
          <div class="qz-hero-badge">${icon("sparkles", "ic ic-sm")} INTERACTIVE DEVELOPER BENCHMARK</div>
          <h1>Texnik Testlar (Quiz Arena)</h1>
          <p class="lead">
            PHP, Laravel, Eloquent, SQL, Redis, Navbatlar, Xavfsizlik va Arxitektura bo'yicha 102+ ta real intervyu testlari. Mavzu va darajani tanlang, professional arena orqali o'z bilimlaringizni sinang va Senior dasturchi tushuntirishlarini o'rganing.
          </p>
        </div>
      </header>

      <!-- Filtrlar guruhi: Creative Grid Layout -->
      <div class="iq-quiz-filter-group reveal">
        <div class="iq-quiz-filter-label">
          ${icon("layers", "ic ic-sm")} 1. Yo'nalish va Mavzuni tanlang
        </div>
        <div class="qz-topics-grid">
          ${QUIZ_CATEGORIES.map(c => `
            <button type="button" class="qz-topic-card ${quizActiveCat === c.id ? "active" : ""}" data-quiz-cat="${c.id}" aria-pressed="${quizActiveCat === c.id}">
              ${quizScores[c.id] ? `<span class="qz-topic-score-badge">★ ${quizScores[c.id]}%</span>` : ""}
              <div class="qz-topic-head">
                <span class="qz-topic-icon">${c.icon}</span>
                <span class="qz-topic-count">${catCounts[c.id] || 0}</span>
              </div>
              <div class="qz-topic-name">${esc(c.label)}</div>
            </button>
          `).join("")}
        </div>

        <div class="iq-quiz-filter-label" style="margin-top:16px">
          ${icon("target", "ic ic-sm")} 2. Qiyinlik darajasini tanlang
        </div>
        <div class="qz-levels-grid">
          ${QUIZ_LEVELS.map(lvl => `
            <button type="button" class="qz-tier-btn ${quizActiveLevel === lvl.id ? "active" : ""}" data-quiz-level="${lvl.id}" aria-pressed="${quizActiveLevel === lvl.id}">
              <span>${lvl.icon} ${esc(lvl.label)}</span>
              <span class="iq-quiz-cat-count">${levelCounts[lvl.id] || 0}</span>
            </button>
          `).join("")}
        </div>
      </div>

      <div class="reveal" id="iq-quiz-box">
        ${renderQuizInnerHtml()}
      </div>
    `;
  }

  function renderQuizInnerHtml() {
    if (quizState === "lobby") {
      return renderQuizLobbyHtml();
    }
    if (quizState === "finished") {
      return renderQuizResultHtml();
    }
    return renderQuizQuestionHtml();
  }

  function renderQuizLobbyHtml() {
    const pool = getQuizPool();
    const totalAvailable = pool.length;

    const catObj = QUIZ_CATEGORIES.find(c => c.id === quizActiveCat);
    const lvlObj = QUIZ_LEVELS.find(l => l.id === quizActiveLevel);

    if (totalAvailable === 0) {
      return `
        <div class="qz-arena-card">
          <div class="qz-lobby-container">
            <div style="font-size:48px;margin-bottom:12px">🔍</div>
            <h2 class="qz-lobby-title">Mos testlar topilmadi</h2>
            <p class="qz-lobby-desc">
              Tanlangan <b>${esc(catObj ? catObj.label : quizActiveCat)}</b> mavzusi va <b>${esc(lvlObj ? lvlObj.label : quizActiveLevel)}</b> darajasi bo'yicha savollar topilmadi.
            </p>
            <button class="btn btn-primary" data-quiz-cat="all" data-quiz-level="all">
              Barcha testlarni ko'rish
            </button>
          </div>
        </div>
      `;
    }

    const countOptions = [];
    if (totalAvailable >= 5) countOptions.push(5);
    if (totalAvailable >= 10) countOptions.push(10);
    if (totalAvailable >= 15) countOptions.push(15);
    countOptions.push(0);

    if (quizSelectedCount !== 0 && quizSelectedCount > totalAvailable) {
      quizSelectedCount = totalAvailable >= 10 ? 10 : (totalAvailable >= 5 ? 5 : 0);
    }

    return `
      <div class="qz-arena-card">
        <div class="qz-lobby-container">
          <div class="qz-lobby-stage-badge">
            ${icon("zap", "ic ic-sm")} ARENA TAYYORGARLIK ZALI
          </div>
          <h2 class="qz-lobby-title">Bilim darajangizni sinovdan o'tkazing!</h2>
          <p class="qz-lobby-desc">
            Har bir savol real intervyu talablari asosida tuzilgan. Javob tanlaganingizdan so'ng darhol Senior darajadagi amaliy tushuntirish va to'g'ri kod arxitekturasi ko'rsatiladi.
          </p>

          <div class="qz-params-bar">
            <div class="qz-param-chip">
              <span>📂</span>
              <span>Mavzu: <b>${esc(catObj ? (catObj.icon + " " + catObj.label) : "Barchasi")}</b></span>
            </div>
            <span class="qz-param-sep">•</span>
            <div class="qz-param-chip">
              <span>🎯</span>
              <span>Daraja: <b>${esc(lvlObj ? (lvlObj.icon + " " + lvlObj.label) : "Barcha darajalar")}</b></span>
            </div>
            <span class="qz-param-sep">•</span>
            <div class="qz-param-chip">
              <span>📚</span>
              <span>Hovuzda: <b>${totalAvailable} ta</b> savol</span>
            </div>
          </div>

          <div style="font-size:13px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:12px;font-family:var(--mono)">
            Savollar miqdorini tanlang:
          </div>
          <div class="qz-count-selector">
            ${countOptions.map(c => `
              <button type="button" class="qz-count-pill ${quizSelectedCount === c ? "active" : ""}" data-quiz-count="${c}">
                ${c === 0 ? `Barchasi (${totalAvailable})` : `${c} ta`}
              </button>
            `).join("")}
          </div>

          <div>
            <button type="button" class="qz-start-cta" data-quiz-start>
              <span>⚡ Testni boshlash</span>
              <kbd class="qz-kbd-chip">Enter</kbd>
            </button>
          </div>

          <div class="iq-quiz-hints" style="margin-top:28px">
            <span>⌨️ Javob berish: <kbd class="iq-kbd-badge">A</kbd> <kbd class="iq-kbd-badge">B</kbd> <kbd class="iq-kbd-badge">C</kbd> <kbd class="iq-kbd-badge">D</kbd></span>
            <span>Keyingi savol: <kbd class="iq-kbd-badge">Enter</kbd></span>
          </div>
        </div>
      </div>
    `;
  }

  function renderQuizQuestionHtml() {
    if (!quizQuestions.length) {
      return renderQuizLobbyHtml();
    }

    const currentQ = quizQuestions[quizIdx];
    const totalQ = quizQuestions.length;
    const progressPct = Math.round(((quizIdx) / totalQ) * 100);

    let rightCount = 0;
    let wrongCount = 0;
    Object.values(quizAnswers).forEach(a => {
      if (a.isRight) rightCount++;
      else wrongCount++;
    });

    const isCurrentAnswered = Boolean(quizAnswers[currentQ.id]);
    const currentAnswerObj = quizAnswers[currentQ.id];
    const qLevel = currentQ.level || "middle";

    return `
      <div class="qz-arena-card">
        <div class="qz-hud-header">
          <div class="qz-hud-left">
            <span class="qz-badge-step">SAVOL ${quizIdx + 1} / ${totalQ}</span>
            <span class="qz-badge-level level-badge-${qLevel}">${qLevel.toUpperCase()}</span>
            <span class="qz-badge-topic">${esc(currentQ.categoryLabel || "")}</span>
          </div>
          <div class="qz-hud-right">
            ${quizCurrentStreak >= 2 ? `
              <div class="qz-streak-pill" title="Ketma-ket to'g'ri javoblar!">
                🔥 ${quizCurrentStreak}x Streak
              </div>
            ` : ""}
            <div class="qz-score-live-pill">
              <span class="qz-live-correct">✓ ${rightCount}</span>
              <span class="qz-live-wrong">✕ ${wrongCount}</span>
            </div>
          </div>
        </div>

        <div class="qz-progress-rail">
          <div class="qz-progress-bar" style="width: ${progressPct}%"></div>
        </div>

        <div class="qz-question-card">
          <div class="qz-question-text">${esc(currentQ.question)}</div>
          <div class="qz-question-sub">ID: ${currentQ.id} · Variantlardan birini tanlang (A, B, C, D)</div>
        </div>

        <div class="qz-options-list">
          ${currentQ.options.map(opt => {
            let extraClass = "";
            let badgeText = opt.key;

            if (isCurrentAnswered) {
              if (opt.key === currentQ.correct) {
                extraClass = "opt-correct";
                badgeText = "✓";
              } else if (opt.key === currentAnswerObj.selected) {
                extraClass = "opt-wrong";
                badgeText = "✕";
              } else {
                extraClass = "opt-dimmed";
              }
            }

            return `
              <button type="button" class="qz-option-row ${extraClass}" 
                      data-quiz-opt="${opt.key}" 
                      ${isCurrentAnswered ? "disabled" : ""}>
                <span class="qz-opt-key">${badgeText}</span>
                <span class="qz-opt-content">${esc(opt.text)}</span>
              </button>
            `;
          }).join("")}
        </div>

        ${isCurrentAnswered ? `
          <div class="qz-explanation-box">
            <div class="qz-exp-head">
              ${icon("sparkles", "ic ic-sm")} Senior Dasturchi Tushuntirishi
            </div>
            <div class="qz-exp-body">
              ${esc(currentQ.explanation)}
            </div>
          </div>
        ` : ""}

        <div class="qz-foot-bar">
          <div style="font-size:13.5px;color:var(--text-3);display:flex;align-items:center;gap:12px;flex-wrap:wrap">
            ${isCurrentAnswered 
              ? (currentAnswerObj.isRight ? "<span style='color:#16a34a;font-weight:700'>✓ Barakalla, to'g'ri javob!</span>" : "<span style='color:#dc2626;font-weight:700'>✕ Noto'g'ri. Tushuntirishni diqqat bilan o'rganing.</span>")
              : '<span>Variantni bosing yoki <kbd class="iq-kbd-badge">A</kbd> <kbd class="iq-kbd-badge">B</kbd> <kbd class="iq-kbd-badge">C</kbd> <kbd class="iq-kbd-badge">D</kbd> ni bosing</span>'}
            <button type="button" class="btn btn-sm" data-quiz-to-lobby style="padding:4px 10px;font-size:12px">
              Lobby ga qaytish
            </button>
          </div>
          <div>
            ${isCurrentAnswered ? `
              <button class="btn btn-primary" data-quiz-next>
                <span>${quizIdx + 1 < totalQ ? "Keyingi savol" : "Natijani ko'rish"}</span>
                <kbd class="qz-kbd-chip" style="margin-left:6px">Enter</kbd>
              </button>
            ` : `
              <button class="btn btn-sm" disabled style="opacity:.45">
                <span>Variant tanlang</span>
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }

  function renderQuizResultHtml() {
    const totalQ = quizQuestions.length;
    let rightCount = 0;
    let wrongCount = 0;
    Object.values(quizAnswers).forEach(a => {
      if (a.isRight) rightCount++;
      else wrongCount++;
    });
    const pctScore = totalQ > 0 ? Math.round((rightCount / totalQ) * 100) : 0;

    const prevBest = quizScores[quizActiveCat] || 0;
    if (pctScore > prevBest) {
      quizScores[quizActiveCat] = pctScore;
      try { localStorage.setItem("lsm:quiz_scores", JSON.stringify(quizScores)); } catch (e) {}
    }

    let emoji = "🎯";
    let badge = "Yaxshi natija";
    let badgeStyle = "background:rgba(59,130,246,0.15);color:#3b82f6;border:1px solid rgba(59,130,246,0.3)";
    let desc = "Siz asosiy amaliy bilimlarni yaxshi bilasiz. Ba'zi murakkab savollarda xatolar bo'ldi, Senior tushuntirishlarini o'qib chiqishni tavsiya qilamiz.";

    if (pctScore >= 90) {
      emoji = "🏆";
      badge = "LEAD / SENIOR DARAJASI!";
      badgeStyle = "background:linear-gradient(135deg, rgba(245,158,11,0.2), rgba(217,119,6,0.2));color:#f59e0b;border:1px solid rgba(245,158,11,0.4)";
      desc = "Mukammal va yuksak natija! Ushbu mavzudagi chuqur va nozik arxitektura jihatlarini to'liq o'zlashtirgansiz.";
    } else if (pctScore >= 70) {
      emoji = "⭐";
      badge = "STRONG MIDDLE DARAJASI";
      badgeStyle = "background:linear-gradient(135deg, rgba(34,197,94,0.18), rgba(16,185,129,0.18));color:#22c55e;border:1px solid rgba(34,197,94,0.35)";
      desc = "Mustahkam amaliy bilim! Bir nechta kam uchraydigan holatlarni qayta ko'rib chiqsangiz, har qanday texnik intervyudan muammosiz o'tasiz.";
    } else if (pctScore >= 50) {
      emoji = "📚";
      badge = "JUNIOR / PRE-MIDDLE";
      badgeStyle = "background:rgba(59,130,246,0.15);color:#3b82f6;border:1px solid rgba(59,130,246,0.3)";
      desc = "Qoniqarli natija. Ushbu mavzudagi tavsiya etilgan resurslar va savol-javoblarni qayta o'qib chiqishni maslahat beramiz.";
    } else {
      emoji = "💡";
      badge = "BOSHLANG'ICH DARAJA";
      badgeStyle = "background:rgba(239,68,68,0.15);color:#ef4444;border:1px solid rgba(239,68,68,0.3)";
      desc = "Ushbu yo'nalish bo'yicha nazariy va amaliy bilimlarni kuchaytirish zarur. Yo'l xaritasi bo'yicha ketma-ket o'rganing.";
    }

    // SVG Gauge calculation
    const radius = 64;
    const circumference = 2 * Math.PI * radius; // ~402.12
    const strokeDashoffset = circumference - (pctScore / 100) * circumference;
    const strokeColor = pctScore >= 90 ? "#f59e0b" : (pctScore >= 70 ? "#22c55e" : (pctScore >= 50 ? "#3b82f6" : "#ef4444"));

    return `
      <div class="qz-arena-card">
        <div class="qz-results-wrap">
          <div class="qz-gauge-container">
            <svg class="qz-gauge-svg" viewBox="0 0 160 160">
              <circle class="qz-gauge-bg" cx="80" cy="80" r="${radius}"></circle>
              <circle class="qz-gauge-progress" cx="80" cy="80" r="${radius}" 
                      style="stroke:${strokeColor};stroke-dasharray:${circumference};stroke-dashoffset:${strokeDashoffset}"></circle>
            </svg>
            <div class="qz-gauge-center">
              <span class="qz-gauge-pct">${pctScore}%</span>
              <span class="qz-gauge-ratio">${rightCount} / ${totalQ}</span>
            </div>
          </div>

          <div>
            <span class="qz-rank-badge" style="${badgeStyle}">
              ${emoji} ${badge}
            </span>
          </div>
          <p class="qz-results-desc">${desc}</p>

          <div class="qz-stats-grid">
            <div class="qz-stat-card">
              <div class="qz-stat-val" style="color:#22c55e">✓ ${rightCount}</div>
              <div class="qz-stat-lbl">To'g'ri javoblar</div>
            </div>
            <div class="qz-stat-card">
              <div class="qz-stat-val" style="color:#ef4444">✕ ${wrongCount}</div>
              <div class="qz-stat-lbl">Xatolar</div>
            </div>
            <div class="qz-stat-card">
              <div class="qz-stat-val" style="color:#f97316">🔥 ${quizMaxStreak}x</div>
              <div class="qz-stat-lbl">Maksimal Streak</div>
            </div>
          </div>

          <div class="qz-results-actions">
            ${wrongCount > 0 ? `
              <button class="btn btn-primary" data-quiz-review-wrongs style="background:linear-gradient(135deg,#ea580c,#c2410c);border-color:#ea580c;box-shadow:0 4px 14px rgba(234,88,12,0.35)">
                ${icon("refresh-cw", "ic ic-sm")} Faqat xato qilingan savollarni qayta ishlash (${wrongCount} ta)
              </button>
            ` : ""}
            <button class="btn btn-primary" data-quiz-restart>
              ${icon("reset", "ic ic-sm")} Barchasini qaytadan topshirish
            </button>
            <button class="btn" data-quiz-to-lobby>
              ${icon("target", "ic ic-sm")} Yangi test / Filtrlarni o'zgartirish
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /* ------------------------------------------------------------------ *
   * Mock Interview Simulator
   * ------------------------------------------------------------------ */
  let mockTimer = null;
  let mockQuestions = [];
  let mockIdx = 0;
  let mockScores = [];
  let mockSecondsLeft = 120;
  let mockSelectedCount = 10;

  function openMockModal(step = "setup") {
    let overlay = $("#mock-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "mock-overlay";
      overlay.className = "mock-overlay";
      document.body.appendChild(overlay);
    }
    if (step === "setup") {
      const pool = getIqFilteredList();
      if (!pool.length) {
        overlay.innerHTML = `
          <div class="mock-modal">
            <div class="mock-head">
              <h2>${icon("rocket", "ic")} Mock Imtihon</h2>
              <button class="mock-close-btn" data-mock-close aria-label="Yopish">✕</button>
            </div>
            <p style="color:var(--text-2);font-size:14px;line-height:1.5;margin-bottom:18px">
              Hozirgi tanlangan filtrlar bo'yicha savol mavjud emas. Avval filtrlarni o'zgartiring yoki qidiruvni tozalang.
            </p>
            <div style="display:flex;justify-content:flex-end">
              <button class="btn" data-mock-close>Yopish</button>
            </div>
          </div>
        `;
        return;
      }

      // Filtr nomini aniqlash
      let filterDesc = [];
      if (iqFilterStatus === "bookmarked") filterDesc.push("⭐ Saqlanganlar");
      else if (iqFilterStatus === "mastered") filterDesc.push("O'zlashtirilgan");
      else if (iqFilterStatus === "unmastered") filterDesc.push("O'rganish kerak");

      if (iqFilterLevel !== "all") filterDesc.push(iqFilterLevel.toUpperCase());
      if (iqFilterCat !== "all") {
        const catObj = IQ_CATEGORIES.find(c => c.id === iqFilterCat);
        if (catObj) filterDesc.push(catObj.label);
      }
      if (iqSearchQuery) filterDesc.push(`“${iqSearchQuery}”`);

      const filterSummary = filterDesc.length ? filterDesc.join(" · ") : "Barcha savollar bazasi";

      // Savollar soni variantlari
      const countOptions = [];
      if (pool.length <= 5) {
        countOptions.push({ count: pool.length, label: `Barchasi (${pool.length} ta)` });
      } else {
        countOptions.push({ count: 5, label: "⚡ 5 ta (Tezkor)" });
        if (pool.length >= 10) countOptions.push({ count: 10, label: "🎯 10 ta (Standart)" });
        if (pool.length >= 20) countOptions.push({ count: 20, label: "🏆 20 ta (Katta)" });
        countOptions.push({ count: pool.length, label: `♾️ Barchasi (${pool.length} ta)` });
      }

      mockSelectedCount = countOptions.some(o => o.count === 10) ? 10 : countOptions[0].count;

      overlay.innerHTML = `
        <div class="mock-modal">
          <div class="mock-head">
            <h2>${icon("rocket", "ic")} Texnik Intervyu Simulyatori (Mock)</h2>
            <button class="mock-close-btn" data-mock-close aria-label="Yopish">✕</button>
          </div>

          <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r);padding:14px 16px;margin-bottom:18px">
            <div style="font:600 11px var(--mono);text-transform:uppercase;color:var(--text-3);margin-bottom:4px">Joriy tanlangan filtr:</div>
            <div style="font-size:15px;font-weight:600;color:var(--text);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
              <span>${esc(filterSummary)}</span>
              <span class="iq-pill" style="min-height:26px;padding:2px 10px;font-size:12px;background:var(--accent-soft);color:var(--accent-text);border-color:var(--accent)">
                Filtrda: ${pool.length} ta savol
              </span>
            </div>
          </div>

          <p style="color:var(--text-2);font-size:13.5px;line-height:1.55;margin-bottom:18px">
            Simulyator aynan <strong>ushbu tanlangan filtrdagi savollardan</strong> tasodifiy oladi. Har bir savolga <strong>2 daqiqa</strong> vaqt beriladi. Yakunda tayyorgarlik darajangiz va tavsiyalar hisoblanadi.
          </p>

          <div style="margin-bottom:22px">
            <label style="font:600 12px var(--mono);text-transform:uppercase;color:var(--text-3);display:block;margin-bottom:10px">
              Imtihon uchun savollar sonini tanlang:
            </label>
            <div style="display:flex;gap:8px;flex-wrap:wrap" id="mock-count-options">
              ${countOptions.map(opt => `
                <button type="button" class="iq-pill" data-mock-count="${opt.count}" aria-pressed="${opt.count === mockSelectedCount}">
                  ${esc(opt.label)}
                </button>
              `).join("")}
            </div>
          </div>

          <div style="display:flex;justify-content:flex-end;gap:10px">
            <button class="btn" data-mock-close>Bekor qilish</button>
            <button class="btn btn-primary" data-mock-start>Imtihonni boshlash 🚀</button>
          </div>
        </div>
      `;
    }
  }

  function startMockTest(count = 10) {
    const pool = getIqFilteredList();
    if (!pool.length) {
      toast("Filtr bo'yicha savollar topilmadi");
      return;
    }
    const realCount = Math.min(count, pool.length);
    const shuffled = pool.slice().sort(() => 0.5 - Math.random());
    mockQuestions = shuffled.slice(0, realCount);
    mockIdx = 0;
    mockScores = [];
    renderMockQuestion();
  }

  function renderMockQuestion() {
    const overlay = $("#mock-overlay");
    if (!overlay || mockIdx >= mockQuestions.length) {
      finishMockTest();
      return;
    }
    const q = mockQuestions[mockIdx];
    mockSecondsLeft = 120;
    clearInterval(mockTimer);

    overlay.innerHTML = `
      <div class="mock-modal">
        <div class="mock-head">
          <h2>${icon("rocket", "ic")} Savol ${mockIdx + 1} / ${mockQuestions.length}</h2>
          <button class="mock-close-btn" data-mock-close aria-label="Yopish">✕</button>
        </div>

        <div class="mock-timer-wrap">
          <div class="mock-timer-head">
            <span>Ajratilgan vaqt</span>
            <span id="mock-timer-text">02:00</span>
          </div>
          <div class="mock-timer-track">
            <div class="mock-timer-fill" id="mock-timer-bar" style="width:100%"></div>
          </div>
        </div>

        <div class="mock-q-box">
          <div class="mock-q-meta">
            <span class="iq-badge ${q.level}">${q.level}</span>
            <span class="tag-cat">${esc(q.categoryLabel)}</span>
          </div>
          <h3 class="mock-q-title">${esc(q.title)}</h3>
        </div>

        <div id="mock-interaction-area">
          <div class="mock-self-test-prompt">
            <p>Javobni o'zingizcha ovoz chiqarib tushuntirib bering. Tayyor bo'lgach, model javobni oching.</p>
            <button class="btn btn-primary" data-mock-reveal>Model javobni ko'rish →</button>
          </div>
        </div>
      </div>
    `;

    mockTimer = setInterval(() => {
      mockSecondsLeft--;
      const textEl = $("#mock-timer-text");
      const barEl = $("#mock-timer-bar");
      if (textEl && barEl) {
        const mins = Math.floor(mockSecondsLeft / 60);
        const secs = mockSecondsLeft % 60;
        textEl.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
        const pct = (mockSecondsLeft / 120) * 100;
        barEl.style.width = `${pct}%`;
        if (mockSecondsLeft < 30) barEl.className = "mock-timer-fill danger";
        else if (mockSecondsLeft < 60) barEl.className = "mock-timer-fill warn";
      }
      if (mockSecondsLeft <= 0) {
        clearInterval(mockTimer);
        toast("Vaqt tugadi! O'zingizni baholang.");
        const revBtn = $("[data-mock-reveal]");
        if (revBtn) revBtn.click();
      }
    }, 1000);
  }

  function revealMockAnswer() {
    const q = mockQuestions[mockIdx];
    const area = $("#mock-interaction-area");
    if (!area) return;
    area.innerHTML = `
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:16px;margin-bottom:16px;max-height:260px;overflow-y:auto">
        <div class="iq-answer-label">${icon("target", "ic ic-sm")} Kutiladigan model javob:</div>
        <div style="font-size:13.5px;line-height:1.6">${markdown(q.answer)}</div>
        ${q.tip ? `<div class="iq-tip-box" style="margin-top:12px"><h4>${icon("sparkles", "ic ic-sm")} Senior siri</h4><p>${esc(q.tip)}</p></div>` : ""}
      </div>

      <div style="text-align:center;font:600 12px var(--mono);color:var(--text-3);text-transform:uppercase">O'z javobingizni xolisona baholang:</div>
      <div class="mock-eval-grid">
        <button class="mock-eval-btn good" data-mock-eval="10">
          <span>🟢 To'liq bildim</span>
          <small>+10 ball</small>
        </button>
        <button class="mock-eval-btn mid" data-mock-eval="5">
          <span>🟡 Qisman bildim</span>
          <small>+5 ball</small>
        </button>
        <button class="mock-eval-btn bad" data-mock-eval="0">
          <span>🔴 Bilmadim</span>
          <small>0 ball</small>
        </button>
      </div>
    `;
  }

  function recordMockEval(points) {
    clearInterval(mockTimer);
    const q = mockQuestions[mockIdx];
    mockScores.push({ q, score: Number(points) });
    mockIdx++;
    renderMockQuestion();
  }

  function finishMockTest() {
    clearInterval(mockTimer);
    const overlay = $("#mock-overlay");
    if (!overlay) return;
    const totalScore = mockScores.reduce((acc, x) => acc + x.score, 0);
    const maxScore = mockScores.length * 10 || 1;
    const pctScore = Math.round((totalScore / maxScore) * 100);

    let verdict = "Ajoyib natija! Texnik intervyulardan muvaffaqiyatli o'tish imkoniyatingiz juda yuqori.";
    if (pctScore < 50) verdict = "Asosiy mavzularni ko'proq takrorlash va bilmagan savollarni yodda saqlash tavsiya etiladi.";
    else if (pctScore < 80) verdict = "Yaxshi natija! Ayrim arxitektura va baza savollarini takrorlab oling.";

    const weakQuestions = mockScores.filter(x => x.score < 10).map(x => x.q);

    overlay.innerHTML = `
      <div class="mock-modal">
        <div class="mock-head">
          <h2>${icon("target", "ic")} Imtihon Natijalari (Scorecard)</h2>
          <button class="mock-close-btn" data-mock-close aria-label="Yopish">✕</button>
        </div>

        <div class="mock-scorecard">
          <div class="mock-score-ring">${pctScore}%</div>
          <h3>${totalScore} / ${maxScore} ball</h3>
          <p>${verdict}</p>

          ${weakQuestions.length ? `
            <div style="font:600 12px var(--mono);text-transform:uppercase;color:var(--text-3);text-align:left;margin-bottom:8px">
              Takrorlash tavsiya etiladigan savollar (${weakQuestions.length} ta):
            </div>
            <div class="mock-review-list">
              ${weakQuestions.map(wq => {
                const isBookmarked = bookmarkedIq.has(wq.id);
                return `
                  <div class="mock-review-item">
                    <span style="flex:1;min-width:0;text-overflow:ellipsis;overflow:hidden;white-space:nowrap">${esc(wq.title)}</span>
                    <button class="iq-bookmark-btn ${isBookmarked ? "active" : ""}" data-iq-bookmark="${wq.id}" title="Sevimlilarga saqlash">
                      ${icon("sparkles", "ic ic-sm")}
                    </button>
                  </div>
                `;
              }).join("")}
            </div>
          ` : `<p style="color:var(--accent-text);font-weight:600">Barcha savollarga a'lo darajada javob berdingiz! 🏆</p>`}

          <div style="display:flex;justify-content:center;gap:12px;margin-top:20px">
            <button class="btn btn-primary" data-mock-restart>Qayta topshirish 🔄</button>
            <button class="btn" data-mock-close>Yopish</button>
          </div>
        </div>
      </div>
    `;
  }

  function closeMockModal() {
    clearInterval(mockTimer);
    const overlay = $("#mock-overlay");
    if (overlay) overlay.remove();
  }

  /* ------------------------------------------------------------------ *
   * Router
   * ------------------------------------------------------------------ */
  function route() {
    const hash = decodeURIComponent(location.hash || "#/");
    const m = hash.match(/^#\/s\/([^/]+)(?:\/(.+))?$/);
    const mLevels = hash.match(/^#\/levels(?:\?lvl=([a-z]+))?$/);
    const mInterview = hash.match(/^#\/interview(?:\?(.*))?$/);
    const mQuiz = hash.match(/^#\/quiz(?:\?(.*))?$/);
    document.body.classList.remove("nav-open");
    $("#menu-btn").setAttribute("aria-expanded", "false");

    if (m && BY_SLUG[m[1]]) {
      const s = BY_SLUG[m[1]];
      document.title = `${s.title} · Laravel Skill Map`;
      renderSkill(s, m[2]);
      markActive(s.slug, false, false);
      if (!m[2]) window.scrollTo(0, 0);
    } else if (mLevels) {
      document.title = "Darajalar xaritasi · Laravel Skill Map";
      renderLevels(mLevels[1] || "junior");
      markActive(null, true, false);
      window.scrollTo(0, 0);
    } else if (mInterview) {
      document.title = "Intervyu Savol-Javoblari · Laravel Skill Map";
      renderInterview();
      markActive(null, false, true);
      window.scrollTo(0, 0);
    } else if (mQuiz) {
      document.title = "Texnik Testlar (Quiz) — Laravel Skill Map";
      renderQuizPage();
      markActive(null, false, false, true);
      window.scrollTo(0, 0);
    } else {
      document.title = "Laravel Skill Map";
      renderHome();
      markActive(null, false, false);
      window.scrollTo(0, 0);
    }
    view().focus({ preventScroll: true });
  }

  /* ------------------------------------------------------------------ *
   * Command palette (search)
   * ------------------------------------------------------------------ */
  const norm = (s) => String(s).toLowerCase().replace(/[`*_]/g, "").replace(/[‘’ʻʼ`]/g, "'");
  let INDEX = [];
  function buildIndex() {
    INDEX = [];
    SKILLS.forEach((s) => {
      INDEX.push({ kind: "skill", s, title: s.title, nt: norm(s.title), nd: norm(s.description) });
      s.subskills.forEach((x) => INDEX.push({ kind: "sub", s, x, title: x.title, nt: norm(x.title), nd: norm(x.description) }));
    });
  }

  function searchIndex(q) {
    const nq = norm(q).trim();
    if (!nq) return [];
    const terms = nq.split(/\s+/);
    const res = [];
    for (const it of INDEX) {
      let score = 0;
      if (it.nt === nq) score = 100;
      else if (it.nt.startsWith(nq)) score = 80;
      else if (it.nt.includes(nq)) score = 60;
      else if (terms.every((t) => it.nt.includes(t))) score = 45;
      else if (it.nd && it.nd.includes(nq)) score = 20;
      else if (it.nd && terms.every((t) => it.nt.includes(t) || it.nd.includes(t))) score = 10;
      if (score) res.push({ ...it, score: score + (it.kind === "skill" ? 5 : 0) });
    }
    return res.sort((a, b) => b.score - a.score || a.s.index - b.s.index).slice(0, 60);
  }

  function mark(title, q) {
    const plain = title.replace(/`/g, "");
    const nq = norm(q).trim();
    const i = norm(plain).indexOf(nq);
    if (!nq || i < 0) return esc(plain);
    return esc(plain.slice(0, i)) + `<mark>${esc(plain.slice(i, i + nq.length))}</mark>` + esc(plain.slice(i + nq.length));
  }

  let palSel = 0, palItems = [], lastFocus = null;
  const pal = () => $("#palette"), palInput = () => $("#palette-input"), palList = () => $("#palette-results");

  function renderPalette() {
    const q = palInput().value;
    let rows;
    if (!q.trim()) {
      const recent = BY_SLUG[store.get(KEYS.last, "")];
      rows = (recent ? [recent] : []).concat(SKILLS.filter((s) => s !== recent).slice(0, 7))
        .map((s) => ({ kind: "skill", s, title: s.title }));
    } else rows = searchIndex(q);
    palItems = rows;
    palSel = 0;
    if (!rows.length) {
      palList().innerHTML = `<div class="empty">${icon("search")}<div>“${esc(q)}” bo'yicha hech narsa topilmadi.</div></div>`;
      return;
    }
    const skills = rows.filter((r) => r.kind === "skill"), subs = rows.filter((r) => r.kind === "sub");
    palItems = skills.concat(subs);
    let n = 0;
    const item = (r) => {
      const idx = n++;
      const href = r.kind === "skill" ? `#/s/${r.s.slug}` : `#/s/${r.s.slug}/${r.x.id}`;
      return `<a class="palette-item" role="option" id="po-${idx}" data-idx="${idx}" href="${href}" aria-selected="${idx === 0}">
        <span class="num">${r.kind === "skill" ? pad(r.s.num) : r.x.num}</span>
        <span style="min-width:0"><span class="t" style="display:block">${mark(r.title, q)}</span>
          ${r.kind === "sub" ? `<span class="s" style="display:block">${esc(r.s.title)}${r.x.description ? "" : " · tavsif yo'q"}</span>`
                             : `<span class="s" style="display:block">${r.s.subskills.length} subskill · ${esc(r.s.groupRef ? r.s.groupRef.title : "")}</span>`}</span>
        ${icon("enter", "ic ic-sm go")}
      </a>`;
    };
    palList().innerHTML =
      (skills.length ? `<div class="palette-group">${q.trim() ? "Skill'lar" : "Tezkor o'tish"}</div>${skills.map(item).join("")}` : "") +
      (subs.length ? `<div class="palette-group">Subskill'lar · ${subs.length}</div>${subs.map(item).join("")}` : "");
    palInput().setAttribute("aria-activedescendant", "po-0");
  }

  function moveSel(d) {
    if (!palItems.length) return;
    palSel = (palSel + d + palItems.length) % palItems.length;
    $$(".palette-item", palList()).forEach((el) => el.setAttribute("aria-selected", String(Number(el.dataset.idx) === palSel)));
    const el = $(`#po-${palSel}`);
    if (el) { el.scrollIntoView({ block: "nearest" }); palInput().setAttribute("aria-activedescendant", el.id); }
  }

  function openPalette() {
    lastFocus = document.activeElement;
    pal().classList.add("open");
    palInput().value = "";
    renderPalette();
    setTimeout(() => palInput().focus(), 0);
  }
  function closePalette() {
    pal().classList.remove("open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function bindPalette() {
    $("#search-trigger").addEventListener("click", openPalette);
    palInput().addEventListener("input", renderPalette);
    palInput().addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); moveSel(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); moveSel(-1); }
      else if (e.key === "Enter") {
        e.preventDefault();
        const el = $(`#po-${palSel}`);
        if (el) { closePalette(); location.hash = el.getAttribute("href"); }
      }
    });
    pal().addEventListener("click", (e) => {
      if (e.target === pal()) closePalette();
      if (e.target.closest(".palette-item")) closePalette();
    });
    pal().addEventListener("mousemove", (e) => {
      const el = e.target.closest(".palette-item");
      if (el && Number(el.dataset.idx) !== palSel) { palSel = Number(el.dataset.idx); moveSel(0); }
    });
  }

  /* ------------------------------------------------------------------ *
   * Chrome: theme, menu, drawer, shortcuts, import/export
   * ------------------------------------------------------------------ */
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    $("span", t).textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
  }

  function copyText(str) {
    const ok = () => toast("Havola nusxalandi");
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(str).then(ok, () => fallbackCopy(str, ok));
    else fallbackCopy(str, ok);
  }
  function fallbackCopy(str, ok) {
    const ta = document.createElement("textarea");
    ta.value = str; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); ok(); } catch { toast("Nusxalab bo'lmadi"); }
    ta.remove();
  }

  function setMenu(open) {
    $("#more-menu").classList.toggle("open", open);
    $("#more-btn").setAttribute("aria-expanded", String(open));
  }

  function bindChrome() {
    $("#theme-btn").addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      $('meta[name="theme-color"]').setAttribute("content", next === "light" ? "#F7F9FC" : "#0B1120");
      try { localStorage.setItem(KEYS.theme, next); } catch { /* ignore */ }
    });

    $("#menu-btn").addEventListener("click", () => {
      const open = !document.body.classList.contains("nav-open");
      document.body.classList.toggle("nav-open", open);
      $("#menu-btn").setAttribute("aria-expanded", String(open));
    });
    $("#scrim").addEventListener("click", () => { document.body.classList.remove("nav-open"); $("#menu-btn").setAttribute("aria-expanded", "false"); });

    $("#more-btn").addEventListener("click", (e) => { e.stopPropagation(); setMenu(!$("#more-menu").classList.contains("open")); });
    document.addEventListener("click", (e) => { if (!e.target.closest(".menu-wrap")) setMenu(false); });

    $("#more-menu").addEventListener("click", (e) => {
      const a = e.target.closest("[data-action]");
      if (!a) return;
      setMenu(false);
      if (a.dataset.action === "link-file") {
        if (activeFileHandle) {
          saveToLinkedFile();
          toast("progress.json fayliga saqlandi");
        } else {
          (async () => {
            const savedHandle = await idb.get("progressHandle");
            if (savedHandle) {
              try {
                const perm = await savedHandle.requestPermission({ mode: "readwrite" });
                if (perm === "granted") {
                  activeFileHandle = savedHandle;
                  const file = await savedHandle.getFile();
                  updateSyncUI(true, file.name);
                  await saveToLinkedFile();
                  toast(`"${file.name}" bilan aloqa tiklandi!`);
                  return;
                }
              } catch (e) {}
            }
            linkProgressFile();
          })();
        }
      }
      if (a.dataset.action === "unlink-file") {
        unlinkProgressFile();
      }
      if (a.dataset.action === "export") {
        const payload = {
          app: "laravel-skill-map",
          version: 1,
          exportedAt: new Date().toISOString(),
          progress,
          questions: Array.from(masteredIq),
          bookmarks: Array.from(bookmarkedIq)
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = Object.assign(document.createElement("a"), { href: url, download: `skill-progress-${new Date().toISOString().slice(0, 10)}.json` });
        document.body.appendChild(link); link.click(); link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        toast("Progress eksport qilindi");
      }
      if (a.dataset.action === "reset") {
        if (!confirm("Barcha progress o'chiriladi. Davom etasizmi?")) return;
        progress = {}; store.set(KEYS.progress, progress);
        masteredIq.clear(); store.set(KEYS.questions, []);
        bookmarkedIq.clear(); store.set(KEYS.bookmarks, []);
        saveToLinkedFile();
        route(); updateSidebarProgress(); toast("Progress tozalandi");
      }
    });
    $("#more-menu label").addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); $("#import-input").click(); } });
    $("#import-input").addEventListener("change", async (e) => {
      const file = e.target.files[0];
      e.target.value = "";
      setMenu(false);
      if (!file) return;
      try {
        const data = JSON.parse(await file.text());
        const src = data && typeof data.progress === "object" ? data.progress : data;
        const clean = {};
        Object.entries(src || {}).forEach(([k, v]) => { if (SUB_BY_ID[k] && Number.isInteger(v) && v > 0 && v <= 4) clean[k] = v; });
        progress = clean; store.set(KEYS.progress, progress);
        if (Array.isArray(data.questions)) {
          masteredIq = new Set(data.questions);
          store.set(KEYS.questions, data.questions);
        }
        if (Array.isArray(data.bookmarks)) {
          bookmarkedIq = new Set(data.bookmarks);
          store.set(KEYS.bookmarks, data.bookmarks);
        }
        saveToLinkedFile();
        route(); updateSidebarProgress();
        toast(`${Object.keys(clean).length} ta mavzu holati import qilindi`);
      } catch { toast("JSON faylni o'qib bo'lmadi"); }
    });

    document.addEventListener("keydown", (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) || document.activeElement.isContentEditable;

      // Keyboard navigation for Quiz page
      if (!typing && window.location.hash.startsWith("#/quiz") && !pal().classList.contains("open") && !$("#mock-overlay")) {
        if (quizState === "lobby") {
          if (e.key === "Enter") {
            e.preventDefault();
            handleQuizStart();
            return;
          }
        } else if (quizState === "running" && quizQuestions.length) {
          const curQ = quizQuestions[quizIdx];
          const isAnswered = Boolean(curQ && quizAnswers[curQ.id]);

          if (!isAnswered) {
            const k = e.key.toUpperCase();
            if (["A", "B", "C", "D"].includes(k)) {
              e.preventDefault();
              handleQuizSelect(k);
              return;
            } else if (["1", "2", "3", "4"].includes(e.key)) {
              e.preventDefault();
              const numMap = { "1": "A", "2": "B", "3": "C", "4": "D" };
              handleQuizSelect(numMap[e.key]);
              return;
            }
          } else {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleQuizNext();
              return;
            }
          }
        } else if (quizState === "finished") {
          if (e.key === "Enter") {
            e.preventDefault();
            handleQuizRestart();
            return;
          }
        }
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); pal().classList.contains("open") ? closePalette() : openPalette(); return; }
      if (e.key === "/" && !typing) { e.preventDefault(); openPalette(); return; }
      if (e.key === "Escape") {
        if ($("#mock-overlay")) { closeMockModal(); return; }
        if (pal().classList.contains("open")) closePalette();
        else if ($("#more-menu").classList.contains("open")) { setMenu(false); $("#more-btn").focus(); }
        else if (document.body.classList.contains("nav-open")) { document.body.classList.remove("nav-open"); $("#menu-btn").setAttribute("aria-expanded", "false"); }
      }
      if (e.key === "Tab" && pal().classList.contains("open")) {
        e.preventDefault(); palInput().focus();
      }
    });

    window.addEventListener("hashchange", route);
    window.addEventListener("storage", (e) => {
      if (e.key === KEYS.progress) { progress = store.get(KEYS.progress, {}); route(); updateSidebarProgress(); }
    });
  }

  /* ------------------------------------------------------------------ *
   * Boot
   * ------------------------------------------------------------------ */
  bindChrome();
  bindPalette();
  checkExistingHandle();
  loadData().then(() => {
    buildModel();
    buildIndex();
    renderSidebar();
    route();
  });
})();
