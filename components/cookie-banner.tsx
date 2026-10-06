"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const
const KEY = "oculyx-cookie-consent"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [customizing, setCustomizing] = useState(false)
  const [analytics, setAnalytics] = useState(true)

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  function save(choice: string) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ choice, analytics, at: Date.now() }))
    } catch {
      /* storage unavailable — still dismiss */
    }
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease }}
          role="dialog"
          aria-label="Cookie consent"
          className="fixed bottom-0 left-0 right-0 z-40 p-3 lg:p-4"
        >
          <div className="border-2 border-foreground bg-background p-4 lg:px-5 flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
                {"// COOKIE_CONSENT"}
              </span>
              <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                OCULYX uses cookies to improve your browsing experience and perform analytics.
                Select &quot;Accept All&quot; to consent to all cookies on your device.
              </p>
              {customizing && (
                <label className="flex items-center gap-2 mt-2 text-xs font-mono text-foreground">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="accent-[#ea580c]"
                  />
                  Allow anonymous analytics cookies
                </label>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => (customizing ? save("custom") : setCustomizing(true))}
                className="px-3 py-2 border-2 border-foreground text-[10px] font-mono tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors duration-150"
              >
                {customizing ? "Save" : "Customize"}
              </button>
              <button
                onClick={() => save("necessary")}
                className="px-3 py-2 border-2 border-foreground text-[10px] font-mono tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors duration-150"
              >
                Necessary only
              </button>
              <button
                onClick={() => save("all")}
                className="px-3 py-2 bg-[#ea580c] text-background text-[10px] font-mono tracking-widest uppercase hover:bg-foreground transition-colors duration-150"
              >
                Accept all
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
