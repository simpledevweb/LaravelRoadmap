/* 69 · Cloud Computing
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 69,
  slug: "cloud-computing",
  title: "Cloud Computing",
  group: "cloud",
  description: "Bulut hisoblash — infratuzilmani (serverlar, DB, saqlash, tarmoq) xizmat sifatida, talab bo'yicha va foydalanilganicha to'lov asosida olish. U tez masshtablash, boshqariladigan servislar va global infratuzilmani beradi, lekin narx, xavfsizlik va vendor lock-in masalalarini ongli boshqarishni talab qiladi. Senior dasturchi bulut asosiy tushunchalarini va Laravel ilovalarini bulutda xavfsiz va iqtisodiy ishlatishni biladi.",
  subskills: [
    {
      id: "69.1",
      title: "Cloud Service Models: IaaS, PaaS, SaaS",
      description: [
        "- **IaaS** (Infrastructure as a Service) — virtual serverlar, tarmoq, disk (AWS EC2, DigitalOcean Droplets): eng ko'p nazorat, eng ko'p mas'uliyat (OS, patch'lar, sozlash).",
        "- **PaaS** (Platform) — ilova kodini yuklaysiz, platforma serverlarni boshqaradi (Laravel Cloud, Laravel Vapor, Heroku, Google App Engine, Elastic Beanstalk): tez, kam ekspluatatsiya, kamroq moslashuvchanlik.",
        "- **SaaS** (Software) — tayyor dastur (Gmail, Sentry, GitHub).",
        "- Qo'shimcha: **CaaS** (konteynerlar — ECS, Cloud Run), **FaaS** (serverless funksiyalar — Lambda).",
        "",
        "Tanlov: jamoa hajmi va DevOps tajribasi, nazorat ehtiyoji, narx.",
        "",
        "```text",
        "Kichik jamoa, tez start  → PaaS (Laravel Cloud / Forge + VPS)",
        "Maxsus talablar          → IaaS yoki konteynerlar (ECS/K8s)",
        "Monitoring, email, CI    → SaaS",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Loyihangiz uchun IaaS, PaaS va CaaS variantlarini nazorat, narx va ekspluatatsiya yuki bo'yicha solishtiring.",
      acceptanceCriteria: [
        "Xizmat modellarining farqini biladi",
        "Modelni jamoa va loyiha ehtiyojiga qarab tanlaydi"
      ],
      prerequisites: []
    },
    {
      id: "69.2",
      title: "Public, Private va Hybrid Cloud",
      description: [
        "**Public** bulut — umumiy provayder infratuzilmasi (AWS, GCP, Azure, mahalliy provayderlar): moslashuvchan, tez, operatsion yuksiz. **Private** — tashkilotning o'z infratuzilmasi (OpenStack, VMware): to'liq nazorat, ma'lumot joylashuvi talablari, kapital xarajat. **Hybrid** — ikkalasining kombinatsiyasi (masalan, sezgir ma'lumot o'z data markazida, hisoblash bulutda). **Multi-cloud** — bir nechta public provayder.",
        "",
        "O'zbekistonda shaxsiy ma'lumotlarni mahalliy saqlash talablari (lokalizatsiya qonuni) provayder va arxitektura tanloviga ta'sir qilishi mumkin.",
        "",
        "```text",
        "Shaxsiy ma'lumotlar bazasi → mahalliy data markaz / mahalliy bulut",
        "Statik asset'lar, CDN, email → global public bulut servislari",
        "```"
      ],
      priority: "optional",
      level: "Junior",
      practicalTask: "Ilovangiz ma'lumotlarini toifalab, qaysi qism qayerda joylashishi mumkinligini huquqiy talablarni hisobga olib baholang.",
      acceptanceCriteria: [
        "Bulut joylashuv modellarini biladi",
        "Ma'lumot lokalizatsiyasi talablarini hisobga oladi"
      ],
      prerequisites: [
        "69.1"
      ]
    },
    {
      id: "69.3",
      title: "Compute Services",
      description: [
        "Hisoblash xizmatlari: **virtual mashinalar** (EC2, Compute Engine — to'liq nazorat), **konteyner servislari** (ECS/Fargate, Cloud Run, Kubernetes — EKS/GKE), **serverless funksiyalar** (Lambda — Laravel Vapor/Bref orqali), **PaaS**. Instance turlari: umumiy, CPU yoki xotiraga optimallashtirilgan, ARM (Graviton — arzonroq).",
        "",
        "Laravel uchun odatiy tanlovlar: VM'lar + Forge, konteynerlar (ECS/Cloud Run/K8s), Vapor (Lambda) yoki Laravel Cloud. Xarid modellari: on-demand, reserved/savings plans (1–3 yil — 30–60% arzon), spot (90% gacha arzon, to'xtatilishi mumkin — worker'lar uchun).",
        "",
        "```text",
        "Web: 3 × ARM instance (on-demand + savings plan)",
        "Queue worker'lar: spot instance'lar (to'xtatilsa job qayta navbatga qaytadi)",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ilova komponentlari uchun mos compute xizmati va xarid modelini tanlab, oylik narxni hisoblang.",
      acceptanceCriteria: [
        "Compute xizmatlari turlarini biladi",
        "Xarid modellarini yuklama turiga moslaydi"
      ],
      prerequisites: [
        "69.1"
      ]
    },
    {
      id: "69.4",
      title: "Networking",
      description: [
        "Bulut tarmog'i: **VPC** (izolyatsiyalangan virtual tarmoq), subnet'lar (ommaviy — LB uchun, xususiy — app va DB uchun, internetdan to'g'ridan-to'g'ri kirib bo'lmaydi), internet gateway, NAT gateway (xususiy subnet'dan chiquvchi trafik), security group'lar (instance darajasidagi firewall), route table'lar, VPC peering/private endpoint'lar (boshqariladigan servislarga ichki ulanish).",
        "",
        "Laravel arxitekturasida: LB ommaviy subnet'da, app va worker'lar xususiy, DB va Redis faqat app'dan kirish mumkin bo'lgan xususiy subnet'da.",
        "",
        "```text",
        "VPC 10.0.0.0/16",
        " ├─ public  10.0.1.0/24  → ALB, NAT GW",
        " ├─ private 10.0.10.0/24 → app, worker'lar",
        " └─ data    10.0.20.0/24 → RDS, ElastiCache (faqat app SG'dan)",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Laravel ilovasi uchun VPC, subnet'lar va security group'lar dizaynini chizib, kirish qoidalarini yozing.",
      acceptanceCriteria: [
        "Bulut tarmog'i asosiy komponentlarini biladi",
        "Ommaviy va xususiy subnet'larni to'g'ri ajratadi"
      ],
      prerequisites: [
        "50.11"
      ]
    },
    {
      id: "69.5",
      title: "Storage",
      description: [
        "Bulutda saqlash turlari: **blok** (EBS — VM uchun disk, bitta instance'ga bog'langan), **fayl** (EFS — bir nechta instance uchun umumiy tarmoq fayl tizimi — sekinroq), **obyekt** (S3 — cheksiz, arzon, HTTP orqali, Laravel Storage bilan ideal), **arxiv** (Glacier — juda arzon, sekin olish).",
        "",
        "Laravel uchun: yuklangan fayllar va eksportlar — S3 (stateless app uchun), lokal disk — vaqtinchalik fayllar va OS; umumiy fayl tizimi (EFS/NFS) — kamdan-kam kerak (S3 yaxshiroq). Disk snapshot'lari — backup.",
        "",
        "```php",
        "// config/filesystems.php",
        "'default' => env('FILESYSTEM_DISK', 's3'),",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Ilovaning fayl saqlash ehtiyojlarini tahlil qilib, har biri uchun mos saqlash turini tanlang.",
      acceptanceCriteria: [
        "Saqlash turlari farqini biladi",
        "Laravel uchun obyekt saqlashni afzal ko'radi"
      ],
      prerequisites: [
        "2.22"
      ]
    },
    {
      id: "69.6",
      title: "Managed Databases",
      description: [
        "Boshqariladigan DB (RDS, Aurora, Cloud SQL, Azure Database) — provayder backup, patch, replikatsiya, failover, monitoringni boshqaradi: ekspluatatsiya yuki keskin kamayadi. Imkoniyatlar: Multi-AZ, read replika'lar, PITR, avtomatik masshtablash (Aurora Serverless), parametr guruhlari, performance insights.",
        "",
        "Kamchiliklari: narx (o'z serveridan qimmatroq), cheklangan nazorat (superuser yo'q, ba'zi kengaytmalar yo'q), vendor'ga xos xususiyatlar. Ko'p jamoalar uchun — o'z DB'sini boshqarishdan ancha arzon (inson vaqtini hisobga olganda).",
        "",
        "```text",
        "RDS PostgreSQL: db.r6g.large, Multi-AZ, 7 kun PITR, storage autoscaling, Performance Insights",
        "Laravel: DB_HOST=app.xxxx.eu-central-1.rds.amazonaws.com (xususiy subnet)",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "O'z serveringizdagi DB va boshqariladigan DB variantlarini narx (shu jumladan ekspluatatsiya vaqti) va imkoniyatlar bo'yicha solishtiring.",
      acceptanceCriteria: [
        "Boshqariladigan DB afzallik va cheklovlarini biladi",
        "Umumiy narxni (inson vaqti bilan) baholaydi"
      ],
      prerequisites: [
        "10.19"
      ]
    },
    {
      id: "69.7",
      title: "Object Storage",
      description: [
        "Obyekt saqlash (S3, GCS, Azure Blob, MinIO, mahalliy S3-mos xizmatlar) — fayllarni kalit (yo'l) bo'yicha saqlovchi cheksiz, yuqori chidamli (11 to'qqiz) saqlash: rasmlar, hujjatlar, eksportlar, backup'lar, statik asset'lar. HTTP API, versiyalash, lifecycle qoidalari, shifrlash, CDN bilan integratsiya.",
        "",
        "Laravel `Storage` S3-mos har qanday provayder bilan ishlaydi (`endpoint` sozlamasi bilan). Maxfiy fayllar — private bucket + temporary URL; brauzerdan to'g'ridan-to'g'ri yuklash — presigned URL.",
        "",
        "```env",
        "AWS_BUCKET=app-uploads",
        "AWS_ENDPOINT=https://s3.example-provider.uz   # S3-mos provayder",
        "AWS_USE_PATH_STYLE_ENDPOINT=true",
        "```"
      ],
      priority: "important",
      level: "Junior",
      practicalTask: "Laravel Storage'ni S3-mos obyekt saqlashga ulang va maxfiy fayllar uchun temporary URL'larni ishlating.",
      acceptanceCriteria: [
        "Obyekt saqlash xususiyatlarini biladi",
        "S3-mos provayderlar bilan ishlaydi"
      ],
      prerequisites: [
        "amazon-s3"
      ]
    },
    {
      id: "69.8",
      title: "Identity and Access Management",
      description: [
        "IAM — bulut resurslariga kim (foydalanuvchilar, rollar, servislar) nima qila olishini boshqarish: policy'lar (ruxsat etilgan amallar va resurslar), rollar (vaqtinchalik huquqlar — instance'lar va servislar uchun, uzoq muddatli kalitlar o'rniga), guruhlar, MFA, SSO.",
        "",
        "Qoidalar: root/asosiy hisobdan kundalik foydalanmaslik, eng kam huquq, ilovaga statik kalitlar o'rniga instance/task roli, CI uchun OIDC, muntazam audit (ishlatilmagan huquqlar va kalitlar), har muhit uchun alohida hisob yoki loyiha.",
        "",
        "```json",
        "{",
        "  \"Effect\": \"Allow\",",
        "  \"Action\": [\"s3:GetObject\", \"s3:PutObject\"],",
        "  \"Resource\": \"arn:aws:s3:::app-uploads/*\"",
        "}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Ilova uchun minimal IAM policy yozib, statik kalitlarni instance yoki task roliga almashtiring.",
      acceptanceCriteria: [
        "IAM asosiy tushunchalarini biladi",
        "Rollar va eng kam huquqni qo'llaydi"
      ],
      prerequisites: [
        "20.17"
      ]
    },
    {
      id: "69.9",
      title: "Secrets Management",
      description: [
        "Bulutda sirlar: secret manager (AWS Secrets Manager, Parameter Store, GCP Secret Manager, Vault) — shifrlangan saqlash, kirish IAM orqali, aylantirish (DB parollari uchun avtomatik), audit (kim qachon o'qidi). Ilova ishga tushganda yoki deploy paytida sirlarni oladi.",
        "",
        "Laravel'da: deploy skripti secret manager'dan `.env` generatsiya qiladi, yoki konteyner muhit o'zgaruvchilari task definition'dan (secret havolalari bilan), yoki `env:encrypt`. Sirlar image'da, kodda va log'larda bo'lmasligi kerak.",
        "",
        "```bash",
        "aws secretsmanager get-secret-value --secret-id prod/app/env --query SecretString --output text > /var/www/shared/.env",
        "chmod 640 /var/www/shared/.env",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Production `.env` sirlarini secret manager'ga ko'chirib, deploy paytida avtomatik olishni sozlang.",
      acceptanceCriteria: [
        "Secret manager imkoniyatlarini biladi",
        "Sirlarni image va koddan tashqarida saqlaydi"
      ],
      prerequisites: [
        "51.16"
      ]
    },
    {
      id: "69.10",
      title: "Load Balancing",
      description: [
        "Bulut load balancer'lari: L7 (AWS ALB, GCP HTTP(S) LB — path/host bo'yicha marshrutlash, TLS, WAF integratsiyasi), L4 (NLB — juda yuqori throughput, statik IP), global (CloudFront, Cloud CDN, Global LB). Boshqariladigan — avtomatik HA va masshtablash, health check'lar, sertifikatlar (ACM — bepul, avtomatik yangilanadi).",
        "",
        "Laravel uchun: ALB → target group (instance'lar yoki konteynerlar), `TrustProxies`, health check `/up`, connection draining deploy uchun.",
        "",
        "```text",
        "ALB (HTTPS 443, ACM sertifikat) → listener rules:",
        "  /api/*    → api-target-group",
        "  /reverb/* → websocket-target-group (stickiness)",
        "  default   → web-target-group",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Bulut LB'ni HTTPS, path asosidagi marshrutlash va health check bilan sozlang.",
      acceptanceCriteria: [
        "Bulut LB turlarini biladi",
        "Boshqariladigan sertifikat va marshrutlashni sozlaydi"
      ],
      prerequisites: [
        "68.3"
      ]
    },
    {
      id: "69.11",
      title: "Autoscaling",
      description: [
        "Bulut autoscaling: AWS Auto Scaling Group (VM'lar), ECS Service Auto Scaling, K8s HPA/Cluster Autoscaler, Cloud Run (so'rovlar bo'yicha avtomatik, nolgacha). Siyosatlar: target tracking (CPU 60% ni ushlab turish), step scaling, rejali (ish vaqtida ko'proq), navbat uzunligi bo'yicha (custom metrika).",
        "",
        "Muhim: tez ishga tushish (oldindan qurilgan image, warm-up), minimal sonni HA uchun (kamida 2 AZ), maksimal sonni narx va DB himoyasi uchun, scale-in'da connection draining va job'larni graceful tugatish.",
        "",
        "```text",
        "ASG web: min 2, desired 3, max 12; target CPU 55%; warm-up 120 s",
        "ECS worker: navbat backlog > 500 → +2 task; < 50 (10 daq) → -1 task",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Web va worker qatlamlari uchun autoscaling siyosatlarini sozlab, yuklama testida xatti-harakatini kuzating.",
      acceptanceCriteria: [
        "Bulut autoscaling siyosatlarini biladi",
        "Scale-in xavfsizligini ta'minlaydi"
      ],
      prerequisites: [
        "67.15"
      ]
    },
    {
      id: "69.12",
      title: "Monitoring",
      description: [
        "Bulut monitoringi: CloudWatch / Cloud Monitoring / Azure Monitor — infratuzilma metrikalari (CPU, disk, tarmoq, LB so'rovlari, RDS), log'lar, alarm'lar, dashboard'lar; custom metrikalar ilovadan. Boshqariladigan servislar uchun tayyor metrikalar (RDS — ulanishlar, lag; ALB — 5xx, kechikish).",
        "",
        "Ilova darajasidagi kuzatuvchanlik (APM, Sentry, Prometheus/Grafana) bilan birga; muhim alarm'lar navbatchilikka (SNS → Slack/PagerDuty). Billing alarm'lari — kutilmagan narx o'sishi uchun.",
        "",
        "```text",
        "Alarm: ALB HTTPCode_Target_5XX_Count > 50 (5 daq) → SNS → #ops-alerts",
        "Alarm: RDS FreeStorageSpace < 20 GB → SNS",
        "Alarm: Billing EstimatedCharges > $2500 → email",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Asosiy bulut resurslari uchun alarm'lar va billing alarm'ini sozlang.",
      acceptanceCriteria: [
        "Bulut monitoring vositalarini biladi",
        "Infratuzilma va narx alarm'larini sozlaydi"
      ],
      prerequisites: [
        "58.13"
      ]
    },
    {
      id: "69.13",
      title: "Logging",
      description: [
        "Bulut loglash: CloudWatch Logs / Cloud Logging — konteyner va servis log'lari markazlashadi (awslogs driver, Fluent Bit), qidiruv (Logs Insights), metrika filtrlari (log naqshidan metrika), saqlash muddati (narx!), eksport (S3 — arzon arxiv). Audit log'lar (CloudTrail — kim qanday API amali qildi) alohida.",
        "",
        "Laravel: JSON formatda stderr'ga → bulut log tizimi; strukturali maydonlar bo'yicha qidiruv; saqlash muddatini log turiga qarab sozlash (default \"abadiy\" — qimmat).",
        "",
        "```text",
        "fields @timestamp, level_name, message, context.request_id",
        "| filter level_name = \"ERROR\" and context.route = \"orders.store\"",
        "| sort @timestamp desc | limit 50",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ilova log'larini bulut log tizimiga yig'ib, saqlash muddatini sozlang va xatolar bo'yicha so'rov yozing.",
      acceptanceCriteria: [
        "Bulut log xizmatlari imkoniyatlarini biladi",
        "Log saqlash narxini nazorat qiladi"
      ],
      prerequisites: [
        "58.8"
      ]
    },
    {
      id: "69.14",
      title: "Backup and Recovery",
      description: [
        "Bulutda backup: boshqariladigan DB avtomatik backup va PITR, disk snapshot'lari, S3 versiyalash va replikatsiya (boshqa regionga), AWS Backup (markazlashgan siyosatlar), backup'larni boshqa hisob/regionga nusxalash (ransomware va hisob buzilishiga qarshi), saqlash muddatlari va o'zgartirib bo'lmaydigan backup'lar (object lock).",
        "",
        "Bulut \"avtomatik\" backup — tiklash testlarisiz kafolat emas; provayderning umumiy mas'uliyat modeli bo'yicha ma'lumotni himoyalash — mijoz mas'uliyati.",
        "",
        "```text",
        "RDS: avtomatik backup 14 kun + kunlik snapshot boshqa regionga (30 kun)",
        "S3 uploads: versiyalash + cross-region replication + lifecycle (90 kundan keyin eski versiyalar Glacier)",
        "Har chorak: boshqa regionda restore mashqi",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Bulut resurslari uchun backup siyosatini (region, muddat, o'zgarmaslik) sozlab, boshqa regionda restore'ni sinang.",
      acceptanceCriteria: [
        "Bulut backup vositalarini biladi",
        "Backup'larni hisob/region darajasida izolyatsiya qiladi"
      ],
      prerequisites: [
        "68.13"
      ]
    },
    {
      id: "69.15",
      title: "Availability Zones",
      description: [
        "Region — geografik hudud (masalan, eu-central-1 Frankfurt); Availability Zone — region ichidagi mustaqil data markaz(lar). HA uchun resurslar kamida 2 AZ'da: LB (avtomatik), app instance'lar (ASG bir nechta AZ subnet'lari bilan), DB (Multi-AZ), kesh (replika boshqa AZ'da).",
        "",
        "Region tanlash: foydalanuvchilarga yaqinlik (kechikish), ma'lumot joylashuvi talablari, xizmatlar mavjudligi, narx. AZ'lararo trafik pullik — \"chatty\" servislarni bir AZ'da guruhlash va yuklama taqsimoti o'rtasida muvozanat.",
        "",
        "```text",
        "Region: eu-central-1 (O'zbekistonga nisbatan yaqin, to'liq xizmatlar)",
        "AZ-a: app ×2, RDS primary, Redis primary",
        "AZ-b: app ×2, RDS standby, Redis replika",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ilova uchun region tanlovini asoslang va resurslarni AZ'lar bo'ylab taqsimlash rejasini tuzing.",
      acceptanceCriteria: [
        "Region va AZ farqini biladi",
        "Region tanlov mezonlarini qo'llaydi"
      ],
      prerequisites: [
        "68.7"
      ]
    },
    {
      id: "69.16",
      title: "Cost Management",
      description: [
        "Bulut narxini boshqarish: narxni ko'rinadigan qilish (teglar — loyiha, muhit, jamoa bo'yicha; Cost Explorer, billing hisobotlari), byudjet va alarm'lar, rightsizing (ortiqcha katta instance'lar — CPU 10% da ishlaydi), reserved/savings plans barqaror yuklama uchun, spot instance'lar worker'lar uchun, dev/staging'ni tunda o'chirish, saqlash lifecycle'i (eski backup va log'lar), egress'ni kamaytirish (CDN), ishlatilmagan resurslarni tozalash (biriktirilmagan disklar, eski snapshot'lar, bo'sh LB'lar).",
        "",
        "FinOps — muhandislar narx uchun mas'uliyatni bo'lishadi; har arxitektura qarori narx bilan baholanadi.",
        "",
        "```text",
        "Oylik tahlil: RDS 38% · EC2 27% · NAT Gateway 11% (!) · S3 9% · CloudWatch Logs 8% · boshqa 7%",
        "Choralar: NAT o'rniga VPC endpoint (S3) · log saqlash 30 kun · staging tunda o'chirish → −22%",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Bulut hisobini xizmatlar bo'yicha tahlil qilib, eng katta 3 ta xarajat uchun optimallashtirish choralarini taklif qiling.",
      acceptanceCriteria: [
        "Bulut narxining asosiy manbalarini (shu jumladan yashirinlarini) biladi",
        "Narxni optimallashtirish usullarini qo'llaydi"
      ],
      prerequisites: [
        "66.23"
      ]
    },
    {
      id: "69.17",
      title: "Cloud Security",
      description: [
        "Bulut xavfsizligi: IAM (eng kam huquq, MFA, rollar, root'dan foydalanmaslik), tarmoq (xususiy subnet'lar, security group'lar minimal, ommaviy IP'siz DB), shifrlash (at rest — KMS, in transit — TLS), sirlar boshqaruvi, ommaviy S3 bucket'lar yo'q (Block Public Access), audit (CloudTrail), konfiguratsiya monitoringi (AWS Config, Security Hub, GuardDuty), patch'lar, backup'lar boshqa hisobda.",
        "",
        "Eng ko'p uchraydigan bulut insidentlari: noto'g'ri konfiguratsiya (ochiq bucket, ochiq DB porti) va sizib chiqqan kalitlar.",
        "",
        "```text",
        "Checklist: ✓ Root MFA, kalitsiz  ✓ S3 Block Public Access (hisob darajasida)",
        "✓ RDS publicly_accessible=false  ✓ SG: 22-port faqat VPN/SSM  ✓ CloudTrail barcha regionlarda",
        "✓ GuardDuty yoqiq  ✓ IAM kalitlari 90 kundan eski yo'q",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Bulut hisobini xavfsizlik checklist'i bo'yicha audit qilib, topilgan konfiguratsiya xatolarini tuzating.",
      acceptanceCriteria: [
        "Bulut xavfsizligi asosiy sohalarini biladi",
        "Tipik konfiguratsiya xatolarini oldini oladi"
      ],
      prerequisites: [
        "69.8"
      ]
    },
    {
      id: "69.18",
      title: "Infrastructure as Code",
      description: [
        "IaC — infratuzilmani kod sifatida tasvirlash va boshqarish: Terraform/OpenTofu (ko'p provayder), AWS CloudFormation/CDK, Pulumi (dasturlash tillarida), Ansible (konfiguratsiya boshqaruvi). Foydalari: takrorlanuvchanlik (staging va production bir xil), versiyalash va review (git, PR), avtomatik o'zgarish rejasi (`terraform plan`), tez qayta tiklash (DR), hujjat vazifasi.",
        "",
        "Amaliyot: state'ni masofaviy va lock bilan saqlash (S3 + DynamoDB), modullar, muhitlar uchun alohida state, sirlarni IaC'da saqlamaslik, drift aniqlash (qo'lda o'zgarishlar), CI'da `plan` va tasdiqli `apply`.",
        "",
        "```hcl",
        "resource \"aws_db_instance\" \"app\" {",
        "  identifier              = \"app-prod\"",
        "  engine                  = \"postgres\"",
        "  instance_class          = \"db.r6g.large\"",
        "  multi_az                = true",
        "  backup_retention_period = 14",
        "  publicly_accessible     = false",
        "  storage_encrypted       = true",
        "}",
        "```"
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Ilova infratuzilmasining bir qismini (DB yoki S3 + IAM) Terraform bilan tasvirlab, CI'da `plan` ni ko'rsating.",
      acceptanceCriteria: [
        "IaC foydalari va vositalarini biladi",
        "State boshqaruvi va drift masalalarini tushunadi"
      ],
      prerequisites: [
        "69.1"
      ]
    },
    {
      id: "69.19",
      title: "Deployment Models",
      description: [
        "Laravel ilovasini bulutga deploy qilish modellari: **VM + deploy vositasi** (Forge/Envoyer/Deployer — symlink releases; oddiy, tanish), **konteynerlar** (image → registry → ECS/Cloud Run/K8s — rolling update; takrorlanuvchan, masshtablanuvchan), **serverless** (Vapor/Bref — Lambda; avtomatik masshtab, sovuq start va cheklovlar), **PaaS** (Laravel Cloud, Elastic Beanstalk — minimal ekspluatatsiya).",
        "",
        "Strategiyalar: rolling, blue-green, canary — platforma imkoniyatlariga qarab. Tanlov — jamoa tajribasi, masshtab, narx va nazorat ehtiyoji.",
        "",
        "```text",
        "Kichik/o'rta: Forge + 2 VM + RDS — oddiy va arzon",
        "O'suvchi: ECS Fargate + ALB + RDS — konteynerlar, autoscaling",
        "Notekis yuklama: Vapor (Lambda) — nolgacha masshtab",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Loyihangiz uchun 3 ta deploy modelini solishtirib, tanlangani uchun deploy pipeline sxemasini chizing.",
      acceptanceCriteria: [
        "Laravel uchun bulut deploy modellarini biladi",
        "Modelni jamoa va yuklamaga qarab tanlaydi"
      ],
      prerequisites: [
        "43.15"
      ]
    },
    {
      id: "69.20",
      title: "Shared Responsibility Model",
      description: [
        "Umumiy mas'uliyat modeli: provayder — \"bulutning xavfsizligi\" (fizik data markazlar, apparat, virtualizatsiya, boshqariladigan servislarning infratuzilmasi); mijoz — \"bulutdagi xavfsizlik\" (ma'lumotlar, IAM, tarmoq konfiguratsiyasi, OS va ilova patch'lari IaaS'da, shifrlash sozlamalari, backup siyosati, ilova kodi).",
        "",
        "Chegara xizmat modeliga qarab siljiydi: IaaS'da mijoz mas'uliyati ko'proq (OS ham), PaaS/boshqariladigan servislarda kamroq, SaaS'da eng kam (lekin ma'lumot va kirish nazorati doim mijozda). \"Bulutda — demak xavfsiz\" — xato tasavvur.",
        "",
        "```text",
        "EC2:  provayder — apparat, gipervizor | siz — OS patch, PHP, Nginx, SG, IAM, ma'lumot",
        "RDS:  provayder — + OS, DB patch, backup infratuzilmasi | siz — ulanish, foydalanuvchilar, SG, shifrlash sozlamasi",
        "S3:   siz — bucket policy, ommaviy kirish, shifrlash, lifecycle",
        "```"
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ishlatayotgan har bir bulut xizmati uchun sizning mas'uliyatingizdagi xavfsizlik vazifalarini ro'yxatlang.",
      acceptanceCriteria: [
        "Umumiy mas'uliyat modelini biladi",
        "Xizmat modeliga qarab chegarani aniqlaydi"
      ],
      prerequisites: [
        "69.17"
      ]
    }
  ]
});
