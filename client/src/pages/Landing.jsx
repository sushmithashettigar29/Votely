import "../styles/Landing.css";

function Landing() {
  return (
    <div>
      <section className="hero-section">
        <h1>Create & Share Polls Instantly</h1>
        <div className="hero-container">
          <p>
            Votely helps you create public voting polls in seconds — True/False,
            MCQs, or open comments. No login required to vote.
          </p>
          <button className="create-poll-btn">Create Poll</button>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Votely?</h2>
        <div className="features-boxes">
          <div className="feature">
            <img src="poll.svg" alt="" />
            <h3>Multiple Poll Types</h3>
            <p>MCQ, True/False, and Comment-based voting supported</p>
          </div>
          <div className="feature">
            <img src="link.svg" alt="" />
            <h3>Shareable Links</h3>
            <p>Instantly share polls without requiring login to vote</p>
          </div>
          <div className="feature">
            <img src="graph.svg" alt="" />
            <h3>Instant Results</h3>
            <p>Visual results in real-time (bar, pie charts)</p>
          </div>
          <div className="feature">
            <img src="countdown.svg" alt="" />
            <h3>Control Duration</h3>
            <p>Set deadlines or limit number of votes</p>
          </div>
        </div>
      </section>

      <section className="usage-section">
        <h2>How It Works</h2>
        <div className="usage-boxes">
          <div className="usage">
            <h4>Create an Account</h4>
            <p>Sign up to start creating polls</p>
          </div>
          <div className="usage">
            <h4>Build Your Poll</h4>
            <p>Choose type, set rules, and publish</p>
          </div>
          <div className="usage">
            <h4>Share & Get Votes</h4>
            <p>Send link and get responses instantly!</p>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <h2>FAQs</h2>

        <details className="faq-item">
          <summary>
            How do I create a short link?
            <span className="arrow-icon">
              <img src="down-arrow.svg" alt="Toggle Arrow" />
            </span>
          </summary>
          <p>
            Simply paste your long URL in the input field above and click
            "Shorten".
          </p>
        </details>

        <details className="faq-item">
          <summary>
            Do I need to register?
            <span className="arrow-icon">
              <img src="down-arrow.svg" alt="Toggle Arrow" />
            </span>
          </summary>
          <p>
            Registration is required to track your links and view analytics.
          </p>
        </details>

        <details className="faq-item">
          <summary>
            What data does LinkVista track?
            <span className="arrow-icon">
              <img src="down-arrow.svg" alt="Toggle Arrow" />
            </span>
          </summary>
          <p>We track click counts, device types, and approximate locations.</p>
        </details>

        <details className="faq-item">
          <summary>
            Is it free to use?
            <span className="arrow-icon">
              <img src="down-arrow.svg" alt="Toggle Arrow" />
            </span>
          </summary>
          <p>Yes, LinkVista is completely free to use.</p>
        </details>

        <details className="faq-item">
          <summary>
            Can I see analytics for my links?
            <span className="arrow-icon">
              <img src="down-arrow.svg" alt="Toggle Arrow" />
            </span>
          </summary>
          <p>
            Yes, registered users can view detailed analytics for each link.
          </p>
        </details>
      </section>
    </div>
  );
}

export default Landing;
