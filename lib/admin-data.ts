export type AdminPermission =
  | 'orders:view'
  | 'orders:manage'
  | 'inquiries:view'
  | 'inquiries:manage'
  | 'analytics:view'
  | 'users:manage'; // Super Admin only

export type AdminRole = 'super_admin' | 'orders_admin' | 'concierge_admin' | 'analyst_admin' | 'custom';

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  email: string;
  password?: string; // Mock demo auth hash
  role: AdminRole;
  roleNameZh: string;
  roleNameEn: string;
  permissions: AdminPermission[];
  status: 'active' | 'disabled';
  createdAt: string;
  lastLoginAt?: string;
}

export type OrderStatus = 'unpaid' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type CourierCarrier = 'sf_express' | 'dhl' | 'fedex' | 'ems' | 'ups' | 'other';

export interface OrderItem {
  id: string;
  productSlug: string;
  nameZh: string;
  nameEn: string;
  price: number;
  quantity: number;
  heroImage: string;
}

export interface ShippingAddress {
  recipientName: string;
  phone: string;
  country: string;
  provinceState: string;
  city: string;
  addressLine1: string;
  postalCode: string;
}

export interface TrackingEvent {
  time: string;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  location?: string;
}

export interface OrderRecord {
  id: string;
  orderNumber: string; // e.g. YQ-20260927-8848
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  currency: string;
  amountTotal: number;
  items: OrderItem[];
  paymentStatus: 'paid' | 'pending' | 'refunded';
  orderStatus: OrderStatus;
  shippingAddress: ShippingAddress;
  carrier?: CourierCarrier;
  carrierNameZh?: string;
  carrierNameEn?: string;
  trackingNumber?: string;
  trackingEvents?: TrackingEvent[];
  createdAt: string;
  updatedAt: string;
  shippedAt?: string;
  deliveredAt?: string;
  adminNotes?: string;
}

export interface CustomerInquiryRecord {
  id: string;
  guestName: string;
  contactChannel: 'wechat' | 'whatsapp' | 'phone' | 'email';
  contactValue: string;
  suiteNameZh: string;
  suiteNameEn: string;
  checkInDate?: string;
  checkOutDate?: string;
  guestsCount: string;
  specialRequests?: string;
  status: 'pending' | 'contacted' | 'reserved' | 'closed';
  lang: 'zh' | 'en';
  createdAt: string;
  staffNotes?: string;
}

export interface TrafficSourceMetric {
  source: string;
  sourceZh: string;
  visitors: number;
  percentage: number;
  change: string;
}

export interface GeoLocationMetric {
  country: string;
  countryZh: string;
  city: string;
  cityZh: string;
  visitors: number;
  percentage: number;
}

export interface PageViewMetric {
  path: string;
  titleZh: string;
  titleEn: string;
  views: number;
  avgDuration: string;
}

export interface DailyTrafficTrend {
  date: string;
  pv: number;
  uv: number;
  inquiries: number;
  orders: number;
}

export interface AnalyticsSummary {
  totalPageViews: number;
  totalUniqueVisitors: number;
  todayPageViews: number;
  todayUniqueVisitors: number;
  avgTimeOnSite: string;
  conversionRate: string;
  dailyTrends: DailyTrafficTrend[];
  sources: TrafficSourceMetric[];
  geoDistribution: GeoLocationMetric[];
  topPages: PageViewMetric[];
  deviceBreakdown: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
}

// -----------------------------------------------------------------------------
// Seed Data: Admin Users (Super Admin + Role-based Sub Admins)
// -----------------------------------------------------------------------------
export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'admin-super-01',
    username: 'superadmin',
    name: 'YOJQI 主理人 (Super Admin)',
    email: 'master@yojqi.com',
    password: 'superadmin2026',
    role: 'super_admin',
    roleNameZh: '第一级 · 超级管理员 (全权限)',
    roleNameEn: 'Level 1 · Super Administrator',
    permissions: ['orders:view', 'orders:manage', 'inquiries:view', 'inquiries:manage', 'analytics:view', 'users:manage'],
    status: 'active',
    createdAt: '2026-09-01 10:00:00',
    lastLoginAt: '2026-09-27 14:30:00',
  },
  {
    id: 'admin-logistics-02',
    username: 'fulfillment_staff',
    name: '仓储发货主管 (Shipping Admin)',
    email: 'shipping@yojqi.com',
    password: 'shipping2026',
    role: 'orders_admin',
    roleNameZh: '第二级 · 订单与发货专管员',
    roleNameEn: 'Level 2 · Logistics & Order Admin',
    permissions: ['orders:view', 'orders:manage'],
    status: 'active',
    createdAt: '2026-09-10 11:20:00',
    lastLoginAt: '2026-09-27 10:15:00',
  },
  {
    id: 'admin-concierge-03',
    username: 'concierge_staff',
    name: '重庆宿集管家团队 (Concierge Admin)',
    email: 'concierge@yojqi.com',
    password: 'concierge2026',
    role: 'concierge_admin',
    roleNameZh: '第二级 · 客服与宿集预约专管员',
    roleNameEn: 'Level 2 · Customer Care & Concierge',
    permissions: ['inquiries:view', 'inquiries:manage'],
    status: 'active',
    createdAt: '2026-09-12 14:00:00',
    lastLoginAt: '2026-09-27 12:45:00',
  },
];

// -----------------------------------------------------------------------------
// Seed Data: Orders with Tracking Details
// -----------------------------------------------------------------------------
export const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: 'ord-884801',
    orderNumber: 'YQ-20260927-8848',
    customerEmail: 'alexander.vance@london-architects.co.uk',
    customerName: 'Alexander Vance',
    customerPhone: '+44 7700 900123',
    currency: 'USD',
    amountTotal: 89.80,
    items: [
      {
        id: 'item-1',
        productSlug: 'wrist-anchor-ambergris-ease-bracelet',
        nameZh: '腕间锚点 — 龙涎舒缓定心手绳',
        nameEn: 'Wrist Anchor — Ambergris Ease Bracelet',
        price: 39.90,
        quantity: 1,
        heroImage: '/images/products/ambergris-bracelet.png',
      },
      {
        id: 'item-2',
        productSlug: 'the-tai-sui-protection-talisman-grand-duke-jupiter',
        nameZh: '化太岁平安护体符 · 顺遂安康',
        nameEn: 'The Tai Sui Protection Talisman',
        price: 49.90,
        quantity: 1,
        heroImage: '/images/talismans/yojqi-the-tai-sui-protection-talisman-grand-duke-jupiter-main-20260530.png',
      },
    ],
    paymentStatus: 'paid',
    orderStatus: 'shipped',
    shippingAddress: {
      recipientName: 'Alexander Vance',
      phone: '+44 7700 900123',
      country: 'United Kingdom',
      provinceState: 'Greater London',
      city: 'London',
      addressLine1: '42 Kensington High Street, Suite 8B',
      postalCode: 'W8 4PT',
    },
    carrier: 'sf_express',
    carrierNameZh: '顺丰国际特惠专线',
    carrierNameEn: 'SF International Express',
    trackingNumber: 'SF198302918848',
    createdAt: '2026-09-25 15:20:00',
    updatedAt: '2026-09-26 18:30:00',
    shippedAt: '2026-09-26 14:00:00',
    adminNotes: '已由道门法师开光加盖三清印，随附纯棉束口袋包装。',
    trackingEvents: [
      {
        time: '2026-09-27 08:30',
        titleZh: '快件到达伦敦希思罗国际分拨中心',
        titleEn: 'Arrived at London Heathrow International Hub',
        descriptionZh: '正在完成海关清关与末端派送转运',
        descriptionEn: 'Customs cleared, transferred for final local dispatch',
        location: 'London, UK',
      },
      {
        time: '2026-09-26 22:15',
        titleZh: '国际干线航班已起飞',
        titleEn: 'International flight departed',
        descriptionZh: '由上海浦东国际机场直飞英国伦敦',
        descriptionEn: 'Flight departed from Shanghai PVG to London LHR',
        location: 'Shanghai PVG',
      },
      {
        time: '2026-09-26 14:00',
        titleZh: '顺丰国际已揽收完成',
        titleEn: 'Picked up by SF International Express',
        descriptionZh: '包裹已出库并完成安全塑封',
        descriptionEn: 'Parcel dispatched from YOJQI Sanctuary Logistics Center',
        location: 'Chongqing Hub',
      },
      {
        time: '2026-09-25 16:30',
        titleZh: '道门坛前开光完成，朱砂封符装盒',
        titleEn: 'Consecration completed, packaged in ritual box',
        descriptionZh: '法师完成诵经加盖道印，香丸灌注天然精油核心',
        descriptionEn: 'Master sealed the talisman with authentic vermilion seal',
        location: 'YOJQI Ritual Lab',
      },
      {
        time: '2026-09-25 15:20',
        titleZh: '订单已支付成功',
        titleEn: 'Order placed & payment confirmed',
        descriptionZh: 'Stripe 国际安全网关结算成功',
        descriptionEn: 'Payment verified via Stripe Global Checkout',
      },
    ],
  },
  {
    id: 'ord-884802',
    orderNumber: 'YQ-20260927-6612',
    customerEmail: 'marcus.tan@singapore-ventures.sg',
    customerName: 'Marcus Tan',
    customerPhone: '+65 9123 4567',
    currency: 'USD',
    amountTotal: 108.00,
    items: [
      {
        id: 'item-3',
        productSlug: 'sanctuary-trio-gift-box',
        nameZh: 'YOJQI 全境三态身心定心典藏礼盒',
        nameEn: 'The Complete Somatic Ritual Trilogy Box',
        price: 108.00,
        quantity: 1,
        heroImage: '/images/products/osmanthus-pendant.png',
      },
    ],
    paymentStatus: 'paid',
    orderStatus: 'processing',
    shippingAddress: {
      recipientName: 'Marcus Tan',
      phone: '+65 9123 4567',
      country: 'Singapore',
      provinceState: 'Singapore',
      city: 'Singapore',
      addressLine1: '8 Marina Boulevard, Marina Bay Financial Centre Tower 1',
      postalCode: '018981',
    },
    carrier: 'dhl',
    carrierNameZh: 'DHL 航空国际特快',
    carrierNameEn: 'DHL Express Worldwide',
    trackingNumber: 'DHL9283746102',
    createdAt: '2026-09-27 09:15:00',
    updatedAt: '2026-09-27 11:00:00',
    adminNotes: '客户备注需要附赠手写心意卡，已安排质检打包。',
    trackingEvents: [
      {
        time: '2026-09-27 11:00',
        titleZh: '质检装箱完成，等待国际快递取件',
        titleEn: 'Quality inspected & boxed, awaiting courier pickup',
        descriptionZh: '胡桃木礼盒已装入防震恒温外箱',
        descriptionEn: 'Handcrafted timber box secured in thermal protective packaging',
        location: 'Chongqing Sanctuary Hub',
      },
      {
        time: '2026-09-27 09:15',
        titleZh: '订单已支付成功',
        titleEn: 'Order placed & payment confirmed',
        descriptionZh: 'Stripe 国际结算完成',
        descriptionEn: 'Payment verified successfully',
      },
    ],
  },
  {
    id: 'ord-884803',
    orderNumber: 'YQ-20260927-3198',
    customerEmail: 'chen.wei@lujiazui-cap.com',
    customerName: '陈伟 (Chen Wei)',
    customerPhone: '13812345678',
    currency: 'CNY',
    amountTotal: 651.00,
    items: [
      {
        id: 'item-4',
        productSlug: 'the-marshal-zhao-military-wealth-talisman',
        nameZh: '赵公明武财神招财聚宝符 · 广聚正偏财',
        nameEn: 'The Marshal Zhao Military Wealth Talisman',
        price: 49.90,
        quantity: 1,
        heroImage: '/images/talismans/yojqi-the-marshal-zhao-military-wealth-talisman-main-20260530.png',
      },
      {
        id: 'item-5',
        productSlug: 'wrist-anchor-kinetic-energy-bracelet',
        nameZh: '腕间锚点 — 动能护持专注手绳',
        nameEn: 'Wrist Anchor — Kinetic Energy Bracelet',
        price: 39.90,
        quantity: 1,
        heroImage: '/images/products/kinetic-bracelet.png',
      },
    ],
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    shippingAddress: {
      recipientName: '陈伟',
      phone: '13812345678',
      country: '中国 (China)',
      provinceState: '上海市',
      city: '上海市',
      addressLine1: '浦东新区陆家嘴环路1000号恒生银行大厦28楼',
      postalCode: '200120',
    },
    carrier: 'sf_express',
    carrierNameZh: '顺丰特快 (次日达)',
    carrierNameEn: 'SF Express Next Day',
    trackingNumber: 'SF319847291038',
    createdAt: '2026-09-24 10:00:00',
    updatedAt: '2026-09-25 14:20:00',
    shippedAt: '2026-09-24 16:30:00',
    deliveredAt: '2026-09-25 14:20:00',
    adminNotes: '客户电话确认已收到，反馈朱砂品相极佳。',
    trackingEvents: [
      {
        time: '2026-09-25 14:20',
        titleZh: '快件已送达签收',
        titleEn: 'Package delivered & signed',
        descriptionZh: '前台代签收，客户已亲自查验',
        descriptionEn: 'Delivered to recipient address',
        location: '上海市浦东新区',
      },
      {
        time: '2026-09-24 16:30',
        titleZh: '顺丰特快已发货',
        titleEn: 'Dispatched via SF Express',
        descriptionZh: '已从重庆仓航空件发出',
        descriptionEn: 'Departed via air freight',
        location: 'Chongqing Hub',
      },
      {
        time: '2026-09-24 10:00',
        titleZh: '订单已支付成功',
        titleEn: 'Order placed & confirmed',
        descriptionZh: '支付成功，进入发货流程',
        descriptionEn: 'Order confirmed',
      },
    ],
  },
];

// -----------------------------------------------------------------------------
// Seed Data: Inquiries (Sanctuary VIP Leads)
// -----------------------------------------------------------------------------
export const INITIAL_INQUIRIES: CustomerInquiryRecord[] = [
  {
    id: 'inq-01',
    guestName: '林小姐 (Ms. Lin)',
    contactChannel: 'wechat',
    contactValue: 'lin_shanghai_art',
    suiteNameZh: '白宏·两江全景无人机天幕套房 (270°江景露台)',
    suiteNameEn: 'Baihong Full Riverfront Suite (270° Drone Balcony)',
    checkInDate: '2026-10-01',
    checkOutDate: '2026-10-03',
    guestsCount: '2 位',
    specialRequests: '国庆期间希望安排带三角架的最佳摄影阳台机位，需要准备双份高山白茶。',
    status: 'reserved',
    lang: 'zh',
    createdAt: '2026-09-26 21:05:00',
    staffNotes: '管家微信已添加，已预留38层正对朝天门天幕机位，定金已收。',
  },
  {
    id: 'inq-02',
    guestName: 'David H. Sterling',
    contactChannel: 'whatsapp',
    contactValue: '+1 415 890 2341',
    suiteNameZh: '两江汇流顶层 VIP 尊享套房 (私享夜景天幕首排)',
    suiteNameEn: 'Two-Rivers VIP Master Suite (Top-Floor Front Row)',
    checkInDate: '2026-10-05',
    checkOutDate: '2026-10-07',
    guestsCount: '2 位',
    specialRequests: 'Traveling from San Francisco for drone photography. Need English-speaking resident concierge and airport pickup.',
    status: 'contacted',
    lang: 'en',
    createdAt: '2026-09-27 08:40:00',
    staffNotes: 'WhatsApp contact established, sent suite drone show video sample, awaiting flight confirmation.',
  },
  {
    id: 'inq-03',
    guestName: '张总 (Mr. Zhang)',
    contactChannel: 'phone',
    contactValue: '13900112233',
    suiteNameZh: 'YOJQI·静谧高空江景套房 (云端茶席+沉香居停)',
    suiteNameEn: 'YOJQI Serenity High-Rise Suite (Cloud Tea & Scent Sanctuary)',
    checkInDate: '2026-10-02',
    checkOutDate: '2026-10-04',
    guestsCount: '4 位',
    specialRequests: '全家度假，需要加备古法藏红花泡脚桶和儿童防滑用具。',
    status: 'pending',
    lang: 'zh',
    createdAt: '2026-09-27 14:10:00',
    staffNotes: '待值班管家电话联系确认房型连通情况。',
  },
];

// -----------------------------------------------------------------------------
// Seed Data: Site Traffic & Visitor Analytics
// -----------------------------------------------------------------------------
export const INITIAL_ANALYTICS: AnalyticsSummary = {
  totalPageViews: 48920,
  totalUniqueVisitors: 16450,
  todayPageViews: 2480,
  todayUniqueVisitors: 890,
  avgTimeOnSite: '3m 42s',
  conversionRate: '4.82%',
  dailyTrends: [
    { date: '09-21', pv: 2840, uv: 980, inquiries: 4, orders: 12 },
    { date: '09-22', pv: 3120, uv: 1100, inquiries: 6, orders: 15 },
    { date: '09-23', pv: 3450, uv: 1230, inquiries: 5, orders: 18 },
    { date: '09-24', pv: 3980, uv: 1420, inquiries: 8, orders: 22 },
    { date: '09-25', pv: 4650, uv: 1680, inquiries: 11, orders: 28 },
    { date: '09-26', pv: 5820, uv: 2150, inquiries: 16, orders: 35 },
    { date: '09-27', pv: 6240, uv: 2340, inquiries: 19, orders: 41 },
  ],
  sources: [
    { source: 'Google Organic / Search', sourceZh: '谷歌自然搜索', visitors: 6250, percentage: 38.0, change: '+18.4%' },
    { source: 'Direct / Bookmark', sourceZh: '直接输入 / 书签访问', visitors: 3950, percentage: 24.0, change: '+12.1%' },
    { source: 'Xiaohongshu / RED', sourceZh: '小红书种草引流', visitors: 2800, percentage: 17.0, change: '+45.2%' },
    { source: 'Instagram / TikTok', sourceZh: '海外社媒 (IG/TikTok)', visitors: 2140, percentage: 13.0, change: '+22.8%' },
    { source: 'AI Engine (Perplexity/ChatGPT)', sourceZh: 'AI 搜索引擎引用 (GEO)', visitors: 1310, percentage: 8.0, change: '+85.6%' },
  ],
  geoDistribution: [
    { country: 'China', countryZh: '中国', city: 'Shanghai / Beijing / Shenzhen', cityZh: '上海 / 北京 / 深圳 / 重庆', visitors: 7890, percentage: 48.0 },
    { country: 'United States', countryZh: '美国', city: 'San Francisco / New York / LA', cityZh: '旧金山 / 纽约 / 洛杉矶', visitors: 3450, percentage: 21.0 },
    { country: 'United Kingdom', countryZh: '英国', city: 'London / Manchester', cityZh: '伦敦 / 曼彻斯特', visitors: 1970, percentage: 12.0 },
    { country: 'Singapore', countryZh: '新加坡', city: 'Singapore', cityZh: '新加坡', visitors: 1640, percentage: 10.0 },
    { country: 'Canada', countryZh: '加拿大', city: 'Vancouver / Toronto', cityZh: '温哥华 / 多伦多', visitors: 1500, percentage: 9.0 },
  ],
  topPages: [
    { path: '/shop', titleZh: '选品商城', titleEn: 'Shop', views: 14200, avgDuration: '2m 18s' },
    { path: '/talismans', titleZh: '道家符咒专区', titleEn: 'Taoist Talismans', views: 12850, avgDuration: '3m 45s' },
    { path: '/retreats', titleZh: '重庆高空无人机宿集', titleEn: 'Chongqing Drone Show Sanctuaries', views: 11400, avgDuration: '4m 12s' },
    { path: '/product/wrist-anchor-ambergris-ease-bracelet', titleZh: '龙涎舒缓手绳', titleEn: 'Ambergris Ease Bracelet', views: 8900, avgDuration: '2m 55s' },
    { path: '/product/the-tai-sui-protection-talisman-grand-duke-jupiter', titleZh: '化太岁平安符', titleEn: 'Tai Sui Protection Talisman', views: 7800, avgDuration: '3m 20s' },
    { path: '/wisdom/chongqing-drone-show-best-viewpoint-without-crowds', titleZh: '重庆无人机观礼攻略', titleEn: 'Chongqing Drone Show Guide', views: 6500, avgDuration: '4m 30s' },
  ],
  deviceBreakdown: {
    mobile: 64.2,
    desktop: 31.5,
    tablet: 4.3,
  },
};
