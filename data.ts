import { PageData } from './types';

export const pagesData: PageData[] = [
  /* 1 COVER */
  { type: 'cover', surface: 'white', masthead: 'ICONS OF INFLUENCE', title: 'ICONS OF INFLUENCE', subtitle: 'Lifestyle Edition\nFeaturing\nNita Shilimkar • Joelle Mardinian • LukeDidThat • Jumana • Trent Shelton • Ian Ward', body: '', bg: 'https://picsum.photos/id/1011/1600/2400' },

  /* 2 INSIDE FRONT COVER */
  { type: 'article', surface: 'white', title: '“Lifestyle isn’t what you wear — it’s how you choose to live.”', subtitle: 'Welcome to a new chapter of modern influence.', body: '' , layoutImages: ['https://picsum.photos/id/1012/1200/800']},

  /* 3 CONTENTS */
  { type: 'article', surface: 'white', title: 'CONTENTS', body: '4 — Publisher’s Letter\n5 — The Lifestyle Era\n7 — Meet the Icons\n\nICON FEATURES\n8 — NITA SHILIMKAR\n17 — JOELLE MARDINIAN\n26 — LUKEDIDTHAT\n35 — JUMANA\n44 — TRENT SHELTON\n53 — IAN WARD\n\nBACK SECTION\n62 — The Threads That Connect Them\n63 — What’s Next\n64 — Credits\n65 — Back Cover' },

  /* 4 PUBLISHER'S LETTER */
  { type: 'article', surface: 'white', masthead: 'Publisher’s Letter', title: "Publisher’s Letter", body: "Welcome to the first-ever Icons of Influence: Lifestyle Edition.\nThis edition exists for one reason: to celebrate the creators shaping how we think, feel, live, dress, create, and dream.\n\nLifestyle used to be about status.\nToday, it’s about identity — and the courage to live it fully.\n\nOur six Icons represent a modern evolution of influence. They aren’t just faces; they are forces. They move culture. They shift conversations. They create space for millions to see themselves differently.\n\nThis magazine is a tribute to those who lead with authenticity — and inspire others to do the same.\n\nEnjoy the journey.\n\n— The DIM Group & MyLife Magazines" , layoutImages: ['https://picsum.photos/id/1005/900/1200']},

  /* 5–6 THE LIFESTYLE ERA (two pages combined as articles) */
  { type: 'article', surface: 'black', masthead: 'THE LIFESTYLE ERA', title: 'THE LIFESTYLE ERA', subtitle: 'How Influence Became the New Language of the World', body: 'Lifestyle once meant luxury.\nNow it means choice.\n\nA choice to live with intention.\nA choice to express who you are.\nA choice to rewrite what beauty, creativity, identity, ambition, and purpose look like.\n\nInfluence is no longer about spotlight.\nIt’s about connection.\n\nOur Icons represent this shift — they lead by showing their real lives, their struggles, their triumphs, and their humanity.\n\nThis is the Lifestyle Era:\nWhere authenticity is currency, and self-expression is power.' , layoutImages: ['https://picsum.photos/id/1020/1200/900']},

  /* 7 MEET THE ICONS */
  { type: 'article', surface: 'white', title: 'MEET THE ICONS', body: 'Six individuals.\nSix unique worlds.\nOne shared truth: they built their influence from within.\n\nNita Shilimkar — Creativity, fire, energy, expression.\nJoelle Mardinian — Beauty, empowerment, elegance, leadership.\nLukeDidThat — Culture, visuals, attitude, instinct.\nJumana — Identity, style, poise, storytelling.\nTrent Shelton — Healing, purpose, transformation, truth.\nIan Ward — Discipline, mastery, consistency, character.' , layoutImages: ['https://picsum.photos/id/1015/1200/900','https://picsum.photos/id/1016/1200/900']},

  /* ICON 1 — NITA SHILIMKAR (Pages 8–16) */
  /* 8–9 HERO OPENER */
  { type: 'hero', surface: 'white', masthead: 'NITA SHILIMKAR', title: 'NITA SHILIMKAR', subtitle: 'Bold. Creative. Unapologetically Herself.', pull: '“Energy is a language — and mine speaks before I ever say a word.”', bg: 'https://picsum.photos/id/1021/1600/2400' },

  /* 10–11 NITA'S STORY */
  { type: 'article', surface: 'white', masthead: "NITA'S STORY", title: "HER RISE. HER FIRE. HER STORY.", body: "Nita’s journey is defined by expression. Before she ever had followers, she had presence — the kind of energy that fills a room before she steps into it.\n\nShe built her name on authenticity.\nOn being raw.\nOn being real.\nOn being exactly who she is, without dilution.\n\nHer content is a blend of humour, style, emotion, and pure instinct. She turns everyday life into cinematic moments because she sees the world differently — brighter, louder, more alive.\n\nHer rise wasn’t sudden.\nIt was earned.\n\nConsistency, creativity, and courage turned her into a force. She works behind the scenes twice as hard as anyone sees on the screen. Every detail, every edit, every beat carries intention.\n\nNita doesn’t just influence style.\nShe influences confidence." , layoutImages: ['https://picsum.photos/id/1022/1000/1400']},

  /* 12 BEHIND THE SCENES */
  { type: 'article', surface: 'white', masthead: 'BEHIND THE SCENES', title: 'BEHIND THE SCENES WITH NITA', body: 'Daily Rituals:\n— Early mornings\n— Quick movement or workout\n— Content planning sessions\n— Creative direction\n— Engaging with her audience\n\nCreative Philosophy:\nNita believes the camera captures truth — so she gives it hers.' , layoutImages: ['https://picsum.photos/id/1023/900/1200']},

  /* 13 STYLE & AESTHETIC */
  { type: 'article', surface: 'white', masthead: 'HER STYLE', title: 'HER STYLE', body: 'Vibrant. Expressive. Confident.\nNita’s style is a mirror of her spirit — bold colours, sharp silhouettes, effortless glam, dramatic edge.\n\nShe doesn’t dress to impress.\nShe dresses to express.' , layoutImages: ['https://picsum.photos/id/1024/1000/1400']},

  /* 14 INFLUENCE & IMPACT */
  { type: 'article', surface: 'white', masthead: 'HER IMPACT', title: 'HER IMPACT', body: 'Millions look to Nita for inspiration — not just in fashion, but in mindset.\nHer audience feels her energy through the screen.\n\nHer influence comes from presence, not perfection.\n\nBrands admire her creativity.\nFans admire her authenticity.\nThe culture admires her fearlessness.' , layoutImages: ['https://picsum.photos/id/1025/900/1200']},

  /* 15–16 CLOSING QUOTE */
  { type: 'article', surface: 'white', title: '“Be loud. Be bold. Be the energy you want to walk into.” — Nita' },

  /* ICON 2 — JOELLE MARDINIAN (Pages 17–25) */
  /* 17–18 HERO OPENER */
  { type: 'hero', surface: 'white', masthead: 'JOELLE MARDINIAN', title: 'JOELLE MARDINIAN', subtitle: 'Beauty. Leadership. Legacy.', pull: '“Elegance isn’t a look — it’s a way of carrying yourself through the world.”', bg: 'https://picsum.photos/id/1031/1600/2400' },

  /* 19–20 JOELLE'S STORY */
  { type: 'article', surface: 'white', masthead: 'JOELLE MARDINIAN', title: 'Joelle’s Story', body: 'Joelle Mardinian is a pioneer — a beauty icon whose influence spans continents.\nHer rise began with passion, precision, and a vision that refused to dim.\n\nFrom television to entrepreneurship to global recognition, Joelle has showcased the strength of identity and the power of knowing who you are.\n\nShe built her empire through authenticity.\nShe inspires through confidence.\nShe leads through excellence.\n\nHer story is proof that beauty is not vanity.\nIt is expression.' , layoutImages: ['https://picsum.photos/id/1032/1000/1400']},

  /* 21 ENTREPRENEURSHIP */
  { type: 'article', surface: 'white', masthead: 'THE BUSINESS OF BEAUTY', title: 'THE BUSINESS OF BEAUTY', body: 'Joelle is more than an influencer — she is a CEO with global reach.\nHer approach blends creativity with discipline, and passion with purpose.\n\nEvery move she makes is intentional.\nEvery venture carries her signature of quality.' , layoutImages: ['https://picsum.photos/id/1033/1000/1400']},

  /* 22 STYLE & VISION */
  { type: 'article', surface: 'white', title: 'STYLE & VISION', body: 'Joelle’s style mixes glamour with refinement — a bold balance of confidence and grace.\n\nHer vision:\nTo empower women to own their beauty unapologetically.' , layoutImages: ['https://picsum.photos/id/1034/1000/1400']},

  /* 23 IMPACT */
  { type: 'article', surface: 'white', title: 'INFLUENCE & IMPACT', body: 'Her impact goes beyond trends.\nMillions look to her for guidance, comfort, and confidence.\n\nShe embodies leadership — elegant, strategic, and deeply human.' },

  /* 24–25 QUOTE */
  { type: 'article', surface: 'white', title: '“Beauty begins the moment you decide you are enough.” — Joelle' },

  /* ICON 3 — LUKEDIDTHAT (Pages 26–34) */
  /* 26–27 HERO OPENER */
  { type: 'hero', surface: 'white', masthead: 'LUKEDIDTHAT', title: 'LUKEDIDTHAT', subtitle: 'Where Art Meets Attitude.', pull: '“Creativity is how I breathe. If I’m not making something, I’m not alive.”', bg: 'https://picsum.photos/id/1041/1600/2400' },

  /* 28–29 LUKE'S JOURNEY */
  { type: 'article', surface: 'white', masthead: 'LUKE DID THAT', title: 'LUKE’S JOURNEY', body: 'Luke sees the world differently.\nTo him, life is a mood board.\nColours have texture.\nFaces have rhythm.\nMoments have movement.\n\nHis rise came from instinct — and from daring to do things "his way."\n\nHe combined culture, art, music, and emotion into a visual signature recognised instantly across platforms and continents.\n\nHis style is loud without noise.\nBold without force.\nEffortless without being simple.' , layoutImages: ['https://picsum.photos/id/1042/1000/1400']},

  /* 30 CREATIVE PROCESS */
  { type: 'article', surface: 'white', title: 'CREATIVE PROCESS', body: 'Luke creates from feeling.\nHe listens to music.\nHe absorbs atmosphere.\nHe lets emotion guide the lens.\n\nHis process is not mechanical — it’s spiritual.' , layoutImages: ['https://picsum.photos/id/1044/1000/1400']},

  /* 31 BIG MOMENTS */
  { type: 'article', surface: 'white', title: 'BIG MOMENTS', body: 'Career highlights include:\n\n— Viral breakout visuals\n— Cross-cultural collaborations\n— High-impact creative campaigns\n— Cinematic edits that shaped social trends\n\nEach moment carried his DNA: LukeDidThat — no one else.' , layoutImages: ['https://picsum.photos/id/1045/1000/1400']},

  /* 32 SHOWCASE (images) */
  { type: 'layout-photo', surface: 'black', title: 'SHOWCASE', subtitle: 'A layout of standout visuals', layoutImages: ['https://picsum.photos/id/1046/1200/900','https://picsum.photos/id/1047/1200/900','https://picsum.photos/id/1048/1200/900'] , bg: 'https://picsum.photos/id/1046/1600/2400'},

  /* 33 FUTURE VISION */
  { type: 'article', surface: 'white', title: 'FUTURE VISION', body: "Luke’s future extends beyond visuals — toward directing, creative leadership, and shaping global aesthetics." },

  /* 34 QUOTE */
  { type: 'article', surface: 'white', title: '“Make everything with heart — the world will feel it.” — Luke' },

  /* ICON 4 — JUMANA (Pages 35–43) */
  /* 35–36 HERO OPENER */
  { type: 'hero', surface: 'white', masthead: 'JUMANA', title: 'JUMANA', subtitle: 'Global Style. Quiet Power.', pull: '“My identity is my strength — and my story is still being written.”', bg: 'https://picsum.photos/id/1051/1600/2400' },

  /* 37–38 JUMANA'S STORY */
  { type: 'article', surface: 'white', masthead: 'JUMANA', title: 'Jumana’s Story', body: 'Jumana’s presence is magnetic — not loud, not forceful, but quietly powerful.\n\nHer journey is one of identity, confidence, and cultural pride.\nShe inspires not by shouting, but by standing firmly in who she is.\n\nHer influence comes from elegance, depth, and intention.' , layoutImages: ['https://picsum.photos/id/1052/1000/1400']},

  /* 39 STYLE IDENTITY */
  { type: 'article', surface: 'white', title: 'STYLE IDENTITY', body: 'Her style is minimalist, expressive, rooted in culture, yet boldly modern.\n\nShe does not follow trends — she refines them.' , layoutImages: ['https://picsum.photos/id/1053/1000/1400']},

  /* 40 AUDIENCE CONNECTION */
  { type: 'article', surface: 'white', title: 'AUDIENCE CONNECTION', body: 'Her audience feels her authenticity instantly.\nHer words resonate.\nHer presence comforts.\nHer aesthetic elevates.\n\nShe is followed for her beauty —\nShe is loved for her spirit.' },

  /* 41–42 FEATURE */
  { type: 'article', surface: 'white', title: 'OWNING YOUR INFLUENCE', body: 'Influence isn’t volume.\nIt’s alignment.\n\nJumana shows that staying true to yourself is the most powerful form of leadership.' , layoutImages: ['https://picsum.photos/id/1054/1000/1400']},

  /* 43 QUOTE */
  { type: 'article', surface: 'white', title: '“Your story is your power — never shrink it.” — Jumana' },

  /* ICON 5 — TRENT SHELTON (Pages 44–52) */
  /* 44–45 HERO OPENER */
  { type: 'hero', surface: 'white', masthead: 'TRENT SHELTON', title: 'TRENT SHELTON', subtitle: 'From Athlete to Global Voice.', pull: '“The greatest battles you fight are the ones inside.”', bg: 'https://picsum.photos/id/1061/1600/2400' },

  /* 46–47 TRENT'S TRANSFORMATION */
  { type: 'article', surface: 'white', masthead: 'TRENT SHELTON', title: 'TRENT’S TRANSFORMATION', body: 'Trent’s path is one of resilience.\nHe experienced loss, heartbreak, and reinvention — and turned pain into purpose.\n\nHis message is simple but powerful:\nHealing is possible.\nGrowth is possible.\nChange is possible.\n\nHis voice reaches millions because it comes from experience — not theory.' , layoutImages: ['https://picsum.photos/id/1062/1000/1400']},

  /* 48 MINDSET PILLARS */
  { type: 'article', surface: 'white', title: 'MINDSET PILLARS', body: '— Protect your peace\n— Honour your worth\n— Choose healing\n— Build discipline\n— Grow through adversity' },

  /* 49 COMMUNITY IMPACT */
  { type: 'article', surface: 'white', title: 'COMMUNITY IMPACT', body: 'Trent’s movement is global.\nLives are changed daily through his words.\n\nHe reminds the world:\nYour story matters.' , layoutImages: ['https://picsum.photos/id/1063/1000/1400']},

  /* 50–51 FEATURE */
  { type: 'article', surface: 'white', title: 'THE PURSUIT OF PURPOSE', body: 'Purpose isn’t found — it’s built through consistent choices, aligned decisions, and courageous action.' },

  /* 52 QUOTE */
  { type: 'article', surface: 'white', title: '“Your next chapter needs you — not the version of you that’s afraid.” — Trent' },

  /* ICON 6 — IAN WARD (Pages 53–61) */
  /* 53–54 HERO OPENER */
  { type: 'hero', surface: 'white', masthead: 'IAN WARD', title: 'IAN WARD', subtitle: 'Discipline. Craft. Determination.', pull: '“Master your habits, and your habits will master your future.”', bg: 'https://picsum.photos/id/1071/1600/2400' },

  /* 55–56 IAN'S STORY */
  { type: 'article', surface: 'white', masthead: 'IAN WARD', title: 'IAN’S STORY', body: 'Ian Ward represents discipline at its highest level.\nHis influence is built on structure, focus, and everyday excellence.\n\nHe is followed because he embodies consistency — the rarest form of strength.\n\nHis journey shows that greatness is not an event.\nIt’s a practice.' , layoutImages: ['https://picsum.photos/id/1072/1000/1400']},

  /* 57 WORK ETHIC */
  { type: 'article', surface: 'white', title: 'WORK ETHIC', body: 'Ian’s approach:\n\n— Daily training\n— Planned routines\n— High-performance habits\n— Relentless discipline\n— Precision in craft\n\nHe does not wait for motivation —\nHe creates it.' },

  /* 58 LIFESTYLE & IDENTITY */
  { type: 'article', surface: 'white', title: 'LIFESTYLE & IDENTITY', body: 'Ian lives a lifestyle grounded in:\n\n— Strength\n— Calm\n— Ambition\n— Purpose\n\nHis discipline shapes his identity — and inspires others to build theirs.' , layoutImages: ['https://picsum.photos/id/1073/1000/1400']},

  /* 59–60 KEY WINS & IMPACT */
  { type: 'article', surface: 'white', title: 'KEY WINS & IMPACT', body: 'Highlights include:\n\n— Performance milestones\n— Global recognition\n— Lifestyle transformation stories\n— High-impact collaborations\n\nIan is more than an influencer —\nHe is a standard.' },

  /* 61 QUOTE */
  { type: 'article', surface: 'white', title: '“Be stronger than your excuses.” — Ian' },

  /* BACK SECTION (62–65) */
  /* 62 THREADS THAT CONNECT THEM */
  { type: 'article', surface: 'black', title: 'THREADS THAT CONNECT THEM', body: 'Though their lives differ, all six Icons share:\n\nCourage. Consistency. Identity.\n\nThey chose authenticity over approval.\nPurpose over popularity.\nTruth over trends.\n\nThey remind us that lifestyle is not external.\nIt is internal mastery.' },

  /* 63 WHAT'S NEXT */
  { type: 'article', surface: 'white', title: "WHAT'S NEXT", body: 'Icons of Influence expands worldwide.\n\nUpcoming editions:\n— Middle East\n— South Africa\n— USA\n— Europe\n— Asia\n— Latin America\n\nNew Icons.\nNew stories.\nNew voices.' },

  /* 64 CREDITS */
  { type: 'article', surface: 'white', title: 'CREDITS', body: 'A MyLife Digital Interactive Magazine\nProduced by The DIM Group\n\nPublisher: Basil Arrindell\nCreative Direction: The DIM Group\nEditorial: MyLife Magazines\nPhotography: Courtesy of featured Icons\nSpecial Thanks: Our global digital community' },

  /* 65 BACK COVER */
  { type: 'article', surface: 'black', title: 'ICONS OF INFLUENCE', subtitle: 'Lifestyle Edition', body: 'Where stories become inspiration.', bg: 'https://picsum.photos/id/1080/1600/2400' }
];
