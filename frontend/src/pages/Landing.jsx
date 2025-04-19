import React from 'react'
import NavBar from '../components/NavBar.jsx'
import Hero from '../components/Hero.jsx';
import Footer from '../components/Footer.jsx';

function Landing() {
  return (
    <>
      <div className='flex'>
        <NavBar />
        <div className='sm:flex-1 sm:ml-60'>
          <Hero />
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Landing;