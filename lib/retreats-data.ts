export interface SanctuaryProperty {
  id: string;
  slug: string;
  nameEn: string;
  nameZh: string;
  subtitleEn: string;
  subtitleZh: string;
  badgeEn: string;
  badgeZh: string;
  locationEn: string;
  locationZh: string;
  heroImage: string;
  gallery: string[];
  droneShowFeatureEn: string;
  droneShowFeatureZh: string;
  descriptionEn: string;
  descriptionZh: string;
  amenitiesEn: string[];
  amenitiesZh: string[];
  roomSpecsEn: {
    area: string;
    capacity: string;
    bedType: string;
    view: string;
  };
  roomSpecsZh: {
    area: string;
    capacity: string;
    bedType: string;
    view: string;
  };
  hostConcierge: {
    whatsapp: string;
    wechat: string;
    phone: string;
    email: string;
    noteEn: string;
    noteZh: string;
  };
}

export const SANCTUARY_PROPERTIES: SanctuaryProperty[] = [
  {
    id: "prop-baihong-drone-view",
    slug: "baihong-drone-show-apartment",
    nameEn: "Baihong Drone Show Riverview Apartment",
    nameZh: "白宏无人机机位江景公寓",
    subtitleEn: "Private Balcony Over the Two Rivers Confluence — The Ultimate Crowd-Free Drone Show Viewing Sanctuary",
    subtitleZh: "坐拥长江与嘉陵江两江交汇浩瀚全景 — 告别十万人流拥挤，私享无人机天幕盛典",
    badgeEn: "Front-Row Drone View Point",
    badgeZh: "两江无人机绝佳观礼位",
    locationEn: "High-floor Riverfront Tower, Yuzhong Peninsula / Nanbin Riverline, Chongqing",
    locationZh: "中国·重庆·南滨江岸一线高层揽江邸",
    heroImage: "/images/retreats/baihong-drone-night.jpg",
    gallery: [
      "/images/retreats/baihong-drone-night.jpg",
      "/images/retreats/baihong-room-01.jpg",
      "/images/retreats/baihong-room-02.jpg",
      "/images/retreats/baihong-room-03.jpg",
    ],
    droneShowFeatureEn: "Direct, unobstructed visual line directly facing the Chongqing official holiday & weekend aerial drone formations over Chaotianmen. Watch thousands of illuminated drones dance across the night sky with a glass of tea from your private balcony, completely insulated from the 50,000+ tourist street gridlock below.",
    droneShowFeatureZh: "正对朝天门两江交汇处官方节日与周末无人机天幕编队起降主空域。无需在江边和桥头与数万游人推挤抢位，端起茶盏倚栏而立，即可将千架无人机灯光矩阵与赛博洪崖洞、来福士水幕夜景尽收眼底。",
    descriptionEn: "Conceived as an urban restorative sanctuary, the Baihong Drone Show Apartment blends panoramic river architecture with meditative tranquility. Equipped with high-performance double acoustic glazing, custom unbleached linen bedding, a solid walnut Kung Fu tea tasting table with aged Pu'er, and a complimentary YOJQI Ruihe Sleep Somatic Kit to ensure profound rest after your exploration of the mountain city.",
    descriptionZh: "专为寻求从容质感的深度旅人打造的江景疗愈居所。公寓将大尺度两江视觉与东方清静意境融为一体。全屋配置高密隔音中空玻璃、天然水洗亚麻床品、整板实木工夫茶席与陈年普洱，并尊享赠送 YOJQI 瑞鹤随身安睡香囊礼包，抚平山城长途跋涉的肌肉酸胀与身心疲惫。",
    amenitiesEn: [
      "Private High-Floor Terrace with Panoramic Drone Observation Angle",
      "Professional Tripod & Camera Clamps for Night Aerial Photography",
      "Traditional Kung Fu Tea Tasting Station (Premium Aged Tuocha & Spring Water)",
      "High-Grade Soundproofing & Custom Acoustic Insulation",
      "YOJQI Somatic Incense Diffuser & Evening Herbal Anchor Gift",
      "Dedicated Private Host Concierge & Local Culinary Itinerary Access"
    ],
    amenitiesZh: [
      "高层全景露台，正对无人机编队核心观礼视线",
      "配备专业摄影三脚架与夜景相机固定云台",
      "全套工夫茶席（精选老沱茶与甘冽泡茶山泉）",
      "多层降噪静音中空落地窗，隔绝闹市喧嚣",
      "YOJQI 经典沉香雾化扩香与客房专属安眠香丸礼",
      "专属管家全程一对一接引与本地老餮非遗私房路线推荐"
    ],
    roomSpecsEn: {
      area: "88 m² (947 sq ft)",
      capacity: "2 - 4 Guests",
      bedType: "1 King Bed + 1 Premium Tatami Sofa Bed",
      view: "270° Unobstructed Two-Rivers Confluence & Skyline"
    },
    roomSpecsZh: {
      area: "88 平方米",
      capacity: "宜居 2 - 4 位宾客",
      bedType: "1.8米云感大床 + 宽厚日式榻榻米茶榻",
      view: "270° 两江交汇水景与天际线无人机机位"
    },
    hostConcierge: {
      whatsapp: "+86 138 0000 0000",
      wechat: "YOJQI_Sanctuary_VIP",
      phone: "+86 138 0000 0000",
      email: "concierge@yojqi.com",
      noteEn: "Direct booking inquiries receive guaranteed drone show schedule coordination, personalized high-speed train/airport pickup assistance, and early luggage drop-off.",
      noteZh: "私享预约专享：提前同步无人机官方起降时段预告、专人到站接引指引与无忧行李提前寄存礼遇。"
    }
  },
  {
    id: "prop-yojqi-drone-art",
    slug: "yojqi-drone-show-apartment",
    nameEn: "YOJQI Drone Show Art Sanctuary",
    nameZh: "YOJQI 无人机机位艺术宿集",
    subtitleEn: "Zen Aesthetic Sky Residence Above the River Mist — Where Drone Light Choreography Meets Quiet Somatic Rituals",
    subtitleZh: "浮于江雾之上的东方禅意高空美学住居 — 当天幕无人机光影与东方静心仪式相逢",
    badgeEn: "Artistic Sky Sanctuary",
    badgeZh: "高空美学艺术宿集",
    locationEn: "Central Skyline Tower Overlooking Jialing Bridge & River Confluence, Chongqing",
    locationZh: "中国·重庆·渝中半岛瞰江之巅核心观景高庭",
    heroImage: "/images/retreats/yojqi-sanctuary-01.jpg",
    gallery: [
      "/images/retreats/yojqi-sanctuary-01.jpg",
      "/images/retreats/yojqi-sanctuary-02.jpg",
      "/images/retreats/yojqi-sanctuary-03.jpg",
      "/images/retreats/baihong-drone-night.jpg",
    ],
    droneShowFeatureEn: "Positioned at an elevated sky angle that captures the full dimensional depth of the drone show against the glowing silhouette of the mountain skyline. Ideal for photographers, creators, and couples seeking unforgettable nocturnal memories.",
    droneShowFeatureZh: "位于极具纵深感的山城空中立体视界。无人机在夜幕中幻化为凤凰、山城画卷与未来光阵时，与脚下蜿蜒长江与跨江大桥的长曝光车流交相辉映，是影像创作者与知己情侣的绝佳梦幻定格点。",
    descriptionEn: "The flagship lifestyle manifestation of the YOJQI philosophy in Chongqing. Designed with tactile micro-cement, natural washi paper lighting, raw timber beams, and a dedicated singing bowl meditation corner. Guests enjoy an integrated somatic experience combining bespoke incense rituals, herbal foot soaking tubs with Tibetan saffron, and front-row seats to the sky spectacle.",
    descriptionZh: "YOJQI 东方身心哲学在山城重庆的实体空间表达。全屋采用质感微水泥、日式障子和纸暖光、粗砺原木横梁与手工铜质颂钵冥想角。入住宾客尊享定制草本足浴包（含天然藏红花与艾草）、沉浸式合香手作体验与正对漫天光影的专属头等舱视角。",
    amenitiesEn: [
      "Panoramic Sky Balcony with Custom Cushioned Daybed for Drone Show Viewing",
      "Handcrafted Singing Bowl & Somatic Sound Bath Corner",
      "Organic Saffron & Mugwort Evening Foot Soaking Tub Kit",
      "High-End Projector & Cinema Screen for Midnight Film Wind-Down",
      "Full YOJQI Aromatherapy Collection on Display for Guided Olfactory Exploration",
      "24-Hour VIP WeChat / WhatsApp Concierge Service"
    ],
    amenitiesZh: [
      "全景空中阳台，配定制软榻与羊毛毯，沉浸式仰望天幕秀",
      "手造尼泊尔满月颂钵与身心声音疗愈角",
      "睡前定制古法藏红花艾草暖足木桶套装",
      "极米 4K 超清巨幕影音投影，晚风中静享艺术老电影",
      "全套 YOJQI 草本香丸与扩香仪开放体验与调香体验",
      "24小时中英双语私享管家微信/WhatsApp全时响应"
    ],
    roomSpecsEn: {
      area: "105 m² (1,130 sq ft)",
      capacity: "2 - 5 Guests",
      bedType: "2 Queen Beds (Organic Latex Mattresses)",
      view: "Mountain City River Skyline & Official Drone Formation Skyway"
    },
    roomSpecsZh: {
      area: "105 平方米",
      capacity: "宜居 2 - 5 位宾客",
      bedType: "2张 1.5米有机乳胶大床",
      view: "魔幻山城两江夜景与无人机编队专属空域"
    },
    hostConcierge: {
      whatsapp: "+86 138 0000 0000",
      wechat: "YOJQI_Sanctuary_VIP",
      phone: "+86 138 0000 0000",
      email: "concierge@yojqi.com",
      noteEn: "Includes priority reservation rights, complimentary evening herbal tea service, and curated maps of secret local tea houses in Old Chongqing.",
      noteZh: "专属权益包含：无人机观礼日前瞻锁位保障、晚间特调汉方安神晚茶，以及管家手绘《老重庆隐秘茶馆与老巷寻真》私家地图。"
    }
  }
];

export function getSanctuaryBySlug(slug: string): SanctuaryProperty | undefined {
  return SANCTUARY_PROPERTIES.find(p => p.slug === slug);
}
