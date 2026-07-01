import type { Metadata } from "next";
import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = { title: "Privacy Policy", description: "How Debatica handles information and third-party services." };

export default function PrivacyPage() {
  return <InfoPage eyebrow="PRIVACY" title="Privacy Policy" intro="This policy explains the basic information handling practices for Debatica." sections={[
    { title: "Information and storage", items: ["Guest IDs are stored on your device and are sent with votes, comments, reports, and debates you create.", "Optional age range and country/region information is stored on your device and is sent with comments you post.", "Reply notifications are associated with your Guest ID.", "We may collect anonymous analytics.", "Cookies or similar technologies may be used.", "Contact via X is subject to X's privacy policy."] }
  ]} />;
}
