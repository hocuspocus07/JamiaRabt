import React from 'react'
import NavBar from '../components/NavBar'
import { AboutUs } from '../components/AboutUs'
import Footer from '../components/Footer'

function About() {
  return (
    <div className='flex'>
        <NavBar/>
        <div className='sm:flex-1 sm:ml-60'>
        <AboutUs/>
        <Footer/>
        </div>
    </div>
  )
}

export default About