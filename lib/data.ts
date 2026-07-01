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

export const categoryFilters = [
  { slug: "AI", categories: ["AI & Work", "AI & Tech"], icon: "AI", color: "sage" },
  { slug: "World Cup", categories: ["World Cup"], icon: "◉", color: "green" },
  { slug: "Immigration", categories: ["Immigration"], icon: "↗", color: "blue" },
  { slug: "Cost of Living", categories: ["Cost of Living"], icon: "$", color: "gold" },
  { slug: "Politics", categories: ["Politics"], icon: "⚑", color: "blue" },
  { slug: "Technology", categories: ["Technology"], icon: "⌘", color: "lavender" },
  { slug: "Society", categories: ["Society"], icon: "◎", color: "peach" }
] as const satisfies readonly { slug: string; categories: readonly Category[]; icon: string; color: string }[];

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
    time: "18m",
    seedVotes: 1840,
    seedCommentsCount: 118,
    seedAgreePercent: 42,
    description: "Microsoft has announced large job cuts while continuing major investments in AI infrastructure and products. Supporters argue the company must redirect resources toward future growth and stay competitive. Critics say profitable tech firms should not reduce staff while spending heavily on automation."
  }),
  seedThread({
    id: "meta-workers-ai-roles-layoffs",
    title: "Meta is pushing workers into AI roles after layoffs. Is this the future of work?",
    category: "AI & Work",
    time: "2h",
    seedVotes: 1320,
    seedCommentsCount: 78,
    seedAgreePercent: 56,
    description: "Meta has reorganized parts of its workforce around AI after earlier layoffs and new hiring for advanced AI teams. Supporters see this as a necessary shift as user products and advertising become more AI-driven. Critics worry workers are being pushed to retrain while stable roles disappear."
  }),
  seedThread({
    id: "oracle-ai-data-center-layoffs",
    title: "Oracle is shrinking staff while chasing huge AI data-center deals. Is this progress or damage?",
    category: "AI & Work",
    time: "8h",
    seedVotes: 910,
    seedCommentsCount: 56,
    seedAgreePercent: 47,
    description: "Oracle has cut jobs while expanding cloud and AI data-center commitments tied to rising demand for computing power. Supporters argue the company is moving capital toward higher-growth infrastructure. Critics say the benefits of AI deals are uneven if employees lose work during the transition."
  }),
  seedThread({
    id: "tesla-driverless-robotaxis-austin",
    title: "Tesla is rolling out driverless robotaxis in Austin. Would you ride one?",
    category: "AI & Tech",
    time: "5h",
    seedVotes: 1510,
    seedCommentsCount: 91,
    seedAgreePercent: 51,
    description: "Tesla began limited robotaxi service in Austin as it tests driverless rides under real traffic conditions. Supporters say autonomous taxis could lower transport costs and improve road safety over time. Critics point to safety incidents, regulation gaps, and the risks of public testing."
  }),
  seedThread({
    id: "ai-training-authors-musicians-pay",
    title: "Should AI companies pay authors and musicians before training on their work?",
    category: "AI & Tech",
    time: "2 days",
    seedVotes: 2260,
    seedCommentsCount: 154,
    seedAgreePercent: 68,
    description: "Authors, musicians, and publishers have challenged AI companies over training systems on copyrighted books, songs, and recordings. Supporters of payment say creators should control and profit from their work. Opponents argue training can be fair use or that broad licensing could slow innovation."
  }),
  seedThread({
    id: "portugal-croatia-world-cup-resale-prices",
    title: "Portugal vs Croatia World Cup resale tickets hit over $3,000. Should FIFA cap prices?",
    category: "World Cup",
    time: "47m",
    seedVotes: 1490,
    seedCommentsCount: 102,
    seedAgreePercent: 63,
    description: "Some resale listings for Portugal vs Croatia World Cup tickets have climbed above $3,000 as demand outpaces supply. Supporters of caps say major tournaments should remain accessible to ordinary fans. Opponents say resale prices reflect market demand and restrictions can push trading underground."
  }),
  seedThread({
    id: "world-cup-final-ticket-prices-rich",
    title: "World Cup final tickets reached nearly $33,000. Is football becoming only for the rich?",
    category: "World Cup",
    time: "6h",
    seedVotes: 2180,
    seedCommentsCount: 160,
    seedAgreePercent: 72,
    description: "World Cup final ticket listings have appeared at extremely high resale prices, with some near $33,000. Supporters of premium pricing say scarce seats for global events will always command high prices. Critics argue football loses its public character when many fans cannot realistically attend."
  }),
  seedThread({
    id: "fifa-dynamic-pricing-world-cup",
    title: "Should FIFA be allowed to use dynamic pricing for World Cup tickets?",
    category: "World Cup",
    time: "Yesterday",
    seedVotes: 1210,
    seedCommentsCount: 74,
    seedAgreePercent: 39,
    description: "FIFA has faced scrutiny over ticket prices and the possibility of prices moving with demand for major World Cup matches. Supporters say dynamic pricing can manage demand and capture revenue for the tournament. Critics say it creates uncertainty and can price loyal fans out."
  }),
  seedThread({
    id: "iran-officials-us-visas-world-cup",
    title: "Iran officials were denied US visas for the World Cup. Should hosts control who gets in?",
    category: "World Cup",
    time: "3 days",
    seedVotes: 860,
    seedCommentsCount: 58,
    seedAgreePercent: 54,
    description: "Iranian football officials reportedly faced US visa denials connected to World Cup events hosted in North America. Supporters say host countries must control entry under their own security and immigration rules. Critics argue global tournaments require predictable access for qualified teams and officials."
  }),
  seedThread({
    id: "fifa-hosts-strict-immigration-rules",
    title: "Should FIFA avoid host countries with strict immigration rules?",
    category: "World Cup",
    time: "7h",
    seedVotes: 1030,
    seedCommentsCount: 69,
    seedAgreePercent: 58,
    description: "The 2026 World Cup will be held across countries with different visa and immigration systems, creating questions about access for fans, teams, and officials. Supporters of stricter host standards say FIFA should protect participation. Opponents say immigration policy is a national decision."
  }),
  seedThread({
    id: "rights-groups-fifa-inclusivity-2026",
    title: "Rights groups warned FIFA about inclusivity at the 2026 World Cup. Should FIFA intervene?",
    category: "World Cup",
    time: "5 days",
    seedVotes: 760,
    seedCommentsCount: 44,
    seedAgreePercent: 61,
    description: "Rights groups have urged FIFA to address concerns about discrimination, border access, and fan safety before the 2026 World Cup. Supporters say FIFA should set clear inclusivity requirements for hosts. Critics say the organization should avoid overstepping into domestic law and politics."
  }),
  seedThread({
    id: "world-cup-expanded-48-teams",
    title: "The World Cup expanded to 48 teams. Is bigger actually better?",
    category: "World Cup",
    time: "2 days",
    seedVotes: 1340,
    seedCommentsCount: 84,
    seedAgreePercent: 46,
    description: "The 2026 World Cup will expand from 32 to 48 teams, adding more matches and more national representation. Supporters say the format gives more countries and fans a chance to participate. Critics say expansion may dilute quality, strain players, and make the tournament harder to follow."
  }),
  seedThread({
    id: "world-cup-ticket-demand-fan-priority",
    title: "World Cup ticket demand was oversubscribed over 30 times. Should real fans get priority?",
    category: "World Cup",
    time: "11h",
    seedVotes: 1720,
    seedCommentsCount: 129,
    seedAgreePercent: 66,
    description: "Early World Cup ticket demand has far exceeded available seats, with some reports describing applications many times above supply. Supporters of fan priority say long-time supporters should not lose out to resellers or corporate buyers. Opponents say lotteries and open sales are simpler and fairer."
  }),
  seedThread({
    id: "supreme-court-trump-haitians-syrians-protections",
    title: "The US Supreme Court let Trump end protections for Haitians and Syrians. Is that fair?",
    category: "Immigration",
    time: "3h",
    seedVotes: 1940,
    seedCommentsCount: 174,
    seedAgreePercent: 37,
    description: "The US Supreme Court allowed the Trump administration to end temporary protections for some Haitian and Syrian migrants while legal challenges continue. Supporters say temporary programs should not become permanent status. Critics say removing protections could expose people to unsafe conditions and family disruption."
  }),
  seedThread({
    id: "uk-asylum-seekers-settlement-repayment",
    title: "Should asylum seekers repay £10,000 before settling in the UK?",
    category: "Immigration",
    time: "9h",
    seedVotes: 1170,
    seedCommentsCount: 82,
    seedAgreePercent: 44,
    description: "A UK proposal has suggested requiring some asylum seekers to repay support costs before gaining settlement. Supporters say repayment would reduce public costs and reassure taxpayers. Critics say it could trap low-income refugees in debt and make integration harder after protection is granted."
  }),
  seedThread({
    id: "overwhelmed-borders-asylum-seekers",
    title: "Should countries turn away asylum seekers when borders are overwhelmed?",
    category: "Immigration",
    time: "Yesterday",
    seedVotes: 1640,
    seedCommentsCount: 148,
    seedAgreePercent: 53,
    description: "Several countries have argued that asylum systems are under strain from rising arrivals, backlogs, and limited housing. Supporters of turning people away say governments must manage capacity and public services. Critics say international law requires access to asylum even during pressure."
  }),
  seedThread({
    id: "eu-offshore-migrant-detention-centers",
    title: "The EU backed offshore migrant detention centers. Necessary control or human rights abuse?",
    category: "Immigration",
    time: "4 days",
    seedVotes: 1420,
    seedCommentsCount: 116,
    seedAgreePercent: 41,
    description: "European leaders have discussed processing or holding some migrants in centers outside the EU to reduce irregular arrivals. Supporters say offshore systems could deter smugglers and restore border control. Critics warn such centers can weaken asylum rights, oversight, and humane treatment."
  }),
  seedThread({
    id: "greece-faster-deportations-asylum",
    title: "Greece approved faster deportations for rejected asylum seekers. Should Europe go harder?",
    category: "Immigration",
    time: "2 days",
    seedVotes: 890,
    seedCommentsCount: 61,
    seedAgreePercent: 57,
    description: "Greece has moved to speed up returns for people whose asylum claims are rejected, part of a wider European focus on enforcement. Supporters say quicker deportations make the system credible. Critics say faster timelines can increase mistakes and reduce access to appeals."
  }),
  seedThread({
    id: "us-mass-deportations-protests",
    title: "Should the US carry out mass deportations even if it sparks protests?",
    category: "Immigration",
    time: "12h",
    seedVotes: 2050,
    seedCommentsCount: 184,
    seedAgreePercent: 48,
    description: "US immigration enforcement plans have included wider deportation efforts, drawing protests in some cities and concern from immigrant communities. Supporters say the government must enforce removal orders and border rules. Critics say mass deportations can separate families, disrupt workplaces, and inflame public tension."
  }),
  seedThread({
    id: "egg-companies-donate-price-fixing-claims",
    title: "Egg companies will donate 53 million eggs after price-fixing claims. Is that enough?",
    category: "Cost of Living",
    time: "4h",
    seedVotes: 730,
    seedCommentsCount: 39,
    seedAgreePercent: 35,
    description: "Egg producers agreed to donate 53 million eggs as part of resolving claims linked to alleged price fixing. Supporters say food donations provide direct public benefit and help address high grocery costs. Critics say donations may not fully compensate consumers if prices were unfairly raised."
  }),
  seedThread({
    id: "us-grocery-inflation-food-price-caps",
    title: "US grocery inflation had its biggest jump since 2022. Should governments cap food prices?",
    category: "Cost of Living",
    time: "7h",
    seedVotes: 1560,
    seedCommentsCount: 125,
    seedAgreePercent: 62,
    description: "US grocery prices have risen again, with some measures showing the sharpest increase since the inflation surge of 2022. Supporters of price caps say governments should protect households from essential food costs. Opponents say caps can create shortages, distort supply, and discourage investment."
  }),
  seedThread({
    id: "mcdonalds-us-sales-fast-food-expensive",
    title: "McDonald's missed US sales targets. Has fast food become too expensive?",
    category: "Cost of Living",
    time: "Yesterday",
    seedVotes: 1240,
    seedCommentsCount: 86,
    seedAgreePercent: 69,
    description: "McDonald's has reported weaker US sales as some customers reduce visits or trade down amid higher menu prices. Supporters of the pricing say restaurants face higher labor, rent, and ingredient costs. Critics say fast food is losing its appeal if value meals no longer feel affordable."
  }),
  seedThread({
    id: "canada-grocery-control-supermarket-breakup",
    title: "Canada says five companies control 75% of groceries. Should supermarkets be broken up?",
    category: "Cost of Living",
    time: "2 days",
    seedVotes: 980,
    seedCommentsCount: 64,
    seedAgreePercent: 59,
    description: "Canada's grocery market is dominated by a small group of large retailers, raising concern about competition and food prices. Supporters of breaking up chains say concentration can limit choices and bargaining power. Opponents say scale helps supermarkets lower costs, manage supply chains, and keep shelves stocked."
  }),
  seedThread({
    id: "japan-rice-prices-government-stocks",
    title: "Japan's rice prices more than doubled since 2024. Should governments release stocks sooner?",
    category: "Cost of Living",
    time: "3 days",
    seedVotes: 860,
    seedCommentsCount: 59,
    seedAgreePercent: 71,
    description: "Japan released government rice reserves after prices rose sharply from 2024 levels, pressuring households and restaurants. Supporters of earlier releases say public stocks should stabilize essential food prices. Critics say frequent releases can discourage farmers and interfere with market signals."
  }),
  seedThread({
    id: "general-mills-profit-price-hikes-inflation",
    title: "General Mills beat profit estimates after price hikes. Are food companies profiting from inflation?",
    category: "Cost of Living",
    time: "5 days",
    seedVotes: 640,
    seedCommentsCount: 34,
    seedAgreePercent: 64,
    description: "General Mills has reported stronger-than-expected profit while shoppers continue to face higher packaged food prices. Supporters say price increases reflect higher input, shipping, and wage costs. Critics say strong profits suggest some food companies may be protecting margins while consumers absorb inflation."
  })
];

const homeSeedOrder = [
  "microsoft-ai-spending-layoffs",
  "portugal-croatia-world-cup-resale-prices",
  "supreme-court-trump-haitians-syrians-protections",
  "egg-companies-donate-price-fixing-claims",
  "meta-workers-ai-roles-layoffs",
  "world-cup-final-ticket-prices-rich",
  "uk-asylum-seekers-settlement-repayment",
  "us-grocery-inflation-food-price-caps",
  "tesla-driverless-robotaxis-austin",
  "fifa-hosts-strict-immigration-rules",
  "us-mass-deportations-protests",
  "mcdonalds-us-sales-fast-food-expensive",
  "oracle-ai-data-center-layoffs",
  "world-cup-ticket-demand-fan-priority",
  "overwhelmed-borders-asylum-seekers",
  "canada-grocery-control-supermarket-breakup",
  "ai-training-authors-musicians-pay",
  "fifa-dynamic-pricing-world-cup",
  "greece-faster-deportations-asylum",
  "japan-rice-prices-government-stocks",
  "world-cup-expanded-48-teams",
  "eu-offshore-migrant-detention-centers",
  "general-mills-profit-price-hikes-inflation",
  "iran-officials-us-visas-world-cup",
  "rights-groups-fifa-inclusivity-2026"
] as const;

const seedThreadById = new Map(seedThreads.map((thread) => [thread.id, thread]));

export const threads: Thread[] = homeSeedOrder
  .map((id) => seedThreadById.get(id))
  .filter((thread): thread is SeedThread => Boolean(thread))
  .map(({ seedComments: _seedComments, ...thread }) => thread);

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

function seedThreadAgeMinutes(time: string) {
  if (time === "Yesterday") return 24 * 60;
  const value = Number.parseFloat(time);
  if (/day|d$/i.test(time)) return value * 24 * 60;
  if (/h$/i.test(time)) return value * 60;
  return value;
}

function formatSeedCommentTime(minutes: number) {
  if (minutes >= 24 * 60) return `${Math.max(1, Math.floor(minutes / (24 * 60)))}d`;
  if (minutes >= 60) return `${Math.max(1, Math.floor(minutes / 60))}h`;
  return `${Math.max(1, Math.round(minutes))}m`;
}

const SEED_COMMENT_SETS: Record<string, SeedCommentTuple[]> = {
  "microsoft-ai-spending-layoffs": [
    ["agree", "If AI really boosts productivity, workers should share some of the upside too."],
    ["disagree", "Companies have always shifted money toward the next platform. The hard part is helping people move with it."],
    ["neutral", "The problem may be less AI itself and more who captures the benefits first."]
  ],
  "meta-workers-ai-roles-layoffs": [
    ["agree", "Retraining sounds reasonable, but it is different when the old role disappears before the new one is stable."],
    ["disagree", "People in tech have had to adapt every few years. AI is faster, but the pattern is not totally new."],
    ["neutral", "It depends whether workers are being given real time and support, not just a new title."]
  ],
  "oracle-ai-data-center-layoffs": [
    ["agree", "AI infrastructure can be good business and still leave communities worse off in the short term."],
    ["disagree", "If the company does not chase cloud demand now, those jobs may be at risk later anyway."],
    ["neutral", "The public sees the layoffs immediately, but the promised AI jobs are much harder to verify."]
  ],
  "tesla-driverless-robotaxis-austin": [
    ["agree", "I would try it in a limited area, but only if there is clear reporting when something goes wrong."],
    ["disagree", "Public roads should not be the beta test unless regulators can actually inspect the system."],
    ["neutral", "The question is not just safety today, but whether the rollout improves fast enough to justify the risk."]
  ],
  "ai-training-authors-musicians-pay": [
    ["agree", "Training on creative work without a license feels like taking the market first and negotiating later."],
    ["disagree", "A broad payment rule could make only the biggest AI companies able to afford development."],
    ["neutral", "Maybe the answer is collective licensing, but it has to be simple enough to actually use."]
  ],
  "portugal-croatia-world-cup-resale-prices": [
    ["agree", "A cap makes sense if tickets are meant for supporters and not just whoever can pay the most."],
    ["disagree", "Hard caps often push resale into less transparent places. That can make scams worse."],
    ["neutral", "Verified resale with limits on profit might be a better middle ground than a full ban."]
  ],
  "world-cup-final-ticket-prices-rich": [
    ["agree", "When final tickets cost more than a car, the event stops feeling like football culture."],
    ["disagree", "Finals are rare global events, so some luxury pricing is probably unavoidable."],
    ["neutral", "FIFA could keep premium seats expensive while protecting a real block for ordinary fans."]
  ],
  "fifa-dynamic-pricing-world-cup": [
    ["agree", "Dynamic pricing might be fairer than resellers capturing all the demand, if there are strict limits."],
    ["disagree", "Fans need predictable prices before they plan travel. Moving prices make that harder."],
    ["neutral", "The details matter: transparent caps would feel very different from airline-style pricing."]
  ],
  "iran-officials-us-visas-world-cup": [
    ["agree", "Host countries still have to apply their own entry rules, even during a tournament."],
    ["disagree", "If a country hosts a global event, basic access for qualified teams and officials should be predictable."],
    ["neutral", "This is exactly why FIFA should settle visa guarantees before awarding events."]
  ],
  "fifa-hosts-strict-immigration-rules": [
    ["agree", "FIFA should care if fans and teams cannot realistically enter the host country."],
    ["disagree", "Immigration policy is not something a sports body should be able to override."],
    ["neutral", "Maybe hosts should meet minimum access rules, while still keeping normal security checks."]
  ],
  "rights-groups-fifa-inclusivity-2026": [
    ["agree", "FIFA benefits from calling it a global event, so it should defend basic access and safety."],
    ["disagree", "There is a limit to how much FIFA can police local law without becoming political."],
    ["neutral", "Clear tournament rules before tickets go on sale would help more than vague statements later."]
  ],
  "world-cup-expanded-48-teams": [
    ["agree", "More countries getting a real chance is worth some messiness in the format."],
    ["disagree", "The tournament already felt long. More games could make the group stage less sharp."],
    ["neutral", "It may work if the schedule protects players and the knockout path stays easy to follow."]
  ],
  "world-cup-ticket-demand-fan-priority": [
    ["agree", "Long-time supporters should not be competing on equal terms with bots and corporate buyers."],
    ["disagree", "Fan priority sounds nice, but deciding who counts as a real fan can get unfair quickly."],
    ["neutral", "A lottery plus verified resale limits might be less messy than judging fan status."]
  ],
  "supreme-court-trump-haitians-syrians-protections": [
    ["agree", "Temporary status cannot be open-ended forever, or the policy loses its meaning."],
    ["disagree", "Ending protection while conditions are still unstable can punish people for delays they did not create."],
    ["neutral", "There should be a clearer path between temporary protection and long-term review."]
  ],
  "uk-asylum-seekers-settlement-repayment": [
    ["agree", "Some repayment after people are settled could reassure taxpayers if it is income-based."],
    ["disagree", "Starting a new life with a large debt sounds like a recipe for poor integration."],
    ["neutral", "If repayment exists, it should be slow, capped, and waived for people on low incomes."]
  ],
  "overwhelmed-borders-asylum-seekers": [
    ["agree", "Capacity has to mean something. Otherwise local services take the pressure without any plan."],
    ["disagree", "The right to ask for asylum cannot disappear just because a system is badly managed."],
    ["neutral", "Countries need faster processing and shared capacity, not just a yes-or-no border rule."]
  ],
  "eu-offshore-migrant-detention-centers": [
    ["agree", "If offshore processing reduces smuggling deaths, it should at least be discussed seriously."],
    ["disagree", "Moving people out of sight makes abuse and legal shortcuts more likely."],
    ["neutral", "Any offshore system would need independent monitoring and real appeal rights to be credible."]
  ],
  "greece-faster-deportations-asylum": [
    ["agree", "A system where rejected cases never lead to removal loses public trust."],
    ["disagree", "Speed is not worth much if mistakes become harder to correct."],
    ["neutral", "Faster decisions are fine only if legal help and appeals remain realistic."]
  ],
  "us-mass-deportations-protests": [
    ["agree", "Governments cannot ignore removal orders forever because enforcement is unpopular."],
    ["disagree", "Mass deportations would hit families and workplaces in ways the policy debate often ignores."],
    ["neutral", "Prioritizing serious cases first would be more defensible than a broad sweep."]
  ],
  "egg-companies-donate-price-fixing-claims": [
    ["agree", "Food donations help people immediately, which is better than a settlement nobody notices."],
    ["disagree", "If prices were unfairly raised, donations do not really repay the shoppers who overpaid."],
    ["neutral", "It may be useful, but it should not replace stronger rules against price manipulation."]
  ],
  "us-grocery-inflation-food-price-caps": [
    ["agree", "Essentials are different from normal goods. Families cannot just skip groceries."],
    ["disagree", "Price caps can backfire if stores reduce supply or stop discounting other items."],
    ["neutral", "Targeted vouchers might protect households without freezing prices across the whole market."]
  ],
  "mcdonalds-us-sales-fast-food-expensive": [
    ["agree", "Fast food used to be the cheap fallback. If it is not cheap, people will cook or trade down."],
    ["disagree", "Restaurants are also paying more for labor, rent, and ingredients. It is not just greed."],
    ["neutral", "The brand problem is value: people will accept higher prices only if the meal feels worth it."]
  ],
  "canada-grocery-control-supermarket-breakup": [
    ["agree", "When a few chains dominate food, shoppers have very little leverage."],
    ["disagree", "Breaking up supermarkets could raise costs if smaller chains lose supply-chain scale."],
    ["neutral", "More competition matters, but it may come from supplier rules and local entrants too."]
  ],
  "japan-rice-prices-government-stocks": [
    ["agree", "For a staple food, government stocks should be used before prices shock households."],
    ["disagree", "Releasing stocks too often can make farmers less willing to invest in production."],
    ["neutral", "A trigger rule based on price movement would be better than waiting for political pressure."]
  ],
  "general-mills-profit-price-hikes-inflation": [
    ["agree", "Strong profits during grocery inflation make it fair to ask whether margins are being protected too much."],
    ["disagree", "Profit estimates do not prove price gouging. Costs and product mix can change a lot."],
    ["neutral", "More transparent margin data would make this debate less guesswork."]
  ]
};

export const commentsByThread: Record<string, Comment[]> = Object.fromEntries(seedThreads.map((thread, threadIndex) => [
  thread.id,
  (SEED_COMMENT_SETS[thread.id] ?? thread.seedComments).map(([side, text], commentIndex) => ({
    id: (threadIndex + 1) * 100 + commentIndex + 1,
    number: commentIndex + 1,
    author: SEED_GUEST_IDS[(threadIndex * 3 + commentIndex) % SEED_GUEST_IDS.length],
    side,
    text,
    score: 0,
    positiveVotes: 0,
    negativeVotes: 0,
    time: formatSeedCommentTime(seedThreadAgeMinutes(thread.time) * [0.2, 0.5, 0.8][commentIndex]),
    createdAt: new Date(Date.UTC(2026, 6, 2, 5 + threadIndex % 6, 10 + commentIndex * 7)).toISOString()
  }))
]));
