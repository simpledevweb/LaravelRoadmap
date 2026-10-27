/* Chuqur dars: 7.10. Maydonlar: lesson (markdown), examples [{title, lang, code, note}], pitfalls [] */
registerLesson("7.10", {
  "lesson": [
    "### Private paketlar",
    "Ochiq Packagist'da bo'lmagan, kompaniya ichki kodi (kutubxonalar, modullar). Maqsad: kodni qayta ishlatish va versiyalash.",
    "",
    "### Usullar",
    "1. **VCS repository** (Git): ",
    "```json",
    "\"repositories\": [{ \"type\": \"vcs\", \"url\": \"git@gitlab.com:acme/billing.git\" }]",
    "```",
    "Tag'lar versiya bo'ladi (`v1.2.0`).",
    "2. **Path repository** (lokal papka, monorepo, dev): `{\"type\": \"path\", \"url\": \"../billing\", \"options\": {\"symlink\": true}}`.",
    "3. **Composer registry:** GitLab/GitHub Package Registry, **Private Packagist**, **Satis** (statik o'z mirror'ingiz), Artifactory/Nexus.",
    "4. Composer `artifact` (zip fayllar).",
    "",
    "### Autentifikatsiya",
    "`auth.json` (Git'ga kiritmang!) yoki muhit `COMPOSER_AUTH`: `composer config --global gitlab-token.gitlab.com <token>`; GitHub OAuth token; HTTP basic. CI'da maxfiy o'zgaruvchi.",
    "",
    "### Versiyalash",
    "SemVer, Git tag'lar; `dev-main` branch alias (`extra.branch-alias`). Private paketlarga CI'da testlar.",
    "",
    "### Packagist'ni o'chirish",
    "`\"packagist.org\": false` faqat private manbadan.",
    "",
    "### Xavfsizlik",
    "- Token'larni kodga yozmang; read-only token.",
    "- Dependency confusion: private paket nomi ochiq Packagist'dagi bilan to'qnashmasin (vendor prefiksi, `repositories` tartibi, `canonical` = true).",
    "- Ichki paketlarni ham audit qiling.",
    "",
    "### Amaliyot",
    "Mikroservislar orasida umumiy kod, UI kit, DTO/contract paketlari; monorepo'da `path` + `symlink`."
  ],
  "examples": [
    {
      "title": "VCS va path",
      "lang": "json",
      "code": [
        "{",
        "  \"repositories\": [",
        "    { \"type\": \"vcs\", \"url\": \"git@gitlab.com:acme/billing.git\" },",
        "    { \"type\": \"path\", \"url\": \"../shared-dto\", \"options\": { \"symlink\": true } }",
        "  ],",
        "  \"require\": { \"acme/billing\": \"^2.1\", \"acme/shared-dto\": \"@dev\" }",
        "}"
      ]
    }
  ],
  "pitfalls": [
    "`auth.json` ni Git'ga kiritish token oshkor bo'lishiga olib keladi.",
    "Dependency confusion: private paket nomi ochiq Packagist'dagi bilan to'qnashmasin.",
    "`path` repository `symlink` bilan production'ga tushirilmasin.",
    "Private paketda ham SemVer va changelog yuritilmasa yangilash qiyin."
  ]
});
