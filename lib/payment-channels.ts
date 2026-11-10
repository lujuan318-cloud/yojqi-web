/**
 * Direct Payment Channel Configurations for YOJQI Direct Booking & E-Commerce
 * 
 * Supports user-configured direct accounts:
 * 1. 微信 / 支付宝聚合扫码 (重庆农商行渝快付聚合码 - 支持微信支付、支付宝、云闪付)
 * 2. PayPal (paypal.me/BaihongYojqi - 国际信用卡/借记卡/PayPal账户即时结算)
 * 3. Wise (https://wise.com/pay/me/juanl4209 - Wise App扫码 / 专属链接，超低汇损多币种)
 */

export interface PaymentChannelConfig {
  id: 'alipay' | 'paypal' | 'wise';
  nameZh: string;
  nameEn: string;
  badgeZh: string;
  badgeEn: string;
  descriptionZh: string;
  descriptionEn: string;
  iconName: string;
  qrImageUrl?: string;
  directUrl?: string;
}

export const PAYMENT_CHANNELS: PaymentChannelConfig[] = [
  {
    id: 'alipay',
    nameZh: '微信 / 支付宝聚合扫码',
    nameEn: 'WeChat Pay & Alipay (Universal QR)',
    badgeZh: '微信 / 支付宝均可扫码',
    badgeEn: 'Universal Mobile Pay',
    descriptionZh: '支持手机微信、支付宝或银联云闪付直接扫码支付。无需切换，一码通用。',
    descriptionEn: 'Scan with WeChat Pay, Alipay or UnionPay app. Universal QR code for instant RMB payment.',
    iconName: 'Smartphone',
    qrImageUrl: '/images/payment/aggregate-qr.png',
  },
  {
    id: 'paypal',
    nameZh: 'PayPal 国际直付',
    nameEn: 'PayPal Direct Checkout',
    badgeZh: '全球外卡 / PayPal 账户',
    badgeEn: 'Global Cards & Wallets',
    descriptionZh: '直达 paypal.me/BaihongYojqi，支持全球 200+ 国家信用卡 (Visa/Mastercard) 与 PayPal 余额。',
    descriptionEn: 'Pay instantly via paypal.me/BaihongYojqi with global credit cards or PayPal balance.',
    iconName: 'CreditCard',
    directUrl: 'https://paypal.me/BaihongYojqi',
  },
  {
    id: 'wise',
    nameZh: 'Wise 跨境直付 / 扫码',
    nameEn: 'Wise Multi-Currency Pay',
    badgeZh: '极低汇损 · 支持 Wise 扫码',
    badgeEn: 'Lowest FX Fees · Scan to Pay',
    descriptionZh: '支持 Wise App 扫码或访问付款主页，超低汇损直付 USD / EUR / GBP / AUD / HKD 等多币种。',
    descriptionEn: 'Scan via Wise App or pay via https://wise.com/pay/me/juanl4209 with real mid-market exchange rates.',
    iconName: 'Globe',
    qrImageUrl: '/images/payment/wise-qr.jpg',
    directUrl: 'https://wise.com/pay/me/juanl4209',
  },
];

export interface DirectAccountDetails {
  alipay: {
    account: string;
    payeeName: string;
    qrImageUrl: string;
    instructionsZh: string;
    instructionsEn: string;
  };
  paypal: {
    payPalMeUrl: string;
    email: string;
    instructionsZh: string;
    instructionsEn: string;
  };
  wise: {
    payUrl: string;
    qrImageUrl: string;
    accountHolder: string;
    wiseTag: string;
    email: string;
    usdRouting: string;
    usdAccountNumber: string;
    eurIban: string;
    swiftBic: string;
    instructionsZh: string;
    instructionsEn: string;
  };
}

export function getDirectAccountDetails(): DirectAccountDetails {
  return {
    alipay: {
      account: process.env.NEXT_PUBLIC_ALIPAY_ACCOUNT || '微信 / 支付宝聚合收单 (重庆农商行)',
      payeeName: process.env.NEXT_PUBLIC_ALIPAY_NAME || '百弘江景民宿 / YOJQI SANCTUARY',
      qrImageUrl: process.env.NEXT_PUBLIC_AGGREGATE_QR_IMAGE || '/images/payment/aggregate-qr.png',
      instructionsZh: '请使用手机微信或支付宝扫描上方专属收款码完成付款。支付时请在备注栏填入您的【专属参考码】。提交后系统将即刻锁定房源或安排出库。',
      instructionsEn: 'Scan the universal QR code with WeChat or Alipay. Please input your unique Reference Code in the transfer remarks so our concierge can reconcile immediately.',
    },
    paypal: {
      payPalMeUrl: process.env.NEXT_PUBLIC_PAYPAL_ME_URL || 'https://paypal.me/BaihongYojqi',
      email: process.env.NEXT_PUBLIC_PAYPAL_EMAIL || 'BaihongYojqi',
      instructionsZh: '点击下方按钮直达 PayPal.me 快速付款通道。支持全球 Visa / MasterCard 国际信用卡或 PayPal 余额，转账时请备注专属参考码。',
      instructionsEn: 'Click the button to open paypal.me/BaihongYojqi. Supports global credit/debit cards or PayPal balance. Quote your Reference Code in the payment note.',
    },
    wise: {
      payUrl: process.env.NEXT_PUBLIC_WISE_PAY_URL || 'https://wise.com/pay/me/juanl4209',
      qrImageUrl: process.env.NEXT_PUBLIC_WISE_QR_IMAGE || '/images/payment/wise-qr.jpg',
      accountHolder: process.env.NEXT_PUBLIC_WISE_HOLDER_NAME || 'YOJQI / Juan L',
      wiseTag: process.env.NEXT_PUBLIC_WISE_TAG || '@juanl4209',
      email: process.env.NEXT_PUBLIC_WISE_EMAIL || 'concierge@yojqi.com',
      usdRouting: process.env.NEXT_PUBLIC_WISE_USD_ROUTING || '026073150 (Evolve Bank)',
      usdAccountNumber: process.env.NEXT_PUBLIC_WISE_USD_ACCOUNT || '9608221840',
      eurIban: process.env.NEXT_PUBLIC_WISE_EUR_IBAN || 'BE62 9670 1284 9912',
      swiftBic: process.env.NEXT_PUBLIC_WISE_SWIFT || 'EVBLUS3N',
      instructionsZh: '支持使用 Wise App 直接扫描上方二维码，或点击按钮跳转至 Wise 付款主页完成低汇损直付，转账附言（Reference）务必严格填写您的【专属参考码】。',
      instructionsEn: 'Scan the QR code with your Wise App or click through to https://wise.com/pay/me/juanl4209. Please enter your unique Reference Code in the transfer note.',
    },
  };
}

/**
 * Generate human-readable unique reference code for direct payments
 */
export function generateBookingReference(channel: 'alipay' | 'paypal' | 'wise' | 'direct'): string {
  const prefix = channel.toUpperCase().slice(0, 3);
  const timeHex = Date.now().toString(36).toUpperCase().slice(-4);
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `YQ-${prefix}-${timeHex}${randomNum}`;
}
