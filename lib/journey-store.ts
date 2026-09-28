import {
  UserJourneyProfile,
  UserState,
  OnboardingAnswers,
  Ritual,
  CommunityPost,
  SEED_RITUALS,
  SEED_COMMUNITY_POSTS,
  INITIAL_USER_PROFILE,
  UserNeed
} from './journey-data';

// In-Memory cache for server/client runtime
let memoryProfile: UserJourneyProfile = { ...INITIAL_USER_PROFILE };
let memoryPosts: CommunityPost[] = [...SEED_COMMUNITY_POSTS];
let memoryRituals: Ritual[] = [...SEED_RITUALS];

const STORAGE_KEY_PROFILE = 'yojqi_v2_profile';
const STORAGE_KEY_POSTS = 'yojqi_v2_posts';

function isClient(): boolean {
  return typeof window !== 'undefined';
}

function loadFromStorage() {
  if (!isClient()) return;
  try {
    const rawProfile = localStorage.getItem(STORAGE_KEY_PROFILE);
    if (rawProfile) {
      memoryProfile = JSON.parse(rawProfile);
    }
    const rawPosts = localStorage.getItem(STORAGE_KEY_POSTS);
    if (rawPosts) {
      memoryPosts = JSON.parse(rawPosts);
    }
  } catch (e) {
    console.error('Failed to load YOJQI V2 storage', e);
  }
}

function saveToStorage() {
  if (!isClient()) return;
  try {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(memoryProfile));
    localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(memoryPosts));
  } catch (e) {
    console.error('Failed to save YOJQI V2 storage', e);
  }
}

// -----------------------------------------------------------------------------
// Profile & User State
// -----------------------------------------------------------------------------
export function getUserProfile(): UserJourneyProfile {
  loadFromStorage();
  return memoryProfile;
}

export function setUserState(newState: UserState): UserJourneyProfile {
  loadFromStorage();
  memoryProfile.userState = newState;
  saveToStorage();
  return memoryProfile;
}

export function saveOnboardingAnswers(answers: OnboardingAnswers): UserJourneyProfile {
  loadFromStorage();
  memoryProfile.onboarding = {
    ...answers,
    completedAt: new Date().toISOString()
  };
  memoryProfile.userState = 'new_user';

  // Customize initial journey headline based on need
  if (answers.need.includes('sleep') || answers.need.includes('睡')) {
    memoryProfile.currentJourneyEn = 'Nocturnal Serenity & Restorative Sleep Journey';
    memoryProfile.currentJourneyZh = '夜间归元 · 安神入眠之旅';
    memoryProfile.currentGoalEn = 'Unhurried sleep without midnight cognitive loops.';
    memoryProfile.currentGoalZh = '告别深夜思绪翻涌，重返深沉自然的睡眠节律。';
  } else if (answers.need.includes('stress') || answers.need.includes('relax') || answers.need.includes('放')) {
    memoryProfile.currentJourneyEn = 'Nervous System Reset & Boundary Grounding';
    memoryProfile.currentJourneyZh = '神经系统松弛与触觉定心之旅';
    memoryProfile.currentGoalEn = 'Dropping physical shoulder tension and releasing daytime noise.';
    memoryProfile.currentGoalZh = '释放肩颈紧绷压力，在嘈杂中寻回内心的温润留白。';
  } else if (answers.need.includes('focus') || answers.need.includes('专')) {
    memoryProfile.currentJourneyEn = 'Steady Mind & Clear Cognitive Flow';
    memoryProfile.currentJourneyZh = '清凉凝神 · 专注破除脑雾之旅';
    memoryProfile.currentGoalEn = 'Cutting through digital distraction and maintaining mindful flow.';
    memoryProfile.currentGoalZh = '阻断碎片信息焦虑，以草木清气保持澄明专注。';
  } else {
    memoryProfile.currentJourneyEn = 'Eastern Living & Mindful Exploration Journey';
    memoryProfile.currentJourneyZh = '东方生活美学与日常修持之旅';
    memoryProfile.currentGoalEn = 'Cultivating slow living rituals and authentic cultural presence.';
    memoryProfile.currentGoalZh = '在日常生活中实践东方慢生活方式与身心照护。';
  }

  saveToStorage();
  return memoryProfile;
}

export function updateTodayBalance(metrics: Partial<UserJourneyProfile['todayBalance']>): UserJourneyProfile {
  loadFromStorage();
  memoryProfile.todayBalance = {
    ...memoryProfile.todayBalance,
    ...metrics
  };
  saveToStorage();
  return memoryProfile;
}

// -----------------------------------------------------------------------------
// Rituals
// -----------------------------------------------------------------------------
export function getAllRituals(): Ritual[] {
  return memoryRituals;
}

export function getRitualById(id: string): Ritual | undefined {
  return memoryRituals.find((r) => r.id === id);
}

export function getRitualsByNeed(need: UserNeed): Ritual[] {
  return memoryRituals.filter((r) => r.need === need);
}

export function toggleRitualCompletion(ritualId: string): UserJourneyProfile {
  loadFromStorage();
  if (memoryProfile.completedRitualIds.includes(ritualId)) {
    memoryProfile.completedRitualIds = memoryProfile.completedRitualIds.filter(id => id !== ritualId);
  } else {
    memoryProfile.completedRitualIds.push(ritualId);
  }
  saveToStorage();
  return memoryProfile;
}

// -----------------------------------------------------------------------------
// Community Posts & Care Loop
// -----------------------------------------------------------------------------
export function getCommunityPosts(): CommunityPost[] {
  loadFromStorage();
  return [...memoryPosts];
}

export function toggleFeelYou(postId: string): CommunityPost | null {
  loadFromStorage();
  const post = memoryPosts.find((p) => p.id === postId);
  if (!post) return null;

  if (post.hasFeltYou) {
    post.feelYouCount = Math.max(0, post.feelYouCount - 1);
    post.hasFeltYou = false;
  } else {
    post.feelYouCount += 1;
    post.hasFeltYou = true;
  }

  saveToStorage();
  return post;
}

export function addPostNote(postId: string, content: string, author = 'A caring traveler'): CommunityPost | null {
  loadFromStorage();
  const post = memoryPosts.find((p) => p.id === postId);
  if (!post) return null;

  post.notes.unshift({
    id: `note-${Date.now()}`,
    author,
    content,
    timestamp: 'Just now'
  });

  saveToStorage();
  return post;
}

export function sendCareToPost(
  postId: string,
  careType: 'note' | 'ritual' | 'tea' | 'incense' | 'gift',
  message: string,
  from = 'A fellow traveler'
): CommunityPost | null {
  loadFromStorage();
  const post = memoryPosts.find((p) => p.id === postId);
  if (!post) return null;

  const typeLabels: Record<string, { en: string; zh: string }> = {
    note: { en: 'Handwritten Gentle Note', zh: '温润定心手札' },
    ritual: { en: 'Somatic Breath Ritual', zh: '身心吐纳小仪式' },
    tea: { en: 'Warm Roasted Mountain Tea', zh: '一盏温热山茶' },
    incense: { en: 'Scented Agarwood Coil', zh: '一缕安神线香' },
    gift: { en: 'Curated YOJQI Gift Package', zh: 'YOJQI 定心礼遇' }
  };

  post.careItems.unshift({
    id: `care-${Date.now()}`,
    from,
    type: careType,
    typeLabelEn: typeLabels[careType]?.en || 'Care Item',
    typeLabelZh: typeLabels[careType]?.zh || '心意礼遇',
    message,
    timestamp: 'Just now'
  });

  memoryProfile.careSentCount += 1;
  saveToStorage();
  return post;
}

export function createCommunityPost(
  content: string,
  category: CommunityPost['feelingCategory'],
  categoryLabelEn: string,
  categoryLabelZh: string,
  authorAlias = 'Anonymous Pilgrim',
  city = 'Global'
): CommunityPost {
  loadFromStorage();
  const newPost: CommunityPost = {
    id: `post-${Date.now()}`,
    feelingCategory: category,
    feelingLabelEn: categoryLabelEn,
    feelingLabelZh: categoryLabelZh,
    content,
    authorAlias,
    city,
    timestamp: 'Just now',
    feelYouCount: 0,
    hasFeltYou: false,
    notes: [],
    careItems: []
  };

  memoryPosts.unshift(newPost);
  saveToStorage();
  return newPost;
}
