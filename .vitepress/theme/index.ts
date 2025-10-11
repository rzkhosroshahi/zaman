// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

function useScrollAnimations() {
  if (typeof window === 'undefined') return
  const revealElements = document.querySelectorAll('[data-reveal]')
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in')
          observer.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.12 }
  )
  revealElements.forEach((el) => {
    observer.observe(el)
    const rect = (el as HTMLElement).getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.88) {
      ;(el as HTMLElement).classList.add('reveal-in')
      observer.unobserve(el)
    }
  })
}

function useParallax() {
  if (typeof window === 'undefined') return
  const parallaxRoot = document.querySelector('[data-parallax-root]')
  if (!parallaxRoot) return
  const layers = parallaxRoot.querySelectorAll('[data-parallax]')
  const handle = () => {
    const scrollY = window.scrollY
    layers.forEach((el) => {
      const depth = Number((el as HTMLElement).dataset.parallax || '0.2')
      ;(el as HTMLElement).style.transform =
        `translate3d(0, ${scrollY * depth}px, 0)`
    })
  }
  window.addEventListener('scroll', handle, { passive: true })
}

function useNumeralToggle() {
  if (typeof window === 'undefined') return
  const el = document.getElementById('zmn-numerals')
  if (!el) return
  // Initialize with today's date in both calendars
  try {
    const faNode = el.querySelector('.fa') as HTMLElement | null
    const enNode = el.querySelector('.en') as HTMLElement | null
    const now = new Date()
    // Gregorian (en) YYYY • MM • DD
    const enFmt = new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      calendar: 'gregory'
    })
    const enParts = enFmt.formatToParts(now)
    const enYear = enParts.find((p) => p.type === 'year')?.value || ''
    const enMonth = enParts.find((p) => p.type === 'month')?.value || ''
    const enDay = enParts.find((p) => p.type === 'day')?.value || ''
    const enText = `${enYear} • ${enMonth} • ${enDay}`
    if (enNode) enNode.textContent = enText

    // Persian (fa, Jalali calendar) YYYY • MM • DD with Persian digits
    const faFmt = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    const faParts = faFmt.formatToParts(now)
    const faYear = faParts.find((p) => p.type === 'year')?.value || ''
    const faMonth = faParts.find((p) => p.type === 'month')?.value || ''
    const faDay = faParts.find((p) => p.type === 'day')?.value || ''
    const faText = `${faYear} • ${faMonth} • ${faDay}`
    if (faNode) faNode.textContent = faText
  } catch {}
  let timer: number | undefined
  const start = () => {
    // @ts-ignore - window type in DOM
    timer = window.setInterval(() => {
      el.classList.toggle('is-en')
    }, 3500)
  }
  const stop = () => {
    if (timer) {
      // @ts-ignore - window type in DOM
      window.clearInterval(timer)
    }
  }
  start()
  window.addEventListener('pagehide', stop)
}

function useHeroMicroInteractions() {
  if (typeof window === 'undefined') return
  const hero = document.querySelector('.zmn-hero') as HTMLElement | null
  if (!hero) return
  const onMove = (e: MouseEvent) => {
    const rect = hero.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const mx = x - rect.width / 2
    const my = y - rect.height / 2
    hero.style.setProperty('--mx', String(mx))
    hero.style.setProperty('--my', String(my))
    hero.style.setProperty('--px', `${x}px`)
    hero.style.setProperty('--py', `${y}px`)
  }
  hero.addEventListener('mousemove', onMove)
}

export default {
  extends: DefaultTheme,
  enhanceApp({ router }) {
    if (typeof window === 'undefined') return
    const init = () => {
      useParallax()
      useScrollAnimations()
      useNumeralToggle()
      useHeroMicroInteractions()

      // Conditionally show Storybook iframe if it loads, otherwise keep fallback visible
      const container = document.getElementById('zmn-embed-container')
      const iframe = container?.querySelector(
        'iframe'
      ) as HTMLIFrameElement | null
      const fallback = container?.querySelector(
        '[data-fallback]'
      ) as HTMLElement | null
      if (iframe) {
        const onLoad = () => {
          if (fallback) fallback.style.display = 'none'
          iframe.style.display = 'block'
        }
        iframe.addEventListener('load', onLoad, { once: true })
        const targetSrc = iframe.getAttribute('data-src') || iframe.src
        const tryLoad = (src: string) =>
          fetch(src, { method: 'HEAD' })
            .then((res) => {
              if (res.ok) {
                iframe.src = src
              }
            })
            .catch(() => {})
        // Try built asset path first, then localhost in dev
        tryLoad(targetSrc).then(() => {
          if (!iframe.src || iframe.src === 'about:blank') {
            tryLoad('http://localhost:6006')
          }
        })
      }
    }

    // Run immediately (for initial load)
    setTimeout(init, 0)

    // Try VitePress router hook if available (supports both property assign and function signature)
    const r: any = router as any
    if (r) {
      if (typeof r.onAfterRouteChanged === 'function') {
        r.onAfterRouteChanged(() => setTimeout(init, 0))
      } else if (r.onAfterRouteChanged === undefined) {
        try {
          r.onAfterRouteChanged = () => setTimeout(init, 0)
        } catch {}
      }
    }

    // Universal fallbacks for SPA navigation
    window.addEventListener('popstate', () => setTimeout(init, 0))
    window.addEventListener('hashchange', () => setTimeout(init, 0))
    window.addEventListener('message', (e: MessageEvent) => {
      if ((e.data as any)?.type === 'vitepress:afterRouteChanged') {
        setTimeout(init, 0)
      }
    })
  }
} satisfies Theme
