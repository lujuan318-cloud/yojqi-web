/**
 * Official Homestay Room Catalog for YOJQI Direct Booking
 * 
 * Maps directly to Hostex (百居易) House Types & Physical Properties
 * Single Source of Truth architecture:
 * - Room types & properties correspond to Hostex PMS
 * - Pricing anchors link to 繁花 RMS dynamic pricing
 */

export interface RetreatRoomType {
  room_key: string;
  slug: string;
  house_type_id: number;
  listing_id: string; // Primary Booking.com listing used for calendar & live pricing
  property_ids: number[]; // Physical property IDs in Hostex
  default_property_id: number;
  
  // Bilingual Marketing & Names
  nameZh: string;
  nameEn: string;
  subtitleZh: string;
  subtitleEn: string;
  badgeZh: string;
  badgeEn: string;
  
  // Specs
  area: string;
  floorZh: string;
  floorEn: string;
  capacity: number;
  bedInfoZh: string;
  bedInfoEn: string;
  viewZh: string;
  viewEn: string;
  
  // Pricing & Value
  basePrice: number; // RMS baseline anchor price
  minFloorPrice: number; // RMS hard floor price protection
  
  // Visuals
  coverImage: string;
  gallery: string[];
  
  // Amenities & Highlights
  tagsZh: string[];
  tagsEn: string[];
  amenitiesZh: string[];
  amenitiesEn: string[];
  droneVantageZh: string;
  droneVantageEn: string;
  
  // Direct Booking Perks
  directPerksZh: string[];
  directPerksEn: string[];
  
  // Policies
  cancellationPolicyZh: string;
  cancellationPolicyEn: string;
  checkInTime: string;
  checkOutTime: string;
}

export const RETREAT_ROOM_CATALOG: RetreatRoomType[] = [
  {
    room_key: 'balcony_king_b',
    slug: 'balcony-river-view-king',
    house_type_id: 221230,
    listing_id: '1714162801-69081086',
    property_ids: [12512775, 12752493, 12777271],
    default_property_id: 12512775,
    nameZh: '潋滟·两江汇全江景阳台大床房',
    nameEn: 'Lian Yan | Balcony Panoramic King Room',
    subtitleZh: '高空私享超大观景阳台 · 俯瞰两江交汇与洪崖洞璀璨夜色',
    subtitleEn: 'High-altitude private terrace overlooking Yangtze & Jialing confluence and glowing skyline',
    badgeZh: '两江交汇 · 独立观景阳台',
    badgeEn: '270° Riverfront Private Balcony',
    area: '48 ㎡',
    floorZh: '高空 21-22 层',
    floorEn: 'Floors 21-22',
    capacity: 2,
    bedInfoZh: '1张特大双人床 (1.8m × 2.0m)',
    bedInfoEn: '1 King Bed (1.8m × 2.0m)',
    viewZh: '两江交汇全江景 / 洪崖洞木质灯火 / 绝美日落晚霞',
    viewEn: 'Two Rivers Confluence, Hongyadong Lights, Sunset Horizon',
    basePrice: 688,
    minFloorPrice: 420,
    coverImage: 'https://yojqi.com/wp-content/uploads/2026/03/baihong-hongyadong-view.jpg',
    gallery: [
      'https://yojqi.com/wp-content/uploads/2026/03/baihong-hongyadong-view.jpg',
      'https://yojqi.com/wp-content/uploads/2026/05/baihong-hongyadong-view-5.jpg',
      '/images/retreats/baihong-room-01.jpg',
      '/images/retreats/baihong-drone-night.jpg',
    ],
    tagsZh: ['270°全江景', '私享独立阳台', '静音茶席', '智能温控', '双层隔音玻璃'],
    tagsEn: ['270° River View', 'Private Balcony', 'Tea Station', 'Smart Climate', 'Acoustic Glazing'],
    amenitiesZh: [
      '超大高空私享观景阳台与实木茶座',
      '天然水洗亚麻高织床品与零压乳胶枕',
      '工夫茶席配备精选陈年普洱与甘冽山泉',
      '干湿分离独立卫浴、热带雨林花洒',
      '高速光纤无线网络与巨幕投屏',
      '全天免费行李寄存与管家接引',
    ],
    amenitiesEn: [
      'Private high-altitude riverfront terrace with tea furniture',
      'Premium washed linen bedding and memory foam pillows',
      'Full Kung Fu tea set with aged Pu-erh and bottled spring water',
      'Designer bathroom with walk-in rainforest shower',
      'Gigabit high-speed Wi-Fi and high-definition projector',
      'Complimentary luggage storage & concierge assistance',
    ],
    droneVantageZh: '正对朝天门与两江交汇天幕空域，端坐阳台茶席即可免挤平视千架无人机编队起降。',
    droneVantageEn: 'Direct visual line to the Chaotianmen aerial formation zone; relax on your private terrace away from street crowds.',
    directPerksZh: ['官网直订立享 95 折', '专属东方迎宾欢迎茶礼', '免费提早入住 (视房态)', '专属管家 1 对 1 路线定制'],
    directPerksEn: ['Official 5% Direct Discount', 'Complimentary Welcome Tea Gift', 'Priority Early Check-in (subject to availability)', 'Dedicated Concierge Trip Curation'],
    cancellationPolicyZh: '入住前 48 小时可免费取消；48 小时内取消扣除首晚房费。',
    cancellationPolicyEn: 'Free cancellation up to 48 hours prior to check-in. Cancellations within 48 hours incur first night charge.',
    checkInTime: '15:00',
    checkOutTime: '12:00',
  },
  {
    room_key: 'floor_window_king',
    slug: 'floor-to-ceiling-skyline-king',
    house_type_id: 71446,
    listing_id: '1714162802-69081086',
    property_ids: [11587530, 12316816, 12316815, 12512774, 12724674, 12752494, 12777272],
    default_property_id: 11587530,
    nameZh: '流光·洪崖洞落地观景大床房',
    nameEn: 'Liu Guang | Floor-to-Ceiling Skyline King',
    subtitleZh: '整面通顶巨幕落地窗 · 临窗深泡浴缸 · 沉浸式赛博山城夜色',
    subtitleEn: 'Full-wall panoramic glass, soaking tub by the window, immersive city skyline',
    badgeZh: '巨幕落地窗 · 观景浴缸',
    badgeEn: 'Full Glass Wall · Scenic Tub',
    area: '45 ㎡',
    floorZh: '高空 21 层',
    floorEn: 'Floor 21',
    capacity: 2,
    bedInfoZh: '1张特大双人床 (1.8m × 2.0m)',
    bedInfoEn: '1 King Bed (1.8m × 2.0m)',
    viewZh: '洪崖洞吊脚楼顶 / 千厮门大桥灯光 / 城市天际线',
    viewEn: 'Hongyadong Stilt Roofs, Qiansimen Bridge Lights, Cyberpunk Skyline',
    basePrice: 628,
    minFloorPrice: 380,
    coverImage: 'https://yojqi.com/wp-content/uploads/2026/05/baihong-hongyadong-view-5.jpg',
    gallery: [
      'https://yojqi.com/wp-content/uploads/2026/05/baihong-hongyadong-view-5.jpg',
      'https://yojqi.com/wp-content/uploads/2026/03/baihong-hongyadong-view.jpg',
      '/images/retreats/baihong-drone-night.jpg',
    ],
    tagsZh: ['巨幕落地窗', '观景深泡池', '千厮门大桥', '胶囊咖啡', '香氛体验'],
    tagsEn: ['Panoramic Glass', 'Soaking Tub', 'Bridge View', 'Espresso Machine', 'Botanical Scent'],
    amenitiesZh: [
      '临窗定制景观泡池与天然植物沐浴草本',
      '通顶全幅隔音落地玻璃，饱览山城立体夜幕',
      '高织精梳棉奢华床品，静音电动遮光帘',
      '胶囊咖啡机与东方原叶茶礼盒',
      '智能马桶与戴森高速吹风机',
    ],
    amenitiesEn: [
      'Window-side soaking tub with herbal bath rituals',
      'Ceiling-high acoustic glass wall over illuminated bridges',
      'High-thread combed cotton bedding and electric blackout curtains',
      'Capsule coffee machine and loose-leaf tea selection',
      'Smart bidet toilet and high-velocity hair dryer',
    ],
    droneVantageZh: '大开面落地窗视野，傍晚坐在浴缸或茶榻边即可尽揽千厮门大桥灯海与天际飞星。',
    droneVantageEn: 'Expansive glass view; enjoy the evening bridge light sea and drone formations right from your sofa.',
    directPerksZh: ['官网直订立享 95 折', '免费泡汤草本浴盐包', '免费行李寄存', '优先选房权益'],
    directPerksEn: ['Official 5% Direct Discount', 'Herbal Bath Soak Kit', 'Free Luggage Storage', 'Preferred Room Assignment'],
    cancellationPolicyZh: '入住前 48 小时可免费取消；48 小时内取消扣除首晚房费。',
    cancellationPolicyEn: 'Free cancellation up to 48 hours prior to check-in. Cancellations within 48 hours incur first night charge.',
    checkInTime: '15:00',
    checkOutTime: '12:00',
  },
  {
    room_key: 'twin_view_a',
    slug: 'river-view-twin-zhiyu',
    house_type_id: 71445,
    listing_id: '1714162803-69081086',
    property_ids: [11587529, 12316814, 12724675],
    default_property_id: 11587529,
    nameZh: '知屿·两江汇双床观景房',
    nameEn: 'Zhi Yu | Twin Beds River View Room',
    subtitleZh: '品质双床规制 · 闺蜜与商务从容出行 · 窗前品茗远眺水色',
    subtitleEn: 'Curated twin beds for friends or business travel with serene bridge and river vistas',
    badgeZh: '两江汇流 · 舒适双床',
    badgeEn: 'Dual Beds · River Scenery',
    area: '42 ㎡',
    floorZh: '高空 21 层',
    floorEn: 'Floor 21',
    capacity: 2,
    bedInfoZh: '2张舒适单人床 (1.2m × 2.0m)',
    bedInfoEn: '2 Single Beds (1.2m × 2.0m)',
    viewZh: '千厮门大桥 / 嘉陵江水色 / 城市繁华天际',
    viewEn: 'Qiansimen Bridge, Jialing River, Skyline',
    basePrice: 588,
    minFloorPrice: 360,
    coverImage: '/images/retreats/baihong-room-02.jpg',
    gallery: [
      '/images/retreats/baihong-room-02.jpg',
      '/images/retreats/baihong-room-01.jpg',
      'https://yojqi.com/wp-content/uploads/2026/03/baihong-hongyadong-view.jpg',
    ],
    tagsZh: ['品质双床', '干湿分离', '独立茶几', '隔音静谧', '光纤网络'],
    tagsEn: ['Twin Layout', 'Divided Bath', 'Tea Corner', 'Quiet Glazing', 'Fast Wi-Fi'],
    amenitiesZh: [
      '两张独立 1.2m 护脊硬棕乳胶双床',
      '双人独立观景品茗休闲座席',
      '干湿分离卫浴空间与高压恒温淋浴',
      '双人洗漱备品与纯棉厚款浴袍',
    ],
    amenitiesEn: [
      'Two ergonomic single beds with supportive memory mattresses',
      'Twin scenic tea seating for conversation',
      'Split bathroom with thermostatic rainfall shower',
      'Plush bathrobes and premium organic amenities',
    ],
    droneVantageZh: '窗前平视两江水面与桥头车流，是与好友静度周末的理想居所。',
    droneVantageEn: 'Clear window perspective facing the water convergence, ideal for friends traveling together.',
    directPerksZh: ['官网直订立享 95 折', '专属迎宾冷泡茶两瓶', '免费寄存行李'],
    directPerksEn: ['Official 5% Direct Discount', 'Complimentary Cold Brew Tea Pair', 'Free Luggage Storage'],
    cancellationPolicyZh: '入住前 48 小时可免费取消；48 小时内取消扣除首晚房费。',
    cancellationPolicyEn: 'Free cancellation up to 48 hours prior to check-in. Cancellations within 48 hours incur first night charge.',
    checkInTime: '15:00',
    checkOutTime: '12:00',
  },
  {
    room_key: 'twin_view_b',
    slug: 'panoramic-twin-qingying',
    house_type_id: 221229,
    listing_id: '1714162804-69081086',
    property_ids: [12512776, 12752495, 12777273],
    default_property_id: 12512776,
    nameZh: '清影·两江汇全江景高空双床房',
    nameEn: 'Qing Ying | High-Altitude Panoramic Twin',
    subtitleZh: '开阔双床大空间 · 宽幅江景视野 · 宁静素雅木质格调',
    subtitleEn: 'Spacious twin layout with expansive water vistas and serene wooden minimalism',
    badgeZh: '宽幅全江景 · 高空双床',
    badgeEn: 'Expansive River Panorama',
    area: '46 ㎡',
    floorZh: '高空 22 层',
    floorEn: 'Floor 22',
    capacity: 2,
    bedInfoZh: '2张舒适单人床 (1.2m × 2.0m)',
    bedInfoEn: '2 Single Beds (1.2m × 2.0m)',
    viewZh: '两江宽阔水域 / 对岸江北嘴现代金融城灯火',
    viewEn: 'Yangtze Expanse & Jiangbeizui CBD Skyline',
    basePrice: 618,
    minFloorPrice: 380,
    coverImage: '/images/retreats/baihong-room-03.jpg',
    gallery: [
      '/images/retreats/baihong-room-03.jpg',
      'https://yojqi.com/wp-content/uploads/2026/05/baihong-hongyadong-view-5.jpg',
      'https://yojqi.com/wp-content/uploads/2026/03/baihong-hongyadong-view.jpg',
    ],
    tagsZh: ['全景视野', '高织床品', '高速Wi-Fi', '原木美学', '静音空调'],
    tagsEn: ['Panoramic Sight', 'High-Thread Linens', 'Fast Wi-Fi', 'Wooden Decor', 'Silent AC'],
    amenitiesZh: [
      '高空 22 层超宽画幅观江落地窗',
      '高品质两张单人床与抗菌鹅绒被芯',
      '原木工夫茶台与专属安神香氛',
    ],
    amenitiesEn: [
      '22nd floor wide-angle riverfront floor-to-ceiling glazing',
      'Dual twin beds with antibacterial goose down duvets',
      'Solid wooden tea table with signature calming incense',
    ],
    droneVantageZh: '极高视点平视夜间空域，尽览对岸大剧院与江北嘴灯光大秀。',
    droneVantageEn: 'High vantage point overlooking river aerials and the Grand Theatre light choreography.',
    directPerksZh: ['官网直订立享 95 折', '专属东方欢迎茶礼', '免费行李寄存'],
    directPerksEn: ['Official 5% Direct Discount', 'Welcome Tea Set', 'Free Luggage Storage'],
    cancellationPolicyZh: '入住前 48 小时可免费取消；48 小时内取消扣除首晚房费。',
    cancellationPolicyEn: 'Free cancellation up to 48 hours prior to check-in. Cancellations within 48 hours incur first night charge.',
    checkInTime: '15:00',
    checkOutTime: '12:00',
  },
  {
    room_key: 'suite_4bed_balcony',
    slug: '4-bedroom-grand-river-suite',
    house_type_id: 191968,
    listing_id: '1714162805-68618636',
    property_ids: [12491346, 12752496, 12777274],
    default_property_id: 12491346,
    nameZh: '华灯起·全景两江交汇四室大阳台套房',
    nameEn: 'Hua Deng Qi | 4-Bedroom Grand River Suite',
    subtitleZh: '整套独门独户 · 4独立居室 · 专属超大观景阳台 · 家庭与亲友包栋尊享',
    subtitleEn: 'Entire private 4-bedroom penthouse suite with oversized balcony for family gatherings',
    badgeZh: '独门整套 · 4室4床 · 大阳台',
    badgeEn: 'Entire 4-Bedroom Sky Penthouse',
    area: '168 ㎡',
    floorZh: '高空 22 层',
    floorEn: 'Floor 22',
    capacity: 8,
    bedInfoZh: '4张大床 (可容纳8位宾客)',
    bedInfoEn: '4 Large Double Beds (Accommodates up to 8 guests)',
    viewZh: '360°环幕两江交汇 / 洪崖洞全景 / 渝中半岛灯海',
    viewEn: '360° Two Rivers Panorama, Hongyadong Roofs, Peninsula Lights',
    basePrice: 1888,
    minFloorPrice: 1100,
    coverImage: 'https://yojqi.com/wp-content/uploads/2026/03/baihong-hongyadong-view.jpg',
    gallery: [
      'https://yojqi.com/wp-content/uploads/2026/03/baihong-hongyadong-view.jpg',
      'https://yojqi.com/wp-content/uploads/2026/05/baihong-hongyadong-view-5.jpg',
      '/images/retreats/baihong-drone-night.jpg',
    ],
    tagsZh: ['独门独户整套', '四室奢居', '家庭首选', '全景大阳台', '独立客餐厅', '独立双卫'],
    tagsEn: ['Entire Penthouse', '4 Bedrooms', 'Family Ideal', 'Grand Balcony', 'Dining Area', 'Dual Baths'],
    amenitiesZh: [
      '整套 168 ㎡ 独门私密格局，4 间独立卧室与宽绰客餐厅',
      '超大高空私享揽江露台，可供全家饮茶观景',
      '双独立干湿分离卫生间，全自动洗衣烘干机',
      '大屏影音投影客厅，配备工夫茶台与全套茶器',
      '厨房配备冰箱、烧水壶、冷热饮水与餐具',
    ],
    amenitiesEn: [
      'Entire 168 ㎡ layout with 4 private bedrooms and spacious living salon',
      'Oversized private high-altitude terrace for whole-family gatherings',
      'Two full bathrooms, washer & dryer appliances',
      'Cinema living room with Kung Fu tea station',
      'Pantry equipped with refrigerator, kettle, and tableware',
    ],
    droneVantageZh: '无人机航线正前方的私人空中头等舱，全家人围坐阳台无遮挡欢聚观礼。',
    droneVantageEn: 'Skybox front-row vantage point right before drone aerial zones; watch without jostling with crowds.',
    directPerksZh: ['官网直订立享 95 折', '尊享全家欢迎茶礼', '免费提前行李寄存', 'VIP 专线管家全程服务'],
    directPerksEn: ['Official 5% Direct Discount', 'Family Welcome Tea Selection', 'Early Luggage Concierge', 'VIP Butler Channel'],
    cancellationPolicyZh: '入住前 72 小时可免费取消；72 小时内取消扣除首晚房费。',
    cancellationPolicyEn: 'Free cancellation up to 72 hours prior to check-in. Cancellations within 72 hours incur first night charge.',
    checkInTime: '15:00',
    checkOutTime: '12:00',
  },
  {
    room_key: 'suite_4bed_family',
    slug: 'skyline-4-bedroom-family-haven',
    house_type_id: 219896,
    listing_id: '1714162806-68618636',
    property_ids: [12497196, 12733837],
    default_property_id: 12497196,
    nameZh: '江画·洪崖洞高空四室家庭套房',
    nameEn: 'Jiang Hua | Skyline 4-Bedroom Family Haven',
    subtitleZh: '整套温馨家庭聚会居所 · 独立四卧与宽敞活动公区',
    subtitleEn: 'Entire 4-bedroom suite designed for peaceful family retreats and shared moments',
    badgeZh: '整套包栋 · 四室温馨',
    badgeEn: 'Entire 4-Bed Family Haven',
    area: '155 ㎡',
    floorZh: '高空 10 层',
    floorEn: 'Floor 10',
    capacity: 8,
    bedInfoZh: '4张大床 (可容纳8位宾客)',
    bedInfoEn: '4 Large Double Beds (Accommodates up to 8 guests)',
    viewZh: '高空城市景观 / 洪崖洞漫步商圈步程',
    viewEn: 'High-Altitude City View, Hongyadong Proximity',
    basePrice: 1688,
    minFloorPrice: 980,
    coverImage: 'https://yojqi.com/wp-content/uploads/2026/05/baihong-hongyadong-view-5.jpg',
    gallery: [
      'https://yojqi.com/wp-content/uploads/2026/05/baihong-hongyadong-view-5.jpg',
      'https://yojqi.com/wp-content/uploads/2026/03/baihong-hongyadong-view.jpg',
    ],
    tagsZh: ['整套聚会', '静谧宜居', '洗衣烘干', '亲子友好', '双卫浴'],
    tagsEn: ['Entire Flat', 'Quiet Living', 'Washer/Dryer', 'Child-Friendly', '2 Bathrooms'],
    amenitiesZh: [
      '整套独享 4 卧格局，动静分区',
      '温馨居家大客厅与家庭圆桌',
      '全自动洗烘一体机与儿童亲子备品',
    ],
    amenitiesEn: [
      '4 private bedrooms with separated activity & quiet zones',
      'Spacious family lounge and dining table',
      'Washer-dryer and child-friendly amenities on request',
    ],
    droneVantageZh: '近邻洪崖洞与解放碑，步行游赏归来后与全家同聚。',
    droneVantageEn: 'Close proximity to Hongyadong, perfect for relaxing after exploring the city.',
    directPerksZh: ['官网直订立享 95 折', '全家出行专属茶礼', '免费行李寄存'],
    directPerksEn: ['Official 5% Direct Discount', 'Family Tea Gift', 'Free Luggage Storage'],
    cancellationPolicyZh: '入住前 72 小时可免费取消；72 小时内取消扣除首晚房费。',
    cancellationPolicyEn: 'Free cancellation up to 72 hours prior to check-in. Cancellations within 72 hours incur first night charge.',
    checkInTime: '15:00',
    checkOutTime: '12:00',
  },
  {
    room_key: 'suite_2bed_duo',
    slug: 'river-view-2-bedroom-suite',
    house_type_id: 21553,
    listing_id: '642948137-47013688',
    property_ids: [12381301, 11503729],
    default_property_id: 12381301,
    nameZh: '雪泥·两江汇两室一厅观景套房',
    nameEn: 'Xue Ni | 2-Bedroom River View Suite',
    subtitleZh: '两卧一厅两卫 · 独立观景客厅 · 小家庭与闺蜜品质私享',
    subtitleEn: '2-bedroom, 1-living room suite with dedicated scenic lounge, ideal for small families',
    badgeZh: '两卧一厅 · 独立双卫',
    badgeEn: '2 Bedrooms · 2 Baths Suite',
    area: '88 ㎡',
    floorZh: '高空 4 层',
    floorEn: 'Floor 4',
    capacity: 4,
    bedInfoZh: '2张大床 (可容纳4位宾客)',
    bedInfoEn: '2 Large Double Beds (Accommodates up to 4 guests)',
    viewZh: '江景与城市绿意交融',
    viewEn: 'River Vista and Urban Greenery',
    basePrice: 988,
    minFloorPrice: 580,
    coverImage: '/images/retreats/baihong-room-03.jpg',
    gallery: [
      '/images/retreats/baihong-room-03.jpg',
      '/images/retreats/baihong-room-01.jpg',
      'https://yojqi.com/wp-content/uploads/2026/03/baihong-hongyadong-view.jpg',
    ],
    tagsZh: ['两室一厅', '双卫浴', '客厅茶歇', '舒适居停', '家庭小聚'],
    tagsEn: ['2 Beds 1 Living', 'Dual Baths', 'Tea Lounge', 'Cozy Stay', 'Family Suite'],
    amenitiesZh: [
      '独立两卧一厅两卫格局，互不打扰',
      '实木茶台、两套洗漱卫浴与洗衣机',
      '静音中央空调与柔和暖光设计',
    ],
    amenitiesEn: [
      '2 private bedrooms with dedicated central lounge & 2 bathrooms',
      'Solid wooden tea table and in-suite washing machine',
      'Silent climate control and warm ambient lighting',
    ],
    droneVantageZh: '舒适静卧观赏两江流光，漫步数分钟即达滨江岸线。',
    droneVantageEn: 'Tranquil perspective over the water, short walk to river promenade.',
    directPerksZh: ['官网直订立享 95 折', '专属迎宾茶礼', '免费行李寄存'],
    directPerksEn: ['Official 5% Direct Discount', 'Welcome Tea Set', 'Free Luggage Storage'],
    cancellationPolicyZh: '入住前 48 小时可免费取消；48 小时内取消扣除首晚房费。',
    cancellationPolicyEn: 'Free cancellation up to 48 hours prior to check-in. Cancellations within 48 hours incur first night charge.',
    checkInTime: '15:00',
    checkOutTime: '12:00',
  },
];

export function getRoomCatalog(): RetreatRoomType[] {
  return RETREAT_ROOM_CATALOG;
}

export function getRoomBySlug(slug: string): RetreatRoomType | undefined {
  return RETREAT_ROOM_CATALOG.find((r) => r.slug === slug || r.room_key === slug);
}

export function getRoomByKey(roomKey: string): RetreatRoomType | undefined {
  return RETREAT_ROOM_CATALOG.find((r) => r.room_key === roomKey);
}
