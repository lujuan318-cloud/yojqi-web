export type UserState = 'anonymous' | 'new_user' | 'returning_user' | 'long_term_user';

export type UserNeed = 'sleep' | 'relax' | 'reset' | 'focus' | 'balance' | 'explore';

export interface OnboardingAnswers {
  need: string;
  feeling: string;
  desiredState: string;
  completedAt?: string;
}

export interface DailyBalanceState {
  date: string;
  sleep: number; // 0 - 100
  energy: number;
  mood: number;
  stress: number;
  focus: number;
  relaxation: number;
}

export interface Ritual {
  id: string;
  titleEn: string;
  titleZh: string;
  subtitleEn: string;
  subtitleZh: string;
  duration: string;
  need: UserNeed;
  stepsEn: string[];
  stepsZh: string[];
  recommendedTimeEn: string;
  recommendedTimeZh: string;
  pairedProductSlug?: string;
  pairedProductNameEn?: string;
  pairedProductNameZh?: string;
}

export interface CompanionMessage {
  id: string;
  sender: 'user' | 'companion';
  text: string;
  mode?: 'talk' | 'reset' | 'ritual' | 'reflect' | 'explore';
  suggestedActions?: {
    id: string;
    labelEn: string;
    labelZh: string;
    action: string;
  }[];
  timestamp: string;
}

export interface CommunityPost {
  id: string;
  feelingCategory: 'tired' | 'stressed' | 'lonely' | 'restless' | 'happy' | 'grateful' | 'hopeful' | 'talk';
  feelingLabelEn: string;
  feelingLabelZh: string;
  content: string;
  authorAlias: string;
  city: string;
  timestamp: string;
  feelYouCount: number;
  hasFeltYou?: boolean;
  notes: {
    id: string;
    author: string;
    content: string;
    timestamp: string;
  }[];
  careItems: {
    id: string;
    from: string;
    type: 'note' | 'ritual' | 'tea' | 'incense' | 'gift';
    typeLabelEn: string;
    typeLabelZh: string;
    message: string;
    timestamp: string;
  }[];
}

export interface UserPreferences {
  preferredScent: string;
  preferredTea: string;
  preferredRitualLength: string;
  preferredTime: string;
  environment: string;
}

export interface UserJourneyProfile {
  userId: string;
  userState: UserState;
  currentJourneyEn: string;
  currentJourneyZh: string;
  currentGoalEn: string;
  currentGoalZh: string;
  onboarding?: OnboardingAnswers;
  todayBalance: DailyBalanceState;
  historicalBalances: DailyBalanceState[];
  completedRitualIds: string[];
  likedRitualIds: string[];
  preferences: UserPreferences;
  recentPatternsEn: string[];
  recentPatternsZh: string[];
  careSentCount: number;
  careReceivedCount: number;
}

// -----------------------------------------------------------------------------
// Seed: Authentic Rituals
// -----------------------------------------------------------------------------
export const SEED_RITUALS: Ritual[] = [
  {
    id: 'ritual-evening-reset',
    titleEn: '10-Minute Evening Reset',
    titleZh: '十分钟晚间收束仪式',
    subtitleEn: 'Disengage from digital luminescence and settle respiratory rhythm.',
    subtitleZh: '熄灭屏幕蓝光干扰，借由植物清气引导呼吸下沉。',
    duration: '10 mins',
    need: 'sleep',
    stepsEn: [
      'Gently place phones and laptops outside arm’s reach.',
      'Hold the ambergris or agarwood anchor between index and thumb.',
      'Perform four cycles of the 4-7-8 somatic breath pacing.',
      'Sip a warm cup of roasted barley or wild poria infusion.'
    ],
    stepsZh: [
      '将手机与电子屏置于触手不可及的安静角落。',
      '指尖轻捻沉香或龙涎香珠，感受其天然微孔的温润触感。',
      '跟随 4-7-8 呼吸节律完成四组腹式吐纳，让肩颈逐渐松沉。',
      '啜饮半盏温热的大麦茯苓清茶，允许身心完整着陆。'
    ],
    recommendedTimeEn: 'Bedtime (21:30 - 23:00)',
    recommendedTimeZh: '睡前 (21:30 - 23:00)',
    pairedProductSlug: 'wrist-anchor-ambergris-ease-bracelet',
    pairedProductNameEn: 'Wrist Anchor — Ambergris Ease Bracelet',
    pairedProductNameZh: '腕间锚点 — 龙涎舒缓定心手绳'
  },
  {
    id: 'ritual-midday-focus',
    titleEn: 'Afternoon Clarity & Mist Cleansing',
    titleZh: '午后清明凝神小憩',
    subtitleEn: 'Interrupt cognitive loops and clear brain fog after heavy screen sessions.',
    subtitleZh: '阻断思绪打转，以清冽龙脑气场唤醒沉滞神识。',
    duration: '5 mins',
    need: 'focus',
    stepsEn: [
      'Close eyes and lightly massage temple pulse points.',
      'Draw three deep inhalations of natural borneol botanical vapor.',
      'Gaze softly into the horizon or natural green daylight for 60 seconds.'
    ],
    stepsZh: [
      '轻阖双眼，食指以微温轻按太阳穴与耳后风池。',
      '深吸三次龙脑薄荷草木微循环，感受清凉贯通百会。',
      '望向窗外远方天际线或自然绿意，放空视线 60 秒。'
    ],
    recommendedTimeEn: 'Afternoon (14:00 - 16:00)',
    recommendedTimeZh: '午后 (14:00 - 16:00)',
    pairedProductSlug: 'kinetic-resonance-somatic-ring',
    pairedProductNameEn: 'Kinetic Resonance — Somatic Tension Ring',
    pairedProductNameZh: '指间微动 — 律动指环'
  },
  {
    id: 'ritual-boundary-grounding',
    titleEn: 'Boundary Grounding & Auric Centering',
    titleZh: '正念定境 · 能量安神结界',
    subtitleEn: 'Shield emotional boundaries when stepping into high-demand social settings.',
    subtitleZh: '在应对密集社交或嘈杂职场前，为神识筑起温润护界。',
    duration: '8 mins',
    need: 'balance',
    stepsEn: [
      'Straighten spine and place feet flat against the earth.',
      'Touch your consecrated talisman or pulse pendant discreetly.',
      'Silently affirm: "I carry my sanctuary with me; exterior chaos passes around me."',
      'Observe heartbeats settle into quiet coherence.'
    ],
    stepsZh: [
      '端坐正身，双足平踏地面，感知地心安稳托力。',
      '掌心轻抚随身护持灵符或脉搏挂坠，调匀呼吸。',
      '默念定心意图：“外界喧嚣自生自灭，吾身如松静观其流。”',
      '觉察心跳回归和缓节律，从容步入当下事务。'
    ],
    recommendedTimeEn: 'Morning & Transition Times',
    recommendedTimeZh: '清晨或状态转换时',
    pairedProductSlug: 'talisman-peace-safety-guanyin',
    pairedProductNameEn: 'Nine Heavens Serenity & Auric Peace Talisman',
    pairedProductNameZh: '九天玄女太上清静定心符'
  },
  {
    id: 'ritual-quiet-listening',
    titleEn: 'Tea & Solitude Quiet Moment',
    titleZh: '一盏独坐 · 听水煮茶',
    subtitleEn: 'A sensory homecoming celebrating stillness over productivity.',
    subtitleZh: '不求产出，不解谜题，仅留一段完全属于自我的私享时光。',
    duration: '15 mins',
    need: 'relax',
    stepsEn: [
      'Boil spring water and watch rising steam swirl upwards.',
      'Steep raw mountain white tea or ancient arbor pu-erh.',
      'Listen to water sounds, inhaling warm wooden scent without rushing.'
    ],
    stepsZh: [
      '注泉水入壶，静观炉上微沸水汽与轻烟袅袅。',
      '投少许深山野白茶或陈年古树生普入盖碗。',
      '聆听水沸之音，细嗅木质茶香，不慌不忙饮尽半盏。'
    ],
    recommendedTimeEn: 'Dusk or Twilight (18:00 - 19:30)',
    recommendedTimeZh: '黄昏入夜时分 (18:00 - 19:30)'
  }
];

// -----------------------------------------------------------------------------
// Seed: Community Posts (Calm, Anonymous, Human, Editorial)
// -----------------------------------------------------------------------------
export const SEED_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-01',
    feelingCategory: 'tired',
    feelingLabelEn: 'Tired',
    feelingLabelZh: '身心疲惫',
    content: 'Today was harder than I expected. Closed my laptop at 9 PM and just sat in the dim living room listening to the rain outside for an hour without turning on any lights.',
    authorAlias: 'A wandering soul in London',
    city: 'London',
    timestamp: '2 hours ago',
    feelYouCount: 24,
    hasFeltYou: false,
    notes: [
      {
        id: 'note-01-1',
        author: 'Quiet Tea Drinker',
        content: 'Rain in the dark is its own quiet sanctuary. Hope you rest well tonight.',
        timestamp: '1 hour ago'
      }
    ],
    careItems: [
      {
        id: 'care-01-1',
        from: 'Someone in Kyoto',
        type: 'tea',
        typeLabelEn: 'Warm Roasted Barley Tea',
        typeLabelZh: '一盏温热大麦茶',
        message: 'May this warm cup accompany your quiet evening.',
        timestamp: '45 mins ago'
      }
    ]
  },
  {
    id: 'post-02',
    feelingCategory: 'stressed',
    feelingLabelEn: 'Stressed',
    feelingLabelZh: '思绪纷扰',
    content: 'Too many deadlines converging this week. My shoulders were glued to my ears all afternoon until I remembered to take a deep breath and touch my wrist beads.',
    authorAlias: 'Architect by the bay',
    city: 'San Francisco',
    timestamp: '4 hours ago',
    feelYouCount: 42,
    hasFeltYou: true,
    notes: [
      {
        id: 'note-02-1',
        author: 'Mountain Wanderer',
        content: 'Drop your shoulders by an inch right now. Unclench your jaw. You are safe here.',
        timestamp: '3 hours ago'
      }
    ],
    careItems: [
      {
        id: 'care-02-1',
        from: 'A fellow pilgrim',
        type: 'ritual',
        typeLabelEn: '4-7-8 Somatic Breathing Ritual',
        typeLabelZh: '4-7-8 呼吸引导小仪式',
        message: 'Try four cycles before opening your next email.',
        timestamp: '2 hours ago'
      }
    ]
  },
  {
    id: 'post-03',
    feelingCategory: 'grateful',
    feelingLabelEn: 'Grateful',
    feelingLabelZh: '心怀从容',
    content: '终于给自己留出了一个没有任何工作安排的夜晚。点燃一根线香，看着两江交汇处的渡轮缓缓滑过水面，生活本该有这样的留白。',
    authorAlias: '山城江畔旅人',
    city: 'Chongqing',
    timestamp: '6 hours ago',
    feelYouCount: 68,
    hasFeltYou: false,
    notes: [
      {
        id: 'note-03-1',
        author: '云中独坐者',
        content: '江风与香气，最懂抚平人间的匆忙。',
        timestamp: '5 hours ago'
      }
    ],
    careItems: []
  },
  {
    id: 'post-04',
    feelingCategory: 'talk',
    feelingLabelEn: 'Just need to talk',
    feelingLabelZh: '无处安放的心绪',
    content: 'I don’t need advice. I don’t need a productivity hack. I just wanted to say this somewhere without being told to fix it.',
    authorAlias: 'A night owl in Singapore',
    city: 'Singapore',
    timestamp: '8 hours ago',
    feelYouCount: 89,
    hasFeltYou: false,
    notes: [
      {
        id: 'note-04-1',
        author: 'Night Listener',
        content: 'You are heard. Nothing needs fixing tonight.',
        timestamp: '7 hours ago'
      }
    ],
    careItems: [
      {
        id: 'care-04-1',
        from: 'A friend across oceans',
        type: 'note',
        typeLabelEn: 'Gentle Affirmation Note',
        typeLabelZh: '温润定心手札',
        message: 'You deserve to just exist tonight, exactly as you are.',
        timestamp: '6 hours ago'
      }
    ]
  }
];

// -----------------------------------------------------------------------------
// Seed: Default User Journey Profile
// -----------------------------------------------------------------------------
export const INITIAL_USER_PROFILE: UserJourneyProfile = {
  userId: 'yojqi-guest-user',
  userState: 'anonymous',
  currentJourneyEn: 'Tonight’s Quiet Journey',
  currentJourneyZh: '今夕静心修持之旅',
  currentGoalEn: 'Restoring nervous system ease & unhurried sleep.',
  currentGoalZh: '重归神经系统松弛与从容深睡。',
  onboarding: undefined,
  todayBalance: {
    date: new Date().toISOString().substring(0, 10),
    sleep: 68,
    energy: 62,
    mood: 74,
    stress: 45,
    focus: 70,
    relaxation: 72
  },
  historicalBalances: [
    { date: 'Mon', sleep: 55, energy: 60, mood: 65, stress: 70, focus: 65, relaxation: 50 },
    { date: 'Tue', sleep: 60, energy: 65, mood: 68, stress: 62, focus: 75, relaxation: 58 },
    { date: 'Wed', sleep: 58, energy: 55, mood: 60, stress: 75, focus: 70, relaxation: 52 },
    { date: 'Thu', sleep: 65, energy: 68, mood: 72, stress: 55, focus: 80, relaxation: 65 },
    { date: 'Fri', sleep: 70, energy: 72, mood: 78, stress: 48, focus: 75, relaxation: 70 },
    { date: 'Sat', sleep: 80, energy: 75, mood: 82, stress: 35, focus: 68, relaxation: 82 },
    { date: 'Sun', sleep: 75, energy: 70, mood: 80, stress: 40, focus: 72, relaxation: 78 }
  ],
  completedRitualIds: ['ritual-evening-reset'],
  likedRitualIds: ['ritual-evening-reset', 'ritual-midday-focus'],
  preferences: {
    preferredScent: 'Agarwood & Osmanthus (沉香与金桂)',
    preferredTea: 'Aged Arbor Pu-erh (古树普洱)',
    preferredRitualLength: '5 - 10 minutes',
    preferredTime: 'Late Evening (21:30)',
    environment: 'Quiet bedroom with subtle warm ambient glow'
  },
  recentPatternsEn: [
    'Cognitive activity peaks around 22:00 when screen time continues past dusk.',
    'Somatic grounding rituals consistently bring your breathing rate down within 7 minutes.',
    'You respond most harmoniously to tactile woody scents and roasted tea.'
  ],
  recentPatternsZh: [
    '屏幕使用延展至入夜后，大脑思维活跃度在 22:00 易出现反弹。',
    '随身触觉草木仪式通常能在 7 分钟内引导呼吸回归平稳。',
    '沉香木质调与暖胃熟茶对你的神经系统舒缓响应最明显。'
  ],
  careSentCount: 3,
  careReceivedCount: 5
};
