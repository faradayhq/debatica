import type { Metadata } from "next";
import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = { title: "Contact · Debatica", description: "Contact Debatica about feedback, privacy, or moderation concerns." };

export default function ContactPage() {
  return <InfoPage eyebrow="CONTACT" title="Get in touch" intro="Questions about feedback, privacy, these terms, or moderation concerns can be sent by email." sections={[
    { title: "Email", paragraphs: ["This MVP uses a placeholder contact address. Replace it with a monitored inbox before public launch."] },
    { title: "When contacting us", items: ["Include the relevant thread or comment details.", "Explain the issue clearly and avoid sending sensitive personal information.", "For urgent safety concerns, contact the appropriate local service first."] },
    { title: "Response expectations", paragraphs: ["Debatica is an MVP and does not currently provide guaranteed response times or continuous support coverage."] }
  ]}><a className="contact-link" href="mailto:contact@debatica.example">contact@debatica.example <span>→</span></a></InfoPage>;
}
