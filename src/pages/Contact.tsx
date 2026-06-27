import { useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig } from '../data/siteConfig'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import { SocialLinks } from '../components/ui/SocialLinks'
import { GlassCard } from '../components/ui/GlassCard'

interface FormData {
  from_name: string
  from_email: string
  subject: string
  message: string
}

interface FormErrors {
  from_name?: string
  from_email?: string
  subject?: string
  message?: string
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.from_name.trim()) errors.from_name = 'Name is required'
  if (!data.from_email.trim()) errors.from_email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.from_email))
    errors.from_email = 'Invalid email address'
  if (!data.subject.trim()) errors.subject = 'Subject is required'
  if (!data.message.trim()) errors.message = 'Message is required'
  return errors
}

export function Contact() {
  const [form, setForm] = useState<FormData>({
    from_name: 'kanitha sri.M',
    from_email: 'kanithasri05@gmail.com',
    subject: 'intership inquiry',
    message: 'Hello,Thank you for visiting my portfolio. Feel free to contact me for internship opportunities or any queries.',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const validationErrors = validate(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setStatus('loading')

    const { serviceId, templateId, publicKey } = siteConfig.emailjs
    if (
      serviceId.startsWith('YOUR_') ||
      templateId.startsWith('YOUR_') ||
      publicKey.startsWith('YOUR_')
    ) {
      setStatus('error')
      return
    }

    try {
      await emailjs.send(serviceId, templateId, { ...form }, publicKey)
      setStatus('success')
      setForm({ from_name: '', from_email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const fields: { key: keyof FormData; label: string; type: string }[] = [
    { key: 'from_name', label: 'Full Name', type: 'text' },
    { key: 'from_email', label: 'Email', type: 'email' },
    { key: 'subject', label: 'Subject', type: 'text' },
    { key: 'message', label: 'Message', type: 'textarea' },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      <SectionHeading
        title="Get In Touch"
        subtitle="Have a project in mind or want to collaborate? Send me a message."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GlassCard hover={false}>
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {fields.map((field, i) => (
              <motion.div
                key={field.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <label
                  htmlFor={field.key}
                  className="block text-sm font-medium text-muted mb-2"
                >
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.key}
                    rows={5}
                    value={form[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className={`w-full glass rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 transition-all resize-none ${
                      errors[field.key] ? 'border-red-500/50' : ''
                    }`}
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                  />
                ) : (
                  <input
                    id={field.key}
                    type={field.type}
                    value={form[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className={`w-full glass rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 transition-all ${
                      errors[field.key] ? 'border-red-500/50' : ''
                    }`}
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                  />
                )}
                {errors[field.key] && (
                  <p className="text-red-400 text-sm mt-1">{errors[field.key]}</p>
                )}
              </motion.div>
            ))}

            <div className="flex items-center gap-4">
              <Button type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  'Send Message'
                )}
              </Button>
            </div>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="inline-block mr-2"
                  >
                    ✓
                  </motion.span>
                  Message sent successfully! I&apos;ll get back to you soon.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400"
                >
                  Failed to send message. Configure EmailJS credentials in siteConfig.ts
                  or try again later.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <h3 className="font-display text-xl font-bold text-white mb-4">Follow Me</h3>
        <SocialLinks size="lg" className="justify-center" />
      </motion.div>
    </div>
  )
}
