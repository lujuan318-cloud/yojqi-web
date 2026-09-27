import {
  AdminUser,
  OrderRecord,
  CustomerInquiryRecord,
  AnalyticsSummary,
  INITIAL_ADMIN_USERS,
  INITIAL_ORDERS,
  INITIAL_INQUIRIES,
  INITIAL_ANALYTICS,
  AdminPermission,
} from './admin-data';

// In-Memory Global cache for development / API handlers
let globalAdminUsers: AdminUser[] = [...INITIAL_ADMIN_USERS];
let globalOrders: OrderRecord[] = [...INITIAL_ORDERS];
let globalInquiries: CustomerInquiryRecord[] = [...INITIAL_INQUIRIES];
let globalAnalytics: AnalyticsSummary = { ...INITIAL_ANALYTICS };

// -----------------------------------------------------------------------------
// Admin Auth & User Management
// -----------------------------------------------------------------------------
export function authenticateAdmin(username: string, password?: string): AdminUser | null {
  const user = globalAdminUsers.find(
    (u) => u.username === username.trim() && u.status === 'active'
  );
  if (!user) return null;
  if (password && user.password && user.password !== password) return null;

  user.lastLoginAt = new Date().toISOString().replace('T', ' ').substring(0, 19);
  return user;
}

export function getAdminUsers(): AdminUser[] {
  return globalAdminUsers.map(({ password, ...u }) => ({ ...u }));
}

export function getAdminUserById(id: string): AdminUser | undefined {
  const user = globalAdminUsers.find((u) => u.id === id);
  if (!user) return undefined;
  const { password, ...safeUser } = user;
  return safeUser as AdminUser;
}

export function createAdminUser(payload: {
  username: string;
  name: string;
  email: string;
  password?: string;
  roleNameZh: string;
  roleNameEn: string;
  permissions: AdminPermission[];
}): AdminUser {
  const newUser: AdminUser = {
    id: `admin-custom-${Date.now()}`,
    username: payload.username,
    name: payload.name,
    email: payload.email,
    password: payload.password || 'admin123456',
    role: 'custom',
    roleNameZh: payload.roleNameZh || '普通管理员',
    roleNameEn: payload.roleNameEn || 'Sub Administrator',
    permissions: payload.permissions,
    status: 'active',
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
  };

  globalAdminUsers.push(newUser);
  return newUser;
}

export function updateAdminUserPermissions(
  userId: string,
  permissions: AdminPermission[],
  status?: 'active' | 'disabled'
): AdminUser | null {
  const user = globalAdminUsers.find((u) => u.id === userId);
  if (!user) return null;

  user.permissions = permissions;
  if (status) user.status = status;
  return user;
}

export function deleteAdminUser(userId: string): boolean {
  // Prevent deleting super admin
  const user = globalAdminUsers.find((u) => u.id === userId);
  if (!user || user.role === 'super_admin') return false;

  globalAdminUsers = globalAdminUsers.filter((u) => u.id !== userId);
  return true;
}

// -----------------------------------------------------------------------------
// Orders & Fulfillment Management
// -----------------------------------------------------------------------------
export function getAllOrders(): OrderRecord[] {
  return [...globalOrders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getOrderByNumber(orderNumber: string): OrderRecord | undefined {
  return globalOrders.find(
    (o) => o.orderNumber.toUpperCase() === orderNumber.trim().toUpperCase()
  );
}

export function getOrderByEmailAndNumber(orderNumber: string, email: string): OrderRecord | undefined {
  return globalOrders.find(
    (o) =>
      o.orderNumber.toUpperCase() === orderNumber.trim().toUpperCase() &&
      o.customerEmail.toLowerCase() === email.trim().toLowerCase()
  );
}

export function updateOrderFulfillment(
  orderId: string,
  payload: {
    orderStatus?: OrderRecord['orderStatus'];
    carrier?: OrderRecord['carrier'];
    carrierNameZh?: string;
    carrierNameEn?: string;
    trackingNumber?: string;
    adminNotes?: string;
  }
): OrderRecord | null {
  const order = globalOrders.find((o) => o.id === orderId || o.orderNumber === orderId);
  if (!order) return null;

  const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
  order.updatedAt = now;

  if (payload.orderStatus) {
    order.orderStatus = payload.orderStatus;
    if (payload.orderStatus === 'shipped' && !order.shippedAt) {
      order.shippedAt = now;
    }
    if (payload.orderStatus === 'delivered' && !order.deliveredAt) {
      order.deliveredAt = now;
    }
  }

  if (payload.carrier) order.carrier = payload.carrier;
  if (payload.carrierNameZh) order.carrierNameZh = payload.carrierNameZh;
  if (payload.carrierNameEn) order.carrierNameEn = payload.carrierNameEn;
  if (payload.trackingNumber) order.trackingNumber = payload.trackingNumber;
  if (payload.adminNotes !== undefined) order.adminNotes = payload.adminNotes;

  // Append tracking event if shipped
  if (payload.orderStatus === 'shipped' && payload.trackingNumber) {
    if (!order.trackingEvents) order.trackingEvents = [];
    const eventTime = now.substring(0, 16);
    const existing = order.trackingEvents.find((e) => e.titleZh.includes('已发货'));
    if (!existing) {
      order.trackingEvents.unshift({
        time: eventTime,
        titleZh: `已由 ${order.carrierNameZh || '快递专线'} 揽收发货`,
        titleEn: `Dispatched via ${order.carrierNameEn || 'Express Courier'}`,
        descriptionZh: `运单号: ${order.trackingNumber}，包裹正在运往目的地。`,
        descriptionEn: `Tracking #${order.trackingNumber}. Package in transit.`,
        location: 'Chongqing Sanctuary Hub',
      });
    }
  }

  return order;
}

// -----------------------------------------------------------------------------
// Inquiries & Concierge Leads Management
// -----------------------------------------------------------------------------
export function getAllInquiries(): CustomerInquiryRecord[] {
  return [...globalInquiries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function updateInquiryStatus(
  inquiryId: string,
  status: CustomerInquiryRecord['status'],
  staffNotes?: string
): CustomerInquiryRecord | null {
  const inq = globalInquiries.find((i) => i.id === inquiryId);
  if (!inq) return null;

  inq.status = status;
  if (staffNotes !== undefined) inq.staffNotes = staffNotes;
  return inq;
}

export function addInquiry(newInquiry: Omit<CustomerInquiryRecord, 'id' | 'createdAt'>): CustomerInquiryRecord {
  const inq: CustomerInquiryRecord = {
    id: `inq-${Date.now()}`,
    ...newInquiry,
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
  };
  globalInquiries.unshift(inq);
  return inq;
}

// -----------------------------------------------------------------------------
// Analytics
// -----------------------------------------------------------------------------
export function getAnalyticsSummary(): AnalyticsSummary {
  return { ...globalAnalytics };
}
