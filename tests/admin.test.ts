import test from 'node:test';
import assert from 'node:assert';
import {
  authenticateAdmin,
  getAdminUsers,
  createAdminUser,
  getAllOrders,
  updateOrderFulfillment,
  getOrderByEmailAndNumber,
  getAllInquiries,
  updateInquiryStatus,
  getAnalyticsSummary
} from '../lib/admin-store';

test('RBAC: Super Admin Authentication & Permissions', () => {
  const superAdmin = authenticateAdmin('superadmin', 'superadmin2026');
  assert.ok(superAdmin, 'Super admin credentials must succeed');
  assert.strictEqual(superAdmin?.role, 'super_admin');
  assert.ok(superAdmin?.permissions.includes('users:manage'), 'Super admin must have users:manage permission');
  assert.ok(superAdmin?.permissions.includes('orders:manage'), 'Super admin must have orders:manage permission');
  assert.ok(superAdmin?.permissions.includes('analytics:view'), 'Super admin must have analytics:view permission');
});

test('RBAC: Sub-Admin (Logistics) isolated permissions', () => {
  const logiAdmin = authenticateAdmin('fulfillment_staff', 'shipping2026');
  assert.ok(logiAdmin, 'Shipping staff credentials must succeed');
  assert.strictEqual(logiAdmin?.role, 'orders_admin');
  assert.ok(logiAdmin?.permissions.includes('orders:view'));
  assert.ok(logiAdmin?.permissions.includes('orders:manage'));
  assert.strictEqual(logiAdmin?.permissions.includes('users:manage'), false, 'Sub-admin must NOT have users:manage');
  assert.strictEqual(logiAdmin?.permissions.includes('inquiries:manage'), false, 'Logistics staff must NOT manage inquiries');
});

test('RBAC: Sub-Admin (Customer Service) isolated permissions', () => {
  const csAdmin = authenticateAdmin('concierge_staff', 'concierge2026');
  assert.ok(csAdmin, 'CS staff credentials must succeed');
  assert.strictEqual(csAdmin?.role, 'concierge_admin');
  assert.ok(csAdmin?.permissions.includes('inquiries:view'));
  assert.ok(csAdmin?.permissions.includes('inquiries:manage'));
  assert.strictEqual(csAdmin?.permissions.includes('orders:manage'), false, 'CS staff must NOT fulfill orders');
});

test('RBAC: Super Admin creates a new Sub-Admin with custom permissions', () => {
  const newStaff = createAdminUser({
    username: 'analyst_bob',
    password: 'password123',
    name: 'Bob Analyst',
    email: 'bob@yojqi.com',
    roleNameZh: '数据分析专管员',
    roleNameEn: 'Traffic Analyst Admin',
    permissions: ['analytics:view']
  });

  assert.ok(newStaff.id);
  assert.strictEqual(newStaff.username, 'analyst_bob');
  assert.deepStrictEqual(newStaff.permissions, ['analytics:view']);

  // Verify authentication with the newly created sub-admin
  const authed = authenticateAdmin('analyst_bob', 'password123');
  assert.ok(authed);
  assert.strictEqual(authed?.name, 'Bob Analyst');
});

test('Order Fulfillment & Logistics Tracking Update', () => {
  const orders = getAllOrders();
  assert.ok(orders.length > 0, 'Seed orders must be present');

  const targetOrder = orders[0];
  const updated = updateOrderFulfillment(targetOrder.id, {
    orderStatus: 'shipped',
    carrier: 'sf_express',
    carrierNameZh: '顺丰国际速运',
    carrierNameEn: 'SF Express Global',
    trackingNumber: 'SF9988776655CN',
    adminNotes: 'Consignment cleared export customs.'
  });

  assert.ok(updated, 'Order update should succeed');
  assert.strictEqual(updated?.orderStatus, 'shipped');
  assert.strictEqual(updated?.carrier, 'sf_express');
  assert.strictEqual(updated?.trackingNumber, 'SF9988776655CN');
  
  // Verify tracking event was prepended
  const latestEvent = updated?.trackingEvents?.[0];
  assert.ok(latestEvent?.titleZh.includes('顺丰国际速运') || latestEvent?.titleZh.includes('揽收'));
  assert.ok(latestEvent?.descriptionZh.includes('SF9988776655CN'));
});

test('Public Order Tracking by ID & Email', () => {
  const orders = getAllOrders();
  const testOrder = orders[0];

  // Correct Order Number and Email
  const found = getOrderByEmailAndNumber(testOrder.orderNumber, testOrder.customerEmail);
  assert.ok(found, 'Should find order with matching order number and email');
  assert.strictEqual(found?.orderNumber, testOrder.orderNumber);

  // Case insensitive match
  const foundCaseInsensitive = getOrderByEmailAndNumber(
    testOrder.orderNumber.toLowerCase(),
    testOrder.customerEmail.toUpperCase()
  );
  assert.ok(foundCaseInsensitive, 'Should match case-insensitively');

  // Wrong email
  const notFound = getOrderByEmailAndNumber(testOrder.orderNumber, 'nonexistent@email.com');
  assert.strictEqual(notFound, undefined, 'Should return undefined for mismatched email');
});

test('Inquiry Management & Status Updates', () => {
  const inquiries = getAllInquiries();
  assert.ok(inquiries.length > 0, 'Seed inquiries must be present');

  const inquiry = inquiries[0];
  const updated = updateInquiryStatus(inquiry.id, 'contacted', 'Contacted VIP via WeChat concierge.');
  assert.ok(updated);
  assert.strictEqual(updated?.status, 'contacted');
  assert.strictEqual(updated?.staffNotes, 'Contacted VIP via WeChat concierge.');
});

test('Traffic & Source Analytics Aggregation', () => {
  const analytics = getAnalyticsSummary();
  assert.ok(analytics.todayPageViews > 0);
  assert.ok(analytics.todayUniqueVisitors > 0);
  assert.ok(analytics.sources.length >= 4);
  assert.ok(analytics.geoDistribution.length >= 4);
  assert.ok(analytics.topPages.length >= 4);
  
  // Check that traffic shares add up reasonably
  const totalShare = analytics.sources.reduce((acc, s) => acc + s.percentage, 0);
  assert.ok(totalShare >= 95 && totalShare <= 105, 'Traffic shares should sum to ~100%');
});
