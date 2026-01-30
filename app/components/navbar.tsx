'use client';

import React, { useState, useEffect } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';
import { navigationData, socialData } from '../data/navData';
import './navbar.css';

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
            <div className="menu" onClick={() => setIsMenuOpen(true)}>
              <IoMenu />
            </div>
          </div>
          <button className="contact-btn">contact now</button>
        </nav>
      </header>

      {/* closed container */}
      <div className={`nav-container ${isMenuOpen ? 'open' : ' '}`}>
        <div className="navbar">
          <div className="nav-left">
            <span className="label">local/</span>
            <span className="time">{formattedTime}</span>
          </div>
          <div className="nav-center" onClick={() => setIsMenuOpen(false)}>
            <div className="close-container">
              <div className="close">
                <IoClose />
              </div>
            </div>
          </div>
          <button className="contact-btn">contact now</button>
        </div>
        <ul className="list">
          {navigationData.map((list) => {
            return (
              <li key={list.name}>
                <a
                  href={list.href}
                  className={activeLink === list.name ? 'active' : ''}
                  onClick={() => setActiveLink(list.name)}
                >
                  {list.name}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="footer">
          <div className="rights">©2025 All RIGHTS Reserved by xolio</div>
          <div className="socials">
            <ul>
              {socialData.map((social) => {
                return (
                  <li>
                    <a href={social.href}>{social.name}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
