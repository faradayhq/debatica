import type { Metadata } from "next";
import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = { title: "About", description: "Learn how Debatica makes public opinion splits visible across topics." };

export default function AboutPage() {
  return <InfoPage eyebrow="ABOUT" title="About Debatica" intro="Debatica is an anonymous debate board that shows how public opinion splits across topics." sections={[
    { title: "Key points", items: ["Create debate threads", "Vote agree or disagree", "Comment anonymously", "See how opinions divide", "Compare perspectives using optional guest profile data"] }
  ]} />;
}
