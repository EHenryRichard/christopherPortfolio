import React from 'react';
import Navbar from './components/navbar';
import FooterComponent from './components/FooterComponent';
import Hero from './components/Hero';

const page = () => {
  return (
    <>
      <Navbar />
      {/* style={{ overflow: 'hidden', height: '100vh' }} */}
      <main>
        <Hero />
      </main>
      <FooterComponent />
    </>
  );
};

export default page;