# Tavsiflarni to'ldirish bo'yicha yo'riqnoma (Flash modeli uchun)

Sayt: `index.html` (brauzerda to'g'ridan-to'g'ri ochiladi, server kerak emas).
Kontent: `data/skills/NN-slug.js` — har bir skill alohida faylda (85 ta fayl).

## Vazifa

Bitta faylni oching (masalan `data/skills/13-eloquent-orm.js`) va **faqat bo'sh maydonlarni** to'ldiring.
Bir vaqtda bitta fayl bilan ishlang — fayllar kichik, kontekstga to'liq sig'adi.

## Maydonlar

| Maydon | Tip | Nima yoziladi |
|---|---|---|
| `description` (skill) | string | Skill haqida 2–4 gaplik umumiy kirish: nima, nega Senior uchun muhim. |
| `description` (subskill) | string | Asosiy tavsif. Markdown. 80–250 so'z. Tushuntirish + kerak bo'lsa kod misoli. |
| `priority` | `"core"` \| `"important"` \| `"optional"` | Laravel Senior uchun ahamiyati. |
| `level` | `"Foundation"` \| `"Junior"` \| `"Middle"` \| `"Strong Middle"` \| `"Senior"` \| `"Lead"` | Qaysi darajada bilish kutiladi. |
| `practicalTask` | string | Bilimni amalda tekshiradigan bitta aniq topshiriq (Markdown mumkin). |
| `acceptanceCriteria` | string[] | 2–4 ta tekshiriladigan mezon. |
| `prerequisites` | string[] | Oldindan bilish kerak bo'lgan subskill id'lari (`"9.3"`) yoki skill slug'lari (`"sql"`). Sayt ularni avtomatik havolaga aylantiradi. |

**O'zgartirmang:** `id`, `slug`, `title`, `group`, subskill'lar tartibi va soni.

## Markdown (sayt qo'llab-quvvatlaydigan qism)

- Paragraflar (bo'sh qator bilan ajratiladi), `### Sarlavha`
- `- ro'yxat`, `1. raqamli ro'yxat`, `> eslatma`
- `**qalin**`, `*kursiv*`, `` `inline code` ``, `[havola](https://...)`
- Kod bloklari: ` ```php `, ` ```sql `, ` ```bash ` — PHP/SQL sintaksisi rangli ko'rsatiladi
- Oddiy jadvallar: `| a | b |` + `|---|---|`

## JS string qoidalari (eng ko'p xato shu yerda)

Matn oddiy qo'shtirnoqli JS string ichida yoziladi:

- Yangi qator → `\n`, bo'sh qator (paragraf) → `\n\n`
- Matn ichidagi `"` → `\"`
- Backslash `\` → `\\` (masalan PHP namespace: `App\\Models\\User`)
- Uzun matnni qatorlar massivi qilib ham yozish mumkin — sayt ularni `\n` bilan birlashtiradi:

```js
description: [
  "Birinchi paragraf.",
  "",
  "```php",
  "$user = User::find(1);",
  "```"
],
```

Fayl buzilsa, sayt bosh sahifasida qizil ogohlantirish chiqadi va qaysi fayl, qaysi qatorda xato borligini ko'rsatadi.
Tekshirish uchun (Node.js bo'lsa): `node --check data/skills/13-eloquent-orm.js`

## Namuna

```js
{
  id: "13.12",
  title: "N+1 Query Problem",
  description: "Bitta asosiy so'rov va har bir natija uchun yana bittadan qo'shimcha so'rov yuborilishi — **N+1 muammosi**. Ro'yxat sahifalarida eng ko'p uchraydigan performance xatosi.\n\n### Misol\n\n```php\n// 1 + N ta so'rov\nforeach (Post::all() as $post) {\n    echo $post->author->name;\n}\n\n// 2 ta so'rov\nforeach (Post::with('author')->get() as $post) {\n    echo $post->author->name;\n}\n```\n\n> Development muhitida `Model::preventLazyLoading()` yoqib qo'ying — lazy loading exception beradi.",
  priority: "core",
  level: "Middle",
  practicalTask: "Telescope yoki `DB::listen` orqali N+1 bor sahifani toping va so'rovlar sonini 2–3 tagacha kamaytiring.",
  acceptanceCriteria: [
    "So'rovlar soni ro'yxat uzunligiga bog'liq emas",
    "`preventLazyLoading()` yoqilganda test o'tadi"
  ],
  prerequisites: ["13.9", "13.11"]
}
```

## Flash uchun tayyor prompt

```
Sen Senior PHP/Laravel mentorisan. Quyidagi JS faylda bo'sh maydonlarni to'ldir.
Qoidalar:
- Til: o'zbek (lotin). Texnik atamalar inglizcha qoladi.
- id, slug, title, group va subskill tartibini o'zgartirma.
- description: Markdown, 80–250 so'z, Laravel kontekstida, kerak joyda qisqa kod misoli.
- priority: core | important | optional. level: Foundation | Junior | Middle | Strong Middle | Senior | Lead.
- acceptanceCriteria: 2–4 ta tekshiriladigan mezon. prerequisites: subskill id'lari ("9.3") yoki skill slug'lari.
- Natija: to'liq, sintaksisi to'g'ri JS fayl (registerSkill({...}); ko'rinishida). Stringlarda \n va \" to'g'ri escape qilinsin.

<fayl mazmuni shu yerga>
```

## Yangi skill qo'shish

1. `data/skills/86-yangi-skill.js` yarating (mavjud fayl namunasida).
2. `data/manifest.js` → `SKILL_FILES` ga fayl nomini, `SKILL_GROUPS` dagi kerakli guruhga `86` ni qo'shing.

---

## Chuqur darslar (subskill sahifasi)

Har bir subskill uchun alohida katta sahifa bor: `#/s/<skill-slug>/<subId>`. Qisqa `description` shu sahifada "Qisqacha" bo'limida chiqadi, **chuqur kontent esa alohida faylda** yoziladi:

`data/lessons/<subId>.js` (masalan `data/lessons/13.12.js`)

```js
registerLesson("13.12", {
  lesson: [
    "### Sarlavha",
    "Tushuntirish matni (Markdown)...",
    "",
    "- ro'yxat",
    "1. raqamli ro'yxat"
  ],
  examples: [
    { title: "Misol nomi", lang: "php", code: ["// kod", "$x = 1;"], note: "Izoh (ixtiyoriy)" }
  ],
  pitfalls: [
    "Odatiy xato va nima uchun xato ekani."
  ]
});
```

Yangi fayl yaratgach, nomini `data/manifest.js` dagi `window.LESSON_FILES` ga qo'shing.

| Maydon | Nima yoziladi |
|---|---|
| `lesson` | 350–600 so'z. `###` bo'limlar: nima, nega kerak, qanday ishlaydi, qachon ishlatiladi/ishlatilmaydi, Laravel dagi o'rni. |
| `examples` | 2–3 ta kod misoli: muammo/yechim, odatiy ishlatilish, test. Har birida `title`, `lang`, `code`; `note` ixtiyoriy. |
| `pitfalls` | 3–4 ta odatiy xato. |

Qoidalar: o'zbek (lotin), texnik atamalar inglizcha; kod ishlaydigan va qisqa bo'lsin; `**qalin**` ichida `kod` ishlatmang (sayt buni noto'g'ri chiqaradi); versiyaga bog'liq narsani aniq yozing; bilmagan narsani to'qimang.

### Flash uchun tayyor prompt

```
Sen Senior PHP/Laravel mentorisan. Quyidagi subskill uchun data/lessons/<subId>.js faylini yoz.
- Til: o'zbek (lotin). Texnik atamalar inglizcha qoladi.
- Format: registerLesson("<subId>", { lesson: [...], examples: [...], pitfalls: [...] }) (yuqoridagi namunaga qat'iy rioya qil).
- lesson 350-600 so'z, ### bo'limlar bilan; examples 2-3 ta ishlaydigan kod; pitfalls 3-4 ta.
- Faqat aniq bilgan narsangni yoz. Versiyaga bog'liq xususiyatni belgila. **qalin** ichida `kod` ishlatma.
- Natija: to'liq, sintaksisi to'g'ri JS fayl.

<subskill id, title va hozirgi description shu yerga>
```
