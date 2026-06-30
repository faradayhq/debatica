const premiumFeatures = [
  "No ads",
  "Bookmark threads",
  "Bookmark comments",
  "Guest profile customization",
  "Advanced opinion analytics",
  "Early access to new features",
  "Premium badge"
];

export default function PremiumPage() {
  return (
    <div className="page inner-page premium-page">
      <section className="premium-hero">
        <span className="premium-kicker">PREMIUM · COMING SOON</span>
        <div className="premium-mark" aria-hidden="true">P</div>
        <h1>Debatica Premium</h1>
        <p className="premium-tagline">Help build better discussions.</p>
        <p className="premium-description">Support Debatica and unlock additional features in the future.</p>
      </section>

      <section className="premium-features" aria-labelledby="premium-features-title">
        <span className="section-index">FEATURES</span>
        <h2 id="premium-features-title">More ways to participate</h2>
        <ul>
          {premiumFeatures.map((feature) => <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}
        </ul>
      </section>

      <section className="premium-pricing" aria-labelledby="premium-pricing-title">
        <div>
          <span className="section-index">PRICING</span>
          <h2 id="premium-pricing-title">Coming Soon</h2>
          <p>Premium plans are not available during the MVP.</p>
        </div>
        <button type="button" className="premium-notify-button">Notify me</button>
      </section>
    </div>
  );
}
