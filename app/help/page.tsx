import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: "How Debatica Works",
  description: "Learn how to vote, discuss, and explore different viewpoints on Debatica."
};

const steps = [
  { title: "Choose a debate.", icon: "search" as const },
  { title: "Vote Agree or Disagree.", icon: "vote" as const },
  { title: "Explain your opinion.", icon: "comment" as const },
  { title: "Read different perspectives.", icon: "grid" as const },
  { title: "Keep the discussion respectful.", icon: "user" as const }
];

const questions = [
  { question: "Do I need an account?", answer: "No. You can vote and join discussions with the Guest ID created on your device." },
  { question: "Can I change my vote?", answer: "Yes. Return to the debate and choose the other option to update your vote." },
  { question: "Can I create debates?", answer: "Yes. Choose Create, write a clear question, select a category, and post it for the community." },
  { question: "Can people see who I am?", answer: "No. Debatica does not show your real identity. Your activity is connected only to your anonymous Guest ID." },
  { question: "Why are debates anonymous?", answer: "Anonymity keeps attention on the reasoning behind an opinion instead of the person sharing it." }
];

export default function HelpPage() {
  return (
    <div className="page help-page">
      <header className="help-hero">
        <span className="section-index">START HERE</span>
        <h1>How Debatica Works</h1>
        <p>Vote. Explain why. See where public opinion splits.</p>
      </header>

      <div className="help-content">
        <section className="help-section help-about">
          <span className="help-number">01</span>
          <div>
            <h2>What is Debatica?</h2>
            <p>Debatica is an anonymous debate platform where people can vote, discuss, and explore different viewpoints.</p>
            <p>There are no follower counts or personal profiles.<br />The focus is on ideas—not identities.</p>
          </div>
        </section>

        <section className="help-section">
          <div className="help-section-heading">
            <span className="help-number">02</span>
            <h2>How it works</h2>
          </div>
          <ol className="help-steps">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span className="help-step-icon"><Icon name={step.icon} size={22} /></span>
                <span className="help-step-count">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
              </li>
            ))}
          </ol>
        </section>

        <section className="help-section help-anonymous">
          <div className="help-section-heading">
            <span className="help-number">03</span>
            <h2>Stay Anonymous</h2>
          </div>
          <div className="help-anonymous-card">
            <span className="help-anonymous-icon"><Icon name="user" size={26} /></span>
            <div>
              <p>You don&apos;t need to create an account.</p>
              <p>Debatica automatically creates a Guest ID on your device so you can participate anonymously.</p>
            </div>
          </div>
        </section>

        <section className="help-section">
          <div className="help-section-heading">
            <span className="help-number">04</span>
            <h2>Community Guidelines</h2>
          </div>
          <ul className="help-rules">
            {["Attack ideas, not people.", "Respect different opinions.", "No harassment.", "No spam.", "Stay curious."].map((rule) => (
              <li key={rule}><span aria-hidden="true">✓</span>{rule}</li>
            ))}
          </ul>
        </section>

        <section className="help-section">
          <div className="help-section-heading">
            <span className="help-number">05</span>
            <h2>FAQ</h2>
          </div>
          <div className="help-faq">
            {questions.map((item) => (
              <details key={item.question}>
                <summary>{item.question}<span aria-hidden="true">+</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="help-cta">
          <span className="section-index">YOUR TURN</span>
          <h2>Ready to join the discussion?</h2>
          <Link className="primary-button" href="/">Explore debates <Icon name="arrow" size={18} /></Link>
        </section>
      </div>
    </div>
  );
}
