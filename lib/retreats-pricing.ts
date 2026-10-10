/**
 * Dynamic Pricing & Availability Engine for YOJQI Direct Booking
 * 
 * Powered by:
 * - 繁花收益管理助手 (RMS Dynamic Pricing Model & Floor Guard)
 * - 百居易 (Hostex OpenAPI v3 Live Calendar & Inventory)
 */

import { queryListingCalendar, CalendarDay } from './hostex-pms';
import { RETREAT_ROOM_CATALOG, RetreatRoomType } from './retreats-catalog';
import { getActiveHoldsForRoom } from './inventory-hold';

export interface DailyPriceDetail {
  date: string;
  ota_price: number;
  direct_price: number;
  is_weekend: boolean;
  inventory: number;
  status: 'available' | 'only_1_left' | 'sold_out';
}

export interface RoomAvailabilityQuote {
  room_key: string;
  slug: string;
  display_type?: 'room_type' | 'individual_room';
  pms_sku?: string;
  house_type_id: number;
  nameZh: string;
  nameEn: string;
  subtitleZh: string;
  subtitleEn: string;
  badgeZh?: string;
  badgeEn?: string;
  coverImage: string;
  gallery: string[];
  area: string;
  floorZh: string;
  floorEn: string;
  capacity: number;
  bedInfoZh: string;
  bedInfoEn: string;
  tagsZh: string[];
  tagsEn: string[];
  amenitiesZh: string[];
  amenitiesEn: string[];
  directPerksZh: string[];
  directPerksEn: string[];
  
  // Date & Availability
  check_in: string;
  check_out: string;
  nights: number;
  available: boolean;
  status: 'available' | 'only_1_left' | 'sold_out';
  rooms_left: number;
  
  // Financials
  currency: string;
  daily_prices: DailyPriceDetail[];
  avg_nightly_price: number;
  total_amount: number;
  original_ota_total: number;
  direct_savings: number;
  
  // Physical Property candidate for locking
  assigned_property_id: number;
}

/**
 * Format date utility
 */
function parseDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function formatDate(d: Date): string {
  return d.toISOString().split('T')[0];
}

/**
 * Calculate dynamic rate and availability for a single room type
 */
export async function calculateRoomQuote(
  room: RetreatRoomType,
  checkIn: string,
  checkOut: string
): Promise<RoomAvailabilityQuote> {
  const dIn = parseDate(checkIn);
  const dOut = parseDate(checkOut);
  const diffTime = dOut.getTime() - dIn.getTime();
  const nights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));

  // 1. Query Hostex live calendar
  let calendarDays: CalendarDay[] = [];
  try {
    calendarDays = await queryListingCalendar(room.listing_id, 'booking.com', checkIn, checkOut);
  } catch (e) {
    console.warn(`[calculateRoomQuote] Calendar query fallback for ${room.room_key}:`, e);
  }

  const calendarMap = new Map<string, CalendarDay>();
  for (const c of calendarDays) {
    calendarMap.set(c.date, c);
  }

  // Active temporary holds
  const activeHeldRooms = getActiveHoldsForRoom(room.room_key);

  const dailyDetails: DailyPriceDetail[] = [];
  let minInventory = room.property_ids.length;

  for (let i = 0; i < nights; i++) {
    const curDate = new Date(dIn.getTime() + i * 24 * 60 * 60 * 1000);
    const dateStr = formatDate(curDate);
    const dayOfWeek = curDate.getUTCDay(); // 5 = Friday, 6 = Saturday
    const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;

    const calDay = calendarMap.get(dateStr);
    let otaPrice: number;
    let inv: number;

    if (calDay && typeof calDay.price === 'number' && calDay.price > 0) {
      otaPrice = calDay.price;
      inv = typeof calDay.inventory === 'number' ? calDay.inventory : room.property_ids.length;
    } else {
      // RMS fallback formula: baseline * weekend factor (1.15)
      const weekendFactor = isWeekend ? 1.15 : 1.0;
      otaPrice = Math.round(room.basePrice * weekendFactor);
      inv = room.property_ids.length;
    }

    // Deduct temporary holds
    const netInventory = Math.max(0, inv - activeHeldRooms);
    if (netInventory < minInventory) {
      minInventory = netInventory;
    }

    // Direct booking price: 95% of OTA price, guarded by hard floor price
    let directPrice = Math.round(otaPrice * 0.95);
    if (directPrice < room.minFloorPrice) {
      directPrice = room.minFloorPrice;
    }

    const dayStatus: 'available' | 'only_1_left' | 'sold_out' =
      netInventory <= 0 ? 'sold_out' : netInventory === 1 ? 'only_1_left' : 'available';

    dailyDetails.push({
      date: dateStr,
      ota_price: otaPrice,
      direct_price: directPrice,
      is_weekend: isWeekend,
      inventory: netInventory,
      status: dayStatus,
    });
  }

  const totalAmount = dailyDetails.reduce((sum, d) => sum + d.direct_price, 0);
  const otaTotal = dailyDetails.reduce((sum, d) => sum + d.ota_price, 0);
  const directSavings = Math.max(0, otaTotal - totalAmount);
  const avgPrice = Math.round(totalAmount / nights);

  const isAvailable = minInventory > 0;
  const overallStatus: 'available' | 'only_1_left' | 'sold_out' =
    minInventory <= 0 ? 'sold_out' : minInventory === 1 ? 'only_1_left' : 'available';

  // Candidate physical property ID
  const assignedPropertyId = room.property_ids[0] || room.default_property_id;

  return {
    room_key: room.room_key,
    slug: room.slug,
    display_type: room.display_type,
    pms_sku: room.pms_sku,
    house_type_id: room.house_type_id,
    nameZh: room.nameZh,
    nameEn: room.nameEn,
    subtitleZh: room.subtitleZh,
    subtitleEn: room.subtitleEn,
    badgeZh: room.badgeZh,
    badgeEn: room.badgeEn,
    coverImage: room.coverImage,
    gallery: room.gallery,
    area: room.area,
    floorZh: room.floorZh,
    floorEn: room.floorEn,
    capacity: room.capacity,
    bedInfoZh: room.bedInfoZh,
    bedInfoEn: room.bedInfoEn,
    tagsZh: room.tagsZh,
    tagsEn: room.tagsEn,
    amenitiesZh: room.amenitiesZh,
    amenitiesEn: room.amenitiesEn,
    directPerksZh: room.directPerksZh,
    directPerksEn: room.directPerksEn,

    check_in: checkIn,
    check_out: checkOut,
    nights,
    available: isAvailable,
    status: overallStatus,
    rooms_left: minInventory,

    currency: 'CNY',
    daily_prices: dailyDetails,
    avg_nightly_price: avgPrice,
    total_amount: totalAmount,
    original_ota_total: otaTotal,
    direct_savings: directSavings,

    assigned_property_id: assignedPropertyId,
  };
}

/**
 * Batch calculate availability for all rooms in catalog
 */
export async function queryAllRoomsAvailability(
  checkIn: string,
  checkOut: string,
  guestCount: number = 2
): Promise<RoomAvailabilityQuote[]> {
  const catalog = RETREAT_ROOM_CATALOG;
  const results = await Promise.all(
    catalog.map(async (room) => {
      // Filter out if room capacity is strictly insufficient for guests
      if (room.capacity < guestCount) {
        return null;
      }
      return calculateRoomQuote(room, checkIn, checkOut);
    })
  );

  return results.filter((r): r is RoomAvailabilityQuote => r !== null);
}
