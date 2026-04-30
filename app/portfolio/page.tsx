'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioItems } from '../data/portfolioData';
import Navbar from '../components/navbar';
import FooterComponent from '../components/FooterComponent';
import './page.css';

const categories = ['All', 'Voice Artistry', 'Brand Marketing'];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredItems =
    activeFilter === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <>
      <Navbar />
      <section className="portfolio-section" id="work">
        <div className="portfolio-container">
          {/* Filter Navigation */}
          <div className="portfolio-filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-item ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                <span className="filter-text">{cat}</span>
                {activeFilter === cat && (
                  <motion.div layoutId="underline" className="filter-underline" />
                )}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="portfolio-grid">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="portfolio-card"
                >
                  {/* Video player */}
                  <div className="portfolio-img-wrapper">
                    <video
                      src={item.videoSrc}
                      controls
                      controlsList="nodownload"
                      disablePictureInPicture
                      onContextMenu={(e) => e.preventDefault()}
                      className="portfolio-img"
                      style={{ objectFit: 'contain', background: '#000' }}
                    />
                  </div>

                  {/* Project details */}
                  <div className="portfolio-details">
                    <p className="item-category">{item.category}</p>
                    <h3 className="item-title">{item.title}</h3>
                    <p className="item-subtitle">{item.subtitle}</p>
                    <p className="item-description">{item.description}</p>

                    <div className="item-tags">
                      {item.tags.map((tag) => (
                        <span key={tag} className="item-tag">{tag}</span>
                      ))}
                    </div>

                    <div className="item-meta">
                      <div className="meta-row">
                        <span className="meta-label">Client</span>
                        <span className="meta-value">{item.client}</span>
                      </div>
                      <div className="meta-row">
                        <span className="meta-label">Year</span>
                        <span className="meta-value">{item.year}</span>
                      </div>
                      <div className="meta-row">
                        <span className="meta-label">Services</span>
                        <span className="meta-value">{item.services.join(' · ')}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      <FooterComponent />
    </>
  );
};

export default Portfolio;
