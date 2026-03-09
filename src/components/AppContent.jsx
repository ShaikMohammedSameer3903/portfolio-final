import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Projects from '../pages/Projects'
import Skills from '../pages/Skills'
import Contact from '../pages/Contact'
import ResumeSection from './ResumeSection'
import GitHubSection from './GitHubSection'

const AppContent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <Skills />
            <Projects />
            <GitHubSection />
            <Contact />
            <ResumeSection />
          </>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default AppContent

