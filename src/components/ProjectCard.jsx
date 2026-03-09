import React from 'react'

const ProjectCard = ({ project, index = 0 }) => {
  const imgUrl = project.imageUrl || '/assets/image/placeholder.svg'
  const tech = Array.isArray(project.tech) ? project.tech : []

  return (
    <div
      className="col-span-12 md:col-span-6 lg:col-span-4"
      data-aos="zoom-in"
      data-aos-delay={index * 100}
    >
      <div className="glass-card h-full flex flex-col">
        <img
          src={imgUrl}
          alt={project.title || 'Project'}
          className="w-full h-48 object-cover rounded-t-lg mb-4"
          loading="lazy"
          onError={(e) => {
            e.target.src = '/assets/image/placeholder.svg'
          }}
        />
        <h5 className="text-xl font-bold text-light mb-3">{project.title || ''}</h5>
        {project.period && (
          <p className="text-sm text-accent mb-2 font-semibold">{project.period}</p>
        )}
        <p className="text-light/80 mb-4 flex-grow">{project.description || ''}</p>
        
        {tech.length > 0 && (
          <>
            <p className="font-semibold text-light mb-2">Tech:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {tech.map((t, idx) => (
                <span key={idx} className="tech-badge">
                  {t}
                </span>
              ))}
            </div>
          </>
        )}

        {(project.githubUrl || project.demoUrl || project.liveUrl) && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modern-btn text-sm py-2 px-4"
              >
                <i className="fab fa-github mr-2"></i>GitHub
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modern-btn-outline text-sm py-2 px-4"
              >
                <i className="fas fa-play mr-2"></i>Demo Video
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modern-btn-outline text-sm py-2 px-4"
              >
                <i className="fas fa-external-link-alt mr-2"></i>Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectCard

