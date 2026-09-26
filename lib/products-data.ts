export interface Product {
  id: string;
  slug: string;
  category: 'sleep' | 'focus' | 'balance' | 'gift' | 'protection';
  type: 'bracelet' | 'pendant' | 'set' | 'talisman';
  system: 'ambergris' | 'osmanthus' | 'ruihe' | 'kinetic' | 'talisman' | 'gift';
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
  // Scent & Sensory profile for CRO ScentPyramid
  scentProfile?: {
    topNotesEn: string;
    topNotesZh: string;
    heartNotesEn: string;
    heartNotesZh: string;
    baseNotesEn: string;
    baseNotesZh: string;
    tactileFeelEn: string;
    tactileFeelZh: string;
    sillage: 'Subtle' | 'Moderate' | 'Intimate' | 'Atmospheric';
    sillageZh: '幽微贴肤' | '温和弥散' | '私属静谧' | '环抱气场';
  };
}

export const PRODUCTS: Product[] = [
  // ==========================================
  // --- BALANCE COLLECTION (Primary Entrance) ---
  // ==========================================
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
    ritualStepZh: "拇指与食指轻捻香丸三圈，缓慢深吸气4秒，感受体温唤醒的草木温润。",
    scentProfile: {
      topNotesEn: "Cold-infused Wild Bergamot, Sweet Camphor",
      topNotesZh: "冷萃野香柠檬、淡雅脑息",
      heartNotesEn: "Ancient Ambergris Accord, Aged Sandalwood",
      heartNotesZh: "古方龙涎沉郁、陈化老山檀香",
      baseNotesEn: "Earthy Moss, Patchouli Root, Frankincense",
      baseNotesZh: "地衣苔藓、广藿老根、乳香微熏",
      tactileFeelEn: "Silky matte ceramic beads with soothing natural warmth",
      tactileFeelZh: "细腻微凉陶泥珠粒，随指尖体温回暖",
      sillage: "Subtle",
      sillageZh: "幽微贴肤"
    }
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
    ritualStepZh: "呼气时双手合拢贴覆胸坠，感受其实体重量与温度带来的心理安全感。",
    scentProfile: {
      topNotesEn: "Morning Mist, Green Tea Blossom",
      topNotesZh: "晨露青竹、清幽茶花",
      heartNotesEn: "Deep Sea Ambergris, Tibetan Cypress",
      heartNotesZh: "深海龙涎调和、藏柏古木",
      baseNotesEn: "Sweet Resin, Golden Myrrh",
      baseNotesZh: "温润安息香、金黄没药",
      tactileFeelEn: "Weighted solid bronze with smooth ergonomic chamfers",
      tactileFeelZh: "坠感扎实的黄铜质感，倒角圆润无棱角",
      sillage: "Moderate",
      sillageZh: "温和弥散"
    }
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
    ritualStepZh: "在工作切换间隙抬腕至鼻前，深嗅三次，隔绝外界噪音。",
    scentProfile: {
      topNotesEn: "Sweet Autumn Osmanthus, Sun-dried Apricot",
      topNotesZh: "金秋初绽丹桂、暖阳晒杏",
      heartNotesEn: "Aged Mysore Sandalwood, Cardamom",
      heartNotesZh: "陈化老山檀香、小豆蔻微温",
      baseNotesEn: "Smoky Vanilla, Benzoin Resin",
      baseNotesZh: "温厚香草木香、安息树脂",
      tactileFeelEn: "Organic amber warmth with delicate carved micro-textures",
      tactileFeelZh: "琥珀温润触感，搭配微雕防滑纹理",
      sillage: "Subtle",
      sillageZh: "幽微贴肤"
    }
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
    ritualStepZh: "站立时单手触按吊坠，以此为基点沉肩挺背，找回身体中轴线。",
    scentProfile: {
      topNotesEn: "Fresh Osmanthus Petals, Neroli",
      topNotesZh: "鲜摘金桂花瓣、苦橙花露",
      heartNotesEn: "Smoked Oolong Tea, Cedar Bark",
      heartNotesZh: "炭焙乌龙茶香、雪松木皮",
      baseNotesEn: "Amber Resin, White Musk Accord",
      baseNotesZh: "琥珀树脂、清透白麝香调",
      tactileFeelEn: "Lattice pierced sphere with polished metallic contours",
      tactileFeelZh: "玲珑镂空球体，边缘触感丝滑温厚",
      sillage: "Moderate",
      sillageZh: "温和弥散"
    }
  },

  // ==========================================
  // --- FOCUS COLLECTION ---
  // ==========================================
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
    ritualStepZh: "午后注意力困倦时，拇指紧按中心珠5秒并深吸气，瞬间重启专注力。",
    scentProfile: {
      topNotesEn: "High-mountain Peppermint, Natural Borneol",
      topNotesZh: "高山野生薄荷、天然龙脑冰片",
      heartNotesEn: "Siberian Fir Needle, Rosemary",
      heartNotesZh: "西伯利亚冷杉针叶、迷迭香",
      baseNotesEn: "Cypress Wood, Juniper Berry",
      baseNotesZh: "高山柏木、杜松浆果",
      tactileFeelEn: "Cool dark obsidian matte texture with geometric friction",
      tactileFeelZh: "冷冽哑光黑曜石，带清晰几何微触感",
      sillage: "Moderate",
      sillageZh: "温和弥散"
    }
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
    ritualStepZh: "在开始每段90分钟深度工作前，以指腹轻触冷冽金属边缘，立下专注心锚。",
    scentProfile: {
      topNotesEn: "Glacial Menthol, Eucalyptus Globulus",
      topNotesZh: "冰川薄荷、蓝桉叶清气",
      heartNotesEn: "Mountain Pine Resin, Crushed Sage",
      heartNotesZh: "高山松树脂、手捻鼠尾草",
      baseNotesEn: "Smoky Hinoki Wood, Vetiver Root",
      baseNotesZh: "烟熏桧木、岩兰草根",
      tactileFeelEn: "Sleek multifaceted bronze with sharp cooling edges",
      tactileFeelZh: "多面体精铸黄铜，棱角分明提振心神",
      sillage: "Moderate",
      sillageZh: "温和弥散"
    }
  },

  // ==========================================
  // --- SLEEP COLLECTION ---
  // ==========================================
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
    ritualStepZh: "入睡前半小时戴上，闭目微捻珠粒，配合4秒吸气、7秒屏息、8秒呼气节律。",
    scentProfile: {
      topNotesEn: "Lavender Mist, Wild Chamomile",
      topNotesZh: "高地薰衣草雾、野甘菊幽香",
      heartNotesEn: "Hainan Agarwood, Poria Cocos, Suan Zao Ren",
      heartNotesZh: "海南野生沉香、云茯神、酸枣仁",
      baseNotesEn: "Aged Chinese Angelica, Soft Cedar",
      baseNotesZh: "陈年当归微甜、柔和雪松",
      tactileFeelEn: "Velvety smooth ceramic spheres with comforting weight",
      tactileFeelZh: "丝绒般温润陶珠，手感厚重抚慰",
      sillage: "Intimate",
      sillageZh: "私属静谧"
    }
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
    ritualStepZh: "熄灯前双手捧香置于枕前，做三次深长腹部呼吸，感受气息填满丹田。",
    scentProfile: {
      topNotesEn: "Sweet Sleep Balsam, White Magnolia",
      topNotesZh: "静眠香脂、夜开白兰",
      heartNotesEn: "Wild Agarwood Smoke, Ground Cinnamon Bark",
      heartNotesZh: "沉香微烟、肉桂皮微温",
      baseNotesEn: "Golden Ambergris Base, Aged Sandalwood",
      baseNotesZh: "金暖龙涎基底、老檀香醇",
      tactileFeelEn: "Embossed auspicious crane carvings with warm burnished bronze finish",
      tactileFeelZh: "瑞鹤浮雕祥云纹理，黄铜做旧温润厚实",
      sillage: "Intimate",
      sillageZh: "私属静谧"
    }
  },

  // ==========================================
  // --- TAOIST TALISMANS & PROTECTION COLLECTION ---
  // ==========================================
  {
    id: "prod-talisman-tai-sui",
    slug: "the-tai-sui-protection-talisman-grand-duke-jupiter",
    category: "protection",
    type: "talisman",
    system: "talisman",
    pairedSlug: "the-north-dipper-fortune-talisman-hand-inscribed-vermilion-on-rice-paper",
    nameEn: "The Tai Sui Protection Talisman (Grand Duke Jupiter)",
    nameZh: "化太岁平安护体符 · 顺遂安康",
    taglineEn: "Consecrated Daoist vermilion seal shielding against astrological clashes and volatile turbulence.",
    taglineZh: "道门正统朱砂科仪开光，化解流年冲克太岁煞气，护佑一整年平安顺遂。",
    price: 39.90,
    originalPrice: 68.00,
    inStock: true,
    heroImage: "/images/talismans/yojqi-the-tai-sui-protection-talisman-grand-duke-jupiter-main-20260530.png",
    gallery: [
      "/images/talismans/yojqi-the-tai-sui-protection-talisman-grand-duke-jupiter-main-20260530.png",
      "/images/talismans/yojqi-the-tai-sui-protection-talisman-grand-duke-jupiter-02-main-20260530.png",
      "/images/talismans/yojqi-the-tai-sui-protection-talisman-grand-duke-jupiter-03-main-20260530.png"
    ],
    summaryEn: "Inscribed in pure natural mineral cinnabar vermilion upon handmade yellow mulberry rice paper. Consecrated on the celestial altar to dissolve karmic friction and anchor steady fortune for those navigating zodiac clashes.",
    summaryZh: "严选湖南高纯原矿朱砂，于古法手工楮皮黄纸上由道长择吉时沐浴斋戒手书，坛前敕笔盖印。专为犯太岁、冲太岁、害太岁者筑起坚固正阳护障，转危为安。",
    somaticBenefitsEn: [
      "Shields subtle biofield against erratic cosmic transit disturbances",
      "Psychological grounding object alleviating subconscious anxiety in transition years",
      "Compact consecrated folding suitable for phone case, wallet, or bedside"
    ],
    somaticBenefitsZh: [
      "原矿朱砂纯阳磁场，辟除阴晦煞气与意外波折",
      "提供强有力的心理安全心锚，安抚本命年或犯太岁的焦虑情绪",
      "精致道法折叠封装，便于随身放于钱包、手机壳或枕下"
    ],
    materialsEn: "Pure mineral cinnabar vermilion, handmade herbal-infused mulberry yellow paper, consecrated Daoist altar seal.",
    materialsZh: "天然矿物朱砂墨、手工竹浆黄表纸、道门坛前加盖三清法印。",
    dimensionsEn: "Unfolded: 26cm x 7.5cm. Folded talisman sachet: 5cm x 5cm.",
    dimensionsZh: "展开尺寸 26cm x 7.5cm；折叠护身符包 5cm x 5cm。",
    ritualStepEn: "Fold into the triangular Daoist guard shape or keep in sachet. Keep clean, dry, and reverent.",
    ritualStepZh: "依道规折成三角护身符或放入锦囊，随身携带，忌水浸与污损。"
  },
  {
    id: "prod-talisman-marshal-zhao",
    slug: "the-marshal-zhao-military-wealth-talisman",
    category: "protection",
    type: "talisman",
    system: "talisman",
    pairedSlug: "the-universal-luck-transfer-talisman",
    nameEn: "The Marshal Zhao Military Wealth Talisman",
    nameZh: "赵公明武财神招财聚宝符 · 广聚正偏财",
    taglineEn: "Channeling the celestial treasury of Marshal Zhao Gongming to activate commercial vitality and prosperity.",
    taglineZh: "奉请玄坛赵公元帅法旨，聚四方财源，护商贾正偏财禄，稳固财库。",
    price: 49.90,
    originalPrice: 88.00,
    inStock: true,
    heroImage: "/images/talismans/yojqi-the-marshal-zhao-military-wealth-talisman-main-20260530.png",
    gallery: [
      "/images/talismans/yojqi-the-marshal-zhao-military-wealth-talisman-main-20260530.png",
    ],
    summaryEn: "Hand-inscribed with the ancient sacred seals of the God of Wealth. Formulated for entrepreneurs, traders, creatives, and independent professionals looking to unlock stalled momentum and attract high-caliber opportunities.",
    summaryZh: "恭请正一玄坛赵元帅镇守财库，朱砂敕笔勾勒聚财秘讳。专为创业者、经商人士与现代职场人设计，吸纳正偏财气，防漏财破耗。",
    somaticBenefitsEn: [
      "Aligns conscious mindset with abundance and deliberate decisive action",
      "Repels speculative losses and dishonest commercial counterparties",
      "Placed inside cashier desks, office drawers, or leather wallets"
    ],
    somaticBenefitsZh: [
      "增强开拓魄力与商业决断力，树立丰盛财富信念",
      "镇守财库防小人劫财、阻断意外破耗",
      "适宜放置于收银台、办公桌抽屉、保险柜或随身钱包内"
    ],
    materialsEn: "Authentic vermilion cinnabar, gold-flecked sacred yellow paper, consecrated wealth seal.",
    materialsZh: "正品矿物朱砂、洒金宣表纸、赵元帅敕令法印。",
    dimensionsEn: "26cm x 8cm.",
    dimensionsZh: "26cm x 8cm。",
    ritualStepEn: "Place inside your primary financial wallet or right-side office drawer facing the entrance.",
    ritualStepZh: "放置于随身主力钱包中，或置于办公桌右侧抽屉内。"
  },
  {
    id: "prod-talisman-severing-petty-people",
    slug: "the-severing-petty-people-anti-gossip-talisman",
    category: "protection",
    type: "talisman",
    system: "talisman",
    pairedSlug: "the-hundred-solutions-karmic-cleansing-talisman",
    nameEn: "The “Severing Petty People?Anti-Gossip Talisman",
    nameZh: "斩断小人是非御气符 · 净化职场人际",
    taglineEn: "Establishes a firm auric boundary to deflect malicious office gossip and toxic envy.",
    taglineZh: "破除暗箭中伤与职场口舌是非，建立坚固人际能量防线，化敌为友。",
    price: 39.90,
    originalPrice: 59.00,
    inStock: true,
    heroImage: "/images/talismans/yojqi-the-severing-petty-people-anti-gossip-talisman-main-20260530.png",
    gallery: [
      "/images/talismans/yojqi-the-severing-petty-people-anti-gossip-talisman-main-20260530.png",
    ],
    summaryEn: "Designed to neutralize subtle passive-aggressive toxicity in high-stakes office environments. Purges discord, deflects slander, and keeps your professional reputation pristine.",
    summaryZh: "以道门斩煞金刀令为引，朱砂笔锋凌厉刚劲。专克职场内耗、小人谗言、暗中作梗与人际纠纷，助你气场清净独立，不被浊气缠扰。",
    somaticBenefitsEn: [
      "Shields empathetic and sensitive individuals from psychic draining",
      "Prevents toxic workplace gossip from penetrating personal mental space",
      "Discreet design easily kept in laptop sleeve or desk binder"
    ],
    somaticBenefitsZh: [
      "保护高敏感人士免遭职场情绪吸血与负面磁场侵蚀",
      "阻断口舌官非，令小人退避，贵人自来",
      "小巧隐蔽，可夹入笔记本、电脑包或工牌夹层"
    ],
    materialsEn: "High-grade vermilion cinnabar, aged yellow rice paper, sword-command seal.",
    materialsZh: "纯正朱砂矿粉入墨、古法黄麻纸、雷霆斩邪印。",
    dimensionsEn: "25cm x 7.5cm.",
    dimensionsZh: "25cm x 7.5cm。",
    ritualStepEn: "Keep inside your work laptop bag or left drawer of your primary workspace.",
    ritualStepZh: "置于常用办公电脑包内，或办公桌左侧青龙位抽屉。"
  },
  {
    id: "prod-talisman-celestial-health",
    slug: "the-celestial-health-guard-talisman",
    category: "protection",
    type: "talisman",
    system: "talisman",
    pairedSlug: "the-supreme-home-peace-harmony-talisman",
    nameEn: "The Celestial Health Guard Talisman",
    nameZh: "天医祛病安康护体符 · 调和气血保康宁",
    taglineEn: "Invoking the celestial medical deities to harmonize internal qi flow and bolster bodily vitality.",
    taglineZh: "奉请天医星君加持，祛除病秽之气，调和周身气血，保体魄强健长乐。",
    price: 39.90,
    originalPrice: 65.00,
    inStock: true,
    heroImage: "/images/talismans/yojqi-the-celestial-health-guard-talisman-main-20260530.png",
    gallery: [
      "/images/talismans/yojqi-the-celestial-health-guard-talisman-main-20260530.png",
    ],
    summaryEn: "Consecrated under the seal of the Celestial Physician deities. A gentle energetic anchor for individuals experiencing chronic fatigue, prolonged convalescence, or sleep debility.",
    summaryZh: "道门天医法门秘传，借天地纯阳生生不息之气，驱散滞留体表的虚邪贼风。适合长期伏案亚健康、体虚易疲劳或病后初愈调养者。",
    somaticBenefitsEn: [
      "Supports parasympathetic nervous system recovery during sleep",
      "Re-energizes drained biofield after intense hospital visits or illness",
      "Placed beneath pillow or bedhead for restful recuperation"
    ],
    somaticBenefitsZh: [
      "夜间辅助副交感神经修复，减少多梦惊悸",
      "净化出入医院、浊气场所后的体虚沉重感",
      "可安放于枕芯之下或床头柜，全天温养元气"
    ],
    materialsEn: "Natural cinnabar vermilion, sun-dried mountain herbs ink binder, consecrated medical seal.",
    materialsZh: "原矿朱砂、草本调和墨汁、道家天医宝印。",
    dimensionsEn: "26cm x 7.5cm.",
    dimensionsZh: "26cm x 7.5cm。",
    ritualStepEn: "Place underneath your pillow slip or inside your bedroom headboard compartment.",
    ritualStepZh: "安放于枕头内胆下方，或卧房床头避光处。"
  },
  {
    id: "prod-talisman-north-dipper",
    slug: "the-north-dipper-fortune-talisman-hand-inscribed-vermilion-on-rice-paper",
    category: "protection",
    type: "talisman",
    system: "talisman",
    pairedSlug: "the-tai-sui-protection-talisman-grand-duke-jupiter",
    nameEn: "The North Dipper Fortune Talisman",
    nameZh: "北斗七星本命转运朱砂符 · 祈福开运扭转乾坤",
    taglineEn: "Inscribed with the seven stars of the Big Dipper to realign personal fortune across stagnant periods.",
    taglineZh: "引北斗七元星君本命神光，破除运势低迷阻滞，拨云见日，顺风顺水。",
    price: 49.90,
    originalPrice: 79.00,
    inStock: true,
    heroImage: "/images/talismans/yojqi-the-north-dipper-fortune-talisman-hand-inscribed-vermilion-on-rice-paper-main-20260530.png",
    gallery: [
      "/images/talismans/yojqi-the-north-dipper-fortune-talisman-hand-inscribed-vermilion-on-rice-paper-main-20260530.png",
    ],
    summaryEn: "According to Daoist astral science, human destiny is intimately linked to the Big Dipper constellation. This talisman connects the bearer to the cosmic pivot, infusing clarity, life energy, and decisive turning points.",
    summaryZh: "北斗乃九天之枢纽，人身本命星宿所系。以朱砂手绘北斗星图秘讳，沟通星斗神明，化解坎坷羁绊，是低谷期反弹、重大抉择时刻的转运圣品。",
    somaticBenefitsEn: [
      "Cultivates intuitive clarity and confidence during major life pivots",
      "Restores natural optimism and energetic resilience",
      "Consecrated with Daoist star-stepping step rituals"
    ],
    somaticBenefitsZh: [
      "在人生十字路口强化直觉与敏锐度，坚定前行信念",
      "迅速扫除颓丧沉郁气场，注入蓬勃生机",
      "经步罡踏斗科仪加持，力量沉稳悠长"
    ],
    materialsEn: "Cinnabar vermilion, astral yellow parchment, Big Dipper constellation seal.",
    materialsZh: "纯正朱砂矿墨、星图法纸、北斗本命真君印。",
    dimensionsEn: "27cm x 8cm.",
    dimensionsZh: "27cm x 8cm。",
    ritualStepEn: "Hold in palms facing north for 10 seconds before placing inside your everyday bag.",
    ritualStepZh: "面朝北方双手合抱10秒默念所愿，随后收入随身包袋。"
  },
  {
    id: "prod-talisman-supreme-home-peace",
    slug: "the-supreme-home-peace-harmony-talisman",
    category: "protection",
    type: "talisman",
    system: "talisman",
    pairedSlug: "the-celestial-health-guard-talisman",
    nameEn: "The Supreme Home Peace & Harmony Talisman",
    nameZh: "镇宅安家平安和合符 · 辟煞化戾满室清宁",
    taglineEn: "Purifies home living spaces of discordant subtle energies and settles domestic unrest.",
    taglineZh: "镇守宅邸四方安宁，化解风水形煞与家宅戾气，迎祥纳福阖家和睦。",
    price: 49.90,
    originalPrice: 82.00,
    inStock: true,
    heroImage: "/images/talismans/yojqi-the-supreme-home-peace-harmony-talisman-main-20260530.png",
    gallery: [
      "/images/talismans/yojqi-the-supreme-home-peace-harmony-talisman-main-20260530.png",
    ],
    summaryEn: "Consecrated for residential spatial sanctuaries. Cleanses negative spatial memory in new apartments, prevents emotional friction between family members, and establishes an invisible haven of tranquility.",
    summaryZh: "道门正宗镇宅至宝。适用于新居入宅、租房净化、房屋朝向不吉或家庭成员多纷争的居所。一符镇宅，群邪退避，气聚中堂。",
    somaticBenefitsEn: [
      "Eliminates subtle ambient tension in living environments",
      "Enhances home restorative sleep and emotional warmth",
      "Suitable for framing or subtle placement above entrance lintels"
    ],
    somaticBenefitsZh: [
      "消除居室空间残留的负面能量与压抑感",
      "提升家庭氛围温馨度，促进居住者心平气和",
      "可装裱镜框陈设于玄关/客厅，亦可贴于入户门上方"
    ],
    materialsEn: "Heavyweight yellow calligraphy mulberry paper, pure cinnabar, celestial mountain seal.",
    materialsZh: "厚重手工宣表纸、原矿朱砂纯阳墨、泰山石敢当镇宅道印。",
    dimensionsEn: "30cm x 9cm.",
    dimensionsZh: "30cm x 9cm。",
    ritualStepEn: "Post discreetly above the main front entrance inside the house or frame in the living room.",
    ritualStepZh: "贴于住宅大门内侧上方居中，或装裱立于客厅吉位。"
  },
  {
    id: "prod-talisman-peach-blossom",
    slug: "the-peach-blossom-romance-talisman",
    category: "protection",
    type: "talisman",
    system: "talisman",
    pairedSlug: "ambergris-couple-set",
    nameEn: "The Peach Blossom Romance Talisman",
    nameZh: "和合招正缘桃花符 · 缘起良缘情深美满",
    taglineEn: "Cultivates genuine romantic magnetism and dissolves misunderstandings between intimate partners.",
    taglineZh: "和合二仙神力加持，催旺正缘桃花，增进伴侣心意相通，消除感情隔阂。",
    price: 39.90,
    originalPrice: 66.00,
    inStock: true,
    heroImage: "/images/talismans/yojqi-the-peach-blossom-romance-talisman-main-20260530.png",
    gallery: [
      "/images/talismans/yojqi-the-peach-blossom-romance-talisman-main-20260530.png",
    ],
    summaryEn: "Inscribed under the blessing of the Daoist Harmony Immortals (He He Er Xian). Helps single individuals attract high-vibrational, respectful romantic partners, while stabilizing long-term relationships through mutual warmth.",
    summaryZh: "道门和合法门朱砂秘字。斩断烂桃花与虚情假意，引动命中真善正缘；对于已有伴侣者，能融化冷战僵局，重燃最初的温柔与默契。",
    somaticBenefitsEn: [
      "Opens heart chakra receptivity and emotional softness",
      "Deflects superficial attachments and parasitic relationships",
      "Pairs naturally with YOJQI Osmanthus & Ambergris wearables"
    ],
    somaticBenefitsZh: [
      "舒展胸口膻中心轮，增强亲和力与由内而外的从容魅力",
      "过滤虚耗身心的烂桃花与纠缠关系",
      "搭配 YOJQI 金桂/龙涎香丸手绳佩戴，气味与能量相得益彰"
    ],
    materialsEn: "Cinnabar vermilion, rose-gold tinted parchment, Daoist He-He harmony seal.",
    materialsZh: "朱砂矿粉、特制暖粉洒金符纸、和合二仙敕令神印。",
    dimensionsEn: "25cm x 7.5cm.",
    dimensionsZh: "25cm x 7.5cm。",
    ritualStepEn: "Keep inside your makeup bag, jewelry box, or bedside nightstand drawer.",
    ritualStepZh: "放置于随身化妆包、首饰盒或卧室床头抽屉内。"
  },
  {
    id: "prod-talisman-scholastic-achievement",
    slug: "the-scholastic-achievement-talisman-exam-success",
    category: "protection",
    type: "talisman",
    system: "talisman",
    pairedSlug: "wrist-anchor-kinetic-energy-bracelet",
    nameEn: "The Scholastic Achievement Talisman (Exam Success)",
    nameZh: "文昌金榜魁星利考符 · 学业精进思维敏捷",
    taglineEn: "Under the patronage of Wenchang Dijun to sharpen mental acuity and grant calm focus during examinations.",
    taglineZh: "恭请文昌帝君与魁星踢斗神力，开智启慧，文思泉涌，金榜题名考运亨通。",
    price: 39.90,
    originalPrice: 62.00,
    inStock: true,
    heroImage: "/images/talismans/yojqi-the-scholastic-achievement-talisman-exam-success-main-20260530.png",
    gallery: [
      "/images/talismans/yojqi-the-scholastic-achievement-talisman-exam-success-main-20260530.png",
    ],
    summaryEn: "A dedicated talisman for students, academics, certification candidates, and knowledge creators. Channeling the mental clarity needed to retain complex data and execute with calm brilliance during high-stakes tests.",
    summaryZh: "道门文昌科仪正统加持。专为考公、考研、各类资格认证考证者以及文字创作人群量身打造。破除考前脑雾慌乱，保持超常发挥与清晰逻辑。",
    somaticBenefitsEn: [
      "Alleviates pre-exam adrenaline overload and memory blanks",
      "Fosters disciplined, steady study flow without erratic procrastination",
      "Fits seamlessly into pencil cases, book covers, or reading desks"
    ],
    somaticBenefitsZh: [
      "缓解考前焦虑恐慌与大脑空白状态，稳定考试发挥",
      "促进深度学习心流，提升知识吸收与逻辑推导速度",
      "可夹入文具盒、复习书封底或书桌文昌位"
    ],
    materialsEn: "Cinnabar vermilion, traditional scholar yellow paper, Wenchang Star God seal.",
    materialsZh: "原矿朱砂真墨、纯手工竹纸、文昌大帝敕命神印。",
    dimensionsEn: "26cm x 7.5cm.",
    dimensionsZh: "26cm x 7.5cm。",
    ritualStepEn: "Insert into your daily study binder or position on the left side of your study desk.",
    ritualStepZh: "夹在主力备考笔记内，或置于书桌左侧常驻。"
  },
  {
    id: "prod-talisman-hundred-solutions",
    slug: "the-hundred-solutions-karmic-cleansing-talisman",
    category: "protection",
    type: "talisman",
    system: "talisman",
    pairedSlug: "the-severing-petty-people-anti-gossip-talisman",
    nameEn: "The “Hundred Solutions?Karmic Cleansing Talisman",
    nameZh: "百解消灾化煞解厄符 · 化解因果诸事顺畅",
    taglineEn: "Traditional Daoist seal designed to dissolve karmic knots and neutralize negative residue.",
    taglineZh: "道家全能百解法符，化解百种灾煞厄难，除晦转吉，恢复磁场至清至纯。",
    price: 49.90,
    originalPrice: 88.00,
    inStock: true,
    heroImage: "/images/talismans/yojqi-the-hundred-solutions-karmic-cleansing-talisman-main-20260530.png",
    gallery: [
      "/images/talismans/yojqi-the-hundred-solutions-karmic-cleansing-talisman-main-20260530.png",
    ],
    summaryEn: "An all-encompassing Daoist master talisman inscribed to untie stubborn blockages across health, relationships, career, and spiritual heaviness. Returns the bearer's subtle energy field to clean baseline harmony.",
    summaryZh: "道门流传极广、威能博大的全效化灾符。涵盖解官非、解病厄、解小人、解破财等百种不利因素。当感觉事事不顺或诸事受阻时，佩戴此符能迅速打破僵局。",
    somaticBenefitsEn: [
      "Broad-spectrum subtle biofield reset and energetic reset",
      "Releases deep somatic tension caused by chronic stress spirals",
      "Universally compatible with all zodiacs and life paths"
    ],
    somaticBenefitsZh: [
      "全方位清理气场积压的陈旧晦气与负能量",
      "舒缓因长期逆境导致的身体沉重紧绷感",
      "不限生肖与命格，人皆可用，兼容性极高"
    ],
    materialsEn: "Consecrated vermilion mineral ink, fibrous aged rice paper, Supreme Celestial Master seal.",
    materialsZh: "天然矿物朱砂、加厚手工桑皮黄纸、张天师太上秘印。",
    dimensionsEn: "28cm x 8cm.",
    dimensionsZh: "28cm x 8cm。",
    ritualStepEn: "Fold reverently and carry in your central daily bag or wallet.",
    ritualStepZh: "折叠置于日常贴身随身包内，保持诚敬净信。"
  },
  {
    id: "prod-talisman-universal-luck",
    slug: "the-universal-luck-transfer-talisman",
    category: "protection",
    type: "talisman",
    system: "talisman",
    pairedSlug: "the-marshal-zhao-military-wealth-talisman",
    nameEn: "The Universal Luck Transfer Talisman",
    nameZh: "时来运转万应乾坤符 · 绝处逢生反败为胜",
    taglineEn: "Designed to unlock low-tide periods, shift stagnant momentum, and clear pathways for fresh auspicious cycles.",
    taglineZh: "转动阴阳乾坤气机，打破运势冰封低谷，枯木逢春，开启新一轮顺遂大运。",
    price: 49.90,
    originalPrice: 85.00,
    inStock: true,
    heroImage: "/images/talismans/yojqi-the-universal-luck-transfer-talisman-main-20260530.png",
    gallery: [
      "/images/talismans/yojqi-the-universal-luck-transfer-talisman-main-20260530.png",
    ],
    summaryEn: "Harnessing the continuous rotational vortex of the Taiji Yin-Yang matrix. Converts adversarial obstacles into stepping stones for breakthrough success in career, finance, and health.",
    summaryZh: "以道门太极乾坤流转之理入符，笔墨气势磅礴。当生活陷入瓶颈、付出难有回报时，此符能扭转磁场流向，促成贵人相助与关键契机降临。",
    somaticBenefitsEn: [
      "Dispels lethargy and reignites proactive life vitality",
      "Creates a protective positive vortex around the wearer",
      "Consecrated with authentic solar activation prayers"
    ],
    somaticBenefitsZh: [
      "驱散低沉萎靡情绪，唤醒身体深层行动力与生机",
      "在身心周遭形成持续向上的正向良性能量场",
      "坛前纯阳开光，能量充盈纯正"
    ],
    materialsEn: "Vermilion cinnabar, gold-dust cloud paper, Yin-Yang Vortex Daoist seal.",
    materialsZh: "高纯朱砂墨、云母金粉宣纸、乾坤阴阳太极道印。",
    dimensionsEn: "26cm x 8cm.",
    dimensionsZh: "26cm x 8cm。",
    ritualStepEn: "Keep in your front pocket or close to your chest when attending critical business or personal events.",
    ritualStepZh: "参加重要商务洽谈或关键会面时放于上衣内袋贴胸携带。"
  },

  // ==========================================
  // --- GIFT COLLECTION ---
  // ==========================================
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
    ritualStepZh: "双手互赠佩戴，于晨起或临别前相视静立5秒，感受同频呼吸。",
    scentProfile: {
      topNotesEn: "Dewy Pine, Sweet Mandarin Peel",
      topNotesZh: "松针晨露、甜橙新皮",
      heartNotesEn: "Double Infused Ambergris, Aged Cedar",
      heartNotesZh: "双萃龙涎沉香、老雪松木",
      baseNotesEn: "Warm Frankincense, Earthy Moss",
      baseNotesZh: "暖意乳香、幽静苔原",
      tactileFeelEn: "Polished brass and silky ceramic duo",
      tactileFeelZh: "精磨黄铜与丝滑陶泥双重质感",
      sillage: "Moderate",
      sillageZh: "温和弥散"
    }
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
    ritualStepZh: "晨起后根据当日心境挑选适宜香丸装入，为全天设立专注与从容的意图。",
    scentProfile: {
      topNotesEn: "Tri-Phase: Minty Frost / Bergamot / Sweet Floral",
      topNotesZh: "三态序曲：冷冽薄荷 / 佛手柑 / 雅致花露",
      heartNotesEn: "Tri-Phase: Pine Fir / Ambergris / Aged Agarwood",
      heartNotesZh: "三态主调：冷杉冰片 / 古方龙涎 / 海南沉香",
      baseNotesEn: "Tri-Phase: Vetiver / Patchouli / Benzoin",
      baseNotesZh: "三态基调：岩兰草 / 广藿香 / 安息香",
      tactileFeelEn: "Aged walnut wood case with tactile modular brass cores",
      tactileFeelZh: "黑胡桃木原木匣配三种模块化触感香珠",
      sillage: "Atmospheric",
      sillageZh: "环抱气场"
    }
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}
