'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { GeoAlt, Globe, PatchCheck } from 'react-bootstrap-icons';
import { carouselData, infoData } from '../data/heroData';
import './Hero.css';

const Hero = () => {
  const [items, setItems] = useState(carouselData);
  const [animating, setAnimating] = useState<'next' | 'prev' | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const timeRunning = 1000;
  const timeAutoNext = 10000;

  const showSlider = useCallback(
    (type: 'next' | 'prev') => {
      if (animating) return;

      setAnimating(type);

      setItems((prevItems) => {
        const newItems = [...prevItems];
        if (type === 'next') {
          const first = newItems.shift()!;
          newItems.push(first);
        } else {
          const last = newItems.pop()!;
          newItems.unshift(last);
        }
        return newItems;
      });

      // Clear animation class after animation completes
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setAnimating(null);
      }, timeRunning);

      // Reset auto-play timer
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
      autoPlayRef.current = setTimeout(() => {
        showSlider('next');
      }, timeAutoNext);
    },
    [animating]
  );

  // Auto-play on mount
  useEffect(() => {
    autoPlayRef.current = setTimeout(() => {
      showSlider('next');
    }, timeAutoNext);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    };
  }, []);

  // Get thumbnail items (exclude first item which is the main slide)
  const thumbnailItems = [...items.slice(1), items[0]];

  return (
    <>
      <section id="home" className={`carousel ${animating || ''}`}>
        <div className="list">
          {items.map((item, index) => (
            <div className="item" key={item.id} data-index={index}>
              <div className="img-wrapper">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={index === 0}
                  sizes="100vw"
                />
                <div className="img-overlay"></div>
              </div>
              <div className="content">
                <div className="author">{item.author}</div>
                <div className="title">{item.title}</div>
                <div className="topic">{item.topic}</div>
                <div className="des">{item.description}</div>
                <div className="buttons">
                  {/* <button>SEE MORE</button> */}
                  <button>SEE MORE</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="thumbnail">
          {thumbnailItems.map((item) => (
            <div className="item" key={`thumb-${item.id}`}>
              <img src={item.image} alt={item.title} />
              <div className="content">
                <div className="title">{item.title}</div>
                <div className="des">{item.topic}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="arrows">
          <button
            id="prev"
            onClick={() => showSlider('prev')}
            disabled={!!animating}
          >
            &lt;
          </button>
          <button
            id="next"
            onClick={() => showSlider('next')}
            disabled={!!animating}
          >
            &gt;
          </button>
        </div>

        <div className="time"></div>
      </section>

      <section className="info-bar">
        {infoData.map((info, index) => (
          <React.Fragment key={index}>
            <div className="info-item">
              {index === 0 && (
                <GeoAlt className="info-icon location text-[25px]! hover:text-white! transition-colors cursor-pointer" />
              )}
              {index === 1 && (
                <Globe className="info-icon globe text-[25px]! hover:text-[#4ade80]! transition-colors cursor-pointer" />
              )}
              {index === 2 && (
                <PatchCheck className="info-icon checkmark text-[25px]! hover:text-white! transition-colors cursor-pointer" />
              )}
              <div className="info-text">
                <span className="info-title">{info.bold}</span>
                <span className="info-subtitle">{info.light}</span>
              </div>
            </div>
            {index < infoData.length - 1 && <div className="info-separator"></div>}
          </React.Fragment>
        ))}
      </section>
    </>
  );
};

export default Hero;
