import test from 'node:test';
import assert from 'node:assert/strict';
import { getRoomCatalog, getRoomBySlug, getRoomByKey } from '../lib/retreats-catalog';
import { createInventoryHold, validateInventoryHold, releaseInventoryHold, getActiveHoldsForRoom } from '../lib/inventory-hold';
import { calculateRoomQuote } from '../lib/retreats-pricing';

test('YOJQI Homestay Direct Booking Architecture Tests', async (t) => {
  await t.test('Room Catalog contains 7 flagship room types mapped to Hostex', () => {
    const catalog = getRoomCatalog();
    assert.equal(catalog.length, 7, 'Must have exactly 7 flagship rooms');

    const expectedKeys = [
      'balcony_king_b',
      'floor_window_king',
      'twin_view_a',
      'twin_view_b',
      'suite_4bed_balcony',
      'suite_4bed_family',
      'suite_2bed_duo',
    ];

    for (const key of expectedKeys) {
      const room = catalog.find((r) => r.room_key === key);
      assert.ok(room, `Missing room: ${key}`);
      assert.ok(room.house_type_id > 0, `Invalid house_type_id for ${key}`);
      assert.ok(room.listing_id.length > 0, `Missing listing_id for ${key}`);
      assert.ok(room.property_ids.length > 0, `Missing physical property_ids for ${key}`);
      assert.ok(room.basePrice > 0, `Invalid base price for ${key}`);
      assert.ok(room.minFloorPrice > 0, `Invalid min floor price for ${key}`);
      assert.ok(room.nameZh.length > 0, `Missing Chinese name for ${key}`);
      assert.ok(room.nameEn.length > 0, `Missing English name for ${key}`);
      assert.ok(room.coverImage.length > 0, `Missing cover image for ${key}`);
    }
  });

  await t.test('getRoomBySlug and getRoomByKey work properly', () => {
    const room = getRoomBySlug('balcony-river-view-king');
    assert.ok(room);
    assert.equal(room.room_key, 'balcony_king_b');

    const roomByKey = getRoomByKey('floor_window_king');
    assert.ok(roomByKey);
    assert.equal(roomByKey.slug, 'floor-to-ceiling-skyline-king');
  });

  await t.test('10-Minute Inventory Hold lifecycle prevents double-booking', () => {
    const testRoom = 'balcony_king_b';
    const testPropId = 12512775;
    const checkIn = '2026-11-20';
    const checkOut = '2026-11-22';

    // 1. Create hold
    const holdRes = createInventoryHold(testRoom, testPropId, checkIn, checkOut);
    assert.equal(holdRes.success, true);
    assert.ok(holdRes.hold_token);
    assert.ok(holdRes.expires_at! > Date.now());

    // 2. Overlapping hold attempt should be rejected
    const conflictRes = createInventoryHold(testRoom, testPropId, '2026-11-21', '2026-11-23');
    assert.equal(conflictRes.success, false, 'Overlapping hold should be blocked');

    // 3. Validation
    const valRes = validateInventoryHold(holdRes.hold_token!, testRoom, checkIn, checkOut);
    assert.equal(valRes.valid, true);

    // 4. Active holds count
    assert.ok(getActiveHoldsForRoom(testRoom) >= 1);

    // 5. Release hold
    releaseInventoryHold(holdRes.hold_token!);
    const valAfterRelease = validateInventoryHold(holdRes.hold_token!, testRoom, checkIn, checkOut);
    assert.equal(valAfterRelease.valid, false, 'Released hold should be invalid');
  });

  await t.test('Dynamic rate calculation applies direct booking perk & floor protection', async () => {
    const room = getRoomByKey('balcony_king_b')!;
    const checkIn = '2026-11-17'; // Tuesday
    const checkOut = '2026-11-19'; // Thursday (2 nights)

    const quote = await calculateRoomQuote(room, checkIn, checkOut);
    assert.equal(quote.nights, 2);
    assert.equal(quote.room_key, 'balcony_king_b');
    assert.equal(quote.currency, 'CNY');
    assert.ok(quote.total_amount > 0);
    assert.ok(quote.avg_nightly_price >= room.minFloorPrice, 'Rate cannot breach floor price');
    assert.ok(quote.assigned_property_id > 0);
    assert.ok(['available', 'only_1_left', 'sold_out'].includes(quote.status));
  });
});
