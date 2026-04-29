'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check2 } from 'react-bootstrap-icons';
import './Experience.css';

interface ExperienceItem {
  id: number;
  year: string;
  company: string;
  role: string;
  description: string;
  achievements: string[];
}

const experienceData: ExperienceItem[] = [
  {
    id: 1,
    year: '2022 - Present',
    company: '7figuria',
    role: 'Video Editor',
    description: 'Delivered 60+ projects across brand campaigns, social content, and long-form productions',
    achievements: [
      'Specialised in motion graphics and pacing-driven edits',
      'End-to-end post-production for a growing creative agency',
      'Brand campaigns, social content, and long-form productions',
      '60+ completed projects across diverse clients',
    ],
  },
  {
    id: 2,
    year: 'Ongoing',
    company: 'Nigerian Brands',
    role: 'Voice Artist',
    description: 'Commercial voiceover for brands across Nigeria',
    achievements: [
      'Product ads, promos, and documentary narration',
      'Distinctive tone blending authority with relatability',
      'Tailored delivery for English and culturally resonant scripts',
      'Consistent quality across commercial and brand content',
    ],
  },
];

const Experience = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="experience-section" id="experience">
      <div className="experience-container">
        <div className="experience-header">
          <div className="experience-title">
            <h2>Work</h2>
            <h2>Experience</h2>
          </div>
          <div className="experience-subtitle">
            A journey through my professional career and key achievements.
          </div>
        </div>

        <div className="experience-list">
          {experienceData.map((exp) => (
            <div key={exp.id} className="experience-item-wrapper">
              <div
                className="experience-item"
                onClick={() => toggleExpand(exp.id)}
              >
                <div className="experience-year">{exp.year}</div>
                <div className="experience-info">
                  <h3>{exp.role}</h3>
                  <p className="company">{exp.company}</p>
                  <p className="description">{exp.description}</p>
                </div>
                <div
                  className={`experience-icon ${expandedId === exp.id ? 'rotated' : ''}`}
                >
                  <ChevronDown />
                </div>
              </div>

              <AnimatePresence>
                {expandedId === exp.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="experience-expand"
                  >
                    <div className="expand-content">
                      <h4>Key Achievements</h4>
                      <ul>
                        {exp.achievements.map((achievement, index) => (
                          <li key={index}>
                            <Check2 className="achievement-icon" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <div className="experience-bottom-line"></div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
