'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { IoMenu, IoClose } from 'react-icons/io5';
import Link from 'next/link';
import { navigationData, socialData } from '../data/navData';
import './navbar.css';

// Create a motion-enabled Link component
const MotionLink = motion(Link);

const Navbar = () => {
  const [time, setTime] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  // Animation variants
  const containerVariants: Variants = {
    hidden: { y: '100%' },
    visible: {
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      y: '100%',
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const navbarVariants: Variants = {
    hidden: { y: '-100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.4,
        ease: 'easeOut',
      },
    },
  };

  const listItemVariants: Variants = {
    hidden: { y: '100%' },
    visible: (i: number) => ({
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.5 + i * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const footerVariants: Variants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 1,
        ease: 'easeOut',
      },
    },
  };

  return (
    <>
      {/* header */}
      <header>
        <nav className="navbar">
          <div className="nav-left">
            <span className="label">local/</span>
            <span className="time">{formattedTime}</span>
          </div>

          <div className="nav-center">
            <motion.div
              className="menu"
              onClick={() => setIsMenuOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <IoMenu />
            </motion.div>
          </div>
          <MotionLink
            href="/contact"
            className="contact-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            contact now
          </MotionLink>
        </nav>
      </header>

      {/* Nav container with AnimatePresence */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="nav-container open"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="navbar"
              variants={navbarVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="nav-left">
                <span className="label">local/</span>
                <span className="time">{formattedTime}</span>
              </div>
              <div className="nav-center" onClick={() => setIsMenuOpen(false)}>
                <motion.div
                  className="close-container"
                  whileHover={{ scale: 1.1, backgroundColor: '#fff' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="close"
                    onHoverStart={() => ({ color: '#000' })}
                    onHoverEnd={() => ({ color: '#fff' })}
                  >
                    <IoClose />
                  </motion.div>
                </motion.div>
              </div>
              <MotionLink
                href="/contact"
                className="contact-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                contact now
              </MotionLink>
            </motion.div>

            <ul className="list">
              {navigationData.map((list, index) => (
                <li key={list.name}>
                  <MotionLink
                    href={list.href}
                    className={activeLink === list.name ? 'active' : ''}
                    onClick={() => {
                      setActiveLink(list.name);
                      setIsMenuOpen(false);
                    }}
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    whileHover={{ color: '#414141' }}
                  >
                    {list.name}
                  </MotionLink>
                </li>
              ))}
            </ul>

            <motion.div
              className="footer"
              variants={footerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="rights">©2025 Narrative by Topher</div>
              <div className="socials">
                <ul>
                  {socialData.map((social, index) => (
                    <li key={index}>
                      <motion.a
                        href={social.href}
                        whileHover={{ opacity: 0.7 }}
                      >
                        {social.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
