import React, { useState, useEffect } from 'react'
import { fetchJson } from '../utils/api'

const ResumeSection = () => {
  const isDev = import.meta.env.DEV
  const baseUrl = (import.meta && import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : '/'
  // In development, use the public path, in production use the dist/assets path
  const defaultResumeUrl = isDev 
    ? `${baseUrl}assets/resumea1.pdf` 
    : `${baseUrl}assets/resumea1.pdf` // This will be copied to dist/assets during build
  const fallbackResumeUrl = isDev 
    ? `${baseUrl}assets/resumea.pdf` 
    : `${baseUrl}assets/resumea.pdf`

  const [resumeUrl, setResumeUrl] = useState(defaultResumeUrl)
  const [isHovered, setIsHovered] = useState(false)

  const normalizeUrl = (url) => {
    if (!url) return url
    if (url.startsWith('http://') || url.startsWith('https://')) return url
    if (url.startsWith('/')) return `${baseUrl}${url.slice(1)}`
    return `${baseUrl}${url}`
  }

  const ensureAccessibleUrl = async (primaryUrl) => {
    try {
      const res = await fetch(primaryUrl, { method: 'HEAD', cache: 'no-store' })
      if (res && res.ok) return primaryUrl
    } catch (e) {
      // ignore
    }

    const fallbackUrl = fallbackResumeUrl
    try {
      const res = await fetch(fallbackUrl, { method: 'HEAD', cache: 'no-store' })
      if (res && res.ok) return fallbackUrl
    } catch (e) {
      // ignore
    }

    return primaryUrl
  }

  useEffect(() => {
    loadResume()
  }, [])

  const loadResume = async () => {
    try {
      const data = await fetchJson('/api/public/resume')
      if (data && data.url) {
        const version = data.version ? `?v=${encodeURIComponent(data.version)}` : ''
        const normalized = normalizeUrl(data.url)
        const accessible = await ensureAccessibleUrl(normalized)
        setResumeUrl(accessible + version)
        return
      }
    } catch (e) {
      // Silently use default URL
    }

    const accessible = await ensureAccessibleUrl(defaultResumeUrl)
    setResumeUrl(accessible)
  }

  const downloadPdfFromUrl = async (url) => {
    const res = await fetch(url, { method: 'GET', cache: 'no-store' })
    if (!res.ok) throw new Error('Download failed')

    const contentType = (res.headers.get('content-type') || '').toLowerCase()
    if (!contentType.includes('pdf')) throw new Error('Not a PDF')

    const blob = await res.blob()
    if (!blob || blob.size < 1000) throw new Error('Empty file')

    const objectUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = objectUrl
    link.download = 'Shaik_Mohammed_Sameer_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    setTimeout(() => {
      URL.revokeObjectURL(objectUrl)
      document.body.removeChild(link)
    }, 250)
  }

  const handleDownload = async () => {
    try {
      // First try the current resume URL
      await downloadPdfFromUrl(resumeUrl)
    } catch (e) {
      console.log('Primary download failed, trying fallback...', e)
      try {
        // Try the default resume URL
        const fallback = await ensureAccessibleUrl(defaultResumeUrl)
        await downloadPdfFromUrl(fallback)
      } catch (e2) {
        console.log('Fallback download failed, opening in new tab...', e2)
        // As a last resort, try to open the URL in a new tab
        window.open(resumeUrl, '_blank')
      }
    }
  }

  return (
    <section id="resume" className="py-20 scroll-mt-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 className="section-title mb-16" data-aos="fade-up">
          My Resume
        </h2>

        <div className="max-w-4xl mx-auto">
          <div 
            className="resume-card glass-card relative group"
            data-aos="zoom-in"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent p-[2px]">
                <div className="h-full w-full rounded-2xl bg-dark"></div>
              </div>
            </div>

            <div className="relative p-8 md:p-12">
              {/* Icon with Animation */}
              <div className="flex justify-center mb-8">
                <div className={`resume-icon-wrapper ${isHovered ? 'animate-bounce-slow' : ''}`}>
                  <div className="resume-icon bg-gradient-to-br from-primary via-secondary to-accent rounded-full w-24 h-24 flex items-center justify-center shadow-2xl">
                    <i className="fas fa-file-pdf text-4xl text-white"></i>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-full opacity-20 blur-2xl animate-pulse-slow"></div>
                </div>
              </div>

              {/* Content */}
              <div className="text-center space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold text-gradient">
                  Download My Resume
                </h3>
                <p className="text-light/70 text-lg max-w-2xl mx-auto">
                  Get a detailed overview of my experience, skills, projects, and achievements. 
                  Available in PDF format for easy viewing and sharing.
                </p>

                {/* Animated Download Button */}
                <div className="pt-6">
                  <button
                    onClick={handleDownload}
                    className="resume-download-btn group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <i className="fas fa-download mr-3 text-xl group-hover:rotate-180 transition-transform duration-500"></i>
                      <span className="font-bold">Download Resume</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>

                {/* View Options */}
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-view-btn group"
                    onClick={(e) => {
                      // Ensure it opens even if file doesn't exist
                      e.preventDefault()
                      window.open(resumeUrl, '_blank')
                    }}
                  >
                    <i className="fas fa-eye mr-2 group-hover:scale-110 transition-transform"></i>
                    View in Browser
                  </a>
                  <button
                    onClick={handleDownload}
                    className="resume-view-btn group"
                  >
                    <i className="fas fa-download mr-2 group-hover:scale-110 transition-transform"></i>
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResumeSection

