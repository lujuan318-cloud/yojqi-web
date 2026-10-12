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
    directTakeawayZh: "观赏重庆两江无人机灯光秀的核心秘诀，在于选择朝天门两江交汇正对面的高层私享瞰江露台（如百弘江景民宿与YOJQI艺术宿集）。不仅能免除地面数万人流推挤与交通管制封路困扰，更能以平视开阔视角沉浸式记录震撼天幕。",
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
      <p>低楼层或江滩平视角往往容易被前方树木、建筑或人群遮挡，而入住 <strong>百弘江景民宿</strong> 与 <strong>YOJQI 无人机机位艺术宿集</strong>，你的视平线恰好正对无人机编队的核心腾挪空域。左侧是灯火如梦的洪崖洞吊脚楼群，右侧是来福士水晶连廊，脚下是滚滚长江，每一秒都值得长焦与慢速快门定格。</p>

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
  },

  // --- TRACK 1: October 12, 2026 Daily Route Article ---
  {
    id: "art-protection-route-20261012",
    slug: "wrist-anchor-ambergris-ease-bracelet-first-protection-route-20261012",
    track: "product_wisdom",
    titleEn: "Why October 12 Starts with Ambergris Bracelet",
    titleZh: "为什么 2026 年 10 月 12 日 先从 Ambergris Bracelet 这条保护路线开始",
    summaryEn: "A October 12 YOJQI route article explaining why Ambergris Bracelet is today's clearest first protection route based on the latest operating signal.",
    summaryZh: "YOJQI 2026 年 10 月 12 日 销售路线说明：根据当天最新信号，为什么今天应该先承接 Ambergris Bracelet 这条保护路线。",
    directTakeawayEn: "Bracelet-first route for lower-friction daily wear, gifting clarity, and a private sensory boundary. When the current signal already favors this route, the cleaner move is to strengthen the handoff around it instead of forcing the visitor back into a less legible entry path.",
    directTakeawayZh: "手绳优先路线具备低摩擦日常佩戴、心意清晰与私密感官边界三大特质。既然当前信号已经更明确地指向这条路线，就应该把入口承诺、产品页承接和后续内容都围绕它收紧。",
    featuredImage: "/images/editorial/2026-10-12-ambergris-ease-bracelet-daily-route-featured-1200x675.jpg",
    publishDate: "2026-10-12",
    readTimeEn: "4 min read",
    readTimeZh: "4 分钟阅读",
    authorEn: "YOJQI Daily Route Studio",
    authorZh: "YOJQI 每日路线工坊",
    tagsEn: ["Ambergris Bracelet", "YOJQI Protection", "Daily Route", "Sensory Grounding"],
    tagsZh: ["龙涎香手绳", "YOJQI Protection", "每日保护路线", "感官锚点"],
    fourStepPracticeEn: {
      step1: { title: "Fasten Wrist Anchor", desc: "Fasten the Ambergris Ease Bracelet on your non-dominant wrist each morning before screen exposure." },
      step2: { title: "Touch Porous Bead", desc: "Whenever tension spikes, touch the central porous ceramic bead with thumb and index finger for 3 deep breaths." },
      step3: { title: "Inhale Botanical Warmth", desc: "Bring the wrist to the nose to inhale the gentle natural ambergris botanical warmth." },
      step4: { title: "Anchor the Boundary", desc: "Let the subtle tactile scent create a personal boundary between noisy external inputs and inner calm." },
    },
    fourStepPracticeZh: {
      step1: { title: "晨间佩戴", desc: "每日清晨查看工作讯息前，先将龙涎舒缓定心手绳佩戴于非利手腕间。" },
      step2: { title: "触感定心", desc: "一旦感知压力或情绪紧绷，用拇指与食指捏揉中央微孔香珠，深长呼吸3次。" },
      step3: { title: "深嗅树脂", desc: "将手腕轻移至鼻翼下方，深嗅天然龙涎与草本植物所散发出的温润幽香。" },
      step4: { title: "重构边界", desc: "借由贴肤香气在喧嚣繁复的外界纷扰与内心宁静之间建立私密感官屏障。" },
    },
    contentHtmlEn: `
      <p>On October 12, YOJQI should keep one clear first click instead of inheriting yesterday's assumption. The latest sales route now points to <a href="/en/product/wrist-anchor-ambergris-ease-bracelet" class="text-yojqi-bronze underline font-medium">Wrist Anchor - Ambergris Ease Bracelet</a>, while the broader operating goal is still the same: move real visitors from first click into deeper product attention and then into checkout with less hesitation.</p>
      
      <div class="yojqi-takeaway">
        <strong>Direct Takeaway:</strong> External product interest has started but cart conversion needs focused support. The route keeps the clearest first-order SKU while tightening sensory grounding and product-page persuasion. It is about making the first product decision easier to understand, easier to imagine in daily life, and easier to continue after the first page view.
      </div>

      <h2>Why Ambergris Bracelet Goes First Today</h2>
      <p>Bracelet-first route for lower-friction daily wear, gifting clarity, and a private sensory boundary. When the current signal already favors this route, the cleaner move is to strengthen the handoff around it instead of forcing the visitor back into a less legible entry path.</p>
      <p>So October 12 is a day for one visible promise, one main landing page, and one CTA that matches the clearest operating signal instead of splitting attention too early.</p>

      <h2>Today's Route Links</h2>
      <ul>
        <li><strong>Ambergris Bracelet:</strong> lowest friction first order <a href="/en/product/wrist-anchor-ambergris-ease-bracelet" class="text-yojqi-bronze underline">Open route</a></li>
        <li><strong>Ambergris Pendant:</strong> softer pendant route <a href="/en/product/ambergris-ease-pendant" class="text-yojqi-bronze underline">Open route</a></li>
        <li><strong>Kinetic Pendant:</strong> stronger visible cue <a href="/en/product/dunhuang-feitian-protection-necklace" class="text-yojqi-bronze underline">Open route</a></li>
      </ul>

      <h2>How the Other Protection Routes Still Help</h2>
      <p>Ambergris Pendant and Kinetic Pendant still matter as comparison and handoff routes. But today's first click should stay concentrated on Ambergris Bracelet so the entry promise, product page, and follow-up content do not drift apart.</p>
      <p>The operating goal is simple: let the visitor start with the route that already feels most legible, then reduce trust, cart, and checkout hesitation close to the product page instead of widening the story too early.</p>
    `,
    contentHtmlZh: `
      <p>2026 年 10 月 12 日，YOJQI 今天应跟随最新路线信号，把主入口集中到 <a href="/zh/product/wrist-anchor-ambergris-ease-bracelet" class="text-yojqi-bronze underline font-medium">Wrist Anchor - Ambergris Ease Bracelet（龙涎舒缓定心手绳）</a>，而不是继续沿用昨天的默认主推。</p>
      
      <div class="yojqi-takeaway">
        <strong>核心运营提要：</strong> 外部选品意向已经启动，加购与转化需要清晰承接。今天要做的是让第一步更容易理解，让访客更顺畅地从第一跳进入产品深访，再进入加购和结账。
      </div>

      <h2>为什么今天先推 Ambergris Bracelet</h2>
      <p>手绳优先路线具备低摩擦日常佩戴、心意清晰与私密感官边界三大特质。既然当前信号已经更明确地指向这条路线，就应该把入口承诺、产品页承接和后续内容都围绕它收紧。</p>
      <p>2026 年 10 月 12 日更适合保持单一主承诺、单一主落地页和单一主 CTA，而不是过早分散注意力。</p>

      <h2>今日路线入口</h2>
      <ul>
        <li><strong>Ambergris Bracelet（龙涎手绳）：</strong> 最低摩擦首选入口 <a href="/zh/product/wrist-anchor-ambergris-ease-bracelet" class="text-yojqi-bronze underline">打开路线</a></li>
        <li><strong>Ambergris Pendant（龙涎项坠）：</strong> 柔和贴身项坠路线 <a href="/zh/product/ambergris-ease-pendant" class="text-yojqi-bronze underline">打开路线</a></li>
        <li><strong>Kinetic Pendant（飞天动势吊坠）：</strong> 具象视觉守护锚点 <a href="/zh/product/dunhuang-feitian-protection-necklace" class="text-yojqi-bronze underline">打开路线</a></li>
      </ul>

      <h2>其他保护路线今天如何配合</h2>
      <p>Ambergris Pendant 和 Kinetic Pendant 仍然有各自的承接价值，但今天的第一跳应该继续集中在 Ambergris Bracelet 上，避免入口承诺、产品页表达和后续内容再次脱节。</p>
      <p>今天的运营目标很明确：先让访客走进最容易理解的一条路线，再把信任、加购和结算之间的阻力尽量压缩在产品页附近解决。</p>
    `,
    relatedProductSlug: "wrist-anchor-ambergris-ease-bracelet"
  }
];

export function getArticleBySlug(slug: string): EditorialArticle | undefined {
  const normalizedSlug = slug.endsWith('-cn') ? slug.slice(0, -3) : slug;
  return INITIAL_ARTICLES.find(a => a.slug === slug || a.slug === normalizedSlug);
}

export function getArticlesByTrack(track: 'product_wisdom' | 'chongqing_travel' | 'all'): EditorialArticle[] {
  if (track === 'all') return INITIAL_ARTICLES;
  return INITIAL_ARTICLES.filter(a => a.track === track);
}
