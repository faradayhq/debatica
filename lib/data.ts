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
  time: string;
};

export type CountryResult = {
  country: string;
  flag: string;
  agree: number;
};

export const threads: Thread[] = [
  {
    id: "remote-work",
    title: "Remote work should be the default for office jobs",
    category: "Work & Business",
    description: "Companies should need a clear reason to require office attendance—not the other way around.",
    agree: 68,
    disagree: 32,
    comments: 184,
    time: "2h"
  },
  {
    id: "ai-education",
    title: "Schools should teach students how to use AI tools",
    category: "Education",
    agree: 81,
    disagree: 19,
    comments: 96,
    time: "38m"
  },
  {
    id: "four-day-week",
    title: "The four-day workweek will become the norm",
    category: "Work & Business",
    agree: 55,
    disagree: 45,
    comments: 73,
    time: "1h"
  },
  {
    id: "cashless",
    title: "A fully cashless society would do more harm than good",
    category: "Money",
    agree: 49,
    disagree: 51,
    comments: 121,
    time: "3h"
  },
  {
    id: "spoilers",
    title: "Spoilers do not actually ruin a good story",
    category: "Entertainment",
    agree: 42,
    disagree: 58,
    comments: 64,
    time: "5h"
  },
  {
    id: "college",
    title: "A college degree is still worth the cost",
    category: "Education",
    agree: 51,
    disagree: 49,
    comments: 207,
    time: "6h"
  }
];

export const countryBreakdowns: Record<string, CountryResult[]> = {
  "remote-work": [
    { country: "Japan", flag: "🇯🇵", agree: 74 },
    { country: "United States", flag: "🇺🇸", agree: 51 },
    { country: "United Kingdom", flag: "🇬🇧", agree: 59 },
    { country: "India", flag: "🇮🇳", agree: 82 }
  ],
  "ai-education": [
    { country: "Japan", flag: "🇯🇵", agree: 76 },
    { country: "United States", flag: "🇺🇸", agree: 73 },
    { country: "United Kingdom", flag: "🇬🇧", agree: 79 },
    { country: "India", flag: "🇮🇳", agree: 91 }
  ],
  "four-day-week": [
    { country: "Japan", flag: "🇯🇵", agree: 48 },
    { country: "United States", flag: "🇺🇸", agree: 52 },
    { country: "United Kingdom", flag: "🇬🇧", agree: 66 },
    { country: "India", flag: "🇮🇳", agree: 58 }
  ],
  cashless: [
    { country: "Japan", flag: "🇯🇵", agree: 44 },
    { country: "United States", flag: "🇺🇸", agree: 53 },
    { country: "United Kingdom", flag: "🇬🇧", agree: 47 },
    { country: "India", flag: "🇮🇳", agree: 61 }
  ],
  spoilers: [
    { country: "Japan", flag: "🇯🇵", agree: 39 },
    { country: "United States", flag: "🇺🇸", agree: 45 },
    { country: "United Kingdom", flag: "🇬🇧", agree: 41 },
    { country: "India", flag: "🇮🇳", agree: 46 }
  ],
  college: [
    { country: "Japan", flag: "🇯🇵", agree: 57 },
    { country: "United States", flag: "🇺🇸", agree: 43 },
    { country: "United Kingdom", flag: "🇬🇧", agree: 54 },
    { country: "India", flag: "🇮🇳", agree: 71 }
  ]
};

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

export type Comment = {
  id: number;
  author: string;
  side: "agree" | "disagree" | "neutral";
  text: string;
  score: number;
  time: string;
  replyTo?: string;
};

export const comments: Comment[] = [
  {
    id: 1,
    author: "quietly_opinionated",
    side: "agree",
    text: "The office should be a resource, not an obligation. I do better focused work at home and still choose to go in when collaboration actually benefits from it.",
    score: 42,
    time: "18m",
    replyTo: "pixel_gardener"
  },
  {
    id: 2,
    author: "commute_thinker",
    side: "disagree",
    text: "Default is too broad. Early-career people can lose a lot of informal learning when everyone is remote. A flexible team-level policy makes more sense.",
    score: 31,
    time: "32m"
  },
  {
    id: 3,
    author: "sunday_reader",
    side: "neutral",
    text: "The real issue is whether companies measure outcomes or attendance. Either setup fails when expectations are unclear.",
    score: 27,
    time: "1h"
  }
];
