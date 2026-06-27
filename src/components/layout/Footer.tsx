import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { siteConfig } from '../../data/siteConfig'
import { SocialLinks } from '../ui/SocialLinks'
import { BackToTop } from './BackToTop'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <motion.footer
      className="border-t border-white/10 bg-secondary/50 mt-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div>
            <h3 className="font-display text-xl font-bold gradient-text mb-2">
              {siteConfig.name}
            </h3>
            <p className="text-muted text-sm">{siteConfig.tagline}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {siteConfig.navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted hover:text-accent-cyan transition-colors text-sm focus-ring rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
              Connect
            </h4>
            <SocialLinks size="sm" />
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <BackToTop />
        </div>
      </div>
    </motion.footer>
  )
}
