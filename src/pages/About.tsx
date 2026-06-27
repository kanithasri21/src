import { motion } from 'framer-motion'
import { siteConfig } from '../data/siteConfig'
import { SectionHeading } from '../components/ui/SectionHeading'
import { GlassCard } from '../components/ui/GlassCard'
import { useScrollReveal } from '../hooks/useScrollReveal'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export function About() {
  const { ref: summaryRef, inView: summaryInView } = useScrollReveal()
  const { ref: timelineRef, inView: timelineInView } = useScrollReveal()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      <SectionHeading title="About Me" subtitle="Get to know my journey and background" />

      <motion.div
        ref={summaryRef}
        variants={fadeUp}
        initial="hidden"
        animate={summaryInView ? 'visible' : 'hidden'}
        className="mb-16"
      >
        <GlassCard className="flex flex-col md:flex-row gap-8 items-center">
          <motion.div
            className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shrink-0"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={siteConfig.photo}
              alt={siteConfig.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 ring-2 ring-accent-cyan/30 rounded-2xl" />
          </motion.div>
          <div>
            <h3 className="font-display text-2xl font-bold text-white mb-4">
              {siteConfig.name}
            </h3>
            <p className="text-muted leading-relaxed">{siteConfig.about.summary}</p>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="mb-16"
      >
        <h3 className="font-display text-2xl font-bold text-white mb-6">Education</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {siteConfig.about.education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard>
                <h4 className="font-semibold text-white text-lg">{edu.degree}</h4>
                <p className="text-accent-cyan text-sm mt-1">{edu.institution}</p>
                <p className="text-muted text-sm mt-2">{edu.period}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div ref={timelineRef}>
        <h3 className="font-display text-2xl font-bold text-white mb-8">Experience</h3>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-blue via-accent-cyan to-accent-purple md:-translate-x-1/2" />

          {siteConfig.about.experience.map((exp, i) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={timelineInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`relative flex items-center mb-10 ${
                i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
              }`}
            >
              <div
                className={`w-full md:w-[calc(50%-2rem)] pl-12 md:pl-0 ${
                  i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'
                }`}
              >
                <GlassCard>
                  <span className="text-accent-cyan text-sm font-medium">{exp.period}</span>
                  <h4 className="font-display text-xl font-bold text-white mt-1">{exp.role}</h4>
                  <p className="text-accent-purple text-sm mb-3">{exp.company}</p>
                  <p className="text-muted text-sm leading-relaxed">{exp.description}</p>
                </GlassCard>
              </div>

              <motion.div
                className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-accent-blue border-4 border-primary md:-translate-x-1/2 z-10"
                initial={{ scale: 0 }}
                animate={timelineInView ? { scale: 1 } : {}}
                transition={{ delay: i * 0.15 + 0.2, type: 'spring' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
