import React from 'react';
import Navbar from './components/navbar';
import FooterComponent from './components/FooterComponent';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Stats from './components/Stats';
import BigName from './components/BigName';
import Experience from './components/Experience';
import Contact from './components/Contact';

const page = () => {
  return (
    <>
      <div className="main-content ml-4 mr-4"  >
        <Navbar />
        <main>
          <Hero />
          <Portfolio />
          <Services />
          <Stats />
          <Experience />
          <Contact />
          <BigName />
        </main>
        <FooterComponent />
      </div>
    </>
  );
};

export default page;