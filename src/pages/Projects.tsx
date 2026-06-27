import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig, type ProjectCategory } from '../data/siteConfig'
import { SectionHeading } from '../components/ui/SectionHeading'
import { useTilt } from '../hooks/useTilt'

type Filter = 'All' | ProjectCategory

function ProjectCard({ project, index }: { project: typeof siteConfig.projects[0]; index: number }) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt(6)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="animated-border rounded-2xl transition-transform duration-200"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="glass rounded-2xl overflow-hidden bg-secondary/80">
          <div className="relative h-48 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
            <span className="absolute top-3 right-3 px-3 py-1 text-xs font-medium glass rounded-full text-accent-cyan">
              {project.category}
            </span>
          </div>

          <div className="p-6">
            <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors">
              {project.title}
            </h3>
            <p className="text-muted text-sm leading-relaxed mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-1 text-xs glass rounded-lg text-accent-blue"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-accent-cyan transition-colors focus-ring rounded"
              >
                GitHub →
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-accent-purple transition-colors focus-ring rounded"
              >
                Live Demo →
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>('All')

  const filtered =
    filter === 'All'
      ? siteConfig.projects
      : siteConfig.projects.filter((p) => p.category === filter)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      <SectionHeading
        title="Featured Projects"
        subtitle="I am a passionate B.Tech student interested in software development and learning new technologies. I enjoy coding and continuously improving my technical skills to build innovative solutions.
"
      />

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {siteConfig.projectFilters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`relative px-5 py-2 rounded-xl text-sm font-medium transition-colors focus-ring ${
              filter === f ? 'text-white' : 'text-muted hover:text-white'
            }`}
          >
            {filter === f && (
              <motion.span
                layoutId="project-filter"
                className="absolute inset-0 glass bg-white/10 rounded-xl border border-accent-blue/30"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{f}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
