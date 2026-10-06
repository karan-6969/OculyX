"use client"

import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

const OUTLETS = [
  "THE PRINT",
  "DAILYHUNT",
  "AHMEDABAD BYTES",
  "ENTREPRENEUR HUNT",
  "HINDUSTAN BYTES",
  "HINDUSTAN METRO",
  "IGB WIRE",
  "INFLUENCIVE INDIA",
  "PUNJAB BYTES",
  "THE DAILY BEAT",
]

function OutletBlock({ name, glitch }: { name: string; glitch: boolean }) {
  return (
    <div
      className={`flex items-center justify-center px-7 py-4 border-r-2 border-foreground shrink-0 ${
        glitch ? "animate-glitch" : ""
      }`}
    >
      <span className="text-sm font-mono tracking-[0.15em] uppercase text-muted-foreground whitespace-nowrap">
        {name}
      </span>
    </div>
  )
}

export function MediaMarquee() {
  const glitchIndices = [1, 5, 8]

  return (
    <section className="w-full pt-16 px-6 lg:px-12">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          {"// MEDIA COVERAGE"}
        </span>
        <div className="flex-1 border-t border-border" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          011
        </span>
      </motion.div>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease }}
        className="overflow-hidden border-2 border-foreground"
      >
        <div className="flex animate-marquee" style={{ width: "max-content" }}>
          {[...OUTLETS, ...OUTLETS].map((name, i) => (
            <OutletBlock
              key={`${name}-${i}`}
              name={name}
              glitch={glitchIndices.includes(i % OUTLETS.length)}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
