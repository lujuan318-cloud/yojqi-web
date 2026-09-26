export interface EditorialArticle {
  id: string;
  slug: string;
  track: 'product_wisdom' | 'chongqing_travel';
  titleEn: string;
  titleZh: string;
  summaryEn: string;
  summaryZh: string;
  directTakeawayEn: string;
  directTakeawayZh: string;
  featuredImage: string;
  publishDate: string;
  readTimeEn: string;
  readTimeZh: string;
  authorEn: string;
  authorZh: string;
  tagsEn: string[];
  tagsZh: string[];
  contentHtmlEn: string;
  contentHtmlZh: string;
  fourStepPracticeEn?: {
    step1: { title: string; desc: string };
    step2: { title: string; desc: string };
    step3: { title: string; desc: string };
    step4: { title: string; desc: string };
  };
  fourStepPracticeZh?: {
    step1: { title: string; desc: string };
    step2: { title: string; desc: string };
    step3: { title: string; desc: string };
    step4: { title: string; desc: string };
  };
  relatedProductSlug?: string;
  relatedPropertySlug?: string;
}

export const INITIAL_ARTICLES: EditorialArticle[] = [
  // --- TRACK 2: Chongqing Travel & Drone Show Sanctuary ---
  {
    id: "art-cq-drone-viewing-guide",
    slug: "chongqing-drone-show-best-viewpoint-without-crowds",
    track: "chongqing_travel",
    titleEn: "Chongqing Drone Show: How to Experience the Sky Spectacle Without the 50,000-Person Bridge Gridlock",
    titleZh: "重庆无人机灯光秀避坑指南：告别桥头五万人流拥堵，开启私享天幕全景",
    summaryEn: "A local insider's guide to viewing Chongqing's world-famous riverside drone formations from high-elevation private riverfront balconies instead of crowded public bridges.",
    summaryZh: "本地主理人深度分享：如何在长江与嘉陵江交汇的高空私享露台，优雅端茶观礼震撼无人机天幕，彻底规避桥头与步道数万拥挤人潮。",
    directTakeawayEn: "The premier way to experience Chongqing's riverside drone show is from elevated private riverfront terraces situated along the high-rise towers facing Chaotianmen confluence—such as Baihong Drone Show Apartment and YOJQI Art Sanctuary—avoiding public quay gridlocks while providing unobstructed, acoustic-isolated viewing.",
    directTakeawayZh: "观赏重庆两江无人机灯光秀的核心秘诀，在于选择朝天门两江交汇正对面的高层私享瞰江露台（如白宏无人机机位公寓与YOJQI艺术宿集）。不仅能免除地面数万人流推挤与交通管制封路困扰，更能以平视开阔视角沉浸式记录震撼天幕。",
    featuredImage: "/images/retreats/baihong-drone-night.jpg",
    publishDate: "2026-09-24",
    readTimeEn: "5 min read",
    readTimeZh: "5 分钟阅读",
    authorEn: "YOJQI Chongqing Sanctuary Host",
    authorZh: "YOJQI 重庆宿集主理人",
    tagsEn: ["Chongqing Travel", "Drone Show", "Chaotianmen", "Luxury Sanctuaries"],
    tagsZh: ["重庆旅游", "无人机灯光秀", "朝天门两江交汇", "特色美宿"],
    fourStepPracticeEn: {
      step1: { title: "Track Schedule", desc: "Confirm official weekend/festival flight window times via the host concierge 24 hours prior." },
      step2: { title: "Arrive Early", desc: "Check into your private riverfront suite before 17:30 to bypass evening road closures around the riverbanks." },
      step3: { title: "Brew Warm Tea", desc: "Infuse aged Chongqing Tuocha at your private terrace tea table 15 minutes before takeoff." },
      step4: { title: "Immerse in Silence", desc: "Observe the thousands of flying lights while holding a YOJQI tactile anchor to regulate sensory calm." }
    },
    fourStepPracticeZh: {
      step1: { title: "前瞻时刻表", desc: "提前24小时通过管家微信确认当期官方无人机起降时段与飞行空域预告。" },
      step2: { title: "错峰入驻", desc: "建议傍晚17:30前抵达公寓，避开南滨路与解放碑晚间高峰交通管制与截流。" },
      step3: { title: "烹煮老茶", desc: "飞行起飞前15分钟，在全景露台工夫茶席烹上一壶老沱茶或陈皮熟普。" },
      step4: { title: "静享天幕", desc: "倚栏俯瞰千架光影凌空舒展，手握YOJQI随身定心香丸，在私谧宁静中感知山城浩瀚。" }
    },
    contentHtmlEn: `
      <h2>The Drone Phenomenon Over the Yangtze River</h2>
      <p>Chongqing has earned global acclaim for its multi-dimensional mountain topography and futuristic skyline. During major holidays and designated weekend celebrations, thousands of synchronized aerial drones lift off over the confluence of the Yangtze and Jialing Rivers, orchestrating kinetic Chinese dragons, soaring cranes, and futuristic poetry across the night sky.</p>
      
      <div class="yojqi-takeaway">
        <strong>Direct Takeaway:</strong> Viewing from public quays like Chaotianmen Square or Qiansimen Bridge often requires standing for 3-4 hours amidst 50,000+ spectators with severe cellular delays and transit suspensions. Choosing a high-floor private balcony guarantees front-row seating with absolute peace of mind.
      </div>

      <h2>Why High-Altitude Riverfront Sanctuaries Win</h2>
      <p>Traditional vantage points at river level suffer from perspective distortion and physical exhaustion. In contrast, staying at a high-elevation residence such as <strong>Baihong Drone Show Apartment</strong> or <strong>YOJQI Drone Show Art Sanctuary</strong> places you directly eye-level with the aerial light choreography. You observe the illuminated drone formations against the glittering backdrop of Hongyadong and Raffles City.</p>

      <h2>Recommended Evening Itinerary</h2>
      <ol>
        <li><strong>16:00 - Check-in & Orientation:</strong> Settle into your suite, set up photography tripods on the private balcony, and test shutter angles.</li>
        <li><strong>18:30 - Sundown Tea Tasting:</strong> Sip aged Yunnan Pu'er as the mountain mist rolls over the dual river confluence.</li>
        <li><strong>20:00 - The Sky Show:</strong> Watch the drones launch into the starry night, accompanied by the gentle ambient sound of distant riverboats.</li>
        <li><strong>21:30 - Somatic Recovery:</strong> Unwind in the herbal foot soaking tub paired with YOJQI agarwood aromatics for a restful night.</li>
      </ol>
    `,
    contentHtmlZh: `
      <h2>长江之上的万千飞星：重庆无人机天幕的视觉震撼</h2>
      <p>依山筑城、两江环抱的立体地貌，赋予了重庆无可替代的视觉张力。逢重要节日与主题周末，数千架无人机灯光编队从朝天门两江汇合处浩瀚腾空，化作九天盘龙、展翅祥鹤与璀璨诗词，倒映在粼粼江波之上，构成全球独一份的超现实立体赛博夜景。</p>
      
      <div class="yojqi-takeaway">
        <strong>核心避坑提要：</strong> 朝天门广场、千厮门大桥等地面公共观景台常年聚集超五万人流，通常需提前3-4小时占位，且遇临时交通管制难以打车。选择正对两江交汇的高层艺术居所，即可在私属露台泡茶平视整场盛宴，从容又惬意。
      </div>

      <h2>为什么高空私享机位才是极致之选？</h2>
      <p>低楼层或江滩平视角往往容易被前方树木、建筑或人群遮挡，而入住 <strong>白宏无人机机位江景公寓</strong> 与 <strong>YOJQI 无人机机位艺术宿集</strong>，你的视平线恰好正对无人机编队的核心腾挪空域。左侧是灯火如梦的洪崖洞吊脚楼群，右侧是来福士水晶连廊，脚下是滚滚长江，每一秒都值得长焦与慢速快门定格。</p>

      <h2>主理人推荐晚间疗愈动线</h2>
      <ol>
        <li><strong>16:00 - 悠然入住：</strong> 提前到房，在露台架设三脚架与云台，测试夜景机位。</li>
        <li><strong>18:30 - 暮色茶事：</strong> 伴随江面暮色渐深，点燃一柱老沉香，品饮温润老茶。</li>
        <li><strong>20:00 - 私享观礼：</strong> 千架无人机在天际变换万千，清风拂面，无喧闹杂音。</li>
        <li><strong>21:30 - 草本释压：</strong> 体验客房定制藏红花草本足浴与瑞鹤安神香，舒缓肌肉，安然入梦。</li>
      </ol>
    `,
    relatedPropertySlug: "baihong-drone-show-apartment"
  },

  // --- TRACK 1: Product Somatic Wisdom ---
  {
    id: "art-tactile-grounding-burnout",
    slug: "tactile-grounding-nervous-system-regulation",
    track: "product_wisdom",
    titleEn: "Tactile Somatic Anchoring: Regulating Overstimulated Nervous Systems in the Digital Age",
    titleZh: "触觉躯体锚定法：数字时代如何用触感与草本香气平抑交感神经过载",
    summaryEn: "Explore the physiological science of tactile sensory grounding and how natural botanical aromatics signal safety to the autonomic vagus nerve.",
    summaryZh: "深入探讨触觉感官锚定的身心医学机理：如何借助微孔陶土天然触感与传统草本微循环，向迷走神经传递安全信号，重拾呼吸自律。",
    directTakeawayEn: "Tactile sensory stimulation combined with natural botanical scents triggers rapid parasympathetic activation, reducing cortisol spikes and halting cognitive spiraling within 90 seconds of conscious contact.",
    directTakeawayZh: "指尖触觉感受器与嗅觉神经通路的协同激活，能够在90秒内快速唤醒副交感神经系统，促使皮质醇水平回落，有效阻断焦虑与思维反刍。",
    featuredImage: "/images/products/ambergris-bracelet.png",
    publishDate: "2026-09-22",
    readTimeEn: "4 min read",
    readTimeZh: "4 分钟阅读",
    authorEn: "YOJQI Somatic Wellness Lab",
    authorZh: "YOJQI 身心疗愈实验室",
    tagsEn: ["Somatic Healing", "Nervous System", "Vagus Nerve", "Tactile Anchor"],
    tagsZh: ["躯体疗愈", "自主神经调节", "迷走神经", "触觉锚点"],
    fourStepPracticeEn: {
      step1: { title: "Locate Wrist Anchor", desc: "Bring your non-dominant thumb to rest gently on the porous ceramic core bead." },
      step2: { title: "Slow Roll Motion", desc: "Roll the spherical bead between your fingers for 3 complete rotations, noting surface grain." },
      step3: { title: "Diaphragmatic Inhale", desc: "Breathe in through your nose for 4 counts, absorbing the subtle ambergris warmth." },
      step4: { title: "Extended Exhale", desc: "Exhale through relaxed lips for 6 counts, releasing tension from shoulders and jaw." }
    },
    fourStepPracticeZh: {
      step1: { title: "触感就位", desc: "将惯用手拇指轻抚于手链上的微孔陶瓷香丸核心珠粒上。" },
      step2: { title: "慢速微捻", desc: "指尖匀速捻转珠粒3圈，细致体会微孔陶泥特有的微温与肌理质感。" },
      step3: { title: "深腹吸气", desc: "经鼻深吸气4拍，感受草本龙涎的温润木香随体温弥漫。" },
      step4: { title: "沉缓呼气", desc: "微启双唇慢呼气6拍，同步感知双肩与下颌的肌肉自然下沉放松。" }
    },
    contentHtmlEn: `
      <h2>The Invisible Epidemic: Sensory Overdrive</h2>
      <p>Modern professionals absorb upwards of 10,000 digital micro-stimulations per day. The brain remains trapped in chronic sympathetic arousal—tight jaw, shallow chest breathing, and an inability to rest even in silence.</p>
      
      <div class="yojqi-takeaway">
        <strong>Direct Takeaway:</strong> Cognition cannot talk the nervous system out of anxiety. The autonomic nervous system responds primarily to sensory, somatic inputs: temperature, weight, tactile friction, and olfactory cues signaling safety.
      </div>

      <h2>How Wearable Anchors Intercept Cognitive Spiraling</h2>
      <p>When you physically touch a dedicated sensory object like the <strong>Wrist Anchor Ambergris Bracelet</strong>, neural bandwidth is immediately redirected from the anxious prefrontal loop back into primary somatosensory cortex processing.</p>

      <h2>The Botanical Olfactory Axis</h2>
      <p>Unlike synthetic perfumes containing volatile chemical aerosols that aggravate the nervous system, YOJQI formulas use slow-cured natural plant resins. Ambergris and agarwood contain compounds historically recognized for sedating overactive heart meridians and lowering resting heart rate variability.</p>
    `,
    contentHtmlZh: `
      <h2>无形的时代消耗：交感神经长久过载</h2>
      <p>在日常密集的信息流轰炸与多线程切换中，现代人的大脑长期处于“战或逃”的交感神经兴奋状态——紧绷的咬肌、浅短的胸式呼吸，以及即使在深夜关灯后依然高速运转的思绪。</p>
      
      <div class="yojqi-takeaway">
        <strong>核心医学机理：</strong> 纯粹的理性思维很难通过“告诉自己不要焦虑”来平息紧张。自主神经系统只对具象的身体感官信号做出响应：温度、实物重量、皮肤摩擦感以及传递安全感的植物气味。
      </div>

      <h2>触觉锚点如何阻断精神内耗？</h2>
      <p>当你的手指主动触碰 <strong>龙涎舒缓定心手绳</strong> 的微孔陶珠时，注意力通道被强制从焦虑的大脑前额叶回路拉回到初级躯体感觉皮层。指尖对粗砺与温润的感知，瞬间打破了脑海中奔腾的担忧。</p>

      <h2>古法草本与嗅觉神经的高阶协同</h2>
      <p>不同于工业合成香精对呼吸道的刺激，YOJQI 采用天然树脂与草本合香。龙涎与沉香中的活性分子温和刺激嗅球中枢，自然引导副交感神经复苏，带来实实在在的平稳感。</p>
    `,
    relatedProductSlug: "wrist-anchor-ambergris-ease-bracelet"
  }
];

export function getArticleBySlug(slug: string): EditorialArticle | undefined {
  return INITIAL_ARTICLES.find(a => a.slug === slug);
}

export function getArticlesByTrack(track: 'product_wisdom' | 'chongqing_travel' | 'all'): EditorialArticle[] {
  if (track === 'all') return INITIAL_ARTICLES;
  return INITIAL_ARTICLES.filter(a => a.track === track);
}
