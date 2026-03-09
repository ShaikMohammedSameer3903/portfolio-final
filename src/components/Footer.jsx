import React, { useEffect, useState } from 'react'
import { fetchJson } from '../utils/api'

const Footer = () => {
  const [profile, setProfile] = useState({
    about: 'I am Shaik Mohammed Sameer, a B.Tech CSE student at KL University, skilled in web development and programming. I enjoy building scalable solutions using modern technologies like React.js, Spring Boot, and Firebase. I possess strong logical and analytical skills, with experience leading a team of 3 in the Farmer-Friendly Platform project, demonstrating teamwork and communication.',
    linkedin: 'https://linkedin.com/in/shaik-mohammed-sameer-6802bb2a0/',
    github: 'https://github.com/ShaikMohammedSameer3903',
  })

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const data = await fetchJson('/api/public/profile')
      if (data && data.profile) {
        setProfile(data.profile)
      }
    } catch (e) {
      // Silently use fallback data - no console logs
    }
  }

  return (
    <footer className="bg-dark/95 backdrop-blur-lg border-t border-white/10 py-12 mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="lg:col-span-2">
            <h4 className="text-2xl font-bold text-gradient mb-4">About Me</h4>
            <p className="text-light/80 leading-relaxed mb-4">{profile.about}</p>
            <h5 className="text-lg font-semibold text-light mb-2">Languages</h5>
            <p className="text-light/70">
              Urdu (Mother Tongue), Telugu (Native), English (Fluent), Hindi (Fluent)
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-xl font-bold text-gradient mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <a href="/#home" className="text-light/70 hover:text-accent transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/#skills" className="text-light/70 hover:text-accent transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="/#education" className="text-light/70 hover:text-accent transition-colors">
                  Education
                </a>
              </li>
              <li>
                <a href="/#projects" className="text-light/70 hover:text-accent transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="/#achievement" className="text-light/70 hover:text-accent transition-colors">
                  Achievements
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-light/70 hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h5 className="text-xl font-bold text-gradient mb-4">Connect with Me</h5>
            <div className="flex space-x-4">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-light hover:text-secondary transition-all duration-300 hover:scale-125"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-light hover:text-secondary transition-all duration-300 hover:scale-125"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-light/60 text-sm">
            © 2025 Shaik Mohammed Sameer | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

