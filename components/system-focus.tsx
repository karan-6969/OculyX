"use client"

import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

const SYSTEMS = [
  {
    title: "Threat Detection",
    body: "Autonomous real-time vector analysis and predictive anomaly identification across every connected feed.",
  },
  {
    title: "Causal Inference",
    body: "Deep root-cause verification that separates genuine correlation from coincident system behavior.",
  },
  {
    title: "Autonomous Defense",
    body: "Zero-latency mitigation loops that quarantine affected nodes before lateral movement begins.",
  },
  {
    title: "Telemetry Synthesis",
    body: "Multi-stack state models combining logs, metrics, and network streams into one timeline.",
  },
  {
    title: "Anomaly Isolation",
    body: "Container-level containment that traps faulty signal paths and keeps the fleet reporting.",
  },
  {
    title: "Predictive Analytics",
    body: "Failure-vector mapping that surfaces structural and operational risk up to 72 hours ahead.",
  },
]

/* Border logic across 1 / 2 / 3 column breakpoints */
function cellClass(index: number) {
  const base =
    "group flex flex-col gap-3 px-5 py-6 border-foreground transition-colors duration-200 hover:bg-foreground hover:text-background"

  const bottom =
    index < 3
      ? "border-b-2"
      : index === 3
      ? "border-b-2 lg:border-b-0"
      : index === 4
      ? "border-b-2 sm:border-b-0"
      : "border-b-0"

  const right =
    index === 0 || index === 4
      ? "sm:border-r-2"
      : index === 2
      ? "sm:border-r-2 lg:border-r-0"
      : index === 1 || index === 3
      ? "lg:border-r-2"
      : ""

  return `${base} ${bottom} ${right}`
}

export function SystemFocus() {
  return (
    <section id="research" className="w-full px-6 py-20 lg:px-12">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          {"// SECTION: SYSTEM_FOCUS"}
        </span>
        <div className="flex-1 border-t border-border" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          010
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease }}
        className="text-2xl lg:text-4xl font-display font-extrabold tracking-tight uppercase mb-10 text-balance"
      >
        Six systems, one verdict
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-2 border-foreground">
        {SYSTEMS.map((system, i) => (
          <motion.div
            key={system.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.1, duration: 0.5, ease }}
            className={cellClass(i)}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground group-hover:text-[#ea580c]">
                SYSTEM FOCUS
              </span>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground group-hover:text-background/60">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="text-base lg:text-lg font-display font-bold tracking-tight uppercase leading-tight">
              {system.title}
            </h3>
            <p className="text-xs font-mono text-muted-foreground leading-relaxed group-hover:text-background/70">
              {system.body}
            </p>
            <span className="mt-auto pt-3 text-[10px] font-mono tracking-[0.2em] uppercase text-[#ea580c]">
              {"// module.online"}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
