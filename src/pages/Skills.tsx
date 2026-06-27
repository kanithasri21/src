import { motion } from 'framer-motion'
import { siteConfig } from '../data/siteConfig'
import { SectionHeading } from '../components/ui/SectionHeading'
import { GlassCard } from '../components/ui/GlassCard'
import { useTilt } from '../hooks/useTilt'

interface SkillMeterProps {
  name: string
  level: number
  delay: number
}

function SkillMeter({ name, level, delay }: SkillMeterProps) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt(8)
  const gradientId = `skillGradient-${name.replace(/\s+/g, '-')}`
  const circumference = 2 * Math.PI * 36
  const offset = circumference - (level / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={ref}
      className="transition-transform duration-200 ease-out"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <GlassCard className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="6"
            />
            <motion.circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset: offset }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
            {level}%
          </span>
        </div>
        <h4 className="font-semibold text-white">{name}</h4>
        <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-blue to-accent-cyan rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay }}
          />
        </div>
      </GlassCard>
    </motion.div>
  )
}

const categories = [
  { key: 'frontend', label: 'Frontend Skills', icon: '⚛' },
  { key: 'backend', label: 'Backend Skills', icon: '⬡' },
  { key: 'database', label: 'Database Skills', icon: '◉' },
  { key: 'tools', label: 'Tools', icon: '⚙' },
] as const

export function Skills() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      <SectionHeading
        title="Skills & Expertise"
        subtitle="Technologies I work with daily to build exceptional products"
      />

      {categories.map((cat, catIndex) => {
        const skills = siteConfig.skills[cat.key]
        return (
          <motion.section
            key={cat.key}
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex items-center gap-3 mb-8"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: catIndex * 0.5 }}
            >
              <span className="text-2xl text-accent-cyan">{cat.icon}</span>
              <h3 className="font-display text-2xl font-bold text-white">{cat.label}</h3>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {skills.map((skill, i) => (
                <SkillMeter
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={i * 0.08}
                />
              ))}
            </div>
          </motion.section>
        )
      })}
    </div>
  )
}
