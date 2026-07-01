import type { Metadata } from "next";
import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = { title: "Terms of Service", description: "The basic terms for using the Debatica discussion board." };

export default function TermsPage() {
  return <InfoPage eyebrow="TERMS" title="Terms of Service" intro="These terms describe the basic rules for using Debatica." sections={[
    { title: "Service terms", items: ["Debatica is an anonymous discussion platform.", "Users are responsible for their own posts.", "Illegal, abusive, spam, or harmful content may be removed.", "We may suspend access for policy violations.", "Service may change without notice.", "We are not responsible for user-generated content."] },
    { title: "Image guidelines", items: ["Upload only images you have the right to use.", "Do not upload copyrighted images unless you have permission.", "Do not upload images that violate another person's privacy.", "Do not upload illegal, explicit, or abusive content.", "Debatica may remove images that violate these rules without notice.", "Repeated violations may result in posting restrictions."] }
  ]} />;
}
