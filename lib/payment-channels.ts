/**
 * Direct Payment Channel Configurations for YOJQI Direct Booking
 * 
 * Supports user-configured direct accounts:
 * 1. Alipay (支付宝 - 扫码/转账，支持绑定账号与收款码)
 * 2. PayPal (PayPal.me 专属直付链接 / 国际账户)
 * 3. Wise (跨境多币种汇款 / 专属参考编号与银行账户)
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
}

export const PAYMENT_CHANNELS: PaymentChannelConfig[] = [
  {
    id: 'alipay',
    nameZh: '支付宝 (Alipay)',
    nameEn: 'Alipay',
    badgeZh: '国内即时支付',
    badgeEn: 'Instant QR / Mobile Pay',
    descriptionZh: '支持中国大陆手机支付宝扫码、转账或跨境 TourPass。秒级生成唯一核销码。',
    descriptionEn: 'Scan to pay or transfer via Alipay. Instant verification with reference code.',
    iconName: 'Smartphone',
  },
  {
    id: 'paypal',
    nameZh: 'PayPal 国际直付',
    nameEn: 'PayPal Checkout',
    badgeZh: '海外主流外卡/钱包',
    badgeEn: 'Global Cards & Wallets',
    descriptionZh: '支持全球 200+ 国家与地区信用卡 (Visa / Mastercard) 或 PayPal 账户即时结算。',
    descriptionEn: 'Pay instantly via PayPal balance or international credit cards with zero friction.',
    iconName: 'CreditCard',
  },
  {
    id: 'wise',
    nameZh: 'Wise 跨境电汇',
    nameEn: 'Wise International Wire',
    badgeZh: '极低汇损 · 多币种',
    badgeEn: 'Lowest FX Fees · Multi-Currency',
    descriptionZh: '支持 USD / EUR / GBP / AUD 等多币种本地清算，附带专属订单参考号，免除昂贵外卡刷卡费。',
    descriptionEn: 'Local bank transfers via Wise in USD, EUR, GBP, AUD. Avoid expensive credit card surcharge.',
    iconName: 'Globe',
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
      account: process.env.NEXT_PUBLIC_ALIPAY_ACCOUNT || 'yojqi@outlook.com',
      payeeName: process.env.NEXT_PUBLIC_ALIPAY_NAME || '重庆白虹两江汇宿集',
      qrImageUrl: process.env.NEXT_PUBLIC_ALIPAY_QR_IMAGE || '',
      instructionsZh: '请打开手机支付宝，转账至上述账号或扫描收款码，转账备注务必填写【预订参考码】。提交后系统将即刻为您锁定保留房源。',
      instructionsEn: 'Open Alipay, transfer to the payee account, and quote your Booking Reference Code in the remarks. Room will be guaranteed immediately upon submission.',
    },
    paypal: {
      payPalMeUrl: process.env.NEXT_PUBLIC_PAYPAL_ME_URL || 'https://paypal.me/yojqi',
      email: process.env.NEXT_PUBLIC_PAYPAL_EMAIL || 'payments@yojqi.com',
      instructionsZh: '系统将引导您前往专属 PayPal 快速收银通道，支付时请备注订单参考号。完成后系统自动生成官方入住凭据与确认码。',
      instructionsEn: 'Click to open PayPal checkout. Please enter your Booking Reference in the payment note. Official stay voucher will be issued upon completion.',
    },
    wise: {
      accountHolder: process.env.NEXT_PUBLIC_WISE_HOLDER_NAME || 'YOJQI SANCTUARY RETREATS',
      wiseTag: process.env.NEXT_PUBLIC_WISE_TAG || '@yojqi',
      email: process.env.NEXT_PUBLIC_WISE_EMAIL || 'concierge@yojqi.com',
      usdRouting: process.env.NEXT_PUBLIC_WISE_USD_ROUTING || '026073150 (Evolve Bank)',
      usdAccountNumber: process.env.NEXT_PUBLIC_WISE_USD_ACCOUNT || '9608221840',
      eurIban: process.env.NEXT_PUBLIC_WISE_EUR_IBAN || 'BE62 9670 1284 9912',
      swiftBic: process.env.NEXT_PUBLIC_WISE_SWIFT || 'EVBLUS3N',
      instructionsZh: '请在 Wise App 或银行端向上述账户汇款，转账附言（Reference）务必严格填写您的【专属参考码】。系统已为您优先保留该房源。',
      instructionsEn: 'Transfer via Wise App or wire to the account above. ALWAYS put your unique Reference Code in the transfer note so our concierge can reconcile instantly.',
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
