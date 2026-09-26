export interface Product {
  id: string;
  slug: string;
  category: 'sleep' | 'focus' | 'balance' | 'gift';
  type: 'bracelet' | 'pendant' | 'set';
  system: 'ambergris' | 'osmanthus' | 'ruihe' | 'kinetic' | 'imperial' | 'southern' | 'gift';
  pairedSlug?: string;
  nameEn: string;
  nameZh: string;
  taglineEn: string;
  taglineZh: string;
  price: number;
  originalPrice: number;
  inStock: boolean;
  heroImage: string;
  gallery: string[];
  summaryEn: string;
  summaryZh: string;
  somaticBenefitsEn: string[];
  somaticBenefitsZh: string[];
  materialsEn: string;
  materialsZh: string;
  dimensionsEn: string;
  dimensionsZh: string;
  ritualStepEn: string;
  ritualStepZh: string;
}

export const PRODUCTS: Product[] = [
  // --- BALANCE COLLECTION (Primary Entrance) ---
  {
    id: "prod-ambergris-bracelet",
    slug: "wrist-anchor-ambergris-ease-bracelet",
    category: "balance",
    type: "bracelet",
    system: "ambergris",
    pairedSlug: "ambergris-ease-pendant",
    nameEn: "Wrist Anchor — Ambergris Ease Bracelet",
    nameZh: "腕间锚点 — 龙涎舒缓定心手绳",
    taglineEn: "A subtle tactile pulse point anchor for daily nervous system grounding.",
    taglineZh: "触手可及的脉搏锚点，安抚神经紧绷，重归呼吸平稳。",
    price: 39.90,
    originalPrice: 59.00,
    inStock: true,
    heroImage: "/images/products/ambergris-bracelet.png",
    gallery: [
      "/images/products/ambergris-bracelet.png",
      "/images/products/ambergris-pendant.png",
    ],
    summaryEn: "Crafted for effortless daily wear, the Ambergris Ease Bracelet features a porous ceramic micro-capsule core infusing ancient herbal essences. Whenever anxiety rises, touch the beads and let the tactile warmth anchor your attention.",
    summaryZh: "为日常轻巧佩戴而生。手链内置微孔陶瓷储香核心，封存传统古法草本芳香精萃。每当情绪浮躁或焦虑蔓延时，轻捻珠粒，借助触觉与温度让心神重归平静。",
    somaticBenefitsEn: [
      "Tactile touch grounding during crowded transit or sensory fatigue",
      "Subtle botanical diffusion without intrusive artificial fragrance",
      "Custom woven silk cord tailored for ergonomic all-day wrist contact"
    ],
    somaticBenefitsZh: [
      "在嘈杂通勤或感官疲劳时提供即时触觉锚定",
      "天然植物香气微循环，温和不刺鼻",
      "专研贴腕天然丝线编织，全天亲肤舒适"
    ],
    materialsEn: "Porous ceramic herbal sphere, hand-braided natural silk cord, brass anchor accents.",
    materialsZh: "微孔陶土香丸核心、手工天然编织丝线、黄铜微调扣件。",
    dimensionsEn: "Adjustable 15cm - 21cm inner circumference. Bead diameter: 10mm.",
    dimensionsZh: "可调节内周长 15cm - 21cm，香丸直径 10mm。",
    ritualStepEn: "Rotate the sphere gently between thumb and forefinger three times. Take a slow 4-second inhalation through the nose.",
    ritualStepZh: "拇指与食指轻捻香丸三圈，缓慢深吸气4秒，感受体温唤醒的草木温润。"
  },
  {
    id: "prod-ambergris-pendant",
    slug: "ambergris-ease-pendant",
    category: "balance",
    type: "pendant",
    system: "ambergris",
    pairedSlug: "wrist-anchor-ambergris-ease-bracelet",
    nameEn: "Ambergris Ease Pendant",
    nameZh: "龙涎舒缓定心胸坠",
    taglineEn: "Worn over the sternum, synchronizing breathing rhythm with natural herbal warmth.",
    taglineZh: "悬于胸口膻中穴位，随胸腔呼吸起伏释放宁和木质清香。",
    price: 49.90,
    originalPrice: 79.00,
    inStock: true,
    heroImage: "/images/products/ambergris-pendant.png",
    gallery: [
      "/images/products/ambergris-pendant.png",
      "/images/products/ambergris-bracelet.png",
    ],
    summaryEn: "Designed to rest directly at the heart center, the Ambergris Ease Pendant releases calming aromatic notes through body warmth. A visible somatic ritual object for deep emotional recalibration.",
    summaryZh: "恰好垂落于胸腔核心区域，随着体温升温自然释放温和幽香。这是一件可被看见、被触摸的躯体冥想物，助你重拾内在从容。",
    somaticBenefitsEn: [
      "Anchors sternum breath awareness and diaphragmatic rhythm",
      "Body-heat activated slow aromatic evaporation",
      "Minimalist bronze cage architecture protecting the herbal sphere"
    ],
    somaticBenefitsZh: [
      "锚定胸腔膻中呼吸感知，引导深长腹式呼吸",
      "体温自发驱动缓释草木香气",
      "极简黄铜几何镂空结构，守护内部草本香丸"
    ],
    materialsEn: "Matte bronze protective cage, infused natural ambergris herbal sphere, durable waxed cord.",
    materialsZh: "哑光黄铜防护镂空笼、古方龙涎草本香丸、耐磨防水蜡绳。",
    dimensionsEn: "Pendant: 22mm x 14mm. Cord length: 55cm with sliding knot adjuster.",
    dimensionsZh: "吊坠规格 22mm x 14mm，绳长 55cm（带活扣可调）。",
    ritualStepEn: "Cup both hands over the pendant during exhales to feel the physical weight and temperature grounding.",
    ritualStepZh: "呼气时双手合拢贴覆胸坠，感受其实体重量与温度带来的心理安全感。"
  },
  {
    id: "prod-osmanthus-bracelet",
    slug: "wrist-anchor-autumn-resonance-bracelet",
    category: "balance",
    type: "bracelet",
    system: "osmanthus",
    pairedSlug: "osmanthus-poise-pendant",
    nameEn: "Wrist Anchor — Autumn Resonance Bracelet",
    nameZh: "腕间锚点 — 秋韵金桂定心手绳",
    taglineEn: "Golden osmanthus and aged sandalwood for social recovery and gentle uplifting.",
    taglineZh: "金桂初绽与陈化老檀，专为社交疲惫与情绪回温而调配。",
    price: 39.90,
    originalPrice: 59.00,
    inStock: true,
    heroImage: "/images/products/osmanthus-bracelet.png",
    gallery: [
      "/images/products/osmanthus-bracelet.png",
      "/images/products/osmanthus-pendant.png",
    ],
    summaryEn: "Infused with cold-pressed osmanthus absolute and wild mountain sandalwood. A comforting wrist companion that restores emotional buoyancy after draining social encounters.",
    summaryZh: "萃取金秋高山野生金桂与沉稳老檀香。温和醇厚的气息如暮秋暖阳，在密集社交与工作消耗后迅速回补身心元气。",
    somaticBenefitsEn: [
      "Rebalances mood swings with warm floral-woody synergy",
      "Tactile micro-grooves on the beads for tactile sensory grounding",
      "Non-metallic hypoallergenic design"
    ],
    somaticBenefitsZh: [
      "花香与沉木复合调和，抚平内耗与情绪波动",
      "珠体微弧度触觉纹路，满足指尖无意识抚触需求",
      "天然材质防过敏佩戴设计"
    ],
    materialsEn: "Osmanthus-herbal compounded sphere, warm amber beads, hand-spun sand cord.",
    materialsZh: "金桂草本复合香丸、暖琥珀珠粒、手工沙色拉绳。",
    dimensionsEn: "Adjustable 14.5cm - 20cm.",
    dimensionsZh: "可调手围 14.5cm - 20cm。",
    ritualStepEn: "Raise wrist near the mouth during three paced breaths when transitioning between meetings.",
    ritualStepZh: "在工作切换间隙抬腕至鼻前，深嗅三次，隔绝外界噪音。"
  },
  {
    id: "prod-osmanthus-pendant",
    slug: "osmanthus-poise-pendant",
    category: "balance",
    type: "pendant",
    system: "osmanthus",
    pairedSlug: "wrist-anchor-autumn-resonance-bracelet",
    nameEn: "Osmanthus Poise Pendant",
    nameZh: "金桂定心随身胸坠",
    taglineEn: "Warm floral equilibrium held in quiet bronze geometry.",
    taglineZh: "黄铜镂金之中，锁住一整个秋天的温润与从容。",
    price: 49.90,
    originalPrice: 79.00,
    inStock: true,
    heroImage: "/images/products/osmanthus-pendant.png",
    gallery: [
      "/images/products/osmanthus-pendant.png",
      "/images/products/osmanthus-bracelet.png",
    ],
    summaryEn: "An architectural bronze cage carrying sweet autumn notes of pure osmanthus. Designed for graceful posture and centered breathwork.",
    summaryZh: "以经典雕花镂空笼封存金桂香丸，伴随步履摇曳释放若有若无的清雅气韵，使体态舒展，呼吸自然下沉。",
    somaticBenefitsEn: [
      "Promotes upright chest posture through gentle forward pendulum weight",
      "Long-lasting botanical release unaffected by synthetic perspiration",
      "Elegant silhouette suitable for business and retreat settings"
    ],
    somaticBenefitsZh: [
      "微坠感引导胸腔端正舒展，避免含胸驼背",
      "古法合香持久温和释香，不受汗液干扰",
      "典雅器型，商务与静修皆得体"
    ],
    materialsEn: "Hand-finished antique bronze, natural osmanthus herbal core, adjustable cord.",
    materialsZh: "复古做旧黄铜、古法金桂草本香丸、精编绳链。",
    dimensionsEn: "20mm diameter sphere cage, 60cm cord.",
    dimensionsZh: "镂空球直径 20mm，绳长 60cm。",
    ritualStepEn: "Rest hand on pendant when standing upright to check shoulder alignment.",
    ritualStepZh: "站立时单手触按吊坠，以此为基点沉肩挺背，找回身体中轴线。"
  },

  // --- FOCUS COLLECTION ---
  {
    id: "prod-kinetic-bracelet",
    slug: "wrist-anchor-kinetic-energy-bracelet",
    category: "focus",
    type: "bracelet",
    system: "kinetic",
    pairedSlug: "kinetic-energy-anchor-pendant",
    nameEn: "Wrist Anchor — Kinetic Energy Bracelet",
    nameZh: "腕间锚点 — 动能护持专注手绳",
    taglineEn: "Mint, camphor, and cypress for cutting through screen fatigue and brain fog.",
    taglineZh: "薄荷、龙脑与冷杉精油融合，击破屏幕疲劳与脑雾困局。",
    price: 39.90,
    originalPrice: 59.00,
    inStock: true,
    heroImage: "/images/products/kinetic-bracelet.png",
    gallery: [
      "/images/products/kinetic-bracelet.png",
      "/images/products/kinetic-pendant.png",
    ],
    summaryEn: "Engineered for intense digital workflows. Provides a crisp, invigorating olfactory kick and distinct tactile trigger to interrupt doomscrolling and renew deep focus.",
    summaryZh: "专为高强度数字工作者研发。清冽醒神的龙脑冰片气息，结合清晰的触觉触感，帮助你斩断注意力涣散与无意义刷屏，重返心流。",
    somaticBenefitsEn: [
      "Stimulates cranial clarity without caffeinated jitters",
      "Immediate somatic disruptor for habitual distraction",
      "Durable water-resistant construction for active daily use"
    ],
    somaticBenefitsZh: [
      "唤醒清爽神智，不依赖过量咖啡因刺激",
      "提供即刻触觉阻断，打断无意识走神",
      "防汗防水材质，耐受日常高频使用"
    ],
    materialsEn: "Cooling botanical herbal core, dark obsidian beads, braided nylon anchor.",
    materialsZh: "清凉草本冰片香丸、黑曜石触感珠、高密编织绳。",
    dimensionsEn: "Adjustable 15cm - 21.5cm.",
    dimensionsZh: "腕围 15cm - 21.5cm。",
    ritualStepEn: "When hitting 3 PM fatigue, press the core bead with your thumb for 5 seconds, take a sharp inhale.",
    ritualStepZh: "午后注意力困倦时，拇指紧按中心珠5秒并深吸气，瞬间重启专注力。"
  },
  {
    id: "prod-kinetic-pendant",
    slug: "kinetic-energy-anchor-pendant",
    category: "focus",
    type: "pendant",
    system: "kinetic",
    pairedSlug: "wrist-anchor-kinetic-energy-bracelet",
    nameEn: "Kinetic Energy Anchor Pendant",
    nameZh: "动能护持专注项链",
    taglineEn: "A geometric talisman channeling mental clarity and cognitive stamina.",
    taglineZh: "利落几何线条守护，源源不断注入敏锐洞察与专注力。",
    price: 49.90,
    originalPrice: 79.00,
    inStock: true,
    heroImage: "/images/products/kinetic-pendant.png",
    gallery: [
      "/images/products/kinetic-pendant.png",
      "/images/products/kinetic-bracelet.png",
    ],
    summaryEn: "Designed with streamlined aerodynamic facets. As you move, slight air current diffuses crisp botanical herbs upward toward the nostrils, keeping the mind sharp across deep work blocks.",
    summaryZh: "采用流线型微风动导流孔设计。身体微小动作或呼吸气流即可带动清新草木香气向上弥散，使长时间创作与思考保持思路通畅。",
    somaticBenefitsEn: [
      "Micro-airflow aerodynamic diffusion designed for desk postures",
      "Tactile polygon edges activate sensory receptors in fingertips",
      "Industrial bronze finish pairs seamlessly with modern aesthetics"
    ],
    somaticBenefitsZh: [
      "专为伏案体态优化的气流微循环扩香",
      "多面棱角触感，有效刺激指尖感受器",
      "工业黄铜复古工艺，与极简现代着装相得益彰"
    ],
    materialsEn: "Solid bronze alloy cage, kinetic botanical herbal core, steel rope chain.",
    materialsZh: "高强度黄铜合金骨架、动能草本清凉香丸、精细不锈钢挂链。",
    dimensionsEn: "Length: 28mm, Width: 12mm, Chain: 60cm.",
    dimensionsZh: "长 28mm，宽 12mm，链长 60cm。",
    ritualStepEn: "Touch the cold metallic edges before starting any 90-minute focus session.",
    ritualStepZh: "在开始每段90分钟深度工作前，以指腹轻触冷冽金属边缘，立下专注心锚。"
  },

  // --- SLEEP COLLECTION ---
  {
    id: "prod-ruihe-bracelet",
    slug: "wrist-anchor-ruihe-sanctuary-bracelet",
    category: "sleep",
    type: "bracelet",
    system: "ruihe",
    pairedSlug: "ruihe-sanctuary-pendant",
    nameEn: "Wrist Anchor — Ruihe Sanctuary Bracelet",
    nameZh: "腕间锚点 — 瑞鹤安睡定神手绳",
    taglineEn: "Sedative valerian root, agarwood, and poria cocos for evening wind-down.",
    taglineZh: "沉香、茯神与缬草古方凝萃，助你平复夜间奔涌思绪，安然入眠。",
    price: 39.90,
    originalPrice: 59.00,
    inStock: true,
    heroImage: "/images/products/ambergris-bracelet.png",
    gallery: [
      "/images/products/ambergris-bracelet.png",
      "/images/products/ambergris-pendant.png",
    ],
    summaryEn: "Crafted specifically for bedtime tactile wind-down. Smooth ceramic texture and deep woodsy grounding herbs facilitate the transition from digital cognitive overdrive into restorative deep sleep.",
    summaryZh: "专为睡前身心着陆设计。细腻微凉的陶泥质感，搭配沉香与茯神的安神气息，带走睡前脑海中的工作思绪与屏幕蓝光躁动。",
    somaticBenefitsEn: [
      "Replaces pre-sleep smartphone clutching with calming tactile contact",
      "Herbal synergy proven in traditional regimens to deepen delta brainwaves",
      "No sharp metal edges for safe, comfortable wearing in bed"
    ],
    somaticBenefitsZh: [
      "取代睡前频繁刷手机的手部动作，建立宁静触觉习惯",
      "传统草本协同作用，诱导深层放松与睡眠节律",
      "无尖锐金属结构，佩戴入睡舒适无虞"
    ],
    materialsEn: "Aged agarwood herbal core, matte poria ceramic beads, soft indigo silk thread.",
    materialsZh: "陈年老沉香香丸核心、哑光茯神陶珠、柔软深青丝线。",
    dimensionsEn: "Adjustable 14cm - 20cm snug fit.",
    dimensionsZh: "贴合腕围 14cm - 20cm。",
    ritualStepEn: "Slip on 30 minutes before sleep. Trace the beads with eyes closed while practicing 4-7-8 breathing.",
    ritualStepZh: "入睡前半小时戴上，闭目微捻珠粒，配合4秒吸气、7秒屏息、8秒呼气节律。"
  },
  {
    id: "prod-ruihe-pendant",
    slug: "ruihe-sanctuary-pendant",
    category: "sleep",
    type: "pendant",
    system: "ruihe",
    pairedSlug: "wrist-anchor-ruihe-sanctuary-bracelet",
    nameEn: "Ruihe Sanctuary Sleep Pendant",
    nameZh: "瑞鹤定神安眠香坠",
    taglineEn: "Deep agarwood sanctuary to quiet an overstimulated nervous system.",
    taglineZh: "深邃沉木之息，在床头与胸前营造一方静谧神域。",
    price: 49.90,
    originalPrice: 79.00,
    inStock: true,
    heroImage: "/images/products/ambergris-pendant.png",
    gallery: [
      "/images/products/ambergris-pendant.png",
      "/images/products/ambergris-bracelet.png",
    ],
    summaryEn: "Can be worn around the neck in evening hours or placed near the pillow as a dedicated sleep incense sanctuary. Fosters slow exhalations and nervous system safety.",
    summaryZh: "晚间可佩戴于胸前，睡前亦可置于枕边作为随身沉香安眠盒。温和的气味环抱感令交感神经平息，安心入梦。",
    somaticBenefitsEn: [
      "Creates an olfactory boundary between daytime urgency and sleep retreat",
      "Weight rests reassuringly over the center of the chest",
      "Long-term slow scent maturation that gets richer over time"
    ],
    somaticBenefitsZh: [
      "用独特沉香气味建立白天忙乱与夜晚休息的感官分界线",
      "胸口沉降感带来被包裹的踏实感",
      "天然香丸久经温润，岁月愈久越显醇厚"
    ],
    materialsEn: "Bronze crane motif cage, Ruihe agarwood formula sphere, natural cord.",
    materialsZh: "瑞鹤镂空铜构、瑞鹤安睡沉香丸、天然挂绳。",
    dimensionsEn: "Cage: 24mm. Cord: 60cm.",
    dimensionsZh: "吊坠主体 24mm，挂绳 60cm。",
    ritualStepEn: "Hold pendant in palms at pillow height for three deep belly breaths before turning off the lights.",
    ritualStepZh: "熄灯前双手捧香置于枕前，做三次深长腹部呼吸，感受气息填满丹田。"
  },

  // --- GIFT COLLECTION ---
  {
    id: "prod-ambergris-couple-set",
    slug: "ambergris-couple-set",
    category: "gift",
    type: "set",
    system: "ambergris",
    pairedSlug: "sanctuary-trio-gift-box",
    nameEn: "Ambergris Couple Sanctuary Set",
    nameZh: "龙涎双栖情侣安神礼盒（手链+胸坠）",
    taglineEn: "A shared olfactory frequency and somatic bond for partners traveling life together.",
    taglineZh: "同频草木香气，在腕间与胸口系下彼此心意相通的体温羁绊。",
    price: 79.90,
    originalPrice: 118.00,
    inStock: true,
    heroImage: "/images/products/ambergris-bracelet.png",
    gallery: [
      "/images/products/ambergris-bracelet.png",
      "/images/products/ambergris-pendant.png",
    ],
    summaryEn: "Includes one Wrist Anchor Bracelet and one Ease Pendant packaged in our signature unbleached paulownia wood ritual box with raw calligraphy linen. A thoughtful gift for anniversaries, shared journeys, or long-distance connection.",
    summaryZh: "内含龙涎定心手绳一条及龙涎胸坠一枚，配以天然桐木素造礼盒与特选手工毛边麻布。无论朝夕相伴还是异地远行，皆是赠与重要之人的至臻心礼。",
    somaticBenefitsEn: [
      "Synchronizes mutual autonomic calm across distance",
      "Unboxing ritual designed around tactile grounding and slow anticipation",
      "Includes organic replenishing botanical mist"
    ],
    somaticBenefitsZh: [
      "建立两人间的气味与身心同频联结",
      "素雅开盒仪式，从视觉到触觉感受慢下来的静美",
      "随盒附赠草本养护精萃喷雾"
    ],
    materialsEn: "Solid unbleached wood box, fine brass fittings, ambergris herbal spheres (2x).",
    materialsZh: "天然原木收纳礼盒、精造黄铜搭扣、草本龙涎香丸两枚、挂饰两组。",
    dimensionsEn: "Gift box: 18cm x 12cm x 6cm.",
    dimensionsZh: "礼盒尺寸 18cm x 12cm x 6cm。",
    ritualStepEn: "Exchange the items with both hands, sharing a synchronized 5-second silence.",
    ritualStepZh: "双手互赠佩戴，于晨起或临别前相视静立5秒，感受同频呼吸。"
  },
  {
    id: "prod-sanctuary-trio-box",
    slug: "sanctuary-trio-gift-box",
    category: "gift",
    type: "set",
    system: "gift",
    pairedSlug: "ambergris-couple-set",
    nameEn: "The Complete Somatic Ritual Trilogy Box",
    nameZh: "YOJQI 全境三态身心定心典藏礼盒",
    taglineEn: "Three master formulas: Sleep (Ruihe), Focus (Kinetic), and Balance (Ambergris).",
    taglineZh: "全套集齐安睡（瑞鹤）、专注（动能）、定心（龙涎）三大经典体系。",
    price: 108.00,
    originalPrice: 158.00,
    inStock: true,
    heroImage: "/images/products/osmanthus-pendant.png",
    gallery: [
      "/images/products/osmanthus-pendant.png",
      "/images/products/kinetic-pendant.png",
      "/images/products/ambergris-pendant.png",
    ],
    summaryEn: "The comprehensive entry point to YOJQI somatic wearability. Features interchangeable cores for daytime focus, twilight emotional balance, and nocturnal deep restorative sleep.",
    summaryZh: "YOJQI 草本穿戴体感系统的全境旗舰之选。内含三套独立香丸与可替换多功能挂扣，从清晨深度工作、午后情绪平衡，到深夜安然入眠，全天候陪伴护航。",
    somaticBenefitsEn: [
      "Covers 24-hour circadian rhythm modulation",
      "Interchangeable core mechanism compatible across all YOJQI wearable mounts",
      "Handmade collector's edition certificate of craftsmanship"
    ],
    somaticBenefitsZh: [
      "全方位覆盖昼夜节律与身心能量转换",
      "模块化通用可换芯架构，轻松切换气味场景",
      "附手工编号匠心典藏证书"
    ],
    materialsEn: "Aged walnut timber presentation case, matte brass modules, triple formula herbal spheres.",
    materialsZh: "陈化胡桃木展匣、哑光铜质装具、三态原研草本香丸。",
    dimensionsEn: "22cm x 16cm x 7cm.",
    dimensionsZh: "22cm x 16cm x 7cm。",
    ritualStepEn: "Select your daily formula upon waking to consciously set your somatic intention for the day.",
    ritualStepZh: "晨起后根据当日心境挑选适宜香丸装入，为全天设立专注与从容的意图。"
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}
