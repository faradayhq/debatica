import type { Metadata } from "next";
import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = { title: "Terms of Service · Debatica", description: "The basic terms for using the Debatica discussion board." };

export default function TermsPage() {
  return <InfoPage eyebrow="TERMS" title="Terms of Service" intro="These MVP terms explain the basic expectations for using Debatica. Last updated June 30, 2026." sections={[
    { title: "Using the service", paragraphs: ["Use Debatica lawfully and in a way that does not interfere with other people’s access. Do not attempt to disrupt, scrape, reverse engineer, or misuse the service."] },
    { title: "Discussion standards", items: ["Do not post threats, harassment, hate, or illegal content.", "Do not impersonate another person or misrepresent your identity.", "Do not spam, manipulate votes, or repeatedly post promotional content.", "Keep comments relevant to the debate."] },
    { title: "Your content", paragraphs: ["You remain responsible for content you submit. If persistent posting is added later, you will need to grant Debatica permission to display and moderate that content as part of operating the service."] },
    { title: "Prototype availability", paragraphs: ["The current MVP is provided as-is and may change, pause, or reset without notice. Dummy and locally entered content may not persist. No guarantee of uninterrupted availability is made."] },
    { title: "Moderation", paragraphs: ["Debatica may remove content or restrict access when necessary to protect the community, comply with legal obligations, or enforce these terms. The current prototype does not yet include a complete moderation or appeals system."] },
    { title: "Changes", paragraphs: ["These terms may be updated as the product develops. A revised date will be shown on this page when material changes are made."] }
  ]} />;
}
