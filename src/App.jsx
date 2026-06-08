import './App.css'

const features = [
  {
    icon: '01',
    title: 'Thoughtful design',
    text: 'Clean layouts and carefully chosen details create an experience that feels effortless.',
  },
  {
    icon: '02',
    title: 'Built for speed',
    text: 'A lightweight React foundation keeps every interaction quick, smooth, and responsive.',
  },
  {
    icon: '03',
    title: 'Ready to grow',
    text: 'A flexible structure makes it easy to add new pages, features, and ideas as you grow.',
  },
]

function App() {
  return (
    <div className="site-shell">
      <header className="navbar">
        <a className="brand" href="#" aria-label="Northstar home">
          <span className="brand-mark">N</span>
          Northstar
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="button button-small button-outline" href="#contact">
          Let&apos;s talk
        </a>
      </header>

      <main>
        <section className="hero-section" id="about">
          <div className="hero-copy">
            <p className="eyebrow">
              <span />
              Welcome to Northstar
            </p>
            <h1>
              Turn your next idea into something <em>remarkable.</em>
            </h1>
            <p className="hero-description">
              We help ambitious people build simple, beautiful digital
              experiences that make a lasting impression.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#features">
                Explore our work <span aria-hidden="true">→</span>
              </a>
              <a className="text-link" href="#contact">
                Start a conversation
              </a>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="art-card art-card-back">
              <span>Ideas</span>
            </div>
            <div className="art-card art-card-front">
              <div className="art-orbit">
                <div className="art-circle" />
              </div>
              <div>
                <p>Make it clear.</p>
                <strong>Make it matter.</strong>
              </div>
            </div>
            <span className="spark spark-one">✦</span>
            <span className="spark spark-two">✦</span>
          </div>
        </section>

        <section className="features-section" id="features">
          <div className="section-heading">
            <p className="eyebrow">What we believe</p>
            <h2>Good work starts with strong foundations.</h2>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <span className="feature-number">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-section" id="contact">
          <div>
            <p className="eyebrow">Have a project in mind?</p>
            <h2>Let&apos;s build something worth remembering.</h2>
          </div>
          <a className="button button-light" href="mailto:hello@example.com">
            hello@example.com <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#">
          <span className="brand-mark">N</span>
          Northstar
        </a>
        <p>© 2026 Northstar Studio. Built with React.</p>
      </footer>
    </div>
  )
}

export default App
