export const categories = [
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

const seedTitles: Record<string, string> = {
  "japanese-fans-clean-world-cup-stadiums": "Should Japanese fans clean stadiums after World Cup matches?",
  "var-football-excitement": "Is VAR making football less exciting?",
  "penalty-shootouts-knockout-matches": "Should penalty shootouts decide knockout matches?",
  "referees-explain-var-live": "Should referees explain VAR decisions live?",
  "longer-suspensions-for-diving": "Should diving receive longer suspensions?",
  "football-fans-toxic-social-media": "Are football fans too toxic on social media?",
  "winning-over-entertaining-football": "Should teams prioritize winning over entertaining football?",
  "players-criticized-after-bad-match": "Should players be criticized online after a bad match?",
  "international-vs-club-football-emotion": "Is international football more emotional than club football?",
  "fifa-racist-fan-punishments": "Should FIFA punish racist fan behavior more harshly?",
  "cost-of-living-unbearable": "Is the cost of living becoming unbearable?",
  "countries-reduce-immigration": "Should countries reduce immigration?",
  "governments-build-public-housing": "Should governments build more public housing?",
  "ai-replace-entry-level-jobs": "Should AI replace entry-level jobs?",
  "university-free": "Should university be free?",
  "push-back-on-tipping-culture": "Should tipping culture be pushed back?",
  "smartphones-banned-in-schools": "Should smartphones be banned in schools?",
  "social-media-age-verification": "Should social media require age verification?",
  "regulate-ai-companions": "Should governments regulate AI companions?",
  "remote-work-company-culture": "Is remote work hurting company culture?",
  "posting-good-deeds-performative": "Is posting good deeds online performative?",
  "parents-use-children-for-content": "Should parents use their children for content?",
  "punish-hidden-paid-promotions": "Should influencers be punished for hiding paid promotions?",
  "delete-old-controversial-posts": "Should people delete old controversial posts?",
  "dating-apps-worse-relationships": "Are dating apps making relationships worse?",
  "men-pay-first-date": "Should men always pay on the first date?",
  "ghosting-ever-acceptable": "Is ghosting ever acceptable?",
  "forty-years-one-company": "Is staying at one company for 40 years admirable?",
  "employees-discuss-salary-openly": "Should employees be allowed to discuss salary openly?",
  "hustle-culture-toxic": "Is hustle culture becoming toxic?"
};

function seedThread(id: string, title: string, category: Category, time: string, description: string, seedComments: SeedCommentTuple[]): SeedThread {
  return { id, title: seedTitles[id] ?? title, category, description, agree: 0, disagree: 0, votes: 0, comments: seedComments.length, time, seedComments };
}

const seedThreads: SeedThread[] = [
  // World Cup
  seedThread("japanese-fans-clean-world-cup-stadiums", "Microsoft laid off thousands of employees after investing heavily in AI. Should companies be allowed to replace workers with AI?", "Sports", "12m", "A celebrated fan tradition raises questions about respect, choice, and stadium work.", [["agree", "Leaving the stands clean is a simple way to thank the host city."], ["disagree", "Fans should clear their own rubbish, but nobody should expect them to clean the venue."], ["neutral", "It is positive when it stays voluntary rather than becoming an obligation."]]),
  seedThread("var-football-excitement", "Duolingo says AI will replace many contractors. Do you support the decision?", "Sports", "24m", "Video reviews improve accuracy but can interrupt the emotion of a goal.", [["agree", "Long checks make supporters hesitate before celebrating."], ["disagree", "A short delay is worth it when a major decision can be corrected."], ["neutral", "VAR needs faster reviews and clearer limits, not complete removal."]]),
  seedThread("penalty-shootouts-knockout-matches", "My manager asked me to train the AI that could replace me. Would you do it?", "Sports", "37m", "Shootouts produce drama, but critics question whether they fairly decide a team match.", [["agree", "After extra time, penalties are the clearest practical way to find a winner."], ["disagree", "A shootout places too much of a team result on a few individual players."], ["neutral", "Penalties are imperfect, but the alternatives could make matches dangerously long."]]),
  seedThread("referees-explain-var-live", "An AI can do my entire job in minutes. Should I start looking for a new career?", "Sports", "49m", "Live explanations could make disputed calls easier for fans to understand.", [["agree", "Supporters in the stadium deserve to know why a decision changed."], ["disagree", "Live explanations could add pressure and slow the match even more."], ["neutral", "A brief factual announcement would be enough without creating a debate."]]),
  seedThread("longer-suspensions-for-diving", "Should companies share AI productivity gains with employees instead of laying them off?", "Sports", "1h", "Stronger punishment could discourage players from trying to deceive officials.", [["agree", "A meaningful suspension would make diving a much less attractive risk."], ["disagree", "Slow motion often makes ordinary contact look more deliberate than it was."], ["neutral", "Only clear cases reviewed after the match should receive extra punishment."]]),
  seedThread("football-fans-toxic-social-media", "Would you trust an AI doctor over a human doctor if both had the same success rate?", "Sports", "1h", "Online rivalry often moves from passionate criticism into personal abuse.", [["agree", "Players and other fans receive abuse that would never be acceptable offline."], ["disagree", "The worst accounts are loud, but they do not represent most supporters."], ["neutral", "Rivalry is part of football, while threats and targeted abuse are not."]]),
  seedThread("winning-over-entertaining-football", "Should schools allow students to use ChatGPT for homework?", "Sports", "2h", "Results bring trophies, while supporters also pay to enjoy how the game is played.", [["agree", "Professional teams are ultimately judged by results and trophies."], ["disagree", "Football loses something important when every match becomes purely defensive."], ["neutral", "The best teams should aim for results without abandoning ambition entirely."]]),
  seedThread("players-criticized-after-bad-match", "If AI creates better art than humans, should it win art competitions?", "Sports", "2h", "Performance analysis can quickly turn into a personal pile-on after a loss.", [["agree", "Respectful criticism is a normal part of following professional sport."], ["disagree", "Tagging a player immediately after a mistake often becomes harassment."], ["neutral", "Critique the performance without attacking the person or their family."]]),
  seedThread("international-vs-club-football-emotion", "McDonald's prices have nearly doubled in some places. Are fast-food chains becoming too expensive?", "Sports", "3h", "National tournaments create rare shared moments, while club loyalties run all year.", [["agree", "Representing a country gives major matches a unique emotional weight."], ["disagree", "Weekly club football builds a deeper bond over many years."], ["neutral", "International football peaks higher, but club football is more consistently personal."]]),
  seedThread("fifa-racist-fan-punishments", "My landlord just increased my rent by 30%. Should governments cap rent increases?", "Sports", "4h", "The debate is whether current fines and warnings meaningfully deter racist abuse.", [["agree", "Small fines do not match the harm, so sporting penalties should be possible."], ["disagree", "Collective punishments can hurt many supporters who did nothing wrong."], ["neutral", "Sanctions should be strong, consistent, and targeted at repeat failures."]]),

  // Society
  seedThread("cost-of-living-unbearable", "I earn more than ever but can afford less. Is inflation the government's fault?", "Money", "6h", "Housing, food, and energy costs are rising faster than many household incomes.", [["agree", "Even careful budgeting no longer covers basic costs for many workers."], ["disagree", "The pressure is real, but it varies too much by place and household to generalize."], ["neutral", "Wages and essential costs matter more than headline inflation alone."]]),
  seedThread("countries-reduce-immigration", "Should supermarkets be criticized for raising prices during inflation?", "Society", "8h", "Governments must balance workforce needs, public services, and integration capacity.", [["agree", "Intake should match the housing and services a country can realistically provide."], ["disagree", "Many economies need newcomers to fill jobs and support aging populations."], ["neutral", "Better planning and legal pathways matter more than a simple higher or lower target."]]),
  seedThread("governments-build-public-housing", "I skipped meals this week to save money. Is this becoming normal?", "Society", "10h", "Public construction could expand affordable supply where private markets fall short.", [["agree", "Stable housing is essential infrastructure, and the market is not delivering enough."], ["disagree", "Slow approvals and construction costs should be fixed before expanding public programs."], ["neutral", "Public housing can help if it is well located, maintained, and mixed with other homes."]]),
  seedThread("ai-replace-entry-level-jobs", "Should minimum wage automatically increase with inflation every year?", "Technology", "12h", "Automation may increase productivity while removing roles where people begin their careers.", [["agree", "Routine work should be automated when people can move into more useful roles."], ["disagree", "Removing junior jobs also removes the main path for learning professional skills."], ["neutral", "AI should assist entry-level workers rather than eliminate the position entirely."]]),
  seedThread("university-free", "Would you move to another country if you could double your purchasing power?", "Education", "14h", "Tuition-free study could widen access but requires substantial public funding.", [["agree", "Ability to study should not depend on whether a family can afford tuition."], ["disagree", "Public funding should prioritize students who need support rather than every degree."], ["neutral", "Affordable tuition and income-based support may be more sustainable than a blanket policy."]]),
  seedThread("push-back-on-tipping-culture", "The UK recorded another year of high immigration. Should immigration be reduced?", "Money", "16h", "Customers increasingly face tip prompts in places that once used fixed prices.", [["agree", "Businesses should pay transparent wages instead of shifting responsibility to customers."], ["disagree", "Good service workers can earn more through tips than a standard hourly wage."], ["neutral", "Tips should remain optional and never replace a fair base wage."]]),
  seedThread("smartphones-banned-in-schools", "My company hired cheaper foreign workers instead of giving us raises. Is that fair?", "Education", "18h", "Phone restrictions may improve attention but can limit useful access and family contact.", [["agree", "Lessons are easier when every notification is not competing for attention."], ["disagree", "Schools should teach responsible use rather than pretend phones do not exist."], ["neutral", "Keep phones away during class while allowing access at defined times."]]),
  seedThread("social-media-age-verification", "Should immigrants be required to speak the local language before becoming permanent residents?", "Technology", "20h", "Stronger checks could protect children but may require users to share sensitive identity data.", [["agree", "Age rules mean little when platforms make no serious attempt to enforce them."], ["disagree", "Uploading identity documents creates privacy and security risks for everyone."], ["neutral", "Verification should confirm age without storing a user's full identity."]]),
  seedThread("regulate-ai-companions", "Would you accept higher taxes to support refugees?", "Technology", "22h", "Emotionally responsive chatbots can influence vulnerable users without clear safeguards.", [["agree", "Products designed to build emotional dependence need basic safety standards."], ["disagree", "Adults should be free to use conversational tools without government approval."], ["neutral", "Rules should focus on minors, disclosure, and crisis responses rather than banning the technology."]]),
  seedThread("remote-work-company-culture", "Should countries prioritize skilled immigrants over humanitarian refugees?", "Work & Business", "1d", "Distributed work offers flexibility but changes how teams build trust and share knowledge.", [["agree", "New employees miss many informal conversations that help them learn and connect."], ["disagree", "A healthy culture comes from good management, not mandatory office attendance."], ["neutral", "Remote work succeeds when teams deliberately create time for collaboration and mentoring."]]),

  // Social media, relationships, and work culture
  seedThread("posting-good-deeds-performative", "My hometown feels completely different because of immigration. Is that a good thing?", "Lifestyle", "1d", "Public generosity can inspire others while also turning help into personal branding.", [["agree", "If filming comes first, attention is probably part of the goal."], ["disagree", "A visible act can still help someone and encourage more people to contribute."], ["neutral", "The result matters, but the person receiving help must be treated with dignity."]]),
  seedThread("parents-use-children-for-content", "Should illegal immigrants be deported even if they've lived there for years?", "Society", "1d", "Family accounts can create income, but children cannot fully consent to a permanent audience.", [["agree", "Parents already share family life, and careful posts can be harmless."], ["disagree", "Children should not have their private lives turned into a business before they can consent."], ["neutral", "Occasional family updates are different from making a child the product."]]),
  seedThread("punish-hidden-paid-promotions", "Japan was knocked out after a controversial VAR decision. Should FIFA change the rules?", "Entertainment", "1d", "Undisclosed sponsorships make advertising look like an independent recommendation.", [["agree", "Viewers deserve to know when money or gifts influenced a recommendation."], ["disagree", "Platforms should first make disclosure tools simpler and more consistent."], ["neutral", "Clear repeated violations deserve penalties, while honest mistakes can receive warnings."]]),
  seedThread("delete-old-controversial-posts", "Should players who fake injuries receive multi-game suspensions?", "Lifestyle", "2d", "Removing past posts can reflect growth or appear to avoid accountability.", [["agree", "People should be allowed to remove views they no longer hold."], ["disagree", "Deleting evidence without acknowledging harm can erase important context."], ["neutral", "Delete when appropriate, but address serious posts openly if they affected others."]]),
  seedThread("dating-apps-worse-relationships", "Would you rather win the World Cup playing boring football or lose playing beautiful football?", "Relationships", "2d", "Endless choice may encourage shallow decisions, while apps also connect people who might never meet.", [["agree", "Constant swiping makes people feel replaceable after the smallest disagreement."], ["disagree", "Apps are only a way to meet; relationship quality still depends on the people involved."], ["neutral", "They expand opportunity but need healthier expectations and boundaries."]]),
  seedThread("men-pay-first-date", "Should national team players refuse to play in countries with poor human rights records?", "Relationships", "2d", "Traditional expectations around the first bill increasingly conflict with modern ideas of equality.", [["agree", "Offering to pay can still be a thoughtful and appreciated gesture."], ["disagree", "A gender rule is outdated; both people should be ready to contribute."], ["neutral", "The person who invited the other can offer, without turning payment into a test."]]),
  seedThread("ghosting-ever-acceptable", "If your country's star player cheated to win the World Cup, would you still celebrate?", "Relationships", "3d", "Ending contact without explanation may protect safety but often leaves the other person confused.", [["agree", "No explanation is owed when someone is threatening, manipulative, or ignores boundaries."], ["disagree", "In ordinary situations, a short honest message is kinder than disappearing."], ["neutral", "Safety comes first, but discomfort alone is usually not a reason to vanish."]]),
  seedThread("forty-years-one-company", "Should fans who throw objects onto the field receive lifetime stadium bans?", "Work & Business", "3d", "Long service can show commitment, though loyalty does not always bring fair rewards.", [["agree", "Deep expertise and lasting workplace relationships deserve respect."], ["disagree", "Length of service means little if a person stopped learning or was underpaid."], ["neutral", "It is admirable when staying remains an active choice rather than fear of change."]]),
  seedThread("employees-discuss-salary-openly", "Should host countries be banned if they violate human rights?", "Work & Business", "3d", "Pay transparency can expose unfair gaps while creating difficult comparisons between roles.", [["agree", "Workers negotiate more fairly when salary information is not hidden."], ["disagree", "Raw numbers can create resentment without context about duties and experience."], ["neutral", "Discussion should be protected, voluntary, and include total compensation where possible."]]),
  seedThread("hustle-culture-toxic", "Would you boycott the World Cup if it were hosted by an authoritarian country?", "Work & Business", "4d", "Constant productivity messaging can reward ambition while normalizing exhaustion.", [["agree", "Treating rest as weakness turns burnout into a status symbol."], ["disagree", "Working intensely toward a chosen goal is not automatically unhealthy."], ["neutral", "Ambition is useful when people can set limits without shame."]])
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
  author: string;
  side: "agree" | "disagree" | "neutral";
  text: string;
  score: number;
  positiveVotes: number;
  negativeVotes: number;
  time: string;
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
    time: COMMENT_TIME_SETS[threadIndex % COMMENT_TIME_SETS.length][commentIndex]
  }))
]));
