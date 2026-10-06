"use client"

import { useEffect, useState } from "react"
import { Aperture, Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"

const ease = [0.22, 1, 0.36, 1] as const

const LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Solutions", href: "#solutions" },
  { label: "Research", href: "#research" },
  { label: "Company", href: "#company" },
]

export function Navbar({ onDemo }: { onDemo: () => void }) {
  const [active, setActive] = useState<string>("")
  const [menuOpen, setMenuOpen] = useState(false)

  /* scroll-spy: highlight the section currently in view */
  useEffect(() => {
    const targets = LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => Boolean(el)
    )
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  const go = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="sticky top-0 z-50 w-full px-3 py-3 lg:px-6 lg:pt-6 bg-background/85 backdrop-blur-md"
    >
      <nav className="w-full border border-foreground/20 px-4 py-3 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="flex items-center gap-2.5 shrink-0"
          >
            <Aperture size={16} strokeWidth={1.5} className="text-[#ea580c]" />
            <span className="text-xs font-display tracking-[0.2em] uppercase font-bold">
              OCULYX
            </span>
            <span className="hidden sm:inline text-[9px] font-mono tracking-[0.15em] uppercase text-muted-foreground border-l border-border pl-2.5">
              {"PREDICT. PROTECT. VERIFY."}
            </span>
          </a>

          {/* Center nav links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.4, ease }}
                onClick={(e) => {
                  e.preventDefault()
                  go(link.href)
                }}
                className={`relative text-xs font-mono tracking-widest uppercase transition-colors duration-200 whitespace-nowrap ${
                  active === link.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-0.5 bg-[#ea580c] transition-all duration-300 ${
                    active === link.href ? "w-full" : "w-0"
                  }`}
                />
              </motion.a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 lg:gap-4">
            <span className="hidden xl:flex items-center gap-2 border border-foreground/20 px-2.5 py-1.5">
              <span className="h-1.5 w-1.5 bg-[#ea580c] animate-blink" />
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
                All systems nominal
              </span>
            </span>
            <ThemeToggle />
            <a
              href="#platform"
              onClick={(e) => {
                e.preventDefault()
                go("#platform")
              }}
              className="hidden sm:block text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200 whitespace-nowrap"
            >
              Console
            </a>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onDemo}
              className="bg-foreground text-background px-4 py-2 text-xs font-mono tracking-widest uppercase whitespace-nowrap"
            >
              Request Demo
            </motion.button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="md:hidden flex items-center justify-center w-9 h-9 border border-foreground/30 text-foreground"
            >
              {menuOpen ? <X size={16} strokeWidth={2} /> : <Menu size={16} strokeWidth={2} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-1 pt-4 mt-4 border-t border-border">
                {LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      go(link.href)
                    }}
                    className={`flex items-center justify-between px-1 py-2.5 text-xs font-mono tracking-widest uppercase border-b border-border ${
                      active === link.href ? "text-[#ea580c]" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                    <span className="text-[10px]">{"->"}</span>
                  </a>
                ))}
                <a
                  href="#platform"
                  onClick={(e) => {
                    e.preventDefault()
                    go("#platform")
                  }}
                  className="px-1 py-2.5 text-xs font-mono tracking-widest uppercase text-muted-foreground"
                >
                  Console
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.div>
  )
}
