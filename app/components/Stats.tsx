'use client';

import React, { useEffect, useRef, useState } from 'react';
import './Stats.css';

interface StatItem {
  id: number;
  value: string;
  label: string;
  suffix?: string;
}

const statsData: StatItem[] = [
  { id: 1, value: '60', label: 'Projects Completed', suffix: '+' },
  { id: 2, value: '2', label: 'Years at 7figuria', suffix: '+' },
  { id: 3, value: '100', label: 'Stories Worth Telling', suffix: '%' },
];

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <section className="stats-section" id="stats" ref={statsRef}>
      <div className="stats-container">
        {statsData.map((stat, index) => (
          <div
            key={stat.id}
            className={`stat-item ${isVisible ? 'animate' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="stat-value">
              {stat.value}
              {stat.suffix && <span className="stat-suffix">{stat.suffix}</span>}
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
