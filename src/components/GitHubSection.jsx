import React from 'react'

const GitHubSection = () => {
  const username = 'ShaikMohammedSameer3903'

  const profileUrl = `https://github.com/${username}`
  const contributionsUrl = `https://ghchart.rshah.org/${username}`
  const statsUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&hide_border=true&theme=transparent`
  const streakUrl = `https://github-readme-streak-stats.herokuapp.com?user=${username}&hide_border=true&theme=transparent`
  const topLangsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&hide_border=true&theme=transparent`

  return (
    <section id="github" className="py-20 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title" data-aos="fade-up">
          GitHub Activity
        </h2>

        <div className="max-w-5xl mx-auto space-y-6">
          <div className="glass-card" data-aos="zoom-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white tracking-tight">@{username}</h3>
                <p className="text-white/70 mt-1">
                  Recent contribution activity and statistics.
                </p>
              </div>
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modern-btn w-full sm:w-auto text-center"
              >
                <i className="fab fa-github mr-2"></i>
                View GitHub Profile
              </a>
            </div>
          </div>

          <div className="glass-card" data-aos="zoom-in" data-aos-delay="100">
            <h4 className="text-lg font-semibold text-white mb-4">Contribution Graph</h4>
            <div className="overflow-x-auto">
              <img
                src={contributionsUrl}
                alt="GitHub contribution graph"
                className="w-full min-w-[720px] opacity-90"
                loading="lazy"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card" data-aos="zoom-in" data-aos-delay="200">
              <h4 className="text-lg font-semibold text-white mb-4">GitHub Stats</h4>
              <img
                src={statsUrl}
                alt="GitHub statistics"
                className="w-full opacity-95"
                loading="lazy"
              />
            </div>

            <div className="glass-card" data-aos="zoom-in" data-aos-delay="300">
              <h4 className="text-lg font-semibold text-white mb-4">Streak</h4>
              <img
                src={streakUrl}
                alt="GitHub contribution streak"
                className="w-full opacity-95"
                loading="lazy"
              />
            </div>

            <div className="glass-card lg:col-span-2" data-aos="zoom-in" data-aos-delay="400">
              <h4 className="text-lg font-semibold text-white mb-4">Top Languages</h4>
              <img
                src={topLangsUrl}
                alt="Top languages"
                className="w-full opacity-95"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GitHubSection
