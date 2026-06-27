import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps {
  children: React.ReactNode
  to?: string
  href?: string
  onClick?: () => void
  variant?: ButtonVariant
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit'
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-accent-blue to-accent-cyan text-white border-transparent neon-glow-blue',
  secondary:
    'glass text-white border-white/20 hover:border-accent-purple/50 neon-glow-cyan',
  ghost: 'bg-transparent text-muted hover:text-white border-white/10 hover:border-white/30',
}

export function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const baseClass = `inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border font-medium transition-colors focus-ring ${variants[variant]} ${className}`

  const motionProps = {
    whileHover: disabled ? undefined : { scale: 1.05 },
    whileTap: disabled ? undefined : { scale: 0.98 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
  }

  if (to) {
    return (
      <motion.div {...motionProps}>
        <Link to={to} className={baseClass}>
          {children}
        </Link>
      </motion.div>
    )
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        {...motionProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}
