import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { siteConfig } from '../data/siteConfig'
import { Button } from '../components/ui/Button'
import { SocialLinks } from '../components/ui/SocialLinks'
import { TypingText } from '../components/ui/TypingText'

const HeroScene = lazy(() =>
  import('../components/three/HeroScene').then((m) => ({ default: m.HeroScene })),
)
const ParticleBackground = lazy(() =>
  import('../components/particles/ParticleBackground').then((m) => ({
    default: m.ParticleBackground,
  })),
)

const nameLetters = siteConfig.name.split('')

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

const letterVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: 'spring' as const, stiffness: 200, damping: 20 },
  },
}

export function Home() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>

      <Suspense fallback={null}>
        <div className="absolute inset-0 z-10">
          <HeroScene />
        </div>
      </Suspense>

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-accent-cyan text-sm md:text-base font-medium tracking-widest uppercase mb-4"
        >
          Welcome to my portfolio
        </motion.p>

        <motion.h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 flex flex-wrap justify-center gap-x-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {nameLetters.map((letter, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              className={letter === ' ' ? 'w-4' : 'gradient-text'}
            >
              {letter === ' ' ? '' : letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-muted mb-2"
        >
          {siteConfig.title}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-lg md:text-xl mb-8 h-8"
        >
          <TypingText phrases={siteConfig.typingPhrases} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-muted max-w-2xl mx-auto mb-10 text-base md:text-lg"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          <Button to="/projects">View Projects</Button>
          <Button to="/resume" variant="secondary">Download Resume</Button>
          <Button to="/contact" variant="ghost">Contact Me</Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <SocialLinks size="lg" className="justify-center" />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-accent-cyan rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
