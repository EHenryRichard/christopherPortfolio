'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import './About.css';
import { aboutProcess } from '../data/aboutData';

// Two images for the dual-layout
const imgOne = '/images/img-1.jpeg'; // The one you currently have
const imgTwo = '/images/img-2.jpeg'; // The new image for the left space

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-main-container">
        {/* === Header Dual-Image Grid === */}
        <div className="about-header-grid">
          {/* Left Column: New Image + Massive Titles */}
          <div className="header-column left-col">
            <motion.div
              className="about-image-wrapper secondary-img"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image
                src={imgTwo}
                alt="Topher Detail"
                fill
                className="about-image"
              />
            </motion.div>

            <div className="titles-wrapper">
              <h1 className="massive-title">I'M Topher</h1>
              <h1 className="massive-title">BASED IN Anambra,</h1>
              <div className="title-with-accent">
                <h1 className="massive-title">NIGERIA.</h1>
                <div className="accent-line"></div>
              </div>
            </div>
          </div>

          {/* Right Column: Main Image + Description */}
          <div className="header-column right-col">
            <motion.div
              className="about-image-wrapper primary-img"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src={imgOne}
                alt="Topher Profile"
                fill
                className="about-image"
                priority
              />
            </motion.div>

            <p className="about-description">
              Video editor and voice artist based in Anambra, Nigeria. I build
              stories from raw footage — shaping narrative, pacing, and sound
              into content that moves people and represents brands with
              intention.
            </p>
          </div>
        </div>

        {/* === Process List Section === */}
        <div className="about-process-list">
          {aboutProcess.map((step) => (
            <div key={step.id} className="process-row">
              <div className="process-dots">{step.dots}</div>
              <div className="process-content">
                <h3 className="process-title">{step.title}</h3>
                <p className="process-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
