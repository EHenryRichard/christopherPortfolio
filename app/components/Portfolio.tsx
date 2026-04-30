'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { portfolioItems } from '../data/portfolioData';

const bgStyle = {
  backgroundColor: '#09090b',
  backgroundImage: `
    linear-gradient(45deg, #0f0f12 25%, transparent 25%),
    linear-gradient(-45deg, #0f0f12 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #0f0f12 75%),
    linear-gradient(-45deg, transparent 75%, #0f0f12 75%)
  `,
  backgroundSize: '8px 8px',
  backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
  backgroundAttachment: 'fixed' as const,
};

const glassStyle = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
};

const Portfolio = () => {
  const quantity = portfolioItems.length;
  const [radius, setRadius] = useState(260);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const update = () => {
      setRadius(window.innerWidth <= 800 ? 140 : window.innerWidth < 1024 ? 200 : 260);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 800);
    return () => clearTimeout(t);
  }, [currentIndex]);

  const goTo = (index: number) => {
    setShowContent(false);
    setTimeout(() => setCurrentIndex(index), 300);
  };

  const currentItem = portfolioItems[currentIndex];
  const currentRotation = -(currentIndex * (360 / quantity));

  return (
    <section
      id="portfolio"
      className="w-full min-h-screen overflow-hidden relative flex flex-col items-center justify-start pt-16 pb-12 px-5 gap-10"
      style={bgStyle}
    >
      {/* Section header */}
      <div className="w-full max-w-5xl flex items-end justify-between">
        <h2 className="text-white text-5xl max-[800px]:text-3xl font-bold uppercase">Work</h2>
        <span className="text-gray-500 text-sm uppercase tracking-widest">Selected Projects</span>
      </div>

      {/* Active project */}
      <div className="w-full max-w-5xl flex flex-col gap-6">
        {/* Video player */}
        <div className="w-full rounded-2xl overflow-hidden" style={{ ...glassStyle, boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
          <video
            key={currentItem.videoSrc}
            src={currentItem.videoSrc}
            controls
            controlsList="nodownload"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            className="w-full block"
            style={{ maxHeight: '480px', objectFit: 'contain', background: '#000' }}
          />
        </div>

        {/* Project info */}
        <AnimatePresence mode="wait">
          {showContent && (
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                {currentItem.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {currentItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-white uppercase tracking-wider px-3 py-1 rounded-full"
                    style={glassStyle}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-8 pt-2 border-t border-white/10">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Client</p>
                  <p className="text-white text-sm">{currentItem.client}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Year</p>
                  <p className="text-white text-sm">{currentItem.year}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Services</p>
                  <p className="text-white text-sm">{currentItem.services.join(' · ')}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3D Carousel navigation */}
      <div className="relative flex items-center justify-center w-full mt-4" style={{ height: '220px' }}>
        <motion.button
          className="absolute left-10 max-[800px]:left-2 z-20 w-12 h-12 max-[800px]:w-8 max-[800px]:h-8 flex items-center justify-center rounded-full cursor-pointer text-white text-2xl max-[800px]:text-base"
          style={glassStyle}
          onClick={() => goTo((currentIndex - 1 + quantity) % quantity)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <IoChevronBack />
        </motion.button>

        <div className="w-[180px] h-[160px] max-[800px]:w-[120px] max-[800px]:h-[110px] relative" style={{ perspective: '1000px' }}>
          <motion.div
            className="w-full h-full relative"
            style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-8deg)' }}
            animate={{ rotateY: currentRotation }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          >
            {portfolioItems.map((item, index) => {
              const isActive = index === currentIndex;
              return (
                <motion.div
                  key={item.id}
                  className="absolute w-[180px] h-[160px] max-[800px]:w-[120px] max-[800px]:h-[110px] left-0 top-0 rounded-xl cursor-pointer flex flex-col justify-between p-4"
                  style={{
                    ...glassStyle,
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    transform: `rotateY(${(index * 360) / quantity}deg) translateZ(${radius}px)`,
                    boxShadow: isActive ? '0 0 30px rgba(255,255,255,0.1)' : '0 8px 30px rgba(0,0,0,0.5)',
                  }}
                  animate={{ opacity: isActive ? 1 : 0.45 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => goTo(index)}
                >
                  <span className="text-gray-400 text-xs font-mono">{String(item.id).padStart(2, '0')}</span>
                  <div>
                    <p className="text-white text-sm font-bold leading-tight">{item.title}</p>
                    <p className="text-gray-400 text-xs mt-1">{item.category}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <motion.button
          className="absolute right-10 max-[800px]:right-2 z-20 w-12 h-12 max-[800px]:w-8 max-[800px]:h-8 flex items-center justify-center rounded-full cursor-pointer text-white text-2xl max-[800px]:text-base"
          style={glassStyle}
          onClick={() => goTo((currentIndex + 1) % quantity)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <IoChevronForward />
        </motion.button>
      </div>

      {/* Dots */}
      <div className="flex gap-3">
        {portfolioItems.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full border-2 border-white cursor-pointer transition-colors duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-transparent'
            }`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
