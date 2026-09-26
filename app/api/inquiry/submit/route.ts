import { NextRequest, NextResponse } from 'next/server';

const WECHAT_WEBHOOK_URL =
  process.env.WECHAT_WEBHOOK_URL ||
  'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=bbd302ab-131c-40c7-9675-572099f22ac7';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, contact, contactType, suite, checkInDate, checkOutDate, guests, notes, lang } = body;

    if (!name || !contact) {
      return NextResponse.json(
        { error: 'Name and contact are required.' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });

    // Format markdown payload for Enterprise WeChat Webhook
    const wechatPayload = {
      msgtype: 'markdown',
      markdown: {
        content: `### 🚀 【YOJQI 官网】收到高空两江无人机宿集预约！
> **提交时间**：<font color="comment">${timestamp}</font>
> **客户姓名**：<font color="info">${name}</font>
> **联系方式**：<font color="warning">${contactType || '微信/手机'} : ${contact}</font>
> **意向套房**：**${suite || '未指定套房 (由管家推荐)'}**
> **入住日期**：${checkInDate || '未定'} 至 ${checkOutDate || '未定'}
> **同行人数**：${guests || '1-2'} 人
> **语言偏好**：${lang === 'zh' ? '中文 (ZH)' : '英文 (EN)'}
> **客户留言**：${notes ? notes : '无特别备注'}

*请值班 VIP 管家于 15 分钟内联系客户确认房态及无人机天幕机位！*`,
      },
    };

    // Send to Enterprise WeChat Webhook
    try {
      await fetch(WECHAT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(wechatPayload),
      });
    } catch (webhookErr) {
      console.error('WeChat Webhook Dispatch Error:', webhookErr);
    }

    return NextResponse.json({
      success: true,
      message: lang === 'zh'
        ? '预约意向已成功送达管家团队，我们将尽快与您联系！'
        : 'Your reservation inquiry has been forwarded to our VIP concierge team!',
    });
  } catch (error) {
    console.error('Inquiry Submission Error:', error);
    return NextResponse.json(
      { error: 'Internal server error while processing inquiry.' },
      { status: 500 }
    );
  }
}
