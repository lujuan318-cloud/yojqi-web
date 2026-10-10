/**
 * Temporary Inventory Hold Manager (10-Minute Lock)
 * 
 * Prevents double-booking during guest checkout before payment completion.
 * Holds automatically expire after 10 minutes if unpaid.
 */

export interface InventoryHold {
  hold_token: string;
  room_key: string;
  property_id: number;
  check_in: string;
  check_out: string;
  created_at: number;
  expires_at: number;
}

// In-memory global store (persists across requests within node process runtime)
const globalHolds = new Map<string, InventoryHold>();

const HOLD_DURATION_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Clean up expired holds
 */
function purgeExpiredHolds(): void {
  const now = Date.now();
  for (const [token, hold] of globalHolds.entries()) {
    if (hold.expires_at <= now) {
      globalHolds.delete(token);
    }
  }
}

/**
 * Count active holds for a specific room key
 */
export function getActiveHoldsForRoom(roomKey: string): number {
  purgeExpiredHolds();
  let count = 0;
  for (const hold of globalHolds.values()) {
    if (hold.room_key === roomKey) {
      count++;
    }
  }
  return count;
}

/**
 * Create a 10-minute hold for an available physical property
 */
export function createInventoryHold(
  roomKey: string,
  propertyId: number,
  checkIn: string,
  checkOut: string
): { success: boolean; hold_token?: string; expires_at?: number; message?: string } {
  purgeExpiredHolds();

  // Verify property is not currently held for overlapping dates
  for (const hold of globalHolds.values()) {
    if (hold.property_id === propertyId) {
      const datesOverlap = !(checkOut <= hold.check_in || checkIn >= hold.check_out);
      if (datesOverlap) {
        return {
          success: false,
          message: '该房间正在被另一位客人确认预订中，请稍后再试或选择其他房型。',
        };
      }
    }
  }

  const now = Date.now();
  const expiresAt = now + HOLD_DURATION_MS;
  const holdToken = `HOLD_${roomKey}_${propertyId}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  const newHold: InventoryHold = {
    hold_token: holdToken,
    room_key: roomKey,
    property_id: propertyId,
    check_in: checkIn,
    check_out: checkOut,
    created_at: now,
    expires_at: expiresAt,
  };

  globalHolds.set(holdToken, newHold);

  return {
    success: true,
    hold_token: holdToken,
    expires_at: expiresAt,
  };
}

/**
 * Validate that a hold is still alive and matches the booking
 */
export function validateInventoryHold(
  holdToken: string,
  roomKey: string,
  checkIn: string,
  checkOut: string
): { valid: boolean; hold?: InventoryHold; message?: string } {
  purgeExpiredHolds();

  const hold = globalHolds.get(holdToken);
  if (!hold) {
    return {
      valid: false,
      message: '房源保留已超时（超过10分钟），请重新刷新并选择房型。',
    };
  }

  if (hold.room_key !== roomKey || hold.check_in !== checkIn || hold.check_out !== checkOut) {
    return {
      valid: false,
      message: '预订保留信息与当前选择不一致。',
    };
  }

  return {
    valid: true,
    hold,
  };
}

/**
 * Release hold when booking is confirmed or guest cancels
 */
export function releaseInventoryHold(holdToken: string): void {
  globalHolds.delete(holdToken);
}
