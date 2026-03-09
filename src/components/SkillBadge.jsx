import React from 'react'

const iconMap = {
  C: 'fab fa-cuttlefish',
  Java: 'fab fa-java',
  'React.js': 'fab fa-react',
  'React 19': 'fab fa-react',
  'Node.js': 'fab fa-node-js',
  'Spring Boot': 'fas fa-server',
  'Spring Boot 3.2.5': 'fas fa-server',
  HTML: 'fab fa-html5',
  CSS: 'fab fa-css3-alt',
  JavaScript: 'fab fa-js',
  Vite: 'fab fa-vuejs',
  SQL: 'fas fa-database',
  MySQL: 'fas fa-database',
  AWS: 'fab fa-aws',
  Docker: 'fab fa-docker',
  Jenkins: 'fas fa-server',
  Git: 'fab fa-git-alt',
  Linux: 'fab fa-linux',
  Windows: 'fab fa-windows',
  'Power BI': 'fas fa-chart-bar',
  LaTeX: 'fas fa-file-alt',
  JWT: 'fas fa-key',
  RBAC: 'fas fa-shield-alt',
  Leaflet: 'fas fa-map',
  OpenStreetMap: 'fas fa-map-marked-alt',
  'AWS EC2': 'fab fa-aws',
}

const SkillBadge = ({ skill }) => {
  const icon = iconMap[skill.name] || 'fas fa-check'

  return (
    <span className="skill-badge inline-block">
      <i className={icon}></i> {skill.name}
    </span>
  )
}

export default SkillBadge

