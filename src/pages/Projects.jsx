import React, { useEffect, useState } from 'react'
import { fetchJson } from '../utils/api'
import ProjectCard from '../components/ProjectCard'

const Projects = () => {
  const defaultProjects = [
    {
      title: 'APNA-RIDE - Professional Ride Sharing Platform',
      description:
        'As a Full Stack Developer and Team Lead, I architected and developed a comprehensive ride-sharing platform with real-time tracking and secure payment integration. The application features a responsive React.js frontend and a robust Spring Boot backend with JWT authentication. Key achievements include implementing real-time location tracking, optimizing database queries for better performance, and leading a team of 3 developers to deliver the project on schedule. The platform serves 1000+ users with 99.9% uptime on AWS infrastructure.',
      tech: ['React.js', 'Spring Boot', 'JWT Authentication', 'RESTful APIs', 'MySQL', 'AWS (EC2, S3, RDS)', 'Docker', 'WebSocket', 'Leaflet Maps', 'Redux'],
      githubUrl: 'https://github.com/ShaikMohammedSameer3903/APNA-RIDE.git',
      demoUrl: 'https://www.linkedin.com/posts/shaik-mohammed-sameer-6802bb2a0_react-springboot-fullstack-activity-7394019165361197057-IjOT?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEio4QABzGt4nn_N-Qx74mnuO0sJ2stg2wo',
      imageUrl: '/assets/image/apnaride.jpg',
      period: 'March 2024 - Present',
      role: 'Full Stack Developer & Team Lead',
      responsibilities: [
        'Led a team of 3 developers in implementing core features',
        'Designed and implemented the real-time tracking system using WebSocket',
        'Optimized database queries resulting in 40% faster response times',
        'Implemented secure payment integration with Stripe',
        'Set up CI/CD pipeline using GitHub Actions and Docker'
      ]
    },
    {
      title: 'Online Shopping Application',
      description:
        'Built a full e-commerce platform using React.js and Spring Boot. Implemented authentication, product catalog, cart, payments, and Admin Dashboard. Setup CI/CD pipelines using Jenkins, Docker, and AWS EC2. Designed a responsive UI with reusable components.',
      tech: ['React.js', 'Spring Boot', 'Jenkins', 'Docker', 'AWS EC2'],
      githubUrl: '',
      liveUrl: '',
      imageUrl: '/assets/image/shopping.jpg',
      period: 'February 2025 - March 2025',
    },
    {
      title: 'BITFLOW - A Food Delivery Platform',
      description:
        'A comprehensive, scalable microservices-based food delivery platform built with modern best practices. Designed the system to support multi-role users (Customer, Restaurant, Delivery, Admin) with real-time order workflows, secure payments, and AI-driven features such as personalized recommendations, route optimization, and chatbot-based support.',
      tech: ['React.js', 'Redux Toolkit', 'Tailwind CSS', 'Spring Boot (Java 17)', 'Spring Cloud Gateway (API Gateway)', 'JWT Authentication', 'REST APIs', 'PostgreSQL', 'Redis', 'Stripe Payments', 'Docker & Docker Compose', 'Python FastAPI (AI Service)', 'OpenAI API (Chatbot)', 'ML Recommendations & Route Optimization'],
      githubUrl: 'https://github.com/ShaikMohammedSameer3903/BITFLOW-A-Food-Delivery-Platform.git',
      demoUrl: 'https://www.linkedin.com/posts/shaik-mohammed-sameer-6802bb2a0_react-springboot-fullstack-activity-7394019165361197057-IjOT?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEio4QABzGt4nn_N-Qx74mnuO0sJ2stg2wo',
      liveUrl: '',
      imageUrl: '/assets/image/bitflow.jpg',
      period: 'June 2024 - August 2024',
      role: 'Full Stack Developer',
      responsibilities: [
        'Implemented microservices modules (User, Restaurant, Delivery, Payment) with an API Gateway',
        'Built multi-role React interfaces with Redux Toolkit and responsive UI',
        'Integrated JWT-based authentication and role-based access control',
        'Integrated Stripe payment flow and order lifecycle management',
        'Connected an AI service (FastAPI) for recommendations, route optimization, and chatbot support',
        'Containerized services using Docker Compose for local and deployment-ready setup'
      ],
    },
    {
      title: 'Crop Master - Agriculture Management System',
      description:
        'Agriculture management system to streamline farm operations. Includes user authentication, farmland & crop management, resource tracking (machinery/chemicals/water), weather insights, disease reporting, task scheduling, and analytics. Designed to be mobile responsive for on-the-go farm management.',
      tech: ['React.js', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'MySQL', 'REST APIs'],
      githubUrl: 'https://github.com/ShaikMohammedSameer3903/FARMER-CROPMASTER1.git',
      liveUrl: '',
      imageUrl: '',
      period: '',
    },
  ]

  const [projects, setProjects] = useState(defaultProjects)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const data = await fetchJson('/api/public/projects')
      if (data && data.projects && data.projects.length > 0) {
        const normalize = (s) => (typeof s === 'string' ? s.trim().toLowerCase() : '')

        const isPlaceholderProject = (p) => {
          const tech = Array.isArray(p?.tech) ? p.tech : []
          const desc = normalize(p?.description)
          const genericTech = tech.length === 1 && normalize(tech[0]) === 'web application'
          const genericDesc = desc.includes('see the github repository')
          return genericTech || genericDesc
        }

        const findDefault = (p) => {
          const byGithub = defaultProjects.find(
            (d) => d.githubUrl && p.githubUrl && normalize(d.githubUrl) === normalize(p.githubUrl)
          )
          if (byGithub) return byGithub
          return defaultProjects.find((d) => normalize(d.title) === normalize(p.title))
        }

        const mergedFromApi = data.projects.map((p) => {
          const fallback = findDefault(p)
          if (fallback && isPlaceholderProject(p)) return fallback
          return p
        })

        const apiKeys = new Set(
          mergedFromApi.map((p) => (p.githubUrl ? normalize(p.githubUrl) : normalize(p.title)))
        )
        const missingDefaults = defaultProjects.filter((d) => {
          const key = d.githubUrl ? normalize(d.githubUrl) : normalize(d.title)
          return !apiKeys.has(key)
        })

        setProjects([...mergedFromApi, ...missingDefaults])
      }
    } catch (e) {
      // Silently use fallback data
    }
  }

  return (
    <section id="projects" className="py-20 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title" data-aos="fade-up">
          Projects
        </h2>
        <div className="grid grid-cols-12 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

