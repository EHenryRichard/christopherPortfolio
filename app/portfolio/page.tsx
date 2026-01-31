'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioItems } from '../data/portfolioData';
import Navbar from '../components/navbar';
import FooterComponent from '../components/FooterComponent';
import './page.css';

const categories = [
  'All',
  'Web Design',
  'UX Design',
  'Development',
  'Branding',
];

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

          {/* 2-Column Grid */}
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
                  <div className="portfolio-img-wrapper">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="portfolio-img"
                    />
                    <div className="portfolio-overlay">
                      <span>View Project</span>
                    </div>
                  </div>

                  <div className="portfolio-details">
                    <p className="item-category">{item.category}</p>
                    <h3 className="item-title">{item.title}</h3>
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
