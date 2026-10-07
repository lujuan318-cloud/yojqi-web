/**
 * Hostex OpenAPI v3 Direct Integration Client for YOJQI Direct Booking Channel
 * 
 * Provides:
 * 1. Real-time listing calendar & inventory queries (POST /listings/calendar)
 * 2. Real-time reservation queries (GET /reservations)
 * 3. Direct booking ingestion with OTA auto-lock (POST /reservations with custom_channel_id=29)
 * 4. WeCom operations instant push notification
 * 5. OpenAI / OpenRouter bilingual concierge integration
 */

const HOSTEX_API_ROOT = process.env.HOSTEX_API_ROOT || 'https://api.hostex.io/v3';
const HOSTEX_TOKEN = process.env.HOSTEX_ACCESS_TOKEN || '';
const WECOM_WEBHOOK_URL = process.env.WECOM_WEBHOOK_URL || '';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL || 'https://openrouter.ai/api/v1';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'openai/gpt-4.1-mini';

export interface CalendarDay {
  date: string;
  price: number;
  inventory: number;
  restrictions?: {
    min_advance_reservation?: string;
    max_advance_reservation?: string;
    min_stay_through?: number;
    max_stay_through?: number;
    min_stay_on_arrival?: number;
    max_stay_on_arrival?: number;
    exact_stay_on_arrival?: number;
    closed_on_arrival?: boolean;
    closed_on_departure?: boolean;
  };
}

export interface DirectBookingPayload {
  property_id: number;
  room_key: string;
  room_name_cn: string;
  room_name_en: string;
  check_in_date: string;
  check_out_date: string;
  guest_name: string;
  guest_phone: string;
  guest_email: string;
  number_of_guests?: number;
  total_amount: number;
  currency?: string;
  special_requests?: string;
  estimated_arrival_time?: string;
  stripe_session_id?: string;
}

export interface ReservationResult {
  success: boolean;
  reservation_code?: string;
  stay_code?: string;
  property_id?: number;
  error_msg?: string;
  raw?: any;
}

/**
 * Common request helper with Hostex-Access-Token header
 */
async function hostexRequest(path: string, options: RequestInit = {}): Promise<any> {
  const url = `${HOSTEX_API_ROOT}${path}`;
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Hostex-Access-Token': HOSTEX_TOKEN,
    'User-Agent': 'YOJQI-Direct-Engine/1.0',
    ...(options.headers || {}),
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers,
      cache: 'no-store',
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`[Hostex API Error] ${path} returned status ${res.status}:`, errText);
      throw new Error(`Hostex API ${res.status}: ${errText}`);
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error(`[Hostex Request Failed] ${path}:`, error.message);
    throw error;
  }
}

/**
 * Query real-time calendar and availability for a listing
 */
export async function queryListingCalendar(
  listingId: string,
  channelType: string = 'booking.com',
  startDate: string,
  endDate: string
): Promise<CalendarDay[]> {
  try {
    const payload = {
      start_date: startDate,
      end_date: endDate,
      listings: [
        {
          listing_id: listingId,
          channel_type: channelType,
        },
      ],
    };

    const resp = await hostexRequest('/listings/calendar', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const listings = resp?.data?.listings || [];
    if (listings.length > 0 && Array.isArray(listings[0]?.calendar)) {
      return listings[0].calendar as CalendarDay[];
    }
    return [];
  } catch (err) {
    console.warn(`[queryListingCalendar] Failed to fetch calendar for ${listingId}, fallback:`, err);
    return [];
  }
}

/**
 * Query reservations for specific date range to determine occupied properties
 */
export async function queryActiveReservations(
  startDate: string,
  endDate: string
): Promise<Array<{ property_id: number; check_in_date: string; check_out_date: string; status: string }>> {
  try {
    const query = new URLSearchParams({
      start_date: startDate,
      end_date: endDate,
      limit: '100',
    });
    const resp = await hostexRequest(`/reservations?${query.toString()}`, {
      method: 'GET',
    });
    const list = resp?.data?.reservations || [];
    return list.map((r: any) => ({
      property_id: r.property_id,
      check_in_date: r.check_in_date,
      check_out_date: r.check_out_date,
      status: r.status,
    }));
  } catch (err) {
    console.warn('[queryActiveReservations] Failed, fallback to empty:', err);
    return [];
  }
}

/**
 * Create confirmed reservation directly in Hostex v3.
 * Automatically locks the room across all connected channels (Booking.com, Ctrip, Meituan, etc.)
 */
export async function createHostexReservation(booking: DirectBookingPayload): Promise<ReservationResult> {
  try {
    const body = {
      property_id: Number(booking.property_id),
      custom_channel_id: 29, // Channel: "Booking Site" / YOJQI Direct
      check_in_date: booking.check_in_date,
      check_out_date: booking.check_out_date,
      guest_name: booking.guest_name,
      guest_phone: booking.guest_phone || '',
      guest_email: booking.guest_email || '',
      currency: booking.currency || 'CNY',
      rate_amount: Number(booking.total_amount),
      commission_amount: 0,
      received_amount: Number(booking.total_amount),
      income_method_id: 2, // 2: WeChat / Online Official Payment, 1: Alipay, 0: Other
      number_of_guests: booking.number_of_guests || 2,
      remarks: `[YOJQI官网直订] Stripe: ${booking.stripe_session_id || 'Direct'} | 预计到店: ${booking.estimated_arrival_time || '待定'} | 需求: ${booking.special_requests || '无'}`,
    };

    const resp = await hostexRequest('/reservations', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const resData = resp?.data || {};
    const reservationCode = resData.reservation_code || resData.stay_code || 'HOSTEX-AUTO';

    return {
      success: true,
      reservation_code: reservationCode,
      stay_code: resData.stay_code,
      property_id: booking.property_id,
      raw: resData,
    };
  } catch (error: any) {
    console.error('[createHostexReservation Error]:', error);
    return {
      success: false,
      error_msg: error.message || 'Hostex reservation creation failed',
    };
  }
}

/**
 * Send instant alert card to Operations WeChat Work bot
 */
export async function notifyWeComDirectBooking(data: {
  reservation_code: string;
  room_name: string;
  guest_name: string;
  guest_phone: string;
  guest_email: string;
  check_in: string;
  check_out: string;
  nights: number;
  total_amount: number;
  currency?: string;
  property_id?: number;
  arrival_time?: string;
  special_requests?: string;
}): Promise<void> {
  if (!WECOM_WEBHOOK_URL) return;

  const markdownContent = `### 🛎️ 【YOJQI 官网】收到新民宿直订！
> **渠道**：YOJQI 官网直接预订 (\`YOJQI_DIRECT\`)
> **预订房型**：<font color="warning">${data.room_name}</font>
> **入住日期**：${data.check_in} 至 ${data.check_out} (共 ${data.nights} 晚)
> **宾客姓名**：**${data.guest_name}**
> **联系电话**：${data.guest_phone || '未留'}
> **电子邮箱**：${data.guest_email || '未留'}
> **实收金额**：¥${data.total_amount} ${data.currency || 'CNY'}
> **百居易确认码**：<font color="info">${data.reservation_code}</font>
> **分配房源ID**：\`${data.property_id || '自动'}\`
> **预计到店**：${data.arrival_time || '标准15:00'}
> **特殊需求**：${data.special_requests || '无'}

**⚡ 状态**：已同步百居易中央房态，已自动锁房并关闭各大 OTA (Booking/携程) 对应库存。请管家及时发送入住指引！`;

  try {
    await fetch(WECOM_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        msgtype: 'markdown',
        markdown: { content: markdownContent },
      }),
    });
  } catch (err) {
    console.warn('[WeCom Notification Failed]:', err);
  }
}

/**
 * OpenAI / OpenRouter Bilingual AI Butler Concierge
 */
export async function askOpenAIConcierge(
  question: string,
  chatHistory: Array<{ role: 'user' | 'assistant'; content: string }> = [],
  lang: 'zh' | 'en' = 'zh'
): Promise<string> {
  if (!OPENAI_API_KEY) {
    return lang === 'zh'
      ? '感谢您的垂询。我们是白虹·两江汇全江景高空民宿，位于重庆解放碑/洪崖洞核心商圈，拥有两江交汇全景露台与私享茶席。如需订房或咨询具体入住指引，您可直接在官网选定日期直订，或联系专属管家微信。'
      : 'Thank you for your inquiry. Baihong River View Retreat is located in Chongqing Jiefangbei/Hongyadong with panoramic river confluence views and kung fu tea terraces. Feel free to book directly on our website or reach out to our concierge team.';
  }

  const systemPrompt = `You are the bilingual VIP Concierge for YOJQI / Baihong River View Retreat (白虹·两江汇全江景高空民宿) in Chongqing, China.
Tone: Serene, elegant, warm, highly hospitable, cultured, and responsive.

Key Property Facts:
- Location: Yuzhong District, Chongqing (steps from Hongyadong, Jiefangbei, and Jialing River).
- High Altitude: Floors 21-22 overlooking the confluence of Yangtze & Jialing rivers, Qiansimen Bridge, and cyberpunk night skyline.
- Front-Row Drone Show Vantage: Unobstructed private view of official weekend/holiday drone light formations directly from private terraces.
- Room Types:
  1. Lian Yan | Balcony Panoramic King (潋滟·全江景阳台大床房, 48㎡, high floor private balcony)
  2. Liu Guang | Floor-to-Ceiling Skyline King (流光·落地观景大床房, 45㎡, soaking tub by panoramic glass)
  3. Zhi Yu | Twin Beds River View (知屿·两江汇双床观景房, 42㎡, 2 single beds 1.2m)
  4. Qing Ying | High-Altitude Panoramic Twin (清影·高空全景双床房, 46㎡, 2 single beds 1.2m)
  5. Hua Deng Qi | 4-Bedroom Grand River Suite (华灯起·四室大阳台套房, 168㎡, up to 8 guests)
  6. Jiang Hua | 4-Bedroom Family Haven (江画·四室家庭套房, 155㎡, up to 8 guests)
  7. Xue Ni | 2-Bedroom River View Suite (雪泥·两室一厅套房, 88㎡, up to 4 guests)
- Direct Booking Perks: Official 5% direct discount, complimentary welcome Kung Fu tea set, luggage storage, and priority early check-in.
- Check-in: 15:00 / Check-out: 12:00. Luggage drop-off available anytime.
- Respond in the guest's language: If Chinese, use elegant, poetic Chinese; if English, use refined, welcoming English.`;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...chatHistory.slice(-6),
    { role: 'user', content: question },
  ];

  try {
    const res = await fetch(`${OPENAI_BASE_URL.replace(/\/+$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 600,
      }),
    });

    if (!res.ok) {
      throw new Error(`OpenAI API returned ${res.status}`);
    }

    const data = await res.json();
    return data?.choices?.[0]?.message?.content || '欢迎光临白虹民宿，请随时告知您的入住需求。';
  } catch (err: any) {
    console.warn('[askOpenAIConcierge error]:', err);
    return lang === 'zh'
      ? '管家服务系统正忙，您可直接在页面中选择心仪房型与日期发起直订，或添加专属管家微信获得一对一指引。'
      : 'Our digital concierge is currently busy. Please choose your dates to book directly or contact our concierge via WeChat/WhatsApp.';
  }
}
