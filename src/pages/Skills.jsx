import React, { useEffect, useState } from 'react'
import { fetchJson } from '../utils/api'
import SkillBadge from '../components/SkillBadge'

const Skills = () => {
  const [skills, setSkills] = useState([
    // Programming Languages
    { name: 'C', category: 'Programming' },
    { name: 'Java', category: 'Programming' },
    // Web Development
    { name: 'HTML', category: 'Web' },
    { name: 'CSS', category: 'Web' },
    { name: 'JavaScript', category: 'Web' },
    { name: 'React.js', category: 'Web' },
    { name: 'Vite', category: 'Web' },
    { name: 'Spring Boot', category: 'Web' },
    { name: 'Node.js', category: 'Web' },
    // Cloud & DevOps
    { name: 'AWS', category: 'DevOps' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Jenkins', category: 'DevOps' },
    { name: 'Git', category: 'DevOps' },
    // Database
    { name: 'SQL', category: 'Database' },
    { name: 'MySQL', category: 'Database' },
    // Operating Systems
    { name: 'Linux', category: 'OS' },
    { name: 'Windows', category: 'OS' },
    // Tools
    { name: 'Power BI', category: 'Tools' },
    { name: 'LaTeX', category: 'Tools' },
  ])

  useEffect(() => {
    loadSkills()
  }, [])

  const loadSkills = async () => {
    try {
      const data = await fetchJson('/api/public/skills')
      if (data && data.skills && data.skills.length > 0) {
        setSkills(data.skills)
      }
    } catch (e) {
      // Silently use fallback data
    }
  }

  const programming = skills.filter((s) => s.category?.toLowerCase() === 'programming')
  const web = skills.filter((s) => s.category?.toLowerCase() === 'web')
  const devops = skills.filter((s) => s.category?.toLowerCase() === 'devops')
  const database = skills.filter((s) => s.category?.toLowerCase() === 'database')
  const os = skills.filter((s) => s.category?.toLowerCase() === 'os')
  const tools = skills.filter((s) => s.category?.toLowerCase() === 'tools')
  const other = skills.filter((s) => {
    const cat = s.category?.toLowerCase()
    return cat !== 'programming' && cat !== 'web' && cat !== 'devops' && cat !== 'database' && cat !== 'os' && cat !== 'tools'
  })

  return (
    <section id="skills" className="py-20 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title" data-aos="fade-up">
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programming.length > 0 && (
            <div className="glass-card" data-aos="zoom-in">
              <h4 className="text-center text-xl font-bold text-light mb-6">
                Programming Languages
              </h4>
              <div className="flex flex-wrap justify-center">
                {programming.map((skill, idx) => (
                  <SkillBadge key={idx} skill={skill} />
                ))}
              </div>
            </div>
          )}

          {web.length > 0 && (
            <div className="glass-card" data-aos="zoom-in" data-aos-delay="100">
              <h4 className="text-center text-xl font-bold text-light mb-6">
                Web Development
              </h4>
              <div className="flex flex-wrap justify-center">
                {web.map((skill, idx) => (
                  <SkillBadge key={idx} skill={skill} />
                ))}
              </div>
            </div>
          )}

          {devops.length > 0 && (
            <div className="glass-card" data-aos="zoom-in" data-aos-delay="200">
              <h4 className="text-center text-xl font-bold text-light mb-6">
                Cloud & DevOps
              </h4>
              <div className="flex flex-wrap justify-center">
                {devops.map((skill, idx) => (
                  <SkillBadge key={idx} skill={skill} />
                ))}
              </div>
            </div>
          )}

          {database.length > 0 && (
            <div className="glass-card" data-aos="zoom-in" data-aos-delay="100">
              <h4 className="text-center text-xl font-bold text-light mb-6">
                Database
              </h4>
              <div className="flex flex-wrap justify-center">
                {database.map((skill, idx) => (
                  <SkillBadge key={idx} skill={skill} />
                ))}
              </div>
            </div>
          )}

          {os.length > 0 && (
            <div className="glass-card" data-aos="zoom-in" data-aos-delay="200">
              <h4 className="text-center text-xl font-bold text-light mb-6">
                Operating Systems
              </h4>
              <div className="flex flex-wrap justify-center">
                {os.map((skill, idx) => (
                  <SkillBadge key={idx} skill={skill} />
                ))}
              </div>
            </div>
          )}

          {tools.length > 0 && (
            <div className="glass-card" data-aos="zoom-in" data-aos-delay="100">
              <h4 className="text-center text-xl font-bold text-light mb-6">
                Tools & Platforms
              </h4>
              <div className="flex flex-wrap justify-center">
                {tools.map((skill, idx) => (
                  <SkillBadge key={idx} skill={skill} />
                ))}
              </div>
            </div>
          )}

          {other.length > 0 && (
            <div className="glass-card" data-aos="zoom-in" data-aos-delay="200">
              <h4 className="text-center text-xl font-bold text-light mb-6">Others</h4>
              <div className="flex flex-wrap justify-center">
                {other.map((skill, idx) => (
                  <SkillBadge key={idx} skill={skill} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Education Section */}
        <section id="education" className="mt-20 scroll-mt-20">
          <h2 className="section-title" data-aos="fade-up">
            Education
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="glass-card" data-aos="zoom-in">
              <div className="flex items-center">
                <img
                  src="/assets/image/klu.JPG"
                  alt="KL University"
                  className="w-20 h-20 rounded-full mr-4 object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/assets/image/placeholder.svg'
                  }}
                />
                <div>
                  <h4 className="font-bold text-xl text-light">KL University, Vijayawada</h4>
                  <p className="text-light/80">B.Tech in Computer Science and Engineering</p>
                  <p className="text-light/70 text-sm">August 2023 - Present | CGPA: 9.16/10</p>
                </div>
              </div>
            </div>

            <div className="glass-card" data-aos="zoom-in" data-aos-delay="100">
              <div className="flex items-center">
                <img
                  src="/assets/image/srichaitanya.jpeg"
                  alt="Sri Chaitanya"
                  className="w-20 h-20 rounded-full mr-4 object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/assets/image/placeholder.svg'
                  }}
                />
                <div>
                  <h4 className="font-bold text-xl text-light">Sri Chaitanya College</h4>
                  <p className="text-light/80">Intermediate, MPC</p>
                  <p className="text-light/70 text-sm">June 2021 - May 2023 | 84%</p>
                </div>
              </div>
            </div>

            <div className="glass-card" data-aos="zoom-in" data-aos-delay="200">
              <div className="flex items-center">
                <img
                  src="/assets/image/placeholder.svg"
                  alt="DE PAUL High School"
                  className="w-20 h-20 rounded-full mr-4 object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/assets/image/placeholder.svg'
                  }}
                />
                <div>
                  <h4 className="font-bold text-xl text-light">DE PAUL High School</h4>
                  <p className="text-light/80">Secondary School Certificate (SSC)</p>
                  <p className="text-light/70 text-sm">June 2020 - May 2021</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievement" className="mt-20 scroll-mt-20">
          <h2 className="section-title" data-aos="fade-up">
            Achievements & Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Aviatrix Certified Engineer (ACE) Multicloud Network Associate',
                issued: '2025',
                credential: 'ACE-MNA-2025',
                badges: ['Networking', 'Cloud'],
              },
              {
                title: 'Oracle Cloud Infrastructure 2025 Certified Developer Professional',
                issued: '2025',
                credential: 'OCI-CDP-2025',
                badges: ['Cloud', 'Development'],
              },
              {
                title: 'Oracle Cloud Infrastructure 2025 Certified Architect Associate',
                issued: '2025',
                credential: 'OCI-CAA-2025',
                badges: ['Cloud', 'Architecture'],
              },
              {
                title: 'Salesforce AI Associate Certification',
                issued: '2024',
                credential: 'SF-AI-ASSOC-2024',
                badges: ['AI', 'Salesforce'],
              },
              {
                title: 'Cambridge English Written Lingual Skill Exam',
                issued: '2023',
                credential: 'C2 Proficiency',
                badges: ['Language', 'English'],
              },
            ].map((achievement, idx) => (
              <div key={idx} className="glass-card" data-aos="zoom-in" data-aos-delay={idx * 100}>
                <h5 className="font-bold text-lg text-light mb-3">{achievement.title}</h5>
                <p className="text-light/70 text-sm mb-2">Issued: {achievement.issued}</p>
                <p className="text-light/70 text-sm mb-3">Credential ID: {achievement.credential}</p>
                <div className="flex flex-wrap gap-2">
                  {achievement.badges.map((badge, bidx) => (
                    <span
                      key={bidx}
                      className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}

export default Skills

