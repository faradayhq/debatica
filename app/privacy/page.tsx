import type { Metadata } from "next";
import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = { title: "Privacy Policy · Debatica", description: "How the current Debatica MVP handles information and third-party services." };

export default function PrivacyPage() {
  return <InfoPage eyebrow="PRIVACY" title="Privacy Policy" intro="This policy describes the current Debatica MVP. Last updated June 30, 2026." sections={[
    { title: "Current data handling", paragraphs: ["Debatica currently has no connected account system or application database. Votes, comments, and created threads shown in the prototype are dummy or temporary interface data and are not intentionally sent to a Debatica backend."] },
    { title: "Technical information", paragraphs: ["A hosting provider may process standard request information such as IP address, browser type, requested page, and timestamps for security and service delivery. The exact handling depends on the environment where this prototype is deployed."] },
    { title: "Cookies and advertising", paragraphs: ["The current MVP does not include advertising, AdSense, ad cookies, marketing trackers, or a Debatica analytics system. If advertising or analytics are introduced later, this policy and any required consent choices will be updated before launch."] },
    { title: "Third-party services", paragraphs: ["This prototype does not connect to Supabase, payment providers, or authentication providers. Future integrations will be documented here if they are added."] },
    { title: "Questions", paragraphs: ["For privacy questions, use the contact method listed on the Contact page."] }
  ]} />;
}
