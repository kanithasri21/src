import { motion } from 'framer-motion'
import { siteConfig } from '../../data/siteConfig'

interface SocialLinksProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const socialItems = [
  { key: 'linkedin', label: 'LinkedIn', icon: 'in' },
  { key: 'instagram', label: 'Instagram', icon: 'ig' },
  { key: 'youtube', label: 'YouTube', icon: 'yt' },
  { key: 'github', label: 'GitHub', icon: 'gh' },
] as const

const sizeMap = {
  sm: 'w-9 h-9 text-xs',
  md: 'w-11 h-11 text-sm',
  lg: 'w-14 h-14 text-base',
}

export function SocialLinks({ size = 'md', className = '' }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialItems.map((item, i) => {
        const url = siteConfig.social[item.key]
        if (!url) return null

        return (
          <motion.a
            key={item.key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className={`${sizeMap[size]} glass rounded-xl flex items-center justify-center font-bold text-accent-cyan hover:text-white hover:border-accent-cyan/50 focus-ring`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{
              scale: 1.15,
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            {item.icon}
          </motion.a>
        )
      })}
    </div>
  )
}
