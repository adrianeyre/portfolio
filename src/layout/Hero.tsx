const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

const Hero = () => (
  <header className="hero">
    <div className="hero-body">
      <span className="eyebrow">Lead Software Developer</span>
      <h1>Adrian Eyre</h1>
      <p>Building modern applications using AI and cloud-native tooling.</p>
      <div className="hero-actions">
        <button onClick={() => scrollTo('projects')}>View Projects</button>
        <button className="secondary" onClick={() => scrollTo('about')}>About Me</button>
      </div>
    </div>
    <div className="hero-side">
      <div className="hero-card">
        <span>Experience</span>
        <strong>15+ years</strong>
      </div>
      <div className="hero-card">
        <span>Tech stack</span>
        <strong>Typescript · Python · AWS · AI Tooling</strong>
      </div>
      <div className="hero-card">
        <span>Focus</span>
        <strong>Leadership · Architecture · Team Management</strong>
      </div>
    </div>
  </header>
);

export default Hero;
