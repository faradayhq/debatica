import type { Metadata } from "next";
import { InfoPage } from "@/components/info-page";
import { X_MODERATOR_DM_URL } from "@/lib/moderation";

export const metadata: Metadata = { title: "Contact · Debatica", description: "Contact Debatica about feedback, privacy, or moderation concerns." };

export default function ContactPage() {
  return <InfoPage eyebrow="CONTACT" title="Contact Debatica" intro="For questions, feedback, or moderation requests, please contact us via X DM." sections={[]}>
    <a className="contact-link" href={X_MODERATOR_DM_URL} target="_blank" rel="noreferrer">Contact us via X DM <span>→</span></a>
  </InfoPage>;
}
