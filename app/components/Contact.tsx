'use client';

import React, { useState } from 'react';
import { Send, Envelope, Linkedin, Github, Twitter } from 'react-bootstrap-icons';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <div className="contact-title">
            <h2>Let's</h2>
            <h2>Connect</h2>
          </div>
          <div className="contact-subtitle">
            Have a project in mind? Let's discuss how we can work together.
          </div>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <h3>Email</h3>
              <a href="mailto:hello@xolio.design">hello@xolio.design</a>
            </div>
            <div className="info-item">
              <h3>Phone</h3>
              <a href="tel:+1234567890">+1 (234) 567-890</a>
            </div>
            <div className="info-item">
              <h3>Location</h3>
              <p>San Francisco, CA</p>
            </div>
            <div className="info-item">
              <h3>Follow</h3>
              <div className="social-links">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter />
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
            <button type="submit" className="submit-btn">
              <span>Send Message</span>
              <Send />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
