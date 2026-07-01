export const categories = [
  "AI & Work",
  "AI & Tech",
  "World Cup",
  "Immigration",
  "Cost of Living",
  "Society",
  "Politics",
  "Work & Business",
  "Money",
  "Relationships",
  "Technology",
  "Entertainment",
  "Sports",
  "Education",
  "Lifestyle"
] as const;

export type Category = (typeof categories)[number];

export type Thread = {
  id: string;
  title: string;
  category: Category;
  description?: string;
  thumbnailUrl?: string;
  agree: number;
  disagree: number;
  comments: number;
  votes: number;
  time: string;
  createdAt?: string;
};

export type CountryResult = {
  country: string;
  flag: string;
  agree: number;
};

type SeedCommentTuple = [side: "agree" | "disagree" | "neutral", text: string];
type SeedThread = Thread & { seedComments: SeedCommentTuple[] };

function seedThread(id: string, title: string, category: Category, time: string, seedComments: SeedCommentTuple[] = [], description = ""): SeedThread {
  return { id, title, category, ...(description && { description }), agree: 0, disagree: 0, votes: 0, comments: seedComments.length, time, seedComments };
}

const seedThreads: SeedThread[] = [
  seedThread("microsoft-ai-spending-layoffs", "Microsoft spent billions on AI while cutting thousands of jobs. Fair or not?", "AI & Work", "12m"),
  seedThread("meta-workers-ai-roles-layoffs", "Meta is pushing workers into AI roles after layoffs. Is this the future of work?", "AI & Work", "24m"),
  seedThread("oracle-ai-data-center-layoffs", "Oracle is shrinking staff while chasing huge AI data-center deals. Is this progress or damage?", "AI & Work", "37m"),
  seedThread("tesla-driverless-robotaxis-austin", "Tesla is rolling out driverless robotaxis in Austin. Would you ride one?", "AI & Tech", "49m"),
  seedThread("ai-training-authors-musicians-pay", "Should AI companies pay authors and musicians before training on their work?", "AI & Tech", "1h"),
  seedThread("portugal-croatia-world-cup-resale-prices", "Portugal vs Croatia World Cup resale tickets hit over $3,000. Should FIFA cap prices?", "World Cup", "1h"),
  seedThread("world-cup-final-ticket-prices-rich", "World Cup final tickets reached nearly $33,000. Is football becoming only for the rich?", "World Cup", "2h"),
  seedThread("fifa-dynamic-pricing-world-cup", "Should FIFA be allowed to use dynamic pricing for World Cup tickets?", "World Cup", "2h"),
  seedThread("iran-officials-us-visas-world-cup", "Iran officials were denied US visas for the World Cup. Should hosts control who gets in?", "World Cup", "3h"),
  seedThread("fifa-hosts-strict-immigration-rules", "Should FIFA avoid host countries with strict immigration rules?", "World Cup", "4h"),
  seedThread("rights-groups-fifa-inclusivity-2026", "Rights groups warned FIFA about inclusivity at the 2026 World Cup. Should FIFA intervene?", "World Cup", "6h"),
  seedThread("world-cup-expanded-48-teams", "The World Cup expanded to 48 teams. Is bigger actually better?", "World Cup", "8h"),
  seedThread("world-cup-ticket-demand-fan-priority", "World Cup ticket demand was oversubscribed over 30 times. Should real fans get priority?", "World Cup", "10h"),
  seedThread("supreme-court-trump-haitians-syrians-protections", "The US Supreme Court let Trump end protections for Haitians and Syrians. Is that fair?", "Immigration", "12h"),
  seedThread("uk-asylum-seekers-settlement-repayment", "Should asylum seekers repay £10,000 before settling in the UK?", "Immigration", "14h"),
  seedThread("overwhelmed-borders-asylum-seekers", "Should countries turn away asylum seekers when borders are overwhelmed?", "Immigration", "16h"),
  seedThread("eu-offshore-migrant-detention-centers", "The EU backed offshore migrant detention centers. Necessary control or human rights abuse?", "Immigration", "18h"),
  seedThread("greece-faster-deportations-asylum", "Greece approved faster deportations for rejected asylum seekers. Should Europe go harder?", "Immigration", "20h"),
  seedThread("us-mass-deportations-protests", "Should the US carry out mass deportations even if it sparks protests?", "Immigration", "22h"),
  seedThread("egg-companies-donate-price-fixing-claims", "Egg companies will donate 53 million eggs after price-fixing claims. Is that enough?", "Cost of Living", "1d"),
  seedThread("us-grocery-inflation-food-price-caps", "US grocery inflation had its biggest jump since 2022. Should governments cap food prices?", "Cost of Living", "1d"),
  seedThread("mcdonalds-us-sales-fast-food-expensive", "McDonald's missed US sales targets. Has fast food become too expensive?", "Cost of Living", "1d"),
  seedThread("canada-grocery-control-supermarket-breakup", "Canada says five companies control 75% of groceries. Should supermarkets be broken up?", "Cost of Living", "2d"),
  seedThread("japan-rice-prices-government-stocks", "Japan's rice prices more than doubled since 2024. Should governments release stocks sooner?", "Cost of Living", "2d"),
  seedThread("general-mills-profit-price-hikes-inflation", "General Mills beat profit estimates after price hikes. Are food companies profiting from inflation?", "Cost of Living", "3d")
];

export const threads: Thread[] = seedThreads.map(({ seedComments: _seedComments, ...thread }) => thread);

function clampPercent(value: number) {
  return Math.max(5, Math.min(95, value));
}

export const countryBreakdowns: Record<string, CountryResult[]> = Object.fromEntries(threads.filter((thread) => thread.votes > 0).map((thread, index) => [thread.id, [
  { country: "Japan", flag: "🇯🇵", agree: clampPercent(thread.agree + (index % 9) - 4) },
  { country: "United States", flag: "🇺🇸", agree: clampPercent(thread.agree + (index % 7) - 3) },
  { country: "United Kingdom", flag: "🇬🇧", agree: clampPercent(thread.agree + (index % 5) - 2) },
  { country: "India", flag: "🇮🇳", agree: clampPercent(thread.agree + (index % 11) - 5) }
]]));

export const categoryMeta: Record<Category, { icon: string; color: string }> = {
  "AI & Work": { icon: "AI", color: "sage" },
  "AI & Tech": { icon: "⌘", color: "lavender" },
  "World Cup": { icon: "◉", color: "green" },
  Immigration: { icon: "↗", color: "blue" },
  "Cost of Living": { icon: "$", color: "gold" },
  Society: { icon: "◎", color: "peach" },
  Politics: { icon: "⚑", color: "blue" },
  "Work & Business": { icon: "▣", color: "sage" },
  Money: { icon: "$", color: "gold" },
  Relationships: { icon: "♡", color: "pink" },
  Technology: { icon: "⌘", color: "lavender" },
  Entertainment: { icon: "☆", color: "coral" },
  Sports: { icon: "◉", color: "green" },
  Education: { icon: "⌂", color: "blue" },
  Lifestyle: { icon: "☼", color: "gold" }
};

export type GuestProfile = {
  ageRange?: string;
  country?: string;
};

export type Comment = {
  id: number;
  number?: number;
  guestId?: string;
  author: string;
  side: "agree" | "disagree" | "neutral";
  text: string;
  score: number;
  positiveVotes: number;
  negativeVotes: number;
  time: string;
  createdAt?: string;
  replyTo?: number;
  profile?: GuestProfile;
};

const SEED_GUEST_IDS = [
  "Guest #F3K8L2",
  "Guest #M7Q4R9",
  "Guest #T2N6W5",
  "Guest #C8H3P7",
  "Guest #V5D9K4",
  "Guest #R2J7M8",
  "Guest #L6W3F9",
  "Guest #P4T8C2",
  "Guest #H9M5Q3",
  "Guest #K3R6V7",
  "Guest #W8F2N4",
  "Guest #Q5C7T9"
] as const;

const COMMENT_TIME_SETS = [
  ["8m", "21m", "49m"],
  ["14m", "37m", "1h"],
  ["31m", "2h", "5h"],
  ["1h", "4h", "9h"]
] as const;

export const commentsByThread: Record<string, Comment[]> = Object.fromEntries(seedThreads.map((thread, threadIndex) => [
  thread.id,
  thread.seedComments.map(([side, text], commentIndex) => ({
    id: (threadIndex + 1) * 100 + commentIndex + 1,
    number: commentIndex + 1,
    author: SEED_GUEST_IDS[(threadIndex * 3 + commentIndex) % SEED_GUEST_IDS.length],
    side,
    text,
    score: 0,
    positiveVotes: 0,
    negativeVotes: 0,
    time: COMMENT_TIME_SETS[threadIndex % COMMENT_TIME_SETS.length][commentIndex],
    createdAt: new Date(Date.UTC(2026, 6, 2, 5 + threadIndex % 6, 10 + commentIndex * 7)).toISOString()
  }))
]));
