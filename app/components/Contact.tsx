'use client';

import React, { useState } from 'react';
import { Send, Instagram } from 'react-bootstrap-icons';
import './Contact.css';

const API = 'https://api.narrativesbytopher.com/contact.php';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        if (!json.email_sent) console.warn('Message saved but email failed:', json.email_error);
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">

        <div className="contact-title">
          <h1>
            <span>Let&apos;s</span>
            <span className="dim">Build</span>
            <span>Together.</span>
          </h1>
        </div>

        <div className="contact-body">

          <div className="contact-info">
            <div className="info-item">
              <span className="info-label">Email</span>
              <a href="mailto:chijinduagoh@gmail.com" className="info-value">chijinduagoh@gmail.com</a>
            </div>
            <div className="info-item">
              <span className="info-label">Phone</span>
              <a href="tel:+2349063504406" className="info-value">+234 906 350 4406</a>
            </div>
            <div className="info-item">
              <span className="info-label">Location</span>
              <span className="info-value">Anambra State, Nigeria<br />Available Worldwide</span>
            </div>
            <div className="info-item">
              <span className="info-label">Follow</span>
              <div className="social-links">
                <a href="https://www.instagram.com/godnobunaga" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
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
            <div className="form-row">
              <div className="form-field">
                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-field">
                <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-field full">
              <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
            </div>
            <div className="form-field full">
              <textarea name="message" placeholder="Tell me about your project…" value={formData.message} onChange={handleChange} required />
            </div>
            <div className="form-bottom">
              {status === 'success' && (
                <p className="form-note" style={{ color: 'rgba(100,255,150,0.85)' }}>Message sent! I&apos;ll get back to you shortly.</p>
              )}
              {status === 'error' && (
                <p className="form-note" style={{ color: 'rgba(255,100,100,0.85)' }}>Something went wrong. Please try again.</p>
              )}
              {status !== 'success' && status !== 'error' && (
                <p className="form-note">I&apos;ll get back to you within 24 hours.</p>
              )}
              <button type="submit" className="submit-btn" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : <><span>Send Message</span><Send /></>}
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;
