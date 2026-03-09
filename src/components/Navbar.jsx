import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = ({ auth, setAuth }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', hash: '#home', label: 'Home', icon: 'home' },
    { path: '/', hash: '#skills', label: 'Skills', icon: 'code' },
    { path: '/', hash: '#education', label: 'Education', icon: 'graduation-cap' },
    { path: '/', hash: '#projects', label: 'Projects', icon: 'project-diagram' },
    { path: '/', hash: '#github', label: 'GitHub', icon: 'github' },
    { path: '/', hash: '#achievement', label: 'Achievements', icon: 'trophy' },
    { path: '/', hash: '#contact', label: 'Contact', icon: 'paper-plane' },
  ]

  const handleNavClick = (e, hash) => {
    e.preventDefault()
    
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/')
      // Wait for navigation and DOM update
      setTimeout(() => {
        scrollToSection(hash)
      }, 200)
    } else {
      scrollToSection(hash)
    }
    setMobileMenuOpen(false)
  }
  
  const scrollToSection = (hash) => {
    if (!hash) {
      // Scroll to top for home
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    
    // Try multiple times in case DOM isn't ready
    const tryScroll = (attempts = 0) => {
      const element = document.querySelector(hash)
      if (element) {
        const offset = 80 // Account for navbar height
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - offset
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      } else if (attempts < 5) {
        // Retry after a short delay
        setTimeout(() => tryScroll(attempts + 1), 100)
      }
    }
    
    tryScroll()
  }

  const isActive = (hash) => {
    if (!hash) return location.pathname === '/'
    return location.hash === hash || (location.pathname === '/' && !location.hash && hash === '#home')
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      } bg-dark/95 backdrop-blur-lg shadow-lg border-b border-white/10`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 text-2xl font-extrabold text-gradient">
            <img
              src="/assets/image/sameer.jpg"
              alt="Logo"
              className="w-12 h-12 rounded-full border-2 border-primary"
              loading="lazy"
            />
            <span className="hidden sm:inline">Shaik Mohammed Sameer</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <button
                key={link.hash || link.path}
                onClick={(e) => handleNavClick(e, link.hash)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 relative ${
                  isActive(link.hash)
                    ? 'text-accent'
                    : 'text-light hover:text-accent'
                }`}
              >
                <i className={`fas fa-${link.icon} mr-2`}></i>
                {link.label}
                {isActive(link.hash) && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-0.5 bg-accent rounded"></span>
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-light hover:text-accent transition-colors text-2xl"
            aria-label="Toggle menu"
          >
            <i className={`fas fa-${mobileMenuOpen ? 'times' : 'bars'}`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.hash || link.path}
                onClick={(e) => handleNavClick(e, link.hash)}
                className={`w-full text-left block px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  isActive(link.hash)
                    ? 'text-accent bg-white/10'
                    : 'text-light hover:text-accent hover:bg-white/5'
                }`}
              >
                <i className={`fas fa-${link.icon} mr-2`}></i>
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

