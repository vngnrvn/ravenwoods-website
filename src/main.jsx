import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Menu, X, Plus, Minus,
  CheckCircle2, MoveUpRight, Instagram, Facebook, Mail, MapPin, Phone
} from "lucide-react";
import "./styles.css";

const projects = [
  {
    title: "Kalaw Hills",
    type: "Residential",
    location: "Tagaytay, Philippines",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
    description: "A calm, material-led residential interior with coordinated cabinetry and finish selections."
  },
  {
    title: "Royal Estates",
    type: "Residential",
    location: "Tagaytay, Philippines",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    description: "Custom interior elements planned around the architecture, daily routines, and site requirements."
  },
  {
    title: "BSFIL Technologies",
    type: "Commercial",
    location: "Philippines",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
    description: "A workplace project requiring coordinated sourcing, execution planning, and installation."
  },
  {
    title: "Cainta Residence",
    type: "Residential",
    location: "Rizal, Philippines",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
    description: "Thoughtful built-ins and practical storage integrated into a contemporary home."
  }
];

const services = [
  ["01", "Modular cabinetry", "Kitchens, wardrobes, vanities, and built-in storage planned around how you live."],
  ["02", "Custom furniture", "Made-to-order furniture coordinated to your space, material palette, and requirements."],
  ["03", "Interior fit-out", "A coordinated approach to finishes, suppliers, trades, site activities, and turnover."],
  ["04", "Sourcing & project coordination", "A single point of coordination from scope definition and costing through delivery."]
];

const process = [
  ["01", "Discover", "We understand the space, your requirements, priorities, and budget."],
  ["02", "Develop", "We coordinate concepts, drawings, scope, material choices, and costing."],
  ["03", "Coordinate", "We align suppliers, fabrication, site work, and project milestones."],
  ["04", "Turn over", "We review completed work, resolve outstanding items, and hand over the project."]
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeProject, setActiveProject] = useState(null);
  const [faqOpen, setFaqOpen] = useState(0);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", projectType: "Modular cabinetry",
    location: "", budget: "", timeline: "", message: ""
  });
  const [submitState, setSubmitState] = useState({ status: "idle", message: "" });

  const visibleProjects = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.type === activeFilter);

  const updateField = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitState({ status: "loading", message: "Sending your inquiry…" });

    // Set VITE_INQUIRY_ENDPOINT in the GitHub repository's Actions variables
    // to your deployed Google Apps Script Web App URL. Do not put secrets here.
    const endpoint = import.meta.env.VITE_INQUIRY_ENDPOINT;

    if (!endpoint) {
      setSubmitState({
        status: "error",
        message: "The inquiry form is not connected yet. Please email us directly while setup is completed."
      });
      return;
    }

    try {
      const payload = {
        ...form,
        source: window.location.href,
        submittedAt: new Date().toISOString()
      };

      // Google Apps Script web apps commonly require no-cors for simple
      // cross-origin form POSTs. In opaque mode the browser cannot inspect
      // the response, so this only confirms that the request was sent,
      // not that the spreadsheet/email operation succeeded.
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });

      setSubmitState({
        status: "sent",
        message: "Your inquiry has been submitted. If you do not hear from us, please contact us directly to confirm receipt."
      });
      setForm({
        name: "", email: "", phone: "", projectType: "Modular cabinetry",
        location: "", budget: "", timeline: "", message: ""
      });
    } catch {
      setSubmitState({
        status: "error",
        message: "We couldn't send the inquiry. Please try again or contact us directly."
      });
    }
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header">

<a className="wordmark" href="#home" onClick={closeMenu} aria-label="Ravenwoods home">
<img
  src={`${import.meta.env.BASE_URL}images/ravenwoods-logo.png`}
  alt="Ravenwoods"
  className="brand-logo"
/>
</a>
        <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"}>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#process" onClick={closeMenu}>Our process</a>
          <a className="nav-cta" href="#inquire" onClick={closeMenu}>Start a project <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main id="home">
        <section className="hero section-pad">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> INTERIORS, MADE CONSIDERED</p>
            <h1>Good spaces begin<br />with <em>good coordination.</em></h1>
            <p className="hero-description">
              Ravenwoods brings cabinetry, custom furniture, sourcing, and interior project coordination together — from the first conversation to final turnover.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#inquire">Discuss your project <ArrowUpRight size={17} /></a>
              <a className="text-link" href="#projects">Explore selected work <ArrowDownRight size={17} /></a>
            </div>
            <div className="hero-note">
              <span className="note-mark">RW.</span>
              <span>Thoughtful design. Clear scope.<br />Coordinated execution.</span>
            </div>
          </div>
          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90"
              alt="Warm, contemporary interior with considered furniture and natural materials"
              fetchPriority="high"
            />
            <div className="hero-image-caption"><span>01 / 04</span><span>Spaces designed for living</span></div>
            <div className="hero-vertical-label">RAVENWOODS · PHILIPPINES</div>
          </div>
          <a className="scroll-cue" href="#about"><span /> SCROLL TO EXPLORE</a>
        </section>

        <section className="intro section-pad" id="about">
          <div className="section-kicker">01 — WHO WE ARE</div>
          <div className="intro-content">
            <h2>We bring the moving parts of an interior project <em>into focus.</em></h2>
            <div className="intro-side">
              <p>Great interiors are more than a beautiful image. They require considered decisions, dependable partners, clear costing, and careful coordination on the ground.</p>
              <p>Ravenwoods helps connect those pieces so homeowners, designers, and businesses can move forward with greater clarity.</p>
              <a className="text-link" href="#process">How we work <ArrowRight size={16} /></a>
            </div>
          </div>
          <div className="intro-stats">
            <div><strong>01</strong><span>Coordinated point<br />of contact</span></div>
            <div><strong>02</strong><span>Scope and costing<br />made clearer</span></div>
            <div><strong>03</strong><span>Supplier and site<br />coordination</span></div>
          </div>
        </section>

        <section className="services section-pad" id="services">
          <div className="section-heading">
            <div><div className="section-kicker">02 — WHAT WE DO</div><h2>From the detail<br />to the <em>whole.</em></h2></div>
            <p>One coordinated approach across the elements that make a space work — visually, practically, and operationally.</p>
          </div>
          <div className="service-list">
            {services.map(([number, title, description]) => (
              <a className="service-row" href="#inquire" key={number}>
                <span className="service-number">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="service-arrow"><ArrowUpRight size={21} /></span>
              </a>
            ))}
          </div>
          <p className="service-footnote">Service scope is confirmed for each project based on requirements, location, and partner availability.</p>
        </section>

        <section className="project-section section-pad" id="projects">
          <div className="section-heading project-heading">
            <div><div className="section-kicker">03 — SELECTED WORK</div><h2>Spaces with a<br /><em>point of view.</em></h2></div>
            <p>A selection of projects and environments. Open a project to see its summary, then tell us what you're planning.</p>
          </div>
          <div className="project-toolbar">
            <span>PROJECT INDEX <small>({String(visibleProjects.length).padStart(2, "0")})</small></span>
            <div className="filter-group" aria-label="Filter projects">
              {["All", "Residential", "Commercial"].map((filter) => (
                <button key={filter} className={activeFilter === filter ? "filter active" : "filter"} onClick={() => setActiveFilter(filter)}>{filter}</button>
              ))}
            </div>
          </div>
          <div className="project-grid">
            {visibleProjects.map((project, index) => (
              <button className={`project-card project-card-${index + 1}`} key={project.title} onClick={() => setActiveProject(project)}>
                <span className="project-image-wrap"><img src={project.image} alt={`${project.title} project inspiration`} loading="lazy" /><span className="project-open"><ArrowUpRight size={20} /></span></span>
                <span className="project-meta"><span>{project.type}</span><span>{project.location}</span></span>
                <span className="project-title">{project.title}</span>
              </button>
            ))}
          </div>
          <div className="project-disclaimer">Project names and descriptions are starter content based on the existing site audit. Verify image-to-project matching and replace any illustrative imagery with approved Ravenwoods project photography before launch.</div>
        </section>

        <section className="process section-pad" id="process">
          <div className="process-top">
            <div><div className="section-kicker">04 — HOW WE WORK</div><h2>A clear process.<br /><em>Fewer surprises.</em></h2></div>
            <p>Every project is different. A shared process helps everyone understand what comes next, what needs a decision, and how work moves forward.</p>
          </div>
          <div className="process-grid">
            {process.map(([number, title, description]) => (
              <div className="process-card" key={number}>
                <span className="process-number">{number}</span>
                <div className="process-line" />
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="statement section-pad">
          <div className="statement-image"><img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85" alt="Architectural interior with natural materials" loading="lazy" /></div>
          <div className="statement-copy"><div className="section-kicker">THE RAVENWOODS APPROACH</div><h2>Beautiful is important.<br /><em>Well executed</em> is essential.</h2><p>We believe confidence comes from understanding the scope, the people involved, and the decisions ahead — not just the finished photograph.</p><a className="button button-light" href="#inquire">Let's discuss your project <ArrowUpRight size={17} /></a></div>
        </section>

        <section className="faq section-pad">
          <div className="faq-heading"><div className="section-kicker">GOOD TO KNOW</div><h2>Before we<br /><em>get started.</em></h2></div>
          <div className="faq-list">
            {[
              ["What kinds of projects do you take on?", "We focus on modular cabinetry, custom furniture, sourcing, and interior fit-out coordination. The exact scope is confirmed after we understand your requirements."],
              ["Can you work with my architect or designer?", "Yes. We can coordinate with your existing design and project team, subject to the agreed scope and responsibilities."],
              ["How long does a project take?", "Timelines depend on scope, design approvals, materials, fabrication, site readiness, and installation. We will discuss a project-specific timeline during assessment."],
              ["How do I get an estimate?", "Send the project details through the inquiry form. Plans, dimensions, reference photos, and a target budget help us assess the scope more accurately."]
            ].map(([question, answer], i) => (
              <div className="faq-item" key={question}>
                <button onClick={() => setFaqOpen(faqOpen === i ? -1 : i)} aria-expanded={faqOpen === i}>
                  <span>{question}</span>{faqOpen === i ? <Minus size={18} /> : <Plus size={18} />}
                </button>
                {faqOpen === i && <p>{answer}</p>}
              </div>
            ))}
          </div>
        </section>

        <section className="inquiry section-pad" id="inquire">
          <div className="inquiry-intro">
            <div className="section-kicker">05 — START A CONVERSATION</div>
            <h2>Tell us what<br />you're <em>planning.</em></h2>
            <p>Share a few details and we'll have a clearer starting point for the conversation.</p>
            <div className="contact-details">
              <span><Mail size={16} /> Replace with official Ravenwoods email</span>
              <span><MapPin size={16} /> Philippines</span>
            </div>
            <p className="privacy-note">Your details will be used to respond to your project inquiry. Add a published privacy policy before collecting live submissions.</p>
          </div>
          <form className="inquiry-form" onSubmit={handleSubmit}>
            <div className="form-heading"><span>PROJECT INQUIRY</span><span>FORM 01 / 01</span></div>
            <div className="form-row">
              <label>Full name <input required name="name" autoComplete="name" value={form.name} onChange={updateField} placeholder="Your name" /></label>
              <label>Email address <input required type="email" name="email" autoComplete="email" value={form.email} onChange={updateField} placeholder="you@example.com" /></label>
            </div>
            <div className="form-row">
              <label>Phone number <input name="phone" autoComplete="tel" value={form.phone} onChange={updateField} placeholder="+63" /></label>
              <label>Project type
                <select name="projectType" value={form.projectType} onChange={updateField}>
                  <option>Modular cabinetry</option><option>Custom furniture</option><option>Interior fit-out</option><option>Sourcing / project coordination</option><option>Other</option>
                </select>
              </label>
            </div>
            <div className="form-row">
              <label>Project location <input name="location" value={form.location} onChange={updateField} placeholder="City / municipality" /></label>
              <label>Estimated budget
                <select name="budget" value={form.budget} onChange={updateField}>
                  <option value="">Select a range</option><option>Below ₱100,000</option><option>₱100,000–₱300,000</option><option>₱300,000–₱700,000</option><option>₱700,000–₱1,500,000</option><option>₱1,500,000+</option><option>To be discussed</option>
                </select>
              </label>
            </div>
            <label>Target timeline
              <select name="timeline" value={form.timeline} onChange={updateField}>
                <option value="">Select timing</option><option>As soon as possible</option><option>Within 1–3 months</option><option>Within 3–6 months</option><option>More than 6 months</option><option>Still exploring</option>
              </select>
            </label>
            <label>Tell us a little about your project <textarea name="message" value={form.message} onChange={updateField} rows="4" placeholder="Scope, dimensions, requirements, references, or questions…" /></label>
            <div className="form-submit-row"><p>Fields marked * are required.</p><button className="button button-dark" type="submit" disabled={submitState.status === "loading"}>{submitState.status === "loading" ? "Sending…" : "Submit inquiry"} <ArrowUpRight size={17} /></button></div>
            {submitState.status !== "idle" && <div className={`form-status ${submitState.status}`} role="status">{submitState.status === "sent" && <CheckCircle2 size={18} />}{submitState.message}</div>}
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark footer-wordmark" href="#home"><span className="wordmark-symbol">R<span>W</span></span><span className="wordmark-name">RAVENWOODS<small>INTERIORS · PROJECT COORDINATION</small></span></a>
        <p>Considered interiors.<br />Coordinated delivery.</p>
        <div className="footer-links"><a href="#about">About</a><a href="#services">Services</a><a href="#projects">Projects</a><a href="#inquire">Get in touch</a></div>
        <span className="copyright">© {new Date().getFullYear()} Ravenwoods. All rights reserved.</span>
      </footer>

      {activeProject && (
        <div className="modal-backdrop" role="presentation" onClick={() => setActiveProject(null)}>
          <section className="project-modal" role="dialog" aria-modal="true" aria-label={`${activeProject.title} project details`} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveProject(null)} aria-label="Close project details"><X size={22} /></button>
            <img src={activeProject.image} alt="" />
            <div className="modal-content"><span className="section-kicker">{activeProject.type} — {activeProject.location}</span><h2>{activeProject.title}</h2><p>{activeProject.description}</p><a className="button button-dark" href="#inquire" onClick={() => setActiveProject(null)}>Discuss a similar project <ArrowUpRight size={17} /></a></div>
          </section>
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
