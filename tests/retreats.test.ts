import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getRoomCatalog,
  getRoomBySlug,
  getRoomByKey,
  getRoomTypesOnly,
  getIndividualRoomsOnly,
} from '../lib/retreats-catalog';
import {
  createInventoryHold,
  validateInventoryHold,
  releaseInventoryHold,
  getActiveHoldsForRoom,
} from '../lib/inventory-hold';
import { calculateRoomQuote } from '../lib/retreats-pricing';

test('YOJQI Homestay Direct Booking Architecture Tests', async (t) => {
  await t.test('Room Catalog contains 16 total products (7 pooled room types + 9 dedicated rooms)', () => {
    const catalog = getRoomCatalog();
    assert.equal(catalog.length, 16, 'Must have exactly 16 rooms in catalog (7 room types + 9 individual rooms)');

    const roomTypes = getRoomTypesOnly();
    assert.equal(roomTypes.length, 7, 'Must have exactly 7 pooled room types (展示方式 = 房型)');

    const indRooms = getIndividualRoomsOnly();
    assert.equal(indRooms.length, 9, 'Must have exactly 9 dedicated rooms (展示方式 = 房间)');

    // Ensure every single item has valid Hostex mapping
    for (const room of catalog) {
      assert.ok(room.room_key.length > 0, `Missing room_key`);
      assert.ok(room.slug.length > 0, `Missing slug for ${room.room_key}`);
      assert.ok(room.house_type_id > 0, `Invalid house_type_id for ${room.room_key}`);
      assert.ok(room.listing_id.length > 0, `Missing listing_id for ${room.room_key}`);
      assert.ok(room.property_ids.length > 0, `Missing physical property_ids for ${room.room_key}`);
      assert.ok(room.default_property_id > 0, `Missing default_property_id for ${room.room_key}`);
      assert.ok(room.basePrice > 0, `Invalid base price for ${room.room_key}`);
      assert.ok(room.minFloorPrice > 0, `Invalid min floor price for ${room.room_key}`);
      assert.ok(room.nameZh.length > 0, `Missing Chinese name for ${room.room_key}`);
      assert.ok(room.nameEn.length > 0, `Missing English name for ${room.room_key}`);
      assert.ok(room.coverImage.length > 0, `Missing cover image for ${room.room_key}`);

      // Bed naming rules verification
      assert.ok(
        !room.bedInfoEn.includes('Twin Bed'),
        `Room ${room.room_key} bedInfoEn must not use "Twin Bed" for 1.8m beds`
      );
    }
  });

  await t.test('All 7 Pooled Room Types match user specification', () => {
    const roomTypes = getRoomTypesOnly();
    const expectedKeys = [
      'floor_window_king',
      'twin_view_a',
      'twin_view_b',
      'balcony_king_a',
      'balcony_king_b',
      'suite_4bed_family',
      'suite_4bed_balcony',
    ];

    for (const key of expectedKeys) {
      const rt = roomTypes.find((r) => r.room_key === key);
      assert.ok(rt, `Missing pooled room type: ${key}`);
      assert.equal(rt.display_type, 'room_type');
    }
  });

  await t.test('All 9 Dedicated Rooms match user SKU specifications', () => {
    const indRooms = getIndividualRoomsOnly();
    const expectedKeys = [
      'room_b7_2_8_xueliuhua',
      'room_b19_2_yueshuxing',
      'room_b22_01_qingying',
      'room_b22_02_huadengqi',
      'room_c801_xiangwu',
      'room_b10_2_666_zhiyu',
      'room_b16_02_qingfeng',
      'room_b7_2_whole_suite',
      'room_b21_02_whole_suite',
    ];

    for (const key of expectedKeys) {
      const room = indRooms.find((r) => r.room_key === key);
      assert.ok(room, `Missing dedicated room: ${key}`);
      assert.equal(room.display_type, 'individual_room');
      assert.ok(room.pms_sku && room.pms_sku.length > 0, `Missing pms_sku for dedicated room: ${key}`);
    }
  });

  await t.test('getRoomBySlug and getRoomByKey work properly', () => {
    const room = getRoomBySlug('river-view-king-suite-with-private-balcony');
    assert.ok(room);
    assert.equal(room.room_key, 'balcony_king_a');

    const roomByKey = getRoomByKey('floor_window_king');
    assert.ok(roomByKey);
    assert.equal(roomByKey.slug, 'high-floor-river-view-king-floor-to-ceiling-windows');
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
    assert.equal(quote.display_type, 'room_type');
    assert.equal(quote.currency, 'CNY');
    assert.ok(quote.total_amount > 0);
    assert.ok(quote.avg_nightly_price >= room.minFloorPrice, 'Rate cannot breach floor price');
    assert.ok(quote.assigned_property_id > 0);
    assert.ok(['available', 'only_1_left', 'sold_out'].includes(quote.status));
  });

  await t.test('Multi-Channel Payment Configuration & Reference Generation', async () => {
    const { PAYMENT_CHANNELS, getDirectAccountDetails, generateBookingReference } = await import(
      '../lib/payment-channels'
    );

    assert.equal(PAYMENT_CHANNELS.length, 3, 'Must support Alipay, PayPal, and Wise');
    const ids = PAYMENT_CHANNELS.map((p) => p.id);
    assert.ok(ids.includes('alipay'));
    assert.ok(ids.includes('paypal'));
    assert.ok(ids.includes('wise'));

    const details = getDirectAccountDetails();
    assert.ok(details.alipay.account.length > 0);
    assert.ok(details.paypal.email.length > 0);
    assert.ok(details.wise.accountHolder.length > 0);

    const aliRef = generateBookingReference('alipay');
    const ppRef = generateBookingReference('paypal');
    const wiseRef = generateBookingReference('wise');

    assert.match(aliRef, /^YQ-ALI-[A-Z0-9]+$/);
    assert.match(ppRef, /^YQ-PAY-[A-Z0-9]+$/);
    assert.match(wiseRef, /^YQ-WIS-[A-Z0-9]+$/);
  });

  await t.test('Catalog Image Safety: Transferred Jiefangbei shop photos completely removed', () => {
    const catalog = getRoomCatalog();
    for (const room of catalog) {
      assert.ok(
        !room.coverImage.includes('baihong-jiefangbei-view-1'),
        `Room ${room.room_key} coverImage contains forbidden old shop image`
      );
      for (const img of room.gallery) {
        assert.ok(
          !img.includes('baihong-jiefangbei-view-1'),
          `Room ${room.room_key} gallery contains forbidden old shop image`
        );
      }
    }
  });
});
