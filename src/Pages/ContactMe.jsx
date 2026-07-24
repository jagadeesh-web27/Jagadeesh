import React, { useState, useEffect, useRef } from "react";
import "../Styles/contactme.css";
import emailjs from "@emailjs/browser";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaPaperPlane,
} from "react-icons/fa";

const contactInfo = [
  {
    icon: <FaEnvelope />,
    label: "Email",
    value: "jagadeeshboya27@gmail.com",
    href: "mailto:jagadeeshboya27@gmail.com",
    color: "#8b5cf6",
  },
  {
    icon: <FaPhone />,
    label: "Phone",
    value: "+91 9121585417",
    href: "tel:+919121585417",
    color: "#06b6d4",
  },
  {
    icon: <FaMapMarkerAlt />,
    label: "Location",
    value: "Anantapur, Andhra Pradesh, India",
    href: null,
    color: "#ec4899",
  },
];

const socialLinks = [
  {
    icon: <FaLinkedin />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jagadeesh-boya-68122b262",
    color: "#0ea5e9",
    id: "linkedin-link",
  },
  {
    icon: <FaGithub />,
    label: "GitHub",
    href: "https://github.com/dashboard",
    color: "#a78bfa",
    id: "github-link",
  },
  {
    icon: <span style={{fontWeight: 'bold', fontFamily: 'sans-serif'}}>X</span>,
    label: "Twitter",
    href: "https://twitter.com",
    color: "#cbd5e1",
    id: "twitter-link",
  },
];

function Toast({ message, type, visible }) {
  return (
    <div
      className={`toast toast--${type} ${visible ? "toast--visible" : ""}`}
      role="alert"
    >
      <span className="toast-icon">{type === "success" ? "✅" : "❌"}</span>
      {message}
    </div>
  );
}

function ContactMe() {
  const formRef = useRef();
  const sectionRef = useRef();
  const [formData, setFormData] = useState({ from_name: "", phone: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    emailjs.init("SfJ8zIH-hftRoyB0a");
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSectionVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const showToast = (message, type) => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 4500);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await emailjs.send(
        "service_gkl7a8a",
        "template_cbezi4s", 
        {
          from_name: formData.from_name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
        }, 
        { publicKey: "SfJ8zIH-hftRoyB0a" }
      );
      showToast("Message sent! I'll get back to you soon 🎉", "success");
      setFormData({ from_name: "", phone: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS Error:", err);
      const errorMsg = err?.text || err?.message || "Something went wrong";
      showToast(`Error: ${errorMsg}. Please email me.`, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact-page">
      <Toast message={toast.message} type={toast.type} visible={toast.visible} />

      <div className="contact-wrapper">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          I'd love to hear from you — let's build something amazing together
        </p>

        <div
          ref={sectionRef}
          className={`contact-grid ${sectionVisible ? "contact-grid--visible" : ""}`}
        >
          {/* ===== INFO PANEL ===== */}
          <div className="contact-info-panel">
            <div className="info-header">
              <h3>Let's Connect</h3>
              <p>
                I'm currently available for freelance work and full-time
                opportunities. Feel free to reach out!
              </p>
            </div>

            <div className="contact-items">
              {contactInfo.map((item, i) => (
                <div
                  className="contact-item"
                  key={i}
                  style={{ "--item-color": item.color }}
                >
                  <div
                    className="contact-item-icon"
                    style={{
                      color: item.color,
                      background: `${item.color}18`,
                      border: `1px solid ${item.color}30`,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div className="contact-item-text">
                    <span className="contact-item-label">{item.label}</span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="contact-item-value contact-item-link"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="contact-item-value">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="social-section">
              <p className="social-label">Find me on</p>
              <div className="social-links">
                {socialLinks.map((s) => (
                  <a
                    key={s.id}
                    id={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-pill"
                    style={{ "--s-color": s.color }}
                    aria-label={s.label}
                  >
                    <span style={{ color: s.color }}>{s.icon}</span>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="availability-badge" style={{marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start', background: 'transparent', border: 'none', padding: '0'}}>
              <div className="avail-row" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#134e2a', padding: '0.4rem 1rem', borderRadius: '20px', border: '1px solid #16a34a', color: '#86efac', fontSize: '0.75rem', fontWeight: '600'}}>
                <span className="avail-dot" aria-hidden="true" style={{width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%', boxShadow: '0 0 8px #4ade80', animation: 'pulse-dot 2s ease-in-out infinite'}} />
                Available for new opportunities
              </div>
              <div className="response-time-badge" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.4rem 1rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-3)', fontSize: '0.75rem', fontWeight: '500'}}>
                ⚡ Usually replies within 2 hours
              </div>
            </div>
          </div>

          {/* ===== FORM PANEL ===== */}
          <div className="contact-form-panel">
            <h3 className="form-heading">Send Me a Message</h3>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="contact-form"
              id="contact-form"
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="from_name" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="+91 9XXXXXXXXX"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-input form-textarea"
                  placeholder="Tell me about your project or opportunity..."
                  required
                  rows={5}
                />
              </div>
              <button
                type="submit"
                className={`form-submit ${submitting ? "form-submit--loading" : ""}`}
                disabled={submitting}
                id="submit-btn"
              >
                {submitting ? (
                  <>
                    <span className="spinner" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactMe;