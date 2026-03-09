import React, { useEffect, useState } from 'react'
import { fetchJson } from '../utils/api'

const Home = () => {
  const [profile, setProfile] = useState({
    name: 'Shaik Mohammed Sameer',
    headline: 'B.Tech CSE | KL University',
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

  useEffect(() => {
    // Initialize particles.js
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js'
    script.onload = () => {
      if (window.particlesJS) {
        window.particlesJS('particles-js', {
          particles: {
            number: { value: window.innerWidth < 768 ? 40 : 80, density: { enable: true, value_area: 800 } },
            color: { value: ['#2ecc71', '#3498db', '#f1c40f'] },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#2ecc71', opacity: 0.2, width: 1 },
            move: { enable: true, speed: 2, direction: 'none', random: true, straight: false, out_mode: 'out' },
          },
          interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } },
          },
          retina_detect: true,
        })
      }
    }
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden py-20 scroll-mt-20">
      <div id="particles-js" className="absolute inset-0 -z-10"></div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent"></div>
      <div className="hero-blob -z-10 w-[520px] h-[520px] left-[-200px] top-[-220px] bg-white/[0.09]"></div>
      <div className="hero-blob -z-10 w-[560px] h-[560px] right-[-240px] top-[10%] bg-white/[0.06] [animation-delay:1.2s]"></div>
      <div className="hero-blob -z-10 w-[520px] h-[520px] left-[20%] bottom-[-260px] bg-white/[0.05] [animation-delay:2.2s]"></div>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
          <div className="lg:col-span-7 text-center lg:text-left" data-aos="fade-up">
            <p className="text-white/60 text-sm tracking-[0.18em] uppercase">
              Full-Stack Developer
            </p>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
              {profile.name}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/75 max-w-2xl mx-auto lg:mx-0">
              Full-Stack Developer | React | Spring Boot | Cloud Enthusiast
            </p>
            <p className="mt-3 text-white/55 max-w-2xl mx-auto lg:mx-0">
              Building fast, accessible web experiences with clean architecture and modern tooling.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="150">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="modern-btn-primary"
              >
                <i className="fas fa-code mr-2"></i>View Projects
              </a>
              <a
                href="#resume"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#resume')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="modern-btn-outline"
              >
                <i className="fas fa-download mr-2"></i>Download Resume
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="modern-btn-outline"
              >
                <i className="fas fa-paper-plane mr-2"></i>Contact Me
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center lg:justify-start gap-5" data-aos="fade-up" data-aos-delay="250">
              <a
                href="https://linkedin.com/in/shaik-mohammed-sameer-6802bb2a0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in text-2xl"></i>
              </a>
              <a
                href="https://github.com/ShaikMohammedSameer3903"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <i className="fab fa-github text-2xl"></i>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end" data-aos="zoom-in" data-aos-delay="150">
            <div className="relative">
              <div className="absolute -inset-8 rounded-full bg-white/[0.06] blur-2xl"></div>
              <div className="relative w-64 md:w-80 aspect-square rounded-full overflow-hidden border border-white/15 bg-white/[0.04] shadow-[0_25px_60px_rgba(0,0,0,0.55)]">
                <img
                  src="/assets/image/sameer.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home

