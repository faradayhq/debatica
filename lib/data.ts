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
  seedActivity?: {
    agreeVotes: number;
    disagreeVotes: number;
    comments: number;
  };
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
type SeedThreadInput = Pick<Thread, "id" | "title" | "category" | "time"> & {
  description: string;
  seedVotes: number;
  seedCommentsCount: number;
  seedAgreePercent: number;
  seedComments?: SeedCommentTuple[];
};
type SeedThread = Thread & { description: string; seedComments: SeedCommentTuple[] };

function seedThread({ id, title, category, time, description, seedVotes, seedCommentsCount, seedAgreePercent, seedComments = [] }: SeedThreadInput): SeedThread {
  const agreeVotes = Math.round(seedVotes * seedAgreePercent / 100);
  const disagreeVotes = seedVotes - agreeVotes;
  const comments = Math.max(seedComments.length, seedCommentsCount);
  return {
    id,
    title,
    category,
    description,
    seedActivity: { agreeVotes, disagreeVotes, comments },
    agree: seedAgreePercent,
    disagree: 100 - seedAgreePercent,
    votes: seedVotes,
    comments,
    time,
    seedComments
  };
}

const seedThreads: SeedThread[] = [
  seedThread({
    id: "microsoft-ai-spending-layoffs",
    title: "Microsoft spent billions on AI while cutting thousands of jobs. Fair or not?",
    category: "AI & Work",
    time: "12m",
    seedVotes: 1840,
    seedCommentsCount: 126,
    seedAgreePercent: 42,
    description: "Microsoft has announced large job cuts while continuing major investments in AI infrastructure and products. Supporters argue the company must redirect resources toward future growth and stay competitive. Critics say profitable tech firms should not reduce staff while spending heavily on automation."
  }),
  seedThread({
    id: "meta-workers-ai-roles-layoffs",
    title: "Meta is pushing workers into AI roles after layoffs. Is this the future of work?",
    category: "AI & Work",
    time: "24m",
    seedVotes: 1320,
    seedCommentsCount: 92,
    seedAgreePercent: 56,
    description: "Meta has reorganized parts of its workforce around AI after earlier layoffs and new hiring for advanced AI teams. Supporters see this as a necessary shift as user products and advertising become more AI-driven. Critics worry workers are being pushed to retrain while stable roles disappear."
  }),
  seedThread({
    id: "oracle-ai-data-center-layoffs",
    title: "Oracle is shrinking staff while chasing huge AI data-center deals. Is this progress or damage?",
    category: "AI & Work",
    time: "37m",
    seedVotes: 910,
    seedCommentsCount: 58,
    seedAgreePercent: 47,
    description: "Oracle has cut jobs while expanding cloud and AI data-center commitments tied to rising demand for computing power. Supporters argue the company is moving capital toward higher-growth infrastructure. Critics say the benefits of AI deals are uneven if employees lose work during the transition."
  }),
  seedThread({
    id: "tesla-driverless-robotaxis-austin",
    title: "Tesla is rolling out driverless robotaxis in Austin. Would you ride one?",
    category: "AI & Tech",
    time: "49m",
    seedVotes: 1510,
    seedCommentsCount: 104,
    seedAgreePercent: 51,
    description: "Tesla began limited robotaxi service in Austin as it tests driverless rides under real traffic conditions. Supporters say autonomous taxis could lower transport costs and improve road safety over time. Critics point to safety incidents, regulation gaps, and the risks of public testing."
  }),
  seedThread({
    id: "ai-training-authors-musicians-pay",
    title: "Should AI companies pay authors and musicians before training on their work?",
    category: "AI & Tech",
    time: "1h",
    seedVotes: 2260,
    seedCommentsCount: 168,
    seedAgreePercent: 68,
    description: "Authors, musicians, and publishers have challenged AI companies over training systems on copyrighted books, songs, and recordings. Supporters of payment say creators should control and profit from their work. Opponents argue training can be fair use or that broad licensing could slow innovation."
  }),
  seedThread({
    id: "portugal-croatia-world-cup-resale-prices",
    title: "Portugal vs Croatia World Cup resale tickets hit over $3,000. Should FIFA cap prices?",
    category: "World Cup",
    time: "1h",
    seedVotes: 1490,
    seedCommentsCount: 112,
    seedAgreePercent: 63,
    description: "Some resale listings for Portugal vs Croatia World Cup tickets have climbed above $3,000 as demand outpaces supply. Supporters of caps say major tournaments should remain accessible to ordinary fans. Opponents say resale prices reflect market demand and restrictions can push trading underground."
  }),
  seedThread({
    id: "world-cup-final-ticket-prices-rich",
    title: "World Cup final tickets reached nearly $33,000. Is football becoming only for the rich?",
    category: "World Cup",
    time: "2h",
    seedVotes: 2180,
    seedCommentsCount: 154,
    seedAgreePercent: 72,
    description: "World Cup final ticket listings have appeared at extremely high resale prices, with some near $33,000. Supporters of premium pricing say scarce seats for global events will always command high prices. Critics argue football loses its public character when many fans cannot realistically attend."
  }),
  seedThread({
    id: "fifa-dynamic-pricing-world-cup",
    title: "Should FIFA be allowed to use dynamic pricing for World Cup tickets?",
    category: "World Cup",
    time: "2h",
    seedVotes: 1210,
    seedCommentsCount: 86,
    seedAgreePercent: 39,
    description: "FIFA has faced scrutiny over ticket prices and the possibility of prices moving with demand for major World Cup matches. Supporters say dynamic pricing can manage demand and capture revenue for the tournament. Critics say it creates uncertainty and can price loyal fans out."
  }),
  seedThread({
    id: "iran-officials-us-visas-world-cup",
    title: "Iran officials were denied US visas for the World Cup. Should hosts control who gets in?",
    category: "World Cup",
    time: "3h",
    seedVotes: 860,
    seedCommentsCount: 64,
    seedAgreePercent: 54,
    description: "Iranian football officials reportedly faced US visa denials connected to World Cup events hosted in North America. Supporters say host countries must control entry under their own security and immigration rules. Critics argue global tournaments require predictable access for qualified teams and officials."
  }),
  seedThread({
    id: "fifa-hosts-strict-immigration-rules",
    title: "Should FIFA avoid host countries with strict immigration rules?",
    category: "World Cup",
    time: "4h",
    seedVotes: 1030,
    seedCommentsCount: 78,
    seedAgreePercent: 58,
    description: "The 2026 World Cup will be held across countries with different visa and immigration systems, creating questions about access for fans, teams, and officials. Supporters of stricter host standards say FIFA should protect participation. Opponents say immigration policy is a national decision."
  }),
  seedThread({
    id: "rights-groups-fifa-inclusivity-2026",
    title: "Rights groups warned FIFA about inclusivity at the 2026 World Cup. Should FIFA intervene?",
    category: "World Cup",
    time: "6h",
    seedVotes: 760,
    seedCommentsCount: 49,
    seedAgreePercent: 61,
    description: "Rights groups have urged FIFA to address concerns about discrimination, border access, and fan safety before the 2026 World Cup. Supporters say FIFA should set clear inclusivity requirements for hosts. Critics say the organization should avoid overstepping into domestic law and politics."
  }),
  seedThread({
    id: "world-cup-expanded-48-teams",
    title: "The World Cup expanded to 48 teams. Is bigger actually better?",
    category: "World Cup",
    time: "8h",
    seedVotes: 1340,
    seedCommentsCount: 93,
    seedAgreePercent: 46,
    description: "The 2026 World Cup will expand from 32 to 48 teams, adding more matches and more national representation. Supporters say the format gives more countries and fans a chance to participate. Critics say expansion may dilute quality, strain players, and make the tournament harder to follow."
  }),
  seedThread({
    id: "world-cup-ticket-demand-fan-priority",
    title: "World Cup ticket demand was oversubscribed over 30 times. Should real fans get priority?",
    category: "World Cup",
    time: "10h",
    seedVotes: 1720,
    seedCommentsCount: 118,
    seedAgreePercent: 66,
    description: "Early World Cup ticket demand has far exceeded available seats, with some reports describing applications many times above supply. Supporters of fan priority say long-time supporters should not lose out to resellers or corporate buyers. Opponents say lotteries and open sales are simpler and fairer."
  }),
  seedThread({
    id: "supreme-court-trump-haitians-syrians-protections",
    title: "The US Supreme Court let Trump end protections for Haitians and Syrians. Is that fair?",
    category: "Immigration",
    time: "12h",
    seedVotes: 1940,
    seedCommentsCount: 172,
    seedAgreePercent: 37,
    description: "The US Supreme Court allowed the Trump administration to end temporary protections for some Haitian and Syrian migrants while legal challenges continue. Supporters say temporary programs should not become permanent status. Critics say removing protections could expose people to unsafe conditions and family disruption."
  }),
  seedThread({
    id: "uk-asylum-seekers-settlement-repayment",
    title: "Should asylum seekers repay £10,000 before settling in the UK?",
    category: "Immigration",
    time: "14h",
    seedVotes: 1170,
    seedCommentsCount: 96,
    seedAgreePercent: 44,
    description: "A UK proposal has suggested requiring some asylum seekers to repay support costs before gaining settlement. Supporters say repayment would reduce public costs and reassure taxpayers. Critics say it could trap low-income refugees in debt and make integration harder after protection is granted."
  }),
  seedThread({
    id: "overwhelmed-borders-asylum-seekers",
    title: "Should countries turn away asylum seekers when borders are overwhelmed?",
    category: "Immigration",
    time: "16h",
    seedVotes: 1640,
    seedCommentsCount: 143,
    seedAgreePercent: 53,
    description: "Several countries have argued that asylum systems are under strain from rising arrivals, backlogs, and limited housing. Supporters of turning people away say governments must manage capacity and public services. Critics say international law requires access to asylum even during pressure."
  }),
  seedThread({
    id: "eu-offshore-migrant-detention-centers",
    title: "The EU backed offshore migrant detention centers. Necessary control or human rights abuse?",
    category: "Immigration",
    time: "18h",
    seedVotes: 1420,
    seedCommentsCount: 121,
    seedAgreePercent: 41,
    description: "European leaders have discussed processing or holding some migrants in centers outside the EU to reduce irregular arrivals. Supporters say offshore systems could deter smugglers and restore border control. Critics warn such centers can weaken asylum rights, oversight, and humane treatment."
  }),
  seedThread({
    id: "greece-faster-deportations-asylum",
    title: "Greece approved faster deportations for rejected asylum seekers. Should Europe go harder?",
    category: "Immigration",
    time: "20h",
    seedVotes: 890,
    seedCommentsCount: 67,
    seedAgreePercent: 57,
    description: "Greece has moved to speed up returns for people whose asylum claims are rejected, part of a wider European focus on enforcement. Supporters say quicker deportations make the system credible. Critics say faster timelines can increase mistakes and reduce access to appeals."
  }),
  seedThread({
    id: "us-mass-deportations-protests",
    title: "Should the US carry out mass deportations even if it sparks protests?",
    category: "Immigration",
    time: "22h",
    seedVotes: 2050,
    seedCommentsCount: 180,
    seedAgreePercent: 48,
    description: "US immigration enforcement plans have included wider deportation efforts, drawing protests in some cities and concern from immigrant communities. Supporters say the government must enforce removal orders and border rules. Critics say mass deportations can separate families, disrupt workplaces, and inflame public tension."
  }),
  seedThread({
    id: "egg-companies-donate-price-fixing-claims",
    title: "Egg companies will donate 53 million eggs after price-fixing claims. Is that enough?",
    category: "Cost of Living",
    time: "1d",
    seedVotes: 730,
    seedCommentsCount: 52,
    seedAgreePercent: 35,
    description: "Egg producers agreed to donate 53 million eggs as part of resolving claims linked to alleged price fixing. Supporters say food donations provide direct public benefit and help address high grocery costs. Critics say donations may not fully compensate consumers if prices were unfairly raised."
  }),
  seedThread({
    id: "us-grocery-inflation-food-price-caps",
    title: "US grocery inflation had its biggest jump since 2022. Should governments cap food prices?",
    category: "Cost of Living",
    time: "1d",
    seedVotes: 1560,
    seedCommentsCount: 114,
    seedAgreePercent: 62,
    description: "US grocery prices have risen again, with some measures showing the sharpest increase since the inflation surge of 2022. Supporters of price caps say governments should protect households from essential food costs. Opponents say caps can create shortages, distort supply, and discourage investment."
  }),
  seedThread({
    id: "mcdonalds-us-sales-fast-food-expensive",
    title: "McDonald's missed US sales targets. Has fast food become too expensive?",
    category: "Cost of Living",
    time: "1d",
    seedVotes: 1240,
    seedCommentsCount: 88,
    seedAgreePercent: 69,
    description: "McDonald's has reported weaker US sales as some customers reduce visits or trade down amid higher menu prices. Supporters of the pricing say restaurants face higher labor, rent, and ingredient costs. Critics say fast food is losing its appeal if value meals no longer feel affordable."
  }),
  seedThread({
    id: "canada-grocery-control-supermarket-breakup",
    title: "Canada says five companies control 75% of groceries. Should supermarkets be broken up?",
    category: "Cost of Living",
    time: "2d",
    seedVotes: 980,
    seedCommentsCount: 74,
    seedAgreePercent: 59,
    description: "Canada's grocery market is dominated by a small group of large retailers, raising concern about competition and food prices. Supporters of breaking up chains say concentration can limit choices and bargaining power. Opponents say scale helps supermarkets lower costs, manage supply chains, and keep shelves stocked."
  }),
  seedThread({
    id: "japan-rice-prices-government-stocks",
    title: "Japan's rice prices more than doubled since 2024. Should governments release stocks sooner?",
    category: "Cost of Living",
    time: "2d",
    seedVotes: 860,
    seedCommentsCount: 63,
    seedAgreePercent: 71,
    description: "Japan released government rice reserves after prices rose sharply from 2024 levels, pressuring households and restaurants. Supporters of earlier releases say public stocks should stabilize essential food prices. Critics say frequent releases can discourage farmers and interfere with market signals."
  }),
  seedThread({
    id: "general-mills-profit-price-hikes-inflation",
    title: "General Mills beat profit estimates after price hikes. Are food companies profiting from inflation?",
    category: "Cost of Living",
    time: "3d",
    seedVotes: 640,
    seedCommentsCount: 41,
    seedAgreePercent: 64,
    description: "General Mills has reported stronger-than-expected profit while shoppers continue to face higher packaged food prices. Supporters say price increases reflect higher input, shipping, and wage costs. Critics say strong profits suggest some food companies may be protecting margins while consumers absorb inflation."
  })
];

export const threads: Thread[] = seedThreads.map(({ seedComments: _seedComments, ...thread }) => thread);

export function threadVoteCounts(thread: Pick<Thread, "agree" | "votes" | "seedActivity">) {
  if (thread.seedActivity) {
    return {
      agree: thread.seedActivity.agreeVotes,
      disagree: thread.seedActivity.disagreeVotes
    };
  }
  const agree = Math.round(thread.votes * thread.agree / 100);
  return {
    agree,
    disagree: Math.max(0, thread.votes - agree)
  };
}

export function addThreadVoteCounts(thread: Pick<Thread, "seedActivity">, counts: { agree: number; disagree: number }) {
  if (!thread.seedActivity) return counts;
  return {
    agree: thread.seedActivity.agreeVotes + counts.agree,
    disagree: thread.seedActivity.disagreeVotes + counts.disagree
  };
}

export function mergeSeedThreads(liveThreads: Thread[]) {
  const liveIds = new Set(liveThreads.map((thread) => thread.id));
  return [...liveThreads, ...threads.filter((thread) => !liveIds.has(thread.id))];
}

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
