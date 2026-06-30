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
  agree: number;
  disagree: number;
  comments: number;
  votes: number;
  time: string;
};

export type CountryResult = {
  country: string;
  flag: string;
  agree: number;
};

type SeedCommentTuple = [side: "agree" | "disagree" | "neutral", text: string, positiveVotes: number, negativeVotes: number];
type SeedThread = Thread & { seedComments: SeedCommentTuple[] };

function seedThread(id: string, title: string, category: Category, agree: number, votes: number, comments: number, time: string, seedComments: SeedCommentTuple[], description?: string): SeedThread {
  return { id, title, category, description, agree, disagree: 100 - agree, votes, comments, time, seedComments };
}

const seedThreads: SeedThread[] = [
  seedThread("remote-work", "Remote work should be the default for office jobs", "Work & Business", 68, 1240, 184, "2h", [
    ["agree", "The office should be a resource, not an obligation. Focused work is much easier for me at home.", 42, 4],
    ["disagree", "Early-career staff lose informal learning when nobody is around. Team-level flexibility is a better default.", 31, 8],
    ["neutral", "The real issue is whether companies measure outcomes or attendance. Either setup fails without clear expectations.", 27, 2]
  ], "Companies should need a clear reason to require office attendance—not the other way around."),
  seedThread("ai-education", "Schools should teach students how to use AI tools", "Education", 81, 736, 96, "38m", [
    ["agree", "Students need to learn verification and responsible use before these tools become invisible parts of everyday work.", 38, 3],
    ["disagree", "Basic writing and research habits should be secure first. Introducing AI too early can hide gaps in understanding.", 24, 9],
    ["neutral", "Teach it alongside source checking and require students to explain which parts were assisted.", 33, 1]
  ]),
  seedThread("four-day-week", "The four-day workweek will become the norm", "Work & Business", 55, 512, 73, "1h", [
    ["agree", "Teams that cut low-value meetings can often preserve output while giving people a real recovery day.", 29, 5],
    ["disagree", "It fits some office roles, but customer support and healthcare cannot simply compress demand into four days.", 26, 4],
    ["neutral", "The key distinction is reduced hours versus four longer days. Those are very different proposals.", 35, 1]
  ]),
  seedThread("cashless", "A fully cashless society would do more harm than good", "Money", 49, 889, 121, "3h", [
    ["agree", "Cash is still a useful fallback during outages and for people who cannot easily access banking.", 44, 6],
    ["disagree", "Digital payments are faster and easier to audit. The accessibility problems can be solved without keeping cash forever.", 28, 13],
    ["neutral", "Cashless convenience is valuable, but removing the option entirely creates avoidable resilience and privacy risks.", 39, 2]
  ]),
  seedThread("spoilers", "Spoilers do not actually ruin a good story", "Entertainment", 42, 403, 64, "5h", [
    ["agree", "Knowing the destination sometimes makes the craft more visible, especially on a second viewing.", 20, 7],
    ["disagree", "A carefully built reveal only works once. I want the choice to experience it without advance information.", 32, 4],
    ["neutral", "It depends on the story. A mystery loses more than a character-driven drama when the ending is known.", 37, 1]
  ]),
  seedThread("college", "A college degree is still worth the cost", "Education", 51, 1560, 207, "6h", [
    ["agree", "For fields with structured training and credentials, the degree still opens doors that are difficult to reach otherwise.", 41, 8],
    ["disagree", "The value varies too much by price and subject to make a broad claim. Debt can erase the salary advantage.", 45, 5],
    ["neutral", "Students need transparent completion, employment, and debt data for each program rather than one national average.", 52, 2]
  ]),

  seedThread("quiet-carriages", "Public transport should have more quiet carriages", "Society", 74, 318, 42, "47m", [
    ["agree", "A predictable quiet space would help commuters, parents with sleeping children, and people sensitive to noise.", 26, 2],
    ["disagree", "On crowded routes it would be difficult to enforce and could create conflict over ordinary conversation.", 15, 6],
    ["neutral", "It makes sense on longer trips, but probably not on short urban lines where people constantly board and leave.", 22, 1]
  ]),
  seedThread("community-events", "Cities should fund more free neighborhood events", "Society", 79, 264, 35, "4h", [
    ["agree", "Small recurring events make it easier to meet neighbors without having to buy something or join a club.", 24, 1],
    ["disagree", "Local groups can organize these themselves. City budgets should prioritize services with clearer measurable benefits.", 12, 7],
    ["neutral", "Funding should be modest and distributed across neighborhoods rather than concentrated in a city-center festival.", 19, 2]
  ]),
  seedThread("library-hours", "Public libraries should stay open later on weekdays", "Society", 83, 447, 58, "8h", [
    ["agree", "People working standard hours barely have time to use libraries before closing, especially with a commute.", 31, 2],
    ["disagree", "Later hours require staffing money that might be better spent on weekend access or a stronger digital collection.", 14, 5],
    ["neutral", "A few late nights each week could meet demand without extending every branch every day.", 27, 1]
  ]),
  seedThread("phone-free-events", "Concerts should offer phone-free seating areas", "Society", 61, 529, 76, "11h", [
    ["agree", "An optional section would let people enjoy an unobstructed view without dictating how the entire audience behaves.", 30, 4],
    ["disagree", "People use phones for accessibility, safety, and memories. Separate sections could be awkward to manage.", 21, 8],
    ["neutral", "The word optional matters. A choice is reasonable; locking every phone away is a different policy.", 34, 2]
  ]),

  seedThread("election-holiday", "National elections should be public holidays", "Politics", 71, 683, 88, "2h", [
    ["agree", "Removing a workday barrier would make participation easier, especially for people with inflexible schedules.", 36, 5],
    ["disagree", "Many service workers would still work. Expanded early voting may solve access more evenly than a holiday.", 29, 7],
    ["neutral", "A holiday helps only when paired with enough polling places, mail options, and paid time for essential workers.", 40, 2]
  ]),
  seedThread("local-budget-dashboard", "Local governments should publish simple public budget dashboards", "Politics", 88, 355, 39, "7h", [
    ["agree", "Residents should not need accounting expertise to understand where local taxes are being spent.", 33, 1],
    ["disagree", "Simplified dashboards can remove context and make routine spending look suspicious when it is not.", 10, 6],
    ["neutral", "Publish both: an accessible summary linked directly to the detailed source documents and definitions.", 28, 1]
  ]),
  seedThread("online-consultations", "Public consultations should always include an online option", "Politics", 84, 291, 31, "13h", [
    ["agree", "Evening meetings exclude caregivers, shift workers, and anyone who cannot travel to city hall.", 25, 2],
    ["disagree", "Online responses can be flooded by organized groups and may not represent residents any better.", 11, 5],
    ["neutral", "Use online submissions as one channel, with residency checks and a published summary of all feedback.", 21, 1]
  ]),
  seedThread("local-term-limits", "Large cities should have term limits for mayors", "Politics", 54, 472, 67, "1d", [
    ["agree", "Regular turnover reduces the advantage of incumbency and makes room for new leadership.", 22, 7],
    ["disagree", "Voters should be able to keep an effective mayor. Elections already provide a mechanism for removal.", 25, 5],
    ["neutral", "Long limits may balance continuity and competition better than either unlimited terms or rapid turnover.", 28, 2]
  ]),

  seedThread("salary-ranges", "Job listings should always include a salary range", "Work & Business", 91, 1120, 143, "25m", [
    ["agree", "A range saves time for both sides and reduces the information advantage employers hold during negotiation.", 58, 2],
    ["disagree", "For flexible senior roles the final scope can change substantially depending on the candidate.", 16, 11],
    ["neutral", "Wide ranges are not useful. Listings should also explain what experience places someone at each end.", 43, 3]
  ]),
  seedThread("meeting-free-day", "Every company should protect one meeting-free day each week", "Work & Business", 76, 645, 82, "9h", [
    ["agree", "A shared focus day is more effective than everyone blocking different hours that are constantly overridden.", 39, 3],
    ["disagree", "Global teams and customer-facing roles cannot guarantee the same quiet day every week.", 18, 8],
    ["neutral", "Teams should try it as a default with explicit exceptions rather than treating it as an absolute rule.", 30, 1]
  ]),

  seedThread("split-bills", "Friends should split shared restaurant bills by what each person ordered", "Money", 67, 508, 72, "3h", [
    ["agree", "It avoids quietly making people who ordered less subsidize expensive drinks or dishes they did not choose.", 34, 3],
    ["disagree", "For close friends, calculating every item can make a relaxed meal feel unnecessarily transactional.", 19, 8],
    ["neutral", "Split evenly when costs are similar, and itemize when there is a meaningful difference. Context solves most of this.", 36, 1]
  ]),
  seedThread("subscriptions", "Subscription services should make cancellation as easy as signup", "Money", 94, 980, 118, "6h", [
    ["agree", "If signup takes one screen, cancellation should not require a phone call during limited business hours.", 61, 1],
    ["disagree", "Companies need a chance to confirm identity and explain what access or data will be lost.", 9, 14],
    ["neutral", "A clear confirmation step is reasonable; hidden menus and retention mazes are not.", 48, 1]
  ]),
  seedThread("emergency-fund", "Building an emergency fund should come before investing", "Money", 72, 374, 49, "16h", [
    ["agree", "A cash buffer prevents a routine surprise from turning into high-interest debt or a forced asset sale.", 29, 2],
    ["disagree", "Waiting for a large target can mean missing years of employer matching and compound growth.", 17, 7],
    ["neutral", "A small starter fund and matched retirement contributions can happen together before building a larger reserve.", 31, 1]
  ]),

  seedThread("read-receipts", "Turning off read receipts makes messaging less stressful", "Relationships", 69, 286, 44, "52m", [
    ["agree", "It removes the expectation that seeing a message creates an obligation to answer immediately.", 23, 2],
    ["disagree", "For plans and practical coordination, knowing a message was seen can reduce uncertainty rather than add pressure.", 14, 6],
    ["neutral", "The healthiest approach is agreeing on expectations instead of trying to infer meaning from a tiny status indicator.", 26, 1]
  ]),
  seedThread("shared-calendars", "Couples should use a shared calendar for household plans", "Relationships", 78, 331, 37, "5h", [
    ["agree", "It prevents one person from becoming the default keeper of every appointment and social commitment.", 27, 2],
    ["disagree", "Not every plan needs to be coordinated, and a shared calendar can start to feel like monitoring.", 12, 6],
    ["neutral", "Use it for genuinely shared obligations while keeping personal schedules private by default.", 22, 1]
  ]),
  seedThread("friendship-cancellations", "Canceling plans because you need rest should be socially acceptable", "Relationships", 86, 624, 91, "10h", [
    ["agree", "Rest is a legitimate need, and honest cancellation is better than arriving resentful or exhausted.", 42, 3],
    ["disagree", "Frequent last-minute cancellations shift the cost to other people and can damage trust regardless of the reason.", 25, 9],
    ["neutral", "It is acceptable when communicated early and balanced with making a real effort to reschedule.", 38, 1]
  ]),
  seedThread("group-chat-etiquette", "Important decisions should not be made only in group chats", "Relationships", 64, 248, 33, "1d", [
    ["agree", "Fast-moving chats bury context and make silence look like agreement even when people missed the discussion.", 22, 2],
    ["disagree", "For many friend groups, chat is the only place where everyone can participate asynchronously.", 13, 5],
    ["neutral", "Use chat to discuss, then summarize the decision clearly and give everyone a final chance to respond.", 25, 1]
  ]),

  seedThread("right-to-repair", "People should have a right to repair the devices they buy", "Technology", 89, 1370, 156, "1h", [
    ["agree", "Repair manuals and replacement parts would extend device life and give local shops a fair chance to compete.", 63, 2],
    ["disagree", "Poor repairs can create safety and security risks, especially for batteries and connected devices.", 18, 12],
    ["neutral", "Access should come with clear safety standards, parts labeling, and no requirement for manufacturers to support unsafe modifications.", 47, 3]
  ]),
  seedThread("default-notifications", "Apps should ship with most notifications turned off", "Technology", 82, 748, 102, "4h", [
    ["agree", "Alerts should earn attention through explicit choice rather than enabling every category during installation.", 45, 2],
    ["disagree", "New users may miss useful features or important security notices if defaults are too quiet.", 15, 9],
    ["neutral", "Keep security and direct-message alerts on, then ask users which promotional or activity updates they want.", 40, 1]
  ]),
  seedThread("smart-home-offline", "Smart-home devices should keep basic functions when the internet is down", "Technology", 96, 905, 87, "7h", [
    ["agree", "Lights, locks, and thermostats should not depend on a remote server for basic local controls.", 57, 1],
    ["disagree", "Some advanced features inherently need cloud processing, and fully local hardware can raise prices.", 8, 13],
    ["neutral", "Core controls should be local while optional automation and remote access can depend on connectivity.", 44, 1]
  ]),
  seedThread("algorithm-controls", "Social feeds should offer a simple chronological mode", "Technology", 87, 1195, 134, "12h", [
    ["agree", "People should be able to see accounts they chose to follow without an algorithm constantly rearranging them.", 59, 3],
    ["disagree", "Chronological feeds become noisy quickly and can bury the most relevant posts during busy periods.", 17, 10],
    ["neutral", "Both modes can coexist if the app remembers the user’s choice instead of repeatedly resetting it.", 51, 1]
  ]),

  seedThread("episode-drops", "Streaming shows are better when episodes release weekly", "Entertainment", 58, 694, 98, "2h", [
    ["agree", "A weekly rhythm gives each episode room for discussion and stops a season from disappearing in one weekend.", 34, 6],
    ["disagree", "Binge releases let viewers set their own pace instead of waiting because of a marketing schedule.", 31, 5],
    ["neutral", "Two or three episodes at launch followed by weekly releases is a good compromise for many shows.", 39, 1]
  ]),
  seedThread("movie-intermissions", "Long movies should include an intermission", "Entertainment", 73, 436, 61, "9h", [
    ["agree", "Anything approaching three hours should provide a planned break rather than making people choose a random scene to miss.", 30, 3],
    ["disagree", "A forced pause can break tension and filmmakers already design the runtime as one continuous experience.", 18, 7],
    ["neutral", "Cinemas could advertise selected intermission screenings while still offering uninterrupted showings.", 28, 1]
  ]),
  seedThread("game-difficulty", "Every video game should include flexible difficulty options", "Entertainment", 77, 821, 109, "18h", [
    ["agree", "Options let more people experience a game without preventing anyone from choosing the intended challenge.", 48, 4],
    ["disagree", "In some games, shared difficulty is central to the design and to the community’s common experience.", 23, 11],
    ["neutral", "Accessibility settings and difficulty modes overlap, but they are not identical and should be discussed separately.", 36, 2]
  ]),

  seedThread("youth-sports-score", "Young children’s sports leagues should de-emphasize scores", "Sports", 62, 357, 53, "3h", [
    ["agree", "Early programs should prioritize movement, teamwork, and learning skills before standings and trophies.", 27, 4],
    ["disagree", "Children know who won anyway, and learning to handle competition can be healthy with good coaching.", 20, 6],
    ["neutral", "Keep game scores but avoid season rankings for the youngest groups. That preserves structure without raising the stakes too far.", 29, 1]
  ]),
  seedThread("video-reviews", "More sports should use video review for major decisions", "Sports", 57, 603, 85, "6h", [
    ["agree", "A short review is worth it when one clear mistake could decide an entire match.", 30, 5],
    ["disagree", "Frequent reviews interrupt momentum and still produce arguments over subjective calls.", 28, 5],
    ["neutral", "Limit reviews to objective questions and impose a strict time cap when evidence is inconclusive.", 37, 1]
  ]),
  seedThread("late-games", "Major sports events should avoid very late local start times", "Sports", 81, 489, 64, "14h", [
    ["agree", "Families and local attendees should matter more than maximizing television audiences in distant time zones.", 35, 2],
    ["disagree", "Broadcast revenue supports teams and leagues, and there is no start time that works for every audience.", 14, 8],
    ["neutral", "Occasional late starts are understandable, but routine scheduling after normal family hours reduces access.", 30, 1]
  ]),
  seedThread("recreational-leagues", "Cities should invest more in adult recreational sports", "Sports", 75, 276, 38, "1d", [
    ["agree", "Affordable leagues create exercise and social connection for adults who do not enjoy working out alone.", 25, 2],
    ["disagree", "Public facilities should prioritize youth access before subsidizing organized activities for working adults.", 12, 6],
    ["neutral", "Shared facilities and sliding fees can support both groups without treating the budget as strictly either-or.", 20, 1]
  ]),

  seedThread("financial-literacy", "Personal finance should be a required school subject", "Education", 92, 1480, 172, "32m", [
    ["agree", "Students should practice reading a payslip, comparing loans, making a budget, and recognizing common scams.", 66, 2],
    ["disagree", "A separate requirement may crowd the timetable when these skills could be integrated into mathematics and civics.", 17, 12],
    ["neutral", "The delivery matters less than ensuring every student repeatedly applies the concepts to realistic decisions.", 49, 1]
  ]),
  seedThread("homework-weekends", "Schools should avoid assigning homework over weekends", "Education", 59, 541, 79, "8h", [
    ["agree", "Students need predictable time for family, rest, hobbies, and responsibilities outside school.", 32, 5],
    ["disagree", "Some courses need steady practice, and weekends can give students more control over when to complete it.", 24, 7],
    ["neutral", "Long projects may span weekends, but routine assignments should be designed to fit within the school week.", 35, 1]
  ]),

  seedThread("morning-routines", "A consistent morning routine improves the rest of the day", "Lifestyle", 66, 392, 57, "1h", [
    ["agree", "Removing small morning decisions gives me a calmer start and makes it easier to begin important work.", 27, 3],
    ["disagree", "Rigid routines can become another source of guilt, especially for parents and people with changing shifts.", 19, 7],
    ["neutral", "A few reliable anchors help, but the routine should be flexible enough to survive real life.", 30, 1]
  ]),
  seedThread("decluttering", "Owning fewer things generally makes life easier", "Lifestyle", 71, 468, 68, "5h", [
    ["agree", "Less storage, cleaning, and searching creates real time savings beyond the visual appeal of minimalism.", 31, 3],
    ["disagree", "Replacing discarded items later wastes money and resources. The issue is useful organization, not a low item count.", 22, 8],
    ["neutral", "Keeping what is useful and meaningful is a better goal than chasing an arbitrary minimalist aesthetic.", 33, 1]
  ]),
  seedThread("meal-planning", "Planning meals for the week is worth the effort", "Lifestyle", 79, 583, 74, "12h", [
    ["agree", "Even a loose plan reduces food waste and the repeated evening decision about what to cook.", 37, 2],
    ["disagree", "Schedules and appetites change, so detailed plans can create waste when the week does not go as expected.", 17, 7],
    ["neutral", "Choose a few flexible meals and shared ingredients rather than assigning a fixed dish to every night.", 34, 1]
  ]),
  seedThread("hobby-metrics", "Not every hobby needs goals or progress tracking", "Lifestyle", 84, 337, 46, "1d", [
    ["agree", "A hobby can simply be pleasant. Turning everything into measurable improvement recreates the pressure of work.", 29, 2],
    ["disagree", "Goals can deepen enjoyment and help people continue when the initial novelty fades.", 13, 6],
    ["neutral", "Tracking is useful when it serves curiosity, but not when the tracking becomes the whole activity.", 25, 1]
  ])
];

export const threads: Thread[] = seedThreads.map(({ seedComments: _seedComments, ...thread }) => thread);

function clampPercent(value: number) {
  return Math.max(5, Math.min(95, value));
}

export const countryBreakdowns: Record<string, CountryResult[]> = Object.fromEntries(threads.map((thread, index) => [thread.id, [
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
  thread.seedComments.map(([side, text, positiveVotes, negativeVotes], commentIndex) => ({
    id: (threadIndex + 1) * 100 + commentIndex + 1,
    number: commentIndex + 1,
    author: SEED_GUEST_IDS[(threadIndex * 3 + commentIndex) % SEED_GUEST_IDS.length],
    side,
    text,
    score: positiveVotes - negativeVotes,
    positiveVotes,
    negativeVotes,
    time: COMMENT_TIME_SETS[threadIndex % COMMENT_TIME_SETS.length][commentIndex]
  }))
]));

export const comments = commentsByThread["remote-work"];
