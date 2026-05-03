'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

type PortfolioItem = {
  id: string;
  title: string;
  thumbnail: string | null;
  is_featured: boolean;
  is_nda: boolean;
};

const API = 'https://api.narrativesbytopher.com/api/get-portfolio.php';

const Portfolio = () => {
  const router = useRouter();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [radius, setRadius] = useState(340);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then((data: PortfolioItem[]) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth <= 800) {
        setRadius(160);
      } else if (window.innerWidth < 1024) {
        setRadius(260);
      } else {
        setRadius(340);
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    const showTimer = setTimeout(() => setShowContent(true), 1200);
    const nextTimer = setTimeout(() => {
      setShowContent(false);
      setTimeout(() => setCurrentIndex((prev) => (prev + 1) % items.length), 500);
    }, 30000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(nextTimer);
    };
  }, [currentIndex, items.length]);

  const goToPrev = () => {
    setShowContent(false);
    setTimeout(() => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length), 300);
  };

  const goToNext = () => {
    setShowContent(false);
    setTimeout(() => setCurrentIndex((prev) => (prev + 1) % items.length), 300);
  };

  const sectionStyle = {
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

  if (loading) {
    return (
      <section id="portfolio" className="w-full h-screen flex items-center justify-center" style={sectionStyle}>
        <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white animate-spin" />
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section id="portfolio" className="w-full h-screen flex items-center justify-center" style={sectionStyle}>
        <p className="text-white/50 text-lg">No projects yet.</p>
      </section>
    );
  }

  const quantity = items.length;
  const currentItem = items[currentIndex];
  const currentRotation = -(currentIndex * (360 / quantity));

  return (
    <section
      id="portfolio"
      className="w-full h-screen overflow-hidden relative flex items-center justify-center px-5"
      style={sectionStyle}
    >
      {/* Title */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[calc(50%-295px)] max-[800px]:top-[calc(50%-255px)] z-10 px-6 max-w-[80vw] text-center">
        <AnimatePresence mode="wait">
          <motion.h2
            key={currentItem.title}
            className="text-4xl max-[800px]:text-xl font-bold text-white text-center m-0"
            style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {currentItem.title}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Active image frame */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[430px] max-[800px]:w-[200px] max-[800px]:h-[290px] z-0 pointer-events-none rounded-3xl"
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(255, 255, 255, 0.1), inset 0 0 60px rgba(255, 255, 255, 0.1)',
        }}
      />

      {/* 3D Carousel */}
      <div
        className="w-[180px] h-[240px] max-[800px]:w-[130px] max-[800px]:h-[170px] relative z-10"
        style={{ perspective: '1000px' }}
      >
        <motion.div
          className="w-full h-full relative"
          style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-10deg)' }}
          animate={{ rotateY: currentRotation }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          {items.map((item, index) => {
            const rotationAngle = (index * 360) / quantity;
            const isActive = index === currentIndex;
            return (
              <motion.div
                key={item.id}
                className="absolute w-[180px] h-[240px] max-[800px]:w-[130px] max-[800px]:h-[185px] left-0 top-0"
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
                  src={item.thumbnail ?? '/images/img-1.jpeg'}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-2xl max-[800px]:rounded-xl"
                  style={{ boxShadow: '0 15px 50px rgba(0, 0, 0, 0.6)' }}
                />
                {isActive && item.is_featured && (
                  <span style={{
                    position: 'absolute', top: 8, left: 8,
                    fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.08em',
                    textTransform: 'uppercase', padding: '3px 8px', borderRadius: 999,
                    background: 'rgba(255,215,0,0.15)', border: '1px solid rgba(255,215,0,0.4)',
                    color: '#ffd700', pointerEvents: 'none',
                  }}>★ Featured</span>
                )}
                {isActive && item.is_nda && (
                  <span style={{
                    position: 'absolute', top: 8, right: 8,
                    fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.08em',
                    textTransform: 'uppercase', padding: '3px 8px', borderRadius: 999,
                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)',
                    color: 'rgba(255,255,255,0.6)', pointerEvents: 'none',
                  }}>🔒 NDA</span>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <AnimatePresence>
        {showContent && (
          <motion.button
            className="absolute left-1/2 top-1/2 z-20 h-10 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/35 bg-black/45 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-md cursor-pointer max-[800px]:h-8 max-[800px]:w-28 max-[800px]:text-[10px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35 }}
            whileHover={{ scale: 1.05, background: 'rgba(255, 255, 255, 0.22)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(`/portfolio/${currentItem.id}`)}
          >
            View Project
          </motion.button>
        )}
      </AnimatePresence>

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

      {/* View More + counter */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[calc(50%+230px)] max-[800px]:top-[calc(50%+155px)] flex flex-col items-center gap-3 z-10">
        <motion.button
          className="py-3.5 px-8 max-[800px]:py-2 max-[800px]:px-4 text-base max-[800px]:text-xs font-bold h-10 max-[800px]:h-8 w-40 max-[800px]:w-28 text-white rounded-full cursor-pointer uppercase tracking-wide"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
          whileHover={{ scale: 1.05, background: 'rgba(255, 255, 255, 0.25)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/portfolio')}
        >
          View More
        </motion.button>
        <p
          className="text-xs max-[800px]:text-[10px] font-bold tracking-widest uppercase"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          {currentIndex + 1} / {items.length}
        </p>
      </div>
    </section>
  );
};

export default Portfolio;
