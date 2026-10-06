"use client"

import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

const TOKENS = [
  "SIGNAL",
  "->",
  "CONTEXT",
  "->",
  "INFERENCE",
  "->",
  "TRUTH",
  "//",
  "PREDICT",
  "PROTECT",
  "VERIFY",
  "//",
]

function TokenBlock({ token, index }: { token: string; index: number }) {
  const isArrow = token === "->"
  const isMark = token === "//"

  return (
    <span
      className={`flex items-center gap-3 px-5 py-2.5 border-r-2 border-foreground shrink-0 text-xs font-mono tracking-[0.2em] uppercase whitespace-nowrap ${
        isArrow ? "text-[#ea580c]" : isMark ? "text-muted-foreground" : "text-foreground font-bold"
      } ${index % 7 === 3 ? "animate-glitch" : ""}`}
    >
      {token}
    </span>
  )
}

export function SignalTicker() {
  return (
    <section className="w-full px-6 lg:px-12 pb-4" aria-hidden="true">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease }}
        className="overflow-hidden border-2 border-foreground bg-foreground/5"
      >
        <div className="flex animate-marquee" style={{ width: "max-content" }}>
          {[...TOKENS, ...TOKENS, ...TOKENS, ...TOKENS].map((token, i) => (
            <TokenBlock key={`${token}-${i}`} token={token} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
