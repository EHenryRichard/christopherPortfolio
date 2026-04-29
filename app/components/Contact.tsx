'use client';

import React, { useState } from 'react';
import { Send, Instagram } from 'react-bootstrap-icons';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <div className="contact-title">
            <h2>Let's Build</h2>
            <h2>Something</h2>
          </div>
          <div className="contact-subtitle">
            Got a project, a vision, or just a rough idea? Let's talk about how to make it real.
          </div>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <h3>Email</h3>
              <a href="mailto:chijinduagoh@gmail.com">chijinduagoh@gmail.com</a>
            </div>
            <div className="info-item">
              <h3>Phone</h3>
              <a href="tel:+2349063504406">+234 906 350 4406</a>
            </div>
            <div className="info-item">
              <h3>Location</h3>
              <p>Anambra State, Nigeria · Available Worldwide</p>
            </div>
            <div className="info-item">
              <h3>Follow</h3>
              <div className="social-links">
                <a href="https://www.instagram.com/godnobunaga" target="_blank" rel="noopener noreferrer">
                  <Instagram />
                </a>
                <a href="https://www.tiktok.com/@tophersnarratives" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {status === 'success' && (
              <p className="form-feedback success">Message sent! I'll get back to you soon.</p>
            )}
            {status === 'error' && (
              <p className="form-feedback error">Something went wrong. Please try again or email me directly.</p>
            )}

            <button type="submit" className="submit-btn" disabled={status === 'sending'}>
              <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
              <Send />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
