import { useMemo } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { useEffect, useState } from 'react'
import type { ISourceOptions } from '@tsparticles/engine'

export function ParticleBackground() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      particles: {
        number: { value: isMobile ? 40 : 80, density: { enable: true, width: 800, height: 800 } },
        color: { value: ['#3B82F6', '#06B6D4', '#8B5CF6'] },
        shape: { type: 'circle' },
        opacity: { value: { min: 0.2, max: 0.6 } },
        size: { value: { min: 1, max: 3 } },
        links: {
          enable: true,
          distance: 150,
          color: '#3B82F6',
          opacity: 0.15,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.8,
          direction: 'none',
          random: true,
          outModes: { default: 'out' },
        },
      },
      interactivity: {
        detectsOn: 'window',
        events: {
          onHover: { enable: true, mode: 'grab' },
          resize: { enable: true },
        },
        modes: {
          grab: { distance: 180, links: { opacity: 0.4 } },
        },
      },
      detectRetina: true,
    }),
    [isMobile],
  )

  if (!ready) return null

  return (
    <div className="absolute inset-0 z-0">
      <Particles id="tsparticles" options={options} className="w-full h-full" />
    </div>
  )
}
