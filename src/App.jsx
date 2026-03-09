import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AppContent from './components/AppContent'
import LandingSplash from './components/LandingSplash'

function App() {
  const [auth, setAuth] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  // Initialize AOS
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({ duration: 1000, once: false, easing: 'ease-in-out' });
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowLanding(false), 1600)
    return () => clearTimeout(timer)
  }, [])

  // Handle hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      {showLanding && <LandingSplash onDone={() => setShowLanding(false)} />}
      <div className="min-h-screen flex flex-col">
        <Navbar auth={auth} setAuth={setAuth} />
        <main className="flex-grow pt-20">
          <AppContent />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

