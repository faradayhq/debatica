import type { Metadata } from "next";
import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = { title: "About · Debatica", description: "Learn what Debatica is, how discussions work, and the current status of the MVP." };

export default function AboutPage() {
  return <InfoPage eyebrow="ABOUT" title="A clearer place to disagree." intro="Debatica is a lightweight discussion board built around one simple action: take a position and explain why." sections={[
    { title: "What Debatica is", paragraphs: ["Each thread presents a statement people can agree or disagree with. Vote totals make the overall balance visible, while flat comments keep the conversation easy to follow."] },
    { title: "What we value", items: ["Clear positions without personal attacks", "Useful context instead of reaction-only posting", "Readable conversations that welcome disagreement", "Simple product choices that respect attention"] },
    { title: "Content and transparency", paragraphs: ["Debatica is designed for user-led discussion. Vote percentages summarize participant responses; they are not expert ratings or statements of fact. Sponsored content and advertising are not part of the current MVP."] },
    { title: "Current status", paragraphs: ["Debatica is currently an MVP prototype using dummy content. Accounts, permanent storage, moderation workflows, and premium access are not connected yet."] }
  ]} />;
}
