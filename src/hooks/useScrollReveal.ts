import { useInView } from 'react-intersection-observer'

export function useScrollReveal(options?: { threshold?: number; triggerOnce?: boolean }) {
  const { ref, inView } = useInView({
    threshold: options?.threshold ?? 0.15,
    triggerOnce: options?.triggerOnce ?? true,
  })

  return { ref, inView }
}
