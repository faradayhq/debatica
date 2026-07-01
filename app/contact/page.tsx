import type { Metadata } from "next";
import { InfoPage } from "@/components/info-page";
import { X_MODERATOR_DM_URL } from "@/lib/moderation";

export const metadata: Metadata = { title: "Contact", description: "Contact Debatica about questions, feedback, privacy, or support." };

export default function ContactPage() {
  return <InfoPage eyebrow="CONTACT" title="Contact Debatica" intro="For questions, feedback, or support, contact the Faraday team on X." sections={[]}>
    <a className="contact-link" href={X_MODERATOR_DM_URL} target="_blank" rel="noreferrer">Message us on X <span aria-hidden="true">→</span></a>
  </InfoPage>;
}
