import type { Metadata } from "next";
import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = { title: "Privacy Policy · Debatica", description: "How Debatica handles information and third-party services." };

export default function PrivacyPage() {
  return <InfoPage eyebrow="PRIVACY" title="Privacy Policy" intro="This policy explains the basic information handling practices for Debatica." sections={[
    { title: "Information and storage", items: ["Guest IDs are stored locally.", "Optional profile information (age range and country/region) is stored locally unless future accounts are introduced.", "We may collect anonymous analytics.", "Cookies or similar technologies may be used.", "Contact via X may follow X's privacy policy."] }
  ]} />;
}
