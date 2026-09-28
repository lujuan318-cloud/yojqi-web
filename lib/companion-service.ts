import { CompanionMessage } from './journey-data';

export type CompanionMode = 'talk' | 'reset' | 'ritual' | 'reflect' | 'explore';

export interface CompanionContext {
  lang: 'en' | 'zh';
  currentJourney?: string;
  recentNeed?: string;
  userState?: string;
  mode?: CompanionMode;
}

export interface CompanionResponse {
  message: string;
  mode: CompanionMode;
  suggestedActions: {
    id: string;
    labelEn: string;
    labelZh: string;
    action: string;
  }[];
}

// -----------------------------------------------------------------------------
// Pluggable AI Provider Interface
// -----------------------------------------------------------------------------
export interface CompanionProvider {
  name: string;
  generateReply(
    history: CompanionMessage[],
    userPrompt: string,
    context: CompanionContext
  ): Promise<CompanionResponse>;
}

// -----------------------------------------------------------------------------
// Mock / Fallback Eastern AI Personality Provider
// -----------------------------------------------------------------------------
class YojqiEasternCompanionProvider implements CompanionProvider {
  name = 'YOJQI Eastern Knowledge Engine';

  async generateReply(
    history: CompanionMessage[],
    userPrompt: string,
    context: CompanionContext
  ): Promise<CompanionResponse> {
    const isZh = context.lang === 'zh';
    const lower = userPrompt.toLowerCase();
    const mode: CompanionMode = context.mode || 'talk';

    // 1. Reset / Stress / Overwhelmed response
    if (lower.includes('stress') || lower.includes('tired') || lower.includes('累') || lower.includes('压力') || lower.includes('烦') || mode === 'reset') {
      return {
        mode: 'reset',
        message: isZh
          ? '这一天听起来格外消耗心力。你不需要在今晚把所有难题都一并解开。若你愿意，我们先放下手机，把双肩沉下一寸，做三次长长的呼气。你想静静聊会儿，还是尝试一次 5 分钟的吐纳？'
          : 'That sounds like a tiring kind of day. You don’t have to solve everything tonight. If you’d like, let’s drop your shoulders by an inch and take three long, slow exhales. Would you like me to just listen, or would you like a small way to feel a little better tonight?',
        suggestedActions: [
          { id: 'just-listen', labelEn: 'Just listen to me', labelZh: '只是听我说说', action: 'mode:talk' },
          { id: 'help-reset', labelEn: 'Help me reset', labelZh: '带我做一次呼吸放松', action: 'mode:reset' },
          { id: 'give-ritual', labelEn: 'Give me an evening ritual', labelZh: '推荐今夜入眠仪式', action: 'mode:ritual' },
        ]
      };
    }

    // 2. Sleep / Can't sleep
    if (lower.includes('sleep') || lower.includes('awake') || lower.includes('睡') || lower.includes('失眠')) {
      return {
        mode: 'ritual',
        message: isZh
          ? '夜已深，思绪却还在飞速运转，往往是大脑尚未从白天的追逐中走出来。试着把房间里的主灯熄灭，只留一盏暖色微光。指尖触碰身边有质感的物件，让注意力从脑海回到掌心。今晚我们换一种轻柔的姿态迎接黑夜。'
          : 'When the night is deep and the mind is still sprinting, it usually means the nervous system hasn’t realized the day’s duties are done. Try switching off harsh overhead lights, keeping only a warm bedside glow. Let your fingers rest on a tactile object. We can take this evening very gently.',
        suggestedActions: [
          { id: 'sleep-ritual', labelEn: 'Start 10-Min Sleep Ritual', labelZh: '开启 10 分钟晚间收束', action: 'route:/today' },
          { id: 'listen-quiet', labelEn: 'Listen to ambient river sounds', labelZh: '两江流水白噪音', action: 'sound:river' }
        ]
      };
    }

    // 3. Eastern Living / Tea / Incense / Culture
    if (lower.includes('tea') || lower.includes('incense') || lower.includes('茶') || lower.includes('香') || lower.includes('东方') || mode === 'explore') {
      return {
        mode: 'explore',
        message: isZh
          ? '在东方古人的日常里，点一炷香或注一盏茶，从不是繁复的炫技，而是给生活切出一个小小的“停顿”。草木有其天然的冷暖与厚度，水沸有其起伏声律。当你专注于香烟的缓升或茶汤的透亮，喧嚣便自然退后一步。'
          : 'In traditional Eastern living, lighting a slender incense stick or steeping loose tea was never about performance; it was simply a mindful pause carved out of a hurried world. Botanicals possess their own gentle warmth, and spring water follows its own tempo. When you watch the smoke coil softly, the world’s clamor steps back.',
        suggestedActions: [
          { id: 'explore-tea', labelEn: 'Explore Tea Rituals', labelZh: '了解听水煮茶仪式', action: 'route:/discover/eastern-living' },
          { id: 'explore-scent', labelEn: 'Explore Scent Anchors', labelZh: '了解草木香丸系统', action: 'route:/shop' }
        ]
      };
    }

    // 4. Default Calm Dialogue (Listen First)
    return {
      mode: 'talk',
      message: isZh
        ? '我在这里听着。在这个空间里，没有任何评价，也没有任何必须达成的目标。你可以随心说出脑海里闪过的任何字句，或者只是静静坐着，让心绪自然舒展。'
        : 'I am here listening. In this space, there is no judgment and nothing you are required to accomplish. You can say whatever crosses your mind, or simply sit quietly and let your thoughts breathe.',
      suggestedActions: [
        { id: 'reset-mode', labelEn: 'Guide a slow breath', labelZh: '带我慢慢呼吸', action: 'mode:reset' },
        { id: 'reflect-mode', labelEn: 'Help me reflect on today', labelZh: '帮我复盘沉淀今天', action: 'mode:reflect' },
        { id: 'anonymous-room', labelEn: 'Visit the Listening Room', labelZh: '前往倾听室自由宣泄', action: 'route:/listen' }
      ]
    };
  }
}

// Active provider instance (can be swapped with OpenAI, Gemini, or local models via environment variables)
let currentProvider: CompanionProvider = new YojqiEasternCompanionProvider();

export function setCompanionProvider(provider: CompanionProvider) {
  currentProvider = provider;
}

export async function askCompanion(
  history: CompanionMessage[],
  userPrompt: string,
  context: CompanionContext
): Promise<CompanionResponse> {
  return currentProvider.generateReply(history, userPrompt, context);
}
