import React, { useEffect, useState } from 'react'

const LandingSplash = ({ onDone }) => {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setHidden(true), 1200)
    const doneTimer = setTimeout(() => onDone?.(), 1550)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [onDone])

  return (
    <div
      className={
        `fixed inset-0 z-[9999] flex items-center justify-center ` +
        `bg-[#0b0d10] ` +
        `transition-opacity duration-500 ` +
        (hidden ? 'opacity-0 pointer-events-none' : 'opacity-100')
      }
      aria-label="Loading"
    >
      <div className="text-center px-6">
        <div className="mx-auto w-20 h-20 rounded-full overflow-hidden border border-white/15 bg-white/[0.04] shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
          <img
            src="/assets/image/sameer.jpg"
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <h1 className="mt-6 text-2xl md:text-3xl font-semibold tracking-tight text-white">
          Shaik Mohammed Sameer
        </h1>
        <p className="mt-2 text-white/60 text-sm md:text-base">
          Portfolio
        </p>

        <div className="mt-8 flex items-center justify-center">
          <div className="h-[2px] w-44 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-1/2 bg-white/40 animate-[landingBar_1.2s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingSplash
