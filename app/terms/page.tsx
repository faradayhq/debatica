import type { Metadata } from "next";
import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = { title: "Terms of Service · Debatica", description: "The basic terms for using the Debatica discussion board." };

export default function TermsPage() {
  return <InfoPage eyebrow="TERMS" title="Terms of Service" intro="These terms describe the basic rules for using Debatica." sections={[
    { title: "Service terms", items: ["Debatica is an anonymous discussion platform.", "Users are responsible for their own posts.", "Illegal, abusive, spam, or harmful content may be removed.", "We may suspend access for policy violations.", "Service may change without notice.", "We are not responsible for user-generated content."] }
  ]} />;
}
