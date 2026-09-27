'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Shield,
  Package,
  Truck,
  Users,
  BarChart3,
  MessageSquare,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  LogOut,
  Edit,
  Plus,
  Trash2,
  Globe,
  TrendingUp,
  Smartphone,
  Monitor,
  Calendar,
  Lock,
  UserCheck,
  Send,
} from 'lucide-react';
import { Language } from '@/lib/i18n';
import {
  AdminUser,
  OrderRecord,
  CustomerInquiryRecord,
  AnalyticsSummary,
  AdminPermission,
  INITIAL_ADMIN_USERS,
  INITIAL_ORDERS,
  INITIAL_INQUIRIES,
  INITIAL_ANALYTICS,
} from '@/lib/admin-data';
import { useCurrency } from '@/context/CurrencyContext';

interface AdminPageProps {
  params: Promise<{ lang: string }>;
}

export default function AdminPage({ params }: AdminPageProps) {
  const [lang, setLang] = useState<Language>('zh');
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState<'orders' | 'inquiries' | 'analytics' | 'users'>('orders');

  // Auth form states
  const [username, setUsername] = useState('superadmin');
  const [password, setPassword] = useState('superadmin2026');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Data states
  const [orders, setOrders] = useState<OrderRecord[]>(INITIAL_ORDERS);
  const [inquiries, setInquiries] = useState<CustomerInquiryRecord[]>(INITIAL_INQUIRIES);
  const [analytics, setAnalytics] = useState<AnalyticsSummary>(INITIAL_ANALYTICS);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);

  // Search & Filter states
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('all');

  // Modal / Editing states
  const [editingOrder, setEditingOrder] = useState<OrderRecord | null>(null);
  const [carrierInput, setCarrierInput] = useState<OrderRecord['carrier']>('sf_express');
  const [carrierNameInput, setCarrierNameInput] = useState('顺丰国际特惠专线');
  const [trackingNumberInput, setTrackingNumberInput] = useState('');
  const [orderStatusInput, setOrderStatusInput] = useState<OrderRecord['orderStatus']>('shipped');
  const [adminNotesInput, setAdminNotesInput] = useState('');

  // New Admin User Modal state
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('staff2026');
  const [newRoleNameZh, setNewRoleNameZh] = useState('发货专员');
  const [newPermissions, setNewPermissions] = useState<AdminPermission[]>(['orders:view', 'orders:manage']);

  const { formatPrice } = useCurrency();

  useEffect(() => {
    params.then((p) => setLang(p.lang as Language));
    // Auto login as super admin initially for demonstration convenience
    setCurrentUser(INITIAL_ADMIN_USERS[0]);
  }, [params]);

  const isZh = lang === 'zh';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setCurrentUser(data.user);
        // Default tab based on user permissions
        if (data.user.permissions.includes('orders:view')) setActiveTab('orders');
        else if (data.user.permissions.includes('inquiries:view')) setActiveTab('inquiries');
        else if (data.user.permissions.includes('analytics:view')) setActiveTab('analytics');
        else if (data.user.permissions.includes('users:manage')) setActiveTab('users');
      } else {
        setAuthError(data.error || (isZh ? '用户名或密码错误' : 'Authentication failed.'));
      }
    } catch {
      setAuthError(isZh ? '网络请求失败' : 'Network error.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleQuickSwitchRole = (user: AdminUser) => {
    setCurrentUser(user);
    setUsername(user.username);
    if (user.permissions.includes('orders:view')) setActiveTab('orders');
    else if (user.permissions.includes('inquiries:view')) setActiveTab('inquiries');
    else if (user.permissions.includes('analytics:view')) setActiveTab('analytics');
    else if (user.permissions.includes('users:manage')) setActiveTab('users');
  };

  const handleSaveOrder = async () => {
    if (!editingOrder) return;
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: editingOrder.id,
          orderStatus: orderStatusInput,
          carrier: carrierInput,
          carrierNameZh: carrierNameInput,
          carrierNameEn: carrierNameInput,
          trackingNumber: trackingNumberInput,
          adminNotes: adminNotesInput,
        }),
      });
      const data = await res.json();
      if (res.ok && data.order) {
        setOrders(orders.map((o) => (o.id === data.order.id ? data.order : o)));
        setEditingOrder(null);
      }
    } catch {
      alert(isZh ? '保存失败' : 'Save failed');
    }
  };

  const handleUpdateInquiryStatus = async (inqId: string, newStatus: CustomerInquiryRecord['status']) => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inquiryId: inqId, status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.inquiry) {
        setInquiries(inquiries.map((i) => (i.id === data.inquiry.id ? data.inquiry : i)));
      }
    } catch {
      alert(isZh ? '更新状态失败' : 'Failed to update');
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername || !newName) return;
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: newUsername,
          name: newName,
          email: newEmail,
          password: newPassword,
          roleNameZh: newRoleNameZh,
          roleNameEn: newRoleNameZh,
          permissions: newPermissions,
        }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setAdminUsers([...adminUsers, data.user]);
        setShowAddUserModal(false);
        setNewUsername('');
        setNewName('');
        setNewEmail('');
      }
    } catch {
      alert(isZh ? '创建子管理员失败' : 'Failed to create user');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm(isZh ? '确认注销该管理员权限？' : 'Revoke this admin user?')) return;
    try {
      const res = await fetch(`/api/admin/users?userId=${userId}`, { method: 'DELETE' });
      if (res.ok) {
        setAdminUsers(adminUsers.filter((u) => u.id !== userId));
      }
    } catch {
      alert(isZh ? '删除失败' : 'Delete failed');
    }
  };

  const hasPerm = (perm: AdminPermission): boolean => {
    if (!currentUser) return false;
    return currentUser.role === 'super_admin' || currentUser.permissions.includes(perm);
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      !orderSearch ||
      o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(orderSearch.toLowerCase());

    const matchStatus = orderStatusFilter === 'all' || o.orderStatus === orderStatusFilter;
    return matchSearch && matchStatus;
  });

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((i) => {
    return inquiryStatusFilter === 'all' || i.status === inquiryStatusFilter;
  });

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-yojqi-ink py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header & Role Switcher Bar */}
        <header className="bg-white rounded-2xl border border-yojqi-border p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-yojqi-ink text-white flex items-center justify-center font-serif font-bold text-lg shrink-0">
              <Shield className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl sm:text-2xl font-bold text-yojqi-ink">
                  YOJQI 后台中枢系统
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-semibold">
                  v2.1 RBAC
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                {isZh
                  ? '分级权限管理 · 订单物流派发 · 宿集工单跟进 · 流量来源洞察'
                  : 'Role-Based Access Control · Order Logistics · Concierge Leads · Traffic Analytics'}
              </p>
            </div>
          </div>

          {/* Current User Pill & Role Switcher */}
          {currentUser && (
            <div className="flex flex-wrap items-center gap-3 bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
              <div className="text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-yojqi-ink">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{currentUser.name}</span>
                </div>
                <span className="text-[11px] font-mono text-amber-800">{currentUser.roleNameZh}</span>
              </div>

              {/* Demo Role Switch Buttons */}
              <div className="flex items-center gap-1.5 border-l border-neutral-200 pl-3">
                {INITIAL_ADMIN_USERS.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => handleQuickSwitchRole(u)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                      currentUser.id === u.id
                        ? 'bg-yojqi-ink text-white font-bold'
                        : 'bg-white border border-neutral-200 text-neutral-600 hover:text-yojqi-ink'
                    }`}
                    title={`切换为: ${u.name}`}
                  >
                    {u.role === 'super_admin' ? '超管' : u.role === 'orders_admin' ? '发货专管' : '客服专管'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Main Dashboard Body */}
        {!currentUser ? (
          /* Login Form */
          <div className="max-w-md mx-auto bg-white border border-yojqi-border rounded-2xl p-8 shadow-md space-y-6">
            <div className="text-center space-y-1">
              <Lock className="w-8 h-8 text-yojqi-bronze mx-auto" />
              <h3 className="font-serif text-xl font-bold text-yojqi-ink">
                管理员身份验证
              </h3>
              <p className="text-xs text-neutral-500">
                请输入管理员账号及授权口令进入系统。
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">管理员账号</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">安全密码</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm"
                />
              </div>

              {authError && (
                <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 rounded-xl yojqi-btn-primary text-xs font-semibold"
              >
                {authLoading ? '验证中...' : '确认登入系统'}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Navigation Tabs (Dynamic Visibility based on RBAC permissions) */}
            <nav className="flex flex-wrap gap-2 border-b border-yojqi-border pb-3">
              {hasPerm('orders:view') && (
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide flex items-center gap-1.5 transition-all ${
                    activeTab === 'orders'
                      ? 'bg-yojqi-ink text-white shadow-xs'
                      : 'bg-white border border-neutral-200 text-neutral-600 hover:text-yojqi-ink'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>订单与发货管理 ({orders.length})</span>
                </button>
              )}

              {hasPerm('inquiries:view') && (
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide flex items-center gap-1.5 transition-all ${
                    activeTab === 'inquiries'
                      ? 'bg-yojqi-ink text-white shadow-xs'
                      : 'bg-white border border-neutral-200 text-neutral-600 hover:text-yojqi-ink'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>宿集与客服工单 ({inquiries.length})</span>
                </button>
              )}

              {hasPerm('analytics:view') && (
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide flex items-center gap-1.5 transition-all ${
                    activeTab === 'analytics'
                      ? 'bg-yojqi-ink text-white shadow-xs'
                      : 'bg-white border border-neutral-200 text-neutral-600 hover:text-yojqi-ink'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>流量与来源分析</span>
                </button>
              )}

              {hasPerm('users:manage') && (
                <button
                  onClick={() => setActiveTab('users')}
                  className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide flex items-center gap-1.5 transition-all ${
                    activeTab === 'users'
                      ? 'bg-yojqi-ink text-white shadow-xs'
                      : 'bg-white border border-neutral-200 text-neutral-600 hover:text-yojqi-ink'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>管理员权限分配 (超级管理员专属)</span>
                </button>
              )}
            </nav>

            {/* TAB 1: Orders & Shipping Management */}
            {activeTab === 'orders' && hasPerm('orders:view') && (
              <div className="space-y-4">
                {/* Search & Status Filters */}
                <div className="bg-white p-4 rounded-2xl border border-yojqi-border flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      placeholder="搜索单号、客户姓名、邮箱..."
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-xs focus:outline-none focus:border-yojqi-ink"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                    {['all', 'paid', 'processing', 'shipped', 'delivered'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setOrderStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono shrink-0 transition-colors ${
                          orderStatusFilter === st
                            ? 'bg-yojqi-ink text-white font-bold'
                            : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                        }`}
                      >
                        {st === 'all'
                          ? '全部订单'
                          : st === 'paid'
                          ? '待备货'
                          : st === 'processing'
                          ? '质检装箱'
                          : st === 'shipped'
                          ? '已发货'
                          : '已送达'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-2xl border border-yojqi-border overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-mono">
                        <tr>
                          <th className="p-4">订单号 / 下单时间</th>
                          <th className="p-4">客户信息</th>
                          <th className="p-4">结缘选品与规格</th>
                          <th className="p-4">实付金额</th>
                          <th className="p-4">当前状态</th>
                          <th className="p-4">物流承运与单号</th>
                          <th className="p-4 text-right">管理操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {filteredOrders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-neutral-50/50 transition-colors">
                            <td className="p-4">
                              <span className="font-mono font-bold text-yojqi-ink block">{ord.orderNumber}</span>
                              <span className="text-[11px] text-neutral-400 font-mono">{ord.createdAt}</span>
                            </td>
                            <td className="p-4">
                              <span className="font-medium text-yojqi-ink block">{ord.customerName}</span>
                              <span className="text-[11px] text-neutral-400 block">{ord.customerEmail}</span>
                              <span className="text-[10px] text-neutral-400">{ord.shippingAddress.country}</span>
                            </td>
                            <td className="p-4 max-w-xs">
                              <div className="space-y-1">
                                {ord.items.map((item) => (
                                  <div key={item.id} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                                    <span className="truncate text-neutral-700">
                                      {item.nameZh} x {item.quantity}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="p-4 font-mono font-bold text-yojqi-ink">
                              {formatPrice(ord.amountTotal)}
                            </td>
                            <td className="p-4">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold border inline-block ${
                                  ord.orderStatus === 'shipped'
                                    ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                                    : ord.orderStatus === 'delivered'
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                    : ord.orderStatus === 'processing'
                                    ? 'bg-blue-50 text-blue-800 border-blue-200'
                                    : 'bg-amber-50 text-amber-800 border-amber-200'
                                }`}
                              >
                                {ord.orderStatus === 'shipped'
                                  ? '已发货'
                                  : ord.orderStatus === 'delivered'
                                  ? '已签收'
                                  : ord.orderStatus === 'processing'
                                  ? '装箱质检中'
                                  : '待备货'}
                              </span>
                            </td>
                            <td className="p-4 font-mono text-[11px]">
                              {ord.trackingNumber ? (
                                <div>
                                  <span className="text-neutral-500 block">{ord.carrierNameZh}</span>
                                  <span className="font-bold text-yojqi-ink">{ord.trackingNumber}</span>
                                </div>
                              ) : (
                                <span className="text-neutral-400 italic">待填写单号</span>
                              )}
                            </td>
                            <td className="p-4 text-right">
                              {hasPerm('orders:manage') ? (
                                <button
                                  onClick={() => {
                                    setEditingOrder(ord);
                                    setOrderStatusInput(ord.orderStatus);
                                    setCarrierInput(ord.carrier || 'sf_express');
                                    setCarrierNameInput(ord.carrierNameZh || '顺丰国际特惠专线');
                                    setTrackingNumberInput(ord.trackingNumber || '');
                                    setAdminNotesInput(ord.adminNotes || '');
                                  }}
                                  className="px-3 py-1.5 rounded-lg bg-yojqi-sand text-yojqi-ink hover:bg-yojqi-ink hover:text-white transition-colors text-xs font-medium inline-flex items-center gap-1"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                  <span>处理发货</span>
                                </button>
                              ) : (
                                <span className="text-neutral-400 text-xs">只读权限</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Customer Inquiries & Concierge Leads */}
            {activeTab === 'inquiries' && hasPerm('inquiries:view') && (
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-2xl border border-yojqi-border flex items-center justify-between gap-3 shadow-xs">
                  <h3 className="font-serif text-lg font-bold text-yojqi-ink">
                    高空两江无人机宿集 · 预约咨询工单池
                  </h3>
                  <div className="flex gap-2">
                    {['all', 'pending', 'contacted', 'reserved'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setInquiryStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono ${
                          inquiryStatusFilter === st
                            ? 'bg-yojqi-ink text-white font-bold'
                            : 'bg-neutral-50 text-neutral-600'
                        }`}
                      >
                        {st === 'all' ? '全部工单' : st === 'pending' ? '待跟进' : st === 'contacted' ? '已联系' : '已锁定房态'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-5 bg-white rounded-2xl border border-yojqi-border shadow-xs flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                          <h4 className="font-serif text-base font-bold text-yojqi-ink">
                            {inq.guestName}
                          </h4>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                              inq.status === 'reserved'
                                ? 'bg-emerald-100 text-emerald-900'
                                : inq.status === 'contacted'
                                ? 'bg-blue-100 text-blue-900'
                                : 'bg-amber-100 text-amber-900'
                            }`}
                          >
                            {inq.status === 'reserved' ? '已锁定' : inq.status === 'contacted' ? '已联系' : '待处理'}
                          </span>
                        </div>

                        <div className="text-xs space-y-1 text-neutral-600">
                          <div>
                            <strong className="text-neutral-800">意向套房:</strong> {inq.suiteNameZh}
                          </div>
                          <div>
                            <strong className="text-neutral-800">联系方式:</strong>{' '}
                            <span className="font-mono bg-neutral-100 px-1.5 py-0.5 rounded">
                              {inq.contactChannel.toUpperCase()}: {inq.contactValue}
                            </span>
                          </div>
                          <div>
                            <strong className="text-neutral-800">计划日期:</strong> {inq.checkInDate || '未定'} ~{' '}
                            {inq.checkOutDate || '未定'} ({inq.guestsCount})
                          </div>
                          {inq.specialRequests && (
                            <p className="text-[11px] text-neutral-500 italic bg-amber-50/50 p-2 rounded-lg border border-amber-200/50 mt-2">
                              &ldquo;{inq.specialRequests}&rdquo;
                            </p>
                          )}
                          {inq.staffNotes && (
                            <p className="text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200 mt-1">
                              管家备注: {inq.staffNotes}
                            </p>
                          )}
                        </div>
                      </div>

                      {hasPerm('inquiries:manage') && (
                        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                          <span className="text-[10px] text-neutral-400 font-mono">{inq.createdAt}</span>
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => handleUpdateInquiryStatus(inq.id, 'contacted')}
                              className="px-2.5 py-1 rounded bg-neutral-100 text-[11px] text-neutral-700 hover:bg-blue-100 hover:text-blue-900"
                            >
                              标为已联系
                            </button>
                            <button
                              onClick={() => handleUpdateInquiryStatus(inq.id, 'reserved')}
                              className="px-2.5 py-1 rounded bg-amber-100 text-[11px] text-amber-900 hover:bg-emerald-100 hover:text-emerald-900"
                            >
                              锁定定金
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Analytics & Source Insights */}
            {activeTab === 'analytics' && hasPerm('analytics:view') && (
              <div className="space-y-6">
                {/* 4 KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 bg-white rounded-2xl border border-yojqi-border shadow-xs space-y-1">
                    <span className="text-xs font-mono text-neutral-400 uppercase">全站总浏览量 (PV)</span>
                    <h3 className="font-serif text-3xl font-bold text-yojqi-ink">
                      {analytics.totalPageViews.toLocaleString()}
                    </h3>
                    <span className="text-[11px] font-mono text-emerald-600 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> 今日 +{analytics.todayPageViews} 次
                    </span>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-yojqi-border shadow-xs space-y-1">
                    <span className="text-xs font-mono text-neutral-400 uppercase">独立访客数 (UV)</span>
                    <h3 className="font-serif text-3xl font-bold text-yojqi-ink">
                      {analytics.totalUniqueVisitors.toLocaleString()}
                    </h3>
                    <span className="text-[11px] font-mono text-emerald-600 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> 今日 +{analytics.todayUniqueVisitors} 人
                    </span>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-yojqi-border shadow-xs space-y-1">
                    <span className="text-xs font-mono text-neutral-400 uppercase">平均停留时长</span>
                    <h3 className="font-serif text-3xl font-bold text-yojqi-ink">{analytics.avgTimeOnSite}</h3>
                    <span className="text-[11px] font-mono text-neutral-500">高沉浸静心体验</span>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-yojqi-border shadow-xs space-y-1">
                    <span className="text-xs font-mono text-neutral-400 uppercase">全站转化率 (CRO)</span>
                    <h3 className="font-serif text-3xl font-bold text-emerald-700">{analytics.conversionRate}</h3>
                    <span className="text-[11px] font-mono text-emerald-600">加购与预约询盘表现优异</span>
                  </div>
                </div>

                {/* Grid: Traffic Sources & Geo Locations */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left: Sources */}
                  <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-yojqi-border shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                      <h4 className="font-serif text-base font-bold text-yojqi-ink flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-yojqi-bronze" />
                        <span>流量来源渠道分析</span>
                      </h4>
                      <span className="text-xs font-mono text-neutral-400">近 7 日占比</span>
                    </div>

                    <div className="space-y-3">
                      {analytics.sources.map((src, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-medium text-neutral-700">{src.sourceZh}</span>
                            <div className="space-y-0.5 text-right font-mono">
                              <span className="font-bold text-yojqi-ink mr-2">{src.percentage}%</span>
                              <span className="text-[10px] text-emerald-600 font-semibold">{src.change}</span>
                            </div>
                          </div>
                          <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yojqi-ink rounded-full transition-all"
                              style={{ width: `${src.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Geo Location */}
                  <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-yojqi-border shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                      <h4 className="font-serif text-base font-bold text-yojqi-ink flex items-center gap-2">
                        <Globe className="w-4 h-4 text-amber-700" />
                        <span>全球访客国家与城市分布</span>
                      </h4>
                      <span className="text-xs font-mono text-neutral-400">海外占比 52%</span>
                    </div>

                    <div className="space-y-3">
                      {analytics.geoDistribution.map((geo, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50 text-xs">
                          <div>
                            <strong className="text-yojqi-ink block">{geo.countryZh} ({geo.country})</strong>
                            <span className="text-[11px] text-neutral-400">{geo.cityZh}</span>
                          </div>
                          <div className="text-right font-mono">
                            <span className="font-bold text-yojqi-ink block">{geo.visitors.toLocaleString()} 人</span>
                            <span className="text-[11px] text-neutral-500">{geo.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Top Pages & Device Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Top Pages */}
                  <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-yojqi-border shadow-xs space-y-4">
                    <h4 className="font-serif text-base font-bold text-yojqi-ink">热门受访页面与停留表现</h4>
                    <div className="divide-y divide-neutral-100">
                      {analytics.topPages.map((page, idx) => (
                        <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                          <div className="max-w-md truncate">
                            <span className="font-medium text-yojqi-ink block truncate">{page.titleZh}</span>
                            <span className="text-[11px] font-mono text-neutral-400">{page.path}</span>
                          </div>
                          <div className="flex items-center gap-6 font-mono text-right">
                            <div>
                              <span className="text-neutral-400 text-[10px] block">浏览量</span>
                              <strong className="text-yojqi-ink">{page.views.toLocaleString()}</strong>
                            </div>
                            <div>
                              <span className="text-neutral-400 text-[10px] block">平均停留</span>
                              <span className="text-amber-800 font-semibold">{page.avgDuration}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Device Breakdown */}
                  <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-yojqi-border shadow-xs space-y-4">
                    <h4 className="font-serif text-base font-bold text-yojqi-ink">终端访问比例</h4>
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                        <div className="flex items-center gap-2 text-xs">
                          <Smartphone className="w-4 h-4 text-yojqi-bronze" />
                          <span>移动端 (Mobile iOS/Android)</span>
                        </div>
                        <strong className="font-mono text-xs">{analytics.deviceBreakdown.mobile}%</strong>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                        <div className="flex items-center gap-2 text-xs">
                          <Monitor className="w-4 h-4 text-yojqi-bronze" />
                          <span>桌面端 (Desktop PC/Mac)</span>
                        </div>
                        <strong className="font-mono text-xs">{analytics.deviceBreakdown.desktop}%</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Users & RBAC Permissions (Super Admin Only) */}
            {activeTab === 'users' && hasPerm('users:manage') && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-yojqi-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-yojqi-ink">
                      管理员账号与子权限分配控制台
                    </h3>
                    <p className="text-xs text-neutral-500">
                      超级管理员可按业务板块（如发货、客服咨询、流量分析）独立创建子账号并精细化下发模块权限。
                    </p>
                  </div>

                  <button
                    onClick={() => setShowAddUserModal(true)}
                    className="px-4 py-2.5 rounded-xl yojqi-btn-primary text-xs font-semibold flex items-center gap-1.5 shadow-sm shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>添加子管理员</span>
                  </button>
                </div>

                {/* Users List */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {adminUsers.map((user) => (
                    <div
                      key={user.id}
                      className="p-6 bg-white rounded-2xl border border-yojqi-border shadow-xs flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between border-b border-neutral-100 pb-3">
                          <div>
                            <h4 className="font-serif text-base font-bold text-yojqi-ink">{user.name}</h4>
                            <span className="text-[11px] font-mono text-neutral-400">@{user.username}</span>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              user.role === 'super_admin'
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-neutral-100 text-neutral-800'
                            }`}
                          >
                            {user.role === 'super_admin' ? '一级·超管' : '二级·专管员'}
                          </span>
                        </div>

                        <div className="space-y-1.5 text-xs text-neutral-600">
                          <div>
                            <strong>邮箱:</strong> {user.email}
                          </div>
                          <div>
                            <strong>岗位定位:</strong> {user.roleNameZh}
                          </div>
                          <div>
                            <strong>已开通权限:</strong>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {user.permissions.map((p) => (
                                <span
                                  key={p}
                                  className="px-2 py-0.5 rounded bg-neutral-100 text-[10px] font-mono text-neutral-700"
                                >
                                  {p === 'orders:view' || p === 'orders:manage'
                                    ? '订单发货'
                                    : p === 'inquiries:view' || p === 'inquiries:manage'
                                    ? '宿集客服'
                                    : p === 'analytics:view'
                                    ? '流量分析'
                                    : '超管权限'}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                        <span className="text-[10px] text-neutral-400">最近登录: {user.lastLoginAt || '未记录'}</span>
                        {user.role !== 'super_admin' && (
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-rose-600 hover:text-rose-800 text-xs flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>移除</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Order & Shipping Modal */}
      {editingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 border border-yojqi-border shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-yojqi-ink">处理订单与物流发货</h3>
                <span className="font-mono text-xs text-neutral-400">{editingOrder.orderNumber}</span>
              </div>
              <button onClick={() => setEditingOrder(null)} className="text-neutral-400 hover:text-yojqi-ink">
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-neutral-700 mb-1">订单状态</label>
                <select
                  value={orderStatusInput}
                  onChange={(e) => setOrderStatusInput(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-neutral-200 bg-white"
                >
                  <option value="paid">已支付 (待备货)</option>
                  <option value="processing">装箱质检中 (待揽收)</option>
                  <option value="shipped">已发货 (干线运输中)</option>
                  <option value="delivered">已完成送达</option>
                  <option value="cancelled">已取消</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">承运快递公司</label>
                  <select
                    value={carrierInput}
                    onChange={(e) => {
                      const c = e.target.value as any;
                      setCarrierInput(c);
                      if (c === 'sf_express') setCarrierNameInput('顺丰国际特惠专线');
                      else if (c === 'dhl') setCarrierNameInput('DHL 航空国际特快');
                      else if (c === 'fedex') setCarrierNameInput('FedEx 联邦国际快递');
                      else if (c === 'ems') setCarrierNameInput('中国邮政 EMS 国际特快');
                    }}
                    className="w-full p-2.5 rounded-xl border border-neutral-200 bg-white"
                  >
                    <option value="sf_express">顺丰国际 / 顺丰特快</option>
                    <option value="dhl">DHL 航空国际特快</option>
                    <option value="fedex">FedEx 联邦快递</option>
                    <option value="ems">EMS 邮政特快</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-neutral-700 mb-1">物流运单号</label>
                  <input
                    type="text"
                    value={trackingNumberInput}
                    onChange={(e) => setTrackingNumberInput(e.target.value)}
                    placeholder="如: SF198302918848"
                    className="w-full p-2.5 rounded-xl border border-neutral-200 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">管理员跟单备注</label>
                <textarea
                  rows={2}
                  value={adminNotesInput}
                  onChange={(e) => setAdminNotesInput(e.target.value)}
                  placeholder="如：朱砂法印已盖章、附赠随身纯棉锦囊..."
                  className="w-full p-2.5 rounded-xl border border-neutral-200 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
              <button
                onClick={() => setEditingOrder(null)}
                className="px-4 py-2 rounded-xl border border-neutral-200 text-xs font-medium"
              >
                取消
              </button>
              <button
                onClick={handleSaveOrder}
                className="px-5 py-2 rounded-xl yojqi-btn-primary text-xs font-semibold"
              >
                保存并同步物流轨迹
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Sub-Admin Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 border border-yojqi-border shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-serif text-lg font-bold text-yojqi-ink">创建二级子管理员并分配权限</h3>
              <button onClick={() => setShowAddUserModal(false)} className="text-neutral-400 hover:text-yojqi-ink">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-neutral-700 mb-1">登录账号 *</label>
                <input
                  type="text"
                  required
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="如: staff_shipping_01"
                  className="w-full p-2.5 rounded-xl border border-neutral-200"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">姓名 / 岗位 *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="如: 发货主管 · 李明"
                  className="w-full p-2.5 rounded-xl border border-neutral-200"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">电子邮箱 *</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="staff@yojqi.com"
                  className="w-full p-2.5 rounded-xl border border-neutral-200"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1.5">赋予业务板块权限 (多选)</label>
                <div className="space-y-2 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newPermissions.includes('orders:view')}
                      onChange={(e) => {
                        if (e.target.checked) setNewPermissions([...newPermissions, 'orders:view', 'orders:manage']);
                        else setNewPermissions(newPermissions.filter((p) => !p.startsWith('orders')));
                      }}
                      className="rounded"
                    />
                    <span>订单与物流发货管理权限 (仅可查看/操作订单板块)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newPermissions.includes('inquiries:view')}
                      onChange={(e) => {
                        if (e.target.checked) setNewPermissions([...newPermissions, 'inquiries:view', 'inquiries:manage']);
                        else setNewPermissions(newPermissions.filter((p) => !p.startsWith('inquiries')));
                      }}
                      className="rounded"
                    />
                    <span>重庆宿集与客服咨询权限 (仅可跟进/处理咨询工单)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newPermissions.includes('analytics:view')}
                      onChange={(e) => {
                        if (e.target.checked) setNewPermissions([...newPermissions, 'analytics:view']);
                        else setNewPermissions(newPermissions.filter((p) => p !== 'analytics:view'));
                      }}
                      className="rounded"
                    />
                    <span>流量与来源数据分析权限 (查看全站数据表现)</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 text-xs font-medium"
                >
                  取消
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl yojqi-btn-primary text-xs font-semibold">
                  立即创建管理员
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
