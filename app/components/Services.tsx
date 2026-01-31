'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check2 } from 'react-bootstrap-icons';
import { servicesData } from '../data/serviceData';
import './Services.css';

const Services = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="w-full service" id="services">
      <div className="sevice-container">
        <div className="service-container-text">
          <div className="right-text">
            <h2>pro</h2>
            <h2>services</h2>
          </div>
          <div className="left-text">
            Discover our range of services designed to elevate your brand to
            next level.
          </div>
        </div>

        <div className="service-container-list">
          {servicesData.map((service) => (
            <div key={service.id}>
              <div
                className="service-row"
                onClick={() => toggleExpand(service.id)}
              >
                <div className="service-num">{service.number}</div>
                <div className="service-info">
                  <h3>{service.title}</h3>
                  <p>{service.subtitle}</p>
                </div>
                <div
                  className={`service-icon ${expandedId === service.id ? 'rotated' : ''}`}
                >
                  <ChevronDown />
                </div>
              </div>

              <AnimatePresence>
                {expandedId === service.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="service-expand"
                  >
                    <div className="expand-content">
                      <ul>
                        {service.features.map((feature, index) => (
                          <li key={index}>
                            <Check2 className="feature-icon" />
                            <span className="feature-text">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <div className="bottom-line"></div>
        </div>
      </div>
    </section>
  );
};

export default Services;
