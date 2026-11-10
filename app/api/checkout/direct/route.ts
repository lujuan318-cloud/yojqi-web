import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface DirectOrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      items,
      customer_name,
      customer_phone,
      customer_email = '',
      shipping_address,
      payment_channel = 'alipay',
      payment_reference = '',
      buyer_notes = '',
      currency = 'USD',
      lang = 'zh',
    } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, error: '购物车为空' }, { status: 400 });
    }

    if (!customer_name || !customer_phone || !shipping_address) {
      return NextResponse.json(
        { success: false, error: '收货人姓名、联系电话与详细收货地址为必填项' },
        { status: 400 }
      );
    }

    // 1. Calculate totals
    const totalAmount = items.reduce(
      (sum: number, it: DirectOrderItem) => sum + (it.price || 0) * (it.quantity || 1),
      0
    );

    // 2. Generate unique official order ID
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `YQ-ORD-${dateStr}-${randSuffix}`;

    const orderRecord = {
      id: orderNumber,
      orderNumber,
      customerName: customer_name.trim(),
      customerPhone: customer_phone.trim(),
      customerEmail: customer_email.trim(),
      shippingAddress: shipping_address.trim(),
      items,
      totalAmount: Math.round(totalAmount * 100) / 100,
      currency: currency.toUpperCase(),
      paymentChannel: payment_channel,
      paymentReference: payment_reference,
      buyerNotes: buyer_notes.trim(),
      orderStatus: 'pending_payment_verification',
      paymentStatus: 'submitted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 3. Save order to persistent file data/admin/orders.json
    try {
      const dataDir = path.join(process.cwd(), 'data', 'admin');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const ordersFile = path.join(dataDir, 'orders.json');
      let ordersList = [];
      if (fs.existsSync(ordersFile)) {
        try {
          const content = fs.readFileSync(ordersFile, 'utf-8');
          ordersList = JSON.parse(content);
        } catch {
          ordersList = [];
        }
      }
      ordersList.unshift(orderRecord);
      fs.writeFileSync(ordersFile, JSON.stringify(ordersList, null, 2), 'utf-8');
    } catch (saveErr) {
      console.error('Failed to save order to disk:', saveErr);
    }

    // 4. Send Instant Rich Notification Card to WeCom Webhook
    const wecomWebhook = process.env.WECOM_WEBHOOK_URL;
    if (wecomWebhook) {
      const channelLabel =
        payment_channel === 'alipay'
          ? '微信 / 支付宝聚合扫码'
          : payment_channel === 'paypal'
          ? 'PayPal 国际直付 (paypal.me/BaihongYojqi)'
          : 'Wise 跨境直付 / 扫码 (wise.com/pay/me/juanl4209)';

      const itemsDesc = items
        .map((it: DirectOrderItem) => `• ${it.name} × ${it.quantity} ($${(it.price * it.quantity).toFixed(2)})`)
        .join('\n');

      const markdownMsg = `### 🛍️【YOJQI 官方商城】收到实物商品直付订单！
> **订单编号**：<font color="warning">${orderNumber}</font>
> **支付渠道**：<font color="info">${channelLabel}</font>
> **付款参考码**：<font color="comment">${payment_reference || '无'}</font>
> **订单总额**：<font color="warning">${currency} $${totalAmount.toFixed(2)}</font>

**客户配送信息**：
- **收件人**：${customer_name}
- **电话**：${customer_phone}
- **邮箱**：${customer_email || '未填'}
- **收货地址**：${shipping_address}
${buyer_notes ? `- **买家留言**：${buyer_notes}\n` : ''}
**订购商品清单**：
${itemsDesc}

> 请尽快核对对应账户（微信/支付宝/PayPal/Wise）收款记录并安排库房打包出库。`;

      try {
        await fetch(wecomWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            msgtype: 'markdown',
            markdown: { content: markdownMsg },
          }),
        });
      } catch (wecomErr) {
        console.error('WeCom dispatch error:', wecomErr);
      }
    }

    return NextResponse.json({
      success: true,
      order_id: orderNumber,
      order_number: orderNumber,
      total_amount: totalAmount,
      currency,
      payment_reference,
    });
  } catch (err: any) {
    console.error('Direct checkout error:', err);
    return NextResponse.json(
      { success: false, error: err.message || '订单创建异常' },
      { status: 500 }
    );
  }
}
