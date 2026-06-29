export default function AdminPage() {
  return (
    <div className="page inner-page admin-page">
      <header className="page-intro"><span className="section-index">ACCESS</span><h1>Guest mode</h1><p>Browse and join every public debate without creating an account.</p></header>
      <section className="guest-access-card">
        <span className="access-icon">G</span>
        <div><h2>You&apos;re browsing as a guest</h2><p>Votes, comments, preview threads, and country choices are temporary in this MVP. They are not permanently saved.</p></div>
      </section>
      <div className="guest-facts">
        <p><span>✓</span>No sign-in required</p>
        <p><span>✓</span>All debates remain readable</p>
        <p><span>–</span>Accounts and premium plans are not available</p>
      </div>
      <div className="admin-note"><b>Public MVP preview</b><p>Account controls and persistent history will only appear when they are fully implemented.</p></div>
    </div>
  );
}
