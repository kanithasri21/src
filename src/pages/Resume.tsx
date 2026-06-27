import { motion } from 'framer-motion'
import { siteConfig } from '../data/siteConfig'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'

export function Resume() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      <SectionHeading
        title="Resume"
        subtitle="Preview my experience and download a PDF copy"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-center mb-10"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          <a
            href={siteConfig.resumePath}
            download
            className="shimmer-btn inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-lg neon-glow-blue focus-ring"
          >
            Download Resume
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass rounded-2xl overflow-hidden border border-white/10"
      >
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <span className="text-muted text-sm">Resume Preview</span>
          <Button href={siteConfig.resumePath} variant="ghost" className="text-sm py-2 px-4">
            Open in new tab
          </Button>
        </div>
        <div className="aspect-[4/3] md:aspect-[16/10] bg-secondary">
          <iframe
            src={siteConfig.resumePath}
            title="Resume preview"
            className="w-full h-full min-h-[400px] md:min-h-[600px]"
          />
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-muted text-sm mt-6"
      >
        Replace <code className="text-accent-cyan">public/resume.pdf</code> with your own file
        or update <code className="text-accent-cyan">resumePath</code> in siteConfig.
      </motion.p>
    </div>
  )
}
