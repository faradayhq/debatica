type InfoSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export function InfoPage({
  eyebrow,
  title,
  intro,
  sections,
  children
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: InfoSection[];
  children?: React.ReactNode;
}) {
  return (
    <div className="page inner-page info-page">
      <header className="page-intro info-intro">
        <span className="section-index">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{intro}</p>
      </header>
      <div className="info-content">
        {sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
          </section>
        ))}
        {children}
      </div>
    </div>
  );
}
