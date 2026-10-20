/* 70 · AWS
 * Tavsiflar Markdown formatida (massiv qatorlari \n bilan birlashtiriladi).
 * id, slug, title va group'ni o'zgartirmang. Qoidalar: FLASH.md */
registerSkill({
  id: 70,
  slug: "aws",
  title: "AWS",
  group: "cloud",
  description: "Amazon Web Services (AWS) — dunyodagi eng yirik bulut platformasi bo'lib, zamonaviy Laravel ilovalarini yuqori yuklamada masshtablash, xavfsiz saqlash va barqaror ishlatish uchun keng servislar to'plamini taqdim etadi. Senior Laravel dasturchi AWS ning hisoblash (EC2, ECS, Lambda), ma'lumotlar bazasi (RDS, ElastiCache), xotira (S3) va tarmoq/xavfsizlik (VPC, IAM, ALB) xizmatlarini chuqur tushunishi hamda xarajat va ishonchlilik o'rtasidagi optimal balansni topa olishi shart.",
  subskills: [
    {
      id: "70.1",
      title: "IAM",
      description: [
        "AWS Identity and Access Management (IAM) — AWS resurslariga kirish huquqlarini boshqarishning markaziy xizmati. U Users, Groups, Roles va JSON formatidagi Policies orqali ishlaydi.",
        "",
        "Laravel ilovalarida EC2 yoki ECS konteynerlariga statik Access Key va Secret Key berish o'rniga IAM Role (Instance Profile) biriktirish eng xavfsiz standart hisoblanadi. SDK va Laravel avtomatik ravishda vaqtinchalik xavfsiz tokenlarni oladi.",
        "",
        "```json",
        "{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Effect\": \"Allow\",\n      \"Action\": [\"s3:GetObject\", \"s3:PutObject\"],\n      \"Resource\": \"arn:aws:s3:::my-laravel-bucket/*\"\n    }\n  ]\n}",
        "```"
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Laravel ilovasi faqat belgilangan bitta S3 bucket'ga fayl yuklashi va o'qishi uchun eng kam huquqli (least privilege) IAM Policy va Role yarating.",
      acceptanceCriteria: [
        "IAM User va IAM Role farqini va vaqtinchalik credentials afzalligini tushuntiradi",
        "JSON policy sintaksisi orqali resurs darajasidagi ruxsatlarni to'g'ri cheklaydi"
      ],
      prerequisites: ["69.9"]
    },
    {
      id: "70.2",
      title: "EC2",
      description: [
        "Amazon Elastic Compute Cloud (EC2) — bulutdagi virtual serverlar (instansiyalar). CPU, RAM, tarmoq o'tkazuvchanligi bo'yicha turlarga bo'linadi (t-seriya umumiy maqsadlar uchun, c-seriya compute, r-seriya xotira uchun).",
        "",
        "Laravel arxitekturasida EC2 serverlari PHP-FPM, Nginx va Horizon workerlarini ishga tushirish uchun qo'llaniladi. EBS (Elastic Block Store) doimiy disk sifatida, User Data skripti esa serverni ilk ko'tarilishida avtomatlashtirish uchun xizmat qiladi."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Ubuntu asosidagi EC2 instansiya ishga tushiring, unga User Data skripti orqali PHP 8.3 va Composer o'rnatilishini avtomatlashtiring.",
      acceptanceCriteria: [
        "Instansiya turlarini (masalan, t3.micro vs c6g) ish yuklamasiga qarab tanlay oladi",
        "EBS hajmi, turi (gp3) va SSH kalitlarini xavfsiz boshqaradi"
      ],
      prerequisites: ["39.1", "42.1"]
    },
    {
      id: "70.3",
      title: "VPC",
      description: [
        "Virtual Private Cloud (VPC) — AWS bulutida ajratilgan xususiy virtual tarmoq. Subnetlar, Route Tables, Internet Gateway (IGW) va NAT Gateway'lardan iborat.",
        "",
        "Xavfsiz Laravel arxitekturasida public va private subnetlar ajratiladi: Nginx va ALB public subnetda bo'ladi, ma'lumotlar bazasi (RDS) va kesh (ElastiCache) esa tashqi dunyodan to'liq yopiq bo'lgan private subnetga joylashtiriladi. Private subnetdagi serverlar tashqi paketlarni yangilashi uchun NAT Gateway orqali chiqadi."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "2 ta availability zone bo'ylab 2 ta public va 2 ta private subnetdan iborat VPC tarmog'ini loyihalang va marshrut jadvallarini sozlang.",
      acceptanceCriteria: [
        "Public va private subnetlar vazifasini aniq ajratadi",
        "NAT Gateway va Internet Gateway marshrutlarini xavfsiz o'rnatadi"
      ],
      prerequisites: ["38.14"]
    },
    {
      id: "70.4",
      title: "Security Groups",
      description: [
        "Security Groups (SG) — instansiyalar darajasidagi davlatni saqlovchi (stateful) virtual firewall. Kiruvchi (Inbound) va chiquvchi (Outbound) portlar va IP manzillarni boshqaradi.",
        "",
        "Eng muhim amaliyot: DB (masalan MySQL 3306) portini butun internetga (0.0.0.0/0) emas, faqat Laravel veb-serverlari biriktirilgan Security Group ID siga ochishdir. Bu tarmoq darajasidagi ishonchli xavfsizlik zanjirini kafolatlaydi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Web SG (80, 443 portlar ochiq) va Database SG (faqat Web SG dan keluvchi 3306 port ochiq) xavfsizlik guruhlarini yarating.",
      acceptanceCriteria: [
        "Stateful xususiyatini (kirgan paket avtomatik chiqishiga ruxsat olishini) tushunadi",
        "Security Group'larni bir-biriga havola qilib xavfsiz bog'laydi"
      ],
      prerequisites: ["70.3"]
    },
    {
      id: "70.5",
      title: "Application Load Balancer",
      description: [
        "Application Load Balancer (ALB) — OSI modelining 7-qatlamida (HTTP/HTTPS) ishlovchi yuklama taqsimlagich. Kiruvchi so'rovlarni bir nechta backend EC2 yoki ECS target'lariga taqsimlaydi.",
        "",
        "ALB SSL/TLS sertifikatlarini terminatsiya qiladi, Health Check orqali faol bo'lmagan serverlarga so'rov yubormaydi, hamda URL yo'llari (path-based routing) bo'yicha turli servislar (masalan API vs Web) o'rtasida trafikni yo'naltiradi."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "ALB yarating, unga `/health` endpointi orqali Laravel target group health check sozlang va HTTPS terminatsiyasini o'rnating.",
      acceptanceCriteria: [
        "Target Group va Health Check sozlamalarini to'g'ri konfiguratsiya qiladi",
        "X-Forwarded-For va X-Forwarded-Proto headerlarini Laravel `TrustProxies` middleware bilan moslashtiradi"
      ],
      prerequisites: ["41.2", "50.1"]
    },
    {
      id: "70.6",
      title: "Auto Scaling",
      description: [
        "Auto Scaling Groups (ASG) — yuklama oshganda instansiyalar sonini avtomatik ko'paytirish (scale-out) va yuklama kamayganda qisqartirish (scale-in) mexanizmi.",
        "",
        "CPU yuklamasi, so'rovlar soni yoki SQS navbatidagi xabarlar hajmiga qarab qoidalar belgilanadi. Laravel ilovasi avtomatik masshtablanishi uchun uning kodi to'liq 'stateless' bo'lishi shart: sessiyalar Redis yoki DB'da, fayllar esa S3 da saqlanishi kerak."
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Laravel ilovasi uchun Launch Template va CPU 70% dan oshganda yangi instansiya qo'shuvchi Target Tracking Auto Scaling siyosatini rejalashtiring.",
      acceptanceCriteria: [
        "Stateless arxitektura talablarini to'liq tushuntiradi",
        "Cool-down davri va scale-in jarayonida gracefully restart/shutdown tamoyillarini biladi"
      ],
      prerequisites: ["67.2", "70.5"]
    },
    {
      id: "70.7",
      title: "S3",
      description: [
        "Amazon Simple Storage Service (S3) — 99.999999999% (11 ta 9) chidamlilikka ega bo'lgan ob'ektli saqlash ombori. Statik fayllar, foydalanuvchi yuklamalari, backup va loglarni saqlashda de-fakto standart.",
        "",
        "Laravel `league/flysystem-aws-s3-v3` kutubxonasi orqali S3 bilan qulay integratsiya qilinadi. Katta hajmli fayllarni yuklashda serverga yuk tushirmaslik uchun S3 Presigned URL lardan foydalaniladi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Laravel `filesystems.php` da `s3` diskini sozlang va maxfiy hujjatlar uchun vaqtinchalik 15 daqiqalik Presigned URL yaratish kodini yozing.",
      acceptanceCriteria: [
        "Laravel Storage disklarida S3 drayverini sozlay oladi",
        "Bucket Public Access Block va xususiy kirish qoidalarini ta'minlaydi"
      ],
      prerequisites: ["55.1"]
    },
    {
      id: "70.8",
      title: "RDS",
      description: [
        "Amazon Relational Database Service (RDS) — MySQL va PostgreSQL kabi relyatsion ma'lumotlar bazalarini boshqariladigan (managed) servis sifatida taqdim etadi.",
        "",
        "RDS avtomatik zaxira nusxalar (backups), patchlar o'rnatish, Multi-AZ (nosozlik yuz berganda ikkinchi zonaga tezkor failover) va Read Replicas (o'qish so'rovlarini alohida nusxaga yo'naltirish orqali asosiy bazani yengillatish) imkoniyatlarini beradi."
      ],
      priority: "core",
      level: "Middle",
      practicalTask: "Laravel `.env` faylini RDS MySQL/PostgreSQL instansiyasi va Read Replica bilan ishlashga moslab `database.php` dagi `read` va `write` bo'limlarini sozlang.",
      acceptanceCriteria: [
        "Multi-AZ va Read Replica farqini va qo'llanish o'rnini biladi",
        "Laravel da o'qish/yozish ulanishlarini to'g'ri taqsimlaydi"
      ],
      prerequisites: ["10.1", "15.15"]
    },
    {
      id: "70.9",
      title: "ElastiCache",
      description: [
        "Amazon ElastiCache — bulutda yuqori unumli Redis yoki Memcached klasterlarini oson ishga tushirish va boshqarish xizmati.",
        "",
        "Laravel ilovalarida kesh, foydalanuvchi sessiyalari va real-vaqt ma'lumotlarini saqlash uchun qo'llaniladi. In-transit va at-rest shifrlash, avtomatik failover va Redis Cluster rejimida gorizontal kengayish imkoniyatlarini taqdim etadi."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Laravel kesh drayverini ElastiCache Redis Primary va Read Replica endpointlari bilan xavfsiz bog'lang.",
      acceptanceCriteria: [
        "ElastiCache Redis parametr guruhlari va xotira chegaralarini tushunadi",
        "Laravel konfiguratsiyasida Redis kesh va navbatlarini to'g'ri ajratadi"
      ],
      prerequisites: ["12.1", "54.1"]
    },
    {
      id: "70.10",
      title: "SQS",
      description: [
        "Amazon Simple Queue Service (SQS) — to'liq boshqariladigan navbat xizmati bo'lib, mikroservislar va asinxron fon vazifalarini uzluksiz bog'lash imkonini beradi.",
        "",
        "Standart (yuqori o'tkazuvchanlik, kamida bir marta yetkazish) va FIFO (qat'iy ketma-ketlik va dublikatlarni yo'qotish) navbat turlari mavjud. Laravel o'zida `sqs` navbat drayveriga ega bo'lib, foniy vazifalar uchun juda barqaror yechim hisoblanadi."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "Laravel Queue konfiguratsiyasida SQS drayverini sozlang va xabarlar qayta-qayta ishlanishining oldini olish uchun visibility timeout va dead-letter queue (DLQ) sozlang.",
      acceptanceCriteria: [
        "SQS Standard va FIFO navbatlari orasidagi farqni biladi",
        "Dead-Letter Queue (DLQ) orqali xatolikli vazifalarni izolyatsiya qiladi"
      ],
      prerequisites: ["46.1", "46.2"]
    },
    {
      id: "70.11",
      title: "SNS",
      description: [
        "Amazon Simple Notification Service (SNS) — yuqori unumli Pub/Sub (nashriyotchi/obunachi) xabar tarqatish xizmati.",
        "",
        "SNS bitta xabarni bir vaqtning o'zida bir nechta SQS navbatlariga (fan-out pattern), email, SMS yoki webhook endpointlariga tarqatish imkonini beradi. Masalan, yangi buyurtma tushganda SNS mavzusiga xabar yuboriladi va undan to'lov, ombor va xabarnoma xizmatlari parallel ravishda nusxa oladi."
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "Fan-out arxitekturasini loyihalang: SNS mavzusiga yuborilgan buyurtma ma'lumoti 2 ta mustaqil SQS navbatiga parallel tarqalsin.",
      acceptanceCriteria: [
        "Pub/Sub modeli va fan-out naqshini to'g'ri loyihalaydi",
        "Xabarlarni filtrlash (subscription filter policy) imkoniyatlarini tushunadi"
      ],
      prerequisites: ["48.1", "70.10"]
    },
    {
      id: "70.12",
      title: "CloudFront",
      description: [
        "Amazon CloudFront — kontentni foydalanuvchiga yaqin joylashgan Edge Location serverlar orqali yetkazib beruvchi global Content Delivery Network (CDN) xizmati.",
        "",
        "S3 dagi rasm va statik fayllarni (CSS/JS) keshlaydi, HTTPS sertifikatlarini ulaydi va DDoS hujumlaridan himoya qiladi (AWS Shield bilan). Shuningdek, Origin Shield va keshlash muddatlarini (TTL) HTTP headerlar orqali boshqarish mumkin."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "S3 bucket oldiga CloudFront taqsimotini o'rnating va faqat CloudFront orqali S3 ga kirish imkonini beruvchi OAC (Origin Access Control) siyosatini sozlang.",
      acceptanceCriteria: [
        "OAC orqali S3 ni to'liq yopiq saqlagan holda fayllarni CDN orqali tarqatadi",
        "Kesh invalidatsiyasi (cache invalidation) va TTL headerlarini to'g'ri sozlaydi"
      ],
      prerequisites: ["50.18"]
    },
    {
      id: "70.13",
      title: "Route 53",
      description: [
        "Amazon Route 53 — yuqori ishonchlilikka ega DNS (Domain Name System) va trafik marshrutlash xizmati.",
        "",
        "Domenlarni boshqarish bilan birga, Alias yozuvlari orqali ALB yoki CloudFront taqsimotlariga IP o'zgarsa ham bepul yo'naltirish beradi. Shuningdek, Health Checks asosidagi Failover routing, Geolocation va Latency-based marshrutlash siyosatlarini qo'llab-quvvatlaydi."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "Domen uchun Route 53 da Hosted Zone oching va ALB ga murojaat qiluvchi Alias A-record hamda sog'lomlikni tekshiruvchi Failover yozuvini loyihalang.",
      acceptanceCriteria: [
        "Alias va oddiy CNAME yozuvlari orasidagi farqni tushuntiradi",
        "DNS darajasidagi health check va failover mexanizmini sozlay oladi"
      ],
      prerequisites: ["50.11"]
    },
    {
      id: "70.14",
      title: "CloudWatch",
      description: [
        "Amazon CloudWatch — AWS resurslari va ilovalarining monitoring va kuzatuvchanlik (observability) tizimi. Metrikalar, jurnallar (Logs) va ogohlantirishlarni (Alarms) jamlaydi.",
        "",
        "Laravel `laravel-aws-cloudwatch` paketi yordamida ilova loglarini to'g'ridan-to'g'ri CloudWatch Logs guruhiga yuborish mumkin. CPU yuklamasi yoki HTTP 5xx xatolar ko'payganda Telegram yoki emailga xabar yuboruvchi Alarms o'rnatiladi."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "EC2 instansiyasiga CloudWatch agentini o'rnating va Laravel log fayllari (`storage/logs/laravel.log`) ni CloudWatch Logs'ga yuborishni sozlang.",
      acceptanceCriteria: [
        "CloudWatch log guruhlari va retention davrini sozlay oladi",
        "Metrika chegarasi oshganda ishga tushuvchi CloudWatch Alarm yaratadi"
      ],
      prerequisites: ["58.1"]
    },
    {
      id: "70.15",
      title: "CloudTrail",
      description: [
        "AWS CloudTrail — AWS akkauntingizdagi barcha boshqaruv amallari va API chaqiruvlarini audit qiluvchi va yozib boruvchi xizmat.",
        "",
        "Kim, qachon, qaysi IP manzildan qaysi resursni yaratgani yoki o'chirganini kuzatish imkonini beradi. Xavfsizlik hodisalarini (masalan, kutilmagan holda Security Group porti ochilishi) tahlil qilish va komplayens talablari uchun mutlaqo zarur."
      ],
      priority: "optional",
      level: "Strong Middle",
      practicalTask: "CloudTrail trail sozlang va S3 bucket o'chirilishi yoki IAM foydalanuvchisi yaratilishi hodisalarini qidirib topish so'rovini yozing.",
      acceptanceCriteria: [
        "CloudTrail boshqaruv (Management) va ma'lumotlar (Data) hodisalarini ajratadi",
        "Audit loglarini S3 da xavfsiz va o'zgarmas (WORM/Object Lock) holatda saqlashni biladi"
      ],
      prerequisites: ["70.1"]
    },
    {
      id: "70.16",
      title: "Secrets Manager",
      description: [
        "AWS Secrets Manager — ma'lumotlar bazasi parollari, API kalitlar va OAuth tokenlarni xavfsiz saqlash, boshqarish va avtomatik aylantirish (rotation) xizmati.",
        "",
        "Laravel `.env` faylida ochiq parollarni saqlash o'rniga, ilova yuklanish bosqichida AWS SDK orqali Secrets Manager dan konfiguratsiyalarni xavfsiz tortib olish yoki ECS task ta'riflariga integratsiya qilish eng yaxshi amaliyotdir."
      ],
      priority: "important",
      level: "Strong Middle",
      practicalTask: "Laravel ServiceProvider orqali ilova boshlanishida AWS Secrets Manager dan DB parolini olib `config(['database.connections.mysql.password' => ...])` ga yuklang.",
      acceptanceCriteria: [
        "Parollarni shifrlangan holda saqlash va KMS integratsiyasini tushunadi",
        "Avtomatik secret rotation tamoyilini tushuntiradi"
      ],
      prerequisites: ["51.17"]
    },
    {
      id: "70.17",
      title: "Systems Manager",
      description: [
        "AWS Systems Manager (SSM) — serverlarni boshqarish va konfiguratsiya xizmati. Uning tarkibidagi Parameter Store xavfsiz parametrlarni bepul/arzon saqlash uchun mashhur.",
        "",
        "Shuningdek, SSM Session Manager yordamida EC2 serverlarida 22-portni (SSH) butunlay yopib, hech qanday ochiq port va SSH kalitlarsiz faqat IAM ruxsatlari orqali xavfsiz terminal sessiyalarini ochish mumkin."
      ],
      priority: "optional",
      level: "Strong Middle",
      practicalTask: "Parameter Store da Laravel `.env` parametrlarini saqlang va SSM Session Manager orqali EC2 instansiyasiga SSH kalitsiz kiring.",
      acceptanceCriteria: [
        "Parameter Store va Secrets Manager o'rtasidagi farqni biladi",
        "Session Manager orqali SSH portisiz xavfsiz boshqaruvni o'rnatadi"
      ],
      prerequisites: ["39.4", "70.1"]
    },
    {
      id: "70.18",
      title: "ECS",
      description: [
        "Amazon Elastic Container Service (ECS) — Docker konteynerlarini yuqori darajada masshtablash va boshqarish imkonini beruvchi orkestratsiya xizmati.",
        "",
        "EC2 instansiyalarida yoki AWS Fargate (serverless hisoblash muhiti) yordamida serverlarni boshqarmasdan konteynerlarni yurgizish mumkin. Task Definition, Service va Cluster tushunchalariga asoslanadi va Laravel ilovalarini konteynerlashtirilgan holda nol-uzilish (zero-downtime) bilan yangilash imkonini beradi."
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "Laravel Nginx + PHP-FPM konteynerlari uchun AWS Fargate rejimida ECS Task Definition va Service yarating.",
      acceptanceCriteria: [
        "ECS Fargate va EC2 launch type o'rtasidagi farqni tushuntiradi",
        "Task Execution Role va Task Role farqlarini to'g'ri biriktiradi"
      ],
      prerequisites: ["36.1", "70.19"]
    },
    {
      id: "70.19",
      title: "ECR",
      description: [
        "Amazon Elastic Container Registry (ECR) — xavfsiz, yuqori unumli Docker va OCI konteyner tasvirlari (images) ombori.",
        "",
        "CI/CD quvurlarida (GitLab CI yoki GitHub Actions) qurilgan Laravel Docker tasvirlari ECR ga yuklanadi. ECR o'rnatilgan zaifliklarni skanerlash (vulnerability scanning) va keraksiz eski tasvirlarni avtomatik tozalovchi Lifecycle Policies imkoniyatlariga ega."
      ],
      priority: "important",
      level: "Middle",
      practicalTask: "GitHub Actions yoki lokal kompyuterdan ECR omboriga avtorizatsiyadan o'tib, Laravel ilovasi Docker tasvirini taglab yuklang.",
      acceptanceCriteria: [
        "ECR reestriga `docker login` buyrug'i orqali autentifikatsiyani amalga oshiradi",
        "Eski tasvirlarni avtomatik o'chiruvchi Lifecycle Policy yozadi"
      ],
      prerequisites: ["36.17", "45.1"]
    },
    {
      id: "70.20",
      title: "EKS fundamentals",
      description: [
        "Amazon Elastic Kubernetes Service (EKS) — AWS tomonidan boshqariladigan Kubernetes (K8s) klaster xizmati. K8s boshqaruv tekisligini (Control Plane) avtomatik saqlaydi va ta'minlaydi.",
        "",
        "Katta tashkilotlarda Laravel mikroservislari, gRPC servislar va navbat workerlarini murakkab orkestratsiya qilish, avtomatik gorizontal pod masshtablash (HPA) va servislararo tarmoq boshqaruvida keng qo'llaniladi."
      ],
      priority: "optional",
      level: "Senior",
      practicalTask: "EKS klasterining asosiy tushunchalarini tahlil qiling: Node Group, Helm chart va Laravel uchun K8s Deployment manifestini tuzing.",
      acceptanceCriteria: [
        "EKS ning ECS ga nisbatan afzallik va murakkablik tomonlarini tushuntiradi",
        "K8s manifestida env parametrlar va ingress kontroller sozlamalarini biladi"
      ],
      prerequisites: ["36.1", "65.1"]
    },
    {
      id: "70.21",
      title: "Lambda fundamentals",
      description: [
        "AWS Lambda — serversiz (serverless) hisoblash xizmati bo'lib, kodni serverlarni o'rnatmasdan va boshqarmasdan faqat hodisalar (events) asosida ishga tushiradi.",
        "",
        "Laravel dunyosida 'Laravel Vapor' vositasi orqali butun Laravel ilovasini Lambda ustida to'liq serverless ishga tushirish mumkin. Bref PHP runtime yordamida esa S3 ga rasm tushganda o'lchamini o'zgartirish yoki SQS xabarlarini qayta ishlash kabi mikrofunktsiyalar yoziladi."
      ],
      priority: "optional",
      level: "Strong Middle",
      practicalTask: "Bref yoki Laravel Vapor yordamida oddiy PHP/Laravel funksiyasini Lambda'ga yuklash arxitekturasini loyihalang.",
      acceptanceCriteria: [
        "Serverless cold start va timeout cheklovlarini hisobga oladi",
        "Hodisaga asoslangan chaqiruvlarni (S3 event yoki API Gateway trigger) tushuntiradi"
      ],
      prerequisites: ["69.1"]
    },
    {
      id: "70.22",
      title: "IAM Least Privilege",
      description: [
        "Eng kam huquq berish (Least Privilege) tamoyili — foydalanuvchi, servis yoki ilovaga faqat o'z vazifasini bajarishi uchun zarur bo'lgan minimal ruxsatlarni berish amaliyotidir.",
        "",
        "Katta xato: Laravel ilovasiga `AdministratorAccess` yoki barcha S3 bucketlarga `s3:*` ruxsatini berish. Hujumchi serverni buzib kirsa, butun bulut infrastrukturasini qo'lga kiritadi. Shuning uchun Action, Resource va Condition bloklari qat'iy cheklanadi."
      ],
      priority: "core",
      level: "Strong Middle",
      practicalTask: "Keng ochilgan IAM siyosatini audit qiling va uni faqat bitta S3 prefixiga yozish huquqini qoldiruvchi qat'iy siyosatga refactoring qiling.",
      acceptanceCriteria: [
        "Yovvoyi belgilardan (`*`) voz kechib, aniq Action va Resource ko'rsatadi",
        "Vaqtinchalik Role va Condition (masalan IP cheklovi) mexanizmlaridan foydalanadi"
      ],
      prerequisites: ["70.1", "51.2"]
    },
    {
      id: "70.23",
      title: "Backup and Recovery",
      description: [
        "Bulutda zaxira nusxalarini yaratish va tiklash (Disaster Recovery). AWS Backup xizmati EBS disklari, RDS bazalari va EFS fayl tizimlarini markazlashgan holda reja asosida zaxiralaydi.",
        "",
        "RPO (Recovery Point Objective — qancha vaqtlik ma'lumot yo'qotilishi mumkinligi) va RTO (Recovery Time Objective — tizimni qancha vaqtda tiklash kerakligi) ko'rsatkichlari belgilanadi. Point-In-Time Recovery (PITR) yordamida RDS bazasini xatolik yuz bergan aniq soniyagacha orqaga qaytarish mumkin."
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "RDS bazasi uchun har kuni avtomatik snapshot olish, 30 kunlik PITR va boshqa AWS mintaqasiga (cross-region) nusxalash rejasini tuzing.",
      acceptanceCriteria: [
        "RPO va RTO parametrlarini biznes talabiga mos tanlaydi",
        "Snapshotdan yangi instansiya tiklash jarayonini amalda sinab ko'radi"
      ],
      prerequisites: ["68.12", "70.8"]
    },
    {
      id: "70.24",
      title: "Cost Optimization",
      description: [
        "AWS da xarajatlarni optimallashtirish — resurslar ortiqcha tanlanishi (over-provisioning) va bo'sh turgan xarajatlarning oldini olish amaliyoti.",
        "",
        "Asosiy usullar: doimiy ishlaydigan instansiyalar uchun Savings Plans yoki Reserved Instances (RI) sotib olish (30-60% tejash), foniy va chidamli ishlar uchun Spot instansiyalar ishlatish, foydalanilmayotgan EBS disklari va Elastic IP larni o'chirish, S3 Lifecycle orqali eski fayllarni Glacier arxivida saqlash."
      ],
      priority: "important",
      level: "Senior",
      practicalTask: "AWS Cost Explorer yordamida oylik sarf-xarajatlarni tahlil qiling va Laravel ilovasi infratuzilmasi narxini kamida 25% ga arzonlashtiruvchi tavsiyalar rejasini yozing.",
      acceptanceCriteria: [
        "On-Demand, Reserved, Savings Plans va Spot narxlash modellarini tushunadi",
        "S3 Glacier va EBS gp2 dan gp3 ga o'tish kabi tejovchi choralar ko'rsatadi"
      ],
      prerequisites: ["66.23", "69.17"]
    },
    {
      id: "70.25",
      title: "Laravel Deployment on AWS",
      description: [
        "Laravel ilovasini AWS bulutida sanoat standartlari asosida joylashtirish (production-grade deployment).",
        "",
        "Klassik mustahkam arxitektura: DNS (Route 53) → CDN (CloudFront) → Yuklama taqsimlagich (ALB) → Auto Scaling dagi EC2/ECS ilova serverlari (stateless) → Boshqariladigan baza (RDS Multi-AZ) + Kesh (ElastiCache Redis) + Fayllar (S3) + Navbatlar (SQS yoki Redis Horizon). CI/CD orqali konteynerlar nol uzilish bilan yangilanadi."
      ],
      priority: "core",
      level: "Senior",
      practicalTask: "Yuqori yuklamali Laravel ilovasi uchun ALB, ECS Fargate, RDS PostgreSQL, ElastiCache va S3 komponentlarini o'z ichiga olgan arxitektura diagrammasini va deployment rejasini tuzing.",
      acceptanceCriteria: [
        "Stateless Laravel tamoyillarini barcha komponentlarda to'g'ri qo'llaydi",
        "Zero-downtime deployment va DB migration jarayonini xavfsiz rejalashtiradi"
      ],
      prerequisites: ["70.1", "70.3", "70.5", "70.8", "70.18"]
    }
  ]
});
