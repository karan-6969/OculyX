"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Aperture, ArrowRight, MessageSquare, X } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

interface Message {
  from: "bot" | "user"
  text: string
}

const PRESETS = [
  "What does OCULYX fuse?",
  "How fast is inference?",
  "Do you run air-gapped?",
]

const OPENING: Message = {
  from: "bot",
  text: "OCULYX assistant online. Ask about the fusion engine, deployment, or trust features.",
}

function answer(input: string): string {
  const q = input.toLowerCase()
  if (q.includes("fuse") || q.includes("modal") || q.includes("data"))
    return "Video, audio, sensor telemetry, behavioral patterns, environmental context, and historical baselines — reconciled into one state model per asset, scored as threat probability, structural integrity, and authenticity confidence."
  if (q.includes("fast") || q.includes("latency") || q.includes("speed") || q.includes("inference"))
    return "4.2ms p99 at the edge, 840K data points/s per cluster, 500K+ inferences per day across 120+ processors — with 99.99% measured uptime."
  if (q.includes("air") || q.includes("on-prem") || q.includes("on prem") || q.includes("sovereign") || q.includes("deploy"))
    return "Yes. SANDBOX runs in the cloud for evaluation, PRODUCTION deploys to 12 edge regions, and SOVEREIGN is fully air-gapped on your own hardware."
  if (q.includes("deepfake") || q.includes("fake") || q.includes("authentic") || q.includes("verify"))
    return "The Reality Trust Center scores authenticity across video, audio, behavior, and context in a single pass — catching synthetic identities, cloned voices, and manipulated media."
  if (q.includes("price") || q.includes("cost") || q.includes("tier"))
    return "SANDBOX is free forever, PRODUCTION starts at $1,900/month, and SOVEREIGN is custom. All tiers include the fusion core and truth reports."
  if (q.includes("demo") || q.includes("contact") || q.includes("talk") || q.includes("sales"))
    return "Hit REQUEST DEMO anywhere on the page — the form logs a reference and a field engineer follows up within one business day."
  return "I don't have that one indexed yet. Try asking about fusion, latency, deployment tiers, deepfake detection — or request a demo and an engineer will take it."
}

export function ChatWidget({ onDemo }: { onDemo: () => void }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([OPENING])
  const [draft, setDraft] = useState("")
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, open])

  function send(text: string) {
    const clean = text.trim()
    if (!clean) return
    setMessages((m) => [...m, { from: "user", text: clean }])
    setDraft("")
    setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text: answer(clean) }])
    }, 350)
  }

  return (
    <div className="fixed right-3 bottom-3 lg:right-5 lg:bottom-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease }}
            className="w-[min(92vw,340px)] border-2 border-foreground bg-background flex flex-col"
            role="dialog"
            aria-label="OCULYX assistant"
          >
            {/* header */}
            <div className="flex items-center justify-between px-3 py-2.5 border-b-2 border-foreground bg-foreground text-background">
              <span className="flex items-center gap-2">
                <Aperture size={13} strokeWidth={1.5} className="text-[#ea580c]" />
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase">
                  OCULYX // ASSIST
                </span>
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="text-background/70 hover:text-[#ea580c] transition-colors"
              >
                <X size={14} strokeWidth={2} />
              </button>
            </div>

            {/* messages */}
            <div
              ref={listRef}
              className="flex flex-col gap-2 p-3 h-56 overflow-y-auto bg-background"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] px-3 py-2 text-[11px] font-mono leading-relaxed border ${
                    m.from === "bot"
                      ? "self-start border-foreground/30 text-foreground"
                      : "self-end border-[#ea580c] bg-[#ea580c]/10 text-foreground"
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>

            {/* presets */}
            <div className="flex flex-wrap gap-1.5 px-3 pb-2">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  className="text-[9px] font-mono uppercase tracking-wider border border-foreground/30 px-2 py-1 hover:bg-foreground hover:text-background transition-colors duration-150"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(draft)
              }}
              className="flex items-center gap-2 border-t-2 border-foreground p-2"
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask OCULYX..."
                aria-label="Message the OCULYX assistant"
                className="flex-1 bg-transparent px-2 py-1.5 text-[11px] font-mono text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="flex items-center justify-center w-8 h-8 bg-foreground text-background hover:bg-[#ea580c] transition-colors duration-150"
              >
                <ArrowRight size={14} strokeWidth={2} />
              </button>
            </form>

            <button
              onClick={() => {
                setOpen(false)
                onDemo()
              }}
              className="w-full bg-[#ea580c] text-background py-2.5 text-[10px] font-mono tracking-widest uppercase hover:bg-foreground transition-colors duration-150"
            >
              Request a demo
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close OCULYX assistant" : "Open OCULYX assistant"}
        className="flex items-center justify-center w-12 h-12 border-2 border-foreground bg-foreground text-background hover:bg-[#ea580c] hover:border-[#ea580c] transition-colors duration-200"
      >
        {open ? <X size={18} strokeWidth={2} /> : <MessageSquare size={18} strokeWidth={1.75} />}
      </button>
    </div>
  )
}
