import { countryBreakdowns, type Thread } from "@/lib/data";

export function CountryPerspective({ thread }: { thread: Thread }) {
  const countries = countryBreakdowns[thread.id] ?? [];

  return (
    <section className="country-perspective" aria-labelledby="country-perspective-title">
      <div className="perspective-heading">
        <div><span className="perspective-icon" aria-hidden="true">◎</span><div><span className="section-index">AGGREGATE VIEW</span><h2 id="country-perspective-title">Global perspective</h2></div></div>
        <p><b>{thread.agree}%</b> Agree <span>/</span> {thread.disagree}% Disagree</p>
      </div>
      <div className="country-grid">
        {countries.map((result) => (
          <div className="country-result" key={result.country}>
            <span className="country-flag" role="img" aria-label={`${result.country} flag`}>{result.flag}</span>
            <div><span>{result.country}</span><div className="country-track"><i style={{ width: `${result.agree}%` }} /></div></div>
            <strong>{result.agree}%<small> Agree</small></strong>
          </div>
        ))}
      </div>
      <p className="aggregate-note">Mock country totals only. Debatica does not collect or display anyone&apos;s individual location.</p>
    </section>
  );
}
