import { useState } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --sand: #F4EDD8;
    --ink: #1A1208;
    --ink-soft: #4A3C28;
    --gold: #A07820;
    --gold-light: #C49A30;
    --green: #2B4028;
    --green-mid: #3D5C38;
    --cream: #FEFAF2;
    --border: rgba(26,18,8,0.12);
    --dark: #1E1A10;
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--ink); }

  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; justify-content: space-between; align-items: center;
    padding: 20px 48px;
    background: rgba(254,250,242,0.92); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; color: var(--ink); }
  .nav-logo span { color: var(--gold); }
  .nav-cta {
    background: var(--green); color: var(--cream);
    border: none; padding: 10px 24px; font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase;
    cursor: pointer; transition: background 0.2s;
  }
  .nav-cta:hover { background: var(--green-mid); }

  .hero {
    min-height: 100vh; background: var(--green);
    display: flex; flex-direction: column; justify-content: center;
    padding: 120px 48px 80px; position: relative; overflow: hidden;
  }
  .hero::before {
    content: ''; position: absolute; top: 0; right: 0; bottom: 0; width: 45%;
    background: url("data:image/svg+xml,%3Csvg width='600' height='800' viewBox='0 0 600 800' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='400' cy='300' r='280' fill='%233D5C38' opacity='0.5'/%3E%3Ccircle cx='500' cy='500' r='200' fill='%234A7042' opacity='0.3'/%3E%3Ccircle cx='300' cy='600' r='150' fill='%23A07820' opacity='0.15'/%3E%3C/svg%3E") center/cover;
  }
  .hero-label {
    font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--gold-light); margin-bottom: 28px; display: flex; align-items: center; gap: 12px;
  }
  .hero-label::before { content: ''; width: 32px; height: 1px; background: var(--gold-light); }
  .hero h1 {
    font-family: 'Cormorant Garamond', serif; font-size: clamp(44px, 6vw, 80px);
    font-weight: 500; line-height: 1.08; color: var(--cream); max-width: 680px; margin-bottom: 28px;
  }
  .hero h1 em { font-style: italic; color: var(--gold-light); }
  .hero > p {
    font-size: 16px; line-height: 1.7; color: rgba(254,250,242,0.72);
    max-width: 520px; margin-bottom: 48px; font-weight: 300;
  }
  .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; }
  .btn-primary {
    background: var(--gold); color: var(--ink); border: none; padding: 14px 32px;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
    letter-spacing: 0.05em; text-transform: uppercase; cursor: pointer; transition: background 0.2s;
  }
  .btn-primary:hover { background: var(--gold-light); }
  .btn-ghost {
    background: transparent; color: var(--cream); border: 1px solid rgba(254,250,242,0.3);
    padding: 14px 32px; font-family: 'DM Sans', sans-serif; font-size: 14px;
    font-weight: 500; cursor: pointer; transition: border-color 0.2s;
  }
  .btn-ghost:hover { border-color: rgba(254,250,242,0.7); }
  .hero-stats {
    display: flex; gap: 48px; margin-top: 72px;
    padding-top: 40px; border-top: 1px solid rgba(254,250,242,0.12); flex-wrap: wrap;
  }
  .stat-num { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 600; color: var(--cream); }
  .stat-label { font-size: 12px; color: rgba(254,250,242,0.5); margin-top: 4px; letter-spacing: 0.06em; }

  .section { padding: 100px 48px; }
  .section-label {
    font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--gold); display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
  }
  .section-label::before { content: ''; width: 24px; height: 1px; background: var(--gold); }
  .section h2 {
    font-family: 'Cormorant Garamond', serif; font-size: clamp(32px, 4vw, 52px);
    font-weight: 500; line-height: 1.1; margin-bottom: 24px; max-width: 600px;
  }
  .section h2 em { font-style: italic; color: var(--gold); }

  .about { background: var(--sand); }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; margin-top: 56px; }
  .about-text p { font-size: 16px; line-height: 1.8; color: var(--ink-soft); margin-bottom: 20px; font-weight: 300; }
  .about-text p strong { color: var(--ink); font-weight: 500; }
  .about-callout { background: var(--green); color: var(--cream); padding: 40px; position: relative; }
  .about-callout::before {
    content: '"'; font-family: 'Cormorant Garamond', serif; font-size: 120px;
    position: absolute; top: -20px; left: 24px; color: var(--gold); opacity: 0.4; line-height: 1;
  }
  .about-callout p {
    font-family: 'Cormorant Garamond', serif; font-size: 22px; line-height: 1.5;
    font-style: italic; margin-bottom: 20px; position: relative;
  }
  .about-callout .source { font-size: 12px; letter-spacing: 0.08em; opacity: 0.6; }
  .status-banner {
    background: #FFF8E8; border: 1px solid #D4A843; padding: 20px 32px; margin-top: 40px;
    display: flex; align-items: flex-start; gap: 14px;
  }
  .status-icon { font-size: 18px; flex-shrink: 0; margin-top: 2px; }
  .status-text { font-size: 14px; line-height: 1.6; color: #7A5A10; }
  .status-text strong { color: #5A3F08; }

  /* === STORY SECTION === */
  .story { background: var(--dark); padding: 100px 48px; position: relative; overflow: hidden; }
  .story::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(ellipse at 80% 50%, rgba(160,120,32,0.07) 0%, transparent 60%);
    pointer-events: none;
  }
  .story .section-label { color: var(--gold-light); }
  .story .section-label::before { background: var(--gold-light); }
  .story h2 { color: var(--cream); }
  .story h2 em { color: var(--gold-light); }
  .story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: start; margin-top: 56px; }
  .story-text p { font-size: 16px; line-height: 1.9; color: rgba(254,250,242,0.62); margin-bottom: 22px; font-weight: 300; }
  .story-text p strong { color: var(--cream); font-weight: 500; }
  .story-text p em { color: var(--gold-light); font-style: normal; font-weight: 500; }

  .cf-box { border: 1px solid rgba(196,154,48,0.25); padding: 40px; position: relative; }
  .cf-box::before {
    content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 100%; background: var(--gold-light);
  }
  .cf-eyebrow { font-size: 10px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: var(--gold-light); margin-bottom: 20px; }
  .cf-statement {
    font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 500;
    line-height: 1.4; color: var(--cream); margin-bottom: 28px; font-style: italic;
  }
  .cf-points { list-style: none; }
  .cf-points li {
    font-size: 14px; color: rgba(254,250,242,0.58); padding: 11px 0;
    border-bottom: 1px solid rgba(254,250,242,0.07);
    display: flex; align-items: flex-start; gap: 12px; line-height: 1.6;
  }
  .cf-points li:last-child { border-bottom: none; }
  .cf-bullet { color: var(--gold-light); flex-shrink: 0; margin-top: 2px; }

  .pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-top: 64px; background: rgba(196,154,48,0.08); }
  .pillar { background: var(--dark); padding: 40px 32px; border-top: 2px solid transparent; transition: border-color 0.2s; }
  .pillar:hover { border-top-color: var(--gold-light); }
  .pillar-icon { font-size: 28px; margin-bottom: 18px; }
  .pillar h3 { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; color: var(--cream); margin-bottom: 12px; }
  .pillar p { font-size: 14px; line-height: 1.7; color: rgba(254,250,242,0.48); font-weight: 300; }

  .apps { background: var(--cream); }
  .apps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 2px; margin-top: 56px; background: var(--border); }
  .app-card { background: var(--cream); padding: 40px 32px; transition: background 0.2s; }
  .app-card:hover { background: var(--sand); }
  .app-icon { font-size: 28px; margin-bottom: 20px; }
  .app-card h3 { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; margin-bottom: 12px; }
  .app-card p { font-size: 14px; line-height: 1.7; color: var(--ink-soft); font-weight: 300; }

  .chain { background: var(--ink); color: var(--cream); }
  .chain .section-label { color: var(--gold-light); }
  .chain .section-label::before { background: var(--gold-light); }
  .chain h2 { color: var(--cream); }
  .chain-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-top: 56px; background: rgba(255,255,255,0.08); }
  .chain-step { background: var(--ink); padding: 48px 36px; position: relative; }
  .chain-step::after { content: '→'; position: absolute; right: -20px; top: 50%; transform: translateY(-50%); font-size: 24px; color: var(--gold); z-index: 1; }
  .chain-step:last-child::after { display: none; }
  .step-num { font-family: 'Cormorant Garamond', serif; font-size: 56px; font-weight: 600; color: rgba(254,250,242,0.07); line-height: 1; margin-bottom: 16px; }
  .chain-step h3 { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; margin-bottom: 12px; color: var(--cream); }
  .chain-step p { font-size: 14px; line-height: 1.7; color: rgba(254,250,242,0.55); font-weight: 300; }
  .step-tag { display: inline-block; margin-top: 16px; padding: 4px 12px; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500; }
  .tag-secured { background: rgba(43,64,40,0.8); color: #8DC87A; }
  .tag-progress { background: rgba(160,120,32,0.2); color: var(--gold-light); }
  .tag-seeking { background: rgba(160,120,32,0.2); color: var(--gold-light); }

  .form-section { background: var(--sand); }
  .form-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
  .form-info h2 { max-width: 400px; }
  .form-info > p { font-size: 15px; line-height: 1.8; color: var(--ink-soft); font-weight: 300; margin-top: 20px; margin-bottom: 32px; }
  .form-info ul { list-style: none; }
  .form-info ul li { font-size: 14px; color: var(--ink-soft); padding: 10px 0; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 12px; }
  .form-info ul li::before { content: '✓'; color: var(--gold); font-weight: 600; }
  .form-card { background: var(--cream); padding: 48px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .field { margin-bottom: 20px; }
  .field label { display: block; font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-soft); margin-bottom: 8px; }
  .field input, .field select, .field textarea {
    width: 100%; padding: 12px 16px; background: var(--sand); border: 1px solid var(--border);
    font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--ink); outline: none; transition: border-color 0.2s;
  }
  .field input:focus, .field select:focus, .field textarea:focus { border-color: var(--gold); }
  .field textarea { resize: vertical; min-height: 100px; }
  .submit-btn {
    width: 100%; background: var(--green); color: var(--cream); border: none; padding: 16px;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; cursor: pointer; transition: background 0.2s; margin-top: 8px;
  }
  .submit-btn:hover { background: var(--green-mid); }
  .form-note { font-size: 12px; color: var(--ink-soft); margin-top: 14px; text-align: center; }
  .success-msg { text-align: center; padding: 48px 24px; }
  .success-icon { font-size: 48px; margin-bottom: 20px; }
  .success-msg h3 { font-family: 'Cormorant Garamond', serif; font-size: 28px; margin-bottom: 12px; }
  .success-msg p { color: var(--ink-soft); font-size: 15px; }

  footer { background: var(--ink); padding: 56px 48px 40px; }
  .footer-top {
    display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px;
    padding-bottom: 40px; border-bottom: 1px solid rgba(254,250,242,0.08); margin-bottom: 32px;
  }
  .footer-logo { font-family: 'Cormorant Garamond', serif; font-size: 22px; color: var(--cream); font-weight: 600; margin-bottom: 12px; }
  .footer-logo span { color: var(--gold); }
  .footer-tagline { font-size: 13px; line-height: 1.7; color: rgba(254,250,242,0.4); max-width: 280px; }
  .footer-col h4 { font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(254,250,242,0.5); margin-bottom: 16px; }
  .footer-col p { font-size: 13px; line-height: 1.8; color: rgba(254,250,242,0.4); }
  .footer-col a { color: rgba(254,250,242,0.4); text-decoration: none; display: block; margin-bottom: 8px; font-size: 13px; cursor: pointer; }
  .footer-col a:hover { color: var(--gold-light); }
  .footer-bottom { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; }
  .footer-bottom > p { font-size: 12px; color: rgba(254,250,242,0.3); }
  .footer-disclaimer { font-size: 11px; color: rgba(254,250,242,0.22); max-width: 400px; line-height: 1.6; }

  @media (max-width: 768px) {
    .nav { padding: 16px 20px; }
    .hero { padding: 100px 20px 60px; }
    .section, .story { padding: 64px 20px; }
    .about-grid, .form-wrap, .chain-steps, .story-grid, .pillars, .footer-top { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
    .chain-step::after { display: none; }
    .hero-stats { gap: 24px; }
    footer { padding: 40px 20px; }
  }
`;

export default function App() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    role: '',
    email: '',
    application: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.company) return;
    try {
      await fetch("https://formspree.io/f/xqenkbap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch (e) {
      setSubmitted(true);
    }
  };
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <style>{styles}</style>

      <nav className="nav">
        <div className="nav-logo">
          Gum<span>Arabia</span>
        </div>
        <button className="nav-cta" onClick={() => scrollTo('contact')}>
          Express Interest
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-label">Sudan × Europe · Specialty Ingredients</div>
        <h1>
          Premium Sudanese
          <br />
          <em>Gum Arabic</em>
          <br />
          for European Industry
        </h1>
        <p>
          Connecting European food, pharma, and cosmetics manufacturers to a
          traceable, conflict-free source of Acacia senegal — harvested by
          smallholder farmers in Sudan's safe regions, processed to European
          standards.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => scrollTo('contact')}>
            Express Sourcing Interest
          </button>
          <button className="btn-ghost" onClick={() => scrollTo('story')}>
            Our Story
          </button>
        </div>
        <div className="hero-stats">
          <div>
            <div className="stat-num">~80%</div>
            <div className="stat-label">of global supply from Sudan</div>
          </div>
          <div>
            <div className="stat-num">Direct</div>
            <div className="stat-label">Farmer partnerships at source</div>
          </div>
          <div>
            <div className="stat-num">B2B</div>
            <div className="stat-label">Institutional & industrial buyers</div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section about" id="about">
        <div className="section-label">About the Product</div>
        <h2>
          Nature's most <em>versatile</em> hydrocolloid
        </h2>
        <div className="about-grid">
          <div className="about-text">
            <p>
              Gum arabic is a <strong>natural exudate</strong> harvested from{' '}
              <em>Acacia senegal</em> trees across the Sahel belt of Sudan. It
              is one of the world's most important functional food ingredients —
              prized for its emulsifying, stabilizing, and encapsulating
              properties.
            </p>
            <p>
              Sudan produces the <strong>highest-grade gum arabic</strong> in
              the world, known for its consistent molecular profile and low
              contaminant levels. Despite its global importance, raw gum is
              still largely exported without significant value addition.
            </p>
            <p>
              Our initiative aims to change that — developing a{' '}
              <strong>Sudan-to-Europe supply chain</strong> that delivers
              processed, industry-ready gum arabic to manufacturers who demand
              consistency, traceability, and quality.
            </p>
            <div className="status-banner">
              <div className="status-icon">🔔</div>
              <div className="status-text">
                <strong>Venture stage:</strong> Supply sourcing from Sudan is
                secured through direct farmer partnerships. European processing
                partnerships are currently in active development. We are now
                mapping demand from European buyers to inform next steps. Your
                interest directly shapes our approach.
              </div>
            </div>
          </div>
          <div className="about-callout">
            <p>
              Gum arabic is approved as a food additive globally, and remains
              one of the few natural emulsifiers with GRAS status and extensive
              safety documentation.
            </p>
            <div className="source">
              Codex Alimentarius · E414 (EU) · INS 414 (Codex)
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="story" id="story">
        <div className="section-label">Our Story & Sourcing Principles</div>
        <h2>
          Rooted in the land.
          <br />
          <em>Responsible</em> by design.
        </h2>
        <div className="story-grid">
          <div className="story-text">
            <p>
              Gum arabic has been harvested from Sudan's acacia forests for
              centuries. The people who tap these trees are{' '}
              <strong>smallholder farmers</strong> — families who have passed
              this knowledge down through generations, for whom the gum harvest
              is a critical source of seasonal income.
            </p>
            <p>
              We work{' '}
              <strong>
                directly with these farmers and their local cooperatives
              </strong>
              , bypassing unnecessary intermediaries. This means fairer prices
              at the farm gate, stronger relationships, and a supply chain that
              is traceable back to the people who make it possible.
            </p>
            <p>
              Sudan is currently experiencing a devastating conflict. We are
              fully aware of this reality — and it shapes every decision we
              make.{' '}
              <em>
                We operate exclusively in regions that are stable and accessible
              </em>
              , where farmers can harvest safely and communities can benefit
              from trade.
            </p>
            <p>
              Our position is clear:{' '}
              <strong>
                your purchase of our gum arabic supports Sudanese farming
                families — it does not fuel the conflict.
              </strong>{' '}
              We maintain full transparency on sourcing geography and welcome
              due diligence from buyers who require it.
            </p>
          </div>
          <div className="cf-box">
            <div className="cf-eyebrow">Our Sourcing Commitment</div>
            <div className="cf-statement">
              "Our gum arabic comes from Sudan's farmers — not from its
              conflict."
            </div>
            <ul className="cf-points">
              <li>
                <span className="cf-bullet">◆</span>
                <span>
                  Sourcing limited to{' '}
                  <strong style={{ color: 'rgba(254,250,242,0.82)' }}>
                    verified safe regions
                  </strong>{' '}
                  with no active conflict activity
                </span>
              </li>
              <li>
                <span className="cf-bullet">◆</span>
                <span>
                  Direct relationships with{' '}
                  <strong style={{ color: 'rgba(254,250,242,0.82)' }}>
                    smallholder farmers
                  </strong>{' '}
                  and local cooperative networks
                </span>
              </li>
              <li>
                <span className="cf-bullet">◆</span>
                <span>
                  Full traceability from harvest area to European port —
                  available on request
                </span>
              </li>
              <li>
                <span className="cf-bullet">◆</span>
                <span>
                  Fair compensation at source — above prevailing local market
                  rates
                </span>
              </li>
              <li>
                <span className="cf-bullet">◆</span>
                <span>
                  Open to third-party due diligence and buyer verification
                  processes
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pillars">
          <div className="pillar">
            <div className="pillar-icon">🌿</div>
            <h3>Direct from Farmers</h3>
            <p>
              We buy directly from smallholders and cooperatives, keeping more
              value in the hands of the people who do the work.
            </p>
          </div>
          <div className="pillar">
            <div className="pillar-icon">📍</div>
            <h3>Safe-Zone Sourcing Only</h3>
            <p>
              We monitor the situation in Sudan continuously and limit
              operations to areas that are stable and safe for farmers and
              logistics.
            </p>
          </div>
          <div className="pillar">
            <div className="pillar-icon">🔍</div>
            <h3>Full Transparency</h3>
            <p>
              We welcome supply chain due diligence. Our sourcing documentation
              is available to any serious buyer upon request.
            </p>
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="section apps" id="applications">
        <div className="section-label">Industry Applications</div>
        <h2>
          Where gum arabic <em>creates value</em>
        </h2>
        <div className="apps-grid">
          <div className="app-card">
            <div className="app-icon">🍫</div>
            <h3>Food & Beverage</h3>
            <p>
              Emulsifier, stabilizer, and glazing agent in confectionery, soft
              drinks, bakery, and dairy. Key ingredient in flavour encapsulation
              systems.
            </p>
          </div>
          <div className="app-card">
            <div className="app-icon">💊</div>
            <h3>Pharmaceutical</h3>
            <p>
              Binder in tablet manufacturing, suspending agent in oral liquid
              formulations, and film-forming agent in coatings.
            </p>
          </div>
          <div className="app-card">
            <div className="app-icon">✨</div>
            <h3>Cosmetics & Personal Care</h3>
            <p>
              Natural film former and humectant in skincare, hair products, and
              colour cosmetics. Growing demand in clean-label formulations.
            </p>
          </div>
          <div className="app-card">
            <div className="app-icon">🖨️</div>
            <h3>Technical & Industrial</h3>
            <p>
              Lithographic printing, textile sizing, ceramic glazing, and
              adhesives. Long-established industrial applications with
              consistent specifications.
            </p>
          </div>
        </div>
      </section>

      {/* VALUE CHAIN */}
      <section className="section chain" id="chain">
        <div className="section-label">Our Approach</div>
        <h2>
          From Sudan's fields to
          <br />
          <em>European formulations</em>
        </h2>
        <div className="chain-steps">
          <div className="chain-step">
            <div className="step-num">01</div>
            <h3>Sourcing — Sudan</h3>
            <p>
              Raw gum arabic sourced directly from smallholder farmers and
              cooperatives in Sudan's safe regions. Fully traceable,
              conflict-free.
            </p>
            <span className="step-tag tag-secured">✓ Supply Secured</span>
          </div>
          <div className="chain-step">
            <div className="step-num">02</div>
            <h3>Processing — Europe</h3>
            <p>
              Spray drying, cleaning, and standardisation to food-grade and
              pharma-grade specifications. European processing partnerships
              currently in development.
            </p>
            <span className="step-tag tag-progress">⟳ In Development</span>
          </div>
          <div className="chain-step">
            <div className="step-num">03</div>
            <h3>Delivery — Your Facility</h3>
            <p>
              Consistent, specification-matched supply to European
              manufacturers. Flexible volumes, full documentation, and
              traceability from origin.
            </p>
            <span className="step-tag tag-seeking">← Mapping Demand Now</span>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="section form-section" id="contact">
        <div className="form-wrap">
          <div className="form-info">
            <div className="section-label">Express Your Interest</div>
            <h2>
              Are you a potential <em>buyer or partner?</em>
            </h2>
            <p>
              We are currently mapping demand from European manufacturers and
              distributors. If your company sources gum arabic — or could in the
              future — we want to hear from you.
            </p>
            <ul>
              <li>No commitment required at this stage</li>
              <li>We will follow up within 2 business days</li>
              <li>All enquiries treated confidentially</li>
              <li>Open to buyers, distributors, and processing partners</li>
            </ul>
          </div>
          <div className="form-card">
            {submitted ? (
              <div className="success-msg">
                <div className="success-icon">✅</div>
                <h3>Thank you, {form.name.split(' ')[0]}.</h3>
                <p>
                  We've received your interest from{' '}
                  <strong>{form.company}</strong>.<br />
                  We'll be in touch within 2 business days.
                </p>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <div className="field">
                    <label>Full Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jan de Vries"
                    />
                  </div>
                  <div className="field">
                    <label>Company *</label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Acme Ingredients BV"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="field">
                    <label>Your Role</label>
                    <input
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      placeholder="Procurement Manager"
                    />
                  </div>
                  <div className="field">
                    <label>Email *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jan@company.com"
                    />
                  </div>
                </div>
                <div className="field">
                  <label>Relevant Application</label>
                  <select
                    name="application"
                    value={form.application}
                    onChange={handleChange}
                  >
                    <option value="">Select your industry</option>
                    <option>Food & Beverage</option>
                    <option>Pharmaceutical</option>
                    <option>Cosmetics & Personal Care</option>
                    <option>Industrial / Technical</option>
                    <option>Distribution / Trading</option>
                    <option>Processing / Toll Manufacturing</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="field">
                  <label>Message or Requirements</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your current sourcing, volumes, or any questions you have..."
                  />
                </div>
                <button className="submit-btn" onClick={handleSubmit}>
                  Submit Interest →
                </button>
                <p className="form-note">
                  Your information will not be shared with third parties.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-logo">
              Gum<span>Arabia</span>
            </div>
            <p className="footer-tagline">
              Conflict-free gum arabic sourced directly from Sudanese
              smallholder farmers, processed to European standards.
              <br />
              <br />
              Based in Vlaardingen, Netherlands.
            </p>
          </div>
          <div className="footer-col">
            <h4>Navigate</h4>
            <a onClick={() => scrollTo('about')}>About the Product</a>
            <a onClick={() => scrollTo('story')}>Our Story</a>
            <a onClick={() => scrollTo('applications')}>Applications</a>
            <a onClick={() => scrollTo('contact')}>Express Interest</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <p>Vlaardingen, Netherlands</p>
            <p
              style={{
                marginTop: '10px',
                fontSize: '12px',
                color: 'rgba(254,250,242,0.22)',
                lineHeight: '1.6',
              }}
            >
              Full address available upon request for verified business
              enquiries.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 GumArabia · All enquiries confidential</p>
          <p className="footer-disclaimer">
            This initiative is independent of all parties to the conflict in
            Sudan. Our sourcing is restricted to verified stable regions. We are
            committed to supporting Sudanese farming communities through fair
            and transparent trade.
          </p>
        </div>
      </footer>
    </>
  );
}
