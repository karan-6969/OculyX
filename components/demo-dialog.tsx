"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Check, X } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

const USE_CASES = [
  "Critical Infrastructure Intelligence",
  "Surveillance Intelligence Lab",
  "Reality Trust / Deepfake Detection",
  "Something else",
]

const FIELD =
  "w-full bg-background border-2 border-foreground px-3 py-2.5 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#ea580c] transition-colors duration-150"

export function DemoDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", org: "", useCase: USE_CASES[0] })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [ticket, setTicket] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  function close() {
    onClose()
    setTimeout(() => {
      setTicket(null)
      setErrors({})
      setForm({ name: "", email: "", org: "", useCase: USE_CASES[0] })
    }, 250)
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!form.name.trim()) next.name = "REQUIRED"
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) next.email = "VALID WORK EMAIL REQUIRED"
    if (!form.org.trim()) next.org = "REQUIRED"
    setErrors(next)
    if (Object.keys(next).length > 0) return
    setTicket(`OCX-2026-${Math.random().toString(36).slice(2, 6).toUpperCase()}`)
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            aria-label="Close demo request"
            className="absolute inset-0 bg-foreground/70 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Request a demo"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease }}
            className="relative w-full max-w-lg border-2 border-foreground bg-background"
          >
            {/* header */}
            <div className="flex items-center justify-between px-4 py-3 border-b-2 border-foreground">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
                {ticket ? "REQUEST: CONFIRMED" : "// REQUEST_DEMO.FORM"}
              </span>
              <button
                onClick={close}
                aria-label="Close"
                className="flex items-center justify-center w-7 h-7 border border-foreground/30 hover:bg-foreground hover:text-background transition-colors duration-150"
              >
                <X size={13} strokeWidth={2} />
              </button>
            </div>

            {ticket ? (
              <div className="px-5 py-8 flex flex-col gap-4 items-start">
                <span className="flex items-center justify-center w-10 h-10 bg-[#ea580c] text-background">
                  <Check size={18} strokeWidth={2.5} />
                </span>
                <h3 className="text-xl font-display font-extrabold uppercase tracking-tight">
                  Request logged
                </h3>
                <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                  An OCULYX field engineer will reach out within one business day to schedule
                  your live fusion walkthrough.
                </p>
                <div className="w-full border-2 border-foreground px-4 py-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
                    Reference
                  </span>
                  <span className="text-sm font-mono font-bold">{ticket}</span>
                </div>
                <button
                  onClick={close}
                  className="w-full bg-foreground text-background py-3 text-xs font-mono tracking-widest uppercase hover:bg-[#ea580c] transition-colors duration-150"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="px-5 py-5 flex flex-col gap-4" noValidate>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="demo-name" className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
                    Name *
                  </label>
                  <input
                    id="demo-name"
                    className={FIELD}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Operator"
                  />
                  {errors.name && (
                    <span className="text-[10px] font-mono text-[#ea580c]">{errors.name}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="demo-email" className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
                    Work email *
                  </label>
                  <input
                    id="demo-email"
                    type="email"
                    className={FIELD}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@utility.co"
                  />
                  {errors.email && (
                    <span className="text-[10px] font-mono text-[#ea580c]">{errors.email}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="demo-org" className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
                    Organization *
                  </label>
                  <input
                    id="demo-org"
                    className={FIELD}
                    value={form.org}
                    onChange={(e) => setForm({ ...form, org: e.target.value })}
                    placeholder="NorthGrid Power"
                  />
                  {errors.org && (
                    <span className="text-[10px] font-mono text-[#ea580c]">{errors.org}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="demo-use" className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
                    Primary use case
                  </label>
                  <select
                    id="demo-use"
                    className={FIELD}
                    value={form.useCase}
                    onChange={(e) => setForm({ ...form, useCase: e.target.value })}
                  >
                    {USE_CASES.map((u) => (
                      <option key={u}>{u}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="group flex items-center justify-center gap-0 bg-foreground text-background text-xs font-mono tracking-wider uppercase"
                >
                  <span className="flex items-center justify-center w-10 h-10 bg-[#ea580c]">
                    <ArrowRight size={15} strokeWidth={2} />
                  </span>
                  <span className="px-5 py-3">Submit request</span>
                </button>
                <p className="text-[10px] font-mono text-muted-foreground leading-relaxed">
                  {"// Demo data only. Nothing leaves your browser."}
                </p>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
