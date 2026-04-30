import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../sections/Hero'
import TechnicalProficiency from '../sections/TechnicalProficiency'
import AboutMe from '../sections/AboutMe'
import MyProjects from '../sections/MyProjects'
import ContactMe from '../sections/ContactMe'
import Footer from '../sections/Footer'
import Certificate from '../sections/Certificate'
import ScrollProgress from '../components/3d/ScrollProgress'
import Marquee from '../components/3d/Marquee'

const Portfolio = () => {
  return (
    <div className="bg-background text-ink antialiased overflow-x-clip">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Marquee />
      <AboutMe />
      <TechnicalProficiency />
      <MyProjects />
      <Certificate />
      <ContactMe />
      <Footer />
    </div>
  )
}

export default Portfolio
