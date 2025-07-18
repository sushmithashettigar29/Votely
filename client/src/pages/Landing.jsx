import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";

function Landing() {
  const navigate = useNavigate();
  return (
    <div>
      <section className="hero-section">
        <h1>Create & Share Polls Instantly</h1>
        <div className="hero-container">
          <p>
            Votely helps you create public voting polls in seconds — True/False,
            MCQs, or open comments. No login required to vote.
          </p>
          <button
            className="create-poll-btn"
            onClick={() => navigate("/create-poll")}
          >
            Create Poll
          </button>
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
            Can anyone vote on my poll?
            <span className="arrow-icon">
              <img src="down-arrow.svg" alt="Toggle Arrow" />
            </span>
          </summary>
          <p>Yes! No login required to vote.</p>
        </details>

        <details className="faq-item">
          <summary>
            Can I make results private?
            <span className="arrow-icon">
              <img src="down-arrow.svg" alt="Toggle Arrow" />
            </span>
          </summary>
          <p>Yes, you can choose visibility while creating a poll. </p>
        </details>

        <details className="faq-item">
          <summary>
            What if I want to limit voting?
            <span className="arrow-icon">
              <img src="down-arrow.svg" alt="Toggle Arrow" />
            </span>
          </summary>
          <p>You can set a vote limit or deadline for every poll.</p>
        </details>

        <details className="faq-item">
          <summary>
            Can I see results later?
            <span className="arrow-icon">
              <img src="down-arrow.svg" alt="Toggle Arrow" />
            </span>
          </summary>
          <p>Yes, results are available in your dashboard anytime.</p>
        </details>

        <details className="faq-item">
          <summary>
            Can I download the poll results?
            <span className="arrow-icon">
              <img src="down-arrow.svg" alt="Toggle Arrow" />
            </span>
          </summary>
          <p>Yes, you can export results as a CSV file from your dashboard.</p>
        </details>
      </section>
    </div>
  );
}

export default Landing;
