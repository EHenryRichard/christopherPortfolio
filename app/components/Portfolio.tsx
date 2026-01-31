'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { portfolioItems } from '../data/portfolioData';

const Portfolio = () => {
  const quantity = portfolioItems.length;
  const [radius, setRadius] = useState(400);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);

  // Adjust radius and image size based on screen size
  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth <= 800) {
        setRadius(180);
      } else if (window.innerWidth < 1024) {
        setRadius(320);
      } else {
        setRadius(400);
      }
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowContent(true);
    }, 1200);

    const nextTimer = setTimeout(() => {
      setShowContent(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % quantity);
      }, 500);
    }, 30000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(nextTimer);
    };
  }, [currentIndex, quantity]);

  const currentItem = portfolioItems[currentIndex];
  const currentRotation = -(currentIndex * (360 / quantity));

  const goToPrev = () => {
    setShowContent(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + quantity) % quantity);
    }, 300);
  };

  const goToNext = () => {
    setShowContent(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % quantity);
    }, 300);
  };

  return (
    <section
      id="portfolio"
      className="w-full h-[50vh] overflow-hidden relative flex flex-col items-center justify-center py-15 px-5"
      style={{
        backgroundColor: '#09090b',
        backgroundImage: `
          linear-gradient(45deg, #0f0f12 25%, transparent 25%),
          linear-gradient(-45deg, #0f0f12 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #0f0f12 75%),
          linear-gradient(-45deg, transparent 75%, #0f0f12 75%)
        `,
        backgroundSize: '8px 8px',
        backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Title at top */}
      <div className="absolute top-33 left-1/2 -translate-x-1/2 z-10 min-h-[60px] px-4 max-[800px]:top-15">
        <AnimatePresence>
          {showContent && (
            <motion.h2
              className="text-4xl max-[800px]:text-xl font-bold text-white text-center m-0"
              style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)' }}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              {currentItem.title}
            </motion.h2>
          )}
        </AnimatePresence>
      </div>

      {/* Active image container/frame with blur effect - behind the carousel */}
      <div
        className="absolute left-1/2 top-103 max-[800px]:top-1/2 -translate-x-1/2 -translate-y-1/2 w-97 h-150 max-[800px]:w-48 max-[800px]:h-80 z-0 pointer-events-none rounded-3xl"
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow:
            '0 8px 32px rgba(255, 255, 255, 0.1), inset 0 0 60px rgba(255, 255, 255, 0.1)',
        }}
      />

      {/* 3D Carousel wrapper */}
      <div
        className="w-[200px] h-55 max-[800px]:w-[120px] max-[800px]:h-[180px] relative z-10"
        style={{ perspective: '1000px' }}
      >
        <motion.div
          className="w-full h-full relative"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(-10deg)',
          }}
          animate={{
            rotateY: currentRotation,
          }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
          }}
        >
          {portfolioItems.map((item, index) => {
            const rotationAngle = (index * 360) / quantity;
            const isActive = index === currentIndex;

            return (
              <motion.div
                key={item.id}
                className="absolute w-[200px] h-[280px] max-[800px]:w-[120px] max-[800px]:h-[180px] left-0 top-0"
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  transform: `rotateY(${rotationAngle}deg) translateZ(${radius}px)`,
                }}
                animate={{
                  filter: isActive ? 'blur(0px)' : 'blur(2px)',
                  opacity: isActive ? 1 : 0.6,
                }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-2xl max-[800px]:rounded-xl"
                  style={{ boxShadow: '0 15px 50px rgba(0, 0, 0, 0.6)' }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Left Arrow */}
      <motion.button
        className="absolute left-10 max-[800px]:left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 max-[800px]:w-8 max-[800px]:h-8 flex items-center justify-center rounded-full cursor-pointer text-white text-2xl max-[800px]:text-base"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
        onClick={goToPrev}
        whileHover={{ scale: 1.1, background: 'rgba(255, 255, 255, 0.25)' }}
        whileTap={{ scale: 0.95 }}
      >
        <IoChevronBack />
      </motion.button>

      {/* Right Arrow */}
      <motion.button
        className="absolute right-10 max-[800px]:right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 max-[800px]:w-8 max-[800px]:h-8 flex items-center justify-center rounded-full cursor-pointer text-white text-2xl max-[800px]:text-base"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
        onClick={goToNext}
        whileHover={{ scale: 1.1, background: 'rgba(255, 255, 255, 0.25)' }}
        whileTap={{ scale: 0.95 }}
      >
        <IoChevronForward />
      </motion.button>

      {/* Button at bottom */}
      <div className="absolute bottom-36 max-[800px]:bottom-28 left-1/2 -translate-x-1/2 z-10 min-h-[50px]">
        <AnimatePresence>
          {showContent && (
            <motion.button
              className="py-3.5 px-8 max-[800px]:py-2 max-[800px]:px-4 text-base max-[800px]:text-xs font-bold h-10 max-[800px]:h-8 w-40 max-[800px]:w-28 text-white rounded-full cursor-pointer uppercase tracking-wide"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{
                scale: 1.05,
                background: 'rgba(255, 255, 255, 0.25)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              View More
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation indicators */}
      <div className="absolute bottom-10 max-[800px]:bottom-10 left-1/2 -translate-x-1/2 flex gap-3 max-[800px]:gap-2 z-10">
        {portfolioItems.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 max-[800px]:w-2 max-[800px]:h-2 rounded-full border-2 max-[800px]:border border-white cursor-pointer transition-colors duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-transparent'
            }`}
            onClick={() => {
              setShowContent(false);
              setTimeout(() => setCurrentIndex(index), 300);
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
