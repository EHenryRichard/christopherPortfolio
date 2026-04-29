'use client';

import React, { memo, useState, useEffect } from 'react';
import './FooterComponent.css';

const FooterComponent = memo(() => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="page-footer">
      <div>©2025 Narrative by Topher — Crafted with intention. Every frame. Every word.</div>
      <div
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
      >
        Back To Top
      </div>
    </div>
  );
});

export default FooterComponent;